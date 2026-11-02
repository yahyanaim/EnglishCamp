"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { quizQuestions } from "@/data/quizzes";
import type { BandId } from "@/data/types";
import { ScoreScreen } from "./ScoreScreen";
import { Button } from "@/components/ui/Button";
import { playCorrect, playWrong } from "@/lib/audio";
import { CheckCircle, XCircle, Clock, Lightbulb, BookOpen } from "lucide-react";

interface Props { levelId: BandId }

const TIME_PER_QUESTION = 30;

function getAstuce(question: string, options: string[], correct: number, explain: string): { tip: string; suggest: string } {
  const q = question.toLowerCase();
  const correctAnswer = options[correct]?.toLowerCase() ?? "";
  const explainLow = explain.toLowerCase();

  if (q.includes("artikel") || q.includes("article") || q.includes(" a ") || q.includes(" an ") || q.includes(" the ")) {
    return {
      tip: "Remember: 'a' is used before consonant sounds (a car, a university), 'an' before vowel sounds (an apple, an hour), and 'the' refers to specific nouns.",
      suggest: "Practice articles with the Articles trainer in the Practice Hub!",
    };
  }
  if (q.includes("plural") || q.includes("plural")) {
    return {
      tip: "English plurals are usually formed by adding -s or -es. Some irregulars: child → children, man → men, woman → women, foot → feet, tooth → teeth.",
      suggest: "Try the Plural trainer in Practice Hub to master noun plurals.",
    };
  }
  if (q.includes("conditional") || q.includes("would") || q.includes("could") || q.includes("should") || explainLow.includes("conditional")) {
    return {
      tip: "Conditionals: Zero (general truth), First (if + present, will + inf), Second (if + past, would + inf), Third (if + past perfect, would have + past participle).",
      suggest: "Check the Conditionals lesson in Practice Hub.",
    };
  }
  if (q.includes("passive") || explainLow.includes("passive")) {
    return {
      tip: "Passive voice: be (conjugated) + past participle. The agent uses 'by'. Active: 'The cat ate the mouse.' Passive: 'The mouse was eaten by the cat.'",
      suggest: "Review the Passive voice lesson and practice with the Passive trainer.",
    };
  }
  if (q.includes("preposition") || q.includes("in ") || q.includes("at ") || q.includes("on ") || q.includes("for") || q.includes("with") || q.includes("about") || q.includes("from") || explainLow.includes("preposition")) {
    return {
      tip: "Prepositions of time: at (time), on (day), in (month/year). Prepositions of place: at (point), on (surface), in (enclosed space). Learn verb + preposition collocations: depend ON, listen TO, belong TO.",
      suggest: "Practice with the Prepositions trainer in the Practice Hub!",
    };
  }
  if (q.includes("present perfect") || q.includes("participle") || q.includes("has ") || q.includes("have ") || explainLow.includes("present perfect")) {
    return {
      tip: "Present Perfect = have/has + past participle. Regular: add -ed (walk → walked). Irregular: change form (see → seen, go → gone, eat → eaten).",
      suggest: "Train Present Perfect forms with the Participle trainer in Practice Hub.",
    };
  }
  if (q.includes("simple past") || q.includes("past simple") || q.includes("preterite") || explainLow.includes("past tense") || (q.includes("past") && (q.includes("walked") || q.includes("went") || q.includes("saw")))) {
    return {
      tip: "Simple Past = regular -ed (walked, played) or irregular form (went, saw, ate, wrote). Used for completed actions in the past.",
      suggest: "Practice with the Past Tense trainer in the Practice Hub.",
    };
  }
  if (q.includes("modal") || q.includes("can") || q.includes("must") || q.includes("should") || q.includes("may") || q.includes("might") || q.includes("could") || q.includes("would") || explainLow.includes("modal")) {
    return {
      tip: "Modal verbs: can (ability), must (obligation), should (advice), may/might (permission/possibility), could (past ability/polite), would (polite/conditional).",
      suggest: "Check the Modal Verbs lesson and the Modal verb trainer in Practice Hub.",
    };
  }
  if (q.includes("future") || q.includes("will") || q.includes("going to") || explainLow.includes("future")) {
    return {
      tip: "Future: 'will' for spontaneous decisions/predictions, 'going to' for plans/intentions, present continuous for fixed arrangements.",
      suggest: "Review the Future tense lesson for more practice.",
    };
  }
  if (q.includes("comparative") || q.includes("superlative") || explainLow.includes("comparative")) {
    return {
      tip: "Comparative: adj + -er + than. Superlative: the + adj + -est. Irregular: good → better → best, bad → worse → worst, far → farther/further → farthest/furthest.",
      suggest: "Practice with the Comparative trainer in Practice Hub.",
    };
  }
  if (q.includes("relative") || q.includes("who") || q.includes("which") || q.includes("that") || q.includes("whose") || explainLow.includes("relative")) {
    return {
      tip: "Relative pronouns: who (people), which (things), that (both), whose (possession). 'Who' has subject form, 'whom' is object form (formal).",
      suggest: "Review the Relative Clauses lesson for detailed explanations.",
    };
  }
  if (q.includes("subordinate") || q.includes("because") || q.includes("although") || q.includes("if ") || q.includes("when") || q.includes("while") || q.includes("since") || explainLow.includes("subordinate")) {
    return {
      tip: "Subordinate clauses begin with subordinating conjunctions (because, although, if, when, while, since). They cannot stand alone.",
      suggest: "Practice sentence structure with the Clause Structure trainer in Practice Hub.",
    };
  }
  if (q.includes("phrasal") || q.includes("separ") || q.includes("look up") || q.includes("turn on") || q.includes("turn off") || q.includes("wake up") || q.includes("get up") || q.includes("go out") || explainLow.includes("phrasal") || explainLow.includes("separ")) {
    return {
      tip: "Phrasal verbs: verb + particle. The particle changes the meaning: look (see) vs look up (search), look after (care for), look forward to (anticipate). Some are separable with pronouns: turn it off, not turn off it.",
      suggest: "Train with the Phrasal Verbs lesson in Practice Hub.",
    };
  }
  if (q.includes("reflexive") || q.includes("myself") || q.includes("yourself") || q.includes("himself") || q.includes("herself") || q.includes("itself") || q.includes("ourselves") || q.includes("themselves") || explainLow.includes("reflexive")) {
    return {
      tip: "Reflexive pronouns: myself, yourself, himself, herself, itself, ourselves, yourselves, themselves. Used when subject and object are the same: 'I taught myself.'",
      suggest: "Practice with the Reflexive Pronouns trainer in Practice Hub.",
    };
  }
  if (q.includes("adjective") || q.includes("adjectiv") || q.includes("order") || explainLow.includes("adjective order")) {
    return {
      tip: "Adjective order: Opinion-Size-Age-Shape-Color-Origin-Material-Purpose-Noun. Example: a lovely small old square black French silk wedding dress.",
      suggest: "Review the Adjectives lesson in detail.",
    };
  }
  if (q.includes("adverb order") || q.includes("word order") || q.includes("tekamolo") || explainLow.includes("adverb order")) {
    return {
      tip: "Adverb order: Manner (how) → Place (where) → Time (when). Example: 'She sang beautifully at the concert last night.'",
      suggest: "Practice with the Adverb Order trainer in Practice Hub.",
    };
  }
  if (q.includes("means") || q.includes("meaning") || q.includes("word") || q.includes("vocabulary") || q.includes("vocab")) {
    return {
      tip: "Building vocabulary through context and spaced repetition is most effective. Try to learn words in phrases, not in isolation.",
      suggest: "Use the Vocabulary trainer and flashcards in the Practice Hub to expand your vocabulary.",
    };
  }
  if (explainLow.includes("nominal")) {
    return {
      tip: "Nominalization turns verbs/adjectives into nouns: create → creation, decide → decision, move → movement. Common suffixes: -tion, -ment, -ness, -ity, -ance.",
      suggest: "Review the Nominalization lesson for more on formal English style.",
    };
  }
  if (q.includes("indirect speech") || q.includes("reported speech") || explainLow.includes("indirect speech")) {
    return {
      tip: "Reported/Indirect speech shifts tenses back: present→past, past→past perfect. 'I am tired' → He said he was tired. 'I saw her' → He said he had seen her.",
      suggest: "Study the Reported Speech lesson for detailed patterns.",
    };
  }

  return {
    tip: `Think about the grammar rule behind this question. ${explain}`,
    suggest: "Review the corresponding lesson for this topic. Consistent practice is key to mastery!",
  };
}

