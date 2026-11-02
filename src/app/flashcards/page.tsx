"use client";
import { FLASHCARDS } from "@/data/flashcards";
import { LearningArt } from "@/components/brand/LearningArt";
import { PageBanner as PageHeadingCard } from "@/components/ui/PageBanner";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { FlashcardDeck } from "@/components/flashcard/FlashcardDeck";
import { Sparkles } from "lucide-react";

export default function FlashcardsPage() {
  return (
    <PageWrapper>
      <PageHeadingCard className="mb-5 px-4 py-4 sm:px-5 border-l-4 border-l-[var(--color-primary)] shadow-none">
        <div className="flex items-center gap-3 mb-1">
          <div className="inline-flex items-center justify-center w-8 h-8 rounded-[var(--radius-md)] bg-[var(--color-primary-subtle)]">
            <LearningArt name="Sparkles" className="w-4.5 h-4.5" />
          </div>
          <h1 className="font-display font-extrabold text-[var(--color-text-primary)]" style={{ fontSize: "24px" }}>Flashcards</h1>
        </div>
        <p className="font-body text-sm text-[var(--color-text-secondary)]">Build vocabulary with spaced repetition · {FLASHCARDS.length} cards across {new Set(FLASHCARDS.map(card => card.cat)).size} categories</p>
      </PageHeadingCard>
      <FlashcardDeck />
    </PageWrapper>
  );
}
