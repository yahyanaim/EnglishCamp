"use client";
import { StudyJourney } from "@/components/learn/StudyJourney";
import { PageBanner } from "@/components/ui/PageBanner";
import { LearningArt } from "@/components/brand/LearningArt";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { STRATEGY_CATEGORIES } from "@/data/study-strategies";
import { ChevronDown, CheckCircle2, Lightbulb, ArrowRight } from "lucide-react";

export default function StudyStrategiesPage() {
  const [activeCategory, setActiveCategory] = useState(STRATEGY_CATEGORIES[0].id);
  const [expanded, setExpanded] = useState<string | null>(null);

  const current = STRATEGY_CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <PageWrapper>
      <div className="camp-strategies-page space-y-6">
        <PageBanner><h1>Study Strategies</h1><p>Choose a method, try it and return to what you learned.</p></PageBanner><StudyJourney/>

        <div className="flex gap-2 flex-wrap">
          {STRATEGY_CATEGORIES.map((cat) => (
            <button key={cat.id} aria-pressed={activeCategory === cat.id} onClick={() => { setActiveCategory(cat.id); setExpanded(null); }}
              className={`px-5 py-2.5 rounded-[var(--radius-pill)] text-sm font-display font-bold transition-all ${
                activeCategory === cat.id
                  ? "bg-[var(--color-primary)] text-[var(--color-on-brand)] shadow-[0_3px_0_var(--color-primary-dark)]"
                  : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-default)]"
              }`}
            >
              <LearningArt name={cat.icon} size={22}/> {cat.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="space-y-3">
            {current.strategies.map((strategy) => {
              const open = expanded === strategy.title;
              return (
                <motion.div key={strategy.title} layout className="bg-[var(--color-surface)] rounded-[var(--radius-lg)]  border border-[var(--color-border-default)] overflow-hidden" >
                  <button onClick={() => setExpanded(open ? null : strategy.title)} className="w-full text-left p-5 hover:bg-[var(--color-surface-alt)] transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-bold text-[var(--color-text-primary)]">{strategy.title}</h3>
                        {strategy.titleAr && <p className="text-xs font-arabic text-[var(--color-text-secondary)]" lang="ar">{strategy.titleAr}</p>}
                        <p className="text-xs text-[var(--color-text-secondary)] mt-1 leading-relaxed">{strategy.explanation}</p>
                        {strategy.explanationAr && <p className="text-xs text-[var(--color-text-secondary)] font-arabic mt-1 leading-relaxed" lang="ar">{strategy.explanationAr}</p>}
                      </div>
                      <ChevronDown className={`w-4 h-4 text-[var(--color-text-secondary)] mt-1 transition-transform shrink-0 ${open ? "rotate-180" : ""}`} />
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
                        <div className="px-5 pb-5 space-y-3 border-t border-[var(--color-border-default)] pt-4">
                          <p className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider font-display">Steps</p>
                          {strategy.steps.map((step, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[var(--color-text-success)] mt-0.5 shrink-0" />
                              <p className="text-sm text-[var(--color-text-secondary)]">{step}</p>
                              {strategy.stepsAr?.[i] && <p className="text-sm text-[var(--color-text-secondary)] font-arabic mt-0.5" lang="ar">{strategy.stepsAr[i]}</p>}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </PageWrapper>
  );
}
