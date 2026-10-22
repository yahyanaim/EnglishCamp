"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";

type WOEntry = { en: string; options: string[]; correct: string; explanation: string };

const WO: WOEntry[] = [
  { en: "I go to school today.", options: ["I go today to school.", "Today I go to school.", "I to school go today.", "Go I today to school."], correct: "Today I go to school.", explanation: "English word order: subject + verb + object. Time can come first or last." },
  { en: "Because I am sick, I stay at home.", options: ["Because am I sick, I stay at home.", "Because I am sick, I stay at home.", "I stay at home, because am I sick.", "Because sick I am, I stay at home."], correct: "Because I am sick, I stay at home.", explanation: "'Because' clause: subject + verb. Main clause follows the same order." },
  { en: "I know that he is coming tomorrow.", options: ["I know that he comes tomorrow.", "I know that he is coming tomorrow.", "I know he comes tomorrow that.", "That he is coming tomorrow I know."], correct: "I know that he is coming tomorrow.", explanation: "'That' clause: subject + verb in normal order in English." },
  { en: "Yesterday I went to the cinema.", options: ["I went yesterday to the cinema.", "Yesterday I went to the cinema.", "Yesterday went I to the cinema.", "To the cinema went I yesterday."], correct: "Yesterday I went to the cinema.", explanation: "Time can be at the beginning or end. Subject + verb must stay together." },
  { en: "Can you help me?", options: ["You can help me?", "Can you help me?", "Help you can me?", "Me help you can?"], correct: "Can you help me?", explanation: "Yes/no question: auxiliary verb first, then subject." },
  { en: "He gave me a present.", options: ["He gave me a present.", "He a present gave me.", "Me gave he a present.", "A present gave me he."], correct: "He gave me a present.", explanation: "Subject + verb + indirect object + direct object." },
  { en: "She speaks English very well.", options: ["She speaks very well English.", "She very well speaks English.", "She speaks English very well.", "Speaks she English very well."], correct: "She speaks English very well.", explanation: "Subject + verb + object + manner adverb." },
  { en: "I have been learning English for a year.", options: ["I have been learning for a year English.", "I have been learning English for a year.", "For a year I have been learning English.", "Learning English I have been for a year."], correct: "I have been learning English for a year.", explanation: "Subject + auxiliary + been + verb-ing + object + time." },
];

export function WordOrderTrainer() {
  const { completeExercise } = useProgress(); const { addError } = useErrors();
  const [pool, setPool] = useState<WOEntry[]>([]);
  const [current, setCurrent] = useState(0); const [score, setScore] = useState(0); const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState<string | null>(null); const [answered, setAnswered] = useState(false); const [correct, setCorrect] = useState(false); const [done, setDone] = useState(false);

  useEffect(() => { setPool([...WO].sort(() => Math.random() - 0.5)); }, []);

  const item = pool[current];

  function handleAnswer(opt: string) {
    if (answered || !item) return;
    const isCorrect = opt === item.correct;
    setSelected(opt); setCorrect(isCorrect); setAnswered(true); setTotal((t) => t + 1);
    if (isCorrect) { setScore((s) => s + 1); playCorrect(); }
    else { playWrong(); addError({ question: `Word order: "${item.en}"`, userAnswer: opt, correctAnswer: item.correct, explanation: item.explanation, source: "exercise", sourceId: `wo-${current}` }); }
  }

  function next() {
    if (!item) return; if (correct) completeExercise(`wo-${current}`, 5);
    if (current + 1 >= pool.length) { setDone(true); return; }
    setCurrent((c) => c + 1); setSelected(null); setAnswered(false); setCorrect(false);
  }

  function restart() { setPool([...WO].sort(() => Math.random() - 0.5)); setCurrent(0); setScore(0); setTotal(0); setSelected(null); setAnswered(false); setCorrect(false); setDone(false); }

  if (done) return <div className="text-center py-8"><span className="text-5xl block mb-3">🏆</span><h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Word Order Done!</h3><p className="text-lg font-display font-extrabold text-[var(--color-primary-dark)]">{score}/{total}</p><button onClick={restart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all mt-4">Play Again 🔄</button></div>;
  if (!item) return null;

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">Word Order (Satzbau)</span>
        <span className="text-xs text-[var(--color-text-disabled)]">{current + 1}/{pool.length}</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="mb-4">
          <p className="text-xs text-[var(--color-text-disabled)] mb-1">Choose the correct sentence:</p>
          <p className="text-sm font-semibold text-[var(--color-text-secondary)] italic">&ldquo;{item.en}&rdquo;</p>
        </motion.div>
      </AnimatePresence>
      <div className="space-y-2 mb-4">
        {item.options.map((opt, i) => {
          let style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] hover:bg-[var(--color-primary-subtle)] hover:border-[var(--color-primary)]";
          if (answered) {
            if (opt === item.correct) style = "bg-[var(--color-success)] text-white border-[var(--color-success)] ring-2 ring-[var(--color-success)]";
            else if (opt === selected) style = "bg-[var(--color-error)] text-white border-[var(--color-error)]";
            else style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] opacity-50";
          }
          return (
            <button key={i} onClick={() => handleAnswer(opt)} disabled={answered}
              className={`w-full text-left p-3 rounded-[var(--radius-lg)] border-2 text-sm transition-all font-mono ${style}`}>
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <p className={`text-sm font-medium mb-1 ${correct ? "text-[var(--color-success)]" : "text-[var(--color-error)]"}`}>
            {correct ? "✓ Correct!" : "✗ Wrong"}
          </p>
          <p className="text-xs text-[var(--color-text-secondary)] mb-2">{item.explanation}</p>
          <button onClick={next} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
            {current + 1 >= pool.length ? "Results" : "Next →"}
          </button>
        </motion.div>
      )}
    </div>
  );
}
