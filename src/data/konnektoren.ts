export type KonnektorCategory =
  | "causal" | "concessive" | "conditional" | "temporal"
  | "modal" | "final" | "consecutive" | "adversative"
  | "enumerating" | "restrictive" | "addition";

export type SatzPosition = "0" | "1" | "verb-last" | "phrase" | "paired";

export type Konnektor = {
  word: string;
  english: string;
  arabic?: string;
  category: KonnektorCategory;
  position: SatzPosition;
  example: string;
  exampleEn: string;
  exampleAr?: string;
  level: "A2" | "B1" | "B2" | "C1";
};

export const CATEGORY_META: Record<KonnektorCategory, { label: string; icon: string; color: string; desc: string }> = {
  causal:        { label: "Causal",        icon: "🔗", color: "text-[var(--camp-control-ink)]",     desc: "Reason / cause (because, since, therefore)" },
  concessive:    { label: "Concessive",    icon: "🔄", color: "text-[var(--camp-control-ink)]",   desc: "Despite / although (although, however, despite)" },
  conditional:   { label: "Conditional",   icon: "🎲", color: "text-[var(--camp-control-ink)]",    desc: "If / unless (if, unless, otherwise)" },
  temporal:      { label: "Temporal",      icon: "⏰", color: "text-[var(--camp-control-ink)]",   desc: "Time (when, while, after, before, until)" },
  modal:         { label: "Modal",         icon: "⚙️", color: "text-[var(--camp-control-ink)]",    desc: "Manner / method (by, as if, without)" },
  final:         { label: "Final",         icon: "🎯", color: "text-[var(--camp-control-ink)]",      desc: "Purpose (so that, in order to)" },
  consecutive:   { label: "Consecutive",   icon: "➡️", color: "text-[var(--camp-control-ink)]",   desc: "Result (so...that, consequently, as a result)" },
  adversative:   { label: "Adversative",   icon: "⚡", color: "text-[var(--camp-control-ink)]",     desc: "Contrast (but, however, whereas, on the other hand)" },
  enumerating:   { label: "Enumerating",   icon: "📋", color: "text-[var(--camp-control-ink)]",     desc: "Ordering (first, then, finally, firstly)" },
  restrictive:   { label: "Restrictive",   icon: "🎯", color: "text-[var(--camp-control-ink)]",   desc: "Limitation (admittedly, however, even though)" },
  addition:      { label: "Addition",      icon: "➕", color: "text-[var(--camp-control-ink)]",      desc: "Adding info (also, furthermore, moreover, and)" },
};

