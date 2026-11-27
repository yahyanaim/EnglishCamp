"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { CalendarDays, CalendarPlus, Check, ChevronLeft, ChevronRight, ExternalLink, Flag, X } from "lucide-react";
import { ROUTE_COMPONENTS, ROUTE_COMPONENT_LABEL, ROUTE_WEEKS, type RouteComponent } from "@/lib/sixMonthRouteData";
import type { SixMonthRoute, RouteSession } from "@/lib/sixMonthRoute";
import { localDateKey } from "@/lib/studyPlanner";

/* Study calendar for the 6-month route, built on the AIHubTools career-chat calendar:
   Week / Day / Month views, an hour grid with session blocks, phase pills, a progress ribbon,
   a legend footer and a session drawer. Everything here reads the route; nothing new is stored. */

type View = "week" | "day" | "month";
const HOUR_PX = 56;
const DAY_MS = 86400000;
export const ROUTE_COMPONENT_CODE: Record<RouteComponent, string> = { language: "GRM", reading: "RDG", listening: "LIS", speaking: "SPK", writing: "WRT" };
const SHORT_LABEL: Record<RouteComponent, string> = { language: "Grammar", reading: "Reading", listening: "Listening", speaking: "Speaking", writing: "Writing" };

const addDays = (iso: string, n: number) => { const d = new Date(iso + "T12:00:00"); d.setDate(d.getDate() + n); return localDateKey(d); };
const dayDiff = (a: string, b: string) => Math.round((Date.parse(b + "T12:00:00") - Date.parse(a + "T12:00:00")) / DAY_MS);
const asDate = (iso: string) => new Date(iso + "T12:00:00");
const minutesOf = (d: Date) => d.getHours() * 60 + d.getMinutes();
const clock = (d: Date) => d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
const hourLabel = (h: number) => new Date(2000, 0, 1, h).toLocaleTimeString(undefined, { hour: "numeric" });
const duration = (m: number) => (m >= 60 ? `${Math.floor(m / 60)}h${m % 60 ? ` ${m % 60}m` : ""}` : `${m}m`);
const sessionCode = (s: RouteSession) => (s.kind === "mock" ? "EXM" : s.kind === "retest" ? "CEFR" : ROUTE_COMPONENT_CODE[s.component]);
const sessionSkill = (s: RouteSession) => (s.kind === "mock" ? "Practice exam" : s.kind === "retest" ? "CEFR re-assessment" : ROUTE_COMPONENT_LABEL[s.component]);
const gcalStamp = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

