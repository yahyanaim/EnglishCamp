"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";
import { Lightbulb, BookOpen } from "lucide-react";

type ClozeItem = { title: string; en: string; text: string[]; blanks: { index: number; answer: string; options: string[] }[] };

function getClozeTip(blank: ClozeItem["blanks"][0]): { tip: string; suggest: string } {
  const a = blank.answer.toLowerCase();
  if (a.includes("have") || a.includes("has")) return { tip: "Present Perfect = have/has + past participle. Regular: add -ed. Irregular: change form (go → gone, eat → eaten).", suggest: "Practice with the Present Perfect tense lesson." };
  if (a.includes("was") || a.includes("were")) return { tip: "Simple Past of 'to be': I/he/she/it was, you/we/they were. Used for past states and descriptions.", suggest: "Review the Simple Past of 'to be' in the conjugation trainer." };
  if (a.includes("went") || a.includes("ate") || a.includes("saw") || a.includes("took")) return { tip: "Irregular past tense verbs don't follow the -ed pattern. Memorize common irregulars: go→went, eat→ate, see→saw, take→took.", suggest: "Practice irregular verbs with the Past Tense trainer in Practice Hub." };
  if (a.includes("ing")) return { tip: "Present Continuous = am/is/are + verb-ing. Use for actions happening now or temporary situations.", suggest: "Review the Present Continuous tense lesson." };
  if (a.includes("will")) return { tip: "Future with 'will': use for spontaneous decisions, promises, and predictions. Structure: will + base verb.", suggest: "Practice Future tense in the Tenses lesson." };
  if (a.includes("to ")) return { tip: "Infinitives with 'to': use after certain verbs (want, need, hope, plan) and adjectives (easy, difficult, important).", suggest: "Review the Infinitive usage lesson." };
  if (a.endsWith("s") && !a.endsWith("ing")) return { tip: "Simple Present: he/she/it takes -s. I/you/we/they take the base form. Use for habits, facts, and routines.", suggest: "Review Simple Present conjugation." };
  return { tip: `"${blank.answer}" fits here based on the context. Pay attention to subject-verb agreement and tense.`, suggest: "Try more Cloze Text exercises and review the grammar lesson for this topic." };
}

const ITEMS: ClozeItem[] = [
  { title: "My Day", en: "My Day", text: ["I", "up at 7 AM every morning.", "Then I", "breakfast", "and", "to school."], blanks: [{ index: 1, answer: "wake", options: ["wake", "wakes", "woke", "waking"] }, { index: 4, answer: "go", options: ["go", "goes", "went", "going"] }] },
  { title: "At the Restaurant", en: "At the Restaurant", text: ["Yesterday I", "to a restaurant with friends.", "We", "pizza and salad", "."], blanks: [{ index: 1, answer: "went", options: ["went", "go", "gone", "going"] }, { index: 4, answer: "ordered", options: ["ordered", "order", "ordering", "have ordered"] }] },
  { title: "My Family", en: "My Family", text: ["My family", "four people.", "My father", "as an engineer", "."], blanks: [{ index: 1, answer: "has", options: ["has", "have", "is", "are"] }, { index: 4, answer: "works", options: ["works", "work", "working", "worked"] }] },
  { title: "The Weather", en: "The Weather", text: ["Today the sun", ".", "It", "very warm and", "the sky is blue."], blanks: [{ index: 1, answer: "is shining", options: ["is shining", "shines", "shone", "shine"] }, { index: 3, answer: "is", options: ["is", "am", "are", "be"] }] },
  { title: "On Vacation", en: "On Vacation", text: ["Last summer we", "to Italy", ".", "We", "on the beach and", "a lot of ice cream."], blanks: [{ index: 1, answer: "went", options: ["went", "go", "gone", "going"] }, { index: 4, answer: "ate", options: ["ate", "eat", "eating", "eaten"] }] },
  { title: "Shopping", en: "Shopping", text: ["I", "shopping and", "a lot of money", "."], blanks: [{ index: 1, answer: "went", options: ["went", "go", "goes", "going"] }, { index: 3, answer: "spent", options: ["spent", "spend", "spending", "have spent"] }] },
  { title: "Sickness", en: "Sickness", text: ["Yesterday I", "not feeling well", ".", "I", "a headache and a fever."], blanks: [{ index: 1, answer: "was", options: ["was", "am", "were", "been"] }, { index: 4, answer: "had", options: ["had", "have", "has", "having"] }] },
  { title: "Hobby", en: "Hobby", text: ["I", "soccer very much.", "Last week I", "a goal", "."], blanks: [{ index: 1, answer: "like", options: ["like", "likes", "liked", "liking"] }, { index: 4, answer: "scored", options: ["scored", "score", "scoring", "have scored"] }] },
];

