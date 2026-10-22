export type SyntaxRule = {
  id: string;
  title: string;
  titleAr?: string;
  icon: string;
  color: string;
  explanation: string;
  explanationAr?: string;
  formation?: string;
  examples: { de: string; en: string; ar?: string }[];
  subRules?: { label: string; items: string[] }[];
};

export const SYNTAX_RULES: SyntaxRule[] = [
  {
    id: "basic-word-order",
    title: "Basic Word Order: SVO (Subject-Verb-Object)",
    icon: "🔢",
    color: "text-blue-600",
    explanation: "English has a fixed word order: Subject + Verb + Object (SVO). Unlike Arabic, the verb does NOT come first. This is the most important rule for Arabic speakers learning English.",
    examples: [
      { de: "I eat an apple.", en: "I eat an apple. (S+V+O)", ar: "أنا آكل تفاحة." },
      { de: "She reads a book.", en: "She reads a book.", ar: "هي تقرأ كتاباً." },
      { de: "They play football.", en: "They play football.", ar: "هم يلعبون كرة القدم." },
      { de: "The dog chased the cat.", en: "The dog chased the cat.", ar: "الكلب طارد القطة." },
    ],
    subRules: [
      { label: "SVO Rule", items: ["Subject → Verb → Object (ALWAYS in this order)", "The verb NEVER goes to position 1 in statements (unlike Arabic)", "Adjectives come BEFORE nouns: a red car (not: a car red)"] },
    ],
  },
  {
    id: "s-v-o-m-p-t",
    title: "SPOT: Subject, Place, Object, Time",
    icon: "📐",
    color: "text-emerald-600",
    explanation: "When you have multiple elements in a sentence, English follows this order: Subject + Verb + Object + Place + Time. Time can also go at the START of the sentence for emphasis. Adverbs of frequency (always, never, often) go BEFORE the main verb.",
    formation: "Subject + Verb + Object + Place + Time (SPOT)  |  Adverbs: before main verb",
    examples: [
      { de: "I met my friend at the café yesterday.", en: "I met my friend at the café yesterday. (S+V+O+Place+Time)", ar: "قابلت صديقي في المقهى أمس." },
      { de: "Yesterday I met my friend at the café.", en: "Yesterday I met my friend at the café. (Time at start)", ar: "أمس قابلت صديقي في المقهى." },
      { de: "She always drinks coffee in the morning.", en: "She always drinks coffee in the morning. (frequency before verb)", ar: "هي تشرب القهوة دائماً في الصباح." },
      { de: "He never eats meat.", en: "He never eats meat. (never before main verb)", ar: "هو لا يأكل اللحم أبداً." },
    ],
    subRules: [
      { label: "SPOT rule", items: ["S = Subject: I, You, He, She, etc.", "V = Verb: the action word", "O = Object: who/what receives the action", "P = Place: where? (at home, in the park, in Cairo)", "T = Time: when? (yesterday, at 5 PM, last week)"] },
      { label: "Adverb placement", items: ["Adverbs of frequency (always, usually, often, sometimes, never) → BEFORE main verb: She always arrives on time.", "BUT after 'be' verb: He is always late.", "Adverbs of manner (quickly, carefully) → AFTER verb: He drove carefully.", "Place before time: I saw him at the park yesterday."] },
    ],
  },
  {
    id: "questions",
    title: "Question Formation (Yes/No & WH)",
    icon: "❓",
    color: "text-purple-600",
    explanation: "Yes/No questions are formed by inverting the subject and the auxiliary verb (do/does/did, be, have, modals). WH-questions add the question word at the beginning. Unlike Arabic, English questions always require subject-auxiliary inversion.",
    formation: "Yes/No: Auxiliary + Subject + Main verb?  |  WH: WH-word + Auxiliary + Subject + Main verb?",
    examples: [
      { de: "Do you like coffee?", en: "Do you like coffee?", ar: "هل تحب القهوة؟" },
      { de: "Where do you live?", en: "Where do you live?", ar: "أين تعيش؟" },
      { de: "Is she coming to the party?", en: "Is she coming to the party?", ar: "هل هي قادمة إلى الحفلة؟" },
      { de: "What did you eat for breakfast?", en: "What did you eat for breakfast?", ar: "ماذا أكلت على الفطور؟" },
      { de: "Can you help me?", en: "Can you help me?", ar: "هل يمكنك مساعدتي؟" },
      { de: "Why are you learning English?", en: "Why are you learning English?", ar: "لماذا تتعلم الإنجليزية؟" },
    ],
    subRules: [
      { label: "Yes/No question formation", items: ["With 'be': invert subject and be-verb — Are you ready? / Is he here?", "With 'have' (as main verb): Do you have a car? (NOT: Have you a car?)", "With other verbs: Do/Does/Did + subject + base verb — Does she work here? / Did you see him?", "With modals: Modal + subject + base verb — Can you swim? / Should I go?"] },
      { label: "WH question formation", items: ["WH-word (what/where/when/why/who/how) + auxiliary + subject + verb?", "Who/What + verb (when subject) — Who called you? / What happened?", "Prepositions at the end (informal) — Who are you talking TO? / Where do you come FROM?"] },
    ],
  },
  {
    id: "negatives",
    title: "Negatives (not, never, no)",
    icon: "🚫",
    color: "text-red-600",
    explanation: "To make a sentence negative in English, add 'not' after the auxiliary verb (be, do, have, modals). For simple present/past without an auxiliary, use 'do not / does not / did not' + base verb. 'Never' replaces 'not' and is used before the main verb.",
    formation: "Subject + Auxiliary + not + Main verb  |  Subject + do/does/did + not + base verb",
    examples: [
      { de: "I am not tired.", en: "I am not tired.", ar: "أنا لست متعباً." },
      { de: "She does not (doesn't) like spicy food.", en: "She doesn't like spicy food.", ar: "هي لا تحب الطعام الحار." },
      { de: "They did not (didn't) go to the party.", en: "They didn't go to the party.", ar: "لم يذهبوا إلى الحفلة." },
      { de: "I have never been to London.", en: "I have never been to London.", ar: "لم أذهب إلى لندن أبداً." },
      { de: "He cannot (can't) swim.", en: "He can't swim.", ar: "هو لا يستطيع السباحة." },
      { de: "There is no milk left.", en: "There is no milk left.", ar: "لا يوجد حليب متبقي." },
    ],
    subRules: [
      { label: "Negation rules", items: ["With 'be': subject + be + not: I am not, he is not, they are not", "With modals: subject + modal + not: I cannot, you must not, she will not (won't)", "With other verbs: do/does/did + not + base verb: I don't know, she doesn't work, they didn't come", "No vs. Not: 'no' goes before nouns (no money, no time), 'not' negates verbs (not happy, not going)"] },
    ],
  },
  {
    id: "indirect-questions",
    title: "Indirect Questions (Can you tell me...?)",
    icon: "🔄",
    color: "text-indigo-600",
    explanation: "Indirect questions embed a question inside another sentence. They use statement word order (not question word order). 'Do/does/did' are NOT used in the embedded question. Use 'if/whether' for yes/no questions.",
    formation: "Main question + WH-word + subject + verb (no inversion)  |  Main question + if/whether + subject + verb",
    examples: [
      { de: "Where is the station? → Can you tell me where the station is?", en: "Can you tell me where the station is?", ar: "هل يمكنك إخباري أين المحطة؟" },
      { de: "Do you have time? → I want to know if you have time.", en: "I want to know if you have time.", ar: "أريد أن أعرف إذا كان لديك وقت." },
      { de: "What time does it start? → Do you know what time it starts?", en: "Do you know what time it starts?", ar: "هل تعرف متى يبدأ؟" },
      { de: "Why did he leave? → I wonder why he left.", en: "I wonder why he left.", ar: "أتساءل لماذا غادر." },
    ],
    subRules: [
      { label: "Rules for indirect questions", items: ["No question mark if the main clause is a statement: I wonder where he is.", "No 'do/does/did': I asked what he WANTED (NOT: what did he want)", "Statement word order: subject before verb: ...where the station IS", "If/Whether for yes/no: She asked if I was coming."] },
    ],
  },
  {
    id: "imperatives",
    title: "Imperatives (Commands & Requests)",
    icon: "📢",
    color: "text-rose-600",
    explanation: "Imperatives use the base form of the verb (no subject). 'Please' makes it polite. Use 'Don't' for negative commands. 'Let's' includes the speaker. For polite requests, use 'Could you...?' or 'Would you mind...?'",
    formation: "Base verb + (rest)  |  Don't + base verb  |  Let's + base verb",
    examples: [
      { de: "Sit down.", en: "Sit down.", ar: "اجلس." },
      { de: "Please close the door.", en: "Please close the door.", ar: "من فضلك أغلق الباب." },
      { de: "Don't touch that!", en: "Don't touch that!", ar: "لا تلمس ذلك!" },
      { de: "Let's go to the park.", en: "Let's go to the park.", ar: "لنذهب إلى الحديقة." },
      { de: "Could you help me, please?", en: "Could you help me, please? (polite request)", ar: "هل يمكنك مساعدتي من فضلك؟" },
      { de: "Be quiet!", en: "Be quiet!", ar: "كن هادئاً!" },
    ],
    subRules: [
      { label: "Imperative types", items: ["Direct: Sit down. / Open the door. / Come here.", "Polite: Please sit down. / Sit down, please.", "Negative: Don't worry. / Don't be late. / Don't forget!", "Inclusive: Let's eat. / Let's start. / Let's not argue.", "Emphatic: Do sit down! (with 'do' for emphasis)"] },
    ],
  },
  {
    id: "prepositions",
    title: "Prepositions of Time & Place",
    icon: "📍",
    color: "text-cyan-600",
    explanation: "English uses AT, IN, and ON for both time and place. AT = specific points (at 5 PM, at the door). IN = larger areas/periods (in Cairo, in summer). ON = surfaces/dates (on the table, on Monday). This is very different from Arabic prepositions.",
    formation: "at + specific point  |  in + area/period  |  on + surface/date",
    examples: [
      { de: "I will meet you at 6 PM.", en: "I will meet you at 6 PM. (time: specific)", ar: "سأقابلك في السادسة مساءً." },
      { de: "She lives in Cairo.", en: "She lives in Cairo. (place: city)", ar: "هي تعيش في القاهرة." },
      { de: "The book is on the table.", en: "The book is on the table. (place: surface)", ar: "الكتاب على الطاولة." },
      { de: "My birthday is on March 15th.", en: "My birthday is on March 15th. (time: date)", ar: "عيد ميلادي في الخامس عشر من مارس." },
      { de: "I usually wake up at 7 AM.", en: "I usually wake up at 7 AM. (time: specific)", ar: "أنا أستيقظ عادةً في السابعة صباحاً." },
      { de: "We go to the beach in summer.", en: "We go to the beach in summer. (time: period)", ar: "نذهب إلى الشاطئ في الصيف." },
    ],
    subRules: [
      { label: "AT rules", items: ["Time: at 5 PM, at midnight, at noon, at night, at the weekend", "Place: at the door, at the bus stop, at school, at work, at home"] },
      { label: "IN rules", items: ["Time: in the morning, in April, in 2024, in summer, in the 20th century", "Place: in Cairo, in Egypt, in the kitchen, in the park, in the car"] },
      { label: "ON rules", items: ["Time: on Monday, on March 15th, on Christmas Day, on the weekend (US)", "Place: on the table, on the wall, on the floor, on the bus, on the train"] },
    ],
  },
];