export const KONNEKTOREN: Konnektor[] = [
  // ── Causal ──
  { word: "because", english: "because", arabic: "لأن", category: "causal", position: "verb-last", example: "I learn English because I want to work abroad.", exampleEn: "I learn English because I want to work abroad.", exampleAr: "أتعلم الإنجليزية لأنني أريد العمل في الخارج", level: "A2" },
  { word: "since", english: "since / as", arabic: "بما أن", category: "causal", position: "verb-last", example: "Since it is raining, we are staying at home.", exampleEn: "Since it is raining, we are staying at home.", exampleAr: "بما أنها تمطر، نحن نبقى في المنزل", level: "B1" },
  { word: "as", english: "as (reason)", arabic: "لأن / بما أن", category: "causal", position: "verb-last", example: "As I was tired, I went to bed early.", exampleEn: "As I was tired, I went to bed early.", exampleAr: "لأنني كنت متعباً، ذهبت إلى الفراش مبكراً", level: "B1" },
  { word: "therefore", english: "therefore", arabic: "لذلك", category: "causal", position: "1", example: "I studied a lot; therefore, I passed the exam.", exampleEn: "I studied a lot; therefore, I passed the exam.", exampleAr: "لقد درست كثيراً، لذلك نجحت في الامتحان", level: "B1" },
  { word: "so", english: "so (result)", arabic: "لذلك / لذا", category: "causal", position: "0", example: "I was tired, so I went to bed.", exampleEn: "I was tired, so I went to bed.", exampleAr: "كنت متعباً، لذا ذهبت إلى الفراش", level: "A2" },
  { word: "that's why", english: "that's why", arabic: "لهذا السبب", category: "causal", position: "1", example: "The train was late. That’s why I arrived late.", exampleEn: "The train was late. That’s why I arrived late.", exampleAr: "تأخر القطار، ولهذا السبب وصلت متأخراً", level: "B1" },
  { word: "hence", english: "hence", arabic: "وبالتالي", category: "causal", position: "1", example: "He has a lot of experience; hence, he got the job.", exampleEn: "He has a lot of experience; hence, he got the job.", exampleAr: "لديه خبرة كبيرة، وبالتالي حصل على الوظيفة", level: "B2" },
  { word: "due to", english: "due to", arabic: "بسبب / نظراً لـ", category: "causal", position: "phrase", example: "Due to the rain, the event was cancelled.", exampleEn: "Due to the rain, the event was cancelled.", exampleAr: "بسبب المطر، تم إلغاء الفعالية", level: "B2" },
  { word: "because of", english: "because of", arabic: "بسبب", category: "causal", position: "phrase", example: "Because of the traffic, I was late.", exampleEn: "Because of the traffic, I was late.", exampleAr: "بسبب الزحام، تأخرت", level: "B1" },
  { word: "for this reason", english: "for this reason", arabic: "لهذا السبب", category: "causal", position: "1", example: "For this reason, we must act now.", exampleEn: "For this reason, we must act now.", exampleAr: "لهذا السبب، يجب أن نتصرف الآن", level: "B2" },

  // ── Concessive ──
  { word: "although", english: "although", arabic: "على الرغم من أن", category: "concessive", position: "verb-last", example: "Although it rained, we went for a walk.", exampleEn: "Although it rained, we went for a walk.", exampleAr: "على الرغم من أنها أمطرت، ذهبنا في نزهة", level: "B1" },
  { word: "even though", english: "even though", arabic: "على الرغم من أن (تأكيد)", category: "concessive", position: "verb-last", example: "Even though it was difficult, we succeeded.", exampleEn: "Even though it was difficult, we succeeded.", exampleAr: "على الرغم من صعوبته، نجحنا", level: "B1" },
  { word: "though", english: "though", arabic: "لكن / مع ذلك", category: "concessive", position: "verb-last", example: "He was tired, though he continued working.", exampleEn: "He was tired, though he continued working.", exampleAr: "كان متعباً، لكنه استمر في العمل", level: "B1" },
  { word: "nevertheless", english: "nevertheless", arabic: "مع ذلك", category: "concessive", position: "1", example: "The task was hard; nevertheless, we solved it.", exampleEn: "The task was hard; nevertheless, we solved it.", exampleAr: "كانت المهمة صعبة، ومع ذلك قمنا بحلها", level: "B2" },
  { word: "despite", english: "despite", arabic: "على الرغم من", category: "concessive", position: "phrase", example: "Despite the rain, we enjoyed the trip.", exampleEn: "Despite the rain, we enjoyed the trip.", exampleAr: "على الرغم من المطر، استمتعنا بالرحلة", level: "B2" },
  { word: "in spite of", english: "in spite of", arabic: "رغم", category: "concessive", position: "phrase", example: "In spite of the difficulties, they finished the project.", exampleEn: "In spite of the difficulties, they finished the project.", exampleAr: "رغم الصعوبات، أنهوا المشروع", level: "B2" },

  // ── Conditional ──
  { word: "if", english: "if", arabic: "إذا", category: "conditional", position: "verb-last", example: "If I have time, I will come by.", exampleEn: "If I have time, I will come by.", exampleAr: "إذا كان لدي وقت، سأمر", level: "A2" },
  { word: "unless", english: "unless", arabic: "إلا إذا", category: "conditional", position: "verb-last", example: "Unless it rains, the event will be outdoors.", exampleEn: "Unless it rains, the event will be outdoors.", exampleAr: "ما لم تمطر، ستكون الفعالية في الهواء الطلق", level: "B1" },
  { word: "otherwise", english: "otherwise", arabic: "وإلا", category: "conditional", position: "1", example: "Hurry up; otherwise, we will miss the bus.", exampleEn: "Hurry up; otherwise, we will miss the bus.", exampleAr: "أسرع، وإلا سنفوت الحافلة", level: "B1" },
  { word: "as long as", english: "as long as", arabic: "طالما", category: "conditional", position: "verb-last", example: "As long as you study, you will make progress.", exampleEn: "As long as you study, you will make progress.", exampleAr: "طالما تدرس، ستتقدم", level: "B1" },
  { word: "provided that", english: "provided that", arabic: "بشرط أن", category: "conditional", position: "verb-last", example: "You can join provided that you follow the rules.", exampleEn: "You can join provided that you follow the rules.", exampleAr: "يمكنك الانضمام بشرط أن تتبع القواعد", level: "B2" },
  { word: "in case", english: "in case", arabic: "في حال", category: "conditional", position: "verb-last", example: "Take an umbrella in case it rains.", exampleEn: "Take an umbrella in case it rains.", exampleAr: "خذ مظلة في حال هطول المطر", level: "B1" },

  // ── Temporal ──
  { word: "when", english: "when", arabic: "عندما", category: "temporal", position: "verb-last", example: "When I was young, I traveled a lot.", exampleEn: "When I was young, I traveled a lot.", exampleAr: "عندما كنت صغيراً، سافرت كثيراً", level: "A2" },
  { word: "while", english: "while", arabic: "بينما / أثناء", category: "temporal", position: "verb-last", example: "While I cook, I listen to music.", exampleEn: "While I cook, I listen to music.", exampleAr: "بينما أطبخ، أستمع إلى الموسيقى", level: "A2" },
  { word: "before", english: "before", arabic: "قبل أن", category: "temporal", position: "verb-last", example: "Before we eat, we wash our hands.", exampleEn: "Before we eat, we wash our hands.", exampleAr: "قبل أن نأكل، نغسل أيدينا", level: "A2" },
  { word: "after", english: "after", arabic: "بعد أن", category: "temporal", position: "verb-last", example: "After he finished work, he went home.", exampleEn: "After he finished work, he went home.", exampleAr: "بعد أن أنهى العمل، ذهب إلى المنزل", level: "A2" },
  { word: "until", english: "until", arabic: "حتى", category: "temporal", position: "verb-last", example: "I will wait until the rain stops.", exampleEn: "I will wait until the rain stops.", exampleAr: "سأنتظر حتى يتوقف المطر", level: "A2" },
  { word: "as soon as", english: "as soon as", arabic: "بمجرد أن", category: "temporal", position: "verb-last", example: "As soon as I am done, I will call you.", exampleEn: "As soon as I am done, I will call you.", exampleAr: "بمجرد أن أنتهي، سأتصل بك", level: "B1" },
  { word: "since", english: "since (time)", arabic: "منذ", category: "temporal", position: "verb-last", example: "Since she moved to Cairo, she has been happy.", exampleEn: "Since she moved to Cairo, she has been happy.", exampleAr: "منذ أن انتقلت إلى القاهرة، وهي سعيدة", level: "B1" },
  { word: "whenever", english: "whenever", arabic: "كلما", category: "temporal", position: "verb-last", example: "Whenever I see him, I say hello.", exampleEn: "Whenever I see him, I say hello.", exampleAr: "كلما أراه، ألقي التحية", level: "B1" },

  // ── Modal ──
  { word: "by", english: "by (doing)", arabic: "عن طريق", category: "modal", position: "phrase", example: "You save time by shopping online.", exampleEn: "You save time by shopping online.", exampleAr: "يمكن توفير الوقت عن طريق التسوق عبر الإنترنت", level: "B2" },
  { word: "as if", english: "as if", arabic: "كما لو", category: "modal", position: "verb-last", example: "He acts as if he knew nothing.", exampleEn: "He acts as if he knew nothing.", exampleAr: "يتصرف كما لو أنه لا يعرف شيئاً", level: "B2" },
  { word: "without", english: "without", arabic: "دون", category: "modal", position: "phrase", example: "He left without saying goodbye.", exampleEn: "He left without saying goodbye.", exampleAr: "ذهب دون أن يودع", level: "B2" },
  { word: "like", english: "like / as", arabic: "كما / مثل", category: "modal", position: "phrase", example: "He does as he pleases.", exampleEn: "He does as he pleases.", exampleAr: "هو يفعل كما يشاء", level: "A2" },

  // ── Final (Purpose) ──
  { word: "so that", english: "so that", arabic: "لكي / حتى", category: "final", position: "verb-last", example: "I explain it to you so that you understand.", exampleEn: "I explain it to you so that you understand.", exampleAr: "أشرحه لك لكي تفهمه", level: "B1" },
  { word: "in order to", english: "in order to", arabic: "لكي / من أجل", category: "final", position: "phrase", example: "She saves money in order to buy a car.", exampleEn: "She saves money in order to buy a car.", exampleAr: "هي تدخر المال من أجل شراء سيارة", level: "B1" },
  { word: "to", english: "to (purpose)", arabic: "لـ", category: "final", position: "phrase", example: "I went to the store to buy milk.", exampleEn: "I went to the store to buy milk.", exampleAr: "ذهبت إلى المتجر لشراء الحليب", level: "A2" },

  // ── Consecutive ──
  { word: "so...that", english: "so...that", arabic: "لدرجة أن", category: "consecutive", position: "paired", example: "It was so cold that we shivered.", exampleEn: "It was so cold that we shivered.", exampleAr: "كان الجو بارداً لدرجة أننا كنا نرتعد", level: "B1" },
  { word: "such...that", english: "such...that", arabic: "بدرجة أن", category: "consecutive", position: "paired", example: "It was such a good movie that we watched it twice.", exampleEn: "It was such a good movie that we watched it twice.", exampleAr: "كان فيلماً رائعاً لدرجة أننا شاهدناه مرتين", level: "B2" },
  { word: "consequently", english: "consequently", arabic: "وبالتالي", category: "consecutive", position: "1", example: "He did not study; consequently, he failed.", exampleEn: "He did not study; consequently, he failed.", exampleAr: "لم يدرس، وبالتالي رسب", level: "B2" },
  { word: "as a result", english: "as a result", arabic: "نتيجة لذلك", category: "consecutive", position: "1", example: "The company expanded, as a result new jobs were created.", exampleEn: "The company expanded, as a result new jobs were created.", exampleAr: "توسعت الشركة، ونتيجة لذلك تم إنشاء وظائف جديدة", level: "B2" },

  // ── Adversative ──
  { word: "but", english: "but", arabic: "لكن", category: "adversative", position: "0", example: "I wanted to come, but I had no time.", exampleEn: "I wanted to come, but I had no time.", exampleAr: "أردت المجيء، لكن لم يكن لدي وقت", level: "A2" },
  { word: "however", english: "however", arabic: "مع ذلك / غير أن", category: "adversative", position: "1", example: "The hotel was cheap, however not very clean.", exampleEn: "The hotel was cheap, however not very clean.", exampleAr: "كان الفندق رخيصاً، غير أنه لم يكن نظيفاً جداً", level: "B1" },
  { word: "whereas", english: "whereas", arabic: "بينما", category: "adversative", position: "verb-last", example: "She works quickly, whereas he is very slow.", exampleEn: "She works quickly, whereas he is very slow.", exampleAr: "هي تعمل بسرعة، بينما هو بطيء جداً", level: "C1" },
  { word: "on the other hand", english: "on the other hand", arabic: "من ناحية أخرى", category: "adversative", position: "1", example: "It is cheap, on the other hand the quality is poor.", exampleEn: "It is cheap, on the other hand the quality is poor.", exampleAr: "إنه رخيص، من ناحية أخرى الجودة رديئة", level: "B2" },
  { word: "in contrast", english: "in contrast", arabic: "بالمقابل", category: "adversative", position: "1", example: "The north is flat, the south in contrast is mountainous.", exampleEn: "The north is flat, the south in contrast is mountainous.", exampleAr: "الشمال مسطح، الجنوب بالمقابل جبلي", level: "B2" },

  // ── Enumerating ──
  { word: "first / firstly", english: "first(ly)", arabic: "أولاً", category: "enumerating", position: "1", example: "First, we wash the vegetables; then we cut them.", exampleEn: "First, we wash the vegetables; then we cut them.", exampleAr: "أولاً نغسل الخضار، ثم نقطعها", level: "A2" },
  { word: "then", english: "then", arabic: "ثم", category: "enumerating", position: "1", example: "First I shower; then I have breakfast.", exampleEn: "First I shower; then I have breakfast.", exampleAr: "أولاً أستحم، ثم أتناول الفطور", level: "A2" },
  { word: "next", english: "next", arabic: "بعد ذلك", category: "enumerating", position: "1", example: "Next, we add the sugar and stir.", exampleEn: "Next, we add the sugar and stir.", exampleAr: "بعد ذلك، نضيف السكر ونخلط", level: "A2" },
  { word: "finally", english: "finally", arabic: "أخيراً", category: "enumerating", position: "1", example: "Finally, we found the key.", exampleEn: "Finally, we found the key.", exampleAr: "أخيراً، وجدنا المفتاح", level: "B1" },
  { word: "in conclusion", english: "in conclusion", arabic: "ختاماً", category: "enumerating", position: "1", example: "In conclusion, I would like to thank everyone.", exampleEn: "In conclusion, I would like to thank everyone.", exampleAr: "ختاماً، أود أن أشكر الجميع", level: "B2" },
  { word: "furthermore", english: "furthermore", arabic: "علاوة على ذلك", category: "enumerating", position: "1", example: "He is friendly, furthermore very helpful.", exampleEn: "He is friendly, furthermore very helpful.", exampleAr: "هو لطيف، علاوة على ذلك مفيد جداً", level: "B1" },
  { word: "on the one hand...on the other", english: "on the one hand...on the other", arabic: "من ناحية...من ناحية أخرى", category: "enumerating", position: "paired", example: "On the one hand the job is interesting, on the other hand it is poorly paid.", exampleEn: "On the one hand the job is interesting, on the other hand it is poorly paid.", exampleAr: "من ناحية الوظيفة مثيرة للاهتمام، من ناحية أخرى أجرها سيء", level: "B2" },

  // ── Restrictive ──
  { word: "admittedly", english: "admittedly", arabic: "صحيح أن / مما لا شك فيه", category: "restrictive", position: "1", example: "Admittedly the weather was bad, but the vacation was still nice.", exampleEn: "Admittedly the weather was bad, but the vacation was still nice.", exampleAr: "صحيح أن الطقس كان سيئاً، لكن العطلة كانت جميلة رغم ذلك", level: "B1" },
  { word: "however", english: "however (restrictive)", arabic: "لكن / مع ذلك", category: "restrictive", position: "1", example: "The apartment is nice, however very small.", exampleEn: "The apartment is nice, however very small.", exampleAr: "الشقة جميلة، لكنها صغيرة جداً", level: "B1" },

  // ── Addition ──
  { word: "and", english: "and", arabic: "و", category: "addition", position: "0", example: "I buy bread and milk.", exampleEn: "I buy bread and milk.", exampleAr: "أشتري خبزاً وحليباً", level: "A2" },
  { word: "also", english: "also / too", arabic: "أيضاً", category: "addition", position: "1", example: "I like pizza, and I also like pasta.", exampleEn: "I like pizza, and I also like pasta.", exampleAr: "أحب البيتزا، وأحب أيضاً المعكرونة", level: "A2" },
  { word: "in addition", english: "in addition", arabic: "بالإضافة إلى ذلك", category: "addition", position: "1", example: "The restaurant is cheap. In addition, it is centrally located.", exampleEn: "The restaurant is cheap. In addition, it is centrally located.", exampleAr: "المطعم رخيص، بالإضافة إلى ذلك يقع في المركز", level: "B1" },
  { word: "moreover", english: "moreover", arabic: "علاوة على ذلك", category: "addition", position: "1", example: "The company is growing; moreover, profits are rising.", exampleEn: "The company is growing; moreover, profits are rising.", exampleAr: "الشركة تنمو، علاوة على ذلك الأرباح في ازدياد", level: "B2" },
  { word: "both...and", english: "both...and", arabic: "كل من...و", category: "addition", position: "paired", example: "Both my brother and my sister are studying.", exampleEn: "Both my brother and my sister are studying.", exampleAr: "كل من أخي وأختي يدرسان", level: "B1" },
  { word: "not only...but also", english: "not only...but also", arabic: "ليس فقط...بل أيضاً", category: "addition", position: "paired", example: "He speaks not only English but also French.", exampleEn: "He speaks not only English but also French.", exampleAr: "هو لا يتحدث الإنجليزية فقط، بل أيضاً الفرنسية", level: "B1" },
  // Additional contextual linking expressions.
  {"word":"owing to","english":"because of a stated cause","category":"causal","position":"phrase","example":"The path was closed owing to storm damage.","exampleEn":"The path was closed owing to storm damage.","exampleAr":"بسبب أضرار العاصفة أُغلق المسار.","level":"B2"},
  {"word":"even if","english":"regardless of whether a condition becomes true","category":"conditional","position":"verb-last","example":"We will leave at six even if it is raining.","exampleEn":"We will leave at six even if it is raining.","exampleAr":"سنغادر الساعة السادسة حتى لو كانت تمطر.","level":"B2"},
  {"word":"whether or not","english":"in either of two possible situations","category":"conditional","position":"verb-last","example":"The event will take place whether or not the mayor attends.","exampleEn":"The event will take place whether or not the mayor attends.","exampleAr":"ستقام الفعالية سواء حضر العمدة أم لم يحضر.","level":"B2"},
  {"word":"once","english":"after something has happened","category":"temporal","position":"verb-last","example":"Once you finish the form, send it to the office.","exampleEn":"Once you finish the form, send it to the office.","exampleAr":"بعد أن تنهي الاستمارة أرسلها إلى المكتب.","level":"B1"},
  {"word":"meanwhile","english":"during the same period in a separate situation","category":"temporal","position":"1","example":"Maya prepared the slides. Meanwhile, Leo checked the equipment.","exampleEn":"Maya prepared the slides. Meanwhile, Leo checked the equipment.","exampleAr":"أعدّت مايا الشرائح. وفي هذه الأثناء فحص ليو المعدات.","level":"B2"},
  {"word":"as though","english":"in a way suggesting an imagined situation","category":"modal","position":"verb-last","example":"He looked as though he had not slept.","exampleEn":"He looked as though he had not slept.","exampleAr":"بدا كأنه لم ينم.","level":"B2"},
  {"word":"in order that","english":"for the purpose of making a situation possible","category":"final","position":"verb-last","example":"The instructions were translated in order that everyone could understand them.","exampleEn":"The instructions were translated in order that everyone could understand them.","exampleAr":"تُرجمت التعليمات لكي يتمكن الجميع من فهمها.","level":"C1"},
  {"word":"thereby","english":"as a result of the preceding action","category":"consecutive","position":"1","example":"They insulated the roof, thereby reducing heat loss.","exampleEn":"They insulated the roof, thereby reducing heat loss.","exampleAr":"عزلوا السقف، مما قلّل فقدان الحرارة.","level":"C1"},
  {"word":"nonetheless","english":"despite what has just been said","category":"concessive","position":"1","example":"The journey was tiring. Nonetheless, we enjoyed it.","exampleEn":"The journey was tiring. Nonetheless, we enjoyed it.","exampleAr":"كانت الرحلة متعبة. ومع ذلك استمتعنا بها.","level":"B2"},
  {"word":"by contrast","english":"showing a difference from the preceding case","category":"adversative","position":"1","example":"The first route is steep. By contrast, the second is almost flat.","exampleEn":"The first route is steep. By contrast, the second is almost flat.","exampleAr":"المسار الأول شديد الانحدار. وعلى النقيض فإن الثاني شبه مستوٍ.","level":"B2"},
  {"word":"alternatively","english":"introducing another available choice","category":"adversative","position":"1","example":"You can take the bus. Alternatively, you can walk.","exampleEn":"You can take the bus. Alternatively, you can walk.","exampleAr":"يمكنك ركوب الحافلة. أو يمكنك بدلاً من ذلك المشي.","level":"B2"},
  {"word":"subsequently","english":"at a later time","category":"enumerating","position":"1","example":"She completed the training and subsequently became a tutor.","exampleEn":"She completed the training and subsequently became a tutor.","exampleAr":"أكملت التدريب ثم أصبحت مدرّسة.","level":"C1"},
  {"word":"to some extent","english":"limiting the degree to which a statement is true","category":"restrictive","position":"1","example":"To some extent, the result depends on the weather.","exampleEn":"To some extent, the result depends on the weather.","exampleAr":"إلى حد ما تعتمد النتيجة على الطقس.","level":"B2"},
  {"word":"in particular","english":"giving special attention to one member of a group","category":"restrictive","position":"1","example":"Several rooms need repairs, in particular the kitchen.","exampleEn":"Several rooms need repairs, in particular the kitchen.","exampleAr":"تحتاج عدة غرف إلى إصلاح، وخاصة المطبخ.","level":"B2"},
  {"word":"as well as","english":"adding a noun phrase or an -ing activity","category":"addition","position":"phrase","example":"As well as teaching, she writes textbooks.","exampleEn":"As well as teaching, she writes textbooks.","exampleAr":"بالإضافة إلى التدريس تكتب كتباً دراسية.","level":"B1"},
  {"word":"what is more","english":"adding an emphatic supporting point","category":"addition","position":"1","example":"The library is free. What is more, it opens every evening.","exampleEn":"The library is free. What is more, it opens every evening.","exampleAr":"المكتبة مجانية. وعلاوة على ذلك تفتح كل مساء.","level":"B2"},
];
