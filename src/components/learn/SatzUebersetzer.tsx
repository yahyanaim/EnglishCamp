"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playCorrect, playWrong, playXP } from "@/lib/audio";
import { useProgress } from "@/store/useProgress";
import { FLASHCARDS } from "@/data/flashcards";
import { VERBS } from "@/data/conjugaise";
import { NOUN_VERB_COLLOCATIONS } from "@/data/nomen-verb-verbindungen";
import { RefreshCw, Sparkles, ArrowLeftRight, CheckCircle2, XCircle, ArrowRight } from "lucide-react";

type TransItem = {
  id: string;
  english: string;
  arabic: string;
  source: string;
};

function shuffle<T>(a: T[]): T[] {
  const arr = [...a];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildItems(count: number): TransItem[] {
  const pool: TransItem[] = [];

  for (const v of VERBS) {
    for (const ex of v.examples) {
      if (ex.ar) pool.push({ id: `v-${v.infinitive}-${pool.length}`, english: ex.en, arabic: ex.ar, source: v.infinitive });
    }
  }

  for (const nvv of NOUN_VERB_COLLOCATIONS) {
    pool.push({ id: `nvv-${nvv.verb}-${nvv.noun}-${pool.length}`, english: `${nvv.verb} ${nvv.noun}`, arabic: nvv.arabic, source: `${nvv.verb} ${nvv.noun}` });
  }

  for (const fc of FLASHCARDS) {
    if (fc.example) {
      pool.push({ id: `fc-${fc.id}`, english: fc.example.de, arabic: fc.example.ar || fc.example.en, source: fc.de });
    }
  }

  const english = new Set<string>(), arabic = new Set<string>();
  return shuffle(pool).filter(item => {
    if (english.has(item.english) || arabic.has(item.arabic)) return false;
    english.add(item.english); arabic.add(item.arabic); return true;
  }).slice(0, count);
}

export function SatzUebersetzer() {
  const { addXP } = useProgress();
  const [items, setItems] = useState<TransItem[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<"ready" | "playing" | "done">("ready");
  const [mode, setMode] = useState<"english" | "arabic">("english");

  function initGame() {
    setItems(buildItems(10));
    setIndex(0);
    setSelected(null);
    setScore(0);
    setPhase("playing");
  }

  const current = items[index];
  const correctAnswer = current?.[mode];
  const options = useMemo(() => {
    if (!current) return [];
    const wrong = shuffle(Array.from(new Set(items.map(x => x[mode]))).filter(x => x !== current[mode])).slice(0, 3);
    return shuffle([current[mode], ...wrong]);
  }, [current, mode, items]);

  function handleSelect(opt: string) {
    if (selected !== null || !current) return;
    setSelected(opt);
    if (opt === correctAnswer) {
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
        <ArrowLeftRight className="w-14 h-14 text-[var(--color-primary)] mx-auto mb-4" />
      <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">Sentence Translator</h2>
      <p className="text-sm text-[var(--color-text-secondary)] mt-2">Translate Arabic and English sentences</p>
        <div className="flex items-center justify-center gap-2 mt-5">
          <button onClick={() => setMode("english")}
            className={`rounded-[10px] px-4 py-2 text-xs font-bold transition-all ${mode === "english" ? "bg-[var(--color-primary)] text-[var(--color-on-brand)]" : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-default)]"}`}
          >AR → EN</button>
          <button onClick={() => setMode("arabic")}
            className={`rounded-[10px] px-4 py-2 text-xs font-bold transition-all ${mode === "arabic" ? "bg-[var(--color-primary)] text-[var(--color-on-brand)]" : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-default)]"}`}
          >EN → AR</button>
        </div>
        <button onClick={initGame}
          className="mt-6 px-8 py-3 rounded-[14px] bg-[var(--color-primary)] text-[var(--color-on-brand)] font-bold text-sm hover:bg-brand-600 transition-all inline-flex items-center gap-2 shadow-[0_4px_0_rgba(28,176,246,0.3)]"
        >
          <ArrowLeftRight className="w-4 h-4" /> Start Translating
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
        <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">Session Complete!</h2>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div>
            <p className="text-3xl font-display font-extrabold text-[var(--color-success)]">{score}<span className="text-lg text-[var(--color-text-disabled)]">/{maxScore}</span></p>
            <p className="text-xs text-[var(--color-text-secondary)]">Points</p>
          </div>
          <div className="w-px h-10 bg-[var(--color-border-default)]" />
          <div>
            <p className="text-3xl font-display font-extrabold text-[var(--color-text-link)]">{pct}%</p>
            <p className="text-xs text-[var(--color-text-secondary)]">Accuracy</p>
          </div>
        </div>
        <p className="mt-4 text-sm font-bold bg-amber-500 text-[var(--color-on-brand)] font-extrabold shadow-sm px-4 py-2 rounded-[10px] inline-flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" /> +{score + (pct >= 80 ? 20 : 0)} XP
        </p>
        <button onClick={() => setPhase("ready")}
          className="mt-6 px-8 py-3 rounded-[14px] bg-[var(--color-primary)] text-[var(--color-on-brand)] font-bold text-sm hover:bg-brand-600 transition-all inline-flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> New Session
        </button>
      </div>
    );
  }

  if (!current) return null;

  const promptText = mode === "english"
    ? { source: current.arabic, target: "en", label: "What does this Arabic text mean?" }
    : { source: current.english, target: "ar", label: "How do you say this in Arabic?" };

  const pct = ((index + (selected ? 1 : 0)) / items.length) * 100;

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--color-primary-subtle)] px-3 py-1 text-xs font-semibold text-[var(--color-text-link)]">
          <ArrowLeftRight className="w-3 h-3" /> {index + 1}/{items.length}
        </span>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--color-success)] text-[var(--color-on-brand)] px-3 py-1 text-xs font-semibold">
            <Sparkles className="w-3 h-3" /> {score}
          </span>
          <span className="text-[10px] text-[var(--color-text-disabled)] bg-[var(--color-surface-alt)] px-2 py-1 rounded-[var(--radius-pill)]">{current.source}</span>
        </div>
      </div>

      <div className="w-full h-1.5 rounded-[var(--radius-pill)] bg-[var(--color-surface-alt)] overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.3 }} className="h-full rounded-[var(--radius-pill)] bg-[var(--color-primary)]" />
      </div>

      <div className="bg-[var(--color-surface)] rounded-[24px] border-2 border-[var(--color-border-default)] p-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        <div className="mb-1">
          <span className="text-xs text-[var(--color-text-disabled)] font-medium uppercase tracking-wide">{promptText.label}</span>
        </div>

        <div className="mb-6 p-4 rounded-[16px] bg-[var(--color-surface-alt)]">
          <p lang={mode === "english" ? "ar" : "en"} dir={mode === "english" ? "rtl" : "ltr"} className="text-lg font-display font-extrabold text-[var(--color-text-primary)] text-center leading-relaxed">{promptText.source}</p>
        </div>

        <div className="space-y-2">
          {options.map((opt) => {
            let cls = "bg-[var(--color-surface)] border-2 border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:ring-[var(--color-primary)] hover:bg-[var(--color-primary-subtle)]";
            if (selected === opt && opt === correctAnswer) cls = "bg-[var(--color-success)] text-[var(--color-on-brand)] ring-2 ring-emerald-400";
            else if (selected === opt && opt !== correctAnswer) cls = "bg-[var(--color-error)] text-[var(--color-on-brand)] ring-2 ring-red-300";
            else if (selected !== null && opt === correctAnswer) cls = "bg-[var(--color-success-bg)] ring-1 ring-[var(--color-success)] text-[var(--color-text-success)]";

            return (
              <motion.button key={opt} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                onClick={() => handleSelect(opt)} disabled={selected !== null}
                className={`flex items-center gap-2 w-full px-4 py-3 rounded-[14px] text-sm font-medium transition-all text-left ${cls}`}
              >
                {selected !== null && opt === correctAnswer && <CheckCircle2 className="w-4 h-4 text-current shrink-0" />}
                {selected === opt && opt !== correctAnswer && <XCircle className="w-4 h-4 text-current shrink-0" />}
                <span lang={mode === "english" ? "en" : "ar"} dir={mode === "english" ? "ltr" : "rtl"}>{opt}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {selected !== null && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center">
          <button onClick={handleNext}
            className="px-8 py-3 rounded-[14px] bg-[var(--color-primary)] text-[var(--color-on-brand)] font-bold text-sm hover:bg-brand-600 transition-all shadow-[0_4px_0_rgba(28,176,246,0.3)] inline-flex items-center gap-1.5"
          >
            {index + 1 >= items.length ? "See results" : "Next"} <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
}
