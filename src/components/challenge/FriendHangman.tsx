"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Lightbulb, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";
import { SpeakerButton } from "@/components/ui/SpeakerButton";
import { HANGMAN_MAX_WRONG, type HangmanGame } from "@/lib/friendGames";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/** The gallows drawing grows one part per wrong letter. */
function Gallows({ wrong }: { wrong: number }) {
  const parts = [
    <circle key="head" cx="140" cy="62" r="16" />,
    <line key="body" x1="140" y1="78" x2="140" y2="128" />,
    <line key="arm-l" x1="140" y1="92" x2="118" y2="112" />,
    <line key="arm-r" x1="140" y1="92" x2="162" y2="112" />,
    <line key="leg-l" x1="140" y1="128" x2="122" y2="158" />,
    <line key="leg-r" x1="140" y1="128" x2="158" y2="158" />,
  ];
  return (
    <svg className="camp-fg-gallows" viewBox="0 0 200 190" role="img" aria-label={`${wrong} of ${HANGMAN_MAX_WRONG} wrong guesses`}>
      <g className="camp-fg-frame"><line x1="20" y1="180" x2="120" y2="180" /><line x1="50" y1="180" x2="50" y2="20" /><line x1="50" y1="20" x2="140" y2="20" /><line x1="140" y1="20" x2="140" y2="46" /></g>
      <g className="camp-fg-figure">{parts.slice(0, wrong)}</g>
    </svg>
  );
}

export function FriendHangman({ game, onFinish }: { game: HangmanGame; onFinish: (won: boolean, wrong: number) => void }) {
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [hint, setHint] = useState(false);
  const letters = useMemo(() => new Set(game.word.split("")), [game.word]);
  const wrong = Array.from(guessed).filter(l => !letters.has(l)).length;
  const won = Array.from(letters).every(l => guessed.has(l)), lost = wrong >= HANGMAN_MAX_WRONG, over = won || lost;
  useEffect(() => { if (over) onFinish(won, wrong); }, [over]); // eslint-disable-line react-hooks/exhaustive-deps
  const guess = useCallback((letter: string) => { if (!over) setGuessed(g => (g.has(letter) ? g : new Set(g).add(letter))); }, [over]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if ((event.target as HTMLElement | null)?.closest?.("input,textarea,select")) return;
      const letter = event.key.toUpperCase();
      if (/^[A-Z]$/.test(letter)) { event.preventDefault(); guess(letter); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [guess]);

  return (
    <section className="camp-fg-card camp-fg-hangman" aria-label="Hangman">
      <div className="camp-fg-hangman-top">
        <Gallows wrong={wrong} />
        <div className="camp-fg-hangman-side">
          <p className="camp-fg-lives" aria-live="polite"><strong>{HANGMAN_MAX_WRONG - wrong}</strong> {HANGMAN_MAX_WRONG - wrong === 1 ? "try" : "tries"} left</p>
          <div className="camp-fg-lives-bar" aria-hidden="true">{Array.from({ length: HANGMAN_MAX_WRONG }, (_, i) => <span key={i} data-used={i < wrong} />)}</div>
          {game.hint ? (hint ? <p className="camp-fg-hint"><Lightbulb size={16} aria-hidden="true" />{game.hint}</p> : <Button variant="outline" size="sm" onClick={() => setHint(true)}><Lightbulb size={15} aria-hidden="true" />Show the hint</Button>) : <p className="camp-fg-hint-none">No hint for this word.</p>}
        </div>
      </div>
      <p className="camp-fg-word">
        <span className="sr-only" aria-live="polite">{over ? `The word was ${game.word}` : `Word with ${game.word.length} letters: ${game.word.split("").map(l => (guessed.has(l) ? l : "blank")).join(", ")}`}</span>
        {game.word.split("").map((l, i) => <span key={i} aria-hidden="true" data-shown={guessed.has(l) || over} data-missed={over && !guessed.has(l)}>{guessed.has(l) || over ? l : ""}</span>)}
      </p>
      {over ? (
        <div className={`camp-fg-result`} data-won={won} role="status">
          <strong>{won ? "You found it! 🎉" : "Out of tries"}</strong>
          <span>The word was <b>{game.word}</b> <SpeakerButton text={game.word.toLowerCase()} /></span>
        </div>
      ) : (
        <div className="camp-fg-keyboard" role="group" aria-label="Choose a letter (you can also type)">
          {LETTERS.map(letter => {
            const used = guessed.has(letter), state = !used ? undefined : letters.has(letter) ? "hit" : "miss";
            return <button key={letter} type="button" data-state={state} disabled={used} aria-label={`Letter ${letter}${state ? (state === "hit" ? ", in the word" : ", not in the word") : ""}`} onClick={() => guess(letter)}>{letter}</button>;
          })}
        </div>
      )}
      {!over && guessed.size > 0 && <Button variant="ghost" size="sm" className="camp-fg-restart" onClick={() => { setGuessed(new Set()); setHint(false); }}><RotateCcw size={14} aria-hidden="true" />Start this word again</Button>}
    </section>
  );
}
