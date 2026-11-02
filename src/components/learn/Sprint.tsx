"use client";
import { learnerStorage } from "@/lib/learnerStorage";

import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeCard, PracticeButton } from "@/components/ui/PracticeSurface";
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
  const pool = shuffle(FLASHCARDS).flatMap(c => {
    if (!c.example) return [];
    const escaped = c.de.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`\\b${escaped}\\b`, "i");
    if (!pattern.test(c.example.de)) return [];
    const sentence = c.example.de.replace(pattern, "___");
    const wrong = shuffle(Array.from(new Set(FLASHCARDS.map(x => x.de))).filter(x => x.toLowerCase() !== c.de.toLowerCase())).slice(0, 3);
    return [{ id: c.id, sentence, correctAnswer: c.de, options: shuffle([c.de, ...wrong]) }];
  });
  return pool.slice(0, count);
}

const STORAGE_KEY = "englishcamp-sprint-best";
const DURATION = 60;

const MotionPracticeButton = motion.create(PracticeButton);

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
  const nextRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finishedRef = useRef(false);
  const scoreRef = useRef({ correct: 0, wrong: 0 });
  useEffect(() => () => { if (nextRef.current) clearTimeout(nextRef.current); }, []);

  useEffect(() => {
    try {
      const stored = learnerStorage.getItem(STORAGE_KEY);
      if (stored) setBestScore(Number(stored));
    } catch {}
  }, []);

  function startGame() {
    if (nextRef.current) clearTimeout(nextRef.current);
    finishedRef.current = false;
    scoreRef.current = { correct: 0, wrong: 0 };
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


  const totalAnswered = correct + wrong;
  const accuracy = totalAnswered > 0 ? Math.round((correct / totalAnswered) * 100) : 0;
  const current = questions[index];

  const finishGame = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    if (timerRef.current) clearInterval(timerRef.current);
    if (nextRef.current) clearTimeout(nextRef.current);
    setPhase("done");
    const points = scoreRef.current.correct;
    const answered = points + scoreRef.current.wrong;
    addXP(points * 5 + (answered >= 20 ? 20 : answered >= 10 ? 10 : 0));
    playXP();
    const newBest = Math.max(bestScore, points);
    setBestScore(newBest);
    try { learnerStorage.setItem(STORAGE_KEY, String(newBest)); } catch {}
  }, [addXP, bestScore]);

  useEffect(() => {
    if (timeLeft === 0 && phase === "playing") finishGame();
  }, [timeLeft, phase, finishGame]);

  function handleSelect(opt: string) {
    if (selected !== null || !current || finishedRef.current) return;
    setSelected(opt);
    if (opt === current.correctAnswer) {
      scoreRef.current.correct += 1;
      setCorrect((c) => c + 1);
      playCorrect();
    } else {
      scoreRef.current.wrong += 1;
      setWrong((w) => w + 1);
      playWrong();
      setShowAnswer(true);
    }
    nextRef.current = setTimeout(() => {
      if (finishedRef.current) return;
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
      <PracticeCard data-practice-surface="intro" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-5 sm:p-6 text-center shadow-[var(--shadow-1)] max-w-lg mx-auto">
        <LearningArt name="Zap" className="w-14 h-14 text-[var(--color-text-warning)] mx-auto mb-4" />
        <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">Sprint</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mt-2">Answer as many questions as you can in 60 seconds!</p>
        {bestScore > 0 && (
          <p className="mt-3 text-sm bg-amber-500 text-[var(--color-on-brand)] font-extrabold shadow-sm rounded-[10px] px-4 py-2 inline-flex items-center gap-1.5">
            <LearningArt name="Trophy" size={16} className="w-4 h-4" /> Best: {bestScore} correct
          </p>
        )}
        <PracticeButton onClick={startGame}
          className="mt-6 px-8 py-3 rounded-[14px] bg-[var(--color-primary)] text-[var(--color-on-brand)] font-bold text-sm hover:bg-[var(--color-primary-hover)] transition-all inline-flex items-center gap-2 shadow-[var(--shadow-1)]"
        >
          <LearningArt name="Zap" size={16} className="w-4 h-4" /> Start Sprint
        </PracticeButton>
      </PracticeCard>
    );
  }

  if (phase === "done") {
    return (
      <PracticeCard data-practice-surface="result" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-5 sm:p-6 text-center shadow-[var(--shadow-1)] max-w-lg mx-auto">
        <span className="text-5xl block mb-4"><LearningArt name={accuracy >= 80 ? "🎉" : accuracy >= 50 ? "💪" : "📚"} size={28} /></span>
        <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">Time&rsquo;s Up!</h2>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div>
            <p className="text-3xl font-display font-extrabold text-[var(--color-text-success)]">{correct}</p>
            <p className="text-xs text-[var(--color-text-secondary)]">Correct</p>
          </div>
          <div className="w-px h-10 bg-[var(--color-border-default)]" />
          <div>
            <p className="text-3xl font-display font-extrabold text-[var(--color-text-error)]">{wrong}</p>
            <p className="text-xs text-[var(--color-text-secondary)]">Wrong</p>
          </div>
          <div className="w-px h-10 bg-[var(--color-border-default)]" />
          <div>
            <p className="text-3xl font-display font-extrabold text-[var(--color-text-link)]">{accuracy}%</p>
            <p className="text-xs text-[var(--color-text-secondary)]">Accuracy</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 mt-4">
          <p className="text-sm font-bold bg-amber-500 text-[var(--color-on-brand)] font-extrabold shadow-sm px-4 py-2 rounded-[10px] inline-flex items-center gap-1.5">
            <LearningArt name="Sparkles" size={16} className="w-4 h-4" /> +{correct * 5 + (totalAnswered >= 20 ? 20 : totalAnswered >= 10 ? 10 : 0)} XP
          </p>
          {correct >= bestScore && correct > 0 && (
            <p className="text-xs font-bold bg-emerald-500 text-[var(--color-on-brand)] font-bold px-3 py-2 rounded-[10px] inline-flex items-center gap-1">
              <LearningArt name="Trophy" size={14} className="w-3.5 h-3.5" /> New Best!
            </p>
          )}
        </div>
        <PracticeButton onClick={startGame}
          className="mt-6 px-8 py-3 rounded-[14px] bg-[var(--color-primary)] text-[var(--color-on-brand)] font-bold text-sm hover:bg-[var(--color-primary-hover)] transition-all inline-flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> Try Again
        </PracticeButton>
      </PracticeCard>
    );
  }

  if (!current) return null;

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="camp-quiz-status flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 rounded-[10px] px-3 py-1 text-xs font-bold ${
            timeLeft <= 10 ? "bg-[var(--color-error-bg)] text-[var(--color-text-error)] " : "bg-[var(--color-primary-subtle)] text-[var(--color-text-link)]"
          }`}>
            <LearningArt name="Clock" size={12} className="w-3 h-3" /> {timeLeft}s
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--color-success-bg)] text-[var(--color-text-success)] px-3 py-1 text-xs font-semibold">
            <LearningArt name="Target" size={12} className="w-3 h-3" /> {correct}/{totalAnswered}
          </span>
        </div>
        <span className="text-[10px] text-[var(--color-text-secondary)] bg-[var(--color-surface-alt)] px-2 py-1 rounded-[var(--radius-pill)]">
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

      <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-5 sm:p-6 shadow-[var(--shadow-1)] text-center">
        <div className="mb-1">
          <span className="text-xs text-[var(--color-text-secondary)] font-medium uppercase tracking-wide">
            Fill in the blank
          </span>
        </div>

        <p className="text-lg font-display font-extrabold text-[var(--color-text-primary)] mb-6 leading-relaxed">
          {current.sentence.split("___").map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <span className="inline-block mx-1 px-3 py-0.5 rounded bg-[var(--color-warning-bg)] text-[var(--color-text-warning)] border border-dashed border-[var(--color-warning)] font-bold">
                  ?
                </span>
              )}
            </span>
          ))}
        </p>

        <div className="space-y-2 mt-5">
          {current.options.map((opt) => {
            let cls = "bg-[var(--color-surface)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:ring-[var(--color-primary)] hover:bg-[var(--color-primary-subtle)]";
            if (selected === opt && opt === current.correctAnswer) cls = "bg-[var(--color-success-bg)] text-[var(--color-text-success)] ring-2 ring-emerald-400";
            else if (selected === opt && opt !== current.correctAnswer) cls = "bg-[var(--color-error-bg)] text-[var(--color-text-error)] ring-2 ring-red-300";
            else if (selected !== null && opt === current.correctAnswer) cls = "bg-[var(--color-success-bg)] ring-1 ring-[var(--color-success)] text-[var(--color-text-success)]";

            return (
              <MotionPracticeButton key={opt} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                onClick={() => handleSelect(opt)} disabled={selected !== null}
                className={`flex items-center justify-center w-full px-4 py-3 rounded-[14px] text-sm font-medium transition-all ${cls}`}
              >
                <span>{opt}</span>
              </MotionPracticeButton>
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
      </PracticeCard>
    </div>
  );
}
