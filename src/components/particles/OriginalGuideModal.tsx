import React, { useState } from 'react';
import { ComprehensiveGuideSheet } from '../../data/particleGuidesMap';
import { playJapaneseAudio, soundFx } from '../../utils/audio';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Volume2,
  FileText,
  ChevronLeft,
  ChevronRight,
  Info,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  sheets: ComprehensiveGuideSheet[];
  initialSheetIndex?: number;
}

export const OriginalGuideModal: React.FC<Props> = ({
  isOpen,
  onClose,
  sheets,
  initialSheetIndex = 0
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(initialSheetIndex);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'image' | 'transcription'>('image');

  if (!isOpen || sheets.length === 0) return null;

  const currentSheet = sheets[currentIndex] || sheets[0];

  const handleNext = () => {
    if (currentIndex < sheets.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setZoomLevel(1);
      soundFx.playClick();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setZoomLevel(1);
      soundFx.playClick();
    }
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
    soundFx.playClick();
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
    soundFx.playClick();
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    soundFx.playClick();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div
        className={`bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          isFullScreen
            ? 'w-full h-full rounded-none'
            : 'w-full max-w-5xl h-[92vh] max-h-[900px]'
        }`}
      >
        {/* Modal Header */}
        <div className="p-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50/80 dark:bg-slate-900/80">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold font-serif text-lg flex-shrink-0">
              助
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white truncate">
                  {currentSheet.title}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 flex-shrink-0">
                  Page {currentSheet.pageNumber} of 7
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {currentSheet.captionBn}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {/* View Tab Switcher */}
            <div className="hidden sm:flex items-center bg-slate-200/70 dark:bg-slate-800 rounded-xl p-1 text-xs">
              <button
                onClick={() => setActiveTab('image')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  activeTab === 'image'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                🖼 মূল শিট (Original Sheet)
              </button>
              <button
                onClick={() => setActiveTab('transcription')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  activeTab === 'transcription'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                📝 পড়া ও অডিও (Audio & Notes)
              </button>
            </div>

            {/* Zoom Controls (only in image tab) */}
            {activeTab === 'image' && (
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1 gap-1">
                <button
                  onClick={handleZoomOut}
                  title="Zoom Out"
                  className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono font-bold px-1 text-slate-600 dark:text-slate-300">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  title="Zoom In"
                  className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={handleResetZoom}
                  title="Reset Zoom"
                  className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              title={isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isFullScreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              title="Close"
              className="p-2 rounded-xl text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Multi-Sheet Selector Bar (if particle has more than 1 sheet) */}
        {sheets.length > 1 && (
          <div className="px-6 py-2 border-b border-slate-200/80 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/60 flex items-center justify-between gap-2 overflow-x-auto">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-2">
                শিট নির্বাচন ({sheets.length}টি শিট):
              </span>
              {sheets.map((sheet, idx) => (
                <button
                  key={sheet.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setZoomLevel(1);
                    soundFx.playClick();
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    currentIndex === idx
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  শিট {idx + 1} (পৃষ্ঠা {sheet.pageNumber})
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="p-1 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex === sheets.length - 1}
                className="p-1 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Modal Main Viewport */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 bg-slate-100/50 dark:bg-slate-950 flex flex-col items-center justify-start">
          {activeTab === 'image' ? (
            <div className="w-full flex flex-col items-center justify-center my-auto transition-transform duration-200">
              <div
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
                className="transition-transform duration-150 max-w-4xl w-full shadow-2xl rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700 bg-white"
              >
                <img
                  src={currentSheet.imageUrl}
                  alt={currentSheet.title}
                  className="w-full h-auto block select-none"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          ) : (
            /* Transcription & Interactive Audio Tab */
            <div className="max-w-3xl w-full space-y-6">
              {/* Sheet Overview Card */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                  <Info className="w-4 h-4" />
                  <span>শিটের ব্যাকরণিক নিয়ম ও সূত্রাবলী (Key Formulas)</span>
                </div>
                <div className="space-y-2">
                  {currentSheet.keyFormulas.map((f, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold text-slate-800 dark:text-slate-200"
                    >
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bengali Explanations from the Sheet */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-500" />
                  <span>বাংলা নিয়মের সারসংক্ষেপ</span>
                </h4>
                <div className="space-y-2">
                  {currentSheet.keyBengaliRules.map((r, idx) => (
                    <p
                      key={idx}
                      className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-emerald-50/50 dark:bg-emerald-950/20 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/30"
                    >
                      {r}
                    </p>
                  ))}
                </div>
              </div>

              {/* Japanese Sentences with Audio from the Sheet */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-indigo-500" />
                    <span>শিটের বাক্য ও জাপানি উচ্চারণ শোনেন (Audio Playback)</span>
                  </h4>
                  <span className="text-[11px] text-slate-400 font-medium">
                    (স্পিকার আইকনে ক্লিক করে শুনুন)
                  </span>
                </div>

                <div className="space-y-3">
                  {currentSheet.keyExamples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold text-slate-900 dark:text-white font-serif">
                            {ex.jp}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                          {ex.reading}
                        </p>
                        <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                          {ex.bn}
                        </p>
                        {ex.note && (
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                            {ex.note}
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => playJapaneseAudio(ex.reading || ex.jp)}
                        className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 transition-all flex items-center justify-center flex-shrink-0 self-start sm:self-center"
                        title="উচ্চারণ শুনুন"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Important Notes Callout */}
              {currentSheet.importantNotes.length > 0 && (
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-amber-900 dark:text-amber-300 text-xs space-y-1.5">
                  <div className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>বিশেষ স্মরণীয় নোট:</span>
                  </div>
                  {currentSheet.importantNotes.map((note, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {note}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Footer Info */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span>উৎস: Grammar Part 1 - Particles</span>
            <span>·</span>
            <span>লেখক: মাকসুদ আলম (Maksud Alam)</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={currentSheet.imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>SVG ফাইল ভিউ করুন</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
