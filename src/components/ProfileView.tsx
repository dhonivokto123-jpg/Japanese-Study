import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { allN5Vocabulary } from '../data/allVocabularyData';
import { n5KanjiList } from '../data/kanjiList';
import { User, Flame, Zap, Award, Volume2, VolumeX, BookOpen, Bookmark, RotateCcw, Check, Sparkles, AlertTriangle } from 'lucide-react';
import { toBengaliNumber } from '../utils/vocabCategories';

export const ProfileView: React.FC = () => {
  const { currentUser, updateProfile, isDarkMode, toggleDarkMode } = useApp();
  const [name, setName] = useState(currentUser?.name || '');
  const [targetLevel, setTargetLevel] = useState(currentUser?.targetLevel || 'N5');
  const [dailyGoal, setDailyGoal] = useState(currentUser?.dailyGoalMinutes || 20);
  const [savedMsg, setSavedMsg] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  if (!currentUser) {
    return (
      <div className="p-8 text-center text-slate-500">
        অনুগ্রহ করে লগ ইন করুন।
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      targetLevel: targetLevel as 'N5' | 'N4' | 'N3',
      dailyGoalMinutes: Number(dailyGoal),
    });
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2500);
  };

  const handleResetProgress = () => {
    updateProfile({
      stats: {
        xp: 0,
        level: 1,
        streak: 0,
        lastActiveDate: new Date().toISOString().split('T')[0],
        completedLessons: [],
        lessonProgress: {},
        learnedVocabIds: [],
        masteredKanjiIds: [],
        completedGrammarIds: [],
        completedExerciseIds: [],
        quizScores: {},
      },
    });
    setShowResetConfirm(false);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Profile Header */}
      <div className="p-6 sm:p-7 rounded-3xl glass-panel relative overflow-hidden shadow-lg flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-22 h-22 rounded-full object-cover ring-4 ring-indigo-500/30 shadow-md relative z-10"
        />
        <div className="text-center sm:text-left space-y-1.5 relative z-10">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              {currentUser.name}
            </h1>
            <span className="px-3 py-0.5 rounded-full text-xs font-mono font-bold bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm">
              LEVEL {currentUser.stats.level}
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono">{currentUser.email}</p>
          <p className="text-xs text-slate-600 dark:text-slate-300 pt-0.5">
            টার্গেট: {currentUser.targetLevel} • দৈনিক পড়ার লক্ষ্য: {toBengaliNumber(currentUser.dailyGoalMinutes)} মিনিট
          </p>
        </div>
      </div>

      {/* Real Stats Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl glass-card text-center border border-slate-200/80 dark:border-white/10 shadow-sm">
          <div className="w-9 h-9 mx-auto rounded-xl bg-indigo-500/15 flex items-center justify-center mb-1.5 text-indigo-600 dark:text-indigo-400">
            <Zap className="w-5 h-5" />
          </div>
          <p className="text-xl font-black text-slate-900 dark:text-white font-mono">
            {toBengaliNumber(currentUser.stats.xp.toLocaleString())}
          </p>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">মোট অর্জিত XP</span>
        </div>

        <div className="p-4 rounded-2xl glass-card text-center border border-slate-200/80 dark:border-white/10 shadow-sm">
          <div className="w-9 h-9 mx-auto rounded-xl bg-amber-500/15 flex items-center justify-center mb-1.5 text-amber-500">
            <Flame className="w-5 h-5" />
          </div>
          <p className="text-xl font-black text-slate-900 dark:text-white font-mono">
            {toBengaliNumber(currentUser.stats.streak)} দিন
          </p>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">চলমান স্ট্রিক</span>
        </div>

        <div className="p-4 rounded-2xl glass-card text-center border border-slate-200/80 dark:border-white/10 shadow-sm">
          <div className="w-9 h-9 mx-auto rounded-xl bg-emerald-500/15 flex items-center justify-center mb-1.5 text-emerald-600 dark:text-emerald-400">
            <Bookmark className="w-5 h-5" />
          </div>
          <p className="text-xl font-black text-slate-900 dark:text-white font-mono">
            {toBengaliNumber(currentUser.stats.learnedVocabIds?.length || 0)} / {toBengaliNumber(allN5Vocabulary.length)}
          </p>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">শব্দার্থ আয়ত্ত</span>
        </div>

        <div className="p-4 rounded-2xl glass-card text-center border border-slate-200/80 dark:border-white/10 shadow-sm">
          <div className="w-9 h-9 mx-auto rounded-xl bg-violet-500/15 flex items-center justify-center mb-1.5 text-violet-600 dark:text-violet-400">
            <Award className="w-5 h-5" />
          </div>
          <p className="text-xl font-black text-slate-900 dark:text-white font-mono">
            {toBengaliNumber(currentUser.stats.masteredKanjiIds?.length || 0)} / {toBengaliNumber(n5KanjiList.length)}
          </p>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">কানজি আয়ত্ত</span>
        </div>
      </div>

      {/* Edit Profile Form */}
      <form
        onSubmit={handleSave}
        className="p-6 sm:p-7 rounded-3xl glass-panel space-y-5 shadow-md"
      >
        <h3 className="font-bold text-base text-slate-900 dark:text-white border-b border-slate-200/70 dark:border-white/10 pb-3">
          ব্যক্তিগত সেটিংস ও তথ্য পরিবর্তন
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              আপনার নাম
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                টার্গেট লেভেল
              </label>
              <select
                value={targetLevel}
                onChange={(e) => setTargetLevel(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="N5">JLPT N5 (প্রাথমিক স্তর)</option>
                <option value="N4">JLPT N4 (উচ্চ প্রাথমিক)</option>
                <option value="N3">JLPT N3 (মধ্যবর্তী স্তর)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                দৈনিক পড়ার সময় লক্ষ্য (মিনিট)
              </label>
              <input
                type="number"
                min="5"
                max="180"
                value={dailyGoal}
                onChange={(e) => setDailyGoal(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Preference Toggles */}
        <div className="pt-4 border-t border-slate-200/70 dark:border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                সাউন্ড ও অডিও এফেক্টস
              </p>
              <p className="text-[11px] text-slate-500">কুইজ ও অডিও প্লেব্যাক সাউন্ড চালু রাখুন</p>
            </div>
            <button
              type="button"
              onClick={() => updateProfile({ soundEnabled: !currentUser.soundEnabled })}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                currentUser.soundEnabled ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full transition-transform ${
                  currentUser.soundEnabled
                    ? 'translate-x-6 bg-white'
                    : 'translate-x-0 bg-white'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">ডার্ক মোড (Dark Theme)</p>
              <p className="text-[11px] text-slate-500">চোখের সুরক্ষায় প্রিমিয়াম ডার্ক বা লাইট ইন্টারফেস নির্বাচন করুন</p>
            </div>
            <button
              type="button"
              onClick={toggleDarkMode}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                isDarkMode ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full transition-transform ${
                  isDarkMode
                    ? 'translate-x-6 bg-white'
                    : 'translate-x-0 bg-white'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Save & Reset Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200/70 dark:border-white/10">
          <div>
            {savedMsg ? (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                <Check className="w-4 h-4" />
                <span>পরিবর্তন সফলভাবে সংরক্ষিত হয়েছে!</span>
              </span>
            ) : null}
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>প্রগ্রেস রিসেট (০ XP)</span>
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl glass-btn-primary text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              সংরক্ষণ করুন
            </button>
          </div>
        </div>

        {/* Reset Confirmation Dialog */}
        {showResetConfirm && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 mt-3 space-y-3">
            <div className="flex items-start space-x-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-amber-900 dark:text-amber-200">
                  আপনি কি সত্যিই আপনার অগ্রগতি রিসেট করতে চান?
                </p>
                <p className="text-[11px] text-amber-700 dark:text-amber-300 mt-0.5">
                  এর ফলে আপনার অর্জিত XP = ০ হবে এবং সমস্ত লেসন ও শব্দভাণ্ডার নতুন শিক্ষার্থীর মতো ফাঁকা অবস্থায় চলে যাবে।
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 cursor-pointer"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={handleResetProgress}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-sm cursor-pointer"
              >
                হ্যাঁ, রিসেট করুন (0 XP)
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
