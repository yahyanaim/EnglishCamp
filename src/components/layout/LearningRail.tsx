"use client";
import { LearningArt } from "@/components/brand/LearningArt";

import { BrandMark } from "@/components/brand/BrandMark";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { BookOpen, Flame, GraduationCap, ArrowUpRight } from "lucide-react";
import { useProgress } from "@/store/useProgress";
import { getLevelInfo } from "@/lib/xp";
import { courseCatalogue } from "@/data/course-catalogue";
import { useSessionProfile } from "@/components/session/SessionProvider";
import { FruitAvatar } from "@/components/session/FruitAvatar";
import { profileTag } from "@/lib/sessionProfile";
import { hasModuleCredit } from "@/lib/courseProgress";

export function LearningRail() {
  const { profile } = useSessionProfile();
  const [mounted, setMounted] = useState(false);
  const xp = useProgress(state => state.xp);
  const streak = useProgress(state => state.streak);
  const lessons = useProgress(state => state.lessons);
  const modules = useProgress(state => state.modules);
  useEffect(() => setMounted(true), []);
  const level = getLevelInfo(mounted ? xp : 0);
  const progress = level.nextXP === Infinity ? 100 : Math.min(100, Math.round((mounted ? xp : 0) / level.nextXP * 100));
  const courses = useMemo(() => courseCatalogue.map(course => ({ ...course, completed: mounted ? course.lessons.filter(lesson => hasModuleCredit(lesson.id, modules, lessons)).length : 0 })), [mounted, modules, lessons]);

  return (
    <aside className="camp-learning-rail" aria-label="Your learning progress">
      <div className="rail-heading">Your learning <LearningArt name="GraduationCap" size={16}  /></div>
      <div className="rail-profile">
        <div className="rail-avatar" style={{ background: `conic-gradient(var(--camp-purple) ${progress}%, var(--color-surface-alt) 0)` }}>
          <div>{profile ? <FruitAvatar fruit={profile.fruit} size={54} /> : <BrandMark size={28} />}</div>
        </div>
        {profile && <><p className="rail-profile-name">{profile.name}</p><p className="camp-profile-tag">{profileTag(profile)}</p></>}
        <p className="rail-level">Learning level {level.level}</p>
        <p className="rail-caption">{level.nextXP === Infinity ? "Top learning level" : `${progress}% to next level`}</p>
        <div className="rail-counters">
          <span><LearningArt name="Flame" size={14}  /> {mounted ? streak : 0} day streak</span>
          <span>{mounted ? xp.toLocaleString() : 0} XP</span>
        </div>
      </div>
      <section className="rail-course-progress" aria-label="Completed course modules">
        <div className="rail-section-heading">Course progress <Link prefetch={false} href="/stats" aria-label="View learning statistics"><ArrowUpRight size={15} /></Link></div>
        <div className="rail-chart">
          {courses.map((course, i) => {
            const pct = Math.round(course.completed / course.lessons.length * 100);
            return <div className="rail-chart-column" key={course.id} title={`${course.title}: ${course.completed} of ${course.lessons.length} modules`}>
              <div className="rail-chart-track"><div style={{ height: `${pct}%` }} /></div>
              <span>{i + 1}</span>
            </div>;
          })}
        </div>
        <p className="rail-caption">Completed modules in each course</p>
      </section>
      <section>
        <div className="rail-section-heading">Your courses <LearningArt name="BookOpen" size={15}  /></div>
        <div className="rail-course-list">
          {courses.map((course, i) => <Link prefetch={false} key={course.id} href={`/levels/${course.id}`} className="rail-course">
            <span className="rail-course-icon">0{i + 1}</span>
            <span><strong>{course.title}</strong><small>{course.completed}/{course.lessons.length} modules</small></span>
            <ArrowUpRight size={13} />
          </Link>)}
        </div>
      </section>
    </aside>
  );
}
