import React from 'react';
import { Crown, Check, Star, Zap, Sparkles, Rocket } from 'lucide-react';
import { Language, t } from '../i18n/i18n';

interface SubscriptionSectionProps {
  lang: Language;
}

interface PlanData {
  id: string;
  name: string;
  price: string;
  perMonth: string;
  credits: string;
  videoCount: number;
  videoDuration: number;
  videoQuality: string;
  videoDurationNote: string;
  features: { text: string; included: boolean }[];
  popular: boolean;
  current: boolean;
  icon: React.ReactNode;
  accentClass: string;
  badgeClass: string;
}

const PLANS: PlanData[] = [
  {
    id: 'free',
    name: 'Bepul',
    price: '0',
    perMonth: 'so\'m/oy',
    credits: '',
    videoCount: 0,
    videoDuration: 0,
    videoQuality: '',
    videoDurationNote: '',
    features: [
      { text: '2 ta rasm generatsiyasi (bir martalik)', included: true },
      { text: 'Barcha templatelarni ko\'rish', included: true },
      { text: 'Watermark bilan', included: true },
      { text: 'Video generatsiyasi mavjud emas', included: false },
      { text: 'Face Lock', included: false },
      { text: 'HD sifat', included: false },
    ],
    popular: false,
    current: true,
    icon: <Sparkles className="w-5 h-5" />,
    accentClass: 'text-slate-600 dark:text-slate-300',
    badgeClass: 'bg-slate-100 dark:bg-slate-800/60 text-slate-500',
  },
  {
    id: 'lite',
    name: 'Lite',
    price: '49 000',
    perMonth: 'so\'m/oy',
    credits: '550 kredit/oy',
    videoCount: 6,
    videoDuration: 5,
    videoQuality: '480p',
    videoDurationNote: '= jami ~30 soniya video (tarifga qarab uzunroq video kamroq marta)',
    features: [
      { text: 'Watermarksiz', included: true },
      { text: 'Barcha templatelar', included: true },
      { text: 'Rasm generatsiyasi', included: true },
      { text: '480p video sifat', included: true },
      { text: 'Face Lock', included: false },
      { text: 'HD sifat', included: false },
    ],
    popular: false,
    current: false,
    icon: <Zap className="w-5 h-5" />,
    accentClass: 'text-emerald-600 dark:text-emerald-400',
    badgeClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '99 000',
    perMonth: 'so\'m/oy',
    credits: '1200 kredit/oy',
    videoCount: 6,
    videoDuration: 5,
    videoQuality: '720p HD',
    videoDurationNote: '= jami ~30 soniya HD video (uzunroq video kamroq marta)',
    features: [
      { text: 'Watermarksiz', included: true },
      { text: 'Barcha templatelar', included: true },
      { text: 'Rasm generatsiyasi', included: true },
      { text: '720p HD video sifat', included: true },
      { text: 'Face Lock', included: true },
      { text: 'HD rasm sifati', included: true },
    ],
    popular: true,
    current: false,
    icon: <Crown className="w-5 h-5" />,
    accentClass: 'text-blue-600 dark:text-blue-400',
    badgeClass: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  },
  {
    id: 'ultra',
    name: 'Ultra',
    price: '249 000',
    perMonth: 'so\'m/oy',
    credits: '3200 kredit/oy',
    videoCount: 16,
    videoDuration: 5,
    videoQuality: '720p HD',
    videoDurationNote: '= jami ~80 soniya HD video (uzunroq video kamroq marta)',
    features: [
      { text: 'Watermarksiz', included: true },
      { text: 'Barcha templatelar', included: true },
      { text: 'Rasm generatsiyasi', included: true },
      { text: '720p HD + 4K rasm sifat', included: true },
      { text: 'Face Lock', included: true },
      { text: 'Ustuvor generatsiya navbati', included: true },
    ],
    popular: false,
    current: false,
    icon: <Rocket className="w-5 h-5" />,
    accentClass: 'text-amber-500',
    badgeClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  },
];

