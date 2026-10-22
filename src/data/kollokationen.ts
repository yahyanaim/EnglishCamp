export type CollocationType = "adj+noun" | "verb+noun" | "adv+adj" | "verb+prep";

export type CollocationEntry = {
  type: CollocationType;
  collocation: string;
  meaning: string;
  example: string;
  arabic: string;
};

export const COLLOCATIONS: CollocationEntry[] = [
  // ── Adjective + Noun ──
  { type: "adj+noun", collocation: "heavy rain", meaning: "a large amount of rain", example: "We stayed inside due to heavy rain.", arabic: "مطر غزير" },
  { type: "adj+noun", collocation: "strong coffee", meaning: "coffee with a powerful taste", example: "I need a cup of strong coffee to wake up.", arabic: "قهوة قوية" },
  { type: "adj+noun", collocation: "bright future", meaning: "a future full of success", example: "She has a bright future ahead of her.", arabic: "مستقبل مشرق" },
  { type: "adj+noun", collocation: "key factor", meaning: "the most important element", example: "Cost is a key factor in our decision.", arabic: "عامل رئيسي" },
  { type: "adj+noun", collocation: "great success", meaning: "a very positive result", example: "The event was a great success.", arabic: "نجاح كبير" },
  { type: "adj+noun", collocation: "deep concern", meaning: "serious worry", example: "The situation is a cause for deep concern.", arabic: "قلق عميق" },
  { type: "adj+noun", collocation: "common mistake", meaning: "an error many people make", example: "This is a common mistake among learners.", arabic: "خطأ شائع" },
  { type: "adj+noun", collocation: "major problem", meaning: "a very serious issue", example: "Pollution is a major problem in big cities.", arabic: "مشكلة كبيرة" },
  { type: "adj+noun", collocation: "golden opportunity", meaning: "a perfect chance", example: "Don't miss this golden opportunity!", arabic: "فرصة ذهبية" },
  { type: "adj+noun", collocation: "long-term plan", meaning: "a plan for the distant future", example: "We need a long-term plan for growth.", arabic: "خطة طويلة الأجل" },
  { type: "adj+noun", collocation: "highly likely", meaning: "very probable", example: "It's highly likely that it will rain today.", arabic: "محتمل جداً" },
  { type: "adj+noun", collocation: "free time", meaning: "time when you are not working", example: "I enjoy reading in my free time.", arabic: "وقت فراغ" },
  { type: "adj+noun", collocation: "huge impact", meaning: "very strong effect", example: "The new policy had a huge impact on the economy.", arabic: "تأثير كبير" },
  { type: "adj+noun", collocation: "bitter cold", meaning: "extremely cold weather", example: "The bitter cold made it hard to go outside.", arabic: "برد قارس" },

  // ── Verb + Noun ──
  { type: "verb+noun", collocation: "make a decision", meaning: "to decide", example: "I need to make a decision by Friday.", arabic: "اتخذ قراراً" },
  { type: "verb+noun", collocation: "take a break", meaning: "to pause for rest", example: "Let's take a break for lunch.", arabic: "أخذ استراحة" },
  { type: "verb+noun", collocation: "do business", meaning: "to conduct commercial activity", example: "They do business with clients in Asia.", arabic: "يمارس أعمالاً تجارية" },
  { type: "verb+noun", collocation: "give a speech", meaning: "to speak formally to an audience", example: "The president gave a speech about climate change.", arabic: "ألقى خطاباً" },
  { type: "verb+noun", collocation: "have a conversation", meaning: "to talk with someone", example: "We had a long conversation about the project.", arabic: "أجرى محادثة" },
  { type: "verb+noun", collocation: "catch a cold", meaning: "to become ill with a cold", example: "I caught a cold from my colleague.", arabic: "أصيب بنزلة برد" },
  { type: "verb+noun", collocation: "pay attention", meaning: "to focus carefully", example: "Please pay attention to the details.", arabic: "انتبه" },
  { type: "verb+noun", collocation: "tell a story", meaning: "to narrate", example: "Grandfather told us a funny story.", arabic: "روى قصة" },
  { type: "verb+noun", collocation: "save time", meaning: "to avoid wasting time", example: "This shortcut will save us a lot of time.", arabic: "وفر وقتاً" },
  { type: "verb+noun", collocation: "take a risk", meaning: "to do something risky", example: "You have to take a risk to succeed.", arabic: "خاطر" },
  { type: "verb+noun", collocation: "break the law", meaning: "to do something illegal", example: "If you break the law, you will be punished.", arabic: "خرق القانون" },
  { type: "verb+noun", collocation: "set a goal", meaning: "to establish an objective", example: "She set a goal to learn 50 new words a week.", arabic: "حدد هدفاً" },
  { type: "verb+noun", collocation: "keep a promise", meaning: "to do what you promised", example: "He always keeps his promises.", arabic: "أوفى بوعده" },
  { type: "verb+noun", collocation: "raise a question", meaning: "to bring up an issue", example: "The report raised important questions about safety.", arabic: "طرح سؤالاً" },

  // ── Adverb + Adjective ──
  { type: "adv+adj", collocation: "highly unlikely", meaning: "extremely improbable", example: "It is highly unlikely that she will arrive on time.", arabic: "غير محتمل إطلاقاً" },
  { type: "adv+adj", collocation: "deeply concerned", meaning: "very worried", example: "We are deeply concerned about the situation.", arabic: "قلق للغاية" },
  { type: "adv+adj", collocation: "strongly recommended", meaning: "advised with emphasis", example: "This book is strongly recommended for beginners.", arabic: "موصى به بشدة" },
  { type: "adv+adj", collocation: "bitterly disappointed", meaning: "extremely let down", example: "She was bitterly disappointed by the result.", arabic: "خائب الأمل بشدة" },
  { type: "adv+adj", collocation: "perfectly clear", meaning: "completely understandable", example: "I want to make this perfectly clear.", arabic: "واضح تماماً" },
  { type: "adv+adj", collocation: "critically important", meaning: "absolutely essential", example: "It is critically important that you arrive on time.", arabic: "بالغ الأهمية" },
  { type: "adv+adj", collocation: "badly injured", meaning: "seriously hurt", example: "He was badly injured in the accident.", arabic: "مصاب بجروح بالغة" },
  { type: "adv+adj", collocation: "wide awake", meaning: "completely awake", example: "I was wide awake at 5 AM.", arabic: "مستيقظ تماماً" },
  { type: "adv+adj", collocation: "fully aware", meaning: "completely conscious of", example: "We are fully aware of the risks involved.", arabic: "مدرك تماماً" },
  { type: "adv+adj", collocation: "sorely missed", meaning: "greatly missed", example: "Our former teacher is sorely missed.", arabic: "مفقود بشدة" },

  // ── Verb + Preposition ──
  { type: "verb+prep", collocation: "depend on", meaning: "to rely on", example: "The outcome depends on your effort.", arabic: "يعتمد على" },
  { type: "verb+prep", collocation: "believe in", meaning: "to have faith in", example: "I believe in your ability to succeed.", arabic: "يؤمن بـ" },
  { type: "verb+prep", collocation: "apologize for", meaning: "to say sorry for", example: "You should apologize for your mistake.", arabic: "يعتذر عن" },
  { type: "verb+prep", collocation: "apply for", meaning: "to make a formal request for", example: "She applied for the job at the bank.", arabic: "يتقدم بطلب لـ" },
  { type: "verb+prep", collocation: "belong to", meaning: "to be owned by", example: "This book belongs to the library.", arabic: "ينتمي إلى" },
  { type: "verb+prep", collocation: "care about", meaning: "to be concerned about", example: "I really care about the environment.", arabic: "يهتم بـ" },
  { type: "verb+prep", collocation: "listen to", meaning: "to pay attention to sound", example: "Listen to the instructions carefully.", arabic: "يستمع إلى" },
  { type: "verb+prep", collocation: "succeed in", meaning: "to achieve in", example: "He succeeded in passing the exam.", arabic: "ينجح في" },
  { type: "verb+prep", collocation: "wait for", meaning: "to stay until something happens", example: "We waited for the bus for an hour.", arabic: "ينتظر" },
  { type: "verb+prep", collocation: "complain about", meaning: "to express dissatisfaction", example: "Customers often complain about the service.", arabic: "يشكو من" },
  { type: "verb+prep", collocation: "result in", meaning: "to cause", example: "The accident resulted in three injuries.", arabic: "يؤدي إلى" },
  { type: "verb+prep", collocation: "provide with", meaning: "to supply", example: "The school provides students with textbooks.", arabic: "يزود بـ" },
];
