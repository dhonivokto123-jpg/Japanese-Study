import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, CheckCircle2, Lock, Zap, Sparkles } from 'lucide-react';
import { toBengaliNumber } from '../utils/vocabCategories';

export const AchievementsView: React.FC = () => {
  const { achievements } = useApp();

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel relative overflow-hidden shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-bold uppercase tracking-widest mb-2 px-3 py-1 rounded-full glass-card border border-indigo-500/20">
            <Award className="w-3.5 h-3.5" />
            <span>গ্যামিফিকেশন ও বিশেষ ব্যাজ</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            🏅 ব্যাজ ও অর্জনসমূহ (Achievements)
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl">
            লেসন সম্পন্ন করুন, স্ট্রিক বজায় রাখুন এবং অনন্য জাপানি সামুরাই ব্যাজগুলো আনলক করে বিশেষ XP অর্জন করুন।
          </p>
        </div>

        <div className="glass-card border border-slate-200/80 dark:border-white/10 px-5 py-4 rounded-2xl shrink-0 text-center sm:text-right relative z-10 shadow-sm">
          <p className="text-xs text-slate-400 font-semibold font-mono">অর্জিত ব্যাজ</p>
          <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
            {toBengaliNumber(unlockedCount)} / {toBengaliNumber(achievements.length)}
          </p>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((item) => {
          const progressPct = Math.min(100, Math.round((item.progress / item.maxProgress) * 100));
          return (
            <div
              key={item.id}
              className={`p-5 sm:p-6 rounded-3xl transition-all flex flex-col justify-between space-y-4 shadow-sm ${
                item.unlocked
                  ? 'glass-card border-2 border-emerald-500/30 dark:border-emerald-500/30'
                  : 'glass-panel opacity-80'
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm ${
                      item.unlocked
                        ? 'bg-amber-500/15 border border-amber-500/30'
                        : 'glass-card'
                    }`}
                  >
                    {item.icon}
                  </div>

                  <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>+{toBengaliNumber(item.xpReward)} XP</span>
                  </div>
                </div>

                <div className="mt-3.5 space-y-1">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
                    <span>{item.titleBn}</span>
                    {item.unlocked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                    {item.descriptionBn}
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5 font-mono">
                  <span>অগ্রগতি</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    {toBengaliNumber(item.progress)} / {toBengaliNumber(item.maxProgress)} ({toBengaliNumber(progressPct)}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.unlocked
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                        : 'bg-gradient-to-r from-indigo-500 to-violet-500'
                    }`}
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
