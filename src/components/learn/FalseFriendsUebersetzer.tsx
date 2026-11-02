"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeCard, PracticeButton } from "@/components/ui/PracticeSurface";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playCorrect, playWrong, playXP } from "@/lib/audio";
import { useProgress } from "@/store/useProgress";
import { FALSE_FRIENDS } from "@/data/false-friends";
import { RefreshCw, Sparkles, AlertTriangle, CheckCircle2, XCircle, ArrowRight } from "lucide-react";

type Item = { word1: string; meaning1: string; word2: string; meaning2: string; example1: string; example2: string; tip: string };

function shuffle<T>(a: T[]): T[] {
  const arr = [...a];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const MotionPracticeButton = motion.create(PracticeButton);

export function FalseFriendsUebersetzer() {
  const { addXP } = useProgress();
  const [items, setItems] = useState<Item[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<"ready" | "playing" | "done">("ready");
  const [direction, setDirection] = useState<"a" | "b">("a");

  function initGame() {
    const pool: Item[] = [];
    for (const ff of FALSE_FRIENDS) {
      pool.push({ word1: ff.word1, meaning1: ff.meaning1, word2: ff.word2, meaning2: ff.meaning2, example1: ff.example1, example2: ff.example2, tip: ff.tip });
    }
    setItems(shuffle(pool).slice(0, 10));
    setIndex(0);
    setSelected(null);
    setScore(0);
    setPhase("playing");
  }

  const current = items[index];
  const options = useMemo(() => {
    if (!current) return [];
    const key = direction === "a" ? "meaning1" : "word1";
    const wrong = shuffle(items.filter((x) => x[key] !== current[key])).slice(0, 3).map((x) => x[key]);
    return shuffle([current[key], ...wrong]);
  }, [current, direction, index]);

  function handleSelect(opt: string) {
    if (selected !== null || !current) return;
    setSelected(opt);
    const correct = direction === "a" ? current.meaning1 : current.word1;
    if (opt === correct) { setScore((s) => s + 10); playCorrect(); }
    else { playWrong(); }
  }

  function handleNext() {
    if (index + 1 >= items.length) { setPhase("done"); addXP(score + (score >= 80 ? 20 : 0)); playXP(); return; }
    setIndex((i) => i + 1); setSelected(null);
  }

  if (phase === "ready") return (
    <PracticeCard data-practice-surface="intro" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-5 sm:p-6 text-center shadow-[var(--shadow-1)] max-w-lg mx-auto">
      <LearningArt name="AlertTriangle" className="w-14 h-14 text-[var(--color-primary)] mx-auto mb-4" />
      <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">Confusing Word Pairs</h2>
      <p className="text-sm text-[var(--color-text-secondary)] mt-2">Learn English words that Arabic speakers often confuse</p>
      <div className="flex items-center justify-center gap-2 mt-5">
        <PracticeButton onClick={() => setDirection("a")} className={`rounded-[10px] px-4 py-2 text-xs font-bold transition-all ${direction === "a" ? "bg-[var(--color-primary)] text-[var(--color-on-brand)]" : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-default)]"}`}>Word → Meaning</PracticeButton>
        <PracticeButton onClick={() => setDirection("b")} className={`rounded-[10px] px-4 py-2 text-xs font-bold transition-all ${direction === "b" ? "bg-[var(--color-primary)] text-[var(--color-on-brand)]" : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-default)]"}`}>Meaning → Word</PracticeButton>
      </div>
      <PracticeButton onClick={initGame} className="mt-6 px-8 py-3 rounded-[14px] bg-[var(--color-primary)] text-[var(--color-on-brand)] font-bold text-sm hover:bg-[var(--color-primary-hover)] transition-all inline-flex items-center gap-2 shadow-[var(--shadow-1)]"><AlertTriangle className="w-4 h-4" /> Start Practice</PracticeButton>
    </PracticeCard>
  );

  if (phase === "done") {
    const pct = Math.round((score / (items.length * 10)) * 100);
    return (
      <PracticeCard data-practice-surface="result" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-5 sm:p-6 text-center shadow-[var(--shadow-1)] max-w-lg mx-auto">
        <span className="text-5xl block mb-4"><LearningArt name={pct >= 80 ? "🎉" : pct >= 50 ? "💪" : "📚"} size={28} /></span>
        <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">Session Complete!</h2>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div><p className="text-3xl font-display font-extrabold text-[var(--color-text-success)]">{score}<span className="text-lg text-[var(--color-text-secondary)]">/{items.length * 10}</span></p><p className="text-xs text-[var(--color-text-secondary)]">Points</p></div>
          <div className="w-px h-10 bg-[var(--color-border-default)]" />
          <div><p className="text-3xl font-display font-extrabold text-[var(--color-text-link)]">{pct}%</p><p className="text-xs text-[var(--color-text-secondary)]">Accuracy</p></div>
        </div>
        <p className="mt-4 text-sm font-bold bg-[var(--color-warning-bg)] text-[var(--color-text-warning)] font-extrabold shadow-sm px-4 py-2 rounded-[10px] inline-flex items-center gap-1.5"><LearningArt name="Sparkles" size={16} className="w-4 h-4" /> +{score + (pct >= 80 ? 20 : 0)} XP</p>
        <PracticeButton onClick={() => setPhase("ready")} className="mt-6 px-8 py-3 rounded-[14px] bg-[var(--color-primary)] text-[var(--color-on-brand)] font-bold text-sm hover:bg-[var(--color-primary-hover)] transition-all inline-flex items-center gap-2"><RefreshCw className="w-4 h-4" /> New Session</PracticeButton>
      </PracticeCard>
    );
  }

  if (!current) return null;
  const pct = ((index + (selected ? 1 : 0)) / items.length) * 100;
  const source = direction === "a" ? current.word1 : current.meaning1;
  const correctAns = direction === "a" ? current.meaning1 : current.word1;

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="camp-quiz-status flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--color-primary-subtle)] px-3 py-1 text-xs font-semibold text-[var(--color-text-link)]"><AlertTriangle className="w-3 h-3" /> {index + 1}/{items.length}</span>
        <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--color-success-bg)] text-[var(--color-text-success)] px-3 py-1 text-xs font-semibold"><LearningArt name="Sparkles" size={12} className="w-3 h-3" /> {score}</span>
      </div>
      <div className="w-full h-1.5 rounded-[var(--radius-pill)] bg-[var(--color-surface-alt)] overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.3 }} className="h-full rounded-[var(--radius-pill)] bg-[var(--color-primary)]" /></div>
      <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-5 sm:p-6 shadow-[var(--shadow-1)]">
        <div className="mb-2"><span className="text-xs text-[var(--color-text-secondary)] font-medium uppercase tracking-wide">{direction === "a" ? "What does this word mean?" : "Which word matches this meaning?"}</span></div>
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-lg font-display font-extrabold text-[var(--color-text-primary)]">{source}</span>
        </div>
        <div className="space-y-2">
          {options.map((opt) => {
            let cls = "bg-[var(--color-surface)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:ring-[var(--color-primary)] hover:bg-[var(--color-primary-subtle)]";
            if (selected === opt && opt === correctAns) cls = "bg-[var(--color-success-bg)] text-[var(--color-text-success)] ring-2 ring-emerald-400 text-[var(--color-text-success)]";
            else if (selected === opt && opt !== correctAns) cls = "bg-[var(--color-error-bg)] text-[var(--color-text-error)] ring-2 ring-red-300 text-[var(--color-text-error)]";
            else if (selected !== null && opt === correctAns) cls = "bg-[var(--color-success-bg)] ring-1 ring-[var(--color-success)] text-[var(--color-text-success)]";
            return (
              <MotionPracticeButton key={opt} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                onClick={() => handleSelect(opt)} disabled={selected !== null}
                className={`flex items-center gap-2 w-full px-4 py-3 rounded-[14px] text-sm font-medium transition-all text-left ${cls}`}
              >
                {selected !== null && opt === correctAns && <CheckCircle2 className="w-4 h-4 text-[var(--color-text-success)] shrink-0" />}
                {selected === opt && opt !== correctAns && <XCircle className="w-4 h-4 text-[var(--color-text-error)] shrink-0" />}
                <span>{opt}</span>
              </MotionPracticeButton>
            );
          })}
        </div>
        <AnimatePresence>{selected !== null && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="camp-quiz-feedback mt-4 p-3 rounded-[10px] bg-[var(--color-surface-alt)] text-xs text-[var(--color-text-secondary)]">
            <p className="italic mb-1">&ldquo;{current.word1}&rdquo; = {current.meaning1}</p>
            <p className="italic mb-1">&ldquo;{current.word2}&rdquo; = {current.meaning2}</p>
            <p className="mt-1 font-medium text-[var(--color-text-warning)]">{current.tip}</p>
          </motion.div>
        )}</AnimatePresence>
      </PracticeCard>
      {selected !== null && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="camp-quiz-actions flex justify-center">
          <PracticeButton onClick={handleNext} className="px-8 py-3 rounded-[14px] bg-[var(--color-primary)] text-[var(--color-on-brand)] font-bold text-sm hover:bg-[var(--color-primary-hover)] transition-all shadow-[var(--shadow-1)] inline-flex items-center gap-1.5">
            {index + 1 >= items.length ? "See results" : "Next"} <ArrowRight className="w-4 h-4" />
          </PracticeButton>
        </motion.div>
      )}
    </div>
  );
}
