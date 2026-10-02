import React, { useState } from 'react';
import { particlesList, particleComparisons } from '../data/particlesData';
import { playJapaneseAudio, soundFx } from '../utils/audio';
import {
  Layers,
  Volume2,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  GitCompare,
  RotateCcw,
  Sparkles,
  Search,
} from 'lucide-react';
import { toBengaliNumber } from '../utils/vocabCategories';

export const ParticlesView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'comparisons' | 'quiz'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedParticle, setSelectedParticle] = useState(particlesList[0]);
  
  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Flatten all practice questions
  const allQuestions = particlesList.flatMap((p) =>
    p.practiceQuestions.map((q, idx) => ({
      ...q,
      id: `${p.id}-q${idx}`,
      particleSymbol: p.symbol,
    }))
  );

  const filteredParticles = particlesList.filter((p) => {
    const term = searchTerm.toLowerCase();
    return (
      p.symbol.includes(term) ||
      p.romaji.toLowerCase().includes(term) ||
      p.nameBn.toLowerCase().includes(term) ||
      p.summaryBn.toLowerCase().includes(term)
    );
  });

  const handleOptionSelect = (qId: string, opt: string) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qId]: opt }));
    soundFx.playClick();
  };

  const handleCheckQuiz = () => {
    setQuizSubmitted(true);
    let correct = 0;
    allQuestions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswer) correct++;
    });
    const pct = Math.round((correct / Math.max(1, allQuestions.length)) * 100);
    if (pct >= 60) {
      soundFx.playLevelUp();
    } else {
      soundFx.playIncorrect();
    }
  };

  const handleResetQuiz = () => {
    setQuizSubmitted(false);
    setQuizAnswers({});
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header - Glass Aesthetic */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel relative overflow-hidden shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-bold uppercase tracking-widest mb-2 px-3 py-1 rounded-full glass-card border border-indigo-500/20">
            <Layers className="w-3.5 h-3.5" />
            <span>JLPT N5 GRAMMAR ESSENTIALS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            助詞 জাপানি পার্টিকেল গাইড (Particles Master)
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            N5 পরীক্ষার {toBengaliNumber(particlesList.length)}টি অপরিহার্য পার্টিকেলের পুঙ্খানুপুঙ্খ নিয়মাবলী, বাক্য গঠন, সূক্ষ্ম তুলনামূলক পার্থক্য ও অডিও উচ্চারণ।
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 glass-card p-1.5 rounded-2xl shrink-0 border border-slate-200/80 dark:border-white/10 relative z-10">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            পার্টিকেল তালিকা
          </button>
          <button
            onClick={() => setActiveTab('comparisons')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'comparisons'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            সূক্ষ্ম পার্থক্য (vs)
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            অনুশীলন কুইজ
          </button>
        </div>
      </div>

      {/* TAB 1: ALL PARTICLES */}
      {activeTab === 'all' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Particle Badges & Search */}
          <div className="lg:col-span-4 space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="পার্টিকেল বা অর্থ খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl glass-card text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 gap-2 max-h-[720px] overflow-y-auto pr-1">
              {filteredParticles.map((particle) => {
                const isSelected = selectedParticle.id === particle.id;
                return (
                  <button
                    key={particle.id}
                    onClick={() => {
                      setSelectedParticle(particle);
                      soundFx.playClick();
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between group cursor-pointer ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-500/15 shadow-sm ring-1 ring-indigo-500/30'
                        : 'glass-card hover:border-indigo-500/40'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl font-bold font-serif shadow-sm ${
                          isSelected
                            ? 'bg-gradient-to-br from-indigo-600 to-violet-600 text-white'
                            : 'glass-panel text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {particle.symbol}
                      </span>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-sm text-slate-900 dark:text-white">{particle.symbol}</span>
                          <span className="text-xs font-mono text-slate-400">({particle.romaji})</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                          {particle.nameBn}
                        </p>
                      </div>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected
                          ? 'text-indigo-600 dark:text-indigo-400 translate-x-1'
                          : 'text-slate-400 group-hover:translate-x-1'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Comprehensive Detail View */}
          <div className="lg:col-span-8">
            <div className="p-6 sm:p-7 rounded-3xl glass-panel space-y-6 shadow-sm">
              {/* Main Particle Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200/70 dark:border-white/10">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white flex items-center justify-center text-3xl font-serif font-black shadow-md">
                    {selectedParticle.symbol}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                        {selectedParticle.nameBn}
                      </h2>
                      <span className="text-xs font-mono px-2 py-0.5 rounded-full glass-pill text-indigo-600 dark:text-indigo-400 font-bold">
                        {selectedParticle.romaji}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 font-medium">
                      {selectedParticle.nameEn}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => playJapaneseAudio(selectedParticle.symbol)}
                  className="glass-btn-secondary text-xs font-bold transition-all self-start sm:self-auto flex items-center space-x-1.5 px-3.5 py-2 rounded-xl cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 text-indigo-500" />
                  <span>উচ্চারণ শুনুন</span>
                </button>
              </div>

              {/* Core Function & Structure */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl glass-card space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    মূল উদ্দেশ্য ও ভূমিকা
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {selectedParticle.summaryBn}
                  </p>
                </div>

                <div className="p-4 rounded-2xl glass-card space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    বাক্য গঠন (Sentence Structure)
                  </span>
                  <div className="font-mono text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-slate-100/50 dark:bg-white/5 px-3 py-2 rounded-xl border border-slate-200/50 dark:border-white/10">
                    {selectedParticle.structure}
                  </div>
                </div>
              </div>

              {/* In-depth Usage Explanation */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  ব্যবহারের বিস্তারিত নিয়ম
                </h3>
                <div className="p-4 rounded-2xl glass-card text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {selectedParticle.coreUsageBn}
                </div>
              </div>

              {/* Authentic Example Sentences */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  বাস্তব উদাহরণ বাক্যসমূহ
                </h3>
                <div className="space-y-2.5">
                  {selectedParticle.examples.map((ex, exIdx) => (
                    <div
                      key={exIdx}
                      className="p-4 rounded-2xl glass-card flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <p className="font-bold text-sm sm:text-base text-slate-900 dark:text-white font-serif">
                            {ex.jp}
                          </p>
                          <button
                            onClick={() => playJapaneseAudio(ex.jp)}
                            className="p-1 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
                            title="শুনুন"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          <span className="font-semibold text-slate-900 dark:text-white">বাংলা:</span> {ex.bn}
                        </p>
                        {ex.breakdownBn && (
                          <p className="text-[11px] text-slate-400 font-mono pt-0.5">
                            বিশ্লেষণ: {ex.breakdownBn}
                          </p>
                        )}
                      </div>
                      <span className="text-[10px] font-mono px-2 py-1 rounded-lg glass-pill text-slate-500 self-start sm:self-auto shrink-0">
                        {ex.en}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Common Mistakes & Special Notes */}
              {(selectedParticle.commonMistakesBn || selectedParticle.notesBn) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {selectedParticle.notesBn && (
                    <div className="p-4 rounded-2xl glass-card space-y-1 border-indigo-500/20">
                      <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                        বিশেষ লক্ষ্যণীয় দিক
                      </span>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {selectedParticle.notesBn}
                      </p>
                    </div>
                  )}

                  {selectedParticle.commonMistakesBn && (
                    <div className="p-4 rounded-2xl glass-card space-y-1 border-amber-500/20">
                      <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                        সাধারণ ভুল বনাম শুদ্ধ রূপ
                      </span>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-mono">
                        {selectedParticle.commonMistakesBn}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PARTICLE COMPARISONS (vs) */}
      {activeTab === 'comparisons' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {particleComparisons.map((comp) => (
              <div
                key={comp.id}
                className="p-6 rounded-3xl glass-panel space-y-5 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/70 dark:border-white/10">
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-mono text-sm font-black shadow-sm">
                      {comp.pair}
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      {comp.titleBn}
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl glass-card space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      সংক্ষিপ্ত মূল পার্থক্য
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                      {comp.differenceBn}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl glass-card space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      বিশদ ব্যাখ্যা
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {comp.explanationBn}
                    </p>
                  </div>
                </div>

                {/* Comparison Examples */}
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    পাশাপাশি তুলনামূলক উদাহরণ
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {comp.examples.map((ex, exIdx) => (
                      <div
                        key={exIdx}
                        className="p-4 rounded-2xl glass-card space-y-3"
                      >
                        {/* Sentence A */}
                        <div className="pb-2 border-b border-slate-200/70 dark:border-white/10 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full glass-pill text-indigo-600 dark:text-indigo-400">
                              {comp.particleA} এর ব্যবহার
                            </span>
                            <button
                              onClick={() => playJapaneseAudio(ex.sentenceA)}
                              className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer p-1"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="font-bold text-sm text-slate-900 dark:text-white font-serif">
                            {ex.sentenceA}
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-300">
                            {ex.meaningBnA}
                          </p>
                        </div>

                        {/* Sentence B */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full glass-pill text-indigo-600 dark:text-indigo-400">
                              {comp.particleB} এর ব্যবহার
                            </span>
                            <button
                              onClick={() => playJapaneseAudio(ex.sentenceB)}
                              className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer p-1"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="font-bold text-sm text-slate-900 dark:text-white font-serif">
                            {ex.sentenceB}
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-300">
                            {ex.meaningBnB}
                          </p>
                        </div>

                        {/* Nuance */}
                        <div className="pt-2 border-t border-slate-200/70 dark:border-white/10 text-[11px] text-slate-500 dark:text-slate-400 italic">
                          💡 সূক্ষ্ম পার্থক্য: {ex.nuanceBn}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: QUIZ & PRACTICE */}
      {activeTab === 'quiz' && (
        <div className="p-6 sm:p-8 rounded-3xl glass-panel space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/70 dark:border-white/10">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                পার্টিকেল অনুশীলন কুইজ ({toBengaliNumber(allQuestions.length)}টি প্রশ্ন)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                বাক্যে সঠিক পার্টিকেল নির্বাচন করে আপনার ধারণা যাচাই করুন।
              </p>
            </div>

            {quizSubmitted && (
              <button
                onClick={handleResetQuiz}
                className="glass-btn-secondary text-xs font-bold transition-all px-4 py-2 rounded-xl flex items-center space-x-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>আবার চেষ্টা করুন</span>
              </button>
            )}
          </div>

          <div className="space-y-4">
            {allQuestions.map((q, qIdx) => {
              const selectedOpt = quizAnswers[q.id];
              const isCorrect = selectedOpt === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl glass-card space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      প্রশ্ন #{toBengaliNumber(qIdx + 1)}
                    </span>
                    {quizSubmitted && (
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          isCorrect
                            ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {isCorrect ? '✓ সঠিক উত্তর' : '✗ ভুল উত্তর'}
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-serif">
                      {q.questionJp}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {q.questionBn}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                    {q.options.map((opt) => {
                      const isChosen = selectedOpt === opt;
                      let btnClasses =
                        'glass-card hover:border-indigo-500/40 text-slate-800 dark:text-slate-200';

                      if (quizSubmitted) {
                        if (opt === q.correctAnswer) {
                          btnClasses = 'bg-emerald-500 text-white font-bold border-emerald-500 shadow-sm';
                        } else if (isChosen && !isCorrect) {
                          btnClasses = 'bg-rose-500/20 text-rose-500 line-through border-rose-500/40';
                        }
                      } else if (isChosen) {
                        btnClasses = 'bg-indigo-600 text-white font-bold border-indigo-600 shadow-sm';
                      }

                      return (
                        <button
                          key={opt}
                          disabled={quizSubmitted}
                          onClick={() => handleOptionSelect(q.id, opt)}
                          className={`py-2.5 px-4 rounded-xl border text-sm font-serif font-bold transition-all text-center cursor-pointer ${btnClasses}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation after submission */}
                  {quizSubmitted && (
                    <div className="p-3.5 rounded-xl glass-panel text-xs text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-white/10">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">ব্যাখ্যা:</span> {q.explanationBn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!quizSubmitted && (
            <div className="pt-4 text-center">
              <button
                onClick={handleCheckQuiz}
                disabled={Object.keys(quizAnswers).length === 0}
                className="glass-btn-primary px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-md disabled:opacity-50 cursor-pointer"
              >
                উত্তর যাচাই করুন
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
