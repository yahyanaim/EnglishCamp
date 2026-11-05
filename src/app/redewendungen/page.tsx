"use client";


import { BackButton } from "@/components/ui/BackButton";
import { LearningArt } from "@/components/brand/LearningArt";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/shadcn/button";
import { VocabularyPage } from "@/components/layout/VocabularyPage";
import { Search, X, ChevronLeft } from "lucide-react";
import { IDIOMS } from "@/data/redewendungen";

export default function RedewendungenPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return IDIOMS;
    const q = search.toLowerCase();
    return IDIOMS.filter(
      (id) => id.idiom.toLowerCase().includes(q) || id.meaning.toLowerCase().includes(q)
    );
  }, [search]);

  const selectedEntry = selected !== null ? filtered[selected] : null;

  if (selectedEntry) {
    return (
      <VocabularyPage title="Idioms" description="Explore fixed expressions through meanings and examples.">
        <BackButton onClick={() => setSelected(null)}>Back to all idioms</BackButton>

        <div className="bg-[var(--color-surface-alt)]    rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6 shadow-sm mb-6">
          <div className="flex items-center gap-4 mb-3">
            <LearningArt name="💬" size={24} className="" />
            <div>
              <h2 className="text-xl font-bold text-[var(--color-text-primary)]">{selectedEntry.idiom}</h2>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">{selectedEntry.meaning}</p>
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-5 shadow-sm">
          <h3 className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Example</h3>
          <p className="text-sm font-medium text-[var(--color-text-primary)] mb-1">{selectedEntry.example}</p>
        </div>
      </VocabularyPage>
    );
  }

  return (
    <VocabularyPage title="Idioms" description="Explore fixed expressions through meanings and examples.">
      <div className="space-y-6">


        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
          <input aria-label="Search idioms" type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search idioms..."
            className="w-full h-[52px] pl-11 pr-10 bg-[var(--color-surface)] rounded-[var(--radius-md)] border border-[var(--color-border-default)] text-[16px] font-body font-medium text-[var(--color-text-secondary)] placeholder:text-[var(--color-text-secondary)] placeholder:italic outline-none transition-all duration-150 focus:border-[var(--camp-control-ink)] focus:shadow-[0_0_0_3px_rgba(126,34,206,0.15)]"
          />
          {search && <Button variant="unstyled" size="unstyled" aria-label="Clear search" onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-[var(--color-text-secondary)] hover:text-[var(--color-text-secondary)]" /></Button>}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[var(--color-text-secondary)] bg-[var(--color-surface-alt)] px-2.5 py-1 rounded-full">{filtered.length} idioms</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {filtered.map((id, i) => (
            <motion.button key={id.idiom} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.015, 0.2) }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(i)}
              className="text-left bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-3.5 shadow-sm hover:shadow-md transition-all"
            >
              <p className="text-sm font-bold text-[var(--color-text-primary)] mb-0.5">{id.idiom}</p>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1 line-clamp-2">{id.meaning}</p>
            </motion.button>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16">
              <LearningArt name="🔍" size={36} className=" block mb-3" />
              <p className="text-sm font-medium text-[var(--color-text-secondary)]">No idioms found</p>
            </div>
          )}
        </div>
      </div>
    </VocabularyPage>
  );
}
