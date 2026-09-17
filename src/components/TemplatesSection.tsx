import React, { useState } from 'react';
import { Sparkles, Search, Wand2, ArrowRight } from 'lucide-react';
import { ALL_TEMPLATES, TemplateItem } from '../data/templates';
import { Language, t } from '../i18n/i18n';

interface TemplatesSectionProps {
  onSelectTemplate: (template: TemplateItem) => void;
  onGoToCreation: () => void;
  selectedTemplateId: string;
  lang: Language;
}

const CATEGORIES = ['Barchasi', 'Trending', 'Cinema', 'Luxury', 'Sci-Fi', 'Viral'];

export const TemplatesSection: React.FC<TemplatesSectionProps> = ({
  onSelectTemplate,
  onGoToCreation,
  selectedTemplateId,
  lang
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Barchasi');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTemplates = ALL_TEMPLATES.filter((tmpl) => {
    const matchesCategory = selectedCategory === 'Barchasi' || tmpl.category === selectedCategory;
    const matchesSearch = tmpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tmpl.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full space-y-5 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="clay-card p-5 sm:p-7 text-center space-y-2.5">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          {t('templates.badge', lang)}
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          {t('templates.title', lang)}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          {t('templates.subtitle', lang)}
        </p>
      </div>

      {/* Filter Bar & Search */}
      <div className="clay-surface p-3 sm:p-4 space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="clay-inset px-3 py-2.5 rounded-2xl flex items-center gap-2 w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('templates.search', lang)}
              className="bg-transparent border-0 outline-none text-sm w-full text-slate-900 dark:text-slate-100 placeholder-slate-400"
            />
          </div>

          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto py-1 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              const label = cat === 'Barchasi' ? t('templates.all', lang) : cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`clay-toggle px-3.5 py-1.5 text-xs font-bold whitespace-nowrap transition-all ${
                    isActive ? 'is-active' : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredTemplates.map((tmpl) => {
          const isSelected = tmpl.id === selectedTemplateId;

          return (
            <div
              key={tmpl.id}
              onClick={() => onSelectTemplate(tmpl)}
              className={`clay-template-card p-3 flex flex-col justify-between cursor-pointer group ${
                isSelected ? 'is-selected ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="space-y-2.5">
                {/* 9:16 Preview Image — lazy loaded */}
                <div className="clay-inset p-1 rounded-2xl overflow-hidden relative aspect-[4/5] bg-slate-100 dark:bg-slate-800">
                  <img
                    src={tmpl.previewUrl}
                    alt={tmpl.title}
                    className="w-full h-full object-cover rounded-xl transition-all duration-400 group-hover:scale-[1.06] group-hover:brightness-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold">
                    {tmpl.badge}
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-blue-600 text-white text-[9px] font-bold">
                    {t('templates.reels', lang)}
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-blue-600/0 group-hover:bg-blue-600/10 transition-all duration-300" />
                </div>

                {/* Title & Description */}
                <div className="space-y-1 text-left px-1">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {tmpl.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {tmpl.description}
                  </p>
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-3 flex items-center justify-between px-1 text-xs font-bold text-blue-600 dark:text-blue-400">
                <span>{isSelected ? t('templates.selected', lang) : 'Tanlash'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="pt-4 pb-2 flex flex-col items-center justify-center space-y-3 select-none">
        <button
          type="button"
          onClick={onGoToCreation}
          className="clay-glow-btn px-8 py-4 rounded-3xl flex items-center gap-3 text-base sm:text-lg font-black tracking-wide text-white cursor-pointer active:scale-95 transition-all shadow-2xl"
        >
          <img src="/nero-logo.png" alt="NERO" className="w-7 h-7 object-contain" />
          <span>{t('templates.goToCreation', lang)}</span>
          <Wand2 className="w-4 h-4 text-blue-200" />
        </button>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t('templates.goToCreationSub', lang)}
        </p>
      </div>
    </div>
  );
};
