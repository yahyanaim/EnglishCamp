import { learnerStorage } from "@/lib/learnerStorage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface NotesStore {
  notes: Record<string, string>;
  bookmarks: Record<string, boolean>;
  setNote: (lessonId: string, text: string) => void;
  getNote: (lessonId: string) => string;
  toggleBookmark: (lessonId: string) => void;
  isBookmarked: (lessonId: string) => boolean;
  getAllBookmarks: () => string[];
}

export const useNotes = create<NotesStore>()(
  persist(
    (set, get) => ({
      notes: {},
      bookmarks: {},

      setNote: (lessonId, text) => {
        set((s) => ({ notes: { ...s.notes, [lessonId]: text } }));
      },

      getNote: (lessonId) => get().notes[lessonId] ?? "",

      toggleBookmark: (lessonId) => {
        set((s) => ({
          bookmarks: { ...s.bookmarks, [lessonId]: !s.bookmarks[lessonId] },
        }));
      },

      isBookmarked: (lessonId) => !!get().bookmarks[lessonId],

      getAllBookmarks: () =>
        Object.entries(get().bookmarks)
          .filter(([, v]) => v)
          .map(([k]) => k),
    }),
    { name: "englishcamp-notes", skipHydration: true, storage: createJSONStorage(() => learnerStorage) }
  )
);
