"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeFrame } from "@/components/ui/PracticeFrame";
import { PracticeBanner as PageHeadingCard } from "@/components/ui/PracticeBanner";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { VerbPuzzle } from "@/components/learn/VerbPuzzle";
import { Puzzle, GitFork } from "lucide-react";

export default function VerbPuzzlePage() {
  return (
    <PageWrapper>
      <PageHeadingCard className="mb-5 px-4 py-4 sm:px-5 border-l-4 border-l-[var(--color-primary)] shadow-none">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[#9B59B6] flex items-center justify-center">
            <LearningArt name="Puzzle" className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Verb-Puzzle</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)] ml-[52px]">
          Fill in the missing conjugation forms across all pronouns. Practice Pr\u00e4sens and Pr\u00e4teritum.
        </p>
      </PageHeadingCard>
      <PracticeFrame illustration="none" layout="matching"><VerbPuzzle /></PracticeFrame>
    </PageWrapper>
  );
}
