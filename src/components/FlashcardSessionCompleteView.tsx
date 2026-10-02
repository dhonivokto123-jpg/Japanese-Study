import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { toBengaliNumber } from '../utils/vocabCategories';
import { soundFx } from '../utils/audio';
import {
  Sparkles,
  RotateCcw,
  LayoutDashboard,
  CheckCircle2,
  Star,
  Layers,
  Award
} from 'lucide-react';

interface Props {
  sessionType: 'vocabulary' | 'kanji';
  totalCardsViewed: number;
  learnedCount: number;
  reviewCount: number;
  onStartNewSession: () => void;
  onBackToDashboard: () => void;
}

export const FlashcardSessionCompleteView: React.FC<Props> = ({
  sessionType,
  totalCardsViewed,
  learnedCount,
  reviewCount,
  onStartNewSession,
  onBackToDashboard,
}) => {
  const { triggerConfetti } = useApp();

  useEffect(() => {
    triggerConfetti();
    soundFx.playLevelUp();
  }, [triggerConfetti]);

  const typeLabel = sessionType === 'vocabulary' ? 'শব্দভাণ্ডার (Vocabulary)' : 'কানজি (Kanji)';
  const learnedLabel = sessionType === 'vocabulary' ? 'আয়ত্ত করা শব্দ' : 'মাস্টার করা কানজি';

  return (
    <div
      className="w-full max-w-xl mx-auto glass-panel p-6 sm:p-10 rounded-3xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-300 shadow-2xl border border-indigo-500/20"
      id="flashcard-session-complete-container"
    >
      {/* Celebration Icon Header */}
      <div className="relative inline-block">
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 via-rose-400 to-indigo-500 p-0.5 shadow-xl flex items-center justify-center animate-bounce">
          <div className="w-full h-full bg-slate-900 rounded-[22px] flex items-center justify-center text-4xl sm:text-5xl">
            🎉
          </div>
        </div>
        <div className="absolute -top-2 -right-2 p-1.5 rounded-full bg-amber-400 text-slate-950 shadow-md">
          <Sparkles className="w-4 h-4" />
        </div>
      </div>

      {/* Main Title & Message */}
      <div className="space-y-2">
        <h2
          className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight"
          id="flashcard-complete-title"
        >
          🎉 Flashcard Session Complete!
        </h2>
        <p className="text-base sm:text-lg font-bold text-indigo-600 dark:text-indigo-400">
          You have viewed all available cards.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
          অভিনন্দন! আপনি এই সেশনের <span className="font-semibold text-slate-800 dark:text-slate-200">{typeLabel}</span>-এর সবকটি কার্ড সফলভাবে দেখেছেন। কোনো কার্ড পুনরাবৃত্তি ছাড়া পুরো তালিকা সমাপ্ত হয়েছে।
        </p>
      </div>

      {/* Statistics Breakdown Cards */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
        {/* Total Cards Viewed */}
        <div className="p-4 rounded-2xl glass-card border border-indigo-500/20 bg-indigo-500/5 text-center space-y-1">
          <div className="w-7 h-7 mx-auto rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-bold block uppercase tracking-wider">
            Total Cards Viewed
          </span>
          <span className="text-lg sm:text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400 block">
            {toBengaliNumber(totalCardsViewed)}
          </span>
          <span className="text-[10px] text-slate-400 font-medium block">
            মোট দেখা কার্ড
          </span>
        </div>

        {/* Learned Cards */}
        <div className="p-4 rounded-2xl glass-card border border-emerald-500/20 bg-emerald-500/5 text-center space-y-1">
          <div className="w-7 h-7 mx-auto rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-[10px] sm:text-xs text-emerald-600 dark:text-emerald-400 font-bold block uppercase tracking-wider">
            Learned Cards
          </span>
          <span className="text-lg sm:text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 block">
            {toBengaliNumber(learnedCount)}
          </span>
          <span className="text-[10px] text-slate-400 font-medium block">
            {learnedLabel}
          </span>
        </div>

        {/* Review Cards */}
        <div className="p-4 rounded-2xl glass-card border border-amber-500/20 bg-amber-500/5 text-center space-y-1">
          <div className="w-7 h-7 mx-auto rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
          </div>
          <span className="text-[10px] sm:text-xs text-amber-600 dark:text-amber-400 font-bold block uppercase tracking-wider">
            Review Cards
          </span>
          <span className="text-lg sm:text-2xl font-black font-mono text-amber-600 dark:text-amber-400 block">
            {toBengaliNumber(reviewCount)}
          </span>
          <span className="text-[10px] text-slate-400 font-medium block">
            রিভিশনের জন্য চিহ্নিত
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-3 pt-4 border-t border-slate-200/60 dark:border-white/10">
        <button
          type="button"
          onClick={onStartNewSession}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 hover:from-indigo-700 hover:to-violet-800 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-indigo-500/25 active:scale-98 transition-all"
          id="flashcard-new-session-btn"
        >
          <RotateCcw className="w-5 h-5" />
          <span>🔄 Start New Session</span>
        </button>

        <button
          type="button"
          onClick={onBackToDashboard}
          className="w-full py-3 px-6 rounded-2xl glass-btn-secondary font-bold text-sm text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2 cursor-pointer transition-all"
          id="flashcard-back-dashboard-btn"
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>← Back to Learning Dashboard</span>
        </button>
      </div>
    </div>
  );
};
