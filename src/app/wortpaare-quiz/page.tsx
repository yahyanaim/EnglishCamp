"use client";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { WordPairQuiz } from "@/components/learn/WortpaareQuiz";
import { Shuffle } from "lucide-react";

export default function WortpaareQuizPage() {
  return (
    <PageWrapper>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <Shuffle className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Word Pairs Quiz</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Choose the correct word (seit/für, wenn/als, etc.) with sentence context</p>
      </div>
      <WordPairQuiz />
    </PageWrapper>
  );
}
