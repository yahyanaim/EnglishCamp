import academicReading from "./content/ielts-academic-reading.json";
import generalReading from "./content/ielts-general-reading.json";
import ieltsListening from "./content/ielts-listening.json";
import toeflReading from "./content/toefl-reading.json";
import toeflListening from "./content/toefl-listening.json";
import b2Reading from "./content/b2-reading.json";
import b2Listening from "./content/b2-listening.json";
import productive from "./content/productive.json";
import { CONTENT_VERSION, provenance } from "./shared";
import type { Certification, ExamPaper } from "./types";

const common = { version: CONTENT_VERSION, form: "01", provenance };
const ielts = {
  ...common,
  order: ["listening", "reading", "writing", "speaking"],
  seconds: {
    listening: 32 * 60,
    reading: 60 * 60,
    writing: 60 * 60,
    speaking: 13 * 60,
  },
  listening: ieltsListening,
  speaking: productive.ieltsSpeaking,
  notices: [
    "Computer-delivered practice: four listening parts, one playback and a final two-minute check within the recording.",
    "Academic and General Training form 01 share the same listening and speaking material; these are not two unseen listening papers.",
    "Writing and speaking require an assessor. Solo speaking rehearses the tasks; it does not reproduce a live examiner interview.",
  ],
};
export const MOCK_PAPERS: Record<Certification, ExamPaper> = {
  "ielts-academic": {
    ...ielts,
    id: "ielts-academic",
    title: "IELTS Academic",
    subtitle: "Full practice paper · Form 01",
    description:
      "40 listening questions, three academic passages and 40 reading questions, two writing tasks and three speaking parts.",
    reading: academicReading,
    writing: productive.academic,
  } as ExamPaper,
  "ielts-general": {
    ...ielts,
    id: "ielts-general",
    title: "IELTS General Training",
    subtitle: "Full practice paper · Form 01",
    description:
      "40 listening questions, everyday, workplace and extended reading with 40 questions, a letter, an essay and three speaking parts.",
    reading: generalReading,
    writing: productive.general,
  } as ExamPaper,
  "toefl-ibt": {
    ...common,
    id: "toefl-ibt",
    title: "TOEFL iBT® 2026",
    subtitle: "2026 task families · Form 01",
    description:
      "A 50-item reading path, 47-item listening path, ten sentence-building items, email, discussion and eleven spoken responses.",
    order: ["reading", "listening", "writing", "speaking"],
    seconds: { reading: 1800, listening: 1740, writing: 1380, speaking: 480 },
    reading: toeflReading,
    listening: toeflListening,
    writing: productive.toefl,
    sentenceBuilding: productive.sentenceBuilding,
    speaking: productive.toeflSpeaking,
    notices: [
      "Reading and listening use an EnglishCamp two-stage practice rule: at least 70% in module 1 selects the challenge module. This is not ETS's proprietary adaptive algorithm.",
      "The 8/10/12-second repetition and 45-second interview windows are practice settings. Public ETS papers confirm no preparation time but do not specify these item windows; live-test timing can differ.",
      "Original items are not calibrated to ETS scores. Results show raw performance, not an invented 1–6 band or 0–120 concordance.",
    ],
  } as ExamPaper,
  "b2-first": {
    ...common,
    id: "b2-first",
    title: "Cambridge B2 First",
    subtitle: "Adult B2 First · Form 01",
    description:
      "Seven Reading and Use of English parts, two written responses, four listening parts and paired speaking practice.",
    order: ["reading", "writing", "listening", "speaking"],
    seconds: { reading: 4500, writing: 4800, listening: 2400, speaking: 840 },
    reading: b2Reading,
    listening: b2Listening,
    writing: productive.b2,
    speaking: productive.b2Speaking,
    notices: [
      "Adult B2 First: one compulsory essay plus one task selected from three; write 140–190 words per response.",
      "Each listening extract plays twice. Reading and Use of English are reported separately with the appropriate item weights.",
      "Speaking is designed for two candidates. Practise with a partner or tutor; solo rehearsal cannot establish an interactive-communication score. Original items have no validated Cambridge English Scale conversion.",
    ],
  } as ExamPaper,
};
