import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getModuleData } from "@/lib/courseData";
import { ModuleExperience } from "@/components/course/ModuleExperience";

type Props = { params: { id: string; lessonId: string } };
export function generateMetadata({ params }: Props): Metadata {
  const data = getModuleData(params.lessonId, params.id);
  return { title: data ? `${data.lesson.title} · ${data.course.title} | EnglishCamp` : "Module not found | EnglishCamp" };
}
export default function LessonPage({ params }: Props) {
  const data = getModuleData(params.lessonId, params.id);
  if (!data) notFound();
  return <ModuleExperience key={data.lesson.id} {...data} />;
}
