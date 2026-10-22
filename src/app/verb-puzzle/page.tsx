"use client";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { VerbPuzzle } from "@/components/learn/VerbPuzzle";
import { Puzzle, GitFork } from "lucide-react";

export default function VerbPuzzlePage() {
  return (
    <PageWrapper>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[#9B59B6] flex items-center justify-center">
            <Puzzle className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Verb-Puzzle</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)] ml-[52px]">
          Fill in the missing conjugation forms across all pronouns. Practice Pr\u00e4sens and Pr\u00e4teritum.
        </p>
      </div>
      <VerbPuzzle />
    </PageWrapper>
  );
}
