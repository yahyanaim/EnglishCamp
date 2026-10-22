export type ExamType = "ielts-academic" | "ielts-general" | "toefl-ibt";

export type SkillType = "listening" | "reading" | "writing" | "speaking";

export type MockExamQuestionType =
  | "multiple-choice"
  | "true-false-not-given"
  | "yes-no-not-given"
  | "matching-headings"
  | "matching-information"
  | "sentence-completion"
  | "summary-completion"
  | "fill-blank"
  | "complete-the-words"
  | "read-in-daily-life";

export type MockExamQuestion = {
  id: string;
  type: MockExamQuestionType;
  prompt: string;
  text?: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  explanationAr?: string;
  bandTarget?: string;
  // For complete-the-words or sentence build
  prefix?: string;
  suffix?: string;
  partialWord?: string;
  fullWord?: string;
};

export type MockExamSection = {
  id: string;
  skill: SkillType;
  title: string;
  subtitle: string;
  duration: number; // in minutes
  instructions: string;
  // Audio playback for listening (read aloud via Web Speech API)
  audioScript?: string;
  speakerAccents?: string[];
  // Reading passage text (split layout)
  passageTitle?: string;
  passageText?: string;
  questions: MockExamQuestion[];
};

export type ChartDataPoint = {
  label: string;
  [key: string]: string | number;
};

export type MockWritingTask = {
  id: string;
  taskNumber: 1 | 2 | 3;
  type: "chart-description" | "letter" | "discursive-essay" | "toefl-email" | "toefl-academic-discussion" | "toefl-sentence";
  title: string;
  instructions: string;
  suggestedDuration: number; // in minutes
  minimumWords: number;
  // For Task 1 Visual
  visualData?: {
    type: "line-chart" | "bar-chart" | "pie-chart" | "process-diagram";
    title: string;
    description: string;
    xAxisLabel: string;
    yAxisLabel: string;
    series: { name: string; color: string; values: { x: string; y: number }[] }[];
  };
  // For TOEFL Academic Discussion
  discussionPrompt?: {
    professor: {
      name: string;
      title: string;
      prompt: string;
    };
    students: {
      name: string;
      avatar: string;
      response: string;
    }[];
  };
  modelAnswer: {
    band: string;
    text: string;
    analysis: string;
  };
  rubricCriteria: {
    name: string;
    description: string;
    tips: string[];
  }[];
  notes?: string[];
};

export type MockSpeakingTask = {
  id: string;
  partNumber: 1 | 2 | 3;
  title: string;
  description: string;
  preparationTimeSeconds: number;
  speakingTimeSeconds: number;
  prompts: string[];
  followUpQuestion?: string;
  modelResponse: {
    band: string;
    transcript: string;
    examinerComment: string;
  };
  assessmentRubric: {
    fluency: string;
    lexical: string;
    grammar: string;
    pronunciation: string;
  };
};

export type MockExam = {
  id: ExamType;
  title: string;
  subtitle: string;
  description: string;
  examType: ExamType;
  totalDuration: number; // in minutes
  scoringSystem: "ielts-band" | "toefl-score";
  listeningSections: MockExamSection[];
  readingSections: MockExamSection[];
  writingTasks: MockWritingTask[];
  speakingTasks: MockSpeakingTask[];
  // Backwards compatibility
  sections: MockExamSection[];
  passingScore: number;
};

// ─────────────────────────────────────────────────────────────
// Psychometric Scoring & Concordance Tables
// ─────────────────────────────────────────────────────────────

export function calculateIeltsBand(rawScore: number, maxScore: number, skill: "listening" | "academic-reading" | "gt-reading"): number {
  const scaled = Math.round((Math.max(0, Math.min(rawScore, maxScore)) / maxScore) * 40);

  if (skill === "listening") {
    if (scaled >= 39) return 9.0;
    if (scaled >= 37) return 8.5;
    if (scaled >= 35) return 8.0;
    if (scaled >= 32) return 7.5;
    if (scaled >= 30) return 7.0;
    if (scaled >= 26) return 6.5;
    if (scaled >= 23) return 6.0;
    if (scaled >= 18) return 5.5;
    if (scaled >= 16) return 5.0;
    if (scaled >= 13) return 4.5;
    if (scaled >= 10) return 4.0;
    if (scaled >= 6) return 3.5;
    if (scaled >= 4) return 3.0;
    return 2.5;
  }

  if (skill === "academic-reading") {
    if (scaled >= 39) return 9.0;
    if (scaled >= 37) return 8.5;
    if (scaled >= 35) return 8.0;
    if (scaled >= 33) return 7.5;
    if (scaled >= 30) return 7.0;
    if (scaled >= 27) return 6.5;
    if (scaled >= 23) return 6.0;
    if (scaled >= 19) return 5.5;
    if (scaled >= 15) return 5.0;
    if (scaled >= 13) return 4.5;
    if (scaled >= 10) return 4.0;
    if (scaled >= 8) return 3.5;
    if (scaled >= 6) return 3.0;
    return 2.5;
  }

  // General Training Reading requires higher raw scores
  if (scaled >= 40) return 9.0;
  if (scaled >= 39) return 8.5;
  if (scaled >= 37) return 8.0;
  if (scaled >= 36) return 7.5;
  if (scaled >= 34) return 7.0;
  if (scaled >= 32) return 6.5;
  if (scaled >= 30) return 6.0;
  if (scaled >= 27) return 5.5;
  if (scaled >= 23) return 5.0;
  if (scaled >= 19) return 4.5;
  if (scaled >= 15) return 4.0;
  if (scaled >= 12) return 3.5;
  if (scaled >= 9) return 3.0;
  return 2.5;
}

export function calculateIeltsOverallBand(listening: number, reading: number, writing: number, speaking: number): number {
  const avg = (listening + reading + writing + speaking) / 4;
  const intPart = Math.floor(avg);
  const frac = avg - intPart;
  if (frac < 0.25) return intPart;
  if (frac < 0.75) return intPart + 0.5;
  return intPart + 1.0;
}

export function getIeltsBandDescription(band: number): { label: string; cefr: string; summary: string } {
  if (band >= 8.5) {
    return {
      label: "Expert / Very Good User",
      cefr: "C2",
      summary: "Has fully operational command of the language: appropriate, accurate and fluent with complete understanding.",
    };
  }
  if (band >= 7.5) {
    return {
      label: "Very Good User",
      cefr: "C1",
      summary: "Has operational command of the language, though with occasional unsystematic inaccuracies and inappropriacies.",
    };
  }
  if (band >= 6.5) {
    return {
      label: "Good / Competent User",
      cefr: "B2",
      summary: "Has generally effective command of the language despite some inaccuracies, inappropriacies and misunderstandings.",
    };
  }
  if (band >= 5.5) {
    return {
      label: "Competent / Modest User",
      cefr: "B2-",
      summary: "Has partial command of the language, coping with overall meaning in most situations, though is likely to make many mistakes.",
    };
  }
  if (band >= 4.5) {
    return {
      label: "Modest User",
      cefr: "B1",
      summary: "Basic competence is limited to familiar situations. Frequently has problems in understanding and expression.",
    };
  }
  return {
    label: "Limited User",
    cefr: "A2 / B1",
    summary: "Basic competence is limited to familiar situations with frequent breakdowns in communication.",
  };
}

export function calculateToeflScore(
  readingRaw: number,
  readingTotal: number,
  listeningRaw: number,
  listeningTotal: number,
  writingEstimatedBand: number = 4.5,
  speakingEstimatedBand: number = 4.5
): {
  band: number;
  concordance: number;
  cefr: string;
  readingBand: number;
  listeningBand: number;
  writingBand: number;
  speakingBand: number;
  summary: string;
} {
  const readingPct = readingTotal > 0 ? readingRaw / readingTotal : 0;
  const listeningPct = listeningTotal > 0 ? listeningRaw / listeningTotal : 0;

  const rawToBand = (pct: number) => {
    if (pct >= 0.92) return 6.0;
    if (pct >= 0.82) return 5.5;
    if (pct >= 0.72) return 5.0;
    if (pct >= 0.62) return 4.5;
    if (pct >= 0.52) return 4.0;
    if (pct >= 0.42) return 3.5;
    if (pct >= 0.32) return 3.0;
    if (pct >= 0.22) return 2.5;
    if (pct >= 0.12) return 2.0;
    if (pct > 0.05) return 1.5;
    return 1.0;
  };

  const readingBand = rawToBand(readingPct);
  const listeningBand = rawToBand(listeningPct);
  const writingBand = writingEstimatedBand;
  const speakingBand = speakingEstimatedBand;

  // Unweighted average rounded to nearest 0.5
  const rawAvg = (readingBand + listeningBand + writingBand + speakingBand) / 4;
  const band = Math.round(rawAvg * 2) / 2;

  // Official ETS 2026 Concordance to 0–120 Scale
  let concordance = 30;
  let cefr = "A2";
  let summary = "Basic communication capabilities in English.";

  if (band >= 6.0) {
    concordance = 118;
    cefr = "C2";
    summary = "Exemplary academic communication across highly specialized and complex topics.";
  } else if (band >= 5.5) {
    concordance = 110;
    cefr = "C1+";
    summary = "Strong academic command with sophisticated vocabulary and natural fluency.";
  } else if (band >= 5.0) {
    concordance = 100;
    cefr = "C1";
    summary = "Effective academic communication suitable for university-level coursework.";
  } else if (band >= 4.5) {
    concordance = 88;
    cefr = "B2+";
    summary = "Good working competence in academic settings with minor lexical or grammatical limitations.";
  } else if (band >= 4.0) {
    concordance = 78;
    cefr = "B2";
    summary = "Solid general proficiency capable of understanding core academic lectures and discussions.";
  } else if (band >= 3.5) {
    concordance = 64;
    cefr = "B1+";
    summary = "Developing academic proficiency; handles predictable communication well.";
  } else if (band >= 3.0) {
    concordance = 52;
    cefr = "B1";
    summary = "Threshold proficiency with limitations in complex syntactical expression.";
  } else if (band >= 2.5) {
    concordance = 38;
    cefr = "A2+";
    summary = "Elementary proficiency capable of routine campus interactions.";
  } else {
    concordance = 25;
    cefr = "A2";
    summary = "Basic communication restricted to simple phrases.";
  }

  return {
    band,
    concordance,
    cefr,
    readingBand,
    listeningBand,
    writingBand,
    speakingBand,
    summary,
  };
}

// ─────────────────────────────────────────────────────────────
// IELTS Academic Mock Exam Dataset
// ─────────────────────────────────────────────────────────────

