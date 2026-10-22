export type Nominalization = {
  wordType: string;
  base: string;
  nominalizedForm: string;
  suffix: string;
  example: string;
  arabic: string;
};

export const NOMINALIZATIONS: Nominalization[] = [
  { wordType: "verb", base: "to decide", nominalizedForm: "decision", suffix: "-ion", example: "We need to make a decision soon.", arabic: "قرار" },
  { wordType: "verb", base: "to inform", nominalizedForm: "information", suffix: "-ion", example: "Can you give me some information?", arabic: "معلومات" },
  { wordType: "verb", base: "to educate", nominalizedForm: "education", suffix: "-ion", example: "Education is the key to success.", arabic: "تعليم" },
  { wordType: "verb", base: "to communicate", nominalizedForm: "communication", suffix: "-ion", example: "Good communication is essential.", arabic: "تواصل" },
  { wordType: "verb", base: "to describe", nominalizedForm: "description", suffix: "-ion", example: "Please write a description of the product.", arabic: "وصف" },
  { wordType: "verb", base: "to explain", nominalizedForm: "explanation", suffix: "-tion", example: "Her explanation was very clear.", arabic: "شرح" },
  { wordType: "verb", base: "to imagine", nominalizedForm: "imagination", suffix: "-tion", example: "Use your imagination!", arabic: "خيال" },
  { wordType: "verb", base: "to invite", nominalizedForm: "invitation", suffix: "-tion", example: "I received an invitation to the party.", arabic: "دعوة" },
  { wordType: "verb", base: "to suggest", nominalizedForm: "suggestion", suffix: "-tion", example: "Do you have any suggestions?", arabic: "اقتراح" },
  { wordType: "verb", base: "to celebrate", nominalizedForm: "celebration", suffix: "-tion", example: "The celebration lasted all night.", arabic: "احتفال" },
  { wordType: "verb", base: "to develop", nominalizedForm: "development", suffix: "-ment", example: "The development of the project took two years.", arabic: "تطوير" },
  { wordType: "verb", base: "to improve", nominalizedForm: "improvement", suffix: "-ment", example: "There has been a significant improvement.", arabic: "تحسين" },
  { wordType: "verb", base: "to achieve", nominalizedForm: "achievement", suffix: "-ment", example: "Winning the award was a great achievement.", arabic: "إنجاز" },
  { wordType: "verb", base: "to agree", nominalizedForm: "agreement", suffix: "-ment", example: "They signed an agreement yesterday.", arabic: "اتفاق" },
  { wordType: "verb", base: "to employ", nominalizedForm: "employment", suffix: "-ment", example: "She is looking for employment.", arabic: "توظيف" },
  { wordType: "verb", base: "to enjoy", nominalizedForm: "enjoyment", suffix: "-ment", example: "The children showed great enjoyment.", arabic: "استمتاع" },
  { wordType: "verb", base: "to move", nominalizedForm: "movement", suffix: "-ment", example: "The environmental movement is growing.", arabic: "حركة" },
  { wordType: "verb", base: "to announce", nominalizedForm: "announcement", suffix: "-ment", example: "The announcement was made this morning.", arabic: "إعلان" },
  { wordType: "verb", base: "to differ", nominalizedForm: "difference", suffix: "-ence", example: "Can you see the difference between them?", arabic: "اختلاف" },
  { wordType: "verb", base: "to prefer", nominalizedForm: "preference", suffix: "-ence", example: "I have a preference for tea over coffee.", arabic: "تفضيل" },
  { wordType: "verb", base: "to refer", nominalizedForm: "reference", suffix: "-ence", example: "Please provide a reference from your teacher.", arabic: "مرجع" },
  { wordType: "verb", base: "to exist", nominalizedForm: "existence", suffix: "-ence", example: "Do you believe in the existence of aliens?", arabic: "وجود" },
  { wordType: "verb", base: "to appear", nominalizedForm: "appearance", suffix: "-ance", example: "His appearance changed over the years.", arabic: "مظهر" },
  { wordType: "verb", base: "to perform", nominalizedForm: "performance", suffix: "-ance", example: "The performance was outstanding.", arabic: "أداء" },
  { wordType: "verb", base: "to accept", nominalizedForm: "acceptance", suffix: "-ance", example: "Her acceptance of the offer was quick.", arabic: "قبول" },
  { wordType: "verb", base: "to assist", nominalizedForm: "assistance", suffix: "-ance", example: "Thank you for your assistance.", arabic: "مساعدة" },
  { wordType: "verb", base: "to fail", nominalizedForm: "failure", suffix: "-ure", example: "Failure is part of the learning process.", arabic: "فشل" },
  { wordType: "adjective", base: "happy", nominalizedForm: "happiness", suffix: "-ness", example: "Happiness comes from within.", arabic: "سعادة" },
  { wordType: "adjective", base: "kind", nominalizedForm: "kindness", suffix: "-ness", example: "She is known for her kindness.", arabic: "لطف" },
  { wordType: "adjective", base: "sad", nominalizedForm: "sadness", suffix: "-ness", example: "He couldn't hide his sadness.", arabic: "حزن" },
  { wordType: "adjective", base: "aware", nominalizedForm: "awareness", suffix: "-ness", example: "Environmental awareness is increasing.", arabic: "وعي" },
  { wordType: "adjective", base: "ill", nominalizedForm: "illness", suffix: "-ness", example: "She is recovering from a serious illness.", arabic: "مرض" },
  { wordType: "adjective", base: "dark", nominalizedForm: "darkness", suffix: "-ness", example: "The darkness made it hard to see.", arabic: "ظلام" },
  { wordType: "adjective", base: "free", nominalizedForm: "freedom", suffix: "-dom", example: "Freedom of speech is a fundamental right.", arabic: "حرية" },
  { wordType: "adjective", base: "wise", nominalizedForm: "wisdom", suffix: "-dom", example: "With age comes wisdom.", arabic: "حكمة" },
  { wordType: "adjective", base: "true", nominalizedForm: "truth", suffix: "-th", example: "Always tell the truth.", arabic: "حقيقة" },
  { wordType: "adjective", base: "long", nominalizedForm: "length", suffix: "-th", example: "The length of the river is amazing.", arabic: "طول" },
  { wordType: "adjective", base: "strong", nominalizedForm: "strength", suffix: "-th", example: "She has great inner strength.", arabic: "قوة" },
  { wordType: "verb", base: "to choose", nominalizedForm: "choice", suffix: "-ce", example: "It was a difficult choice.", arabic: "اختيار" },
  { wordType: "verb", base: "to complain", nominalizedForm: "complaint", suffix: "-t", example: "Please submit your complaint in writing.", arabic: "شكوى" },
  { wordType: "verb", base: "to respond", nominalizedForm: "response", suffix: "-se", example: "I am waiting for a response.", arabic: "رد" },
];
