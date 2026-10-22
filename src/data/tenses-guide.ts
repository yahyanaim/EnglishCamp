export type TenseInfo = {
  id: string;
  tense: string;
  icon: string;
  color: string;
  explanation: string;
  explanationAr?: string;
  formula: string;
  whenToUse: string[];
  whenToUseAr?: string[];
  examples: { en: string; ar?: string }[];
  signalWords: string[];
  timelineLabel: string;
};

export const TENSES_GUIDE: TenseInfo[] = [
  {
    id: "present-simple",
    tense: "Present Simple",
    icon: "🔄",
    color: "text-emerald-600",
    explanation:
      "Used for habits, general truths, routines, and permanent situations. It describes actions that happen regularly or facts that are always true.",
    explanationAr:
      "يُستخدم للعادات، والحقائق العامة، والروتين، والمواقف الدائمة. يصف الأفعال التي تحدث بانتظام أو الحقائق التي تكون صحيحة دائماً.",
    formula: "S + V1 (s/es)",
    whenToUse: [
      "Habits and routines: 'I wake up at 7 every day.'",
      "General truths and facts: 'The sun rises in the east.'",
      "Scheduled events (timetables): 'The train leaves at 6 PM.'",
      "Feelings and states: 'She likes chocolate.'",
    ],
    whenToUseAr: [
      "العادات والروتين: 'أستيقظ في الساعة 7 كل يوم.'",
      "الحقائق العامة: 'الشمس تشرق من الشرق.'",
      "الأحداث المجدولة (الجداول): 'القطار يغادر في الساعة 6 مساءً.'",
      "المشاعر والحالات: 'هي تحب الشوكولاتة.'",
    ],
    examples: [
      { en: "She reads a book every evening.", ar: "هي تقرأ كتاباً كل مساء." },
      { en: "Water boils at 100°C.", ar: "الماء يغلي عند 100 درجة مئوية." },
      { en: "They live in London.", ar: "هم يعيشون في لندن." },
      { en: "He doesn't eat meat.", ar: "هو لا يأكل اللحم." },
    ],
    signalWords: ["always", "usually", "often", "sometimes", "never", "every day", "once a week", "on Sundays"],
    timelineLabel: "present → present (general)",
  },
  {
    id: "present-continuous",
    tense: "Present Continuous",
    icon: "⚡",
    color: "text-blue-600",
    explanation:
      "Used for actions happening right now, temporary situations, and future arrangements. It emphasises the ongoing nature of an action.",
    explanationAr:
      "يُستخدم للأفعال التي تحدث الآن، والمواقف المؤقتة، والترتيبات المستقبلية. يؤكد على الطبيعة المستمرة للفعل.",
    formula: "S + am/is/are + V-ing",
    whenToUse: [
      "Actions happening now: 'I am reading a book right now.'",
      "Temporary situations: 'She is staying with her friend this week.'",
      "Future arrangements: 'We are meeting tomorrow at 5.'",
      "Trends and changing situations: 'The climate is getting warmer.'",
    ],
    whenToUseAr: [
      "أفعال تحدث الآن: 'أنا أقرأ كتاباً الآن.'",
      "مواقف مؤقتة: 'هي تقيم مع صديقتها هذا الأسبوع.'",
      "ترتيبات مستقبلية: 'نحن نلتقي غداً في الساعة 5.'",
      "اتجاهات ومواقف متغيرة: 'المناخ يصبح أكثر دفئاً.'",
    ],
    examples: [
      { en: "I am working on a project right now.", ar: "أنا أعمل على مشروع الآن." },
      { en: "She is studying for her exams.", ar: "هي تدرس لامتحاناتها." },
      { en: "They are building a new house.", ar: "هم يبنون منزلاً جديداً." },
      { en: "He is always losing his keys!", ar: "هو دائماً يفقد مفاتيحه!" },
    ],
    signalWords: ["now", "right now", "at the moment", "currently", "today", "this week", "look!", "listen!"],
    timelineLabel: "present → present (ongoing)",
  },
  {
    id: "present-perfect-simple",
    tense: "Present Perfect Simple",
    icon: "⏳",
    color: "text-violet-600",
    explanation:
      "Connects the past to the present. Used for past actions with present relevance, life experiences, and actions that started in the past and continue.",
    explanationAr:
      "يربط الماضي بالحاضر. يُستخدم للأفعال الماضية ذات الصلة بالحاضر، والتجارب الحياتية، والأفعال التي بدأت في الماضي وما زالت مستمرة.",
    formula: "S + have/has + V3 (p.p.)",
    whenToUse: [
      "Past action with present result: 'I have lost my keys.' (I still can't find them)",
      "Life experiences: 'She has visited Paris three times.'",
      "Unfinished past (since/for): 'He has lived here since 2010.'",
      "News and recent events: 'The president has resigned.'",
    ],
    whenToUseAr: [
      "فعل ماضي بنتيجة حالية: 'لقد فقدت مفاتيحي.' (لا أزال لا أجدها)",
      "تجارب حياتية: 'هي زارت باريس ثلاث مرات.'",
      "ماضٍ غير منته (since/for): 'هو يعيش هنا منذ 2010.'",
      "أخبار وأحداث حديثة: 'لقد استقال الرئيس.'",
    ],
    examples: [
      { en: "I have finished my homework.", ar: "لقد أنهيت واجبي المنزلي." },
      { en: "She has never been to Japan.", ar: "هي لم تذهب أبداً إلى اليابان." },
      { en: "They have already eaten lunch.", ar: "هم قد تناولوا الغداء بالفعل." },
      { en: "Have you ever seen that movie?", ar: "هل شاهدت هذا الفيلم من قبل؟" },
    ],
    signalWords: ["already", "yet", "just", "ever", "never", "since", "for", "so far", "recently", "up to now"],
    timelineLabel: "past → present",
  },
  {
    id: "present-perfect-continuous",
    tense: "Present Perfect Continuous",
    icon: "🌊",
    color: "text-amber-600",
    explanation:
      "Focuses on the duration of an action that started in the past and is still continuing or has recently stopped with a present result.",
    explanationAr:
      "يركز على مدة فعل بدأ في الماضي وما زال مستمراً أو توقف مؤخراً مع نتيجة حالية.",
    formula: "S + have/has + been + V-ing",
    whenToUse: [
      "Action that started in the past and continues: 'I have been studying for three hours.'",
      "Action that recently stopped with visible result: 'She is tired because she has been running.'",
      "Emphasising duration: 'They have been waiting since 2 PM.'",
      "Temporary situations over time: 'He has been working on this project lately.'",
    ],
    whenToUseAr: [
      "فعل بدأ في الماضي وما زال مستمراً: 'أنا أدرس منذ ثلاث ساعات.'",
      "فعل توقف مؤخراً بنتيجة واضحة: 'هي متعبة لأنها كانت تركض.'",
      "التأكيد على المدة: 'هم ينتظرون منذ الساعة 2.'",
      "مواقف مؤقتة على مدى الزمن: 'هو يعمل على هذا المشروع مؤخراً.'",
    ],
    examples: [
      { en: "I have been reading this book all day.", ar: "أنا أقرأ هذا الكتاب طوال اليوم." },
      { en: "She has been working here since January.", ar: "هي تعمل هنا منذ يناير." },
      { en: "They have been travelling for six months.", ar: "هم يسافرون منذ ستة أشهر." },
      { en: "How long have you been learning English?", ar: "منذ متى وأنت تتعلم الإنجليزية؟" },
    ],
    signalWords: ["for", "since", "all day", "lately", "recently", "how long", "the whole week"],
    timelineLabel: "past → present (ongoing)",
  },
  {
    id: "past-simple",
    tense: "Past Simple",
    icon: "⬅️",
    color: "text-rose-600",
    explanation:
      "Used for completed actions in the past at a specific time. The main tense for narrating past events in sequence.",
    explanationAr:
      "يُستخدم للأفعال المكتملة في الماضي في وقت محدد. الزمن الرئيسي لسرد الأحداث الماضية بالتسلسل.",
    formula: "S + V2 (ed/irregular)",
    whenToUse: [
      "Completed action at a specific time: 'I visited Paris last year.'",
      "Sequence of past events: 'He woke up, ate breakfast, and left.'",
      "Past habits: 'When I was young, I played football every day.'",
      "Finished time periods: 'She lived in Rome for five years.' (she no longer lives there)",
    ],
    whenToUseAr: [
      "فعل مكتمل في وقت محدد: 'زرت باريس العام الماضي.'",
      "تسلسل أحداث ماضية: 'استيقظ، تناول الفطور، وغادر.'",
      "عادات ماضية: 'عندما كنت صغيراً، كنت ألعب كرة القدم كل يوم.'",
      "فترات زمنية منتهية: 'عاشت في روما لمدة خمس سنوات.' (لم تعد تعيش هناك)",
    ],
    examples: [
      { en: "I watched a great movie last night.", ar: "شاهدت فيلماً رائعاً الليلة الماضية." },
      { en: "She went to the supermarket yesterday.", ar: "ذهبت إلى السوبرماركت أمس." },
      { en: "They arrived at 8 PM.", ar: "وصلوا في الساعة 8 مساءً." },
      { en: "He didn't finish his homework.", ar: "هو لم ينهِ واجبه المنزلي." },
    ],
    signalWords: ["yesterday", "last night", "last week", "in 2010", "ago", "then", "when", "once"],
    timelineLabel: "past ← past → (completed)",
  },
  {
    id: "past-continuous",
    tense: "Past Continuous",
    icon: "🌅",
    color: "text-cyan-600",
    explanation:
      "Used for actions in progress at a specific time in the past. Often interrupted by another action or setting the scene in stories.",
    explanationAr:
      "يُستخدم للأفعال الجارية في وقت محدد في الماضي. غالباً ما ينقطع بفعل آخر أو لوصف الخلفية في القصص.",
    formula: "S + was/were + V-ing",
    whenToUse: [
      "Action in progress at a specific past time: 'I was watching TV at 8 PM.'",
      "Interrupted action: 'She was cooking when the phone rang.'",
      "Parallel actions in the past: 'He was reading while she was writing.'",
      "Setting the scene in stories: 'The sun was shining, birds were singing.'",
    ],
    whenToUseAr: [
      "فعل جارٍ في وقت محدد في الماضي: 'كنت أشاهد التلفاز في الساعة 8 مساءً.'",
      "فعل منقطع: 'كانت تطبخ عندما رن الهاتف.'",
      "أفعال متوازية في الماضي: 'كان يقرأ بينما كانت تكتب.'",
      "وصف الخلفية في القصص: 'كانت الشمس مشرقة، والطيور تغرد.'",
    ],
    examples: [
      { en: "I was walking home when it started to rain.", ar: "كنت أمشي إلى المنزل عندما بدأت السماء تمطر." },
      { en: "She was studying all evening.", ar: "كانت تدرس طوال المساء." },
      { en: "They were playing football at 5 PM.", ar: "كانوا يلعبون كرة القدم في الساعة 5 مساءً." },
      { en: "What were you doing when I called?", ar: "ماذا كنت تفعل عندما اتصلت؟" },
    ],
    signalWords: ["while", "when", "as", "at that time", "all evening", "at 8 PM yesterday"],
    timelineLabel: "past → past (ongoing)",
  },
  {
    id: "past-perfect",
    tense: "Past Perfect",
    icon: "⏪",
    color: "text-orange-600",
    explanation:
      "Used to show that one past action happened before another past action. It clarifies the order of past events when the sequence is not obvious.",
    explanationAr:
      "يُستخدم لإظهار أن حدثاً ماضياً وقع قبل حدث ماضٍ آخر. يوضح ترتيب الأحداث الماضية عندما لا يكون التسلسل واضحاً.",
    formula: "S + had + V3 (p.p.)",
    whenToUse: [
      "Action before another past action: 'I had eaten when she arrived.'",
      "Cause and effect in the past: 'She was tired because she had worked all day.'",
      "Wish/regret about the past: 'I wish I had studied harder.'",
      "Reported speech: 'He said he had finished his work.'",
    ],
    whenToUseAr: [
      "فعل قبل فعل ماضٍ آخر: 'كنت قد أكلت عندما وصلت.'",
      "سبب ونتيجة في الماضي: 'كانت متعبة لأنها كانت قد عملت طوال اليوم.'",
      "تمنّ/ندم على الماضي: 'أتمنى لو كنت قد درست بجدية أكبر.'",
      "الكلام المنقول: 'قال إنه كان قد أنهى عمله.'",
    ],
    examples: [
      { en: "When we arrived, the movie had already started.", ar: "عندما وصلنا، كان الفيلم قد بدأ بالفعل." },
      { en: "She had never seen snow before she moved to Canada.", ar: "لم تكن قد رأت الثلج من قبل قبل أن تنتقل إلى كندا." },
      { en: "He had lost his keys, so he couldn't enter the house.", ar: "كان قد فقد مفاتيحه، لذلك لم يستطع دخول المنزل." },
      { en: "By the time I woke up, everyone had left.", ar: "عندما استيقظت، كان الجميع قد غادروا." },
    ],
    signalWords: ["already", "just", "never", "by the time", "before", "after", "until", "when"],
    timelineLabel: "past → past (earlier)",
  },
  {
    id: "past-perfect-continuous",
    tense: "Past Perfect Continuous",
    icon: "🌀",
    color: "text-purple-600",
    explanation:
      "Used to emphasise the duration of an action that was in progress before another past event. Focuses on how long something had been happening.",
    explanationAr:
      "يُستخدم للتأكيد على مدة فعل كان جارياً قبل حدث ماضٍ آخر. يركز على مدة استمرار شيء ما.",
    formula: "S + had + been + V-ing",
    whenToUse: [
      "Duration before a past event: 'They had been waiting for hours when the bus finally arrived.'",
      "Cause/result in the past: 'He was exhausted because he had been working all night.'",
      "Continuous action before past interruption: 'She had been teaching for 20 years before she retired.'",
      "Visible past result: 'His eyes were red because he had been crying.'",
    ],
    whenToUseAr: [
      "مدة قبل حدث ماضٍ: 'كانوا ينتظرون لساعات عندما وصلت الحافلة أخيراً.'",
      "سبب/نتيجة في الماضي: 'كان مرهقاً لأنه كان يعمل طوال الليل.'",
      "فعل مستمر قبل انقطاع ماضٍ: 'كانت تدرس لمدة 20 سنة قبل أن تتقاعد.'",
      "نتيجة ماضية واضحة: 'كانت عيناه حمراوين لأنه كان يبكي.'",
    ],
    examples: [
      { en: "I had been studying for three hours before I took a break.", ar: "كنت أدرس لمدة ثلاث ساعات قبل أن آخذ استراحة." },
      { en: "She had been waiting for 30 minutes when he finally showed up.", ar: "كانت تنتظر لمدة 30 دقيقة عندما ظهر أخيراً." },
      { en: "They had been living there for five years before they moved.", ar: "كانوا يعيشون هناك لمدة خمس سنوات قبل أن ينتقلوا." },
      { en: "How long had you been working before you changed jobs?", ar: "كم كنت تعمل قبل أن تغير وظيفتك؟" },
    ],
    signalWords: ["for", "since", "how long", "before", "until", "all day", "the whole week"],
    timelineLabel: "past → past (ongoing, earlier)",
  },
  {
    id: "future-simple-will",
    tense: "Future Simple (will)",
    icon: "🔮",
    color: "text-indigo-600",
    explanation:
      "Used for predictions, spontaneous decisions, promises, offers, and facts about the future. Expresses certainty or intention.",
    explanationAr:
      "يُستخدم للتنبؤات، والقرارات الفورية، والوعود، والعروض، والحقائق عن المستقبل. يعبر عن اليقين أو النية.",
    formula: "S + will + V1",
    whenToUse: [
      "Predictions: 'It will rain tomorrow.'",
      "Spontaneous decisions: 'I'm hungry. I'll make a sandwich.'",
      "Promises and offers: 'I'll help you with your homework.'",
      "Facts about the future: 'The concert will start at 8 PM.'",
    ],
    whenToUseAr: [
      "تنبؤات: 'ستمطر غداً.'",
      "قرارات فورية: 'أنا جائع. سأصنع شطيرة.'",
      "وعود وعروض: 'سأساعدك في واجبك المنزلي.'",
      "حقائق عن المستقبل: 'الحفلة ستبدأ في الساعة 8 مساءً.'",
    ],
    examples: [
      { en: "I think she will like the gift.", ar: "أعتقد أنها ستعجبها الهدية." },
      { en: "Don't worry, I'll call you when I arrive.", ar: "لا تقلق، سأتصل بك عندما أصل." },
      { en: "The meeting will start in five minutes.", ar: "الاجتماع سيبدأ بعد خمس دقائق." },
      { en: "I'll help you carry those bags.", ar: "سأساعدك في حمل تلك الحقائب." },
    ],
    signalWords: ["tomorrow", "next week", "soon", "later", "I think", "probably", "I'm sure", "maybe"],
    timelineLabel: "present → future",
  },
  {
    id: "future-going-to",
    tense: "Future: going to",
    icon: "🎯",
    color: "text-teal-600",
    explanation:
      "Used for planned intentions, decisions already made, and predictions based on present evidence. Emphasises preparation or certainty.",
    explanationAr:
      "يُستخدم للنوايا المخطط لها، والقرارات المتخذة بالفعل، والتنبؤات المبنية على دليل حاضر. يؤكد على التحضير أو اليقين.",
    formula: "S + am/is/are + going to + V1",
    whenToUse: [
      "Plans and intentions: 'We are going to visit Dubai next year.'",
      "Decisions already made: 'I am going to study medicine.'",
      "Predictions with evidence: 'Look at those clouds! It's going to rain.'",
      "Things about to happen: 'Watch out! You're going to drop that!'",
    ],
    whenToUseAr: [
      "خطط ونوايا: 'سنزور دبي السنة القادمة.'",
      "قرارات متخذة بالفعل: 'سأدرس الطب.'",
      "تنبؤات بدليل: 'انظر إلى تلك الغيوم! ستمطر.'",
      "أشياء على وشك الحدوث: 'انتبه! ستسقط ذلك!'",
    ],
    examples: [
      { en: "She is going to start a new job next month.", ar: "ستبدأ وظيفة جديدة الشهر القادم." },
      { en: "We are going to buy a house.", ar: "سنشتري منزلاً." },
      { en: "The sky is so dark. It's going to rain.", ar: "السماء مظلمة جداً. ستمطر." },
      { en: "I'm going to call my parents tonight.", ar: "سأتصل بوالدي الليلة." },
    ],
    signalWords: ["tomorrow", "next month", "tonight", "plan to", "intend to", "look at", "be about to"],
    timelineLabel: "present → future (planned)",
  },
  {
    id: "future-continuous",
    tense: "Future Continuous",
    icon: "📡",
    color: "text-pink-600",
    explanation:
      "Used for actions that will be in progress at a specific time in the future. Emphasises the ongoing nature of a future event.",
    explanationAr:
      "يُستخدم للأفعال التي ستكون جارية في وقت محدد في المستقبل. يؤكد على الطبيعة المستمرة لحدث مستقبلي.",
    formula: "S + will + be + V-ing",
    whenToUse: [
      "Action in progress at a future time: 'This time tomorrow, I will be flying to New York.'",
      "Future arrangements that will happen anyway: 'She'll be giving a talk at 10 AM.'",
      "Polite questions about plans: 'Will you be using the car later?'",
      "Parallel future actions: 'He'll be working while we'll be relaxing.'",
    ],
    whenToUseAr: [
      "فعل جارٍ في وقت مستقبلي: 'في هذا الوقت غداً، سأكون مسافراً بالطائرة إلى نيويورك.'",
      "ترتيبات مستقبلية ستحدث على أي حال: 'ستلقي حديثاً في الساعة 10 صباحاً.'",
      "أسئلة مهذبة عن الخطط: 'هل ستستخدم السيارة لاحقاً؟'",
      "أفعال مستقبلية متوازية: 'سيعمل بينما سنكون نستريح.'",
    ],
    examples: [
      { en: "This time next week, I'll be lying on a beach.", ar: "في هذا الوقت الأسبوع القادم، سأكون مستلقياً على شاطئ." },
      { en: "She will be waiting for us at the airport.", ar: "ستكون في انتظارنا في المطار." },
      { en: "Don't call at 8, we'll be having dinner.", ar: "لا تتصل في الساعة 8، سنكون نتناول العشاء." },
      { en: "Will you be attending the meeting tomorrow?", ar: "هل ستحضر الاجتماع غداً؟" },
    ],
    signalWords: ["this time tomorrow", "this time next week", "at 8 PM tonight", "while", "in the future"],
    timelineLabel: "future → future (ongoing)",
  },
  {
    id: "future-perfect",
    tense: "Future Perfect",
    icon: "🏁",
    color: "text-lime-600",
    explanation:
      "Used for actions that will be completed before a specific point in the future. It looks back from a future moment to see what will have finished.",
    explanationAr:
      "يُستخدم للأفعال التي ستكون قد اكتملت قبل نقطة محددة في المستقبل. ينظر من لحظة مستقبلية ليرى ما سيكون قد انتهى.",
    formula: "S + will + have + V3 (p.p.)",
    whenToUse: [
      "Completion before a future time: 'I will have finished the report by 5 PM.'",
      "Duration until a future point: 'By next year, she will have worked here for ten years.'",
      "Prediction about a finished future event: 'They will have arrived by now.'",
      "Milestones and deadlines: 'We will have built 100 houses by 2030.'",
    ],
    whenToUseAr: [
      "اكتمال قبل وقت مستقبلي: 'سأكون قد أنهيت التقرير بحلول الساعة 5.'",
      "مدة حتى نقطة مستقبلية: 'بحلول السنة القادمة، ستكون قد عملت هنا لمدة عشر سنوات.'",
      "تنبؤ عن حدث مستقبلي منتهٍ: 'سيكونون قد وصلوا بحلول الآن.'",
      "معالم ومواعيد نهائية: 'سنكون قد بنينا 100 منزل بحلول 2030.'",
    ],
    examples: [
      { en: "By the time you arrive, I will have cooked dinner.", ar: "بحلول وقت وصولك، سأكون قد طهيت العشاء." },
      { en: "She will have completed her degree by June.", ar: "ستكون قد أكملت شهادتها بحلول يونيو." },
      { en: "They will have travelled to 20 countries by 2028.", ar: "سيكونون قد سافروا إلى 20 دولة بحلول 2028." },
      { en: "Will you have finished the project before the deadline?", ar: "هل ستكون قد أنهيت المشروع قبل الموعد النهائي؟" },
    ],
    signalWords: ["by", "by the time", "by then", "before", "until", "in two years' time", "by 2030"],
    timelineLabel: "present → future (completed)",
  },
];

