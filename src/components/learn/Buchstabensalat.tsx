"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeCard, PracticeButton } from "@/components/ui/PracticeSurface";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playCorrect, playWrong, playXP, speak } from "@/lib/audio";
import { useProgress } from "@/store/useProgress";
import { FLASHCARDS } from "@/data/flashcards";
import { HelpCircle, RefreshCw, Sparkles, Volume2, CheckCircle2, XCircle, Lightbulb, ArrowRight } from "lucide-react";

type ScrambleItem = {
  id: string;
  original: string;
  scrambled: string;
  meaning: string;
  cat: string;
};

function scrambleWord(word: string): string {
  const letters = word.replace(/[^a-zA-Z']/g, "").split("");
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  return letters.join("");
}

function buildItems(count: number): ScrambleItem[] {
  const pool = FLASHCARDS.filter((c) => {
    const clean = c.de.replace(/[^a-zA-Z']/g, "");
    return clean.length >= 4 && clean.length <= 10;
  });
  const picked = [...pool].sort(() => Math.random() - 0.5).slice(0, count);
  return picked.map((c) => {
    const clean = c.de.replace(/[^a-zA-Z']/g, "");
    let scrambled = scrambleWord(clean);
    let attempts = 0;
    while (scrambled === clean && attempts < 50) {
      scrambled = scrambleWord(clean);
      attempts++;
    }
    return { id: c.id, original: clean, scrambled, meaning: c.en, cat: c.cat };
  });
}

export function WordScramble() {
  const { addXP } = useProgress();
  const [items, setItems] = useState<ScrambleItem[]>([]);
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [score, setScore] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [phase, setPhase] = useState<"ready" | "playing" | "done">("ready");
  const [round, setRound] = useState(10);
  const inputRef = useRef<HTMLInputElement>(null);
  const totalRounds = round;

  function initGame() {
    setItems(buildItems(round));
    setIndex(0);
    setInput("");
    setStatus("idle");
    setScore(0);
    setHintUsed(false);
    setShowHint(false);
    setPhase("playing");
  }

  const current = items[index];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status !== "idle" || !current) return;
    const match = input.trim().toLowerCase() === current.original.toLowerCase();
    if (match) {
      setStatus("correct");
      const points = hintUsed ? 5 : 10;
      setScore((s) => s + points);
      playCorrect();
    } else {
      setStatus("wrong");
      playWrong();
    }
  }

  function handleNext() {
    if (index + 1 >= items.length) {
      setPhase("done");
      const bonus = score >= totalRounds * 8 ? 15 : score >= totalRounds * 5 ? 10 : 0;
      addXP(score + bonus);
      playXP();
      return;
    }
    setIndex((i) => i + 1);
    setInput("");
    setStatus("idle");
    setHintUsed(false);
    setShowHint(false);
    inputRef.current?.focus();
  }

  function handleHint() {
    setHintUsed(true);
    setShowHint(true);
  }

  function speakWord() {
    if (!current) return;
    speak(current.original);
  }

  if (phase === "ready") {
    return (
      <PracticeCard data-practice-surface="intro" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-5 sm:p-6 text-center shadow-[var(--shadow-1)] max-w-lg mx-auto">
        <LearningArt name="🔀" size={36} className=" block mb-4" />
        <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">Word Scramble</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mt-2">Unscramble the English word as fast as you can!</p>

        <div className="flex items-center justify-center gap-2 mt-5">
          {[5, 10, 15].map((n) => (
            <PracticeButton key={n} onClick={() => setRound(n)}
              className={`rounded-[10px] px-4 py-2 text-xs font-bold transition-all ${
                round === n ? "bg-[var(--color-primary)] text-[var(--color-on-brand)]" : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-default)]"
              }`}
            >{n} rounds</PracticeButton>
          ))}
        </div>

        <PracticeButton onClick={initGame}
          className="mt-6 px-8 py-3 rounded-[14px] bg-[var(--color-primary)] text-[var(--color-on-brand)] font-bold text-sm hover:bg-[var(--color-primary-hover)] transition-all inline-flex items-center gap-2 shadow-[var(--shadow-1)]"
        >
          <LearningArt name="🔀" size={24} className="" /> Start Game
        </PracticeButton>
      </PracticeCard>
    );
  }

  if (phase === "done") {
    const maxScore = totalRounds * 10;
    const pct = Math.round((score / maxScore) * 100);
    return (
      <PracticeCard data-practice-surface="result" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-5 sm:p-6 text-center shadow-[var(--shadow-1)] max-w-lg mx-auto">
        <span className="text-5xl block mb-4"><LearningArt name={pct >= 80 ? "🎉" : pct >= 50 ? "💪" : "📚"} size={28} /></span>
        <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">Game Over!</h2>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div>
            <p className="text-3xl font-display font-extrabold text-[var(--color-text-success)]">{score}<span className="text-lg text-[var(--color-text-secondary)]">/{maxScore}</span></p>
            <p className="text-xs text-[var(--color-text-secondary)]">Points</p>
          </div>
          <div className="w-px h-10 bg-[var(--color-border-default)]" />
          <div>
            <p className="text-3xl font-display font-extrabold text-[var(--color-text-link)]">{pct}%</p>
            <p className="text-xs text-[var(--color-text-secondary)]">Accuracy</p>
          </div>
        </div>
        <p className="mt-4 text-sm font-bold bg-[var(--color-warning-bg)] text-[var(--color-text-warning)] font-extrabold shadow-sm px-4 py-2 rounded-[10px] inline-flex items-center gap-1.5">
          <LearningArt name="Sparkles" size={16} className="w-4 h-4" /> +{score + (pct >= 80 ? 15 : pct >= 50 ? 10 : 0)} XP
        </p>
        <PracticeButton onClick={() => setPhase("ready")}
          className="mt-6 px-8 py-3 rounded-[14px] bg-[var(--color-primary)] text-[var(--color-on-brand)] font-bold text-sm hover:bg-[var(--color-primary-hover)] transition-all inline-flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Play Again
        </PracticeButton>
      </PracticeCard>
    );
  }

  if (!current) return null;

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="camp-quiz-status flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--color-primary-subtle)] px-3 py-1 text-xs font-semibold text-[var(--color-text-link)]">
          <LearningArt name="🔀" size={16} /> {index + 1}/{items.length}
        </span>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--color-success-bg)] text-[var(--color-text-success)] px-3 py-1 text-xs font-semibold">
            <LearningArt name="Sparkles" size={12} className="w-3 h-3" /> {score} pts
          </span>
          <span className="text-[10px] text-[var(--color-text-secondary)] bg-[var(--color-surface-alt)] px-2 py-1 rounded-[var(--radius-pill)]">{current.cat}</span>
        </div>
      </div>

      <div className="w-full h-1.5 rounded-[var(--radius-pill)] bg-[var(--color-surface-alt)] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${((index + (status !== "idle" ? 1 : 0)) / items.length) * 100}%` }}
          transition={{ duration: 0.3 }}
          className="h-full rounded-[var(--radius-pill)] bg-[var(--color-primary)]"
        />
      </div>

      <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-5 sm:p-6 shadow-[var(--shadow-1)] text-center">
        <div className="mb-2">
          <span className="text-xs text-[var(--color-text-secondary)] font-medium uppercase tracking-wide">Unscramble this word</span>
        </div>

        <div className="flex items-center justify-center gap-2 mb-6">
          <p className="text-3xl font-display font-extrabold tracking-[0.2em] text-[var(--color-text-primary)] font-mono select-all">
            {current.scrambled}
          </p>
          <PracticeButton onClick={speakWord}
            className="w-8 h-8 rounded-[var(--radius-pill)] bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] flex items-center justify-center hover:bg-[var(--color-border-default)] transition-all shrink-0"
            title="Hear the word"
          >
            <Volume2 className="w-4 h-4" />
          </PracticeButton>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type the unscrambled word..."
            disabled={status !== "idle"}
            autoFocus
            className="w-full px-4 py-3 rounded-[14px] border border-[var(--color-border-default)] text-center text-lg font-medium text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-brand-400 transition-all disabled:opacity-50"
          />
          <div className="flex items-center justify-center gap-2">
            <PracticeButton type="submit" disabled={status !== "idle" || !input.trim()}
              className="px-6 py-2.5 rounded-[12px] bg-[var(--color-primary)] text-[var(--color-on-brand)] font-bold text-sm hover:bg-[var(--color-primary-hover)] transition-all disabled:opacity-40 shadow-[0_3px_0_rgba(126,34,206,0.3)] inline-flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" /> Check
            </PracticeButton>
            {!hintUsed && status === "idle" && (
              <PracticeButton type="button" onClick={handleHint}
                className="px-4 py-2.5 rounded-[12px] bg-[var(--color-warning-bg)] text-[var(--color-text-warning)]  font-semibold text-xs hover:bg-amber-100 transition-all inline-flex items-center gap-1.5"
              >
                <LearningArt name="Lightbulb" size={14} className="w-3.5 h-3.5" /> Hint
              </PracticeButton>
            )}
          </div>
        </form>

        <AnimatePresence>
          {showHint && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              className="mt-4 p-3 rounded-[10px] bg-[var(--color-warning-bg)] text-[var(--color-text-warning)] text-xs"
            >
              <strong>Hint:</strong> starts with &ldquo;{current.original[0]}&rdquo;
              <span> &middot; {current.meaning}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {status === "wrong" && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mt-4 p-3 rounded-[10px] bg-[var(--color-error-bg)] text-[var(--color-text-error)] text-xs"
            >
              <XCircle className="w-3.5 h-3.5 inline mr-1" />
              Correct answer: <strong>{current.original}</strong>
              <span> &mdash; {current.meaning}</span>
            </motion.div>
          )}
          {status === "correct" && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mt-4 p-3 rounded-[10px] bg-[var(--color-success-bg)] text-[var(--color-text-success)] text-xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5 inline mr-1" />
              Correct! +{hintUsed ? 5 : 10} pts
            </motion.div>
          )}
        </AnimatePresence>
      </PracticeCard>

      {status !== "idle" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="camp-quiz-actions flex justify-center">
          <PracticeButton onClick={handleNext}
            className="px-8 py-3 rounded-[14px] bg-[var(--color-primary)] text-[var(--color-on-brand)] font-bold text-sm hover:bg-[var(--color-primary-hover)] transition-all shadow-[var(--shadow-1)] inline-flex items-center gap-1.5"
          >
            {index + 1 >= items.length ? "See results" : "Next"} <ArrowRight className="w-4 h-4" />
          </PracticeButton>
        </motion.div>
      )}
    </div>
  );
}