export function QuizEngine({ levelId }: Props) {
  const questions = quizQuestions.filter((q) => q.levelId === levelId);
  const { recordQuizResult } = useProgress();
  const { addError } = useErrors();

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [done, setDone] = useState(false);

  const current = questions[index];

  const handleAnswer = useCallback((choice: number) => {
    if (answered || !current) return;
    setSelected(choice);
    setAnswered(true);
    setAnswers((prev) => [...prev, choice]);
    if (choice === current.correct) {
      playCorrect();
    } else {
      playWrong();
      addError({
        question: current.question,
        userAnswer: current.options[choice] ?? "Time's up!",
        correctAnswer: current.options[current.correct],
        explanation: current.explain,
        source: "quiz",
        sourceId: current.id,
      });
    }
  }, [answered, current, addError]);

  useEffect(() => {
    if (answered || done) return;
    if (timeLeft <= 0) { handleAnswer(-1); return; }
    const t = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, answered, done, handleAnswer]);

  function next() {
    if (index + 1 >= questions.length) {
      const correct = answers.filter((a, i) => a === questions[i].correct).length;
      const score = Math.round((correct / questions.length) * 100);
      const xp = answers.reduce((sum, a, i) => a === questions[i].correct ? sum + questions[i].xpReward : sum, 0);
      recordQuizResult(levelId, { score, xpEarned: xp, takenAt: new Date().toISOString(), answers });
      setDone(true);
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
      setAnswered(false);
      setTimeLeft(TIME_PER_QUESTION);
    }
  }

  if (done) {
    const correct = answers.filter((a, i) => a === questions[i].correct).length;
    const score = Math.round((correct / questions.length) * 100);
    return <ScoreScreen score={score} total={questions.length} correct={correct} levelId={levelId} answers={answers} questions={questions} />;
  }

  const timerPct = (timeLeft / TIME_PER_QUESTION) * 100;
  const astuce = current && selected !== null && selected !== current.correct
    ? getAstuce(current.question, current.options, current.correct, current.explain)
    : null;

  return (
    <div className="camp-level-quiz">
      <div className="camp-quiz-status flex items-center justify-between mb-4">
        <span className="font-body text-sm" style={{ color: "var(--color-text-secondary)" }}>Question {index + 1} of {questions.length}</span>
        <div className="flex items-center gap-2 rounded-[var(--radius-pill)] px-4 py-1.5 border-2" style={{ backgroundColor: "var(--color-surface-alt)", borderColor: "var(--color-border-default)", boxShadow: "0 2px 0 var(--color-border-default)" }}>
          <LearningArt name="Clock" size={16} className={`w-4 h-4 ${timeLeft <= 5 ? "text-[var(--color-error)]" : "text-[var(--color-text-disabled)]"}`} />
          <span className={`font-display font-extrabold text-sm ${timeLeft <= 5 ? "text-[var(--color-error)]" : "text-[var(--color-text-primary)]"}`}>{timeLeft}s</span>
        </div>
      </div>

      <div className="flex gap-1.5 mb-8">
        {questions.map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-[var(--radius-pill)] transition-colors duration-300 ${
            i < index ? "bg-[var(--color-primary)]" : i === index ? "bg-[var(--color-primary)]" : "bg-[var(--color-border-default)]"
          }`} />
        ))}
      </div>

      <div className="h-1.5 w-full rounded-[var(--radius-pill)] mb-8 overflow-hidden" style={{ backgroundColor: "var(--color-border-default)" }}>
        <motion.div
          className="h-full rounded-[var(--radius-pill)]"
          style={{ backgroundColor: timeLeft <= 5 ? "var(--color-error)" : "var(--color-primary)" }}
          animate={{ width: `${timerPct}%` }} transition={{ duration: 0.5 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div className="practice-card" data-practice-surface="question" key={index} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
          <h2 className="camp-quiz-question-heading font-display font-extrabold">
            {current.question}
          </h2>

          <div className="grid grid-cols-1 gap-3">
            {current.options.map((option, i) => {
              let cardStyle = "border-2";
              let icon = null;

              if (answered) {
                if (i === current.correct) {
                  cardStyle = "border-2";
                  icon = <CheckCircle className="w-5 h-5 text-inherit flex-shrink-0" />;
                } else if (i === selected && selected !== current.correct) {
                  cardStyle = "border-2";
                  icon = <XCircle className="w-5 h-5 text-inherit flex-shrink-0" />;
                } else {
                  cardStyle = "border-2";
                }
              } else {
                cardStyle = "border-2 hover:border-[var(--color-primary)]";
              }

              return (
                <motion.button key={i} onClick={() => handleAnswer(i)} disabled={answered}
                  whileHover={!answered ? { scale: 1.01 } : {}} whileTap={!answered ? { scale: 0.99 } : {}}
                  data-answer-state={answered ? i === current.correct ? "correct" : i === selected ? "incorrect" : "neutral" : "available"}
                  className={`camp-level-answer flex items-center gap-4 w-full text-left p-4 rounded-[var(--radius-lg)] transition-all duration-200 active:translate-y-0.5 ${cardStyle}`}
                >
                  <span className="w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center text-sm font-display font-extrabold flex-shrink-0 border-2"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      borderColor: "var(--color-border-default)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="font-body font-semibold flex-1">{option}</span>
                  {icon}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {answered && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 mt-4">
                {selected === current.correct ? (
                  <div className="camp-level-feedback camp-level-feedback--correct"
                  >
                    <CheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-inherit" />
                    <div>
                      <p className="font-display font-extrabold">Correct! +{current.xpReward} XP</p>
                      <p className="font-body text-sm mt-1 text-inherit">{current.explain}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="camp-level-feedback camp-level-feedback--incorrect"
                    >
                      <XCircle className="w-5 h-5 shrink-0 mt-0.5 text-inherit" />
                      <div>
                        <p className="font-display font-extrabold">Not quite</p>
                        <p className="font-body text-sm mt-1 text-inherit">
                          Your choice: <span className="line-through text-inherit">{selected === -1 ? "(no answer)" : current.options[selected!]}</span>
                        </p>
                        <p className="font-body text-sm text-inherit">
                          Correct answer: <span className="font-display font-extrabold text-inherit">{current.options[current.correct]}</span>
                        </p>
                        <p className="font-body text-sm mt-2 text-inherit">{current.explain}</p>
                      </div>
                    </div>

                    {astuce && (
                      <>
                        <div className="camp-level-feedback camp-level-feedback--tip"
                        >
                          <LearningArt name="Lightbulb" size={20} className="w-5 h-5 shrink-0 mt-0.5 text-inherit" />
                          <div>
                            <p className="font-display font-extrabold text-sm">Astuce (Tip)</p>
                            <p className="font-body text-sm mt-1 text-inherit">{astuce.tip}</p>
                          </div>
                        </div>

                        <div className="camp-level-feedback camp-level-feedback--tip"
                        >
                          <LearningArt name="BookOpen" size={20} className="w-5 h-5 shrink-0 mt-0.5 text-inherit" />
                          <div>
                            <p className="font-display font-extrabold text-sm">Suggestion</p>
                            <p className="font-body text-sm mt-1 text-inherit">{astuce.suggest}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {answered && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 flex justify-end">
              <Button onClick={next} size="lg">
                {index + 1 >= questions.length ? "See Results" : "Next Question"} &rarr;
              </Button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
