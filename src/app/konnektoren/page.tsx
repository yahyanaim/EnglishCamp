"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { PageBanner } from "@/components/ui/PageBanner";
import { SelectField } from "@/components/ui/shadcn/select-field";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Search, X, ChevronLeft } from "lucide-react";
import { KONNEKTOREN, CATEGORY_META, type KonnektorCategory } from "@/data/konnektoren";

const POSITION_META = {
  "0": { label: "Coordinating", desc: "Connects equal parts — and, but, or", example: "and, but, or, so" },
  "1": { label: "Transitional", desc: "Adverb — links sentences — however, therefore", example: "therefore, however, then" },
  "verb-last": { label: "Subordinating", desc: "Introduces a dependent clause with its own subject and verb. English normally keeps subject–verb order inside it; the verb is not moved to the end.", example: "Although it rained, we continued. We continued although it rained." },
  "phrase": { label: "Phrase linker", desc: "Check the complement: a preposition can introduce a noun phrase or -ing form; to / in order to introduce a base verb.", example: "despite the rain; by practising; in order to learn" },
  "paired": { label: "Paired construction", desc: "Use both parts of the expression and keep the linked items grammatically parallel.", example: "both reading and writing; not only useful but also enjoyable" },
};

export default function KonnektorenPage() {
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState<KonnektorCategory | "all">("all");
  const [selectedKon, setSelectedKon] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let items = KONNEKTOREN;
    if (filterCat !== "all") items = items.filter((k) => k.category === filterCat);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter((k) => k.word.toLowerCase().includes(q) || k.english.toLowerCase().includes(q));
    }
    return items;
  }, [search, filterCat]);

  const selected = selectedKon ? KONNEKTOREN.find((k) => `${k.word}:${k.category}` === selectedKon) : null;

  if (selected) {
    const meta = CATEGORY_META[selected.category];
    const posMeta = POSITION_META[selected.position];
    return (
      <PageWrapper>
        <button onClick={() => setSelectedKon(null)} className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-6 font-body">
          <ChevronLeft className="w-4 h-4" /> Back to all connectives
        </button>

        <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6 mb-6" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
          <div className="flex items-center gap-4 mb-3">
            <LearningArt name={meta.icon} size={24} className="" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-[var(--color-text-primary)] font-mono">{selected.word}</h2>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-[var(--radius-pill)] ${meta.color} bg-[var(--color-surface)] border`}>
                  {meta.label}
                </span>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] italic mt-0.5 font-body">{selected.english}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className={`text-xs font-medium px-2 py-1 rounded-[var(--radius-pill)] ${selected.position === "verb-last" ? "bg-[#9B59B6] text-white border-[#9B59B6]" : selected.position === "1" ? "bg-[var(--color-info-bg)] text-[var(--color-text-info)] border-[var(--color-info)]" : "bg-[var(--color-success-bg)] text-[var(--color-text-success)] border-[var(--color-success)]"}`}>
              {posMeta.label}
            </span>
            <span className={`text-xs font-semibold px-2 py-1 rounded-[var(--radius-pill)] ${selected.level === "A2" ? "bg-[var(--color-success-bg)] text-[var(--color-text-success)]" : selected.level === "B1" ? "bg-[var(--color-info-bg)] text-[var(--color-text-info)]" : selected.level === "B2" ? "bg-[var(--color-warning-bg)] text-[var(--color-text-warning)]" : "bg-[var(--color-error-bg)] text-[var(--color-text-error)]"} border`}>
              {selected.level}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-5" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
            <h3 className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Example</h3>
            <p className="text-sm font-medium text-[var(--color-text-primary)] mb-1">{selected.exampleEn}</p>
            {selected.exampleAr && <p lang="ar" dir="rtl" className="text-sm text-[var(--color-text-secondary)] mt-3">{selected.exampleAr}</p>}
          </div>
          <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-5" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
            <h3 className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Grammar & punctuation</h3>
            <p className="text-sm font-medium text-[var(--color-text-primary)]">{posMeta.desc}</p>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-body">e.g. {posMeta.example}</p>
            {selected.position === "1" && <p className="text-sm text-[var(--color-text-secondary)] mt-3">A sentence-linking adverb is not a coordinating conjunction. Between independent clauses, use a full stop or semicolon; a following comma is common. Position can also vary within a clause.</p>}
            {selected.position === "verb-last" && <p className="text-sm text-[var(--color-text-secondary)] mt-3">An introductory dependent clause is normally followed by a comma. Do not join although with but or because with so to express the same relationship twice.</p>}
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="space-y-6">
        <PageBanner>
          <div className="flex items-center gap-3 mb-2">
            <LearningArt name="🔌" size={24} className="inline-flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-primary-subtle)] " />
            <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Linking Words &amp; Connectives</h1>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)] font-body">
            English transition words &amp; conjunctions organised by function. Choose a word to study its grammar, punctuation and contextual example.
          </p>
        </PageBanner>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
            <input
              type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search connectives..."
              className="w-full h-12 pl-11 pr-10 bg-[var(--color-surface)] rounded-[var(--radius-md)] border border-[var(--color-border-default)] text-[16px] font-body font-medium text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] placeholder:italic outline-none transition-all duration-150 focus:border-[var(--color-info)]"
              style={{ boxShadow: "0 2px 0 var(--color-border-default)" }}
            />
            {search && <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]" /></button>}
          </div>
          <SelectField
            aria-label="Filter linking words by function"
            value={filterCat}
            onValueChange={value => setFilterCat(value as KonnektorCategory | "all")}
            className="px-3 py-2.5 bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-info)]"
            style={{ boxShadow: "0 2px 0 var(--color-border-default)" }}
          >
            <option value="all">All categories</option>
            {Object.entries(CATEGORY_META).map(([id, m]) => (
              <option key={id} value={id}>{m.label}</option>
            ))}
          </SelectField>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-semibold text-[var(--color-text-secondary)] bg-[var(--color-surface-alt)] px-2.5 py-1 rounded-[var(--radius-pill)] font-body">{filtered.length} connectives</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
          {filtered.map((k, i) => {
            const meta = CATEGORY_META[k.category];
            return (
              <motion.button
                key={k.word + k.category}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.015 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedKon(`${k.word}:${k.category}`)}
                className="text-left bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-3.5 transition-all"
                style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base font-mono font-bold text-[var(--color-text-primary)]">{k.word}</span>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-[var(--radius-pill)] ${meta.color} bg-[var(--color-surface)] border`}>
                    {meta.label}
                  </span>
                </div>
                <p className="text-xs text-[var(--color-text-secondary)] italic truncate font-body">{k.english}</p>
              </motion.button>
            );
          })}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16">
              <LearningArt name="🔍" size={36} className=" block mb-3" />
              <p className="text-sm font-medium text-[var(--color-text-secondary)] font-body">No connectives found</p>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
