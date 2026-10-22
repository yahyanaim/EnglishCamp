"use client";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Sprint } from "@/components/learn/Sprint";
import { Zap } from "lucide-react";

export default function SprintPage() {
  return (
    <PageWrapper>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <Zap className="w-6 h-6 text-[var(--color-warning)]" />
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Sprint</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Answer as many English questions as you can in 60 seconds</p>
      </div>
      <Sprint />
    </PageWrapper>
  );
}
