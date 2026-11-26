"use client";
import { use } from "react";
import { notFound } from "next/navigation";
import { levels } from "@/data/content";
import { QuizEngine } from "@/components/quiz/QuizEngine";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PracticeFrame } from "@/components/ui/PracticeFrame";
import { PracticeBanner } from "@/components/ui/PracticeBanner";
import { LearningArt } from "@/components/brand/LearningArt";

type QuizParams = { levelId: string };
export default function QuizPage({ params }: { params: QuizParams | Promise<QuizParams> }) {
  // Next.js 15+ hands client pages their params as a promise; the static build passes them resolved.
  const { levelId } = params instanceof Promise ? use(params) : params;
  const level = levels.find((l) => l.id === levelId);
  if (!level) notFound();

  return (
    <PageWrapper>
      <PracticeBanner className="mb-5 px-4 py-4 sm:px-5 border-l-4 border-l-[var(--color-primary)] shadow-none">
        <div className="flex items-center gap-3 mb-1">
          <LearningArt name="Trophy" className="w-6 h-6 text-[var(--color-text-warning)]" />
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">{level.title} Quiz</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Test your knowledge of {level.subtitle}</p>
      </PracticeBanner>
      <PracticeFrame><QuizEngine levelId={level.id} /></PracticeFrame>
    </PageWrapper>
  );
}
