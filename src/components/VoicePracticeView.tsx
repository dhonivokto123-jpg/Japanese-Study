import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { n5SpeakingPhrases } from '../data/speakingPhrasesData';
import { playJapaneseAudio, stopJapaneseAudio, replayJapaneseAudio, soundFx } from '../utils/audio';
import { SpeakingPhrase } from '../types';
import {
  Volume2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Headphones,
  Snail,
  Play,
} from 'lucide-react';
import { toBengaliNumber } from '../utils/vocabCategories';

export const VoicePracticeView: React.FC = () => {
  const { addXp } = useApp();
  const [selectedPhrase, setSelectedPhrase] = useState<SpeakingPhrase>(n5SpeakingPhrases[0]);
  const [audioSpeed, setAudioSpeed] = useState<number>(0.95);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shadowingDone, setShadowingDone] = useState<Record<string, boolean>>({});
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'wrong' | null>(null);

  // Play audio with selected speed using the Natural Japanese Audio Engine (100% listening, zero mic)
  const handlePlayAudio = async (speed = audioSpeed) => {
    setIsPlaying(true);
    try {
      await playJapaneseAudio(selectedPhrase.japanese, speed);
    } finally {
      setIsPlaying(false);
    }
  };

  // Mark shadowing step as complete and award real XP
  const handleCompleteShadowing = () => {
    if (!shadowingDone[selectedPhrase.id]) {
      setShadowingDone((prev) => ({ ...prev, [selectedPhrase.id]: true }));
      addXp(15, 'শ্যাডোয়িং অনুশীলন সমাপ্ত');
      soundFx.playCorrect();
    }
  };

  const handleSelectPhrase = (phrase: SpeakingPhrase) => {
    stopJapaneseAudio();
    setSelectedPhrase(phrase);
    setSelectedQuizAnswer(null);
    setQuizFeedback(null);
  };

  // 3-choice listening comprehension test for the selected phrase
  const quizOptions = React.useMemo(() => {
    const wrongPhrases = n5SpeakingPhrases
      .filter((p) => p.id !== selectedPhrase.id)
      .slice(0, 2)
      .map((p) => p.bengali);
    const options = [selectedPhrase.bengali, ...wrongPhrases];
    return options.sort((a, b) => (a.length % 2 === 0 ? 1 : -1));
  }, [selectedPhrase]);

  const handleQuizAnswer = (idx: number, opt: string) => {
    setSelectedQuizAnswer(idx);
    if (opt === selectedPhrase.bengali) {
      setQuizFeedback('correct');
      soundFx.playCorrect();
      if (!shadowingDone[`quiz-${selectedPhrase.id}`]) {
        setShadowingDone((prev) => ({ ...prev, [`quiz-${selectedPhrase.id}`]: true }));
        addXp(10, 'লিসেনিং কুইজ সঠিক উত্তর');
      }
    } else {
      setQuizFeedback('wrong');
      soundFx.playIncorrect();
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner - Glass Audio Studio */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel relative overflow-hidden shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-bold uppercase tracking-widest mb-2 px-3 py-1 rounded-full glass-card border border-indigo-500/20">
            <Headphones className="w-3.5 h-3.5" />
            <span>NATIVE JAPANESE AUDIO & LISTENING STUDIO</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            日本語 অডিও ও শ্যাডোয়িং স্টুডিও
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            নেটিভ জাপানি উচ্চারণ শুনুন, বিভিন্ন গতিতে (স্বাভাবিক ও ধীর গতি) প্লে করে শ্যাডোয়িং (মনে মনে বা মুখে পুনরাবৃত্তি) করুন এবং লিসেনিং দক্ষতা বাড়ান।
          </p>
        </div>

        <div className="glass-card px-5 py-3.5 rounded-2xl text-center md:text-right shrink-0 border border-slate-200/80 dark:border-white/10 relative z-10">
          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 uppercase font-semibold block">
            মোট বাক্যাংশ
          </span>
          <span className="text-xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
            {toBengaliNumber(n5SpeakingPhrases.length)}টি N5 বাক্য
          </span>
        </div>
      </div>

      {/* Main Grid: Left Phrases Selection + Right Active Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List of Phrases */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              অনুশীলনের বাক্য নির্বাচন করুন
            </span>
            <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-bold">
              {toBengaliNumber(n5SpeakingPhrases.length)}টি বাক্য
            </span>
          </div>

          <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1 scrollbar-none">
            {n5SpeakingPhrases.map((phrase) => {
              const isSelected = selectedPhrase.id === phrase.id;
              const isCompleted = !!shadowingDone[phrase.id];
              return (
                <button
                  key={phrase.id}
                  onClick={() => handleSelectPhrase(phrase)}
                  className={`w-full p-4 rounded-2xl text-left transition-all flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md ring-2 ring-indigo-400/40'
                      : 'glass-card text-slate-800 dark:text-slate-200 hover:border-indigo-500/40'
                  }`}
                >
                  <div className="space-y-1 min-w-0 flex-1 pr-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm sm:text-base text-inherit truncate">
                        {phrase.japanese}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full shrink-0 font-semibold ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : 'glass-pill text-indigo-700 dark:text-indigo-300'
                        }`}
                      >
                        লেসন {toBengaliNumber(phrase.lessonId)}
                      </span>
                    </div>
                    <p
                      className={`text-xs line-clamp-1 ${
                        isSelected ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {phrase.bengali}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    {isCompleted && (
                      <CheckCircle2
                        className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-emerald-500'}`}
                      />
                    )}
                    <ArrowRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected
                          ? 'text-white translate-x-0.5'
                          : 'text-slate-400 group-hover:translate-x-0.5'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Active Audio Player & Shadowing Station */}
        <div className="lg:col-span-7 space-y-5">
          <div className="p-6 sm:p-8 rounded-3xl glass-panel space-y-6 shadow-md">
            {/* Active Card Header */}
            <div className="space-y-3 pb-6 border-b border-slate-200/70 dark:border-white/10 text-center">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full glass-card text-slate-600 dark:text-slate-300 text-xs font-mono font-bold">
                <span>বিভাগ: {selectedPhrase.category}</span>
                <span>•</span>
                <span>লেসন {toBengaliNumber(selectedPhrase.lessonId)}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-serif">
                {selectedPhrase.japanese}
              </h2>

              <p className="text-sm font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                {selectedPhrase.romaji}
              </p>

              <p className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100">
                {selectedPhrase.bengali}
              </p>

              {selectedPhrase.tipsBn && (
                <div className="max-w-md mx-auto p-3.5 rounded-2xl glass-card border border-slate-200/80 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300 text-left">
                  💡 <span className="font-bold text-slate-900 dark:text-white">উচ্চারণ ও ইন্টোনেশন নির্দেশিকা:</span> {selectedPhrase.tipsBn}
                </div>
              )}
            </div>

            {/* Audio Speed Controls */}
            <div className="flex flex-col items-center justify-center space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                প্লেব্যাক গতি নির্বাচন করুন (Playback Speed)
              </span>
              <div className="flex items-center space-x-2 glass-card p-1.5 rounded-2xl border border-slate-200/80 dark:border-white/10">
                {[
                  { label: 'ধীর গতি (0.72x)', speed: 0.72, icon: Snail },
                  { label: 'স্বাভাবিক (0.95x)', speed: 0.95, icon: Volume2 },
                  { label: 'দ্রুত (1.15x)', speed: 1.15, icon: Play },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = Math.abs(audioSpeed - item.speed) < 0.05;
                  return (
                    <button
                      key={item.speed}
                      onClick={() => {
                        setAudioSpeed(item.speed);
                        handlePlayAudio(item.speed);
                      }}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm'
                          : 'glass-btn-secondary hover:text-indigo-600 dark:hover:text-white'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Audio Play, Replay & Shadowing Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => handlePlayAudio()}
                disabled={isPlaying}
                className={`w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-2xl text-sm font-bold shadow-md transition-all cursor-pointer ${
                  isPlaying
                    ? 'bg-indigo-600 text-white animate-pulse'
                    : 'glass-btn-primary'
                }`}
              >
                <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : ''}`} />
                <span>{isPlaying ? 'উচ্চারণ হচ্ছে...' : 'নেটিভ অডিও শুনুন'}</span>
              </button>

              <button
                onClick={() => replayJapaneseAudio()}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 px-4 py-3 rounded-2xl glass-btn-secondary text-sm font-bold transition-all cursor-pointer"
                title="পুনরায় শুনুন (Replay)"
              >
                <RotateCcw className="w-4 h-4 text-indigo-500" />
                <span>পুনরায় শুনুন</span>
              </button>

              <button
                onClick={handleCompleteShadowing}
                className={`w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer border ${
                  shadowingDone[selectedPhrase.id]
                    ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                    : 'glass-btn-secondary'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>
                  {shadowingDone[selectedPhrase.id]
                    ? 'শ্যাডোয়িং সম্পন্ন (+15 XP)'
                    : 'শুনে মুখে বলেছি (+15 XP)'}
                </span>
              </button>
            </div>

            {/* Listening Comprehension Check (Mini Quiz) */}
            <div className="p-5 rounded-2xl glass-card border border-slate-200/80 dark:border-white/10 space-y-3 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  লিসেনিং বোধগম্যতা যাচাই (Listening Check)
                </span>
                <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                  +10 XP
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                অডিও শুনে বাক্যটির সঠিক বাংলা অর্থ চিহ্নিত করুন:
              </p>

              <div className="space-y-2">
                {quizOptions.map((opt, idx) => {
                  const isSelected = selectedQuizAnswer === idx;
                  let optStyle = 'glass-card border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:border-indigo-500/40';
                  if (isSelected) {
                    if (quizFeedback === 'correct') {
                      optStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold';
                    } else if (quizFeedback === 'wrong') {
                      optStyle = 'bg-rose-500/15 border-rose-500 text-rose-900 dark:text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuizAnswer(idx, opt)}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${optStyle}`}
                    >
                      <span>{opt}</span>
                      {isSelected && quizFeedback === 'correct' && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {quizFeedback === 'correct' && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                  সঠিক উত্তর! আপনি বাক্যটির অর্থ সফলভাবে বুঝতে পেরেছেন (+10 XP অর্জিত)।
                </div>
              )}
              {quizFeedback === 'wrong' && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-800 dark:text-rose-300 text-xs font-medium">
                  ভুল উত্তর। আবার অডিও শুনে সঠিক বিকল্পটি বেছে নিন।
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
