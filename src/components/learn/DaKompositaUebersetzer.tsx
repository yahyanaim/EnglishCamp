"use client";
import { Link2 } from "lucide-react";
import { compounds } from "@/data/translation-practice/compounds";
import { TranslationPractice } from "./TranslationPractice";

export function DaKompositaUebersetzer() {
  return <TranslationPractice entries={compounds} title="Compound Adverb Translator" description="Translate compound adverbs (thereby, thereof, etc.) ↔ Arabic" icon={Link2} startLabel="Start Practice" />;
}
