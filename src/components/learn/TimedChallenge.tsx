"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";

interface ChallengeQ {
  type: "article" | "past" | "plural" | "preposition";
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

function generateQuestions(): ChallengeQ[] {
  const pool: ChallengeQ[] = [
    { type: "article", question: "___ apple", options: ["an", "a", "the a", "some"], correct: 0, explanation: "\"an\" before vowel sounds: an apple" },
    { type: "article", question: "___ book", options: ["a", "an", "the a", "some"], correct: 0, explanation: "\"a\" before consonant sounds: a book" },
    { type: "article", question: "___ honest person", options: ["an", "a", "the an", "some"], correct: 0, explanation: "\"an\" before silent h: an honest person" },
    { type: "article", question: "___ university", options: ["a", "an", "the a", "some"], correct: 0, explanation: "\"a\" before /juː/ sound: a university" },
    { type: "article", question: "___ hour", options: ["an", "a", "the an", "some"], correct: 0, explanation: "\"an\" before silent h: an hour" },
    { type: "article", question: "___ elephant", options: ["an", "a", "the an", "some"], correct: 0, explanation: "\"an\" before vowel sounds: an elephant" },
    { type: "past", question: "Yesterday I ___ to school. (go)", options: ["went", "goed", "gone", "goes"], correct: 0, explanation: "go → went (irregular past tense)" },
    { type: "past", question: "She ___ the book. (read - past)", options: ["read", "readed", "reads", "reading"], correct: 0, explanation: "read → read (same spelling, different pronunciation)" },
    { type: "past", question: "They ___ at home. (be - past)", options: ["were", "was", "are", "been"], correct: 0, explanation: "are → were (plural past of be)" },
    { type: "past", question: "He ___ breakfast. (eat)", options: ["ate", "eated", "eats", "eating"], correct: 0, explanation: "eat → ate (irregular past)" },
    { type: "plural", question: "one cat → two ___", options: ["cats", "caties", "cates", "cat"], correct: 0, explanation: "Regular plural: add -s: cat → cats" },
    { type: "plural", question: "one child → two ___", options: ["children", "childs", "childes", "childrens"], correct: 0, explanation: "Irregular plural: child → children" },
    { type: "plural", question: "one woman → two ___", options: ["women", "womans", "womens", "woman"], correct: 0, explanation: "Irregular plural: woman → women" },
    { type: "plural", question: "one tooth → two ___", options: ["teeth", "tooths", "teeths", "toothen"], correct: 0, explanation: "Irregular plural: tooth → teeth" },
    { type: "plural", question: "one foot → two ___", options: ["feet", "foots", "feets", "footes"], correct: 0, explanation: "Irregular plural: foot → feet" },
    { type: "preposition", question: "I'm interested ___ art.", options: ["in", "on", "at", "for"], correct: 0, explanation: "interested in + noun/gerund" },
    { type: "preposition", question: "She's good ___ math.", options: ["at", "in", "on", "with"], correct: 0, explanation: "good at + skill/subject" },
    { type: "preposition", question: "He's afraid ___ spiders.", options: ["of", "from", "about", "with"], correct: 0, explanation: "afraid of + noun" },
    { type: "preposition", question: "I'll see you ___ Monday.", options: ["on", "in", "at", "for"], correct: 0, explanation: "on + day of the week" },
    { type: "preposition", question: "The meeting is ___ 3 pm.", options: ["at", "in", "on", "by"], correct: 0, explanation: "at + specific time" },
  ];
  return pool.sort(() => Math.random() - 0.5);
}

const DURATION = 60;

export function TimedChallenge() {
  const { completeExercise } = useProgress();
  const { addError } = useErrors();
  const [questions, setQuestions] = useState<ChallengeQ[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (!started || finished || timeLeft <= 0) return;
    const t = setInterval(() => { setTimeLeft((v) => { if (v <= 1) { setFinished(true); return 0; } return v - 1; }); }, 1000);
    return () => clearInterval(t);
  }, [started, finished, timeLeft]);

  const current = questions[index];
  if (!current && !finished) {
    return (
      <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 shadow-sm text-center py-10" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
        <span className="text-5xl block mb-3">⚡</span>
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-2">Timed Challenge</h3>
        <p className="text-sm text-[var(--color-text-secondary)] mb-2">Answer as many questions as you can in {DURATION} seconds!</p>
        <p className="text-xs text-[var(--color-text-disabled)] mb-6">Articles, past tense, plurals, prepositions</p>
        <button onClick={() => { setQuestions(generateQuestions()); setStarted(true); }} className="text-sm font-medium bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-[var(--radius-lg)] hover:bg-brand-600 transition-all">Start Challenge 🏁</button>
      </div>
    );
  }

  function handleSelect(optionIndex: number) {
    if (showResult || !current) return;
    setShowResult(true);
    setTotal((t) => t + 1);
    if (optionIndex === current.correct) {
      setScore((s) => s + 1);
      playCorrect();
      completeExercise(`timed-${index}`, 5);
    } else {
      playWrong();
      addError({ question: current.question, userAnswer: current.options[optionIndex], correctAnswer: current.options[current.correct], explanation: current.explanation, source: "timed", sourceId: `timed-${index}` });
    }
  }

  function handleNext() {
    if (finished || index + 1 >= questions.length) { setFinished(true); return; }
    setIndex((i) => i + 1); setShowResult(false);
  }

  if (finished) {
    return (
      <div className="text-center py-8">
        <span className="text-5xl block mb-3">{score >= 10 ? "🏆" : score >= 5 ? "👍" : "💪"}</span>
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Time&rsquo;s Up!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-primary-dark)] mb-1">{score}/{total} correct</p>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">{score >= 10 ? "Rapid-fire master!" : score >= 5 ? "Good speed!" : "Speed comes with practice!"}</p>
        <button onClick={() => { setQuestions(generateQuestions()); setIndex(0); setScore(0); setTotal(0); setTimeLeft(DURATION); setStarted(true); setFinished(false); setShowResult(false); }} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">Play Again 🔄</button>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[#FFD700] uppercase tracking-wider">Timed Challenge</span>
        <div className="flex items-center gap-3">
          <span className={`text-sm font-mono font-bold ${timeLeft <= 10 ? "text-[var(--color-error)]" : "text-[var(--color-text-secondary)]"}`}>{timeLeft}s</span>
          <span className="text-xs text-[var(--color-text-disabled)]">Score: {score}/{total}</span>
        </div>
      </div>

      <div className="text-center mb-5">
        <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] p-5 border border-[var(--color-border-default)]">
          <p className="text-lg font-display font-extrabold text-[var(--color-text-primary)] mb-4">{current.question}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {current.options.map((opt, i) => {
              let style = "bg-[var(--color-surface)] border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:bg-yellow-50 hover:border-yellow-300 hover:text-yellow-700";
              if (showResult) {
                if (i === current.correct) style = "bg-[var(--color-success)] text-white border-[var(--color-success)] ring-2 ring-[var(--color-success)]";
                else if (i === current.correct) style = "bg-[var(--color-success)] text-white border-[var(--color-success)]";
                else style = "opacity-40";
              }
              return (
                <button key={i} onClick={() => handleSelect(i)} disabled={showResult} className={`px-4 py-3 text-sm font-medium rounded-[var(--radius-lg)] border-2 transition-all duration-200 ${style}`}>
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {showResult && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <p className="text-xs text-[var(--color-text-disabled)] mb-3">{current.explanation}</p>
          <button onClick={handleNext} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
            {index + 1 >= questions.length ? "See Results" : "Next →"}
          </button>
        </motion.div>
      )}
    </div>
  );
}
