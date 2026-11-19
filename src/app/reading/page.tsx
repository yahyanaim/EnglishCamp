"use client";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { PageBanner } from "@/components/ui/PageBanner";
import { ReadingSection } from "@/components/learn/ReadingSection";

/** Read: level-based English passages, single-word translations and comprehension questions. */
export default function ReadPage() {
  return (
    <PageWrapper>
      <div className="camp-vocabulary-page camp-read-page space-y-6">
        <PageBanner><h1>Read</h1><p>Read English passages at your level, look up single words and check your understanding.</p></PageBanner>
        <ReadingSection />
      </div>
    </PageWrapper>
  );
}
