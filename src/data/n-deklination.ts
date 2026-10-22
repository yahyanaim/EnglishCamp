export type WeakNoun = {
  singular: string;
  plural: string;
  english: string;
  arabic?: string;
};

export type NounPattern = {
  pattern: string;
  desc: string;
  descAr?: string;
  examples: WeakNoun[];
};

export const WEAK_NOUNS: WeakNoun[] = [
  { singular: "policeman", plural: "policemen", english: "policeman", arabic: "شرطي" },
  { singular: "fireman", plural: "firemen", english: "fireman", arabic: "رجل إطفاء" },
  { singular: "postman", plural: "postmen", english: "postman", arabic: "ساعي البريد" },
  { singular: "fisherman", plural: "fishermen", english: "fisherman", arabic: "صياد سمك" },
  { singular: "businessman", plural: "businessmen", english: "businessman", arabic: "رجل أعمال" },
  { singular: "cameraman", plural: "cameramen", english: "cameraman", arabic: "مصور" },
  { singular: "chairman", plural: "chairmen", english: "chairman", arabic: "رئيس مجلس" },
  { singular: "sportsman", plural: "sportsmen", english: "sportsman", arabic: "رياضي" },
  { singular: "salesman", plural: "salesmen", english: "salesman", arabic: "بائع" },
  { singular: "gentleman", plural: "gentlemen", english: "gentleman", arabic: "رجل محترم" },
  { singular: "Englishman", plural: "Englishmen", english: "Englishman", arabic: "إنجليزي" },
  { singular: "Frenchman", plural: "Frenchmen", english: "Frenchman", arabic: "فرنسي" },
  { singular: "child", plural: "children", english: "child", arabic: "طفل" },
  { singular: "ox", plural: "oxen", english: "ox", arabic: "ثور" },
  { singular: "foot", plural: "feet", english: "foot", arabic: "قدم" },
  { singular: "tooth", plural: "teeth", english: "tooth", arabic: "سن" },
  { singular: "goose", plural: "geese", english: "goose", arabic: "إوزة" },
  { singular: "mouse", plural: "mice", english: "mouse", arabic: "فأر" },
  { singular: "louse", plural: "lice", english: "louse", arabic: "قملة" },
  { singular: "man", plural: "men", english: "man", arabic: "رجل" },
  { singular: "woman", plural: "women", english: "woman", arabic: "امرأة" },
  { singular: "person", plural: "people", english: "person", arabic: "شخص" },
];

