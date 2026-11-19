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
];
