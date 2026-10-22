"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";
import { SpeakerButton } from "@/components/ui/SpeakerButton";


type TextEntry = { text: string; translation: string; ar?: string; questions: { q: string; options: string[]; correct: number }[] };

const TEXTS: TextEntry[] = [
  { text: "Hello! My name is Sara and I am from London. I am 24 years old and I study English literature at the university. In my free time I like to read books and watch movies. On weekends I often meet my friends at the park.", translation: "Sara introduces herself and talks about her studies and hobbies.", questions: [
    { q: "Where is Sara from?", options: ["Paris", "New York", "London", "Cairo"], correct: 2 },
    { q: "What does Sara study?", options: ["Medicine", "English literature", "Engineering", "History"], correct: 1 },
    { q: "What does Sara do in her free time?", options: ["Watches TV", "Reads and watches movies", "Cooks", "Plays football"], correct: 1 },
  ]},
  { text: "Yesterday the weather was very nice. The sun was shining and it was warm. I went to the park and had a picnic with my family. Many people were also in the park. Some children played football, and others walked their dogs.", translation: "A description of a nice day at the park.", questions: [
    { q: "How was the weather yesterday?", options: ["Bad", "Nice and warm", "Cold and rainy", "Windy"], correct: 1 },
    { q: "What did the family do in the park?", options: ["Played football", "Had a picnic", "Walked dogs", "Read books"], correct: 1 },
    { q: "What did the children do in the park?", options: ["Slept", "Played football", "Worked", "Swam"], correct: 1 },
  ]},
  { text: "My favorite food is pizza. I like pizza with cheese, tomatoes and mushrooms. Sometimes I also eat pasta with meat sauce. For breakfast I always drink tea and eat bread with butter. I also like to eat fruit like apples and bananas.", translation: "A person describes their favorite foods.", questions: [
    { q: "What is the person's favorite food?", options: ["Pasta", "Salad", "Pizza", "Fish"], correct: 2 },
    { q: "What does the person drink for breakfast?", options: ["Coffee", "Milk", "Tea", "Juice"], correct: 2 },
    { q: "What fruit does the person like?", options: ["Oranges", "Apples and bananas", "Grapes", "Strawberries"], correct: 1 },
  ]},
  { text: "I want to travel to England next year. I want to visit London, Manchester and Oxford. In London I want to see the Big Ben and the London Eye. I will stay for two weeks and hope to speak lots of English. I also want to try English food.", translation: "Plans to travel to England.", questions: [
    { q: "When does the person want to travel?", options: ["This year", "Next year", "Last year", "In two years"], correct: 1 },
    { q: "What does the person want to see in London?", options: ["The Eiffel Tower", "Big Ben and the London Eye", "The Colosseum", "The Statue of Liberty"], correct: 1 },
    { q: "How long will the person stay?", options: ["One week", "Two weeks", "Three weeks", "One month"], correct: 1 },
  ]},
  { text: "The United Kingdom is an island country in Europe. It has four parts: England, Scotland, Wales and Northern Ireland. The capital city is London. The UK is famous for its history, its royal family and its music. The official language is English. About 67 million people live there.", translation: "Facts about the United Kingdom.", questions: [
    { q: "How many parts does the UK have?", options: ["Two", "Three", "Four", "Five"], correct: 2 },
    { q: "What is the capital of the UK?", options: ["Manchester", "Liverpool", "London", "Edinburgh"], correct: 2 },
    { q: "What is the UK famous for?", options: ["History, royal family, music", "Fashion, cheese, wine", "Technology, films, sports", "Food, books, theatre"], correct: 0 },
  ]},
];

