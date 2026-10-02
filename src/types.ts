export type JapaneseLevel = 'N5' | 'N4' | 'N3';

export type SectionType = 'vocab' | 'kanji' | 'grammar' | 'dialogue' | 'reading' | 'exercise' | 'notes';

export type LessonStatus = 'not-started' | 'in-progress' | 'partially-completed' | 'quiz-pending' | 'completed';

export interface VocabItem {
  id: string;
  lessonId: number;
  word: string;
  reading: string;
  romaji: string;
  english: string;
  bengali: string;
  exampleJp: string;
  exampleBn: string;
  type: 'NOUN' | 'VERB' | 'ADJECTIVE' | 'PARTICLE' | 'EXPRESSION' | 'ADVERB';
  tag?: 'USED' | 'BONUS' | 'CORE';
}

export interface KanjiItem {
  id: string;
  lessonId: number;
  kanji: string;
  meaningEn: string;
  meaningBn: string;
  onyomi: string;
  kunyomi: string;
  strokes: number;
  examples: {
    word: string;
    reading: string;
    meaningBn: string;
    meaningEn: string;
  }[];
  exampleSentenceJp?: string;
  exampleSentenceBn?: string;
}

export interface ParticleComparison {
  id: string;
  pair: string;
  particleA: string;
  particleB: string;
  titleBn: string;
  explanationBn: string;
  differenceBn: string;
  examples: {
    sentenceA: string;
    readingA: string;
    meaningBnA: string;
    sentenceB: string;
    readingB: string;
    meaningBnB: string;
    nuanceBn: string;
  }[];
}

export interface ParticleItem {
  id: string;
  symbol: string;
  romaji: string;
  nameBn: string;
  nameEn: string;
  summaryBn: string;
  coreUsageBn: string;
  structure: string;
  examples: {
    jp: string;
    reading: string;
    bn: string;
    en?: string;
    breakdownBn: string;
  }[];
  notesBn: string;
  commonMistakesBn: string;
  practiceQuestions: {
    questionJp: string;
    questionBn: string;
    options: string[];
    correctAnswer: string;
    explanationBn: string;
  }[];
}

export interface ParticleWordBreakdown {
  word: string;
  meaningBn: string;
  roleBn?: string;
}

export interface ParticleExampleItem {
  jp: string;
  hiragana: string;
  romaji: string;
  bn: string;
  en: string;
  breakdown: ParticleWordBreakdown[];
  particleFunctionNote: string;
  category: 'beginner' | 'daily' | 'natural';
}

export interface ParticleFunctionBranch {
  id: string;
  titleEn: string;
  titleBn: string;
  formula: string;
  descriptionBn: string;
  sampleSentence: string;
  sampleReading: string;
  sampleBn: string;
}

export interface ParticleMistake {
  incorrectJp: string;
  correctJp: string;
  whyIncorrectBn: string;
  correctReasonBn: string;
}

export interface ParticleVisualStory {
  titleBn: string;
  metaphor: string;
  diagram: string;
  explanationBn: string;
}

export interface DetailedParticle {
  id: string;
  symbol: string;
  hiragana: string;
  romaji: string;
  bengaliPronunciation: string;
  level: 'N5' | 'N4' | 'N3' | 'N2';
  nameBn: string;
  nameEn: string;
  primaryFunctionBn: string;
  summaryBn: string;

  // Core Meaning
  simpleMeaningBn: string;
  realFunctionBn: string;
  whenToUse: string[];
  whenNotToUse: string[];
  importantNotesBn: string;

  // Sentence Structure
  patternFormula: string;
  structureBreakdown: {
    token: string;
    roleEn: string;
    roleBn: string;
    color: 'indigo' | 'rose' | 'emerald' | 'amber' | 'cyan' | 'purple' | 'slate';
  }[];
  structureExplanationBn: string;

  // Function Map
  functionBranches: ParticleFunctionBranch[];

  // Real-life Examples (Categorized)
  beginnerExamples: ParticleExampleItem[];
  dailyExamples: ParticleExampleItem[];
  naturalExamples: ParticleExampleItem[];

  // Common Mistakes
  commonMistakes: ParticleMistake[];

  // Visual Story
  visualStory: ParticleVisualStory;

  // Quick Practice
  quickQuestions: {
    questionJp: string;
    questionBn: string;
    options: string[];
    correctAnswer: string;
    explanationBn: string;
  }[];

