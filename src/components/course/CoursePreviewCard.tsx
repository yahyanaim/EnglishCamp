import { LearningArt } from "@/components/brand/LearningArt";
import { DashboardArt } from "@/components/brand/DashboardArt";
import Link from "next/link";
import { ArrowUpRight, BookOpen, GraduationCap } from "lucide-react";
import type { CourseSummary } from "@/data/course-catalogue";

const COURSE_SUMMARIES: Record<string, string> = {
  "band4-5": "Build B2 grammar, vocabulary and exam skills with guided practice. Best for learners around B1.",
  "band5-6": "Practise all four IELTS Academic skills with worked examples, lesson activities and mock exams.",
  "band6-7": "Prepare for TOEFL iBT 2026 with reading, listening, writing and speaking practice.",
  "band7-8": "Develop IELTS General Training skills through practical reading, letters, essays and speaking practice.",
};

export function CoursePreviewCard({ course, progress, best, expanded = false }: { course: CourseSummary; progress: number; best: number; expanded?: boolean }) {
  return <article className="camp-course-card">
    <div className="camp-course-card-top"><span className="camp-course-symbol"><DashboardArt name="cap" size={23} /></span><span className="camp-course-type">{course.examBadge || course.id}</span></div>
    <div className="camp-course-card-copy"><h3>{course.title}</h3><p>{course.subtitle}</p>{expanded && <p className="camp-course-intro">{COURSE_SUMMARIES[course.id] || course.subtitle}</p>}</div>
    <div className="camp-course-card-meta"><span><LearningArt name="BookOpen" size={14}  />{course.lessons.length} modules{expanded && ` · ${course.duration}`}</span>{best > 0 && <span>Best: {best}%</span>}</div>
    <div className="camp-course-meter" role="progressbar" aria-label={`${course.title} progress`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span style={{ width: `${Math.min(100, Math.max(0, progress))}%` }} /></div>
    <div className="camp-course-card-bottom"><span>{progress}% lessons</span><Link prefetch={false} href={`/levels/${course.id}`} aria-label={`View ${course.title}`}>View course <ArrowUpRight size={15} /></Link></div>
  </article>;
}
