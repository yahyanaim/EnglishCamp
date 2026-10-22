export type CondRule = {
  id: string;
  title: string;
  icon: string;
  color: string;
  explanation: string;
  formation: string;
  examples: { de: string; en: string; ar: string }[];
  subRules?: { label: string; items: string[] }[];
};

export const CONDITIONAL_RULES: CondRule[] = [
  {
    id: "zero-conditional",
    title: "Zero Conditional — General Truths",
    icon: "🔬",
    color: "text-blue-600",
    explanation: "The zero conditional expresses general truths, scientific facts, and habits — things that are always true when the condition is met. Both clauses use the present simple tense. The 'if' can be replaced with 'when' with no change in meaning.",
    formation: "If/When + present simple, present simple",
    examples: [
      { de: "If you heat ice, it melts.", en: "If you heat ice, it melts.", ar: "إذا سخنت الثلج، فإنه يذوب." },
      { de: "If it rains, the ground gets wet.", en: "If it rains, the ground gets wet.", ar: "إذا هطل المطر، تصبح الأرض مبتلة." },
      { de: "When you mix red and blue, you get purple.", en: "When you mix red and blue, you get purple.", ar: "عند مزج الأحمر والأزرق، تحصل على الأرجواني." },
      { de: "If I am tired, I drink coffee.", en: "If I am tired, I drink coffee.", ar: "إذا كنت متعباً، أشرب القهوة." },
      { de: "Water boils if you heat it to 100°C.", en: "Water boils if you heat it to 100°C.", ar: "يغلي الماء إذا سخنته إلى 100 درجة مئوية." },
      { de: "If you don't water plants, they die.", en: "If you don't water plants, they die.", ar: "إذا لم تسق النباتات، تموت." },
    ],
    subRules: [
      { label: "Zero conditional facts", items: ["If and When are interchangeable: If/When you heat ice, it melts.", "Always present simple in both clauses.", "Used for: scientific facts, habits, rules, general truths."] },
    ],
  },
  {
    id: "first-conditional",
    title: "First Conditional — Real Future Possibilities",
    icon: "🎯",
    color: "text-emerald-600",
    explanation: "The first conditional expresses a real possibility in the future. The 'if' clause uses present simple, and the main clause uses 'will' + base verb. The condition is likely or possible to happen. This is the most common conditional for talking about future plans.",
    formation: "If + present simple, will + base verb",
    examples: [
      { de: "If it rains tomorrow, I will stay at home.", en: "If it rains tomorrow, I will stay at home.", ar: "إذا هطل المطر غداً، سأبقى في المنزل." },
      { de: "If you study hard, you will pass the exam.", en: "If you study hard, you will pass the exam.", ar: "إذا درست بجد، ستنجح في الامتحان." },
      { de: "She will call you if she gets the news.", en: "She will call you if she gets the news.", ar: "ستتصل بك إذا تلقت الأخبار." },
      { de: "If we leave now, we will catch the bus.", en: "If we leave now, we will catch the bus.", ar: "إذا غادرنا الآن، سنلحق بالحافلة." },
      { de: "Will you help me if I ask?", en: "Will you help me if I ask?", ar: "هل ستساعدني إذا طلبت؟" },
      { de: "If you don't hurry, you will miss the train.", en: "If you don't hurry, you will miss the train.", ar: "إذا لم تسرع، ستفوتك القطار." },
    ],
    subRules: [
      { label: "Other modals in the main clause", items: ["can: If you finish early, you can leave.", "may: If it's sunny, we may go to the beach.", "must: If you want to pass, you must study.", "imperative: If you get lost, call me."] },
    ],
  },
  {
    id: "second-conditional",
    title: "Second Conditional — Unreal Present/Future",
    icon: "💭",
    color: "text-purple-600",
    explanation: "The second conditional expresses unreal or unlikely situations in the present or future. The 'if' clause uses past simple, and the main clause uses 'would' + base verb. 'Were' is used instead of 'was' for all subjects in formal English (If I were...).",
    formation: "If + past simple, would + base verb",
    examples: [
      { de: "If I had a million dollars, I would travel the world.", en: "If I had a million dollars, I would travel the world.", ar: "إذا كان لدي مليون دولار، لسافرت حول العالم." },
      { de: "If I were you, I would accept the job offer.", en: "If I were you, I would accept the job offer.", ar: "لو كنت مكانك، لقبلت عرض العمل." },
      { de: "If she studied more, she would get better grades.", en: "If she studied more, she would get better grades.", ar: "إذا درست أكثر، لكانت تحصل على درجات أفضل." },
      { de: "They would buy a house if they had enough money.", en: "They would buy a house if they had enough money.", ar: "سيشترون منزلاً إذا كان لديهم ما يكفي من المال." },
      { de: "What would you do if you won the lottery?", en: "What would you do if you won the lottery?", ar: "ماذا كنت ستفعل إذا ربحت اليانصيب؟" },
      { de: "If we lived closer, we would visit more often.", en: "If we lived closer, we would visit more often.", ar: "إذا كنا نسكن أقرب، لكنا نزور أكثر." },
    ],
    subRules: [
      { label: "'If I were' vs. 'If I was'", items: ["Formal/Correct: If I were you, I would... (always use 'were' for unreal situations)", "Informal: If I was you... (common in speech but grammatically incorrect)", "Use 'were' for all subjects: If he were here, If she were ready, If it were possible"] },
      { label: "Could and might in second conditional", items: ["could: If I had more time, I could help you.", "might: If she asked, he might say yes."] },
    ],
  },
  {
    id: "third-conditional",
    title: "Third Conditional — Unreal Past",
    icon: "⏪",
    color: "text-amber-600",
    explanation: "The third conditional expresses regret or hypothetical situations in the past — things that did NOT happen but could have. The 'if' clause uses past perfect (had + past participle), and the main clause uses 'would have' + past participle.",
    formation: "If + had + past participle, would have + past participle",
    examples: [
      { de: "If I had studied harder, I would have passed the exam.", en: "If I had studied harder, I would have passed the exam.", ar: "إذا كنت قد درست بجد أكثر، لكنت قد نجحت في الامتحان." },
      { de: "If you had called me, I would have come.", en: "If you had called me, I would have come.", ar: "إذا كنت قد اتصلت بي، لكنت قد أتيت." },
      { de: "She wouldn't have missed the flight if she had left earlier.", en: "She wouldn't have missed the flight if she had left earlier.", ar: "لم تكن لتفتقد الرحلة إذا كانت قد غادرت مبكراً." },
      { de: "If they had told me, I would have helped them.", en: "If they had told me, I would have helped them.", ar: "إذا كانوا قد أخبروني، لكنت قد ساعدتهم." },
      { de: "We would have arrived on time if the traffic hadn't been so bad.", en: "We would have arrived on time if the traffic hadn't been so bad.", ar: "لكنا وصلنا في الوقت المحدد لو لم يكن الزحام شديداً." },
      { de: "If you had asked me, I could have given you advice.", en: "If you had asked me, I could have given you advice.", ar: "إذا كنت قد سألتني، لكان بإمكاني تقديم النصيحة." },
    ],
    subRules: [
      { label: "Third conditional variations", items: ["could have: If I had trained more, I could have won.", "might have: If the weather had been better, we might have gone swimming.", "should have: If you had listened, you would have known what to do."] },
    ],
  },
  {
    id: "mixed-conditional",
    title: "Mixed Conditionals — Past & Present",
    icon: "🔄",
    color: "text-red-600",
    explanation: "Mixed conditionals combine the third conditional (past condition) with the second conditional (present result). They express how a past situation affects the present. The 'if' clause uses past perfect (like third conditional), but the main clause uses 'would' + base verb (like second conditional).",
    formation: "If + had + past participle, would + base verb",
    examples: [
      { de: "If I had studied medicine, I would be a doctor now.", en: "If I had studied medicine, I would be a doctor now.", ar: "إذا كنت قد درست الطب، لكنت طبيباً الآن." },
      { de: "If she hadn't missed the bus, she would be here now.", en: "If she hadn't missed the bus, she would be here now.", ar: "إذا لم تكن قد فاتتها الحافلة، لكانت هنا الآن." },
      { de: "They would own a house if they had saved more money.", en: "They would own a house if they had saved more money.", ar: "سيمتلكون منزلاً إذا كانوا قد وفروا المزيد من المال." },
      { de: "If I had accepted that job, I would live in London now.", en: "If I had accepted that job, I would live in London now.", ar: "إذا كنت قد قبلت تلك الوظيفة، لكنت أعيش في لندن الآن." },
    ],
    subRules: [
      { label: "Mixed conditional types", items: ["Type 1 (past condition → present result): If + had + p.p., would + base", "Example: If you had taken the medicine, you would feel better now.", "Type 2 (present condition → past result): If + past simple, would have + p.p.", "Example: If I were more careful, I wouldn't have made that mistake."] },
    ],
  },
  {
    id: "wishes-regrets",
    title: "Wishes & Regrets (I wish / If only)",
    icon: "💫",
    color: "text-indigo-600",
    explanation: "Use 'I wish' and 'If only' to express wishes about the present, past, or future. The verb form after these phrases follows the same pattern as conditionals: past simple for present wishes, past perfect for past regrets, would for future wishes. 'If only' is more emphatic than 'I wish'.",
    formation: "I wish / If only + past tense (present wish) / past perfect (past regret)",
    examples: [
      { de: "I wish I lived closer to the beach.", en: "I wish I lived closer to the beach. (present — but I live far)", ar: "أتمنى لو أسكن بالقرب من الشاطئ." },
      { de: "I wish I had studied harder for the exam.", en: "I wish I had studied harder for the exam. (past — but I didn't)", ar: "أتمنى لو كنت قد درست بجد أكثر للامتحان." },
      { de: "If only I could speak English fluently!", en: "If only I could speak English fluently! (present wish)", ar: "ليتني أستطيع التحدث بالإنجليزية بطلاقة!" },
      { de: "If only you had told me earlier.", en: "If only you had told me earlier. (regret about the past)", ar: "ليتك أخبرتني مبكراً." },
      { de: "I wish you would stop smoking.", en: "I wish you would stop smoking. (future wish — wanting change)", ar: "أتمنى أن تتوقف عن التدخين." },
      { de: "I wish I were taller.", en: "I wish I were taller. (present wish — can't change)", ar: "أتمنى لو أطول." },
    ],
    subRules: [
      { label: "'I wish' + different tenses", items: ["wish + past simple → present wish: I wish I knew the answer. (I don't know it now)", "wish + past perfect → past regret: I wish I had called you. (I didn't call)", "wish + would → future wish/complaint: I wish it would stop raining. (wanting change)", "wish + could → ability wish: I wish I could fly. (can't)"] },
    ],
  },
  {
    id: "polite-requests",
    title: "Polite Requests with Would, Could, & May",
    icon: "🎩",
    color: "text-rose-600",
    explanation: "English uses 'would', 'could', 'may', and 'might' to soften requests and make them more polite. These modal verbs in conditional form are much more polite than direct imperatives. 'Could' is the most common for requests; 'may' is the most formal.",
    formation: "Could/Would/May + subject + base verb?  |  I would like...",
    examples: [
      { de: "Could you please help me with this?", en: "Could you please help me with this?", ar: "هل يمكنك مساعدتي في هذا من فضلك؟" },
      { de: "Would you mind opening the window?", en: "Would you mind opening the window?", ar: "هل تمانع في فتح النافذة؟" },
      { de: "I would like a cup of tea, please.", en: "I would like a cup of tea, please.", ar: "أود كوباً من الشاي، من فضلك." },
      { de: "May I use your phone?", en: "May I use your phone?", ar: "هل يمكنني استخدام هاتفك؟" },
      { de: "Would you be able to attend the meeting?", en: "Would you be able to attend the meeting?", ar: "هل ستتمكن من حضور الاجتماع؟" },
      { de: "Could I have the bill, please?", en: "Could I have the bill, please?", ar: "هل يمكنني الحصول على الفاتورة، من فضلك؟" },
    ],
    subRules: [
      { label: "Politeness levels", items: ["Imperative: Open the window! — too direct, rude", "Please + imperative: Please open the window. — slightly better", "Can you...?: Can you open the window? — informal, neutral", "Could you...?: Could you open the window? — polite (most common)", "Would you mind...?: Would you mind opening the window? — very polite", "May I...?: May I open the window? — formal, polite"] },
    ],
  },
];

export const CONDITIONAL_ENGLISH = [
  { de: "If I had time, I would travel", en: "Second conditional — unreal present", ar: "إذا كان لدي وقت، لسافرت", note: "Type 2", noteAr: "النوع الثاني" },
  { de: "If I were you, I would...", en: "Advice — second conditional", ar: "لو كنت مكانك، لـ...", note: "Advice", noteAr: "نصيحة" },
  { de: "If I had studied, I would have passed", en: "Third conditional — unreal past", ar: "إذا كنت قد درست، لكنت قد نجحت", note: "Type 3", noteAr: "النوع الثالث" },
  { de: "I wish I had more money", en: "Present wish", ar: "أتمنى لو كان لدي المزيد من المال", note: "Wish (present)", noteAr: "تمنٍ (حاضر)" },
  { de: "I wish I had called you", en: "Past regret", ar: "أتمنى لو كنت اتصلت بك", note: "Regret (past)", noteAr: "ندم (ماض)" },
  { de: "Could you help me?", en: "Polite request", ar: "هل يمكنك مساعدتي؟", note: "Polite", noteAr: "مهذب" },
];
