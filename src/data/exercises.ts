import type { Exercise } from "./types";

export const exercises: Exercise[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // Band 4–5 (Foundation)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Cambridge B2 First: Use of English & Transformations ────────────────────
  {
    id: "ex-band1-ielts-intro-1", lessonId: "band1-ielts-intro", type: "fill-blank",
    prompt: "Complete the B2 Key Word Transformation (2 to 5 words): 'It's too cold to go swimming today.' (ENOUGH) -> 'It is ___ swimming today.'",
    data: { sentence: "It is ___ swimming today.", answer: "not warm enough to go", hint: "Opposite of cold + enough + infinitive" },
    xpReward: 20,
  },
  {
    id: "ex-band1-ielts-intro-2", lessonId: "band1-ielts-intro", type: "multiple-choice",
    prompt: "Cambridge Use of English Part 1: Which preposition correctly completes the collocation?",
    data: { question: "The committee was impressed by her dedication and congratulated her ___ winning the scholarship.", options: ["for", "on", "at", "with"], correct: 1 },
    xpReward: 20,
  },
  {
    id: "ex-band1-ielts-intro-3", lessonId: "band1-ielts-intro", type: "reorder",
    prompt: "Reorder to form an authentic B2 Key Word Transformation for 'I haven't seen Daniel for two years' using TIME:",
    data: { words: ["The", "last", "time", "I", "saw", "Daniel", "was", "two", "years", "ago"], sentence: "The last time I saw Daniel was two years ago." },
    xpReward: 20,
  },
  {
    id: "ex-band1-ielts-intro-4", lessonId: "band1-ielts-intro", type: "matching",
    prompt: "Match each Cambridge B2 Use of English part to its tested skill.",
    data: { pairs: [["Part 1: Multiple-Choice Cloze", "Collocations & dependent prepositions"], ["Part 2: Open Cloze", "Grammatical connectives & pronouns"], ["Part 3: Word Formation", "Affixes & morphological changes"], ["Part 4: Key Word Transformation", "Syntactic paraphrasing & grammar rules"]] },
    xpReward: 20,
  },

  // ── Cambridge B2 First: Word Formation ──────────────────────────────────────
  {
    id: "ex-band1-toefl-intro-1", lessonId: "band1-toefl-intro", type: "fill-blank",
    prompt: "Transform DECIDE into the correct adjective: 'The CEO's ___ action prevented a disastrous company bankruptcy.'",
    data: { sentence: "The CEO's ___ action prevented a disastrous company bankruptcy.", answer: "decisive", hint: "Adjective form of decide" },
    xpReward: 20,
  },
  {
    id: "ex-band1-toefl-intro-2", lessonId: "band1-toefl-intro", type: "fill-blank",
    prompt: "Transform ABLE into a verb: 'Cloud computing systems ___ employees to collaborate in real time.'",
    data: { sentence: "Cloud computing systems ___ employees to collaborate in real time.", answer: "enable", hint: "Prefix + able (verb)" },
    xpReward: 20,
  },
  {
    id: "ex-band1-toefl-intro-3", lessonId: "band1-toefl-intro", type: "multiple-choice",
    prompt: "Context: 'His complete ___ to understand basic instructions infuriated his manager.' What is the correct negative noun from ABLE?",
    data: { question: "Choose the correct negative noun form of 'ABLE':", options: ["unability", "inability", "disability", "nonability"], correct: 1 },
    xpReward: 20,
  },
  {
    id: "ex-band1-toefl-intro-4", lessonId: "band1-toefl-intro", type: "matching",
    prompt: "Match the base root with its correct academic noun suffix.",
    data: { pairs: [["APPLY", "APPLICATION"], ["SUCCEED", "SUCCESS"], ["APPROVE", "APPROVAL"], ["TOLERATE", "TOLERANCE"]] },
    xpReward: 20,
  },

  // ── EnglishPage Verb Tenses & Aspect (Band 4–5) ───────────────────────────
  {
    id: "ex-band1-ielts-vs-toefl-1", lessonId: "band1-ielts-vs-toefl", type: "fill-blank",
    prompt: "Complete with the correct tense of DISCOVER: 'Archaeologists ___ the royal burial chamber last month.'",
    data: { sentence: "Archaeologists ___ the royal burial chamber last month.", answer: "discovered", hint: "Past Simple (specific past time marker: 'last month')" },
    xpReward: 20,
  },
  {
    id: "ex-band1-ielts-vs-toefl-2", lessonId: "band1-ielts-vs-toefl", type: "multiple-choice",
    prompt: "Choose the correct past sequence: 'When Dr. Evans arrived at the laboratory, the researchers ___ the experiment.'",
    data: { question: "Which tense shows that the experiment was already completed prior to Dr. Evans's arrival?", options: ["had already concluded", "have already concluded", "are already concluding", "concluded already"], correct: 0 },
    xpReward: 20,
  },
  {
    id: "ex-band1-ielts-vs-toefl-3", lessonId: "band1-ielts-vs-toefl", type: "fill-blank",
    prompt: "Complete the Future Perfect form of FINISH: 'By 2030, scientists ___ developing the synthetic vaccine.'",
    data: { sentence: "By 2030, scientists ___ developing the synthetic vaccine.", answer: "will have finished", hint: "Future Perfect (will have + past participle)" },
    xpReward: 20,
  },
  {
    id: "ex-band1-ielts-vs-toefl-4", lessonId: "band1-ielts-vs-toefl", type: "matching",
    prompt: "Match each timeline marker to its correct grammatical tense.",
    data: { pairs: [["'yesterday / in 2018'", "Past Simple (V2)"], ["'since 2015 / for 6 hours'", "Present Perfect Continuous"], ["'by the time + past action'", "Past Perfect (had + V3)"], ["'so far / already (present link)'", "Present Perfect Simple"]] },
    xpReward: 20,
  },

  // ── Randall's ESL Lab: Auditory Distractor Traps ─────────────────────────
  {
    id: "ex-band1-listening-format-1", lessonId: "band1-listening-format", type: "multiple-choice",
    prompt: "A receptionist says: 'The lecture starts at 9:00 AM... oh wait, the professor rescheduled it for 10:30.' What is the answer?",
    data: { question: "What is the correct lecture start time?", options: ["9:00 AM", "10:30 AM", "9:30 AM", "10:00 AM"], correct: 1 },
    xpReward: 20,
  },
  {
    id: "ex-band1-listening-format-2", lessonId: "band1-listening-format", type: "fill-blank",
    prompt: "A speaker spells out their name: 'That's B-A-R-R-E-double T.' What is the correctly spelled surname?",
    data: { sentence: "The student's surname is ___.", answer: "Barrett", hint: "Note the double letter: B-A-R-R-E-T-T" },
    xpReward: 20,
  },
  {
    id: "ex-band1-listening-format-3", lessonId: "band1-listening-format", type: "matching",
    prompt: "Match each auditory distractor trigger to what candidates must do:",
    data: { pairs: [["'Actually, let me check that...'", "Wait for the corrected detail before writing"], ["'-teen vs -ty' stress", "Listen for high pitch/stress on the final syllable"], ["'0' pronounced as 'oh'", "Transcribe as digit 0 in phone/ID numbers"], ["Double letters (e.g. 'double L')", "Write the consonant twice in proper nouns"]] },
    xpReward: 20,
  },

  // ── BBC 6-Minute English: Connected Speech & Catenation ───────────────────
  {
    id: "ex-band1-listening-gist-1", lessonId: "band1-listening-gist", type: "multiple-choice",
    prompt: "In natural spoken British English, 'hold on' sounds like /həʊl.dɒn/. What phonetic process is this?",
    data: { question: "What phonetic process causes the final consonant to bridge into the starting vowel?", options: ["Consonant-to-vowel catenation (linking)", "Glottal stop replacement", "Vowel neutralization to schwa", "Rhotic lengthening"], correct: 0 },
    xpReward: 20,
  },
  {
    id: "ex-band1-listening-gist-2", lessonId: "band1-listening-gist", type: "fill-blank",
    prompt: "In fast speech, which intrusive sound links the vowels in 'law and order' (/lɔː ___ ənd ɔːdə/)?",
    data: { sentence: "The intrusive sound inserted is /___/.", answer: "r", hint: "Intrusive consonant between open vowels in British RP: r" },
    xpReward: 20,
  },
  {
    id: "ex-band1-listening-gist-3", lessonId: "band1-listening-gist", type: "matching",
    prompt: "Match each connected speech term to its authentic BBC example:",
    data: { pairs: [["Catenation", "'hold on' -> /həʊl.dɒn/"], ["Intrusive /w/", "'go out' -> /ɡəʊ.waʊt/"], ["Intrusive /j/", "'I agree' -> /aɪ.jəɡriː/"], ["Elision", "'next week' -> /neks wiːk/"]] },
    xpReward: 20,
  },

  // ── Reading Skimming (UVic Study Zone) ──────────────────────────────────────────
  {
    id: "ex-band1-reading-skimming-1", lessonId: "band1-reading-skimming", type: "multiple-choice",
    prompt: "Based on the UVic skimming passage, which heading best matches Paragraph C?",
    data: {
      question: "Which IELTS-style heading accurately synthesizes the main idea of Paragraph C?",
      options: [
        "Cost-effective alternatives for municipal energy conservation",
        "Economic obstacles impeding the implementation of green rooftops",
        "Chemical breakdown of asphalt and root-barrier tar membranes",
        "The technological failure of Sedum vegetative insulation"
      ],
      correct: 1
    },
    xpReward: 15,
  },
  {
    id: "ex-band1-reading-skimming-2", lessonId: "band1-reading-skimming", type: "multiple-choice",
    prompt: "Why is 'Sedum plant cultivation' an INCORRECT heading for Paragraph B?",
    data: {
      question: "In heading matching questions, why is 'Sedum plant cultivation' a distractor trap for Paragraph B?",
      options: [
        "The passage explicitly states that Sedum plants are unsuitable for cities",
        "It is merely a minor supporting example, not the governing macro-idea of ecological cooling",
        "Sedum plants were actually mentioned in Paragraph A, not Paragraph B",
        "The author concludes that urban agriculture is entirely unprofitable"
      ],
      correct: 1
    },
    xpReward: 15,
  },
  {
    id: "ex-band1-reading-skimming-3", lessonId: "band1-reading-skimming", type: "fill-blank",
    prompt: "In the UVic reading methodology, 80% of an academic paragraph's core meaning resides in its ___ sentence.",
    data: {
      sentence: "In the UVic reading methodology, 80% of an academic paragraph's core meaning resides in its ___ sentence.",
      answer: "topic",
      hint: "The opening sentence stating the main argument"
    },
    xpReward: 10,
  },

  // ── Reading Scanning (UVic & British Council) ──────────────────────────────────
  {
    id: "ex-band1-reading-scanning-1", lessonId: "band1-reading-scanning", type: "fill-blank",
    prompt: "Scan the Lake Vostok passage: Under how many atmospheres of hydrostatic pressure do the bacteria survive? (Number only)",
    data: {
      sentence: "The bacteria survive under crushing hydrostatic pressure equivalent to ___ atmospheres.",
      answer: "350",
      hint: "Locate the numeric measurement in the final sentence"
    },
    xpReward: 10,
  },
  {
    id: "ex-band1-reading-scanning-2", lessonId: "band1-reading-scanning", type: "multiple-choice",
    prompt: "Which visual anchor should you search for first to locate the lead scientist's name?",
    data: {
      question: "To quickly locate who led the 2012 drilling expedition without reading the whole paragraph, scan for:",
      options: [
        "Numeric dates (2012) and capitalized titles/names (Dr. Viktor Lukin)",
        "The word 'kerosene' in lower-case",
        "The conclusion sentence at the bottom of the page",
        "A footnote or bibliography at the end of the text"
      ],
      correct: 0
    },
    xpReward: 15,
  },
  {
    id: "ex-band1-reading-scanning-3", lessonId: "band1-reading-scanning", type: "multiple-choice",
    prompt: "What is the metabolic energy source of the Lake Vostok extremophiles?",
    data: {
      question: "According to the subglacial passage, how do the Lake Vostok bacteria obtain metabolic fuel?",
      options: [
        "Through photosynthesis driven by diffused surface sunlight",
        "By oxidizing dissolved sulfur and methane compounds",
        "From kerosene lubrication leaked by drilling rigs",
        "By decomposing prehistoric plant matter trapped in the ice"
      ],
      correct: 1
    },
    xpReward: 15,
  },

  // ── Writing Trends ──────────────────────────────────────────────────────────
  {
    id: "ex-band1-writing-trends-1", lessonId: "band1-writing-trends", type: "fill-blank",
    prompt: "A line graph shows changes ___ time.",
    data: { sentence: "A line graph shows changes ___ time.", answer: "over", hint: "Preposition used with time periods" },
    xpReward: 10,
  },
  {
    id: "ex-band1-writing-trends-2", lessonId: "band1-writing-trends", type: "multiple-choice",
    prompt: "Which word describes a downward trend?",
    data: { question: "Choose the word that means a decrease:", options: ["rise", "increase", "decline", "fluctuate"], correct: 2 },
    xpReward: 10,
  },

  // ── Speaking Part 1 ─────────────────────────────────────────────────────────
  {
    id: "ex-band1-speaking-part1-1", lessonId: "band1-speaking-part1", type: "fill-blank",
    prompt: "IELTS Speaking Part 1 lasts ___ minutes.",
    data: { sentence: "IELTS Speaking Part 1 lasts ___ minutes.", answer: "four", hint: "Duration of Part 1" },
    xpReward: 10,
  },
  {
    id: "ex-band1-speaking-part1-2", lessonId: "band1-speaking-part1", type: "multiple-choice",
    prompt: "What type of questions are asked in Part 1?",
    data: { question: "Part 1 questions are about:", options: ["abstract topics", "familiar everyday topics", "academic lectures", "future plans"], correct: 1 },
    xpReward: 10,
  },
  // ── Grammar: Articles ───────────────────────────────────────────────────────
  // ── Grammar: Articles (EnglishPage Masterclass) ───────────────────────────────
  {
    id: "ex-band1-grammar-articles-1", lessonId: "band1-grammar-articles", type: "fill-blank",
    prompt: "Geopolitical rules: Complete the sentence with 'the' or write '-' for zero article.",
    data: {
      sentence: "The research delegation visited ___ United Kingdom before traveling to France.",
      answer: "the",
      hint: "Political unions, federations, and kingdoms take 'the', whereas singular nations take zero article"
    },
    xpReward: 15,
  },
  {
    id: "ex-band1-grammar-articles-2", lessonId: "band1-grammar-articles", type: "multiple-choice",
    prompt: "Which sentence correctly follows the EnglishPage rule for generic uncountable nouns in academic writing?",
    data: {
      question: "Identify the sentence that correctly avoids overusing 'the' with generic abstract concepts:",
      options: [
        "The pollution severely threatens the marine biodiversity in coastal zones.",
        "Pollution severely threatens marine biodiversity in coastal zones.",
        "A pollution severely threatens a marine biodiversity in the coastal zones.",
        "The most pollution threatens the most marine biodiversity."
      ],
      correct: 1
    },
    xpReward: 15,
  },
  {
    id: "ex-band1-grammar-articles-3", lessonId: "band1-grammar-articles", type: "fill-blank",
    prompt: "Water bodies rule: Complete the sentence with the appropriate article.",
    data: {
      sentence: "___ Amazon River discharges more water than any other river system on earth.",
      answer: "The",
      hint: "Rivers, oceans, and seas always require 'The'"
    },
    xpReward: 15,
  },

  // ── Grammar: Subject-Verb Agreement ─────────────────────────────────────────
  {
    id: "ex-band1-grammar-agreement-1", lessonId: "band1-grammar-agreement", type: "fill-blank",
    prompt: "The team ___ (play/plays) well together.",
    data: { sentence: "The team ___ well together.", answer: "plays", hint: "Collective noun takes singular verb" },
    xpReward: 10,
  },
  {
    id: "ex-band1-grammar-agreement-2", lessonId: "band1-grammar-agreement", type: "multiple-choice",
    prompt: "Choose the correct verb: 'Neither the teacher nor the students ___ ready.'",
    data: { question: "Neither the teacher nor the students ___ ready.", options: ["is", "are", "was", "has been"], correct: 1 },
    xpReward: 10,
  },

  // ── AWL Vocabulary 1 ────────────────────────────────────────────────────────
  {
    id: "ex-band1-vocab-awl1-1", lessonId: "band1-vocab-awl1", type: "fill-blank",
    prompt: "The study will ___ (look at/analyse) the effects of pollution.",
    data: { sentence: "The study will ___ the effects of pollution.", answer: "analyse", hint: "To examine in detail" },
    xpReward: 10,
  },
  {
    id: "ex-band1-vocab-awl1-2", lessonId: "band1-vocab-awl1", type: "matching",
    prompt: "Match the academic word to its simpler synonym.",
    data: { pairs: [["benefit", "advantage"], ["factor", "element"], ["method", "way"], ["process", "procedure"]] },
    xpReward: 10,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Band 5–6 (Intermediate)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Listening: Multiple Choice ──────────────────────────────────────────────
  {
    id: "ex-band2-listening-mc-1", lessonId: "band2-listening-mc", type: "multiple-choice",
    prompt: "In IELTS Listening MCQs, you should read the questions ___.",
    data: { question: "You should read the questions ___ the recording plays.", options: ["before", "while", "after", "never"], correct: 0 },
    xpReward: 15,
  },
  {
    id: "ex-band2-listening-mc-2", lessonId: "band2-listening-mc", type: "fill-blank",
    prompt: "Listen for ___ words that match the meaning of the options.",
    data: { sentence: "Listen for ___ words that match the meaning of the options.", answer: "synonym", hint: "Words with similar meaning" },
    xpReward: 15,
  },
  // ── IELTS Listening: Section 3 Multiple Choice (Marine Biology Thesis) ─────────
  {
  "id": "ex-band2-listening-mcq-1",
  "lessonId": "band2-listening-mcq",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original transcript study: A caller books a museum workshop. Clerk: 'The pottery class is on Thursday, not Tuesday. It begins at 10.15. The ticket is twelve pounds, but students pay nine. Bring an apron; we supply clay. Your surname is Mason?' Caller: 'No, Mayson: M-A-Y-S-O-N.'\n\nWhich day is confirmed?",
    "options": [
      "Thursday",
      "Friday",
      "Tuesday"
    ],
    "correct": 0,
    "explanation": "The clerk says Thursday and explicitly rejects Tuesday."
  },
  "xpReward": 20
},
  {
  "id": "ex-band2-listening-mcq-2",
  "lessonId": "band2-listening-mcq",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original transcript study: A caller books a museum workshop. Clerk: 'The pottery class is on Thursday, not Tuesday. It begins at 10.15. The ticket is twelve pounds, but students pay nine. Bring an apron; we supply clay. Your surname is Mason?' Caller: 'No, Mayson: M-A-Y-S-O-N.'\n\nHow much does a student pay?",
    "options": [
      "£15",
      "£12",
      "£9"
    ],
    "correct": 2,
    "explanation": "“Students pay nine” identifies the category-specific fee."
  },
  "xpReward": 15
},
  {
  "id": "ex-band2-listening-mcq-3",
  "lessonId": "band2-listening-mcq",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original transcript study: A caller books a museum workshop. Clerk: 'The pottery class is on Thursday, not Tuesday. It begins at 10.15. The ticket is twelve pounds, but students pay nine. Bring an apron; we supply clay. Your surname is Mason?' Caller: 'No, Mayson: M-A-Y-S-O-N.'\n\nWhat must the participant bring?",
    "options": [
      "An apron",
      "A ticket printer",
      "Clay"
    ],
    "correct": 0,
    "explanation": "The clerk asks the caller to bring an apron and says clay is supplied."
  },
  "xpReward": 15
},

  // ── IELTS Listening: Section 2 Map Labelling (Sports Complex) ─────────────────
  {
  "id": "ex-band2-listening-maps-1",
  "lessonId": "band2-listening-maps",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original plan description: North is at the top. The south entrance leads into a central hall. The café is west of the hall, the studio east, and the garden north. Guide: 'Turn right after entering, so the studio is on your right. The temporary exhibition used to occupy that room; it now uses the gallery beyond the garden.'\n\nOn entering from the south and turning right, which facility is reached?",
    "options": [
      "Garden",
      "Studio",
      "Café"
    ],
    "correct": 1,
    "explanation": "Facing north, right is east; the studio is east of the hall."
  },
  "xpReward": 15
},
  {
  "id": "ex-band2-listening-maps-2",
  "lessonId": "band2-listening-maps",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original plan description: North is at the top. The south entrance leads into a central hall. The café is west of the hall, the studio east, and the garden north. Guide: 'Turn right after entering, so the studio is on your right. The temporary exhibition used to occupy that room; it now uses the gallery beyond the garden.'\n\nWhere is the temporary exhibition now?",
    "options": [
      "In the studio",
      "In the gallery beyond the garden",
      "At the south entrance"
    ],
    "correct": 1,
    "explanation": "The old studio location is contrasted with its current gallery location."
  },
  "xpReward": 15
},
  {
  "id": "ex-band2-listening-maps-3",
  "lessonId": "band2-listening-maps",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original plan description: North is at the top. The south entrance leads into a central hall. The café is west of the hall, the studio east, and the garden north. Guide: 'Turn right after entering, so the studio is on your right. The temporary exhibition used to occupy that room; it now uses the gallery beyond the garden.'\n\nWhich facility lies west of the central hall?",
    "options": [
      "Studio",
      "Gallery",
      "Café"
    ],
    "correct": 2,
    "explanation": "The plan description explicitly puts the café west of the hall."
  },
  "xpReward": 15
},

  // ── IELTS Reading: True/False/Not Given Master Drills ───────────────────────
  {
  "id": "ex-band2-reading-tfng-1",
  "lessonId": "band2-reading-tfng",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original fictional study passage: In a pilot at Bellfield College, 40 volunteers received reusable cups. Twelve used them daily; the others used them less often. Researchers recorded usage for six weeks. The report did not compare the cups with disposable ones. The author argues that convenience matters more than publicity when encouraging reuse, but accepts that reminders can help occasional users.\n\nFactual statement: Every volunteer used the reusable cup daily.",
    "options": [
      "NOT GIVEN",
      "FALSE",
      "TRUE"
    ],
    "correct": 1,
    "explanation": "Only twelve of forty used it daily; the others explicitly used it less often."
  },
  "xpReward": 20
},
  {
  "id": "ex-band2-reading-tfng-2",
  "lessonId": "band2-reading-tfng",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original fictional study passage: In a pilot at Bellfield College, 40 volunteers received reusable cups. Twelve used them daily; the others used them less often. Researchers recorded usage for six weeks. The report did not compare the cups with disposable ones. The author argues that convenience matters more than publicity when encouraging reuse, but accepts that reminders can help occasional users.\n\nFactual statement: The reusable cups cost less than disposable cups.",
    "options": [
      "TRUE",
      "NOT GIVEN",
      "FALSE"
    ],
    "correct": 1,
    "explanation": "The report provides no prices or cost comparison."
  },
  "xpReward": 20
},
  {
  "id": "ex-band2-reading-tfng-3",
  "lessonId": "band2-reading-tfng",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original fictional study passage: In a pilot at Bellfield College, 40 volunteers received reusable cups. Twelve used them daily; the others used them less often. Researchers recorded usage for six weeks. The report did not compare the cups with disposable ones. The author argues that convenience matters more than publicity when encouraging reuse, but accepts that reminders can help occasional users.\n\nWriter’s claim: Publicity matters more than convenience.",
    "options": [
      "NO",
      "NOT GIVEN",
      "YES"
    ],
    "correct": 0,
    "explanation": "The author explicitly argues the reverse: convenience matters more than publicity."
  },
  "xpReward": 20
},
  {
  "id": "ex-band2-reading-tfng-4",
  "lessonId": "band2-reading-tfng",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original fictional study passage: In a pilot at Bellfield College, 40 volunteers received reusable cups. Twelve used them daily; the others used them less often. Researchers recorded usage for six weeks. The report did not compare the cups with disposable ones. The author argues that convenience matters more than publicity when encouraging reuse, but accepts that reminders can help occasional users.\n\nWriter’s claim: Reminders can help some occasional users.",
    "options": [
      "NO",
      "YES",
      "NOT GIVEN"
    ],
    "correct": 1,
    "explanation": "The final clause accepts that reminders can help occasional users."
  },
  "xpReward": 20
},

  // ── IELTS Writing Task 1: Line Graph & Trend Precision ─────────────────────
  {
  "id": "ex-band2-writing-line-graphs-1",
  "lessonId": "band2-writing-line-graphs",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original illustrative dataset: Electricity generation in Linden, in GWh. 2000: coal 120, gas 40, solar 5. 2010: coal 100, gas 75, solar 20. 2020: coal 35, gas 90, solar 60. The figures describe these three sources only, not all electricity generation.\n\nWhich overview is supported?",
    "options": [
      "Solar was the largest source in 2000",
      "Coal declined while gas and solar increased",
      "All three sources declined"
    ],
    "correct": 1,
    "explanation": "Coal falls 120→35, gas rises 40→90 and solar rises 5→60."
  },
  "xpReward": 20
},
  {
  "id": "ex-band2-writing-line-graphs-2",
  "lessonId": "band2-writing-line-graphs",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original illustrative dataset: Electricity generation in Linden, in GWh. 2000: coal 120, gas 40, solar 5. 2010: coal 100, gas 75, solar 20. 2020: coal 35, gas 90, solar 60. The figures describe these three sources only, not all electricity generation.\n\nHow much did solar generation increase from 2000 to 2020?",
    "options": [
      "60 GWh",
      "55 GWh",
      "55%"
    ],
    "correct": 1,
    "explanation": "The absolute difference is 60−5=55 GWh; percentage change would use a different calculation."
  },
  "xpReward": 20
},
  {
  "id": "ex-band2-writing-line-graphs-3",
  "lessonId": "band2-writing-line-graphs",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original illustrative dataset: Electricity generation in Linden, in GWh. 2000: coal 120, gas 40, solar 5. 2010: coal 100, gas 75, solar 20. 2020: coal 35, gas 90, solar 60. The figures describe these three sources only, not all electricity generation.\n\nWhich sentence respects the coverage?",
    "options": [
      "No other energy sources existed",
      "Gas produced all electricity in Linden",
      "Gas was the largest of the three sources in 2020"
    ],
    "correct": 2,
    "explanation": "The dataset compares only coal, gas and solar; it cannot establish all-source totals."
  },
  "xpReward": 20
},
  {
  "id": "ex-band2-writing-line-graphs-4",
  "lessonId": "band2-writing-line-graphs",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original illustrative dataset: Electricity generation in Linden, in GWh. 2000: coal 120, gas 40, solar 5. 2010: coal 100, gas 75, solar 20. 2020: coal 35, gas 90, solar 60. The figures describe these three sources only, not all electricity generation.\n\nWhich claim adds unsupported information?",
    "options": [
      "Coal produced 35 GWh in 2020",
      "A new subsidy caused solar generation to rise",
      "Gas rose between 2000 and 2010"
    ],
    "correct": 1,
    "explanation": "No policy or causal explanation is supplied."
  },
  "xpReward": 20
},

  // ── IELTS Speaking Part 2: Cue Card & ARE Mastery ───────────────────────────
  {
  "id": "ex-band2-speaking-cue-card-1",
  "lessonId": "band2-speaking-cue-card",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original Speaking prompts: Part 1—What do you enjoy about the place where you live? Part 2—Describe a place where you learned something useful. Say where it was, what you learned, who helped you, and explain why the experience mattered.\n\nWhich Part 1 answer is best developed?",
    "options": [
      "“The history of all cities began long ago.”",
      "“A park, because I can walk there after work and relax.”",
      "“Yes.”"
    ],
    "correct": 1,
    "explanation": "It answers the familiar question and adds a relevant personal reason."
  },
  "xpReward": 20
},
  {
  "id": "ex-band2-speaking-cue-card-2",
  "lessonId": "band2-speaking-cue-card",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original Speaking prompts: Part 1—What do you enjoy about the place where you live? Part 2—Describe a place where you learned something useful. Say where it was, what you learned, who helped you, and explain why the experience mattered.\n\nWhich Part 2 preparation note best supports development?",
    "options": [
      "A list of unrelated advanced adjectives",
      "A complete memorised essay",
      "Workshop / brake repair / neighbour / later independence"
    ],
    "correct": 2,
    "explanation": "The compact notes cover context, event, support and significance without scripting every word."
  },
  "xpReward": 20
},
  {
  "id": "ex-band2-speaking-cue-card-3",
  "lessonId": "band2-speaking-cue-card",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original Speaking prompts: Part 1—What do you enjoy about the place where you live? Part 2—Describe a place where you learned something useful. Say where it was, what you learned, who helped you, and explain why the experience mattered.\n\nWhich detail answers why the experience mattered?",
    "options": [
      "The skill helped with later repairs",
      "The workshop had a door",
      "The speaker can name many countries"
    ],
    "correct": 0,
    "explanation": "Using the skill later explains its personal significance."
  },
  "xpReward": 20
},
  {
  "id": "ex-band2-speaking-cue-card-4",
  "lessonId": "band2-speaking-cue-card",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original Speaking prompts: Part 1—What do you enjoy about the place where you live? Part 2—Describe a place where you learned something useful. Say where it was, what you learned, who helped you, and explain why the experience mattered.\n\nWhat can these text-choice drills evaluate?",
    "options": [
      "A choice about response planning",
      "The speaker’s pronunciation band",
      "The exact speed of spoken delivery"
    ],
    "correct": 0,
    "explanation": "No spoken response is captured; only planning judgements are checked."
  },
  "xpReward": 20
},

  // ── Grammar: Tenses Review ──────────────────────────────────────────────────
  {
  "id": "ex-band2-grammar-tenses-1",
  "lessonId": "band2-grammar-tenses",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original Task 1 data: In 2015 museum visits totalled 80,000; in 2020 they totalled 60,000. A 2025 plan projected 90,000 visits by 2030. The projection is an estimate, not an observed 2030 result.\n\nWhich sentence accurately reports the observed change?",
    "options": [
      "Visits have fallen in 2020 from 80,000",
      "Visits fell from 80,000 to 60,000 between 2015 and 2020",
      "Visits will fall to 60,000 in 2020"
    ],
    "correct": 1,
    "explanation": "A completed dated interval is reported with past simple here."
  },
  "xpReward": 15
},
  {
  "id": "ex-band2-grammar-tenses-2",
  "lessonId": "band2-grammar-tenses",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original Task 1 data: In 2015 museum visits totalled 80,000; in 2020 they totalled 60,000. A 2025 plan projected 90,000 visits by 2030. The projection is an estimate, not an observed 2030 result.\n\nWhich sentence correctly labels 2030?",
    "options": [
      "The 2025 plan projected 90,000 visits by 2030",
      "Visits always total 90,000",
      "Visits definitely reached 90,000 in 2030"
    ],
    "correct": 0,
    "explanation": "The source states a projection, not an observed 2030 result."
  },
  "xpReward": 15
},
  {
  "id": "ex-band2-grammar-tenses-3",
  "lessonId": "band2-grammar-tenses",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original Task 1 data: In 2015 museum visits totalled 80,000; in 2020 they totalled 60,000. A 2025 plan projected 90,000 visits by 2030. The projection is an estimate, not an observed 2030 result.\n\nWhy can a report begin “The table shows”?",
    "options": [
      "Past tense is never allowed",
      "Every data point must be present tense",
      "It describes the visual presented to the reader now"
    ],
    "correct": 2,
    "explanation": "Present simple can introduce the visual while its completed historical observations use past forms."
  },
  "xpReward": 15
},
  {
  "id": "ex-band2-grammar-tenses-4",
  "lessonId": "band2-grammar-tenses",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original Task 1 data: In 2015 museum visits totalled 80,000; in 2020 they totalled 60,000. A 2025 plan projected 90,000 visits by 2030. The projection is an estimate, not an observed 2030 result.\n\nWhich claim should be removed?",
    "options": [
      "The decline continued every year after 2020",
      "The 2020 total was 60,000",
      "The 2015 total was 80,000"
    ],
    "correct": 0,
    "explanation": "No annual observations after 2020 are supplied; the projection is a different kind of information."
  },
  "xpReward": 15
},

  // ── AWL Vocabulary 2 ────────────────────────────────────────────────────────
  {
  "id": "ex-band2-vocab-awl2-1",
  "lessonId": "band2-vocab-awl2",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original passage: The first trial measured heat loss through glass. The researchers then installed removable shutters and repeated the measurements under the same indoor temperature. Heat loss decreased, but the study did not estimate the cost of fitting shutters to other buildings.\n\nWhich paraphrase preserves the finding?",
    "options": [
      "Less heat escaped after shutters were fitted",
      "Every building saved the same amount",
      "The building began generating heat"
    ],
    "correct": 0,
    "explanation": "Reduced heat loss means less heat escaped; generation and universal effects are not stated."
  },
  "xpReward": 15
},
  {
  "id": "ex-band2-vocab-awl2-2",
  "lessonId": "band2-vocab-awl2",
  "type": "fill-blank",
  "prompt": "Use NO MORE THAN TWO WORDS from: “The researchers then installed removable shutters.”",
  "data": {
    "sentence": "They installed ____.",
    "answer": "removable shutters",
    "hint": "Copy the exact two-word noun phrase; “the” would exceed this answer’s limit."
  },
  "xpReward": 15
},
  {
  "id": "ex-band2-vocab-awl2-3",
  "lessonId": "band2-vocab-awl2",
  "type": "fill-blank",
  "prompt": "Use ONE WORD from: “The study did not estimate the cost of fitting shutters to other buildings.”",
  "data": {
    "sentence": "The study did not estimate the ____.",
    "answer": "cost",
    "hint": "Transfer the source noun for the expense being estimated; a synonym would not follow the copying instruction."
  },
  "xpReward": 15
},
  {
  "id": "ex-band2-vocab-awl2-4",
  "lessonId": "band2-vocab-awl2",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original passage: The first trial measured heat loss through glass. The researchers then installed removable shutters and repeated the measurements under the same indoor temperature. Heat loss decreased, but the study did not estimate the cost of fitting shutters to other buildings.\n\nWhich aspect was kept the same for repeat measurements?",
    "options": [
      "Indoor temperature",
      "The number of all city residents",
      "Installation cost in every building"
    ],
    "correct": 0,
    "explanation": "The passage explicitly states “the same indoor temperature”."
  },
  "xpReward": 15
},
  {
  "id": "ex-band2-vocab-awl2-5",
  "lessonId": "band2-vocab-awl2",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original passage: The first trial measured heat loss through glass. The researchers then installed removable shutters and repeated the measurements under the same indoor temperature. Heat loss decreased, but the study did not estimate the cost of fitting shutters to other buildings.\n\nWhich conclusion is not supported?",
    "options": [
      "Measurements were repeated",
      "The study established installation costs for other buildings",
      "Heat loss decreased"
    ],
    "correct": 1,
    "explanation": "It expressly says those wider fitting costs were not estimated."
  },
  "xpReward": 15
},

  // ═══════════════════════════════════════════════════════════════════════════
  // Band 6–7 (Upper Intermediate)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Listening: Academic Lectures ────────────────────────────────────────────
  {
  "id": "ex-band3-listening-lecture-1",
  "lessonId": "band3-listening-lecture",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original academic-talk transcript: 'Some insects use colour to avoid predators, but colour can serve different functions. A leaf insect blends with its surroundings, making detection harder. A brightly patterned insect may instead be conspicuous: its pattern can warn a predator that attacking it is unpleasant. These strategies are different, even though both may reduce attacks. Colour alone is not enough to classify every species; behaviour and habitat also matter.'\n\nWhat contrast organises the talk?",
    "options": [
      "Two identical forms of hiding",
      "Blending into surroundings versus being conspicuous as a warning",
      "Insects versus all plants"
    ],
    "correct": 1,
    "explanation": "The talk compares concealment with a possible warning function of conspicuous colour."
  },
  "xpReward": 20
},
  {
  "id": "ex-band3-listening-lecture-2",
  "lessonId": "band3-listening-lecture",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original academic-talk transcript: 'Some insects use colour to avoid predators, but colour can serve different functions. A leaf insect blends with its surroundings, making detection harder. A brightly patterned insect may instead be conspicuous: its pattern can warn a predator that attacking it is unpleasant. These strategies are different, even though both may reduce attacks. Colour alone is not enough to classify every species; behaviour and habitat also matter.'\n\nWhy is the leaf insect mentioned?",
    "options": [
      "To illustrate reduced detection through blending",
      "To describe a predator’s migration",
      "To prove all insects are brightly patterned"
    ],
    "correct": 0,
    "explanation": "Its resemblance to surroundings illustrates the camouflage mechanism described."
  },
  "xpReward": 20
},
  {
  "id": "ex-band3-listening-lecture-3",
  "lessonId": "band3-listening-lecture",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original academic-talk transcript: 'Some insects use colour to avoid predators, but colour can serve different functions. A leaf insect blends with its surroundings, making detection harder. A brightly patterned insect may instead be conspicuous: its pattern can warn a predator that attacking it is unpleasant. These strategies are different, even though both may reduce attacks. Colour alone is not enough to classify every species; behaviour and habitat also matter.'\n\nWhat does the final sentence qualify?",
    "options": [
      "The location of an office",
      "The use of colour alone to classify every species",
      "Whether insects exist"
    ],
    "correct": 1,
    "explanation": "Behaviour and habitat also matter, so colour alone is insufficient for every classification."
  },
  "xpReward": 20
},
  {
  "id": "ex-band3-listening-lecture-4",
  "lessonId": "band3-listening-lecture",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original academic-talk transcript: 'Some insects use colour to avoid predators, but colour can serve different functions. A leaf insect blends with its surroundings, making detection harder. A brightly patterned insect may instead be conspicuous: its pattern can warn a predator that attacking it is unpleasant. These strategies are different, even though both may reduce attacks. Colour alone is not enough to classify every species; behaviour and habitat also matter.'\n\nWhich paraphrase preserves “may reduce attacks”?",
    "options": [
      "Can lower the likelihood of attacks",
      "Always eliminates attacks",
      "Increases every attack"
    ],
    "correct": 0,
    "explanation": "Can lower preserves possibility; always eliminates overstates the claim."
  },
  "xpReward": 20
},

  // ── Reading: Summary Completion ─────────────────────────────────────────────
  {
    id: "ex-band3-reading-summary-1", lessonId: "band3-reading-summary", type: "fill-blank",
    prompt: "In summary completion, the words must fit ___ (grammar/meaning) in the gap.",
    data: { sentence: "In summary completion, the words must fit ___ in the gap.", answer: "grammatically", hint: "Correct part of speech is important" },
    xpReward: 20,
  },
  {
    id: "ex-band3-reading-summary-2", lessonId: "band3-reading-summary", type: "multiple-choice",
    prompt: "What is the first step for summary completion?",
    data: { question: "The first step is to:", options: ["write any word", "read the summary carefully", "guess the answer", "count the words"], correct: 1 },
    xpReward: 20,
  },
  {
    id: "ex-band3-reading-summary-3", lessonId: "band3-reading-summary", type: "fill-blank",
    prompt: "The words in the summary are often ___ (paraphrased/copied) from the passage.",
    data: { sentence: "The words in the summary are often ___ from the passage.", answer: "paraphrased", hint: "Reworded using synonyms" },
    xpReward: 20,
  },
  {
    id: "ex-band3-reading-summary-4", lessonId: "band3-reading-summary", type: "reorder",
    prompt: "Reorder the summary completion strategy steps.",
    data: { words: ["Read summary", "Predict word type", "Find passage section", "Select correct words"], sentence: "Read summary, Predict word type, Find passage section, Select correct words." },
    xpReward: 20,
  },

  // ── Writing: Complex Data ──────────────────────────────────────────────────
  {
    id: "ex-band3-writing-complex-data-1", lessonId: "band3-writing-complex-data", type: "fill-blank",
    prompt: "When describing a map, use ___ language to explain changes.",
    data: { sentence: "When describing a map, use ___ language to explain changes.", answer: "comparative", hint: "Language of comparison" },
    xpReward: 20,
  },
  {
    id: "ex-band3-writing-complex-data-2", lessonId: "band3-writing-complex-data", type: "multiple-choice",
    prompt: "Which phrase compares two data points?",
    data: { question: "Choose the comparative phrase:", options: ["In contrast to", "In addition", "Furthermore", "Firstly"], correct: 0 },
    xpReward: 20,
  },
  {
    id: "ex-band3-writing-complex-data-3", lessonId: "band3-writing-complex-data", type: "fill-blank",
    prompt: "The figure for exports ___ (rose/increased) steadily from 2010 to 2015.",
    data: { sentence: "The figure for exports ___ steadily from 2010 to 2015.", answer: "rose", hint: "Past tense of 'rise'" },
    xpReward: 20,
  },
  {
    id: "ex-band3-writing-complex-data-4", lessonId: "band3-writing-complex-data", type: "matching",
    prompt: "Match each preposition to its correct use in data description.",
    data: { pairs: [["at", "specific point"], ["by", "difference amount"], ["to", "end point"], ["from", "starting point"]] },
    xpReward: 20,
  },

  // ── Speaking Part 3 ─────────────────────────────────────────────────────────
  {
  "id": "ex-band3-speaking-part3-1",
  "lessonId": "band3-speaking-part3",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original repetition preparation script: “The museum opens at nine.” “Please leave your bags beside the entrance.” “The guide will meet visitors near the information desk.” The intended activity is to hear each sentence and repeat it accurately, not paraphrase it.\n\nWhich text preserves the first sentence exactly?",
    "options": [
      "A museum opens at night.",
      "The museum opened at nine.",
      "The museum opens at nine."
    ],
    "correct": 2,
    "explanation": "It preserves article, present tense and time without substitution."
  },
  "xpReward": 20
},
  {
  "id": "ex-band3-speaking-part3-2",
  "lessonId": "band3-speaking-part3",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original repetition preparation script: “The museum opens at nine.” “Please leave your bags beside the entrance.” “The guide will meet visitors near the information desk.” The intended activity is to hear each sentence and repeat it accurately, not paraphrase it.\n\nWhich phrase is omitted from “The guide will meet visitors” compared with the source?",
    "options": [
      "beside the entrance",
      "at nine",
      "near the information desk"
    ],
    "correct": 2,
    "explanation": "The third source sentence ends with the information-desk location phrase."
  },
  "xpReward": 20
},
  {
  "id": "ex-band3-speaking-part3-3",
  "lessonId": "band3-speaking-part3",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original repetition preparation script: “The museum opens at nine.” “Please leave your bags beside the entrance.” “The guide will meet visitors near the information desk.” The intended activity is to hear each sentence and repeat it accurately, not paraphrase it.\n\nWhy is a related paraphrase insufficient for repetition practice?",
    "options": [
      "The task asks for an opinion",
      "Every synonym has the same sounds",
      "The task requires accurate reproduction of the heard wording"
    ],
    "correct": 2,
    "explanation": "Repetition evaluates preserving the sentence, not summarising its gist."
  },
  "xpReward": 20
},
  {
  "id": "ex-band3-speaking-part3-4",
  "lessonId": "band3-speaking-part3",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original repetition preparation script: “The museum opens at nine.” “Please leave your bags beside the entrance.” “The guide will meet visitors near the information desk.” The intended activity is to hear each sentence and repeat it accurately, not paraphrase it.\n\nWhat is needed to review intelligibility?",
    "options": [
      "A longer written introduction",
      "Only a text selection",
      "A real spoken response"
    ],
    "correct": 2,
    "explanation": "Intelligibility depends on spoken delivery and cannot be established from a selected text option."
  },
  "xpReward": 20
},

  // ── Grammar: Conditionals ───────────────────────────────────────────────────
  {
  "id": "ex-band3-grammar-conditionals-1",
  "lessonId": "band3-grammar-conditionals",
  "type": "reorder",
  "prompt": "Reconstruct the direct question. Use every word once with its supplied punctuation.",
  "data": {
    "words": [
      "When",
      "does",
      "registration",
      "close?"
    ],
    "sentence": "When does registration close?"
  },
  "xpReward": 20
},
  {
  "id": "ex-band3-grammar-conditionals-2",
  "lessonId": "band3-grammar-conditionals",
  "type": "reorder",
  "prompt": "Reconstruct the embedded request.",
  "data": {
    "words": [
      "Please",
      "explain",
      "whether",
      "registration",
      "remains",
      "open."
    ],
    "sentence": "Please explain whether registration remains open."
  },
  "xpReward": 20
},
  {
  "id": "ex-band3-grammar-conditionals-3",
  "lessonId": "band3-grammar-conditionals",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original writing context: A student asks about joining a workshop. Intended direct question: “When does registration close?” Intended embedded question: “Please explain whether registration remains open.” Conditional statement: “If places remain, students may register online.”\n\nWhich direct question is grammatical?",
    "options": [
      "When does registration close?",
      "When registration does closes?",
      "When does registration closes?"
    ],
    "correct": 0,
    "explanation": "Does carries the tense; the main verb stays in its base form close."
  },
  "xpReward": 20
},
  {
  "id": "ex-band3-grammar-conditionals-4",
  "lessonId": "band3-grammar-conditionals",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original writing context: A student asks about joining a workshop. Intended direct question: “When does registration close?” Intended embedded question: “Please explain whether registration remains open.” Conditional statement: “If places remain, students may register online.”\n\nWhat does the if-clause establish?",
    "options": [
      "The condition under which online registration is permitted",
      "A completed past event",
      "A guarantee that places exist"
    ],
    "correct": 0,
    "explanation": "Students may register if places remain; availability itself is not guaranteed."
  },
  "xpReward": 20
},

  // ── AWL Vocabulary 3 ────────────────────────────────────────────────────────
  {
  "id": "ex-band3-vocab-awl3-1",
  "lessonId": "band3-vocab-awl3",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original academic context: A small trial suggests that spaced practice may improve recall. The result is consistent with an earlier classroom observation, but the researchers do not claim that the method guarantees success for every learner. Further work will examine whether the effect persists over longer intervals.\n\nWhat does “suggests” imply here?",
    "options": [
      "Complete rejection",
      "Universal proof",
      "Tentative support"
    ],
    "correct": 2,
    "explanation": "The passage gives cautious support and explicitly denies a guarantee."
  },
  "xpReward": 20
},
  {
  "id": "ex-band3-vocab-awl3-2",
  "lessonId": "band3-vocab-awl3",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original academic context: A small trial suggests that spaced practice may improve recall. The result is consistent with an earlier classroom observation, but the researchers do not claim that the method guarantees success for every learner. Further work will examine whether the effect persists over longer intervals.\n\nWhat does “persists” most nearly mean?",
    "options": [
      "Continues over time",
      "Becomes a classroom",
      "Disappears immediately by definition"
    ],
    "correct": 0,
    "explanation": "Further work examines whether the effect continues across longer intervals."
  },
  "xpReward": 20
},
  {
  "id": "ex-band3-vocab-awl3-3",
  "lessonId": "band3-vocab-awl3",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original academic context: A small trial suggests that spaced practice may improve recall. The result is consistent with an earlier classroom observation, but the researchers do not claim that the method guarantees success for every learner. Further work will examine whether the effect persists over longer intervals.\n\nWhich summary preserves the evidence level?",
    "options": [
      "Spaced practice may help recall, but wider claims need more work",
      "The researchers found no possible benefit",
      "Spaced practice guarantees every learner’s success"
    ],
    "correct": 0,
    "explanation": "It retains the qualified benefit and the need for further investigation."
  },
  "xpReward": 20
},
  {
  "id": "ex-band3-vocab-awl3-4",
  "lessonId": "band3-vocab-awl3",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original academic context: A small trial suggests that spaced practice may improve recall. The result is consistent with an earlier classroom observation, but the researchers do not claim that the method guarantees success for every learner. Further work will examine whether the effect persists over longer intervals.\n\nWhat does “consistent with” establish?",
    "options": [
      "That both studies involved every learner",
      "That the earlier observation caused the result",
      "Compatibility with an earlier observation"
    ],
    "correct": 2,
    "explanation": "Compatibility is supported; causation and universal coverage are not."
  },
  "xpReward": 20
},
  {
  "id": "ex-band3-vocab-awl3-5",
  "lessonId": "band3-vocab-awl3",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original academic context: A small trial suggests that spaced practice may improve recall. The result is consistent with an earlier classroom observation, but the researchers do not claim that the method guarantees success for every learner. Further work will examine whether the effect persists over longer intervals.\n\nWhich noun fits “an earlier classroom ____” in this context?",
    "options": [
      "observation",
      "observational",
      "observe"
    ],
    "correct": 0,
    "explanation": "The phrase needs a countable noun, not a verb or adjective."
  },
  "xpReward": 20
},

  // ═══════════════════════════════════════════════════════════════════════════
  // Band 7–8+ (Advanced)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Listening: Accents & Distractors ────────────────────────────────────────
  {
    id: "ex-band4-listening-accents-1", lessonId: "band4-listening-accents", type: "multiple-choice",
    prompt: "In rapid IELTS Section 3/4 speech, a speaker says 'the las' month of excavations'. What phonetic process caused the /t/ sound to be omitted?",
    data: { question: "Why is the /t/ sound omitted in 'the last month' during natural connected speech?", options: ["Elision of alveolar stops /t/ and /d/ between consonants", "Rhotic vowel lengthening", "Intrusive /r/ linking", "Weak form schwa reduction"], correct: 0 },
    xpReward: 25,
  },
  {
    id: "ex-band4-listening-accents-2", lessonId: "band4-listening-accents", type: "fill-blank",
    prompt: "In IELTS Section 1 phone/booking forms, listeners often confuse numbers like 15 and 50. Complete the syllable stress rule:",
    data: { sentence: "Numbers ending in '-teen' place primary stress on the ___ syllable, whereas numbers ending in '-ty' stress the first syllable.", answer: "second", hint: "Which syllable receives the stress in fif-TEEN: first or second?" },
    xpReward: 25,
  },
  {
    id: "ex-band4-listening-accents-3", lessonId: "band4-listening-accents", type: "multiple-choice",
    prompt: "In non-rhotic British and Australian accents, what sound is inserted between two consecutive vowels as in 'law and order' (/lɔː r ənd ɔːdə/)?",
    data: { question: "What linking sound connects 'media interest' (/ˈmiːdiə r ˈɪntrəst/) in British RP?", options: ["Intrusive /r/", "Glottal stop /ʔ/", "Aspirated /h/", "Nasal /ŋ/"], correct: 0 },
    xpReward: 25,
  },
  {
    id: "ex-band4-listening-accents-4", lessonId: "band4-listening-accents", type: "matching",
    prompt: "Match each connected speech phenomenon to its authentic listening example:",
    data: { pairs: [["Elision (/t/, /d/ deletion)", "'nex' Friday' instead of 'next Friday'"], ["Weak form reduction to /ə/", "'a cup of tea' pronounced /ə kʌp əv tiː/"], ["Assimilation", "'ten cars' pronounced /teŋ kɑːz/"], ["Stress distraction trap", "'We planned for 50, but only 15 attended'"]] },
    xpReward: 25,
  },

  // ── Reading: Identifying Views ─────────────────────────────────────────────
  {
    id: "ex-band4-reading-views-1", lessonId: "band4-reading-views", type: "fill-blank",
    prompt: "In 'Yes/No/Not Given' questions, ___ means the writer explicitly agrees.",
    data: { sentence: "In 'Yes/No/Not Given' questions, ___ means the writer explicitly agrees.", answer: "Yes", hint: "Writer's stated agreement" },
    xpReward: 25,
  },
  {
    id: "ex-band4-reading-views-2", lessonId: "band4-reading-views", type: "multiple-choice",
    prompt: "The statement 'The author argues that...' indicates:",
    data: { question: "'The author argues that...' indicates:", options: ["the author disagrees", "the author's position", "a fact", "an example"], correct: 1 },
    xpReward: 25,
  },
  {
    id: "ex-band4-reading-views-3", lessonId: "band4-reading-views", type: "fill-blank",
    prompt: "___ (hedging/boosting) language weakens the strength of a claim.",
    data: { sentence: "___ language weakens the strength of a claim.", answer: "Hedging", hint: "Cautious language (e.g., 'may', 'suggest')" },
    xpReward: 25,
  },
  {
    id: "ex-band4-reading-views-4", lessonId: "band4-reading-views", type: "multiple-choice",
    prompt: "Which phrase indicates the writer's opinion?",
    data: { question: "Choose the opinion phrase:", options: ["It is well known that", "The data shows that", "It could be argued that", "According to the table"], correct: 2 },
    xpReward: 25,
  },

  // ── Writing: Sophisticated Structures ───────────────────────────────────────
  {
    id: "ex-band4-writing-sophisticated-1", lessonId: "band4-writing-sophisticated", type: "fill-blank",
    prompt: "A ___ (complex/simple) sentence contains a main clause and at least one subordinate clause.",
    data: { sentence: "A ___ sentence contains a main clause and at least one subordinate clause.", answer: "complex", hint: "Multiple clauses sentence type" },
    xpReward: 25,
  },
  {
    id: "ex-band4-writing-sophisticated-2", lessonId: "band4-writing-sophisticated", type: "multiple-choice",
    prompt: "Which sentence uses inversion for emphasis?",
    data: { question: "Identify the sentence with inversion:", options: ["Never have I seen such beauty.", "I have never seen such beauty.", "I never saw such beauty.", "I did never see such beauty."], correct: 0 },
    xpReward: 25,
  },
  {
    id: "ex-band4-writing-sophisticated-3", lessonId: "band4-writing-sophisticated", type: "fill-blank",
    prompt: "___ (Despite/Although) the heavy rain, the match continued.",
    data: { sentence: "___ the heavy rain, the match continued.", answer: "Despite", hint: "Preposition followed by noun phrase" },
    xpReward: 25,
  },
  {
    id: "ex-band4-writing-sophisticated-4", lessonId: "band4-writing-sophisticated", type: "reorder",
    prompt: "Reorder to form a cleft sentence for emphasis.",
    data: { words: ["It", "was", "the", "government", "that", "introduced", "the", "reform"], sentence: "It was the government that introduced the reform." },
    xpReward: 25,
  },

  // ── Speaking: Storytelling & Fluency ────────────────────────────────────────
  {
    id: "ex-band4-speaking-storytelling-1", lessonId: "band4-speaking-storytelling", type: "fill-blank",
    prompt: "To extend your answer, use ___ (narrative/direct) discourse markers like 'so then'.",
    data: { sentence: "To extend your answer, use ___ discourse markers like 'so then'.", answer: "narrative", hint: "Storytelling language" },
    xpReward: 25,
  },
  {
    id: "ex-band4-speaking-storytelling-2", lessonId: "band4-speaking-storytelling", type: "multiple-choice",
    prompt: "Which phrase helps buy thinking time?",
    data: { question: "Choose the phrase that buys you thinking time:", options: ["Let me see", "I think", "The reason is", "In my opinion"], correct: 0 },
    xpReward: 25,
  },
  {
    id: "ex-band4-speaking-storytelling-3", lessonId: "band4-speaking-storytelling", type: "fill-blank",
    prompt: "Using ___ (vague/precise) language like 'sort of' can make you sound more natural.",
    data: { sentence: "Using ___ language like 'sort of' can make you sound more natural.", answer: "vague", hint: "Imprecise but natural expressions" },
    xpReward: 25,
  },
  {
    id: "ex-band4-speaking-storytelling-4", lessonId: "band4-speaking-storytelling", type: "translation",
    prompt: "Translate to English: 'هل يمكنك أن تسرد لي قصة لا تنسى من طفولتك؟'",
    data: { en: "Can you tell me an unforgettable story from your childhood?", ar: "هل يمكنك أن تسرد لي قصة لا تنسى من طفولتك؟" },
    xpReward: 25,
  },

  // ── Grammar: Inversion & Emphasis ───────────────────────────────────────────
  {
    id: "ex-band4-grammar-inversion-1", lessonId: "band4-grammar-inversion", type: "fill-blank",
    prompt: "___ (Not only/Hardly) did she finish the project, but she also presented it.",
    data: { sentence: "___ did she finish the project, but she also presented it.", answer: "Not only", hint: "Negative inversion for 'not only... but also'" },
    xpReward: 25,
  },
  {
    id: "ex-band4-grammar-inversion-2", lessonId: "band4-grammar-inversion", type: "fill-blank",
    prompt: "___ (Rarely/Often) has there been such a remarkable discovery.",
    data: { sentence: "___ has there been such a remarkable discovery.", answer: "Rarely", hint: "Negative adverb triggering inversion" },
    xpReward: 25,
  },
  {
    id: "ex-band4-grammar-inversion-3", lessonId: "band4-grammar-inversion", type: "multiple-choice",
    prompt: "Choose the correct inverted sentence: 'Hardly ___ the train when it started moving.'",
    data: { question: "Hardly ___ the train when it started moving.", options: ["I boarded", "did I board", "I did board", "boarded I"], correct: 1 },
    xpReward: 25,
  },
  {
    id: "ex-band4-grammar-inversion-4", lessonId: "band4-grammar-inversion", type: "reorder",
    prompt: "Reorder to form an inverted sentence.",
    data: { words: ["Under", "no", "circumstances", "should", "you", "reveal", "the", "password"], sentence: "Under no circumstances should you reveal the password." },
    xpReward: 25,
  },
  {
    id: "ex-band4-grammar-inversion-5", lessonId: "band4-grammar-inversion", type: "fill-blank",
    prompt: "___ (So/Such) was the impact of the speech that the audience stood up.",
    data: { sentence: "___ was the impact of the speech that the audience stood up.", answer: "Such", hint: "Inversion with 'such' for emphasis" },
    xpReward: 25,
  },

  // ── AWL Vocabulary 4 ────────────────────────────────────────────────────────
  {
    id: "ex-band4-vocab-awl4-1", lessonId: "band4-vocab-awl4", type: "fill-blank",
    prompt: "The findings ___ (confirm/validate) the hypothesis proposed earlier.",
    data: { sentence: "The findings ___ the hypothesis proposed earlier.", answer: "validate", hint: "Formal word for 'confirm as true'" },
    xpReward: 25,
  },
  {
    id: "ex-band4-vocab-awl4-2", lessonId: "band4-vocab-awl4", type: "multiple-choice",
    prompt: "What does 'paradigm' mean in academic context?",
    data: { question: "'Paradigm' in academic context means:", options: ["a model or framework", "a simple example", "a mistake", "a question"], correct: 0 },
    xpReward: 25,
  },
  {
    id: "ex-band4-vocab-awl4-3", lessonId: "band4-vocab-awl4", type: "fill-blank",
    prompt: "The results ___ (indicate/show) a strong correlation between the variables.",
    data: { sentence: "The results ___ a strong correlation between the variables.", answer: "demonstrate", hint: "Formal synonym for 'show'" },
    xpReward: 25,
  },
  {
    id: "ex-band4-vocab-awl4-4", lessonId: "band4-vocab-awl4", type: "matching",
    prompt: "Match each advanced academic word to its definition.",
    data: { pairs: [["ambiguous", "open to interpretation"], ["comprehensive", "covering all aspects"], ["contemporary", "modern or current"], ["phenomenon", "observable fact"]] },
    xpReward: 25,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Test Practice Course Materials (IELTS Academic, General, TOEFL & Cambridge)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── IELTS Academic Writing Task 1: Trends & Movements ──────────────────────
  {
    id: "ex-practice-trends-1", lessonId: "band1-writing-trends", type: "multiple-choice",
    prompt: "Which adverb best describes a steep, sudden rise in a line graph?",
    data: { question: "The number of international applicants rose ___ from 2,000 to 14,000 in just two months.", options: ["steadily", "dramatically", "marginally", "negligibly"], correct: 1 },
    xpReward: 20,
  },
  {
    id: "ex-practice-trends-2", lessonId: "band1-writing-trends", type: "matching",
    prompt: "Match each IELTS Task 1 trend term with its definition.",
    data: { pairs: [["peaked at", "reached the highest point"], ["plateaued", "remained flat after a rise"], ["plummeted", "dropped rapidly and steeply"], ["fluctuated", "moved up and down irregularly"]] },
    xpReward: 20,
  },
  {
    id: "ex-practice-trends-3", lessonId: "band1-writing-trends", type: "fill-blank",
    prompt: "Complete the overview sentence: 'Overall, it is evident that mobile usage experienced a substantial ___ over the period.'",
    data: { sentence: "Overall, it is evident that mobile usage experienced a substantial ___ over the period.", answer: "increase", hint: "Noun meaning upward trend" },
    xpReward: 20,
  },

  // ── IELTS Reading: True / False / Not Given Logic ───────────────────────────
  {
  "id": "ex-practice-tfng-1",
  "lessonId": "band2-reading-tfng",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original fictional study passage: In a pilot at Bellfield College, 40 volunteers received reusable cups. Twelve used them daily; the others used them less often. Researchers recorded usage for six weeks. The report did not compare the cups with disposable ones. The author argues that convenience matters more than publicity when encouraging reuse, but accepts that reminders can help occasional users.\n\nFactual statement: The researchers recorded usage for six weeks.",
    "options": [
      "NOT GIVEN",
      "TRUE",
      "FALSE"
    ],
    "correct": 1,
    "explanation": "The recording period is explicitly stated as six weeks."
  },
  "xpReward": 20
},
  {
  "id": "ex-practice-tfng-2",
  "lessonId": "band2-reading-tfng",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original fictional study passage: In a pilot at Bellfield College, 40 volunteers received reusable cups. Twelve used them daily; the others used them less often. Researchers recorded usage for six weeks. The report did not compare the cups with disposable ones. The author argues that convenience matters more than publicity when encouraging reuse, but accepts that reminders can help occasional users.\n\nFactual statement: Most volunteers were under 25 years old.",
    "options": [
      "FALSE",
      "TRUE",
      "NOT GIVEN"
    ],
    "correct": 2,
    "explanation": "No age information is provided; volunteer status does not establish age."
  },
  "xpReward": 20
},

  // ── IELTS Academic Writing Task 1: Double Chart & Proportions ──────────────
  {
  "id": "ex-practice-bar-pie-1",
  "lessonId": "band2-writing-bar-pie",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original fictional data: Travel to Northbank College in 2025. Bus:45% of students and 30% of staff. Bicycle:25% of students and 15% of staff. Walking:20% of students and 10% of staff. Car:10% of students and 45% of staff. Each group's shares total 100%; group sizes are not given.\n\nWhat is the staff–student gap in the car share?",
    "options": [
      "55 percentage points",
      "35 percentage points",
      "35 people"
    ],
    "correct": 1,
    "explanation": "45%−10%=35 percentage points; headcounts are unavailable."
  },
  "xpReward": 20
},
  {
  "id": "ex-practice-bar-pie-2",
  "lessonId": "band2-writing-bar-pie",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original fictional data: Travel to Northbank College in 2025. Bus:45% of students and 30% of staff. Bicycle:25% of students and 15% of staff. Walking:20% of students and 10% of staff. Car:10% of students and 45% of staff. Each group's shares total 100%; group sizes are not given.\n\nWhich statement is accurate?",
    "options": [
      "More students than staff cycle in absolute numbers",
      "A majority of staff use buses",
      "Cars are the largest staff category"
    ],
    "correct": 2,
    "explanation": "45% is the largest staff share; bus use is 30%, and group sizes are unknown."
  },
  "xpReward": 20
},
  {
  "id": "ex-practice-bar-pie-3",
  "lessonId": "band2-writing-bar-pie",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original fictional data: Travel to Northbank College in 2025. Bus:45% of students and 30% of staff. Bicycle:25% of students and 15% of staff. Walking:20% of students and 10% of staff. Car:10% of students and 45% of staff. Each group's shares total 100%; group sizes are not given.\n\nWhat proportion of students use non-car modes?",
    "options": [
      "55%",
      "90%",
      "75%"
    ],
    "correct": 1,
    "explanation": "The mutually exclusive non-car categories total 45+25+20=90%."
  },
  "xpReward": 20
},

  // ── IELTS Academic Task 2: Discursive Essay (Gap Year) ──────────────────────
  {
  "id": "ex-practice-opinion-1",
  "lessonId": "band2-writing-opinion",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original Task 2 prompt: Some people think universities should require every student to complete a community project. Others believe students should choose whether to participate. Discuss both views and give your own opinion.\n\nWhat must a complete answer include?",
    "options": [
      "A description of university architecture",
      "Only a list of volunteering benefits",
      "Both views and a supported opinion"
    ],
    "correct": 2,
    "explanation": "The instruction explicitly requires discussion of both views and an opinion."
  },
  "xpReward": 25
},
  {
  "id": "ex-practice-opinion-2",
  "lessonId": "band2-writing-opinion",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original Task 2 prompt: Some people think universities should require every student to complete a community project. Others believe students should choose whether to participate. Discuss both views and give your own opinion.\n\nWhich thesis directly answers the debate?",
    "options": [
      "Participation should remain voluntary, with accessible opportunities",
      "University life has many topics",
      "All students attend lectures"
    ],
    "correct": 0,
    "explanation": "It states a position on whether participation should be compulsory."
  },
  "xpReward": 25
},

  // ── TOEFL Writing: Academic Discussion (Remote Work vs Office) ─────────────
  {
  "id": "ex-practice-discussion-1",
  "lessonId": "band3-writing-multiple-charts",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original discussion prompt: Professor Lane asks whether first-year students should choose one broad elective outside their main subject. Mina supports it because it may reveal new interests. Leo worries that it reduces time for core modules. Contribute your own view and develop it with reasons.\n\nWhich contribution adds a developed position?",
    "options": [
      "Discuss a holiday unrelated to electives",
      "Support an elective with workload advice and a concrete cross-subject example",
      "Copy Mina’s wording without any addition"
    ],
    "correct": 1,
    "explanation": "It responds to the debate while adding a reasoned condition and example."
  },
  "xpReward": 25
},
  {
  "id": "ex-practice-discussion-2",
  "lessonId": "band3-writing-multiple-charts",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original discussion prompt: Professor Lane asks whether first-year students should choose one broad elective outside their main subject. Mina supports it because it may reveal new interests. Leo worries that it reduces time for core modules. Contribute your own view and develop it with reasons.\n\nWhich response meaningfully addresses Leo’s concern?",
    "options": [
      "State that time never matters",
      "Ignore the workload issue",
      "Let the elective replace another optional requirement"
    ],
    "correct": 2,
    "explanation": "Replacing a requirement addresses workload instead of simply adding more hours."
  },
  "xpReward": 25
},

  // ── TOEFL Writing: Integrated Task (Asteroid Mining Rebuttal) ───────────────
  {
  "id": "ex-practice-integrated-1",
  "lessonId": "band3-writing-maps-processes",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original email situation: You organised a student exhibition and booked a projector from the media office. It stopped working during rehearsal. Write to the coordinator, Ms. Rivera: explain what happened, describe the event’s needs, and propose a practical solution.\n\nWhich opening communicates the purpose most clearly?",
    "options": [
      "I am writing about the projector that failed during rehearsal",
      "My childhood was interesting",
      "You always ruin events"
    ],
    "correct": 0,
    "explanation": "It identifies the relevant equipment and problem without irrelevant material or accusation."
  },
  "xpReward": 25
},
  {
  "id": "ex-practice-integrated-2",
  "lessonId": "band3-writing-maps-processes",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original email situation: You organised a student exhibition and booked a projector from the media office. It stopped working during rehearsal. Write to the coordinator, Ms. Rivera: explain what happened, describe the event’s needs, and propose a practical solution.\n\nWhich detail develops the event’s practical needs?",
    "options": [
      "The coordinator has a nice name",
      "Students must show short films to about forty visitors",
      "The sender likes blue stationery"
    ],
    "correct": 1,
    "explanation": "Audience size and film display explain why reliable projection matters."
  },
  "xpReward": 25
},

  // ── TOEFL Speaking Task 2: Campus Announcement (Bookstore E-Receipts) ───────
  {
  "id": "ex-practice-speaking-toefl-1",
  "lessonId": "band3-speaking-toefl4",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original longer repetition preparation: “Visitors who arrive after the tour begins should wait near reception.” “Although the main gallery is closed, the exhibition on the upper floor remains open.” “Please return the audio guide before you leave through the eastern exit.”\n\nWho should wait near reception in the first sentence?",
    "options": [
      "Every visitor at any time",
      "Visitors arriving after the tour begins",
      "Only the museum staff"
    ],
    "correct": 1,
    "explanation": "The relative clause restricts the instruction to late arrivals."
  },
  "xpReward": 25
},

  // ── TOEFL Academic Discussion & Lecture Signposting ────────────────────────
  {
  "id": "ex-practice-lecture-1",
  "lessonId": "band3-listening-lecture",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original academic-talk transcript: 'Some insects use colour to avoid predators, but colour can serve different functions. A leaf insect blends with its surroundings, making detection harder. A brightly patterned insect may instead be conspicuous: its pattern can warn a predator that attacking it is unpleasant. These strategies are different, even though both may reduce attacks. Colour alone is not enough to classify every species; behaviour and habitat also matter.'\n\nWhich note correctly links an example to its mechanism?",
    "options": [
      "Every colour → same mechanism",
      "Leaf insect → bright warning only",
      "Leaf insect → blending → harder detection"
    ],
    "correct": 2,
    "explanation": "The source explicitly associates the leaf insect with blending rather than warning."
  },
  "xpReward": 25
},
  {
  "id": "ex-practice-section3-1",
  "lessonId": "band3-listening-section3",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original transcript study: A student asks, 'Could you tell me where to collect the fieldwork forms?' A staff member replies, 'At the science office, just opposite the stairs. It closes at four today.' A second student asks, 'Would you mind checking this application before I submit it?' The tutor says, 'Of course—send me the final draft this afternoon.'\n\nWhich reply answers where to collect the forms?",
    "options": [
      "I submitted a different form yesterday",
      "Four forms were printed",
      "At the science office opposite the stairs"
    ],
    "correct": 2,
    "explanation": "The question requests a location, and only the first option supplies it."
  },
  "xpReward": 25
},

  // ── IELTS General Task 1: Three Letter Registers ────────────────────────────
  {
    id: "ex-practice-letters-1", lessonId: "band4-writing-sophisticated", type: "matching",
    prompt: "Match each letter context to its mandatory opening salutation and sign-off:",
    data: { pairs: [["Formal (Unknown official / City council)", "Dear Sir or Madam, ... Yours faithfully,"], ["Semi-Formal (Named landlord / Employer)", "Dear Mr. Henderson, ... Yours sincerely,"], ["Informal (Close friend / Peer)", "Dear Liam, ... Warm regards,"]] },
    xpReward: 25,
  },
  {
    id: "ex-practice-letters-2", lessonId: "band4-writing-sophisticated", type: "multiple-choice",
    prompt: "Which sentence is strictly FORBIDDEN in a formal IELTS General letter to a municipal council?",
    data: { question: "Identify the inappropriate informal sentence for a formal council letter:", options: ["I am writing to draw your attention to a traffic hazard.", "I would be grateful if the council could inspect the intersection.", "I'm writing 'cause the road outside my place is totally crazy!", "I trust the council will implement preventive safeguards promptly."], correct: 2 },
    xpReward: 25,
  },

  // ── IELTS General Workplace Reading: Corporate Notices ─────────────────────
  {
    id: "ex-practice-notices-1", lessonId: "band4-writing-complex-comparisons", type: "multiple-choice",
    prompt: "Notice: 'TOIL cannot be claimed for voluntary weekend work or routine email monitoring.' Statement: 'Employees are permitted to claim compensatory time off for checking weekend emails.'",
    data: { question: "Is the statement True, False, or Not Given?", options: ["TRUE", "FALSE (Directly prohibited by policy)", "NOT GIVEN"], correct: 1 },
    xpReward: 25,
  },
  {
    id: "ex-practice-notices-2", lessonId: "band4-writing-complex-comparisons", type: "fill-blank",
    prompt: "According to the TOIL notice: 'Accrued hours must be redeemed within ___ calendar days.'",
    data: { sentence: "Accrued hours must be redeemed within ___ calendar days.", answer: "60", hint: "Number of calendar days" },
    xpReward: 25,
  },

  // ── Band 8.5+ Syntactic Inversion & Clefting ────────────────────────────────
  {
    id: "ex-practice-inversion-1", lessonId: "band4-grammar-inversion", type: "reorder",
    prompt: "Reorder this sentence into advanced negative inversion starting with 'Seldom':",
    data: { words: ["Seldom", "has", "a", "policy", "reform", "yielded", "such", "instantaneous", "economic", "dividends."], sentence: "Seldom has a policy reform yielded such instantaneous economic dividends." },
    xpReward: 25,
  },
  {
    id: "ex-practice-inversion-2", lessonId: "band4-grammar-inversion", type: "fill-blank",
    prompt: "Complete the inverted clause: 'Not only ___ the initiative curb vehicle emissions, but it also raised substantial revenue.' (Auxiliary past verb)",
    data: { sentence: "Not only ___ the initiative curb vehicle emissions, but it also raised substantial revenue.", answer: "did", hint: "Past auxiliary of do" },
    xpReward: 25,
  },
  {
    id: "ex-practice-inversion-3", lessonId: "band4-grammar-inversion", type: "multiple-choice",
    prompt: "Which sentence demonstrates a grammatically flawless pseudo-cleft (Wh-cleft) construction?",
    data: { question: "Choose the correct cleft sentence for emphasis:", options: ["What this longitudinal study confirms is the profound efficacy of early interventions.", "What confirms this study is early interventions.", "This study confirms what is early interventions.", "Early interventions what this study confirms."], correct: 0 },
    xpReward: 25,
  },

  // ── Advanced Inference & Register (Band 7–8+) ──────────────────────────────
  {
    id: "ex-practice-accents-1", lessonId: "band4-listening-accents", type: "matching",
    prompt: "Match the British vs American academic term:",
    data: { pairs: [["university campus (hall of residence)", "dormitory / dorm"], ["marks / grades", "grades / GPA"], ["full stop", "period"], ["autumn term", "fall semester"]] },
    xpReward: 25,
  },
  {
    id: "ex-practice-inference-1", lessonId: "band4-listening-inference", type: "multiple-choice",
    prompt: "A supervisor comments on an essay draft: 'The conclusion is rather ambitious given the limited data set.' What is the supervisor implying?",
    data: { question: "What does the supervisor imply?", options: ["The data is extraordinarily thorough and proves the conclusion", "The claims in the conclusion go beyond what the data actually supports", "The essay should be published immediately in a top journal", "More ambitious words should be incorporated"], correct: 1 },
    xpReward: 25,
  },

  // Original targeted IELTS Academic and TOEFL 2026 practice.
{
  "id": "ex-band2-listening-mcq-content-04",
  "lessonId": "band2-listening-mcq",
  "type": "fill-blank",
  "prompt": "Transcript-based spelling practice. Clerk: “No, Mayson: M-A-Y-S-O-N.” Copy the surname.",
  "data": {
    "sentence": "The surname is ____.",
    "answer": "Mayson",
    "hint": "The spelled sequence contains Y after A; this checks transcription from visible text, not listening."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-listening-maps-content-04",
  "lessonId": "band2-listening-maps",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original plan description: North is at the top. The south entrance leads into a central hall. The café is west of the hall, the studio east, and the garden north. Guide: 'Turn right after entering, so the studio is on your right. The temporary exhibition used to occupy that room; it now uses the gallery beyond the garden.'\n\nWhy would “temporary exhibition” be a wrong current label for the studio?",
    "options": [
      "It is a past use, not the present one",
      "It is north of every other room",
      "Exhibitions never move"
    ],
    "correct": 0,
    "explanation": "“Used to” marks a previous arrangement; “now” gives the current arrangement."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-listening-form-completion-content-01",
  "lessonId": "band2-listening-form-completion",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original educational transcript: Tutor: 'How will you investigate evening bus use?' Ada: 'An online survey would be quick.' Ben: 'But it excludes passengers without reliable internet.' Ada: 'Then we should interview people at two stops.' Tutor: 'That gives useful detail, although two stops may not represent the whole route.' Later lecture: 'Counts record frequency; interviews explain motives. Combining methods can reveal why demand changes, but collecting both requires more staff time.'\n\nWhy does Ben question the online survey?",
    "options": [
      "It costs too much staff time",
      "It always produces false answers",
      "It may exclude people without reliable internet"
    ],
    "correct": 2,
    "explanation": "Ben identifies exclusion caused by internet access, not an absolute failure of surveys."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-listening-form-completion-content-02",
  "lessonId": "band2-listening-form-completion",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original educational transcript: Tutor: 'How will you investigate evening bus use?' Ada: 'An online survey would be quick.' Ben: 'But it excludes passengers without reliable internet.' Ada: 'Then we should interview people at two stops.' Tutor: 'That gives useful detail, although two stops may not represent the whole route.' Later lecture: 'Counts record frequency; interviews explain motives. Combining methods can reveal why demand changes, but collecting both requires more staff time.'\n\nWhat is the tutor’s attitude to interviews at two stops?",
    "options": [
      "Completely dismissive",
      "Positive with a representativeness concern",
      "Certain they represent every route"
    ],
    "correct": 1,
    "explanation": "“Useful detail” is positive; “may not represent” adds a limitation."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-listening-form-completion-content-03",
  "lessonId": "band2-listening-form-completion",
  "type": "fill-blank",
  "prompt": "Transcript study: “Counts record frequency; interviews explain motives.” Complete the note with ONE WORD.",
  "data": {
    "sentence": "Interviews explain passengers’ ____.",
    "answer": "motives",
    "hint": "Choose the noun for what interviews explain, rather than the measurement recorded by counts."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-listening-form-completion-content-04",
  "lessonId": "band2-listening-form-completion",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original educational transcript: Tutor: 'How will you investigate evening bus use?' Ada: 'An online survey would be quick.' Ben: 'But it excludes passengers without reliable internet.' Ada: 'Then we should interview people at two stops.' Tutor: 'That gives useful detail, although two stops may not represent the whole route.' Later lecture: 'Counts record frequency; interviews explain motives. Combining methods can reveal why demand changes, but collecting both requires more staff time.'\n\nWhat limitation applies to combining both methods?",
    "options": [
      "It eliminates explanations",
      "It requires more staff time",
      "It prevents passenger counts"
    ],
    "correct": 1,
    "explanation": "The final clause states that collecting both requires more staff time."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-reading-headings-content-01",
  "lessonId": "band2-reading-headings",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original reading: [A] Many seed libraries began as informal exchanges between neighbours. As participation increased, volunteers introduced catalogues and collection dates, turning small swaps into organised services. [B] Botanist Mira Cole recommends storing seeds in cool, dry conditions. Researcher Joel Reed instead studies how shared gardens help new residents meet people. [C] Coordinators report that donated seeds sometimes arrive without labels. They now ask donors to record the crop, harvest year and growing conditions.\n\nWhich heading best summarises paragraph A?",
    "options": [
      "From informal exchanges to organised services",
      "Why all seeds need chemical treatment",
      "The end of neighbourhood gardening"
    ],
    "correct": 0,
    "explanation": "A traces growth from small swaps to organised catalogued services."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-reading-headings-content-02",
  "lessonId": "band2-reading-headings",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original reading: [A] Many seed libraries began as informal exchanges between neighbours. As participation increased, volunteers introduced catalogues and collection dates, turning small swaps into organised services. [B] Botanist Mira Cole recommends storing seeds in cool, dry conditions. Researcher Joel Reed instead studies how shared gardens help new residents meet people. [C] Coordinators report that donated seeds sometimes arrive without labels. They now ask donors to record the crop, harvest year and growing conditions.\n\nWhich paragraph contains a problem caused by incomplete donations?",
    "options": [
      "C",
      "B",
      "A"
    ],
    "correct": 0,
    "explanation": "C describes donated seeds arriving without labels and the new donor requirements."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-reading-headings-content-03",
  "lessonId": "band2-reading-headings",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original reading: [A] Many seed libraries began as informal exchanges between neighbours. As participation increased, volunteers introduced catalogues and collection dates, turning small swaps into organised services. [B] Botanist Mira Cole recommends storing seeds in cool, dry conditions. Researcher Joel Reed instead studies how shared gardens help new residents meet people. [C] Coordinators report that donated seeds sometimes arrive without labels. They now ask donors to record the crop, harvest year and growing conditions.\n\nWho recommends cool, dry storage?",
    "options": [
      "Joel Reed",
      "The unnamed neighbours",
      "Mira Cole"
    ],
    "correct": 2,
    "explanation": "B explicitly attributes storage advice to Mira Cole."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-reading-headings-content-04",
  "lessonId": "band2-reading-headings",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original reading: [A] Many seed libraries began as informal exchanges between neighbours. As participation increased, volunteers introduced catalogues and collection dates, turning small swaps into organised services. [B] Botanist Mira Cole recommends storing seeds in cool, dry conditions. Researcher Joel Reed instead studies how shared gardens help new residents meet people. [C] Coordinators report that donated seeds sometimes arrive without labels. They now ask donors to record the crop, harvest year and growing conditions.\n\nWhat is Joel Reed’s research focus?",
    "options": [
      "How long seeds survive in a freezer",
      "How to print catalogues cheaply",
      "How gardens help new residents meet"
    ],
    "correct": 2,
    "explanation": "His work concerns social contact through shared gardens, not storage or printing."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-reading-mcq-content-01",
  "lessonId": "band2-reading-mcq",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original passage: The city tested quiet delivery vehicles on four streets for a month. Complaints fell on three streets, but rose on the fourth, where night deliveries became more frequent. The report suggests that scheduling matters alongside vehicle noise. Because the trial covered a small area, its authors recommend a larger study before a citywide rule is introduced.\n\nWhat is the report’s main conclusion?",
    "options": [
      "All night deliveries should end immediately",
      "Vehicle type alone guarantees silence",
      "Scheduling matters as well as vehicle noise"
    ],
    "correct": 2,
    "explanation": "The report explicitly considers scheduling alongside vehicle noise."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-reading-mcq-content-02",
  "lessonId": "band2-reading-mcq",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original passage: The city tested quiet delivery vehicles on four streets for a month. Complaints fell on three streets, but rose on the fourth, where night deliveries became more frequent. The report suggests that scheduling matters alongside vehicle noise. Because the trial covered a small area, its authors recommend a larger study before a citywide rule is introduced.\n\nWhy is a larger study recommended?",
    "options": [
      "The first trial covered a small area",
      "No residents submitted complaints",
      "The trial vehicles were all destroyed"
    ],
    "correct": 0,
    "explanation": "The authors connect their recommendation to the limited area covered."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-reading-mcq-content-03",
  "lessonId": "band2-reading-mcq",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original passage: The city tested quiet delivery vehicles on four streets for a month. Complaints fell on three streets, but rose on the fourth, where night deliveries became more frequent. The report suggests that scheduling matters alongside vehicle noise. Because the trial covered a small area, its authors recommend a larger study before a citywide rule is introduced.\n\nWhich statement is supported?",
    "options": [
      "Night deliveries decreased on the fourth street",
      "Complaints rose on one street",
      "Complaints fell on all four streets"
    ],
    "correct": 1,
    "explanation": "The fourth street had more complaints and more frequent night deliveries."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-reading-mcq-content-04",
  "lessonId": "band2-reading-mcq",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original passage: The city tested quiet delivery vehicles on four streets for a month. Complaints fell on three streets, but rose on the fourth, where night deliveries became more frequent. The report suggests that scheduling matters alongside vehicle noise. Because the trial covered a small area, its authors recommend a larger study before a citywide rule is introduced.\n\nWhich inference is most defensible?",
    "options": [
      "Quiet vehicles always fail",
      "Vehicle colour caused complaints",
      "Citywide conclusions need more evidence"
    ],
    "correct": 2,
    "explanation": "The authors recommend more research before a citywide rule; the alternatives overreach or invent a cause."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-writing-bar-pie-content-04",
  "lessonId": "band2-writing-bar-pie",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original fictional data: Travel to Northbank College in 2025. Bus:45% of students and 30% of staff. Bicycle:25% of students and 15% of staff. Walking:20% of students and 10% of staff. Car:10% of students and 45% of staff. Each group's shares total 100%; group sizes are not given.\n\nWhy can the number of student cyclists not be compared with staff cyclists?",
    "options": [
      "Cycling percentages are missing",
      "The categories overlap",
      "The total size of each group is not supplied"
    ],
    "correct": 2,
    "explanation": "25% and 15% use different unknown population totals."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-writing-letter-content-01",
  "lessonId": "band2-writing-letter",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original schematic: A park in 2010 had a pond in the north, a lawn in the centre, a car park in the east and an entrance in the south. In 2025 the pond and entrance remained. A playground replaced the central lawn, and bicycle parking replaced the eastern car park. Original process: used paper → sorting → pulping with water → filtering → pressing → drying → new paper.\n\nWhich change took place in the centre of the park?",
    "options": [
      "The lawn became a playground",
      "The entrance moved north",
      "The pond became a car park"
    ],
    "correct": 0,
    "explanation": "The central lawn was replaced by the playground; the pond and entrance remained."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-writing-letter-content-02",
  "lessonId": "band2-writing-letter",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original schematic: A park in 2010 had a pond in the north, a lawn in the centre, a car park in the east and an entrance in the south. In 2025 the pond and entrance remained. A playground replaced the central lawn, and bicycle parking replaced the eastern car park. Original process: used paper → sorting → pulping with water → filtering → pressing → drying → new paper.\n\nWhich sentence describes the eastern change correctly?",
    "options": [
      "Bicycle parking replaced the car park",
      "The car park replaced bicycle parking",
      "The playground moved east"
    ],
    "correct": 0,
    "explanation": "The old eastern car park became bicycle parking, not the reverse."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-writing-letter-content-03",
  "lessonId": "band2-writing-letter",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original schematic: A park in 2010 had a pond in the north, a lawn in the centre, a car park in the east and an entrance in the south. In 2025 the pond and entrance remained. A playground replaced the central lawn, and bicycle parking replaced the eastern car park. Original process: used paper → sorting → pulping with water → filtering → pressing → drying → new paper.\n\nWhich stage follows pulping and precedes pressing?",
    "options": [
      "New paper",
      "Drying",
      "Filtering"
    ],
    "correct": 2,
    "explanation": "The supplied sequence is pulping→filtering→pressing."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-writing-letter-content-04",
  "lessonId": "band2-writing-letter",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original schematic: A park in 2010 had a pond in the north, a lawn in the centre, a car park in the east and an entrance in the south. In 2025 the pond and entrance remained. A playground replaced the central lawn, and bicycle parking replaced the eastern car park. Original process: used paper → sorting → pulping with water → filtering → pressing → drying → new paper.\n\nWhich process statement invents information?",
    "options": [
      "The mixture is filtered before pressing",
      "The pulp is heated to 90°C",
      "Paper is sorted before pulping"
    ],
    "correct": 1,
    "explanation": "The process provides no temperature or heating stage."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-writing-opinion-content-03",
  "lessonId": "band2-writing-opinion",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original Task 2 prompt: Some people think universities should require every student to complete a community project. Others believe students should choose whether to participate. Discuss both views and give your own opinion.\n\nWhich example best develops an objection to a universal requirement?",
    "options": [
      "The campus has three buildings",
      "A working student cannot attend a fixed project session",
      "Some textbooks are expensive"
    ],
    "correct": 1,
    "explanation": "The work schedule shows how compulsory fixed attendance could burden a student."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-writing-opinion-content-04",
  "lessonId": "band2-writing-opinion",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original Task 2 prompt: Some people think universities should require every student to complete a community project. Others believe students should choose whether to participate. Discuss both views and give your own opinion.\n\nWhich development would rely on unsupported evidence?",
    "options": [
      "A hypothetical engineering project",
      "A clear explanation of scheduling constraints",
      "A claim that an unnamed study proves 97% support"
    ],
    "correct": 2,
    "explanation": "An invented study and precise statistic are not supplied evidence and should not be fabricated."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-writing-problem-solution-content-01",
  "lessonId": "band2-writing-problem-solution",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original prompts: [A] Many city residents struggle with expensive housing. What causes this problem, and what solutions could reduce it? [B] More employees work from home. Do the advantages outweigh the disadvantages? [C] Some museums offer free entry. Why do they do this, and is this a positive development?\n\nWhich solution matches a housing-supply cause in A?",
    "options": [
      "Adding homes near transport with infrastructure planning",
      "Changing museum opening hours",
      "Requiring everyone to work longer"
    ],
    "correct": 0,
    "explanation": "The proposal directly increases relevant housing supply; the alternatives do not address that cause."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-writing-problem-solution-content-02",
  "lessonId": "band2-writing-problem-solution",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original prompts: [A] Many city residents struggle with expensive housing. What causes this problem, and what solutions could reduce it? [B] More employees work from home. Do the advantages outweigh the disadvantages? [C] Some museums offer free entry. Why do they do this, and is this a positive development?\n\nWhat extra step does “outweigh” in B require?",
    "options": [
      "Only listing benefits",
      "Explaining why one side is more significant",
      "Avoiding all disadvantages"
    ],
    "correct": 1,
    "explanation": "A comparative judgement needs a reasoned weighting of benefits and drawbacks."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-writing-problem-solution-content-03",
  "lessonId": "band2-writing-problem-solution",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original prompts: [A] Many city residents struggle with expensive housing. What causes this problem, and what solutions could reduce it? [B] More employees work from home. Do the advantages outweigh the disadvantages? [C] Some museums offer free entry. Why do they do this, and is this a positive development?\n\nWhich plan covers both demands in C?",
    "options": [
      "Reasons for free entry plus evaluation of the policy",
      "Ticket prices with no reasons or judgement",
      "A history of painting only"
    ],
    "correct": 0,
    "explanation": "C asks why museums offer free entry and whether it is positive."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-writing-problem-solution-content-04",
  "lessonId": "band2-writing-problem-solution",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original prompts: [A] Many city residents struggle with expensive housing. What causes this problem, and what solutions could reduce it? [B] More employees work from home. Do the advantages outweigh the disadvantages? [C] Some museums offer free entry. Why do they do this, and is this a positive development?\n\nWhich claim is suitably qualified?",
    "options": [
      "Remote work benefits every employee without exception",
      "Remote work can help where roles and collaboration arrangements suit it",
      "Remote work eliminates all costs"
    ],
    "correct": 1,
    "explanation": "It acknowledges conditions and avoids unsupported absolutes."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-writing-cohesion-content-01",
  "lessonId": "band2-writing-cohesion",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original draft: “Many students live far from campus. This travel reduces time for study. However, a reliable bus service can shorten the journey. This improvement may therefore help students attend early classes.”\n\nWhat does “This improvement” refer to?",
    "options": [
      "A shorter journey from reliable bus service",
      "Higher tuition fees",
      "A new examination"
    ],
    "correct": 0,
    "explanation": "The immediately preceding sentence describes shortening the journey with reliable buses."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-writing-cohesion-content-02",
  "lessonId": "band2-writing-cohesion",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original draft: “Many students live far from campus. This travel reduces time for study. However, a reliable bus service can shorten the journey. This improvement may therefore help students attend early classes.”\n\nWhat relationship does “therefore” express?",
    "options": [
      "An unrelated example",
      "A result",
      "A contradiction"
    ],
    "correct": 1,
    "explanation": "The possible attendance benefit follows from the improved journey."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-writing-cohesion-content-03",
  "lessonId": "band2-writing-cohesion",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original draft: “Many students live far from campus. This travel reduces time for study. However, a reliable bus service can shorten the journey. This improvement may therefore help students attend early classes.”\n\nWhich revision keeps the meaning cautious?",
    "options": [
      "The service may help students attend early classes",
      "The service guarantees every student attends",
      "The service proves students never study"
    ],
    "correct": 0,
    "explanation": "“May help” preserves the passage’s qualified possible effect."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-writing-cohesion-content-04",
  "lessonId": "band2-writing-cohesion",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "A paragraph is fluent but discusses tourism when the essay asks about student transport.\n\nWhich issue remains?",
    "options": [
      "A missing mandatory connector quota",
      "Pronunciation only",
      "Task response: it does not address the question"
    ],
    "correct": 2,
    "explanation": "Fluent wording cannot compensate for an irrelevant response; task response concerns the actual demand."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-speaking-describe-content-01",
  "lessonId": "band2-speaking-describe",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original practice response: “The old library is a place I remember clearly. Although it was small, the reading room felt spacious because the windows faced a garden. I went there when I was preparing for an exam. The librarian helped me find a quiet desk, and I gradually learned to work without checking my phone.”\n\nWhich addition develops the experience rather than listing adjectives?",
    "options": [
      "How a quiet desk changed the speaker’s study habits",
      "A list of five unrelated buildings",
      "A claim that every library is perfect"
    ],
    "correct": 0,
    "explanation": "It explains the personal consequence of the event already described."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-speaking-describe-content-02",
  "lessonId": "band2-speaking-describe",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original practice response: “The old library is a place I remember clearly. Although it was small, the reading room felt spacious because the windows faced a garden. I went there when I was preparing for an exam. The librarian helped me find a quiet desk, and I gradually learned to work without checking my phone.”\n\nWhy is “although” useful in the first description?",
    "options": [
      "It proves the speaker has no pauses",
      "It introduces a contrast between small size and spacious feeling",
      "It marks a future prediction"
    ],
    "correct": 1,
    "explanation": "Small physical size contrasts with the perceived spaciousness."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-speaking-describe-content-03",
  "lessonId": "band2-speaking-describe",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original practice response: “The old library is a place I remember clearly. Although it was small, the reading room felt spacious because the windows faced a garden. I went there when I was preparing for an exam. The librarian helped me find a quiet desk, and I gradually learned to work without checking my phone.”\n\nWhat evidence is needed to review pronunciation?",
    "options": [
      "An actual recording or live speech",
      "Only a written word count",
      "The number of uncommon adjectives"
    ],
    "correct": 0,
    "explanation": "Sounds, stress and intelligibility cannot be established from text alone."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-speaking-describe-content-04",
  "lessonId": "band2-speaking-describe",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original practice response: “The old library is a place I remember clearly. Although it was small, the reading room felt spacious because the windows faced a garden. I went there when I was preparing for an exam. The librarian helped me find a quiet desk, and I gradually learned to work without checking my phone.”\n\nWhich self-repair preserves communication?",
    "options": [
      "Replacing every simple word before continuing",
      "“Last year—actually, two years ago—I studied there.”",
      "Restarting every sentence five times"
    ],
    "correct": 1,
    "explanation": "The short correction clarifies the date and allows the message to continue."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-speaking-integrated-content-01",
  "lessonId": "band2-speaking-integrated",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original Part 3 question: Why might local libraries still be useful when so much information is online? Model: “They can provide a reliable place to study, especially for people whose homes are crowded. For example, a student sharing a small flat may need somewhere quiet in the evening. Online resources are valuable, but they do not replace that physical space. The importance of libraries may therefore vary with local housing and access to other facilities.”\n\nWhat is the model’s central reason libraries can remain useful?",
    "options": [
      "All online information is false",
      "They provide physical study space",
      "Every home is overcrowded"
    ],
    "correct": 1,
    "explanation": "The answer focuses on a reliable place to study, especially where home space is limited."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-speaking-integrated-content-02",
  "lessonId": "band2-speaking-integrated",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original Part 3 question: Why might local libraries still be useful when so much information is online? Model: “They can provide a reliable place to study, especially for people whose homes are crowded. For example, a student sharing a small flat may need somewhere quiet in the evening. Online resources are valuable, but they do not replace that physical space. The importance of libraries may therefore vary with local housing and access to other facilities.”\n\nWhat does the shared-flat example do?",
    "options": [
      "It introduces an unrelated holiday",
      "It illustrates the need for quiet study space",
      "It proves every student rents a flat"
    ],
    "correct": 1,
    "explanation": "It makes the crowded-home mechanism concrete without claiming it applies to everyone."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-speaking-integrated-content-03",
  "lessonId": "band2-speaking-integrated",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original Part 3 question: Why might local libraries still be useful when so much information is online? Model: “They can provide a reliable place to study, especially for people whose homes are crowded. For example, a student sharing a small flat may need somewhere quiet in the evening. Online resources are valuable, but they do not replace that physical space. The importance of libraries may therefore vary with local housing and access to other facilities.”\n\nWhich qualification is relevant?",
    "options": [
      "Their importance can vary with local housing and facilities",
      "There is no possible reason for a library",
      "Libraries are always equally useful in every place"
    ],
    "correct": 0,
    "explanation": "The final sentence explicitly identifies local conditions that can alter the need."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-speaking-integrated-content-04",
  "lessonId": "band2-speaking-integrated",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original Part 3 question: Why might local libraries still be useful when so much information is online? Model: “They can provide a reliable place to study, especially for people whose homes are crowded. For example, a student sharing a small flat may need somewhere quiet in the evening. Online resources are valuable, but they do not replace that physical space. The importance of libraries may therefore vary with local housing and access to other facilities.”\n\nWhich follow-up best compares online services and libraries?",
    "options": [
      "A library has windows and my favourite meal is rice",
      "Online access is convenient, while a library also offers physical space",
      "Both must be identical in all functions"
    ],
    "correct": 1,
    "explanation": "It compares a shared information context while distinguishing a relevant additional function."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-grammar-complex-content-01",
  "lessonId": "band2-grammar-complex",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original Task 2 idea: Evening classes can widen access to education. Some adults cannot attend daytime sessions because they work. Flexible schedules help only when transport and childcare arrangements also make attendance possible.\n\nWhich sentence expresses a valid concession?",
    "options": [
      "Although evening classes widen access, childcare can still be a barrier",
      "Although classes exist, but adults work",
      "Because evening classes widen access."
    ],
    "correct": 0,
    "explanation": "It has a complete main clause and a single concession connector."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-grammar-complex-content-02",
  "lessonId": "band2-grammar-complex",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original Task 2 idea: Evening classes can widen access to education. Some adults cannot attend daytime sessions because they work. Flexible schedules help only when transport and childcare arrangements also make attendance possible.\n\nWhich addition supplies the missing main clause: “Because some adults work during the day...” ?",
    "options": [
      "which at university",
      "they prefer evening classes",
      "although nevertheless"
    ],
    "correct": 1,
    "explanation": "“They prefer evening classes” provides a subject and finite verb completing the reason relationship."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-grammar-complex-content-03",
  "lessonId": "band2-grammar-complex",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original Task 2 idea: Evening classes can widen access to education. Some adults cannot attend daytime sessions because they work. Flexible schedules help only when transport and childcare arrangements also make attendance possible.\n\nIn “Adults who work during the day may benefit”, what does the relative clause identify?",
    "options": [
      "The benefits of every course",
      "The transport timetable",
      "The adults under discussion"
    ],
    "correct": 2,
    "explanation": "“Who work during the day” modifies adults."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-grammar-complex-content-04",
  "lessonId": "band2-grammar-complex",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original Task 2 idea: Evening classes can widen access to education. Some adults cannot attend daytime sessions because they work. Flexible schedules help only when transport and childcare arrangements also make attendance possible.\n\nWhich condition follows from the source?",
    "options": [
      "Flexible schedules help when other attendance barriers are manageable",
      "Childcare is never relevant",
      "Flexible schedules remove every barrier"
    ],
    "correct": 0,
    "explanation": "The source explicitly makes transport and childcare relevant to attendance."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-vocab-collocations-content-01",
  "lessonId": "band2-vocab-collocations",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original data: Attendance rose from 200 in 2022 to 260 in 2023, then fell to 250 in 2024. The initial increase was 60 people; the final total remained 50 above the starting value.\n\nWhich sentence distinguishes change from endpoint?",
    "options": [
      "Attendance rose by 60 to 260 in 2023",
      "Attendance rose by 260 to 60 in 2023",
      "Attendance doubled to 260"
    ],
    "correct": 0,
    "explanation": "260−200=60;260 is the endpoint, and it is not double 200."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-vocab-collocations-content-02",
  "lessonId": "band2-vocab-collocations",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original data: Attendance rose from 200 in 2022 to 260 in 2023, then fell to 250 in 2024. The initial increase was 60 people; the final total remained 50 above the starting value.\n\nWhich noun construction is grammatical?",
    "options": [
      "There was a rose of 60",
      "Attendance an increase 60",
      "There was an increase of 60 in attendance"
    ],
    "correct": 2,
    "explanation": "Increase is the noun in the “there was” construction; rose is a verb form."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-vocab-collocations-content-03",
  "lessonId": "band2-vocab-collocations",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original data: Attendance rose from 200 in 2022 to 260 in 2023, then fell to 250 in 2024. The initial increase was 60 people; the final total remained 50 above the starting value.\n\nCompared with 2022, the 2024 figure was:",
    "options": [
      "10 higher",
      "50 higher",
      "60 lower"
    ],
    "correct": 1,
    "explanation": "250−200=50; the 10 difference compares 2024 with 2023 instead."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-vocab-collocations-content-04",
  "lessonId": "band2-vocab-collocations",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original data: Attendance rose from 200 in 2022 to 260 in 2023, then fell to 250 in 2024. The initial increase was 60 people; the final total remained 50 above the starting value.\n\nWhich description exaggerates the 2023→2024 change?",
    "options": [
      "A slight decline to 250",
      "A fall of 10",
      "Attendance collapsed to almost nothing"
    ],
    "correct": 2,
    "explanation": "250 is close to 260 and remains above the starting level, so collapse is misleading."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-vocab-environment-content-01",
  "lessonId": "band2-vocab-environment",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original Part 4-style transcript study: 'Urban trees can cool streets through shade and evaporation. Shade reduces direct sunlight reaching pavements. Evaporation transfers water from leaves into the air and uses energy. However, young trees need watering, and narrow streets may not have enough root space. Cooling therefore depends partly on species, maturity and local design.'\n\nWhich process uses energy according to the script?",
    "options": [
      "Evaporation",
      "Root storage",
      "Road widening"
    ],
    "correct": 0,
    "explanation": "The transcript explicitly connects evaporation with the use of energy."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-vocab-environment-content-02",
  "lessonId": "band2-vocab-environment",
  "type": "fill-blank",
  "prompt": "Transcript completion; ONE WORD: “Shade reduces direct sunlight reaching pavements.”",
  "data": {
    "sentence": "Shade reduces direct ____.",
    "answer": "sunlight",
    "hint": "Transfer the source noun naming what shade reduces; keep to one word."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-vocab-environment-content-03",
  "lessonId": "band2-vocab-environment",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original Part 4-style transcript study: 'Urban trees can cool streets through shade and evaporation. Shade reduces direct sunlight reaching pavements. Evaporation transfers water from leaves into the air and uses energy. However, young trees need watering, and narrow streets may not have enough root space. Cooling therefore depends partly on species, maturity and local design.'\n\nWhich practical constraint is mentioned?",
    "options": [
      "Every tree being fully mature",
      "A ban on all watering",
      "Insufficient root space in narrow streets"
    ],
    "correct": 2,
    "explanation": "Narrow streets may not provide enough root space; the source does not describe a watering ban."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-vocab-environment-content-04",
  "lessonId": "band2-vocab-environment",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original Part 4-style transcript study: 'Urban trees can cool streets through shade and evaporation. Shade reduces direct sunlight reaching pavements. Evaporation transfers water from leaves into the air and uses energy. However, young trees need watering, and narrow streets may not have enough root space. Cooling therefore depends partly on species, maturity and local design.'\n\nWhich summary preserves the qualification?",
    "options": [
      "Every tree cools every street equally",
      "Trees only cool through watering",
      "Cooling depends partly on species, maturity and design"
    ],
    "correct": 2,
    "explanation": "The final sentence explicitly lists factors affecting cooling."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-vocab-technology-content-01",
  "lessonId": "band2-vocab-technology",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original two-part Task 2 prompt: Digital services are increasingly used for public appointments. Why is this happening, and what can be done to avoid excluding people who struggle to use them?\n\nWhich plan covers the whole question?",
    "options": [
      "Only a history of computers",
      "Reasons for adoption plus measures to prevent exclusion",
      "Only the advantages of smartphones"
    ],
    "correct": 1,
    "explanation": "The prompt asks why appointments move online and how to avoid excluding some users."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-vocab-technology-content-02",
  "lessonId": "band2-vocab-technology",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original two-part Task 2 prompt: Digital services are increasingly used for public appointments. Why is this happening, and what can be done to avoid excluding people who struggle to use them?\n\nWhich measure directly helps someone without reliable internet?",
    "options": [
      "A telephone booking option",
      "More online-only passwords",
      "Removing all appointment staff"
    ],
    "correct": 0,
    "explanation": "Telephone access offers an alternative channel for the specified barrier."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-vocab-technology-content-03",
  "lessonId": "band2-vocab-technology",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original two-part Task 2 prompt: Digital services are increasingly used for public appointments. Why is this happening, and what can be done to avoid excluding people who struggle to use them?\n\nWhich claim is appropriately precise?",
    "options": [
      "Every older person cannot use technology",
      "All digital systems eliminate waiting",
      "Some users may need assisted booking"
    ],
    "correct": 2,
    "explanation": "It identifies possible support needs without an unsupported age stereotype or universal benefit."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-vocab-technology-content-04",
  "lessonId": "band2-vocab-technology",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original two-part Task 2 prompt: Digital services are increasingly used for public appointments. Why is this happening, and what can be done to avoid excluding people who struggle to use them?\n\nWhich reason explains adoption rather than merely praising it?",
    "options": [
      "Technology is wonderful",
      "User-entered details can reduce routine administration",
      "Everyone likes modern things"
    ],
    "correct": 1,
    "explanation": "It states a specific causal mechanism relevant to booking systems."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-mistakes-prepositions-content-01",
  "lessonId": "band2-mistakes-prepositions",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original Task 1 data: The participation rate rose from 30% to 45% between 2010 and 2020. The number of participants rose from 600 to 900. The survey concerned a training programme, not all residents.\n\nWhat is the rate increase in percentage points?",
    "options": [
      "300",
      "15",
      "50"
    ],
    "correct": 1,
    "explanation": "45−30=15 percentage points;50% is the relative change."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-mistakes-prepositions-content-02",
  "lessonId": "band2-mistakes-prepositions",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original Task 1 data: The participation rate rose from 30% to 45% between 2010 and 2020. The number of participants rose from 600 to 900. The survey concerned a training programme, not all residents.\n\nWhat is the increase in participant numbers?",
    "options": [
      "45% of all residents",
      "15 people",
      "300 people"
    ],
    "correct": 2,
    "explanation": "900−600=300 participants in the programme."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-mistakes-prepositions-content-03",
  "lessonId": "band2-mistakes-prepositions",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original Task 1 data: The participation rate rose from 30% to 45% between 2010 and 2020. The number of participants rose from 600 to 900. The survey concerned a training programme, not all residents.\n\nWhich report is accurate?",
    "options": [
      "The rate rose by 45 percentage points to 15%",
      "The rate rose to 300 people",
      "The rate rose by 15 percentage points to 45%"
    ],
    "correct": 2,
    "explanation": "The sentence keeps the difference and final rate in their correct roles."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-mistakes-prepositions-content-04",
  "lessonId": "band2-mistakes-prepositions",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Sentence: “According to the study’s results, participation increased.”\n\nWhich editing judgement is justified?",
    "options": [
      "It is grammatical attribution",
      "It is always a forbidden double possessive",
      "It must use a future tense"
    ],
    "correct": 0,
    "explanation": "“According to” can introduce the noun phrase “the study’s results”; no grammatical ban applies."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-mistakes-countable-content-01",
  "lessonId": "band2-mistakes-countable",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original programme notes: The team bought three microscopes and several chairs. The equipment arrived on Monday. Researchers collected information from 120 participants and conducted two studies. An adviser offered three practical suggestions about recruitment.\n\nWhich sentence uses equipment appropriately?",
    "options": [
      "The equipments were delivered",
      "The equipment was delivered",
      "Three equipment arrived"
    ],
    "correct": 1,
    "explanation": "Equipment is uncountable in this ordinary collective sense and takes singular agreement."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-mistakes-countable-content-02",
  "lessonId": "band2-mistakes-countable",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original programme notes: The team bought three microscopes and several chairs. The equipment arrived on Monday. Researchers collected information from 120 participants and conducted two studies. An adviser offered three practical suggestions about recruitment.\n\nWhich phrase accurately counts investigations?",
    "options": [
      "Two research",
      "Many informations",
      "Two studies"
    ],
    "correct": 2,
    "explanation": "Study is countable; research and information are uncountable in these senses."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-mistakes-countable-content-03",
  "lessonId": "band2-mistakes-countable",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original programme notes: The team bought three microscopes and several chairs. The equipment arrived on Monday. Researchers collected information from 120 participants and conducted two studies. An adviser offered three practical suggestions about recruitment.\n\nWhich revision preserves three pieces of advice?",
    "options": [
      "Much suggestion",
      "An advices",
      "Three practical suggestions"
    ],
    "correct": 2,
    "explanation": "Suggestion is countable, so “three practical suggestions” preserves the intended count."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-mistakes-countable-content-04",
  "lessonId": "band2-mistakes-countable",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original programme notes: The team bought three microscopes and several chairs. The equipment arrived on Monday. Researchers collected information from 120 participants and conducted two studies. An adviser offered three practical suggestions about recruitment.\n\nWhich quantifier fits microscopes in standard edited English?",
    "options": [
      "Fewer microscopes",
      "Less microscope",
      "Much microscopes"
    ],
    "correct": 0,
    "explanation": "Microscopes are countable plural items, so fewer is appropriate."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-practice-reading-content-01",
  "lessonId": "band2-practice-reading",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original Academic Reading practice passage: Restoring the Fenmere Canal (fictional case).\n[A] For decades the Fenmere Canal separated a residential district from a former industrial yard. When the factories closed, the towpath remained fenced off. Residents could see the water from nearby bridges but had no continuous route beside it. A neighbourhood group proposed reopening the path as a walking link between two bus stops. Its members argued that a modest connection would be more useful than an expensive visitor attraction.\n[B] Before work began, engineers surveyed the old canal wall. They found that a short northern section needed reinforcement, while the southern wall could remain unchanged. The council therefore divided the project into two phases. Access to the safe southern section opened first. This allowed residents to use part of the route while the northern repairs continued. The report gives no figures for how many people used the route during this phase.\n[C] The initial plan called for lamps along the whole towpath. Ecologists objected that bright lighting close to the water might disturb animals active at night. The final design used low lamps near the bus stops and reflective markers along the central stretch. A separate inspection was scheduled after dark to check whether the markers were easy for walkers to follow. The report did not claim that all wildlife would be unaffected.\n[D] Local businesses were invited to comment. A café owner, Mara Singh, supported an entrance near the southern bus stop because it would improve access for customers. Historian Ellis Venn proposed keeping the old loading crane as a reminder of the canal's industrial role. Engineer Nora Lake recommended removable panels beside a service gate so maintenance teams could reach the wall. Their suggestions concerned different functions and were assessed separately.\n[E] Volunteers then planted native vegetation in shallow beds beside the path. The planting was intended to stabilise the soil and provide varied habitat. However, the team deliberately left the central viewing area unplanted so visitors could still see the water. Species were selected for the site's wet conditions rather than for flower colour alone. This was a practical design choice, not evidence that the chosen plants would suit every canal.\n[F] The council's review describes the scheme as a useful improvement in local access. It also cautions against judging success only by the number of photographs shared online. According to the review, a route that residents use regularly can justify maintenance even if it attracts few tourists. Future inspections will examine the wall and the planting beds. Whether the path changes property prices is outside the review's scope.\n\nTRUE/FALSE/NOT GIVEN: Residents had a continuous towpath route before reopening.",
    "options": [
      "TRUE",
      "NOT GIVEN",
      "FALSE"
    ],
    "correct": 2,
    "explanation": "A says the towpath remained fenced off and residents had no continuous route."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-practice-reading-content-02",
  "lessonId": "band2-practice-reading",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original Academic Reading practice passage: Restoring the Fenmere Canal (fictional case).\n[A] For decades the Fenmere Canal separated a residential district from a former industrial yard. When the factories closed, the towpath remained fenced off. Residents could see the water from nearby bridges but had no continuous route beside it. A neighbourhood group proposed reopening the path as a walking link between two bus stops. Its members argued that a modest connection would be more useful than an expensive visitor attraction.\n[B] Before work began, engineers surveyed the old canal wall. They found that a short northern section needed reinforcement, while the southern wall could remain unchanged. The council therefore divided the project into two phases. Access to the safe southern section opened first. This allowed residents to use part of the route while the northern repairs continued. The report gives no figures for how many people used the route during this phase.\n[C] The initial plan called for lamps along the whole towpath. Ecologists objected that bright lighting close to the water might disturb animals active at night. The final design used low lamps near the bus stops and reflective markers along the central stretch. A separate inspection was scheduled after dark to check whether the markers were easy for walkers to follow. The report did not claim that all wildlife would be unaffected.\n[D] Local businesses were invited to comment. A café owner, Mara Singh, supported an entrance near the southern bus stop because it would improve access for customers. Historian Ellis Venn proposed keeping the old loading crane as a reminder of the canal's industrial role. Engineer Nora Lake recommended removable panels beside a service gate so maintenance teams could reach the wall. Their suggestions concerned different functions and were assessed separately.\n[E] Volunteers then planted native vegetation in shallow beds beside the path. The planting was intended to stabilise the soil and provide varied habitat. However, the team deliberately left the central viewing area unplanted so visitors could still see the water. Species were selected for the site's wet conditions rather than for flower colour alone. This was a practical design choice, not evidence that the chosen plants would suit every canal.\n[F] The council's review describes the scheme as a useful improvement in local access. It also cautions against judging success only by the number of photographs shared online. According to the review, a route that residents use regularly can justify maintenance even if it attracts few tourists. Future inspections will examine the wall and the planting beds. Whether the path changes property prices is outside the review's scope.\n\nTRUE/FALSE/NOT GIVEN: The whole canal wall required reinforcement.",
    "options": [
      "NOT GIVEN",
      "FALSE",
      "TRUE"
    ],
    "correct": 1,
    "explanation": "B limits reinforcement to a short northern section and says the southern wall could remain."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-practice-reading-content-03",
  "lessonId": "band2-practice-reading",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original Academic Reading practice passage: Restoring the Fenmere Canal (fictional case).\n[A] For decades the Fenmere Canal separated a residential district from a former industrial yard. When the factories closed, the towpath remained fenced off. Residents could see the water from nearby bridges but had no continuous route beside it. A neighbourhood group proposed reopening the path as a walking link between two bus stops. Its members argued that a modest connection would be more useful than an expensive visitor attraction.\n[B] Before work began, engineers surveyed the old canal wall. They found that a short northern section needed reinforcement, while the southern wall could remain unchanged. The council therefore divided the project into two phases. Access to the safe southern section opened first. This allowed residents to use part of the route while the northern repairs continued. The report gives no figures for how many people used the route during this phase.\n[C] The initial plan called for lamps along the whole towpath. Ecologists objected that bright lighting close to the water might disturb animals active at night. The final design used low lamps near the bus stops and reflective markers along the central stretch. A separate inspection was scheduled after dark to check whether the markers were easy for walkers to follow. The report did not claim that all wildlife would be unaffected.\n[D] Local businesses were invited to comment. A café owner, Mara Singh, supported an entrance near the southern bus stop because it would improve access for customers. Historian Ellis Venn proposed keeping the old loading crane as a reminder of the canal's industrial role. Engineer Nora Lake recommended removable panels beside a service gate so maintenance teams could reach the wall. Their suggestions concerned different functions and were assessed separately.\n[E] Volunteers then planted native vegetation in shallow beds beside the path. The planting was intended to stabilise the soil and provide varied habitat. However, the team deliberately left the central viewing area unplanted so visitors could still see the water. Species were selected for the site's wet conditions rather than for flower colour alone. This was a practical design choice, not evidence that the chosen plants would suit every canal.\n[F] The council's review describes the scheme as a useful improvement in local access. It also cautions against judging success only by the number of photographs shared online. According to the review, a route that residents use regularly can justify maintenance even if it attracts few tourists. Future inspections will examine the wall and the planting beds. Whether the path changes property prices is outside the review's scope.\n\nTRUE/FALSE/NOT GIVEN: More than 500 people used the southern section in its first week.",
    "options": [
      "NOT GIVEN",
      "FALSE",
      "TRUE"
    ],
    "correct": 0,
    "explanation": "B explicitly supplies no usage figures; no first-week total is reported."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-practice-reading-content-04",
  "lessonId": "band2-practice-reading",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original Academic Reading practice passage: Restoring the Fenmere Canal (fictional case).\n[A] For decades the Fenmere Canal separated a residential district from a former industrial yard. When the factories closed, the towpath remained fenced off. Residents could see the water from nearby bridges but had no continuous route beside it. A neighbourhood group proposed reopening the path as a walking link between two bus stops. Its members argued that a modest connection would be more useful than an expensive visitor attraction.\n[B] Before work began, engineers surveyed the old canal wall. They found that a short northern section needed reinforcement, while the southern wall could remain unchanged. The council therefore divided the project into two phases. Access to the safe southern section opened first. This allowed residents to use part of the route while the northern repairs continued. The report gives no figures for how many people used the route during this phase.\n[C] The initial plan called for lamps along the whole towpath. Ecologists objected that bright lighting close to the water might disturb animals active at night. The final design used low lamps near the bus stops and reflective markers along the central stretch. A separate inspection was scheduled after dark to check whether the markers were easy for walkers to follow. The report did not claim that all wildlife would be unaffected.\n[D] Local businesses were invited to comment. A café owner, Mara Singh, supported an entrance near the southern bus stop because it would improve access for customers. Historian Ellis Venn proposed keeping the old loading crane as a reminder of the canal's industrial role. Engineer Nora Lake recommended removable panels beside a service gate so maintenance teams could reach the wall. Their suggestions concerned different functions and were assessed separately.\n[E] Volunteers then planted native vegetation in shallow beds beside the path. The planting was intended to stabilise the soil and provide varied habitat. However, the team deliberately left the central viewing area unplanted so visitors could still see the water. Species were selected for the site's wet conditions rather than for flower colour alone. This was a practical design choice, not evidence that the chosen plants would suit every canal.\n[F] The council's review describes the scheme as a useful improvement in local access. It also cautions against judging success only by the number of photographs shared online. According to the review, a route that residents use regularly can justify maintenance even if it attracts few tourists. Future inspections will examine the wall and the planting beds. Whether the path changes property prices is outside the review's scope.\n\nYES/NO/NOT GIVEN: The review considers regular local use a possible justification for maintenance.",
    "options": [
      "YES",
      "NOT GIVEN",
      "NO"
    ],
    "correct": 0,
    "explanation": "F says regular resident use can justify maintenance even with few tourists."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-practice-reading-content-05",
  "lessonId": "band2-practice-reading",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original Academic Reading practice passage: Restoring the Fenmere Canal (fictional case).\n[A] For decades the Fenmere Canal separated a residential district from a former industrial yard. When the factories closed, the towpath remained fenced off. Residents could see the water from nearby bridges but had no continuous route beside it. A neighbourhood group proposed reopening the path as a walking link between two bus stops. Its members argued that a modest connection would be more useful than an expensive visitor attraction.\n[B] Before work began, engineers surveyed the old canal wall. They found that a short northern section needed reinforcement, while the southern wall could remain unchanged. The council therefore divided the project into two phases. Access to the safe southern section opened first. This allowed residents to use part of the route while the northern repairs continued. The report gives no figures for how many people used the route during this phase.\n[C] The initial plan called for lamps along the whole towpath. Ecologists objected that bright lighting close to the water might disturb animals active at night. The final design used low lamps near the bus stops and reflective markers along the central stretch. A separate inspection was scheduled after dark to check whether the markers were easy for walkers to follow. The report did not claim that all wildlife would be unaffected.\n[D] Local businesses were invited to comment. A café owner, Mara Singh, supported an entrance near the southern bus stop because it would improve access for customers. Historian Ellis Venn proposed keeping the old loading crane as a reminder of the canal's industrial role. Engineer Nora Lake recommended removable panels beside a service gate so maintenance teams could reach the wall. Their suggestions concerned different functions and were assessed separately.\n[E] Volunteers then planted native vegetation in shallow beds beside the path. The planting was intended to stabilise the soil and provide varied habitat. However, the team deliberately left the central viewing area unplanted so visitors could still see the water. Species were selected for the site's wet conditions rather than for flower colour alone. This was a practical design choice, not evidence that the chosen plants would suit every canal.\n[F] The council's review describes the scheme as a useful improvement in local access. It also cautions against judging success only by the number of photographs shared online. According to the review, a route that residents use regularly can justify maintenance even if it attracts few tourists. Future inspections will examine the wall and the planting beds. Whether the path changes property prices is outside the review's scope.\n\nYES/NO/NOT GIVEN: The review believes online photograph counts alone are sufficient to judge success.",
    "options": [
      "NOT GIVEN",
      "NO",
      "YES"
    ],
    "correct": 1,
    "explanation": "F explicitly cautions against judging success only by shared photographs."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-practice-reading-content-06",
  "lessonId": "band2-practice-reading",
  "type": "fill-blank",
  "prompt": "Use ONE WORD from paragraph B: “the southern wall could remain unchanged”.",
  "data": {
    "sentence": "The southern wall could remain ____.",
    "answer": "unchanged",
    "hint": "Copy the adjective after remain in the cited sentence; contrast the northern repairs with the southern wall."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-practice-reading-content-07",
  "lessonId": "band2-practice-reading",
  "type": "fill-blank",
  "prompt": "Use TWO WORDS from paragraph C: “reflective markers along the central stretch”.",
  "data": {
    "sentence": "The central stretch used ____.",
    "answer": "reflective markers",
    "hint": "Copy the two-word phrase identifying the central lighting alternative, preserving its plural form."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-practice-reading-content-08",
  "lessonId": "band2-practice-reading",
  "type": "fill-blank",
  "prompt": "Use ONE WORD from paragraph E: “intended to stabilise the soil”.",
  "data": {
    "sentence": "Planting aimed to stabilise the ____.",
    "answer": "soil",
    "hint": "Choose the one-word object of stabilise in the cited sentence, rather than inventing another material."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-practice-reading-content-09",
  "lessonId": "band2-practice-reading",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original Academic Reading practice passage: Restoring the Fenmere Canal (fictional case).\n[A] For decades the Fenmere Canal separated a residential district from a former industrial yard. When the factories closed, the towpath remained fenced off. Residents could see the water from nearby bridges but had no continuous route beside it. A neighbourhood group proposed reopening the path as a walking link between two bus stops. Its members argued that a modest connection would be more useful than an expensive visitor attraction.\n[B] Before work began, engineers surveyed the old canal wall. They found that a short northern section needed reinforcement, while the southern wall could remain unchanged. The council therefore divided the project into two phases. Access to the safe southern section opened first. This allowed residents to use part of the route while the northern repairs continued. The report gives no figures for how many people used the route during this phase.\n[C] The initial plan called for lamps along the whole towpath. Ecologists objected that bright lighting close to the water might disturb animals active at night. The final design used low lamps near the bus stops and reflective markers along the central stretch. A separate inspection was scheduled after dark to check whether the markers were easy for walkers to follow. The report did not claim that all wildlife would be unaffected.\n[D] Local businesses were invited to comment. A café owner, Mara Singh, supported an entrance near the southern bus stop because it would improve access for customers. Historian Ellis Venn proposed keeping the old loading crane as a reminder of the canal's industrial role. Engineer Nora Lake recommended removable panels beside a service gate so maintenance teams could reach the wall. Their suggestions concerned different functions and were assessed separately.\n[E] Volunteers then planted native vegetation in shallow beds beside the path. The planting was intended to stabilise the soil and provide varied habitat. However, the team deliberately left the central viewing area unplanted so visitors could still see the water. Species were selected for the site's wet conditions rather than for flower colour alone. This was a practical design choice, not evidence that the chosen plants would suit every canal.\n[F] The council's review describes the scheme as a useful improvement in local access. It also cautions against judging success only by the number of photographs shared online. According to the review, a route that residents use regularly can justify maintenance even if it attracts few tourists. Future inspections will examine the wall and the planting beds. Whether the path changes property prices is outside the review's scope.\n\nWhich paragraph explains why work was divided into phases?",
    "options": [
      "B",
      "D",
      "F"
    ],
    "correct": 0,
    "explanation": "B links the wall survey with opening the safe southern section first."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-practice-reading-content-10",
  "lessonId": "band2-practice-reading",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original Academic Reading practice passage: Restoring the Fenmere Canal (fictional case).\n[A] For decades the Fenmere Canal separated a residential district from a former industrial yard. When the factories closed, the towpath remained fenced off. Residents could see the water from nearby bridges but had no continuous route beside it. A neighbourhood group proposed reopening the path as a walking link between two bus stops. Its members argued that a modest connection would be more useful than an expensive visitor attraction.\n[B] Before work began, engineers surveyed the old canal wall. They found that a short northern section needed reinforcement, while the southern wall could remain unchanged. The council therefore divided the project into two phases. Access to the safe southern section opened first. This allowed residents to use part of the route while the northern repairs continued. The report gives no figures for how many people used the route during this phase.\n[C] The initial plan called for lamps along the whole towpath. Ecologists objected that bright lighting close to the water might disturb animals active at night. The final design used low lamps near the bus stops and reflective markers along the central stretch. A separate inspection was scheduled after dark to check whether the markers were easy for walkers to follow. The report did not claim that all wildlife would be unaffected.\n[D] Local businesses were invited to comment. A café owner, Mara Singh, supported an entrance near the southern bus stop because it would improve access for customers. Historian Ellis Venn proposed keeping the old loading crane as a reminder of the canal's industrial role. Engineer Nora Lake recommended removable panels beside a service gate so maintenance teams could reach the wall. Their suggestions concerned different functions and were assessed separately.\n[E] Volunteers then planted native vegetation in shallow beds beside the path. The planting was intended to stabilise the soil and provide varied habitat. However, the team deliberately left the central viewing area unplanted so visitors could still see the water. Species were selected for the site's wet conditions rather than for flower colour alone. This was a practical design choice, not evidence that the chosen plants would suit every canal.\n[F] The council's review describes the scheme as a useful improvement in local access. It also cautions against judging success only by the number of photographs shared online. According to the review, a route that residents use regularly can justify maintenance even if it attracts few tourists. Future inspections will examine the wall and the planting beds. Whether the path changes property prices is outside the review's scope.\n\nWho proposed preserving the loading crane?",
    "options": [
      "Ellis Venn",
      "Nora Lake",
      "Mara Singh"
    ],
    "correct": 0,
    "explanation": "D attributes the historical-preservation proposal to Ellis Venn."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-practice-reading-content-11",
  "lessonId": "band2-practice-reading",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original Academic Reading practice passage: Restoring the Fenmere Canal (fictional case).\n[A] For decades the Fenmere Canal separated a residential district from a former industrial yard. When the factories closed, the towpath remained fenced off. Residents could see the water from nearby bridges but had no continuous route beside it. A neighbourhood group proposed reopening the path as a walking link between two bus stops. Its members argued that a modest connection would be more useful than an expensive visitor attraction.\n[B] Before work began, engineers surveyed the old canal wall. They found that a short northern section needed reinforcement, while the southern wall could remain unchanged. The council therefore divided the project into two phases. Access to the safe southern section opened first. This allowed residents to use part of the route while the northern repairs continued. The report gives no figures for how many people used the route during this phase.\n[C] The initial plan called for lamps along the whole towpath. Ecologists objected that bright lighting close to the water might disturb animals active at night. The final design used low lamps near the bus stops and reflective markers along the central stretch. A separate inspection was scheduled after dark to check whether the markers were easy for walkers to follow. The report did not claim that all wildlife would be unaffected.\n[D] Local businesses were invited to comment. A café owner, Mara Singh, supported an entrance near the southern bus stop because it would improve access for customers. Historian Ellis Venn proposed keeping the old loading crane as a reminder of the canal's industrial role. Engineer Nora Lake recommended removable panels beside a service gate so maintenance teams could reach the wall. Their suggestions concerned different functions and were assessed separately.\n[E] Volunteers then planted native vegetation in shallow beds beside the path. The planting was intended to stabilise the soil and provide varied habitat. However, the team deliberately left the central viewing area unplanted so visitors could still see the water. Species were selected for the site's wet conditions rather than for flower colour alone. This was a practical design choice, not evidence that the chosen plants would suit every canal.\n[F] The council's review describes the scheme as a useful improvement in local access. It also cautions against judging success only by the number of photographs shared online. According to the review, a route that residents use regularly can justify maintenance even if it attracts few tourists. Future inspections will examine the wall and the planting beds. Whether the path changes property prices is outside the review's scope.\n\nWhich heading best summarises paragraph C?",
    "options": [
      "Why every canal needs bright lamps",
      "Adjusting lighting to balance access and ecology",
      "The end of all night inspections"
    ],
    "correct": 1,
    "explanation": "C explains how wildlife concerns changed the illumination plan."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-practice-reading-content-12",
  "lessonId": "band2-practice-reading",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original Academic Reading practice passage: Restoring the Fenmere Canal (fictional case).\n[A] For decades the Fenmere Canal separated a residential district from a former industrial yard. When the factories closed, the towpath remained fenced off. Residents could see the water from nearby bridges but had no continuous route beside it. A neighbourhood group proposed reopening the path as a walking link between two bus stops. Its members argued that a modest connection would be more useful than an expensive visitor attraction.\n[B] Before work began, engineers surveyed the old canal wall. They found that a short northern section needed reinforcement, while the southern wall could remain unchanged. The council therefore divided the project into two phases. Access to the safe southern section opened first. This allowed residents to use part of the route while the northern repairs continued. The report gives no figures for how many people used the route during this phase.\n[C] The initial plan called for lamps along the whole towpath. Ecologists objected that bright lighting close to the water might disturb animals active at night. The final design used low lamps near the bus stops and reflective markers along the central stretch. A separate inspection was scheduled after dark to check whether the markers were easy for walkers to follow. The report did not claim that all wildlife would be unaffected.\n[D] Local businesses were invited to comment. A café owner, Mara Singh, supported an entrance near the southern bus stop because it would improve access for customers. Historian Ellis Venn proposed keeping the old loading crane as a reminder of the canal's industrial role. Engineer Nora Lake recommended removable panels beside a service gate so maintenance teams could reach the wall. Their suggestions concerned different functions and were assessed separately.\n[E] Volunteers then planted native vegetation in shallow beds beside the path. The planting was intended to stabilise the soil and provide varied habitat. However, the team deliberately left the central viewing area unplanted so visitors could still see the water. Species were selected for the site's wet conditions rather than for flower colour alone. This was a practical design choice, not evidence that the chosen plants would suit every canal.\n[F] The council's review describes the scheme as a useful improvement in local access. It also cautions against judging success only by the number of photographs shared online. According to the review, a route that residents use regularly can justify maintenance even if it attracts few tourists. Future inspections will examine the wall and the planting beds. Whether the path changes property prices is outside the review's scope.\n\nWhy was the central viewing area left unplanted?",
    "options": [
      "To preserve a view of the water",
      "To add another car park",
      "Because all native plants failed"
    ],
    "correct": 0,
    "explanation": "E states that visitors should still be able to see the water."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-practice-reading-content-13",
  "lessonId": "band2-practice-reading",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original Academic Reading practice passage: Restoring the Fenmere Canal (fictional case).\n[A] For decades the Fenmere Canal separated a residential district from a former industrial yard. When the factories closed, the towpath remained fenced off. Residents could see the water from nearby bridges but had no continuous route beside it. A neighbourhood group proposed reopening the path as a walking link between two bus stops. Its members argued that a modest connection would be more useful than an expensive visitor attraction.\n[B] Before work began, engineers surveyed the old canal wall. They found that a short northern section needed reinforcement, while the southern wall could remain unchanged. The council therefore divided the project into two phases. Access to the safe southern section opened first. This allowed residents to use part of the route while the northern repairs continued. The report gives no figures for how many people used the route during this phase.\n[C] The initial plan called for lamps along the whole towpath. Ecologists objected that bright lighting close to the water might disturb animals active at night. The final design used low lamps near the bus stops and reflective markers along the central stretch. A separate inspection was scheduled after dark to check whether the markers were easy for walkers to follow. The report did not claim that all wildlife would be unaffected.\n[D] Local businesses were invited to comment. A café owner, Mara Singh, supported an entrance near the southern bus stop because it would improve access for customers. Historian Ellis Venn proposed keeping the old loading crane as a reminder of the canal's industrial role. Engineer Nora Lake recommended removable panels beside a service gate so maintenance teams could reach the wall. Their suggestions concerned different functions and were assessed separately.\n[E] Volunteers then planted native vegetation in shallow beds beside the path. The planting was intended to stabilise the soil and provide varied habitat. However, the team deliberately left the central viewing area unplanted so visitors could still see the water. Species were selected for the site's wet conditions rather than for flower colour alone. This was a practical design choice, not evidence that the chosen plants would suit every canal.\n[F] The council's review describes the scheme as a useful improvement in local access. It also cautions against judging success only by the number of photographs shared online. According to the review, a route that residents use regularly can justify maintenance even if it attracts few tourists. Future inspections will examine the wall and the planting beds. Whether the path changes property prices is outside the review's scope.\n\nWhich conclusion is most defensible?",
    "options": [
      "Every wall repair was unnecessary",
      "The scheme proved property prices doubled",
      "The review prioritises practical local use over publicity alone"
    ],
    "correct": 2,
    "explanation": "F values regular access and explicitly excludes property-price effects."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-review-content-01",
  "lessonId": "band2-review",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original review scenario: A learner writes 160 words for Task 1 and 265 for Task 2, answers eight of ten reading drill questions correctly, and chooses strong speaking plans in text quizzes. No spoken recording or teacher review is available.\n\nWhat does the reading result directly establish?",
    "options": [
      "An official Band 8 result",
      "A pronunciation score",
      "Eight correct answers in this ten-item drill"
    ],
    "correct": 2,
    "explanation": "It is raw local accuracy; the small original set is not calibrated to IELTS bands."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-review-content-02",
  "lessonId": "band2-review",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original review scenario: A learner writes 160 words for Task 1 and 265 for Task 2, answers eight of ten reading drill questions correctly, and chooses strong speaking plans in text quizzes. No spoken recording or teacher review is available.\n\nWhat do the written word counts establish?",
    "options": [
      "They automatically receive Band 8",
      "They necessarily answer every demand",
      "The responses meet their minimum lengths"
    ],
    "correct": 2,
    "explanation": "160 and 265 exceed 150 and 250, but quality and task fulfilment still need review."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-review-content-03",
  "lessonId": "band2-review",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original review scenario: A learner writes 160 words for Task 1 and 265 for Task 2, answers eight of ten reading drill questions correctly, and chooses strong speaking plans in text quizzes. No spoken recording or teacher review is available.\n\nWhat is needed to review pronunciation?",
    "options": [
      "The number of essay paragraphs",
      "Actual spoken performance",
      "More text-choice quizzes alone"
    ],
    "correct": 1,
    "explanation": "Pronunciation concerns sounds and intelligibility, which text-only answers do not reveal."
  },
  "xpReward": 15
},
{
  "id": "ex-band2-review-content-04",
  "lessonId": "band2-review",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original review scenario: A learner writes 160 words for Task 1 and 265 for Task 2, answers eight of ten reading drill questions correctly, and chooses strong speaking plans in text quizzes. No spoken recording or teacher review is available.\n\nWhich next step produces useful improvement evidence?",
    "options": [
      "Memorise every model word for word",
      "Revise a response after criterion-based feedback",
      "Award a band from XP"
    ],
    "correct": 1,
    "explanation": "A revised actual response can be compared against specific feedback; XP and memorisation do not establish proficiency."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-listening-section3-content-02",
  "lessonId": "band3-listening-section3",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original transcript study: A student asks, 'Could you tell me where to collect the fieldwork forms?' A staff member replies, 'At the science office, just opposite the stairs. It closes at four today.' A second student asks, 'Would you mind checking this application before I submit it?' The tutor says, 'Of course—send me the final draft this afternoon.'\n\nWhat does “Would you mind checking this application?” do?",
    "options": [
      "Rejects an offer",
      "Asks about the tutor’s hobbies",
      "Makes a polite request"
    ],
    "correct": 2,
    "explanation": "It asks the tutor to review the application before submission."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-listening-section3-content-03",
  "lessonId": "band3-listening-section3",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original transcript study: A student asks, 'Could you tell me where to collect the fieldwork forms?' A staff member replies, 'At the science office, just opposite the stairs. It closes at four today.' A second student asks, 'Would you mind checking this application before I submit it?' The tutor says, 'Of course—send me the final draft this afternoon.'\n\nWhat should the second student send?",
    "options": [
      "The final draft this afternoon",
      "An old receipt next month",
      "The stairs"
    ],
    "correct": 0,
    "explanation": "The tutor explicitly requests the final draft this afternoon."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-listening-section3-content-04",
  "lessonId": "band3-listening-section3",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original transcript study: A student asks, 'Could you tell me where to collect the fieldwork forms?' A staff member replies, 'At the science office, just opposite the stairs. It closes at four today.' A second student asks, 'Would you mind checking this application before I submit it?' The tutor says, 'Of course—send me the final draft this afternoon.'\n\nWhich reply fits “When does the office close today?”",
    "options": [
      "The application is blue",
      "At four",
      "Opposite the stairs"
    ],
    "correct": 1,
    "explanation": "When asks for a time, not a location or description."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-listening-multiple-speakers-content-01",
  "lessonId": "band3-listening-multiple-speakers",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original conversation transcript: Student: 'I booked a quiet room for our project interview, but the booking system now shows maintenance.' Assistant: 'The room is unavailable on Wednesday. There is a smaller room on Thursday afternoon.' Student: 'Our guest is only free on Wednesday.' Assistant: 'Then use the media booth. It has sound insulation, but you will need to borrow a portable recorder.' Student: 'That should work. How do I reserve it?'\n\nWhy is Thursday’s room unsuitable?",
    "options": [
      "The student dislikes afternoon work",
      "The guest is only free on Wednesday",
      "It has no chairs"
    ],
    "correct": 1,
    "explanation": "The guest’s availability is the explicit constraint."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-listening-multiple-speakers-content-02",
  "lessonId": "band3-listening-multiple-speakers",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original conversation transcript: Student: 'I booked a quiet room for our project interview, but the booking system now shows maintenance.' Assistant: 'The room is unavailable on Wednesday. There is a smaller room on Thursday afternoon.' Student: 'Our guest is only free on Wednesday.' Assistant: 'Then use the media booth. It has sound insulation, but you will need to borrow a portable recorder.' Student: 'That should work. How do I reserve it?'\n\nWhich solution does the student appear to accept?",
    "options": [
      "The Thursday room",
      "Cancelling the project",
      "The media booth"
    ],
    "correct": 2,
    "explanation": "“That should work” follows the booth proposal, and the student asks how to reserve it."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-listening-multiple-speakers-content-03",
  "lessonId": "band3-listening-multiple-speakers",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original conversation transcript: Student: 'I booked a quiet room for our project interview, but the booking system now shows maintenance.' Assistant: 'The room is unavailable on Wednesday. There is a smaller room on Thursday afternoon.' Student: 'Our guest is only free on Wednesday.' Assistant: 'Then use the media booth. It has sound insulation, but you will need to borrow a portable recorder.' Student: 'That should work. How do I reserve it?'\n\nWhat additional equipment is needed?",
    "options": [
      "A new maintenance system",
      "A portable recorder",
      "A projector already installed in the booth"
    ],
    "correct": 1,
    "explanation": "The assistant says the student will need to borrow a portable recorder."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-listening-multiple-speakers-content-04",
  "lessonId": "band3-listening-multiple-speakers",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original conversation transcript: Student: 'I booked a quiet room for our project interview, but the booking system now shows maintenance.' Assistant: 'The room is unavailable on Wednesday. There is a smaller room on Thursday afternoon.' Student: 'Our guest is only free on Wednesday.' Assistant: 'Then use the media booth. It has sound insulation, but you will need to borrow a portable recorder.' Student: 'That should work. How do I reserve it?'\n\nWhich inference is supported by the final question?",
    "options": [
      "The guest has changed to Thursday",
      "The booth has already been booked successfully",
      "The student intends to reserve the booth"
    ],
    "correct": 2,
    "explanation": "Asking how to reserve it indicates intention, not a completed reservation or changed guest availability."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-reading-summary-completion-content-01",
  "lessonId": "band3-reading-summary-completion",
  "type": "fill-blank",
  "prompt": "Original Complete the Words practice passage: A campus garden provides space for small experiments. Students comp____ observations before they draw conclu____. They record changes at reg____ intervals so that results from different weeks can be compared. The teacher checks each record for accu____ before the group discusses its findings.\nMissing letters only after the stem comp:",
  "data": {
    "sentence": "Students comp____ observations.",
    "answer": "are",
    "hint": "Identify the present-tense verb describing what students do with observations. Enter only the missing ending after the supplied stem."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-reading-summary-completion-content-02",
  "lessonId": "band3-reading-summary-completion",
  "type": "fill-blank",
  "prompt": "Original Complete the Words practice passage: A campus garden provides space for small experiments. Students comp____ observations before they draw conclu____. They record changes at reg____ intervals so that results from different weeks can be compared. The teacher checks each record for accu____ before the group discusses its findings.\nMissing letters only after the stem conclu:",
  "data": {
    "sentence": "They draw conclu____.",
    "answer": "sions",
    "hint": "Use a plural noun in the natural draw+result collocation. Enter only the letters missing after the supplied stem."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-reading-summary-completion-content-03",
  "lessonId": "band3-reading-summary-completion",
  "type": "fill-blank",
  "prompt": "Original Complete the Words practice passage: A campus garden provides space for small experiments. Students comp____ observations before they draw conclu____. They record changes at reg____ intervals so that results from different weeks can be compared. The teacher checks each record for accu____ before the group discusses its findings.\nMissing letters only after the stem reg:",
  "data": {
    "sentence": "Measurements occur at reg____ intervals.",
    "answer": "ular",
    "hint": "The noun intervals needs an adjective indicating a repeated pattern. Enter the ending that makes that adjective."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-reading-summary-completion-content-04",
  "lessonId": "band3-reading-summary-completion",
  "type": "fill-blank",
  "prompt": "Original Complete the Words practice passage: A campus garden provides space for small experiments. Students comp____ observations before they draw conclu____. They record changes at reg____ intervals so that results from different weeks can be compared. The teacher checks each record for accu____ before the group discusses its findings.\nMissing letters only after the stem accu:",
  "data": {
    "sentence": "Records are checked for accu____.",
    "answer": "racy",
    "hint": "The phrase for requires a noun naming the quality checked in the records. Use meaning and the supplied letters together."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-reading-matching-features-content-01",
  "lessonId": "band3-reading-matching-features",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original daily-life notice: Equipment loans: Students may borrow a camera for up to three days. Collect reserved items between 12 and 2 pm at the media desk. Returns must be made in person before 4 pm on the due date. Do not place equipment in the book-return slot. For renewals, contact the desk before the due date; approval depends on other reservations.\n\nWhen can a reserved camera be collected?",
    "options": [
      "Any time before midnight",
      "Between 12 and 2 pm",
      "Only after 4 pm"
    ],
    "correct": 1,
    "explanation": "The notice gives 12–2 pm for collection at the media desk."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-reading-matching-features-content-02",
  "lessonId": "band3-reading-matching-features",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original daily-life notice: Equipment loans: Students may borrow a camera for up to three days. Collect reserved items between 12 and 2 pm at the media desk. Returns must be made in person before 4 pm on the due date. Do not place equipment in the book-return slot. For renewals, contact the desk before the due date; approval depends on other reservations.\n\nHow must equipment be returned?",
    "options": [
      "Only by email",
      "In person before 4 pm on its due date",
      "Through the book-return slot"
    ],
    "correct": 1,
    "explanation": "The return rule requires in-person return and expressly excludes the slot."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-reading-matching-features-content-03",
  "lessonId": "band3-reading-matching-features",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original daily-life notice: Equipment loans: Students may borrow a camera for up to three days. Collect reserved items between 12 and 2 pm at the media desk. Returns must be made in person before 4 pm on the due date. Do not place equipment in the book-return slot. For renewals, contact the desk before the due date; approval depends on other reservations.\n\nWhat does the renewal rule imply?",
    "options": [
      "Approval depends on other reservations",
      "Requests can only be made after the due date",
      "Every request automatically adds three days"
    ],
    "correct": 0,
    "explanation": "The notice makes approval conditional on other reservations."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-reading-matching-features-content-04",
  "lessonId": "band3-reading-matching-features",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original daily-life notice: Equipment loans: Students may borrow a camera for up to three days. Collect reserved items between 12 and 2 pm at the media desk. Returns must be made in person before 4 pm on the due date. Do not place equipment in the book-return slot. For renewals, contact the desk before the due date; approval depends on other reservations.\n\nWhich statement confuses two separate rules?",
    "options": [
      "Renewals are not guaranteed",
      "Collection is at the media desk",
      "Returns must occur only between 12 and 2 pm"
    ],
    "correct": 2,
    "explanation": "12–2 pm governs collection; returns are due before 4 pm."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-reading-flowchart-content-01",
  "lessonId": "band3-reading-flowchart",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original academic passage: A team studying urban rainfall compared sensors on rooftops with sensors in nearby open spaces. Rooftop readings varied more during strong winds. The researchers suggest that turbulence around buildings can alter the amount of water entering a sensor. They do not conclude that rooftop data are worthless. Instead, they recommend recording each sensor's surroundings so comparisons can account for local conditions.\n\nWhat action do the authors recommend?",
    "options": [
      "Recording sensor surroundings",
      "Discarding all rooftop data",
      "Stopping every rainfall measurement"
    ],
    "correct": 0,
    "explanation": "The recommendation is to record surroundings so comparisons can account for local conditions."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-reading-flowchart-content-02",
  "lessonId": "band3-reading-flowchart",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original academic passage: A team studying urban rainfall compared sensors on rooftops with sensors in nearby open spaces. Rooftop readings varied more during strong winds. The researchers suggest that turbulence around buildings can alter the amount of water entering a sensor. They do not conclude that rooftop data are worthless. Instead, they recommend recording each sensor's surroundings so comparisons can account for local conditions.\n\nWhy are strong winds mentioned?",
    "options": [
      "They prove every reading is too low",
      "They explain why no sensors were used",
      "They identify a condition linked to greater rooftop variation"
    ],
    "correct": 2,
    "explanation": "Rooftop readings varied more during strong winds, supporting the proposed explanation."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-reading-flowchart-content-03",
  "lessonId": "band3-reading-flowchart",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original academic passage: A team studying urban rainfall compared sensors on rooftops with sensors in nearby open spaces. Rooftop readings varied more during strong winds. The researchers suggest that turbulence around buildings can alter the amount of water entering a sensor. They do not conclude that rooftop data are worthless. Instead, they recommend recording each sensor's surroundings so comparisons can account for local conditions.\n\nWhat does turbulence most nearly mean here?",
    "options": [
      "A standard payment",
      "Disturbed air movement",
      "A period without rainfall"
    ],
    "correct": 1,
    "explanation": "Its context is wind around buildings altering water entering sensors."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-reading-flowchart-content-04",
  "lessonId": "band3-reading-flowchart",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original academic passage: A team studying urban rainfall compared sensors on rooftops with sensors in nearby open spaces. Rooftop readings varied more during strong winds. The researchers suggest that turbulence around buildings can alter the amount of water entering a sensor. They do not conclude that rooftop data are worthless. Instead, they recommend recording each sensor's surroundings so comparisons can account for local conditions.\n\nWhich inference is supported?",
    "options": [
      "All locations receive identical rainfall",
      "Comparisons may improve when local conditions are documented",
      "Rooftop sensors never provide useful data"
    ],
    "correct": 1,
    "explanation": "The recommendation aims to account for local conditions rather than reject the method."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-writing-multiple-charts-content-03",
  "lessonId": "band3-writing-multiple-charts",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original discussion prompt: Professor Lane asks whether first-year students should choose one broad elective outside their main subject. Mina supports it because it may reveal new interests. Leo worries that it reduces time for core modules. Contribute your own view and develop it with reasons.\n\nWhich example develops a cross-subject benefit?",
    "options": [
      "A biology student using statistics to interpret laboratory results",
      "A campus building being old",
      "A student buying a blue bag"
    ],
    "correct": 0,
    "explanation": "The example explains how knowledge from another subject can support the main field."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-writing-multiple-charts-content-04",
  "lessonId": "band3-writing-multiple-charts",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original discussion prompt: Professor Lane asks whether first-year students should choose one broad elective outside their main subject. Mina supports it because it may reveal new interests. Leo worries that it reduces time for core modules. Contribute your own view and develop it with reasons.\n\nWhich claim about the text drill is accurate?",
    "options": [
      "It measures the user’s actual extended written response",
      "It assigns an official Writing section score",
      "It checks choices about planning and development"
    ],
    "correct": 2,
    "explanation": "The drill receives choice selections, not a complete response to assess."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-writing-maps-processes-content-03",
  "lessonId": "band3-writing-maps-processes",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original email situation: You organised a student exhibition and booked a projector from the media office. It stopped working during rehearsal. Write to the coordinator, Ms. Rivera: explain what happened, describe the event’s needs, and propose a practical solution.\n\nWhich proposal gives an actionable next step?",
    "options": [
      "Exchange and test the projector before Thursday afternoon",
      "Cancel all university events forever",
      "Fix everything sometime"
    ],
    "correct": 0,
    "explanation": "It provides a feasible action and useful deadline rather than a vague demand."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-writing-maps-processes-content-04",
  "lessonId": "band3-writing-maps-processes",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original email situation: You organised a student exhibition and booked a projector from the media office. It stopped working during rehearsal. Write to the coordinator, Ms. Rivera: explain what happened, describe the event’s needs, and propose a practical solution.\n\nWhich response would omit an explicit task demand?",
    "options": [
      "An email describing the failure, needs and an exchange request",
      "An email explaining the failure but giving no proposed solution",
      "A courteous email with all three points developed"
    ],
    "correct": 1,
    "explanation": "The prompt specifically requires a practical solution as well as explanation and needs."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-writing-discussion-content-01",
  "lessonId": "band3-writing-discussion",
  "type": "reorder",
  "prompt": "Build the intended statement about the revised procedure. Use every supplied word once.",
  "data": {
    "words": [
      "The",
      "revised",
      "procedure",
      "reduces",
      "unnecessary",
      "delays."
    ],
    "sentence": "The revised procedure reduces unnecessary delays."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-writing-discussion-content-02",
  "lessonId": "band3-writing-discussion",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original sentence-building context: A research assistant describes a revised laboratory procedure. Intended statements: 'The revised procedure reduces unnecessary delays.' 'Each record includes a clear description.' 'Additional evidence becomes available after testing.'\n\nWhich form completes “Each record includes a clear ...”?",
    "options": [
      "description",
      "descriptive",
      "describe"
    ],
    "correct": 0,
    "explanation": "The phrase needs the noun description as its head after the article and adjective."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-writing-discussion-content-03",
  "lessonId": "band3-writing-discussion",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original sentence-building context: A research assistant describes a revised laboratory procedure. Intended statements: 'The revised procedure reduces unnecessary delays.' 'Each record includes a clear description.' 'Additional evidence becomes available after testing.'\n\nWhich form agrees with “Each record” in a present statement?",
    "options": [
      "include",
      "including",
      "includes"
    ],
    "correct": 2,
    "explanation": "Each record is singular; includes supplies the finite singular present verb."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-writing-discussion-content-04",
  "lessonId": "band3-writing-discussion",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original sentence-building context: A research assistant describes a revised laboratory procedure. Intended statements: 'The revised procedure reduces unnecessary delays.' 'Each record includes a clear description.' 'Additional evidence becomes available after testing.'\n\nWhich complement fits “Evidence becomes ... after testing”?",
    "options": [
      "availability",
      "available",
      "availably"
    ],
    "correct": 1,
    "explanation": "Available is an adjective describing the resulting state after becomes."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-writing-advantages-content-01",
  "lessonId": "band3-writing-advantages",
  "type": "reorder",
  "prompt": "Build the intended polite question using every supplied word once. Punctuation belongs to its token.",
  "data": {
    "words": [
      "Could",
      "you",
      "explain",
      "why",
      "these",
      "results",
      "differ?"
    ],
    "sentence": "Could you explain why these results differ?"
  },
  "xpReward": 15
},
{
  "id": "ex-band3-writing-advantages-content-02",
  "lessonId": "band3-writing-advantages",
  "type": "reorder",
  "prompt": "Build the statement about the presentation using every supplied word once.",
  "data": {
    "words": [
      "The",
      "slides",
      "include",
      "several",
      "useful",
      "examples."
    ],
    "sentence": "The slides include several useful examples."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-writing-advantages-content-03",
  "lessonId": "band3-writing-advantages",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original sentence-building situation: A student asks a tutor for advice about a presentation. Intended question: “Could you explain why these results differ?” A separate statement is: “The slides include several useful examples.”\n\nWhich embedded question has correct word order?",
    "options": [
      "Could explain you why differ these results?",
      "Could you explain why do these results differ?",
      "Could you explain why these results differ?"
    ],
    "correct": 2,
    "explanation": "The embedded clause uses subject these results followed by differ, without direct-question inversion."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-writing-advantages-content-04",
  "lessonId": "band3-writing-advantages",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original sentence-building situation: A student asks a tutor for advice about a presentation. Intended question: “Could you explain why these results differ?” A separate statement is: “The slides include several useful examples.”\n\nWhy is “include” correct in the statement?",
    "options": [
      "Every verb after the must be plural",
      "The subject slides is plural",
      "Examples is the subject of include"
    ],
    "correct": 1,
    "explanation": "Slides is the subject; the plural present form is include."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-writing-task-response-content-01",
  "lessonId": "band3-writing-task-response",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original email task: A professor has invited you to a meeting about a student research project. You cannot attend the proposed Friday 10 am meeting because of a compulsory lab. Explain the conflict, suggest another time, and ask whether you should send any material in advance.\n\nWhich detail explains the conflict?",
    "options": [
      "A compulsory lab at Friday 10 am",
      "The professor’s email address",
      "A favourite research topic"
    ],
    "correct": 0,
    "explanation": "The lab is the reason the proposed time cannot be attended."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-writing-task-response-content-02",
  "lessonId": "band3-writing-task-response",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original email task: A professor has invited you to a meeting about a student research project. You cannot attend the proposed Friday 10 am meeting because of a compulsory lab. Explain the conflict, suggest another time, and ask whether you should send any material in advance.\n\nWhich wording proposes rather than assumes agreement?",
    "options": [
      "Would Friday after 2 pm suit you instead?",
      "I changed your schedule",
      "The meeting is now Friday at 2 pm, whether you agree or not"
    ],
    "correct": 0,
    "explanation": "The question invites the professor to confirm an alternative."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-writing-task-response-content-03",
  "lessonId": "band3-writing-task-response",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original email task: A professor has invited you to a meeting about a student research project. You cannot attend the proposed Friday 10 am meeting because of a compulsory lab. Explain the conflict, suggest another time, and ask whether you should send any material in advance.\n\nWhich required action is missing from an email that only explains the lab and offers Monday?",
    "options": [
      "Demanding a score",
      "Asking whether to send material in advance",
      "Giving a detailed childhood history"
    ],
    "correct": 1,
    "explanation": "The task separately asks about advance material."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-writing-task-response-content-04",
  "lessonId": "band3-writing-task-response",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original email task: A professor has invited you to a meeting about a student research project. You cannot attend the proposed Friday 10 am meeting because of a compulsory lab. Explain the conflict, suggest another time, and ask whether you should send any material in advance.\n\nWhich addition develops the preparation request?",
    "options": [
      "I already know you require a full thesis",
      "I can send a short project outline on Thursday if useful",
      "No reply is needed although I asked a question"
    ],
    "correct": 1,
    "explanation": "It offers a specific feasible item without inventing the professor’s requirements."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-writing-formality-content-01",
  "lessonId": "band3-writing-formality",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original classroom thread: Professor Kim asks whether group projects should include an individual reflection. Rosa says reflections reveal what each person learned. Dilan worries that students may repeat what they think the teacher wants to hear.\n\nWhich contribution adds a mechanism?",
    "options": [
      "Copy Rosa’s post",
      "Reflections are good because they are good",
      "Ask students to explain a changed decision so their learning becomes visible"
    ],
    "correct": 2,
    "explanation": "It links a particular reflection prompt to evidence of thinking."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-writing-formality-content-02",
  "lessonId": "band3-writing-formality",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original classroom thread: Professor Kim asks whether group projects should include an individual reflection. Rosa says reflections reveal what each person learned. Dilan worries that students may repeat what they think the teacher wants to hear.\n\nWhich response addresses Dilan’s concern?",
    "options": [
      "Ignore the possibility of rehearsed praise",
      "Compare a reflection with a draft or meeting note",
      "Assume every reflection is perfectly honest"
    ],
    "correct": 1,
    "explanation": "Additional process evidence can help evaluate a claim rather than relying on the reflection alone."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-writing-formality-content-03",
  "lessonId": "band3-writing-formality",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original classroom thread: Professor Kim asks whether group projects should include an individual reflection. Rosa says reflections reveal what each person learned. Dilan worries that students may repeat what they think the teacher wants to hear.\n\nWhich sentence uses suitable precise register?",
    "options": [
      "The pedagogical magnificence is infinite",
      "Every simple word is unacceptable",
      "A short reflection can help students explain a decision"
    ],
    "correct": 2,
    "explanation": "The first is clear and appropriately qualified; the alternatives assert a false rule or use inflated language."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-writing-formality-content-04",
  "lessonId": "band3-writing-formality",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original classroom thread: Professor Kim asks whether group projects should include an individual reflection. Rosa says reflections reveal what each person learned. Dilan worries that students may repeat what they think the teacher wants to hear.\n\nWhat should a new post contribute?",
    "options": [
      "Only the names Rosa and Dilan",
      "A developed relevant idea beyond simply repeating classmates",
      "An unrelated description of a holiday"
    ],
    "correct": 1,
    "explanation": "Meaningful development is needed; names alone do not engage with the debate."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-speaking-opinions-content-01",
  "lessonId": "band3-speaking-opinions",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original interview prompt: Tell us about a way you organise your study time. Explain why it helps you. Model: “I divide a large assignment into small tasks and put the first deadline two days before submission. That gives me time to notice gaps. For example, when I prepared a history presentation, the early deadline showed that one section lacked evidence, so I could find another source before rehearsing.”\n\nWhat is the speaker’s study method?",
    "options": [
      "Waiting until the last minute",
      "Never reviewing evidence",
      "Small tasks and an early personal deadline"
    ],
    "correct": 2,
    "explanation": "The opening states the two parts of the method explicitly."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-speaking-opinions-content-02",
  "lessonId": "band3-speaking-opinions",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original interview prompt: Tell us about a way you organise your study time. Explain why it helps you. Model: “I divide a large assignment into small tasks and put the first deadline two days before submission. That gives me time to notice gaps. For example, when I prepared a history presentation, the early deadline showed that one section lacked evidence, so I could find another source before rehearsing.”\n\nWhat does the history example demonstrate?",
    "options": [
      "The speaker never needs another source",
      "The early deadline allowed a missing-evidence section to be repaired",
      "History is always easier than other subjects"
    ],
    "correct": 1,
    "explanation": "The early draft revealed a gap in time to find another source."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-speaking-opinions-content-03",
  "lessonId": "band3-speaking-opinions",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original interview prompt: Tell us about a way you organise your study time. Explain why it helps you. Model: “I divide a large assignment into small tasks and put the first deadline two days before submission. That gives me time to notice gaps. For example, when I prepared a history presentation, the early deadline showed that one section lacked evidence, so I could find another source before rehearsing.”\n\nWhich addition develops a relevant limitation?",
    "options": [
      "The speaker’s favourite beach is distant",
      "All timetables guarantee success",
      "Unexpected work may require a spare study session"
    ],
    "correct": 2,
    "explanation": "A spare session addresses a scheduling risk directly related to the method."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-speaking-opinions-content-04",
  "lessonId": "band3-speaking-opinions",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original interview prompt: Tell us about a way you organise your study time. Explain why it helps you. Model: “I divide a large assignment into small tasks and put the first deadline two days before submission. That gives me time to notice gaps. For example, when I prepared a history presentation, the early deadline showed that one section lacked evidence, so I could find another source before rehearsing.”\n\nWhich response would underdevelop the prompt?",
    "options": [
      "A specific example connected to the method",
      "“I use a timetable.” with no reason",
      "A clear method plus why it helps"
    ],
    "correct": 1,
    "explanation": "The prompt asks for explanation as well as naming a way to organise study."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-speaking-toefl4-content-02",
  "lessonId": "band3-speaking-toefl4",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original longer repetition preparation: “Visitors who arrive after the tour begins should wait near reception.” “Although the main gallery is closed, the exhibition on the upper floor remains open.” “Please return the audio guide before you leave through the eastern exit.”\n\nWhich repetition preserves the contrast in the second sentence?",
    "options": [
      "Although the main gallery is closed, the exhibition on the upper floor remains open.",
      "The main gallery and upper exhibition are both closed.",
      "Because every exhibition is closed, the upper floor remains open."
    ],
    "correct": 0,
    "explanation": "It preserves the original concession and the difference between the two areas."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-speaking-toefl4-content-03",
  "lessonId": "band3-speaking-toefl4",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original longer repetition preparation: “Visitors who arrive after the tour begins should wait near reception.” “Although the main gallery is closed, the exhibition on the upper floor remains open.” “Please return the audio guide before you leave through the eastern exit.”\n\nWhat must happen before leaving through the eastern exit?",
    "options": [
      "Close every exhibition",
      "Return the audio guide",
      "Start the tour again"
    ],
    "correct": 1,
    "explanation": "The third sentence explicitly instructs returning the guide before departure."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-speaking-toefl4-content-04",
  "lessonId": "band3-speaking-toefl4",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original longer repetition preparation: “Visitors who arrive after the tour begins should wait near reception.” “Although the main gallery is closed, the exhibition on the upper floor remains open.” “Please return the audio guide before you leave through the eastern exit.”\n\nWhich substitution changes the timing of the first instruction?",
    "options": [
      "Changing after to before",
      "Keeping visitors",
      "Keeping reception"
    ],
    "correct": 0,
    "explanation": "Before reverses the arrival-time condition, unlike retaining the source words."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-grammar-passive-content-01",
  "lessonId": "band3-grammar-passive",
  "type": "reorder",
  "prompt": "Build the passive statement. Use each supplied token once.",
  "data": {
    "words": [
      "The",
      "equipment",
      "was",
      "checked",
      "before",
      "class."
    ],
    "sentence": "The equipment was checked before class."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-grammar-passive-content-02",
  "lessonId": "band3-grammar-passive",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original lab message: Staff checked the safety equipment on Monday. The equipment was checked before the practical class. Students who have completed induction may use the room. Students without induction must arrange training first.\n\nWhich transformation preserves a completed Monday event?",
    "options": [
      "The equipment will be checked next month",
      "The equipment was checked on Monday",
      "The equipment was check on Monday"
    ],
    "correct": 1,
    "explanation": "Was checked preserves past time and supplies the required past participle."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-grammar-passive-content-03",
  "lessonId": "band3-grammar-passive",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original lab message: Staff checked the safety equipment on Monday. The equipment was checked before the practical class. Students who have completed induction may use the room. Students without induction must arrange training first.\n\nWho may use the room?",
    "options": [
      "Every student without any preparation",
      "Only equipment suppliers",
      "Students who have completed induction"
    ],
    "correct": 2,
    "explanation": "The relative clause explicitly restricts permission to students who completed induction."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-grammar-passive-content-04",
  "lessonId": "band3-grammar-passive",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original lab message: Staff checked the safety equipment on Monday. The equipment was checked before the practical class. Students who have completed induction may use the room. Students without induction must arrange training first.\n\nWhen should the actor be retained?",
    "options": [
      "When responsibility for the action matters",
      "Never in academic writing",
      "Only when a sentence contains an adjective"
    ],
    "correct": 0,
    "explanation": "Choosing active or a by-phrase can preserve responsibility when it is relevant."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-vocab-health-content-01",
  "lessonId": "band3-vocab-health",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original fictional academic passage: Researchers compared two reminder messages for voluntary campus health appointments. One gave only the appointment date; the other included the date and a link to change the booking. More recipients of the second message attended or rescheduled. Because participants were not randomly assigned, the report cautions that other differences between the groups may have affected the result. It recommends a randomised follow-up rather than claiming that the link alone caused the improvement.\n\nWhat distinguished the second message?",
    "options": [
      "It included a link to change the booking",
      "It removed the appointment date",
      "It gave a different medicine"
    ],
    "correct": 0,
    "explanation": "The two messages differed by the change-booking link."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-vocab-health-content-02",
  "lessonId": "band3-vocab-health",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original fictional academic passage: Researchers compared two reminder messages for voluntary campus health appointments. One gave only the appointment date; the other included the date and a link to change the booking. More recipients of the second message attended or rescheduled. Because participants were not randomly assigned, the report cautions that other differences between the groups may have affected the result. It recommends a randomised follow-up rather than claiming that the link alone caused the improvement.\n\nWhich outcome was reported?",
    "options": [
      "A guaranteed improvement in health",
      "More attendance or rescheduling",
      "A confirmed reduction in every missed appointment"
    ],
    "correct": 1,
    "explanation": "The passage combines attendance and rescheduling; it reports no health outcome."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-vocab-health-content-03",
  "lessonId": "band3-vocab-health",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original fictional academic passage: Researchers compared two reminder messages for voluntary campus health appointments. One gave only the appointment date; the other included the date and a link to change the booking. More recipients of the second message attended or rescheduled. Because participants were not randomly assigned, the report cautions that other differences between the groups may have affected the result. It recommends a randomised follow-up rather than claiming that the link alone caused the improvement.\n\nWhy is causal certainty limited?",
    "options": [
      "The dates were all missing",
      "No reminder was sent",
      "Participants were not randomly assigned"
    ],
    "correct": 2,
    "explanation": "The report says other group differences may have affected the result because assignment was not random."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-vocab-health-content-04",
  "lessonId": "band3-vocab-health",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original fictional academic passage: Researchers compared two reminder messages for voluntary campus health appointments. One gave only the appointment date; the other included the date and a link to change the booking. More recipients of the second message attended or rescheduled. Because participants were not randomly assigned, the report cautions that other differences between the groups may have affected the result. It recommends a randomised follow-up rather than claiming that the link alone caused the improvement.\n\nWhat is the purpose of the proposed follow-up?",
    "options": [
      "Prove an unrelated treatment works",
      "Replace every campus appointment",
      "Investigate the association with stronger control of group differences"
    ],
    "correct": 2,
    "explanation": "Randomisation can help address the stated limitation, while the other options change the aim."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-vocab-education-content-01",
  "lessonId": "band3-vocab-education",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original announcement transcript: 'The study-skills workshop planned for Tuesday in Room 6 has moved to Thursday in Room 9 because the trainer is unavailable. It will still begin at 2 pm. Existing registrations remain valid. If you cannot attend on Thursday, email the learning centre by Wednesday noon; we can offer materials but cannot promise a place at the next workshop.'\n\nWhen and where is the workshop now?",
    "options": [
      "Thursday in Room 9",
      "Tuesday in Room 6",
      "Wednesday at noonin Room 9"
    ],
    "correct": 0,
    "explanation": "The opening announces Thursday and Room 9 as replacements;Wednesday noonis a response deadline."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-vocab-education-content-02",
  "lessonId": "band3-vocab-education",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original announcement transcript: 'The study-skills workshop planned for Tuesday in Room 6 has moved to Thursday in Room 9 because the trainer is unavailable. It will still begin at 2 pm. Existing registrations remain valid. If you cannot attend on Thursday, email the learning centre by Wednesday noon; we can offer materials but cannot promise a place at the next workshop.'\n\nWhich detail remains unchanged?",
    "options": [
      "The 2 pm start",
      "The original Tuesday date",
      "The original Room 6"
    ],
    "correct": 0,
    "explanation": "“Still begin at 2 pm” explicitly preserves the start time."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-vocab-education-content-03",
  "lessonId": "band3-vocab-education",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original announcement transcript: 'The study-skills workshop planned for Tuesday in Room 6 has moved to Thursday in Room 9 because the trainer is unavailable. It will still begin at 2 pm. Existing registrations remain valid. If you cannot attend on Thursday, email the learning centre by Wednesday noon; we can offer materials but cannot promise a place at the next workshop.'\n\nWho should email by Wednesday noon?",
    "options": [
      "Every participant regardless of availability",
      "Registered people unable to attend on Thursday",
      "Only people who want a refund already guaranteed"
    ],
    "correct": 1,
    "explanation": "The conditional instruction applies to those who cannot attend the new date."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-vocab-education-content-04",
  "lessonId": "band3-vocab-education",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original announcement transcript: 'The study-skills workshop planned for Tuesday in Room 6 has moved to Thursday in Room 9 because the trainer is unavailable. It will still begin at 2 pm. Existing registrations remain valid. If you cannot attend on Thursday, email the learning centre by Wednesday noon; we can offer materials but cannot promise a place at the next workshop.'\n\nWhat is not guaranteed?",
    "options": [
      "Access to offered materials",
      "A place at the next workshop",
      "Validity of existing registrations"
    ],
    "correct": 1,
    "explanation": "The announcement explicitly cannot promise a future workshop place."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-vocab-work-content-01",
  "lessonId": "band3-vocab-work",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original workplace message: 'Your training shift is scheduled for Monday from 9 am to 1 pm. Please arrive fifteen minutes early to collect a visitor badge. Bring identification, but do not bring safety clothing; a jacket will be provided. If you need to change the shift, contact the coordinator before Friday at 3 pm. A change depends on supervisor availability.'\n\nWhat arrival time follows the instruction?",
    "options": [
      "1 pm",
      "9.15 am",
      "8.45 am"
    ],
    "correct": 2,
    "explanation": "Fifteen minutes before the 9 am shift is 8.45 am."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-vocab-work-content-02",
  "lessonId": "band3-vocab-work",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original workplace message: 'Your training shift is scheduled for Monday from 9 am to 1 pm. Please arrive fifteen minutes early to collect a visitor badge. Bring identification, but do not bring safety clothing; a jacket will be provided. If you need to change the shift, contact the coordinator before Friday at 3 pm. A change depends on supervisor availability.'\n\nWhat should the trainee bring?",
    "options": [
      "Identification",
      "Safety clothing that must be purchased",
      "A supervisor’s calendar"
    ],
    "correct": 0,
    "explanation": "Identification is required, while the jacket is supplied and safety clothing should not be brought."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-vocab-work-content-03",
  "lessonId": "band3-vocab-work",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original workplace message: 'Your training shift is scheduled for Monday from 9 am to 1 pm. Please arrive fifteen minutes early to collect a visitor badge. Bring identification, but do not bring safety clothing; a jacket will be provided. If you need to change the shift, contact the coordinator before Friday at 3 pm. A change depends on supervisor availability.'\n\nWhat is the change-request deadline?",
    "options": [
      "Before Friday 3 pm",
      "After Monday 1 pm",
      "At the end of any future shift"
    ],
    "correct": 0,
    "explanation": "The message specifies contacting the coordinator before Friday at 3 pm."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-vocab-work-content-04",
  "lessonId": "band3-vocab-work",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original workplace message: 'Your training shift is scheduled for Monday from 9 am to 1 pm. Please arrive fifteen minutes early to collect a visitor badge. Bring identification, but do not bring safety clothing; a jacket will be provided. If you need to change the shift, contact the coordinator before Friday at 3 pm. A change depends on supervisor availability.'\n\nWhich inference preserves the condition?",
    "options": [
      "The coordinator is never involved",
      "Every change is automatically approved",
      "A requested change may depend on supervisor availability"
    ],
    "correct": 2,
    "explanation": "The final sentence explicitly makes a change conditional on availability."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-paraphrasing-content-01",
  "lessonId": "band3-paraphrasing",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original interview prompt: Do you prefer learning a new skill alone or with other people? Explain your choice and describe a situation that helped you decide. Model idea: Learning basic photography with a small group provided immediate feedback, but practising alone afterwards allowed experimentation without slowing others down.\n\nWhich opening gives a clear qualified preference?",
    "options": [
      "Skills are things people do",
      "I cannot decide and will discuss another topic",
      "I prefer a group initially because it provides quick feedback"
    ],
    "correct": 2,
    "explanation": "It states a preference and the condition under which it applies."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-paraphrasing-content-02",
  "lessonId": "band3-paraphrasing",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original interview prompt: Do you prefer learning a new skill alone or with other people? Explain your choice and describe a situation that helped you decide. Model idea: Learning basic photography with a small group provided immediate feedback, but practising alone afterwards allowed experimentation without slowing others down.\n\nWhich experience develops the feedback reason?",
    "options": [
      "A classmate noticed an incorrect focus setting",
      "The camera was bought on a Tuesday",
      "The learner’s bag was green"
    ],
    "correct": 0,
    "explanation": "The example shows an error being noticed by another person."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-paraphrasing-content-03",
  "lessonId": "band3-paraphrasing",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original interview prompt: Do you prefer learning a new skill alone or with other people? Explain your choice and describe a situation that helped you decide. Model idea: Learning basic photography with a small group provided immediate feedback, but practising alone afterwards allowed experimentation without slowing others down.\n\nWhich paraphrase preserves the prompt?",
    "options": [
      "How much does a camera cost?",
      "Do you prefer teaching every skill to strangers?",
      "Would you rather acquire a skill independently or with others, and what experience explains your choice?"
    ],
    "correct": 2,
    "explanation": "It retains learning method, preference and supporting experience."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-paraphrasing-content-04",
  "lessonId": "band3-paraphrasing",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original interview prompt: Do you prefer learning a new skill alone or with other people? Explain your choice and describe a situation that helped you decide. Model idea: Learning basic photography with a small group provided immediate feedback, but practising alone afterwards allowed experimentation without slowing others down.\n\nWhy does later solo practice not necessarily contradict the preference?",
    "options": [
      "Every answer must support only one activity forever",
      "The preference is explicitly for the initial learning stage",
      "The speaker denied practising alone"
    ],
    "correct": 1,
    "explanation": "A stage-based preference can distinguish initial feedback from later independent experimentation."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-error-analysis-content-01",
  "lessonId": "band3-error-analysis",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original email draft: “Dear Coordinator, I am agree with the workshop plan. There is several students who needs a later session. We have discussed this yesterday. Could you tell me when does the second session begin? We would appreciate an afternoon option because our labs end at noon.”\n\nWhich correction repairs the first sentence?",
    "options": [
      "I am agreed with the workshop plan",
      "I agree with the workshop plan",
      "I agreeing with the workshop plan"
    ],
    "correct": 1,
    "explanation": "Agree is the finite verb here; no extra be form is needed."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-error-analysis-content-02",
  "lessonId": "band3-error-analysis",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original email draft: “Dear Coordinator, I am agree with the workshop plan. There is several students who needs a later session. We have discussed this yesterday. Could you tell me when does the second session begin? We would appreciate an afternoon option because our labs end at noon.”\n\nWhich version matches plural students?",
    "options": [
      "There is several students who needs a later session",
      "There are several students who need a later session",
      "There are several student who needs a later session"
    ],
    "correct": 1,
    "explanation": "The plural noun students requires are in this construction and need in the relative clause."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-error-analysis-content-03",
  "lessonId": "band3-error-analysis",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original email draft: “Dear Coordinator, I am agree with the workshop plan. There is several students who needs a later session. We have discussed this yesterday. Could you tell me when does the second session begin? We would appreciate an afternoon option because our labs end at noon.”\n\nWhich revision fits yesterday?",
    "options": [
      "We discussed this yesterday",
      "We will discuss this yesterday",
      "We have discussed this yesterday"
    ],
    "correct": 0,
    "explanation": "Yesterday marks a completed past time, so past simple is appropriate."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-error-analysis-content-04",
  "lessonId": "band3-error-analysis",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original email draft: “Dear Coordinator, I am agree with the workshop plan. There is several students who needs a later session. We have discussed this yesterday. Could you tell me when does the second session begin? We would appreciate an afternoon option because our labs end at noon.”\n\nWhich embedded question is grammatical?",
    "options": [
      "Could you tell me when does the second session begin?",
      "Could tell me you when begins the second session?",
      "Could you tell me when the second session begins?"
    ],
    "correct": 2,
    "explanation": "The embedded clause uses subject the second session followed by begins."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-practice-essay-content-01",
  "lessonId": "band3-practice-essay",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original timed writing pair: Email—A university garden group promised to lend tools for a public event, but several are missing. Write to the organiser: explain the shortage, describe what the event needs, and propose a solution. Discussion—Professor Hale asks whether practical skills workshops should be free. Bea favours free access; Arun worries about covering materials and instructor costs. Contribute your view.\n\nWhich email plan covers all three demands?",
    "options": [
      "Only apologise for three paragraphs",
      "Explain the shortage, describe needed tools and propose a safe alternative",
      "Describe the university’s history"
    ],
    "correct": 1,
    "explanation": "The plan includes explanation, event needs and an actionable solution."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-practice-essay-content-02",
  "lessonId": "band3-practice-essay",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original timed writing pair: Email—A university garden group promised to lend tools for a public event, but several are missing. Write to the organiser: explain the shortage, describe what the event needs, and propose a solution. Discussion—Professor Hale asks whether practical skills workshops should be free. Bea favours free access; Arun worries about covering materials and instructor costs. Contribute your view.\n\nWhich discussion idea addresses both access and costs?",
    "options": [
      "Free introductory workshops with an explicit materials budget",
      "Free access because materials never cost anything",
      "Charge every student without considering access"
    ],
    "correct": 0,
    "explanation": "The proposed budget recognises a cost while preserving an access goal."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-practice-essay-content-03",
  "lessonId": "band3-practice-essay",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original timed writing pair: Email—A university garden group promised to lend tools for a public event, but several are missing. Write to the organiser: explain the shortage, describe what the event needs, and propose a solution. Discussion—Professor Hale asks whether practical skills workshops should be free. Bea favours free access; Arun worries about covering materials and instructor costs. Contribute your view.\n\nWhat is missing if the writer merely copies Bea’s preference?",
    "options": [
      "An original developed contribution",
      "A mandatory 250-word IELTS essay",
      "A report on a lecture that was not supplied"
    ],
    "correct": 0,
    "explanation": "The academic discussion needs the writer’s own supported contribution."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-practice-essay-content-04",
  "lessonId": "band3-practice-essay",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Original timed writing pair: Email—A university garden group promised to lend tools for a public event, but several are missing. Write to the organiser: explain the shortage, describe what the event needs, and propose a solution. Discussion—Professor Hale asks whether practical skills workshops should be free. Bea favours free access; Arun worries about covering materials and instructor costs. Contribute your view.\n\nWhat evidence is required for useful extended-writing feedback?",
    "options": [
      "The actual written responses",
      "Only the elapsed timer",
      "Only the number of correct planning choices"
    ],
    "correct": 0,
    "explanation": "Review of development and language requires the complete writing, not an indirect proxy."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-review-content-01",
  "lessonId": "band3-review",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Current TOEFL review: Reading—Complete the Words, Read in Daily Life, Read an Academic Passage. Listening—Listen and Choose a Response, Listen to a Conversation, Listen to an Announcement, Listen to an Academic Talk. Writing—Build a Sentence, Write an Email, Write for an Academic Discussion. Speaking—Listen and Repeat, Take an Interview.\n\nWhich is a current Speaking task family?",
    "options": [
      "Listen and Repeat",
      "Integrated campus announcement summary",
      "IELTS Part 3"
    ],
    "correct": 0,
    "explanation": "Listen and Repeat is current; the others are a retired TOEFL task or a different examination."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-review-content-02",
  "lessonId": "band3-review",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "Current TOEFL review: Reading—Complete the Words, Read in Daily Life, Read an Academic Passage. Listening—Listen and Choose a Response, Listen to a Conversation, Listen to an Announcement, Listen to an Academic Talk. Writing—Build a Sentence, Write an Email, Write for an Academic Discussion. Speaking—Listen and Repeat, Take an Interview.\n\nWhich writing sequence matches the current families?",
    "options": [
      "Build a Sentence, Write an Email, Write for an Academic Discussion",
      "Only a 250-word essay",
      "Integrated Writing plus an IELTS Task 1 graph"
    ],
    "correct": 0,
    "explanation": "The first option lists all three current TOEFL Writing families."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-review-content-03",
  "lessonId": "band3-review",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "A learner scores 18/20 in an original text-based drill.\n\nWhat result can be reported directly?",
    "options": [
      "An official 5.5 section score",
      "90% on that local set",
      "A verified pronunciation rating"
    ],
    "correct": 1,
    "explanation": "18÷20=90%; no official calibration or spoken evidence is available."
  },
  "xpReward": 15
},
{
  "id": "ex-band3-review-content-04",
  "lessonId": "band3-review",
  "type": "multiple-choice",
  "prompt": "Evidence and strategy practice",
  "data": {
    "question": "ETS current reporting describes four section scores and an overall 1–6 score, plus a comparable overall 0–120 score during the transition.\n\nWhich statement is accurate?",
    "options": [
      "IELTS bands are TOEFL scores",
      "The primary current scale is 1–6; the comparable overall old-scale score is transitional",
      "Every section is still primarily reported 0–30"
    ],
    "correct": 1,
    "explanation": "The current primary reporting scale is 1–6 with the described comparable overall transitional result."
  },
  "xpReward": 15
},
];