export const NOUN_PATTERNS: NounPattern[] = [
  {
    pattern: "-man → -men",
    desc: "Masculine nouns ending in -man change to -men in the plural. This is the most common weak noun pattern in English.",
    descAr: "الأسماء المذكرة المنتهية بـ -man تتغير إلى -men في الجمع. هذا هو أكثر أنماط الأسماء الضعيفة شيوعاً في الإنجليزية.",
    examples: [
      { singular: "policeman", plural: "policemen", english: "policeman", arabic: "شرطي" },
      { singular: "fireman", plural: "firemen", english: "fireman", arabic: "رجل إطفاء" },
      { singular: "postman", plural: "postmen", english: "postman", arabic: "ساعي البريد" },
      { singular: "businessman", plural: "businessmen", english: "businessman", arabic: "رجل أعمال" },
      { singular: "chairman", plural: "chairmen", english: "chairman", arabic: "رئيس مجلس" },
    ],
  },
  {
    pattern: "-woman → -women",
    desc: "Feminine nouns ending in -woman change to -women in the plural. Pronunciation also changes (/'wʊmən/ → /'wɪmɪn/).",
    descAr: "الأسماء المؤنثة المنتهية بـ -woman تتغير إلى -women في الجمع. يتغير النطق أيضاً.",
    examples: [
      { singular: "woman", plural: "women", english: "woman", arabic: "امرأة" },
      { singular: "policewoman", plural: "policewomen", english: "policewoman", arabic: "شرطية" },
      { singular: "businesswoman", plural: "businesswomen", english: "businesswoman", arabic: "سيدة أعمال" },
    ],
  },
  {
    pattern: "-child → -children",
    desc: "The noun 'child' takes the irregular plural 'children' (adding -ren). This is a remnant of Old English weak declension.",
    descAr: "الاسم 'child' يأخذ جمعاً غير منتظم 'children' (بإضافة -ren). هذه بقايا من الإعراب الضعيف في الإنجليزية القديمة.",
    examples: [
      { singular: "child", plural: "children", english: "child", arabic: "طفل" },
      { singular: "grandchild", plural: "grandchildren", english: "grandchild", arabic: "حفيد" },
    ],
  },
  {
    pattern: "-en plural",
    desc: "A few nouns form their plural with -en: ox → oxen. This is an Old English weak plural ending.",
    descAr: "قلة من الأسماء تشكل جمعها بـ -en: ox ← oxen. هذه هي النهاية الأصلية للجمع الضعيف في الإنجليزية القديمة.",
    examples: [
      { singular: "ox", plural: "oxen", english: "ox", arabic: "ثور" },
    ],
  },
  {
    pattern: "Vowel change",
    desc: "These nouns change the vowel (and sometimes also add a suffix) in the plural. Similar vowel change pattern.",
    descAr: "هذه الأسماء تغير حرف العلة (وأحياناً تضيف لاحقة) في الجمع. تشبه نمط تغيير حروف العلة.",
    examples: [
      { singular: "man", plural: "men", english: "man", arabic: "رجل" },
      { singular: "foot", plural: "feet", english: "foot", arabic: "قدم" },
      { singular: "tooth", plural: "teeth", english: "tooth", arabic: "سن" },
      { singular: "goose", plural: "geese", english: "goose", arabic: "إوزة" },
      { singular: "mouse", plural: "mice", english: "mouse", arabic: "فأر" },
      { singular: "louse", plural: "lice", english: "louse", arabic: "قملة" },
    ],
  },
  {
    pattern: "-person → -people",
    desc: "The noun 'person' has an irregular plural 'people'. 'Persons' is formal/legal use; 'people' is the standard plural.",
    descAr: "الاسم 'person' له جمع غير منتظم 'people'. 'Persons' للاستخدام الرسمي/القانوني؛ 'people' هو الجمع القياسي.",
    examples: [
      { singular: "person", plural: "people", english: "person", arabic: "شخص" },
      { singular: "salesperson", plural: "salespeople", english: "salesperson", arabic: "بائع" },
    ],
  },
];

export type WeakNounRule = {
  id: string;
  title: string;
  titleAr?: string;
  icon: string;
  color: string;
  explanation: string;
  explanationAr?: string;
  formation: string;
  formationAr?: string;
  examples: { en: string; ar?: string }[];
  subRules?: { label: string; items: string[] }[];
};