export const ieltsAcademicListening: MockExamSection[] = [
  {
    id: "ielts-acad-l1",
    skill: "listening",
    title: "Section 1: Social & Accommodation Dialogue",
    subtitle: "Student Accommodation & Facilities Registration",
    duration: 8,
    instructions: "Listen to the conversation between a newly enrolled graduate student and the university housing coordinator. Answer questions 1–5. In the actual test, you hear the recording ONCE only. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    audioScript: "Hello, Student Housing Office. How can I help you today? Hello. My name is Julian Fletcher. I am a postgraduate student arriving next month for the Master of Sustainable Architecture programme. I need to register for university-managed accommodation. Certainly, Mr. Fletcher. Let me pull up your student portal file. Fletcher, Julian... yes, student ID SA-8842. We have three main accommodation options available for postgraduates: university studio apartments, shared graduate houses, and catered hall rooms. Which were you considering? I definitely prefer a self-catered shared house with a private study desk and high-speed internet. I understand the shared houses on Parkside Avenue are very quiet. That is correct. We have a private ensuite room available in Parkside Villa starting on the fifteenth of September. The weekly rent is one hundred and eighty-five pounds, which includes water, heating, and broadband. Electricity is billed separately on a monthly smart meter. One hundred and eighty-five pounds sounds very reasonable. And is there secure bicycle storage? Yes, there is a locked bike shed in the rear courtyard. Also, all residents must pay a refundable security deposit of four hundred pounds prior to collecting their keys.",
    speakerAccents: ["British (Coordinator)", "Canadian (Student)"],
    questions: [
      {
        id: "ia-l1-1",
        type: "fill-blank",
        prompt: "Student's field of study: Master of ______",
        correctAnswer: "Sustainable Architecture",
        explanation: "The student explicitly says: 'I am a postgraduate student arriving next month for the Master of Sustainable Architecture programme.'",
        bandTarget: "Band 6.0",
      },
      {
        id: "ia-l1-2",
        type: "fill-blank",
        prompt: "Preferred accommodation location: ______ Avenue",
        correctAnswer: "Parkside",
        explanation: "The student asks about the shared houses on 'Parkside Avenue', and the officer confirms an ensuite room in Parkside Villa.",
        bandTarget: "Band 6.0",
      },
      {
        id: "ia-l1-3",
        type: "fill-blank",
        prompt: "Tenancy start date: ______ September",
        correctAnswer: "15th",
        explanation: "The officer states: 'starting on the fifteenth of September.' Acceptable formats: '15th' or '15'.",
        bandTarget: "Band 6.5",
      },
      {
        id: "ia-l1-4",
        type: "fill-blank",
        prompt: "Weekly rent amount: £______",
        correctAnswer: "185",
        explanation: "The officer confirms: 'The weekly rent is one hundred and eighty-five pounds.'",
        bandTarget: "Band 6.5",
      },
      {
        id: "ia-l1-5",
        type: "fill-blank",
        prompt: "Refundable security deposit: £______",
        correctAnswer: "400",
        explanation: "The coordinator notes: 'a refundable security deposit of four hundred pounds prior to collecting their keys.'",
        bandTarget: "Band 7.0",
      },
    ],
  },
  {
    id: "ielts-acad-l2",
    skill: "listening",
    title: "Section 2: Public Monologue / Community Orientation",
    subtitle: "Riverside Wetland Nature Reserve Guide",
    duration: 8,
    instructions: "Listen to a ranger delivering a briefing to new volunteers at the Riverside Wetland Nature Reserve. Choose the correct letter A, B, or C for questions 6–10.",
    audioScript: "Welcome everyone to our volunteer orientation at the Riverside Wetland Nature Reserve. Before we divide into our morning maintenance groups, I'd like to highlight a few essential guidelines and updates. As you know, the reserve spans over three hundred hectares of marshland, reed beds, and tidal mudflats. Our primary conservation objective this spring is the protection of the migrating Eurasian bittern, a critically vulnerable heron species that nests exclusively in undisturbed reed beds. For this reason, Section C on the eastern boundary is strictly off-limits to visitors and volunteers until early July. Last winter's severe flooding damaged several raised boardwalks. The West Boardwalk leading to the Bird Observation Tower has been completely rebuilt using recycled composite lumber, which is slip-resistant and much more durable than cedar. Regarding safety, all volunteers must wear high-visibility vests and steel-toed wellington boots. Please do not touch any injured wildfowl directly; instead, immediately radio Base Station 2 so our qualified veterinary team can dispatch an extraction crate.",
    speakerAccents: ["British (Ranger)"],
    questions: [
      {
        id: "ia-l2-1",
        type: "multiple-choice",
        prompt: "What is the primary conservation priority at the reserve this spring?",
        options: [
          "Clearing non-native vegetation from the tidal mudflats",
          "Protecting the nesting habitat of the Eurasian bittern",
          "Conducting an aerial census of migrating water birds",
        ],
        correctAnswer: "Protecting the nesting habitat of the Eurasian bittern",
        explanation: "The ranger explains: 'Our primary conservation objective this spring is the protection of the migrating Eurasian bittern... which nests exclusively in undisturbed reed beds.'",
        bandTarget: "Band 7.0",
      },
      {
        id: "ia-l2-2",
        type: "multiple-choice",
        prompt: "Why is Section C on the eastern boundary currently closed?",
        options: [
          "To allow undisturbed breeding during the nesting season",
          "Because high floodwaters have washed away the bridges",
          "To carry out soil decontamination after a fuel spill",
        ],
        correctAnswer: "To allow undisturbed breeding during the nesting season",
        explanation: "The speaker clarifies that Section C is strictly off-limits until early July because of the vulnerable bittern nesting in undisturbed reed beds.",
        bandTarget: "Band 7.0",
      },
      {
        id: "ia-l2-3",
        type: "multiple-choice",
        prompt: "What material was chosen for the reconstructed West Boardwalk?",
        options: [
          "Treated cedar planks",
          "Galvanized structural steel",
          "Recycled composite lumber",
        ],
        correctAnswer: "Recycled composite lumber",
        explanation: "The ranger says the West Boardwalk 'has been completely rebuilt using recycled composite lumber, which is slip-resistant.'",
        bandTarget: "Band 7.5",
      },
      {
        id: "ia-l2-4",
        type: "multiple-choice",
        prompt: "What should volunteers do if they encounter an injured bird?",
        options: [
          "Transport it immediately to the visitor centre",
          "Radio Base Station 2 for the veterinary team",
          "Place a protective cloth over the animal's eyes",
        ],
        correctAnswer: "Radio Base Station 2 for the veterinary team",
        explanation: "The instructions state: 'Please do not touch any injured wildfowl directly; instead, immediately radio Base Station 2 so our qualified veterinary team can dispatch an extraction crate.'",
        bandTarget: "Band 7.5",
      },
      {
        id: "ia-l2-5",
        type: "multiple-choice",
        prompt: "Which mandatory protective equipment must all volunteers wear?",
        options: [
          "High-visibility vests and steel-toed boots",
          "Waterproof gloves and safety helmets",
          "Life jackets and thermal outerwear",
        ],
        correctAnswer: "High-visibility vests and steel-toed boots",
        explanation: "The ranger specifies: 'all volunteers must wear high-visibility vests and steel-toed wellington boots.'",
        bandTarget: "Band 6.5",
      },
    ],
  },
];

