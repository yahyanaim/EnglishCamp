"use client";
import { PageBanner } from "@/components/ui/PageBanner";
import { CoursePreviewCard } from "@/components/course/CoursePreviewCard";
import { useProgress } from "@/store/useProgress";
import { courseSnapshot } from "@/lib/courseProgress";
import { courseCatalogue as levels } from "@/data/course-catalogue";

/** The course library as its own page, so the menu and the phone bottom bar can link straight to it. */
export default function CoursesPage() {
  const { modules, lessons, quizResults } = useProgress();
  return (
    <div className="space-y-6">
      <PageBanner><h1>Courses</h1><p>Four structured courses. Each module takes you through Watch, Learn and Practise.</p></PageBanner>
      <div className="camp-course-grid grid grid-cols-1 md:grid-cols-2 gap-4">
        {levels.map(course => (
          <CoursePreviewCard key={course.id} course={course} expanded
            progress={courseSnapshot(course.lessons.map(lesson => lesson.id), modules, lessons).percent}
            best={Math.max(0, ...(quizResults[course.id]?.map(result => result.score) ?? []))} />
        ))}
      </div>
    </div>
  );
}
