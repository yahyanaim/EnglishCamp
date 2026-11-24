import { learnerStorage } from "@/lib/learnerStorage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useProgress } from "./useProgress";
import { useErrors } from "./useErrors";
import { useVocabulary } from "./useVocabulary";
import { grammarLearnedCount, grammarLevelProgress } from "@/data/grammar-curriculum";

export type AchievementId = string;

export type Achievement = {
  id: AchievementId;
  title: string;
  description: string;
  icon: string;
  category: "streak" | "xp" | "exercises" | "vocab" | "quiz" | "errors" | "special" | "grammar" | "skills";
  condition: (state: {
    xp: number;
    streak: number;
    lessonsDone: number;
    exercisesDone: number;
    vocabCount: number;
    quizzesTaken: number;
    errorsFixed: number;
    cardsReviewed: number;
    grammarLearned: number;
    grammarLevels: string[];
    listeningDone: number;
    readingDone: number;
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
  { id: "grammar-1", title: "Rule Reader", description: "Learn your first grammar lesson", icon: "📘", category: "grammar", condition: (s) => s.grammarLearned >= 1 },
  { id: "grammar-10", title: "Grammar Explorer", description: "Learn 10 grammar lessons", icon: "🧭", category: "grammar", condition: (s) => s.grammarLearned >= 10 },
  { id: "grammar-25", title: "Grammar Builder", description: "Learn 25 grammar lessons", icon: "🧱", category: "grammar", condition: (s) => s.grammarLearned >= 25 },
  { id: "grammar-A1", title: "A1 Grammar Complete", description: "Learn every A1 grammar lesson", icon: "🥉", category: "grammar", condition: (s) => s.grammarLevels.includes("A1") },
  { id: "grammar-A2", title: "A2 Grammar Complete", description: "Learn every A2 grammar lesson", icon: "🥈", category: "grammar", condition: (s) => s.grammarLevels.includes("A2") },
  { id: "grammar-B1", title: "B1 Grammar Complete", description: "Learn every B1 grammar lesson", icon: "🥇", category: "grammar", condition: (s) => s.grammarLevels.includes("B1") },
  { id: "grammar-B2", title: "B2 Grammar Complete", description: "Learn every B2 grammar lesson", icon: "🏅", category: "grammar", condition: (s) => s.grammarLevels.includes("B2") },
  { id: "listening-5", title: "Good Listener", description: "Finish 5 listening lessons", icon: "🎧", category: "skills", condition: (s) => s.listeningDone >= 5 },
  { id: "listening-25", title: "Sharp Ears", description: "Finish 25 listening lessons", icon: "👂", category: "skills", condition: (s) => s.listeningDone >= 25 },
  { id: "reading-5", title: "Page Turner", description: "Finish 5 reading passages", icon: "📄", category: "skills", condition: (s) => s.readingDone >= 5 },
  { id: "reading-25", title: "Bookworm", description: "Finish 25 reading passages", icon: "🐛", category: "skills", condition: (s) => s.readingDone >= 25 },
];

type AchievementInputs = Parameters<Achievement["condition"]>[0];
const prefixed = (done: Record<string, boolean>, prefix: string) => Object.keys(done).filter(id => done[id] && id.startsWith(prefix)).length;
/** Inputs shared by unlocking and the progress bars on the Badges page. */
function achievementInputs(): AchievementInputs {
  const progress = useProgress.getState(), errors = useErrors.getState(), vocab = useVocabulary.getState(), done = progress.exercisesDone;
  return {
    xp: progress.xp,
    streak: progress.streak,
    lessonsDone: Object.values(progress.lessons).filter((l) => l.completed).length,
    exercisesDone: Object.values(done).filter(Boolean).length,
    vocabCount: vocab.getAll().length,
    quizzesTaken: Object.values(progress.quizResults).flat().length,
    errorsFixed: prefixed(done, "review-"),
    cardsReviewed: vocab.getAll().reduce((sum, [, v]) => sum + v.timesReviewed, 0),
    grammarLearned: grammarLearnedCount(done),
    grammarLevels: grammarLevelProgress(done).filter(level => level.complete).map(level => level.level),
    listeningDone: prefixed(done, "listening:"),
    readingDone: prefixed(done, "reading:"),
  };
}

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

function getAchievementProgress(id: string, state: AchievementInputs): { current: number; target: number } {
  const targets: Record<string, number> = {
    "first-login": 10, "xp-100": 100, "xp-500": 500, "xp-1000": 1000,
    "xp-2000": 2000, "xp-4000": 4000, "xp-7500": 7500,
    "streak-3": 3, "streak-7": 7, "streak-14": 14, "streak-30": 30,
    "lessons-5": 5, "lessons-20": 20, "lessons-50": 50,
    "exercises-25": 25, "exercises-100": 100, "exercises-250": 250,
    "vocab-10": 10, "vocab-50": 50, "vocab-200": 200,
    "quiz-1": 1, "quiz-10": 10, "quiz-perfect": 1,
    "errors-10": 10, "errors-50": 50, "review-50": 50,
    "grammar-1": 1, "grammar-10": 10, "grammar-25": 25,
    "listening-5": 5, "listening-25": 25, "reading-5": 5, "reading-25": 25,
  };
  const levels = grammarLevelProgress(useProgress.getState().exercisesDone);
  for (const level of levels) targets[`grammar-${level.level}`] = Math.max(1, level.total);
  const currents: Record<string, number> = {
    "first-login": state.xp, "xp-100": state.xp, "xp-500": state.xp, "xp-1000": state.xp,
    "xp-2000": state.xp, "xp-4000": state.xp, "xp-7500": state.xp,
    "streak-3": state.streak, "streak-7": state.streak, "streak-14": state.streak, "streak-30": state.streak,
    "lessons-5": state.lessonsDone, "lessons-20": state.lessonsDone, "lessons-50": state.lessonsDone,
    "exercises-25": state.exercisesDone, "exercises-100": state.exercisesDone, "exercises-250": state.exercisesDone,
    "vocab-10": state.vocabCount, "vocab-50": state.vocabCount, "vocab-200": state.vocabCount,
    "quiz-1": state.quizzesTaken, "quiz-10": state.quizzesTaken, "quiz-perfect": state.quizzesTaken,
    "errors-10": state.errorsFixed, "errors-50": state.errorsFixed, "review-50": state.cardsReviewed,
    "grammar-1": state.grammarLearned, "grammar-10": state.grammarLearned, "grammar-25": state.grammarLearned,
    "listening-5": state.listeningDone, "listening-25": state.listeningDone, "reading-5": state.readingDone, "reading-25": state.readingDone,
    ...Object.fromEntries(levels.map(level => [`grammar-${level.level}`, level.learned])),
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
        const state = { ...achievementInputs(), quizzesTaken: allQuizResults.length };

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
        const { current, target } = getAchievementProgress(id, achievementInputs());
        return { current, target, pct: Math.min(100, Math.round((current / target) * 100)) };
      },
    }),
    { name: "englishcamp-achievements", skipHydration: true, storage: createJSONStorage(() => learnerStorage) }
  )
);
