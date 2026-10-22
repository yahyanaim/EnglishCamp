"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import type { QuizQuestion } from "@/data/types";
import { CheckCircle, XCircle } from "lucide-react";

interface Props { question: QuizQuestion; onAnswer: (correct: boolean) => void; }

export function QuestionCard({ question, onAnswer }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  function handleSelect(i: number) {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    onAnswer(i === question.correct);
  }

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-6 border-2 border-[var(--color-border-default)]" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <h3 className="font-display font-extrabold text-xl text-[var(--color-text-primary)] mb-6">{question.question}</h3>
      <div className="space-y-2">
        {question.options.map((opt, i) => {
          let style = "bg-[var(--color-surface)] border-[var(--color-border-default)] hover:border-[var(--color-border-strong)]";
          let icon = null;
          if (answered) {
            if (i === question.correct) { style = "bg-[var(--color-success-bg)] border-[var(--color-success)]"; icon = <CheckCircle className="w-4 h-4 text-[var(--color-success)]" />; }
            else if (i === selected) { style = "bg-[var(--color-error-bg)] border-[var(--color-error)]"; icon = <XCircle className="w-4 h-4 text-[var(--color-error)]" />; }
            else { style = "bg-[var(--color-surface)] border-[var(--color-border-default)] opacity-40"; }
          }
          return (
            <button key={i} onClick={() => handleSelect(i)} disabled={answered}
              className={`flex items-center gap-3 w-full text-left p-3 rounded-[var(--radius-md)] border-2 transition-all duration-150 ${style}`}
              style={{ boxShadow: answered && i === question.correct ? "0 2px 0 var(--color-success)" : answered && i === selected ? "0 2px 0 var(--color-error)" : "0 2px 0 var(--color-border-default)" }}
            >
              <span className="font-body flex-1 text-[var(--color-text-primary)]">{opt}</span>
              {icon}
            </button>
          );
        })}
      </div>
      {answered && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className={`mt-4 p-3 rounded-[var(--radius-md)] border-2 font-body text-sm ${selected === question.correct ? "bg-[var(--color-success-bg)] border-[var(--color-success)] text-[var(--color-success-dark)]" : "bg-[var(--color-error-bg)] border-[var(--color-error)] text-[var(--color-error)]"}`}
          style={{ boxShadow: selected === question.correct ? "0 2px 0 var(--color-success)" : "0 2px 0 var(--color-error)" }}
        >
          {question.explain}
        </motion.div>
      )}
    </div>
  );
}
