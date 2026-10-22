export type ConfusedPair = {
  word1: string;
  word2: string;
  meaning1: string;
  meaning2: string;
  example1: string;
  example2: string;
  arabic1: string;
  arabic2: string;
};

export const CONFUSED_PAIRS: ConfusedPair[] = [
  {
    word1: "affect", word2: "effect",
    meaning1: "to influence (verb)", meaning2: "a result (noun); to bring about (verb)",
    example1: "The weather affects my mood.", example2: "The new law had a positive effect.",
    arabic1: "يؤثر (فعل)", arabic2: "تأثير (اسم) / يُحدث (فعل)"
  },
  {
    word1: "their", word2: "there",
    meaning1: "belonging to them (possessive)", meaning2: "in or at that place (adverb)",
    example1: "Their house is very big.", example2: "The book is over there.",
    arabic1: "ملكهم (ضمير ملكية)", arabic2: "هناك (ظرف مكان)"
  },
  {
    word1: "there", word2: "they're",
    meaning1: "in or at that place", meaning2: "they are (contraction)",
    example1: "There are many options.", example2: "They're coming to the party.",
    arabic1: "هناك", arabic2: "هم (اختصار they are)"
  },
  {
    word1: "your", word2: "you're",
    meaning1: "belonging to you (possessive)", meaning2: "you are (contraction)",
    example1: "Is this your pen?", example2: "You're very kind.",
    arabic1: "ملكك (ضمير ملكية)", arabic2: "أنت (اختصار you are)"
  },
  {
    word1: "its", word2: "it's",
    meaning1: "belonging to it (possessive)", meaning2: "it is / it has (contraction)",
    example1: "The cat licked its paw.", example2: "It's raining outside.",
    arabic1: "ملكه (ضمير ملكية لغير العاقل)", arabic2: "هو / إنه (اختصار it is)"
  },
  {
    word1: "accept", word2: "except",
    meaning1: "to receive, agree to", meaning2: "excluding, other than",
    example1: "I accept your apology.", example2: "Everyone came except John.",
    arabic1: "يقبل، يوافق على", arabic2: "باستثناء، ما عدا"
  },
  {
    word1: "principal", word2: "principle",
    meaning1: "head of a school (noun); main (adj)", meaning2: "a fundamental truth or rule (noun)",
    example1: "The principal gave a speech.", example2: "She has strong moral principles.",
    arabic1: "مدير مدرسة / رئيسي", arabic2: "مبدأ، قاعدة أساسية"
  },
  {
    word1: "stationary", word2: "stationery",
    meaning1: "not moving, fixed in place", meaning2: "writing materials (paper, pens, etc.)",
    example1: "The car remained stationary at the red light.", example2: "I bought some stationery from the shop.",
    arabic1: "ثابت، غير متحرك", arabic2: "أدوات مكتبية (ورق، أقلام)"
  },
  {
    word1: "complement", word2: "compliment",
    meaning1: "something that completes or goes well with", meaning2: "a praise or expression of admiration",
    example1: "The wine is a perfect complement to the meal.", example2: "She paid me a nice compliment on my dress.",
    arabic1: "مكمل، يتمم", arabic2: "مجاملة، إطراء"
  },
  {
    word1: "discreet", word2: "discrete",
    meaning1: "careful, modest, not attracting attention", meaning2: "separate, distinct, individual",
    example1: "He was very discreet about the surprise party.", example2: "The research has three discrete stages.",
    arabic1: "حذر، محتشم، متحفظ", arabic2: "منفصل، مستقل، فردي"
  },
  {
    word1: "eminent", word2: "imminent",
    meaning1: "famous, respected, distinguished", meaning2: "about to happen very soon",
    example1: "She is an eminent professor of physics.", example2: "A storm is imminent; take cover!",
    arabic1: "بارز، مشهور، محترم", arabic2: "وشيك، قريب الحدوث"
  },
  {
    word1: "elicit", word2: "illicit",
    meaning1: "to draw out or evoke (a response)", meaning2: "illegal, forbidden",
    example1: "The comedian's joke elicited laughter.", example2: "He was arrested for illicit drug trading.",
    arabic1: "يستحضر، يستخرج (رد فعل)", arabic2: "غير قانوني، محظور"
  },
  {
    word1: "ensure", word2: "insure",
    meaning1: "to make sure, guarantee", meaning2: "to protect financially with insurance",
    example1: "Please ensure the door is locked.", example2: "You should insure your car against theft.",
    arabic1: "يضمن، يتأكد", arabic2: "يؤمن (ضد الخسارة)"
  },
  {
    word1: "farther", word2: "further",
    meaning1: "physical distance (farther)", meaning2: "figurative or additional distance/degree",
    example1: "I ran farther than I did yesterday.", example2: "We need to discuss this further.",
    arabic1: "أبعد (مسافة مادية)", arabic2: "أبعد (مجازي) / إضافي"
  },
  {
    word1: "loose", word2: "lose",
    meaning1: "not tight, free, unfastened", meaning2: "to misplace, fail to win, be deprived of",
    example1: "The screw is loose.", example2: "I don't want to lose the game.",
    arabic1: "فضفاض، غير محكم", arabic2: "يفقد، يخسر"
  },
  {
    word1: "than", word2: "then",
    meaning1: "used for comparisons", meaning2: "at that time; next, afterwards",
    example1: "She is taller than me.", example2: "I finished work, then I went home.",
    arabic1: "من (للمقارنة)", arabic2: "ثم، بعد ذلك"
  },
  {
    word1: "weather", word2: "whether",
    meaning1: "atmospheric conditions (rain, sun, etc.)", meaning2: "expressing a choice between alternatives (if)",
    example1: "The weather is lovely today.", example2: "I don't know whether to go or stay.",
    arabic1: "طقس", arabic2: "سواء (للتعبير عن خيار)"
  },
  {
    word1: "who's", word2: "whose",
    meaning1: "who is / who has (contraction)", meaning2: "belonging to whom (possessive)",
    example1: "Who's coming to dinner?", example2: "Whose jacket is this?",
    arabic1: "من هو / من لديه (اختصار)", arabic2: "لمن (ضمير ملكية للسؤال)"
  },
  {
    word1: "advice", word2: "advise",
    meaning1: "recommendation or opinion (noun)", meaning2: "to give a recommendation (verb)",
    example1: "Can you give me some advice?", example2: "I advise you to study harder.",
    arabic1: "نصيحة (اسم)", arabic2: "ينصح (فعل)"
  },
  {
    word1: "practice", word2: "practise",
    meaning1: "the action of doing something repeatedly (noun; US also verb)", meaning2: "to perform repeatedly (verb, UK spelling)",
    example1: "Practice makes perfect.", example2: "You need to practise the piano every day.",
    arabic1: "ممارسة، تدريب (اسم)", arabic2: "يمارس، يتدرب (فعل)"
  },
  {
    word1: "conscience", word2: "conscious",
    meaning1: "inner sense of right and wrong", meaning2: "awake, aware, knowing",
    example1: "His conscience bothered him after lying.", example2: "She was conscious during the entire operation.",
    arabic1: "ضمير", arabic2: "واعٍ، مدرك، مستيقظ"
  },
  {
    word1: "historic", word2: "historical",
    meaning1: "famous or important in history", meaning2: "relating to history (not necessarily important)",
    example1: "This is a historic moment for our country.", example2: "She reads historical novels set in the 19th century.",
    arabic1: "تاريخي (ذو أهمية تاريخية)", arabic2: "تاريخي (متعلق بالتاريخ)"
  },
  {
    word1: "definite", word2: "definitive",
    meaning1: "clear, certain, not doubtful", meaning2: "final, conclusive, authoritative",
    example1: "We need a definite answer by Monday.", example2: "This is the definitive biography of Einstein.",
    arabic1: "مؤكد، واضح", arabic2: "نهائي، حاسم، موثوق"
  },
];
