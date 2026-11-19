export const LISTENING_LEVELS = ["A1", "A2", "B1", "B2"] as const;
type ListeningLevel = (typeof LISTENING_LEVELS)[number];

type ListeningQuestion = {
  prompt: string;
  choices: readonly [string, string, string];
  correct: 0 | 1 | 2;
  feedback: string;
};

export type VoaListeningClip = {
  id: string;
  title: string;
  level: ListeningLevel;
  topic: string;
  description: string;
  articleId: number;
  mediaId?: number;
  seconds: number;
  excerpt?: true;
  audioUrl: string;
  transcriptExcerpt?: string;
  questions: readonly [ListeningQuestion, ListeningQuestion];
  /** Restates the reviewed fact of question `replaces`, which is then asked as true/false instead. */
  trueFalse: { statement: string; correct: boolean; feedback: string; replaces: 0 | 1 };
  /** Gap fill copied from the published transcript excerpt (only when an excerpt exists). */
  gap?: { prompt: string; answer: string };
  words: readonly { word: string; arabic: string; example: string }[];
};

export const VOA_ORIGIN = "https://learningenglish.voanews.com";
export const VOA_PODCAST_URL = VOA_ORIGIN + "/podcast/?zoneId=987";
export const voaArticleUrl = (articleId: number) => `${VOA_ORIGIN}/a/${articleId}.html`;

