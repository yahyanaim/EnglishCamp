import { CEFR_LEVELS } from '@/data/placement/cefr';
import type { PlacementLevel } from '@/data/placement/questions';
import { LEVEL_STUDY_PLANS } from '@/data/level-study-plans';
import { HOURS_PER_LEVEL, ROUTE_CHECKPOINT_WEEKS, ROUTE_COMPONENTS, ROUTE_EXAMS, ROUTE_LANGUAGE, ROUTE_PHASES, ROUTE_WEEKS, type RouteCheckpointKind, type RouteComponent, type RouteExam, type RoutePhase } from '@/lib/sixMonthRouteData';
import { localDateKey, parseStudyDate } from './studyPlanner';
import type { StudyAdaptation, StudyPriority, StudySchedule } from './placement';

export type RouteLink = { label: string; href: string; external?: boolean };
export type RouteSession = { id: string; week: number; phase: number; start: Date; end: Date; minutes: number; component: RouteComponent; level: PlacementLevel; kind: 'study' | 'mock' | 'retest'; title: string; task: string; href: string; external?: boolean };
export type RouteCheckpoint = { week: number; kind: RouteCheckpointKind; title: string; date: Date; tasks: RouteLink[]; canDo: string[] };
export type RouteReview = { week: number; weakSkills: RouteComponent[] };
export type SixMonthRoute = {
  start: PlacementLevel; target: PlacementLevel; exam: RouteExam;
  hours: { planned: number; perWeek: number; needed: number; coverage: number; weeklyNeeded: number; verdict: 'on-track' | 'stretch' | 'foundation' | 'maintain' };
  phases: (Omit<RoutePhase, 'weights'> & { weights: Record<RouteComponent, number>; boosted: RouteComponent[]; sessions: number })[];
  sessions: RouteSession[]; checkpoints: RouteCheckpoint[];
};

const levelIndex = (level: PlacementLevel) => CEFR_LEVELS.indexOf(level);
export const nextLevel = (level: PlacementLevel): PlacementLevel => CEFR_LEVELS[Math.min(levelIndex(level) + 1, CEFR_LEVELS.length - 1)];
export const routeComponentOf = (skill: StudyPriority): RouteComponent => (skill === 'grammar' || skill === 'vocabulary' ? 'language' : skill);
const round1 = (n: number) => Math.round(n * 10) / 10;

/** Phase weights (sum 100). Months 5–6 follow the target exam; each weak skill gets 30% more time. */
export function routeWeights(phase: RoutePhase, target: PlacementLevel, boosts: RouteComponent[] = []): Record<RouteComponent, number> {
  const exam = ROUTE_EXAMS[target === 'A1' ? 'A2' : target];
  const base = phase.weights === 'exam' ? exam.weights : phase.weights;
  const raw = Object.fromEntries(ROUTE_COMPONENTS.map(c => [c, base[c] * (boosts.includes(c) ? 1.3 : 1)])) as Record<RouteComponent, number>;
  const total = ROUTE_COMPONENTS.reduce((sum, c) => sum + raw[c], 0);
  return Object.fromEntries(ROUTE_COMPONENTS.map(c => [c, (raw[c] / total) * 100])) as Record<RouteComponent, number>;
}

/** Smooth weighted round robin: over any run of slots each component's share stays within one slot of its weight. */
export function allocateSlots(weights: Record<RouteComponent, number>, slots: number): RouteComponent[] {
  const current = Object.fromEntries(ROUTE_COMPONENTS.map(c => [c, 0])) as Record<RouteComponent, number>;
  const total = ROUTE_COMPONENTS.reduce((s, c) => s + weights[c], 0), out: RouteComponent[] = [];
  for (let i = 0; i < slots; i++) {
    let pick: RouteComponent = ROUTE_COMPONENTS[0];
    for (const c of ROUTE_COMPONENTS) { current[c] += weights[c]; if (current[c] > current[pick] + 1e-9) pick = c; }
    current[pick] -= total; out.push(pick);
  }
  return out;
}

