"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeCard, PracticeButton } from "@/components/ui/PracticeSurface";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { playCorrect, playWrong, playXP } from "@/lib/audio";
import "./memory-match.css";

type Pair = { word: string; match: string };
type CardState = { id: string; text: string; type: "word" | "match"; flipped: boolean; matched: boolean };

/** English word ↔ Arabic meaning. Matching a word with itself taught nothing. */
const PAIRS: Pair[] = [
  { word: "apple", match: "تفاحة" }, { word: "book", match: "كتاب" }, { word: "cat", match: "قطة" },
  { word: "dog", match: "كلب" }, { word: "fish", match: "سمكة" }, { word: "house", match: "منزل" },
  { word: "tree", match: "شجرة" }, { word: "water", match: "ماء" }, { word: "school", match: "مدرسة" },
  { word: "friend", match: "صديق" }, { word: "love", match: "حب" }, { word: "time", match: "وقت" },
  { word: "door", match: "باب" }, { word: "window", match: "نافذة" }, { word: "bread", match: "خبز" },
  { word: "milk", match: "حليب" }, { word: "car", match: "سيارة" }, { word: "street", match: "شارع" },
  { word: "teacher", match: "معلّم" }, { word: "family", match: "عائلة" }, { word: "sun", match: "شمس" },
  { word: "moon", match: "قمر" }, { word: "rain", match: "مطر" }, { word: "city", match: "مدينة" },
];


export function MemoryMatchGame() {
  const { completeExercise } = useProgress();
  const [cards, setCards] = useState<CardState[]>([]);
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [matched, setMatched] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameDone, setGameDone] = useState(false);

  useEffect(() => {
    initGame();
  }, []);

  function initGame() {
    const selected = [...PAIRS].sort(() => Math.random() - 0.5).slice(0, 6);
    const cardList: CardState[] = [];
    for (const pair of selected) {
      cardList.push({ id: `word-${pair.word}`, text: pair.word, type: "word", flipped: false, matched: false });
      cardList.push({ id: `match-${pair.word}`, text: pair.match, type: "match", flipped: false, matched: false });
    }
    setCards(cardList.sort(() => Math.random() - 0.5));
    setFlippedIds([]);
    setMatched(0);
    setMoves(0);
    setGameDone(false);
  }

  function handleClick(id: string) {
    if (flippedIds.length === 2) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.flipped || card.matched) return;
    const updated = cards.map((c) => (c.id === id ? { ...c, flipped: true } : c));
    setCards(updated);
    const newFlipped = [...flippedIds, id];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped.map((fid) => updated.find((c) => c.id === fid)!);
      if (first.type !== second.type) {
        const word = first.type === "word" ? first : second, meaning = first.type === "word" ? second : first;
        if (PAIRS.some((p) => p.word === word.text && p.match === meaning.text)) {
          playCorrect();
          completeExercise(`memory-${word.text.toLowerCase()}`, 5);
          setTimeout(() => {
            setCards((prev) => prev.map((c) => (c.id === first.id || c.id === second.id ? { ...c, matched: true } : c)));
            setFlippedIds([]);
            setMatched((m) => m + 1);
          }, 400);
        } else {
          playWrong();
          setTimeout(() => {
            setCards((prev) => prev.map((c) => (c.id === first.id || c.id === second.id ? { ...c, flipped: false } : c)));
            setFlippedIds([]);
          }, 800);
        }
      } else {
        setTimeout(() => {
          setCards((prev) => prev.map((c) => (c.id === first.id || c.id === second.id ? { ...c, flipped: false } : c)));
          setFlippedIds([]);
        }, 600);
      }
    }
  }

  useEffect(() => {
    if (matched > 0 && matched === cards.length / 2 && cards.length > 0) {
      playXP();
      setGameDone(true);
    }
  }, [matched, cards.length]);

  return (
    <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[var(--camp-control-ink)] uppercase tracking-wider">Memory Match</span>
        <span className="text-xs text-[var(--color-text-secondary)]">Moves: {moves}</span>
      </div>

      {gameDone ? (
        <div className="text-center py-6">
          <LearningArt name="🎉" size={36} className=" block mb-3" />
          <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">You matched them all!</h3>
          <p className="text-sm text-[var(--color-text-secondary)] mb-1">{moves} moves</p>
          <PracticeButton onClick={initGame} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all mt-3">New Game <LearningArt name="🔄" size={16} /></PracticeButton>
        </div>
      ) : (
        <>
          <div className="camp-memory-grid" data-grid-free>
            {cards.map((card) => {
              const shown = card.flipped || card.matched;
              return (
                <PracticeButton
                  key={card.id}
                  onClick={() => handleClick(card.id)}
                  aria-label={shown ? card.text : "Hidden card"}
                  aria-pressed={shown}
                  disabled={card.matched}
                  className="camp-memory-card"
                  data-state={card.matched ? "matched" : card.flipped ? "open" : "closed"}
                >
                  <motion.span className="camp-memory-inner" animate={{ rotateY: shown ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <span className="camp-memory-face camp-memory-back" aria-hidden="true">?</span>
                    <span className="camp-memory-face camp-memory-front" lang={card.type === "match" ? "ar" : "en"} dir={card.type === "match" ? "rtl" : "ltr"}>{card.text}</span>
                  </motion.span>
                </PracticeButton>
              );
            })}
          </div>
          <p className="text-xs text-[var(--color-text-secondary)] text-center mt-3">Match each English word with its Arabic meaning</p>
        </>
      )}
    </PracticeCard>
  );
}
