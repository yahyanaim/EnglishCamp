"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeCard, PracticeButton } from "@/components/ui/PracticeSurface";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playCorrect, playWrong, playXP } from "@/lib/audio";
import { useProgress } from "@/store/useProgress";
import { REDEMITTEL, REDEMITTEL_CATEGORIES } from "@/data/redemittel";
import type { RedemittelCategory, RedemittelEntry } from "@/data/redemittel";
import { RefreshCw, Sparkles, CheckCircle2, XCircle, ArrowRight, MessageSquare } from "lucide-react";

type Scenario = {
  situation: string;
  description: string;
};

const SCENARIOS: Record<RedemittelCategory, Scenario> = {
  opinion: { situation: "You want to express your opinion on a topic", description: "Which phrase introduces your personal view?" },
  agreeing: { situation: "Someone expresses an opinion you agree with", description: "Which phrase shows agreement?" },
  disagreeing: { situation: "You disagree with someone's statement", description: "Which phrase politely expresses disagreement?" },
  adding: { situation: "You want to add another point to your argument", description: "Which phrase introduces additional information?" },
  clarifying: { situation: "You need to make an idea clearer", description: "Which phrase explains an idea again or asks for clarification?" },
  interrupting: { situation: "You want to join a conversation while someone is speaking", description: "Which phrase lets you interrupt politely?" },
  comparing: { situation: "You want to show how two things are similar", description: "Which phrase introduces a comparison or similarity?" },
  examples: { situation: "You want to support an idea with a specific example", description: "Which phrase introduces an example?" },
  contrasting: { situation: "You want to show a difference or an opposing idea", description: "Which phrase expresses contrast?" },
  sequencing: { situation: "You need to put points or events in order", description: "Which phrase shows the order of your ideas or events?" },
  summarizing: { situation: "You want to bring the main points together", description: "Which phrase introduces a summary or conclusion?" },
};

type ChallengeItem = {
  phrase: string;
  usage: string;
  arabic: string;
  correctCat: RedemittelCategory;
  wrongCats: RedemittelCategory[];
  options: { label: string; id: RedemittelCategory }[];
};

