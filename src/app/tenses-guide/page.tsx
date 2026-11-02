"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { TENSES_GUIDE, TENSE_GROUPS, TENSE_TIMELINES } from "@/data/tenses-guide";
import { ChevronDown, CheckCircle2 } from "lucide-react";

export default function TensesGuidePage() {
  const [activeTense, setActiveTense] = useState(TENSES_GUIDE[0].id);
  const [expanded, setExpanded] = useState<string | null>(null);

  const current = TENSES_GUIDE.find((t) => t.id === activeTense)!;

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Tenses Guide</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">English tenses explained — 12 tenses with examples and timelines</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {TENSES_GUIDE.map((t) => (
            <button key={t.id} onClick={() => setActiveTense(t.id)}
              className={`px-5 py-2.5 rounded-[var(--radius-pill)] text-sm font-display font-bold transition-all ${
                activeTense === t.id
                  ? "bg-[var(--color-primary)] text-[var(--color-on-brand)] shadow-[0_3px_0_var(--color-primary-dark)]"
                  : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-default)]"
              }`}
            >
              {t.icon} {t.tense}
            </button>
          ))}
        </div>

        <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
          <div className="flex items-center gap-3 mb-4">
            <LearningArt name={current.icon} size={24} className="" />
            <div>
              <h2 className="font-display text-xl font-extrabold text-[var(--color-text-primary)]">{current.tense}</h2>
              <p className="text-sm text-[var(--color-text-secondary)]">{current.formula}</p>
            </div>
          </div>

          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">{current.explanation}</p>
          {current.explanationAr && <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed font-arabic mb-6" lang="ar">{current.explanationAr}</p>}

          <div className="space-y-3 mb-6">
            <p className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider font-display">When to use</p>
            {current.whenToUse.map((u, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-text-success)] mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-[var(--color-text-secondary)]">{u}</p>
                  {current.whenToUseAr?.[i] && <p className="text-sm text-[var(--color-text-secondary)] font-arabic mt-0.5" lang="ar">{current.whenToUseAr[i]}</p>}
                </div>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <p className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 font-display">Timeline</p>
            <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] p-3 flex items-center gap-3">
              <LearningArt name="📅" size={24} className="" />
              <div>
                <p className="text-sm font-mono font-bold text-[var(--color-primary)]">{current.timelineLabel}</p>
                <p className="text-xs text-[var(--color-text-secondary)]">Temporal reference of this tense</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 font-display">Signal Words</p>
            <div className="flex flex-wrap gap-2">
              {current.signalWords.map((word) => (
                <span key={word} className="px-3 py-1.5 bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] text-xs font-mono font-bold rounded-[var(--radius-pill)]">
                  {word}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 font-display">Examples</p>
            <div className="space-y-2">
              {current.examples.map((ex, i) => (
                <div key={i} className="bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] p-3">
                  <p className="text-sm font-mono text-[var(--color-text-primary)]">{ex.en}</p>
                  {ex.ar && <p className="text-sm font-mono text-[var(--color-text-primary)] font-arabic" lang="ar">{ex.ar}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
          <h3 className="font-display font-bold text-[var(--color-text-primary)] mb-4">Timeline Overview</h3>
          <div className="space-y-2">
            {TENSE_TIMELINES.map((tl) => (
              <div key={tl.label} className="flex items-start gap-3 bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] p-3">
                <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] mt-1.5 shrink-0" />
                <div>
                  <p className="text-sm font-mono font-bold text-[var(--color-text-primary)]">{tl.label}</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">{tl.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {TENSE_GROUPS.map((group) => {
            const open = expanded === group.title;
            return (
              <motion.div key={group.title} layout className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] overflow-hidden" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
                <button onClick={() => setExpanded(open ? null : group.title)} className="w-full text-left p-5 hover:bg-[var(--color-surface-alt)] transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display font-bold text-[var(--color-text-primary)]">{group.title}</h3>
                      <p className="text-xs font-mono text-[var(--color-primary)] mt-1">{group.pattern}</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-[var(--color-text-secondary)] transition-transform ${open ? "rotate-180" : ""}`} />
                  </div>
                </button>
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-[var(--color-border-default)] pt-4">
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-[var(--color-border-default)]">
                                <th className="text-left py-2 px-3 text-[var(--color-text-secondary)] font-bold font-display">Tense</th>
                                <th className="text-left py-2 px-3 text-[var(--color-text-secondary)] font-bold font-display">Formula</th>
                                <th className="text-left py-2 px-3 text-[var(--color-text-secondary)] font-bold font-display">Example</th>
                              </tr>
                            </thead>
                            <tbody>
                              {group.tenses.map((row) => (
                                <tr key={row.tense} className="border-b border-[var(--color-border-default)]">
                                  <td className="py-2 px-3 font-bold text-[var(--color-primary)]">{row.tense}</td>
                                  <td className="py-2 px-3 font-mono text-[var(--color-text-primary)]">{row.formula}</td>
                                  <td className="py-2 px-3 font-mono text-[var(--color-text-secondary)]">{row.example}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </PageWrapper>
  );
}
