import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Flame,
  Zap,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  User,
  LogOut,
  LogIn,
  Menu,
  BookOpen,
  Sparkles,
} from 'lucide-react';

interface HeaderProps {
  onOpenMobileMenu: () => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu, onOpenAuth }) => {
  const { isDarkMode, toggleDarkMode, currentUser, logout, setActiveTab, updateProfile } = useApp();
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Real progress calculation
  const completedCount = currentUser?.stats?.completedLessons?.length || 0;
  const progressPct = Math.min(100, Math.round((completedCount / 25) * 100));

  // Rank determination based on real XP
  const xp = currentUser?.stats?.xp || 0;
  const rankName = xp >= 3000 ? 'Level III (Expert)' : xp >= 1000 ? 'Level II (Intermediate)' : 'Level I (Beginner)';

  return (
    <header className="sticky top-0 z-40 w-full h-16 glass-header flex items-center justify-between px-4 sm:px-8 transition-colors duration-200 select-none">
      {/* Left side: Mobile menu toggle and Streak/XP rank stats */}
      <div className="flex items-center space-x-3 sm:space-x-6">
        {/* Mobile toggle button */}
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile Logo Brand */}
        <div
          onClick={() => setActiveTab('dashboard')}
          className="md:hidden flex items-center space-x-2 cursor-pointer group"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white rounded-xl flex items-center justify-center font-bold text-xs font-serif shadow-xs group-hover:scale-105 transition-transform">
            日
          </div>
          <span className="font-bold text-xs tracking-tight text-slate-900 dark:text-white">NIHONOVA</span>
        </div>

        {/* Desktop: Streak badge */}
        {currentUser && (
          <div className="hidden sm:flex items-center glass-pill rounded-full px-3.5 py-1.5 shadow-xs border border-amber-500/20 dark:border-amber-400/20 bg-amber-500/5 dark:bg-amber-400/10">
            <span className="text-sm mr-1.5 animate-pulse">🔥</span>
            <span className="font-mono font-bold text-amber-700 dark:text-amber-300 text-xs">
              {currentUser.stats?.streak || 0} দিন স্ট্রিক
            </span>
          </div>
        )}

        {/* Desktop: XP Rank */}
        {currentUser && (
          <div className="hidden md:flex items-center space-x-2">
            <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              XP RANK
            </span>
            <div className="flex items-center space-x-1.5 glass-pill text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-xl border border-indigo-500/20 dark:border-indigo-400/20 bg-indigo-500/5 dark:bg-indigo-400/10 font-mono font-bold text-xs">
              <Zap className="w-3 h-3 text-indigo-500 fill-indigo-500" />
              <span>{rankName} ({xp} XP)</span>
            </div>
          </div>
        )}
      </div>

      {/* Right side: Daily Goal, Sound, Dark mode, User profile */}
      <div className="flex items-center space-x-2.5 sm:space-x-4">
        {/* Progress meter */}
        {currentUser && (
          <div className="hidden lg:block text-right">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono font-bold uppercase tracking-wider flex items-center justify-end gap-1.5">
              <span>সিলেবাস অগ্রগতি</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-black">({completedCount}/25)</span>
            </div>
            <div className="w-28 sm:w-32 bg-slate-200/80 dark:bg-slate-800/80 h-1.5 rounded-full mt-1.5 overflow-hidden border border-slate-300/40 dark:border-white/5">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 rounded-full transition-all duration-500 shadow-xs"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}

        {/* Audio Sound Toggle Button */}
        {currentUser && (
          <button
            onClick={() => updateProfile({ soundEnabled: !currentUser.soundEnabled })}
            className="w-9 h-9 rounded-xl glass-btn-secondary flex items-center justify-center transition-all cursor-pointer"
            title={currentUser.soundEnabled ? 'সাউন্ড চালু' : 'সাউন্ড বন্ধ'}
            aria-label="Toggle sound"
          >
            {currentUser.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            )}
          </button>
        )}

        {/* Dark/Light Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="w-9 h-9 rounded-xl glass-btn-secondary flex items-center justify-center transition-all cursor-pointer group"
          title={isDarkMode ? 'লাইট মোড (Light Glass)' : 'ডার্ক মোড (Dark Obsidian)'}
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-600 group-hover:-rotate-12 transition-transform duration-300" />
          )}
        </button>

        {/* User Account / Profile button */}
        {currentUser ? (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-1 sm:pl-2.5 sm:pr-1 rounded-2xl glass-card border border-slate-200/80 dark:border-white/10 hover:border-indigo-500/40 transition-all cursor-pointer"
            >
              <span className="hidden sm:inline text-xs font-semibold text-slate-800 dark:text-slate-100 max-w-[110px] truncate">
                {currentUser.name}
              </span>
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-xl object-cover ring-2 ring-indigo-500/20"
              />
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div
                className="absolute right-0 mt-2 w-60 rounded-2xl glass-dropdown shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150 text-left"
                onMouseLeave={() => setShowUserMenu(false)}
              >
                <div className="px-4 py-3 border-b border-slate-200/50 dark:border-white/10">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {currentUser.name}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {currentUser.email}
                  </p>
                  <div className="mt-2 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">লেভেল {currentUser.stats.level}</span>
                    <span className="px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-[10px] uppercase font-bold">{currentUser.targetLevel}</span>
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setActiveTab('profile');
                      setShowUserMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-xs text-slate-700 dark:text-slate-200 hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-300 flex items-center space-x-2.5 transition-colors cursor-pointer"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>প্রোফাইল ও সেটিংস</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('lessons');
                      setShowUserMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-xs text-slate-700 dark:text-slate-200 hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-300 flex items-center space-x-2.5 transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-slate-400" />
                    <span>আমার লেসনসমূহ (১-২৫)</span>
                  </button>
                </div>

                <div className="border-t border-slate-200/50 dark:border-white/10 my-1"></div>

                <button
                  onClick={() => {
                    logout();
                    setShowUserMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 flex items-center space-x-2.5 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>লগ আউট</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => onOpenAuth('login')}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl glass-btn-primary font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>লগ ইন</span>
          </button>
        )}
      </div>
    </header>
  );
};
