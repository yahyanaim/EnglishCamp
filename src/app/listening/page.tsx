"use client";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { ListeningSection } from "@/components/learn/ListeningSection";

/** Listening: VOA Learning English recordings with questions, transcripts and progress. */
export default function ListeningPage() {
  return (
    <PageWrapper>
      <div className="camp-vocabulary-page camp-listening-page">
        <ListeningSection />
      </div>
    </PageWrapper>
  );
}
