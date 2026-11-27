import { courseCatalogue } from '@/data/course-catalogue';
import { ROUTE_LESSONS, routeLessonExerciseId } from '@/data/route-lessons';
import type { PlacementLevel } from '@/data/placement/questions';
import type { RouteComponent } from './sixMonthRouteData';

/**
 * Which EnglishCamp lessons each month of the 6-month route uses.
 * B2 and above use the existing course modules; A2 Key and B1 Preliminary routes use the route lessons
 * (the courses start at B2, so those lessons were written to fill that gap).
 */
type Ref = { course: string; id: string; component: RouteComponent } | { route: string };
const c = (course: string, component: RouteComponent, ...ids: string[]): Ref[] => ids.map(id => ({ course, id, component }));
const r = (...ids: string[]): Ref[] => ids.map(route => ({ route }));
const B2F = 'band4-5', ACAD = 'band5-6', TOEFL = 'band6-7', HIGH = 'band7-8';
const routeByPhase = (target: 'A2' | 'B1') => [1, 2, 3, 4, 5, 6].map(phase => r(...ROUTE_LESSONS.filter(l => l.target === target && l.phase === phase).map(l => l.id)));

const C2_PLAN: Ref[][] = [
  c(HIGH, 'language', 'band4-grammar-inversion', 'band4-grammar-participles', 'band4-vocab-awl4'),
  c(HIGH, 'language', 'band4-writing-lexical-resource', 'band4-vocab-idioms', 'band4-vocab-science', 'band4-vocab-globalization'),
  [...c(HIGH, 'reading', 'band4-reading-writers-views', 'band4-reading-difficult-texts'), ...c(HIGH, 'listening', 'band4-listening-inference', 'band4-listening-distractors')],
  [...c(HIGH, 'writing', 'band4-writing-sophisticated', 'band4-writing-complex-ideas', 'band4-writing-band8-essay'), ...c(HIGH, 'speaking', 'band4-speaking-storytelling', 'band4-speaking-abstract-topics', 'band4-speaking-pronunciation')],
  [...c(HIGH, 'reading', 'band4-reading-time-pressure', 'band4-writing-complex-comparisons', 'band4-mock-toefl-reading'), ...c(HIGH, 'listening', 'band4-mock-ielts-listening')],
  c(HIGH, 'language', 'band4-exam-day-strategies', 'band4-review'),
];

export const ROUTE_COURSE_PLAN: Record<Exclude<PlacementLevel, 'A1'>, Ref[][]> = {
  A2: routeByPhase('A2'),
  B1: routeByPhase('B1'),
  B2: [
    [...r('b1-present-perfect', 'b1-opinions', 'b1-conditionals'), ...c(B2F, 'language', 'band1-ielts-vs-toefl', 'band1-grammar-articles')],
    c(B2F, 'language', 'band1-ielts-intro', 'band1-toefl-intro', 'band1-grammar-agreement', 'band1-vocab-awl1', 'band1-vocab-synonyms'),
    [...c(B2F, 'reading', 'band1-reading-skimming', 'band1-reading-scanning', 'band1-reading-completion'), ...c(B2F, 'listening', 'band1-listening-format', 'band1-listening-gist', 'band1-listening-attitude')],
    [...c(B2F, 'writing', 'band1-writing-task1-overview', 'band1-writing-trends', 'band1-writing-integrated', 'band1-writing-essay-structure', 'band1-writing-brainstorming'), ...c(B2F, 'speaking', 'band1-speaking-part1-intro', 'band1-speaking-independent', 'band1-speaking-hometown')],
    [...c(B2F, 'reading', 'band1-time-reading'), ...c(B2F, 'writing', 'band1-time-writing'), ...c(B2F, 'listening', 'band1-practice-listening')],
    c(B2F, 'language', 'band1-review'),
  ],
  C1: [
    c(ACAD, 'language', 'band2-grammar-tenses', 'band2-grammar-complex', 'band2-vocab-collocations'),
    c(HIGH, 'language', 'band4-grammar-inversion', 'band4-grammar-participles', 'band4-vocab-awl4', 'band4-writing-lexical-resource'),
    [...c(HIGH, 'reading', 'band4-reading-writers-views', 'band4-reading-difficult-texts'), ...c(HIGH, 'listening', 'band4-listening-accents', 'band4-listening-inference')],
    [...c(HIGH, 'writing', 'band4-writing-complex-ideas', 'band4-writing-grammatical-range'), ...c(ACAD, 'writing', 'band2-writing-opinion'), ...c(HIGH, 'speaking', 'band4-speaking-abstract-topics', 'band4-speaking-pronunciation'), ...c(ACAD, 'speaking', 'band2-speaking-integrated')],
    [...c(HIGH, 'reading', 'band4-reading-time-pressure'), ...c(HIGH, 'listening', 'band4-listening-distractors'), ...c(HIGH, 'language', 'band4-vocab-idioms'), ...c(TOEFL, 'writing', 'band3-error-analysis')],
    c(HIGH, 'language', 'band4-exam-day-strategies', 'band4-review'),
  ],
  C2: C2_PLAN,
};

export type RouteCourseLesson = { key: string; kind: 'course' | 'route'; title: string; href: string; component: RouteComponent; course: { id: string; title: string }; progressKey: string };
export const ROUTE_LESSON_COURSE = { id: 'route', title: 'EnglishCamp route lessons' };

export function routeCourseLessons(target: PlacementLevel, phase: number): RouteCourseLesson[] {
  const plan = ROUTE_COURSE_PLAN[target === 'A1' ? 'A2' : target][phase - 1] ?? [];
  return plan.map(ref => {
    if ('route' in ref) {
      const lesson = ROUTE_LESSONS.find(l => l.id === ref.route);
      if (!lesson) throw new Error(`Unknown route lesson ${ref.route}`);
      return { key: `route:${lesson.id}`, kind: 'route', title: lesson.title, href: `/study-plan/lesson/${lesson.id}`, component: lesson.component, course: ROUTE_LESSON_COURSE, progressKey: routeLessonExerciseId(lesson.id) };
    }
    const course = courseCatalogue.find(x => x.id === ref.course), lesson = course?.lessons.find(l => l.id === ref.id);
    if (!course || !lesson) throw new Error(`Unknown course lesson ${ref.course}/${ref.id}`);
    return { key: `course:${lesson.id}`, kind: 'course', title: lesson.title, href: `/levels/${course.id}/lessons/${lesson.id}`, component: ref.component, course: { id: course.id, title: course.title }, progressKey: lesson.id };
  });
}

/** The courses a route draws on, with how many of their lessons it uses. */
export function routeCourses(target: PlacementLevel) {
  const all = [1, 2, 3, 4, 5, 6].flatMap(phase => routeCourseLessons(target, phase));
  const byCourse = new Map<string, { id: string; title: string; lessons: RouteCourseLesson[] }>();
  for (const lesson of all) {
    const entry = byCourse.get(lesson.course.id) ?? { ...lesson.course, lessons: [] };
    entry.lessons.push(lesson); byCourse.set(lesson.course.id, entry);
  }
  return Array.from(byCourse.values()).map(entry => ({ ...entry, total: courseCatalogue.find(x => x.id === entry.id)?.lessons.length ?? entry.lessons.length }));
}
