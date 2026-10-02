import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, LogIn, UserPlus, Sparkles, Check } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
}) => {
  const { login, signup } = useApp();
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      login(email || 'demo@nihonova.edu', password);
    } else {
      signup(name || 'নতুন শিক্ষার্থী', email || 'new@nihonova.edu', password);
    }
    onClose();
  };

  const handleDemoLogin = () => {
    login('dhonivokto123@gmail.com', 'password123');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl glass-dropdown border border-white/80 dark:border-white/10 shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Brand */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white mx-auto flex items-center justify-center text-xl font-black font-serif shadow-md">
            日
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
            {mode === 'login' ? 'একাউন্টে লগ ইন করুন' : 'নতুন একাউন্ট খুলুন'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Nihonova — জাপানি ভাষা ও JLPT N5 পূর্ণাঙ্গ গ্লাস লার্নিং প্ল্যাটফর্ম
          </p>
        </div>

        {/* Mode Switch Tabs */}
        <div className="flex rounded-2xl glass-card p-1 border border-slate-200/70 dark:border-white/10">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            লগ ইন
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              mode === 'signup'
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            রেজিস্ট্রেশন
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                আপনার পূর্ণ নাম
              </label>
              <input
                type="text"
                placeholder="যেমন: তানভীর আহমেদ"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm text-slate-900 dark:text-white"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              ইমেইল এড্রেস
            </label>
            <input
              type="email"
              placeholder="dhonivokto123@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm text-slate-900 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl glass-btn-primary font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            {mode === 'login' ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
            <span>{mode === 'login' ? 'লগ ইন করুন' : 'একাউন্ট তৈরি করুন'}</span>
          </button>
        </form>

        {/* 1-Click Demo Login Button */}
        <div className="pt-2 border-t border-slate-200/60 dark:border-white/10 text-center">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2.5 rounded-xl glass-btn-secondary text-slate-800 dark:text-slate-200 text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>১-ক্লিকে ডেমো শিক্ষার্থী একাউন্টে লগ ইন</span>
          </button>
        </div>
      </div>
    </div>
  );
};
