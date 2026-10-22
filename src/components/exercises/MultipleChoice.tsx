"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { Button } from "@/components/ui/Button";
import { playCorrect, playWrong } from "@/lib/audio";
import { CheckCircle, XCircle, BookOpen } from "lucide-react";

export interface MultipleChoiceData {
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
  xpReward: number;
  id: string;
}

function getGrammarNote(question: string, options: string[], correctIndex: number): string | null {
  const correct = options[correctIndex]?.toLowerCase() ?? "";
  const q = question.toLowerCase();

  if (q.includes("subjunctive") || q.includes("subjunctive")) {
    return "The subjunctive mood expresses wishes, demands, or hypothetical situations. 'If I were...' is a common subjunctive form.";
  }
  if (q.includes("passive")) {
    return "Passive voice shifts focus from who does the action to the action itself. Formed with 'be' + past participle.";
  }
  if (q.includes("preposition") || q.includes("possessive") || q.includes("indirect object") || q.includes("direct object")) {
    return "Prepositions show relationships between words. Some are followed by objects (to, for, with, by, at, in, on).";
  }
  if (q.includes("article") || q.includes("a ") || q.includes("an ") || q.includes("the ")) {
    return "English articles: 'a/an' for non-specific nouns, 'the' for specific nouns. No article for general plurals and uncountable nouns.";
  }
  if (q.includes("means") || q.includes("meaning")) {
    return `"${options[correctIndex]}" is the correct meaning. Building vocabulary through context is one of the most effective learning strategies.`;
  }
  if (q.includes("difference") || q.includes("key diff")) {
    return "Understanding nuance between similar words is an advanced skill. Pay attention to register (formal/informal), context, and collocations.";
  }
  if (q.includes("modal") || q.includes("modal verb")) {
    return "Modal verbs: can (ability), must (obligation), may (permission), should (recommendation), will (intention), would (politeness).";
  }
  if (q.includes("comparative") || q.includes("superlative")) {
    return "Comparative = adj + -er + than. Superlative = the + adj + -est. Some are irregular (good → better → best, bad → worse → worst).";
  }
  if (q.includes("subordinate") || q.includes("word order") || q.includes("clause")) {
    return "In English, word order is Subject + Verb + Object. Subordinate clauses follow the same order but begin with a conjunction.";
  }
  if (q.includes("future")) {
    return "Future: 'will' + base verb (spontaneous) or 'going to' + base verb (planned). Future perfect: will have + past participle.";
  }
  if (q.includes("past") || q.includes("present perfect") || q.includes("simple past")) {
    return "Present Perfect = have/has + past participle. Simple Past = -ed ending (regular) or irregular form.";
  }
  return null;
}

export function MultipleChoice({ data }: { data: MultipleChoiceData }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const { completeExercise } = useProgress();
  const { addError } = useErrors();

  const isCorrect = checked && selected === data.correct;
  const grammarNote = getGrammarNote(data.question, data.options, data.correct);

  function handleSelect(index: number) {
    if (checked) return;
    setSelected(index);
  }

  function check() {
    if (selected === null) return;
    const correct = selected === data.correct;
    setChecked(true);
    if (correct) {
      playCorrect();
      completeExercise(data.id, data.xpReward);
    } else {
      playWrong();
      addError({
        question: data.question,
        userAnswer: data.options[selected],
        correctAnswer: data.options[data.correct],
        explanation: data.explanation ?? `The correct answer is: "${data.options[data.correct]}"`,
        source: "exercise",
        sourceId: data.id,
      });
    }
  }

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-5 border-2 border-[var(--color-border-default)] space-y-4" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-start gap-3">
        <span className="text-xl mt-0.5">🤔</span>
        <p className="font-body text-base font-medium text-[var(--color-text-primary)]">{data.question}</p>
      </div>

      <div className="space-y-2">
        {data.options.map((option, i) => {
          let stateClass = "bg-[var(--color-surface)] border-[var(--color-border-default)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-alt)] cursor-pointer";
          if (checked) {
            if (i === data.correct) {
              stateClass = "bg-[var(--color-success-bg)] border-[var(--color-success)] text-[var(--color-success-dark)]";
            } else if (i === selected && i !== data.correct) {
              stateClass = "bg-[var(--color-error-bg)] border-[var(--color-error)] text-[var(--color-error)]";
            } else {
              stateClass = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] text-[var(--color-text-disabled)]";
            }
          } else if (i === selected) {
            stateClass = "border-[var(--color-primary)] bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)]";
          }

          return (
            <button key={i} onClick={() => handleSelect(i)}
              className={`w-full text-left p-4 rounded-[var(--radius-lg)] font-body text-sm transition-all duration-150 border-2 ${stateClass}`}
              style={!checked && i === selected ? { boxShadow: "0 2px 0 var(--color-primary)" } : checked && i === data.correct ? { boxShadow: "0 2px 0 var(--color-success)" } : checked && i === selected && i !== data.correct ? { boxShadow: "0 2px 0 var(--color-error)" } : { boxShadow: "0 2px 0 var(--color-border-default)" }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-[var(--radius-circle)] flex items-center justify-center font-display font-extrabold text-xs border-2 shrink-0 ${
                    checked && i === data.correct
                      ? "bg-[var(--color-success)] text-white border-[var(--color-success)]"
                      : checked && i === selected && i !== data.correct
                        ? "bg-[var(--color-error)] text-white border-[var(--color-error)]"
                        : i === selected
                          ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                          : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] border-[var(--color-border-default)]"
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span>{option}</span>
                </div>
                {checked && i === data.correct && <CheckCircle className="w-5 h-5 text-[var(--color-success)] shrink-0" />}
                {checked && i === selected && i !== data.correct && <XCircle className="w-5 h-5 text-[var(--color-error)] shrink-0" />}
              </div>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {checked && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            {isCorrect ? (
              <div className="flex items-center gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-success-bg)] text-[var(--color-success-dark)] border-2 border-[var(--color-success)]" style={{ boxShadow: "0 2px 0 var(--color-success)" }}>
                <CheckCircle className="w-5 h-5 shrink-0 text-[var(--color-success)]" />
                <div>
                  <p className="font-display font-extrabold">Correct! +{data.xpReward} XP</p>
                  <p className="font-body text-sm text-[var(--color-text-primary)] mt-0.5">{data.options[data.correct]}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-error-bg)] text-[var(--color-error)] border-2 border-[var(--color-error)]" style={{ boxShadow: "0 2px 0 var(--color-error)" }}>
                  <XCircle className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-error)]" />
                  <div>
                    <p className="font-display font-extrabold">Not quite</p>
                    <p className="font-body text-sm mt-1">
                      Your choice: <span className="line-through text-[var(--color-error)]">{data.options[selected!]}</span>
                    </p>
                    <p className="font-body text-sm">
                      Correct answer: <span className="font-display font-bold text-[var(--color-success-dark)]">{data.options[data.correct]}</span>
                    </p>
                    {data.explanation && (
                      <p className="font-body text-sm mt-2 text-[var(--color-text-secondary)]">{data.explanation}</p>
                    )}
                  </div>
                </div>

                {grammarNote && (
                  <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-warning-bg)] text-[var(--color-warning-dark)] border-2 border-[var(--color-warning)]" style={{ boxShadow: "0 2px 0 var(--color-warning)" }}>
                    <BookOpen className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-warning)]" />
                    <div>
                      <p className="font-display font-extrabold text-sm">Grammar Tip</p>
                      <p className="font-body text-sm mt-1">{grammarNote}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!checked && selected !== null && <Button onClick={check} size="sm">Check ✓</Button>}
    </div>
  );
}
