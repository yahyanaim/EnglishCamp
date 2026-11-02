"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeCard, PracticeButton } from "@/components/ui/PracticeSurface";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playCorrect, playWrong, playXP } from "@/lib/audio";
import { useProgress } from "@/store/useProgress";
import { IDIOMS } from "@/data/redewendungen";
import { RefreshCw, Sparkles, Quote, CheckCircle2, XCircle, ArrowRight } from "lucide-react";

type IdiomItem = {
  idiom: string;
  literal: string;
  meaning: string;
  meaningAr?: string;
  example: string;
  exampleEn: string;
  exampleAr?: string;
};

function shuffle<T>(a: T[]): T[] {
  const arr = [...a];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildItems(count: number): IdiomItem[] {
  return shuffle(IDIOMS).slice(0, count).map((i) => ({
    idiom: i.idiom, literal: "", meaning: i.meaning, meaningAr: i.arabic, example: i.example, exampleEn: i.example, exampleAr: "",
  }));
}

const MotionPracticeButton = motion.create(PracticeButton);

export function RedewendungenUebersetzer() {
  const { addXP } = useProgress();
  const [items, setItems] = useState<IdiomItem[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<"ready" | "playing" | "done">("ready");
  const [mode, setMode] = useState<"idiom-to-meaning" | "meaning-to-idiom" | "ar">("idiom-to-meaning");

  function initGame() {
    setItems(buildItems(10));
    setIndex(0);
    setSelected(null);
    setScore(0);
    setPhase("playing");
  }

  const current = items[index];
  const options = useMemo(() => {
    if (!current) return [];
    const key = mode === "idiom-to-meaning" ? "meaning" : "idiom"; // AR→DE: same as meaning-to-idiom
    const wrong = shuffle(items.filter((x) => x[key] !== current[key])).slice(0, 3).map((x) => x[key]);
    return shuffle([current[key], ...wrong]);
  }, [current, mode, index]);

  function handleSelect(opt: string) {
    if (selected !== null || !current) return;
    setSelected(opt);
    const correctAnswer = mode === "idiom-to-meaning" ? current.meaning : current.idiom; // AR→DE: same as meaning-to-idiom
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
      <PracticeCard data-practice-surface="intro" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-5 sm:p-6 text-center shadow-[var(--shadow-1)] max-w-lg mx-auto">
        <LearningArt name="Quote" className="w-14 h-14 text-[var(--color-primary)] mx-auto mb-4" />
      <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">Idiom Translator</h2>
      <p className="text-sm text-[var(--color-text-secondary)] mt-2">Match idioms/expressions to their Arabic/English meanings</p>
        <div className="flex items-center justify-center gap-2 mt-5">
          <PracticeButton onClick={() => setMode("idiom-to-meaning")}
            className={`rounded-[10px] px-4 py-2 text-xs font-bold transition-all ${mode === "idiom-to-meaning" ? "bg-[var(--color-primary)] text-[var(--color-on-brand)]" : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-default)]"}`}
          >Idiom → Meaning</PracticeButton>
          <PracticeButton onClick={() => setMode("meaning-to-idiom")}
            className={`rounded-[10px] px-4 py-2 text-xs font-bold transition-all ${mode === "meaning-to-idiom" ? "bg-[var(--color-primary)] text-[var(--color-on-brand)]" : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-default)]"}`}
          >Meaning → Idiom</PracticeButton>
          <PracticeButton onClick={() => setMode("ar")}
            className={`rounded-[10px] px-4 py-2 text-xs font-bold transition-all ${mode === "ar" ? "bg-[var(--color-primary)] text-[var(--color-on-brand)]" : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-default)]"}`}
          >MeaningAr → Idiom</PracticeButton>
        </div>
        <PracticeButton onClick={initGame}
          className="mt-6 px-8 py-3 rounded-[14px] bg-[var(--color-primary)] text-[var(--color-on-brand)] font-bold text-sm hover:bg-[var(--color-primary-hover)] transition-all inline-flex items-center gap-2 shadow-[var(--shadow-1)]"
        >
          <Quote className="w-4 h-4" /> Start Game
        </PracticeButton>
      </PracticeCard>
    );
  }

  if (phase === "done") {
    const maxScore = items.length * 10;
    const pct = Math.round((score / maxScore) * 100);
    return (
      <PracticeCard data-practice-surface="result" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-5 sm:p-6 text-center shadow-[var(--shadow-1)] max-w-lg mx-auto">
        <span className="text-5xl block mb-4"><LearningArt name={pct >= 80 ? "🎉" : pct >= 50 ? "💪" : "📚"} size={28} /></span>
        <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">Game Complete!</h2>
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
          <LearningArt name="Sparkles" size={16} className="w-4 h-4" /> +{score + (pct >= 80 ? 20 : 0)} XP
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

  const sourceText = mode === "idiom-to-meaning" ? current.idiom : mode === "ar" ? (current.meaningAr || current.meaning) : current.meaning;
  const correctAnswer = mode === "idiom-to-meaning" ? current.meaning : current.idiom;
  const promptLabel = mode === "idiom-to-meaning" ? "What does this idiom mean?" : mode === "ar" ? "Which idiom matches this Arabic text?" : "Which idiom matches this meaning?";
  const pct = ((index + (selected ? 1 : 0)) / items.length) * 100;

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="camp-quiz-status flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--color-primary-subtle)] px-3 py-1 text-xs font-semibold text-[var(--color-text-link)]">
          <Quote className="w-3 h-3" /> {index + 1}/{items.length}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--color-success-bg)] text-[var(--color-text-success)] px-3 py-1 text-xs font-semibold">
          <LearningArt name="Sparkles" size={12} className="w-3 h-3" /> {score}
        </span>
      </div>

      <div className="w-full h-1.5 rounded-[var(--radius-pill)] bg-[var(--color-surface-alt)] overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.3 }} className="h-full rounded-[var(--radius-pill)] bg-[var(--color-primary)]" />
      </div>

      <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-5 sm:p-6 shadow-[var(--shadow-1)]">
        <div className="mb-1">
          <span className="text-xs text-[var(--color-text-secondary)] font-medium uppercase tracking-wide">{promptLabel}</span>
        </div>

        <p className="text-xl font-display font-extrabold text-[var(--color-text-primary)] text-center mb-3 italic">&ldquo;{sourceText}&rdquo;</p>

        {mode === "idiom-to-meaning" && (
          <p className="text-xs text-[var(--color-text-secondary)] text-center mb-4">
            Literal: <em>{current.literal}</em>
          </p>
        )}

        <div className="space-y-2">
          {options.map((opt) => {
            let cls = "bg-[var(--color-surface)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:ring-[var(--color-primary)] hover:bg-[var(--color-primary-subtle)]";
            if (selected === opt && opt === correctAnswer) cls = "bg-[var(--color-success-bg)] text-[var(--color-text-success)] ring-2 ring-emerald-400 text-[var(--color-text-success)]";
            else if (selected === opt && opt !== correctAnswer) cls = "bg-[var(--color-error-bg)] text-[var(--color-text-error)] ring-2 ring-red-300 text-[var(--color-text-error)]";
            else if (selected !== null && opt === correctAnswer) cls = "bg-[var(--color-success-bg)] ring-1 ring-[var(--color-success)] text-[var(--color-text-success)]";

            return (
              <MotionPracticeButton key={opt} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                onClick={() => handleSelect(opt)} disabled={selected !== null}
                className={`flex items-center gap-2 w-full px-4 py-3 rounded-[14px] text-sm font-medium transition-all text-left ${cls}`}
              >
                {selected !== null && opt === correctAnswer && <CheckCircle2 className="w-4 h-4 text-[var(--color-text-success)] shrink-0" />}
                {selected === opt && opt !== correctAnswer && <XCircle className="w-4 h-4 text-[var(--color-text-error)] shrink-0" />}
                <span>{opt}</span>
              </MotionPracticeButton>
            );
          })}
        </div>

        <AnimatePresence>
          {selected !== null && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              className="camp-quiz-feedback mt-4 p-3 rounded-[10px] bg-[var(--color-surface-alt)] text-xs space-y-1"
            >
              <p><strong className="text-[var(--color-text-secondary)]">Idiom:</strong> {current.idiom}</p>
              <p><strong className="text-[var(--color-text-secondary)]">Literal:</strong> {current.literal}</p>
              <p><strong className="text-[var(--color-text-secondary)]">Meaning:</strong> {current.meaning}</p>
              <p className="pt-1 text-[var(--color-text-secondary)] italic">{current.example}</p>
              <p className="text-[var(--color-text-secondary)] italic">{current.exampleEn}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </PracticeCard>

      {selected !== null && (
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
