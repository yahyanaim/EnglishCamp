export type PictureSection = {
  id: string;
  title: string;
  titleAr?: string;
  icon: string;
  explanation: string;
  explanationAr?: string;
  phrases: { de: string; en: string; ar?: string }[];
};

export type PictureExample = {
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
};

export const PICTURE_SECTIONS: PictureSection[] = [
  {
    id: "introduction",
    title: "General Introduction",
    titleAr: "مقدمة عامة",
    icon: "📌",
    explanation: "Start by stating what the picture shows in general terms. Mention the type of image and the main subject.",
    explanationAr: "ابدأ بذكر ما تظهره الصورة بعبارات عامة. اذكر نوع الصورة والموضوع الرئيسي.",
    phrases: [
      { de: "The picture shows / depicts ...", en: "The picture shows / depicts ...", ar: "تظهر الصورة ..." },
      { de: "In this photograph, I can see ...", en: "In this photograph, I can see ...", ar: "في هذه الصورة الفوتوغرافية، أستطيع رؤية ..." },
      { de: "This image is about ...", en: "This image is about ...", ar: "هذه الصورة تتعلق بـ ..." },
      { de: "The photo was taken in / at ...", en: "The photo was taken in / at ...", ar: "التقطت الصورة في ..." },
      { de: "This picture illustrates a scene of ...", en: "This picture illustrates a scene of ...", ar: "توضح هذه الصورة مشهداً لـ ..." },
      { de: "What we see here is ...", en: "What we see here is ...", ar: "ما نراه هنا هو ..." },
      { de: "The photograph captures a moment of ...", en: "The photograph captures a moment of ...", ar: "تلتقط الصورة الفوتوغرافية لحظة ..." },
    ],
  },
  {
    id: "location",
    title: "Location & Setting",
    titleAr: "المكان والإعداد",
    icon: "📍",
    explanation: "Describe where the scene takes place. Use prepositions of place and location vocabulary.",
    explanationAr: "صِف مكان حدوث المشهد. استخدم حروف الجر للمكان ومفردات الموقع.",
    phrases: [
      { de: "In the foreground / background, you can see ...", en: "In the foreground / background, you can see ...", ar: "في المقدمة / الخلفية، يمكنك رؤية ..." },
      { de: "On the left / right / in the centre, there is ...", en: "On the left / right / in the centre, there is ...", ar: "على اليسار / اليمين / في الوسط، يوجد ..." },
      { de: "In the top / bottom corner of the picture, ...", en: "In the top / bottom corner of the picture, ...", ar: "في الزاوية العلوية / السفلية من الصورة، ..." },
      { de: "The scene takes place in ...", en: "The scene takes place in ...", ar: "يدور المشهد في ..." },
      { de: "In the distance, I can make out ...", en: "In the distance, I can make out ...", ar: "في المسافة، أستطيع تمييز ..." },
      { de: "At the top / bottom of the image, ...", en: "At the top / bottom of the image, ...", ar: "في أعلى / أسفل الصورة، ..." },
      { de: "The setting appears to be ...", en: "The setting appears to be ...", ar: "يبدو المكان ..." },
      { de: "There is a ... in the middle of the picture.", en: "There is a ... in the middle of the picture.", ar: "هناك ... في منتصف الصورة." },
    ],
  },
  {
    id: "appearance",
    title: "Appearance & Details",
    titleAr: "المظهر والتفاصيل",
    icon: "👤",
    explanation: "Describe the people and objects: age, clothing, appearance, colours, size, and notable features.",
    explanationAr: "صِف الأشخاص والأشياء: العمر، الملابس، المظهر، الألوان، الحجم، والملامح البارزة.",
    phrases: [
      { de: "There are ... people in the picture.", en: "There are ... people in the picture.", ar: "هناك ... أشخاص في الصورة." },
      { de: "The person on the left / right is wearing ...", en: "The person on the left / right is wearing ...", ar: "الشخص على اليسار / اليمين يرتدي ..." },
      { de: "He / She looks ... (young / old / happy / worried).", en: "He / She looks ... (young / old / happy / worried).", ar: "هو / هي يبدو ... (شاباً / عجوزاً / سعيداً / قلقاً)." },
      { de: "The man / woman appears to be in his / her ...", en: "The man / woman appears to be in his / her ...", ar: "يبدو الرجل / المرأة في ... من عمره/ها." },
      { de: "He / She has ... (short hair / a beard / glasses).", en: "He / She has ... (short hair / a beard / glasses).", ar: "لديه/لديها ... (شعر قصير / لحية / نظارة)." },
      { de: "The colours in the picture are ... (bright / dull / warm / cold).", en: "The colours in the picture are ... (bright / dull / warm / cold).", ar: "الألوان في الصورة ... (زاهية / باهتة / دافئة / باردة)." },
      { de: "The objects I can identify include ...", en: "The objects I can identify include ...", ar: "الأشياء التي يمكنني تحديدها تشمل ..." },
      { de: "What catches my eye is ...", en: "What catches my eye is ...", ar: "ما يلفت انتباهي هو ..." },
    ],
  },
  {
    id: "actions",
    title: "Actions & Activities",
    titleAr: "الأفعال والأنشطة",
    icon: "🏃",
    explanation: "Describe what is happening. Use present continuous tense. Speculate about what might be happening.",
    explanationAr: "صِف ما يحدث. استخدم المضارع المستمر. خمّن ما قد يحدث.",
    phrases: [
      { de: "The people are ... (talking / working / walking / eating).", en: "The people are ... (talking / working / walking / eating).", ar: "الناس ... (يتحدثون / يعملون / يمشون / يأكلون)." },
      { de: "A man / woman is ...-ing ...", en: "A man / woman is ...-ing ...", ar: "رجل / امرأة ... (يفعل/تفعل) ..." },
      { de: "They seem to be ...-ing ...", en: "They seem to be ...-ing ...", ar: "يبدو أنهم ... (يفعلون) ..." },
      { de: "Some people are ... while others are ...", en: "Some people are ... while others are ...", ar: "بعض الناس ... بينما الآخرون ..." },
      { de: "The children are playing / running / laughing.", en: "The children are playing / running / laughing.", ar: "الأطفال يلعبون / يركضون / يضحكون." },
      { de: "They are interacting with each other.", en: "They are interacting with each other.", ar: "هم يتفاعلون مع بعضهم البعض." },
      { de: "It looks like they are in the middle of ...", en: "It looks like they are in the middle of ...", ar: "يبدو أنهم في خضم ..." },
    ],
  },
  {
    id: "speculation",
    title: "Speculation & Interpretation",
    titleAr: "التخمين والتفسير",
    icon: "💡",
    explanation: "Speculate about context, make deductions, and interpret the meaning of the image.",
    explanationAr: "خمّن السياق، استنتج، وفسّر معنى الصورة.",
    phrases: [
      { de: "I think / believe / assume that ...", en: "I think / believe / assume that ...", ar: "أعتقد / أظن / أفترض أن ..." },
      { de: "It might / could / may be that ...", en: "It might / could / may be that ...", ar: "قد يكون أن ..." },
      { de: "Perhaps / Maybe / Possibly the photographer wants to show ...", en: "Perhaps / Maybe / Possibly the photographer wants to show ...", ar: "ربما / من المحتمل أن المصور يريد إظهار ..." },
      { de: "The picture could have been taken in ...", en: "The picture could have been taken in ...", ar: "ربما تم التقاط الصورة في ..." },
      { de: "It seems as if ...", en: "It seems as if ...", ar: "يبدو كما لو أن ..." },
      { de: "This image suggests that ...", en: "This image suggests that ...", ar: "توحي هذه الصورة بأن ..." },
      { de: "My interpretation is that ...", en: "My interpretation is that ...", ar: "تفسيري هو أن ..." },
      { de: "The atmosphere suggests that ...", en: "The atmosphere suggests that ...", ar: "الأجواء توحي بأن ..." },
      { de: "It is likely that the people are ... because ...", en: "It is likely that the people are ... because ...", ar: "من المحتمل أن الناس ... لأن ..." },
    ],
  },
  {
    id: "conclusion",
    title: "Conclusion & Personal Reaction",
    titleAr: "الخاتمة ورد الفعل الشخصي",
    icon: "🎯",
    explanation: "Give your overall impression, how the picture makes you feel, and connect it to your own experience.",
    explanationAr: "قدّم انطباعك العام، كيف تجعلك الصورة تشعر، واربطها بتجربتك الشخصية.",
    phrases: [
      { de: "Overall, this picture gives me a sense of ...", en: "Overall, this picture gives me a sense of ...", ar: "بشكل عام، هذه الصورة تعطيني إحساساً بـ ..." },
      { de: "The mood of the picture is ... (peaceful / joyful / tense).", en: "The mood of the picture is ... (peaceful / joyful / tense).", ar: "مزاج الصورة ... (سلمي / مبهج / متوتر)." },
      { de: "What I find interesting about this image is ...", en: "What I find interesting about this image is ...", ar: "ما أجده مثيراً للاهتمام في هذه الصورة هو ..." },
      { de: "This picture reminds me of ...", en: "This picture reminds me of ...", ar: "تذكرني هذه الصورة بـ ..." },
      { de: "In conclusion, the image represents / symbolises ...", en: "In conclusion, the image represents / symbolises ...", ar: "في الختام، الصورة تمثل / ترمز إلى ..." },
      { de: "Personally, I find this picture ... (moving / striking / thought-provoking).", en: "Personally, I find this picture ... (moving / striking / thought-provoking).", ar: "شخصياً، أجد هذه الصورة ... (مؤثرة / لافتة / محفزة للفكر)." },
      { de: "The photographer seems to be making a point about ...", en: "The photographer seems to be making a point about ...", ar: "يبدو أن المصور يطرح قضية حول ..." },
    ],
  },
];

