"use client";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playCorrect, playWrong, playXP } from "@/lib/audio";
import { useProgress } from "@/store/useProgress";
import { FLASHCARDS } from "@/data/flashcards";
import { NOUN_VERB_COLLOCATIONS } from "@/data/nomen-verb-verbindungen";
import { Volume2, SkipForward, RefreshCw, Target, BarChart3, Ear, CheckCircle2, XCircle, Sparkles } from "lucide-react";

function speak(text: string, rate: number = 0.85) {
  if (typeof window === "undefined") return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = rate;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

type Difficulty = "words" | "phrases";

type ListenItem = {
  de: string;
  en: string;
  source: string;
};

function buildItems(difficulty: Difficulty): ListenItem[] {
  if (difficulty === "words") {
    return FLASHCARDS.map((c) => ({ de: c.de, en: c.en, source: c.cat }));
  }
  return NOUN_VERB_COLLOCATIONS.map((nvv) => {
    return { de: `${nvv.verb} ${nvv.noun}`, en: nvv.arabic, source: `${nvv.verb} ${nvv.noun}` };
  });
}

function shuffle<T>(a: T[]): T[] {
  const arr = [...a];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function ListeningLab() {
  const { addXP } = useProgress();
  const [difficulty, setDifficulty] = useState<Difficulty>("words");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [results, setResults] = useState<{ correct: boolean }[]>([]);
  const [phase, setPhase] = useState<"ready" | "playing" | "done">("ready");
  const [speed, setSpeed] = useState<0.85 | 0.6>(0.85);
  const [autoAdvance, setAutoAdvance] = useState(false);

  const [items, setItems] = useState<ListenItem[]>([]);
  const advanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (advanceRef.current) clearTimeout(advanceRef.current); window.speechSynthesis?.cancel(); }, []);
  function startGame() {
    if (advanceRef.current) clearTimeout(advanceRef.current);
    setItems(shuffle(buildItems(difficulty)).slice(0, 10));
    setIndex(0); setSelected(null); setResults([]); setPhase("playing");
  }
  const current = items[index];
  const correct = results.filter((r) => r.correct).length;
  const accuracy = results.length > 0 ? Math.round((correct / results.length) * 100) : 0;

  const options = useMemo(() => {
    if (!current) return [];
    const wrong = shuffle(Array.from(new Set(items.map(x => x.en))).filter(x => x !== current.en)).slice(0, 3);
    return shuffle([current.en, ...wrong]);
  }, [current, items]);

  useEffect(() => {
    if (phase === "playing" && current) {
      const t = setTimeout(() => speak(current.de, speed), 300);
      return () => clearTimeout(t);
    }
  }, [current, phase, speed]);

  function handlePlay() {
    if (current) speak(current.de, speed);
  }

  function handleSelect(opt: string) {
    if (selected !== null) return;
    setSelected(opt);
    if (opt === current.en) playCorrect();
    else playWrong();
    setResults((r) => [...r, { correct: opt === current.en }]);
    if (autoAdvance && index + 1 < items.length) {
      advanceRef.current = setTimeout(() => {
        setSelected(null);
        setIndex((i) => i + 1);
      }, 1200);
    }
  }

  function handleNext() {
    if (index + 1 >= items.length) {
      setPhase("done");
      const xp = correct * 5 + (accuracy >= 80 ? 10 : 0);
      addXP(xp);
      playXP();
      return;
    }
    setSelected(null);
    setIndex((i) => i + 1);
  }

  function handleRestart() {
    setIndex(0);
    setSelected(null);
    setResults([]);
    setPhase("ready");
  }

  const pct = ((index + 1) / items.length) * 100;

  if (phase === "ready") {
    return (
      <div className="bg-[var(--color-surface)] rounded-[24px] border-2 border-[var(--color-border-default)] p-10 text-center shadow-[0_4px_16px_rgba(0,0,0,0.08)] max-w-lg mx-auto">
        <Ear className="w-14 h-14 text-[var(--color-primary)] mx-auto mb-4" />
        <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">Listening Lab</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mt-2">Hear English words and phrases, then choose the correct translation</p>

        <div className="flex gap-2 justify-center mt-5">
          {(["words", "phrases"] as const).map((d) => (
            <button key={d} onClick={() => setDifficulty(d)}
              className={`rounded-[10px] px-4 py-2 text-xs font-bold transition-all ${
                difficulty === d ? "bg-[var(--color-primary)] text-[var(--color-on-brand)]" : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-default)]"
              }`}
            >
              {d === "words" ? "Words" : "Phrases"}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 mt-4 text-xs text-[var(--color-text-secondary)]">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={autoAdvance} onChange={(e) => setAutoAdvance(e.target.checked)} className="rounded" />
            Auto-advance
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={speed === 0.6} onChange={(e) => setSpeed(e.target.checked ? 0.6 : 0.85)} className="rounded" />
            Slow
          </label>
        </div>

        <button onClick={startGame}
          className="mt-6 px-8 py-3 rounded-[14px] bg-[var(--color-primary)] text-[var(--color-on-brand)] font-bold text-sm hover:bg-brand-600 transition-all inline-flex items-center gap-2 shadow-[0_4px_0_rgba(28,176,246,0.3)]"
        >
          <Ear className="w-4 h-4" /> Start Listening
        </button>
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className="bg-[var(--color-surface)] rounded-[24px] border-2 border-[var(--color-border-default)] p-10 text-center shadow-[0_4px_16px_rgba(0,0,0,0.08)] max-w-lg mx-auto">
        <span className="text-5xl block mb-4">{accuracy >= 80 ? "🎉" : "💪"}</span>
        <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">Session complete!</h2>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div>
            <p className="text-3xl font-display font-extrabold text-[var(--color-success)]">{correct}<span className="text-lg text-[var(--color-text-disabled)]">/{items.length}</span></p>
            <p className="text-xs text-[var(--color-text-secondary)]">Correct</p>
          </div>
          <div className="w-px h-10 bg-[var(--color-border-default)]" />
          <div>
            <p className="text-3xl font-display font-extrabold text-[var(--color-text-link)]">{accuracy}%</p>
            <p className="text-xs text-[var(--color-text-secondary)]">Accuracy</p>
          </div>
        </div>
        <p className="mt-4 text-sm font-bold bg-amber-500 text-[var(--color-on-brand)] font-extrabold shadow-sm px-4 py-2 rounded-[10px] inline-flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" /> +{correct * 5 + (accuracy >= 80 ? 10 : 0)} XP
        </p>
        <button onClick={handleRestart}
          className="mt-6 px-8 py-3 rounded-[14px] bg-[var(--color-primary)] text-[var(--color-on-brand)] font-bold text-sm hover:bg-brand-600 transition-all inline-flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> New session
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--color-primary-subtle)] px-3 py-1 text-xs font-semibold text-[var(--color-text-link)]">
          <Ear className="w-3 h-3" />
          {index + 1}/{items.length}
        </span>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--color-surface-alt)] px-3 py-1 text-xs font-semibold text-[var(--color-text-secondary)]">
            <BarChart3 className="w-3 h-3" />
            {correct}/{results.length}
          </span>
          <span className="text-[10px] text-[var(--color-text-disabled)] bg-[var(--color-surface-alt)] px-2 py-1 rounded-[var(--radius-pill)]">{difficulty === "words" ? "Word" : "Phrase"}</span>
        </div>
      </div>

      <div className="w-full h-1.5 rounded-[var(--radius-pill)] bg-[var(--color-surface-alt)] overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.3 }} className="h-full rounded-[var(--radius-pill)] bg-[var(--color-primary)]" />
      </div>

      <div className="bg-[var(--color-surface)] rounded-[24px] border-2 border-[var(--color-border-default)] p-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)] text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <button onClick={handlePlay}
            className="w-14 h-14 rounded-[var(--radius-pill)] bg-[var(--color-primary)] text-[var(--color-on-brand)] flex items-center justify-center hover:bg-brand-600 transition-all shadow-[0_4px_0_rgba(28,176,246,0.3)]"
            title="Play audio"
          >
            <Volume2 className="w-6 h-6" />
          </button>
          <button onClick={() => speak(current.de, speed)}
            className="text-xs text-[var(--color-text-disabled)] hover:text-[var(--color-text-secondary)] px-2 py-1 rounded bg-[var(--color-surface-alt)]"
          >
            Repeat
          </button>
        </div>

        <p className="text-xs text-[var(--color-text-disabled)] mb-5">What did you hear? Choose the correct translation</p>

        <div className="space-y-2">
          {options.map((opt) => {
            let cls = "bg-[var(--color-surface)] border-2 border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:ring-[var(--color-primary)] hover:bg-[var(--color-primary-subtle)]";
            if (selected === opt && opt === current.en) cls = "bg-[var(--color-success)] text-[var(--color-on-brand)] ring-2 ring-[var(--color-success)]";
            else if (selected === opt && opt !== current.en) cls = "bg-[var(--color-error)] text-[var(--color-on-brand)] ring-2 ring-[var(--color-error)]";
            else if (selected !== null && opt === current.en) cls = "bg-[var(--color-success)] text-[var(--color-on-brand)] ring-1 ring-[var(--color-success)]";

            return (
              <motion.button key={opt} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                onClick={() => handleSelect(opt)} disabled={selected !== null}
                className={`flex items-center gap-2 w-full px-4 py-3 rounded-[14px] text-sm font-medium transition-all ${cls}`}
              >
                {selected !== null && opt === current.en && <CheckCircle2 className="w-4 h-4 text-current shrink-0" />}
                {selected === opt && opt !== current.en && <XCircle className="w-4 h-4 text-current shrink-0" />}
                <span>{opt}</span>
              </motion.button>
            );
          })}
        </div>

        {selected !== null && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-xs text-[var(--color-text-disabled)]">
            <span className="font-medium text-[var(--color-text-secondary)]">Heard:</span> {current.de}
          </motion.div>
        )}
      </div>

      {selected !== null && (!autoAdvance || index + 1 >= items.length) && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center">
          <button onClick={handleNext}
            className="px-8 py-3 rounded-[14px] bg-[var(--color-primary)] text-[var(--color-on-brand)] font-bold text-sm hover:bg-brand-600 transition-all shadow-[0_4px_0_rgba(28,176,246,0.3)]"
          >
            {index + 1 >= items.length ? "See results" : "Next"}
          </button>
        </motion.div>
      )}
    </div>
  );
}
