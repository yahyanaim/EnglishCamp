"use client";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { NVVUebersetzer } from "@/components/learn/NVVUebersetzer";
import { BookMarked } from "lucide-react";

export default function NVVUebersetzerPage() {
  return (
    <PageWrapper>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <BookMarked className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">NVV Übersetzer</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Match Nomen-Verb-Verbindungen to their English meanings</p>
      </div>
      <NVVUebersetzer />
    </PageWrapper>
  );
}
