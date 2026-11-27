import type { PlacementLevel } from '@/data/placement/questions';
// Kept in src/lib (not src/data) so these planning labels are not added to the speech catalogue.

/**
 * Six-month route after the CEFR check. Original EnglishCamp sequence, informed by:
 * - Cambridge English: about 200 guided learning hours to move up one CEFR level; exam formats and weightings.
 * - British Council – EAQUALS Core Inventory for General English: functions, grammar, discourse markers and topics per level.
 * It is a study plan, not an official syllabus or a guarantee of an exam result.
 */
export type RouteComponent = 'language' | 'reading' | 'listening' | 'speaking' | 'writing';
export const ROUTE_COMPONENTS: RouteComponent[] = ['language', 'reading', 'listening', 'speaking', 'writing'];
export const ROUTE_COMPONENT_LABEL: Record<RouteComponent, string> = { language: 'Grammar & vocabulary', reading: 'Reading', listening: 'Listening', speaking: 'Speaking', writing: 'Writing' };

export const ROUTE_WEEKS = 26;
export const HOURS_PER_LEVEL = 200;

export type RouteExam = { name: string; level: PlacementLevel; papers: string; weights: Record<RouteComponent, number>; href: string; note?: string };
const equalFive = { language: 20, reading: 20, listening: 20, speaking: 20, writing: 20 };
/** Keyed by the TARGET level: the Cambridge English Qualification at that CEFR level. */
export const ROUTE_EXAMS: Record<Exclude<PlacementLevel, 'A1'>, RouteExam> = {
  A2: { name: 'A2 Key', level: 'A2', papers: 'Reading & Writing 50% · Listening 25% · Speaking 25%', weights: { language: 10, reading: 22.5, writing: 22.5, listening: 22.5, speaking: 22.5 }, href: 'https://www.cambridgeenglish.org/exams-and-tests/qualifications/key/format/', note: 'A2 Key is now taken as a digital exam; the paper-based A2 Key ended after June 2026.' },
  B1: { name: 'B1 Preliminary', level: 'B1', papers: 'Reading 25% · Writing 25% · Listening 25% · Speaking 25%', weights: { language: 10, reading: 22.5, writing: 22.5, listening: 22.5, speaking: 22.5 }, href: 'https://www.cambridgeenglish.org/exams-and-tests/qualifications/preliminary/format/' },
  B2: { name: 'B2 First', level: 'B2', papers: 'Reading, Use of English, Writing, Listening and Speaking count equally', weights: equalFive, href: 'https://www.cambridgeenglish.org/exams-and-tests/qualifications/first/format/' },
  C1: { name: 'C1 Advanced', level: 'C1', papers: 'Reading, Use of English, Writing, Listening and Speaking count equally', weights: equalFive, href: 'https://www.cambridgeenglish.org/exams-and-tests/qualifications/advanced/format/' },
  C2: { name: 'C2 Proficiency', level: 'C2', papers: 'Reading, Use of English, Writing, Listening and Speaking count equally', weights: equalFive, href: 'https://www.cambridgeenglish.org/exams-and-tests/qualifications/proficiency/format/' },
};

