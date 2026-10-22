export type IndirekteRedeRule = {
  id: string;
  title: string;
  icon: string;
  color: string;
  explanation: string;
  formation: string;
  examples: { de: string; en: string; ar: string }[];
  subRules?: { label: string; items: string[] }[];
};

export const INDIREKTE_REDE_RULES: IndirekteRedeRule[] = [
  {
    id: "basics",
    title: "Basics of Reported Speech",
    icon: "💬",
    color: "text-blue-600",
    explanation: "Reported speech (indirect speech) is used to report what someone said without quoting them directly. The main verb typically shifts back one tense (backshift). Pronouns, time, and place references also change to reflect the new perspective. 'That' is optional in English.",
    formation: "Reporting verb + (that) + subject + shifted tense clause",
    examples: [
      { de: 'Direct: He said, "I am tired."', en: 'Direct: He said, "I am tired."', ar: 'مباشر: قال: "أنا متعب."' },
      { de: 'Reported: He said (that) he was tired.', en: 'Reported: He said (that) he was tired.', ar: 'غير مباشر: قال إنه متعب.' },
      { de: 'Direct: She said, "I work in Cairo."', en: 'Direct: She said, "I work in Cairo."', ar: 'مباشر: قالت: "أعمل في القاهرة."' },
      { de: 'Reported: She said (that) she worked in Cairo.', en: 'Reported: She said (that) she worked in Cairo.', ar: 'غير مباشر: قالت إنها تعمل في القاهرة.' },
      { de: 'Direct: "I will call you," he said.', en: 'Direct: "I will call you," he said.', ar: 'مباشر: "ساتصل بك"، قال.' },
      { de: 'Reported: He said (that) he would call me.', en: 'Reported: He said (that) he would call me.', ar: 'غير مباشر: قال إنه سيتصل بي.' },
    ],
    subRules: [
      { label: "Key changes in reported speech", items: ["Pronoun shift: I → he/she, you → I/me, we → they", "Time shift: now → then, today → that day, tomorrow → the next day, yesterday → the day before", "Place shift: here → there", "Verb shift (backshift): present → past, past → past perfect, will → would"] },
    ],
  },
  {
    id: "tense-backshift",
    title: "Tense Backshift (Sequence of Tenses)",
    icon: "⏰",
    color: "text-emerald-600",
    explanation: "When the reporting verb is in the PAST (said, told, asked), the tense in the reported clause shifts BACK by one tense. This is called 'backshift'. If the reporting verb is in the PRESENT (says, tells), no backshift is needed — the tense stays the same.",
    formation: "Reporting verb (past) + shifted tense | Reporting verb (present) + original tense",
    examples: [
      { de: 'Direct: "I like coffee." → He said he liked coffee. (present → past)', en: '"I like coffee." → He said he liked coffee.', ar: '"أحب القهوة." → قال إنه يحب القهوة.' },
      { de: 'Direct: "I am working." → She said she was working. (present cont. → past cont.)', en: '"I am working." → She said she was working.', ar: '"أنا أعمل." → قالت إنها تعمل.' },
      { de: 'Direct: "I saw him." → He said he had seen him. (past → past perfect)', en: '"I saw him." → He said he had seen him.', ar: '"رأيته." → قال إنه قد رآه.' },
      { de: 'Direct: "I have finished." → She said she had finished. (present perfect → past perfect)', en: '"I have finished." → She said she had finished.', ar: '"لقد انتهيت." → قالت إنها قد انتهت.' },
      { de: 'Direct: "I will help." → He said he would help. (will → would)', en: '"I will help." → He said he would help.', ar: '"سأساعد." → قال إنه سيساعد.' },
      { de: 'Direct: "I can swim." → She said she could swim. (can → could)', en: '"I can swim." → She said she could swim.', ar: '"أستطيع السباحة." → قالت إنها تستطيع السباحة.' },
    ],
    subRules: [
      { label: "Backshift rules table", items: ["present simple → past simple: 'I eat' → said he ate", "present continuous → past continuous: 'I am eating' → said he was eating", "present perfect → past perfect: 'I have eaten' → said he had eaten", "past simple → past perfect: 'I ate' → said he had eaten (optional if time is clear)", "will → would: 'I will eat' → said he would eat", "can → could: 'I can eat' → said he could eat", "may → might: 'I may eat' → said he might eat", "must → had to: 'I must eat' → said he had to eat"] },
      { label: "No backshift needed when", items: ["Reporting verb is present tense: He says he is tired. (correct, no change)", "Reporting a general truth: She said that the earth is round. (still present!)", "Reporting something still true: He said he lives in Cairo. (still true now — optional to backshift)"] },
    ],
  },
  {
    id: "questions",
    title: "Reporting Questions",
    icon: "❓",
    color: "text-purple-600",
    explanation: "When reporting questions, the word order changes from question order (verb + subject) to statement order (subject + verb). Yes/no questions use 'if' or 'whether'. WH-questions keep the question word. Do not use 'do/does/did' in reported questions.",
    formation: "asked + if/whether (yes/no) OR asked + question word (WH) + subject + verb",
    examples: [
      { de: 'Direct: "Are you coming?" → He asked if I was coming.', en: 'Direct: "Are you coming?" → He asked if I was coming.', ar: 'مباشر: "هل ستأتي؟" → سأل إن كنت سآتي.' },
      { de: 'Direct: "Do you like tea?" → She asked if I liked tea.', en: 'Direct: "Do you like tea?" → She asked if I liked tea.', ar: 'مباشر: "هل تحب الشاي؟" → سألت إن كنت أحب الشاي.' },
      { de: 'Direct: "Where do you live?" → He asked where I lived.', en: 'Direct: "Where do you live?" → He asked where I lived.', ar: 'مباشر: "أين تسكن؟" → سأل أين أسكن.' },
      { de: 'Direct: "What time is it?" → She asked what time it was.', en: 'Direct: "What time is it?" → She asked what time it was.', ar: 'مباشر: "كم الساعة؟" → سألت كم الساعة.' },
      { de: 'Direct: "Did you see him?" → He asked if I had seen him.', en: 'Direct: "Did you see him?" → He asked if I had seen him.', ar: 'مباشر: "هل رأيته؟" → سأل إن كنت قد رأيته.' },
      { de: 'Direct: "Why are you late?" → She asked why I was late.', en: 'Direct: "Why are you late?" → She asked why I was late.', ar: 'مباشر: "لماذا أنت متأخر؟" → سألت لماذا أنا متأخر.' },
    ],
    subRules: [
      { label: "Question reporting patterns", items: ["Yes/No questions: if/whether — He asked if I was ready.", "WH questions: keep the question word — She asked where I worked.", "No 'do/does/did': He asked what I liked (NOT: what did I like)", "No question mark in reported questions — it's a statement.", "whether = more formal than if: He inquired whether I was available."] },
    ],
  },
  {
    id: "commands",
    title: "Reporting Commands & Requests",
    icon: "📢",
    color: "text-amber-600",
    explanation: "Commands and requests are reported using 'tell/ask + object + to-infinitive'. 'Tell' is for commands/instructions; 'ask' is for polite requests. For negative commands, use 'not to' + verb. Offers and suggestions use 'offer'/'suggest' + gerund or 'that' clause.",
    formation: "told/asked + person + to + infinitive  |  told + person + not to + infinitive",
    examples: [
      { de: 'Direct: "Sit down." → He told me to sit down.', en: 'Direct: "Sit down." → He told me to sit down.', ar: 'مباشر: "اجلس." → قال لي أن أجلس.' },
      { de: 'Direct: "Please help me." → She asked me to help her.', en: 'Direct: "Please help me." → She asked me to help her.', ar: 'مباشر: "من فضلك ساعدني." → طلبت مني مساعدتها.' },
      { de: 'Direct: "Don\'t be late." → He told me not to be late.', en: 'Direct: "Don\'t be late." → He told me not to be late.', ar: 'مباشر: "لا تتأخر." → قال لي ألا أتأخر.' },
      { de: 'Direct: "Let\'s go!" → She suggested going / She suggested that we go.', en: 'Direct: "Let\'s go!" → She suggested going.', ar: 'مباشر: "لنذهب!" → اقترحت أن نذهب.' },
      { de: 'Direct: "Would you like some tea?" → He offered me some tea.', en: 'Direct: "Would you like some tea?" → He offered me some tea.', ar: 'مباشر: "هل ترغب في بعض الشاي؟" → عرض عليّ بعض الشاي.' },
      { de: 'Direct: "You should see a doctor." → He advised me to see a doctor.', en: 'Direct: "You should see a doctor." → He advised me to see a doctor.', ar: 'مباشر: "يجب أن ترى طبيباً." → نصحني برؤية طبيب.' },
    ],
    subRules: [
      { label: "Reporting verbs for commands/requests", items: ["tell + person + to: He told me to wait.", "ask + person + to: She asked him to leave.", "advise + person + to: He advised us to study.", "order + person + to: The officer ordered them to stop.", "warn + person + not to: She warned me not to go there.", "invite + person + to: They invited us to join them.", "encourage + person + to: He encouraged me to apply for the job."] },
    ],
  },
  {
    id: "reporting-verbs",
    title: "Common Reporting Verbs",
    icon: "🗣️",
    color: "text-indigo-600",
    explanation: "Different reporting verbs express different attitudes. 'Say' and 'tell' are neutral. 'Claim' suggests doubt. 'Admit' suggests reluctance. 'Explain' adds detail. Choose the right verb to convey the speaker's attitude. Each verb follows a specific grammatical pattern.",
    formation: "Various patterns: verb + that-clause, verb + to-infinitive, verb + gerund, verb + person + to-infinitive",
    examples: [
      { de: "He said (that) he was tired.", en: "He said (that) he was tired. (neutral — say + that)", ar: "قال إنه متعب." },
      { de: "She told me (that) she was leaving.", en: "She told me (that) she was leaving. (tell + person + that)", ar: "أخبرتني أنها ستغادر." },
      { de: "He admitted making a mistake.", en: "He admitted making a mistake. (admit + gerund)", ar: "اعترف بأنه ارتكب خطأ." },
      { de: "She denied stealing the money.", en: "She denied stealing the money. (deny + gerund)", ar: "أنكرت سرقة المال." },
      { de: "He promised to call me.", en: "He promised to call me. (promise + to-infinitive)", ar: "وعد بالاتصال بي." },
      { de: "She apologized for being late.", en: "She apologized for being late. (apologize + for + gerund)", ar: "اعتذرت عن التأخير." },
    ],
    subRules: [
      { label: "Reporting verb patterns", items: ["Verb + that-clause: say, claim, admit, explain, mention, complain, suggest", "Verb + person + that-clause: tell, inform, remind, assure, convince", "Verb + to-infinitive: agree, refuse, offer, promise, threaten, demand", "Verb + person + to-infinitive: ask, tell, advise, warn, invite, encourage, order", "Verb + gerund: admit, deny, suggest, recommend, mention", "Verb + preposition + gerund: apologize for, insist on, dream of, complain about"] },
    ],
  },
];