const pick = <T,>(items: T[], n: number) => items[((n % items.length) + items.length) % items.length];
const items = (text: string) => text.split(/,\s*/).map(s => s.trim()).filter(Boolean);
const grammarHref = (level: PlacementLevel) => (['A1', 'A2', 'B1', 'B2'].includes(level) ? `/grammar#grammar-level-${level}` : '/grammar');

function studySession(component: RouteComponent, phase: number, level: PlacementLevel, target: PlacementLevel, n: number): { title: string; task: string; href: string } {
  const lang = ROUTE_LANGUAGE[phase === 1 ? level : target], topic = pick(items(lang.topics), n), grammar = pick(items(lang.grammar), n);
  switch (component) {
    case 'language':
      if (phase === 1) return n % 2 ? { title: `Vocabulary review · ${level}`, task: 'Review the words you saved, then use five of them in new sentences about your life.', href: '/flashcards' } : { title: `Grammar repair · ${grammar}`, task: `Study ${grammar}, then write five true sentences and check them against the examples.`, href: grammarHref(level) };
      if (phase >= 5) return { title: `Use of English · ${grammar}`, task: `Do a timed gap-fill on ${grammar} and linking words (${lang.linking}). Note every error in your error log.`, href: n % 2 ? '/weak-areas' : grammarHref(target) };
      return n % 3 === 2 ? { title: `Topic words · ${topic}`, task: `Learn 8–10 phrases about ${topic} as chunks, then say each one in a sentence of your own.`, href: '/vocabulary' } : { title: `New grammar · ${grammar}`, task: `Learn ${grammar} at ${target} level: read the rule, compare the examples, then write five sentences.`, href: grammarHref(target) };
    case 'reading':
      return phase === 1 ? { title: `Read for the main idea · ${level}`, task: 'Read one passage. Say the main idea in one sentence before you answer the questions.', href: '/reading' }
        : phase >= 5 ? { title: `Timed reading · ${target}`, task: 'Read one passage in a set time, answer the questions, then find the words in the text that prove each answer.', href: '/reading' }
        : { title: `Read at ${level} · ${topic}`, task: `Read a passage about ${topic} if you can. Underline 5 new phrases and the linking words; retell the text in 4 sentences.`, href: '/reading' };
    case 'listening':
      return phase === 1 ? { title: `Listen for gist · ${level}`, task: 'Listen once for the situation, a second time for details, then check the transcript.', href: '/listening' }
        : phase === 3 && n % 2 ? { title: `Listening lab · ${level}`, task: 'Answer before checking. Replay only the part you missed and write the words you heard.', href: '/listening-lab' }
        : { title: `Listen at ${level}${phase >= 5 ? ' · exam timing' : ''}`, task: phase >= 5 ? 'Listen twice only, as in the exam. Answer, then check which words gave you the answer.' : `Listen to a recording about ${topic}; note the speaker's opinion and two reasons.`, href: '/listening' };
    case 'speaking':
      return phase <= 3 ? { title: `Shadowing · ${level}`, task: 'Shadow a short conversation line by line, record yourself, and compare your rhythm with the model.', href: '/shadowing-english' }
        : n % 2 ? { title: 'Pronunciation check', task: 'Record one answer, check your pronunciation and practise the sounds it flags.', href: '/pronunciation' }
        : { title: `Speaking task · ${topic}`, task: `Talk for ${levelIndex(target) >= levelIndex('B2') ? '1–2 minutes' : '45–60 seconds'} about ${topic}: give an opinion, two reasons and an example. Repeat with fewer pauses.`, href: '/english-coach' };
    case 'writing':
      return phase <= 2 ? { title: `Short writing · ${level}`, task: `Write ${levelIndex(level) <= levelIndex('A2') ? '40–60' : '80–120'} words about ${topic}. Check verb forms and linking words, then rewrite one sentence better.`, href: '/writing' }
        : { title: `Exam-style writing · ${target}`, task: `Write a ${levelIndex(target) <= levelIndex('A2') ? 'short message (35+ words)' : target === 'B1' ? 'message or article of about 100 words' : 'essay or article of 140–260 words'} about ${topic}. Plan for 5 minutes, write, then correct with the feedback.`, href: '/writing' };
  }
}