function shuffle<T>(a: T[]): T[] {
  const arr = [...a];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildItems(count: number): ChallengeItem[] {
  const cats = Object.keys(REDEMITTEL_CATEGORIES) as RedemittelCategory[];
  const items: ChallengeItem[] = [];
  const allEntries = shuffle(REDEMITTEL);
  for (const entry of allEntries) {
    if (items.length >= count) break;
    const wrongCats = shuffle(cats.filter((c) => c !== entry.category)).slice(0, 3);
    const options = shuffle([
      { label: REDEMITTEL_CATEGORIES[entry.category].label, id: entry.category },
      ...wrongCats.map((c) => ({ label: REDEMITTEL_CATEGORIES[c].label, id: c })),
    ]);
    items.push({ phrase: entry.phrase, usage: entry.usage, arabic: entry.arabic, correctCat: entry.category, wrongCats, options });
  }
  return items;
}

const MotionPracticeButton = motion.create(PracticeButton);

export function RedemittelPraxis() {
  const { addXP } = useProgress();
  const [items, setItems] = useState<ChallengeItem[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<"ready" | "playing" | "done">("ready");

  function initGame() {
    setItems(buildItems(10));
    setIndex(0);
    setSelected(null);
    setScore(0);
    setPhase("playing");
  }

  const current = items[index];

  function handleSelect(catId: string) {
    if (selected !== null) return;
    setSelected(catId);
    if (catId === current.correctCat) {
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
        <LearningArt name="MessageSquare" className="w-14 h-14 text-[var(--color-primary)] mx-auto mb-4" />
        <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">Useful Phrases Practice</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mt-2">Match English useful phrases to the right situation</p>

        <div className="flex flex-wrap gap-1.5 justify-center mt-4">
          {(Object.entries(REDEMITTEL_CATEGORIES) as [RedemittelCategory, typeof REDEMITTEL_CATEGORIES[RedemittelCategory]][]).slice(0, 6).map(([id, meta]) => (
            <span key={id} className={`inline-flex items-center gap-1 rounded-[8px] px-2 py-1 text-xs font-medium text-[var(--color-text-secondary)] bg-[var(--color-surface-alt)]`}>
              <LearningArt name={meta.icon} size={16} /> {meta.label}
            </span>
          ))}
        </div>
        <p className="text-xs text-[var(--color-text-secondary)] mt-2">...and 6 more categories</p>

        <PracticeButton onClick={initGame}
          className="mt-5 px-8 py-3 rounded-[14px] bg-[var(--color-primary)] text-[var(--color-on-brand)] font-bold text-sm hover:bg-[var(--color-primary-hover)] transition-all inline-flex items-center gap-2 shadow-[var(--shadow-1)]"
        >
          <MessageSquare className="w-4 h-4" /> Start Practice
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
        <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">Practice Complete!</h2>
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
          <RefreshCw className="w-4 h-4" /> Practice Again
        </PracticeButton>
      </PracticeCard>
    );
  }

  if (!current) return null;

  const meta = REDEMITTEL_CATEGORIES[current.correctCat];
  const scenario = SCENARIOS[current.correctCat];
  const pct = ((index + (selected ? 1 : 0)) / items.length) * 100;

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="camp-quiz-status flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--color-primary-subtle)] px-3 py-1 text-xs font-semibold text-[var(--color-text-link)]">
          <MessageSquare className="w-3 h-3" /> {index + 1}/{items.length}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--color-success-bg)] text-[var(--color-text-success)] px-3 py-1 text-xs font-semibold">
          <LearningArt name="Sparkles" size={12} className="w-3 h-3" /> {score}
        </span>
      </div>

      <div className="w-full h-1.5 rounded-[var(--radius-pill)] bg-[var(--color-surface-alt)] overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.3 }} className="h-full rounded-[var(--radius-pill)] bg-[var(--color-primary)]" />
      </div>

      <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-5 sm:p-6 shadow-[var(--shadow-1)]">
        <div className="mb-4 p-4 rounded-[var(--radius-md)] bg-[var(--color-warning-bg)] text-[var(--color-text-warning)] border border-[var(--color-warning)]">
          <p className="text-xs font-semibold text-[var(--color-text-warning)]">{scenario.situation}</p>
          <p className="text-xs text-[var(--color-text-warning)] mt-0.5">{scenario.description}</p>
        </div>

        <div className="mb-4 text-left">
          <p className="text-lg font-display font-extrabold text-[var(--color-text-primary)] italic leading-relaxed">&ldquo;{current.phrase}&rdquo;</p>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1">{current.usage}</p>
          {current.arabic && <p className="font-arabic text-xs text-[var(--color-text-secondary)] mt-0.5" lang="ar">{current.arabic}</p>}
        </div>

        <div className="space-y-2">
          {current.options.map((opt) => {
            const optMeta = REDEMITTEL_CATEGORIES[opt.id];
            let cls = "bg-[var(--color-surface)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:ring-[var(--color-primary)] hover:bg-[var(--color-primary-subtle)]";
            if (selected === opt.id && opt.id === current.correctCat) cls = "bg-[var(--color-success-bg)] text-[var(--color-text-success)] ring-2 ring-emerald-400 text-[var(--color-text-success)]";
            else if (selected === opt.id && opt.id !== current.correctCat) cls = "bg-[var(--color-error-bg)] text-[var(--color-text-error)] ring-2 ring-red-300 text-[var(--color-text-error)]";
            else if (selected !== null && opt.id === current.correctCat) cls = "bg-[var(--color-success-bg)] ring-1 ring-[var(--color-success)] text-[var(--color-text-success)]";

            return (
              <MotionPracticeButton key={opt.id} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                onClick={() => handleSelect(opt.id)} disabled={selected !== null}
                className={`flex justify-start items-center gap-2 w-full px-4 py-3 rounded-[14px] text-sm font-medium transition-all ${cls}`}
              >
                {optMeta && <LearningArt name={optMeta.icon} size={24} className="" />}
                <span>{opt.label}</span>
                {selected !== null && opt.id === current.correctCat && <CheckCircle2 className="w-4 h-4 text-[var(--color-text-success)] ml-auto shrink-0" />}
                {selected === opt.id && opt.id !== current.correctCat && <XCircle className="w-4 h-4 text-[var(--color-text-error)] ml-auto shrink-0" />}
              </MotionPracticeButton>
            );
          })}
        </div>
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
