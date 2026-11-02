"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { useState } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ChevronLeft } from "lucide-react";
import { INDIREKTE_REDE_RULES, KONJUNKTIV_I_TABLE, DIREKT_INDIREKT_PAIRS } from "@/data/indirekte-rede";

export default function IndirekteRedePage() {
  const [selectedRule, setSelectedRule] = useState<string | null>(null);

  const rule = selectedRule ? INDIREKTE_REDE_RULES.find((r) => r.id === selectedRule) : null;

  if (rule) {
    return (
      <PageWrapper>
        <button onClick={() => setSelectedRule(null)} className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-6">
          <ChevronLeft className="w-4 h-4" /> Back to rules
        </button>

        <div className="bg-[var(--color-surface-alt)]    rounded-[var(--radius-lg)] border border-[var(--color-border-default)]/50 p-6 shadow-sm mb-6">
          <div className="flex items-center gap-4 mb-4">
            <LearningArt name={rule.icon} size={24} className="" />
            <div>
              <h2 className="text-xl font-bold text-[var(--color-text-primary)]">{rule.title}</h2>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">{rule.explanation}</p>
            </div>
          </div>
          <div className="bg-[var(--color-surface)]/60 rounded-[var(--radius-lg)] p-3 mt-2">
            <p className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">Formation</p>
            <p className="text-sm font-mono text-[var(--color-text-primary)]">{rule.formation}</p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {rule.examples.map((ex, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-4 shadow-sm"
            >
              <p className="text-sm font-mono font-medium text-[var(--color-text-primary)] mb-1 leading-relaxed">{ex.de}</p>
              {ex.en && ex.en !== ex.de && <p className="text-xs text-[var(--color-text-secondary)] italic">{ex.en}</p>}
              {ex.ar && <p className="text-xs text-[var(--color-text-secondary)] italic font-arabic mt-0.5" lang="ar">{ex.ar}</p>}
            </motion.div>
          ))}
        </div>

        {rule.subRules && (
          <div className="space-y-4">
            {rule.subRules.map((sr) => (
              <div key={sr.label} className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-4 shadow-sm">
                <h4 className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">{sr.label}</h4>
                <ul className="space-y-1">
                  {sr.items.map((item, i) => (
                    <li key={i} className="text-sm text-[var(--color-text-primary)] flex items-start gap-2">
                      <span className="text-[var(--color-primary)] mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Indirect Speech</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Tense backshift, questions, commands, and reporting verbs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {INDIREKTE_REDE_RULES.map((r, i) => (
            <motion.button
              key={r.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedRule(r.id)}
              className="text-left bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <LearningArt name={r.icon} size={24} className="" />
                <div>
                  <h3 className={`text-sm font-bold ${r.color} mb-0.5`}>{r.title}</h3>
                  <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2">{r.explanation}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-5 shadow-sm">
          <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-3">Tense Backshift Overview</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[var(--color-border-default)]">
                  <th className="text-left py-2 pr-3 font-semibold text-[var(--color-text-secondary)]">Direct Speech Tense</th>
                  <th className="text-left py-2 pr-3 font-semibold text-[var(--color-text-secondary)]">Reported Speech Tense</th>
                  <th className="text-left py-2 pr-3 font-semibold text-[var(--color-text-secondary)]">Direct Example</th>
                  <th className="text-left py-2 font-semibold text-[var(--color-text-secondary)]">Reported Example</th>
                </tr>
              </thead>
              <tbody>
                {KONJUNKTIV_I_TABLE.map((row, i) => (
                  <tr key={i} className="border-b border-[var(--color-border-default)] last:border-0">
                    <td className="py-2.5 pr-3 font-semibold text-[var(--color-text-secondary)]">{row.directTense}</td>
                    <td className="py-2.5 pr-3 font-mono font-bold text-[var(--color-text-link)]">→ {row.reportedTense}</td>
                    <td className="py-2.5 pr-3 font-mono text-[var(--color-text-primary)]">{row.directExample}</td>
                    <td className="py-2.5 font-mono text-[var(--color-text-primary)]">{row.reportedExample}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-5 shadow-sm">
          <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-3">Direct → Reported Speech Examples</h3>
          <div className="space-y-3">
            {DIREKT_INDIREKT_PAIRS.map((pair, i) => (
              <div key={i} className="pb-3 border-b border-[var(--color-border-default)] last:border-0 last:pb-0">
                <p className="text-sm font-mono text-[var(--color-text-secondary)] mb-0.5">{pair.direkt}</p>
                <p className="text-sm font-mono font-medium text-[var(--color-text-primary)]">→ {pair.indirekt}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
