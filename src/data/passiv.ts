export type PassiveRule = {
  id: string;
  title: string;
  icon: string;
  color: string;
  explanation: string;
  formation: string;
  examples: { de: string; en: string; ar: string }[];
  subRules?: { label: string; items: string[] }[];
};

export const PASSIVE_RULES: PassiveRule[] = [
  {
    id: "present-passive",
    title: "Present Simple Passive",
    icon: "⚙️",
    color: "text-blue-600",
    explanation: "The passive voice shifts focus from who does the action to the action itself or who receives it. Formed with 'am/is/are' + past participle. Use 'by' to mention the agent.",
    formation: "am/is/are + past participle (+ by + agent)",
    examples: [
      { de: "The letter is written by Sarah.", en: "The letter is written by Sarah.", ar: "الرسالة تُكتب بواسطة سارة." },
      { de: "English is spoken here.", en: "English is spoken here.", ar: "الإنجليزية تُتحدث هنا." },
      { de: "The windows are cleaned every week.", en: "The windows are cleaned every week.", ar: "النوافذ تُنظف كل أسبوع." },
      { de: "Coffee is served in the morning.", en: "Coffee is served in the morning.", ar: "القهوة تُقدم في الصباح." },
      { de: "The room is tidied by the children.", en: "The room is tidied by the children.", ar: "الغرفة تُرتب بواسطة الأطفال." },
      { de: "The car is repaired by the mechanic.", en: "The car is repaired by the mechanic.", ar: "السيارة تُصلح بواسطة الميكانيكي." },
    ],
    subRules: [
      { label: "Formation", items: ["am → I: I am invited to the party.", "is → he/she/it: The door is locked at 9pm.", "are → you/we/they: The books are returned to the library."] },
      { label: "When to use the passive", items: ["Agent unknown: My phone was stolen. (I don't know who)", "Agent obvious: He was arrested. (by the police — obvious)", "Agent unimportant: The meeting has been postponed. (who postponed it doesn't matter)", "Focus on the action/recipient: The Mona Lisa was painted in 1503."] },
    ],
  },
  {
    id: "past-passive",
    title: "Past Simple Passive",
    icon: "🔵",
    color: "text-emerald-600",
    explanation: "The past simple passive describes a completed action in the past where the focus is on the action or recipient, not the doer. Formed with 'was/were' + past participle.",
    formation: "was/were + past participle (+ by + agent)",
    examples: [
      { de: "The letter was written yesterday.", en: "The letter was written yesterday.", ar: "كُتبت الرسالة أمس." },
      { de: "The windows were cleaned last week.", en: "The windows were cleaned last week.", ar: "نُظفت النوافذ الأسبوع الماضي." },
      { de: "The cake was baked by my mother.", en: "The cake was baked by my mother.", ar: "خُبزت الكعكة بواسطة والدتي." },
      { de: "The building was built in 1920.", en: "The building was built in 1920.", ar: "بُني المبنى في عام 1920." },
      { de: "The email was sent to all employees.", en: "The email was sent to all employees.", ar: "أُرسل البريد الإلكتروني لجميع الموظفين." },
      { de: "The suspects were arrested last night.", en: "The suspects were arrested last night.", ar: "أُلقي القبض على المشتبه بهم الليلة الماضية." },
    ],
    subRules: [
      { label: "Formation", items: ["was → I/he/she/it: The book was returned on time.", "were → you/we/they: The packages were delivered this morning."] },
      { label: "Active → Passive transformation", items: ["Active: Shakespeare wrote Hamlet. → Passive: Hamlet was written by Shakespeare.", "Active: The chef cooked the meal. → Passive: The meal was cooked by the chef.", "Active: Someone stole my wallet. → Passive: My wallet was stolen."] },
    ],
  },
  {
    id: "passive-tenses",
    title: "Passive in All Tenses",
    icon: "🔄",
    color: "text-purple-600",
    explanation: "Every tense in English has a passive form. The tense is shown by the auxiliary verb 'be' (conjugated), followed by the past participle. The agent is introduced with 'by'.",
    formation: "be (in required tense) + past participle",
    examples: [
      { de: "The report is being written now.", en: "The report is being written now. (present continuous passive)", ar: "التقرير يُكتب الآن." },
      { de: "The report was being written when I arrived.", en: "The report was being written when I arrived. (past continuous passive)", ar: "كان التقرير يُكتب عندما وصلت." },
      { de: "The report has been completed.", en: "The report has been completed. (present perfect passive)", ar: "تم إكمال التقرير." },
      { de: "The report had been finished before the deadline.", en: "The report had been finished before the deadline. (past perfect passive)", ar: "كان التقرير قد أُكمل قبل الموعد النهائي." },
      { de: "The report will be submitted tomorrow.", en: "The report will be submitted tomorrow. (future passive)", ar: "سيُقدم التقرير غداً." },
      { de: "The report is going to be reviewed by the manager.", en: "The report is going to be reviewed by the manager. (future passive)", ar: "سيتم مراجعة التقرير بواسطة المدير." },
    ],
    subRules: [
      { label: "Passive across tenses", items: ["Simple present: is/are + p.p. — The door is locked every night.", "Present continuous: is/are being + p.p. — The door is being locked now.", "Simple past: was/were + p.p. — The door was locked yesterday.", "Past continuous: was/were being + p.p. — The door was being locked when I arrived.", "Present perfect: has/have been + p.p. — The door has been locked.", "Past perfect: had been + p.p. — The door had been locked before I left.", "Future (will): will be + p.p. — The door will be locked tonight.", "Future (going to): am/is/are going to be + p.p. — The door is going to be locked."] },
    ],
  },
  {
    id: "modal-passive",
    title: "Passive with Modal Verbs",
    icon: "🧩",
    color: "text-amber-600",
    explanation: "Modal verbs (can, must, should, might, etc.) combine with the passive to express obligation, possibility, permission, or advice about an action without focusing on who does it.",
    formation: "modal + be + past participle",
    examples: [
      { de: "The homework must be done by Friday.", en: "The homework must be done by Friday.", ar: "يجب إنجاز الواجبات المنزلية بحلول الجمعة." },
      { de: "This door can be opened easily.", en: "This door can be opened easily.", ar: "يمكن فتح هذا الباب بسهولة." },
      { de: "The letter should be sent immediately.", en: "The letter should be sent immediately.", ar: "يجب إرسال الرسالة فوراً." },
      { de: "Smoking may be prohibited in the building.", en: "Smoking may be prohibited in the building.", ar: "قد يُمنع التدخين في المبنى." },
      { de: "The work might be finished by noon.", en: "The work might be finished by noon.", ar: "قد يُنتهى من العمل بحلول الظهر." },
      { de: "The documents must be signed by the director.", en: "The documents must be signed by the director.", ar: "يجب توقيع المستندات بواسطة المدير." },
    ],
    subRules: [
      { label: "Modal + passive combinations", items: ["must be + p.p. → obligation: The rules must be followed.", "should be + p.p. → advice/recommendation: The car should be serviced regularly.", "can be + p.p. → possibility: The problem can be solved.", "may be + p.p. → permission/possibility: Visitors may be asked for ID.", "might be + p.p. → weak possibility: The meeting might be cancelled.", "have to be + p.p. → necessity: The forms have to be submitted in person."] },
    ],
  },
  {
    id: "passive-get",
    title: "Get Passive",
    icon: "🛠️",
    color: "text-red-600",
    explanation: "English also uses 'get' instead of 'be' to form the passive. The 'get' passive is more informal and often implies that the subject is somehow affected, especially negatively. It's very common in spoken English.",
    formation: "get + past participle",
    examples: [
      { de: "I got promoted last month.", en: "I got promoted last month.", ar: "تمت ترقيتي الشهر الماضي." },
      { de: "He got injured during the game.", en: "He got injured during the game.", ar: "أُصيب خلال المباراة." },
      { de: "She got married in June.", en: "She got married in June.", ar: "تزوجت في يونيو." },
      { de: "We got lost on the way home.", en: "We got lost on the way home.", ar: "ضللنا الطريق إلى المنزل." },
      { de: "My phone got stolen at the concert.", en: "My phone got stolen at the concert.", ar: "سُرقت هاتفي في الحفلة." },
      { de: "The house got damaged in the storm.", en: "The house got damaged in the storm.", ar: "تضرر المنزل في العاصفة." },
    ],
    subRules: [
      { label: "Be passive vs. Get passive", items: ["Be passive = more formal/neutral: The window was broken.", "Get passive = more informal, often negative: The window got broken.", "Get passive often implies the subject was affected: She got fired. (emphasizes her experience)", "Get passive is common with: get married, get divorced, get dressed, get lost, get hurt, get paid", "Get can also show change of state: I'm getting used to the weather."] },
      { label: "Common 'get' passive expressions", items: ["get arrested, get promoted, get fired, get hired, get paid, get invited", "get hurt, get injured, get killed, get caught, get infected", "get married, get divorced, get engaged, get dressed, get washed", "get started, get finished, get done, get lost, get confused"] },
    ],
  },
  {
    id: "passive-verbs-two-objects",
    title: "Passive with Two Objects",
    icon: "🎯",
    color: "text-indigo-600",
    explanation: "Some verbs (give, send, offer, tell, show, teach, etc.) take two objects: an indirect object (person) and a direct object (thing). In the passive, either object can become the subject.",
    formation: "Object 1 + be + past participle + Object 2  OR  Object 2 + be + past participle + preposition + Object 1",
    examples: [
      { de: "Active: She gave me a gift.", en: "Active: She gave me a gift.", ar: "مبني للمعلوم: أعطتني هدية." },
      { de: "Passive (person as subject): I was given a gift.", en: "Passive (person as subject): I was given a gift.", ar: "مبني للمجهول (الشخص): أُعطيت هدية." },
      { de: "Passive (thing as subject): A gift was given to me.", en: "Passive (thing as subject): A gift was given to me.", ar: "مبني للمجهول (الشيء): أُعطيت هدية لي." },
      { de: "Active: They offered him the job.", en: "Active: They offered him the job.", ar: "مبني للمعلوم: عرضوا عليه الوظيفة." },
      { de: "Passive (person): He was offered the job.", en: "Passive (person): He was offered the job.", ar: "مبني للمجهول (الشخص): عُرضت عليه الوظيفة." },
      { de: "Passive (thing): The job was offered to him.", en: "Passive (thing): The job was offered to him.", ar: "مبني للمجهول (الشيء): عُرضت الوظيفة عليه." },
    ],
    subRules: [
      { label: "Verbs that take two objects", items: ["give → I was given a present. / A present was given to me.", "send → He was sent an email. / An email was sent to him.", "offer → She was offered a promotion. / A promotion was offered to her.", "tell → They were told the truth. / The truth was told to them.", "show → We were shown the way. / The way was shown to us.", "teach → The students were taught English. / English was taught to the students."] },
    ],
  },
];

