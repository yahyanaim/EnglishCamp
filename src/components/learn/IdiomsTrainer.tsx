"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeCard, PracticeButton } from "@/components/ui/PracticeSurface";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";
import { SpeakerButton } from "@/components/ui/SpeakerButton";

type Item = { idiom: string; meaning: string; literal: string; options: string[]; correct: string; explanation: string };

const ITEMS: Item[] = [
  { idiom: "Break a leg!", literal: "Literally means 'break a leg'", meaning: "Good luck!", correct: "Good luck!", options: ["Good luck!", "Get injured!", "Be careful!", "Run fast!"], explanation: "'Break a leg' is a common way to wish someone good luck before a performance." },
  { idiom: "It's not my cup of tea.", literal: "It's not my tea", meaning: "I don't like it", correct: "I don't like it", options: ["I don't like it", "I don't want tea", "It's not mine", "I'm thirsty"], explanation: "'Not my cup of tea' means something you don't enjoy or prefer." },
  { idiom: "Hit the nail on the head.", literal: "To hit the nail exactly", meaning: "To be exactly right", correct: "To be exactly right", options: ["To be exactly right", "To build something", "To make a mistake", "To be clumsy"], explanation: "'Hit the nail on the head' means to be absolutely correct about something." },
  { idiom: "Piece of cake.", literal: "A slice of cake", meaning: "Very easy", correct: "Very easy", options: ["Very easy", "Very delicious", "Very sweet", "Very small"], explanation: "'Piece of cake' means something is extremely easy to do." },
  { idiom: "Once in a blue moon.", literal: "When the moon is blue", meaning: "Very rarely", correct: "Very rarely", options: ["Very rarely", "Every month", "At night", "Once a week"], explanation: "'Once in a blue moon' means something happens very rarely." },
  { idiom: "The ball is in your court.", literal: "The ball is on your side", meaning: "It's your turn to decide", correct: "It's your turn to decide", options: ["It's your turn to decide", "You have the ball", "You're playing tennis", "You're in trouble"], explanation: "'The ball is in your court' means it's your turn to take action or decide." },
  { idiom: "Don't judge a book by its cover.", literal: "Don't judge by the outside", meaning: "Don't judge by appearance", correct: "Don't judge by appearance", options: ["Don't judge by appearance", "Don't read books", "Don't cover books", "Don't buy books"], explanation: "This means you shouldn't judge something or someone based on how they look." },
  { idiom: "Bite the bullet.", literal: "To bite a bullet", meaning: "To do something difficult", correct: "To do something difficult", options: ["To do something difficult", "To eat something hard", "To go to the dentist", "To be brave"], explanation: "'Bite the bullet' means to face a difficult situation with courage." },
  { idiom: "Let the cat out of the bag.", literal: "To free a cat from a bag", meaning: "To reveal a secret", correct: "To reveal a secret", options: ["To reveal a secret", "To save a cat", "To go shopping", "To be kind to animals"], explanation: "'Let the cat out of the bag' means to accidentally tell a secret." },
  { idiom: "The early bird catches the worm.", literal: "The early bird gets the worm", meaning: "Arrive early to succeed", correct: "Arrive early to succeed", options: ["Arrive early to succeed", "Birds eat worms", "Morning is best", "Wake up early"], explanation: "This means that people who act early have the best chance of success." },
  { idiom: "When in Rome, do as the Romans do.", literal: "Follow local customs", meaning: "Adapt to local customs", correct: "Adapt to local customs", options: ["Adapt to local customs", "Travel to Rome", "Meet Romans", "Eat Italian food"], explanation: "This means you should follow the customs of the place you are visiting." },
  { idiom: "Don't count your chickens before they hatch.", literal: "Don't count eggs before they become chickens", meaning: "Don't assume success", correct: "Don't assume success", options: ["Don't assume success", "Don't raise chickens", "Don't eat eggs", "Don't count numbers"], explanation: "This means don't assume something will happen before it actually does." },
  { idiom: "Kill two birds with one stone.", literal: "Hit two birds with one stone", meaning: "Solve two problems at once", correct: "Solve two problems at once", options: ["Solve two problems at once", "Be very efficient", "Hunt birds", "Multitask poorly"], explanation: "This means to accomplish two things with a single action." },
  { idiom: "Under the weather.", literal: "Beneath the weather", meaning: "Feeling sick", correct: "Feeling sick", options: ["Feeling sick", "Feeling cold", "Feeling wet", "Feeling happy"], explanation: "'Under the weather' means to feel ill or unwell." },
  { idiom: "Spill the beans.", literal: "To drop the beans", meaning: "To tell a secret", correct: "To tell a secret", options: ["To tell a secret", "To make a mess", "To cook dinner", "To be clumsy"], explanation: "'Spill the beans' means to reveal secret information." },
  { idiom: "Burn the midnight oil.", literal: "To burn oil at midnight", meaning: "To work late at night", correct: "To work late at night", options: ["To work late at night", "To start a fire", "To save energy", "To go to bed early"], explanation: "'Burn the midnight oil' means to work or study late into the night." },
  { idiom: "A blessing in disguise.", literal: "A hidden blessing", meaning: "A good thing that seemed bad", correct: "A good thing that seemed bad", options: ["A good thing that seemed bad", "A magical event", "A hidden treasure", "A surprise gift"], explanation: "This means something that seems bad at first but turns out to be good." },
  { idiom: "Better late than never.", literal: "Better to arrive late than not at all", meaning: "It's okay to be late sometimes", correct: "It's okay to be late sometimes", options: ["It's okay to be late sometimes", "Always be on time", "Never be late", "Late is better"], explanation: "This means it's better to do something late than to never do it at all." },
  { idiom: "Actions speak louder than words.", literal: "What you do is more important", meaning: "What you do matters more than what you say", correct: "What you do matters more than what you say", options: ["What you do matters more than what you say", "Talking is important", "Running is healthy", "Words are powerful"], explanation: "This means what people actually do shows their true intentions better than what they say." },
  { idiom: "Practice makes perfect.", literal: "Doing something many times makes you good at it", meaning: "Regular practice leads to skill", correct: "Regular practice leads to skill", options: ["Regular practice leads to skill", "Nobody is perfect", "Practice is boring", "Perfection is impossible"], explanation: "This means that doing something repeatedly is the best way to get good at it." },
];

