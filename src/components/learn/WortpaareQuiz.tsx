"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playCorrect, playWrong, playXP } from "@/lib/audio";
import { useProgress } from "@/store/useProgress";
import { CONFUSED_PAIRS } from "@/data/wortpaare";
import { RefreshCw, Sparkles, Shuffle, CheckCircle2, XCircle, ArrowRight } from "lucide-react";

type Item = { example: string; wordA: string; wordB: string; correct: "A" | "B"; pairKey: string };

function shuffle<T>(a: T[]): T[] {
  const arr = [...a];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function WordPairQuiz() {
  const { addXP } = useProgress();
  const [items, setItems] = useState<Item[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<"A" | "B" | null>(null);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<"ready" | "playing" | "done">("ready");
  const [pairFilter, setPairFilter] = useState<string>("all");

  function initGame() {
    const pool: Item[] = [];
    const pairs = pairFilter === "all" ? CONFUSED_PAIRS : CONFUSED_PAIRS.filter((p) => `${p.word1}/${p.word2}` === pairFilter);
    for (const pair of pairs) {
      const key = `${pair.word1}/${pair.word2}`;
      pool.push({ example: pair.example1, wordA: pair.word1, wordB: pair.word2, correct: "A", pairKey: key });
      pool.push({ example: pair.example2, wordA: pair.word1, wordB: pair.word2, correct: "B", pairKey: key });
    }
    setItems(shuffle(pool).slice(0, 10));
    setIndex(0);
    setSelected(null);
    setScore(0);
    setPhase("playing");
  }

  const current = items[index];
  const pair = current ? CONFUSED_PAIRS.find((p) => `${p.word1}/${p.word2}` === current.pairKey) : null;

  function handleSelect(opt: "A" | "B") {
    if (selected !== null || !current) return;
    setSelected(opt);
    if (opt === current.correct) { setScore((s) => s + 10); playCorrect(); }
    else { playWrong(); }
  }

  function handleNext() {
    if (index + 1 >= items.length) { setPhase("done"); addXP(score + (score >= 80 ? 20 : 0)); playXP(); return; }
    setIndex((i) => i + 1); setSelected(null);
  }

  if (phase === "ready") return (
    <div className="bg-[var(--color-surface)] rounded-[24px] border-2 border-[var(--color-border-default)] p-8 text-center shadow-[0_4px_16px_rgba(0,0,0,0.08)] max-w-lg mx-auto">
      <Shuffle className="w-14 h-14 text-[var(--color-primary)] mx-auto mb-4" />
      <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">Word Pairs Quiz</h2>
      <p className="text-sm text-[var(--color-text-secondary)] mt-2">Choose the correct word (affect/effect, their/there/they&apos;re, etc.)</p>
      <div className="flex flex-wrap gap-1.5 justify-center mt-4">
        <button onClick={() => setPairFilter("all")} className={`rounded-[8px] px-2.5 py-1 text-[10px] font-bold transition-all ${pairFilter === "all" ? "bg-slate-800 text-white" : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-default)]"}`}>All</button>
        {CONFUSED_PAIRS.map((p) => (
          <button key={`${p.word1}/${p.word2}`} onClick={() => setPairFilter(`${p.word1}/${p.word2}`)} className={`rounded-[8px] px-2.5 py-1 text-[10px] font-bold transition-all ${pairFilter === `${p.word1}/${p.word2}` ? "bg-slate-800 text-white" : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-default)]"}`}>{p.word1}/{p.word2}</button>
        ))}
      </div>
      <button onClick={initGame} className="mt-6 px-8 py-3 rounded-[14px] bg-[var(--color-primary)] text-white font-bold text-sm hover:bg-brand-600 transition-all inline-flex items-center gap-2 shadow-[0_4px_0_rgba(28,176,246,0.3)]"><Shuffle className="w-4 h-4" /> Start Quiz</button>
    </div>
  );

  if (phase === "done") {
    const pct = Math.round((score / (items.length * 10)) * 100);
    return (
      <div className="bg-[var(--color-surface)] rounded-[24px] border-2 border-[var(--color-border-default)] p-10 text-center shadow-[0_4px_16px_rgba(0,0,0,0.08)] max-w-lg mx-auto">
        <span className="text-5xl block mb-4">{pct >= 80 ? "🎉" : pct >= 50 ? "💪" : "📚"}</span>
        <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">Quiz Complete!</h2>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div><p className="text-3xl font-display font-extrabold text-[var(--color-success)]">{score}<span className="text-lg text-[var(--color-text-disabled)]">/{items.length * 10}</span></p><p className="text-xs text-[var(--color-text-secondary)]">Points</p></div>
          <div className="w-px h-10 bg-[var(--color-border-default)]" />
          <div><p className="text-3xl font-display font-extrabold text-[var(--color-primary-dark)]">{pct}%</p><p className="text-xs text-[var(--color-text-secondary)]">Accuracy</p></div>
        </div>
        <p className="mt-4 text-sm font-bold bg-amber-500 text-white font-extrabold shadow-sm px-4 py-2 rounded-[10px] inline-flex items-center gap-1.5"><Sparkles className="w-4 h-4" /> +{score + (pct >= 80 ? 20 : 0)} XP</p>
        <button onClick={() => setPhase("ready")} className="mt-6 px-8 py-3 rounded-[14px] bg-[var(--color-primary)] text-white font-bold text-sm hover:bg-brand-600 transition-all inline-flex items-center gap-2"><RefreshCw className="w-4 h-4" /> New Quiz</button>
      </div>
    );
  }

  if (!current) return null;
  const pct = ((index + (selected ? 1 : 0)) / items.length) * 100;

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--color-primary-subtle)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-dark)]"><Shuffle className="w-3 h-3" /> {index + 1}/{items.length}</span>
        <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--color-success)] text-white px-3 py-1 text-xs font-semibold"><Sparkles className="w-3 h-3" /> {score}</span>
      </div>
      <div className="w-full h-1.5 rounded-[var(--radius-pill)] bg-[var(--color-surface-alt)] overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.3 }} className="h-full rounded-[var(--radius-pill)] bg-[var(--color-primary)]" /></div>
      <div className="bg-[var(--color-surface)] rounded-[24px] border-2 border-[var(--color-border-default)] p-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        <div className="mb-2"><span className="text-xs text-[var(--color-text-disabled)] font-medium uppercase tracking-wide">Choose the correct word</span></div>
        <p className="text-lg font-display font-extrabold text-[var(--color-text-primary)] text-center leading-relaxed">{current.example}</p>
        <div className="grid grid-cols-2 gap-3 mt-5">
          {[
            { label: "A", word: current.wordA },
            { label: "B", word: current.wordB },
          ].map((opt) => {
            let cls = "bg-[var(--color-surface)] border-2 border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:ring-[var(--color-primary)] hover:bg-[var(--color-primary-subtle)]";
            const isCorrect = opt.label === current.correct;
            if (selected === opt.label && isCorrect) cls = "bg-[var(--color-success)] text-white ring-2 ring-emerald-400 text-emerald-800";
            else if (selected === opt.label && !isCorrect) cls = "bg-[var(--color-error)] text-white ring-2 ring-red-300 text-red-700";
            else if (selected !== null && isCorrect) cls = "bg-emerald-50/50 ring-1 ring-[var(--color-success)] text-[var(--color-success)]";
            return (
              <motion.button key={opt.label} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                onClick={() => handleSelect(opt.label as "A" | "B")} disabled={selected !== null}
                className={`flex flex-col items-center gap-1 w-full px-4 py-5 rounded-[14px] text-sm font-bold transition-all ${cls}`}
              >
                <span className="text-[10px] text-[var(--color-text-disabled)] uppercase tracking-wide">{opt.label}</span>
                <span className="text-base">{opt.word}</span>
                {selected !== null && isCorrect && <CheckCircle2 className="w-5 h-5 text-[var(--color-success)]" />}
                {selected === opt.label && !isCorrect && <XCircle className="w-5 h-5 text-[var(--color-error)]" />}
              </motion.button>
            );
          })}
        </div>
        <AnimatePresence>{selected !== null && pair && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-3 rounded-[10px] bg-[var(--color-surface-alt)] text-xs text-[var(--color-text-secondary)]">
            <p className="font-medium text-[var(--color-text-secondary)] mb-1">{pair.word1}: {pair.meaning1}</p>
            <p className="font-medium text-[var(--color-text-secondary)] mb-1">{pair.word2}: {pair.meaning2}</p>
          </motion.div>
        )}</AnimatePresence>
      </div>
      {selected !== null && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center">
          <button onClick={handleNext} className="px-8 py-3 rounded-[14px] bg-[var(--color-primary)] text-white font-bold text-sm hover:bg-brand-600 transition-all shadow-[0_4px_0_rgba(28,176,246,0.3)] inline-flex items-center gap-1.5">
            {index + 1 >= items.length ? "See results" : "Next"} <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
}