export function buildSixMonthRoute(schedule: StudySchedule, adaptation?: StudyAdaptation, reviews: RouteReview[] = []): SixMonthRoute {
  if (!schedule.days.length) throw new Error('Choose at least one study day.');
  const first = parseStudyDate(schedule.startDate, schedule.time);
  const start = schedule.startingLevel, target = nextLevel(start), exam = ROUTE_EXAMS[target === 'A1' ? 'A2' : target];
  const priorities = Array.from(new Set((adaptation?.priorities ?? []).map(routeComponentOf)));
  const skillLevel = (c: RouteComponent): PlacementLevel => {
    const measured = c === 'language' ? adaptation?.levels.grammar : adaptation?.levels[c as StudyPriority];
    // Stronger skills keep harder material; weaker ones start where they are.
    return measured && levelIndex(measured) >= 0 ? measured : start;
  };
  const sorted = [...reviews].filter(r => r.week >= 1 && r.week <= ROUTE_WEEKS).sort((a, b) => a.week - b.week);
  const phases = ROUTE_PHASES.map(phase => {
    const latest = [...sorted].reverse().find(r => r.week < phase.from);
    const boosted = Array.from(new Set([...priorities, ...(latest?.weakSkills ?? [])])).filter(c => ROUTE_COMPONENTS.includes(c));
    return { ...phase, weights: routeWeights(phase, target, boosted), boosted, sessions: 0 };
  });
  const sessions: RouteSession[] = [], counters: Record<string, number> = {};
  const phaseSlots = new Map<number, RouteComponent[]>(), used = new Map<number, number>();
  // Count the study days in each phase first, then allocate across the whole phase for a smooth mix.
  const days: { day: number; week: number; phase: number }[] = [];
  for (let day = 0; day < ROUTE_WEEKS * 7; day++) {
    const date = new Date(first.getFullYear(), first.getMonth(), first.getDate() + day, 12);
    if (!schedule.days.includes(date.getDay())) continue;
    const week = Math.floor(day / 7) + 1, phase = ROUTE_PHASES.find(p => week >= p.from && week <= p.to)!.index;
    days.push({ day, week, phase });
  }
  for (const p of phases) { p.sessions = days.filter(d => d.phase === p.index).length; phaseSlots.set(p.index, allocateSlots(p.weights, p.sessions)); }
  const lastWeekDays = days.filter(d => d.week === ROUTE_WEEKS), mockWeekDays = days.filter(d => d.week === ROUTE_WEEKS - 1);
  days.forEach(({ day, week, phase }, index) => {
    const calendar = new Date(first.getFullYear(), first.getMonth(), first.getDate() + day, 12);
    const startAt = parseStudyDate(localDateKey(calendar), schedule.time), end = new Date(startAt.getTime() + schedule.minutes * 60000);
    const slot = used.get(phase) ?? 0; used.set(phase, slot + 1);
    const component = phaseSlots.get(phase)![slot], n = counters[component] = (counters[component] ?? -1) + 1;
    const base = { id: `${schedule.id}-route-${index}`, week, phase, start: startAt, end, minutes: schedule.minutes };
    if (lastWeekDays[0]?.day === day) { sessions.push({ ...base, component: 'reading', level: target, kind: 'retest', title: 'Retake the CEFR check', task: 'Take the full CEFR check again and compare each skill with your starting profile.', href: '/placement-test' }); return; }
    if (mockWeekDays[0]?.day === day) {
      const inApp = target === 'B2';
      sessions.push({ ...base, component: 'reading', level: target, kind: 'mock', title: `${exam.name} practice paper`, task: inApp ? 'Take the B2 First practice paper under exam timing. Mark it and note the parts that cost you points.' : `Do an official ${exam.name} sample paper under exam timing, then mark it with the answer key.`, href: inApp ? '/mock-exam' : exam.href, ...(inApp ? {} : { external: true }) });
      return;
    }
    const material = phase === 1 ? skillLevel(component) : CEFR_LEVELS[Math.max(levelIndex(skillLevel(component)), levelIndex(target))];
    sessions.push({ ...base, component, level: material, kind: 'study', ...studySession(component, phase, material, target, n) });
  });
  const planned = round1((sessions.length * schedule.minutes) / 60), perWeek = round1((schedule.days.length * schedule.minutes) / 60);
  const coverage = Math.round((planned / HOURS_PER_LEVEL) * 100) / 100;
  const verdict = start === 'C2' ? 'maintain' : coverage >= 1 ? 'on-track' : coverage >= 0.6 ? 'stretch' : 'foundation';
  const checkpoints = ROUTE_CHECKPOINT_WEEKS.map(cp => {
    const date = new Date(first.getFullYear(), first.getMonth(), first.getDate() + cp.week * 7 - 1, 12);
    const mock: RouteLink = target === 'B2' ? { label: 'B2 First practice paper (in EnglishCamp)', href: '/mock-exam' } : { label: `Official ${exam.name} sample paper`, href: exam.href, external: true };
    const tasks: RouteLink[] = cp.kind === 'final'
      ? [{ label: 'Retake the full CEFR check', href: '/placement-test' }, mock, { label: 'Plan your next six months', href: '/study-plan' }]
      : cp.kind === 'midpoint'
      ? [{ label: 'Retake the CEFR check and compare reading and listening', href: '/placement-test' }, target === 'B2' ? { label: 'B2 First Reading and Use of English (in EnglishCamp)', href: '/mock-exam' } : { label: `Official ${exam.name} Reading sample`, href: exam.href, external: true }, { label: 'Review your mistakes', href: '/weak-areas' }]
      : [{ label: 'Review your mistakes', href: '/weak-areas' }, cp.week === 8 ? { label: 'Spaced vocabulary review', href: '/flashcards' } : cp.week === 17 ? { label: 'Write one exam-style task and get feedback', href: '/writing' } : cp.week === 21 ? { label: `${exam.name}: exam format and task types`, href: exam.href, external: true } : { label: 'Record one answer and check your pronunciation', href: '/pronunciation' }];
    const canDo = LEVEL_STUDY_PLANS[cp.week <= 4 ? start : target].ready;
    return { ...cp, date, tasks, canDo };
  });
  return {
    start, target, exam,
    hours: { planned, perWeek, needed: HOURS_PER_LEVEL, coverage, weeklyNeeded: round1(HOURS_PER_LEVEL / ROUTE_WEEKS), verdict },
    phases, sessions, checkpoints,
  };
}