export const ieltsAcademicReading: MockExamSection[] = [
  {
    id: "ielts-acad-r1",
    skill: "reading",
    title: "Passage 1: Termite Architecture & Biomimetic Engineering",
    subtitle: "Passive Climate Control in Modern Architecture",
    duration: 20,
    instructions: "Read the passage below and answer Questions 1–6. For Questions 1–4, choose TRUE, FALSE, or NOT GIVEN according to the text.",
    passageTitle: "Termite Architecture and Biomimetic Engineering",
    passageText: `Paragraph A
In the harsh, arid savannahs of sub-Saharan Africa, macrotermes bellicosus termites construct towering earthen mounds that reach up to eight metres in height. While outside temperatures fluctuate between scorching daytime highs of 42°C and frigid nighttime lows of 2°C, the interior temperature of the termite nest remains remarkably constant at approximately 30°C. For decades, entomologists and architects assumed that this thermodynamic stability was achieved via a self-contained thermosiphon chimney system, where metabolic heat from the colony drove warm air upwards through a central flue, drawing cooler air through subterranean peripheral tunnels.

Paragraph B
Recent non-invasive imaging and real-time gas tracer experiments conducted by Dr. Scott Turner have challenged this traditional closed-circuit paradigm. Rather than functioning as an internal air-conditioning machine, the mound operates as an external lung. The porous outer walls of the mound are attuned to ambient turbulent gusts of wind. Fluctuations in external wind pressure oscillate through the complex labyrinth of outer micro-channels, facilitating the exchange of carbon dioxide and oxygen while dampening temperature swings without mechanical fans or power sources.

Paragraph C
Architect Mick Pearce famously drew inspiration from these macrotermes structures when designing the Eastgate Centre, an iconic shopping and office complex in Harare, Zimbabwe. Constructed in the mid-1990s, Eastgate consumes thirty-five percent less energy than conventional air-conditioned buildings of comparable floor area in southern Africa. Instead of relying on energy-intensive chillers, Pearce utilised high thermal mass concrete, subterranean air ducts, and forty-eight vertical ventilation chimneys that vent hot air accumulated during the workday while cool nocturnal air is absorbed by the masonry.

Paragraph D
Despite its commercial success, architectural theorists argue that the Eastgate Centre was built on the older, slightly inaccurate thermosiphon model rather than Turner's turbulent lung discovery. Contemporary biomimetic researchers are now developing facade systems equipped with micro-porous acoustic ceramic membranes that mimic the dynamic permeability of the outer mound wall. These new materials are expected to achieve zero-energy climate modulation in humid tropical high-rises where conventional evaporative cooling fails.`,
    questions: [
      {
        id: "ia-r1-1",
        type: "true-false-not-given",
        prompt: "The internal temperature of macrotermes bellicosus mounds varies substantially between day and night.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correctAnswer: "FALSE",
        explanation: "Paragraph A states: 'While outside temperatures fluctuate between scorching daytime highs... and frigid nighttime lows... the interior temperature of the termite nest remains remarkably constant at approximately 30°C.'",
        bandTarget: "Band 7.0",
      },
      {
        id: "ia-r1-2",
        type: "true-false-not-given",
        prompt: "Dr. Scott Turner demonstrated that termite mounds operate more like an external lung than a closed-circuit air conditioner.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correctAnswer: "TRUE",
        explanation: "Paragraph B directly states: 'Rather than functioning as an internal air-conditioning machine, the mound operates as an external lung.'",
        bandTarget: "Band 7.0",
      },
      {
        id: "ia-r1-3",
        type: "true-false-not-given",
        prompt: "The Eastgate Centre in Harare cost significantly more to construct than conventional buildings.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correctAnswer: "NOT GIVEN",
        explanation: "Paragraph C notes that Eastgate 'consumes thirty-five percent less energy than conventional air-conditioned buildings', but the text does NOT provide information about its comparative construction costs.",
        bandTarget: "Band 7.5",
      },
      {
        id: "ia-r1-4",
        type: "true-false-not-given",
        prompt: "Mick Pearce's design for the Eastgate Centre incorporated all of Dr. Scott Turner's modern findings.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correctAnswer: "FALSE",
        explanation: "Paragraph D explicitly states: 'the Eastgate Centre was built on the older, slightly inaccurate thermosiphon model rather than Turner's turbulent lung discovery.'",
        bandTarget: "Band 8.0",
      },
      {
        id: "ia-r1-5",
        type: "sentence-completion",
        prompt: "Complete the sentence. Write NO MORE THAN TWO WORDS from the text: The outer walls of the termite mound possess micro-channels that react to ambient ______.",
        correctAnswer: "wind",
        explanation: "Paragraph B says the outer walls are 'attuned to ambient turbulent gusts of wind.' Acceptable: 'wind' or 'gusts of wind'.",
        bandTarget: "Band 7.5",
      },
      {
        id: "ia-r1-6",
        type: "sentence-completion",
        prompt: "Complete the sentence. Write NO MORE THAN TWO WORDS from the text: The Eastgate Centre uses forty-eight vertical ______ to vent accumulated hot air.",
        correctAnswer: "ventilation chimneys",
        explanation: "Paragraph C mentions: 'forty-eight vertical ventilation chimneys that vent hot air accumulated during the workday.'",
        bandTarget: "Band 7.0",
      },
    ],
  },
  {
    id: "ielts-acad-r2",
    skill: "reading",
    title: "Passage 2: The Cognitive Neuroscience of Bilingualism",
    subtitle: "Executive Function & Neuroplasticity Across the Lifespan",
    duration: 20,
    instructions: "Read Passage 2 and answer Questions 7–12. Choose the correct heading for each paragraph from the list of headings i–vi below.",
    passageTitle: "The Cognitive Neuroscience of Bilingualism",
    passageText: `Paragraph A
For much of the twentieth century, pedagogical orthodoxy in Western educational systems cautioned that raising children with two languages would cause linguistic confusion, delayed speech milestones, and intellectual impairment. Early twentieth-century cognitive studies appeared to corroborate this deficit hypothesis, showing bilingual immigrant children scoring lower on standard English verbal IQ batteries. However, rigorous methodological post-mortems in the 1960s revealed a glaring experimental flaw: researchers had failed to control for socioeconomic status, parental formal education, and English language proficiency at testing, effectively conflating socioeconomic deprivation with bilingual cognitive development.

Paragraph B
A watershed study published in 1962 by Elizabeth Peal and Wallace Lambert at McGill University marked the turning point in psycholinguistics. By comparing French-English bilingual and monolingual Montreal children from matched middle-class backgrounds, Peal and Lambert discovered that bilinguals demonstrated superior mental flexibility, abstract concept formation, and divergent thinking. Rather than suffering from linguistic interference, bilingual children exhibited heightened metalinguistic awareness—an ability to analyze language as an arbitrary, rule-governed symbolic system rather than an innate property of objects themselves.

Paragraph C
Modern neuroimaging modalities, including functional magnetic resonance imaging (fMRI) and magnetoencephalography, have illuminated the anatomical mechanisms underpinning this bilingual advantage. When bilingual individuals communicate in one language, both lexical systems remain perpetually active in the brain. Consequently, the dorsolateral prefrontal cortex and anterior cingulate cortex—the neurological command centres responsible for executive control, attentional switching, and conflict resolution—are constantly engaged in suppressing the non-target language. This chronic neurological workout reorganizes white matter tracts, conferring superior task-switching agility.

Paragraph D
Perhaps the most striking public health implication of bilingualism is its neuroprotective resilience against neurodegenerative pathology. Pioneering epidemiological investigations led by Dr. Ellen Bialystok at York University revealed that lifelong bilingual individuals manifest symptoms of Alzheimer's disease approximately four to five years later than demographically matched monolinguals. Post-mortem cerebral autopsies confirmed that bilingual patients with advanced tau protein tangles and cortical atrophy maintained everyday cognitive functioning comparable to monolinguals with substantially less brain damage, providing robust evidence for cognitive reserve.`,
    questions: [
      {
        id: "ia-r2-1",
        type: "matching-headings",
        prompt: "Which heading best describes Paragraph A?",
        options: [
          "i. Flawed historical assumptions and experimental bias",
          "ii. The discovery of metalinguistic awareness in Montreal",
          "iii. The neurological command centres and white matter density",
          "iv. Cognitive reserve and delayed onset of neurodegeneration",
          "v. Economic disadvantages of single-language school curricula",
          "vi. The chemical composition of tau proteins",
        ],
        correctAnswer: "i. Flawed historical assumptions and experimental bias",
        explanation: "Paragraph A covers historical beliefs that bilingualism caused intellectual impairment and the experimental flaw in early studies failing to control for socioeconomic status.",
        bandTarget: "Band 7.5",
      },
      {
        id: "ia-r2-2",
        type: "matching-headings",
        prompt: "Which heading best describes Paragraph B?",
        options: [
          "i. Flawed historical assumptions and experimental bias",
          "ii. The discovery of metalinguistic awareness in Montreal",
          "iii. The neurological command centres and white matter density",
          "iv. Cognitive reserve and delayed onset of neurodegeneration",
        ],
        correctAnswer: "ii. The discovery of metalinguistic awareness in Montreal",
        explanation: "Paragraph B describes Peal and Lambert's groundbreaking 1962 study in Montreal showing bilingual children's superior mental flexibility and metalinguistic awareness.",
        bandTarget: "Band 7.5",
      },
      {
        id: "ia-r2-3",
        type: "matching-headings",
        prompt: "Which heading best describes Paragraph C?",
        options: [
          "i. Flawed historical assumptions and experimental bias",
          "ii. The discovery of metalinguistic awareness in Montreal",
          "iii. The neurological command centres and white matter density",
          "iv. Cognitive reserve and delayed onset of neurodegeneration",
        ],
        correctAnswer: "iii. The neurological command centres and white matter density",
        explanation: "Paragraph C details the neuroimaging findings, prefrontal cortex engagement, and executive control strengthening.",
        bandTarget: "Band 7.5",
      },
      {
        id: "ia-r2-4",
        type: "matching-headings",
        prompt: "Which heading best describes Paragraph D?",
        options: [
          "i. Flawed historical assumptions and experimental bias",
          "ii. The discovery of metalinguistic awareness in Montreal",
          "iii. The neurological command centres and white matter density",
          "iv. Cognitive reserve and delayed onset of neurodegeneration",
        ],
        correctAnswer: "iv. Cognitive reserve and delayed onset of neurodegeneration",
        explanation: "Paragraph D focuses on Bialystok's research showing bilingualism delays clinical symptoms of Alzheimer's by four to five years via cognitive reserve.",
        bandTarget: "Band 7.5",
      },
      {
        id: "ia-r2-5",
        type: "multiple-choice",
        prompt: "According to Dr. Ellen Bialystok's research, lifelong bilingualism:",
        options: [
          "Prevents the biological accumulation of Alzheimer's tau proteins entirely",
          "Delays the clinical manifestation of Alzheimer's dementia symptoms by 4–5 years",
          "Reverses existing cortical atrophy in senior citizens within twelve months",
        ],
        correctAnswer: "Delays the clinical manifestation of Alzheimer's dementia symptoms by 4–5 years",
        explanation: "Paragraph D states: 'bilingual individuals manifest symptoms of Alzheimer's disease approximately four to five years later than demographically matched monolinguals.'",
        bandTarget: "Band 7.0",
      },
      {
        id: "ia-r2-6",
        type: "sentence-completion",
        prompt: "Complete the sentence. Write NO MORE THAN TWO WORDS from the text: When a bilingual speaks, the non-target language is suppressed by the prefrontal and ______ cortex.",
        correctAnswer: "anterior cingulate",
        explanation: "Paragraph C notes: 'the dorsolateral prefrontal cortex and anterior cingulate cortex... are constantly engaged in suppressing the non-target language.'",
        bandTarget: "Band 8.0",
      },
    ],
  },
];

