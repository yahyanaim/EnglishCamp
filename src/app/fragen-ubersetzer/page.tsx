"use client";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { FragenUebersetzer } from "@/components/learn/FragenUebersetzer";
import { HelpCircle } from "lucide-react";

export default function FragenUebersetzerPage() {
  return (
    <PageWrapper>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <HelpCircle className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Question Translator</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Translate questions between English and your language</p>
      </div>
      <FragenUebersetzer />
    </PageWrapper>
  );
}
