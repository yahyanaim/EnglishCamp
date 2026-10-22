"use client";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ConnectorsChallenge } from "@/components/learn/KonjunktionenChallenge";
import { Link2 } from "lucide-react";

export default function ConnectorsChallengePage() {
  return (
    <PageWrapper>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <Link2 className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Connectors Challenge</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Choose the correct conjunction to complete each sentence</p>
      </div>
      <ConnectorsChallenge />
    </PageWrapper>
  );
}
