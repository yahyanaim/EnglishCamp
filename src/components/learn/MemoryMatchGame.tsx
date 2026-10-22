"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { playCorrect, playWrong, playXP } from "@/lib/audio";

type Pair = { word: string; match: string };
type CardState = { id: string; text: string; type: "word" | "match"; flipped: boolean; matched: boolean };

const PAIRS: Pair[] = [
  { word: "Apple", match: "Apple" }, { word: "Book", match: "Book" }, { word: "Cat", match: "Cat" },
  { word: "Dog", match: "Dog" }, { word: "Fish", match: "Fish" }, { word: "House", match: "House" },
  { word: "Tree", match: "Tree" }, { word: "Water", match: "Water" }, { word: "School", match: "School" },
  { word: "Friend", match: "Friend" }, { word: "Love", match: "Love" }, { word: "Time", match: "Time" },
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
      cardList.push({ id: `match-${pair.match}`, text: pair.match, type: "match", flipped: false, matched: false });
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
        const pair = PAIRS.find((p) => p.word === first.text || p.match === first.text || p.word === second.text || p.match === second.text);
        if (pair && ((first.text === pair.word && second.text === pair.match) || (first.text === pair.match && second.text === pair.word))) {
          playCorrect();
          completeExercise(`memory-${first.text}`, 5);
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
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[#E0115F] uppercase tracking-wider">Memory Match</span>
        <span className="text-xs text-[var(--color-text-disabled)]">Moves: {moves}</span>
      </div>

      {gameDone ? (
        <div className="text-center py-6">
          <span className="text-5xl block mb-3">🎉</span>
          <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">You matched them all!</h3>
          <p className="text-sm text-[var(--color-text-secondary)] mb-1">{moves} moves</p>
          <button onClick={initGame} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all mt-3">New Game 🔄</button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-2">
            {cards.map((card) => (
              <motion.button
                key={card.id}
                onClick={() => handleClick(card.id)}
                animate={{ rotateY: card.flipped || card.matched ? 180 : 0 }}
                className={`h-16 rounded-[var(--radius-lg)] border-2 text-sm font-semibold transition-all ${
                  card.matched
                    ? "bg-[var(--color-success)] text-white border-[var(--color-success)] cursor-default"
                    : card.flipped
                    ? "bg-[var(--color-primary-subtle)] border-[var(--color-primary)] text-[var(--color-primary-dark)]"
                    : "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] text-[var(--color-text-disabled)] hover:bg-[var(--color-surface-alt)] hover:border-[var(--color-primary)]"
                }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {card.flipped || card.matched ? card.text : "?"}
              </motion.button>
            ))}
          </div>
          <p className="text-xs text-[var(--color-text-disabled)] text-center mt-3">Match the word pairs</p>
        </>
      )}
    </div>
  );
}
