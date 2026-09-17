import React from 'react';
import { Send, AlertTriangle, ShieldCheck, Sparkles, HelpCircle, ArrowUpRight, MessageCircle } from 'lucide-react';
import { Language, t } from '../i18n/i18n';

interface AboutSectionProps {
  lang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  const handleLinkClick = () => {
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300 text-left">
      {/* 1. Platform haqida */}
      <div className="clay-card p-6 sm:p-7 space-y-4">
        <div className="flex items-center gap-3">
          <img src="/nero-logo.png" alt="NERO" className="w-12 h-12 object-contain" />
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              {t('about.title', lang)}
            </h2>
            <p className="text-xs text-blue-600 dark:text-blue-400 font-bold">
              {t('about.subtitle', lang)}
            </p>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          <strong>NERO</strong> — {t('about.desc', lang)}
        </p>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="clay-surface p-4 rounded-2xl space-y-1.5">
            <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-slate-100">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>{t('about.feature1Title', lang)}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
              {t('about.feature1Desc', lang)}
            </p>
          </div>

          <div className="clay-surface p-4 rounded-2xl space-y-1.5">
            <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-slate-100">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span>{t('about.feature2Title', lang)}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
              {t('about.feature2Desc', lang)}
            </p>
          </div>

          <div className="clay-surface p-4 rounded-2xl space-y-1.5">
            <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-slate-100">
              <HelpCircle className="w-4 h-4 text-purple-500" />
              <span>{t('about.feature3Title', lang)}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
              {t('about.feature3Desc', lang)}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Ijtimoiy tarmoqlar */}
      <div className="clay-card p-6 space-y-4">
        <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Send className="w-4 h-4 text-blue-500" />
          {t('about.socialTitle', lang)}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {/* Telegram */}
          <div className="clay-surface p-4 rounded-2xl flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
                <Send className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {t('about.telegram', lang)}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {t('about.telegramDesc', lang)}
              </p>
            </div>
            <a
              href="https://t.me/nerosi"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
              className="clay-btn py-2.5 px-3 flex items-center justify-center gap-1.5 text-xs font-bold text-sky-600 dark:text-sky-400"
            >
              <span>{t('about.telegramBtn', lang)}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Instagram */}
          <div className="clay-surface p-4 rounded-2xl flex flex-col justify-between space-y-3 opacity-90">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold">
                  {t('about.soon', lang)}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {t('about.instagram', lang)}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {t('about.instagramDesc', lang)}
              </p>
            </div>
            <button type="button" disabled className="clay-btn py-2.5 px-3 text-xs font-bold text-slate-400 cursor-not-allowed opacity-70">
              {t('about.soon', lang)}
            </button>
          </div>

          {/* YouTube */}
          <div className="clay-surface p-4 rounded-2xl flex flex-col justify-between space-y-3 opacity-90">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold">
                  {t('about.soon', lang)}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {t('about.youtube', lang)}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {t('about.youtubeDesc', lang)}
              </p>
            </div>
            <button type="button" disabled className="clay-btn py-2.5 px-3 text-xs font-bold text-slate-400 cursor-not-allowed opacity-70">
              {t('about.soon', lang)}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Bug Reporting */}
      <div className="clay-card p-6 sm:p-7 space-y-4 border-2 border-blue-500/30 dark:border-blue-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100">
              {t('about.bugTitle', lang)}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {t('about.bugSubtitle', lang)}
            </p>
          </div>
        </div>

        <div className="clay-inset p-4 rounded-2xl space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <p className="font-bold text-blue-600 dark:text-blue-400">
            {t('about.bugHowTitle', lang)}
          </p>
          <ol className="list-decimal list-inside space-y-1.5 text-xs leading-relaxed">
            <li>{t('about.bugStep1', lang)}</li>
            <li>{t('about.bugStep2', lang)}</li>
            <li>{t('about.bugStep3', lang)}</li>
            <li>
              {t('about.bugStep4', lang)}{' '}
              <strong className="text-blue-600 dark:text-blue-400 font-mono">@nerosiAdmin</strong>
            </li>
          </ol>
        </div>

        <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-sm text-slate-600 dark:text-slate-400">
            {t('about.bugAdmin', lang)}:{' '}
            <a href="https://t.me/nerosiAdmin" target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 dark:text-blue-400 hover:underline font-mono">
              @nerosiAdmin
            </a>
          </div>
          <a
            href="https://t.me/nerosiAdmin"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
            className="clay-btn-primary w-full sm:w-auto px-6 py-3 flex items-center justify-center gap-2 text-sm font-bold shadow-lg"
          >
            <MessageCircle className="w-4 h-4 text-white" />
            <span>{t('about.bugBtn', lang)}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white/80" />
          </a>
        </div>
      </div>
    </div>
  );
};
