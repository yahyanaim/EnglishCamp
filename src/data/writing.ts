import type { BandId } from "./types";

export type WritingPrompt = {
  id: string;
  levelId: BandId;
  type: "essay" | "email" | "letter" | "description" | "argumentation" | "summary" | "report" | "dialogue";
  titleDe: string;
  titleEn: string;
  titleAr?: string;
  instructions: string;
  instructionsAr?: string;
  hints: string[];
  hintsAr?: string[];
  wordCount: { min: number; max: number };
  tags: string[];
  correction: { de: string; en: string; ar?: string };
};

export const WRITING_PROMPTS: WritingPrompt[] = [
  // ── ESSAYS ──
  {
    id: "b2-essay-1", levelId: "band7-8", type: "essay",
    titleDe: "Environmental Responsibility: Government or Individuals?",
    titleEn: "Environmental Responsibility: Government or Individuals?",
    titleAr: "المسؤولية البيئية: الحكومة أم الأفراد؟",
    instructions: "Write an essay discussing who should take more responsibility for protecting the environment — governments or individuals. Give reasons and examples to support your opinion.",
    instructionsAr: "اكتب مقالاً تناقش فيه من يجب أن يتحمل مسؤولية أكبر في حماية البيئة — الحكومات أم الأفراد. أعط أسباباً وأمثلة لدعم رأيك.",
    hints: ["Start with a general statement about environmental issues", "Present arguments for both sides before giving your opinion", "Use linking words: 'On the one hand', 'Furthermore', 'However'", "Conclude with a clear summary of your position"],
    hintsAr: ["ابدأ ببيان عام حول القضايا البيئية", "قدم حججاً لكلا الجانبين قبل إبداء رأيك", "استخدم كلمات ربط: 'من ناحية'، 'علاوة على ذلك'، 'مع ذلك'", "اختتم بملخص واضح لموقفك"],
    wordCount: { min: 140, max: 190 },
    tags: ["environment", "opinion essay", "government", "responsibility"],
    correction: {
      de: "In recent years, environmental issues have become increasingly urgent. The question of who should take primary responsibility — governments or individuals — is widely debated. On the one hand, governments have the power to pass laws and regulate industries. For example, they can impose carbon taxes or ban single-use plastics. On the other hand, individual actions such as recycling, reducing waste, and using public transport also make a significant difference. In my opinion, both parties must work together. While governments should create the legal framework, individuals need to change their daily habits. Only through collective effort can we achieve meaningful environmental protection.",
      en: "In recent years, environmental issues have become increasingly urgent. The question of who should take primary responsibility — governments or individuals — is widely debated. On the one hand, governments have the power to pass laws and regulate industries. For example, they can impose carbon taxes or ban single-use plastics. On the other hand, individual actions such as recycling, reducing waste, and using public transport also make a significant difference. In my opinion, both parties must work together. While governments should create the legal framework, individuals need to change their daily habits. Only through collective effort can we achieve meaningful environmental protection.",
      ar: "في السنوات الأخيرة، أصبحت القضايا البيئية ملحة بشكل متزايد. مسألة من يجب أن يتحمل المسؤولية الأساسية — الحكومات أم الأفراد — محل نقاش واسع. من ناحية، الحكومات لديها السلطة لسن القوانين وتنظيم الصناعات. على سبيل المثال، يمكنها فرض ضرائب على الكربون أو حظر البلاستيك أحادي الاستخدام. من ناحية أخرى، الأفعال الفردية مثل إعادة التدوير وتقليل النفايات واستخدام وسائل النقل العامة تحدث فرقاً كبيراً أيضاً. في رأيي، يجب على الطرفين العمل معاً. بينما يجب على الحكومات إنشاء الإطار القانوني، يحتاج الأفراد إلى تغيير عاداتهم اليومية. فقط من خلال الجهد الجماعي يمكننا تحقيق حماية بيئية هادفة."
    }
  },
  {
    id: "b2-essay-2", levelId: "band7-8", type: "essay",
    titleDe: "The Impact of Social Media on Young People",
    titleEn: "The Impact of Social Media on Young People",
    titleAr: "تأثير وسائل التواصل الاجتماعي على الشباب",
    instructions: "Write an essay examining the effects of social media on young people. Consider both positive aspects, such as staying connected and learning opportunities, and negative aspects, such as cyberbullying and addiction.",
    instructionsAr: "اكتب مقالاً تبحث فيه آثار وسائل التواصل الاجتماعي على الشباب. ناقش الجوانب الإيجابية مثل البقاء على اتصال وفرص التعلم، والجوانب السلبية مثل التنمر الإلكتروني والإدمان.",
    hints: ["Introduce the topic with a relevant statistic or observation", "Dedicate one paragraph to advantages and one to disadvantages", "Use specific examples to support each point", "Give a balanced conclusion with your own view"],
    hintsAr: ["قدم الموضوع بإحصائية أو ملاحظة ذات صلة", "خصص فقرة للمزايا وأخرى للعيوب", "استخدم أمثلة محددة لدعم كل نقطة", "قدم خاتمة متوازنة مع رأيك الشخصي"],
    wordCount: { min: 140, max: 190 },
    tags: ["social media", "technology", "young people", "opinion essay"],
    correction: {
      de: "Social media has become an integral part of young people's lives, with platforms like Instagram and TikTok dominating their daily routines. On the positive side, social media allows teenagers to stay connected with friends and family, discover new interests, and access educational content. Many young people use platforms to learn new skills or follow inspirational figures. However, there are significant drawbacks. Excessive use can lead to addiction, sleep deprivation, and low self-esteem due to social comparison. Cyberbullying is another serious concern. In my view, social media can be beneficial when used in moderation, but parents and schools should educate young people about responsible usage.",
      en: "Social media has become an integral part of young people's lives, with platforms like Instagram and TikTok dominating their daily routines. On the positive side, social media allows teenagers to stay connected with friends and family, discover new interests, and access educational content. Many young people use platforms to learn new skills or follow inspirational figures. However, there are significant drawbacks. Excessive use can lead to addiction, sleep deprivation, and low self-esteem due to social comparison. Cyberbullying is another serious concern. In my view, social media can be beneficial when used in moderation, but parents and schools should educate young people about responsible usage.",
      ar: "أصبحت وسائل التواصل الاجتماعي جزءاً لا يتجزأ من حياة الشباب، حيث تهيمن منصات مثل إنستغرام وتيك توك على روتينهم اليومي. على الجانب الإيجابي، تسمح وسائل التواصل الاجتماعي للمراهقين بالبقاء على اتصال مع الأصدقاء والعائلة واكتشاف اهتمامات جديدة والوصول إلى المحتوى التعليمي. العديد من الشباب يستخدمون المنصات لتعلم مهارات جديدة أو متابعة شخصيات ملهمة. ومع ذلك، هناك عيوب كبيرة. الاستخدام المفرط يمكن أن يؤدي إلى الإدمان والحرمان من النوم وتدني احترام الذات بسبب المقارنة الاجتماعية. التنمر الإلكتروني هو مصدر قلق خطير آخر. في رأيي، يمكن أن تكون وسائل التواصل الاجتماعي مفيدة عند استخدامها باعتدال، لكن يجب على الآباء والمدارس تثقيف الشباب حول الاستخدام المسؤول."
    }
  },
  {
    id: "b2-essay-3", levelId: "band7-8", type: "essay",
    titleDe: "Online Learning vs Traditional Classroom Education",
    titleEn: "Online Learning vs Traditional Classroom Education",
    titleAr: "التعلم عبر الإنترنت مقابل التعليم التقليدي في الفصول الدراسية",
    instructions: "Write an essay comparing online learning with traditional classroom education. Discuss the advantages and disadvantages of each, and give your opinion on which is more effective.",
    instructionsAr: "اكتب مقالاً تقارن فيه التعلم عبر الإنترنت مع التعليم التقليدي في الفصول الدراسية. ناقش مزايا وعيوب كل منهما، وأعط رأيك حول أيهما أكثر فعالية.",
    hints: ["Start by acknowledging the recent shift towards online learning", "Compare specific aspects: interaction, flexibility, discipline", "Use comparison phrases: 'In contrast to', 'Similarly', 'Whereas'", "State your preference clearly in the conclusion"],
    hintsAr: ["ابدأ بالاعتراف بالتحول الأخير نحو التعلم عبر الإنترنت", "قارن جوانب محددة: التفاعل، المرونة، الانضباط", "استخدم عبارات المقارنة: 'على النقيض من'، 'بالمثل'، 'بينما'", "حدد تفضيلك بوضوح في الخاتمة"],
    wordCount: { min: 140, max: 190 },
    tags: ["education", "technology", "online learning", "comparison"],
    correction: {
      de: "The COVID-19 pandemic accelerated the shift towards online learning, sparking a debate about its effectiveness compared to traditional classrooms. Online learning offers flexibility and convenience, allowing students to study at their own pace from anywhere. It is also often more affordable. In contrast, traditional classrooms provide face-to-face interaction, immediate feedback, and a structured environment that many students need. Teachers can better monitor progress and offer support. While online learning is valuable for self-motivated learners, I believe traditional education is more effective for most students because of the social and disciplinary benefits. A blended approach combining both methods may be the best solution.",
      en: "The COVID-19 pandemic accelerated the shift towards online learning, sparking a debate about its effectiveness compared to traditional classrooms. Online learning offers flexibility and convenience, allowing students to study at their own pace from anywhere. It is also often more affordable. In contrast, traditional classrooms provide face-to-face interaction, immediate feedback, and a structured environment that many students need. Teachers can better monitor progress and offer support. While online learning is valuable for self-motivated learners, I believe traditional education is more effective for most students because of the social and disciplinary benefits. A blended approach combining both methods may be the best solution.",
      ar: "سارعت جائحة كوفيد-19 التحول نحو التعلم عبر الإنترنت، مما أثار جدلاً حول فعاليته مقارنة بالفصول الدراسية التقليدية. يوفر التعلم عبر الإنترنت المرونة والراحة، مما يسمح للطلاب بالدراسة وفقاً لسرعتهم الخاصة من أي مكان. كما أنه غالباً ما يكون أقل تكلفة. في المقابل، توفر الفصول الدراسية التقليدية التفاعل وجهاً لوجه والتغذية الراجعة الفورية والبيئة المنظمة التي يحتاجها العديد من الطلاب. يمكن للمعلمين مراقبة التقدم بشكل أفضل وتقديم الدعم. بينما التعلم عبر الإنترنت قيم للمتعلمين ذوي الدافع الذاتي، أعتقد أن التعليم التقليدي أكثر فعالية لمعظم الطلاب بسبب الفوائد الاجتماعية والانضباطية. قد يكون النهج المدمج الذي يجمع بين الطريقتين هو أفضل حل."
    }
  },
  {
    id: "b2-essay-4", levelId: "band7-8", type: "essay",
    titleDe: "The Importance of Learning Foreign Languages",
    titleEn: "The Importance of Learning Foreign Languages",
    titleAr: "أهمية تعلم اللغات الأجنبية",
    instructions: "Write an essay explaining why learning foreign languages is important. Discuss the benefits for career opportunities, cultural understanding, and personal development.",
    instructionsAr: "اكتب مقالاً تشرح فيه أهمية تعلم اللغات الأجنبية. ناقش الفوائد للفرص المهنية والفهم الثقافي والتطور الشخصي.",
    hints: ["Hook the reader with a thought-provoking question", "Organise paragraphs by theme: career, culture, personal growth", "Provide real-life examples for each benefit", "End with a strong concluding statement"],
    hintsAr: ["اجذب القارئ بسؤال محفز للتفكير", "نظم الفقرات حسب الموضوع: المهنة، الثقافة، النمو الشخصي", "قدم أمثلة من الحياة الواقعية لكل فائدة", "اختتم ببيان ختامي قوي"],
    wordCount: { min: 140, max: 190 },
    tags: ["languages", "education", "career", "culture"],
    correction: {
      de: "In an increasingly globalised world, learning a foreign language has become more important than ever. Firstly, being multilingual significantly enhances career prospects. Companies value employees who can communicate with international clients and navigate different markets. Secondly, language learning promotes cultural understanding. When you learn a language, you also learn about the traditions, values, and ways of thinking of its speakers. This reduces prejudice and fosters global cooperation. Finally, learning a language improves cognitive abilities such as memory, problem-solving, and multitasking. In conclusion, I firmly believe that learning a foreign language is one of the most valuable investments a person can make for their future.",
      en: "In an increasingly globalised world, learning a foreign language has become more important than ever. Firstly, being multilingual significantly enhances career prospects. Companies value employees who can communicate with international clients and navigate different markets. Secondly, language learning promotes cultural understanding. When you learn a language, you also learn about the traditions, values, and ways of thinking of its speakers. This reduces prejudice and fosters global cooperation. Finally, learning a language improves cognitive abilities such as memory, problem-solving, and multitasking. In conclusion, I firmly believe that learning a foreign language is one of the most valuable investments a person can make for their future.",
      ar: "في عالم يزداد عولمة، أصبح تعلم لغة أجنبية أكثر أهمية من أي وقت مضى. أولاً، تعدد اللغات يعزز بشكل كبير الآفاق المهنية. الشركات تقدر الموظفين الذين يمكنهم التواصل مع العملاء الدوليين والتنقل في أسواق مختلفة. ثانياً، تعلم اللغة يعزز الفهم الثقافي. عندما تتعلم لغة، تتعلم أيضاً عن تقاليد وقيم وطرق تفكير متحدثيها. هذا يقلل التحيز ويعزز التعاون العالمي. أخيراً، تعلم اللغة يحسن القدرات المعرفية مثل الذاكرة وحل المشكلات وتعدد المهام. في الختام، أعتقد اعتقاداً راسخاً أن تعلم لغة أجنبية هو أحد أكثر الاستثمارات قيمة التي يمكن للشخص القيام بها من أجل مستقبله."
    }
  },
  {
    id: "b2-essay-5", levelId: "band7-8", type: "essay",
    titleDe: "Should Students Have Part-Time Jobs?",
    titleEn: "Should Students Have Part-Time Jobs?",
    titleAr: "هل يجب أن يكون للطلاب وظائف بدوام جزئي؟",
    instructions: "Write an essay discussing whether students should take part-time jobs while studying. Consider the benefits of financial independence and work experience, as well as the potential impact on academic performance.",
    instructionsAr: "اكتب مقالاً تناقش فيه ما إذا كان يجب على الطلاب العمل بوظائف بدوام جزئي أثناء الدراسة. ضع في اعتبارك فوائد الاستقلال المالي والخبرة العملية، بالإضافة إلى التأثير المحتمل على الأداء الأكاديمي.",
    hints: ["Introduce both sides of the argument fairly", "Use topic sentences to start each paragraph", "Include specific examples of part-time jobs students could do", "Give your opinion based on the evidence presented"],
    hintsAr: ["قدم جانبي الحجة بشكل منصف", "استخدم جملاً افتتاحية لكل فقرة", "ضمن أمثلة محددة لوظائف بدوام جزئي يمكن للطلاب القيام بها", "أعط رأيك بناءً على الأدلة المقدمة"],
    wordCount: { min: 140, max: 190 },
    tags: ["education", "work", "students", "opinion essay"],
    correction: {
      de: "The question of whether students should take part-time jobs is a topic of much discussion. On the one hand, part-time work offers numerous benefits. Students gain financial independence, learn valuable time management skills, and acquire work experience that looks impressive on their CVs. Jobs like tutoring, retail work, or restaurant service teach responsibility and communication skills. On the other hand, working can negatively affect academic performance if students do not manage their time well. Long hours may lead to exhaustion and less time for homework or revision. In my opinion, part-time work is beneficial as long as it does not exceed 10-15 hours per week and does not interfere with studies.",
      en: "The question of whether students should take part-time jobs is a topic of much discussion. On the one hand, part-time work offers numerous benefits. Students gain financial independence, learn valuable time management skills, and acquire work experience that looks impressive on their CVs. Jobs like tutoring, retail work, or restaurant service teach responsibility and communication skills. On the other hand, working can negatively affect academic performance if students do not manage their time well. Long hours may lead to exhaustion and less time for homework or revision. In my opinion, part-time work is beneficial as long as it does not exceed 10-15 hours per week and does not interfere with studies.",
      ar: "مسألة ما إذا كان يجب على الطلاب العمل بوظائف بدوام جزئي هي موضوع نقاش واسع. من ناحية، العمل بدوام جزئي يقدم فوائد عديدة. يكتسب الطلاب الاستقلال المالي، ويتعلمون مهارات إدارة الوقت القيمة، ويكتسبون خبرة عملية تبدو مثيرة للإعجاب في سيرهم الذاتية. وظائف مثل التدريس الخصوصي أو العمل في متجر أو خدمة المطاعم تعلم المسؤولية ومهارات التواصل. من ناحية أخرى، يمكن أن يؤثر العمل سلباً على الأداء الأكاديمي إذا لم يدير الطلاب وقتهم بشكل جيد. قد تؤدي ساعات العمل الطويلة إلى الإرهاق وتقليل الوقت للواجبات المنزلية أو المراجعة. في رأيي، العمل بدوام جزئي مفيد طالما لا يتجاوز 10-15 ساعة أسبوعياً ولا يتعارض مع الدراسة."
    }
  },

  // ── ARTICLES ──
  {
    id: "b2-article-1", levelId: "band7-8", type: "report",
    titleDe: "A Place You Must Visit",
    titleEn: "A Place You Must Visit",
    titleAr: "مكان يجب عليك زيارته",
    instructions: "Write an article for a travel magazine describing a place you have visited and would recommend to others. Describe what makes it special, what visitors can do there, and why they should go.",
    instructionsAr: "اكتب مقالاً لمجلة سفر تصف فيه مكاناً زرته وتوصي به للآخرين. صف ما يجعله مميزاً، وماذا يمكن للزوار فعله هناك، ولماذا يجب عليهم الذهاب.",
    hints: ["Give your article an eye-catching title", "Use descriptive language to bring the place to life", "Address the reader directly: 'you should visit', 'you will love'", "End with a strong recommendation"],
    hintsAr: ["أعط مقالك عنواناً جذاباً", "استخدم لغة وصفية لإضفاء الحيوية على المكان", "خاطب القارئ مباشرة: 'يجب عليك زيارة'، 'ستحب'", "اختتم بتوصية قوية"],
    wordCount: { min: 140, max: 190 },
    tags: ["travel", "article", "recommendation", "description"],
    correction: {
      de: "Have you ever dreamed of visiting a place that feels like a fairytale? Located on the west coast of Ireland, the Cliffs of Moher are a breathtaking natural wonder that should be on everyone's bucket list. Standing 214 metres above the Atlantic Ocean, these cliffs offer spectacular views that will leave you speechless. You can walk along the cliff path, watch the waves crash against the rocks, and spot seabirds like puffins. The nearby village of Doolin has lovely traditional pubs where you can enjoy live Irish music. Whether you are a nature lover or simply looking for adventure, the Cliffs of Moher are an unforgettable experience. I cannot recommend this place highly enough!",
      en: "Have you ever dreamed of visiting a place that feels like a fairytale? Located on the west coast of Ireland, the Cliffs of Moher are a breathtaking natural wonder that should be on everyone's bucket list. Standing 214 metres above the Atlantic Ocean, these cliffs offer spectacular views that will leave you speechless. You can walk along the cliff path, watch the waves crash against the rocks, and spot seabirds like puffins. The nearby village of Doolin has lovely traditional pubs where you can enjoy live Irish music. Whether you are a nature lover or simply looking for adventure, the Cliffs of Moher are an unforgettable experience. I cannot recommend this place highly enough!",
      ar: "هل حلمت يوماً بزيارة مكان يشبه الحكاية الخيالية؟ تقع منحدرات موهير على الساحل الغربي لأيرلندا، وهي أعجوبة طبيعية خلابة يجب أن تكون على قائمة أمنيات الجميع. بارتفاع 214 متراً فوق المحيط الأطلسي، توفر هذه المنحدرات إطلالات رائعة ستتركك عاجزاً عن الكلام. يمكنك المشي على طول مسار المنحدرات، ومشاهدة الأمواج تصطدم بالصخور، ورؤية الطيور البحرية مثل البفن. قرية دولين القريبة بها حانات تقليدية جميلة حيث يمكنك الاستمتاع بالموسيقى الأيرلندية الحية. سواء كنت من عشاق الطبيعة أو تبحث ببساطة عن المغامرة، فإن منحدرات موهير تجربة لا تُنسى. لا يمكنني التوصية بهذا المكان بما فيه الكفاية!"
    }
  },
  {
    id: "b2-article-2", levelId: "band7-8", type: "report",
    titleDe: "How to Stay Healthy: Tips That Actually Work",
    titleEn: "How to Stay Healthy: Tips That Actually Work",
    titleAr: "كيف تبقى بصحة جيدة: نصائح فعالة حقاً",
    instructions: "Write an article for a student magazine offering practical advice on how to stay healthy. Include tips on diet, exercise, sleep, and mental wellbeing.",
    instructionsAr: "اكتب مقالاً لمجلة طلابية تقدم فيه نصائح عملية حول كيفية البقاء بصحة جيدة. تضمن نصائح حول النظام الغذائي والتمارين الرياضية والنوم والصحة النفسية.",
    hints: ["Use subheadings to organise your article", "Write in an engaging, conversational tone", "Give specific, actionable advice rather than general statements", "Include a personal experience or example"],
    hintsAr: ["استخدم عناوين فرعية لتنظيم مقالك", "اكتب بنبرة جذابة ومحادثة", "قدم نصائح محددة وقابلة للتنفيذ بدلاً من العبارات العامة", "ضمن تجربة شخصية أو مثال"],
    wordCount: { min: 140, max: 190 },
    tags: ["health", "fitness", "wellbeing", "article"],
    correction: {
      de: "Do you struggle to stay healthy with a busy schedule? You are not alone. Here are three simple tips that actually work. First, move more. You do not need to spend hours at the gym. A 20-minute walk during your lunch break, taking the stairs instead of the lift, or doing a quick workout video at home can make a huge difference. Second, eat smart. Focus on adding more fruits, vegetables, and whole grains to your diet rather than cutting things out. Finally, prioritise sleep. Aim for 7-8 hours per night and avoid screens for at least 30 minutes before bed. Your body and mind will thank you!",
      en: "Do you struggle to stay healthy with a busy schedule? You are not alone. Here are three simple tips that actually work. First, move more. You do not need to spend hours at the gym. A 20-minute walk during your lunch break, taking the stairs instead of the lift, or doing a quick workout video at home can make a huge difference. Second, eat smart. Focus on adding more fruits, vegetables, and whole grains to your diet rather than cutting things out. Finally, prioritise sleep. Aim for 7-8 hours per night and avoid screens for at least 30 minutes before bed. Your body and mind will thank you!",
      ar: "هل تواجه صعوبة في البقاء بصحة جيدة مع جدول مزدحم؟ أنت لست وحدك. إليك ثلاث نصائح بسيطة فعالة حقاً. أولاً، تحرك أكثر. لست بحاجة لقضاء ساعات في صالة الألعاب الرياضية. المشي لمدة 20 دقيقة خلال استراحة الغداء، أو صعود الدرج بدلاً من المصعد، أو ممارسة تمرين سريع في المنزل يمكن أن يحدث فرقاً كبيراً. ثانياً، تناول الطعام بذكاء. ركز على إضافة المزيد من الفواكه والخضروات والحبوب الكاملة إلى نظامك الغذائي بدلاً من الاستغناء عن الأشياء. أخيراً، أعط الأولوية للنوم. استهدف 7-8 ساعات كل ليلة وتجنب الشاشات لمدة 30 دقيقة على الأقل قبل النوم. جسدك وعقلك سيشكرانك!"
    }
  },
  {
    id: "b2-article-3", levelId: "band7-8", type: "description",
    titleDe: "The Best Film I Have Seen Recently",
    titleEn: "The Best Film I Have Seen Recently",
    titleAr: "أفضل فيلم شاهدته مؤخراً",
    instructions: "Write a review for a school blog about a film, TV series, or book you have enjoyed recently. Describe the plot briefly, mention what you liked or disliked, and recommend it to others.",
    instructionsAr: "اكتب مراجعة لمدونة مدرسية عن فيلم أو مسلسل أو كتاب استمتعت به مؤخراً. صف القصة بإيجاز، واذكر ما أعجبك أو لم يعجبك، وأوصِ به للآخرين.",
    hints: ["Start with an engaging opening line to hook the reader", "Summarise the plot without giving away spoilers", "Comment on specific aspects: acting, cinematography, writing", "Give a clear rating or recommendation at the end"],
    hintsAr: ["ابدأ بجملة افتتاحية جذابة", "لخص القصة دون حرق الأحداث", "علق على جوانب محددة: التمثيل، التصوير السينمائي، الكتابة", "قدم تقييماً أو توصية واضحة في النهاية"],
    wordCount: { min: 140, max: 190 },
    tags: ["film", "review", "description", "recommendation"],
    correction: {
      de: "Have you ever watched a film that stayed with you for days afterwards? That is exactly how I felt after seeing 'The Wild Robot' at the cinema last weekend. The film tells the story of a robot named Roz who wakes up on a deserted island and must learn to survive in the wild. What I loved most was the stunning animation and the emotional depth of the story. The voice acting, especially by Lupita Nyong'o, was outstanding. The film explores themes of friendship, belonging, and the relationship between technology and nature in a way that appeals to both children and adults. I would give it 5 out of 5 stars. Do not miss it!",
      en: "Have you ever watched a film that stayed with you for days afterwards? That is exactly how I felt after seeing 'The Wild Robot' at the cinema last weekend. The film tells the story of a robot named Roz who wakes up on a deserted island and must learn to survive in the wild. What I loved most was the stunning animation and the emotional depth of the story. The voice acting, especially by Lupita Nyong'o, was outstanding. The film explores themes of friendship, belonging, and the relationship between technology and nature in a way that appeals to both children and adults. I would give it 5 out of 5 stars. Do not miss it!",
      ar: "هل شاهدت يوماً فيلماً بقي معك لأيام بعد ذلك؟ هذا بالضبط ما شعرت به بعد مشاهدة 'الروبوت البري' في السينما الأسبوع الماضي. الفيلم يحكي قصة روبوت يدعى روز يستيقظ في جزيرة مهجورة ويجب أن يتعلم البقاء على قيد الحياة في البرية. أكثر ما أعجبني هو الرسوم المتحركة المذهلة والعمق العاطفي للقصة. الأداء الصوتي، وخاصة من لوبيتا نيونغو، كان رائعاً. الفيلم يستكشف موضوعات الصداقة والانتماء والعلاقة بين التكنولوجيا والطبيعة بطريقة تنال إعجاب كل من الأطفال والبالغين. سأعطيه 5 من 5 نجوم. لا تفوّته!"
    }
  },

  // ── REPORTS ──
  {
    id: "b2-report-1", levelId: "band7-8", type: "report",
    titleDe: "Report on School Facilities",
    titleEn: "Report on School Facilities",
    titleAr: "تقرير عن مرافق المدرسة",
    instructions: "You are a student representative. Write a report for the school principal about the current state of school facilities. Describe what is good, what needs improvement, and make recommendations.",
    instructionsAr: "أنت ممثل الطلاب. اكتب تقريراً لمدير المدرسة عن الوضع الحالي لمرافق المدرسة. صف ما هو جيد، وما يحتاج إلى تحسين، وقدم توصيات.",
    hints: ["Use a formal report structure with headings", "State the purpose of the report in the introduction", "Divide findings into clear sections", "Make specific, realistic recommendations"],
    hintsAr: ["استخدم هيكل تقرير رسمي مع عناوين", "اذكر الغرض من التقرير في المقدمة", "قسم النتائج إلى أقسام واضحة", "قدم توصيات محددة وواقعية"],
    wordCount: { min: 140, max: 190 },
    tags: ["report", "school", "facilities", "recommendations"],
    correction: {
      de: "REPORT: School Facilities Review\n\nINTRODUCTION\nThe purpose of this report is to assess the current state of school facilities and suggest improvements.\n\nFINDINGS\nThe library is well-stocked with books and computers, but many computers are outdated and slow. The sports facilities, including the football pitch and basketball court, are in good condition. However, the changing rooms require renovation. The cafeteria offers a limited menu and students have reported that there are not enough seating areas during lunch.\n\nRECOMMENDATIONS\n1. Upgrade the computers in the library with modern equipment.\n2. Renovate the changing rooms with new lockers and showers.\n3. Expand the cafeteria seating area.\n\nI hope these recommendations will be considered.",
      en: "REPORT: School Facilities Review\n\nINTRODUCTION\nThe purpose of this report is to assess the current state of school facilities and suggest improvements.\n\nFINDINGS\nThe library is well-stocked with books and computers, but many computers are outdated and slow. The sports facilities, including the football pitch and basketball court, are in good condition. However, the changing rooms require renovation. The cafeteria offers a limited menu and students have reported that there are not enough seating areas during lunch.\n\nRECOMMENDATIONS\n1. Upgrade the computers in the library with modern equipment.\n2. Renovate the changing rooms with new lockers and showers.\n3. Expand the cafeteria seating area.\n\nI hope these recommendations will be considered.",
      ar: "تقرير: مراجعة مرافق المدرسة\n\nمقدمة\nالغرض من هذا التقرير هو تقييم الوضع الحالي لمرافق المدرسة واقتراح التحسينات.\n\nالنتائج\nالمكتبة مجهزة جيداً بالكتب وأجهزة الكمبيوتر، لكن العديد من أجهزة الكمبيوتر قديمة وبطيئة. المرافق الرياضية، بما في ذلك ملعب كرة القدم وملعب كرة السلة، في حالة جيدة. ومع ذلك، تحتاج غرف تغيير الملابس إلى تجديد. الكافتيريا تقدم قائمة محدودة وقد أبلغ الطلاب أنه لا توجد مساحات جلوس كافية خلال وقت الغداء.\n\nالتوصيات\n1. ترقية أجهزة الكمبيوتر في المكتبة بمعدات حديثة.\n2. تجديد غرف تغيير الملابس بخزائن ودشات جديدة.\n3. توسيع منطقة جلوس الكافتيريا.\n\nآمل أن يتم النظر في هذه التوصيات."
    }
  },
  {
    id: "b2-report-2", levelId: "band7-8", type: "report",
    titleDe: "Report on a Language Course",
    titleEn: "Report on a Language Course",
    titleAr: "تقرير عن دورة لغة",
    instructions: "You recently attended an English language course. Write a report for your manager evaluating the course. Comment on the content, teaching quality, facilities, and value for money.",
    instructionsAr: "لقد حضرت مؤخراً دورة لغة إنجليزية. اكتب تقريراً لمديرك تقيم فيه الدورة. علق على المحتوى وجودة التدريس والمرافق والقيمة مقابل المال.",
    hints: ["Use formal language and report conventions", "Structure with clear sections: Introduction, Evaluation, Conclusion", "Be objective and support opinions with evidence", "End with a recommendation"],
    hintsAr: ["استخدم لغة رسمية وأعراف التقارير", "نظم في أقسام واضحة: مقدمة، تقييم، خاتمة", "كن موضوعياً وادعم الآراء بالأدلة", "اختتم بتوصية"],
    wordCount: { min: 140, max: 190 },
    tags: ["report", "language course", "evaluation", "education"],
    correction: {
      de: "REPORT: Evaluation of English Language Course\n\nINTRODUCTION\nThis report evaluates the 4-week intensive English course I attended at Global Language Academy from 5 May to 30 May.\n\nCOURSE CONTENT\nThe course covered all four skills: reading, writing, speaking, and listening. The materials were up-to-date and relevant to my needs. The grammar explanations were particularly clear.\n\nTEACHING QUALITY\nThe teachers were experienced and enthusiastic. Class sizes were small, allowing for individual attention. The feedback on written work was detailed and helpful.\n\nFACILITIES\nThe classrooms were well-equipped with interactive whiteboards. However, the WiFi connection was unreliable at times.\n\nRECOMMENDATION\nI recommend continuing with this course for intermediate learners. The only improvement would be to upgrade the WiFi.",
      en: "REPORT: Evaluation of English Language Course\n\nINTRODUCTION\nThis report evaluates the 4-week intensive English course I attended at Global Language Academy from 5 May to 30 May.\n\nCOURSE CONTENT\nThe course covered all four skills: reading, writing, speaking, and listening. The materials were up-to-date and relevant to my needs. The grammar explanations were particularly clear.\n\nTEACHING QUALITY\nThe teachers were experienced and enthusiastic. Class sizes were small, allowing for individual attention. The feedback on written work was detailed and helpful.\n\nFACILITIES\nThe classrooms were well-equipped with interactive whiteboards. However, the WiFi connection was unreliable at times.\n\nRECOMMENDATION\nI recommend continuing with this course for intermediate learners. The only improvement would be to upgrade the WiFi.",
      ar: "تقرير: تقييم دورة اللغة الإنجليزية\n\nمقدمة\nهذا التقرير يقيم دورة اللغة الإنجليزية المكثفة لمدة 4 أسابيع التي حضرتها في أكاديمية اللغة العالمية من 5 مايو إلى 30 مايو.\n\nمحتوى الدورة\nغطت الدورة المهارات الأربع: القراءة والكتابة والتحدث والاستماع. المواد كانت حديثة وذات صلة باحتياجاتي. شرح القواعد كان واضحاً بشكل خاص.\n\nجودة التدريس\nالمعلمون كانوا ذوي خبرة ومتحمسين. أحجام الفصول كانت صغيرة، مما سمح باهتمام فردي. التغذية الراجعة على الأعمال الكتابية كانت مفصلة ومفيدة.\n\nالمرافق\nالفصول الدراسية مجهزة تجهيزاً جيداً بسبورات بيضاء تفاعلية. ومع ذلك، كان اتصال WiFi غير موثوق في بعض الأحيان.\n\nالتوصية\nأوصي بمواصلة هذه الدورة للمتعلمين في المستوى المتوسط. التحسين الوحيد سيكون ترقية خدمة WiFi."
    }
  },
  {
    id: "b2-report-3", levelId: "band7-8", type: "report",
    titleDe: "Report on Student Satisfaction Survey",
    titleEn: "Report on Student Satisfaction Survey",
    titleAr: "تقرير عن استبيان رضا الطلاب",
    instructions: "Write a report summarising the results of a student satisfaction survey at your college. Include data on teaching quality, facilities, and social activities. Make recommendations for improvement.",
    instructionsAr: "اكتب تقريراً يلخص نتائج استبيان رضا الطلاب في كليتك. ضمن بيانات حول جودة التدريس والمرافق والأنشطة الاجتماعية. قدم توصيات للتحسين.",
    hints: ["Begin with the purpose and methodology of the survey", "Present findings with supporting data or percentages", "Use subheadings to organise information", "Conclude with clear, prioritised recommendations"],
    hintsAr: ["ابدأ بهدف ومنهجية الاستبيان", "قدم النتائج مع بيانات أو نسب مئوية داعمة", "استخدم عناوين فرعية لتنظيم المعلومات", "اختتم بتوصيات واضحة ومرتبة حسب الأولوية"],
    wordCount: { min: 140, max: 190 },
    tags: ["report", "survey", "student satisfaction", "recommendations"],
    correction: {
      de: "REPORT: Student Satisfaction Survey Results\n\nINTRODUCTION\nThis report presents the findings of a survey conducted among 200 students regarding their satisfaction with college life.\n\nTEACHING QUALITY\n85% of students rated teaching quality as good or excellent. The main concern was the lack of revision sessions before exams.\n\nFACILITIES\nThe library received positive feedback, with 78% satisfaction. However, the computer lab was rated poorly, with only 45% satisfaction due to outdated software.\n\nSOCIAL ACTIVITIES\nOnly 40% of students were satisfied with the social activities on offer. Many requested more sports clubs and cultural events.\n\nRECOMMENDATIONS\n1. Introduce weekly revision sessions before exams.\n2. Update the computer lab software.\n3. Create new sports clubs and cultural societies.",
      en: "REPORT: Student Satisfaction Survey Results\n\nINTRODUCTION\nThis report presents the findings of a survey conducted among 200 students regarding their satisfaction with college life.\n\nTEACHING QUALITY\n85% of students rated teaching quality as good or excellent. The main concern was the lack of revision sessions before exams.\n\nFACILITIES\nThe library received positive feedback, with 78% satisfaction. However, the computer lab was rated poorly, with only 45% satisfaction due to outdated software.\n\nSOCIAL ACTIVITIES\nOnly 40% of students were satisfied with the social activities on offer. Many requested more sports clubs and cultural events.\n\nRECOMMENDATIONS\n1. Introduce weekly revision sessions before exams.\n2. Update the computer lab software.\n3. Create new sports clubs and cultural societies.",
      ar: "تقرير: نتائج استبيان رضا الطلاب\n\nمقدمة\nهذا التقرير يعرض نتائج استبيان أجري بين 200 طالب حول رضاهم عن الحياة الجامعية.\n\nجودة التدريس\n85% من الطلاب قيموا جودة التدريس بأنها جيدة أو ممتازة. الشاغل الرئيسي كان نقص جلسات المراجعة قبل الامتحانات.\n\nالمرافق\nالمكتبة تلقت ردود فعل إيجابية بنسبة رضا 78%. ومع ذلك، معمل الكمبيوتر حصل على تقييم ضعيف بنسبة رضا 45% فقط بسبب البرامج القديمة.\n\nالأنشطة الاجتماعية\nفقط 40% من الطلاب كانوا راضين عن الأنشطة الاجتماعية المقدمة. طلب الكثيرون المزيد من الأندية الرياضية والفعاليات الثقافية.\n\nالتوصيات\n1. إدخال جلسات مراجعة أسبوعية قبل الامتحانات.\n2. تحديث برامج معمل الكمبيوتر.\n3. إنشاء أندية رياضية وجمعيات ثقافية جديدة."
    }
  },

  // ── STORIES ──
  {
    id: "b2-story-1", levelId: "band7-8", type: "dialogue",
    titleDe: "The Darkest Night",
    titleEn: "The Darkest Night",
    titleAr: "أحلك ليلة",
    instructions: "Write a story that begins with the sentence: 'It was the darkest night of the year, and I was completely lost.' Continue the story, describing what happened and how the situation was resolved.",
    instructionsAr: "اكتب قصة تبدأ بالجملة: 'كانت أحلك ليلة في السنة، وكنت تائهاً تماماً.' استمر في القصة، واصفاً ما حدث وكيف تم حل الموقف.",
    hints: ["Use the given opening sentence exactly as provided", "Create suspense and atmosphere using descriptive language", "Include dialogue between characters to make it engaging", "Give the story a satisfying ending"],
    hintsAr: ["استخدم الجملة الافتتاحية المحددة كما هي", "ابنِ التشويق والأجواء باستخدام لغة وصفية", "ضمن حواراً بين الشخصيات لجعلها جذابة", "أعط القصة نهاية مرضية"],
    wordCount: { min: 140, max: 190 },
    tags: ["story", "narrative", "creative writing", "suspense"],
    correction: {
      de: "It was the darkest night of the year, and I was completely lost. The forest around me seemed to close in with every step I took. My phone battery had died an hour ago, and the torch on my keychain was barely lighting the path ahead. Suddenly, I saw a faint light in the distance. 'Hello?' I called out, my voice trembling. To my relief, an old man appeared holding a lantern. 'You look lost, young man,' he said with a kind smile. He led me to a small cottage where his wife made me hot tea and called a taxi. As I finally drove home, I realised that the scariest nights often teach us the most about human kindness.",
      en: "It was the darkest night of the year, and I was completely lost. The forest around me seemed to close in with every step I took. My phone battery had died an hour ago, and the torch on my keychain was barely lighting the path ahead. Suddenly, I saw a faint light in the distance. 'Hello?' I called out, my voice trembling. To my relief, an old man appeared holding a lantern. 'You look lost, young man,' he said with a kind smile. He led me to a small cottage where his wife made me hot tea and called a taxi. As I finally drove home, I realised that the scariest nights often teach us the most about human kindness.",
      ar: "كانت أحلك ليلة في السنة، وكنت تائهاً تماماً. الغابة حولي بدت وكأنها تضيق كلما تقدمت خطوة. بطارية هاتفي نفدت منذ ساعة، والمصباح الصغير في سلسلة مفاتيحي بالكاد يضيء الطريق أمامي. فجأة، رأيت ضوءاً خافتاً في المسافة. 'مرحباً؟' ناديت بصوت مرتجف. لحسن حظي، ظهر رجل عجوز يحمل فانوساً. 'تبدو تائهاً أيها الشاب،' قال بابتسامة لطيفة. قادني إلى كوخ صغير حيث صنعت له زوجته شاياً ساخناً واتصلت بسيارة أجرة. عندما عدت أخيراً إلى المنزل بالسيارة، أدركت أن أكثر الليالي رعباً غالباً ما تعلمنا أكثر شيء عن اللطف البشري."
    }
  },
  {
    id: "b2-story-2", levelId: "band7-8", type: "dialogue",
    titleDe: "An Unexpected Journey",
    titleEn: "An Unexpected Journey",
    titleAr: "رحلة غير متوقعة",
    instructions: "Write a story about a character who takes an unexpected journey. This could be a physical journey to an unknown place or a personal journey of discovery. Include a problem that the character must overcome.",
    instructionsAr: "اكتب قصة عن شخصية تخوض رحلة غير متوقعة. يمكن أن تكون رحلة جسدية إلى مكان غير معروف أو رحلة شخصية لاكتشاف الذات. ضمن مشكلة يجب على الشخصية التغلب عليها.",
    hints: ["Introduce the character and their ordinary life at the start", "Describe the event that triggers the unexpected journey", "Show how the character changes by the end", "Use a variety of past tenses: past simple, past continuous, past perfect"],
    hintsAr: ["قدم الشخصية وحياتها العادية في البداية", "صِف الحدث الذي يحفز الرحلة غير المتوقعة", "أظهر كيف تتغير الشخصية في النهاية", "استخدم مجموعة من أزمنة الماضي: الماضي البسيط، الماضي المستمر، الماضي التام"],
    wordCount: { min: 140, max: 190 },
    tags: ["story", "narrative", "adventure", "creative writing"],
    correction: {
      de: "Sarah had always been a cautious person who planned everything carefully. So when she accidentally boarded the wrong train in Tokyo, she panicked. The train was heading to a small mountain village instead of the city centre. At first, she tried to stay calm, using hand gestures to communicate with the locals. An elderly woman noticed her confusion and, despite the language barrier, guided her to a beautiful temple overlooking the valley. Sarah spent the most memorable afternoon of her life there, drinking green tea with her new friend. When she finally returned to her hotel, she smiled. Getting lost had been the best thing that could have happened.",
      en: "Sarah had always been a cautious person who planned everything carefully. So when she accidentally boarded the wrong train in Tokyo, she panicked. The train was heading to a small mountain village instead of the city centre. At first, she tried to stay calm, using hand gestures to communicate with the locals. An elderly woman noticed her confusion and, despite the language barrier, guided her to a beautiful temple overlooking the valley. Sarah spent the most memorable afternoon of her life there, drinking green tea with her new friend. When she finally returned to her hotel, she smiled. Getting lost had been the best thing that could have happened.",
      ar: "كانت سارة دائماً شخصية حذرة تخطط لكل شيء بعناية. لذلك عندما ركبت القطار الخطأ عن غير قصد في طوكيو، أصيبت بالذعر. القطار كان متجهاً إلى قرية جبلية صغيرة بدلاً من وسط المدينة. في البداية، حاولت البقاء هادئة، مستخدمة إيماءات اليد للتواصل مع السكان المحليين. لاحظت سيدة مسنة حيرتها، ورغم حاجز اللغة، قادتها إلى معبد جميل يطل على الوادي. قضت سارة أكثر فترة بعد ظهر لا تُنسى في حياتها هناك، وهي تشرب الشاي الأخضر مع صديقتها الجديدة. عندما عادت أخيراً إلى فندقها، ابتسمت. لقد كان الضياع أفضل شيء يمكن أن يحدث."
    }
  },

  // ── EMAILS ──
  {
    id: "b2-email-1", levelId: "band7-8", type: "email",
    titleDe: "Email to a Friend About Weekend Plans",
    titleEn: "Email to a Friend About Weekend Plans",
    titleAr: "بريد إلكتروني لصديق حول خطط عطلة نهاية الأسبوع",
    instructions: "Write an email to a friend suggesting plans for the weekend. You want to try a new activity together. Suggest specific options, ask for their opinion, and propose a time and place to meet.",
    instructionsAr: "اكتب بريداً إلكترونياً لصديق تقترح فيه خططاً لعطلة نهاية الأسبوع. تريد تجربة نشاط جديد معاً. اقترح خيارات محددة، واسأل عن رأيه، واقترح وقتاً ومكاناً للقاء.",
    hints: ["Use an informal, friendly tone", "Start with a warm greeting and ask how they are", "Make your suggestions enthusiastic and specific", "End with a question to encourage a reply"],
    hintsAr: ["استخدم نبرة غير رسمية وودية", "ابدأ بتحية دافئة واسأل عن أحوالهم", "اجعل اقتراحاتك متحمسة ومحددة", "اختتم بسؤال لتشجيع الرد"],
    wordCount: { min: 140, max: 190 },
    tags: ["email", "informal", "plans", "friend"],
    correction: {
      de: "Hey Emma,\n\nHow are you? I hope your exams went well!\n\nI was thinking we should do something fun this weekend to celebrate the end of the semester. How about trying that new escape room in the city centre? I have heard amazing things about it! Alternatively, we could go kayaking on the lake if the weather is nice.\n\nWould either of those appeal to you? Let me know what you think. If you are free on Saturday afternoon, we could go around 2 pm and grab dinner afterwards.\n\nLooking forward to hearing from you!\n\nLots of love,\nMaya",
      en: "Hey Emma,\n\nHow are you? I hope your exams went well!\n\nI was thinking we should do something fun this weekend to celebrate the end of the semester. How about trying that new escape room in the city centre? I have heard amazing things about it! Alternatively, we could go kayaking on the lake if the weather is nice.\n\nWould either of those appeal to you? Let me know what you think. If you are free on Saturday afternoon, we could go around 2 pm and grab dinner afterwards.\n\nLooking forward to hearing from you!\n\nLots of love,\nMaya",
      ar: "مرحباً إيما،\n\nكيف حالك؟ أتمنى أن تكون امتحاناتك قد سارت بشكل جيد!\n\nكنت أفكر أنه يجب علينا فعل شيء ممتع في نهاية هذا الأسبوع للاحتفال بنهاية الفصل الدراسي. ماذا عن تجربة غرفة الهروب الجديدة في وسط المدينة؟ لقد سمعت أشياء رائعة عنها! أو بدلاً من ذلك، يمكننا الذهاب للتجديف بالكاياك في البحيرة إذا كان الطقس لطيفاً.\n\nهل يروق لك أي من هذين الاقتراحين؟ أخبريني برأيك. إذا كنت متفرغة بعد ظهر السبت، يمكننا الذهاب حوالي الساعة 2 ثم نتناول العشاء بعد ذلك.\n\nأتطلع لسماع ردك!\n\nمع كل الحب،\nمايا"
    }
  },
  {
    id: "b2-email-2", levelId: "band7-8", type: "email",
    titleDe: "Email to a Colleague About a Project",
    titleEn: "Email to a Colleague About a Project",
    titleAr: "بريد إلكتروني لزميل حول مشروع",
    instructions: "Write an email to a colleague updating them on the progress of a joint project. Mention what you have completed, what still needs to be done, and suggest a time for a meeting to discuss the next steps.",
    instructionsAr: "اكتب بريداً إلكترونياً لزميل تطلعه على تقدم مشروع مشترك. اذكر ما أكملته، وما الذي لا يزال بحاجة للقيام به، واقترح وقتاً للاجتماع لمناقشة الخطوات التالية.",
    hints: ["Use a semi-formal tone appropriate for a colleague", "Be clear about what has been done and what is pending", "Be collaborative in your suggestions", "Include a specific call to action"],
    hintsAr: ["استخدم نبرة شبه رسمية مناسبة لزميل", "كن واضحاً بشأن ما تم إنجازه وما هو معلق", "كن متعاوناً في اقتراحاتك", "ضمن دعوة محددة للعمل"],
    wordCount: { min: 140, max: 190 },
    tags: ["email", "work", "project", "update"],
    correction: {
      de: "Hi James,\n\nI hope you are having a good week. I wanted to give you a quick update on the marketing campaign project.\n\nI have completed the market research report and designed the initial concept for the social media ads. The budget proposal is still in progress, and I could use your input on the cost estimates before I finalise it.\n\nCould we schedule a meeting this Thursday or Friday to go over the budget and plan the next phase? Let me know what time works for you.\n\nThanks for your help with this!\n\nBest regards,\nPriya",
      en: "Hi James,\n\nI hope you are having a good week. I wanted to give you a quick update on the marketing campaign project.\n\nI have completed the market research report and designed the initial concept for the social media ads. The budget proposal is still in progress, and I could use your input on the cost estimates before I finalise it.\n\nCould we schedule a meeting this Thursday or Friday to go over the budget and plan the next phase? Let me know what time works for you.\n\nThanks for your help with this!\n\nBest regards,\nPriya",
      ar: "مرحباً جيمس،\n\nأتمنى أن يكون أسبوعك جيداً. أردت إطلاعك على تحديث سريع بخصوص مشروع الحملة التسويقية.\n\nلقد أكملت تقرير أبحاث السوق وصممت المفهوم الأولي لإعلانات وسائل التواصل الاجتماعي. اقتراح الميزانية لا يزال قيد التنفيذ، وسأحتاج إلى رأيك في تقديرات التكلفة قبل أن أنهيه.\n\nهل يمكننا تحديد موعد اجتماع هذا الخميس أو الجمعة لمراجعة الميزانية والتخطيط للمرحلة التالية؟ أخبرني بالوقت المناسب لك.\n\nشكراً لمساعدتك في هذا!\n\nمع أطيب التحيات،\nبريا"
    }
  },

  // ── LETTERS ──
  {
    id: "b2-letter-1", levelId: "band7-8", type: "letter",
    titleDe: "Letter of Application for a Summer Job",
    titleEn: "Letter of Application for a Summer Job",
    titleAr: "خطاب تقديم لوظيفة صيفية",
    instructions: "You are applying for a summer job at an international hotel. Write a formal letter of application. Introduce yourself, describe your relevant skills and experience, explain why you want the job, and mention when you are available.",
    instructionsAr: "أنت تتقدم لوظيفة صيفية في فندق دولي. اكتب خطاب تقديم رسمي. قدم نفسك، وصف مهاراتك وخبراتك ذات الصلة، واشرح لماذا تريد الوظيفة، واذكر متى تكون متاحاً.",
    hints: ["Use formal letter structure: your address, date, salutation", "Start with 'Dear Mr/Ms [Surname]' or 'Dear Hiring Manager'", "Highlight relevant skills: languages, customer service, teamwork", "End with 'Yours sincerely' and your full name"],
    hintsAr: ["استخدم هيكل الرسالة الرسمية: عنوانك، التاريخ، التحية", "ابدأ بـ 'عزيزي السيد/السيدة [الاسم]' أو 'مدير التوظيف المحترم'", "أبرز المهارات ذات الصلة: اللغات، خدمة العملاء، العمل الجماعي", "اختتم بـ 'مع خالص التحيات' واسمك الكامل"],
    wordCount: { min: 140, max: 190 },
    tags: ["letter", "application", "job", "formal"],
    correction: {
      de: "Dear Hiring Manager,\n\nI am writing to apply for the summer position of receptionist at the Grand Imperial Hotel, as advertised on your website.\n\nI am currently a Business student at London Metropolitan University with a B2 level in English as well as fluency in Spanish and Arabic. Last summer, I worked as a front desk assistant at a local hotel, where I developed strong customer service skills. I am confident, organised, and comfortable using reservation software.\n\nI am available to work from 1 June to 15 September, including weekends. I would welcome the opportunity to contribute to your team.\n\nI have attached my CV for your consideration. Thank you for your time.\n\nYours sincerely,\nAlex Johnson",
      en: "Dear Hiring Manager,\n\nI am writing to apply for the summer position of receptionist at the Grand Imperial Hotel, as advertised on your website.\n\nI am currently a Business student at London Metropolitan University with a B2 level in English as well as fluency in Spanish and Arabic. Last summer, I worked as a front desk assistant at a local hotel, where I developed strong customer service skills. I am confident, organised, and comfortable using reservation software.\n\nI am available to work from 1 June to 15 September, including weekends. I would welcome the opportunity to contribute to your team.\n\nI have attached my CV for your consideration. Thank you for your time.\n\nYours sincerely,\nAlex Johnson",
      ar: "سيد مدير التوظيف المحترم،\n\nأكتب للتقدم لوظيفة الصيف كموظف استقبال في فندق غراند إمبريال، كما هو معلن على موقعكم الإلكتروني.\n\nأنا حالياً طالب إدارة أعمال في جامعة لندن متروبوليتان، بمستوى B2 في اللغة الإنجليزية بالإضافة إلى الطلاقة في الإسبانية والعربية. في الصيف الماضي، عملت كمساعد في مكتب استقبال فندق محلي، حيث طورت مهارات قوية في خدمة العملاء. أنا واثق من نفسي ومنظم وأجيد استخدام برامج الحجز.\n\nأنا متاح للعمل من 1 يونيو إلى 15 سبتمبر، بما في ذلك عطلات نهاية الأسبوع. سأرحب بفرصة المساهمة في فريقكم.\n\nلقد أرفقت سيرتي الذاتية للنظر فيها. شكراً لوقتكم.\n\nمع خالص التحيات،\nأليكس جونسون"
    }
  },
  {
    id: "b2-letter-2", levelId: "band7-8", type: "letter",
    titleDe: "Letter to a Newspaper About a Local Issue",
    titleEn: "Letter to a Newspaper About a Local Issue",
    titleAr: "خطاب إلى إحدى الصحف حول قضية محلية",
    instructions: "Write a letter to the editor of your local newspaper expressing concern about a local issue. This could be about traffic problems, lack of green spaces, or another community issue. Suggest solutions.",
    instructionsAr: "اكتب خطاباً إلى محرر صحيفتك المحلية تعبر فيه عن قلقك بشأن قضية محلية. يمكن أن يكون هذا حول مشاكل المرور، أو نقص المساحات الخضراء، أو قضية مجتمعية أخرى. اقترح حلولاً.",
    hints: ["Use a formal but passionate tone", "Clearly state the issue in the first paragraph", "Explain why this matters to the community", "Suggest practical solutions", "End with a call to action"],
    hintsAr: ["استخدم نبرة رسمية ولكن شغوفة", "اذكر القضية بوضوح في الفقرة الأولى", "اشرح لماذا هذا مهم للمجتمع", "اقترح حلولاً عملية", "اختتم بدعوة للعمل"],
    wordCount: { min: 140, max: 190 },
    tags: ["letter", "newspaper", "issue", "formal"],
    correction: {
      de: "Dear Editor,\n\nI am writing to express my concern about the increasing traffic congestion in our town centre during peak hours. As a resident of Greenfield Avenue for over ten years, I have seen the situation worsen significantly.\n\nEvery morning, parents dropping their children at the local primary school cause long queues that block surrounding streets. This not only wastes time but also creates a safety hazard for pedestrians. Furthermore, the air quality in the area has deteriorated noticeably.\n\nI suggest that the council introduces a one-way system around the school zone and encourages walking or cycling by improving the cycle lanes. A 'park and walk' scheme would also reduce the number of cars entering the town centre.\n\nI urge residents and local officials to work together on this pressing issue.\n\nYours faithfully,\nMrs Helen Parker",
      en: "Dear Editor,\n\nI am writing to express my concern about the increasing traffic congestion in our town centre during peak hours. As a resident of Greenfield Avenue for over ten years, I have seen the situation worsen significantly.\n\nEvery morning, parents dropping their children at the local primary school cause long queues that block surrounding streets. This not only wastes time but also creates a safety hazard for pedestrians. Furthermore, the air quality in the area has deteriorated noticeably.\n\nI suggest that the council introduces a one-way system around the school zone and encourages walking or cycling by improving the cycle lanes. A 'park and walk' scheme would also reduce the number of cars entering the town centre.\n\nI urge residents and local officials to work together on this pressing issue.\n\nYours faithfully,\nMrs Helen Parker",
      ar: "عزيزي المحرر،\n\nأكتب لأعرب عن قلقي بشأن الازدحام المروري المتزايد في وسط بلدتنا خلال ساعات الذروة. كساكنة في غرينفيلد أفينيو لأكثر من عشر سنوات، رأيت الوضع يزداد سوءاً بشكل ملحوظ.\n\nكل صباح، يتسبب الآباء الذين يوصلون أطفالهم إلى المدرسة الابتدائية المحلية في طوابير طويلة تسد الشوارع المحيطة. هذا لا يضيع الوقت فحسب، بل يخلق أيضاً خطراً على السلامة للمشاة. علاوة على ذلك، تدهورت جودة الهواء في المنطقة بشكل ملحوظ.\n\nأقترح أن يقوم المجلس بإدخال نظام الاتجاه الواحد حول منطقة المدرسة وتشجيع المشي أو ركوب الدراجات من خلال تحسين مسارات الدراجات. كما أن نظام 'اركن وامش' سيقلل من عدد السيارات التي تدخل وسط المدينة.\n\nأحث السكان والمسؤولين المحليين على العمل معاً بشأن هذه القضية الملحة.\n\nمع خالص التحيات،\nالسيدة هيلين باركر"
    }
  },
  {
    id: "b2-proposal-1", levelId: "band7-8", type: "report",
    titleDe: "Proposal to Improve the School Library",
    titleEn: "Proposal to Improve the School Library",
    titleAr: "اقتراح لتحسين مكتبة المدرسة",
    instructions: "Write a proposal to the school principal suggesting improvements to the school library. Outline the current problems, propose specific changes, explain the benefits, and suggest how to implement them.",
    instructionsAr: "اكتب اقتراحاً لمدير المدرسة تقترح فيه تحسينات لمكتبة المدرسة. حدد المشكلات الحالية، واقترح تغييرات محددة، واشرح الفوائد، واقترح كيفية تنفيذها.",
    hints: ["Use proposal format: Introduction, Current Situation, Proposed Changes, Benefits", "Be realistic about costs and implementation", "Use persuasive language to convince the reader", "Include a timeline where possible"],
    hintsAr: ["استخدم صيغة الاقتراح: مقدمة، الوضع الحالي، التغييرات المقترحة، الفوائد", "كن واقعياً بشأن التكاليف والتنفيذ", "استخدم لغة مقنعة لإقناع القارئ", "ضمن جدولاً زمنياً إذا أمكن"],
    wordCount: { min: 140, max: 190 },
    tags: ["proposal", "library", "improvement", "school"],
    correction: {
      de: "PROPOSAL: Improving the School Library\n\nINTRODUCTION\nThis proposal suggests practical improvements to make the school library a more effective learning space.\n\nCURRENT SITUATION\nThe library is underused. Many students prefer to study in the cafeteria because it is more comfortable. The books are outdated and the computers are slow.\n\nPROPOSED CHANGES\n1. Create a comfortable reading area with bean bags and soft lighting.\n2. Update the book collection with popular fiction and academic resources.\n3. Replace the 10 oldest computers with new ones.\n4. Introduce a booking system for group study rooms.\n\nBENEFITS\nThese improvements would increase library usage, improve academic results, and create a welcoming environment for all students.\n\nIMPLEMENTATION\nThe changes could be phased over three months with a budget of approximately $5,000.",
      en: "PROPOSAL: Improving the School Library\n\nINTRODUCTION\nThis proposal suggests practical improvements to make the school library a more effective learning space.\n\nCURRENT SITUATION\nThe library is underused. Many students prefer to study in the cafeteria because it is more comfortable. The books are outdated and the computers are slow.\n\nPROPOSED CHANGES\n1. Create a comfortable reading area with bean bags and soft lighting.\n2. Update the book collection with popular fiction and academic resources.\n3. Replace the 10 oldest computers with new ones.\n4. Introduce a booking system for group study rooms.\n\nBENEFITS\nThese improvements would increase library usage, improve academic results, and create a welcoming environment for all students.\n\nIMPLEMENTATION\nThe changes could be phased over three months with a budget of approximately $5,000.",
      ar: "اقتراح: تحسين مكتبة المدرسة\n\nمقدمة\nهذا الاقتراح يوصي بتحسينات عملية لجعل مكتبة المدرسة مساحة تعليمية أكثر فعالية.\n\nالوضع الحالي\nالمكتبة غير مستغلة بشكل كافٍ. العديد من الطلاب يفضلون الدراسة في الكافتيريا لأنها أكثر راحة. الكتب قديمة وأجهزة الكمبيوتر بطيئة.\n\nالتغييرات المقترحة\n1. إنشاء منطقة قراءة مريحة بأكياس الفول والإضاءة الخافتة.\n2. تحديث مجموعة الكتب بروايات شعبية وموارد أكاديمية.\n3. استبدال أقدم 10 أجهزة كمبيوتر بأخرى جديدة.\n4. إدخال نظام حجز لغرف الدراسة الجماعية.\n\nالفوائد\nهذه التحسينات ستزيد من استخدام المكتبة وتحسن النتائج الأكاديمية وتخلق بيئة ترحيبية لجميع الطلاب.\n\nالتنفيذ\nيمكن تنفيذ التغييرات على مدى ثلاثة أشهر بميزانية تقارب 5,000 دولار."
    }
  },
  {
    id: "b2-proposal-2", levelId: "band7-8", type: "report",
    titleDe: "Proposal for a New Student Club",
    titleEn: "Proposal for a New Student Club",
    titleAr: "اقتراح لنادٍ طلابي جديد",
    instructions: "Write a proposal suggesting the creation of a new student club at your school or university. Describe the purpose of the club, its activities, who would benefit, and what resources are needed.",
    instructionsAr: "اكتب اقتراحاً تقترح فيه إنشاء نادٍ طلابي جديد في مدرستك أو جامعتك. صف الغرض من النادي وأنشطته ومن سيستفيد وما الموارد المطلوبة.",
    hints: ["Choose a specific type of club: debate, environment, coding, etc.", "Explain why this club is needed", "Describe planned activities and events", "Show how the club aligns with school values"],
    hintsAr: ["اختر نوعاً محدداً من النوادي: مناظرة، بيئة، برمجة، إلخ.", "اشرح سبب الحاجة لهذا النادي", "صف الأنشطة والفعاليات المخطط لها", "أظهر كيف يتوافق النادي مع قيم المدرسة"],
    wordCount: { min: 140, max: 190 },
    tags: ["proposal", "club", "students", "activities"],
    correction: {
      de: "PROPOSAL: Establishing an Environmental Awareness Club\n\nINTRODUCTION\nThis proposal recommends creating an Environmental Awareness Club to engage students in sustainability initiatives.\n\nPURPOSE\nThe club would educate students about environmental issues, organise green initiatives within the school, and participate in local environmental projects.\n\nPLANNED ACTIVITIES\n- Monthly recycling drives and waste audits\n- Tree planting events in the local community\n- Guest talks from environmental professionals\n- 'Green Week' campaign with workshops and competitions\n\nBENEFICIARIES\nThe club would benefit all students by fostering environmental responsibility and providing leadership opportunities. The wider community would also benefit from our projects.\n\nRESOURCES NEEDED\n- A staff supervisor from the science department\n- A dedicated notice board\n- Initial budget of $200 for materials\n- A classroom for weekly meetings\n\nI believe this club would make a positive contribution to our school.",
      en: "PROPOSAL: Establishing an Environmental Awareness Club\n\nINTRODUCTION\nThis proposal recommends creating an Environmental Awareness Club to engage students in sustainability initiatives.\n\nPURPOSE\nThe club would educate students about environmental issues, organise green initiatives within the school, and participate in local environmental projects.\n\nPLANNED ACTIVITIES\n- Monthly recycling drives and waste audits\n- Tree planting events in the local community\n- Guest talks from environmental professionals\n- 'Green Week' campaign with workshops and competitions\n\nBENEFICIARIES\nThe club would benefit all students by fostering environmental responsibility and providing leadership opportunities. The wider community would also benefit from our projects.\n\nRESOURCES NEEDED\n- A staff supervisor from the science department\n- A dedicated notice board\n- Initial budget of $200 for materials\n- A classroom for weekly meetings\n\nI believe this club would make a positive contribution to our school.",
      ar: "اقتراح: إنشاء نادٍ للتوعية البيئية\n\nمقدمة\nهذا الاقتراح يوصي بإنشاء نادٍ للتوعية البيئية لإشراك الطلاب في مبادرات الاستدامة.\n\nالغرض\nالنادي سيقوم بتثقيف الطلاب حول القضايا البيئية، وتنظيم مبادرات خضراء داخل المدرسة، والمشاركة في المشاريع البيئية المحلية.\n\nالأنشطة المخطط لها\n- حملات إعادة تدوير شهرية ومراجعة النفايات\n- فعاليات زراعة الأشجار في المجتمع المحلي\n- محاضرات لضيوف من خبراء البيئة\n- حملة 'الأسبوع الأخضر' مع ورش عمل ومسابقات\n\nالمستفيدون\nالنادي سيفيد جميع الطلاب بتعزيز المسؤولية البيئية وتوفير فرص القيادة. المجتمع الأوسع سيستفيد أيضاً من مشاريعنا.\n\nالموارد المطلوبة\n- مشرف من قسم العلوم\n- لوحة إعلانات مخصصة\n- ميزانية أولية قدرها 200 دولار للمواد\n- فصل دراسي للاجتماعات الأسبوعية\n\nأعتقد أن هذا النادي سيقدم مساهمة إيجابية لمدرستنا."
    }
  },
  {
    id: "b2-review-1", levelId: "band7-8", type: "description",
    titleDe: "Review of a Restaurant",
    titleEn: "Review of a Restaurant",
    titleAr: "مراجعة مطعم",
    instructions: "Write a review of a restaurant you have visited recently. Describe the atmosphere, the quality of the food, the service, and the value for money. Would you recommend it to others?",
    instructionsAr: "اكتب مراجعة لمطعم زرته مؤخراً. صف الأجواء وجودة الطعام والخدمة والقيمة مقابل المال. هل توصي به للآخرين؟",
    hints: ["Give the review an engaging title with a rating", "Describe the ambiance and decor", "Comment on specific dishes you tried", "Balance positive and negative points", "State whether you would return"],
    hintsAr: ["أعط المراجعة عنواناً جذاباً مع تقييم", "صف الأجواء والديكور", "علق على أطباق محددة جربتها", "وازن بين النقاط الإيجابية والسلبية", "اذكر ما إذا كنت ستعود"],
    wordCount: { min: 140, max: 190 },
    tags: ["review", "restaurant", "food", "recommendation"],
    correction: {
      de: "A Hidden Gem in the City Centre ★★★★☆\n\nLast weekend, I visited 'The Green Olive', a small Mediterranean restaurant tucked away on King Street. The atmosphere was warm and inviting, with soft lighting and traditional music playing in the background.\n\nI ordered the grilled halloumi salad as a starter and the lamb tagine as a main course. The halloumi was perfectly crispy on the outside and soft on the inside. The tagine was rich and flavourful, with tender meat and aromatic spices. The portions were generous.\n\nThe service was friendly and attentive, although we did wait 20 minutes for our desserts. The prices were reasonable for the quality of the food, with main courses ranging from $12 to $18.\n\nOverall, I highly recommend 'The Green Olive' for anyone who enjoys authentic Mediterranean cuisine. I will definitely be returning!",
      en: "A Hidden Gem in the City Centre ★★★★☆\n\nLast weekend, I visited 'The Green Olive', a small Mediterranean restaurant tucked away on King Street. The atmosphere was warm and inviting, with soft lighting and traditional music playing in the background.\n\nI ordered the grilled halloumi salad as a starter and the lamb tagine as a main course. The halloumi was perfectly crispy on the outside and soft on the inside. The tagine was rich and flavourful, with tender meat and aromatic spices. The portions were generous.\n\nThe service was friendly and attentive, although we did wait 20 minutes for our desserts. The prices were reasonable for the quality of the food, with main courses ranging from $12 to $18.\n\nOverall, I highly recommend 'The Green Olive' for anyone who enjoys authentic Mediterranean cuisine. I will definitely be returning!",
      ar: "جوهرة مخفية في وسط المدينة ★★★★☆\n\nفي نهاية الأسبوع الماضي، زرت 'الزيتونة الخضراء'، وهو مطعم متوسطي صغير يقع في شارع كينغ. الأجواء كانت دافئة ومرحبة، مع إضاءة خافتة وموسيقى تقليدية في الخلفية.\n\nطلبت سلطة الحلومي المشوي كمقبلات وطاجن لحم كطبق رئيسي. الحلومي كان مقرمشاً بشكل مثالي من الخارج وطرياً من الداخل. الطاجن كان غنياً ولذيذاً، مع لحم طري وتوابل عطرية. الحصص كانت سخية.\n\nالخدمة كانت ودودة ومنتبهة، على الرغم من أننا انتظرنا 20 دقيقة للحلويات. الأسعار كانت معقولة بالنسبة لجودة الطعام، حيث تتراوح الأطباق الرئيسية من 12 إلى 18 دولاراً.\n\nبشكل عام، أوصي بشدة بـ 'الزيتونة الخضراء' لأي شخص يستمتع بالمأكولات المتوسطية الأصيلة. سأعود بالتأكيد!"
    }
  },
  {
    id: "b2-review-2", levelId: "band7-8", type: "description",
    titleDe: "Review of a Book or TV Series",
    titleEn: "Review of a Book or TV Series",
    titleAr: "مراجعة كتاب أو مسلسل تلفزيوني",
    instructions: "Write a review of a book you have read or a TV series you have watched. Summarise the plot without spoilers, discuss what you liked or disliked, and recommend it to a specific audience.",
    instructionsAr: "اكتب مراجعة لكتاب قرأته أو مسلسل شاهدته. لخص القصة دون حرق، وناقش ما أعجبك أو لم يعجبك، وأوصِ به لجمهور محدد.",
    hints: ["Start with a hook to grab attention", "Briefly describe the genre and premise", "Comment on writing style, pacing, character development", "Be honest about any drawbacks", "Give a clear recommendation with who would enjoy it"],
    hintsAr: ["ابدأ بخطاف جذب الانتباه", "صف النوع والفرضية بإيجاز", "علق على أسلوب الكتابة، الإيقاع، تطور الشخصيات", "كن صادقاً بشأن أي عيوب", "قدم توصية واضحة مع من قد يستمتع به"],
    wordCount: { min: 140, max: 190 },
    tags: ["review", "book", "TV series", "recommendation"],
    correction: {
      de: "A Must-Read for Mystery Lovers ★★★★★\n\nI recently finished 'The Thursday Murder Club' by Richard Osman, and I cannot recommend it enough. The book follows four retirees living in a peaceful retirement village who meet weekly to investigate unsolved murders.\n\nWhat makes this book special is its unique blend of humour and mystery. The characters are charming and well-developed, each bringing their own skills to the investigations. The plot is clever with plenty of twists that keep you guessing until the very end. Osman's writing is witty and warm.\n\nIf I had to find a criticism, the middle section slows down slightly, but the ending more than makes up for it.\n\nI would recommend this book to anyone who enjoys cosy mysteries with heart. It is perfect for a weekend read. I am already looking forward to the next book in the series!",
      en: "A Must-Read for Mystery Lovers ★★★★★\n\nI recently finished 'The Thursday Murder Club' by Richard Osman, and I cannot recommend it enough. The book follows four retirees living in a peaceful retirement village who meet weekly to investigate unsolved murders.\n\nWhat makes this book special is its unique blend of humour and mystery. The characters are charming and well-developed, each bringing their own skills to the investigations. The plot is clever with plenty of twists that keep you guessing until the very end. Osman's writing is witty and warm.\n\nIf I had to find a criticism, the middle section slows down slightly, but the ending more than makes up for it.\n\nI would recommend this book to anyone who enjoys cosy mysteries with heart. It is perfect for a weekend read. I am already looking forward to the next book in the series!",
      ar: "قراءة لا تُفوّت لعشاق الغموض ★★★★★\n\nلقد انتهيت مؤخراً من رواية 'نادي القتلى الخميس' لريتشارد أوسمان، ولا يمكنني التوصية بها بما فيه الكفاية. الرواية تتبع أربعة متقاعدين يعيشون في قرية تقاعد هادئة يجتمعون أسبوعياً للتحقيق في جرائم قتل لم تُحل.\n\nما يجعل هذه الرواية مميزة هو مزيجها الفريد من الفكاهة والغموض. الشخصيات ساحرة ومتطورة بشكل جيد، كل منها يجلب مهاراته الخاصة للتحقيقات. الحبكة ذكية مع الكثير من التقلبات التي تبقيك في حالة تخمين حتى النهاية. أسلوب أوسمان في الكتابة ذكي ودافئ.\n\nإذا كان علي أن أجد نقداً، القسم الأوسط يبطئ قليلاً، لكن النهاية تعوض أكثر من ذلك.\n\nأوصي بهذه الرواية لأي شخص يستمتع بالغموض المريح ذو القلب الدافئ. إنها مثالية للقراءة في عطلة نهاية الأسبوع. أنا بالفعل أتطلع للكتاب التالي في السلسلة!"
    }
  },
];
