export type PastPerfectRule = {
  id: string;
  title: string;
  explanation: string;
  formula: string;
  examples: { english: string; arabic: string }[];
};

export type Exercise = {
  sentence: string;
  correctForm: string;
  hint: string;
};

export const PAST_PERFECT_RULES: PastPerfectRule[] = [
  {
    id: "what-is-past-perfect",
    title: "What is the Past Perfect?",
    explanation:
      "The Past Perfect expresses an action that was completed BEFORE another past action. It is often called 'the past before the past'. It helps clarify the sequence of events in storytelling and is commonly used with conjunctions like 'after', 'before', 'when', 'by the time', and 'because'.",
    formula: "Subject + had + past participle (+ object/rest)",
    examples: [
      { english: "I had already eaten when they arrived.", arabic: "كنت قد أكلت بالفعل عندما وصلوا." },
      { english: "She had finished her homework before she went out.", arabic: "كانت قد أنهت واجبها المنزلي قبل أن تخرج." },
      { english: "They had never seen the ocean until they visited California.", arabic: "لم يكونوا قد رأوا المحيط من قبل حتى زاروا كاليفورنيا." },
      { english: "He had left the office by the time I called him.", arabic: "كان قد غادر المكتب بحلول الوقت الذي اتصلت به." },
    ],
  },
  {
    id: "formation",
    title: "Formation of the Past Perfect",
    explanation:
      "The Past Perfect is formed with 'had' (the past tense of 'have') + the past participle of the main verb. Regular past participles end in -ed. Irregular participles must be memorized (e.g., eaten, written, gone, seen, taken). The contraction 'd (I'd, you'd, he'd, etc.) is common in spoken English. Negation uses 'had not' or 'hadn't'.",
    formula: "Subject + had (hadn't / 'd) + past participle (V3) + complement",
    examples: [
      { english: "I had booked the tickets before the prices went up.", arabic: "كنت قد حجزت التذاكر قبل أن ترتفع الأسعار." },
      { english: "She hadn't finished the report when the boss asked for it.", arabic: "لم تكن قد أنهت التقرير عندما طلبه المدير." },
      { english: "We had already seen that movie twice.", arabic: "كنا قد شاهدنا ذلك الفيلم مرتين بالفعل." },
    ],
  },
  {
    id: "past-before-past",
    title: "Past Before Past — Sequencing Events",
    explanation:
      "The Past Perfect establishes which of two past actions happened FIRST. It makes the timeline clear: Past Perfect (earlier action) → Simple Past (later action). This is essential for storytelling and clear communication.",
    formula: "Past Perfect (earlier action) + Simple Past (later action)",
    examples: [
      { english: "After I had brushed my teeth, I went to bed.", arabic: "بعد أن فرشت أسناني، ذهبت إلى السرير." },
      { english: "She had just sat down when the phone rang.", arabic: "كانت قد جلست للتو عندما رن الهاتف." },
      { english: "They had been married for ten years before they had children.", arabic: "كانا متزوجين لمدة عشر سنوات قبل أن ينجبا أطفالاً." },
      { english: "By the time we arrived, the concert had already started.", arabic: "بحلول وقت وصولنا، كانت الحفلة قد بدأت بالفعل." },
    ],
  },
  {
    id: "reported-speech",
    title: "Past Perfect in Reported Speech",
    explanation:
      "When reporting what someone said in the past, the Present Perfect or Simple Past in the original statement often shifts back to the Past Perfect. This is called 'backshift' and is a key part of indirect/reported speech.",
    formula: "Reported verb (said/told/asked) + (that) + subject + had + past participle",
    examples: [
      { english: "He said that he had lost his wallet.", arabic: "قال إنه كان قد فقد محفظته." },
      { english: "She told me she had never been to Paris before.", arabic: "أخبرتني أنها لم تكن قد زارت باريس من قبل." },
      { english: "They claimed that they had finished the work.", arabic: "ادعوا أنهم كانوا قد أنهوا العمل." },
      { english: "He explained that he had missed the bus.", arabic: "شرح أنه كان قد فاته الحافلة." },
    ],
  },
  {
    id: "third-conditional",
    title: "Third Conditional (Past Unreal)",
    explanation:
      "The Past Perfect is used in the IF-clause of the Third Conditional to express an unreal/hypothetical situation in the past. The result clause uses 'would have' + past participle. This describes something that did NOT happen.",
    formula: "If + subject + had + past participle, subject + would have + past participle",
    examples: [
      { english: "If I had studied harder, I would have passed the exam.", arabic: "لو كنت قد درست بجدية أكبر، لكانت نجحت في الامتحان." },
      { english: "If she had left earlier, she wouldn't have missed the flight.", arabic: "لو كانت قد غادرت مبكراً، لما فاتتها الرحلة." },
      { english: "They would have won the match if they had practiced more.", arabic: "كانوا سيفوزون بالمباراة لو كانوا قد تدربوا أكثر." },
      { english: "If we had known about the traffic, we would have taken a different route.", arabic: "لو كنا قد عرفنا عن الازدحام المروري، لكنا اتخذنا طريقاً مختلفاً." },
    ],
  },
  {
    id: "past-perfect-continuous",
    title: "Past Perfect Continuous (had been + -ing)",
    explanation:
      "The Past Perfect Continuous emphasizes the DURATION of an action that was in progress before another past event. It is formed with 'had been' + present participle (-ing). It often answers 'how long' or focuses on the ongoing nature of the earlier action.",
    formula: "Subject + had been + present participle (-ing) + (for/since + duration)",
    examples: [
      { english: "They had been waiting for an hour when the bus finally arrived.", arabic: "كانوا ينتظرون لمدة ساعة عندما وصلت الحافلة أخيراً." },
      { english: "She had been working at the company for five years before she got promoted.", arabic: "كانت تعمل في الشركة لمدة خمس سنوات قبل أن تُرَقَّى." },
      { english: "He was tired because he had been running.", arabic: "كان متعباً لأنه كان يركض." },
      { english: "The ground was wet. It had been raining all night.", arabic: "كانت الأرض مبتلة. كانت السماء تمطر طوال الليل." },
    ],
  },
];

