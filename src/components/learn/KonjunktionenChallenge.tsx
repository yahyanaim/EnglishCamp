"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playCorrect, playWrong, playXP } from "@/lib/audio";
import { useProgress } from "@/store/useProgress";
import { KONNEKTOREN, CATEGORY_META } from "@/data/konnektoren";
import type { KonnektorCategory } from "@/data/konnektoren";
import { RefreshCw, Sparkles, CheckCircle2, XCircle, ArrowRight } from "lucide-react";

type ChallengeItem = {
  sentence: string;
  answer: string;
  options: string[];
  category: KonnektorCategory;
  english: string;
  arabic?: string;
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
  const connectors = shuffle(KONNEKTOREN).filter((k) => !k.word.includes("…") && !k.word.includes(","));
  const items: ChallengeItem[] = [];
  for (const k of connectors) {
    if (items.length >= count) break;
    const sentence = k.example.replace(k.word.trim(), "___").replace(/  +/g, " ");
    const sameCat = KONNEKTOREN.filter((x) => x.category === k.category && x.word !== k.word);
    const otherCat = KONNEKTOREN.filter((x) => x.category !== k.category);
    const pool = shuffle([...sameCat, ...otherCat]);
    const wrong = pool.slice(0, 5).map((x) => x.word.trim());
    const options = shuffle([k.word.trim(), ...wrong]);
    items.push({ sentence, answer: k.word.trim(), options, category: k.category, english: k.english, arabic: k.arabic });
  }
  return items;
}

