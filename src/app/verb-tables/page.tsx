"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { VERB_TABLES } from "@/data/verb-tables";
import { Search, X } from "lucide-react";

export default function VerbTablesPage() {
  const [search, setSearch] = useState("");
  const [selectedVerb, setSelectedVerb] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return VERB_TABLES;
    const q = search.toLowerCase();
    return VERB_TABLES.filter(
      (v) =>
        v.infinitive.toLowerCase().includes(q) ||
        v.meaning.toLowerCase().includes(q) ||
        v.arabic.includes(q)
    );
  }, [search]);

  const verb = selectedVerb ? VERB_TABLES.find((v) => v.infinitive === selectedVerb) : null;

  if (verb) {
    return (
      <PageWrapper>
        <button onClick={() => setSelectedVerb(null)} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-secondary)] mb-4 flex items-center gap-1 font-body">
          ← Back to all verbs
        </button>

        <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-6 border border-[var(--color-border-default)] mb-6" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
          <h2 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)] font-mono mb-4">{verb.infinitive}</h2>
          <p className="text-sm text-[var(--color-text-secondary)] mb-1">→ {verb.meaning}</p>
          <p className="text-sm text-[var(--color-text-secondary)] italic font-arabic mb-4" lang="ar">→ {verb.arabic}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] p-4">
              <p className="text-[10px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">Past Simple</p>
              <p className="text-lg font-mono font-bold text-[var(--color-text-primary)]">{verb.pastSimple}</p>
            </div>
            <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] p-4">
              <p className="text-[10px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">Past Participle</p>
              <p className="text-lg font-mono font-bold text-[var(--color-text-primary)]">{verb.pastParticiple}</p>
            </div>
            <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] p-4">
              <p className="text-[10px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">Third Person</p>
              <p className="text-lg font-mono font-bold text-[var(--color-text-primary)]">{verb.thirdPerson}</p>
            </div>
            <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] p-4">
              <p className="text-[10px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">Present Participle</p>
              <p className="text-lg font-mono font-bold text-[var(--color-text-primary)]">{verb.presentParticiple}</p>
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Irregular Verb Tables</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Essential English irregular verbs with all principal parts — for B2 learners</p>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search verbs..."
            className="w-full h-[52px] pl-11 pr-10 bg-[var(--color-surface)] rounded-[var(--radius-md)] border border-[var(--color-border-default)] text-[16px] font-body font-medium text-[var(--color-text-secondary)] placeholder:text-[var(--color-text-secondary)] placeholder:italic outline-none transition-all duration-150 focus:border-[var(--color-info)] focus:shadow-[0_0_0_3px_rgba(126,34,206,0.15)]"
          />
          {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-[var(--color-text-secondary)]" /></button>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((v) => (
            <motion.button key={v.infinitive} onClick={() => setSelectedVerb(v.infinitive)}
              whileHover={{ y: -2 }}
              className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-5 border border-[var(--color-border-default)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.10),0_2px_6px_rgba(0,0,0,0.06)] transition-all duration-200 text-left"
            >
              <span className="font-display text-lg font-extrabold text-[var(--color-text-primary)] font-mono block mb-1">{v.infinitive}</span>
              <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)] mb-1">
                <span>Past: {v.pastSimple}</span>
                <span>·</span>
                <span>PP: {v.pastParticiple}</span>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)]">→ {v.meaning}</p>
            </motion.button>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16"><LearningArt name="🔍" size={36} className=" block mb-3" /><p className="text-sm text-[var(--color-text-secondary)]">No verbs found</p></div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
