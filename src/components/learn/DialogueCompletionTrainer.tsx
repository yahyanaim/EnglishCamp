"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";

const DIALOGUES: { context: string; lines: string[]; blankIndex: number; answer: string; options: string[] }[] = [
  { context: "At the Restaurant", lines: ["Good evening, a table for two please.", "Of course. Right this way.", "The menu, please.", "Are you ready to order?", "I'll have the Margherita pizza.", null!, "And I'll have the salad.", "Very good."], blankIndex: 5, answer: "And for you?", options: ["And for you?", "How much is that?", "Is it good?", "Can I pay please?"] },
  { context: "On the Street", lines: ["Excuse me, where is the station?", "Go straight ahead.", null!, "About five minutes.", "Thank you very much!", "You're welcome."], blankIndex: 2, answer: "How far is it?", options: ["How far is it?", "Where is the cinema?", "Is it expensive?", "When does the bus come?"] },
  { context: "At the Hotel", lines: ["Good day, I have a reservation.", "Under what name?", "Smith.", null!, "Yes, here is your key. Room 304.", "Thank you."], blankIndex: 3, answer: "Oh yes, a single room for three nights.", options: ["Oh yes, a single room for three nights.", "The room is too small.", "I would like to pay please.", "Do you have another hotel?"] },
  { context: "At the Doctor's", lines: [null!, "I have a sore throat and a cough.", "How long has this been going on?", "For three days.", "Let's do a check-up.", null!], blankIndex: 0, answer: "Good morning, what seems to be the problem?", options: ["Good morning, what seems to be the problem?", "Sorry, we're closed.", "Please have a seat.", "Call the ambulance!"] },
  { context: "At the Supermarket", lines: ["Do you have fresh bread?", "Yes, over there in the bakery section.", null!, "That will be 2.50 pounds please.", "Here you go.", "Thank you and have a nice day!"], blankIndex: 2, answer: "I'll take four pieces.", options: ["I'll take four pieces.", "Those are expensive.", "Where is the cheese?", "Do you have cake too?"] },
  { context: "At School", lines: ["Mr. Smith, I forgot my homework.", "That's the third time.", null!, "I have a lot to do for other subjects.", "You need to organize yourself better.", "Yes, you're right."], blankIndex: 2, answer: "I'm sorry, I didn't have time.", options: ["I'm sorry, I didn't have time.", "Homework is boring.", "I don't feel like it.", "Can you help me?"] },
  { context: "At the Party", lines: ["Hi, I'm Lisa.", "Nice to meet you, I'm Tom.", "Do you come to parties like this often?", null!, "I study medicine.", "Oh, interesting!"], blankIndex: 3, answer: "Not very often. What do you do for work?", options: ["Not very often. What do you do for work?", "No, the music is too loud.", "I want to go home.", "Is that your car?"] },
  { context: "On the Train", lines: ["Is this seat free?", null!, "Great, thanks. Are you going to London too?", "Yes, I'm visiting my family.", "How long is the journey?", "About four hours."], blankIndex: 1, answer: "Yes, of course, please take a seat.", options: ["Yes, of course, please take a seat.", "No, it's taken.", "London is far away.", "I don't have a ticket."] },
  { context: "At a Job Interview", lines: ["Tell me about yourself.", "I studied business and worked at a bank for three years.", null!, "I want to make a career change.", "And why do you want to work for us?", "Because your company is very innovative."], blankIndex: 2, answer: "And why did you apply?", options: ["And why did you apply?", "That's not important.", "I don't like banks.", "Can we finish?"] },
  { context: "At the Café", lines: ["What can I get for you?", "A cappuccino and a piece of cheesecake, please.", null!, "Here you go.", "Thank you.", "Enjoy!"], blankIndex: 2, answer: "Coming right up. That's 6.50 pounds.", options: ["Coming right up. That's 6.50 pounds.", "Sorry, we don't have cake.", "There's no coffee.", "You have to wait outside."] },
];

