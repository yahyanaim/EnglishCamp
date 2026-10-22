"use client";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BriefeSchreiben } from "@/components/learn/BriefeSchreiben";
import { FileText } from "lucide-react";

export default function BriefeSchreibenPage() {
  return (
    <PageWrapper>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <FileText className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Letter Writing</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Practice writing formal and informal letters for the B2 exam</p>
      </div>
      <BriefeSchreiben />
    </PageWrapper>
  );
}
