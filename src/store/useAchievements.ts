import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useProgress } from "./useProgress";
import { useErrors } from "./useErrors";
import { useVocabulary } from "./useVocabulary";

export type AchievementId = string;

export type Achievement = {
  id: AchievementId;
  title: string;
  description: string;
  icon: string;
  category: "streak" | "xp" | "exercises" | "vocab" | "quiz" | "errors" | "special";
  condition: (state: {
    xp: number;
    streak: number;
    lessonsDone: number;
    exercisesDone: number;
    vocabCount: number;
    quizzesTaken: number;
    errorsFixed: number;
    cardsReviewed: number;
  }) => boolean;
};

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first-login", title: "First Steps", description: "Earn your first XP", icon: "🌱", category: "xp", condition: (s) => s.xp >= 10 },
  { id: "xp-100", title: "Dedicated Learner", description: "Earn 100 XP", icon: "📚", category: "xp", condition: (s) => s.xp >= 100 },
  { id: "xp-500", title: "Vocabulary Star", description: "Earn 500 XP", icon: "⭐", category: "xp", condition: (s) => s.xp >= 500 },
  { id: "xp-1000", title: "Grammar Hero", description: "Earn 1,000 XP", icon: "🦸", category: "xp", condition: (s) => s.xp >= 1000 },
  { id: "xp-2000", title: "Band 6 Achiever", description: "Earn 2,000 XP", icon: "⚔️", category: "xp", condition: (s) => s.xp >= 2000 },
  { id: "xp-4000", title: "Band 7 Achiever", description: "Earn 4,000 XP", icon: "🏆", category: "xp", condition: (s) => s.xp >= 4000 },
  { id: "xp-7500", title: "IELTS Master", description: "Earn 7,500 XP", icon: "👑", category: "xp", condition: (s) => s.xp >= 7500 },
  { id: "streak-3", title: "Getting Started", description: "3-day streak", icon: "🔥", category: "streak", condition: (s) => s.streak >= 3 },
  { id: "streak-7", title: "Week Warrior", description: "7-day streak", icon: "💪", category: "streak", condition: (s) => s.streak >= 7 },
  { id: "streak-14", title: "Fortnight Fire", description: "14-day streak", icon: "🔥", category: "streak", condition: (s) => s.streak >= 14 },
  { id: "streak-30", title: "Monthly Master", description: "30-day streak", icon: "🌟", category: "streak", condition: (s) => s.streak >= 30 },
  { id: "lessons-5", title: "Student", description: "Complete 5 lessons", icon: "📖", category: "exercises", condition: (s) => s.lessonsDone >= 5 },
  { id: "lessons-20", title: "Scholar", description: "Complete 20 lessons", icon: "📚", category: "exercises", condition: (s) => s.lessonsDone >= 20 },
  { id: "lessons-50", title: "Academic", description: "Complete 50 lessons", icon: "🎓", category: "exercises", condition: (s) => s.lessonsDone >= 50 },
  { id: "exercises-25", title: "Exercise Enthusiast", description: "Complete 25 exercises", icon: "✏️", category: "exercises", condition: (s) => s.exercisesDone >= 25 },
  { id: "exercises-100", title: "Practice Machine", description: "Complete 100 exercises", icon: "🤖", category: "exercises", condition: (s) => s.exercisesDone >= 100 },
  { id: "exercises-250", title: "Drill Master", description: "Complete 250 exercises", icon: "⚡", category: "exercises", condition: (s) => s.exercisesDone >= 250 },
  { id: "vocab-10", title: "Word Collector", description: "Add 10 words to vocabulary", icon: "📝", category: "vocab", condition: (s) => s.vocabCount >= 10 },
  { id: "vocab-50", title: "Lexicon Builder", description: "Add 50 words to vocabulary", icon: "📕", category: "vocab", condition: (s) => s.vocabCount >= 50 },
  { id: "vocab-200", title: "Walking Dictionary", description: "Add 200 words to vocabulary", icon: "📗", category: "vocab", condition: (s) => s.vocabCount >= 200 },
  { id: "quiz-1", title: "Quiz Rookie", description: "Take your first quiz", icon: "🧠", category: "quiz", condition: (s) => s.quizzesTaken >= 1 },
  { id: "quiz-10", title: "Quiz Veteran", description: "Take 10 quizzes", icon: "🎯", category: "quiz", condition: (s) => s.quizzesTaken >= 10 },
  { id: "quiz-perfect", title: "Perfect Score", description: "Get 100% on any quiz", icon: "💯", category: "quiz", condition: (s) => s.quizzesTaken >= 1 },
  { id: "errors-10", title: "Error Fixer", description: "Review 10 errors", icon: "🔧", category: "errors", condition: (s) => s.errorsFixed >= 10 },
  { id: "errors-50", title: "Bug Squasher", description: "Review 50 errors", icon: "🐛", category: "errors", condition: (s) => s.errorsFixed >= 50 },
  { id: "review-50", title: "Card Reviewer", description: "Review 50 flashcards", icon: "🃏", category: "vocab", condition: (s) => s.cardsReviewed >= 50 },
];

interface AchievementState {
  unlocked: Record<string, { unlockedAt: string }>;
  newlyUnlocked: string[];
  lastCheckedState: string;
}

