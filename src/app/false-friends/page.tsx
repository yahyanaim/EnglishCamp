"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { FALSE_FRIENDS } from "@/data/false-friends";
import { Search, X, ChevronDown, Lightbulb, AlertTriangle } from "lucide-react";

export default function FalseFriendsPage() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const filtered = FALSE_FRIENDS.filter(
    (f) =>
      !search.trim() ||
      f.word1.toLowerCase().includes(search.toLowerCase()) ||
      f.word2.toLowerCase().includes(search.toLowerCase()) ||
      f.meaning1.toLowerCase().includes(search.toLowerCase()) ||
      f.meaning2.toLowerCase().includes(search.toLowerCase())
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
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Confusing English Words</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">English word pairs that Arabic speakers often confuse</p>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search word pairs..."
            className="w-full h-[52px] pl-11 pr-10 bg-[var(--color-surface)] rounded-[var(--radius-md)] border border-[var(--color-border-default)] text-[16px] font-body font-medium text-[var(--color-text-secondary)] placeholder:text-[var(--color-text-secondary)] placeholder:italic outline-none transition-all duration-150 focus:border-[var(--color-info)] focus:shadow-[0_0_0_3px_rgba(126,34,206,0.15)]"
          />
          {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-[var(--color-text-secondary)]" /></button>}
        </div>

        <div className="space-y-3">
          {filtered.map((entry) => {
            const open = expanded.has(entry.id);
            return (
              <motion.div key={entry.id} layout className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] overflow-hidden" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
                <button onClick={() => toggle(entry.id)} className="w-full text-left p-5 hover:bg-[var(--color-surface-alt)] transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center gap-3 flex-shrink-0 mt-0.5">
                      <span className="text-xl font-extrabold text-[var(--color-primary)] font-display">{entry.word1}</span>
                      <AlertTriangle className="w-4 h-4 text-[var(--color-text-error)]" />
                      <span className="text-lg font-display font-extrabold text-[var(--color-text-error)] font-mono">{entry.word2}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{entry.meaning1} ↔ {entry.meaning2}</p>
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
                      <div className="px-5 pb-5 space-y-4 border-t border-[var(--color-border-default)] pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="bg-[var(--color-info-bg)] rounded-[var(--radius-md)] p-4">
                            <p className="text-xs font-bold text-[var(--color-text-info)] mb-1 uppercase tracking-wider">{entry.word1}</p>
                            <p className="text-xs text-[var(--color-text-info)]">{entry.meaning1}</p>
                            <p className="text-sm text-[var(--color-text-info)] mt-2 italic">&ldquo;{entry.example1}&rdquo;</p>
                          </div>
                          <div className="bg-[var(--color-success-bg)] rounded-[var(--radius-md)] p-4">
                            <p className="text-xs font-bold text-[var(--color-text-success)] mb-1 uppercase tracking-wider">{entry.word2}</p>
                            <p className="text-xs text-[var(--color-text-success)]">{entry.meaning2}</p>
                            <p className="text-sm text-[var(--color-text-success)] mt-2 italic">&ldquo;{entry.example2}&rdquo;</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2 p-3 bg-[var(--color-warning-bg)] text-[var(--color-text-warning)] rounded-[var(--radius-md)]">
                          <LearningArt name="Lightbulb" size={16} className="w-4 h-4 text-[var(--color-text-warning)] mt-0.5 shrink-0" />
                          <p className="text-xs text-[var(--color-text-warning)] leading-relaxed">{entry.tip}</p>
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
