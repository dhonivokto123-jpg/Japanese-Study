import React, { useState, useMemo } from 'react';
import { allOriginalGuideSheets, ComprehensiveGuideSheet } from '../../data/particleGuidesMap';
import { OriginalGuideModal } from './OriginalGuideModal';
import { playJapaneseAudio, soundFx } from '../../utils/audio';
import {
  FileText,
  Search,
  Maximize2,
  Volume2,
  BookOpen,
  Filter,
  Eye,
  Layers,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Info,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';

export const ParticleOriginalGuidesGallery: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSheetIndex, setSelectedSheetIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'reader'>('grid');

  // Filtered sheets
  const filteredSheets = useMemo(() => {
    return allOriginalGuideSheets.filter((sheet) => {
      const matchesPage =
        selectedPage === 'ALL' || sheet.pageNumber === selectedPage;

      if (!matchesPage) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const inTitle = sheet.title.toLowerCase().includes(q);
      const inCaption = sheet.captionBn.toLowerCase().includes(q);
      const inTopics = sheet.summaryTopics.some((t) => t.toLowerCase().includes(q));
      const inFormulas = sheet.keyFormulas.some((f) => f.toLowerCase().includes(q));
      const inRules = sheet.keyBengaliRules.some((r) => r.toLowerCase().includes(q));
      const inExamples = sheet.keyExamples.some(
        (ex) =>
          ex.jp.toLowerCase().includes(q) ||
          ex.reading.toLowerCase().includes(q) ||
          ex.bn.toLowerCase().includes(q)
      );

      return inTitle || inCaption || inTopics || inFormulas || inRules || inExamples;
    });
  }, [selectedPage, searchQuery]);

  const handleOpenSheet = (sheetId: string) => {
    const idx = allOriginalGuideSheets.findIndex((s) => s.id === sheetId);
    if (idx !== -1) {
      setSelectedSheetIndex(idx);
      setIsModalOpen(true);
      soundFx.playClick();
    }
  };

  const pages = ['ALL', '1', '2', '3', '4', '5', '6', '7'];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Info Bar */}
      <div className="glass-card p-6 sm:p-7 rounded-3xl border border-indigo-500/20 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40">
              <FileText className="w-3.5 h-3.5" />
              <span>PRIMARY LEARNING SOURCE · ২০টি মূল শিট</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              জাপানি পার্টিকেল মূল গাইড শিট লাইব্রেরি 📖
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              আপলোড করা মাকসুদ আলমের <strong>"Grammar Part 1 - Particles"</strong> এর ২০টি শিটের পূর্ণাঙ্গ রূপ। প্রতিটি পৃষ্ঠার মূল চিত্র, জুম ও প্যানিং সুবিধা, সুনির্দিষ্ট সূত্র এবং অডিও উচ্চারণসহ সমন্বিত করা হয়েছে।
            </p>
          </div>

          {/* Stats Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="px-3.5 py-2 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>২০টি হাই-রেজ শিট</span>
            </div>
            <div className="px-3.5 py-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>পৃষ্ঠা ১ থেকে ৭</span>
            </div>
          </div>
        </div>

        {/* Filter and Search Controls */}
        <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Page Selector Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <span className="text-xs font-bold text-slate-500 shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>পৃষ্ঠা:</span>
            </span>
            {pages.map((p) => (
              <button
                key={p}
                onClick={() => {
                  setSelectedPage(p);
                  soundFx.playClick();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedPage === p
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {p === 'ALL' ? 'সব পৃষ্ঠা (All 20)' : `পৃষ্ঠা ${p}`}
              </button>
            ))}
          </div>

          {/* Search Box & View Mode Toggle */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="পার্টিকেল, নিয়ম বা বাক্য খুঁজুন..."
                className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                গ্রিড
              </button>
              <button
                onClick={() => setViewMode('reader')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'reader'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                রিডার
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSheets.map((sheet) => (
            <div
              key={sheet.id}
              className="glass-card rounded-3xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-400 dark:hover:border-indigo-600 transition-all flex flex-col group"
            >
              {/* Sheet Visual Preview */}
              <div
                onClick={() => handleOpenSheet(sheet.id)}
                className="relative aspect-[16/11] bg-slate-100 dark:bg-slate-900 cursor-pointer overflow-hidden border-b border-slate-200 dark:border-slate-800"
              >
                <img
                  src={sheet.imageUrl}
                  alt={sheet.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 px-3.5 py-2 rounded-xl bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white text-xs font-bold shadow-xl flex items-center gap-2 backdrop-blur-xs">
                    <Maximize2 className="w-3.5 h-3.5 text-indigo-500" />
                    <span>জুম ও ফুলস্ক্রিন ভিউ</span>
                  </div>
                </div>

                {/* Page Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-xl bg-slate-900/85 text-white text-[11px] font-extrabold backdrop-blur-xs flex items-center gap-1 shadow-sm">
                  <span>পৃষ্ঠা {sheet.pageNumber}</span>
                </div>

                {/* Watermark Tag */}
                <div className="absolute bottom-2 right-3 px-2 py-0.5 rounded-md bg-white/80 dark:bg-slate-900/80 text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300 backdrop-blur-xs">
                  {sheet.watermark}
                </div>
              </div>

              {/* Sheet Content Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">
                      {sheet.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {sheet.keyBengaliRules[0] || sheet.captionBn}
                  </p>

                  {/* Primary Formulas from Sheet */}
                  <div className="space-y-1 pt-1">
                    {sheet.keyFormulas.slice(0, 2).map((formula, idx) => (
                      <div
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 text-[11px] font-mono font-bold text-indigo-900 dark:text-indigo-300 truncate"
                      >
                        {formula}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample Examples with Audio */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>শিটের উদাহরণ বাক্য ({sheet.keyExamples.length}টি)</span>
                  </div>

                  <div className="space-y-1.5">
                    {sheet.keyExamples.slice(0, 2).map((ex, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-2 text-xs"
                      >
                        <div className="min-w-0">
                          <p className="font-serif font-bold text-slate-900 dark:text-white truncate">
                            {ex.jp}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                            {ex.bn}
                          </p>
                        </div>
                        <button
                          onClick={() => playJapaneseAudio(ex.reading || ex.jp)}
                          className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition-colors shrink-0"
                          title="উচ্চারণ শুনুন"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <button
                  onClick={() => handleOpenSheet(sheet.id)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>🖼 শিট সম্পূর্ণ পড়ুন ও বড় করুন</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Continuous Reader Mode */
        <div className="space-y-8 max-w-4xl mx-auto">
          {filteredSheets.map((sheet, index) => (
            <div
              key={sheet.id}
              className="glass-card rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl p-6 sm:p-8 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                    শিট #{index + 1} · পৃষ্ঠা {sheet.pageNumber}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                    {sheet.title}
                  </h3>
                </div>
                <button
                  onClick={() => handleOpenSheet(sheet.id)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-indigo-700 transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>বড় করে দেখুন</span>
                </button>
              </div>

              {/* High-res Image in Reader */}
              <div
                onClick={() => handleOpenSheet(sheet.id)}
                className="cursor-pointer rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white shadow-md hover:shadow-xl transition-shadow"
              >
                <img
                  src={sheet.imageUrl}
                  alt={sheet.title}
                  className="w-full h-auto block"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Formulations and Rules breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 space-y-2">
                  <h4 className="text-xs font-bold uppercase text-indigo-700 dark:text-indigo-400">
                    সূত্র / কাঠামো (Formulas)
                  </h4>
                  {sheet.keyFormulas.map((f, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 font-mono text-xs font-bold text-slate-900 dark:text-slate-100"
                    >
                      {f}
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 space-y-2">
                  <h4 className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">
                    মূল বাংলা ব্যাখ্যা (Rules)
                  </h4>
                  {sheet.keyBengaliRules.map((r, i) => (
                    <p key={i} className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {r}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox / Modal */}
      <OriginalGuideModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sheets={allOriginalGuideSheets}
        initialSheetIndex={selectedSheetIndex}
      />
    </div>
  );
};
