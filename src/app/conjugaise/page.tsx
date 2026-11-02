"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Search, X, ChevronLeft, ArrowRight, Clock, Zap, CalendarDays, Sparkles, BookMarked, GraduationCap } from "lucide-react";
import { VERBS } from "@/data/conjugaise";
import type { VerbConjugation } from "@/data/conjugaise";

const TENSE_META = {
  present: { label: "Present", icon: Zap, color: "var(--color-info-dark)", bg: "var(--color-info-bg)", border: "var(--color-info)", desc: "Present tense — what happens now" },
  past: { label: "Simple Past", icon: Clock, color: "var(--color-warning-dark)", bg: "var(--color-warning-bg)", border: "var(--color-warning)", desc: "Simple past — completed past actions" },
  perfect: { label: "Present Perfect", icon: Sparkles, color: "var(--color-success-dark)", bg: "var(--color-success-bg)", border: "var(--color-success)", desc: "Present perfect — past with present relevance" },
  future: { label: "Future", icon: CalendarDays, color: "var(--color-amethyst)", bg: "#F3E8FF", border: "#9B59B6", desc: "Future tense — what will happen" },
} as const;

type TenseKey = keyof typeof TENSE_META;

const PRONOUNS = ["I", "you", "he / she / it", "we", "they"] as const;

function getConjugationForm(verb: VerbConjugation, tense: "present" | "past", pronounIndex: number): string {
  if (tense === "present") {
    if (Array.isArray(verb.present)) {
      return verb.present[pronounIndex] ?? verb.infinitive;
    }
    return pronounIndex === 2 ? (verb.thirdPerson || `${verb.infinitive}s`) : verb.infinitive;
  }
  // past tense
  if (verb.infinitive === "be") {
    return (pronounIndex === 0 || pronounIndex === 2) ? "was" : "were";
  }
  return verb.past;
}

const verbArtwork = ["note", "book", "plan", "pattern"];

function VerbCard({ verb, onClick, index }: { verb: VerbConjugation; onClick: () => void; index: number }) {
  const artwork = verbArtwork[index % verbArtwork.length];
  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02, duration: 0.3 }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="camp-verb-card group"
    >
      <div className="flex items-start gap-3">
        <span className="camp-verb-symbol"><LearningArt name={artwork} size={22} /></span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-display font-bold text-base text-[var(--color-text-primary)] font-mono">{verb.infinitive}</h3>
          </div>
          <p className="font-body text-xs text-[var(--color-text-secondary)] italic mt-0.5 truncate">{verb.english}</p>
          {verb.arabic && <p className="font-body text-xs text-[var(--color-text-secondary)] italic font-arabic truncate mt-0.5" lang="ar">{verb.arabic}</p>}
        </div>
        <ArrowRight className="w-4 h-4 text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)] transition-colors mt-1 shrink-0" />
      </div>
    </motion.button>
  );
}

