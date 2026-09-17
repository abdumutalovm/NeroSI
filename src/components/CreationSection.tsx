import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Image as ImageIcon, Video, Dice5, Wand2, Upload, X, Info, ShieldCheck } from 'lucide-react';
import { TemplateItem, ALL_TEMPLATES } from '../data/templates';
import { GenerateButton } from './GenerateButton';
import { ResultCard } from './ResultCard';
import { GenerationResult } from '../services/imageGeneration';
import { VideoStatus } from '../services/videoGeneration';
import { Language, t } from '../i18n/i18n';

interface CreationSectionProps {
  selectedTemplate: TemplateItem;
  onSelectTemplate: (tmpl: TemplateItem) => void;
  onGoToTemplates: () => void;
  photoDataUrl: string | null;
  onPhotoSelected: (url: string | null) => void;
  faceLockEnabled: boolean;
  onToggleFaceLock: (enabled: boolean) => void;
  customIdea: string;
  onIdeaChange: (val: string) => void;
  onGenerate: (mode: 'text-to-image' | 'template-face' | 'video-demo', promptOverride?: string) => void;
  isGenerating: boolean;
  loadingStep: string;
  resultData: GenerationResult | null;
  videoStatus: VideoStatus | null;
  onCreateAgain: () => void;
  lang: Language;
}

type StudioMode = 'image' | 'video';

const RANDOM_PROMPTS = [
  'A cinematic portrait under golden hour light in a neon-lit Tokyo street, 8k photorealistic',
  'Walking through a luxury European hotel while everyone turns to look, editorial fashion style',
  'Futuristic cybernetic explorer standing on a balcony overlooking neon flying cars, sci-fi',
  'Hollywood red carpet premiere with flashing cameras and elegant formal aesthetic, cinematic',
  'Vintage old-money aristocrat lounging in an Italian villa library at sunset, warm tones'
];

