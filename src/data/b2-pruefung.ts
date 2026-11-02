export type ExamSection = {
  id: string;
  title: string;
  icon: string;
  color: string;
  content: { title: string; items: string[] }[];
};

export type WritingTemplate = {
  id: string;
  title: string;
  icon: string;
  desc: string;
  template: string[];
  notes: string[];
};

export type ExamInfo = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  details: string[];
};

export type GuideSection = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  description: string;
  topics: {
    title: string;
    body: string[];
  }[];
};

export const IELTS_GUIDE_CONTENT: GuideSection[] = [
  {
    id: 'overview',
    title: 'Overview',
    subtitle: 'Exam Format, Scoring & Registration',
    icon: '📋',
    color: 'blue',
    description: 'The International English Language Testing System (IELTS) is the world\'s most popular English language proficiency test for higher education and global migration. This section explains the exam format, scoring system, registration process, and the key differences between Academic and General Training modules to help you choose the right path.',
    topics: [
      {
        title: 'What is IELTS?',
        body: [
          'IELTS, the International English Language Testing System, is designed to assess the language ability of candidates who need to study or work where English is the language of communication. It is jointly owned by the British Council, IDP: IELTS Australia, and Cambridge English. Over 11,000 organisations worldwide accept IELTS, including universities, immigration authorities, government agencies, and professional bodies.',
          'The test is accepted across the English-speaking world. In the United Kingdom, all universities accept IELTS, and the UK Home Office uses specific IELTS tests (IELTS for UKVI) for visa applications. In Australia, the Department of Home Affairs accepts IELTS for all visa categories. In Canada, IELTS is accepted by Citizenship and Immigration Canada and all universities. In New Zealand, Immigration New Zealand and all universities accept IELTS. In the United States, over 3,400 institutions accept IELTS, including all Ivy League universities.',
          'IELTS scores are valid for two years from the test date. After this period, most institutions will not accept the score as evidence of English proficiency. The two-year validity reflects the understanding that language skills can change over time and that recent assessment is necessary.',
          'There is no pass or fail in IELTS. You receive a band score from 0 to 9 for each skill and an overall band score. Your target score depends entirely on your goals: most undergraduate programs require 6.0-6.5, postgraduate programs typically ask for 6.5-7.0, and professions like medicine, law, and nursing may require 7.0-7.5. For immigration, different visa categories have different minimum requirements, often ranging from 4.5 to 7.0.',
          'The test is offered up to four times per month at over 1,600 test centres in more than 140 countries. You can take either the Computer-Delivered test or the Paper-Based test depending on availability and personal preference. The test content and scoring are identical regardless of the delivery mode.'
        ]
      },
      {
        title: 'Test Format',
        body: [
          'IELTS consists of four sections: Listening, Reading, Writing, and Speaking. The total test time is approximately 2 hours and 45 minutes. Listening, Reading, and Writing are taken consecutively with no breaks in between. Speaking may be taken on the same day or up to seven days before or after the other sections, depending on test centre arrangements.',
          'Listening: 30 minutes (plus 10 minutes for transferring answers in the paper-based test). You answer 40 questions based on four recorded monologues and conversations. The recordings include a range of accents: British, Australian, New Zealand, American, and Canadian. Each recording is played only once.',
          'Reading: 60 minutes. You answer 40 questions based on three long reading passages. For the Academic test, passages are taken from books, journals, magazines, and newspapers. For the General Training test, passages are taken from notices, advertisements, company handbooks, newspapers, and magazines. The passages progress from easier to more difficult.',
          'Writing: 60 minutes. For the Academic test, Task 1 requires you to describe visual information (a graph, table, chart, map, or diagram) in at least 150 words, and Task 2 requires you to write an essay in response to a point of view, argument, or problem in at least 250 words. For the General Training test, Task 1 requires you to write a letter (formal, semi-formal, or informal), and Task 2 is an essay similar to the Academic essay but on a more general topic.',
          'Speaking: 11-14 minutes. This is a face-to-face interview with a certified examiner. It has three parts: Part 1 involves introduction and questions on familiar topics (4-5 minutes), Part 2 requires you to speak on a given topic for 1-2 minutes after 1 minute of preparation (a long turn), and Part 3 involves a discussion of abstract ideas related to the Part 2 topic (4-5 minutes).'
        ]
      },
      {
        title: 'Scoring System',
        body: [
          'IELTS uses a 9-band scoring system. Each band corresponds to a specific level of English proficiency. Band 9 (Expert User) means you have fully operational command of the language with complete understanding. Band 8 (Very Good User) means you have fully operational command with only occasional unsystematic inaccuracies. Band 7 (Good User) means you have operational command with occasional inaccuracies in some situations. Band 6 (Competent User) means you have effective command despite some inaccuracies and misunderstandings.',
          'Band 5 (Modest User) means you have partial command and likely make many mistakes. Band 4 (Limited User) means your basic competence is limited to familiar situations. Band 3 (Extremely Limited User) means you convey and understand only general meaning. Band 2 (Intermittent User) means you have difficulty understanding spoken and written English. Band 1 (Non-User) means you have no ability to use the language. Band 0 means you did not attempt the test.',
          'You receive a band score for each of the four skills: Listening, Reading, Writing, and Speaking. These are reported as whole or half bands (e.g., 6.5, 7.0). Your Overall Band Score is the average of your four individual scores, rounded to the nearest whole or half band. For example, if you score 6.5 in Listening, 7.0 in Reading, 6.5 in Writing, and 7.0 in Speaking, your average is 6.75, which rounds to 7.0.',
          'The rounding rule is specific: if the average ends in .25, it rounds up to the next half band. If it ends in .75, it rounds up to the next whole band. So 6.25 becomes 6.5, and 6.75 becomes 7.0. Understanding this rounding can help you set realistic targets.',
          'Most universities set separate minimum requirements for each skill band in addition to an overall band requirement. For example, a university might require an overall band of 6.5 with no skill below 6.0. This means you cannot compensate for a low score in one area with a high score in another. It is essential to check the exact requirements of your target institution.',
          'For IELTS Academic, typical requirements are: undergraduate programs 6.0-6.5 overall, postgraduate programs 6.5-7.0 overall, and professional programs (medicine, nursing, law, teaching) 7.0-7.5 overall. IELTS General Training for migration typically requires 6.0-7.0 in each band depending on the country and visa type.'
        ]
      },
      {
        title: 'Registration & Results',
        body: [
          'You can register for IELTS online through the British Council or IDP IELTS websites, or in person at your nearest test centre. You will need a valid passport or national identity card for registration. The test fee varies by country but typically ranges from $215 to $265 USD, averaging around $245 USD. Some countries offer discounts for early registration or group bookings.',
          'Computer-Delivered IELTS allows you to take the test on a computer at the test centre. Results are available in 3-5 days. You can take the Computer-Delivered test up to four times per month, with more frequent available dates. Paper-Based IELTS results are available in 13 days. Your Test Report Form (TRF) is posted to you, and you can also view your results online temporarily.',
          'You can request up to five additional Test Report Forms to be sent to institutions free of charge (within 60 days of your test). After 60 days, or for more than five copies, a fee may apply. You should check with your receiving institution whether they accept electronic TRFs or require paper copies.',
          'If you feel your result does not reflect your true ability, you can request an Enquiry on Results (EOR), also known as a remark. This involves having your test re-marked by a different examiner. The fee for EOR varies by country and is refunded if your score changes.',
          'You may take IELTS as many times as you wish. There are no restrictions on re-sitting. However, most candidates find that focused preparation between attempts significantly improves their scores better than simply retaking the test repeatedly.',
          'Special arrangements are available for candidates with disabilities, including extra time, enlarged print materials, and other accommodations. You must provide medical documentation at registration.'
        ]
      },
      {
        title: 'Academic vs General Training',
        body: [
          'IELTS is offered in two versions: Academic and General Training. The Academic test is for those who want to study at undergraduate or postgraduate level in an English-speaking country, or for professional registration. The General Training test is for those who want to migrate to an English-speaking country, work in an English-speaking environment, or study at below-degree level.',
          'Both versions test all four skills, and the Listening and Speaking sections are identical. The difference lies in the Reading and Writing sections. In Academic Reading, passages are long and complex, sourced from academic journals, textbooks, and research publications. In General Training Reading, passages are shorter and more practical, sourced from advertisements, notices, company policies, newspapers, and magazines.',
          'In Academic Writing Task 1, you describe visual information such as graphs, charts, tables, maps, or process diagrams. You must identify main trends, make comparisons, and report data accurately using a formal academic register. In General Training Writing Task 1, you write a letter responding to a given situation using appropriate tone depending on the recipient.',
          'Writing Task 2 is an essay in both versions, but the topics differ. Academic essay topics are more intellectual: environmental issues, technology, education policy, social trends. General Training essay topics are more general: family life, local community issues, hobbies, work-life balance.',
          'Your choice between Academic and General Training depends entirely on your goals. Always confirm the specific test version required with your receiving institution before registering.'
        ]
      }
    ]
  },
  {
    id: 'listening',
    title: 'Listening',
    subtitle: '30 min — 40 questions — 4 sections',
    icon: '🎧',
    color: 'amber',
    description: 'The IELTS Listening test assesses your ability to understand spoken English in a range of contexts, from everyday social situations to academic lectures. You will hear four recordings of native English speakers and answer 40 questions. Each recording is played only once, making concentration and previewing strategies essential for success.',
    topics: [
      {
        title: 'Section Overview',
        body: [
          'The Listening test consists of four sections with ten questions each, totalling 40 questions. The sections progress from easier to more difficult. Sections 1 and 2 are based on social situations, while Sections 3 and 4 are based on educational and training contexts. The recordings include a variety of native English accents.',
          'Section 1 features a conversation between two speakers in a social context. Typical scenarios include someone booking a hotel room, enquiring about a course, joining a club, or arranging travel. The conversation involves an information exchange where specific details need to be identified: names, dates, prices, phone numbers, addresses.',
          'Section 2 is a monologue in a social context. This might be a guide giving information about a museum, a manager explaining company policies, a radio announcer describing a local event, or someone giving directions.',
          'Section 3 is a conversation between up to four speakers in an academic context. This typically involves students discussing a project, a tutorial with a professor, or students preparing a presentation. Questions often test understanding of opinions, attitudes, and the development of the discussion.',
          'Section 4 is an academic lecture or talk. A single speaker presents on an academic topic such as environmental science, business studies, archaeology, or public health. This is the most challenging section because of the complex vocabulary, dense information, and sustained focus required.',
          'In the paper-based test, you have 30 minutes to listen and 10 minutes at the end to transfer your answers. In the computer-based test, you have 2 minutes at the end to check your answers.'
        ]
      },
      {
        title: 'Question Types',
        body: [
          'Multiple choice questions test your ability to understand specific details, main ideas, or the speaker\'s purpose and opinion. You may be asked to choose one correct answer from three options or choose more than one answer from a longer list. The key strategy is to read all options before listening and listen for keywords that indicate the correct choice.',
          'Matching questions require you to match items in one list to items in another list. For example, you might match five speakers to five opinions, or match facilities to their locations on a map. There are usually more options than items, meaning not every option is used.',
          'Plan, map, and diagram labelling tests your spatial understanding. Strategies include studying the map before listening, noting the starting point, listening for directional language (opposite, next to, north of), and following the speaker\'s movements step by step.',
          'Form, note, table, flowchart, and summary completion requires you to fill in gaps in a written summary. Pay careful attention to word limits, usually stated as NO MORE THAN THREE WORDS AND/OR A NUMBER. Exceeding the word limit results in a mark of zero.',
          'Sentence completion questions present incomplete sentences that must be completed using words from the recording. The key strategy is to predict what type of word fills the gap before listening.',
          'Short answer questions require you to answer questions about the recording in a few words. Like all Listening tasks, correct spelling is mandatory.'
        ]
      },
      {
        title: 'Proven Strategies',
        body: [
          'Use the time before each section to read ahead. You are given approximately 30 seconds before each section to look at the questions. Begin reading immediately. Understand what each question is asking and determine any word limits.',
          'Predict the answer type and word class for each gap. Before the recording begins, look at each gap and predict whether the answer is a noun, verb, number, adjective, or proper noun. This priming makes your brain more receptive to the specific information when you hear it.',
          'Listen for signposts and keywords. Words like first of all, next, now, moving on to signal the structure. Words like but, however, on the other hand indicate a change or contrast.',
          'Check your spelling. If you spell a word incorrectly, it will be marked wrong. Pay special attention to commonly misspelled words: accommodation, separate, environment, government, necessary.',
          'Write answers directly on the question booklet during the test and transfer them later. You can underline keywords, cross out wrong options, and make notes.',
          'If you miss an answer, let it go immediately. Do not try to recall it while the recording continues. Make a guess and refocus.'
        ]
      },
      {
        title: 'Common Pitfalls',
        body: [
          'Getting stuck on one question and missing the next is the most common mistake. If you miss an answer, let it go immediately. One lost question is recoverable; losing several because you were thinking about the first one is devastating.',
          'Not reading the instructions carefully leads to preventable mistakes. The word limit instruction is absolute. Writing four words when instructed NO MORE THAN THREE WORDS scores zero.',
          'Spelling errors are a major source of lost marks. British English spellings are preferred but American spellings are also accepted as long as you are consistent.',
          'Writing more words than allowed is a common and costly error. Hyphenated words count as one word. Numbers written as digits count as one word.',
          'Not paying attention to plural forms can lose easy marks. If the answer is books and you write book, it is marked wrong.',
          'Writing while listening causes you to miss the next question. Write brief notes, then write the full answer during the pause.'
        ]
      },
      {
        title: 'Free Practice Resources',
        body: [
          'The British Council provides free sample tests with audio recordings and answer keys. These are the closest you can get to the real test without paying.',
          'IDP IELTS offers free preparation resources on their website including practice tests and the IELTS by IDP mobile app with daily practice activities.',
          'BBC 6 Minute English is an excellent free resource for daily listening practice. Each episode comes with a transcript and vocabulary explanations.',
          'IELTS Liz YouTube channel offers free video lessons specifically focused on the Listening test, created by a former IELTS examiner.',
          'E2 IELTS YouTube channel provides comprehensive Listening test strategies and full practice tests with step-by-step walkthroughs.',
          'Cambridge English offers some free sample tests on their website. As one of the co-owners of IELTS, their materials are the most authentic available.'
        ]
      }
    ]
  },
  {
    id: 'reading',
    title: 'Reading',
    subtitle: '60 min — 3 passages — 40 questions',
    icon: '📖',
    color: 'emerald',
    description: 'The IELTS Reading test evaluates your ability to read and understand texts taken from books, journals, magazines, and newspapers. You need to demonstrate a range of reading skills including reading for gist, reading for main ideas, reading for detail, skimming, understanding logical argument, and recognising writers\' opinions, attitudes, and purpose.',
    topics: [
      {
        title: 'Section Overview',
        body: [
          'The Academic Reading test contains three long passages with a total of 40 questions. The passages are taken from books, academic journals, magazines, newspapers, and online resources. They cover a range of topics from science, technology, history, sociology, psychology, education, and environmental issues.',
          'The passages increase in difficulty. Passage 1 is the easiest with simpler vocabulary and more straightforward question types. Passage 2 is moderately difficult. Passage 3 is the most challenging.',
          'Each passage is approximately 700-1000 words long. Questions follow the order of information in the passage for most question types, but not all — matching headings and matching features questions are often presented in random order.',
          'In the General Training Reading test, Section 1 contains 2-3 short factual texts about everyday life, Section 2 contains 2 work-related texts, and Section 3 contains one longer text on a topic of general interest.',
          'Your reading skills need to be flexible. Skimming is essential for understanding each passage before attempting questions. Scanning is crucial for locating answers. Careful reading is needed for understanding complex sentences and making precise judgements.',
          'The Academic Reading test is widely considered the most challenging of the four IELTS sections for many candidates.'
        ]
      },
      {
        title: 'Question Types',
        body: [
          'Multiple choice questions test your ability to understand the main idea, specific details, or the writer\'s purpose. Read the question carefully, locate the relevant section, and eliminate incorrect options one by one.',
          'Identifying information (True/False/Not Given) questions require precise understanding. True means the passage directly states this. False means the passage directly contradicts this. Not Given means the information is not mentioned at all.',
          'Identifying writer\'s views/claims (Yes/No/Not Given) is similar but focuses on opinions. Yes means the writer expresses this view. No means the writer expresses a contradictory view. Not Given means no view is expressed.',
          'Matching headings questions test your ability to identify the main idea of each paragraph. Read the headings first, then read each paragraph and identify its central point.',
          'Matching features questions require you to match statements to a list of options. Test your ability to scan for specific information and understand relationships.',
          'Sentence completion, summary completion, diagram labelling, and table completion all require you to fill in gaps using words from the passage. Copy the exact words from the passage without changing their form.'
        ]
      },
      {
        title: 'Reading Strategies',
        body: [
          'Skim the passage for gist before attempting questions. Spend 2-3 minutes reading the first sentence of each paragraph to build a mental map of the passage structure.',
          'Scan for specific information using keywords from the questions. Remember that the passage may use synonyms or paraphrases instead of exact words.',
          'Use keywords to locate answers but do not rely solely on keyword matching. Many questions test understanding of meaning, not word-spotting.',
          'Do not read every word. The most common mistake is trying to understand everything, which leads to running out of time.',
          'Spend approximately 20 minutes per passage. Better allocation: 15-17 minutes on Passage 1, 20 minutes on Passage 2, 23-25 minutes on Passage 3.',
          'Read the questions before the passage. This primes your brain for what information to look for during skimming.'
        ]
      },
      {
        title: 'T/F/NG Deep Dive',
        body: [
          'True/False/Not Given questions are the most challenging question type. They require precise, analytical reading and a clear understanding of the difference between False and Not Given.',
          'True means the statement directly matches the passage. The passage must directly state the information, not imply it.',
          'False means the statement contradicts the passage. The passage must state something that directly opposes the statement.',
          'Not Given means the information is neither confirmed nor contradicted. The passage might discuss the general topic but does not mention the specific information.',
          'Do not use your own knowledge or common sense. The answer must be based solely on the information in the passage.',
          'Ask yourself: does the passage directly state this? If yes, True. Does it directly state the opposite? If yes, False. Is it not mentioned at all? If yes, Not Given.'
        ]
      },
      {
        title: 'Time Management',
        body: [
          'Time management is the single most important factor in achieving a high Reading score. With 60 minutes for 40 questions, you have an average of 1.5 minutes per question.',
          'Passage 1 is the easiest. Spend 15-17 minutes on it to build confidence and establish your rhythm.',
          'Passage 2 is moderate. Spend approximately 20 minutes. Do not let this section eat into the time for Passage 3.',
          'Passage 3 is the most difficult. Spend 23-25 minutes on it. Take your time to understand the logical structure.',
          'If running out of time, focus on quicker question types (sentence completion, table completion) and guess the rest.',
          'Check the clock regularly at the 15, 25, and 35-minute marks to stay on track.'
        ]
      },
      {
        title: 'Free Practice Resources',
        body: [
          'The British Council provides free IELTS Reading practice tests on their official website with all question types and answer keys.',
          'IELTS Liz offers comprehensive free Reading tips and strategies on her website and YouTube channel with worked examples.',
          'IDP IELTS provides free Reading sample tests and preparation resources with section-by-section breakdowns.',
          'Cambridge past papers (Cambridge IELTS 1-18) are available online. These are the most authentic practice materials available.',
          'The Guardian Weekly and BBC News are excellent for building reading skills. Read one long-form article daily and practice summarising each paragraph.',
          'Use online dictionaries like Cambridge Dictionary when encountering unfamiliar words during practice.'
        ]
      }
    ]
  },
  {
    id: 'writing-task1',
    title: 'Writing Task 1',
    subtitle: '20 min — 150 words — Visual Description',
    icon: '📊',
    color: 'purple',
    description: 'In IELTS Academic Writing Task 1, you must describe visual information in the form of a graph, chart, table, map, or process diagram. You need to identify main trends, compare data, and present the information in a well-organised, accurate report using appropriate academic language.',
    topics: [
      {
        title: 'Task Overview',
        body: [
          'IELTS Academic Writing Task 1 requires you to write a report describing visual information — a line graph, bar chart, pie chart, table, map, process diagram, or combination. You must write at least 150 words in 20 minutes. Task 1 contributes one-third of your total Writing score.',
          'Task 1 is a report, not an essay. You do not give your opinion or draw conclusions. Your job is to objectively describe the information shown.',
          'You must include an overview paragraph summarising the main trend. This is the most important paragraph. Without an overview, you cannot score above Band 5 for Task Achievement.',
          'Do not include information not shown in the visual or speculate about reasons. Stay objective and report only what you see.',
          'Use the correct tense: past tense for past data, present simple for processes, future forms for predictions.',
          'Select and describe the most important information. You do not have enough words to describe every single data point.'
        ]
      },
      {
        title: 'Structure Template',
        body: [
          'A well-structured Task 1 report has four paragraphs: Introduction, Overview, Body 1, and Body 2.',
          'Introduction: one sentence paraphrasing the question. Do not copy the question word for word.',
          'Overview: one or two sentences describing the main trends without specific numbers.',
          'Body 1: describe the first main feature in detail, including specific data.',
          'Body 2: describe the second main feature with data and comparisons.',
          'For process diagrams: introduction paraphrases, overview states number of stages, Body 1 covers first half of stages, Body 2 covers remaining stages. For maps: overview describes most significant change, Body 1 describes earlier layout, Body 2 describes later layout.'
        ]
      },
      {
        title: 'Vocabulary for Trends',
        body: [
          'For increases: rise, increase, grow, climb, surge, soar, rocket. For decreases: fall, decrease, drop, decline, plummet, plunge.',
          'For weak changes: edge up, creep up, dip, edge down, taper off.',
          'Adjectives: a sharp rise, a significant increase, a gradual decline, a slight drop, a steady growth.',
          'Adverbs: rose sharply, increased significantly, declined gradually, dropped slightly, grew steadily.',
          'For stability: remained stable, stayed constant, levelled off, plateaued, fluctuated.',
          'Prepositions: increased from 20% to 50% (to for ending point), increased by 30% (by for amount of change), stood at 50% (at for specific point).'
        ]
      },
      {
        title: 'Making Comparisons',
        body: [
          'Comparisons are the heart of a good Task 1 report. Compare between categories and across time periods.',
          'Use superlatives: the highest percentage, the lowest figure, the most significant increase.',
          'Use fractions and multiples: three times higher than, doubled between 2010 and 2020, more than double that of.',
          'Group categories logically: The three fossil fuel sources all followed a downward trend. In contrast, all forms of renewable energy showed consistent growth.',
          'Use linking words: In contrast to X, Y...; Similarly, Z also showed...; X experienced a different pattern.',
          'The comparison should be the main focus of each body paragraph.'
        ]
      },
      {
        title: 'Process & Map Language',
        body: [
          'For processes: the process begins with, next, then, after that, subsequently, finally, the process concludes with.',
          'Use present simple passive for industrial processes: the raw materials are first collected and then transported.',
          'For maps: to the north of, south of, adjacent to, in the centre of, opposite, on the opposite side of.',
          'For maps showing change: was demolished, was built, was converted into, was replaced by, was extended.',
          'Describe what stayed the same: remained unchanged, was preserved, was retained.',
          'Your overview for processes states the number of stages; for maps, it describes the most significant change.'
        ]
      },
      {
        title: 'Common Mistakes',
        body: [
          'Giving your opinion is a critical mistake. Task 1 is a report, not an essay. Do not say I think or in my opinion.',
          'Not including an overview paragraph limits your Task Achievement score to Band 5 maximum.',
          'Not including data in body paragraphs makes your description too vague.',
          'Using the wrong tense significantly reduces your score. Check the date in the question carefully.',
          'Describing every single data point is inefficient. Select 4-5 significant points and describe the overall shape.',
          'Poor paragraphing makes your report difficult to follow. Each paragraph has a clear purpose.'
        ]
      },
      {
        title: 'Free Resources',
        body: [
          'IELTS Liz offers an excellent free guide to Writing Task 1 on her website and YouTube channel.',
          'IELTS Advantage provides free Task 1 resources including sample questions, model answers, and structure templates.',
          'Cambridge Write & Improve gives instant free feedback on your writing with an estimated CEFR level.',
          'British Council offers free webinars and online courses for IELTS Writing through their Understanding IELTS course on FutureLearn.',
          'Practice regularly with authentic test materials from the Cambridge IELTS series. Time yourself strictly at 20 minutes.',
          'Build a personalised vocabulary bank with sections for upward verbs, downward verbs, adjectives, adverbs, prepositions, and comparison phrases.'
        ]
      }
    ]
  },
  {
    id: 'writing-task2',
    title: 'Writing Task 2',
    subtitle: '40 min — 250 words — Essay',
    icon: '✍️',
    color: 'purple',
    description: 'IELTS Writing Task 2 requires you to write a formal essay in response to a question, statement, or problem. You must present and justify an opinion, discuss different perspectives, or analyse causes and solutions. Task 2 contributes two-thirds of your total Writing score.',
    topics: [
      {
        title: 'Task Overview',
        body: [
          'Writing Task 2 requires an essay of at least 250 words in 40 minutes. Topics include education, technology, environment, health, society, culture, work, crime, media, and globalisation.',
          'Four assessment criteria, each worth 25%: Task Response, Coherence and Cohesion, Lexical Resource, Grammatical Range and Accuracy.',
          'To achieve Band 6+ for Task Response, you must fully address all parts of the question. If you miss any part, you cannot score above Band 5.',
          'Your position must be clear throughout the essay: stated in the introduction, developed in body paragraphs, and restated in the conclusion.',
          'Support main points with specific examples: For example, during the COVID-19 pandemic, schools worldwide shifted to online platforms like Zoom.',
          'The recommended word count is 270-300 words. Under 250 results in a penalty. Over 350 often leads to repetition.'
        ]
      },
      {
        title: 'Essay Types',
        body: [
          'Opinion/Agree-Disagree: To what extent do you agree or disagree? Clearly state your position and maintain it.',
          'Discussion: Discuss both views and give your opinion. Discuss both sides fairly, then clearly state your position.',
          'Problem-Solution: What are the causes and solutions? Analyse causes and propose practical, well-explained solutions.',
          'Advantages-Disadvantages: Do the advantages outweigh the disadvantages? State clearly which side is more significant.',
          'Double Question: Two separate questions to answer. Answer both fully within a coherent essay structure.',
          'Identify the essay type in the first 30 seconds by looking for key words in the question.'
        ]
      },
      {
        title: 'Structure Template',
        body: [
          'Introduction: hook introducing the topic, paraphrase of the question, thesis statement with your position.',
          'Body 1: topic sentence stating main point, explanation, specific example. Follow this pattern for each body paragraph.',
          'Body 2: second main point with transition at the start: On the other hand, Furthermore, However.',
          'Conclusion: 2-3 sentences summarising main points and restating your position. No new information.',
          'Spend the first 10 minutes planning: analyse the question, brainstorm ideas, outline your essay structure.',
          'Leave 3-5 minutes at the end for proofreading: check spelling, grammar, word count, and question coverage.'
        ]
      },
      {
        title: 'Coherence & Cohesion',
        body: [
          'Coherence: logical flow from introduction to body to conclusion. Clear topic sentences, one idea per paragraph.',
          'Cohesion: for adding — furthermore, moreover, in addition; for contrasting — however, on the other hand; for results — consequently, as a result, therefore; for examples — for example, for instance.',
          'Use referencing: this, these, such, the former, the latter to avoid repetition.',
          'Each paragraph must have a clear central topic introduced by a topic sentence.',
          'Do not overuse obvious linking words. Use a variety of cohesive devices.',
          'Use substitution and ellipsis for sophisticated cohesion: Some experts support this policy, while others do not.'
        ]
      },
      {
        title: 'Lexical Resource',
        body: [
          'For Band 7+: use sufficient range for flexibility and precision, use less common vocabulary with awareness of style and collocation.',
          'Avoid repetition by using synonyms: global warming, climate crisis, rising global temperatures.',
          'Use topic-specific vocabulary: curriculum, pedagogy, higher education, vocational training, tuition fees.',
          'Use correct collocations: make a decision, take action, play a role, heavy traffic.',
          'Avoid memorised phrases: every coin has two sides, it is a hotly debated topic. Use specific, natural language.',
          'Be precise: instead of good use beneficial, advantageous; instead of bad use detrimental, harmful.'
        ]
      },
      {
        title: 'Grammatical Range',
        body: [
          'Use a mix of simple, compound, and complex sentences. Simple: Education is essential. Compound: Education is essential, and it contributes to economic growth. Complex: Although education is essential, its benefits extend beyond the individual.',
          'Use conditional sentences: If governments invest in education, future generations will benefit.',
          'Use relative clauses: Students who receive financial support are more likely to complete their studies.',
          'Use passive voice where appropriate: Stricter regulations should be implemented by the government.',
          'Use inversion: Not only does technology improve efficiency, but it also creates new opportunities.',
          'Aim for frequent error-free sentences with a range of complex structures.'
        ]
      },
      {
        title: 'Common Mistakes',
        body: [
          'Not answering all parts of the question is the most damaging mistake. Underline different parts you need to address.',
          'Unclear or inconsistent position confuses the examiner. Maintain a clear position throughout.',
          'Not including relevant examples weakens your argument. Support each main point with a concrete example.',
          'Using informal language: avoid contractions (do not -> do not), phrasal verbs (go up -> increase), colloquial expressions (a lot of -> many).',
          'Repetitive vocabulary limits your Lexical Resource score. Vary your vocabulary using synonyms.',
          'Under the word count results in an automatic penalty. Aim for at least 270 words.'
        ]
      },
      {
        title: 'Free Resources',
        body: [
          'IELTS Liz offers comprehensive free Task 2 resources including step-by-step guides, model answers, and vocabulary resources.',
          'IELTS Advantage provides free Task 2 strategy guides, sample essays, and vocabulary resources.',
          'Cambridge Write & Improve gives instant feedback on your writing with CEFR level assessment.',
          'Grammarly free browser extension checks grammar, spelling, and style as you type.',
          'British Council free Understanding IELTS online course covers Task 2 with video tutorials from examiners.',
          'Practice with 20-30 authentic questions covering all essay types. Write full essays for at least 10.'
        ]
      }
    ]
  },
  {
    id: 'speaking',
    title: 'Speaking',
    subtitle: '11-14 min — 3 parts — Face-to-face',
    icon: '🎤',
    color: 'rose',
    description: 'The IELTS Speaking test is a face-to-face interview with a certified examiner. It assesses your ability to communicate effectively across a range of contexts, from personal topics to abstract academic discussions.',
    topics: [
      {
        title: 'Part 1: Introduction & Interview',
        body: [
          'Part 1 lasts 4-5 minutes with questions about familiar topics: home, work/study, family, hobbies, food, travel, daily routine.',
          'Give answers that are 2-3 sentences long. Do not give one-word answers. Extend naturally using the formula: answer + reason + example.',
          'Do not memorise answers. Examiners can detect reciting. Practice speaking naturally about common topics.',
          'The examiner will ask 3-4 questions on each of 3-4 different topics. Maintain eye contact and natural gestures.',
          'Common Part 1 topics include: Work/Study, Home/Accommodation, Hobbies, Food, Travel, Weather.',
          'Practice speaking on all these topics with extended answers until they feel natural.'
        ]
      },
      {
        title: 'Part 2: Long Turn',
        body: [
          'Part 2 gives you a cue card with a topic and 3-4 bullet points. You have 1 minute to prepare notes, then speak for 1-2 minutes.',
          'Use the 1-minute preparation time wisely. Jot down keywords and short phrases. Structure your notes like a mini-outline.',
          'Structure your talk with a clear beginning, middle, and end. Cover the bullet points in logical order.',
          'Speak for at least 1 minute 30 seconds but do not exceed 2 minutes. Aim for 1 minute 45 seconds.',
          'Do not memorise specific talks. Practice the skill of speaking at length on any topic.',
          'Common Part 2 categories: Describe a person, place, object, experience, or habit/routine.'
        ]
      },
      {
        title: 'Part 3: Discussion',
        body: [
          'Part 3 lasts 4-5 minutes discussing abstract ideas related to the Part 2 topic. Questions require analysis, evaluation, and speculation.',
          'Questions follow a pattern: comparative (How has this changed?), speculative (What might happen?), evaluative (What are the advantages and disadvantages?).',
          'Give extended answers of 3-5 sentences: answer + reasoning + example + alternative perspective.',
          'Use discourse markers: There are several factors to consider. Firstly... Secondly... Finally...',
          'Use hedging language: It could be argued that..., One might say that...',
          'Do not be afraid to express your opinion, but support it with reasoning.'
        ]
      },
      {
        title: 'Fluency & Coherence',
        body: [
          'Fluency means speaking smoothly at a natural pace without excessive hesitation. Not speaking as fast as possible.',
          'Coherence means logically organised ideas connected with discourse markers: First of all, Another point is, On the other hand, Finally.',
          'Do not memorise answers. Memorised speech disrupts fluency and makes intonation flat.',
          'Use recovery phrases if you lose your train of thought: What I was trying to say is...',
          'Paraphrase when you cannot think of a word. Describe the concept instead.',
          'Record yourself speaking and listen back critically to identify patterns for improvement.'
        ]
      },
      {
        title: 'Lexical Resource',
        body: [
          'Use idiomatic language naturally: break the ice, on the same page, hit the nail on the head.',
          'Develop topic-specific vocabulary: curriculum, extracurricular (education); innovation, automation (technology); sustainability, conservation (environment).',
          'Paraphrase when you cannot think of a word. This shows linguistic resourcefulness.',
          'Avoid repetition by using synonyms. Instead of important, use crucial, vital, essential, critical.',
          'Use fillers naturally: sort of, kind of, basically, actually. These give thinking time.',
          'Vocabulary should not sound forced. One naturally used idiom is better than three used inaccurately.'
        ]
      },
      {
        title: 'Grammatical Range & Accuracy',
        body: [
          'Use a variety of sentence structures: simple, compound, and complex sentences.',
          'Use different tenses accurately: past for experiences, present perfect for life experiences, present for habits, future for plans.',
          'Use conditional structures: If I study hard, I will get a high score (first); If I had more time, I would travel (second).',
          'Self-correction is positive. If you make a mistake, correct naturally: He go to... I mean, he goes to university.',
          'Use a range of sentence openings. Start with adverbs: Interestingly... or prepositional phrases: In recent years...',
          'Common errors: subject-verb agreement, articles, prepositions, tense consistency. Identify your most frequent errors.'
        ]
      },
      {
        title: 'Pronunciation',
        body: [
          'Pronunciation is assessed on individual sounds, word stress, sentence stress, and intonation. Native-like accent is not required — clarity is key.',
          'Identify difficult English sounds for your language background and practice them in isolation, then words, then sentences.',
          'Word stress: stressing the wrong syllable makes words hard to understand. Learn stress patterns when learning new words.',
          'Sentence stress: content words are stressed, function words are usually unstressed. I WENT to the STORE.',
          'Intonation: rising for questions, falling for statements. A monotone voice sounds robotic.',
          'Chunk speech into meaningful units: I went to the store / yesterday. This makes speech easier to follow.'
        ]
      },
      {
        title: 'Free Resources',
        body: [
          'IELTS Liz offers free Speaking resources covering all three parts with sample questions and model answers.',
          'E2 IELTS YouTube channel offers comprehensive Speaking preparation including full mock interviews with feedback.',
          'IELTS Advantage provides free Speaking resources including sample answers at different band levels.',
          'Record yourself speaking using your phone. Answer Part 1, 2, and 3 questions and listen back critically.',
          'Practice with a speaking partner. Find a study partner and take turns being the examiner.',
          'Immerse yourself in spoken English: podcasts, movies with English subtitles, YouTube. Shadowing is excellent for pronunciation.'
        ]
      }
    ]
  },
  {
    id: 'band-guide',
    title: 'Band Guide',
    subtitle: 'What Each Band Means & How to Improve',
    icon: '📈',
    color: 'sky',
    description: 'Understanding the IELTS band descriptors is essential for targeted improvement. Each band level from 0 to 9 describes a specific level of English proficiency across the four skills.',
    topics: [
      {
        title: 'Band 4.0-5.0 (Limited-Modest)',
        body: [
          'At Band 4, basic competence is limited to familiar situations. At Band 5, partial command with coping with overall meaning but many mistakes.',
          'Focus on grammar fundamentals: master basic tenses, articles, and prepositions. These form the foundation of all communication.',
          'Build core vocabulary using the 2000 most common English words. Create a vocabulary notebook with definitions and example sentences.',
          'Work on sentence structure: connect ideas using and, but, so, because. Practice compound and complex sentences.',
          'For pronunciation, focus on clarity. Identify difficult English sounds and practice them.',
          'In Listening, understand slow, clear speech about familiar topics. In Reading, understand short, simple texts.'
        ]
      },
      {
        title: 'Band 5.5-6.0 (Modest-Competent)',
        body: [
          'At Band 6, you are a competent user with effective command despite some inaccuracies.',
          'Focus on extending your answers. In Speaking, add a reason, example, or comparison to every answer.',
          'Expand vocabulary significantly. Learn topic-specific vocabulary for each common IELTS topic.',
          'Reduce error frequency by identifying your most common error types from writing and recordings.',
          'Improve coherence and cohesion with clear paragraphing and appropriate linking words.',
          'In Listening, understand main points of standard speech but may miss details in academic lectures.'
        ]
      },
      {
        title: 'Band 6.5-7.0 (Good)',
        body: [
          'At Band 7, you can handle complex language and understand detailed reasoning. This is the most commonly required score.',
          'Focus on sophisticated vocabulary: go beyond topic-specific words to precise, nuanced choices.',
          'Master complex grammatical structures: conditional sentences, relative clauses, passive constructions, inversion.',
          'Develop natural fluency in speaking. Think in English, not your native language.',
          'Work on precision and nuance. The difference between Band 7 and 8 often comes down to choosing exactly the right word.',
          'In Writing, produce well-organised essays with good vocabulary and grammar range.'
        ]
      },
      {
        title: 'Band 7.5-9.0 (Very Good-Expert)',
        body: [
          'At Band 8, fully operational command with only occasional unsystematic inaccuracies. At Band 9, complete understanding in all situations.',
          'Focus on nuance and idiomatic language: to strike a balance, to play a pivotal role, to be a double-edged sword.',
          'Achieve complete accuracy. Errors must be rare and unsystematic.',
          'Develop natural delivery in Speaking. Speech should sound effortless with natural intonation and rhythm.',
          'Demonstrate subtle meaning and sophisticated argument. Understand implicit meaning and inference.',
          'Practice with challenging academic materials to maintain and extend your proficiency.'
        ]
      },
      {
        title: 'Score Improvement Tips',
        body: [
          'Set a clear target band score based on your specific requirements. Not I want to do well but I need overall Band 7.0 with no skill below 6.5.',
          'Identify your weakest skill with a diagnostic test. Your lowest-scoring skill deserves most of your preparation time.',
          'Create a realistic study schedule for 1-2 hours daily. Balance skill development with skill practice.',
          'Use official materials from British Council, IDP, and Cambridge English for authentic content.',
          'Get feedback on your performance, especially for Writing and Speaking. You cannot reliably identify your own errors.',
          'Take at least one full practice test per week under exact exam conditions. Track progress with a score log.'
        ]
      }
    ]
  },
  {
    id: 'study-plans',
    title: 'Study Plans',
    subtitle: '4-Week, 8-Week & 12-Week Schedules',
    icon: '📅',
    color: 'teal',
    description: 'Your IELTS preparation should be systematic and structured. This section provides three study plans — intensive (4 weeks), balanced (8 weeks), and comprehensive (12 weeks) — along with daily study templates.',
    topics: [
      {
        title: '4-Week Intensive Plan',
        body: [
          'For candidates with strong English skills (Band 6.0-6.5) needing familiarisation with test format and strategies. Requires 3-4 hours daily.',
          'Week 1: Diagnostic test and fundamentals. Week 2: Skill-building for each section.',
          'Week 3: Practice tests and weak area focus. Week 4: Full mocks and exam techniques.',
          'Consistency is key. You cannot afford to miss days in a 4-week plan.',
          'Priortise IELTS Liz strategy videos, British Council practice tests, and Cambridge past paper samples.',
          'Use an error log: for each mistake, write what you did wrong and what you should have done.'
        ]
      },
      {
        title: '8-Week Balanced Plan',
        body: [
          'For candidates needing moderate improvement (Band 5.5 to 6.5 or 6.0 to 7.0). Requires 2-3 hours daily. The most commonly recommended timeline.',
          'Weeks 1-2: Foundation building with grammar review, vocabulary building, and extensive English input.',
          'Weeks 3-4: Section-specific strategies for Listening, Reading then Writing, Speaking.',
          'Weeks 5-6: Intensive practice with feedback. Full practice test every 3-4 days.',
          'Weeks 7-8: Mocks and refinement. Full test every other day. Focus on time management.',
          'Use a balanced approach: 25% of time on each skill.'
        ]
      },
      {
        title: '12-Week Comprehensive Plan',
        body: [
          'For candidates needing significant improvement (Band 4.5-5.0 to 6.5+) or more preparation time. Requires 1.5-2 hours daily.',
          'Weeks 1-4: Vocabulary, grammar, and extensive input. Master tenses, articles, conditionals.',
          'Weeks 5-8: Skill development per section with question type study and timed exercises.',
          'Weeks 9-10: Timed practice with one full test every 2-3 days and detailed error analysis.',
          'Weeks 11-12: Mock exams daily. Simulate exact exam conditions. Build confidence.',
          'In the final week, prepare test day logistics: confirm date, location, documents, route.'
        ]
      },
      {
        title: 'Daily Study Template',
        body: [
          '30 minutes: Vocabulary review using spaced repetition. Learn 10-15 new words daily.',
          '30 minutes: Listening or Reading (alternate daily) under timed conditions.',
          '30 minutes: Writing practice alternating Task 1 and Task 2.',
          '20 minutes: Speaking practice recording yourself answering prompts.',
          '10 minutes: Review and reflection. Write 3 things done well and 2 things to improve.',
          'Sunday: Full practice test or extended review.'
        ]
      },
      {
        title: 'Free Resources for Each Plan',
        body: [
          'All plans: British Council free practice tests, IELTS Liz YouTube, IDP IELTS app, BBC 6 Minute English.',
          '4-week: Prioritise strategy videos and full practice tests.',
          '8-week: Add Road to IELTS course, IELTS Advantage guides, Cambridge Write & Improve.',
          '12-week: Add FutureLearn Understanding IELTS course, Magoosh flashcards, BBC Learning English.',
          'Join online IELTS study communities: Reddit r/IELTS, Facebook groups, Discord servers.',
          'Create a resource folder with bookmarks organised by skill for quick access.'
        ]
      }
    ]
  },
  {
    id: 'free-resources',
    title: 'Free Resources',
    subtitle: 'Top Free Books, Websites & YouTube Channels',
    icon: '🎯',
    color: 'green',
    description: 'There is an abundance of high-quality free IELTS preparation materials available online from official partners, expert teachers, and reputable educational organisations.',
    topics: [
      {
        title: 'Official Sources',
        body: [
          'British Council official IELTS website offers free practice tests with answer keys and sample answers.',
          'IDP IELTS offers free preparation resources and IELTS by IDP mobile app with daily practice activities.',
          'IELTS.org offers sample test questions, test day advice, format information, and free downloadable booklets.',
          'Cambridge Write & Improve provides free instant AI feedback on your writing.',
          'Cambridge English offers free sample tests on their website.',
          'British Council IELTS Prep App includes free practice tests, vocabulary exercises, and expert tips.'
        ]
      },
      {
        title: 'Best YouTube Channels',
        body: [
          'IELTS Liz is the most comprehensive free channel from a former examiner covering all sections.',
          'E2 IELTS offers polished classroom-style lessons with clear explanations and visual aids.',
          'IELTS Advantage provides in-depth strategy guides emphasising assessment criteria.',
          'Fastrack IELTS offers beginner-friendly content with clear, well-structured lessons.',
          'IELTS by IDP is the official IDP channel with authentic tips from test makers.',
          'BBC Learning English offers grammar, vocabulary, pronunciation, and listening videos.'
        ]
      },
      {
        title: 'Listening Practice',
        body: [
          'BBC 6 Minute English is the gold standard for free daily listening practice with transcripts and vocabulary.',
          'TED Talks provide academic listening practice similar to IELTS Section 4.',
          'British Council podcasts offer level-specific listening practice with transcripts and exercises.',
          'IELTS Prepare by IDP is the official IELTS podcast covering all aspects of preparation.',
          'BBC World Service News for Band 7+ candidates with natural speed and sophisticated vocabulary.',
          'For American accents, use NPR. For Australian accents, use ABC News Australia.'
        ]
      },
      {
        title: 'Reading Practice',
        body: [
          'The Guardian Weekly offers long-form articles similar to IELTS passages.',
          'BBC News provides well-written articles on global topics. The Future section covers science and technology.',
          'National Geographic covers geography, science, wildlife — all common IELTS themes.',
          'New Scientist provides science and technology articles matching Academic Reading style.',
          'The Economist for Band 7+ candidates with dense, sophisticated vocabulary.',
          'For each article, practice summarising paragraphs, identifying opinion, and noting vocabulary.'
        ]
      },
      {
        title: 'Vocabulary Building',
        body: [
          'Magoosh IELTS Vocabulary Flashcards: 600+ essential words with definitions and audio.',
          'Create topic-specific word lists for each common theme. Learn 15-20 words per topic.',
          'Use a collocation dictionary to learn natural word combinations.',
          'The Academic Word List (AWL) contains 570 word families commonly used in academic texts.',
          'Use vocabulary.com for interactive learning with definitions, examples, and quizzes.',
          'Keep a vocabulary journal organised by topic with word, definition, example, synonyms, and collocations.'
        ]
      },
      {
        title: 'Free Books & PDFs',
        body: [
          'Cambridge IELTS practice books are commercial publications. Cambridge English also offers official sample tests that are free to use.',
          'Official sample questions and practice papers are available free from IELTS.org, British Council and IDP.',
          'IELTS Sample Tests from British Council offer free downloadable practice tests in PDF format.',
          'IELTS.org provides official information about the test format, scoring and sample questions.',
          'IELTS teachers offer free PDF guides: IELTS Liz, IELTS Advantage provide downloadable resources.',
          'Use Google Scholar to find free academic articles for additional reading practice.'
        ]
      }
    ]
  },
  {
    id: 'common-mistakes',
    title: 'Common Mistakes',
    subtitle: 'Frequent Errors & How to Fix Them',
    icon: '⚠️',
    color: 'red',
    description: 'Thousands of IELTS candidates make the same mistakes every year. Understanding these common errors and learning how to avoid them can significantly improve your score.',
    topics: [
      {
        title: 'Listening Mistakes',
        body: [
          'Not reading ahead before each section starts. Use every pause to read questions and predict answer types.',
          'Getting stuck on one question and missing the next. Let it go immediately, guess, and move on.',
          'Spelling errors: accommodation, separate, government, environment. Practice these until automatic.',
          'Not following word limits: NO MORE THAN TWO WORDS means exactly that.',
          'Writing while listening instead of jotting brief notes and writing full answers during pauses.',
          'Not paying attention to plural forms. The s sound matters.'
        ]
      },
      {
        title: 'Reading Mistakes',
        body: [
          'Reading every word instead of using strategic skimming and scanning.',
          'Spending too long on one passage. Stick to time allocation and move on.',
          'Not checking T/F/NG carefully. Base answers only on the text, not your knowledge.',
          'Misunderstanding the difference between T/F/NG (facts) and Y/N/NG (writer opinions).',
          'Overusing skimming when careful reading is needed for detail questions.',
          'Not checking answer format: writing the word instead of the letter, or exceeding word limits.'
        ]
      },
      {
        title: 'Writing Mistakes',
        body: [
          'Not answering the question fully. Underline all parts you need to address.',
          'No clear structure. Use clear paragraphing with topic sentences and supporting examples.',
          'Informal register: avoid contractions, phrasal verbs, and colloquial expressions.',
          'Repetitive vocabulary limiting Lexical Resource score. Vary with synonyms.',
          'Not including specific examples. Support every main point with a concrete example.',
          'Not proofreading. Leave 3-5 minutes to check spelling, grammar, and punctuation.'
        ]
      },
      {
        title: 'Speaking Mistakes',
        body: [
          'Giving yes/no answers. Always extend with answer + reason + example.',
          'Memorising answers. Flat intonation and robotic delivery are easily detected.',
          'Stopping frequently or using long silences. Use fillers to keep the conversation flowing.',
          'Using overly complex words incorrectly. Accuracy matters more than complexity.',
          'Speaking too quietly or too fast. Speak at moderate volume and clear pace.',
          'Not using the full range of grammatical structures. Mix simple and complex sentences.'
        ]
      },
      {
        title: 'General Mistakes',
        body: [
          'Not following instructions. Read every instruction carefully.',
          'Poor time management affecting all sections. Practice with strict time limits.',
          'Not checking answers when time permits. Always use remaining time for review.',
          'Test day anxiety. Prepare thoroughly, practice relaxation techniques, arrive early.',
          'Insufficient practice. Take at least 20 full practice tests before your real exam.',
          'Neglecting any one skill. Allocate study time proportionally across all four skills.'
        ]
      }
    ]
  }
];

