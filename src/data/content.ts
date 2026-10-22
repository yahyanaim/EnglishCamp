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
  band2Lesson1, band2Lesson2, band2Lesson3, band2Lesson4, band2Lesson5,
  band2Lesson6, band2Lesson7, band2Lesson8, band2Lesson9, band2Lesson10,
  band2Lesson11, band2Lesson12, band2Lesson13, band2Lesson14, band2Lesson15,
  band2Lesson16, band2Lesson17, band2Lesson18, band2Lesson19, band2Lesson20,
  band2Lesson21, band2Lesson22, band2Lesson23, band2Lesson24, band2Lesson25,
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
  band3Lesson1, band3Lesson2, band3Lesson3, band3Lesson4, band3Lesson5,
  band3Lesson6, band3Lesson7, band3Lesson8, band3Lesson9, band3Lesson10,
  band3Lesson11, band3Lesson12, band3Lesson13, band3Lesson14, band3Lesson15,
  band3Lesson16, band3Lesson17, band3Lesson18, band3Lesson19, band3Lesson20,
  band3Lesson21, band3Lesson22, band3Lesson23, band3Lesson24, band3Lesson25,
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
    intro: "Intensive practice course engineered for IELTS Academic test takers. Master all 4 test components: Graph & Chart descriptions (Task 1), Discursive Essays (Task 2), True/False/Not Given reading strategies, and the 3-part Speaking interview.",
    goals: [
      "Master IELTS Academic Writing Task 1 (Line graphs, bar/pie charts, tables, processes)",
      "Structure high-scoring Task 2 essays (Opinion, Discussion, Problem-Solution)",
      "Master Academic Reading strategies: True/False/Not Given, Heading Matching",
      "Excel in Listening Sections 1–4: note completion, map labeling, multiple choice",
      "Deliver fluent 2-minute cue card talks using the ARE framework in Speaking",
      "Expand Academic Word List (AWL) Sublist 2 and formal collocations",
      "Take timed mock exams with instant band evaluation",
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
    subtitle: "Target Score 90 – 115+",
    duration: "4–6 months",
    intro: "Targeted practice course aligned with the latest TOEFL iBT exam. Learn strategies for Writing for an Academic Discussion, multi-stage adaptive reading, lecture listening with global accents, and timed spontaneous speaking.",
    goals: [
      "Master the TOEFL Writing for an Academic Discussion task",
      "Handle multi-stage adaptive Reading passages and 'Complete the Words' tasks",
      "Listen to university lectures and campus announcements with global accents",
      "Deliver 45-second high-scoring spontaneous speaking responses",
      "Synthesize reading passages with listening lectures in integrated tasks",
      "Learn advanced university discourse markers and transition formulas",
      "Complete full timed TOEFL iBT simulation mock tests",
    ],
    color: "#0ea5e9",
    accent: "#0ea5e9",
    examTarget: "TOEFL iBT",
    examBadge: "Score 90–115+",
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

