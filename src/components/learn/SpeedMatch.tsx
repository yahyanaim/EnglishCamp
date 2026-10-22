"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playCorrect, playWrong, playXP } from "@/lib/audio";
import { useProgress } from "@/store/useProgress";
import { FLASHCARDS } from "@/data/flashcards";
import { Clock, Zap, RotateCcw, Trophy, Sparkles, Target } from "lucide-react";

type MatchCard = {
  id: string;
  text: string;
  lang: "ar" | "en";
  pairId: string;
  removed: boolean;
};

function shuffle<T>(a: T[]): T[] {
  const arr = [...a];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const PAIR_COUNTS = [4, 6, 8];

export function SpeedMatch() {
  const { addXP } = useProgress();
  const [pairCount, setPairCount] = useState(6);
  const [cards, setCards] = useState<MatchCard[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [matches, setMatches] = useState(0);
  const [misses, setMisses] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [gameState, setGameState] = useState<"idle" | "playing" | "done">("idle");
  const [feedback, setFeedback] = useState<"none" | "correct" | "wrong">("none");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const feedbackRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalPairs = pairCount;

  useEffect(() => {
    try {
      const stored = localStorage.getItem("speedmatch-best");
      if (stored) setBestTime(Number(stored));
    } catch {}
  }, []);

  function initGame(count: number) {
    const pool = shuffle(FLASHCARDS).slice(0, count);
    const gameCards: MatchCard[] = pool.flatMap((c, i) => [
      { id: `ar-${i}`, text: c.ar || c.de, lang: "ar" as const, pairId: `p-${i}`, removed: false },
      { id: `en-${i}`, text: c.en, lang: "en" as const, pairId: `p-${i}`, removed: false },
    ]);
    setCards(shuffle(gameCards));
    setSelected(null);
    setMatches(0);
    setMisses(0);
    setStartTime(null);
    setElapsed(0);
    setGameState("idle");
    setFeedback("none");
    setPairCount(count);
    if (timerRef.current) clearInterval(timerRef.current);
  }

  useEffect(() => { initGame(pairCount); }, []);

  const startTimer = useCallback(() => {
    if (startTime !== null) return;
    const now = Date.now();
    setStartTime(now);
    setGameState("playing");
    timerRef.current = setInterval(() => {
      setElapsed(Date.now() - now);
    }, 100);
  }, [startTime]);

  function handleSelect(id: string) {
    if (gameState === "done") return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.removed) return;

    startTimer();
    if (feedbackRef.current) clearTimeout(feedbackRef.current);

    if (!selected) {
      setSelected(id);
      return;
    }

    const first = cards.find((c) => c.id === selected);
    if (!first || first.removed || first.pairId === card.pairId) {
      setSelected(null);
      return;
    }

    if (first.lang !== card.lang && first.pairId === card.pairId) {
      playCorrect();
      setFeedback("correct");
      setCards((prev) => prev.map((c) => c.pairId === card.pairId ? { ...c, removed: true } : c));
      setMatches((m) => m + 1);
      setSelected(null);
      feedbackRef.current = setTimeout(() => setFeedback("none"), 400);

      if (matches + 1 >= totalPairs) {
        setGameState("done");
        if (timerRef.current) clearInterval(timerRef.current);
        const finalTime = Date.now() - (startTime || Date.now());
        setElapsed(finalTime);
        if (bestTime === null || finalTime < bestTime) {
          setBestTime(finalTime);
          try { localStorage.setItem("speedmatch-best", String(finalTime)); } catch {}
        }
        const xp = Math.max(10, Math.round((totalPairs * 50) / (finalTime / 1000)));
        addXP(xp);
        playXP();
      }
    } else {
      playWrong();
      setFeedback("wrong");
      setMisses((m) => m + 1);
      setSelected(null);
      feedbackRef.current = setTimeout(() => setFeedback("none"), 400);
    }
  }

  function formatTime(ms: number) {
    const s = Math.floor(ms / 1000);
    const cs = Math.floor((ms % 1000) / 100);
    return `${s}.${cs}s`;
  }

  if (gameState === "idle" && cards.length === 0) {
    return <div className="text-center py-12 text-[var(--color-text-disabled)]">Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-[10px] bg-[var(--color-primary-subtle)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-dark)]">
            <Target className="w-3 h-3" />
            {matches}/{totalPairs} matched
          </span>
          {misses > 0 && (
            <span className="inline-flex items-center gap-1 rounded-[10px] bg-[var(--color-error)] text-white px-3 py-1 text-xs font-semibold">
              {misses} misses
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {gameState === "playing" && (
            <span className="inline-flex items-center gap-1 rounded-[10px] bg-[var(--color-warning)] text-white px-3 py-1 text-xs font-semibold">
              <Clock className="w-3 h-3" />
              {formatTime(elapsed)}
            </span>
          )}
          {bestTime !== null && (
            <span className="inline-flex items-center gap-1 rounded-[var(--radius-md)] bg-[#9B59B6] px-3 py-1 text-xs font-semibold text-white">
              <Trophy className="w-3 h-3" />
              {formatTime(bestTime)}
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-1.5">
        {PAIR_COUNTS.map((n) => (
          <button
            key={n}
            onClick={() => initGame(n)}
            className={`rounded-[10px] px-3 py-1.5 text-[11px] font-semibold transition-all ${
              pairCount === n
                ? "bg-[var(--color-primary)] text-white shadow-[0_2px_0_rgba(28,176,246,0.3)]"
                : "bg-[var(--color-surface)] border-2 border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)]"
            }`}
          >
            {n} pairs
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {gameState === "done" ? (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-[var(--color-surface)] rounded-[24px] border-2 border-[var(--color-border-default)] p-8 text-center shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
            <span className="text-5xl block mb-4">🎉</span>
            <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">All matched!</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">
              {totalPairs} pairs in {formatTime(elapsed)}
            </p>
            {misses > 0 && <p className="text-xs text-[var(--color-text-disabled)] mt-1">{misses} misses</p>}
            {elapsed === (bestTime ?? elapsed) && (
              <p className="inline-flex items-center gap-1 mt-3 text-sm font-bold bg-amber-500 text-white font-extrabold shadow-sm px-3 py-1.5 rounded-[10px]">
                <Trophy className="w-4 h-4" /> New best!
              </p>
            )}
            <button
              onClick={() => initGame(pairCount)}
              className="mt-5 px-6 py-2.5 rounded-[12px] bg-[var(--color-primary)] text-white font-bold text-sm hover:bg-brand-600 transition-all inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" /> Play again
            </button>
          </motion.div>
        ) : (
          <motion.div key="grid" className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {cards.map((card) => {
              if (card.removed) return null;
              const isSelected = selected === card.id;
              const isAr = card.lang === "ar";
              return (
                <motion.button
                  key={card.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => handleSelect(card.id)}
                  className={`relative p-4 rounded-[16px] text-sm font-medium transition-all min-h-[72px] ${
                    isSelected
                      ? "ring-2 ring-brand-500 bg-[var(--color-primary-subtle)] shadow-[0_2px_8px_rgba(28,176,246,0.2)]"
                      : isAr
                        ? "bg-[var(--color-surface)] border-2 border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:ring-[var(--color-primary)] hover:shadow-sm"
                        : "bg-[var(--color-surface-alt)] border-2 border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:ring-[var(--color-primary)] hover:shadow-sm"
                  }`}
                >
                  {isAr && (
                    <span className="absolute top-1.5 left-2 text-[9px] font-bold text-[var(--color-text-disabled)] uppercase tracking-wider">AR</span>
                  )}
                  <span className={`block ${isAr ? "mt-2 font-bold" : ""}`}>{card.text}</span>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {feedback === "correct" && (
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
          <span className="text-6xl">✅</span>
        </motion.div>
      )}
      {feedback === "wrong" && (
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
          <span className="text-6xl">❌</span>
        </motion.div>
      )}
    </div>
  );
}
