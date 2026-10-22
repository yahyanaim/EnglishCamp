export type ReadingArticle = {
  id: string;
  title: string;
  level: "band4-5" | "band5-6" | "band6-7" | "band7-8";
  category: "Environment" | "Health" | "Economy" | "Education" | "Science" | "Society" | "Technology" | "Law" | "Work";
  paragraphs: { en: string; ar: string }[];
  vocabulary: { word: string; ar: string; def: string }[];
};
