import { generalInstruction } from "./general";
import { toeflInstruction } from "./toefl";
import { academicInstruction } from "./academic";
import { foundationInstruction } from "./foundation";
import { courseSupplements } from "./supplements";
import type { InstructionChapter } from "./types";
const authoredInstruction: Record<string, InstructionChapter> = { ...foundationInstruction, ...academicInstruction, ...toeflInstruction, ...generalInstruction };
/** Supplementary sections are appended after a chapter's authored sections; authored teaching is never replaced. */
export const courseInstruction: Record<string, InstructionChapter> = Object.fromEntries(Object.entries(authoredInstruction).map(([id, chapter]) => [id, courseSupplements[id] ? { ...chapter, sections: [...chapter.sections, ...courseSupplements[id]] } : chapter]));
