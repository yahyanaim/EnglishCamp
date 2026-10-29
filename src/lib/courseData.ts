import { courseInstruction } from "@/data/course-instruction";
import { levels } from "@/data/content";
import { exercises } from "@/data/exercises";
import { courseCatalogue } from "@/data/course-catalogue";
import { courseEnrichment } from "@/data/course-enrichment";
import type { Block, Lesson } from "@/data/types";

/** Feed expanded teaching into the existing lesson blocks and renderer. */
function teachingLesson(lesson: Lesson): Lesson {
  const instruction = courseInstruction[lesson.id];
  if (!instruction) return lesson;
  const blocks: Block[] = [
    { kind: "callout", tone: "rule", title: "What you will learn", text: instruction.outcomes.join("\n") },
    { kind: "callout", tone: "note", title: "Before you begin", text: instruction.prerequisite },
  ];
  for (const section of instruction.sections) {
    blocks.push({ kind: "callout", tone: "rule", title: section.title, text: section.paragraphs[0] ?? "" });
    blocks.push(...section.paragraphs.slice(1).map(text => ({ kind: "p" as const, text })));
    if (section.table) blocks.push({ kind: "table", ...section.table });
    if (section.check) {
      blocks.push({ kind: "callout", tone: "tip", title: "Pause and apply", text: section.check.prompt });
      blocks.push({ kind: "callout", tone: "note", title: "Compare your reasoning", text: section.check.answer });
    }
  }
  if (instruction.mode === "extend") blocks.push(...lesson.blocks);
  blocks.push({ kind: "callout", tone: "tip", title: "Apply this in the practice lab", text: instruction.application });
  return { ...lesson, blocks };
}

/** Used only by server route entry points: serialize one selected module. */
export function getModuleData(lessonId: string, courseId?: string) {
  const level = levels.find(course => (!courseId || course.id === courseId) && course.lessons.some(lesson => lesson.id === lessonId));
  const lesson = level?.lessons.find(item => item.id === lessonId);
  const course = courseCatalogue.find(item => item.id === level?.id);
  return lesson && course ? { course, lesson: teachingLesson(lesson), exercises: exercises.filter(item => item.lessonId === lesson.id), enrichment: courseEnrichment[lesson.id] } : undefined;
}
