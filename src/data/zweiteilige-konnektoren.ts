export type CorrelativeConjunction = {
  conjunction: string;
  usage: string;
  example: string;
  exampleEn: string;
  arabic: string;
};

export const CORRELATIVE_CONJUNCTIONS: CorrelativeConjunction[] = [
  {
    conjunction: "both...and",
    usage: "Used to connect two equal elements, emphasizing that both are included.",
    example: "عليها مسؤوليات تجاه الشركة والعملاء.",
    exampleEn: "She has responsibilities towards both the company and the clients.",
    arabic: "سواء...و/كل من...و",
  },
  {
    conjunction: "both...and",
    usage: "Can connect subjects, objects, adjectives, or phrases.",
    example: "الطالب مجتهد ومحترم في نفس الوقت.",
    exampleEn: "The student is both hardworking and respectful.",
    arabic: "كل من...و",
  },
  {
    conjunction: "both...and",
    usage: "When connecting two subjects, the verb is always plural.",
    example: "كل من المدير والموظفين يحضرون الاجتماع.",
    exampleEn: "Both the manager and the employees attend the meeting.",
    arabic: "كل من...و",
  },
  {
    conjunction: "either...or",
    usage: "Presents two alternatives — one of them must be chosen. In positive sentences.",
    example: "يمكننا إما السفر بالقطار أو بالطائرة.",
    exampleEn: "We can either travel by train or by plane.",
    arabic: "إما...أو",
  },
  {
    conjunction: "either...or",
    usage: "When both subjects are singular, the verb is singular. If the second subject is plural, the verb is plural.",
    example: "إما هو أو هم سيتولون المسؤولية.",
    exampleEn: "Either he or they will take responsibility.",
    arabic: "إما...أو",
  },
  {
    conjunction: "either...or",
    usage: "The choice is between two options, and the second option is not necessarily negative.",
    example: "يمكنك إما البقاء أو المغادرة الآن.",
    exampleEn: "You can either stay or leave now.",
    arabic: "إما...أو",
  },
  {
    conjunction: "neither...nor",
    usage: "Negates both options. It is the negative form of 'both...and'. The verb agrees with the subject closest to it.",
    example: "لا هو ولا أخوه يتحدثان الإنجليزية.",
    exampleEn: "Neither he nor his brother speaks English.",
    arabic: "لا...ولا",
  },
  {
    conjunction: "neither...nor",
    usage: "Can connect nouns, verbs, adjectives, or whole phrases.",
    example: "إنها ليست ذكية ولا مجتهدة.",
    exampleEn: "She is neither intelligent nor hardworking.",
    arabic: "لا...ولا",
  },
  {
    conjunction: "neither...nor",
    usage: "Use 'neither...nor' instead of 'either...or' with a negative verb for formal style.",
    example: "الفيلم لم يكن ممتعاً ولا قصيراً.",
    exampleEn: "The film was neither entertaining nor short.",
    arabic: "لا...ولا",
  },
  {
    conjunction: "not only...but also",
    usage: "Emphasizes that the second element is an additional, often surprising point. Similar to 'both...and' but with more emphasis on the second item.",
    example: "إنها لا تتحدث الإنجليزية فحسب، بل أيضاً الفرنسية.",
    exampleEn: "She speaks not only English but also French.",
    arabic: "ليس فقط...بل أيضاً",
  },
  {
    conjunction: "not only...but also",
    usage: "When placed at the beginning of a sentence, 'not only' triggers subject-verb inversion in the first clause.",
    example: "لم يخسر المباراة فحسب، بل أصيب أيضاً.",
    exampleEn: "Not only did he lose the match, but he also got injured.",
    arabic: "ليس فقط...بل أيضاً",
  },
  {
    conjunction: "not only...but also",
    usage: "The verb after 'but also' must match the subject that follows it.",
    example: "ليس فقط الطلاب بل أيضاً المعلم استمتع بالرحلة.",
    exampleEn: "Not only the students but also the teacher enjoyed the trip.",
    arabic: "ليس فقط...بل أيضاً",
  },
  {
    conjunction: "whether...or",
    usage: "Presents two possibilities or alternatives. Often used to express uncertainty or choice between two outcomes.",
    example: "سواء كنت توافق أم لا، يجب أن نقرر الآن.",
    exampleEn: "Whether you agree or not, we must decide now.",
    arabic: "سواء...أم",
  },
  {
    conjunction: "whether...or",
    usage: "Used after verbs like 'wonder', 'don't know', 'ask' to express two possibilities.",
    example: "أتساءل عما إذا كان سيأتي أم سيبقى في المنزل.",
    exampleEn: "I wonder whether he will come or stay at home.",
    arabic: "سواء...أم",
  },
  {
    conjunction: "whether...or",
    usage: "Can be used with infinitives when the subject is the same.",
    example: "لم أكن أعرف ماذا أفعل: هل أذهب أم أبقى.",
    exampleEn: "I didn't know whether to go or to stay.",
    arabic: "سواء...أم",
  },
];
