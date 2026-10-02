import React, { useState } from 'react';
import {
  basicKanaList,
  dakutenKanaList,
  yoonKanaList,
  KanaCharacter,
} from '../data/charactersData';
import { playJapaneseAudio } from '../utils/audio';
import { Sparkles, Volume2, Eye, EyeOff, Search } from 'lucide-react';

export const CharacterMasteryView: React.FC = () => {
  const [scriptType, setScriptType] = useState<'hiragana' | 'katakana'>('hiragana');
  const [chartType, setChartType] = useState<'basic' | 'dakuon' | 'yoon'>('basic');
  const [showRomaji, setShowRomaji] = useState(true);
  const [showBengali, setShowBengali] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeChar, setActiveChar] = useState<string | null>(null);

  let list: KanaCharacter[] = [];
  if (chartType === 'basic') {
    list = basicKanaList;
  } else if (chartType === 'dakuon') {
    list = dakutenKanaList;
  } else {
    list = yoonKanaList;
  }

  const filtered = list.filter((item) => {
    const term = searchTerm.toLowerCase();
    const char = scriptType === 'hiragana' ? item.hiragana : item.katakana;
    return (
      char.includes(term) ||
      item.romaji.toLowerCase().includes(term) ||
      item.bengali.toLowerCase().includes(term)
    );
  });

  const handlePlay = (char: string) => {
    setActiveChar(char);
    playJapaneseAudio(char);
    setTimeout(() => setActiveChar(null), 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel relative overflow-hidden shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-bold uppercase tracking-widest mb-2 px-3 py-1 rounded-full glass-card border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>জাপানি বর্ণমালা মাস্টার</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            হিরাগানা (あ) ও কাতাকানা (ア) ইন্টারঅ্যাক্টিভ চার্ট
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl">
            জাপানি ভাষার মূল সিলেবারি চার্ট, রোমাজি, বাংলা উচ্চারণ এবং প্রতিটি অক্ষরের বিশুদ্ধ জাপানি অডিও সাউন্ড।
          </p>
        </div>

        {/* Script Selector */}
        <div className="flex rounded-2xl glass-card p-1.5 border border-slate-200/80 dark:border-white/10 shrink-0 relative z-10">
          <button
            onClick={() => setScriptType('hiragana')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              scriptType === 'hiragana'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            ひらがな হিরাগানা
          </button>
          <button
            onClick={() => setScriptType('katakana')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              scriptType === 'katakana'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            カタカナ কাতাকানা
          </button>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="p-4 rounded-3xl glass-panel shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap rounded-2xl glass-card p-1 border border-slate-200/70 dark:border-white/10">
          <button
            onClick={() => setChartType('basic')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              chartType === 'basic'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            মৌলিক ৪৬ বর্ণ (Gojuon)
          </button>
          <button
            onClick={() => setChartType('dakuon')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              chartType === 'dakuon'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            দাকুওন ও হানদাকুওন (Tententen / Maru)
          </button>
          <button
            onClick={() => setChartType('yoon')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              chartType === 'yoon'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            যৌগিক বর্ণ (Yoon - kya, sha...)
          </button>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button
            onClick={() => setShowRomaji(!showRomaji)}
            className="flex items-center space-x-1.5 font-semibold text-slate-600 dark:text-slate-300 glass-card px-3 py-1.5 rounded-xl cursor-pointer"
          >
            {showRomaji ? <Eye className="w-3.5 h-3.5 text-indigo-500" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
            <span>রোমাজি</span>
          </button>
          <button
            onClick={() => setShowBengali(!showBengali)}
            className="flex items-center space-x-1.5 font-semibold text-slate-600 dark:text-slate-300 glass-card px-3 py-1.5 rounded-xl cursor-pointer"
          >
            {showBengali ? <Eye className="w-3.5 h-3.5 text-indigo-500" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
            <span>বাংলা উচ্চারণ</span>
          </button>
        </div>
      </div>

      {/* Kana Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-3">
        {filtered.map((item, idx) => {
          const char = scriptType === 'hiragana' ? item.hiragana : item.katakana;
          const isPlaying = activeChar === char;
          return (
            <button
              key={`${char}-${idx}`}
              onClick={() => handlePlay(char)}
              className={`p-3.5 rounded-2xl transition-all flex flex-col items-center justify-center text-center group cursor-pointer ${
                isPlaying
                  ? 'border-indigo-500 bg-indigo-500/20 scale-105 shadow-md ring-2 ring-indigo-500/40'
                  : 'glass-card hover:border-indigo-500/50 hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors font-serif">
                {char}
              </span>
              {showRomaji && (
                <span className="text-xs font-bold text-slate-400 font-mono mt-1">
                  {item.romaji}
                </span>
              )}
              {showBengali && (
                <span className="text-[11px] font-medium text-indigo-600 dark:text-indigo-300 mt-0.5">
                  {item.bengali}
                </span>
              )}
              <div className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400">
                <Volume2 className="w-3.5 h-3.5" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
