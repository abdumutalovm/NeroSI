import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { GoogleGenAI } from '@google/genai';

/**
 * Custom Vite plugin providing the Google GenAI backend endpoint
 * exactly implementing the Google AI Studio multimodal interaction pattern.
 */
function geminiApiPlugin() {
  return {
    name: 'gemini-api-endpoint',
    configureServer(server: any) {
      server.middlewares.use('/api/generate-gemini', async (req: any, res: any) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let bodyStr = '';
        req.on('data', (chunk: any) => {
          bodyStr += chunk;
        });

        req.on('end', async () => {
          try {
            const body = JSON.parse(bodyStr || '{}');
            const apiKey = body.apiKey || process.env.GEMINI_API_KEY || process.env.IMAGE_API_KEY;

            if (!apiKey) {
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 400;
              res.end(JSON.stringify({
                success: false,
                error: 'No API key provided. Please configure GEMINI_API_KEY in .env or pass it in settings.'
              }));
              return;
            }

            const ai = new GoogleGenAI({ apiKey });
            const { promptText, base64Image, mimeType = 'image/png' } = body;

            // Strict instruction for 100% face preservation
            const enhancedPromptText = `CRITICAL INSTRUCTION: You MUST preserve the exact person's face and facial identity from the provided reference image 100% IDENTICALLY. Do not generate a different person. Keep the person's exact eyes, nose, mouth, facial proportions, facial features, and skin tone. Seamlessly integrate this exact person into the following scene: ${promptText}`;

            const inputPayload: any[] = [
              { type: 'text', text: enhancedPromptText }
            ];

            if (base64Image) {
              // Strip data URI prefix if present
              const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, '');
              inputPayload.push({
                type: 'image',
                mime_type: mimeType,
                data: cleanBase64
              });
            }

            // Google AI Studio interaction format requested by user
            let outputImageData: string | null = null;
            let usedModel = 'gemini-3.1-flash-image';

            try {
              const interaction = await (ai as any).interactions.create({
                model: usedModel,
                input: inputPayload
              });

              if (interaction?.output_image?.data) {
                outputImageData = interaction.output_image.data;
              }
            } catch (interactionErr: any) {
              console.warn('[Gemini Interaction API]', interactionErr.message || interactionErr);

              // Fallback to ai.models.generateImages if interaction model is restricted
              try {
                usedModel = 'imagen-3.0-generate-002';
                const imgRes = await (ai as any).models.generateImages({
                  model: usedModel,
                  prompt: enhancedPromptText,
                  config: {
                    numberOfImages: 1,
                    aspectRatio: '9:16',
                    outputMimeType: 'image/jpeg'
                  }
                });

                if (imgRes?.generatedImages?.[0]?.image?.imageBytes) {
                  outputImageData = imgRes.generatedImages[0].image.imageBytes;
                }
              } catch (fallbackErr: any) {
                console.warn('[Gemini Image Fallback]', fallbackErr.message || fallbackErr);
                throw new Error(interactionErr.message || 'Google GenAI generation failed');
              }
            }

            res.setHeader('Content-Type', 'application/json');
            if (outputImageData) {
              res.statusCode = 200;
              res.end(JSON.stringify({
                success: true,
                model: usedModel,
                imageBase64: outputImageData,
                dataUrl: `data:image/png;base64,${outputImageData}`
              }));
            } else {
              res.statusCode = 502;
              res.end(JSON.stringify({
                success: false,
                error: 'No image was returned by the Google GenAI model.'
              }));
            }
          } catch (err: any) {
            console.error('[Gemini Server Error]', err);
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 500;
            res.end(JSON.stringify({
              success: false,
              error: err.message || 'Unknown error occurred while contacting Google GenAI API.'
            }));
          }
        });
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    geminiApiPlugin()
  ],
  server: {
    port: 5173,
    host: true
  }
});
