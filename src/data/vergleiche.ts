export type ComparisonRule = {
  id: string;
  title: string;
  icon: string;
  color: string;
  explanation: string;
  formation: string;
  examples: { de: string; en: string; ar: string }[];
  subRules?: { label: string; items: string[] }[];
};

export const COMPARISON_RULES: ComparisonRule[] = [
  {
    id: "comparative-adjectives",
    title: "Comparative Adjectives (-er / more)",
    icon: "📊",
    color: "text-blue-600",
    explanation: "Comparative adjectives compare TWO things. Short adjectives (1-2 syllables) add '-er'. Longer adjectives use 'more + adjective'. The second element in the comparison is introduced by 'than'. Some adjectives have irregular comparative forms.",
    formation: "short adj + -er + than  |  more + long adj + than  |  irregular: good → better, bad → worse",
    examples: [
      { de: "My car is faster than yours.", en: "My car is faster than yours.", ar: "سيارتي أسرع من سيارتك." },
      { de: "She is taller than her brother.", en: "She is taller than her brother.", ar: "هي أطول من أخيها." },
      { de: "This book is more interesting than that one.", en: "This book is more interesting than that one.", ar: "هذا الكتاب أكثر إثارة من ذاك." },
      { de: "He is a better player than me.", en: "He is a better player than me. (irregular)", ar: "هو لاعب أفضل مني." },
      { de: "The weather today is worse than yesterday.", en: "The weather today is worse than yesterday. (irregular)", ar: "الطقس اليوم أسوأ من الأمس." },
      { de: "My Arabic is getting better every day.", en: "My Arabic is getting better every day.", ar: "عربي يتحسن كل يوم." },
    ],
    subRules: [
      { label: "Comparative rules", items: ["One syllable: add -er: tall → taller, fast → faster, big → bigger (double consonant)", "Two syllables ending in -y: -y → -ier: happy → happier, easy → easier, pretty → prettier", "Two syllables (other): use more: more famous, more modern, more often", "Three+ syllables: always use more: more expensive, more beautiful, more comfortable", "Irregular: good → better, bad → worse, far → farther/further"] },
    ],
  },
  {
    id: "superlative-adjectives",
    title: "Superlative Adjectives (-est / most)",
    icon: "🏆",
    color: "text-emerald-600",
    explanation: "Superlative adjectives compare ONE thing against ALL others in a group. Short adjectives use 'the + -est'. Longer adjectives use 'the most + adjective'. Always use 'the' before a superlative. Use 'in' with groups of people/places, 'of' with time periods.",
    formation: "the + short adj + -est  |  the most + long adj  |  irregular: best, worst",
    examples: [
      { de: "He is the tallest student in the class.", en: "He is the tallest student in the class.", ar: "هو أطول طالب في الفصل." },
      { de: "This is the most expensive hotel in the city.", en: "This is the most expensive hotel in the city.", ar: "هذا أغلى فندق في المدينة." },
      { de: "She is the best singer I have ever heard.", en: "She is the best singer I have ever heard.", ar: "هي أفضل مغنية سمعتها على الإطلاق." },
      { de: "That was the worst movie of the year.", en: "That was the worst movie of the year.", ar: "كان ذلك أسوأ فيلم في العام." },
      { de: "Mount Everest is the highest mountain in the world.", en: "Mount Everest is the highest mountain in the world.", ar: "جبل إيفرست هو أعلى جبل في العالم." },
      { de: "This is the most delicious food I have ever tasted.", en: "This is the most delicious food I have ever tasted.", ar: "هذا ألذ طعام تذوقته على الإطلاق." },
    ],
    subRules: [
      { label: "Superlative rules", items: ["One syllable: the + -est: the tallest, the fastest, the biggest", "Two syllables ending in -y: the + -iest: the happiest, the easiest", "Three+ syllables: the most + adj: the most beautiful, the most expensive", "Irregular: good → best, bad → worst, far → farthest/furthest", "Spelling: big → biggest (double g), hot → hottest (double t), nice → nicest (just -st)"] },
    ],
  },
  {
    id: "as-as",
    title: "as...as (Equality Comparisons)",
    icon: "⚖️",
    color: "text-purple-600",
    explanation: "Use 'as + adjective + as' to say two things are EQUAL in some way. Use 'not as + adjective + as' to say they are NOT equal. This is the opposite of the comparative — instead of saying something is 'more', you say it has the same degree.",
    formation: "as + adjective + as (positive)  |  not as + adjective + as (negative)",
    examples: [
      { de: "She is as tall as her sister.", en: "She is as tall as her sister.", ar: "هي بنفس طول أختها." },
      { de: "My car is as fast as yours.", en: "My car is as fast as yours.", ar: "سيارتي سريعة مثل سيارتك." },
      { de: "He is not as rich as his brother.", en: "He is not as rich as his brother.", ar: "هو ليس غنياً مثل أخيه." },
      { de: "This book is as interesting as that one.", en: "This book is as interesting as that one.", ar: "هذا الكتاب ممتع مثل ذاك." },
      { de: "She sings as well as a professional singer.", en: "She sings as well as a professional singer.", ar: "هي تغني جيداً مثل مغنية محترفة." },
      { de: "The exam was not as difficult as I expected.", en: "The exam was not as difficult as I expected.", ar: "الامتحان لم يكن صعباً كما توقعت." },
    ],
    subRules: [
      { label: "Key phrases with as...as", items: ["as much as + uncountable: I earn as much as he does.", "as many as + countable: She has as many books as I do.", "as well as = also: He speaks Arabic as well as English.", "twice as + adj + as: This room is twice as big as that one.", "half as + adj + as: The bag is half as heavy as before."] },
    ],
  },
  {
    id: "the-comparative",
    title: "The + Comparative, The + Comparative",
    icon: "📈",
    color: "text-rose-600",
    explanation: "The 'the + comparative, the + comparative' structure shows that two things change together — one depends on the other. Both parts use comparative forms.",
    formation: "The + comparative + subject + verb, the + comparative + subject + verb",
    examples: [
      { de: "The more you study, the more you learn.", en: "The more you study, the more you learn.", ar: "كلما درست أكثر، تعلمت أكثر." },
      { de: "The longer I wait, the more impatient I become.", en: "The longer I wait, the more impatient I become.", ar: "كلما طال انتظاري، زاد نفاد صبري." },
      { de: "The more expensive the restaurant, the better the food.", en: "The more expensive the restaurant, the better the food.", ar: "كلما كان المطعم أغلى، كان الطعام أفضل." },
      { de: "The faster we work, the sooner we finish.", en: "The faster we work, the sooner we finish.", ar: "كلما عملنا أسرع، انتهينا مبكراً." },
      { de: "The earlier we leave, the less traffic we will face.", en: "The earlier we leave, the less traffic we will face.", ar: "كلما غادرنا مبكراً، قلّت حركة المرور." },
      { de: "The more you practice, the better you become.", en: "The more you practice, the better you become.", ar: "كلما مارست أكثر، أصبحت أفضل." },
    ],
    subRules: [
      { label: "Important rules", items: ["Always use 'the' before BOTH comparatives: The more... the more... (NOT: More... more...)", "Verb can be omitted when meaning is clear: The more, the merrier.", "Can use nouns: The more money, the more problems.", "Can use adverbs: The faster you run, the sooner you arrive."] },
    ],
  },
  {
    id: "comparison-quantity",
    title: "Comparisons with Quantity (more/less/fewer)",
    icon: "🔢",
    color: "text-cyan-600",
    explanation: "English distinguishes between countable and uncountable nouns in comparisons. 'More' is used with ALL nouns. 'Fewer' is used with countable nouns (books, people, chairs). 'Less' is used with uncountable nouns (water, money, time). This is an important distinction for Arabic speakers.",
    formation: "more + any noun  |  fewer + countable noun  |  less + uncountable noun",
    examples: [
      { de: "I have more books than you.", en: "I have more books than you.", ar: "لدي كتب أكثر منك." },
      { de: "She has more patience than him.", en: "She has more patience than him.", ar: "لديها صبر أكثر منه." },
      { de: "He drinks less coffee than his brother.", en: "He drinks less coffee than his brother.", ar: "يشرب قهوة أقل من أخيه." },
      { de: "There are fewer students in this class.", en: "There are fewer students in this class.", ar: "هناك عدد أقل من الطلاب في هذا الفصل." },
      { de: "I have as much money as he does.", en: "I have as much money as he does.", ar: "لدي مال بقدر ما لديه." },
      { de: "She has as many friends as her sister.", en: "She has as many friends as her sister.", ar: "لديها أصدقاء بقدر ما لدى أختها." },
    ],
    subRules: [
      { label: "Quantity comparison patterns", items: ["more + any noun: more time, more books, more water", "fewer + countable: fewer chairs, fewer people, fewer options", "less + uncountable: less sugar, less traffic, less work", "as much as + uncountable: as much time as, as much money as", "as many as + countable: as many books as, as many friends as", "Common mistake: ✗ less people → ✓ fewer people (people is countable)"] },
    ],
  },
  {
    id: "adverb-comparison",
    title: "Comparing with Adverbs",
    icon: "🎯",
    color: "text-indigo-600",
    explanation: "Adverbs can also be compared. Short adverbs (one syllable) add '-er' and '-est'. Longer adverbs use 'more' and 'most'. Some adverbs have irregular forms like 'well → better → best' and 'badly → worse → worst'.",
    formation: "short adverb + -er/-est  |  more/most + long adverb  |  irregular forms",
    examples: [
      { de: "He runs faster than me.", en: "He runs faster than me.", ar: "يركض أسرع مني." },
      { de: "She speaks more clearly than him.", en: "She speaks more clearly than him.", ar: "تتحدث بوضوح أكثر منه." },
      { de: "He arrived earlier than expected.", en: "He arrived earlier than expected.", ar: "وصل أبكر من المتوقع." },
      { de: "She works the hardest in the team.", en: "She works the hardest in the team.", ar: "هي تعمل بأقصى جهد في الفريق." },
      { de: "Of all the students, he studied the most carefully.", en: "Of all the students, he studied the most carefully.", ar: "من بين جميع الطلاب، درس بأكبر قدر من العناية." },
      { de: "He did worse on the second test.", en: "He did worse on the second test.", ar: "أدى بشكل أسوأ في الاختبار الثاني." },
    ],
    subRules: [
      { label: "Adverb comparison patterns", items: ["One syllable: fast → faster → fastest, hard → harder → hardest, early → earlier → earliest", "Two+ syllables (ending in -ly): carefully → more carefully → most carefully", "Irregular: well → better → best, badly → worse → worst, far → farther/further → farthest/furthest", "Often/quickly: can use either more/less or -er/-est depending on the word"] },
    ],
  },
];

export const IRREGULAR_TABLE = [
  { positive: "good", comparative: "better", superlative: "best", positiveAr: "جيد", comparativeAr: "أفضل", superlativeAr: "الأفضل" },
  { positive: "bad", comparative: "worse", superlative: "worst", positiveAr: "سيئ", comparativeAr: "أسوأ", superlativeAr: "الأسوأ" },
  { positive: "far", comparative: "farther / further", superlative: "farthest / furthest", positiveAr: "بعيد", comparativeAr: "أبعد", superlativeAr: "الأبعد" },
  { positive: "much / many", comparative: "more", superlative: "most", positiveAr: "كثير", comparativeAr: "أكثر", superlativeAr: "الأكثر" },
  { positive: "little", comparative: "less", superlative: "least", positiveAr: "قليل", comparativeAr: "أقل", superlativeAr: "الأقل" },
  { positive: "well", comparative: "better", superlative: "best", positiveAr: "جيداً", comparativeAr: "أفضل", superlativeAr: "الأفضل" },
];
