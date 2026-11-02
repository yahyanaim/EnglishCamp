"use client";
import { MapPin } from "lucide-react";
import { verbPrepositions } from "@/data/translation-practice/verbPrepositions";
import { TranslationPractice } from "./TranslationPractice";

export function VerbPrepUebersetzer() {
  return <TranslationPractice entries={verbPrepositions} title="Verbs with Prepositions" description="Translate verbs with prepositions between Arabic and English" icon={MapPin} startLabel="Start Practice" />;
}
