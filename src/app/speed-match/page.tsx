"use client";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SpeedMatch } from "@/components/learn/SpeedMatch";
import { Zap } from "lucide-react";

export default function SpeedMatchPage() {
  return (
    <PageWrapper>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <Zap className="w-6 h-6 text-[var(--color-warning)]" />
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Speed Match</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Match each English word with its Arabic meaning as fast as you can</p>
      </div>
      <SpeedMatch />
    </PageWrapper>
  );
}