// Level labels are EnglishCamp's teaching estimates. Durations were read from the MP3 metadata;
// selected excerpts end before the full recording does.
export const VOA_LISTENING: readonly VoaListeningClip[] = [
  {
    id: "meet-your-neighbor", title: "Meeting a new neighbor", level: "A1", topic: "Introductions",
    description: "Anna meets Pete and spells her name at the entrance to her new home.",
    articleId: 3111026, mediaId: 3181231, seconds: 29.57,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/02/08/49485bf8-4277-47f6-9abe-617ee2473f8c.mp3",
    transcriptExcerpt: "Pete: Hi! Are you Anna?\nAnna: Yes! Hi there! Are you Pete?",
    questions: [
      {
        prompt: "How does Anna spell her name?",
        choices: ["A-N-A", "A-N-N-A", "A-N-N-E"],
        correct: 1,
        feedback: "Anna spells her name with two Ns.",
      },
      {
        prompt: "Where does Pete welcome Anna?",
        choices: ["1400 Irving Street", "1140 Irving Street", "400 Irving Street"],
        correct: 0,
        feedback: "Pete says the address is 1400 Irving Street.",
      },
    ],
    trueFalse: {statement: "Anna spells her name with one N.", correct: false, feedback: "She spells it A-N-N-A, with two Ns.", replaces: 0 },
    gap: { prompt: "Anna: Yes! Hi there! Are you ___?", answer: "Pete" },
    words: [
      {word: "nice to meet you", arabic: "تشرّفت بمقابلتك. عبارة تُقال عند التعارف لأول مرة.", example: "Hi, I'm Sara. Nice to meet you."},
      {word: "apartment", arabic: "شقة سكنية داخل مبنى يضم عدة مساكن.", example: "My apartment is on the second floor."},
    ],
  },
  {
    id: "where-are-you-from", title: "Asking where someone is from", level: "A1", topic: "Introductions",
    description: "Jonathan asks Anna where she is from and learns who she lives with.",
    articleId: 3113733, mediaId: 3185254, seconds: 48.04,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/02/10/56246d7b-5fa4-42d2-90b0-d403e6b46227.mp3",
    transcriptExcerpt: "Jonathan: Where are you from?\nAnna: I am from a small town.",
    questions: [
      {
        prompt: "Who lives with Anna?",
        choices: ["Jonathan", "Pete", "Marsha"],
        correct: 2,
        feedback: "Anna says Marsha is her roommate.",
      },
      {
        prompt: "Which apartment is Jonathan in?",
        choices: ["C2", "B4", "D7"],
        correct: 1,
        feedback: "Jonathan lives in B4. C2 is Anna’s apartment, and D7 is Pete’s.",
      },
    ],
    trueFalse: {statement: "Marsha is Anna’s roommate.", correct: true, feedback: "Anna says Marsha is her roommate.", replaces: 0 },
    gap: { prompt: "Anna: I am from a small ___.", answer: "town" },
    words: [
      {word: "small town", arabic: "بلدة صغيرة، أي مكان سكني أصغر من مدينة كبيرة.", example: "I grew up in a small town near the sea."},
      {word: "roommate", arabic: "زميل سكن يشاركك المنزل أو الشقة.", example: "My roommate and I share a kitchen."},
    ],
  },
  {
    id: "find-a-pen", title: "Finding a pen in your bag", level: "A1", topic: "Everyday objects",
    description: "A friend asks Anna for a pen, and Anna looks through her bag.",
    articleId: 3168920, mediaId: 3209933, seconds: 89.26,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/02/26/af0324f6-67c5-4c0c-ab42-abb0cd33817c.mp3",
    questions: [
      {
        prompt: "Who asks Anna for a pen?",
        choices: ["Marsha", "Pete", "Jonathan"],
        correct: 0,
        feedback: "Marsha is the friend who needs a pen.",
      },
      {
        prompt: "What does Anna pull out of her bag first?",
        choices: ["A map", "A book", "A lamp"],
        correct: 1,
        feedback: "Pete identifies the first thing she takes out. It’s a big book.",
      },
    ],
    trueFalse: {statement: "The first thing Anna pulls out of her bag is a book.", correct: true, feedback: "She finds a book before anything else.", replaces: 1 },
    words: [
      {word: "bag", arabic: "حقيبة تُستخدم لحمل الأغراض الشخصية.", example: "I put my keys in my bag."},
      {word: "pillow", arabic: "وسادة تضع عليها رأسك عند النوم أو الراحة.", example: "There is a pillow on the sofa."},
    ],
  },
  {
    id: "check-the-weather", title: "Checking the weather before going out", level: "A1", topic: "Weather",
    description: "Anna asks her phone about the weather before going outside.",
    articleId: 3261789, mediaId: 3265082, seconds: 121.86,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/04/01/fe67e651-87d0-4b62-9c68-749b2d3c2f21.mp3",
    questions: [
      {
        prompt: "What temperature does the phone give Anna?",
        choices: ["Eight degrees", "Thirty degrees", "Eighteen degrees"],
        correct: 2,
        feedback: "The phone reports eighteen degrees Celsius.",
      },
      {
        prompt: "Why is the forecast wrong for Anna?",
        choices: ["It is for another city.", "It is for tomorrow.", "It is for the evening."],
        correct: 0,
        feedback: "The phone is giving the forecast for Mexico City, while Anna is in Washington, D.C.",
      },
    ],
    trueFalse: {statement: "The forecast on Anna’s phone is for her own city.", correct: false, feedback: "The forecast is wrong for Anna because it is for another city.", replaces: 1 },
    words: [
      {word: "forecast", arabic: "توقّع لحالة الطقس، مثل درجة الحرارة أو احتمال المطر.", example: "The forecast says it will rain tomorrow."},
      {word: "windy", arabic: "عاصف أو كثير الرياح. تُستخدم لوصف حالة الطقس.", example: "It's windy by the sea today."},
    ],
  },
  {
    id: "wrong-number", title: "Calling the wrong number", level: "A1", topic: "Phone calls",
    description: "Anna wants to cook dinner and calls Marsha to find a supermarket.",
    articleId: 3126527, mediaId: 3196079, seconds: 120.31,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/02/18/a82baaf4-0a91-4d43-8ab6-78f72cef8fce.mp3",
    transcriptExcerpt: "Anna: Hello. Is this Marsha? It is Anna.\nMan: I am sorry. You have the wrong number.",
    questions: [
      {
        prompt: "Which number does Anna call first by mistake?",
        choices: ["555-8689", "555-8986", "555-1500"],
        correct: 0,
        feedback: "She reaches a man at 555-8689. Marsha’s work number is 555-8986.",
      },
      {
        prompt: "Where is the supermarket?",
        choices: ["1500 Irving Street", "1400 Irving Street", "1500 Pine Street"],
        correct: 0,
        feedback: "Marsha says the supermarket is at 1500 Irving Street, near the apartment.",
      },
    ],
    trueFalse: {statement: "The supermarket is far from the apartment.", correct: false, feedback: "It is near the apartment, at 1500 Irving Street.", replaces: 1 },
    gap: { prompt: "Man: I am sorry. You have the wrong ___.", answer: "number" },
    words: [
      {word: "wrong number", arabic: "رقم خاطئ. تُقال عندما تتصل بالشخص الخطأ.", example: "Sorry, you have the wrong number."},
      {word: "supermarket", arabic: "متجر كبير لبيع المواد الغذائية وحاجات البيت.", example: "There is a supermarket near my home."},
    ],
  },
  {
    id: "rooms-in-a-house", title: "Rooms in a house", level: "A1", topic: "Home",
    description: "Anna and Marsha visit a friend’s house and say what they do in each room.",
    articleId: 3168971, mediaId: 3215124, seconds: 60.64,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/03/01/ab9c2944-eddc-4806-9296-290bfa8c6ff2.mp3",
    transcriptExcerpt: "Anna: I eat in the kitchen.\nMarsha: We relax in the living room.",
    questions: [
      {
        prompt: "What does Anna do in the bathroom?",
        choices: ["She washes.", "She sleeps.", "She cooks."],
        correct: 0,
        feedback: "Anna says: I wash in the bathroom.",
      },
      {
        prompt: "Where do they sleep?",
        choices: ["In the bedroom", "In the living room", "In the kitchen"],
        correct: 0,
        feedback: "Marsha says they sleep in the bedroom.",
      },
    ],
    trueFalse: {statement: "Anna sleeps in the bathroom.", correct: false, feedback: "She washes in the bathroom. They sleep in the bedroom.", replaces: 0 },
    gap: { prompt: "Marsha: We relax in the living ___.", answer: "room" },
    words: [
      {word: "living room", arabic: "غرفة المعيشة أو الجلوس في البيت.", example: "We watch TV in the living room."},
      {word: "upstairs", arabic: "في الطابق العلوي.", example: "The bedrooms are upstairs."},
    ],
  },
  {
    id: "first-day-at-work", title: "First day at work", level: "A1", topic: "Work",
    description: "Anna starts her new job and meets coworkers who are all busy.",
    articleId: 3240468, mediaId: 3240442, seconds: 149.88,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/03/16/5d724fbc-a907-4a48-9221-c1813d248168.mp3",
    transcriptExcerpt: "Caty: I am your boss, Caty Weaver. But, please call me Caty.\nAnna: Thank you, Ms. Weaver.",
    questions: [
      {
        prompt: "What does Anna’s boss ask Anna to call her?",
        choices: ["Caty", "Ms. Weaver", "Boss"],
        correct: 0,
        feedback: "She says: please call me Caty. Anna still says Ms. Weaver.",
      },
      {
        prompt: "What is Jonathan doing when Anna comes in?",
        choices: ["Recording his show", "Writing a letter", "Reading the news"],
        correct: 0,
        feedback: "Jonathan is doing his show, and then he has to record again.",
      },
    ],
    trueFalse: {statement: "Caty asks Anna to call her Ms. Weaver.", correct: false, feedback: "She asks Anna to call her Caty.", replaces: 0 },
    gap: { prompt: "Anna: Thank you, Ms. ___.", answer: "Weaver" },
    words: [
      {word: "boss", arabic: "المدير أو الرئيس في العمل.", example: "My boss gives me new work every morning."},
      {word: "busy", arabic: "مشغول، لديه عمل كثير الآن.", example: "I can’t talk now. I’m busy."},
    ],
  },
  {
    id: "errands-in-the-neighborhood", title: "Errands in the neighborhood", level: "A1", topic: "Neighborhood",
    description: "Anna needs the library, a mailbox, a bank and stamps, and Marsha helps her find them.",
    articleId: 3293986, mediaId: 3294378, seconds: 110.51,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/04/20/de238e35-97b9-4c21-81e3-e3c26fbeccaa.mp3",
    transcriptExcerpt: "Anna: Hello! DC is a city for walking. In our neighborhood, I can do all my errands.",
    questions: [
      {
        prompt: "How many books does Anna need to return?",
        choices: ["Three", "Two", "Four"],
        correct: 0,
        feedback: "She needs to return three books to the library.",
      },
      {
        prompt: "Why does Anna go to the bank?",
        choices: ["She needs cash for stamps.", "She needs a new card.", "She works there."],
        correct: 0,
        feedback: "She needs cash to buy stamps, and there is a bank behind her.",
      },
    ],
    trueFalse: {statement: "Anna goes to the bank because she needs cash.", correct: true, feedback: "She needs cash for stamps, so she goes to the bank behind her.", replaces: 1 },
    gap: { prompt: "Anna: Hello! DC is a city for ___.", answer: "walking" },
    words: [
      {word: "errand", arabic: "مشوار قصير لإنجاز حاجة، مثل الذهاب إلى البنك أو البريد.", example: "I have two errands: the bank and the post office."},
      {word: "stamp", arabic: "طابع بريدي يوضع على الرسالة.", example: "I need a stamp for this letter."},
    ],
  },
  {
    id: "saying-sorry-at-work", title: "Saying sorry at work", level: "A1", topic: "Work",
    description: "Anna says sorry to her busy coworkers, and her boss asks her to come to her office at 5 p.m.",
    articleId: 3253185, mediaId: 3255158, seconds: 118.56,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/03/25/ae6c5055-13ae-485b-995d-b347125ecf10.mp3",
    transcriptExcerpt: "Anna: Hi, Jonathan. Are you busy?\nJonathan: Yes, I’m busy. When the studio light is on, I am recording my evening show.",
    questions: [
      {
        prompt: "What time does Anne write every day?",
        choices: ["At 10 a.m.", "At 5 p.m.", "In the evening"],
        correct: 0,
        feedback: "Anne says: At 10 a.m. I am writing. Every day I do my morning show.",
      },
      {
        prompt: "What happens in Ms. Weaver’s office?",
        choices: ["Her coworkers give her a surprise party.", "Anna loses her job.", "Anna records a show."],
        correct: 0,
        feedback: "Her coworkers shout “Surprise!” It is a party, and she still has her job.",
      },
    ],
    trueFalse: {statement: "Anne writes every day at 10 a.m.", correct: true, feedback: "Anne says: At 10 a.m. I am writing.", replaces: 0 },
    gap: { prompt: "Jonathan: Yes, I’m busy. When the studio light is on, I am recording my evening ___.", answer: "show" },
    words: [
      {word: "apologize", arabic: "يعتذر عن خطأ.", example: "I want to apologize for being late."},
      {word: "surprise", arabic: "مفاجأة؛ شيء لم تتوقعه.", example: "Surprise! Happy birthday!"},
    ],
  },
  {
    id: "family-photos", title: "Family photos", level: "A1", topic: "Family",
    description: "Anna feels homesick and shows Marsha photos of her very different family.",
    articleId: 3301733, mediaId: 3306214, seconds: 189.43,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/04/28/d1527ef7-587d-45b5-b3cc-fecbe37167ab.mp3",
    transcriptExcerpt: "Marsha: What's wrong?\nAnna: I'm thinking about my family. I'm feeling homesick.",
    questions: [
      {
        prompt: "What job do Anna’s parents have?",
        choices: ["They are rodeo clowns.", "They are chicken farmers.", "They are teachers."],
        correct: 0,
        feedback: "Anna says her mother and father are rodeo clowns.",
      },
      {
        prompt: "Who makes spoons?",
        choices: ["Aunt Lavender", "Uncle John", "Anna’s cousins"],
        correct: 0,
        feedback: "Aunt Lavender loves gardening and makes spoons.",
      },
    ],
    trueFalse: {statement: "Uncle John makes spoons.", correct: false, feedback: "Aunt Lavender makes spoons. Uncle John is a chicken farmer and makes guitars.", replaces: 1 },
    gap: { prompt: "Anna: I'm thinking about my family. I'm feeling ___.", answer: "homesick" },
    words: [
      {word: "homesick", arabic: "يشتاق إلى بيته وأهله عندما يكون بعيدًا عنهم.", example: "I feel homesick when I am far from my family."},
      {word: "cousin", arabic: "ابن أو ابنة العم أو الخال أو العمة أو الخالة.", example: "My cousins live in another city."},
    ],
  },
  {
    id: "shakespeare-birthday", title: "A birthday party for Shakespeare", level: "A1", topic: "Free time",
    description: "Anna is bored on a Sunday until she finds a birthday party for William Shakespeare.",
    articleId: 3312239, mediaId: 3317362, seconds: 129.97,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/05/05/a7673055-e023-4593-9372-06d61ee8afd9.mp3",
    transcriptExcerpt: "Rebecca: It’s a big birthday party for the writer William Shakespeare.\nAnna: This is a party for William Shakespeare?",
    questions: [
      {
        prompt: "How does Anna feel at the start of the day?",
        choices: ["Bored", "Sick", "Angry"],
        correct: 0,
        feedback: "Anna says: But today I feel bored.",
      },
      {
        prompt: "What does Anna watch at the party?",
        choices: ["A puppet show", "A football game", "A cooking class"],
        correct: 0,
        feedback: "Anna says: This is a puppet show.",
      },
    ],
    trueFalse: {statement: "Anna feels bored at the start of the day.", correct: true, feedback: "She feels bored, so she looks for something unusual to do.", replaces: 0 },
    gap: { prompt: "Rebecca: It’s a big birthday ___ for the writer William Shakespeare.", answer: "party" },
    words: [
      {word: "bored", arabic: "يشعر بالملل.", example: "I feel bored when I have nothing to do."},
      {word: "unusual", arabic: "غير عادي؛ لا يحدث كثيرًا.", example: "Seeing a queen in the street is unusual."},
    ],
  },
  {
    id: "people-watching", title: "People-watching at lunch", level: "A1", topic: "Describing people",
    description: "Anna, Ashley and Keyana compare how they look while they watch people at lunch.",
    articleId: 3343720, mediaId: 3356177, seconds: 171.30,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/05/31/b08ceeac-8274-4e2d-b678-2cd30ba31f4f.mp3",
    transcriptExcerpt: "Anna: Oh, I know her. She works in my office! Keyana, hi! Come and join us!\nKeyana: Hi Anna, how are you?",
    questions: [
      {
        prompt: "Who has blue eyes?",
        choices: ["Anna", "Ashley", "Keyana"],
        correct: 0,
        feedback: "Anna says: I have blue eyes. Ashley and Keyana have brown eyes.",
      },
      {
        prompt: "Why does Anna hide behind a bench?",
        choices: ["Her boss is coming.", "It starts to rain.", "She lost her phone."],
        correct: 0,
        feedback: "Ms. Weaver is coming, so Anna hides.",
      },
    ],
    trueFalse: {statement: "Ashley and Keyana both have blue eyes.", correct: false, feedback: "They have brown eyes. Anna has blue eyes.", replaces: 0 },
    gap: { prompt: "Anna: Oh, I know her. She works in my ___! Keyana, hi! Come and join us!", answer: "office" },
    words: [
      {word: "curly", arabic: "مجعّد (للشعر).", example: "She has long, curly hair."},
      {word: "glasses", arabic: "نظّارة.", example: "My boss wears glasses."},
    ],
  },
  {
    id: "interviewing-tourists", title: "Interviewing tourists", level: "A1", topic: "Countries",
    description: "Anna interviews tourists in Washington, D.C., about their countries, languages and favorite places.",
    articleId: 3355849, mediaId: 3359355, seconds: 205.81,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/06/02/869a701e-1242-4c34-a679-7a9454a770f1.mp3",
    transcriptExcerpt: "Anna: So, you are Bangladeshi.\nSabrina: That’s right! My nationality is Bangladeshi.",
    questions: [
      {
        prompt: "Where is Louis from?",
        choices: ["China", "Bangladesh", "Iran"],
        correct: 0,
        feedback: "Louis says: My name is Louis. And I’m from China.",
      },
      {
        prompt: "What does Sabrina like best in Washington?",
        choices: ["The Lincoln Memorial", "The art museums", "The U.S. Capitol"],
        correct: 0,
        feedback: "Sabrina says she really likes the Lincoln Memorial.",
      },
    ],
    trueFalse: {statement: "Louis speaks Chinese and English.", correct: true, feedback: "Louis says: I speak Chinese and English.", replaces: 0 },
    gap: { prompt: "Sabrina: That’s right! My ___ is Bangladeshi.", answer: "nationality" },
    words: [
      {word: "tourist", arabic: "سائح يزور مكانًا للسياحة.", example: "Many tourists visit the city in summer."},
      {word: "nationality", arabic: "الجنسية؛ البلد الذي ينتمي إليه الشخص قانونيًا.", example: "My nationality is Moroccan."},
    ],
  },
  {
    id: "just-the-facts", title: "Just the facts", level: "A1", topic: "News",
    description: "Anna reads the news for the first time, and her boss tells her to report facts, not feelings.",
    articleId: 3357748, mediaId: 3378115, seconds: 242.77,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/06/15/6581d80f-fd20-40f9-b363-3f998c3f1142.mp3",
    transcriptExcerpt: "Caty: Now, Anna, remember. When we read the news we are always reading facts. We never show our feelings.\nAnna: Sure thing, Ms. Weaver.",
    questions: [
      {
        prompt: "What is the first news story about?",
        choices: ["A lost duckling", "A car race", "A big party"],
        correct: 0,
        feedback: "The first story is about a lost duckling.",
      },
      {
        prompt: "Who wins The Race Car 500?",
        choices: ["An 80-year-old grandmother", "A young driver", "A politician"],
        correct: 0,
        feedback: "A grandmother is the first 80-year-old woman to win the race.",
      },
    ],
    trueFalse: {statement: "An 80-year-old grandmother wins the car race.", correct: true, feedback: "The second story is about an 80-year-old grandmother who wins The Race Car 500.", replaces: 1 },
    gap: { prompt: "Caty: Now, Anna, remember. When we read the news we are always reading facts. We never show our ___.", answer: "feelings" },
    words: [
      {word: "fact", arabic: "حقيقة؛ معلومة صحيحة يمكن التأكد منها.", example: "The news should report facts."},
      {word: "feeling", arabic: "شعور، مثل الحزن أو الفرح.", example: "Sad and happy are feelings."},
    ],
  },
  {
    id: "a-new-assignment", title: "A new assignment", level: "A1", topic: "Work",
    description: "The Metro is closed, so Anna walks to work, where her boss has good news and bad news.",
    articleId: 3357760, mediaId: 3384413, seconds: 170.49,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/06/20/11279270-a48f-4bca-851e-e6477329717b.mp3",
    transcriptExcerpt: "Caty: Anna, I have good news and I have bad news. Which do you want to hear first?\nAnna: The good news. No … okay, the bad news.",
    questions: [
      {
        prompt: "Why does Anna walk to work?",
        choices: ["The Metro is closed.", "She likes hot weather.", "Her car is broken."],
        correct: 0,
        feedback: "Anna says: But today it’s closed. So, I am walking to work.",
      },
      {
        prompt: "What is Anna’s new assignment?",
        choices: ["A children’s show", "Reading the news", "Writing a blog"],
        correct: 0,
        feedback: "Her skills are perfect for a new children’s show.",
      },
    ],
    trueFalse: {statement: "Anna walks to work because the Metro is closed.", correct: true, feedback: "The Metro is closed today, so she walks.", replaces: 0 },
    gap: { prompt: "Caty: Anna, I have good news and I have bad ___. Which do you want to hear first?", answer: "news" },
    words: [
      {word: "assignment", arabic: "مهمة أو عمل جديد يُكلَّف به الشخص.", example: "My boss gave me a new assignment."},
      {word: "skill", arabic: "مهارة؛ شيء تجيد فعله.", example: "Asking questions is one of her skills."},
    ],
  },
  {
    id: "helping-pete-find-a-job", title: "Helping Pete find a job", level: "A1", topic: "Jobs",
    description: "Pete needs a job, and Anna asks him questions to find his skill.",
    articleId: 3384429, mediaId: 3397373, seconds: 219.31,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/06/29/8225db0f-179b-453f-92bb-50f548175c42.mp3",
    transcriptExcerpt: "Anna: Can you write code?\nPete: Sure, c-o-l-d. How is this going to help?",
    questions: [
      {
        prompt: "Why does Pete look sad?",
        choices: ["He doesn’t have a job.", "He lost his blog.", "He can’t find Anna."],
        correct: 0,
        feedback: "Pete says: I do not have a job!",
      },
      {
        prompt: "What job does Pete decide to try?",
        choices: ["Writer", "Taxi driver", "Chef"],
        correct: 0,
        feedback: "His blog has many followers, so he decides he can be a writer.",
      },
    ],
    trueFalse: {statement: "Pete decides he can be a writer.", correct: true, feedback: "Pete says: I can be a writer! Thanks, Anna.", replaces: 1 },
    gap: { prompt: "Anna: Can you write ___?", answer: "code" },
    words: [
      {word: "follower", arabic: "متابِع؛ شخص يقرأ مدونتك أو صفحتك بانتظام.", example: "My blog has many followers."},
      {word: "chef", arabic: "طاهٍ يعمل في مطعم.", example: "The chef cooks in a restaurant."},
    ],
  },
  {
    id: "find-the-gym", title: "Finding the gym", level: "A2", topic: "Directions",
    description: "Anna looks for a place to exercise and asks people how to get there.",
    articleId: 3225958, mediaId: 3229512, seconds: 108.04,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/03/10/66b63229-1dc5-40ab-886d-1f4b891adf6b.mp3",
    transcriptExcerpt: "People in Washington like to work out!",
    questions: [
      {
        prompt: "What is directly across from the gym?",
        choices: ["The lobby", "The lounge", "The parking garage"],
        correct: 1,
        feedback: "Pete uses the lounge as the landmark across from the gym.",
      },
      {
        prompt: "Where does Anna go right after speaking to Pete for the first time?",
        choices: ["The rooftop", "The lounge", "The mailroom"],
        correct: 2,
        feedback: "Her first wrong turn takes her to the mailroom.",
      },
    ],
    trueFalse: {statement: "The lounge is directly across from the gym.", correct: true, feedback: "The lounge is directly across from the gym.", replaces: 0 },
    gap: { prompt: "People in Washington like to work ___!", answer: "out" },
    words: [
      {word: "work out", arabic: "يتمرّن أو يمارس الرياضة. هنا لا تعني العبارة «يحلّ مشكلة».", example: "I work out three times a week."},
      {word: "gym", arabic: "صالة رياضية فيها أجهزة أو مساحة للتمرين.", example: "Is there a gym near the station?"},
    ],
  },
  {
    id: "directions-to-my-place", title: "Giving directions to your home", level: "A2", topic: "Directions",
    description: "Ashley calls Anna for directions from the Metro to her apartment.",
    articleId: 3285228, mediaId: 3286224, seconds: 90.67,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/04/14/442a6a50-693e-411f-8cff-99e40d16614c.mp3",
    transcriptExcerpt: "Exit the Metro and turn right. Then at the bus station turn left. Then walk straight ahead.",
    questions: [
      {
        prompt: "Which way should Ashley turn at the bus station?",
        choices: ["Left", "Right", "Back toward the Metro"],
        correct: 0,
        feedback: "She turns right at the Metro and left at the bus station.",
      },
      {
        prompt: "Why does Ashley phone Anna a second time?",
        choices: ["She missed her Metro stop.", "She saw several coffee shops.", "She took the wrong bus."],
        correct: 1,
        feedback: "There are three coffee shops, so Anna gives her a more specific landmark.",
      },
    ],
    trueFalse: {statement: "Ashley should turn right at the bus station.", correct: false, feedback: "At the bus station, Ashley should turn left.", replaces: 0 },
    gap: { prompt: "Exit the Metro and turn ___. Then at the bus station turn left.", answer: "right" },
    words: [
      {word: "straight ahead", arabic: "إلى الأمام مباشرةً من دون انعطاف.", example: "Walk straight ahead until you see the library."},
      {word: "across from", arabic: "مقابل مكان، على الجهة الأخرى من الطريق أو المساحة.", example: "The café is across from the library."},
    ],
  },
  {
    id: "choose-an-outfit", title: "Choosing an outfit for an evening out", level: "A2", topic: "Clothes",
    description: "Anna gets advice on what to wear and tries on different clothes.",
    articleId: 3323771, mediaId: 3326063, seconds: 113.00, excerpt: true,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/05/11/f3b56fb5-23f9-4668-bae1-d98ab8967e50.mp3",
    questions: [
      {
        prompt: "Where is Anna going that evening?",
        choices: ["To a concert in the park", "To the theatre", "To a job interview"],
        correct: 1,
        feedback: "Anna is meeting friends to go to the theatre.",
      },
      {
        prompt: "What is wrong with the first dress Anna tries?",
        choices: ["It is too long.", "It is too casual.", "It is too small."],
        correct: 2,
        feedback: "Anna likes the dress, but it is too small for her.",
      },
    ],
    trueFalse: {statement: "The first dress Anna tries is too big.", correct: false, feedback: "The first dress is too small.", replaces: 1 },
    words: [
      {word: "casual", arabic: "غير رسمي. تُستخدم لوصف ملابس مريحة تناسب الحياة اليومية.", example: "The invitation says we can wear casual clothes."},
      {word: "the right size", arabic: "المقاس المناسب للشخص أو للشيء الذي تشتريه.", example: "Do you have these shoes in the right size for me?"},
    ],
  },
  {
    id: "accept-a-party-invitation", title: "Responding to a party invitation", level: "A2", topic: "Invitations",
    description: "Marsha invites Anna to a party, but Anna has an appointment the same day.",
    articleId: 3406732, mediaId: 3413985, seconds: 177.24,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/07/11/e0c9e4c4-584b-4bd7-a4d5-a4b1f7bdfa8f.mp3",
    questions: [
      {
        prompt: "Why does Anna first think she cannot go to the party?",
        choices: ["She has a driving test.", "She is working at the café.", "She has another party to go to."],
        correct: 0,
        feedback: "Anna needs to take tests to get her driver’s licence.",
      },
      {
        prompt: "What makes it possible for Anna to go?",
        choices: ["She moves her driving test to Sunday.", "The party is at night.", "Marsha offers to drive her to the test."],
        correct: 1,
        feedback: "The tests are during the day and the party is at night.",
      },
    ],
    trueFalse: {statement: "Anna has a driving test on the day of the party.", correct: true, feedback: "Her driving test is the same day, but the party is at night.", replaces: 0 },
    words: [
      {word: "driver’s license", arabic: "رخصة قيادة. هذه الكتابة شائعة في الإنجليزية الأمريكية.", example: "I got my driver’s license last year."},
      {word: "perform", arabic: "يُقدّم عرضًا أمام جمهور، مثل الغناء أو العزف.", example: "Our class will perform at the school party."},
    ],
  },
  {
    id: "planning-a-summer-show", title: "Planning a summer show", level: "A2", topic: "Holidays",
    description: "Anna and her producer Amelia plan a children’s show about summer vacations.",
    articleId: 3397314, mediaId: 3434270, seconds: 194.83,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/07/25/2dc70acb-f8c2-4e93-9e8d-e3d37348d819.mp3",
    transcriptExcerpt: "Amelia: So, Anna, what’s the plan for the show?\nAnna: First, we’re going to introduce the subject. Then we can show pictures and video.",
    questions: [
      {
        prompt: "Why isn’t Anna going on vacation this summer?",
        choices: ["She is too busy.", "She doesn’t like summer.", "She has no money."],
        correct: 0,
        feedback: "Anna says: This summer I am too busy.",
      },
      {
        prompt: "What does Amelia like to do when she goes camping?",
        choices: ["Go hiking and fishing", "Ride rollercoasters", "Swim in the sea"],
        correct: 0,
        feedback: "Amelia says: When I go camping, I like to go hiking and fishing.",
      },
    ],
    trueFalse: {statement: "Anna is going on vacation this summer.", correct: false, feedback: "She is too busy this summer. She can go next summer.", replaces: 0 },
    gap: { prompt: "Anna: First, we’re going to introduce the subject. Then we can show pictures and ___.", answer: "video" },
    words: [
      {word: "season", arabic: "فصل من فصول السنة.", example: "My favorite season is summer."},
      {word: "amusement park", arabic: "مدينة ملاهٍ فيها ألعاب وأكل.", example: "We went on rides at the amusement park."},
    ],
  },
  {
    id: "a-letter-about-a-festival", title: "A letter about a festival", level: "A2", topic: "Culture",
    description: "Anna writes to a friend about a festival on the National Mall that celebrated Basque culture.",
    articleId: 3439164, mediaId: 3440686, seconds: 157.64,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/07/29/7202578e-98dd-4e93-8a9b-166c72f520ea.mp3",
    transcriptExcerpt: "Anna: I am dancing a traditional Basque dance.\nAnna's voice: At the festival, I danced a traditional Basque dance!",
    questions: [
      {
        prompt: "What is the game played with the hands and a small ball called?",
        choices: ["Pilota", "Baseball", "Tennis"],
        correct: 0,
        feedback: "Anna says: But this game is called pilota.",
      },
      {
        prompt: "Which culture did the festival show this year?",
        choices: ["Basque culture", "Italian culture", "Chinese culture"],
        correct: 0,
        feedback: "This year one of the cultures was the Basque culture.",
      },
    ],
    trueFalse: {statement: "This year the festival showed Basque culture.", correct: true, feedback: "The festival showed Basque dancing, food, games and art.", replaces: 1 },
    gap: { prompt: "Anna's voice: At the festival, I ___ a traditional Basque dance!", answer: "danced" },
    words: [
      {word: "festival", arabic: "مهرجان؛ احتفال كبير بأنشطة متنوعة.", example: "The festival had music and food."},
      {word: "traditional", arabic: "تقليدي؛ متوارث منذ زمن طويل.", example: "They cooked traditional food."},
    ],
  },
  {
    id: "watch-out", title: "Watch out!", level: "A2", topic: "History",
    description: "Anna meets Dan, who is playing a phone game that teaches fun facts about U.S. presidents.",
    articleId: 3431138, mediaId: 3467912, seconds: 149.83,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/08/16/c98eed28-bb2e-4055-9d08-6f7834b85aa9.mp3",
    transcriptExcerpt: "Anna: Hey! Watch out!\nDan: Sorry! I didn't see you.",
    questions: [
      {
        prompt: "How many points is the bald eagle worth?",
        choices: ["100", "60", "20"],
        correct: 0,
        feedback: "Dan says the bald eagle is 100 points.",
      },
      {
        prompt: "What fun fact does Anna learn about Thomas Jefferson?",
        choices: ["He wrote about 19,000 letters.", "He flew in a plane.", "He was a great wrestler."],
        correct: 0,
        feedback: "The game says Jefferson wrote about 19,000 letters.",
      },
    ],
    trueFalse: {statement: "The American flag is worth 100 points.", correct: false, feedback: "The flag is worth 60 points. The bald eagle is worth 100.", replaces: 0 },
    gap: { prompt: "Dan: Sorry! I didn't ___ you.", answer: "see" },
    words: [
      {word: "memorial", arabic: "نصب تذكاري يُبنى تخليدًا لشخص أو حدث.", example: "We visited the Lincoln Memorial."},
      {word: "careful", arabic: "حذِر؛ ينتبه لما يفعل.", example: "You should be more careful."},
    ],
  },
  {
    id: "catch-americana", title: "Catch Americana", level: "A2", topic: "History",
    description: "Anna keeps playing the phone game at more memorials and races Dan to find the bald eagle.",
    articleId: 3457248, mediaId: 3474040, seconds: 122.24,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/08/21/5085086e-5053-401a-9f9c-826aabe8abcb.mp3",
    transcriptExcerpt: "Dan: Hey! Look out!\nAnna: Sorry. Hey, it's you! Now, I should be more careful.",
    questions: [
      {
        prompt: "What fun fact does Anna learn about Abraham Lincoln?",
        choices: ["He was a great wrestler.", "He wrote 19,000 letters.", "He was the first to fly in a plane."],
        correct: 0,
        feedback: "The game says Abraham Lincoln was a great wrestler.",
      },
      {
        prompt: "How many points has Anna won when she meets Dan again?",
        choices: ["120", "100", "60"],
        correct: 0,
        feedback: "Anna found three symbols and won 120 points.",
      },
    ],
    trueFalse: {statement: "Franklin Roosevelt was the first president to fly in a plane.", correct: true, feedback: "The fun fact says Roosevelt was the first to fly in a plane as president.", replaces: 0 },
    gap: { prompt: "Anna: Sorry. Hey, it's you! Now, I should be more ___.", answer: "careful" },
    words: [
      {word: "symbol", arabic: "رمز يمثل فكرة أو بلدًا.", example: "The bald eagle is an American symbol."},
      {word: "freedom", arabic: "الحرية.", example: "Lincoln wanted freedom for all people."},
    ],
  },
  {
    id: "calling-in-sick", title: "Calling in sick", level: "A2", topic: "Health",
    description: "Anna is sick, so she calls her boss and then her doctor for advice.",
    articleId: 3457316, mediaId: 3486695, seconds: 201.91,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/08/30/4b0918a8-33b1-4b9d-8d88-f54d8a1be9ea.mp3",
    transcriptExcerpt: "Dr. Bennett: Do you have a cough?\nAnna: Yes. I have a cough.",
    questions: [
      {
        prompt: "What did Ms. Weaver do when she had the flu?",
        choices: ["She slept and drank a lot of water.", "She went to work.", "She painted for hours."],
        correct: 0,
        feedback: "Caty says: I slept a lot and I drank a lot of water.",
      },
      {
        prompt: "Why did the thermometer first say 125 degrees?",
        choices: ["It was in her hot coffee.", "She had a very high fever.", "It was broken."],
        correct: 0,
        feedback: "The thermometer was in Anna’s hot cup of coffee.",
      },
    ],
    trueFalse: {statement: "Ms. Weaver had the flu last week.", correct: true, feedback: "Caty says: I was sick last week, too. I had the flu.", replaces: 0 },
    gap: { prompt: "Anna: Yes. I have a ___.", answer: "cough" },
    words: [
      {word: "sore throat", arabic: "التهاب أو ألم في الحلق.", example: "I have a sore throat and a cough."},
      {word: "fever", arabic: "حُمّى؛ ارتفاع حرارة الجسم.", example: "A fever of 100.5 degrees is not too high."},
    ],
  },
  {
    id: "the-driving-test", title: "The driving test", level: "A2", topic: "Driving",
    description: "Anna tells Marsha how her first driving test went wrong before she passed.",
    articleId: 3487865, mediaId: 3499400, seconds: 198.47,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/09/08/a087a1f8-4939-4f40-8612-e99605e88caf.mp3",
    transcriptExcerpt: "Marsha: Anna, did you get your driver’s license?\nAnna: I did! But it was not easy.",
    questions: [
      {
        prompt: "When did Anna pass the driving test?",
        choices: ["The second time", "The first time", "The third time"],
        correct: 0,
        feedback: "Anna says: But I did pass the second time.",
      },
      {
        prompt: "Where does Anna want to drive first?",
        choices: ["The White House", "The river", "A museum"],
        correct: 0,
        feedback: "Her first drive is to the White House, but they have to walk the last part.",
      },
    ],
    trueFalse: {statement: "Anna passed her driving test the first time.", correct: false, feedback: "She did not pass the first time. She passed the second time.", replaces: 0 },
    gap: { prompt: "Marsha: Anna, did you get your driver’s ___?", answer: "license" },
    words: [
      {word: "driver’s license", arabic: "رخصة السياقة.", example: "I passed the test and got my driver’s license."},
      {word: "traffic", arabic: "حركة المرور؛ السيارات في الطريق.", example: "Driving in city traffic made her nervous."},
    ],
  },
  {
    id: "childhood-dreams", title: "Childhood dreams", level: "A2", topic: "Dreams",
    description: "An advertisement reminds Anna of her childhood dream, and Marsha shares hers too.",
    articleId: 3509519, mediaId: 3510012, seconds: 200.45,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/09/15/e7c6ba11-8320-4bcc-8fc5-27fa4e385e23.mp3",
    transcriptExcerpt: "Marsha: That’s an advertisement for Ford’s Theatre. They have a new show.\nAnna: They have shows where Abraham Lincoln died?",
    questions: [
      {
        prompt: "What did Anna want to be as a child?",
        choices: ["President of the United States", "An astronaut", "A teacher"],
        correct: 0,
        feedback: "Anna says she wanted to be President of the United States.",
      },
      {
        prompt: "What did Marsha want to be?",
        choices: ["An astronaut", "A president", "An actor"],
        correct: 0,
        feedback: "Marsha says: I wanted to be... an astronaut.",
      },
    ],
    trueFalse: {statement: "Marsha wanted to be an astronaut.", correct: true, feedback: "Marsha studied the stars and planets and wanted to fly into outer space.", replaces: 1 },
    gap: { prompt: "Marsha: That’s an ___ for Ford’s Theatre. They have a new show.", answer: "advertisement" },
    words: [
      {word: "childhood", arabic: "الطفولة؛ فترة الصغر.", example: "Childhood dreams are important."},
      {word: "astronaut", arabic: "رائد فضاء.", example: "She wanted to be an astronaut."},
    ],
  },
  {
    id: "at-the-seafood-market", title: "At the seafood market", level: "A2", topic: "Food",
    description: "Anna buys seafood for a dinner party and meets Pete, who now works at the market.",
    articleId: 3522798, mediaId: 3527610, seconds: 199.28,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/09/27/a8dbb32b-ada5-4441-a2d1-340924241a4b.mp3",
    transcriptExcerpt: "Pete: That’ll be $49.95. Cash or credit?\nAnna: Credit, please.",
    questions: [
      {
        prompt: "How much money can Anna spend?",
        choices: ["$50", "$25", "$100"],
        correct: 0,
        feedback: "Anna says: I can only spend $50.",
      },
      {
        prompt: "How many crabs does Anna buy?",
        choices: ["A dozen", "Five", "Two"],
        correct: 0,
        feedback: "Anna asks for a dozen large crabs.",
      },
    ],
    trueFalse: {statement: "Anna can spend $100 on seafood.", correct: false, feedback: "She can only spend $50.", replaces: 0 },
    gap: { prompt: "Pete: That’ll be $49.95. Cash or ___?", answer: "credit" },
    words: [
      {word: "seafood", arabic: "مأكولات بحرية مثل السمك والروبيان.", example: "They sell fresh seafood by the river."},
      {word: "dozen", arabic: "دزينة؛ اثنا عشر.", example: "I want a dozen crabs."},
    ],
  },
  {
    id: "going-to-a-baseball-game", title: "Going to a baseball game", level: "A2", topic: "Transport",
    description: "Anna wants to see a baseball game, and her friends tell her the fastest way to get there.",
    articleId: 3535235, mediaId: 3539896, seconds: 209.88,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/10/06/81890cf1-5a16-4426-87db-fdb240c750cc.mp3",
    transcriptExcerpt: "Jonathan: Don’t take the bus. A taxi is faster than a bus.\nAnna: Oh, good idea. You know I love baseball.",
    questions: [
      {
        prompt: "What time is the game?",
        choices: ["7 o’clock", "5 o’clock", "9 o’clock"],
        correct: 0,
        feedback: "Anna tells Ashley the game is at 7 o’clock.",
      },
      {
        prompt: "How does Anna finally get to the game?",
        choices: ["By Metro", "By taxi", "By bicycle"],
        correct: 0,
        feedback: "Ashley says the Metro is faster, and Anna takes it.",
      },
    ],
    trueFalse: {statement: "The baseball game starts at 9 o’clock.", correct: false, feedback: "The game is at 7 o’clock.", replaces: 0 },
    gap: { prompt: "Jonathan: Don’t take the bus. A taxi is ___ than a bus.", answer: "faster" },
    words: [
      {word: "ticket", arabic: "تذكرة دخول أو سفر.", example: "Do you have a ticket for the game?"},
      {word: "fan", arabic: "مشجّع؛ شخص يحب رياضة أو فريقًا.", example: "Hi there, sports fans!"},
    ],
  },
  {
    id: "the-time-traveling-treehouse", title: "The Time Traveling Treehouse", level: "A2", topic: "Television",
    description: "Anna’s coworkers watch her first children’s show, where she and MINDY travel to find answers.",
    articleId: 3547306, mediaId: 3549214, seconds: 228.27,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/10/13/054d9504-47b3-4cc2-80d1-cb66fff404e4.mp3",
    transcriptExcerpt: "Anna: Hello! Today is a big day. My first children’s show is on television! Woo-hoo! I’m excited and nervous.\nMs. Weaver: Hello, Anna.",
    questions: [
      {
        prompt: "Who is MINDY?",
        choices: ["Anna’s computer partner on the show", "Anna’s boss", "A child who asks a question"],
        correct: 0,
        feedback: "MINDY is Anna’s partner: a Massive Information Navigation Device.",
      },
      {
        prompt: "What does Layla want to know?",
        choices: ["How to play baseball", "How to ski", "How to swim in the ocean"],
        correct: 0,
        feedback: "Layla asks: how do you play baseball?",
      },
    ],
    trueFalse: {statement: "Layla asks how to play baseball.", correct: true, feedback: "Layla’s question is: how do you play baseball?", replaces: 1 },
    gap: { prompt: "Anna: Hello! Today is a big day. My first children’s show is on television! Woo-hoo! I’m excited and ___.", answer: "nervous" },
    words: [
      {word: "partner", arabic: "شريك في العمل.", example: "This is my partner, MINDY!"},
      {word: "time travel", arabic: "السفر عبر الزمن.", example: "Time travel is not real, but it is fun on TV."},
    ],
  },
  {
    id: "learning-americas-sport", title: "Learning America’s sport", level: "A2", topic: "Sports",
    description: "On her show, Anna finally reaches a baseball field and explains how the game is played.",
    articleId: 3555047, mediaId: 3561047, seconds: 228.04,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/10/21/f7144253-3403-4acd-9e09-9c31443113f7.mp3",
    transcriptExcerpt: "MINDY: I will try one more time, Anna.\nAnna: Please try harder, MINDY!",
    questions: [
      {
        prompt: "How many innings are there in a baseball game?",
        choices: ["Nine", "Seven", "Ten"],
        correct: 0,
        feedback: "Anna says there are nine innings in a game.",
      },
      {
        prompt: "What do you really need to play baseball?",
        choices: ["A bat, a ball and a glove", "A racket and a net", "A helmet and skis"],
        correct: 0,
        feedback: "Anna says you only need a bat, a ball and a glove.",
      },
    ],
    trueFalse: {statement: "There are nine innings in a baseball game.", correct: true, feedback: "The team with the most runs after nine innings wins.", replaces: 0 },
    gap: { prompt: "Anna: Please try ___, MINDY!", answer: "harder" },
    words: [
      {word: "field", arabic: "ملعب.", example: "This is a baseball field."},
      {word: "team", arabic: "فريق.", example: "Each team has many players."},
    ],
  },
  {
    id: "a-halloween-costume", title: "A Halloween costume", level: "A2", topic: "Holidays",
    description: "Anna dresses as a genie for a Halloween party and tries to read people’s minds.",
    articleId: 3566043, mediaId: 3567404, seconds: 244.10,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/10/26/a9095f28-b489-4110-98fd-7ce6be485793.mp3",
    transcriptExcerpt: "Anna: Tonight, there is a Halloween party.\nGenie: I love Halloween! Are you going?",
    questions: [
      {
        prompt: "What does Rebecca study?",
        choices: ["Journalism", "Medicine", "History"],
        correct: 0,
        feedback: "Rebecca says: I study journalism.",
      },
      {
        prompt: "What will Kaveh do today?",
        choices: ["Ask his girlfriend to marry him", "Graduate from college", "Write the news"],
        correct: 0,
        feedback: "Kaveh says he will ask his girlfriend to marry him.",
      },
    ],
    trueFalse: {statement: "Rebecca studies journalism.", correct: true, feedback: "She is a junior in college and studies journalism.", replaces: 0 },
    gap: { prompt: "Anna: Tonight, there is a Halloween ___.", answer: "party" },
    words: [
      {word: "costume", arabic: "زيّ تنكّري يُلبس في الحفلات.", example: "I need a costume for the party."},
      {word: "might", arabic: "ربما؛ تعبّر عن احتمال.", example: "I might go. I might not go."},
    ],
  },
  {
    id: "the-wrong-shopping-list", title: "The wrong shopping list", level: "A2", topic: "Food",
    description: "Anna shops for a dinner party but comes home with the wrong shopping list.",
    articleId: 3571922, mediaId: 3576096, seconds: 166.65,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/11/02/0c67a47c-b66d-4d36-85f5-41dca2d12bde.mp3",
    transcriptExcerpt: "Marsha: Anna, what took you so long? Our guests will be here soon!\nAnna: Don’t worry, Marsha. I bought everything on the list.",
    questions: [
      {
        prompt: "Which shopping list did Anna take?",
        choices: ["The breakfast list", "The dinner list", "A list for a party store"],
        correct: 0,
        feedback: "Marsha says it is the shopping list for breakfast.",
      },
      {
        prompt: "When will the guests arrive?",
        choices: ["In 30 minutes", "In two hours", "Tomorrow"],
        correct: 0,
        feedback: "Marsha says: They arrive in 30 minutes!",
      },
    ],
    trueFalse: {statement: "The guests arrive in 30 minutes.", correct: true, feedback: "Marsha says the guests arrive in 30 minutes.", replaces: 1 },
    gap: { prompt: "Marsha: Anna, what took you so long? Our ___ will be here soon!", answer: "guests" },
    words: [
      {word: "ingredients", arabic: "مكوّنات الطبخ.", example: "Please buy all the ingredients on the list."},
      {word: "loaf", arabic: "رغيف خبز.", example: "I bought two loaves of bread."},
    ],
  },
  {
    id: "make-plans-with-a-friend", title: "Making plans with a friend", level: "B1", topic: "Social plans",
    description: "Two friends compare busy schedules to find a time to see a film.",
    articleId: 3355785, mediaId: 3365253, seconds: 152.50,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/06/07/3cb6442c-001f-4fd7-bf37-7507a49e89e4.mp3",
    transcriptExcerpt: "Marsha: Are you busy this Thursday at 6pm?\nAnna: Let’s see …. I’m busy.",
    questions: [
      {
        prompt: "What does Marsha usually do on Friday nights?",
        choices: ["Go jogging", "Take dance lessons", "Visit her parents"],
        correct: 2,
        feedback: "Friday is when Marsha visits her parents for dinner.",
      },
      {
        prompt: "How does Marsha make time to see the film?",
        choices: ["She moves her errands to Sunday.", "She cancels a lesson.", "She chooses a later showing."],
        correct: 0,
        feedback: "The film starts soon, so Marsha decides to do her errands the next day.",
      },
    ],
    trueFalse: {statement: "Marsha usually visits her parents on Friday nights.", correct: true, feedback: "Friday nights are for visiting her parents.", replaces: 0 },
    gap: { prompt: "Marsha: Are you busy this ___ at 6pm?", answer: "Thursday" },
    words: [
      {word: "as usual", arabic: "كالعادة. تصف شيئًا يحدث بالطريقة المعتادة.", example: "The café was busy as usual."},
      {word: "errands", arabic: "مشاوير قصيرة لإنجاز حاجات يومية مثل التسوّق أو الذهاب إلى البريد.", example: "I need to run a few errands before lunch."},
      {word: "gonna", arabic: "طريقة نطق غير رسمية لـ going to عند الحديث عن الخطط القريبة.", example: "The film is gonna start in ten minutes."},
    ],
  },
  {
    id: "choose-lunch", title: "Choosing what to order for lunch", level: "B1", topic: "Food",
    description: "Anna and her coworkers choose different foods during a lunch break.",
    articleId: 3413753, mediaId: 3437143, seconds: 177.42,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/07/27/f5ba9389-58a1-4643-9ec4-3bbfcd8c96e6.mp3",
    transcriptExcerpt: "Today I’m having lunch with my boss.",
    questions: [
      {
        prompt: "Why does Jonathan order beef?",
        choices: ["It is the cheapest dish.", "The shrimp has sold out.", "Caty asks for beef."],
        correct: 1,
        feedback: "Jonathan asks for shrimp first and switches to beef when it is unavailable.",
      },
      {
        prompt: "How much does Anna’s dish cost?",
        choices: ["$7", "$10", "$5"],
        correct: 2,
        feedback: "Anna gets $10 and gives $5 back, so her dish costs $5.",
      },
    ],
    trueFalse: {statement: "Jonathan orders beef because the shrimp has sold out.", correct: true, feedback: "The shrimp has sold out, so he orders beef.", replaces: 0 },
    gap: { prompt: "Today I’m having lunch with my ___.", answer: "boss" },
    words: [
      {word: "have lunch", arabic: "يتناول الغداء. يمكن أن تقول have lunch with عند تناول الغداء مع شخص.", example: "Would you like to have lunch with us?"},
      {word: "at noon", arabic: "عند الظهر، أي في الساعة الثانية عشرة نهارًا.", example: "Let's meet outside at noon."},
    ],
  },
  {
    id: "save-a-dinner-party", title: "Making dinner when plans change", level: "B1", topic: "Cooking",
    description: "Guests are on their way, and Anna must make dinner with the ingredients she has.",
    articleId: 3568962, mediaId: 3595539, seconds: 122.80,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/11/14/65b768cd-1b20-4074-beb4-3279d8f8e715.mp3",
    questions: [
      {
        prompt: "Where does Anna keep the flour?",
        choices: ["On the counter", "Under the sink", "In the fridge"],
        correct: 2,
        feedback: "Anna puts the flour in the fridge because the directions say to keep it in a cold, dry place.",
      },
      {
        prompt: "How does Anna solve the dinner problem?",
        choices: ["She makes pancakes with what she has.", "She sends Marsha back to the shop.", "She asks the guests to bring a meal."],
        correct: 0,
        feedback: "Anna uses the available ingredients to make peanut butter and banana pancakes.",
      },
    ],
    trueFalse: {statement: "Anna keeps her flour in the fridge.", correct: true, feedback: "Anna keeps the flour in the fridge.", replaces: 0 },
    words: [
      {word: "ingredient", arabic: "مكوّن يدخل في تحضير الطعام، مثل الدقيق أو البيض.", example: "The main ingredient in this soup is pumpkin."},
      {word: "hand me", arabic: "ناولني أو أعطني شيئًا قريبًا منك.", example: "Could you hand me that bowl?"},
      {word: "recipe", arabic: "وصفة توضّح المكوّنات وخطوات تحضير طبق.", example: "I found an easy recipe for vegetable soup."},
    ],
  },
  {
    id: "borrow-office-supplies", title: "Borrowing something at work", level: "B1", topic: "Office",
    description: "Anna asks her coworkers to lend her some office supplies for a birthday gift.",
    articleId: 3723588, mediaId: 3735665, seconds: 179.49,
    audioUrl: "https://voa-audio.voanews.eu/vle/2017/02/22/8e170a7e-dd5c-4c9b-b214-48b68bc68f47.mp3",
    questions: [
      {
        prompt: "Why does Anna decide to make the gift herself?",
        choices: ["Marsha asked for something homemade.", "She has not been paid yet.", "The birthday party is cancelled."],
        correct: 1,
        feedback: "Anna says her next paycheck comes the following week, so she makes a gift.",
      },
      {
        prompt: "What does Anna promise Jonathan about his scissors?",
        choices: ["She will use them on her lunch break.", "She will give them to Amelia.", "She will return them tomorrow."],
        correct: 2,
        feedback: "Anna promises to bring the scissors back the following day.",
      },
    ],
    trueFalse: {statement: "Anna promises to return Jonathan’s scissors next week.", correct: false, feedback: "She promises to return them tomorrow.", replaces: 1 },
    words: [
      {word: "borrow", arabic: "يستعير شيئًا لاستخدامه مؤقتًا ثم يعيده.", example: "May I borrow your charger for a few minutes?"},
      {word: "lend", arabic: "يُعير شخصًا شيئًا ليستخدمه ثم يعيده.", example: "Can you lend me a pen?"},
      {word: "paycheck", arabic: "الراتب الذي يتلقّاه الموظف في موعد الدفع. الكلمة شائعة في الإنجليزية الأمريكية.", example: "My next paycheck arrives on Friday."},
    ],
  },
  {
    id: "agree-to-disagree", title: "City or country?", level: "B1", topic: "Opinions",
    description: "Anna meets Phil, a visitor from a small town, and they share different opinions about city life.",
    articleId: 3574029, mediaId: 3601381, seconds: 217.90,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/11/17/a0f8f1e0-4d24-425c-8db5-0322d86f3de9.mp3",
    transcriptExcerpt: "Anna: We don't have to agree with people. They have their opinions. We have ours. And as we like to say, you can always agree to disagree!",
    questions: [
      {
        prompt: "Why does Phil think city people are rude?",
        choices: ["They don’t say hello to each other.", "They talk too loudly.", "They walk too fast."],
        correct: 0,
        feedback: "Phil thinks people are rude because they don’t greet each other. Anna thinks they are just busy.",
      },
      {
        prompt: "What does Anna think about the city’s buildings?",
        choices: ["They are beautiful.", "They are too tall.", "They are dirty."],
        correct: 0,
        feedback: "Anna disagrees with Phil: she thinks all the different buildings are beautiful.",
      },
    ],
    trueFalse: {statement: "Anna agrees that city people are rude.", correct: false, feedback: "Anna thinks they’re just busy.", replaces: 0 },
    gap: { prompt: "They have their opinions. We have ___.", answer: "ours" },
    words: [
      {word: "disagree", arabic: "يختلف في الرأي مع شخص آخر.", example: "I disagree. I think the city is exciting."},
      {word: "opinion", arabic: "رأي؛ ما يفكر فيه الشخص عن موضوع ما.", example: "In my opinion, the country is more peaceful."},
    ],
  },
  {
    id: "best-friend-visit", title: "A best friend visits", level: "B1", topic: "Friendship",
    description: "Anna’s best friend Penelope visits Washington, D.C., and Anna tells her about her friends and her job.",
    articleId: 3591967, mediaId: 3619110, seconds: 210.51,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/12/01/7b357de6-9247-45fd-8e49-77197599f6d5.mp3",
    transcriptExcerpt: "Penelope: So, Anna, is it hard to make friends in D.C.?",
    questions: [
      {
        prompt: "What is Anna’s job?",
        choices: ["She makes a children’s show.", "She teaches at a school.", "She works in a café."],
        correct: 0,
        feedback: "Anna makes a children’s show called the Time Traveling Treehouse.",
      },
      {
        prompt: "What does Anna suggest to Penelope?",
        choices: ["Moving to D.C.", "Finding a new job at home", "Visiting every summer"],
        correct: 0,
        feedback: "Anna asks: why don’t you move here?",
      },
    ],
    trueFalse: {statement: "Penelope says she can’t leave their hometown.", correct: true, feedback: "Penelope has a job she loves and says she can’t leave their hometown.", replaces: 1 },
    gap: { prompt: "Penelope: So, Anna, is it hard to make ___ in D.C.?", answer: "friends" },
    words: [
      {word: "hometown", arabic: "البلدة أو المدينة التي نشأ فيها الشخص.", example: "My hometown is a small city by the sea."},
      {word: "split the rent", arabic: "يتقاسم إيجار البيت مع شخص آخر.", example: "My roommate and I split the rent."},
    ],
  },
  {
    id: "the-audition", title: "An audition", level: "B1", topic: "Arts",
    description: "For her New Year’s resolution, Anna auditions for a play called The Woods Are Alive.",
    articleId: 3630341, mediaId: 3655904, seconds: 251.02,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/12/29/b24ae633-80a3-46e9-afc8-5e2719ed1fa7.mp3",
    transcriptExcerpt: "Anna: I was too early, wasn't I?\nDirector: Yes. Yes, you were.",
    questions: [
      {
        prompt: "What does the director say about Anna’s voice at first?",
        choices: ["She is speaking too softly.", "She is speaking too fast.", "She is singing."],
        correct: 0,
        feedback: "The director says she is speaking too softly and asks her to speak more loudly.",
      },
      {
        prompt: "What part does Anna get?",
        choices: ["A tree", "The director", "A lost traveller"],
        correct: 0,
        feedback: "The director gives Anna the part of a tree, and the costume fits her perfectly.",
      },
    ],
    trueFalse: {statement: "The director asks Anna to speak more quietly.", correct: false, feedback: "He asks her to speak more loudly.", replaces: 0 },
    gap: { prompt: "Anna: I was too ___, wasn't I?", answer: "early" },
    words: [
      {word: "audition", arabic: "تجربة أداء يقدمها الممثل أو المغني ليحصل على دور.", example: "She has an audition for a new play."},
      {word: "resolution", arabic: "قرار أو وعد يتخذه الشخص لنفسه، خاصة في بداية السنة.", example: "My New Year’s resolution is to exercise more."},
    ],
  },
  {
    id: "time-for-plan-b", title: "Time for Plan B", level: "B1", topic: "Problem solving",
    description: "Anna loses her wallet downtown and asks her friends for help, but each one is busy.",
    articleId: 3666458, mediaId: 3681422, seconds: 218.71,
    audioUrl: "https://voa-audio.voanews.eu/vle/2017/01/18/b97c84f3-f68d-4b35-bf71-9c369a107e82.mp3",
    transcriptExcerpt: "Anna: See, I lost my wallet and I’m stuck downtown",
    questions: [
      {
        prompt: "Why can’t Jonathan help Anna?",
        choices: ["He is at the airport with his mother.", "He has a big presentation.", "He is babysitting."],
        correct: 0,
        feedback: "Jonathan is at the airport with his mother.",
      },
      {
        prompt: "What does Anna find in her emergency money envelope?",
        choices: ["Nothing. It is empty.", "Twenty dollars", "Her Metro card"],
        correct: 0,
        feedback: "The Extra Emergency Money envelope is empty too.",
      },
    ],
    trueFalse: {statement: "Marsha can’t help because she has to give a big presentation.", correct: true, feedback: "Marsha has a big presentation, so she can’t come.", replaces: 0 },
    gap: { prompt: "Anna: See, I lost my ___ and I’m stuck downtown", answer: "wallet" },
    words: [
      {word: "wallet", arabic: "محفظة صغيرة للنقود والبطاقات.", example: "I keep my cards and cash in my wallet."},
      {word: "stuck", arabic: "عالق، لا يستطيع التحرك أو المغادرة.", example: "I’m stuck downtown with no money."},
    ],
  },
  {
    id: "dont-believe-every-ad", title: "Don’t believe every ad", level: "B1", topic: "Shopping",
    description: "Anna buys a hair product because her friend Pete is in the ad, and learns not to trust every advertisement.",
    articleId: 3598920, mediaId: 3620666, seconds: 207.27,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/12/02/5fd0aa74-ef38-40c2-85fb-47f536c14e28.mp3",
    transcriptExcerpt: "Anna: I believed your ad, Pete. It was dishonest!\nPete: Anna, you don’t believe everything you see in ads, do you?",
    questions: [
      {
        prompt: "How much does one can of Hair Be Good cost?",
        choices: ["$10", "$20", "$5"],
        correct: 0,
        feedback: "Pete says one can costs only $10.",
      },
      {
        prompt: "What does Amelia say about Anna’s hair?",
        choices: ["It does not look good.", "It looks fabulous.", "It is too short."],
        correct: 0,
        feedback: "Amelia says: Your hair does not look good.",
      },
    ],
    trueFalse: {statement: "One can of Hair Be Good costs $20.", correct: false, feedback: "It costs $10.", replaces: 0 },
    gap: { prompt: "Anna: I believed your ad, Pete. It was ___!", answer: "dishonest" },
    words: [
      {word: "product", arabic: "منتَج يُباع في المتاجر.", example: "Hair Be Good is a new product."},
      {word: "untidy", arabic: "غير مرتّب.", example: "The wind makes my hair untidy."},
    ],
  },
  {
    id: "a-work-review", title: "A work review", level: "B1", topic: "Work",
    description: "At her yearly review, Anna’s boss wants the audience for her show to grow.",
    articleId: 3635015, mediaId: 3664614, seconds: 212.10,
    audioUrl: "https://voa-audio.voanews.eu/vle/2017/01/05/64e9d749-33ff-4b41-934d-9f44e81cfea0.mp3",
    transcriptExcerpt: "Anna: Our audience is big.\nBryan: But that's a good thing.",
    questions: [
      {
        prompt: "What was wrong with the first chart?",
        choices: ["It was upside down.", "It was empty.", "It showed the wrong show."],
        correct: 0,
        feedback: "Anna says: I think the chart is upside down.",
      },
      {
        prompt: "What does Ms. Weaver show Anna to help her?",
        choices: ["Idea posters", "A new computer", "A list of guests"],
        correct: 0,
        feedback: "Ms. Weaver has idea posters with cats on them.",
      },
    ],
    trueFalse: {statement: "Ms. Weaver held the chart upside down.", correct: true, feedback: "Anna turns the chart around so it is right-side up.", replaces: 0 },
    gap: { prompt: "Anna: Our ___ is big.", answer: "audience" },
    words: [
      {word: "audience", arabic: "الجمهور؛ الناس الذين يشاهدون أو يستمعون.", example: "The show has a big audience."},
      {word: "teamwork", arabic: "العمل الجماعي.", example: "Teamwork works best with a team."},
    ],
  },
  {
    id: "minding-my-own-business", title: "Minding my own business", level: "B1", topic: "City life",
    description: "Anna tells a TV reporter how she chased two robbers who took a woman’s bag.",
    articleId: 3647264, mediaId: 3673917, seconds: 180.96,
    audioUrl: "https://voa-audio.voanews.eu/vle/2017/01/12/51393a0f-7412-4703-8f47-866cfd57955c.mp3",
    transcriptExcerpt: "Guy: So, what happened next?\nAnna: They grabbed her bag and ran away! So, I grabbed her umbrella and ran after the robbers.",
    questions: [
      {
        prompt: "Why were the robbers kicked off the bus?",
        choices: ["They didn’t pay.", "They were too loud.", "They had an umbrella."],
        correct: 0,
        feedback: "Anna says: They didn’t pay. You’ve got to pay when you get on a bus.",
      },
      {
        prompt: "What did the woman hit the robbers with?",
        choices: ["Her umbrella", "Her bag", "A book"],
        correct: 0,
        feedback: "She was hitting them with her umbrella.",
      },
    ],
    trueFalse: {statement: "The woman hit the robbers with her umbrella.", correct: true, feedback: "Anna says the woman was hitting them with her umbrella.", replaces: 1 },
    gap: { prompt: "Anna: They grabbed her ___ and ran away! So, I grabbed her umbrella and ran after the robbers.", answer: "bag" },
    words: [
      {word: "robber", arabic: "لصّ يسرق بالقوة.", example: "Two robbers grabbed her bag."},
      {word: "crime", arabic: "جريمة.", example: "The reporter is at the scene of a crime."},
    ],
  },
  {
    id: "healthy-or-junk-food", title: "Healthy food or junk food?", level: "B1", topic: "Health",
    description: "At the supermarket, two sides of Anna argue about healthy food and junk food.",
    articleId: 3688552, mediaId: 3699145, seconds: 214.14,
    audioUrl: "https://voa-audio.voanews.eu/vle/2017/01/30/e8edcdf8-a252-41eb-af50-d1337bbb614f.mp3",
    transcriptExcerpt: "Ashley: What was that?\nAnna: I’m hungry. When I’m hungry, I only want to eat junk food! But I know I should eat healthy food.",
    questions: [
      {
        prompt: "Where does Ashley tell Anna to go?",
        choices: ["The Giant supermarket", "A bakery", "A restaurant"],
        correct: 0,
        feedback: "Ashley says: go to the Giant supermarket.",
      },
      {
        prompt: "What does the junk-food side want in the frozen food aisle?",
        choices: ["Ice cream", "Frozen peas", "Celery"],
        correct: 0,
        feedback: "Junky says: Mmm, ice cream!",
      },
    ],
    trueFalse: {statement: "The healthy side wants frozen peas.", correct: true, feedback: "Healthy says: Mmm, frozen peas!", replaces: 1 },
    gap: { prompt: "Anna: I’m hungry. When I’m hungry, I only want to eat ___ food!", answer: "junk" },
    words: [
      {word: "junk food", arabic: "أطعمة غير صحية فيها دهون وسكر كثير.", example: "I know I should eat less junk food."},
      {word: "aisle", arabic: "ممرّ بين رفوف المتجر.", example: "The ice cream is in the frozen food aisle."},
    ],
  },
  {
    id: "a-road-trip", title: "A road trip", level: "B1", topic: "Travel",
    description: "Anna and Marsha drive across the United States to see famous sights.",
    articleId: 3710209, mediaId: 3710203, seconds: 239.65,
    audioUrl: "https://voa-audio.voanews.eu/vle/2017/02/07/1fb535dc-77e2-4e0e-930e-b50fab4e45cd.mp3",
    transcriptExcerpt: "Marsha: Will we be stopping soon?\nAnna: We won’t be stopping soon.",
    questions: [
      {
        prompt: "Which place does Marsha want to see?",
        choices: ["Mount Rushmore", "The largest rocking chair", "The Statue of Liberty"],
        correct: 0,
        feedback: "Marsha says: And I want to see Mount Rushmore!",
      },
      {
        prompt: "What happens to the apple Anna throws?",
        choices: ["It goes out the window.", "Marsha eats it.", "It falls on the floor."],
        correct: 0,
        feedback: "Anna throws the apple and it goes out the window.",
      },
    ],
    trueFalse: {statement: "Anna wants to see New York City and the Statue of Liberty.", correct: true, feedback: "Anna says: I want to see New York City and the Statue of Liberty!", replaces: 0 },
    gap: { prompt: "Anna: We won’t be ___ soon.", answer: "stopping" },
    words: [
      {word: "road trip", arabic: "رحلة طويلة بالسيارة.", example: "We are going on a road trip together!"},
      {word: "sight", arabic: "معلم يستحق المشاهدة.", example: "We saw many famous sights."},
    ],
  },
  {
    id: "fixing-petes-car", title: "Fixing Pete’s car", level: "B1", topic: "Cars",
    description: "Pete tries to fix his car with an online course, and Anna offers to help.",
    articleId: 3737352, mediaId: 3748838, seconds: 191.60,
    audioUrl: "https://voa-audio.voanews.eu/vle/2017/03/03/8511524b-9e6f-4e73-9fa1-cd3f6b32b495.mp3",
    transcriptExcerpt: "Anna: How can I help? I was planning to visit some friends. But if you need help, I can help. I like helping.\nPete: Anna, I can fix it myself. But thanks.",
    questions: [
      {
        prompt: "How many lessons does Pete’s online course have?",
        choices: ["450", "10", "15"],
        correct: 0,
        feedback: "Pete says there are four hundred and fifty lessons.",
      },
      {
        prompt: "What did Pete take out of the engine?",
        choices: ["Some spark plugs", "The tires", "The keys"],
        correct: 0,
        feedback: "Pete thought there were too many spark plugs, so he took out the extra ones.",
      },
    ],
    trueFalse: {statement: "Pete watched all of the online lessons.", correct: false, feedback: "He watched only the first 10 of 450 lessons.", replaces: 0 },
    gap: { prompt: "Pete: Anna, I can fix it ___. But thanks.", answer: "myself" },
    words: [
      {word: "engine", arabic: "محرّك السيارة.", example: "Spark plugs start the engine."},
      {word: "tools", arabic: "أدوات للإصلاح.", example: "I’ll get my tools."},
    ],
  },
  {
    id: "have-you-ever", title: "Have you ever...?", level: "B1", topic: "Museums",
    description: "Anna helps a tourist from Boston choose interesting museums in Washington, D.C.",
    articleId: 3753664, mediaId: 3757461, seconds: 217.26,
    audioUrl: "https://voa-audio.voanews.eu/vle/2017/03/09/d11896f1-be6c-47bf-acbc-968ebda02e96.mp3",
    transcriptExcerpt: "Jean: I want to see an unusual museum.\nAnna: I like the Sculpture Garden. Have you ever seen sculptures in a garden? It is really artistic!",
    questions: [
      {
        prompt: "Where has Jean just flown in from?",
        choices: ["Boston", "New York", "California"],
        correct: 0,
        feedback: "Jean says: I’ve just flown in from Boston.",
      },
      {
        prompt: "Which place has Anna never visited?",
        choices: ["The zoo", "The Sculpture Garden", "The Museum of the American Indian"],
        correct: 0,
        feedback: "Anna says: I’ve never been to D.C.’s zoo.",
      },
    ],
    trueFalse: {statement: "Anna has been to the D.C. zoo many times.", correct: false, feedback: "She has never been to D.C.’s zoo.", replaces: 1 },
    gap: { prompt: "Jean: I want to see an unusual ___.", answer: "museum" },
    words: [
      {word: "sculpture", arabic: "منحوتة أو تمثال فني.", example: "Have you ever seen sculptures in a garden?"},
      {word: "suggestion", arabic: "اقتراح.", example: "Do you have any other suggestions?"},
    ],
  },
  {
    id: "operation-spy", title: "Operation Spy", level: "B1", topic: "Mystery",
    description: "Anna visits the International Spy Museum on a mission for her boss’s new show.",
    articleId: 3763537, mediaId: 3769312, seconds: 204.39,
    audioUrl: "https://voa-audio.voanews.eu/vle/2017/03/16/fdd6be45-f44e-4a0d-8231-e9cc9e710f44.mp3",
    transcriptExcerpt: "Ms. Weaver: Umm … have you ever cracked a code?\nAnna: No.",
    questions: [
      {
        prompt: "What is the name of the new show?",
        choices: ["D.C. Secrets", "Operation Spy", "The Time Traveling Treehouse"],
        correct: 0,
        feedback: "Ms. Weaver says it’s for the new show, “D.C. Secrets.”",
      },
      {
        prompt: "What is Anna afraid of?",
        choices: ["Dark, small places", "High places", "Dogs"],
        correct: 0,
        feedback: "Anna says: I’m afraid of dark, small places.",
      },
    ],
    trueFalse: {statement: "Anna is afraid of dark, small places.", correct: true, feedback: "The air duct is dark and small, and Anna is afraid of places like that.", replaces: 1 },
    gap: { prompt: "Ms. Weaver: Umm … have you ever cracked a ___?", answer: "code" },
    words: [
      {word: "spy", arabic: "جاسوس.", example: "Spies sometimes sneak down air ducts."},
      {word: "mission", arabic: "مهمّة.", example: "My boss has sent me here on a mission!"},
    ],
  },
  {
    id: "back-to-school", title: "Back to school", level: "B1", topic: "Education",
    description: "Anna goes back to school at Georgetown University and gets ready to give a report.",
    articleId: 3771173, mediaId: 3829611, seconds: 201.82,
    audioUrl: "https://voa-audio.voanews.eu/vle/2017/04/28/c26515f8-0d7c-4fb4-9646-4dfece722172.mp3",
    transcriptExcerpt: "Jada: The professor told us to bring our drafts.\nAnna: I think she said “giraffe.”",
    questions: [
      {
        prompt: "How long has the class been waiting for the professor?",
        choices: ["About 10 minutes", "An hour", "Since last night"],
        correct: 0,
        feedback: "Taylor says: We’ve only been waiting for about 10 minutes.",
      },
      {
        prompt: "Why is the professor late?",
        choices: ["The snow storm", "Her car broke down", "She forgot the class"],
        correct: 0,
        feedback: "Dr. Jones says the snow storm made getting there really difficult.",
      },
    ],
    trueFalse: {statement: "The professor is late because of a snow storm.", correct: true, feedback: "Dr. Jones says the snow storm made getting there difficult.", replaces: 1 },
    gap: { prompt: "Jada: The professor told us to bring our ___.", answer: "drafts" },
    words: [
      {word: "draft", arabic: "مسودّة أولى لعمل مكتوب.", example: "The professor told us to bring our drafts."},
      {word: "advice", arabic: "نصيحة.", example: "That is great advice."},
    ],
  },
  {
    id: "a-good-habit", title: "A good habit", level: "B1", topic: "Sport",
    description: "Anna decides to run a marathon, and Ashley tells her that training a little every day is a good habit.",
    articleId: 3773577, mediaId: 3799570, seconds: 185.22,
    audioUrl: "https://voa-audio.voanews.eu/vle/2017/04/06/1f484880-f858-47b5-8e0d-37a063b34a07.mp3",
    transcriptExcerpt: "Ashley: Anna, training a little every day is a good habit to get into. Not all at once!\nAnna: Thanks for the advice, Ashley. But I’m running in a special race.",
    questions: [
      {
        prompt: "How long has Anna been training?",
        choices: ["An hour and seven minutes", "A month", "Two weeks"],
        correct: 0,
        feedback: "Anna says she has been training for an hour and seven minutes.",
      },
      {
        prompt: "Why can’t Anna enter the race?",
        choices: ["It is for children.", "She is too late.", "She has no shoes."],
        correct: 0,
        feedback: "The woman says the race is for children.",
      },
    ],
    trueFalse: {statement: "Anna has been training for two months.", correct: false, feedback: "She started today: an hour and seven minutes.", replaces: 0 },
    gap: { prompt: "Ashley: Anna, training a little every day is a good ___ to get into. Not all at once!", answer: "habit" },
    words: [
      {word: "marathon", arabic: "سباق جري طويل جدًا.", example: "She will run in her first marathon."},
      {word: "medal", arabic: "ميدالية تُعطى للفائز أو المشارك.", example: "Everyone gets a medal in this race."},
    ],
  },
  {
    id: "taking-chances", title: "Taking chances", level: "B1", topic: "Arts",
    description: "On a talk show, Anna shares big news about her acting career and looks back on her year.",
    articleId: 3805454, mediaId: 3810417, seconds: 221.57,
    audioUrl: "https://voa-audio.voanews.eu/vle/2017/04/14/8259e341-9066-4896-af3d-f62d738d0948.mp3",
    transcriptExcerpt: "Anna: Well, the first is a science fiction movie. The second is a romantic comedy. And the third is an action movie.",
    questions: [
      {
        prompt: "How many movies will Anna act in?",
        choices: ["Three", "One", "Five"],
        correct: 0,
        feedback: "Anna says: I will be acting in three movies.",
      },
      {
        prompt: "What part does Anna play in the movies?",
        choices: ["A tree", "A spy", "A doctor"],
        correct: 0,
        feedback: "Kelly guesses she plays a tree in all of them, and Anna says yes.",
      },
    ],
    trueFalse: {statement: "Anna plays a tree in her new movies.", correct: true, feedback: "Anna is still wearing her tree costume, and she plays a tree in all three movies.", replaces: 1 },
    gap: { prompt: "Anna: Well, the first is a science fiction movie. The second is a romantic ___. And the third is an action movie.", answer: "comedy" },
    words: [
      {word: "career", arabic: "مسيرة مهنية.", example: "Her acting career has really taken off."},
      {word: "chance", arabic: "فرصة أو مخاطرة يقبلها الشخص.", example: "I’ve taken a lot of chances this year."},
    ],
  },
  {
    id: "budget-cuts", title: "Budget cuts", level: "B1", topic: "Work",
    description: "Rumors about budget cuts spread through Anna’s office before an important meeting.",
    articleId: 3960391, mediaId: 4010339, seconds: 247.74,
    audioUrl: "https://voa-audio.voanews.eu/vle/2017/08/31/3bf697ff-3ef5-4d59-8dcd-52613e2e7e9d.mp3",
    transcriptExcerpt: "Anna: Mark in Accounting? That's one person. That's not “people.”\nJonathan: I know, but Mark knows everything that goes on at The Studio.",
    questions: [
      {
        prompt: "Who has Jonathan heard talking about budget cuts?",
        choices: ["Mark in Accounting", "Amelia", "The boss"],
        correct: 0,
        feedback: "Jonathan says it was Mark in Accounting.",
      },
      {
        prompt: "What job did Amelia have before?",
        choices: ["Detective", "Teacher", "Reporter"],
        correct: 0,
        feedback: "Amelia says: I can't go back to being a detective.",
      },
    ],
    trueFalse: {statement: "Kaveh used to be a teacher.", correct: true, feedback: "Kaveh says: And I can't go back to being a teacher!", replaces: 1 },
    gap: { prompt: "Jonathan: I know, but Mark knows ___ that goes on at The Studio.", answer: "everything" },
    words: [
      {word: "budget cut", arabic: "تخفيض في الميزانية.", example: "When there are budget cuts, people may lose their jobs."},
      {word: "rumor", arabic: "إشاعة؛ خبر غير مؤكَّد ينتشر بين الناس.", example: "We shouldn't gossip. That's how rumors start."},
    ],
  },
  {
    id: "he-said-she-said", title: "He said, she said", level: "B1", topic: "Work",
    description: "Anna and Pete arrive late to a meeting and tell very different stories about why.",
    articleId: 4027340, mediaId: 4030029, seconds: 295.44,
    audioUrl: "https://voa-audio.voanews.eu/vle/2017/09/15/078ffce1-f691-4e1e-811e-058154119d2d.mp3",
    transcriptExcerpt: "Kelly: Hum. I didn’t get that message.\nAnna: Oh. Sorry.",
    questions: [
      {
        prompt: "How late are Anna and Pete?",
        choices: ["43 minutes", "15 minutes", "An hour"],
        correct: 0,
        feedback: "Kelly says they are exactly 43 minutes late.",
      },
      {
        prompt: "Why does Anna say they were late?",
        choices: ["Pete had to get his special coffee.", "The Metro was closed.", "Anna had to feed her birds."],
        correct: 0,
        feedback: "Anna says: He had to get his “special” coffee.",
      },
    ],
    trueFalse: {statement: "Anna and Pete are exactly 43 minutes late.", correct: true, feedback: "Kelly says: You two are late -- exactly 43 minutes late!", replaces: 0 },
    gap: { prompt: "Kelly: Hum. I didn’t get that ___.", answer: "message" },
    words: [
      {word: "consultant", arabic: "مستشار يقدّم النصيحة في مجال معيّن.", example: "We are meeting with a consultant."},
      {word: "on time", arabic: "في الوقت المحدد.", example: "It’s bad to be late for a business meeting. Be on time."},
    ],
  },
  {
    id: "the-best-vacation-ever", title: "The best vacation ever", level: "B1", topic: "Travel",
    description: "Anna visits a travel agent who tries to sell her the most expensive vacation.",
    articleId: 4035571, mediaId: 4047111, seconds: 290.92,
    audioUrl: "https://voa-audio.voanews.eu/vle/2017/09/27/11289bfa-a821-47fb-905b-7b4174ae0c5e.mp3",
    transcriptExcerpt: "Dan: Trudy, hold my calls. I am going to sell our most expensive vacation.\nTrudy: Sure thing, Boss.",
    questions: [
      {
        prompt: "Why doesn’t Anna want the Mountain Getaway?",
        choices: ["She is afraid of high places.", "It is too short.", "It is too cheap."],
        correct: 0,
        feedback: "Anna says: I’m afraid of high places.",
      },
      {
        prompt: "Which is the agency’s priciest vacation?",
        choices: ["The Safari Camp Out", "The Deep Sea Adventure", "The Mountain Getaway"],
        correct: 0,
        feedback: "Dan says the Safari Camp Out is their priciest vacation.",
      },
    ],
    trueFalse: {statement: "Anna is afraid of high places.", correct: true, feedback: "That is why she doesn’t want seven days on a mountain.", replaces: 0 },
    gap: { prompt: "Dan: Trudy, hold my calls. I am going to sell our most ___ vacation.", answer: "expensive" },
    words: [
      {word: "travel agent", arabic: "وكيل سفر يبيع الرحلات.", example: "Anna goes to a travel agent."},
      {word: "pricey", arabic: "غالٍ؛ مرتفع الثمن.", example: "It’s a little pricey."},
    ],
  },
  {
    id: "will-it-float", title: "Will it float?", level: "B1", topic: "Travel",
    description: "Anna takes Penelope on a tour in a vehicle that drives on roads and sails on water.",
    articleId: 4064553, mediaId: 4064488, seconds: 284.77,
    audioUrl: "https://voa-audio.voanews.eu/vle/2017/10/10/4814fa95-feaa-447a-a081-499d11b1d5f3.mp3",
    transcriptExcerpt: "Penelope: So, which tour are we taking – the one that goes through the city on a bus? Or the one that goes along the river in a boat?\nAnna: Both!",
    questions: [
      {
        prompt: "When was the tour vehicle first created?",
        choices: ["During World War II", "Last year", "In the 1800s"],
        correct: 0,
        feedback: "Penelope reads that it was created during World War II to carry people and supplies.",
      },
      {
        prompt: "Who tells them many fun facts on the tour?",
        choices: ["A boy on the tour", "The captain", "Penelope’s father"],
        correct: 0,
        feedback: "A boy says he has tons of fun facts for the tour.",
      },
    ],
    trueFalse: {statement: "The tour vehicle was created to carry people and supplies.", correct: true, feedback: "It was created during World War II to carry people and supplies.", replaces: 0 },
    gap: { prompt: "Penelope: So, which ___ are we taking – the one that goes through the city on a bus?", answer: "tour" },
    words: [
      {word: "tour", arabic: "جولة سياحية.", example: "A tour is the best way to see the city."},
      {word: "supplies", arabic: "مؤن وإمدادات.", example: "The boat carried people and supplies."},
    ],
  },
  {
    id: "the-big-snow", title: "The big snow", level: "B1", topic: "Weather",
    description: "Anna and Pete stay at work for a weekend to report on a blizzard, but only Anna is prepared.",
    articleId: 4102755, mediaId: 4128655, seconds: 267.16,
    audioUrl: "https://voa-audio.voanews.eu/vle/2017/11/21/0117495a-4165-48c3-8972-61491413ad7a.mp3",
    transcriptExcerpt: "Anna: I have wanted to report on a big weather event my whole life.\nKelly: Who hasn’t? Did you report all weekend ... by yourself?",
    questions: [
      {
        prompt: "What supplies did Anna bring?",
        choices: ["Food, a blanket and warm clothing", "Only coffee", "A tent and a boat"],
        correct: 0,
        feedback: "Anna says her supplies are food, a blanket and warm clothing.",
      },
      {
        prompt: "What had Anna just bought?",
        choices: ["Weather forecasting software", "A video game", "A music program"],
        correct: 0,
        feedback: "Anna says she had just bought the latest weather forecasting software.",
      },
    ],
    trueFalse: {statement: "Anna had just bought new weather forecasting software.", correct: true, feedback: "She brought The Weather Genie Pro with her.", replaces: 1 },
    gap: { prompt: "Anna: I have wanted to report on a big weather ___ my whole life.", answer: "event" },
    words: [
      {word: "blizzard", arabic: "عاصفة ثلجية قوية.", example: "This could be the blizzard of the century."},
      {word: "forecast", arabic: "توقّعات (الطقس).", example: "The software helps forecast the weather."},
    ],
  },
  {
    id: "run-bees", title: "Run! Bees!", level: "B1", topic: "Nature",
    description: "Anna is afraid of bees, so Kaveh sends her to a beekeeper for help.",
    articleId: 4139015, mediaId: 4140102, seconds: 258.02,
    audioUrl: "https://voa-audio.voanews.eu/vle/2017/11/28/260c25bd-1773-42d0-8b8a-54924d27427c.mp3",
    transcriptExcerpt: "Anna: Wow. Did you know that bees are dying?\nKaveh: That is bad news. If all the bees died, there would be no food. Bees are very important.",
    questions: [
      {
        prompt: "What does Kaveh say will happen if you ignore a bee?",
        choices: ["It will fly away.", "It will sting you.", "It will make honey."],
        correct: 0,
        feedback: "Kaveh says: If you ignore it, it will fly away.",
      },
      {
        prompt: "Who is Caroline?",
        choices: ["A beekeeper and bee educator", "Kaveh’s sister", "A doctor"],
        correct: 0,
        feedback: "Kaveh says Caroline is a beekeeper and a bee educator.",
      },
    ],
    trueFalse: {statement: "Kaveh says that if you swat a bee, it might sting you.", correct: true, feedback: "Kaveh says: But if you swat it, it might sting you.", replaces: 0 },
    gap: { prompt: "Kaveh: That is bad news. If all the bees died, there would be no ___.", answer: "food" },
    words: [
      {word: "beekeeper", arabic: "نحّال؛ شخص يربّي النحل.", example: "Caroline is a beekeeper."},
      {word: "fear", arabic: "خوف.", example: "She will help you get over your fear of bees."},
    ],
  },
  {
    id: "save-the-bees", title: "Save the bees", level: "B1", topic: "Nature",
    description: "With Caroline’s help, Anna looks inside a beehive and learns how to help bees.",
    articleId: 4145716, mediaId: 4145675, seconds: 231.43,
    audioUrl: "https://voa-audio.voanews.eu/vle/2017/12/01/104a6627-290a-4472-911e-3bb9349f44f7.mp3",
    transcriptExcerpt: "Anna: There are so many! And they are so busy! Now I know why we say, “busy as a bee!”\nCaroline: Good job, Anna.",
    questions: [
      {
        prompt: "What does the queen bee do?",
        choices: ["She lays the eggs.", "She collects nectar.", "She builds the hive."],
        correct: 0,
        feedback: "Caroline says: The queen bee lays the eggs.",
      },
      {
        prompt: "What can Anna do to help bees?",
        choices: ["Plant native flowers", "Buy more honey", "Use more smoke"],
        correct: 0,
        feedback: "Caroline says you can plant native flowers that bees like.",
      },
    ],
    trueFalse: {statement: "Worker bees collect nectar and pollen from flowers.", correct: true, feedback: "The worker bees bring nectar and pollen back to the hive and make honey.", replaces: 0 },
    gap: { prompt: "Anna: There are so many! And they are so ___!", answer: "busy" },
    words: [
      {word: "hive", arabic: "خلية نحل.", example: "This is where the bees live: the hive."},
      {word: "protective clothing", arabic: "ملابس واقية.", example: "Beekeepers wear protective clothing."},
    ],
  },
  {
    id: "made-for-each-other", title: "Made for each other", level: "B1", topic: "Relationships",
    description: "Pete and Ashley talk about their perfect partners, and Anna invents a boyfriend.",
    articleId: 4159000, mediaId: 4160796, seconds: 276.92,
    audioUrl: "https://voa-audio.voanews.eu/vle/2017/12/12/e2fe076d-3fa7-495a-83ea-9d4d4cba9fad.mp3",
    transcriptExcerpt: "Ashley: My family is big and so is his. I don’t like ball sports and he doesn’t either! (sighs) We are made for each other ...\nPete: … and so are we. (sighs)",
    questions: [
      {
        prompt: "What does Anna say her boyfriend’s name is?",
        choices: ["Buster Carter", "Pete", "Mark"],
        correct: 0,
        feedback: "Anna invents the name Buster Carter.",
      },
      {
        prompt: "What does Pete think about Anna’s boyfriend?",
        choices: ["She made him up.", "He is very busy.", "He is a good cook."],
        correct: 0,
        feedback: "Pete says: You know, she made all that up.",
      },
    ],
    trueFalse: {statement: "Pete believes Anna’s story about her boyfriend.", correct: false, feedback: "Pete thinks she made it all up.", replaces: 1 },
    gap: { prompt: "Ashley: My family is big and so is his. I don’t like ball ___ and he doesn’t either!", answer: "sports" },
    words: [
      {word: "in common", arabic: "مشترك بين شخصين.", example: "We have so much in common."},
      {word: "couple", arabic: "زوجان أو ثنائي في علاقة.", example: "We’re a great couple."},
    ],
  },
  {
    id: "before-and-after", title: "Before and after", level: "B1", topic: "Fitness",
    description: "After a speed-walking race with Penelope, Anna decides to hire a personal trainer.",
    articleId: 4159057, mediaId: 4192438, seconds: 249.26,
    audioUrl: "https://voa-audio.voanews.eu/vle/2018/01/04/99ceaa2e-fb25-43a8-8731-0a7f23901d65.mp3",
    transcriptExcerpt: "Penelope: You are slower, Anna. Maybe you should hire a personal trainer.\nAnna: That will be great. As long as the trainer understands speed walking.",
    questions: [
      {
        prompt: "Which sport do Anna and Penelope both love?",
        choices: ["Speed walking", "Swimming", "Tennis"],
        correct: 0,
        feedback: "Anna says they both love speed walking.",
      },
      {
        prompt: "Where is Anna’s trainer, Albert, from?",
        choices: ["Alaska", "Boston", "California"],
        correct: 0,
        feedback: "He is Alaskan Albert, from the Alaskan wilderness.",
      },
    ],
    trueFalse: {statement: "Anna and Penelope have been speed walking since 8 a.m.", correct: true, feedback: "Anna says: We've been speed walking since 8 a.m.!", replaces: 0 },
    gap: { prompt: "Penelope: You are slower, Anna. Maybe you should hire a personal ___.", answer: "trainer" },
    words: [
      {word: "out of shape", arabic: "غير لائق بدنيًا.", example: "You’re out of shape."},
      {word: "trainer", arabic: "مدرّب رياضي.", example: "Maybe you should hire a personal trainer."},
    ],
  },
  {
    id: "a-job-offer", title: "Talking about a new job offer", level: "B2", topic: "Work",
    description: "Anna gets a new assignment and talks to Pete about a possible job.",
    articleId: 3960471, mediaId: 4016512, seconds: 146.9, excerpt: true,
    audioUrl: "https://voa-audio.voanews.eu/vle/2017/09/05/676d9800-cee0-4a59-9e79-b9378e0061ad.mp3",
    transcriptExcerpt: "My boss wants me to team up with someone to host a talk show.",
    questions: [
      {
        prompt: "What personal quality does the boss want in Anna’s co-host?",
        choices: ["A personality different from Anna’s", "The same cheerful personality as Anna", "More interest in meeting people than Anna"],
        correct: 0,
        feedback: "The boss asks Anna to find someone who contrasts with her cheerful, outgoing personality.",
      },
      {
        prompt: "What was Pete doing with the newspaper?",
        choices: ["Checking interview times", "Doing a crossword", "Reading the job advertisements"],
        correct: 1,
        feedback: "Anna assumes he’s reading the job ads, but Pete tells her he was working on the crossword.",
      },
    ],
    trueFalse: {statement: "Pete was doing a crossword in the newspaper.", correct: true, feedback: "Pete was doing a crossword.", replaces: 1 },
    gap: { prompt: "My boss wants me to team up with someone to host a talk ___.", answer: "show" },
    words: [
      {word: "assignment", arabic: "مهمة يكلّفك بها مدير أو معلّم لإنجازها.", example: "My first assignment is to interview a local shop owner."},
      {word: "team up", arabic: "يتعاون مع شخص آخر لإنجاز مهمة مشتركة.", example: "We teamed up to prepare the presentation."},
      {word: "job offer", arabic: "عرض عمل رسمي أو مبدئي لشخص مرشّح لوظيفة.", example: "She received a job offer after the interview."},
    ],
  },
  {
    id: "too-many-commitments", title: "Taking on too much", level: "B2", topic: "Daily life",
    description: "Hear how an everyday expression describes saying yes to too many commitments.",
    articleId: 7941440, seconds: 126.8, excerpt: true,
    audioUrl: "https://voa-audio.voanews.eu/vle/2025/01/18/cbc6a939-3e64-4b54-8384-adfb6254fe17_hq.mp3",
    questions: [
      {
        prompt: "What problem does the expression in the clip describe?",
        choices: ["Putting off just one unpleasant task", "Spending too much money on a hobby", "Agreeing to more than you can manage"],
        correct: 2,
        feedback: "Spreading yourself too thin means dividing your time and energy among too many commitments.",
      },
      {
        prompt: "Which situation best illustrates the expression?",
        choices: ["You practise one activity every week.", "You join several projects and cannot give any enough time.", "You turn down an extra shift to study."],
        correct: 1,
        feedback: "The person has taken on so many projects that each one gets too little attention.",
      },
    ],
    trueFalse: {statement: "The expression describes agreeing to more than you can manage.", correct: true, feedback: "It describes saying yes to more commitments than you can manage.", replaces: 0 },
    words: [
      {word: "spread yourself too thin", arabic: "تقبل التزامات أكثر مما يمكنك التعامل معه، فيتوزّع وقتك وجهدك على أشياء كثيرة.", example: "I spread myself too thin by taking on three projects at once."},
      {word: "take on", arabic: "يتولّى مهمة أو يقبل تحمّل مسؤولية جديدة.", example: "I can't take on another project this month."},
    ],
  },
  {
    id: "taking-a-city-tour", title: "Taking a guided city tour", level: "B2", topic: "Travel",
    description: "Anna and Penelope take a city tour and comment on what they see along the way.",
    articleId: 4064769, mediaId: 4074910, seconds: 134.70, excerpt: true,
    audioUrl: "https://voa-audio.voanews.eu/vle/2017/10/17/45e008c5-648b-4275-ad2d-d3b058d199a6.mp3",
    questions: [
      {
        prompt: "What is unusual about the tour vehicle?",
        choices: ["It can travel on land and water.", "Passengers have to pedal it.", "It follows a railway through town."],
        correct: 0,
        feedback: "The group travels along the river and then enters it in the same vehicle.",
      },
      {
        prompt: "Why does Anna point out that she is outside the plane?",
        choices: ["She was hoping to fly it herself.", "She is surprised by how close it passes overhead.", "She is asking the pilot for directions."],
        correct: 1,
        feedback: "Anna has flown before, but being so close to a plane while outside it is new to her.",
      },
    ],
    trueFalse: {statement: "The tour vehicle can travel on land and water.", correct: true, feedback: "The vehicle can travel on land and water.", replaces: 0 },
    words: [
      {word: "coming up", arabic: "على وشك الظهور أو الوصول. هنا يشير إلى معلم ستراه قريبًا.", example: "The next stop is coming up on the left."},
      {word: "carved in stone", arabic: "منقوش في الحجر حرفيًا. وتُستخدم العبارة مجازًا لوصف قرار يصعب تغييره.", example: "The date is carved in stone above the doorway."},
      {word: "in flight", arabic: "في أثناء الطيران.", example: "The bird is much easier to identify in flight."},
    ],
  },
  {
    id: "covering-a-car-show", title: "Reporting from a car show", level: "B2", topic: "Events",
    description: "A reporting team compares instructions and talks to visitors at an exhibition.",
    articleId: 4254704, mediaId: 4256091, seconds: 118.20, excerpt: true,
    audioUrl: "https://voa-audio.voanews.eu/vle/2018/02/15/8b42c321-07ea-4eb1-a1f9-e7cc6019606e.mp3",
    questions: [
      {
        prompt: "Which two tasks does the boss assign the team at the show?",
        choices: ["Test-drive and buy a car", "Compare prices and demonstrate a robot", "Show vehicles and interview people"],
        correct: 2,
        feedback: "The boss wants them to film a variety of cars and interview people.",
      },
      {
        prompt: "Why is Penelope surprised by the instruction to have fun?",
        choices: ["She didn't expect their boss to say that.", "She thinks the show is a private event.", "She has already heard that from the visitors."],
        correct: 0,
        feedback: "Penelope asks whether those were the boss’s exact words. Anna confirms that the boss told her to have fun.",
      },
    ],
    trueFalse: {statement: "Penelope expected their boss to tell them to have fun.", correct: false, feedback: "She is surprised because she did not expect the boss to say that.", replaces: 1 },
    words: [
      {word: "cover an event", arabic: "يغطّي حدثًا إعلاميًا بإعداد تقرير عنه.", example: "A local reporter will cover the festival this weekend."},
      {word: "opening shot", arabic: "اللقطة الأولى في تقرير مصوّر أو فيلم.", example: "The opening shot shows the crowd outside the venue."},
      {word: "exact words", arabic: "الكلمات نفسها التي قالها الشخص حرفيًا عند نقل كلامه.", example: "I remember what she meant, but not her exact words."},
    ],
  },
  {
    id: "find-your-joy", title: "Find your joy", level: "B2", topic: "Work",
    description: "Anna loses her key and walks into the wrong office, where a life coach is waiting.",
    articleId: 4198066, mediaId: 4202177, seconds: 281.33,
    audioUrl: "https://voa-audio.voanews.eu/vle/2018/01/10/95f0ce1f-6cfd-44e4-b83a-e225d7cb0224.mp3",
    transcriptExcerpt: "Anna: Great. Oh, no.\nKaveh: What’s wrong?\nAnna: I lost my key! I just had it this morning.",
    questions: [
      {
        prompt: "What did Anna lose?",
        choices: ["Her key", "Her phone", "Her bag"],
        correct: 0,
        feedback: "Anna says: I lost my key!",
      },
      {
        prompt: "Where is the Lost & Found office now?",
        choices: ["In the basement next to the elevators", "Across from the cafeteria", "Next to Kaveh’s desk"],
        correct: 0,
        feedback: "Kaveh says it is now down in the basement next to the elevators.",
      },
    ],
    trueFalse: {statement: "Anna lost her key at work.", correct: true, feedback: "She says: I lost my key! I just had it this morning.", replaces: 0 },
    gap: { prompt: "Anna: I lost my key! I just had it this ___.", answer: "morning" },
    words: [
      {word: "lost and found", arabic: "مكتب المفقودات.", example: "You should check the Lost & Found office."},
      {word: "basement", arabic: "قبو؛ الطابق السفلي.", example: "Now it’s down in the basement."},
    ],
  },
  {
    id: "flour-baby-part-1", title: "Flour baby, part 1", level: "B2", topic: "Family",
    description: "Ms. Weaver gives Anna and Pete an unusual way to research a show about single parents.",
    articleId: 4220576, mediaId: 4222632, seconds: 238.26,
    audioUrl: "https://voa-audio.voanews.eu/vle/2018/01/24/4f5af081-e654-4912-9f5d-24cd3fa5170a.mp3",
    transcriptExcerpt: "Anna: Ourselves?\nPeter: Yeah, how do we do that? We’re not parents.",
    questions: [
      {
        prompt: "What is the new show about?",
        choices: ["Single parents", "Cooking with flour", "Babysitting jobs"],
        correct: 0,
        feedback: "Ms. Weaver says it is a show on single parents.",
      },
      {
        prompt: "What are the “babies” Ms. Weaver gives them?",
        choices: ["Bags of flour", "Dolls", "Real babies"],
        correct: 0,
        feedback: "Pete says: Those are bags of flour.",
      },
    ],
    trueFalse: {statement: "The babies are really bags of flour.", correct: true, feedback: "Pete says: Those are bags of flour.", replaces: 1 },
    gap: { prompt: "Peter: Yeah, how do we do that? We’re not ___.", answer: "parents" },
    words: [
      {word: "single parent", arabic: "والد أو والدة يربّي الطفل وحده.", example: "We can interview single parents."},
      {word: "assignment", arabic: "مهمّة أو تكليف عمل.", example: "I have a new assignment for you."},
    ],
  },
  {
    id: "flour-baby-part-2", title: "Flour baby, part 2", level: "B2", topic: "Family",
    description: "Ms. Weaver checks how Anna and Pete looked after their flour babies for six days.",
    articleId: 4231290, mediaId: 4233546, seconds: 257.96,
    audioUrl: "https://voa-audio.voanews.eu/vle/2018/01/31/16d806b3-f878-4eff-bd6e-1857ec1241e0.mp3",
    transcriptExcerpt: "Ms. Weaver: That’s a heavy binder. And you and your Baby look great.\nPete: Thanks, Ms. Weaver. We feel great!",
    questions: [
      {
        prompt: "How often did Anna feed her flour baby?",
        choices: ["Every three hours", "Once a day", "Every six hours"],
        correct: 0,
        feedback: "Anna says: I fed her every three hours.",
      },
      {
        prompt: "What happened when Anna put her baby in the microwave?",
        choices: ["It caught fire.", "It got wet.", "It disappeared."],
        correct: 0,
        feedback: "Anna says: That’s when she caught fire.",
      },
    ],
    trueFalse: {statement: "Anna fed her flour baby every three hours.", correct: true, feedback: "That is why she hasn’t slept.", replaces: 0 },
    gap: { prompt: "Ms. Weaver: That’s a heavy ___.", answer: "binder" },
    words: [
      {word: "research", arabic: "بحث؛ دراسة.", example: "Let me see your research first."},
      {word: "accident", arabic: "حادث غير مقصود.", example: "I had a little accident with a knife."},
    ],
  },
  {
    id: "movie-night", title: "Movie night", level: "B2", topic: "Free time",
    description: "Anna loves movies and loves talking about them, which is a problem for Pete.",
    articleId: 4242927, mediaId: 4244920, seconds: 287.38,
    audioUrl: "https://voa-audio.voanews.eu/vle/2018/02/08/aa7b1559-adea-4534-8d4f-649785319a21.mp3",
    transcriptExcerpt: "Anna: Hi, Pete! Thanks for the movie invitation.\nPete: Yeah, sure Anna.",
    questions: [
      {
        prompt: "What does Pete not want Anna to do?",
        choices: ["Talk during the movie", "Eat popcorn", "Sit next to him"],
        correct: 0,
        feedback: "Pete asks: Would you mind not talking?",
      },
      {
        prompt: "What does Anna love the smell of?",
        choices: ["Popcorn", "Coffee", "Flowers"],
        correct: 0,
        feedback: "Anna says: I love the smell of popcorn.",
      },
    ],
    trueFalse: {statement: "Pete wants Anna to talk during the movie.", correct: false, feedback: "Pete takes movies seriously and asks her not to talk.", replaces: 0 },
    gap: { prompt: "Anna: Hi, Pete! Thanks for the movie ___.", answer: "invitation" },
    words: [
      {word: "previews", arabic: "مقاطع دعائية لأفلام قادمة.", example: "The previews are starting."},
      {word: "polite", arabic: "مؤدّب؛ لبق.", example: "Indirect questions are more polite."},
    ],
  },
  {
    id: "trash-to-treasure-part-1", title: "Trash to treasure, part 1", level: "B2", topic: "Shopping",
    description: "Anna wants to find Pete a unique birthday gift, so Ashley sends her to a special store.",
    articleId: 4273059, mediaId: 4282866, seconds: 246.69,
    audioUrl: "https://voa-audio.voanews.eu/vle/2018/03/06/fabffd67-3af1-480c-925c-0b87e11fe82b.mp3",
    transcriptExcerpt: "Ashley: Are you talking to yourself again?\nAnna: No, not this time. I was talking to Pete.",
    questions: [
      {
        prompt: "What is coming up for Pete?",
        choices: ["His birthday", "A job interview", "A vacation"],
        correct: 0,
        feedback: "Anna says he has a birthday coming up.",
      },
      {
        prompt: "Where does Ashley say Anna can buy something unique?",
        choices: ["Tanglewood Works", "A big mall", "Online"],
        correct: 0,
        feedback: "Ashley says: Tanglewood Works.",
      },
    ],
    trueFalse: {statement: "Pete told Anna not to tell anyone about his birthday.", correct: true, feedback: "Anna says: He told me not to tell anyone.", replaces: 0 },
    gap: { prompt: "Ashley: Are you talking to ___ again?", answer: "yourself" },
    words: [
      {word: "unique", arabic: "فريد؛ لا مثيل له.", example: "Do you know where I can buy something unique?"},
      {word: "present", arabic: "هدية.", example: "I’m getting him a present."},
    ],
  },
  {
    id: "trash-to-treasure-part-2", title: "Trash to treasure, part 2", level: "B2", topic: "Hobbies",
    description: "Anna brings strange things to Sue’s class, but are they treasure or trash?",
    articleId: 4283017, mediaId: 4283246, seconds: 287.78,
    audioUrl: "https://voa-audio.voanews.eu/vle/2018/03/06/0fd0e840-fff7-4d90-aaeb-eba188526184.mp3",
    transcriptExcerpt: "Sue: Sometimes trash is treasure. Sometimes it's just trash.\nSue: Anna, don’t worry. Next week, I could teach you decoupage.",
    questions: [
      {
        prompt: "What does Sue call Anna’s things?",
        choices: ["Garbage", "Treasure", "Art"],
        correct: 0,
        feedback: "Sue says: It’s what we like to call in the business … garbage.",
      },
      {
        prompt: "What must Anna bring next week?",
        choices: ["A clean shoe box", "A broken toy", "A plastic helmet"],
        correct: 0,
        feedback: "Sue says: All you need to bring is a clean shoe box.",
      },
    ],
    trueFalse: {statement: "Sue thinks Anna’s things are garbage.", correct: true, feedback: "Sue says the stuff is garbage.", replaces: 0 },
    gap: { prompt: "Sue: Sometimes trash is ___.", answer: "treasure" },
    words: [
      {word: "trash", arabic: "قمامة؛ أشياء لا قيمة لها.", example: "Sometimes it's just trash."},
      {word: "treasure", arabic: "كنز؛ شيء ثمين.", example: "Sometimes trash is treasure."},
    ],
  },
  {
    id: "i-feel-super", title: "I feel super", level: "B2", topic: "Free time",
    description: "Anna talks about superheroes with a young man, and then something surprising happens.",
    articleId: 4307612, mediaId: 4313087, seconds: 288.41,
    audioUrl: "https://voa-audio.voanews.eu/vle/2018/03/23/f1f4841a-c2cb-4ee3-9cbe-2a132ffb5c8e.mp3",
    transcriptExcerpt: "ANNA: In fact, tonight I’m going to the big superhero convention. Are you going?\nYOUNG MAN: Um, I don’t know.",
    questions: [
      {
        prompt: "What happens to Anna?",
        choices: ["She is hit by lightning.", "She falls down.", "She loses her ticket."],
        correct: 0,
        feedback: "Professor Bot says: Anna was just hit by lightning.",
      },
      {
        prompt: "How would the young man rather become a superhero?",
        choices: ["Be born a superhero", "By an accident", "By buying a suit"],
        correct: 0,
        feedback: "He says: I’d rather be born a superhero.",
      },
    ],
    trueFalse: {statement: "The young man would rather be born a superhero.", correct: true, feedback: "Anna would rather become one by accident.", replaces: 1 },
    gap: { prompt: "ANNA: In fact, tonight I’m going to the big superhero ___.", answer: "convention" },
    words: [
      {word: "convention", arabic: "مؤتمر أو تجمّع كبير.", example: "Tonight I’m going to the big superhero convention."},
      {word: "unexpected", arabic: "غير متوقَّع.", example: "I’d rather become a superhero by an unexpected accident!"},
    ],
  },
  {
    id: "fish-out-of-water", title: "Fish out of water", level: "B2", topic: "Home",
    description: "Anna visits a friend who lives on a houseboat and thinks about living on one too.",
    articleId: 4374632, mediaId: 4376529, seconds: 265.49,
    audioUrl: "https://voa-audio.voanews.eu/vle/2018/05/03/198277fc-1de6-487a-8196-dc808623e1b6.mp3",
    transcriptExcerpt: "ANNA: Thanks, Ms. Weaver. But I already have plans. My friend has invited me to her houseboat.\nMS. WEAVER: Houseboat, really? That’s unique.",
    questions: [
      {
        prompt: "Why can’t Anna go to dinner with Ms. Weaver?",
        choices: ["She is visiting her friend’s houseboat.", "She doesn’t like seafood.", "She has to work."],
        correct: 0,
        feedback: "Anna says: My friend has invited me to her houseboat.",
      },
      {
        prompt: "Where did Phoenix’s family live before the boat?",
        choices: ["A 3-story house", "A small apartment", "Another boat"],
        correct: 0,
        feedback: "Phoenix says: We moved from a 3-story house to a boat!",
      },
    ],
    trueFalse: {statement: "Anna is going to visit her friend’s houseboat.", correct: true, feedback: "That is why she can’t go to dinner.", replaces: 0 },
    gap: { prompt: "MS. WEAVER: Houseboat, really? That’s ___.", answer: "unique" },
    words: [
      {word: "houseboat", arabic: "قارب يُستعمل بيتًا للسكن.", example: "I’m thinking of living on a houseboat."},
      {word: "downsize", arabic: "تقليص الحجم أو الممتلكات.", example: "We really had to downsize!"},
    ],
  },
  {
    id: "for-the-birds", title: "For the birds", level: "B2", topic: "Nature",
    description: "Anna joins a city bird count, but she keeps finding ice cream trucks instead of birds.",
    articleId: 4396849, mediaId: 4398838, seconds: 294.66,
    audioUrl: "https://voa-audio.voanews.eu/vle/2018/05/17/48003699-cb0b-4cb7-8002-27bb38944ebf.mp3",
    transcriptExcerpt: "KELLY: We're supposed to be counting birds, not ice cream trucks. This is important scientific work!",
    questions: [
      {
        prompt: "Which birds did Anna see?",
        choices: ["Only pigeons", "Many kinds of birds", "No birds at all"],
        correct: 0,
        feedback: "Anna says: I've only seen pigeons.",
      },
      {
        prompt: "How many ice cream trucks did Anna find?",
        choices: ["10", "5", "2"],
        correct: 0,
        feedback: "Anna says: I found 10 ice cream trucks in this five-block area.",
      },
    ],
    trueFalse: {statement: "Anna saw many different kinds of birds.", correct: false, feedback: "Anna only saw pigeons.", replaces: 0 },
    gap: { prompt: "KELLY: We're supposed to be counting ___, not ice cream trucks.", answer: "birds" },
    words: [
      {word: "disappointment", arabic: "خيبة أمل.", example: "I’m sensing a little disappointment."},
      {word: "data", arabic: "بيانات.", example: "My data will be pretty important."},
    ],
  },
];
