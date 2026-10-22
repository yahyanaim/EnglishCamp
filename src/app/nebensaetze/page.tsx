"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ChevronLeft, Network } from "lucide-react";
import { NEBENSAETZE_RULES, NEBENSAETZE_WORTSTELLUNG } from "@/data/nebensaetze";

export default function NebensaetzePage() {
  const [selectedRule, setSelectedRule] = useState<string | null>(null);

  const rule = selectedRule ? NEBENSAETZE_RULES.find((r) => r.id === selectedRule) : null;

  if (rule) {
    return (
      <PageWrapper>
        <button onClick={() => setSelectedRule(null)} className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-6 font-body">
          <ChevronLeft className="w-4 h-4" /> Back to rules
        </button>

        <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 mb-6" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-3xl">{rule.icon}</span>
            <div>
              <h2 className="text-xl font-bold text-[var(--color-text-primary)] font-display">{rule.title}</h2>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1 font-body">{rule.explanation}</p>
            </div>
          </div>
          <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] p-3 mt-2">
            <p className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">Formation</p>
            <p className="text-sm font-mono text-[var(--color-text-primary)]">{rule.formation}</p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {rule.examples.map((ex, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-4"
              style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}
            >
              <p className="text-sm font-mono font-medium text-[var(--color-text-primary)] mb-1 leading-relaxed">{ex.de}</p>
              {ex.en && ex.en !== ex.de && <p className="text-xs text-[var(--color-text-secondary)] italic font-body">{ex.en}</p>}
              {ex.ar && <p className="text-xs text-[var(--color-text-secondary)] italic font-arabic mt-0.5" lang="ar">{ex.ar}</p>}
            </motion.div>
          ))}
        </div>

        {rule.subRules && (
          <div className="space-y-4">
            {rule.subRules.map((sr) => (
              <div key={sr.label} className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-4" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
                <h4 className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">{sr.label}</h4>
                <ul className="space-y-1">
                  {sr.items.map((item, i) => (
                    <li key={i} className="text-sm text-[var(--color-text-primary)] flex items-start gap-2 font-body">
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
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-primary-subtle)] text-lg">🔗</span>
            <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Complex Sentences & Clauses</h1>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)] font-body">Time, reason, purpose, concession, result, relative, and conditional clauses</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {NEBENSAETZE_RULES.map((r, i) => (
            <motion.button
              key={r.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedRule(r.id)}
              className="text-left bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-4 transition-all"
              style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{r.icon}</span>
                <div>
                  <h3 className={`text-sm font-bold ${r.color} mb-0.5 font-display`}>{r.title}</h3>
                  <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 font-body">{r.explanation}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-5" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
          <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-3 font-display">Word Order in Subordinate Clauses</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[var(--color-border-default)]">
                  <th className="text-left py-2 pr-4 font-semibold text-[var(--color-text-secondary)]">Type</th>
                  <th className="text-left py-2 font-semibold text-[var(--color-text-secondary)]">Example</th>
                </tr>
              </thead>
              <tbody>
                {NEBENSAETZE_WORTSTELLUNG.map((row, i) => (
                  <tr key={i} className="border-b border-[var(--color-border-default)] last:border-0">
                    <td className="py-2 pr-4 font-medium text-[var(--color-text-secondary)]">{row.type}</td>
                    <td className="py-2 font-mono text-[var(--color-text-primary)]">{row.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
