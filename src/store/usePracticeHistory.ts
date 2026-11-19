import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { learnerStorage } from "@/lib/learnerStorage";

/** Which Practice Hub trainers this learner opened, for "Continue" and the Practised mark. */
export type PracticeVisit = { opens: number; lastAt: string };
interface PracticeHistory {
  visits: Record<string, PracticeVisit>;
  open: (id: string) => void;
}
export const usePracticeHistory = create<PracticeHistory>()(persist(set => ({
  visits: {},
  open: id => set(s => ({ visits: { ...s.visits, [id]: { opens: (s.visits[id]?.opens ?? 0) + 1, lastAt: new Date().toISOString() } } })),
}), { name: "englishcamp-practice-history", version: 1, skipHydration: true, storage: createJSONStorage(() => learnerStorage) }));

export function lastPractice(visits: Record<string, PracticeVisit>) {
  return Object.entries(visits).sort(([, a], [, b]) => b.lastAt.localeCompare(a.lastAt))[0]?.[0] ?? null;
}
