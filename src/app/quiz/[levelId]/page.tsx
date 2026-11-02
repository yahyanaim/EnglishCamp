"use client";
import { notFound } from "next/navigation";
import { levels } from "@/data/content";
import { QuizEngine } from "@/components/quiz/QuizEngine";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PracticeFrame } from "@/components/ui/PracticeFrame";

export default function QuizPage({ params }: { params: { levelId: string } }) {
  const level = levels.find((l) => l.id === params.levelId);
  if (!level) notFound();

  return (
    <PageWrapper>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-extrabold text-[var(--color-text-primary)] mb-1">{level.title} Quiz</h1>
        <p className="text-[var(--color-text-secondary)]">Test your knowledge of {level.subtitle}</p>
      </div>
      <PracticeFrame><QuizEngine levelId={level.id} /></PracticeFrame>
    </PageWrapper>
  );
}
