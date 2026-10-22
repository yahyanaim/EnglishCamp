"use client";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ListeningLab } from "@/components/learn/ListeningLab";
import { Ear } from "lucide-react";

export default function ListeningLabPage() {
  return (
    <PageWrapper>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <Ear className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Listening Lab</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Hear English words and phrases, then choose the correct translation</p>
      </div>
      <ListeningLab />
    </PageWrapper>
  );
}
