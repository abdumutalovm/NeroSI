import React from 'react';
import { LayoutGrid, Wand2, Info, Crown } from 'lucide-react';
import { Language, t } from '../i18n/i18n';


export type ActiveTab = 'templates' | 'creation' | 'about' | 'subscription' | 'profile';

interface NavigationDockProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  lang: Language;
}

export const NavigationDock: React.FC<NavigationDockProps> = ({
  activeTab,
  onTabChange,
  lang
}) => {
  const handleTabClick = (tab: ActiveTab) => {
    if (activeTab !== tab) {
      onTabChange(tab);
    }
  };


  return (
    <nav className="w-full flex justify-center py-2 select-none">
      {/* 3D Clay Pill Navigation */}
      <div className="clay-card p-1.5 sm:p-2 flex items-center gap-1 sm:gap-1.5 shadow-lg overflow-x-auto no-scrollbar">
        {/* Tab 1: Templates */}
        <button
          type="button"
          onClick={() => handleTabClick('templates')}
          className={`px-3 sm:px-5 py-2 rounded-2xl flex items-center gap-1.5 text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'templates'
              ? 'clay-toggle is-active shadow-md'
              : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>{t('nav.templates', lang)}</span>
        </button>

        {/* Tab 2: Creation (Prominent Central Pill) */}
        <button
          type="button"
          onClick={() => handleTabClick('creation')}
          className={`px-4 sm:px-6 py-2.5 rounded-2xl flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-black transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'creation'
              ? 'clay-btn-primary shadow-lg scale-105'
              : 'clay-surface text-blue-600 dark:text-blue-400 hover:scale-[1.02]'
          }`}
        >
          <Wand2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>{t('nav.creation', lang)}</span>
        </button>

        {/* Tab 3: About */}
        <button
          type="button"
          onClick={() => handleTabClick('about')}
          className={`px-3 sm:px-5 py-2 rounded-2xl flex items-center gap-1.5 text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'about'
              ? 'clay-toggle is-active shadow-md'
              : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
          }`}
        >
          <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">{t('nav.about', lang)}</span>
          <span className="sm:hidden">About</span>
        </button>

        {/* Tab 4: Subscription */}
        <button
          type="button"
          onClick={() => handleTabClick('subscription')}
          className={`px-3 sm:px-5 py-2 rounded-2xl flex items-center gap-1.5 text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'subscription'
              ? 'clay-toggle is-active shadow-md'
              : 'text-slate-700 dark:text-slate-300 hover:text-amber-500'
          }`}
        >
          <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
          <span className="hidden sm:inline">{t('nav.subscription', lang)}</span>
        </button>
      </div>
    </nav>
  );
};
