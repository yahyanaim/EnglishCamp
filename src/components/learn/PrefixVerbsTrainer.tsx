"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeCard, PracticeButton } from "@/components/ui/PracticeSurface";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";

type Item = { verb: string; en: string; prefix: string; options: string[]; sentence: string };

const ITEMS: Item[] = [
  { verb: "rewrite", en: "to write again", prefix: "re-", options: ["re-", "pre-", "un-", "dis-"], sentence: "Please ___ this essay." },
  { verb: "unlock", en: "to open a lock", prefix: "un-", options: ["un-", "re-", "dis-", "over-"], sentence: "Can you ___ the door?" },
  { verb: "preview", en: "to see before", prefix: "pre-", options: ["pre-", "re-", "mis-", "under-"], sentence: "Let's ___ the movie first." },
  { verb: "disagree", en: "to not agree", prefix: "dis-", options: ["dis-", "un-", "mis-", "over-"], sentence: "I ___ with your opinion." },
  { verb: "misunderstand", en: "to understand wrongly", prefix: "mis-", options: ["mis-", "un-", "dis-", "pre-"], sentence: "Don't ___ what I said." },
  { verb: "overcook", en: "to cook too much", prefix: "over-", options: ["over-", "under-", "re-", "pre-"], sentence: "Don't ___ the pasta!" },
  { verb: "undercook", en: "to not cook enough", prefix: "under-", options: ["under-", "over-", "mis-", "re-"], sentence: "It's dangerous to ___ chicken." },
  { verb: "redo", en: "to do again", prefix: "re-", options: ["re-", "pre-", "un-", "dis-"], sentence: "I need to ___ my homework." },
  { verb: "unpack", en: "to take out of a bag", prefix: "un-", options: ["un-", "re-", "dis-", "over-"], sentence: "Let's ___ our suitcases." },
  { verb: "prepay", en: "to pay in advance", prefix: "pre-", options: ["pre-", "re-", "mis-", "under-"], sentence: "You can ___ for the order." },
  { verb: "dislike", en: "to not like", prefix: "dis-", options: ["dis-", "un-", "mis-", "over-"], sentence: "I really ___ that movie." },
  { verb: "misplace", en: "to put in wrong place", prefix: "mis-", options: ["mis-", "un-", "dis-", "pre-"], sentence: "I always ___ my keys." },
  { verb: "overthink", en: "to think too much", prefix: "over-", options: ["over-", "under-", "re-", "pre-"], sentence: "Don't ___ the problem." },
  { verb: "underestimate", en: "to estimate too low", prefix: "under-", options: ["under-", "over-", "mis-", "re-"], sentence: "Never ___ your opponent." },
  { verb: "rebuild", en: "to build again", prefix: "re-", options: ["re-", "pre-", "un-", "dis-"], sentence: "They will ___ the city." },
];

export function PrefixVerbsTrainer() {
  const { completeExercise } = useProgress();
  const { addError } = useErrors();
  const [pool, setPool] = useState<Item[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => { setPool([...ITEMS].sort(() => Math.random() - 0.5).slice(0, 12)); }, []);

  const current = pool[index];
  if (!current && !done) return null;

  function handleSelect(opt: string) {
    if (selected || !current) return;
    setSelected(opt);
    setTotal((t) => t + 1);
    if (opt === current.prefix) { setScore((s) => s + 1); playCorrect(); completeExercise(`prefix-${current.verb}`, 5); }
    else { playWrong(); addError({ question: `Prefix for "${current.verb}"`, userAnswer: opt, correctAnswer: current.prefix, explanation: `"${current.verb}" takes the prefix "${current.prefix}"`, source: "prefix", sourceId: `prefix-${current.verb}` }); }
  }

  function handleNext() {
    if (!current) return;
    if (index + 1 >= pool.length) { setDone(true); return; }
    setIndex((i) => i + 1); setSelected(null);
  }

  function handleRestart() {
    setPool([...ITEMS].sort(() => Math.random() - 0.5).slice(0, 12));
    setIndex(0); setSelected(null); setScore(0); setTotal(0); setDone(false);
  }

  if (done) {
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    return (
      <div className="text-center py-8">
        <span className="text-5xl block mb-3">{pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "💪"}</span>
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Prefix Verbs Complete!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-text-link)] mb-1">{score}/{total} correct ({pct}%)</p>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">{pct >= 80 ? "Excellent prefix knowledge!" : "Keep practicing!"}</p>
        <PracticeButton onClick={handleRestart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">Play Again <LearningArt name="🔄" size={16} /></PracticeButton>
      </div>
    );
  }

  return (
    <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[var(--color-text-success)] uppercase tracking-wider">Prefix Verbs</span>
        <span className="text-xs text-[var(--color-text-secondary)]">{index + 1}/{pool.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center mb-5">
          <p className="text-sm text-[var(--color-text-secondary)] mb-2">Choose the correct prefix for this verb</p>
          <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] p-4 border border-[var(--color-border-default)]">
            <p className="text-sm text-[var(--color-text-secondary)]">{current.sentence}</p>
            <p className="text-lg font-display font-extrabold text-[var(--color-text-primary)] mt-1">
              <span className="text-[var(--color-text-link)] font-mono">___</span>{current.verb.slice(current.verb.indexOf(current.prefix) === 0 ? current.prefix.length : 0)}
            </p>
            <p className="text-xs text-[var(--color-text-secondary)] italic">{current.en}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-wrap justify-center gap-3 mb-4">
        {current.options.map((opt) => {
          let style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:bg-[var(--color-success-bg)]  hover:border-[var(--color-success)] hover:";
          if (selected) {
            if (opt === current.prefix) style = "bg-[var(--color-success-bg)] text-[var(--color-text-success)] border-[var(--color-success)] ring-2 ring-[var(--color-success)]";
            else if (opt === selected) style = "bg-[var(--color-error-bg)] text-[var(--color-text-error)] border-[var(--color-error)]";
            else style = "opacity-40";
          }
          return (
            <PracticeButton key={opt} onClick={() => handleSelect(opt)} disabled={!!selected} className={`px-5 py-2.5 text-sm font-bold rounded-[var(--radius-lg)] border transition-all duration-200 ${style}`}>
              {opt}
            </PracticeButton>
          );
        })}
      </div>

      {selected && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className={`text-sm font-medium mb-3 ${selected === current.prefix ? "text-[var(--color-text-success)]" : "text-[var(--color-text-error)]"}`}>
            {selected === current.prefix ? "✓ Correct! +5 XP" : `✗ Correct prefix: ${current.prefix} → ${current.verb}`}
          </p>
          <PracticeButton onClick={handleNext} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
            {index + 1 >= pool.length ? "See Results" : "Next →"}
          </PracticeButton>
        </motion.div>
      )}

      <div className="flex justify-center gap-1 mt-4">
        {pool.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-[var(--radius-pill)] ${i < index ? "bg-emerald-300" : i === index ? "bg-emerald-500" : "bg-[var(--color-border-default)]"}`} />
        ))}
      </div>
    </PracticeCard>
  );
}