export const EXERCISES: Exercise[] = [
  {
    sentence: "When I arrived at the party, everyone already _____ (leave).",
    correctForm: "had already left",
    hint: "Think about the sequence: leaving happened before arriving.",
  },
  {
    sentence: "She _____ (never/be) to London before her trip last year.",
    correctForm: "had never been",
    hint: "This experience was completed before a past time.",
  },
  {
    sentence: "They _____ (finish) dinner by the time we got there.",
    correctForm: "had finished",
    hint: "Finishing dinner happened before 'we got there'.",
  },
  {
    sentence: "I _____ (not/eat) anything since breakfast, so I was very hungry.",
    correctForm: "hadn't eaten",
    hint: "The action of not eating continued until a past moment.",
  },
  {
    sentence: "If I _____ (know) about the meeting, I would have attended.",
    correctForm: "had known",
    hint: "This is a third conditional — unreal past situation.",
  },
  {
    sentence: "He _____ (study) for three hours before he took a break.",
    correctForm: "had been studying",
    hint: "Focus on the duration of the action before another past action.",
  },
  {
    sentence: "She said she _____ (already/buy) the tickets.",
    correctForm: "had already bought",
    hint: "Reported speech often requires backshift to past perfect.",
  },
  {
    sentence: "The children _____ (play) outside before it started raining.",
    correctForm: "had been playing",
    hint: "An ongoing past action that was interrupted by another event.",
  },
  {
    sentence: "We _____ (not/meet) each other before the conference last year.",
    correctForm: "had not met",
    hint: "This action never happened before a specific past time.",
  },
  {
    sentence: "By the time the police arrived, the thief _____ (escape).",
    correctForm: "had escaped",
    hint: "Escaping happened before the arrival of the police.",
  },
];