export const ieltsAcademicWriting: MockWritingTask[] = [
  {
    id: "ia-w1",
    taskNumber: 1,
    type: "chart-description",
    title: "Writing Task 1: Renewable Electricity Generation (2010–2024)",
    instructions: "You should spend about 20 minutes on this task. The line graph below shows the percentage of electricity generated from renewable sources in four European countries between 2010 and 2024. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    suggestedDuration: 20,
    minimumWords: 150,
    visualData: {
      type: "line-chart",
      title: "Share of Renewable Electricity Generation (2010–2024)",
      description: "Percentage of total national electrical output generated by wind, solar, and hydro.",
      xAxisLabel: "Year",
      yAxisLabel: "Share of Generation (%)",
      series: [
        {
          name: "Germany",
          color: "#2563eb",
          values: [
            { x: "2010", y: 17 },
            { x: "2014", y: 27 },
            { x: "2018", y: 38 },
            { x: "2021", y: 44 },
            { x: "2024", y: 56 },
          ],
        },
        {
          name: "United Kingdom",
          color: "#dc2626",
          values: [
            { x: "2010", y: 7 },
            { x: "2014", y: 19 },
            { x: "2018", y: 33 },
            { x: "2021", y: 40 },
            { x: "2024", y: 48 },
          ],
        },
        {
          name: "Spain",
          color: "#ea580c",
          values: [
            { x: "2010", y: 32 },
            { x: "2014", y: 37 },
            { x: "2018", y: 39 },
            { x: "2021", y: 46 },
            { x: "2024", y: 51 },
          ],
        },
        {
          name: "Italy",
          color: "#16a34a",
          values: [
            { x: "2010", y: 22 },
            { x: "2014", y: 33 },
            { x: "2018", y: 34 },
            { x: "2021", y: 36 },
            { x: "2024", y: 39 },
          ],
        },
      ],
    },
    modelAnswer: {
      band: "Band 8.5 / 9.0",
      text: `The line graph compares the proportion of electricity produced from renewable energy sources across four European nations—Germany, the United Kingdom, Spain, and Italy—over a fourteen-year period from 2010 to 2024.

Overall, all four countries witnessed significant growth in their renewable electricity portfolios. Germany and the UK demonstrated the most precipitous upward trajectories, with Germany overtaking Spain to secure the highest renewable share by 2024, whereas Italy experienced the most modest net expansion.

In 2010, Spain was the clear leader, generating approximately 32% of its electricity from renewables, followed by Italy at 22% and Germany at 17%. The UK registered the lowest baseline figure, producing a mere 7%. Over the subsequent fourteen years, the UK experienced dramatic exponential acceleration, quadrupling to reach 33% in 2018 before climbing to 48% by 2024.

Germany exhibited steady, robust gains throughout the period, rising from 17% in 2010 to 38% in 2018, before surging to surpass Spain and finish at 56% in 2024. Spain maintained a steady upward incline to reach 51%, while Italy's growth plateaued around 2014–2018 before concluding at 39%, the lowest of the four nations by the end of the survey.`,
      analysis: "This model answer satisfies all Band 9 criteria: it provides a clear overview paragraph highlighting major trends, groups data logically without listing every point mechanically, uses precise comparative structures ('precipitous upward trajectories', 'quadrupling to reach', 'steady upward incline'), and maintains an objective academic register with zero personal speculation.",
    },
    rubricCriteria: [
      {
        name: "Task Achievement (25%)",
        description: "Presents a clear overview with key trends highlighted and supported by accurate figures from the chart.",
        tips: ["Never omit the overview paragraph", "Do not give reasons or external opinions (e.g. do not mention government policies unless stated in the chart)"],
      },
      {
        name: "Coherence & Cohesion (25%)",
        description: "Logical paragraphing and fluid discourse markers.",
        tips: ["Group data into logical paragraphs (e.g. high performers vs slower growers)", "Use varied linkers: whereas, in contrast, subsequent to"],
      },
      {
        name: "Lexical Resource (25%)",
        description: "Wide range of data-movement vocabulary and collocations.",
        tips: ["Use varied verbs and nouns: surged, climbed, experienced a plateau, upward trajectory"],
      },
      {
        name: "Grammatical Range & Accuracy (25%)",
        description: "Complex sentence structures with error-free prepositional usage.",
        tips: ["Master prepositions: increase BY 20%, rise TO 56%, stand AT 32%"],
      },
    ],
  },
  {
    id: "ia-w2",
    taskNumber: 2,
    type: "discursive-essay",
    title: "Writing Task 2: Aging Population and Socioeconomic Impact",
    instructions: "You should spend about 40 minutes on this task. Write about the following topic:\n\nIn many developed nations, the average age of the population is increasing steadily. Some people believe that an aging population creates insurmountable economic and healthcare problems for governments. Others argue that older citizens contribute significant social and economic value to society.\n\nDiscuss both views and give your own opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.",
    suggestedDuration: 40,
    minimumWords: 250,
    modelAnswer: {
      band: "Band 8.5 / 9.0",
      text: `Demographic shifts toward an older populace have sparked intense political and economic debate across advanced industrialized economies. While critics contend that a graying demographic imposes an unsustainable fiscal burden on healthcare systems and pension funds, proponents argue that senior citizens provide invaluable social capital and economic stability. In this essay, I will examine both perspectives before arguing that while the challenges are undeniable, proactive governance can harness the substantial benefits of an experienced senior cohort.

On the one hand, the fiscal apprehensions associated with demographic aging are legitimate. An escalating dependency ratio—where fewer active workers contribute income taxes to support a burgeoning retired populace—strains state welfare coffers. Furthermore, chronic age-related comorbidities such as cardiovascular disease and cognitive impairment necessitate intensive, long-term medical care, driving up public healthcare expenditures. In nations like Japan and Italy, this dynamic has threatened to compromise municipal budgets and decelerate overall economic productivity.

On the other hand, portraying older generations exclusively as economic liabilities is a reductionist fallacy. Senior citizens contribute immensely to the social fabric through unpaid domestic labor, particularly childcare, which enables younger parents to remain in the active workforce. Moreover, many experienced professionals choose to delay retirement or transition into mentorship roles, transferring tacit institutional knowledge to emerging leaders. Additionally, affluent seniors drive the expanding 'silver economy' in sectors such as tourism, wellness, and cultural enterprises.

In conclusion, although the demographic transition toward an older society undoubtedly necessitates substantial fiscal reforms—such as gradually increasing the statutory retirement age and modernizing preventative healthcare—it does not represent an economic dead end. With forward-thinking social policies, aging populations can enrich communities both culturally and economically.`,
      analysis: "This essay achieves Band 9 by presenting a nuanced, balanced exploration of both viewpoints, formulating a clear and consistent position from the introduction through the conclusion, employing sophisticated academic vocabulary ('insurmountable', 'dependency ratio', 'reductionist fallacy', 'silver economy'), and deploying varied complex syntactical structures without grammatical error.",
    },
    rubricCriteria: [
      {
        name: "Task Response (25%)",
        description: "Addresses all parts of the prompt, presents a well-developed position throughout, and provides extended supporting arguments.",
        tips: ["State your position clearly in the introduction and reaffirm in the conclusion", "Dedicate balanced body paragraphs to both viewpoints before your resolution"],
      },
      {
        name: "Coherence & Cohesion (25%)",
        description: "Clear progression throughout with topic sentences for each body paragraph and sophisticated cohesion.",
        tips: ["Avoid overusing robotic transitions (Firstly, Secondly, Thirdly)", "Ensure clear pronoun referencing and lexical chaining"],
      },
      {
        name: "Lexical Resource (25%)",
        description: "Natural use of less common lexical items and precise collocation.",
        tips: ["Use topic-specific terminology: fiscal burden, dependency ratio, social capital"],
      },
      {
        name: "Grammatical Range & Accuracy (25%)",
        description: "Flexible use of a wide range of complex structures with rare minor errors.",
        tips: ["Incorporate conditional sentences, cleft clauses, and participle phrases"],
      },
    ],
  },
];

export const ieltsAcademicSpeaking: MockSpeakingTask[] = [
  {
    id: "ia-s1",
    partNumber: 1,
    title: "Speaking Part 1: Introduction & Everyday Topics",
    description: "The examiner introduces themselves, verifies your identity, and asks general questions on familiar topics such as home, studies, work, and leisure.",
    preparationTimeSeconds: 0,
    speakingTimeSeconds: 240, // 4 minutes
    prompts: [
      "Let's talk about your hometown. What do you find most interesting about where you grew up?",
      "How has your hometown changed since you were a child?",
      "Let's move on to technology and daily habits. Do you prefer reading digital books or physical paper books? Why?",
      "How often do you listen to podcasts or music during your daily commute?",
    ],
    modelResponse: {
      band: "Band 8.0",
      transcript: "I grew up in Edinburgh, which is fascinating primarily because of its dramatic juxtaposition between the medieval Old Town and the neoclassical Georgian New Town. Since my childhood, the city has become markedly more cosmopolitan, with high-tech software incubators springing up alongside historic landmarks. Regarding reading, while I appreciate the portability of e-readers when travelling, I definitely prefer physical printed books when studying because spatial memory helps me retain complex theoretical frameworks.",
      examinerComment: "Answers are extended naturally without hesitation. Candidate demonstrates excellent topical vocabulary ('juxtaposition', 'cosmopolitan', 'spatial memory') and varied grammar.",
    },
    assessmentRubric: {
      fluency: "Speaks at length without noticeable effort or loss of coherence.",
      lexical: "Uses a wide vocabulary resource readily and flexibly to convey precise meaning.",
      grammar: "Uses a wide range of structures with high accuracy; only rare non-systematic errors.",
      pronunciation: "Uses a full range of phonological features to convey meaning effectively.",
    },
  },
  {
    id: "ia-s2",
    partNumber: 2,
    title: "Speaking Part 2: Individual Long Turn (Cue Card)",
    description: "You will be given a topic card. You have 1 minute to prepare your notes, and then you must speak uninterrupted for 1 to 2 minutes.",
    preparationTimeSeconds: 60,
    speakingTimeSeconds: 120,
    prompts: [
      "Describe a public facility or civic amenity (such as a library, park, or sports complex) that you use regularly.",
      "You should say: where it is located, what facilities and services it offers, how often and with whom you visit it, and explain why you consider this facility important to your community.",
    ],
    followUpQuestion: "Do you think public funding for such facilities should be prioritized over commercial developments?",
    modelResponse: {
      band: "Band 8.5",
      transcript: "I'd like to talk about the Central Botanical Conservatory and Public Gardens located in the heart of my home city. Situated on a former railway terminal site, the facility was repurposed into an urban oasis spanning roughly twenty hectares. It features a climate-controlled Victorian glasshouse showcasing tropical flora, extensive pedestrian walkways, an open-access botanical research library, and an amphitheatre for community music performances. I typically visit early on Saturday mornings with my sister for distance running, and occasionally on weekday afternoons when I need an tranquil environment to review academic literature. What makes this amenity truly indispensable is its role as an equalizer in our urban landscape. In a densely populated metropolis where most residents inhabit compact apartments devoid of private gardens, this space provides barrier-free contact with the natural world, which extensive psychological research proves reduces stress and strengthens communal cohesion.",
      examinerComment: "The candidate structures the 2-minute response systematically, covering every bullet point on the card. Vocabulary is sophisticated ('repurposed', 'barrier-free', 'tranquil', 'equalizer'), with natural rhythm and intonation.",
    },
    assessmentRubric: {
      fluency: "Speaks fluently for the full 2 minutes with coherent topical sequencing.",
      lexical: "Rich academic and descriptive lexicon used effortlessly.",
      grammar: "Complex multi-clause sentences used naturally and error-free.",
      pronunciation: "Clear articulation, natural word stress, and appropriate thought grouping.",
    },
  },
  {
    id: "ia-s3",
    partNumber: 3,
    title: "Speaking Part 3: Two-Way Abstract Discussion",
    description: "The examiner asks broader, more abstract and analytical questions connected to the theme of Part 2 (Public Amenities and Urban Planning).",
    preparationTimeSeconds: 0,
    speakingTimeSeconds: 270, // 4.5 minutes
    prompts: [
      "How do public parks and recreational spaces contribute to the mental and physical well-being of city dwellers?",
      "Some people argue that private companies should be allowed to sponsor or operate municipal parks. What are the potential risks and benefits of commercializing public spaces?",
      "In the design of future 'smart cities', what role do you think civic and green spaces should play compared to commercial and residential infrastructure?",
    ],
    modelResponse: {
      band: "Band 8.5",
      transcript: "From a public health perspective, accessible civic green spaces serve as critical preventative infrastructure. Aside from facilitating cardiovascular exercise, empirical studies demonstrate that regular immersion in natural canopy lowers cortisol levels and mitigates symptoms of anxiety. When considering commercial sponsorship, while corporate capital can undoubtedly fund modern playground equipment and landscaping maintenance, the fundamental hazard is exclusion. If access becomes contingent on purchasing merchandise or if commercial advertising overwhelms the space, the public character and democratic ethos of the park are eroded. In future smart city blueprints, green corridors should not be treated as decorative afterthoughts; rather, they should form the core ecological spine around which high-density transit and housing are organized.",
      examinerComment: "Outstanding analytical depth. The candidate responds with sophisticated discourse markers, abstract conceptual framing ('preventative infrastructure', 'democratic ethos', 'ecological spine'), and immediate fluency.",
    },
    assessmentRubric: {
      fluency: "Expresses complex abstract viewpoints without hesitation.",
      lexical: "Sophisticated vocabulary with rare, near-native idiomatic precision.",
      grammar: "Consistently accurate and nuanced grammatical range.",
      pronunciation: "Expressive intonation and stress highlighting conceptual contrast.",
    },
  },
];

export const IELTS_ACADEMIC_MOCK: MockExam = {
  id: "ielts-academic",
  title: "IELTS Academic — Full Simulation",
  subtitle: "Official British Council / IDP Standard Format",
  description: "Authentic IELTS Academic practice exam featuring all four sub-tests: Listening (with simulated audio stream), Academic Reading (interactive multi-type tasks), Writing (Task 1 line chart with SVG visual + Task 2 250-word essay), and Speaking (interactive timers and model recordings).",
  examType: "ielts-academic",
  totalDuration: 165,
  scoringSystem: "ielts-band",
  listeningSections: ieltsAcademicListening,
  readingSections: ieltsAcademicReading,
  writingTasks: ieltsAcademicWriting,
  speakingTasks: ieltsAcademicSpeaking,
  sections: [...ieltsAcademicListening, ...ieltsAcademicReading],
  passingScore: 65,
};

