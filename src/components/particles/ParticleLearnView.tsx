import React, { useState } from 'react';
import { DetailedParticle, ParticleExampleItem } from '../../types';
import { detailedParticlesList } from '../../data/particlesResearchData';
import { playJapaneseAudio, soundFx } from '../../utils/audio';
import {
  Search,
  Volume2,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Layers,
  HelpCircle,
  Check,
  X,
  ExternalLink,
  Tag,
  FileText
} from 'lucide-react';
import { OriginalGuideReferenceSection } from './OriginalGuideReferenceSection';

interface Props {
  onSelectParticleForLab?: (particle: string) => void;
  onOpenComparison?: (pairId: string) => void;
}

export const ParticleLearnView: React.FC<Props> = ({ onSelectParticleForLab, onOpenComparison }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<'ALL' | 'N5' | 'N4' | 'N3'>('ALL');
  const [activeParticleId, setActiveParticleId] = useState<string>(detailedParticlesList[0].id);
  const [activeTab, setActiveTab] = useState<'core' | 'structure' | 'map' | 'examples' | 'mistakes' | 'quiz' | 'guides'>('core');
  const [exampleTab, setExampleTab] = useState<'beginner' | 'daily' | 'natural'>('beginner');
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);

  // Quick quiz state
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);

  const activeParticle = detailedParticlesList.find((p) => p.id === activeParticleId) || detailedParticlesList[0];

  const filteredParticles = detailedParticlesList.filter((p) => {
    const matchSearch =
      p.symbol.includes(searchTerm) ||
      p.romaji.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.nameBn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.summaryBn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.primaryFunctionBn.toLowerCase().includes(searchTerm.toLowerCase());

    const matchLevel = selectedLevel === 'ALL' || p.level === selectedLevel;
    return matchSearch && matchLevel;
  });

  const handleSelectParticle = (id: string) => {
    setActiveParticleId(id);
    setSelectedBranchId(null);
    setSelectedQuizOption(null);
    setIsQuizSubmitted(false);
    soundFx.playClick();
  };

  const handleAudioPlay = (text: string) => {
    playJapaneseAudio(text);
  };

  const handleQuizAnswer = (opt: string) => {
    if (isQuizSubmitted) return;
    setSelectedQuizOption(opt);
    setIsQuizSubmitted(true);
    const quiz = activeParticle.quickQuestions[0];
    if (opt === quiz?.correctAnswer) {
      soundFx.playCorrect();
    } else {
      soundFx.playIncorrect();
    }
  };

  // Helper to get active example list
  const getExamples = (): ParticleExampleItem[] => {
    if (exampleTab === 'beginner') return activeParticle.beginnerExamples;
    if (exampleTab === 'daily') return activeParticle.dailyExamples.length ? activeParticle.dailyExamples : activeParticle.beginnerExamples;
    return activeParticle.naturalExamples.length ? activeParticle.naturalExamples : activeParticle.beginnerExamples;
  };

  return (
    <div className="space-y-6">
      {/* Top Search & Filter Bar */}
      <div className="glass-card p-4 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="পার্টিকেল খুঁজুন (যেমন: は, ni, টপিক, সময়)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {(['ALL', 'N5', 'N4', 'N3'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                setSelectedLevel(lvl);
                soundFx.playClick();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedLevel === lvl
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {lvl === 'ALL' ? 'সব লেভেল (All)' : `JLPT ${lvl}`}
            </button>
          ))}
        </div>
      </div>

      {/* Main Learning Hub Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Particle Selector Cards */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            পার্টিকেল তালিকা ({filteredParticles.length} টি)
          </div>
          {filteredParticles.map((particle) => {
            const isSelected = particle.id === activeParticleId;
            return (
              <button
                key={particle.id}
                onClick={() => handleSelectParticle(particle.id)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center gap-3.5 group relative overflow-hidden ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/50 shadow-md ring-1 ring-indigo-500/30'
                    : 'glass-card border-slate-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                }`}
              >
                {/* Visual Symbol Badge */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black shrink-0 transition-transform group-hover:scale-105 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                      : 'bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-serif'
                  }`}
                >
                  {particle.symbol}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      {particle.symbol} ({particle.romaji})
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/40">
                      {particle.level}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {particle.primaryFunctionBn}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Deep-Dive Particle Research Workspace */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-5">
          {/* Particle Hero Banner */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-indigo-500/20 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-6 -mr-6 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white font-black text-3xl flex items-center justify-center shadow-lg shadow-indigo-600/30 shrink-0 font-serif">
                  {activeParticle.symbol}
                </div>
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                      {activeParticle.symbol}
                    </h2>
                    <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                      ({activeParticle.romaji} • উচ্চারণ: '{activeParticle.bengaliPronunciation}')
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                      JLPT {activeParticle.level}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mt-1">
                    {activeParticle.nameBn}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAudioPlay(activeParticle.symbol)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 border border-indigo-200 dark:border-indigo-800/40 flex items-center gap-1.5 transition-all"
                  title="জাপানি উচ্চারণ শুনুন"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>উচ্চারণ</span>
                </button>
                {onSelectParticleForLab && (
                  <button
                    onClick={() => onSelectParticleForLab(activeParticle.symbol)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm flex items-center gap-1.5 transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>ল্যাবে টেস্ট করুন</span>
                  </button>
                )}
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 mt-4 leading-relaxed bg-slate-50/60 dark:bg-slate-900/40 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-800">
              {activeParticle.summaryBn}
            </p>
          </div>

          {/* Research Tabs Navigation */}
          <div className="flex items-center gap-1.5 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
            {[
              { id: 'core', label: '💡 অর্থ ও ভূমিকা', icon: Lightbulb },
              { id: 'structure', label: '📐 বাক্যের গঠন', icon: Layers },
              { id: 'map', label: '🗺️ ফাংশন ম্যাপ', icon: Tag },
              { id: 'examples', label: '📖 বাস্তব উদাহরণ', icon: BookOpen },
              { id: 'mistakes', label: '⚠️ সাধারণ ভুল', icon: AlertTriangle },
              { id: 'quiz', label: '🎯 কুইজ চেক', icon: HelpCircle },
              { id: 'guides', label: '🖼 মূল গাইড শিট', icon: FileText },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    soundFx.playClick();
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab 1: Core Meaning & Function */}
          {activeTab === 'core' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="glass-card p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    সরল বাংলা ভাবার্থ
                  </h4>
                  <p className="text-base font-semibold text-slate-900 dark:text-white">
                    {activeParticle.simpleMeaningBn}
                  </p>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    আসল ব্যাকরণগত কাজ (Real Function)
                  </h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {activeParticle.realFunctionBn}
                  </p>
                </div>
              </div>

              {/* When to use vs When NOT to use */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>কখন ব্যবহার করবেন (When to use)</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    {activeParticle.whenToUse.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-500 font-black mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/40 space-y-3">
                  <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    <span>কখন ভুলেও ব্যবহার করবেন না (When NOT to use)</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    {activeParticle.whenNotToUse.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose-500 font-black mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Crucial Note */}
              <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 flex items-start gap-3 text-amber-900 dark:text-amber-200 text-xs sm:text-sm leading-relaxed">
                <Lightbulb className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                <div>
                  <span className="font-bold">গুরুত্বপূর্ণ সতর্কতা: </span>
                  <span>{activeParticle.importantNotesBn}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Visual Sentence Structure */}
          {activeTab === 'structure' && (
            <div className="glass-card p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-6 animate-in fade-in duration-150">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  বাক্যের সাধারণ ফর্মুলা
                </h4>
                <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-sm sm:text-base border border-slate-700 shadow-inner">
                  {activeParticle.patternFormula}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  শব্দবিন্যাস ও রঙের নির্দেশক (Token Breakdown)
                </h4>
                <div className="flex flex-wrap items-center gap-2.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  {activeParticle.structureBreakdown.map((token, idx) => {
                    const colorStyles: Record<string, string> = {
                      indigo: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border-indigo-300',
                      rose: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300 font-black scale-105 shadow-sm',
                      emerald: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300',
                      amber: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300',
                      cyan: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 border-cyan-300',
                      purple: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-300',
                      slate: 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-300',
                    };

                    return (
                      <div
                        key={idx}
                        className={`px-3.5 py-2 rounded-xl border text-xs sm:text-sm flex flex-col items-center gap-0.5 ${
                          colorStyles[token.color] || colorStyles.slate
                        }`}
                      >
                        <span className="font-bold font-serif text-sm sm:text-base">{token.token}</span>
                        <span className="text-[10px] opacity-80">{token.roleBn}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/40 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <span className="font-bold text-indigo-700 dark:text-indigo-400">বিশ্লেষণ: </span>
                <span>{activeParticle.structureExplanationBn}</span>
              </div>
            </div>
          )}

          {/* Tab 3: Function Map */}
          {activeTab === 'map' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                এই পার্টিকেলের প্রধান প্রধান ব্যবহারসমূহ ({activeParticle.functionBranches.length} টি শাখা)
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeParticle.functionBranches.map((branch) => {
                  const isSelected = selectedBranchId === branch.id;
                  return (
                    <div
                      key={branch.id}
                      onClick={() => {
                        setSelectedBranchId(isSelected ? null : branch.id);
                        soundFx.playClick();
                      }}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-50/80 dark:bg-indigo-950/50 border-indigo-500 ring-2 ring-indigo-500/20 shadow-md'
                          : 'glass-card border-slate-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                          {branch.titleBn}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {branch.titleEn}
                        </span>
                      </div>

                      <div className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30 px-2.5 py-1 rounded-lg inline-block mb-2">
                        {branch.formula}
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                        {branch.descriptionBn}
                      </p>

                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-serif font-bold text-slate-900 dark:text-white">
                            {branch.sampleSentence}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAudioPlay(branch.sampleSentence);
                            }}
                            className="p-1 rounded-md text-slate-400 hover:text-indigo-600"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-[11px] text-slate-500">{branch.sampleReading}</div>
                        <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                          {branch.sampleBn}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 4: Categorized Real-Life Examples */}
          {activeTab === 'examples' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Category Sub-Tabs */}
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900/60 p-1.5 rounded-2xl w-fit">
                {[
                  { id: 'beginner', label: `🟢 মৌলিক বাক্য (${activeParticle.beginnerExamples.length})` },
                  { id: 'daily', label: `🟡 প্রাত্যহিক কথোপকথন (${activeParticle.dailyExamples.length})` },
                  { id: 'natural', label: `🔵 সাবলীল জাপানি (${activeParticle.naturalExamples.length})` },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setExampleTab(t.id as any);
                      soundFx.playClick();
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      exampleTab === t.id
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Examples List */}
              <div className="space-y-3.5">
                {getExamples().map((ex, idx) => (
                  <div
                    key={idx}
                    className="glass-card p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-white">
                          {ex.jp}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                          {ex.hiragana} • <span className="italic">{ex.romaji}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleAudioPlay(ex.jp)}
                        className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition-all shrink-0"
                        title="অডিও শুনুন"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                      বাংলা: {ex.bn}
                    </div>

                    {/* Word-by-word Breakdown */}
                    {ex.breakdown && ex.breakdown.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {ex.breakdown.map((b, bIdx) => (
                          <span
                            key={bIdx}
                            className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                          >
                            <span className="font-bold text-slate-900 dark:text-white">{b.word}</span>{' '}
                            <span className="text-slate-500">({b.meaningBn})</span>
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="text-xs text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30 p-2 rounded-xl flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 shrink-0" />
                      <span>{ex.particleFunctionNote}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 5: Common Mistakes */}
          {activeTab === 'mistakes' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                শিক্ষার্থীরা সচরাচর যে ভুলগুলো করে থাকে ({activeParticle.commonMistakes.length} টি)
              </div>
              <div className="space-y-4">
                {activeParticle.commonMistakes.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 space-y-3"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 mb-1">
                          <X className="w-4 h-4" />
                          <span>ভুল প্রয়োগ</span>
                        </div>
                        <div className="font-serif font-bold text-sm text-slate-900 dark:text-white">
                          {m.incorrectJp}
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                          <Check className="w-4 h-4" />
                          <span>সঠিক প্রয়োগ</span>
                        </div>
                        <div className="font-serif font-bold text-sm text-slate-900 dark:text-white">
                          {m.correctJp}
                        </div>
                      </div>
                    </div>

                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-1.5 pt-1">
                      <p>
                        <strong className="text-rose-600 dark:text-rose-400">কেন ভুল: </strong>
                        {m.whyIncorrectBn}
                      </p>
                      <p>
                        <strong className="text-emerald-600 dark:text-emerald-400">সঠিক যুক্তি: </strong>
                        {m.correctReasonBn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 6: Quick Checkup Quiz */}
          {activeTab === 'quiz' && (
            <div className="glass-card p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>মৌলিক ধারণা যাচাই কুইজ</span>
              </div>

              {activeParticle.quickQuestions.map((q, qIdx) => (
                <div key={qIdx} className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="text-lg font-serif font-bold text-slate-900 dark:text-white">
                      {q.questionJp}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">{q.questionBn}</div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = selectedQuizOption === opt;
                      const isCorrect = opt === q.correctAnswer;
                      let btnStyle =
                        'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700';

                      if (isQuizSubmitted) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-600 text-white font-bold ring-2 ring-emerald-500/50';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'bg-rose-600 text-white font-bold ring-2 ring-rose-500/50';
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={isQuizSubmitted}
                          onClick={() => handleQuizAnswer(opt)}
                          className={`p-3.5 rounded-xl font-serif text-base transition-all flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isQuizSubmitted && isCorrect && <Check className="w-4 h-4" />}
                          {isQuizSubmitted && isSelected && !isCorrect && <X className="w-4 h-4" />}
                        </button>
                      );
                    })}
                  </div>

                  {isQuizSubmitted && (
                    <div
                      className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed border ${
                        selectedQuizOption === q.correctAnswer
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300'
                          : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-300'
                      }`}
                    >
                      <div className="font-bold mb-1">
                        {selectedQuizOption === q.correctAnswer ? '🎉 চমৎকার! সঠিক উত্তর!' : '❌ ভুল হয়েছে।'}
                      </div>
                      <p>{q.explanationBn}</p>
                    </div>
                  )}

                  {isQuizSubmitted && (
                    <button
                      onClick={() => {
                        setSelectedQuizOption(null);
                        setIsQuizSubmitted(false);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300"
                    >
                      পুনরায় চেষ্টা করুন
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Tab 7: Original Guide Sheets */}
          {activeTab === 'guides' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <OriginalGuideReferenceSection
                particleId={activeParticle.id}
                particleSymbol={activeParticle.symbol}
              />
            </div>
          )}

          {/* Persistent Guide Sheet Anchor for other tabs */}
          {activeTab !== 'guides' && (
            <div className="pt-2">
              <OriginalGuideReferenceSection
                particleId={activeParticle.id}
                particleSymbol={activeParticle.symbol}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
