import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { KanjiItem } from '../types';
import { useApp } from '../context/AppContext';
import { playJapaneseAudio, stopJapaneseAudio, replayJapaneseAudio, soundFx } from '../utils/audio';
import { toBengaliNumber } from '../utils/vocabCategories';
import { useFlashcardSession } from '../hooks/useFlashcardSession';
import { FlashcardSessionCompleteView } from './FlashcardSessionCompleteView';
import {
  Volume2,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  Check,
  Star,
  Layers,
  BookOpen,
  Snail,
  Sparkles,
  RotateCcw,
} from 'lucide-react';

interface Props {
  kanjiList: KanjiItem[];
}

export const KanjiFlashcardExperience: React.FC<Props> = ({ kanjiList }) => {
  const { currentUser, markKanjiMastered, unmarkKanjiMastered, toggleKanjiReview, setActiveTab } = useApp();

  const [selectedLesson, setSelectedLesson] = useState<number | 'all'>('all');
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const masteredIds = currentUser?.stats.masteredKanjiIds || [];
  const reviewIds = currentUser?.stats.reviewKanjiIds || [];

  // Filter kanji list based on lesson
  const filteredList = useMemo(() => {
    if (selectedLesson === 'all') return kanjiList;
    return kanjiList.filter((k) => k.lessonId === selectedLesson);
  }, [kanjiList, selectedLesson]);

  // Session state: tracks deck order, current card, seen cards, remaining cards without repeats
  const {
    deck,
    currentCard: currentKanji,
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
  } = useFlashcardSession<KanjiItem>(filteredList);

  // Reset audio & flip on lesson change
  useEffect(() => {
    stopJapaneseAudio();
    setIsFlipped(false);
  }, [selectedLesson]);

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
    async (textToPlay: string, slow: boolean = false, e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      setIsPlayingAudio(true);
      try {
        await playJapaneseAudio(textToPlay, slow ? 0.72 : 0.95);
      } finally {
        setIsPlayingAudio(false);
      }
    },
    []
  );

  const handleToggleMastered = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      if (!currentKanji) return;
      const isMastered = masteredIds.includes(currentKanji.id);
      if (isMastered) {
        unmarkKanjiMastered(currentKanji.id);
      } else {
        markKanjiMastered(currentKanji.id, currentKanji.lessonId);
        soundFx.playCorrect();
      }
    },
    [currentKanji, masteredIds, markKanjiMastered, unmarkKanjiMastered]
  );

  const handleToggleReview = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      if (!currentKanji) return;
      toggleKanjiReview(currentKanji.id);
      soundFx.playClick();
    },
    [currentKanji, toggleKanjiReview]
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
    const sessionMasteredCount = deck.filter((k) => masteredIds.includes(k.id)).length;
    const sessionReviewCount = deck.filter((k) => reviewIds.includes(k.id)).length;

    return (
      <div className="py-4 space-y-6">
        <FlashcardSessionCompleteView
          sessionType="kanji"
          totalCardsViewed={totalCards}
          learnedCount={sessionMasteredCount}
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

  if (!currentKanji || filteredList.length === 0) {
    return (
      <div className="py-12 text-center text-zinc-500 glass-card rounded-2xl p-8">
        <p className="text-base font-medium">কোনো কানজি পাওয়া যায়নি।</p>
        <button
          onClick={() => setSelectedLesson('all')}
          className="mt-4 px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold"
        >
          সব কানজি দেখুন
        </button>
      </div>
    );
  }

  const isCurrentMastered = masteredIds.includes(currentKanji.id);
  const isCurrentReview = reviewIds.includes(currentKanji.id);

  // Stats calculation
  const totalInFilter = totalCards;
  const masteredInFilter = deck.filter((k) => masteredIds.includes(k.id)).length;
  const reviewInFilter = deck.filter((k) => reviewIds.includes(k.id)).length;
  const progressPct = totalInFilter > 0 ? Math.round((cardsAlreadyShown / totalInFilter) * 100) : 0;

  return (
    <div className="space-y-6 select-none">
      {/* Lesson Filter Pills */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-medium px-1">
          <span>লেসন অনুযায়ী কানজি ফিল্টার করুন:</span>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
              {toBengaliNumber(totalInFilter)}টি কানজি সেশনে আছে
            </span>
            <button
              type="button"
              onClick={() => startNewSession(true)}
              className="text-[11px] px-2.5 py-1 rounded-lg glass-card hover:border-emerald-500/40 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-bold transition-all flex items-center gap-1 cursor-pointer"
              title="নতুন সেশন শুরু করুন (Randomized Order)"
            >
              <RotateCcw className="w-3 h-3" />
              <span>নতুন সেশন</span>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none select-none">
          <button
            onClick={() => setSelectedLesson('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              selectedLesson === 'all'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm font-semibold'
                : 'bg-zinc-100/90 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-800'
            }`}
          >
            সব কানজি ({toBengaliNumber(kanjiList.length)})
          </button>
          {Array.from({ length: 25 }, (_, i) => i + 1).map((lNum) => {
            const count = kanjiList.filter((k) => k.lessonId === lNum).length;
            if (count === 0) return null;
            const isSelected = selectedLesson === lNum;

            return (
              <button
                key={lNum}
                onClick={() => setSelectedLesson(lNum)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm font-semibold'
                    : 'bg-zinc-100/90 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-800'
                }`}
              >
                <span>লেসন {toBengaliNumber(lNum)}</span>
                <span className="text-[11px] opacity-70 font-mono">({toBengaliNumber(count)})</span>
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

      <div className="h-px bg-zinc-200/80 dark:bg-zinc-800/80 w-full" />

      {/* Centered Premium 3D Floating Kanji Card */}
      <div className="perspective-1000 w-full max-w-xl mx-auto cursor-pointer select-none">
        <div
          onClick={handleFlip}
          className={`relative w-full min-h-[420px] sm:min-h-[460px] transform-style-3d transition-transform duration-500 ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* ================= KANJI CARD FRONT ================= */}
          <div className="glass-flashcard absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-8 backface-hidden flex flex-col justify-between overflow-hidden">
            {/* Top Indicator */}
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span className="font-mono text-[11px] bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-zinc-700 dark:text-zinc-300 font-semibold">
                লেসন {toBengaliNumber(currentKanji.lessonId)} • {toBengaliNumber(currentKanji.strokes)} স্ট্রোক
              </span>
              <span className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-[11px]">
                ট্যাপ দিন → বিস্তারিত
              </span>
            </div>

            {/* Center Huge Kanji Character */}
            <div className="text-center py-6 sm:py-10 space-y-4">
              <div className="inline-block p-4 sm:p-6 rounded-3xl bg-zinc-100/60 dark:bg-zinc-800/40 border border-zinc-200/50 dark:border-zinc-700/50">
                <span className="text-7xl sm:text-8xl font-black font-serif text-zinc-950 dark:text-white leading-none">
                  {currentKanji.kanji}
                </span>
              </div>
              <p className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                JLPT N5 KANJI
              </p>
            </div>

            {/* Bottom quick audio and hint */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200/60 dark:border-white/10">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    const sampleWord = currentKanji.examples?.[0]?.reading || currentKanji.kanji;
                    handlePlayAudio(sampleWord, false, e);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isPlayingAudio
                      ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-400/40 animate-pulse'
                      : 'glass-btn-secondary'
                  }`}
                  title="কাঞ্জি/যৌগিক শব্দের উচ্চারণ শুনুন"
                >
                  <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{isPlayingAudio ? 'উচ্চারণ হচ্ছে...' : 'উচ্চারণ শুনুন'}</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    const sampleWord = currentKanji.examples?.[0]?.reading || currentKanji.kanji;
                    handlePlayAudio(sampleWord, true, e);
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold glass-btn-secondary transition-all cursor-pointer"
                  title="ধীর গতিতে উচ্চারণ (Slow 0.72x)"
                >
                  <Snail className="w-3.5 h-3.5 text-amber-500" />
                  <span>ধীর</span>
                </button>
              </div>

              <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                👆 অর্থ ও রিডিং দেখতে ট্যাপ করুন
              </span>
            </div>
          </div>

          {/* ================= KANJI CARD BACK ================= */}
          <div className="glass-flashcard absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-7 backface-hidden rotate-y-180 flex flex-col justify-between overflow-y-auto">
            {/* Top header */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black font-serif text-slate-900 dark:text-white">
                  {currentKanji.kanji}
                </span>
                <span className="font-mono text-[11px] bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full font-bold">
                  {toBengaliNumber(currentKanji.strokes)} স্ট্রোক
                </span>
              </div>
              <span className="text-slate-400 text-[11px]">
                ট্যাপ দিন → অক্ষর
              </span>
            </div>

            {/* Content Body */}
            <div className="space-y-3 py-2">
              {/* Meaning */}
              <div className="text-center">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {currentKanji.meaningBn}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{currentKanji.meaningEn}</p>
              </div>

              {/* Onyomi & Kunyomi Readings (with audio play on click) */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    const sound = currentKanji.onyomi.split('、')[0] || currentKanji.onyomi;
                    handlePlayAudio(sound, false, e);
                  }}
                  className="p-2.5 rounded-xl glass-card border border-slate-200/70 dark:border-white/10 hover:border-indigo-500/40 cursor-pointer transition-all group"
                  title="ওন-ইওমি উচ্চারণ শুনুন"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase">
                      ওন-ইওমি (音読み)
                    </span>
                    <Volume2 className="w-3 h-3 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                  </div>
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    {currentKanji.onyomi}
                  </span>
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    const sound = currentKanji.kunyomi.split('、')[0] || currentKanji.kunyomi;
                    handlePlayAudio(sound, false, e);
                  }}
                  className="p-2.5 rounded-xl glass-card border border-slate-200/70 dark:border-white/10 hover:border-indigo-500/40 cursor-pointer transition-all group"
                  title="কুন-ইওমি উচ্চারণ শুনুন"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase">
                      কুন-ইওমি (訓読み)
                    </span>
                    <Volume2 className="w-3 h-3 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                  </div>
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    {currentKanji.kunyomi}
                  </span>
                </div>
              </div>

              {/* Example Compounds */}
              {currentKanji.examples && currentKanji.examples.length > 0 && (
                <div className="p-3 rounded-2xl glass-card border border-slate-200/60 dark:border-white/10 text-xs space-y-1.5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                    যৌগিক শব্দ (COMPOUNDS)
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {currentKanji.examples.slice(0, 2).map((ex, idx) => (
                      <div
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          playJapaneseAudio(ex.reading || ex.word);
                        }}
                        className="p-2 rounded-xl glass-btn-secondary cursor-pointer transition-all hover:border-indigo-500/40"
                        title="শব্দের উচ্চারণ শুনুন"
                      >
                        <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center justify-between">
                          <span>{ex.word}</span>
                          <Volume2 className="w-3 h-3 text-indigo-500" />
                        </div>
                        <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
                          {ex.reading}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">{ex.meaningBn}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Example Sentence */}
              {currentKanji.exampleSentenceJp && (
                <div className="p-2.5 rounded-xl glass-card border border-slate-200/60 dark:border-white/10 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                      বাক্য উদাহরণ
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playJapaneseAudio(currentKanji.exampleSentenceJp!);
                      }}
                      className="p-1 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      title="বাক্যটি শুনুন"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    {currentKanji.exampleSentenceJp}
                  </p>
                  <p className="text-slate-500 text-[11px]">{currentKanji.exampleSentenceBn}</p>
                </div>
              )}
            </div>

            {/* Audio speed & replay controls at bottom */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-white/10">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={(e) => {
                    const sample = currentKanji.examples?.[0]?.reading || currentKanji.kanji;
                    handlePlayAudio(sample, false, e);
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl glass-btn-secondary text-xs font-semibold cursor-pointer"
                  title="স্বাভাবিক গতি"
                >
                  <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
                  <span>স্বাভাবিক</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    const sample = currentKanji.examples?.[0]?.reading || currentKanji.kanji;
                    handlePlayAudio(sample, true, e);
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl glass-btn-secondary text-xs font-semibold cursor-pointer"
                  title="ধীর গতি (0.72x)"
                >
                  <Snail className="w-3.5 h-3.5 text-amber-500" />
                  <span>ধীর</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    replayJapaneseAudio();
                  }}
                  className="p-1.5 rounded-xl glass-btn-secondary text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                  title="পুনরায় শুনুন"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                লেসন {toBengaliNumber(currentKanji.lessonId)}
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
          className={`flex-1 py-3 px-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800/90 text-zinc-900 dark:text-zinc-100 text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-sm ${
            isFirstCard
              ? 'opacity-40 cursor-not-allowed'
              : 'hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer active:scale-95'
          }`}
          id="kanji-prev-btn"
          title={isFirstCard ? 'প্রথম কার্ড' : 'পূর্ববর্তী কার্ড'}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>← আগে</span>
        </button>

        <button
          onClick={handleShuffle}
          disabled={totalCards <= 1}
          className={`p-3 px-4 sm:px-5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm shrink-0 ${
            totalCards <= 1 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer active:scale-95'
          }`}
          title="বাকি অদেখা কার্ড শাফল করুন (Shuffle Remaining - S)"
          id="kanji-shuffle-btn"
        >
          <Shuffle className="w-4 h-4" />
          <span className="text-xs">শাফল ({toBengaliNumber(remainingCards)})</span>
        </button>

        <button
          onClick={handleNext}
          className={`flex-1 py-3 px-4 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95 ${
            isLastCard
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white ring-2 ring-emerald-400/40'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
          }`}
          id="kanji-next-btn"
          title={isLastCard ? 'সেশন শেষ করে সমাপ্তি পর্দায় যান' : 'পরবর্তী অদেখা কার্ড'}
        >
          <span>{isLastCard ? '🎉 সেশন সম্পন্ন করুন' : 'পরে →'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Mastered & Review Actions */}
      <div className="max-w-xl mx-auto flex items-center justify-center gap-3">
        <button
          onClick={handleToggleMastered}
          className={`flex-1 py-2.5 px-4 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border ${
            isCurrentMastered
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
              : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-emerald-400'
          }`}
          id="kanji-mastered-btn"
        >
          <Check className={`w-4 h-4 ${isCurrentMastered ? 'text-emerald-500' : 'text-zinc-400'}`} />
          <span>{isCurrentMastered ? '✓ আয়ত্ত কানজি' : 'আয়ত্ত করেছি (+15 XP)'}</span>
        </button>

        <button
          onClick={handleToggleReview}
          className={`flex-1 py-2.5 px-4 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border ${
            isCurrentReview
              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
              : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-amber-400'
          }`}
          id="kanji-review-btn"
        >
          <Star className={`w-4 h-4 ${isCurrentReview ? 'fill-amber-400 text-amber-400' : 'text-zinc-400'}`} />
          <span>{isCurrentReview ? '⭐ রিভিশন তালিকা' : 'পরে রিভিশন'}</span>
        </button>
      </div>

      {/* Progress Info & Stats */}
      <div className="max-w-xl mx-auto space-y-2">
        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">
            কার্ড: {toBengaliNumber(currentIndex + 1)} / {toBengaliNumber(totalInFilter)} •{' '}
            {selectedLesson === 'all' ? 'সব কানজি' : `লেসন ${toBengaliNumber(Number(selectedLesson))}`}
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

        {/* Progress Bar */}
        <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${totalInFilter > 0 ? (cardsAlreadyShown / totalInFilter) * 100 : 0}%` }}
          />
        </div>

        {/* Breakdown Badges */}
        <div className="grid grid-cols-5 gap-2 pt-2 text-center text-xs">
          <div className="p-2 rounded-xl bg-zinc-100/80 dark:bg-zinc-900/80 border border-zinc-200/50 dark:border-zinc-800">
            <span className="text-[10px] text-zinc-400 block font-bold">মোট</span>
            <span className="font-mono font-bold text-zinc-800 dark:text-zinc-200">
              {toBengaliNumber(totalInFilter)}
            </span>
          </div>
          <div className="p-2 rounded-xl bg-indigo-500/5 dark:bg-indigo-950/20 border border-indigo-500/20">
            <span className="text-[10px] text-indigo-600 dark:text-indigo-400 block font-bold">দেখা</span>
            <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
              {toBengaliNumber(cardsAlreadyShown)}
            </span>
          </div>
          <div className="p-2 rounded-xl bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/20">
            <span className="text-[10px] text-amber-600 dark:text-amber-400 block font-bold">বাকি</span>
            <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
              {toBengaliNumber(remainingCards)}
            </span>
          </div>
          <div className="p-2 rounded-xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20">
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block font-bold">আয়ত্ত</span>
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
              {toBengaliNumber(masteredInFilter)}
            </span>
          </div>
          <div className="p-2 rounded-xl bg-rose-500/5 dark:bg-rose-950/20 border border-rose-500/20">
            <span className="text-[10px] text-rose-600 dark:text-rose-400 block font-bold">রিভিশন</span>
            <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
              {toBengaliNumber(reviewInFilter)}
            </span>
          </div>
        </div>

        {/* Keyboard Shortcuts Hint */}
        <div className="hidden sm:flex items-center justify-center gap-3 pt-2 text-[11px] text-zinc-400 font-mono select-none">
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
