export type NebensatzRule = {
  id: string;
  title: string;
  icon: string;
  color: string;
  explanation: string;
  formation: string;
  examples: { de: string; en: string; ar?: string }[];
  subRules?: { label: string; items: string[] }[];
};

export const NEBENSAETZE_RULES: NebensatzRule[] = [
  {
    id: "clause-basics",
    title: "Clause Types: Independent vs. Dependent",
    icon: "📐",
    color: "text-blue-600",
    explanation: "An independent clause (main clause) can stand alone as a complete sentence. A dependent clause (subordinate clause) cannot stand alone — it depends on the main clause. Dependent clauses are introduced by subordinating conjunctions like 'because', 'when', 'if', or relative pronouns like 'who', 'which', 'that'.",
    formation: "Independent clause + conjunction + dependent clause  |  Dependent clause + comma + independent clause",
    examples: [
      { de: "I know that he is coming today.", en: "I know that he is coming today.", ar: "أعلم أنه سيأتي اليوم." },
      { de: "Because it is raining, we are staying home.", en: "Because it is raining, we are staying home.", ar: "لأنها تمطر، نحن نبقى في المنزل." },
      { de: "He said that he was tired.", en: "He said that he was tired.", ar: "لقد قال إنه متعب." },
      { de: "When I have time, I go to the cinema.", en: "When I have time, I go to the cinema.", ar: "عندما يكون لدي وقت، أذهب إلى السينما." },
      { de: "She asked whether I was coming.", en: "She asked whether I was coming.", ar: "هي سألت إن كنت قادماً." },
    ],
    subRules: [
      { label: "Difference from Arabic", items: ["English always needs a conjunction between clauses: I know THAT he is coming. (Arabic can omit 'أن')", "English uses comma after a dependent clause at the start: Because it rained, we stayed home.", "When the main clause comes first, NO comma: We stayed home because it rained.", "Word order in dependent clauses: subject before verb (no inversion)"] },
    ],
  },
  {
    id: "because-since",
    title: "Causal Clauses — Reason (because, since, as)",
    icon: "🎯",
    color: "text-emerald-600",
    explanation: "Causal clauses express the REASON for an action. 'Because' is the most common and can answer 'Why?'. 'Since' and 'as' are used when the reason is already known to the listener and are more formal. In English, no word order change is needed in the dependent clause.",
    formation: "because/since/as + subject + verb + (rest)",
    examples: [
      { de: "I learn English because I want to work abroad.", en: "I learn English because I want to work abroad.", ar: "أتعلم الإنجليزية لأنني أريد العمل في الخارج." },
      { de: "Since it is raining heavily, the concert is cancelled.", en: "Since it is raining heavily, the concert is cancelled.", ar: "بما أنها تمطر بشدة، الحفل ملغى." },
      { de: "He couldn't come because he was sick.", en: "He couldn't come because he was sick.", ar: "لم يستطع المجيء لأنه كان مريضاً." },
      { de: "As the exam is tomorrow, I have to study today.", en: "As the exam is tomorrow, I have to study today.", ar: "بما أن الامتحان غداً، يجب أن أدرس اليوم." },
      { de: "She was happy because she got a good grade.", en: "She was happy because she got a good grade.", ar: "لقد سعدت لأنها حصلت على درجة جيدة." },
      { de: "Since there were no more questions, the teacher ended the lesson.", en: "Since there were no more questions, the teacher ended the lesson.", ar: "بما أنه لم يعد هناك أسئلة، أنهى المعلم الدرس." },
    ],
    subRules: [
      { label: "because vs. since vs. as", items: ["because: most common, answers 'why', can be used alone in response: 'Why? — Because I have no time.'", "since: more formal, reason usually known: Since you are here, let's start. (known reason)", "as: formal, similar to 'since': As it was late, we went home.", "Difference from Arabic: English always needs a conjunction. Arabic can say 'جئت لأني مشتاق' or just 'جئت مشتاق'."] },
    ],
  },
  {
    id: "time-clauses",
    title: "Time Clauses (when, while, before, after, until)",
    icon: "⏰",
    color: "text-purple-600",
    explanation: "Time clauses express WHEN something happens. Different conjunctions express different temporal relationships. In future time clauses, use PRESENT tense (NOT 'will'). This is a common mistake for Arabic speakers.",
    formation: "when/while/before/after/until + subject + verb (present tense for future meaning)",
    examples: [
      { de: "When I was young, I lived in a small village.", en: "When I was young, I lived in a small village.", ar: "عندما كنت صغيراً، سكنت في قرية صغيرة." },
      { de: "When I have time, I read a book. (habitual)", en: "When I have time, I read a book.", ar: "كلما كان لدي وقت، أقرأ كتاباً." },
      { de: "While he cooks, he listens to music.", en: "While he cooks, he listens to music.", ar: "بينما يطبخ، يستمع إلى الموسيقى." },
      { de: "Before we eat, we wash our hands.", en: "Before we eat, we wash our hands.", ar: "قبل أن نأكل، نغسل أيدينا." },
      { de: "After he finished work, he went for a walk.", en: "After he finished work, he went for a walk.", ar: "بعد أن أنهى العمل، ذهب في نزهة." },
      { de: "I will call you as soon as I arrive.", en: "I will call you as soon as I arrive.", ar: "سأتصل بك بمجرد وصولي." },
      { de: "Until the rain stops, we will stay inside.", en: "Until the rain stops, we will stay inside.", ar: "حتى يتوقف المطر، سنبقى في المنزل." },
    ],
    subRules: [
      { label: "Important: NO 'will' in future time clauses", items: ["Correct: When I arrive, I will call you. (present in the time clause)", "Wrong: ✗ When I will arrive, I will call you.", "Correct: Before you leave, please lock the door. (present in time clause)", "Correct: After I finish work, I'm going to the gym. (present)", "This applies to: when, while, before, after, until, as soon as, by the time"] },
    ],
  },
  {
    id: "if-clauses",
    title: "Conditional Clauses (if, unless, as long as)",
    icon: "🔮",
    color: "text-rose-600",
    explanation: "Conditional clauses express a CONDITION for something to happen. The most common conjunction is 'if'. 'Unless' means 'if not'. 'As long as' means 'only if'. Different tenses are used depending on whether the condition is real (type 1), unreal (type 2), or impossible past (type 3).",
    formation: "if/unless/as long as + subject + verb (present for real conditions, past for unreal, past perfect for past)",
    examples: [
      { de: "If I have enough money, I will travel to Japan.", en: "If I have enough money, I will travel to Japan.", ar: "إذا كان لدي مال كافٍ، سأسافر إلى اليابان." },
      { de: "Unless it rains, the event will be outdoors.", en: "Unless it rains, the event will be outdoors.", ar: "ما لم تمطر، ستكون الفعالية في الهواء الطلق." },
      { de: "If I were you, I would take the job.", en: "If I were you, I would take the job.", ar: "لو كنت مكانك، لقبلت الوظيفة." },
      { de: "If I had studied more, I would have passed the exam.", en: "If I had studied more, I would have passed the exam.", ar: "إذا كنت قد درست أكثر، لكنت قد نجحت في الامتحان." },
      { de: "As long as you follow the rules, you will be fine.", en: "As long as you follow the rules, you will be fine.", ar: "طالما تتبع القواعد، ستكون بخير." },
    ],
    subRules: [
      { label: "Conditional types", items: ["Type 0 (general truth): If you heat ice, it melts. (present + present)", "Type 1 (real future): If it rains, I will stay home. (present + will)", "Type 2 (unreal present): If I had money, I would travel. (past + would)", "Type 3 (unreal past): If I had known, I would have come. (past perfect + would have)"] },
    ],
  },
  {
    id: "purpose-clauses",
    title: "Purpose Clauses (so that, in order to, to)",
    icon: "🎯",
    color: "text-indigo-600",
    explanation: "Purpose clauses express the GOAL or intention of an action. Use 'to + infinitive' (most common), 'in order to' (formal), or 'so that' (when the subject changes). 'For + gerund' expresses the general purpose of a thing.",
    formation: "to + infinitive  |  in order to + infinitive  |  so that + subject + can/will + verb",
    examples: [
      { de: "I study English to get a better job.", en: "I study English to get a better job. (same subject)", ar: "أدرس الإنجليزية للحصول على وظيفة أفضل." },
      { de: "She gave him money so that he could buy the book.", en: "She gave him money so that he could buy the book. (different subjects)", ar: "أعطته المال لكي يستطيع شراء الكتاب." },
      { de: "He saves money to buy a car.", en: "He saves money to buy a car.", ar: "هو يدخر المال لشراء سيارة." },
      { de: "I am calling in order to confirm my reservation.", en: "I am calling in order to confirm my reservation.", ar: "أنا أتصل لتأكيد حجزي." },
      { de: "She gave me the number so that I could call.", en: "She gave me the number so that I could call.", ar: "أعطتني الرقم لكي أستطيع الاتصال." },
      { de: "This machine is used for cutting paper. (general purpose)", en: "This machine is used for cutting paper.", ar: "هذه الآلة تُستخدم لقص الورق." },
    ],
    subRules: [
      { label: "Purpose expressions", items: ["to + infinitive: I went to the store to buy milk. (most common)", "in order to + infinitive: more formal: She studied hard in order to pass the exam.", "so as to + infinitive: formal: We left early so as to avoid traffic.", "so that + clause: (subject changes or for clarity): I gave him my number so that he could call me.", "for + gerund: (general purpose of a thing): A knife is used for cutting."] },
    ],
  },
  {
    id: "concession-clauses",
    title: "Concessive Clauses (although, even though, despite)",
    icon: "🛡️",
    color: "text-cyan-600",
    explanation: "Concessive clauses express a CONTRAST or unexpected result. 'Although', 'even though', and 'though' are conjunctions that start a clause. 'Despite' and 'in spite of' are followed by a noun or gerund, not a full clause.",
    formation: "although/even though + subject + verb  |  despite/in spite of + noun/gerund",
    examples: [
      { de: "Although it rained, we went for a walk.", en: "Although it rained, we went for a walk.", ar: "على الرغم من أنها أمطرت، ذهبنا في نزهة." },
      { de: "He passed the exam even though he studied very little.", en: "He passed the exam even though he studied very little.", ar: "لقد نجح في الامتحان على الرغم من أنه درس قليلاً جداً." },
      { de: "She came to the party despite being sick.", en: "She came to the party despite being sick.", ar: "جاءت إلى الحفلة على الرغم من أنها كانت مريضة." },
      { de: "Although the task was difficult, she solved it.", en: "Although the task was difficult, she solved it.", ar: "مع أن المهمة كانت صعبة، فقد حلها." },
      { de: "In spite of the rain, they enjoyed the trip.", en: "In spite of the rain, they enjoyed the trip.", ar: "على الرغم من المطر، استمتعوا بالرحلة." },
      { de: "Even though I was tired, I finished the work.", en: "Even though I was tired, I finished the work.", ar: "على الرغم من أنني كنت متعباً، أنهيت العمل." },
    ],
    subRules: [
      { label: "Concession words comparison", items: ["although + clause: most common, neutral: Although it was hard, I did it.", "even though + clause: stronger contrast/emphasis: Even though it was freezing, we went swimming.", "though + clause: informal, can also end a sentence: It's expensive. I'll buy it, though.", "despite/in spite of + noun/gerund: Despite the rain, we played football.", "Despite being tired, she stayed awake. (NOT: despite she was tired)"] },
    ],
  },
  {
    id: "relative-clauses",
    title: "Relative Clauses (who, which, that, whose)",
    icon: "🔄",
    color: "text-teal-600",
    explanation: "Relative clauses give more information about a noun. Use 'who' for people, 'which' for things, 'that' for both (in defining clauses), and 'whose' for possession. Defining relative clauses identify the noun; non-defining clauses add extra information with commas.",
    formation: "noun + relative pronoun (who/which/that/whose) + verb + rest",
    examples: [
      { de: "The man who is standing there is my teacher.", en: "The man who is standing there is my teacher.", ar: "الرجل الذي يقف هناك هو معلمي." },
      { de: "The book that I am reading is very exciting.", en: "The book that I am reading is very exciting.", ar: "الكتاب الذي أقرأه مثير جداً." },
      { de: "The woman whose car was stolen called the police.", en: "The woman whose car was stolen called the police.", ar: "المرأة التي سُرقت سيارتها اتصلت بالشرطة." },
      { de: "The people with whom I work are very nice.", en: "The people with whom I work are very nice.", ar: "الناس الذين أعمل معهم لطفاء جداً." },
      { de: "The house where I grew up has been sold.", en: "The house where I grew up has been sold.", ar: "المنزل الذي نشأت فيه قد بيع." },
      { de: "My brother, who lives in London, is a doctor.", en: "My brother, who lives in London, is a doctor. (non-defining — commas)", ar: "أخي، الذي يعيش في لندن، طبيب." },
    ],
    subRules: [
      { label: "Relative pronoun usage", items: ["who → people: The man who called you is here.", "which → things: The car which I bought is red.", "that → people or things (defining only): The book that I read was great. / The woman that called...", "whose → possession: The student whose phone rang was embarrassed.", "where → places: The city where I was born...", "when → times: The day when we met...", "whom → formal, object of verb/preposition: The person to whom I spoke..."] },
      { label: "Defining vs. Non-defining", items: ["Defining (no commas): essential information — The man who lives next door is a doctor. (which man?)", "Non-defining (commas): extra information — My father, who is 60, still works. (we already know which father)", "'That' can ONLY be used in defining clauses (no commas).", "In defining clauses, 'who/which/that' can be omitted when it's the object: The book (that) I read was great."] },
    ],
  },
  {
    id: "result-clauses",
    title: "Result Clauses (so...that, such...that)",
    icon: "➡️",
    color: "text-orange-600",
    explanation: "Result clauses express the RESULT of an action or quality. Use 'so + adjective + that' or 'such + (a/an) + noun + that'. 'So' is followed by an adjective alone; 'such' is followed by a noun (with or without an adjective).",
    formation: "so + adjective/adverb + that + clause  |  such + (a/an) + (adjective) + noun + that + clause",
    examples: [
      { de: "He studied so hard that he passed easily.", en: "He studied so hard that he passed easily.", ar: "درس بجد لدرجة أنه نجح بسهولة." },
      { de: "It was so cold that we stayed home.", en: "It was so cold that we stayed home.", ar: "كان الجو بارداً جداً لدرجة أننا بقينا في المنزل." },
      { de: "She speaks so fast that I can barely understand her.", en: "She speaks so fast that I can barely understand her.", ar: "تتحدث بسرعة لدرجة أنني بالكاد أفهمها." },
      { de: "The movie was so boring that I fell asleep.", en: "The movie was so boring that I fell asleep.", ar: "كان الفيلم مملاً لدرجة أنني نمت." },
      { de: "He had so much work that he couldn't take a break.", en: "He had so much work that he couldn't take a break.", ar: "كان لديه عمل كثير لدرجة أنه لم يستطع أخذ استراحة." },
      { de: "It was such a good movie that we watched it twice.", en: "It was such a good movie that we watched it twice.", ar: "كان فيلماً جيداً لدرجة أننا شاهدناه مرتين." },
    ],
    subRules: [
      { label: "so vs. such", items: ["so + adjective: so hot, so fast, so beautiful (no noun after)", "so + adverb: so quickly, so carefully, so well", "so + much/many/little/few: so much time, so many people", "such + (a/an) + (adj) + noun: such a hot day, such beautiful weather", "such + adjective + plural noun: such interesting books, such good people", "such + adjective + uncountable noun: such delicious food, such useful information"] },
    ],
  },
];

export const NEBENSAETZE_WORTSTELLUNG = [
  { type: "Time clause (when)", example: "I will call you when I arrive.", exampleAr: "سأتصل بك عندما أصل." },
  { type: "Reason clause (because)", example: "I stayed home because I was tired.", exampleAr: "بقيت في المنزل لأنني كنت متعباً." },
  { type: "Condition (if)", example: "If it rains, I will take an umbrella.", exampleAr: "إذا هطل المطر، سآخذ مظلة." },
  { type: "Concession (although)", example: "Although it was hard, I finished it.", exampleAr: "على الرغم من صعوبته، أنهيته." },
  { type: "Purpose (to / so that)", example: "I called to confirm / so that they would know.", exampleAr: "اتصلت للتأكيد / لكي يعلموا." },
  { type: "Result (so...that)", example: "It was so hot that we stayed inside.", exampleAr: "كان الجو حاراً لدرجة أننا بقينا في الداخل." },
  { type: "Relative (who/which/that)", example: "The book that I read was great.", exampleAr: "الكتاب الذي قرأته كان رائعاً." },
];
