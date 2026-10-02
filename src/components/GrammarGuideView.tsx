import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { lessonsData } from '../data/lessonsData';
import { playJapaneseAudio, soundFx } from '../utils/audio';
import { FileText, Search, Volume2, Check, BookOpen, Sparkles } from 'lucide-react';
import { toBengaliNumber } from '../utils/vocabCategories';

export const GrammarGuideView: React.FC = () => {
  const { currentUser, markGrammarCompleted } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedParticle, setSelectedParticle] = useState<string>('all');

  // Collect all rules from all lessons
  const allRules = Object.values(lessonsData).flatMap((l) => l.grammarRules);

  const particles = [
    { id: 'all', label: 'সব নিয়ম (All)' },
    { id: 'は', label: 'は (Topic)' },
    { id: 'を', label: 'を (Object)' },
    { id: 'に', label: 'に (Time/Destination)' },
    { id: 'へ', label: 'へ (Direction)' },
    { id: 'で', label: 'で (Means/Place)' },
    { id: 'と', label: 'と (With/And)' },
    { id: 'も', label: 'も (Also)' },
    { id: 'て', label: 'て-Form (Requests)' },
    { id: 'ない', label: 'ない-Form (Negatives)' },
    { id: '辞書', label: '辞書形 (Dict/Can)' },
    { id: 'た', label: 'た-Form (Past/Exp)' },
    { id: 'たら', label: 'たら (Condition/If)' },
    { id: 'くれ', label: 'くれる/あげる (Favors)' },
  ];

  const filteredRules = allRules.filter((r) => {
    const term = searchTerm.toLowerCase();
    const matchSearch =
      r.titleBn.toLowerCase().includes(term) ||
      r.titleEn.toLowerCase().includes(term) ||
      r.pattern.toLowerCase().includes(term) ||
      r.explanationBn.toLowerCase().includes(term);

    const matchParticle =
      selectedParticle === 'all' ||
      r.pattern.includes(selectedParticle) ||
      r.titleBn.includes(selectedParticle);

    return matchSearch && matchParticle;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel relative overflow-hidden shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-bold uppercase tracking-widest mb-2 px-3 py-1 rounded-full glass-card border border-indigo-500/20">
            <FileText className="w-3.5 h-3.5" />
            <span>N5 GRAMMAR & SENTENCE STRUCTURE GUIDE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            文法 ব্যাকরণ রেফারেন্স গাইড
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
            লেসন ১-২৫ এর সমস্ত পার্টিকেল, ক্রিয়ার রূপান্তর (て, ない, た রূপ) ও বাক্য কাঠামোর পুঙ্খানুপুঙ্খ বাংলা ব্যাখ্যা এবং অডিও।
          </p>
        </div>

        <div className="glass-card px-5 py-4 rounded-2xl shrink-0 text-center sm:text-right border border-slate-200/80 dark:border-white/10 relative z-10">
          <p className="text-[11px] font-mono text-slate-400 uppercase font-semibold">আয়ত্ত নিয়ম</p>
          <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
            {toBengaliNumber(currentUser?.stats.completedGrammarIds.length || 0)} / {toBengaliNumber(allRules.length)}
          </p>
        </div>
      </div>

      {/* Filter and Particle Pills */}
      <div className="p-4 rounded-2xl glass-card space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="নিয়ম, পার্টিকেল বা বাক্য প্যাটার্ন দিয়ে খুঁজুন (যেমন: です, を, は, て-form)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Quick Particle Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {particles.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedParticle(p.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                selectedParticle === p.id
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm'
                  : 'glass-card text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-indigo-500/40'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rules List */}
      <div className="space-y-4">
        {filteredRules.map((rule) => {
          const isMastered = currentUser?.stats.completedGrammarIds.includes(rule.id);
          return (
            <div
              key={rule.id}
              className="p-5 sm:p-6 rounded-3xl glass-card space-y-4 hover:border-indigo-500/40 transition-all shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/70 dark:border-white/10 pb-3">
                <div className="flex items-center space-x-2.5">
                  <span className="px-2.5 py-1 rounded-full glass-pill text-indigo-600 dark:text-indigo-400 font-mono font-bold text-xs">
                    লেসন {toBengaliNumber(rule.lessonId)}
                  </span>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                    {rule.titleBn}
                  </h3>
                </div>

                <button
                  onClick={() => {
                    markGrammarCompleted(rule.id);
                    soundFx.playCorrect();
                  }}
                  className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isMastered
                      ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                      : 'glass-btn-secondary'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{isMastered ? 'আয়ত্ত হয়েছে ✓' : 'আয়ত্ত করুন (+20 XP)'}</span>
                </button>
              </div>

              {/* Formula Badge */}
              <div className="p-3.5 rounded-2xl glass-card border border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
                    কাঠামো / ফরমূলা:
                  </span>
                  <span className="text-sm sm:text-base font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                    {rule.pattern}
                  </span>
                </div>
              </div>

              {/* Explanation in Bengali */}
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {rule.explanationBn}
              </p>

              {/* Examples */}
              <div className="space-y-2 pt-1">
                <p className="text-xs font-bold text-slate-400 uppercase font-mono">উদাহরণ বাক্য:</p>
                <div className="space-y-2">
                  {rule.examples.map((ex, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl glass-card border border-slate-200/70 dark:border-white/10 flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white font-serif">
                          {ex.jp}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          {ex.bn} • <span className="text-slate-400 dark:text-slate-500">{ex.en}</span>
                        </p>
                      </div>
                      <button
                        onClick={() => playJapaneseAudio(ex.jp)}
                        className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                        title="উচ্চারণ শুনুন"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
