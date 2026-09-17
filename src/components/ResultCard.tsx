import React, { useState } from 'react';
import { Download, RotateCcw, AlertCircle, Copy, Check, Sparkles, Film, ShieldCheck, Eye, Sparkle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, t } from '../i18n/i18n';


interface ResultCardProps {
  imageUrl: string | null;
  originalSelfieUrl?: string | null;
  videoUrl?: string;
  templateTitle: string;
  templateId: string;
  templatePreviewUrl: string;
  isGenerating: boolean;
  loadingStep: string;
  videoFallbackMessage?: string;
  videoPromptPreview?: string;
  faceLockPreserved?: boolean;
  provider?: 'face-lock' | 'google-genai' | 'flux-serverless';
  onCreateAgain: () => void;
  lang: Language;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  imageUrl,
  originalSelfieUrl,
  videoUrl,
  templateTitle,
  templateId,
  templatePreviewUrl,
  isGenerating,
  loadingStep,
  videoFallbackMessage,
  videoPromptPreview,
  faceLockPreserved = true,
  provider = 'face-lock',
  onCreateAgain,
  lang
}) => {
  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showOriginalComparison, setShowOriginalComparison] = useState(false);

  const handleSave = async () => {
    if (!imageUrl) return;
    setIsSaving(true);
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#2563EB', '#3B82F6', '#60A5FA', '#93C5FD']
      });

      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nero-${templateId}-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch {
      window.open(imageUrl, '_blank');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyPrompt = () => {
    if (!videoPromptPreview) return;
    navigator.clipboard.writeText(videoPromptPreview);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreateAgainClick = () => {
    onCreateAgain();
  };

  const toggleComparison = () => {
    setShowOriginalComparison(!showOriginalComparison);
  };

  return (
    <div className="clay-surface p-4 sm:p-5 w-full flex flex-col items-center space-y-4">
      {/* Header Bar */}
      <div className="w-full flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
              {imageUrl ? t('result.title', lang) : t('result.studio', lang)}
            </h3>
            <p className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">
              {templateTitle} • 9:16
            </p>
          </div>
        </div>

        {faceLockPreserved && (
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            <span>{t('result.faceLock', lang)}</span>
          </span>
        )}
      </div>

      {/* 9:16 Vertical Screen Container */}
      <div className="w-full max-w-[280px] sm:max-w-[310px] aspect-[9/16] clay-inset p-2 rounded-2xl relative overflow-hidden bg-slate-950 flex items-center justify-center shadow-inner">
        {/* Loading Overlay */}
        {isGenerating && (
          <div className="absolute inset-0 z-30 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center space-y-3 animate-in fade-in duration-200">
            <div className="clay-surface p-3 rounded-2xl text-blue-500 animate-pulse">
              <Sparkle className="w-6 h-6 animate-spin-slow stroke-[2.5]" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-white tracking-wide">
                {loadingStep || t('result.generating', lang)}
              </p>
              <p className="text-[10px] text-slate-400">
                {t('result.generatingDesc', lang)}
              </p>
            </div>
          </div>
        )}

        {/* Content */}
        {imageUrl ? (
          showOriginalComparison && originalSelfieUrl ? (
            <div className="grid grid-cols-2 gap-1.5 w-full h-full p-0.5">
              <div className="h-full rounded-xl overflow-hidden relative bg-slate-900">
                <img src={originalSelfieUrl} alt="Original" className="w-full h-full object-cover" />
                <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/70 text-white text-[9px] font-bold">
                  {t('result.original', lang)}
                </span>
              </div>
              <div className="h-full rounded-xl overflow-hidden relative bg-slate-900">
                <img src={imageUrl} alt="AI Creation" className="w-full h-full object-cover" />
                <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-blue-600/90 text-white text-[9px] font-bold">
                  {t('result.faceLock', lang)}
                </span>
              </div>
            </div>
          ) : videoUrl ? (
            <video src={videoUrl} controls autoPlay loop playsInline className="w-full h-full object-cover rounded-xl" />
          ) : (
            <div className="w-full h-full relative group overflow-hidden rounded-xl bg-slate-900">
              <img src={imageUrl} alt="AI Creation" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-white">
                <span className="bg-black/60 px-2 py-0.5 rounded-full font-bold">NERO • {templateTitle}</span>
                <span className="bg-blue-600/80 px-2 py-0.5 rounded-full font-semibold">
                  {provider === 'google-genai' ? 'Google AI' : '✓ AI'}
                </span>
              </div>
            </div>
          )
        ) : (
          <div className="w-full h-full relative overflow-hidden rounded-xl bg-slate-900 group">
            <img src={templatePreviewUrl} alt="Template preview" className="w-full h-full object-cover opacity-60 filter blur-[1px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center space-y-2">
              <div className="clay-surface p-2.5 rounded-xl text-blue-500">
                <Sparkles className="w-5 h-5 stroke-[2.2]" />
              </div>
              <p className="text-xs font-bold text-white">{t('result.readyTitle', lang)}</p>
              <p className="text-[10px] text-slate-300 max-w-[180px]">{t('result.readyDesc', lang)}</p>
            </div>
          </div>
        )}
      </div>

      {/* Action Controls */}
      <div className="w-full space-y-2.5">
        {imageUrl && originalSelfieUrl && (
          <button
            type="button"
            onClick={toggleComparison}
            className="clay-toggle w-full py-2 px-3 flex items-center justify-center gap-1.5 text-xs font-bold active:scale-95 transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-blue-500" />
            <span>{showOriginalComparison ? t('result.hideCompare', lang) : t('result.compare', lang)}</span>
          </button>
        )}

        {imageUrl && (
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="clay-btn-primary py-2.5 px-3 flex items-center justify-center gap-1.5 text-xs font-bold shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isSaving ? t('result.saving', lang) : t('result.save', lang)}</span>
            </button>

            <button
              type="button"
              onClick={handleCreateAgainClick}
              className="clay-btn py-2.5 px-3 flex items-center justify-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('result.createAgain', lang)}</span>
            </button>
          </div>
        )}

        {videoFallbackMessage && (
          <div className="clay-inset p-2.5 rounded-xl space-y-1.5 text-left text-[10px]">
            <div className="flex items-start gap-1.5 text-amber-600 dark:text-amber-400">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
              <p className="font-semibold leading-tight">{videoFallbackMessage}</p>
            </div>
            {videoPromptPreview && (
              <div className="pt-1">
                <div className="flex items-center justify-between font-bold text-slate-600 dark:text-slate-400 mb-1">
                  <span className="flex items-center gap-1">
                    <Film className="w-3 h-3 text-blue-500" />
                    {t('result.videoPromptPreview', lang)}:
                  </span>
                  <button type="button" onClick={handleCopyPrompt} className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5">
                    {copied ? <Check className="w-2.5 h-2.5 text-emerald-500" /> : <Copy className="w-2.5 h-2.5" />}
                    <span>{copied ? t('result.copied', lang) : t('result.copy', lang)}</span>
                  </button>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/80 text-slate-300 font-mono text-[9px] max-h-16 overflow-y-auto leading-relaxed">
                  {videoPromptPreview}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
