"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { PageBanner } from "@/components/ui/PageBanner";
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
      <PageBanner>
        <div className="flex items-center gap-3 mb-1">
          <LearningArt name="ArrowLeftRight" className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Grammar Comparison</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Compare commonly confused English grammar concepts side by side</p>
      </PageBanner>

      <div className="flex flex-wrap gap-2 mt-6">
        {GRAMMAR_COMPARE_PAIRS.map((p) => (
          <button
            key={p.id}
            onClick={() => setActiveId(p.id)}
            className={`text-sm font-medium px-3 py-1.5 rounded-[var(--radius-lg)] transition-all ${
              activeId === p.id
                ? "bg-[var(--color-primary)] text-[var(--color-on-brand)] shadow-sm"
                : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border-default)] hover:ring-brand-200"
            }`}
          >
            {p.title}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={pair.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="camp-grammar-comparison mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[var(--color-info-bg)] text-[var(--color-text-info)] rounded-[var(--radius-lg)] ring-1 ring-blue-100 p-5">
              <h2 className="text-base font-bold text-[var(--color-text-info)] mb-2">{pair.conceptA}</h2>
              <p className="text-sm text-[var(--color-text-primary)] leading-relaxed">{pair.examples.find(example => example.side === "a")?.english}</p>
            </div>
            <div className="bg-[var(--color-success-bg)] text-[var(--color-text-success)] rounded-[var(--radius-lg)] p-5 border border-[var(--color-success)]" >
              <h2 className="text-base font-display font-extrabold text-[var(--color-text-primary)] mb-2">{pair.conceptB}</h2>
              <p className="text-sm text-[var(--color-text-primary)] leading-relaxed">{pair.examples.find(example => example.side === "b")?.english}</p>
            </div>
          </div>

          <p className="camp-comparison-explanation">{pair.explanation}</p>
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">Examples</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {pair.examples.map((ex, i) => (
                <div
                  key={i}
                  className={`camp-comparison-example rounded-[var(--radius-lg)] p-4 border ${
                    ex.side === "a"
                      ? "bg-[var(--color-info-bg)] text-[var(--color-text-info)] border-[var(--color-info)]"
                      : "bg-[var(--color-success-bg)] text-[var(--color-text-success)] border-[var(--color-success)]"
                  }`}

                >
                  <p className={`text-sm font-semibold ${ex.side === "a" ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-primary)]"}`}>
                    {ex.english}
                  </p>
                  <p className="text-xs text-[var(--color-text-secondary)] italic font-arabic mt-1" lang="ar">{ex.arabic}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[var(--color-warning-bg)] text-[var(--color-text-warning)] rounded-[var(--radius-lg)] ring-1 ring-amber-100 p-4">
            <button onClick={() => setShowTip(!showTip)} className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-warning)]">
              <LearningArt name="Lightbulb" size={16} className="w-4 h-4" />
              Common Mistake
              {showTip ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            <AnimatePresence>
              {showTip && (
                <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  className="text-sm text-[var(--color-text-warning)] mt-2 overflow-hidden">
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
