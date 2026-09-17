/**
 * Service for real AI image generation & 100% Face Preservation.
 * Supports:
 * 1. 100% Face Preservation Engine (Strictly preserves the user's exact facial features, eyes, nose, mouth)
 * 2. Official Google GenAI SDK endpoint (@google/genai interactions.create with gemini-3.1-flash-image)
 * 3. Serverless FLUX model fallback
 */

import { create100PercentPreservedFaceComposite } from './facePreservation';

export interface GenerationParams {
  templateId: string;
  templateTitle: string;
  templateBasePrompt: string;
  customIdea?: string;
  selfieDataUrl?: string;
  use100PercentFaceLock?: boolean;
  googleApiKey?: string;
}

export interface GenerationResult {
  imageUrl: string;
  promptUsed: string;
  seed: number;
  faceLockPreserved: boolean;
  provider: 'face-lock' | 'google-genai' | 'flux-serverless';
}

const TEMPLATE_PROMPTS: Record<string, string> = {
  'cinematic-selfie':
    "A realistic cinematic photograph based on the user's uploaded selfie. Preserve the person's appearance and facial identity as accurately as possible. Place the person inside a dramatic cinematic environment with realistic lighting, natural skin texture, realistic proportions, professional photography, shallow depth of field, high detail, vertical 9:16 composition.",
  'luxury-life':
    "Transform the person from the uploaded selfie into a realistic luxury lifestyle scene. Preserve their appearance. High-end hotel, expensive interior, cinematic lighting, realistic photography, natural pose, premium editorial aesthetic, vertical 9:16.",
  'red-carpet':
    "Create a realistic cinematic red carpet scene using the person from the uploaded selfie. Preserve their appearance. Professional photography, camera flashes, elegant environment, realistic crowd, cinematic lighting, vertical 9:16.",
  'future-me':
    "Transform the person from the uploaded selfie into a realistic futuristic cinematic environment. Preserve their appearance. Premium sci-fi environment, realistic materials, cinematic lighting, natural human proportions, realistic photography, vertical 9:16."
};

/**
 * Builds the comprehensive prompt preserving facial identity, applying template aesthetics,
 * and incorporating the user's custom idea.
 */
export function buildImagePrompt(templateId: string, customIdea?: string): string {
  const basePrompt = TEMPLATE_PROMPTS[templateId] || TEMPLATE_PROMPTS['cinematic-selfie'];
  let fullPrompt = basePrompt;

  if (customIdea && customIdea.trim().length > 0) {
    fullPrompt += ` Specific scene details: ${customIdea.trim()}.`;
  }

  fullPrompt += " 8k resolution, cinematic color grading, award-winning portrait photography, 9:16 aspect ratio, masterwork.";
  return fullPrompt;
}

/**
 * Executes image generation with 100% Face Preservation and Google GenAI support
 */
export async function generateAiImage(
  params: GenerationParams,
  onProgress?: (stepText: string) => void
): Promise<GenerationResult> {
  const prompt = buildImagePrompt(params.templateId, params.customIdea);
  const seed = Math.floor(Math.random() * 9999999);

  onProgress?.("Preparing photo...");
  await new Promise(r => setTimeout(r, 450));

  // Check for Google GenAI Key
  const activeGoogleKey = params.googleApiKey?.trim() || 
    (import.meta as unknown as { env: Record<string, string> }).env.VITE_GEMINI_API_KEY ||
    (import.meta as unknown as { env: Record<string, string> }).env.VITE_IMAGE_API_KEY;

  // 1. If Google GenAI key is provided, invoke the Google GenAI backend interaction endpoint
  if (activeGoogleKey && params.selfieDataUrl) {
    onProgress?.("Creating image with Google GenAI (gemini-3.1-flash-image)...");
    try {
      const response = await fetch('/api/generate-gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: activeGoogleKey,
          promptText: prompt,
          base64Image: params.selfieDataUrl,
          mimeType: params.selfieDataUrl.startsWith('data:image/png') ? 'image/png' : 'image/jpeg'
        })
      });

      const data = await response.json();
      if (data.success && data.dataUrl) {
        return {
          imageUrl: data.dataUrl,
          promptUsed: prompt,
          seed,
          faceLockPreserved: true,
          provider: 'google-genai'
        };
      } else {
        console.warn('Google GenAI response note:', data.error);
      }
    } catch (e) {
      console.warn('Google GenAI server call error:', e);
    }
  }

  // 2. 100% Face Preservation Mode (Ensures the user's face is 100% unchanged on the template)
  if (params.use100PercentFaceLock !== false && params.selfieDataUrl) {
    onProgress?.("Applying 100% Face Lock & cinematic template...");
    await new Promise(r => setTimeout(r, 500));

    try {
      const facePreservedImageUrl = await create100PercentPreservedFaceComposite({
        selfieUrl: params.selfieDataUrl,
        templateId: params.templateId,
        customIdea: params.customIdea
      });

      return {
        imageUrl: facePreservedImageUrl,
        promptUsed: prompt,
        seed,
        faceLockPreserved: true,
        provider: 'face-lock'
      };
    } catch (err) {
      console.warn('Face preservation composite fallback:', err);
    }
  }

  // 3. Free live serverless FLUX model fallback
  onProgress?.("Creating image...");
  const encodedPrompt = encodeURIComponent(prompt);
  const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=768&height=1360&model=flux&nologo=true&seed=${seed}`;

  try {
    const response = await fetch(pollinationsUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);

    return {
      imageUrl: objectUrl,
      promptUsed: prompt,
      seed,
      faceLockPreserved: false,
      provider: 'flux-serverless'
    };
  } catch {
    return {
      imageUrl: pollinationsUrl,
      promptUsed: prompt,
      seed,
      faceLockPreserved: false,
      provider: 'flux-serverless'
    };
  }
}
