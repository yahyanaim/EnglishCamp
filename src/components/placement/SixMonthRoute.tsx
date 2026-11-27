"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { BookOpen, CalendarDays, CheckCircle2, Circle, ExternalLink, Flag, GraduationCap, Target } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";
import { ROUTE_COMPONENTS, ROUTE_COMPONENT_LABEL, ROUTE_LANGUAGE, ROUTE_SOURCES, ROUTE_WEEKS, type RouteComponent } from "@/lib/sixMonthRouteData";
import { buildSixMonthRoute, routeCalendar, routeReviewKey, type RouteReview, type RouteSession } from "@/lib/sixMonthRoute";
import { emptyStudyReview } from "@/lib/studyReadiness";
import { localDateKey } from "@/lib/studyPlanner";
import { downloadLocalFile } from "@/lib/localDownload";
import { routeCourses, type RouteCourseLesson } from "@/lib/routeCourses";
import { useProgress } from "@/store/useProgress";
import type { PlacementRecord, StudyAdaptation, StudySchedule } from "@/lib/placement";

const VERDICT = {
  "on-track": "This plan gives about the time Cambridge suggests for one CEFR level. Complete the sessions and checks to stay on track.",
  stretch: "Good progress is realistic. The full next level may take a little longer; add a session or longer sessions to get closer to 200 hours.",
  foundation: "This builds a strong base. Moving up a full level usually needs about 200 guided hours, so expect it to take longer than six months at this pace.",
  maintain: "You are at C2. This route keeps your English precise and prepares you for C2 Proficiency tasks.",
} as const;
const date = (d: Date) => d.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" });

function SessionItem({ session, done, onToggle }: { session: RouteSession; done: boolean; onToggle: () => void }) {
  return (
    <li className="camp-route-session" data-component={session.component} data-kind={session.kind} data-done={done}>
      <time dateTime={session.start.toISOString()}><b>{date(session.start)}</b><small>{session.start.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })} · {session.minutes} min</small></time>
      <div>
        <p className="camp-route-session-skill">{session.kind === "study" ? (session.lesson ? `${session.lesson.course.title} · ${ROUTE_COMPONENT_LABEL[session.component]}` : `${ROUTE_COMPONENT_LABEL[session.component]} · ${session.level}`) : session.kind === "mock" ? "Practice exam" : "Re-assessment"}</p>
        {session.external ? <a href={session.href} target="_blank" rel="noreferrer">{session.title} <ExternalLink size={13} aria-hidden="true" /></a> : <Link href={session.href}>{session.title}</Link>}
        <p>{session.task}</p>
      </div>
      <label className="camp-route-done"><input type="checkbox" checked={done} onChange={onToggle} /><span>Done</span></label>
    </li>
  );
}

