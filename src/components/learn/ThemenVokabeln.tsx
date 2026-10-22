"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playCorrect, playWrong, playXP } from "@/lib/audio";
import { useProgress } from "@/store/useProgress";
import { TOPICS } from "@/data/themen-wortschatz";
import type { TopicCategory } from "@/data/themen-wortschatz";
import { RefreshCw, Sparkles, BookText, CheckCircle2, XCircle, ArrowRight } from "lucide-react";

type VocabItem = {
  word: string;
  definition: string;
  topicId: string;
  topicLabel: string;
};

function shuffle<T>(a: T[]): T[] {
  const arr = [...a];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildItems(topicFilter: string): VocabItem[] {
  const items: VocabItem[] = [];
  const topics = topicFilter === "all" ? TOPICS : TOPICS.filter((t) => t.id === topicFilter);
  for (const topic of topics) {
    for (const w of topic.words) {
      items.push({ word: w.word, definition: w.definition, topicId: topic.id, topicLabel: topic.label });
    }
  }
  return shuffle(items);
}

export function TopicVocabulary() {
  const { addXP } = useProgress();
  const [items, setItems] = useState<VocabItem[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<"ready" | "playing" | "done">("ready");
  const [mode, setMode] = useState<"word-to-def" | "def-to-word">("word-to-def");
  const [topicFilter, setTopicFilter] = useState<string>("all");

  function initGame() {
    const pool = buildItems(topicFilter);
    setItems(pool.slice(0, 10));
    setIndex(0);
    setSelected(null);
    setScore(0);
    setPhase("playing");
  }

  const current = items[index];
  const options = useMemo(() => {
    if (!current) return [];
    const key = mode === "word-to-def" ? "definition" : "word";
    const wrong = shuffle(items.filter((x) => x[key] !== current[key])).slice(0, 3).map((x) => x[key]);
    return shuffle([current[key], ...wrong]);
  }, [current, mode, index]);

  function handleSelect(opt: string) {
    if (selected !== null || !current) return;
    setSelected(opt);
    const correctAnswer = mode === "word-to-def" ? current.definition : current.word;
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
    const topicOptions = TOPICS.map((t) => ({ id: t.id, label: t.label, icon: t.icon }));
    return (
      <div className="bg-[var(--color-surface)] rounded-[24px] border-2 border-[var(--color-border-default)] p-8 text-center shadow-[0_4px_16px_rgba(0,0,0,0.08)] max-w-lg mx-auto">
        <BookText className="w-14 h-14 text-[var(--color-primary)] mx-auto mb-4" />
        <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">Topic Vocabulary</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mt-2">Learn B2 FCE vocabulary by topic</p>

        <div className="flex items-center justify-center gap-2 mt-5">
          <button onClick={() => setMode("word-to-def")}
            className={`rounded-[10px] px-4 py-2 text-xs font-bold transition-all ${mode === "word-to-def" ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-default)]"}`}
          >Word → Definition</button>
          <button onClick={() => setMode("def-to-word")}
            className={`rounded-[10px] px-4 py-2 text-xs font-bold transition-all ${mode === "def-to-word" ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-default)]"}`}
          >Definition → Word</button>
        </div>

        <div className="flex flex-wrap gap-1.5 justify-center mt-4">
          <button onClick={() => setTopicFilter("all")}
            className={`rounded-[8px] px-2.5 py-1 text-[10px] font-bold transition-all ${topicFilter === "all" ? "bg-slate-800 text-white" : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-default)]"}`}
          >All Topics</button>
          {topicOptions.map((t) => (
            <button key={t.id} onClick={() => setTopicFilter(t.id)}
              className={`rounded-[8px] px-2.5 py-1 text-[10px] font-bold transition-all ${topicFilter === t.id ? "bg-slate-800 text-white" : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-default)]"}`}
            >{t.icon} {t.label.split("(")[0].trim()}</button>
          ))}
        </div>

        <button onClick={initGame}
          className="mt-6 px-8 py-3 rounded-[14px] bg-[var(--color-primary)] text-white font-bold text-sm hover:bg-brand-600 transition-all inline-flex items-center gap-2 shadow-[0_4px_0_rgba(28,176,246,0.3)]"
        >
          <BookText className="w-4 h-4" /> Start Learning
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
        <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">Session Complete!</h2>
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
          <RefreshCw className="w-4 h-4" /> New Session
        </button>
      </div>
    );
  }

  if (!current) return null;

  const sourceText = mode === "word-to-def" ? current.word : current.definition;
  const correctAnswer = mode === "word-to-def" ? current.definition : current.word;
  const promptLabel = mode === "word-to-def" ? "What does this word mean?" : "Which word matches this definition?";
  const pct = ((index + (selected ? 1 : 0)) / items.length) * 100;

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--color-primary-subtle)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-dark)]">
          <BookText className="w-3 h-3" /> {index + 1}/{items.length}
        </span>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--color-success)] text-white px-3 py-1 text-xs font-semibold">
            <Sparkles className="w-3 h-3" /> {score}
          </span>
          <span className="text-[10px] text-[var(--color-text-disabled)] bg-[var(--color-surface-alt)] px-2 py-1 rounded-[var(--radius-pill)]">{current.topicLabel}</span>
        </div>
      </div>

      <div className="w-full h-1.5 rounded-[var(--radius-pill)] bg-[var(--color-surface-alt)] overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.3 }} className="h-full rounded-[var(--radius-pill)] bg-[var(--color-primary)]" />
      </div>

      <div className="bg-[var(--color-surface)] rounded-[24px] border-2 border-[var(--color-border-default)] p-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)] text-center">
        <div className="mb-1">
          <span className="text-xs text-[var(--color-text-disabled)] font-medium uppercase tracking-wide">{promptLabel}</span>
        </div>

        <p className="text-2xl font-display font-extrabold text-[var(--color-text-primary)] mb-6">{sourceText}</p>

        <div className="space-y-2">
          {options.map((opt) => {
            let cls = "bg-[var(--color-surface)] border-2 border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:ring-[var(--color-primary)] hover:bg-[var(--color-primary-subtle)]";
            if (selected === opt && opt === correctAnswer) cls = "bg-[var(--color-success)] text-white ring-2 ring-emerald-400 text-emerald-800";
            else if (selected === opt && opt !== correctAnswer) cls = "bg-[var(--color-error)] text-white ring-2 ring-red-300 text-red-700";
            else if (selected !== null && opt === correctAnswer) cls = "bg-emerald-50/50 ring-1 ring-[var(--color-success)] text-[var(--color-success)]";

            return (
              <motion.button key={opt} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                onClick={() => handleSelect(opt)} disabled={selected !== null}
                className={`flex items-center gap-2 w-full px-4 py-3 rounded-[14px] text-sm font-medium transition-all ${cls}`}
              >
                {selected !== null && opt === correctAnswer && <CheckCircle2 className="w-4 h-4 text-[var(--color-success)] shrink-0" />}
                {selected === opt && opt !== correctAnswer && <XCircle className="w-4 h-4 text-[var(--color-error)] shrink-0" />}
                <span>{opt}</span>
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
