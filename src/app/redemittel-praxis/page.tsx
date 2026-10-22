"use client";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { RedemittelPraxis } from "@/components/learn/RedemittelPraxis";
import { MessageSquare } from "lucide-react";

export default function RedemittelPraxisPage() {
  return (
    <PageWrapper>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <MessageSquare className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Phrases Practice</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Match useful English phrases to the right situation</p>
      </div>
      <RedemittelPraxis />
    </PageWrapper>
  );
}
