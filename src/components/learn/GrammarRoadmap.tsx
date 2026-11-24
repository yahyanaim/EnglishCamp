"use client";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Circle } from "lucide-react";
import { useProgress } from "@/store/useProgress";
import { GRAMMAR_CURRICULUM, grammarLessonKey, grammarLevelProgress } from "@/data/grammar-curriculum";
import { SECTIONS } from "./GrammarReference";

const TITLES: Record<string, string> = Object.fromEntries(SECTIONS.map(section => [section.id, section.title]));

/** What to learn at each CEFR level, in teaching order, with the learner's progress. */
export function GrammarRoadmap() {
  const done = useProgress(s => s.exercisesDone);
  const progress = grammarLevelProgress(done);
  return (
    <div className="camp-grammar-roadmap">
      {GRAMMAR_CURRICULUM.map((level, levelIndex) => {
        const p = progress[levelIndex], pct = p.total ? Math.round(p.learned / p.total * 100) : 0;
        return (
          <section key={level.level} className="camp-roadmap-level" aria-labelledby={`roadmap-${level.level}`}>
            <header className="camp-roadmap-head">
              <span className="camp-roadmap-badge" data-level={level.level}>{level.level}</span>
              <div className="camp-roadmap-copy">
                <h2 id={`roadmap-${level.level}`}>{level.name}</h2>
                <p>{level.goal}</p>
              </div>
              <div className="camp-roadmap-meter" aria-label={`${p.learned} of ${p.total} lessons learned`}>
                <strong>{pct}%</strong><span>{p.learned}/{p.total} lessons</span>
                <span className="camp-grammar-path-bar" aria-hidden="true"><span style={{ width: `${pct}%` }} /></span>
              </div>
            </header>
            <ol className="camp-roadmap-points">
              {level.points.map((point, index) => {
                const complete = point.lessons.every(id => done[grammarLessonKey(id)]);
                return (
                  <li key={point.title} className="camp-roadmap-point" data-complete={complete || undefined}>
                    <span className="camp-roadmap-step" aria-hidden="true">{complete ? <CheckCircle2 size={20} /> : index + 1}</span>
                    <div className="camp-roadmap-point-copy">
                      <h3>{point.title}</h3>
                      <p>{point.canDo}</p>
                      <div className="camp-roadmap-links">
                        {point.lessons.map(id => (
                          <Link key={id} href={`/grammar#${id}`} className="camp-roadmap-link">
                            {done[grammarLessonKey(id)] ? <CheckCircle2 size={14} aria-label="Learned" /> : <Circle size={14} aria-hidden="true" />}
                            <span>{TITLES[id] ?? id}</span>
                            <ChevronRight size={14} aria-hidden="true" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