// ─────────────────────────────────────────────────────────────
// IELTS General Training Mock Exam Dataset
// ─────────────────────────────────────────────────────────────

export const ieltsGeneralReading: MockExamSection[] = [
  {
    id: "ielts-gt-r1",
    skill: "reading",
    title: "Section 1: Social Survival & Daily Notices",
    subtitle: "Community Center Workshops & Public Library Policies",
    duration: 20,
    instructions: "Read the notices below and answer Questions 1–6. For Questions 1–4, choose TRUE, FALSE, or NOT GIVEN.",
    passageTitle: "Community Notices and Public Regulations",
    passageText: `Text 1: Oakridge Community Evening Enrichment Courses
Registration for our Autumn Term begins on Monday, 1st September at 08:30 via the community web portal. Courses fill quickly and early enrolment is advised. Concessionary fee discounts of 25% are available to full-time students, jobseekers, and senior citizens aged 65 or over upon presentation of valid documentation.

1. Digital Photography for Beginners: Tuesdays 19:00–21:00. Course fee: £120 (materials included). Minimum age: 16.
2. Conversational Spanish (Intermediate): Thursdays 18:30–20:30. Course fee: £95. Prerequisite: completed A2 Spanish or equivalent.
3. Woodworking and Furniture Restoration: Saturdays 10:00–13:00. Course fee: £160. Participants must provide their own safety goggles and dust mask.

Text 2: Oakridge Central Library Lending Regulations
Library cardholders may borrow up to fifteen items simultaneously, including books, audiobooks, and sheet music. Standard loans are valid for three weeks. Items may be renewed up to three times online or by telephone, provided another patron has not placed a reservation hold on the title. Overdue items incur a daily late fee of twenty pence per day for adult books and ten pence per day for junior books, capped at a maximum fine of £10 per item.`,
    questions: [
      {
        id: "igt-r1-1",
        type: "true-false-not-given",
        prompt: "A 20-year-old university student is entitled to a 25% fee discount on evening courses.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correctAnswer: "TRUE",
        explanation: "Text 1 states: 'Concessionary fee discounts of 25% are available to full-time students, jobseekers, and senior citizens...'",
        bandTarget: "Band 6.0",
      },
      {
        id: "igt-r1-2",
        type: "true-false-not-given",
        prompt: "Tools and safety goggles are provided free of charge to woodworking participants.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correctAnswer: "FALSE",
        explanation: "Text 1 specifies: 'Participants must provide their own safety goggles and dust mask.'",
        bandTarget: "Band 6.5",
      },
      {
        id: "igt-r1-3",
        type: "true-false-not-given",
        prompt: "Patrons can renew borrowed books even if another reader has reserved them.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correctAnswer: "FALSE",
        explanation: "Text 2 states items can be renewed 'provided another patron has not placed a reservation hold on the title.'",
        bandTarget: "Band 6.5",
      },
      {
        id: "igt-r1-4",
        type: "true-false-not-given",
        prompt: "The library charges a replacement fee if a book is damaged beyond repair.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correctAnswer: "NOT GIVEN",
        explanation: "The text mentions daily late fees, but does NOT mention policies or fee amounts regarding damaged books.",
        bandTarget: "Band 7.0",
      },
      {
        id: "igt-r1-5",
        type: "sentence-completion",
        prompt: "Complete the sentence. Write NO MORE THAN ONE WORD AND/OR A NUMBER: Standard library loans expire after ______ weeks.",
        correctAnswer: "three",
        explanation: "Text 2 states: 'Standard loans are valid for three weeks.'",
        bandTarget: "Band 6.0",
      },
      {
        id: "igt-r1-6",
        type: "sentence-completion",
        prompt: "Complete the sentence. Write NO MORE THAN ONE WORD AND/OR A NUMBER: The maximum overdue fine per item is £______.",
        correctAnswer: "10",
        explanation: "Text 2 explicitly notes: 'capped at a maximum fine of £10 per item.'",
        bandTarget: "Band 6.0",
      },
    ],
  },
  {
    id: "ielts-gt-r2",
    skill: "reading",
    title: "Section 2: Workplace Survival & Corporate Policy",
    subtitle: "Health, Safety & Ergonomics Guidelines for Hybrid Employees",
    duration: 20,
    instructions: "Read the workplace health and safety policy below and answer Questions 7–12.",
    passageTitle: "Corporate Hybrid Workstation Guidelines",
    passageText: `Apex Global Technologies — Remote Workstation Health and Ergonomics Protocol

Section A: Workstation Self-Assessment
Under the Display Screen Equipment (DSE) regulations, all hybrid staff who conduct computer-based work from home for more than two days per working week are mandated to complete a Digital Ergonomic Self-Assessment within thirty calendar days of onboarding. Employees must ensure that their display screen is positioned directly at eye level, roughly an arm's length (50–70 cm) away from the face, to avoid cervical spinal strain.

Section B: Company Equipment Stipend
The organization provides a one-off non-taxable equipment stipend of up to £400 to procure an approved ergonomic task chair, an external monitor, and a height-adjustable laptop riser. In order to claim reimbursement through the HR expense portal, employees must submit itemized receipts accompanied by photographic confirmation that the equipment has been assembled and configured in compliance with safety standards.

Section C: Working Hours and Screen Breaks
To mitigate visual fatigue and musculoskeletal strain, staff should adhere to the '20-20-20 rule': every twenty minutes of sustained screen use, gaze at an object situated at least twenty feet away for a minimum of twenty seconds. In addition, line managers must ensure that employees schedule at least five to ten minutes of non-screen administrative tasks or physical mobility breaks for every continuous hour of keyboard input.

Section D: Incident and Injury Reporting
In the event that an employee experiences persistent discomfort, repetitive strain symptoms, or sustains a physical injury while performing professional duties in their home workspace, they must notify their line manager and lodge an official incident report via the Apex Health Portal within forty-eight hours. Failure to report in a timely manner may invalidate statutory workers' compensation claims.`,
    questions: [
      {
        id: "igt-r2-1",
        type: "multiple-choice",
        prompt: "Within how many days of joining must hybrid employees complete the ergonomic assessment?",
        options: ["14 calendar days", "30 calendar days", "60 calendar days"],
        correctAnswer: "30 calendar days",
        explanation: "Section A specifies: 'within thirty calendar days of onboarding.'",
        bandTarget: "Band 6.0",
      },
      {
        id: "igt-r2-2",
        type: "multiple-choice",
        prompt: "How far should an external display monitor be positioned from the user's face?",
        options: ["Between 20 and 40 cm", "Between 50 and 70 cm", "At least 100 cm"],
        correctAnswer: "Between 50 and 70 cm",
        explanation: "Section A states: 'roughly an arm's length (50–70 cm) away from the face.'",
        bandTarget: "Band 6.0",
      },
      {
        id: "igt-r2-3",
        type: "multiple-choice",
        prompt: "What must employees provide to claim reimbursement for ergonomic furniture?",
        options: [
          "Itemized receipts and a photographic verification of setup",
          "A medical referral note from an occupational therapist",
          "A signed letter of authorization from the corporate finance director",
        ],
        correctAnswer: "Itemized receipts and a photographic verification of setup",
        explanation: "Section B states: 'employees must submit itemized receipts accompanied by photographic confirmation that the equipment has been assembled.'",
        bandTarget: "Band 6.5",
      },
      {
        id: "igt-r2-4",
        type: "multiple-choice",
        prompt: "According to the 20-20-20 rule, employees should look at an object 20 feet away for:",
        options: ["20 minutes", "20 seconds", "2 minutes"],
        correctAnswer: "20 seconds",
        explanation: "Section C details: 'gaze at an object situated at least twenty feet away for a minimum of twenty seconds.'",
        bandTarget: "Band 6.5",
      },
      {
        id: "igt-r2-5",
        type: "multiple-choice",
        prompt: "What is the mandatory deadline for filing an incident report following a work injury?",
        options: ["24 hours", "48 hours", "7 working days"],
        correctAnswer: "48 hours",
        explanation: "Section D explicitly says: 'lodge an official incident report via the Apex Health Portal within forty-eight hours.'",
        bandTarget: "Band 6.5",
      },
      {
        id: "igt-r2-6",
        type: "sentence-completion",
        prompt: "Complete the sentence. Write NO MORE THAN ONE WORD: Employees who fail to report injuries promptly risk invalidating statutory workers' ______ claims.",
        correctAnswer: "compensation",
        explanation: "Section D notes: 'Failure to report in a timely manner may invalidate statutory workers' compensation claims.'",
        bandTarget: "Band 7.0",
      },
    ],
  },
];

