"use client";
import { Clock } from "lucide-react";
import { past } from "@/data/translation-practice/past";
import { TranslationPractice } from "./TranslationPractice";

export function PraeteritumUebersetzer() {
  return <TranslationPractice entries={past} title="Simple Past Translator" description="Translate simple past sentences ↔ Arabic" icon={Clock} startLabel="Start Practice" />;
}
