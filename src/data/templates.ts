export interface TemplateItem {
  id: string;
  title: string;
  category: 'Trending' | 'Cinema' | 'Luxury' | 'Sci-Fi' | 'Viral';
  description: string;
  badge: string;
  previewUrl: string;
  basePrompt: string;
}

export const ALL_TEMPLATES: TemplateItem[] = [
  {
    id: 'cinematic-selfie',
    title: 'Cinematic Selfie',
    category: 'Cinema',
    description: 'Turn your selfie into a dramatic cinematic movie scene with 35mm lighting.',
    badge: 'Trending',
    previewUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    basePrompt: "A realistic cinematic photograph based on the user's uploaded selfie. Preserve the person's appearance and facial identity as accurately as possible. Place the person inside a dramatic cinematic environment with realistic lighting, natural skin texture, realistic proportions, professional photography, shallow depth of field, high detail, vertical 9:16 composition."
  },
  {
    id: 'luxury-life',
    title: 'Luxury Life',
    category: 'Luxury',
    description: 'Transform your photo into a lavish luxury yacht & penthouse lifestyle scene.',
    badge: 'Viral',
    previewUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    basePrompt: "Transform the person from the uploaded selfie into a realistic luxury lifestyle scene. Preserve their appearance. High-end hotel, expensive interior, cinematic lighting, realistic photography, natural pose, premium editorial aesthetic, vertical 9:16."
  },
  {
    id: 'red-carpet',
    title: 'Red Carpet Gala',
    category: 'Trending',
    description: 'Step into an exclusive VIP red carpet premiere with paparazzi flashbulbs.',
    badge: 'Popular',
    previewUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    basePrompt: "Create a realistic cinematic red carpet scene using the person from the uploaded selfie. Preserve their appearance. Professional photography, camera flashes, elegant environment, realistic crowd, cinematic lighting, vertical 9:16."
  },
  {
    id: 'future-me',
    title: 'Future Me 2088',
    category: 'Sci-Fi',
    description: 'See yourself in a sleek futuristic cyberpunk world with neo-holographic lighting.',
    badge: 'Sci-Fi',
    previewUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
    basePrompt: "Transform the person from the uploaded selfie into a realistic futuristic cinematic environment. Preserve their appearance. Premium sci-fi environment, realistic materials, cinematic lighting, natural human proportions, realistic photography, vertical 9:16."
  },
  {
    id: 'old-money',
    title: 'Old Money Vintage',
    category: 'Luxury',
    description: 'Classic European aristocracy vintage aesthetic with tennis club & mansion vibe.',
    badge: 'Luxury',
    previewUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    basePrompt: "Old money aesthetic vintage editorial portrait. Elegant tailored linen attire, aristocratic Italian villa in the background, soft warm film grain, quiet luxury aesthetic, 9:16 vertical composition."
  },
  {
    id: 'cyberpunk-neon',
    title: 'Neon Cyber City',
    category: 'Sci-Fi',
    description: 'Rain-soaked futuristic metropolis with glowing neon signs and holographic reflections.',
    badge: 'Sci-Fi',
    previewUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    basePrompt: "Cyberpunk neon street at night, reflective rain puddles, high-tech glowing visor accents, dramatic cyan and magenta rim light, photorealistic 8k vertical 9:16."
  },
  {
    id: 'action-hero',
    title: 'Hollywood Action Hero',
    category: 'Cinema',
    description: 'Slow-motion action movie scene with smoke, helicopter, and epic explosions.',
    badge: 'Cinema',
    previewUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    basePrompt: "Epic Hollywood action blockbuster hero shot. Dramatic cinematic smoke, dusk sky, determined expression, cinematic backlighting, IMAX cinematography 9:16."
  },
  {
    id: 'anime-glow',
    title: 'Modern Anime Glow',
    category: 'Viral',
    description: 'Makoto Shinkai inspired ethereal golden-hour clouds and aesthetic anime lighting.',
    badge: 'Viral',
    previewUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80',
    basePrompt: "Modern high-end cinematic anime aesthetic with realistic human face proportions. Gorgeous sunset clouds, glowing dust particles, vibrant colors, Studio Ghibli meets Makoto Shinkai aesthetic."
  }
];
