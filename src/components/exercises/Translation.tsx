"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { Button } from "@/components/ui/Button";
import { playCorrect, playWrong } from "@/lib/audio";
import { CheckCircle, XCircle, BookOpen, ArrowRight } from "lucide-react";

export interface TranslationData {
  de: string;
  en: string;
  xpReward: number;
  id: string;
}

function getGrammarNote(de: string, en: string): string | null {
  const enLower = en.toLowerCase();
  if (enLower.includes("will ") || enLower.includes("shall ")) {
    return "Future tense: 'will' + base verb. Expresses future actions, predictions, or spontaneous decisions.";
  }
  if (enLower.includes("have ") || enLower.includes("has ") || enLower.includes("had ")) {
    if (enLower.match(/\b(been|gone|done|seen|taken|made|said|eaten|written|known)\b/)) {
      return "Present Perfect tense = have/has + past participle. Connects past actions to the present.";
    }
  }
  if (enLower.includes("am ") || enLower.includes("is ") || enLower.includes("are ")) {
    if (enLower.match(/\b(going|coming|leaving|arriving|returning)\b/)) {
      return "Present continuous for future plans: am/is/are + verb-ing. Used for planned future events.";
    }
  }
  if (enLower.includes("must") || enLower.includes("can") || enLower.includes("may") || enLower.includes("should") || enLower.includes("will") || enLower.includes("would")) {
    return "Modal verbs are followed by the base form of the verb. They express ability, permission, obligation, or possibility.";
  }
  if (enLower.includes("would") || enLower.includes("could") || enLower.includes("should")) {
    return "Conditional: would/could/should + base verb. Used for polite requests, hypothetical situations, or unreal conditions.";
  }
  if (enLower.includes("is ") && enLower.match(/\b(being|made|done|seen|built|written|known)\b/)) {
    return "Passive voice: be + past participle. Focuses on the action rather than who performs it.";
  }
  if (enLower.includes("was ") && enLower.match(/\b(being|made|done|seen|built|written|known)\b/)) {
    return "Past passive: was/were + past participle. 'It was done by...'";
  }
  if (enLower.includes("in order to") || enLower.includes("so as to")) {
    return "The 'in order to' / 'so as to' construction expresses purpose. It means 'for the purpose of'.";
  }
  return null;
}

export function Translation({ data }: { data: TranslationData }) {
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);
  const { completeExercise } = useProgress();
  const { addError } = useErrors();

  function check() {
    const isCorrect = input.trim().toLowerCase() === data.en.toLowerCase();
    setCorrect(isCorrect);
    setChecked(true);
    if (isCorrect) {
      playCorrect();
      completeExercise(data.id, data.xpReward);
    } else {
      playWrong();
      addError({
        question: `Translate: "${data.de}"`,
        userAnswer: input.trim(),
        correctAnswer: data.en,
        explanation: `The correct translation is "${data.en}"`,
        source: "exercise",
        sourceId: data.id,
      });
    }
  }

  const grammarNote = getGrammarNote(data.de, data.en);

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-5 border-2 border-[var(--color-border-default)] space-y-4" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center gap-3">
        <span className="text-2xl">🇩🇪</span>
        <p className="font-mono text-lg font-bold text-[var(--color-primary-dark)]">{data.de}</p>
      </div>

      <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && !checked && check()} disabled={checked}
        placeholder="Translate to English..."
        className="w-full h-12 px-4 bg-[var(--color-surface)] rounded-[var(--radius-md)] border-2 border-[var(--color-border-default)] font-body text-sm font-medium text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)] placeholder:italic outline-none transition-all duration-150"
        style={{ boxShadow: "0 2px 0 var(--color-border-default)" }}
        onFocus={(e) => { e.target.style.borderColor = "var(--color-border-focus)"; e.target.style.boxShadow = "0 2px 0 var(--color-border-focus), 0 0 0 3px rgba(28,176,246,0.15)"; }}
        onBlur={(e) => { e.target.style.borderColor = "var(--color-border-default)"; e.target.style.boxShadow = "0 2px 0 var(--color-border-default)"; }}
      />

      <AnimatePresence>
        {checked && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            {correct ? (
              <div className="flex items-center gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-success-bg)] text-[var(--color-success-dark)] border-2 border-[var(--color-success)]" style={{ boxShadow: "0 2px 0 var(--color-success)" }}>
                <CheckCircle className="w-5 h-5 shrink-0 text-[var(--color-success)]" />
                <div>
                  <p className="font-display font-extrabold">Correct! +{data.xpReward} XP</p>
                  <p className="font-body text-sm text-[var(--color-text-primary)] mt-0.5">{'\u201C'}{data.en}{'\u201D'}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-error-bg)] text-[var(--color-error)] border-2 border-[var(--color-error)]" style={{ boxShadow: "0 2px 0 var(--color-error)" }}>
                  <XCircle className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-error)]" />
                  <div>
                    <p className="font-display font-extrabold">Not quite</p>
                    <p className="font-body text-sm mt-1">
                      Your answer: <span className="line-through text-[var(--color-error)]">{'\u201C'}{input.trim()}{'\u201D'}</span>
                    </p>
                    <p className="font-body text-sm">
                      Correct answer: <span className="font-display font-bold text-[var(--color-success-dark)]">{'\u201C'}{data.en}{'\u201D'}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-info-bg)] text-[var(--color-info-dark)] border-2 border-[var(--color-info)]" style={{ boxShadow: "0 2px 0 var(--color-info)" }}>
                  <ArrowRight className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-info)]" />
                  <div>
                    <p className="font-display font-extrabold text-sm">Sentence breakdown</p>
                    <p className="font-body text-sm mt-1">
                      <span className="font-mono">{data.de}</span>
                      <br />
                      <span className="text-[var(--color-info)]">→ {data.en}</span>
                    </p>
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

      {!checked && <Button onClick={check} size="sm">Check ✓</Button>}
    </div>
  );
}
