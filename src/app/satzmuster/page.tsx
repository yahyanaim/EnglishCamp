"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SENTENCE_PATTERNS } from "@/data/satzmuster";
import { Search, X, ChevronDown, Lightbulb } from "lucide-react";

const PATTERN_ICONS: Record<string, string> = {
  SVO: "📝",
  SVOO: "🎁",
  SVOC: "🎨",
  SVA: "📍",
  SVOA: "📦",
  "There + be": "❓",
  "It-cleft": "💡",
};

export default function SatzmusterPage() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const filtered = SENTENCE_PATTERNS.filter(
    (s) =>
      !search.trim() ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.formula.toLowerCase().includes(search.toLowerCase()) ||
      s.desc.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (id: string) => {
    setExpanded((prev) => {
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
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Sentence Patterns</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">English sentence structures with formulas and examples</p>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search sentence patterns..."
            className="w-full h-[52px] pl-11 pr-10 bg-[var(--color-surface)] rounded-[var(--radius-md)] border border-[var(--color-border-default)] text-[16px] font-body font-medium text-[var(--color-text-secondary)] placeholder:text-[var(--color-text-secondary)] placeholder:italic outline-none transition-all duration-150 focus:border-[var(--color-info)] focus:shadow-[0_0_0_3px_rgba(126,34,206,0.15)]"
          />
          {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-[var(--color-text-secondary)]" /></button>}
        </div>

        <div className="space-y-3">
          {filtered.map((pattern) => {
            const open = expanded.has(pattern.id);
            return (
              <motion.div key={pattern.id} layout className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] overflow-hidden" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
                <button onClick={() => toggle(pattern.id)} className="w-full text-left p-5 hover:bg-[var(--color-surface-alt)] transition-colors">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl mt-0.5">{PATTERN_ICONS[pattern.pattern] || "📐"}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold text-[var(--color-text-primary)]">{pattern.title}</h3>
                      <p className="text-xs font-mono mt-1 text-[var(--color-text-secondary)]">{pattern.formula}</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-[var(--color-text-secondary)] mt-1 transition-transform ${open ? "rotate-180" : ""}`} />
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
                      <div className="px-5 pb-5 space-y-4 border-t border-[var(--color-border-default)] pt-4">
                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{pattern.desc}</p>

                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Examples</p>
                          {pattern.examples.map((ex, i) => (
                            <div key={i} className="bg-[var(--color-primary-subtle)] rounded-[var(--radius-md)] p-3">
                              <p className="text-sm font-mono text-[var(--color-text-primary)]">{ex.english}</p>
                              <p className="text-xs text-[var(--color-text-secondary)] italic font-arabic mt-0.5" lang="ar">{ex.arabic}</p>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-start gap-2 p-3 bg-[var(--color-info-bg)] rounded-[var(--radius-md)]">
                          <LearningArt name="Lightbulb" size={16} className="w-4 h-4 text-[var(--color-info-dark)] mt-0.5 shrink-0" />
                          <p className="text-xs text-[var(--color-info-dark)] leading-relaxed">Pattern: {pattern.pattern} — {pattern.formula}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-16"><LearningArt name="🔍" size={36} className=" block mb-3" /><p className="text-sm text-[var(--color-text-secondary)]">No sentence patterns found</p></div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
