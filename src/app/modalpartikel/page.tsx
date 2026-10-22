"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Search, X, ChevronLeft } from "lucide-react";
import { DISCOURSE_MARKERS } from "@/data/modalpartikel";

export default function ModalpartikelPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return DISCOURSE_MARKERS;
    const q = search.toLowerCase();
    return DISCOURSE_MARKERS.filter(
      (m) => m.marker.toLowerCase().includes(q) || m.meaning.toLowerCase().includes(q) || m.function.toLowerCase().includes(q)
    );
  }, [search]);

  const particle = selected ? DISCOURSE_MARKERS.find((m) => m.marker === selected) : null;

  if (particle) {
    return (
      <PageWrapper>
        <button onClick={() => setSelected(null)} className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-6">
          <ChevronLeft className="w-4 h-4" /> Back to all markers
        </button>

        <div className="bg-gradient-to-br from-[var(--color-warning)] to-[#FFD700] rounded-[var(--radius-lg)] ring-1 ring-[var(--color-warning)] p-6 shadow-sm mb-6">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-4xl font-mono font-display font-extrabold text-[var(--color-text-primary)]">{particle.marker}</span>
            <div>
              <p className="text-sm text-[var(--color-text-secondary)] font-medium">{particle.meaning}</p>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">Function: {particle.function}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-4 shadow-sm">
            <p className="text-sm font-mono font-medium text-[var(--color-text-primary)] mb-0.5">{particle.example}</p>
            <p className="text-xs text-[var(--color-text-disabled)] italic">{particle.exampleEn}</p>
            {particle.arabic && <p className="text-xs text-[var(--color-text-disabled)] italic font-arabic mt-0.5" lang="ar">{particle.arabic}</p>}
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Discourse Markers</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">actually, basically, honestly, anyway, though, well, you know — essential discourse markers</p>
        </div>

        <div className="bg-gradient-to-br from-[var(--color-warning)] to-amber-50 rounded-[var(--radius-lg)] ring-1 ring-[var(--color-warning)] p-4 shadow-sm">
          <p className="text-xs text-[var(--color-warning)] leading-relaxed">
            💡 Discourse markers add nuance, emotion, and naturalness to your speech. They&rsquo;re rarely translated literally but are essential for fluent English. Each marker has multiple meanings depending on context.
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-disabled)]" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search markers..."
            className="w-full h-[52px] pl-11 pr-10 bg-[var(--color-surface)] rounded-[var(--radius-md)] border-2 border-[var(--color-border-default)] text-[16px] font-body font-medium text-[var(--color-text-secondary)] placeholder:text-[var(--color-text-disabled)] placeholder:italic outline-none transition-all duration-150 focus:border-[#1CB0F6] focus:shadow-[0_0_0_3px_rgba(28,176,246,0.15)]"
          />
          {search && <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-[var(--color-text-disabled)] hover:text-[var(--color-text-secondary)]" /></button>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((m, i) => (
            <motion.button key={m.marker} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(m.marker)}
              className="text-left bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="text-2xl font-mono font-display font-extrabold text-[var(--color-text-primary)] mb-1">{m.marker}</div>
              <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2">{m.meaning}</p>
              <p className="text-xs text-[var(--color-text-disabled)] mt-1 italic truncate">{m.example}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
