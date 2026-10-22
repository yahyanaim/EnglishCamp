"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ChevronLeft } from "lucide-react";
import { PAST_PERFECT_RULES } from "@/data/plusquamperfekt";

export default function PastPerfectPage() {
  const [selectedRule, setSelectedRule] = useState<string | null>(null);

  const rule = selectedRule ? PAST_PERFECT_RULES.find((r) => r.id === selectedRule) : null;

  if (rule) {
    return (
      <PageWrapper>
        <button onClick={() => setSelectedRule(null)} className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-6">
          <ChevronLeft className="w-4 h-4" /> Back to rules
        </button>

        <div className="bg-gradient-to-br from-slate-50 to-[var(--color-info)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)]/50 p-6 shadow-sm mb-6">
          <div>
            <h2 className="text-xl font-bold text-[var(--color-text-primary)]">{rule.title}</h2>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">{rule.explanation}</p>
          </div>
          <div className="bg-[var(--color-surface)]/60 rounded-[var(--radius-lg)] p-3 mt-2">
            <p className="text-xs font-bold text-[var(--color-text-disabled)] uppercase tracking-wider mb-1">Formula</p>
            <p className="text-sm font-mono text-[var(--color-text-primary)]">{rule.formula}</p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {rule.examples.map((ex, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-4 shadow-sm"
            >
              <p className="text-sm font-mono font-medium text-[var(--color-text-primary)] mb-1 leading-relaxed">{ex.english}</p>
              <p className="text-xs text-[var(--color-text-disabled)] italic font-arabic" lang="ar">{ex.arabic}</p>
            </motion.div>
          ))}
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Past Perfect</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Past-before-the-past: tense sequences with after, before, and temporal relationships</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {PAST_PERFECT_RULES.map((r, i) => (
            <motion.button
              key={r.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedRule(r.id)}
              className="text-left bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-4 shadow-sm hover:shadow-md transition-all"
            >
              <div>
                <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-0.5">{r.title}</h3>
                <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2">{r.explanation}</p>
              </div>
            </motion.button>
          ))}
        </div>


      </div>
    </PageWrapper>
  );
}
