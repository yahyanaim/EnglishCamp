export type ReflexivePronoun = {
  subject: string;
  reflexive: string;
  example: string;
  arabic: string;
};

export type ReflexiveVerb = {
  verb: string;
  meaning: string;
  example: string;
  arabic: string;
};

export const REFLEXIVE_PRONOUNS: ReflexivePronoun[] = [
  { subject: "I", reflexive: "myself", example: "I taught myself English.", arabic: "نفسي" },
  { subject: "You", reflexive: "yourself", example: "You should enjoy yourself.", arabic: "نفسك" },
  { subject: "He", reflexive: "himself", example: "He hurt himself playing football.", arabic: "نفسه" },
  { subject: "She", reflexive: "herself", example: "She introduced herself to the class.", arabic: "نفسها" },
  { subject: "It", reflexive: "itself", example: "The machine turned itself off.", arabic: "نفسه" },
  { subject: "We", reflexive: "ourselves", example: "We enjoyed ourselves at the party.", arabic: "أنفسنا" },
  { subject: "You (pl)", reflexive: "yourselves", example: "Help yourselves to some cake.", arabic: "أنفسكم" },
  { subject: "They", reflexive: "themselves", example: "They taught themselves to play guitar.", arabic: "أنفسهم" },
];

export const REFLEXIVE_VERBS: ReflexiveVerb[] = [
  { verb: "enjoy oneself", meaning: "to have fun", example: "I enjoyed myself at the concert.", arabic: "يستمتع" },
  { verb: "teach oneself", meaning: "to learn without help", example: "She taught herself Spanish.", arabic: "يعلم نفسه" },
  { verb: "hurt oneself", meaning: "to cause pain to oneself", example: "He hurt himself while running.", arabic: "يؤذي نفسه" },
  { verb: "cut oneself", meaning: "to accidentally cut", example: "I cut myself while chopping onions.", arabic: "يجرح نفسه" },
  { verb: "introduce oneself", meaning: "to present oneself", example: "Let me introduce myself.", arabic: "يقدم نفسه" },
  { verb: "behave oneself", meaning: "to act properly", example: "Please behave yourselves at the museum.", arabic: "يتصرف بشكل لائق" },
  { verb: "express oneself", meaning: "to communicate thoughts", example: "She expressed herself clearly.", arabic: "يعبر عن نفسه" },
  { verb: "remind oneself", meaning: "to remember", example: "I reminded myself to buy milk.", arabic: "يذكر نفسه" },
  { verb: "pride oneself on", meaning: "to be proud of", example: "He prides himself on his cooking.", arabic: "يفتخر بنفسه" },
  { verb: "blame oneself", meaning: "to hold oneself responsible", example: "Don't blame yourself for the mistake.", arabic: "يلوم نفسه" },
  { verb: "convince oneself", meaning: "to persuade oneself", example: "I convinced myself it was the right choice.", arabic: "يقنع نفسه" },
  { verb: "prepare oneself", meaning: "to get ready", example: "She prepared herself for the interview.", arabic: "يجهز نفسه" },
  { verb: "protect oneself", meaning: "to keep safe", example: "You should protect yourself from the sun.", arabic: "يحمي نفسه" },
  { verb: "amuse oneself", meaning: "to have a good time", example: "The children amused themselves all afternoon.", arabic: "يسلي نفسه" },
  { verb: "tell oneself", meaning: "to say to oneself", example: "I told myself everything would be fine.", arabic: "يقول لنفسه" },
  { verb: "ask oneself", meaning: "to wonder", example: "She asked herself if it was worth it.", arabic: "يسأل نفسه" },

  // Emphatic reflexives
  { verb: "I myself", meaning: "emphatic - I personally", example: "I myself saw the accident.", arabic: "أنا بنفسي" },
  { verb: "you yourself", meaning: "emphatic - you personally", example: "You yourself said it was true.", arabic: "أنت بنفسك" },
  { verb: "she herself", meaning: "emphatic - she personally", example: "She herself wrote the letter.", arabic: "هي بنفسها" },
  { verb: "he himself", meaning: "emphatic - he personally", example: "He himself built the house.", arabic: "هو بنفسه" },
  { verb: "we ourselves", meaning: "emphatic - we personally", example: "We ourselves organized the event.", arabic: "نحن بأنفسنا" },
  { verb: "they themselves", meaning: "emphatic - they personally", example: "They themselves admitted the mistake.", arabic: "هم بأنفسهم" },
];
