export type FamilyWord = {
  word: string;
  pos: string;
  example: string;
  arabic: string;
};

export type WordFamily = {
  root: string;
  meaning: string;
  words: FamilyWord[];
};

export const WORD_FAMILIES: WordFamily[] = [
  {
    root: "act", meaning: "to do something",
    words: [
      { word: "act", pos: "verb", example: "You need to act quickly.", arabic: "يتصرف، يفعل" },
      { word: "action", pos: "noun", example: "Actions speak louder than words.", arabic: "فعل، إجراء" },
      { word: "active", pos: "adjective", example: "She leads an active lifestyle.", arabic: "نشيط" },
      { word: "activate", pos: "verb", example: "Press the button to activate the alarm.", arabic: "يفعل، يشغل" },
      { word: "activity", pos: "noun", example: "The school offers many outdoor activities.", arabic: "نشاط" },
      { word: "actor", pos: "noun", example: "He is a famous actor.", arabic: "ممثل" },
      { word: "actress", pos: "noun", example: "She won an Oscar for Best Actress.", arabic: "ممثلة" },
      { word: "react", pos: "verb", example: "How did he react to the news?", arabic: "يتفاعل" },
      { word: "reaction", pos: "noun", example: "Her reaction was unexpected.", arabic: "رد فعل" },
      { word: "interact", pos: "verb", example: "Students interact with each other in class.", arabic: "يتفاعل (متبادل)" },
      { word: "interaction", pos: "noun", example: "Social interaction is important for children.", arabic: "تفاعل متبادل" },
      { word: "interactive", pos: "adjective", example: "The museum has interactive exhibits.", arabic: "تفاعلي" },
    ],
  },
  {
    root: "agree", meaning: "to have the same opinion",
    words: [
      { word: "agree", pos: "verb", example: "I agree with your proposal.", arabic: "يتفق" },
      { word: "agreement", pos: "noun", example: "They signed a formal agreement.", arabic: "اتفاق" },
      { word: "agreeable", pos: "adjective", example: "She is a very agreeable person.", arabic: "متفق عليه، لطيف" },
      { word: "disagree", pos: "verb", example: "I disagree with that statement.", arabic: "يختلف، لا يتفق" },
      { word: "disagreement", pos: "noun", example: "We had a disagreement about the budget.", arabic: "خلاف" },
      { word: "agreeably", pos: "adverb", example: "We were agreeably surprised.", arabic: "بشكل مرضٍ" },
    ],
  },
  {
    root: "appear", meaning: "to become visible or seem",
    words: [
      { word: "appear", pos: "verb", example: "The sun appeared from behind the clouds.", arabic: "يظهر" },
      { word: "appearance", pos: "noun", example: "Her sudden appearance surprised everyone.", arabic: "ظهور، مظهر" },
      { word: "disappear", pos: "verb", example: "The magician made the rabbit disappear.", arabic: "يختفي" },
      { word: "disappearance", pos: "noun", example: "The disappearance of the plane remains a mystery.", arabic: "اختفاء" },
      { word: "apparent", pos: "adjective", example: "It was apparent that she was upset.", arabic: "واضح، ظاهر" },
      { word: "apparently", pos: "adverb", example: "Apparently, they have already left.", arabic: "على ما يبدو" },
    ],
  },
  {
    root: "believe", meaning: "to accept as true",
    words: [
      { word: "believe", pos: "verb", example: "I believe you.", arabic: "يصدق، يعتقد" },
      { word: "belief", pos: "noun", example: "His religious beliefs are important to him.", arabic: "اعتقاد، إيمان" },
      { word: "believable", pos: "adjective", example: "The story was not very believable.", arabic: "قابل للتصديق" },
      { word: "unbelievable", pos: "adjective", example: "The special effects were unbelievable.", arabic: "لا يصدق" },
      { word: "disbelief", pos: "noun", example: "She stared at him in disbelief.", arabic: "عدم تصديق" },
      { word: "believer", pos: "noun", example: "He is a firm believer in hard work.", arabic: "مؤمن، مصدق" },
    ],
  },
  {
    root: "care", meaning: "to feel concern or interest",
    words: [
      { word: "care", pos: "verb", example: "I don't care what they think.", arabic: "يهتم، يبالي" },
      { word: "care", pos: "noun", example: "Handle the glass with care.", arabic: "عناية، حذر" },
      { word: "careful", pos: "adjective", example: "Be careful when crossing the street.", arabic: "حذر" },
      { word: "careless", pos: "adjective", example: "That was a careless mistake.", arabic: "متهور، غير حذر" },
      { word: "carefully", pos: "adverb", example: "Listen carefully to the instructions.", arabic: "بحذر، بانتباه" },
      { word: "carelessly", pos: "adverb", example: "He threw his clothes carelessly on the floor.", arabic: "بإهمال" },
      { word: "carefree", pos: "adjective", example: "Children live a carefree life.", arabic: "خالٍ من الهموم" },
      { word: "caregiver", pos: "noun", example: "She works as a caregiver for the elderly.", arabic: "مقدم رعاية" },
    ],
  },
  {
    root: "collect", meaning: "to bring together",
    words: [
      { word: "collect", pos: "verb", example: "He collects stamps from around the world.", arabic: "يجمع" },
      { word: "collection", pos: "noun", example: "She has an impressive art collection.", arabic: "مجموعة" },
      { word: "collector", pos: "noun", example: "The antique collector found a rare vase.", arabic: "جامع" },
      { word: "collective", pos: "adjective", example: "It was a collective effort by the team.", arabic: "جماعي" },
      { word: "collectively", pos: "adverb", example: "They decided collectively to change the plan.", arabic: "بشكل جماعي" },
    ],
  },
  {
    root: "connect", meaning: "to join or link together",
    words: [
      { word: "connect", pos: "verb", example: "Connect the cable to the computer.", arabic: "يوصل، يربط" },
      { word: "connection", pos: "noun", example: "There is a direct connection between the two stations.", arabic: "اتصال، ربط" },
      { word: "connector", pos: "noun", example: "You need the right connector for the cable.", arabic: "موصل" },
      { word: "disconnect", pos: "verb", example: "Please disconnect your device.", arabic: "يفصل" },
      { word: "disconnection", pos: "noun", example: "The disconnection lasted for hours.", arabic: "انفصال" },
      { word: "interconnect", pos: "verb", example: "The systems interconnect through a network.", arabic: "يرتبط ببعضه" },
      { word: "interconnection", pos: "noun", example: "The interconnection of ideas led to innovation.", arabic: "ترابط" },
    ],
  },
  {
    root: "create", meaning: "to bring into existence",
    words: [
      { word: "create", pos: "verb", example: "The artist creates beautiful paintings.", arabic: "يخلق، يبدع" },
      { word: "creation", pos: "noun", example: "The creation of the internet changed the world.", arabic: "خلق، إبداع" },
      { word: "creative", pos: "adjective", example: "She is a very creative designer.", arabic: "مبدع" },
      { word: "creativity", pos: "noun", example: "Creativity is essential in problem-solving.", arabic: "إبداع" },
      { word: "creator", pos: "noun", example: "He is the creator of the popular app.", arabic: "مبدع، منشئ" },
      { word: "recreate", pos: "verb", example: "They tried to recreate the experiment.", arabic: "يعيد خلق" },
      { word: "recreation", pos: "noun", example: "The park offers various recreational activities.", arabic: "ترفيه، استجمام" },
    ],
  },
  {
    root: "decide", meaning: "to make a choice",
    words: [
      { word: "decide", pos: "verb", example: "I need to decide which course to take.", arabic: "يقرر" },
      { word: "decision", pos: "noun", example: "Making the right decision is important.", arabic: "قرار" },
      { word: "decisive", pos: "adjective", example: "A good leader must be decisive.", arabic: "حاسم" },
      { word: "indecisive", pos: "adjective", example: "He is too indecisive to choose.", arabic: "متردد" },
      { word: "decidedly", pos: "adverb", example: "The movie was decidedly boring.", arabic: "بشكل حاسم" },
      { word: "undecided", pos: "adjective", example: "She is still undecided about her future.", arabic: "غير محدد، لم يقرر بعد" },
    ],
  },
  {
    root: "defend", meaning: "to protect from harm",
    words: [
      { word: "defend", pos: "verb", example: "Soldiers defend the country.", arabic: "يدافع عن" },
      { word: "defense", pos: "noun", example: "The team has a strong defense.", arabic: "دفاع" },
      { word: "defensive", pos: "adjective", example: "Don't be so defensive about your mistakes.", arabic: "دفاعي" },
      { word: "defendant", pos: "noun", example: "The defendant pleaded not guilty.", arabic: "متهم، مدعى عليه" },
      { word: "defender", pos: "noun", example: "He is a defender of human rights.", arabic: "مدافع" },
      { word: "indefensible", pos: "adjective", example: "His behavior was indefensible.", arabic: "لا يمكن الدفاع عنه" },
    ],
  },
  {
    root: "differ", meaning: "to be unlike or distinct",
    words: [
      { word: "differ", pos: "verb", example: "Opinions differ on this matter.", arabic: "يختلف" },
      { word: "different", pos: "adjective", example: "They come from different backgrounds.", arabic: "مختلف" },
      { word: "difference", pos: "noun", example: "There is a big difference in price.", arabic: "اختلاف" },
      { word: "differently", pos: "adverb", example: "Everyone learns differently.", arabic: "بشكل مختلف" },
      { word: "indifferent", pos: "adjective", example: "She was indifferent to his complaints.", arabic: "غير مبالٍ" },
      { word: "indifference", pos: "noun", example: "He showed complete indifference to the problem.", arabic: "لامبالاة" },
      { word: "differentiate", pos: "verb", example: "Can you differentiate between the two species?", arabic: "يفرق بين" },
    ],
  },
  {
    root: "employ", meaning: "to give work to someone",
    words: [
      { word: "employ", pos: "verb", example: "The company employs 500 people.", arabic: "يوظف" },
      { word: "employer", pos: "noun", example: "My employer offers great benefits.", arabic: "صاحب عمل" },
      { word: "employee", pos: "noun", example: "The employees went on strike.", arabic: "موظف" },
      { word: "employment", pos: "noun", example: "She is looking for employment.", arabic: "توظيف، عمل" },
      { word: "unemployment", pos: "noun", example: "Unemployment rates have risen.", arabic: "بطالة" },
      { word: "unemployed", pos: "adjective", example: "He has been unemployed for six months.", arabic: "عاطل عن العمل" },
      { word: "employable", pos: "adjective", example: "The training made them more employable.", arabic: "قابل للتوظيف" },
    ],
  },
  {
    root: "exist", meaning: "to be, to have reality",
    words: [
      { word: "exist", pos: "verb", example: "Do ghosts really exist?", arabic: "يوجد، يكون" },
      { word: "existence", pos: "noun", example: "Life came into existence billions of years ago.", arabic: "وجود" },
      { word: "existent", pos: "adjective", example: "This is the only existent copy of the document.", arabic: "موجود" },
      { word: "nonexistent", pos: "adjective", example: "Job opportunities are almost nonexistent here.", arabic: "غير موجود" },
      { word: "coexist", pos: "verb", example: "Different species coexist in the same ecosystem.", arabic: "يتعايش" },
      { word: "coexistence", pos: "noun", example: "Peaceful coexistence is the goal.", arabic: "تعايش" },
      { word: "preexist", pos: "verb", example: "The bacteria preexisted in the soil.", arabic: "كان موجوداً من قبل" },
    ],
  },
  {
    root: "express", meaning: "to convey thoughts or feelings",
    words: [
      { word: "express", pos: "verb", example: "It's important to express your feelings.", arabic: "يعبر عن" },
      { word: "expression", pos: "noun", example: "Her facial expression showed surprise.", arabic: "تعبير" },
      { word: "expressive", pos: "adjective", example: "She has very expressive eyes.", arabic: "معبر" },
      { word: "expressly", pos: "adverb", example: "I expressly told you not to do that.", arabic: "بشكل صريح" },
      { word: "expressionless", pos: "adjective", example: "His face remained expressionless.", arabic: "جامد التعبير" },
      { word: "expressively", pos: "adverb", example: "She danced expressively.", arabic: "بتعبير" },
    ],
  },
  {
    root: "inform", meaning: "to give information",
    words: [
      { word: "inform", pos: "verb", example: "Please inform us of any changes.", arabic: "يخطر، يبلغ" },
      { word: "information", pos: "noun", example: "We need more information about the event.", arabic: "معلومات" },
      { word: "informative", pos: "adjective", example: "The lecture was very informative.", arabic: "مفيد، غني بالمعلومات" },
      { word: "informer", pos: "noun", example: "The police received a tip from an informer.", arabic: "مخبر" },
      { word: "misinform", pos: "verb", example: "The article misinformed readers about the facts.", arabic: "يضلل، يعطي معلومات خاطئة" },
      { word: "misinformation", pos: "noun", example: "Social media spreads misinformation quickly.", arabic: "معلومات خاطئة" },
      { word: "uninformed", pos: "adjective", example: "He gave an uninformed opinion.", arabic: "غير ملم، غير مدرك" },
    ],
  },
  {
    root: "manage", meaning: "to be in charge of",
    words: [
      { word: "manage", pos: "verb", example: "She manages a large team.", arabic: "يدير" },
      { word: "management", pos: "noun", example: "Good management is key to success.", arabic: "إدارة" },
      { word: "manager", pos: "noun", example: "He is the general manager of the hotel.", arabic: "مدير" },
      { word: "manageable", pos: "adjective", example: "The workload is manageable.", arabic: "قابل للتحكم" },
      { word: "unmanageable", pos: "adjective", example: "The situation became unmanageable.", arabic: "لا يمكن السيطرة عليه" },
      { word: "mismanage", pos: "verb", example: "The project was mismanaged from the start.", arabic: "يسيء الإدارة" },
      { word: "overmanage", pos: "verb", example: "Don't overmanage your employees.", arabic: "يفرط في الإدارة" },
    ],
  },
];
