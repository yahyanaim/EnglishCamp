import { videoCatalogue, type VideoResource } from "./video-catalogue";
import type { CourseEnrichment, TeachingVideo } from "./types";

type Placement = [lessonId: string, resource: VideoResource, focus: string];

/** Explicit topic matches. Shared resources have different application goals. */
const placements: Placement[] = [
  ["band1-ielts-intro", "useEnglish", "Follow the explanations of cloze and transformations. Check sentence structure and meaning before choosing or changing a word."],
  ["band1-toefl-intro", "useEnglish", "Watch the word-formation section: identify the required word class, then check suffixes, negative meaning and number in context."],
  ["band1-ielts-vs-toefl", "perfect", "Compare completed results with activities continuing up to now. Explain why a duration does not automatically mean the activity is finished."],
  ["band1-listening-format", "b2Listening", "Use the official B2 Listening explanation to prepare for short extracts. In the course recording, distinguish the corrected departure time from the separate arrival instruction."],
  ["band1-listening-gist", "b2Listening", "Apply the B2 listening preparation strategies to the overall message before filling details. Decide why a speaker gives instructions rather than selecting an isolated familiar noun."],
  ["band1-listening-attitude", "b2Listening", "Use the B2 listening strategies to check a speaker’s attitude across the whole extract. In the course recording, identify both the approval and the qualification."],
  ["band1-reading-skimming", "b2Reading", "Focus on the Part 5 explanation: connect each answer to the writer's meaning, not merely a repeated word."],
  ["band1-reading-scanning", "b2Reading", "Focus on the Part 7 matching explanation. Locate candidate passages, then verify every requirement in the question."],
  ["band1-reading-completion", "b2Reading", "Focus on Part 6 gapped text. Check reference words and logical links on both sides of the gap."],
  ["band1-writing-task1-overview", "b2Essay", "Follow the B2 essay planning and development steps. Turn a relevant claim into a reasoned paragraph that addresses the required points."],
  ["band1-writing-trends", "b2Article", "Follow the article-specific planning and organisation lesson. Identify the intended reader, open with a relevant reason to read on and develop concrete information for that reader."],
  ["band1-writing-integrated", "email", "Trace the greeting, purpose, useful details and requested action. Adjust the tone to the recipient instead of copying one opening into every email."],
  ["band1-writing-essay-structure", "b2Review", "Follow the review-writing demonstration: identify the reader, select relevant detail and support a recommendation. The written module separately explains reports."],
  ["band1-writing-brainstorming", "b2Essay", "Pause at the planning stage. Identify what each paragraph will argue and how an example supports its point."],
  ["band1-speaking-part1-intro", "b2Interview", "Watch the teacher's B2 interview explanation. Develop a direct personal answer with a reason or detail while staying on the question."],
  ["band1-speaking-independent", "b2Pictures", "Watch the teacher explain the picture-comparison task. Connect both pictures, answer the printed question and mark uncertain interpretations carefully."],
  ["band1-speaking-hometown", "cambridgeInteraction", "Study the Part 3 collaboration demonstration from 6:31 to 10:34. Observe responses to a partner, evaluation of options and negotiation of a decision."],
  ["band1-grammar-articles", "articles", "Compare first mention, identifiable reference and general statements. Explain the intended reference before choosing a, an, the or no article."],
  ["band1-grammar-agreement", "agreement", "Focus on separated subjects and verbs. Remove the modifying prepositional phrase mentally, identify the head noun and choose the verb that agrees with it."],
  ["band1-vocab-awl1", "collocations", "Use make and do as a concrete collocation lesson. Learn a verb–noun combination in a full sentence rather than substituting verbs from a translation list."],
  ["band1-vocab-synonyms", "phrasal", "Learn the phrasal verbs through their situations and sentence frames. Check whether a paraphrase preserves the original action, not just its topic."],
  ["band1-time-reading", "b2Reading", "Review the methods for Parts 5–7, then decide where to search before rereading. Use the module timer to practise the method without treating this video as a timed exam."],
  ["band1-time-writing", "b2Essay", "Use the teacher's planning sequence to avoid omitting a required point. Make a short plan before starting the module's timed writing."],
  ["band1-practice-listening", "b2Listening", "Apply the B2 listening strategies to a longer interview. Track the speaker’s earlier view, the turning point and the final position before deciding on an answer."],
  ["band1-review", "balanced", "Distinguish understanding an explanation, remembering language and using it independently. Choose fresh tasks that reveal which part still needs work."],

  ["band2-listening-mcq", "listeningChoices", "Study the multiple-choice strategy and distractors. In the module, distinguish a first preference from the final booking request; mentioning an option does not make it the answer."],
  ["band2-listening-maps", "listeningMaps", "Follow the map-labelling strategy and worked listening example. Locate the starting point and orientation, then trace movement and check named landmarks."],
  ["band2-listening-form-completion", "ieltsListening", "Follow the official explanation of listening preparation, question types and checking answers. Apply it to lecture notes: anticipate the gap, follow the talk and preserve the condition on a finding."],
  ["band2-reading-tfng", "tfng", "Follow the worked distinctions between agreement, contradiction and missing information. Check whose view a statement describes before deciding YES or NO."],
  ["band2-reading-headings", "headings", "Find the paragraph's main purpose before choosing a heading. Compare the whole idea with close distractors rather than matching a single word."],
  ["band2-reading-mcq", "readingStrategy", "Watch the reading-strategy explanation and apply evidence checking to each option. Keep an inference within what the passage supports."],
  ["band2-writing-line-graphs", "academicTask1", "Distinguish introducing a visual from summarising its key features. Apply the official explanation to opposing trends and the ranking change in the module's original chart."],
  ["band2-writing-bar-pie", "academicVisuals", "Follow the teacher's Task 1 planning and comparison method. In this module, retain the correct population and distinguish a percentage-point difference from a relative percentage change."],
  ["band2-writing-letter", "academicMapsProcesses", "Begin at the map explanation, then continue to the process-diagram chapter at 18:43. Compare spatial changes with a sequence of stages; report only the positions, arrows and transformations supplied."],
  ["band2-writing-opinion", "essay", "Follow the argument-development explanation. State a position, develop relevant reasons and use a qualification without making the answer unclear."],
  ["band2-writing-problem-solution", "task2Analysis", "Analyse every part of the prompt before planning. Make each proposed response address the actual problem or cause you identified."],
  ["band2-writing-cohesion", "cohesion", "Distinguish logical progression from surface linking. Repair unclear actors and references instead of adding connectors to an ambiguous paragraph."],
  ["band2-speaking-cue-card", "ieltsPart2", "Watch the cue-card planning demonstration. Use short notes to organise an event and its significance, leaving room for natural wording."],
  ["band2-speaking-describe", "ieltsPart2", "Study how a long turn is developed. Select concrete details and explain their effects rather than repeating positive adjectives."],
  ["band2-speaking-integrated", "ieltsPart3", "Use the teacher's Part 3 explanation to connect a general judgement with a concrete example and a relevant limitation."],
  ["band2-grammar-tenses", "tenses", "Choose a tense according to time and viewpoint. Apply the distinction to observed historical figures, the document you are describing and labelled projections."],
  ["band2-grammar-complex", "complex", "Follow the clause-building examples. Make the grammatical structure express a real relationship such as contrast or cause."],
  ["band2-vocab-awl2", "paraphrase", "Study meaning-preserving paraphrase. Keep quantity, degree and uncertainty when adapting language; this module also applies the skill to reading summaries."],
  ["band2-vocab-collocations", "comparison", "Practise the comparison frames in the demonstration. Check that quantities, multipliers and comparison nouns match the actual dataset."],
  ["band2-vocab-environment", "ieltsListening", "Use the official listening strategies to prepare for an academic talk and follow its main ideas. In the course audio, retain words such as may and although when noting an environmental explanation."],
  ["band2-vocab-technology", "task2Analysis", "Separate a two-part question into its required jobs. Develop an explanation of a technology choice and address the second question explicitly."],
  ["band2-mistakes-prepositions", "trends", "Focus on the difference between increased to and increased by. Use from for the starting value, to for the endpoint and by for the amount of change; check the arithmetic against the figures."],
  ["band2-mistakes-countable", "countability", "Work through countable and uncountable noun choices. Use an appropriate unit when counting advice, information or evidence."],
  ["band2-practice-reading", "readingStrategy", "Apply a question-specific reading method. Distinguish retrieving a stated detail from judging an unsupported claim."],
  ["band2-review", "ieltsPlan", "Build a study plan from observed weaknesses and fresh evidence. Repeated success on one local set does not by itself establish an IELTS band."],

  ["band3-listening-section3", "listening2026", "Use the current-format listening explanation to recognise a short speaker intention. A request needs a helpful response, not simply a repeated keyword."],
  ["band3-listening-lecture", "listening2026", "Focus on academic-talk listening techniques. Track the structure of an explanation and retain conditions or exceptions that limit its claim."],
  ["band3-listening-multiple-speakers", "listening2026", "Apply the conversation strategies to a problem, an offered alternative and acceptance. Distinguish a suggestion from the agreed next action."],
  ["band3-reading-summary-completion", "reading2026", "Apply the current reading strategies to Complete the Words. Use the surrounding meaning and grammar, then follow the course task's exact missing-letter input rule."],
  ["band3-reading-matching-features", "reading2026", "Apply the daily-life reading strategies to notices. Check eligibility, timing and exceptions together instead of satisfying only one condition."],
  ["band3-reading-flowchart", "reading2026", "Focus on Read an Academic Passage in the current reading guide. Connect a supporting example to the claim it illustrates, and verify an answer against the passage rather than relying on topic familiarity."],
  ["band3-writing-multiple-charts", "discussion", "Focus on developing an original contribution to an academic discussion. This earlier recording teaches the retained task; use the current course directions for the overall test format."],
  ["band3-writing-maps-processes", "email2026", "Watch the current email-task explanation. State the purpose, cover the requested details and make the recipient's next action clear."],
  ["band3-writing-discussion", "sentence2026", "Follow the sentence-building walkthrough. Locate the main subject and verb before arranging modifiers and checking agreement."],
  ["band3-writing-advantages", "sentence2026", "Use the sentence-building practice to compare statement order with direct and embedded questions. Check auxiliaries and base verb forms."],
  ["band3-writing-task-response", "email2026", "Identify every communication job in the prompt. Check that explanation, proposal and requested confirmation each receive a clear response."],
  ["band3-writing-formality", "discussion", "Study how a supported idea contributes to a discussion. Use precise reasoning rather than inflated phrases; the recording's older overall-format references are not the current test directions."],
  ["band3-speaking-part3", "repeat2026", "Watch the 2026 repetition training. Retain heard wording, small words and endings, then compare omissions and substitutions in your own recording."],
  ["band3-speaking-opinions", "interview2026", "Follow the current interview-task explanation. Answer immediately, explain a relevant reason and add a specific personal detail."],
  ["band3-speaking-toefl4", "repeat2026", "Apply repetition techniques to longer meaning groups while preserving the complete wording, clause relationships and deadline expressions."],
  ["band3-grammar-conditionals", "conditionals", "Compare conditional meanings and grammatical frames. Apply the relevant pattern to a real booking possibility rather than mixing incompatible verb forms."],
  ["band3-grammar-passive", "passive", "Watch how the passive changes focus. Preserve the actor, affected object and timing when revising a sentence."],
  ["band3-vocab-awl3", "hedging", "Watch the cautious-language explanation. Compare suggests or may indicate with proves, and preserve the small sample, measured outcome and untested long-term effects in the module’s research summary."],
  ["band3-vocab-health", "causation", "Learn why an observed association does not by itself establish cause. Apply the distinction to the fictional walking-group comparison, considering prior differences between attenders and non-attenders."],
  ["band3-vocab-education", "listening2026", "Apply the announcement-listening strategies to changes and required actions. Separate revised arrangements from details that remain the same."],
  ["band3-vocab-work", "reading2026", "Apply practical reading strategies to workplace messages. Distinguish permission, obligation and the conditions attached to each."],
  ["band3-paraphrasing", "comparison", "Use comparison language to develop an interview answer. Preserve the reference point, degree and reason when expressing the same idea differently."],
  ["band3-error-analysis", "agreement", "Use the separated-subject explanation to find the head noun and its verb. Repair the agreement error while retaining the original actor, action, timing and degree of certainty."],
  ["band3-practice-essay", "email2026", "Review the email response process before timed practice. This video covers the email half of the module; the written lesson separately teaches the academic discussion response."],
  ["band3-review", "balanced", "Review theory, retrieval and independent production separately. Use this study-method lesson to plan current TOEFL practice; it makes no claim about the exam's format or score scale."],

  ["band4-listening-accents", "stress", "Hear the contrast between prominent and less prominent words. Keep the complete phrase when practising; reduced prominence does not make a deadline word or ending dispensable."],
  ["band4-listening-inference", "listeningChoices", "Apply the multiple-choice method to the speaker’s complete position. Check which option accounts for both interest in a proposal and a condition that delays commitment."],
  ["band4-listening-distractors", "listeningChoices", "Follow the explanation of listening distractors. Compare mentioned alternatives with the option finally accepted, then verify the price or time attached to that decision."],
  ["band4-reading-writers-views", "tfng", "Use the writer-view examples to separate an author's judgement from a view merely reported in the passage."],
  ["band4-reading-difficult-texts", "summarise", "Unpack the main claim and its qualification before summarising. Keep a design limitation when explaining what a difficult research sentence establishes."],
  ["band4-reading-time-pressure", "ieltsReading", "Use question-specific strategies to choose a search target. Find the requested reason, actor or condition before committing time to another full reread."],
  ["band4-writing-sophisticated", "letterTask", "Use the official General Training explanation to connect purpose, tone and coverage. Keep a request practical and suited to the recipient."],
  ["band4-writing-complex-comparisons", "ieltsReading", "Apply the reading method to practical notices, including exceptions and separate service conditions. This is a reading module despite its legacy writing route ID."],
  ["band4-writing-complex-ideas", "task2Analysis", "Analyse the precise policy question before planning. Make a qualified position clear by defining its conditions and exceptions."],
  ["band4-writing-lexical-resource", "writingVocabulary", "Watch the vocabulary explanation with precision in mind. Prefer an accurate collocation to unusual wording that obscures your point."],
  ["band4-writing-grammatical-range", "grammarWriting", "Use grammatical range to express meaningful relationships. Check clause completeness and accuracy before adding complexity."],
  ["band4-writing-band8-essay", "essay", "Study how a position is developed through reasons and support. Use the module's comparison to judge actual reasoning; a model or video title does not assign your response a band."],
  ["band4-speaking-storytelling", "ieltsPart2", "Use the long-turn explanation to build a story around a problem, response, outcome and reflection. Develop your own experience rather than memorising a model biography."],
  ["band4-speaking-abstract-topics", "ieltsPart3", "Connect an abstract judgement with a concrete case. Explain a mechanism and qualify it where the claim does not apply universally."],
  ["band4-speaking-pronunciation", "stress", "Practise shifting stress to communicate a contrast or correction. Replay your own sentence and check whether the intended contrast is recoverable."],
  ["band4-grammar-inversion", "emphasis", "Focus on the inversion explanation. Front the negative expression, place the auxiliary before the subject and use emphasis only when it helps the message."],
  ["band4-grammar-participles", "participles", "Watch how participle clauses connect actions and implied subjects. Check that the opening action has a sensible actor in the main clause."],
  ["band4-vocab-awl4", "hedging", "Use hedging and claim verbs to express the strength of the evidence accurately. Distinguish a survey finding among respondents from a claim about everyone’s future behaviour."],
  ["band4-vocab-science", "scientificMethod", "Follow the distinction between an observation, a testable hypothesis, a prediction and an experiment. Apply these terms to the module’s covered-container investigation, retaining its untested outdoor conditions."],
  ["band4-vocab-globalization", "globalization", "Identify how international supply chains connect production, trade and consumers. Explain a specific benefit and a possible cost for different groups, then apply that reasoning to the small manufacturer in the lesson."],
  ["band4-vocab-idioms", "idioms", "Study idioms through the office conversations and their explanations, such as touch base and back to square one. Explain the intended meaning in plain English before deciding whether an expression fits a spoken answer."],
  ["band4-mock-ielts-listening", "ieltsListening", "Use the official preparation-and-review strategies before this mixed checkpoint. After listening, distinguish errors in decision tracking from errors in sounds, spelling or answer placement."],
  ["band4-mock-toefl-reading", "ieltsReading", "Apply reading strategies to General Training notices and conditions. This module is not TOEFL reading despite its legacy route ID."],
  ["band4-exam-day-strategies", "ieltsPlan", "Turn a general study intention into a practical plan. Use the test provider's current booking instructions to verify identification, timing, location and test mode."],
  ["band4-review", "balanced", "Choose a next step that addresses a visible error in fresh work. Distinguish understanding a lesson from remembering it and applying it independently."],
];

