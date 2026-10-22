export type SentencePattern = {
  id: string;
  pattern: string;
  title: string;
  desc: string;
  formula: string;
  examples: { english: string; arabic: string }[];
};

export const SENTENCE_PATTERNS: SentencePattern[] = [
  {
    id: "svo",
    pattern: "SVO",
    title: "Subject-Verb-Object",
    desc: "The most basic English sentence structure. The subject performs an action (verb) on an object.",
    formula: "Subject + Verb + Object",
    examples: [
      { english: "The cat chased the mouse.", arabic: "طارد القط الفأر." },
      { english: "She reads books every day.", arabic: "هي تقرأ الكتب كل يوم." },
      { english: "They built a new house.", arabic: "بنوا منزلاً جديداً." },
      { english: "The chef cooked a delicious meal.", arabic: "طبخ الشيف وجبة لذيذة." },
    ],
  },
  {
    id: "svoo",
    pattern: "SVOO",
    title: "Subject-Verb-Indirect Object-Direct Object",
    desc: "A sentence with two objects: the indirect object (who receives) and the direct object (what is given).",
    formula: "Subject + Verb + Indirect Object + Direct Object",
    examples: [
      { english: "She gave her friend a gift.", arabic: "أعطت صديقتها هدية." },
      { english: "He sent his mother a letter.", arabic: "أرسل لأمه رسالة." },
      { english: "They offered the visitors some tea.", arabic: "قدموا للزوار بعض الشاي." },
      { english: "The teacher told the students a story.", arabic: "روى المعلم للطلاب قصة." },
    ],
  },
  {
    id: "svoc",
    pattern: "SVOC",
    title: "Subject-Verb-Object-Complement",
    desc: "An object complement follows the direct object and describes or renames it.",
    formula: "Subject + Verb + Object + Complement",
    examples: [
      { english: "They named the baby Sarah.", arabic: "سموا الطفلة سارة." },
      { english: "The paint made the room beautiful.", arabic: "جعل الطلاء الغرفة جميلة." },
      { english: "We considered him a genius.", arabic: "اعتبرناه عبقرياً." },
      { english: "She kept the food warm.", arabic: "أبقت الطعام دافئاً." },
    ],
  },
  {
    id: "sva",
    pattern: "SVA",
    title: "Subject-Verb-Adverbial",
    desc: "An adverbial (place, time, manner) is essential to complete the meaning of the sentence.",
    formula: "Subject + Verb + Adverbial",
    examples: [
      { english: "She lives in London.", arabic: "هي تعيش في لندن." },
      { english: "The meeting is at 3 o'clock.", arabic: "الاجتماع في الساعة الثالثة." },
      { english: "He put the keys on the table.", arabic: "وضع المفاتيح على الطاولة." },
      { english: "They stayed at home.", arabic: "بقوا في المنزل." },
    ],
  },
  {
    id: "svoa",
    pattern: "SVOA",
    title: "Subject-Verb-Object-Adverbial",
    desc: "A sentence with a subject, verb, object, and an adverbial that is essential to the meaning.",
    formula: "Subject + Verb + Object + Adverbial",
    examples: [
      { english: "She placed the book on the shelf.", arabic: "وضعت الكتاب على الرف." },
      { english: "He drove his car to the airport.", arabic: "قاد سيارته إلى المطار." },
      { english: "They sent the package by mail.", arabic: "أرسلوا الطرد عبر البريد." },
      { english: "I put the money in my wallet.", arabic: "وضعت النقود في محفظتي." },
    ],
  },
  {
    id: "existential-there",
    pattern: "There + be",
    title: "Existential There",
    desc: "'There + be' introduces the existence of something. The true subject comes after the verb.",
    formula: "There + be + Noun Phrase (+ Place/Time)",
    examples: [
      { english: "There is a cat on the roof.", arabic: "هناك قطة على السطح." },
      { english: "There are many students in the class.", arabic: "هناك العديد من الطلاب في الفصل." },
      { english: "There was a loud noise outside.", arabic: "كان هناك ضجيج عالٍ في الخارج." },
      { english: "There were no seats left.", arabic: "لم يتبق أي مقاعد." },
    ],
  },
  {
    id: "it-cleft",
    pattern: "It-cleft",
    title: "It + be + Adjective + Infinitive",
    desc: "The 'it-cleft' structure emphasizes a particular part of the sentence. 'It' acts as a dummy subject.",
    formula: "It + be + Adjective + (for + Noun) + to-infinitive",
    examples: [
      { english: "It is important to study every day.", arabic: "من المهم الدراسة كل يوم." },
      { english: "It was easy for him to solve the problem.", arabic: "كان من السهل عليه حل المشكلة." },
      { english: "It is impossible to learn everything in one day.", arabic: "من المستحيل تعلم كل شيء في يوم واحد." },
      { english: "It was nice of you to help me.", arabic: "كان من اللطيف منك مساعدتي." },
    ],
  },
];
