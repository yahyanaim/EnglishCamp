import type { ReadingArticle } from "../reading-articles";

type WikipediaSource = { title: string; revision: number };
export type VocabularyReadingArticle = ReadingArticle & { source?: WikipediaSource };

// Adapted for EnglishCamp from pinned revisions retrieved through the Simple English
// Wikipedia Action API. The adapted English passages and their translations are CC BY-SA 4.0.
export const WIKIPEDIA_ARTICLES: VocabularyReadingArticle[] = [
  {
    id: "wiki-bicycle",
    title: "How a bicycle moves",
    level: "band4-5",
    category: "Society",
    source: { title: "Bicycle", revision: 11049825 },
    paragraphs: [{
      en: "A bicycle has two wheels, a seat and pedals. You sit on the seat and move the pedals with your feet. A chain carries that movement to the back wheel. The frame holds the pieces of the bicycle together. People ride bicycles to get from one place to another, to exercise or just for fun.",
      ar: "للدراجة عجلتان ومقعد ودواسات. تجلس على المقعد وتحرّك الدواسات بقدميك. وتنقل سلسلة هذه الحركة إلى العجلة الخلفية. ويثبّت الهيكل أجزاء الدراجة معًا. يركب الناس الدراجات للتنقّل أو لممارسة الرياضة أو لمجرد الاستمتاع.",
    }],
    vocabulary: [
      { word: "pedals", ar: "دواسات الدراجة التي تضغط عليها بقدميك لتحريكها.", def: "The parts you push with your feet to move a bicycle." },
      { word: "chain", ar: "السلسلة التي تنقل الحركة من الدواسات إلى العجلة الخلفية.", def: "A set of joined metal links that carries movement." },
      { word: "frame", ar: "هيكل الدراجة الذي يحمل أجزاءها ويثبّتها.", def: "The main structure that holds the parts together." },
    ],
  },
  {
    id: "wiki-public-library",
    title: "A visit to the public library",
    level: "band4-5",
    category: "Education",
    source: { title: "Public library", revision: 9200070 },
    paragraphs: [{
      en: "At a public library, anyone can borrow a book for free. You can also stay and study there. Librarians look after the books and help run services such as reading clubs. Some books must stay in the building so everyone can look at them. Many libraries also give people a place to use a computer.",
      ar: "في المكتبة العامة، يمكن لأي شخص استعارة كتاب مجانًا. ويمكنك أيضًا البقاء فيها للدراسة. يعتني أمناء المكتبة بالكتب ويساعدون في إدارة خدمات مثل نوادي القراءة. يجب أن تبقى بعض الكتب داخل المبنى ليتمكن الجميع من الاطلاع عليها. وتوفر مكتبات كثيرة أيضًا مكانًا لاستخدام الحاسوب.",
    }],
    vocabulary: [
      { word: "borrow", ar: "يستعير شيئًا ليستعمله مدةً محدودة ثم يعيده.", def: "To take something for a short time and then return it." },
      { word: "librarians", ar: "أمناء المكتبة الذين ينظّمون الكتب ويساعدون الزوّار.", def: "People who work in and look after a library." },
      { word: "services", ar: "الخدمات التي تقدّمها المكتبة للناس، مثل نوادي القراءة.", def: "Things an organisation provides to help people." },
    ],
  },
  {
    id: "wiki-recycling",
    title: "Recycling and reusing",
    level: "band5-6",
    category: "Environment",
    source: { title: "Recycling", revision: 10350072 },
    paragraphs: [{
      en: "Recycling turns waste into material that can be used again. Glass, paper and certain metals can all be processed in this way. Reusing is different: an old coat can be passed to someone else without being made into a new product. Recycling can reduce the demand for new materials and keep some rubbish out of landfills. Reducing waste in the first place also matters.",
      ar: "تحوّل إعادة التدوير النفايات إلى مواد يمكن استخدامها مرة أخرى. ويمكن معالجة الزجاج والورق وبعض المعادن بهذه الطريقة. أما إعادة الاستخدام فهي مختلفة: يمكن إعطاء معطف قديم لشخص آخر دون تحويله إلى منتج جديد. ويمكن لإعادة التدوير أن تقلل الطلب على المواد الجديدة وتمنع وصول جزء من النفايات إلى المكبات. ومن المهم أيضًا تقليل النفايات من البداية.",
    }],
    vocabulary: [
      { word: "waste", ar: "نفايات أو أشياء يتخلّص الناس منها بعد الاستعمال.", def: "Material that people throw away." },
      { word: "processed", ar: "عولجت المواد أو تغيّرت لتصبح صالحة لاستخدام جديد.", def: "Treated in a particular way to make something usable." },
      { word: "landfills", ar: "مكبات تُدفن فيها النفايات في الأرض.", def: "Sites where rubbish is buried." },
    ],
  },
  {
    id: "wiki-solar-energy",
    title: "What sunlight can power",
    level: "band5-6",
    category: "Science",
    source: { title: "Solar energy", revision: 11022876 },
    paragraphs: [{
      en: "People have long used energy from the sun to dry food, cook and heat buildings. Today, sunlight can also be used to generate electricity. This is especially useful in remote places that are difficult to connect to other sources of power. Solar energy is renewable because using sunlight does not use it up in the way that burning coal uses up a fuel.",
      ar: "استخدم الناس طاقة الشمس منذ زمن طويل لتجفيف الطعام والطهو وتدفئة المباني. واليوم يمكن استخدام ضوء الشمس أيضًا لتوليد الكهرباء. وهذا مفيد خصوصًا في الأماكن النائية التي يصعب ربطها بمصادر طاقة أخرى. وتُعد الطاقة الشمسية متجددة لأن استخدام ضوء الشمس لا يستنفده كما يستنفد حرق الفحم الوقود.",
    }],
    vocabulary: [
      { word: "generate", ar: "يولّد أو ينتج، والمقصود هنا إنتاج الكهرباء.", def: "To produce something such as electricity." },
      { word: "remote", ar: "نائي أو بعيد عن الأماكن التي يعيش فيها معظم الناس.", def: "Far away from towns or other populated places." },
      { word: "renewable", ar: "متجدّد، أي يأتي من مصدر يتجدد طبيعيًا.", def: "Able to be replaced naturally as it is used." },
    ],
  },
  {
    id: "wiki-urban-heat",
    title: "Why cities stay warmer at night",
    level: "band6-7",
    category: "Environment",
    source: { title: "Urban heat island", revision: 11010078 },
    paragraphs: [{
      en: "An urban heat island forms when a built-up area stays warmer than the surrounding countryside. Concrete and asphalt absorb energy during the day and release heat after the sun sets. In greener places, some of that energy is used to evaporate water from plants and soil, which helps cool the air. The contrast can be particularly noticeable on calm nights. Traffic and machinery can add heat of their own.",
      ar: "تتكوّن الجزيرة الحرارية الحضرية عندما تبقى منطقة مبنية أدفأ من الريف المحيط بها. تمتص الخرسانة والأسفلت الطاقة نهارًا وتطلق الحرارة بعد غروب الشمس. وفي المناطق الأكثر خضرة تُستخدم بعض تلك الطاقة في تبخير الماء من النباتات والتربة، مما يساعد على تبريد الهواء. وقد يكون الفرق ملحوظًا خصوصًا في الليالي الهادئة. ويمكن للمركبات والآلات أن تضيف حرارة بدورها.",
    }],
    vocabulary: [
      { word: "absorb", ar: "يمتصّ، أي يستقبل الطاقة ويحتفظ بها داخل المادة.", def: "To take in something such as energy or liquid." },
      { word: "evaporate", ar: "يُبخّر الماء، أي يحوّله من سائل إلى بخار.", def: "To cause a liquid to change into a gas." },
      { word: "contrast", ar: "التباين أو الفرق الواضح بين حالتين.", def: "A noticeable difference between two things." },
    ],
  },
  {
    id: "wiki-artificial-intelligence",
    title: "How AI uses data",
    level: "band6-7",
    category: "Technology",
    source: { title: "Artificial intelligence", revision: 11075780 },
    paragraphs: [{
      en: "Artificial intelligence describes computer systems that can carry out tasks associated with human thinking. Some systems use examples to learn how to complete a specific task. They may recognise speech or identify what appears in an image. Adaptation means using what the system has learned to respond to new data. The term covers several methods, including systems built with neural networks.",
      ar: "يصف الذكاء الاصطناعي أنظمة حاسوبية يمكنها إنجاز مهام مرتبطة بالتفكير البشري. تستخدم بعض الأنظمة أمثلة لتتعلم كيفية إنجاز مهمة محددة. وقد تتعرّف على الكلام أو تحدّد ما يظهر في صورة. ويعني التكيّف استخدام ما تعلّمه النظام للاستجابة لبيانات جديدة. ويشمل المصطلح عدة طرق، منها أنظمة مبنية باستخدام الشبكات العصبية.",
    }],
    vocabulary: [
      { word: "specific", ar: "محدّد، أي يتعلّق بمهمة معيّنة دون سواها.", def: "Clearly defined and focused on one thing." },
      { word: "recognise", ar: "يتعرّف على شيء أو يميّزه، مثل الكلام المسموع.", def: "To identify something by its features." },
      { word: "adaptation", ar: "التكيّف مع ظروف أو بيانات جديدة بالاعتماد على ما تعلّمه النظام.", def: "A change that helps a system respond to new conditions." },
    ],
  },
  {
    id: "wiki-circular-economy",
    title: "Keeping materials in use",
    level: "band7-8",
    category: "Economy",
    source: { title: "Circular economy", revision: 11047540 },
    paragraphs: [{
      en: "In a circular economy, extending the useful life of materials begins at the design stage. Manufacturers can design goods for repair, while businesses can share, lease or refurbish them. These approaches can lower demand for raw materials by keeping products in use. Recycling is one tool, but the wider goal includes preventing waste and helping natural systems regenerate. This contrasts with a linear model in which materials are extracted, used and discarded.",
      ar: "في الاقتصاد الدائري، تبدأ إطالة العمر النافع للمواد في مرحلة التصميم. يستطيع المصنّعون تصميم سلع قابلة للإصلاح، بينما تستطيع الشركات مشاركتها أو تأجيرها أو تجديدها. وقد تقلّل هذه الأساليب الطلب على المواد الخام بإبقاء المنتجات قيد الاستخدام. وإعادة التدوير إحدى الوسائل، لكن الهدف الأوسع يشمل منع النفايات ومساعدة الأنظمة الطبيعية على التجدد. ويختلف ذلك عن النموذج الخطي الذي تُستخرج فيه المواد وتُستخدم ثم يُتخلّص منها.",
    }],
    vocabulary: [
      { word: "refurbish", ar: "يجدّد منتجًا مستعملًا ويصلحه ليعود صالحًا للاستخدام.", def: "To restore a used product to good condition." },
      { word: "regenerate", ar: "يتجدّد أو يستعيد قدرته على النمو بعد التدهور.", def: "To grow again or recover after damage or loss." },
      { word: "discarded", ar: "متروك أو متخلّص منه بعد انتهاء الحاجة إليه.", def: "Thrown away because it is no longer wanted." },
    ],
  },
  {
    id: "wiki-desalination",
    title: "Removing salt from water",
    level: "band7-8",
    category: "Science",
    source: { title: "Desalination", revision: 11027736 },
    paragraphs: [{
      en: "Desalination removes dissolved salts from water so that the resulting fresh water can be used for purposes such as irrigation or drinking. In distillation, water is heated and the vapour is collected and cooled, leaving the salts behind. Reverse osmosis separates water from much of its dissolved salt using a membrane. One by-product of desalination is brine, which contains a higher concentration of salt than the water that entered the process.",
      ar: "تزيل التحلية الأملاح الذائبة من الماء حتى يمكن استخدام الماء العذب الناتج في أغراض مثل الري أو الشرب. في التقطير يُسخّن الماء ثم يُجمع البخار ويُبرّد، وتبقى الأملاح خلفه. ويفصل التناضح العكسي الماء عن قدر كبير من أملاحه الذائبة باستخدام غشاء. ومن النواتج الثانوية للتحلية المحلول الملحي المركّز، الذي يحوي تركيزًا من الملح أعلى من تركيزه في الماء الداخل إلى العملية.",
    }],
    vocabulary: [
      { word: "distillation", ar: "التقطير: فصل الماء عن الأملاح بتبخيره ثم تكثيف بخاره.", def: "Separation by heating a liquid and then cooling its vapour." },
      { word: "membrane", ar: "غشاء يسمح بمرور الماء ويمنع مرور معظم الأملاح الذائبة.", def: "A thin barrier that allows some substances to pass through." },
      { word: "brine", ar: "محلول ملحي مركّز ينتج عن إزالة الأملاح من الماء.", def: "Water containing a high concentration of dissolved salt." },
    ],
  },
];

export const WIKIPEDIA_LICENSE = "https://creativecommons.org/licenses/by-sa/4.0/";

export function wikipediaRevisionUrl(source: WikipediaSource) {
  const query = new URLSearchParams({ title: source.title.replaceAll(" ", "_"), oldid: String(source.revision) });
  return `https://simple.wikipedia.org/w/index.php?${query}`;
}
