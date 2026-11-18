"use client";
import { MessageCircle } from "lucide-react";
import { DIALOGS } from "@/data/alltagsdialoge";
import { dialogues } from "@/data/translation-practice/dialogues";
import { TranslationPractice } from "./TranslationPractice";

const topicArt: Record<string, string> = {
  greetings: "chat",
  introductions: "globe",
  "saying-goodbye": "flag",
  thanking: "trophy",
  apologizing: "note",
  "asking-help": "warning",
  "making-suggestions": "idea",
  "agreeing-disagreeing": "compare",
  "expressing-opinions": "mic",
  "ordering-takeaway": "plan",
  "complaining-product": "review",
  complimenting: "spark",
  inviting: "calendar",
  "declining-invitation": "clock",
  "requesting-information": "document",
};

const groups = DIALOGS.map(({ id, title }) => ({ id, label: title, art: topicArt[id] || "chat" }));

export function DialogeUebersetzer() {
  return <TranslationPractice entries={dialogues} title="Dialogue Translator" description="Translate real English/Arabic dialogue lines" icon={MessageCircle} startLabel="Start Translating" groups={groups} />;
}
