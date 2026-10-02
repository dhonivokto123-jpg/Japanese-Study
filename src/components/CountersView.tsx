import React, { useState } from 'react';
import { countersData, CounterGroup } from '../data/countersData';
import { expressionsData, JapaneseExpression } from '../data/expressionsData';
import { playJapaneseAudio } from '../utils/audio';
import { Clock, MessageSquare, Volume2, Search } from 'lucide-react';

export const CountersView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'counters' | 'expressions'>('counters');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCounters = countersData.filter((c) => {
    const term = searchTerm.toLowerCase();
    return (
      c.category.toLowerCase().includes(term) ||
      c.categoryBn.toLowerCase().includes(term) ||
      c.unit.toLowerCase().includes(term) ||
      c.descriptionBn.toLowerCase().includes(term) ||
      c.items.some(
        (i) =>
          i.japanese.toLowerCase().includes(term) ||
          i.reading.toLowerCase().includes(term) ||
          i.bengali.toLowerCase().includes(term)
      )
    );
  });

  const filteredExpressions = expressionsData.filter((e) => {
    const term = searchTerm.toLowerCase();
    return (
      e.japanese.toLowerCase().includes(term) ||
      e.reading.toLowerCase().includes(term) ||
      e.bengali.toLowerCase().includes(term) ||
      e.english.toLowerCase().includes(term) ||
      e.situationBn.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel relative overflow-hidden shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-bold uppercase tracking-widest mb-2 px-3 py-1 rounded-full glass-card border border-indigo-500/20">
            <Clock className="w-3.5 h-3.5" />
            <span>জাপানি গণনা ও শিষ্টাচার শিট</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            গণনা (Counters) ও অভিবাদন (Expressions)
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl">
            জাপানি ভাষার ভিন্ন ভিন্ন বস্তুর জন্য সুনির্দিষ্ট গণনা নিয়ম ও প্রাত্যহিক অভিবাদন বাক্যাংশ ও বিশুদ্ধ উচ্চারণ।
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex rounded-2xl glass-card p-1.5 border border-slate-200/80 dark:border-white/10 shrink-0 relative z-10">
          <button
            onClick={() => setActiveTab('counters')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'counters'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            ⏱️ গণক শব্দ (Counters)
          </button>
          <button
            onClick={() => setActiveTab('expressions')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'expressions'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            💬 অভিবাদন ও বাক্যাংশ
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="p-4 rounded-2xl glass-card">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={
              activeTab === 'counters'
                ? 'গণক শব্দ বা ক্যাটাগরি দিয়ে খুঁজুন (যেমন: মানুষ, বই, গাড়ি, ひとつ)...'
                : 'অভিবাদন বা বাংলা অর্থ দিয়ে খুঁজুন (যেমন: শুভ সকাল, ধন্যবাদ, こんにちは)...'
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* TAB 1: COUNTERS */}
      {activeTab === 'counters' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCounters.map((group, idx) => (
              <div
                key={`${group.category}-${idx}`}
                className="p-5 sm:p-6 rounded-3xl glass-card space-y-3.5 hover:border-indigo-500/40 transition-all shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-slate-200/70 dark:border-white/10 pb-2.5">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                      {group.categoryBn}
                    </h3>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                      {group.category}
                    </p>
                  </div>
                  <span className="text-[11px] px-2.5 py-1 rounded-full glass-pill text-indigo-600 dark:text-indigo-400 font-bold font-mono">
                    একক: {group.unit}
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{group.descriptionBn}</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {group.items.map((val, iIdx) => (
                    <div
                      key={iIdx}
                      className={`p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                        val.isIrregular
                          ? 'bg-amber-500/10 border-amber-500/30'
                          : 'glass-card border-slate-200/80 dark:border-white/10'
                      }`}
                    >
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white mr-1">
                          {val.japanese}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono block">
                          {val.reading}
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate max-w-[90px]">
                          {val.bengali}
                        </span>
                      </div>
                      <button
                        onClick={() => playJapaneseAudio(val.reading || val.japanese)}
                        className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-1 cursor-pointer transition-colors"
                        title="উচ্চারণ শুনুন"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: EXPRESSIONS */}
      {activeTab === 'expressions' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExpressions.map((exp) => (
            <div
              key={exp.id}
              className="p-5 rounded-3xl glass-card space-y-2.5 hover:border-indigo-500/40 transition-all flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold glass-pill text-indigo-600 dark:text-indigo-400">
                    {exp.category}
                  </span>
                  <button
                    onClick={() => playJapaneseAudio(exp.reading || exp.japanese)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                    title="উচ্চারণ শুনুন"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif">
                  {exp.japanese}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  {exp.reading} • <span className="italic">{exp.romaji}</span>
                </p>

                <div className="mt-2 pt-2 border-t border-slate-200/70 dark:border-white/10">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    বাংলা: {exp.bengali}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    English: {exp.english}
                  </p>
                </div>
              </div>

              {exp.situationBn && (
                <p className="text-[10px] text-slate-400 italic mt-2">
                  পরিস্থিতি: {exp.situationBn}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
