"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeCard, PracticeButton } from "@/components/ui/PracticeSurface";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";
import { SpeakerButton } from "@/components/ui/SpeakerButton";

const CASE_QS: { sentence: string; answer: "subject" | "object" | "possessive" | "reflexive"; word: string; options: string[]; en: string }[] = [
  { sentence: "___ is studying for the Cambridge exam.", answer: "subject", word: "She", options: ["She", "Her", "Hers", "Herself"], en: "Subject case: 'She' performs the action." },
  { sentence: "The teacher gave the textbook to ___.", answer: "object", word: "him", options: ["he", "him", "his", "himself"], en: "Object case: 'him' receives the action after preposition 'to'." },
  { sentence: "This is ___ new laptop.", answer: "possessive", word: "their", options: ["they", "them", "their", "themselves"], en: "Possessive adjective: modifies 'laptop'." },
  { sentence: "He prepared the entire presentation by ___.", answer: "reflexive", word: "himself", options: ["him", "his", "he", "himself"], en: "Reflexive pronoun: 'by himself' means alone." },
  { sentence: "___ told me that the meeting was postponed.", answer: "subject", word: "They", options: ["They", "Them", "Their", "Themselves"], en: "Subject case: 'They' performs the action." },
  { sentence: "Can you help ___ with this grammar exercise?", answer: "object", word: "us", options: ["we", "us", "our", "ourselves"], en: "Object case: after the verb 'help'." },
  { sentence: "That coat looks very similar to ___.", answer: "possessive", word: "mine", options: ["me", "my", "mine", "myself"], en: "Possessive pronoun: stands alone without a noun." },
  { sentence: "She taught ___ how to play the piano.", answer: "reflexive", word: "herself", options: ["her", "hers", "she", "herself"], en: "Reflexive: subject and object refer to the same person." },
  { sentence: "___ visited London during the summer holidays.", answer: "subject", word: "We", options: ["We", "Us", "Our", "Ourselves"], en: "Subject case: 'We' is the subject of visited." },
  { sentence: "I will call ___ as soon as I arrive at the airport.", answer: "object", word: "her", options: ["she", "her", "hers", "herself"], en: "Object case: 'her' is the direct object of 'call'." },
  { sentence: "The students forgot ___ homework on the bus.", answer: "possessive", word: "their", options: ["they", "them", "their", "theirs"], en: "Possessive case: 'their homework'." },
  { sentence: "They organized the entire conference all by ___.", answer: "reflexive", word: "themselves", options: ["them", "their", "themselves", "they"], en: "Reflexive case: 'by themselves'." },
  { sentence: "___ wrote this bestselling novel?", answer: "subject", word: "Who", options: ["Who", "Whom", "Whose", "Whoever"], en: "Subject pronoun: 'Who' did the action." },
  { sentence: "To ___ should I address this formal inquiry?", answer: "object", word: "whom", options: ["who", "whom", "whose", "whoever"], en: "Object pronoun: after preposition 'to', formal English uses 'whom'." },
  { sentence: "___ car is parked in front of the entrance?", answer: "possessive", word: "Whose", options: ["Who", "Whom", "Whose", "Who's"], en: "Possessive interrogative: 'Whose' asks about ownership." },
  { sentence: "I cut ___ while chopping vegetables.", answer: "reflexive", word: "myself", options: ["me", "my", "mine", "myself"], en: "Reflexive pronoun: subject 'I' and object 'myself' are identical." },
  { sentence: "Between you and ___, I think the plan will succeed.", answer: "object", word: "me", options: ["I", "me", "my", "mine"], en: "Object case: prepositions take object pronouns ('between you and me')." },
  { sentence: "The company announced ___ new environmental policy.", answer: "possessive", word: "its", options: ["it", "its", "it's", "itself"], en: "Possessive pronoun without apostrophe: 'its policy'." },
];

const CASES = ["subject", "object", "possessive", "reflexive"] as const;
const CASE_NAMES: Record<string, string> = {
  subject: "Subject (I / he / they)",
  object: "Object (me / him / them)",
  possessive: "Possessive (my / their / whose)",
  reflexive: "Reflexive (myself / himself)",
};

