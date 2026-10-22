"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Search, X, ChevronLeft } from "lucide-react";
import { VERB_PREPOSITIONS } from "@/data/verben-mit-prapositionen";

export default function VerbenMitPrapositionenPage() {
  const [search, setSearch] = useState("");
  const [caseFilter, setCaseFilter] = useState<"all">("all");
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = useMemo(() => {
    let items = VERB_PREPOSITIONS;
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (v) => v.verb.toLowerCase().includes(q) || v.meaning.toLowerCase().includes(q) || v.preposition.toLowerCase().includes(q)
      );
    }
    return items;
  }, [search, caseFilter]);

  const selectedEntry = selected !== null ? VERB_PREPOSITIONS[selected] : null;

  if (selectedEntry !== null) {
    return (
      <PageWrapper>
        <button onClick={() => setSelected(null)} className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-6 font-body">
          <ChevronLeft className="w-4 h-4" /> Back to all verbs
        </button>

        <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 mb-6" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
          <div className="flex items-center gap-4 mb-3">
            <span className="text-3xl">📌</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-[var(--color-text-primary)] font-mono">{selectedEntry.verb}</h2>
                <span className="text-lg font-mono font-bold text-[var(--color-primary-dark)]">{selectedEntry.preposition}</span>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] italic mt-0.5 font-body">{selectedEntry.meaning}</p>
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-5" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
          <h3 className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">Example</h3>
          <div className="p-3 rounded-[var(--radius-md)] bg-[var(--color-surface-alt)]">
            <p className="text-sm font-medium text-[var(--color-text-primary)]">{selectedEntry.example}</p>
            <p className="text-xs text-[var(--color-text-secondary)] italic mt-0.5 font-body">{selectedEntry.exampleEn}</p>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-primary-subtle)] text-lg">📌</span>
            <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Verbs with Prepositions</h1>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)] font-body">
            English verbs that require fixed prepositions
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
            <input
              type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search verb or preposition..."
              className="w-full h-12 pl-11 pr-10 bg-[var(--color-surface)] rounded-[var(--radius-md)] border-2 border-[var(--color-border-default)] text-[16px] font-body font-medium text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)] placeholder:italic outline-none transition-all duration-150 focus:border-[var(--color-info)]"
              style={{ boxShadow: "0 2px 0 var(--color-border-default)" }}
            />
            {search && <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]" /></button>}
          </div>
          <select
            value={caseFilter}
            onChange={(e) => setCaseFilter(e.target.value as "all")}
            className="px-3 py-2.5 bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-info)]"
            style={{ boxShadow: "0 2px 0 var(--color-border-default)" }}
          >
            <option value="all">All cases</option>
            <option value="Accusative">+ Accusative</option>
            <option value="Dative">+ Dative</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[var(--color-text-secondary)] bg-[var(--color-surface-alt)] px-2.5 py-1 rounded-[var(--radius-pill)] font-body">{filtered.length} verbs</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {filtered.map((v, i) => (
            <motion.button
              key={`${v.verb}-${v.preposition}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.015 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const idx = VERB_PREPOSITIONS.indexOf(v);
                setSelected(idx);
              }}
              className="text-left bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-3.5 transition-all"
              style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-mono font-bold text-[var(--color-text-primary)]">{v.verb}</span>
                <span className="text-sm font-mono font-semibold text-[var(--color-primary-dark)]">{v.preposition}</span>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] italic truncate font-body">{v.meaning}</p>
            </motion.button>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16">
              <span className="text-4xl block mb-3">🔍</span>
              <p className="text-sm font-medium text-[var(--color-text-secondary)] font-body">No verbs found</p>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
