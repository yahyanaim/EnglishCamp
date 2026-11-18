"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PageBanner } from "@/components/ui/PageBanner";
import { LearningArt } from "@/components/brand/LearningArt";
import { GrammarTranslation } from "@/components/learn/GrammarTranslation";
import { GrammarReference } from "@/components/learn/GrammarReference";

const guides = [
  {
    href: "/verb-conjugation", label: "Verb Conjugation", icon: "Clock",
    description: "Look up verb forms by tense and see each one in context.",
  },
  {
    href: "/prepositions", label: "Prepositions Guide", icon: "MapPin",
    description: "Find the right preposition for time, place and direction.",
  },
];

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
      <section className="camp-learning-library-group" aria-labelledby="grammar-guides">
        <h2 id="grammar-guides">Grammar guides</h2>
        <div className="camp-grammar-guide-grid">
          {guides.map(guide => (
            <Link key={guide.href} href={guide.href} prefetch={false} className="camp-learning-library-card">
              <span className="camp-library-card-icon"><LearningArt name={guide.icon} size={23} /></span>
              <span className="camp-library-card-copy">
                <strong>{guide.label}</strong>
                <span>{guide.description}</span>
              </span>
              <ChevronRight className="camp-library-card-arrow" size={18} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>
      <GrammarReference />
    </PageWrapper>
  );
}
