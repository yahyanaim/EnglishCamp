export type PhrasalVerbParticle = {
  particle: string;
  meaning: string;
  example: string;
  arabic: string;
};

export type PhrasalVerb = {
  verb: string;
  particle: string;
  meaning: string;
  example: string;
  exampleEn: string;
  arabic: string;
};

export const PHRASAL_VERB_PARTICLES: PhrasalVerbParticle[] = [
  { particle: "up", meaning: "increase, complete, improve", example: "Please speak up. / She grew up in London.", arabic: "زيادة، إكمال، تحسين" },
  { particle: "down", meaning: "decrease, reduce, stop", example: "The car broke down. / Calm down.", arabic: "تقليل، توقف" },
  { particle: "in", meaning: "enter, involve", example: "Come in. / Fill in the form.", arabic: "دخول، مشاركة" },
  { particle: "out", meaning: "exit, remove, distribute", example: "Go out. / Figure out the answer.", arabic: "خروج، إزالة، توزيع" },
  { particle: "on", meaning: "continue, start, attach", example: "Go on. / Turn on the light.", arabic: "استمرار، بدء، تشغيل" },
  { particle: "off", meaning: "remove, depart, stop", example: "Take off your coat. / The meeting is off.", arabic: "إزالة، مغادرة، إيقاف" },
  { particle: "away", meaning: "distance, continuous action", example: "Go away! / Put the food away.", arabic: "ابتعاد، استمرارية" },
  { particle: "back", meaning: "return, reverse", example: "Come back. / Pay back the money.", arabic: "عودة، تراجع" },
  { particle: "over", meaning: "cross, review, transfer", example: "Think it over. / Come over here.", arabic: "عبور، مراجعة، نقل" },
  { particle: "through", meaning: "complete, endure, connect", example: "Get through the exam. / Put me through.", arabic: "إكمال، تحمل، اتصال" },
];