export const SubscriptionSection: React.FC<SubscriptionSectionProps> = ({ lang }) => {
  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="clay-card p-6 sm:p-8 text-center space-y-3">
        <div className="flex items-center justify-center gap-2 mb-1">
          <img src="/nero-logo.png" alt="NERO" className="w-10 h-10 object-contain" />
          <Crown className="w-6 h-6 text-amber-500" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          {t('sub.title', lang)}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
          {t('sub.subtitle', lang)}
        </p>
      </div>

      {/* Plans Grid — 4 columns on desktop, 2x2 on tablet, 1 on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`clay-card p-5 space-y-4 relative flex flex-col transition-all duration-300 ${
              plan.popular ? 'ring-2 ring-blue-500 xl:scale-[1.02]' : ''
            }`}
          >
            {/* Popular badge */}
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                <span className="clay-btn-primary px-4 py-1 text-[11px] font-black text-white rounded-full flex items-center gap-1 whitespace-nowrap">
                  <Star className="w-3 h-3" />
                  {t('sub.popular', lang)}
                </span>
              </div>
            )}

            {/* Current plan badge */}
            {plan.current && (
              <div className="absolute -top-3 right-3 z-10">
                <span className="bg-emerald-500 text-white px-3 py-1 text-[10px] font-bold rounded-full whitespace-nowrap">
                  {t('sub.currentPlan', lang)}
                </span>
              </div>
            )}

            {/* Plan icon + name */}
            <div className="space-y-2 pt-2">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${plan.badgeClass}`}>
                {plan.icon}
              </div>
              <h3 className={`text-xl font-black ${plan.accentClass}`}>{plan.name}</h3>
            </div>

            {/* Price */}
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
                  {plan.price}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {plan.perMonth}
                </span>
              </div>
            </div>

            {/* HEADLINE: Video capacity (prominent) */}
            {plan.videoCount > 0 ? (
              <div className="clay-inset p-3 rounded-2xl space-y-1">
                <p className="text-2xl font-black text-slate-900 dark:text-slate-100">
                  {plan.videoCount} ta
                </p>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  {plan.videoDuration} soniyalik video ({plan.videoQuality})
                </p>
                <p className="text-[10px] text-slate-400 leading-tight">
                  {plan.videoDurationNote}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium pt-0.5">
                  {plan.credits}
                </p>
              </div>
            ) : (
              <div className="clay-inset p-3 rounded-2xl">
                <p className="text-sm text-slate-400 font-medium">
                  Video generatsiyasi mavjud emas
                </p>
              </div>
            )}

            {/* Features list */}
            <ul className="space-y-2 flex-1">
              {plan.features.map((feature, idx) => (
                <li key={idx} className={`flex items-start gap-2 text-xs font-medium ${
                  feature.included ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 dark:text-slate-600'
                }`}>
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    feature.included ? 'bg-emerald-500/15' : 'bg-slate-100 dark:bg-slate-800'
                  }`}>
                    {feature.included && <Check className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />}
                  </div>
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button
              type="button"
              disabled={plan.current}
              className={`w-full py-3 rounded-2xl text-sm font-bold transition-all mt-auto ${
                plan.current
                  ? 'clay-inset text-slate-400 cursor-default'
                  : plan.popular
                  ? 'clay-btn-primary text-white shadow-lg active:scale-[0.98]'
                  : 'clay-btn text-slate-700 dark:text-slate-200 active:scale-[0.98]'
              }`}
            >
              {plan.current ? t('sub.currentPlan', lang) : t('sub.upgrade', lang)}
            </button>
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <div className="clay-surface p-4 rounded-2xl text-center">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          💳 To'lov tizimi tez orada ulangandan so'ng yangilanadi. Hozircha barcha rejimlar bepul sinov rejimida.
        </p>
      </div>
    </div>
  );
};
