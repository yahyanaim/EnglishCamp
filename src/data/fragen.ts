export type FragenRule = {
  id: string;
  title: string;
  icon: string;
  color: string;
  explanation: string;
  formation: string;
  examples: { de: string; en: string; ar?: string }[];
  subRules?: { label: string; items: string[] }[];
};

export const FRAGEN_RULES: FragenRule[] = [
  {
    id: "wh-questions",
    title: "WH-Questions — Open Questions",
    icon: "❓",
    color: "text-blue-600",
    explanation: "WH-questions ask for specific information. They begin with a WH-word (What, Where, When, Why, Who, Whose, Whom, How, etc.). The structure is: WH-word + auxiliary verb + subject + main verb. HOW combines with adjectives and adverbs: How much? How many? How often? How far?",
    formation: "WH-word + auxiliary (do/be/have/modal) + subject + main verb?",
    examples: [
      { de: "What is your name?", en: "What is your name?", ar: "ما اسمك؟" },
      { de: "Where do you live?", en: "Where do you live?", ar: "أين تعيش؟" },
      { de: "When does the meeting start?", en: "When does the meeting start?", ar: "متى يبدأ الاجتماع؟" },
      { de: "Why are you learning English?", en: "Why are you learning English?", ar: "لماذا تتعلم الإنجليزية؟" },
      { de: "Who called you?", en: "Who called you? (who = subject, no auxiliary needed)", ar: "من اتصل بك؟" },
      { de: "How long have you been studying?", en: "How long have you been studying?", ar: "منذ متى وأنت تدرس؟" },
    ],
    subRules: [
      { label: "Important WH-words", items: ["who (who — subject), whom (whom — object, formal), whose (whose — possession)", "what (what), which (which — from a set), where (where), when (when)", "why (why), how (how), how much (how much — uncountable), how many (how many — countable)", "how long (how long — duration), how often (how often — frequency), how far (how far — distance)", "what kind of (what kind of — type), what time (what time — specific time)"] },
    ],
  },
  {
    id: "yes-no-questions",
    title: "Yes/No Questions",
    icon: "✅",
    color: "text-emerald-600",
    explanation: "Yes/No questions are formed by inverting the subject and the auxiliary verb. If there's no auxiliary verb, add 'do/does/did' (which carries the tense). Short answers use the auxiliary verb only: 'Yes, I do.' / 'No, he doesn't.'",
    formation: "Auxiliary verb + subject + main verb?  |  Do/Does/Did + subject + base verb?",
    examples: [
      { de: "Do you like coffee?", en: "Do you like coffee?", ar: "هل تحب القهوة؟" },
      { de: "Are you hungry?", en: "Are you hungry?", ar: "هل أنت جائع؟" },
      { de: "Can you help me?", en: "Can you help me?", ar: "هل يمكنك مساعدتي؟" },
      { de: "Is that your car?", en: "Is that your car?", ar: "هل هذه سيارتك؟" },
      { de: "Did you see the movie?", en: "Did you see the movie?", ar: "هل شاهدت الفيلم؟" },
      { de: "Has she arrived yet?", en: "Has she arrived yet?", ar: "هل وصلت بعد؟" },
    ],
    subRules: [
      { label: "Forming Yes/No questions", items: ["With 'be': invert — Is he ready? Are they coming? Was she there?", "With 'have' (as main verb): Do you have a car? (NOT: Have you a car?)", "With modals: Modal before subject — Can you swim? Should I wait? Will she come?", "With present/past simple: Do/Does/Did + subject + base verb — Do you work? Did he call?", "Short answers: Yes, I do / No, she doesn't / Yes, he can / No, I wasn't"] },
    ],
  },
  {
    id: "subject-questions",
    title: "Subject vs. Object Questions",
    icon: "🎯",
    color: "text-purple-600",
    explanation: "When WHO or WHAT is the SUBJECT of the question, no auxiliary verb is needed — the question word replaces the subject. When WHO or WHAT is the OBJECT, you need an auxiliary verb. This is a common confusion for Arabic speakers.",
    formation: "Subject question: Who/What + verb + rest?  |  Object question: Who/What + auxiliary + subject + verb?",
    examples: [
      { de: "Who called you? (subject — no auxiliary)", en: "Who called you?", ar: "من اتصل بك؟" },
      { de: "Who did you call? (object — need auxiliary)", en: "Who did you call?", ar: "بمن اتصلت؟" },
      { de: "What happened? (subject — no auxiliary)", en: "What happened?", ar: "ماذا حدث؟" },
      { de: "What did you see? (object — need auxiliary)", en: "What did you see?", ar: "ماذا رأيت؟" },
      { de: "Who wrote this book? (subject)", en: "Who wrote this book?", ar: "من كتب هذا الكتاب؟" },
      { de: "Who did you give the book to? (object)", en: "Who did you give the book to?", ar: "لمن أعطيت الكتاب؟" },
    ],
    subRules: [
      { label: "Subject vs. Object question test", items: ["Subject question (no do/does/did): Who called? Something happened.", "Object question (with do/does/did): Who did you call? What did you see?", "Test: If the answer is the subject, no auxiliary needed. If the answer is the object, use auxiliary.", "Example: 'Who called?' — 'Ahmed called.' (Ahmed = subject)", "Example: 'Who did you call?' — 'I called Ahmed.' (Ahmed = object)"] },
    ],
  },
  {
    id: "question-tags",
    title: "Question Tags (..., isn't it? / ..., do you?)",
    icon: "🏷️",
    color: "text-amber-600",
    explanation: "Question tags turn a statement into a question by adding a short tag at the end. If the statement is positive, the tag is negative. If the statement is negative, the tag is positive. The tag uses the same auxiliary verb as the statement. This is a very natural English conversation feature.",
    formation: "Positive statement + negative tag?  |  Negative statement + positive tag?",
    examples: [
      { de: "You are a student, aren't you?", en: "You are a student, aren't you?", ar: "أنت طالب، أليس كذلك؟" },
      { de: "She doesn't like coffee, does she?", en: "She doesn't like coffee, does she?", ar: "هي لا تحب القهوة، أليس كذلك؟" },
      { de: "He can swim, can't he?", en: "He can swim, can't he?", ar: "هو يستطيع السباحة، أليس كذلك؟" },
      { de: "They have arrived, haven't they?", en: "They have arrived, haven't they?", ar: "لقد وصلوا، أليس كذلك؟" },
      { de: "You will come, won't you?", en: "You will come, won't you?", ar: "ستأتي، أليس كذلك؟" },
      { de: "It's a beautiful day, isn't it?", en: "It's a beautiful day, isn't it?", ar: "إنه يوم جميل، أليس كذلك؟" },
    ],
    subRules: [
      { label: "Question tag rules", items: ["Positive statement → negative tag: You are tired, aren't you? He likes tea, doesn't he?", "Negative statement → positive tag: You aren't tired, are you? He doesn't like tea, does he?", "With 'be': use the same be-form: is → isn't it?, are → aren't they?, was → wasn't he?", "With modals: can → can't?, must → mustn't?, will → won't?", "With present/past simple: do/does/did: He works, doesn't he? She came, didn't she?"] },
    ],
  },
  {
    id: "indirect-questions",
    title: "Indirect Questions",
    icon: "🔄",
    color: "text-indigo-600",
    explanation: "Indirect questions embed a question inside a statement or another question. They use statement word order (subject before verb, not inverted). 'Do/does/did' are not used in the embedded clause. Use 'if' or 'whether' for yes/no questions.",
    formation: "Main clause + wh-word + subject + verb  |  Main clause + if/whether + subject + verb",
    examples: [
      { de: "I wonder where he lives.", en: "I wonder where he lives. (not: where does he live)", ar: "أتساءل أين يعيش." },
      { de: "Can you tell me what time it is?", en: "Can you tell me what time it is?", ar: "هل يمكنك إخباري كم الساعة؟" },
      { de: "She asked if I was coming.", en: "She asked if I was coming.", ar: "سألت إن كنت قادماً." },
      { de: "I don't know whether he will come.", en: "I don't know whether he will come.", ar: "لا أعرف إن كان سيأتي." },
      { de: "Do you know when the train arrives?", en: "Do you know when the train arrives?", ar: "هل تعرف متى يصل القطار؟" },
      { de: "Tell me why you are late.", en: "Tell me why you are late.", ar: "قل لي لماذا أنت متأخر." },
    ],
    subRules: [
      { label: "Key rules for indirect questions", items: ["Statement word order: subject BEFORE verb: ... where he LIVES (NOT: where does he live)", "No do/does/did: I asked what he WANTED (NOT: what did he want)", "If/Whether for yes/no: She asked if I was ready. / I wonder whether it's true.", "No question mark if the main clause is a statement: I wonder where he is. (✓) / I wonder where he is? (✗)"] },
    ],
  },
  {
    id: "preposition-questions",
    title: "Questions with Prepositions",
    icon: "📍",
    color: "text-rose-600",
    explanation: "In English, prepositions often come at the END of questions in informal speech. Formally, the preposition comes before the question word. 'Who' becomes 'whom' after a preposition in formal English. For things, use 'what + preposition' or 'where'.",
    formation: "Informal: What/Who/Which + ... + preposition?  |  Formal: Preposition + whom/which + ...?",
    examples: [
      { de: "Who are you talking to? (informal)", en: "Who are you talking to?", ar: "مع من تتحدث؟" },
      { de: "To whom are you talking? (formal)", en: "To whom are you talking?", ar: "مع من تتحدث (رسمي)؟" },
      { de: "What are you looking at?", en: "What are you looking at?", ar: "إلى ماذا تنظر؟" },
      { de: "Where do you come from?", en: "Where do you come from?", ar: "من أين أنت؟" },
      { de: "What is this used for?", en: "What is this used for?", ar: "لأي شيء يُستخدم هذا؟" },
      { de: "Which company does he work for?", en: "Which company does he work for?", ar: "لأي شركة يعمل؟" },
    ],
    subRules: [
      { label: "Preposition placement in questions", items: ["Informal (common): preposition at END — Who are you waiting for? / What is this made of?", "Formal: preposition before question word — For whom is the gift? / Of what is this made?", "With 'where': no preposition needed — Where are you going? (NOT: To where are you going?)", "With 'what': keep the preposition — What are you talking about? / What does this depend on?"] },
    ],
  },
];

