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
    id: "ex-band2-listening-mcq-1", lessonId: "band2-listening-mcq", type: "multiple-choice",
    prompt: "According to the Section 3 consultation script, which fieldwork topic did Chloe, Liam, and Prof. Evans finally agree to pursue?",
    data: {
      question: "What is the final consensus topic for the dissertation?",
      options: [
        "Coral bleaching severity across the Great Barrier Reef",
        "Microplastic concentration levels in coastal mangrove sediments",
        "Recolonization of seagrass meadows by juvenile fish species",
        "Chemical spectrometry analysis of reef water samples"
      ],
      correct: 2
    },
    xpReward: 20,
  },
  {
    id: "ex-band2-listening-mcq-2", lessonId: "band2-listening-mcq", type: "multiple-choice",
    prompt: "Why was Chloe's initial proposal on coral bleaching rejected by the supervisor?",
    data: {
      question: "Professor Evans vetoed the coral bleaching topic because:",
      options: [
        "It has already been extensively researched, making original empirical findings difficult",
        "The university ethics committee banned underwater scuba fieldwork",
        "The heatwave had already subsided before the term began",
        "Submersible camera rigs are incompatible with coral environments"
      ],
      correct: 0
    },
    xpReward: 15,
  },
  {
    id: "ex-band2-listening-mcq-3", lessonId: "band2-listening-mcq", type: "multiple-choice",
    prompt: "What logistical obstacle blocked Liam's proposal regarding microplastics?",
    data: {
      question: "The microplastics project was abandoned because:",
      options: [
        "Fieldwork permits for mangrove reserves were unavailable",
        "The university spectrometer is booked out until late November",
        "Chloe lacked training in collecting sediment samples",
        "Spectrometry funding was reallocated to other departments"
      ],
      correct: 1
    },
    xpReward: 15,
  },

  // ── IELTS Listening: Section 2 Map Labelling (Sports Complex) ─────────────────
  {
    id: "ex-band2-listening-maps-1", lessonId: "band2-listening-maps", type: "multiple-choice",
    prompt: "Based on the guide's orientation walkthrough, which facility corresponds to Room B at the far northern wall?",
    data: {
      question: "Room B directly facing the central concourse is the:",
      options: [
        "Olympic Swimming Pool",
        "Weight Training Gym",
        "Physiotherapy Clinic",
        "Membership Desk"
      ],
      correct: 0
    },
    xpReward: 15,
  },
  {
    id: "ex-band2-listening-maps-2", lessonId: "band2-listening-maps", type: "multiple-choice",
    prompt: "Where is the Weight Training Gym (Room C) situated according to the walkthrough?",
    data: {
      question: "The Weight Training Gym is located:",
      options: [
        "Immediately to your right as you pass through security gates",
        "Down the left corridor, situated between the Squash Courts and the Cafe",
        "Tucked in the far north-western corner backing onto the track",
        "Behind the central concourse turnstiles"
      ],
      correct: 1
    },
    xpReward: 15,
  },
  {
    id: "ex-band2-listening-maps-3", lessonId: "band2-listening-maps", type: "fill-blank",
    prompt: "Spatial direction terminology: In IELTS map orientation, 'backing ___ the track' means sharing a rear boundary.",
    data: {
      sentence: "The Physiotherapy Clinic is tucked in the corner, backing ___ the outdoor athletic track.",
      answer: "onto",
      hint: "Preposition used to describe rear structural boundary"
    },
    xpReward: 15,
  },

  // ── IELTS Reading: True/False/Not Given Master Drills ───────────────────────
  {
    id: "ex-band2-reading-tfng-1", lessonId: "band2-reading-tfng", type: "multiple-choice",
    prompt: "Passage: 'The Eastgate complex uses 35% less energy than comparable commercial buildings in Harare.' Statement: 'The Eastgate Centre consumes less energy than conventional office complexes in Harare.'",
    data: { question: "Is the statement True, False, or Not Given?", options: ["TRUE (Direct agreement)", "FALSE (Contradicts text)", "NOT GIVEN (Not mentioned)"], correct: 0 },
    xpReward: 20,
  },
  {
    id: "ex-band2-reading-tfng-2", lessonId: "band2-reading-tfng", type: "multiple-choice",
    prompt: "Passage: 'Termites construct vents that open and close to maintain an interior temperature around 30°C, despite exterior temperatures swinging from 2°C to 42°C.' Statement: 'Internal termite mound temperatures fluctuate between 2°C and 42°C.'",
    data: { question: "Is the statement True, False, or Not Given?", options: ["TRUE", "FALSE (The exterior fluctuates; the interior stays around 30°C)", "NOT GIVEN"], correct: 1 },
    xpReward: 20,
  },
  {
    id: "ex-band2-reading-tfng-3", lessonId: "band2-reading-tfng", type: "multiple-choice",
    prompt: "Passage: 'Mick Pearce designed the Eastgate Centre in 1996 by emulating indigenous termite mounds.' Statement: 'Mick Pearce received financial awards from the government for his biomimetic design.'",
    data: { question: "Is the statement True, False, or Not Given?", options: ["TRUE", "FALSE", "NOT GIVEN (Financial awards are never mentioned in the passage)"], correct: 2 },
    xpReward: 20,
  },
  {
    id: "ex-band2-reading-tfng-4", lessonId: "band2-reading-tfng", type: "matching",
    prompt: "Match the IELTS Reading condition to its definitive answer code.",
    data: { pairs: [["Statement factually agrees with passage facts", "TRUE"], ["Statement directly contradicts facts in passage", "FALSE"], ["Passage lacks information to confirm or deny", "NOT GIVEN"], ["Statement makes unsupported extreme claim", "OFTEN FALSE OR NOT GIVEN"]] },
    xpReward: 20,
  },

  // ── IELTS Writing Task 1: Line Graph & Trend Precision ─────────────────────
  {
    id: "ex-band2-writing-line-graphs-1", lessonId: "band2-writing-line-graphs", type: "multiple-choice",
    prompt: "Data: UK Natural gas rose from 35 TWh in 1990 to 135 TWh in 2010. Which verb phrase is most appropriate for a Band 9 report?",
    data: { question: "Natural gas generation ___ between 1990 and 2010.", options: ["climbed marginally", "underwent a steep ascent", "plummeted drastically", "stagnated completely"], correct: 1 },
    xpReward: 20,
  },
  {
    id: "ex-band2-writing-line-graphs-2", lessonId: "band2-writing-line-graphs", type: "fill-blank",
    prompt: "Fill in the preposition: 'Natural gas production peaked ___ an apex of 135 TWh before declining.'",
    data: { sentence: "Natural gas production peaked ___ an apex of 135 TWh before declining.", answer: "at", hint: "Preposition used for exact numerical points" },
    xpReward: 20,
  },
  {
    id: "ex-band2-writing-line-graphs-3", lessonId: "band2-writing-line-graphs", type: "fill-blank",
    prompt: "Fill in the participle: 'Coal output experienced a sustained downturn, ___ (drop) to an all-time low of 12 TWh.'",
    data: { sentence: "Coal output experienced a sustained downturn, ___ to an all-time low of 12 TWh.", answer: "dropping", hint: "Present participle (verb + ing)" },
    xpReward: 20,
  },
  {
    id: "ex-band2-writing-line-graphs-4", lessonId: "band2-writing-line-graphs", type: "reorder",
    prompt: "Reorder into a Band 9 macro overview sentence:",
    data: { words: ["Overall,", "electricity", "production", "underwent", "a", "profound", "structural", "transition", "away", "from", "coal."], sentence: "Overall, electricity production underwent a profound structural transition away from coal." },
    xpReward: 20,
  },

  // ── IELTS Speaking Part 2: Cue Card & ARE Mastery ───────────────────────────
  {
    id: "ex-band2-speaking-cue-card-1", lessonId: "band2-speaking-cue-card", type: "multiple-choice",
    prompt: "In the Speaking Part 2 ARE framework, what do the letters A-R-E represent?",
    data: { question: "What does the ARE strategy stand for?", options: ["Action, Reaction, Emotion", "Assertion, Reason, Example/Elaboration", "Accent, Rhythm, Enunciation", "Argument, Refutation, Evidence"], correct: 1 },
    xpReward: 20,
  },
  {
    id: "ex-band2-speaking-cue-card-2", lessonId: "band2-speaking-cue-card", type: "fill-blank",
    prompt: "Complete the idiomatic collocation: 'The plastic bag levy catalyzed a profound psychological ___ in consumer behavior.'",
    data: { sentence: "The plastic bag levy catalyzed a profound psychological ___ in consumer behavior.", answer: "shift", hint: "Noun meaning a fundamental change" },
    xpReward: 20,
  },
  {
    id: "ex-band2-speaking-cue-card-3", lessonId: "band2-speaking-cue-card", type: "matching",
    prompt: "Match the spoken cue card phase to its natural discourse signpost.",
    data: { pairs: [["Opening assertion", "I'd like to discuss the nationwide levy on..."], ["Context & background", "Prior to this legislation, supermarkets dispensed billions of..."], ["Initial reception", "To be completely candid, public reception was mixed..."], ["Long-term impact", "What cements this initiative as an undeniable triumph is..."]] },
    xpReward: 20,
  },
  {
    id: "ex-band2-speaking-cue-card-4", lessonId: "band2-speaking-cue-card", type: "reorder",
    prompt: "Reorder this Band 9 spoken cleft sentence:",
    data: { words: ["What", "cements", "this", "initiative", "as", "a", "triumph", "is", "the", "behavioral", "shift."], sentence: "What cements this initiative as a triumph is the behavioral shift." },
    xpReward: 20,
  },

  // ── Grammar: Tenses Review ──────────────────────────────────────────────────
  {
    id: "ex-band2-grammar-tenses-1", lessonId: "band2-grammar-tenses", type: "fill-blank",
    prompt: "She ___ (study) English for five years before she moved to London.",
    data: { sentence: "She ___ English for five years before she moved to London.", answer: "had studied", hint: "Past perfect for action before another past action" },
    xpReward: 15,
  },
  {
    id: "ex-band2-grammar-tenses-2", lessonId: "band2-grammar-tenses", type: "multiple-choice",
    prompt: "Choose the correct tense: 'By next year, I ___ (finish) my degree.'",
    data: { question: "By next year, I ___ my degree.", options: ["will finish", "will have finished", "finish", "am finishing"], correct: 1 },
    xpReward: 15,
  },
  {
    id: "ex-band2-grammar-tenses-3", lessonId: "band2-grammar-tenses", type: "fill-blank",
    prompt: "At 8 PM last night, I ___ (watch) a movie.",
    data: { sentence: "At 8 PM last night, I ___ a movie.", answer: "was watching", hint: "Past continuous for action in progress at a specific time" },
    xpReward: 15,
  },
  {
    id: "ex-band2-grammar-tenses-4", lessonId: "band2-grammar-tenses", type: "multiple-choice",
    prompt: "Which sentence uses the present perfect correctly?",
    data: { question: "Choose the correct present perfect sentence:", options: ["I have seen him yesterday.", "She has lived here since 2010.", "They have went to Paris.", "We have been to the cinema last night."], correct: 1 },
    xpReward: 15,
  },

  // ── AWL Vocabulary 2 ────────────────────────────────────────────────────────
  {
    id: "ex-band2-vocab-awl2-1", lessonId: "band2-vocab-awl2", type: "fill-blank",
    prompt: "The researcher will ___ (collect/gather) data from the participants.",
    data: { sentence: "The researcher will ___ data from the participants.", answer: "obtain", hint: "Formal academic word for 'get'" },
    xpReward: 15,
  },
  {
    id: "ex-band2-vocab-awl2-2", lessonId: "band2-vocab-awl2", type: "multiple-choice",
    prompt: "What does 'consequently' mean?",
    data: { question: "'Consequently' means:", options: ["at first", "as a result", "in addition", "for example"], correct: 1 },
    xpReward: 15,
  },
  {
    id: "ex-band2-vocab-awl2-3", lessonId: "band2-vocab-awl2", type: "fill-blank",
    prompt: "There is a ___ (link/connection) between smoking and lung cancer.",
    data: { sentence: "There is a ___ between smoking and lung cancer.", answer: "correlation", hint: "Statistical relationship" },
    xpReward: 15,
  },
  {
    id: "ex-band2-vocab-awl2-4", lessonId: "band2-vocab-awl2", type: "matching",
    prompt: "Match each academic word to its definition.",
    data: { pairs: [["significant", "important"], ["similar", "alike"], ["specific", "particular"], ["structure", "framework"]] },
    xpReward: 15,
  },
  {
    id: "ex-band2-vocab-awl2-5", lessonId: "band2-vocab-awl2", type: "multiple-choice",
    prompt: "Choose the correct word: 'The ___ of the study was to investigate causes.'",
    data: { question: "The ___ of the study was to investigate causes.", options: ["aim", "aiming", "aimed", "aims"], correct: 0 },
    xpReward: 15,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Band 6–7 (Upper Intermediate)
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Listening: Academic Lectures ────────────────────────────────────────────
  {
    id: "ex-band3-listening-lecture-1", lessonId: "band3-listening-lecture", type: "fill-blank",
    prompt: "Academic lectures often use ___ phrases to introduce key points.",
    data: { sentence: "Academic lectures often use ___ phrases to introduce key points.", answer: "signpost", hint: "Words that guide the listener" },
    xpReward: 20,
  },
  {
    id: "ex-band3-listening-lecture-2", lessonId: "band3-listening-lecture", type: "multiple-choice",
    prompt: "What does 'Let us now turn to' typically signal?",
    data: { question: "'Let us now turn to' signals a:", options: ["conclusion", "new topic", "repetition", "question"], correct: 1 },
    xpReward: 20,
  },
  {
    id: "ex-band3-listening-lecture-3", lessonId: "band3-listening-lecture", type: "fill-blank",
    prompt: "A good strategy is to focus on the lecturer's ___ (tone/emphasis) to identify important information.",
    data: { sentence: "A good strategy is to focus on the lecturer's ___ to identify important information.", answer: "emphasis", hint: "Stress placed on certain words" },
    xpReward: 20,
  },
  {
    id: "ex-band3-listening-lecture-4", lessonId: "band3-listening-lecture", type: "matching",
    prompt: "Match each signpost phrase to its function.",
    data: { pairs: [["In conclusion", "summarise"], ["For instance", "give an example"], ["Having said that", "introduce a contrast"], ["The key point is", "highlight main idea"]] },
    xpReward: 20,
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
    id: "ex-band3-speaking-part3-1", lessonId: "band3-speaking-part3", type: "fill-blank",
    prompt: "IELTS Speaking Part 3 is a ___ (discussion/interview) with the examiner.",
    data: { sentence: "IELTS Speaking Part 3 is a ___ with the examiner.", answer: "discussion", hint: "Two-way conversation on abstract topics" },
    xpReward: 20,
  },
  {
    id: "ex-band3-speaking-part3-2", lessonId: "band3-speaking-part3", type: "multiple-choice",
    prompt: "In Part 3, you should give ___ answers.",
    data: { question: "You should give ___ answers in Part 3.", options: ["one-word", "short", "extended and detailed", "memorised"], correct: 2 },
    xpReward: 20,
  },
  {
    id: "ex-band3-speaking-part3-3", lessonId: "band3-speaking-part3", type: "fill-blank",
    prompt: "Using ___ phrases like 'from my perspective' shows good lexical resource.",
    data: { sentence: "Using ___ phrases like 'from my perspective' shows good lexical resource.", answer: "opinion", hint: "Expressing personal view" },
    xpReward: 20,
  },
  {
    id: "ex-band3-speaking-part3-4", lessonId: "band3-speaking-part3", type: "translation",
    prompt: "Translate to English: 'ما رأيك في تأثير التكنولوجيا على التعليم؟'",
    data: { en: "What is your opinion on the impact of technology on education?", ar: "ما رأيك في تأثير التكنولوجيا على التعليم؟" },
    xpReward: 20,
  },

  // ── Grammar: Conditionals ───────────────────────────────────────────────────
  {
    id: "ex-band3-grammar-conditionals-1", lessonId: "band3-grammar-conditionals", type: "fill-blank",
    prompt: "If I ___ (know) about the meeting, I would have attended.",
    data: { sentence: "If I ___ about the meeting, I would have attended.", answer: "had known", hint: "Third conditional: past perfect in if-clause" },
    xpReward: 20,
  },
  {
    id: "ex-band3-grammar-conditionals-2", lessonId: "band3-grammar-conditionals", type: "multiple-choice",
    prompt: "Choose the correct mixed conditional: 'If I ___ taller, I would be a basketball player.'",
    data: { question: "If I ___ taller, I would be a basketball player.", options: ["am", "was", "were", "had been"], correct: 2 },
    xpReward: 20,
  },
  {
    id: "ex-band3-grammar-conditionals-3", lessonId: "band3-grammar-conditionals", type: "fill-blank",
    prompt: "Unless the government ___ (take) action, the problem will worsen.",
    data: { sentence: "Unless the government ___ action, the problem will worsen.", answer: "takes", hint: "First conditional with 'unless' + present tense" },
    xpReward: 20,
  },
  {
    id: "ex-band3-grammar-conditionals-4", lessonId: "band3-grammar-conditionals", type: "reorder",
    prompt: "Reorder to form a third conditional sentence.",
    data: { words: ["If", "had", "saved", "money", "I", "would", "have", "bought", "a", "car"], sentence: "If I had saved money, I would have bought a car." },
    xpReward: 20,
  },

  // ── AWL Vocabulary 3 ────────────────────────────────────────────────────────
  {
    id: "ex-band3-vocab-awl3-1", lessonId: "band3-vocab-awl3", type: "fill-blank",
    prompt: "The government must ___ (put into action) new policies to reduce emissions.",
    data: { sentence: "The government must ___ new policies to reduce emissions.", answer: "implement", hint: "Formal verb for 'carry out'" },
    xpReward: 20,
  },
  {
    id: "ex-band3-vocab-awl3-2", lessonId: "band3-vocab-awl3", type: "multiple-choice",
    prompt: "What does 'subsequent' mean?",
    data: { question: "'Subsequent' means:", options: ["previous", "following", "simultaneous", "unrelated"], correct: 1 },
    xpReward: 20,
  },
  {
    id: "ex-band3-vocab-awl3-3", lessonId: "band3-vocab-awl3", type: "fill-blank",
    prompt: "The study's findings were ___ (in agreement) with previous research.",
    data: { sentence: "The study's findings were ___ with previous research.", answer: "consistent", hint: "Showing agreement or harmony" },
    xpReward: 20,
  },
  {
    id: "ex-band3-vocab-awl3-4", lessonId: "band3-vocab-awl3", type: "matching",
    prompt: "Match each academic word to its definition.",
    data: { pairs: [["establish", "set up"], ["distribute", "spread out"], ["estimate", "approximate calculation"], ["emphasis", "special importance"]] },
    xpReward: 20,
  },
  {
    id: "ex-band3-vocab-awl3-5", lessonId: "band3-vocab-awl3", type: "multiple-choice",
    prompt: "Choose the correct word: 'The research ___ (implies) that more work is needed.'",
    data: { question: "The research ___ that more work is needed.", options: ["implies", "infers", "implying", "implied"], correct: 0 },
    xpReward: 20,
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
    id: "ex-practice-tfng-1", lessonId: "band2-reading-tfng", type: "multiple-choice",
    prompt: "Text: 'Solar panels were installed on 40% of public schools in 2022.' Statement: 'A majority of public schools adopted solar energy in 2022.'",
    data: { question: "Is the statement True, False, or Not Given?", options: ["True", "False (40% is a minority, not a majority)", "Not Given"], correct: 1 },
    xpReward: 20,
  },
  {
    id: "ex-practice-tfng-2", lessonId: "band2-reading-tfng", type: "multiple-choice",
    prompt: "Text: 'Dr. Evans published the first clinical trial on the medication in 2019.' Statement: 'Dr. Evans was awarded a prize for his clinical research.'",
    data: { question: "Is the statement True, False, or Not Given?", options: ["True", "False", "Not Given (The text mentions the publication, but says nothing about an award)"], correct: 2 },
    xpReward: 20,
  },

  // ── IELTS Academic Writing Task 1: Double Chart & Proportions ──────────────
  {
    id: "ex-practice-bar-pie-1", lessonId: "band2-writing-bar-pie", type: "multiple-choice",
    prompt: "According to the double chart data, which activity secured the largest proportion of government sports grants?",
    data: { question: "Which sport secured the lion's share (42%) of public funding despite lower youth uptake?", options: ["Swimming", "Running", "Cycling", "Tennis"], correct: 2 },
    xpReward: 20,
  },
  {
    id: "ex-practice-bar-pie-2", lessonId: "band2-writing-bar-pie", type: "fill-blank",
    prompt: "Complete the comparative sentence: 'Cycling funding ___ (exceed) running subsidies by a factor of more than three.'",
    data: { sentence: "Cycling funding ___ running subsidies by a factor of more than three.", answer: "exceeded", hint: "Past tense verb meaning surpassed" },
    xpReward: 20,
  },
  {
    id: "ex-practice-bar-pie-3", lessonId: "band2-writing-bar-pie", type: "reorder",
    prompt: "Reorder to form a Band 9 comparative overview sentence:",
    data: { words: ["In", "stark", "contrast", "to", "running,", "swimming", "maintained", "resilient", "popularity", "across", "all", "generations."], sentence: "In stark contrast to running, swimming maintained resilient popularity across all generations." },
    xpReward: 20,
  },

  // ── IELTS Academic Task 2: Discursive Essay (Gap Year) ──────────────────────
  {
    id: "ex-practice-opinion-1", lessonId: "band2-writing-opinion", type: "multiple-choice",
    prompt: "Which thesis statement best fulfills Band 9 criteria by taking an unambiguous, nuanced stance on taking a gap year?",
    data: { question: "Choose the strongest thesis statement for the Cambridge gap year prompt:", options: ["Some people like gap years, but others don't, so both views are true.", "While concerns persist regarding academic momentum, I firmly contend that the maturity and vocational clarity gained during a gap year substantially outweigh any temporary setbacks.", "Taking a gap year is always 100% good for every single student without any possible drawbacks.", "In this essay I will talk about students who travel."], correct: 1 },
    xpReward: 25,
  },
  {
    id: "ex-practice-opinion-2", lessonId: "band2-writing-opinion", type: "matching",
    prompt: "Match the PEEL paragraph component to its function in an academic essay:",
    data: { pairs: [["Point (Topic Sentence)", "States the primary controlling idea of the paragraph"], ["Explanation", "Elaborates on why or how the phenomenon occurs"], ["Evidence / Example", "Provides a concrete scenario or real-world manifestation"], ["Link", "Connects the argument back to the central thesis statement"]] },
    xpReward: 25,
  },

  // ── TOEFL Writing: Academic Discussion (Remote Work vs Office) ─────────────
  {
    id: "ex-practice-discussion-1", lessonId: "band3-writing-multiple-charts", type: "multiple-choice",
    prompt: "In the ETS Academic Discussion prompt with Prof. Glover, Claire, and Paul, what is the best strategy to earn Score 5.0?",
    data: { question: "To achieve Score 5.0 in TOEFL Academic Discussion, your post must:", options: ["Simply copy Claire's words and agree with her completely", "Directly engage with Claire and Paul's points while introducing a fresh perspective or compromise", "Write a 500-word story about your personal childhood without mentioning the debate", "Criticize the professor for asking an irrelevant question"], correct: 1 },
    xpReward: 25,
  },
  {
    id: "ex-practice-discussion-2", lessonId: "band3-writing-multiple-charts", type: "fill-blank",
    prompt: "Fill in the transition: 'While Claire emphasizes the time-saving benefits of remote work, I believe the most viable approach is a structured ___ framework.'",
    data: { sentence: "While Claire emphasizes the time-saving benefits of remote work, I believe the most viable approach is a structured ___ framework.", answer: "hybrid", hint: "Combining in-office and remote work" },
    xpReward: 25,
  },

  // ── TOEFL Writing: Integrated Task (Asteroid Mining Rebuttal) ───────────────
  {
    id: "ex-practice-integrated-1", lessonId: "band3-writing-maps-processes", type: "matching",
    prompt: "Match the reading claim with the professor's counterargument in the integrated lecture:",
    data: { pairs: [["Rocket propulsion costs are too high", "Solar-electric ion engines reduce propellant mass by 90%"], ["Zero-gravity ore processing is hazardous", "Rotating centrifugal pods create localized artificial gravity"], ["Atmospheric re-entry risks burning up payloads", "Carbon-composite heat shields and parachutes ensure oceanic splashdown"]] },
    xpReward: 25,
  },
  {
    id: "ex-practice-integrated-2", lessonId: "band3-writing-maps-processes", type: "fill-blank",
    prompt: "Complete the attribution formula: 'The lecturer ___ (cast) serious doubt upon the author's economic conclusions.'",
    data: { sentence: "The lecturer ___ serious doubt upon the author's economic conclusions.", answer: "casts", hint: "Third-person singular present verb" },
    xpReward: 25,
  },

  // ── TOEFL Speaking Task 2: Campus Announcement (Bookstore E-Receipts) ───────
  {
    id: "ex-practice-speaking-toefl-1", lessonId: "band3-speaking-toefl4", type: "multiple-choice",
    prompt: "In the campus conversation, why does the female student object to switching to digital receipts at the bookstore?",
    data: { question: "What are the student's two main reasons for opposing digital bookstore receipts?", options: ["She dislikes reading on screens and thinks trees should be cut down", "E-receipts might go to spam causing buyback refund issues, and basement Wi-Fi is too weak to load barcodes", "The bookstore is closing down permanently next semester", "She wants paper receipts to use as bookmarks"], correct: 1 },
    xpReward: 25,
  },

  // ── TOEFL Academic Discussion & Lecture Signposting ────────────────────────
  {
    id: "ex-practice-lecture-1", lessonId: "band3-listening-lecture", type: "matching",
    prompt: "Match the university lecture transition phrase to its rhetorical function.",
    data: { pairs: [["To put it another way", "Clarification / Paraphrasing"], ["Having said that", "Introducing a concession or contrast"], ["To corroborate these findings", "Providing supporting evidence"], ["Let us now turn our attention to", "Shifting to the next major point"]] },
    xpReward: 25,
  },
  {
    id: "ex-practice-section3-1", lessonId: "band3-listening-section3", type: "multiple-choice",
    prompt: "In a Section 3 tutorial, speaker A says: 'I wouldn't rule out qualitative interviews.' What does speaker A mean?",
    data: { question: "What does 'I wouldn't rule out' signify in academic consensus?", options: ["We definitely should not do interviews", "We should consider interviews as a valid option", "Interviews are forbidden by the professor", "Interviews take too long to evaluate"], correct: 1 },
    xpReward: 25,
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
];
