"use client";
import { PageBanner } from "@/components/ui/PageBanner";
import Link from "next/link";
import { courseSnapshot } from "@/lib/courseProgress";
import { getLevelInfo, XP_LEVELS } from "@/lib/xp";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { courseCatalogue as levels } from "@/data/course-catalogue";
import { useVocabulary } from "@/store/useVocabulary";
import { useErrors } from "@/store/useErrors";
import { ActivityChart } from "@/components/ui/ActivityChart";
import { Download, Flame, NotebookPen, Sparkles, BookOpenCheck, Dumbbell, Headphones, BookOpenText, ClipboardCheck, Trophy, BookHeart, AlertCircle } from "lucide-react";
import "./stats.css";

export default function StatsPage() {
  const { xp, streak, lessons, modules, quizResults, exercisesDone } = useProgress();
  const words = useVocabulary(state => state.words);
  const { errors } = useErrors();
  const { level, title, nextXP } = getLevelInfo(xp);
  const levelStart = XP_LEVELS.filter(item => item.level < level).reduce((sum, item) => sum + item.nextXP, 0);
  const levelPct = Number.isFinite(nextXP) ? Math.min(100, Math.round((xp - levelStart) / Math.max(1, nextXP - levelStart) * 100)) : 100;
  const done = (prefix: string) => Object.keys(exercisesDone).filter(id => exercisesDone[id] && id.startsWith(prefix)).length;
  const openMistakes = errors.filter(error => !error.reviewed).length;

  const doneLessons = Object.values(lessons).filter((l) => l.completed).length;
  const vocab = Object.entries(words);
  const masteredWords = vocab.filter(([, v]) => v.mastery === 3).length;
  const totalQuizzes = Object.values(quizResults).flat().length;
  const bestQuiz = Math.max(0, ...Object.values(quizResults).flat().map((r) => r.score));

  const levelBreakdown = useMemo(() => {
    return levels.map((lv) => {
      const ids = new Set(lv.lessons.map(lesson=>lesson.id));
      const lvlLessons = Object.entries(lessons).filter(([id]) => ids.has(id));
      const snapshot = courseSnapshot(Array.from(ids),modules,lessons);
      const done = snapshot.completed;
      const total = lv.lessons.length;
      const xpEarned = lvlLessons.reduce((s, [, p]) => s + p.xpEarned, 0);
      return { id: lv.id, title: lv.title, done, total, xpEarned, pct: snapshot.percent, stages: snapshot.stages };
    });
  }, [lessons,modules]);

  function handleExport() {
    const data = {
      exportedAt: new Date().toISOString(),
      level: `${level} - ${title}`,
      xp,
      streak,
      doneLessons,
      masteredWords,
      totalQuizzes,
      bestQuiz,
      errorCount: errors.length,
      levelBreakdown,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `englishcamp-stats-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const totals = [
    { label: "Lessons done", value: doneLessons, icon: BookOpenCheck },
    { label: "Exercises done", value: Object.values(exercisesDone).filter(Boolean).length, icon: Dumbbell },
    { label: "Listening lessons", value: done("listening:"), icon: Headphones },
    { label: "Reading passages", value: done("reading:"), icon: BookOpenText },
    { label: "Quizzes taken", value: totalQuizzes, icon: ClipboardCheck },
    { label: "Best quiz score", value: bestQuiz > 0 ? `${bestQuiz}%` : "–", icon: Trophy },
    { label: "Words saved", value: vocab.length, note: `${masteredWords} mastered`, icon: BookHeart },
    { label: "Mistakes to review", value: openMistakes, note: `${errors.length} tracked`, icon: AlertCircle },
  ];

  return (
    <div className="camp-stats space-y-6">
      <PageBanner><h1>Your progress</h1><p>Everything you have practised, in one place.</p></PageBanner>
      <motion.header initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="camp-stats-head">
        <div className="camp-stats-actions">
          <Link prefetch={false} href="/my-notes" className="camp-stats-action"><NotebookPen className="w-4 h-4" aria-hidden="true" /> My notes</Link>
          <button type="button" onClick={handleExport} className="camp-stats-action"><Download className="w-4 h-4" aria-hidden="true" /> Export</button>
        </div>
      </motion.header>

      <section className="camp-stats-hero" aria-label="Level and streak">
        <div className="camp-stats-level">
          <span className="camp-stats-level-badge">{level}</span>
          <div className="camp-stats-level-copy">
            <strong>{title}</strong>
            <span>{Number.isFinite(nextXP) ? `${Math.max(0, nextXP - xp).toLocaleString()} XP to level ${level + 1}` : "Top level reached"}</span>
            <div role="progressbar" aria-label="Progress to next level" aria-valuemin={0} aria-valuemax={100} aria-valuenow={levelPct} className="camp-stats-bar"><div style={{ width: `${levelPct}%` }} /></div>
          </div>
        </div>
        <div className="camp-stats-hero-kpis">
          <div><Sparkles className="w-4 h-4" aria-hidden="true" /><strong>{xp.toLocaleString()}</strong><span>Total XP</span></div>
          <div><Flame className="w-4 h-4" aria-hidden="true" /><strong>{streak}</strong><span>Day streak</span></div>
        </div>
      </section>

      <section aria-labelledby="stats-totals">
        <h2 id="stats-totals" className="camp-stats-title">Practice totals</h2>
        <div className="camp-stats-grid">
          {totals.map(({ label, value, note, icon: Icon }) => (
            <div key={label} className="camp-stats-tile">
              <span className="camp-stats-tile-icon"><Icon className="w-4 h-4" aria-hidden="true" /></span>
              <strong>{typeof value === "number" ? value.toLocaleString() : value}</strong>
              <span>{label}</span>
              {note && <small>{note}</small>}
            </div>
          ))}
        </div>
      </section>

      <ActivityChart />

      <section className="camp-stats-card" aria-labelledby="stats-courses">
        <h2 id="stats-courses" className="camp-stats-title">Courses</h2>
        <div className="camp-stats-courses">
          {levelBreakdown.map((lv) => (
            <div key={lv.id} className="camp-stats-course">
              <div className="camp-stats-course-top">
                <strong>{lv.title}</strong>
                <span>{lv.pct}%</span>
              </div>
              <div role="progressbar" aria-label={`${lv.title} course stages`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={lv.pct} className="camp-stats-bar"><div style={{ width: `${lv.pct}%` }} /></div>
              <p>{lv.done}/{lv.total} modules · {lv.stages}/{lv.total*3} stages · {lv.xpEarned} XP</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
