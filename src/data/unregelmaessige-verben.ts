export type VerbPattern = {
  pattern: string;
  desc: string;
  verbs: {
    infinitive: string;
    pastSimple?: string;
    pastParticiple?: string;
    praeteritum: string;
    perfekt: string;
    english: string;
    arabic?: string;
  }[];
};

export const VERB_PATTERNS: VerbPattern[] = [
  {
    pattern: "i → a → u",
    desc: "Base form with -i-, Past tense changes to -a-, Past participle changes to -u-",
    verbs: [
      { infinitive: "begin", praeteritum: "began", perfekt: "begun", english: "to begin", arabic: "يبدأ" },
      { infinitive: "drink", praeteritum: "drank", perfekt: "drunk", english: "to drink", arabic: "يشرب" },
      { infinitive: "ring", praeteritum: "rang", perfekt: "rung", english: "to ring", arabic: "يرن" },
      { infinitive: "shrink", praeteritum: "shrank", perfekt: "shrunk", english: "to shrink", arabic: "يتقلص" },
      { infinitive: "sing", praeteritum: "sang", perfekt: "sung", english: "to sing", arabic: "يغني" },
      { infinitive: "sink", praeteritum: "sank", perfekt: "sunk", english: "to sink", arabic: "يغرق" },
      { infinitive: "spring", praeteritum: "sprang", perfekt: "sprung", english: "to spring", arabic: "ينبثق" },
      { infinitive: "swim", praeteritum: "swam", perfekt: "swum", english: "to swim", arabic: "يسبح" },
    ],
  },
  {
    pattern: "i → a → a",
    desc: "Base form with -i-, Past tense changes to -a-, Past participle stays -a-",
    verbs: [
      { infinitive: "sit", praeteritum: "sat", perfekt: "sat", english: "to sit", arabic: "يجلس" },
      { infinitive: "spit", praeteritum: "spat", perfekt: "spat", english: "to spit", arabic: "يبصق" },
      { infinitive: "win", praeteritum: "won", perfekt: "won", english: "to win", arabic: "يفوز" },
    ],
  },
  {
    pattern: "i → i → i (no change)",
    desc: "No change — all three forms are identical",
    verbs: [
      { infinitive: "hit", praeteritum: "hit", perfekt: "hit", english: "to hit", arabic: "يضرب" },
      { infinitive: "fit", praeteritum: "fit", perfekt: "fit", english: "to fit", arabic: "يناسب" },
      { infinitive: "let", praeteritum: "let", perfekt: "let", english: "to let", arabic: "يدع/يسمح" },
      { infinitive: "put", praeteritum: "put", perfekt: "put", english: "to put", arabic: "يضع" },
      { infinitive: "quit", praeteritum: "quit", perfekt: "quit", english: "to quit", arabic: "يستقيل" },
      { infinitive: "set", praeteritum: "set", perfekt: "set", english: "to set", arabic: "يضبط" },
      { infinitive: "shut", praeteritum: "shut", perfekt: "shut", english: "to shut", arabic: "يغلق" },
      { infinitive: "split", praeteritum: "split", perfekt: "split", english: "to split", arabic: "يقسم" },
    ],
  },
  {
    pattern: "ea → e → e",
    desc: "Base form with -ea-, Past and participle both change to -e-",
    verbs: [
      { infinitive: "deal", praeteritum: "dealt", perfekt: "dealt", english: "to deal", arabic: "يتعامل" },
      { infinitive: "dream", praeteritum: "dreamt / dreamed", perfekt: "dreamt / dreamed", english: "to dream", arabic: "يحلم" },
      { infinitive: "feel", praeteritum: "felt", perfekt: "felt", english: "to feel", arabic: "يشعر" },
      { infinitive: "keep", praeteritum: "kept", perfekt: "kept", english: "to keep", arabic: "يحتفظ" },
      { infinitive: "kneel", praeteritum: "knelt", perfekt: "knelt", english: "to kneel", arabic: "يركع" },
      { infinitive: "lead", praeteritum: "led", perfekt: "led", english: "to lead", arabic: "يقود" },
      { infinitive: "leave", praeteritum: "left", perfekt: "left", english: "to leave", arabic: "يغادر" },
      { infinitive: "meet", praeteritum: "met", perfekt: "met", english: "to meet", arabic: "يقابل" },
      { infinitive: "read", praeteritum: "read", perfekt: "read", english: "to read", arabic: "يقرأ" },
      { infinitive: "sleep", praeteritum: "slept", perfekt: "slept", english: "to sleep", arabic: "ينام" },
      { infinitive: "sweep", praeteritum: "swept", perfekt: "swept", english: "to sweep", arabic: "يكنس" },
      { infinitive: "teach", praeteritum: "taught", perfekt: "taught", english: "to teach", arabic: "يعلّم" },
      { infinitive: "think", praeteritum: "thought", perfekt: "thought", english: "to think", arabic: "يفكر" },
    ],
  },
  {
    pattern: "ee → e → e",
    desc: "Base form with -ee-, Past and participle both change to -e-",
    verbs: [
      { infinitive: "bleed", praeteritum: "bled", perfekt: "bled", english: "to bleed", arabic: "ينزف" },
      { infinitive: "breed", praeteritum: "bred", perfekt: "bred", english: "to breed", arabic: "يربي" },
      { infinitive: "feed", praeteritum: "fed", perfekt: "fed", english: "to feed", arabic: "يطعم" },
      { infinitive: "meet", praeteritum: "met", perfekt: "met", english: "to meet", arabic: "يقابل" },
      { infinitive: "speed", praeteritum: "sped", perfekt: "sped", english: "to speed", arabic: "يسرع" },
    ],
  },
  {
    pattern: "e → o → o",
    desc: "Base form with -e-, Past and participle both change to -o-",
    verbs: [
      { infinitive: "break", praeteritum: "broke", perfekt: "broken", english: "to break", arabic: "يكسر" },
      { infinitive: "choose", praeteritum: "chose", perfekt: "chosen", english: "to choose", arabic: "يختار" },
      { infinitive: "freeze", praeteritum: "froze", perfekt: "frozen", english: "to freeze", arabic: "يجمد" },
      { infinitive: "speak", praeteritum: "spoke", perfekt: "spoken", english: "to speak", arabic: "يتحدث" },
      { infinitive: "steal", praeteritum: "stole", perfekt: "stolen", english: "to steal", arabic: "يسرق" },
      { infinitive: "wake", praeteritum: "woke", perfekt: "woken", english: "to wake", arabic: "يستيقظ" },
    ],
  },
  {
    pattern: "a → e → a",
    desc: "Base with -a-, Past changes to -e-, Participle returns to -a-",
    verbs: [
      { infinitive: "blow", praeteritum: "blew", perfekt: "blown", english: "to blow", arabic: "ينفخ" },
      { infinitive: "draw", praeteritum: "drew", perfekt: "drawn", english: "to draw", arabic: "يرسم" },
      { infinitive: "fall", praeteritum: "fell", perfekt: "fallen", english: "to fall", arabic: "يسقط" },
      { infinitive: "fly", praeteritum: "flew", perfekt: "flown", english: "to fly", arabic: "يطير" },
      { infinitive: "grow", praeteritum: "grew", perfekt: "grown", english: "to grow", arabic: "ينمو" },
      { infinitive: "know", praeteritum: "knew", perfekt: "known", english: "to know", arabic: "يعرف" },
      { infinitive: "throw", praeteritum: "threw", perfekt: "thrown", english: "to throw", arabic: "يرمي" },
    ],
  },
  {
    pattern: "o → e → o",
    desc: "Base with -o-, Past changes to -e-, Participle returns to -o-",
    verbs: [
      { infinitive: "break", praeteritum: "broke", perfekt: "broken", english: "to break", arabic: "يكسر" },
      { infinitive: "choose", praeteritum: "chose", perfekt: "chosen", english: "to choose", arabic: "يختار" },
      { infinitive: "freeze", praeteritum: "froze", perfekt: "frozen", english: "to freeze", arabic: "يجمد" },
    ],
  },
  {
    pattern: "-ought / -aught",
    desc: "Past and participle end in -ought or -aught",
    verbs: [
      { infinitive: "bring", praeteritum: "brought", perfekt: "brought", english: "to bring", arabic: "يحضر" },
      { infinitive: "buy", praeteritum: "bought", perfekt: "bought", english: "to buy", arabic: "يشتري" },
      { infinitive: "catch", praeteritum: "caught", perfekt: "caught", english: "to catch", arabic: "يمسك" },
      { infinitive: "fight", praeteritum: "fought", perfekt: "fought", english: "to fight", arabic: "يقاتل" },
      { infinitive: "seek", praeteritum: "sought", perfekt: "sought", english: "to seek", arabic: "يبحث" },
      { infinitive: "teach", praeteritum: "taught", perfekt: "taught", english: "to teach", arabic: "يعلّم" },
      { infinitive: "think", praeteritum: "thought", perfekt: "thought", english: "to think", arabic: "يفكر" },
    ],
  },
  {
    pattern: "Completely Irregular",
    desc: "These very common verbs have completely unique forms that must be memorized",
    verbs: [
      { infinitive: "be", praeteritum: "was/were", perfekt: "been", english: "to be", arabic: "يكون" },
      { infinitive: "do", praeteritum: "did", perfekt: "done", english: "to do", arabic: "يفعل" },
      { infinitive: "go", praeteritum: "went", perfekt: "gone", english: "to go", arabic: "يذهب" },
      { infinitive: "have", praeteritum: "had", perfekt: "had", english: "to have", arabic: "يملك" },
      { infinitive: "make", praeteritum: "made", perfekt: "made", english: "to make", arabic: "يصنع" },
      { infinitive: "see", praeteritum: "saw", perfekt: "seen", english: "to see", arabic: "يرى" },
      { infinitive: "take", praeteritum: "took", perfekt: "taken", english: "to take", arabic: "يأخذ" },
      { infinitive: "write", praeteritum: "wrote", perfekt: "written", english: "to write", arabic: "يكتب" },
      { infinitive: "eat", praeteritum: "ate", perfekt: "eaten", english: "to eat", arabic: "يأكل" },
      { infinitive: "give", praeteritum: "gave", perfekt: "given", english: "to give", arabic: "يعطي" },
      { infinitive: "come", praeteritum: "came", perfekt: "come", english: "to come", arabic: "يأتي" },
      { infinitive: "run", praeteritum: "ran", perfekt: "run", english: "to run", arabic: "يركض" },
      { infinitive: "tell", praeteritum: "told", perfekt: "told", english: "to tell", arabic: "يخبر" },
      { infinitive: "get", praeteritum: "got", perfekt: "gotten / got", english: "to get", arabic: "يحصل" },
    ],
  },
];
