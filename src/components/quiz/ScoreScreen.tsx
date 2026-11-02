"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { BandId, QuizQuestion } from "@/data/types";
import { BookOpen, Target, TrendingUp } from "lucide-react";

interface Props { score: number; total: number; correct: number; levelId: BandId; answers: number[]; questions: QuizQuestion[]; }

type Topic = "articles" | "cases" | "verbs" | "tenses" | "prepositions" | "word-order" | "vocabulary" | "nominalization" | "passive" | "conditionals" | "relative" | "modal" | "comparative" | "adjectives" | "reflexive" | "participles" | "connectors" | "culture";

function classifyQuestion(q: QuizQuestion): Topic {
  const text = (q.question + " " + q.explain).toLowerCase();
  if (text.includes("conditional") || text.includes("would") || text.includes("could") || text.includes("should") || text.includes("had") && (text.includes("have") || text.includes("been"))) return "conditionals";
  if (text.includes("passive") || text.includes("was ") && text.includes(" by ") || text.includes("were ") && text.includes(" by ")) return "passive";
  if (text.includes("nominal") || text.includes("nominalization") || text.includes("-tion") || text.includes("-ment") || text.includes("-ness")) return "nominalization";
  if (text.includes("relative") || text.includes("who") || text.includes("which") || text.includes("whose") || text.includes("whom")) return "relative";
  if (text.includes("past") || text.includes("present") || text.includes("future") || text.includes("perfect") || text.includes("continuous") || text.includes("tense")) return "tenses";
  if (text.includes("preposition") || text.includes("in ") || text.includes("at ") || text.includes("on ") || text.includes("for ") || text.includes("with ") || text.includes("about ") || text.includes("from ") || text.includes("by ") || text.includes("to ")) return "prepositions";
  if (text.includes("modal") || text.includes("can ") || text.includes("must") || text.includes("may ") || text.includes("might") || text.includes("shall")) return "modal";
  if (text.includes("comparative") || text.includes("superlative") || text.includes("than ") || text.includes("better") || text.includes("worse") || text.includes("best") || text.includes("worst")) return "comparative";
  if (text.includes("adjective") || text.includes("adjectiv") || text.includes("ending") || text.includes("order") && text.includes("adjective")) return "adjectives";
  if (text.includes("reflexive") || text.includes("myself") || text.includes("yourself") || text.includes("himself") || text.includes("herself") || text.includes("itself") || text.includes("ourselves") || text.includes("themselves")) return "reflexive";
  if (text.includes("participle") || text.includes("participl") || text.includes("extended") || text.includes("phrase")) return "participles";
  if (text.includes("subordinate") || text.includes("conjunction") || text.includes("because") || text.includes("although") || text.includes("while") || text.includes("since") || text.includes("if ") || text.includes("word order") || text.includes("adverb order")) return "word-order";
  if (text.includes("verb") || text.includes("phrasal") || text.includes("conjugation") || text.includes("conjugat") || text.includes("irregular") || text.includes("walk") || text.includes("go ") || text.includes("eat ") || text.includes("take ")) return "verbs";
  if (text.includes("article") || text.includes("a ") || text.includes("an ") || text.includes("the") || text.includes("countable") || text.includes("uncountable") || text.includes("case")) return "cases";
  if (text.includes("means") || text.includes("what is") || text.includes("what does") || text.includes("vocabulary") || text.includes("word") || text.includes("meaning")) return "vocabulary";
  if (text.includes("culture") || text.includes("british") || text.includes("american") || text.includes("uk ") || text.includes("usa") || text.includes("london") || text.includes("thanksgiving") || text.includes("halloween")) return "culture";
  if (text.includes("connector") || text.includes("however") || text.includes("therefore") || text.includes("furthermore") || text.includes("nevertheless") || text.includes("moreover") || text.includes("meanwhile")) return "connectors";
  return "vocabulary";
}