export function ClozeTextTrainer() {
  const { completeExercise } = useProgress();
  const { addError } = useErrors();
  const [pool] = useState(() => [...ITEMS].sort(() => Math.random() - 0.5).slice(0, 5));
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const current = pool[index];
  if (!current && !done) return null;

  function handleSelect(blankIndex: number, value: string) {
    if (showResults) return;
    setAnswers((a) => ({ ...a, [blankIndex]: value }));
  }

  function handleCheck() {
    let correct = 0;
    for (const b of current.blanks) {
      if (answers[b.index] === b.answer) correct++;
      else {
        playWrong();
        addError({ question: `Cloze: "${current.title}" word ${b.index + 1}`, userAnswer: answers[b.index] || "", correctAnswer: b.answer, explanation: `The correct word was "${b.answer}"`, source: "cloze", sourceId: `cloze-${index}-${b.index}` });
      }
    }
    if (correct === current.blanks.length) { playCorrect(); setScore((s) => s + correct); completeExercise(`cloze-${index}`, 10 * correct); }
    setShowResults(true);
  }

  function handleNext() {
    if (index + 1 >= pool.length) { setDone(true); return; }
    setIndex((i) => i + 1); setAnswers({}); setShowResults(false);
  }

  function handleRestart() { setIndex(0); setAnswers({}); setShowResults(false); setScore(0); setDone(false); }

  if (done) {
    return (
      <div className="text-center py-8">
        <span className="text-5xl block mb-3">📖</span>
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Cloze Reading Complete!</h3>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">Great reading practice!</p>
        <button onClick={handleRestart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">Play Again 🔄</button>
      </div>
    );
  }

  const allFilled = current.blanks.every((b) => answers[b.index]);

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[var(--color-success)] uppercase tracking-wider">Cloze Text</span>
        <span className="text-xs text-[var(--color-text-disabled)]">{index + 1}/{pool.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          <div className="flex items-center gap-2 mb-4">
            <h4 className="text-lg font-display font-extrabold text-[var(--color-text-primary)]">{current.title}</h4>
            <span className="text-xs text-[var(--color-text-disabled)] bg-[var(--color-surface-alt)] px-2 py-0.5 rounded-[var(--radius-pill)]">{current.en}</span>
          </div>
          <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-lg)] p-5 border border-[var(--color-border-default)] leading-8 text-base text-[var(--color-text-primary)] mb-6">
            {current.text.map((word, i) => {
              const blank = current.blanks.find((b) => b.index === i);
              if (blank) {
                return (
                  <span key={i} className="inline-block mx-0.5">
                    <select
                      value={answers[blank.index] || ""}
                      onChange={(e) => handleSelect(blank.index, e.target.value)}
                      className={`text-sm font-mono font-semibold px-2 py-0.5 rounded-[var(--radius-md)] border-2 outline-none transition-all ${
                        showResults
                          ? answers[blank.index] === blank.answer ? "bg-[var(--color-success)] text-white border-[var(--color-success)]" : "bg-[var(--color-error)] text-white border-[var(--color-error)]"
                          : "bg-[var(--color-surface)] border-[var(--color-border-default)] text-[var(--color-text-primary)] focus:border-emerald-400"
                      }`}
                    >
                      <option value="" disabled>___</option>
                      {blank.options.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </span>
                );
              }
              return <span key={i}>{word} </span>;
            })}
          </div>

          {!showResults ? (
            <div className="text-center">
              <button onClick={handleCheck} disabled={!allFilled} className={`text-sm font-medium px-6 py-2.5 rounded-[var(--radius-lg)] transition-all ${allFilled ? "bg-[var(--color-primary)] text-white hover:bg-brand-600" : "bg-[var(--color-surface-alt)] text-[var(--color-text-disabled)] cursor-not-allowed"}`}>
                Check Answers
              </button>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-center mb-4">
                <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">{score} / {current.blanks.length} correct</p>
              </div>

              <div className="space-y-3 mb-4">
                {current.blanks.filter((b) => answers[b.index] !== b.answer).map((b) => {
                  const ct = getClozeTip(b);
                  return (
                    <div key={b.index}>
                      <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-warning)] text-white ring-1 ring-[var(--color-warning)]">
                        <Lightbulb className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-warning)]" />
                        <div>
                          <p className="font-semibold text-sm">Tip — Word {b.index + 1}</p>
                          <p className="text-sm mt-1">{ct.tip}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-info)] text-white ring-1 ring-[var(--color-info)] mt-2">
                        <BookOpen className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-info)]" />
                        <div>
                          <p className="font-semibold text-sm">Suggestion</p>
                          <p className="text-sm mt-1">{ct.suggest}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center">
                <button onClick={handleNext} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
                  {index + 1 >= pool.length ? "See Results" : "Next Text →"}
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center gap-1 mt-4">
        {pool.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-[var(--radius-pill)] ${i < index ? "bg-emerald-300" : i === index ? "bg-emerald-500" : "bg-[var(--color-border-default)]"}`} />
        ))}
      </div>
    </div>
  );
}
