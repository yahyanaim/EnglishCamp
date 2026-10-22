"use client";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { RedewendungenUebersetzer } from "@/components/learn/RewendungenUebersetzer";
import { Quote } from "lucide-react";

export default function RedewendungenUebersetzerPage() {
  return (
    <PageWrapper>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <Quote className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Idioms Translator</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Match idioms to their English meanings</p>
      </div>
      <RedewendungenUebersetzer />
    </PageWrapper>
  );
}
