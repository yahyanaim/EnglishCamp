"use client";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { TensesQuiz } from "@/components/learn/TensesQuiz";
import { Clock } from "lucide-react";

export default function TensesQuizPage() {
  return (
    <PageWrapper>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <Clock className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Tenses Quiz</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Identify the tense of English sentences</p>
      </div>
      <TensesQuiz />
    </PageWrapper>
  );
}
