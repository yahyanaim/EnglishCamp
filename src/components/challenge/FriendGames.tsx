"use client";
import { useState } from "react";
import { Check, Copy, Grid3x3, Puzzle, RefreshCw, Share2, Shuffle, Trophy } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";
import { useSessionProfile } from "@/components/session/SessionProvider";
import { useProgress } from "@/store/useProgress";
import { cleanWord, friendGameUrl, gameId, makeCrosswordWords, pickWords, validHangmanWord, type FriendGame } from "@/lib/friendGames";
import { FriendHangman } from "./FriendHangman";
import { FriendCrossword } from "./FriendCrossword";

function ShareBox({ url, label }: { url: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => { try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2500); } catch { setCopied(false); } };
  const canShare = typeof navigator !== "undefined" && typeof navigator.share === "function";
  return (
    <div className="camp-fg-share">
      <label>{label}<input readOnly value={url} onFocus={event => event.target.select()} /></label>
      <div>
        <Button size="sm" onClick={() => void copy()}>{copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}{copied ? "Link copied" : "Copy link"}</Button>
        {canShare && <Button size="sm" variant="outline" onClick={() => void navigator.share({ title: "EnglishCamp game", text: "Can you beat my English game?", url }).catch(() => {})}><Share2 size={15} aria-hidden="true" />Share</Button>}
      </div>
    </div>
  );
}

/** Create Hangman and Crossword games to send to a friend. */
export function FriendGameCreator() {
  const { profile } = useSessionProfile();
  const creator = profile?.name?.slice(0, 60) || "A friend";
  const [word, setWord] = useState(""), [hint, setHint] = useState(""), [hangmanUrl, setHangmanUrl] = useState(""), [wordError, setWordError] = useState("");
  const [crosswordUrl, setCrosswordUrl] = useState(""), [crosswordCount, setCrosswordCount] = useState(0);
  const createHangman = (random: boolean) => {
    const pick = random ? pickWords(1)[0] : null, secret = pick ? pick.answer : cleanWord(word);
    if (!validHangmanWord(secret)) { setWordError("Use 3 to 14 English letters (A–Z), no spaces."); return; }
    setWordError("");
    setHangmanUrl(friendGameUrl(window.location.origin, { g: "hangman", id: gameId(), creator, word: secret, hint: (pick ? pick.clue : hint.trim()).slice(0, 120), createdAt: new Date().toISOString() }));
    if (random) { setWord(""); setHint(""); }
  };
  const createCrossword = () => {
    const words = makeCrosswordWords();
    setCrosswordCount(words.length);
    setCrosswordUrl(friendGameUrl(window.location.origin, { g: "crossword", id: gameId(), creator, words, createdAt: new Date().toISOString() }));
  };
  return (
    <section className="camp-fg-create" aria-labelledby="friend-games-heading">
      <div className="camp-fg-create-head"><h2 id="friend-games-heading">More games to play with a friend</h2><p>Create a game, send the link, and see if your friend can solve it.</p></div>
      <div className="camp-fg-create-grid">
        <article className="camp-fg-game">
          <header><span className="camp-fg-game-icon" aria-hidden="true"><Puzzle size={22} /></span><div><h3>Hangman duel</h3><p>Choose a secret English word. Your friend guesses it letter by letter with 6 tries.</p></div></header>
          <label className="camp-fg-field">Secret word<input value={word} maxLength={14} autoComplete="off" autoCapitalize="characters" spellCheck={false} aria-invalid={!!wordError} aria-describedby={wordError ? "fg-word-error" : undefined} onChange={e => setWord(e.target.value)} placeholder="e.g. HOLIDAY" /></label>
          <label className="camp-fg-field">Hint <small>(optional)</small><input value={hint} maxLength={120} onChange={e => setHint(e.target.value)} placeholder="e.g. Time off work or school" /></label>
          {wordError && <p id="fg-word-error" role="alert" className="camp-fg-error">{wordError}</p>}
          <div className="camp-fg-game-actions"><Button disabled={!word.trim()} onClick={() => createHangman(false)}>Create link</Button><Button variant="outline" onClick={() => createHangman(true)}><Shuffle size={15} aria-hidden="true" />Random word</Button></div>
          {hangmanUrl && <ShareBox url={hangmanUrl} label="Hangman link" />}
        </article>
        <article className="camp-fg-game">
          <header><span className="camp-fg-game-icon" aria-hidden="true"><Grid3x3 size={22} /></span><div><h3>Crossword · mots croisés</h3><p>A new crossword of everyday English words with easy clues. Your friend fills in the grid.</p></div></header>
          <ul className="camp-fg-points"><li>7–8 words, across and down</li><li>English clues, A1–A2 level</li><li>Your friend can check letters before finishing</li></ul>
          <div className="camp-fg-game-actions"><Button onClick={createCrossword}>{crosswordUrl ? <RefreshCw size={15} aria-hidden="true" /> : null}{crosswordUrl ? "Make another crossword" : "Create crossword link"}</Button></div>
          {crosswordUrl && <ShareBox url={crosswordUrl} label={`Crossword link · ${crosswordCount} words`} />}
        </article>
      </div>
    </section>
  );
}

/** Plays a game opened from a friend's link and awards XP once at the end. */
export function FriendGamePlay({ game, onNew }: { game: FriendGame; onNew: () => void }) {
  const addXP = useProgress(state => state.addXP);
  const [result, setResult] = useState<{ text: string; xp: number } | null>(null);
  const title = game.g === "hangman" ? "Hangman duel" : "Crossword · mots croisés";
  const finish = (text: string, xp: number) => { if (result) return; if (xp > 0) addXP(xp); setResult({ text, xp }); };
  return (
    <div className="camp-fg-play space-y-5">
      <header className="camp-fg-play-head">
        <span className="camp-fg-game-icon" aria-hidden="true">{game.g === "hangman" ? <Puzzle size={24} /> : <Grid3x3 size={24} />}</span>
        <div><p className="camp-fg-eyebrow">Game from {game.creator}</p><h1>{title}</h1><p>{game.g === "hangman" ? `Guess the ${game.word.length}-letter word before the drawing is complete.` : `Solve ${game.words.length} words. Click a clue or a square, then type.`}</p></div>
      </header>
      {game.g === "hangman"
        ? <FriendHangman game={game} onFinish={(won, wrong) => finish(won ? `Solved with ${wrong} wrong ${wrong === 1 ? "guess" : "guesses"}` : "Not solved this time", won ? 10 + (6 - wrong) * 2 : 2)} />
        : <FriendCrossword game={game} onFinish={(correct, total) => finish(`${correct} of ${total} words correct`, correct * 5)} />}
      {result && (
        <section className="camp-fg-done" role="status">
          <Trophy size={28} aria-hidden="true" />
          <div><strong>{result.text}</strong><span>+{result.xp} XP added to your progress</span></div>
          <Button onClick={onNew}>Send a game back</Button>
        </section>
      )}
    </div>
  );
}
