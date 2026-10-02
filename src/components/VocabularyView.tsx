import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { allN5Vocabulary } from '../data/allVocabularyData';
import { playJapaneseAudio, soundFx } from '../utils/audio';
import { VocabItem } from '../types';
import { toBengaliNumber } from '../utils/vocabCategories';
import { VocabularyFlashcardExperience } from './VocabularyFlashcardExperience';
import { VocabularyQuizExperience } from './VocabularyQuizExperience';
import {
  Search,
  Volume2,
  Bookmark,
  Check,
  Filter,
  Sparkles,
  BookOpen,
  Layers,
  HelpCircle,
} from 'lucide-react';

export const VocabularyView: React.FC = () => {
  const { currentUser, markVocabLearned, unmarkVocabLearned } = useApp();

  // Learning Mode Tabs: 'list' (শব্দতালিকা), 'flashcards' (ফ্ল্যাশকার্ড), 'quiz' (কুইজ)
  const [learningMode, setLearningMode] = useState<'list' | 'flashcards' | 'quiz'>('flashcards');

  // List filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLesson, setSelectedLesson] = useState<number | 'all'>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'learned' | 'unlearned'>('all');

  const learnedIds = currentUser?.stats.learnedVocabIds || [];

  const filteredVocab = useMemo(() => {
    return allN5Vocabulary.filter((v) => {
      const matchLesson = selectedLesson === 'all' || v.lessonId === selectedLesson;
      const matchType = selectedType === 'all' || v.type === selectedType;
      const isLearned = learnedIds.includes(v.id);
      const matchStatus =
        statusFilter === 'all' ||
        (statusFilter === 'learned' && isLearned) ||
        (statusFilter === 'unlearned' && !isLearned);

      const term = searchTerm.toLowerCase();
      const matchSearch =
        v.word.toLowerCase().includes(term) ||
        v.reading.toLowerCase().includes(term) ||
        v.romaji.toLowerCase().includes(term) ||
        v.bengali.toLowerCase().includes(term) ||
        v.english.toLowerCase().includes(term);

      return matchLesson && matchType && matchStatus && matchSearch;
    });
  }, [selectedLesson, selectedType, statusFilter, searchTerm, learnedIds]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header Banner */}
      <div className="p-6 sm:p-7 rounded-3xl glass-panel relative overflow-hidden shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 relative z-10">
          {/* Circular badge with "五" (Kanji for 5) */}
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center font-serif text-2xl font-black shadow-md shrink-0 select-none">
            五
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              JLPT N5 শব্দভাণ্ডার
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              বাংলা অর্থ • উদাহরণ বাক্য • স্বাভাবিক জাপানি অডিও সহ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <div className="px-4 py-2 rounded-full glass-card border border-amber-500/30 text-amber-600 dark:text-amber-400 font-bold text-xs sm:text-sm flex items-center gap-1.5 shrink-0">
            <span className="font-mono">{toBengaliNumber(allN5Vocabulary.length)}</span>
            <span>শব্দ</span>
          </div>
          <div className="px-3.5 py-2 rounded-full glass-card border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center gap-1.5 shrink-0">
            <span>আয়ত্ত:</span>
            <span className="font-mono">{toBengaliNumber(learnedIds.length)}</span>
          </div>
        </div>
      </div>

      {/* Learning Mode Navigation: 3 Distinct Tabs */}
      <div className="glass-panel p-1.5 rounded-2xl flex items-center gap-2 select-none">
        <button
          onClick={() => setLearningMode('list')}
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            learningMode === 'list'
              ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10'
          }`}
          id="vocab-tab-list"
        >
          <span>📖</span>
          <span>শব্দতালিকা</span>
          <span className="text-xs opacity-70 font-sans hidden sm:inline">(ことば)</span>
        </button>

        <button
          onClick={() => setLearningMode('flashcards')}
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            learningMode === 'flashcards'
              ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md ring-2 ring-indigo-400/40'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10'
          }`}
          id="vocab-tab-flashcards"
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
          id="vocab-tab-quiz"
        >
          <span>✏️</span>
          <span>কুইজ</span>
          <span className="text-xs opacity-70 font-sans hidden sm:inline">(クイズ)</span>
        </button>
      </div>

      {/* ================= TAB 1: FLASHCARD EXPERIENCE ================= */}
      {learningMode === 'flashcards' && (
        <VocabularyFlashcardExperience initialVocabList={filteredVocab} />
      )}

      {/* ================= TAB 2: QUIZ EXPERIENCE ================= */}
      {learningMode === 'quiz' && (
        <VocabularyQuizExperience vocabList={filteredVocab} />
      )}

      {/* ================= TAB 3: ALL VOCABULARY LIST ================= */}
      {learningMode === 'list' && (
        <div className="space-y-4">
          {/* Search and Filters Bar */}
          <div className="p-4 rounded-2xl glass-card space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Search Box */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="শব্দ, রোমাজি বা বাংলা..."
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
                  <option value="all">সব লেসন (1-25)</option>
                  {Array.from({ length: 25 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      লেসন {num}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="all">সব ক্যাটাগরি (All Types)</option>
                  <option value="NOUN">বিশেষ্য (NOUN)</option>
                  <option value="VERB">ক্রিয়া (VERB)</option>
                  <option value="ADJECTIVE">বিশেষণ (ADJECTIVE)</option>
                  <option value="ADVERB">ক্রিয়া-বিশেষণ (ADVERB)</option>
                  <option value="PARTICLE">অব্যয় (PARTICLE)</option>
                  <option value="EXPRESSION">অভিব্যক্তি (EXPRESSION)</option>
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="all">সব অবস্থা ({allN5Vocabulary.length})</option>
                  <option value="learned">আয়ত্ত করা ({learnedIds.length})</option>
                  <option value="unlearned">অনুশীলন বাকি ({allN5Vocabulary.length - learnedIds.length})</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 px-1 pt-1">
              <span>{toBengaliNumber(filteredVocab.length)}টি শব্দ ফিল্টারে পাওয়া গেছে</span>
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

          {/* Vocabulary Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVocab.map((item) => {
              const isLearned = learnedIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl glass-card transition-all flex flex-col justify-between space-y-4 hover:border-indigo-500/40 shadow-sm"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-baseline space-x-2">
                          <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                            {item.word}
                          </h3>
                          {item.reading && item.reading !== item.word && (
                            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-mono">
                              ({item.reading})
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-mono text-slate-400">
                          {item.romaji}
                        </span>
                      </div>

                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => playJapaneseAudio(item.reading || item.word)}
                          className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                          title="উচ্চারণ শুনুন"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <span className="text-[10px] font-mono font-bold glass-pill text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-md">
                          L{item.lessonId}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 dark:border-white/10">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {item.bengali}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.english}</p>
                    </div>

                    {item.exampleJp && (
                      <div className="p-3 rounded-xl glass-card border border-slate-200/60 dark:border-white/10 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                            উদাহরণ
                          </span>
                          <button
                            onClick={() => playJapaneseAudio(item.exampleJp)}
                            className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-0.5 transition-colors cursor-pointer"
                            title="উদাহরণ শুনুন"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="font-medium text-slate-800 dark:text-slate-200">
                          {item.exampleJp}
                        </p>
                        <p className="text-slate-500 text-[11px]">{item.exampleBn}</p>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold">
                      {item.type}
                    </span>
                    <button
                      onClick={() => {
                        if (isLearned) {
                          unmarkVocabLearned(item.id);
                        } else {
                          markVocabLearned(item.id, item.lessonId);
                          soundFx.playCorrect();
                        }
                      }}
                      className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isLearned
                          ? 'bg-emerald-600 text-white font-bold'
                          : 'glass-btn-secondary'
                      }`}
                    >
                      <Check className="w-3 h-3" />
                      <span>{isLearned ? '✓ আয়ত্ত হয়েছে' : 'আয়ত্ত করুন (+10 XP)'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