export function DialogueCompletionTrainer() {
  const { completeExercise } = useProgress();
  const { addError } = useErrors();
  const [pool, setPool] = useState(() => [...DIALOGUES].sort(() => Math.random() - 0.5).slice(0, 10));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);

  const current = pool[index];
  if (!current) return null;

  function handleSelect(opt: string) {
    if (selected) return;
    setSelected(opt);
    if (opt === current.answer) {
      setScore((s) => s + 1);
      playCorrect();
      completeExercise(`dialogue-${index}`, 10);
    } else {
      playWrong();
      addError({ question: `Dialogue: ${current.context}`, userAnswer: opt, correctAnswer: current.answer, explanation: `The correct line was: "${current.answer}"`, source: "dialogue", sourceId: `dialogue-${index}` });
    }
  }

  function handleNext() {
    if (index + 1 >= pool.length) { setDone(true); return; }
    setIndex((i) => i + 1);
    setSelected(null);
  }

  function handleRestart() {
    const shuffled = [...DIALOGUES].sort(() => Math.random() - 0.5).slice(0, 10);
    setPool(shuffled);
    setIndex(0);
    setSelected(null);
    setDone(false);
    setScore(0);
  }

  if (done) {
    const pct = pool.length > 0 ? Math.round((score / pool.length) * 100) : 0;
    return (
      <div className="text-center py-8">
        <span className="text-5xl block mb-3">{pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "💪"}</span>
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Dialogue Practice Complete!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-primary-dark)] mb-1">{score}/{pool.length} correct ({pct}%)</p>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">{pct >= 80 ? "Excellent dialogue skills!" : "Keep practicing!"}</p>
        <button onClick={handleRestart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">Play Again 🔄</button>
      </div>
    );
  }

  const displayLines = current.lines.map((line, i) =>
    i === current.blankIndex && selected ? selected : i === current.blankIndex ? null : line
  );

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[var(--color-warning)] uppercase tracking-wider">Dialogue Completion</span>
        <span className="text-xs text-[var(--color-text-disabled)]">{index + 1}/{pool.length}</span>
      </div>

      <div className="mb-3">
        <span className="text-xs font-medium text-[var(--color-text-disabled)] bg-[var(--color-surface-alt)] px-2 py-1 rounded">📍 {current.context}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-1 mb-5 font-mono text-sm bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] p-4 border border-[var(--color-border-default)]">
          {displayLines.map((line, i) => (
            <p key={i} className={`${i === current.blankIndex ? "text-[var(--color-primary-dark)] font-bold" : "text-[var(--color-text-primary)]"} ${line === null ? "opacity-40" : ""}`}>
              {line === null ? "_____________________________" : line}
            </p>
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {current.options.map((opt) => {
          let style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:bg-[var(--color-primary-subtle)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary-dark)]";
          if (selected) {
            if (opt === current.answer) style = "bg-[var(--color-success)] text-white border-[var(--color-success)] ring-2 ring-[var(--color-success)]";
            else if (opt === selected) style = "bg-[var(--color-error)] text-white border-[var(--color-error)]";
            else style = "opacity-50";
          }
          return (
            <button key={opt} onClick={() => handleSelect(opt)} disabled={!!selected} className={`text-sm font-medium px-4 py-3 rounded-[var(--radius-lg)] border-2 transition-all duration-200 text-left ${style}`}>
              {opt}
            </button>
          );
        })}
      </div>

      {selected && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className={`text-sm font-medium mb-3 ${selected === current.answer ? "text-[var(--color-success)]" : "text-[var(--color-error)]"}`}>
            {selected === current.answer ? "✓ Correct! +10 XP" : `✗ Correct: "${current.answer}"`}
          </p>
          <button onClick={handleNext} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
            {index + 1 >= pool.length ? "See Results" : "Next →"}
          </button>
        </motion.div>
      )}

      <div className="flex justify-center gap-1 mt-4">
        {pool.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-[var(--radius-pill)] ${i < index ? "bg-[var(--color-primary)]" : i === index ? "bg-[var(--color-primary)]" : "bg-[var(--color-border-default)]"}`} />
        ))}
      </div>
    </div>
  );
}
