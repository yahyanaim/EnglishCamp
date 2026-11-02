"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeCard, PracticeButton } from "@/components/ui/PracticeSurface";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";
import { Lightbulb, BookOpen } from "lucide-react";

type ModalEntry = { verb: string; en: string; sentence: string; answer: string };

const MODALS: ModalEntry[] = [
  { verb: "can", en: "can", sentence: "I ____ speak English.", answer: "can" },
  { verb: "can", en: "can", sentence: "She ____ sing very well.", answer: "can" },
  { verb: "can", en: "can", sentence: "We ____ come tomorrow.", answer: "can" },
  { verb: "must", en: "must", sentence: "He ____ go now.", answer: "must" },
  { verb: "must", en: "must", sentence: "You ____ study hard.", answer: "must" },
  { verb: "may", en: "may", sentence: "____ I come in?", answer: "May" },
  { verb: "may", en: "may", sentence: "You ____ leave now.", answer: "may" },
  { verb: "should", en: "should", sentence: "You ____ drink more water.", answer: "should" },
  { verb: "should", en: "should", sentence: "We ____ arrive at 8 o'clock.", answer: "should" },
  { verb: "will", en: "will", sentence: "She ____ travel to London.", answer: "will" },
  { verb: "will", en: "will", sentence: "What ____ you eat?", answer: "will" },
  { verb: "would", en: "would", sentence: "I ____ like some tea.", answer: "would" },
  { verb: "would", en: "would", sentence: "____ you like to play tennis?", answer: "Would" },
  { verb: "can", en: "can", sentence: "He ____ cook very well.", answer: "can" },
  { verb: "must", en: "must", sentence: "____ you go to work tomorrow?", answer: "Must" },
  { verb: "will", en: "will", sentence: "We ____ buy a house.", answer: "will" },
];

function getModalTip(verb: string, answer: string): { tip: string; suggest: string } {
  const v = verb.toLowerCase();
  if (v === "can") return { tip: "'can' (ability): I can, you can, he/she/it can, we can, they can. It never changes form — no he/she/it -s!", suggest: "Practice 'can' with the Modal Verbs trainer in Practice Hub." };
  if (v === "must") return { tip: "'must' (obligation): I must, you must, he/she must, we must, they must. Never changes form. Expresses strong necessity.", suggest: "Review 'must' in the Modal Verbs lesson." };
  if (v === "may") return { tip: "'may' (permission/possibility): I may, you may, he/she may, we may, they may. Used for polite requests and possibility.", suggest: "Practice 'may' with modal verb exercises in Practice Hub." };
  if (v === "should") return { tip: "'should' (advice): I should, you should, he/she should, we should, they should. Never changes form. Used for giving advice.", suggest: "Review 'should' in the Modal Verbs lesson." };
  if (v === "will") return { tip: "'will' (future): I will, you will, he/she will, we will, they will. Never changes form. Used for future tense and promises.", suggest: "Practice 'will' with the Future Tense trainer." };
  if (v === "would") return { tip: "'would' (polite/conditional): I would, you would, he/she would, we would, they would. Used for polite requests: 'Would you like...?'", suggest: "Review 'would' in the Modal Verbs lesson." };
  return { tip: `Modal verbs are followed by the base form of the main verb: "I can speak English." No 'to' after modals!`, suggest: "Review all modal verbs (can, must, may, should, will, would) in the Modal Verbs lesson." };
}

