export type PronunciationSound = {
  symbol: string;
  example: string;
  audioDescription: string;
  arabic: string;
};

export type PronunciationSection = {
  id: string;
  title: string;
  description: string;
  sounds: PronunciationSound[];
};

export const PRONUNCIATION_GUIDE: PronunciationSection[] = [
  {
    id: "alphabet",
    title: "The English Alphabet",
    description: "The English alphabet has 26 letters: 5 vowels (A, E, I, O, U) and 21 consonants. Each letter has a name and one or more sounds.",
    sounds: [
      { symbol: "A / eɪ", example: "apple, ape, father", audioDescription: "Letter name: /eɪ/. Short: /æ/ (cat). Long: /eɪ/ (day).", arabic: "A / إي — صوت قصير /æ/ (قطة) أو طويل /eɪ/ (يوم)" },
      { symbol: "B / biː", example: "baby, big, job", audioDescription: "Letter name: /biː/. Voiced bilabial plosive.", arabic: "B / بي — صوت شفوي مجهور" },
      { symbol: "C / siː", example: "cat, city, music", audioDescription: "Letter name: /siː/. /k/ before a, o, u; /s/ before e, i, y.", arabic: "C / سي — ينطق /k/ أو /s/" },
      { symbol: "D / diː", example: "dog, red, ladder", audioDescription: "Letter name: /diː/. Voiced alveolar plosive.", arabic: "D / دي — صوت لثوي مجهور" },
      { symbol: "E / iː", example: "egg, see, elephant", audioDescription: "Letter name: /iː/. Short: /e/ (bed). Long: /iː/ (see). Silent at end of words.", arabic: "E / إي — قصير /e/ أو طويل /iː/ أو صامت في نهاية الكلمة" },
      { symbol: "F / ef", example: "fish, coffee, leaf", audioDescription: "Letter name: /ef/. Voiceless labiodental fricative.", arabic: "F / إف — صوت شفوي-سنّي مهموس" },
      { symbol: "G / dʒiː", example: "go, page, giant", audioDescription: "Letter name: /dʒiː/. /g/ (go) or /dʒ/ (giant).", arabic: "G / جي — /g/ أو /dʒ/" },
      { symbol: "H / eɪtʃ", example: "house, hello, behind", audioDescription: "Letter name: /eɪtʃ/. Voiceless glottal fricative. Silent in 'hour', 'honest'.", arabic: "H / إيتش — صوت حلقي مهموس، صامت أحياناً" },
      { symbol: "I / aɪ", example: "it, time, happy", audioDescription: "Letter name: /aɪ/. Short: /ɪ/ (sit). Long: /aɪ/ (time).", arabic: "I / آي — قصير /ɪ/ أو طويل /aɪ/" },
      { symbol: "J / dʒeɪ", example: "jam, project, judge", audioDescription: "Letter name: /dʒeɪ/. Voiced palato-alveolar affricate.", arabic: "J / جاي — صوت غاري-لثوي مجهور" },
      { symbol: "K / keɪ", example: "kite, milk, week", audioDescription: "Letter name: /keɪ/. Voiceless velar plosive. Silent in 'knife', 'know'.", arabic: "K / كاي — صوت حلقي مهموس، صامت في 'kn'" },
      { symbol: "L / el", example: "love, hello, tall", audioDescription: "Letter name: /el/. Voiced alveolar lateral approximant.", arabic: "L / إل — صوت لثوي جانبي مجهور" },
      { symbol: "M / em", example: "man, summer, team", audioDescription: "Letter name: /em/. Voiced bilabial nasal.", arabic: "M / إم — صوت شفوي أنفي مجهور" },
      { symbol: "N / en", example: "night, dinner, ten", audioDescription: "Letter name: /en/. Voiced alveolar nasal.", arabic: "N / إن — صوت لثوي أنفي مجهور" },
      { symbol: "O / əʊ (UK) / oʊ (US)", example: "orange, go, hot", audioDescription: "Letter name: /əʊ/ or /oʊ/. Short: /ɒ/ (hot). Long: /əʊ/ (go).", arabic: "O / أو — قصير /ɒ/ أو طويل /əʊ/" },
      { symbol: "P / piː", example: "pen, apple, top", audioDescription: "Letter name: /piː/. Voiceless bilabial plosive.", arabic: "P / بي — صوت شفوي مهموس" },
      { symbol: "Q / kjuː", example: "quick, queen, unique", audioDescription: "Letter name: /kjuː/. Usually followed by 'u', pronounced /kw/.", arabic: "Q / كيو — يتبعه 'u' وينطق /kw/" },
      { symbol: "R / ɑː (UK) / ɑːr (US)", example: "red, very, car", audioDescription: "Letter name: /ɑː/ or /ɑːr/. Rhotic in US; non-rhotic in UK (no /r/ after vowels).", arabic: "R / آر — ينطق في الأمريكية، لا ينطق بعد حرف علة في البريطانية" },
      { symbol: "S / es", example: "sun, lesson, bus", audioDescription: "Letter name: /es/. Voiceless /s/ (sun) or voiced /z/ (is).", arabic: "S / إس — مهموس /s/ أو مجهور /z/" },
      { symbol: "T / tiː", example: "table, butter, hat", audioDescription: "Letter name: /tiː/. Voiceless alveolar plosive.", arabic: "T / تي — صوت لثوي مهموس" },
      { symbol: "U / juː", example: "up, use, blue", audioDescription: "Letter name: /juː/. Short: /ʌ/ (cup). Long: /uː/ (blue).", arabic: "U / يو — قصير /ʌ/ أو طويل /uː/" },
      { symbol: "V / viː", example: "very, heavy, live", audioDescription: "Letter name: /viː/. Voiced labiodental fricative.", arabic: "V / في — صوت شفوي-سنّي مجهور" },
      { symbol: "W / dʌbəl juː", example: "water, always, now", audioDescription: "Letter name: /dʌbəl juː/. /w/ — voiced bilabial approximant.", arabic: "W / دَبِل يو — صوت شفوي مقارب" },
      { symbol: "X / eks", example: "six, example, box", audioDescription: "Letter name: /eks/. /ks/ (box) or /gz/ (example).", arabic: "X / إكس — /ks/ أو /gz/" },
      { symbol: "Y / waɪ", example: "yes, happy, system", audioDescription: "Letter name: /waɪ/. Consonant /j/ (yes) or vowel /ɪ/ or /iː/ (happy, system).", arabic: "Y / واي — حرف ساكن /j/ أو حرف علة /ɪ/ أو /iː/" },
      { symbol: "Z / zed (UK) / ziː (US)", example: "zoo, pizza, size", audioDescription: "Letter name: /zed/ (UK) or /ziː/ (US). Voiced alveolar fricative.", arabic: "Z / زيد (بريطاني) أو زي (أمريكي) — صوت لثوي مجهور" },
    ],
  },
  {
    id: "vowels",
    title: "Vowel Sounds",
    description: "English has 12 pure vowel sounds and 8 diphthongs. The vowel system is much larger than in many other languages, making it challenging for learners.",
    sounds: [
      { symbol: "æ", example: "cat, hat, man, bag", audioDescription: "Short 'a' — mouth is open, tongue low and front. Between /a/ and /e/.", arabic: "æ — مثل 'cat'. الفم مفتوح، اللسان منخفض وأمامي." },
      { symbol: "ʌ", example: "cup, sun, love, money", audioDescription: "Short 'u' — relaxed, central vowel. Like a weak, short 'uh'.", arabic: "ʌ — مثل 'cup'. صوت قصير وسطي، يشبه 'أَ' الخفيفة." },
      { symbol: "ɑː", example: "car, far, father, heart", audioDescription: "Long 'a' — open back vowel. Mouth wide open, tongue low and back.", arabic: "ɑː — مثل 'car'. فتحة واسعة، لسان منخفض وخلفي." },
      { symbol: "ɒ", example: "hot, dog, clock, want", audioDescription: "Short 'o' — rounded back vowel. Lips slightly rounded.", arabic: "ɒ — مثل 'hot'. شفتان مدورتان قليلاً." },
      { symbol: "ɔː", example: "door, more, law, four", audioDescription: "Long 'or' — rounded back vowel. Lips rounded, tongue pulled back.", arabic: "ɔː — مثل 'door'. شفتان مدورتان، لسان منسحب للخلف." },
      { symbol: "ʊ", example: "book, put, good, woman", audioDescription: "Short 'oo' — relaxed, lips loosely rounded.", arabic: "ʊ — مثل 'book'. قصير، شفتان مدورتان بشكل مرتخٍ." },
      { symbol: "uː", example: "food, blue, school, true", audioDescription: "Long 'oo' — tight rounding, tongue high and back.", arabic: "uː — مثل 'food'. شفتان مدورتان بإحكام، لسان مرتفع وخلفي." },
      { symbol: "iː", example: "see, tree, need, leave", audioDescription: "Long 'ee' — lips spread, tongue high and front.", arabic: "iː — مثل 'see'. شفتان منفرجتان، لسان مرتفع وأمامي." },
      { symbol: "ɪ", example: "sit, hit, city, family", audioDescription: "Short 'i' — relaxed, tongue slightly lower than /iː/.", arabic: "ɪ — مثل 'sit'. قصير، لسان أقل ارتفاعاً من /iː/." },
      { symbol: "e", example: "bed, red, ten, head", audioDescription: "Short 'e' — mouth half-open, tongue front-mid.", arabic: "e — مثل 'bed'. فم نصف مفتوح، لسان أمامي-وسطي." },
      { symbol: "ə", example: "about, teacher, never, second", audioDescription: "Schwa — the most common vowel. Weak, central, unstressed.", arabic: "ə — الشوا. أكثر حرف علة شيوعاً. ضعيف، وسطي، غير منبور." },
      { symbol: "ɜː", example: "bird, her, turn, early", audioDescription: "Long 'er' — central vowel, lips slightly spread. Very common in English.", arabic: "ɜː — مثل 'bird'. حرف علة وسطي طويل، شفتان منفرجتان قليلاً." },
    ],
  },
  {
    id: "consonants",
    title: "Consonant Sounds",
    description: "English has 24 consonant sounds. Some of these (like /θ/, /ð/, /ʃ/, /ʒ/, /tʃ/, /dʒ/, /ŋ/) do not exist in Arabic and require special attention.",
    sounds: [
      { symbol: "θ", example: "think, bath, three, nothing", audioDescription: "Voiceless 'th' — tongue tip between teeth, blow air. No vibration.", arabic: "θ — مثل 'think'. طرف اللسان بين الأسنان، هواء فقط — لا اهتزاز." },
      { symbol: "ð", example: "the, this, mother, father", audioDescription: "Voiced 'th' — same position as /θ/ but with vocal cord vibration.", arabic: "ð — مثل 'the'. نفس وضع /θ/ ولكن مع اهتزاز الأحبال الصوتية." },
      { symbol: "ʃ", example: "she, fish, shop, nation", audioDescription: "'sh' sound — tongue near the roof, lips rounded, air flows over tongue.", arabic: "ʃ — مثل 'she'. لسان قرب سقف الفم، شفتان مدورتان، هواء يمر فوق اللسان." },
      { symbol: "ʒ", example: "measure, vision, pleasure, garage", audioDescription: "'zh' sound — same as /ʃ/ but voiced. Common in French loanwords.", arabic: "ʒ — مثل 'measure'. مثل /ʃ/ ولكن مجهور. شائع في الكلمات الفرنسية." },
      { symbol: "tʃ", example: "chair, watch, teach, question", audioDescription: "'ch' sound — starts as /t/ and releases as /ʃ/.", arabic: "tʃ — مثل 'chair'. يبدأ كـ /t/ وينتهي كـ /ʃ/." },
      { symbol: "dʒ", example: "jam, page, age, judge, bridge", audioDescription: "'j' sound — voiced version of /tʃ/. Starts as /d/ and releases as /ʒ/.", arabic: "dʒ — مثل 'jam'. النسخة المجهورة من /tʃ/." },
      { symbol: "ŋ", example: "sing, long, English, morning", audioDescription: "'ng' sound — back of tongue touches soft palate, air passes through nose.", arabic: "ŋ — مثل 'sing'. مؤخرة اللسان تلمس الحنك الرخو، هواء يمر عبر الأنف." },
      { symbol: "w", example: "water, window, always, require", audioDescription: "'w' sound — lips tightly rounded, then release. Like /u/ but as a consonant.", arabic: "w — مثل 'water'. شفتان مدورتان بإحكام ثم تفتحان." },
      { symbol: "j", example: "yes, you, yellow, new, view", audioDescription: "'y' sound — tongue high and front, like /iː/ but as a consonant.", arabic: "j — مثل 'yes'. لسان مرتفع وأمامي، مثل /iː/ ولكن كحرف ساكن." },
      { symbol: "h", example: "house, hello, behind, perhaps", audioDescription: "'h' sound — voiceless glottal fricative. Air passes through the throat.", arabic: "h — مثل 'house'. صوت حلقي مهموس، هواء يمر عبر الحلق." },
      { symbol: "r", example: "red, very, grass, write, car", audioDescription: "'r' sound — tongue curled back slightly, not rolled. In UK, not pronounced after vowels.", arabic: "r — مثل 'red'. لسان ملتو للخلف قليلاً، غير مرقّق." },
      { symbol: "l", example: "light, hello, tall, bottle", audioDescription: "'l' sound — tongue tip touches the ridge behind upper teeth. Two types: light /l/ and dark /l/.", arabic: "l — مثل 'light'. طرف اللسان يلمس اللثة فوق الأسنان العلوية." },
    ],
  },
  {
    id: "minimal-pairs",
    title: "Minimal Pairs",
    description: "Minimal pairs are words that differ by only one sound. Practising them helps you hear and produce sounds that may not exist in your native language.",
    sounds: [
      { symbol: "ship vs sheep", example: "ship (ɪ) — sheep (iː)", audioDescription: "Ship has short /ɪ/; sheep has long /iː/. Many learners pronounce them the same.", arabic: "ship (ɪ) مقابل sheep (iː) — الفرق بين /ɪ/ القصيرة و /iː/ الطويلة." },
      { symbol: "live vs leave", example: "live (ɪ) — leave (iː)", audioDescription: "Live (as in 'I live here') has /ɪ/; leave has /iː/.", arabic: "live (ɪ) مقابل leave (iː) — نفس الفرق بين /ɪ/ و /iː/." },
      { symbol: "bit vs beat", example: "bit (ɪ) — beat (iː)", audioDescription: "Bit uses short /ɪ/; beat uses long /iː/.", arabic: "bit (ɪ) مقابل beat (iː) — قصير /ɪ/ مقابل طويل /iː/." },
      { symbol: "full vs fool", example: "full (ʊ) — fool (uː)", audioDescription: "Full has short /ʊ/; fool has long /uː/.", arabic: "full (ʊ) مقابل fool (uː) — قصير /ʊ/ مقابل طويل /uː/." },
      { symbol: "pull vs pool", example: "pull (ʊ) — pool (uː)", audioDescription: "Same distinction — short /ʊ/ vs long /uː/.", arabic: "pull (ʊ) مقابل pool (uː) — نفس الفرق /ʊ/ مقابل /uː/." },
      { symbol: "cot vs caught", example: "cot (ɒ) — caught (ɔː)", audioDescription: "Cot has short /ɒ/; caught has long /ɔː/.", arabic: "cot (ɒ) مقابل caught (ɔː) — قصير /ɒ/ مقابل طويل /ɔː/." },
      { symbol: "not vs nought", example: "not (ɒ) — nought (ɔː)", audioDescription: "Not uses /ɒ/; nought uses /ɔː/.", arabic: "not (ɒ) مقابل nought (ɔː) — نفس الفرق بين /ɒ/ و /ɔː/." },
      { symbol: "cat vs cut", example: "cat (æ) — cut (ʌ)", audioDescription: "Cat has /æ/ (mouth more open); cut has /ʌ/ (more relaxed, central).", arabic: "cat (æ) مقابل cut (ʌ) — /æ/ بفم أكثر فتحاً، /ʌ/ أكثر استرخاء." },
      { symbol: "hat vs hut", example: "hat (æ) — hut (ʌ)", audioDescription: "Hat uses /æ/; hut uses /ʌ/.", arabic: "hat (æ) مقابل hut (ʌ) — نفس الفرق." },
      { symbol: "think vs sink", example: "think (θ) — sink (s)", audioDescription: "Think uses voiceless /θ/ (tongue between teeth); sink uses /s/ (tongue behind teeth).", arabic: "think (θ) مقابل sink (s) — /θ/ اللسان بين الأسنان، /s/ اللسان خلف الأسنان." },
      { symbol: "then vs zen", example: "then (ð) — zen (z)", audioDescription: "Then uses voiced /ð/; zen uses /z/.", arabic: "then (ð) مقابل zen (z) — /ð/ مجهور، /z/ لثوي مجهور." },
      { symbol: "ship vs chip", example: "ship (ʃ) — chip (tʃ)", audioDescription: "Ship uses /ʃ/ (continuous); chip uses /tʃ/ (starts with a /t/ stop).", arabic: "ship (ʃ) مقابل chip (tʃ) — /ʃ/ مستمر، /tʃ/ يبدأ بتوقف /t/." },
    ],
  },
  {
    id: "arabic-mistakes",
    title: "Common Pronunciation Mistakes for Arabic Speakers",
    description: "Arabic speakers face specific challenges due to differences between the Arabic and English sound systems. Here are the most common errors and how to fix them.",
    sounds: [
      { symbol: "/p/ vs /b/", example: "pit vs bit, park vs bark", audioDescription: "Arabic lacks /p/. Practise the puff of air (aspiration) in /p/. Hold a paper in front of your mouth — it should move for /p/ but not for /b/.", arabic: "/p/ مقابل /b/ — العربية تفتقر /p/. تمرّن على دفعة الهواء في /p/. ضع ورقة أمام فمك — ستتحرك مع /p/ ولا تتحرك مع /b/." },
      { symbol: "/v/ vs /f/", example: "very vs ferry, vine vs fine", audioDescription: "Arabic has /f/ but not /v/. For /v/, vibrate your vocal cords and place upper teeth on lower lip. /f/ uses only air.", arabic: "/v/ مقابل /f/ — العربية بها /f/ وليس /v/. لـ /v/، اهتز الأحبال الصوتية وضع الأسنان العلوية على الشفة السفلى." },
      { symbol: "/θ/ and /ð/", example: "think, thank / the, there", audioDescription: "Arabic does have these sounds (ث and ذ), but many speakers replace them with /t/, /s/ or /d/, /z/. Put your tongue between your teeth and blow.", arabic: "/θ/ و /ð/ — العربية بها هذان الصوتان (ث و ذ)، لكن كثيرين يستبدلونها بـ /t/, /s/ أو /d/, /z/. ضع لسانك بين أسنانك وانفخ." },
      { symbol: "/tʃ/", example: "chair, cheese, watch", audioDescription: "This sound ('ch') does not exist in Arabic. Start with /t/ and immediately move to /ʃ/. Practise: t + sh = ch.", arabic: "/tʃ/ ('ch') — غير موجود في العربية. ابدأ بـ /t/ وانتقل فوراً إلى /ʃ/. تمرّن: t + sh = ch." },
      { symbol: "/dʒ/", example: "jam, judge, page", audioDescription: "This sound ('j') exists in some Arabic dialects (ج). In others, it's pronounced /ɡ/, which is incorrect for English 'j'.", arabic: "/dʒ/ (ج) — موجود في بعض اللهجات العربية. في البعض الآخر ينطق /ɡ/ وهذا خطأ في الإنجليزية." },
      { symbol: "/ŋ/", example: "sing, long, running", audioDescription: "The 'ng' sound /ŋ/ does not exist in Arabic. Practise by saying 'n' but with the back of the tongue touching the soft palate. Compare: sin vs sing.", arabic: "/ŋ/ — غير موجود في العربية. تمرّن بقول 'n' مع مؤخرة اللسان تلمس الحنك الرخو. قارن: sin مقابل sing." },
      { symbol: "Long vs short vowels", example: "ship vs sheep, full vs fool", audioDescription: "Arabic distinguishes long and short vowels, but the English vowel pairs are different sounds, not just different lengths. Focus on the quality, not just length.", arabic: "حروف العلة الطويلة مقابل القصيرة — العربية تفرق بالطول، لكن أزواج الإنجليزية تختلف في الجودة وليس فقط الطول." },
      { symbol: "Silent letters", example: "know, write, half, could, listen", audioDescription: "Many English words have silent letters. Learn common patterns: k before n, w before r, l in 'half/could/should', t in 'listen/hasten'.", arabic: "الحروف الصامتة — العديد من الكلمات الإنجليزية بها حروف صامتة. تعلم الأنماط الشائعة." },
      { symbol: "-ed endings", example: "played (/d/), walked (/t/), wanted (/ɪd/)", audioDescription: "Past tense -ed has three pronunciations: /d/ after voiced sounds, /t/ after voiceless, /ɪd/ after t and d. Practise the distinction.", arabic: "لاحقة -ed — ثلاثة نطقات: /d/ بعد صوت مجهور، /t/ بعد مهموس، /ɪd/ بعد t و d." },
      { symbol: "Word stress", example: "record (N) vs record (V)", audioDescription: "Stress changes meaning: 'REcord (noun) vs reCORD (verb). Arabic speakers often stress the wrong syllable. Mark stress when learning new words.", arabic: "النبر — يغير المعنى. المتحدثون بالعربية غالباً ينبرون المقطع الخطأ. ضع علامة النبر عند تعلم كلمات جديدة." },
    ],
  },
  {
    id: "word-stress",
    title: "Word Stress Rules",
    description: "Word stress is crucial in English. Stressing the wrong syllable can make words difficult to understand. Here are the main rules.",
    sounds: [
      { symbol: "Two-syllable nouns", example: "TAble, PREsent, RECord, DOCtor", audioDescription: "Most two-syllable nouns are stressed on the first syllable.", arabic: "الأسماء ذات المقطعين — معظمها ينبر على المقطع الأول." },
      { symbol: "Two-syllable verbs", example: "preSENT, reCORD, deCIDE, beGIN", audioDescription: "Most two-syllable verbs are stressed on the second syllable.", arabic: "الأفعال ذات المقطعين — معظمها ينبر على المقطع الثاني." },
      { symbol: "Words ending in -tion/-sion", example: "eduCAtion, inforMAtion, teleVIsion", audioDescription: "Stress falls on the syllable before -tion/-sion (the penultimate syllable).", arabic: "الكلمات المنتهية بـ -tion/-sion — النبر على المقطع قبل الأخير." },
      { symbol: "Words ending in -ic/-ical", example: "acaDEMic, geoGRAPHic, hisTORical", audioDescription: "Stress falls on the syllable before -ic/-ical.", arabic: "الكلمات المنتهية بـ -ic/-ical — النبر على المقطع قبل الأخير." },
      { symbol: "Words ending in -ity/-ety", example: "uniVERsity, soCIety, aCAdemy", audioDescription: "Stress falls three syllables from the end (the antepenultimate syllable).", arabic: "الكلمات المنتهية بـ -ity/-ety — النبر على المقطع الثالث من النهاية." },
      { symbol: "Compound nouns", example: "GREENhouse, BEDroom, FOOTball", audioDescription: "Compound nouns are usually stressed on the first word.", arabic: "الأسماء المركبة — عادةً تنبر على الكلمة الأولى." },
      { symbol: "Compound adjectives", example: "old-FASHioned, bad-TEMpered", audioDescription: "Compound adjectives are usually stressed on the second word.", arabic: "الصفات المركبة — عادةً تنبر على الكلمة الثانية." },
      { symbol: "Phrasal verbs", example: "come IN, GO out, PICK up", audioDescription: "In phrasal verbs, the particle (preposition/adverb) receives the stress.", arabic: "الأفعال المركبة — الجسيم (حرف الجر / الظرف) ينبر." },
      { symbol: "Noun vs verb pairs", example: "IMport (N) vs imPORT (V), CONduct (N) vs conDUCT (V)", audioDescription: "Many words change stress to show part of speech: first syllable for nouns, second for verbs.", arabic: "أزواج اسم/فعل — المقطع الأول للأسماء، الثاني للأفعال." },
    ],
  },
  {
    id: "sentence-stress",
    title: "Sentence Stress and Intonation",
    description: "English is a stress-timed language. Content words (nouns, verbs, adjectives) are stressed; function words (prepositions, articles, pronouns) are reduced. This creates the rhythm of English.",
    sounds: [
      { symbol: "Content words stressed", example: "'I WANTED to 'GO to the 'CINema.'", audioDescription: "Nouns, main verbs, adjectives, question words, and negatives carry the beat of the sentence. Function words like 'to', 'the', 'a' are weak and fast.", arabic: "كلمات المحتوى تنبر — الأسماء، الأفعال الرئيسية، الصفات، أدوات الاستفهام، النفي تحمل إيقاع الجملة." },
      { symbol: "Question intonation", example: "Yes/no: rising ↗. Wh-: falling ↘.", audioDescription: "Yes/No questions rise at the end (Are you 'coming?↗). WH-questions fall (Where are you 'going?↘).", arabic: "نبر الأسئلة — أسئلة نعم/لا تصاعدية، أسئلة الاستفهام تنازلية." },
      { symbol: "List intonation", example: "'One ↗, 'two ↗, and 'three ↘.", audioDescription: "In lists, each item rises except the last, which falls.", arabic: "نبر القوائم — كل عنصر يرتفع ما عدا الأخير الذي ينخفض." },
      { symbol: "Choice questions", example: "Would you like 'tea ↗ or 'coffee?↘", audioDescription: "The first option rises, the second falls.", arabic: "أسئلة الاختيار — الخيار الأول يرتفع، الثاني ينخفض." },
      { symbol: "Emphatic stress", example: "I DIDN'T say he was 'late. I said he was 'early.", audioDescription: "Move stress to the word you want to emphasise. This can completely change the meaning.", arabic: "النبر التأكيدي — حرّك النبر للكلمة التي تريد تأكيدها. هذا يغير المعنى تماماً." },
      { symbol: "Tag questions", example: "You're coming, AREN'T you?↗ or You're coming, 'aren't you?↘", audioDescription: "If confident, tag falls ↗. If unsure, tag rises ↘.", arabic: "أسئلة الذيل — إذا واثق، ينخفض النبر. إذا غير متأكد، يرتفع." },
      { symbol: "Weak forms", example: "I can /kən/ do it. /ˈaɪ kən ˈduː ɪt/", audioDescription: "Function words are reduced: 'can' → /kən/, 'to' → /tə/, 'for' → /fə/, 'and' → /ən/ or /n/.", arabic: "الصيغ الضعيفة — كلمات الوظيفة تُختزل: can → /kən/, to → /tə/, for → /fə/." },
      { symbol: "Connected speech", example: "I want to → 'I wanna'. Going to → 'Gonna'. Let me → 'Lemme'.", audioDescription: "In fast speech, sounds link, disappear, or change. Recognising these patterns is key to understanding native speakers.", arabic: "الكلام المتصل — في الكلام السريع، الأصوات تتصل أو تختفي أو تتغير. التعرف على هذه الأنماط أساسي لفهم المتحدثين الأصليين." },
    ],
  },
];
