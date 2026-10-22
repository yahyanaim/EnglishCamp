"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { Button } from "@/components/ui/Button";
import { playCorrect, playWrong } from "@/lib/audio";
import { Lightbulb, CheckCircle, XCircle, BookOpen, ArrowRight } from "lucide-react";

export interface FillBlankData {
  sentence: string;
  answer: string;
  hint?: string;
  xpReward: number;
  id: string;
}

function getGrammarNote(answer: string, hint?: string): string {
  const h = hint?.toLowerCase() ?? "";
  if (h.includes("second conditional") || h.includes("conditional") || h.includes("subjunctive")) return "Second Conditional: if + past simple, would + base verb. Expresses hypothetical or unreal situations.";
  if (h.includes("passive")) return "Passive voice shifts focus from the subject to the action. Formed with 'be' + past participle.";
  if (h.includes("indirect object") || h.includes("dative")) return "The indirect object receives the direct object. It answers 'to whom?' or 'for whom?'.";
  if (h.includes("direct object") || h.includes("accusative")) return "The direct object is the person/thing directly affected by the action. It answers 'what?' or 'whom?'.";
  if (h.includes("possessive") || h.includes("genitive")) return "Possessive case shows ownership. Formed with '\u2019s' or 'of'.";
  if (h.includes("phrasal")) return "Phrasal verbs: verb + particle. The particle can change the meaning of the verb entirely.";
  if (h.includes("inseparable")) return "Inseparable phrasal verbs: the particle stays attached to the verb (e.g., 'undergo', 'overcome').";
  if (h.includes("relative")) return "Relative clauses give extra information about a noun. Use who/whom/which/that/whose.";
  if (h.includes("subordinate")) return "Subordinate clauses begin with a subordinating conjunction (because, although, when, etc.) and cannot stand alone.";
  if (h.includes("present perfect") || h.includes("perfect")) return "Present Perfect: have/has + past participle. Connects past actions to the present.";
  if (h.includes("past simple") || h.includes("preterite") || h.includes("simple past")) return "Simple Past: add -ed for regular verbs. Many common verbs have irregular past forms.";
  if (h.includes("preposition")) return "Prepositions show relationships of time, place, direction, and manner. Some are followed by specific patterns.";
  if (h.includes("modal")) return "Modal verbs (can, must, may, should, will, would) are followed by the base form of the verb (no 'to').";
  if (h.includes("future")) return "Future tense: 'will' + base verb or 'going to' + base verb. 'Will' for spontaneous decisions, 'going to' for plans.";
  if (h.includes("comparative") || h.includes("superlative")) return "Comparative: adj + -er + than. Superlative: the + adj + -est. Some are irregular (good \u2192 better \u2192 best).";
  if (h.includes("imperative")) return "Imperative: base verb form. Add 'please' for politeness. Negative: 'don\u2019t' + base verb.";
  if (h.includes("reflexive")) return "Reflexive verbs: the subject and object are the same. Use myself/yourself/himself/herself/itself/ourselves/yourselves/themselves.";
  if (h.includes("adjective order")) return "Adjective order in English: opinion \u2192 size \u2192 age \u2192 shape \u2192 color \u2192 origin \u2192 material \u2192 purpose.";
  if (h.includes("because")) return "'Because' introduces a reason. It can start a sentence (followed by a comma) or come in the middle.";
  return `"${answer}" is the correct form here. Pay attention to conjugation, tense, and word order rules.`;
}

function getExampleSentence(answer: string, sentence: string): string {
  const filled = sentence.replace("___", `"${answer}"`);
  return filled;
}

export function FillBlank({ data }: { data: FillBlankData }) {
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);
  const { completeExercise } = useProgress();
  const { addError } = useErrors();

  const parts = data.sentence.split("____");

  function check() {
    const isCorrect = input.trim().toLowerCase() === data.answer.toLowerCase();
    setCorrect(isCorrect);
    setChecked(true);
    if (isCorrect) {
      playCorrect();
      completeExercise(data.id, data.xpReward);
    } else {
      playWrong();
      addError({
        question: `Fill blank: "${data.sentence}"`,
        userAnswer: input.trim(),
        correctAnswer: data.answer,
        explanation: data.hint ?? `The correct answer is "${data.answer}"`,
        source: "exercise",
        sourceId: data.id,
      });
    }
  }

  const grammarNote = data.hint ? getGrammarNote(data.answer, data.hint) : null;
  const exampleSentence = getExampleSentence(data.answer, data.sentence);

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-5 border-2 border-[var(--color-border-default)] space-y-4" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex flex-wrap items-center gap-2 font-body text-lg text-[var(--color-text-primary)]">
        <span>{parts[0]}</span>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !checked && check()} disabled={checked}
          placeholder="___"
          className={`inline-block w-40 px-4 py-2 rounded-[var(--radius-md)] border-2 font-mono text-center bg-[var(--color-surface)] outline-none transition-all ${
            checked ? (correct ? "border-[var(--color-success)] text-[var(--color-success-dark)] bg-[var(--color-success-bg)]" : "border-[var(--color-error)] text-[var(--color-error)] bg-[var(--color-error-bg)]") : "border-[var(--color-border-default)] text-[var(--color-text-primary)] focus:border-[var(--color-border-focus)]"
          }`}
          style={!checked ? { boxShadow: "0 2px 0 var(--color-border-default)" } : correct ? { boxShadow: "0 2px 0 var(--color-success)" } : { boxShadow: "0 2px 0 var(--color-error)" }}
          onFocus={(e) => { if (!checked) { e.target.style.borderColor = "var(--color-border-focus)"; e.target.style.boxShadow = "0 2px 0 var(--color-border-focus)"; }}}
          onBlur={(e) => { if (!checked) { e.target.style.borderColor = "var(--color-border-default)"; e.target.style.boxShadow = "0 2px 0 var(--color-border-default)"; }}}
        />
        <span>{parts[1]}</span>
      </div>

      {data.hint && !checked && (
        <div className="flex items-start gap-2 font-body text-sm text-[var(--color-text-secondary)]">
          <Lightbulb className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-warning)]" />
          <span>{data.hint}</span>
        </div>
      )}

      <AnimatePresence>
        {checked && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            {correct ? (
              <div className="flex items-center gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-success-bg)] text-[var(--color-success-dark)] border-2 border-[var(--color-success)]" style={{ boxShadow: "0 2px 0 var(--color-success)" }}>
                <CheckCircle className="w-5 h-5 shrink-0 text-[var(--color-success)]" />
                <div>
                  <p className="font-display font-extrabold">Correct! +{data.xpReward} XP</p>
                  <p className="font-body text-sm text-[var(--color-text-primary)] mt-0.5">{'\u201C'}{data.answer}{'\u201D'} is right</p>
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
                      Correct answer: <span className="font-display font-bold text-[var(--color-success-dark)]">{'\u201C'}{data.answer}{'\u201D'}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-info-bg)] text-[var(--color-info-dark)] border-2 border-[var(--color-info)]" style={{ boxShadow: "0 2px 0 var(--color-info)" }}>
                  <ArrowRight className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-info)]" />
                  <div>
                    <p className="font-display font-extrabold text-sm">In context</p>
                    <p className="font-body text-sm mt-1 font-mono">&ldquo;{exampleSentence}&rdquo;</p>
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
