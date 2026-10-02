import React, { useState } from 'react';
import { labSentenceQuestions } from '../../data/particleToolsData';
import { playJapaneseAudio, soundFx } from '../../utils/audio';
import {
  FlaskConical,
  Sparkles,
  Volume2,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  HelpCircle,
  Zap,
  Check,
  X
} from 'lucide-react';

interface Props {
  initialParticleFilter?: string | null;
}

export const ParticleLabView: React.FC<Props> = ({ initialParticleFilter }) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedParticle, setSelectedParticle] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [labMode, setLabMode] = useState<'builder' | 'correction' | 'shift'>('builder');

  const q = labSentenceQuestions[currentQuestionIdx] || labSentenceQuestions[0];

  const handleSelectOption = (opt: string) => {
    if (isAnswered) return;
    setSelectedParticle(opt);
    setIsAnswered(true);

    const expl = q.explanations[opt];
    if (expl?.isCorrect) {
      soundFx.playCorrect();
    } else {
      soundFx.playIncorrect();
    }
  };

  const handleNext = () => {
    soundFx.playClick();
    setSelectedParticle(null);
    setIsAnswered(false);
    if (currentQuestionIdx < labSentenceQuestions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      setCurrentQuestionIdx(0);
    }
  };

  const handleReset = () => {
    soundFx.playClick();
    setSelectedParticle(null);
    setIsAnswered(false);
  };

  const handleAudio = (text: string) => {
    playJapaneseAudio(text);
  };

  const activeExplanation = selectedParticle ? q.explanations[selectedParticle] : null;

  return (
    <div className="space-y-6">
      {/* Mode Navigation */}
      <div className="glass-card p-2 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto">
        {[
          { id: 'builder', label: '🧪 বাক্য নির্মাতা ল্যাব (Sentence Builder)', icon: FlaskConical },
          { id: 'correction', label: '🛠️ ভুল সংশোধন ল্যাব (Error Spotter)', icon: AlertTriangle },
          { id: 'shift', label: '🔄 অর্থ রূপান্তর ল্যাব (Meaning Shift)', icon: Zap },
        ].map((m) => {
          const Icon = m.icon;
          const isActive = labMode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => {
                setLabMode(m.id as any);
                soundFx.playClick();
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. Sentence Builder Lab */}
      {labMode === 'builder' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/20 shadow-xl space-y-6 animate-in fade-in duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/40 mb-2">
                <FlaskConical className="w-3.5 h-3.5" />
                <span>PARTICLE EXPERIMENTATION LAB</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                পার্টিকেল স্লট ল্যাব (কেন সঠিক / কেন ভুল?)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                সঠিক পার্টিকেল বসিয়ে বাক্য সম্পূর্ণ করুন। ভুল অপশন ক্লিক করলেও জানুন কেন তা ব্যাকরণগতভাবে বেমানান।
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">
                প্রশ্ন {currentQuestionIdx + 1} / {labSentenceQuestions.length}
              </span>
              <button
                onClick={handleReset}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-slate-200"
                title="রিসেট"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* The Active Lab Sentence Stage */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-50 to-indigo-50/30 dark:from-slate-900 dark:to-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/40 text-center space-y-4 shadow-inner">
            <div className="inline-flex items-center gap-2 text-2xl sm:text-3xl font-black font-serif text-slate-900 dark:text-white flex-wrap justify-center">
              <span>{q.sentencePre}</span>
              <div
                className={`min-w-[60px] h-[52px] rounded-2xl flex items-center justify-center border-2 transition-all px-3 ${
                  selectedParticle
                    ? activeExplanation?.isCorrect
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30 scale-105'
                      : 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-600/30 scale-105'
                    : 'bg-white dark:bg-slate-800 text-indigo-600 border-dashed border-indigo-400 dark:border-indigo-600 animate-pulse'
                }`}
              >
                {selectedParticle || '？'}
              </div>
              <span>{q.sentencePost}</span>
            </div>

            <div className="text-xs sm:text-sm text-slate-500 font-mono">
              {q.readingPre} {selectedParticle || '___'} {q.readingPost}
            </div>

            <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
              উদ্দিষ্ট বাংলা অর্থ: "{q.meaningBn}"
            </div>

            {selectedParticle && (
              <div className="pt-2">
                <button
                  onClick={() =>
                    handleAudio(`${q.sentencePre}${selectedParticle}${q.sentencePost}`)
                  }
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 hover:bg-slate-50 shadow-sm border border-slate-200 dark:border-slate-700 inline-flex items-center gap-2 transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>তৈরিকৃত বাক্যটি শুনুন</span>
                </button>
              </div>
            )}
          </div>

          {/* Options Palette */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center">
              উপযুক্ত পার্টিকেলটি নির্বাচন করুন:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto">
              {q.options.map((opt, idx) => {
                const isSelected = selectedParticle === opt;
                const isCorrect = q.explanations[opt]?.isCorrect;
                let btnStyle =
                  'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-indigo-400';

                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-600 text-white border-emerald-500 font-bold';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-rose-600 text-white border-rose-500 font-bold';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(opt)}
                    className={`p-4 rounded-2xl border text-xl font-serif font-black transition-all flex items-center justify-center gap-2 shadow-sm ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && isCorrect && <Check className="w-4 h-4" />}
                    {isAnswered && isSelected && !isCorrect && <X className="w-4 h-4" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* In-depth WHY explanation box */}
          {activeExplanation && (
            <div
              className={`p-6 rounded-3xl border space-y-3 animate-in fade-in duration-150 ${
                activeExplanation.isCorrect
                  ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                  : 'bg-rose-50/90 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-base">
                {activeExplanation.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>চমৎকার বিশ্লেষণ! এটিই সঠিক পার্টিকেল</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-5 h-5 text-rose-600" />
                    <span>ভুল পার্টিকেল নির্বাচিত হয়েছে</span>
                  </>
                )}
              </div>

              <p className="text-xs sm:text-sm leading-relaxed">{activeExplanation.reasonBn}</p>

              {activeExplanation.alteredMeaningBn && (
                <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-current text-xs font-semibold">
                  ⚠️ এটি ব্যবহার করলে বিভ্রান্তিকর অর্থ দাঁড়ায়: "{activeExplanation.alteredMeaningBn}"
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-indigo-600 text-white hover:bg-indigo-700 shadow-md flex items-center gap-2"
                >
                  <span>পরবর্তী পরীক্ষা</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. Error Spotter Lab */}
      {labMode === 'correction' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/20 shadow-xl space-y-6 animate-in fade-in duration-150">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-5 space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/40">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>COMMON MISTAKE DETECTION</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              ভুল শনাক্তকরণ ল্যাব (Error Spotter)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              নিচের ভুল বাক্যগুলোর পার্টিকেল ত্রুটি বিশ্লেষণ করুন এবং সঠিক সংস্করণটি শিখুন।
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                bad: '私はすしを好きです。',
                good: '私はすしが好きです。',
                wrongP: 'を',
                correctP: 'が',
                reason: '好き হলো অবস্থা বা পছন্দ প্রকাশকারী শব্দ। সক্রিয় অ্যাকশন না হওয়ায় を নয়, が বসে।'
              },
              {
                bad: '図書館に本を読みます。',
                good: '図書館で本を読みます।',
                wrongP: 'に',
                correctP: 'で',
                reason: 'পড়াশোনার কাজ সংঘটিত হচ্ছে, তাই কাজের স্থানে で বসে।'
              },
              {
                bad: '明日に学校へ行きます。',
                good: '明日学校へ行きます。',
                wrongP: 'に',
                correctP: 'বাদ দিতে হবে',
                reason: '明日 একটি আপেক্ষিক সময়। এর পর に বসে না।'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 space-y-3"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-rose-900 dark:text-rose-200">
                    <div className="text-xs font-bold mb-1 flex items-center gap-1">
                      <X className="w-3.5 h-3.5" /> ❌ ভুল বাক্য:
                    </div>
                    <div className="font-serif font-bold text-base">{item.bad}</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-200">
                    <div className="text-xs font-bold mb-1 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> ✅ সঠিক বাক্য:
                    </div>
                    <div className="font-serif font-bold text-base">{item.good}</div>
                  </div>
                </div>

                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
                  <strong className="text-indigo-600 dark:text-indigo-400">ব্যাখ্যা: </strong>
                  {item.reason}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Meaning Shift Lab */}
      {labMode === 'shift' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/20 shadow-xl space-y-6 animate-in fade-in duration-150">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-5 space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/40">
              <Zap className="w-3.5 h-3.5" />
              <span>PARTICLE REPLACEMENT NUANCE SHIFT</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              পার্টিকেল বদলে গেলে কীভাবে বাক্যের সুর বদলে যায়?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              একই শব্দ কিন্তু ভিন্ন পার্টিকেল—দেখুন ভাব কীভাবে ১৮০ ডিগ্রি ঘুরে যায়!
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                pair: '雨が降る vs 雨は降る',
                sentenceA: '雨が降っています。',
                meaningA: 'আরে, বৃষ্টি পড়ছে! (চোখের সামনে হঠাৎ দেখা ঘটনা)',
                sentenceB: '雨は降っていますが、風はありません。',
                meaningB: 'বৃষ্টি ঠিকই পড়ছে, তবে বাতাস নেই। (বাতাসের সাথে বৈসাদৃশ্য)',
                lesson: 'が নির্দেশ করে চোখের সামনে ঘটা ঘটনা, আর は অন্য বিষয়ের সাথে তুলনা বা বৈসাদৃশ্য প্রকাশ করে।'
              },
              {
                pair: '田中さんが行く vs 田中さんは行く',
                sentenceA: '田中さんが行きます。',
                meaningA: 'তানাকা সাহেবই যাচ্ছেন (অন্য কেউ নয়, তিনিই যাবেন)।',
                sentenceB: '田中さんは行きます。',
                meaningB: 'তানাকা সাহেব যাবেন (অন্যদের কথা জানি না, তবে তিনি যাবেন)।',
                lesson: 'が নির্দিষ্ট ব্যক্তিকে শনাক্ত করে, আর は সাধারণ বিবরণ দেয় বা অন্যদের থেকে তাকে পৃথক করে।'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 space-y-3"
              >
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{item.pair}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="font-serif font-bold text-sm text-indigo-600 dark:text-indigo-400">
                      {item.sentenceA}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">{item.meaningA}</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="font-serif font-bold text-sm text-purple-600 dark:text-purple-400">
                      {item.sentenceB}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">{item.meaningB}</div>
                  </div>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 bg-indigo-50/50 dark:bg-indigo-950/30 p-2.5 rounded-xl">
                  💡 <strong className="text-slate-900 dark:text-white">শিক্ষা: </strong>
                  {item.lesson}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
