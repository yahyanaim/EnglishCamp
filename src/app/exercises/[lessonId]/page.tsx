import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getModuleData } from "@/lib/courseData";
import { ModuleExperience } from "@/components/course/ModuleExperience";

// Next.js 15+ passes route params as a promise.
type Props = { params: Promise<{ lessonId: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lessonId } = await params;
  const data = getModuleData(lessonId);
  return { title: data ? `Practice: ${data.lesson.title} | EnglishCamp` : "Module not found | EnglishCamp" };
}
export default async function ExercisePage({ params }: Props) {
  const { lessonId } = await params;
  const data = getModuleData(lessonId);
  if (!data) notFound();
  return <ModuleExperience key={data.lesson.id} {...data} focused />;
}