/** Key for a checkpoint review stored with the learner's study reviews. */
export const routeReviewKey = (scheduleId: string, week: number) => `${scheduleId}-route-${week}`;

const escapeICS = (value: string) => value.replace(/\\/g, "\\\\").replace(/\r\n|\r|\n/g, "\\n").replace(/;/g, "\\;").replace(/,/g, "\\,");
function foldICS(line: string) { const encoder = new TextEncoder(); const parts: string[] = []; let part = "", size = 0; for (const c of Array.from(line)) { const n = encoder.encode(c).length; if (size + n > 75) { parts.push(part); part = " " + c; size = 1 + n; } else { part += c; size += n; } } parts.push(part); return parts.join("\r\n"); }
const utc = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
/** Calendar file for the whole route (one event per session). */
export function routeCalendar(route: SixMonthRoute, name: string, origin = "https://englishcamp.invalid", now = new Date()) {
  const base = new URL(origin);
  if (!["http:", "https:"].includes(base.protocol)) throw new Error("Calendar links need a website address.");
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//EnglishCamp//Six-month route//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH", "X-WR-CALNAME:EnglishCamp 6-month route"];
  for (const s of route.sessions) {
    const url = s.external ? s.href : new URL(s.href, base).href;
    const description = `${name}: ${route.start} to ${route.target} · week ${s.week} of 26\n${s.task}`;
    lines.push("BEGIN:VEVENT", `UID:${s.id}@englishcamp.local`, `DTSTAMP:${utc(now)}`, `DTSTART:${utc(s.start)}`, `DTEND:${utc(s.end)}`, `SUMMARY:${escapeICS(`EnglishCamp: ${s.title}`)}`, `DESCRIPTION:${escapeICS(description)}`, `URL:${url}`, "STATUS:CONFIRMED", "TRANSP:TRANSPARENT", "END:VEVENT");
  }
  lines.push("END:VCALENDAR");
  return lines.map(foldICS).join("\r\n") + "\r\n";
}
