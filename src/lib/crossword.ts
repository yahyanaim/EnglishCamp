/** Small, deterministic crossword builder for the friend game: the same word list always gives the same grid. */
export type CrosswordWord = { answer: string; clue: string };
export type CrosswordEntry = CrosswordWord & { number: number; dir: "across" | "down"; row: number; col: number };
export type Crossword = { rows: number; cols: number; entries: CrosswordEntry[]; cells: (string | null)[][] };

type Placed = CrosswordWord & { row: number; col: number; dir: "across" | "down" };
const key = (r: number, c: number) => `${r},${c}`;
const step = (dir: "across" | "down") => (dir === "across" ? [0, 1] : [1, 0]);

/** Returns the number of crossings, or -1 when the word cannot sit there without touching other words. */
function fit(grid: Map<string, string>, word: string, row: number, col: number, dir: "across" | "down") {
  const [dr, dc] = step(dir);
  if (grid.has(key(row - dr, col - dc)) || grid.has(key(row + dr * word.length, col + dc * word.length))) return -1;
  let crossings = 0;
  for (let i = 0; i < word.length; i++) {
    const r = row + dr * i, c = col + dc * i, existing = grid.get(key(r, c));
    if (existing) { if (existing !== word[i]) return -1; crossings++; continue; }
    // A new letter must not sit beside another word's letter (that would form an unintended word).
    if (grid.has(key(r + dc, c + dr)) || grid.has(key(r - dc, c - dr))) return -1;
  }
  return crossings;
}

export function buildCrossword(words: CrosswordWord[]): Crossword {
  const clean = words
    .map(w => ({ answer: w.answer.toUpperCase().replace(/[^A-Z]/g, ""), clue: w.clue.trim() }))
    .filter(w => w.answer.length >= 2);
  const grid = new Map<string, string>(), placed: Placed[] = [];
  const put = (w: CrosswordWord, row: number, col: number, dir: "across" | "down") => {
    const [dr, dc] = step(dir);
    for (let i = 0; i < w.answer.length; i++) grid.set(key(row + dr * i, col + dc * i), w.answer[i]);
    placed.push({ ...w, row, col, dir });
  };
  clean.forEach((word, index) => {
    if (index === 0) { put(word, 0, 0, "across"); return; }
    let best: { row: number; col: number; dir: "across" | "down"; score: number } | null = null;
    for (const [cell, letter] of Array.from(grid.entries())) {
      const [r, c] = cell.split(",").map(Number);
      for (let i = 0; i < word.answer.length; i++) {
        if (word.answer[i] !== letter) continue;
        for (const dir of ["down", "across"] as const) {
          const [dr, dc] = step(dir), row = r - dr * i, col = c - dc * i;
          const crossings = fit(grid, word.answer, row, col, dir);
          if (crossings < 1) continue;
          // Prefer more crossings, then a compact grid close to the start.
          const score = crossings * 100 - (Math.abs(row) + Math.abs(col));
          if (!best || score > best.score) best = { row, col, dir, score };
        }
      }
    }
    if (best) put(word, best.row, best.col, best.dir);
  });
  const minRow = Math.min(...placed.map(p => p.row)), minCol = Math.min(...placed.map(p => p.col));
  const shifted = placed.map(p => ({ ...p, row: p.row - minRow, col: p.col - minCol }));
  const rows = Math.max(...shifted.map(p => p.row + (p.dir === "down" ? p.answer.length : 1))), cols = Math.max(...shifted.map(p => p.col + (p.dir === "across" ? p.answer.length : 1)));
  const cells: (string | null)[][] = Array.from({ length: rows }, () => Array<string | null>(cols).fill(null));
  for (const p of shifted) { const [dr, dc] = step(p.dir); for (let i = 0; i < p.answer.length; i++) cells[p.row + dr * i][p.col + dc * i] = p.answer[i]; }
  const starts = Array.from(new Set(shifted.map(p => key(p.row, p.col)))).map(k => k.split(",").map(Number)).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const numberOf = new Map(starts.map(([r, c], i) => [key(r, c), i + 1]));
  const entries = shifted.map(p => ({ ...p, number: numberOf.get(key(p.row, p.col))! })).sort((a, b) => (a.dir === b.dir ? a.number - b.number : a.dir === "across" ? -1 : 1));
  return { rows, cols, entries, cells };
}