function ConjugationTable({ verb, tense }: { verb: VerbConjugation; tense: "present" | "past" }) {
  const meta = TENSE_META[tense];
  const Icon = meta.icon;
  return (
    <div className="camp-conjugation-table">
      <div className="camp-conjugation-table-heading">
        <LearningArt name={Icon.displayName || "book"} className="w-4 h-4" />
        <span className="font-display font-extrabold text-sm">{meta.label}</span>
      </div>
      <div className="p-3">
        {PRONOUNS.map((p, i) => (
          <div key={p} className="flex items-center gap-3 py-1.5 border-b border-[var(--color-border-default)] last:border-0">
            <span className="w-28 font-body text-xs font-semibold text-[var(--color-text-secondary)]">{p}</span>
            <span className="font-display font-bold text-sm font-mono text-[var(--color-text-primary)]">
              {getConjugationForm(verb, tense, i)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function VerbDetail({ verb, onBack }: { verb: VerbConjugation; onBack: () => void }) {
  const idx = VERBS.indexOf(verb);
  const artwork = verbArtwork[idx % verbArtwork.length];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="camp-verb-detail space-y-5">
      <Button variant="outline"
        onClick={onBack}
      >
        <ChevronLeft className="w-4 h-4" /> Back to verbs
      </Button>

      <div className="camp-verb-detail-hero">
        <div className="flex items-center gap-4 mb-2">
          <span className="camp-verb-symbol"><LearningArt name={artwork} size={24} /></span>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="font-display font-extrabold text-2xl text-[var(--color-text-primary)] font-mono">{verb.infinitive}</h2>
            </div>
            <p className="font-body text-sm text-[var(--color-text-secondary)] italic">{verb.english}</p>
            {verb.arabic && <p className="font-body text-sm text-[var(--color-text-secondary)] italic font-arabic mt-0.5" lang="ar">{verb.arabic}</p>}
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="font-body text-xs text-[var(--color-text-secondary)]">Past Participle:</span>
          <span className="font-display font-bold text-sm font-mono text-[var(--color-text-primary)]">{verb.pastParticiple}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ConjugationTable verb={verb} tense="present" />
        <ConjugationTable verb={verb} tense="past" />
      </div>

      <div className="camp-verb-examples">
        <h3 className="font-display font-extrabold text-xs text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">Example Sentences</h3>
        <div className="space-y-2">
          {verb.examples.map((ex, i) => (
            <div key={i} className="flex items-start gap-3 p-2.5 rounded-[var(--radius-md)] even:bg-[var(--color-surface-alt)]">
              <span className="font-display font-extrabold text-[10px] text-[var(--color-text-secondary)] w-5 mt-0.5 shrink-0">{i + 1}.</span>
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm font-medium text-[var(--color-text-primary)]">{ex.en}</p>
                {ex.ar && <p className="font-body text-xs text-[var(--color-text-secondary)] italic font-arabic mt-0.5" lang="ar">{ex.ar}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function VerbConjugationPage() {
  const [search, setSearch] = useState("");
  const [selectedVerb, setSelectedVerb] = useState<VerbConjugation | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return VERBS;
    const q = search.toLowerCase();
    return VERBS.filter(
      (v) => v.infinitive.toLowerCase().includes(q) || v.english.toLowerCase().includes(q) || (v.arabic && v.arabic.includes(q))
    );
  }, [search]);

  return (
    <PageWrapper>
      <AnimatePresence mode="wait">
        {selectedVerb ? (
          <motion.div key="detail">
            <VerbDetail verb={selectedVerb} onBack={() => setSelectedVerb(null)} />
          </motion.div>
        ) : (
          <motion.div key="list" className="camp-verbs space-y-5">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-[var(--radius-md)] bg-[var(--color-primary)]">
                <LearningArt name="BookMarked" size={18} className="w-4.5 h-4.5 text-white" />
              </div>
              <div>
                <h1 className="font-display font-extrabold text-[var(--color-text-primary)]" style={{ fontSize: "26px", letterSpacing: "0.3px" }}>
                  Verb Conjugation
                </h1>
                <p className="font-body text-sm text-[var(--color-text-secondary)] mt-0.5">Master 60 essential English verbs across all tenses</p>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
              <Input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search verbs..."
                aria-label="Search verbs"
                className="h-11 pl-10 pr-12 font-body"
              />
              {search && (
                <button onClick={() => setSearch("")} aria-label="Clear verb search" className="camp-verb-clear">
                  <X className="w-4 h-4 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]" />
                </button>
              )}
            </div>

            {/* Count */}
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-xs text-[var(--color-text-secondary)] bg-[var(--color-surface-alt)] px-2.5 py-1 rounded-[var(--radius-pill)]">
                {filtered.length} / {VERBS.length} verbs
              </span>
            </div>

            {/* Results */}
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <LearningArt name="🔍" size={36} className=" block mb-3" />
                <p className="font-display font-bold text-sm text-[var(--color-text-secondary)]">No verbs found</p>
                <p className="font-body text-xs text-[var(--color-text-secondary)] mt-1">Try a different search term</p>
              </div>
            ) : (
              <div className="camp-verb-grid">
                {filtered.map((verb, i) => (
                  <VerbCard key={verb.infinitive} verb={verb} index={i} onClick={() => setSelectedVerb(verb)} />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
