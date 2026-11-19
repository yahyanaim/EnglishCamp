"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CheckCircle2, ChevronRight, Clock, RotateCcw, Search, Sparkles, Trophy, X } from "lucide-react";
import { LearningArt } from "@/components/brand/LearningArt";
import { SelectField } from "@/components/ui/shadcn/select-field";
import { GAME_TRAINERS, PRACTICE_LEVELS, PRACTICE_TIMES, practiceLevel, practiceMinutes } from "@/data/practice-meta";
import { lastPractice, usePracticeHistory } from "@/store/usePracticeHistory";
import { useDailyChallenge } from "@/store/useDailyChallenge";
import { useErrors } from "@/store/useErrors";
import { localDay } from "@/lib/learningActivity";
import "./practice-hub.css";

export type HubTrainer = { id: string; label: string; desc: string; icon: string };
export type HubCategory = { id: string; label: string; trainers: HubTrainer[] };
const PREVIEW = 6;

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
  const clear = () => { setQuery(""); setSkill("all"); setLevel("all"); setTime("all"); };

  return (
    <>
      <section className="camp-hub-today" aria-label="Today">
        <button type="button" className="camp-hub-today-tile" onClick={() => onOpen(recent?.id ?? "noun-gender")}>
          <span className="camp-hub-today-icon"><RotateCcw size={20} aria-hidden="true" /></span>
          <span><small>{recent ? "Continue" : "Start here"}</small><strong>{recent ? labelOf(recent) : "Articles (A / An)"}</strong></span>
          <ChevronRight size={18} aria-hidden="true" />
        </button>
        <Link href="/daily-challenge" className="camp-hub-today-tile">
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

      <section className="camp-hub-filters" aria-label="Find a trainer">
        <label className="camp-hub-search">
          <Search size={16} aria-hidden="true" />
          <span className="sr-only">Search trainers</span>
          <input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search trainers and games…" />
        </label>
        <div className="camp-hub-selects">
          <SelectField aria-label="Level" value={level} onValueChange={setLevel}>
            <option value="all">All levels</option>
            {PRACTICE_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
          </SelectField>
          <SelectField aria-label="Time" value={time} onValueChange={setTime}>
            <option value="all">Any time</option>
            {PRACTICE_TIMES.map(m => <option key={m} value={String(m)}>{m} minutes</option>)}
          </SelectField>
        </div>
        <div className="camp-hub-skills" role="group" aria-label="Skill">
          <button type="button" aria-pressed={skill === "all"} onClick={() => setSkill("all")}>All</button>
          {categories.map(c => <button key={c.id} type="button" aria-pressed={skill === c.id} onClick={() => setSkill(c.id)}>{c.label}</button>)}
        </div>
        <p className="camp-hub-count" role="status">{shown} {shown === 1 ? "trainer" : "trainers"}{filtering || skill !== "all" ? <> · <button type="button" onClick={clear}><X size={13} aria-hidden="true" />Clear filters</button></> : null}</p>
      </section>

      {sections.length === 0 && <p className="camp-hub-empty">No trainer matches these filters. <button type="button" onClick={clear}>Clear filters</button></p>}

      {sections.map(category => {
        const sectionId = `practice-${category.id}`, open = filtering || skill !== "all" || expanded[category.id];
        const list = open ? category.trainers : category.trainers.slice(0, PREVIEW), games = category.id === "games";
        return (
          <section key={category.id} className="camp-learning-library-group" aria-labelledby={sectionId}>
            <h2 id={sectionId} tabIndex={-1}>{category.label} <span className="camp-hub-section-count">{category.trainers.length}</span></h2>
            <div className={`camp-trainer-grid${games ? " camp-hub-game-grid" : ""}`}>
              {list.map(trainer => {
                const done = !!visits[trainer.id], tile = games || GAME_TRAINERS.has(trainer.id);
                return (
                  <button key={trainer.id} id={`trainer-${trainer.id}`} type="button" className={`camp-learning-library-card${tile && games ? " camp-hub-tile" : ""}`} onClick={() => onOpen(trainer.id)}>
                    <span className="camp-library-card-icon"><LearningArt name={trainer.icon} size={tile && games ? 30 : 23} /></span>
                    <span className="camp-library-card-copy">
                      <strong>{labelOf(trainer)}</strong>
                      <span>{trainer.desc}</span>
                      <span className="camp-hub-meta">
                        <span className="camp-hub-level">{practiceLevel(trainer.id)}</span>
                        <span><Clock size={12} aria-hidden="true" />{practiceMinutes(trainer.id)} min</span>
                        {done && <span className="camp-hub-done"><CheckCircle2 size={12} aria-hidden="true" />Practised</span>}
                      </span>
                    </span>
                    <ChevronRight className="camp-library-card-arrow" size={18} aria-hidden="true" />
                  </button>
                );
              })}
            </div>
            {!open && category.trainers.length > PREVIEW && (
              <button type="button" className="camp-hub-more" aria-controls={sectionId} onClick={() => setExpanded(e => ({ ...e, [category.id]: true }))}>Show all {category.trainers.length}</button>
            )}
          </section>
        );
      })}
    </>
  );
}
