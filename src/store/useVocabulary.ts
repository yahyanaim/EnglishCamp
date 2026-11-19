import { learnerStorage } from "@/lib/learnerStorage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type VocabEntry = {
  example?: string;
  definition?: string;
  translationKind?: "word" | "context";
  de: string;
  en: string;
  category: string;
  notes: string;
  addedAt: string;
  /** Last local change; used to merge the word bank across devices. */
  updatedAt?: string;
  timesReviewed: number;
  lastReview: string | null;
  mastery: 0 | 1 | 2 | 3;
};

interface VocabStore {
  words: Record<string, VocabEntry>;
  /** Dated deletions, so another device does not bring a removed word back. */
  removed: Record<string, string>;
  addWord: (de: string, en: string, category?: string, details?: Pick<VocabEntry,"example"|"definition"|"translationKind">) => void;
  removeWord: (id: string) => void;
  updateNotes: (id: string, notes: string) => void;
  updateMastery: (id: string, mastery: 0 | 1 | 2 | 3) => void;
  recordReview: (id: string) => void;
  getWord: (id: string) => VocabEntry | undefined;
  getByCategory: (cat: string) => [string, VocabEntry][];
  search: (q: string) => [string, VocabEntry][];
  getAll: () => [string, VocabEntry][];
  importWords: (words: [string, VocabEntry][]) => void;
  exportWords: () => string;
}

export function vocabId(de: string) {
  return de.toLowerCase().replace(/[^a-zäöüß]/g, "-");
}

export const useVocabulary = create<VocabStore>()(
  persist(
    (set, get) => ({
      words: {},
      removed: {},

      addWord: (de, en, category = "general", details = {}) => {
        const id = vocabId(de);
        const existing = get().words[id];
        const now = new Date().toISOString();
        if (existing) {
          const next = { ...existing, example: existing.example || details.example, definition: existing.definition || details.definition, translationKind: existing.translationKind || details.translationKind };
          if (next.example === existing.example && next.definition === existing.definition && next.translationKind === existing.translationKind) return;
          set(s => ({ words: { ...s.words, [id]: { ...next, updatedAt: now } } }));
          return;
        }
        set((s) => {
          const { [id]: _, ...removed } = s.removed;
          return { removed, words: { ...s.words, [id]: { de, en, category, ...details, notes: "", addedAt: now, updatedAt: now, timesReviewed: 0, lastReview: null, mastery: 0 } } };
        });
      },

      removeWord: (id) => {
        set((s) => {
          if (!s.words[id]) return s;
          const { [id]: _, ...rest } = s.words;
          return { words: rest, removed: { ...s.removed, [id]: new Date().toISOString() } };
        });
      },

      updateNotes: (id, notes) => {
        set((s) => {
          const w = s.words[id];
          if (!w) return s;
          return { words: { ...s.words, [id]: { ...w, notes, updatedAt: new Date().toISOString() } } };
        });
      },

      updateMastery: (id, mastery) => {
        set((s) => {
          const w = s.words[id];
          if (!w) return s;
          return { words: { ...s.words, [id]: { ...w, mastery, updatedAt: new Date().toISOString() } } };
        });
      },

      recordReview: (id) => {
        set((s) => {
          const w = s.words[id];
          if (!w) return s;
          return {
            words: {
              ...s.words,
              [id]: { ...w, timesReviewed: w.timesReviewed + 1, lastReview: new Date().toISOString(), updatedAt: new Date().toISOString() },
            },
          };
        });
      },

      getWord: (id) => get().words[id],
      getAll: () => Object.entries(get().words),

      getByCategory: (cat) =>
        Object.entries(get().words).filter(([, v]) => v.category === cat),

      search: (q) => {
        const lower = q.toLowerCase();
        return Object.entries(get().words).filter(
          ([, v]) =>
            v.de.toLowerCase().includes(lower) || v.en.toLowerCase().includes(lower)
        );
      },

      importWords: (words) => {
        set((s) => {
          const merged = { ...s.words }, removed = { ...s.removed }, now = new Date().toISOString();
          for (const [id, entry] of words) {
            merged[id] = { ...entry, updatedAt: now };
            delete removed[id];
          }
          return { words: merged, removed };
        });
      },

      exportWords: () => JSON.stringify(get().words, null, 2),
    }),
    { name: "englishcamp-vocabulary", skipHydration: true, storage: createJSONStorage(() => learnerStorage) }
  )
);