/** What to learn at the target level, in the Core Inventory's categories (written for EnglishCamp). */
export const ROUTE_LANGUAGE: Record<PlacementLevel, { functions: string; grammar: string; linking: string; topics: string }> = {
  A1: { functions: 'Introduce yourself, ask simple questions, talk about routines and likes', grammar: 'be, have got, present simple, can, there is/are, possessives, a/an/the', linking: 'and, but, because', topics: 'family, home, food, daily life, numbers and time' },
  A2: { functions: 'Describe past events, make plans, compare, make requests and offers', grammar: 'past simple, going to and will, comparatives and superlatives, countable and uncountable nouns, have to, should', linking: 'then, after that, so, because, when', topics: 'travel, shopping, work, free time, health basics' },
  B1: { functions: 'Narrate experiences, give opinions with reasons, agree and disagree, describe hopes and plans', grammar: 'present perfect and past simple, past continuous, used to, first and second conditionals, modals for advice and obligation, relative clauses', linking: 'however, although, as a result, on the other hand', topics: 'education, work, health, the media, the environment' },
  B2: { functions: 'Argue a case, speculate, summarise, show degrees of certainty, complain and negotiate', grammar: 'narrative tenses, passives, reported speech, third and mixed conditionals, wish and if only, modals of deduction', linking: 'whereas, consequently, in addition, despite, provided that', topics: 'society, technology, science, work and careers, culture' },
  C1: { functions: 'Hedge, emphasise, build an extended argument, adapt register for the reader', grammar: 'inversion, cleft sentences, participle clauses, advanced passives, future in the past', linking: 'cohesion across paragraphs: nevertheless, to that end, notwithstanding', topics: 'abstract and specialised topics, academic and professional texts' },
  C2: { functions: 'Express fine shades of meaning, persuade, handle implicit meaning and irony', grammar: 'full control of complex forms, ellipsis and substitution, stylistic choices', linking: 'subtle discourse markers and rhetorical structure', topics: 'any topic, including idiomatic and colloquial language' },
};

export type RoutePhase = { index: number; title: string; from: number; to: number; aim: string; weights: Record<RouteComponent, number> | 'exam' };
export const ROUTE_PHASES: RoutePhase[] = [
  { index: 1, title: 'Strengthen your base', from: 1, to: 4, aim: 'Close gaps at your current level, start a daily routine and give extra time to your weakest skill.', weights: { language: 30, reading: 20, listening: 20, speaking: 15, writing: 15 } },
  { index: 2, title: 'Build target-level language', from: 5, to: 8, aim: 'Learn the grammar, vocabulary and linking words of the next level and meet them in reading and listening.', weights: { language: 25, reading: 20, listening: 20, speaking: 15, writing: 20 } },
  { index: 3, title: 'Understand more · mid-point test', from: 9, to: 13, aim: 'Read and listen at the target level with less support, then take the mid-point test in week 13.', weights: { language: 20, reading: 25, listening: 25, speaking: 15, writing: 15 } },
  { index: 4, title: 'Speak and write at the target level', from: 14, to: 17, aim: 'Practise the speaking and writing tasks of the target exam and use feedback to improve.', weights: { language: 20, reading: 15, listening: 15, speaking: 25, writing: 25 } },
  { index: 5, title: 'Put the skills together', from: 18, to: 21, aim: 'Mix skills in timed practice, review your error log and learn the exam task types.', weights: 'exam' },
  { index: 6, title: 'Exam readiness · final check', from: 22, to: 26, aim: 'Practise under exam conditions, then retake the CEFR check in week 26 and plan your next six months.', weights: 'exam' },
];

export type RouteCheckpointKind = 'month' | 'midpoint' | 'final';
export const ROUTE_CHECKPOINT_WEEKS: { week: number; kind: RouteCheckpointKind; title: string }[] = [
  { week: 4, kind: 'month', title: 'Month 1 check' },
  { week: 8, kind: 'month', title: 'Month 2 check' },
  { week: 13, kind: 'midpoint', title: 'Mid-point test' },
  { week: 17, kind: 'month', title: 'Month 4 check' },
  { week: 21, kind: 'month', title: 'Month 5 check' },
  { week: 26, kind: 'final', title: 'Final assessment' },
];

export const ROUTE_SOURCES = [
  { title: 'Cambridge English: guided learning hours', href: 'https://support.cambridgeenglish.org/hc/en-gb/articles/202838506-Guided-learning-hours' },
  { title: 'British Council – EAQUALS Core Inventory for General English', href: 'https://www.teachingenglish.org.uk/article/british-council-eaquals-core-inventory-general-english' },
  { title: 'Council of Europe: CEFR level descriptions', href: 'https://www.coe.int/en/web/common-european-framework-reference-languages/level-descriptions' },
  { title: 'British Council LearnEnglish: practice by level', href: 'https://learnenglish.britishcouncil.org/free-resources/listening' },
];
