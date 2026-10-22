export type PraeteritumRule = {
  id: string;
  title: string;
  icon: string;
  color: string;
  explanation: string;
  formation: string;
  examples: { de: string; en: string; ar: string }[];
  subRules?: { label: string; items: string[] }[];
};

export const PRAETERITUM_RULES: PraeteritumRule[] = [
  {
    id: "wann-simple-past",
    title: "When to Use Simple Past",
    icon: "📖",
    color: "text-blue-600",
    explanation: "The simple past (also called past simple or preterite) is used for completed actions in the past. In English, it is used in BOTH written and spoken language. Regular verbs add '-ed'; irregular verbs change form.",
    formation: "regular: verb + -ed  |  irregular: varies (see list)",
    examples: [
      { de: "I walked to school yesterday.", en: "I walked to school yesterday.", ar: "مشيت إلى المدرسة أمس." },
      { de: "She visited her grandmother last weekend.", en: "She visited her grandmother last weekend.", ar: "زارت جدتها نهاية الأسبوع الماضي." },
      { de: "They played football in the park.", en: "They played football in the park.", ar: "لعبوا كرة القدم في الحديقة." },
      { de: "He lived in London for five years.", en: "He lived in London for five years.", ar: "عاش في لندن لمدة خمس سنوات." },
      { de: "The sun was shining and the birds sang.", en: "The sun was shining and the birds sang.", ar: "كانت الشمس مشرقة والطيور تغرد." },
      { de: "I watched a movie last night.", en: "I watched a movie last night.", ar: "شاهدت فيلماً الليلة الماضية." },
    ],
    subRules: [
      { label: "Simple Past vs. Present Perfect", items: ["Simple Past = completed action at a specific time in the past: I saw him yesterday. (time specified)", "Present Perfect = past action with connection to now OR unspecified time: I have seen him before. (no specific time)", "Signal words for simple past: yesterday, last week, in 2010, an hour ago, when I was a child", "Signal words for present perfect: ever, never, just, already, yet, so far, recently"] },
    ],
  },
  {
    id: "regular-verbs",
    title: "Regular Verbs (-ed)",
    icon: "🔧",
    color: "text-emerald-600",
    explanation: "Regular verbs form the simple past by adding '-ed' to the base form. The pronunciation of '-ed' varies: /d/ after vowels and voiced consonants, /t/ after voiceless consonants, and /ɪd/ after -d and -t. Spelling rules apply for verbs ending in -e, -y, or CVC patterns.",
    formation: "base verb + -ed (with spelling changes as needed)",
    examples: [
      { de: "I worked in an office last summer.", en: "I worked in an office last summer.", ar: "عملت في مكتب الصيف الماضي." },
      { de: "She studied hard for the exam. (-y → -ied)", en: "She studied hard for the exam.", ar: "درست بجد للامتحان." },
      { de: "He stopped at the red light. (double consonant)", en: "He stopped at the red light.", ar: "توقف عند الإشارة الحمراء." },
      { de: "We loved the concert last night.", en: "We loved the concert last night.", ar: "أحببنا الحفلة الليلة الماضية." },
      { de: "They arrived at 8 PM.", en: "They arrived at 8 PM.", ar: "وصلوا الساعة 8 مساءً." },
      { de: "She opened the window because it was hot.", en: "She opened the window because it was hot.", ar: "فتحت النافذة لأن الجو كان حاراً." },
    ],
    subRules: [
      { label: "Regular verb spelling rules", items: ["verb + -ed: walk → walked, play → played, listen → listened", "verb ends in -e: +d only: love → loved, dance → danced, close → closed", "verb ends in consonant + -y: -y → -ied: study → studied, carry → carried, try → tried", "CVC (consonant-vowel-consonant): double last letter: stop → stopped, plan → planned, grab → grabbed"] },
      { label: "Pronunciation of -ed", items: ["/d/ after vowels and voiced consonants: played /pleɪd/, called /kɔːld/, lived /lɪvd/", "/t/ after voiceless consonants: walked /wɔːkt/, helped /helpt/, watched /wɒtʃt/", "/ɪd/ after -d and -t: needed /niːdɪd/, wanted /wɒntɪd/, started /stɑːtɪd/"] },
    ],
  },
  {
    id: "irregular-verbs",
    title: "Irregular Verbs",
    icon: "⚡",
    color: "text-purple-600",
    explanation: "Irregular verbs do NOT add '-ed'. Instead, they change form in various ways: vowel change (sing→sang), completely different form (go→went), or no change at all (put→put). English has about 200 irregular verbs, but the most common 50 cover 80% of usage.",
    formation: "no single rule — each verb has its own past form",
    examples: [
      { de: "I went to the supermarket this morning.", en: "I went to the supermarket this morning.", ar: "ذهبت إلى السوبرماركت هذا الصباح." },
      { de: "She ate lunch at 12 PM.", en: "She ate lunch at 12 PM.", ar: "تناولت الغداء الساعة 12 ظهراً." },
      { de: "He wrote a letter to his mother.", en: "He wrote a letter to his mother.", ar: "كتب رسالة إلى والدته." },
      { de: "We saw a beautiful sunset.", en: "We saw a beautiful sunset.", ar: "رأينا غروب شمس جميل." },
      { de: "They drank coffee after dinner.", en: "They drank coffee after dinner.", ar: "شربوا القهوة بعد العشاء." },
      { de: "I read an interesting book last week.", en: "I read an interesting book last week.", ar: "قرأت كتاباً ممتعاً الأسبوع الماضي." },
    ],
    subRules: [
      { label: "Common irregular verbs by pattern", items: ["Vowel change i→a→u: sing→sang→sung, ring→rang→rung, swim→swam→swum, drink→drank→drunk", "Vowel change i→a→-: sit→sat→sat, win→won→won, stick→stuck→stuck", "Vowel change e→o→o: break→broke→broken, speak→spoke→spoken, steal→stole→stolen", "Vowel change ee→e→e: meet→met→met, feed→fed→fed, keep→kept→kept", "No change: put→put→put, cut→cut→cut, set→set→set, cost→cost→cost", "Completely different: go→went→gone, buy→bought→bought, catch→caught→caught"] },
      { label: "Top 10 most common irregular verbs", items: ["be → was/were (to be), have → had (to have), do → did (to do), say → said (to say), get → got (to get)", "make → made (to make), go → went (to go), take → took (to take), come → came (to come), see → saw (to see)"] },
    ],
  },
  {
    id: "to-be",
    title: "The Verb 'to be' — was/were",
    icon: "⭐",
    color: "text-amber-600",
    explanation: "The verb 'to be' is the most irregular verb in English. In the simple past, it has two forms: 'was' (singular) and 'were' (plural). Unlike other verbs, 'to be' changes based on the subject, not just for the third person. It is used for states, descriptions, locations, and ages.",
    formation: "was (I/he/she/it) + were (you/we/they)",
    examples: [
      { de: "I was at home yesterday.", en: "I was at home yesterday.", ar: "كنت في المنزل أمس." },
      { de: "She was very tired after work.", en: "She was very tired after work.", ar: "كانت متعبة جداً بعد العمل." },
      { de: "They were on vacation last week.", en: "They were on vacation last week.", ar: "كانوا في إجازة الأسبوع الماضي." },
      { de: "The weather was beautiful yesterday.", en: "The weather was beautiful yesterday.", ar: "كان الطقس جميلاً أمس." },
      { de: "We were happy to see you.", en: "We were happy to see you.", ar: "كنا سعداء برؤيتك." },
      { de: "There was a car accident on the highway.", en: "There was a car accident on the highway.", ar: "كان هناك حادث سير على الطريق السريع." },
    ],
    subRules: [
      { label: "Conjugation of 'to be' in simple past", items: ["I was, you were, he/she/it was, we were, you (plural) were, they were"] },
      { label: "Negation", items: ["was not / wasn't: I wasn't at the party.", "were not / weren't: They weren't ready."] },
      { label: "Questions", items: ["Was he late? Were you at school?", "Where were you yesterday? Why was she angry?"] },
    ],
  },
  {
    id: "negation-questions",
    title: "Negation and Questions in Simple Past",
    icon: "❓",
    color: "text-cyan-600",
    explanation: "In the simple past, negation and questions use the auxiliary verb 'did'. The main verb goes back to the base form (infinitive). 'Did' carries the past tense, so the main verb should NOT be in past form. For 'to be', no auxiliary is needed.",
    formation: "did + not + base verb (negation)  |  Did + subject + base verb? (question)",
    examples: [
      { de: "I did not (didn't) go to the party.", en: "I didn't go to the party.", ar: "لم أذهب إلى الحفلة." },
      { de: "Did you see the movie last night?", en: "Did you see the movie last night?", ar: "هل شاهدت الفيلم الليلة الماضية؟" },
      { de: "She didn't eat breakfast this morning.", en: "She didn't eat breakfast this morning.", ar: "لم تتناول الفطور هذا الصباح." },
      { de: "What did you buy at the store?", en: "What did you buy at the store?", ar: "ماذا اشتريت من المتجر؟" },
      { de: "He didn't call me yesterday.", en: "He didn't call me yesterday.", ar: "لم يتصل بي أمس." },
      { de: "Where did they go after school?", en: "Where did they go after school?", ar: "أين ذهبوا بعد المدرسة؟" },
    ],
    subRules: [
      { label: "Negation with 'did not' / 'didn't'", items: ["didn't + base verb (not past!): I didn't go (NOT I didn't went), She didn't see (NOT She didn't saw)", "'to be' doesn't use did: I wasn't there (NOT I didn't be there)", "Common mistakes: ✗ I didn't went → ✓ I didn't go", "Common mistakes: ✗ She didn't saw him → ✓ She didn't see him"] },
      { label: "Question formation with 'did'", items: ["Did + subject + base verb: Did you eat breakfast? Did he call you? Did they arrive on time?", "WH-questions: What did you do? Where did she go? When did it happen? Why did you leave? How did you get here?"] },
      { label: "Questions with 'to be'", items: ["No 'did' needed — just invert: Was he tired? Were they ready?", "Where were you? Why was she late? How was the movie?"] },
    ],
  },
  {
    id: "past-vs-perfect",
    title: "Simple Past vs. Present Perfect",
    icon: "🔄",
    color: "text-indigo-600",
    explanation: "This is one of the most confusing topics for Arabic speakers. Simple past = a finished action at a specific time in the past. Present perfect = a past action with a connection to now, or a past action at an unspecified time. Arabic typically uses one past tense for both, so the distinction matters.",
    formation: "Simple Past: subject + past verb  |  Present Perfect: has/have + past participle",
    examples: [
      { de: "I lived in Cairo for 5 years. (I no longer live there)", en: "I lived in Cairo for 5 years. (finished)", ar: "عشت في القاهرة لمدة 5 سنوات (لم أعد أعيش هناك)." },
      { de: "I have lived in Cairo for 5 years. (I still live there)", en: "I have lived in Cairo for 5 years. (still true)", ar: "عشت في القاهرة لمدة 5 سنوات (ما زلت أعيش هناك)." },
      { de: "She visited Paris in 2019.", en: "She visited Paris in 2019. (specific time)", ar: "زارت باريس في 2019 (وقت محدد)." },
      { de: "She has visited Paris twice.", en: "She has visited Paris twice. (no specific time)", ar: "زارت باريس مرتين (بدون وقت محدد)." },
      { de: "I didn't finish my homework yesterday.", en: "I didn't finish my homework yesterday.", ar: "لم أكمل واجباتي البارحة." },
      { de: "I haven't finished my homework yet.", en: "I haven't finished my homework yet.", ar: "لم أكمل واجباتي بعد." },
    ],
    subRules: [
      { label: "Simple Past signal words", items: ["yesterday, last night/week/month/year, ago (two days ago, a year ago), in 2010/2022, when I was a child, then"] },
      { label: "Present Perfect signal words", items: ["ever, never, just, already, yet, so far, recently, lately, since, for, this week/month/year"] },
      { label: "The trick for Arabic speakers", items: ["Arabic: ذهبت can mean 'I went' OR 'I have gone'", "English: 'I went' = specific time (known or implied), 'I have gone' = no specific time or connection to now"] },
    ],
  },
];

export const PRAETERITUM_ENGLISH_COMPARE = [
  { english: "I worked. (simple past — completed)", example: "I worked.", arabic: "عملت (فعل ماضٍ بسيط)." },
  { english: "I have worked. (present perfect — connected to now)", example: "I have worked.", arabic: "عملت / قد عملت (مضارع تام)." },
  { english: "I was working. (past continuous — in progress)", example: "I was working.", arabic: "كنت أعمل (ماضٍ مستمر)." },
  { english: "I used to work. (past habit)", example: "I used to work.", arabic: "اعتدت العمل (عادة ماضية)." },
  { english: "I went. (simple past — irregular)", example: "I went.", arabic: "ذهبت (فعل ماضٍ غير منتظم)." },
  { english: "I have gone. (present perfect — irregular)", example: "I have gone.", arabic: "ذهبت / قد ذهبت (مضارع تام غير منتظم)." },
];
