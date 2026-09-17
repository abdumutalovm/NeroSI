import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Globe, User, Check } from 'lucide-react';
import { Language, LANGUAGE_NAMES } from '../i18n/i18n';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  lang: Language;
  onLangChange: (lang: Language) => void;
  onLogoClick: () => void;
  onProfileClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  onToggleDarkMode,
  lang,
  onLangChange,
  onLogoClick,
  onProfileClick
}) => {
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    if (langOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [langOpen]);

  const LANGS: Language[] = ['uz', 'ru', 'en', 'ky', 'kaa', 'kk'];

  return (
    <header className="w-full py-3 px-2 sm:px-4 flex items-center justify-between select-none">
      {/* Brand: Logo + "ero" text */}
      <button
        type="button"
        onClick={onLogoClick}
        className="flex items-center gap-1 cursor-pointer active:scale-95 transition-all"
        aria-label="NERO - Ana menyu"
      >
        <img
          src="/nero-logo.png"
          alt="NERO Logo"
          className="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-lg"
          draggable={false}
        />
        <span className="text-2xl sm:text-3xl font-black tracking-tight text-slate-800 dark:text-slate-100">
          ero
        </span>
      </button>

      {/* Right Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2">

        {/* Language Selector — clean dropdown */}
        <div className="relative" ref={langRef}>
          <button
            type="button"
            onClick={() => setLangOpen(v => !v)}
            className="clay-toggle px-3 py-2 flex items-center gap-1.5 text-xs font-bold transition-all"
            title="Til / Language"
          >
            <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="uppercase text-[11px] font-black">{lang}</span>
          </button>

          {langOpen && (
            <div className="absolute right-0 top-full mt-2 clay-card p-1.5 z-50 min-w-[150px] shadow-2xl">
              {LANGS.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => { onLangChange(l); setLangOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                    l === lang
                      ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {LANGUAGE_NAMES[l]}
                  {l === lang && <Check className="w-3 h-3" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dark Mode Toggle */}
        <button
          type="button"
          onClick={onToggleDarkMode}
          className="clay-toggle p-2 sm:px-3 sm:py-2 flex items-center gap-1.5 text-xs font-bold transition-all"
          title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? (
            <>
              <Sun className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline text-[11px]">Light</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              <span className="hidden sm:inline text-[11px]">Dark</span>
            </>
          )}
        </button>

        {/* Profile Button */}
        <button
          type="button"
          onClick={onProfileClick}
          className="clay-toggle p-2 sm:px-3 sm:py-2 flex items-center gap-1.5 text-xs font-bold transition-all"
          title="Profil"
        >
          <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
          <span className="hidden sm:inline text-[11px]">Profil</span>
        </button>
      </div>
    </header>
  );
};
