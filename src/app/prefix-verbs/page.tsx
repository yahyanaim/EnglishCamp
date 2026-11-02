"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PHRASAL_VERBS, PHRASAL_VERB_PARTICLES } from "@/data/prefix-verbs";
import { Search, X, ChevronDown, BookMarked } from "lucide-react";

export default function PrefixVerbsPage() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof PHRASAL_VERBS>();
    for (const pv of PHRASAL_VERBS) {
      const existing = map.get(pv.particle) || [];
      existing.push(pv);
      map.set(pv.particle, existing);
    }
    return map;
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return grouped;
    const q = search.toLowerCase();
    const result = new Map<string, typeof PHRASAL_VERBS>();
    grouped.forEach((verbs, particle) => {
      const matching = verbs.filter(
        (v: { verb: string; particle: string; meaning: string }) =>
          v.verb.toLowerCase().includes(q) ||
          v.particle.toLowerCase().includes(q) ||
          v.meaning.toLowerCase().includes(q)
      );
      if (matching.length > 0) result.set(particle, matching);
    });
    return result;
  }, [search, grouped]);

  const particleMeta = (particle: string) =>
    PHRASAL_VERB_PARTICLES.find((p) => p.particle === particle);

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Phrasal Verbs</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">English phrasal verbs grouped by particle</p>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search phrasal verbs..."
            className="w-full h-[52px] pl-11 pr-10 bg-[var(--color-surface)] rounded-[var(--radius-md)] border border-[var(--color-border-default)] text-[16px] font-body font-medium text-[var(--color-text-secondary)] placeholder:text-[var(--color-text-secondary)] placeholder:italic outline-none transition-all duration-150 focus:border-[var(--color-info)] focus:shadow-[0_0_0_3px_rgba(126,34,206,0.15)]"
          />
          {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-[var(--color-text-secondary)]" /></button>}
        </div>

        <div className="space-y-3">
          {Array.from(filtered.entries()).map(([particle, verbs]) => {
            const open = expanded === particle;
            const meta = particleMeta(particle);
            return (
              <motion.div key={particle} layout className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] overflow-hidden" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
                <button onClick={() => setExpanded(open ? null : particle)} className="w-full text-left p-5 hover:bg-[var(--color-surface-alt)] transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-surface-alt)] font-bold text-sm shrink-0">
                      {particle}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-bold text-[var(--color-text-primary)]">{particle}</h3>
                      </div>
                      {meta && <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{meta.meaning}</p>}
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
                      <div className="px-5 pb-5 space-y-2 border-t border-[var(--color-border-default)] pt-4">
                        {verbs.map((v, i) => (
                          <div key={v.verb + v.particle} className="bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <LearningArt name="BookMarked" size={14} className="w-3.5 h-3.5 text-[var(--color-text-secondary)]" />
                              <span className="text-sm font-bold font-mono text-[var(--color-text-primary)]">{v.verb} {v.particle}</span>
                              <span className="text-xs text-[var(--color-text-secondary)]">— {v.meaning}</span>
                            </div>
                            <p className="text-xs font-mono text-[var(--color-text-secondary)] ml-5.5">{v.example}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
          {filtered.size === 0 && (
            <div className="text-center py-16"><LearningArt name="🔍" size={36} className=" block mb-3" /><p className="text-sm text-[var(--color-text-secondary)]">No phrasal verbs found</p></div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