export const FRAGEN_WORT_TABLE = [
  { wWord: "who", case: "Subject (for people)", meaning: "who", ar: "من", example: "Who is that? / Who called you?" },
  { wWord: "whom", case: "Object (formal)", meaning: "whom", ar: "من (مفعول به)", example: "Whom did you see? (formal) / To whom it may concern" },
  { wWord: "whose", case: "Possession", meaning: "whose", ar: "لمن (ملكية)", example: "Whose car is this? / Whose book is that?" },
  { wWord: "what", case: "-", meaning: "what", ar: "ماذا", example: "What is your name? / What do you want?" },
  { wWord: "which", case: "-", meaning: "which", ar: "أي", example: "Which color do you prefer? / Which one is yours?" },
  { wWord: "when", case: "-", meaning: "when", ar: "متى", example: "When does the meeting start?" },
  { wWord: "where", case: "-", meaning: "where", ar: "أين", example: "Where do you live?" },
  { wWord: "why", case: "-", meaning: "why", ar: "لماذا", example: "Why are you learning English?" },
  { wWord: "how", case: "-", meaning: "how", ar: "كيف", example: "How are you? / How does this work?" },
  { wWord: "how much", case: "-", meaning: "how much", ar: "كم (غير معدود)", example: "How much does it cost? / How much time?" },
  { wWord: "how many", case: "-", meaning: "how many", ar: "كم (معدود)", example: "How many people are there?" },
  { wWord: "how often", case: "-", meaning: "how often", ar: "كم مرة", example: "How often do you exercise?" },
];
