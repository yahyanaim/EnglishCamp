"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playCorrect, playWrong, playXP } from "@/lib/audio";
import { useProgress } from "@/store/useProgress";
import { FLASHCARDS } from "@/data/flashcards";
import { Target, RefreshCw, Sparkles, Clock, Zap, Trophy } from "lucide-react";

type ArticleNoun = {
  en: string;
  article: string;
};

function buildNouns(count: number): ArticleNoun[] {
  const picked = [...ITEMS].sort(() => Math.random() - 0.5).slice(0, count);
  return picked;
}

const ITEMS: ArticleNoun[] = [
  { en: "apple", article: "an" },
  { en: "banana", article: "a" },
  { en: "hour", article: "an" },
  { en: "university", article: "a" },
  { en: "umbrella", article: "an" },
  { en: "dog", article: "a" },
  { en: "honest person", article: "an" },
  { en: "European country", article: "a" },
  { en: "orange", article: "an" },
  { en: "cat", article: "a" },
  { en: "elephant", article: "an" },
  { en: "house", article: "a" },
  { en: "ice cream", article: "an" },
  { en: "book", article: "a" },
  { en: "animal", article: "an" },
  { en: "car", article: "a" },
  { en: "airport", article: "an" },
  { en: "table", article: "a" },
  { en: "egg", article: "an" },
  { en: "chair", article: "a" },
  { en: "island", article: "an" },
  { en: "school", article: "a" },
  { en: "honor", article: "an" },
  { en: "one-way street", article: "a" },
  { en: "office", article: "an" },
  { en: "garden", article: "a" },
  { en: "answer", article: "an" },
  { en: "tree", article: "a" },
  { en: "interesting story", article: "an" },
  { en: "friend", article: "a" },
];

const ARTICLES = ["a", "an"] as const;
const STORAGE_KEY = "englishcamp-artikel-best";