const topicLabels: Record<Topic, string> = {
  articles: "Articles (a/an/the)",
  cases: "Articles & Determiners",
  verbs: "Verbs & Conjugation",
  tenses: "Tenses (Past/Present/Future)",
  prepositions: "Prepositions",
  "word-order": "Word Order & Subordinate Clauses",
  vocabulary: "Vocabulary",
  nominalization: "Nominalization",
  passive: "Passive Voice",
  conditionals: "Conditionals",
  relative: "Relative Clauses",
  modal: "Modal Verbs",
  comparative: "Comparative & Superlative",
  adjectives: "Adjectives",
  reflexive: "Reflexive Pronouns",
  participles: "Participles & Participle Phrases",
  connectors: "Connectors & Discourse Markers",
  culture: "Culture (UK/USA/etc.)",
};

const topicSuggestions: Record<Topic, string> = {
  articles: "Review the articles lesson and try the Article Master in Practice Hub.",
  cases: "Study the Articles Guide page and practice with the Articles trainer.",
  verbs: "Practice verb conjugations with the Verb Conjugation trainer.",
  tenses: "Review tense formation: Simple Past, Present Perfect, Future lessons.",
  prepositions: "Practice with the Prepositions trainer in Practice Hub.",
  "word-order": "Study Adverb Order and the Sentence Structure trainer.",
  vocabulary: "Use flashcards and the Vocabulary trainer to expand your vocabulary.",
  nominalization: "Review the Nominalization lesson for formal English.",
  passive: "Study the Passive Voice lesson and practice with the Passive trainer.",
  conditionals: "Review Conditionals (Zero, First, Second, Third) lessons.",
  relative: "Study relative pronouns (who, which, that) and relative clause structure.",
  modal: "Review modal verbs (can, must, should, may, might) and their uses.",
  comparative: "Study comparative/superlative forms and irregulars (good → better → best).",
  adjectives: "Master adjective order and gradation.",
  reflexive: "Practice reflexive pronouns (myself, yourself, himself, etc.).",
  participles: "Study present vs past participles as adjectives.",
  connectors: "Review discourse markers and text connectors for English writing.",
  culture: "Explore the Culture sections in the lessons about English-speaking countries.",
};

