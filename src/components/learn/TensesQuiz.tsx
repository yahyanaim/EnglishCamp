"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playCorrect, playWrong, playXP } from "@/lib/audio";
import { useProgress } from "@/store/useProgress";
import { VERBS } from "@/data/conjugaise";
import { RefreshCw, Sparkles, Clock, CheckCircle2, XCircle, ArrowRight } from "lucide-react";

type Tense = "Present Simple" | "Past Simple" | "Present Perfect" | "Past Perfect" | "Future";

type TenseItem = {
  sentence: string;
  tense: Tense;
  verb: string;
  english?: string;
};

function shuffle<T>(a: T[]): T[] {
  const arr = [...a];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function detectTense(sentence: string, verbData: typeof VERBS[number]): Tense {
  const lower = sentence.toLowerCase();
  const words = lower.split(/\s+/);
  const inf = verbData.infinitive.toLowerCase();
  const pp = verbData.pastParticiple.toLowerCase();
  const past = verbData.past.toLowerCase();

  const hasPastParticiple = pp ? lower.includes(pp) : false;
  const hasInfinitive = lower.includes(inf);
  const hasWill = words.includes("will");
  const hasHave = words.some((w) => w === "have" || w === "has");
  const hasHad = words.includes("had");
  const isAmAreIs = words.some((w) => w === "am" || w === "are" || w === "is");
  const isWasWere = words.some((w) => w === "was" || w === "were");

  if (hasWill && hasInfinitive) return "Future";
  if (hasHad && hasPastParticiple) return "Past Perfect";
  if ((hasHave || isAmAreIs) && hasPastParticiple) return "Present Perfect";
  if (isWasWere || hasHad || words.includes("did") || lower.includes(past)) {
    const pastSimple = sentence.toLowerCase().replace(/\b(was|were|had|did)\b/g, "").trim();
    if (pastSimple.length > 1 || isWasWere) return "Past Simple";
  }
  return "Present Simple";
}

function buildItems(count: number): TenseItem[] {
  const items: TenseItem[] = [];
  for (const verb of shuffle(VERBS)) {
    if (items.length >= count) break;
    const shuffledExamples = shuffle(verb.examples);
    for (const ex of shuffledExamples) {
      if (items.length >= count) break;
      const tense = detectTense(ex.en, verb);
      items.push({ sentence: ex.en, tense, verb: verb.infinitive });
    }
  }
  return shuffle(items).slice(0, count);
}

const ALL_TENSES: Tense[] = ["Present Simple", "Past Simple", "Present Perfect", "Past Perfect", "Future"];

export function TensesQuiz() {
  const { addXP } = useProgress();
  const [items, setItems] = useState<TenseItem[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<Tense | null>(null);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<"ready" | "playing" | "done">("ready");
  const [rounds, setRounds] = useState(10);

  function initGame() {
    setItems(buildItems(rounds));
    setIndex(0);
    setSelected(null);
    setScore(0);
    setPhase("playing");
  }

  const current = items[index];

  function handleSelect(opt: Tense) {
    if (selected !== null) return;
    setSelected(opt);
    if (opt === current.tense) {
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
    return (
      <div className="bg-[var(--color-surface)] rounded-[24px] border-2 border-[var(--color-border-default)] p-10 text-center shadow-[0_4px_16px_rgba(0,0,0,0.08)] max-w-lg mx-auto">
        <Clock className="w-14 h-14 text-[var(--color-primary)] mx-auto mb-4" />
        <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">Tenses Quiz</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mt-2">Identify the tense of English sentences</p>
        <div className="flex items-center justify-center gap-2 mt-5">
          {[5, 10, 15].map((n) => (
            <button key={n} onClick={() => setRounds(n)}
              className={`rounded-[10px] px-4 py-2 text-xs font-bold transition-all ${rounds === n ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-default)]"}`}
            >{n} rounds</button>
          ))}
        </div>
        <button onClick={initGame}
          className="mt-6 px-8 py-3 rounded-[14px] bg-[var(--color-primary)] text-white font-bold text-sm hover:bg-brand-600 transition-all inline-flex items-center gap-2 shadow-[0_4px_0_rgba(28,176,246,0.3)]"
        >
          <Clock className="w-4 h-4" /> Start Quiz
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
        <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">Quiz Complete!</h2>
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

  if (!current) return null;

  const pct = ((index + (selected ? 1 : 0)) / items.length) * 100;

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--color-primary-subtle)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-dark)]">
          <Clock className="w-3 h-3" /> {index + 1}/{items.length}
        </span>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--color-success)] text-white px-3 py-1 text-xs font-semibold">
            <Sparkles className="w-3 h-3" /> {score}
          </span>
          <span className="text-[10px] text-[var(--color-text-disabled)] bg-[var(--color-surface-alt)] px-2 py-1 rounded-[var(--radius-pill)]">{current.verb}</span>
        </div>
      </div>

      <div className="w-full h-1.5 rounded-[var(--radius-pill)] bg-[var(--color-surface-alt)] overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.3 }} className="h-full rounded-[var(--radius-pill)] bg-[var(--color-primary)]" />
      </div>

      <div className="bg-[var(--color-surface)] rounded-[24px] border-2 border-[var(--color-border-default)] p-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)] text-center">
        <div className="mb-1">
          <span className="text-xs text-[var(--color-text-disabled)] font-medium uppercase tracking-wide">What tense is this sentence?</span>
        </div>

        <p className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-6 leading-relaxed">{current.sentence}</p>

        <div className="space-y-2">
          {ALL_TENSES.map((tense) => {
            let cls = "bg-[var(--color-surface)] border-2 border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:ring-[var(--color-primary)] hover:bg-[var(--color-primary-subtle)]";
            if (selected === tense && tense === current.tense) cls = "bg-[var(--color-success)] text-white ring-2 ring-[var(--color-success)]";
            else if (selected === tense && tense !== current.tense) cls = "bg-[var(--color-error)] text-white ring-2 ring-[var(--color-error)]";
            else if (selected !== null && tense === current.tense) cls = "bg-[var(--color-success)] text-white ring-1 ring-[var(--color-success)]";

            return (
              <motion.button key={tense} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                onClick={() => handleSelect(tense)} disabled={selected !== null}
                className={`flex items-center justify-center w-full px-4 py-3 rounded-[14px] text-sm font-medium transition-all ${cls}`}
              >
                {selected !== null && tense === current.tense && <CheckCircle2 className="w-4 h-4 text-[var(--color-success)] mr-2" />}
                {selected === tense && tense !== current.tense && <XCircle className="w-4 h-4 text-[var(--color-error)] mr-2" />}
                <span>{tense}</span>
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
