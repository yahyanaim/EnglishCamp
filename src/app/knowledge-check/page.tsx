"use client";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { KnowledgeCheck } from "@/components/learn/KnowledgeCheck";
import { Brain } from "lucide-react";

export default function KnowledgeCheckPage() {
  return (
    <PageWrapper>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <Brain className="w-6 h-6 text-[#9B59B6]" />
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Knowledge Check</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Mixed quiz across all topics — vocabulary, grammar, and verb skills</p>
      </div>
      <KnowledgeCheck />
    </PageWrapper>
  );
}
