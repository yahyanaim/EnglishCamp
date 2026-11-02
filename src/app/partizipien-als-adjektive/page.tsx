"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ChevronLeft } from "lucide-react";
import { PARTICIPLE_RULES } from "@/data/partizipien-als-adjektive";

export default function ParticiplesAsAdjectivesPage() {
  const [selectedRule, setSelectedRule] = useState<string | null>(null);

  const rule = selectedRule ? PARTICIPLE_RULES.find((r) => r.id === selectedRule) : null;

  if (rule) {
    return (
      <PageWrapper>
        <button onClick={() => setSelectedRule(null)} className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-6">
          <ChevronLeft className="w-4 h-4" /> Back to rules
        </button>

        <div className="bg-[var(--color-surface-alt)]    rounded-[var(--radius-lg)] border border-[var(--color-border-default)]/50 p-6 shadow-sm mb-6">
          <div>
            <h2 className="text-xl font-bold text-[var(--color-text-primary)]">{rule.title}</h2>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">{rule.explanation}</p>
          </div>
        </div>

        <div className="space-y-3 mb-8">
          {rule.examples.map((ex, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-4 shadow-sm"
            >
              <p className="text-sm font-mono font-medium text-[var(--color-text-primary)] leading-relaxed">{ex}</p>
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
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Participles as Adjectives</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Present participle (-ing), past participle (-ed/en), and extended participle phrases</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {PARTICIPLE_RULES.map((r, i) => (
            <motion.button
              key={r.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedRule(r.id)}
              className="text-left bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-4 shadow-sm hover:shadow-md transition-all"
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
