"use client";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { PageBanner } from "@/components/ui/PageBanner";
import { GrammarTranslation } from "@/components/learn/GrammarTranslation";
import { GrammarReference } from "@/components/learn/GrammarReference";

export default function GrammarPage() {
  return (
    <PageWrapper className="camp-grammar-page">
      <PageBanner>
        <h1>Grammar Reference</h1>
        <p>
          <GrammarTranslation translation="استكشف موضوعاً وقارن القواعد والأمثلة.">
            Explore a topic and compare the rules and examples.
          </GrammarTranslation>
        </p>
      </PageBanner>
      <GrammarReference />
    </PageWrapper>
  );
}
