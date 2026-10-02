import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Trophy, Flame, Zap, Award, Sparkles, Calendar, Globe, Clock } from 'lucide-react';
import { toBengaliNumber } from '../utils/vocabCategories';

type RankingPeriod = 'global' | 'weekly' | 'monthly';

export const LeaderboardView: React.FC = () => {
  const { leaderboard, currentUser } = useApp();
  const [period, setPeriod] = useState<RankingPeriod>('global');

  // Compute live list integrating current user's actual XP
  const baseCommunityUsers = leaderboard.filter((u) => !u.isCurrentUser);

  const activeUserEntry = {
    id: currentUser?.id || 'current-user',
    name: currentUser?.name ? `${currentUser.name} (আপনি)` : 'আপনি (You)',
    email: '',
    avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces',
    xp: currentUser?.stats?.xp || 0,
    streak: currentUser?.stats?.streak || 0,
    level: currentUser?.stats?.level || 1,
    completedLessons: currentUser?.stats?.completedLessons?.length || 0,
    badge: (currentUser?.stats?.xp || 0) >= 3000 ? '🥇 ডায়মন্ড লিগ' : (currentUser?.stats?.xp || 0) >= 1500 ? '🥈 গোল্ড লিগ' : '🥉 সিলভার লিগ',
    isCurrentUser: true,
  };

  // Adjust XP multiplier based on ranking period for realistic community competition
  const processedList = [...baseCommunityUsers, activeUserEntry].map((u) => {
    if (u.isCurrentUser) {
      if (period === 'weekly') {
        return { ...u, periodXp: Math.min(u.xp, Math.round(u.xp * 0.45)) };
      }
      if (period === 'monthly') {
        return { ...u, periodXp: Math.min(u.xp, Math.round(u.xp * 0.75)) };
      }
      return { ...u, periodXp: u.xp };
    } else {
      if (period === 'weekly') {
        return { ...u, periodXp: Math.round(u.xp * 0.35) };
      }
      if (period === 'monthly') {
        return { ...u, periodXp: Math.round(u.xp * 0.70) };
      }
      return { ...u, periodXp: u.xp };
    }
  });

  const sorted = processedList.sort((a, b) => b.periodXp - a.periodXp);
  const myRank = sorted.findIndex((u) => u.isCurrentUser) + 1;
  const mySortedEntry = sorted.find((u) => u.isCurrentUser) || sorted[0];

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Header Banner - Glassmorphism */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden shadow-lg">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-bold uppercase tracking-widest mb-2 px-3 py-1 rounded-full glass-card border border-indigo-500/20">
            <Trophy className="w-3.5 h-3.5" />
            <span>COMMUNITY LEADERBOARD • লিডারবোর্ড</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            🏆 শিক্ষার্থী র‍্যাঙ্কিং লিগ
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
            লেসন সম্পন্ন করে, শব্দার্থ ও কানজি আয়ত্ত করে এবং নিয়মিত অনুশীলনে XP অর্জন করে লিডারবোর্ডে এগিয়ে থাকুন।
          </p>
        </div>

        <div className="glass-card border border-slate-200/80 dark:border-white/10 px-5 py-4 rounded-2xl shrink-0 text-center sm:text-right relative z-10 shadow-sm">
          <p className="text-[11px] text-slate-400 uppercase font-mono font-bold">আপনার বর্তমান অবস্থান</p>
          <div className="flex items-baseline justify-center sm:justify-end gap-1.5 mt-0.5">
            <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400 font-mono">#{toBengaliNumber(myRank)}</span>
            <span className="text-xs text-slate-400 font-medium">/ {toBengaliNumber(sorted.length)}</span>
          </div>
          <span className="text-xs font-mono text-slate-600 dark:text-slate-300 block mt-0.5 font-bold">
            {toBengaliNumber(mySortedEntry?.periodXp?.toLocaleString() || 0)} XP
          </span>
        </div>
      </div>

      {/* Period Tabs */}
      <div className="flex items-center justify-center sm:justify-start gap-2 p-1.5 rounded-2xl glass-card w-fit border border-slate-200/70 dark:border-white/10 shadow-sm">
        <button
          onClick={() => setPeriod('global')}
          className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            period === 'global'
              ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>সার্বিক (Global)</span>
        </button>

        <button
          onClick={() => setPeriod('weekly')}
          className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            period === 'weekly'
              ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>সাপ্তাহিক (Weekly)</span>
        </button>

        <button
          onClick={() => setPeriod('monthly')}
          className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            period === 'monthly'
              ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>মাসিক (Monthly)</span>
        </button>
      </div>

      {/* Podium Top 3 */}
      <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-4 pb-2 items-end">
        {/* 2nd place */}
        {sorted[1] && (
          <div className="flex flex-col items-center p-4 rounded-3xl glass-card text-center border border-slate-200/80 dark:border-white/10 shadow-sm">
            <span className="text-2xl mb-1">🥈</span>
            <img
              src={sorted[1].avatar}
              alt={sorted[1].name}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover ring-3 ring-slate-300 dark:ring-slate-600 shadow"
            />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mt-2 truncate max-w-full">
              {sorted[1].name}
            </h4>
            <p className="text-xs font-black text-indigo-600 dark:text-indigo-400 font-mono mt-0.5">
              {toBengaliNumber(sorted[1].periodXp.toLocaleString())} XP
            </p>
            <span className="text-[10px] text-slate-400 mt-0.5">২য় স্থান</span>
          </div>
        )}

        {/* 1st place (taller, highlighted) */}
        {sorted[0] && (
          <div className="flex flex-col items-center p-5 rounded-3xl glass-panel border-2 border-amber-400/60 dark:border-amber-400/40 shadow-xl text-center relative -translate-y-2">
            <span className="text-3xl mb-1">👑 🥇</span>
            <img
              src={sorted[0].avatar}
              alt={sorted[0].name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-4 ring-amber-400 shadow-md"
            />
            <h4 className="font-black text-sm sm:text-base text-slate-900 dark:text-white mt-2 truncate max-w-full">
              {sorted[0].name}
            </h4>
            <p className="text-xs sm:text-sm font-black text-amber-600 dark:text-amber-400 font-mono mt-0.5">
              {toBengaliNumber(sorted[0].periodXp.toLocaleString())} XP
            </p>
            <span className="text-[10px] font-bold px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white mt-1.5 shadow-sm">
              ১ম স্থান • চ্যাম্পিয়ন
            </span>
          </div>
        )}

        {/* 3rd place */}
        {sorted[2] && (
          <div className="flex flex-col items-center p-4 rounded-3xl glass-card text-center border border-slate-200/80 dark:border-white/10 shadow-sm">
            <span className="text-2xl mb-1">🥉</span>
            <img
              src={sorted[2].avatar}
              alt={sorted[2].name}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover ring-3 ring-amber-700/40 shadow"
            />
            <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mt-2 truncate max-w-full">
              {sorted[2].name}
            </h4>
            <p className="text-xs font-black text-indigo-600 dark:text-indigo-400 font-mono mt-0.5">
              {toBengaliNumber(sorted[2].periodXp.toLocaleString())} XP
            </p>
            <span className="text-[10px] text-slate-400 mt-0.5">৩য় স্থান</span>
          </div>
        )}
      </div>

      {/* Full Ranking List */}
      <div className="p-4 rounded-3xl glass-panel space-y-2 shadow-sm">
        {sorted.map((user, idx) => (
          <div
            key={user.id}
            className={`flex items-center justify-between p-3.5 rounded-2xl transition-all ${
              user.isCurrentUser
                ? 'glass-card border-2 border-indigo-500/70 shadow-sm bg-indigo-500/5'
                : 'hover:bg-slate-100/40 dark:hover:bg-white/5'
            }`}
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <span className="w-6 text-center font-bold text-sm text-slate-400 font-mono">
                #{toBengaliNumber(idx + 1)}
              </span>
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-200 dark:ring-white/10"
              />
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  {user.name}
                </h4>
                <div className="flex items-center space-x-2 text-[11px] text-slate-500 dark:text-slate-400">
                  <span>লেভেল {toBengaliNumber(user.level)}</span>
                  <span>•</span>
                  <span>{user.badge}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 sm:space-x-6">
              <div className="flex items-center space-x-1 text-xs text-amber-500 font-semibold">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>{toBengaliNumber(user.streak)} দিন</span>
              </div>
              <div className="text-right">
                <span className="font-black text-sm sm:text-base text-slate-900 dark:text-white font-mono">
                  {toBengaliNumber(user.periodXp.toLocaleString())}
                </span>
                <span className="text-[10px] text-slate-400 ml-1 font-mono font-bold">XP</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
