import React, { useState } from 'react';
import { ParticleLearnView } from './particles/ParticleLearnView';
import { ParticleComparisonView } from './particles/ParticleComparisonView';
import { ParticleExploreView } from './particles/ParticleExploreView';
import { ParticleLabView } from './particles/ParticleLabView';
import { ParticleChallengeView } from './particles/ParticleChallengeView';
import { ParticleProgressView } from './particles/ParticleProgressView';
import { ParticleOriginalGuidesGallery } from './particles/ParticleOriginalGuidesGallery';
import { soundFx } from '../utils/audio';
import {
  BookOpen,
  Scale,
  Compass,
  FlaskConical,
  Zap,
  TrendingUp,
  Sparkles,
  Atom,
  FileText
} from 'lucide-react';

export const ParticlesResearchView: React.FC = () => {
  const [activeMainTab, setActiveMainTab] = useState<
    'learn' | 'guides' | 'compare' | 'explore' | 'lab' | 'challenge' | 'progress'
  >('learn');

  const [initialLabParticle, setInitialLabParticle] = useState<string | null>(null);

  const handleTabChange = (
    tab: 'learn' | 'guides' | 'compare' | 'explore' | 'lab' | 'challenge' | 'progress'
  ) => {
    setActiveMainTab(tab);
    soundFx.playClick();
  };

  const handleOpenLabWithParticle = (symbol: string) => {
    setInitialLabParticle(symbol);
    setActiveMainTab('lab');
    soundFx.playClick();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Main Research Center Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/20 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/40">
              <Atom className="w-4 h-4 text-indigo-500 animate-spin-slow" />
              <span>JAPANESE PARTICLE RESEARCH CENTER (助詞ラボ)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              জাপানি পার্টিকেল গবেষণা কেন্দ্র 🔬🇯🇵
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              বাঙালি শিক্ষার্থীদের জন্য তৈরি নিবিড় গবেষণাভিত্তিক লার্নিং হাব। শুধু বাংলা অর্থ মুখস্থ নয়—পার্টিকেলের ব্যাকরণগত ভূমিকা, ২০টি মূল গাইড শিট, ডিসিশন ট্রি, সূক্ষ্ম তুলনা ও ইন্টারেক্টিভ ল্যাবের মাধ্যমে অর্জন করুন পূর্ণ দক্ষতা।
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-[11px] font-bold text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              <span>২০টি মূল গাইড শিট</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              ১৬+ মৌলিক পার্টিকেল
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
              ৮টি দ্বৈত তুলনা
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              ৬০s স্পিড চ্যালেঞ্জ
            </div>
          </div>
        </div>

        {/* Primary Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-slate-200/80 dark:border-slate-800 overflow-x-auto pb-1">
          {[
            { id: 'learn', label: '📚 শিখুন (Learn)', icon: BookOpen },
            { id: 'guides', label: '🖼 ২০টি মূল গাইড (Original Guides)', icon: FileText },
            { id: 'compare', label: '⚖️ তুলনা (Compare)', icon: Scale },
            { id: 'explore', label: '🔬 এক্সপ্লোর (Explore)', icon: Compass },
            { id: 'lab', label: '🧪 ল্যাব (Practice)', icon: FlaskConical },
            { id: 'challenge', label: '🎯 চ্যালেঞ্জ (Speed 60s)', icon: Zap },
            { id: 'progress', label: '📊 অগ্রগতি (Mastery)', icon: TrendingUp },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeMainTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as any)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 scale-[1.02]'
                    : 'bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Tab Content Routing */}
      <div className="transition-all duration-200">
        {activeMainTab === 'learn' && (
          <ParticleLearnView onSelectParticleForLab={handleOpenLabWithParticle} />
        )}

        {activeMainTab === 'guides' && <ParticleOriginalGuidesGallery />}

        {activeMainTab === 'compare' && <ParticleComparisonView />}

        {activeMainTab === 'explore' && <ParticleExploreView />}

        {activeMainTab === 'lab' && (
          <ParticleLabView initialParticleFilter={initialLabParticle} />
        )}

        {activeMainTab === 'challenge' && <ParticleChallengeView />}

        {activeMainTab === 'progress' && (
          <ParticleProgressView onSelectParticle={() => setActiveMainTab('learn')} />
        )}
      </div>
    </div>
  );
};
