"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";

type Item = { sentence: string; correct: string; options: string[]; explanation: string };

const ITEMS: Item[] = [
  { sentence: "I want ___ to the cinema. (go)", correct: "to go", options: ["to go", "go", "going", "to going"], explanation: "'want' is followed by 'to + infinitive': want to go" },
  { sentence: "She can ___ French. (speak)", correct: "speak", options: ["to speak", "speak", "speaking", "to speaking"], explanation: "Modal verbs like 'can' are followed by the bare infinitive: can speak" },
  { sentence: "He enjoys ___ books. (read)", correct: "reading", options: ["to read", "read", "reading", "to reading"], explanation: "'enjoy' is followed by the gerund (-ing form): enjoy reading" },
  { sentence: "I must ___ early tomorrow. (leave)", correct: "leave", options: ["to leave", "leave", "leaving", "to leaving"], explanation: "'must' is followed by the bare infinitive: must leave" },
  { sentence: "They promised ___ us. (help)", correct: "to help", options: ["to help", "help", "helping", "to helping"], explanation: "'promise' is followed by 'to + infinitive': promised to help" },
  { sentence: "You should ___ a doctor. (see)", correct: "see", options: ["to see", "see", "seeing", "to seeing"], explanation: "'should' is a modal verb followed by the bare infinitive: should see" },
  { sentence: "We avoid ___ mistakes. (make)", correct: "making", options: ["to make", "make", "making", "to making"], explanation: "'avoid' is followed by the gerund: avoid making" },
  { sentence: "He suggested ___ to the park. (go)", correct: "going", options: ["to go", "go", "going", "to going"], explanation: "'suggest' is followed by the gerund: suggested going" },
  { sentence: "I need ___ this book. (finish)", correct: "to finish", options: ["to finish", "finish", "finishing", "to finishing"], explanation: "'need' is followed by 'to + infinitive': need to finish" },
  { sentence: "She might ___ late. (arrive)", correct: "arrive", options: ["to arrive", "arrive", "arriving", "to arriving"], explanation: "'might' is a modal verb: might + bare infinitive" },
  { sentence: "We hope ___ you soon. (see)", correct: "to see", options: ["to see", "see", "seeing", "to seeing"], explanation: "'hope' is followed by 'to + infinitive': hope to see" },
  { sentence: "I don't mind ___ for you. (wait)", correct: "waiting", options: ["to wait", "wait", "waiting", "to waiting"], explanation: "'don't mind' is followed by the gerund: don't mind waiting" },
  { sentence: "You must not ___ here. (smoke)", correct: "smoke", options: ["to smoke", "smoke", "smoking", "to smoking"], explanation: "'must not' → bare infinitive: must not smoke" },
  { sentence: "He decided ___ a new job. (find)", correct: "to find", options: ["to find", "find", "finding", "to finding"], explanation: "'decide' is followed by 'to + infinitive': decided to find" },
  { sentence: "She keeps ___ the same mistake. (make)", correct: "making", options: ["to make", "make", "making", "to making"], explanation: "'keep' (meaning 'continue') is followed by the gerund: keeps making" },
];

export function DoubleInfinitiveTrainer() {
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
    if (opt === current.correct) { setScore((s) => s + 1); playCorrect(); completeExercise(`doubleinf-${index}`, 10); }
    else { playWrong(); addError({ question: `Double infinitive: "${current.sentence}"`, userAnswer: opt, correctAnswer: current.correct, explanation: current.explanation, source: "doubleinf", sourceId: `doubleinf-${index}` }); }
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
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Verb Patterns Complete!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-primary-dark)] mb-1">{score}/{total} correct ({pct}%)</p>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">{pct >= 80 ? "Excellent B2 grammar skills!" : "Keep practicing!"}</p>
        <button onClick={handleRestart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">Play Again 🔄</button>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[#9B59B6] uppercase tracking-wider">Verb Patterns</span>
        <span className="text-xs text-[var(--color-text-disabled)]">{index + 1}/{pool.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center mb-5">
          <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] p-4 border border-[var(--color-border-default)]">
            <p className="text-lg font-display font-extrabold text-[var(--color-text-primary)]">{current.sentence}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {current.options.map((opt) => {
          let style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:bg-violet-50 hover:border-violet-300 hover:text-violet-700";
          if (selected) {
            if (opt === current.correct) style = "bg-[var(--color-success)] text-white border-[var(--color-success)] ring-2 ring-[var(--color-success)]";
            else if (opt === selected) style = "bg-[var(--color-error)] text-white border-[var(--color-error)]";
            else style = "opacity-40";
          }
          return (
            <button key={opt} onClick={() => handleSelect(opt)} disabled={!!selected} className={`text-sm font-medium px-4 py-3 rounded-[var(--radius-lg)] border-2 transition-all duration-200 ${style}`}>
              {opt}
            </button>
          );
        })}
      </div>

      {selected && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className={`text-sm font-medium mb-1 ${selected === current.correct ? "text-[var(--color-success)]" : "text-[var(--color-error)]"}`}>
            {selected === current.correct ? "✓ Correct! +10 XP" : `✗ Correct: ${current.correct}`}
          </p>
          <p className="text-xs text-[var(--color-text-disabled)] mb-3">{current.explanation}</p>
          <button onClick={handleNext} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
            {index + 1 >= pool.length ? "See Results" : "Next →"}
          </button>
        </motion.div>
      )}

      <div className="flex justify-center gap-1 mt-4">
        {pool.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-[var(--radius-pill)] ${i < index ? "bg-violet-300" : i === index ? "bg-violet-500" : "bg-[var(--color-border-default)]"}`} />
        ))}
      </div>
    </div>
  );
}
