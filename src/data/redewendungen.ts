export type IdiomEntry = {
  idiom: string;
  meaning: string;
  example: string;
  arabic: string;
  category: string;
};

export const IDIOMS: IdiomEntry[] = [
  // ── Time Idioms ──
  { idiom: "Once in a blue moon", meaning: "Very rarely; almost never.", example: "I only see my old school friends once in a blue moon.", arabic: "نادراً جداً / مرة في الزمن النادر.", category: "time" },
  { idiom: "Better late than never", meaning: "It is better to do something late than not do it at all.", example: "I finally apologized to her. Better late than never, right?", arabic: "أن تأتي متأخراً أفضل من ألا تأتي أبداً.", category: "time" },
  { idiom: "In the nick of time", meaning: "Just in time; at the last possible moment.", example: "We arrived at the airport in the nick of time before the gate closed.", arabic: "في الوقت المناسب تماماً / في اللحظة الأخيرة.", category: "time" },
  { idiom: "Time flies", meaning: "Time passes very quickly, especially when you're enjoying yourself.", example: "I can't believe it's already midnight. Time flies when you're having fun!", arabic: "الوقت يمر بسرعة / الوقت يطير.", category: "time" },
  { idiom: "Kill time", meaning: "To do something to make time pass faster while waiting.", example: "We killed time playing cards while waiting for our flight.", arabic: "يقتل الوقت / يمضي الوقت بشيء غير مفيد.", category: "time" },
  { idiom: "A matter of time", meaning: "Something that will definitely happen sooner or later.", example: "If he keeps driving like that, it's only a matter of time before he has an accident.", arabic: "مسألة وقت / أمر محقق الحدوث عاجلاً أم آجلاً.", category: "time" },
  { idiom: "Around the clock", meaning: "Non-stop; 24 hours a day.", example: "The team worked around the clock to meet the project deadline.", arabic: "على مدار الساعة / بدون توقف.", category: "time" },
  { idiom: "Call it a day", meaning: "To stop working for the rest of the day.", example: "We've been working since 7 AM. Let's call it a day and go home.", arabic: "ينهي العمل لليوم / يكتفي.", category: "time" },

  // ── Emotions Idioms ──
  { idiom: "Over the moon", meaning: "Extremely happy or delighted.", example: "She was over the moon when she got the job offer.", arabic: "في غاية السعادة / طائر من الفرح.", category: "emotions" },
  { idiom: "Down in the dumps", meaning: "Feeling sad or depressed.", example: "He's been down in the dumps ever since his dog ran away.", arabic: "حزين / مكتئب / في حالة نفسية سيئة.", category: "emotions" },
  { idiom: "On cloud nine", meaning: "Extremely happy and excited.", example: "After winning the competition, I was on cloud nine for days.", arabic: "في قمة السعادة / في السماء السابعة.", category: "emotions" },
  { idiom: "Hit the roof", meaning: "To become very angry suddenly.", example: "My dad hit the roof when he saw the damage to the car.", arabic: "يثور غضباً / يفقد أعصابه.", category: "emotions" },
  { idiom: "Get cold feet", meaning: "To become nervous or lose courage before doing something important.", example: "She got cold feet just before the wedding and almost ran away.", arabic: "يفقد الشجاعة / يتراجع في اللحظة الأخيرة.", category: "emotions" },
  { idiom: "Keep your chin up", meaning: "To stay positive and cheerful in a difficult situation.", example: "I know you're going through a tough time, but keep your chin up!", arabic: "ابقَ متفائلاً / ارفع رأسك ولا تيأس.", category: "emotions" },
  { idiom: "Burst into tears", meaning: "To suddenly start crying uncontrollably.", example: "When she heard the bad news, she burst into tears.", arabic: "ينفجر باكياً / يبدأ في البكاء فجأة.", category: "emotions" },
  { idiom: "Lose your temper", meaning: "To suddenly become very angry.", example: "I'm sorry I lost my temper earlier. I was under a lot of stress.", arabic: "يفقد أعصابه / يغضب بشدة.", category: "emotions" },

  // ── Business / Work Idioms ──
  { idiom: "Back to the drawing board", meaning: "To start over from the beginning after a failure.", example: "The prototype didn't work, so it's back to the drawing board.", arabic: "العودة إلى نقطة البداية / البدء من جديد.", category: "business" },
  { idiom: "The ball is in your court", meaning: "It's your turn to take action or make a decision.", example: "I've made my offer. The ball is in your court now.", arabic: "الكرة الآن في ملعبك / دورك الآن.", category: "business" },
  { idiom: "Think outside the box", meaning: "To think creatively and unconventionally.", example: "We need to think outside the box to solve this marketing problem.", arabic: "يفكر خارج الصندوق / يفكر بشكل مبتكر.", category: "business" },
  { idiom: "Raise the bar", meaning: "To set higher standards or expectations.", example: "The new competitor has raised the bar for customer service in our industry.", arabic: "يرفع المستوى / يضع معايير أعلى.", category: "business" },
  { idiom: "Cut corners", meaning: "To do something cheaply or quickly, sacrificing quality.", example: "If we cut corners on safety, someone could get hurt.", arabic: "يختصر الطرق بطريقة غير جيدة / يضحي بالجودة.", category: "business" },
  { idiom: "Get the ball rolling", meaning: "To start a process or activity.", example: "Let's get the ball rolling on this project by assigning tasks today.", arabic: "يبدأ العمل / يحرك الأمور.", category: "business" },
  { idiom: "Face the music", meaning: "To accept and deal with the consequences of your actions.", example: "He made a mistake and now he has to face the music.", arabic: "يواجه العواقب / يتحمل نتيجة أفعاله.", category: "business" },
  { idiom: "Bite off more than you can chew", meaning: "To take on more responsibility than you can handle.", example: "I think I bit off more than I can chew by agreeing to lead three projects.", arabic: "يأخذ على عاتقه أكثر مما يستطيع / يتحمل فوق طاقته.", category: "business" },

  // ── Body Idioms ──
  { idiom: "Keep an eye on", meaning: "To watch or monitor someone or something carefully.", example: "Could you keep an eye on my bag while I go to the toilet?", arabic: "يراقب / يحتفظ بعين على شيء.", category: "body" },
  { idiom: "Cost an arm and a leg", meaning: "To be extremely expensive.", example: "The repairs cost an arm and a leg. I had to take out a loan.", arabic: "مكلف جداً / يكلف ذراعاً ورجلاً.", category: "body" },
  { idiom: "Pull someone's leg", meaning: "To tease or joke with someone.", example: "Don't worry, I'm just pulling your leg! I didn't really forget your birthday.", arabic: "يمازح / يسخر بشكل لطيف.", category: "body" },
  { idiom: "Play it by ear", meaning: "To decide how to act as a situation develops rather than planning.", example: "I don't know what time I'll finish work. Let's just play it by ear.", arabic: "يتصرف حسب الموقف / يرتجل.", category: "body" },
  { idiom: "Give someone a hand", meaning: "To help someone with something.", example: "Could you give me a hand with these boxes? They're very heavy.", arabic: "يساعد شخصاً / يمد يد العون.", category: "body" },
  { idiom: "Have your hands full", meaning: "To be very busy with something.", example: "With three young children, she has her hands full all day.", arabic: "مشغول جداً / لديه ما يكفيه من العمل.", category: "body" },
  { idiom: "Keep your fingers crossed", meaning: "To hope for good luck or success.", example: "I'm keeping my fingers crossed that I get the job.", arabic: "يتمنى التوفيق / يشبك أصابعه دعاءً.", category: "body" },
  { idiom: "See eye to eye", meaning: "To agree with someone; to share the same opinion.", example: "My brother and I don't always see eye to eye on politics.", arabic: "يتفق في الرأي / يرى نفس الرؤية.", category: "body" },

  // ── Food Idioms ──
  { idiom: "Piece of cake", meaning: "Something very easy to do.", example: "The exam was a piece of cake. I finished it in twenty minutes.", arabic: "سهل جداً / قطعة كعكة.", category: "food" },
  { idiom: "Spill the beans", meaning: "To reveal a secret accidentally or intentionally.", example: "Who spilled the beans about the surprise party? It was supposed to be a secret!", arabic: "يفشي السر / يبوح بالسر.", category: "food" },
  { idiom: "Not my cup of tea", meaning: "Something you don't like or enjoy.", example: "He invited me to a heavy metal concert, but that's not my cup of tea.", arabic: "ليس من اهتماماتي / ليس في ذوقي.", category: "food" },
  { idiom: "Go bananas", meaning: "To go crazy or become very excited/angry.", example: "The crowd went bananas when their team scored the winning goal.", arabic: "يصاب بالجنون / يثور / يتحمس بشدة.", category: "food" },
  { idiom: "Butter someone up", meaning: "To flatter someone to get something from them.", example: "He's always buttering up the boss, hoping for a promotion.", arabic: "يتملق / يداهن / يطري أحداً.", category: "food" },
  { idiom: "Apple of my eye", meaning: "Someone who is very dear to you; a favourite person.", example: "My youngest daughter is the apple of my eye.", arabic: "قرة عيني / أعز شخص على قلبي.", category: "food" },
  { idiom: "Take it with a pinch of salt", meaning: "To not take something too seriously; to be skeptical.", example: "He exaggerates a lot, so take his stories with a pinch of salt.", arabic: "لا يأخذ الأمر بجدية مطلقة / يشك في صحة الشيء.", category: "food" },
  { idiom: "Couch potato", meaning: "A lazy person who spends a lot of time sitting and watching TV.", example: "My brother is a total couch potato. He never exercises.", arabic: "شخص كسول يقضي وقتاً طويلاً أمام التلفاز.", category: "food" },

  // ── Animal Idioms ──
  { idiom: "Let the cat out of the bag", meaning: "To reveal a secret unintentionally.", example: "I accidentally let the cat out of the bag about my sister's engagement.", arabic: "يفشي السر بالخطأ / يخرج القطة من الحقيبة.", category: "animals" },
  { idiom: "Hold your horses", meaning: "To wait a moment; to slow down.", example: "Hold your horses! We can't leave until everyone is ready.", arabic: "تمهل / انتظر / اكبح جماح نفسك.", category: "animals" },
  { idiom: "When pigs fly", meaning: "Something that will never happen.", example: "He'll clean his room when pigs fly. He's so messy!", arabic: "عندما يطير الخنزير / مستحيل الحدوث.", category: "animals" },
  { idiom: "Kill two birds with one stone", meaning: "To accomplish two things with a single action.", example: "By shopping on my way home, I killed two birds with one stone.", arabic: "يقتل عصفورين بحجر واحد.", category: "animals" },
  { idiom: "The elephant in the room", meaning: "An obvious problem or uncomfortable situation that everyone ignores.", example: "Nobody mentioned the budget cuts, but it was the elephant in the room.", arabic: "الفيل في الغرفة / مشكلة واضحة يتجاهلها الجميع.", category: "animals" },
  { idiom: "A bird's eye view", meaning: "A view from a high angle; a general overview.", example: "From the top of the tower, we had a bird's eye view of the entire city.", arabic: "منظر عين الطائر / رؤية شاملة من الأعلى.", category: "animals" },
  { idiom: "Let sleeping dogs lie", meaning: "To avoid interfering in a situation that might cause trouble.", example: "I wanted to ask about their argument, but I decided to let sleeping dogs lie.", arabic: "لا توقظ الكلب النائم / لا تفتح موضوعاً قديماً.", category: "animals" },
  { idiom: "Straight from the horse's mouth", meaning: "Directly from the most reliable source.", example: "I heard it straight from the horse's mouth — the manager herself told me.", arabic: "من المصدر الموثوق / من الفم إلى الأذن مباشرة.", category: "animals" },

  // ── Weather / Nature Idioms ──
  { idiom: "Under the weather", meaning: "Feeling ill or unwell.", example: "I'm feeling a bit under the weather today, so I'll work from home.", arabic: "مريض قليلاً / ليس على ما يرام.", category: "nature" },
  { idiom: "Weather the storm", meaning: "To get through a difficult situation safely.", example: "Small businesses struggled to weather the storm during the economic crisis.", arabic: "يجتاز العاصفة / يتجاوز فترة صعبة.", category: "nature" },
  { idiom: "A ray of sunshine", meaning: "Something positive in a difficult situation; a cheerful person.", example: "The good news was a ray of sunshine in an otherwise terrible week.", arabic: "شعاع أمل / بصيص ضوء في الظلام.", category: "nature" },
  { idiom: "Reach for the moon", meaning: "To aim very high; to have ambitious goals.", example: "If you want to succeed in life, you have to reach for the moon.", arabic: "يطمح عالياً / يحلم بأهداف كبيرة.", category: "nature" },
  { idiom: "Chase rainbows", meaning: "To pursue unrealistic or impossible goals.", example: "He's been chasing rainbows with his plan to become a rock star at age fifty.", arabic: "يطارد الأحلام المستحيلة / يسعى وراء سراب.", category: "nature" },
];
