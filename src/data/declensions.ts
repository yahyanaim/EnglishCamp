export type PrepositionCategory = "location" | "direction" | "time" | "other";

export type PrepositionItem = {
  preposition: string;
  category: PrepositionCategory;
  usage: string;
  usageAr?: string;
  example: string;
  exampleAr?: string;
  arabic: string;
};

export const PREPOSITIONS: PrepositionItem[] = [
  { preposition: "at", category: "location", usage: "Specific point or place", usageAr: "نقطة محددة أو مكان", example: "She is at the bus stop.", exampleAr: "هي في موقف الحافلة.", arabic: "في / عند" },
  { preposition: "at", category: "time", usage: "Specific time", usageAr: "وقت محدد", example: "The meeting starts at 3 PM.", exampleAr: "يبدأ الاجتماع الساعة 3 مساءً.", arabic: "في / الساعة" },
  { preposition: "in", category: "location", usage: "Inside an area or container", usageAr: "داخل منطقة أو وعاء", example: "The book is in my bag.", exampleAr: "الكتاب في حقيبتي.", arabic: "في / داخل" },
  { preposition: "in", category: "time", usage: "Months, years, seasons, parts of day", usageAr: "أشهر، سنوات، فصول، أجزاء اليوم", example: "I was born in July.", exampleAr: "لقد ولدت في يوليو.", arabic: "في" },
  { preposition: "on", category: "location", usage: "Surface", usageAr: "على سطح", example: "The cat is on the roof.", exampleAr: "القطة على السطح.", arabic: "على" },
  { preposition: "on", category: "time", usage: "Days and dates", usageAr: "أيام وتواريخ", example: "See you on Monday.", exampleAr: "أراك يوم الاثنين.", arabic: "في / يوم" },
  { preposition: "to", category: "direction", usage: "Movement toward a destination", usageAr: "حركة نحو وجهة", example: "I am going to school.", exampleAr: "أنا ذاهب إلى المدرسة.", arabic: "إلى" },
  { preposition: "to", category: "other", usage: "Recipient (indirect object)", usageAr: "المتلقي (مفعول غير مباشر)", example: "Give the book to me.", exampleAr: "أعطني الكتاب.", arabic: "لـ" },
  { preposition: "for", category: "other", usage: "Purpose, duration, benefit", usageAr: "غرض، مدة، فائدة", example: "This gift is for you.", exampleAr: "هذه الهدية لك.", arabic: "لـ / لأجل" },
  { preposition: "with", category: "other", usage: "Accompaniment, instrument", usageAr: "مرافقة، أداة", example: "I went with my friends.", exampleAr: "ذهبت مع أصدقائي.", arabic: "مع / بـ" },
  { preposition: "by", category: "other", usage: "Agent, method, transport", usageAr: "فاعل، طريقة، وسيلة نقل", example: "She goes to work by bus.", exampleAr: "تذهب إلى العمل بالحافلة.", arabic: "بواسطة / بـ" },
  { preposition: "about", category: "other", usage: "Topic or subject", usageAr: "موضوع أو موضوع الحديث", example: "We talked about the project.", exampleAr: "تحدثنا عن المشروع.", arabic: "عن / حول" },
  { preposition: "from", category: "direction", usage: "Origin or starting point", usageAr: "أصل أو نقطة بداية", example: "I am from Egypt.", exampleAr: "أنا من مصر.", arabic: "من" },
  { preposition: "into", category: "direction", usage: "Entering a space", usageAr: "دخول فضاء", example: "He walked into the room.", exampleAr: "دخل الغرفة.", arabic: "إلى داخل" },
  { preposition: "out of", category: "direction", usage: "Leaving a space", usageAr: "خروج من فضاء", example: "She came out of the building.", exampleAr: "خرجت من المبنى.", arabic: "خارج / من" },
  { preposition: "across", category: "direction", usage: "From one side to the other", usageAr: "من جانب إلى آخر", example: "He swam across the river.", exampleAr: "سبح عبر النهر.", arabic: "عبر" },
  { preposition: "through", category: "direction", usage: "From inside to the other side", usageAr: "من الداخل إلى الجانب الآخر", example: "We walked through the tunnel.", exampleAr: "مشينا عبر النفق.", arabic: "عبر / خلال" },
  { preposition: "between", category: "location", usage: "In the middle of two things", usageAr: "في وسط شيئين", example: "The bank is between the café and the library.", exampleAr: "البنك بين المقهى والمكتبة.", arabic: "بين" },
  { preposition: "under", category: "location", usage: "Below or beneath", usageAr: "أسفل أو تحت", example: "The cat is under the table.", exampleAr: "القطة تحت الطاولة.", arabic: "تحت" },
  { preposition: "over", category: "location", usage: "Above, covering", usageAr: "فوق، يغطي", example: "A plane flew over the city.", exampleAr: "طارت طائرة فوق المدينة.", arabic: "فوق" },
  { preposition: "near", category: "location", usage: "Close to", usageAr: "قريب من", example: "I live near the station.", exampleAr: "أعيش بالقرب من المحطة.", arabic: "قرب / بالقرب من" },
  { preposition: "beside", category: "location", usage: "Next to", usageAr: "بجانب", example: "She sat beside me.", exampleAr: "جلست بجانبي.", arabic: "بجانب" },
  { preposition: "during", category: "time", usage: "Throughout a period", usageAr: "طوال فترة", example: "He slept during the movie.", exampleAr: "نام أثناء الفيلم.", arabic: "أثناء / خلال" },
  { preposition: "since", category: "time", usage: "From a starting point until now", usageAr: "من نقطة بداية حتى الآن", example: "I have studied English since 2020.", exampleAr: "أدرس الإنجليزية منذ 2020.", arabic: "منذ" },
  { preposition: "until", category: "time", usage: "Up to a point", usageAr: "حتى نقطة", example: "The store is open until 9 PM.", exampleAr: "المتجر مفتوح حتى الساعة 9 مساءً.", arabic: "حتى" },
  { preposition: "of", category: "other", usage: "Belonging, origin, contents", usageAr: "انتماء، أصل، محتويات", example: "The cover of the book is red.", exampleAr: "غلاف الكتاب أحمر.", arabic: "لـ / من" },
];