export const TOEFL_GUIDE_CONTENT: GuideSection[] = [
  {
    id: 'overview',
    title: 'Overview',
    subtitle: 'Exam Format, New 2026 Changes & Scoring',
    icon: '📋',
    color: 'red',
    description: 'The TOEFL iBT (Test of English as a Foreign Language Internet-Based Test) is accepted by over 11,000 universities in more than 150 countries. The 2026 format introduces significant changes including shorter test duration, adaptive question delivery, and new question types.',
    topics: [
      {
        title: 'What is TOEFL iBT?',
        body: [
          'The TOEFL iBT is developed by ETS and designed to measure your ability to use English in an academic setting. It is accepted by more than 11,000 institutions in over 150 countries.',
          'Total score ranges from 0 to 120 (traditional scale), with each section scored 0-30. The 2026 format introduces band-based scoring from 1 to 6 per section.',
          'TOEFL scores are valid for two years. The test fee is approximately $245 USD. You can register online through your ETS account.',
          'The test is computer-based at test centres or via Home Edition with live proctoring. Most universities require 80-100 on the traditional scale.',
          'Preparation requires focused practice across all four skill areas with attention to the integrated nature of many tasks.',
          'The 2026 format puts greater emphasis on practical, real-world English skills alongside academic English.'
        ]
      },
      {
        title: '2026 Format Changes',
        body: [
          'The most significant revision since the TOEFL iBT was launched. The entire exam now takes approximately 2 hours, down from about 3 hours.',
          'Adaptive testing technology adjusts question difficulty based on your performance. Correct answers lead to harder questions.',
          'New question types: Complete the Words (fill in missing letters), Read in Daily Life (everyday materials), Listen & Repeat, Build a Sentence, Write an Email, and Interview tasks.',
          'Reading passages are shorter: ~250 words for academic, 100-150 for daily life. Listening clips reduced to 1-1.5 minutes.',
          'Fewer questions: Reading has 20 questions, Listening has 28. Speaking has 4 tasks, Writing has 2 tasks.',
          'New scoring system uses bands 1-6 per section alongside continued reporting on the familiar 0-120 scale through concordance tables.'
        ]
      },
      {
        title: 'Test Format',
        body: [
          'Four sections in fixed order: Reading, Listening, Speaking, Writing. Total testing time approximately 2 hours.',
          'Reading: ~35 minutes, 2 passages, 20 questions. Academic passage ~250 words + daily life passage 100-150 words.',
          'Listening: ~36 minutes, 3 lectures (1-1.5 min each) + 2 conversations (~30 sec each), 28 questions.',
          'Speaking: ~16 minutes, 4 tasks including independent opinion, Listen & Repeat, integrated, and Interview.',
          'Writing: ~29 minutes, 2 tasks — Build a Sentence + Write an Email OR Integrated Writing + Discussion Post.',
          'Responses are evaluated by a combination of AI scoring and human raters.'
        ]
      },
      {
        title: 'Scoring System',
        body: [
          'Traditional scoring: 0-30 per section, total 0-120. Each section equally weighted. Most US universities require 80-100.',
          '2026 band scoring: 1 (Minimal) to 6 (Advanced) per section. ETS provides concordance tables to translate between systems.',
          'Band 4 (Competent) corresponds roughly to 18-24 on old scale. Band 5 (Proficient) to 25-30. Band 6 (Advanced) represents near-native proficiency.',
          'You can select up to four universities to receive free score reports on test day. Results available in 4-8 days.',
          'Score reports include total score, section scores, and performance feedback with improvement suggestions.',
          'Universities continue to reference the traditional 0-120 scale. Check specific requirements of your target institutions.'
        ]
      },
      {
        title: 'Registration & Results',
        body: [
          'Create an ETS account at the official ETS website. Search for test dates and locations, register, and pay the fee online.',
          'Test centres are in major cities worldwide. The Home Edition is available in most countries with specific system requirements.',
          'Home Edition requires a computer with camera, microphone, and reliable internet. Proctored live via webcam.',
          'Results available in 4-8 days in your ETS account. Official score report includes your photo and personal information.',
          'You can take the test as many times as you wish with a mandatory 3-day wait between attempts.',
          'Register early as popular test dates fill up quickly. Standard deadline is ~7 days before the test date.'
        ]
      },
      {
        title: 'Skills for the 2026 TOEFL',
        body: [
          'Greater emphasis on practical, real-world English skills alongside academic English. New tasks reflect this balance.',
          'Critical thinking is essential — adaptive testing presents questions requiring deeper analysis as you demonstrate proficiency.',
          'Integrated skills are at the core. The test rarely assesses a single skill in isolation.',
          'Time management is crucial with the adaptive format. Harder questions may require more thought while easier ones should be answered quickly.',
          'Practice working within time constraints from early in your preparation using a timer.',
          'The shorter format means less endurance required, but the adaptive nature means you cannot afford to waste time.'
        ]
      }
    ]
  },
  {
    id: 'reading',
    title: 'Reading',
    subtitle: '~35 min — 2 passages — 20 questions (2026 format)',
    icon: '📖',
    color: 'emerald',
    description: 'The Reading section measures your ability to understand written English in academic and everyday contexts. Two passages — one academic (~250 words) and one daily life (100-150 words) — with 20 questions in about 35 minutes.',
    topics: [
      {
        title: 'Section Overview (2026)',
        body: [
          'Two passages with 10 questions each: one academic (~250 words) from natural sciences, social sciences, humanities; one daily life text (100-150 words) like announcements, emails, or informational flyers.',
          'Academic passage follows expository structure with main idea, supporting details, and conclusion. Daily life passage tests practical comprehension of everyday materials.',
          'Question types include vocabulary, fact/negative fact, inference, sentence simplification, sentence insertion, prose summary, Complete the Words, and Read in Daily Life.',
          'You can review and change answers within a passage before moving on. Once submitted, you cannot return. Use the review feature to mark uncertain questions.',
          'Adaptive testing means correct answers may lead to more challenging subsequent questions.',
          'The shortened length means less reading but the same depth of comprehension testing.'
        ]
      },
      {
        title: 'Question Types',
        body: [
          'Vocabulary questions: determine a word\'s meaning as used in the passage. Use context clues, not dictionary definitions.',
          'Fact and negative fact: identify specific information (fact) or what is NOT mentioned (negative fact). Use process of elimination.',
          'Inference: identify information that is implied but not directly stated. The answer must be logically supported by the text.',
          'Sentence simplification: choose the option that best expresses the essential meaning of a highlighted sentence.',
          'Sentence insertion: select the best place to insert a removed sentence. Look for referent pronouns and transition words.',
          'Prose summary: select three summary sentences that best capture main points. Eliminate overly detailed options.'
        ]
      },
      {
        title: 'Strategies for Complete the Words',
        body: [
          'Read surrounding context carefully before attempting any word. The sentences before and after contain clues about meaning, grammar, and the specific word.',
          'Pay attention to article usage (a/an/the) which indicates whether the missing word is a noun. Note prepositions that collocate with specific words.',
          'Determine whether the missing word is a noun, verb, adjective, or adverb based on position in the sentence.',
          'Common prefixes and suffixes provide strong clues. Think about common word families and formations.',
          'Consider collocations — word combinations that commonly appear together.',
          'Practice with academic word lists and pay attention to common word families.'
        ]
      },
      {
        title: 'Strategies for Academic Passages',
        body: [
          'Quickly skim the passage to understand the overall topic, structure, and main idea. Read first sentence of each paragraph.',
          'Most test-takers find it efficient to answer questions in order since ETS generally follows the passage structure.',
          'Do not immediately choose the most common definition for vocabulary questions. TOEFL often tests secondary meanings or context-specific interpretations.',
          'For inference questions, look for the answer that must be true based on the passage, not just possibly true.',
          'For sentence insertion, try inserting at each marked position and evaluate logical flow.',
          'For prose summary, eliminate options that mention specific details, examples, or statistics.'
        ]
      },
      {
        title: 'Time Management',
        body: [
          'With 35 minutes for 20 questions across two passages, allocate ~17 minutes per passage.',
          'Aim for no more than 90 seconds per question on average. Some take 30-60 seconds, others up to 2 minutes.',
          'Start with easier questions within each passage — vocabulary and fact questions first, then inference and prose summary.',
          'Use the review feature to mark questions and return to them. Never leave a question unanswered — no penalty for guessing.',
          'Practice pacing with a timer in every practice session. Track which question types take you longest.',
          'Gradually reduce your time per passage as you improve.'
        ]
      },
      {
        title: 'Vocabulary in Context',
        body: [
          'Building academic vocabulary is essential, but equally important is the ability to determine meaning from context.',
          'Read the entire sentence and surrounding sentences. Context often provides a definition, synonym, contrast, or example.',
          'Word roots, prefixes, and suffixes are powerful tools. Learning 50-100 common roots can help decipher thousands of words.',
          'Process of elimination works even when you do not know the word. Eliminate choices that do not fit the context.',
          'Consider part of speech, positive/negative connotation, and formality level.',
          'Practice with TOEFL-specific vocabulary questions from official ETS materials.'
        ]
      },
      {
        title: 'Free Resources',
        body: [
          'ETS TOEFL iBT Free Practice Test includes authentic reading passages and questions.',
          'Magoosh free TOEFL practice test with reading passages and questions.',
          'TOEFL Resources (toeflresources.com) offers free sample passages and questions organized by question type.',
          'Wikipedia articles on science, history, and culture provide academic reading practice.',
          'BBC News and National Geographic for accessible articles on diverse topics.',
          'Practice active reading: look up unfamiliar words, summarize paragraphs, identify main ideas and supporting details.'
        ]
      }
    ]
  },
  {
    id: 'listening',
    title: 'Listening',
    subtitle: '~36 min — 3 lectures + 2 conversations — 28 questions (2026 format)',
    icon: '🎧',
    color: 'amber',
    description: 'The Listening section evaluates your ability to understand spoken English in academic and everyday contexts. 2026 features shorter audio clips — academic lectures 1-1.5 minutes, conversations ~30 seconds — with 28 questions across 5 clips.',
    topics: [
      {
        title: 'Section Overview (2026)',
        body: [
          '5 audio clips: 3 academic lectures (1-1.5 min each) + 2 conversations (~30 sec each) = 28 questions total.',
          'Academic lectures cover biology, astronomy, history, sociology, psychology, economics. No specialized knowledge required.',
          'Conversations simulate academic interactions: office hours, library assistance, housing discussions, group projects.',
          'New Daily Life passages present workplace or campus scenarios like orientation sessions or lab safety briefings.',
          'Shorter clips mean less memory burden but same density of testable information.',
          'You hear each clip only once, so focused attention from the first second is essential.'
        ]
      },
      {
        title: 'Question Types',
        body: [
          'Gist-content: overall topic or main idea. Gist-purpose: speaker\'s goal or reason for speaking.',
          'Detail questions: specific information explicitly stated. Function questions (with replay): purpose of a statement.',
          'Attitude questions (with replay): speaker\'s opinion, feeling, or certainty inferred from tone and word choice.',
          'Organization questions: how the lecture is structured (cause-effect, compare-contrast, problem-solution).',
          'Connecting content: relationships between different parts of the lecture.',
          'Inference: draw conclusions based on implied information.'
        ]
      },
      {
        title: 'Note-Taking Strategies',
        body: [
          'Effective note-taking is one of the most important skills. You hear each clip only once, and notes are your only external reference.',
          'Write keywords and short phrases, not full sentences. Focus on main ideas, key details, examples, definitions, and transitions.',
          'Use symbols and abbreviations: arrows (→), mathematical symbols (=, ≠), common abbreviations (w/, b/c, e.g.).',
          'Organize notes spatially: main ideas at left, supporting details indented, examples further indented.',
          'For conversations, label which speaker said what. Note attitudes with symbols.',
          'Do not try to write everything. Selective note-taking is essential — focus on likely testable content.'
        ]
      },
      {
        title: 'Understanding Academic Lectures',
        body: [
          'Lectures follow predictable patterns: main idea + supporting details, compare-contrast, problem-solution, or chronological.',
          'Lectures include digressions (brief departures from the main topic). Recognize when the speaker returns to the main topic.',
          'Professors use verbal cues: first/second/finally (sequential), however/but (contrast), therefore/consequently (cause-effect).',
          'Examples are frequently tested. Note what concept each example supports.',
          'Transition words and emphasis phrases signal important content: the key point is, it is important to note.',
          'Pay attention to visual aids the professor references — descriptions may contain testable information.'
        ]
      },
      {
        title: 'Understanding Conversations',
        body: [
          'Conversations follow a predictable structure: opening/greeting, purpose statement, development, resolution, closing.',
          'Identify the speakers and their relationship — this affects tone and formality.',
          'Notice requests and offers that drive the interaction. Note whether requests are granted and any conditions.',
          'The resolution (what the student will do next) is frequently tested.',
          'Speaker attitude is particularly important — listen for tone of voice: surprised, disappointed, enthusiastic, hesitant.',
          'Understanding emotional and intentional subtext is a key TOEFL skill.'
        ]
      },
      {
        title: 'New 2026 Question Types',
        body: [
          'Daily Life listening passages: shorter practical content like workplace announcements or instructional messages.',
          'Listen and Repeat (primarily Speaking section): requires careful attention to pronunciation, intonation, stress, and rhythm.',
          'Shadowing practice: repeating audio immediately after hearing it while mimicking pronunciation and intonation.',
          'More multi-select and matching question formats in Listening. Note lists and classifications during lectures.',
          'Focus on practical comprehension over memorization of details — the 2026 trend.',
          'Practice listening to campus announcements, workplace messages, and public service announcements.'
        ]
      },
      {
        title: 'Free Resources',
        body: [
          'ETS official free practice test with authentic listening passages and questions.',
          'BBC 6 Minute English: short episodes with transcripts and vocabulary for daily listening practice.',
          'TED-Ed: short educational animations with clear narration for academic lecture practice.',
          'British Council IELTS Listening A2-B1 materials for Daily Life passage practice.',
          'VOA Learning English: news in slower, clearly spoken English for intermediate learners.',
          'Use official ETS materials to familiarize yourself with accents, pace, and question styles.'
        ]
      }
    ]
  },
  {
    id: 'speaking',
    title: 'Speaking',
    subtitle: '~16 min — 4 tasks (2026 format with new tasks)',
    icon: '🎤',
    color: 'rose',
    description: 'The Speaking section assesses your ability to communicate orally in English across academic and practical contexts. 4 tasks in ~16 minutes: independent opinion, Listen & Repeat, integrated Read+Listen+Speak, and Interview.',
    topics: [
      {
        title: 'Section Overview (2026)',
        body: [
          '4 tasks: Task 1 Independent Opinion (familiar topic), Task 2 Listen & Repeat (repeat a phrase), Task 3 Integrated Read+Listen+Speak, Task 4 Interview (multiple related questions).',
          'Responses recorded via computer. Evaluated by AI + human raters on Delivery, Language Use, and Topic Development.',
          'Each response scored 0-4, averaged and converted to section score or band.',
          '2026 changes emphasize practical communication including pronunciation and sustained conversation.',
          'Preparation should include practice with all four task types to build confidence.',
          'The Interview task is new — practice answering multiple related questions on a single topic.'
        ]
      },
      {
        title: 'Task 1: Independent Opinion',
        body: [
          'Respond to a familiar topic. 15 seconds prep, 45 seconds response. Express and support your opinion.',
          'Use a template: state opinion + first reason with example + second reason with example + conclusion.',
          'During prep time, quickly decide your position and jot down two main reasons with brief examples.',
          'Speak at natural pace — aim for 100-130 words in 45 seconds. Finish early rather than fill with repetition.',
          'If you make a grammar mistake, keep speaking unless the error changes meaning.',
          'Maintain good eye contact with the camera for natural delivery.'
        ]
      },
      {
        title: 'Task 2: Listen & Repeat',
        body: [
          'New in 2026: hear a short phrase and repeat it with accurate pronunciation and intonation.',
          'Tests perception and production of sounds, stress patterns, intonation, and rhythm of English.',
          'Phrases range from simple to complex. The phrase is played once — rely entirely on listening.',
          'Pay attention to connected speech: going to becomes gonna, want to becomes wanna.',
          'Practice shadowing: listen and repeat simultaneously or immediately after, mimicking exactly.',
          'Record yourself and compare to the original, noting differences in specific sounds or intonation.'
        ]
      },
      {
        title: 'Task 3: Integrated Read + Listen + Speak',
        body: [
          'Read short passage (~75-100 words for 45 seconds), then listen to related conversation/lecture (~45-60 seconds).',
          '30 seconds prep, 60 seconds response. Explain how the listening relates to the reading.',
          'During reading, focus on the main idea and key supporting points. The passage remains available during response.',
          'During listening, note specific details showing the connection between sources.',
          'Structure response: state relationship + describe reading + explain listening with connections + concluding sentence.',
          'Use transition phrases: The professor illustrates this by..., This example demonstrates the concept of...'
        ]
      },
      {
        title: 'Task 4: Interview',
        body: [
          'New in 2026: series of related questions on one topic answered one after another.',
          'Each question has 10-15 seconds prep and 30-45 seconds response. Stay on topic and answer each directly.',
          'Prepare a range of ideas about common TOEFL topics: education, technology, environment, society, health.',
          'Vary vocabulary and sentence structures across answers to demonstrate language range.',
          'Listen carefully to each question and answer it directly. Focus entirely on the current question.',
          'Use different transition words and examples across answers for variety.'
        ]
      },
      {
        title: 'Scoring Criteria',
        body: [
          'Delivery: fluency, pronunciation, intonation, vocal clarity. Minimal hesitation, clear pronunciation, natural intonation.',
          'Language Use: grammatical accuracy, vocabulary range, lexical appropriateness. Variety of sentence structures and precise vocabulary.',
          'Topic Development: how fully and coherently you address the task. Specific details, examples, and clear organization.',
          'For integrated tasks, accurate representation of source materials and clear relationship between them is essential.',
          'Address all three criteria in every response. Record yourself and self-evaluate.',
          'Identify your weaknesses and target your practice effectively.'
        ]
      },
      {
        title: 'Practice Methods',
        body: [
          'Daily speaking practice: record yourself answering prompts, listen back, and evaluate. Focus on one aspect at a time.',
          'Shadowing: listen to short audio clips and repeat aloud matching pronunciation, stress, and intonation exactly.',
          'Use a timer for all practice to develop sense of pacing for the different response lengths.',
          'Get feedback from multiple sources: speaking partners, AI tools like My Speaking Score, or tutors.',
          'Practice with the specific task types you will encounter on test day.',
          'Track recurring errors in a speaking journal and monitor progress over time.'
        ]
      },
      {
        title: 'Free Resources',
        body: [
          'Magoosh free TOEFL speaking prompts on their blog and YouTube channel.',
          'TOEFL Resources (toeflresources.com) free speaking practice questions and sample responses.',
          'ETS official sample speaking responses with rater commentary on their website.',
          'TED Talks for shadowing practice — choose short segments and practice mimicking the speaker.',
          'Your smartphone voice recorder for daily recording and self-evaluation.',
          'My Speaking Score for limited free AI evaluation of speaking responses.'
        ]
      }
    ]
  },
  {
    id: 'writing',
    title: 'Writing',
    subtitle: '~29 min — 2 tasks (2026 format with new tasks)',
    icon: '✍️',
    color: 'purple',
    description: 'The Writing section evaluates your ability to communicate effectively in written English across academic and practical contexts. Two tasks in ~29 minutes: either Build a Sentence + Write an Email, or Integrated Writing + Discussion Post.',
    topics: [
      {
        title: 'Section Overview (2026)',
        body: [
          'Two task combinations: Option A — Build a Sentence + Write an Email, Option B — Integrated Writing + Discussion Post.',
          'Build a Sentence: arrange given words into a grammatically correct sentence. Tests word order, verb tense, subject-verb agreement.',
          'Write an Email: write a professional email based on a scenario with appropriate tone, structure, and content.',
          'Integrated Writing: read passage (3 min) + listen to lecture (2 min) + write summary (20 min, 150-225 words).',
          'Discussion Post: write an opinion post responding to a prompt and engaging with other perspectives (10 min, 100+ words).',
          'Evaluated by AI + human raters on Content, Organization, and Language Use.'
        ]
      },
      {
        title: 'Task Options: Build a Sentence',
        body: [
          'New in 2026: arrange scrambled words into a single grammatically correct sentence.',
          'Start by identifying the subject and verb. Most English sentences follow Subject-Verb-Object order.',
          'Pay attention to verb tense indicated by time expressions (yesterday, now, next week).',
          'Check subject-verb agreement, article usage (a/an/the), and correct prepositions.',
          'Practice by taking English sentences, scrambling the word order, and rebuilding them.',
          'Focus on accuracy — precision matters more than complexity in this task.'
        ]
      },
      {
        title: 'Task Options: Write an Email',
        body: [
          'New in 2026: write a professional email based on a given scenario.',
          'Include: clear subject line, appropriate salutation, clear purpose statement, body with details, polite closing, professional sign-off.',
          'Structure logically: introduce yourself if needed, state purpose, provide context, make request, express appreciation.',
          'Match tone to recipient: formal for professors/employers, less formal for peers.',
          'Use full words instead of contractions in formal emails. Avoid slang and overly casual expressions.',
          'Proofread before submitting to catch typos, missing words, and grammatical errors.'
        ]
      },
      {
        title: 'Integrated Writing (if applicable)',
        body: [
          'Read academic passage (~250 words, 3 min) then listen to lecture (~2 min) that challenges or expands on the reading.',
          '20 minutes to write 150-225 words explaining how the lecture relates to the reading.',
          'Focus on identifying the reading\'s main argument and three supporting points during reading time.',
          'During lecture, note how each point is addressed — usually the lecture contradicts or supports each point.',
          'Structure: introductory sentence stating relationship + three paragraphs addressing each point of comparison.',
          'Use signal phrases: The reading argues that X, but the professor explains that Y.'
        ]
      },
      {
        title: 'Discussion Post',
        body: [
          'Simulates an online academic discussion forum. Respond to a prompt and engage with other students\' perspectives.',
          '10 minutes, 100+ words. State your opinion, support with reasons and examples, reference other posts.',
          'Structure as mini-essay: position statement + acknowledge others + supporting reasons + specific examples.',
          'Keep tone academic but conversational. Use first person but avoid overly casual language.',
          'Aim for 100-150 words. Proofread quickly for major errors.',
          'Practice by finding discussion prompts online and writing timed responses.'
        ]
      },
      {
        title: 'Scoring Criteria',
        body: [
          'Content: how effectively you address the task, relevance and completeness of ideas. For Integrated Writing, accuracy of source representation.',
          'Organization: clear structure, logically sequenced paragraphs, appropriate transitions between ideas.',
          'Language Use: grammatical accuracy, vocabulary range, sentence variety. Precise and appropriate vocabulary.',
          'For Build a Sentence, language use is the primary criterion — must be grammatically correct.',
          'Focus on accuracy first, then range. Simple correct English is better than complex incorrect English.',
          'Always leave 30-60 seconds for proofreading at the end of each task.'
        ]
      },
      {
        title: 'Purdue OWL',
        body: [
          'Gold standard free resource for English writing. Comprehensive guidance on grammar, academic writing, and professional writing.',
          'Grammar section covers all concepts needed for TOEFL: parts of speech, sentence structure, verb tenses, articles, prepositions.',
          'Guidance on essay organization, thesis statements, transitions, and conclusions applicable to Discussion Post and Integrated tasks.',
          'Resource you will use throughout your academic career including research papers and citation styles.',
          'Completely free without registration. Bookmark key sections for easy reference.',
          'Use it as your primary reference when reviewing writing errors during practice.'
        ]
      },
      {
        title: 'Practice Tips',
        body: [
          'Daily writing practice rotating through task types: one day Build a Sentence, another Email, another Integrated, another Discussion Post.',
          'Use Grammarly free version to review practice writing and learn from corrections. But develop independent proofreading skills.',
          'Practice under timed conditions at least twice per week. Use a timer for realistic pacing.',
          'Study model responses at different score levels from ETS. Analyze what distinguishes high-scoring from low-scoring.',
          'Identify the specific features you need to incorporate into your own writing.',
          'Apply what you learn from models immediately in your next practice session.'
        ]
      },
      {
        title: 'Free Resources',
        body: [
          'Purdue OWL for grammar and writing guidance.',
          'ETS official writing samples with sample responses at different score levels.',
          'Magoosh free TOEFL writing prompts and sample responses on their blog.',
          'TOEFL Resources (toeflresources.com) free integrated prompts and discussion post topics.',
          'GRE Analytical Writing pool of prompts (free ETS PDF) for essay practice topics.',
          'Practice writing emails on various scenarios to develop versatility in register and tone.'
        ]
      }
    ]
  },
  {
    id: 'score-guide',
    title: 'Score Guide',
    subtitle: 'Understanding Your Scores & How to Improve',
    icon: '📈',
    color: 'sky',
    description: 'The 2026 format introduces new band-based scoring (1-6 per section) alongside the traditional 0-120 scale. This section explains both systems and provides targeted improvement strategies.',
    topics: [
      {
        title: 'Old Scoring (0-30 per section, total 0-120)',
        body: [
          'Each section scored 0-30, total 0-120. Most commonly referenced by universities. Each section equally weighted.',
          'Less selective: 61-79. Mid-ranked US: 80-100. Competitive (top 50): 100+. Elite (Ivy League): 110+.',
          'Graduate programs may set higher section minimums. Writing 24+ often required for teaching assistantships.',
          'Score report includes performance feedback identifying strengths and weaknesses by section.',
          'Many test-takers improve 5-10 points on a second attempt after focusing on identified weaknesses.',
          'Check specific requirements of your target institutions.'
        ]
      },
      {
        title: 'New 2026 Scoring (Band 1-6 per section)',
        body: [
          'Bands: 1 (Minimal) to 6 (Advanced). Each band represents a distinct proficiency level with specific descriptors.',
          'Band 1: isolated words and basic phrases. Band 2: simple, predictable situations. Band 3: essential ideas in familiar contexts.',
          'Band 4 (Competent): effective communication in most everyday situations. Minimum target for university admission.',
          'Band 5 (Proficient): effective communication in complex academic contexts. Band 6 (Advanced): near-native proficiency.',
          'Sub-scores provide detailed information about performance in specific skill areas within each section.',
          'ETS provides concordance tables for translation between old and new scoring systems.'
        ]
      },
      {
        title: 'Score Comparison: TOEFL vs IELTS',
        body: [
          'TOEFL 80-90 ≈ IELTS 6.5 (competent user). Common minimum for many universities.',
          'TOEFL 90-100 ≈ IELTS 7.0 (good user). Common for competitive programs and graduate admissions.',
          'TOEFL 100-110 ≈ IELTS 7.5 (very good user). Accepted by most top-tier universities.',
          'TOEFL 110-120 ≈ IELTS 8.0+ (expert user). Rarely required but strengthens applications.',
          'TOEFL uses American English with focus on academic English. IELTS uses British English with face-to-face speaking.',
          'Research requirements of your target institutions — most accept both equally.'
        ]
      },
      {
        title: 'Section Improvement',
        body: [
          'Reading: read academic English daily, practice active reading, build vocabulary systematically with word lists.',
          'Listening: expose yourself to varied English accents, practice active note-taking, focus on main ideas and speaker purpose.',
          'Speaking: consistent oral practice focusing first on fluency, then accuracy. Use shadowing for pronunciation.',
          'Writing: regular practice with systematic error correction. Study model essays and learn academic phrases.',
          'Focus on your weakest section first — that is where the most score improvement is possible.',
          'Integrated practice combining multiple skills is essential since the TOEFL rarely tests skills in isolation.'
        ]
      }
    ]
  },
  {
    id: 'study-plans',
    title: 'Study Plans',
    subtitle: '4-Week, 8-Week & 12-Week Schedules',
    icon: '📅',
    color: 'teal',
    description: 'Structured study plans incorporating 2026 format changes with diagnostic testing, skill-building, timed practice, and full-length mock tests.',
    topics: [
      {
        title: '4-Week Intensive',
        body: [
          'For test-takers near their target score needing format familiarization. 3-4 hours daily, 6 days per week.',
          'Week 1: diagnostic test + format familiarization with 2026 changes. Week 2: skill-building all sections.',
          'Week 3: timed practice and weak area focus. Week 4: full mocks every other day.',
          'Priortise ETS official materials and updated resources reflecting 2026 format.',
          'Use an error log after each practice test to identify patterns.',
          'Demanding but achievable with consistent effort.'
        ]
      },
      {
        title: '8-Week Balanced',
        body: [
          'The most common and recommended timeline. 2-3 hours daily, 5 days per week.',
          'Weeks 1-2: foundation building with extensive English input and vocabulary.',
          'Weeks 3-4: section-specific strategies with untimed practice.',
          'Weeks 5-6: timed practice with one full test per week and thorough review.',
          'Weeks 7-8: mock tests every other day under exact conditions. Review all errors.',
          'Focus on the new 2026 question types that may be less familiar.'
        ]
      },
      {
        title: '12-Week Comprehensive',
        body: [
          'For significant improvement from lower English level (TOEFL 60-70 target). 1.5-2 hours daily, 5 days per week.',
          'Weeks 1-4: extensive English input, vocabulary building, journal writing.',
          'Weeks 5-8: TOEFL-specific content with individual section practice without strict timing.',
          'Weeks 9-10: timed practice with full test weekly and detailed review.',
          'Weeks 11-12: intensive mock testing 3 times per week. Focus on test-day simulations.',
          'Extended timeline allows natural language acquisition alongside test preparation.'
        ]
      },
      {
        title: 'Daily Study Routine',
        body: [
          '15 min vocabulary review (Anki or flashcards), 20 min Reading or Listening (alternating), 15 min Speaking or Writing, 10 min review.',
          'During focus weeks, adjust time allocation while maintaining some practice in all sections.',
          'Schedule one full practice test per week during later stages of preparation.',
          'After each test, spend at least as much time reviewing as taking it.',
          'Build flexibility to prevent burnout: one lighter day per week.',
          'Track study hours and tasks in a journal to maintain motivation.'
        ]
      },
      {
        title: 'Free Resource Calendar',
        body: [
          'ETS offers free webinars and workshops throughout the year on their website.',
          'Magoosh publishes weekly blog posts and YouTube videos on TOEFL tips.',
          'TOEFL Resources provides weekly practice questions updated for 2026 format.',
          'Subscribe to newsletters and follow social media accounts for regular updates.',
          'Create your own calendar combining ETS materials, Magoosh, and TOEFL Resources.',
          'Dedicate specific weeks to specific free resources for structured variety.'
        ]
      }
    ]
  },
  {
    id: 'free-resources',
    title: 'Free Resources',
    subtitle: 'Best Free Books, Websites & Tools',
    icon: '🎯',
    color: 'green',
    description: 'High-quality TOEFL preparation does not require expensive materials. This section catalogs the best free resources from ETS, educational websites, YouTube channels, and public libraries.',
    topics: [
      {
        title: 'Official ETS Resources',
        body: [
          'TOEFL iBT Free Practice Test: full-length test using retired questions on official interface.',
          'TOEFL iBT Interactive Sampler: sample questions with actual test interface for navigation practice.',
          'ETS TOEFL TV YouTube channel: test-taking tips, section overviews, and 2026 format information.',
          'ETS offers official TOEFL preparation resources. Check that the tasks match the current test before using older PDFs.',
          'Use ETS resources first as they are the most authentic available.',
          'Visit the ETS TOEFL website regularly for new free resources and updates.'
        ]
      },
      {
        title: 'Best Free Practice Tests',
        body: [
          'ETS official free practice test on their website — gold standard with retired questions.',
          'Magoosh free TOEFL practice test updated for 2026 format with score estimate and performance breakdown.',
          'TOEFL Resources free mini-tests combining questions from different sections.',
          'Exam English and TestDEN for shorter practice tests on single sections.',
          'Always prioritize materials updated for 2026 format to reflect new question types.',
          'Take the ETS practice test at the beginning and end of your preparation.'
        ]
      },
      {
        title: 'Reading & Listening Practice',
        body: [
          'BBC 6 Minute English: short episodes with transcripts for daily listening and vocabulary building.',
          'TED Talks: thousands of talks on academic topics for note-taking and comprehension practice.',
          'VOA Learning English: simplified English news with audio, text, and vocabulary.',
          'National Geographic and Scientific American: academic articles matching TOEFL style.',
          'Practice active reading and listening: underline main ideas, write summaries, look up vocabulary.',
          'Subscribe to newsletters for regular content delivery.'
        ]
      },
      {
        title: 'Speaking Practice Tools',
        body: [
          'Magoosh free speaking prompts covering all task types including 2026 new tasks.',
          'Your smartphone voice recorder for daily recording and self-evaluation.',
          'My Speaking Score for limited free AI evaluation of TOEFL speaking responses.',
          'Shadowing with TED Talks or BBC clips for pronunciation and fluency improvement.',
          'Record yourself, listen back critically, and track progress over time.',
          'Use the speaking rubric to self-evaluate against official criteria.'
        ]
      },
      {
        title: 'Writing Resources',
        body: [
          'Purdue OWL for grammar, academic writing, and professional writing guidance.',
          'Grammarly free version for automated grammar checking and error identification.',
          'ETS official writing rubric detailing exactly what evaluators look for at each score level.',
          'TOEFL Resources sample essays at different score levels with detailed analysis.',
          'GRE Analytical Writing pool of prompts from ETS for extra essay practice.',
          'Practice writing emails on various scenarios for the new Write an Email task.'
        ]
      },
      {
        title: 'YouTube Channels',
        body: [
          'Magoosh TOEFL: comprehensive free video lessons covering all sections with strategy guides.',
          'TOEFL Resources: detailed guides for each section with attention to 2026 format changes.',
          'TST Prep: practical strategies and templates with free PDF resources.',
          'NoteFull TOEFL: focus on integrated skills with note-taking strategies.',
          'ETS Official: authoritative announcements about format changes and scoring updates.',
          'Subscribe and watch one strategy video daily during your preparation.'
        ]
      },
      {
        title: 'Free Books & PDFs',
        body: [
          'ETS free sample chapters from Official Guide to the TOEFL iBT on their website.',
          'Magoosh free TOEFL vocabulary list PDF with common academic words.',
          'GRE Analytical Writing pool PDF from ETS for essay practice prompts.',
          'TOEFL Resources free TOEFL 2026 Format Guide PDF summarizing key changes.',
          'Magoosh free TOEFL Study Guide with weekly schedules and resource recommendations.',
          'Build a digital folder of your most useful resources for easy access.'
        ]
      }
    ]
  },
  {
    id: 'common-mistakes',
    title: 'Common Mistakes',
    subtitle: 'Frequent Errors & Solutions',
    icon: '⚠️',
    color: 'red',
    description: 'Knowing common errors can help you avoid them. This section catalogs frequent mistakes across all four sections along with practical solutions.',
    topics: [
      {
        title: 'Reading Mistakes',
        body: [
          'Spending too much time on a single question. Mark it and move on after 2 minutes.',
          'Not using context clues for vocabulary questions. Read surrounding sentences before choosing.',
          'Guessing without eliminating wrong answers. Always use process of elimination.',
          'Misreading Complete the Words instructions or not reading surrounding text.',
          'Forgetting to check spelling in Complete the Words answers.',
          'Not managing time across both passages effectively.'
        ]
      },
      {
        title: 'Listening Mistakes',
        body: [
          'Writing too many notes and missing audio content. Listen first, write only key words.',
          'Failing to identify speaker purpose and attitude in conversations.',
          'Focusing only on isolated facts without understanding the overall organization.',
          'Relaxing attention during shorter 2026 clips. Stay fully engaged from the first second.',
          'Not using the context of what you did hear to infer missed details.',
          'Letting one missed answer distract from the rest of the clip.'
        ]
      },
      {
        title: 'Speaking Mistakes',
        body: [
          'Pausing too long or too frequently. Use filler phrases to maintain fluency.',
          'Speaking too quietly. Project your voice — the microphone needs to pick you up clearly.',
          'Not finishing within the time limit. Practice pacing with a timer.',
          'Repeating the same vocabulary across responses. Prepare alternative expressions.',
          'Not addressing all parts of integrated tasks. Cover both reading and listening sources.',
          'Speaking too fast due to nervousness. Maintain a natural pace.'
        ]
      },
      {
        title: 'Writing Mistakes',
        body: [
          'Typing errors under time pressure. Leave time to proofread.',
          'Poor paragraph organization with unclear topic sentences.',
          'Insufficient word count — not developing ideas adequately.',
          'Including personal opinion in Integrated Writing (should be objective summary).',
          'Not engaging with other perspectives in Discussion Post.',
          'Building a Sentence with incorrect word order or verb tense.'
        ]
      },
      {
        title: 'General Mistakes',
        body: [
          'Using outdated preparation materials from before the 2026 format changes.',
          'Poor time management across the entire test. Develop and practice a time budget.',
          'Test-day logistics: arriving late, wrong ID, technical issues. Prepare one week in advance.',
          'Underestimating keyboard/typing speed needs for the Writing section.',
          'Not taking enough full-length practice tests under realistic conditions.',
          'Ignoring the new question types specific to the 2026 format.'
        ]
      }
    ]
  }
];

