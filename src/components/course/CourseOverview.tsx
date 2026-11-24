"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { courseCatalogue as levels, type CourseSummary } from "@/data/course-catalogue";
import { resumeModule, cycleComplete, courseSnapshot } from "@/lib/courseProgress";
import { useProgress } from "@/store/useProgress";
import { lessonReadKey } from "./LessonDoneButton";
import { NumberSeal } from '@/components/ui/NumberSeal';
import { CheckCircle, Play, BookOpen, Zap, Dumbbell, Sparkles } from "lucide-react";

const COURSE_SHORT: Record<string, string> = { "band4-5": "B2 First", "band5-6": "IELTS Academic", "band6-7": "TOEFL iBT", "band7-8": "IELTS General" };

export function CourseOverview({ level }: { level: CourseSummary }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const [filter, setFilter] = useState<string>("all");
  const { isLessonDone, getLevelProgress, getBestScore, modules, lessons, exercisesDone } = useProgress();
  const resume = ready ? resumeModule(level.lessons.map(l => l.id), modules, lessons) : level.lessons[0]?.id;
  const hasHistory = ready && level.lessons.some(l => modules[l.id]?.lastActiveAt || isLessonDone(l.id));
  const practiceCount = ready ? level.lessons.filter(l => cycleComplete(modules[l.id])).length : 0;
  const progress = !ready ? 0 : getLevelProgress(level.id, level.lessons.length, (id) => isLessonDone(id), level.lessons.map(l => l.id));
  const snapshot = courseSnapshot(level.lessons.map(l=>l.id), ready?modules:{}, ready?lessons:{});
  const bestQuiz = ready ? getBestScore(level.id as any) : 0;

  const filteredLessons = level.lessons.filter(lesson => filter === "all" || lesson.skills.includes(filter));
  const resumeLesson = level.lessons.find(l => l.id === resume) ?? level.lessons[0];
  const skillTabs = [
    { id: "all", label: "All" }, { id: "listening", label: "Listening" }, { id: "reading", label: "Reading" }, { id: "writing", label: "Writing" },
    { id: "speaking", label: "Speaking" }, { id: "grammar", label: "Grammar" }, { id: "vocabulary", label: "Vocabulary" },
  ].map(tab => ({ ...tab, count: tab.id === "all" ? level.lessons.length : level.lessons.filter(l => l.skills.includes(tab.id)).length })).filter(tab => tab.count > 0);
  const ring = 2 * Math.PI * 34;
  const statusOf = (id: string) => {
    const m = ready ? modules[id] : undefined;
    const stages = m ? [0, 1, 2].filter(i => m.stages[i]).length : 0;
    if (ready && (cycleComplete(m) || isLessonDone(id))) return { key: "done", label: "Completed", stages: 3 };
    if (stages > 0 || m?.lastActiveAt || m?.viewedAt) return { key: "active", label: stages ? `In progress · ${stages}/3` : "Started", stages };
    return { key: "new", label: "Not started", stages: 0 };
  };

  return (
    <div className="camp-section-stack camp-course-v2">
      {level.examBadge && (
        <nav className="camp-course-switch" aria-label="Practice courses">
          {levels.filter((l) => l.examBadge).map((lvl) => (
            <Link prefetch={false} key={lvl.id} href={`/levels/${lvl.id}`} aria-current={lvl.id === level.id ? "page" : undefined}>
              <strong>{COURSE_SHORT[lvl.id] ?? lvl.title}</strong><small>{lvl.examBadge}</small>
            </Link>
          ))}
        </nav>
      )}

      <motion.section initial={false} animate={{ opacity: 1, y: 0 }} className="camp-course-v2-hero" aria-labelledby="course-title">
        <div className="camp-course-v2-copy">
          <div className="camp-course-v2-tags">
            {level.examBadge && <span>{level.examBadge}</span>}
            <span>{level.lessons.length} modules</span>
            {level.duration && <span>{level.duration}</span>}
          </div>
          <h1 id="course-title">{level.title}</h1>
          <p className="camp-course-v2-sub">{level.subtitle}</p>
          <details className="camp-course-v2-about">
            <summary>About this course</summary>
            <p>{level.intro}</p>
            <ul>{level.goals.slice(0, 4).map((g, i) => <li key={i}><CheckCircle size={15} aria-hidden="true" />{g}</li>)}</ul>
            <p className="camp-course-v2-fine">Course credit includes retained historical completions. Writing and Speaking are self-reviewed; the percentage is not an exam score.</p>
          </details>
        </div>
        <div className="camp-course-v2-ring" role="img" aria-label={`${progress}% of the course complete`}>
          <svg viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="34" className="track" /><circle cx="40" cy="40" r="34" className="value" strokeDasharray={ring} strokeDashoffset={ring - (ring * Math.min(100, progress)) / 100} /></svg>
          <strong>{progress}%</strong>
          <small>{snapshot.completed}/{level.lessons.length} done</small>
        </div>
      </motion.section>

      <section className="camp-course-v2-next" aria-label="Continue learning">
        <NumberSeal value={resumeLesson?.moduleNumber ?? 1} label={`Module ${resumeLesson?.moduleNumber ?? 1}`} completed={false} />
        <div className="min-w-0">
          <small>{hasHistory ? "Continue where you left off" : "Start here"}</small>
          <strong>{resumeLesson?.title}</strong>
          <span>{snapshot.started} in progress · {snapshot.stages}/{level.lessons.length * 3} stages finished</span>
        </div>
        <div className="camp-course-v2-next-actions">
          <Link prefetch={false} href={`/levels/${level.id}/lessons/${resume}`} className="camp-course-v2-primary"><Play size={16} aria-hidden="true" />{hasHistory ? "Resume" : "Start course"}</Link>
          <Link prefetch={false} href={level.examHref || "/mock-exam"} className="camp-course-v2-ghost"><Zap size={15} aria-hidden="true" />Mock exam</Link>
          <Link prefetch={false} href="/flashcards" className="camp-course-v2-ghost"><BookOpen size={15} aria-hidden="true" />Flashcards</Link>
        </div>
      </section>

      {level.id === "band4-5" && <details className="camp-course-v2-tip"><summary><Sparkles size={16} aria-hidden="true" />Need grammar support first? Start with these modules</summary>
        <p>If you are comfortable with everyday connected English but need grammar support, use these existing modules before returning to Module 1. This course does not provide beginner placement.</p>
        <div>{[3,18,19,1].map(number => <Link prefetch={false} key={number} href={`/levels/${level.id}/lessons/${level.lessons[number - 1].id}`}>Module {number}: {level.lessons[number - 1].title}</Link>)}</div>
      </details>}
      {level.id === "band7-8" && <details className="camp-course-v2-tip"><summary><Sparkles size={16} aria-hidden="true" />Shared IELTS Listening and Speaking practice</summary>
        <p>These skills are shared by General Training and Academic IELTS. The links open existing shared-skill modules; General Training letters and Reading remain in this course. Synthetic voices provide focused practice rather than an accent-coverage guarantee.</p>
        <div><Link prefetch={false} href="/exercises/band2-listening-maps">Plans, directions and facilities matching</Link><Link prefetch={false} href="/exercises/band2-speaking-cue-card">Part 1 answers and Part 2 planning</Link><Link prefetch={false} href="/exercises/band4-mock-ielts-listening">GT plan-labelling checkpoint</Link></div>
      </details>}

      {bestQuiz > 0 && <p className="camp-course-v2-quiz">🏆 Best quiz score: <strong>{bestQuiz}%</strong> · {bestQuiz >= 80 ? "Strong local quiz result. Continue applying the skills." : "Keep practicing to improve!"}</p>}

      <section className="camp-course-v2-modules" aria-labelledby="modules-heading">
        <div className="camp-course-v2-modules-head">
          <h2 id="modules-heading">Modules <span className="camp-hub-section-count">{filteredLessons.length}</span></h2>
          <div className="camp-course-v2-filters" role="group" aria-label="Filter modules by skill">
            {skillTabs.map(tab => <button key={tab.id} type="button" aria-pressed={filter === tab.id} onClick={() => setFilter(tab.id)}>{tab.label}<span>{tab.count}</span></button>)}
          </div>
        </div>
        <ol className="camp-course-v2-grid">
          {filteredLessons.map((lesson) => {
            const st = statusOf(lesson.id);
            const read = ready && exercisesDone[lessonReadKey(lesson.id)];
            return (
              <li key={lesson.id} className="camp-course-v2-card" data-status={st.key}>
                <div className="camp-course-v2-card-top">
                  <NumberSeal value={lesson.moduleNumber} label={`Module ${lesson.moduleNumber}${st.key === "done" ? ", completed" : ""}`} completed={st.key === "done"} />
                  <span className="camp-course-v2-status" data-status={st.key}>{st.key === "done" ? <CheckCircle size={13} aria-hidden="true" /> : null}{st.label}</span>
                </div>
                <h3><Link prefetch={false} href={`/levels/${level.id}/lessons/${lesson.id}`}>{lesson.title}</Link></h3>
                {lesson.subtitle && <p>{lesson.subtitle}</p>}
                <div className="camp-course-v2-stagebar" aria-hidden="true">{[0, 1, 2].map(i => <span key={i} data-on={i < st.stages} />)}</div>
                <div className="camp-course-v2-card-foot">
                  <span className="camp-course-v2-meta">{lesson.skills.slice(0, 2).map(skill => <em key={skill}>{skill}</em>)}<span>+{lesson.xpReward} XP</span>{read && <span className="camp-read-badge">Read</span>}</span>
                  <Link prefetch={false} href={`/exercises/${lesson.id}`} className="camp-course-v2-drill" aria-label={`Practice drills for module ${lesson.moduleNumber}`} title="Practice drills"><Dumbbell size={16} aria-hidden="true" /></Link>
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
