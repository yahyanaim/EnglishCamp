"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeCard, PracticeButton } from "@/components/ui/PracticeSurface";
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
  { prompt: "Yesterday I ___ to the cinema. (go)", options: ["goed", "went", "gone", "go"], correct: 1, explanation: "go → went (irregular past tense)" },
  { prompt: "He ___ for a long time yesterday. (work)", options: ["worked", "workt", "works", "was work"], correct: 0, explanation: "work → worked (regular past tense: verb + -ed)" },
  { prompt: "After I ___ breakfast, I drove to work. (have)", options: ["have", "had", "was having", "have had"], correct: 1, explanation: "have → had (irregular past tense)" },
  { prompt: "We ___ on vacation last week. (be)", options: ["were", "had", "was", "been"], correct: 0, explanation: "be → was/were (irregular: we were)" },
  { prompt: "She ___ a cake yesterday. (bake)", options: ["baked", "bakte", "bakes", "was bake"], correct: 0, explanation: "bake → baked (regular past: bake + -d)" },
  { prompt: "Before he ___ to work, he had eaten breakfast. (drive)", options: ["drives", "drove", "drived", "is driving"], correct: 1, explanation: "drive → drove (irregular past tense)" },
  { prompt: "___ you at the cinema yesterday?", options: ["Was", "Were", "Are", "Did"], correct: 1, explanation: "be in past: you → were" },
  { prompt: "He ___ up at 8 o'clock yesterday. (get)", options: ["gets", "gotted", "got", "get"], correct: 2, explanation: "get → got (irregular past tense)" },
  { prompt: "After the film ___ , we went home. (end)", options: ["ended", "had ended", "ends", "has ended"], correct: 0, explanation: "end → ended (regular past, or past perfect 'had ended')"},
  { prompt: "I ___ already read the book before the film came.", options: ["have", "had", "was", "did"], correct: 1, explanation: "Past perfect 'had + read' shows the earlier action" },
  { prompt: "Once upon a time there ___ a king. (be)", options: ["was", "had", "is", "has"], correct: 0, explanation: "'Once upon a time there was...' — narrative past with was" },
  { prompt: "The police ___ yesterday that the thief was caught. (report)", options: ["reports", "reported", "report", "was report"], correct: 1, explanation: "report → reported (regular past tense)" },
  { prompt: "He ___ speak German very well. (can - past)", options: ["could", "can", "canned", "was can"], correct: 0, explanation: "can → could (irregular modal in past)" },
  { prompt: "I ___ work for a long time yesterday. (must - past)", options: ["musted", "had to", "must", "was must"], correct: 1, explanation: "must → had to (past form of must)" },
  { prompt: "By the time the doctor came, the patient ___ already ___ for a long time. (wait)", options: ["has...waited", "had...waited", "was...waiting", "waited"], correct: 1, explanation: "Past perfect 'had waited' for action completed before another past action" },
];

export function NarrativePastTrainer() {
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
    if (selected === QUESTIONS[current].correct) completeExercise(`narrative-past-${current}`, 10);
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
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Narrative Past Complete!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-text-link)] mb-1">{score}/{QUESTIONS.length} correct ({pct}%)</p>
        <PracticeButton onClick={restart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all mt-4">Play Again <LearningArt name="🔄" size={16} /></PracticeButton>
      </div>
    );
  }

  const q = QUESTIONS[current];
  return (
    <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[var(--color-text-warning)] uppercase tracking-wider">Narrative Past (Simple Past / Past Perfect)</span>
        <span className="text-xs text-[var(--color-text-secondary)]">{current + 1} / {QUESTIONS.length}</span>
      </div>
      <p className="text-sm text-[var(--color-text-secondary)] mb-4">Choose the correct past tense form.</p>

      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
          <p className="text-lg font-medium text-[var(--color-text-primary)] mb-1">{q.prompt}</p>

          <div className="space-y-2 mb-4">
            {q.options.map((opt, i) => {
              let cls = "bg-[var(--color-surface)] border-[var(--color-border-default)] hover:border-[var(--color-primary)] text-[var(--color-text-primary)]";
              if (answered && i === q.correct) cls = "bg-[var(--color-success-bg)] text-[var(--color-text-success)] border-emerald-400";
              else if (answered && i === selected && i !== q.correct) cls = "bg-[var(--color-error-bg)] text-[var(--color-text-error)] border-red-300";
              else if (answered) cls = "opacity-60";
              return (
                <PracticeButton key={i} onClick={() => handleSelect(i)}
                  className={`w-full text-left px-4 py-3 rounded-[var(--radius-lg)] border text-sm font-medium transition-all ${cls}`}
                >
                  {opt}
                </PracticeButton>
              );
            })}
          </div>
          {answered && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-[var(--radius-lg)] bg-[var(--color-surface-alt)] border border-[var(--color-border-default)]">
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{q.explanation}</p>
              <PracticeButton onClick={next} className="mt-3 text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
                {current + 1 >= QUESTIONS.length ? "See Results" : "Next →"}
              </PracticeButton>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </PracticeCard>
  );
}
