"use client";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { VerbPrepUebersetzer } from "@/components/learn/VerbPrepUebersetzer";
import { ArrowLeftRight } from "lucide-react";

export default function VerbPrepUebersetzerPage() {
  return (
    <PageWrapper>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <ArrowLeftRight className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Verbs with Prepositions</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Translate verbs with prepositions and their meanings</p>
      </div>
      <VerbPrepUebersetzer />
    </PageWrapper>
  );
}
