"use client";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { IdiomMatch } from "@/components/learn/IdiomMatch";
import { Languages } from "lucide-react";

export default function IdiomMatchPage() {
  return (
    <PageWrapper>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-warning)] flex items-center justify-center">
            <Languages className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Idiom Match</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)] ml-[52px]">
          Match idioms to their English meanings. Master the colorful world of English expressions.
        </p>
      </div>
      <IdiomMatch />
    </PageWrapper>
  );
}