export const TENSE_GROUPS = [
  {
    title: "Simple Tenses",
    pattern: "focus on the action as a complete fact",
    tenses: [
      { tense: "Present Simple", formula: "S + V1 (s/es)", example: "I eat breakfast at 8 AM." },
      { tense: "Past Simple", formula: "S + V2 (ed/irregular)", example: "I ate breakfast at 8 AM yesterday." },
      { tense: "Future Simple (will)", formula: "S + will + V1", example: "I will eat breakfast at 8 AM tomorrow." },
    ],
  },
  {
    title: "Continuous Tenses",
    pattern: "focus on the duration / ongoing nature of the action",
    tenses: [
      { tense: "Present Continuous", formula: "S + am/is/are + V-ing", example: "I am eating breakfast right now." },
      { tense: "Past Continuous", formula: "S + was/were + V-ing", example: "I was eating breakfast when you called." },
      { tense: "Future Continuous", formula: "S + will + be + V-ing", example: "I will be eating breakfast at 8 AM tomorrow." },
    ],
  },
  {
    title: "Perfect Tenses",
    pattern: "focus on the completion / result of the action",
    tenses: [
      { tense: "Present Perfect", formula: "S + have/has + V3", example: "I have eaten breakfast already." },
      { tense: "Past Perfect", formula: "S + had + V3", example: "I had eaten breakfast before you arrived." },
      { tense: "Future Perfect", formula: "S + will + have + V3", example: "I will have eaten breakfast by 9 AM." },
    ],
  },
  {
    title: "Perfect Continuous Tenses",
    pattern: "focus on the duration of an action up to another point in time",
    tenses: [
      {
        tense: "Present Perfect Continuous",
        formula: "S + have/has + been + V-ing",
        example: "I have been eating breakfast for 30 minutes.",
      },
      {
        tense: "Past Perfect Continuous",
        formula: "S + had + been + V-ing",
        example: "I had been eating breakfast for 30 minutes before you arrived.",
      },
      {
        tense: "Future Perfect Continuous",
        formula: "S + will + have + been + V-ing",
        example: "By 9 AM, I will have been eating breakfast for 30 minutes.",
      },
    ],
  },
];

export const TENSE_TIMELINES = [
  { label: "present → present (general)", description: "Habits, facts, routines (Present Simple)" },
  { label: "present → present (ongoing)", description: "Right now, temporary (Present Continuous)" },
  { label: "past → present", description: "Past with present relevance (Present Perfect)" },
  { label: "past → present (ongoing)", description: "Duration from past to now (Present Perfect Continuous)" },
  { label: "past ← past → (completed)", description: "Finished past action (Past Simple)" },
  { label: "past → past (ongoing)", description: "In progress at a past time (Past Continuous)" },
  { label: "past → past (earlier)", description: "Before another past action (Past Perfect)" },
  { label: "past → past (ongoing, earlier)", description: "Duration before a past action (Past Perfect Continuous)" },
  { label: "present → future", description: "Prediction, promise, decision (Future Simple)" },
  { label: "present → future (planned)", description: "Plan, intention, evidence (going to)" },
  { label: "future → future (ongoing)", description: "In progress at a future time (Future Continuous)" },
  { label: "present → future (completed)", description: "Completed before a future time (Future Perfect)" },
];