export function ModalVerbsTrainer() {
  const { completeExercise } = useProgress(); const { addError } = useErrors();
  const [pool, setPool] = useState<ModalEntry[]>([]);
  const [current, setCurrent] = useState(0); const [score, setScore] = useState(0); const [total, setTotal] = useState(0);
  const [input, setInput] = useState(""); const [answered, setAnswered] = useState(false); const [isCorrect, setIsCorrect] = useState(false); const [done, setDone] = useState(false);

  useEffect(() => { setPool([...MODALS].sort(() => Math.random() - 0.5).slice(0, 10)); }, []);

  const item = pool[current];

  function handleSubmit() {
    if (answered || !item) return;
    const correct = input.trim().toLowerCase() === item.answer.toLowerCase();
    setIsCorrect(correct); setAnswered(true); setTotal((t) => t + 1);
    if (correct) { setScore((s) => s + 1); playCorrect(); }
    else { playWrong(); addError({ question: `Modal verb: "${item.sentence}"`, userAnswer: input.trim(), correctAnswer: item.answer, explanation: `Correct: "${item.answer}" (${item.verb} = ${item.en})`, source: "exercise", sourceId: `modal-${current}` }); }
  }

  function next() {
    if (!item) return; if (isCorrect) completeExercise(`modal-${current}`, 5);
    if (current + 1 >= pool.length) { setDone(true); return; }
    setCurrent((c) => c + 1); setInput(""); setAnswered(false); setIsCorrect(false);
  }

  function restart() { setPool([...MODALS].sort(() => Math.random() - 0.5).slice(0, 10)); setCurrent(0); setScore(0); setTotal(0); setInput(""); setAnswered(false); setIsCorrect(false); setDone(false); }

  if (done) return <div data-practice-surface="result" className="practice-card text-center py-8"><LearningArt name="🏆" size={36} className=" block mb-3" /><h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Modal Verbs Done!</h3><p className="text-lg font-display font-extrabold text-[var(--color-text-link)]">{score}/{total}</p><PracticeButton onClick={restart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all mt-4">Play Again <LearningArt name="🔄" size={16} /></PracticeButton></div>;
  if (!item) return null;

  return (
    <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-cyan-600 uppercase tracking-wider">Modal Verbs</span>
        <span className="text-xs text-[var(--color-text-secondary)]">{current + 1}/{pool.length}</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="mb-4">
          <p className="text-xs text-[var(--color-text-secondary)] mb-1">Fill in the correct modal verb form ({item.verb} — {item.en}):</p>
          <p className="text-lg font-display font-extrabold text-[var(--color-text-primary)] font-mono">{item.sentence.replace("____", "___")}</p>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !answered && handleSubmit()} disabled={answered}
            placeholder="type here..."
            className={`w-full mt-2 px-3 py-2 rounded-[var(--radius-lg)] border font-mono text-center text-sm bg-[var(--color-surface-alt)] outline-none transition-all ${
              answered ? (isCorrect ? "border-[var(--color-success)] bg-emerald-500 text-white font-bold" : "border-red-300 bg-red-500 text-white font-bold") : "border-[var(--color-border-default)] text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-brand-100"
            }`}
          />
        </motion.div>
      </AnimatePresence>
      {!answered && <PracticeButton onClick={handleSubmit} disabled={!input.trim()} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all disabled:opacity-50">Check ✓</PracticeButton>}
      {answered && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          {isCorrect ? (
            <p className="text-sm font-medium text-[var(--color-text-success)] text-center">✓ Correct!</p>
          ) : (
            <div className="space-y-2">
              <p className="text-sm font-medium text-[var(--color-text-error)]">✗ Correct: {'\u201C'}{item.answer}{'\u201D'} ({item.verb} = {item.en})</p>

              <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-warning-bg)] text-[var(--color-text-warning)] ring-1 ring-[var(--color-warning)]">
                <LearningArt name="Lightbulb" size={20} className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-text-warning)]" />
                <div>
                  <p className="font-semibold text-sm">Astuce (Tip)</p>
                  <p className="text-sm mt-1">{getModalTip(item.verb, item.answer).tip}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-info-bg)] text-[var(--color-text-info)] ring-1 ring-[var(--color-info)]">
                <LearningArt name="BookOpen" size={20} className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-text-info)]" />
                <div>
                  <p className="font-semibold text-sm">Suggestion</p>
                  <p className="text-sm mt-1">{getModalTip(item.verb, item.answer).suggest}</p>
                </div>
              </div>
            </div>
          )}
          <div className="text-center mt-3">
            <PracticeButton onClick={next} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
              {current + 1 >= pool.length ? "Results" : "Next →"}
            </PracticeButton>
          </div>
        </motion.div>
      )}
    </PracticeCard>
  );
}
