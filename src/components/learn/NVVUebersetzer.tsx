"use client";
import { BookMarked } from "lucide-react";
import { verbNoun } from "@/data/translation-practice/verbNoun";
import { TranslationPractice } from "./TranslationPractice";

export function NVVUebersetzer() {
  return <TranslationPractice entries={verbNoun} title="NVV Translator" description="Match noun-verb collocations to their Arabic/English meanings" icon={BookMarked} startLabel="Start Practice" />;
}
