"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";

type ImperativeQuestion = {
  category: "Affirmative" | "Negative (Don't)" | "Inclusive (Let's)" | "Polite (Please)";
  prompt: string;
  verb: string;
  meaning: string;
  correct: string;
  options: string[];
  explanation: string;
};

const IMPERATIVE_QUESTIONS: ImperativeQuestion[] = [
  {
    category: "Affirmative",
    prompt: "___ carefully to the instructions!",
    verb: "listen",
    meaning: "to listen",
    correct: "Listen",
    options: ["Listen", "Listens", "Listening", "To listen"],
    explanation: "Affirmative imperative uses the bare base form of the verb without 'to' or '-s'.",
  },
  {
    category: "Affirmative",
    prompt: "___ quiet, the baby is asleep!",
    verb: "be",
    meaning: "to be",
    correct: "Be",
    options: ["Be", "Are", "Is", "Being"],
    explanation: "For the imperative of 'to be', use the base form 'Be' (never 'Are' or 'Is').",
  },
  {
    category: "Negative (Don't)",
    prompt: "___ that hot stove!",
    verb: "touch",
    meaning: "not to touch",
    correct: "Don't touch",
    options: ["Don't touch", "Not touch", "No touch", "Doesn't touch"],
    explanation: "Negative imperatives in English are formed with 'Don't' + base verb.",
  },
  {
    category: "Negative (Don't)",
    prompt: "___ to lock the front door!",
    verb: "forget",
    meaning: "not to forget",
    correct: "Don't forget",
    options: ["Don't forget", "Not forget", "Don't forgetting", "Forget not"],
    explanation: "Negative imperative always uses 'Don't' followed by the base infinitive without 'to'.",
  },
  {
    category: "Negative (Don't)",
    prompt: "___ late for your job interview!",
    verb: "be",
    meaning: "not to be late",
    correct: "Don't be",
    options: ["Don't be", "Aren't", "Not be", "Don't being"],
    explanation: "Negative imperative with 'be' is 'Don't be' (never 'Aren't').",
  },
  {
    category: "Inclusive (Let's)",
    prompt: "___ a break and grab some coffee.",
    verb: "take",
    meaning: "let us take",
    correct: "Let's take",
    options: ["Let's take", "Let's to take", "Let take", "We take"],
    explanation: "'Let's' (let us) is used for inclusive 1st-person imperatives and takes the bare verb.",
  },
  {
    category: "Inclusive (Let's)",
    prompt: "___ any more time on this issue.",
    verb: "waste",
    meaning: "let us not waste",
    correct: "Let's not waste",
    options: ["Let's not waste", "Let's don't waste", "Let not to waste", "Don't let's waste"],
    explanation: "The negative inclusive imperative is 'Let's not' + base verb.",
  },
  {
    category: "Polite (Please)",
    prompt: "Please ___ a seat in the waiting area.",
    verb: "have",
    meaning: "please take/have",
    correct: "have",
    options: ["have", "having", "to have", "had"],
    explanation: "After 'please', use the base verb form for polite commands and instructions.",
  },
  {
    category: "Affirmative",
    prompt: "___ off your shoes before entering.",
    verb: "take",
    meaning: "to remove",
    correct: "Take",
    options: ["Take", "Takes", "Taking", "To take"],
    explanation: "Commands and instructions always start with the base form: 'Take off'.",
  },
  {
    category: "Affirmative",
    prompt: "___ your seatbelt before departure.",
    verb: "fasten",
    meaning: "to buckle/fasten",
    correct: "Fasten",
    options: ["Fasten", "Fastening", "Fastens", "To fasten"],
    explanation: "Use the base form 'Fasten' for direct safety commands.",
  },
  {
    category: "Negative (Don't)",
    prompt: "___ , everything will be fine!",
    verb: "worry",
    meaning: "not to worry",
    correct: "Don't worry",
    options: ["Don't worry", "Not worry", "Don't worrying", "No worry"],
    explanation: "Form negative commands with 'Don't' + base verb: 'Don't worry!'.",
  },
  {
    category: "Inclusive (Let's)",
    prompt: "___ to the new Italian restaurant tonight.",
    verb: "go",
    meaning: "let us go",
    correct: "Let's go",
    options: ["Let's go", "Let's to go", "Let's going", "We go"],
    explanation: "'Let's go' is the standard inclusive command suggestion.",
  },
  {
    category: "Polite (Please)",
    prompt: "Please ___ this application form in blue ink.",
    verb: "fill out",
    meaning: "to complete",
    correct: "fill out",
    options: ["fill out", "filling out", "to fill out", "filled out"],
    explanation: "'Please' softens a command but the verb remains in base infinitive form.",
  },
  {
    category: "Negative (Don't)",
    prompt: "___ up now, you are almost at the finish line!",
    verb: "give",
    meaning: "not to quit",
    correct: "Don't give",
    options: ["Don't give", "No give", "Not give", "Don't giving"],
    explanation: "The negative command is 'Don't give up!'.",
  },
  {
    category: "Affirmative",
    prompt: "___ me what happened yesterday.",
    verb: "tell",
    meaning: "to explain/tell",
    correct: "Tell",
    options: ["Tell", "Telling", "Tells", "To tell"],
    explanation: "Direct instructions begin with base verb 'Tell'.",
  },
];

