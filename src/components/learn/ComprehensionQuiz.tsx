"use client";

import { useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";
import { correctAnswerText, isAnswered, isCorrect, scoreAnswers, SKILL_LABELS, TYPE_LABELS, type ComprehensionAnswer, type ComprehensionQuestion } from "@/lib/comprehension";

export type QuizResult = { correct: number; total: number; xp: number; firstCompletion: boolean };

/** Shared by Read and Listening so both sections look and grade the same way. */
export function ComprehensionQuiz({ questions, heading, intro, onSubmit, previousBest }: {
  questions: readonly ComprehensionQuestion[];
  heading: string;
  intro?: string;
  onSubmit: (correct: number, total: number) => QuizResult;
  previousBest?: { best: number; total: number };
}) {
  const [answers, setAnswers] = useState<Record<string, ComprehensionAnswer>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const first = useRef<HTMLInputElement>(null);
  const checked = result !== null;
  const ready = questions.every(question => isAnswered(question, answers[question.id]));
  const set = (id: string, value: ComprehensionAnswer) => setAnswers(previous => ({ ...previous, [id]: value }));

  return (
    <section className="camp-reader-text camp-listening-questions camp-comprehension" aria-labelledby="comprehension-heading">
      <h3 id="comprehension-heading" className="font-display text-lg font-bold">{heading}</h3>
      {intro && <p className="camp-comprehension-intro">{intro}</p>}
      {previousBest && previousBest.total > 0 && !checked && <p className="camp-comprehension-intro">Your best so far: {previousBest.best} of {previousBest.total}.</p>}
      <form onSubmit={event => {
        event.preventDefault();
        if (!ready || checked) return;
        const score = scoreAnswers(questions, answers);
        setResult(onSubmit(score.correct, score.total));
      }}>
        <div className="camp-listening-question-grid">
          {questions.map((question, index) => {
            const answer = answers[question.id], right = checked && isCorrect(question, answer);
            const tag = `${TYPE_LABELS[question.type]} · ${SKILL_LABELS[question.skill]}`;
            return (
              <fieldset key={question.id} disabled={checked} data-outcome={checked ? (right ? "correct" : "incorrect") : undefined}>
                <legend><span className="camp-question-type">{tag}</span>{index + 1}. {question.type === "true-false" ? `True or false: ${question.prompt}` : question.prompt}</legend>
                {question.type === "multiple-choice" || question.type === "true-false" ? (
                  <div className="camp-listening-options">
                    {(question.type === "true-false" ? [["True", true], ["False", false]] as const : question.choices.map((choice, i) => [choice, i] as const)).map(([label, value], choiceIndex) => {
                      const selected = answer === value;
                      const outcome = checked && (value === question.correct ? "correct" : selected ? "incorrect" : undefined);
                      return (
                        <label key={String(label)} data-selected={selected} data-outcome={outcome || undefined}>
                          <input ref={index === 0 && choiceIndex === 0 ? first : undefined} type="radio" name={question.id} checked={selected} onChange={() => set(question.id, value)} />
                          <span>{label}</span>
                        </label>
                      );
                    })}
                  </div>
                ) : (
                  <label className="camp-comprehension-written">
                    <span className="sr-only">Your answer</span>
                    <input ref={index === 0 ? first : undefined} type="text" inputMode="text" autoComplete="off" spellCheck={false} maxLength={80}
                      value={typeof answer === "string" ? answer : ""} onChange={event => set(question.id, event.target.value)}
                      placeholder={question.type === "gap-fill" ? "Type the missing word" : "Type your answer"} />
                  </label>
                )}
                <div aria-live="polite">
                  {checked && (
                    <p className="camp-listening-feedback">
                      <strong>{right ? "Correct." : `Not quite. Answer: ${correctAnswerText(question)}.`}</strong> {question.feedback}
                    </p>
                  )}
                </div>
              </fieldset>
            );
          })}
        </div>
        <div className="camp-listening-question-actions">
          {checked ? (
            <Button type="button" variant="outline" onClick={() => {
              setAnswers({});
              setResult(null);
              requestAnimationFrame(() => first.current?.focus());
            }}>
              <RotateCcw size={16} aria-hidden="true" />
              Try again
            </Button>
          ) : (
            <Button type="submit" disabled={!ready}>Check answers</Button>
          )}
          <span role="status">
            {result ? `${result.correct} of ${result.total} correct${result.firstCompletion ? ` · +${result.xp} XP` : " · XP already earned for this lesson"}` : ""}
          </span>
          {!result && !ready && <span className="camp-comprehension-hint">Answer every question to check.</span>}
        </div>
      </form>
    </section>
  );
}
