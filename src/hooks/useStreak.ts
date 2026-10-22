"use client";
import { useProgress } from "@/store/useProgress";

export function useStreak() {
  const { streak, lastActiveDate, updateStreak } = useProgress();

  return {
    streak,
    lastActive: lastActiveDate,
    isActiveToday: lastActiveDate === new Date().toISOString().split("T")[0],
    update: updateStreak,
  };
}
