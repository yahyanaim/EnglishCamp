"use client";
import { Link2 } from "lucide-react";
import { collocations } from "@/data/translation-practice/collocations";
import { TranslationPractice } from "./TranslationPractice";

export function KollokationenUebersetzer() {
  return <TranslationPractice entries={collocations} title="Collocation Translator" description="Match collocations to their Arabic/English meanings" icon={Link2} startLabel="Start Practice" />;
}
