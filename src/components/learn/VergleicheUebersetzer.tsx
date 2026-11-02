"use client";
import { Scale } from "lucide-react";
import { comparisons } from "@/data/translation-practice/comparisons";
import { TranslationPractice } from "./TranslationPractice";

export function VergleicheUebersetzer() {
  return <TranslationPractice entries={comparisons} title="Comparison Translator" description="Translate comparison sentences (as/like/than) ↔ Arabic" icon={Scale} startLabel="Start Practice" />;
}
