"use client";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { DaKompositaUebersetzer } from "@/components/learn/DaKompositaUebersetzer";
import { Link2 } from "lucide-react";

export default function DaKompositaUebersetzerPage() {
  return (
    <PageWrapper>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <Link2 className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Compound Adverbs Translator</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Translate formal compound adverbs (thereby, thereof, wherein...) with Arabic translations</p>
      </div>
      <DaKompositaUebersetzer />
    </PageWrapper>
  );
}