export function ScoreScreen({ score, total, correct, levelId, answers, questions }: Props) {
  const emoji = score >= 80 ? "\u{1F3C6}" : score >= 60 ? "\u{1F44D}" : score >= 40 ? "\u{1F4DA}" : "\u{1F4AA}";
  const msg = score >= 80 ? "Excellent!" : score >= 60 ? "Good job!" : score >= 40 ? "Keep practicing!" : "Don't give up!";

  const { weakTopics, suggestions } = useMemo(() => {
    const wrong: Record<Topic, { count: number; total: number }> = {} as any;
    for (let i = 0; i < questions.length; i++) {
      const topic = classifyQuestion(questions[i]);
      if (!wrong[topic]) wrong[topic] = { count: 0, total: 0 };
      wrong[topic].total++;
      if (answers[i] !== questions[i].correct) wrong[topic].count++;
    }

    const weak = Object.entries(wrong)
      .filter(([, v]) => v.count > 0)
      .sort(([, a], [, b]) => (b.count / Math.max(b.total, 1)) - (a.count / Math.max(a.total, 1)))
      .slice(0, 3);

    const suggs = weak.map(([topic]) => topicSuggestions[topic as Topic]);
    return { weakTopics: weak as [Topic, { count: number; total: number }][], suggestions: suggs };
  }, [questions, answers]);

  return (
    <div className="practice-card text-center" data-practice-surface="result">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
        <LearningArt name={emoji} size={28} className="mb-4" />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h1 className="font-display font-extrabold" style={{ color: "var(--color-text-primary)", marginBottom: "12px" }}>{msg}</h1>
        <p className="font-display font-extrabold mb-3" style={{
          fontSize: "72px",
          color: score >= 80 ? "var(--color-primary)" : score >= 60 ? "var(--color-success)" : score >= 40 ? "var(--color-info)" : "var(--color-error)",
        }}>{score}%</p>
        <p className="font-body" style={{ color: "var(--color-text-secondary)", marginBottom: "32px" }}>
          {correct} of {total} correct &middot; Level {levelId.toUpperCase()}
        </p>
      </motion.div>

      <div className="flex gap-3 justify-center flex-wrap mb-12">
        <Link href={`/quiz/${levelId}`}><Button>Retry Quiz</Button></Link>
        <Link href={`/levels/${levelId}`}><Button variant="secondary">Back to Level</Button></Link>
        <Link href="/practice"><Button variant="ghost">Practice Hub</Button></Link>
      </div>

      {weakTopics.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-left mb-8 p-5 rounded-[var(--radius-lg)] border-2"
          style={{
            backgroundColor: "var(--color-warning)",
            borderColor: "#b8860b",
            color: "#FFFFFF",
            boxShadow: "0 3px 0 #8B6914",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <LearningArt name="Target" size={20} className="w-5 h-5 text-white" />
            <h2 className="font-display font-extrabold text-white">Areas to Improve</h2>
          </div>
          <div className="space-y-2">
            {weakTopics.map(([topic, { count, total }]) => (
              <div key={topic} className="flex items-center justify-between rounded-[var(--radius-md)] px-4 py-3 border-2"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#d4a017",
                  boxShadow: "0 2px 0 #b8860b",
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="font-body text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>{topicLabels[topic]}</span>
                  <span className="font-body text-xs" style={{ color: "var(--color-text-disabled)" }}>({count}/{total} wrong)</span>
                </div>
                <div className="w-24 h-2 rounded-[var(--radius-pill)] overflow-hidden" style={{ backgroundColor: "var(--color-border-default)" }}>
                  <div
                    className="h-full rounded-[var(--radius-pill)]"
                    style={{
                      width: `${(count / Math.max(total, 1)) * 100}%`,
                      backgroundColor: count === total ? "var(--color-error)" : count > total / 2 ? "var(--color-warning)" : "var(--color-primary)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {suggestions.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="text-left mb-8 p-5 rounded-[var(--radius-lg)] border-2"
          style={{
            backgroundColor: "var(--color-info)",
            borderColor: "#7E22CE",
            color: "#FFFFFF",
            boxShadow: "0 3px 0 #581C87",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-white" />
            <h2 className="font-display font-extrabold text-white">Recommended Next Steps</h2>
          </div>
          <ul className="space-y-2">
            {suggestions.map((s, i) => (
              <li key={i} className="flex items-start gap-2 font-body text-sm text-white/90">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-display font-extrabold shrink-0 mt-0.5"
                  style={{ backgroundColor: "rgba(255,255,255,0.3)", color: "#FFFFFF" }}
                >{i + 1}</span>
                <span>{s}</span>
              </li>
            ))}
            <li className="flex items-start gap-2 font-body text-sm text-white/90">
              <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: "rgba(255,255,255,0.3)", color: "#FFFFFF" }}
              >
                <LearningArt name="BookOpen" size={12} className="w-3 h-3" />
              </span>
              <span>Visit the Practice Hub for targeted trainers on each topic.</span>
            </li>
          </ul>
        </motion.div>
      )}

      <div className="text-left space-y-3">
        <h2 className="font-display font-extrabold mb-4 pl-3" style={{ color: "var(--color-text-primary)", borderLeft: "4px solid var(--color-primary)" }}>Review Answers</h2>
        {questions.map((q, i) => {
          const isCorrect = answers[i] === q.correct;
          return (
            <motion.div key={q.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.03 }}
              className="p-4 rounded-[var(--radius-lg)] border-2 transition-all duration-200"
              style={{
                backgroundColor: isCorrect ? "var(--color-success)" : "var(--color-error)",
                borderColor: isCorrect ? "var(--color-success)" : "var(--color-error)",
                color: "#FFFFFF",
                boxShadow: isCorrect ? "0 3px 0 #1a7a1a" : "0 3px 0 #8b0000",
              }}
            >
              <p className="font-body text-sm font-semibold mb-2">
                <span className={isCorrect ? "text-white" : "text-white"}>{isCorrect ? "Correct" : "Wrong"}</span> &mdash; {q.question}
              </p>
              {!isCorrect && (
                <p className="font-body text-xs text-white/80 mb-1">
                  Correct: {q.options[q.correct]}
                  {answers[i] >= 0 && answers[i] < q.options.length && (
                    <span className="text-white/60 ml-2">Your answer: {q.options[answers[i]]}</span>
                  )}
                </p>
              )}
              <p className="font-body text-xs text-white/70">{q.explain}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