export const PASSIVE_TENSE_OVERVIEW = [
  { tense: "Present Simple", process: "am/is/are made", state: "is made" },
  { tense: "Present Continuous", process: "am/is/are being made", state: "is being made" },
  { tense: "Past Simple", process: "was/were made", state: "was made" },
  { tense: "Past Continuous", process: "was/were being made", state: "was being made" },
  { tense: "Present Perfect", process: "has/have been made", state: "has been made" },
  { tense: "Past Perfect", process: "had been made", state: "had been made" },
  { tense: "Future (will)", process: "will be made", state: "will be made" },
  { tense: "Future (going to)", process: "am/is/are going to be made", state: "is going to be made" },
];

export const ACTIVE_PASSIVE_COMPARISON = [
  { active: "The mechanic repairs the car.", passive: "The car is repaired by the mechanic." },
  { active: "The company delivers the goods.", passive: "The goods are delivered by the company." },
  { active: "The chef prepares the meal.", passive: "The meal is prepared by the chef." },
  { active: "People speak English here.", passive: "English is spoken here." },
  { active: "Someone has opened the window.", passive: "The window has been opened." },
  { active: "Shakespeare wrote Hamlet.", passive: "Hamlet was written by Shakespeare." },
  { active: "They will announce the results tomorrow.", passive: "The results will be announced tomorrow." },
];
