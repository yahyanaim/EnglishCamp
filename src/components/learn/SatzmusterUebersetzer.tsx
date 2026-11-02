"use client";
import { Layout } from "lucide-react";
import { patterns } from "@/data/translation-practice/patterns";
import { TranslationPractice } from "./TranslationPractice";

export function SatzmusterUebersetzer() {
  return <TranslationPractice entries={patterns} title="Sentence Pattern Translator" description="Translate Arabic/English sentence pattern examples" icon={Layout} startLabel="Start Practice" />;
}