export function googleCalendarUrl(s: RouteSession, origin: string) {
  const link = s.external ? s.href : new URL(s.href, origin).toString();
  const params = new URLSearchParams({ action: "TEMPLATE", text: `${s.title} · EnglishCamp`, dates: `${gcalStamp(s.start)}/${gcalStamp(s.end)}`, details: `${sessionSkill(s)}${s.lesson ? ` · ${s.lesson.course.title}` : ""}\n\n${s.task}\n\nOpen: ${link}`, location: link });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function RouteCalendar({ route, startDate, currentWeek, done, onToggle, onExport, notice }: { route: SixMonthRoute; startDate: string; currentWeek: number; done: Set<string>; onToggle: (id: string) => void; onExport: () => void; notice?: string }) {
  const today = localDateKey(new Date());
  const [view, setView] = useState<View>("week");
  const [week, setWeek] = useState(currentWeek);
  const firstDayWithSession = (w: number) => {
    const ws = addDays(startDate, (w - 1) * 7);
    const inWeek = route.sessions.filter(s => s.week === w).map(s => dayDiff(ws, localDateKey(s.start)));
    const t = dayDiff(ws, today);
    return t >= 0 && t < 7 ? t : inWeek.length ? Math.min(...inWeek) : 0;
  };
  const [day, setDay] = useState(() => firstDayWithSession(currentWeek));
  const [openId, setOpenId] = useState<string | null>(null);

  const weekStart = addDays(startDate, (week - 1) * 7);
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const weekSessions = useMemo(() => route.sessions.filter(s => s.week === week), [route.sessions, week]);
  const byDay = (iso: string) => route.sessions.filter(s => localDateKey(s.start) === iso);
  const phase = route.phases.find(p => week >= p.from && week <= p.to) ?? route.phases[0];
  const checkpointOn = new Map(route.checkpoints.map(c => [localDateKey(c.date), c]));
  const active = route.sessions.find(s => s.id === openId) ?? null;

  const studied = route.sessions.filter(s => done.has(s.id));
  const hoursDone = Math.round(studied.reduce((n, s) => n + s.minutes, 0) / 6) / 10;
  const hoursPlanned = Math.round(route.sessions.reduce((n, s) => n + s.minutes, 0) / 6) / 10;
  const weekPct = weekSessions.length ? Math.round((weekSessions.filter(s => done.has(s.id)).length / weekSessions.length) * 100) : 0;
  const nextCheck = route.checkpoints.find(c => c.week >= currentWeek);

  const { from, to } = useMemo(() => {
    if (!weekSessions.length) return { from: 8, to: 18 };
    const starts = weekSessions.map(s => Math.floor(minutesOf(s.start) / 60)), ends = weekSessions.map(s => Math.ceil((minutesOf(s.start) + s.minutes) / 60));
    const a = Math.max(0, Math.min(...starts) - 1); let b = Math.min(24, Math.max(...ends) + 1);
    if (b - a < 6) b = Math.min(24, a + 6);
    return { from: a, to: b };
  }, [weekSessions]);
  const hours = Array.from({ length: to - from }, (_, i) => from + i);

  const go = (w: number) => { const next = Math.max(1, Math.min(ROUTE_WEEKS, w)); setWeek(next); setDay(firstDayWithSession(next)); };
  const jumpTo = (iso: string) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return;
    const diff = dayDiff(startDate, iso), w = Math.max(1, Math.min(ROUTE_WEEKS, Math.floor(diff / 7) + 1));
    setWeek(w); setDay(Math.max(0, Math.min(6, diff - (w - 1) * 7)));
  };
  const monthFrom = Math.floor((week - 1) / 4) * 4 + 1;
  const monthWeeks = Array.from({ length: 4 }, (_, i) => monthFrom + i).filter(w => w <= ROUTE_WEEKS);
  const legend = ROUTE_COMPONENTS.filter(c => weekSessions.some(s => s.kind === "study" && s.component === c));

  const block = (s: RouteSession) => {
    const top = ((minutesOf(s.start) - from * 60) / 60) * HOUR_PX + 2, height = Math.max(44, (s.minutes / 60) * HOUR_PX - 4), isDone = done.has(s.id);
    return (
      <button key={s.id} type="button" className="camp-cal-event" data-component={s.component} data-kind={s.kind} data-done={isDone} style={{ top, height }} onClick={() => setOpenId(s.id)} aria-label={`${s.title}, ${sessionSkill(s)}, ${clock(s.start)}, ${duration(s.minutes)}${isDone ? ", done" : ""}`}>
        <span className="camp-cal-event-top"><b>{s.title}</b>{isDone ? <span className="camp-cal-event-check"><Check size={10} strokeWidth={3} aria-hidden="true" /></span> : <i>{sessionCode(s)}</i>}</span>
        <small>{clock(s.start)} · {s.minutes}m</small>
        {height >= 76 && <small className="camp-cal-event-sub">{s.lesson ? s.lesson.course.title : s.kind === "study" ? `${ROUTE_COMPONENT_LABEL[s.component]} · ${s.level}` : sessionSkill(s)}</small>}
      </button>
    );
  };
  const dayChips = (compact = false) => (
    <div className="camp-cal-daychips" role="group" aria-label="Choose a day">
      {days.map((iso, i) => {
        const count = byDay(iso).length;
        return (
          <button key={iso} type="button" aria-pressed={day === i} data-today={iso === today} onClick={() => setDay(i)}>
            <b>{asDate(iso).toLocaleDateString(undefined, { weekday: "short" })}</b>
            <span>{asDate(iso).toLocaleDateString(undefined, compact ? { day: "numeric" } : { day: "numeric", month: "short" })}</span>
            {count > 0 && <i aria-label={`${count} ${count === 1 ? "session" : "sessions"}`} />}
          </button>
        );
      })}
    </div>
  );
  const column = (iso: string) => (
    <div key={iso} className="camp-cal-col" style={{ height: hours.length * HOUR_PX }} data-today={iso === today}>
      {hours.map((h, i) => <span key={h} className="camp-cal-cell" style={{ top: i * HOUR_PX + 2, height: HOUR_PX - 4 }} aria-hidden="true" />)}
      {byDay(iso).map(block)}
    </div>
  );
  const axis = () => <div className="camp-cal-axis" aria-hidden="true">{hours.map(h => <span key={h} style={{ height: HOUR_PX }}>{hourLabel(h)}</span>)}</div>;

  return (
    <section className="camp-cal" aria-labelledby="route-calendar">
      <header className="camp-cal-bar">
        <div className="camp-cal-title">
          <span className="camp-cal-icon" aria-hidden="true"><CalendarDays size={18} /></span>
          <div><h3 id="route-calendar">Study calendar</h3><p>{route.start === route.target ? route.start : `${route.start} → ${route.target}`} · {route.exam.name} · {Intl.DateTimeFormat().resolvedOptions().timeZone}</p></div>
        </div>
        <div className="camp-cal-actions">
          <div className="camp-cal-views" role="group" aria-label="Calendar view">
            {(["week", "day", "month"] as const).map(v => <button key={v} type="button" aria-pressed={view === v} onClick={() => setView(v)}>{v === "week" ? "Week" : v === "day" ? "Day" : "Month"}</button>)}
          </div>
          <button type="button" className="camp-cal-export" onClick={onExport}><CalendarPlus size={15} aria-hidden="true" />Add to calendar</button>
        </div>
      </header>

      <div className="camp-cal-ribbon">
        <p className="camp-cal-stats">
          <span><b>{studied.length}</b>/{route.sessions.length} sessions</span>
          <span><b>{hoursDone}h</b>/{hoursPlanned}h done</span>
          <span>Week {week}: <b className="camp-cal-accent">{weekPct}%</b></span>
          {nextCheck && <span className="camp-cal-hide-sm">Next check: <b>week {nextCheck.week}</b></span>}
        </p>
        <div className="camp-cal-nav">
          <button type="button" className="camp-cal-round" aria-label={view === "month" ? "Previous 4 weeks" : "Previous week"} disabled={week <= 1} onClick={() => go(view === "month" ? week - 4 : week - 1)}><ChevronLeft size={16} aria-hidden="true" /></button>
          <span className="camp-cal-range" aria-live="polite">W{week}/{ROUTE_WEEKS} · {asDate(weekStart).toLocaleDateString(undefined, { day: "numeric", month: "short" })}</span>
          <button type="button" className="camp-cal-round" aria-label={view === "month" ? "Next 4 weeks" : "Next week"} disabled={week >= ROUTE_WEEKS} onClick={() => go(view === "month" ? week + 4 : week + 1)}><ChevronRight size={16} aria-hidden="true" /></button>
          <button type="button" className="camp-cal-chip" onClick={() => jumpTo(today)}>Today</button>
          <input type="date" className="camp-cal-date" aria-label="Jump to date" min={startDate} max={addDays(startDate, ROUTE_WEEKS * 7 - 1)} value={weekStart} onChange={e => jumpTo(e.target.value)} />
        </div>
        <div className="camp-cal-phases" role="group" aria-label="Jump to a month of the route">
          {route.phases.map(p => <button key={p.index} type="button" aria-pressed={p.index === phase.index} onClick={() => go(p.from)}>M{p.index}: {p.title} <span>(W{p.from}–{p.to})</span></button>)}
        </div>
        {notice && <p className="camp-cal-toast" role="status">{notice}</p>}
      </div>

      <div className="camp-cal-canvas">
        {view === "week" && (
          <>
            <div className="camp-cal-mobile">
              {dayChips(true)}
              <div className="camp-cal-dayhead"><b>{asDate(days[day]).toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" })}</b><span>{phase.title}</span></div>
              <div className="camp-cal-grid" style={{ gridTemplateColumns: "48px minmax(0, 1fr)" }}>{axis()}{column(days[day])}</div>
            </div>
            <div className="camp-cal-desktop">
              <div className="camp-cal-heads" style={{ gridTemplateColumns: "48px repeat(7, minmax(0, 1fr))" }}>
                <span />
                {days.map(iso => {
                  const cp = checkpointOn.get(iso);
                  return (
                    <div key={iso} className="camp-cal-head" data-today={iso === today}>
                      <b>{asDate(iso).toLocaleDateString(undefined, { weekday: "short" })}</b>
                      <span>{asDate(iso).toLocaleDateString(undefined, { day: "numeric", month: "short" })}</span>
                      {cp && <small data-kind={cp.kind}><Flag size={11} aria-hidden="true" />{cp.kind === "final" ? "Final check" : cp.kind === "midpoint" ? "Mid-point test" : "Checkpoint"}</small>}
                    </div>
                  );
                })}
              </div>
              <div className="camp-cal-grid" style={{ gridTemplateColumns: "48px repeat(7, minmax(0, 1fr))" }}>{axis()}{days.map(column)}</div>
            </div>
          </>
        )}

        {view === "day" && (
          <div className="camp-cal-dayview">
            {dayChips()}
            <div className="camp-cal-daycard">
              <div className="camp-cal-dayhead"><b>{asDate(days[day]).toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" })}</b><span>Week {week} · {phase.title}</span></div>
              {byDay(days[day]).length === 0 ? <p className="camp-cal-empty">No study session on this day. Rest, or review a lesson you found hard.</p> : (
                <ul className="camp-cal-list">
                  {byDay(days[day]).map(s => (
                    <li key={s.id}>
                      <button type="button" className="camp-cal-item" data-component={s.component} data-kind={s.kind} data-done={done.has(s.id)} onClick={() => setOpenId(s.id)}>
                        <span className="camp-cal-item-meta"><i>{sessionCode(s)}</i>{clock(s.start)} – {clock(s.end)} ({duration(s.minutes)})</span>
                        <b>{s.title}</b>
                        <small>{s.lesson ? `${s.lesson.course.title} · ${ROUTE_COMPONENT_LABEL[s.component]}` : sessionSkill(s)}</small>
                        {done.has(s.id) && <span className="camp-cal-event-check camp-cal-item-check"><Check size={13} strokeWidth={3} aria-label="Done" /></span>}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {view === "month" && (
          <div className="camp-cal-month">
            <div className="camp-cal-month-heads" aria-hidden="true">{days.map(iso => <span key={iso}>{asDate(iso).toLocaleDateString(undefined, { weekday: "short" })}</span>)}</div>
            {monthWeeks.map(w => {
              const ws = addDays(startDate, (w - 1) * 7), list = route.sessions.filter(s => s.week === w);
              return (
                <div key={w} className="camp-cal-month-week" data-current={w === currentWeek}>
                  <p><b>Week {w} · {route.phases.find(p => w >= p.from && w <= p.to)?.title}</b><span>{Math.round(list.reduce((n, s) => n + s.minutes, 0) / 6) / 10}h · {list.filter(s => done.has(s.id)).length}/{list.length} done</span></p>
                  <div className="camp-cal-month-row">
                    {Array.from({ length: 7 }, (_, i) => addDays(ws, i)).map((iso, i) => {
                      const items = byDay(iso), cp = checkpointOn.get(iso);
                      return (
                        <button key={iso} type="button" className="camp-cal-month-cell" data-today={iso === today} onClick={() => { setWeek(w); setDay(i); setView("week"); }} aria-label={`${asDate(iso).toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" })}: ${items.length ? items.map(s => s.title).join(", ") : "no session"}`}>
                          <span className="camp-cal-month-date">{asDate(iso).toLocaleDateString(undefined, { day: "numeric", month: "short" })}{cp && <Flag size={11} aria-hidden="true" />}</span>
                          {items.slice(0, 3).map(s => <span key={s.id} className="camp-cal-mini" data-component={s.component} data-kind={s.kind} data-done={done.has(s.id)}>{s.title}</span>)}
                          {items.length > 3 && <small>+{items.length - 3} more</small>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <footer className="camp-cal-foot">
        <span className="camp-cal-hide-sm">Select any session for the lesson, the task and the done button</span>
        <ul aria-label="Colour key">
          {(legend.length ? legend : ROUTE_COMPONENTS).map(c => <li key={c} data-component={c}><i aria-hidden="true" />{SHORT_LABEL[c]} <small>({ROUTE_COMPONENT_CODE[c]})</small></li>)}
          {weekSessions.some(s => s.kind !== "study") && <li data-kind="mock"><i aria-hidden="true" />Exam <small>(EXM)</small></li>}
        </ul>
      </footer>

      <SessionDrawer session={active} done={active ? done.has(active.id) : false} phaseAim={active ? route.phases.find(p => p.index === active.phase)?.aim : undefined} onClose={() => setOpenId(null)} onToggle={() => active && onToggle(active.id)} />
    </section>
  );
}

function SessionDrawer({ session, done, phaseAim, onClose, onToggle }: { session: RouteSession | null; done: boolean; phaseAim?: string; onClose: () => void; onToggle: () => void }) {
  const origin = typeof window === "undefined" ? "https://englishcamp.invalid" : window.location.origin;
  // Portal into the workspace so the drawer keeps the liquid-glass tokens and theme.
  const [host, setHost] = useState<HTMLElement | null>(null);
  useEffect(() => { setHost(document.querySelector<HTMLElement>(".camp-workspace")); }, []);
  return (
    <DialogPrimitive.Root open={!!session} onOpenChange={open => { if (!open) onClose(); }}>
      <DialogPrimitive.Portal container={host ?? undefined}>
        <DialogPrimitive.Overlay className="camp-cal-overlay" />
        <DialogPrimitive.Content className="camp-cal-drawer" data-component={session?.component} data-kind={session?.kind}>
          {session && (
            <>
              <div className="camp-cal-drawer-head">
                <div>
                  <p className="camp-cal-drawer-chips">
                    <span className="camp-cal-chip-skill"><i aria-hidden="true" />{sessionSkill(session)} · {sessionCode(session)}</span>
                    <span className="camp-cal-chip-state" data-done={done}>{done ? "Done" : "To do"}</span>
                  </p>
                  <DialogPrimitive.Title className="camp-cal-drawer-title">{session.title}</DialogPrimitive.Title>
                  <DialogPrimitive.Description className="camp-cal-drawer-when">
                    {session.start.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" })} · {clock(session.start)} – {clock(session.end)} ({duration(session.minutes)}) · week {session.week}
                  </DialogPrimitive.Description>
                </div>
                <DialogPrimitive.Close className="camp-cal-round" aria-label="Close"><X size={16} aria-hidden="true" /></DialogPrimitive.Close>
              </div>
              <div className="camp-cal-drawer-actions">
                <button type="button" className="camp-cal-primary" data-done={done} onClick={onToggle}>{done ? <>Done · undo</> : <><Check size={15} aria-hidden="true" />Mark session done</>}</button>
                {session.external
                  ? <a className="camp-cal-chip" href={session.href} target="_blank" rel="noreferrer">Open <ExternalLink size={13} aria-hidden="true" /></a>
                  : <Link className="camp-cal-chip" href={session.href} onClick={onClose}>{session.lesson ? "Open lesson" : "Open practice"}</Link>}
                <a className="camp-cal-chip" href={googleCalendarUrl(session, origin)} target="_blank" rel="noreferrer">Google Calendar <ExternalLink size={13} aria-hidden="true" /></a>
              </div>
              <div className="camp-cal-drawer-body">
                <section><h3>What to do</h3><p>{session.task}</p></section>
                {session.lesson && (
                  <section><h3>Course lesson</h3><p><b>{session.lesson.course.title}</b></p><p><Link href={session.lesson.href} onClick={onClose}>{session.lesson.title}</Link></p><p className="camp-cal-muted">{ROUTE_COMPONENT_LABEL[session.lesson.component]} · done when you mark the lesson complete.</p></section>
                )}
                <section><h3>Level and skill</h3><p>{session.level} · {sessionSkill(session)}</p></section>
                {phaseAim && <section><h3>Month {session.phase} aim</h3><p>{phaseAim}</p></section>}
              </div>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
