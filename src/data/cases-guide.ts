export type CaseSection = {
  id: string;
  title: string;
  titleAr?: string;
  explanation: string;
  explanationAr?: string;
  icon: string;
  color: string;
  examples: CaseExample[];
  pronounTable?: PronounRow[];
};

export type CaseExample = {
  english: string;
  arabic?: string;
};

export type PronounRow = {
  person: string;
  subjective: string;
  objective: string;
  possessiveAdj: string;
  possessivePronoun: string;
  reflexive: string;
};

export const CASES_GUIDE: CaseSection[] = [
  {
    id: "subjective",
    title: "Subjective Case (Nominative)",
    titleAr: "حالة الرفع (الفاعل)",
    icon: "👤",
    color: "text-emerald-600",
    explanation: "The subjective case (nominative) is used for the subject of a sentence — the person or thing performing the action. The subject pronouns are: I, you, he, she, it, we, they.",
    explanationAr: "حالة الرفع تستخدم لفاعل الجملة — الشخص أو الشيء الذي يقوم بالفعل. ضمائر الرفع: I, you, he, she, it, we, they.",
    examples: [
      { english: "She speaks English very well.", arabic: "هي تتحدث الإنجليزية جيداً جداً." },
      { english: "They live in a small town.", arabic: "يسكنون في بلدة صغيرة." },
      { english: "He is a teacher at the local school.", arabic: "هو معلم في المدرسة المحلية." },
      { english: "The dog barks loudly every morning.", arabic: "الكلب ينبح بصوت عال كل صباح." },
      { english: "We are learning English grammar.", arabic: "نحن نتعلم قواعد اللغة الإنجليزية." },
    ],
    pronounTable: [
      { person: "1st singular", subjective: "I", objective: "me", possessiveAdj: "my", possessivePronoun: "mine", reflexive: "myself" },
      { person: "2nd singular", subjective: "you", objective: "you", possessiveAdj: "your", possessivePronoun: "yours", reflexive: "yourself" },
      { person: "3rd singular masculine", subjective: "he", objective: "him", possessiveAdj: "his", possessivePronoun: "his", reflexive: "himself" },
      { person: "3rd singular feminine", subjective: "she", objective: "her", possessiveAdj: "her", possessivePronoun: "hers", reflexive: "herself" },
      { person: "3rd singular neuter", subjective: "it", objective: "it", possessiveAdj: "its", possessivePronoun: "its", reflexive: "itself" },
      { person: "1st plural", subjective: "we", objective: "us", possessiveAdj: "our", possessivePronoun: "ours", reflexive: "ourselves" },
      { person: "2nd plural", subjective: "you", objective: "you", possessiveAdj: "your", possessivePronoun: "yours", reflexive: "yourselves" },
      { person: "3rd plural", subjective: "they", objective: "them", possessiveAdj: "their", possessivePronoun: "theirs", reflexive: "themselves" },
    ],
  },
  {
    id: "objective",
    title: "Objective Case (Accusative)",
    titleAr: "حالة النصب (المفعول به)",
    icon: "🎯",
    color: "text-blue-600",
    explanation: "The objective case (accusative) is used for the direct object of a sentence — the person or thing receiving the action. It is also used after most prepositions. Object pronouns are: me, you, him, her, it, us, them.",
    explanationAr: "حالة النصب تستخدم للمفعول به المباشر — الشخص أو الشيء الذي يتلقى الفعل. تُستخدم أيضاً بعد معظم حروف الجر. ضمائر النصب: me, you, him, her, it, us, them.",
    examples: [
      { english: "I saw him at the park yesterday.", arabic: "رأيته في الحديقة أمس." },
      { english: "Please give her the message.", arabic: "من فضلك أعطها الرسالة." },
      { english: "She loves them very much.", arabic: "هي تحبهم كثيراً جداً." },
      { english: "We invited us all to the party.", arabic: "دعونا جميعاً إلى الحفلة." },
      { english: "The teacher helped me with the homework.", arabic: "ساعدني المعلم في الواجب المنزلي." },
      { english: "Put the book on the table. (after preposition 'on')", arabic: "ضع الكتاب على الطاولة. (بعد حرف الجر 'on')" },
    ],
    pronounTable: [
      { person: "1st singular", subjective: "I", objective: "me", possessiveAdj: "my", possessivePronoun: "mine", reflexive: "myself" },
      { person: "2nd singular", subjective: "you", objective: "you", possessiveAdj: "your", possessivePronoun: "yours", reflexive: "yourself" },
      { person: "3rd singular masculine", subjective: "he", objective: "him", possessiveAdj: "his", possessivePronoun: "his", reflexive: "himself" },
      { person: "3rd singular feminine", subjective: "she", objective: "her", possessiveAdj: "her", possessivePronoun: "hers", reflexive: "herself" },
      { person: "3rd singular neuter", subjective: "it", objective: "it", possessiveAdj: "its", possessivePronoun: "its", reflexive: "itself" },
      { person: "1st plural", subjective: "we", objective: "us", possessiveAdj: "our", possessivePronoun: "ours", reflexive: "ourselves" },
      { person: "2nd plural", subjective: "you", objective: "you", possessiveAdj: "your", possessivePronoun: "yours", reflexive: "yourselves" },
      { person: "3rd plural", subjective: "they", objective: "them", possessiveAdj: "their", possessivePronoun: "theirs", reflexive: "themselves" },
    ],
  },
  {
    id: "possessive",
    title: "Possessive Case (Genitive with 's)",
    titleAr: "حالة الملكية (الإضافة بـ 's)",
    icon: "📦",
    color: "text-amber-600",
    explanation: "The possessive case shows ownership or relationship. In English, we add 's to a noun (John's book, the cat's tail) or use possessive pronouns (mine, yours, his, hers, its, ours, theirs). For plural nouns ending in -s, add only an apostrophe (the students' room).",
    explanationAr: "حالة الملكية تظهر الملكية أو العلاقة. في الإنجليزية، نضيف 's للاسم (John's book, the cat's tail) أو نستخدم ضمائر الملكية (mine, yours, his, hers, its, ours, theirs). للأسماء الجمع المنتهية بـ -s، نضيف فاصلة عليا فقط (the students' room).",
    examples: [
      { english: "This is Ahmed's car.", arabic: "هذه سيارة أحمد." },
      { english: "The children's toys are all over the floor.", arabic: "ألعاب الأطفال في كل مكان على الأرض." },
      { english: "My mother's house is very old.", arabic: "بيت أمي قديم جداً." },
      { english: "That book is mine, not yours.", arabic: "ذلك الكتاب لي، ليس لك." },
      { english: "The teachers' meeting is at 3 PM. (plural possessive)", arabic: "اجتماع المدرسين في الساعة 3 مساءً. (ملكية جمع)" },
      { english: "James's car is blue. (or James' car)", arabic: "سيارة جيمس زرقاء." },
      { english: "A friend of mine told me the news.", arabic: "صديق لي أخبرني الخبر." },
    ],
  },
  {
    id: "dative",
    title: "Dative Case (Indirect Objects)",
    titleAr: "حالة الجر (المفعول غير المباشر)",
    icon: "🎁",
    color: "text-violet-600",
    explanation: "English does not have a distinct dative case form. Instead, the indirect object is shown through word order (I gave him a book = him is indirect, book is direct) or with the preposition 'to' or 'for' (I gave a book to him). The indirect object receives the direct object.",
    explanationAr: "الإنجليزية ليس لديها حالة جر مميزة مثل الألمانية أو العربية. بدلاً من ذلك، يظهر المفعول غير المباشر من خلال ترتيب الكلمات (I gave him a book = him مفعول غير مباشر، book مفعول مباشر) أو بحرف الجر 'to' أو 'for' (I gave a book to him). المفعول غير المباشر يستلم المفعول المباشر.",
    examples: [
      { english: "She gave me a gift. (me = indirect, gift = direct)", arabic: "أعطتني هدية. (me = غير مباشر، gift = مباشر)" },
      { english: "I bought her some flowers. (her = indirect, flowers = direct)", arabic: "اشتريت لها بعض الزهور. (her = غير مباشر، flowers = مباشر)" },
      { english: "He sent an email to his boss.", arabic: "أرسل بريداً إلكترونياً إلى مديره." },
      { english: "Can you make a cup of tea for me?", arabic: "هل يمكنك صنع كوب شاي لي؟" },
      { english: "The company offered them a new contract.", arabic: "عرضت عليهم الشركة عقداً جديداً." },
      { english: "Tell us the story, please.", arabic: "أخبرنا القصة، من فضلك." },
      { english: "She read the children a bedtime story.", arabic: "قرأت للأطفال قصة قبل النوم." },
    ],
  },
];