export type TenseBackshiftRow = {
  directTense: string;
  reportedTense: string;
  directExample: string;
  reportedExample: string;
};

export const TENSE_BACKSHIFT_TABLE: TenseBackshiftRow[] = [
  { directTense: "Present Simple", reportedTense: "Past Simple", directExample: '"I live here."', reportedExample: "He said he lived here." },
  { directTense: "Present Continuous", reportedTense: "Past Continuous", directExample: '"I am working."', reportedExample: "She said she was working." },
  { directTense: "Past Simple", reportedTense: "Past Perfect", directExample: '"I saw the film."', reportedExample: "He said he had seen the film." },
  { directTense: "Present Perfect", reportedTense: "Past Perfect", directExample: '"I have finished."', reportedExample: "She said she had finished." },
  { directTense: "will (Future)", reportedTense: "would", directExample: '"I will help you."', reportedExample: "He said he would help me." },
  { directTense: "can (Modal)", reportedTense: "could", directExample: '"I can swim."', reportedExample: "She said she could swim." },
  { directTense: "must / have to", reportedTense: "had to", directExample: '"I must go now."', reportedExample: "He said he had to go then." },
];

export const KONJUNKTIV_I_TABLE = TENSE_BACKSHIFT_TABLE;

export const DIREKT_INDIREKT_PAIRS = [
  { direkt: 'He said: "I am hungry."', indirekt: "He said (that) he was hungry." },
  { direkt: 'She asked: "Are you coming?"', indirekt: "She asked if I was coming." },
  { direkt: 'He said: "I will call you."', indirekt: "He said (that) he would call me." },
  { direkt: 'The boss said: "You must work."', indirekt: "The boss said (that) we had to work." },
  { direkt: 'She said: "I have finished."', indirekt: "She said (that) she had finished." },
  { direkt: 'He asked: "Where do you live?"', indirekt: "He asked where I lived." },
];
