"use client";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { TopicVocabulary } from "@/components/learn/ThemenVokabeln";
import { BookText } from "lucide-react";

export default function TopicVocabularyPage() {
  return (
    <PageWrapper>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <BookText className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Topic Vocabulary</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Learn topic vocabulary with translations in your language</p>
      </div>
      <TopicVocabulary />
    </PageWrapper>
  );
}
