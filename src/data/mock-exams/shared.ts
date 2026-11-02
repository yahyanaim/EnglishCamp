import type { ExamPaper } from "./types";
export const CONTENT_VERSION = "2026.2";
export const provenance: ExamPaper["provenance"] = {
  author: "EnglishCamp original practice material",
  rights:
    "Original texts, questions and diagrams; no official examination papers reproduced.",
  sources: [
    "https://ielts.org/take-a-test/preparation-resources/sample-test-questions",
    "https://www.ets.org/toefl/test-takers/ibt/about/content.html",
    "https://www.ets.org/pdfs/toefl/toefl-ibt-full-length-practice-test-2.pdf",
    "https://www.cambridgeenglish.org/exams-and-tests/qualifications/first/preparation/",
  ],
  reviewed: "2026-10-30",
  status:
    "Editorial and automated checks; independent teacher review and learner calibration pending.",
};
export const ieltsWritingRubric = [
  "Task achievement / Task response: address every requirement and develop relevant ideas.",
  "Coherence and cohesion: organise information and connect ideas clearly.",
  "Lexical resource: use precise vocabulary with appropriate collocations.",
  "Grammatical range and accuracy: control a useful range of sentence structures.",
];
export const speakingRubric = [
  "Fluency and coherence: sustain a relevant, connected response.",
  "Lexical resource: express meaning precisely and paraphrase where needed.",
  "Grammatical range and accuracy: vary structures with control.",
  "Pronunciation: communicate intelligibly with effective stress, rhythm and intonation.",
];
export const b2WritingRubric = [
  "Content: inform the target reader and address all the task points.",
  "Communicative achievement: use the conventions and register of the task.",
  "Organisation: produce a coherent, connected text.",
  "Language: use a range of vocabulary and grammar with control.",
];
