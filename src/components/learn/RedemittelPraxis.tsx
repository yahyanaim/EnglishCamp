"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playCorrect, playWrong, playXP } from "@/lib/audio";
import { useProgress } from "@/store/useProgress";
import { REDEMITTEL, REDEMITTEL_CATEGORIES } from "@/data/redemittel";
import type { RedemittelCategory, RedemittelEntry } from "@/data/redemittel";
import { RefreshCw, Sparkles, CheckCircle2, XCircle, ArrowRight, MessageSquare } from "lucide-react";

type Scenario = {
  situation: string;
  description: string;
};

const SCENARIOS: Record<RedemittelCategory, Scenario> = {
  opinion: { situation: "You want to express your opinion on a topic", description: "Which phrase would you use to introduce your personal view?" },
  agreeing: { situation: "Someone expresses an opinion you agree with", description: "Which phrase shows agreement?" },
  disagreeing: { situation: "You disagree with someone's statement", description: "Which phrase politely expresses disagreement?" },
  adding: { situation: "You are structuring an argument in a discussion", description: "Which phrase helps organize your argument?" },
  clarifying: { situation: "You want to make a suggestion", description: "Which phrase is best for making a suggestion?" },
  interrupting: { situation: "You need to make a polite request", description: "Which phrase is a polite request?" },
  comparing: { situation: "You need to apologize for something", description: "Which phrase is appropriate for apologizing?" },
  examples: { situation: "You are giving a presentation", description: "Which phrase is useful in a presentation?" },
  contrasting: { situation: "You are leading or joining a discussion", description: "Which phrase is best for a discussion?" },
  sequencing: { situation: "You are writing a formal letter", description: "Which phrase belongs in a formal letter?" },
  summarizing: { situation: "You are writing an essay", description: "Which phrase helps structure an essay?" },
};

type ChallengeItem = {
  phrase: string;
  usage: string;
  arabic: string;
  correctCat: RedemittelCategory;
  wrongCats: RedemittelCategory[];
  options: { label: string; id: RedemittelCategory }[];
};

