import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { UserProfile, Achievement, LeaderboardUser, LessonProgress } from '../types';
import { initialAchievements, initialLeaderboard } from '../data/gamificationData';
import { soundFx } from '../utils/audio';

interface AppContextType {
  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // Auth
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  signup: (name: string, email: string, pass: string) => boolean;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;

  // Gamification & Progress
  achievements: Achievement[];
  leaderboard: LeaderboardUser[];
  addXp: (amount: number, reason?: string) => void;
  markLessonComplete: (lessonId: number, score?: number) => void;
  updateLessonProgress: (lessonId: number, progress: Partial<LessonProgress>) => void;
  getLessonProgress: (lessonId: number) => LessonProgress;
  markVocabLearned: (vocabId: string, lessonId?: number) => void;
  unmarkVocabLearned: (vocabId: string) => void;
  toggleVocabReview: (vocabId: string) => void;
  markKanjiMastered: (kanjiId: string, lessonId?: number) => void;
  unmarkKanjiMastered: (kanjiId: string) => void;
  toggleKanjiReview: (kanjiId: string) => void;
  markGrammarCompleted: (grammarId: string, lessonId?: number) => void;
  saveQuizScore: (testId: string, scorePct: number) => void;
  triggerConfetti: () => void;

  // Current view navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeLessonId: number;
  setActiveLessonId: (id: number) => void;
  activeLessonSection: string;
  setActiveLessonSection: (section: string) => void;
}

const migrateKanjiId = (id: string): string => {
  const match = id.match(/^k(\d+)-(\d+)$/);
  if (match) {
    const lId = parseInt(match[1], 10);
    const kIdx = parseInt(match[2], 10);
    if (lId === 1) return `kanji-${kIdx}`;
    if (lId === 2) return `kanji-${6 + kIdx}`;
    if (lId === 3) return `kanji-${11 + kIdx}`;
    if (lId === 4) return `kanji-${15 + kIdx}`;
    if (lId === 5) return `kanji-${20 + kIdx}`;
  }
  return id;
};

