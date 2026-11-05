"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeCard, PracticeButton } from "@/components/ui/PracticeSurface";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";
import { questionWordAnswers } from "@/lib/practiceQuestions";

type Item = { purpose:string; question: string; correct: string; options: string[]; explanation: string };

const ITEMS: Item[] = [
  { purpose: 'Ask for a person’s identity.', question: "___ are you?", correct: "Who", options: ["Who", "What", "Where", "When"], explanation: "Who = asks about a person" },
  { purpose: 'Ask about the action in progress.', question: "___ are you doing?", correct: "What", options: ["What", "Who", "Where", "When"], explanation: "What = asks about things/actions" },
  { purpose: 'Ask for the location of someone’s home.', question: "___ do you live?", correct: "Where", options: ["Where", "Why", "How", "When"], explanation: "Where = asks about location" },
  { purpose: 'Ask about a destination.', question: "___ are you going?", correct: "Where", options: ["Where", "Why", "How", "When"], explanation: "Where = asks about direction/destination" },
  { purpose: 'Ask about someone’s place of origin.', question: "___ are you from?", correct: "Where", options: ["Where", "Why", "How", "When"], explanation: "Where...from = asks about origin" },
  { purpose: 'Ask about the arrival time.', question: "___ will you come?", correct: "When", options: ["When", "How", "Why", "Where"], explanation: "When = asks about time" },
  { purpose: 'Ask about the method of spelling a name.', question: "___ do you spell your name?", correct: "How", options: ["How", "What", "Who", "Where"], explanation: "How = asks about manner/way" },
  { purpose: 'Ask for the reason for learning English.', question: "___ do you learn English?", correct: "Why", options: ["Why", "When", "How", "Where"], explanation: "Why = asks about reason" },
  { purpose: 'Ask for the reason for an action.', question: "___ did you do that?", correct: "Why", options: ["Why", "When", "How", "Where"], explanation: "Why = asks for a reason" },
  { purpose: 'Ask about someone’s age.', question: "___ old are you?", correct: "How", options: ["How", "What", "Which", "Where"], explanation: "How + adjective = asks about degree" },
  { purpose: 'Use the question word for a limited choice of books.', question: "___ book are you reading?", correct: "Which", options: ["Which", "What", "Who", "How"], explanation: "Which = asks for a specific choice from a group" },
  { purpose: 'Choose a particular person from a group.', question: "___ one is your brother?", correct: "Which", options: ["Which", "Who", "What", "How"], explanation: "Which = asks for a specific person/thing" },
  { purpose: 'Ask about a person seen; either the everyday or formal object form is acceptable.', question: "___ did you see?", correct: "Who", options: ["Who", "Whom", "Whose", "What"], explanation: "Who = asks about the object of the sentence" },
  { purpose: 'Ask about the person receiving an item.', question: "___ did you give it to?", correct: "Who", options: ["Who", "Whom", "Whose", "What"], explanation: "Who...to = asks about the recipient" },
  { purpose: 'Ask about frequency.', question: "___ often do you go to the cinema?", correct: "How", options: ["How", "When", "What", "Where"], explanation: "How often = asks about frequency" },
];

export function FragewörterTrainer() {
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
    if (questionWordAnswers(current).includes(opt)) { setScore((s) => s + 1); playCorrect(); completeExercise(`frage-${index}`, 5); }
    else { playWrong(); addError({ question: `Question word: "${current.question}"`, userAnswer: opt, correctAnswer: current.correct, explanation: current.explanation, source: "frage", sourceId: `frage-${index}` }); }
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
      <div data-practice-surface="result" className="practice-card text-center">
        <LearningArt name="trophy" size={30} className="camp-result-art"/>
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Question Words Complete!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-text-link)] mb-1">{score}/{total} correct ({pct}%)</p>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">{pct >= 80 ? "Excellent question skills!" : "Keep practicing!"}</p>
        <PracticeButton onClick={handleRestart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">Play Again <LearningArt name="🔄" size={16} /></PracticeButton>
      </div>
    );
  }

  return (
    <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[var(--camp-control-ink)] uppercase tracking-wider">Question Words</span>
        <span className="text-xs text-[var(--color-text-secondary)]">{index + 1}/{pool.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center mb-5">
          <p className="text-sm text-[var(--color-text-secondary)] mb-2">{current.purpose}</p>
          <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] p-4 border border-[var(--color-border-default)]">
            <p className="text-lg font-display font-extrabold text-[var(--color-text-primary)]">
              <span className="text-[var(--color-text-link)] font-bold">___</span> {current.question.slice(current.question.indexOf(" ") > 0 ? current.question.indexOf(" ") : 0)}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-wrap justify-center gap-3 mb-4">
        {current.options.map((opt) => {
          let style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:bg-[var(--camp-purple-soft)] hover:border-[var(--color-primary-light)] hover:text-[var(--camp-control-ink)]";
          if (selected) {
            if (questionWordAnswers(current).includes(opt)) style = "bg-[var(--color-success-bg)] text-[var(--color-text-success)] border-[var(--color-success)] ring-2 ring-[var(--color-success)]";
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
          <p className={`text-sm font-medium mb-1 ${questionWordAnswers(current).includes(selected!) ? "text-[var(--color-text-success)]" : "text-[var(--color-text-error)]"}`}>
            {questionWordAnswers(current).includes(selected!) ? "✓ Correct! +5 XP" : `✗ Correct: ${current.correct}`}
          </p>
          <p className="text-xs text-[var(--color-text-secondary)] mb-3">{current.explanation}</p>
          <PracticeButton onClick={handleNext} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
            {index + 1 >= pool.length ? "See Results" : "Next →"}
          </PracticeButton>
        </motion.div>
      )}

      <div className="flex justify-center gap-1 mt-4">
        {pool.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-[var(--radius-pill)] ${i < index ? "bg-[var(--camp-purple)]" : i === index ? "bg-[var(--camp-purple)]" : "bg-[var(--color-border-default)]"}`} />
        ))}
      </div>
    </PracticeCard>
  );
}
