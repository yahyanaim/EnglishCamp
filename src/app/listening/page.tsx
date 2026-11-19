"use client";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { PageBanner } from "@/components/ui/PageBanner";
import { ListeningSection } from "@/components/learn/ListeningSection";

/** Listening: VOA Learning English recordings with questions, transcripts and progress. */
export default function ListeningPage() {
  return (
    <PageWrapper>
      <div className="camp-vocabulary-page camp-listening-page space-y-6">
        <PageBanner><h1>Listening</h1><p>Practise listening with VOA Learning English recordings, then check what you understood.</p></PageBanner>
        <ListeningSection />
      </div>
    </PageWrapper>
  );
}
