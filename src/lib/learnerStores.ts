import { useProgress } from "@/store/useProgress";
import { useAchievements } from "@/store/useAchievements";
import { useErrors } from "@/store/useErrors";
import { useVocabulary } from "@/store/useVocabulary";
import { useNotes } from "@/store/useNotes";
import { useCustomFlashcards } from "@/store/useCustomFlashcards";
import { useDailyChallenge } from "@/store/useDailyChallenge";
import { useGoals } from "@/store/useGoals";

let restoring = false;
export const isRestoringLearner = () => restoring;
export function restoreLearnerStores() {
  restoring = true;
  try {
  // Merge against each store's true initial state, never the previous learner's data.
  for (const store of [useProgress, useAchievements, useErrors, useVocabulary, useNotes, useCustomFlashcards, useDailyChallenge, useGoals]) {
    const initial = store.getInitialState();
    store.persist.setOptions({ merge: saved => ({ ...initial, ...(saved as object ?? {}) }) as never });
    void store.persist.rehydrate();
  }
  } finally { restoring = false; }
}
