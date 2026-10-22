"use client";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PraeteritumUebersetzer } from "@/components/learn/PraeteritumUebersetzer";
import { Clock } from "lucide-react";

export default function PraeteritumUebersetzerPage() {
  return (
    <PageWrapper>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <Clock className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Past Tense Translator</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Translate narrative past sentences between English and your language</p>
      </div>
      <PraeteritumUebersetzer />
    </PageWrapper>
  );
}
