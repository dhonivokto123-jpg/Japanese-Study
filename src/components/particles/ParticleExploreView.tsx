import React, { useState } from 'react';
import {
  particleDecisionTrees,
  analyzerPresetSentences,
  timeParticlesTimeline,
  visualParticleStories
} from '../../data/particleToolsData';
import { playJapaneseAudio, soundFx } from '../../utils/audio';
import {
  GitBranch,
  Search,
  Volume2,
  Clock,
  Sparkles,
  ArrowRight,
  RotateCcw,
  BookOpen,
  HelpCircle,
  Compass,
  Layers,
  ChevronRight
} from 'lucide-react';

export const ParticleExploreView: React.FC = () => {
  const [subTab, setSubTab] = useState<'tree' | 'analyzer' | 'timeline' | 'stories'>('tree');

  // Decision Tree State
  const [currentStepId, setCurrentStepId] = useState<string>('start');
  const [treeHistory, setTreeHistory] = useState<string[]>(['start']);

  // Sentence Analyzer State
  const [selectedPresetId, setSelectedPresetId] = useState<string>(analyzerPresetSentences[0].id);
  const [activeTokenIdx, setActiveTokenIdx] = useState<number | null>(1); // default select first particle

  // Custom Sentence Analyzer
  const [customInput, setCustomInput] = useState<string>('');

  const currentTreeNode = particleDecisionTrees[currentStepId] || particleDecisionTrees['start'];
  const activeAnalyzedSentence =
    analyzerPresetSentences.find((s) => s.id === selectedPresetId) || analyzerPresetSentences[0];

  const handleTreeOptionClick = (option: any) => {
    soundFx.playClick();
    if (option.nextStepId) {
      setCurrentStepId(option.nextStepId);
      setTreeHistory((prev) => [...prev, option.nextStepId]);
    }
  };

  const handleTreeReset = () => {
    soundFx.playClick();
    setCurrentStepId('start');
    setTreeHistory(['start']);
  };

  const handleAudio = (text: string) => {
    playJapaneseAudio(text);
  };

  return (
    <div className="space-y-6">
      {/* Sub Navigation Bar */}
      <div className="glass-card p-2 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto">
        {[
          { id: 'tree', label: '🌲 ডিসিশন ট্রি উইজার্ড', icon: GitBranch },
          { id: 'analyzer', label: '🔍 বাক্য বিশ্লেষক (Analyzer)', icon: Search },
          { id: 'timeline', label: '⏰ সময় পার্টিকেল টাইমলাইন', icon: Clock },
          { id: 'stories', label: '🎨 ভিজ্যুয়াল মেটাফর ও স্টোরি', icon: Sparkles },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = subTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setSubTab(tab.id as any);
                soundFx.playClick();
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. Decision Tree Wizard */}
      {subTab === 'tree' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/20 shadow-xl space-y-6 animate-in fade-in duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/40 mb-2">
                <GitBranch className="w-3.5 h-3.5" />
                <span>INTERACTIVE PARTICLE DECISION TREE</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                পার্টিকেল নির্ধারণের ইন্টারেক্টিভ রোডম্যাপ
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                কোন পরিস্থিতিতে কোন পার্টিকেল বসবে তা বুঝতে কয়েকটি সহজ প্রশ্নের উত্তর দিন।
              </p>
            </div>

            <button
              onClick={handleTreeReset}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1.5 transition-all self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>শুরু থেকে শুরু করুন</span>
            </button>
          </div>

          {/* Current Question Block */}
          <div className="p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              প্রশ্ন (Question)
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {currentTreeNode.questionBn}
            </h3>
            {currentTreeNode.descriptionBn && (
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                {currentTreeNode.descriptionBn}
              </p>
            )}
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              উপযুক্ত অপশনটি নির্বাচন করুন:
            </div>
            <div className="grid grid-cols-1 gap-3">
              {currentTreeNode.options.map((option, idx) => {
                const isConclusion = !!option.resultParticle;
                return (
                  <div
                    key={idx}
                    onClick={() => handleTreeOptionClick(option)}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      isConclusion
                        ? 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/40 shadow-sm'
                        : 'glass-card border-slate-200/80 dark:border-slate-800 hover:border-indigo-400 hover:shadow-md'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{option.labelBn}</span>
                      </div>
                      {option.explanationBn && (
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {option.explanationBn}
                        </p>
                      )}
                      {option.exampleJp && (
                        <div className="text-xs font-serif font-bold text-emerald-700 dark:text-emerald-400 pt-1 flex items-center gap-2">
                          <span>উদাহরণ: {option.exampleJp}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAudio(option.exampleJp);
                            }}
                            className="p-1 text-slate-400 hover:text-emerald-600"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {isConclusion ? (
                      <div className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-serif font-black text-lg sm:text-xl shadow-md flex items-center gap-2 shrink-0 self-start sm:self-auto">
                        <span>{option.resultParticle}</span>
                        <Sparkles className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shrink-0 self-end sm:self-auto">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 2. Sentence Analyzer */}
      {subTab === 'analyzer' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/20 shadow-xl space-y-6 animate-in fade-in duration-150">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-5 space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/40">
              <Search className="w-3.5 h-3.5" />
              <span>JAPANESE SENTENCE PARTICLE ANALYZER</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              জাপানি বাক্য বিশ্লেষক ও পার্টিকেল স্ক্যানার
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              বাক্যের প্রতিটি পার্টিকেল ক্লিক করে তার ব্যাকরণগত ভূমিকা ও অর্থ দেখুন।
            </p>
          </div>

          {/* Preset Sentence Chooser */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              নমুনা বাক্য বেছে নিন:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {analyzerPresetSentences.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    setSelectedPresetId(preset.id);
                    setActiveTokenIdx(null);
                    soundFx.playClick();
                  }}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    selectedPresetId === preset.id
                      ? 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-500 ring-1 ring-indigo-500/30'
                      : 'glass-card border-slate-200/80 dark:border-slate-800 hover:border-indigo-300'
                  }`}
                >
                  <div className="font-serif font-bold text-sm text-slate-900 dark:text-white truncate">
                    {preset.sentenceJp}
                  </div>
                  <div className="text-xs text-slate-500 truncate mt-0.5">{preset.meaningBn}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Active Sentence Interactive Stage */}
          <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                বাক্যের শব্দ ও পার্টিকেলসমূহ (ক্লিক করুন):
              </span>
              <button
                onClick={() => handleAudio(activeAnalyzedSentence.sentenceJp)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 flex items-center gap-1.5 transition-all"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>পুরো বাক্য শুনুন</span>
              </button>
            </div>

            {/* Interactive Tokens */}
            <div className="flex flex-wrap items-center gap-2 text-base sm:text-xl font-serif p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              {activeAnalyzedSentence.tokens.map((token, idx) => {
                const isSelected = activeTokenIdx === idx;
                if (!token.isParticle) {
                  return (
                    <span key={idx} className="text-slate-800 dark:text-slate-200 font-medium px-1">
                      {token.text}
                    </span>
                  );
                }

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveTokenIdx(idx);
                      soundFx.playClick();
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold font-serif transition-all shadow-sm ${
                      isSelected
                        ? 'bg-rose-600 text-white scale-110 ring-4 ring-rose-500/30'
                        : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800 hover:scale-105'
                    }`}
                  >
                    {token.text}
                  </button>
                );
              })}
            </div>

            <div className="text-xs text-slate-500 font-mono">
              পড়ার নিয়ম: {activeAnalyzedSentence.reading}
            </div>
            <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
              বাংলা ভাবার্থ: {activeAnalyzedSentence.meaningBn}
            </div>
          </div>

          {/* Active Token Detail Card */}
          {activeTokenIdx !== null && activeAnalyzedSentence.tokens[activeTokenIdx] && (
            <div className="p-5 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-2 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-serif font-black text-lg flex items-center justify-center">
                    {activeAnalyzedSentence.tokens[activeTokenIdx].particleSymbol ||
                      activeAnalyzedSentence.tokens[activeTokenIdx].text}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      পার্টিকেল: {activeAnalyzedSentence.tokens[activeTokenIdx].roleBn}
                    </h4>
                    <span className="text-xs text-slate-500 font-mono">
                      {activeAnalyzedSentence.tokens[activeTokenIdx].roleEn}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
                {activeAnalyzedSentence.tokens[activeTokenIdx].explanationBn}
              </p>
            </div>
          )}
        </div>
      )}

      {/* 3. Time Particle Timeline */}
      {subTab === 'timeline' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/20 shadow-xl space-y-6 animate-in fade-in duration-150">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-5 space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/40">
              <Clock className="w-3.5 h-3.5" />
              <span>TIME PARTICLES VISUAL TIMELINE</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              সময়বাচক পার্টিকেলসমূহের টাইমলাইন (に / から / まで / までに)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              ঘড়ির সময়, সূচনা, সমাপ্তি ও ডেডলাইনের মধ্যকার স্পষ্ট সময়রেখা।
            </p>
          </div>

          <div className="space-y-4">
            {timeParticlesTimeline.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 space-y-3 hover:border-indigo-300 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                      {item.timeLabel}
                    </span>
                    <span className="text-lg font-black font-serif text-slate-900 dark:text-white">
                      {item.particle}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {item.particleBn}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {item.usageBn}
                </p>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-2">
                  <div>
                    <div className="font-serif font-bold text-sm text-slate-900 dark:text-white">
                      {item.exampleJp}
                    </div>
                    <div className="text-xs text-slate-500">{item.exampleBn}</div>
                  </div>
                  <button
                    onClick={() => handleAudio(item.exampleJp)}
                    className="p-2 rounded-xl bg-white dark:bg-slate-800 text-indigo-600 shadow-sm hover:scale-105"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Visual Stories & Metaphors */}
      {subTab === 'stories' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            পার্টিকেল মনে রাখার দৃষ্টিনন্দন রূপক ও গল্প
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(visualParticleStories).map(([key, story]) => (
              <div
                key={key}
                className="p-6 rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-sm hover:border-indigo-300 transition-all"
              >
                <div className="flex items-center gap-2 font-bold text-base text-slate-900 dark:text-white">
                  <span>{story.titleBn}</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 text-white font-mono text-center text-xs sm:text-sm shadow-inner border border-slate-700">
                  {story.diagram}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  <strong className="text-indigo-600 dark:text-indigo-400">রূপক: </strong>
                  {story.metaphor}
                </p>

                <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 text-xs text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/40">
                  {story.explanationBn}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