export const ieltsGeneralWriting: MockWritingTask[] = [
  {
    id: "igt-w1",
    taskNumber: 1,
    type: "letter",
    title: "Writing Task 1: Formal Letter to Hotel Manager",
    instructions: "You should spend about 20 minutes on this task.\n\nYou recently stayed at a hotel while attending an international business conference. When you returned home, you discovered that you had left an important personal item in your hotel room.\n\nWrite a letter to the hotel manager. In your letter:\n- State when and why you stayed at the hotel\n- Describe the item you left behind and where in the room it is likely to be\n- Suggest how the hotel can safely return the item to you\n\nWrite at least 150 words. You do NOT need to write any postal addresses. Begin your letter as follows: Dear Sir or Madam,",
    suggestedDuration: 20,
    minimumWords: 150,
    modelAnswer: {
      band: "Band 8.5 / 9.0",
      text: `Dear Sir or Madam,

I am writing to inquire about an important personal possession that I inadvertently left behind in my room following a recent stay at your establishment.

I was a guest at the Grand Heritage Hotel between the 14th and 18th of October while attending the European Renewable Energy Summit (booking reference: GH-49210), staying in Room 412 on the executive fourth floor.

The item in question is a dark brown leather document folder containing several client contracts and my university degree certificates. It has gold metallic corner protectors and my initials 'J.M.' embossed on the lower front cover. I believe I placed it on the upper shelf of the fitted wardrobe next to the digital room safe just prior to checking out on Friday morning.

I would be exceedingly grateful if your housekeeping department could inspect Room 412 or the lost property registry. If the folder is located, please contact me immediately at j.miller@email.com. I will happily arrange and pay for an express courier service such as DHL to collect the package directly from your reception desk at your earliest convenience.

Thank you in advance for your assistance and prompt attention to this urgent matter.

Yours faithfully,

Jonathan Miller`,
      analysis: "This letter exemplifies Band 9 criteria for General Training Task 1. The tone is consistently formal and polite ('inadvertently left behind', 'exceedingly grateful', 'prompt attention'). Every bullet point from the prompt is thoroughly addressed with realistic circumstantial details, and the conventional closing salutation matches 'Dear Sir or Madam' with 'Yours faithfully'.",
    },
    rubricCriteria: [
      {
        name: "Task Achievement (25%)",
        description: "Covers all three bullet points with sufficient extension and appropriate formal register.",
        tips: ["Address every bullet point thoroughly", "Maintain consistent formality from start to finish"],
      },
      {
        name: "Coherence & Cohesion (25%)",
        description: "Logical paragraphing with clear separation of purpose, item details, and return request.",
        tips: ["Use one paragraph per bullet point", "Use natural formal discourse connectors"],
      },
      {
        name: "Lexical Resource (25%)",
        description: "Accurate, formal vocabulary suited to business correspondence.",
        tips: ["Use terms like 'inadvertently left', 'in question', 'at your earliest convenience'"],
      },
      {
        name: "Grammatical Range & Accuracy (25%)",
        description: "Flawless sentence syntax and polite conditional modals.",
        tips: ["Use polite modal structures: 'I would be grateful if you could...'"],
      },
    ],
  },
  {
    id: "igt-w2",
    taskNumber: 2,
    type: "discursive-essay",
    title: "Writing Task 2: Online Shopping vs High Street Commerce",
    instructions: "You should spend about 40 minutes on this task. Write about the following topic:\n\nMany consumers now prefer to purchase goods online rather than visit brick-and-mortar high street shops. While this shift brings undeniable consumer convenience, some people believe that the decline of local retail stores is harmful to local communities and economies.\n\nDiscuss both views and give your own opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.",
    suggestedDuration: 40,
    minimumWords: 250,
    modelAnswer: {
      band: "Band 8.5 / 9.0",
      text: `The pervasive ascendancy of e-commerce has fundamentally reshaped retail habits over the past two decades. While millions of consumers celebrate the unmatched convenience and price competitiveness of online marketplaces, community advocates warn that the hollowed-out high street threatens social cohesion and localized economic vitality. In this essay, I will consider both sides of this development before presenting my own view that while digital commerce is irreversible, town centres must reinvent themselves to survive.

Proponents of e-commerce point to overwhelming consumer benefits. Digital platforms allow individuals to compare prices, browse global inventories, and receive home deliveries with a single keystroke. For working parents, the elderly, or rural residents who lack access to extensive urban shopping centres, online retail saves substantial time and fuel costs. Furthermore, algorithmic logistics and reduced overheads enable companies to offer lower consumer prices, dampening household inflationary pressure.

Conversely, the erosion of physical retail stores incurs steep socioeconomic costs. High streets have traditionally served as vital communal hubs where citizens interact, fostering neighborhood familiarity and trust. When small, family-owned boutiques shutter, towns lose unique cultural character, and low-skilled employment opportunities disappear. Moreover, abandoned storefronts induce urban decay, deterring tourism and diminishing local property tax revenues that fund public services like schools and libraries.

In my perspective, the shift towards online retail cannot and should not be forcibly reversed; convenience will always triumph in a market economy. However, local councils must assist high streets in transitioning from pure transactional commodity spaces into social, experiential destinations—such as pedestrianized cultural quarters, artisanal markets, and dining spaces. By doing so, communities can preserve social vibrancy while still reaping the logistical efficiencies of digital commerce.`,
      analysis: "This essay fully satisfies Band 9 descriptors for IELTS General Training Task 2. It demonstrates clear progression, deep paragraph development, sophisticated vocabulary ('pervasive ascendancy', 'hollowed-out high street', 'transactional commodity spaces'), and error-free complex grammar.",
    },
    rubricCriteria: [
      {
        name: "Task Response (25%)",
        description: "Fully develops both perspectives and presents a clear, nuanced personal conclusion.",
        tips: ["Do not simply agree with one side without examining the merits of the other"],
      },
      {
        name: "Coherence & Cohesion (25%)",
        description: "Clear thematic flow and paragraph topic sentences.",
        tips: ["Ensure each body paragraph begins with a clear unifying focus"],
      },
      {
        name: "Lexical Resource (25%)",
        description: "Broad and natural vocabulary with high-level collocation.",
        tips: ["Demonstrate vocabulary tailored to economics and urbanization"],
      },
      {
        name: "Grammatical Range & Accuracy (25%)",
        description: "Full range of complex sentence structures used with flexibility.",
        tips: ["Use parallel structures, relative clauses, and concession markers"],
      },
    ],
  },
];

export const IELTS_GENERAL_MOCK: MockExam = {
  id: "ielts-general",
  title: "IELTS General Training — Full Simulation",
  subtitle: "Official British Council / IDP Standard Format",
  description: "Authentic IELTS General Training practice exam tailored for immigration and international workplace certification. Covers Listening (shared standard with Academic), General Training Reading (practical notices & workplace manuals), General Training Writing (formal letter + essay), and Speaking.",
  examType: "ielts-general",
  totalDuration: 165,
  scoringSystem: "ielts-band",
  listeningSections: ieltsAcademicListening, // Listening is standard across both IELTS tracks
  readingSections: ieltsGeneralReading,
  writingTasks: ieltsGeneralWriting,
  speakingTasks: ieltsAcademicSpeaking,
  sections: [...ieltsAcademicListening, ...ieltsGeneralReading],
  passingScore: 65,
};

// ─────────────────────────────────────────────────────────────
// TOEFL iBT Mock Exam Dataset (Official 2026 Format, 1.0–6.0 Scale)
// ─────────────────────────────────────────────────────────────

export const toeflReadingSections: MockExamSection[] = [
  {
    id: "toefl-read-1",
    skill: "reading",
    title: "Reading — Part 1: Complete the Words",
    subtitle: "Lexical & Grammatical Automaticity Task (2026 Format)",
    duration: 10,
    instructions: "Read the academic passage below. Several words have missing letters. Complete each word by typing the correct missing letters. In this new 2026 task, you must demonstrate vocabulary knowledge and syntactical understanding in context.",
    passageTitle: "Cellular Senescence and Telomere Biology",
    passageText: "At the ends of eukaryotic chromosomes lie specialized nucleoprotein structures known as telomeres. During each cycle of DNA replication, conventional polymerases are unable to fully copy the extreme terminal ends of the lagging strand. Consequently, telomeres undergo progressive short______ with every cellular divi______. When telomeres reach a critical minimum threshold, the cell triggers a sustained DNA damage response that halts further proliferation, entering a metabolic state termed cellular senes______. While this mechanism evolved as a potent pro______ against malignant tumor formation, the accumulation of senescent cells in aging tissues contributes to chronic low-grade inflam______.",
    questions: [
      {
        id: "toefl-cw-1",
        type: "complete-the-words",
        prompt: "Complete the word: 'progressive short______'",
        prefix: "short",
        suffix: "ening",
        fullWord: "shortening",
        correctAnswer: "ening",
        explanation: "The noun form describing reduction in length over time is 'shortening'.",
        bandTarget: "TOEFL 5.0",
      },
      {
        id: "toefl-cw-2",
        type: "complete-the-words",
        prompt: "Complete the word: 'every cellular divi______'",
        prefix: "divi",
        suffix: "sion",
        fullWord: "division",
        correctAnswer: "sion",
        explanation: "The biological process of cell multiplication is 'cellular division'.",
        bandTarget: "TOEFL 4.5",
      },
      {
        id: "toefl-cw-3",
        type: "complete-the-words",
        prompt: "Complete the word: 'cellular senes______'",
        prefix: "senes",
        suffix: "cence",
        fullWord: "senescence",
        correctAnswer: "cence",
        explanation: "The scientific term for permanent cell cycle arrest is 'senescence'.",
        bandTarget: "TOEFL 5.5",
      },
      {
        id: "toefl-cw-4",
        type: "complete-the-words",
        prompt: "Complete the word: 'a potent pro______ against tumor formation'",
        prefix: "pro",
        suffix: "tection",
        fullWord: "protection",
        correctAnswer: "tection",
        explanation: "In this context, the mechanism acts as a defense or 'protection'.",
        bandTarget: "TOEFL 4.5",
      },
      {
        id: "toefl-cw-5",
        type: "complete-the-words",
        prompt: "Complete the word: 'chronic low-grade inflam______'",
        prefix: "inflam",
        suffix: "mation",
        fullWord: "inflammation",
        correctAnswer: "mation",
        explanation: "The physiological tissue response is 'inflammation'.",
        bandTarget: "TOEFL 5.0",
      },
    ],
  },
  {
    id: "toefl-read-2",
    skill: "reading",
    title: "Reading — Part 2: Academic Passage & Analysis",
    subtitle: "Megafaunal Extinction and Pleistocene Overkill",
    duration: 18,
    instructions: "Read the passage and answer the questions based on what is stated or directly implied. Choose the best answer A, B, C, or D.",
    passageTitle: "The Quaternary Megafaunal Extinctions",
    passageText: `Paragraph 1
At the close of the Pleistocene epoch, approximately 12,000 to 10,000 years ago, more than half of all terrestrial mammal species weighing over 44 kilograms vanished from the globe. In the Americas and Australia, the scale of this megafaunal collapse was cataclysmic: mammoth, mastodons, sabre-toothed cats, and giant ground sloths disappeared in a geologically instantaneous window. For over half a century, paleontologists have vigorously debated whether this extinction wave was catalyzed by abrupt climatic instability during the Younger Dryas cold event or driven by human hunting pressure—the controversial 'overkill hypothesis' proposed by Paul Martin.

Paragraph 2
Advocates of the overkill hypothesis point to the striking chronological synchrony between human migration into pristine ecological niches and the subsequent collapse of naive large fauna. In Australia, archaeological dating confirms that the extinction of giant marsupials occurred within several millennia of the arrival of Homo sapiens around 50,000 years ago. Having evolved in isolation without ancestral hominin predators, these megaherbivores lacked innate behavioral fear responses, rendering them extraordinarily vulnerable to coordinated hunting and anthropogenic landscape burning.

Paragraph 3
Conversely, skeptics of the overkill model emphasize glaring empirical inconsistencies in the fossil record. Of the dozens of extinct North American megafauna genera, only mammoths and mastodons demonstrate unambiguous kill-site butchery associations with Clovis fluted stone projectile points. Moreover, climatic shifts during the Pleistocene-Holocene transition triggered profound habitat fragmentation and floral turnover, which may have reduced the nutritional carrying capacity of rangelands below survival thresholds. Recent syntheses suggest that human predation and environmental stress operated in synergy, delivering a lethal one-two punch to already vulnerable populations.`,
    questions: [
      {
        id: "toefl-r2-1",
        type: "multiple-choice",
        prompt: "According to Paragraph 1, why is the timing of the megafaunal extinction notable?",
        options: [
          "It occurred over a span of several million years.",
          "It took place in a remarkably brief geological timeframe.",
          "It coincided with the emergence of the first photosynthetic plants.",
          "It affected aquatic organisms far more severely than land mammals.",
        ],
        correctAnswer: "It took place in a remarkably brief geological timeframe.",
        explanation: "Paragraph 1 notes that species 'disappeared in a geologically instantaneous window.'",
        bandTarget: "TOEFL 5.0",
      },
      {
        id: "toefl-r2-2",
        type: "multiple-choice",
        prompt: "The word 'pristine' in Paragraph 2 is closest in meaning to:",
        options: ["undisturbed", "inhospitable", "arid", "hazardous"],
        correctAnswer: "undisturbed",
        explanation: "'Pristine' describes environments untouched or unaltered by prior human activity.",
        bandTarget: "TOEFL 5.0",
      },
      {
        id: "toefl-r2-3",
        type: "multiple-choice",
        prompt: "Why were Australian megaherbivores particularly vulnerable to early human hunters?",
        options: [
          "They suffered from widespread viral infections.",
          "They lacked evolved instinctual fear of hominin predators.",
          "Their eyesight was poorly suited to open savannah terrain.",
          "They were already extinct prior to human arrival.",
        ],
        correctAnswer: "They lacked evolved instinctual fear of hominin predators.",
        explanation: "Paragraph 2 states: 'Having evolved in isolation without ancestral hominin predators, these megaherbivores lacked innate behavioral fear responses.'",
        bandTarget: "TOEFL 5.0",
      },
      {
        id: "toefl-r2-4",
        type: "multiple-choice",
        prompt: "Which of the following does Paragraph 3 mention as evidence CHALLENGING the overkill model?",
        options: [
          "Humans in North America were strictly vegetarian gatherers.",
          "Very few extinct genera show physical butchery marks from Clovis hunters.",
          "Radiocarbon dating has proved that mammoths survived in Florida until modern times.",
          "The Younger Dryas caused global sea levels to rise catastrophically.",
        ],
        correctAnswer: "Very few extinct genera show physical butchery marks from Clovis hunters.",
        explanation: "Paragraph 3 notes: 'Of the dozens of extinct North American megafauna genera, only mammoths and mastodons demonstrate unambiguous kill-site butchery associations.'",
        bandTarget: "TOEFL 5.5",
      },
      {
        id: "toefl-r2-5",
        type: "multiple-choice",
        prompt: "What conclusion does the author reach regarding the cause of the extinctions?",
        options: [
          "Paul Martin's overkill hypothesis has been definitively disproved.",
          "A synergistic combination of climate shifts and hunting pressure was responsible.",
          "Extraterrestrial impact was the solitary trigger of the event.",
          "Human landscape burning had no measurable impact on habitat viability.",
        ],
        correctAnswer: "A synergistic combination of climate shifts and hunting pressure was responsible.",
        explanation: "Paragraph 3 concludes: 'human predation and environmental stress operated in synergy, delivering a lethal one-two punch to already vulnerable populations.'",
        bandTarget: "TOEFL 5.5",
      },
    ],
  },
];