interface AchievementActions {
  checkAndUnlock: () => string[];
  isUnlocked: (id: string) => boolean;
  getUnlocked: () => Achievement[];
  getLocked: () => Achievement[];
  dismissNew: (id: string) => void;
  dismissAllNew: () => void;
  getProgress: (id: string) => { current: number; target: number; pct: number };
}

function getAchievementProgress(id: string, state: { xp: number; streak: number; lessonsDone: number; exercisesDone: number; vocabCount: number; quizzesTaken: number; errorsFixed: number; cardsReviewed: number }): { current: number; target: number } {
  const targets: Record<string, number> = {
    "first-login": 10, "xp-100": 100, "xp-500": 500, "xp-1000": 1000,
    "xp-2000": 2000, "xp-4000": 4000, "xp-7500": 7500,
    "streak-3": 3, "streak-7": 7, "streak-14": 14, "streak-30": 30,
    "lessons-5": 5, "lessons-20": 20, "lessons-50": 50,
    "exercises-25": 25, "exercises-100": 100, "exercises-250": 250,
    "vocab-10": 10, "vocab-50": 50, "vocab-200": 200,
    "quiz-1": 1, "quiz-10": 10, "quiz-perfect": 1,
    "errors-10": 10, "errors-50": 50, "review-50": 50,
  };
  const currents: Record<string, number> = {
    "first-login": state.xp, "xp-100": state.xp, "xp-500": state.xp, "xp-1000": state.xp,
    "xp-2000": state.xp, "xp-4000": state.xp, "xp-7500": state.xp,
    "streak-3": state.streak, "streak-7": state.streak, "streak-14": state.streak, "streak-30": state.streak,
    "lessons-5": state.lessonsDone, "lessons-20": state.lessonsDone, "lessons-50": state.lessonsDone,
    "exercises-25": state.exercisesDone, "exercises-100": state.exercisesDone, "exercises-250": state.exercisesDone,
    "vocab-10": state.vocabCount, "vocab-50": state.vocabCount, "vocab-200": state.vocabCount,
    "quiz-1": state.quizzesTaken, "quiz-10": state.quizzesTaken, "quiz-perfect": state.quizzesTaken,
    "errors-10": state.errorsFixed, "errors-50": state.errorsFixed, "review-50": state.cardsReviewed,
  };
  return { current: currents[id] ?? 0, target: targets[id] ?? 1 };
}

export const useAchievements = create<AchievementState & AchievementActions>()(
  persist(
    (set, get) => ({
      unlocked: {},
      newlyUnlocked: [],
      lastCheckedState: "",

      checkAndUnlock: () => {
        const progress = useProgress.getState();
        const errors = useErrors.getState();
        const vocab = useVocabulary.getState();
        const quizResults = progress.quizResults;
        const allQuizResults = Object.values(quizResults).flat();
        const hasPerfectScore = allQuizResults.some((r) => r.score === 100);
        const errorsCount = errors.errors.length;
        const errorsFixed = errorsCount;
        const state = {
          xp: progress.xp,
          streak: progress.streak,
          lessonsDone: Object.values(progress.lessons).filter((l) => l.completed).length,
          exercisesDone: Object.values(progress.exercisesDone).filter(Boolean).length,
          vocabCount: vocab.getAll().length,
          quizzesTaken: allQuizResults.length,
          errorsFixed,
          cardsReviewed: vocab.getAll().reduce((sum, [, v]) => sum + v.timesReviewed, 0),
        };

        const now = new Date().toISOString();
        const newUnlocks: string[] = [];

        for (const ach of ACHIEVEMENTS) {
          if (get().unlocked[ach.id]) continue;
          if (ach.id === "quiz-perfect" && !hasPerfectScore) continue;
          if (ach.condition(state)) {
            set((s) => ({
              unlocked: { ...s.unlocked, [ach.id]: { unlockedAt: now } },
              newlyUnlocked: [...s.newlyUnlocked, ach.id],
            }));
            newUnlocks.push(ach.id);
          }
        }

        return newUnlocks;
      },

      isUnlocked: (id) => !!get().unlocked[id],

      getUnlocked: () => {
        const ids = Object.keys(get().unlocked);
        return ACHIEVEMENTS.filter((a) => ids.includes(a.id));
      },

      getLocked: () => {
        const ids = Object.keys(get().unlocked);
        return ACHIEVEMENTS.filter((a) => !ids.includes(a.id));
      },

      dismissNew: (id) => {
        set((s) => ({ newlyUnlocked: s.newlyUnlocked.filter((n) => n !== id) }));
      },

      dismissAllNew: () => {
        set({ newlyUnlocked: [] });
      },

      getProgress: (id) => {
        const progress = useProgress.getState();
        const errors = useErrors.getState();
        const vocab = useVocabulary.getState();
        const { current, target } = getAchievementProgress(id, {
          xp: progress.xp,
          streak: progress.streak,
          lessonsDone: Object.values(progress.lessons).filter((l) => l.completed).length,
          exercisesDone: Object.values(progress.exercisesDone).filter(Boolean).length,
          vocabCount: vocab.getAll().length,
          quizzesTaken: Object.values(progress.quizResults).flat().length,
          errorsFixed: errors.errors.length,
          cardsReviewed: vocab.getAll().reduce((sum, [, v]) => sum + v.timesReviewed, 0),
        });
        return { current, target, pct: Math.min(100, Math.round((current / target) * 100)) };
      },
    }),
    { name: "englishcamp-achievements", storage: createJSONStorage(() => localStorage) }
  )
);