const coverageNotes: Record<string, string> = {
  "band1-listening-gist": "The video teaches B2 listening preparation. Sentence-completion practice and the speaker-purpose example are developed in the written lesson and course audio.",
  "band1-listening-attitude": "The video provides B2 listening strategies. The written example and course recording supply the detailed attitude analysis and multiple-matching practice.",
  "band1-writing-essay-structure": "The video demonstrates a review. The written lesson separately teaches the different audience, findings and recommendations needed in a report.",
  "band2-listening-mcq": "The teacher explains multiple-choice structures across IELTS Listening. Use the module’s own Part 1 recording for its booking details and corrected decisions.",
  "band2-listening-form-completion": "This official episode covers listening methods across question types. The module provides the specific academic extract, qualified finding and note-completion tasks.",
  "band2-reading-headings": "The video explains matching headings. Matching information and features are taught separately in the written module.",
  "band2-reading-mcq": "This is a broader IELTS reading strategy guide. Use the module’s passage and explanations for its specific inference and option-elimination examples.",
  "band2-writing-bar-pie": "The video models pie-chart selection, comparison and organisation. The module’s table and diagram explain percentage points versus relative percentage change.",
  "band2-speaking-cue-card": "The video focuses on Part 2 cue-card planning. Part 1 answer development is also covered in the written module.",
  "band2-speaking-describe": "The video teaches long-turn organisation and development. Use the course speaking practice and recording for description, fluency and pronunciation review.",
  "band2-vocab-awl2": "Paraphrasing is demonstrated in an essay introduction. Apply the meaning-preservation skill to reading; use the written module for summary and sentence-completion procedures.",
  "band2-vocab-environment": "The video teaches IELTS listening methods. Environmental vocabulary and the limits of the cause claim are analysed in the module’s own talk and notes.",
  "band2-mistakes-prepositions": "This business-English explanation teaches the same numerical language used in data reporting; it is not an IELTS-format guide.",
  "band3-vocab-awl3": "The video explains hedging. The module also teaches word families and interpretation of research evidence in reading.",
  "band3-vocab-health": "This is a critical-thinking explanation of research evidence. Apply it as a reading skill; it does not explain the TOEFL test format or give medical advice.",
  "band3-paraphrasing": "The video teaches comparison language. Apply it within the interview task; use the current interview module for TOEFL timing and task directions.",
  "band3-practice-essay": "The video teaches the email task. Academic Discussion planning and timed practice are also provided in the written module.",
  "band3-review": "This video supports the study-review part of the module. Current TOEFL task names, format and score terminology come from the written course guidance.",
  "band4-listening-inference": "The video demonstrates multiple-choice listening. Apply evidence checking to the module’s qualified attitude rather than treating its scenarios as the same recording.",
  "band4-writing-complex-comparisons": "The official episode covers both Academic and General Training reading strategies. This module applies them to practical notices, exceptions and service conditions.",
  "band4-vocab-science": "This is a science explanation in English. Use it to distinguish research terms; the module develops their precise language and cautious reporting.",
  "band4-vocab-globalization": "This is a topic explanation in English, rather than an IELTS answer model. Use the module to practise precise vocabulary and qualified comparisons.",
  "band4-vocab-idioms": "The video uses workplace idioms. Check audience and tone before transferring one to a personal answer; the module separately explains break the ice.",
  "band4-mock-ielts-listening": "The video supports preparation and review. The course checkpoint is a short local skill sample, not a full-length IELTS test.",
  "band4-mock-toefl-reading": "The official episode covers General Training as well as Academic reading. The module supplies the short notice checkpoint and its explanations.",
  "band4-exam-day-strategies": "The video teaches study planning. Confirm current test-day requirements using your own booking and provider instructions."
};