export function ReadingComprehension() {
  const { completeExercise } = useProgress();
  const { addError } = useErrors();
  const [index, setIndex] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [done, setDone] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  useEffect(() => {
    const shuffled = [...TEXTS].sort(() => Math.random() - 0.5);
    setIndex(0);
    setQIndex(0);
  }, []);

  const text = TEXTS[index];
  if (!text) return null;
  const question = text.questions[qIndex];

  function handleAnswer(choice: number) {
    if (answered || !question) return;
    const correct = choice === question.correct;
    setSelected(choice);
    setAnswered(true);
    setIsCorrect(correct);
    setTotal((t) => t + 1);
    if (correct) {
      setScore((s) => s + 1);
      playCorrect();
    } else {
      playWrong();
      addError({ question: question.q, userAnswer: question.options[choice], correctAnswer: question.options[question.correct], explanation: `Based on the text about "${text.text.slice(0, 40)}..."`, source: "exercise", sourceId: `reading-${index}-${qIndex}` });
    }
  }

  function next() {
    if (isCorrect) completeExercise(`reading-${index}-${qIndex}`, 10);
    if (qIndex + 1 >= text.questions.length) {
      if (index + 1 >= TEXTS.length) { setDone(true); return; }
      setIndex((i) => i + 1);
      setQIndex(0);
    } else {
      setQIndex((i) => i + 1);
    }
    setSelected(null);
    setAnswered(false);
    setIsCorrect(false);
    setShowTranslation(false);
  }

  if (done) {
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    return (
      <div className="text-center py-8">
        <span className="text-5xl block mb-3">{pct >= 80 ? "🏆" : "👍"}</span>
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Reading Complete!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-primary-dark)]">{score}/{total} ({pct}%)</p>
        <button onClick={() => { setDone(false); setScore(0); setTotal(0); setIndex(0); setQIndex(0); }}
          className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all mt-4">Start Over 🔄</button>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-sky-600 uppercase tracking-wider">Reading Comprehension</span>
        <span className="text-xs text-[var(--color-text-disabled)]">Text {index + 1}/{TEXTS.length} &middot; Q{qIndex + 1}/{text.questions.length}</span>
      </div>

      <div className="bg-sky-50 rounded-[var(--radius-lg)] p-4 mb-4">
        <div className="flex items-start gap-2">
          <p className="text-sm text-[var(--color-text-primary)] leading-relaxed flex-1">{text.text}</p>
          <SpeakerButton text={text.text} />
        </div>
        <button onClick={() => setShowTranslation(!showTranslation)} className="text-xs text-sky-600 hover:text-sky-700 font-medium mt-2">
          {showTranslation ? "Hide translation" : "Show translation"}
        </button>
        {showTranslation && <>
          <p className="text-xs text-[var(--color-text-secondary)] italic mt-1">{text.translation}</p>
          {text.ar && <span className="block font-arabic mt-1 text-xs text-[var(--color-text-secondary)] italic" lang="ar">{text.ar}</span>}
        </>}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={`${index}-${qIndex}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          <p className="text-sm font-medium text-[var(--color-text-primary)] mb-3">{question?.q}</p>
          <div className="space-y-2">
            {question?.options.map((opt, i) => {
              let style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] hover:border-[var(--color-primary)]";
              if (answered) {
                if (i === question.correct) style = "bg-[var(--color-success)] text-white border-[var(--color-success)] ring-2 ring-[var(--color-success)]";
                else if (i === selected) style = "bg-[var(--color-error)] text-white border-[var(--color-error)]";
                else style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] opacity-50";
              }
              return (
                <button key={i} onClick={() => handleAnswer(i)} disabled={answered}
                  className={`w-full text-left p-3 rounded-[var(--radius-lg)] border transition-all ${style}`}>
                  <span className="text-sm text-[var(--color-text-primary)]">{opt}</span>
                </button>
              );
            })}
          </div>
          {answered && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-3 flex items-center justify-between">
              <p className={`text-sm font-medium ${isCorrect ? "text-[var(--color-success)]" : "text-[var(--color-error)]"}`}>
                {isCorrect ? "✓ Correct!" : "✗ Wrong"}
              </p>
              <button onClick={next} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-4 py-1.5 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
                Next &rarr;
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
