"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";

type Item = { clue: string; correct: string; options: string[]; explanation: string };

const ITEMS: Item[] = [
  { clue: "tooth + brush = ?", correct: "toothbrush", options: ["toothbrush", "brushtooth", "teethbrush", "toothbrushy"], explanation: "tooth + brush → toothbrush (object for cleaning teeth)" },
  { clue: "birth + day = ?", correct: "birthday", options: ["birthday", "daybirth", "birthsday", "birthdate"], explanation: "birth + day → birthday (anniversary of birth)" },
  { clue: "rain + bow = ?", correct: "rainbow", options: ["rainbow", "bowrain", "rainbows", "rainybow"], explanation: "rain + bow → rainbow (weather phenomenon)" },
  { clue: "sun + flower = ?", correct: "sunflower", options: ["sunflower", "flowersun", "sunflowery", "sunflour"], explanation: "sun + flower → sunflower (tall yellow flower)" },
  { clue: "bed + room = ?", correct: "bedroom", options: ["bedroom", "roombed", "bedrooms", "bedchamber"], explanation: "bed + room → bedroom (room for sleeping)" },
  { clue: "book + shelf = ?", correct: "bookshelf", options: ["bookshelf", "shelfbook", "bookshelves", "bookself"], explanation: "book + shelf → bookshelf (furniture for books)" },
  { clue: "foot + ball = ?", correct: "football", options: ["football", "ballfoot", "footballer", "football"], explanation: "foot + ball → football (sport/game)" },
  { clue: "fire + place = ?", correct: "fireplace", options: ["fireplace", "placefire", "firepit", "firering"], explanation: "fire + place → fireplace (structure for fire)" },
  { clue: "class + room = ?", correct: "classroom", options: ["classroom", "roomclass", "classrooms", "classyroom"], explanation: "class + room → classroom (room for lessons)" },
  { clue: "door + bell = ?", correct: "doorbell", options: ["doorbell", "belldoor", "doorbells", "doorbel"], explanation: "door + bell → doorbell (signals visitors)" },
  { clue: "hair + cut = ?", correct: "haircut", options: ["haircut", "cuthair", "haircuts", "haircutter"], explanation: "hair + cut → haircut (styling hair)" },
  { clue: "home + work = ?", correct: "homework", options: ["homework", "workhome", "schoolwork", "homeworks"], explanation: "home + work → homework (school assignments)" },
  { clue: "air + port = ?", correct: "airport", options: ["airport", "portair", "airplane", "airfield"], explanation: "air + port → airport (place for planes)" },
  { clue: "moon + light = ?", correct: "moonlight", options: ["moonlight", "lightmoon", "moonlite", "moonbeam"], explanation: "moon + light → moonlight (light from the moon)" },
  { clue: "note + book = ?", correct: "notebook", options: ["notebook", "booknote", "notepaper", "notebooks"], explanation: "note + book → notebook (paper for writing)" },
];

export function CompoundNounTrainer() {
  const { completeExercise } = useProgress();
  const { addError } = useErrors();
  const [pool, setPool] = useState<Item[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => { setPool([...ITEMS].sort(() => Math.random() - 0.5).slice(0, 12)); }, []);

  const current = pool[index];
  if (!current && !done) return null;

  function handleSelect(opt: string) {
    if (selected || !current) return;
    setSelected(opt);
    setTotal((t) => t + 1);
    if (opt === current.correct) { setScore((s) => s + 1); playCorrect(); completeExercise(`compound-${index}`, 10); }
    else { playWrong(); addError({ question: `Compound noun: "${current.clue}"`, userAnswer: opt, correctAnswer: current.correct, explanation: current.explanation, source: "compound", sourceId: `compound-${index}` }); }
  }

  function handleNext() {
    if (!current) return;
    if (index + 1 >= pool.length) { setDone(true); return; }
    setIndex((i) => i + 1); setSelected(null);
  }

  function handleRestart() {
    setPool([...ITEMS].sort(() => Math.random() - 0.5).slice(0, 12));
    setIndex(0); setSelected(null); setScore(0); setTotal(0); setDone(false);
  }

  if (done) {
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    return (
      <div className="text-center py-8">
        <span className="text-5xl block mb-3">{pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "💪"}</span>
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Compound Nouns Complete!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-primary-dark)] mb-1">{score}/{total} correct ({pct}%)</p>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">{pct >= 80 ? "Excellent compound skills!" : "Keep practicing!"}</p>
        <button onClick={handleRestart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">Play Again 🔄</button>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Compound Nouns</span>
        <span className="text-xs text-[var(--color-text-disabled)]">{index + 1}/{pool.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center mb-5">
          <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] p-4 border border-[var(--color-border-default)]">
            <p className="text-lg font-display font-extrabold text-[var(--color-text-primary)]">{current.clue}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {current.options.map((opt) => {
          let style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:bg-stone-50 hover:border-stone-300 hover:text-stone-700";
          if (selected) {
            if (opt === current.correct) style = "bg-[var(--color-success)] text-white border-[var(--color-success)] ring-2 ring-[var(--color-success)]";
            else if (opt === selected) style = "bg-[var(--color-error)] text-white border-[var(--color-error)]";
            else style = "opacity-40";
          }
          return (
            <button key={opt} onClick={() => handleSelect(opt)} disabled={!!selected} className={`text-sm font-medium px-4 py-3 rounded-[var(--radius-lg)] border-2 transition-all duration-200 ${style}`}>
              {opt}
            </button>
          );
        })}
      </div>

      {selected && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className={`text-sm font-medium mb-1 ${selected === current.correct ? "text-[var(--color-success)]" : "text-[var(--color-error)]"}`}>
            {selected === current.correct ? "✓ Correct! +10 XP" : `✗ Correct: ${current.correct}`}
          </p>
          <p className="text-xs text-[var(--color-text-disabled)] mb-3">{current.explanation}</p>
          <button onClick={handleNext} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
            {index + 1 >= pool.length ? "See Results" : "Next →"}
          </button>
        </motion.div>
      )}

      <div className="flex justify-center gap-1 mt-4">
        {pool.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-[var(--radius-pill)] ${i < index ? "bg-stone-300" : i === index ? "bg-stone-500" : "bg-[var(--color-border-default)]"}`} />
        ))}
      </div>
    </div>
  );
}
