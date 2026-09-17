import React from 'react';
import { Wand2, Loader2, Sparkles } from 'lucide-react';
import { Language, t } from '../i18n/i18n';

interface GenerateButtonProps {
  onClick: () => void;
  isLoading: boolean;
  loadingStep: string;
  disabled: boolean;
  lang: Language;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({
  onClick,
  isLoading,
  loadingStep,
  disabled,
  lang
}) => {
  return (
    <div className="w-full pt-1 flex flex-col items-center select-none">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled || isLoading}
        className={`clay-btn-primary w-full py-4 px-6 flex items-center justify-center gap-2.5 text-base sm:text-lg font-black tracking-wide shadow-xl ${
          isLoading ? 'cursor-wait' : ''
        }`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin text-white/90" />
            <span className="text-white font-bold">{loadingStep || t('creation.creating', lang)}</span>
          </>
        ) : (
          <>
            <Wand2 className="w-5 h-5 text-blue-100 stroke-[2.4]" />
            <span className="text-white">{t('creation.createBtn', lang)}</span>
            <Sparkles className="w-4 h-4 text-blue-200" />
          </>
        )}
      </button>
    </div>
  );
};