function shuffle<T>(a: T[]): T[] {
  const arr = [...a];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildItems(count: number): ChallengeItem[] {
  const cats = Object.keys(REDEMITTEL_CATEGORIES) as RedemittelCategory[];
  const items: ChallengeItem[] = [];
  const allEntries = shuffle(REDEMITTEL);
  for (const entry of allEntries) {
    if (items.length >= count) break;
    const wrongCats = shuffle(cats.filter((c) => c !== entry.category)).slice(0, 3);
    const options = shuffle([
      { label: REDEMITTEL_CATEGORIES[entry.category].label, id: entry.category },
      ...wrongCats.map((c) => ({ label: REDEMITTEL_CATEGORIES[c].label, id: c })),
    ]);
    items.push({ phrase: entry.phrase, usage: entry.usage, arabic: entry.arabic, correctCat: entry.category, wrongCats, options });
  }
  return items;
}

export function RedemittelPraxis() {
  const { addXP } = useProgress();
  const [items, setItems] = useState<ChallengeItem[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<"ready" | "playing" | "done">("ready");

  function initGame() {
    setItems(buildItems(10));
    setIndex(0);
    setSelected(null);
    setScore(0);
    setPhase("playing");
  }

  const current = items[index];

  function handleSelect(catId: string) {
    if (selected !== null) return;
    setSelected(catId);
    if (catId === current.correctCat) {
      setScore((s) => s + 10);
      playCorrect();
    } else {
      playWrong();
    }
  }

  function handleNext() {
    if (index + 1 >= items.length) {
      setPhase("done");
      addXP(score + (score >= 80 ? 20 : 0));
      playXP();
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  }

  if (phase === "ready") {
    return (
      <div className="bg-[var(--color-surface)] rounded-[24px] border-2 border-[var(--color-border-default)] p-8 text-center shadow-[0_4px_16px_rgba(0,0,0,0.08)] max-w-lg mx-auto">
        <MessageSquare className="w-14 h-14 text-[var(--color-primary)] mx-auto mb-4" />
        <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">Useful Phrases Practice</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mt-2">Match English useful phrases to the right situation</p>

        <div className="flex flex-wrap gap-1.5 justify-center mt-4">
          {(Object.entries(REDEMITTEL_CATEGORIES) as [RedemittelCategory, typeof REDEMITTEL_CATEGORIES[RedemittelCategory]][]).slice(0, 6).map(([id, meta]) => (
            <span key={id} className={`inline-flex items-center gap-1 rounded-[8px] px-2 py-1 text-[10px] font-medium ${meta.color} bg-slate-50`}>
              {meta.icon} {meta.label}
            </span>
          ))}
        </div>
        <p className="text-[10px] text-[var(--color-text-disabled)] mt-2">...and 6 more categories</p>

        <button onClick={initGame}
          className="mt-5 px-8 py-3 rounded-[14px] bg-[var(--color-primary)] text-white font-bold text-sm hover:bg-brand-600 transition-all inline-flex items-center gap-2 shadow-[0_4px_0_rgba(28,176,246,0.3)]"
        >
          <MessageSquare className="w-4 h-4" /> Start Practice
        </button>
      </div>
    );
  }

  if (phase === "done") {
    const maxScore = items.length * 10;
    const pct = Math.round((score / maxScore) * 100);
    return (
      <div className="bg-[var(--color-surface)] rounded-[24px] border-2 border-[var(--color-border-default)] p-10 text-center shadow-[0_4px_16px_rgba(0,0,0,0.08)] max-w-lg mx-auto">
        <span className="text-5xl block mb-4">{pct >= 80 ? "🎉" : pct >= 50 ? "💪" : "📚"}</span>
        <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">Practice Complete!</h2>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div>
            <p className="text-3xl font-display font-extrabold text-[var(--color-success)]">{score}<span className="text-lg text-[var(--color-text-disabled)]">/{maxScore}</span></p>
            <p className="text-xs text-[var(--color-text-secondary)]">Points</p>
          </div>
          <div className="w-px h-10 bg-[var(--color-border-default)]" />
          <div>
            <p className="text-3xl font-display font-extrabold text-[var(--color-primary-dark)]">{pct}%</p>
            <p className="text-xs text-[var(--color-text-secondary)]">Accuracy</p>
          </div>
        </div>
        <p className="mt-4 text-sm font-bold bg-amber-500 text-white font-extrabold shadow-sm px-4 py-2 rounded-[10px] inline-flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" /> +{score + (pct >= 80 ? 20 : 0)} XP
        </p>
        <button onClick={() => setPhase("ready")}
          className="mt-6 px-8 py-3 rounded-[14px] bg-[var(--color-primary)] text-white font-bold text-sm hover:bg-brand-600 transition-all inline-flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Practice Again
        </button>
      </div>
    );
  }

  if (!current) return null;

  const meta = REDEMITTEL_CATEGORIES[current.correctCat];
  const scenario = SCENARIOS[current.correctCat];
  const pct = ((index + (selected ? 1 : 0)) / items.length) * 100;

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--color-primary-subtle)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-dark)]">
          <MessageSquare className="w-3 h-3" /> {index + 1}/{items.length}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--color-success)] text-white px-3 py-1 text-xs font-semibold">
          <Sparkles className="w-3 h-3" /> {score}
        </span>
      </div>

      <div className="w-full h-1.5 rounded-[var(--radius-pill)] bg-[var(--color-surface-alt)] overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.3 }} className="h-full rounded-[var(--radius-pill)] bg-[var(--color-primary)]" />
      </div>

      <div className="bg-[var(--color-surface)] rounded-[24px] border-2 border-[var(--color-border-default)] p-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        <div className="mb-3 p-3 rounded-[10px] bg-[var(--color-warning)] text-white border border-[var(--color-warning)]">
          <p className="text-xs font-semibold text-[var(--color-warning)]">{scenario.situation}</p>
          <p className="text-[11px] text-[var(--color-warning)] mt-0.5">{scenario.description}</p>
        </div>

        <div className="mb-4 text-center">
          <p className="text-lg font-display font-extrabold text-[var(--color-text-primary)] italic leading-relaxed">&ldquo;{current.phrase}&rdquo;</p>
          <p className="text-xs text-[var(--color-text-disabled)] mt-1">{current.usage}</p>
          {current.arabic && <p className="font-arabic text-xs text-[var(--color-text-disabled)] mt-0.5" lang="ar">{current.arabic}</p>}
        </div>

        <div className="space-y-2">
          {current.options.map((opt) => {
            const optMeta = REDEMITTEL_CATEGORIES[opt.id];
            let cls = "bg-[var(--color-surface)] border-2 border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:ring-[var(--color-primary)] hover:bg-[var(--color-primary-subtle)]";
            if (selected === opt.id && opt.id === current.correctCat) cls = "bg-[var(--color-success)] text-white ring-2 ring-emerald-400 text-emerald-800";
            else if (selected === opt.id && opt.id !== current.correctCat) cls = "bg-[var(--color-error)] text-white ring-2 ring-red-300 text-red-700";
            else if (selected !== null && opt.id === current.correctCat) cls = "bg-emerald-50/50 ring-1 ring-[var(--color-success)] text-[var(--color-success)]";

            return (
              <motion.button key={opt.id} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                onClick={() => handleSelect(opt.id)} disabled={selected !== null}
                className={`flex items-center gap-2 w-full px-4 py-3 rounded-[14px] text-sm font-medium transition-all ${cls}`}
              >
                {optMeta && <span className={optMeta.color}>{optMeta.icon}</span>}
                <span>{opt.label}</span>
                {selected !== null && opt.id === current.correctCat && <CheckCircle2 className="w-4 h-4 text-[var(--color-success)] ml-auto shrink-0" />}
                {selected === opt.id && opt.id !== current.correctCat && <XCircle className="w-4 h-4 text-[var(--color-error)] ml-auto shrink-0" />}
              </motion.button>
            );
          })}
        </div>
      </div>

      {selected !== null && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center">
          <button onClick={handleNext}
            className="px-8 py-3 rounded-[14px] bg-[var(--color-primary)] text-white font-bold text-sm hover:bg-brand-600 transition-all shadow-[0_4px_0_rgba(28,176,246,0.3)] inline-flex items-center gap-1.5"
          >
            {index + 1 >= items.length ? "See results" : "Next"} <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
}
