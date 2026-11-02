export type RelativePronoun = {
  pronoun: string;
  usage: string;
  usageAr?: string;
  example: string;
  exampleEn: string;
  arabic?: string;
};

export type RelativeRule = {
  id: string;
  title: string;
  titleAr?: string;
  icon: string;
  color: string;
  explanation: string;
  explanationAr?: string;
  formation: string;
  formationAr?: string;
  examples: { en: string; ar?: string }[];
  subRules?: { label: string; items: string[] }[];
};

export const RELATIVE_PRONOUNS: RelativePronoun[] = [
  { pronoun: "who", usage: "Refers to people (subject)", usageAr: "يشير إلى الأشخاص (فاعل)", example: "The woman who lives next door is a doctor.", exampleEn: "The woman who lives next door is a doctor.", arabic: "الذي/التي (للعاقل فاعلاً)" },
  { pronoun: "whom", usage: "Refers to people (object, formal)", usageAr: "يشير إلى الأشخاص (مفعول به، رسمي)", example: "The man whom I met yesterday is my boss.", exampleEn: "The man whom I met yesterday is my boss.", arabic: "الذي/التي (للعاقل مفعولاً به)" },
  { pronoun: "which", usage: "Refers to animals and things", usageAr: "يشير إلى الحيوانات والأشياء", example: "The book which I read was fascinating.", exampleEn: "The book which I read was fascinating.", arabic: "الذي/التي (لغير العاقل)" },
  { pronoun: "that", usage: "Refers to people, animals, or things (defining only)", usageAr: "يشير إلى الأشخاص أو الحيوانات أو الأشياء (الجمل المحددة فقط)", example: "The car that I bought is very fast.", exampleEn: "The car that I bought is very fast.", arabic: "الذي/التي (للعاقل وغير العاقل في الجمل المحددة)" },
  { pronoun: "whose", usage: "Shows possession (for people, animals, things)", usageAr: "يظهر الملكية (للأشخاص والحيوانات والأشياء)", example: "The student whose phone rang was embarrassed.", exampleEn: "The student whose phone rang was embarrassed.", arabic: "الذي/التي (ملكية)" },
  { pronoun: "where", usage: "Refers to a place", usageAr: "يشير إلى مكان", example: "This is the restaurant where we first met.", exampleEn: "This is the restaurant where we first met.", arabic: "حيث" },
  { pronoun: "when", usage: "Refers to a time", usageAr: "يشير إلى زمان", example: "I remember the day when we graduated.", exampleEn: "I remember the day when we graduated.", arabic: "عندما" },
  { pronoun: "why", usage: "Refers to a reason (after 'reason')", usageAr: "يشير إلى سبب (بعد 'reason')", example: "Tell me the reason why you are late.", exampleEn: "Tell me the reason why you are late.", arabic: "لماذا / السبب" },
];