export const WEAK_NOUN_RULES: WeakNounRule[] = [
  {
    id: "was-ist-schwache-noemer",
    title: "What Are Weak Nouns in English?",
    titleAr: "ما هي الأسماء الضعيفة في الإنجليزية؟",
    icon: "📋",
    color: "text-blue-600",
    explanation: "Weak nouns in English are nouns that form their plural not by adding -s or -es, but by changing their internal vowel or adding a different suffix. These are remnants of Old English declension patterns and must be memorized individually.",
    explanationAr: "الأسماء الضعيفة في الإنجليزية هي أسماء لا تشكل جمعها بإضافة -s أو -es، بل بتغيير حرف العلة الداخلي أو إضافة لاحقة مختلفة. هذه بقايا من أنماط الإعراب في الإنجليزية القديمة ويجب حفظها بشكل فردي.",
    formation: "Singular → Plural (vowel change or -en suffix or -ren suffix)",
    formationAr: "مفرد → جمع (تغيير حرف علة أو لاحقة -en أو لاحقة -ren)",
    examples: [
      { en: "The policeman helped the tourists. (singular)", ar: "ساعد الشرطي السائحين. (مفرد)" },
      { en: "Three policemen were at the station. (plural -men)", ar: "كان ثلاثة من رجال الشرطة في المحطة. (جمع -men)" },
      { en: "The child is playing in the garden. (singular)", ar: "الطفل يلعب في الحديقة. (مفرد)" },
      { en: "The children are playing in the garden. (plural -ren)", ar: "الأطفال يلعبون في الحديقة. (جمع -ren)" },
    ],
    subRules: [
      { label: "Weak noun characteristics", items: ["Plural does NOT end in -s or -es", "Often involves a vowel change (man → men, foot → feet)", "Sometimes adds a suffix (-en, -ren) instead of -s", "Many refer to people, especially occupations with -man", "These are 'weak' because they add a suffix rather than change vowel — though English mixes both strategies"] },
    ],
  },
  {
    id: "man-endings",
    title: "Nouns Ending in -man / -woman",
    titleAr: "الأسماء المنتهية بـ -man / -woman",
    icon: "👨‍💼",
    color: "text-emerald-600",
    explanation: "The most productive weak noun pattern in modern English. When a noun ends in -man (referring to a person), the plural changes -man to -men. The same applies to -woman → -women. Note the pronunciation change: /mæn/ → /men/.",
    explanationAr: "أكثر أنماط الأسماء الضعيفة إنتاجية في الإنجليزية الحديثة. عندما ينتهي اسم بـ -man (في إشارة إلى شخص)، يتغير الجمع من -man إلى -men. نفس الشيء ينطبق على -woman ← -women. لاحظ تغير النطق.",
    formation: "singular: noun + man → plural: noun + men",
    formationAr: "مفرد: اسم + man ← جمع: اسم + men",
    examples: [
      { en: "The postman delivers mail every morning.", ar: "ساعي البريد يوصل البريد كل صباح." },
      { en: "Two firemen rescued the cat from the tree.", ar: "أنقذ رجلا إطفاء القطة من الشجرة." },
      { en: "She works as a camera woman for the news channel.", ar: "تعمل مصورة للقناة الإخبارية." },
      { en: "The businessmen signed the contract yesterday.", ar: "وقع رجال الأعمال العقد أمس." },
    ],
    subRules: [
      { label: "Common -man occupations", items: ["policeman / policemen (شرطي)", "fireman / firemen (رجل إطفاء)", "postman / postmen (ساعي بريد)", "fisherman / fishermen (صياد)", "businessman / businessmen (رجل أعمال)", "cameraman / cameramen (مصور)", "chairman / chairmen (رئيس مجلس)", "salesman / salesmen (بائع)", "sportsman / sportsmen (رياضي)", "gentleman / gentlemen (رجل محترم)"] },
      { label: "Nationalities ending in -man", items: ["Englishman / Englishmen (إنجليزي)", "Frenchman / Frenchmen (فرنسي)", "Irishman / Irishmen (أيرلندي)", "Dutchman / Dutchmen (هولندي)", "Welshman / Welshmen (ويلزي)"] },
    ],
  },
  {
    id: "vowel-change",
    title: "Nouns with Vowel Change (Foot → Feet)",
    titleAr: "الأسماء التي تتغير حروف علة (Foot ← Feet)",
    icon: "🔊",
    color: "text-purple-600",
    explanation: "A small but common set of nouns change their internal vowel to form the plural. These are all very old English words that have retained their original Old English plural pattern (i-mutation). There is no rule for which vowel changes — they must be memorised.",
    explanationAr: "مجموعة صغيرة ولكن شائعة من الأسماء تغير حرف العلة الداخلي لتشكيل الجمع. كلها كلمات إنجليزية قديمة جداً احتفظت بنمط الجمع القديم في الإنجليزية. لا توجد قاعدة لأي حرف علة يتغير — يجب حفظها.",
    formation: "Singular vowel → different plural vowel",
    formationAr: "حرف علة مفرد → حرف علة جمع مختلف",
    examples: [
      { en: "One foot → Two feet. My feet hurt after walking all day.", ar: "قدم واحدة ← قدمان. تؤلمني قدماي بعد المشي طوال اليوم." },
      { en: "The dentist checked my tooth → all my teeth.", ar: "فحص طبيب الأسنان سني ← كل أسناني." },
      { en: "The goose swam in the pond → The geese swam in the pond.", ar: "سبحت الإوزة في البركة ← سبحت الإوز في البركة." },
      { en: "I saw a mouse in the kitchen → There were three mice!", ar: "رأيت فأراً في المطبخ ← كان هناك ثلاثة فئران!" },
    ],
    subRules: [
      { label: "Vowel change nouns (foot → feet group)", items: ["foot → feet (قدم) — oo → ee", "tooth → teeth (سن) — oo → ee", "goose → geese (إوزة) — oo → ee", "mouse → mice (فأر) — ou → i", "louse → lice (قملة) — ou → i", "man → men (رجل) — a → e", "woman → women (امرأة) — o → i (spelling: woman/women)"] },
    ],
  },
  {
    id: "schwache-noemer-liste",
    title: "Essential Weak Nouns Vocabulary",
    titleAr: "مفردات الأسماء الضعيفة الأساسية",
    icon: "📝",
    color: "text-amber-600",
    explanation: "Here are the most important English weak nouns to memorise. Focus on the -man nouns (most common in daily use) and the vowel-change nouns (very common basic vocabulary). These nouns are used frequently and misusing them is a clear marker of non-native speech.",
    explanationAr: "إليك أهم الأسماء الضعيفة الإنجليزية للحفظ. ركز على أسماء -man (الأكثر شيوعاً في الاستخدام اليومي) والأسماء المتغيرة الحرف (مفردات أساسية شائعة جداً). هذه الأسماء تُستخدم بكثرة وخطأها علامة واضحة على غير الناطقين بالأصلية.",
    formation: "Grouped by pattern for easier memorization",
    formationAr: "مجمعة حسب النمط لسهولة الحفظ",
    examples: [
      { en: "The chairman opened the meeting. → All chairmen agreed.", ar: "افتتح الرئيس الاجتماع. ← وافق جميع الرؤساء." },
      { en: "He is an Englishman. → There were two Englishmen.", ar: "هو إنجليزي. ← كان هناك إنجليزيان." },
      { en: "The child laughed. → The children laughed loudly.", ar: "ضحك الطفل. ← ضحك الأطفال بصوت عال." },
      { en: "She brushed her tooth. → She brushed her teeth.", ar: "فرشت سنها. ← فرشت أسنانها." },
    ],
  },
];

export const WEAK_NOUN_TABLE = [
  { pattern: "-man → -men", singular: "policeman", plural: "policemen", notes: "Most common pattern" },
  { pattern: "-woman → -women", singular: "woman", plural: "women", notes: "Pronunciation changes" },
  { pattern: "vowel change (oo→ee)", singular: "foot", plural: "feet", notes: "Old English i-mutation" },
  { pattern: "vowel change (oo→ee)", singular: "tooth", plural: "teeth", notes: "Same pattern as foot" },
  { pattern: "vowel change (ou→i)", singular: "mouse", plural: "mice", notes: "Irregular vowel shift" },
  { pattern: "-ren suffix", singular: "child", plural: "children", notes: "Only word with -ren" },
  { pattern: "-en suffix", singular: "ox", plural: "oxen", notes: "Rare Old English plural" },
  { pattern: "vowel change + suffix", singular: "person", plural: "people", notes: "Suppletion" },
];
