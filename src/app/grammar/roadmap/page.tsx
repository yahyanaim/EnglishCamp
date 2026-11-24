"use client";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PageBanner } from "@/components/ui/PageBanner";
import { GrammarRoadmap } from "@/components/learn/GrammarRoadmap";

export default function GrammarRoadmapPage() {
  return (
    <PageWrapper className="camp-grammar-page">
      <PageBanner>
        <h1>Grammar roadmap</h1>
        <p>What to learn at each level, from A1 to B2, in teaching order.</p>
      </PageBanner>
      <GrammarRoadmap />
    </PageWrapper>
  );
}