export const RELATIVE_RULES: RelativeRule[] = [
  {
    id: "grundlagen",
    title: "Relative Pronouns Basics",
    titleAr: "أساسيات ضمائر الوصل",
    icon: "🔤",
    color: "text-blue-600",
    explanation: "A relative clause gives more information about a noun in the main clause. The relative pronoun introduces the relative clause and refers back to the noun (the antecedent). Choose the pronoun based on whether the antecedent is a person, thing, place, time, or reason.",
    explanationAr: "جملة الوصل تعطي معلومات إضافية عن الاسم في الجملة الرئيسية. ضمير الوصل يقدم الجملة الموصولة ويشير إلى الاسم السابق. اختر الضمير بناءً على ما إذا كان الاسم السابق شخصاً أو شيئاً أو مكاناً أو زمناً أو سبباً.",
    formation: "Antecedent (person/thing/place) + relative pronoun + clause",
    formationAr: "الاسم السابق (شخص/شيء/مكان) + ضمير وصل + جملة",
    examples: [
      { en: "The woman who called you is my sister. (who = person, subject)", ar: "المرأة التي اتصلت بك هي أختي. (who = شخص، فاعل)" },
      { en: "The book which I borrowed is excellent. (which = thing, object)", ar: "الكتاب الذي استعرته ممتاز. (which = شيء، مفعول به)" },
      { en: "The man that lives next door is very kind. (that = person)", ar: "الرجل الذي يسكن بجانبنا لطيف جداً. (that = شخص)" },
      { en: "The car that I bought is red. (that = thing)", ar: "السيارة التي اشتريتها حمراء. (that = شيء)" },
    ],
    subRules: [
      { label: "Choosing the right relative pronoun", items: ["Person (subject): who / that — The woman who/that called...", "Person (object, formal): whom — The man whom I saw...", "Thing/animal: which / that — The book which/that I read...", "Possession: whose — The girl whose bag was stolen...", "Place: where — The house where I was born...", "Time: when — The year when I graduated...", "Reason: why — The reason why I left..."] },
    ],
  },
  {
    id: "defining-vs-non-defining",
    title: "Defining vs Non-Defining Relative Clauses",
    titleAr: "جمل الوصل المحددة مقابل غير المحددة",
    icon: "⚡",
    color: "text-emerald-600",
    explanation: "A DEFINING relative clause identifies which person or thing we are talking about. It is essential to the meaning — without it, the sentence is unclear. A NON-DEFINING relative clause adds extra information and is enclosed in commas. It can be removed without changing the core meaning.",
    explanationAr: "جملة الوصل المُحَدِّدة تحدّد أي شخص أو شيء نتحدث عنه. هي أساسية للمعنى — بدونها تكون الجملة غير واضحة. جملة الوصل غير المُحَدِّدة تضيف معلومات إضافية وتكون محصورة بين فاصلة. يمكن حذفها دون تغيير المعنى الأساسي.",
    formation: "Defining: no commas — 'The man who called is here.' / Non-Defining: with commas — 'My father, who is 60, still works.'",
    formationAr: "محددة: بدون فاصلة — 'The man who called is here.' / غير محددة: بفاصلة — 'My father, who is 60, still works.'",
    examples: [
      { en: "DEFINING: The students who study hard will pass. (only those who study hard)", ar: "محددة: الطلاب الذين يدرسون بجد سينجحون. (فقط الذين يدرسون بجد)" },
      { en: "NON-DEFINING: The students, who study hard, will pass. (all students, and they all study hard)", ar: "غير محددة: الطلاب، الذين يدرسون بجد، سينجحون. (جميع الطلاب، وكلهم يدرسون بجد)" },
      { en: "DEFINING: The house that has a red door is mine. (identifies which house)", ar: "محددة: المنزل الذي له باب أحمر هو لي. (يحدد أي منزل)" },
      { en: "NON-DEFINING: My house, which has a red door, is very old. (extra info)", ar: "غير محددة: منزلي، الذي له باب أحمر، قديم جداً. (معلومة إضافية)" },
      { en: "DEFINING: I like people who are honest. (essential meaning)", ar: "محددة: أحب الأشخاص الصادقين. (معنى أساسي)" },
    ],
    subRules: [
      { label: "Key differences", items: ["DEFINING: NO commas — essential information — can use 'that' — cannot be removed — pronoun can be omitted if it's the object", "NON-DEFINING: COMMAS — extra information — CANNOT use 'that' — can be removed — pronoun cannot be omitted"] },
      { label: "Omitting the relative pronoun (defining only)", items: ["When the pronoun is the OBJECT, you can omit it: 'The book (that/which) I read was great.' (object → can omit)", "When the pronoun is the SUBJECT, you CANNOT omit it: 'The woman who called...' (subject → must keep)", "Non-defining: NEVER omit the pronoun."] },
    ],
  },
  {
    id: "who-vs-whom",
    title: "Who vs Whom (and When to Use Each)",
    titleAr: "Who مقابل Whom (ومتى تستخدم كل منهما)",
    icon: "👤",
    color: "text-violet-600",
    explanation: "'Who' is used as the subject of the relative clause (the doer of the action). 'Whom' is used as the object (the receiver of the action). In informal modern English, 'who' is often used for both, while 'whom' is reserved for formal writing. 'That' can replace 'who' in defining clauses.",
    explanationAr: "'Who' تستخدم كفاعل جملة الوصل (المنفذ للفعل). 'Whom' تستخدم كمفعول به (متلقي الفعل). في الإنجليزية الحديثة غير الرسمية، 'who' تُستخدم لكلاهما، بينما 'whom' للكتابة الرسمية. يمكن لـ 'that' أن تحل محل 'who' في الجمل المحددة.",
    formation: "Who + verb (subject) / Whom + subject + verb (object)",
    formationAr: "Who + فعل (فاعل) / Whom + فاعل + فعل (مفعول به)",
    examples: [
      { en: "The teacher who taught me is retiring. (who = subject of 'taught')", ar: "المعلم الذي درّسني سيتقاعد. (who = فاعل)" },
      { en: "The teacher whom I admired is retiring. (whom = object of 'admired')", ar: "المعلم الذي أعجبت به سيتقاعد. (whom = مفعول به)" },
      { en: "FORMAL: The candidate whom we interviewed was excellent.", ar: "رسمي: المرشح الذي أجرينا معه المقابلة كان ممتازاً." },
      { en: "INFORMAL: The candidate who we interviewed was excellent.", ar: "غير رسمي: المرشح الذي أجرينا معه المقابلة كان ممتازاً." },
      { en: "With preposition (formal): The person to whom I spoke...", ar: "مع حرف جر (رسمي): الشخص الذي تحدثت إليه..." },
      { en: "With preposition (informal): The person who I spoke to...", ar: "مع حرف جر (غير رسمي): الشخص الذي تحدثت إليه..." },
    ],
    subRules: [
      { label: "Quick test: who vs whom", items: ["If you can replace with 'he/she/they' → use WHO (subject)", "If you can replace with 'him/her/them' → use WHOM (object)", "Example: The woman ___ called. → She called → WHO", "Example: The woman ___ I saw. → I saw her → WHOM", "In informal English, 'who' is acceptable for both."] },
    ],
  },
  {
    id: "which-vs-that",
    title: "Which vs That (Defining vs Non-Defining for Things)",
    titleAr: "Which مقابل That (محددة مقابل غير محددة للأشياء)",
    icon: "🔍",
    color: "text-amber-600",
    explanation: "Use 'that' ONLY in DEFINING relative clauses (no commas). Use 'which' in NON-DEFINING clauses (with commas). In defining clauses about things, both which and that are possible. Some American editorial styles prefer that for defining clauses; British English commonly permits either. Non-defining clauses about things use which, not that.",
    explanationAr: "استخدم 'that' فقط في جمل الوصل المُحَدِّدة (بدون فاصلة). استخدم 'which' في الجمل غير المُحَدِّدة (مع فاصلة). في الجمل المحددة، كلا 'which' و 'that' ممكنان، لكن 'that' مفضل في الإنجليزية البريطانية و 'which' شائع أيضاً في الإنجليزية الأمريكية للجمل المحددة.",
    formation: "Defining: noun + that/which + clause / Non-defining: noun + , + which + clause + ,",
    formationAr: "محددة: اسم + that/which + جملة / غير محددة: اسم + , + which + جملة + ,",
    examples: [
      { en: "DEFINING: The laptop that I bought is broken. (identifies which laptop)", ar: "محددة: الكمبيوتر المحمول الذي اشتريته معطل. (يحدد أي كمبيوتر)" },
      { en: "NON-DEFINING: My laptop, which I bought last year, is broken. (extra info)", ar: "غير محددة: كمبيوتري المحمول، الذي اشتريته العام الماضي، معطل. (معلومة إضافية)" },
      { en: "DEFINING: The movie that/which won the Oscar was excellent.", ar: "محددة: الفيلم الذي فاز بجائزة الأوسكار كان ممتازاً." },
      { en: "NON-DEFINING: The movie, which won five Oscars, is a masterpiece. (commas required)", ar: "غير محددة: الفيلم، الذي فاز بخمس جوائز أوسكار، تحفة فنية. (فاصلة مطلوبة)" },
      { en: "INCORRECT: The book, that I read, was good. (cannot use 'that' in non-defining!)", ar: "خطأ: الكتاب، الذي قرأته، كان جيداً. (لا يمكن استخدام 'that' في غير المحددة!)" },
    ],
    subRules: [
      { label: "Summary: which vs that", items: ["THAT = only defining (no commas), for people or things", "WHICH = non-defining (with commas) OR defining (especially US English)", "Never use 'that' in non-defining clauses (with commas)", "In defining clauses: 'that' is safer for learners", "Restrictive (defining) vs Non-restrictive (non-defining) is the formal grammar term"] },
    ],
  },
  {
    id: "whose-possession",
    title: "'Whose' for Possession",
    titleAr: "'Whose' للملكية",
    icon: "📦",
    color: "text-red-600",
    explanation: "'Whose' is the possessive relative pronoun. It replaces 'his/her/its/their' in relative clauses and is used for people, animals, and things. Unlike in some languages, 'whose' can refer to objects, not just people. Do not confuse 'whose' (possessive) with 'who's' (who is / who has).",
    explanationAr: "'Whose' هو ضمير الوصل للملكية. يحل محل 'his/her/its/their' في جمل الوصل ويستخدم للأشخاص والحيوانات والأشياء. على عكس بعض اللغات، يمكن أن يشير 'whose' إلى الأشياء، وليس فقط الأشخاص. لا تخلط بين 'whose' (ملكية) و 'who's' (who is / who has).",
    formation: "Noun + whose + noun + verb...",
    formationAr: "اسم + whose + اسم + فعل...",
    examples: [
      { en: "The girl whose father is a doctor studies with me. (her father)", ar: "الفتاة التي والدها طبيب تدرس معي. (والدها)" },
      { en: "The company whose CEO resigned is in trouble. (its CEO)", ar: "الشركة التي استقال رئيسها التنفيذي في مشكلة. (رئيسها)" },
      { en: "I have a friend whose brother works in Dubai. (his/her brother)", ar: "لدي صديق أخوه يعمل في دبي. (أخوه)" },
      { en: "The tree whose branches were damaged fell down. (its branches)", ar: "الشجرة التي تضررت أغصانها سقطت. (أغصانها)" },
      { en: "The students whose exams are over can leave. (their exams)", ar: "الطلاب الذين انتهت امتحاناتهم يمكنهم المغادرة. (امتحاناتهم)" },
    ],
    subRules: [
      { label: "Whose vs Who's", items: ["WHOSE = possession: The man whose car was stolen... (الذي سيارته)", "WHO'S = who is / who has: The man who's calling... (الذي يتصل)", "Tip: Replace with 'who is' — if it fits, use who's; if not, use whose"] },
    ],
  },
  {
    id: "omitting-pronoun",
    title: "Omitting the Relative Pronoun (Contact Clauses)",
    titleAr: "حذف ضمير الوصل (جمل التلامس)",
    icon: "✂️",
    color: "text-indigo-600",
    explanation: "In DEFINING relative clauses, when the relative pronoun is the OBJECT of the clause, it can be omitted. This is called a 'contact clause'. When the pronoun is the SUBJECT, it CANNOT be omitted. This only applies to defining clauses — non-defining clauses always keep the pronoun.",
    explanationAr: "في جمل الوصل المُحَدِّدة، عندما يكون ضمير الوصل هو المفعول به للجملة، يمكن حذفه. يُسمى هذا 'جملة تلامس'. عندما يكون الضمير هو الفاعل، لا يمكن حذفه. هذا ينطبق فقط على الجمل المُحَدِّدة — الجمل غير المُحَدِّدة تحتفظ دائماً بالضمير.",
    formation: "Subject pronoun: cannot omit / Object pronoun: can omit — 'The book (that) I read'",
    formationAr: "ضمير فاعل: لا يمكن حذفه / ضمير مفعول به: يمكن حذفه — 'The book (that) I read'",
    examples: [
      { en: "OBJECT (can omit): The film (that/which) I watched was boring.", ar: "مفعول به (يمكن حذفه): الفيلم (الذي) شاهدته كان مملاً." },
      { en: "SUBJECT (must keep): The film that/which won the award was boring.", ar: "فاعل (يجب الاحتفاظ): الفيلم الذي فاز بالجائزة كان مملاً." },
      { en: "OBJECT: The woman (whom/who) I met is a journalist.", ar: "مفعول به: المرأة (التي) قابلتها صحفية." },
      { en: "SUBJECT: The woman who/that met me is a journalist.", ar: "فاعل: المرأة التي قابلتني صحفية." },
      { en: "OBJECT → becomes: I met the woman. She is a journalist.", ar: "مفعول به ← تصبح: قابلت المرأة. هي صحفية." },
    ],
    subRules: [
      { label: "When you CAN omit the pronoun", items: ["Relative pronoun is the object of the clause: 'The pizza (that) I ordered arrived.'", "Relative pronoun is the object of a preposition (informal): 'The person (who) I spoke to...'", "Only in DEFINING relative clauses (no commas)"] },
      { label: "When you CANNOT omit the pronoun", items: ["Relative pronoun is the subject: 'The woman who called...'", "In NON-DEFINING clauses: 'My mother, who called...'", "With 'whose': 'The man whose car...' — never omit 'whose'", "After a preposition in formal English: 'The person to whom...'"] },
    ],
  },
  {
    id: "prepositions-in-clauses",
    title: "Prepositions in Relative Clauses",
    titleAr: "حروف الجر في جمل الوصل",
    icon: "🧩",
    color: "text-purple-600",
    explanation: "When a relative clause contains a preposition, there are two styles: FORMAL (preposition + whom/which) and INFORMAL (who/that/which + preposition at the end). In informal English, the preposition moves to the end of the clause, and the pronoun can often be omitted.",
    explanationAr: "عندما تحتوي جملة الوصل على حرف جر، هناك أسلوبان: رسمي (حرف جر + whom/which) وغير رسمي (who/that/which + حرف جر في النهاية). في الإنجليزية غير الرسمية، ينتقل حرف الجر إلى نهاية الجملة، ويمكن غالباً حذف الضمير.",
    formation: "Formal: ..., preposition + whom/which + clause / Informal: ..., who/that + clause + preposition",
    formationAr: "رسمي: ...، حرف جر + whom/which + جملة / غير رسمي: ...، who/that + جملة + حرف جر",
    examples: [
      { en: "FORMAL: The person to whom you should speak is Mr. Smith.", ar: "رسمي: الشخص الذي يجب أن تتحدث إليه هو السيد سميث." },
      { en: "INFORMAL: The person (who) you should speak to is Mr. Smith.", ar: "غير رسمي: الشخص الذي يجب أن تتحدث إليه هو السيد سميث." },
      { en: "FORMAL: The company for which I work is global.", ar: "رسمي: الشركة التي أعمل لديها عالمية." },
      { en: "INFORMAL: The company (that) I work for is global.", ar: "غير رسمي: الشركة التي أعمل لديها عالمية." },
      { en: "FORMAL: The topic about which we argued was politics.", ar: "رسمي: الموضوع الذي تجادلنا حوله كان السياسة." },
      { en: "INFORMAL: The topic (that) we argued about was politics.", ar: "غير رسمي: الموضوع الذي تجادلنا حوله كان السياسة." },
    ],
    subRules: [
      { label: "Preposition placement styles", items: ["FORMAL writing: preposition BEFORE whom/which — 'the person to whom', 'the company for which'", "INFORMAL speaking: preposition at the END — 'the person who I spoke to', 'the company that I work for'", "With 'where': no preposition needed — 'the house where I live' (not 'where I live in')", "With 'when': no preposition needed — 'the day when I came' (not 'when I came on')"] },
    ],
  },
];

export const RELATIVE_PRONOUN_TABLE = [
  { function: "Subject (person)", formal: "who", informal: "who / that", example: "The woman who/that called..." },
  { function: "Object (person)", formal: "whom", informal: "who / that / (omit)", example: "The woman (who/that) I met..." },
  { function: "Subject (thing)", formal: "which", informal: "which / that", example: "The book which/that won..." },
  { function: "Object (thing)", formal: "which", informal: "which / that / (omit)", example: "The book (which/that) I read..." },
  { function: "Possession", formal: "whose", informal: "whose", example: "The man whose car..." },
  { function: "Place", formal: "where", informal: "where", example: "The house where..." },
  { function: "Time", formal: "when", informal: "when", example: "The day when..." },
  { function: "Reason", formal: "why", informal: "why", example: "The reason why..." },
];

export const DEFINING_VS_NON_DEFINING = [
  { type: "Defining", commas: "No commas", pronounOmission: "Can omit object pronoun", canUseThat: "Yes", removable: "No (essential)", example: "Students who study hard succeed." },
  { type: "Non-Defining", commas: "Commas required", pronounOmission: "Cannot omit pronoun", canUseThat: "No", removable: "Yes (extra info)", example: "The students, who study hard, succeed." },
];
