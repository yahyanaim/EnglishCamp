"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { useProgress } from "@/store/useProgress";
import { CONVERSATIONS, type ConversationScenario } from "@/data/conversations";
import { Badge } from "@/components/ui/Badge";
import { speak } from "@/lib/audio";
import { MessageSquare, Volume2, Check, X, RotateCcw } from "lucide-react";


export default function ConversationPage() {
  const { addXP } = useProgress();
  const [selectedScenario, setSelectedScenario] = useState<ConversationScenario | null>(null);
  const [currentLine, setCurrentLine] = useState(0);
  const [showTranslation, setShowTranslation] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [earnedXP, setEarnedXP] = useState(0);
  const [xpAwarded, setXpAwarded] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scenario = selectedScenario;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentLine]);

  const reset = useCallback(() => {
    setSelectedScenario(null);
    setCurrentLine(0);
    setShowTranslation(null);
    setSelectedAnswer(null);
    setCompleted(false);
    setScore(0);
    setEarnedXP(0);
    setXpAwarded(false);
  }, []);

  const startScenario = (s: ConversationScenario) => {
    setSelectedScenario(s);
    setCurrentLine(0);
    setShowTranslation(null);
    setSelectedAnswer(null);
    setCompleted(false);
    setScore(0);
    setEarnedXP(0);
    setXpAwarded(false);
  };

  const currentBlank = scenario
    ? scenario.blanks.find((b) => b.lineIndex === currentLine)
    : null;

  const handleSelectAnswer = (ans: string) => {
    if (!scenario || selectedAnswer) return;
    setSelectedAnswer(ans);
    const isCorrect = ans === currentBlank?.correctAnswer;
    if (isCorrect) {
      setScore((s) => s + 1);
      setEarnedXP((x) => x + 5);
    }
    setTimeout(() => {
      advanceLine();
    }, 1000);
  };

  function advanceLine() {
    if (!scenario) return;
    if (currentLine < scenario.lines.length - 1) {
      setCurrentLine((i) => i + 1);
      setShowTranslation(null);
      setSelectedAnswer(null);
    } else {
      setCompleted(true);
      if (!xpAwarded) {
        const totalXP = score * 5 + 10;
        addXP(totalXP);
        setEarnedXP(totalXP);
        setXpAwarded(true);
      }
    }
  }

  if (!scenario) {
    return (
      <PageWrapper>
        <div className="space-y-6">
          <div>
            <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Conversation Practice</h1>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">Practice realistic English conversations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CONVERSATIONS.map((s, i) => (
              <motion.button
                key={s.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -2 }}
                onClick={() => startScenario(s)}
                className="text-left bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-5 shadow-sm border-2 border-[var(--color-border-default)] hover:shadow-md hover:ring-brand-200 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-primary-subtle)] flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-[var(--color-primary-dark)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-sm font-bold text-[var(--color-text-primary)]">{s.title}</h3>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        s.level === "A1" ? "bg-[var(--color-success)] text-white text-green-700" :
                        s.level === "A2" ? "bg-[var(--color-success)] text-white" :
                        s.level === "B1" ? "bg-[var(--color-warning)] text-white" :
                        "bg-[var(--color-warning)] text-white"
                      }`}>{s.level}</span>
                    </div>
                    <p className="text-xs text-[var(--color-text-secondary)]">{s.subtitle}</p>
                    <p className="text-xs text-[var(--color-text-disabled)] mt-1 line-clamp-1">{s.context}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </PageWrapper>
    );
  }

  if (completed) {
    return (
      <PageWrapper>
        <div className="text-center py-12 space-y-6">
          <div className="w-16 h-16 rounded-[var(--radius-lg)] bg-[var(--color-success)] text-white flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 text-[var(--color-success)]" />
          </div>
          <h2 className="text-2xl font-display font-extrabold text-[var(--color-text-primary)]">Conversation Complete!</h2>
          <p className="text-[var(--color-text-secondary)]">{scenario.title}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xs mx-auto">
            <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-4 border-2 border-[var(--color-border-default)]">
              <p className="text-2xl font-display font-extrabold text-[var(--color-success)]">{score}/{scenario.blanks.length}</p>
              <p className="text-[10px] text-[var(--color-text-disabled)]">Correct</p>
            </div>
            <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-4 border-2 border-[var(--color-border-default)]">
              <p className="text-2xl font-display font-extrabold text-[var(--color-primary-dark)]">+{earnedXP}</p>
              <p className="text-[10px] text-[var(--color-text-disabled)]">XP earned</p>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <button onClick={() => startScenario(scenario)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 text-white rounded-[var(--radius-lg)] font-semibold text-sm hover:bg-slate-700 transition-colors">
              <RotateCcw className="w-4 h-4" /> Practice Again
            </button>
            <button onClick={reset} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-surface)] border-2 border-[var(--color-border-default)] rounded-[var(--radius-lg)] font-semibold text-sm hover:bg-[var(--color-surface-alt)] transition-colors">
              All Scenarios
            </button>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">{scenario.title}</h1>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">{scenario.subtitle}</p>
          </div>
          <Badge variant="info">{scenario.level} · {currentLine + 1}/{scenario.lines.length}</Badge>
        </div>

        <div className="w-full h-1.5 rounded-full bg-[var(--color-surface-alt)] overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-[var(--color-primary)]"
            initial={{ width: 0 }}
            animate={{ width: `${((currentLine + 1) / scenario.lines.length) * 100}%` }}
          />
        </div>

        {scenario.tips.length > 0 && currentLine === 0 && (
          <div className="bg-[var(--color-warning)] text-white rounded-[var(--radius-lg)] p-4 ring-1 ring-amber-200">
            <p className="text-xs font-bold text-[var(--color-warning)] uppercase tracking-wider mb-2">Tips</p>
            <ul className="space-y-1">
              {scenario.tips.map((tip, i) => (
                <li key={i} className="text-xs text-[var(--color-warning)] flex items-start gap-1.5">
                  <span className="text-[var(--color-warning)] mt-0.5">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-6 shadow-sm border-2 border-[var(--color-border-default)]">
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {scenario.lines.slice(0, currentLine + 1).map((l, i) => {
              const isCurrent = i === currentLine;
              const blank = scenario.blanks.find((b) => b.lineIndex === i);
              const isUserLine = l.speaker === "user";
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <div className={`flex ${isUserLine ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] rounded-[var(--radius-lg)] p-4 ${
                      isUserLine
                        ? "bg-[var(--color-primary)] text-white"
                        : "bg-[var(--color-surface-alt)] text-[var(--color-text-primary)]"
                    }`}>
                      <p className="text-xs font-semibold opacity-70 mb-1">
                        {isUserLine ? "You" : "Partner"}
                      </p>
                      <p className="text-sm font-medium leading-relaxed">{l.text}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => speak(l.text)}
                      className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-disabled)] hover:text-[var(--color-primary)] transition-colors"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Listen
                    </button>
                    <button
                      onClick={() => setShowTranslation(showTranslation === i ? null : i)}
                      className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-disabled)] hover:text-[var(--color-text-secondary)] transition-colors"
                    >
                      {showTranslation === i ? "Hide" : "Show"} translation
                    </button>
                  </div>
                  {showTranslation === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="bg-[var(--color-surface-alt)] rounded-[var(--radius-lg)] p-3"
                    >
                      <p className="text-xs text-[var(--color-text-secondary)] italic">{l.translation}</p>
                      {l.ar && <p className="text-xs text-[var(--color-text-secondary)] italic font-arabic mt-0.5" lang="ar">{l.ar}</p>}
                    </motion.div>
                  )}
                  {isCurrent && blank && !selectedAnswer && (
                    <div className="border-t border-[var(--color-border-default)] pt-4">
                      <p className="text-xs font-semibold text-[var(--color-text-secondary)] mb-3">What did you say?</p>
                      <div className="flex flex-wrap gap-2">
                        {blank.options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleSelectAnswer(opt)}
                            className="px-4 py-2 rounded-[var(--radius-lg)] text-sm font-medium bg-[var(--color-surface)] border-2 border-[var(--color-border-default)] hover:ring-[var(--color-primary)] hover:bg-[var(--color-primary-subtle)] transition-all"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {isCurrent && !blank && (
                    <div className="pt-2">
                      <button onClick={advanceLine}
                        className="text-xs font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-4 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all inline-flex items-center gap-1"
                      >
                        Continue →
                      </button>
                    </div>
                  )}
                  {isCurrent && blank && selectedAnswer && (
                    <div className={`flex items-center gap-2 p-3 rounded-[var(--radius-lg)] ${
                      selectedAnswer === blank.correctAnswer
                        ? "bg-[var(--color-success)] text-white"
                        : "bg-[var(--color-error)] text-white text-red-700"
                    }`}>
                      {selectedAnswer === blank.correctAnswer ? (
                        <><Check className="w-4 h-4" /> Correct!</>
                      ) : (
                        <><X className="w-4 h-4" /> Correct: {blank.correctAnswer}</>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
            <div ref={chatEndRef} />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
