import type { CourseSummary } from "@/data/course-catalogue";

export type LessonNote = { lessonId: string; title: string; text: string; courseId: string; courseTitle: string; moduleNumber?: number; href?: string };
/** Preserve legacy/unknown entries instead of dropping notes absent from the current catalogue. */
export function organiseLessonNotes(notes: Record<string, string>, courses: CourseSummary[], query = ""): LessonNote[] {
  const known = new Map(courses.flatMap(course => course.lessons.map(lesson => [lesson.id, { title: lesson.title, courseId: course.id, courseTitle: course.title, moduleNumber: lesson.moduleNumber, href: `/levels/${course.id}/lessons/${lesson.id}#video-lesson` }] as const)));
  const needle = query.trim().toLocaleLowerCase();
  const order = new Map<string, number>(courses.map((course, index) => [course.id, index]));
  return Object.entries(notes).filter(([, text]) => typeof text === "string" && text.trim()).map<LessonNote>(([lessonId, text]) => ({ lessonId, text, ...(known.get(lessonId) ?? { title: lessonId, courseId: "other", courseTitle: "Other saved lessons" }) })).filter(note => !needle || `${note.title} ${note.courseTitle} ${note.text}`.toLocaleLowerCase().includes(needle)).sort((a, b) => (order.get(a.courseId) ?? 999) - (order.get(b.courseId) ?? 999) || (a.moduleNumber ?? 999) - (b.moduleNumber ?? 999) || a.title.localeCompare(b.title));
}
