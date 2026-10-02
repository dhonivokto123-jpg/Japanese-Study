import React from 'react';
import { useApp } from '../context/AppContext';
import { lessonsList, lessonsData } from '../data/lessonsData';
import { allN5Vocabulary } from '../data/allVocabularyData';
import { n5KanjiList } from '../data/kanjiList';
import { speakJapanese } from '../utils/audio';
import {
  Flame,
  Zap,
  BookOpen,
  Award,
  Play,
  ArrowRight,
  Bookmark,
  Languages,
  FileText,
  Target,
  Sparkles,
  Volume2,
  Layers,
  CheckCircle2,
  Clock,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    currentUser,
    setActiveTab,
    setActiveLessonId,
    setActiveLessonSection,
    leaderboard,
    achievements,
  } = useApp();

  const completedLessons = currentUser?.stats.completedLessons || [];
  const completedCount = completedLessons.length;
  const progressPct = Math.round((completedCount / 25) * 100);

  // Determine next uncompleted lesson
  const uncompleted = lessonsList.find((l) => !completedLessons.includes(l.id));
  const nextLessonId = uncompleted ? uncompleted.id : (completedLessons.length ? 25 : 1);
  const nextLesson = lessonsData[nextLessonId]?.summary || lessonsList[0];

  const handleStartLesson = (lessonId: number, section = 'rules') => {
    setActiveLessonId(lessonId);
    setActiveLessonSection(section);
    setActiveTab('lesson-detail');
  };

  // Real statistics
  const vocabLearned = currentUser?.stats.learnedVocabIds.length || 0;
  const totalVocab = allN5Vocabulary.length;

  const kanjiMastered = currentUser?.stats.masteredKanjiIds.length || 0;
  const totalKanji = n5KanjiList.length;

  const grammarMastered = currentUser?.stats.completedGrammarIds.length || 0;
  const totalGrammar = Object.values(lessonsData).reduce(
    (acc, l) => acc + (l.grammarRules?.length || 0),
    0
  );

  const userStreak = currentUser?.stats.streak || 1;
  const userXp = currentUser?.stats.xp || 0;
  const userLevel = currentUser?.stats.level || 1;

  // Real sample vocabulary highlights
  const sampleHighlights = allN5Vocabulary.slice(0, 6);

  // Recent unlocked achievements
  const unlockedAchievements = achievements.filter((a) => a.unlockedAt).slice(0, 3);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* 12-Column Glass Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Columns: Hero Workspace, Metrics, Hub, Highlights */}
        <div className="lg:col-span-8 space-y-6">
          {/* =========================================================================
             CONTINUE LEARNING HERO CARD (Floating Glass Workspace)
             ========================================================================= */}
          <div className="glass-card relative overflow-hidden rounded-3xl p-6 sm:p-8 border border-white/80 dark:border-white/10 shadow-lg group">
            {/* Ambient subtle gradient bloom */}
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-transparent blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-widest mb-2 font-bold">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>CONTINUE STUDY · বর্তমান সিলেবাস</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black mb-2.5 tracking-tight text-slate-900 dark:text-white">
                Lesson {nextLesson.id}: {nextLesson.titleBn}
              </h1>

              <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-xl text-xs sm:text-sm leading-relaxed">
                {nextLesson.descriptionBn ||
                  'N5 ব্যাকরণ নিয়মাবলী, শব্দভাণ্ডার ও কানজি অনুশীলন করে পরবর্তী স্তরে উন্নীত হোন।'}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleStartLesson(nextLesson.id, 'rules')}
                  className="glass-btn-primary font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm flex items-center space-x-2 cursor-pointer shadow-md"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>লেসন শুরু করুন</span>
                </button>
                <button
                  onClick={() => handleStartLesson(nextLesson.id, 'quiz')}
                  className="glass-btn-secondary font-semibold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all cursor-pointer"
                >
                  কুইজ টেস্ট
                </button>
                <button
                  onClick={() => setActiveTab('lessons')}
                  className="px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors ml-auto flex items-center gap-1"
                >
                  <span>সব লেসন দেখুন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Subtle Watermark Kanji */}
            <div className="text-8xl sm:text-9xl opacity-5 dark:opacity-10 font-serif font-black absolute -right-3 -bottom-8 pointer-events-none select-none text-indigo-900 dark:text-white">
              学
            </div>
          </div>

          {/* =========================================================================
             4 FLOATING GLASS METRIC CARDS (Streak, XP, Vocab, Kanji)
             ========================================================================= */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {/* Card 1: Streak */}
            <div className="glass-card glass-card-hover p-4 rounded-2xl border border-amber-500/20 dark:border-amber-400/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase font-bold text-amber-600 dark:text-amber-400">
                  Daily Streak
                </span>
                <span className="text-base animate-bounce">🔥</span>
              </div>
              <div className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                {userStreak} <span className="text-xs font-medium text-slate-500">দিন</span>
              </div>
              <div className="mt-2 text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>ধারাবাহিকতা অটুট রাখুন</span>
              </div>
            </div>

            {/* Card 2: XP */}
            <div className="glass-card glass-card-hover p-4 rounded-2xl border border-indigo-500/20 dark:border-indigo-400/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase font-bold text-indigo-600 dark:text-indigo-400">
                  Total XP
                </span>
                <Zap className="w-4 h-4 text-indigo-500 fill-indigo-500" />
              </div>
              <div className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                {userXp}
              </div>
              <div className="mt-2 text-[10px] text-slate-500 dark:text-slate-400">
                লেভেল {userLevel} শিক্ষার্থী
              </div>
            </div>

            {/* Card 3: Vocabulary */}
            <div
              onClick={() => setActiveTab('vocab')}
              className="glass-card glass-card-hover p-4 rounded-2xl border border-emerald-500/20 dark:border-emerald-400/20 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase font-bold text-emerald-600 dark:text-emerald-400">
                  Vocabulary
                </span>
                <Bookmark className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                {vocabLearned}<span className="text-xs font-normal text-slate-400">/{totalVocab}</span>
              </div>
              <div className="w-full bg-slate-200/80 dark:bg-slate-800/80 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.round((vocabLearned / totalVocab) * 100))}%` }}
                />
              </div>
            </div>

            {/* Card 4: Kanji */}
            <div
              onClick={() => setActiveTab('kanji')}
              className="glass-card glass-card-hover p-4 rounded-2xl border border-violet-500/20 dark:border-violet-400/20 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase font-bold text-violet-600 dark:text-violet-400">
                  Kanji Bank
                </span>
                <span className="font-serif font-black text-sm text-violet-500">漢</span>
              </div>
              <div className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                {kanjiMastered}<span className="text-xs font-normal text-slate-400">/{totalKanji}</span>
              </div>
              <div className="w-full bg-slate-200/80 dark:bg-slate-800/80 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.round((kanjiMastered / totalKanji) * 100))}%` }}
                />
              </div>
            </div>
          </div>

          {/* =========================================================================
             LEARNING MODULES HUB (Glass Quick Navigation)
             ========================================================================= */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  মডিউল ড্যাশবোর্ড (Learning Modules)
                </h2>
                <p className="text-xs text-slate-500">আপনার পাঠ্যক্রমের নির্দিষ্ট অংশে দ্রুত প্রবেশ করুন</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Card 1: Vocab Flashcard & List */}
              <button
                onClick={() => setActiveTab('vocab')}
                className="glass-card glass-card-hover p-4 rounded-2xl text-left group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500/15 to-teal-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Bookmark className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  শব্দভাণ্ডার
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  ফ্ল্যাশ কার্ড ও কুইজ
                </p>
              </button>

              {/* Card 2: 103 Kanji */}
              <button
                onClick={() => setActiveTab('kanji')}
                className="glass-card glass-card-hover p-4 rounded-2xl text-left group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500/15 to-violet-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold font-serif text-sm mb-3 group-hover:scale-110 transition-transform">
                  漢
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  কানজি মাস্টার
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  ১০৩টি N5 কানজি ড্রয়িং
                </p>
              </button>

              {/* Card 3: Grammar Guide */}
              <button
                onClick={() => setActiveTab('grammar')}
                className="glass-card glass-card-hover p-4 rounded-2xl text-left group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500/15 to-cyan-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  ব্যাকরণ রেফারেন্স
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  লেসন ১-২৫ নিয়মাবলী
                </p>
              </button>

              {/* Card 4: Audio Studio */}
              <button
                onClick={() => setActiveTab('speaking')}
                className="glass-card glass-card-hover p-4 rounded-2xl text-left group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500/15 to-pink-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Volume2 className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  অডিও স্টুডিও
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  উচ্চারণ ও শ্যাডোয়িং
                </p>
              </button>
            </div>
          </div>

          {/* =========================================================================
             AUTHENTIC VOCABULARY HIGHLIGHTS TABLE (Glass Surface)
             ========================================================================= */}
          <div className="glass-card rounded-3xl overflow-hidden border border-white/80 dark:border-white/10 shadow-sm">
            <div className="p-5 border-b border-slate-200/60 dark:border-white/10 flex justify-between items-center px-6">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                  Recent Vocabulary Highlights
                </h3>
                <p className="text-xs text-slate-500">সিলেবাসের নির্বাচিত বাস্তব শব্দার্থ ও অডিও উচ্চারণ</p>
              </div>
              <button
                onClick={() => setActiveTab('vocab')}
                className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline tracking-wider cursor-pointer"
              >
                VIEW ALL →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-100/60 dark:bg-white/5 text-[10px] text-slate-500 dark:text-slate-400 uppercase font-mono border-b border-slate-200/60 dark:border-white/10">
                  <tr>
                    <th className="px-6 py-3">Kanji/Kana</th>
                    <th className="px-6 py-3">Reading</th>
                    <th className="px-6 py-3">Bengali</th>
                    <th className="px-6 py-3">English</th>
                    <th className="px-6 py-3">Type</th>
                    <th className="px-4 py-3 text-right">Audio</th>
                  </tr>
                </thead>
                <tbody className="text-xs sm:text-sm divide-y divide-slate-200/50 dark:divide-white/5">
                  {sampleHighlights.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-indigo-500/5 dark:hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-3 font-serif font-bold text-slate-900 dark:text-white">
                        {item.word}
                      </td>
                      <td className="px-6 py-3 text-slate-600 dark:text-slate-300 font-mono text-xs">
                        {item.reading}
                      </td>
                      <td className="px-6 py-3 text-slate-900 dark:text-slate-100 font-medium">
                        {item.bengali}
                      </td>
                      <td className="px-6 py-3 text-slate-500 dark:text-slate-400">
                        {item.english}
                      </td>
                      <td className="px-6 py-3">
                        <span className="glass-pill text-[10px] font-mono px-2 py-0.5 rounded-full text-slate-600 dark:text-slate-300 uppercase">
                          {item.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => speakJapanese(item.reading || item.word)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors cursor-pointer"
                          title="উচ্চারণ শুনুন"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* =========================================================================
           RIGHT 4 COLUMNS: User Profile Snapshot, Achievements, Leaderboard
           ========================================================================= */}
        <div className="lg:col-span-4 space-y-6">
          {/* User Profile Snapshot */}
          <div className="glass-card rounded-3xl p-5 sm:p-6 border border-white/80 dark:border-white/10 space-y-4">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-serif font-black flex items-center justify-center text-lg shadow-md shrink-0">
                日
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                  {currentUser?.name || 'শিক্ষার্থী'}
                </h3>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-mono font-medium">
                  Level {userLevel} · {userXp} XP
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-200/50 dark:border-white/10">
              <div className="p-3 rounded-2xl bg-amber-500/5 dark:bg-amber-400/5 border border-amber-500/20 text-center">
                <span className="text-[10px] font-mono text-amber-700 dark:text-amber-300 uppercase font-bold block">
                  ডেইলি স্ট্রিক
                </span>
                <span className="text-lg font-black text-slate-900 dark:text-white">
                  {userStreak} দিন
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-indigo-500/5 dark:bg-indigo-400/5 border border-indigo-500/20 text-center">
                <span className="text-[10px] font-mono text-indigo-700 dark:text-indigo-300 uppercase font-bold block">
                  সম্পন্ন লেসন
                </span>
                <span className="text-lg font-black text-slate-900 dark:text-white">
                  {completedCount} / 25
                </span>
              </div>
            </div>

            {/* Quick Continue Button */}
            <button
              onClick={() => handleStartLesson(nextLessonId, 'rules')}
              className="w-full py-2.5 px-4 rounded-xl glass-btn-primary font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>লেসন {nextLessonId} পড়ুন</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Recent Achievements Panel */}
          <div className="glass-card rounded-3xl p-5 border border-white/80 dark:border-white/10 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/50 dark:border-white/10">
              <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <Award className="w-4 h-4 text-amber-500" />
                <span>অর্জিত ব্যাজসমূহ</span>
              </div>
              <button
                onClick={() => setActiveTab('achievements')}
                className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline cursor-pointer"
              >
                সব দেখুন
              </button>
            </div>

            <div className="space-y-2">
              {unlockedAchievements.length > 0 ? (
                unlockedAchievements.map((ach) => (
                  <div
                    key={ach.id}
                    className="flex items-center space-x-3 p-2.5 rounded-2xl bg-white/40 dark:bg-white/5 border border-slate-200/60 dark:border-white/5"
                  >
                    <span className="text-xl">{ach.icon}</span>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {ach.titleBn}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate">
                        +{ach.xpReward} XP অর্জন
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 text-center py-3">
                  লেসন সম্পন্ন করে ব্যাজ অর্জন করুন!
                </p>
              )}
            </div>
          </div>

          {/* Clean Glass Leaderboard */}
          <div className="glass-card rounded-3xl p-5 border border-white/80 dark:border-white/10 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/50 dark:border-white/10">
              <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span>সাপ্তাহিক র‍্যাঙ্কিং</span>
              </div>
              <button
                onClick={() => setActiveTab('leaderboard')}
                className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline cursor-pointer"
              >
                সব দেখুন
              </button>
            </div>

            <div className="space-y-2">
              {leaderboard.slice(0, 5).map((user, index) => {
                const isFirst = index === 0;
                const isSecond = index === 1;
                const isThird = index === 2;
                return (
                  <div
                    key={user.id}
                    className={`flex items-center justify-between p-2.5 rounded-2xl border transition-all ${
                      user.isCurrentUser
                        ? 'bg-gradient-to-r from-indigo-500/15 to-violet-500/15 border-indigo-500/30 text-indigo-950 dark:text-white font-bold shadow-xs'
                        : 'bg-white/40 dark:bg-white/5 border-slate-200/50 dark:border-white/5 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className={`w-5 text-xs font-mono font-black ${
                        isFirst ? 'text-amber-500' : isSecond ? 'text-slate-400' : isThird ? 'text-amber-700' : 'text-slate-400'
                      }`}>
                        #{index + 1}
                      </span>
                      <span className="text-xs font-medium truncate max-w-[120px]">
                        {user.name} {user.isCurrentUser && '(আপনি)'}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {user.xp} XP
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
