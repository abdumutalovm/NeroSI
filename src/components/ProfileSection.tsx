import React, { useState } from 'react';
import { User, Camera, CreditCard, Image as ImageIcon, Calendar, LogOut, Sparkles, Crown } from 'lucide-react';
import { Language, t } from '../i18n/i18n';

interface ProfileSectionProps {
  lang: Language;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ lang }) => {
  const [name, setName] = useState('NERO User');
  const [email, setEmail] = useState('user@example.com');

  const handleSave = () => {
  };

  const handleLogout = () => {
  };

  return (
    <div className="w-full space-y-5 animate-in fade-in duration-300 max-w-2xl mx-auto">
      {/* Profile Card */}
      <div className="clay-card p-6 sm:p-8 space-y-5">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          {t('profile.title', lang)}
        </h2>

        {/* Avatar */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 rounded-3xl clay-inset overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20">
              <img src="/nero-logo.png" alt="Profile" className="w-16 h-16 object-contain" />
            </div>
            <button
              type="button"
              onClick={() => {}}
              className="absolute -bottom-2 -right-2 clay-btn p-2 rounded-xl"
              title={t('profile.editPhoto', lang)}
            >

              <Camera className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            </button>
          </div>

          {/* Name & Email Inputs */}
          <div className="flex-1 w-full space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
                {t('profile.name', lang)}
              </label>
              <div className="clay-inset px-4 py-2.5 rounded-2xl">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-0 outline-none text-sm font-medium text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
                {t('profile.email', lang)}
              </label>
              <div className="clay-inset px-4 py-2.5 rounded-2xl">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-0 outline-none text-sm font-medium text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="clay-surface p-3.5 rounded-2xl text-center space-y-1">
            <Crown className="w-5 h-5 text-amber-500 mx-auto" />
            <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              {t('profile.currentPlan', lang)}
            </p>
            <p className="text-sm font-black text-slate-900 dark:text-slate-100">
              Free
            </p>
          </div>

          <div className="clay-surface p-3.5 rounded-2xl text-center space-y-1">
            <CreditCard className="w-5 h-5 text-blue-500 mx-auto" />
            <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              {t('profile.credits', lang)}
            </p>
            <p className="text-sm font-black text-slate-900 dark:text-slate-100">10</p>
          </div>

          <div className="clay-surface p-3.5 rounded-2xl text-center space-y-1">
            <ImageIcon className="w-5 h-5 text-purple-500 mx-auto" />
            <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              {t('profile.generated', lang)}
            </p>
            <p className="text-sm font-black text-slate-900 dark:text-slate-100">0</p>
          </div>

          <div className="clay-surface p-3.5 rounded-2xl text-center space-y-1">
            <Calendar className="w-5 h-5 text-emerald-500 mx-auto" />
            <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              {t('profile.joined', lang)}
            </p>
            <p className="text-sm font-black text-slate-900 dark:text-slate-100">2026</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <button
            type="button"
            onClick={handleSave}
            className="clay-btn-primary flex-1 py-3 flex items-center justify-center gap-2 text-sm font-bold text-white"
          >
            <Sparkles className="w-4 h-4" />
            {t('profile.saveChanges', lang)}
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="clay-btn sm:w-auto px-6 py-3 flex items-center justify-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200"
          >
            <LogOut className="w-4 h-4" />
            {t('profile.logout', lang)}
          </button>
        </div>
      </div>
    </div>
  );
};
