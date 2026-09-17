import React, { useState } from 'react';
import { Key, X, Check, ExternalLink, Sparkles } from 'lucide-react';
import { audioService } from '../services/audioService';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveKey: (key: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  apiKey,
  onSaveKey
}) => {
  const [keyInput, setKeyInput] = useState(apiKey);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    audioService.playPop(1.1);
    onSaveKey(keyInput.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 900);
  };

  const handleClear = () => {
    audioService.playPop();
    setKeyInput('');
    onSaveKey('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="clay-card w-full max-w-md p-6 space-y-4 bg-white shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Google AI Studio Setup
              </h3>
              <p className="text-xs text-slate-500">
                gemini-3.1-flash-image / Imagen 3
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              audioService.playPop();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
          <p>
            If you have a Google AI Studio API key, you can enter it here to test the recommended <strong>@google/genai</strong> multimodal generation (gemini-3.1-flash-image).
          </p>
          <div className="flex items-center gap-1 text-[11px] text-indigo-600 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>If left blank, NERO automatically uses the built-in 100% Face Preservation engine for free!</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">
            Google Gemini API Key
          </label>
          <div className="clay-inset p-2.5 rounded-2xl">
            <input
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full bg-transparent border-0 outline-none text-xs font-mono text-slate-800 placeholder-slate-400"
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-indigo-600 hover:underline font-semibold"
          >
            <span>Get free key in Google AI Studio</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          {keyInput && (
            <button
              type="button"
              onClick={handleClear}
              className="text-rose-500 hover:underline font-semibold"
            >
              Clear key
            </button>
          )}
        </div>

        <div className="pt-2 flex gap-2">
          <button
            type="button"
            onClick={() => {
              audioService.playPop();
              onClose();
            }}
            className="clay-btn flex-1 py-2.5 text-xs font-bold text-slate-600"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="clay-btn-primary flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Saved!</span>
              </>
            ) : (
              <span>Save Key</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
