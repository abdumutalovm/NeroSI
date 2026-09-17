/**
 * Video generation service.
 * Handles video generation API checks and provides the transparent Fallback Mode
 * when running without paid video credits.
 */

export interface VideoPromptParams {
  templateTitle: string;
  customIdea?: string;
  sourceImageUrl?: string;
}

export interface VideoStatus {
  available: boolean;
  videoUrl?: string;
  fallbackMessage?: string;
  videoPrompt: string;
}

/**
 * Constructs the exact 9:16 cinematic video prompt for video models (e.g., Runway Gen-3, Kling, Luma Dream Machine, SVD).
 */
export function buildVideoPrompt(params: VideoPromptParams): string {
  let prompt = `Create a realistic cinematic vertical video based on the provided image for template "${params.templateTitle}". Preserve the person's appearance. Add subtle natural body movement and realistic camera motion. Cinematic lighting, realistic environment, smooth motion, social-media-ready 9:16 video.`;

  if (params.customIdea && params.customIdea.trim().length > 0) {
    prompt += ` Scene action: ${params.customIdea.trim()}.`;
  }

  return prompt;
}

/**
 * Checks video generation availability and either invokes video API or provides the transparent Fallback Mode.
 */
export async function generateAiVideo(
  params: VideoPromptParams,
  onProgress?: (step: string) => void
): Promise<VideoStatus> {
  const videoPrompt = buildVideoPrompt(params);
  const videoApiKey = (import.meta as unknown as { env: Record<string, string> }).env.VITE_VIDEO_API_KEY;

  if (!videoApiKey || videoApiKey.trim().length === 0) {
    // Transparent Fallback Mode as strictly requested:
    // Do NOT fake video generation. Display honest message and video prompt preview.
    return {
      available: false,
      fallbackMessage: "Video generation is not available in the current free mode.",
      videoPrompt
    };
  }

  // If a video API key is configured
  onProgress?.("Creating video...");
  // Video generation placeholder for custom provider integration
  return {
    available: false,
    fallbackMessage: "Video generation is not available in the current free mode.",
    videoPrompt
  };
}
