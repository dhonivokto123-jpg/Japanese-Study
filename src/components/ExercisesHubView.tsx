import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { modelTestsData, ModelTest, ExamQuestion } from '../data/modelTestsData';
import { soundFx } from '../utils/audio';
import { toBengaliNumber } from '../utils/vocabCategories';
import {
  Target,
  Clock,
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Award,
} from 'lucide-react';

export const ExercisesHubView: React.FC = () => {
  const { currentUser, saveQuizScore, triggerConfetti } = useApp();
  const [activeTest, setActiveTest] = useState<ModelTest | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [testCompleted, setTestCompleted] = useState(false);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(0);

  // Timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeTest && !testCompleted && timeLeftSeconds > 0) {
      timer = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            handleFinishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeTest, testCompleted, timeLeftSeconds]);

  const handleStartTest = (test: ModelTest) => {
    setActiveTest(test);
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setTestCompleted(false);
    setTimeLeftSeconds(test.timeMinutes * 60);
  };

  const handleSelectOption = (qId: number, optionKey: string) => {
    if (testCompleted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: optionKey }));
    soundFx.playClick();
  };

  const handleFinishTest = () => {
    if (!activeTest) return;
    setTestCompleted(true);
    let correct = 0;
    activeTest.questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    const pct = Math.round((correct / activeTest.questions.length) * 100);
    saveQuizScore(activeTest.id, pct);

    if (pct >= 60) {
      soundFx.playLevelUp();
      triggerConfetti();
    } else {
      soundFx.playIncorrect();
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // If in active test mode
  if (activeTest) {
    const q: ExamQuestion = activeTest.questions[currentQuestionIdx];
    const answeredCount = Object.keys(userAnswers).length;
    const progressPct = Math.round((answeredCount / activeTest.questions.length) * 100);

    let scoreCount = 0;
    if (testCompleted) {
      activeTest.questions.forEach((item) => {
        if (userAnswers[item.id] === item.correctAnswer) scoreCount++;
      });
    }
    const scorePct = Math.round((scoreCount / activeTest.questions.length) * 100);
    const isPassed = scorePct >= 60;

    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
        {/* Test Topbar */}
        <div className="p-4 sm:p-5 rounded-3xl glass-panel shadow-md flex items-center justify-between">
          <div>
            <h2 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              {activeTest.titleBn}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              প্রশ্ন {toBengaliNumber(currentQuestionIdx + 1)} / {toBengaliNumber(activeTest.questions.length)} • উত্তরের অগ্রগতি: {toBengaliNumber(progressPct)}%
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {!testCompleted && (
              <div className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl glass-card border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold font-mono">
                <Clock className="w-4 h-4 text-amber-500 animate-pulse" />
                <span>{formatTime(timeLeftSeconds)}</span>
              </div>
            )}
            <button
              onClick={() => setActiveTest(null)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer px-3 py-1.5 rounded-xl glass-card"
            >
              প্রস্থান
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-300 shadow-sm"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* RESULTS SCREEN */}
        {testCompleted ? (
          <div className="p-8 rounded-3xl glass-panel shadow-xl text-center space-y-6 animate-in zoom-in-95">
            <div className="w-20 h-20 mx-auto rounded-3xl glass-card border border-slate-200/80 dark:border-white/10 flex items-center justify-center text-4xl shadow-lg">
              {isPassed ? '🏆' : '📚'}
            </div>

            <div>
              <span
                className={`px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block ${
                  isPassed
                    ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                    : 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30'
                }`}
              >
                {isPassed ? 'পরীক্ষায় উত্তীর্ণ (PASSED)' : 'পুনরায় অনুশীলন প্রয়োজন'}
              </span>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-2 font-mono">
                আপনার স্কোর: {toBengaliNumber(scorePct)}%
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {toBengaliNumber(activeTest.questions.length)}টির মধ্যে {toBengaliNumber(scoreCount)}টি প্রশ্নের সঠিক উত্তর দিয়েছেন।
              </p>
            </div>

            {/* Answer Breakdown */}
            <div className="space-y-4 text-left pt-4 border-t border-slate-200/70 dark:border-white/10">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                উত্তর পর্যালোচনা ও ব্যাখ্যা:
              </h3>
              <div className="space-y-3">
                {activeTest.questions.map((item, idx) => {
                  const userAnsKey = userAnswers[item.id];
                  const isCorrect = userAnsKey === item.correctAnswer;
                  const correctOpt = item.options.find((o) => o.key === item.correctAnswer);
                  const userOpt = item.options.find((o) => o.key === userAnsKey);

                  return (
                    <div
                      key={item.id}
                      className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-2 glass-card ${
                        isCorrect
                          ? 'border-emerald-500/30 bg-emerald-500/5'
                          : 'border-rose-500/30 bg-rose-500/5'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span className="text-slate-900 dark:text-white">
                          প্রশ্ন {toBengaliNumber(idx + 1)}: {item.questionText}
                        </span>
                        {isCorrect ? (
                          <span className="text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>সঠিক</span>
                          </span>
                        ) : (
                          <span className="text-rose-600 dark:text-rose-400 flex items-center space-x-1">
                            <XCircle className="w-4 h-4" />
                            <span>ভুল</span>
                          </span>
                        )}
                      </div>
                      <div className="pt-1 text-xs">
                        <span className="text-slate-400">আপনার উত্তর: </span>
                        <span className="font-bold text-slate-900 dark:text-slate-100">
                          {userOpt ? `${userOpt.key}) ${userOpt.text}` : 'দেওয়া হয়নি'}
                        </span>{' '}
                        • <span className="text-slate-400">সঠিক উত্তর: </span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          {correctOpt ? `${correctOpt.key}) ${correctOpt.text}` : item.correctAnswer}
                        </span>
                      </div>
                      <div className="p-3 rounded-xl glass-card text-xs text-slate-600 dark:text-slate-300">
                        <span className="font-bold">ব্যাখ্যা: </span>
                        {item.explanationBn}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center space-x-3 pt-4">
              <button
                onClick={() => handleStartTest(activeTest)}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl glass-btn-secondary text-xs font-bold cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>পুনরায় পরীক্ষা দিন</span>
              </button>
              <button
                onClick={() => setActiveTest(null)}
                className="flex items-center space-x-2 px-6 py-2.5 rounded-xl glass-btn-primary text-xs font-bold shadow-md cursor-pointer"
              >
                <span>অন্যান্য টেস্ট দেখুন</span>
              </button>
            </div>
          </div>
        ) : (
          /* ACTIVE QUESTION CARD */
          <div className="p-6 sm:p-8 rounded-3xl glass-panel shadow-xl space-y-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold glass-pill text-indigo-600 dark:text-indigo-400">
                  {q.section}
                </span>
                <span className="text-xs text-slate-400">{q.subSection}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug whitespace-pre-line">
                {q.questionText}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {q.options?.map((opt) => {
                const isSelected = userAnswers[q.id] === opt.key;
                return (
                  <button
                    key={opt.key}
                    onClick={() => handleSelectOption(q.id, opt.key)}
                    className={`w-full p-4 rounded-2xl border text-left text-sm sm:text-base font-semibold transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 shadow-md ring-2 ring-indigo-500/30'
                        : 'glass-card border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:border-indigo-400/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold uppercase ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'glass-card text-slate-700 dark:text-slate-300'
                      }`}>
                        {opt.key}
                      </span>
                      <span>{opt.text}</span>
                    </div>
                    <span
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-indigo-500 bg-indigo-600 text-white' : 'border-slate-400'
                      }`}
                    >
                      {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Step Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200/70 dark:border-white/10">
              <button
                onClick={() => setCurrentQuestionIdx((prev) => Math.max(0, prev - 1))}
                disabled={currentQuestionIdx === 0}
                className="flex items-center space-x-1 px-4 py-2 rounded-xl text-xs font-bold glass-card border border-slate-200 dark:border-white/10 disabled:opacity-30 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>পূর্ববর্তী</span>
              </button>

              {currentQuestionIdx === activeTest.questions.length - 1 ? (
                <button
                  onClick={handleFinishTest}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  পরীক্ষা জমা দিন (Submit Test)
                </button>
              ) : (
                <button
                  onClick={() =>
                    setCurrentQuestionIdx((prev) =>
                      Math.min(activeTest.questions.length - 1, prev + 1)
                    )
                  }
                  className="flex items-center space-x-1 px-5 py-2 rounded-xl glass-btn-primary text-xs font-bold shadow-sm cursor-pointer"
                >
                  <span>পরবর্তী</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // DEFAULT VIEW: LIST OF TESTS
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel relative overflow-hidden shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-bold uppercase tracking-widest mb-2 px-3 py-1 rounded-full glass-card border border-indigo-500/20">
            <Target className="w-3.5 h-3.5" />
            <span>JLPT N5 অনুরূপ মক টেস্ট</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            অনুশীলন ও মডেল টেস্ট কেন্দ্র
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl">
            প্রকৃত JLPT N5 এবং NAT-TEST পরীক্ষার আদলে সাজানো পূর্ণাঙ্গ মডেল টেস্ট ও তাৎক্ষণিক ফলাফল।
          </p>
        </div>

        <div className="glass-card border border-slate-200/80 dark:border-white/10 p-5 rounded-2xl shrink-0 text-center sm:text-right relative z-10 shadow-sm">
          <p className="text-xs text-slate-400 font-semibold font-mono">সম্পন্ন টেস্ট</p>
          <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
            {toBengaliNumber(Object.keys(currentUser?.stats.quizScores || {}).length)} / {toBengaliNumber(modelTestsData.length)}
          </p>
        </div>
      </div>

      {/* Model Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modelTestsData.map((test) => {
          const score = currentUser?.stats.quizScores[test.id];
          const isPassed = score !== undefined && score >= 60;
          return (
            <div
              key={test.id}
              className="p-6 rounded-3xl glass-card hover:border-indigo-500/40 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold glass-pill text-indigo-600 dark:text-indigo-400">
                    {test.level}
                  </span>
                  <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-medium">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>{toBengaliNumber(test.timeMinutes)} মিনিট</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {test.titleBn}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {test.title}
                </p>

                <div className="mt-3 flex items-center space-x-3 text-xs text-slate-600 dark:text-slate-400 font-mono">
                  <span>{toBengaliNumber(test.questions.length)} টি প্রশ্ন</span>
                  <span>•</span>
                  <span>মোট নম্বর: {toBengaliNumber(test.totalMarks)}</span>
                  <span>•</span>
                  <span>পাস মার্ক: ৬০%</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/70 dark:border-white/10 flex items-center justify-between">
                {score !== undefined ? (
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-xl ${
                        isPassed
                          ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                          : 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      সর্বোচ্চ স্কোর: {toBengaliNumber(score)}%
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-slate-400">এখনো টেস্ট দেওয়া হয়নি</span>
                )}

                <button
                  onClick={() => handleStartTest(test)}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl glass-btn-primary text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{score !== undefined ? 'পুনরায় পরীক্ষা' : 'টেস্ট শুরু করুন'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
