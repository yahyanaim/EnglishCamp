export type FutureRule = {
  id: string;
  title: string;
  icon: string;
  color: string;
  explanation: string;
  formation: string;
  examples: { de: string; en: string; ar: string }[];
  subRules?: { label: string; items: string[] }[];
};

export const FUTURE_TENSES: FutureRule[] = [
  {
    id: "will-future",
    title: "Will + Base Verb (Simple Future)",
    icon: "🔮",
    color: "text-blue-600",
    explanation: "Use 'will' + base verb for predictions, promises, offers, spontaneous decisions, and facts about the future. 'Will' does not change form (no 'he wills'). The negative is 'will not' (won't). This is the most common way to express future in English.",
    formation: "will + base verb  |  won't + base verb  |  Will + subject + base verb?",
    examples: [
      { de: "I will call you tomorrow.", en: "I will call you tomorrow.", ar: "سأتصل بك غداً." },
      { de: "She will be at the meeting.", en: "She will be at the meeting.", ar: "ستكون في الاجتماع." },
      { de: "It will rain later today.", en: "It will rain later today.", ar: "ستمطر في وقت لاحق اليوم." },
      { de: "I won't forget your birthday.", en: "I won't forget your birthday.", ar: "لن أنسى عيد ميلادك." },
      { de: "Will you help me with this?", en: "Will you help me with this?", ar: "هل ستساعدني في هذا؟" },
      { de: "The meeting will start at 10 AM.", en: "The meeting will start at 10 AM.", ar: "سيبدأ الاجتماع في العاشرة صباحاً." },
    ],
    subRules: [
      { label: "When to use 'will'", items: ["Prediction: I think it will rain tomorrow.", "Promise: I will always love you.", "Offer: I'll carry your bags for you.", "Spontaneous decision: The phone is ringing. I'll answer it.", "Fact about the future: The sun will rise at 6 AM tomorrow."] },
      { label: "Conjugation — same for all persons", items: ["I will go, you will go, he/she/it will go, we will go, they will go", "No 'he wills' — always 'will' + base verb regardless of subject"] },
    ],
  },
  {
    id: "going-to",
    title: "Going To (Plans & Predictions)",
    icon: "📋",
    color: "text-emerald-600",
    explanation: "Use 'be going to' + base verb for planned future actions (intentions) and predictions based on present evidence. Unlike 'will' (spontaneous), 'going to' implies pre-planning or visible signs of what will happen.",
    formation: "am/is/are + going to + base verb",
    examples: [
      { de: "I am going to visit my parents next weekend.", en: "I am going to visit my parents next weekend.", ar: "سأزور والديّ نهاية الأسبوع القادم." },
      { de: "She is going to study medicine at university.", en: "She is going to study medicine at university.", ar: "ستدرس الطب في الجامعة." },
      { de: "Look at those clouds! It's going to rain.", en: "Look at those clouds! It's going to rain.", ar: "انظر إلى تلك الغيوم! ستمطر." },
      { de: "They are going to build a new school here.", en: "They are going to build a new school here.", ar: "سيبنون مدرسة جديدة هنا." },
      { de: "I am not going to attend the party.", en: "I am not going to attend the party.", ar: "لن أحضر الحفلة." },
      { de: "Are you going to apply for the job?", en: "Are you going to apply for the job?", ar: "هل ستتقدم للوظيفة؟" },
    ],
    subRules: [
      { label: "'Will' vs. 'Going to'", items: ["Will = spontaneous: The phone is ringing. I'll answer it. (just decided now)", "Going to = planned: I'm going to call him later. (decided before now)", "Will = prediction based on opinion: I think it will be a good movie.", "Going to = prediction based on evidence: Look at that car! It's going to crash!"] },
      { label: "Going to conjugation", items: ["I am going to work, you are going to work, he/she/it is going to work", "we are going to work, they are going to work", "Negative: I am not going to work (or: I'm not going to work)", "Question: Are you going to work?"] },
    ],
  },
  {
    id: "present-continuous-future",
    title: "Present Continuous for Future Arrangements",
    icon: "📅",
    color: "text-purple-600",
    explanation: "Use the present continuous (am/is/are + -ing) for fixed future arrangements, especially with other people. This implies that the time and place are already decided. This is very common in spoken English.",
    formation: "am/is/are + verb-ing (+ future time expression)",
    examples: [
      { de: "I am meeting my friend for lunch tomorrow.", en: "I am meeting my friend for lunch tomorrow.", ar: "سألتقي بصديقي على الغداء غداً." },
      { de: "She is flying to Dubai next Thursday.", en: "She is flying to Dubai next Thursday.", ar: "ستسافر إلى دبي الخميس القادم." },
      { de: "We are having dinner at 7 PM tonight.", en: "We are having dinner at 7 PM tonight.", ar: "سنتناول العشاء في السابعة مساءً الليلة." },
      { de: "He is not coming to the party on Saturday.", en: "He is not coming to the party on Saturday.", ar: "لن يأتي إلى الحفلة يوم السبت." },
      { de: "Are you going to the doctor next week?", en: "Are you going to the doctor next week?", ar: "هل ستذهب إلى الطبيب الأسبوع المقبل؟" },
      { de: "The manager is giving a presentation at 3 PM.", en: "The manager is giving a presentation at 3 PM.", ar: "سيقدم المدير عرضاً في الثالثة مساءً." },
    ],
    subRules: [
      { label: "Future forms comparison", items: ["Will: I'll call you. (spontaneous — no plan yet)", "Going to: I'm going to call him. (intention — I've decided)", "Present continuous: I'm meeting him at 6. (arrangement — time/place fixed)", "Present simple: The train leaves at 8 PM. (timetable/schedule)"] },
    ],
  },
  {
    id: "present-simple-future",
    title: "Present Simple for Timetables & Schedules",
    icon: "⏰",
    color: "text-cyan-600",
    explanation: "Use the present simple for scheduled future events on a timetable, calendar, or fixed schedule. This is common for transport, classes, cinema times, and official events. The schedule is seen as fixed by an external authority.",
    formation: "present simple + future time expression (timetable events)",
    examples: [
      { de: "The train departs at 7:15 AM tomorrow.", en: "The train departs at 7:15 AM tomorrow.", ar: "يغادر القطار في الساعة 7:15 صباحاً غداً." },
      { de: "The class starts at 9 AM next Monday.", en: "The class starts at 9 AM next Monday.", ar: "يبدأ الفصل في التاسعة صباحاً الاثنين القادم." },
      { de: "When does the flight to London leave?", en: "When does the flight to London leave?", ar: "متى تقلع الرحلة إلى لندن؟" },
      { de: "The exam finishes at 12:30 PM.", en: "The exam finishes at 12:30 PM.", ar: "ينتهي الامتحان في 12:30 ظهراً." },
      { de: "The shop opens at 10 AM on Sunday.", en: "The shop opens at 10 AM on Sunday.", ar: "يفتح المتجر في العاشرة صباحاً يوم الأحد." },
    ],
    subRules: [
      { label: "Timetable vs. arrangement", items: ["Timetable (present simple): The movie starts at 8 PM. (fixed, published schedule)", "Arrangement (present continuous): I'm meeting Sarah before the movie. (personal plan)"] },
    ],
  },
  {
    id: "future-perfect",
    title: "Future Perfect — 'will have done'",
    icon: "⏳",
    color: "text-amber-600",
    explanation: "The future perfect describes an action that WILL BE COMPLETED before a specific point in the future. Formed with 'will have' + past participle. Signal words include 'by', 'by the time', 'before', and 'by then'.",
    formation: "will have + past participle",
    examples: [
      { de: "By tomorrow, I will have finished the report.", en: "By tomorrow, I will have finished the report.", ar: "بحلول الغد، سأكون قد أنهيت التقرير." },
      { de: "She will have arrived by 6 PM.", en: "She will have arrived by 6 PM.", ar: "ستكون قد وصلت بحلول السادسة مساءً." },
      { de: "They will have built the bridge by 2027.", en: "They will have built the bridge by 2027.", ar: "سيكونون قد بنوا الجسر بحلول 2027." },
      { de: "Will you have finished before the deadline?", en: "Will you have finished before the deadline?", ar: "هل ستكون قد انتهيت قبل الموعد النهائي؟" },
      { de: "By the time we arrive, the movie will have started.", en: "By the time we arrive, the movie will have started.", ar: "بحلول وقت وصولنا، سيكون الفيلم قد بدأ." },
    ],
    subRules: [
      { label: "Future perfect signal words", items: ["by + time: by 5 PM, by Friday, by next year", "by the time + clause: by the time you arrive, by the time I finish", "before: before the meeting starts, before the deadline", "in + duration (with future perfect): in two years' time, in three weeks"] },
    ],
  },
  {
    id: "future-continuous",
    title: "Future Continuous — 'will be doing'",
    icon: "⏩",
    color: "text-indigo-600",
    explanation: "The future continuous describes an action that WILL BE IN PROGRESS at a specific time in the future. Formed with 'will be' + verb-ing. It is used for actions interrupted by another event, or for actions that will be happening at a stated future time.",
    formation: "will be + verb-ing",
    examples: [
      { de: "This time next week, I will be lying on a beach.", en: "This time next week, I will be lying on a beach.", ar: "في هذا الوقت الأسبوع القادم، سأكون مستلقياً على الشاطئ." },
      { de: "She will be working when you call her.", en: "She will be working when you call her.", ar: "ستكون تعمل عندما تتصل بها." },
      { de: "Don't call at 8 PM — we will be having dinner.", en: "Don't call at 8 PM — we will be having dinner.", ar: "لا تتصل في الثامنة مساءً — سنكون نتناول العشاء." },
      { de: "Will you be using the car tomorrow?", en: "Will you be using the car tomorrow?", ar: "هل ستستخدم السيارة غداً؟" },
      { de: "I will be waiting for you at the station.", en: "I will be waiting for you at the station.", ar: "سأنتظرك في المحطة." },
    ],
    subRules: [
      { label: "Future continuous uses", items: ["Action in progress at a future time: At 10 AM, I'll be having a meeting.", "Politely asking about plans: Will you be using the printer later?", "Predicting the present: Don't call him now — he'll be sleeping. (It's 2 AM.)"] },
    ],
  },
];

export const FUTURE_CONJUGATION = [
  { person: "I", future: "will work", futurePerfect: "will have worked" },
  { person: "You", future: "will work", futurePerfect: "will have worked" },
  { person: "He/She/It", future: "will work", futurePerfect: "will have worked" },
  { person: "We", future: "will work", futurePerfect: "will have worked" },
  { person: "You (pl.)", future: "will work", futurePerfect: "will have worked" },
  { person: "They", future: "will work", futurePerfect: "will have worked" },
];
