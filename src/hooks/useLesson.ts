"use client";
import { useProgress } from "@/store/useProgress";

export function useLesson(lessonId: string) {
  const { isLessonDone, getLessonXP, completeLesson } = useProgress();

  return {
    isCompleted: isLessonDone(lessonId),
    xpEarned: getLessonXP(lessonId),
    complete: (xp: number) => completeLesson(lessonId, xp),
  };
}
