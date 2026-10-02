import React, { useState, useMemo, useCallback } from 'react';
import { VocabItem } from '../types';
import { useApp } from '../context/AppContext';
import { playJapaneseAudio, soundFx } from '../utils/audio';
import { toBengaliNumber } from '../utils/vocabCategories';
import { CheckCircle2, XCircle, Volume2, RotateCcw, Award, ChevronRight } from 'lucide-react';

interface Props {
  vocabList: VocabItem[];
}

export const VocabularyQuizExperience: React.FC<Props> = ({ vocabList }) => {
  const { addXp, triggerConfetti } = useApp();

  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Generate 10 random questions from the real vocabulary list
  const quizItems = useMemo(() => {
    if (vocabList.length === 0) return [];
    const pool = [...vocabList];
    // Shuffle pool
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const selected = pool.slice(0, Math.min(10, pool.length));

    return selected.map((item) => {
      // Pick 3 random incorrect distractor options
      const distractors = pool
        .filter((v) => v.id !== item.id && v.bengali !== item.bengali)
        .slice(0, 3)
        .map((v) => v.bengali);

      const options = [item.bengali, ...distractors];
      // Shuffle options
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }

      return {
        item,
        correctAnswer: item.bengali,
        options,
      };
    });
  }, [vocabList, quizFinished]);

  const currentQ = quizItems[questionIndex];

  const handleSelectOption = (opt: string) => {
    if (isAnswered) return;
    setSelectedOption(opt);
    setIsAnswered(true);

    if (opt === currentQ.correctAnswer) {
      soundFx.playCorrect();
      setScore((prev) => prev + 1);
    } else {
      soundFx.playWrong();
    }
  };

  const handleNext = () => {
    if (questionIndex + 1 < quizItems.length) {
      setQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      const finalScore = score + (selectedOption === currentQ.correctAnswer ? 1 : 0);
      const earnedXp = finalScore * 10;
      addXp(earnedXp, 'Vocabulary Quiz Completed');
      if (finalScore >= 7) {
        triggerConfetti();
      }
    }
  };

  const handleRestart = () => {
    setQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  if (quizItems.length === 0) {
    return (
      <div className="py-12 text-center text-zinc-500">
        কুইজ প্রস্তুত করার মতো পর্যাপ্ত শব্দ নেই।
      </div>
    );
  }

  if (quizFinished) {
    return (
      <div className="max-w-md mx-auto glass-card rounded-3xl p-8 text-center space-y-6 animate-in fade-in">
        <div className="w-16 h-16 mx-auto bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center">
          <Award className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-zinc-900 dark:text-white">
            কুইজ সম্পন্ন হয়েছে!
          </h2>
          <p className="text-sm text-zinc-500 mt-1">
            আপনার অর্জিত স্কোর: {toBengaliNumber(score)} / {toBengaliNumber(quizItems.length)}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs space-y-1">
          <span className="text-zinc-400">পুরস্কার হিসেবে অর্জিত:</span>
          <p className="font-mono text-lg font-bold text-emerald-600 dark:text-emerald-400">
            +{toBengaliNumber(score * 10)} XP
          </p>
        </div>

        <button
          onClick={handleRestart}
          className="w-full py-3 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-bold text-sm flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>আবার কুইজ দিন</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Quiz Header Progress */}
      <div className="flex items-center justify-between text-xs text-zinc-500">
        <span>প্রশ্ন {toBengaliNumber(questionIndex + 1)} / {toBengaliNumber(quizItems.length)}</span>
        <span className="font-bold text-emerald-600 dark:text-emerald-400">
          স্কোর: {toBengaliNumber(score)}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-emerald-500 h-full transition-all duration-300"
          style={{ width: `${((questionIndex + 1) / quizItems.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <span className="text-[11px] font-mono uppercase bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-zinc-500">
            শব্দটির বাংলা অর্থ কোনটি?
          </span>
          <button
            onClick={() => playJapaneseAudio(currentQ.item.reading || currentQ.item.word)}
            className="p-1 rounded-full text-zinc-400 hover:text-emerald-500"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        <h3 className="text-4xl sm:text-5xl font-black font-serif text-zinc-900 dark:text-white">
          {currentQ.item.word}
        </h3>
        <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-sans">
          {currentQ.item.reading} ({currentQ.item.romaji})
        </p>
      </div>

      {/* 4 Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {currentQ.options.map((opt, idx) => {
          let stateStyle = 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400';
          if (isAnswered) {
            if (opt === currentQ.correctAnswer) {
              stateStyle = 'bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold';
            } else if (opt === selectedOption) {
              stateStyle = 'bg-red-500/10 border-red-500 text-red-700 dark:text-red-300';
            } else {
              stateStyle = 'opacity-40 border-zinc-200 dark:border-zinc-800';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(opt)}
              disabled={isAnswered}
              className={`p-4 rounded-2xl border text-left text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center justify-between ${stateStyle}`}
            >
              <span>{opt}</span>
              {isAnswered && opt === currentQ.correctAnswer && (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              )}
              {isAnswered && opt === selectedOption && opt !== currentQ.correctAnswer && (
                <XCircle className="w-4 h-4 text-red-500 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Next Question button */}
      {isAnswered && (
        <div className="pt-2">
          <button
            onClick={handleNext}
            className="w-full py-3.5 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95"
          >
            <span>পরবর্তী প্রশ্ন</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
