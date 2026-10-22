"use client";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SatzmusterUebersetzer } from "@/components/learn/SatzmusterUebersetzer";
import { Layout } from "lucide-react";

export default function SatzmusterUebersetzerPage() {
  return (
    <PageWrapper>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <Layout className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Sentence Pattern Translator</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Translate sentence patterns between English and your language</p>
      </div>
      <SatzmusterUebersetzer />
    </PageWrapper>
  );
}