  // Original Guide Reference Sheets (From Uploaded Material)
  guideSheets?: ParticleOriginalGuideRef[];
}

export interface ParticleOriginalGuideRef {
  id: string;
  title: string;
  pageNumber: string;
  imageUrl: string;
  captionBn: string;
  summaryTopics: string[];
}

export interface DecisionTreeNode {
  id: string;
  questionBn: string;
  questionEn: string;
  descriptionBn?: string;
  options: {
    labelBn: string;
    nextStepId?: string;
    resultParticle?: string;
    explanationBn?: string;
    exampleJp?: string;
    exampleBn?: string;
  }[];
}

export interface AnalyzedSentenceItem {
  id: string;
  sentenceJp: string;
  reading: string;
  romaji: string;
  meaningBn: string;
  meaningEn: string;
  tokens: {
    text: string;
    isParticle: boolean;
    particleSymbol?: string;
    roleBn?: string;
    roleEn?: string;
    explanationBn?: string;
    color?: string;
  }[];
}

export interface LabSentenceQuestion {
  id: string;
  sentencePre: string;
  sentencePost: string;
  readingPre: string;
  readingPost: string;
  meaningBn: string;
  correctParticle: string;
  options: string[];
  explanations: Record<string, {
    isCorrect: boolean;
    reasonBn: string;
    alteredMeaningBn?: string;
  }>;
}

export interface TimeTimelineItem {
  timeLabel: string;
  particle: string;
  particleBn: string;
  usageBn: string;
  exampleJp: string;
  exampleBn: string;
  nuanceBn: string;
}

export interface SpeakingPhrase {
  id: string;
  lessonId: number;
  japanese: string;
  reading: string;
  romaji: string;
  bengali: string;
  english: string;
  category: 'greeting' | 'daily' | 'question' | 'shopping' | 'grammar' | 'travel' | 'introduction' | 'invitation' | 'request' | 'dining';
  tipsBn: string;
}

export interface GrammarRule {
  id: string;
  lessonId: number;
  ruleNumber: number;
  pattern: string;
  titleBn: string;
  titleEn: string;
  explanationBn: string;
  explanationEn: string;
  structure?: string;
  examples: {
    jp: string;
    bn: string;
    en?: string;
  }[];
  commonMistakes?: string;
  notes?: string;
}

export interface DialogueLine {
  id: string;
  speaker: string;
  avatar: string;
  japanese: string;
  reading: string;
  bengali: string;
  english: string;
}

export interface ExerciseQuestion {
  id: string;
  lessonId: number;
  type: 'multiple-choice' | 'fill-blank' | 'match' | 'order-sentence' | 'translation' | 'listening';
  questionJp: string;
  questionBn: string;
  audioText?: string;
  options?: string[];
  correctAnswer: string;
  sentenceWords?: string[];
  matchPairs?: { left: string; right: string }[];
  explanationBn: string;
  xpReward: number;
}

export interface LessonSummary {
  id: number;
  level: JapaneseLevel;
  title: string;
  titleBn: string;
  rulesCount: number;
  dialogueCount: number;
  vocabCount: number;
  kanjiCount: number;
  descriptionBn: string;
  isUnlocked: boolean;
}

export interface LessonProgress {
  lessonId: number;
  vocabLearned: string[];
  kanjiMastered: string[];
  grammarCompleted: string[];
  exercisesCompleted: string[];
  quizScore?: number;
  isCompleted: boolean;
  completedAt?: string;
}

export interface UserStats {
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  completedLessons: number[];
  lessonProgress?: Record<number, LessonProgress>;
  learnedVocabIds: string[];
  reviewVocabIds?: string[];
  masteredKanjiIds: string[];
  reviewKanjiIds?: string[];
  completedGrammarIds: string[];
  completedExerciseIds: string[];
  quizScores: Record<string, number>; // testId -> score percentage
}

export interface Achievement {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  icon: string;
  category: 'learning' | 'streak' | 'xp' | 'mastery';
  unlocked: boolean;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
  xpReward: number;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  xp: number;
  streak: number;
  level: number;
  completedLessons: number;
  badge: string;
  isCurrentUser?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  targetLevel: JapaneseLevel;
  dailyGoalMinutes: number;
  soundEnabled: boolean;
  bengaliEnabled: boolean;
  autoPlayAudio: boolean;
  stats: UserStats;
}
