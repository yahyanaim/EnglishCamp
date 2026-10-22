"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { GRAMMAR_COMPARE_PAIRS } from "@/data/grammarCompare";
import { ArrowLeftRight, Lightbulb, ChevronDown, ChevronUp } from "lucide-react";

export default function GrammarComparePage() {
  const [activeId, setActiveId] = useState(GRAMMAR_COMPARE_PAIRS[0].id);
  const [showTip, setShowTip] = useState(true);

  const pair = GRAMMAR_COMPARE_PAIRS.find((p) => p.id === activeId) ?? GRAMMAR_COMPARE_PAIRS[0];

  return (
    <PageWrapper>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <ArrowLeftRight className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Grammar Comparison</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Compare commonly confused English grammar concepts side by side</p>
      </motion.div>

      <div className="flex flex-wrap gap-2 mt-6">
        {GRAMMAR_COMPARE_PAIRS.map((p) => (
          <button
            key={p.id}
            onClick={() => setActiveId(p.id)}
            className={`text-sm font-medium px-3 py-1.5 rounded-[var(--radius-lg)] transition-all ${
              activeId === p.id
                ? "bg-[var(--color-primary)] text-white shadow-sm"
                : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] border-2 border-[var(--color-border-default)] hover:ring-brand-200"
            }`}
          >
            {p.title}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={pair.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[var(--color-info)] text-white rounded-[var(--radius-lg)] ring-1 ring-blue-100 p-5">
              <h2 className="text-base font-bold text-[var(--color-info)] mb-2">{pair.conceptA}</h2>
              <p className="text-sm text-[var(--color-info)] leading-relaxed">{pair.explanation}</p>
            </div>
            <div className="bg-[var(--color-success)] text-white rounded-[var(--radius-lg)] p-5 border-2 border-[var(--color-success)]" style={{ boxShadow: "0 3px 0 #1a7a1a" }}>
              <h2 className="text-base font-display font-extrabold text-white mb-2">{pair.conceptB}</h2>
              <p className="text-sm text-white/80 leading-relaxed">{pair.explanation}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">Examples</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {pair.examples.map((ex, i) => (
                <div
                  key={i}
                  className={`rounded-[var(--radius-lg)] p-4 border-2 ${
                    ex.side === "a"
                      ? "bg-[var(--color-info)] text-white border-[var(--color-info)]"
                      : "bg-[var(--color-success)] text-white border-[var(--color-success)]"
                  }`}
                  style={{ boxShadow: ex.side === "a" ? "0 3px 0 #0a5c8a" : "0 3px 0 #1a7a1a" }}
                >
                  <p className={`text-sm font-semibold ${ex.side === "a" ? "text-white" : "text-white"}`}>
                    {ex.english}
                  </p>
                  <p className="text-xs text-white/70 italic font-arabic mt-1" lang="ar">{ex.arabic}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[var(--color-warning)] text-white rounded-[var(--radius-lg)] ring-1 ring-amber-100 p-4">
            <button onClick={() => setShowTip(!showTip)} className="flex items-center gap-2 text-sm font-semibold text-[var(--color-warning)]">
              <Lightbulb className="w-4 h-4" />
              Common Mistake
              {showTip ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            <AnimatePresence>
              {showTip && (
                <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  className="text-sm text-[var(--color-warning)] mt-2 overflow-hidden">
                  {pair.commonMistake}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>
    </PageWrapper>
  );
}