export function ConnectorsChallenge() {
  const { addXP } = useProgress();
  const [items, setItems] = useState<ChallengeItem[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<"ready" | "playing" | "done">("ready");
  const [rounds, setRounds] = useState(10);
  const [catFilter, setCatFilter] = useState<KonnektorCategory | "all">("all");

  function initGame() {
    const pool = catFilter === "all" ? buildItems(rounds) : buildItems(rounds * 2).filter((i) => i.category === catFilter).slice(0, rounds);
    setItems(pool);
    setIndex(0);
    setSelected(null);
    setScore(0);
    setPhase("playing");
  }

  const current = items[index];

  function handleSelect(opt: string) {
    if (selected !== null) return;
    setSelected(opt);
    if (opt === current.answer) {
      setScore((s) => s + 10);
      playCorrect();
    } else {
      playWrong();
    }
  }

  function handleNext() {
    if (index + 1 >= items.length) {
      setPhase("done");
      addXP(score + (score >= rounds * 8 ? 20 : 0));
      playXP();
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  }

  if (phase === "ready") {
    const cats = Object.entries(CATEGORY_META);
    return (
      <div className="bg-[var(--color-surface)] rounded-[24px] border-2 border-[var(--color-border-default)] p-8 text-center shadow-[0_4px_16px_rgba(0,0,0,0.08)] max-w-lg mx-auto">
        <span className="text-5xl block mb-4">🔗</span>
        <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">Conjunctions Challenge</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mt-2">Choose the correct conjunction to complete each sentence</p>

        <div className="flex items-center justify-center gap-2 mt-5">
          {[5, 10, 15, 20].map((n) => (
            <button key={n} onClick={() => setRounds(n)}
              className={`rounded-[10px] px-4 py-2 text-xs font-bold transition-all ${rounds === n ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-default)]"}`}
            >{n}</button>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 justify-center mt-4">
          <button onClick={() => setCatFilter("all")}
            className={`rounded-[8px] px-2.5 py-1 text-[10px] font-bold transition-all ${catFilter === "all" ? "bg-slate-800 text-white" : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-default)]"}`}
          >All</button>
          {cats.map(([id, meta]) => (
            <button key={id} onClick={() => setCatFilter(id as KonnektorCategory)}
              className={`rounded-[8px] px-2.5 py-1 text-[10px] font-bold transition-all ${catFilter === id ? "bg-slate-800 text-white" : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-default)]"}`}
            >{meta.icon} {meta.label}</button>
          ))}
        </div>

        <button onClick={initGame}
          className="mt-6 px-8 py-3 rounded-[14px] bg-[var(--color-primary)] text-white font-bold text-sm hover:bg-brand-600 transition-all inline-flex items-center gap-2 shadow-[0_4px_0_rgba(28,176,246,0.3)]"
        >
          <span className="text-lg">🔗</span> Start Challenge
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
        <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">Challenge Complete!</h2>
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
          <RefreshCw className="w-4 h-4" /> Play Again
        </button>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="text-center py-10">
        <p className="text-[var(--color-text-secondary)]">Not enough items for this category. Try &ldquo;All&rdquo;.</p>
        <button onClick={() => setPhase("ready")} className="mt-4 text-[var(--color-primary)] font-medium text-sm">Go back</button>
      </div>
    );
  }

  const meta = CATEGORY_META[current.category];
  const pct = ((index + (selected ? 1 : 0)) / items.length) * 100;

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--color-primary-subtle)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-dark)]">
          🔗 {index + 1}/{items.length}
        </span>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--color-success)] text-white px-3 py-1 text-xs font-semibold">
            <Sparkles className="w-3 h-3" /> {score}
          </span>
          {meta && (
            <span className={`text-[10px] bg-[var(--color-surface-alt)] px-2 py-1 rounded-[var(--radius-pill)] ${meta.color}`}>
              {meta.icon} {meta.label}
            </span>
          )}
        </div>
      </div>

      <div className="w-full h-1.5 rounded-[var(--radius-pill)] bg-[var(--color-surface-alt)] overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.3 }} className="h-full rounded-[var(--radius-pill)] bg-[var(--color-primary)]" />
      </div>

      <div className="bg-[var(--color-surface)] rounded-[24px] border-2 border-[var(--color-border-default)] p-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        <div className="mb-1">
          <span className="text-xs text-[var(--color-text-disabled)] font-medium uppercase tracking-wide">Choose the correct conjunction</span>
        </div>

        <p className="text-lg font-medium text-[var(--color-text-primary)] leading-relaxed mb-6">
          {current.sentence.split("___").map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <span className="inline-block mx-1 px-4 py-0.5 rounded bg-[var(--color-warning)] text-white border-2 border-dashed border-[var(--color-warning)] font-bold text-sm">
                  ?
                </span>
              )}
            </span>
          ))}
        </p>

        <div className="space-y-2">
          {current.options.map((opt) => {
            let cls = "bg-[var(--color-surface)] border-2 border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:ring-[var(--color-primary)] hover:bg-[var(--color-primary-subtle)]";
            if (selected === opt && opt === current.answer) cls = "bg-[var(--color-success)] text-white ring-2 ring-emerald-400";
            else if (selected === opt && opt !== current.answer) cls = "bg-[var(--color-error)] text-white ring-2 ring-red-300";
            else if (selected !== null && opt === current.answer) cls = "bg-emerald-50/50 ring-1 ring-[var(--color-success)] text-[var(--color-success)]";

            return (
              <motion.button key={opt} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                onClick={() => handleSelect(opt)} disabled={selected !== null}
                className={`flex items-center gap-2 w-full px-4 py-3 rounded-[14px] text-sm font-medium transition-all ${cls}`}
              >
                {selected !== null && opt === current.answer && <CheckCircle2 className="w-4 h-4 text-[var(--color-success)] shrink-0" />}
                {selected === opt && opt !== current.answer && <XCircle className="w-4 h-4 text-[var(--color-error)] shrink-0" />}
                <span>{opt}</span>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {selected !== null && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 rounded-[10px] bg-[var(--color-surface-alt)] text-xs text-[var(--color-text-secondary)]"
            >
              <strong className="text-[var(--color-text-secondary)]">{current.answer}</strong> — {current.english}
            </motion.div>
          )}
        </AnimatePresence>
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
