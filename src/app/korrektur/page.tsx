"use client";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Proofreading } from "@/components/learn/Korrekturlesen";
import { FileX2 } from "lucide-react";

export default function KorrekturPage() {
  return (
    <PageWrapper>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-error)] text-white flex items-center justify-center">
            <FileX2 className="w-5 h-5 text-[var(--color-error)]" />
          </div>
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Proofreading</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)] ml-[52px]">
          Find and fix grammatical errors in English sentences. Essential B2 exam practice.
        </p>
      </div>
      <Proofreading />
    </PageWrapper>
  );
}
