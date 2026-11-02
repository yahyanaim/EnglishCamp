"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeFrame } from "@/components/ui/PracticeFrame";
import { PracticeBanner as PageHeadingCard } from "@/components/ui/PracticeBanner";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { WordScramble } from "@/components/learn/Buchstabensalat";
import { Shuffle } from "lucide-react";

export default function BuchstabensalatPage() {
  return (
    <PageWrapper>
      <PageHeadingCard className="mb-5 px-4 py-4 sm:px-5 border-l-4 border-l-[var(--color-primary)] shadow-none">
        <div className="flex items-center gap-3 mb-1">
          <LearningArt name="🔀" size={24} className="" />
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Word Scramble</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Unscramble English words and build your vocabulary</p>
      </PageHeadingCard>
      <PracticeFrame illustration="none" layout="quiz"><WordScramble /></PracticeFrame>
    </PageWrapper>
  );
}