export const toeflListeningSections: MockExamSection[] = [
  {
    id: "toefl-list-1",
    skill: "listening",
    title: "Listening — Part 1: Campus Conversation",
    subtitle: "Professor Office Hours Consultation on Research Methodology",
    duration: 8,
    instructions: "Listen to a conversation between a student and a sociology professor. Answer questions 1–4. The audio plays automatically.",
    audioScript: "Come on in, Marcus. Take a seat. How is your senior thesis proposal coming along? Thanks, Professor Vance. I've drafted my literature review on urban gentrification, but I'm running into methodological roadblocks regarding data collection. I initially planned to conduct in-person semi-structured interviews with thirty local small business owners across the historic market district. But after spending three days conducting preliminary site visits, nearly half of the merchants declined because they simply don't have twenty minutes to spare during retail operating hours. That is a classic dilemma in qualitative urban research, Marcus. In empirical field studies, access and rapport are everything. Trying to conduct cold interviews during peak foot-traffic hours rarely yields rich qualitative insights. Have you considered triangulating your method with digital asynchronous questionnaires or attending the upcoming merchant association monthly meeting? The president of the Downtown Business Alliance invited our department to present student research. If you attend with a short endorsement from me, merchants will recognize you as a vetted researcher rather than an unwelcome interruption. That would be incredible, Professor Vance. When is their next gathering? Next Tuesday evening at 6:30 PM at the municipal library hall.",
    speakerAccents: ["North American (Professor Vance)", "North American (Marcus)"],
    questions: [
      {
        id: "toefl-l1-1",
        type: "multiple-choice",
        prompt: "Why did the student visit the professor during office hours?",
        options: [
          "To request an extension on his literature review deadline",
          "To discuss difficulties encountered in interviewing business owners",
          "To complain about the grading of his previous sociology midterm",
          "To apply for a paid research assistantship in the department",
        ],
        correctAnswer: "To discuss difficulties encountered in interviewing business owners",
        explanation: "Marcus explains that he is running into methodological roadblocks because merchants decline interviews during busy business hours.",
        bandTarget: "TOEFL 4.5",
      },
      {
        id: "toefl-l1-2",
        type: "multiple-choice",
        prompt: "According to the professor, what was the primary flaw in the student's initial approach?",
        options: [
          "His interview questions were too intrusive and personal.",
          "He attempted cold interviews during peak retail operating hours.",
          "He failed to provide monetary compensation to interviewees.",
          "His sample size of thirty merchants was statistically invalid.",
        ],
        correctAnswer: "He attempted cold interviews during peak retail operating hours.",
        explanation: "Professor Vance points out: 'Trying to conduct cold interviews during peak foot-traffic hours rarely yields rich qualitative insights.'",
        bandTarget: "TOEFL 5.0",
      },
      {
        id: "toefl-l1-3",
        type: "multiple-choice",
        prompt: "What solution does the professor recommend?",
        options: [
          "Switching his thesis topic to online digital e-commerce businesses",
          "Attending the upcoming merchant association meeting with a departmental endorsement",
          "Paying a professional market research firm to gather survey data",
          "Conducting anonymous phone calls after business hours",
        ],
        correctAnswer: "Attending the upcoming merchant association meeting with a departmental endorsement",
        explanation: "She advises him to attend the Downtown Business Alliance meeting so merchants recognize him as a vetted researcher.",
        bandTarget: "TOEFL 5.0",
      },
      {
        id: "toefl-l1-4",
        type: "multiple-choice",
        prompt: "When and where does the merchant association meeting take place?",
        options: [
          "Next Tuesday at 6:30 PM at the municipal library hall",
          "Tomorrow morning at 9:00 AM at the university campus center",
          "Friday afternoon at 4:00 PM at the city hall auditorium",
          "Next Thursday evening at 7:00 PM at the student union",
        ],
        correctAnswer: "Next Tuesday at 6:30 PM at the municipal library hall",
        explanation: "Professor Vance confirms: 'Next Tuesday evening at 6:30 PM at the municipal library hall.'",
        bandTarget: "TOEFL 4.5",
      },
    ],
  },
  {
    id: "toefl-list-2",
    skill: "listening",
    title: "Listening — Part 2: Academic Lecture",
    subtitle: "Marine Biology: Bioluminescent Communication in the Deep Ocean",
    duration: 10,
    instructions: "Listen to an excerpt from a marine biology lecture. Answer questions 5–8 based on the speaker's arguments.",
    audioScript: "Good afternoon, class. Today we are descending into the bathypelagic zone—the ocean layer between one thousand and four thousand metres below the surface. In this perpetual darkness, sunlight is completely extinguished. Yet, if you peer through the viewport of a deep-sea submersible, the abyss sparkles with living light. Approximately ninety percent of deep-sea organisms are bioluminescent. Now, chemiluminescence in marine organisms is catalyzed by a family of enzymes called luciferases acting upon a light-emitting pigment substrate known as luciferin. In the presence of dissolved oxygen, this chemical reaction produces cold light with virtually zero waste heat. But why expend precious metabolic energy generating light in the dark? Marine biologists classify bioluminescent adaptations into three functional categories: predation, defensive counter-illumination, and intra-species signaling. Take the anglerfish: it features an extended dorsal spine tipped with a glowing photophore filled with symbiotic bioluminescent bacteria. It dangles this luminous lure right above its jaws to attract unsuspecting prey. Conversely, many mesopelagic squids and lanternfishes employ counter-illumination: photophores on their ventral underbellies emit a dim blue glow that perfectly matches the downwelling ambient moonlight filtering from above, effectively erasing their silhouette from predators lurking beneath them.",
    speakerAccents: ["North American (Professor)"],
    questions: [
      {
        id: "toefl-l2-1",
        type: "multiple-choice",
        prompt: "What chemical components are responsible for generating bioluminescence?",
        options: [
          "Chlorophyll pigments activated by thermal heat",
          "Luciferase enzymes reacting with luciferin in the presence of oxygen",
          "Calcium phosphate deposits reacting with deep-sea methane hydrates",
          "Reflective guanine crystals embedded in scales",
        ],
        correctAnswer: "Luciferase enzymes reacting with luciferin in the presence of oxygen",
        explanation: "The lecturer explains: 'chemiluminescence in marine organisms is catalyzed by a family of enzymes called luciferases acting upon a light-emitting pigment substrate known as luciferin.'",
        bandTarget: "TOEFL 5.0",
      },
      {
        id: "toefl-l2-2",
        type: "multiple-choice",
        prompt: "Why is bioluminescence referred to as 'cold light'?",
        options: [
          "It can only occur in temperatures below freezing.",
          "The chemical reaction releases virtually zero thermal waste energy.",
          "The emitted photons have a freezing effect on surrounding seawater.",
          "It is exclusively observed in Arctic and Antarctic oceans.",
        ],
        correctAnswer: "The chemical reaction releases virtually zero thermal waste energy.",
        explanation: "The professor states: 'this chemical reaction produces cold light with virtually zero waste heat.'",
        bandTarget: "TOEFL 5.0",
      },
      {
        id: "toefl-l2-3",
        type: "multiple-choice",
        prompt: "How does the anglerfish utilize bioluminescence?",
        options: [
          "To illuminate deep ocean trenches for navigation",
          "To camouflage its belly against surface moonlight",
          "To lure unsuspecting prey toward its jaws with a glowing photophore",
          "To send warning signals to competitive males",
        ],
        correctAnswer: "To lure unsuspecting prey toward its jaws with a glowing photophore",
        explanation: "The lecture states that the anglerfish 'dangles this luminous lure right above its jaws to attract unsuspecting prey.'",
        bandTarget: "TOEFL 4.5",
      },
      {
        id: "toefl-l2-4",
        type: "multiple-choice",
        prompt: "What is the purpose of 'counter-illumination' in squids and lanternfishes?",
        options: [
          "To disguise their silhouette from predators looking upward",
          "To warm their core bodily organs in frigid currents",
          "To communicate intricate mating coordinates across vast ocean distances",
          "To blind aggressive predatory sharks temporarily",
        ],
        correctAnswer: "To disguise their silhouette from predators looking upward",
        explanation: "The professor explains that photophores emit a dim glow matching downwelling light, 'effectively erasing their silhouette from predators lurking beneath them.'",
        bandTarget: "TOEFL 5.5",
      },
    ],
  },
];

