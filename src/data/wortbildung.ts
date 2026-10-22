export type PrefixEntry = {
  prefix: string;
  meaning: string;
  example: string;
  arabic: string;
};

export type SuffixEntry = {
  suffix: string;
  meaning: string;
  example: string;
  arabic: string;
};

export const PREFIXES: PrefixEntry[] = [
  { prefix: "un-", meaning: "not, opposite of", example: "unhappy, unable, unfair, unclear, unknown", arabic: "غير، عكس" },
  { prefix: "re-", meaning: "again, back", example: "rewrite, return, rebuild, reconsider, review", arabic: "إعادة، مرة أخرى" },
  { prefix: "pre-", meaning: "before", example: "preview, predict, prepare, prevent, preheat", arabic: "قبل" },
  { prefix: "dis-", meaning: "not, opposite of", example: "disagree, disappear, disconnect, dislike, disprove", arabic: "عدم، عكس" },
  { prefix: "mis-", meaning: "wrongly, badly", example: "misunderstand, mislead, misplace, misjudge, misprint", arabic: "خطأ، بشكل سيء" },
  { prefix: "over-", meaning: "too much, above", example: "overcook, overeat, oversleep, overload, overestimate", arabic: "زيادة، فوق" },
  { prefix: "under-", meaning: "too little, below", example: "underestimate, undercook, underpaid, underage, underweight", arabic: "نقص، تحت" },
  { prefix: "out-", meaning: "better than, beyond", example: "outrun, outshine, outperform, outgrow, outnumber", arabic: "أفضل من، تجاوز" },
  { prefix: "in-", meaning: "not (also im-, il-, ir- before certain letters)", example: "invisible, impossible, illegal, irregular, inactive", arabic: "غير (مع أشكال مختلفة)" },
  { prefix: "non-", meaning: "not", example: "nonstop, nonsense, nonfiction, nonprofit, nonviolent", arabic: "غير، لا" },
  { prefix: "inter-", meaning: "between, among", example: "international, interact, internet, interview, intercontinental", arabic: "بين، متبادل" },
  { prefix: "co-", meaning: "together, with", example: "cooperate, coworker, coexist, coauthor, co-pilot", arabic: "معاً، مشاركة" },
  { prefix: "anti-", meaning: "against, opposite", example: "antisocial, antibiotic, antifreeze, antiwar, antivirus", arabic: "ضد، مضاد" },
  { prefix: "de-", meaning: "down, away, remove", example: "decrease, deactivate, decode, defrost, demotivate", arabic: "إزالة، تخفيض" },
  { prefix: "en-/em-", meaning: "cause to be, put into", example: "encourage, enable, empower, enrich, ensure", arabic: "يجعل، يضع في" },
  { prefix: "fore-", meaning: "before, in front", example: "forecast, forehead, foreground, foresee, foreshadow", arabic: "قبل، أمام" },
  { prefix: "semi-", meaning: "half, partly", example: "semicircle, semifinal, semicolon, semi-automatic", arabic: "نصف، شبه" },
];

export const SUFFIXES: SuffixEntry[] = [
  { suffix: "-tion", meaning: "action or state (noun)", example: "education, information, action, nation, situation", arabic: "فعل أو حالة (اسم)" },
  { suffix: "-sion", meaning: "action or state (noun)", example: "decision, division, vision, confusion, explosion", arabic: "فعل أو حالة (اسم)" },
  { suffix: "-ment", meaning: "result or state of (noun)", example: "achievement, development, environment, agreement, enjoyment", arabic: "نتيجة أو حالة (اسم)" },
  { suffix: "-ness", meaning: "state or quality (noun)", example: "happiness, kindness, darkness, weakness, sadness", arabic: "حالة أو صفة (اسم)" },
  { suffix: "-ity", meaning: "state or quality (noun)", example: "reality, ability, possibility, activity, community", arabic: "حالة أو صفة (اسم)" },
  { suffix: "-ance/-ence", meaning: "state or quality (noun)", example: "importance, performance, difference, patience, independence", arabic: "حالة أو صفة (اسم)" },
  { suffix: "-able/-ible", meaning: "capable of being (adjective)", example: "comfortable, possible, reasonable, terrible, affordable", arabic: "قابل لأن يكون (صفة)" },
  { suffix: "-ful", meaning: "full of (adjective)", example: "beautiful, careful, helpful, wonderful, grateful", arabic: "مليء بـ (صفة)" },
  { suffix: "-less", meaning: "without (adjective)", example: "homeless, endless, careless, helpless, useless", arabic: "بدون (صفة)" },
  { suffix: "-ly", meaning: "in the manner of (adverb)", example: "quickly, carefully, happily, easily, seriously", arabic: "بطريقة (ظرف)" },
  { suffix: "-er", meaning: "person who does (noun)", example: "teacher, worker, driver, leader, player", arabic: "شخص يفعل (اسم)" },
  { suffix: "-or", meaning: "person who does (noun)", example: "actor, doctor, director, creator, instructor", arabic: "شخص يفعل (اسم)" },
  { suffix: "-ist", meaning: "person who practices or believes (noun)", example: "artist, scientist, pianist, journalist, dentist", arabic: "شخص يمارس أو يؤمن بـ (اسم)" },
  { suffix: "-ous", meaning: "having the quality of (adjective)", example: "dangerous, famous, curious, serious, ambitious", arabic: "له صفة (صفة)" },
  { suffix: "-al", meaning: "relating to (adjective)", example: "national, cultural, natural, personal, mental", arabic: "متعلق بـ (صفة)" },
  { suffix: "-ive", meaning: "tending to, having nature of (adjective)", example: "active, creative, positive, attractive, expensive", arabic: "يميل إلى، له طبيعة (صفة)" },
  { suffix: "-tion/-ation", meaning: "process or result (noun)", example: "creation, celebration, communication, organization, invitation", arabic: "عملية أو نتيجة (اسم)" },
];
