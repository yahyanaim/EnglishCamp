"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { CONFUSED_PAIRS } from "@/data/wortpaare";
import { Search, X, ChevronDown, ArrowLeftRight } from "lucide-react";

export default function WortpaarePage() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const filtered = CONFUSED_PAIRS.filter(
    (p) =>
      !search.trim() ||
      p.word1.toLowerCase().includes(search.toLowerCase()) ||
      p.word2.toLowerCase().includes(search.toLowerCase()) ||
      p.meaning1.toLowerCase().includes(search.toLowerCase()) ||
      p.meaning2.toLowerCase().includes(search.toLowerCase())
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
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Word Pairs</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Easily confused English words — side by side</p>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search word pairs..."
            className="w-full h-[52px] pl-11 pr-10 bg-[var(--color-surface)] rounded-[var(--radius-md)] border border-[var(--color-border-default)] text-[16px] font-body font-medium text-[var(--color-text-secondary)] placeholder:text-[var(--color-text-secondary)] placeholder:italic outline-none transition-all duration-150 focus:border-[#7E22CE] focus:shadow-[0_0_0_3px_rgba(126,34,206,0.15)]"
          />
          {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-[var(--color-text-secondary)]" /></button>}
        </div>

        <div className="space-y-3">
          {filtered.map((pair) => {
            const open = expanded.has(pair.word1 + pair.word2);
            return (
              <motion.div key={pair.word1 + pair.word2} layout className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] shadow-[0_2px_8px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.05)] border border-[var(--color-border-default)] overflow-hidden" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
                <button onClick={() => toggle(pair.word1 + pair.word2)} className="w-full text-left p-5 hover:bg-[var(--color-surface-alt)] transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center gap-3 flex-shrink-0 mt-0.5">
                      <span className="text-lg font-bold text-[var(--color-text-link)] font-mono">{pair.word1}</span>
                      <LearningArt name="ArrowLeftRight" size={16} className="w-4 h-4 text-[var(--color-text-secondary)]" />
                      <span className="text-lg font-bold text-[var(--color-text-warning)] font-mono">{pair.word2}</span>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="bg-[var(--color-primary-subtle)] rounded-[var(--radius-lg)] p-4">
                            <p className="text-xs font-bold text-[var(--color-text-link)] mb-1 uppercase tracking-wider">{pair.word1}</p>
                            <p className="text-xs text-[var(--color-text-link)]/80">{pair.meaning1}</p>
                            <p className="text-xs text-[var(--color-text-link)]/80 font-arabic mt-0.5" lang="ar">{pair.arabic1}</p>
                          </div>
                          <div className="bg-[var(--color-warning-bg)] text-[var(--color-text-warning)] rounded-[var(--radius-lg)] p-4">
                            <p className="text-xs font-bold text-[var(--color-text-warning)] mb-1 uppercase tracking-wider">{pair.word2}</p>
                            <p className="text-xs text-[var(--color-text-warning)]/80">{pair.meaning2}</p>
                            <p className="text-xs text-[var(--color-text-warning)]/80 font-arabic mt-0.5" lang="ar">{pair.arabic2}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Examples</p>
                          <div className="flex items-start gap-3 bg-[var(--color-surface-alt)] rounded-[var(--radius-lg)] p-3">
                            <span className="text-xs font-bold text-[var(--color-text-link)] mt-0.5">{pair.word1}</span>
                            <div>
                              <p className="text-sm font-mono text-[var(--color-text-primary)]">{pair.example1}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 bg-[var(--color-surface-alt)] rounded-[var(--radius-lg)] p-3">
                            <span className="text-xs font-bold text-[var(--color-text-warning)] mt-0.5">{pair.word2}</span>
                            <div>
                              <p className="text-sm font-mono text-[var(--color-text-primary)]">{pair.example2}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-16"><LearningArt name="🔍" size={36} className=" block mb-3" /><p className="text-sm text-[var(--color-text-secondary)]">No word pairs found</p></div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
