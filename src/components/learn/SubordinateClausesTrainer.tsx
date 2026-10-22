"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { playCorrect, playWrong } from "@/lib/audio";

type Question = {
  prompt: string;
  options: string[];
  correct: number;
  explanation: string;
};

const QUESTIONS: Question[] = [
  { prompt: "Choose the correct conjunction: 'I stay home ___ it is raining.'", options: ["because", "although", "unless", "so"], correct: 0, explanation: "'because' introduces the reason for staying home." },
  { prompt: "___ it is raining, I go for a walk.", options: ["Because", "Although", "Since", "So"], correct: 1, explanation: "'Although' (or 'Though') expresses contrast — going despite the rain." },
  { prompt: "I study English ___ I can work in London.", options: ["for", "so that", "because", "that"], correct: 1, explanation: "'so that' introduces a purpose clause with a different subject." },
  { prompt: "I study English ___ work in London.", options: ["for", "to", "because", "that"], correct: 1, explanation: "'to + infinitive' — same subject, expressing purpose." },
  { prompt: "Complete: 'I don't know ___ he is coming.'", options: ["that", "if/whether", "when", "because"], correct: 1, explanation: "'if' or 'whether' introduces an indirect yes/no question." },
  { prompt: "Do you know ___ the station is?", options: ["if", "where", "that", "when"], correct: 1, explanation: "'where' introduces an indirect wh-question." },
  { prompt: "___ I was young, I lived in London.", options: ["When", "While", "Whenever", "If"], correct: 0, explanation: "'When' for a specific time in the past. 'While' is also possible here." },
  { prompt: "___ I have time, I like to read.", options: ["When", "Whenever", "While", "If"], correct: 1, explanation: "'Whenever' (or 'When') for habitual/repeated actions." },
  { prompt: "Correct word order: 'He said that he is tired' or 'He said that is he tired'?", options: ["He said that he is tired", "He said that is he tired", "both are correct", "He said that tired he is"], correct: 0, explanation: "English subordinate clauses keep normal SVO word order (no verb shift)." },
  { prompt: "___ you have time, please help me.", options: ["If", "Unless", "Although", "Because"], correct: 0, explanation: "'If' introduces a conditional clause." },
  { prompt: "He passed the exam ___ he studied very little.", options: ["because", "although", "so", "since"], correct: 1, explanation: "'although' (or 'even though') — concessive clause expressing contrast." },
  { prompt: "She is taller ___ I thought.", options: ["like", "than", "that", "as"], correct: 1, explanation: "'than' is used after comparative adjectives (taller than)." },
  { prompt: "It is not as bad ___ it looks.", options: ["than", "as", "like", "that"], correct: 1, explanation: "'as...as' for comparisons of equality." },
  { prompt: "The more you learn, ___ better you become.", options: ["the", "than", "as", "so"], correct: 0, explanation: "'the + comparative, the + comparative' — proportional comparison." },
  { prompt: "You can improve your English ___ reading a lot.", options: ["so that", "by", "because", "although"], correct: 1, explanation: "'by + gerund' expresses the means or method." },
];

export function SubordinateClausesTrainer() {
  const { completeExercise } = useProgress();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  function handleSelect(index: number) {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    const isCorrect = index === QUESTIONS[current].correct;
    if (isCorrect) { setScore((s) => s + 1); playCorrect(); }
    else playWrong();
  }

  function next() {
    if (selected === QUESTIONS[current].correct) completeExercise(`sub-clauses-${current}`, 10);
    if (current + 1 >= QUESTIONS.length) setDone(true);
    else { setCurrent((c) => c + 1); setAnswered(false); setSelected(null); }
  }

  function restart() {
    setCurrent(0); setScore(0); setAnswered(false); setSelected(null); setDone(false);
  }

  if (done) {
    const pct = Math.round((score / QUESTIONS.length) * 100);
    return (
      <div className="text-center py-8">
        <span className="text-5xl block mb-3">{pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "💪"}</span>
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Subordinate Clauses Complete!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-primary-dark)] mb-1">{score}/{QUESTIONS.length} correct ({pct}%)</p>
        <button onClick={restart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all mt-4">Play Again 🔄</button>
      </div>
    );
  }

  const q = QUESTIONS[current];
  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[var(--color-warning)] uppercase tracking-wider">Subordinate Clauses</span>
        <span className="text-xs text-[var(--color-text-disabled)]">{current + 1} / {QUESTIONS.length}</span>
      </div>
      <p className="text-sm text-[var(--color-text-secondary)] mb-4">Practice conjunctions and word order in subordinate clauses.</p>

      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
          <p className="text-lg font-medium text-[var(--color-text-primary)] mb-4">{q.prompt}</p>
          <div className="space-y-2 mb-4">
            {q.options.map((opt, i) => {
              let cls = "bg-[var(--color-surface)] border-[var(--color-border-default)] hover:border-[var(--color-primary)] text-[var(--color-text-primary)]";
              if (answered && i === q.correct) cls = "bg-[var(--color-success)] text-white border-emerald-400";
              else if (answered && i === selected && i !== q.correct) cls = "bg-[var(--color-error)] text-white border-red-300";
              else if (answered) cls = "opacity-60";
              return (
                <button key={i} onClick={() => handleSelect(i)}
                  className={`w-full text-left px-4 py-3 rounded-[var(--radius-lg)] border text-sm font-medium transition-all ${cls}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {answered && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-[var(--radius-lg)] bg-[var(--color-surface-alt)] border border-[var(--color-border-default)]">
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{q.explanation}</p>
              <button onClick={next} className="mt-3 text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
                {current + 1 >= QUESTIONS.length ? "See Results" : "Next →"}
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
