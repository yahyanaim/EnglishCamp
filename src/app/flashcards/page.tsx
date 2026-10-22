"use client";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { FlashcardDeck } from "@/components/flashcard/FlashcardDeck";
import { Sparkles } from "lucide-react";

export default function FlashcardsPage() {
  return (
    <PageWrapper>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="inline-flex items-center justify-center w-8 h-8 rounded-[var(--radius-md)] bg-[var(--color-primary-subtle)]">
            <Sparkles className="w-4.5 h-4.5" style={{ color: "var(--color-primary-dark)" }} />
          </div>
          <h1 className="font-display font-extrabold text-[var(--color-text-primary)]" style={{ fontSize: "24px" }}>Flashcards</h1>
        </div>
        <p className="font-body text-sm text-[var(--color-text-secondary)]">Build vocabulary with spaced repetition — 430 cards across 20 categories</p>
      </div>
      <FlashcardDeck />
    </PageWrapper>
  );
}
