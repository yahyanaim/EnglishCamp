import { generalInstruction } from "./general";
import { toeflInstruction } from "./toefl";
import { academicInstruction } from "./academic";
import { foundationInstruction } from "./foundation";
import type { InstructionChapter } from "./types";
export const courseInstruction: Record<string, InstructionChapter> = { ...foundationInstruction, ...academicInstruction, ...toeflInstruction, ...generalInstruction };
