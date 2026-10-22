"use client";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { DialogeUebersetzer } from "@/components/learn/DialogeUebersetzer";
import { MessageCircle } from "lucide-react";

export default function DialogeUebersetzerPage() {
  return (
    <PageWrapper>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <MessageCircle className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Dialogue Translator</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Translate real dialogue lines between English and your language</p>
      </div>
      <DialogeUebersetzer />
    </PageWrapper>
  );
}
