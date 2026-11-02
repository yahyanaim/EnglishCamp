"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeFrame } from "@/components/ui/PracticeFrame";
import { PracticeBanner as PageHeadingCard } from "@/components/ui/PracticeBanner";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SpeedMatch } from "@/components/learn/SpeedMatch";
import { Zap } from "lucide-react";

export default function SpeedMatchPage() {
  return (
    <PageWrapper>
      <PageHeadingCard className="mb-5 px-4 py-4 sm:px-5 border-l-4 border-l-[var(--color-primary)] shadow-none">
        <div className="flex items-center gap-3 mb-1">
          <LearningArt name="Zap" className="w-6 h-6 text-[var(--color-text-warning)]" />
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Speed Match</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Match each English word with its Arabic meaning as fast as you can</p>
      </PageHeadingCard>
      <PracticeFrame illustration="none" layout="matching"><SpeedMatch /></PracticeFrame>
    </PageWrapper>
  );
}
