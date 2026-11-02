"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeFrame } from "@/components/ui/PracticeFrame";
import { PracticeBanner as PageHeadingCard } from "@/components/ui/PracticeBanner";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { TopicVocabulary } from "@/components/learn/ThemenVokabeln";
import { BookText } from "lucide-react";

export default function TopicVocabularyPage() {
  return (
    <PageWrapper>
      <PageHeadingCard className="mb-5 px-4 py-4 sm:px-5 border-l-4 border-l-[var(--color-primary)] shadow-none">
        <div className="flex items-center gap-3 mb-1">
          <LearningArt name="BookText" className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Topic Vocabulary</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Learn topic vocabulary with translations in your language</p>
      </PageHeadingCard>
      <PracticeFrame illustration="none" layout="quiz"><TopicVocabulary /></PracticeFrame>
    </PageWrapper>
  );
}
