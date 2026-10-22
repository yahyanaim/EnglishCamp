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
  { prompt: "Which is the correct question for 'I live in London'?", options: ["Where do you live?", "What do you live?", "When do you live?", "Who do you live?"], correct: 0, explanation: "'Where' asks about a place/location." },
  { prompt: "Which is the correct indirect question?", options: ["I know where is the station.", "I know where the station is.", "I know where the station?", "Do you know where is the station?"], correct: 1, explanation: "Indirect question: subject + verb (no inversion)." },
  { prompt: "Which question tag is correct? 'You like coffee, ___?'", options: ["isn't it?", "don't you?", "aren't you?", "doesn't it?"], correct: 1, explanation: "Positive statement → negative tag. 'You like' → 'don't you?'" },
  { prompt: "Which is correct? '___ are you talking to?'", options: ["Who", "Whom", "Which", "What"], correct: 0, explanation: "'Who' is common in informal English for object questions. 'Whom' is formal." },
  { prompt: "Correct word order for a direct yes/no question:", options: ["You are coming tomorrow?", "Are you coming tomorrow?", "Tomorrow you are coming?", "You coming tomorrow?"], correct: 1, explanation: "Yes/no question: auxiliary verb FIRST, then subject." },
  { prompt: "Subject question: '___ called you?'", options: ["Who", "Whom", "Which", "What"], correct: 0, explanation: "Subject question: the question word IS the subject, no auxiliary needed." },
  { prompt: "Object question: '___ did you call?'", options: ["Who", "Whom", "Which", "What"], correct: 0, explanation: "Object question: auxiliary + subject + main verb." },
  { prompt: "Direct: 'Where is the station?' → Indirect: 'Could you tell me ___'", options: ["where is the station", "where the station is", "where the station?", "if the station is"], correct: 1, explanation: "Indirect W-question: W-word + subject + verb (no inversion)." },
  { prompt: "Direct: 'Is the course expensive?' → Indirect: 'I'd like to know ___'", options: ["is the course expensive", "if the course is expensive", "that the course is expensive", "the course is expensive"], correct: 1, explanation: "Indirect yes/no question: 'if/whether' + subject + verb (no inversion)." },
  { prompt: "'How often do you exercise?' asks about...", options: ["Method", "Frequency", "Reason", "Time"], correct: 1, explanation: "'How often' asks about frequency (once a week, every day, etc.)." },
  { prompt: "Which is correct? 'She can swim, ___?'", options: ["can she?", "can't she?", "does she?", "isn't she?"], correct: 1, explanation: "With modal verbs, the tag uses the same modal: can → can't." },
  { prompt: "'Let's go, ___?'", options: ["shall we?", "don't we?", "will you?", "isn't it?"], correct: 0, explanation: "'Let's' suggestions take the tag 'shall we?'" },
  { prompt: "'You haven't finished, ___?'", options: ["have you?", "haven't you?", "did you?", "are you?"], correct: 0, explanation: "Negative statement → positive tag." },
  { prompt: "'How far is the station?' asks about...", options: ["Direction", "Distance", "Time", "Method"], correct: 1, explanation: "'How far' asks about distance." },
  { prompt: "'Which book are you reading?' vs 'What kind of book are you reading?' — difference?", options: ["No difference", "'Which' = specific one, 'What kind of' = type/category", "'Which' = type, 'What kind of' = specific", "'Which' is wrong"], correct: 1, explanation: "'Which' asks for a specific item; 'What kind of' asks about the type." },
];

export function QuestionFormationTrainer() {
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
    if (selected === QUESTIONS[current].correct) completeExercise(`questions-${current}`, 10);
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
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Question Formation Complete!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-primary-dark)] mb-1">{score}/{QUESTIONS.length} correct ({pct}%)</p>
        <button onClick={restart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all mt-4">Play Again 🔄</button>
      </div>
    );
  }

  const q = QUESTIONS[current];
  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[var(--color-warning)] uppercase tracking-wider">Question Formation</span>
        <span className="text-xs text-[var(--color-text-disabled)]">{current + 1} / {QUESTIONS.length}</span>
      </div>
      <p className="text-sm text-[var(--color-text-secondary)] mb-4">Practice W-questions, yes/no questions, indirect questions, and more.</p>

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
