"use client";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { ReadingSection } from "@/components/learn/ReadingSection";

/** Read: level-based English passages, single-word translations and comprehension questions. */
export default function ReadPage() {
  return (
    <PageWrapper>
      <div className="camp-vocabulary-page camp-read-page">
        <ReadingSection />
      </div>
    </PageWrapper>
  );
}