export function CaseTrainer() {
  const { completeExercise } = useProgress();
  const { addError } = useErrors();
  const [pool, setPool] = useState<typeof CASE_QS>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => { setPool([...CASE_QS].sort(() => Math.random() - 0.5).slice(0, 12)); }, []);

  const item = pool[current];

  function handleAnswer(choice: string) {
    if (answered || !item) return;
    const isCorrect = choice === item.answer;
    setCorrect(isCorrect);
    setAnswered(true);
    setTotal((t) => t + 1);
    if (isCorrect) { setScore((s) => s + 1); playCorrect(); }
    else {
      playWrong();
      addError({
        question: `Pronoun Case for: "${item.sentence.replace("___", "…")}"`,
        userAnswer: CASE_NAMES[choice] || choice,
        correctAnswer: CASE_NAMES[item.answer],
        explanation: `${item.word} is ${CASE_NAMES[item.answer]}: ${item.en}`,
        source: "exercise",
        sourceId: `case-${current}`
      });
    }
  }

  function next() {
    if (!item) return;
    if (correct) completeExercise(`case-${current}`, 5);
    if (current + 1 >= pool.length) { setDone(true); return; }
    setCurrent((c) => c + 1);
    setAnswered(false);
    setCorrect(false);
  }

  function restart() {
    setPool([...CASE_QS].sort(() => Math.random() - 0.5).slice(0, 12));
    setCurrent(0);
    setScore(0);
    setTotal(0);
    setAnswered(false);
    setCorrect(false);
    setDone(false);
  }

  if (done) {
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    return (
      <div className="text-center py-8">
        <span className="text-5xl block mb-3">{pct >= 80 ? "🏆" : "👍"}</span>
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Pronoun Cases Trainer Done!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-text-link)]">{score}/{total} ({pct}%)</p>
        <PracticeButton onClick={restart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all mt-4">Play Again <LearningArt name="🔄" size={16} /></PracticeButton>
      </div>
    );
  }

  if (!item) return null;

  return (
    <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Pronoun &amp; Noun Cases</span>
        <span className="text-xs text-[var(--color-text-secondary)]">{current + 1}/{pool.length}</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="mb-4">
          <div className="flex items-start gap-2 mb-2">
            <p className="text-base font-medium text-[var(--color-text-primary)]">{item.sentence}</p>
            <SpeakerButton text={item.sentence.replace("___", item.word)} />
          </div>
          <p className="text-xs text-[var(--color-text-secondary)] italic">Choose the correct grammatical case for: <strong className="text-[var(--color-text-primary)]">{item.word}</strong></p>
        </motion.div>
      </AnimatePresence>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {CASES.map((c) => {
          let style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] hover:bg-[var(--color-primary-subtle)] hover:border-[var(--color-primary)]";
          if (answered) {
            if (c === item.answer) style = "bg-[var(--color-success-bg)] text-[var(--color-text-success)] border-[var(--color-success)] ring-2 ring-[var(--color-success)]";
            else if (c !== item.answer && answered) style = "bg-[var(--color-error-bg)] text-[var(--color-text-error)] border-[var(--color-error)]";
          }
          return (
            <PracticeButton key={c} onClick={() => handleAnswer(c)} disabled={answered}
              className={`p-3 rounded-[var(--radius-lg)] border text-sm font-semibold transition-all text-left ${style}`}>
              {CASE_NAMES[c]}
            </PracticeButton>
          );
        })}
      </div>
      {answered && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className={`text-sm font-medium mb-2 ${correct ? "text-[var(--color-text-success)]" : "text-[var(--color-text-error)]"}`}>
            {correct ? "✓ Correct!" : `✗ Correct: "${item.word}" is ${CASE_NAMES[item.answer]}`}
          </p>
          <p className="text-xs text-[var(--color-text-secondary)] mb-3">{item.en}</p>
          <PracticeButton onClick={next} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
            {current + 1 >= pool.length ? "Results" : "Next →"}
          </PracticeButton>
        </motion.div>
      )}
    </PracticeCard>
  );
}
