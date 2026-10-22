"use client";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { WordScramble } from "@/components/learn/Buchstabensalat";
import { Shuffle } from "lucide-react";

export default function BuchstabensalatPage() {
  return (
    <PageWrapper>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-2xl">🔀</span>
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Word Scramble</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Unscramble English words and build your vocabulary</p>
      </div>
      <WordScramble />
    </PageWrapper>
  );
}