export const SPOT_EXAMPLES = [
  { de: "I met my friend at the café yesterday.", en: "I met my friend at the café yesterday. (Place + Time)", ar: "قابلت صديقي في المقهى أمس." },
  { de: "We discussed the project in a meeting at the office last night.", en: "We discussed the project in a meeting at the office last night.", ar: "ناقشنا المشروع في اجتماع في المكتب الليلة الماضية." },
  { de: "She went home quickly after work.", en: "She went home quickly after work.", ar: "ذهبت إلى المنزل بسرعة بعد العمل." },
  { de: "He has worked successfully at a company in Cairo for three years.", en: "He has worked successfully at a company in Cairo for three years.", ar: "هو يعمل بنجاح في شركة في القاهرة منذ ثلاث سنوات." },
];

export const SENTENCE_MODELS = [
  { pattern: "Subject — Verb — Object — Place — Time (SPOT)", patternAr: "الفاعل — الفعل — المفعول — المكان — الزمان", example: "I met my friend at the café yesterday." },
  { pattern: "Time at start — Subject — Verb — Object — Place", patternAr: "الزمان في البداية — الفاعل — الفعل — المفعول — المكان", example: "Yesterday I met my friend at the café." },
  { pattern: "Subject — Frequency adverb — Verb — Rest", patternAr: "الفاعل — ظرف التكرار — الفعل — الباقي", example: "She always drinks coffee in the morning." },
  { pattern: "WH-question — Auxiliary — Subject — Verb?", patternAr: "أداة السؤال — الفعل المساعد — الفاعل — الفعل؟", example: "Where do you live?" },
  { pattern: "Auxiliary — Subject — Verb? (Yes/No question)", patternAr: "الفعل المساعد — الفاعل — الفعل؟ (سؤال نعم/لا)", example: "Do you like coffee?" },
];
