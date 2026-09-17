import React, { useRef, useState } from 'react';
import { Camera, Upload, RefreshCw, CheckCircle2, User, ShieldCheck } from 'lucide-react';

interface PhotoUploadProps {
  photoDataUrl: string | null;
  onPhotoSelected: (dataUrl: string | null) => void;
  faceLockEnabled: boolean;
  onToggleFaceLock: (enabled: boolean) => void;
}

const SAMPLE_SELFIES = [
  {
    name: 'Sample 1',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Sample 2',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Sample 3',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'
  }
];

export const PhotoUpload: React.FC<PhotoUploadProps> = ({
  photoDataUrl,
  onPhotoSelected,
  faceLockEnabled,
  onToggleFaceLock
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      alert('Please upload a JPG, PNG, or WEBP image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        onPhotoSelected(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChangePhoto = () => {
    onPhotoSelected(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSelectSample = (sampleUrl: string) => {
    onPhotoSelected(sampleUrl);
  };

  return (
    <section className="w-full space-y-2.5">
      <div className="flex items-center justify-between px-1">
        <label className="text-xs sm:text-sm font-bold tracking-tight flex items-center gap-1.5">
          <Camera className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          Your photo (Selfie)
        </label>

        {/* 100% Face Lock Pill Switch */}
        <button
          type="button"
          onClick={() => {
            onToggleFaceLock(!faceLockEnabled);
          }}
          className={`clay-toggle px-2.5 py-1 flex items-center gap-1 text-[11px] font-bold transition-all ${
            faceLockEnabled
              ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
              : 'text-slate-400'
          }`}
          title="Toggles 100% exact facial preservation"
        >
          <ShieldCheck className={`w-3.5 h-3.5 ${faceLockEnabled ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
          <span>{faceLockEnabled ? '100% Face Lock ON' : 'Face Lock OFF'}</span>
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
      />

      {!photoDataUrl ? (
        <div className="space-y-2.5">
          {/* Upload Well (Inspired by reference sunken pill style) */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            className={`clay-inset p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 cursor-pointer transition-all duration-200 border-2 border-dashed ${
              isDragging
                ? 'border-blue-500 bg-blue-50/20'
                : 'border-slate-300/80 dark:border-slate-700/80 hover:border-blue-400'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="clay-surface p-2.5 rounded-xl text-blue-600 dark:text-blue-400 flex-shrink-0">
                <Upload className="w-5 h-5 stroke-[2.4]" />
              </div>
              <div className="text-left">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                  Upload your selfie
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  JPG, PNG, WEBP • Yuzingiz 100% o'zgartirilmasdan saqlanadi
                </p>
              </div>
            </div>

            <span className="clay-btn px-3 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">
              Browse photo
            </span>
          </div>

          {/* Quick Demo Sample Picker */}
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <User className="w-3 h-3 text-slate-400" />
              Test with sample:
            </span>
            <div className="flex items-center gap-2">
              {SAMPLE_SELFIES.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectSample(sample.url)}
                  className="clay-toggle w-7 h-7 rounded-full overflow-hidden p-0.5 hover:scale-105 active:scale-95 transition-all"
                  title={`Use ${sample.name}`}
                >
                  <img
                    src={sample.url}
                    alt={sample.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Uploaded Image Preview in compact clay well */
        <div className="clay-surface p-3 sm:p-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="clay-inset p-1 rounded-xl w-14 h-16 sm:w-16 sm:h-18 overflow-hidden flex-shrink-0 relative bg-slate-100 dark:bg-slate-800">
              <img
                src={photoDataUrl}
                alt="Your selfie"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute top-1 right-1 p-0.5 rounded-full bg-emerald-500 text-white shadow-sm">
                <CheckCircle2 className="w-2.5 h-2.5 stroke-[3]" />
              </div>
            </div>

            <div className="text-left space-y-0.5">
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1">
                <span>Selfie ready</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">(100% Face Lock)</span>
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Your face features will be preserved 100% identically.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleChangePhoto}
            className="clay-btn px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1 flex-shrink-0"
          >
            <RefreshCw className="w-3 h-3 text-slate-500" />
            <span>Change</span>
          </button>
        </div>
      )}
    </section>
  );
};
