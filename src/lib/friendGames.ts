/** Play-with-a-friend games shared by link: Hangman duel and Crossword. The answers are scrambled so they are not readable in the URL. */
import { buildCrossword, type CrosswordWord } from "./crossword";

export type HangmanGame = { g: "hangman"; id: string; creator: string; word: string; hint: string; createdAt: string };
export type CrosswordGame = { g: "crossword"; id: string; creator: string; words: CrosswordWord[]; createdAt: string };
export type FriendGame = HangmanGame | CrosswordGame;

export const HANGMAN_MAX_WRONG = 6;
export const FRIEND_WORDS: CrosswordWord[] = [
  { answer: "HOUSE", clue: "A building where people live" }, { answer: "SCHOOL", clue: "A place where children learn" },
  { answer: "MONEY", clue: "What you use to buy things" }, { answer: "FRIEND", clue: "A person you like and trust" },
  { answer: "WATER", clue: "A clear liquid you drink" }, { answer: "TEACHER", clue: "A person who helps students learn" },
  { answer: "GARDEN", clue: "An outdoor area with plants and flowers" }, { answer: "KITCHEN", clue: "The room where you cook" },
  { answer: "WINDOW", clue: "You look through this glass in a wall" }, { answer: "FLOWER", clue: "The colourful part of a plant" },
  { answer: "CITY", clue: "A large town" }, { answer: "WEEK", clue: "Seven days" }, { answer: "YEAR", clue: "Twelve months" },
  { answer: "HOUR", clue: "Sixty minutes" }, { answer: "MUSIC", clue: "Songs and sounds you listen to" },
  { answer: "ANIMAL", clue: "A dog, a cat or a horse" }, { answer: "PLANET", clue: "Earth is one of these" },
  { answer: "BRIDGE", clue: "It goes over a river" }, { answer: "TRAIN", clue: "It runs on rails and carries passengers" },
  { answer: "MARKET", clue: "A place where people buy and sell food" }, { answer: "DOCTOR", clue: "A person who treats sick people" },
  { answer: "BREAD", clue: "Food made from flour, often eaten at breakfast" }, { answer: "ORANGE", clue: "A fruit and a colour" },
  { answer: "RIVER", clue: "Water that flows to the sea" }, { answer: "MOUNTAIN", clue: "A very high hill" },
  { answer: "TICKET", clue: "You buy this to travel by bus or train" }, { answer: "LETTER", clue: "You write it and post it" },
  { answer: "SUMMER", clue: "The hottest season" }, { answer: "WINTER", clue: "The coldest season" },
  { answer: "BEACH", clue: "Sand next to the sea" }, { answer: "CHAIR", clue: "You sit on it" }, { answer: "TABLE", clue: "You eat your meals at it" },
  { answer: "PENCIL", clue: "You write or draw with it and can erase it" }, { answer: "STREET", clue: "A road in a town with houses" },
  { answer: "HOLIDAY", clue: "Time off work or school" }, { answer: "BIRTHDAY", clue: "The day you were born, celebrated every year" },
  { answer: "WEATHER", clue: "Sun, rain, wind or snow" }, { answer: "HOSPITAL", clue: "A place where sick people are treated" },
  { answer: "AIRPORT", clue: "Where planes take off and land" }, { answer: "LIBRARY", clue: "A place where you borrow books" },
];

const random = (n: number) => Math.floor(Math.random() * n);
export const gameId = () => Math.random().toString(36).slice(2, 10);
export function pickWords(count: number, pool = FRIEND_WORDS) { const a = [...pool]; for (let i = a.length - 1; i > 0; i--) { const j = random(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a.slice(0, count); }
export const cleanWord = (value: string) => value.toUpperCase().replace(/[^A-Z]/g, "");
export const validHangmanWord = (value: string) => /^[A-Z]{3,14}$/.test(value);

/** XOR with the game id, so the answer is not plain text in the link. This is a spoiler guard, not security. */
function scramble(text: string, salt: string) {
  const bytes = new TextEncoder().encode(text), s = new TextEncoder().encode(salt || "x");
  return Array.from(bytes, (b, i) => (b ^ s[i % s.length]).toString(16).padStart(2, "0")).join("");
}
function unscramble(hex: string, salt: string) {
  if (!/^(?:[0-9a-f]{2})+$/.test(hex)) throw new Error("bad");
  const s = new TextEncoder().encode(salt || "x"), bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16) ^ s[i % s.length];
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}
const toBase64Url = (json: string) => btoa(Array.from(new TextEncoder().encode(json), b => String.fromCharCode(b)).join("")).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const fromBase64Url = (value: string) => new TextDecoder("utf-8", { fatal: true }).decode(Uint8Array.from(atob(value.replace(/-/g, "+").replace(/_/g, "/")), c => c.charCodeAt(0)));

export function encodeFriendGame(game: FriendGame) {
  const body = game.g === "hangman"
    ? { g: "hangman", id: game.id, c: game.creator, w: scramble(game.word, game.id), h: game.hint, t: game.createdAt }
    : { g: "crossword", id: game.id, c: game.creator, w: game.words.map(w => [scramble(w.answer, game.id), w.clue]), t: game.createdAt };
  return toBase64Url(JSON.stringify(body));
}

const text = (value: unknown, max: number): value is string => typeof value === "string" && value.length <= max;
export function decodeFriendGame(value: string | null): FriendGame | null {
  try {
    if (!value || value.length > 6000) return null;
    const input = JSON.parse(fromBase64Url(value));
    if (!input || !text(input.id, 40) || !input.id || !text(input.c, 60) || !text(input.t, 40)) return null;
    if (input.g === "hangman") {
      if (!text(input.w, 64) || !text(input.h, 120)) return null;
      const word = unscramble(input.w, input.id);
      return validHangmanWord(word) ? { g: "hangman", id: input.id, creator: input.c, word, hint: input.h, createdAt: input.t } : null;
    }
    if (input.g === "crossword") {
      if (!Array.isArray(input.w) || input.w.length < 3 || input.w.length > 10) return null;
      const words = input.w.map((pair: unknown) => {
        if (!Array.isArray(pair) || !text(pair[0], 40) || !text(pair[1], 120)) throw new Error("bad");
        const answer = unscramble(pair[0], input.id);
        if (!/^[A-Z]{2,14}$/.test(answer)) throw new Error("bad");
        return { answer, clue: pair[1] };
      });
      return { g: "crossword", id: input.id, creator: input.c, words, createdAt: input.t };
    }
    return null;
  } catch { return null; }
}

export function friendGameUrl(origin: string, game: FriendGame) { return `${origin}/challenge?g=${game.g}&d=${encodeFriendGame(game)}`; }

/** Tries several random word sets and keeps the one that places the most words in the smallest grid. Only placed words go in the link. */
export function makeCrosswordWords(count = 8, tries = 60): CrosswordWord[] {
  let best: { words: CrosswordWord[]; score: number; cols: number; placed: number } | null = null;
  for (let i = 0; i < tries; i++) {
    const words = pickWords(count), grid = buildCrossword(words), placed = new Set(grid.entries.map(e => e.answer));
    // Narrow grids (11 columns or fewer) keep every square easy to tap on a phone.
    const kept = words.filter(w => placed.has(w.answer)), narrow = grid.cols <= 11, area = grid.rows * grid.cols;
    const score = (narrow ? 1000 : 0) + kept.length * 100 - area / 10;
    if (!best || score > best.score) best = { words: kept, score, cols: grid.cols, placed: kept.length };
    if (narrow && best.placed >= 7 && area <= 120) break;
  }
  return best!.words;
}
