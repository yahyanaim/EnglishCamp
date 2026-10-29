import { foundationEnrichment } from "./foundation";
import { academicEnrichment } from "./academic";
import { toeflEnrichment } from "./toefl";
import { generalEnrichment } from "./general";
import type { CourseEnrichment } from "./types";
import { attachCourseVideos } from "./videos";
import { visualExplanations } from "./media";
import { lessonPrinciples } from "../lesson-principles";
import { teachingDiagrams } from "../teaching-diagrams";
import { lessonImages } from "../lesson-images";

export const courseEnrichment: Record<string, CourseEnrichment> = {
  ...foundationEnrichment, ...academicEnrichment, ...toeflEnrichment, ...generalEnrichment,
};

for (const [lessonId, principle] of Object.entries(lessonPrinciples)) {
  courseEnrichment[lessonId].principle = principle;
}
for (const [lessonId, diagram] of Object.entries(teachingDiagrams)) {
  courseEnrichment[lessonId].teachingDiagram = diagram;
}

const visuals: [string, string, string, string, number][] = [
  ["band1-toefl-intro", "word-roles", "The PATIENT family: patient describes a volunteer, patiently describes answering, and patience names the quality shown.", "Follow the sentence role before choosing the form. The same family supplies an adjective, an adverb and a noun.", 420],
  ["band1-ielts-vs-toefl", "reading-timeline", "A reading activity starts at ten, continues through eleven and is still in progress at noon: I have been reading for two hours.", "The activity connects a past starting point with now. Its duration does not establish that the book is finished.", 330],
  ["band1-writing-brainstorming", "argument-chain", "A bus subsidy can support an affordable late route, giving shift workers a way home; low passenger numbers can increase the subsidy needed per passenger.", "Original argument map. Arrows explain a possible mechanism; the final note marks a cost to evaluate, not an established outcome.", 480],
  ["band2-writing-line-graphs", "cycle-trips", "Original fictional weekly cycle trips: North 100 in 2020 and 180 in 2025; South 160 in 2020 and 140 in 2025. North rises and overtakes South between the recorded endpoints.", "Original fictional data. Bars show two recorded years only; intermediate annual values and causes are unknown.", 430],
  ["band2-writing-bar-pie", "bus-share", "Bus journey share changes from 20 percent to 30 percent: a ten-percentage-point increase and a fifty-percent increase relative to the initial share.", "Original fictional shares. Each bar represents all journeys in that year. Total journey counts are not given.", 370],
  ["band2-writing-letter", "juice-process", "Original miniature process in order: wash fruit, crush it, press it, bottle the liquid. No heating stage or duration is shown.", "An original teaching diagram. Report the supplied sequence without adding unshown treatment, timing or health benefits.", 480],
  ["band3-writing-discussion", "subject-verb", "The course, modified by that includes field visits, helps students. The singular head course controls the main verb helps.", "Find the head of the main subject before checking agreement. Visits belongs inside the relative clause.", 420],
  ["band3-speaking-part3", "repeat-groups", "Please leave your bags / beside the front desk. Keep please, the plural bags and the full location phrase when repeating the sentence.", "Slashes indicate rehearsal groups, not spoken words. This written diagram supports analysis; use the course audio for listening practice.", 370],
  ["band3-writing-maps-processes", "email-jobs", "Email content sequence: access error in the reading link; cannot prepare the seminar comparison; request an accessible copy before Thursday's seminar.", "A purpose map for an original practice email. Each part gives the recipient information needed to respond.", 480],
  ["band4-writing-sophisticated", "letter-tone", "The same leaking-tap problem can be expressed as a formal repair request to a landlord or a friendly request for help from Sam. The relationship changes the tone; the practical purpose stays clear.", "Compare audience and tone while preserving the problem and requested action. These are excerpts, not full Task 1 letters.", 420],
  ["band4-speaking-storytelling", "story-sequence", "Story sequence: a train is cancelled; the traveller finds a bus while a friend checks closing time; they arrive with thirty minutes to spare; the speaker reflects on sharing the work.", "An original story scaffold. Build a causal sequence, then explain its significance using your own experience.", 480],
  ["band4-grammar-participles", "shared-subject", "Having checked the figures, the researcher revised the report. The researcher is the understood subject of checked and the explicit subject of revised; the report cannot check figures.", "Both actions need a sensible shared actor. Use a full clause if the actors differ or the shortened version becomes ambiguous.", 420],
];
for (const [id, name, alt, caption, height] of visuals) {
  courseEnrichment[id].visual = { src: `/media/courses/teaching/${name}.svg`, alt, caption, width: 480, height };
}

attachCourseVideos(courseEnrichment);
for (const [lessonId, explanation] of Object.entries(visualExplanations)) {
  courseEnrichment[lessonId].visualExplanation = explanation;
}
for (const [lessonId, images] of Object.entries(lessonImages)) {
  courseEnrichment[lessonId].inlineImages = images;
}
