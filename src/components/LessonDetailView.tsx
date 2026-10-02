import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { lessonsData, lessonsList } from '../data/lessonsData';
import { playJapaneseAudio, stopJapaneseAudio, soundFx } from '../utils/audio';
import {
  FileText,
  MessageSquare,
  Languages,
  Bookmark,
  BookOpen,
  Volume2,
  CheckCircle2,
  Play,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  FolderDown,
  Target,
  Search,
  Check,
  Award,
} from 'lucide-react';
import { toBengaliNumber } from '../utils/vocabCategories';

export const LessonDetailView: React.FC = () => {
  const {
    activeLessonId,
    setActiveLessonId,
    activeLessonSection,
    setActiveLessonSection,
    setActiveTab,
    currentUser,
    markLessonComplete,
    markVocabLearned,
    markKanjiMastered,
    markGrammarCompleted,
    triggerConfetti,
    addXp,
  } = useApp();

  const lesson = lessonsData[activeLessonId] || lessonsData[1];
  const [vocabSearch, setVocabSearch] = useState('');
  const [vocabMode, setVocabMode] = useState<'list' | 'flashcard'>('list');
  const [activeFlashcardIndex, setActiveFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  // Kanji canvas drawing
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedKanjiIndex, setSelectedKanjiIndex] = useState(0);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Stop audio on unmount or section change
  useEffect(() => {
    return () => {
      stopJapaneseAudio();
    };
  }, [activeLessonId, activeLessonSection]);

  const sections = [
    { id: 'rules', labelBn: 'নিয়ম ও ব্যাকরণ', labelEn: 'Rules', icon: FileText, count: lesson.grammarRules.length },
    { id: 'conversation', labelBn: 'কথোপকথন', labelEn: 'Conversation', icon: MessageSquare, count: lesson.dialogue.length },
    { id: 'kanji', labelBn: 'কানজি', labelEn: 'Kanji', icon: Languages, count: lesson.kanji.length },
    { id: 'vocabulary', labelBn: 'শব্দভাণ্ডার', labelEn: 'Vocabulary', icon: Bookmark, count: lesson.vocabulary.length },
    { id: 'reading', labelBn: 'পড়া ও অনুচ্ছেদ', labelEn: 'Reading', icon: BookOpen },
    { id: 'materials', labelBn: 'ক্লাস ম্যাটেরিয়াল', labelEn: 'Class Material', icon: FolderDown },
    { id: 'quiz', labelBn: 'অনুশীলন ও কুইজ', labelEn: 'Quiz', icon: Target, count: lesson.exercises.length },
  ];

  // Filtered vocabulary
  const filteredVocab = lesson.vocabulary.filter(
    (v) =>
      v.word.toLowerCase().includes(vocabSearch.toLowerCase()) ||
      v.reading.toLowerCase().includes(vocabSearch.toLowerCase()) ||
      v.bengali.toLowerCase().includes(vocabSearch.toLowerCase()) ||
      v.english.toLowerCase().includes(vocabSearch.toLowerCase())
  );

  // Sequential audio player
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAutoPlaying && lesson.vocabulary.length > 0) {
      let idx = 0;
      const playNext = () => {
        if (idx < lesson.vocabulary.length) {
          const item = lesson.vocabulary[idx];
          playJapaneseAudio(item.reading || item.word);
          idx++;
          timer = setTimeout(playNext, 2400);
        } else {
          setIsAutoPlaying(false);
        }
      };
      playNext();
    }
    return () => {
      clearTimeout(timer);
      stopJapaneseAudio();
    };
  }, [isAutoPlaying, lesson.vocabulary]);

  // Canvas drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
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
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#6366f1';
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleAdvanceNextLesson = () => {
    if (activeLessonId < 25) {
      stopJapaneseAudio();
      setActiveLessonId(activeLessonId + 1);
      setActiveLessonSection('rules');
      setQuizSubmitted(false);
      setQuizAnswers({});
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isLessonCompleted = currentUser?.stats.completedLessons.includes(lesson.summary.id);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Header */}
      <div className="relative overflow-hidden rounded-3xl glass-panel p-6 sm:p-8 shadow-lg">
        {/* Japanese Watermark Glyph */}
        <div className="absolute right-4 -bottom-8 select-none pointer-events-none opacity-5 dark:opacity-10 text-[160px] sm:text-[220px] font-serif font-black text-indigo-500">
          {lesson.kanji[0]?.kanji || '語'}
        </div>

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold tracking-wider uppercase text-slate-400">
              <span className="cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" onClick={() => setActiveTab('lessons')}>
                NIHONOVA ACADEMY
              </span>
              <span>·</span>
              <span>LESSON {toBengaliNumber(lesson.summary.id)}</span>
              <span>·</span>
              <span className="px-2 py-0.5 rounded-full glass-pill text-indigo-600 dark:text-indigo-400">
                JLPT N5
              </span>
            </div>

            {/* Quick Switch Lesson Dropdown */}
            <div className="flex items-center space-x-2">
              <select
                value={activeLessonId}
                onChange={(e) => {
                  stopJapaneseAudio();
                  setActiveLessonId(Number(e.target.value));
                  setQuizSubmitted(false);
                  setQuizAnswers({});
                }}
                className="text-xs font-semibold glass-card rounded-xl px-3 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                {lessonsList.map((item) => (
                  <option key={item.id} value={item.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                    লেসন {toBengaliNumber(item.id)} ({item.title})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            {lesson.summary.titleBn}
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            {lesson.summary.descriptionBn}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            {isLessonCompleted ? (
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-xs border border-emerald-500/30">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>লেসন সম্পন্ন হয়েছে</span>
                </span>
                {activeLessonId < 25 && (
                  <button
                    onClick={handleAdvanceNextLesson}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl glass-btn-secondary font-semibold text-xs transition-all cursor-pointer"
                  >
                    <span>পরবর্তী লেসনে যান ({toBengaliNumber(activeLessonId + 1)})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  stopJapaneseAudio();
                  setActiveLessonSection('quiz');
                }}
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl glass-btn-primary text-xs font-semibold transition-all cursor-pointer"
              >
                <Target className="w-4 h-4 text-indigo-200" />
                <span>কুইজ সম্পন্ন করে লেসনটি পাস করুন</span>
              </button>
            )}
            <span className="text-xs text-slate-400 font-mono">
              {toBengaliNumber(lesson.vocabulary.length)} শব্দার্থ · {toBengaliNumber(lesson.grammarRules.length)} নিয়ম · {toBengaliNumber(lesson.kanji.length)} কানজি
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Navigation Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3">
        {sections.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeLessonSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => {
                stopJapaneseAudio();
                setActiveLessonSection(sec.id);
              }}
              className={`p-3 sm:p-3.5 rounded-2xl border text-left transition-all relative group flex flex-col justify-between cursor-pointer ${
                isActive
                  ? 'border-indigo-500 bg-indigo-500/15 shadow-sm ring-1 ring-indigo-500/30 text-indigo-600 dark:text-indigo-400'
                  : 'glass-card hover:border-indigo-500/40 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <Icon
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'
                  }`}
                />
                {sec.count !== undefined && (
                  <span
                    className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-300'
                        : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {toBengaliNumber(sec.count)}
                  </span>
                )}
              </div>
              <div>
                <p className="font-bold text-xs leading-snug">{sec.labelBn}</p>
                <p
                  className={`text-[10px] font-mono ${
                    isActive ? 'text-indigo-500 dark:text-indigo-300' : 'text-slate-400'
                  }`}
                >
                  {sec.labelEn}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: GRAMMAR RULES */}
      {activeLessonSection === 'rules' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>লেসন {toBengaliNumber(lesson.summary.id)} এর ব্যাকরণ ও বাক্য গঠনের নিয়ম</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono font-semibold">
              মোট {toBengaliNumber(lesson.grammarRules.length)}টি নিয়ম
            </span>
          </div>

          <div className="space-y-4">
            {lesson.grammarRules.map((rule) => {
              const isMastered = currentUser?.stats.completedGrammarIds.includes(rule.id);
              return (
                <div
                  key={rule.id}
                  className="p-5 sm:p-6 rounded-3xl glass-card space-y-3.5 transition-all shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/70 dark:border-white/10 pb-3">
                    <div className="flex items-center space-x-2.5">
                      <span className="w-7 h-7 rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center justify-center font-mono">
                        {toBengaliNumber(rule.ruleNumber)}
                      </span>
                      <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                        {rule.titleBn}
                      </h3>
                    </div>

                    <button
                      onClick={() => markGrammarCompleted(rule.id, lesson.summary.id)}
                      className={`flex items-center space-x-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isMastered
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                          : 'glass-btn-secondary text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{isMastered ? 'আয়ত্ত হয়েছে ✓' : 'আয়ত্ত করুন (+20 XP)'}</span>
                    </button>
                  </div>

                  {/* Formula Pattern Badge */}
                  <div className="p-3.5 rounded-2xl glass-panel flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        কাঠামো / প্যাটার্ন:
                      </span>
                      <span className="text-sm sm:text-base font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                        {rule.pattern}
                      </span>
                    </div>
                    {rule.structure && (
                      <span className="hidden sm:inline-block text-xs font-semibold text-slate-400 font-mono">
                        {rule.structure}
                      </span>
                    )}
                  </div>

                  {/* Explanation in Bengali */}
                  <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {rule.explanationBn}
                  </div>

                  {/* Examples */}
                  <div className="space-y-2 pt-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      বাস্তব জীবনের উদাহরণ বাক্য:
                    </p>
                    <div className="space-y-2">
                      {rule.examples.map((ex, i) => (
                        <div
                          key={i}
                          className="p-3.5 rounded-2xl glass-panel flex items-center justify-between"
                        >
                          <div className="space-y-1">
                            <p className="text-sm font-semibold text-slate-900 dark:text-white font-serif">
                              {ex.jp}
                            </p>
                            <p className="text-xs text-slate-600 dark:text-slate-400">
                              {ex.bn} · <span className="text-slate-400 font-mono">{ex.en}</span>
                            </p>
                          </div>
                          <button
                            onClick={() => playJapaneseAudio(ex.jp)}
                            className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                            title="উচ্চারণ শুনুন"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Common mistake or notes if available */}
                  {(rule.commonMistakes || rule.notes) && (
                    <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-700 dark:text-amber-300">
                      <span className="font-bold">সতর্কতা / বিশেষ দ্রষ্টব্য: </span>
                      {rule.commonMistakes || rule.notes}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 2: CONVERSATION */}
      {activeLessonSection === 'conversation' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>বাস্তব কথোপকথন ও ডায়লগ (Kaiwa)</span>
            </h2>
          </div>

          <div className="p-6 rounded-3xl glass-panel space-y-4 shadow-sm">
            {lesson.dialogue.map((dlg) => (
              <div
                key={dlg.id}
                className="flex items-start space-x-3.5 p-4 rounded-2xl glass-card hover:border-indigo-500/40 transition-all"
              >
                <div className="w-10 h-10 rounded-2xl glass-panel flex items-center justify-center text-lg shrink-0 border border-slate-200/60 dark:border-white/10">
                  {dlg.avatar || '👤'}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      {dlg.speaker}
                    </span>
                    <button
                      onClick={() => playJapaneseAudio(dlg.reading || dlg.japanese)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                      title="অডিও শুনুন"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-serif">
                    {dlg.japanese}
                  </p>
                  <p className="text-xs text-slate-400 font-mono">
                    {dlg.reading}
                  </p>
                  <div className="pt-1 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    বাংলা: {dlg.bengali}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    English: {dlg.english}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: KANJI */}
      {activeLessonSection === 'kanji' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Languages className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>লেসন {toBengaliNumber(lesson.summary.id)} এর কানজি ও হাতে লেখার অনুশীলন</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Kanji Character Details */}
            <div className="space-y-4">
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {lesson.kanji.map((k, idx) => (
                  <button
                    key={k.id}
                    onClick={() => {
                      setSelectedKanjiIndex(idx);
                      clearCanvas();
                    }}
                    className={`px-4 py-2.5 rounded-2xl font-bold text-lg transition-all cursor-pointer ${
                      selectedKanjiIndex === idx
                        ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                        : 'glass-card text-slate-700 dark:text-slate-300 hover:border-indigo-500/40'
                    }`}
                  >
                    {k.kanji}
                  </button>
                ))}
              </div>

              {lesson.kanji[selectedKanjiIndex] && (
                <div className="p-6 sm:p-7 rounded-3xl glass-panel space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline space-x-3">
                      <span className="text-6xl font-black text-indigo-600 dark:text-indigo-400 font-serif">
                        {lesson.kanji[selectedKanjiIndex].kanji}
                      </span>
                      <div>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">
                          {lesson.kanji[selectedKanjiIndex].meaningBn}
                        </p>
                        <p className="text-xs text-slate-400 font-mono">
                          {lesson.kanji[selectedKanjiIndex].meaningEn} · {toBengaliNumber(lesson.kanji[selectedKanjiIndex].strokes)} টি স্ট্রোক
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => markKanjiMastered(lesson.kanji[selectedKanjiIndex].id, lesson.summary.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 font-bold text-xs flex items-center space-x-1.5 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>শেখা হয়েছে (+15 XP)</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-2xl glass-card">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">ওন-ইওমি (চীনা পাঠ)</span>
                      <span className="font-bold text-sm text-slate-800 dark:text-slate-200 font-mono">
                        {lesson.kanji[selectedKanjiIndex].onyomi || '-'}
                      </span>
                    </div>
                    <div className="p-3.5 rounded-2xl glass-card">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">কুন-ইওমি (জাপানি পাঠ)</span>
                      <span className="font-bold text-sm text-slate-800 dark:text-slate-200 font-mono">
                        {lesson.kanji[selectedKanjiIndex].kunyomi || '-'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <p className="text-xs font-bold text-slate-400 uppercase">যৌগিক শব্দের উদাহরণ:</p>
                    <div className="space-y-1.5">
                      {lesson.kanji[selectedKanjiIndex].examples.map((ex, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 rounded-xl glass-card text-xs"
                        >
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white mr-2 font-serif">{ex.word}</span>
                            <span className="text-slate-400 font-mono">({ex.reading})</span>
                            <span className="text-slate-700 dark:text-slate-300 ml-2">— {ex.meaningBn}</span>
                          </div>
                          <button
                            onClick={() => playJapaneseAudio(ex.reading || ex.word)}
                            className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-1 cursor-pointer"
                            title="উচ্চারণ শুনুন"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Interactive Drawing Pad */}
            <div className="p-6 rounded-3xl glass-panel shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    🖌️ কানজি লেখার ড্রয়িং বোর্ড
                  </h3>
                  <button
                    onClick={clearCanvas}
                    className="flex items-center space-x-1 text-xs text-rose-500 hover:text-rose-600 font-semibold cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>মুছে ফেলুন</span>
                  </button>
                </div>
                <p className="text-xs text-slate-400 mb-3">
                  মাউস বা আঙুল দিয়ে নিচের গ্রিডে কানজি চরিত্রটি এঁকে প্র্যাকটিস করুন।
                </p>

                {/* Canvas Box with Grid Lines */}
                <div className="relative w-full aspect-square max-w-[320px] mx-auto rounded-3xl border-2 border-dashed border-slate-300 dark:border-white/20 glass-card overflow-hidden flex items-center justify-center">
                  {/* Subtle Grid guides */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="w-full h-px bg-slate-300/40 dark:bg-white/10"></div>
                  </div>
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="h-full w-px bg-slate-300/40 dark:bg-white/10"></div>
                  </div>
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10 select-none font-serif text-8xl text-indigo-500">
                    {lesson.kanji[selectedKanjiIndex]?.kanji}
                  </div>

                  <canvas
                    ref={canvasRef}
                    width={320}
                    height={320}
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

              <div className="mt-4 text-center">
                <button
                  onClick={() => {
                    addXp(10, 'Writing Practice');
                    clearCanvas();
                    soundFx.playCorrect();
                  }}
                  className="glass-btn-primary px-5 py-2 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  স্ট্রোক সম্পন্ন হয়েছে (+10 XP)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: VOCABULARY */}
      {activeLessonSection === 'vocabulary' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <Bookmark className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>লেসন {toBengaliNumber(lesson.summary.id)} এর শব্দভাণ্ডার (Vocabulary)</span>
              </h2>
              <p className="text-xs text-slate-400">
                বাংলা ও ইংরেজি অর্থসহ বিশুদ্ধ জাপানি অডিও উচ্চারণ
              </p>
            </div>

            {/* Mode Toggle & Auto Reader */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isAutoPlaying
                    ? 'bg-rose-500 text-white'
                    : 'glass-btn-secondary text-slate-700 dark:text-slate-300'
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isAutoPlaying ? 'থামান' : '▶ সব শুনুন'}</span>
              </button>

              <div className="flex rounded-xl glass-card p-1">
                <button
                  onClick={() => setVocabMode('list')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    vocabMode === 'list'
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  সব শব্দ
                </button>
                <button
                  onClick={() => setVocabMode('flashcard')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    vocabMode === 'flashcard'
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  ফ্ল্যাশকার্ড
                </button>
              </div>
            </div>
          </div>

          {/* Search box */}
          {vocabMode === 'list' && (
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="শব্দ, উচ্চারণ বা বাংলা অর্থ দিয়ে খুঁজুন..."
                value={vocabSearch}
                onChange={(e) => setVocabSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-card text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}

          {/* List View */}
          {vocabMode === 'list' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredVocab.map((v) => {
                const isLearned = currentUser?.stats.learnedVocabIds.includes(v.id);
                return (
                  <div
                    key={v.id}
                    className="p-4 sm:p-5 rounded-3xl glass-card space-y-2 hover:border-indigo-500/40 transition-all flex flex-col justify-between shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold glass-pill text-indigo-600 dark:text-indigo-400 font-mono">
                            {v.type}
                          </span>
                          {v.tag && (
                            <span className="px-2 py-0.5 text-[9px] rounded-full font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                              {v.tag}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => playJapaneseAudio(v.reading || v.word)}
                            className="p-1.5 rounded-xl text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                            title="উচ্চারণ শুনুন"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => markVocabLearned(v.id, lesson.summary.id)}
                            className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                              isLearned
                                ? 'text-emerald-500 bg-emerald-500/15'
                                : 'text-slate-400 hover:text-emerald-500 hover:bg-slate-100 dark:hover:bg-white/10'
                            }`}
                            title={isLearned ? 'মুখস্থ হয়েছে' : 'মুখস্থ হিসেবে চিহ্নিত করুন (+10 XP)'}
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-2">
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white font-serif">
                          {v.word}
                        </h4>
                        <p className="text-xs text-slate-400 font-mono">
                          {v.reading} · <span className="italic">{v.romaji}</span>
                        </p>
                      </div>

                      <div className="mt-2 pt-2 border-t border-slate-200/70 dark:border-white/10">
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          বাংলা: {v.bengali}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          English: {v.english}
                        </p>
                      </div>
                    </div>

                    {v.exampleJp && (
                      <div className="mt-2 p-2.5 rounded-xl glass-panel text-[11px] space-y-0.5">
                        <p className="font-semibold text-slate-800 dark:text-slate-200 font-serif">
                          {v.exampleJp}
                        </p>
                        <p className="text-slate-500 dark:text-slate-400">{v.exampleBn}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Flashcard Mode */}
          {vocabMode === 'flashcard' && lesson.vocabulary.length > 0 && (
            <div className="max-w-md mx-auto space-y-4 py-6">
              <div
                onClick={() => {
                  stopJapaneseAudio();
                  setIsFlipped(!isFlipped);
                }}
                className="w-full h-72 rounded-3xl glass-flashcard cursor-pointer flex flex-col items-center justify-center p-6 text-center select-none shadow-xl"
              >
                {!isFlipped ? (
                  <div className="space-y-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold glass-pill text-indigo-600 dark:text-indigo-400 uppercase">
                      জাপানি শব্দ
                    </span>
                    <h3 className="text-4xl font-black text-slate-900 dark:text-white font-serif">
                      {lesson.vocabulary[activeFlashcardIndex].word}
                    </h3>
                    <p className="text-sm text-slate-400 font-mono">
                      {lesson.vocabulary[activeFlashcardIndex].reading}
                    </p>
                    <p className="text-xs text-slate-400 pt-4">
                      অর্থ দেখতে কার্ডে ক্লিক করুন 🔄
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 animate-in fade-in zoom-in-95">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 uppercase">
                      বাংলা ও ইংরেজি অর্থ
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {lesson.vocabulary[activeFlashcardIndex].bengali}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {lesson.vocabulary[activeFlashcardIndex].english}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playJapaneseAudio(lesson.vocabulary[activeFlashcardIndex].reading);
                      }}
                      className="glass-btn-primary inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold shadow-md cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>উচ্চারণ শুনুন</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    stopJapaneseAudio();
                    setIsFlipped(false);
                    setActiveFlashcardIndex((prev) => Math.max(0, prev - 1));
                  }}
                  disabled={activeFlashcardIndex === 0}
                  className="p-2.5 rounded-xl glass-card disabled:opacity-30 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <span className="text-xs font-bold font-mono text-slate-400">
                  {toBengaliNumber(activeFlashcardIndex + 1)} / {toBengaliNumber(lesson.vocabulary.length)}
                </span>

                <button
                  onClick={() => {
                    stopJapaneseAudio();
                    markVocabLearned(lesson.vocabulary[activeFlashcardIndex].id, lesson.summary.id);
                    setIsFlipped(false);
                    if (activeFlashcardIndex < lesson.vocabulary.length - 1) {
                      setActiveFlashcardIndex((prev) => prev + 1);
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center space-x-1 cursor-pointer shadow-sm transition-all"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>মুখস্থ হয়েছে</span>
                </button>

                <button
                  onClick={() => {
                    stopJapaneseAudio();
                    setIsFlipped(false);
                    setActiveFlashcardIndex((prev) =>
                      Math.min(lesson.vocabulary.length - 1, prev + 1)
                    );
                  }}
                  disabled={activeFlashcardIndex === lesson.vocabulary.length - 1}
                  className="p-2.5 rounded-xl glass-card disabled:opacity-30 cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SECTION 5: READING */}
      {activeLessonSection === 'reading' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>{lesson.reading.titleBn} ({lesson.reading.titleJp})</span>
            </h2>
            <button
              onClick={() => playJapaneseAudio(lesson.reading.contentJp)}
              className="glass-btn-primary flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold shadow-md cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>পুরো অনুচ্ছেদ শুনুন</span>
            </button>
          </div>

          <div className="p-6 rounded-3xl glass-panel space-y-4 shadow-sm">
            <div className="p-4 rounded-2xl glass-card text-base sm:text-lg font-medium text-slate-900 dark:text-white leading-relaxed font-serif">
              {lesson.reading.contentJp}
            </div>

            <div className="p-4 rounded-2xl glass-card text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <p className="font-bold text-slate-900 dark:text-white mb-1">বাংলা অনুবাদ:</p>
              {lesson.reading.contentBn}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: CLASS MATERIALS */}
      {activeLessonSection === 'materials' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <FolderDown className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>ক্লাস ম্যাটেরিয়াল ও চিট-শীট (Lecture Sheet)</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-3xl glass-card space-y-2 shadow-sm">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                📄 লেসন {toBengaliNumber(lesson.summary.id)} ব্যাকরণ হ্যান্ডআউট (PDF)
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                সমস্ত ফর্মুলা, পার্টিকেলের ব্যবহার ও উদাহরণসহ ডাউনলোডযোগ্য লেকচার শিট।
              </p>
              <button
                onClick={() => soundFx.playClick()}
                className="mt-2 inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
              >
                <span>ভিউ ও সংরক্ষণ করুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-5 rounded-3xl glass-card space-y-2 shadow-sm">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                🎧 স্থানীয় জাপানি স্পিকারদের অডিও প্যাক
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                লেসনের সমস্ত ভোকাবুলারি ও ডায়লগ ন্যাটিভ স্পিকারদের নিখুঁত উচ্চারণে।
              </p>
              <button
                onClick={() => {
                  soundFx.playClick();
                  playJapaneseAudio(lesson.reading.contentJp);
                }}
                className="mt-2 inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
              >
                <span>অডিও শুনুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 7: QUIZ & EXERCISES */}
      {activeLessonSection === 'quiz' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Target className="w-5 h-5 text-emerald-500" />
              <span>লেসন {toBengaliNumber(lesson.summary.id)} এর কুইজ ও দক্ষতা যাচাই</span>
            </h2>
          </div>

          <div className="space-y-4">
            {lesson.exercises.map((ex, qIdx) => (
              <div
                key={ex.id}
                className="p-5 rounded-3xl glass-card space-y-3 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-slate-400">প্রশ্ন {toBengaliNumber(qIdx + 1)}</span>
                  <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400">
                    +{toBengaliNumber(ex.xpReward)} XP
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white font-serif">
                    {ex.questionJp}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{ex.questionBn}</p>
                </div>

                {/* Options */}
                {ex.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    {ex.options.map((opt) => {
                      const isSelected = quizAnswers[ex.id] === opt;
                      const isCorrect = opt === ex.correctAnswer;
                      let btnStyle = 'glass-panel hover:border-indigo-500/40 text-slate-800 dark:text-slate-200';

                      if (quizSubmitted) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-700 dark:text-rose-300';
                        }
                      } else if (isSelected) {
                        btnStyle = 'border-indigo-500 bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold ring-1 ring-indigo-500/30';
                      }

                      return (
                        <button
                          key={opt}
                          disabled={quizSubmitted}
                          onClick={() => {
                            setQuizAnswers((prev) => ({ ...prev, [ex.id]: opt }));
                            soundFx.playClick();
                          }}
                          className={`p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all cursor-pointer ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Show explanation when submitted */}
                {quizSubmitted && (
                  <div className="p-3.5 rounded-2xl glass-panel text-xs text-slate-700 dark:text-slate-300 mt-2">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">ব্যাখ্যা: </span>
                    {ex.explanationBn}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-2 text-center space-y-3">
              {!quizSubmitted ? (
                <button
                  onClick={() => {
                    setQuizSubmitted(true);
                    let score = 0;
                    lesson.exercises.forEach((ex) => {
                      if (quizAnswers[ex.id] === ex.correctAnswer) score++;
                    });
                    const pct = Math.round((score / Math.max(1, lesson.exercises.length)) * 100);
                    if (pct >= 60) {
                      markLessonComplete(lesson.summary.id, pct);
                      soundFx.playLevelUp();
                      triggerConfetti();
                    } else {
                      soundFx.playIncorrect();
                    }
                  }}
                  className="glass-btn-primary px-8 py-3 rounded-2xl font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  উত্তর যাচাই করুন ও ফলাফল দেখুন
                </button>
              ) : (
                <div className="space-y-4">
                  {(() => {
                    let score = 0;
                    lesson.exercises.forEach((ex) => {
                      if (quizAnswers[ex.id] === ex.correctAnswer) score++;
                    });
                    const pct = Math.round((score / Math.max(1, lesson.exercises.length)) * 100);
                    const isPassed = pct >= 60;

                    return (
                      <div className="p-6 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 max-w-md mx-auto space-y-3 shadow-lg">
                        <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                          <span>কুইজ ফলাফল</span>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                          {isPassed ? '🎉 লেসন সফলভাবে সম্পন্ন!' : 'কুইজ সম্পন্ন হয়নি'}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          আপনার স্কোর: <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono">{toBengaliNumber(pct)}%</span> ({toBengaliNumber(score)}/{toBengaliNumber(lesson.exercises.length)}টি সঠিক)।
                          {isPassed
                            ? ' অভিনন্দন! এই লেসনের দক্ষতা সফলভাবে অর্জিত হয়েছে।'
                            : ' লেসন সম্পন্ন করতে ন্যূনতম ৬০% স্কোর প্রয়োজন। আবার চেষ্টা করুন।'}
                        </p>

                        <div className="flex items-center justify-center gap-2 pt-2">
                          <button
                            onClick={() => {
                              setQuizSubmitted(false);
                              setQuizAnswers({});
                            }}
                            className="glass-btn-secondary px-4 py-2 rounded-xl font-bold text-xs cursor-pointer"
                          >
                            আবার চেষ্টা করুন
                          </button>

                          {isPassed && activeLessonId < 25 && (
                            <button
                              onClick={handleAdvanceNextLesson}
                              className="glass-btn-primary px-5 py-2 rounded-xl font-bold text-xs shadow-sm flex items-center space-x-1.5 cursor-pointer"
                            >
                              <span>পরবর্তী লেসন ({toBengaliNumber(activeLessonId + 1)})</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