export type LocationDirectionPair = {
  preposition: string;
  location: string;
  locationExample: string;
  direction: string;
  directionExample: string;
  arabic: string;
};

export const LOCATION_DIRECTION_PAIRS: LocationDirectionPair[] = [
  { preposition: "in / into", location: "in", locationExample: "She is in the garden.", direction: "into", directionExample: "She walked into the garden.", arabic: "في / إلى داخل" },
  { preposition: "on / onto", location: "on", locationExample: "The cup is on the table.", direction: "onto", directionExample: "He put the cup onto the table.", arabic: "على / إلى فوق" },
  { preposition: "under / out from under", location: "under", locationExample: "The dog is under the bed.", direction: "out from under", directionExample: "The dog came out from under the bed.", arabic: "تحت / من تحت" },
];

export type PrepositionTip = {
  id: string;
  topic: string;
  topicAr?: string;
  tip: string;
  tipAr?: string;
  suggest: string;
  suggestAr?: string;
};

export const PREPOSITION_TIPS: PrepositionTip[] = [
  {
    id: "at-in-on-time",
    topic: "AT / IN / ON for Time",
    topicAr: "AT / IN / ON للتوقيت",
    tip: "Use AT for clock times (at 5 o'clock), IN for longer periods (in July, in 2024), ON for days/dates (on Monday, on July 5th).",
    tipAr: "استخدم AT للساعة (at 5 o'clock)، IN للفترات الأطول (in July, in 2024)، ON للأيام/التواريخ (on Monday, on July 5th).",
    suggest: "Write 3 sentences each using at, in, and on with time expressions.",
    suggestAr: "اكتب 3 جمل لكل من at و in و on مع تعبيرات زمنية.",
  },
  {
    id: "at-in-on-place",
    topic: "AT / IN / ON for Place",
    topicAr: "AT / IN / ON للمكان",
    tip: "Use AT for specific points/addresses (at the door, at 10 Main Street), IN for enclosed spaces (in the room, in the city), ON for surfaces (on the wall, on the floor).",
    tipAr: "استخدم AT للنقاط/العناوين المحددة (at the door)، IN للأماكن المغلقة (in the room)، ON للأسطح (on the wall).",
    suggest: "Describe your current location using at, in, and on correctly.",
    suggestAr: "صف موقعك الحالي باستخدام at و in و on بشكل صحيح.",
  },
  {
    id: "to-vs-for",
    topic: "TO vs FOR (Direction vs Purpose)",
    topicAr: "TO مقابل FOR (اتجاه مقابل غرض)",
    tip: "Use TO for movement toward a destination (go to the store) or recipient (give it to me). Use FOR for purpose (this is for you), duration (for two hours), or benefit (study for the test).",
    tipAr: "استخدم TO للحركة نحو وجهة (go to the store) أو المتلقي (give it to me). استخدم FOR للغرض (this is for you) أو المدة (for two hours).",
    suggest: "Create 5 sentences contrasting to and for to practice the difference.",
    suggestAr: "أنشئ 5 جمل تقارن بين to و for لتمييز الفرق.",
  },
  {
    id: "by-transport",
    topic: "BY for Transport Methods",
    topicAr: "BY لوسائل النقل",
    tip: "Use BY to describe how you travel: by car, by bus, by train, by plane, by bike. No article needed! Exception: on foot (not 'by foot').",
    tipAr: "استخدم BY لوصف كيفية السفر: by car، by bus، by train. لا حاجة لأداة تعريف! استثناء: on foot (وليس by foot).",
    suggest: "Tell someone how you get to school, work, and the supermarket using by + transport.",
    suggestAr: "أخبر شخصاً كيف تذهب إلى المدرسة والعمل والسوبرماركت باستخدام by + وسيلة نقل.",
  },
  {
    id: "in-on-to-nothing",
    topic: "Arrive in / at — arrive home",
    topicAr: "arrive in / at — دون حرف جر قبل home",
    tip: "Use arrive in for a city or country (arrive in Cairo) and arrive at for a specific point (arrive at the station). Say arrive home without a preposition. On can introduce an arrival day (arrive on Monday); it is not a general rule for continents.",
    tipAr: "استخدم arrive in مع مدينة أو بلد، وarrive at مع مكان محدد مثل المحطة. قل arrive home دون حرف جر. يمكن أن تأتي on قبل يوم الوصول مثل on Monday، وليست قاعدة عامة للقارات.",
    suggest: "Complete: We arrived ___ Cairo, then arrived ___ the station. We arrived ___ Monday and went home. Compare: in, at, on.",
    suggestAr: "أكمل: We arrived ___ Cairo, then arrived ___ the station. We arrived ___ Monday and went home. قارن الإجابات: in، at، on.",
  },
  {
    id: "preposition-verbs",
    topic: "Verbs + Fixed Prepositions",
    topicAr: "أفعال + حروف جر ثابتة",
    tip: "Many English verbs require a specific preposition: listen TO, wait FOR, look AT, depend ON, belong TO, search FOR, believe IN, explain TO, ask FOR, talk ABOUT.",
    tipAr: "العديد من الأفعال الإنجليزية تتطلب حرف جر محدد: listen TO، wait FOR، look AT، depend ON، belong TO، search FOR، believe IN.",
    suggest: "Make a flashcard for each verb+preposition pair and practice daily.",
    suggestAr: "اصنع بطاقة تعليمية لكل زوج فعل+حرف جر وتدرب يومياً.",
  },
  {
    id: "preposition-questions",
    topic: "Questions Ending with Prepositions",
    topicAr: "الأسئلة المنتهية بحروف جر",
    tip: "In informal English, it's natural to end a question with a preposition: 'Who are you waiting FOR?', 'What are you talking ABOUT?', 'Where do you come FROM?', 'Which bus did you come ON?'",
    tipAr: "في الإنجليزية غير الرسمية، من الطبيعي إنهاء السؤال بحرف جر: 'Who are you waiting FOR?'، 'What are you talking ABOUT?'، 'Where do you come FROM?'.",
    suggest: "Turn these into questions: 'I am waiting for my friend.' → 'Who are you waiting for?'",
    suggestAr: "حوّل هذه إلى أسئلة: 'I am waiting for my friend.' ← 'Who are you waiting for?'",
  },
  {
    id: "phrasal-verbs",
    topic: "Multi-word verbs: particles and prepositions",
    topicAr: "الأفعال متعددة الكلمات: الجزيئات وحروف الجر",
    tip: "Multi-word verbs can contain particles, prepositions, or both. Compare give up (stop trying), look after someone (care for them), and put up with something (tolerate it). Meanings can be literal or idiomatic. With a separable verb and an object pronoun, put the pronoun inside: turn it off, not turn off it.",
    tipAr: "قد تحتوي الأفعال متعددة الكلمات على جزيئات أو حروف جر أو كليهما. قد يكون المعنى حرفياً أو اصطلاحياً. مع فعل قابل للفصل وضمير مفعول به، ضع الضمير في الوسط: turn it off وليس turn off it.",
    suggest: "Compare turn the light off / turn it off with look after the child / look after her. Notice which expression permits the object in the middle.",
    suggestAr: "قارن turn the light off وturn it off مع look after the child وlook after her. لاحظ أي تعبير يسمح بوضع المفعول به في الوسط.",
  },
];

export const PRONOUNS_AFTER_PREPOSITIONS = {
  subject: ["I", "you", "he", "she", "it", "we", "they"],
  object: ["me", "you", "him", "her", "it", "us", "them"],
} as const;