export const PHRASAL_VERBS: PhrasalVerb[] = [
  // UP
  { verb: "give", particle: "up", meaning: "to stop trying", example: "Don't give up on your dreams.", exampleEn: "Don't give up on your dreams.", arabic: "يستسلم" },
  { verb: "pick", particle: "up", meaning: "to lift / collect", example: "I'll pick you up at 8.", exampleEn: "I'll pick you up at 8.", arabic: "يلتقط / يصطحب" },
  { verb: "grow", particle: "up", meaning: "to become an adult", example: "I grew up in a small town.", exampleEn: "I grew up in a small town.", arabic: "يكبر / ينشأ" },
  { verb: "wake", particle: "up", meaning: "to stop sleeping", example: "I wake up at 7 every day.", exampleEn: "I wake up at 7 every day.", arabic: "يستيقظ" },
  { verb: "clean", particle: "up", meaning: "to make clean", example: "Clean up your room.", exampleEn: "Clean up your room.", arabic: "ينظف" },
  { verb: "show", particle: "up", meaning: "to arrive / appear", example: "He didn't show up for the meeting.", exampleEn: "He didn't show up for the meeting.", arabic: "يظهر / يحضر" },
  { verb: "look", particle: "up", meaning: "to search for information", example: "Look up the word in a dictionary.", exampleEn: "Look up the word in a dictionary.", arabic: "يبحث عن" },
  { verb: "end", particle: "up", meaning: "to finally be in a situation", example: "We ended up staying home.", exampleEn: "We ended up staying home.", arabic: "ينتهي به الأمر" },
  { verb: "make", particle: "up", meaning: "to invent / reconcile", example: "She made up a story.", exampleEn: "She made up a story.", arabic: "يختلق / يتصالح" },
  { verb: "break", particle: "up", meaning: "to end a relationship", example: "They broke up last month.", exampleEn: "They broke up last month.", arabic: "ينفصل" },

  // DOWN
  { verb: "break", particle: "down", meaning: "to stop functioning", example: "My car broke down on the highway.", exampleEn: "My car broke down on the highway.", arabic: "يتعطل" },
  { verb: "calm", particle: "down", meaning: "to become relaxed", example: "Calm down and breathe.", exampleEn: "Calm down and breathe.", arabic: "يهدأ" },
  { verb: "write", particle: "down", meaning: "to note on paper", example: "Write down the address.", exampleEn: "Write down the address.", arabic: "يدون" },
  { verb: "turn", particle: "down", meaning: "to refuse / reduce volume", example: "She turned down the job offer.", exampleEn: "She turned down the job offer.", arabic: "يرفض / يخفض" },
  { verb: "shut", particle: "down", meaning: "to close permanently", example: "The factory shut down.", exampleEn: "The factory shut down.", arabic: "يغلق" },
  { verb: "let", particle: "down", meaning: "to disappoint", example: "Don't let me down.", exampleEn: "Don't let me down.", arabic: "يخيب الظن" },

  // IN
  { verb: "come", particle: "in", meaning: "to enter", example: "Please come in.", exampleEn: "Please come in.", arabic: "يدخل" },
  { verb: "fill", particle: "in", meaning: "to complete a form", example: "Fill in the application form.", exampleEn: "Fill in the application form.", arabic: "يملأ" },
  { verb: "check", particle: "in", meaning: "to register at hotel/airport", example: "We checked in at the hotel.", exampleEn: "We checked in at the hotel.", arabic: "يسجل الوصول" },
  { verb: "give", particle: "in", meaning: "to surrender", example: "He finally gave in to pressure.", exampleEn: "He finally gave in to pressure.", arabic: "يستسلم" },
  { verb: "join", particle: "in", meaning: "to participate", example: "Everyone joined in the song.", exampleEn: "Everyone joined in the song.", arabic: "يشارك" },

  // OUT
  { verb: "find", particle: "out", meaning: "to discover", example: "I found out the truth.", exampleEn: "I found out the truth.", arabic: "يكتشف" },
  { verb: "figure", particle: "out", meaning: "to solve / understand", example: "I can't figure out this puzzle.", exampleEn: "I can't figure out this puzzle.", arabic: "يحل / يفهم" },
  { verb: "go", particle: "out", meaning: "to leave home for fun", example: "Let's go out tonight.", exampleEn: "Let's go out tonight.", arabic: "يخرج" },
  { verb: "point", particle: "out", meaning: "to indicate", example: "She pointed out the mistake.", exampleEn: "She pointed out the mistake.", arabic: "يشير إلى" },
  { verb: "run", particle: "out", meaning: "to have no more", example: "We ran out of milk.", exampleEn: "We ran out of milk.", arabic: "ينفد" },
  { verb: "cut", particle: "out", meaning: "to remove / stop", example: "Cut out sugar from your diet.", exampleEn: "Cut out sugar from your diet.", arabic: "يقطع / يزيل" },
  { verb: "work", particle: "out", meaning: "to exercise / solve", example: "I work out at the gym. / Things worked out fine.", exampleEn: "I work out at the gym.", arabic: "يتمرن / ينجح" },
  { verb: "check", particle: "out", meaning: "to investigate / leave hotel", example: "Check out this website. / We checked out at noon.", exampleEn: "Check out this website.", arabic: "يتحقق / يغادر" },

  // ON
  { verb: "turn", particle: "on", meaning: "to start a device", example: "Turn on the TV.", exampleEn: "Turn on the TV.", arabic: "يشغل" },
  { verb: "get", particle: "on", meaning: "to board / have a relationship", example: "Get on the bus. / We get on well.", exampleEn: "Get on the bus.", arabic: "يركب / ينسجم" },
  { verb: "go", particle: "on", meaning: "to continue", example: "Please go on with your story.", exampleEn: "Please go on with your story.", arabic: "يستمر" },
  { verb: "carry", particle: "on", meaning: "to continue", example: "Carry on with your work.", exampleEn: "Carry on with your work.", arabic: "يواصل" },
  { verb: "put", particle: "on", meaning: "to wear / organize", example: "Put on your coat. / We put on a show.", exampleEn: "Put on your coat.", arabic: "يرتدي / ينظم" },
  { verb: "try", particle: "on", meaning: "to test clothing", example: "Try on these shoes.", exampleEn: "Try on these shoes.", arabic: "يجرب (ملابس)" },
  { verb: "keep", particle: "on", meaning: "to continue doing", example: "Keep on trying.", exampleEn: "Keep on trying.", arabic: "يستمر في" },
  { verb: "hold", particle: "on", meaning: "to wait", example: "Hold on a moment please.", exampleEn: "Hold on a moment please.", arabic: "ينتظر" },

  // OFF
  { verb: "turn", particle: "off", meaning: "to stop a device", example: "Turn off the lights.", exampleEn: "Turn off the lights.", arabic: "يطفئ" },
  { verb: "take", particle: "off", meaning: "to remove clothing / depart", example: "Take off your shoes. / The plane took off.", exampleEn: "Take off your shoes.", arabic: "يخلع / يقلع" },
  { verb: "put", particle: "off", meaning: "to postpone", example: "Don't put off your homework.", exampleEn: "Don't put off your homework.", arabic: "يؤجل" },
  { verb: "call", particle: "off", meaning: "to cancel", example: "They called off the wedding.", exampleEn: "They called off the wedding.", arabic: "يلغي" },
  { verb: "show", particle: "off", meaning: "to boast", example: "He's always showing off his car.", exampleEn: "He's always showing off his car.", arabic: "يتباهى" },
  { verb: "drop", particle: "off", meaning: "to deliver / fall asleep", example: "I'll drop you off at the station.", exampleEn: "I'll drop you off at the station.", arabic: "يوصل / يغفو" },
  { verb: "pay", particle: "off", meaning: "to finish paying", example: "I finally paid off my debt.", exampleEn: "I finally paid off my debt.", arabic: "يسدد" },

  // AWAY
  { verb: "go", particle: "away", meaning: "to leave", example: "Go away! I'm busy.", exampleEn: "Go away! I'm busy.", arabic: "يبتعد" },
  { verb: "put", particle: "away", meaning: "to store", example: "Put away your toys.", exampleEn: "Put away your toys.", arabic: "يخزن / يرتب" },
  { verb: "throw", particle: "away", meaning: "to discard", example: "Don't throw away the receipt.", exampleEn: "Don't throw away the receipt.", arabic: "يرمي" },
  { verb: "give", particle: "away", meaning: "to donate / reveal", example: "She gave away her old clothes. / He gave away the secret.", exampleEn: "She gave away her old clothes.", arabic: "يتبرع / يكشف" },
  { verb: "run", particle: "away", meaning: "to escape", example: "The boy ran away from home.", exampleEn: "The boy ran away from home.", arabic: "يهرب" },
  { verb: "get", particle: "away", meaning: "to escape", example: "The thief got away.", exampleEn: "The thief got away.", arabic: "يهرب / يفلت" },

  // BACK
  { verb: "come", particle: "back", meaning: "to return", example: "Come back soon!", exampleEn: "Come back soon!", arabic: "يعود" },
  { verb: "pay", particle: "back", meaning: "to return money", example: "I'll pay you back tomorrow.", exampleEn: "I'll pay you back tomorrow.", arabic: "يسدد" },
  { verb: "call", particle: "back", meaning: "to return a call", example: "I'll call you back later.", exampleEn: "I'll call you back later.", arabic: "يعيد الاتصال" },
  { verb: "hold", particle: "back", meaning: "to restrain", example: "She held back her tears.", exampleEn: "She held back her tears.", arabic: "يكبح" },
  { verb: "give", particle: "back", meaning: "to return something", example: "Give me back my pen.", exampleEn: "Give me back my pen.", arabic: "يعيد" },
  { verb: "look", particle: "back", meaning: "to think about the past", example: "Looking back, I was very lucky.", exampleEn: "Looking back, I was very lucky.", arabic: "ينظر إلى الماضي" },

  // OVER
  { verb: "think", particle: "over", meaning: "to consider carefully", example: "Think it over before deciding.", exampleEn: "Think it over before deciding.", arabic: "يفكر ملياً" },
  { verb: "go", particle: "over", meaning: "to review", example: "Let's go over the lesson again.", exampleEn: "Let's go over the lesson again.", arabic: "يراجع" },
  { verb: "come", particle: "over", meaning: "to visit", example: "Come over to my house.", exampleEn: "Come over to my house.", arabic: "يزور" },
  { verb: "get", particle: "over", meaning: "to recover from", example: "She got over the flu.", exampleEn: "She got over the flu.", arabic: "يتعافى من" },
  { verb: "run", particle: "over", meaning: "to hit with a vehicle", example: "He almost ran over a cat.", exampleEn: "He almost ran over a cat.", arabic: "يدهس" },
  { verb: "take", particle: "over", meaning: "to gain control", example: "The company was taken over.", exampleEn: "The company was taken over.", arabic: "يستحوذ على" },

  // THROUGH
  { verb: "get", particle: "through", meaning: "to survive / connect by phone", example: "I got through the exam. / I couldn't get through.", exampleEn: "I got through the exam.", arabic: "يجتاز / يتصل" },
  { verb: "go", particle: "through", meaning: "to experience / examine", example: "She went through a difficult time. / Go through the documents.", exampleEn: "She went through a difficult time.", arabic: "يمر بـ / يدقق" },
  { verb: "look", particle: "through", meaning: "to quickly examine", example: "Look through the report.", exampleEn: "Look through the report.", arabic: "يتصفح" },
  { verb: "put", particle: "through", meaning: "to connect by phone", example: "Put me through to the manager.", exampleEn: "Put me through to the manager.", arabic: "يُوصل (هاتفياً)" },
  { verb: "come", particle: "through", meaning: "to succeed despite difficulty", example: "He came through the operation well.", exampleEn: "He came through the operation well.", arabic: "ينجح رغم الصعاب" },
];
