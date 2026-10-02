import React, { useState, useEffect } from 'react';
import { detailedParticlesList } from '../../data/particlesResearchData';
import { soundFx } from '../../utils/audio';
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Bookmark,
  Share2,
  Printer
} from 'lucide-react';

interface Props {
  onSelectParticle: (particleId: string) => void;
}

export const ParticleProgressView: React.FC<Props> = ({ onSelectParticle }) => {
  // Mastery status per particle stored in localStorage
  const [masteryMap, setMasteryMap] = useState<Record<string, 'mastered' | 'learning' | 'not_started'>>(() => {
    try {
      const saved = localStorage.getItem('nihonova_particle_mastery');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    // Default initial mock statuses
    const initial: Record<string, 'mastered' | 'learning' | 'not_started'> = {};
    detailedParticlesList.forEach((p, idx) => {
      if (idx < 4) initial[p.id] = 'mastered';
      else if (idx < 10) initial[p.id] = 'learning';
      else initial[p.id] = 'not_started';
    });
    return initial;
  });

  useEffect(() => {
    try {
      localStorage.setItem('nihonova_particle_mastery', JSON.stringify(masteryMap));
    } catch (e) {
      // ignore
    }
  }, [masteryMap]);

  const toggleStatus = (id: string) => {
    soundFx.playClick();
    setMasteryMap((prev) => {
      const current = prev[id] || 'not_started';
      const next =
        current === 'not_started'
          ? 'learning'
          : current === 'learning'
          ? 'mastered'
          : 'not_started';
      return { ...prev, [id]: next };
    });
  };

  const masteredCount = Object.values(masteryMap).filter((s) => s === 'mastered').length;
  const learningCount = Object.values(masteryMap).filter((s) => s === 'learning').length;
  const totalCount = detailedParticlesList.length;
  const progressPercent = Math.round((masteredCount / totalCount) * 100);

  return (
    <div className="space-y-6">
      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center font-black">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {masteredCount} / {totalCount}
            </div>
            <div className="text-xs text-slate-500 font-medium">আয়ত্তে এসেছে (Mastered)</div>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center font-black">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {learningCount}
            </div>
            <div className="text-xs text-slate-500 font-medium">অনুশীলন চলছে (In Progress)</div>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center font-black">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {progressPercent}%
            </div>
            <div className="text-xs text-slate-500 font-medium">সামগ্রিক প্রস্তুতি (Total Mastery)</div>
          </div>
        </div>
      </div>

      {/* Recommended Focus Alert */}
      <div className="p-5 rounded-3xl bg-indigo-50/80 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold text-sm">
            <Sparkles className="w-4 h-4" />
            <span>স্মার্ট রিভিশন সুপারিশ</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            শিক্ষার্থীদের সবচেয়ে বেশি দ্বিধায় ফেলে <strong className="text-slate-900 dark:text-white">は vs が</strong> এবং <strong className="text-slate-900 dark:text-white">に vs で</strong> এর ব্যবহার। এগুলো রিভিশন দিতে প্রস্তুত?
          </p>
        </div>
        <button
          onClick={() => onSelectParticle('particle-wa')}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm flex items-center gap-1.5 whitespace-nowrap self-start sm:self-auto"
        >
          <span>রিভিশন শুরু করুন</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Particle Mastery Checklist */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/20 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              পার্টিকেল মাস্টারি চেকলিস্ট
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              যেকোনো পার্টিকেলে ক্লিক করে তার স্ট্যাটাস পরিবর্তন করুন (⚪ শুরু হয়নি ➔ 🟡 অনুশীলন চলছে ➔ 🟢 আয়ত্তে এসেছে)।
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {detailedParticlesList.map((p) => {
            const status = masteryMap[p.id] || 'not_started';
            return (
              <div
                key={p.id}
                className="p-3.5 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3 hover:border-indigo-300 transition-all"
              >
                <div
                  onClick={() => onSelectParticle(p.id)}
                  className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-serif font-black text-lg flex items-center justify-center shrink-0">
                    {p.symbol}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-sm text-slate-900 dark:text-white truncate">
                      {p.symbol} ({p.romaji})
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">{p.primaryFunctionBn}</div>
                  </div>
                </div>

                <button
                  onClick={() => toggleStatus(p.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border shrink-0 ${
                    status === 'mastered'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800'
                      : status === 'learning'
                      ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-800'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {status === 'mastered' && '🟢 সম্পন্ন'}
                  {status === 'learning' && '🟡 চলছে'}
                  {status === 'not_started' && '⚪ বাকি'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
