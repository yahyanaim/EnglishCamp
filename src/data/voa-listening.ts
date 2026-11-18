export const LISTENING_LEVELS = ["A1", "A2", "B1", "B2"] as const;
type ListeningLevel = (typeof LISTENING_LEVELS)[number];

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
  words: readonly { word: string; arabic: string; example: string }[];
};

export const VOA_ORIGIN = "https://learningenglish.voanews.com";
export const VOA_PODCAST_URL = VOA_ORIGIN + "/podcast/?zoneId=987";
export const voaArticleUrl = (articleId: number) => `${VOA_ORIGIN}/a/${articleId}.html`;

// Level labels are EnglishCamp's teaching estimates. Durations were checked against the MP3s;
// the two B2 selections stop at a pause in their original longer recordings.
export const VOA_LISTENING: readonly VoaListeningClip[] = [
  {
    id: "meet-your-neighbor", title: "Meeting a new neighbor", level: "A1", topic: "Introductions",
    description: "Anna meets Pete and spells her name at the entrance to her new home.",
    articleId: 3111026, mediaId: 3181231, seconds: 29.57,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/02/08/49485bf8-4277-47f6-9abe-617ee2473f8c.mp3",
    transcriptExcerpt: "Pete: Hi! Are you Anna?\nAnna: Yes! Hi there! Are you Pete?",
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
    words: [
      {word: "small town", arabic: "بلدة صغيرة، أي مكان سكني أصغر من مدينة كبيرة.", example: "I grew up in a small town near the sea."},
      {word: "roommate", arabic: "زميل سكن يشاركك المنزل أو الشقة.", example: "My roommate and I share a kitchen."},
    ],
  },
  {
    id: "find-the-gym", title: "Finding the gym", level: "A2", topic: "Directions",
    description: "Anna looks for a place to exercise and asks people how to get there.",
    articleId: 3225958, mediaId: 3229512, seconds: 108.04,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/03/10/66b63229-1dc5-40ab-886d-1f4b891adf6b.mp3",
    transcriptExcerpt: "People in Washington like to work out!",
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
    words: [
      {word: "straight ahead", arabic: "إلى الأمام مباشرةً من دون انعطاف.", example: "Walk straight ahead until you see the library."},
      {word: "across from", arabic: "مقابل مكان، على الجهة الأخرى من الطريق أو المساحة.", example: "The café is across from the library."},
    ],
  },
  {
    id: "make-plans-with-a-friend", title: "Making plans with a friend", level: "B1", topic: "Social plans",
    description: "Two friends compare busy schedules to find a time to see a film.",
    articleId: 3355785, mediaId: 3365253, seconds: 152.50,
    audioUrl: "https://voa-audio.voanews.eu/vle/2016/06/07/3cb6442c-001f-4fd7-bf37-7507a49e89e4.mp3",
    transcriptExcerpt: "Marsha: Are you busy this Thursday at 6pm?\nAnna: Let’s see …. I’m busy.",
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
    words: [
      {word: "have lunch", arabic: "يتناول الغداء. يمكن أن تقول have lunch with عند تناول الغداء مع شخص.", example: "Would you like to have lunch with us?"},
      {word: "at noon", arabic: "عند الظهر، أي في الساعة الثانية عشرة نهارًا.", example: "Let's meet outside at noon."},
    ],
  },
  {
    id: "a-job-offer", title: "Talking about a new job offer", level: "B2", topic: "Work",
    description: "Anna gets a new assignment and talks to Pete about a possible job.",
    articleId: 3960471, mediaId: 4016512, seconds: 146.9, excerpt: true,
    audioUrl: "https://voa-audio.voanews.eu/vle/2017/09/05/676d9800-cee0-4a59-9e79-b9378e0061ad.mp3",
    transcriptExcerpt: "My boss wants me to team up with someone to host a talk show.",
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
    words: [
      {word: "spread yourself too thin", arabic: "تقبل التزامات أكثر مما يمكنك التعامل معه، فيتوزّع وقتك وجهدك على أشياء كثيرة.", example: "I spread myself too thin by taking on three projects at once."},
      {word: "take on", arabic: "يتولّى مهمة أو يقبل تحمّل مسؤولية جديدة.", example: "I can't take on another project this month."},
    ],
  },
];
