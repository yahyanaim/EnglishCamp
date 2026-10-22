"use client";
import { useState, useMemo } from "react";
import { SpeakerButton } from "@/components/ui/SpeakerButton";
import { VERBS, type VerbConjugation } from "@/data/conjugaise";
import { BookOpen, Search, Sparkles } from "lucide-react";

const PRONOUNS = ["I", "you", "he / she / it", "we", "they"] as const;

type TenseKey = "present" | "past" | "presentContinuous" | "presentPerfect" | "future" | "conditional";

const TENSES: { key: TenseKey; label: string; desc: string }[] = [
  { key: "present", label: "Present Simple", desc: "Habits, facts, and general truths" },
  { key: "past", label: "Past Simple", desc: "Completed actions in the past" },
  { key: "presentContinuous", label: "Present Continuous", desc: "Actions happening now or temporary situations" },
  { key: "presentPerfect", label: "Present Perfect", desc: "Past actions with relevance to the present" },
  { key: "future", label: "Future Simple", desc: "Future predictions and spontaneous decisions" },
  { key: "conditional", label: "Conditional (would)", desc: "Hypothetical situations and polite requests" },
];

function getTenseForms(verb: VerbConjugation, tenseKey: TenseKey): Record<string, string> {
  const inf = verb.infinitive;
  const pp = verb.pastParticiple || `${inf}ed`;
  const ing = verb.presentParticiple || `${inf}ing`;

  switch (tenseKey) {
    case "present":
      if (Array.isArray(verb.present)) {
        return {
          "I": verb.present[0] || inf,
          "you": verb.present[1] || inf,
          "he / she / it": verb.present[2] || verb.thirdPerson || `${inf}s`,
          "we": verb.present[3] || inf,
          "they": verb.present[4] || inf,
        };
      }
      return {
        "I": inf,
        "you": inf,
        "he / she / it": verb.thirdPerson || `${inf}s`,
        "we": inf,
        "they": inf,
      };

    case "past":
      if (inf === "be") {
        return { "I": "was", "you": "were", "he / she / it": "was", "we": "were", "they": "were" };
      }
      const pastForm = verb.past || `${inf}ed`;
      return {
        "I": pastForm,
        "you": pastForm,
        "he / she / it": pastForm,
        "we": pastForm,
        "they": pastForm,
      };

    case "presentContinuous":
      if (inf === "be") {
        return { "I": "am being", "you": "are being", "he / she / it": "is being", "we": "are being", "they": "are being" };
      }
      return {
        "I": `am ${ing}`,
        "you": `are ${ing}`,
        "he / she / it": `is ${ing}`,
        "we": `are ${ing}`,
        "they": `are ${ing}`,
      };

    case "presentPerfect":
      return {
        "I": `have ${pp}`,
        "you": `have ${pp}`,
        "he / she / it": `has ${pp}`,
        "we": `have ${pp}`,
        "they": `have ${pp}`,
      };

    case "future":
      return {
        "I": `will ${inf}`,
        "you": `will ${inf}`,
        "he / she / it": `will ${inf}`,
        "we": `will ${inf}`,
        "they": `will ${inf}`,
      };

    case "conditional":
      return {
        "I": `would ${inf}`,
        "you": `would ${inf}`,
        "he / she / it": `would ${inf}`,
        "we": `would ${inf}`,
        "they": `would ${inf}`,
      };
  }
}

