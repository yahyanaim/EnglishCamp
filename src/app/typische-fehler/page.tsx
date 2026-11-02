"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Search, X, ChevronDown, ChevronUp, Lightbulb, Filter } from "lucide-react";
import { MISTAKES } from "@/data/typische-fehler";

const CATEGORIES = Array.from(new Set(MISTAKES.map((m) => m.category)));

export default function TypischeFehlerPage() {
  const [search, setSearch] = useState("");
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let items = MISTAKES;
    if (activeCategory) {
      items = items.filter((m) => m.category === activeCategory);
    }
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.filter(
      (m) =>
        m.mistake.toLowerCase().includes(q) ||
        m.correct.toLowerCase().includes(q) ||
        m.explanation.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q)
    );
  }, [search, activeCategory]);

  const toggleCard = (id: string) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Common Mistakes</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">{MISTAKES.length} mistakes across {CATEGORIES.length} categories</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search mistakes..."
              className="w-full h-[52px] pl-11 pr-10 bg-[var(--color-surface)] rounded-[var(--radius-md)] border border-[var(--color-border-default)] text-[16px] font-body font-medium text-[var(--color-text-secondary)] placeholder:text-[var(--color-text-secondary)] placeholder:italic outline-none transition-all duration-150 focus:border-[#7E22CE] focus:shadow-[0_0_0_3px_rgba(126,34,206,0.15)]"
            />
            {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-[var(--color-text-secondary)] hover:text-[var(--color-text-secondary)]" /></button>}
          </div>
          {activeCategory && (
            <button onClick={() => setActiveCategory(null)} className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] hover:ring-[var(--color-text-disabled)] transition-all whitespace-nowrap">
              <X className="w-3 h-3" /> Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <Filter className="w-3.5 h-3.5 text-[var(--color-text-secondary)] shrink-0" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-pill)] text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-[var(--color-primary)] text-[var(--color-on-brand)] shadow-sm"
                  : "bg-[var(--color-surface)] border border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:ring-[var(--color-text-disabled)]"
              }`}
            >
              <span>{cat}</span>
              <span className={`text-[10px] ml-0.5 ${activeCategory === cat ? "text-white/60" : "text-[var(--color-text-secondary)]"}`}>
                {MISTAKES.filter((m) => m.category === cat).length}
              </span>
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {filtered.map((m) => {
            const isExpanded = expandedCards.has(m.id);
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] shadow-[0_2px_8px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.05)] border border-[var(--color-border-default)] overflow-hidden"
              >
                <button
                  onClick={() => toggleCard(m.id)}
                  className="w-full text-left p-4 hover:bg-[var(--color-surface-alt)]/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[var(--color-error-bg)] text-[var(--color-text-error)] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-3 h-3 text-[var(--color-text-error)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[var(--color-text-secondary)] mb-1">{m.category}</p>
                      <p className="text-sm font-mono text-[var(--color-text-secondary)] line-through mb-1.5">{m.mistake}</p>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-[var(--color-success-bg)] text-[var(--color-text-success)] flex items-center justify-center flex-shrink-0">
                          <span className="text-[8px] text-[var(--color-text-success)] font-bold">✓</span>
                        </div>
                        <p className="text-sm font-mono font-semibold text-[var(--color-text-primary)]">{m.correct}</p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 mt-1">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[var(--color-text-secondary)]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[var(--color-text-secondary)]" />
                      )}
                    </div>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-0 space-y-2 border-t border-[var(--color-border-default)]">
                        <div className="mt-2 p-3 bg-[var(--color-surface-alt)] rounded-[var(--radius-lg)]">
                          <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{m.explanation}</p>
                        </div>
                        <div className="p-3 bg-[var(--color-surface-alt)] rounded-[var(--radius-lg)]" lang="ar">
                          <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{m.explanationArabic}</p>
                        </div>
                        {m.tip && (
                          <div className="flex items-start gap-2 p-3 bg-[var(--color-warning-bg)] text-[var(--color-text-warning)] rounded-[var(--radius-lg)]">
                            <LearningArt name="Lightbulb" size={16} className="w-4 h-4 text-[var(--color-text-warning)] mt-0.5 shrink-0" />
                            <div>
                              <p className="text-[10px] font-semibold text-[var(--color-text-warning)] mb-0.5">Tip</p>
                              <p className="text-xs text-[var(--color-text-warning)] leading-relaxed">{m.tip}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <LearningArt name="🔍" size={36} className=" block mb-3" />
              <p className="text-sm font-medium text-[var(--color-text-secondary)]">No mistakes found</p>
              <button onClick={() => { setSearch(""); setActiveCategory(null); }} className="mt-2 text-xs text-[var(--color-primary)] hover:text-[var(--color-text-link)] font-semibold">
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
