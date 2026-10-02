import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { VocabItem } from '../types';
import { useApp } from '../context/AppContext';
import { playJapaneseAudio, stopJapaneseAudio, replayJapaneseAudio, soundFx } from '../utils/audio';
import { VOCAB_CATEGORIES, toBengaliNumber } from '../utils/vocabCategories';
import { useFlashcardSession } from '../hooks/useFlashcardSession';
import { FlashcardSessionCompleteView } from './FlashcardSessionCompleteView';
import {
  Volume2,
  RotateCw,
  RotateCcw,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  Check,
  Star,
  Sparkles,
  Layers,
  BookOpen,
  HelpCircle,
  Snail,
} from 'lucide-react';

interface Props {
  initialVocabList: VocabItem[];
}

export const VocabularyFlashcardExperience: React.FC<Props> = ({ initialVocabList }) => {
  const { currentUser, markVocabLearned, unmarkVocabLearned, toggleVocabReview, addXp, setActiveTab } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isSlowPlaying, setIsSlowPlaying] = useState<boolean>(false);

  const learnedIds = currentUser?.stats.learnedVocabIds || [];
  const reviewIds = currentUser?.stats.reviewVocabIds || [];

  // Active category definition
  const activeCategoryDef = useMemo(() => {
    return VOCAB_CATEGORIES.find((c) => c.id === selectedCategory) || VOCAB_CATEGORIES[0];
  }, [selectedCategory]);

  // Filtered vocabulary list for current category
  const categoryVocab = useMemo(() => {
    return initialVocabList.filter(activeCategoryDef.filterFn);
  }, [initialVocabList, activeCategoryDef]);

  // Session state: tracks deck order, current card, seen cards, remaining cards without repeats
  const {
    deck,
    currentCard,
    currentIndex,
    maxViewedIndex,
    isCompleted,
    totalCards,
    cardsAlreadyShown,
    remainingCards,
    isFirstCard,
    isLastCard,
    handleNext: sessionNext,
    handlePrev: sessionPrev,
    handleShuffleRemaining,
    startNewSession,
    shuffleNotice,
  } = useFlashcardSession<VocabItem>(categoryVocab);

  // Dynamic counts for each category to show on pills
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of VOCAB_CATEGORIES) {
      counts[cat.id] = initialVocabList.filter(cat.filterFn).length;
    }
    return counts;
  }, [initialVocabList]);

  // Reset audio & flip on category change
  useEffect(() => {
    stopJapaneseAudio();
    setIsFlipped(false);
  }, [selectedCategory]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    stopJapaneseAudio();
    setIsFlipped(false);
    sessionNext();
  }, [sessionNext]);

  const handlePrev = useCallback(() => {
    stopJapaneseAudio();
    setIsFlipped(false);
    sessionPrev();
  }, [sessionPrev]);

  const handleShuffle = useCallback(() => {
    stopJapaneseAudio();
    setIsFlipped(false);
    handleShuffleRemaining();
    soundFx.playClick();
  }, [handleShuffleRemaining]);

  const handleFlip = useCallback(() => {
    stopJapaneseAudio();
    setIsFlipped((prev) => !prev);
    soundFx.playClick();
  }, []);

  const handlePlayAudio = useCallback(
    async (slow: boolean = false, e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      if (!currentCard) return;
      setIsPlayingAudio(true);
      setIsSlowPlaying(slow);
      const text = currentCard.reading || currentCard.word;
      try {
        await playJapaneseAudio(text, slow ? 0.72 : 0.95);
      } finally {
        setIsPlayingAudio(false);
      }
    },
    [currentCard]
  );

  const handleToggleLearned = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      if (!currentCard) return;
      const isLearned = learnedIds.includes(currentCard.id);
      if (isLearned) {
        unmarkVocabLearned(currentCard.id);
      } else {
        markVocabLearned(currentCard.id, currentCard.lessonId);
        soundFx.playCorrect();
      }
    },
    [currentCard, learnedIds, markVocabLearned, unmarkVocabLearned]
  );

  const handleToggleReview = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      if (!currentCard) return;
      toggleVocabReview(currentCard.id);
      soundFx.playClick();
    },
    [currentCard, toggleVocabReview]
  );

  // Desktop keyboard shortcuts (Space, Left, Right, S)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        handleFlip();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        handleShuffle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFlip, handleNext, handlePrev, handleShuffle]);

  if (isCompleted) {
    const sessionLearnedCount = deck.filter((v) => learnedIds.includes(v.id)).length;
    const sessionReviewCount = deck.filter((v) => reviewIds.includes(v.id)).length;

    return (
      <div className="py-4 space-y-6">
        <FlashcardSessionCompleteView
          sessionType="vocabulary"
          totalCardsViewed={totalCards}
          learnedCount={sessionLearnedCount}
          reviewCount={sessionReviewCount}
          onStartNewSession={() => {
            startNewSession(true);
          }}
          onBackToDashboard={() => {
            setActiveTab('dashboard');
          }}
        />
      </div>
    );
  }

  if (!currentCard || categoryVocab.length === 0) {
    return (
      <div className="py-12 text-center text-slate-500 glass-card rounded-3xl p-8 max-w-lg mx-auto">
        <p className="text-base font-semibold text-slate-800 dark:text-slate-200">
          এই ক্যাটাগরিতে কোনো শব্দ পাওয়া যায়নি।
        </p>
        <button
          onClick={() => setSelectedCategory('all')}
          className="mt-4 px-5 py-2 rounded-xl glass-btn-primary text-xs font-bold cursor-pointer"
        >
          সব শব্দ দেখুন
        </button>
      </div>
    );
  }

  const isCurrentLearned = learnedIds.includes(currentCard.id);
  const isCurrentReview = reviewIds.includes(currentCard.id);

  // Category statistics calculation
  const totalInCat = totalCards;
  const learnedInCat = deck.filter((v) => learnedIds.includes(v.id)).length;
  const reviewInCat = deck.filter((v) => reviewIds.includes(v.id)).length;
  const progressPct = totalInCat > 0 ? Math.round((cardsAlreadyShown / totalInCat) * 100) : 0;

  return (
    <div className="space-y-6 select-none">
      {/* Category Pills/Chips with Frosted Glass styling */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium px-1">
          <span className="flex items-center gap-1.5 font-semibold">
            <Layers className="w-3.5 h-3.5 text-indigo-500" />
            <span>ক্যাটাগরি অনুযায়ী ফিল্টার করুন:</span>
          </span>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
              {toBengaliNumber(totalInCat)}টি কার্ড সেশনে আছে
            </span>
            <button
              type="button"
              onClick={() => startNewSession(true)}
              className="text-[11px] px-2.5 py-1 rounded-lg glass-card hover:border-indigo-500/40 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold transition-all flex items-center gap-1 cursor-pointer"
              title="নতুন সেশন অর্ডার শুরু করুন (Randomized Order)"
            >
              <RotateCcw className="w-3 h-3" />
              <span>নতুন সেশন</span>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none select-none">
          {VOCAB_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;
            if (count === 0 && cat.id !== 'all') return null;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md scale-[1.02] border border-white/20'
                    : 'glass-card text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-indigo-500/40'
                }`}
              >
                <span>{cat.labelBn}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200/60 dark:bg-white/10 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {toBengaliNumber(count)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Temporary Shuffle Notification Banner */}
      {shuffleNotice && (
        <div className="max-w-xl mx-auto p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-200 text-xs font-bold text-center animate-in fade-in slide-in-from-top-2 duration-200 shadow-sm flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          <span>{shuffleNotice}</span>
        </div>
      )}

      {/* Floating 3D Glass Flashcard */}
      <div className="perspective-1000 w-full max-w-xl mx-auto cursor-pointer select-none">
        <div
          onClick={handleFlip}
          className={`relative w-full min-h-[390px] sm:min-h-[430px] transform-style-3d transition-transform duration-500 ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* ================= CARD FRONT ================= */}
          <div className="glass-flashcard absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-8 backface-hidden flex flex-col justify-between overflow-hidden shadow-2xl">
            {/* Top Indicator */}
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono uppercase tracking-wider text-[11px] glass-pill px-3 py-1 rounded-full text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-500/20">
                লেসন {toBengaliNumber(currentCard.lessonId)} • {currentCard.type}
              </span>
              <span className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-[11px] font-medium transition-colors flex items-center gap-1">
                <RotateCw className="w-3 h-3" />
                <span>ট্যাপ দিন → উল্টান</span>
              </span>
            </div>

            {/* Center Main Japanese Word & Kana Reading */}
            <div className="text-center py-6 sm:py-8 space-y-4">
              <h2 className="text-4xl sm:text-5xl font-black font-serif tracking-wide text-slate-900 dark:text-white drop-shadow-xs">
                {currentCard.word}
              </h2>
              <div className="text-lg sm:text-xl font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">
                {currentCard.reading}
              </div>
              <div className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                {currentCard.romaji}
              </div>
            </div>

            {/* Bottom Quick Audio and Hint */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200/60 dark:border-white/10">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => handlePlayAudio(false, e)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isPlayingAudio && !isSlowPlaying
                      ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-400/40 animate-pulse'
                      : 'glass-btn-secondary'
                  }`}
                  title="প্রাকৃতিক জাপানি উচ্চারণ (Natural 0.95x)"
                >
                  <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{isPlayingAudio && !isSlowPlaying ? 'উচ্চারণ হচ্ছে...' : 'শুনুন'}</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => handlePlayAudio(true, e)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isPlayingAudio && isSlowPlaying
                      ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-400/40 animate-pulse'
                      : 'glass-btn-secondary'
                  }`}
                  title="ধীর গতিতে উচ্চারণ (Slow 0.72x) - নতুনদের জন্য স্পষ্ট"
                >
                  <Snail className="w-3.5 h-3.5 text-amber-500" />
                  <span>ধীর</span>
                </button>
              </div>

              <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                👆 অর্থ দেখতে ট্যাপ করুন
              </span>
            </div>
          </div>

          {/* ================= CARD BACK ================= */}
          <div className="glass-flashcard absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-8 backface-hidden rotate-y-180 flex flex-col justify-between overflow-hidden shadow-2xl">
            {/* Top info */}
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] glass-pill text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full font-bold border border-emerald-500/20 bg-emerald-500/10">
                {currentCard.type}
              </span>
              <span className="text-slate-400 text-[11px] font-medium flex items-center gap-1">
                <RotateCw className="w-3 h-3" />
                <span>ট্যাপ দিন → মূল শব্দ</span>
              </span>
            </div>

            {/* Center Meanings */}
            <div className="text-center py-4 space-y-3">
              <div className="text-xl sm:text-2xl font-bold font-serif text-slate-700 dark:text-slate-300">
                {currentCard.word}{' '}
                <span className="text-sm font-normal text-indigo-600 dark:text-indigo-400 font-sans">
                  ({currentCard.reading})
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-snug">
                {currentCard.bengali}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                {currentCard.english}
              </p>

              {/* Example Sentence Box */}
              {currentCard.exampleJp && (
                <div className="mt-3 p-3.5 rounded-2xl glass-card border border-slate-200/80 dark:border-white/10 text-left space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider font-bold">
                      উদাহরণ বাক্য (EXAMPLE)
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playJapaneseAudio(currentCard.exampleJp);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                      title="বাক্যটি শুনুন"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {currentCard.exampleJp}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {currentCard.exampleBn}
                  </p>
                </div>
              )}
            </div>

            {/* Audio speed options & Replay at bottom of back */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 dark:border-white/10">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={(e) => handlePlayAudio(false, e)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isPlayingAudio && !isSlowPlaying
                      ? 'bg-indigo-600 text-white shadow-md animate-pulse'
                      : 'glass-btn-secondary'
                  }`}
                  title="স্বাভাবিক গতি (Normal 0.95x)"
                >
                  <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
                  <span>স্বাভাবিক</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => handlePlayAudio(true, e)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isPlayingAudio && isSlowPlaying
                      ? 'bg-amber-500 text-white shadow-md animate-pulse'
                      : 'glass-btn-secondary'
                  }`}
                  title="ধীর গতি (Slow 0.72x)"
                >
                  <Snail className="w-3.5 h-3.5 text-amber-500" />
                  <span>ধীর গতি</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    replayJapaneseAudio();
                  }}
                  className="p-1.5 rounded-xl glass-btn-secondary text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                  title="পুনরায় শুনুন (Replay)"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                {currentCard.romaji}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 3 Navigation Control Buttons (Previous, Shuffle Remaining, Next) */}
      <div className="max-w-xl mx-auto flex items-center justify-between gap-3 select-none">
        <button
          onClick={handlePrev}
          disabled={isFirstCard}
          className={`flex-1 py-3 px-4 rounded-2xl glass-btn-secondary text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-sm ${
            isFirstCard ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer active:scale-95'
          }`}
          id="flashcard-prev-btn"
          title={isFirstCard ? 'প্রথম কার্ড' : 'পূর্ববর্তী কার্ড'}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>← আগে</span>
        </button>

        <button
          onClick={handleShuffle}
          disabled={totalCards <= 1}
          className={`p-3 px-4 sm:px-5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shrink-0 ${
            totalCards <= 1 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer active:scale-95'
          }`}
          title="বাকি অদেখা কার্ড শাফল করুন (Shuffle Remaining - S)"
          id="flashcard-shuffle-btn"
        >
          <Shuffle className="w-4 h-4" />
          <span className="text-xs">শাফল ({toBengaliNumber(remainingCards)})</span>
        </button>

        <button
          onClick={handleNext}
          className={`flex-1 py-3 px-4 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95 ${
            isLastCard
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white ring-2 ring-emerald-400/40 shadow-emerald-500/20'
              : 'glass-btn-primary'
          }`}
          id="flashcard-next-btn"
          title={isLastCard ? 'সেশন শেষ করে সমাপ্তি পর্দায় যান' : 'পরবর্তী অদেখা কার্ড'}
        >
          <span>{isLastCard ? '🎉 সেশন সম্পন্ন করুন' : 'পরে →'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Secondary Actions: Learned Toggle & Review Later Toggle */}
      <div className="max-w-xl mx-auto flex items-center justify-center gap-3">
        <button
          onClick={handleToggleLearned}
          className={`flex-1 py-2.5 px-4 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border ${
            isCurrentLearned
              ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/40 shadow-xs'
              : 'glass-card text-slate-700 dark:text-slate-300 hover:border-emerald-500/40'
          }`}
          id="flashcard-learned-btn"
        >
          <Check className={`w-4 h-4 ${isCurrentLearned ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
          <span>{isCurrentLearned ? '✓ আয়ত্ত হয়েছে' : 'আয়ত্ত করেছি (+10 XP)'}</span>
        </button>

        <button
          onClick={handleToggleReview}
          className={`flex-1 py-2.5 px-4 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border ${
            isCurrentReview
              ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/40 shadow-xs'
              : 'glass-card text-slate-700 dark:text-slate-300 hover:border-amber-500/40'
          }`}
          id="flashcard-review-btn"
        >
          <Star className={`w-4 h-4 ${isCurrentReview ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
          <span>{isCurrentReview ? '⭐ রিভিশনে সংরক্ষিত' : 'পরে রিভিশন'}</span>
        </button>
      </div>

      {/* Session Progress Indicator */}
      <div className="max-w-xl mx-auto space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            কার্ড: {toBengaliNumber(currentIndex + 1)} / {toBengaliNumber(totalCards)} • {activeCategoryDef.labelBn}
          </span>
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
              {toBengaliNumber(cardsAlreadyShown)}টি দেখা
            </span>
            <span>•</span>
            <span className="text-amber-600 dark:text-amber-400 font-bold">
              {toBengaliNumber(remainingCards)}টি বাকি
            </span>
          </div>
        </div>

        {/* Progress bar for session completion */}
        <div className="w-full bg-slate-200/80 dark:bg-slate-800/80 h-2.5 rounded-full overflow-hidden border border-slate-300/40 dark:border-white/5">
          <div
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${totalCards > 0 ? (cardsAlreadyShown / totalCards) * 100 : 0}%` }}
          />
        </div>

        {/* Stats breakdown badge row */}
        <div className="grid grid-cols-5 gap-2 pt-2 text-center text-xs">
          <div className="p-2 rounded-2xl glass-card text-center">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono uppercase block font-bold">মোট</span>
            <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
              {toBengaliNumber(totalCards)}
            </span>
          </div>
          <div className="p-2 rounded-2xl glass-card border-indigo-500/30 bg-indigo-500/5 dark:bg-indigo-500/10 text-center">
            <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono uppercase block font-bold">দেখা</span>
            <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
              {toBengaliNumber(cardsAlreadyShown)}
            </span>
          </div>
          <div className="p-2 rounded-2xl glass-card border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10 text-center">
            <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono uppercase block font-bold">বাকি</span>
            <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
              {toBengaliNumber(remainingCards)}
            </span>
          </div>
          <div className="p-2 rounded-2xl glass-card border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-500/10 text-center">
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono uppercase block font-bold">আয়ত্ত</span>
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
              {toBengaliNumber(learnedInCat)}
            </span>
          </div>
          <div className="p-2 rounded-2xl glass-card border-rose-500/30 bg-rose-500/5 dark:bg-rose-500/10 text-center">
            <span className="text-[10px] text-rose-600 dark:text-rose-400 font-mono uppercase block font-bold">রিভিশন</span>
            <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
              {toBengaliNumber(reviewInCat)}
            </span>
          </div>
        </div>

        {/* Keyboard shortcuts info pill */}
        <div className="hidden sm:flex items-center justify-center gap-3 pt-2 text-[11px] text-slate-400 dark:text-slate-500 font-mono select-none">
          <span>[←] আগে</span>
          <span>•</span>
          <span>[Space] উল্টান</span>
          <span>•</span>
          <span>[→] পরে</span>
          <span>•</span>
          <span>[S] শাফল</span>
        </div>
      </div>
    </div>
  );
};