export function VerbExplorer() {
  const [selectedVerb, setSelectedVerb] = useState<VerbConjugation>(VERBS[0]);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return VERBS;
    return VERBS.filter(
      (v) =>
        v.infinitive.toLowerCase().includes(q) ||
        v.english.toLowerCase().includes(q) ||
        (v.arabic && v.arabic.includes(q))
    );
  }, [search]);

  const activeVerb = filtered.find((v) => v.infinitive === selectedVerb.infinitive) || filtered[0] || VERBS[0];

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wider flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5" /> English Verb Explorer
        </span>
        <span className="text-xs text-[var(--color-text-disabled)]">{filtered.length} verbs available</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left sidebar: list of verbs */}
        <div className="lg:w-60 flex-shrink-0">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--color-text-disabled)]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search verb or meaning..."
              className="w-full pl-8 pr-3 py-2 text-sm border-2 border-[var(--color-border-default)] rounded-[var(--radius-lg)] bg-[var(--color-surface)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)] focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
            />
          </div>
          <div className="space-y-0.5 max-h-96 overflow-y-auto scrollbar-thin pr-1">
            {filtered.map((v) => (
              <button
                key={v.infinitive}
                onClick={() => setSelectedVerb(v)}
                className={`w-full text-left px-3 py-2 rounded-[var(--radius-md)] text-sm transition-all flex items-center justify-between ${
                  activeVerb.infinitive === v.infinitive
                    ? "bg-indigo-50 text-indigo-700 font-semibold ring-1 ring-indigo-200"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)]"
                }`}
              >
                <span className="font-mono font-bold">{v.infinitive}</span>
                <span className="text-xs text-[var(--color-text-disabled)] truncate max-w-[100px]">{v.arabic || v.english}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right content: Verb conjugation tables */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-lg)] p-5 border border-[var(--color-border-default)] mb-6">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-3xl font-display font-extrabold font-mono text-[var(--color-text-primary)]">{activeVerb.infinitive}</h3>
              <SpeakerButton text={activeVerb.infinitive} />
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-[var(--radius-pill)] uppercase bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)]">
                {activeVerb.infinitive === "be" || activeVerb.infinitive === "have" || activeVerb.infinitive === "do" ? "Auxiliary" : "Verb"}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--color-text-secondary)]">
              <span>Meaning: <strong className="text-[var(--color-text-primary)]">{activeVerb.english}</strong></span>
              {activeVerb.arabic && (
                <>
                  <span className="text-[var(--color-text-disabled)]">•</span>
                  <span className="font-arabic text-sm text-[var(--color-text-primary)]" lang="ar">{activeVerb.arabic}</span>
                </>
              )}
            </div>

            {/* Principal Parts Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3 border-t border-[var(--color-border-default)]">
              <div className="bg-[var(--color-surface)] p-2 rounded-md border border-[var(--color-border-default)]">
                <span className="block text-[10px] uppercase font-bold text-[var(--color-text-disabled)]">Past Simple</span>
                <span className="font-mono font-semibold text-sm text-[var(--color-text-primary)]">{activeVerb.past}</span>
              </div>
              <div className="bg-[var(--color-surface)] p-2 rounded-md border border-[var(--color-border-default)]">
                <span className="block text-[10px] uppercase font-bold text-[var(--color-text-disabled)]">Past Participle</span>
                <span className="font-mono font-semibold text-sm text-[var(--color-text-primary)]">{activeVerb.pastParticiple}</span>
              </div>
              <div className="bg-[var(--color-surface)] p-2 rounded-md border border-[var(--color-border-default)]">
                <span className="block text-[10px] uppercase font-bold text-[var(--color-text-disabled)]">3rd Person (-s)</span>
                <span className="font-mono font-semibold text-sm text-[var(--color-text-primary)]">{activeVerb.thirdPerson}</span>
              </div>
              <div className="bg-[var(--color-surface)] p-2 rounded-md border border-[var(--color-border-default)]">
                <span className="block text-[10px] uppercase font-bold text-[var(--color-text-disabled)]">Continuous (-ing)</span>
                <span className="font-mono font-semibold text-sm text-[var(--color-text-primary)]">{activeVerb.presentParticiple}</span>
              </div>
            </div>
          </div>

          {/* Tenses Grid */}
          <div className="space-y-4">
            {TENSES.map((tense) => {
              const forms = getTenseForms(activeVerb, tense.key);
              return (
                <div key={tense.key} className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-4 shadow-sm">
                  <div className="flex items-baseline justify-between mb-3">
                    <h4 className="text-sm font-bold text-[var(--color-text-primary)]">{tense.label}</h4>
                    <span className="text-[11px] text-[var(--color-text-secondary)] italic">{tense.desc}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
                    {PRONOUNS.map((p) => (
                      <div key={p} className="flex flex-col bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] px-3 py-2 border border-[var(--color-border-default)]">
                        <span className="text-[10px] font-mono font-bold text-[var(--color-text-disabled)] mb-0.5">{p}</span>
                        <span className="text-sm font-mono font-semibold text-[var(--color-text-primary)] truncate">{forms[p]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Example Sentences */}
          {activeVerb.examples && activeVerb.examples.length > 0 && (
            <div className="mt-6 bg-[var(--color-surface-alt)] rounded-[var(--radius-lg)] p-5 border border-[var(--color-border-default)]">
              <h4 className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Example Sentences
              </h4>
              <div className="space-y-2">
                {activeVerb.examples.map((ex, i) => (
                  <div key={i} className="text-xs">
                    <p className="font-medium text-[var(--color-text-primary)]">• {ex.en}</p>
                    {ex.ar && <p className="font-arabic text-[var(--color-text-secondary)] pl-3 mt-0.5" lang="ar">{ex.ar}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
