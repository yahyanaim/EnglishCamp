"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";

type GenitiveItem = { sentence: string; blank: string; options: string[]; explanation: string };

const ITEMS: GenitiveItem[] = [
  { sentence: "That is ___ car.", blank: "my father's", options: ["my father's", "my father", "fathers", "the father"], explanation: "Possessive with 's: 'my father's car' = the car of my father" },
  { sentence: "The roof ___ is red.", blank: "of the house", options: ["of the house", "the house", "houses", "the houses"], explanation: "'of' for possession: 'the roof of the house'" },
  { sentence: "___ name is Anna.", blank: "The neighbor's", options: ["The neighbor's", "The neighbor", "Neighbors", "A neighbor"], explanation: "Possessive with 's: 'The neighbor's daughter' = the daughter of the neighbor" },
  { sentence: "That is ___ dog.", blank: "the child's", options: ["the child's", "the child", "the children", "childrens"], explanation: "Possessive with 's: 'the child's dog' = the dog of the child" },
  { sentence: "The books ___ are new.", blank: "of the students", options: ["of the students", "the students", "students", "student's"], explanation: "'of' for plural possession: 'the books of the students'" },
  { sentence: "___ room is very big.", blank: "My sister's", options: ["My sister's", "My sister", "Sisters", "A sister"], explanation: "Possessive with 's: 'my sister's room' = the room of my sister" },
  { sentence: "The opinion ___ is important.", blank: "of the doctor", options: ["of the doctor", "the doctor", "doctors", "a doctor"], explanation: "'of' for possession: 'the opinion of the doctor'" },
  { sentence: "This is the beginning ___", blank: "of the story", options: ["of the story", "the story", "the stories", "a story"], explanation: "'of' for abstract possession: 'the beginning of the story'" },
  { sentence: "The work ___ is hard.", blank: "of the teacher", options: ["of the teacher", "the teacher", "teachers", "a teacher"], explanation: "'of' for possession: 'the work of the teacher'" },
  { sentence: "___ cooking is great.", blank: "My girlfriend's", options: ["My girlfriend's", "My girlfriend", "Girlfriends", "A girlfriend"], explanation: "Possessive with 's: 'my girlfriend's cooking' = the cooking of my girlfriend" },
  { sentence: "The end ___ was sad.", blank: "of the film", options: ["of the film", "the film", "films", "a film"], explanation: "'of' for abstract possession: 'the end of the film'" },
  { sentence: "The windows ___ are open.", blank: "of the room", options: ["of the room", "the room", "rooms", "a room"], explanation: "'of' for possession: 'the windows of the room'" },
  { sentence: "I like ___ color.", blank: "the car's", options: ["the car's", "the car", "cars", "a car"], explanation: "Possessive with 's: 'the car's color' = the color of the car" },
  { sentence: "___ university is old.", blank: "The city's", options: ["The city's", "The city", "Cities", "A city"], explanation: "Possessive with 's: 'the city's university' = the university of the city" },
  { sentence: "That is ___ idea.", blank: "my friend's", options: ["my friend's", "my friend", "friends", "a friend"], explanation: "Possessive with 's: 'my friend's idea' = the idea of my friend" },
  { sentence: "The pages ___ are yellow.", blank: "of the book", options: ["of the book", "the book", "books", "a book"], explanation: "'of' for possession: 'the pages of the book'" },
  { sentence: "___ mother is a teacher.", blank: "Sarah's", options: ["Sarah's", "Sarah", "Sarahs", "A Sarah"], explanation: "Possessive with 's for names: 'Sarah's mother' = the mother of Sarah" },
  { sentence: "The garden ___ is beautiful.", blank: "of the house", options: ["of the house", "the house", "houses", "a house"], explanation: "'of' for possession: 'the garden of the house'" },
];

export function GenitiveTrainer() {
  const { completeExercise } = useProgress();
  const { addError } = useErrors();
  const [pool, setPool] = useState<GenitiveItem[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setPool([...ITEMS].sort(() => Math.random() - 0.5).slice(0, 12));
  }, []);

  const current = pool[index];
  if (!current && !done) return null;

  function handleSelect(opt: string) {
    if (selected || !current) return;
    setSelected(opt);
    setTotal((t) => t + 1);
    if (opt === current.blank) {
      setScore((s) => s + 1);
      playCorrect();
      completeExercise(`genitive-${index}`, 10);
    } else {
      playWrong();
      addError({ question: `Genitive: "${current.sentence}"`, userAnswer: opt, correctAnswer: current.blank, explanation: current.explanation, source: "genitive", sourceId: `genitive-${index}` });
    }
  }

  function handleNext() {
    if (!current) return;
    if (index + 1 >= pool.length) { setDone(true); return; }
    setIndex((i) => i + 1);
    setSelected(null);
  }

  function handleRestart() {
    setPool([...ITEMS].sort(() => Math.random() - 0.5).slice(0, 12));
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
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Genitive Practice Complete!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-primary-dark)] mb-1">{score}/{total} correct ({pct}%)</p>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">{pct >= 80 ? "Excellent genitive skills!" : "Keep practicing!"}</p>
        <button onClick={handleRestart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">Play Again 🔄</button>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-purple-500 uppercase tracking-wider">Genitive Trainer</span>
        <span className="text-xs text-[var(--color-text-disabled)]">{index + 1}/{pool.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center mb-5">
          <p className="text-sm text-[var(--color-text-secondary)] mb-2">Fill in the genitive form</p>
          <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] p-4 border border-[var(--color-border-default)]">
            <p className="text-lg font-display font-extrabold text-[var(--color-text-primary)]">
              {current.sentence} <span className="text-[var(--color-primary-dark)] font-bold">___</span>
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {current.options.map((opt) => {
          let style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700";
          if (selected) {
            if (opt === current.blank) style = "bg-[var(--color-success)] text-white border-[var(--color-success)] ring-2 ring-[var(--color-success)]";
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
          <p className={`text-sm font-medium mb-3 ${selected === current.blank ? "text-[var(--color-success)]" : "text-[var(--color-error)]"}`}>
            {selected === current.blank ? "✓ Correct! +10 XP" : `✗ Correct: ${current.blank}`}
          </p>
          <p className="text-xs text-[var(--color-text-disabled)] mb-3">{current.explanation}</p>
          <button onClick={handleNext} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
            {index + 1 >= pool.length ? "See Results" : "Next →"}
          </button>
        </motion.div>
      )}

      <div className="flex justify-center gap-1 mt-4">
        {pool.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-[var(--radius-pill)] ${i < index ? "bg-purple-300" : i === index ? "bg-purple-500" : "bg-[var(--color-border-default)]"}`} />
        ))}
      </div>
    </div>
  );
}
