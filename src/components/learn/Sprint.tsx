"use client";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playCorrect, playWrong, playXP } from "@/lib/audio";
import { useProgress } from "@/store/useProgress";
import { FLASHCARDS } from "@/data/flashcards";
import { Clock, Zap, RotateCcw, Trophy, Sparkles, Target, ChevronRight } from "lucide-react";

type Question = {
  id: string;
  sentence: string;
  correctAnswer: string;
  options: string[];
};

function shuffle<T>(a: T[]): T[] {
  const arr = [...a];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildQuestions(count: number): Question[] {
  const withExamples = FLASHCARDS.filter((c) => c.example?.de);
  const pool = shuffle(withExamples).slice(0, count + 10);
  return pool.slice(0, count).map((c) => {
    const sentence = c.example!.de.replace(c.de, "___");
    const correctAnswer = c.de;
    const wrong = shuffle(FLASHCARDS.filter((x) => x.de !== c.de)).slice(0, 3).map((x) => x.de);
    const options = shuffle([c.de, ...wrong]);
    return { id: c.id, sentence, correctAnswer, options };
  });
}

const STORAGE_KEY = "englishcamp-sprint-best";
const DURATION = 60;

export function Sprint() {
  const { addXP } = useProgress();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [phase, setPhase] = useState<"ready" | "playing" | "done">("ready");
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [bestScore, setBestScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setBestScore(Number(stored));
    } catch {}
  }, []);

  function startGame() {
    const qs = buildQuestions(80);
    setQuestions(qs);
    setIndex(0);
    setSelected(null);
    setCorrect(0);
    setWrong(0);
    setTimeLeft(DURATION);
    setShowAnswer(false);
    setPhase("playing");
  }

  useEffect(() => {
    if (phase !== "playing") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase]);

  useEffect(() => {
    if (timeLeft === 0 && phase === "playing") {
      finishGame();
    }
  }, [timeLeft]);

  const totalAnswered = correct + wrong;
  const accuracy = totalAnswered > 0 ? Math.round((correct / totalAnswered) * 100) : 0;
  const current = questions[index];

  function finishGame() {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase("done");
    const xp = correct * 5 + (totalAnswered >= 20 ? 20 : totalAnswered >= 10 ? 10 : 0);
    addXP(xp);
    playXP();
    const newBest = Math.max(bestScore, correct);
    setBestScore(newBest);
    try { localStorage.setItem(STORAGE_KEY, String(newBest)); } catch {}
  }

  function handleSelect(opt: string) {
    if (selected !== null || !current) return;
    setSelected(opt);
    if (opt === current.correctAnswer) {
      setCorrect((c) => c + 1);
      playCorrect();
    } else {
      setWrong((w) => w + 1);
      playWrong();
      setShowAnswer(true);
    }
    setTimeout(() => {
      setSelected(null);
      setShowAnswer(false);
      if (index + 1 >= questions.length) {
        finishGame();
      } else {
        setIndex((i) => i + 1);
      }
    }, 600);
  }

  if (phase === "ready") {
    return (
      <div className="bg-[var(--color-surface)] rounded-[24px] border-2 border-[var(--color-border-default)] p-10 text-center shadow-[0_4px_16px_rgba(0,0,0,0.08)] max-w-lg mx-auto">
        <Zap className="w-14 h-14 text-[var(--color-warning)] mx-auto mb-4" />
        <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">Sprint</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mt-2">Answer as many questions as you can in 60 seconds!</p>
        {bestScore > 0 && (
          <p className="mt-3 text-sm bg-amber-500 text-white font-extrabold shadow-sm rounded-[10px] px-4 py-2 inline-flex items-center gap-1.5">
            <Trophy className="w-4 h-4" /> Best: {bestScore} correct
          </p>
        )}
        <button onClick={startGame}
          className="mt-6 px-8 py-3 rounded-[14px] bg-[var(--color-primary)] text-white font-bold text-sm hover:bg-brand-600 transition-all inline-flex items-center gap-2 shadow-[0_4px_0_rgba(28,176,246,0.3)]"
        >
          <Zap className="w-4 h-4" /> Start Sprint
        </button>
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className="bg-[var(--color-surface)] rounded-[24px] border-2 border-[var(--color-border-default)] p-10 text-center shadow-[0_4px_16px_rgba(0,0,0,0.08)] max-w-lg mx-auto">
        <span className="text-5xl block mb-4">{accuracy >= 80 ? "🎉" : accuracy >= 50 ? "💪" : "📚"}</span>
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
            <p className="text-3xl font-display font-extrabold text-[var(--color-primary-dark)]">{accuracy}%</p>
            <p className="text-xs text-[var(--color-text-secondary)]">Accuracy</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 mt-4">
          <p className="text-sm font-bold bg-amber-500 text-white font-extrabold shadow-sm px-4 py-2 rounded-[10px] inline-flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> +{correct * 5 + (totalAnswered >= 20 ? 20 : totalAnswered >= 10 ? 10 : 0)} XP
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
          <RotateCcw className="w-4 h-4" /> Try Again
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
            timeLeft <= 10 ? "bg-[var(--color-error)] text-white " : "bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)]"
          }`}>
            <Clock className="w-3 h-3" /> {timeLeft}s
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--color-success)] text-white px-3 py-1 text-xs font-semibold">
            <Target className="w-3 h-3" /> {correct}/{totalAnswered}
          </span>
        </div>
        <span className="text-[10px] text-[var(--color-text-disabled)] bg-[var(--color-surface-alt)] px-2 py-1 rounded-[var(--radius-pill)]">
          Vocabulary
        </span>
      </div>

      <div className="w-full h-1.5 rounded-[var(--radius-pill)] bg-[var(--color-surface-alt)] overflow-hidden">
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: `${(timeLeft / DURATION) * 100}%` }}
          transition={{ duration: 0.3 }}
          className={`h-full rounded-[var(--radius-pill)] transition-colors ${timeLeft <= 10 ? "bg-red-500" : timeLeft <= 20 ? "bg-amber-500" : "bg-[var(--color-primary)]"}`}
        />
      </div>

      <div className="bg-[var(--color-surface)] rounded-[24px] border-2 border-[var(--color-border-default)] p-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)] text-center">
        <div className="mb-1">
          <span className="text-xs text-[var(--color-text-disabled)] font-medium uppercase tracking-wide">
            Fill in the blank
          </span>
        </div>

        <p className="text-lg font-display font-extrabold text-[var(--color-text-primary)] mb-6 leading-relaxed">
          {current.sentence.split("___").map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <span className="inline-block mx-1 px-3 py-0.5 rounded bg-[var(--color-warning)] text-white border-2 border-dashed border-[var(--color-warning)] font-bold">
                  ?
                </span>
              )}
            </span>
          ))}
        </p>

        <div className="space-y-2 mt-5">
          {current.options.map((opt) => {
            let cls = "bg-[var(--color-surface)] border-2 border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:ring-[var(--color-primary)] hover:bg-[var(--color-primary-subtle)]";
            if (selected === opt && opt === current.correctAnswer) cls = "bg-[var(--color-success)] text-white ring-2 ring-emerald-400";
            else if (selected === opt && opt !== current.correctAnswer) cls = "bg-[var(--color-error)] text-white ring-2 ring-red-300";
            else if (selected !== null && opt === current.correctAnswer) cls = "bg-emerald-50/50 ring-1 ring-[var(--color-success)] text-[var(--color-success)]";

            return (
              <motion.button key={opt} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                onClick={() => handleSelect(opt)} disabled={selected !== null}
                className={`flex items-center justify-center w-full px-4 py-3 rounded-[14px] text-sm font-medium transition-all ${cls}`}
              >
                <span>{opt}</span>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {showAnswer && selected !== null && selected !== current.correctAnswer && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mt-3 text-xs text-[var(--color-text-secondary)]"
            >
              Correct: <strong>{current.correctAnswer}</strong>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
