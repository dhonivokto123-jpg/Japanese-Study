import React, { useState } from 'react';
import { particleDetailedComparisons, DetailedComparisonItem } from '../../data/particleComparisonsData';
import { playJapaneseAudio, soundFx } from '../../utils/audio';
import {
  Scale,
  Volume2,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  Check,
  X,
  Sparkles
} from 'lucide-react';

export const ParticleComparisonView: React.FC = () => {
  const [selectedPairId, setSelectedPairId] = useState<string>(particleDetailedComparisons[0].id);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);

  const activeItem =
    particleDetailedComparisons.find((c) => c.id === selectedPairId) || particleDetailedComparisons[0];

  const handleSelectPair = (id: string) => {
    setSelectedPairId(id);
    setSelectedQuizOption(null);
    setIsQuizSubmitted(false);
    soundFx.playClick();
  };

  const handleAudio = (text: string) => {
    playJapaneseAudio(text);
  };

  const handleQuizChoice = (opt: string) => {
    if (isQuizSubmitted) return;
    setSelectedQuizOption(opt);
    setIsQuizSubmitted(true);
    if (opt === activeItem.quizQuestion.correctAnswer) {
      soundFx.playCorrect();
    } else {
      soundFx.playIncorrect();
    }
  };

  return (
    <div className="space-y-6">
      {/* Pair Navigation Tabs */}
      <div className="glass-card p-3 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-2 overflow-x-auto">
        {particleDetailedComparisons.map((item) => {
          const isSelected = item.id === selectedPairId;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectPair(item.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{item.pair}</span>
            </button>
          );
        })}
      </div>

      {/* Comparison Main Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/20 shadow-xl space-y-6 relative overflow-hidden">
        {/* Header */}
        <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/40">
            <Scale className="w-3.5 h-3.5" />
            <span>PARTICLE CONTRAST ANALYSIS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {activeItem.titleBn}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50/70 dark:bg-slate-900/50 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-800">
            {activeItem.quickSummaryBn}
          </p>
        </div>

        {/* 2-Column Particle Pill Headers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/50 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                পার্টিকেল A
              </span>
              <div className="text-2xl font-black font-serif text-slate-900 dark:text-white mt-0.5">
                {activeItem.particleA}
              </div>
            </div>
            <button
              onClick={() => handleAudio(activeItem.particleA.split(' ')[0])}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 text-indigo-600 shadow-sm hover:scale-105 transition-all"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/50 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                পার্টিকেল B
              </span>
              <div className="text-2xl font-black font-serif text-slate-900 dark:text-white mt-0.5">
                {activeItem.particleB}
              </div>
            </div>
            <button
              onClick={() => handleAudio(activeItem.particleB.split(' ')[0])}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 text-purple-600 shadow-sm hover:scale-105 transition-all"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Core Differences Breakdown */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            প্রধান প্রধান পার্থক্যসমূহ
          </h3>
          <div className="space-y-2">
            {activeItem.coreDifferenceBn.map((diff, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl glass-card border border-slate-200/70 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed flex items-start gap-2.5"
              >
                <span className="text-indigo-500 font-bold mt-0.5">🔹</span>
                <span>{diff}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Aspect Table */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            পাশাপাশি তুলনামূলক ছক
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3.5">দিক (Aspect)</th>
                  <th className="p-3.5 text-indigo-600 dark:text-indigo-400">{activeItem.particleA}</th>
                  <th className="p-3.5 text-purple-600 dark:text-purple-400">{activeItem.particleB}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                {activeItem.contrastPoints.map((point, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white bg-slate-50/30 dark:bg-slate-900/30">
                      {point.aspectBn}
                    </td>
                    <td className="p-3.5">{point.particleAUsageBn}</td>
                    <td className="p-3.5">{point.particleBUsageBn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Paired Contrast Sentences */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            বাস্তব বাক্যে সূক্ষ্ম অর্থের তারতম্য (Paired Examples)
          </h3>
          <div className="space-y-4">
            {activeItem.pairedExamples.map((pairEx, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 space-y-3.5"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Sentence A */}
                  <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        {activeItem.particleA} দিয়ে বাক্য:
                      </span>
                      <button
                        onClick={() => handleAudio(pairEx.sentenceA)}
                        className="p-1 rounded text-slate-400 hover:text-indigo-600"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="font-serif font-bold text-base text-slate-900 dark:text-white">
                      {pairEx.sentenceA}
                    </div>
                    <div className="text-xs text-slate-500 font-mono">{pairEx.readingA}</div>
                    <div className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                      {pairEx.meaningBnA}
                    </div>
                  </div>

                  {/* Sentence B */}
                  <div className="p-4 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/40 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                        {activeItem.particleB} দিয়ে বাক্য:
                      </span>
                      <button
                        onClick={() => handleAudio(pairEx.sentenceB)}
                        className="p-1 rounded text-slate-400 hover:text-purple-600"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="font-serif font-bold text-base text-slate-900 dark:text-white">
                      {pairEx.sentenceB}
                    </div>
                    <div className="text-xs text-slate-500 font-mono">{pairEx.readingB}</div>
                    <div className="text-xs font-semibold text-purple-700 dark:text-purple-300">
                      {pairEx.meaningBnB}
                    </div>
                  </div>
                </div>

                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 leading-relaxed flex items-start gap-2">
                  <Sparkles className="w-4 h-4 shrink-0 text-amber-500 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">অর্থের সূক্ষ্ম পার্থক্য: </span>
                    <span>{pairEx.nuanceExplanationBn}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Memory Tip */}
        <div className="p-4 rounded-2xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-300/80 dark:border-amber-800 flex items-start gap-3 text-amber-900 dark:text-amber-200 text-xs sm:text-sm leading-relaxed">
          <Lightbulb className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
          <div>
            <span className="font-bold">স্মৃতিতে রাখার কৌশল: </span>
            <span>{activeItem.memoryTipBn}</span>
          </div>
        </div>

        {/* Checkup Quiz */}
        <div className="p-5 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>তুলনা যাচাই কুইজ</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="font-serif font-bold text-base text-slate-900 dark:text-white">
              {activeItem.quizQuestion.questionJp}
            </div>
            <div className="text-xs text-slate-500 mt-1">{activeItem.quizQuestion.questionBn}</div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {activeItem.quizQuestion.options.map((opt, idx) => {
              const isSelected = selectedQuizOption === opt;
              const isCorrect = opt === activeItem.quizQuestion.correctAnswer;
              let style =
                'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700';

              if (isQuizSubmitted) {
                if (isCorrect) {
                  style = 'bg-emerald-600 text-white font-bold ring-2 ring-emerald-500/50';
                } else if (isSelected && !isCorrect) {
                  style = 'bg-rose-600 text-white font-bold ring-2 ring-rose-500/50';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isQuizSubmitted}
                  onClick={() => handleQuizChoice(opt)}
                  className={`p-3 rounded-xl font-serif text-sm transition-all flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 ${style}`}
                >
                  <span>{opt}</span>
                  {isQuizSubmitted && isCorrect && <Check className="w-3.5 h-3.5" />}
                  {isQuizSubmitted && isSelected && !isCorrect && <X className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </div>

          {isQuizSubmitted && (
            <div
              className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed border ${
                selectedQuizOption === activeItem.quizQuestion.correctAnswer
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300'
                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-300'
              }`}
            >
              <div className="font-bold mb-1">
                {selectedQuizOption === activeItem.quizQuestion.correctAnswer
                  ? '🎉 একদম নির্ভুল!'
                  : '❌ সঠিক হয়নি!'}
              </div>
              <p>{activeItem.quizQuestion.explanationBn}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
