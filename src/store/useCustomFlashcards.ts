import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CustomCard {
  id: string;
  de: string;
  en: string;
  category: string;
  example?: string;
}

interface CustomFlashcardsStore {
  cards: CustomCard[];
  addCard: (card: Omit<CustomCard, "id">) => void;
  removeCard: (id: string) => void;
  updateCard: (id: string, data: Partial<CustomCard>) => void;
  getAll: () => CustomCard[];
  getByCategory: (cat: string) => CustomCard[];
  importFromVocab: () => void;
}

export const useCustomFlashcards = create<CustomFlashcardsStore>()(
  persist(
    (set, get) => ({
      cards: [],

      addCard: (card) => {
        const id = `custom-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
        set((s) => ({ cards: [...s.cards, { ...card, id }] }));
      },

      removeCard: (id) => {
        set((s) => ({ cards: s.cards.filter((c) => c.id !== id) }));
      },

      updateCard: (id, data) => {
        set((s) => ({
          cards: s.cards.map((c) => (c.id === id ? { ...c, ...data } : c)),
        }));
      },

      getAll: () => get().cards,
      getByCategory: (cat) => get().cards.filter((c) => c.category === cat),

      importFromVocab: () => {
        try {
          const raw = localStorage.getItem("englishcamp-vocabulary");
          if (!raw) return;
          const vocab = JSON.parse(raw);
          const existing = get().cards;
          const existingKeys = new Set(existing.map((c) => `${c.de}|${c.en}`));
          const newCards: CustomCard[] = [];
          for (const [, entry] of Object.entries(vocab.words || vocab) as any) {
            const w = entry as any;
            if (w.de && w.en && !existingKeys.has(`${w.de}|${w.en}`)) {
              newCards.push({
                id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
                de: w.de,
                en: w.en,
                category: w.category || "vocab",
              });
            }
          }
          if (newCards.length > 0) {
            set((s) => ({ cards: [...s.cards, ...newCards] }));
          }
        } catch {}
      },
    }),
    { name: "englishcamp-custom-flashcards", storage: createJSONStorage(() => localStorage) }
  )
);
