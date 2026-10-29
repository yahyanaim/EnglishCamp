import type { InstructionChapter, InstructionSection } from "./types";
/** Paragraph boundaries are authored, never generated from target lengths or activity counts. */
export function section(title: string, text: string, check?: InstructionSection["check"]): InstructionSection {
  return { title, paragraphs: text.trim().split(/\n\s*\n/), ...(check ? { check } : {}) };
}
export function chapter(outcomes: string[], prerequisite: string, sections: InstructionSection[], application: string, mode: InstructionChapter["mode"] = "replace"): InstructionChapter {
  return { mode, outcomes, prerequisite, sections, application };
}