export const toeflWritingTasks: MockWritingTask[] = [
  {
    id: "toefl-w1",
    taskNumber: 1,
    type: "toefl-email",
    title: "Writing Task 1: Academic Campus Email",
    instructions: "You should spend about 10 minutes on this task. Read the scenario below and compose an email to your professor.\n\nYou have an important laboratory examination scheduled for Friday morning, but your university debate team has just qualified for the National Championship finals taking place in Chicago on the same weekend. Write an email to your biology professor, Dr. Alvarez.\n\nIn your email:\n- Explain the conflicting university commitment\n- Request permission to sit the lab exam at an alternative date or time\n- Suggest specific options for when you could complete the exam without disrupting the lab schedule\n\nWrite at least 80–120 words in an appropriate academic register.",
    suggestedDuration: 10,
    minimumWords: 80,
    modelAnswer: {
      band: "Band 5.5 / 6.0 (ETS)",
      text: `Dear Dr. Alvarez,

I hope you are having a productive week. I am writing to respectfully request permission to reschedule my Friday Bio 204 laboratory examination.

Our university debate team has just advanced to the National Championship finals in Chicago, which requires our team to travel on Friday morning. Representing the university at this tournament is a significant academic honor, but I remain fully committed to my coursework in your laboratory.

Would it be possible for me to sit the laboratory exam on Thursday afternoon during your scheduled office hours, or alternatively, early next Monday morning before regular classes resume? I am willing to accommodate whichever arrangement best suits your timetable and does not create additional burden for the laboratory teaching assistants.

Thank you very much for your understanding and continuous support.

Sincerely,

Claire Chen
Student ID: BIO-9302`,
      analysis: "This email exemplifies top-tier performance on the 1–6 ETS scale. It maintains a respectful, formal tone, clearly explains the conflict without sounding entitled, provides two viable alternative dates, and uses concise, professional phrasing.",
    },
    rubricCriteria: [
      {
        name: "Communicative Competence (33%)",
        description: "Achieves communicative goal with appropriate politeness conventions and academic etiquette.",
        tips: ["State your purpose in the first two sentences", "Adopt a cooperative, accommodating stance"],
      },
      {
        name: "Lexical & Syntactic Precision (33%)",
        description: "Precise phrasing with accurate prepositions and formal verb phrases.",
        tips: ["Use phrases like 'respectfully request', 'accommodate whichever arrangement'"],
      },
      {
        name: "Coherence & Organization (34%)",
        description: "Clear logical structure with distinct paragraph divisions for context, request, and options.",
        tips: ["Ensure alternative options are explicitly stated"],
      },
    ],
  },
  {
    id: "toefl-w2",
    taskNumber: 2,
    type: "toefl-academic-discussion",
    title: "Writing Task 2: Academic Discussion (2026 Core Task)",
    instructions: "You should spend about 10 minutes on this task. Your professor has posted a question on an online course discussion board. Two students have responded. Read the question and their comments, then write a response contributing to the discussion.\n\nIn your response, you should:\n- Express and support your personal opinion\n- Contribute to the discussion in your own words\n- Address the points raised by the other students\n\nWrite at least 100 words.",
    suggestedDuration: 10,
    minimumWords: 100,
    discussionPrompt: {
      professor: {
        name: "Dr. Jessica Diaz",
        title: "Professor of Economics & Public Policy",
        prompt: "This week we are examining the role of governmental regulation in digital technology markets. Some economists argue that governments should implement strict price caps and antitrust breakups on giant tech monopolistic platforms to protect consumer choice and prevent predatory pricing. Others assert that heavy regulatory intervention stifles technological innovation and that markets are self-correcting through disruptive entrepreneurship. What is your perspective on this issue?",
      },
      students: [
        {
          name: "Paul",
          avatar: "👨‍💻",
          response: "I strongly believe robust antitrust regulation is overdue. Mega tech conglomerates routinely acquire promising startups solely to extinguish potential competition before it matures. Without regulatory oversight, these monopolies control digital public squares, dictate data monetization policies, and trap consumers in closed ecosystems with no viable alternatives.",
        },
        {
          name: "Kelly",
          avatar: "👩‍🔬",
          response: "While Paul makes a fair point about market concentration, I disagree that government price controls and breakups are the optimal remedy. Tech giants invest tens of billions annually into fundamental research and development—advances in quantum computing and generative AI that small firms simply could not finance. Overzealous regulation risks killing the goose that lays the golden egg.",
        },
      ],
    },
    modelAnswer: {
      band: "Band 6.0 (ETS 2026 Scale)",
      text: `Both Paul and Kelly raise compelling arguments regarding the regulation of technology conglomerates. While I concede Kelly's point that immense capital reserves enable tech giants to fund unprecedented research in fields like artificial intelligence, I align more closely with Paul's view that unconstrained market concentration poses systemic perils.

In my perspective, the most critical intervention is not necessarily heavy-handed price fixing, but rather mandating data portability and interoperability. Currently, tech monopolies maintain insurmountable network effects because users cannot transfer their social graphs or purchased ecosystems to alternative platforms. By legally enforcing open application programming interfaces (APIs), regulatory bodies can empower innovative startups to compete on merit without dismantling the research divisions of established leaders. Thus, smart, targeted regulation can preserve innovation while dismantling anti-competitive moats.`,
      analysis: "This response achieves Band 6.0 on the 2026 TOEFL iBT scale. It synthesizes both peer viewpoints, introduces an original, well-reasoned policy compromise (interoperability and data portability), uses sophisticated economic vocabulary ('network effects', 'unprecedented research', 'anti-competitive moats'), and surpasses the 100-word threshold within the 10-minute constraint.",
    },
    rubricCriteria: [
      {
        name: "Relevance & Idea Development (33%)",
        description: "Engages with the ongoing academic discussion, acknowledging peer arguments while introducing original, well-substantiated analysis.",
        tips: ["Refer to at least one peer by name (e.g. 'While I understand Kelly's point...')", "Introduce your own distinct insight or synthesized solution"],
      },
      {
        name: "Syntactic Complexity & Facility (33%)",
        description: "Deploys sophisticated sentence structures with natural transitions and clause subordination.",
        tips: ["Use concessive clauses: 'While I concede that..., I nevertheless maintain that...'"],
      },
      {
        name: "Lexical Sophistication (34%)",
        description: "Uses nuanced academic and topic-appropriate terminology.",
        tips: ["Employ precise academic verbs: delineate, synthesize, undermine, foster"],
      },
    ],
  },
];

export const toeflSpeakingTasks: MockSpeakingTask[] = [
  {
    id: "toefl-s1",
    partNumber: 1,
    title: "Speaking Task 1: Listen & Repeat / Phonological Accuracy",
    description: "Listen to the sentence spoken aloud. Repeat the sentence into your microphone as accurately and naturally as possible. This evaluates pronunciation, syllable stress, and speech rhythm.",
    preparationTimeSeconds: 5,
    speakingTimeSeconds: 15,
    prompts: [
      "The university administration has decided to renovate the historic science quadrangle over the summer recess.",
      "Empirical research demonstrates that intermittent cognitive pauses significantly improve memory consolidation.",
      "Technological breakthroughs in green hydrogen storage could accelerate the decarbonization of heavy transport.",
    ],
    modelResponse: {
      band: "Band 5.5 / 6.0",
      transcript: "The university administration has decided to renovate the historic science quadrangle over the summer recess.",
      examinerComment: "Natural connected speech with accurate stress on 'administration', 'renovate', 'quadrangle', and fluent vowel reduction in unstressed syllables.",
    },
    assessmentRubric: {
      fluency: "Immediate speech delivery without hesitation or stumbles.",
      lexical: "Accurate reproduction of all lexical tokens.",
      grammar: "Exact preservation of grammatical structure.",
      pronunciation: "Precise phonemic accuracy and appropriate rhythmic cadence.",
    },
  },
  {
    id: "toefl-s2",
    partNumber: 2,
    title: "Speaking Task 2: Take an Interview / Campus Discussion",
    description: "You will participate in a simulated campus interview. You will hear a question about student life or academic policy. You have 20 seconds to prepare and 45 seconds to record your response.",
    preparationTimeSeconds: 20,
    speakingTimeSeconds: 45,
    prompts: [
      "The campus housing committee is proposing that all first-year undergraduate students be required to live in university residence halls rather than in off-campus private apartments. Do you think this is a beneficial policy? Explain why or why not with specific reasons.",
    ],
    modelResponse: {
      band: "Band 5.5 / 6.0",
      transcript: "In my opinion, requiring all first-year undergraduates to reside on campus is a highly beneficial policy. Primarily, the transition from high school to university can be socially disorienting. Living in residence halls fosters immediate peer networks and facilitates access to academic tutoring and campus mental health resources. Furthermore, off-campus leasing often involves unexpected utility costs and stressful landlord negotiations that first-year students are ill-equipped to manage. On-campus living provides a structured, safe bridge to independence.",
      examinerComment: "The response is delivered within 42 seconds with clear topic sentences, persuasive supporting rationales ('socially disorienting', 'structured bridge to independence'), and natural intonation.",
    },
    assessmentRubric: {
      fluency: "Sustained, fluid delivery throughout the 45-second duration.",
      lexical: "Appropriate collegiate and explanatory vocabulary.",
      grammar: "Accurate complex conditionals and causative structures.",
      pronunciation: "Clear vowel articulation and effective emphasis on key contrast words.",
    },
  },
];

export const TOEFL_IBT_MOCK: MockExam = {
  id: "toefl-ibt",
  title: "TOEFL iBT® — Official 2026 Simulation",
  subtitle: "New 1.0–6.0 CEFR Scoring Scale with Concordance",
  description: "Comprehensive simulation of the revised 2026 TOEFL iBT exam format. Features: Part 1 Complete the Words & Academic Passages, Part 2 Interactive Campus & Lecture Listening, Part 3 Campus Email & Academic Discussion writing tasks, and Part 4 Listen-Repeat & Campus Interview speaking stations. Dual-scored on the new 1–6 band and concordant 0–120 scale.",
  examType: "toefl-ibt",
  totalDuration: 120,
  scoringSystem: "toefl-score",
  listeningSections: toeflListeningSections,
  readingSections: toeflReadingSections,
  writingTasks: toeflWritingTasks,
  speakingTasks: toeflSpeakingTasks,
  sections: [...toeflListeningSections, ...toeflReadingSections],
  passingScore: 60,
};

// ─────────────────────────────────────────────────────────────
// Master Registry and Default Exports
// ─────────────────────────────────────────────────────────────

export const ALL_MOCK_EXAMS: Record<ExamType, MockExam> = {
  "ielts-academic": IELTS_ACADEMIC_MOCK,
  "ielts-general": IELTS_GENERAL_MOCK,
  "toefl-ibt": TOEFL_IBT_MOCK,
};

export const IELTS_MOCK = IELTS_ACADEMIC_MOCK;
export const TOEFL_MOCK = TOEFL_IBT_MOCK;
export const MOCK_EXAM = IELTS_ACADEMIC_MOCK;
