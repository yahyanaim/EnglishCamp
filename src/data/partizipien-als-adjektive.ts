export type ParticipleAdjective = {
  presentParticiple: string;
  pastParticiple: string;
  meaning: string;
  examplePresent: string;
  examplePast: string;
  arabic: string;
};

export type ParticipleRule = {
  id: string;
  title: string;
  explanation: string;
  examples: string[];
};

export const PARTICIPLE_ADJECTIVES: ParticipleAdjective[] = [
  {
    presentParticiple: "interesting",
    pastParticiple: "interested",
    meaning: "causing interest / feeling interest",
    examplePresent: "The book is very interesting.",
    examplePast: "I am interested in history.",
    arabic: "مثير للاهتمام / مهتم",
  },
  {
    presentParticiple: "boring",
    pastParticiple: "bored",
    meaning: "causing boredom / feeling bored",
    examplePresent: "The lecture was boring.",
    examplePast: "The students looked bored.",
    arabic: "ممل / يشعر بالملل",
  },
  {
    presentParticiple: "exciting",
    pastParticiple: "excited",
    meaning: "causing excitement / feeling excited",
    examplePresent: "The movie was exciting.",
    examplePast: "She is excited about the trip.",
    arabic: "مثير / متحمس",
  },
  {
    presentParticiple: "confusing",
    pastParticiple: "confused",
    meaning: "causing confusion / feeling confused",
    examplePresent: "The instructions were confusing.",
    examplePast: "I am confused by the map.",
    arabic: "مربك / مرتبك",
  },
  {
    presentParticiple: "amazing",
    pastParticiple: "amazed",
    meaning: "causing amazement / feeling amazed",
    examplePresent: "The view was amazing.",
    examplePast: "We were amazed by the performance.",
    arabic: "مذهل / مذهول",
  },
  {
    presentParticiple: "frightening",
    pastParticiple: "frightened",
    meaning: "causing fear / feeling afraid",
    examplePresent: "The horror film was frightening.",
    examplePast: "The child was frightened by the noise.",
    arabic: "مخيف / خائف",
  },
  {
    presentParticiple: "disappointing",
    pastParticiple: "disappointed",
    meaning: "causing disappointment / feeling disappointed",
    examplePresent: "The result was disappointing.",
    examplePast: "She was disappointed with the score.",
    arabic: "مخيب للآمال / خائب الأمل",
  },
  {
    presentParticiple: "relaxing",
    pastParticiple: "relaxed",
    meaning: "causing relaxation / feeling relaxed",
    examplePresent: "The music is very relaxing.",
    examplePast: "I feel relaxed after the holiday.",
    arabic: "مريح / مسترخي",
  },
  {
    presentParticiple: "tiring",
    pastParticiple: "tired",
    meaning: "causing fatigue / feeling tired",
    examplePresent: "The long walk was tiring.",
    examplePast: "He was tired after work.",
    arabic: "مرهق / متعب",
  },
  {
    presentParticiple: "satisfying",
    pastParticiple: "satisfied",
    meaning: "causing satisfaction / feeling satisfied",
    examplePresent: "The meal was satisfying.",
    examplePast: "She was satisfied with the service.",
    arabic: "مرضٍ / راضٍ",
  },
  {
    presentParticiple: "embarrassing",
    pastParticiple: "embarrassed",
    meaning: "causing embarrassment / feeling embarrassed",
    examplePresent: "It was an embarrassing moment.",
    examplePast: "He felt embarrassed about his mistake.",
    arabic: "محرج / يشعر بالحرج",
  },
  {
    presentParticiple: "surprising",
    pastParticiple: "surprised",
    meaning: "causing surprise / feeling surprised",
    examplePresent: "The news was surprising.",
    examplePast: "They were surprised by the announcement.",
    arabic: "مفاجئ / متفاجئ",
  },
  {
    presentParticiple: "annoying",
    pastParticiple: "annoyed",
    meaning: "causing annoyance / feeling annoyed",
    examplePresent: "The constant noise is annoying.",
    examplePast: "I am annoyed with the delay.",
    arabic: "مزعج / منزعج",
  },
  {
    presentParticiple: "shocking",
    pastParticiple: "shocked",
    meaning: "causing shock / feeling shocked",
    examplePresent: "The revelation was shocking.",
    examplePast: "We were shocked by the news.",
    arabic: "صادم / مصدوم",
  },
  {
    presentParticiple: "inspiring",
    pastParticiple: "inspired",
    meaning: "causing inspiration / feeling inspired",
    examplePresent: "Her speech was inspiring.",
    examplePast: "He felt inspired to start writing.",
    arabic: "ملهم / مستلهم",
  },
];

export const PARTICIPLE_RULES: ParticipleRule[] = [
  {
    id: "present-participle-adj",
    title: "Present Participles (-ing) as Adjectives",
    explanation:
      "Present participles describe the person or thing that CAUSES a feeling. They describe the SOURCE of the emotion. The -ing adjective tells you what something or someone IS LIKE.",
    examples: [
      "The movie was boring. (The movie itself caused boredom.)",
      "She is an interesting speaker. (The speaker causes interest.)",
      "This is an exciting game. (The game causes excitement.)",
      "The instructions were confusing. (The instructions caused confusion.)",
      "It was a frightening experience. (The experience caused fear.)",
    ],
  },
  {
    id: "past-participle-adj",
    title: "Past Participles (-ed/-en) as Adjectives",
    explanation:
      "Past participles describe how a person FEELS about something. They show the RESULT of an emotion or action. The -ed/-en adjective describes a person's REACTION.",
    examples: [
      "I am bored with this movie. (I feel boredom.)",
      "She is interested in art. (She feels interest.)",
      "The children are excited about the party. (They feel excitement.)",
      "He was confused by the question. (He felt confusion.)",
      "The dog is frightened of thunder. (The dog feels fear.)",
    ],
  },
  {
    id: "comparing-present-past",
    title: "Comparing -ing and -ed/-en Adjectives",
    explanation:
      "The key difference: -ing adjectives describe the CAUSE (what produces the feeling), while -ed/-en adjectives describe the EFFECT (the feeling itself). If something is boring, it makes you feel bored. If a story is interesting, you become interested.",
    examples: [
      "The job is tiring, so the workers feel tired.",
      "The teacher's explanation was confusing, so the students were confused.",
      "The trip was exciting → We were excited about the trip.",
      "The news was shocking → Everyone was shocked by the news.",
      "The book is boring → I am bored with the book.",
    ],
  },
  {
    id: "common-irregular-past",
    title: "Common Irregular Past Participle Adjectives",
    explanation:
      "Some past participles used as adjectives have irregular forms ending in -en or other patterns. These are very common in everyday English.",
    examples: [
      "a broken window (from break)",
      "a written agreement (from write)",
      "a spoken promise (from speak)",
      "a hidden treasure (from hide)",
      "a stolen car (from steal)",
      "a frozen lake (from freeze)",
      "a burnt toast / a burned toast (from burn)",
      "a lost opportunity (from lose)",
    ],
  },
];
