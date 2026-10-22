"use client";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ArtikelMeister } from "@/components/learn/ArtikelMeister";
import { Target } from "lucide-react";

export default function ArtikelMeisterPage() {
  return (
    <PageWrapper>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <Target className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Artikel-Meister</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Der, die oder das? Choose the correct article as fast as you can</p>
      </div>
      <ArtikelMeister />
    </PageWrapper>
  );
}
