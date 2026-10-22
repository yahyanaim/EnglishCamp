"use client";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SatzUebersetzer } from "@/components/learn/SatzUebersetzer";
import { ArrowLeftRight } from "lucide-react";

export default function SatzUebersetzerPage() {
  return (
    <PageWrapper>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <ArrowLeftRight className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Sentence Translator</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Translate full sentences between English and your language</p>
      </div>
      <SatzUebersetzer />
    </PageWrapper>
  );
}
