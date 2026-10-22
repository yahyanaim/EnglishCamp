"use client";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { VergleicheUebersetzer } from "@/components/learn/VergleicheUebersetzer";
import { Scale } from "lucide-react";

export default function VergleicheUebersetzerPage() {
  return (
    <PageWrapper>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <Scale className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Comparisons Translator</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Translate comparison sentences between English and your language</p>
      </div>
      <VergleicheUebersetzer />
    </PageWrapper>
  );
}