export const PICTURE_EXAMPLE: PictureExample = {
  title: "A busy street market",
  titleAr: "سوق شارع مزدحم",
  description: `This photograph shows a busy street market in what appears to be an old town. In the foreground, there are several stalls selling fresh fruit and vegetables. A vendor wearing a blue apron is serving a customer who is examining the produce carefully. On the left, more customers are waiting while chatting with each other.

In the background, I can see old buildings and a church tower. The setting appears to be a historic city centre, possibly in Europe. The weather is sunny and the colours are warm and inviting — lots of reds, greens, and oranges from the fruit.

The atmosphere seems lively and cheerful. The people look relaxed and friendly. I get the impression that this is a regular morning scene where locals do their daily shopping.

I think this picture captures the essence of traditional street markets. It shows community life and the importance of fresh, local food. Personally, this image appeals to me because I enjoy shopping at markets and experiencing the vibrant atmosphere.`,
  descriptionAr: `تظهر هذه الصورة الفوتوغرافية سوق شارع مزدحماً فيما يبدو أنها مدينة قديمة. في المقدمة، هناك عدة أكشاك تبيع الفواكه والخضروات الطازجة. بائع يرتدي مئزراً أزرق يخدم زبونة تفحص المنتجات بعناية. على اليسار، زبائن آخرون ينتظرون ويتحدثون مع بعضهم البعض.

في الخلفية، أستطيع رؤية مبانٍ قديمة وبرج كنيسة. يبدو المكان كمركز مدينة تاريخي، ربما في أوروبا. الطقس مشمس والألوان دافئة وجذابة — الكثير من الأحمر والأخضر والبرتقالي من الفاكهة.

الأجواء تبدو حيوية ومبهجة. الناس يبدون مسترخين وودودين. لدي انطباع بأن هذا مشهد صباحي معتاد حيث يقوم السكان المحليون بتسوقهم اليومي.

أعتقد أن هذه الصورة تلتقط جوهر الأسواق التقليدية في الشارع. إنها تظهر الحياة المجتمعية وأهمية الطعام الطازج المحلي. شخصياً، تروقني هذه الصورة لأنني أستمتع بالتسوق في الأسواق وتجربة الأجواء النابضة بالحياة.`,
};

