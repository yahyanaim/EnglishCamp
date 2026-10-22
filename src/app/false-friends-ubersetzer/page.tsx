"use client";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { FalseFriendsUebersetzer } from "@/components/learn/FalseFriendsUebersetzer";
import { AlertTriangle } from "lucide-react";

export default function FalseFriendsUebersetzerPage() {
  return (
    <PageWrapper>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <AlertTriangle className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">False Friends Translator</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Learn false friends — words that look similar but differ in meaning</p>
      </div>
      <FalseFriendsUebersetzer />
    </PageWrapper>
  );
}
