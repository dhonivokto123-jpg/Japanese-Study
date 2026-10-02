import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { lessonsList } from '../data/lessonsData';
import { BookOpen, CheckCircle2, ArrowRight, Sparkles, Filter, Layers } from 'lucide-react';

export const LessonsCatalogView: React.FC = () => {
  const { currentUser, setActiveLessonId, setActiveLessonSection, setActiveTab } = useApp();
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  const filteredLessons = lessonsList.filter((lesson) => {
    const isCompleted = currentUser?.stats.completedLessons.includes(lesson.id);
    if (filter === 'completed') return isCompleted;
    if (filter === 'pending') return !isCompleted;
    return true;
  });

  const handleOpenLesson = (lessonId: number, section = 'rules') => {
    setActiveLessonId(lessonId);
    setActiveLessonSection(section);
    setActiveTab('lesson-detail');
  };

  const completedCount = currentUser?.stats.completedLessons.length || 0;
  const progressPct = Math.round((completedCount / 25) * 100);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner - Glass Workspace */}
      <div className="glass-card relative overflow-hidden rounded-3xl p-6 sm:p-8 border border-white/80 dark:border-white/10 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="relative z-10">
          <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>সিলেবাস গাইড · মিন্না নো নিহোঙ্গো ১ — ২৫</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            লেসন ১ থেকে ২৫ — সম্পূর্ণ JLPT N5 পাঠ্যক্রম
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
            প্রতিটি লেসনে ব্যাকরণ কাঠামো, বাস্তব কথোপকথন, কানজি, শব্দার্থ, পাঠ্য অনুচ্ছেদ ও কুইজ অন্তর্ভুক্ত রয়েছে।
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl shrink-0 text-center sm:text-right border border-white/80 dark:border-white/10 shadow-md">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">আপনার পাঠ্যক্রম অগ্রগতি</p>
          <p className="text-3xl font-black font-mono text-indigo-600 dark:text-indigo-400 mt-0.5">
            {completedCount} / 25
          </p>
          <div className="w-28 sm:w-32 bg-slate-200/80 dark:bg-slate-800/80 h-1.5 rounded-full mt-2 overflow-hidden mx-auto sm:ml-auto">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="text-[11px] font-mono text-slate-400 mt-1.5">
            {progressPct}% সম্পন্ন
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-indigo-500" />
          <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">ফিল্টার:</span>
          <div className="flex rounded-2xl glass-card p-1 border border-slate-200/70 dark:border-white/10">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              সব লেসন ({lessonsList.length})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === 'completed'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              সম্পন্ন ({completedCount})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === 'pending'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              বাকি আছে ({25 - completedCount})
            </button>
          </div>
        </div>
      </div>

      {/* Lessons Glass Grid (1 to 25) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLessons.map((lesson) => {
          const isDone = currentUser?.stats.completedLessons.includes(lesson.id);
          return (
            <div
              key={lesson.id}
              onClick={() => handleOpenLesson(lesson.id)}
              className={`glass-card glass-card-hover p-6 rounded-3xl flex flex-col justify-between group cursor-pointer border ${
                isDone
                  ? 'border-emerald-500/30 dark:border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-500/5'
                  : 'border-slate-200/80 dark:border-white/10'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center space-x-2.5">
                    <span
                      className={`w-9 h-9 rounded-2xl flex items-center justify-center font-mono font-black text-sm shadow-xs ${
                        isDone
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white'
                      }`}
                    >
                      {lesson.id}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      {lesson.level}
                    </span>
                  </div>

                  {isDone ? (
                    <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>সম্পন্ন</span>
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-1">
                      <span>লেসন পড়ুন</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                  {lesson.titleBn}
                </h3>
                <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {lesson.descriptionBn}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  <span>{lesson.rulesCount}টি নিয়ম</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>{lesson.vocabCount}টি শব্দ</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>
                  <span>{lesson.kanjiCount}টি কানজি</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