export function ArtikelMeister() {
  const { addXP } = useProgress();
  const [items, setItems] = useState<ArticleNoun[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [phase, setPhase] = useState<"ready" | "playing" | "done">("ready");
  const [timeLeft, setTimeLeft] = useState(30);
  const [bestScore, setBestScore] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const totalRounds = 20;

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setBestScore(Number(stored));
    } catch {}
  }, []);

  function startGame() {
    setItems(buildNouns(totalRounds));
    setIndex(0);
    setSelected(null);
    setCorrect(0);
    setWrong(0);
    setTimeLeft(30);
    setPhase("playing");
  }

  useEffect(() => {
    if (phase !== "playing") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(timerRef.current!); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase]);

  useEffect(() => {
    if (timeLeft === 0 && phase === "playing") finishGame();
  }, [timeLeft]);

  const current = items[index];
  const total = correct + wrong;

  function finishGame() {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase("done");
    const bonus = correct >= 15 ? 20 : correct >= 10 ? 10 : 0;
    addXP(correct * 5 + bonus);
    playXP();
    const newBest = Math.max(bestScore, correct);
    setBestScore(newBest);
    try { localStorage.setItem(STORAGE_KEY, String(newBest)); } catch {}
  }

  function handleSelect(article: string) {
    if (selected !== null || !current) return;
    setSelected(article);
    if (article === current.article) {
      setCorrect((c) => c + 1);
      playCorrect();
    } else {
      setWrong((w) => w + 1);
      playWrong();
    }
    setTimeout(() => {
      setSelected(null);
      if (index + 1 >= items.length) {
        finishGame();
      } else {
        setIndex((i) => i + 1);
      }
    }, 400);
  }

  if (phase === "ready") {
    return (
      <div className="bg-[var(--color-surface)] rounded-[24px] border-2 border-[var(--color-border-default)] p-10 text-center shadow-[0_4px_16px_rgba(0,0,0,0.08)] max-w-lg mx-auto">
        <Target className="w-14 h-14 text-[var(--color-primary)] mx-auto mb-4" />
        <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">Article Master</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mt-2">Choose a / an for each word — as many as you can in 30 seconds!</p>
        {bestScore > 0 && (
          <p className="mt-3 text-sm bg-amber-500 text-white font-extrabold shadow-sm rounded-[10px] px-4 py-2 inline-flex items-center gap-1.5">
            <Trophy className="w-4 h-4" /> Best: {bestScore} correct
          </p>
        )}
        <button onClick={startGame}
          className="mt-6 px-8 py-3 rounded-[14px] bg-[var(--color-primary)] text-white font-bold text-sm hover:bg-brand-600 transition-all inline-flex items-center gap-2 shadow-[0_4px_0_rgba(28,176,246,0.3)]"
        >
          <Target className="w-4 h-4" /> Start Game
        </button>
      </div>
    );
  }

  if (phase === "done") {
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    return (
      <div className="bg-[var(--color-surface)] rounded-[24px] border-2 border-[var(--color-border-default)] p-10 text-center shadow-[0_4px_16px_rgba(0,0,0,0.08)] max-w-lg mx-auto">
        <span className="text-5xl block mb-4">{pct >= 80 ? "🎉" : pct >= 50 ? "💪" : "📚"}</span>
        <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">Time&rsquo;s Up!</h2>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div>
            <p className="text-3xl font-display font-extrabold text-[var(--color-success)]">{correct}</p>
            <p className="text-xs text-[var(--color-text-secondary)]">Correct</p>
          </div>
          <div className="w-px h-10 bg-[var(--color-border-default)]" />
          <div>
            <p className="text-3xl font-display font-extrabold text-[var(--color-error)]">{wrong}</p>
            <p className="text-xs text-[var(--color-text-secondary)]">Wrong</p>
          </div>
          <div className="w-px h-10 bg-[var(--color-border-default)]" />
          <div>
            <p className="text-3xl font-display font-extrabold text-[var(--color-primary-dark)]">{pct}%</p>
            <p className="text-xs text-[var(--color-text-secondary)]">Accuracy</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 mt-4">
          <p className="text-sm font-bold bg-amber-500 text-white font-extrabold shadow-sm px-4 py-2 rounded-[10px] inline-flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> +{correct * 5 + (correct >= 15 ? 20 : correct >= 10 ? 10 : 0)} XP
          </p>
          {correct >= bestScore && correct > 0 && (
            <p className="text-xs font-bold bg-emerald-500 text-white font-bold px-3 py-2 rounded-[10px] inline-flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5" /> New Best!
            </p>
          )}
        </div>
        <button onClick={startGame}
          className="mt-6 px-8 py-3 rounded-[14px] bg-[var(--color-primary)] text-white font-bold text-sm hover:bg-brand-600 transition-all inline-flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Try Again
        </button>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 rounded-[10px] px-3 py-1 text-xs font-bold ${
            timeLeft <= 5 ? "bg-[var(--color-error)] text-white " : "bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)]"
          }`}>
            <Clock className="w-3 h-3" /> {timeLeft}s
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--color-success)] text-white px-3 py-1 text-xs font-semibold">
            <Target className="w-3 h-3" /> {correct}/{total}
          </span>
        </div>
        <span className="text-[10px] text-[var(--color-text-disabled)] bg-[var(--color-surface-alt)] px-2 py-1 rounded-[var(--radius-pill)]">{index + 1} / {totalRounds}</span>
      </div>

      <div className="w-full h-1.5 rounded-[var(--radius-pill)] bg-[var(--color-surface-alt)] overflow-hidden">
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: `${(timeLeft / 30) * 100}%` }}
          transition={{ duration: 0.3 }}
          className={`h-full rounded-[var(--radius-pill)] transition-colors ${timeLeft <= 5 ? "bg-red-500" : timeLeft <= 10 ? "bg-amber-500" : "bg-[var(--color-primary)]"}`}
        />
      </div>

      <div className="bg-[var(--color-surface)] rounded-[24px] border-2 border-[var(--color-border-default)] p-10 shadow-[0_4px_16px_rgba(0,0,0,0.08)] text-center">
        <div className="mb-2">
          <span className="text-xs text-[var(--color-text-disabled)] font-medium uppercase tracking-wide">Choose the correct article</span>
        </div>

        <p className="text-3xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">{current.en}</p>
        <p className="text-sm text-[var(--color-text-disabled)] mb-6 italic">Choose a or an</p>

        <div className="flex items-center justify-center gap-3">
          {ARTICLES.map((article) => {
            let cls = "bg-[var(--color-surface)] border-2 border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:ring-[var(--color-primary)] hover:bg-[var(--color-primary-subtle)]";
            if (selected === article && article === current.article) cls = "bg-[var(--color-success)] text-white ring-2 ring-emerald-400 text-emerald-800";
            else if (selected === article && article !== current.article) cls = "bg-[var(--color-error)] text-white ring-2 ring-red-300 text-red-700";
            else if (selected !== null && article === current.article) cls = "bg-emerald-50/50 ring-1 ring-[var(--color-success)] text-[var(--color-success)]";

            return (
              <motion.button key={article} layout whileTap={{ scale: 0.95 }}
                onClick={() => handleSelect(article)} disabled={selected !== null}
                className={`w-28 h-24 rounded-[20px] text-2xl font-extrabold transition-all ${cls}`}
              >
                {article}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
