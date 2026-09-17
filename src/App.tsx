import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { NavigationDock, ActiveTab } from './components/NavigationDock';
import { TemplatesSection } from './components/TemplatesSection';
import { CreationSection } from './components/CreationSection';
import { AboutSection } from './components/AboutSection';
import { SubscriptionSection } from './components/SubscriptionSection';
import { ProfileSection } from './components/ProfileSection';
import { ALL_TEMPLATES, TemplateItem } from './data/templates';
import { generateAiImage, GenerationResult } from './services/imageGeneration';
import { generateAiVideo, VideoStatus } from './services/videoGeneration';
import { Language } from './i18n/i18n';

export function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('nero_dark_mode');
    if (saved !== null) return saved === 'true';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('nero_lang') as Language) || 'uz';
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('templates');

  // Studio Creation State
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateItem>(ALL_TEMPLATES[0]);
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [customIdea, setCustomIdea] = useState<string>('');
  const [faceLockEnabled, setFaceLockEnabled] = useState<boolean>(true);

  // Generation state
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [resultData, setResultData] = useState<GenerationResult | null>(null);
  const [videoStatus, setVideoStatus] = useState<VideoStatus | null>(null);

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('nero_dark_mode', String(isDarkMode));
  }, [isDarkMode]);

  const handleLangChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('nero_lang', newLang);
  };

  // When a user selects a template in Section 1, auto-navigate to Creation section!
  const handleSelectTemplateFromGallery = (tmpl: TemplateItem) => {
    setSelectedTemplate(tmpl);
    setActiveTab('creation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenerate = async (
    mode: 'text-to-image' | 'template-face' | 'video-demo',
    promptOverride?: string
  ) => {
    setIsGenerating(true);
    setLoadingStep('Tayyorlanmoqda...');

    const promptText = promptOverride || customIdea || selectedTemplate.basePrompt;

    try {
      if (mode === 'video-demo') {
        setLoadingStep('Video ssenariysi tuzilmoqda...');
        await new Promise(r => setTimeout(r, 700));

        const videoResult = await generateAiVideo(
          {
            templateTitle: selectedTemplate.title,
            customIdea: promptText,
            sourceImageUrl: resultData?.imageUrl || selectedTemplate.previewUrl
          },
          (step) => setLoadingStep(step)
        );
        setVideoStatus(videoResult);
        return;
      }

      // Image generation
      const useFace = !!photoDataUrl;

      const imageResult = await generateAiImage(
        {
          templateId: selectedTemplate.id,
          templateTitle: selectedTemplate.title,
          templateBasePrompt: selectedTemplate.basePrompt,
          customIdea: promptText,
          selfieDataUrl: useFace ? (photoDataUrl || undefined) : undefined,
          use100PercentFaceLock: useFace ? faceLockEnabled : false,
          googleApiKey: ''
        },
        (step) => setLoadingStep(step)
      );

      setResultData(imageResult);

      const videoResult = await generateAiVideo(
        {
          templateTitle: selectedTemplate.title,
          customIdea: promptText,
          sourceImageUrl: imageResult.imageUrl
        },
        (step) => setLoadingStep(step)
      );
      setVideoStatus(videoResult);

    } catch (err) {
      console.error('Generation error:', err);
    } finally {
      setIsGenerating(false);
      setLoadingStep('');
    }
  };

  const handleCreateAgain = () => {
    handleGenerate(photoDataUrl ? 'template-face' : 'text-to-image');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] flex flex-col items-center justify-start p-3 sm:p-5 lg:p-7">
      <div className="w-full max-w-6xl flex flex-col space-y-4 sm:space-y-5">
        {/* Top Header */}
        <Header
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(p => !p)}
          lang={lang}
          onLangChange={handleLangChange}
          onLogoClick={() => {
            setActiveTab('templates');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onProfileClick={() => setActiveTab('profile')}
        />

        {/* Navigation Bar */}
        <NavigationDock
          activeTab={activeTab}
          onTabChange={setActiveTab}
          lang={lang}
        />

        {/* Main Content */}
        <main className="w-full pt-1">
          {activeTab === 'templates' && (
            <TemplatesSection
              onSelectTemplate={handleSelectTemplateFromGallery}
              onGoToCreation={() => {
                setActiveTab('creation');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              selectedTemplateId={selectedTemplate.id}
              lang={lang}
            />
          )}

          {activeTab === 'creation' && (
            <CreationSection
              selectedTemplate={selectedTemplate}
              onSelectTemplate={setSelectedTemplate}
              onGoToTemplates={() => setActiveTab('templates')}
              photoDataUrl={photoDataUrl}
              onPhotoSelected={setPhotoDataUrl}
              faceLockEnabled={faceLockEnabled}
              onToggleFaceLock={setFaceLockEnabled}
              customIdea={customIdea}
              onIdeaChange={setCustomIdea}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              loadingStep={loadingStep}
              resultData={resultData}
              videoStatus={videoStatus}
              onCreateAgain={handleCreateAgain}
              lang={lang}
            />
          )}

          {activeTab === 'about' && (
            <AboutSection lang={lang} />
          )}

          {activeTab === 'subscription' && (
            <SubscriptionSection lang={lang} />
          )}

          {activeTab === 'profile' && (
            <ProfileSection lang={lang} />
          )}
        </main>

        {/* Footer */}
        <footer className="w-full py-6 text-center space-y-1 select-none border-t border-slate-200/60 dark:border-slate-800/80 mt-6">
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
            NERO • Viral AI Studio
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            100% Face Lock • Modern 3D Claymorphism • Yordam: @nerosiAdmin
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