export function IdiomsTrainer() {
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
    if (opt === current.correct) { setScore((s) => s + 1); playCorrect(); completeExercise(`idiom-${index}`, 10); }
    else { playWrong(); addError({ question: `Idiom: "${current.idiom}"`, userAnswer: opt, correctAnswer: current.correct, explanation: current.explanation, source: "idiom", sourceId: `idiom-${index}` }); }
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
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Idioms Complete!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-text-link)] mb-1">{score}/{total} correct ({pct}%)</p>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">{pct >= 80 ? "You think like a native!" : "Keep practicing idioms!"}</p>
        <PracticeButton onClick={handleRestart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">Play Again <LearningArt name="🔄" size={16} /></PracticeButton>
      </div>
    );
  }

  return (
    <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-fuchsia-500 uppercase tracking-wider">English Idioms</span>
        <span className="text-xs text-[var(--color-text-secondary)]">{index + 1}/{pool.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center mb-5">
          <div className="flex items-center justify-center gap-2 mb-1">
            <LearningArt name="🗣️" size={24} className="" />
            <SpeakerButton text={current.idiom} />
          </div>
          <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-lg)] p-5 border border-[var(--color-border-default)]">
            <p className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">{current.idiom}</p>
            <p className="text-xs text-[var(--color-text-secondary)] italic">Literal: {current.literal}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <p className="text-xs text-[var(--color-text-secondary)] text-center mb-3">What does this idiom mean?</p>
      <div className="grid grid-cols-1 gap-2 mb-4">
        {current.options.map((opt) => {
          let style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:bg-fuchsia-50 hover:border-fuchsia-300 hover:text-fuchsia-700";
          if (selected) {
            if (opt === current.correct) style = "bg-[var(--color-success-bg)] text-[var(--color-text-success)] border-[var(--color-success)] ring-2 ring-[var(--color-success)]";
            else if (opt === selected) style = "bg-[var(--color-error-bg)] text-[var(--color-text-error)] border-[var(--color-error)]";
            else style = "opacity-40";
          }
          return (
            <PracticeButton key={opt} onClick={() => handleSelect(opt)} disabled={!!selected} className={`text-sm font-medium px-4 py-3 rounded-[var(--radius-lg)] border transition-all duration-200 text-left ${style}`}>
              {opt}
            </PracticeButton>
          );
        })}
      </div>

      {selected && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className={`text-sm font-medium mb-1 ${selected === current.correct ? "text-[var(--color-text-success)]" : "text-[var(--color-text-error)]"}`}>
            {selected === current.correct ? "✓ Correct! +10 XP" : `✗ Correct: ${current.correct}`}
          </p>
          <p className="text-xs text-[var(--color-text-secondary)] mb-3">{current.explanation}</p>
          <PracticeButton onClick={handleNext} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
            {index + 1 >= pool.length ? "See Results" : "Next →"}
          </PracticeButton>
        </motion.div>
      )}

      <div className="flex justify-center gap-1 mt-4">
        {pool.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-[var(--radius-pill)] ${i < index ? "bg-fuchsia-300" : i === index ? "bg-fuchsia-500" : "bg-[var(--color-border-default)]"}`} />
        ))}
      </div>
    </PracticeCard>
  );
}
