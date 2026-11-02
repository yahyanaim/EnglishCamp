"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeFrame } from "@/components/ui/PracticeFrame";
import { PracticeBanner as PageHeadingCard } from "@/components/ui/PracticeBanner";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { VerbPrepUebersetzer } from "@/components/learn/VerbPrepUebersetzer";
import { ArrowLeftRight } from "lucide-react";

export default function VerbPrepUebersetzerPage() {
  return (
    <PageWrapper>
      <PageHeadingCard className="mb-5 px-4 py-4 sm:px-5 border-l-4 border-l-[var(--color-primary)] shadow-none">
        <div className="flex items-center gap-3 mb-1">
          <LearningArt name="ArrowLeftRight" className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Verbs with Prepositions</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Translate verbs with prepositions and their meanings</p>
      </PageHeadingCard>
      <PracticeFrame illustration="none" layout="quiz"><VerbPrepUebersetzer /></PracticeFrame>
    </PageWrapper>
  );
}