export function SixMonthRoute({ schedule, adaptation, record, update, learnerName }: { schedule: StudySchedule; adaptation?: StudyAdaptation; record: PlacementRecord; update: (change: (r: PlacementRecord) => PlacementRecord) => boolean; learnerName: string }) {
  const reviews: RouteReview[] = useMemo(() => Object.entries(record.studyReviews ?? {}).flatMap(([key, review]) => {
    const prefix = `${schedule.id}-route-`, week = key.startsWith(prefix) ? Number(key.slice(prefix.length)) : NaN;
    return Number.isInteger(week) ? [{ week, weakSkills: review.weakSkills ?? [] }] : [];
  }), [record.studyReviews, schedule.id]);
  const route = useMemo(() => buildSixMonthRoute(schedule, adaptation, reviews), [schedule, adaptation, reviews]);
  const done = new Set(record.studyDone ?? []), completed = route.sessions.filter(s => done.has(s.id)).length;
  const courseLessons = useProgress(s => s.lessons), exercises = useProgress(s => s.exercisesDone);
  const lessonDone = (l: RouteCourseLesson) => (l.kind === "course" ? !!courseLessons[l.progressKey]?.completed : !!exercises[l.progressKey]);
  const courses = useMemo(() => routeCourses(route.target), [route.target]);
  const scheduledOn = useMemo(() => new Map(route.sessions.filter(x => x.lesson).map(x => [x.lesson!.key, x.start])), [route.sessions]);
  const today = localDateKey(new Date());
  const currentWeek = Math.min(ROUTE_WEEKS, Math.max(1, Math.floor((Date.parse(today) - Date.parse(schedule.startDate)) / (7 * 86400000)) + 1));
  const currentPhase = route.phases.find(p => currentWeek >= p.from && currentWeek <= p.to)!;
  const [openWeek, setOpenWeek] = useState(currentWeek);
  const [notice, setNotice] = useState("");
  const toggle = (id: string) => update(r => ({ ...r, studyDone: (r.studyDone ?? []).includes(id) ? (r.studyDone ?? []).filter(x => x !== id) : [...(r.studyDone ?? []), id] }));
  const review = (week: number) => record.studyReviews?.[routeReviewKey(schedule.id, week)] ?? emptyStudyReview();
  const saveReview = (week: number, change: (r: ReturnType<typeof emptyStudyReview>) => ReturnType<typeof emptyStudyReview>) => update(r => ({ ...r, studyReviews: { ...r.studyReviews, [routeReviewKey(schedule.id, week)]: change(r.studyReviews?.[routeReviewKey(schedule.id, week)] ?? emptyStudyReview()) } }));
  const language = ROUTE_LANGUAGE[route.target], thisWeek = route.sessions.filter(s => s.week === currentWeek);
  const exportCalendar = () => { downloadLocalFile(new Blob([routeCalendar(route, learnerName, window.location.origin)], { type: "text/calendar;charset=utf-8" }), "englishcamp-6-month-route.ics"); setNotice("Calendar file downloaded. Import it once to avoid duplicates."); };

  return (
    <section className="camp-route" aria-labelledby="route-heading">
      <header className="camp-route-hero">
        <div className="camp-route-hero-main">
          <p className="camp-route-eyebrow">Your 6-month CEFR route</p>
          <h2 id="route-heading">{route.start === route.target ? `${route.start} · keep and refine` : <>{route.start} <span aria-hidden="true">→</span><span className="sr-only">to</span> {route.target}</>}</h2>
          <p>{ROUTE_WEEKS} weeks · {schedule.days.length} {schedule.days.length === 1 ? "session" : "sessions"} a week · {schedule.minutes} minutes · starts {new Date(schedule.startDate + "T12:00:00").toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })}</p>
          <div className="camp-route-progress" role="progressbar" aria-label="Route sessions completed" aria-valuemin={0} aria-valuemax={route.sessions.length} aria-valuenow={completed}><span style={{ width: `${(completed / Math.max(1, route.sessions.length)) * 100}%` }} /></div>
          <p className="camp-route-progress-label">{completed} of {route.sessions.length} sessions done · week {currentWeek} of {ROUTE_WEEKS}</p>
        </div>
        <aside className="camp-route-exam">
          <GraduationCap size={22} aria-hidden="true" />
          <p className="camp-route-eyebrow">Target exam</p>
          <strong>{route.exam.name}</strong>
          <span>{route.exam.papers}</span>
          {route.exam.note && <small>{route.exam.note}</small>}
          <a href={route.exam.href} target="_blank" rel="noreferrer">Official exam format <ExternalLink size={13} aria-hidden="true" /></a>
        </aside>
      </header>

      <section className="camp-route-hours" aria-labelledby="route-hours-heading">
        <h3 id="route-hours-heading"><Target size={18} aria-hidden="true" />Study time</h3>
        <div className="camp-route-hours-bar" aria-hidden="true"><span style={{ width: `${Math.min(100, route.hours.coverage * 100)}%` }} /></div>
        <p><strong>{route.hours.planned} hours</strong> planned ({route.hours.perWeek} h a week) · Cambridge estimates about <strong>{route.hours.needed} guided hours</strong> to move up one CEFR level (about {route.hours.weeklyNeeded} h a week for 26 weeks).</p>
        <p className="camp-route-verdict" data-verdict={route.hours.verdict}>{VERDICT[route.hours.verdict]}</p>
      </section>

      <section className="camp-route-courses" aria-labelledby="route-courses">
        <div className="camp-route-section-head"><h3 id="route-courses"><BookOpen size={18} aria-hidden="true" />Your courses</h3><span>{courses.reduce((n, c) => n + c.lessons.length, 0)} lessons in this route</span></div>
        <ul>
          {courses.map(course => {
            const finished = course.lessons.filter(lessonDone).length;
            return (
              <li key={course.id}>
                <div><strong>{course.title}</strong><span>{course.lessons.length} {course.id === "route" ? "lessons written for this route" : `of ${course.total} modules used`} · {finished} done</span></div>
                <div className="camp-route-bar" role="progressbar" aria-label={`${course.title} lessons done`} aria-valuemin={0} aria-valuemax={course.lessons.length} aria-valuenow={finished}><span style={{ width: `${(finished / Math.max(1, course.lessons.length)) * 100}%` }} /></div>
                <Link href={course.id === "route" ? course.lessons[0].href : `/levels/${course.id}`}>{course.id === "route" ? "Start the first lesson" : "Open course"}</Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="camp-route-roadmap" aria-labelledby="route-roadmap">
        <div className="camp-route-section-head"><h3 id="route-roadmap"><BookOpen size={18} aria-hidden="true" />Study roadmap</h3><span>6 months · {ROUTE_WEEKS} weeks</span></div>
        <ol>
          {route.phases.map(phase => (
            <li key={phase.index} className="camp-route-step" data-current={phase.index === currentPhase.index} data-past={phase.to < currentWeek}>
              <div className="camp-route-step-head">
                <span className="camp-route-step-num" aria-hidden="true">{phase.index}</span>
                <h4>{phase.title}</h4>
                <span className="camp-route-step-weeks">Weeks {phase.from}–{phase.to}</span>
              </div>
              <div className="camp-route-step-tags">
                {ROUTE_COMPONENTS.filter(c => phase.weights[c] >= 22 || phase.boosted.includes(c)).map(c => <span key={c} data-component={c} data-boost={phase.boosted.includes(c)}>{ROUTE_COMPONENT_LABEL[c]}{phase.boosted.includes(c) ? " +" : ""}</span>)}
              </div>
              <p className="camp-route-step-aim">{phase.aim}</p>
              <div className="camp-route-mix" aria-label={`Time split: ${ROUTE_COMPONENTS.map(c => `${ROUTE_COMPONENT_LABEL[c]} ${Math.round(phase.weights[c])}%`).join(", ")}`}>
                {ROUTE_COMPONENTS.map(c => <span key={c} data-component={c} style={{ flexGrow: phase.weights[c] }} title={`${ROUTE_COMPONENT_LABEL[c]} ${Math.round(phase.weights[c])}%`} />)}
              </div>
              {phase.lessons.length > 0 && (
                <ol className="camp-route-step-lessons" aria-label={`Month ${phase.index} lessons`}>
                  {phase.lessons.map(l => {
                    const finished = lessonDone(l), when = scheduledOn.get(l.key);
                    return (
                      <li key={l.key} data-done={finished}>
                        {finished ? <CheckCircle2 size={16} aria-label="Done" /> : <Circle size={16} aria-label="Not done" />}
                        <span><Link href={l.href}>{l.title}</Link><small>{l.course.title} · {ROUTE_COMPONENT_LABEL[l.component]}{when ? ` · ${date(when)}` : " · extra session"}</small></span>
                      </li>
                    );
                  })}
                </ol>
              )}
            </li>
          ))}
        </ol>
        <ul className="camp-route-legend" aria-hidden="true">{ROUTE_COMPONENTS.map(c => <li key={c} data-component={c}>{ROUTE_COMPONENT_LABEL[c]}</li>)}</ul>
      </section>

      <section className="camp-route-gantt" aria-labelledby="route-gantt">
        <div className="camp-route-section-head"><h3 id="route-gantt"><CalendarDays size={18} aria-hidden="true" />Study schedule</h3><span>Sequential · {ROUTE_WEEKS} weeks</span></div>
        <p className="camp-route-gantt-lead">{route.hours.planned} hours of study across {ROUTE_WEEKS} weeks, about {route.hours.perWeek} hours a week. Each bar is one month of the route — finish a bar before the next one starts. Diamonds mark the checkpoints.</p>
        <div className="camp-route-gantt-grid" role="group" aria-label={`Study schedule: 6 months over ${ROUTE_WEEKS} weeks, now in week ${currentWeek}`} style={{ ["--weeks" as string]: String(ROUTE_WEEKS) }}>
          <span className="camp-route-gantt-corner">Month</span>
          {Array.from({ length: ROUTE_WEEKS }, (_, i) => <span key={i} className="camp-route-gantt-tick" data-major={i % 4 === 0 || i === ROUTE_WEEKS - 1 || i + 1 === currentWeek} data-now={i + 1 === currentWeek} aria-hidden="true">{i + 1}</span>)}
          {route.phases.map(phase => (
            <div key={phase.index} className="camp-route-gantt-row" data-current={phase.index === currentPhase.index}>
              <span className="camp-route-gantt-label"><b>{phase.index}.</b> {phase.title}<small>({phase.to - phase.from + 1} weeks)</small></span>
              <span className="camp-route-gantt-bar" style={{ gridColumn: `${phase.from + 1} / ${phase.to + 2}` }} title={`Month ${phase.index}: weeks ${phase.from}–${phase.to}`}><span className="sr-only">Weeks {phase.from} to {phase.to}</span></span>
            </div>
          ))}
          <div className="camp-route-gantt-row camp-route-gantt-checks">
            <span className="camp-route-gantt-label"><b>◆</b> Checkpoints</span>
            {route.checkpoints.map(cp => <span key={cp.week} className="camp-route-gantt-diamond" data-kind={cp.kind} style={{ gridColumn: `${cp.week + 1}` }} title={`Week ${cp.week}: ${cp.title}`}><span className="sr-only">Week {cp.week}: {cp.title}</span></span>)}
          </div>
        </div>
        <ol className="camp-route-rules">
          <li><b>Block the time first.</b> Put every session in your calendar before the week starts — planned study time is the time that survives a busy week.</li>
          <li><b>Finish a bar before the next one.</b> Each month builds on the one before, so skipping ahead costs you twice.</li>
          <li><b>Close each session with recall.</b> Explain what you learned from memory, then reopen only the part you could not explain.</li>
        </ol>
      </section>

      <section className="camp-route-week" aria-labelledby="route-this-week">
        <div className="camp-route-section-head"><h3 id="route-this-week"><CalendarDays size={18} aria-hidden="true" />This week · week {currentWeek}</h3><span>{currentPhase.title}</span></div>
        {thisWeek.length ? <ol className="camp-route-sessions">{thisWeek.map(s => <SessionItem key={s.id} session={s} done={done.has(s.id)} onToggle={() => toggle(s.id)} />)}</ol> : <p>No sessions this week on your chosen days.</p>}
      </section>

      <section className="camp-route-language" aria-labelledby="route-language">
        <h3 id="route-language">What you will learn for {route.target}</h3>
        <dl>
          <div><dt>Communicate</dt><dd>{language.functions}</dd></div>
          <div><dt>Grammar</dt><dd>{language.grammar}</dd></div>
          <div><dt>Linking words</dt><dd>{language.linking}</dd></div>
          <div><dt>Topics</dt><dd>{language.topics}</dd></div>
        </dl>
        <p className="camp-placement-fine">Organised by the categories of the British Council – EAQUALS Core Inventory for General English (functions, grammar, discourse markers, topics).</p>
      </section>

      <section className="camp-route-checks" aria-labelledby="route-checks">
        <h3 id="route-checks"><Flag size={18} aria-hidden="true" />Checkpoints</h3>
        <p className="camp-placement-fine">At each checkpoint, tick what you can do and choose the skills that felt hardest. The next months give those skills more time.</p>
        <ol>
          {route.checkpoints.map(cp => {
            const r = review(cp.week), due = cp.week <= currentWeek;
            return (
              <li key={cp.week} data-kind={cp.kind} data-due={due}>
                <details open={cp.week === route.checkpoints.find(c => c.week >= currentWeek)?.week}>
                  <summary><b>Week {cp.week} · {cp.title}</b><span>{cp.date.toLocaleDateString(undefined, { day: "numeric", month: "short" })}</span>{r.checks.every(Boolean) && <CheckCircle2 size={16} aria-label="All can-do statements ticked" />}</summary>
                  <ul className="camp-route-check-tasks">{cp.tasks.map(t => <li key={t.label}>{t.external ? <a href={t.href} target="_blank" rel="noreferrer">{t.label} <ExternalLink size={13} aria-hidden="true" /></a> : <Link href={t.href}>{t.label}</Link>}</li>)}</ul>
                  <fieldset className="camp-route-cando"><legend>I can…</legend>{cp.canDo.map((text, i) => <label key={text}><input type="checkbox" checked={!!r.checks[i]} onChange={e => saveReview(cp.week, cur => ({ ...cur, checks: cur.checks.map((v, k) => (k === i ? e.target.checked : v)) }))} /><span>{text}</span></label>)}</fieldset>
                  {cp.kind !== "final" && (
                    <fieldset className="camp-route-weak"><legend>Which skills felt hardest?</legend>
                      <div>{ROUTE_COMPONENTS.map(c => { const on = (r.weakSkills ?? []).includes(c); return <button key={c} type="button" aria-pressed={on} onClick={() => saveReview(cp.week, cur => ({ ...cur, weakSkills: on ? (cur.weakSkills ?? []).filter(x => x !== c) : [...(cur.weakSkills ?? []), c] }))}>{ROUTE_COMPONENT_LABEL[c]}</button>; })}</div>
                    </fieldset>
                  )}
                </details>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="camp-route-all" aria-labelledby="route-all">
        <div className="camp-route-section-head"><h3 id="route-all">All 26 weeks</h3><Button variant="outline" size="sm" onClick={exportCalendar}><CalendarDays size={15} aria-hidden="true" />Add to calendar</Button></div>
        {route.phases.map(phase => (
          <div key={phase.index} className="camp-route-phase-weeks">
            <h4>Month {phase.index} · {phase.title}</h4>
            {Array.from({ length: phase.to - phase.from + 1 }, (_, i) => phase.from + i).map(week => {
              const list = route.sessions.filter(s => s.week === week), finished = list.filter(s => done.has(s.id)).length;
              return (
                <details key={week} open={week === openWeek} onToggle={e => { if ((e.target as HTMLDetailsElement).open) setOpenWeek(week); }}>
                  <summary>Week {week}{week === currentWeek ? " · this week" : ""}<span>{finished}/{list.length}</span></summary>
                  <ol className="camp-route-sessions">{list.map(s => <SessionItem key={s.id} session={s} done={done.has(s.id)} onToggle={() => toggle(s.id)} />)}</ol>
                </details>
              );
            })}
          </div>
        ))}
        {notice && <p role="status">{notice}</p>}
      </section>

      <details className="camp-plan-references">
        <summary>How this route was built</summary>
        <ul>
          <li>Length and pace: Cambridge English estimates about 200 guided learning hours to move up one CEFR level. These hours include lessons and supervised study; independent study time varies by learner.</li>
          <li>Skills balance: every month includes reading, listening, speaking, writing, and grammar and vocabulary. Months 5 and 6 follow the weighting of the target Cambridge exam.</li>
          <li>Your profile: skills that were weaker in your CEFR check get 30% more time; skills you mark as hard at a checkpoint get extra time in the following months.</li>
          <li>This is a study plan, not an official syllabus or a promise of an exam result.</li>
        </ul>
        <ul>{ROUTE_SOURCES.map(s => <li key={s.href}><a href={s.href} target="_blank" rel="noreferrer">{s.title} ↗</a></li>)}</ul>
      </details>
    </section>
  );
}
