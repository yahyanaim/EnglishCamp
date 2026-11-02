"use client";
import { MessageCircle } from "lucide-react";
import { dialogues, dialogueGroups } from "@/data/translation-practice/dialogues";
import { TranslationPractice } from "./TranslationPractice";

export function DialogeUebersetzer() {
  return <TranslationPractice entries={dialogues} title="Dialogue Translator" description="Translate real English/Arabic dialogue lines" icon={MessageCircle} startLabel="Start Translating" groups={dialogueGroups} />;
}
