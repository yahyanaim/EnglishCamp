"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeFrame } from "@/components/ui/PracticeFrame";
import { PracticeBanner as PageHeadingCard } from "@/components/ui/PracticeBanner";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { RedemittelPraxis } from "@/components/learn/RedemittelPraxis";
import { MessageSquare } from "lucide-react";

export default function RedemittelPraxisPage() {
  return (
    <PageWrapper>
      <PageHeadingCard className="mb-5 px-4 py-4 sm:px-5 border-l-4 border-l-[var(--color-primary)] shadow-none">
        <div className="flex items-center gap-3 mb-1">
          <LearningArt name="MessageSquare" className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Phrases Practice</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Match useful English phrases to the right situation</p>
      </PageHeadingCard>
      <PracticeFrame illustration="none" layout="quiz"><RedemittelPraxis /></PracticeFrame>
    </PageWrapper>
  );
}
