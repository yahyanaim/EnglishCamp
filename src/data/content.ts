import type { Level, Lesson, Block } from "./types";

// ─── Band 4–5 (Foundation) Lessons ──────────────────────────

const band1Lesson1: Lesson = {
  id: "band1-ielts-intro",
  title: "Cambridge B2 First (FCE): Use of English Masterclass",
  subtitle: "Parts 1 to 4 mechanics & scoring strategies",
  xpReward: 60,
  blocks: [
    {
      kind: "p",
      text: "The Cambridge B2 First (formerly FCE) Reading and Use of English paper lasts 1 hour and 15 minutes and consists of 7 parts (52 questions). Parts 1 to 4 specifically evaluate your grammatical accuracy, lexical control, collocation familiarity, and syntactic transformation capability at the CEFR B2 level.",
    },
    {
      kind: "table",
      headers: ["Part","Task Format","Focus","Total Questions"],
      rows: [
        ["Part 1","Multiple-Choice Cloze (4 options per gap)","Collocations, idioms, phrasal verbs, dependent prepositions","8 questions (1 mark each)"],
        ["Part 2","Open Cloze (fill in gap with ONE word)","Grammatical words: pronouns, prepositions, determiners, auxiliaries","8 questions (1 mark each)"],
        ["Part 3","Word Formation (transform prompt word)","Prefixes, suffixes, noun/adjective/verb derivations","8 questions (1 mark each)"],
        ["Part 4","Key Word Transformations (2 to 5 words)","Grammar structures: passives, reported speech, conditionals, inversion","6 questions (up to 2 marks each)"]
      ],
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Part 4 Key Word Transformation Secret",
      text: "In Part 4, you are given a complete sentence, a key word in capital letters, and a second sentence with a gap. You must complete the gap using 2 to 5 words, INCLUDING the given word, so that the second sentence means exactly the same as the first. You must NEVER change the key word.",
    },
    {
      kind: "table",
      headers: ["Original Sentence","Key Word","Correct B2 Transformation (2–5 words)"],
      rows: [
        [
          "It's too cold to go swimming today.",
          "ENOUGH",
          "It is [not warm enough to go] swimming today."
        ],
        [
          "I haven't seen Daniel for two years.",
          "TIME",
          "The [last time I saw] Daniel was two years ago."
        ],
        [
          "They think the ancient castle was built in 1400.",
          "THOUGHT",
          "The ancient castle is [thought to have been built] in 1400."
        ]
      ],
    },
    {
      kind: "examples",
      items: [
        { en: "Do not exceed the five-word limit in Key Word Transformations.", tr: "Do not exceed the five-word limit in Key Word Transformations.", ar: "لا تتجاوز الحد الأقصى البالغ خمس كلمات في تحويل الكلمات المفتاحية." },
        { en: "In Open Cloze, the missing word is almost always a grammatical connector.", tr: "In Open Cloze, the missing word is almost always a grammatical connector.", ar: "في الفراغ المفتوح، تكون الكلمة المفقودة دائماً أداة ربط نحوية." },
        { en: "Part 4 awards one mark for each half of the transformation answered accurately.", tr: "Part 4 awards one mark for each half of the transformation answered accurately.", ar: "يمنح الجزء الرابع درجة واحدة لكل نصف يتم الإجابة عنه بدقة في التحويل." }
      ],
    },
  ],
};

const band1Lesson2: Lesson = {
  id: "band1-toefl-intro",
  title: "Cambridge B2 First: Word Formation Masterclass",
  subtitle: "Morphological derivations, prefixes & suffixes",
  xpReward: 60,
  blocks: [
    {
      kind: "p",
      text: "Cambridge B2 Use of English Part 3 requires you to fill 8 gaps by changing the form of a base word in capitals at the end of each line. You will often need to add a prefix, a suffix, make an internal spelling change, or form a negative meaning.",
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The 3-Step Word Formation Method",
      text: "1. Identify the required part of speech: Look at surrounding syntax (e.g., after an article or possessive $\\rightarrow$ NOUN; modifying a verb $\\rightarrow$ ADVERB; before a noun $\\rightarrow$ ADJECTIVE).\n2. Determine polarity: Does the sentence express a positive or negative meaning? If negative, attach a prefix like un-, in-, im-, dis-, or suffix -less.\n3. Verify spelling: Check doubling of consonants, dropping final 'e', or changing 'y' to 'i'.",
    },
    {
      kind: "table",
      headers: ["Base Word","Part of Speech Needed","Sentence Context","Correct Transformed Form"],
      rows: [
        ["DECIDE","Adjective","The CEO made a quick and ___ choice.","DECISIVE"],
        ["DECIDE","Negative Noun","His constant ___ caused major project delays.","INDECISION"],
        ["CONFIDENT","Adverb","She stepped onto the stage and spoke ___.","CONFIDENTLY"],
        ["APPEAR","Negative Verb","The hiker seemed to ___ into thin air.","DISAPPEAR"],
        ["ABLE","Verb","Modern smartphones ___ us to work from anywhere.","ENABLE"],
        ["VARY","Noun","The bakery offers an incredible ___ of pastries.","VARIETY"]
      ],
    },
    {
      kind: "examples",
      items: [
        { en: "Watch out for context clues signaling an opposite or negative meaning.", tr: "Watch out for context clues signaling an opposite or negative meaning.", ar: "انتبه للقرائن السياقية التي تشير إلى معنى مضاد أو سلبي." },
        { en: "Always check whether a noun should be singular or plural in context.", tr: "Always check whether a noun should be singular or plural in context.", ar: "تحقق دائماً مما إذا كان الاسم يجب أن يكون مفرداً أم جمعاً في السياق." },
        { en: "Changing 'able' to 'enable' turns an adjective into a transitive verb.", tr: "Changing 'able' to 'enable' turns an adjective into a transitive verb.", ar: "تحويل 'able' إلى 'enable' يحول الصفة إلى فعل متعدٍ." }
      ],
    },
  ],
};

const band1Lesson3: Lesson = {
  id: "band1-ielts-vs-toefl",
  title: "EnglishPage Masterclass: Verb Tenses, Timelines & Aspect",
  subtitle: "Mastering Present Perfect vs Past Simple & Past Perfect Sequence",
  xpReward: 60,
  blocks: [
    {
      kind: "p",
      text: "On international exams like IELTS, TOEFL, and Cambridge B2, high-band grammatical range requires understanding 'aspect'—how an action relates to time. Examiners penalize candidates who rely solely on simple past when past perfect sequence or present perfect continuous is grammatically demanded.",
    },
    {
      kind: "callout",
      tone: "rule",
      title: "EnglishPage Core Rule: Completed Past vs Present Connection",
      text: "• Past Simple: Use ONLY when an action was completed at a specific finished point in the past with past time markers (yesterday, in 2021, two weeks ago, when I was at university).\n• Present Perfect Simple (have/has + V3): Connects a past action to the present moment without a finished time marker. Emphasizes current result, personal life experience (ever, never), or an unfinished time period (this week, so far, recently).\n• Present Perfect Continuous (have/has been + V-ing): Emphasizes the duration or process of an activity that started in the past and is still ongoing or just finished with visible present consequences.",
    },
    {
      kind: "table",
      headers: ["Grammar Structure","Tense Formula","Time Markers / Context","Authentic Exam Example"],
      rows: [
        [
          "Past Simple",
          "Subject + Verb (past/V2)",
          "yesterday, in 2019, 3 days ago, last month",
          "The research team published their preliminary findings last June."
        ],
        [
          "Present Perfect Simple",
          "Subject + have/has + V3",
          "already, yet, just, so far, over the past decade",
          "Scientists have identified three major variables influencing urban migration."
        ],
        [
          "Present Perfect Continuous",
          "Subject + have/has been + V-ing",
          "for 5 hours, since 2015, all morning, lately",
          "Demographers have been tracking rural depopulation trends since 2010."
        ],
        [
          "Past Perfect Simple",
          "Subject + had + V3",
          "by the time, before, prior to, already",
          "By the time the symposium began, delegates had already reviewed the agenda."
        ],
        [
          "Future Perfect",
          "Subject + will have + V3",
          "by next year, by 2030, within the next decade",
          "By 2030, the municipal council will have constructed four new solar facilities."
        ]
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "The Stative Verb Trap (Examiner Warning)",
      text: "Stative verbs describing states, thoughts, possession, and emotions (know, believe, understand, belong, exist, prefer) CANNOT be used in continuous tenses. Write: 'I have known professor Higgins for five years', NOT 'I have been knowing him'.",
    },
    {
      kind: "examples",
      items: [
        { en: "The government has implemented strict environmental regulations this year.", tr: "The government has implemented strict environmental regulations this year.", ar: "طبقت الحكومة لوائح بيئية صارمة هذا العام (أثر حاضر مستمر)." },
        { en: "By the time archaeologists excavated the tomb, looters had already stolen the gold artifacts.", tr: "By the time archaeologists excavated the tomb, looters had already stolen the gold artifacts.", ar: "بحلول الوقت الذي نقب فيه علماء الآثار المقبرة، كان اللصوص قد سرقوا الآثار الذهبية بالفعل (تسلسل ماضٍ)." },
        { en: "Epidemiologists have been analyzing the transmission rates for six consecutive weeks.", tr: "Epidemiologists have been analyzing the transmission rates for six consecutive weeks.", ar: "يعكف علماء الأوبئة على تحليل معدلات الانتقال لستة أسابيع متتالية (تركيز على استمرار الإجراء)." }
      ],
    },
  ],
};

const band1Lesson4: Lesson = {
  id: "band1-listening-format",
  title: "Randall's ESL Lab: Section 1 Form-Filling & Auditory Distractor Traps",
  subtitle: "Handling dates, numbers, postcodes & sudden self-corrections",
  xpReward: 60,
  blocks: [
    {
      kind: "p",
      text: "In IELTS Listening Section 1 and Cambridge B2 transactional tasks, candidates listen to everyday conversations (e.g., booking accommodation, registering for a conference, reporting lost property). Over 65% of incorrect answers stem from 'auditory distractors'—where a speaker intentionally mentions a false detail first before correcting it.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "The 4 Core Distractor Patterns from Randall's ESL Lab",
      text: "1. The Self-Correction Trap: The speaker gives one number or day, hesitates, and corrects it with phrases like: 'Oh sorry, actually...', 'Let me check that... no, wait', 'That was last year's figure'.\n2. The Number Stress Trap: Distinguishing -teen (/ˈfiːf.tiːn/) with high pitch and stress from -ty (/ˈfɪf.ti/) with low dropped ending.\n3. Spelling & Double Letters: British speakers say 'double E' or 'double T'. The letter 'H' is pronounced /eɪtʃ/ (not /heɪtʃ/), and 'Z' is /zed/.\n4. Alphanumeric Postal Codes: Standard British formats like 'SW1A 1AA' or Canadian 'K1A 0B1'. The digit 0 is usually pronounced as the letter 'oh'.",
    },
    {
      kind: "dialogue",
      title: "Authentic Section 1 Script: University Housing Reservation",
      lines: [
        { speaker: "Registrar", en: "Good morning, Student Housing. How can I help you today?", tr: "Good morning, Student Housing. How can I help you today?" },
        { speaker: "Student", en: "Hi! I'd like to book a room at the West Hall campus for the autumn term.", tr: "Hi! I'd like to book a room at the West Hall campus for the autumn term." },
        { speaker: "Registrar", en: "Certainly. May I take your full surname and student ID number?", tr: "Certainly. May I take your full surname and student ID number?" },
        { speaker: "Student", en: "Yes, it's Al-Mansoor. That's A-L, hyphen, M-A-N-S-double O-R. Student ID is 9-4-8-7-2-oh.", tr: "Yes, it's Al-Mansoor. That's A-L, hyphen, M-A-N-S-double O-R. Student ID is 9-4-8-7-2-oh." },
        { speaker: "Registrar", en: "Got it. And what date will you be arriving in Manchester?", tr: "Got it. And what date will you be arriving in Manchester?" },
        { speaker: "Student", en: "My flight lands on the 14th of September... oh wait, sorry, my airline just rescheduled the arrival to the 16th.", tr: "My flight lands on the 14th of September... oh wait, sorry, my airline just rescheduled the arrival to the 16th." },
        { speaker: "Registrar", en: "Right, so check-in is the 16th of September. The single ensuite room is £150 per week.", tr: "Right, so check-in is the 16th of September. The single ensuite room is £150 per week." }
      ]
    },
    {
      kind: "table",
      headers: ["Distractor Trigger Phrase","Speaker's First (Distractor)","Correct Corrected Answer","Examiner Reason"],
      rows: [
        [
          "'Oh wait, sorry, the airline rescheduled...'",
          "14th September",
          "16th September",
          "Speaker self-corrected after checking flight details"
        ],
        [
          "'M-A-N-S-double O-R'",
          "Al-Mansor (single O)",
          "Al-Mansoor (double O)",
          "Testing candidate auditory spelling recognition"
        ],
        [
          "'...two-oh'",
          "two-zero or letter O",
          "Digit 0",
          "0 is conventionally pronounced as 'oh' in UK telephone/ID strings"
        ]
      ],
    },
    {
      kind: "examples",
      items: [
        { en: "Never write down the first date or price you hear until the speaker finishes the statement.", tr: "Never write down the first date or price you hear until the speaker finishes the statement.", ar: "لا تكتب أبداً أول تاريخ أو سعر تسمعه حتى ينتهي المتحدث من جملته لتتأكد من عدم وجود تصحيح ذاتي." },
        { en: "Check the word count limit strictly: 'NO MORE THAN TWO WORDS AND/OR A NUMBER'.", tr: "Check the word count limit strictly: 'NO MORE THAN TWO WORDS AND/OR A NUMBER'.", ar: "التزم بحد الكلمات المطلوب بدقة: مثلاً لا أكثر من كلمتين و/أو رقم." }
      ],
    },
  ],
};

const band1Lesson5: Lesson = {
  id: "band1-listening-gist",
  title: "BBC 6-Minute English: Connected Speech, Linking & Catenation",
  subtitle: "How native speakers blend words: consonant-to-vowel & intrusive sounds",
  xpReward: 60,
  blocks: [
    {
      kind: "p",
      text: "When English is spoken at natural speed in BBC broadcasts or IELTS Section 3 conversations, speakers do not pronounce words in isolation. Words flow into each other through catenation (linking), sound intrusion, and vowel reduction. Understanding these 4 phonetic rules stops fast English from sounding like an unbroken blur.",
    },
    {
      kind: "table",
      headers: ["Connected Speech Feature","Phonetic Mechanism","Written Sentence","Spoken Pronunciation"],
      rows: [
        [
          "Consonant-to-Vowel Catenation",
          "Final consonant jumps to the first vowel of the next word",
          "Hold on for a second",
          "/həʊl.dɒn fər ə ˈsek.ənd/"
        ],
        [
          "Intrusive /r/ Linking",
          "Non-rhotic speakers insert an /r/ sound between two vowels",
          "Law and order",
          "/lɔː.r.ənd.ˈɔː.də/"
        ],
        [
          "Intrusive /w/ Linking",
          "After lips-rounded vowels (/uː/, /əʊ/), an unwritten /w/ bridges to the next vowel",
          "Go out and vote",
          "/ɡəʊ.waʊt ənd vəʊt/"
        ],
        [
          "Intrusive /j/ Linking",
          "After spread-lips vowels (/iː/, /eɪ/, /aɪ/), an unwritten /j/ sound bridges vowels",
          "I agree completely",
          "/aɪ.jəˈɡriː kəmˈpliːt.li/"
        ],
        [
          "Elision (Sound Deletion)",
          "The stops /t/ and /d/ disappear when sandwiched between consonants",
          "The next bus leaves soon",
          "/ðə neks bʌs liːvz suːn/"
        ]
      ],
    },
    {
      kind: "dialogue",
      title: "BBC 6-Minute English Excerpt: 'Why Do We Procrastinate?'",
      lines: [
        { speaker: "Neil", en: "Hello and welcome to 6 Minute English! I'm Neil, and joining me today is Beth.", tr: "Hello and welcome to 6 Minute English! I'm Neil, and joining me today is Beth." },
        { speaker: "Beth", en: "Hello Neil! So, have you started working on our end-of-year financial audit report yet?", tr: "Hello Neil! So, have you started working on our end-of-year financial audit report yet?" },
        { speaker: "Neil", en: "Well, to be honest, I've been putting it off! Notice how I said 'putting it off'—in connected speech it sounds like 'put-ting-i-toff'.", tr: "Well, to be honest, I've been putting it off! Notice how I said 'putting it off'—in connected speech it sounds like 'put-ting-i-toff'." },
        { speaker: "Beth", en: "Exactly! That's consonant-to-vowel catenation. And postponing an unpleasant task is called 'procrastination'.", tr: "Exactly! That's consonant-to-vowel catenation. And postponing an unpleasant task is called 'procrastination'." }
      ]
    },
    {
      kind: "callout",
      tone: "tip",
      title: "BBC Shadowing Technique for IELTS Candidates",
      text: "To decode fast listening audio, use the BBC Shadowing method: Play a 10-second sentence from 6 Minute English, pause, and repeat it out loud immediately while matching the speaker's rhythm, linking, and stress. If you can pronounce connected speech, your ears will instantly recognize it in the exam.",
    },
    {
      kind: "examples",
      items: [
        { en: "In natural English, 'an apple' is pronounced as /ə.næpl/, not as two separate words.", tr: "In natural English, 'an apple' is pronounced as /ə.næpl/, not as two separate words.", ar: "في الإنجليزية الطبيعية، تُنطق 'an apple' مدمجة كـ /ə.næpl/ وليس ككلمتين منفصلتين." },
        { en: "The /t/ in 'first class' disappears in speech: /fɜːs klɑːs/.", tr: "The /t/ in 'first class' disappears in speech: /fɜːs klɑːs/.", ar: "صوت /t/ في 'first class' يسقط في الكلام السريع ليصبح /fɜːs klɑːs/." }
      ],
    },
  ],
};

const band1Lesson6: Lesson = {
  id: "band1-listening-attitude",
  title: "Listening: Recognizing Speaker Attitude",
  subtitle: "Tone and opinion words",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "In the IELTS Listening test, you may need to identify a speaker's attitude, opinion, or feeling. Speakers express attitudes through tone of voice, word choice (positive/negative language), and phrases like 'I believe', 'in my opinion', 'unfortunately', or 'I'm afraid that'. Pay attention to hesitations, stress on certain words, and intonation patterns.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Key Phrases for Opinions",
      text: "Learn to recognize opinion phrases: 'As far as I'm concerned', 'It seems to me that', 'I'm convinced that', 'I strongly believe'. Negative attitudes are often signaled by 'I'm afraid', 'unfortunately', 'to be honest, I'm not keen on'.",
    },
    {
      kind: "table",
      headers: ["Expression","Attitude","Arabic"],
      rows: [["I strongly believe that...","Strong positive opinion","أعتقد بشدة أن"],["As far as I'm concerned...","Giving opinion","فيما يخصني"],["I'm not entirely convinced...","Skeptical","لست مقتنعاً تماماً"],["Unfortunately...","Negative","لسوء الحظ"],["To be honest...","Frank opinion","بصراحة"],["I'm afraid that...","Regretful","أخشى أن"]],
    },
    {
      kind: "examples",
      items: [{"en":"I strongly believe this is the best solution.","tr":"I strongly believe this is the best solution.","ar":"أعتقد بشدة أن هذا هو أفضل حل."},{"en":"Unfortunately, the results were disappointing.","tr":"Unfortunately, the results were disappointing.","ar":"لسوء الحظ، كانت النتائج مخيبة للآمال."},{"en":"As far as I'm concerned, we should wait.","tr":"As far as I'm concerned, we should wait.","ar":"فيما يخصني، يجب أن ننتظر."}],
    },
  ],
};

const band1Lesson7: Lesson = {
  id: "band1-reading-skimming",
  title: "UVic Study Zone: Skimming & Topic Sentence Decomposition",
  subtitle: "Extracting macro-structure & paragraph headings from academic texts in 45 seconds",
  xpReward: 60,
  blocks: [
    {
      kind: "p",
      text: "Academic reading in IELTS, TOEFL, and Cambridge B2 requires reading 2,500+ words in 60 minutes. Candidates who read word-by-word universally run out of time. Skimming is not lazy reading; it is systematic structural analysis. Following the University of Victoria (UVic) Study Zone methodology, 80% of an academic paragraph's core meaning resides in its Topic Sentence and Transition Concluding sentence.",
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The UVic Topic Sentence Anatomy",
      text: "Every academic paragraph contains three structural layers:\n1. The Topic Sentence (usually Sentence 1 or 2): Introduces the central argument or phenomenon.\n2. Supporting Evidence (Sentences 2–5): Provides empirical data, case studies, or researcher quotes.\n3. The Transition/Summary (Final Sentence): Links the paragraph to the broader thesis or signals a contrast.\nRule: When skimming for matching headings, never base your answer on the supporting evidence.",
    },
    {
      kind: "p",
      text: "AUTHENTIC PASSAGE: Urban Heat Islands & Green Roof Systems\n\nParagraph A: Across modern metropolises, asphalt pavements and dark roofing materials absorb solar radiation during daylight hours and re-radiate it after dusk, raising city temperatures up to 6°C above peripheral rural areas. This phenomenon, known as the Urban Heat Island (UHI) effect, dramatically spikes municipal electricity consumption for cooling while exacerbating respiratory illnesses among vulnerable citizens.\n\nParagraph B: To mitigate these elevated microclimates, urban planners are mandating the integration of extensive vegetative roofs on commercial skyscrapers. Incorporating drought-resistant Sedum plants and water-retaining substrates, these biosystems prevent thermal absorption through evapotranspiration, effectively insulating the upper storeys and slashing interior cooling demands by an estimated 25% to 32%.\n\nParagraph C: Despite their demonstrated thermodynamic benefits, widespread adoption faces formidable financial hesitation among property developers. The initial capital expenditure for retrofitting existing structural foundations and installing root-barrier membranes remains roughly triple that of conventional tar membranes, deterring investors focused solely on short-term amortization.",
    },
    {
      kind: "table",
      headers: ["Paragraph","First Sentence (Topic Gist)","IELTS Heading Paraphrase","Common Distractor Trap"],
      rows: [
        [
          "Paragraph A",
          "Dark materials absorb and re-radiate heat, raising city temperatures...",
          "The origins and public health repercussions of thermal concentration",
          "Trap: Choosing 'Electricity costs' (this is merely a minor supporting detail in sentence 2)"
        ],
        [
          "Paragraph B",
          "Urban planners are mandating vegetative roofs on skyscrapers...",
          "An ecological architectural countermeasure to elevated temperatures",
          "Trap: Choosing 'Sedum plant cultivation' (an example, not the paragraph's main thrust)"
        ],
        [
          "Paragraph C",
          "Widespread adoption faces formidable financial hesitation...",
          "Economic obstacles impeding the implementation of green rooftops",
          "Trap: Choosing 'Building membrane installation' (a technical technicality, not the core theme)"
        ]
      ],
    },
    {
      kind: "callout",
      tone: "tip",
      title: "The 3-Step Heading Matching Protocol",
      text: "1. Skim the first two sentences of the paragraph to identify the Topic.\n2. Summarize the paragraph in 3 of your own words BEFORE glancing at the list of Roman-numeral headings.\n3. Match your 3-word summary against the headings, watching out for synonyms rather than verbatim words.",
    },
    {
      kind: "examples",
      items: [
        { en: "The topic sentence encapsulates the governing claim of the entire paragraph.", tr: "The topic sentence encapsulates the governing claim of the entire paragraph.", ar: "الجملة الافتتاحية تلخص الفكرة الحاكمة للفقرة بأكملها." },
        { en: "Beware of option choices that repeat exact words from the text but describe minor supporting details.", tr: "Beware of option choices that repeat exact words from the text but describe minor supporting details.", ar: "احذر من الخيارات التي تكرر كلمات حرفية من النص لكنها تصف مجرد تفصيل ثانوي." }
      ],
    },
  ],
};

const band1Lesson8: Lesson = {
  id: "band1-reading-scanning",
  title: "UVic & British Council: Precision Scanning & Synonym Target Tracking",
  subtitle: "Targeting names, statistics, dates & paraphrased keywords under strict exam time limits",
  xpReward: 60,
  blocks: [
    {
      kind: "p",
      text: "While skimming reveals the structural skeleton of a text, scanning is precision radar tracking. When answering Short-Answer, Sentence Completion, or Multiple Choice questions, you must locate the specific locus of information without reading intervening paragraphs. Crucially, examiners intentionally paraphrase question keywords so you do not spot exact words.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "The 3 High-Speed Visual Anchor Targets",
      text: "1. Numeric Anchors (Easiest to spot): Years (1987), percentages (43%), temperatures (-18°C), currency symbols ($12m).\n2. Proper Nouns & Capitalized Tokens: Names of researchers (Dr. Aris Thorne), geographic locations (Lake Baikal), institutional bodies (NASA, IPCC).\n3. Technical Nomenclature: Latin binomials, hyphenated compounds, or quotation-marked jargon.",
    },
    {
      kind: "p",
      text: "AUTHENTIC PASSAGE: Extremophiles in Subglacial Antarctic Lakes\n\nDeep beneath 3.8 kilometers of Antarctic ice sheet lies Lake Vostok, a pristine subglacial freshwater body isolated from the Earth's atmosphere for over 15 million years. In 2012, a collaborative drilling expedition headed by Dr. Viktor Lukin successfully penetrated the ice barrier using kerosene lubricant seals to prevent borehole contamination. Water samples retrieved from the accretion ice revealed over 3,500 distinct DNA sequences, predominantly belonging to chemoautotrophic bacteria. Unlike photosynthetic organisms, these extremophiles survive by oxidizing dissolved sulfur and methane compounds under crushing hydrostatic pressure equivalent to 350 atmospheres, with ambient water temperatures hovering at -3°C.",
    },
    {
      kind: "table",
      headers: ["Question Target","Question Keyword","Text Synonym/Paraphrase","Visual Anchor in Passage"],
      rows: [
        [
          "Isolation period",
          "separated from atmosphere",
          "'isolated from the Earth's atmosphere'",
          "Scan for number: '15 million years'"
        ],
        [
          "Expedition leader",
          "led by",
          "'headed by'",
          "Scan for capital letters: 'Dr. Viktor Lukin'"
        ],
        [
          "Energy source",
          "obtain metabolic fuel",
          "'survive by oxidizing dissolved sulfur and methane'",
          "Scan for chemical terms: 'sulfur and methane'"
        ],
        [
          "Pressure level",
          "atmospheric force",
          "'crushing hydrostatic pressure'",
          "Scan for numeric measurement: '350 atmospheres'"
        ]
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "The Parallel Paraphrase Trap",
      text: "Never search only for the exact word from the question. If the question asks: 'What resulted in the contamination of the samples?', scan for synonyms of 'resulted in': caused, triggered, stem from, led to, originated in.",
    },
    {
      kind: "examples",
      items: [
        { en: "Always anchor your eyes to dates and capitalized names first before reading the line.", tr: "Always anchor your eyes to dates and capitalized names first before reading the line.", ar: "ثبت عينيك دائماً على التواريخ والأسماء ذات الحروف الكبيرة أولاً قبل قراءة السطر." },
        { en: "Paraphrase recognition is the single most tested skill in academic reading.", tr: "Paraphrase recognition is the single most tested skill in academic reading.", ar: "التعرف على إعادة الصياغة هو المهارة الأكثر اختباراً على الإطلاق في القراءة الأكاديمية." }
      ],
    },
  ],
};

const band1Lesson9: Lesson = {
  id: "band1-reading-completion",
  title: "Reading: Sentence Completion",
  subtitle: "Grammar clues in gaps",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Sentence completion questions give you a sentence with a gap and ask you to fill it using words from the passage. The words must fit both the meaning and the grammar of the sentence. Check the word limit (e.g., 'NO MORE THAN TWO WORDS'). Use grammar clues: if the gap follows 'a' or 'an', the answer is a singular countable noun; if it follows 'to', the answer is a verb in base form.",
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Grammar Clues",
      text: "Before the gap: 'a/an' → singular noun. 'the' → specific noun (maybe mentioned before). 'to' → base verb. 'was/were' → past participle or adjective. 'many/several' → plural noun. 'much/a little' → uncountable noun. Use these clues to predict the word type before searching.",
    },
    {
      kind: "table",
      headers: ["Clue Before Gap","Word Type Needed","Example"],
      rows: [["a / an","Singular countable noun","a ___ (book)"],["the","Specific noun","the ___ (government)"],["to","Base verb","to ___ (improve)"],["was / were","Past participle / adjective","was ___ (created)"],["many / several","Plural noun","many ___ (countries)"]],
    },
    {
      kind: "examples",
      items: [{"en":"The government introduced a new ___ (policy).","tr":"The government introduced a new policy.","ar":"قدمت الحكومة سياسة جديدة."},{"en":"Scientists are trying to ___ (understand) the phenomenon.","tr":"Scientists are trying to understand the phenomenon.","ar":"يحاول العلماء فهم الظاهرة."},{"en":"Many ___ (countries) have signed the agreement.","tr":"Many countries have signed the agreement.","ar":"وقعت العديد من الدول على الاتفاقية."}],
    },
  ],
};

const band1Lesson10: Lesson = {
  id: "band1-writing-task1-overview",
  title: "Writing Task 1 (IELTS): Overview of Graphs",
  subtitle: "Understanding charts",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "IELTS Writing Task 1 Academic requires you to describe visual information — a graph, chart, map, or process. You must write at least 150 words in 20 minutes. The key is to write an overview paragraph summarizing the main trend or feature. Do NOT give your opinion or explain why the data changed. Just describe what you see accurately.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "The Overview Rule",
      text: "Your overview is the most important sentence. It should state the main trend without specific numbers. For example: 'Overall, the population of all three countries increased over the period, with Country A experiencing the most significant growth.' Write this after your introduction but before the detailed paragraphs.",
    },
    {
      kind: "table",
      headers: ["Chart Type","What to Look For","Key Vocabulary"],
      rows: [["Line graph","Trends over time","increase, decrease, fluctuate"],["Bar chart","Comparisons between categories","higher than, lower than, similar to"],["Pie chart","Proportions / percentages","the majority, a minority, comprises"],["Table","Specific numbers / rankings","the highest, the lowest, ranked"],["Map","Changes in location","was replaced by, became, expanded"]],
    },
    {
      kind: "examples",
      items: [{"en":"The graph shows the number of tourists from 2000 to 2020.","tr":"The graph shows the number of tourists from 2000 to 2020.","ar":"يوضح الرسم البياني عدد السياح من 2000 إلى 2020."},{"en":"Overall, there was a significant increase in sales.","tr":"Overall, there was a significant increase in sales.","ar":"بشكل عام، كانت هناك زيادة كبيرة في المبيعات."},{"en":"The highest percentage was in the education sector.","tr":"The highest percentage was in the education sector.","ar":"كانت أعلى نسبة في قطاع التعليم."}],
    },
  ],
};

const band1Lesson11: Lesson = {
  id: "band1-writing-trends",
  title: "Writing Task 1: Describing Trends",
  subtitle: "Upward/downward vocabulary",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "To describe trends effectively in Writing Task 1, you need a range of verbs and nouns for upward and downward movement. Avoid repeating 'increase' and 'decrease'. Use adverbs to show the speed of change: 'dramatically', 'significantly', 'gradually', 'steadily'. Also use adjectives: 'a sharp rise', 'a steady decline', 'a slight fluctuation'.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Variety Is Key",
      text: "Don't use the same word twice. For increases: rise, grow, climb, surge, soar, rocket. For decreases: fall, drop, decline, dip, plunge, plummet. For stability: remain stable, level off, plateau, stay constant. Always pair with an adverb or adjective for precision.",
    },
    {
      kind: "table",
      headers: ["Movement","Verb","Noun","Adverb / Adjective"],
      rows: [["Up (sharp)","soar / rocket / surge","a surge / a sharp rise","dramatically"],["Up (steady)","increase / rise / grow","an increase / growth","steadily / gradually"],["Down (sharp)","plummet / plunge","a dramatic fall / a plunge","sharply / steeply"],["Down (steady)","decline / decrease / drop","a decline / a decrease","gradually / slowly"],["Stable","level off / plateau","a period of stability","consistently"],["Fluctuating","fluctuate","a fluctuation","irregularly"]],
    },
    {
      kind: "examples",
      items: [{"en":"Sales soared dramatically in the first quarter.","tr":"Sales soared dramatically in the first quarter.","ar":"ارتفعت المبيعات بشكل كبير في الربع الأول."},{"en":"The population declined steadily over the decade.","tr":"The population declined steadily over the decade.","ar":"انخفض عدد السكان بشكل ثابت على مدى العقد."},{"en":"Prices leveled off after the initial increase.","tr":"Prices leveled off after the initial increase.","ar":"استقرت الأسعار بعد الزيادة الأولية."}],
    },
  ],
};

const band1Lesson12: Lesson = {
  id: "band1-writing-integrated",
  title: "Writing Task 1 (TOEFL): Integrated Writing Intro",
  subtitle: "Reading + listening + writing",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "TOEFL Integrated Writing requires you to read a short passage (3 minutes), listen to a lecture on the same topic (2 minutes), and then write a summary (150–225 words) in 20 minutes. The lecture typically challenges or contradicts the reading. Your job is to explain how the lecture responds to specific points in the reading. Do not give your own opinion.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Structure for Integrated Writing",
      text: "Paragraph 1: State that the lecture challenges the reading. Then, for 2-3 body paragraphs: each paragraph addresses one point. Start with 'First, the professor argues that...' and contrast it with 'However, the reading states that...'. Use reporting verbs like 'argues', 'claims', 'contradicts', 'supports'.",
    },
    {
      kind: "table",
      headers: ["Section","What Happens","Time"],
      rows: [["Reading","Read an academic passage","3 minutes"],["Listening","Listen to a lecture on the same topic","2 minutes"],["Writing","Summarize how the lecture relates to the reading","20 minutes"],["Word count","150–225 words","—"]],
    },
    {
      kind: "examples",
      items: [{"en":"The professor challenges the reading's claim.","tr":"The professor challenges the reading's claim.","ar":"يتحدى الأستاذ ادعاء النص."},{"en":"According to the lecture, this theory is outdated.","tr":"According to the lecture, this theory is outdated.","ar":"وفقاً للمحاضرة، هذه النظرية قديمة."},{"en":"The reading argues that solar energy is expensive.","tr":"The reading argues that solar energy is expensive.","ar":"يجادل النص بأن الطاقة الشمسية باهظة الثمن."}],
    },
  ],
};

const band1Lesson13: Lesson = {
  id: "band1-writing-essay-structure",
  title: "Writing Task 2: Essay Structure",
  subtitle: "Introduction, body, conclusion",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "IELTS Writing Task 2 requires a 250+ word essay in 40 minutes. A clear structure is essential: Introduction (paraphrase the question + thesis statement), Body Paragraph 1 (main idea + explanation + example), Body Paragraph 2 (second main idea + explanation + example), and Conclusion (summarize your position). Each paragraph should have one clear main idea with supporting details.",
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The 4-Paragraph Formula",
      text: "Introduction (2-3 sentences): paraphrase the question, state your position. Body 1 (5-6 sentences): first main point with support. Body 2 (5-6 sentences): second main point with support. Conclusion (2-3 sentences): restate your position in different words. This structure works for all essay types.",
    },
    {
      kind: "table",
      headers: ["Paragraph","Content","Sentence Count"],
      rows: [["Introduction","Paraphrase + thesis statement","2–3"],["Body 1","Main idea + explanation + example","5–6"],["Body 2","Main idea + explanation + example","5–6"],["Conclusion","Restate position + final thought","2–3"]],
    },
    {
      kind: "examples",
      items: [{"en":"In conclusion, I believe that technology has a positive impact.","tr":"In conclusion, I believe that technology has a positive impact.","ar":"في الختام، أعتقد أن التكنولوجيا لها تأثير إيجابي."},{"en":"This essay will discuss both sides of the argument.","tr":"This essay will discuss both sides of the argument.","ar":"سيناقش هذا المقال جانبي الحجة."},{"en":"First and foremost, education is crucial for economic growth.","tr":"First and foremost, education is crucial for economic growth.","ar":"أولاً وقبل كل شيء، التعليم ضروري للنمو الاقتصادي."}],
    },
  ],
};

const band1Lesson14: Lesson = {
  id: "band1-writing-brainstorming",
  title: "Writing Task 2: Brainstorming Ideas",
  subtitle: "Planning before writing",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Before writing your essay, spend 5–10 minutes brainstorming ideas. Read the question carefully, identify the topic and task words (discuss, agree/disagree, causes/solutions), and write down 2–3 main points quickly. Each point should be a clear idea that you can explain and support with an example. A good plan ensures your essay stays focused and well-organized.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "The 5-Minute Plan",
      text: "Min 1: Read the question and underline keywords. Min 2-3: Write down 2-3 main ideas. Min 4: Add one example or explanation per idea. Min 5: Decide the order of your paragraphs. This plan prevents writer's block and keeps your essay on track.",
    },
    {
      kind: "table",
      headers: ["Step","Action","Example Question: 'Should homework be abolished?'"],
      rows: [["1","Identify task","Discuss + give opinion"],["2","Brainstorm ideas","For: reduces stress, free time. Against: reinforces learning"],["3","Choose 2 strongest","1. Homework reinforces learning. 2. But too much causes stress"],["4","Examples","Studies show 30 min homework improves grades; 3 hours causes anxiety"],["5","Structure essay","Intro → Body 1 (for) → Body 2 (against) → Conclusion"]],
    },
    {
      kind: "examples",
      items: [{"en":"Let me brainstorm some ideas before writing.","tr":"Let me brainstorm some ideas before writing.","ar":"دعني أفكر في بعض الأفكار قبل الكتابة."},{"en":"The main arguments for this are economic and social.","tr":"The main arguments for this are economic and social.","ar":"الحجج الرئيسية لهذا هي اقتصادية واجتماعية."},{"en":"I will discuss two main points in this essay.","tr":"I will discuss two main points in this essay.","ar":"سأناقش نقطتين رئيسيتين في هذا المقال."}],
    },
  ],
};

const band1Lesson15: Lesson = {
  id: "band1-speaking-part1-intro",
  title: "Speaking Part 1 (IELTS): Introduction & Interview",
  subtitle: "Common topics",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "IELTS Speaking Part 1 lasts 4–5 minutes. The examiner introduces themselves and asks you to confirm your identity. Then they ask general questions about familiar topics: your hometown, work/study, hobbies, family, food, and daily routine. Answer each question with 2–3 sentences. Give direct answers with a short explanation or example. Do not memorize answers, but prepare ideas for common topics.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "The Perfect Part 1 Answer",
      text: "Structure your answer: 1) Direct answer (Yes/No or short statement). 2) Reason or explanation. 3) Optional example. For example: 'Do you like cooking?' — 'Yes, I really enjoy cooking. It helps me relax after a long day, and I love trying new recipes from different countries.'",
    },
    {
      kind: "table",
      headers: ["Common Topic","Sample Question","Key Vocabulary"],
      rows: [["Hometown","Where do you live?","city, town, village, neighborhood"],["Work/Study","What do you do?","major, subject, profession, career"],["Hobbies","What do you do in your free time?","spare time, activity, keen on"],["Family","Tell me about your family","siblings, relatives, close-knit"],["Food","What is your favorite food?","cuisine, dish, traditional, flavor"]],
    },
    {
      kind: "dialogue",
      title: "Part 1 Example",
      lines: [{"speaker":"Examiner","en":"Good morning. What is your name?","tr":"Good morning. What is your name?","ar":"صباح الخير. ما اسمك؟"},{"speaker":"You","en":"Good morning. My name is Ahmed.","tr":"Good morning. My name is Ahmed.","ar":"صباح الخير. اسمي أحمد."},{"speaker":"Examiner","en":"Where are you from?","tr":"Where are you from?","ar":"من أين أنت؟"},{"speaker":"You","en":"I'm from Jeddah, which is a coastal city in Saudi Arabia.","tr":"I'm from Jeddah, which is a coastal city in Saudi Arabia.","ar":"أنا من جدة، وهي مدينة ساحلية في المملكة العربية السعودية."},{"speaker":"Examiner","en":"Do you enjoy living there?","tr":"Do you enjoy living there?","ar":"هل تستمتع بالعيش هناك؟"},{"speaker":"You","en":"Yes, I do. The weather is warm and the people are friendly.","tr":"Yes, I do. The weather is warm and the people are friendly.","ar":"نعم، استمتع. الطقس دافئ والناس ودودون."}],
    },
    {
      kind: "examples",
      items: [{"en":"I work as an engineer in a large company.","tr":"I work as an engineer in a large company.","ar":"أعمل مهندساً في شركة كبيرة."},{"en":"In my free time, I enjoy reading books.","tr":"In my free time, I enjoy reading books.","ar":"في وقت فراغي، أستمتع بقراءة الكتب."},{"en":"My hometown is a quiet village near the mountains.","tr":"My hometown is a quiet village near the mountains.","ar":"مسقط رأسي قرية هادئة بالقرب من الجبال."}],
    },
  ],
};

const band1Lesson16: Lesson = {
  id: "band1-speaking-independent",
  title: "Speaking (TOEFL): Independent Task Intro",
  subtitle: "15s prep, 45s response",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "TOEFL Speaking Task 1 (Independent) asks you to express and support an opinion on a familiar topic. You have 15 seconds to prepare and 45 seconds to speak. The question is usually a choice: 'Do you prefer X or Y?' or 'Do you agree or disagree with X?' State your opinion clearly, give 2 reasons, and include a brief example. Speak at a natural pace — do not try to fill every second with unnecessary words.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "The 45-Second Structure",
      text: "0–5 sec: State your opinion clearly. 'I prefer...' / 'I agree that...'. 5–20 sec: First reason with explanation. 20–35 sec: Second reason or example. 35–45 sec: Brief conclusion or final thought. Practice with a timer to develop a natural 45-second rhythm.",
    },
    {
      kind: "table",
      headers: ["Time","Task","Language"],
      rows: [["0–5 sec","State opinion","In my opinion... / I prefer... / I believe..."],["5–20 sec","First reason","First of all... / One reason is that..."],["20–35 sec","Second reason / example","Additionally... / For example..."],["35–45 sec","Conclude","That's why I think... / So overall..."]],
    },
    {
      kind: "examples",
      items: [{"en":"I prefer studying alone because I can focus better.","tr":"I prefer studying alone because I can focus better.","ar":"أفضل الدراسة بمفردي لأنني أستطيع التركيز بشكل أفضل."},{"en":"In my opinion, technology has improved education.","tr":"In my opinion, technology has improved education.","ar":"في رأيي، التكنولوجيا حسنت التعليم."},{"en":"For example, online courses allow flexible learning.","tr":"For example, online courses allow flexible learning.","ar":"على سبيل المثال، الدورات عبر الإنترنت تسمح بالتعلم المرن."}],
    },
  ],
};

const band1Lesson17: Lesson = {
  id: "band1-speaking-hometown",
  title: "Speaking Part 1: Hometown & Work/Study",
  subtitle: "Sample answers",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "In IELTS Speaking Part 1, questions about your hometown and work/study are very common. Prepare 3–4 sentences for each topic. For hometown: describe the location, size, and what you like (or dislike) about it. For work/study: state your job/major, explain what you do, and say whether you enjoy it. Use a range of adjectives to make your answers interesting.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Don't Give One-Word Answers",
      text: "Examiners assess fluency. Never answer with just 'Yes' or 'No'. Expand: 'Yes, I live in Dubai. It's a very modern city with lots of skyscrapers.' Or 'No, I don't have a job yet. I'm currently studying mechanical engineering at university.'",
    },
    {
      kind: "table",
      headers: ["Topic","Question","High-Scoring Answer"],
      rows: [["Hometown","Is it a big city?","It's quite large — around 5 million people. It's known for its historical sites."],["Work","Do you enjoy your job?","Yes, I find it very rewarding. I work as a pharmacist and help people daily."],["Study","Why did you choose your subject?","I chose computer science because I'm passionate about technology and innovation."]],
    },
    {
      kind: "dialogue",
      title: "Hometown Questions",
      lines: [{"speaker":"Examiner","en":"Where is your hometown?","tr":"Where is your hometown?","ar":"أين مسقط رأسك؟"},{"speaker":"You","en":"My hometown is Riyadh, the capital of Saudi Arabia.","tr":"My hometown is Riyadh, the capital of Saudi Arabia.","ar":"مسقط رأسي الرياض، عاصمة المملكة العربية السعودية."},{"speaker":"Examiner","en":"What do you like about it?","tr":"What do you like about it?","ar":"ما الذي يعجبك فيه؟"},{"speaker":"You","en":"I love the modern infrastructure and the cultural attractions.","tr":"I love the modern infrastructure and the cultural attractions.","ar":"أحب البنية التحتية الحديثة والمعالم الثقافية."}],
    },
    {
      kind: "examples",
      items: [{"en":"I currently study medicine at King Saud University.","tr":"I currently study medicine at King Saud University.","ar":"أدرس حالياً الطب في جامعة الملك سعود."},{"en":"My hometown is a coastal city with beautiful beaches.","tr":"My hometown is a coastal city with beautiful beaches.","ar":"مسقط رأسي مدينة ساحلية بشواطئ جميلة."},{"en":"I work as a teacher at an international school.","tr":"I work as a teacher at an international school.","ar":"أعمل معلماً في مدرسة دولية."}],
    },
  ],
};

const band1Lesson18: Lesson = {
  id: "band1-grammar-articles",
  title: "EnglishPage Masterclass: Definite, Indefinite & Zero Article Mechanics",
  subtitle: "Eliminating L1 Arabic interference, generic non-count traps & geographical rules",
  xpReward: 60,
  blocks: [
    {
      kind: "p",
      text: "Article errors are among the most persistent grammatical deductions in IELTS and Cambridge B2 writing (Criterion: Grammatical Range and Accuracy). In Arabic, the single prefix 'al-' (ال) marks definiteness, generic concepts, and abstract categories alike. In academic English, applying 'the' to generic plurals or uncountable concepts is a fatal error. Following the EnglishPage grammar curriculum, articles are governed by 4 ironclad taxonomic rules.",
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The 4 Core EnglishPage Article Taxonomy Rules",
      text: "1. Classification vs Identification: 'A/An' classifies what kind of thing something is ('She is an environmental scientist'). 'The' identifies a uniquely known member ('She is the scientist who led the expedition').\n2. The Generic Zero Article: Plural count nouns and uncountable nouns speaking about the category as a whole take ZERO article ('Education accelerates economic growth', NOT 'The education accelerates the economic growth').\n3. Geopolitical Conventions: Single countries and islands take ZERO article (Morocco, France, Cyprus), but political unions, plural federations, or kingdoms demand 'THE' (The United Kingdom, The United States, The Netherlands, The Republic of Korea).\n4. Institutional Purpose vs Physical Facility: 'In hospital' or 'at university' (zero article) refers to participating in their primary purpose as a patient or student. 'At the hospital' or 'near the university' refers merely to the physical brick-and-mortar edifice.",
    },
    {
      kind: "table",
      headers: ["Grammar Context","Correct Academic Usage","Incorrect L1 Arabic Trap","EnglishPage Explanatory Rule"],
      rows: [
        [
          "Generic Uncountable",
          "Pollution damages marine ecosystems.",
          "*The pollution damages the marine ecosystems.",
          "Zero article when referring to all pollution and all ecosystems in general."
        ],
        [
          "Geopolitical Entities",
          "The United Arab Emirates borders Oman.",
          "*United Arab Emirates borders the Oman.",
          "Plural federations/states require 'the'; singular sovereign nations take zero article."
        ],
        [
          "Water Bodies",
          "The Pacific Ocean contrasts with Lake Geneva.",
          "*Pacific Ocean contrasts with the Lake Geneva.",
          "Oceans, seas, and rivers require 'the'; single freshwater lakes take zero article."
        ],
        [
          "Unique Celestial/Societal Roles",
          "The ozone layer shields the earth from the sun.",
          "*Ozone layer shields earth from sun.",
          "Unique physical entities in nature always demand the definite article 'the'."
        ],
        [
          "Most vs Most Of The",
          "Most researchers agree with the premise.",
          "*The most researchers agree with the premise.",
          "'Most' + plural noun takes zero article. Only use 'the' in the superlative ('the most crucial')."
        ]
      ],
    },
    {
      kind: "examples",
      items: [
        { en: "Higher education plays an indispensable role in societal development.", tr: "Higher education plays an indispensable role in societal development.", ar: "التعليم العالي يلعب دوراً لا غنى عنه في التنمية المجتمعية (بدون the لأنها فكرة عامة غير معدودة)." },
        { en: "The government launched an inquiry into the causes of the catastrophe.", tr: "The government launched an inquiry into the causes of the catastrophe.", ar: "أطلقت الحكومة تحقيقاً في أسباب الكارثة (استخدام the مع الحكومة والأسباب المحددة)." },
        { en: "The Nile flows through eleven sovereign countries.", tr: "The Nile flows through eleven sovereign countries.", ar: "يتدفق نهر النيل عبر إحدى عشرة دولة ذات سيادة (the مع الأنهار، وصفر أداة مع البلدان)." }
      ],
    },
  ],
};

const band1Lesson19: Lesson = {
  id: "band1-grammar-agreement",
  title: "Grammar Boost: Subject-Verb Agreement",
  subtitle: "Singular/plural mistakes",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Subject-verb agreement means the verb must match the subject in number. A singular subject takes a singular verb (he goes, she works), and a plural subject takes a plural verb (they go, the students work). Arabic speakers often make mistakes with 'there is/are' and when the subject is separated from the verb by a prepositional phrase. Also remember: 'everyone', 'someone', and 'nobody' are always singular.",
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Tricky Cases",
      text: "1) With 'as well as' or 'together with', the verb agrees with the first noun. 2) 'Each of the students' is singular. 3) 'The number of X' is singular, but 'a number of X' is plural. 4) 'None' can be singular or plural depending on context. 5) Collective nouns (team, government, family) can be singular or plural based on British/American English.",
    },
    {
      kind: "table",
      headers: ["Subject","Verb","Example"],
      rows: [["The student","is","The student is studying."],["The students","are","The students are studying."],["Everyone","has","Everyone has a responsibility."],["The government","is/are","The government is (or are) debating."],["Neither of them","is","Neither of them is correct."],["A number of people","are","A number of people are waiting."]],
    },
    {
      kind: "examples",
      items: [{"en":"The data shows a clear trend.","tr":"The data shows a clear trend.","ar":"تظهر البيانات اتجاهاً واضحاً."},{"en":"Everyone needs to practice daily.","tr":"Everyone needs to practice daily.","ar":"الجميع بحاجة إلى الممارسة يومياً."},{"en":"The number of students has increased.","tr":"The number of students has increased.","ar":"عدد الطلاب قد زاد."}],
    },
  ],
};

const band1Lesson20: Lesson = {
  id: "band1-vocab-awl1",
  title: "Vocabulary: Academic Word List (AWL) Sublist 1",
  subtitle: "Key academic words",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "The Academic Word List (AWL) contains 570 word families that appear frequently in academic texts across all disciplines. Sublist 1 has the 60 most common academic words. Mastering these words will improve your reading comprehension and your academic writing. Learn the word forms (noun, verb, adjective, adverb) for each word so you can use them flexibly.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "How to Study AWL",
      text: "Don't memorize word lists in isolation. Read the word in context sentences, write your own sentences, and practice using the different forms. For example: 'analyze' (verb), 'analysis' (noun), 'analytical' (adjective). Aim to learn 5 new words per day with all their forms.",
    },
    {
      kind: "table",
      headers: ["Word","Part of Speech","Example","Arabic"],
      rows: [["analyze","v","We need to analyze the results carefully.","يحلل"],["approach","n/v","This approach has several advantages.","نهج / يقترب"],["area","n","The research area is growing rapidly.","مجال / منطقة"],["assess","v","It is difficult to assess the damage.","يقيم"],["assume","v","We can assume that the trend continues.","يفترض"],["authority","n","The authority conducted an investigation.","سلطة"],["available","adj","The data is available online.","متاح"],["benefit","n/v","The benefits of exercise are well known.","فائدة / يستفيد"],["concept","n","This concept is central to the theory.","مفهوم"],["consist","v","The sample consisted of 200 participants.","يتكون من"]],
    },
    {
      kind: "examples",
      items: [{"en":"Researchers analyzed the data thoroughly.","tr":"Researchers analyzed the data thoroughly.","ar":"حلل الباحثون البيانات بدقة."},{"en":"This approach has been widely adopted.","tr":"This approach has been widely adopted.","ar":"هذا النهج تم اعتماده على نطاق واسع."},{"en":"The benefits of this method are significant.","tr":"The benefits of this method are significant.","ar":"فوائد هذه الطريقة كبيرة."}],
    },
  ],
};

const band1Lesson21: Lesson = {
  id: "band1-vocab-synonyms",
  title: "Vocabulary: Synonyms for Common Words",
  subtitle: "Paraphrase skills",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Paraphrasing — saying the same thing in different words — is a crucial skill for both IELTS and TOEFL. The Writing and Speaking sections reward you for using a range of vocabulary. Instead of repeating 'good', 'bad', 'big', 'small', 'important', and 'many', learn 3–4 synonyms for each common word. This immediately improves your Lexical Resource score.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "The Paraphrase Rule",
      text: "Never copy the question words directly in your essay. For example, if the question asks about 'advantages and disadvantages', do not write 'There are many advantages and disadvantages'. Instead, write 'This approach has both benefits and drawbacks' or 'There are positive and negative aspects to consider.'",
    },
    {
      kind: "table",
      headers: ["Common Word","Synonyms","Example"],
      rows: [["good","positive, beneficial, advantageous, favorable","This has a positive impact on society."],["bad","negative, harmful, damaging, detrimental","The effects are detrimental to health."],["big","large, enormous, substantial, significant","A significant number of people agree."],["small","minor, slight, minimal, limited","There was a slight increase in 2020."],["important","crucial, essential, vital, significant","Education is crucial for development."],["many","numerous, a wide range of, a variety of","Numerous studies have confirmed this."],["show","demonstrate, indicate, reveal, illustrate","The graph illustrates this trend clearly."]],
    },
    {
      kind: "examples",
      items: [{"en":"This is beneficial for the community.","tr":"This is beneficial for the community.","ar":"هذا مفيد للمجتمع."},{"en":"The findings indicate a clear pattern.","tr":"The findings indicate a clear pattern.","ar":"تشير النتائج إلى نمط واضح."},{"en":"There are numerous advantages to this approach.","tr":"There are numerous advantages to this approach.","ar":"هناك مزايا عديدة لهذا النهج."}],
    },
  ],
};

const band1Lesson22: Lesson = {
  id: "band1-time-reading",
  title: "Time Management: Reading Section",
  subtitle: "60 min for 40 questions",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "The IELTS Reading test gives you 60 minutes to read 3 passages (each about 900–1000 words) and answer 40 questions. That's about 20 minutes per passage. To manage time effectively: spend 2-3 minutes skimming the passage, 1-2 minutes reading the questions, 12-15 minutes finding answers, and 2-3 minutes checking your answers. Do NOT spend more than 20 minutes on any single passage.",
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Time Trap",
      text: "The biggest mistake students make is spending too long on one difficult passage. If you can't find an answer after 2 minutes, make your best guess and move on. You can come back if you have time at the end. Remember: all questions are worth 1 mark — don't lose easy points because you spent too much time on a hard one.",
    },
    {
      kind: "table",
      headers: ["Stage","Action","Time"],
      rows: [["1. Skim","Read title, headings, first sentences","2–3 min"],["2. Read questions","Understand what information you need","1–2 min"],["3. Scan & answer","Find answers in the passage","12–15 min"],["4. Review","Check spelling and guess remaining","2–3 min"],["Total","","20 min"]],
    },
    {
      kind: "examples",
      items: [{"en":"I have 20 minutes for each reading passage.","tr":"I have 20 minutes for each reading passage.","ar":"لدي 20 دقيقة لكل نص قراءة."},{"en":"If I don't know the answer, I make a guess.","tr":"If I don't know the answer, I make a guess.","ar":"إذا لم أعرف الإجابة، أخمن."},{"en":"Always check your spelling in the answer sheet.","tr":"Always check your spelling in the answer sheet.","ar":"تحقق دائماً من الإملاء في ورقة الإجابة."}],
    },
  ],
};

const band1Lesson23: Lesson = {
  id: "band1-time-writing",
  title: "Time Management: Writing Section",
  subtitle: "60 min total (Task 1 + Task 2)",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "IELTS Writing gives you 60 minutes for two tasks. Task 1 (describing a chart/graph) requires 150 words and should take 20 minutes. Task 2 (essay) requires 250 words and should take 40 minutes. Task 2 is worth twice the marks of Task 1, so always start with Task 2 if you prefer, or follow the recommended 20/40 split. Use 5 minutes planning, 12-15 minutes writing, and 3 minutes checking for each task.",
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Critical Rule",
      text: "NEVER spend more than 20 minutes on Task 1. Even if your Task 1 is incomplete, move to Task 2. Many students lose marks because they write a beautiful Task 1 but don't have time for a proper Task 2 essay. Task 2 is worth 66% of your writing score!",
    },
    {
      kind: "table",
      headers: ["Task","Time","Words","Weight","Structure"],
      rows: [["Task 1","20 min","150+","33%","Intro → Overview → Details"],["Task 2","40 min","250+","66%","Intro → Body 1 → Body 2 → Conclusion"],["Total","60 min","400+","100%",""]],
    },
    {
      kind: "examples",
      items: [{"en":"I will spend 20 minutes on Task 1 and 40 on Task 2.","tr":"I will spend 20 minutes on Task 1 and 40 on Task 2.","ar":"سأقضي 20 دقيقة في المهمة 1 و 40 في المهمة 2."},{"en":"Task 2 is worth more marks, so I prioritize it.","tr":"Task 2 is worth more marks, so I prioritize it.","ar":"المهمة 2 تستحق علامات أكثر، لذلك أعطيها الأولوية."},{"en":"I always save 3 minutes to check my essay.","tr":"I always save 3 minutes to check my essay.","ar":"أوفر دائماً 3 دقائق لمراجعة مقالتي."}],
    },
  ],
};

const band1Lesson24: Lesson = {
  id: "band1-practice-listening",
  title: "Practice Mini-Test: Listening",
  subtitle: "Short listening with 10 questions",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "This mini-test simulates IELTS Listening Section 1. You will hear a conversation between a student and a university accommodation officer. The questions test your ability to understand specific details: names, dates, prices, and contact information. Listen carefully and write no more than two words and/or a number for each answer.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Before You Listen",
      text: "Read questions 1-10 first. Notice that this is a form completion task. Predict the type of information needed: a name (capital letter), a date (day/month), a phone number (numbers), or a noun (e.g., room type). Use the 30-second preparation time wisely.",
    },
    {
      kind: "table",
      headers: ["Question","Information Needed","Your Answer"],
      rows: [["1","Student's last name","___"],["2","Student's first name","___"],["3","Date of birth","___"],["4","Course of study","___"],["5","Preferred room type","___"],["6","Budget per month","___"],["7","Check-in date","___"],["8","Duration of stay","___"],["9","Special requirements","___"],["10","Phone number","___"]],
    },
    {
      kind: "examples",
      items: [{"en":"Write the name exactly as you hear it.","tr":"Write the name exactly as you hear it.","ar":"اكتب الاسم تماماً كما تسمعه."},{"en":"Pay attention to spelling of names.","tr":"Pay attention to spelling of names.","ar":"انتبه إلى تهجئة الأسماء."},{"en":"Dates can be written in different formats.","tr":"Dates can be written in different formats.","ar":"يمكن كتابة التواريخ بصيغ مختلفة."}],
    },
  ],
};

const band1Lesson25: Lesson = {
  id: "band1-review",
  title: "Band 4–5 Review & Progress Check",
  subtitle: "Mixed skills assessment",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Congratulations on completing Band 4–5 (Foundation)! This band covered the basics of both IELTS and TOEFL exams: understanding the test formats, developing core listening and reading skills, building grammar foundations, and starting your academic vocabulary. Let's review the key points and identify areas for further practice.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Self-Assessment",
      text: "Rate yourself 1-5 on each: I understand the IELTS/TOEFL test format. I can skim and scan a reading passage. I can describe basic trends in a chart. I know how to structure a Task 2 essay. I can use articles and subject-verb agreement correctly. I have learned 20+ AWL words. Spend extra time on any skill you rated 3 or below.",
    },
    {
      kind: "table",
      headers: ["Skill","What I Learned","Next Steps"],
      rows: [["Listening","4 sections, question types, gist","Practice Section 1 conversations"],["Reading","Skimming, scanning, sentence completion","Read academic articles for 20 min/day"],["Writing Task 1","Overview, trends vocabulary","Describe 1 graph per day"],["Writing Task 2","Essay structure, brainstorming","Write 1 introduction per day"],["Speaking","Part 1 strategies, common topics","Record yourself answering questions"],["Grammar","Articles, subject-verb agreement","Review rules weekly"],["Vocabulary","AWL Sublist 1, synonyms","Learn 10 new academic words per week"]],
    },
    {
      kind: "examples",
      items: [{"en":"I have completed the foundation level.","tr":"I have completed the foundation level.","ar":"لقد أكملت المستوى التأسيسي."},{"en":"I need to practice my listening skills more.","tr":"I need to practice my listening skills more.","ar":"أحتاج إلى ممارسة مهارات الاستماع أكثر."},{"en":"I am ready to move to Band 5–6.","tr":"I am ready to move to Band 5–6.","ar":"أنا مستعد للانتقال إلى المستوى 5–6."}],
    },
  ],
};

const BAND1_LESSONS: Lesson[] = [
  band1Lesson1, band1Lesson2, band1Lesson3, band1Lesson4, band1Lesson5,
  band1Lesson6, band1Lesson7, band1Lesson8, band1Lesson9, band1Lesson10,
  band1Lesson11, band1Lesson12, band1Lesson13, band1Lesson14, band1Lesson15,
  band1Lesson16, band1Lesson17, band1Lesson18, band1Lesson19, band1Lesson20,
  band1Lesson21, band1Lesson22, band1Lesson23, band1Lesson24, band1Lesson25,
];

// ─── Band 5–6 (Intermediate) Lessons ──────────────────────

const band2Lesson1: Lesson = {
  id: "band2-listening-mcq",
  title: "IELTS Section 3: Academic Tutor Consultation & Multiple Choice Traps",
  subtitle: "Navigating 3-speaker academic debates, shifting consensus & distractor elimination",
  xpReward: 60,
  blocks: [
    {
      kind: "p",
      text: "IELTS Listening Section 3 is universally regarded as the most intellectually demanding portion of the listening test. You hear up to four speakers in an academic context (e.g., two undergraduates discussing an upcoming dissertation with their university research supervisor). Over 70% of multiple-choice errors occur because students pick the first topic mentioned, failing to hear that the supervisor or peer subsequently vetoes it.",
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The 3 Critical Section 3 Multiple Choice Traps",
      text: "1. The Premature Proposal Trap: Student A enthusiastically suggests a methodology. Student B or the Professor points out a fatal flaw ('The sample size would be statistically insignificant').\n2. The Word-Echo Distractor: Option choices repeat exact vocabulary heard in the audio ('satellite telemetry'), but associate it with the wrong conclusion.\n3. The Final Consensus Shift: The correct answer is usually settled only after a qualification: 'Having said that, if we pivot to..., that would resolve the funding obstacle'.",
    },
    {
      kind: "dialogue",
      title: "Authentic Section 3 Script: Marine Biology Dissertation Planning",
      lines: [
        { speaker: "Prof. Evans", en: "Good afternoon, Chloe, Liam. Let's finalise your joint fieldwork topic before the ethics committee deadline on Friday.", tr: "Good afternoon, Chloe, Liam. Let's finalise your joint fieldwork topic before the ethics committee deadline on Friday." },
        { speaker: "Chloe", en: "Well, we originally intended to document coral bleaching across the Great Barrier Reef after the recent heatwave.", tr: "Well, we originally intended to document coral bleaching across the Great Barrier Reef after the recent heatwave." },
        { speaker: "Prof. Evans", en: "While undeniably urgent, that's already heavily researched by the national institute. You'd struggle to demonstrate original empirical findings.", tr: "While undeniably urgent, that's already heavily researched by the national institute. You'd struggle to demonstrate original empirical findings." },
        { speaker: "Liam", en: "I see your point, Professor. What about analyzing microplastic concentrations in coastal mangrove sediments? We could collect samples locally.", tr: "I see your point, Professor. What about analyzing microplastic concentrations in coastal mangrove sediments? We could collect samples locally." },
        { speaker: "Chloe", en: "The problem there is the university spectrometer is currently booked out until late November. We couldn't finish the chemical spectrometry on schedule.", tr: "The problem there is the university spectrometer is currently booked out until late November. We couldn't finish the chemical spectrometry on schedule." },
        { speaker: "Liam", en: "Ah, right. So what if we assess the recolonization of seagrass meadows by juvenile fish species using underwater video cameras?", tr: "Ah, right. So what if we assess the recolonization of seagrass meadows by juvenile fish species using underwater video cameras?" },
        { speaker: "Prof. Evans", en: "Now that's a viable project! The marine station has three submersible rigs you can borrow immediately, and the data analysis is purely visual.", tr: "Now that's a viable project! The marine station has three submersible rigs you can borrow immediately, and the data analysis is purely visual." }
      ]
    },
    {
      kind: "table",
      headers: ["Option Topic","Speaker Who Mentioned It","Outcome / Reason for Veto","Examiner Trap Status"],
      rows: [
        [
          "Coral Bleaching",
          "Chloe",
          "Rejected by Professor Evans: already thoroughly investigated by national bodies.",
          "Distractor: Topic proposed first but rejected."
        ],
        [
          "Microplastic Sediment Analysis",
          "Liam",
          "Rejected by Chloe: Spectrometry equipment unavailable until late November.",
          "Distractor: Feasible topic but blocked by equipment logistics."
        ],
        [
          "Seagrass Fish Recolonization",
          "Liam (endorsed by Chloe & Prof. Evans)",
          "Accepted: Submersible cameras readily available; data analysis is visual and achievable.",
          "CORRECT ANSWER: All three speakers agree to this final topic."
        ]
      ],
    },
    {
      kind: "examples",
      items: [
        { en: "Never select an option just because a student sounded passionate about it.", tr: "Never select an option just because a student sounded passionate about it.", ar: "لا تختر خياراً أبداً لمجرد أن الطالب كان متحمساً له، انتظر حتى يوافق المشرف الأكاديمي." },
        { en: "Listen for contrastive discourse markers like 'Having said that', 'Alternatively', and 'The hitch is'.", tr: "Listen for contrastive discourse markers like 'Having said that', 'Alternatively', and 'The hitch is'.", ar: "استمع بعناية لروابط التناقض التي تشير إلى وجود عقبة أو تغيير في الخطة." }
      ],
    },
  ],
};

const band2Lesson2: Lesson = {
  id: "band2-listening-maps",
  title: "IELTS Section 2: Campus Sports & Recreation Centre Map Labelling",
  subtitle: "Mastering orientation markers, directional prepositions & spatial navigation trajectories",
  xpReward: 60,
  blocks: [
    {
      kind: "p",
      text: "Map and plan labelling tasks in IELTS Section 2 assess your ability to track physical navigation through public venues (e.g., university campuses, leisure facilities, historical museums). The speaker provides a continuous verbal walkthrough. If you lose your orientation relative to the starting point, multiple answers are forfeited in rapid succession.",
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The 4 Cardinal Rules of IELTS Map Labelling",
      text: "1. Lock the Starting Anchor: Immediately locate 'You Are Here' or the Entrance/Turnstiles. The speaker's left and right are determined by their direction of travel.\n2. Compass vs Relational Coordinates: Check if a compass rose (North/South/East/West) is printed. If present, speakers frequently say 'in the north-eastern quadrant', NOT just 'top right'.\n3. Preposition Clusters: Listen for spatial triplets: 'Immediately adjacent to', 'nestled between', 'at the far end of the corridor', 'backing onto the car park'.\n4. Follow Sequential Order: The question numbers (e.g., 11 to 15) ALWAYS follow the speaker's path chronologically.",
    },
    {
      kind: "dialogue",
      title: "Authentic Section 2 Script: Riverside Sports Complex Orientation",
      lines: [
        { speaker: "Guide", en: "Welcome to the Riverside Sports Centre orientation tour. Let's look at the floor plan on the screen.", tr: "Welcome to the Riverside Sports Centre orientation tour. Let's look at the floor plan on the screen." },
        { speaker: "Guide", en: "We are currently standing in the Main Atrium right inside the southern entrance.", tr: "We are currently standing in the Main Atrium right inside the southern entrance." },
        { speaker: "Guide", en: "Immediately to your right as you pass through the security gates, you'll see Room A, which is the Membership Desk.", tr: "Immediately to your right as you pass through the security gates, you'll see Room A, which is the Membership Desk." },
        { speaker: "Guide", en: "If you walk straight ahead along the central concourse, directly facing you at the far northern wall is Room B, the Olympic Swimming Pool.", tr: "If you walk straight ahead along the central concourse, directly facing you at the far northern wall is Room B, the Olympic Swimming Pool." },
        { speaker: "Guide", en: "Now, just before you reach the pool, take the corridor to your left. Situated between the Squash Courts and the Cafe is Room C, the Weight Training Gym.", tr: "Now, just before you reach the pool, take the corridor to your left. Situated between the Squash Courts and the Cafe is Room C, the Weight Training Gym." },
        { speaker: "Guide", en: "And finally, tucked away in the far north-western corner, backing onto the outdoor athletic track, is Room D, our Physiotherapy Clinic.", tr: "And finally, tucked away in the far north-western corner, backing onto the outdoor athletic track, is Room D, our Physiotherapy Clinic." }
      ]
    },
    {
      kind: "table",
      headers: ["Map Facility","Location on Floor Plan","Verbal Direction Trigger","Key Preposition"],
      rows: [
        [
          "Membership Desk",
          "Room A",
          "'Immediately to your right as you pass the gates'",
          "Immediately to your right"
        ],
        [
          "Olympic Swimming Pool",
          "Room B",
          "'Straight ahead, directly facing you at the far northern wall'",
          "Directly facing you / far northern wall"
        ],
        [
          "Weight Training Gym",
          "Room C",
          "'Left corridor, situated between the Squash Courts and Cafe'",
          "Situated between"
        ],
        [
          "Physiotherapy Clinic",
          "Room D",
          "'Tucked away in the far north-western corner, backing onto the track'",
          "Tucked away / backing onto"
        ]
      ],
    },
    {
      kind: "examples",
      items: [
        { en: "Always orient your perspective to face the direction the guide is walking.", tr: "Always orient your perspective to face the direction the guide is walking.", ar: "اضبط اتجاه نظرك دائماً ليتوافق مع اتجاه سير المرشد حتى لا تنعكس جهتا اليمين واليسار." },
        { en: "'Backing onto' means the rear of the building shares a boundary with the mentioned feature.", tr: "'Backing onto' means the rear of the building shares a boundary with the mentioned feature.", ar: "المصطلح 'backing onto' يعني أن الجزء الخلفي من الغرفة أو المبنى يطل على المعلم المذكور." }
      ],
    },
  ],
};

const band2Lesson3: Lesson = {
  id: "band2-listening-form-completion",
  title: "Listening: Form/Note/Table Completion",
  subtitle: "Predicting answers",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Form, note, and table completion questions require you to fill in missing information while listening. The key skill is predicting the type of information needed BEFORE you listen. Look at the headings and gaps to determine if you need a name, number, date, noun, or adjective. Use the word limit (usually 'NO MORE THAN TWO WORDS AND/OR A NUMBER').",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Prediction Technique",
      text: "For each gap, ask: 'What kind of word is this?' If it follows 'Name:', expect a person's name (capitalized). If it follows 'Cost:', expect a price with currency ($50). If the column header is 'Destination', expect a place name. Predicting the word type helps you listen selectively.",
    },
    {
      kind: "table",
      headers: ["Gap Context","Predicted Info","Example Answer"],
      rows: [["Name: ___","Person's name (capitalized)","Ahmed Ali"],["Date: ___","Day/month/year","15 June"],["Price: $___","Number (possibly decimal)","250"],["Address: ___","Street name + number","12 Main Street"],["Course: ___","Subject or course name","Business Management"]],
    },
    {
      kind: "examples",
      items: [{"en":"The form requires the applicant's full name.","tr":"The form requires the applicant's full name.","ar":"النموذج يتطلب الاسم الكامل لمقدم الطلب."},{"en":"Write the date as '12 March' not '12/03'.","tr":"Write the date as '12 March' not '12/03'.","ar":"اكتب التاريخ '12 مارس' وليس '12/03'."},{"en":"The answer must not exceed two words.","tr":"The answer must not exceed two words.","ar":"يجب ألا تتجاوز الإجابة كلمتين."}],
    },
  ],
};

const band2Lesson4: Lesson = {
  id: "band2-reading-tfng",
  title: "Reading: True / False / Not Given Mastery",
  subtitle: "Authentic text analysis & logic proof",
  xpReward: 60,
  blocks: [
    {
      kind: "p",
      text: "True / False / Not Given (TFNG) questions evaluate your ability to identify factual agreement, direct contradiction, or informational absence in academic texts. Crucially, answers must be derived strictly from the text—never extrapolate or apply outside scientific knowledge.",
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The Ironclad Logic Rules",
      text: "• TRUE: The statement completely agrees with the facts in the text (including qualifiers and numbers).\n• FALSE: The text directly contradicts the statement (the opposite is stated as fact).\n• NOT GIVEN: The text neither confirms nor denies the claim—the specific relationship or detail is simply absent.",
    },
    {
      kind: "p",
      text: "AUTHENTIC PRACTICE PASSAGE: Biomimicry and Passive Architecture\n\n'In 1996, Zimbabwean architect Mick Pearce designed the Eastgate Centre in Harare by emulating the natural ventilation of indigenous termite mounds. Termites construct towering chimneys equipped with subterranean vents that open and close to maintain an interior temperature around 30°C, despite exterior temperatures swinging from 2°C at night to 42°C during the day. By utilizing concrete mass and passive air currents rather than traditional air conditioning, the Eastgate complex uses 35% less energy than comparable commercial buildings in Harare, saving millions in energy costs.'",
    },
    {
      kind: "table",
      headers: ["Statement","Text Evidence","Logic Analysis","Answer"],
      rows: [
        [
          "The Eastgate Centre relies entirely on conventional air conditioning systems.",
          "By utilizing concrete mass and passive air currents rather than traditional air conditioning...",
          "Direct contradiction: the text states it uses passive currents *rather than* traditional AC.",
          "FALSE"
        ],
        [
          "Termite mounds maintain steady interior temperatures despite extreme daily climate shifts.",
          "...maintain an interior temperature around 30°C, despite exterior temperatures swinging from 2°C to 42°C...",
          "Exact factual match: 'steady' corresponds to 'around 30°C' and 'extreme shifts' matches '2°C to 42°C'.",
          "TRUE"
        ],
        [
          "Mick Pearce was awarded an international architecture prize for the Eastgate design.",
          "Text mentions he designed it in 1996 and saved energy costs, but awards are never mentioned.",
          "The information is completely absent from the text. You cannot guess or assume an award was won.",
          "NOT GIVEN"
        ],
        [
          "The Eastgate Centre consumes more energy than other commercial complexes in Harare.",
          "...the Eastgate complex uses 35% less energy than comparable commercial buildings...",
          "Direct contradiction: it uses 35% LESS, whereas the statement asserts it uses MORE.",
          "FALSE"
        ]
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Watch Out: The Quantifier Trap",
      text: "Examiners frequently trap candidates using quantifiers. If the passage says 'some early designs failed', a statement claiming 'all early designs failed' is FALSE. However, if the text says 'the system was tested in Harare' and the statement claims 'the system was tested in Lusaka', that is FALSE; but if it claims 'the system was also tested in schools', that is NOT GIVEN.",
    },
    {
      kind: "examples",
      items: [
        { en: "The statement directly contradicts the facts presented in the passage.", tr: "The statement directly contradicts the facts presented in the passage.", ar: "البيان يتعارض بشكل مباشر مع الحقائق الواردة في النص." },
        { en: "Although plausible, this assertion is neither confirmed nor denied by the author.", tr: "Although plausible, this assertion is neither confirmed nor denied by the author.", ar: "رغم أنه معقول، إلا أن هذا الادعاء لم يؤكده الكاتب أو ينفيه." },
        { en: "Be alert to extreme qualifiers such as 'always', 'invariably', or 'universally'.", tr: "Be alert to extreme qualifiers such as 'always', 'invariably', or 'universally'.", ar: "كن حذراً من المحددات المطلقة مثل 'دائماً' أو 'بشكل شامل'." }
      ],
    },
  ],
};

const band2Lesson5: Lesson = {
  id: "band2-reading-headings",
  title: "Reading: Matching Headings to Paragraphs",
  subtitle: "Topic sentences, gist & eliminating distractors",
  xpReward: 60,
  blocks: [
    {
      kind: "p",
      text: "Matching Headings questions test your ability to synthesize the overarching theme of each paragraph. A common blunder is matching a heading based on a single recurring keyword rather than the comprehensive core message of the paragraph.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "The 4-Step Heading Protocol",
      text: "1. Read the list of headings first and bracket distinguishing keywords.\n2. Read Paragraph A: focus sharply on the opening topic sentence and concluding synthesis sentence.\n3. Identify the main message in your own words (e.g., 'financial difficulties' or 'methodology').\n4. Match against the headings list and eliminate used options immediately.",
    },
    {
      kind: "p",
      text: "AUTHENTIC PASSAGE EXCERPT: The Evolution of Written Records\n\n[Paragraph A] Long before alphabetic scripts emerged, Mesopotamian accountants tracked commodities using small geometric clay tokens. By 3300 BCE, as trade volumes surged across urban centers like Uruk, accountants began pressing these tokens into hollow spherical clay envelopes called bullae. Impressing tokens onto the exterior surface of wet clay before sealing them proved that internal verification was possible without breaking the container.\n\n[Paragraph B] Within a century, scribes recognized that physical tokens inside the bullae were redundant. Flat clay tablets impressed with styluses could convey the identical commercial data with far less physical bulk. This administrative shorthand evolved rapidly into standardized pictograms, laying the foundational mechanics for what modern linguists classify as early cuneiform.",
    },
    {
      kind: "table",
      headers: ["Paragraph","Matching Heading","Distractor Trap Avoided","Reasoning"],
      rows: [
        [
          "Paragraph A",
          "iii. Physical token containers for commercial verification",
          "Distractor: 'The invention of the alphabet' (alphabet came millennia later).",
          "Paragraph A describes clay tokens, bullae, and sealing methods for verifying goods."
        ],
        [
          "Paragraph B",
          "vi. Transition from three-dimensional tokens to flat tablets",
          "Distractor: 'The decline of Mesopotamian trade' (trade actually expanded).",
          "Paragraph B highlights how scribes abandoned physical tokens in favor of impressed tablets."
        ]
      ],
    },
    {
      kind: "examples",
      items: [
        { en: "The heading must summarize the paragraph as a coherent whole.", tr: "The heading must summarize the paragraph as a coherent whole.", ar: "يجب أن يلخص العنوان الفقرة ككل مترابط." },
        { en: "Do not be misled by a single keyword mentioned merely as an incidental example.", tr: "Do not be misled by a single keyword mentioned merely as an incidental example.", ar: "لا تنخدع بكلمة مفتاحية واحدة ذُكرت فقط كمثال عابر." },
        { en: "The topic sentence frequently, but not always, opens the paragraph.", tr: "The topic sentence frequently, but not always, opens the paragraph.", ar: "غالباً، ولكن ليس دائماً، تبدأ جملة الموضوع الفقرة." }
      ],
    },
  ],
};

const band2Lesson6: Lesson = {
  id: "band2-reading-mcq",
  title: "Reading: Multiple Choice for Reading",
  subtitle: "Detail questions",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Multiple choice questions in IELTS Reading test your ability to locate and understand specific details in a passage. The correct answer is usually a paraphrase of information in the passage — rarely a word-for-word match. Look for synonyms and rephrased ideas.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Multiple Choice Tips",
      text: "1) Read the question carefully. 2) Find the relevant part of the passage using keywords. 3) Read 2-3 sentences around the keyword. 4) Eliminate options not mentioned or contradicting the text. 5) Choose the option directly supported by the passage.",
    },
    {
      kind: "table",
      headers: ["Option Type","How to Spot It","Action"],
      rows: [["Direct match","Uses same words as passage","Check context carefully"],["Paraphrase","Same meaning, different words","Likely correct answer"],["Distractor","Uses passage words but wrong meaning","Eliminate"],["Out of scope","Not mentioned in passage","Eliminate"],["Contradiction","Opposite of what passage says","Eliminate"]],
    },
    {
      kind: "examples",
      items: [{"en":"Find the keywords in the question first.","tr":"Find the keywords in the question first.","ar":"ابحث عن الكلمات المفتاحية في السؤال أولاً."},{"en":"The correct answer is often a paraphrase.","tr":"The correct answer is often a paraphrase.","ar":"الإجابة الصحيحة غالباً ما تكون إعادة صياغة."},{"en":"Eliminate options that contain false information.","tr":"Eliminate options that contain false information.","ar":"استبعد الخيارات التي تحتوي على معلومات خاطئة."}],
    },
  ],
};

const band2Lesson7: Lesson = {
  id: "band2-writing-line-graphs",
  title: "Writing Task 1: Academic Line Graph Masterclass",
  subtitle: "Authentic Cambridge prompt & Band 9 model",
  xpReward: 60,
  blocks: [
    {
      kind: "p",
      text: "In IELTS Academic Writing Task 1, you must summarize factual data in a line graph within 20 minutes (minimum 150 words). To attain Band 8.0+, your report requires a paraphrased introduction, an overarching macro overview highlighting the key trends, and tightly organized body paragraphs detailing data with precision without editorializing.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Authentic Cambridge Task 1 Prompt",
      text: "The graph below illustrates electricity generation by energy source (Coal, Natural Gas, Renewables) in the United Kingdom between 1980 and 2020 (measured in Terawatt-hours, TWh).\n\nSummarize the information by selecting and reporting the main features, and make comparisons where relevant.",
    },
    {
      kind: "table",
      headers: ["Energy Source","1980","1990 (Peak/Rise)","2010","2020 (End)"],
      rows: [
        ["Coal","150 TWh","180 TWh (all-time peak)","90 TWh","12 TWh (historic low)"],
        ["Natural Gas","0 TWh","35 TWh","135 TWh (highest)","110 TWh (plateaued)"],
        ["Renewables","< 5 TWh","5 TWh","22 TWh","120 TWh (market leader)"]
      ],
    },
    {
      kind: "p",
      text: "FULL BAND 9 MODEL REPORT (182 words):\n\nThe line graph delineates the quantity of electricity generated in the United Kingdom from three distinct fuel sources—coal, natural gas, and renewables—over a forty-year period from 1980 to 2020, measured in Terawatt-hours (TWh).\n\nOverall, electricity production in the UK experienced a profound structural transition away from fossil fuels toward cleaner alternatives. While coal plummeted from being the unquestioned dominant source to an almost negligible contributor, renewable energy and natural gas witnessed substantial long-term growth, with renewables surpassing all fossil fuels by the terminal year.\n\nRegarding fossil fuels, coal generated approximately 150 TWh of power in 1980. Despite an initial rise to a peak of 180 TWh in 1990, its output suffered a sustained and precipitous downturn, dropping sharply to 70 TWh in 2015 before hitting a historic low of just 12 TWh in 2020. Conversely, natural gas produced no measurable electricity in 1980; however, it underwent a steep ascent through the 1990s, culminating in an apex of 135 TWh in 2010 before declining moderately to plateau around 110 TWh.\n\nIn stark contrast, renewable sources generated negligible quantities below 5 TWh throughout the first half of the timeframe. After 2005, however, generation accelerated exponentially, soaring from 22 TWh in 2010 to 120 TWh in 2020, thereby eclipsing natural gas as the nation's primary power provider.",
    },
    {
      kind: "table",
      headers: ["Criterion","Band 9 Examiner Breakdown"],
      rows: [
        ["Task Achievement","Clear 2-sentence overview identifying macro trends; key inflection points (1990 peak, 2020 crossover) reported accurately without missing any source."],
        ["Coherence & Cohesion","Logical grouping: fossil fuels grouped in Body 1; renewables contrasted in Body 2. Smooth signposts: 'Overall', 'Regarding fossil fuels', 'Conversely', 'In stark contrast'."],
        ["Lexical Resource","Precise dynamic vocabulary: 'structural transition', 'precipitous downturn', 'steep ascent', 'culminating in an apex', 'eclipsing'."],
        ["Grammar Range","Complex structures: participle clauses ('dropping sharply... before hitting...'), passive voice ('was generated'), and accurate prepositions ('to a peak of', 'plateau around')."]
      ],
    },
    {
      kind: "examples",
      items: [
        { en: "Coal output experienced a precipitous decline, plummeting to an all-time low of 12 TWh.", tr: "Coal output experienced a precipitous decline, plummeting to an all-time low of 12 TWh.", ar: "شهد إنتاج الفحم انخفاضاً حاداً، حيث هوى إلى أدنى مستوى له على الإطلاق عند 12 تيراواط/ساعة." },
        { en: "Renewable energy witnessed exponential growth, ultimately eclipsing conventional fossil sources.", tr: "Renewable energy witnessed exponential growth, ultimately eclipsing conventional fossil sources.", ar: "شهدت الطاقة المتجددة نمواً هائلاً، متجاوزة في النهاية مصادر الوقود الأحفوري التقليدية." },
        { en: "Natural gas production surged throughout the 1990s before plateauing at approximately 110 TWh.", tr: "Natural gas production surged throughout the 1990s before plateauing at approximately 110 TWh.", ar: "ارتفع إنتاج الغاز الطبيعي طوال التسعينيات قبل أن يستقر عند حوالي 110 تيراواط/ساعة." }
      ],
    },
  ],
};

const band2Lesson8: Lesson = {
  id: "band2-writing-bar-pie",
  title: "Writing Task 1: Comparative Bar & Pie Charts",
  subtitle: "Cross-chart synthesis & proportional analysis",
  xpReward: 60,
  blocks: [
    {
      kind: "p",
      text: "When IELTS Writing Task 1 presents two charts (e.g., a bar chart combined with a pie chart), your objective is NOT to describe each graphic isolatedly in turn. You must synthesize the data by cross-referencing trends and highlighting anomalies.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Authentic Multi-Graphic Prompt",
      text: "The bar chart illustrates adult participation rates in four sports across three age brackets in Australia in 2022, while the pie chart depicts the percentage distribution of national sports grant funding allocated to these activities.",
    },
    {
      kind: "table",
      headers: ["Sport","18–34 Age Group","35–54 Age Group","55+ Age Group","Grant Share (%)"],
      rows: [
        ["Swimming","38%","42%","46%","18% of grants"],
        ["Running","52%","28%","9%","12% of grants"],
        ["Tennis","14%","16%","15%","28% of grants"],
        ["Cycling","24%","26%","22%","42% of grants"]
      ],
    },
    {
      kind: "p",
      text: "BAND 9 MODEL SYNTHESIS (178 words):\n\nThe bar chart compares adult sports engagement across four disciplines and three age demographics in Australia in 2022, whereas the pie chart details the corresponding allocation of federal sports funding.\n\nOverall, running and swimming enjoyed the highest participation rates among younger and older demographics respectively, yet financial grants revealed an inverse distribution, with cycling receiving the lion's share of public funds despite modest domestic uptake.\n\nLooking first at participation, running dominated the 18–34 cohort at 52%, but fell precipitously to just 9% among individuals aged 55 and over. In direct contrast, swimming maintained resilient popularity across all generations, climbing from 38% among youths to a peak of 46% among seniors. Tennis displayed remarkable consistency, engaging approximately 15% across all three demographics, while cycling hovered between 22% and 26%.\n\nTurning to funding distribution, a striking disparity emerges between public engagement and financial investment. Cycling secured 42% of total grants, almost fourfold the allocation received by running (12%), despite running's overwhelming appeal to youth. Similarly, swimming garnered a modest 18%, trailing tennis (28%).",
    },
    {
      kind: "table",
      headers: ["Comparative Formula","Application Example"],
      rows: [
        ["X outstripped Y by a factor of [N]","Cycling funding outstripped running by a factor of more than three."],
        ["In stark contrast to [Category A], [Category B]...","In stark contrast to running, swimming maintained resilient popularity."],
        ["Accounting for the lion's share / a negligible fraction","Cycling secured the lion's share of subsidies, accounting for 42%."],
        ["Revealed an inverse correlation","Participation and funding revealed an inverse correlation."]
      ],
    },
    {
      kind: "examples",
      items: [
        { en: "Cycling secured the lion's share of public grants despite modest community engagement.", tr: "Cycling secured the lion's share of public grants despite modest community engagement.", ar: "حصلت رياضة ركوب الدراجات على حصة الأسد من المنح العامة رغم المشاركة المجتمعية المتواضعة." },
        { en: "Running engagement dropped precipitously among senior demographics.", tr: "Running engagement dropped precipitously among senior demographics.", ar: "انخفضت المشاركة في رياضة الجري بشكل حاد بين كبار السن." },
        { en: "Swimming demonstrated resilient popularity across all surveyed age cohorts.", tr: "Swimming demonstrated resilient popularity across all surveyed age cohorts.", ar: "أظهرت السباحة شعبية ثابتة عبر جميع الفئات العمرية المشمولة بالاستطلاع." }
      ],
    },
  ],
};

const band2Lesson9: Lesson = {
  id: "band2-writing-letter",
  title: "Writing Task 1 (IELTS General): Letter Writing",
  subtitle: "Formal vs informal",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "IELTS General Training Writing Task 1 requires you to write a letter (150 words, 20 minutes). Letters can be formal, semi-formal, or informal. The tone must match the recipient. Start with a clear purpose, include 2-3 bullet points from the question, and end appropriately.",
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Tone Rules",
      text: "Formal: 'Dear Sir/Madam' → 'Yours faithfully'. Formal with name: 'Dear Mr. Smith' → 'Yours sincerely'. Informal: 'Dear Ahmed' → 'Best wishes'. Formal letters: no contractions, polite phrases. Informal letters: contractions OK, casual language.",
    },
    {
      kind: "table",
      headers: ["Feature","Formal","Informal"],
      rows: [["Salutation","Dear Sir/Madam / Dear Mr. Smith","Dear John / Hi Ahmed"],["Closing","Yours faithfully / Yours sincerely","Best wishes / Take care / Love"],["Contractions","Do not use (I am, I would)","Use (I'm, I'd, I'll)"],["Language","Polite, professional","Casual, friendly"],["Purpose","Complaint, application, request","Invitation, thank you, news"]],
    },
    {
      kind: "examples",
      items: [{"en":"I am writing to express my dissatisfaction with...","tr":"I am writing to express my dissatisfaction with...","ar":"أكتب لأعرب عن استيائي من..."},{"en":"I would be grateful if you could...","tr":"I would be grateful if you could...","ar":"سأكون ممتناً لو تمكنت من..."},{"en":"Just writing to let you know that...","tr":"Just writing to let you know that...","ar":"أكتب فقط لأخبرك أن..."}],
    },
  ],
};

const band2Lesson10: Lesson = {
  id: "band2-writing-opinion",
  title: "Writing Task 2: Discursive Essay Masterclass",
  subtitle: "Authentic Cambridge prompt & Band 9 model",
  xpReward: 60,
  blocks: [
    {
      kind: "p",
      text: "IELTS Writing Task 2 carries double the weight of Task 1. You must write at least 250 words in 40 minutes. High-band scripts (Band 8.0–9.0) require a clear thesis statement, fully extended ideas developed via the PEEL method (Point, Explanation, Evidence, Link), and nuanced lexical resources with hedging.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Authentic Cambridge Task 2 Prompt",
      text: "In many countries, it is increasingly common for young people to take a gap year between completing secondary school and commencing university. Do the advantages of this practice outweigh the disadvantages?",
    },
    {
      kind: "p",
      text: "BAND 9 MODEL ESSAY (284 words):\n\nIn recent years, the propensity among high school graduates to take a gap year before embarking on tertiary education has gained considerable momentum globally. While concerns persist regarding academic momentum, I firmly contend that the personal maturity, professional clarity, and financial self-reliance fostered during this interval substantially outweigh any temporary setbacks.\n\nAdmittedly, critics argue that an unstructured hiatus can derail a student's academic discipline. Prolonged detachment from structured study environments frequently results in cognitive lethargy, making the eventual transition to rigorous university curricula arduous. Furthermore, individuals lacking disciplined planning risk squandering valuable time or accumulating debt, placing them at an unnecessary developmental disadvantage compared to peers who matriculate directly.\n\nNevertheless, the experiential benefits acquired through travel, internships, or vocational work are invaluable. Immersing oneself in professional environments provides adolescents with pragmatic insights that no secondary curriculum can simulate. For instance, a student undertaking an internship in software development or volunteering for an NGO gains acute clarity regarding their genuine vocational aptitude, drastically curtailing the probability of switching degree majors later at exorbitant tuition expense.\n\nEqually significant is the cultivation of emotional resilience and autonomy. Living independently, managing a modest budget, and solving real-world dilemmas away from parental supervision cultivates adaptability—an indispensable soft skill in both academic seminars and modern workplaces. Consequently, gap-year returnees typically exhibit greater academic focus and superior self-efficacy than their younger cohort.\n\nIn conclusion, while an unplanned sabbatical carries logistical risks, the holistic benefits of emotional maturity, vocational discernment, and real-world competence ensure that the advantages of taking a gap year overwhelmingly surpass its drawbacks.",
    },
    {
      kind: "table",
      headers: ["PEEL Component","Demonstration in Body Paragraph 1"],
      rows: [
        ["Point (Topic Sentence)","Experiential benefits acquired through internships or travel are invaluable."],
        ["Explanation","Professional exposure grants adolescents pragmatic insights that schooling cannot simulate."],
        ["Evidence / Example","Interning at an NGO gives students clarity on their vocational aptitude, curtailing degree changes."],
        ["Link to Thesis","Reduces wasted tuition and solidifies academic dedication upon university entry."]
      ],
    },
    {
      kind: "table",
      headers: ["Criterion","Examiner Band 9 Assessment"],
      rows: [
        ["Task Response","Unambiguous position sustained from introduction through conclusion; both advantages and drawbacks are fully addressed and weighed."],
        ["Coherence & Cohesion","Flawless paragraph progression; sophisticated cohesive devices ('Admittedly', 'Nevertheless', 'Equally significant', 'Consequently')."],
        ["Lexical Resource","Rare, academic collocations: 'cognitive lethargy', 'vocational discernment', 'self-efficacy', 'matriculate directly', 'exorbitant tuition'."],
        ["Grammar Range","Complex participle clauses ('Living independently, managing a budget...'), modal hedging, and varied conditional syntax."]
      ],
    },
    {
      kind: "examples",
      items: [
        { en: "The experiential maturity gained substantially outweighs any temporary delay.", tr: "The experiential maturity gained substantially outweighs any temporary delay.", ar: "النضج التجريبي المكتسب يفوق بشكل كبير أي تأخير مؤقت." },
        { en: "Prolonged detachment from structured study risks inducing cognitive lethargy.", tr: "Prolonged detachment from structured study risks inducing cognitive lethargy.", ar: "الانقطاع المطول عن الدراسة المنظمة يهدد بالتسبب في خمول إدراكي." },
        { en: "Hands-on internships grant young scholars acute vocational clarity.", tr: "Hands-on internships grant young scholars acute vocational clarity.", ar: "التدريب العملي يمنح الطلاب الشباب وضوحاً مهنياً دقيقاً." }
      ],
    },
  ],
};

const band2Lesson11: Lesson = {
  id: "band2-writing-problem-solution",
  title: "Writing Task 2: Problem-Solution Essays",
  subtitle: "Structure and phrases",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Problem-solution essays ask you to discuss a problem and propose solutions. Structure: Introduction (describe the issue), Body 1 (problem/cause), Body 2 (solution), Conclusion (summarize and recommend). Ensure each solution directly addresses one specific problem.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Linking Problems to Solutions",
      text: "Use phrases like: 'This problem can be tackled by...', 'A possible solution is to...', 'To address this issue, the government should...', 'One way to overcome this challenge is...', 'This would help because...'.",
    },
    {
      kind: "table",
      headers: ["Problem Phrase","Solution Phrase"],
      rows: [["One major problem is...","This could be addressed by..."],["A significant cause of...","To combat this, it is essential to..."],["This leads to...","One effective measure is to..."],["As a result of this...","Another solution would be to..."],["The main issue is...","The most viable solution is..."]],
    },
    {
      kind: "examples",
      items: [{"en":"Air pollution is a major problem in large cities.","tr":"Air pollution is a major problem in large cities.","ar":"تلوث الهواء مشكلة كبيرة في المدن الكبرى."},{"en":"This problem can be tackled by promoting public transport.","tr":"This problem can be tackled by promoting public transport.","ar":"يمكن معالجة هذه المشكلة من خلال تشجيع النقل العام."},{"en":"One effective solution is to invest in renewable energy.","tr":"One effective solution is to invest in renewable energy.","ar":"أحد الحلول الفعالة هو الاستثمار في الطاقة المتجددة."}],
    },
  ],
};

const band2Lesson12: Lesson = {
  id: "band2-writing-cohesion",
  title: "Writing Task 2: Cohesion & Coherence",
  subtitle: "Linking words, paragraph flow",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Coherence means your essay is logically organized. Cohesion means your sentences and paragraphs are connected using linking words. Use a range of cohesive devices: firstly, however, therefore, furthermore, in conclusion. Don't overuse them — about 2-3 per paragraph is enough.",
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The 25% Rule",
      text: "Linking words should make up no more than about 25% of your cohesive devices. The rest should come from logical progression — using pronouns (this, these, such), synonyms, and parallel structure.",
    },
    {
      kind: "table",
      headers: ["Function","Linking Words","Example"],
      rows: [["Adding ideas","Furthermore, Moreover, In addition","Furthermore, online learning offers flexibility."],["Contrast","However, Nevertheless, On the other hand","However, this approach has limitations."],["Cause/Effect","Therefore, Consequently, As a result","Therefore, the government must take action."],["Giving examples","For instance, For example, Such as","For instance, Sweden has implemented this policy."],["Concluding","In conclusion, To sum up, Overall","In conclusion, both views have merit."]],
    },
    {
      kind: "examples",
      items: [{"en":"Firstly, education improves economic outcomes.","tr":"Firstly, education improves economic outcomes.","ar":"أولاً، التعليم يحسن النتائج الاقتصادية."},{"en":"However, there are some drawbacks to this approach.","tr":"However, there are some drawbacks to this approach.","ar":"ومع ذلك، هناك بعض العيوب لهذا النهج."},{"en":"Consequently, many people have lost their jobs.","tr":"Consequently, many people have lost their jobs.","ar":"وبالتالي، فقد الكثير من الناس وظائفهم."}],
    },
  ],
};

const band2Lesson13: Lesson = {
  id: "band2-speaking-cue-card",
  title: "Speaking Part 2 (IELTS): Cue Card Masterclass",
  subtitle: "ARE framework, notes strategy & Band 9 model",
  xpReward: 60,
  blocks: [
    {
      kind: "p",
      text: "IELTS Speaking Part 2 tests your ability to sustain long-turn speech fluently for 1 to 2 minutes without pausing or prompt assistance. You are given a prompt card and exactly 60 seconds to prepare. High-scoring candidates use the ARE formula: Assertion (Direct answer), Reason (Why / Context), Example / Elaboration (Sensory and narrative details).",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Authentic Cambridge Cue Card Prompt",
      text: "Describe an environmental initiative or law in your country that you think has had a positive effect.\n\nYou should say:\n• what it is and when it was introduced\n• what specific problem it was intended to address\n• how the public reacted initially\nand explain why you believe it has been successful in the long run.",
    },
    {
      kind: "table",
      headers: ["Bullet Point","60-Second Scratchpad Notes","Spoken Signpost"],
      rows: [
        ["What & When","Single-use plastic bag levy (2015) — 15c charge","'I'd like to talk about the nationwide levy on...'"],
        ["Problem Addressed","Landfill saturation, marine microplastics, drainage clogging","'The impetus behind this legislation was...'"],
        ["Public Reaction","Initial grumbling, cashier disputes, quick adaptation","'To be completely candid, initial reception was skepticism...'"],
        ["Why Successful","85% reduction in usage, behavioral normalization, bag reuse","'What cements this as a triumph is...'"]
      ],
    },
    {
      kind: "p",
      text: "BAND 9 SPOKEN TRANSCRIPT (2-Minute Model):\n\n'I'd like to discuss the nationwide single-use plastic bag levy that was introduced in my country roughly eight years ago. Prior to this legislation, supermarkets and convenience stores dispensed billions of flimsy polyethylene bags every year without a second thought, which inevitably triggered catastrophic environmental repercussions—namely, clogged storm drains, saturated municipal landfills, and widespread marine pollution.\n\nTo be completely candid, when the government initially mandated a nominal fifteen-cent fee per bag at checkouts, public reaction was decidedly mixed. There was noticeable resistance and frequent grumbling from shoppers caught unprepared, and tabloids even decried it as an opportunistic revenue grab. However, within a matter of months, a profound psychological shift took root. People quickly learned to keep sturdy canvas totes in their car boots or backpacks simply to avoid the nuisance fee.\n\nWhat cements this initiative as an undeniable triumph in my view is the sheer magnitude of behavioral change it catalyzed. Official environmental audits demonstrated an astonishing eighty-five percent reduction in plastic bag consumption within the first two years alone. More importantly, it acted as a psychological gateway: it compelled ordinary citizens to reflect consciously on disposable culture, paving the way for subsequent bans on plastic straws and polystyrene food containers.'",
    },
    {
      kind: "table",
      headers: ["Speaking Band Descriptor","Demonstrated Feature in Transcript"],
      rows: [
        ["Fluency & Coherence","Zero unnatural pauses; effortless discourse flow using natural discourse markers ('Prior to this legislation', 'To be completely candid', 'What cements this...')."],
        ["Lexical Resource","Idiomatic, natural collocations: 'dispensed billions', 'flimsy polyethylene', 'catastrophic repercussions', 'profound psychological shift', 'catalyze change'."],
        ["Grammar Range","Complex syntactic structures: 'Prior to this legislation... stores dispensed... which inevitably triggered...'; inversion and clefting ('What cements this... is...')."],
        ["Pronunciation & Prosody","Natural sentence stress on contrastive points ('eighty-five percent reduction', 'sheer magnitude')."]
      ],
    },
    {
      kind: "examples",
      items: [
        { en: "To be completely candid, public reception was initially met with widespread skepticism.", tr: "To be completely candid, public reception was initially met with widespread skepticism.", ar: "لنكون صريحين تماماً، قوبل التفاعل العام في البداية بتشكك واسع النطاق." },
        { en: "What cements this policy as an undeniable triumph is the rapid behavioral shift it catalyzed.", tr: "What cements this policy as an undeniable triumph is the rapid behavioral shift it catalyzed.", ar: "ما يرسخ هذه السياسة كانتصار لا جدال فيه هو التحول السلوكي السريع الذي حفزته." },
        { en: "Official environmental audits revealed an astonishing eighty-five percent drop in disposable waste.", tr: "Official environmental audits revealed an astonishing eighty-five percent drop in disposable waste.", ar: "كشفت عمليات التدقيق البيئي الرسمية عن انخفاض مذهل بنسبة 85% في النفايات ذات الاستخدام الواحد." }
      ],
    },
  ],
};

const band2Lesson14: Lesson = {
  id: "band2-speaking-describe",
  title: "Speaking Part 2: Describing People & Places",
  subtitle: "Vocabulary",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Describing people and places is a common topic in IELTS Speaking Part 2. For people: describe appearance (height, build, hair, eyes), personality (outgoing, reserved, compassionate), and relationship to you. For places: describe location, atmosphere (bustling, serene, vibrant), appearance, and why it's special.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Descriptive Vocabulary",
      text: "For people: 'warm-hearted', 'down-to-earth', 'quick-witted', 'charismatic'. For places: 'picturesque', 'breathtaking', 'historic', 'cosmopolitan', 'charming'. Avoid simple words like 'nice', 'good', 'beautiful'.",
    },
    {
      kind: "table",
      headers: ["Category","Adjective","Example"],
      rows: [["Personality","outgoing","My best friend is very outgoing and loves meeting new people."],["Personality","compassionate","She is incredibly compassionate towards others."],["Appearance","tall and slender","He is tall and slender with dark curly hair."],["Place","bustling","The market is always bustling with tourists."],["Place","serene","The beach at sunset is absolutely serene."],["Place","historic","The city center is full of historic buildings."]],
    },
    {
      kind: "examples",
      items: [{"en":"My mother is a very compassionate person who always helps others.","tr":"My mother is a very compassionate person who always helps others.","ar":"والدتي شخص متعطف جداً يساعد الآخرين دائماً."},{"en":"My hometown is a picturesque coastal town with beautiful beaches.","tr":"My hometown is a picturesque coastal town with beautiful beaches.","ar":"مسقط رأسي بلدة ساحلية خلابة بشواطئ جميلة."},{"en":"The library has a serene atmosphere that helps me focus.","tr":"The library has a serene atmosphere that helps me focus.","ar":"المكتبة لديها جو هادئ يساعدني على التركيز."}],
    },
  ],
};

const band2Lesson15: Lesson = {
  id: "band2-speaking-integrated",
  title: "Speaking (TOEFL): Integrated Task Intro",
  subtitle: "Read + listen + speak",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "TOEFL Speaking Tasks 2-4 are Integrated tasks. You read a short passage, listen to a conversation or lecture, and then speak about what you read and heard. Task 2 involves campus situations, Task 3 is academic definitions with examples, and Task 4 is an academic lecture with two examples.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Integrated Speaking Structure",
      text: "For Task 2: Start with the announcement/opinion. Then explain the speaker's attitude and reasons. For Task 3: Define the term from the reading, then explain the example from the lecture.",
    },
    {
      kind: "table",
      headers: ["Task","Reading Content","Listening Content","Your Response"],
      rows: [["Task 2","Campus announcement","Student conversation","Summarize + explain reasons"],["Task 3","Academic term definition","Lecture with example","Define term + give example"],["Task 4","Brief topic intro","Lecture with 2 examples","Summarize main point + examples"]],
    },
    {
      kind: "examples",
      items: [{"en":"The reading states that the library will extend its hours.","tr":"The reading states that the library will extend its hours.","ar":"يذكر النص أن المكتبة ستمدد ساعات عملها."},{"en":"The professor gives an example of how this concept works.","tr":"The professor gives an example of how this concept works.","ar":"يعطي الأستاذ مثالاً على كيفية عمل هذا المفهوم."},{"en":"The woman disagrees with the proposal because...","tr":"The woman disagrees with the proposal because...","ar":"المرأة لا توافق على الاقتراح لأن..."}],
    },
  ],
};

const band2Lesson16: Lesson = {
  id: "band2-grammar-tenses",
  title: "Grammar Boost: Tenses in Academic Writing",
  subtitle: "Present simple, past, present perfect",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Academic writing uses specific tenses for specific purposes. Present simple is used for general truths. Past simple is used for completed research or events. Present perfect is used for past events with present relevance. Future forms are used sparingly, usually with 'will' for predictions.",
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Tense Rules",
      text: "Writing Task 1 (graph): Use past simple for completed time periods. Use present simple for general trends. Writing Task 2 (essay): Mostly present simple for opinions. Use present perfect to introduce research.",
    },
    {
      kind: "table",
      headers: ["Tense","When to Use","Example"],
      rows: [["Present simple","General facts, habits","The graph shows the number of users."],["Past simple","Completed past action","Sales increased by 20% in 2010."],["Present perfect","Past with present relevance","Research has confirmed this finding."],["Present continuous","Changing situation now","The number is rising rapidly."],["Future (will)","Prediction","This trend will continue in the future."]],
    },
    {
      kind: "examples",
      items: [{"en":"The chart illustrates population changes over time.","tr":"The chart illustrates population changes over time.","ar":"يوضح المخطط التغيرات السكانية مع مرور الوقت."},{"en":"Studies have demonstrated that exercise improves health.","tr":"Studies have demonstrated that exercise improves health.","ar":"أظهرت الدراسات أن التمارين تحسن الصحة."},{"en":"In 2020, the government introduced new policies.","tr":"In 2020, the government introduced new policies.","ar":"في 2020، قدمت الحكومة سياسات جديدة."}],
    },
  ],
};

const band2Lesson17: Lesson = {
  id: "band2-grammar-complex",
  title: "Grammar Boost: Complex Sentences",
  subtitle: "Subordinate clauses",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Complex sentences contain a main clause and one or more subordinate clauses. Common types: adverb clauses (because, although, while, if), relative clauses (who, which, that), and noun clauses (that, what, whether). Variety is more important than length.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Sentence Variety Checklist",
      text: "Include: 1) A sentence starting with 'Although/While'. 2) A sentence with a relative clause. 3) A conditional sentence. 4) A sentence with 'because'. 5) A sentence with 'consequently'.",
    },
    {
      kind: "table",
      headers: ["Type","Conjunction","Example"],
      rows: [["Adverb (reason)","because, since, as","Many students struggle because they don't practice."],["Adverb (concession)","although, even though, while","Although the task was difficult, I completed it."],["Adverb (condition)","if, unless, provided that","If you study consistently, you will improve."],["Relative","who, which, that","The research, which was published in 2020, supports this."],["Noun clause","that, whether, what","The report suggests that more funding is needed."]],
    },
    {
      kind: "examples",
      items: [{"en":"Although the initial cost is high, the long-term benefits are significant.","tr":"Although the initial cost is high, the long-term benefits are significant.","ar":"على الرغم من أن التكلفة الأولية مرتفعة، إلا أن الفوائد طويلة الأجل كبيرة."},{"en":"Students who study regularly tend to achieve higher scores.","tr":"Students who study regularly tend to achieve higher scores.","ar":"الطلاب الذين يدرسون بانتظام يميلون إلى تحقيق درجات أعلى."},{"en":"The data indicates that the trend is likely to continue.","tr":"The data indicates that the trend is likely to continue.","ar":"تشير البيانات إلى أن الاتجاه من المرجح أن يستمر."}],
    },
  ],
};

const band2Lesson18: Lesson = {
  id: "band2-vocab-awl2",
  title: "Vocabulary: AWL Sublist 2",
  subtitle: "Essential academic words",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "AWL Sublist 2 contains the next 60 most common academic words. These words appear frequently in university textbooks, lectures, and academic journals. Learning them will improve your reading speed and comprehension.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Word Families",
      text: "Learn each word in multiple forms. For example: 'achieve' (v) → 'achievement' (n) → 'achievable' (adj). This allows you to use the word flexibly in different grammatical contexts.",
    },
    {
      kind: "table",
      headers: ["Word","Part of Speech","Example","Arabic"],
      rows: [["achieve","v","Students must work hard to achieve their goals.","يحقق"],["acquire","v","Children acquire language naturally.","يكتسب"],["administration","n","The administration implemented new policies.","إدارة"],["affect","v","Climate change affects everyone.","يؤثر على"],["appropriate","adj","Choose the appropriate methodology.","مناسب"],["aspect","n","Every aspect of the problem was examined.","جانب"],["assistance","n","Financial assistance is available.","مساعدة"],["category","n","This falls into a different category.","فئة"],["chapter","n","Chapter 3 discusses the methodology.","فصل"],["commission","n/v","The commission published its findings.","لجنة / يكلف"]],
    },
    {
      kind: "examples",
      items: [{"en":"Students can achieve better results with consistent practice.","tr":"Students can achieve better results with consistent practice.","ar":"يمكن للطلاب تحقيق نتائج أفضل بالممارسة المنتظمة."},{"en":"This approach affects the entire community.","tr":"This approach affects the entire community.","ar":"هذا النهج يؤثر على المجتمع بأكمله."},{"en":"Choose the most appropriate vocabulary for your essay.","tr":"Choose the most appropriate vocabulary for your essay.","ar":"اختر المفردات الأكثر ملاءمة لمقالك."}],
    },
  ],
};

const band2Lesson19: Lesson = {
  id: "band2-vocab-collocations",
  title: "Vocabulary: Collocations for Task 1",
  subtitle: "Significant increase, sharp drop",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Collocations are words that naturally go together. In Writing Task 1, using the correct adjective-noun and verb-adverb collocations makes your description sound natural and sophisticated. For example, 'a significant increase', 'a sharp drop', 'rose dramatically'.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Common Collocations",
      text: "Adjective + Noun: 'a dramatic rise', 'a steady decline', 'a slight fluctuation'. Verb + Adverb: 'increased sharply', 'declined gradually', 'rose steadily'.",
    },
    {
      kind: "table",
      headers: ["Collocation Type","Example 1","Example 2","Example 3"],
      rows: [["Adj + Increase","significant increase","dramatic increase","steady increase"],["Adj + Decrease","sharp decrease","gradual decrease","slight decrease"],["Adv + Rise","rose dramatically","rose steadily","rose sharply"],["Adv + Fall","fell sharply","fell gradually","fell slightly"],["Verb + Growth","experienced growth","showed growth","underwent growth"]],
    },
    {
      kind: "examples",
      items: [{"en":"There was a significant increase in temperatures.","tr":"There was a significant increase in temperatures.","ar":"كانت هناك زيادة كبيرة في درجات الحرارة."},{"en":"Prices fell sharply during the recession.","tr":"Prices fell sharply during the recession.","ar":"انخفضت الأسعار بشكل حاد خلال الركود."},{"en":"The population grew steadily throughout the century.","tr":"The population grew steadily throughout the century.","ar":"نما عدد السكان بشكل ثابت طوال القرن."}],
    },
  ],
};

const band2Lesson20: Lesson = {
  id: "band2-vocab-environment",
  title: "Vocabulary: Topic-Specific — Environment",
  subtitle: "Key terms",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "The environment is a common topic. You need vocabulary for discussing climate change, pollution, conservation, and sustainability. Learn topic-specific words in groups: causes (emissions, deforestation, fossil fuels), effects (global warming, extinction), and solutions (renewable energy, recycling, conservation).",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Topic Clusters",
      text: "Climate Change: carbon footprint, greenhouse gases. Pollution: air/water/soil pollution, toxic waste. Conservation: biodiversity, endangered species, ecosystem. Energy: solar power, wind energy, fossil fuels, sustainable.",
    },
    {
      kind: "table",
      headers: ["Word/Phrase","Definition","Example","Arabic"],
      rows: [["climate change","Long-term change in weather patterns","Climate change causes extreme weather.","تغير المناخ"],["carbon footprint","Amount of CO2 produced","We must reduce our carbon footprint.","البصمة الكربونية"],["renewable energy","Energy from natural sources","Solar and wind are renewable energy.","طاقة متجددة"],["deforestation","Clearing of forests","Deforestation threatens wildlife.","إزالة الغابات"],["sustainable","Environmentally friendly long-term","We need sustainable development.","مستدام"],["emissions","Gases released into the air","Vehicle emissions cause air pollution.","انبعاثات"]],
    },
    {
      kind: "examples",
      items: [{"en":"Climate change is one of the biggest challenges we face.","tr":"Climate change is one of the biggest challenges we face.","ar":"تغير المناخ هو أحد أكبر التحديات التي نواجهها."},{"en":"Governments should invest more in renewable energy.","tr":"Governments should invest more in renewable energy.","ar":"يجب على الحكومات الاستثمار أكثر في الطاقة المتجددة."},{"en":"Deforestation has a devastating impact on biodiversity.","tr":"Deforestation has a devastating impact on biodiversity.","ar":"إزالة الغابات لها تأثير مدمر على التنوع البيولوجي."}],
    },
  ],
};

const band2Lesson21: Lesson = {
  id: "band2-vocab-technology",
  title: "Vocabulary: Topic-Specific — Technology",
  subtitle: "Key terms",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Technology is a frequent topic. You should be able to discuss artificial intelligence, social media, the internet, and automation. Build vocabulary for both benefits (innovation, efficiency, connectivity) and drawbacks (cybercrime, addiction, job displacement).",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Technology Essay Phrases",
      text: "'technological advancements', 'the digital revolution', 'artificial intelligence', 'the rise of automation', 'cyber security threats', 'digital divide'.",
    },
    {
      kind: "table",
      headers: ["Word/Phrase","Definition","Example","Arabic"],
      rows: [["innovation","New idea or method","Innovation has transformed healthcare.","ابتكار"],["automation","Use of machines to do work","Automation replaces manual labor.","أتمتة"],["artificial intelligence","Computer systems that think","AI is used in self-driving cars.","ذكاء اصطناعي"],["digital divide","Gap between tech users and non-users","The digital divide affects rural areas.","الفجوة الرقمية"],["cybercrime","Crime committed via internet","Cybercrime is increasing worldwide.","جرائم إلكترونية"],["social media","Online platforms for interaction","Social media changed communication.","وسائل التواصل الاجتماعي"]],
    },
    {
      kind: "examples",
      items: [{"en":"Technological innovation has revolutionized communication.","tr":"Technological innovation has revolutionized communication.","ar":"الابتكار التكنولوجي أحدث ثورة في الاتصالات."},{"en":"Automation may lead to job displacement in some sectors.","tr":"Automation may lead to job displacement in some sectors.","ar":"قد تؤدي الأتمتة إلى فقدان الوظائف في بعض القطاعات."},{"en":"The digital divide remains a significant challenge.","tr":"The digital divide remains a significant challenge.","ar":"الفجوة الرقمية لا تزال تشكل تحدياً كبيراً."}],
    },
  ],
};

const band2Lesson22: Lesson = {
  id: "band2-mistakes-prepositions",
  title: "Common Mistakes: Prepositions",
  subtitle: "At/in/on in academic contexts",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Prepositions are challenging for Arabic speakers. Common mistakes include using 'in' instead of 'at' for institutions ('at university' not 'in university'), confusing 'on' and 'about' for topics, and using 'by' incorrectly in passive constructions.",
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Common Academic Prepositions",
      text: "Research on a topic. At university. According to the author. In the 21st century. On page 5. By the government. Interested in. Different from.",
    },
    {
      kind: "table",
      headers: ["Correct","Incorrect","Rule"],
      rows: [["at university","in university","Use 'at' for institutions"],["research on","research about","Use 'on' for academic topics"],["according to the study","according to the study's results","Don't double-possess"],["in the 20th century","on the 20th century","'In' for time periods"],["by the researcher","from the researcher","'By' for passive agent"],["interested in","interested by","Fixed phrase: interested in"]],
    },
    {
      kind: "examples",
      items: [{"en":"According to the study, temperatures are rising.","tr":"According to the study, temperatures are rising.","ar":"وفقاً للدراسة، درجات الحرارة في ارتفاع."},{"en":"She is studying engineering at university.","tr":"She is studying engineering at university.","ar":"هي تدرس الهندسة في الجامعة."},{"en":"The research was conducted by a team of scientists.","tr":"The research was conducted by a team of scientists.","ar":"تم إجراء البحث بواسطة فريق من العلماء."}],
    },
  ],
};

const band2Lesson23: Lesson = {
  id: "band2-mistakes-countable",
  title: "Common Mistakes: Countable vs Uncountable",
  subtitle: "Much/many, fewer/less",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "English nouns are countable (book, student, idea) or uncountable (information, research, equipment, advice). Use 'much' with uncountable and 'many' with countable. Use 'fewer' with countable and 'less' with uncountable.",
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Uncountable Nouns List",
      text: "Common uncountable nouns: information, knowledge, research, evidence, equipment, furniture, progress, advice, behavior, weather, traffic, accommodation, homework, news, luggage.",
    },
    {
      kind: "table",
      headers: ["Correct","Incorrect","Type"],
      rows: [["much information","many informations","Information is uncountable"],["fewer students","less students","Students are countable"],["less research","fewer research","Research is uncountable"],["a piece of advice","an advice","Advice is uncountable"],["more evidence","evidences","Evidence is uncountable"],["many studies","much studies","Studies are countable"]],
    },
    {
      kind: "examples",
      items: [{"en":"The research provides valuable information.","tr":"The research provides valuable information.","ar":"يوفر البحث معلومات قيمة."},{"en":"Fewer students are choosing this subject.","tr":"Fewer students are choosing this subject.","ar":"عدد أقل من الطلاب يختارون هذا التخصص."},{"en":"Can you give me some advice about the exam?","tr":"Can you give me some advice about the exam?","ar":"هل يمكنك أن تعطيني بعض النصائح حول الامتحان؟"}],
    },
  ],
};

const band2Lesson24: Lesson = {
  id: "band2-practice-reading",
  title: "Practice Mini-Test: Reading",
  subtitle: "Short passage with 13 questions",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "This mini-test simulates an IELTS Academic Reading passage. You have 20 minutes to read a passage about renewable energy and answer 13 questions covering True/False/Not Given, sentence completion, and matching information.",
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Test Conditions",
      text: "Set a timer for 20 minutes. Do not use a dictionary. Read the passage once quickly (3-4 minutes), then answer the questions. Spelling mistakes will lose marks.",
    },
    {
      kind: "table",
      headers: ["Question Type","Number of Questions","Strategy"],
      rows: [["True/False/Not Given","5","Compare each statement to the passage carefully"],["Sentence Completion","4","Use grammar clues to predict word type"],["Matching Information","4","Scan for specific keywords in each paragraph"],["Total","13","Time: 20 minutes"]],
    },
    {
      kind: "examples",
      items: [{"en":"Read all questions before looking at the passage.","tr":"Read all questions before looking at the passage.","ar":"اقرأ جميع الأسئلة قبل النظر إلى النص."},{"en":"Check that your answers fit grammatically.","tr":"Check that your answers fit grammatically.","ar":"تأكد من أن إجاباتك مناسبة نحوياً."},{"en":"Spelling mistakes will cost you marks.","tr":"Spelling mistakes will cost you marks.","ar":"الأخطاء الإملائية ستكلفك علامات."}],
    },
  ],
};

const band2Lesson25: Lesson = {
  id: "band2-review",
  title: "Band 5–6 Review & Progress Check",
  subtitle: "Mixed skills assessment",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Well done completing Band 5–6 (Intermediate)! You have developed key exam techniques: multiple choice strategies, True/False/Not Given, essay structures for opinion and problem-solution, cue card speaking, and expanded academic vocabulary.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Self-Assessment",
      text: "Rate yourself 1-5: I can handle True/False/Not Given. I can write a well-structured opinion essay. I can speak for 2 minutes on a cue card. I understand preposition rules. I know AWL Sublist 2 words.",
    },
    {
      kind: "table",
      headers: ["Skill","What I Learned","Next Steps"],
      rows: [["Listening","Multiple choice, maps, form completion","Practice Section 2 and 3 recordings"],["Reading","T/F/NG, headings, multiple choice","Read academic journals weekly"],["Writing Task 1","Line graphs, bar/pie, letters","Practice 1 graph + 1 letter per week"],["Writing Task 2","Opinion, problem-solution, cohesion","Write 2 essays per week"],["Speaking","Cue card strategy, describing","Record 2 cue card talks per week"],["Grammar","Tenses, complex sentences","Review and practice weekly"],["Vocabulary","AWL 2, collocations, environment","Review topic vocabulary regularly"]],
    },
    {
      kind: "examples",
      items: [{"en":"I can now answer True/False/Not Given questions.","tr":"I can now answer True/False/Not Given questions.","ar":"يمكنني الآن الإجابة على أسئلة True/False/Not Given."},{"en":"My essay structure has improved significantly.","tr":"My essay structure has improved significantly.","ar":"هيكل مقالتي تحسن بشكل ملحوظ."},{"en":"I am ready to move to Band 6–7.","tr":"I am ready to move to Band 6–7.","ar":"أنا مستعد للانتقال إلى المستوى 6–7."}],
    },
  ],
};

const BAND2_LESSONS: Lesson[] = [
  {
    "id": "band2-listening-mcq",
    "title": "Listening: Part 1 Details, Corrections and Distractors",
    "subtitle": "Identify final booking details",
    "xpReward": 60,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Identify final booking details. Distinguish a correction from a distractor. Transfer names, numbers and words within the stated limit."
      },
      {
        "kind": "p",
        "text": "IELTS Listening has four parts and forty questions. Part 1 is a conversation about everyday arrangements. Part 2 is an everyday monologue; Parts 3 and 4 move into educational contexts. Information may be revised: mentioning a day does not make it the answer. Decide which detail answers the question, then follow the speaker until that detail is settled. A student price and a standard price can both be true, so the question determines which one to record. These lessons use visible original transcripts for text-based study. They teach evidence tracking, not measured listening ability. Ask a partner to read the script once while you cover it for optional listening rehearsal."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Preview the form; predict a day, time, amount or name. Mark whose booking is being described. Note corrections and check spelling against the final instruction. Move on after a missed answer."
      },
      {
        "kind": "p",
        "text": "Original transcript study: A caller books a museum workshop. Clerk: 'The pottery class is on Thursday, not Tuesday. It begins at 10.15. The ticket is twelve pounds, but students pay nine. Bring an apron; we supply clay. Your surname is Mason?' Caller: 'No, Mayson: M-A-Y-S-O-N.'"
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "Question: Which day is the workshop? Answer: Thursday. Tuesday is explicitly rejected. Question: What does a student pay? Answer: 9, when the form already prints £. The regular twelve-pound fee answers a different question."
      },
      {
        "kind": "p",
        "text": "Why it works: The answers use the final arrangements and the correct customer category. Keeping an extra currency symbol out of a numbered box avoids duplicating the printed unit; always follow that particular form."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not choose the first number automatically, assume every later number is a correction, or copy materials supplied when asked what to bring."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Cover the worked answers. Complete: surname / start time / item to bring. Then check: Mayson / 10.15 / apron. The supplied clay is a distractor for the last gap."
      },
      {
        "kind": "p",
        "text": "Independent practice: Have someone read this new booking once: “The bird walk starts at 8.40, not 8.15; adults pay £14 and students £10. Meet at the east gate.” Write the final time, student fee and meeting point. Check 8.40, 10 and east gate. Reading the visible text alone is transcript practice."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Predict the answer category, follow corrections, and verify the final detail for the person in the question."
      }
    ]
  },
  {
    "id": "band2-listening-maps",
    "title": "Listening: Part 2 Plans, Directions and Matching",
    "subtitle": "Orient a simple plan",
    "xpReward": 60,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Orient a simple plan. Separate current locations from former ones. Match facilities to the speaker’s descriptions."
      },
      {
        "kind": "p",
        "text": "Map and plan tasks require relationships between locations, not a list of facility names. An entrance and a north arrow provide different reference frames. Facing north after entering from the south, your right is east; facing south, your right is west. A speaker may name an old use of a room before explaining its current use. Treat “used to”, “now” and “has moved” as time signals. Matching questions may instead connect facilities with features such as opening hours or intended users. Read whether options can be reused. The schematic below uses the existing table block; it is a teaching plan, not a reproduced IELTS graphic. All associated drills use its written guide description, not audio."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Locate the entrance and north arrow. Trace one move at a time. Label landmarks already supplied. Match the requested present-day facility, then check neighbouring locations rather than relying on one preposition."
      },
      {
        "kind": "p",
        "text": "Original plan description: North is at the top. The south entrance leads into a central hall. The café is west of the hall, the studio east, and the garden north. Guide: 'Turn right after entering, so the studio is on your right. The temporary exhibition used to occupy that room; it now uses the gallery beyond the garden.'"
      },
      {
        "kind": "table",
        "headers": [
          "North ↑",
          "West",
          "Centre",
          "East"
        ],
        "rows": [
          [
            "North row",
            "—",
            "Gallery",
            "—"
          ],
          [
            "Middle-north row",
            "—",
            "Garden",
            "—"
          ],
          [
            "Middle row",
            "Café",
            "Hall",
            "Studio"
          ],
          [
            "South row",
            "—",
            "Entrance ↑",
            "—"
          ]
        ]
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "Entering from the south means facing north. Turning right reaches the studio in the east. The exhibition cannot be the current label there because “used to” marks its previous location. It is now beyond the garden."
      },
      {
        "kind": "p",
        "text": "Why it works: The solution combines orientation, sequence and tense. “Right” is interpreted from the direction of travel, while “east” remains fixed on the plan."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not confuse right with east in every situation. Do not label a current room with its old function or assume that every option must be used."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Cover the description. Which facility lies west of the hall? Check: café. Which lies between the hall and gallery? Check: garden. Explain the reference points before checking the answer."
      },
      {
        "kind": "p",
        "text": "Independent practice: Draw a new plan with an entrance in the north, a hall in the centre and a desk west of it. Describe the desk to someone entering and facing south. Check: it is to their right. Add two facilities and exchange directions with a partner."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Anchor direction to the plan and the traveller; distinguish present locations from earlier arrangements."
      }
    ]
  },
  {
    "id": "band2-listening-form-completion",
    "title": "Listening: Parts 3–4 Opinions, Lectures and Note Completion",
    "subtitle": "Track a speaker’s attitude and qualification",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Track a speaker’s attitude and qualification. Identify lecture structure. Complete notes with evidence from an educational transcript."
      },
      {
        "kind": "p",
        "text": "Part 3 uses an educational conversation; Part 4 uses an academic monologue. In both, the same topic may support different questions: what is proposed, why it is criticised, or what remains uncertain. An endorsement with a limitation is neither complete rejection nor unqualified approval. Academic talks organise definitions, mechanisms, examples and qualifications. Notes should preserve these relationships, not every word. Completion answers must obey the printed word limit; predict the grammatical role of each gap. The visible source here supports transcript analysis. It does not reproduce one-pass audio conditions or establish a listening score."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Before a passage, distinguish opinion questions from factual gaps. During it, record proposal → objection → revision. For a lecture, create short headings such as method, benefit and limitation."
      },
      {
        "kind": "p",
        "text": "Original educational transcript: Tutor: 'How will you investigate evening bus use?' Ada: 'An online survey would be quick.' Ben: 'But it excludes passengers without reliable internet.' Ada: 'Then we should interview people at two stops.' Tutor: 'That gives useful detail, although two stops may not represent the whole route.' Later lecture: 'Counts record frequency; interviews explain motives. Combining methods can reveal why demand changes, but collecting both requires more staff time.'"
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "Question: How does the tutor view interviews at two stops? Answer: useful but limited in coverage. Note completion, ONE WORD: “Interviews explain passengers’ ____.” Answer: motives. The lecturer directly contrasts motives with frequency."
      },
      {
        "kind": "p",
        "text": "Why it works: The attitude answer preserves both parts of the tutor’s judgement. The completion copies the source noun and fits the plural possessive context without adding unsupported wording."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not turn “may not represent” into “definitely invalid”. Do not attribute Ben’s concern to Ada or confuse a method’s benefit with the cost of combining methods."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Identify the objection to the online survey before reading this check: some passengers lack reliable internet. Now complete “Combining methods needs more staff ____.” Check: time. Explain why “frequency” belongs to counts instead."
      },
      {
        "kind": "p",
        "text": "Independent practice: Create notes from this new script: “A temperature sensor gives continuous measurements, whereas interviews reveal how occupants feel. Sensors need calibration, so researchers test them before use.” Check the relationship: measurement / experience / calibration. Have a partner read it once for separate listening rehearsal."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Track ownership and qualification in discussions; organise lecture notes around definitions, reasons and limits."
      }
    ]
  },
  {
    "id": "band2-reading-tfng",
    "title": "Reading: True/False/Not Given and Yes/No/Not Given",
    "subtitle": "Distinguish agreement, contradiction and missing information",
    "xpReward": 60,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Distinguish agreement, contradiction and missing information. Separate factual statements from a writer’s claims. Justify each answer with precise evidence."
      },
      {
        "kind": "p",
        "text": "TRUE/FALSE/NOT GIVEN concerns information in a passage. YES/NO/NOT GIVEN concerns the writer’s views or claims. TRUE or YES requires the complete statement to agree with the source; FALSE or NO requires incompatible information. NOT GIVEN applies when the precise claim cannot be confirmed or contradicted. A change from “some” to “all” is not automatically false: you need evidence that excludes the stronger claim. If a source says only that some designs failed, it may leave open whether all failed. Likewise, a study in one city does not prove that no other city was studied. Underline the subject, comparison, quantity and time before deciding."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Locate the relevant evidence. Compare one claim at a time, including qualifiers. State the missing fact when choosing NOT GIVEN; state the incompatible fact when choosing FALSE or NO."
      },
      {
        "kind": "p",
        "text": "Original fictional study passage: In a pilot at Bellfield College, 40 volunteers received reusable cups. Twelve used them daily; the others used them less often. Researchers recorded usage for six weeks. The report did not compare the cups with disposable ones. The author argues that convenience matters more than publicity when encouraging reuse, but accepts that reminders can help occasional users."
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "“Every volunteer used the cup daily” → FALSE: only twelve of forty did so. “The reusable cups were cheaper than disposable cups” → NOT GIVEN: no cost comparison is supplied. “The author considers publicity more important than convenience” → NO: the writer explicitly ranks convenience higher."
      },
      {
        "kind": "p",
        "text": "Why it works: The first answer uses an explicit counterexample group; the second recognises an absent comparison; the third reverses a stated judgement. None depends on outside environmental knowledge."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not infer cost from frequency, confuse disagreement with missing information, or change YES/NO labels into TRUE/FALSE when the instruction concerns the writer."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Judge “Reminders are completely useless according to the author.” Check: NO, because the author accepts they can help occasional users. Now justify “The study lasted six weeks.” Check: TRUE."
      },
      {
        "kind": "p",
        "text": "Independent practice: Write one supported factual statement, one contradiction and one genuinely unanswerable claim about Bellfield. Exchange them with another learner. A valid NOT GIVEN claim might concern the volunteers’ ages, which the passage never reports."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Agreement needs support, contradiction needs incompatible evidence, and missing information needs an identified gap."
      }
    ]
  },
  {
    "id": "band2-reading-headings",
    "title": "Reading: Headings, Information and Features",
    "subtitle": "Choose a paragraph’s controlling idea",
    "xpReward": 60,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Choose a paragraph’s controlling idea. Locate specific information. Match a person to a claim without confusing these three reading tasks."
      },
      {
        "kind": "p",
        "text": "A heading summarises a paragraph’s main idea, while matching information locates a detail or example. Matching features links a statement to a named person, theory or category. These tasks use different levels of meaning even when they share a passage. A paragraph can mention catalogues to illustrate growth; “A history of printing catalogues” would be too narrow as its heading. Names are useful anchors for features questions, but read the full claim and attribution. Official heading tasks provide more headings than paragraphs; other matching tasks may reuse options when the instruction permits. Our single-choice drill adaptations test these relationships without pretending to reproduce the complete multi-item interface."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Write a short gist for each paragraph. For an information question scan for the requested detail. For a feature question mark the named person and read the claim they actually make."
      },
      {
        "kind": "p",
        "text": "Original reading: [A] Many seed libraries began as informal exchanges between neighbours. As participation increased, volunteers introduced catalogues and collection dates, turning small swaps into organised services. [B] Botanist Mira Cole recommends storing seeds in cool, dry conditions. Researcher Joel Reed instead studies how shared gardens help new residents meet people. [C] Coordinators report that donated seeds sometimes arrive without labels. They now ask donors to record the crop, harvest year and growing conditions."
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "Best heading for A: “From informal swaps to organised services.” It covers the whole development. Information about missing labels occurs in C. Advice on storage belongs to Mira Cole in B; Joel Reed studies social contact, not seed storage."
      },
      {
        "kind": "p",
        "text": "Why it works: The solutions distinguish paragraph purpose from a specific problem and a researcher’s attributed view. Repeated seed vocabulary alone cannot choose between them."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not select a heading that fits one sentence only. Do not assign all claims in a paragraph to the first named person. Reuse an option only when permitted."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Choose between “The social role of shared gardens” and “The chemistry of seed coatings” for Joel Reed’s work. Check: the first, because meeting people is social. Explain why the other topic is unsupported."
      },
      {
        "kind": "p",
        "text": "Independent practice: Create a fourth paragraph about training new coordinators. Write a broad heading, one matching-information question and one named-person claim. Check that each answer uses the intended level of meaning and that a plausible unused heading stays wrong."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Headings ask for gist, information asks where a detail occurs, and features ask who or what matches a claim."
      }
    ]
  },
  {
    "id": "band2-reading-mcq",
    "title": "Reading: Multiple Choice, Inference and Time Management",
    "subtitle": "Choose a supported paraphrase",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Choose a supported paraphrase. Make a bounded inference. Use a time budget without treating it as a compulsory passage split."
      },
      {
        "kind": "p",
        "text": "IELTS Academic Reading contains forty questions in sixty minutes. The texts total approximately 2,150–2,750 words across three sections. A flexible practice budget of about twenty minutes per section can prevent over-investment, but difficult question sets may require adjustment. In multiple choice, identify the exact demand: purpose, detail, inference or main idea. A plausible conclusion is not sufficient; it must follow from the passage. Correct options can repeat source words or paraphrase them, so wording alone is no shortcut. For inference, preserve qualifications such as “suggests”, “small” and “before”. Do not replace a cautious recommendation with certainty."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Read the question stem, locate evidence, and compare every option’s complete meaning. Reject options that reverse, exaggerate or add information. Mark a difficult item for a later return instead of abandoning the rest of the section."
      },
      {
        "kind": "p",
        "text": "Original passage: The city tested quiet delivery vehicles on four streets for a month. Complaints fell on three streets, but rose on the fourth, where night deliveries became more frequent. The report suggests that scheduling matters alongside vehicle noise. Because the trial covered a small area, its authors recommend a larger study before a citywide rule is introduced."
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "Why do the authors recommend more research? Answer: the trial’s limited area weakens a citywide conclusion. The passage does not prove quiet vehicles always work, and the fourth street shows that scheduling can offset noise benefits."
      },
      {
        "kind": "p",
        "text": "Why it works: The selected inference stays close to the stated limitation. It explains the recommendation without inventing a funding problem, accident record or measured causal effect."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not choose an option just because it repeats “quiet”. Do not infer that no complaints occurred. A fall in three streets does not establish a universal rule."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Summarise the passage in one sentence before checking: quiet vehicles may help, but delivery schedules and the small trial limit broad conclusions. Name one unsupported claim: that accidents fell."
      },
      {
        "kind": "p",
        "text": "Independent practice: Read a short article and draft four options for a main-idea question: one supported summary, one exaggerated claim, one reversed claim and one invented detail. Explain each elimination. Then practise a timed passage with a separate checking period."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Use evidence for the entire option; inference extends meaning cautiously rather than adding a new fact."
      }
    ]
  },
  {
    "id": "band2-writing-line-graphs",
    "title": "Writing Task 1: Line Graphs, Bar Charts and Overviews",
    "subtitle": "Select main trends",
    "xpReward": 60,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Select main trends. Write an overview and precise comparisons. Distinguish supported data from invented explanations."
      },
      {
        "kind": "p",
        "text": "Academic Task 1 requires at least 150 words describing supplied visual information; about twenty minutes is recommended within the sixty-minute Writing test. A line graph shows change over time; a bar chart can compare categories or periods. An overview identifies the main patterns without listing every value. Group details to support that overview. Use the unit and coverage exactly: the largest source shown is not necessarily the largest source in the entire country. The full numerical dataset is presented as a table rather than a plotted graph. Practise identifying equivalent line-graph trends from those values; this is data-report preparation, not a claim that a graph image is displayed."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Check title, units and dates. Identify overall direction, leading categories and notable changes in rank. Draft an overview, group supporting values, and check every comparison against the dataset."
      },
      {
        "kind": "p",
        "text": "Original illustrative dataset: Electricity generation in Linden, in GWh. 2000: coal 120, gas 40, solar 5. 2010: coal 100, gas 75, solar 20. 2020: coal 35, gas 90, solar 60. The figures describe these three sources only, not all electricity generation."
      },
      {
        "kind": "table",
        "headers": [
          "Source (GWh)",
          "2000",
          "2010",
          "2020"
        ],
        "rows": [
          [
            "Coal",
            "120",
            "100",
            "35"
          ],
          [
            "Gas",
            "40",
            "75",
            "90"
          ],
          [
            "Solar",
            "5",
            "20",
            "60"
          ]
        ]
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "Original complete model report; not an examiner-rated script:\n\nThe table presents the figures underlying a line graph of electricity generation from coal, gas and solar power in Linden in 2000, 2010 and 2020, measured in gigawatt-hours.\n\nOverall, coal output declined over the period, whereas both gas and solar generation increased. Coal was the largest of the three sources initially, but gas occupied that position by 2020. Solar remained below gas throughout, despite experiencing a substantial increase from a small starting point.\n\nIn 2000, coal generated 120 GWh, three times the amount produced by gas and far above solar's 5 GWh. By 2010, coal output had fallen to 100 GWh. Over the same decade, gas rose to 75 GWh, while solar reached 20 GWh.\n\nThe changes continued in the final decade. Coal dropped to 35 GWh in 2020, less than half the gas figure of 90 GWh. Solar increased to 60 GWh, overtaking coal but remaining 30 GWh below gas. Across the whole period, the absolute increase in solar output was 55 GWh, compared with a rise of 50 GWh for gas."
      },
      {
        "kind": "p",
        "text": "Why it works: The overview includes both direction and changing rank. Body paragraphs supply exact values without explaining causes. “Largest of the three sources” respects the dataset’s limited coverage. No intermediate-year values or trend shapes are invented."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not call sparse values exponential growth, invent an unshown peak, explain a change by government policy, or describe a rise of 55 GWh as 55%."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Compare “Gas became the largest source shown” with “Gas supplied all the city’s electricity.” Choose the first: only three sources are covered. Now identify solar’s absolute rise: 60 minus 5 = 55 GWh."
      },
      {
        "kind": "p",
        "text": "Independent practice: Using the same dataset, write a different 150-word report with one overview and two groups of details. Check all units and tense. Then create a bar-chart version on paper; compare whether changing the visual form changes any numerical conclusions."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "An overview selects patterns; details verify them. Accurate scope and comparison matter more than dramatic adjectives."
      }
    ]
  },
  {
    "id": "band2-writing-bar-pie",
    "title": "Writing Task 1: Tables, Pie Charts and Proportions",
    "subtitle": "Compare distributions across groups",
    "xpReward": 60,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Compare distributions across groups. Calculate percentage-point differences. Avoid inferring headcounts from percentages alone."
      },
      {
        "kind": "p",
        "text": "Pie charts divide a whole; a table or grouped bar chart can compare the same categories across populations. Check that the denominator is consistent before combining figures. If 45% of staff and 10% of students travel by car, the difference is 35 percentage points; it is not 35% of all travellers. Without group sizes, percentages do not establish which group contributes more people. A good overview selects the dominant mode for each group and a meaningful contrast. You can group non-car modes when the categories are mutually exclusive and exhaustive, but explain what the total represents. The table is the actual supplied visual here; no unrendered pie chart is assumed."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Identify what makes 100% in each column. Find the largest and smallest shares. Compare like categories and express differences in percentage points. Use a second paragraph for exceptions or combined groups."
      },
      {
        "kind": "p",
        "text": "Original fictional data: Travel to Northbank College in 2025. Bus:45% of students and 30% of staff. Bicycle:25% of students and 15% of staff. Walking:20% of students and 10% of staff. Car:10% of students and 45% of staff. Each group's shares total 100%; group sizes are not given."
      },
      {
        "kind": "table",
        "headers": [
          "Mode",
          "Students (%)",
          "Staff (%)"
        ],
        "rows": [
          [
            "Bus",
            "45",
            "30"
          ],
          [
            "Bicycle",
            "25",
            "15"
          ],
          [
            "Walking",
            "20",
            "10"
          ],
          [
            "Car",
            "10",
            "45"
          ]
        ]
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "Worked overview and detail excerpt: “Overall, buses accounted for the largest share of student journeys, whereas cars were the most common mode am ong staff. Only 10% of students travelled by car, compared with 45% of staff, a gap of 35 percentage points. Conversely, the student bus share exceeded the staff figure by 15 points.”"
      },
      {
        "kind": "p",
        "text": "Why it works: The response compares shares within clearly named populations and accurately calculates 45−10 and 45−30. It does not claim that more staff than students drove in absolute numbers. This excerpt illustrates selection; it is not a complete 150-word response."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not add student and staff shares as if they shared one denominator. Avoid “the majority” for 45%; it is the largest share but below half."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Calculate the share of students who did not drive. Check:90%. Identify which group had the higher cycling share. Check: students, by 10 percentage points. Explain why neither answer requires group sizes."
      },
      {
        "kind": "p",
        "text": "Independent practice: Write a complete 150-word report using the table. Include an overview, two exact cross-group comparisons and one valid combined category. Check that each percentage still refers to the correct population and that no unsupported headcount appears."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Keep the denominator visible; distinguish the largest share from a majority and percentage points from percent change."
      }
    ]
  },
  {
    "id": "band2-writing-letter",
    "title": "Writing Task 1: Maps and Processes",
    "subtitle": "Describe spatial changes and unchanged features",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Describe spatial changes and unchanged features. Sequence a process accurately. Select active or passive language to match the subject."
      },
      {
        "kind": "p",
        "text": "Maps compare locations or changes; processes describe stages rather than numerical trends. For a map overview, identify the main development and significant retained features. For a process overview, state its start, end and overall transformation; use a cycle only if the final stage actually returns to the first. Academic Task 1 does not ask for a General Training letter. The tables below provide a schematic plan and the full process order. Describe only the supplied changes: replacing a car park does not prove traffic fell."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Map: orient the plan, group changes by area and mention important continuity. Process: identify material and stages, then describe them in order with clear references. Use past forms for completed map changes and present forms for a general process."
      },
      {
        "kind": "p",
        "text": "Original schematic: A park in 2010 had a pond in the north, a lawn in the centre, a car park in the east and an entrance in the south. In 2025 the pond and entrance remained. A playground replaced the central lawn, and bicycle parking replaced the eastern car park. Original process: used paper → sorting → pulping with water → filtering → pressing → drying → new paper."
      },
      {
        "kind": "table",
        "headers": [
          "Position",
          "2010",
          "2025"
        ],
        "rows": [
          [
            "North",
            "Pond",
            "Pond"
          ],
          [
            "Centre",
            "Lawn",
            "Playground"
          ],
          [
            "East",
            "Car park",
            "Bicycle parking"
          ],
          [
            "South",
            "Entrance",
            "Entrance"
          ]
        ]
      },
      {
        "kind": "table",
        "headers": [
          "Stage",
          "Material or action"
        ],
        "rows": [
          [
            "1",
            "Collect used paper"
          ],
          [
            "2",
            "Sort"
          ],
          [
            "3",
            "Pulp with water"
          ],
          [
            "4",
            "Filter"
          ],
          [
            "5",
            "Press"
          ],
          [
            "6",
            "Dry"
          ],
          [
            "7",
            "New paper"
          ]
        ]
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "Map excerpt: “Overall, the park gained recreational and cycling facilities while retaining its pond and southern entrance. The central lawn was replaced by a playground, and the eastern car park became bicycle parking.” Process excerpt: “After the used paper is sorted, it is mixed with water to form pulp. The mixture is then filtered, pressed and dried to produce new paper.”"
      },
      {
        "kind": "p",
        "text": "Why it works: The map summary includes change and continuity without inventing size. The process summary preserves all supplied stages and uses passive forms when the material is the focus. These are worked excerpts, not complete 150-word reports."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not write an opinion letter, invent benefits, describe an unshown temperature, or use “finally” before intermediate stages. “Was replaced by” reverses meaning if the old and new facilities swap places."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Explain “A playground was replaced by a lawn” using the 2010→2025 plan. Check: it states the reverse of the actual change. Now name the stage between pulping and pressing. Check: filtering."
      },
      {
        "kind": "p",
        "text": "Independent practice: Choose either the plan or process and write at least 150 words on paper. Use an overview and accurate detail grouping. For the process, avoid inventing machines or timings; for the map, retain east/north/south consistently."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Maps organise space and change; processes organise stages. Both need an overview grounded in the actual visual information."
      }
    ]
  },
  {
    "id": "band2-writing-opinion",
    "title": "Writing Task 2: Opinion and Discussion Essays",
    "subtitle": "Identify the exact essay demand",
    "xpReward": 60,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Identify the exact essay demand. Develop a position with reasons and examples. Address both views when explicitly asked."
      },
      {
        "kind": "p",
        "text": "Task 2 requires at least 250 words and carries twice the weight of Task 1. About forty minutes is recommended. An agree/disagree prompt asks for a supported position; a discussion prompt can additionally require both views and your opinion. Do not force every question into a memorised four-paragraph template. Plan claims that answer this exact topic, then explain their mechanism and illustrate them. Examples can be plausible situations or personal experience; invented survey statistics and fake research citations are unnecessary. A nuanced position is useful when it is clear and sustained, not when it obscures your answer. Models below are original teaching examples with no certified band rating."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Underline each instruction. Write a one-sentence position and two or three reasons. For each body paragraph, connect claim → why/how → example → relevance to the position. Reserve time to check coverage and grammar."
      },
      {
        "kind": "p",
        "text": "Original Task 2 prompt: Some people think universities should require every student to complete a community project. Others believe students should choose whether to participate. Discuss both views and give your own opinion."
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "Complete original model essay:\n\nUniversities often encourage students to work with local organisations. Whether this activity should be compulsory is more controversial. Although a required project could introduce many students to valuable experiences, I believe participation should normally remain voluntary, with universities making it easier for students to take part.\n\nSupporters of compulsory projects argue that education should develop social responsibility as well as subject knowledge. Some students may never consider volunteering until it appears in their timetable. Working with a neighbourhood group can show them how their skills help others. For example, engineering students who improve access to a community building can apply classroom knowledge to a practical problem. A requirement may also distribute these opportunities more evenly instead of limiting them to students who already have useful contacts.\n\nHowever, a universal obligation can create difficulties for students with demanding circumstances. Someone who works evenings to pay rent or cares for a relative may struggle to attend a fixed project session. If participation becomes another condition for graduating, the policy could penalise these students even when they contribute to their communities in other ways. Requiring attendance also does not guarantee thoughtful engagement; some participants may focus only on completing their hours.\n\nA more effective approach would combine strong encouragement with flexible opportunities. Universities could offer short projects, remote tasks and optional academic credit. Advisers could help students choose work connected to their interests while recognising responsibilities outside campus. This would preserve meaningful choice without treating community activity as unimportant.\n\nIn conclusion, compulsory service has a reasonable educational purpose, but its costs are unevenly distributed. Accessible voluntary projects are more likely to produce engaged participation while respecting students' different situations."
      },
      {
        "kind": "p",
        "text": "Why it works: Both views receive a reasoned discussion. The position favours voluntary participation and remains consistent through the recommendation. The example explains a mechanism without pretending to report real research. Sentence complexity follows meaning rather than a quota of advanced forms."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not discuss only the benefits of volunteering when the question concerns compulsion. Do not hide the opinion until the last line or substitute ornate synonyms for precise reasoning."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Find the concession in the first paragraph and the main objection in the third. Check: required projects may introduce valuable experience; a universal obligation can burden students with work or caring responsibilities."
      },
      {
        "kind": "p",
        "text": "Independent practice: Write a 250-word agree/disagree response to: “Universities should reserve one day each week for independent study.” Choose your own position, develop two reasons and assess one limitation. Ask a reader to underline where each paragraph answers the prompt."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Answer the instructions, maintain a position and develop reasons; no particular template or word choice guarantees a band."
      }
    ]
  },
  {
    "id": "band2-writing-problem-solution",
    "title": "Writing Task 2: Problems, Trade-offs and Two-Part Questions",
    "subtitle": "Plan causes and solutions that match",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Plan causes and solutions that match. Weigh advantages against disadvantages. Answer both parts of a two-part question."
      },
      {
        "kind": "p",
        "text": "Question types are practical planning aids, not official scoring categories. Read the instruction instead of applying a memorised essay to a familiar topic. A causes/solutions response must explain plausible mechanisms and connect proposed measures to them. An “outweigh” question requires evaluation, not equal-length lists. Consider scale, who is affected, and whether a drawback can be reduced. A two-part question can ask for an explanation plus a judgement, so each demand needs development. In Task 2 you may draw on your knowledge and experience, but distinguish a hypothetical example from a factual research claim."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Make a two-column plan using the actual demands. Link every solution to a cause. For evaluation, decide which consideration carries more weight and explain why. Check that the conclusion answers all questions."
      },
      {
        "kind": "p",
        "text": "Original prompts: [A] Many city residents struggle with expensive housing. What causes this problem, and what solutions could reduce it? [B] More employees work from home. Do the advantages outweigh the disadvantages? [C] Some museums offer free entry. Why do they do this, and is this a positive development?"
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "Worked plan for A: Cause—limited housing supply near major employment centres. Mechanism—many households compete for few suitable homes. Solution—permit and support additional homes near transport, while considering infrastructure. Qualification—construction takes time, so short-term help may still be needed. Worked judgement for B: flexibility can outweigh isolation when teams deliberately organise collaboration; the benefit is conditional rather than universal."
      },
      {
        "kind": "p",
        "text": "Why it works: The housing proposal addresses the identified supply constraint instead of changing the subject. The remote-work judgement actually compares significance and adds conditions rather than simply naming one benefit and one drawback."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not offer a solution unrelated to the cause, discuss advantages without weighing them, or answer only “why” when a separate evaluation is requested."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "For C, write the two headings your plan needs. Check: reasons for free entry; evaluation of whether the policy is positive. Add one access benefit and one funding concern, then explain your judgement."
      },
      {
        "kind": "p",
        "text": "Independent practice: Choose one prompt and write a 250-word essay. Before checking language, label each paragraph with the exact demand it answers. Revise any paragraph that lists ideas without explaining how they lead to an outcome."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Coverage and development depend on the question: explain mechanisms, link solutions and make an explicit evaluation where requested."
      }
    ]
  },
  {
    "id": "band2-writing-cohesion",
    "title": "Writing: Assessment Criteria, Coherence and Cohesion",
    "subtitle": "Apply the four Writing criteria",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Apply the four Writing criteria. Follow a paragraph’s logical progression. Use reference and connectors accurately without a fixed quota."
      },
      {
        "kind": "p",
        "text": "IELTS Writing uses task achievement for Task 1 or task response for Task 2, coherence and cohesion, lexical resource, and grammatical range and accuracy. Each criterion evaluates the actual response. No word-count formula or collection of connectors establishes a band. Coherence concerns logical organisation and progression; cohesion includes pronouns, reference, conjunctions and lexical connections. A connector must express the relationship that exists. “However” contrasts, while “therefore” signals a result. There is no official requirement that linking words make up 25% of cohesive devices or that each paragraph contain a fixed number. Clear reference often makes a paragraph smoother than adding more signposts."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Identify the paragraph’s main point. Check how each sentence develops it. Circle reference words and name their referents. Then inspect connector meanings before checking vocabulary and grammar."
      },
      {
        "kind": "p",
        "text": "Original draft: “Many students live far from campus. This travel reduces time for study. However, a reliable bus service can shorten the journey. This improvement may therefore help students attend early classes.”"
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "“This travel” refers to living far from campus and commuting. “However” introduces an improvement to the problem, while “This improvement” refers to the shorter journey. “Therefore” links that improvement to a possible attendance benefit. Replacing it with “nevertheless” would introduce a contrast that the argument does not supply."
      },
      {
        "kind": "p",
        "text": "Why it works: The analysis follows real relationships rather than counting connectors. The modal “may” keeps the attendance outcome appropriately cautious. The passage develops one point from problem through intervention to possible effect."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Avoid empty signposts such as “Furthermore” before a contradictory point, vague “this” with two possible referents, and long synonym chains that change meaning."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Revise “Buses are unreliable. Furthermore, students arrive late” using a result relationship. Check one possible version: “Buses are unreliable, so students may arrive late.” Explain why “may” is more cautious than a universal claim."
      },
      {
        "kind": "p",
        "text": "Independent practice: Take a paragraph from your own essay. Write a plain-language label for each sentence’s role, then revise unclear references and unnecessary connectors. Review all four criteria separately; a well-linked paragraph can still fail to answer the question."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Logical progression and clear reference create cohesion. Criteria guide revision; they do not supply an automatic band."
      }
    ]
  },
  {
    "id": "band2-speaking-cue-card",
    "title": "Speaking: Part 1 Answers and Part 2 Cue-Card Planning",
    "subtitle": "Extend a familiar-topic answer naturally",
    "xpReward": 60,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Extend a familiar-topic answer naturally. Prepare brief notes for a long turn. Develop a relevant example without memorising a script."
      },
      {
        "kind": "p",
        "text": "The Speaking test has three parts and lasts 11–14 minutes. Part 1 asks about familiar experiences. Part 2 gives one minute to prepare a talk lasting up to two minutes, with a prompt card and a final explanatory demand. A concise Part 1 answer usually benefits from a relevant reason or example; there is no fixed sentence count. For Part 2, brief notes help sustain development but should not become a written speech. Speak about a plausible experience you can explain; sophisticated facts are unnecessary. The existing drills analyse planning choices only. Record and listen to your own speech outside this interface to review delivery; selecting an answer here does not assess fluency or pronunciation."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Part 1: answer directly and add one relevant detail. Part 2: make notes for setting, event, example and significance. Practise connecting them in a clear sequence, then adapt rather than reciting the same words."
      },
      {
        "kind": "p",
        "text": "Original Speaking prompts: Part 1—What do you enjoy about the place where you live? Part 2—Describe a place where you learned something useful. Say where it was, what you learned, who helped you, and explain why the experience mattered."
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "Part 1 model: “I like the small park near my flat because I can walk there after work. It is quiet in the evenings, so it helps me unwind.” Part 2 plan: community workshop / repair a bicycle brake / neighbour showed cable adjustment / used skill on later journeys. Opening: “I learned a useful repair at a neighbourhood workshop last spring. I had never adjusted a brake before, so the practical demonstration made a real difference.”"
      },
      {
        "kind": "p",
        "text": "Why it works: The familiar answer gives a clear preference and reason. The long-turn notes contain a specific event and its significance, so the speaker can develop an experience rather than list unrelated adjectives. The opening is an excerpt, not a timed full performance."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not spend the minute writing complete sentences, answer a different cue card with a memorised story, or claim a written model proves an accent or band."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Add a concrete difficulty and its resolution to the workshop plan. Check one possible sequence: the brake rubbed against the wheel; the neighbour demonstrated centring it; later the learner adjusted it independently."
      },
      {
        "kind": "p",
        "text": "Independent practice: Choose a different useful-learning experience. Prepare for one minute, then speak for up to two minutes and record it externally. Review relevance, idea order and pauses. Repeat with new wording and compare clarity rather than trying to imitate a model accent."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Use specific relevant details and a flexible plan; spoken performance must be reviewed from actual speech."
      }
    ]
  },
  {
    "id": "band2-speaking-describe",
    "title": "Speaking: Part 2 Description, Fluency and Pronunciation",
    "subtitle": "Develop description through a specific experience",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Develop description through a specific experience. Organise speech into meaningful chunks. Review intelligibility and self-repair from an actual recording."
      },
      {
        "kind": "p",
        "text": "Useful description includes setting, actions and significance, not just a string of decorative adjectives. Fluency concerns continuity and manageable hesitation; speaking very fast is not the goal. Pronunciation concerns intelligibility, including sounds, word stress, rhythm and intonation. A transcript can illustrate grammatical and lexical choices but cannot establish how they were pronounced. Practise thought groups at natural meaning boundaries. Stress the words that carry the intended contrast, while keeping unstressed words audible. Different English accents can be intelligible; copying one accent is not an assessment requirement. Use an external recorder to review actual speech alongside these text-based planning drills."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Make a short event sequence, speak once, then listen for unclear chunks. Choose one repair target—such as a missing ending or excessive mid-phrase pauses—and repeat with a fresh example."
      },
      {
        "kind": "p",
        "text": "Original practice response: “The old library is a place I remember clearly. Although it was small, the reading room felt spacious because the windows faced a garden. I went there when I was preparing for an exam. The librarian helped me find a quiet desk, and I gradually learned to work without checking my phone.”"
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "Possible thought groups: “Although it was SMALL / the reading room felt SPACIOUS / because the windows faced a GARDEN.” Capitals indicate possible emphasis, not shouting. The speaker can add: “That contrast made the room feel less crowded than I expected.” This develops why a physical detail mattered."
      },
      {
        "kind": "p",
        "text": "Why it works: The concessive clause compares expectations with experience. The explanation connects description to a personal reaction. Chunking follows meaning, and its success can only be checked by listening to delivery, not by looking at capitals."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not replace every common adjective with a rare synonym. Avoid correcting every tiny slip at the cost of losing the message. A brief repair such as “last year—actually, two years ago” can clarify meaning."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Identify the action that gives the response a story. Check: preparing for an exam and learning to work without checking a phone. Now say the first two sentences with two different stress patterns and listen to the effect."
      },
      {
        "kind": "p",
        "text": "Independent practice: Record a 90–120 second description of a person or place. Include one event, one contrast and why it matters. Listen for intelligible word endings, natural grouping and whether the story develops. Ask another person what they understood before changing vocabulary."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Concrete events support fluency and description; pronunciation requires speech evidence, not a written transcript."
      }
    ]
  },
  {
    "id": "band2-speaking-integrated",
    "title": "Speaking: Part 3 Reasons, Examples and Qualified Judgements",
    "subtitle": "Extend an abstract answer with reasoning",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Extend an abstract answer with reasoning. Compare alternatives fairly. Qualify a generalisation without losing a clear position."
      },
      {
        "kind": "p",
        "text": "Part 3 develops broader issues connected with the long-turn topic. It asks for explanations, comparisons, evaluations and possible future developments. Answer the question first, then develop a reason and example. Move beyond your personal story when the question concerns society, but do not pretend to have specialist statistics. A qualification should clarify the conditions in which your point applies. “It depends” needs an explanation of what it depends on. The text exercises test reasoning and relevance; speaking quality needs actual oral rehearsal."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Use a direct claim, explain its mechanism, offer a relevant example and add a useful limit. For comparison, choose a shared dimension such as access, cost or convenience rather than discussing unrelated benefits."
      },
      {
        "kind": "p",
        "text": "Original Part 3 question: Why might local libraries still be useful when so much information is online? Model: “They can provide a reliable place to study, especially for people whose homes are crowded. For example, a student sharing a small flat may need somewhere quiet in the evening. Online resources are valuable, but they do not replace that physical space. The importance of libraries may therefore vary with local housing and access to other facilities.”"
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "Worked response is the library model above. Its claim is a physical study benefit. Crowded housing explains the need; a shared flat illustrates it. The final sentence qualifies the generalisation according to local conditions instead of claiming libraries are equally essential everywhere."
      },
      {
        "kind": "p",
        "text": "Why it works: The answer directly addresses continued usefulness despite online information. The contrast respects online resources while identifying a function they cannot fully replace. Each detail develops the same line of reasoning."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Avoid listing three vague benefits with no explanation, inventing national statistics, or giving a personal story without linking it to the broader issue."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Answer “Could online services replace every library?” with a claim and one limiting condition. Check one possible answer: some information services can move online, but physical study space remains important where alternative space is limited."
      },
      {
        "kind": "p",
        "text": "Independent practice: Record answers to: “How should a city decide where to build a library?” and “Might their role change in future?” Use different examples for each. Review whether your reasons answer the actual question and whether predictions are appropriately qualified."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Extend an answer through a relevant mechanism and example; a clear qualification improves precision rather than avoiding a position."
      }
    ]
  },
  {
    "id": "band2-grammar-tenses",
    "title": "Grammar for Writing: Time Reference and Accurate Tenses",
    "subtitle": "Distinguish the chart’s present description from past data",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Distinguish the chart’s present description from past data. Label projections. Avoid inventing a future trend or inappropriate present perfect."
      },
      {
        "kind": "p",
        "text": "Tense should reflect the information, not a rule that every academic sentence needs the same form. “The chart shows” describes the visual now; “visits fell” describes completed periods. A future projection is reported as projected or expected rather than as an established fact. Use present perfect for a past-to-present period only when the period genuinely reaches the relevant present; a finished year such as 2020 normally requires past simple. Processes often use present simple because they describe a general sequence. These grammatical choices support accurate Academic Task 1 reporting rather than replacing the reporting task with unrelated tense puzzles."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Mark each date as observed past, current description or projected future. Choose a verb form for that time relationship. Recheck whether the source actually supports the trend beyond the supplied dates."
      },
      {
        "kind": "p",
        "text": "Original Task 1 data: In 2015 museum visits totalled 80,000; in 2020 they totalled 60,000. A 2025 plan projected 90,000 visits by 2030. The projection is an estimate, not an observed 2030 result."
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "“The table shows that visits fell from 80,000 in 2015 to 60,000 in 2020. They were projected in the 2025 plan to reach 90,000 by 2030.” The first “shows” describes the table; “fell” reports observations; “were projected” identifies the forecast and its source date."
      },
      {
        "kind": "p",
        "text": "Why it works: The wording does not treat 2030 as completed observation or continue the declining historical trend automatically. It separates the act of presenting the data from the time the data describes."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Avoid “have fallen in 2020” for a completed dated period, “will certainly reach” for an estimate, and a future prediction that the task never supplies."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Correct “Visits have decreased from 80,000 in 2015 to 60,000 in 2020.” Check: “Visits decreased...” in this completed interval. Now rewrite “Visits reached 90,000 in 2030” as a projection."
      },
      {
        "kind": "p",
        "text": "Independent practice: Write a short Task 1 paragraph comparing two observed years and a forecast. Underline each finite verb and annotate its time reference. Remove any forecast not actually present in the dataset. Review whether each numerical statement remains accurate."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Time reference controls tense; identify forecasts explicitly and avoid turning a model trend into an observed fact."
      }
    ]
  },
  {
    "id": "band2-grammar-complex",
    "title": "Grammar for Writing: Clauses, Contrast and Control",
    "subtitle": "Connect a reason, concession and condition accurately",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Connect a reason, concession and condition accurately. Avoid fragments and double conjunctions. Use complexity to express the argument clearly."
      },
      {
        "kind": "p",
        "text": "Grammatical range and accuracy concerns appropriate variety and control, not a requirement to insert one example of every clause type. A complex sentence combines a main clause with subordinate material. “Because” gives a reason, “although” introduces a concession, and “if” identifies a condition. Choose the relationship before the grammar. Relative clauses identify or add information about a noun; keep the referent clear. A long sentence is not automatically advanced, and several clear sentences can communicate a developed idea more effectively. In essay practice, grammar should preserve the point and its qualification rather than produce a disconnected display of forms."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Write the basic claim. Choose the needed logical relationship. Check that a complete main clause remains, then inspect agreement, punctuation and pronoun reference. Read the sentence for meaning before adding length."
      },
      {
        "kind": "p",
        "text": "Original Task 2 idea: Evening classes can widen access to education. Some adults cannot attend daytime sessions because they work. Flexible schedules help only when transport and childcare arrangements also make attendance possible."
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "“Although evening classes widen access, some adults still need childcare in order to attend.” The concession accepts a benefit but limits its reach. “Adults who work during the day may benefit from evening sessions” uses an identifying relative clause. “Because they work during the day” alone is a fragment in this context; it needs a main clause."
      },
      {
        "kind": "p",
        "text": "Why it works: The structures express distinctions already present in the argument. They do not claim that evening classes solve every access problem. The relative clause clearly modifies adults, and the main-clause verbs remain complete."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Avoid “Although..., but...” when linking the same two clauses, fragments after “because”, or an unclear “which” that could refer to several earlier ideas."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Combine “Classes are available. Some parents cannot attend” with a concession. Check: “Although classes are available, some parents cannot attend.” Add a reason only if it is supported by the scenario."
      },
      {
        "kind": "p",
        "text": "Independent practice: Write a developed paragraph about access to education using a reason and a relevant condition. Then shorten one overloaded sentence. Check whether grammar clarifies your position and whether each dependent clause has a complete main clause."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Choose the relationship first, then a controlled structure; grammatical complexity is useful when it makes reasoning precise."
      }
    ]
  },
  {
    "id": "band2-vocab-awl2",
    "title": "Reading and Vocabulary: Paraphrase, Summary and Sentence Completion",
    "subtitle": "Preserve meaning when paraphrasing",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Preserve meaning when paraphrasing. Complete a summary using exact source words. Check grammar and word limits rather than guessing synonyms."
      },
      {
        "kind": "p",
        "text": "Reading questions often express a source idea differently, but a paraphrase must preserve agency, time, quantity and certainty. “Heat loss decreased” does not mean the building generated heat. In completion tasks, distinguish an instruction to copy words from the passage from a task that supplies an option list. Copying tasks require exact source words within the stated limit; a reasonable synonym can still violate the instruction. Summary information may be concentrated in one section and is not guaranteed to follow the entire passage’s order. Use the summary’s meaning and grammar to locate the right evidence. Sentence completion often follows source order, but still check the specific item."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Predict the gap’s grammatical role, locate the evidence and transfer only the required source words. Check whether the sentence already supplies a preposition, article or unit. For paraphrase, compare the whole proposition."
      },
      {
        "kind": "p",
        "text": "Original passage: The first trial measured heat loss through glass. The researchers then installed removable shutters and repeated the measurements under the same indoor temperature. Heat loss decreased, but the study did not estimate the cost of fitting shutters to other buildings."
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "Complete with NO MORE THAN TWO WORDS from the passage: “After installing ____ , researchers repeated measurements.” Answer: removable shutters. Sentence completion, ONE WORD: “The study did not estimate the ____ of fitting shutters elsewhere.” Answer: cost. Paraphrase: “Less heat escaped after shutters were installed.”"
      },
      {
        "kind": "p",
        "text": "Why it works: The transferred phrases appear verbatim and fit the limits. The paraphrase restates reduced loss without claiming all heat was retained or any installation saving was measured."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Avoid adding “the removable shutters” when the limit is two words, substituting “price” in a copy-from-text task, or assuming that decreased heat loss proves lower total installation costs."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Identify the controlled condition in the second sentence. Check: the same indoor temperature. Explain how that condition helps comparison without claiming it proves every possible causal factor was controlled."
      },
      {
        "kind": "p",
        "text": "Independent practice: Create a three-gap summary from a new paragraph. State a word limit for each gap and check every answer is copied exactly. Separately write a paraphrase that preserves the original uncertainty and comparison."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Paraphrase meaning accurately; copy source words when the task asks for them, and let grammar check rather than invent the answer."
      }
    ]
  },
  {
    "id": "band2-vocab-collocations",
    "title": "Writing Vocabulary: Precise Comparisons and Collocations",
    "subtitle": "Choose accurate trend language",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Choose accurate trend language. Distinguish “by” from “to”. Use natural collocations without exaggeration."
      },
      {
        "kind": "p",
        "text": "Lexical resource rewards appropriate range and accurate meaning. A phrase such as “a rise in attendance” changes form in “attendance rose”; do not combine the noun article with the verb structure. “By” reports the size of a change and “to” reports its endpoint. “From” provides a starting value. The adjective describing a change should suit its magnitude and time span. There is no statistical significance in a chart unless the source establishes it; “significant” can be ambiguous in data reports. Prefer an exact number when a dramatic adjective would exaggerate. Collocations belong to meaningful comparisons, not a list of impressive phrases."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Calculate the change, identify whether you mean amount or endpoint, and choose a noun or verb structure. Check the unit and compare the final value with the correct baseline."
      },
      {
        "kind": "p",
        "text": "Original data: Attendance rose from 200 in 2022 to 260 in 2023, then fell to 250 in 2024. The initial increase was 60 people; the final total remained 50 above the starting value."
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "“Attendance rose by 60 to 260 in 2023, before falling slightly to 250 in 2024.” Alternative noun form: “There was an increase of 60 in attendance in 2023.” A separate comparison is “The 2024 figure was 50 higher than in 2022.”"
      },
      {
        "kind": "p",
        "text": "Why it works: The increase and endpoint remain distinct. “Before” sequences two changes, while the final comparison correctly uses 2022 rather than 2023 as its baseline. The noun and verb constructions are both grammatical without mixing their forms."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not write “rose by 260” for the endpoint, “a rose in attendance”, or “doubled” when the value increases from 200 to 260. Avoid calling a small one-year fall a collapse."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Rewrite “Attendance experienced a rise to 60” to mean an increase of 60 ending at 260. Check: “Attendance rose by 60 to 260.” Explain why both prepositions serve different roles."
      },
      {
        "kind": "p",
        "text": "Independent practice: Write three descriptions of a different dataset: one verb-based change, one noun-based change and one final-versus-initial comparison. Calculate each difference and delete any adjective stronger than the evidence supports."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Precise units, baselines and collocations communicate more than exaggerated trend language."
      }
    ]
  },
  {
    "id": "band2-vocab-environment",
    "title": "Listening: Academic Talks, Cause and Note Completion",
    "subtitle": "Distinguish a mechanism from an example",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Distinguish a mechanism from an example. Complete lecture notes accurately. Preserve limitations in an academic explanation."
      },
      {
        "kind": "p",
        "text": "A lecture can explain two mechanisms and then qualify where they work. Mark the relation between a process and its effect. “Through shade and evaporation” introduces categories; later sentences explain each. A limitation such as root space does not refute every cooling effect, but it restricts practical use. For note completion, the surrounding grammar can tell you whether to listen for a process, noun or condition. Do not take so many notes that you miss the next relationship. This original visible script supports transcript study and optional partner-read rehearsal; these visible text questions do not assess listening."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Preview headings for mechanisms and limits. Record arrows for cause/effect. After each gap, resume following the explanation. Check exact source words and whether the answer needs one or two words."
      },
      {
        "kind": "p",
        "text": "Original Part 4-style transcript study: 'Urban trees can cool streets through shade and evaporation. Shade reduces direct sunlight reaching pavements. Evaporation transfers water from leaves into the air and uses energy. However, young trees need watering, and narrow streets may not have enough root space. Cooling therefore depends partly on species, maturity and local design.'"
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "Notes: mechanisms—shade and evaporation; energy used in evaporation; practical constraint—root space. ONE WORD gap: “Shade reduces direct ____ reaching pavements.” Answer: sunlight. TWO WORDS gap: “Narrow streets may lack ____.” Answer: root space."
      },
      {
        "kind": "p",
        "text": "Why it works: The notes separate mechanisms from conditions of implementation. The completions use source wording and fit the limits. They do not imply that every tree creates identical cooling or that watering itself is the cooling mechanism."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not replace evaporation with precipitation, omit the condition on young trees, or conclude that narrow streets can never contain trees when the script says “may not”."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Create a cause chain for evaporation. Check: water leaves the foliage → energy is used → cooling can occur. Identify two conditions that qualify the broad effect: species and maturity are examples stated in the source."
      },
      {
        "kind": "p",
        "text": "Independent practice: Ask a partner to read a new short explanation once while you cover it. Organise notes into process, effect and limitation. Compare the result with the written source, then identify which errors came from sound recognition and which from misunderstanding a relationship."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Lecture notes should preserve mechanisms and qualifications, not just isolated topic words."
      }
    ]
  },
  {
    "id": "band2-vocab-technology",
    "title": "Writing: Two-Part Questions and Technology Arguments",
    "subtitle": "Answer explanation and recommendation demands",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Answer explanation and recommendation demands. Use precise technology vocabulary. Develop an inclusion argument without unsupported absolutes."
      },
      {
        "kind": "p",
        "text": "Topic vocabulary is useful only when it serves the task. “Digital divide” concerns unequal access or ability to use digital resources; it is more precise than saying technology is simply good or bad. For this two-part question, the first demand asks why services are changing, while the second asks how to reduce exclusion. A coherent answer can connect administrative convenience with access safeguards. Do not drift into a general essay about artificial intelligence or claim all older people lack digital skills. Explain which users face which barrier. The claims below are hypothetical reasoning examples, not an account of a real government study."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Identify the two demands. Plan one causal explanation and one targeted response. Give a concrete scenario for each, then check that your proposal addresses the barrier rather than merely praising innovation."
      },
      {
        "kind": "p",
        "text": "Original two-part Task 2 prompt: Digital services are increasingly used for public appointments. Why is this happening, and what can be done to avoid excluding people who struggle to use them?"
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "Worked paragraph: “Online booking can reduce routine administrative work because users enter their own details and choose available slots. Yet this convenience may exclude someone with unreliable internet. A telephone option and assisted booking at local centres would preserve access without preventing other users from booking online.”"
      },
      {
        "kind": "p",
        "text": "Why it works: The paragraph explains a mechanism for adoption, identifies a specific access barrier and proposes alternatives that target that barrier. It neither assumes universal internet access nor abandons digital services entirely. It is a paragraph model, not a full 250-word essay."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Avoid “technology solves every problem”, equating lack of access with lack of intelligence, or answering only the adoption question and ignoring exclusion."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Add a response for someone who has internet but struggles to navigate the form. Check one plausible measure: a clearly labelled assisted-booking service or an accessible form. Explain why providing internet alone might not solve that particular barrier."
      },
      {
        "kind": "p",
        "text": "Independent practice: Write a complete 250-word answer. Include one adoption mechanism and two differentiated barriers, each linked to a feasible response. Review whether technology terms are defined by context and whether examples are clearly illustrative."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Use topic vocabulary to explain a mechanism and answer every demand; practical safeguards should match the actual barrier."
      }
    ]
  },
  {
    "id": "band2-mistakes-prepositions",
    "title": "Grammar and Editing: Prepositions, Rates and Evidence",
    "subtitle": "Use prepositions for a baseline, endpoint and change",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Use prepositions for a baseline, endpoint and change. Distinguish rates from numbers. Avoid marking acceptable expressions as errors."
      },
      {
        "kind": "p",
        "text": "Accuracy depends on meaning and context, not a list of absolute bans. “According to the study’s results” is grammatical; possessive results does not create a prohibited double possessive. “Research on” is a common collocation, while “research about” can also be grammatical. Focus editing on genuine errors or unintended meaning. In data reporting, “from 30% to 45%” gives endpoints, “by 15 percentage points” gives the difference, and “a 50% relative increase” compares that difference with the initial 30%. A rate and a number are different measurements even when both rise. Limit conclusions to the population and period supplied."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Name the measure and baseline first. Choose from/to for endpoints and by for a calculated change. Then check whether a suggested correction fixes grammar, changes meaning or merely reflects style preference."
      },
      {
        "kind": "p",
        "text": "Original Task 1 data: The participation rate rose from 30% to 45% between 2010 and 2020. The number of participants rose from 600 to 900. The survey concerned a training programme, not all residents."
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "“The participation rate increased by 15 percentage points, from 30% to 45%.” “The number of participants increased by 300, from 600 to 900.” Both relative changes are 50%, but they describe different measures. “According to the programme’s results, participation increased” is a grammatical attribution."
      },
      {
        "kind": "p",
        "text": "Why it works: The calculations preserve units and denominators:15÷30=0.5 and 300÷600=0.5. The scope remains the programme. Correct editing distinguishes these measurable errors from expressions that are simply alternative wording."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not call a 15-point rise a 15% relative rise, confuse 900 people with 900%, or “correct” a grammatical phrase on the basis of an invented ban."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Check “Participation rose to 15 percentage points.” Explain the problem before revising:15 points is a change, not the final 45% rate. A correct version is “The rate rose by 15 percentage points to 45%.”"
      },
      {
        "kind": "p",
        "text": "Independent practice: Annotate a paragraph with measure, unit, baseline and comparison. Verify all arithmetic. Then justify each language correction: if it only makes wording more concise, label it a style suggestion instead of a grammatical error."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Edit for real grammatical and numerical meaning; distinguish changes, endpoints and acceptable alternatives."
      }
    ]
  },
  {
    "id": "band2-mistakes-countable",
    "title": "Grammar and Vocabulary: Countability in Academic Reporting",
    "subtitle": "Use countable and uncountable nouns accurately",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Use countable and uncountable nouns accurately. Choose quantifiers by grammatical meaning. Make precise references to studies, equipment and advice."
      },
      {
        "kind": "p",
        "text": "In ordinary academic reporting, equipment, information, evidence and advice are commonly uncountable. Do not add a plural-s merely because several items or facts are involved. Count the unit instead: three pieces of equipment, two studies, several suggestions. “Research” usually names an activity, while “a study” names a countable investigation. Some nouns have specialised countable senses in particular disciplines, so avoid presenting a useful common rule as a universal ban across every context. In standard edited reporting use fewer for countable items and less for an uncountable amount. Agreement follows the head noun, not an adjacent plural phrase."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Identify the head noun and its intended sense. Choose a unit where necessary. Check article, quantifier and verb agreement together; then decide whether a more specific noun would improve clarity."
      },
      {
        "kind": "p",
        "text": "Original programme notes: The team bought three microscopes and several chairs. The equipment arrived on Monday. Researchers collected information from 120 participants and conducted two studies. An adviser offered three practical suggestions about recruitment."
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "“The equipment was delivered on Monday” uses singular agreement with uncountable equipment. “Three microscopes were delivered” uses plural agreement with a countable head. “Two studies provided useful information” distinguishes investigations from what they produced."
      },
      {
        "kind": "p",
        "text": "Why it works: The number of physical objects does not make “equipment” plural in this sense. Choosing the precise countable term permits an exact quantity without inventing “equipments” or “informations”."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Avoid “many informations”, “an advice” and “the equipment were”. Do not replace “studies” with uncountable “research” while keeping a plural verb and a numerical count."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Rewrite “The adviser gave three advices.” Check: “The adviser gave three pieces of advice” or “three suggestions.” Explain why both preserve the intended quantity with a grammatical countable unit."
      },
      {
        "kind": "p",
        "text": "Independent practice: Write a short methods description using equipment, three named items, two studies and some evidence. Underline the head nouns and check quantifiers and agreement. Use a dictionary to verify any specialised countable sense you wish to use."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Count the item or unit, and let the head noun determine article, quantifier and agreement."
      }
    ]
  },
  {
    "id": "band2-practice-reading",
    "title": "Reading: Evidence-Based Mixed-Question Practice",
    "subtitle": "Apply judgement, completion and matching strategies to one passage",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Apply judgement, completion and matching strategies to one passage. Record evidence for every answer. Review errors without converting a short set into an IELTS band."
      },
      {
        "kind": "p",
        "text": "This original short passage brings together the reading skills taught in the course. It is a limited practice set, not a full IELTS Reading section: the real Academic test has three sections and forty questions in sixty minutes. Use a suggested fifteen-minute practice window for the thirteen drills, then review without a timer. This local timing is a learning choice, not an official allowance. Read for structure first, locate specific evidence and preserve qualifiers when answering. Some questions assess facts; others explicitly ask about the review’s claims. For completions, the prompt repeats the exact source and states the word limit so you can practise precise source-word transfer."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Map each paragraph’s role. Answer questions with an evidence note, move past a difficult item, and return before checking. Separate a wrong answer caused by language from one caused by an unsupported inference."
      },
      {
        "kind": "p",
        "text": "Original Academic Reading practice passage: Restoring the Fenmere Canal (fictional case).\n[A] For decades the Fenmere Canal separated a residential district from a former industrial yard. When the factories closed, the towpath remained fenced off. Residents could see the water from nearby bridges but had no continuous route beside it. A neighbourhood group proposed reopening the path as a walking link between two bus stops. Its members argued that a modest connection would be more useful than an expensive visitor attraction.\n[B] Before work began, engineers surveyed the old canal wall. They found that a short northern section needed reinforcement, while the southern wall could remain unchanged. The council therefore divided the project into two phases. Access to the safe southern section opened first. This allowed residents to use part of the route while the northern repairs continued. The report gives no figures for how many people used the route during this phase.\n[C] The initial plan called for lamps along the whole towpath. Ecologists objected that bright lighting close to the water might disturb animals active at night. The final design used low lamps near the bus stops and reflective markers along the central stretch. A separate inspection was scheduled after dark to check whether the markers were easy for walkers to follow. The report did not claim that all wildlife would be unaffected.\n[D] Local businesses were invited to comment. A café owner, Mara Singh, supported an entrance near the southern bus stop because it would improve access for customers. Historian Ellis Venn proposed keeping the old loading crane as a reminder of the canal's industrial role. Engineer Nora Lake recommended removable panels beside a service gate so maintenance teams could reach the wall. Their suggestions concerned different functions and were assessed separately.\n[E] Volunteers then planted native vegetation in shallow beds beside the path. The planting was intended to stabilise the soil and provide varied habitat. However, the team deliberately left the central viewing area unplanted so visitors could still see the water. Species were selected for the site's wet conditions rather than for flower colour alone. This was a practical design choice, not evidence that the chosen plants would suit every canal.\n[F] The council's review describes the scheme as a useful improvement in local access. It also cautions against judging success only by the number of photographs shared online. According to the review, a route that residents use regularly can justify maintenance even if it attracts few tourists. Future inspections will examine the wall and the planting beds. Whether the path changes property prices is outside the review's scope."
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "Worked evidence chain: “The scheme proved property prices increased” cannot be concluded because paragraph F explicitly places that issue outside scope. The review instead supports local access and regular use. For matching features, “old loading crane” leads to Ellis Venn in D, not to the first person named in that paragraph."
      },
      {
        "kind": "p",
        "text": "Why it works: The explanation distinguishes the supported evaluation from an excluded outcome and links a proposal to its actual speaker. It also shows why scanning for a name without reading the surrounding claim can produce the wrong match."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not infer visitor numbers, property prices or universal wildlife safety. Do not answer a writer-view question with a guess based on your own view of canal projects."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Write one short paragraph label for A–F before checking: proposal / phased repairs / lighting compromise / stakeholders / planting choices / evaluation. Use those labels to locate questions efficiently."
      },
      {
        "kind": "p",
        "text": "Independent practice: Complete all thirteen linked drills, then write an evidence sentence for every answer you missed. Repeat with a new text rather than memorising this answer order. Track raw correct answers and error types; this unequated short set cannot establish an official band."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Locate evidence, preserve scope and review the reason for each error. Accuracy on one short set is useful practice, not an official score."
      }
    ]
  },
  {
    "id": "band2-review",
    "title": "IELTS Academic: Review, Criteria and Independent Study Plan",
    "subtitle": "Distinguish practice evidence from an assessed band",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Distinguish practice evidence from an assessed band. Review all four skills. Set specific revision actions from real errors and responses."
      },
      {
        "kind": "p",
        "text": "The course targets preparation toward Band 6.5–8.0+, but completing lessons or earning XP does not demonstrate that outcome. Listening and Reading award raw marks on actual test questions, while official conversion depends on the test. An original short set has not been equated to an official paper. Writing and Speaking require evaluation of the response against the relevant criteria. Writing uses task achievement/response, coherence and cohesion, lexical resource, and grammatical range and accuracy. Speaking uses fluency and coherence, lexical resource, grammatical range and accuracy, and pronunciation. Meeting a word minimum establishes length only. A text-choice task cannot reveal spoken intelligibility. Use review to identify a skill to improve rather than to award yourself a guaranteed band."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Collect a reading evidence log, a real listening rehearsal, a Task 1 report, a Task 2 essay and recorded spoken answers. Review one criterion at a time. Choose a concrete revision action and compare a second response with the first."
      },
      {
        "kind": "p",
        "text": "Original review scenario: A learner writes 160 words for Task 1 and 265 for Task 2, answers eight of ten reading drill questions correctly, and chooses strong speaking plans in text quizzes. No spoken recording or teacher review is available."
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "The learner has evidence of eight correct reading drill answers and adequate written length. They do not yet have a defensible Writing or Speaking score. A useful action is to ask a qualified reviewer to evaluate both written tasks and listen to actual spoken responses, then revise the specific weaknesses identified."
      },
      {
        "kind": "p",
        "text": "Why it works: The judgement separates completion, length and objective accuracy from proficiency. It does not erase useful practice achievements; it limits the claims made from them."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not interpret 80% on a small bank as Band 8, claim pronunciation from a transcript, or assume a long essay answers every demand. Do not study General Training letters as Academic Task 1."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Choose one missing piece of evidence in the scenario and explain how to collect it. Check: a recording can support review of spoken delivery; a rubric-based evaluation of the actual essay can support Writing feedback."
      },
      {
        "kind": "p",
        "text": "Independent practice: Create a weekly plan: one audio-based Listening rehearsal, one timed Academic Reading set, one 150-word Task 1 report, one 250-word Task 2 essay and recorded practice for Speaking Parts 1–3. Review evidence and revise. Use official sample materials for full-format rehearsal; the linked drills remain local strategy practice."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Build a portfolio of actual responses, identify specific weaknesses and revise; course completion is not a guaranteed exam result."
      }
    ]
  }
];

// ─── Band 6–7 (Upper Intermediate) Lessons ────────────────

const band3Lesson1: Lesson = {
  id: "band3-listening-section3",
  title: "Listening: Section 3 — Academic Discussion",
  subtitle: "Following arguments",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "IELTS Listening Section 3 features a conversation between 2-4 people in an academic context — usually students discussing an assignment, project, or tutorial. You need to follow the argument, identify who says what, and understand the outcome. Speakers often change their minds.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Tracking Multiple Speakers",
      text: "Underline the speaker's name before listening. Listen for phrases that introduce opinions: 'Sarah thinks that...', 'According to John...'. The final decision is often important for the answer.",
    },
    {
      kind: "table",
      headers: ["Function","Phrases","Example"],
      rows: [["Suggesting","What if we... / Why don't we...","What if we focus on the methodology?"],["Agreeing","That's a good point / I agree","I think you're right about that."],["Disagreeing","I'm not sure about that / Actually...","Actually, I think the data is more important."],["Concluding","So we've decided that...","We've agreed to split the research into three parts."]],
    },
    {
      kind: "examples",
      items: [{"en":"The students discuss their research methodology.","tr":"The students discuss their research methodology.","ar":"يناقش الطلاب منهجية بحثهم."},{"en":"Sarah suggests using a questionnaire for data collection.","tr":"Sarah suggests using a questionnaire for data collection.","ar":"تقترح سارة استخدام استبيان لجمع البيانات."},{"en":"They finally agree to combine both approaches.","tr":"They finally agree to combine both approaches.","ar":"يتفقون أخيراً على الجمع بين النهجين."}],
    },
  ],
};

const band3Lesson2: Lesson = {
  id: "band3-listening-lecture",
  title: "Listening: Section 4 — Lecture",
  subtitle: "Note-taking while listening",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "IELTS Listening Section 4 is a university lecture. It is a monologue lasting about 5 minutes with 10 questions. The lecture has a clear structure: introduction to the topic, main points with examples, and conclusion. Listen for signposting language: 'today I'll discuss...', 'first, let's consider...'.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Effective Note-Taking",
      text: "Before the lecture, read through all 10 questions. Write keywords from the questions as headings. During the lecture, write short notes using abbreviations. Focus on content words and ignore articles/prepositions.",
    },
    {
      kind: "table",
      headers: ["Lecture Part","Signposting Language","What to Listen For"],
      rows: [["Introduction","Today I'm going to talk about...","Main topic and scope"],["First point","Firstly... / To begin...","First main idea"],["Example","For example... / To illustrate...","Specific case or study"],["Second point","Another aspect is...","Second main idea"],["Conclusion","In conclusion... / To sum up...","Summary of key points"]],
    },
    {
      kind: "examples",
      items: [{"en":"Today's lecture will focus on marine ecosystems.","tr":"Today's lecture will focus on marine ecosystems.","ar":"محاضرة اليوم ستركز على النظم البيئية البحرية."},{"en":"To illustrate this point, consider the case of Japan.","tr":"To illustrate this point, consider the case of Japan.","ar":"لتوضيح هذه النقطة، انظر إلى حالة اليابان."},{"en":"In conclusion, biodiversity is essential for ecosystem health.","tr":"In conclusion, biodiversity is essential for ecosystem health.","ar":"في الختام، التنوع البيولوجي ضروري لصحة النظام البيئي."}],
    },
  ],
};

const band3Lesson3: Lesson = {
  id: "band3-listening-multiple-speakers",
  title: "Listening: Multiple Speakers",
  subtitle: "Identifying who said what",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Questions often ask you to match opinions or actions to specific speakers. The challenge is distinguishing between speakers with similar voices. Focus on the content of what each person says rather than the voice. Listen for each speaker's name being used.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Speaker Identification",
      text: "Use preparation time to underline the speakers' names. As you listen, associate each speaker with their main viewpoint. If a speaker changes their mind, note that too.",
    },
    {
      kind: "table",
      headers: ["Speaker","Role","Typical Language"],
      rows: [["Student A","Often the initiator","What if we... / I suggest..."],["Student B","Often the critic","I'm not sure... / But what about..."],["Student C","Often the mediator","Maybe we could... / How about..."],["Tutor","Gives guidance","You should consider... / Have you thought..."]],
    },
    {
      kind: "examples",
      items: [{"en":"Tom suggests using online surveys for the research.","tr":"Tom suggests using online surveys for the research.","ar":"يقترح توم استخدام الاستبيانات عبر الإنترنت للبحث."},{"en":"Mary is concerned about the sample size being too small.","tr":"Mary is concerned about the sample size being too small.","ar":"ماري قلقة من أن حجم العينة صغير جداً."},{"en":"The tutor recommends focusing on qualitative data.","tr":"The tutor recommends focusing on qualitative data.","ar":"يوصي المعلم بالتركيز على البيانات النوعية."}],
    },
  ],
};

const band3Lesson4: Lesson = {
  id: "band3-reading-summary-completion",
  title: "Reading: Summary Completion",
  subtitle: "Using text structure",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Summary completion questions provide a summary of part of the passage with gaps. You must fill each gap with words from the passage. The summary follows the order of the passage, so you can locate the relevant section. The words must fit both meaning and grammar.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Summary Strategy",
      text: "1) Read the summary first. 2) Identify which paragraph(s) the summary covers. 3) For each gap, predict the word type. 4) Find the relevant part of the passage. 5) Copy the exact words from the passage. 6) Check spelling and word limit.",
    },
    {
      kind: "table",
      headers: ["Step","Action","Example"],
      rows: [["1","Read summary","Summary is about causes of air pollution"],["2","Locate section","Paragraphs 3-4 discuss causes"],["3","Predict word type","Gap after 'the burning of ___' → noun"],["4","Find in passage","Scan paragraph 3 for the noun"],["5","Copy exactly","Write exact words from passage"]],
    },
    {
      kind: "examples",
      items: [{"en":"The summary covers the main causes of global warming.","tr":"The summary covers the main causes of global warming.","ar":"الملخص يغطي الأسباب الرئيسية للاحتباس الحراري."},{"en":"Copy the exact words from the passage.","tr":"Copy the exact words from the passage.","ar":"انسخ الكلمات بالضبط من النص."},{"en":"The answer must not exceed two words.","tr":"The answer must not exceed two words.","ar":"يجب ألا تتجاوز الإجابة كلمتين."}],
    },
  ],
};

const band3Lesson5: Lesson = {
  id: "band3-reading-matching-features",
  title: "Reading: Matching Features/Information",
  subtitle: "Scanning across paragraphs",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Matching features questions ask you to match statements to a list of options (people, dates, theories, countries, etc.). Each option may be used once, more than once, or not at all. The statements are paraphrased, so understand the meaning rather than matching exact words.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Matching Strategy",
      text: "1) Read all the statements. 2) Underline the options in the passage. 3) Read each statement and decide which option it matches. 4) An option can be used for more than one statement.",
    },
    {
      kind: "table",
      headers: ["Question Type","Options Are","Statements Are"],
      rows: [["Matching Features","People, countries, dates","Descriptions or actions"],["Matching Information","Paragraphs A-H","Specific facts or ideas"],["Matching Endings","Sentence endings i-vii","Sentence beginnings"]],
    },
    {
      kind: "examples",
      items: [{"en":"Match each researcher to their finding.","tr":"Match each researcher to their finding.","ar":"طابق كل باحث مع نتيجته."},{"en":"Which paragraph contains the following information?","tr":"Which paragraph contains the following information?","ar":"أي فقرة تحتوي على المعلومات التالية؟"},{"en":"Some options may be used more than once.","tr":"Some options may be used more than once.","ar":"بعض الخيارات قد تستخدم أكثر من مرة."}],
    },
  ],
};

const band3Lesson6: Lesson = {
  id: "band3-reading-flowchart",
  title: "Reading: Flowchart/Diagram Labelling",
  subtitle: "Following processes",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Flowchart and diagram labelling questions test your understanding of processes. A flowchart shows steps in a process with arrows. A diagram shows parts of a structure with labels. The answers are usually nouns. The flowchart follows the order of the passage.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Flowchart Strategy",
      text: "1) Study the flowchart carefully. 2) Note the direction of arrows. 3) Identify what type of word each gap needs. 4) Read the passage section describing the process. 5) Follow the sequence as you read.",
    },
    {
      kind: "table",
      headers: ["Type","What It Shows","Example"],
      rows: [["Flowchart","Sequence of steps","Step 1: Raw materials → Step 2: Heating"],["Diagram","Parts of a structure","Label the parts of a water pump"],["Cycle","Repeating process","Water cycle: evaporation → condensation"]],
    },
    {
      kind: "examples",
      items: [{"en":"The flowchart shows the water treatment process.","tr":"The flowchart shows the water treatment process.","ar":"يوضح مخطط التدفق عملية معالجة المياه."},{"en":"Step 3 involves heating the mixture to 500 degrees.","tr":"Step 3 involves heating the mixture to 500 degrees.","ar":"الخطوة 3 تتضمن تسخين الخليط إلى 500 درجة."},{"en":"Label the diagram using words from the passage.","tr":"Label the diagram using words from the passage.","ar":"ضع علامات على الرسم البياني باستخدام كلمات من النص."}],
    },
  ],
};

const band3Lesson7: Lesson = {
  id: "band3-writing-multiple-charts",
  title: "TOEFL Writing: Academic Discussion Masterclass",
  subtitle: "Official ETS format, student debates & Score 5.0 model",
  xpReward: 60,
  blocks: [
    {
      kind: "p",
      text: "The TOEFL iBT 'Writing for an Academic Discussion' task gives you 10 minutes to read an online classroom thread and write a response of at least 100 words. You must express and defend an opinion, contribute something meaningful to the debate, and refer to the classmates' perspectives without simply repeating them.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Official ETS Authentic Discussion Prompt",
      text: "Professor Dr. Glover:\n'This week, we are analyzing corporate organizational models. Some business leaders insist that requiring all employees to return full-time to the physical office is essential for innovation and company culture. Others maintain that permanent remote work enhances worker satisfaction and productivity without harming output. In your post, express your position on this debate.'\n\nClaire: 'I strongly favor remote work. Commuting consumes hours every day and creates unnecessary stress. When people work from home, they have better work-life balance and are ultimately more productive.'\n\nPaul: 'I disagree with Claire. In-person collaboration is irreplaceable. Serendipitous interactions—spontaneous hallway conversations and brainstorming over coffee—spark the most creative ideas.'",
    },
    {
      kind: "p",
      text: "SCORE 5.0 ETS MODEL RESPONSE (126 words):\n\nWhile Claire highlights the undeniable time-saving advantages of remote work, and Paul correctly values spontaneous office synergy, I believe the most viable approach is a structured hybrid framework anchored in objective performance metrics.\n\nRequiring mandatory five-day office attendance is an obsolete paradigm that alienates top talent and inflates overhead costs. However, full remote isolation can indeed erode corporate culture, as Paul observed. By establishing designated collaborative days alongside dedicated remote deep-work days, enterprises capture the benefits of both worlds. For instance, my current team conducts sprint planning and design brainstorming in person on Tuesdays and Thursdays, while reserving remaining days for uninterrupted technical execution at home. This compromise optimizes individual concentration while preserving serendipitous collective innovation.",
    },
    {
      kind: "table",
      headers: ["Scoring Criterion","Score 5.0 Demonstration"],
      rows: [
        ["Contribution to Debate","Moves beyond the binary choice by introducing a practical hybrid framework backed by personal workplace evidence."],
        ["Engagement with Peers","Explicitly references both Claire ('time-saving advantages') and Paul ('spontaneous office synergy') before extending the debate."],
        ["Lexical Resource","Advanced corporate discourse: 'obsolete paradigm', 'serendipitous synergy', 'overhead costs', 'uninterrupted technical execution'."],
        ["Syntactic Sophistication","Graceful complex transitions: 'While Claire highlights..., and Paul correctly values..., I believe...'."]
      ],
    },
    {
      kind: "examples",
      items: [
        { en: "While Claire makes a compelling point regarding commute fatigue, I believe she overlooks...", tr: "While Claire makes a compelling point regarding commute fatigue, I believe she overlooks...", ar: "بينما تقدم كلير نقطة مقنعة بخصوص إرهاق التنقل، أعتقد أنها تغفل..." },
        { en: "Although I concede Paul's argument about spontaneous creativity, empirical data indicates...", tr: "Although I concede Paul's argument about spontaneous creativity, empirical data indicates...", ar: "رغم أنني أقر بحجة بول حول الإبداع العفوي، إلا أن البيانات التجريبية تشير إلى..." },
        { en: "The optimal compromise lies in establishing a structured hybrid framework.", tr: "The optimal compromise lies in establishing a structured hybrid framework.", ar: "التسوية المثالية تكمن في إنشاء إطار عمل هجين ومنظم." }
      ],
    },
  ],
};

const band3Lesson8: Lesson = {
  id: "band3-writing-maps-processes",
  title: "TOEFL Writing: Integrated Task Masterclass",
  subtitle: "Reading synthesis, lecture rebuttal & Score 5.0 model",
  xpReward: 60,
  blocks: [
    {
      kind: "p",
      text: "The TOEFL Integrated Writing Task (20 minutes, 150–225 words) requires you to synthesize a 3-minute academic reading passage with a 2-minute lecture by a professor. The professor will virtually always cast doubt on or refute the 3 specific claims made in the reading. You must NOT include personal opinions.",
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Authentic Integrated Test Prompt: Asteroid Mining",
      text: "Reading Passage Claims:\n1. Rocket propulsion costs to reach near-Earth asteroids are prohibitively expensive.\n2. Microgravity makes extracting and refining heavy metals mechanically hazardous.\n3. Transporting refined ores through Earth's atmosphere risks catastrophic re-entry burns.\n\nProfessor Lecture Counterpoints:\n1. Solar-electric ion engines operate on fractional propellant weight, cutting launch expenses by 90%.\n2. Centrifugal rotational modules create artificial gravity pods where automated machinery functions reliably.\n3. Heat-shielded robotic glider capsules with steerable parachutes allow water-cushioned oceanic recoveries without burning up.",
    },
    {
      kind: "p",
      text: "SCORE 5.0 SYNTHESIZED MODEL REPORT (228 words):\n\nBoth the reading and the lecture discuss the commercial viability of mining mineral-rich asteroids. While the author outlines three fundamental technical and economic obstacles facing extraterrestrial extraction, the lecturer contends that recent technological innovations render each of these objections obsolete.\n\nFirst, the passage argues that conventional chemical rocket propulsion requires colossal fuel payloads, rendering initial launch costs prohibitively exorbitant. The speaker counters this by highlighting next-generation solar-electric ion propulsion. Because ion thrusters require merely a fraction of the propellant mass used by chemical rockets, missions can be launched at approximately ten percent of conventional expenditures.\n\nSecond, the reading expresses skepticism regarding ore separation in zero-gravity environments, warning that floating debris could incapacitate mining equipment. In contrast, the professor reveals that mining operations will employ tethered centrifugal units. By rotating extraction pods, engineers establish localized artificial gravity, enabling automated crushers and electrostatic sorters to isolate precious platinum-group metals seamlessly.\n\nFinally, the author warns that re-entering Earth's atmosphere poses grave incinerative risks to heavy ore payloads. Refuting this, the lecturer explains that returning freighters will utilize lightweight carbon-composite heat shields coupled with steerable parafoils. These automated capsules can perform controlled decelerations into open oceanic recovery zones without risking payload disintegration or atmospheric combustion.",
    },
    {
      kind: "table",
      headers: ["Attribution Verb","Rhetorical Function","Model Sentence"],
      rows: [
        ["contends / refutes","Direct counter-argument","The lecturer refutes the reading's gloomy economic assessment."],
        ["casts doubt upon","Expressing skepticism","The speaker casts doubt on the severity of gravitational hazards."],
        ["counters this by explaining","Introducing solution","The professor counters this by highlighting solar-electric engines."],
        ["in contrast to the text","Transitioning points","In contrast to the text, the audio demonstrates robotic feasibility."]
      ],
    },
    {
      kind: "examples",
      items: [
        { en: "The lecturer contends that recent innovations render the author's objections obsolete.", tr: "The lecturer contends that recent innovations render the author's objections obsolete.", ar: "يجادل المحاضر بأن الابتكارات الحديثة تجعل اعتراضات المؤلف بالية وغير ذات صلة." },
        { en: "In direct contrast to the reading, the speaker explains that solar-electric engines reduce costs.", tr: "In direct contrast to the reading, the speaker explains that solar-electric engines reduce costs.", ar: "في تناقض مباشر مع النص القرائي، يوضح المتحدث أن محركات الدفع الكهربائي الشمسي تقلل التكاليف." },
        { en: "The professor refutes the premise that atmospheric re-entry poses an insurmountable danger.", tr: "The professor refutes the premise that atmospheric re-entry poses an insurmountable danger.", ar: "يدحض الأستاذ الفرضية القائلة بأن العودة عبر الغلاف الجوي تشكل خطراً لا يمكن التغلب عليه." }
      ],
    },
  ],
};

const band3Lesson9: Lesson = {
  id: "band3-writing-discussion",
  title: "TOEFL Reading: Adaptive Passages & Cloze Techniques",
  subtitle: "Complete-the-words strategy & vocabulary in context",
  xpReward: 60,
  blocks: [
    {
      kind: "p",
      text: "The modern TOEFL iBT reading section assesses your ability to process university-level prose rapidly. Question types include 'Complete the Words' (adaptive cloze tasks where partial letters of words in a sentence must be filled), Vocabulary-in-Context, and Sentence Insertion.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Authentic Passage: The Denisovans and Paleogenomics",
      text: "'Until recently, paleoanthropologists classified ancient hominin migrations strictly through physical cranial remains. However, high-throughput DNA sequencing of a single juvenile finger bone discovered in Denisova Cave, Siberia, shattered this paradigm. Geneticists extracted extraordinarily preserved mitochondrial and nuclear sequences, revealing that Denisovans interbred with ancestors of modern Melanesians and Indigenous Australians, leaving functional genomic traces associated with high-altitude hypoxia adaptation.'",
    },
    {
      kind: "table",
      headers: ["TOEFL Question Type","Sample Task","Exam Strategy"],
      rows: [
        [
          "Complete the Words (Cloze)",
          "The discov___ of the Denisova cav___ fing___ bone shatt____ the exis____ taxonomy.",
          "Look at syntactic role: 'discov[ery]' (noun), 'cav[e]' (noun modifier), 'fing[er]' (noun), 'shatt[ered]' (past verb), 'exis[ting]' (participle adjective)."
        ],
        [
          "Vocabulary in Context",
          "The word 'paradigm' in the text is closest in meaning to:",
          "Options: (A) anomaly, (B) established model, (C) fossil fragment. Correct: (B) established model."
        ],
        [
          "Author Purpose",
          "Why does the author mention high-altitude hypoxia adaptation?",
          "To illustrate that archaic hominin DNA imparted tangible physiological advantages to modern human populations."
        ]
      ],
    },
    {
      kind: "examples",
      items: [
        { en: "Determine the grammatical category before attempting to complete the missing letters.", tr: "Determine the grammatical category before attempting to complete the missing letters.", ar: "حدد الفئة النحوية قبل محاولة إكمال الحروف المفقودة." },
        { en: "Vocabulary in context questions test functional meaning in academic discourse.", tr: "Vocabulary in context questions test functional meaning in academic discourse.", ar: "أسئلة المفردات في السياق تختبر المعنى الوظيفي في الخطاب الأكاديمي." },
        { en: "Look for surrounding semantic clues that confirm the author's primary intent.", tr: "Look for surrounding semantic clues that confirm the author's primary intent.", ar: "ابحث عن القرائن الدلالية المحيطة التي تؤكد القصد الأساسي للكاتب." }
      ],
    },
  ],
};

const band3Lesson10: Lesson = {
  id: "band3-writing-advantages",
  title: "Writing Task 2: Advantages & Disadvantages",
  subtitle: "Balanced approach",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Advantages and disadvantages essays ask you to discuss the positive and negative aspects. Structure: Introduction, Body 1 (2-3 advantages with explanations), Body 2 (2-3 disadvantages with explanations), Conclusion (summarize and state whether advantages outweigh disadvantages).",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Balanced Vocabulary",
      text: "For advantages: 'a major benefit is...', 'one significant advantage is...'. For disadvantages: 'a key drawback is...', 'one major disadvantage is...'.",
    },
    {
      kind: "table",
      headers: ["Phrase Type","Advantages","Disadvantages"],
      rows: [["Major point","One significant advantage is...","One major drawback is..."],["Explanation","This means that...","This results in..."],["Example","For instance...","For example, this can cause..."],["Concession","Not only that, but also...","Furthermore, it can also..."]],
    },
    {
      kind: "examples",
      items: [{"en":"One significant advantage of social media is global connectivity.","tr":"One significant advantage of social media is global connectivity.","ar":"من المزايا المهمة لوسائل التواصل الاجتماعي الاتصال العالمي."},{"en":"A major drawback is the potential for privacy violations.","tr":"A major drawback is the potential for privacy violations.","ar":"من العيوب الرئيسية احتمالية انتهاكات الخصوصية."},{"en":"Overall, the advantages of this approach outweigh the disadvantages.","tr":"Overall, the advantages of this approach outweigh the disadvantages.","ar":"بشكل عام، مزايا هذا النهج تفوق عيوبه."}],
    },
  ],
};

const band3Lesson11: Lesson = {
  id: "band3-writing-task-response",
  title: "Writing Task 2: Task Response",
  subtitle: "Fully addressing the prompt",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Task Response assesses whether you have fully addressed all parts of the question. Many students lose marks because they only partially answer the question. Read the question multiple times, underline all task words, and ensure every paragraph directly relates to the prompt.",
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Common Task Response Mistakes",
      text: "1) Only discussing one side when the question asks for both. 2) Forgetting to give your opinion. 3) Writing about a different topic. 4) Not developing ideas fully. 5) Including irrelevant information.",
    },
    {
      kind: "table",
      headers: ["Question Type","What You Must Do","Common Mistake"],
      rows: [["Agree/Disagree","State and support your opinion","Not clearly stating your position"],["Discuss both views","Cover both sides + give opinion","Only covering one side"],["Causes/Solutions","Identify causes AND suggest solutions","Only discussing causes"],["Advantages/Disadvantages","Discuss both pros and cons","Only listing advantages"]],
    },
    {
      kind: "examples",
      items: [{"en":"The question asks for both causes and solutions.","tr":"The question asks for both causes and solutions.","ar":"السؤال يطلب الأسباب والحلول معاً."},{"en":"Make sure every paragraph relates to the question.","tr":"Make sure every paragraph relates to the question.","ar":"تأكد من أن كل فقرة تتعلق بالسؤال."},{"en":"I need to give my opinion in this essay.","tr":"I need to give my opinion in this essay.","ar":"أحتاج إلى إبداء رأيي في هذا المقال."}],
    },
  ],
};

const band3Lesson12: Lesson = {
  id: "band3-writing-formality",
  title: "Writing: Academic Style & Formality",
  subtitle: "No contractions, objective tone",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Academic writing requires a formal, objective style. Avoid: contractions (don't, can't, won't), informal vocabulary (kids, stuff, a lot of), rhetorical questions, and emotional language. Use passive voice where appropriate and formal vocabulary.",
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Formal vs Informal",
      text: "Informal: 'A lot of people think...' → Formal: 'Many individuals believe...' Informal: 'It's bad for you' → Formal: 'It is detrimental to health.' Never use 'etc.' in academic writing.",
    },
    {
      kind: "table",
      headers: ["Informal","Formal","Better Alternative"],
      rows: [["a lot of","many, numerous, a significant number of","Numerous studies have confirmed..."],["kids / guys","children / individuals / people","Young people today face many challenges."],["good / bad","positive / negative, beneficial / detrimental","This policy has positive effects on society."],["things / stuff","items / matters / aspects / issues","Several issues need to be addressed."],["can't / don't","cannot / do not","The government cannot ignore this issue."]],
    },
    {
      kind: "examples",
      items: [{"en":"It can be argued that technology has transformed education.","tr":"It can be argued that technology has transformed education.","ar":"يمكن القول إن التكنولوجيا غيرت التعليم."},{"en":"The evidence suggests that this approach is effective.","tr":"The evidence suggests that this approach is effective.","ar":"تشير الأدلة إلى أن هذا النهج فعال."},{"en":"A significant number of participants agreed with the proposal.","tr":"A significant number of participants agreed with the proposal.","ar":"وافق عدد كبير من المشاركين على الاقتراح."}],
    },
  ],
};

const band3Lesson13: Lesson = {
  id: "band3-speaking-part3",
  title: "Speaking Part 3 (IELTS): Discussion",
  subtitle: "Abstract ideas, follow-up questions",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "IELTS Speaking Part 3 is a discussion about abstract topics related to your Part 2 topic. Questions are more challenging: 'Why do you think...?', 'What are the effects of...?', 'How has this changed over time?' You need to give extended answers with reasons, examples, and predictions.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Part 3 Strategies",
      text: "1) Answer directly, then explain. 2) Give specific examples. 3) Compare past, present, and future. 4) Use hedging language: 'It could be argued that...'. 5) Don't give short answers.",
    },
    {
      kind: "table",
      headers: ["Question Type","How to Answer","Example"],
      rows: [["Why questions","Reason + explanation","This is because education shapes values."],["Effect questions","Cause → effect → example","This leads to increased productivity, as seen in Japan."],["Comparison questions","Compare X and Y","In the past, people relied on print media; now, digital media dominates."],["Future questions","Prediction + reasoning","I believe that AI will revolutionize healthcare."]],
    },
    {
      kind: "dialogue",
      title: "Part 3 Discussion",
      lines: [{"speaker":"Examiner","en":"Why do you think some people prefer to live in cities?","tr":"Why do you think some people prefer to live in cities?","ar":"لماذا تعتقد أن بعض الناس يفضلون العيش في المدن؟"},{"speaker":"You","en":"There are several reasons. Firstly, cities offer better employment opportunities and access to services.","tr":"There are several reasons. Firstly, cities offer better employment opportunities...","ar":"هناك عدة أسباب. أولاً، المدن توفر فرص عمل أفضل."},{"speaker":"Examiner","en":"How do you think city life will change in the future?","tr":"How do you think city life will change in the future?","ar":"كيف تعتقد أن الحياة في المدينة ستتغير في المستقبل؟"},{"speaker":"You","en":"I believe cities will become smarter and more sustainable, with more green spaces.","tr":"I believe cities will become smarter and more sustainable...","ar":"أعتقد أن المدن ستصبح أكثر ذكاءً واستدامة."}],
    },
    {
      kind: "examples",
      items: [{"en":"Generally speaking, education is the key to social mobility.","tr":"Generally speaking, education is the key to social mobility.","ar":"بشكل عام، التعليم هو مفتاح الحراك الاجتماعي."},{"en":"It could be argued that technology has both positive and negative effects.","tr":"It could be argued that technology has both positive and negative effects.","ar":"يمكن القول إن للتكنولوجيا آثاراً إيجابية وسلبية."},{"en":"In the future, I predict that renewable energy will become the norm.","tr":"In the future, I predict that renewable energy will become the norm.","ar":"في المستقبل، أتوقع أن الطاقة المتجددة ستصبح القاعدة."}],
    },
  ],
};

const band3Lesson14: Lesson = {
  id: "band3-speaking-opinions",
  title: "Speaking Part 3: Giving & Justifying Opinions",
  subtitle: "Hedging language",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "In IELTS Speaking Part 3, you need to give opinions on abstract topics and justify them. Use hedging language: 'I tend to think that...', 'It seems to me that...', 'My view is that...'. Justify your opinions with reasons: 'The reason I think this is because...'.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Hedging vs Absolute Language",
      text: "Avoid absolute statements (everyone, always, never). Use hedges: 'most people', 'in many cases', 'generally', 'tend to', 'often'. Hedging makes you sound more thoughtful and academic.",
    },
    {
      kind: "table",
      headers: ["Absolute","Hedged","Effect"],
      rows: [["Everyone agrees that...","Most people would agree that...","More cautious"],["This is always true.","This is often the case.","Acknowledges exceptions"],["This will never happen.","This is unlikely to happen.","Less definitive"],["It is impossible to...","It can be difficult to...","Less extreme"]],
    },
    {
      kind: "examples",
      items: [{"en":"I tend to think that globalization has more positive effects than negative ones.","tr":"I tend to think that globalization has more positive effects than negative ones.","ar":"أميل إلى الاعتقاد بأن للعولمة آثاراً إيجابية أكثر من سلبية."},{"en":"It seems to me that the main challenge is funding.","tr":"It seems to me that the main challenge is funding.","ar":"يبدو لي أن التحدي الرئيسي هو التمويل."},{"en":"The reason I believe this is that education empowers individuals.","tr":"The reason I believe this is that education empowers individuals.","ar":"السبب في اعتقادي هذا هو أن التعليم يمكّن الأفراد."}],
    },
  ],
};

const band3Lesson15: Lesson = {
  id: "band3-speaking-toefl4",
  title: "TOEFL Speaking: Integrated Campus Task Masterclass",
  subtitle: "Announcement analysis, student dialogue & Score 4.0 model",
  xpReward: 60,
  blocks: [
    {
      kind: "p",
      text: "TOEFL Speaking Task 2 (Campus Situation) tests your ability to synthesize university announcements with student reactions. You read a 45-second campus notice, listen to a 60-second dialogue between two students where one expresses strong opinions, and then have 30 seconds of prep followed by 60 seconds of speaking to report the student's stance and reasons.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Authentic Campus Notice: Elimination of Paper Receipts",
      text: "University Bookstore Notice: Transition to Digital E-Receipts\n'Beginning next semester, the campus bookstore will cease printing physical paper transaction slips at checkouts. All transaction confirmations, return barcodes, and warranty records will be transmitted instantaneously to students' official university email accounts. This policy aims to eliminate checkout paper waste, decrease environmental footprints, and streamline student refund processing.'",
    },
    {
      kind: "dialogue",
      title: "Student Audio Conversation Excerpt",
      lines: [
        { speaker: "Male Student", en: "Hey Rachel, did you see the new bookstore policy about digital receipts? Sounds pretty eco-friendly, right?", tr: "Hey Rachel, did you see the new bookstore policy?", ar: "مرحباً راشيل، هل رأيتِ سياسة متجر الكتب الجديدة حول الإيصالات الرقمية؟ يبدو صديقاً للبيئة، أليس كذلك؟" },
        { speaker: "Female Student", en: "Honestly, I think it's going to create a nightmare during textbook buyback week. Half the freshmen don't monitor their campus inbox regularly, and when spam filters divert bookstore emails, students won't have proof of purchase for mandatory textbook returns.", tr: "Honestly, I think it's going to create a nightmare...", ar: "بصراحة، أعتقد أنه سيخلق كابوساً خلال أسبوع إعادة شراء الكتب الدراسية." },
        { speaker: "Female Student", en: "Plus, the Wi-Fi signal in the basement of the bookstore is practically non-existent! If someone needs to pull up a barcode on their phone at the customer service counter, they'll hold up the entire line waiting for the network to load.", tr: "Plus, the Wi-Fi signal in the basement is practically non-existent!", ar: "بالإضافة إلى ذلك، فإن إشارة الواي فاي في قبو متجر الكتب شبه معدومة!" }
      ],
    },
    {
      kind: "p",
      text: "SCORE 4.0 SPOKEN MODEL RESPONSE (60 Seconds):\n\n'According to the announcement, the university bookstore plans to eliminate physical paper receipts next semester and switch entirely to digital email confirmations in order to curb paper waste and expedite returns. In the conversation, the woman strongly opposes this decision for two key reasons.\n\nFirst, she points out that textbook buyback week is chaotic, and many incoming students—especially freshmen—seldom check their official university inboxes. If an e-receipt gets redirected to a spam folder, students will be unable to produce legitimate proof of purchase when requesting refunds, leading to significant financial frustration.\n\nSecond, she highlights that the bookstore is situated in the building's basement, an area notorious for terrible cellular reception and spotty campus Wi-Fi. Consequently, having dozens of students trying to retrieve and load digital barcodes simultaneously at the service counter will inevitably stall transactions and cause immense queues. For these reasons, she believes the initiative is ill-conceived.'",
    },
    {
      kind: "table",
      headers: ["Time Stamp","Speaking Delivery Blueprint"],
      rows: [
        ["0–12 sec","Synthesize the university announcement and state the student's stance."],
        ["13–35 sec","Explain the student's first major point with specific conversational details."],
        ["36–55 sec","Explain the student's second major point (infrastructure / Wi-Fi issue)."],
        ["56–60 sec","Deliver a concise one-sentence wrap-up."]
      ],
    },
    {
      kind: "examples",
      items: [
        { en: "The woman firmly disagrees with the university's proposal for two principal reasons.", tr: "The woman firmly disagrees with the university's proposal for two principal reasons.", ar: "تعارض المرأة بشدة اقتراح الجامعة لسببين رئيسيين." },
        { en: "She notes that spotty connectivity in the basement will cause severe checkout delays.", tr: "She notes that spotty connectivity in the basement will cause severe checkout delays.", ar: "تشير إلى أن ضعف الاتصال في القبو سيتسبب في تأخيرات شديدة عند الدفع." },
        { en: "Important transaction records could inadvertently be routed to junk mail folders.", tr: "Important transaction records could inadvertently be routed to junk mail folders.", ar: "قد يتم توجيه سجلات المعاملات الهامة عن غير قصد إلى مجلدات البريد غير المرغوب فيه." }
      ],
    },
  ],
};

const band3Lesson16: Lesson = {
  id: "band3-grammar-conditionals",
  title: "Grammar Boost: Conditional Sentences",
  subtitle: "Using conditionals in Task 2",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Conditional sentences are useful for discussing hypothetical situations and predictions. Zero: general truth. First: real future possibility. Second: hypothetical present. Third: hypothetical past. Using them correctly improves your Grammatical Range score.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Conditionals in Essays",
      text: "Use first conditional: 'If governments invest in education, the economy will grow.' Use second: 'If everyone had clean water, many diseases would be prevented.' Use third: 'If the government had acted earlier, the crisis could have been avoided.'",
    },
    {
      kind: "table",
      headers: ["Type","Form","Use","Example"],
      rows: [["Zero","If + present, present","General truth","If you heat water, it boils."],["First","If + present, will + base","Real future","If we act now, we will prevent further damage."],["Second","If + past, would + base","Hypothetical present","If I were rich, I would help more people."],["Third","If + had + V3, would have + V3","Hypothetical past","If they had invested earlier, they would have succeeded."]],
    },
    {
      kind: "examples",
      items: [{"en":"If the government invests in education, the economy will grow.","tr":"If the government invests in education, the economy will grow.","ar":"إذا استثمرت الحكومة في التعليم، سينمو الاقتصاد."},{"en":"If everyone had access to clean water, many diseases would be prevented.","tr":"If everyone had access to clean water, many diseases would be prevented.","ar":"إذا كان لدى الجميع مياه نظيفة، لتم منع العديد من الأمراض."},{"en":"If the authorities had acted sooner, the crisis would have been avoided.","tr":"If the authorities had acted sooner, the crisis would have been avoided.","ar":"لو تصرفت السلطات عاجلاً، لكانت الأزمة قد تجنبت."}],
    },
  ],
};

const band3Lesson17: Lesson = {
  id: "band3-grammar-passive",
  title: "Grammar Boost: Passive Voice in Academic Writing",
  subtitle: "It can be argued that",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "The passive voice focuses on the action rather than the person doing it. Form: be + past participle. Use passive to describe processes ('the data was collected'), to be objective ('it can be argued that'), and when the agent is unknown ('the results were published').",
    },
    {
      kind: "callout",
      tone: "rule",
      title: "When to Use Passive",
      text: "Use passive when: 1) The action is more important than the doer. 2) Writing about processes. 3) Being objective. Avoid passive when: 1) Active is clearer. 2) You want to be direct.",
    },
    {
      kind: "table",
      headers: ["Active","Passive","When to Use"],
      rows: [["Researchers collected data.","Data was collected by researchers.","Process focus"],["People believe that...","It is believed that...","Objective statement"],["The government should act.","Action should be taken.","Unknown agent"]],
    },
    {
      kind: "examples",
      items: [{"en":"It can be argued that technology has improved our quality of life.","tr":"It can be argued that technology has improved our quality of life.","ar":"يمكن القول إن التكنولوجيا حسنت جودة حياتنا."},{"en":"The data was collected from over 500 participants.","tr":"The data was collected from over 500 participants.","ar":"تم جمع البيانات من أكثر من 500 مشارك."},{"en":"It is widely believed that education is the key to success.","tr":"It is widely believed that education is the key to success.","ar":"من المعتقد على نطاق واسع أن التعليم هو مفتاح النجاح."}],
    },
  ],
};

const band3Lesson18: Lesson = {
  id: "band3-vocab-awl3",
  title: "Vocabulary: AWL Sublist 3",
  subtitle: "High-frequency academic words",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "AWL Sublist 3 contains the next 60 most common academic words. These are essential for achieving Band 7+ in IELTS or a high score in TOEFL. Practice using these words in your writing and speaking responses.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Study Method",
      text: "For each word: 1) Read the definition and example. 2) Write your own sentence. 3) Say the sentence out loud. 4) Review the word the next day. Use spaced repetition for long-term memory.",
    },
    {
      kind: "table",
      headers: ["Word","Part of Speech","Example","Arabic"],
      rows: [["alternative","n/adj","We need to find an alternative solution.","بديل"],["circumstances","n","Under these circumstances, action is needed.","ظروف"],["component","n","Trust is a key component of any relationship.","مكون"],["contribute","v","Several factors contributed to the decline.","يساهم في"],["controversy","n","There is controversy surrounding this policy.","جدل"],["demonstrate","v","The study demonstrates the effectiveness of...","يثبت / يظهر"],["document","n/v","The documents were carefully analyzed.","وثيقة / يوثق"],["emphasis","n","The emphasis should be on prevention.","تركيز / تأكيد"],["ensure","v","We must ensure equal opportunities for all.","يضمن"],["establish","v","The research established a clear link.","يثبت / يؤسس"]],
    },
    {
      kind: "examples",
      items: [{"en":"Several factors contributed to the economic recovery.","tr":"Several factors contributed to the economic recovery.","ar":"ساهمت عدة عوامل في التعافي الاقتصادي."},{"en":"The study demonstrates the benefits of early intervention.","tr":"The study demonstrates the benefits of early intervention.","ar":"تظهر الدراسة فوائد التدخل المبكر."},{"en":"We must ensure that all students have equal access.","tr":"We must ensure that all students have equal access.","ar":"يجب أن نضمن لجميع الطلاب وصولاً متساوياً."}],
    },
  ],
};

const band3Lesson19: Lesson = {
  id: "band3-vocab-health",
  title: "Vocabulary: Topic-Specific — Health & Medicine",
  subtitle: "Key terms",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Health and medicine topics appear frequently. You need vocabulary to discuss healthcare systems, diseases, treatments, and public health issues. Key areas: healthcare access, preventive medicine, mental health, nutrition.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Health Vocabulary Groups",
      text: "Conditions: 'chronic disease', 'infectious disease', 'mental illness'. Healthcare: 'universal healthcare', 'public health system', 'preventive care'. Treatments: 'medical intervention', 'surgery', 'therapy', 'medication'.",
    },
    {
      kind: "table",
      headers: ["Word/Phrase","Definition","Example","Arabic"],
      rows: [["chronic disease","Long-lasting illness","Diabetes is a chronic disease affecting millions.","مرض مزمن"],["preventive care","Healthcare to prevent illness","Preventive care reduces long-term costs.","رعاية وقائية"],["mental health","Psychological wellbeing","Mental health is as important as physical health.","صحة نفسية"],["healthcare system","Medical services structure","The healthcare system needs more funding.","نظام رعاية صحية"],["life expectancy","Average lifespan","Life expectancy has increased significantly.","متوسط العمر المتوقع"],["epidemic","Widespread disease outbreak","The obesity epidemic is a global concern.","وباء"]],
    },
    {
      kind: "examples",
      items: [{"en":"Preventive care reduces the burden on the healthcare system.","tr":"Preventive care reduces the burden on the healthcare system.","ar":"الرعاية الوقائية تقلل العبء على نظام الرعاية الصحية."},{"en":"Mental health awareness has grown significantly in recent years.","tr":"Mental health awareness has grown significantly in recent years.","ar":"زاد الوعي بالصحة النفسية بشكل ملحوظ في السنوات الأخيرة."},{"en":"Life expectancy has risen due to advances in medicine.","tr":"Life expectancy has risen due to advances in medicine.","ar":"ارتفع متوسط العمر المتوقع بسبب التقدم في الطب."}],
    },
  ],
};

const band3Lesson20: Lesson = {
  id: "band3-vocab-education",
  title: "Vocabulary: Topic-Specific — Education",
  subtitle: "Key terms",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Education is a very common topic. You should be able to discuss different education systems, teaching methods, the purpose of education, and educational challenges. Key areas: early childhood education, higher education, online learning, standardized testing.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Education Vocabulary",
      text: "Systems: 'formal education', 'vocational training', 'higher education'. Methods: 'rote learning', 'critical thinking', 'project-based learning'. Issues: 'education gap', 'student debt', 'dropout rates'.",
    },
    {
      kind: "table",
      headers: ["Word/Phrase","Definition","Example","Arabic"],
      rows: [["higher education","University-level education","Higher education should be accessible to all.","التعليم العالي"],["vocational training","Practical job training","Vocational training prepares students for specific careers.","تدريب مهني"],["critical thinking","Analytical reasoning","Schools should promote critical thinking skills.","تفكير نقدي"],["curriculum","Course of study","The curriculum needs to be updated regularly.","منهج دراسي"],["scholarship","Financial award for study","She received a scholarship to study abroad.","منحة دراسية"],["literacy rate","Percentage who can read/write","The literacy rate has improved dramatically.","معدل الإلمام بالقراءة والكتابة"]],
    },
    {
      kind: "examples",
      items: [{"en":"Higher education should be accessible to everyone regardless of income.","tr":"Higher education should be accessible to everyone regardless of income.","ar":"يجب أن يكون التعليم العالي في متناول الجميع بغض النظر عن الدخل."},{"en":"Schools should promote critical thinking rather than rote memorization.","tr":"Schools should promote critical thinking rather than rote memorization.","ar":"يجب أن تعزز المدارس التفكير النقدي بدلاً من الحفظ عن ظهر قلب."},{"en":"Vocational training provides practical skills for the workplace.","tr":"Vocational training provides practical skills for the workplace.","ar":"التدريب المهني يوفر مهارات عملية لمكان العمل."}],
    },
  ],
};

const band3Lesson21: Lesson = {
  id: "band3-vocab-work",
  title: "Vocabulary: Topic-Specific — Work & Employment",
  subtitle: "Key terms",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Work and employment topics are common. You need vocabulary to discuss job markets, career development, workplace issues, and economic trends. Key areas: unemployment, automation, work-life balance, remote work.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Employment Vocabulary",
      text: "Jobs: 'profession', 'occupation', 'career', 'vocation'. Conditions: 'job security', 'workplace environment', 'employee benefits'. Trends: 'gig economy', 'remote work', 'automation'.",
    },
    {
      kind: "table",
      headers: ["Word/Phrase","Definition","Example","Arabic"],
      rows: [["job security","Stability of employment","Job security is a major concern for many workers.","الأمان الوظيفي"],["work-life balance","Balance between work and personal life","Remote work improves work-life balance.","التوازن بين العمل والحياة"],["gig economy","Short-term freelance work","The gig economy is growing rapidly.","اقتصاد الوظائف المؤقتة"],["unemployment rate","Percentage without jobs","The unemployment rate fell to 5%.","معدل البطالة"],["income inequality","Gap between rich and poor","Income inequality is a growing global issue.","تفاوت الدخل"],["employee benefits","Non-wage compensation","Good employee benefits attract talented workers.","مزايا الموظفين"]],
    },
    {
      kind: "examples",
      items: [{"en":"Job security is a major concern for workers in the gig economy.","tr":"Job security is a major concern for workers in the gig economy.","ar":"الأمان الوظيفي مصدر قلق كبير للعاملين في اقتصاد الوظائف المؤقتة."},{"en":"Remote work has improved work-life balance for many employees.","tr":"Remote work has improved work-life balance for many employees.","ar":"العمل عن بعد حسن التوازن بين العمل والحياة للعديد من الموظفين."},{"en":"Income inequality continues to widen in many countries.","tr":"Income inequality continues to widen in many countries.","ar":"تفاوت الدخل يستمر في الاتساع في العديد من البلدان."}],
    },
  ],
};

const band3Lesson22: Lesson = {
  id: "band3-paraphrasing",
  title: "Paraphrasing Skills: Sentence Transformation",
  subtitle: "Saying the same thing differently",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Paraphrasing is essential for both IELTS and TOEFL. Techniques: 1) Use synonyms. 2) Change active to passive. 3) Change sentence structure. 4) Change word form. 5) Combine or split sentences.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Paraphrasing Techniques",
      text: "Original: 'The government should invest more in renewable energy.' Paraphrase 1: 'The authorities ought to allocate additional funding to sustainable power.' Paraphrase 2: 'More investment in renewable energy should be made by the government.'",
    },
    {
      kind: "table",
      headers: ["Original","Paraphrased","Technique Used"],
      rows: [["Many people believe that...","It is widely believed that...","Passive + synonym"],["The graph shows an increase.","The graph illustrates an upward trend.","Synonym + word transformation"],["This is important because...","This is significant due to the fact that...","Synonym + clause change"],["Students need to study.","It is essential for students to study.","Structure change"]],
    },
    {
      kind: "examples",
      items: [{"en":"It is widely believed that education is the key to success.","tr":"It is widely believed that education is the key to success.","ar":"من المعتقد على نطاق واسع أن التعليم هو مفتاح النجاح."},{"en":"The graph illustrates a significant upward trend in sales.","tr":"The graph illustrates a significant upward trend in sales.","ar":"يوضح الرسم البياني اتجاهاً تصاعدياً كبيراً في المبيعات."},{"en":"Increased investment in renewable energy is essential.","tr":"Increased investment in renewable energy is essential.","ar":"الاستثمار المتزايد في الطاقة المتجددة أمر ضروري."}],
    },
  ],
};

const band3Lesson23: Lesson = {
  id: "band3-error-analysis",
  title: "Error Analysis: Common IELTS/TOEFL Mistakes",
  subtitle: "Real student errors",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Learning from common mistakes can fast-track your improvement. Frequent errors by Arabic-speaking test-takers: 1) 'I am agree' → 'I agree'. 2) 'There is many' → 'There are many'. 3) 'Since two years' → 'For two years'. 4) 'I have been to London last year' → 'I went to London last year'.",
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Top 5 Mistakes by Arabic Speakers",
      text: "1) 'I am agree' → 'I agree'. 2) 'There is many' → 'There are many'. 3) 'Since two years' → 'For two years'. 4) 'I have been to London last year' → 'I went to London last year'. 5) 'The life is beautiful' → 'Life is beautiful'.",
    },
    {
      kind: "table",
      headers: ["Incorrect","Correct","Rule"],
      rows: [["I am agree.","I agree.","'Agree' is a verb, not an adjective"],["She go to school.","She goes to school.","Third person singular + -s"],["Since two years.","For two years.","'Since' + specific point, 'for' + duration"],["The life is good.","Life is good.","No article for general concepts"],["I have visited Paris last year.","I visited Paris last year.","Past simple for completed past"]],
    },
    {
      kind: "examples",
      items: [{"en":"I agree with the statement that technology has benefits.","tr":"I agree with the statement that technology has benefits.","ar":"أوافق على العبارة بأن للتكنولوجيا فوائد."},{"en":"I have been studying English for three years.","tr":"I have been studying English for three years.","ar":"لقد كنت أدرس الإنجليزية لمدة ثلاث سنوات."},{"en":"Life in the city is very different from life in the countryside.","tr":"Life in the city is very different from life in the countryside.","ar":"الحياة في المدينة مختلفة جداً عن الحياة في الريف."}],
    },
  ],
};

const band3Lesson24: Lesson = {
  id: "band3-practice-essay",
  title: "Practice Mini-Test: Writing Task 2",
  subtitle: "Full essay under timed conditions",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "This practice test simulates real IELTS Writing Task 2 conditions. 40 minutes to write at least 250 words. Topic: 'Some people believe that technology has made people more creative. Others believe that it has reduced creativity. Discuss both views and give your own opinion.'",
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Timed Practice Rules",
      text: "Set a timer for 40 minutes. Do not use a dictionary. Write a clear 4-paragraph structure. After finishing, check: Did I answer all parts? Is my opinion clear? Did I use a range of vocabulary? Did I check for grammar errors?",
    },
    {
      kind: "table",
      headers: ["Stage","Time","Action"],
      rows: [["Plan","5 min","Brainstorm ideas, choose 2 main points, structure essay"],["Write intro","5 min","Paraphrase question + state your opinion"],["Write body 1","10 min","First point + explanation + example"],["Write body 2","10 min","Second point + explanation + example"],["Write conclusion","5 min","Summarize + restate opinion"],["Check","5 min","Grammar, spelling, vocabulary, task response"]],
    },
    {
      kind: "examples",
      items: [{"en":"Technology has undoubtedly transformed how we express creativity.","tr":"Technology has undoubtedly transformed how we express creativity.","ar":"التكنولوجيا بلا شك غيرت كيفية تعبيرنا عن الإبداع."},{"en":"Both sides of this argument have valid points.","tr":"Both sides of this argument have valid points.","ar":"كلا جانبي هذه الحجة لديهما نقاط صحيحة."},{"en":"In my view, technology is a tool that amplifies human creativity.","tr":"In my view, technology is a tool that amplifies human creativity.","ar":"في رأيي، التكنولوجيا أداة تضخم الإبداع البشري."}],
    },
  ],
};

const band3Lesson25: Lesson = {
  id: "band3-review",
  title: "Band 6–7 Review & Progress Check",
  subtitle: "Mixed skills assessment",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Excellent work completing Band 6–7 (Upper Intermediate)! You have mastered advanced strategies: following academic discussions, lecture note-taking, summary completion, multiple chart analysis, discussion essays, academic style, Part 3 speaking, and advanced grammar like conditionals and passive voice.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Self-Assessment",
      text: "Rate yourself 1-5: I can follow academic discussions and lectures. I can handle summary completion. I can write about multiple charts. I can discuss abstract topics in Part 3. I know AWL Sublist 3.",
    },
    {
      kind: "table",
      headers: ["Skill","What I Learned","Next Steps"],
      rows: [["Listening","Section 3 & 4, note-taking, multiple speakers","Practice full listening tests"],["Reading","Summary completion, matching, flowcharts","Practice under timed conditions"],["Writing Task 1","Multiple charts, maps, processes","Practice all Task 1 types"],["Writing Task 2","Discussion, advantages/disadvantages, formal style","Write essays with academic style"],["Speaking","Part 3 discussion, justifying opinions","Practice abstract topic discussions"],["Grammar","Conditionals, passive voice","Use in writing practice"],["Vocabulary","AWL 3, health, education, work","Review all AWL sublists"]],
    },
    {
      kind: "examples",
      items: [{"en":"I can now handle academic discussions in the listening test.","tr":"I can now handle academic discussions in the listening test.","ar":"يمكنني الآن التعامل مع المناقشات الأكاديمية في اختبار الاستماع."},{"en":"My academic writing style has improved significantly.","tr":"My academic writing style has improved significantly.","ar":"أسلوبي في الكتابة الأكاديمية تحسن بشكل ملحوظ."},{"en":"I am ready to move to Band 7–8+.","tr":"I am ready to move to Band 7–8+.","ar":"أنا مستعد للانتقال إلى المستوى 7–8+."}],
    },
  ],
};

const BAND3_LESSONS: Lesson[] = [
  {
    "id": "band3-listening-section3",
    "title": "Listening: Listen and Choose a Response",
    "subtitle": "Identify what a short utterance is doing",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Identify what a short utterance is doing. Choose a relevant response. Distinguish a polite request from a literal ability question."
      },
      {
        "kind": "p",
        "text": "This course follows TOEFL iBT from 21 January 2026. Listening includes Listen and Choose a Response, Listen to a Conversation, Listen to an Announcement, and Listen to an Academic Talk. A short utterance may request information, ask for help, make an offer or express a problem. The response must fit its communicative purpose and context. Repeating a word from the question does not make a reply appropriate. Polite forms such as “Could you tell me...” request information, not an account of the listener’s ability. These practice questions display written sources rather than audio. The linked choices are transcript-based comprehension practice and cannot measure listening recognition or reproduce adaptive delivery."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Identify speaker purpose, the information gap and relevant time or place. Read all responses and reject those that answer a different question, misuse the relationship or contradict the context."
      },
      {
        "kind": "p",
        "text": "Original transcript study: A student asks, 'Could you tell me where to collect the fieldwork forms?' A staff member replies, 'At the science office, just opposite the stairs. It closes at four today.' A second student asks, 'Would you mind checking this application before I submit it?' The tutor says, 'Of course—send me the final draft this afternoon.'"
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "For “Could you tell me where to collect the forms?”, “At the science office opposite the stairs” supplies a location. “Yes, I collected one yesterday” repeats the activity but does not answer where. For “Would you mind checking...?”, “Of course—send the draft” accepts the request."
      },
      {
        "kind": "p",
        "text": "Why it works: The choices are evaluated by communicative fit. The second reply also gives a practical next action. It does not treat a courteous request as a complaint or require a word-for-word echo."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not choose by repeated vocabulary alone. “Yes, I can” may be too incomplete for a request for specific information. Check whether a reply supplies the requested action or detail."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Give a relevant response to “Do you know when the office closes today?” Check: “At four.” Explain why “Opposite the stairs” now answers the wrong question, although it was correct for location."
      },
      {
        "kind": "p",
        "text": "Independent practice: Write four short utterances: a request, offer, apology and information question. Ask a partner to read them without showing the text, then respond naturally. Compare meaning first; review listening difficulty separately from written-choice accuracy."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Choose the response that fits the utterance’s purpose, context and missing information."
      }
    ]
  },
  {
    "id": "band3-listening-lecture",
    "title": "Listening: Academic Talks, Structure and Qualified Claims",
    "subtitle": "Follow a contrast in an academic talk",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Follow a contrast in an academic talk. Link an example to its explanatory role. Distinguish a qualified claim from an absolute rule."
      },
      {
        "kind": "p",
        "text": "Listen to an Academic Talk requires comprehension of the speaker’s main idea, supporting details, relationships and purpose. Notes should reflect those links. A lecturer may compare two strategies that have a similar outcome but work through different mechanisms. Signal words help locate a transition, but the full explanation establishes its meaning. “May” and “can” preserve uncertainty or possibility; replacing them with “always” changes the claim. In this original illustrative account, no specialist entomology knowledge is required beyond what the talk explains. Visible transcript drills test interpretation of that account, not auditory comprehension. Use a partner-read version if you want a separate listening rehearsal."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Identify the topic and organising relationship. Make two short columns for the contrasted strategies. Put each example under its mechanism and add the lecturer’s final limitation."
      },
      {
        "kind": "p",
        "text": "Original academic-talk transcript: 'Some insects use colour to avoid predators, but colour can serve different functions. A leaf insect blends with its surroundings, making detection harder. A brightly patterned insect may instead be conspicuous: its pattern can warn a predator that attacking it is unpleasant. These strategies are different, even though both may reduce attacks. Colour alone is not enough to classify every species; behaviour and habitat also matter.'"
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "Notes: blending → harder to detect → leaf insect; conspicuous pattern → possible warning → unpleasant attack. Main idea: similar protective outcomes can arise through different colour mechanisms. The final sentence limits classification based on colour alone."
      },
      {
        "kind": "p",
        "text": "Why it works: The notes distinguish concealment from warning and link each example to its purpose. They do not treat conspicuous as a synonym for camouflaged. The final qualification prevents an overgeneralised classification rule."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Avoid copying every sentence, assigning a warning function to the leaf-insect example, or changing “can warn” into “always prevents every attack”."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Explain why the lecturer mentions a leaf insect. Check: it illustrates blending and reduced detection. Add the final qualification to your notes before comparing the two strategies."
      },
      {
        "kind": "p",
        "text": "Independent practice: Have a partner read a new short explanation contrasting two learning methods. Cover the text and note main claim, examples and limitation. After checking, retell the contrast in your own words and identify any word that changed the speaker’s level of certainty."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Track organising relationships, example functions and limits; topic words alone do not capture an academic talk."
      }
    ]
  },
  {
    "id": "band3-listening-multiple-speakers",
    "title": "Listening: Conversations, Problems and Implied Decisions",
    "subtitle": "Identify a problem and constraint",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Identify a problem and constraint. Follow alternatives to the accepted solution. Infer a speaker’s next action from the exchange."
      },
      {
        "kind": "p",
        "text": "Listen to a Conversation uses an exchange in which purpose, detail, attitude and implied meaning can all matter. Keep the speakers’ constraints separate. An alternative can be available yet unsuitable because it fails one condition. A final response such as “That should work” can show acceptance without repeating the whole proposal. Inference should remain bounded by the exchange: asking how to reserve a booth suggests an intention to use it, but does not prove the booking is complete. These written sources support conversation analysis through multiple-choice questions. They are not live conversations or audio assessment."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Write problem → constraint → alternatives → decision. For each option, ask whether it solves the stated problem on the required day. Distinguish an intended next step from an action already completed."
      },
      {
        "kind": "p",
        "text": "Original conversation transcript: Student: 'I booked a quiet room for our project interview, but the booking system now shows maintenance.' Assistant: 'The room is unavailable on Wednesday. There is a smaller room on Thursday afternoon.' Student: 'Our guest is only free on Wednesday.' Assistant: 'Then use the media booth. It has sound insulation, but you will need to borrow a portable recorder.' Student: 'That should work. How do I reserve it?'"
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "The original room cannot be used on Wednesday. Thursday’s room is unsuitable because the guest is unavailable. The media booth meets the day requirement and provides insulation; borrowing a recorder is a separate condition. The student appears to accept the booth and asks about reserving it."
      },
      {
        "kind": "p",
        "text": "Why it works: The interpretation connects each rejected option to the actual constraint and avoids claiming that a reservation already exists. It distinguishes the room’s sound feature from the equipment the student must obtain."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not choose an available room without checking the date. Do not infer that “should work” means the student dislikes the proposal. Availability of a booth does not imply a recorder is built in."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "List the two actions the student still needs to arrange. Check: reserve the booth and borrow a portable recorder. Explain which one is directly requested in the final question."
      },
      {
        "kind": "p",
        "text": "Independent practice: Create a short conversation about a changed appointment with one date constraint and two alternatives. Have a partner identify the accepted plan and the next action. Keep a transcript for review, and read it aloud separately if practising listening."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Good conversation notes preserve constraints, proposal status and the difference between intention and completion."
      }
    ]
  },
  {
    "id": "band3-reading-summary-completion",
    "title": "Reading: Complete the Words in Context",
    "subtitle": "Use a word’s visible letters and sentence role",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Use a word’s visible letters and sentence role. Check the whole paragraph’s meaning. Supply missing letters rather than an unrelated synonym."
      },
      {
        "kind": "p",
        "text": "Complete the Words is a current TOEFL Reading task family. Restoring partial words requires context as well as spelling. The surrounding syntax may require a plural noun, verb or adjective, while the rest of the paragraph narrows possible meanings. Do not complete a familiar-looking stem until the whole sentence makes sense. In the single-gap practice, the source shows the partial word and the answer field requests only its missing letters. The single blank is an answer field rather than a count of missing letters. This adaptation does not reproduce official multi-gap delivery or adaptive sequencing. The full passage is original and concerns a routine student experiment."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Read the unbroken context first. Identify the target word’s grammatical role and meaning. Combine the visible stem with a candidate ending, then reread the complete sentence and check spelling."
      },
      {
        "kind": "p",
        "text": "Original Complete the Words practice passage: A campus garden provides space for small experiments. Students comp____ observations before they draw conclu____. They record changes at reg____ intervals so that results from different weeks can be compared. The teacher checks each record for accu____ before the group discusses its findings."
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "comp+are → compare, a plural-subject present verb describing what students do to observations. conclu+sions → conclusions, a plural noun after “draw”. reg+ular → regular, an adjective describing intervals. accu+racy → accuracy, a noun after “for”."
      },
      {
        "kind": "p",
        "text": "Why it works: Grammar and meaning support each completion: observations are compared before conclusions are drawn; regular timing permits comparison; a record can be checked for accuracy. The answer field requests only the ending, so typing the whole word would not follow that practice instruction."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not type “compare” when the field asks for the missing letters after the stem comp. Avoid deciding from a stem alone or treating every missing ending as a plural-s."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Explain why “regularly” does not fit before “intervals”. Check: the noun needs an adjective here, not the adverb. Reread the whole paragraph with every word restored."
      },
      {
        "kind": "p",
        "text": "Independent practice: Write a new 80-word paragraph about an experiment, then remove endings from four different word classes. Ask another learner to restore them using both grammar and meaning. Verify that each completion is uniquely constrained; if several words fit, add context."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Use context, word class and spelling together; restore the exact word rather than choosing a loose synonym."
      }
    ]
  },
  {
    "id": "band3-reading-matching-features",
    "title": "Reading: Read in Daily Life—Notices and Practical Conditions",
    "subtitle": "Extract a practical action from a notice",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Extract a practical action from a notice. Distinguish collection and return rules. Interpret conditions rather than assuming permission."
      },
      {
        "kind": "p",
        "text": "Read in Daily Life uses practical written material such as notices, messages and information displays. Read for who must do what, where and when. A notice may state different times for collection and return. A conditional renewal is not an automatic extension. Do not import rules from familiar institutions: the answer comes from this text. A strong paraphrase keeps both the action and its condition. Efficient reading means finding the relevant section, then reading closely enough to avoid exchanging one deadline for another. The short source here is original teaching material, not an ETS item."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Identify purpose and audience. Mark actions, deadlines, exceptions and prohibited actions. For each question, locate the rule governing that exact stage rather than a nearby rule about a different stage."
      },
      {
        "kind": "p",
        "text": "Original daily-life notice: Equipment loans: Students may borrow a camera for up to three days. Collect reserved items between 12 and 2 pm at the media desk. Returns must be made in person before 4 pm on the due date. Do not place equipment in the book-return slot. For renewals, contact the desk before the due date; approval depends on other reservations."
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "If a camera is due today, the borrower must return it in person before 4 pm. The 12–2 pm window applies to collecting reserved items, not returning them. A renewal request must be made before the due date and may be refused if another reservation exists."
      },
      {
        "kind": "p",
        "text": "Why it works: The answer keeps collection and return separate and preserves the conditional nature of renewal. It also respects the explicit prohibition on the book-return slot rather than assuming every borrowed item uses the same return process."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not treat “up to three days” as exactly three in every case, interpret a request as approved, or ignore the in-person return instruction."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "A borrower wants to renew tomorrow when the item is due today. Explain the problem. Check: requests must be made before the due date, and approval is not guaranteed even when requested on time."
      },
      {
        "kind": "p",
        "text": "Independent practice: Find a real non-confidential public notice and write a plain-language action checklist for a specific user. Identify at least one condition and one potential confusion. Compare your checklist with the original wording to ensure it does not invent permission."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Practical reading connects the right action to the right time, location and condition."
      }
    ]
  },
  {
    "id": "band3-reading-flowchart",
    "title": "Reading: Academic Passages, Evidence and Author Purpose",
    "subtitle": "Identify the main claim in an academic paragraph",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Identify the main claim in an academic paragraph. Interpret a causal explanation. Distinguish a recommended adjustment from rejection of the method."
      },
      {
        "kind": "p",
        "text": "Read an Academic Passage asks for comprehension of explanations and relationships in non-specialist academic prose. A technical word can often be interpreted through the explanation that follows. Here turbulence refers to disturbed air movement around buildings; its importance is how it may affect water entering a sensor. The author’s purpose is not necessarily to prove a dramatic conclusion. A cautious recommendation can acknowledge a limitation while preserving a method’s usefulness. For inference questions, compare the whole option with the evidence and retain qualifiers such as “suggest” and “can”. This original short passage is a teaching sample, not a full official section."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Locate topic, observation, proposed explanation and recommendation. For vocabulary, try a meaning in the sentence. For purpose, ask what a detail contributes to the argument rather than merely restating the detail."
      },
      {
        "kind": "p",
        "text": "Original academic passage: A team studying urban rainfall compared sensors on rooftops with sensors in nearby open spaces. Rooftop readings varied more during strong winds. The researchers suggest that turbulence around buildings can alter the amount of water entering a sensor. They do not conclude that rooftop data are worthless. Instead, they recommend recording each sensor's surroundings so comparisons can account for local conditions."
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "Main claim: sensor surroundings should be recorded because local wind conditions may affect comparisons. The rooftop/open-space comparison provides evidence of differing variation. “Rooftop readings are worthless” is wrong because the authors explicitly reject that conclusion."
      },
      {
        "kind": "p",
        "text": "Why it works: The interpretation links the observed variation to a possible mechanism and a practical response. It does not turn a suggested explanation into a universal law or confuse greater variability with a consistently higher rainfall total."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not assume varied readings always mean more rainfall, infer that every rooftop sensor fails, or select a dictionary meaning without checking its role in the paragraph."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Explain the purpose of mentioning strong winds. Check: it identifies a condition under which rooftop readings varied more and supports the proposed turbulence explanation."
      },
      {
        "kind": "p",
        "text": "Independent practice: Write a short summary containing observation, possible explanation and recommended action. Then test whether a reader could reconstruct those three relationships. Add a cautious inference and identify the source clause that supports it."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Academic reading follows the argument’s observation, explanation and conclusion while preserving the writer’s certainty."
      }
    ]
  },
  {
    "id": "band3-writing-multiple-charts",
    "title": "Writing: Write for an Academic Discussion",
    "subtitle": "Contribute an original position to a classroom thread",
    "xpReward": 60,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Contribute an original position to a classroom thread. Develop a reason and example. Respond to peers without merely copying their posts."
      },
      {
        "kind": "p",
        "text": "The current TOEFL task asks for a contribution to an online academic discussion. You have ten minutes, and ETS teaching guidance recommends an effective response of at least 100 words. Development, clarity, relevant language and engagement with the discussion matter more than reproducing a memorised introduction. You need not disagree with both classmates or mention both names mechanically. Use their ideas where relevant, then add a reason, consequence, condition or example of your own. This is not IELTS Task 2: do not assume a 250-word essay or forty-minute allowance. The existing drill types can evaluate planning and revision choices; they do not score a complete discussion response."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Identify the professor’s question and classmates’ positions. Decide your view, add a developed reason or example, and connect any peer reference to your own contribution. Check relevance and sentence control."
      },
      {
        "kind": "p",
        "text": "Original discussion prompt: Professor Lane asks whether first-year students should choose one broad elective outside their main subject. Mina supports it because it may reveal new interests. Leo worries that it reduces time for core modules. Contribute your own view and develop it with reasons."
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "Complete original model contribution; not an official scored response:\n\nI would support one elective if students can choose from a manageable list and receive advice about workload. Mina is right that exploring another field can reveal interests, but the benefit is greater when students can connect it with their main studies. For example, a biology student taking an introductory statistics class could learn tools for interpreting later laboratory results. Leo's concern about time is also reasonable, so the elective should replace another optional requirement rather than simply add hours to an already full timetable. This would preserve a serious opportunity to explore while limiting unnecessary pressure. The aim should be a useful connection between subjects, not collecting unrelated credits merely to satisfy a rule."
      },
      {
        "kind": "p",
        "text": "Why it works: The contribution adds a workload condition and a subject-specific example. It recognises both benefits and costs but maintains a clear position. The proposed replacement of another requirement explains how the compromise would work rather than merely naming it."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not copy Mina’s post, write an unrelated personal history, invent research data or assume that mentioning names automatically demonstrates meaningful engagement."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Add one sentence explaining a risk of an entirely unrestricted elective choice. Check one possible extension: prerequisites may make some modules unsuitable for beginners, so advisers should identify accessible options."
      },
      {
        "kind": "p",
        "text": "Independent practice: Set a ten-minute timer and write a different response to the professor’s question with your own example. Aim for adequately developed communication, then check coverage, relevance and language. Ask a reader what new idea your post contributes. The multiple-choice score is only analysis practice."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Answer the discussion, develop your contribution and use peer ideas meaningfully; length or agreement alone does not determine quality."
      }
    ]
  },
  {
    "id": "band3-writing-maps-processes",
    "title": "Writing: Write an Email—Purpose, Detail and Tone",
    "subtitle": "Address every requested action in an email",
    "xpReward": 60,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Address every requested action in an email. Match tone to the recipient. Propose a specific and feasible next step."
      },
      {
        "kind": "p",
        "text": "Write an Email is part of the TOEFL format introduced in 2026. The situation can be academic or social, and the email must achieve a communication goal. ETS guidance gives seven minutes to read and respond. Do not impose the retired Integrated Writing task or an IELTS letter formula on this format. Read who will receive the email and what each instruction asks you to do. A greeting alone does not establish appropriate tone: requests, explanations and closing should also suit the relationship. The existing platform has no extended email editor, so lesson practice is written independently and the linked drills analyse communication choices rather than grade actual email ability."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Mark recipient, purpose and required points. Draft a clear opening, develop the essential details and offer a specific action. Check dates, references and whether the recipient can realistically act on the request."
      },
      {
        "kind": "p",
        "text": "Original email situation: You organised a student exhibition and booked a projector from the media office. It stopped working during rehearsal. Write to the coordinator, Ms. Rivera: explain what happened, describe the event’s needs, and propose a practical solution."
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "Complete original model email:\n\nDear Ms. Rivera,\n\nI am writing about the projector we borrowed for Friday's student exhibition. During yesterday's rehearsal, it switched off after a few minutes. We checked the power cable and tried another socket, but the same problem occurred.\n\nThe exhibition begins at six in the evening, and several students need to display short films. Without a reliable projector, an important part of the event would be missing. We expect around forty visitors, so a small laptop screen would not be a suitable alternative.\n\nWould it be possible to exchange the unit before Thursday afternoon? I can bring it to the media office after my morning class and test a replacement there. If none is available, could you advise us about borrowing one from another department?\n\nThank you for your help.\nBest regards,\nSam"
      },
      {
        "kind": "p",
        "text": "Why it works: The opening identifies the equipment and event. The account describes what was tried without blaming the coordinator. The middle explains why the projector matters, and the request supplies a deadline, a proposed exchange and a fallback. The tone is courteous and practical."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not replace explanation with a demand, omit the practical solution, invent a promise from the recipient, or treat an arbitrary word count as the definition of task fulfilment."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Underline one sentence meeting each requested point in the model. Check: rehearsal failure; films and forty visitors; exchange before Thursday with testing and an alternative department as fallback."
      },
      {
        "kind": "p",
        "text": "Independent practice: Write your own seven-minute email for a different situation: a room booked for a workshop is unavailable. Explain the problem, describe the workshop’s needs and suggest an alternative arrangement. Review all required points, social tone and clear next action; do not infer a score from length."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "An effective email enables the reader to understand the problem and act on a well-developed, appropriate request."
      }
    ]
  },
  {
    "id": "band3-writing-discussion",
    "title": "Writing: Build a Sentence—Word Forms and Agreement",
    "subtitle": "Choose word forms that fit a sentence",
    "xpReward": 60,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Choose word forms that fit a sentence. Reconstruct a complete statement. Check agreement and complements in practical academic writing."
      },
      {
        "kind": "p",
        "text": "Build a Sentence requires a grammatical response in context, so recognising a word family is useful only when you identify its sentence role. A description is a noun; descriptive is an adjective; describe is a verb. After a subject such as each record, the present verb normally takes singular agreement. After becomes, an adjective can describe the resulting state. A sentence can be well formed but still express the wrong time or relationship, so check its meaning as well. This lesson uses the existing word-order and choice practice to support the current TOEFL Writing task rather than treating missing-word reading as a Writing requirement."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Identify subject and finite verb. Place the object or complement, then check each supplied word’s grammatical role. Read the complete statement to confirm that it describes the intended procedure."
      },
      {
        "kind": "p",
        "text": "Original sentence-building context: A research assistant describes a revised laboratory procedure. Intended statements: 'The revised procedure reduces unnecessary delays.' 'Each record includes a clear description.' 'Additional evidence becomes available after testing.'"
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "“The revised procedure reduces unnecessary delays.” uses singular reduces with procedure and plural delays as its object. “Each record includes a clear description.” needs the noun description after the article and adjective. “Additional evidence becomes available after testing.” uses an adjective complement after becomes."
      },
      {
        "kind": "p",
        "text": "Why it works: The examples match word form to function rather than selecting a related-looking form. Singular procedure and each record take singular verbs; available describes the state of evidence without turning it into an action."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Avoid “a clear describe”, “each record include” and “evidence becomes availability”. Do not rearrange only the first clause and leave an incomplete phrase after it."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Explain why description fits after “a clear” but descriptive does not complete that noun phrase. Check: the phrase needs a noun head, while descriptive would require a noun to follow it."
      },
      {
        "kind": "p",
        "text": "Independent practice: Write four complete statements about a real or fictional study procedure. Use one word family in different grammatical roles across the statements. Reconstruct each from a shuffled word list, then check subject–verb agreement and whether every word has a clear role."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Word families help sentence building when grammatical role, agreement and intended meaning are all preserved."
      }
    ]
  },
  {
    "id": "band3-writing-advantages",
    "title": "Writing: Build a Sentence—Statements and Questions",
    "subtitle": "Reconstruct a grammatical sentence or question",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Reconstruct a grammatical sentence or question. Distinguish direct from embedded question order. Check agreement and every supplied token."
      },
      {
        "kind": "p",
        "text": "Build a Sentence is a current TOEFL Writing task. You arrange words or phrases to form a complete grammatical response in context. Find the main clause and whether it is a statement or question before moving pieces. A direct question can invert an auxiliary and subject: “Why do these results differ?” An embedded question inside “Could you explain...” normally uses statement order: “why these results differ”. Do not insert another inversion just because the whole utterance is a question. The sentence-building practice shuffles individual words and asks for one exact sequence. It is a supported sentence-building adaptation, with supplied punctuation attached to tokens; it does not duplicate ETS’s fixed-slot interface."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Identify the clause frame and finite verb. Place subject, verb and complements, then connect any embedded clause. Use each supplied token once. Read the full sentence for both grammar and contextual meaning."
      },
      {
        "kind": "p",
        "text": "Original sentence-building situation: A student asks a tutor for advice about a presentation. Intended question: “Could you explain why these results differ?” A separate statement is: “The slides include several useful examples.”"
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "“Could you explain why these results differ?” begins with a polite main-clause question and embeds “why these results differ” in statement order. “The slides include several useful examples.” agrees with the plural subject slides. Both sentences serve the presentation-advice context."
      },
      {
        "kind": "p",
        "text": "Why it works: The first solution distinguishes two clause levels, avoiding “why do these results differ” inside the request. The second uses include rather than includes because its subject is plural."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not add or omit words, change punctuation to force an answer, or invert the embedded clause. A grammatical but different sentence may fail the exact supplied-token exercise."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Compare “Could you explain why do these results differ?” with the intended question. Remove the extra direct-question frame inside the embedded clause. Say how the structure changes when the question stands alone."
      },
      {
        "kind": "p",
        "text": "Independent practice: Write three requests using “Could you explain why/when/how...?” and three direct questions with the same content. Check the difference in word order. Then create sentence-building items with clear, uniquely intended word order."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Build the clause structure first; embedded questions use statement order within the main question."
      }
    ]
  },
  {
    "id": "band3-writing-task-response",
    "title": "Writing: Email Task Fulfilment and Actionable Requests",
    "subtitle": "Cover every communication requirement",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Cover every communication requirement. Develop essential logistical detail. Use a polite request without inventing an agreement."
      },
      {
        "kind": "p",
        "text": "A successful email does more than mention a topic. The recipient should understand what happened and what response is needed. Separate the task’s required actions, then give each enough detail to be useful. A scheduling problem needs the unavailable time and a proposed alternative, not a lengthy apology with no next step. Asking whether material is needed is different from claiming it has already been requested. Adjust directness to the relationship, while keeping the message concise and clear. The linked choices inspect coverage and communication; these choices do not evaluate a complete email or assign a TOEFL Writing score."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "List required actions in plain words: explain conflict, offer alternative, ask about preparation. Draft one meaningful section for each. Check the recipient’s likely next action and whether times are unambiguous."
      },
      {
        "kind": "p",
        "text": "Original email task: A professor has invited you to a meeting about a student research project. You cannot attend the proposed Friday 10 am meeting because of a compulsory lab. Explain the conflict, suggest another time, and ask whether you should send any material in advance."
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "Original model: “Dear Professor Chen, Thank you for inviting me to discuss the research project. I have a compulsory laboratory session at 10 am on Friday, so I cannot attend then. Would Friday after 2 pm suit you instead? I am also available on Monday morning. Please let me know whether you would like a short project outline before we meet; I can send it on Thursday. Thank you for considering another time. Best regards, Amina.”"
      },
      {
        "kind": "p",
        "text": "Why it works: The message develops all three requested actions. It states the conflict, gives alternatives and asks about advance preparation. Its conditional request respects the professor’s availability instead of announcing a new meeting as if confirmed."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not apologise repeatedly while omitting alternatives. Avoid “We will meet at two” before agreement, and do not substitute an unrelated project biography for the preparation question."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Identify one sentence for each demand in the model. Now revise “Change the meeting” into an appropriately courteous request with a specific alternative. Check: “Would Friday after 2 pm suit you instead?”"
      },
      {
        "kind": "p",
        "text": "Independent practice: Write a seven-minute email about a different scheduling conflict. Include the exact unavailable slot, two realistic alternatives and one relevant preparation question. Review coverage before polishing vocabulary. Ask a reader whether they know what to do next."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Clear coverage and useful logistics matter more than a long apology; a request is not a confirmed arrangement."
      }
    ]
  },
  {
    "id": "band3-writing-formality",
    "title": "Writing: Academic Discussion Development and Register",
    "subtitle": "Extend a peer idea with a mechanism",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Extend a peer idea with a mechanism. Make a relevant concession. Use appropriate academic language without inflated or absolute wording."
      },
      {
        "kind": "p",
        "text": "An academic discussion contribution should make a clear, relevant point and develop it. Formality means suitability to the setting, not using the longest possible synonym. Simple words such as help, people and problem are not automatically wrong. A contraction is not an automatic failure; judge tone and clarity within the whole response. Address a classmate’s reasoning when it helps your own argument, and add an explanation or concrete application. You can acknowledge a concern without abandoning your position. The current task is a short developed contribution to the specific classroom discussion."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Choose a position and explain why it would work. Use one peer reference only where it connects to your point. Add a specific design feature or example, then check that every sentence contributes to the debate."
      },
      {
        "kind": "p",
        "text": "Original classroom thread: Professor Kim asks whether group projects should include an individual reflection. Rosa says reflections reveal what each person learned. Dilan worries that students may repeat what they think the teacher wants to hear."
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "Worked contribution excerpt: “I would include a short reflection, but ask students to discuss one decision they changed during the project. Rosa’s point about learning is persuasive because this prompt makes students explain their thinking, not just list tasks. Dilan’s concern is reasonable; comparing the reflection with a draft or meeting note could reduce rehearsed praise.”"
      },
      {
        "kind": "p",
        "text": "Why it works: The writer supports a reflection with a specific prompt design and explains its purpose. The concession responds to Dilan by proposing evidence, rather than dismissing the concern. This is a developed excerpt, not a complete timed response or an official score example."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not repeat a peer’s conclusion without adding reasoning, replace a clear verb with an unnatural phrase, or claim that one reflection proves every student’s contribution perfectly."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Add an example of a changed decision. Check: a group might replace a broad survey with focused interviews after finding its first questions unclear. Explain what a reflection on that change could reveal."
      },
      {
        "kind": "p",
        "text": "Independent practice: Write an original ten-minute contribution of at least about 100 words. Use one specific way to make reflection useful and one acknowledged limitation. Review clarity and development before replacing vocabulary. Ask what your post adds beyond the existing thread."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Appropriate register supports a developed contribution; clear reasoning and specific examples matter more than decorative language."
      }
    ]
  },
  {
    "id": "band3-speaking-part3",
    "title": "Speaking: Listen and Repeat—Accuracy and Meaning Groups",
    "subtitle": "Distinguish repetition from paraphrase",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Distinguish repetition from paraphrase. Preserve small grammatical words. Organise a heard sentence into meaningful groups."
      },
      {
        "kind": "p",
        "text": "Listen and Repeat is one of the current TOEFL Speaking task families. The goal is accurate, intelligible repetition of what is heard. Do not add a personal opinion or replace words with synonyms as if summarising a lecture. Articles, plurals, prepositions and endings contribute to accuracy. Meaning groups can support short-term retention: identify who does what and where, then reproduce the actual wording. A written source can explain this strategy but cannot measure perception, recall from audio or intelligibility. These lesson drills use visible text and do not capture a spoken response. Use a partner and an external recorder for a separate listening-and-speaking rehearsal."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Listen for the complete meaning. Retain its clause and phrase groups. Repeat at an intelligible natural pace, preserving the heard wording. Compare your recording with the source for omissions, substitutions and unclear sounds."
      },
      {
        "kind": "p",
        "text": "Original repetition preparation script: “The museum opens at nine.” “Please leave your bags beside the entrance.” “The guide will meet visitors near the information desk.” The intended activity is to hear each sentence and repeat it accurately, not paraphrase it."
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "For “The guide will meet visitors near the information desk”, possible memory groups are “The guide / will meet visitors / near the information desk”. The required repetition is the original sentence. “A guide meets people by a desk” conveys a related idea but substitutes wording and changes grammatical detail."
      },
      {
        "kind": "p",
        "text": "Why it works: Grouping supports retention without turning the response into a summary. The exact sentence preserves the article, future auxiliary, plural noun and location phrase. Its pronunciation must still be checked from actual speech."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not omit the or will, replace visitors with students, invent an introduction or speed up until endings become unclear. Text-choice accuracy is not a pronunciation result."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Have someone read the first sentence once while you cover it. Repeat and compare: “The museum opens at nine.” Identify any missing-s or article; then try the longer sentences."
      },
      {
        "kind": "p",
        "text": "Independent practice: Ask a partner to read four new campus-direction sentences, one at a time. Repeat each once and record externally. Classify errors as omission, substitution or delivery difficulty. Practise a single recurring issue before trying new sentences."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Repeat the wording accurately and intelligibly; paraphrase is a different skill and written choices cannot assess delivery."
      }
    ]
  },
  {
    "id": "band3-speaking-opinions",
    "title": "Speaking: Take an Interview—Relevant Developed Answers",
    "subtitle": "Answer an interview question directly",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Answer an interview question directly. Develop a reason with a specific example. Keep detail relevant and understandable."
      },
      {
        "kind": "p",
        "text": "Take an Interview elicits spoken responses to questions about experiences, choices and views in accessible contexts. The current format does not require the retired integrated campus announcement plus conversation summary. Respond to the interviewer’s actual demand. A personal example can make a reason concrete, but it should support the answer rather than displace it. Use a flexible sequence—answer, reason, example, brief connection—when useful, without treating it as a scoring formula. The text drills inspect planning and relevance. An external recording is needed to review fluency, intelligibility and language control in an actual answer."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Identify what must be described and what must be explained. State the main answer early, choose one relevant detail and show why it matters. Stop when the point is developed rather than adding an unrelated story."
      },
      {
        "kind": "p",
        "text": "Original interview prompt: Tell us about a way you organise your study time. Explain why it helps you. Model: “I divide a large assignment into small tasks and put the first deadline two days before submission. That gives me time to notice gaps. For example, when I prepared a history presentation, the early deadline showed that one section lacked evidence, so I could find another source before rehearsing.”"
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "The model names a method—breaking down assignments and using an early deadline. It explains the benefit—time to find gaps. The presentation example shows the benefit in action: a missing-evidence section could be repaired before rehearsal."
      },
      {
        "kind": "p",
        "text": "Why it works: The example has a clear problem, action and consequence. It gives evidence for the speaker’s personal reason without inventing a universal claim that this method suits everyone or guarantees high scores."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not answer only “I use a timetable”, recite an unrelated memorised speech, or claim that elaborate vocabulary compensates for failing to answer why the method helps."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Add a possible limitation to the model without abandoning its main point. Check: unexpected work can disrupt a timetable, so the speaker leaves a spare study session. Explain how that detail remains related to organisation."
      },
      {
        "kind": "p",
        "text": "Independent practice: Record an answer to “Describe a skill you learned outside class and explain its value.” Use your own experience. Listen for relevance, a developed reason and intelligibility, then repeat with a different example instead of memorising the model."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "A relevant direct answer plus a concrete reason and example produces useful interview development; delivery needs spoken evidence."
      }
    ]
  },
  {
    "id": "band3-speaking-toefl4",
    "title": "Speaking: Listen and Repeat—Longer Clauses and Precision",
    "subtitle": "Retain dependent clauses and contrasts",
    "xpReward": 60,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Retain dependent clauses and contrasts. Preserve word order and small function words. Review accuracy separately from meaning alone."
      },
      {
        "kind": "p",
        "text": "Longer repetition sentences place more demands on retention and intelligible delivery. Relative clauses can identify which people a direction concerns, while although can contrast a closed area with an open one. Dropping a clause may change who should act or which facility is available. Chunking helps retain relationships, but the response must preserve the original wording rather than reconstruct a broadly similar message. Practise gradually longer sentences and review recurring errors from recordings. These written examples prepare the skill; they are not a TOEFL audio task and do not provide an automated spoken score."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Identify the main clause and any clause identifying people, time or contrast. Retain the sequence of meaning groups. After repeating, compare exact words and listen for endings and stress that clarify the relationship."
      },
      {
        "kind": "p",
        "text": "Original longer repetition preparation: “Visitors who arrive after the tour begins should wait near reception.” “Although the main gallery is closed, the exhibition on the upper floor remains open.” “Please return the audio guide before you leave through the eastern exit.”"
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "For the first sentence: “Visitors who arrive after the tour begins / should wait near reception.” The relative clause identifies late arrivals; omitting it wrongly turns the direction into one for all visitors. In the second sentence, the main gallery is closed but the upper-floor exhibition remains open; changing “although” to “because” changes the relationship."
      },
      {
        "kind": "p",
        "text": "Why it works: The explanation shows why apparently small omissions matter. Accuracy includes who acts, under what condition and where. A related meaning is useful for memory but does not excuse replacing the words in a repetition response."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not substitute before for after, omit remains, or merge eastern exit with reception. Avoid practising only reading aloud and then claiming it measures recall after listening."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Cover the source while a partner reads the third sentence once. Repeat it. Check whether you retained “before you leave” and “eastern”. Explain the practical meaning change if either disappears."
      },
      {
        "kind": "p",
        "text": "Independent practice: Prepare six new sentences of increasing length. Have a partner read them once without showing them first. Record your repetitions externally and classify accuracy and intelligibility issues separately. Revisit one difficult structure, then use a fresh sentence to test transfer."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Long sentences still require exact wording; clauses and function words often carry the essential condition or contrast."
      }
    ]
  },
  {
    "id": "band3-grammar-conditionals",
    "title": "Grammar for Writing: Sentence Building with Questions and Conditions",
    "subtitle": "Place auxiliaries in direct questions",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Place auxiliaries in direct questions. Use statement order in embedded questions. Build a conditional sentence with a complete main clause."
      },
      {
        "kind": "p",
        "text": "Sentence-building practice should serve current TOEFL tasks. A direct present-simple question can use does before a singular subject, followed by the base verb. An embedded whether-clause uses statement order rather than another direct-question inversion. A condition introduces a circumstance for the main clause; it cannot replace that main clause. “If places remain” specifies when students may register, without promising that places will remain. In email and discussion writing, these structures help ask a clear question or make a qualified proposal. Do not label every hypothetical sentence a mixed conditional; terminology should follow the actual time relationship."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Identify question or statement. Find the finite verb for each clause, place the subject correctly and attach the condition or embedded question. Use all provided words exactly once in the reorder adaptation."
      },
      {
        "kind": "p",
        "text": "Original writing context: A student asks about joining a workshop. Intended direct question: “When does registration close?” Intended embedded question: “Please explain whether registration remains open.” Conditional statement: “If places remain, students may register online.”"
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "“When does registration close?” uses does+registration+base close. “Please explain whether registration remains open” embeds a statement-order clause. “If places remain, students may register online” contains both a condition and the complete main clause students may register online."
      },
      {
        "kind": "p",
        "text": "Why it works: The first question avoids “does registration closes”. The embedded clause keeps registration before remains. The conditional expresses permission in a possible circumstance rather than guaranteeing availability."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Avoid extra inversion inside whether-clauses, third-person-s after does, and fragments consisting only of an if-clause. Reorder punctuation belongs to the supplied token."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Compare “Does registration closes?” with the correct direct question. Explain which word carries present-tense marking. Check: does carries it; close stays in the base form."
      },
      {
        "kind": "p",
        "text": "Independent practice: Create three workshop questions and two conditional instructions. Turn each direct question into an embedded request. Check grammar and whether the resulting sentence still asks the same thing. Use the linked reorder items for exact-token reconstruction."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Each clause needs its own grammar: direct questions invert appropriately, embedded clauses retain statement order, and conditions need a main clause."
      }
    ]
  },
  {
    "id": "band3-grammar-passive",
    "title": "Grammar for Writing: Active, Passive and Reference",
    "subtitle": "Choose active or passive according to focus",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Choose active or passive according to focus. Preserve time and agency. Use a relative clause to express eligibility clearly."
      },
      {
        "kind": "p",
        "text": "Current TOEFL writing benefits from clear sentence control in sentence building, email and discussion. Passive voice is not automatically more academic or more objective. Use active when the actor matters and passive when the action or affected item is the focus. Keep the same tense and meaning when transforming a sentence. A relative clause can identify which students a rule applies to; dropping it may change permission for everyone. The passive form combines be with a past participle. Equipment is uncountable in this ordinary sense and takes was rather than were. Choose forms that serve the communication rather than accumulating passive constructions."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Identify actor, action and affected item. Decide what the reader needs first. Retain tense and any important condition, then check agreement and pronoun reference."
      },
      {
        "kind": "p",
        "text": "Original lab message: Staff checked the safety equipment on Monday. The equipment was checked before the practical class. Students who have completed induction may use the room. Students without induction must arrange training first."
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "Active: “Staff checked the equipment on Monday.” Passive: “The equipment was checked on Monday.” Both describe the completed check. “Students who have completed induction may use the room” limits access to a defined group; it does not say training is optional."
      },
      {
        "kind": "p",
        "text": "Why it works: The transformed sentence preserves the event and time. Omitting staff is reasonable when the message focuses on equipment readiness; keep the actor if responsibility matters. The relative clause preserves the eligibility condition."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not use “was check”, change a completed check into a future promise, or omit the induction clause and thereby widen permission. Avoid treating every active sentence as informal."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Transform “Staff will inspect the room tomorrow” into passive. Check: “The room will be inspected tomorrow.” Identify why “was inspected” would change the meaning."
      },
      {
        "kind": "p",
        "text": "Independent practice: Write a short email about a room being prepared for an activity. Use one active sentence where the actor matters and one passive where the prepared item matters. State any access condition explicitly and review agreement."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Voice changes focus; it should preserve the event, time and conditions rather than simply make a sentence longer."
      }
    ]
  },
  {
    "id": "band3-vocab-awl3",
    "title": "Reading and Vocabulary: Word Families, Evidence and Hedging",
    "subtitle": "Infer an academic word’s contextual meaning",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Infer an academic word’s contextual meaning. Distinguish suggest from prove. Use word families without changing the certainty of a claim."
      },
      {
        "kind": "p",
        "text": "Vocabulary questions test the meaning that fits this passage, not merely a memorised definition. Academic verbs carry different evidential strength: suggests is more cautious than proves. “Consistent with” indicates compatibility, not necessarily an exact replication or a causal explanation. Word families also have different grammatical roles: observe is a verb, observation a noun, and observational an adjective. Reading and writing both require control of these distinctions. A fixed list labelled an Academic Word List sublist should not be claimed unless its membership is verified; this lesson teaches selected useful vocabulary in context instead. No individual word has an automatic TOEFL score value."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Try the candidate meaning in the sentence. Check grammar, certainty and relationship to nearby claims. For your own writing, select the verb that matches the evidence rather than the most emphatic one."
      },
      {
        "kind": "p",
        "text": "Original academic context: A small trial suggests that spaced practice may improve recall. The result is consistent with an earlier classroom observation, but the researchers do not claim that the method guarantees success for every learner. Further work will examine whether the effect persists over longer intervals."
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "“Suggests” here means provides tentative support for, not conclusively proves. “Persists” means continues over time. A faithful summary is “The initial evidence is compatible with a benefit, but its longer-term reach remains to be investigated.”"
      },
      {
        "kind": "p",
        "text": "Why it works: The summary keeps both support and uncertainty. It does not confuse an earlier classroom observation with a guarantee or convert a small trial into a universal result."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Avoid changing may to will for stylistic variety, treating consistent with as caused by, or inserting a related word family member that does not fit the sentence."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Explain the meaning difference between “The trial suggests a benefit” and “The trial proves a benefit for every learner.” Check: the second raises both certainty and scope beyond the source."
      },
      {
        "kind": "p",
        "text": "Independent practice: Choose six academic words from a new paragraph. Record each word’s meaning in that context, grammatical role and one natural collocation. Write a paraphrase preserving the author’s certainty, then compare it with the source."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Vocabulary accuracy includes context, grammar and evidential strength; a stronger synonym can make an answer wrong."
      }
    ]
  },
  {
    "id": "band3-vocab-health",
    "title": "Reading: Health Research, Comparisons and Causal Limits",
    "subtitle": "Interpret an outcome that combines actions",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Interpret an outcome that combines actions. Distinguish association from established causation. Read health-related prose using the evidence supplied."
      },
      {
        "kind": "p",
        "text": "Academic passages can discuss health without requiring specialist medical knowledge. Identify the groups, intervention, outcome and limitation. An outcome combining attendance or rescheduling differs from attendance alone. If group assignment was not random, a difference may reflect other group characteristics. The passage can support a promising association while withholding a causal conclusion. Do not import assumptions about treatment effectiveness or personal health decisions. This fictional example teaches research comprehension, not medical guidance. For TOEFL reading, the relevant skill is understanding what the author claims and why a limitation is introduced."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Make a compact comparison: message A, message B, measured outcome, uncertainty. For each option, check whether it preserves the combined outcome and the strength of the conclusion."
      },
      {
        "kind": "p",
        "text": "Original fictional academic passage: Researchers compared two reminder messages for voluntary campus health appointments. One gave only the appointment date; the other included the date and a link to change the booking. More recipients of the second message attended or rescheduled. Because participants were not randomly assigned, the report cautions that other differences between the groups may have affected the result. It recommends a randomised follow-up rather than claiming that the link alone caused the improvement."
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "Supported summary: “Including a change-booking link was associated with more attendance or rescheduling, but the non-random groups prevent a firm causal conclusion.” Unsupported summary: “The link proved a health treatment works.” No treatment was tested, and the outcome was booking behaviour."
      },
      {
        "kind": "p",
        "text": "Why it works: The supported version names the actual difference and outcome while retaining the author’s limitation. The unsupported version changes both the intervention and the certainty of the evidence."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not read attended or rescheduled as attended only, assume equal groups without evidence, or infer a medical benefit from an appointment-booking outcome."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Explain why a randomised follow-up is recommended. Check: it would help address the possibility that pre-existing group differences affected results. It would not by itself turn booking behaviour into a treatment outcome."
      },
      {
        "kind": "p",
        "text": "Independent practice: Write three questions about the passage: one detail, one purpose and one inference. Supply a source-based explanation for each. Make one distractor that changes the outcome and another that exaggerates certainty, then explain why both fail."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Read the measured outcome and the stated limits precisely; promising association is not automatically established causation."
      }
    ]
  },
  {
    "id": "band3-vocab-education",
    "title": "Listening: Announcements, Changes and Required Actions",
    "subtitle": "Identify changed and unchanged details",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Identify changed and unchanged details. Connect a condition to an action deadline. Distinguish an offered alternative from a promise."
      },
      {
        "kind": "p",
        "text": "Listen to an Announcement is a current TOEFL task family. Announcements often combine a changed arrangement with details that remain in force. Create a mental before/after comparison rather than treating every number as a new option. Reasons, deadlines and next actions can be separate question targets. A conditional instruction applies only to the relevant group: someone who can attend the new date may not need to act. Qualifications such as cannot promise matter to the practical meaning. This original visible transcript supports strategy study; it is not an audio item. Ask a partner to read it once while the text is covered for a separate rehearsal."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Identify purpose, change, continuity and action. Mark the audience for each instruction. Keep the response deadline separate from the new event date and retain any limit on alternatives."
      },
      {
        "kind": "p",
        "text": "Original announcement transcript: 'The study-skills workshop planned for Tuesday in Room 6 has moved to Thursday in Room 9 because the trainer is unavailable. It will still begin at 2 pm. Existing registrations remain valid. If you cannot attend on Thursday, email the learning centre by Wednesday noon; we can offer materials but cannot promise a place at the next workshop.'"
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "Changed:Tuesday→Thursday and Room 6→Room 9. Unchanged:2 pm start and existing registrations. Action for those unable to attend: email by Wednesday noon. Alternative: materials can be offered, but a future workshop place is not guaranteed."
      },
      {
        "kind": "p",
        "text": "Why it works: The summary separates date, room and action deadline. It also distinguishes available support from an unconfirmed future place, preventing the common error of treating every offered alternative as assured."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not cancel an existing registration unnecessarily, use Wednesday as the new workshop date, or claim that emailing guarantees a place next time."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "A registered student is free on Thursday. What does the announcement require them to do? Check: no new registration is specified; the existing one remains valid. They should attend at the new room and date."
      },
      {
        "kind": "p",
        "text": "Independent practice: Write a short announcement with one changed detail, one unchanged detail, a reason and a conditional action. Have a partner read it aloud once. Create an action checklist, then compare it with the transcript and classify any confusion."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Announcement comprehension requires changes, continuity, conditions and limits—not just remembering the last date mentioned."
      }
    ]
  },
  {
    "id": "band3-vocab-work",
    "title": "Reading: Daily-Life Messages and Workplace Inference",
    "subtitle": "Extract preparation instructions from a message",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Extract preparation instructions from a message. Calculate an arrival time. Keep a change request distinct from permission."
      },
      {
        "kind": "p",
        "text": "Practical reading often requires connecting two explicit details rather than finding one repeated phrase. A 9 am start and a fifteen-minute-early instruction imply an 8.45 am arrival. That calculation does not permit assuming extra unpaid work, travel time or other unstated conditions. Notice what must be brought and what is supplied. Conditional changes require a request and approval, not simply choosing a preferred date. Employment vocabulary such as shift, coordinator and supervisor gains meaning through the message’s relationships. This is an original Read in Daily Life practice text; it is not legal or employment advice and does not reproduce an official TOEFL item."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Highlight start/end, arrival requirement, items to bring and conditional action. Convert each relevant detail into a checklist. For an inference, identify exactly which supplied facts combine to support it."
      },
      {
        "kind": "p",
        "text": "Original workplace message: 'Your training shift is scheduled for Monday from 9 am to 1 pm. Please arrive fifteen minutes early to collect a visitor badge. Bring identification, but do not bring safety clothing; a jacket will be provided. If you need to change the shift, contact the coordinator before Friday at 3 pm. A change depends on supervisor availability.'"
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "Checklist: arrive at 8.45 am, collect a visitor badge, bring identification, use the supplied jacket. If the shift needs changing, contact the coordinator before Friday 3 pm; do not assume a replacement until supervisor availability is checked."
      },
      {
        "kind": "p",
        "text": "Why it works: The arrival time follows from the stated 15-minute lead. The clothing instruction distinguishes supplied equipment from personal preparation. The change procedure preserves its approval condition."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not arrive at 9.15 am, confuse the contact deadline with the shift date, or infer that a request guarantees approval. Do not bring a jacket because the word appears without reading the negation."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Explain why 8.45 am is supported but 8.30 am is not required. Check: the message specifies fifteen minutes before 9 am, not half an hour. It does not prevent arriving earlier, but that is a different claim."
      },
      {
        "kind": "p",
        "text": "Independent practice: Create a checklist from another non-confidential appointment message. Include one simple time inference and one condition. Ask a reader to identify which instructions are explicit and which conclusions require combining details."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Practical inference must be traceable to the text; preparation and permission each depend on their own instruction."
      }
    ]
  },
  {
    "id": "band3-paraphrasing",
    "title": "Speaking: Interview Comparison and Precise Paraphrasing",
    "subtitle": "Make a clear comparison on a shared dimension",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Make a clear comparison on a shared dimension. Develop a personal example. Paraphrase a prompt without changing its demand."
      },
      {
        "kind": "p",
        "text": "Interview questions can request a preference and supporting experience. Answer both. Compare the alternatives on the same dimension—feedback, pace, access or motivation—rather than naming unrelated advantages. A qualified preference can still be clear: you might favour a group for initial feedback and individual practice later. Paraphrase does not mean replacing every word or changing learning with performing. When you cannot recall a precise term, explain the idea plainly instead of stopping for a rare synonym. Actual fluency and intelligibility must be reviewed from speech; the linked text drills only examine response content and planning."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Choose a main preference or clearly stated conditional preference. Name the comparison dimension, illustrate it with an experience and connect the example back to the choice. Check both demands before finishing."
      },
      {
        "kind": "p",
        "text": "Original interview prompt: Do you prefer learning a new skill alone or with other people? Explain your choice and describe a situation that helped you decide. Model idea: Learning basic photography with a small group provided immediate feedback, but practising alone afterwards allowed experimentation without slowing others down."
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "Worked answer excerpt: “For the first stage of learning, I prefer a small group because someone can notice errors immediately. When I learned photography, a classmate spotted that I was focusing on the background instead of the subject. After that session, I practised alone so I could try different settings at my own pace.”"
      },
      {
        "kind": "p",
        "text": "Why it works: The answer states a preference with a stage condition and gives a specific feedback example. Independent practice is a qualification that develops the preference rather than contradicting it. The response does not claim one method suits all learners."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not compare group feedback with an unrelated solo holiday, answer preference without the requested situation, or paraphrase the prompt into a question about teaching other people."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Identify the common comparison dimensions in the model. Check: immediate feedback and control of practice pace. Add one sentence connecting the experience to the preference without repeating the whole example."
      },
      {
        "kind": "p",
        "text": "Independent practice: Record a response using a different skill and a different experience. Ask a listener to identify your preference and reason. If they cannot, revise the opening and connection before trying more complex vocabulary."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Clear comparison, relevant experience and faithful paraphrase support an interview response; text choices do not establish spoken performance."
      }
    ]
  },
  {
    "id": "band3-error-analysis",
    "title": "Writing: Error Analysis and Meaning-Preserving Revision",
    "subtitle": "Prioritise errors affecting clarity and task fulfilment",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Prioritise errors affecting clarity and task fulfilment. Correct agreement, time reference and embedded questions. Preserve the writer’s intended request."
      },
      {
        "kind": "p",
        "text": "Editing should improve a real email or discussion response, not simply identify isolated rules. First check whether the required communication is complete. Then repair errors that affect sentence meaning or control. Agree is a verb and does not need am. A plural existential construction usually uses there are in standard edited English. A completed time expression such as yesterday normally takes past simple. Embedded questions after “tell me” use statement order. Do not replace every clear everyday word with an inflated synonym. A revision is successful when the reader understands the same intended message more accurately."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Check purpose and required points. Find each clause’s subject and finite verb. Review time expressions and question structure, then reread the whole message for tone and consistent meaning."
      },
      {
        "kind": "p",
        "text": "Original email draft: “Dear Coordinator, I am agree with the workshop plan. There is several students who needs a later session. We have discussed this yesterday. Could you tell me when does the second session begin? We would appreciate an afternoon option because our labs end at noon.”"
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "Revised message: “Dear Coordinator, I agree with the workshop plan. There are several students who need a later session. We discussed this yesterday. Could you tell me when the second session begins? We would appreciate an afternoon option because our labs end at noon.”"
      },
      {
        "kind": "p",
        "text": "Why it works: The revision removes the extra am, aligns plural agreement, uses past simple for yesterday and restores statement order inside the embedded question. It retains the reason for the request and a courteous tone. It does not invent a confirmed afternoon session."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not correct individual verbs while omitting the actual request. Avoid “when does the second session begin” inside tell me, or changing a request into an accusation merely to make it shorter."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Explain why “There are several students who need...” has two relevant plural agreements. Check: are agrees with the plural existential noun phrase, and need agrees with students through who."
      },
      {
        "kind": "p",
        "text": "Independent practice: Write an email asking about a schedule change, then review coverage, agreement, tense, question order and tone in that order. Keep a before/after version and explain every correction. Have another reader check that no intended meaning disappeared."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Revision should preserve purpose while improving control; specific error patterns are more useful than a general claim that writing is weak."
      }
    ]
  },
  {
    "id": "band3-practice-essay",
    "title": "Writing: Timed Email and Academic Discussion Practice",
    "subtitle": "Plan two current TOEFL writing tasks",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Plan two current TOEFL writing tasks. Develop actual responses under separate time limits. Review task fulfilment before language decoration."
      },
      {
        "kind": "p",
        "text": "Practise the current TOEFL email and academic discussion tasks. Use seven minutes for the email and ten minutes for the academic discussion, following ETS teaching guidance. These tasks are part of a Writing section that also includes Build a Sentence; this pair alone is not a complete section. No official email minimum is imposed here. For discussion, aim for a developed contribution of at least about 100 words rather than padding. Work in a plain editor without assistance for independent rehearsal. The linked analysis questions review plans and language decisions; write the complete responses separately for feedback."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "For the email, identify shortage, event requirements and proposed action. For the discussion, choose a position, develop a reason and address a relevant cost/access issue. After timing, review coverage, organisation, grammar and appropriateness separately."
      },
      {
        "kind": "p",
        "text": "Original timed writing pair: Email—A university garden group promised to lend tools for a public event, but several are missing. Write to the organiser: explain the shortage, describe what the event needs, and propose a solution. Discussion—Professor Hale asks whether practical skills workshops should be free. Bea favours free access; Arun worries about covering materials and instructor costs. Contribute your view."
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "Email plan: missing tools → explain the number and type needed → request a partial loan plus a safe fallback. Discussion plan: free introductory sessions can widen access; optional advanced sessions or a materials fund could cover costs. Example opening: “I would make introductory workshops free, but budget explicitly for materials so access does not depend on a student’s ability to buy equipment.”"
      },
      {
        "kind": "p",
        "text": "Why it works: The plans answer each communication demand and identify a practical trade-off. The discussion adds a funding mechanism rather than merely agreeing with Bea. The excerpts show planning, not complete scored responses."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not spend the email only apologising, ignore costs in the discussion, or apply the retired 20-minute Integrated Writing procedure. A timer finishing does not mean a response is successful."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "For each task, label one required point that a weak response might omit. Check: the email may forget a feasible solution; the discussion may favour free access without explaining how necessary costs are handled."
      },
      {
        "kind": "p",
        "text": "Independent practice: Write both responses with separate timers. Underline each requested email action and the discussion’s new developed idea. Revise one unclear sentence and one underdeveloped point. Ask a reader for qualitative feedback on the actual work; do not convert drill accuracy into a section score."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Timed rehearsal needs actual writing and a coverage review; linked analysis questions support it but do not replace it."
      }
    ]
  },
  {
    "id": "band3-review",
    "title": "TOEFL iBT 2026: Format, Score Terminology and Study Review",
    "subtitle": "Identify all current task families",
    "xpReward": 50,
    "blocks": [
      {
        "kind": "callout",
        "tone": "note",
        "title": "Learning objectives",
        "text": "Identify all current task families. Distinguish official score scales from local drill accuracy. Plan evidence-based practice across all four skills."
      },
      {
        "kind": "p",
        "text": "From 21 January 2026, TOEFL iBT reports four section scores and an overall score on a 1–6 scale in half-point increments. During the two-year transition after January 2026, a comparable overall 0–120 score is also provided. Do not treat the previous 0–30 section scale or IELTS bands as the current primary reporting system. ETS describes adaptive Reading and Listening, so actual time and item totals can vary. Published approximate base figures are Reading 50 items/30 minutes,Listening 47/29,Writing 12/23 and Speaking 11/8; directions are additional and candidates should allow about two hours. A local fixed quiz does not reproduce that adaptive process. Raw accuracy here cannot be defensibly converted into an official score."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Practical strategy",
        "text": "Review each task family and collect the relevant evidence: contextual reading answers, genuine audio comprehension, reconstructed sentences, full email and discussion responses, and recorded repetitions and interviews. Revise one specific weakness at a time."
      },
      {
        "kind": "p",
        "text": "Current TOEFL review: Reading—Complete the Words, Read in Daily Life, Read an Academic Passage. Listening—Listen and Choose a Response, Listen to a Conversation, Listen to an Announcement, Listen to an Academic Talk. Writing—Build a Sentence, Write an Email, Write for an Academic Discussion. Speaking—Listen and Repeat, Take an Interview."
      },
      {
        "kind": "callout",
        "tone": "rule",
        "title": "Worked example",
        "text": "A learner with 18 correct choices out of 20 has 90% accuracy on that set. They do not therefore have a 5.5 TOEFL score. If the set used visible transcripts, it also cannot establish listening ability. A useful next step is to rehearse with official audio and obtain feedback on actual written and spoken responses."
      },
      {
        "kind": "p",
        "text": "Why it works: The interpretation preserves a useful local achievement while separating it from calibrated official scoring and unmeasured skills. The required practice evidence depends on the task, not on the XP earned."
      },
      {
        "kind": "callout",
        "tone": "warning",
        "title": "Common mistakes",
        "text": "Do not present retired Integrated Writing or old integrated campus Speaking as current requirements. Do not call a TOEFL level Band 7, infer pronunciation from text, or assume a fixed classroom quiz is adaptive."
      },
      {
        "kind": "callout",
        "tone": "tip",
        "title": "Guided practice",
        "text": "Identify which current family each activity belongs to: arranging words into a question; repeating a heard sentence; requesting a replacement in an email. Check:Build a Sentence;Listen and Repeat;Write an Email."
      },
      {
        "kind": "p",
        "text": "Independent practice: Create a four-skill weekly plan using official samples for audio and delivery practice, plus these original lesson drills for explanation and revision. Save a full email, discussion post and spoken recording. Review task achievement, clarity and language with a qualified teacher where available; retain raw quiz accuracy as local feedback only."
      },
      {
        "kind": "callout",
        "tone": "note",
        "title": "Recap",
        "text": "Use the current task families and 1–6 terminology; practice evidence, XP and official test scores are different measures."
      }
    ]
  }
];

// ─── Band 7–8+ (Advanced) Lessons ─────────────────────────

const band4Lesson1: Lesson = {
  id: "band4-listening-accents",
  title: "Listening: Difficult Accents, Connected Speech & Phonetic Traps",
  subtitle: "Mastering British, Australian & North American fast audio",
  xpReward: 60,
  blocks: [
    {
      kind: "p",
      text: "In IELTS Listening Sections 3 and 4, speakers do not pronounce words in isolation. Fast natural speech causes sounds to link, change (assimilation), or vanish entirely (elision). High-band candidates train their ears to decode connected speech and avoid common auditory traps.",
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The 3 Fatal Phonetic Traps in IELTS Audio",
      text: "1. The '-teen' vs '-ty' Number Trap: In fast Australian and British audio, 'fifteen' and 'fifty' sound nearly identical. Solution: Listen for word stress. 'FifTEEN' stresses the second syllable; 'FIFty' stresses the first.\n2. Elision (Vanishing Consonants): In phrases like 'last month', the /t/ sound disappears, sounding like 'las' month'. In 'post office', it sounds like 'pos' office'.\n3. Intrusion (Ghost Sounds): In British and Australian speech, words ending in vowels insert an unwritten /r/ or /w/ sound before another vowel (e.g., 'law and order' sounds like 'lore and order').",
    },
    {
      kind: "table",
      headers: ["Phenomenon","Written Text","What You Actually Hear in Audio","Examiner Note"],
      rows: [
        ["Elision of /t/ & /d/","'He held a second meeting'","'He held a secon' meeting'","The /d/ is dropped before consonants."],
        ["Weak Form of 'have'","'The committee would have approved'","'The committee would've approved' (/wʊdəv/)","Unstressed 'have' reduces to a weak schwa."],
        ["Australian Vowel Shift","'The date of the flight is May 8th'","Sounds like 'die-te of the flight'","Australian /eɪ/ shifts toward /aɪ/."],
        ["Intrusive /r/ Link","'Drawing a diagram'","'Draw-ring a diagram'","British speakers insert /r/ between vowels."]
      ],
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Authentic Section 4 Lecture Audio Excerpt",
      text: "Professor (British RP):\n'Now, turning to our primary archaeological data set, the excavation team discovered fifteen—repeat, one-five—copper ingots at the harbor site. Initial carbon tests were thought to be inconclusive; however, subsequent mass spectrometry verified that the metal could have originated only from Cypriot mines.'",
    },
    {
      kind: "examples",
      items: [
        { en: "Listen for the stress on the final syllable to distinguish fifteen (/fɪfˈtiːn/) from fifty (/ˈfɪfti/).", tr: "Stress on -teen is high and sustained; stress on -ty is front-loaded.", ar: "استمع إلى النبر على المقطع الأخير للتمييز بين 15 و 50." },
        { en: "In fast connected speech, unstressed auxiliary verbs reduce to a simple schwa sound (/ə/).", tr: "'Would have' is heard as 'would've' (/wʊdəv/).", ar: "في الكلام السريع المتصل، تتقلص الأفعال المساعدة غير المنبورة إلى صوت الشوا البسيط." },
        { en: "Do not panic when British speakers insert an unwritten 'r' between consecutive vowel sounds.", tr: "Phrases like 'media interest' sound like 'media-r-interest'.", ar: "لا تقلق عندما يدرج المتحدثون البريطانيون صوت 'r' غير مكتوب بين حرفي علة متتاليين." }
      ],
    },
  ],
};

const band4Lesson2: Lesson = {
  id: "band4-listening-inference",
  title: "Listening: Inference & Implied Meaning",
  subtitle: "Reading between the lines",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Advanced listening requires understanding implied meaning. Speakers use tone, emphasis, and indirect language to convey meaning. 'That's an interesting idea' might mean 'I disagree'. 'Are you sure about that?' might express doubt. Listen for context, tone, and what is NOT said.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Inference Indicators",
      text: "Hesitation ('Well...', 'I suppose...') often signals doubt. Emphasis on certain words changes meaning. Sarcasm: 'Great job' can be positive or negative. Questions as suggestions: 'Have you considered...?' is often a polite suggestion.",
    },
    {
      kind: "table",
      headers: ["Statement","Literal Meaning","Implied Meaning"],
      rows: [["That's an interesting perspective.","It is interesting.","I might disagree."],["I'll try to come.","I will attempt to come.","I probably won't come."],["Are you sure that's a good idea?","Asking for confirmation.","I think it's a bad idea."]],
    },
    {
      kind: "examples",
      items: [{"en":"The speaker's hesitation suggests uncertainty.","tr":"The speaker's hesitation suggests uncertainty.","ar":"تردد المتحدث يشير إلى عدم اليقين."},{"en":"She said it was 'interesting', which implied disapproval.","tr":"She said it was 'interesting', which implied disapproval.","ar":"قالت إنه 'مثير للاهتمام'، مما يعني الرفض."},{"en":"Listen carefully to tone of voice for implied meanings.","tr":"Listen carefully to tone of voice for implied meanings.","ar":"استمع بعناية لنبرة الصوت للمعاني الضمنية."}],
    },
  ],
};

const band4Lesson3: Lesson = {
  id: "band4-listening-distractors",
  title: "Listening: Multiple Choice with Distractors",
  subtitle: "Tricky answer options",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "At the advanced level, multiple choice questions use sophisticated distractors. Common types: 1) Both options are mentioned but only one is correct. 2) Speaker corrects themselves. 3) Two speakers disagree. 4) Qualifying words like 'possibly', 'probably' change meaning.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Advanced Distractor Detection",
      text: "Listen for correction phrases: 'Actually...', 'Wait, I mean...', 'Let me correct myself...'. Listen for qualifiers: 'possibly', 'probably', 'maybe', 'sometimes', 'in some cases'.",
    },
    {
      kind: "table",
      headers: ["Distractor Type","Signal Words","Example"],
      rows: [["Self-correction","Actually, I mean, that is","It was 2010... actually 2011."],["Qualification","Possibly, maybe, probably","The results are probably valid."],["Change of mind","On second thought, perhaps","Let's go to the cafe... actually, the library."],["False agreement","That's true, but...","That's true, but the cost is too high."]],
    },
    {
      kind: "examples",
      items: [{"en":"The speaker corrected the date from Tuesday to Wednesday.","tr":"The speaker corrected the date from Tuesday to Wednesday.","ar":"صحح المتحدث التاريخ من الثلاثاء إلى الأربعاء."},{"en":"He said the results are 'probably valid', not definitely.","tr":"He said the results are 'probably valid', not definitely.","ar":"قال إن النتائج 'ربما صحيحة'، وليس بالتأكيد."},{"en":"Listen for self-corrections — they often contain the answer.","tr":"Listen for self-corrections — they often contain the answer.","ar":"استمع للتصحيحات الذاتية — غالباً ما تحتوي على الإجابة."}],
    },
  ],
};

const band4Lesson4: Lesson = {
  id: "band4-reading-writers-views",
  title: "Reading: Identifying Writer's Views",
  subtitle: "Yes/No/Not Given",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "This question type tests your ability to identify the writer's opinion. 'Yes' means the writer expresses this view. 'No' means the writer expresses a contrary view. 'Not Given' means the writer does not express any view. Look for opinion markers: 'I believe', 'the author argues', 'it is claimed'.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Writer's View vs Fact",
      text: "Distinguish between: reporting others' views ('Some people think...') vs the writer's own view ('I believe...'). Focus on what the WRITER thinks, not what others think. 'No' requires the writer to explicitly state the opposite.",
    },
    {
      kind: "table",
      headers: ["Question Type","Tests","Key Clue"],
      rows: [["True/False/NG","Facts in the passage","Explicit information"],["Yes/No/NG","Writer's opinions/claims","'The writer argues', 'I believe'"],["No","Writer states opposite view","'However, I disagree...'"],["Not Given","Writer doesn't give opinion","Writer reports but doesn't endorse"]],
    },
    {
      kind: "examples",
      items: [{"en":"The writer argues that climate change is the biggest threat.","tr":"The writer argues that climate change is the biggest threat.","ar":"يجادل الكاتب بأن تغير المناخ هو أكبر تهديد."},{"en":"The author does not express an opinion on this matter.","tr":"The author does not express an opinion on this matter.","ar":"المؤلف لا يعبر عن رأي في هذه المسألة."},{"en":"The writer disagrees with the commonly held view.","tr":"The writer disagrees with the commonly held view.","ar":"يختلف الكاتب مع الرأي السائد."}],
    },
  ],
};

const band4Lesson5: Lesson = {
  id: "band4-reading-difficult-texts",
  title: "Reading: Dealing with Difficult Texts",
  subtitle: "Unknown vocabulary strategies",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "At Band 7+, passages contain sophisticated vocabulary. When encountering unknown words: 1) Use context clues. 2) Identify the word's function. 3) Look for definitions (parentheses, dashes, 'which means'). 4) Recognize prefixes/suffixes. 5) Decide if you need the word to answer.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Vocabulary in Context",
      text: "Look for: 'which means', 'also known as', 'or rather', 'specifically', 'i.e.', 'e.g.' If the word is defined in the text, it tests your understanding of the concept, not the vocabulary itself.",
    },
    {
      kind: "table",
      headers: ["Clue Type","Signal","Example"],
      rows: [["Definition","which means, that is, i.e.","Photosynthesis — the process plants use to produce energy"],["Example","such as, for example, including","Nocturnal animals, such as bats and owls..."],["Word parts","Prefixes, suffixes, roots","'Preindustrial' = before ('pre') industry"],["Restatement","in other words, or rather","The findings were inconclusive, or rather, not clear enough"]],
    },
    {
      kind: "examples",
      items: [{"en":"Use context clues to understand unknown vocabulary.","tr":"Use context clues to understand unknown vocabulary.","ar":"استخدم القرائن السياقية لفهم المفردات غير المعروفة."},{"en":"The term 'photosynthesis' is defined within the text.","tr":"The term 'photosynthesis' is defined within the text.","ar":"مصطلح 'التمثيل الضوئي' معرف داخل النص."},{"en":"Prefixes and suffixes can help you guess word meanings.","tr":"Prefixes and suffixes can help you guess word meanings.","ar":"البادئات واللواحق يمكن أن تساعدك في تخمين معاني الكلمات."}],
    },
  ],
};

const band4Lesson6: Lesson = {
  id: "band4-reading-time-pressure",
  title: "Reading: Time Pressure Strategies",
  subtitle: "20 min per passage",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "With only 20 minutes per passage, efficiency is critical. Advanced strategies: 1) Read questions FIRST (30 seconds). 2) Skim for structure (2 minutes). 3) Answer in order but skip difficult ones (15 minutes). 4) Use last 2-3 minutes for guessing and checking.",
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Time Pressure Tips",
      text: "If you spend more than 2 minutes on one question, move on. Answer ALL questions — no penalty for wrong answers. Guess intelligently: eliminate obviously wrong options first. The last few minutes are for maximizing points.",
    },
    {
      kind: "table",
      headers: ["Time Budget","Action","Strategy"],
      rows: [["0–0:30","Read questions only","Identify question types and keywords"],["0:30–2:30","Skim passage","Read title, headings, first sentences"],["2:30–17:30","Answer questions","Easy first, skip hard ones, return"],["17:30–20:00","Review and guess","Check spelling, fill all answers"]],
    },
    {
      kind: "examples",
      items: [{"en":"Read the questions before the passage to save time.","tr":"Read the questions before the passage to save time.","ar":"اقرأ الأسئلة قبل النص لتوفير الوقت."},{"en":"Skip difficult questions and come back to them later.","tr":"Skip difficult questions and come back to them later.","ar":"تجاوز الأسئلة الصعبة وعد إليها لاحقاً."},{"en":"Always make a guess — there is no negative marking.","tr":"Always make a guess — there is no negative marking.","ar":"خمن دائماً — لا توجد علامات سلبية."}],
    },
  ],
};

const band4Lesson7: Lesson = {
  id: "band4-writing-sophisticated",
  title: "IELTS General Task 1: Three-Register Letter Masterclass",
  subtitle: "Formal, semi-formal & informal blueprints with Band 9 models",
  xpReward: 60,
  blocks: [
    {
      kind: "p",
      text: "IELTS General Training Task 1 requires a 150-word letter written within 20 minutes. The primary criterion is register consistency: mixing formal vocabulary with informal phrasing or using contractions in a formal letter is heavily penalized.",
    },
    {
      kind: "table",
      headers: ["Register","Recipient Context","Salutation","Contractions?","Sign-off Formula"],
      rows: [
        ["Formal","Unknown official, company manager, city council","Dear Sir or Madam,","Strictly NO (I am, do not)","Yours faithfully,"],
        ["Semi-Formal","Named landlord, employer, child's school teacher","Dear Mr. Henderson,","Strictly NO (I would, cannot)","Yours sincerely,"],
        ["Informal","Close personal friend, peer, family member","Dear Liam, / Hi Maya,","YES (I'm, we'd, don't)","Warm regards, / All the best,"]
      ],
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Model 1: Formal Letter to City Council (158 words)",
      text: "Dear Sir or Madam,\n\nI am writing to draw your urgent attention to the precarious traffic conditions at the intersection of Oakfield Avenue and Elm Road, adjacent to St. Jude’s Primary School.\n\nOver the past six months, vehicular volume along this thoroughfare has escalated substantially, largely due to recent commercial development. Unfortunately, the absence of a designated pedestrian crossing or speed-calming measures forces dozens of school children and elderly residents to navigate high-speed traffic daily. Just last Tuesday, a near-fatal collision occurred involving a cyclist.\n\nTo alleviate these perilous conditions, I urge the municipal council to install a pelican crossing equipped with pedestrian-activated signals. Furthermore, lowering the speed threshold to twenty miles per hour during peak drop-off hours would significantly mitigate collision risks.\n\nI trust the council will treat this matter with the gravitas it warrants and implement preventive safeguards promptly.\n\nYours faithfully,\n\nEleanor Vance",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Model 2: Semi-Formal Letter to Landlord (154 words)",
      text: "Dear Mr. Henderson,\n\nI am writing to notify you of a persistent malfunction with the central heating boiler in Apartment 4B, which I have leased from you since February.\n\nThree days ago, the boiler began emitting a loud rattling noise, after which hot water and radiator heating ceased entirely. Given that overnight temperatures have dipped below freezing this week, the apartment has become virtually uninhabitable. I have attempted to reset the pressure valve according to the manufacturer manual, but the pilot light fails to ignite.\n\nAs heating is stipulated as a landlord responsibility under clause 8 of our tenancy agreement, I would be grateful if you could arrange for a certified heating engineer to inspect and rectify the unit urgently.\n\nPlease inform me by telephone as soon as a technician has been scheduled so I can ensure property access.\n\nYours sincerely,\n\nMarcus Sterling",
    },
    {
      kind: "examples",
      items: [
        { en: "I am writing to express my dissatisfaction with the quality of customer service.", tr: "I am writing to express my dissatisfaction with the quality of customer service.", ar: "أكتب لأعرب عن استيائي من جودة خدمة العملاء." },
        { en: "I would appreciate it if you could attend to this urgent maintenance request.", tr: "I would appreciate it if you could attend to this urgent maintenance request.", ar: "سأكون ممتناً لو تمكنت من الاهتمام بطلب الصيانة العاجل هذا." },
        { en: "Can't wait to catch up properly once you land in Melbourne next weekend!", tr: "Can't wait to catch up properly once you land in Melbourne next weekend!", ar: "لا أطيق الانتظار حتى نلتقي ونقضي وقتاً رائعاً بمجرد وصولك إلى ملبورن نهاية الأسبوع المقبل!" }
      ],
    },
  ],
};

const band4Lesson8: Lesson = {
  id: "band4-writing-complex-comparisons",
  title: "IELTS General Reading: Workplace & Public Notices Masterclass",
  subtitle: "Factual scanning, policy interpretation & eliminating traps",
  xpReward: 60,
  blocks: [
    {
      kind: "p",
      text: "Section 1 and 2 of the IELTS General Reading test evaluate your ability to navigate practical English in the workplace and everyday life. Passages consist of corporate handbooks, facility rules, staff contracts, and training announcements. The challenge lies in subtle eligibility qualifiers and temporal conditions.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Authentic Notice: Corporate Time Off in Lieu (TOIL) Policy",
      text: "'Employees required to work beyond standard contractual hours (37.5 hours weekly) during mandatory project sprints may accrue Time Off in Lieu (TOIL), subject to prior line-manager authorization. TOIL cannot be claimed for voluntary weekend work or routine email monitoring outside regular business hours. Accrued hours must be redeemed within 60 calendar days of the sprint conclusion; any unclaimed balance exceeding 15 hours will be forfeited automatically without financial compensation.'",
    },
    {
      kind: "table",
      headers: ["Test Statement","Text Condition","Analysis","Exam Answer"],
      rows: [
        [
          "Staff can claim TOIL for checking work emails from home on Sundays.",
          "TOIL cannot be claimed for voluntary weekend work or routine email monitoring...",
          "Direct contradiction: the policy expressly forbids claiming TOIL for routine email checks.",
          "FALSE"
        ],
        [
          "Prior approval from a line manager is mandatory before overtime can count as TOIL.",
          "...subject to prior line-manager authorization.",
          "Exact factual agreement: 'mandatory' matches 'subject to prior authorization'.",
          "TRUE"
        ],
        [
          "Employees receive cash bonuses for TOIL hours that expire after 60 days.",
          "...any unclaimed balance exceeding 15 hours will be forfeited automatically without financial compensation.",
          "Direct contradiction: hours are forfeited *without* financial compensation.",
          "FALSE"
        ]
      ],
    },
    {
      kind: "examples",
      items: [
        { en: "Scan specifically for numerical conditions, time limits, and negative qualifiers.", tr: "Scan specifically for numerical conditions, time limits, and negative qualifiers.", ar: "ابحث عن الشروط الرقمية والمهل الزمنية والمحددات السلبية." },
        { en: "Overtime accrual is strictly contingent upon prior managerial authorization.", tr: "Overtime accrual is strictly contingent upon prior managerial authorization.", ar: "يخضع استحقاق ساعات العمل الإضافي لموافقة إدارية مسبقة بشكل صارم." },
        { en: "Unclaimed balances lapse automatically after the designated sixty-day window.", tr: "Unclaimed balances lapse automatically after the designated sixty-day window.", ar: "تسقط الأرصدة غير المطالب بها تلقائياً بعد انقضاء المهلة المحددة بستين يوماً." }
      ],
    },
  ],
};

const band4Lesson9: Lesson = {
  id: "band4-writing-complex-ideas",
  title: "Writing Task 2: Complex Ideas Logically",
  subtitle: "Developing arguments deeply",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "At Band 7+, each paragraph should have a clear topic sentence followed by a logical sequence: main idea → explanation → evidence → result. Use reasoning chains: 'This is because...', 'which means that...', 'as a result...', 'consequently...'.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "The 5-Sentence Paragraph",
      text: "S1: Topic sentence. S2: Explain what you mean. S3: Give a specific example. S4: Explain the result. S5: Link to the next paragraph. This structure ensures depth and coherence.",
    },
    {
      kind: "table",
      headers: ["Sentence","Function","Example"],
      rows: [["1 - Topic","State main idea","Education is crucial for economic development."],["2 - Explanation","Clarify your point","This is because an educated workforce is more productive."],["3 - Evidence","Give concrete example","For instance, South Korea invested heavily in education."],["4 - Result","Explain consequence","As a result, its economy grew rapidly in the 1990s."],["5 - Link","Connect to next point","Similarly, other developing nations could follow this model."]],
    },
    {
      kind: "examples",
      items: [{"en":"Education is crucial for economic development because it creates a skilled workforce.","tr":"Education is crucial for economic development because it creates a skilled workforce.","ar":"التعليم ضروري للتنمية الاقتصادية لأنه يخلق قوى عاملة ماهرة."},{"en":"For instance, countries that invested in education saw significant GDP growth.","tr":"For instance, countries that invested in education saw significant GDP growth.","ar":"على سبيل المثال، البلدان التي استثمرت في التعليم شهدت نمواً كبيراً في الناتج المحلي الإجمالي."},{"en":"Consequently, governments should prioritize education funding above other expenditures.","tr":"Consequently, governments should prioritize education funding above other expenditures.","ar":"وبالتالي، يجب على الحكومات إعطاء الأولوية لتمويل التعليم فوق النفقات الأخرى."}],
    },
  ],
};

const band4Lesson10: Lesson = {
  id: "band4-writing-lexical-resource",
  title: "Writing Task 2: Lexical Resource (Band 7+)",
  subtitle: "Less common vocabulary",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "For Band 7+, use 'less common' vocabulary naturally. 'Mitigate the effects', 'address the issue', 'implement policies'. Avoid simple words: 'exacerbate' (make worse), 'mitigate' (make less severe), 'facilitate' (make easier), 'implement' (put into action).",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Band 7+ Lexical Resource",
      text: "Use: 'exacerbate', 'mitigate', 'prioritize', 'facilitate', 'implement', 'encompass', 'advocate', 'contend'. Always use correct collocations: 'hold a belief', not 'have a belief'.",
    },
    {
      kind: "table",
      headers: ["Band 5-6","Band 7","Band 8+"],
      rows: [["solve the problem","address the issue","tackle the underlying problem"],["make better","improve","enhance / ameliorate"],["use","utilize","employ / harness"],["show","demonstrate","illustrate / exemplify"],["cause","lead to","give rise to / precipitate"]],
    },
    {
      kind: "examples",
      items: [{"en":"The government should implement policies to mitigate climate change.","tr":"The government should implement policies to mitigate climate change.","ar":"يجب على الحكومة تنفيذ سياسات للتخفيف من تغير المناخ."},{"en":"Education can facilitate social mobility and reduce inequality.","tr":"Education can facilitate social mobility and reduce inequality.","ar":"يمكن للتعليم تسهيل الحراك الاجتماعي وتقليل عدم المساواة."},{"en":"Technological advancements have exacerbated the digital divide.","tr":"Technological advancements have exacerbated the digital divide.","ar":"التقدم التكنولوجي فاقم الفجوة الرقمية."}],
    },
  ],
};

const band4Lesson11: Lesson = {
  id: "band4-writing-grammatical-range",
  title: "Writing Task 2: Grammatical Range & Accuracy",
  subtitle: "Complex structures",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "For Band 7+, use a mix of simple, compound, and complex sentences. Include: 1) Conditionals. 2) Relative clauses. 3) Passive voice. 4) Inversion. 5) Participle clauses. Complex structures must be used accurately — errors reduce your score.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Sentence Variety Checklist",
      text: "In each essay: At least 2 conditionals. At least 3 relative clauses. At least 1 passive structure. At least 1 sentence with 'which' referring to a whole clause. At least 1 participle clause.",
    },
    {
      kind: "table",
      headers: ["Structure","Example","Effect"],
      rows: [["Conditional","If governments invest, economies will grow.","Cause and effect"],["Relative clause","Education, which is a fundamental right, must be free.","Add information"],["Passive","It is widely believed that...","Objective tone"],["Participle","Having analyzed the data, I conclude...","Concise complex structure"]],
    },
    {
      kind: "examples",
      items: [{"en":"Having considered both perspectives, I believe that education should be prioritized.","tr":"Having considered both perspectives, I believe that education should be prioritized.","ar":"بعد النظر في كلا المنظورين، أعتقد أنه يجب إعطاء الأولوية للتعليم."},{"en":"Technology, which has transformed every aspect of our lives, continues to evolve rapidly.","tr":"Technology, which has transformed every aspect of our lives, continues to evolve rapidly.","ar":"التكنولوجيا، التي غيرت كل جانب من جوانب حياتنا، تواصل التطور بسرعة."},{"en":"If more resources were allocated to healthcare, outcomes would improve significantly.","tr":"If more resources were allocated to healthcare, outcomes would improve significantly.","ar":"إذا تم تخصيص المزيد من الموارد للرعاية الصحية، لتحسنت النتائج بشكل ملحوظ."}],
    },
  ],
};

const band4Lesson12: Lesson = {
  id: "band4-writing-band8-essay",
  title: "Writing Task 2: Full Band 8 Sample Essay",
  subtitle: "Analysis of what works",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Here is a sample Band 8 essay on technology and employment. Notice: clear position, fully developed paragraphs, sophisticated vocabulary, a range of complex sentences, and perfect task response.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Band 8 Essay Analysis",
      text: "Introduction: Paraphrases question, gives clear position. Body 1: First argument with example (automation in manufacturing). Body 2: Second argument (new jobs in tech). Conclusion: Summarizes with nuanced view. Each paragraph has topic sentence, explanation, example, and link.",
    },
    {
      kind: "table",
      headers: ["Criterion","What the Essay Does Well","Band 7+ Features"],
      rows: [["Task Response","Fully addresses all parts","Clear position throughout"],["Coherence/Cohesion","Logical paragraph progression","Effective use of linking"],["Lexical Resource","Natural sophisticated vocabulary","'exacerbate', 'mitigate', 'harness'"],["Grammatical Range","Mix of structures","Conditionals, passives, participles"]],
    },
    {
      kind: "examples",
      items: [{"en":"This essay demonstrates sophisticated vocabulary and complex grammar.","tr":"This essay demonstrates sophisticated vocabulary and complex grammar.","ar":"يوضح هذا المقال مفردات متطورة وقواعد معقدة."},{"en":"Each paragraph develops one clear idea with supporting evidence.","tr":"Each paragraph develops one clear idea with supporting evidence.","ar":"كل فقرة تطور فكرة واحدة واضحة مع أدلة داعمة."},{"en":"The conclusion offers a balanced and nuanced perspective.","tr":"The conclusion offers a balanced and nuanced perspective.","ar":"الخاتمة تقدم منظوراً متوازناً ودقيقاً."}],
    },
  ],
};

const band4Lesson13: Lesson = {
  id: "band4-speaking-storytelling",
  title: "Speaking Part 2: Advanced Storytelling",
  subtitle: "Fluency and coherence",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "For Band 7+ in Speaking Part 2, use narrative tenses: past simple for main events, past continuous for background, past perfect for earlier events. Use discourse markers: 'initially', 'eventually', 'after a while', 'in the end'. Add descriptive details.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Advanced Storytelling Framework",
      text: "Opening: 'I'd like to tell you about a time when...' Setting: 'It was a sunny afternoon in July...' Build-up: 'At first, nothing unusual happened...' Climax: 'Suddenly, I realized...' Resolution: 'In the end, what started as...' Reflection: 'This experience taught me...'",
    },
    {
      kind: "table",
      headers: ["Story Part","Time","Language"],
      rows: [["Opening","0–10s","I'd like to tell you about a time when..."],["Setting the scene","10–30s","It was a beautiful summer day. I was walking when..."],["Main events","30–60s","Suddenly... / Eventually... / Then..."],["Climax","60–90s","The most memorable moment was when..."],["Reflection","90–120s","This experience made me realize how important..."]],
    },
    {
      kind: "dialogue",
      title: "Advanced Storytelling",
      lines: [{"speaker":"You","en":"I'd like to talk about a memorable journey I took to the mountains. It was early spring, and the weather was just beginning to warm up.","tr":"I'd like to talk about a memorable journey...","ar":"أود أن أتحدث عن رحلة لا تنسى قمت بها إلى الجبال."},{"speaker":"You","en":"What made this experience truly special was watching the sunrise from the summit. I'll never forget that moment.","tr":"What made this experience truly special...","ar":"ما جعل هذه التجربة مميزة حقاً هو مشاهدة شروق الشمس من القمة."}],
    },
    {
      kind: "examples",
      items: [{"en":"I had never experienced such a beautiful sunset before that moment.","tr":"I had never experienced such a beautiful sunset before that moment.","ar":"لم يسبق لي أن شهدت غروباً جميلاً كهذا قبل تلك اللحظة."},{"en":"Initially, I was nervous, but eventually I felt completely at ease.","tr":"Initially, I was nervous, but eventually I felt completely at ease.","ar":"في البداية، كنت متوتراً، لكن في النهاية شعرت بالراحة التامة."},{"en":"This experience made me realize how important it is to step out of your comfort zone.","tr":"This experience made me realize how important it is to step out of your comfort zone.","ar":"هذه التجربة جعلتني أدرك مدى أهمية الخروج من منطقة الراحة الخاصة بك."}],
    },
  ],
};

const band4Lesson14: Lesson = {
  id: "band4-speaking-abstract-topics",
  title: "Speaking Part 3: Abstract Topics",
  subtitle: "Society, culture, global issues",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "At Band 7+, Part 3 questions require discussing abstract concepts. Demonstrate ability to discuss complex ideas, analyze causes and effects, make comparisons, and express nuanced opinions. Use phrases: 'On a global scale...', 'From a societal perspective...', 'In the long term...'.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Abstract Topic Framework",
      text: "1) Define the concept. 2) Explain causes. 3) Describe effects. 4) Compare perspectives. 5) Give opinion with justification. 6) Use examples from different countries. 7) Speculate about the future.",
    },
    {
      kind: "table",
      headers: ["Strategy","Phrases","Example"],
      rows: [["Define","By globalization, I mean...","Globalization refers to the increasing interconnectedness of economies."],["Cause","One reason for this is...","This is partly due to advances in technology."],["Effect","This has resulted in...","This has resulted in greater cultural exchange."],["Compare","In contrast to the past...","Unlike previous generations, young people today..."],["Opinion","From my perspective...","I firmly believe that this trend is irreversible."]],
    },
    {
      kind: "examples",
      items: [{"en":"From a societal perspective, globalization has both positive and negative effects.","tr":"From a societal perspective, globalization has both positive and negative effects.","ar":"من منظور مجتمعي، للعولمة آثار إيجابية وسلبية."},{"en":"In contrast to previous generations, today's youth are more globally connected.","tr":"In contrast to previous generations, today's youth are more globally connected.","ar":"على عكس الأجيال السابقة، شباب اليوم أكثر اتصالاً عالمياً."},{"en":"I firmly believe that governments must balance economic growth with environmental protection.","tr":"I firmly believe that governments must balance economic growth with environmental protection.","ar":"أعتقد بشدة أن الحكومات يجب أن توازن بين النمو الاقتصادي وحماية البيئة."}],
    },
  ],
};

const band4Lesson15: Lesson = {
  id: "band4-speaking-pronunciation",
  title: "Speaking: Pronunciation & Intonation",
  subtitle: "Word stress, sentence rhythm",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "At Band 7+, pronunciation must be clear and natural. Focus on: 1) Word stress — 'PHOto' vs 'phoTOgraph'. 2) Sentence stress — emphasize content words. 3) Intonation — rising for questions, falling for statements. 4) Connected speech — 'going to' becomes 'gonna'. 5) Vowel sounds — 'ship' vs 'sheep'.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Pronunciation Practice",
      text: "Record yourself speaking and compare to native speakers. Practice minimal pairs: 'bit/beat', 'full/fool', 'cot/caught'. Use a mirror to check mouth position. Practice shadowing: repeat after a recording immediately.",
    },
    {
      kind: "table",
      headers: ["Feature","Example","Common Error","Correction"],
      rows: [["Word stress","PHOto / phoTOgraph","Equal stress on all syllables","Stress the correct syllable"],["Sentence stress","I LOVE learn-ing ENG-lish","Stressing every word","Stress content words only"],["Intonation","Rising? Falling.","Flat intonation","Use pitch changes"],["Vowel length","ship vs sheep","Same vowel length","Lengthen /iː/ in 'sheep'"]],
    },
    {
      kind: "examples",
      items: [{"en":"I need to improve my pronunciation for the speaking test.","tr":"I need to improve my pronunciation for the speaking test.","ar":"أحتاج لتحسين نطقي لاختبار المحادثة."},{"en":"Word stress can change the meaning of a word.","tr":"Word stress can change the meaning of a word.","ar":"الضغط على الكلمة يمكن أن يغير معنى الكلمة."},{"en":"Practice shadowing to improve your intonation.","tr":"Practice shadowing to improve your intonation.","ar":"تدرب على التكرار الفوري لتحسين نغمة صوتك."}],
    },
  ],
};

const band4Lesson16: Lesson = {
  id: "band4-grammar-inversion",
  title: "Band 8.5+ Syntactic Complexity: Inversion & Clefting",
  subtitle: "Negative adverbials, limiting conditions & pseudo-cleft structures",
  xpReward: 60,
  blocks: [
    {
      kind: "p",
      text: "To unlock the highest tier of the Grammatical Range and Accuracy descriptor (Band 8.5–9.0), you must produce complex grammatical structures naturally and flexibly. Inversion (fronting negative or limiting adverbials) and cleft sentences shift rhetorical focus and demonstrate sophisticated syntactic control.",
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The Mechanics of Inversion",
      text: "When a negative or limiting adverb opens a clause, the subject and auxiliary verb invert (identical to question order, but punctuated as a statement):\n\n[Negative Adverbial] + [Auxiliary / Modal] + [Subject] + [Main Verb]...\n\nExample: 'Rarely do economists agree on fiscal interventions.'\nNOT: 'Rarely economists agree...' (uninverted error).",
    },
    {
      kind: "table",
      headers: ["Inversion Trigger","Structural Formula","High-Band Model Sentence"],
      rows: [
        [
          "Seldom / Rarely",
          "Seldom + have/do/did + Subject + Verb",
          "Seldom has a technological advancement disrupted the global labor market as precipitously as artificial intelligence."
        ],
        [
          "Not only... but also",
          "Not only + aux + Subject + Verb, but [Subject] also...",
          "Not only did the municipal congestion charge curb vehicle emissions, but it also generated substantial revenue for public transit."
        ],
        [
          "Only after / Only by",
          "Only by + Gerund + can/will + Subject + Verb",
          "Only by establishing multilateral environmental treaties can sovereign nations mitigate transboundary pollution."
        ],
        [
          "Under no circumstances",
          "Under no circumstances + should/must + Subject + Verb",
          "Under no circumstances should fiscal austerity be implemented at the expense of primary healthcare infrastructure."
        ]
      ],
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Cleft Sentences for Laser Focus",
      text: "Cleft sentences divide a single thought into two clauses to give prominence to one specific element:\n• Wh-Cleft (Pseudo-cleft): 'What the empirical data actually reveals is an undeniable inverse correlation between tuition costs and lower-income enrollment.'\n• It-Cleft: 'It is the acute lack of childcare subsidies that prevents qualified mothers from re-entering the corporate workforce.'",
    },
    {
      kind: "examples",
      items: [
        { en: "Seldom has a policy reform yielded such instantaneous economic dividends.", tr: "Seldom has a policy reform yielded such instantaneous economic dividends.", ar: "نادراً ما أسفر إصلاح للسياسات عن مثل هذه العوائد الاقتصادية الفورية." },
        { en: "What this longitudinal study confirms is the profound efficacy of early childhood interventions.", tr: "What this longitudinal study confirms is the profound efficacy of early childhood interventions.", ar: "ما تؤكده هذه الدراسة الطولية هو الفعالية العميقة للتدخلات في مرحلة الطفولة المبكرة." },
        { en: "Not until the secondary audit was finalized did administrators acknowledge the budgetary shortfall.", tr: "Not until the secondary audit was finalized did administrators acknowledge the budgetary shortfall.", ar: "لم يعترف المسؤولون بالعجز في الميزانية إلا بعد الانتهاء من التدقيق المالي الثانوي." }
      ],
    },
  ],
};

const band4Lesson17: Lesson = {
  id: "band4-grammar-participles",
  title: "Grammar Boost: Participle Clauses",
  subtitle: "Concise academic writing",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Participle clauses make writing more concise. Present participle (verb+ing) for active: 'Having reviewed the data, the team published their findings.' Past participle (verb+ed) for passive: 'Based on the evidence, we can conclude...' Perfect participle (having + past participle) for completed actions before the main verb.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Participle Clause Rules",
      text: "The subject of the participle clause must be the same as the main clause. 'Walking home, I saw a car accident' (I was walking). Not: 'Walking home, a car accident happened' (wrong — the accident wasn't walking). Use 'Having + V3' for earlier action: 'Having finished the experiment, the scientists analyzed the results.'",
    },
    {
      kind: "table",
      headers: ["Clause Type","Form","Example"],
      rows: [["Present participle","V+ing","Walking home, I met an old friend."],["Past participle","V+ed / irregular","Based on the findings, we recommend..."],["Perfect participle","Having + V3","Having completed the research, she wrote her thesis."],["Passive participle","Being + V3","Being written in 1920, the book feels outdated."]],
    },
    {
      kind: "examples",
      items: [{"en":"Having reviewed the literature, the researcher identified a gap in the field.","tr":"Having reviewed the literature, the researcher identified a gap in the field.","ar":"بعد مراجعة الأدبيات، حدد الباحث فجوة في المجال."},{"en":"Based on the evidence, we can conclude that climate change is accelerating.","tr":"Based on the evidence, we can conclude that climate change is accelerating.","ar":"بناءً على الأدلة، يمكننا أن نستنتج أن تغير المناخ يتسارع."},{"en":"Having lived abroad for many years, she speaks three languages fluently.","tr":"Having lived abroad for many years, she speaks three languages fluently.","ar":"بعد أن عاشت في الخارج لسنوات عديدة، تتحدث ثلاث لغات بطلاقة."}],
    },
  ],
};

const band4Lesson18: Lesson = {
  id: "band4-vocab-awl4",
  title: "Vocabulary: AWL Sublists 4-5",
  subtitle: "Advanced academic words",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "AWL Sublists 4 and 5 contain advanced academic vocabulary essential for Band 7+ and high TOEFL scores. These words appear in complex academic texts and lectures. Mastering them will significantly improve your reading comprehension and lexical resource score.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Study Strategy for Advanced AWL",
      text: "Group words by theme or word family. Practice using them in context. Create sentences related to common exam topics (environment, technology, education, health). Review daily using spaced repetition.",
    },
    {
      kind: "table",
      headers: ["Word","Part of Speech","Example","Arabic"],
      rows: [["adequate","adj","The funding was barely adequate for the project.","كاف"],["compensate","v","The program compensates for educational disadvantages.","يعوض"],["distinct","adj","There are three distinct categories.","متميز"],["evolve","v","The theory evolved over several decades.","يتطور"],["fluctuate","v","Prices fluctuated wildly during the crisis.","يتقلب"],["generate","v","The research generated significant interest.","يولد / ينتج"],["inevitable","adj","Change is inevitable in any organization.","لا مفر منه"],["predominant","adj","The predominant view is that...","سائد / غالب"],["promote","v","The campaign promotes healthy eating habits.","يعزز / يروج"],["reject","v","The committee rejected the proposal.","يرفض"]],
    },
    {
      kind: "examples",
      items: [{"en":"The predominant view among scientists is that climate change is man-made.","tr":"The predominant view among scientists is that climate change is man-made.","ar":"الرأي السائد بين العلماء هو أن تغير المناخ من صنع الإنسان."},{"en":"Technological progress is inevitable and will continue to transform our lives.","tr":"Technological progress is inevitable and will continue to transform our lives.","ar":"التقدم التكنولوجي لا مفر منه وسيستمر في تحويل حياتنا."},{"en":"Education promotes social mobility and economic growth.","tr":"Education promotes social mobility and economic growth.","ar":"التعليم يعزز الحراك الاجتماعي والنمو الاقتصادي."}],
    },
  ],
};

const band4Lesson19: Lesson = {
  id: "band4-vocab-science",
  title: "Vocabulary: Topic-Specific — Science & Research",
  subtitle: "Key terms",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Science and research vocabulary is essential for academic passages and lectures. Key areas: scientific method, research design, data analysis, and scientific discoveries. Be able to discuss experiments, hypotheses, evidence, and conclusions.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Science Vocabulary",
      text: "Research: 'hypothesis', 'methodology', 'empirical evidence', 'peer review', 'control group'. Data: 'quantitative', 'qualitative', 'correlation', 'causation', 'statistically significant'. Discoveries: 'breakthrough', 'innovation', 'paradigm shift'.",
    },
    {
      kind: "table",
      headers: ["Word/Phrase","Definition","Example","Arabic"],
      rows: [["hypothesis","Testable prediction","The hypothesis was supported by the data.","فرضية"],["empirical evidence","Evidence from observation","Empirical evidence confirms the theory.","أدلة تجريبية"],["methodology","Research approach","The methodology involved surveys and interviews.","منهجية"],["peer review","Evaluation by experts","The paper underwent rigorous peer review.","مراجعة الأقران"],["correlation","Relationship between variables","There is a correlation between exercise and health.","ارتباط"],["breakthrough","Major discovery","The breakthrough could revolutionize medicine.","اختراق علمي"]],
    },
    {
      kind: "examples",
      items: [{"en":"The hypothesis was tested using a controlled experiment.","tr":"The hypothesis was tested using a controlled experiment.","ar":"تم اختبار الفرضية باستخدام تجربة مضبوطة."},{"en":"Empirical evidence supports the theory of evolution.","tr":"Empirical evidence supports the theory of evolution.","ar":"الأدلة التجريبية تدعم نظرية التطور."},{"en":"The study found a strong correlation between education and income.","tr":"The study found a strong correlation between education and income.","ar":"وجدت الدراسة ارتباطاً قوياً بين التعليم والدخل."}],
    },
  ],
};

const band4Lesson20: Lesson = {
  id: "band4-vocab-globalization",
  title: "Vocabulary: Topic-Specific — Globalization",
  subtitle: "Key terms",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Globalization is a common academic topic. Be able to discuss economic integration, cultural exchange, international trade, and global challenges. Key areas: multinational corporations, cultural homogenization, global supply chains, immigration.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Globalization Vocabulary",
      text: "Economic: 'free trade', 'protectionism', 'multinational corporation', 'outsourcing'. Cultural: 'cultural diversity', 'cultural homogenization', 'cross-cultural exchange'. Political: 'supranational organizations', 'global governance', 'international relations'.",
    },
    {
      kind: "table",
      headers: ["Word/Phrase","Definition","Example","Arabic"],
      rows: [["globalization","Increasing global interconnectedness","Globalization has transformed economies worldwide.","عولمة"],["free trade","Trade without barriers","Free trade agreements boost economic growth.","تجارة حرة"],["multinational corporation","Company operating in multiple countries","Multinational corporations dominate global markets.","شركة متعددة الجنسيات"],["cultural homogenization","Loss of cultural diversity","Critics argue globalization leads to cultural homogenization.","التجانس الثقافي"],["outsourcing","Contracting work to other countries","Many companies outsource manufacturing to Asia.","الاستعانة بمصادر خارجية"],["protectionism","Protecting domestic industries","Protectionist policies can harm global trade.","الحمائية"]],
    },
    {
      kind: "examples",
      items: [{"en":"Globalization has led to increased economic integration between countries.","tr":"Globalization has led to increased economic integration between countries.","ar":"أدت العولمة إلى زيادة التكامل الاقتصادي بين البلدان."},{"en":"Free trade agreements can boost economic growth but may also harm local industries.","tr":"Free trade agreements can boost economic growth but may also harm local industries.","ar":"اتفاقيات التجارة الحرة يمكن أن تعزز النمو الاقتصادي ولكنها قد تضر بالصناعات المحلية."},{"en":"Cultural homogenization is a concern for those who value cultural diversity.","tr":"Cultural homogenization is a concern for those who value cultural diversity.","ar":"التجانس الثقافي مصدر قلق لأولئك الذين يقدرون التنوع الثقافي."}],
    },
  ],
};

const band4Lesson21: Lesson = {
  id: "band4-vocab-idioms",
  title: "Vocabulary: Idioms for Speaking (Band 7+)",
  subtitle: "Natural, not forced",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Idioms can boost your Speaking score if used naturally and appropriately. Never force idioms into your speech. Useful idioms for IELTS: 'a double-edged sword' (has both good and bad effects), 'the tip of the iceberg' (small visible part of a bigger problem), 'cost an arm and a leg' (very expensive), 'piece of cake' (very easy).",
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Idiom Usage Rules",
      text: "1) Only use idioms you are confident about. 2) Use 1-2 idioms maximum per speaking part. 3) Idioms must fit naturally. 4) Avoid clichés and overused idioms. 5) Never use idioms in academic writing. 6) Know the exact meaning — wrong usage sounds worse than no idiom.",
    },
    {
      kind: "table",
      headers: ["Idiom","Meaning","Example"],
      rows: [["a double-edged sword","Has positive and negative aspects","Technology is a double-edged sword — it connects us but also isolates us."],["the tip of the iceberg","Small part of a larger problem","Unemployment is just the tip of the iceberg."],["hit the nail on the head","Exactly correct","I think you've hit the nail on the head."],["go the extra mile","Do more than expected","Teachers who go the extra mile inspire students."],["think outside the box","Think creatively","We need to think outside the box to solve this."]],
    },
    {
      kind: "examples",
      items: [{"en":"Technology is a double-edged sword — it offers convenience but also raises privacy concerns.","tr":"Technology is a double-edged sword — it offers convenience but also raises privacy concerns.","ar":"التكنولوجيا سيف ذو حدين — إنها توفر الراحة ولكنها تثير مخاوف الخصوصية."},{"en":"The unemployment figures are just the tip of the iceberg.","tr":"The unemployment figures are just the tip of the iceberg.","ar":"أرقام البطالة هي مجرد غيض من فيض."},{"en":"Teachers who go the extra mile truly make a difference in students' lives.","tr":"Teachers who go the extra mile truly make a difference in students' lives.","ar":"المعلمون الذين يبذلون جهداً إضافياً يحدثون فرقاً حقيقياً في حياة الطلاب."}],
    },
  ],
};

const band4Lesson22: Lesson = {
  id: "band4-mock-ielts-listening",
  title: "Full Mock IELTS Listening Section",
  subtitle: "40 questions, real format",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "This full mock test simulates a complete IELTS Listening section with 40 questions across 4 sections. Time: approximately 30 minutes. Section 1: Conversation about booking a tour. Section 2: Guided tour of a museum. Section 3: Students discussing a research project. Section 4: Lecture on renewable energy.",
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Mock Test Rules",
      text: "Find a quiet room. Play the recording only once. Do not pause. Use the official answer sheet format. Transfer answers at the end. Check spelling carefully. After the test, review your mistakes and identify patterns.",
    },
    {
      kind: "table",
      headers: ["Section","Topic","Type","Questions"],
      rows: [["1","Booking a tour","Conversation (2 people)","10"],["2","Museum guide","Monologue","10"],["3","Research project discussion","Conversation (3 people)","10"],["4","Renewable energy lecture","Lecture","10"],["Total","—","—","40"]],
    },
    {
      kind: "examples",
      items: [{"en":"Section 1 is a conversation between a customer and a travel agent.","tr":"Section 1 is a conversation between a customer and a travel agent.","ar":"القسم 1 محادثة بين عميل ووكيل سفر."},{"en":"Section 4 is a university lecture on an academic topic.","tr":"Section 4 is a university lecture on an academic topic.","ar":"القسم 4 محاضرة جامعية حول موضوع أكاديمي."},{"en":"Transfer all answers to the answer sheet carefully.","tr":"Transfer all answers to the answer sheet carefully.","ar":"انقل جميع الإجابات إلى ورقة الإجابة بعناية."}],
    },
  ],
};

const band4Lesson23: Lesson = {
  id: "band4-mock-toefl-reading",
  title: "Full Mock TOEFL Reading Section",
  subtitle: "2 passages, 20 questions",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "This mock test simulates a TOEFL Reading section with 2 academic passages and 20 questions (54 minutes). Passage 1: 'The History of the Silk Road' — 10 questions. Passage 2: 'Cognitive Development in Children' — 10 questions. Question types include vocabulary, inference, sentence insertion, and summary.",
    },
    {
      kind: "callout",
      tone: "warning",
      title: "TOEFL Reading Tips",
      text: "Manage your time: 27 minutes per passage. Use the 'Review' button to see unanswered questions. Skim each paragraph, then answer questions. For vocabulary questions, the context usually provides clues. For summary questions, eliminate details and focus on main ideas.",
    },
    {
      kind: "table",
      headers: ["Passage","Topic","Questions","Time"],
      rows: [["1","The History of the Silk Road","10","27 min"],["2","Cognitive Development in Children","10","27 min"],["Total","—","20","54 min"]],
    },
    {
      kind: "examples",
      items: [{"en":"TOEFL Reading passages are academic in nature and style.","tr":"TOEFL Reading passages are academic in nature and style.","ar":"نصوص قراءة TOEFL أكاديمية في طبيعتها وأسلوبها."},{"en":"Vocabulary questions test words in context.","tr":"Vocabulary questions test words in context.","ar":"أسئلة المفردات تختبر الكلمات في السياق."},{"en":"Use the Review feature to track your progress.","tr":"Use the Review feature to track your progress.","ar":"استخدم ميزة المراجعة لتتبع تقدمك."}],
    },
  ],
};

const band4Lesson24: Lesson = {
  id: "band4-exam-day-strategies",
  title: "Exam Day Strategies: Nerves, Time, Last-Minute Tips",
  subtitle: "Final preparation",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Exam day can be stressful. Here are strategies to perform at your best: 1) Sleep well the night before — 7-8 hours. 2) Eat a good breakfast with protein. 3) Arrive 30 minutes early. 4) Bring valid ID and confirmation. 5) Stay calm during the test. 6) If you make a mistake, move on. 7) Use every second of the given time — review your answers.",
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Managing Test Anxiety",
      text: "Deep breathing: Inhale for 4 seconds, hold for 4, exhale for 4. Positive visualization: imagine yourself succeeding. Remember: you have prepared for this. One difficult question won't ruin your score. Focus on the next question, not the one you struggled with.",
    },
    {
      kind: "table",
      headers: ["Section","Last-Minute Tip","Common Mistake to Avoid"],
      rows: [["Listening","Read questions before each section","Falling behind — move on"],["Reading","Guess if running out of time","Spending too long on one passage"],["Writing","Plan for 5 minutes before writing","Not checking word count"],["Speaking","Speak clearly and confidently","Giving one-word answers"]],
    },
    {
      kind: "examples",
      items: [{"en":"Stay calm and focused during the exam.","tr":"Stay calm and focused during the exam.","ar":"حافظ على هدوئك وتركيزك أثناء الامتحان."},{"en":"If you make a mistake, move on to the next question.","tr":"If you make a mistake, move on to the next question.","ar":"إذا ارتكبت خطأ، انتقل إلى السؤال التالي."},{"en":"You have prepared well — trust your abilities.","tr":"You have prepared well — trust your abilities.","ar":"لقد استعديت جيداً — ثق في قدراتك."}],
    },
  ],
};

const band4Lesson25: Lesson = {
  id: "band4-review",
  title: "Band 7–8+ Final Review & Test Readiness",
  subtitle: "Final assessment",
  xpReward: 50,
  blocks: [
    {
      kind: "p",
      text: "Congratulations on completing all four bands! You have built a comprehensive foundation for IELTS/TOEFL success, from basic test awareness (Band 4-5) through intermediate techniques (Band 5-6) and advanced strategies (Band 6-7) to high-scoring mastery (Band 7-8+). You are now ready to take your exam with confidence.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Final Self-Assessment",
      text: "Rate yourself 1-5 on each skill. Your goal should be 4 or 5 on everything. If any area is below 4, review the relevant lessons before your exam date. Remember: consistent practice is more effective than intensive cramming.",
    },
    {
      kind: "table",
      headers: ["Band","Key Skills Mastered","Target Score"],
      rows: [["Band 4–5","Test format, basic skills, skimming/scanning","IELTS 4.5–5.5 / TOEFL 40–60"],["Band 5–6","Exam techniques, T/F/NG, cue cards","IELTS 5.5–6.5 / TOEFL 60–80"],["Band 6–7","Advanced strategies, multiple charts, Part 3","IELTS 6.5–7.5 / TOEFL 80–100"],["Band 7–8+","Sophisticated vocabulary, complex grammar, mock full tests","IELTS 7.5–8.5 / TOEFL 100–115"]],
    },
    {
      kind: "examples",
      items: [{"en":"I have completed all 100 IELTS/TOEFL preparation lessons.","tr":"I have completed all 100 IELTS/TOEFL preparation lessons.","ar":"لقد أكملت جميع دروس التحضير لاختبار IELTS/TOEFL البالغ عددها 100 درس."},{"en":"I am confident and ready to take my exam.","tr":"I am confident and ready to take my exam.","ar":"أنا واثق ومستعد لتقديم امتحاني."},{"en":"I will continue practicing to achieve my target score.","tr":"I will continue practicing to achieve my target score.","ar":"سأستمر في الممارسة لتحقيق درجتي المستهدفة."}],
    },
  ],
};

const BAND4_LESSONS: Lesson[] = [
  band4Lesson1, band4Lesson2, band4Lesson3, band4Lesson4, band4Lesson5,
  band4Lesson6, band4Lesson7, band4Lesson8, band4Lesson9, band4Lesson10,
  band4Lesson11, band4Lesson12, band4Lesson13, band4Lesson14, band4Lesson15,
  band4Lesson16, band4Lesson17, band4Lesson18, band4Lesson19, band4Lesson20,
  band4Lesson21, band4Lesson22, band4Lesson23, band4Lesson24, band4Lesson25,
];

// ─── Levels Export ───────────────────────────────────────────

export const levels: Level[] = [
  {
    id: "band4-5",
    title: "Foundation & B2 First Course",
    subtitle: "Grammar Core & FCE Foundations",
    duration: "3–4 months",
    intro: "Comprehensive foundation course preparing Arabic-speaking learners for Cambridge B2 First (FCE) and entry-level IELTS/TOEFL. Master sentence building, essential tenses, listening comprehension, and key academic vocabulary.",
    goals: [
      "Master essential English verb tenses, passives, and sentence structures",
      "Cambridge B2 Reading & Use of English foundation strategies",
      "Develop skimming and scanning techniques for reading passages",
      "Describe basic trends in graphs, tables, and charts",
      "Structure coherent paragraphs and foundational Task 2 essays",
      "Build conversational fluency and confidence for Speaking Part 1",
      "Learn Academic Word List (AWL) Sublist 1 vocabulary",
    ],
    color: "#a855f7",
    accent: "#a855f7",
    examTarget: "Cambridge B2 First",
    examBadge: "B2 / FCE",
    examHref: "/b2-pruefung",
    lessons: BAND1_LESSONS,
  },
  {
    id: "band5-6",
    title: "IELTS Academic Practice Course",
    subtitle: "Target Band 6.5 – 8.0+",
    duration: "3–4 months",
    intro: "A 25-module IELTS Academic course targeting preparation toward Band 6.5–8.0+. Learn all four skills through original explanations, worked examples, evidence-based reading and transcript study, data reporting, essays and spoken rehearsal. Targets are learning aims, not guaranteed results; text drills do not assess complete writing, listening or speaking performance.",
    goals: [
  "Use Listening Parts 1–4 strategies for details, plans, matching, lectures and speaker attitudes",
  "Read Academic passages using factual and writer-view judgements, headings, matching and completion",
  "Report graphs, charts, tables, maps and processes accurately in Academic Writing Task 1",
  "Develop Task 2 opinion, discussion, problem-solution, trade-off and two-part responses",
  "Rehearse Speaking Parts 1–3 and review actual delivery against the four Speaking criteria",
  "Use precise vocabulary, controlled grammar, coherent development and accurate comparisons",
  "Review raw drill accuracy separately from official bands and seek feedback on full responses"
],
    color: "#f97316",
    accent: "#f97316",
    examTarget: "IELTS Academic",
    examBadge: "Band 6.5–8.0+",
    examHref: "/mock-exam?exam=ielts-academic",
    lessons: BAND2_LESSONS,
  },
  {
    id: "band6-7",
    title: "TOEFL iBT Practice Course",
    subtitle: "TOEFL iBT 2026 · Current 1–6 score scale",
    duration: "4–6 months",
    intro: "A 25-module course for TOEFL iBT from 21 January 2026. Study the current Reading, Listening, Writing and Speaking task families through contextual passages, transcript analysis, sentence building, original email and discussion models, and external spoken rehearsal. Text-based drills are learning support and do not reproduce adaptive delivery or establish official scores.",
    goals: [
  "Read Complete the Words, Read in Daily Life and Read an Academic Passage tasks in context",
  "Study appropriate responses, conversations, announcements and academic talks with clear evidence",
  "Build grammatical sentences and develop purposeful emails and academic discussion contributions",
  "Prepare accurate Listen and Repeat and developed Take an Interview spoken responses",
  "Apply grammar, vocabulary, inference, qualification and revision to the current task families",
  "Understand the current 1–6 scale and the transitional comparable overall 0–120 result",
  "Use genuine audio and actual written and spoken responses for independent performance review"
],
    color: "#0ea5e9",
    accent: "#0ea5e9",
    examTarget: "TOEFL iBT · from 21 January 2026",
    examBadge: "TOEFL 2026 · 1–6",
    examHref: "/mock-exam?exam=toefl-ibt",
    lessons: BAND3_LESSONS,
  },
  {
    id: "band7-8",
    title: "IELTS General & High-Band Masterclass",
    subtitle: "Target Band 7.5 – 9.0 (Work & PR)",
    duration: "4–6 months",
    intro: "Advanced practice masterclass for high-band IELTS General and Academic candidates seeking professional licensing, university admission, or immigration. Covers letter writing, workplace reading, advanced grammar inversion, and abstract speaking.",
    goals: [
      "Master IELTS General Writing Task 1 (Formal, semi-formal, and informal letters)",
      "Excel in workplace and public notices reading (Sections 1 & 2)",
      "Advanced grammar mastery: negative inversion, cleft sentences, participle clauses",
      "Discuss abstract, complex topics in Speaking Part 3 with nuanced speculation",
      "High-band lexical resource: idioms, phrasal verbs, and rare academic collocations",
      "Understand fast-paced native speech and difficult regional accents",
      "Complete full timed mock exams under real test conditions",
    ],
    color: "#10b981",
    accent: "#10b981",
    examTarget: "IELTS General",
    examBadge: "Band 7.5–9.0",
    examHref: "/mock-exam?exam=ielts-general",
    lessons: BAND4_LESSONS,
  },
];

