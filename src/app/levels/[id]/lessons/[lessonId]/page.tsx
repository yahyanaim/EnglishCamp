import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getModuleData } from "@/lib/courseData";
import { ModuleExperience } from "@/components/course/ModuleExperience";

// Next.js 15+ passes route params as a promise.
type Props = { params: Promise<{ id: string; lessonId: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, lessonId } = await params;
  const data = getModuleData(lessonId, id);
  return { title: data ? `${data.lesson.title} · ${data.course.title} | EnglishCamp` : "Module not found | EnglishCamp" };
}
export default async function LessonPage({ params }: Props) {
  const { id, lessonId } = await params;
  const data = getModuleData(lessonId, id);
  if (!data) notFound();
  return <ModuleExperience key={data.lesson.id} {...data} />;
}