export function ImperativeTrainer() {
  const { completeExercise } = useProgress();
  const { addError } = useErrors();
  const [pool, setPool] = useState<ImperativeQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const shuffled = [...IMPERATIVE_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 10);
    setPool(shuffled);
  }, []);

  const current = pool[index];
  if (!current && !done) return null;

  function handleSelect(choice: string) {
    if (selected || !current) return;
    setSelected(choice);
    setTotal((t) => t + 1);
    const isCorrect = choice === current.correct;
    if (isCorrect) {
      setScore((s) => s + 1);
      playCorrect();
      completeExercise(`imperative-${current.verb}-${index}`, 5);
    } else {
      playWrong();
      addError({
        question: `Imperative: ${current.prompt} (verb: ${current.verb})`,
        userAnswer: choice,
        correctAnswer: current.correct,
        explanation: current.explanation,
        source: "imperative",
        sourceId: `imperative-${current.verb}-${index}`,
      });
    }
  }

  function handleNext() {
    if (!current) return;
    if (index + 1 >= pool.length) {
      setDone(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  }

  function handleRestart() {
    const shuffled = [...IMPERATIVE_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 10);
    setPool(shuffled);
    setIndex(0);
    setSelected(null);
    setScore(0);
    setTotal(0);
    setDone(false);
  }

  if (done) {
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    return (
      <div className="text-center py-8">
        <span className="text-5xl block mb-3">{pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "💪"}</span>
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">
          Imperatives Practice Complete!
        </h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-primary-dark)] mb-1">
          {score}/{total} correct ({pct}%)
        </p>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">
          {pct >= 80 ? "Outstanding mastery of English commands & requests!" : "Keep practicing English imperatives!"}
        </p>
        <button
          onClick={handleRestart}
          className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all"
        >
          Practice Again 🔄
        </button>
      </div>
    );
  }

  return (
    <div
      className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 shadow-sm"
      style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-cyan-600 uppercase tracking-wider">
          English Imperative Trainer • {current.category}
        </span>
        <span className="text-xs text-[var(--color-text-disabled)]">
          {index + 1}/{pool.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="text-center mb-5"
        >
          <p className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
            Verb: <span className="text-[var(--color-primary-dark)] font-mono">{current.verb}</span> ({current.meaning})
          </p>
          <p className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1 leading-snug">
            {current.prompt}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {current.options.map((opt) => {
          let style =
            "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:bg-cyan-50 hover:border-cyan-300 hover:text-cyan-700";
          if (selected) {
            if (opt === current.correct) {
              style = "bg-[var(--color-success)] text-white border-[var(--color-success)] ring-2 ring-[var(--color-success)]";
            } else if (opt === selected) {
              style = "bg-[var(--color-error)] text-white border-[var(--color-error)]";
            } else {
              style = "opacity-40";
            }
          }
          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              disabled={!!selected}
              className={`text-sm font-medium px-4 py-3 rounded-[var(--radius-lg)] border-2 transition-all duration-200 ${style}`}
            >
              <span className="font-mono">{opt}</span>
            </button>
          );
        })}
      </div>

      {selected && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p
            className={`text-sm font-medium mb-1 ${
              selected === current.correct ? "text-[var(--color-success)]" : "text-[var(--color-error)]"
            }`}
          >
            {selected === current.correct ? "✓ Correct! +5 XP" : `✗ Correct: ${current.correct}`}
          </p>
          <p className="text-xs text-[var(--color-text-secondary)] mb-3">{current.explanation}</p>
          <button
            onClick={handleNext}
            className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all"
          >
            {index + 1 >= pool.length ? "See Results" : "Next →"}
          </button>
        </motion.div>
      )}

      <div className="flex justify-center gap-1 mt-4">
        {pool.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-[var(--radius-pill)] ${
              i < index ? "bg-cyan-300" : i === index ? "bg-cyan-500" : "bg-[var(--color-border-default)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
