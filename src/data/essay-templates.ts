export type Phrase = { de: string; en: string; ar?: string };

export type EssayTemplateSection = {
  name: string;
  description: string;
  descriptionAr?: string;
  phrases: Phrase[];
};

export type EssayTemplate = {
  id: string;
  title: string;
  titleAr?: string;
  task: string;
  taskAr?: string;
  level: string;
  structure: string;
  sections: EssayTemplateSection[];
  tips: string[];
  tipsAr?: string[];
};

export const ESSAY_TEMPLATES: EssayTemplate[] = [
  // ── OPINION ESSAY ──
  {
    id: "opinion-essay",
    title: "Opinion Essay",
    titleAr: "مقال الرأي",
    task: "Express your opinion on a topic with arguments and examples",
    taskAr: "أبدِ رأيك في موضوع مع الحجج والأمثلة",
    level: "B2",
    structure: "Introduction → Arguments for → Arguments against → Your opinion → Conclusion",
    sections: [
      {
        name: "Introduction",
        description: "Introduce the topic and state that opinions differ",
        descriptionAr: "قدّم الموضوع واذكر أن الآراء تختلف",
        phrases: [
          { de: "The issue of ... has become increasingly controversial in recent years.", en: "The issue of ... has become increasingly controversial in recent years.", ar: "أصبحت قضية ... مثيرة للجدل بشكل متزايد في السنوات الأخيرة." },
          { de: "There is no doubt that ... is a topic that divides opinion.", en: "There is no doubt that ... is a topic that divides opinion.", ar: "لا شك أن ... موضوع ي divide الآراء." },
          { de: "Many people believe that ..., while others argue that ...", en: "Many people believe that ..., while others argue that ...", ar: "يعتقد الكثير من الناس أن ...، بينما يجادل آخرون بأن ..." },
          { de: "In this essay, I will examine both sides of the argument before giving my view.", en: "In this essay, I will examine both sides of the argument before giving my view.", ar: "في هذا المقال، سأفحص جانبي الحجة قبل إبداء رأيي." },
          { de: "The question of whether ... has sparked widespread debate.", en: "The question of whether ... has sparked widespread debate.", ar: "أثارت مسألة ما إذا كان ... جدلاً واسع النطاق." },
        ],
      },
      {
        name: "Arguments For",
        description: "Present arguments in favour — give reasons and examples",
        descriptionAr: "قدم حججاً مؤيدة — أعط أسباباً وأمثلة",
        phrases: [
          { de: "One of the main arguments in favour of ... is that ...", en: "One of the main arguments in favour of ... is that ...", ar: "أحد الحجج الرئيسية المؤيدة لـ ... هي أن ..." },
          { de: "Supporters of ... claim that ...", en: "Supporters of ... claim that ...", ar: "يدّعي مؤيدو ... أن ..." },
          { de: "Firstly, it is widely believed that ...", en: "Firstly, it is widely believed that ...", ar: "أولاً، يُعتقد على نطاق واسع أن ..." },
          { de: "Another advantage is that ...", en: "Another advantage is that ...", ar: "ميزة أخرى هي أن ..." },
          { de: "Furthermore, studies have shown that ...", en: "Furthermore, studies have shown that ...", ar: "علاوة على ذلك، أظهرت الدراسات أن ..." },
          { de: "In addition to this, ...", en: "In addition to this, ...", ar: "بالإضافة إلى ذلك، ..." },
        ],
      },
      {
        name: "Arguments Against",
        description: "Present opposing views fairly before refuting them",
        descriptionAr: "قدم وجهات النظر المعارضة بشكل منصف قبل دحضها",
        phrases: [
          { de: "On the other hand, critics argue that ...", en: "On the other hand, critics argue that ...", ar: "من ناحية أخرى، يجادل النقاد بأن ..." },
          { de: "Opponents of this view claim that ...", en: "Opponents of this view claim that ...", ar: "يدّعي معارضو هذا الرأي أن ..." },
          { de: "A common counter-argument is that ...", en: "A common counter-argument is that ...", ar: "حجة مضادة شائعة هي أن ..." },
          { de: "However, not everyone agrees. Some people feel that ...", en: "However, not everyone agrees. Some people feel that ...", ar: "ومع ذلك، لا يتفق الجميع. بعض الناس يشعرون أن ..." },
          { de: "Another disadvantage is that ...", en: "Another disadvantage is that ...", ar: "عيب آخر هو أن ..." },
          { de: "Nevertheless, one must also consider that ...", en: "Nevertheless, one must also consider that ...", ar: "ومع ذلك، يجب أيضاً مراعاة أن ..." },
        ],
      },
      {
        name: "Your Opinion",
        description: "State your own position with supporting reasoning",
        descriptionAr: "حدد موقفك الشخصي مع الأسباب الداعمة",
        phrases: [
          { de: "In my opinion, ...", en: "In my opinion, ...", ar: "في رأيي، ..." },
          { de: "From my perspective, ...", en: "From my perspective, ...", ar: "من وجهة نظري، ..." },
          { de: "I firmly believe that ...", en: "I firmly believe that ...", ar: "أعتقد اعتقاداً راسخاً أن ..." },
          { de: "While both sides have valid points, I personally think that ...", en: "While both sides have valid points, I personally think that ...", ar: "بينما كلا الجانبين لديه نقاط صحيحة، أنا شخصياً أعتقد أن ..." },
          { de: "Having considered both arguments, I am convinced that ...", en: "Having considered both arguments, I am convinced that ...", ar: "بعد النظر في كلا الحجتين، أنا مقتنع بأن ..." },
          { de: "To my mind, the advantages outweigh the disadvantages because ...", en: "To my mind, the advantages outweigh the disadvantages because ...", ar: "في رأيي، المزايا تفوق العيوب لأن ..." },
        ],
      },
      {
        name: "Conclusion",
        description: "Summarise and give a concluding thought or recommendation",
        descriptionAr: "لخّص وقدّم فكرة ختامية أو توصية",
        phrases: [
          { de: "In conclusion, I would argue that ...", en: "In conclusion, I would argue that ...", ar: "في الختام، سأجادل بأن ..." },
          { de: "To sum up, while there are arguments on both sides, I believe that ...", en: "To sum up, while there are arguments on both sides, I believe that ...", ar: "خلاصة القول، بينما هناك حجج على كلا الجانبين، أعتقد أن ..." },
          { de: "All things considered, it seems clear that ...", en: "All things considered, it seems clear that ...", ar: "بعد النظر في كل شيء، يبدو من الواضح أن ..." },
          { de: "In short, the evidence suggests that ...", en: "In short, the evidence suggests that ...", ar: "باختصار، تشير الأدلة إلى أن ..." },
          { de: "Ultimately, it is up to each individual to decide whether ...", en: "Ultimately, it is up to each individual to decide whether ...", ar: "في النهاية، الأمر متروك لكل فرد ليقرر ما إذا كان ..." },
          { de: "It remains to be seen whether ... will continue to be a matter of debate.", en: "It remains to be seen whether ... will continue to be a matter of debate.", ar: "يبقى أن نرى ما إذا كان ... سيستمر في كونه موضوع جدل." },
        ],
      },
    ],
    tips: [
      "Do not present your opinion as absolute fact — use 'I believe', 'In my view'",
      "Use linking words: 'On the one hand', 'Furthermore', 'However', 'Nevertheless'",
      "Always acknowledge the counter-argument before refuting it",
      "Use 'not only...but also...' for complex arguments",
      "Keep each paragraph focused on one main idea",
    ],
    tipsAr: [
      "لا تقدم رأيك كحقيقة مطلقة — استخدم 'I believe'، 'In my view'",
      "استخدم كلمات الربط: 'On the one hand'، 'Furthermore'، 'However'، 'Nevertheless'",
      "اعترف دائماً بالحجة المضادة قبل دحضها",
      "استخدم 'not only...but also...' للحجج المعقدة",
      "اجعل كل فقرة مركزة على فكرة رئيسية واحدة",
    ],
  },

  // ── FOR AND AGAINST ESSAY ──
  {
    id: "for-and-against",
    title: "For and Against Essay",
    titleAr: "مقال المؤيد والمعارض",
    task: "Discuss both sides of an issue in a balanced way",
    taskAr: "ناقش جانبي القضية بطريقة متوازنة",
    level: "B2",
    structure: "Introduction → Arguments for → Arguments against → Balanced evaluation → Conclusion",
    sections: [
      {
        name: "Introduction",
        description: "Present the topic and state that there are pros and cons",
        descriptionAr: "قدّم الموضوع واذكر أن هناك إيجابيات وسلبيات",
        phrases: [
          { de: "There are both advantages and disadvantages to ...", en: "There are both advantages and disadvantages to ...", ar: "هناك مزايا وعيوب لـ ..." },
          { de: "The issue of ... is a double-edged sword.", en: "The issue of ... is a double-edged sword.", ar: "قضية ... هي سيف ذو حدين." },
          { de: "In recent years, the debate over ... has intensified.", en: "In recent years, the debate over ... has intensified.", ar: "في السنوات الأخيرة، اشتد الجدل حول ..." },
          { de: "This essay will explore the pros and cons of ...", en: "This essay will explore the pros and cons of ...", ar: "سيستكشف هذا المقال إيجابيات وسلبيات ..." },
          { de: "Like most things, ... has both positive and negative aspects.", en: "Like most things, ... has both positive and negative aspects.", ar: "مثل معظم الأشياء، ... له جوانب إيجابية وسلبية." },
        ],
      },
      {
        name: "Arguments For (Pros)",
        description: "Present the positive aspects with supporting evidence",
        descriptionAr: "قدم الجوانب الإيجابية مع الأدلة الداعمة",
        phrases: [
          { de: "One significant advantage is that ...", en: "One significant advantage is that ...", ar: "ميزة مهمة هي أن ..." },
          { de: "Proponents argue that ... can lead to ...", en: "Proponents argue that ... can lead to ...", ar: "يجادل المؤيدون بأن ... يمكن أن يؤدي إلى ..." },
          { de: "A key benefit of ... is its ability to ...", en: "A key benefit of ... is its ability to ...", ar: "فائدة رئيسية لـ ... هي قدرته على ..." },
          { de: "Another positive aspect is that ...", en: "Another positive aspect is that ...", ar: "جانب إيجابي آخر هو أن ..." },
          { de: "For example, ... has been shown to improve ...", en: "For example, ... has been shown to improve ...", ar: "على سبيل المثال، ثبت أن ... يحسن ..." },
        ],
      },
      {
        name: "Arguments Against (Cons)",
        description: "Present the negative aspects fairly",
        descriptionAr: "قدم الجوانب السلبية بشكل منصف",
        phrases: [
          { de: "However, there are also several drawbacks.", en: "However, there are also several drawbacks.", ar: "ومع ذلك، هناك أيضاً عدة عيوب." },
          { de: "A major disadvantage is that ...", en: "A major disadvantage is that ...", ar: "عيب رئيسي هو أن ..." },
          { de: "Critics point out that ... can have negative consequences.", en: "Critics point out that ... can have negative consequences.", ar: "يشير النقاد إلى أن ... يمكن أن يكون له عواقب سلبية." },
          { de: "One concern is that ...", en: "One concern is that ...", ar: "أحد المخاوف هو أن ..." },
          { de: "On the downside, ... may lead to ...", en: "On the downside, ... may lead to ...", ar: "على الجانب السلبي، ... قد يؤدي إلى ..." },
          { de: "Another drawback worth mentioning is ...", en: "Another drawback worth mentioning is ...", ar: "عيب آخر جدير بالذكر هو ..." },
        ],
      },
      {
        name: "Balanced Evaluation",
        description: "Weigh both sides and give a measured assessment",
        descriptionAr: "ازن بين الجانبين وقدّم تقييماً متوازناً",
        phrases: [
          { de: "While there are clear benefits, the drawbacks should not be ignored.", en: "While there are clear benefits, the drawbacks should not be ignored.", ar: "بينما هناك فوائد واضحة، لا ينبغي تجاهل العيوب." },
          { de: "Overall, it seems that the pros outweigh the cons.", en: "Overall, it seems that the pros outweigh the cons.", ar: "بشكل عام، يبدو أن الإيجابيات تفوق السلبيات." },
          { de: "It could be argued that the benefits justify the risks.", en: "It could be argued that the benefits justify the risks.", ar: "يمكن القول إن الفوائد تبرر المخاطر." },
          { de: "A balanced view suggests that ... depends on the context.", en: "A balanced view suggests that ... depends on the context.", ar: "الرؤية المتوازنة تشير إلى أن ... يعتمد على السياق." },
          { de: "Neither side is entirely right; the truth lies somewhere in between.", en: "Neither side is entirely right; the truth lies somewhere in between.", ar: "لا يوجد جانب على حق تماماً؛ الحقيقة تكمن في مكان ما بينهما." },
        ],
      },
      {
        name: "Conclusion",
        description: "Summarise and present a final thought",
        descriptionAr: "لخّص وقدم فكرة نهائية",
        phrases: [
          { de: "In conclusion, while ... has both merits and drawbacks, ...", en: "In conclusion, while ... has both merits and drawbacks, ...", ar: "في الختام، بينما ... له مزايا وعيوب، ..." },
          { de: "To conclude, it is clear that ... is a complex issue with no simple answer.", en: "To conclude, it is clear that ... is a complex issue with no simple answer.", ar: "في الختام، من الواضح أن ... قضية معقدة ليس لها إجابة بسيطة." },
          { de: "Ultimately, whether the advantages outweigh the disadvantages depends on ...", en: "Ultimately, whether the advantages outweigh the disadvantages depends on ...", ar: "في النهاية، ما إذا كانت المزايا تفوق العيوب يعتمد على ..." },
          { de: "What is certain is that ... will continue to be debated.", en: "What is certain is that ... will continue to be debated.", ar: "المؤكد هو أن ... سيستمر في كونه محل نقاش." },
        ],
      },
    ],
    tips: [
      "Keep a neutral tone throughout — do not show bias until the conclusion",
      "Use 'On the one hand... On the other hand...' for clear structure",
      "Make sure both sides get roughly equal coverage",
      "Use specific examples to support each point",
      "Avoid emotional language — stay objective and logical",
    ],
    tipsAr: [
      "حافظ على نبرة محايدة طوال الوقت — لا تظهر تحيزاً حتى الخاتمة",
      "استخدم 'On the one hand... On the other hand...' لهيكل واضح",
      "تأكد من أن كلا الجانبين يحصل على تغطية متساوية تقريباً",
      "استخدم أمثلة محددة لدعم كل نقطة",
      "تجنب اللغة العاطفية — كن موضوعياً ومنطقياً",
    ],
  },

  // ── PROBLEM-SOLUTION ESSAY ──
  {
    id: "problem-solution",
    title: "Problem-Solution Essay",
    titleAr: "مقال المشكلة والحل",
    task: "Identify a problem and propose practical solutions",
    taskAr: "حدد مشكلة واقترح حلولاً عملية",
    level: "B2",
    structure: "Introduction → Problem description → Causes → Solutions → Evaluation → Conclusion",
    sections: [
      {
        name: "Introduction",
        description: "Introduce the problem and explain why it is important",
        descriptionAr: "قدّم المشكلة واشرح سبب أهميتها",
        phrases: [
          { de: "One of the most pressing issues facing ... today is ...", en: "One of the most pressing issues facing ... today is ...", ar: "أحد أكثر القضايا إلحاحاً التي تواجه ... اليوم هو ..." },
          { de: "In recent years, the problem of ... has become increasingly serious.", en: "In recent years, the problem of ... has become increasingly serious.", ar: "في السنوات الأخيرة، أصبحت مشكلة ... خطيرة بشكل متزايد." },
          { de: "... is a growing concern that requires immediate attention.", en: "... is a growing concern that requires immediate attention.", ar: "... هي مصدر قلق متزايد يتطلب اهتماماً فورياً." },
          { de: "This essay will discuss the problem of ... and suggest possible solutions.", en: "This essay will discuss the problem of ... and suggest possible solutions.", ar: "سيناقش هذا المقال مشكلة ... ويقترح حلولاً ممكنة." },
          { de: "The issue of ... affects millions of people worldwide.", en: "The issue of ... affects millions of people worldwide.", ar: "تؤثر قضية ... على ملايين الأشخاص في جميع أنحاء العالم." },
        ],
      },
      {
        name: "Problem Description",
        description: "Describe the problem in detail with evidence",
        descriptionAr: "صِف المشكلة بالتفصيل مع الأدلة",
        phrases: [
          { de: "The problem manifests itself in several ways.", en: "The problem manifests itself in several ways.", ar: "تتجلى المشكلة بعدة طرق." },
          { de: "Statistics show that ... has increased by ...% over the past decade.", en: "Statistics show that ... has increased by ...% over the past decade.", ar: "تظهر الإحصائيات أن ... زاد بنسبة ...% خلال العقد الماضي." },
          { de: "One example of this problem is ...", en: "One example of this problem is ...", ar: "مثال واحد على هذه المشكلة هو ..." },
          { de: "The consequences of ... are far-reaching.", en: "The consequences of ... are far-reaching.", ar: "عواقب ... بعيدة المدى." },
          { de: "This has led to ...", en: "This has led to ...", ar: "أدى هذا إلى ..." },
          { de: "The severity of the problem cannot be overstated.", en: "The severity of the problem cannot be overstated.", ar: "لا يمكن المبالغة في خطورة المشكلة." },
        ],
      },
      {
        name: "Causes",
        description: "Explain the root causes of the problem",
        descriptionAr: "اشرح الأسباب الجذرية للمشكلة",
        phrases: [
          { de: "There are several factors that contribute to this problem.", en: "There are several factors that contribute to this problem.", ar: "هناك عدة عوامل تساهم في هذه المشكلة." },
          { de: "One of the main causes is ...", en: "One of the main causes is ...", ar: "أحد الأسباب الرئيسية هو ..." },
          { de: "This problem stems from ...", en: "This problem stems from ...", ar: "تنبع هذه المشكلة من ..." },
          { de: "Another contributing factor is ...", en: "Another contributing factor is ...", ar: "عامل مساهم آخر هو ..." },
          { de: "This is largely due to ...", en: "This is largely due to ...", ar: "هذا يرجع إلى حد كبير إلى ..." },
          { de: "... has also played a significant role.", en: "... has also played a significant role.", ar: "... لعب أيضاً دوراً مهماً." },
        ],
      },
      {
        name: "Solutions",
        description: "Propose practical and realistic solutions",
        descriptionAr: "اقترح حلولاً عملية وواقعية",
        phrases: [
          { de: "There are several measures that could be taken to address this issue.", en: "There are several measures that could be taken to address this issue.", ar: "هناك عدة إجراءات يمكن اتخاذها لمعالجة هذه القضية." },
          { de: "One possible solution would be to ...", en: "One possible solution would be to ...", ar: "أحد الحلول الممكنة سيكون ..." },
          { de: "The government could introduce legislation to ...", en: "The government could introduce legislation to ...", ar: "يمكن للحكومة تقديم تشريعات لـ ..." },
          { de: "Individuals can also play a part by ...", en: "Individuals can also play a part by ...", ar: "يمكن للأفراد أيضاً لعب دور عن طريق ..." },
          { de: "Another effective approach is ...", en: "Another effective approach is ...", ar: "نهج فعال آخر هو ..." },
          { de: "This could be achieved through ...", en: "This could be achieved through ...", ar: "يمكن تحقيق ذلك من خلال ..." },
          { de: "A combination of ... and ... would be most effective.", en: "A combination of ... and ... would be most effective.", ar: "مزيج من ... و ... سيكون الأكثر فعالية." },
        ],
      },
      {
        name: "Evaluation & Conclusion",
        description: "Evaluate the solutions and conclude",
        descriptionAr: "قيّم الحلول واختتم",
        phrases: [
          { de: "While no solution is perfect, these measures would go a long way towards solving the problem.", en: "While no solution is perfect, these measures would go a long way towards solving the problem.", ar: "بينما لا يوجد حل مثالي، هذه الإجراءات ستقطع شوطاً طويلاً نحو حل المشكلة." },
          { de: "The most effective approach would be to ...", en: "The most effective approach would be to ...", ar: "النهج الأكثر فعالية سيكون ..." },
          { de: "It would be unrealistic to expect immediate results, but ...", en: "It would be unrealistic to expect immediate results, but ...", ar: "سيكون من غير الواقعي توقع نتائج فورية، لكن ..." },
          { de: "In conclusion, ... is a serious problem that requires collective action.", en: "In conclusion, ... is a serious problem that requires collective action.", ar: "في الختام، ... مشكلة خطيرة تتطلب عملاً جماعياً." },
          { de: "Only through cooperation between ... and ... can we hope to solve this issue.", en: "Only through cooperation between ... and ... can we hope to solve this issue.", ar: "فقط من خلال التعاون بين ... و ... يمكننا أن نأمل في حل هذه القضية." },
          { de: "It is clear that ... must be addressed urgently.", en: "It is clear that ... must be addressed urgently.", ar: "من الواضح أن ... يجب معالجته بشكل عاجل." },
        ],
      },
    ],
    tips: [
      "Clearly distinguish between causes and solutions",
      "Make sure each solution directly addresses a specific cause",
      "Be realistic — propose solutions that are actually achievable",
      "Use 'could', 'would', 'might' for solutions — they are suggestions, not guarantees",
      "Include a mix of short-term and long-term solutions",
    ],
    tipsAr: [
      "ميّز بوضوح بين الأسباب والحلول",
      "تأكد من أن كل حل يعالج سبباً محدداً بشكل مباشر",
      "كن واقعياً — اقترح حلولاً قابلة للتحقيق فعلاً",
      "استخدم 'could'، 'would'، 'might' للحلول — هي اقتراحات وليست ضمانات",
      "ضمن مزيجاً من الحلول قصيرة وطويلة المدى",
    ],
  },

  // ── CAUSE-EFFECT ESSAY ──
  {
    id: "cause-effect",
    title: "Cause-Effect Essay",
    titleAr: "مقال السبب والنتيجة",
    task: "Explain the causes and effects of a phenomenon or trend",
    taskAr: "اشرح أسباب وآثار ظاهرة أو اتجاه",
    level: "B2",
    structure: "Introduction → Causes → Effects → Evaluation → Conclusion",
    sections: [
      {
        name: "Introduction",
        description: "Introduce the phenomenon and its significance",
        descriptionAr: "قدّم الظاهرة وأهميتها",
        phrases: [
          { de: "In recent years, there has been a significant rise in ...", en: "In recent years, there has been a significant rise in ...", ar: "في السنوات الأخيرة، كان هناك ارتفاع كبير في ..." },
          { de: "... has become an increasingly common phenomenon across the world.", en: "... has become an increasingly common phenomenon across the world.", ar: "... أصبح ظاهرة شائعة بشكل متزايد في جميع أنحاء العالم." },
          { de: "The purpose of this essay is to examine the causes and effects of ...", en: "The purpose of this essay is to examine the causes and effects of ...", ar: "الغرض من هذا المقال هو فحص أسباب وآثار ..." },
          { de: "... is a trend that has attracted considerable attention.", en: "... is a trend that has attracted considerable attention.", ar: "... هو اتجاه جذب اهتماماً كبيراً." },
          { de: "This essay will explore why ... has happened and what its consequences are.", en: "This essay will explore why ... has happened and what its consequences are.", ar: "سيستكشف هذا المقال لماذا حدث ... وما هي عواقبه." },
        ],
      },
      {
        name: "Causes",
        description: "Explain the main causes or reasons",
        descriptionAr: "اشرح الأسباب أو الدوافع الرئيسية",
        phrases: [
          { de: "There are several reasons why ... has become more prevalent.", en: "There are several reasons why ... has become more prevalent.", ar: "هناك عدة أسباب وراء انتشار ... بشكل أكبر." },
          { de: "The primary cause of ... is ...", en: "The primary cause of ... is ...", ar: "السبب الرئيسي لـ ... هو ..." },
          { de: "One factor that has contributed to this trend is ...", en: "One factor that has contributed to this trend is ...", ar: "أحد العوامل التي ساهمت في هذا الاتجاه هو ..." },
          { de: "This can be attributed to ...", en: "This can be attributed to ...", ar: "يمكن أن يُعزى هذا إلى ..." },
          { de: "Another significant cause is ...", en: "Another significant cause is ...", ar: "سبب مهم آخر هو ..." },
          { de: "The rise of ... has also played a key role.", en: "The rise of ... has also played a key role.", ar: "صعود ... لعب أيضاً دوراً رئيسياً." },
          { de: "... is largely a result of ...", en: "... is largely a result of ...", ar: "... هو إلى حد كبير نتيجة لـ ..." },
        ],
      },
      {
        name: "Effects",
        description: "Describe the effects and consequences",
        descriptionAr: "صِف الآثار والعواقب",
        phrases: [
          { de: "The effects of ... are wide-ranging and significant.", en: "The effects of ... are wide-ranging and significant.", ar: "آثار ... واسعة النطاق ومهمة." },
          { de: "One major consequence is that ...", en: "One major consequence is that ...", ar: "نتيجة رئيسية واحدة هي أن ..." },
          { de: "This has led to ...", en: "This has led to ...", ar: "أدى هذا إلى ..." },
          { de: "As a result, ...", en: "As a result, ...", ar: "ونتيجة لذلك، ..." },
          { de: "The impact on ... has been particularly noticeable.", en: "The impact on ... has been particularly noticeable.", ar: "كان التأثير على ... ملحوظاً بشكل خاص." },
          { de: "Another effect worth mentioning is ...", en: "Another effect worth mentioning is ...", ar: "تأثير آخر جدير بالذكر هو ..." },
          { de: "In the long term, this could result in ...", en: "In the long term, this could result in ...", ar: "على المدى الطويل، يمكن أن يؤدي هذا إلى ..." },
        ],
      },
      {
        name: "Evaluation & Reflection",
        description: "Evaluate the overall significance and implications",
        descriptionAr: "قيّم الأهمية العامة والآثار",
        phrases: [
          { de: "Overall, the consequences of ... are largely positive/negative.", en: "Overall, the consequences of ... are largely positive/negative.", ar: "بشكل عام، عواقب ... إيجابية/سلبية إلى حد كبير." },
          { de: "While some effects are beneficial, others are cause for concern.", en: "While some effects are beneficial, others are cause for concern.", ar: "بينما بعض الآثار مفيدة، البعض الآخر مدعاة للقلق." },
          { de: "The relationship between cause and effect is complex.", en: "The relationship between cause and effect is complex.", ar: "العلاقة بين السبب والنتيجة معقدة." },
          { de: "It is important to consider both the immediate and long-term effects.", en: "It is important to consider both the immediate and long-term effects.", ar: "من المهم النظر في كل من الآثار الفورية والطويلة المدى." },
          { de: "The true significance of ... may not be fully understood for years.", en: "The true significance of ... may not be fully understood for years.", ar: "قد لا تُفهم الأهمية الحقيقية لـ ... بشكل كامل لسنوات." },
        ],
      },
      {
        name: "Conclusion",
        description: "Summarise the cause-effect relationship and give a final thought",
        descriptionAr: "لخّص علاقة السبب والنتيجة وقدم فكرة نهائية",
        phrases: [
          { de: "In conclusion, ... is driven by a combination of factors and has far-reaching effects.", en: "In conclusion, ... is driven by a combination of factors and has far-reaching effects.", ar: "في الختام، ... مدفوع بمزيج من العوامل وله آثار بعيدة المدى." },
          { de: "To sum up, the causes of ... are complex, but the effects are clearly visible.", en: "To sum up, the causes of ... are complex, but the effects are clearly visible.", ar: "خلاصة القول، أسباب ... معقدة، لكن الآثار واضحة للعيان." },
          { de: "Understanding the causes and effects of ... is essential if we wish to address it.", en: "Understanding the causes and effects of ... is essential if we wish to address it.", ar: "فهم أسباب وآثار ... ضروري إذا أردنا معالجته." },
          { de: "As ... continues to evolve, its effects will become increasingly significant.", en: "As ... continues to evolve, its effects will become increasingly significant.", ar: "مع استمرار ... في التطور، ستصبح آثاره أكثر أهمية." },
          { de: "It is clear that ... will have lasting consequences for future generations.", en: "It is clear that ... will have lasting consequences for future generations.", ar: "من الواضح أن ... سيكون له عواقب دائمة للأجيال القادمة." },
        ],
      },
    ],
    tips: [
      "Use cause-effect signal words: 'because', 'therefore', 'as a result', 'consequently', 'leads to'",
      "Establish a clear logical connection between each cause and its effect",
      "Use present tense for general truths and current trends",
      "Include real-world examples to support your analysis",
      "Avoid oversimplifying — complex phenomena usually have multiple causes",
    ],
    tipsAr: [
      "استخدم كلمات إشارة السبب والنتيجة: 'because'، 'therefore'، 'as a result'، 'consequently'، 'leads to'",
      "أنشئ رابطاً منطقياً واضحاً بين كل سبب وتأثيره",
      "استخدم المضارع للحقائق العامة والاتجاهات الحالية",
      "ضمن أمثلة من العالم الواقعي لدعم تحليلك",
      "تجنب التبسيط المفرط — الظواهر المعقدة عادة ما يكون لها أسباب متعددة",
    ],
  },
];
