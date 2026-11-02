"use client";
import { Button } from "./shadcn/button";
import { useNotes } from "@/store/useNotes";
import { Bookmark } from "lucide-react";

export function BookmarkButton({ lessonId }: { lessonId: string }) {
  const { isBookmarked, toggleBookmark } = useNotes();
  const active = isBookmarked(lessonId);

  return (
    <Button variant="unstyled" size="unstyled"
      onClick={() => toggleBookmark(lessonId)}
      className={`font-body inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-[var(--radius-md)] border transition-all duration-200 ${
        active
          ? "bg-[var(--color-warning-bg)] text-[var(--color-text-warning)] border-[var(--color-warning)]"
          : "text-[var(--color-text-secondary)] border-[var(--color-border-default)] hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-text-primary)]"
      }`}
    >
      <Bookmark className={`w-3.5 h-3.5 ${active ? "fill-current" : ""}`} />
      {active ? "Bookmarked" : "Bookmark"}
    </Button>
  );
}
