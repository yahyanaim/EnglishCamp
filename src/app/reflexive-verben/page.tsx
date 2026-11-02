"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { SelectField } from "@/components/ui/shadcn/select-field";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Search, X, ChevronLeft } from "lucide-react";
import { REFLEXIVE_VERBS } from "@/data/reflexive-verben";

export default function ReflexiveVerbenPage() {
  const [search, setSearch] = useState("");
  const [caseFilter, setCaseFilter] = useState<"all">("all");
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = useMemo(() => {
    let items = REFLEXIVE_VERBS;
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (r) => r.verb.toLowerCase().includes(q) || r.meaning.toLowerCase().includes(q)
      );
    }
    return items;
  }, [search, caseFilter]);

  const entry = selected !== null ? REFLEXIVE_VERBS[selected] : null;

  if (entry) {
    return (
      <PageWrapper>
        <button onClick={() => setSelected(null)} className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-6">
          <ChevronLeft className="w-4 h-4" /> Back to all verbs
        </button>

        <div className="bg-[var(--color-surface-alt)]    rounded-[var(--radius-lg)] ring-1 ring-teal-200/50 p-6 shadow-sm mb-6">
          <div className="flex items-center gap-4 mb-3">
            <LearningArt name="🔄" size={24} className="" />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xl font-mono font-bold text-[var(--color-text-primary)]">{entry.verb}</span>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">{entry.meaning}</p>
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-5 shadow-sm">
          <h3 className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Example</h3>
          <p className="text-sm font-medium text-[var(--color-text-primary)] mb-1">{entry.example}</p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Reflexive Verbs</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">English reflexive verbs with case and preposition information</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reflexive verbs..."
              className="w-full h-[52px] pl-11 pr-10 bg-[var(--color-surface)] rounded-[var(--radius-md)] border border-[var(--color-border-default)] text-[16px] font-body font-medium text-[var(--color-text-secondary)] placeholder:text-[var(--color-text-secondary)] placeholder:italic outline-none transition-all duration-150 focus:border-[#7E22CE] focus:shadow-[0_0_0_3px_rgba(126,34,206,0.15)]"
            />
            {search && <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-[var(--color-text-secondary)] hover:text-[var(--color-text-secondary)]" /></button>}
          </div>
          <SelectField value={caseFilter} onValueChange={value => setCaseFilter(value as "all")}
            className="px-3 py-2.5 bg-[var(--color-surface)] rounded-[var(--radius-lg)] shadow-[0_2px_8px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.05)] border border-[var(--color-border-default)] text-sm text-[var(--color-text-primary)] outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          >
            <option value="all">All cases</option>
            <option value="Accusative">+ Accusative</option>
            <option value="Dative">+ Dative</option>
          </SelectField>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[var(--color-text-secondary)] bg-[var(--color-surface-alt)] px-2.5 py-1 rounded-full">{filtered.length} verbs</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {filtered.map((r, i) => (
            <motion.button key={r.verb} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.015 }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => { const idx = REFLEXIVE_VERBS.indexOf(r); setSelected(idx); }}
              className="text-left bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-3.5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-mono font-bold text-[var(--color-text-primary)]">{r.verb}</span>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] italic truncate">{r.meaning}</p>
            </motion.button>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16"><LearningArt name="🔍" size={36} className=" block mb-3" /><p className="text-sm font-medium text-[var(--color-text-secondary)]">No verbs found</p></div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
