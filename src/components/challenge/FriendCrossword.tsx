"use client";
import { useMemo, useRef, useState } from "react";
import { CheckCircle2, Eraser } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";
import { buildCrossword, type CrosswordEntry } from "@/lib/crossword";
import type { CrosswordGame } from "@/lib/friendGames";

const cellKey = (r: number, c: number) => `${r}-${c}`;
const cellsOf = (e: CrosswordEntry) => Array.from({ length: e.answer.length }, (_, i) => [e.row + (e.dir === "down" ? i : 0), e.col + (e.dir === "across" ? i : 0)] as const);

/** Mots croisés: type in the grid, arrows move, the clue for the active word is shown above the grid. */
export function FriendCrossword({ game, onFinish }: { game: CrosswordGame; onFinish: (correct: number, total: number) => void }) {
  const puzzle = useMemo(() => buildCrossword(game.words), [game.words]);
  const [letters, setLetters] = useState<Record<string, string>>({});
  const [active, setActive] = useState<CrosswordEntry>(puzzle.entries[0]);
  const [checked, setChecked] = useState(false);
  const refs = useRef<Record<string, HTMLInputElement | null>>({});
  const numbers = useMemo(() => new Map(puzzle.entries.map(e => [cellKey(e.row, e.col), e.number])), [puzzle]);
  const solved = (e: CrosswordEntry) => cellsOf(e).every(([r, c], i) => (letters[cellKey(r, c)] ?? "") === e.answer[i]);
  const correct = puzzle.entries.filter(solved).length, filled = Object.values(letters).filter(Boolean).length;
  const totalCells = puzzle.cells.flat().filter(Boolean).length;
  const activeCells = new Set(cellsOf(active).map(([r, c]) => cellKey(r, c)));
  const focus = (r: number, c: number) => refs.current[cellKey(r, c)]?.focus();
  const entryAt = (r: number, c: number, prefer: "across" | "down") => {
    const matches = puzzle.entries.filter(e => cellsOf(e).some(([er, ec]) => er === r && ec === c));
    return matches.find(e => e.dir === prefer) ?? matches[0];
  };
  function move(r: number, c: number, dr: number, dc: number) {
    let nr = r + dr, nc = c + dc;
    while (nr >= 0 && nc >= 0 && nr < puzzle.rows && nc < puzzle.cols) { if (puzzle.cells[nr][nc]) { focus(nr, nc); return; } nr += dr; nc += dc; }
  }
  function type(r: number, c: number, value: string) {
    const letter = value.toUpperCase().replace(/[^A-Z]/g, "").slice(-1);
    setChecked(false);
    setLetters(l => ({ ...l, [cellKey(r, c)]: letter }));
    if (letter) active.dir === "across" ? move(r, c, 0, 1) : move(r, c, 1, 0);
  }
  const choose = (e: CrosswordEntry) => { setActive(e); focus(e.row, e.col); };

  return (
    <section className="camp-fg-card camp-fg-crossword" aria-label="Crossword" style={{ ["--cw-cols" as string]: String(puzzle.cols) }}>
      <p className="camp-fg-clue-now" aria-live="polite"><b>{active.number} {active.dir === "across" ? "Across" : "Down"}</b>{active.clue}<small>{active.answer.length} letters</small></p>
      <div className="camp-fg-grid-wrap">
        <div className="camp-fg-grid" style={{ gridTemplateColumns: `repeat(${puzzle.cols}, var(--cw-cell))` }} role="group" aria-label={`Crossword grid, ${puzzle.rows} rows by ${puzzle.cols} columns`}>
          {puzzle.cells.map((row, r) => row.map((answer, c) => {
            const k = cellKey(r, c);
            if (!answer) return <span key={k} className="camp-fg-block" aria-hidden="true" />;
            const value = letters[k] ?? "", state = checked && value ? (value === answer ? "right" : "wrong") : undefined;
            return (
              <label key={k} className="camp-fg-cell" data-num={numbers.get(k)} data-active={activeCells.has(k)} data-state={state}>
                <input ref={el => { refs.current[k] = el; }} value={value} maxLength={2} inputMode="text" autoCapitalize="characters" autoComplete="off" spellCheck={false}
                  aria-label={`Row ${r + 1}, column ${c + 1}${numbers.has(k) ? `, clue ${numbers.get(k)}` : ""}`}
                  onFocus={() => { if (!activeCells.has(k)) setActive(entryAt(r, c, active.dir)); }}
                  onClick={() => { if (activeCells.has(k)) { const other = entryAt(r, c, active.dir === "across" ? "down" : "across"); if (other && other !== active) setActive(other); } }}
                  onChange={event => type(r, c, event.target.value)}
                  onKeyDown={event => {
                    if (event.key === "ArrowRight") { event.preventDefault(); move(r, c, 0, 1); }
                    else if (event.key === "ArrowLeft") { event.preventDefault(); move(r, c, 0, -1); }
                    else if (event.key === "ArrowDown") { event.preventDefault(); move(r, c, 1, 0); }
                    else if (event.key === "ArrowUp") { event.preventDefault(); move(r, c, -1, 0); }
                    else if (event.key === "Backspace" && !value) { event.preventDefault(); active.dir === "across" ? move(r, c, 0, -1) : move(r, c, -1, 0); }
                  }} />
              </label>
            );
          }))}
        </div>
      </div>
      <div className="camp-fg-clues">
        {(["across", "down"] as const).map(dir => {
          const list = puzzle.entries.filter(e => e.dir === dir);
          return list.length ? (
            <div key={dir}>
              <h2>{dir === "across" ? "Across" : "Down"}</h2>
              <ol>{list.map(e => <li key={`${e.dir}-${e.number}`}><button type="button" aria-pressed={active === e} data-solved={checked && solved(e)} onClick={() => choose(e)}><b>{e.number}</b><span>{e.clue}</span><small>({e.answer.length})</small></button></li>)}</ol>
            </div>
          ) : null;
        })}
      </div>
      <div className="camp-fg-actions">
        <p role="status">{checked ? `${correct} of ${puzzle.entries.length} words correct` : `${filled} of ${totalCells} letters filled`}</p>
        <Button variant="outline" size="sm" onClick={() => { setLetters({}); setChecked(false); }}><Eraser size={15} aria-hidden="true" />Clear grid</Button>
        <Button variant="outline" size="sm" disabled={!filled} onClick={() => setChecked(true)}>Check letters</Button>
        <Button size="sm" disabled={!filled} onClick={() => { setChecked(true); onFinish(correct, puzzle.entries.length); }}><CheckCircle2 size={15} aria-hidden="true" />Finish</Button>
      </div>
    </section>
  );
}
