import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { n5KanjiList } from '../data/kanjiList';
import { playJapaneseAudio, soundFx } from '../utils/audio';
import { toBengaliNumber } from '../utils/vocabCategories';
import { KanjiFlashcardExperience } from './KanjiFlashcardExperience';
import { KanjiQuizExperience } from './KanjiQuizExperience';
import {
  Languages,
  Search,
  Volume2,
  Check,
  RotateCcw,
  Sparkles,
  BookOpen,
  Filter,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const KanjiMasterView: React.FC = () => {
  const { currentUser, markKanjiMastered, unmarkKanjiMastered, addXp } = useApp();

  // Learning Mode Tabs: 'list' (কানজি তালিকা), 'flashcards' (ফ্ল্যাশকার্ড), 'quiz' (কুইজ)
  const [learningMode, setLearningMode] = useState<'list' | 'flashcards' | 'quiz'>('flashcards');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLesson, setSelectedLesson] = useState<number | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'mastered' | 'unmastered'>('all');
  const [selectedKanji, setSelectedKanji] = useState(n5KanjiList[0]);
  const [canvasDrawing, setCanvasDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const masteredIds = currentUser?.stats.masteredKanjiIds || [];

  const filteredKanji = n5KanjiList.filter((k) => {
    const term = searchTerm.toLowerCase();
    const matchSearch =
      k.kanji.includes(term) ||
      k.meaningBn.toLowerCase().includes(term) ||
      k.meaningEn.toLowerCase().includes(term) ||
      k.onyomi.toLowerCase().includes(term) ||
      k.kunyomi.toLowerCase().includes(term);

    const matchLesson = selectedLesson === 'all' || k.lessonId === selectedLesson;
    const isMastered = masteredIds.includes(k.id);
    const matchStatus =
      statusFilter === 'all' ||
      (statusFilter === 'mastered' && isMastered) ||
      (statusFilter === 'unmastered' && !isMastered);

    return matchSearch && matchLesson && matchStatus;
  });

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setCanvasDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    const isDark = document.documentElement.classList.contains('dark');
    ctx.strokeStyle = isDark ? '#818cf8' : '#4f46e5';
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setCanvasDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const isCurrentMastered = masteredIds.includes(selectedKanji.id);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header Banner */}
      <div className="p-6 sm:p-7 rounded-3xl glass-panel relative overflow-hidden shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center font-serif text-2xl font-black shadow-md shrink-0 select-none">
            漢
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              JLPT N5 কানজি ব্যাংক ও ফ্ল্যাশকার্ড
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              ১০৩টি মৌলিক কানজি • স্ট্রোক সংখ্যা • ওন-ইওমি ও কুন-ইওমি • অডিও সহ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <div className="px-4 py-2 rounded-full glass-card border border-amber-500/30 text-amber-600 dark:text-amber-400 font-bold text-xs sm:text-sm flex items-center gap-1.5 shrink-0">
            <span className="font-mono">{toBengaliNumber(n5KanjiList.length)}</span>
            <span>কানজি</span>
          </div>
          <div className="px-3.5 py-2 rounded-full glass-card border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center gap-1.5 shrink-0">
            <span>আয়ত্ত:</span>
            <span className="font-mono">{toBengaliNumber(masteredIds.length)}</span>
          </div>
        </div>
      </div>

      {/* Learning Mode Navigation: 3 Tabs */}
      <div className="glass-panel p-1.5 rounded-2xl flex items-center gap-2 select-none">
        <button
          onClick={() => setLearningMode('list')}
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            learningMode === 'list'
              ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10'
          }`}
          id="kanji-tab-list"
        >
          <span>📖</span>
          <span>কানজি তালিকা ও ড্রয়িং</span>
        </button>

        <button
          onClick={() => setLearningMode('flashcards')}
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            learningMode === 'flashcards'
              ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md ring-2 ring-indigo-400/40'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10'
          }`}
          id="kanji-tab-flashcards"
        >
          <span>🎴</span>
          <span>ফ্ল্যাশকার্ড</span>
          <span className="text-xs opacity-70 font-sans hidden sm:inline">(カード)</span>
        </button>

        <button
          onClick={() => setLearningMode('quiz')}
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            learningMode === 'quiz'
              ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10'
          }`}
          id="kanji-tab-quiz"
        >
          <span>✏️</span>
          <span>কুইজ অনুশীলন</span>
        </button>
      </div>

      {/* ================= TAB 1: KANJI FLASHCARDS ================= */}
      {learningMode === 'flashcards' && (
        <KanjiFlashcardExperience kanjiList={filteredKanji} />
      )}

      {/* ================= TAB 2: KANJI QUIZ ================= */}
      {learningMode === 'quiz' && (
        <KanjiQuizExperience kanjiList={filteredKanji} />
      )}

      {/* ================= TAB 3: KANJI LIST & PRACTICE ================= */}
      {learningMode === 'list' && (
        <div className="space-y-6">
          {/* Filter and Search Bar */}
          <div className="p-4 rounded-2xl glass-card space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Search box */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="কানজি, অর্থ, ওন-ইওমি বা কুন-ইওমি..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Lesson Filter */}
              <div>
                <select
                  value={selectedLesson}
                  onChange={(e) =>
                    setSelectedLesson(e.target.value === 'all' ? 'all' : Number(e.target.value))
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="all">সব লেসন (Lessons 1-25)</option>
                  {Array.from({ length: 25 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      লেসন {num}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="all">সব কানজি ({n5KanjiList.length})</option>
                  <option value="mastered">আয়ত্ত করা ({masteredIds.length})</option>
                  <option value="unmastered">অনুশীলন বাকি ({n5KanjiList.length - masteredIds.length})</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 px-1 pt-1">
              <span>{toBengaliNumber(filteredKanji.length)}টি কানজি পাওয়া গেছে</span>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="hover:underline font-mono cursor-pointer text-indigo-600 dark:text-indigo-400"
                >
                  সার্চ মুছুন
                </button>
              )}
            </div>
          </div>

          {/* Main Layout: Left Kanji Selector + Right Drawing & Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Grid: 103 Kanji Badges */}
            <div className="lg:col-span-5 space-y-3">
              <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 max-h-[640px] overflow-y-auto p-3 rounded-2xl glass-card scrollbar-none">
                {filteredKanji.map((item) => {
                  const isSelected = selectedKanji.id === item.id;
                  const isMastered = masteredIds.includes(item.id);

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedKanji(item);
                        clearCanvas();
                        soundFx.playClick();
                      }}
                      className={`aspect-square rounded-2xl border flex flex-col items-center justify-center relative transition-all group cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-tr from-indigo-600 to-violet-600 text-white border-transparent shadow-md'
                          : 'glass-card border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:border-indigo-500/40'
                      }`}
                    >
                      <span className="text-xl font-black font-serif">{item.kanji}</span>
                      <span className={`text-[9px] line-clamp-1 px-1 ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                        {item.meaningBn.split(',')[0]}
                      </span>
                      {isMastered && (
                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Detail Pane */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-6 sm:p-7 rounded-3xl glass-card space-y-6 shadow-md">
                {/* Top Detail Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200/70 dark:border-white/10">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center text-4xl font-serif font-black shadow-md">
                      {selectedKanji.kanji}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                          {selectedKanji.meaningBn}
                        </h2>
                        <span className="text-xs font-mono px-2 py-0.5 rounded-full glass-pill text-indigo-600 dark:text-indigo-400 font-semibold">
                          লেসন {toBengaliNumber(selectedKanji.lessonId)}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
                        {selectedKanji.meaningEn} • {toBengaliNumber(selectedKanji.strokes)}টি স্ট্রোক
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 self-start sm:self-auto">
                    <button
                      onClick={() => playJapaneseAudio(selectedKanji.kanji)}
                      className="p-3 rounded-2xl glass-btn-secondary text-slate-800 dark:text-slate-100 text-xs font-bold transition-all cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400"
                      title="উচ্চারণ শুনুন"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (isCurrentMastered) {
                          unmarkKanjiMastered(selectedKanji.id);
                        } else {
                          markKanjiMastered(selectedKanji.id, selectedKanji.lessonId);
                          soundFx.playCorrect();
                        }
                      }}
                      className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                        isCurrentMastered
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'glass-btn-secondary'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                      <span>{isCurrentMastered ? '✓ আয়ত্ত হয়েছে' : 'আয়ত্ত করুন (+15 XP)'}</span>
                    </button>
                  </div>
                </div>

                {/* Readings Table */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl glass-card border border-slate-200/80 dark:border-white/10">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                      音読み (Onyomi - চাইনিজ রিডিং)
                    </span>
                    <p className="text-base font-serif font-bold text-slate-900 dark:text-white">
                      {selectedKanji.onyomi || '—'}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl glass-card border border-slate-200/80 dark:border-white/10">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                      訓読み (Kunyomi - জাপানি রিডিং)
                    </span>
                    <p className="text-base font-serif font-bold text-slate-900 dark:text-white">
                      {selectedKanji.kunyomi || '—'}
                    </p>
                  </div>
                </div>

                {/* Examples Compounds */}
                {selectedKanji.examples && selectedKanji.examples.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                      শব্দ যৌগ (Vocabulary Compounds)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedKanji.examples.map((cmp, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-2xl glass-card border border-slate-200/70 dark:border-white/10 flex items-center justify-between"
                        >
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-sm text-slate-900 dark:text-white font-serif">
                                {cmp.word}
                              </span>
                              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-mono">({cmp.reading})</span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{cmp.meaningBn}</p>
                          </div>
                          <button
                            onClick={() => playJapaneseAudio(cmp.reading || cmp.word)}
                            className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                            title="যৌগ শব্দের উচ্চারণ শুনুন"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Interactive Drawing Canvas */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      হাতে লেখার ড্রয়িং বোর্ড (Writing Practice Canvas)
                    </span>
                    <button
                      onClick={clearCanvas}
                      className="inline-flex items-center space-x-1 text-xs text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>মুছুন</span>
                    </button>
                  </div>

                  <div className="relative aspect-video max-h-[260px] w-full rounded-2xl glass-card border border-slate-200/80 dark:border-white/10 overflow-hidden flex items-center justify-center">
                    {/* Background Guide Kanji */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-10 dark:opacity-15 text-9xl font-serif text-slate-600 dark:text-slate-300 font-bold">
                      {selectedKanji.kanji}
                    </div>

                    <canvas
                      ref={canvasRef}
                      width={600}
                      height={340}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                      className="w-full h-full cursor-crosshair relative z-10 touch-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
