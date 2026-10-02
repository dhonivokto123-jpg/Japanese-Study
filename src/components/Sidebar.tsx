import React from 'react';
import { useApp } from '../context/AppContext';
import { allN5Vocabulary } from '../data/allVocabularyData';
import { n5KanjiList } from '../data/kanjiList';
import { particlesList } from '../data/particlesData';
import {
  LayoutDashboard,
  BookOpen,
  Bookmark,
  Languages,
  FileText,
  Target,
  Sparkles,
  Clock,
  Trophy,
  Award,
  User,
  X,
  Volume2,
  SplitSquareVertical,
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  onOpenAuth?: (mode: 'login' | 'signup') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isMobileOpen = false,
  onCloseMobile = () => {},
  onOpenAuth,
}) => {
  const { activeTab, setActiveTab, currentUser } = useApp();

  const mainNavItems = [
    { id: 'dashboard', labelBn: 'ড্যাশবোর্ড', labelEn: 'Dashboard', icon: LayoutDashboard },
    { id: 'lessons', labelBn: 'লেসন ১ — ২৫', labelEn: 'Lessons (N5)', icon: BookOpen, badge: '25' },
    { id: 'vocab', labelBn: 'শব্দভাণ্ডার', labelEn: 'Vocabulary', icon: Bookmark, badge: allN5Vocabulary.length.toString() },
    { id: 'kanji', labelBn: 'কানজি ব্যাংক', labelEn: 'Kanji Bank', icon: Languages, badge: n5KanjiList.length.toString() },
    { id: 'particles', labelBn: 'পার্টিকেল রিসার্চ', labelEn: 'Particle Lab 🔬', icon: SplitSquareVertical, badge: '১৬+ 🔬' },
    { id: 'speaking', labelBn: 'অডিও ও শ্যাডোয়িং', labelEn: 'Audio Studio', icon: Volume2 },
    { id: 'grammar', labelBn: 'ব্যাকরণ গাইড', labelEn: 'Grammar Guide', icon: FileText },
    { id: 'exercises', labelBn: 'অনুশীলন ও টেস্ট', labelEn: 'Practice & Tests', icon: Target },
  ];

  const communityNavItems = [
    { id: 'characters', labelBn: 'হিরাগানা ও কাতাকানা', labelEn: 'Kana Mastery', icon: Sparkles },
    { id: 'counters', labelBn: 'গণনা ও অভিবাদন', labelEn: 'Counters & Phrases', icon: Clock },
    { id: 'leaderboard', labelBn: 'লিডারবোর্ড', labelEn: 'Leaderboard', icon: Trophy },
    { id: 'achievements', labelBn: 'অর্জন ও ব্যাজ', labelEn: 'Achievements', icon: Award },
    { id: 'profile', labelBn: 'আমার প্রোফাইল', labelEn: 'My Profile', icon: User },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    onCloseMobile();
  };

  const currentLessonNum = currentUser?.stats?.completedLessons?.length
    ? Math.min(25, (currentUser.stats.completedLessons[currentUser.stats.completedLessons.length - 1] || 0) + 1)
    : 1;

  const renderNavGroup = (items: typeof mainNavItems) => (
    <div className="space-y-1">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-left group cursor-pointer relative ${
              isActive
                ? 'bg-gradient-to-r from-indigo-500/15 to-violet-500/10 border border-indigo-500/30 text-indigo-900 dark:text-white font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/40 dark:hover:bg-white/5 border border-transparent font-medium'
            }`}
          >
            {/* Active luminous indicator bar */}
            {isActive && (
              <div className="absolute left-1 w-1 h-5 rounded-full bg-gradient-to-b from-indigo-500 to-violet-500 shadow-sm" />
            )}

            <div className="flex items-center space-x-3 min-w-0 pl-1.5">
              <Icon
                className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                }`}
              />
              <div className="truncate">
                <span className="block text-xs sm:text-sm leading-tight text-inherit truncate">
                  {item.labelEn}
                </span>
                <span className={`block text-[10px] font-normal leading-tight truncate ${
                  isActive ? 'text-indigo-600/80 dark:text-indigo-300/80' : 'text-slate-400 dark:text-slate-500'
                }`}>
                  {item.labelBn}
                </span>
              </div>
            </div>

            {item.badge && (
              <span
                className={`text-[9px] px-2 py-0.5 rounded-full font-mono font-bold uppercase tracking-wider shrink-0 ml-1.5 ${
                  isActive
                    ? 'bg-indigo-600 text-white dark:bg-indigo-500 dark:text-white shadow-xs'
                    : 'glass-pill text-slate-500 dark:text-slate-400'
                }`}
              >
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );

  const navContent = (
    <div className="flex flex-col h-full glass-sidebar text-slate-800 dark:text-slate-200 justify-between select-none">
      <div className="flex-1 overflow-y-auto px-3 py-4">
        {/* Top Brand Header */}
        <div
          onClick={() => handleNavClick('dashboard')}
          className="p-3 mb-4 flex items-center space-x-3 cursor-pointer rounded-2xl glass-card border border-slate-200/70 dark:border-white/10 hover:border-indigo-500/40 transition-all group"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-600 text-white rounded-xl flex items-center justify-center font-black text-xl font-serif shrink-0 shadow-md group-hover:scale-105 transition-transform">
            日
          </div>
          <div>
            <div className="font-black text-base tracking-tight leading-tight bg-gradient-to-r from-slate-900 to-indigo-900 dark:from-white dark:to-indigo-200 bg-clip-text text-transparent">
              NIHONOVA
            </div>
            <div className="text-[10px] font-mono font-medium text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Glass Learning OS</span>
            </div>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="space-y-5">
          <div>
            <div className="px-3 mb-2 text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 font-bold">
              সিলেবাস ও শিক্ষা
            </div>
            {renderNavGroup(mainNavItems)}
          </div>

          <div>
            <div className="px-3 mb-2 text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 font-bold">
              অনুশীলন ও অন্যান্য
            </div>
            {renderNavGroup(communityNavItems)}
          </div>
        </nav>
      </div>

      {/* Bottom Profile Panel */}
      <div className="p-3 border-t border-slate-200/60 dark:border-white/5 glass-panel">
        {currentUser ? (
          <div
            onClick={() => handleNavClick('profile')}
            className="flex items-center space-x-3 p-2 rounded-xl cursor-pointer hover:bg-slate-200/40 dark:hover:bg-white/5 transition-colors group"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-9 h-9 rounded-xl object-cover ring-2 ring-indigo-500/30 group-hover:ring-indigo-500/60 transition-all"
            />
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {currentUser.name}
              </div>
              <div className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 truncate">
                N5 · Lesson {currentLessonNum}
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => onOpenAuth?.('login')}
            className="w-full flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl glass-btn-primary font-bold text-xs shadow-sm cursor-pointer"
          >
            <span>লগ ইন করুন</span>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 h-screen sticky top-0 z-30">
        {navContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full shadow-2xl z-50 animate-in slide-in-from-left duration-200">
            <div className="h-14 flex items-center justify-between px-4 border-b border-slate-200/60 dark:border-white/10 glass-header">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white rounded-lg flex items-center justify-center font-bold text-xs font-serif">
                  日
                </div>
                <span className="font-bold text-sm text-slate-900 dark:text-white">NIHONOVA GLASS</span>
              </div>
              <button
                onClick={onCloseMobile}
                className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{navContent}</div>
          </div>
        </div>
      )}
    </>
  );
};
