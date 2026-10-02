import React, { useState, useEffect, useRef } from 'react';
import { challengeQuestionsPool } from '../../data/particleToolsData';
import { useApp } from '../../context/AppContext';
import { soundFx } from '../../utils/audio';
import {
  Timer,
  Zap,
  Flame,
  Award,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Trophy,
  Play,
  Volume2
} from 'lucide-react';

export const ParticleChallengeView: React.FC = () => {
  const { addXp } = useApp();

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<typeof challengeQuestionsPool>([]);
  const [missedQuestions, setMissedQuestions] = useState<typeof challengeQuestionsPool>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const timerRef = useRef<any>(null);

  const startGame = () => {
    soundFx.playLevelUp();
    const shuffled = [...challengeQuestionsPool].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setCurrentQuestionIdx(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(60);
    setMissedQuestions([]);
    setIsGameOver(false);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, timeLeft]);

  const endGame = () => {
    setIsPlaying(false);
    setIsGameOver(true);
    soundFx.playStreak();
    // Add real user XP
    if (score > 0) {
      addXp(Math.max(10, Math.floor(score / 5)));
    }
  };

  const handleAnswer = (chosenParticle: string) => {
    if (!isPlaying) return;
    const currentQ = shuffledQuestions[currentQuestionIdx];
    if (!currentQ) return;

    if (chosenParticle === currentQ.correct) {
      soundFx.playCorrect();
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);

      // Multiplier
      let multiplier = 1;
      if (newStreak >= 10) multiplier = 3;
      else if (newStreak >= 5) multiplier = 2;
      else if (newStreak >= 3) multiplier = 1.5;

      setScore((prev) => prev + Math.round(10 * multiplier));
    } else {
      soundFx.playIncorrect();
      setStreak(0);
      setMissedQuestions((prev) => [...prev, currentQ]);
    }

    // Move to next question or loop
    if (currentQuestionIdx < shuffledQuestions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      const reshuffled = [...challengeQuestionsPool].sort(() => Math.random() - 0.5);
      setShuffledQuestions(reshuffled);
      setCurrentQuestionIdx(0);
    }
  };

  const currentQ = shuffledQuestions[currentQuestionIdx] || challengeQuestionsPool[0];

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/20 shadow-xl space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40 mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>RAPID-FIRE PARTICLE CHALLENGE</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            ⚡ ৬০-সেকেন্ডের স্পিড পার্টিকেল চ্যালেঞ্জ
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            দ্রুত সঠিক পার্টিকেল নির্বাচন করে আপনার স্কোর এবং কম্বো স্ট্রিক বাড়িয়ে নিন!
          </p>
        </div>

        {/* Live HUD Stats */}
        {isPlaying && (
          <div className="flex items-center gap-4 bg-slate-100 dark:bg-slate-900 px-5 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold font-mono text-lg">
              <Timer className="w-5 h-5 animate-pulse" />
              <span>{timeLeft}s</span>
            </div>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />
            <div className="flex items-center gap-1.5 text-amber-500 font-black text-base">
              <Flame className="w-4 h-4" />
              <span>{streak}x</span>
            </div>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />
            <div className="font-mono font-black text-indigo-600 dark:text-indigo-400 text-lg">
              {score} PTS
            </div>
          </div>
        )}
      </div>

      {/* Game Not Started State */}
      {!isPlaying && !isGameOver && (
        <div className="text-center py-12 px-4 space-y-6 max-w-md mx-auto">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white flex items-center justify-center mx-auto shadow-xl shadow-amber-500/30">
            <Zap className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              আপনার মস্তিষ্ক ও দ্রুত সিদ্ধান্ত নেওয়ার ক্ষমতা পরীক্ষা করুন!
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              ৬০ সেকেন্ড সময়ে যতগুলো সম্ভব জাপানি বাক্যের পার্টিকেল নির্ভুলভাবে বেছে নিন। ৩টির বেশি স্ট্রিকে পাবেন ১.৫x থেকে ৩x কম্বো পয়েন্ট!
            </p>
          </div>
          <button
            onClick={startGame}
            className="w-full py-4 rounded-2xl font-black text-base bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>চ্যালেঞ্জ শুরু করুন (Start 60s)</span>
          </button>
        </div>
      )}

      {/* Active Game Stage */}
      {isPlaying && (
        <div className="space-y-6 max-w-xl mx-auto animate-in fade-in duration-100">
          <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3 shadow-inner">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              সঠিক পার্টিকেলটি স্পর্শ করুন:
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-black text-slate-900 dark:text-white">
              {currentQ.promptJp}
            </div>
            <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              {currentQ.promptBn}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {currentQ.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt)}
                className="py-5 px-3 rounded-2xl font-serif font-black text-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 shadow-md transition-all transform active:scale-95"
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="text-center text-xs text-slate-400">
            💡 ক্লু: {currentQ.tip}
          </div>
        </div>
      )}

      {/* Game Over Modal / Results */}
      {isGameOver && (
        <div className="p-8 rounded-3xl glass-card border border-indigo-500/30 space-y-6 max-w-lg mx-auto text-center animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-amber-500/30">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">চ্যালেঞ্জ সম্পন্ন!</h3>
            <p className="text-xs text-slate-500 mt-1">দারুণ খেলেছেন! আপনার ফলাফল:</p>
          </div>

          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div>
              <div className="text-xs text-slate-400">মোট স্কোর</div>
              <div className="text-xl font-black font-mono text-indigo-600 dark:text-indigo-400">
                {score}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400">সর্বোচ্চ স্ট্রিক</div>
              <div className="text-xl font-black font-mono text-amber-500">
                {bestStreak}x
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400">অর্জিত XP</div>
              <div className="text-xl font-black font-mono text-emerald-500">
                +{Math.max(10, Math.floor(score / 5))}
              </div>
            </div>
          </div>

          {/* Missed Questions Review */}
          {missedQuestions.length > 0 && (
            <div className="text-left space-y-2 pt-2">
              <div className="text-xs font-bold text-rose-500 uppercase tracking-wider">
                ভুল হওয়া প্রশ্নগুলো পর্যালোচনা ({missedQuestions.length} টি):
              </div>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1 text-xs">
                {missedQuestions.slice(0, 5).map((mq, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                  >
                    <span className="font-serif">{mq.promptJp}</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      সঠিক: {mq.correct} ({mq.tip})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={startGame}
            className="w-full py-3.5 rounded-2xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>আবার খেলুন (Play Again)</span>
          </button>
        </div>
      )}
    </div>
  );
};
