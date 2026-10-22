import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type VocabEntry = {
  de: string;
  en: string;
  category: string;
  notes: string;
  addedAt: string;
  timesReviewed: number;
  lastReview: string | null;
  mastery: 0 | 1 | 2 | 3;
};

interface VocabStore {
  words: Record<string, VocabEntry>;
  addWord: (de: string, en: string, category?: string) => void;
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

      addWord: (de, en, category = "general") => {
        const id = vocabId(de);
        const existing = get().words[id];
        if (existing) return;
        set((s) => ({
          words: {
            ...s.words,
            [id]: { de, en, category, notes: "", addedAt: new Date().toISOString(), timesReviewed: 0, lastReview: null, mastery: 0 },
          },
        }));
      },

      removeWord: (id) => {
        set((s) => {
          const { [id]: _, ...rest } = s.words;
          return { words: rest };
        });
      },

      updateNotes: (id, notes) => {
        set((s) => {
          const w = s.words[id];
          if (!w) return s;
          return { words: { ...s.words, [id]: { ...w, notes } } };
        });
      },

      updateMastery: (id, mastery) => {
        set((s) => {
          const w = s.words[id];
          if (!w) return s;
          return { words: { ...s.words, [id]: { ...w, mastery } } };
        });
      },

      recordReview: (id) => {
        set((s) => {
          const w = s.words[id];
          if (!w) return s;
          return {
            words: {
              ...s.words,
              [id]: { ...w, timesReviewed: w.timesReviewed + 1, lastReview: new Date().toISOString() },
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
          const merged = { ...s.words };
          for (const [id, entry] of words) {
            merged[id] = entry;
          }
          return { words: merged };
        });
      },

      exportWords: () => JSON.stringify(get().words, null, 2),
    }),
    { name: "englishcamp-vocabulary", storage: createJSONStorage(() => localStorage) }
  )
);
