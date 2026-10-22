"use client";
import { useProgress } from "@/store/useProgress";

export function useFlashcard(cardId: string) {
  const { markCardSeen, getCardSeenCount } = useProgress();

  return {
    seenCount: getCardSeenCount(cardId),
    markSeen: () => markCardSeen(cardId),
  };
}
