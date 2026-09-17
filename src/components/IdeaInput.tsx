import React from 'react';
import { MessageSquareQuote, Lightbulb } from 'lucide-react';

interface IdeaInputProps {
  value: string;
  onChange: (value: string) => void;
  templateTitle: string;
}

const INSPIRATION_IDEAS: Record<string, string[]> = {
  'Cinematic Selfie': [
    'Walking through neon rain with dramatic reflections',
    'Stepping out of a helicopter at dusk'
  ],
  'Luxury Life': [
    'Walking through a luxury hotel while everyone turns to look at me',
    'Lounging on a yacht deck at sunset with champagne'
  ],
  'Red Carpet': [
    'Paparazzi flashbulbs popping as I wave to the crowd',
    'Stepping out of a black limousine into golden lighting'
  ],
  'Future Me': [
    'Cybernetic visor scanning holographic data in 2088',
    'Standing atop a neon skyscraper overlooking flying cars'
  ]
};

export const IdeaInput: React.FC<IdeaInputProps> = ({
  value,
  onChange,
  templateTitle
}) => {
  const maxLength = 160;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (text.length <= maxLength) {
      onChange(text);
    }
  };

  const handleInspirationClick = (idea: string) => {
    onChange(idea.slice(0, maxLength));
  };

  const ideasForTemplate = INSPIRATION_IDEAS[templateTitle] || INSPIRATION_IDEAS['Cinematic Selfie'];

  return (
    <section className="w-full space-y-2">
      <div className="flex items-center justify-between px-1">
        <label
          htmlFor="idea-input"
          className="text-xs sm:text-sm font-bold tracking-tight flex items-center gap-1.5"
        >
          <MessageSquareQuote className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          What should happen?
        </label>
        <span
          className={`text-xs font-semibold tabular-nums ${
            value.length >= 150 ? 'text-amber-500' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          {value.length} / {maxLength}
        </span>
      </div>

      {/* Recessed Clay Input Pill Container (Inspired by reference sunken fields) */}
      <div className="clay-inset px-3.5 py-2.5 rounded-2xl flex items-center focus-within:ring-2 focus-within:ring-blue-500/60 transition-all">
        <input
          id="idea-input"
          type="text"
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          placeholder="Describe your idea... (e.g. Walking into a luxury hotel lobby)"
          className="w-full bg-transparent border-0 outline-none text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 font-medium leading-relaxed"
        />
      </div>

      {/* Quick Inspiration Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 dark:text-slate-400 flex-shrink-0">
          <Lightbulb className="w-3 h-3 text-amber-500" />
          <span>Idea:</span>
        </div>
        {ideasForTemplate.map((idea, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleInspirationClick(idea)}
            className="clay-toggle px-2.5 py-1 text-[10px] font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 active:scale-95 transition-all text-left whitespace-nowrap flex-shrink-0"
          >
            "{idea.length > 38 ? idea.slice(0, 38) + '...' : idea}"
          </button>
        ))}
      </div>
    </section>
  );
};