export const CreationSection: React.FC<CreationSectionProps> = ({
  selectedTemplate,
  onSelectTemplate,
  onGoToTemplates,
  photoDataUrl,
  onPhotoSelected,
  faceLockEnabled,
  onToggleFaceLock,
  customIdea,
  onIdeaChange,
  onGenerate,
  isGenerating,
  loadingStep,
  resultData,
  videoStatus,
  onCreateAgain,
  lang
}) => {
  // Default to VIDEO mode per requirements
  const [studioMode, setStudioMode] = useState<StudioMode>('video');
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '1:1' | '16:9'>('9:16');
  const [showFaceLockTooltip, setShowFaceLockTooltip] = useState(false);
  const [showTemplateNotif, setShowTemplateNotif] = useState(false);
  const [showEmptyPromptWarning, setShowEmptyPromptWarning] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const maxLength = 200;

  // Template-selected notification auto-dismiss
  useEffect(() => {
    if (showTemplateNotif) {
      const timer = setTimeout(() => setShowTemplateNotif(false), 2800);
      return () => clearTimeout(timer);
    }
  }, [showTemplateNotif]);

  // Empty prompt warning auto-dismiss
  useEffect(() => {
    if (showEmptyPromptWarning) {
      const timer = setTimeout(() => setShowEmptyPromptWarning(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [showEmptyPromptWarning]);

  const handleRandomPrompt = () => {
    const random = RANDOM_PROMPTS[Math.floor(Math.random() * RANDOM_PROMPTS.length)];
    onIdeaChange(random.slice(0, maxLength));
  };

  const handleTriggerGenerate = () => {
    if (!customIdea.trim()) {
      setShowEmptyPromptWarning(true);
      promptRef.current?.focus();
      return;
    }
    if (studioMode === 'video') {
      onGenerate('video-demo', customIdea);
    } else {
      onGenerate('text-to-image', customIdea);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      onPhotoSelected(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    onPhotoSelected(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRecommendedTemplateClick = (tmpl: TemplateItem) => {
    if (tmpl.id === selectedTemplate.id) {
      onGoToTemplates();
      return;
    }
    onSelectTemplate(tmpl);
    setShowTemplateNotif(true);
    setTimeout(() => {
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const recommendedTemplates = ALL_TEMPLATES.filter(tmpl => tmpl.id !== selectedTemplate.id).slice(0, 4);

  return (
    <div ref={topRef} className="w-full space-y-6 animate-in fade-in duration-300">

      {/* Template Selected Toast */}
      <div
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          showTemplateNotif
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-6 pointer-events-none'
        }`}
      >
        <div className="clay-surface px-5 py-2.5 flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 shadow-xl border border-emerald-500/30 rounded-2xl">
          <ShieldCheck className="w-4 h-4" />
          {t('creation.templateSelected', lang)}
        </div>
      </div>

      {/* Studio Header & Mode Tabs */}
      <div className="clay-surface p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <img src="/nero-logo.png" alt="NERO" className="w-8 h-8 object-contain" />
          <div className="text-left">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100">
              {t('creation.title', lang)}
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {t('creation.subtitle', lang)}
            </p>
          </div>
        </div>

        {/* Mode Tabs */}
        <div className="clay-inset p-1 rounded-2xl flex items-center gap-1 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setStudioMode('image')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              studioMode === 'image'
                ? 'clay-toggle is-active'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Rasm generatsiyasi</span>
          </button>

          <button
            type="button"
            onClick={() => setStudioMode('video')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              studioMode === 'video'
                ? 'clay-toggle is-active'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Video generatsiyasi</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column - Controls */}
        <div className="lg:col-span-7 clay-card p-5 sm:p-6 space-y-5">

          {/* Active Template — clickable → go to templates */}
          <button
            type="button"
            onClick={onGoToTemplates}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all text-left group"
            title="Boshqa template tanlash uchun bosing"
          >
            <div className="flex items-center gap-2.5">
              <img
                src={selectedTemplate.previewUrl}
                alt={selectedTemplate.title}
                className="w-10 h-12 rounded-xl object-cover"
                loading="lazy"
              />
              <div>
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                  {t('creation.activeTemplate', lang)}
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {selectedTemplate.title}
                </h4>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Boshqasini tanlash uchun bosing →</span>
              </div>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
              {selectedTemplate.category}
            </span>
          </button>

          {/* ========= IMAGE MODE ========= */}
          {studioMode === 'image' && (
            <div className="space-y-4">

              {/* Prompt */}
              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <label className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    {t('creation.promptLabel', lang)}
                  </label>
                  <button
                    type="button"
                    onClick={handleRandomPrompt}
                    className="clay-toggle px-2.5 py-1 text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1"
                  >
                    <Dice5 className="w-3.5 h-3.5" />
                    <span>{t('creation.randomIdea', lang)}</span>
                  </button>
                </div>

                <div className="relative">
                  <div className="clay-inset p-3.5 rounded-2xl">
                    <textarea
                      ref={promptRef}
                      value={customIdea}
                      onChange={(e) => {
                        onIdeaChange(e.target.value.slice(0, maxLength));
                        if (showEmptyPromptWarning) setShowEmptyPromptWarning(false);
                      }}
                      maxLength={maxLength}
                      rows={4}
                      placeholder={t('creation.promptPlaceholder', lang)}
                      className="w-full bg-transparent border-0 outline-none text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 resize-none font-medium leading-relaxed"
                    />
                  </div>
                  {/* Empty prompt warning */}
                  {showEmptyPromptWarning && (
                    <div className="absolute -bottom-7 left-0 text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1 animate-in slide-in-from-top-1 duration-200">
                      <span>⚠ Iltimos, prompt kiriting</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs px-1 mt-1">
                  <span className="text-slate-500 dark:text-slate-400">
                    {t('creation.noPhotoNote', lang)}
                  </span>
                  <span className="text-slate-400 tabular-nums font-mono">
                    {customIdea.length}/{maxLength}
                  </span>
                </div>
              </div>

              {/* Optional Photo Upload */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-slate-500" />
                  {t('creation.uploadOptional', lang)}
                </label>

                {!photoDataUrl ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="clay-inset p-4 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-blue-500/5 transition-all border-2 border-dashed border-slate-300/60 dark:border-slate-700/60 hover:border-blue-400/60"
                  >
                    <Upload className="w-6 h-6 text-slate-400" />
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {t('creation.uploadBtn', lang)}
                    </p>
                    <p className="text-[11px] text-slate-400 text-center">
                      {t('creation.uploadHint', lang)}
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-3 clay-inset rounded-2xl">
                    <img
                      src={photoDataUrl}
                      alt="Uploaded"
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {t('creation.changePhoto', lang)}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onToggleFaceLock(!faceLockEnabled)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all clay-toggle ${faceLockEnabled ? 'is-active' : ''}`}
                        >
                          <ShieldCheck className="w-3 h-3" />
                          {faceLockEnabled ? t('creation.faceLockOn', lang) : t('creation.faceLockOff', lang)}
                        </button>
                        <div className="relative">
                          <button
                            type="button"
                            onMouseEnter={() => setShowFaceLockTooltip(true)}
                            onMouseLeave={() => setShowFaceLockTooltip(false)}
                            onClick={() => setShowFaceLockTooltip(v => !v)}
                            className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all"
                          >
                            <Info className="w-3 h-3" />
                          </button>
                          {showFaceLockTooltip && (
                            <div className="absolute left-0 bottom-7 z-50 w-60 clay-card p-3 text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed shadow-2xl">
                              {t('creation.faceLockTooltip', lang)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="clay-toggle p-1.5 text-slate-500 hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>
            </div>
          )}

          {/* ========= VIDEO MODE ========= */}
          {studioMode === 'video' && (
            <div className="space-y-4">
              {/* Notice banner */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5">
                <Video className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-amber-700 dark:text-amber-300">Video Generatsiyasi</p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                    {t('creation.videoNotice', lang)}
                  </p>
                </div>
              </div>

              {/* Image upload for video */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-slate-500" />
                  {t('creation.uploadOptional', lang)}
                </label>
                {!photoDataUrl ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="clay-inset p-4 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-blue-500/5 transition-all border-2 border-dashed border-slate-300/60 dark:border-slate-700/60 hover:border-blue-400/60"
                  >
                    <Upload className="w-6 h-6 text-slate-400" />
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Rasm yuklash</p>
                    <p className="text-[11px] text-slate-400">JPG, PNG, WEBP • Ixtiyoriy</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-3 clay-inset rounded-2xl">
                    <img src={photoDataUrl} alt="Uploaded" className="w-14 h-14 rounded-xl object-cover" />
                    <p className="flex-1 text-xs font-bold text-slate-900 dark:text-slate-100">Rasm tanlandi</p>
                    <button type="button" onClick={handleRemovePhoto} className="clay-toggle p-1.5 text-slate-500 hover:text-red-500 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              </div>

              {/* Video Prompt */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  {t('creation.videoLabel', lang)}
                </label>
                <div className="relative">
                  <div className="clay-inset p-3.5 rounded-2xl">
                    <textarea
                      ref={promptRef}
                      value={customIdea}
                      onChange={(e) => {
                        onIdeaChange(e.target.value.slice(0, maxLength));
                        if (showEmptyPromptWarning) setShowEmptyPromptWarning(false);
                      }}
                      maxLength={maxLength}
                      rows={4}
                      placeholder={t('creation.videoPlaceholder', lang)}
                      className="w-full bg-transparent border-0 outline-none text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 resize-none"
                    />
                  </div>
                  {showEmptyPromptWarning && (
                    <div className="absolute -bottom-7 left-0 text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1 animate-in slide-in-from-top-1 duration-200">
                      <span>⚠ Iltimos, prompt kiriting</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-end text-xs px-1 mt-1">
                  <span className="text-slate-400 tabular-nums font-mono">{customIdea.length}/{maxLength}</span>
                </div>
              </div>
            </div>
          )}

          {/* Aspect Ratio (for both modes) */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
              {t('creation.format', lang)}:
            </span>
            <div className="flex items-center gap-2">
              {(['9:16', '1:1', '16:9'] as const).map((ratio) => (
                <button
                  key={ratio}
                  type="button"
                  onClick={() => setAspectRatio(ratio)}
                  className={`clay-toggle px-3 py-1.5 text-xs font-bold transition-all ${
                    aspectRatio === ratio ? 'is-active' : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <div className={showEmptyPromptWarning ? 'mt-8' : ''}>
            <GenerateButton
              onClick={handleTriggerGenerate}
              isLoading={isGenerating}
              loadingStep={loadingStep}
              disabled={false}
              lang={lang}
            />
          </div>
        </div>

        {/* Right Column - Result */}
        <div className="lg:col-span-5 lg:sticky lg:top-5 clay-card p-4 sm:p-5">
          <ResultCard
            imageUrl={resultData?.imageUrl || null}
            originalSelfieUrl={photoDataUrl}
            videoUrl={videoStatus?.videoUrl}
            templateTitle={selectedTemplate.title}
            templateId={selectedTemplate.id}
            templatePreviewUrl={selectedTemplate.previewUrl}
            isGenerating={isGenerating}
            loadingStep={loadingStep}
            videoFallbackMessage={videoStatus?.fallbackMessage}
            videoPromptPreview={videoStatus?.videoPrompt}
            faceLockPreserved={resultData ? resultData.faceLockPreserved : !!photoDataUrl}
            provider={resultData?.provider || (photoDataUrl ? 'face-lock' : 'flux-serverless')}
            onCreateAgain={onCreateAgain}
            lang={lang}
          />
        </div>
      </div>

      {/* Recommended Templates */}
      <div className="clay-card p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800 pb-3">
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            {t('creation.recommended', lang)}
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {t('creation.recommendedHint', lang)}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {recommendedTemplates.map((tmpl) => (
            <div
              key={tmpl.id}
              onClick={() => handleRecommendedTemplateClick(tmpl)}
              className="clay-template-card p-2 cursor-pointer text-left"
            >
              <div className="clay-inset p-1 rounded-xl overflow-hidden aspect-[4/5] mb-2 bg-slate-100 dark:bg-slate-800">
                <img
                  src={tmpl.previewUrl}
                  alt={tmpl.title}
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
              <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                {tmpl.title}
              </h5>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                {tmpl.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
