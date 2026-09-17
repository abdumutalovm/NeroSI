import React from 'react';
import { Sparkles, Film, Gem, Camera, Orbit, Check } from 'lucide-react';

export interface Template {
  id: string;
  title: string;
  description: string;
  badge: string;
  previewUrl: string;
  icon: React.ReactNode;
}

export const TEMPLATES: Template[] = [
  {
    id: 'cinematic-selfie',
    title: 'Cinematic Selfie',
    description: 'Turn your selfie into a cinematic movie scene.',
    badge: 'Trending',
    previewUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    icon: <Film className="w-3.5 h-3.5 text-blue-500" />
  },
  {
    id: 'luxury-life',
    title: 'Luxury Life',
    description: 'Transform your photo into a luxury lifestyle video.',
    badge: 'Viral',
    previewUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    icon: <Gem className="w-3.5 h-3.5 text-amber-500" />
  },
  {
    id: 'red-carpet',
    title: 'Red Carpet',
    description: 'Step into a cinematic red carpet moment.',
    badge: 'Popular',
    previewUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    icon: <Camera className="w-3.5 h-3.5 text-rose-500" />
  },
  {
    id: 'future-me',
    title: 'Future Me',
    description: 'See yourself in a futuristic cinematic world.',
    badge: 'Sci-Fi',
    previewUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
    icon: <Orbit className="w-3.5 h-3.5 text-cyan-500" />
  }
];

interface TemplateSelectorProps {
  selectedTemplate: Template;
  onSelectTemplate: (template: Template) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onSelectTemplate
}) => {
  const handleSelect = (template: Template) => {
    if (selectedTemplate.id !== template.id) {
      onSelectTemplate(template);
    }
  };

  return (
    <section className="w-full space-y-2.5">
      <div className="flex items-center justify-between px-1">
        <label className="text-xs sm:text-sm font-bold tracking-tight flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          Choose a viral template
        </label>
        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
          4 templates
        </span>
      </div>

      {/* 4 Template Cards in a responsive 4-col or 2x2 grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        {TEMPLATES.map((tmpl) => {
          const isSelected = tmpl.id === selectedTemplate.id;

          return (
            <div
              key={tmpl.id}
              onClick={() => handleSelect(tmpl)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(tmpl)}
              className={`clay-template-card p-2 flex flex-col justify-between cursor-pointer transition-all duration-200 ${
                isSelected ? 'is-selected ring-2 ring-blue-500/80 dark:ring-blue-400' : ''
              }`}
            >
              {/* Thumbnail with rounded squircle clay inset */}
              <div className="clay-inset p-1 rounded-xl overflow-hidden mb-2 relative aspect-[4/5] bg-slate-100 dark:bg-slate-800">
                <img
                  src={tmpl.previewUrl}
                  alt={tmpl.title}
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />

                {/* Badge */}
                <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 text-[9px] font-bold shadow-sm flex items-center gap-0.5">
                  {tmpl.icon}
                  <span>{tmpl.badge}</span>
                </div>

                {/* Selected Check Indicator */}
                {isSelected && (
                  <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}
              </div>

              {/* Title & Short Details */}
              <div className="space-y-0.5 px-0.5 text-left">
                <h3 className={`text-xs font-bold leading-snug ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-slate-100'}`}>
                  {tmpl.title}
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 leading-tight">
                  {tmpl.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