export const WRITING_TEMPLATES: WritingTemplate[] = [
  {
    id: 'ielts-task1',
    title: 'IELTS Task 1 — Chart/Graph Description',
    icon: '📊',
    desc: 'Describe visual information (150 words, 20 minutes).',
    template: [
      'Introduction: The [chart/graph/table] shows/illustrates/compares [what/where/when].',
      'Overview: Overall, [main trend — e.g., there was a significant increase in X, while Y remained relatively stable].',
      'Body 1: [Details of first main feature]. [X] started at [number] in [year] and then [increased/decreased/fluctuated] to [number] by [year].',
      'Body 2: [Details of second main feature]. In contrast, [Y] [rose/fell] from [number] to [number] over the same period.',
      'Comparisons: [X] was [higher/lower/similar] to [Y], with a [gap/difference] of [number].'
    ],
    notes: [
      'Always write an overview paragraph summarising the BIG PICTURE (not individual data points).',
      'Use a range of vocabulary: rose/increased/grew/climbed/surged vs fell/decreased/dropped/declined/plummeted',
      'Use adverbs: sharply, significantly, gradually, slightly, steadily',
      'Make comparisons: while, whereas, compared to, in contrast to',
      'Don\'t give reasons for the data — just describe what you see',
      'Use correct data: include numbers, percentages, years to support your description'
    ]
  },
  {
    id: 'ielts-task2',
    title: 'IELTS Task 2 — Essay',
    icon: '📝',
    desc: 'Write an academic essay (250+ words, 40 minutes).',
    template: [
      'Introduction: [Paraphrase the question + state your position/thesis]. In recent years, [topic] has become a matter of considerable debate. This essay will discuss [main points] and argue that [your position].',
      'Body 1 — First main point: On the one hand, [point 1]. One compelling reason is that [explain]. For instance, [example]. Furthermore, [additional support].',
      'Body 2 — Second main point: On the other hand, [point 2]. This is because [explain]. A notable example can be seen in [example]. Consequently, [result].',
      'Conclusion: In conclusion, although [acknowledge counterargument], I firmly believe that [restate your position]. The most compelling reason is [key reason].'
    ],
    notes: [
      'Answer the question fully — don\'t miss any part of the prompt.',
      'Structure clearly: introduction, 2-3 body paragraphs, conclusion.',
      'Use formal/academic register — no contractions, no slang.',
      'Use linking words: firstly, moreover, however, in addition, consequently.',
      'Use specific examples to support your arguments.',
      'Spend 5 minutes planning, 30 minutes writing, 5 minutes reviewing.'
    ]
  },
  {
    id: 'toefl-writing1',
    title: 'TOEFL Task 1 — Integrated Writing',
    icon: '📝',
    desc: 'Summarise a reading and lecture (150-225 words, 20 minutes).',
    template: [
      'Introduction: The reading passage explains that [main claim from reading]. However, the lecturer challenges this by arguing that [main claim from lecture].',
      'Point 1: First, the reading states that [specific point from reading]. The lecture counters this by explaining that [specific counterpoint from lecture].',
      'Point 2: Second, according to the reading, [another specific point]. The professor, however, points out that [corresponding counterpoint].',
      'Point 3: Finally, the reading claims that [third specific point]. In contrast, the lecture asserts that [third counterpoint].'
    ],
    notes: [
      'Focus on the relationship between reading and lecture (usually the lecture contradicts the reading).',
      'Use reporting verbs: argues, claims, states, contends, explains, suggests, notes, points out, challenges, contradicts, refutes.',
      'Don\'t give your own opinion — just report what the sources say.',
      'Use comparison language: however, in contrast, but, while, whereas.',
      'Write 150-225 words — both under and over can hurt your score.',
      'You can see the reading passage again while writing. Refer to it accurately.'
    ]
  },
  {
    id: 'toefl-writing2',
    title: 'TOEFL Task 2 — Independent Writing',
    icon: '📝',
    desc: 'Write an opinion essay (300+ words, 30 minutes).',
    template: [
      'Introduction: [Paraphrase the question + clearly state your opinion]. Some people believe that [opposing view]. However, I strongly agree/disagree that [your view] for several reasons.',
      'Body 1: First and foremost, [first reason]. This is because [explanation]. For example, [specific personal example or observation]. This clearly demonstrates that [link back to your thesis].',
      'Body 2: In addition, [second reason]. To illustrate, [another example]. Furthermore, [additional support]. Without [this factor], [negative consequence].',
      'Conclusion: To conclude, while there are arguments on both sides, I am convinced that [restate position]. The main reasons are [summarize key points].'
    ],
    notes: [
      'Write 350-500 words for a competitive score.',
      'Use specific, personal examples — TOEFL prompts often ask about your country or experience.',
      'Organise with clear, distinct paragraphs. Use transitions between paragraphs.',
      'Use a variety of sentence structures (simple, compound, complex).',
      'Use precise vocabulary — avoid repetition of the same words.',
      'Leave 2-3 minutes to proofread for typos and grammar mistakes.'
    ]
  },
  {
    id: 'ielts-letter',
    title: 'IELTS General Training — Letter',
    icon: '✉️',
    desc: 'For IELTS General Training Task 1 (150 words, 20 minutes).',
    template: [
      'Dear [Sir or Madam / Mr. Smith / Friend\'s name],',
      'Opening: I am writing to [express my interest in / complain about / apply for / invite you to / thank you for] [...]',
      'Body 1: [Explain the situation in detail. Include relevant background.]',
      'Body 2: [State what you want or expect to happen. Make requests clearly.]',
      'Closing: I look forward to your prompt response. / I hope this matter can be resolved soon.',
      'Yours faithfully / sincerely, / Best regards,'
    ],
    notes: [
      'Formal: use \'Yours faithfully\' if you don\'t know the name, \'Yours sincerely\' if you do.',
      'Informal: use \'Best wishes\', \'All the best\' for close friends/family.',
      'Identify the purpose clearly in the first sentence.',
      'Match the tone to the recipient.',
      'Cover all three bullet points in the task prompt.',
      'Use appropriate opening and closing formulas.'
    ]
  }
];

