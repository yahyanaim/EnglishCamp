"use client";


import { BackButton } from "@/components/ui/BackButton";
import { LearningArt } from "@/components/brand/LearningArt";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/shadcn/button";
import { VocabularyPage } from "@/components/layout/VocabularyPage";
import { Search, X, ChevronLeft } from "lucide-react";
import { NOUN_VERB_COLLOCATIONS } from "@/data/nomen-verb-verbindungen";

export default function NomenVerbVerbindungenPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return NOUN_VERB_COLLOCATIONS;
    const q = search.toLowerCase();
    return NOUN_VERB_COLLOCATIONS.filter(
      (n) => (n.verb + " " + n.noun).toLowerCase().includes(q) || n.meaning.toLowerCase().includes(q)
    );
  }, [search]);

  const selectedEntry = selected !== null ? NOUN_VERB_COLLOCATIONS[selected] : null;

  if (selectedEntry !== null) {
    return (
      <VocabularyPage title="Verb–noun collocations" description="Learn natural combinations and practise them in context.">
        <BackButton onClick={() => setSelected(null)}>Back to all expressions</BackButton>

        <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6 mb-6" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
          <div className="flex items-center gap-4 mb-3">
            <LearningArt name="🔗" size={24} className="" />
            <div>
              <h2 className="text-xl font-bold text-[var(--color-text-primary)] font-display">{selectedEntry.verb} {selectedEntry.noun}</h2>
              <p className="text-sm text-[var(--color-text-secondary)] italic mt-0.5 font-body">{selectedEntry.meaning}</p>
              <p className="text-sm text-[var(--color-text-secondary)] italic font-arabic mt-0.5" lang="ar" dir="rtl">{selectedEntry.arabic}</p>
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-5" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
          <h3 className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">Example</h3>
          <div className="p-3 rounded-[var(--radius-md)] bg-[var(--color-surface-alt)]">
            <p className="text-sm font-medium text-[var(--color-text-primary)]">{selectedEntry.example}</p>
            <p className="text-xs text-[var(--color-text-secondary)] italic mt-0.5 font-body">{selectedEntry.exampleEn}</p>
          </div>
        </div>
      </VocabularyPage>
    );
  }

  return (
    <VocabularyPage title="Verb–noun collocations" description="Learn natural combinations and practise them in context.">
      <div className="space-y-6">


        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
          <input
            aria-label="Search verb and noun collocations" type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search expressions..."
            className="w-full h-12 pl-11 pr-10 bg-[var(--color-surface)] rounded-[var(--radius-md)] border border-[var(--color-border-default)] text-[16px] font-body font-medium text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] placeholder:italic outline-none transition-all duration-150 focus:border-[var(--color-info)]"
            style={{ boxShadow: "0 2px 0 var(--color-border-default)" }}
          />
          {search && <Button variant="unstyled" size="unstyled" aria-label="Clear search" onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]" /></Button>}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[var(--color-text-secondary)] bg-[var(--color-surface-alt)] px-2.5 py-1 rounded-[var(--radius-pill)] font-body">{filtered.length} expressions</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {filtered.map((n, i) => (
            <motion.button
              key={n.verb + n.noun}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.015, 0.2) }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const idx = NOUN_VERB_COLLOCATIONS.indexOf(n);
                setSelected(idx);
              }}
              className="text-left bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-3.5 transition-all"
              style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base font-bold text-[var(--color-text-primary)]">{n.verb} {n.noun}</span>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] italic truncate font-body">{n.meaning}</p>
              <p className="text-xs text-[var(--color-text-secondary)] italic font-arabic truncate mt-0.5" lang="ar" dir="rtl">{n.arabic}</p>
            </motion.button>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16">
              <LearningArt name="🔍" size={36} className=" block mb-3" />
              <p className="text-sm font-medium text-[var(--color-text-secondary)] font-body">No expressions found</p>
            </div>
          )}
        </div>
      </div>
    </VocabularyPage>
  );
}
