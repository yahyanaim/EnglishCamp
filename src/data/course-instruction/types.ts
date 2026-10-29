/** Teaching content only. Activity prompts, signatures and saved attempts remain independent. */
export type InstructionSection = {
  title: string;
  paragraphs: string[];
  table?: { headers: string[]; rows: string[][] };
  check?: { prompt: string; answer: string };
};
export type InstructionChapter = {
  mode: "replace" | "extend";
  outcomes: string[];
  prerequisite: string;
  sections: InstructionSection[];
  application: string;
};