export const EXAM_INFO = IELTS_GUIDE_CONTENT.map((s) => ({
  id: s.id,
  title: s.title,
  subtitle: s.subtitle,
  icon: s.icon,
  color: s.color,
  details: [s.description, ...s.topics.slice(0, 2).flatMap((t) => t.body.slice(0, 2))]
}));

export const IELTS_INFO: ExamInfo[] = EXAM_INFO;
export const TOEFL_INFO: ExamInfo[] = TOEFL_GUIDE_CONTENT.map((s) => ({
  id: s.id,
  title: s.title,
  subtitle: s.subtitle,
  icon: s.icon,
  color: s.color,
  details: [s.description, ...s.topics.slice(0, 2).flatMap((t) => t.body.slice(0, 2))]
}));

export const IELTS_COMPARISON = {
  title: 'IELTS vs TOEFL: Which Should You Take?',
  subtitle: 'Compare the two major English proficiency tests',
  rows: [
    ['Feature', 'IELTS Academic', 'TOEFL iBT'],
    ['Scoring', '0-9 per section (overall average)', '0-30 per section (total 0-120)'],
    ['Duration', '~2h45 (all sections consecutive)', '~2h (new shorter format)'],
    ['Speaking', 'Face-to-face with examiner (11-14 min)', 'Computer-recorded responses (16 min)'],
    ['Writing', 'Handwritten (paper) or typed (computer)', 'Typed on computer'],
    ['Listening', '40 questions, 30 min, one play only', '28 questions, 36 min, questions visible while listening'],
    ['Reading', '3 passages, 40 questions, 60 min', '2 passages, 20 questions, 35 min'],
    ['Accent', 'British, Australian, North American', 'North American (primarily US)'],
    ['Integrated Tasks', 'Limited (some skills separate)', 'Heavy integration across all sections'],
    ['Accepted By', 'UK, Australia, Canada, NZ, Europe (also US)', 'US, Canada (also increasingly worldwide)'],
    ['Result Time', '3-13 days', '4-8 days'],
    ['Cost', '~$245 USD (varies by country)', '~$245 USD (varies by country)']
  ]
};