const defaultUser: UserProfile = {
  id: 'usr-default',
  name: 'মোস্তফা কামাল',
  email: 'dhonivokto123@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop&crop=faces',
  targetLevel: 'N5',
  dailyGoalMinutes: 20,
  soundEnabled: true,
  bengaliEnabled: true,
  autoPlayAudio: false,
  stats: {
    xp: 0,
    level: 1,
    streak: 0,
    lastActiveDate: new Date().toISOString().split('T')[0],
    completedLessons: [],
    lessonProgress: {},
    learnedVocabIds: [],
    masteredKanjiIds: [],
    completedGrammarIds: [],
    completedExerciseIds: [],
    quizScores: {},
  },
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Dark mode (default to true to reflect the premium dark UI in screenshots 1 & 2)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('nihonova_dark_mode');
    return saved !== null ? saved === 'true' : true;
  });

  // Navigation
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [activeLessonId, setActiveLessonId] = useState<number>(1);
  const [activeLessonSection, setActiveLessonSection] = useState<string>('rules');

  // Auth & Profile
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('nihonova_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed?.stats?.masteredKanjiIds) {
          parsed.stats.masteredKanjiIds = parsed.stats.masteredKanjiIds.map(migrateKanjiId);
        }
        if (!parsed.stats.lessonProgress) {
          parsed.stats.lessonProgress = defaultUser.stats.lessonProgress;
        }
        return parsed;
      } catch {
        return defaultUser;
      }
    }
    return defaultUser;
  });

  // Achievements
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem('nihonova_achievements');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialAchievements;
      }
    }
    return initialAchievements;
  });

  // Leaderboard
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>(initialLeaderboard);

  // Sync dark mode class with DOM
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('nihonova_dark_mode', String(isDarkMode));
  }, [isDarkMode]);

  // Persist user
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('nihonova_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('nihonova_user');
    }
  }, [currentUser]);

  // Persist achievements
  useEffect(() => {
    localStorage.setItem('nihonova_achievements', JSON.stringify(achievements));
  }, [achievements]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.75 },
        colors: ['#ef4444', '#f59e0b', '#10b981', '#6366f1', '#ec4899'],
      });
    } catch {
      // ignore
    }
  };

  const addXp = (amount: number, reason?: string) => {
    if (!currentUser) return;
    const newXp = currentUser.stats.xp + amount;
    const newLevel = Math.max(1, Math.floor(newXp / 500) + 1);
    const leveledUp = newLevel > currentUser.stats.level;

    if (currentUser.soundEnabled) {
      if (leveledUp) {
        soundFx.playLevelUp();
        triggerConfetti();
      } else {
        soundFx.playCorrect();
      }
    }

    setCurrentUser({
      ...currentUser,
      stats: {
        ...currentUser.stats,
        xp: newXp,
        level: newLevel,
      },
    });

    // Update leaderboard current user entry
    setLeaderboard((prev) =>
      prev.map((item) =>
        item.isCurrentUser
          ? {
              ...item,
              xp: newXp,
              level: newLevel,
            }
          : item
      )
    );
  };

  const markLessonComplete = (lessonId: number, score: number = 100) => {
    if (!currentUser) return;
    const alreadyCompleted = currentUser.stats.completedLessons.includes(lessonId);
    const updatedLessons = alreadyCompleted
      ? currentUser.stats.completedLessons
      : [...currentUser.stats.completedLessons, lessonId];

    const prevProgress = currentUser.stats.lessonProgress?.[lessonId] || {
      lessonId,
      vocabLearned: [],
      kanjiMastered: [],
      grammarCompleted: [],
      exercisesCompleted: [],
      isCompleted: false,
    };

    const updatedProgress = {
      ...(currentUser.stats.lessonProgress || {}),
      [lessonId]: {
        ...prevProgress,
        isCompleted: true,
        quizScore: score,
        completedAt: new Date().toISOString(),
      },
    };

    if (!alreadyCompleted) {
      addXp(100, `Lesson ${lessonId} Completed`);
    }

    setCurrentUser({
      ...currentUser,
      stats: {
        ...currentUser.stats,
        completedLessons: updatedLessons,
        lessonProgress: updatedProgress,
      },
    });
  };

  const updateLessonProgress = (lessonId: number, progressUpdate: Partial<LessonProgress>) => {
    if (!currentUser) return;
    const prevProgress = currentUser.stats.lessonProgress?.[lessonId] || {
      lessonId,
      vocabLearned: [],
      kanjiMastered: [],
      grammarCompleted: [],
      exercisesCompleted: [],
      isCompleted: false,
    };

    const merged: LessonProgress = {
      ...prevProgress,
      ...progressUpdate,
      lessonId,
    };

    setCurrentUser({
      ...currentUser,
      stats: {
        ...currentUser.stats,
        lessonProgress: {
          ...(currentUser.stats.lessonProgress || {}),
          [lessonId]: merged,
        },
      },
    });
  };

  const getLessonProgress = (lessonId: number): LessonProgress => {
    return (
      currentUser?.stats.lessonProgress?.[lessonId] || {
        lessonId,
        vocabLearned: [],
        kanjiMastered: [],
        grammarCompleted: [],
        exercisesCompleted: [],
        isCompleted: currentUser?.stats.completedLessons.includes(lessonId) || false,
      }
    );
  };

  const markVocabLearned = (vocabId: string, lessonId?: number) => {
    if (!currentUser) return;
    if (currentUser.stats.learnedVocabIds.includes(vocabId)) return;

    const updated = [...currentUser.stats.learnedVocabIds, vocabId];
    addXp(10, 'Vocabulary Learned');

    let updatedLessonProgress = currentUser.stats.lessonProgress;
    if (lessonId) {
      const prev = currentUser.stats.lessonProgress?.[lessonId] || {
        lessonId,
        vocabLearned: [],
        kanjiMastered: [],
        grammarCompleted: [],
        exercisesCompleted: [],
        isCompleted: false,
      };
      if (!prev.vocabLearned.includes(vocabId)) {
        updatedLessonProgress = {
          ...(currentUser.stats.lessonProgress || {}),
          [lessonId]: {
            ...prev,
            vocabLearned: [...prev.vocabLearned, vocabId],
          },
        };
      }
    }

    setCurrentUser({
      ...currentUser,
      stats: {
        ...currentUser.stats,
        learnedVocabIds: updated,
        lessonProgress: updatedLessonProgress,
      },
    });
  };

  const unmarkVocabLearned = (vocabId: string) => {
    if (!currentUser) return;
    const updated = currentUser.stats.learnedVocabIds.filter((id) => id !== vocabId);
    setCurrentUser({
      ...currentUser,
      stats: {
        ...currentUser.stats,
        learnedVocabIds: updated,
      },
    });
  };

  const toggleVocabReview = (vocabId: string) => {
    if (!currentUser) return;
    const currentReviews = currentUser.stats.reviewVocabIds || [];
    const isReviewed = currentReviews.includes(vocabId);
    const updated = isReviewed
      ? currentReviews.filter((id) => id !== vocabId)
      : [...currentReviews, vocabId];

    setCurrentUser({
      ...currentUser,
      stats: {
        ...currentUser.stats,
        reviewVocabIds: updated,
      },
    });
  };

  const markKanjiMastered = (kanjiId: string, lessonId?: number) => {
    if (!currentUser) return;
    if (currentUser.stats.masteredKanjiIds.includes(kanjiId)) return;

    const updated = [...currentUser.stats.masteredKanjiIds, kanjiId];
    addXp(15, 'Kanji Mastered');

    let updatedLessonProgress = currentUser.stats.lessonProgress;
    if (lessonId) {
      const prev = currentUser.stats.lessonProgress?.[lessonId] || {
        lessonId,
        vocabLearned: [],
        kanjiMastered: [],
        grammarCompleted: [],
        exercisesCompleted: [],
        isCompleted: false,
      };
      if (!prev.kanjiMastered.includes(kanjiId)) {
        updatedLessonProgress = {
          ...(currentUser.stats.lessonProgress || {}),
          [lessonId]: {
            ...prev,
            kanjiMastered: [...prev.kanjiMastered, kanjiId],
          },
        };
      }
    }

    setCurrentUser({
      ...currentUser,
      stats: {
        ...currentUser.stats,
        masteredKanjiIds: updated,
        lessonProgress: updatedLessonProgress,
      },
    });
  };

  const unmarkKanjiMastered = (kanjiId: string) => {
    if (!currentUser) return;
    const updated = currentUser.stats.masteredKanjiIds.filter((id) => id !== kanjiId);
    setCurrentUser({
      ...currentUser,
      stats: {
        ...currentUser.stats,
        masteredKanjiIds: updated,
      },
    });
  };

  const toggleKanjiReview = (kanjiId: string) => {
    if (!currentUser) return;
    const currentReviews = currentUser.stats.reviewKanjiIds || [];
    const isReviewed = currentReviews.includes(kanjiId);
    const updated = isReviewed
      ? currentReviews.filter((id) => id !== kanjiId)
      : [...currentReviews, kanjiId];

    setCurrentUser({
      ...currentUser,
      stats: {
        ...currentUser.stats,
        reviewKanjiIds: updated,
      },
    });
  };

  const markGrammarCompleted = (grammarId: string, lessonId?: number) => {
    if (!currentUser) return;
    if (currentUser.stats.completedGrammarIds.includes(grammarId)) return;

    const updated = [...currentUser.stats.completedGrammarIds, grammarId];
    addXp(20, 'Grammar Rule Mastered');

    let updatedLessonProgress = currentUser.stats.lessonProgress;
    if (lessonId) {
      const prev = currentUser.stats.lessonProgress?.[lessonId] || {
        lessonId,
        vocabLearned: [],
        kanjiMastered: [],
        grammarCompleted: [],
        exercisesCompleted: [],
        isCompleted: false,
      };
      if (!prev.grammarCompleted.includes(grammarId)) {
        updatedLessonProgress = {
          ...(currentUser.stats.lessonProgress || {}),
          [lessonId]: {
            ...prev,
            grammarCompleted: [...prev.grammarCompleted, grammarId],
          },
        };
      }
    }

    setCurrentUser({
      ...currentUser,
      stats: {
        ...currentUser.stats,
        completedGrammarIds: updated,
        lessonProgress: updatedLessonProgress,
      },
    });
  };

  const saveQuizScore = (testId: string, scorePct: number) => {
    if (!currentUser) return;
    const earnedXp = Math.round(scorePct * 2);
    addXp(earnedXp, `Test ${testId} Score: ${scorePct}%`);

    setCurrentUser({
      ...currentUser,
      stats: {
        ...currentUser.stats,
        quizScores: {
          ...currentUser.stats.quizScores,
          [testId]: Math.max(currentUser.stats.quizScores[testId] || 0, scorePct),
        },
      },
    });
  };

  const login = (email: string, _pass: string) => {
    const newUser: UserProfile = {
      ...defaultUser,
      email,
      name: email.split('@')[0] || 'শিক্ষার্থী',
    };
    setCurrentUser(newUser);
    return true;
  };

  const signup = (name: string, email: string, _pass: string) => {
    const newUser: UserProfile = {
      ...defaultUser,
      id: `usr-${Date.now()}`,
      name: name || 'নতুন শিক্ষার্থী',
      email,
    };
    setCurrentUser(newUser);
    triggerConfetti();
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      ...updated,
    });
  };

  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        signup,
        logout,
        updateProfile,
        achievements,
        leaderboard,
        addXp,
        markLessonComplete,
        updateLessonProgress,
        getLessonProgress,
        markVocabLearned,
        unmarkVocabLearned,
        toggleVocabReview,
        markKanjiMastered,
        unmarkKanjiMastered,
        toggleKanjiReview,
        markGrammarCompleted,
        saveQuizScore,
        triggerConfetti,
        activeTab,
        setActiveTab,
        activeLessonId,
        setActiveLessonId,
        activeLessonSection,
        setActiveLessonSection,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
