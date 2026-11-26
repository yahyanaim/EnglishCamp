"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CheckCircle2, ChevronRight, Clock, Search, Sparkles, Trophy, X } from "lucide-react";
import { LearningArt } from "@/components/brand/LearningArt";
import { HubContinue, HubHero, LevelRail } from "@/components/learn/HubHero";
import { GAME_TRAINERS, PRACTICE_LEVELS, PRACTICE_TIMES, practiceLevel, practiceMinutes } from "@/data/practice-meta";
import { lastPractice, usePracticeHistory } from "@/store/usePracticeHistory";
import { useDailyChallenge } from "@/store/useDailyChallenge";
import { useErrors } from "@/store/useErrors";
import { localDay } from "@/lib/learningActivity";

export type HubTrainer = { id: string; label: string; desc: string; icon: string };
export type HubCategory = { id: string; label: string; trainers: HubTrainer[] };
const PREVIEW = 6;
const LEVEL_NAMES: Record<string, string> = { A1: "Beginner", A2: "Elementary", B1: "Intermediate", B2: "Upper intermediate", C1: "Advanced" };

export function PracticeHubHome({ categories, labelOf, onOpen }: { categories: HubCategory[]; labelOf: (t: HubTrainer) => string; onOpen: (id: string) => void }) {
  const visits = usePracticeHistory(s => s.visits);
  const dailyDone = useDailyChallenge(s => s.completed && s.lastDate === localDay());
  const mistakes = useErrors(s => s.errors.filter(e => !e.reviewed).length);
  const [query, setQuery] = useState(""), [skill, setSkill] = useState("all"), [level, setLevel] = useState("all"), [time, setTime] = useState("all");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const all = useMemo(() => categories.flatMap(c => c.trainers), [categories]);
  const recentId = lastPractice(visits), recent = all.find(t => t.id === recentId);
  const filtering = query.trim() !== "" || level !== "all" || time !== "all";
  const sections = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories.filter(c => skill === "all" || c.id === skill).map(c => ({
      ...c,
      trainers: c.trainers.filter(t =>
        (!q || `${labelOf(t)} ${t.desc}`.toLowerCase().includes(q)) &&
        (level === "all" || practiceLevel(t.id) === level) &&
        (time === "all" || practiceMinutes(t.id) === Number(time))),
    })).filter(c => c.trainers.length > 0);
  }, [categories, labelOf, query, skill, level, time]);
  const shown = sections.reduce((n, c) => n + c.trainers.length, 0);
  const practised = all.filter(t => visits[t.id]).length;
  const levelItems = PRACTICE_LEVELS.map(l => {
    const list = all.filter(t => practiceLevel(t.id) === l);
    return { value: l as string, name: LEVEL_NAMES[l] ?? l, total: list.length, done: list.filter(t => visits[t.id]).length };
  });
  const clear = () => { setQuery(""); setSkill("all"); setLevel("all"); setTime("all"); };

  return (
    <div className="camp-hub-v2 camp-practice-hub-v2 space-y-6">
      <HubHero eyebrow="Practice" title="Practice Hub" art="Brain"
        description={`${all.length} trainers and games to practise grammar, vocabulary, listening and writing in short sessions.`}
        stats={[
          { label: "Trainers", value: all.length },
          { label: "Practised", value: practised },
          { label: "To review", value: mistakes },
          { label: "Challenge", value: dailyDone ? "Done" : "Open" },
        ]}
        progress={{ value: practised, total: all.length, label: "Trainers practised" }}
        action={<HubContinue art={recent?.icon ?? "Target"} kicker={recent ? "Continue practising" : "Start here"} title={recent ? labelOf(recent) : "Articles (A / An)"}
          meta={recent ? `${practiceLevel(recent.id)} · ${practiceMinutes(recent.id)} min` : `${practiceLevel("noun-gender")} · ${practiceMinutes("noun-gender")} min`} onClick={() => onOpen(recent?.id ?? "noun-gender")} />} />

      <section className="camp-hub-today" aria-label="Today">
        <Link href="/daily-challenge" className="camp-hub-today-tile" data-done={dailyDone}>
          <span className="camp-hub-today-icon"><Trophy size={20} aria-hidden="true" /></span>
          <span><small>Daily challenge</small><strong>{dailyDone ? "Done today ✓" : "5 questions"}</strong></span>
          <ChevronRight size={18} aria-hidden="true" />
        </Link>
        <button type="button" className="camp-hub-today-tile" onClick={() => onOpen("error-review")}>
          <span className="camp-hub-today-icon"><Sparkles size={20} aria-hidden="true" /></span>
          <span><small>Review my mistakes</small><strong>{mistakes ? `${mistakes} to review` : "Nothing to review"}</strong></span>
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </section>

      <LevelRail label="Practice by level" value={level} onChange={value => setLevel(value)} items={levelItems} />

      <section className="camp-hub-toolbar" aria-label="Find a trainer">
        <div className="camp-hub-toolbar-row">
          <label className="camp-hub-search">
            <Search size={16} aria-hidden="true" />
            <span className="sr-only">Search trainers</span>
            <input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search trainers and games…" />
          </label>
          <div className="camp-hub-segment" role="group" aria-label="Time">
            <button type="button" aria-pressed={time === "all"} onClick={() => setTime("all")}>Any time</button>
            {PRACTICE_TIMES.map(m => <button key={m} type="button" aria-pressed={time === String(m)} onClick={() => setTime(String(m))}>{m} min</button>)}
          </div>
        </div>
        <div className="camp-hub-toolbar-row">
          <div className="camp-hub-chips" role="group" aria-label="Skill">
            <button type="button" aria-pressed={skill === "all"} onClick={() => setSkill("all")}>All skills</button>
            {categories.map(c => <button key={c.id} type="button" aria-pressed={skill === c.id} onClick={() => setSkill(c.id)}>{c.label}</button>)}
          </div>
          <p className="camp-hub-count" role="status">{shown} {shown === 1 ? "trainer" : "trainers"}{filtering || skill !== "all" ? <> · <button type="button" onClick={clear}><X size={13} aria-hidden="true" />Clear filters</button></> : null}</p>
        </div>
      </section>

      {sections.length === 0 && <p className="camp-hub-empty">No trainer matches these filters. <button type="button" onClick={clear}>Clear filters</button></p>}

      {sections.map(category => {
        const sectionId = `practice-${category.id}`, open = filtering || skill !== "all" || expanded[category.id];
        const list = open ? category.trainers : category.trainers.slice(0, PREVIEW), games = category.id === "games";
        const total = category.trainers.length, done = category.trainers.filter(t => visits[t.id]).length;
        return (
          <section key={category.id} className="camp-learning-library-group" aria-labelledby={sectionId}>
            <div className="camp-hub-group-head">
              <h2 id={sectionId} tabIndex={-1}>{category.label} <span className="camp-hub-section-count">{total}</span></h2>
              <span className="camp-hub-group-progress">{done}/{total} practised<span className="camp-level-rail-bar" aria-hidden="true"><span style={{ width: `${total ? done / total * 100 : 0}%` }} /></span></span>
            </div>
            <div className={`camp-trainer-grid${games ? " camp-hub-game-grid" : ""}`}>
              {list.map(trainer => {
                const practisedTrainer = !!visits[trainer.id], tile = games || GAME_TRAINERS.has(trainer.id);
                return (
                  <button key={trainer.id} id={`trainer-${trainer.id}`} type="button" data-done={practisedTrainer} className={`camp-learning-library-card${tile && games ? " camp-hub-tile" : ""}`} onClick={() => onOpen(trainer.id)}>
                    <span className="camp-library-card-icon"><LearningArt name={trainer.icon} size={tile && games ? 30 : 23} /></span>
                    <span className="camp-library-card-copy">
                      <strong>{labelOf(trainer)}</strong>
                      <span>{trainer.desc}</span>
                      <span className="camp-hub-meta">
                        <span className="camp-hub-level">{practiceLevel(trainer.id)}</span>
                        <span><Clock size={12} aria-hidden="true" />{practiceMinutes(trainer.id)} min</span>
                        {practisedTrainer && <span className="camp-hub-done"><CheckCircle2 size={12} aria-hidden="true" />Practised</span>}
                      </span>
                    </span>
                    <ChevronRight className="camp-library-card-arrow" size={18} aria-hidden="true" />
                  </button>
                );
              })}
            </div>
            {!open && total > PREVIEW && (
              <button type="button" className="camp-hub-more" aria-controls={sectionId} onClick={() => setExpanded(e => ({ ...e, [category.id]: true }))}>Show all {total}</button>
            )}
          </section>
        );
      })}
    </div>
  );
}
