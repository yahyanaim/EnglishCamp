import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { RouteLessonView } from "@/components/placement/RouteLessonView";
import { ROUTE_LESSONS } from "@/data/route-lessons";

// Next.js 15+ passes route params as a promise.
type Props = { params: Promise<{ id: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return ROUTE_LESSONS.map(lesson => ({ id: lesson.id })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const lesson = ROUTE_LESSONS.find(item => item.id === id);
  return { title: lesson ? `${lesson.title} | EnglishCamp` : "Lesson not found | EnglishCamp" };
}
export default async function RouteLessonPage({ params }: Props) {
  const { id } = await params;
  const lesson = ROUTE_LESSONS.find(item => item.id === id);
  if (!lesson) notFound();
  return <PageWrapper><RouteLessonView lesson={lesson} /></PageWrapper>;
}
