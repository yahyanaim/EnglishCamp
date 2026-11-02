import { ARTICLES_BAND4_5 } from "./band4-5";
import { ARTICLES_BAND5_6 } from "./band5-6";
import { ARTICLES_BAND6_7 } from "./band6-7";
import { ARTICLES_BAND7_8 } from "./band7-8";
import { ADDITIONAL_READING_ARTICLES } from "./additional";
import type { ReadingArticle } from "../reading-articles";

export { type ReadingArticle } from "../reading-articles";

export const ALL_ARTICLES: ReadingArticle[] = [
  ...ADDITIONAL_READING_ARTICLES,
  ...ARTICLES_BAND4_5,
  ...ARTICLES_BAND5_6,
  ...ARTICLES_BAND6_7,
  ...ARTICLES_BAND7_8,
];

export const LEVELS = ["band4-5", "band5-6", "band6-7", "band7-8"] as const;

export const LEVEL_LABELS: Record<string, string> = {
  "band4-5": "Band 4-5",
  "band5-6": "Band 5-6",
  "band6-7": "Band 6-7",
  "band7-8": "Band 7-8+",
};

export const CATEGORIES = [
  "Technology", "Environment", "Health", "Education",
  "Science", "Society", "Work", "Economy", "Law",
] as const;
