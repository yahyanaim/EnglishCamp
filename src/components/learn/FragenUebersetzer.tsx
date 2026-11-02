"use client";
import { HelpCircle } from "lucide-react";
import { questions } from "@/data/translation-practice/questions";
import { TranslationPractice } from "./TranslationPractice";

export function FragenUebersetzer() {
  return <TranslationPractice entries={questions} title="Question Translator" description="Translate questions (WH-questions, Yes/No, indirect) ↔ Arabic" icon={HelpCircle} startLabel="Start Practice" />;
}
