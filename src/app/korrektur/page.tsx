"use client";
import { PracticeBanner as PageHeadingCard } from "@/components/ui/PracticeBanner";
import { PracticeFrame } from "@/components/ui/PracticeFrame";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Proofreading } from "@/components/learn/Korrekturlesen";
import { FileX2 } from "lucide-react";

export default function KorrekturPage() {
  return (
    <PageWrapper>
      <PageHeadingCard className="mb-5 px-4 py-4 sm:px-5 border-l-4 border-l-[var(--color-primary)] shadow-none">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-error-bg)] text-[var(--color-text-error)] flex items-center justify-center">
            <FileX2 className="w-5 h-5 text-[var(--color-text-error)]" />
          </div>
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Proofreading</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)] ml-[52px]">
          Find and fix grammatical errors in English sentences. Essential B2 exam practice.
        </p>
      </PageHeadingCard>
      <PracticeFrame illustration="none" layout="writing"><Proofreading /></PracticeFrame>
    </PageWrapper>
  );
}