export function attachCourseVideos(enrichment: Record<string, CourseEnrichment>) {
  for (const [lessonId, resource, notice] of placements) {
    const item = enrichment[lessonId];
    const selected = videoCatalogue[resource];
    const video: TeachingVideo = {
      ...selected,
      segment: resource.endsWith("2026") ? "TOEFL 2026 · teacher explanation" : resource === "discussion" ? "Academic discussion technique · earlier recording" : "Topic explanation and application",
      notice,
      coverage: coverageNotes[lessonId],
      before: `Try this module-specific question before watching: ${item.transfer.prompt}`,
      after: `Return to the worked example and explain the decision in your own words. Then try a fresh case: ${item.transfer.prompt}`,
      alternative: `Use the written explanation, worked example and quick reference in this lesson. Key reasoning: ${item.reasoning}`,
    };
    if (resource === "cambridgeInteraction") {
      video.start = 391; video.end = 634; video.segment = "Part 3 interaction demonstration · 6:31–10:34";
    }
    if (lessonId === "band1-toefl-intro") {
      video.start = 456; video.segment = "Word-formation explanation · from 7:36";
    }
    if (resource === "academicMapsProcesses") {
      video.start = 919; video.segment = "Maps from 15:19 · processes from 18:43";
    }
    if (resource === "ieltsListening") {
      video.start = 350; video.end = 1326; video.segment = "Preparation strategies · 5:50–22:06";
    }
    if (resource === "agreement") {
      video.start = 94; video.end = 153; video.segment = "Separated subjects and verbs · 1:34–2:33";
    }
    if (resource === "ieltsReading") {
      video.start = 568; video.end = 1246; video.segment = "Reading strategies · 9:28–20:46";
    }
    item.video = video;
  }
}
