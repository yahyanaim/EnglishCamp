"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeFrame } from "@/components/ui/PracticeFrame";
import { PracticeBanner as PageHeadingCard } from "@/components/ui/PracticeBanner";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { IdiomMatch } from "@/components/learn/IdiomMatch";
import { Languages } from "lucide-react";

export default function IdiomMatchPage() {
  return (
    <PageWrapper>
      <PageHeadingCard className="mb-5 px-4 py-4 sm:px-5 border-l-4 border-l-[var(--color-primary)] shadow-none">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-warning-bg)] flex items-center justify-center">
            <LearningArt name="Languages" className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Idiom Match</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)] ml-[52px]">
          Match idioms to their English meanings. Master the colorful world of English expressions.
        </p>
      </PageHeadingCard>
      <PracticeFrame illustration="none" layout="matching"><IdiomMatch /></PracticeFrame>
    </PageWrapper>
  );
}
