import type { Level, Lesson } from "./types";

export type CourseSummary = Omit<Level, "lessons"> & { lessons: (Omit<Lesson, "blocks"> & { moduleNumber: number; skills: string[] })[] };

// Navigation metadata only. Full lesson blocks and activities stay behind route server boundaries.
export const courseCatalogue: CourseSummary[] = [
  {
    "id": "band4-5",
    "title": "Foundation & B2 First Course",
    "subtitle": "Grammar Core & FCE Foundations",
    "duration": "3–4 months",
    "intro": "B2 First preparation for learners who can already understand everyday texts and write connected paragraphs, approximately B1 entry. This is an exam-skills foundation, not a beginner English course. If cloze or transformations feel unfamiliar, start with Module 3 (tense and aspect), then Modules 18–19 (articles and agreement), before returning to Modules 1–2. The module numbers and saved progress stay the same. Solo speaking is rehearsal; a partner or teacher is needed to review live interaction.",
    "goals": [
      "Apply core tense, article and agreement choices in B2 tasks",
      "Cambridge B2 Reading & Use of English foundation strategies",
      "Develop skimming and scanning techniques for reading passages",
      "Develop B2 essays, articles, reviews and purposeful emails",
      "Plan and revise B2 responses with reasons, examples and audience awareness",
      "Build conversational fluency and confidence for Speaking Part 1",
      "Retrieve useful word families, collocations and meaning-preserving paraphrases"
    ],
    "color": "#a855f7",
    "accent": "#a855f7",
    "examTarget": "Cambridge B2 First",
    "examBadge": "B2 / FCE",
    "examHref": "/b2-pruefung",
    "lessons": [
      {
        "id": "band1-ielts-intro",
        "xpReward": 60,
        "title": "B2 Use of English: cloze and transformations",
        "subtitle": "B2 First: learn, practise, review and improve",
        "moduleNumber": 1,
        "skills": [
          "reading",
          "grammar"
        ]
      },
      {
        "id": "band1-toefl-intro",
        "xpReward": 60,
        "title": "B2 Word Formation: building meaning in context",
        "subtitle": "B2 First: learn, practise, review and improve",
        "moduleNumber": 2,
        "skills": [
          "grammar",
          "vocabulary"
        ]
      },
      {
        "id": "band1-ielts-vs-toefl",
        "xpReward": 60,
        "title": "Tense and aspect: events, duration and evidence",
        "subtitle": "B2 First: learn, practise, review and improve",
        "moduleNumber": 3,
        "skills": [
          "grammar"
        ]
      },
      {
        "id": "band1-listening-format",
        "xpReward": 60,
        "title": "B2 Listening: short extracts and precise detail",
        "subtitle": "B2 First: learn, practise, review and improve",
        "moduleNumber": 4,
        "skills": [
          "listening"
        ]
      },
      {
        "id": "band1-listening-gist",
        "xpReward": 60,
        "title": "B2 Listening: gist and sentence completion",
        "subtitle": "B2 First: learn, practise, review and improve",
        "moduleNumber": 5,
        "skills": [
          "listening"
        ]
      },
      {
        "id": "band1-listening-attitude",
        "xpReward": 50,
        "title": "B2 Listening: attitude and multiple matching",
        "subtitle": "B2 First: learn, practise, review and improve",
        "moduleNumber": 6,
        "skills": [
          "listening"
        ]
      },
      {
        "id": "band1-reading-skimming",
        "xpReward": 60,
        "title": "B2 Reading: main ideas, evidence and multiple choice",
        "subtitle": "B2 First: learn, practise, review and improve",
        "moduleNumber": 7,
        "skills": [
          "reading"
        ]
      },
      {
        "id": "band1-reading-scanning",
        "xpReward": 60,
        "title": "B2 Reading: multiple matching and accurate scanning",
        "subtitle": "B2 First: learn, practise, review and improve",
        "moduleNumber": 8,
        "skills": [
          "reading"
        ]
      },
      {
        "id": "band1-reading-completion",
        "xpReward": 50,
        "title": "B2 Reading: gapped text, reference and cohesion",
        "subtitle": "B2 First: learn, practise, review and improve",
        "moduleNumber": 9,
        "skills": [
          "reading"
        ]
      },
      {
        "id": "band1-writing-task1-overview",
        "xpReward": 50,
        "title": "B2 Writing: the compulsory essay",
        "subtitle": "B2 First: learn, practise, review and improve",
        "moduleNumber": 10,
        "skills": [
          "writing"
        ]
      },
      {
        "id": "band1-writing-trends",
        "xpReward": 50,
        "title": "B2 Writing: articles and engaging a reader",
        "subtitle": "B2 First: learn, practise, review and improve",
        "moduleNumber": 11,
        "skills": [
          "writing"
        ]
      },
      {
        "id": "band1-writing-integrated",
        "xpReward": 50,
        "title": "B2 Writing: letters and emails",
        "subtitle": "B2 First: learn, practise, review and improve",
        "moduleNumber": 12,
        "skills": [
          "writing"
        ]
      },
      {
        "id": "band1-writing-essay-structure",
        "xpReward": 50,
        "title": "B2 Writing: reviews and reports",
        "subtitle": "B2 First: learn, practise, review and improve",
        "moduleNumber": 13,
        "skills": [
          "writing"
        ]
      },
      {
        "id": "band1-writing-brainstorming",
        "xpReward": 50,
        "title": "B2 Writing: planning and developing arguments",
        "subtitle": "B2 First: learn, practise, review and improve",
        "moduleNumber": 14,
        "skills": [
          "writing"
        ]
      },
      {
        "id": "band1-speaking-part1-intro",
        "xpReward": 50,
        "title": "B2 Speaking: interview answers and development",
        "subtitle": "B2 First: learn, practise, review and improve",
        "moduleNumber": 15,
        "skills": [
          "speaking"
        ]
      },
      {
        "id": "band1-speaking-independent",
        "xpReward": 50,
        "title": "B2 Speaking: comparing two visual prompts",
        "subtitle": "B2 First: learn, practise, review and improve",
        "moduleNumber": 16,
        "skills": [
          "speaking"
        ]
      },
      {
        "id": "band1-speaking-hometown",
        "xpReward": 50,
        "title": "B2 Speaking: collaboration and discussion",
        "subtitle": "B2 First: learn, practise, review and improve",
        "moduleNumber": 17,
        "skills": [
          "speaking"
        ]
      },
      {
        "id": "band1-grammar-articles",
        "xpReward": 60,
        "title": "B2 Articles: reference and shared knowledge",
        "subtitle": "B2 First: learn, practise, review and improve",
        "moduleNumber": 18,
        "skills": [
          "grammar"
        ]
      },
      {
        "id": "band1-grammar-agreement",
        "xpReward": 50,
        "title": "B2 Agreement: complex subjects and open cloze",
        "subtitle": "B2 First: learn, practise, review and improve",
        "moduleNumber": 19,
        "skills": [
          "grammar"
        ]
      },
      {
        "id": "band1-vocab-awl1",
        "xpReward": 50,
        "title": "B2 Vocabulary: collocations and word families",
        "subtitle": "B2 First: learn, practise, review and improve",
        "moduleNumber": 20,
        "skills": [
          "grammar",
          "vocabulary"
        ]
      },
      {
        "id": "band1-vocab-synonyms",
        "xpReward": 50,
        "title": "B2 Phrasal verbs and meaning-preserving paraphrase",
        "subtitle": "B2 First: learn, practise, review and improve",
        "moduleNumber": 21,
        "skills": [
          "grammar",
          "vocabulary"
        ]
      },
      {
        "id": "band1-time-reading",
        "xpReward": 50,
        "title": "B2 Reading: timed evidence checkpoint",
        "subtitle": "B2 First: learn, practise, review and improve",
        "moduleNumber": 22,
        "skills": [
          "reading"
        ]
      },
      {
        "id": "band1-time-writing",
        "xpReward": 50,
        "title": "B2 Writing: planning under time pressure",
        "subtitle": "B2 First: learn, practise, review and improve",
        "moduleNumber": 23,
        "skills": [
          "writing"
        ]
      },
      {
        "id": "band1-practice-listening",
        "xpReward": 50,
        "title": "B2 Listening: a longer interview",
        "subtitle": "B2 First: learn, practise, review and improve",
        "moduleNumber": 24,
        "skills": [
          "listening"
        ]
      },
      {
        "id": "band1-review",
        "xpReward": 50,
        "title": "B2 Review: demonstrate and reflect",
        "subtitle": "B2 First: learn, practise, review and improve",
        "moduleNumber": 25,
        "skills": [
          "reading",
          "listening",
          "writing",
          "speaking",
          "grammar"
        ]
      }
    ]
  },
  {
    "id": "band5-6",
    "title": "IELTS Academic Practice Course",
    "subtitle": "Target Band 6.5 – 8.0+",
    "duration": "3–4 months",
    "intro": "A 25-module IELTS Academic course targeting preparation toward Band 6.5–8.0+. Learn all four skills through original explanations, worked examples, evidence-based reading and transcript study, data reporting, essays and spoken rehearsal. Targets are learning aims, not guaranteed results; text drills do not assess complete writing, listening or speaking performance.",
    "goals": [
      "Use Listening Parts 1–4 strategies for details, plans, matching, lectures and speaker attitudes",
      "Read Academic passages using factual and writer-view judgements, headings, matching and completion",
      "Report graphs, charts, tables, maps and processes accurately in Academic Writing Task 1",
      "Develop Task 2 opinion, discussion, problem-solution, trade-off and two-part responses",
      "Rehearse Speaking Parts 1–3 and review actual delivery against the four Speaking criteria",
      "Use precise vocabulary, controlled grammar, coherent development and accurate comparisons",
      "Review raw drill accuracy separately from official bands and seek feedback on full responses"
    ],
    "color": "#f97316",
    "accent": "#f97316",
    "examTarget": "IELTS Academic",
    "examBadge": "Band 6.5–8.0+",
    "examHref": "/mock-exam?exam=ielts-academic",
    "lessons": [
      {
        "id": "band2-listening-mcq",
        "title": "Listening: Part 1 Details, Corrections and Distractors",
        "subtitle": "Identify final booking details",
        "xpReward": 60,
        "moduleNumber": 1,
        "skills": [
          "listening"
        ]
      },
      {
        "id": "band2-listening-maps",
        "title": "Listening: Part 2 Plans, Directions and Matching",
        "subtitle": "Orient a simple plan",
        "xpReward": 60,
        "moduleNumber": 2,
        "skills": [
          "listening"
        ]
      },
      {
        "id": "band2-listening-form-completion",
        "title": "Listening: Parts 3–4 Opinions, Lectures and Note Completion",
        "subtitle": "Track a speaker’s attitude and qualification",
        "xpReward": 50,
        "moduleNumber": 3,
        "skills": [
          "listening"
        ]
      },
      {
        "id": "band2-reading-tfng",
        "title": "Reading: True/False/Not Given and Yes/No/Not Given",
        "subtitle": "Distinguish agreement, contradiction and missing information",
        "xpReward": 60,
        "moduleNumber": 4,
        "skills": [
          "reading"
        ]
      },
      {
        "id": "band2-reading-headings",
        "title": "Reading: Headings, Information and Features",
        "subtitle": "Choose a paragraph’s controlling idea",
        "xpReward": 60,
        "moduleNumber": 5,
        "skills": [
          "reading"
        ]
      },
      {
        "id": "band2-reading-mcq",
        "title": "Reading: Multiple Choice, Inference and Time Management",
        "subtitle": "Choose a supported paraphrase",
        "xpReward": 50,
        "moduleNumber": 6,
        "skills": [
          "reading"
        ]
      },
      {
        "id": "band2-writing-line-graphs",
        "title": "Writing Task 1: Line Graphs, Bar Charts and Overviews",
        "subtitle": "Select main trends",
        "xpReward": 60,
        "moduleNumber": 7,
        "skills": [
          "writing"
        ]
      },
      {
        "id": "band2-writing-bar-pie",
        "title": "Writing Task 1: Tables, Pie Charts and Proportions",
        "subtitle": "Compare distributions across groups",
        "xpReward": 60,
        "moduleNumber": 8,
        "skills": [
          "writing"
        ]
      },
      {
        "id": "band2-writing-letter",
        "title": "Writing Task 1: Maps and Processes",
        "subtitle": "Describe spatial changes and unchanged features",
        "xpReward": 50,
        "moduleNumber": 9,
        "skills": [
          "writing"
        ]
      },
      {
        "id": "band2-writing-opinion",
        "title": "Writing Task 2: Opinion and Discussion Essays",
        "subtitle": "Identify the exact essay demand",
        "xpReward": 60,
        "moduleNumber": 10,
        "skills": [
          "writing"
        ]
      },
      {
        "id": "band2-writing-problem-solution",
        "title": "Writing Task 2: Problems, Trade-offs and Two-Part Questions",
        "subtitle": "Plan causes and solutions that match",
        "xpReward": 50,
        "moduleNumber": 11,
        "skills": [
          "writing"
        ]
      },
      {
        "id": "band2-writing-cohesion",
        "title": "Writing: Assessment Criteria, Coherence and Cohesion",
        "subtitle": "Apply the four Writing criteria",
        "xpReward": 50,
        "moduleNumber": 12,
        "skills": [
          "writing"
        ]
      },
      {
        "id": "band2-speaking-cue-card",
        "title": "Speaking: Part 1 Answers and Part 2 Cue-Card Planning",
        "subtitle": "Extend a familiar-topic answer naturally",
        "xpReward": 60,
        "moduleNumber": 13,
        "skills": [
          "speaking"
        ]
      },
      {
        "id": "band2-speaking-describe",
        "title": "Speaking: Part 2 Description, Fluency and Pronunciation",
        "subtitle": "Develop description through a specific experience",
        "xpReward": 50,
        "moduleNumber": 14,
        "skills": [
          "speaking"
        ]
      },
      {
        "id": "band2-speaking-integrated",
        "title": "Speaking: Part 3 Reasons, Examples and Qualified Judgements",
        "subtitle": "Extend an abstract answer with reasoning",
        "xpReward": 50,
        "moduleNumber": 15,
        "skills": [
          "speaking"
        ]
      },
      {
        "id": "band2-grammar-tenses",
        "title": "Grammar for Writing: Time Reference and Accurate Tenses",
        "subtitle": "Distinguish the chart’s present description from past data",
        "xpReward": 50,
        "moduleNumber": 16,
        "skills": [
          "grammar",
          "writing"
        ]
      },
      {
        "id": "band2-grammar-complex",
        "title": "Grammar for Writing: Clauses, Contrast and Control",
        "subtitle": "Connect a reason, concession and condition accurately",
        "xpReward": 50,
        "moduleNumber": 17,
        "skills": [
          "grammar",
          "writing"
        ]
      },
      {
        "id": "band2-vocab-awl2",
        "title": "Reading and Vocabulary: Paraphrase, Summary and Sentence Completion",
        "subtitle": "Preserve meaning when paraphrasing",
        "xpReward": 50,
        "moduleNumber": 18,
        "skills": [
          "reading",
          "vocabulary"
        ]
      },
      {
        "id": "band2-vocab-collocations",
        "title": "Writing Vocabulary: Precise Comparisons and Collocations",
        "subtitle": "Choose accurate trend language",
        "xpReward": 50,
        "moduleNumber": 19,
        "skills": [
          "writing",
          "vocabulary"
        ]
      },
      {
        "id": "band2-vocab-environment",
        "title": "Listening: Academic Talks, Cause and Note Completion",
        "subtitle": "Distinguish a mechanism from an example",
        "xpReward": 50,
        "moduleNumber": 20,
        "skills": [
          "listening"
        ]
      },
      {
        "id": "band2-vocab-technology",
        "title": "Writing: Two-Part Questions and Technology Arguments",
        "subtitle": "Answer explanation and recommendation demands",
        "xpReward": 50,
        "moduleNumber": 21,
        "skills": [
          "writing"
        ]
      },
      {
        "id": "band2-mistakes-prepositions",
        "title": "Grammar and Editing: Prepositions, Rates and Evidence",
        "subtitle": "Use prepositions for a baseline, endpoint and change",
        "xpReward": 50,
        "moduleNumber": 22,
        "skills": [
          "grammar",
          "writing"
        ]
      },
      {
        "id": "band2-mistakes-countable",
        "title": "Grammar and Vocabulary: Countability in Academic Reporting",
        "subtitle": "Use countable and uncountable nouns accurately",
        "xpReward": 50,
        "moduleNumber": 23,
        "skills": [
          "grammar",
          "writing",
          "vocabulary"
        ]
      },
      {
        "id": "band2-practice-reading",
        "title": "Reading: Evidence-Based Mixed-Question Practice",
        "subtitle": "Apply judgement, completion and matching strategies to one passage",
        "xpReward": 50,
        "moduleNumber": 24,
        "skills": [
          "reading"
        ]
      },
      {
        "id": "band2-review",
        "title": "IELTS Academic: Review, Criteria and Independent Study Plan",
        "subtitle": "Distinguish practice evidence from an assessed band",
        "xpReward": 50,
        "moduleNumber": 25,
        "skills": [
          "reading",
          "listening",
          "writing",
          "speaking"
        ]
      }
    ]
  },
  {
    "id": "band6-7",
    "title": "TOEFL iBT Practice Course",
    "subtitle": "TOEFL iBT 2026 · Current 1–6 score scale",
    "duration": "4–6 months",
    "intro": "A 25-module course for TOEFL iBT from 21 January 2026. Study the current Reading, Listening, Writing and Speaking task families through contextual passages, transcript analysis, sentence building, original email and discussion models, and local recording, replay and self-review. Text-based drills are learning support and do not reproduce adaptive delivery or establish official scores.",
    "goals": [
      "Read Complete the Words, Read in Daily Life and Read an Academic Passage tasks in context",
      "Study appropriate responses, conversations, announcements and academic talks with clear evidence",
      "Build grammatical sentences and develop purposeful emails and academic discussion contributions",
      "Prepare accurate Listen and Repeat and developed Take an Interview spoken responses",
      "Apply grammar, vocabulary, inference, qualification and revision to the current task families",
      "Understand the current 1–6 scale and the transitional comparable overall 0–120 result",
      "Use genuine audio and actual written and spoken responses for independent performance review"
    ],
    "color": "#0ea5e9",
    "accent": "#0ea5e9",
    "examTarget": "TOEFL iBT · from 21 January 2026",
    "examBadge": "TOEFL 2026 · 1–6",
    "examHref": "/mock-exam?exam=toefl-ibt",
    "lessons": [
      {
        "id": "band3-listening-section3",
        "title": "Listening: Listen and Choose a Response",
        "subtitle": "Identify what a short utterance is doing",
        "xpReward": 50,
        "moduleNumber": 1,
        "skills": [
          "listening"
        ]
      },
      {
        "id": "band3-listening-lecture",
        "title": "Listening: Academic Talks, Structure and Qualified Claims",
        "subtitle": "Follow a contrast in an academic talk",
        "xpReward": 50,
        "moduleNumber": 2,
        "skills": [
          "listening"
        ]
      },
      {
        "id": "band3-listening-multiple-speakers",
        "title": "Listening: Conversations, Problems and Implied Decisions",
        "subtitle": "Identify a problem and constraint",
        "xpReward": 50,
        "moduleNumber": 3,
        "skills": [
          "listening"
        ]
      },
      {
        "id": "band3-reading-summary-completion",
        "title": "Reading: Complete the Words in Context",
        "subtitle": "Use a word’s visible letters and sentence role",
        "xpReward": 50,
        "moduleNumber": 4,
        "skills": [
          "reading",
          "vocabulary"
        ]
      },
      {
        "id": "band3-reading-matching-features",
        "title": "Reading: Read in Daily Life—Notices and Practical Conditions",
        "subtitle": "Extract a practical action from a notice",
        "xpReward": 50,
        "moduleNumber": 5,
        "skills": [
          "reading"
        ]
      },
      {
        "id": "band3-reading-flowchart",
        "title": "Reading: Academic Passages, Evidence and Author Purpose",
        "subtitle": "Identify the main claim in an academic paragraph",
        "xpReward": 50,
        "moduleNumber": 6,
        "skills": [
          "reading"
        ]
      },
      {
        "id": "band3-writing-multiple-charts",
        "title": "Writing: Write for an Academic Discussion",
        "subtitle": "Contribute an original position to a classroom thread",
        "xpReward": 60,
        "moduleNumber": 7,
        "skills": [
          "writing"
        ]
      },
      {
        "id": "band3-writing-maps-processes",
        "title": "Writing: Write an Email—Purpose, Detail and Tone",
        "subtitle": "Address every requested action in an email",
        "xpReward": 60,
        "moduleNumber": 8,
        "skills": [
          "writing"
        ]
      },
      {
        "id": "band3-writing-discussion",
        "title": "Writing: Build a Sentence—Word Forms and Agreement",
        "subtitle": "Choose word forms that fit a sentence",
        "xpReward": 60,
        "moduleNumber": 9,
        "skills": [
          "grammar",
          "writing"
        ]
      },
      {
        "id": "band3-writing-advantages",
        "title": "Writing: Build a Sentence—Statements and Questions",
        "subtitle": "Reconstruct a grammatical sentence or question",
        "xpReward": 50,
        "moduleNumber": 10,
        "skills": [
          "grammar",
          "writing"
        ]
      },
      {
        "id": "band3-writing-task-response",
        "title": "Writing: Email Task Fulfilment and Actionable Requests",
        "subtitle": "Cover every communication requirement",
        "xpReward": 50,
        "moduleNumber": 11,
        "skills": [
          "writing"
        ]
      },
      {
        "id": "band3-writing-formality",
        "title": "Writing: Academic Discussion Development and Register",
        "subtitle": "Extend a peer idea with a mechanism",
        "xpReward": 50,
        "moduleNumber": 12,
        "skills": [
          "writing"
        ]
      },
      {
        "id": "band3-speaking-part3",
        "title": "Speaking: Listen and Repeat—Accuracy and Meaning Groups",
        "subtitle": "Distinguish repetition from paraphrase",
        "xpReward": 50,
        "moduleNumber": 13,
        "skills": [
          "speaking"
        ]
      },
      {
        "id": "band3-speaking-opinions",
        "title": "Speaking: Take an Interview—Relevant Developed Answers",
        "subtitle": "Answer an interview question directly",
        "xpReward": 50,
        "moduleNumber": 14,
        "skills": [
          "speaking"
        ]
      },
      {
        "id": "band3-speaking-toefl4",
        "title": "Speaking: Listen and Repeat—Longer Clauses and Precision",
        "subtitle": "Retain dependent clauses and contrasts",
        "xpReward": 60,
        "moduleNumber": 15,
        "skills": [
          "speaking"
        ]
      },
      {
        "id": "band3-grammar-conditionals",
        "title": "Grammar for Writing: Sentence Building with Questions and Conditions",
        "subtitle": "Place auxiliaries in direct questions",
        "xpReward": 50,
        "moduleNumber": 16,
        "skills": [
          "grammar",
          "writing"
        ]
      },
      {
        "id": "band3-grammar-passive",
        "title": "Grammar for Writing: Active, Passive and Reference",
        "subtitle": "Choose active or passive according to focus",
        "xpReward": 50,
        "moduleNumber": 17,
        "skills": [
          "grammar",
          "writing"
        ]
      },
      {
        "id": "band3-vocab-awl3",
        "title": "Reading and Vocabulary: Word Families, Evidence and Hedging",
        "subtitle": "Infer an academic word’s contextual meaning",
        "xpReward": 50,
        "moduleNumber": 18,
        "skills": [
          "reading",
          "vocabulary"
        ]
      },
      {
        "id": "band3-vocab-health",
        "title": "Reading: Health Research, Comparisons and Causal Limits",
        "subtitle": "Interpret an outcome that combines actions",
        "xpReward": 50,
        "moduleNumber": 19,
        "skills": [
          "reading"
        ]
      },
      {
        "id": "band3-vocab-education",
        "title": "Listening: Announcements, Changes and Required Actions",
        "subtitle": "Identify changed and unchanged details",
        "xpReward": 50,
        "moduleNumber": 20,
        "skills": [
          "listening"
        ]
      },
      {
        "id": "band3-vocab-work",
        "title": "Reading: Daily-Life Messages and Workplace Inference",
        "subtitle": "Extract preparation instructions from a message",
        "xpReward": 50,
        "moduleNumber": 21,
        "skills": [
          "reading"
        ]
      },
      {
        "id": "band3-paraphrasing",
        "title": "Speaking: Interview Comparison and Precise Paraphrasing",
        "subtitle": "Make a clear comparison on a shared dimension",
        "xpReward": 50,
        "moduleNumber": 22,
        "skills": [
          "speaking"
        ]
      },
      {
        "id": "band3-error-analysis",
        "title": "Writing: Error Analysis and Meaning-Preserving Revision",
        "subtitle": "Prioritise errors affecting clarity and task fulfilment",
        "xpReward": 50,
        "moduleNumber": 23,
        "skills": [
          "grammar",
          "writing"
        ]
      },
      {
        "id": "band3-practice-essay",
        "title": "Writing: Timed Email and Academic Discussion Practice",
        "subtitle": "Plan two current TOEFL writing tasks",
        "xpReward": 50,
        "moduleNumber": 24,
        "skills": [
          "writing"
        ]
      },
      {
        "id": "band3-review",
        "title": "TOEFL iBT 2026: Format, Score Terminology and Study Review",
        "subtitle": "Identify all current task families",
        "xpReward": 50,
        "moduleNumber": 25,
        "skills": [
          "reading",
          "listening",
          "writing",
          "speaking"
        ]
      }
    ]
  },
  {
    "id": "band7-8",
    "title": "IELTS General & High-Band Masterclass",
    "subtitle": "Target Band 7.5 – 9.0 (Work & PR)",
    "duration": "4–6 months",
    "intro": "A focused IELTS General Training masterclass for learners who already write connected responses and want more precise evidence use, natural vocabulary, letters and essays. Listening and Speaking are shared with Academic IELTS; Reading and Writing here remain General Training. Local practice and self-review do not predict a high band or replace a full examination. The shared-skills links provide additional Listening formats and Part 1 rehearsal.",
    "goals": [
      "Master IELTS General Writing Task 1 (Formal, semi-formal, and informal letters)",
      "Excel in workplace and public notices reading (Sections 1 & 2)",
      "Advanced grammar mastery: negative inversion, cleft sentences, participle clauses",
      "Discuss abstract, complex topics in Speaking Part 3 with nuanced speculation",
      "Choose natural, precise vocabulary and collocations appropriate to purpose and register",
      "Practise detail, inference, matching, plan labelling and multiple selection with original synthetic audio",
      "Use the separate Mock Exam for broader timed practice; seek external feedback on productive skills"
    ],
    "color": "#10b981",
    "accent": "#10b981",
    "examTarget": "IELTS General",
    "examBadge": "Band 7.5–9.0",
    "examHref": "/mock-exam?exam=ielts-general",
    "lessons": [
      {
        "id": "band4-listening-accents",
        "xpReward": 60,
        "title": "Listening: connected speech and careful detail",
        "subtitle": "IELTS General Training: learn, practise, review and improve",
        "moduleNumber": 1,
        "skills": [
          "listening"
        ]
      },
      {
        "id": "band4-listening-inference",
        "xpReward": 50,
        "title": "Listening: inference and qualified attitudes",
        "subtitle": "IELTS General Training: learn, practise, review and improve",
        "moduleNumber": 2,
        "skills": [
          "listening"
        ]
      },
      {
        "id": "band4-listening-distractors",
        "xpReward": 50,
        "title": "Listening: distractors and final decisions",
        "subtitle": "IELTS General Training: learn, practise, review and improve",
        "moduleNumber": 3,
        "skills": [
          "listening"
        ]
      },
      {
        "id": "band4-reading-writers-views",
        "xpReward": 50,
        "title": "Reading: Identifying Writer's Views",
        "subtitle": "IELTS General Training: learn, practise, review and improve",
        "moduleNumber": 4,
        "skills": [
          "reading"
        ]
      },
      {
        "id": "band4-reading-difficult-texts",
        "xpReward": 50,
        "title": "Reading: Dealing with Difficult Texts",
        "subtitle": "IELTS General Training: learn, practise, review and improve",
        "moduleNumber": 5,
        "skills": [
          "reading"
        ]
      },
      {
        "id": "band4-reading-time-pressure",
        "xpReward": 50,
        "title": "Reading: Time Pressure Strategies",
        "subtitle": "IELTS General Training: learn, practise, review and improve",
        "moduleNumber": 6,
        "skills": [
          "reading"
        ]
      },
      {
        "id": "band4-writing-sophisticated",
        "xpReward": 60,
        "title": "General Training Task 1: formal, semi-formal and informal letters",
        "subtitle": "IELTS General Training: learn, practise, review and improve",
        "moduleNumber": 7,
        "skills": [
          "writing"
        ]
      },
      {
        "id": "band4-writing-complex-comparisons",
        "xpReward": 60,
        "title": "IELTS General Reading: Workplace & Public Notices Masterclass",
        "subtitle": "IELTS General Training: learn, practise, review and improve",
        "moduleNumber": 8,
        "skills": [
          "reading"
        ]
      },
      {
        "id": "band4-writing-complex-ideas",
        "xpReward": 50,
        "title": "General Training Task 2: developing a complex position",
        "subtitle": "IELTS General Training: learn, practise, review and improve",
        "moduleNumber": 9,
        "skills": [
          "writing"
        ]
      },
      {
        "id": "band4-writing-lexical-resource",
        "xpReward": 50,
        "title": "Lexical precision and natural register",
        "subtitle": "IELTS General Training: learn, practise, review and improve",
        "moduleNumber": 10,
        "skills": [
          "writing",
          "vocabulary"
        ]
      },
      {
        "id": "band4-writing-grammatical-range",
        "xpReward": 50,
        "title": "Grammatical range with control",
        "subtitle": "IELTS General Training: learn, practise, review and improve",
        "moduleNumber": 11,
        "skills": [
          "grammar",
          "writing"
        ]
      },
      {
        "id": "band4-writing-band8-essay",
        "xpReward": 50,
        "title": "General Training Task 2: full model and critical comparison",
        "subtitle": "IELTS General Training: learn, practise, review and improve",
        "moduleNumber": 12,
        "skills": [
          "writing"
        ]
      },
      {
        "id": "band4-speaking-storytelling",
        "xpReward": 50,
        "title": "Part 2: coherent storytelling",
        "subtitle": "IELTS General Training: learn, practise, review and improve",
        "moduleNumber": 13,
        "skills": [
          "speaking"
        ]
      },
      {
        "id": "band4-speaking-abstract-topics",
        "xpReward": 50,
        "title": "Part 3: abstract questions with concrete support",
        "subtitle": "IELTS General Training: learn, practise, review and improve",
        "moduleNumber": 14,
        "skills": [
          "speaking"
        ]
      },
      {
        "id": "band4-speaking-pronunciation",
        "xpReward": 50,
        "title": "Pronunciation: intelligibility, stress and phrasing",
        "subtitle": "IELTS General Training: learn, practise, review and improve",
        "moduleNumber": 15,
        "skills": [
          "speaking"
        ]
      },
      {
        "id": "band4-grammar-inversion",
        "xpReward": 60,
        "title": "Inversion and cleft sentences without forced complexity",
        "subtitle": "IELTS General Training: learn, practise, review and improve",
        "moduleNumber": 16,
        "skills": [
          "grammar",
          "writing"
        ]
      },
      {
        "id": "band4-grammar-participles",
        "xpReward": 50,
        "title": "Participle clauses and unambiguous subjects",
        "subtitle": "IELTS General Training: learn, practise, review and improve",
        "moduleNumber": 17,
        "skills": [
          "grammar",
          "writing"
        ]
      },
      {
        "id": "band4-vocab-awl4",
        "xpReward": 50,
        "title": "Vocabulary: precise claims and natural collocations",
        "subtitle": "IELTS General Training: learn, practise, review and improve",
        "moduleNumber": 18,
        "skills": [
          "reading",
          "vocabulary"
        ]
      },
      {
        "id": "band4-vocab-science",
        "xpReward": 50,
        "title": "Vocabulary: Topic-Specific — Science & Research",
        "subtitle": "IELTS General Training: learn, practise, review and improve",
        "moduleNumber": 19,
        "skills": [
          "reading",
          "vocabulary"
        ]
      },
      {
        "id": "band4-vocab-globalization",
        "xpReward": 50,
        "title": "Vocabulary: Topic-Specific — Globalization",
        "subtitle": "IELTS General Training: learn, practise, review and improve",
        "moduleNumber": 20,
        "skills": [
          "reading",
          "vocabulary"
        ]
      },
      {
        "id": "band4-vocab-idioms",
        "xpReward": 50,
        "title": "Natural vocabulary and idioms in spoken answers",
        "subtitle": "IELTS General Training: learn, practise, review and improve",
        "moduleNumber": 21,
        "skills": [
          "speaking",
          "vocabulary"
        ]
      },
      {
        "id": "band4-mock-ielts-listening",
        "xpReward": 50,
        "title": "Listening: a mixed lesson checkpoint",
        "subtitle": "IELTS General Training: learn, practise, review and improve",
        "moduleNumber": 22,
        "skills": [
          "listening"
        ]
      },
      {
        "id": "band4-mock-toefl-reading",
        "xpReward": 50,
        "title": "General Training Reading: mixed evidence checkpoint",
        "subtitle": "IELTS General Training: learn, practise, review and improve",
        "moduleNumber": 23,
        "skills": [
          "reading"
        ]
      },
      {
        "id": "band4-exam-day-strategies",
        "xpReward": 50,
        "title": "Exam-day planning and realistic practice",
        "subtitle": "IELTS General Training: learn, practise, review and improve",
        "moduleNumber": 24,
        "skills": [
          "reading",
          "listening",
          "writing",
          "speaking"
        ]
      },
      {
        "id": "band4-review",
        "xpReward": 50,
        "title": "General Training review: evidence and next steps",
        "subtitle": "IELTS General Training: learn, practise, review and improve",
        "moduleNumber": 25,
        "skills": [
          "reading",
          "listening",
          "writing",
          "speaking"
        ]
      }
    ]
  }
];