export const PICTURE_VOCABULARY: { de: string; en: string; ar?: string }[] = [
  { de: "photograph / photo / picture", en: "photograph / photo / picture", ar: "صورة فوتوغرافية / صورة" },
  { de: "illustration / image", en: "illustration / image", ar: "رسم توضيحي / صورة" },
  { de: "foreground", en: "foreground", ar: "المقدمة" },
  { de: "background", en: "background", ar: "الخلفية" },
  { de: "in the distance", en: "in the distance", ar: "في المسافة" },
  { de: "in the centre / middle", en: "in the centre / middle", ar: "في الوسط / المنتصف" },
  { de: "on the left / right", en: "on the left / right", ar: "على اليسار / اليمين" },
  { de: "at the top / bottom", en: "at the top / bottom", ar: "في الأعلى / الأسفل" },
  { de: "in the corner", en: "in the corner", ar: "في الزاوية" },
  { de: "close-up", en: "close-up", ar: "لقطة مقربة" },
  { de: "wide shot / long shot", en: "wide shot / long shot", ar: "لقطة واسعة" },
  { de: "black and white photo", en: "black and white photo", ar: "صورة أبيض وأسود" },
  { de: "colour photo", en: "colour photo", ar: "صورة ملونة" },
  { de: "lighting", en: "lighting", ar: "الإضاءة" },
  { de: "shadow", en: "shadow", ar: "ظل" },
  { de: "contrast", en: "contrast", ar: "تباين" },
  { de: "facial expression", en: "facial expression", ar: "تعبير الوجه" },
  { de: "body language", en: "body language", ar: "لغة الجسد" },
  { de: "pose / posture", en: "pose / posture", ar: "وضعية" },
  { de: "atmosphere / mood", en: "atmosphere / mood", ar: "الأجواء / المزاج" },
  { de: "it seems / appears", en: "it seems / appears", ar: "يبدو" },
  { de: "it looks like", en: "it looks like", ar: "يشبه / يبدو أن" },
  { de: "perhaps / maybe / possibly", en: "perhaps / maybe / possibly", ar: "ربما / من المحتمل" },
  { de: "it could be that", en: "it could be that", ar: "قد يكون أن" },
  { de: "what catches the eye", en: "what catches the eye", ar: "ما يلفت الانتباه" },
  { de: "striking / noticeable", en: "striking / noticeable", ar: "لافت للنظر" },
  { de: "to depict / to show", en: "to depict / to show", ar: "يصور / يظهر" },
  { de: "to capture a moment", en: "to capture a moment", ar: "يلتقط لحظة" },
  { de: "to convey a feeling", en: "to convey a feeling", ar: "ينقل شعوراً" },
];

// Keep old export names for backward compatibility
export const BILD_SECTIONS = PICTURE_SECTIONS;
export const BILD_EXAMPLE = PICTURE_EXAMPLE;
export const BILD_VOCABULARY = PICTURE_VOCABULARY;
