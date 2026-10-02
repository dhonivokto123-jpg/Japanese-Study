import React, { useState, useMemo } from 'react';
import { KanjiItem } from '../types';
import { useApp } from '../context/AppContext';
import { playJapaneseAudio, soundFx } from '../utils/audio';
import { toBengaliNumber } from '../utils/vocabCategories';
import { CheckCircle2, XCircle, Volume2, RotateCcw, Award, ChevronRight } from 'lucide-react';

interface Props {
  kanjiList: KanjiItem[];
}

export const KanjiQuizExperience: React.FC<Props> = ({ kanjiList }) => {
  const { addXp, triggerConfetti } = useApp();

  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Generate 10 quiz items from real kanji dataset
  const quizItems = useMemo(() => {
    if (kanjiList.length === 0) return [];
    const pool = [...kanjiList];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const selected = pool.slice(0, Math.min(10, pool.length));

    return selected.map((item) => {
      const distractors = pool
        .filter((k) => k.id !== item.id && k.meaningBn !== item.meaningBn)
        .slice(0, 3)
        .map((k) => k.meaningBn);

      const options = [item.meaningBn, ...distractors];
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }

      return {
        item,
        correctAnswer: item.meaningBn,
        options,
      };
    });
  }, [kanjiList, quizFinished]);

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
      const earnedXp = finalScore * 15;
      addXp(earnedXp, 'Kanji Quiz Completed');
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
        কানজি কুইজ প্রস্তুত করার মতো উপাদান নেই।
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
            কানজি কুইজ সম্পন্ন!
          </h2>
          <p className="text-sm text-zinc-500 mt-1">
            আপনার স্কোর: {toBengaliNumber(score)} / {toBengaliNumber(quizItems.length)}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs space-y-1">
          <span className="text-zinc-400">অর্জিত এক্সপি:</span>
          <p className="font-mono text-lg font-bold text-emerald-600 dark:text-emerald-400">
            +{toBengaliNumber(score * 15)} XP
          </p>
        </div>

        <button
          onClick={handleRestart}
          className="w-full py-3 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>আবার অনুশীলন করুন</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Header Info */}
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

      {/* Question Kanji Box */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <span className="text-[11px] font-mono uppercase bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-zinc-500">
            এই কানজিটির সঠিক অর্থ কোনটি?
          </span>
          <button
            onClick={() => playJapaneseAudio(currentQ.item.onyomi.split(',')[0] || currentQ.item.kanji)}
            className="p-1 rounded-full text-zinc-400 hover:text-emerald-500"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        <div className="inline-block p-4 sm:p-6 rounded-3xl bg-zinc-100/50 dark:bg-zinc-800/40 border border-zinc-200/50 dark:border-zinc-700/50">
          <h3 className="text-6xl sm:text-7xl font-black font-serif text-zinc-950 dark:text-white leading-none">
            {currentQ.item.kanji}
          </h3>
        </div>

        <div className="text-xs text-zinc-400 font-mono">
          <span>{currentQ.item.strokes} স্ট্রোক</span> • <span>লেসন {currentQ.item.lessonId}</span>
        </div>
      </div>

      {/* Options Grid */}
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

      {/* Next Question */}
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
