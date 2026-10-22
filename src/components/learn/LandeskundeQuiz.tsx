"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playCorrect, playWrong, playXP } from "@/lib/audio";
import { useProgress } from "@/store/useProgress";
import { CULTURE_QUESTIONS, CULTURE_TIPS } from "@/data/landeskunde";
import type { CultureQuestion } from "@/data/landeskunde";
import { RefreshCw, Sparkles, Globe, CheckCircle2, XCircle, ArrowRight, Info, Lightbulb, BookOpen } from "lucide-react";

type LKCategory = CultureQuestion["category"];

const CATEGORY_META: Record<LKCategory, { label: string; icon: string }> = {
  uk: { label: "United Kingdom", icon: "🇬🇧" },
  usa: { label: "USA", icon: "🇺🇸" },
  canada: { label: "Canada", icon: "🇨🇦" },
  australia: { label: "Australia", icon: "🇦🇺" },
  newzealand: { label: "New Zealand", icon: "🇳🇿" },
  ireland: { label: "Ireland", icon: "🇮🇪" },
  mixed: { label: "Mixed", icon: "🌍" },
};

function shuffle<T>(a: T[]): T[] {
  const arr = [...a];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function LandeskundeQuiz() {
  const { addXP } = useProgress();
  const [items, setItems] = useState<CultureQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<"ready" | "playing" | "done">("ready");
  const [catFilter, setCatFilter] = useState<LKCategory | "all">("all");
  const [expandedAstuce, setExpandedAstuce] = useState<string | null>(null);

  function initGame() {
    const pool = catFilter === "all"
      ? shuffle(CULTURE_QUESTIONS)
      : shuffle(CULTURE_QUESTIONS.filter((q) => q.category === catFilter));
    setItems(pool.slice(0, 10));
    setIndex(0);
    setSelected(null);
    setScore(0);
    setPhase("playing");
  }

  const current = items[index];

  function handleSelect(i: number) {
    if (selected !== null) return;
    setSelected(i);
    if (i === current.correctIndex) {
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
        <Globe className="w-14 h-14 text-[var(--color-primary)] mx-auto mb-4" />
        <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">Culture Quiz</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mt-2">Test your knowledge about English-speaking countries, their culture, history, and more</p>
        <div className="flex flex-wrap gap-1.5 justify-center mt-5">
          <button onClick={() => setCatFilter("all")}
            className={`rounded-[8px] px-3 py-1.5 text-xs font-bold transition-all ${catFilter === "all" ? "bg-slate-800 text-white" : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-default)]"}`}
          >All</button>
          {(Object.entries(CATEGORY_META) as [LKCategory, { label: string; icon: string }][]).map(([id, meta]) => (
            <button key={id} onClick={() => setCatFilter(id)}
              className={`rounded-[8px] px-3 py-1.5 text-xs font-bold transition-all ${catFilter === id ? "bg-slate-800 text-white" : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-default)]"}`}
            >{meta.icon} {meta.label}</button>
          ))}
        </div>
        <button onClick={initGame}
          className="mt-6 px-8 py-3 rounded-[14px] bg-[var(--color-primary)] text-white font-bold text-sm hover:bg-brand-600 transition-all inline-flex items-center gap-2 shadow-[0_4px_0_rgba(28,176,246,0.3)]"
        >
          <Globe className="w-4 h-4" /> Start Quiz
        </button>

          <div className="mt-8 space-y-6 text-left">
            <div>
              <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-[var(--color-primary)]" />
                Tips &amp; Topic Suggestions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {CULTURE_TIPS.map((ast) => (
                <motion.div key={ast.id} layout className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] shadow-sm overflow-hidden" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
                  <button
                    onClick={() => setExpandedAstuce(expandedAstuce === ast.id ? null : ast.id)}
                    className="w-full text-left p-3 hover:bg-[var(--color-surface-alt)] transition-colors flex items-start gap-2.5"
                  >
                    <span className="text-lg shrink-0">{ast.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[var(--color-text-primary)]">{ast.topic}</h4>

                      <p className="text-[10px] text-[var(--color-text-disabled)] mt-0.5 line-clamp-2">{ast.tip}</p>
                    </div>
                  </button>
                  <AnimatePresence>
                    {expandedAstuce === ast.id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        className="border-t border-[var(--color-border-default)]"
                      >
                        <div className="p-3 space-y-2">
                          <div className="flex items-start gap-2">
                            <Lightbulb className="w-3.5 h-3.5 text-[var(--color-warning)] mt-0.5 shrink-0" />
                            <div>
                              <p className="text-[10px] font-semibold text-[var(--color-text-secondary)] mb-0.5">Astuce (Tip)</p>
                              <p className="text-[10px] text-[var(--color-text-secondary)] leading-relaxed">{ast.tip}</p>

                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <BookOpen className="w-3.5 h-3.5 text-[var(--color-info)] mt-0.5 shrink-0" />
                            <div>
                              <p className="text-[10px] font-semibold text-[var(--color-text-secondary)] mb-0.5">Suggestion</p>
                              <p className="text-[10px] text-[var(--color-text-secondary)] leading-relaxed">{ast.suggest}</p>

                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
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

  const meta = CATEGORY_META[current.category];
  const pct = ((index + (selected !== null ? 1 : 0)) / items.length) * 100;

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--color-primary-subtle)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-dark)]">
          <Globe className="w-3 h-3" /> {index + 1}/{items.length}
        </span>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--color-success)] text-white px-3 py-1 text-xs font-semibold">
            <Sparkles className="w-3 h-3" /> {score}
          </span>
          {meta && <span className="text-xs bg-[var(--color-surface-alt)] px-2 py-1 rounded-[var(--radius-pill)]">{meta.icon} {meta.label}</span>}
        </div>
      </div>

      <div className="w-full h-1.5 rounded-[var(--radius-pill)] bg-[var(--color-surface-alt)] overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.3 }} className="h-full rounded-[var(--radius-pill)] bg-[var(--color-primary)]" />
      </div>

      <div className="bg-[var(--color-surface)] rounded-[24px] border-2 border-[var(--color-border-default)] p-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        <div className="mb-1">
          <span className="text-xs text-[var(--color-text-disabled)] font-medium uppercase tracking-wide">Choose the correct answer</span>
        </div>

        <p className="text-base font-bold text-[var(--color-text-primary)] mb-6">{current.question}</p>


        <div className="space-y-2">
          {current.options.map((opt, i) => {
            let cls = "bg-[var(--color-surface)] border-2 border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:ring-[var(--color-primary)] hover:bg-[var(--color-primary-subtle)]";
            if (selected === i && i === current.correctIndex) cls = "bg-[var(--color-success)] text-white ring-2 ring-emerald-400 text-emerald-800";
            else if (selected === i && i !== current.correctIndex) cls = "bg-[var(--color-error)] text-white ring-2 ring-red-300 text-red-700";
            else if (selected !== null && i === current.correctIndex) cls = "bg-emerald-50/50 ring-1 ring-[var(--color-success)] text-[var(--color-success)]";

            return (
              <motion.button key={i} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                onClick={() => handleSelect(i)} disabled={selected !== null}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-[14px] text-sm font-medium transition-all text-left ${cls}`}
              >
                <span className={`w-6 h-6 rounded-[var(--radius-pill)] flex items-center justify-center text-[11px] font-bold shrink-0 ${
                  selected === i && i === current.correctIndex ? "bg-[var(--color-success)] text-white" :
                  selected === i && i !== current.correctIndex ? "bg-[var(--color-error)] text-white" :
                  "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)]"
                }`}>{String.fromCharCode(65 + i)}</span>
                <div>
                  <span>{opt}</span>

                </div>
                {selected !== null && i === current.correctIndex && <CheckCircle2 className="w-4 h-4 text-[var(--color-success)] ml-auto shrink-0" />}
                {selected === i && i !== current.correctIndex && <XCircle className="w-4 h-4 text-[var(--color-error)] ml-auto shrink-0" />}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {selected !== null && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 rounded-[10px] bg-[var(--color-info)] text-white text-xs flex items-start gap-2"
            >
              <Info className="w-3.5 h-3.5 text-[var(--color-info)] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-[var(--color-text-secondary)]">{current.explanation}</p>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
