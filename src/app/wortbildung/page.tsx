"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Search, X } from "lucide-react";
import { PREFIXES, SUFFIXES } from "@/data/wortbildung";

type Tab = "prefixes" | "suffixes";

export default function WortbildungPage() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<Tab>("prefixes");
  const filteredPrefixes = useMemo(() => {
    if (!search.trim()) return PREFIXES;
    const q = search.toLowerCase();
    return PREFIXES.filter((p) => p.prefix.toLowerCase().includes(q) || p.meaning.toLowerCase().includes(q));
  }, [search]);

  const filteredSuffixes = useMemo(() => {
    if (!search.trim()) return SUFFIXES;
    const q = search.toLowerCase();
    return SUFFIXES.filter((s) => s.suffix.toLowerCase().includes(q) || s.meaning.toLowerCase().includes(q));
  }, [search]);

  

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Word Formation</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">English word formation — prefixes, suffixes, and compound rules</p>
        </div>

        <div className="flex gap-2 border-b border-[var(--color-border-default)] pb-2">
          {(["prefixes", "suffixes"] as Tab[]).map((t) => (
            <button key={t} onClick={() => { setTab(t); setSearch(""); }}
              className={`text-sm font-medium px-4 py-2 rounded-lg transition-all ${tab === t ? "bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] font-semibold" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"}`}
            >{t === "prefixes" ? "Prefixes" : "Suffixes"}</button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${tab}...`}
            className="w-full h-[52px] pl-11 pr-10 bg-[var(--color-surface)] rounded-[var(--radius-md)] border border-[var(--color-border-default)] text-[16px] font-body font-medium text-[var(--color-text-secondary)] placeholder:text-[var(--color-text-secondary)] placeholder:italic outline-none transition-all duration-150 focus:border-[#7E22CE] focus:shadow-[0_0_0_3px_rgba(126,34,206,0.15)]"
          />
          {search && <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-[var(--color-text-secondary)] hover:text-[var(--color-text-secondary)]" /></button>}
        </div>

        {tab === "prefixes" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredPrefixes.map((p, i) => (
              <motion.div key={p.prefix} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-4 shadow-sm"
              >
                <span className="text-lg font-mono font-bold text-[var(--color-text-primary)]">{p.prefix}</span>
                <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 mt-1">{p.meaning}</p>
                {p.arabic && <p className="text-xs text-[var(--color-text-secondary)] font-arabic line-clamp-2 mt-0.5" lang="ar">{p.arabic}</p>}
                <p className="text-xs text-[var(--color-text-secondary)] italic mt-1 line-clamp-1">{p.example}</p>
              </motion.div>
            ))}
          </div>
        )}

        {tab === "suffixes" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredSuffixes.map((s, i) => (
              <motion.div key={s.suffix} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-4 shadow-sm"
              >
                <span className="text-lg font-mono font-bold text-[var(--color-text-primary)]">-{s.suffix}</span>
                <p className="text-xs text-[var(--color-text-secondary)] mt-1">{s.meaning}</p>
                {s.arabic && <p className="text-xs text-[var(--color-text-secondary)] font-arabic mt-0.5" lang="ar">{s.arabic}</p>}
                <p className="text-xs text-[var(--color-text-secondary)] italic mt-1 line-clamp-1">{s.example}</p>
              </motion.div>
            ))}
          </div>
        )}



        {tab === "prefixes" && filteredPrefixes.length === 0 && (
          <div className="text-center py-16"><LearningArt name="🔍" size={36} className=" block mb-3" /><p className="text-sm font-medium text-[var(--color-text-secondary)]">No prefixes found</p></div>
        )}
        {tab === "suffixes" && filteredSuffixes.length === 0 && (
          <div className="text-center py-16"><LearningArt name="🔍" size={36} className=" block mb-3" /><p className="text-sm font-medium text-[var(--color-text-secondary)]">No suffixes found</p></div>
        )}
      </div>
    </PageWrapper>
  );
}