export const CASE_CHECK_STEPS = [
  { step: 1, question: "Is the word the subject (doer of the action)?", case: "Subjective", action: "Ask: Who/What + verb?" },
  { step: 2, question: "Is the word the direct object (receiver of the action)?", case: "Objective", action: "Ask: Subject + verb + who/what?" },
  { step: 3, question: "Does it show ownership?", case: "Possessive", action: "Ask: Whose? Look for 's or possessive pronoun." },
  { step: 4, question: "Is it the indirect object (to/for whom)?", case: "Dative", action: "Ask: To whom? For whom? Look for to/for or word order." },
  { step: 5, question: "Is it after a preposition?", case: "Objective", action: "Prepositions always take the objective case (me, him, her, etc.)." },
];

export const POSSESSIVE_RULES = [
  {
    title: "Singular Nouns",
    rule: "Add 's",
    examples: [
      { english: "the boy's hat", arabic: "قبعة الولد" },
      { english: "James's car (or James' car)", arabic: "سيارة جيمس" },
      { english: "my mother's house", arabic: "بيت أمي" },
    ],
  },
  {
    title: "Plural Nouns Ending in -s",
    rule: "Add only an apostrophe (')",
    examples: [
      { english: "the students' books", arabic: "كتب الطلاب" },
      { english: "the girls' bathroom", arabic: "حمام الفتيات" },
      { english: "my parents' house", arabic: "بيت والديّ" },
    ],
  },
  {
    title: "Irregular Plurals",
    rule: "Add 's (same as singular)",
    examples: [
      { english: "the children's toys", arabic: "ألعاب الأطفال" },
      { english: "the men's room", arabic: "غرفة الرجال" },
      { english: "the women's meeting", arabic: "اجتماع النساء" },
    ],
  },
  {
    title: "Multiple Owners",
    rule: "Only the last noun gets 's for joint ownership",
    examples: [
      { english: "John and Mary's house (they own it together)", arabic: "بيت جون وماري (يملكانه معاً)" },
      { english: "John's and Mary's cars (each owns one separately)", arabic: "سيارات جون وماري (كل واحد يملك سيارة)" },
    ],
  },
];
