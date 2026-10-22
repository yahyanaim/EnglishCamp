"use client";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { LandeskundeQuiz } from "@/components/learn/LandeskundeQuiz";
import { Globe } from "lucide-react";

export default function LandeskundeQuizPage() {
  return (
    <PageWrapper>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <Globe className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Culture Quiz</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Test your knowledge about English-speaking countries</p>
      </div>
      <LandeskundeQuiz />
    </PageWrapper>
  );
}
