"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeFrame } from "@/components/ui/PracticeFrame";
import { PracticeBanner as PageHeadingCard } from "@/components/ui/PracticeBanner";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { KnowledgeCheck } from "@/components/learn/KnowledgeCheck";
import { Brain } from "lucide-react";

export default function KnowledgeCheckPage() {
  return (
    <PageWrapper>
      <PageHeadingCard className="mb-5 px-4 py-4 sm:px-5 border-l-4 border-l-[var(--color-primary)] shadow-none">
        <div className="flex items-center gap-3 mb-1">
          <LearningArt name="Brain" className="w-6 h-6 text-[#9B59B6]" />
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Knowledge Check</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Mixed quiz across all topics — vocabulary, grammar, and verb skills</p>
      </PageHeadingCard>
      <PracticeFrame illustration="none" layout="quiz"><KnowledgeCheck /></PracticeFrame>
    </PageWrapper>
  );
}
