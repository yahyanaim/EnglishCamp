"use client";
import { useProgress } from "@/store/useProgress";
import type { BandId } from "@/data/types";

export function useQuiz(levelId: BandId) {
  const { getBestScore, recordQuizResult, getTotalXP } = useProgress();

  return {
    bestScore: getBestScore(levelId),
    recordResult: (score: number, xpEarned: number, answers: number[]) =>
      recordQuizResult(levelId, { score, xpEarned, takenAt: new Date().toISOString(), answers }),
    totalXP: getTotalXP(),
  };
}
