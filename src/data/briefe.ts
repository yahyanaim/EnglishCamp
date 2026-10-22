export type LetterPhrase = {
  de: string;
  en: string;
  ar?: string;
  art: "formal" | "informal" | "both";
  category: string;
};

export type LetterExample = {
  id: string;
  type: "formal" | "informal";
  subject: string;
  content: string;
  englishTranslation: string;
  arabicTranslation?: string;
};

export type LetterTip = {
  id: string;
  topic: string;
  topicAr?: string;
  tip: string;
  tipAr?: string;
  suggest: string;
  suggestAr?: string;
  icon: string;
};

export const LETTER_PHRASES: LetterPhrase[] = [
  // ── Salutations ──
  { de: "Dear Sir or Madam,", en: "Dear Sir or Madam,", ar: "سيداتي سادتي الأعزاء،", art: "formal", category: "Salutations" },
  { de: "Dear Mr. [Surname],", en: "Dear Mr. [Surname],", ar: "عزيزي السيد [الاسم]،", art: "formal", category: "Salutations" },
  { de: "Dear Ms. [Surname],", en: "Dear Ms. [Surname],", ar: "عزيزتي السيدة [الاسم]،", art: "formal", category: "Salutations" },
  { de: "To whom it may concern,", en: "To whom it may concern,", ar: "إلى من يهمه الأمر،", art: "formal", category: "Salutations" },
  { de: "Dear Hiring Manager,", en: "Dear Hiring Manager,", ar: "عزيزي مدير التوظيف،", art: "formal", category: "Salutations" },
  { de: "Hi [Name],", en: "Hi [Name],", ar: "مرحباً [الاسم]،", art: "informal", category: "Salutations" },
  { de: "Hey [Name],", en: "Hey [Name],", ar: "أهلاً [الاسم]،", art: "informal", category: "Salutations" },
  { de: "Dear [Name],", en: "Dear [Name],", ar: "عزيزي/عزيزتي [الاسم]،", art: "informal", category: "Salutations" },
  { de: "Hello [Name],", en: "Hello [Name],", ar: "مرحباً [الاسم]،", art: "both", category: "Salutations" },

  // ── Closings ──
  { de: "Yours faithfully,", en: "Yours faithfully,", ar: "مع خالص التحيات،", art: "formal", category: "Closings" },
  { de: "Yours sincerely,", en: "Yours sincerely,", ar: "مع خالص التحيات،", art: "formal", category: "Closings" },
  { de: "Best regards,", en: "Best regards,", ar: "مع أطيب التحيات،", art: "formal", category: "Closings" },
  { de: "Kind regards,", en: "Kind regards,", ar: "مع أطيب التحيات،", art: "formal", category: "Closings" },
  { de: "Sincerely,", en: "Sincerely,", ar: "مع خالص التحيات،", art: "formal", category: "Closings" },
  { de: "Warm regards,", en: "Warm regards,", ar: "مع أطيب التحيات،", art: "informal", category: "Closings" },
  { de: "Best wishes,", en: "Best wishes,", ar: "مع أطيب التمنيات،", art: "informal", category: "Closings" },
  { de: "Lots of love,", en: "Lots of love,", ar: "مع كل الحب،", art: "informal", category: "Closings" },
  { de: "Take care,", en: "Take care,", ar: "اعتن بنفسك،", art: "informal", category: "Closings" },
  { de: "Cheers,", en: "Cheers,", ar: "في أمان الله،", art: "informal", category: "Closings" },
  { de: "Talk soon,", en: "Talk soon,", ar: "نتحدث قريباً،", art: "informal", category: "Closings" },

  // ── Opening Lines ──
  { de: "I am writing to apply for the position of...", en: "I am writing to apply for the position of...", ar: "أكتب للتقدم لوظيفة...", art: "formal", category: "Opening Lines" },
  { de: "I am writing to express my interest in...", en: "I am writing to express my interest in...", ar: "أكتب لأعرب عن اهتمامي بـ...", art: "formal", category: "Opening Lines" },
  { de: "I am writing to complain about...", en: "I am writing to complain about...", ar: "أكتب لأشتكي من...", art: "formal", category: "Opening Lines" },
  { de: "Thank you for your email regarding...", en: "Thank you for your email regarding...", ar: "شكراً على بريدك الإلكتروني بخصوص...", art: "formal", category: "Opening Lines" },
  { de: "Further to our conversation, I am writing to...", en: "Further to our conversation, I am writing to...", ar: "استكمالاً لمحادثتنا، أكتب لـ...", art: "formal", category: "Opening Lines" },
  { de: "I hope this email finds you well.", en: "I hope this email finds you well.", ar: "أتمنى أن يجدك هذا البريد الإلكتروني بخير.", art: "both", category: "Opening Lines" },
  { de: "How are you? I hope everything is going well!", en: "How are you? I hope everything is going well!", ar: "كيف حالك؟ أتمنى أن كل شيء على ما يرام!", art: "informal", category: "Opening Lines" },
  { de: "It was great to hear from you!", en: "It was great to hear from you!", ar: "كان من الرائع أن أتلقى خبراً منك!", art: "informal", category: "Opening Lines" },
  { de: "Sorry it has been a while since I last wrote.", en: "Sorry it has been a while since I last wrote.", ar: "آسف لأنني لم أكتب منذ فترة.", art: "informal", category: "Opening Lines" },
  { de: "I thought I would drop you a line to...", en: "I thought I would drop you a line to...", ar: "فكرت أن أكتب لك سطوراً لـ...", art: "informal", category: "Opening Lines" },

  // ── Closing Lines ──
  { de: "I look forward to hearing from you at your earliest convenience.", en: "I look forward to hearing from you at your earliest convenience.", ar: "أتطلع إلى سماع ردك في أقرب وقت ممكن.", art: "formal", category: "Closing Lines" },
  { de: "Please do not hesitate to contact me if you have any questions.", en: "Please do not hesitate to contact me if you have any questions.", ar: "لا تتردد في الاتصال بي إذا كان لديك أي أسئلة.", art: "formal", category: "Closing Lines" },
  { de: "I would appreciate a prompt response.", en: "I would appreciate a prompt response.", ar: "سأكون ممتناً لرد سريع.", art: "formal", category: "Closing Lines" },
  { de: "Thank you for your time and consideration.", en: "Thank you for your time and consideration.", ar: "شكراً على وقتكم واهتمامكم.", art: "formal", category: "Closing Lines" },
  { de: "I look forward to your reply.", en: "I look forward to your reply.", ar: "أتطلع إلى ردك.", art: "informal", category: "Closing Lines" },
  { de: "Write back soon!", en: "Write back soon!", ar: "اكتب لي قريباً!", art: "informal", category: "Closing Lines" },
  { de: "Can not wait to see you!", en: "Can not wait to see you!", ar: "لا أطيق الانتظار لرؤيتك!", art: "informal", category: "Closing Lines" },
  { de: "Let me know what you think!", en: "Let me know what you think!", ar: "أخبرني برأيك!", art: "informal", category: "Closing Lines" },
  { de: "Thanks again for everything!", en: "Thanks again for everything!", ar: "شكراً مرة أخرى على كل شيء!", art: "informal", category: "Closing Lines" },

  // ── Making Requests ──
  { de: "I would be grateful if you could...", en: "I would be grateful if you could...", ar: "سأكون ممتناً إذا كان بإمكانك...", art: "formal", category: "Making Requests" },
  { de: "Could you please send me...", en: "Could you please send me...", ar: "هل يمكنك من فضلك إرسال...", art: "formal", category: "Making Requests" },
  { de: "I would appreciate it if you could...", en: "I would appreciate it if you could...", ar: "سأقدر ذلك إذا كان بإمكانك...", art: "formal", category: "Making Requests" },
  { de: "I was wondering if you could...", en: "I was wondering if you could...", ar: "كنت أتساءل إذا كان بإمكانك...", art: "both", category: "Making Requests" },
  { de: "Could you let me know...", en: "Could you let me know...", ar: "هل يمكنك إخباري...", art: "both", category: "Making Requests" },
  { de: "Would you mind...?", en: "Would you mind...?", ar: "هل تمانع...؟", art: "both", category: "Making Requests" },
  { de: "Can you do me a favour?", en: "Can you do me a favour?", ar: "هل يمكنك أن تسدي لي معروفاً؟", art: "informal", category: "Making Requests" },
  { de: "Do you think you could...?", en: "Do you think you could...?", ar: "هل تعتقد أنه يمكنك...؟", art: "informal", category: "Making Requests" },
  { de: "Could you possibly...?", en: "Could you possibly...?", ar: "هل يمكنك ربما...؟", art: "both", category: "Making Requests" },

  // ── Apologizing ──
  { de: "I sincerely apologise for...", en: "I sincerely apologise for...", ar: "أعتذر بصدق عن...", art: "formal", category: "Apologizing" },
  { de: "Please accept my apologies for...", en: "Please accept my apologies for...", ar: "الرجاء قبول اعتذاري عن...", art: "formal", category: "Apologizing" },
  { de: "I am very sorry for any inconvenience caused.", en: "I am very sorry for any inconvenience caused.", ar: "أنا آسف جداً على أي إزعاج سببه.", art: "formal", category: "Apologizing" },
  { de: "I regret to inform you that...", en: "I regret to inform you that...", ar: "يؤسفني إبلاغك بأن...", art: "formal", category: "Apologizing" },
  { de: "I owe you an apology.", en: "I owe you an apology.", ar: "أنا مدين لك باعتذار.", art: "informal", category: "Apologizing" },
  { de: "Sorry for the delay.", en: "Sorry for the delay.", ar: "آسف على التأخير.", art: "informal", category: "Apologizing" },
  { de: "My apologies — that was my mistake.", en: "My apologies — that was my mistake.", ar: "اعتذاري — كان ذلك خطأي.", art: "informal", category: "Apologizing" },
  { de: "I did not mean to...", en: "I did not mean to...", ar: "لم أقصد...", art: "informal", category: "Apologizing" },

  // ── Complaining ──
  { de: "I am writing to express my dissatisfaction with...", en: "I am writing to express my dissatisfaction with...", ar: "أكتب لأعرب عن عدم رضاي عن...", art: "formal", category: "Complaining" },
  { de: "I wish to complain about...", en: "I wish to complain about...", ar: "أرغب في تقديم شكوى بشأن...", art: "formal", category: "Complaining" },
  { de: "I was disappointed to find that...", en: "I was disappointed to find that...", ar: "لقد شعرت بخيبة أمل عندما وجدت أن...", art: "formal", category: "Complaining" },
  { de: "This is completely unacceptable because...", en: "This is completely unacceptable because...", ar: "هذا غير مقبول تماماً لأن...", art: "formal", category: "Complaining" },
  { de: "I expect a full refund.", en: "I expect a full refund.", ar: "أتوقع استرداد كامل المبلغ.", art: "formal", category: "Complaining" },
  { de: "I demand that you take immediate action.", en: "I demand that you take immediate action.", ar: "أطلب منكم اتخاذ إجراء فوري.", art: "formal", category: "Complaining" },
  { de: "I am not happy with...", en: "I am not happy with...", ar: "أنا غير سعيد بـ...", art: "informal", category: "Complaining" },
  { de: "This is really frustrating because...", en: "This is really frustrating because...", ar: "هذا محبط حقاً لأن...", art: "informal", category: "Complaining" },
  { de: "Something needs to be done about...", en: "Something needs to be done about...", ar: "شيء يجب فعله تجاه...", art: "informal", category: "Complaining" },

  // ── Applying ──
  { de: "I wish to apply for the position of...", en: "I wish to apply for the position of...", ar: "أرغب في التقدم لوظيفة...", art: "formal", category: "Applying" },
  { de: "I am writing to express my interest in the... role.", en: "I am writing to express my interest in the... role.", ar: "أكتب لأعرب عن اهتمامي بدور...", art: "formal", category: "Applying" },
  { de: "I have attached my CV and cover letter for your consideration.", en: "I have attached my CV and cover letter for your consideration.", ar: "لقد أرفقت سيرتي الذاتية وخطاب التقديم للنظر فيها.", art: "formal", category: "Applying" },
  { de: "I believe my skills and experience make me a strong candidate.", en: "I believe my skills and experience make me a strong candidate.", ar: "أعتقد أن مهاراتي وخبراتي تجعلني مرشحاً قوياً.", art: "formal", category: "Applying" },
  { de: "I have [number] years of experience in...", en: "I have [number] years of experience in...", ar: "لدي [عدد] سنوات من الخبرة في...", art: "formal", category: "Applying" },
  { de: "I am available for an interview at your convenience.", en: "I am available for an interview at your convenience.", ar: "أنا متاح للمقابلة في الوقت الذي يناسبكم.", art: "formal", category: "Applying" },
  { de: "I would welcome the opportunity to join your team.", en: "I would welcome the opportunity to join your team.", ar: "سأرحب بفرصة الانضمام إلى فريقكم.", art: "formal", category: "Applying" },
  { de: "I am confident that I can contribute to...", en: "I am confident that I can contribute to...", ar: "أنا واثق من أنني أستطيع المساهمة في...", art: "formal", category: "Applying" },

  // ── Inviting ──
  { de: "I would like to invite you to...", en: "I would like to invite you to...", ar: "أود دعوتك إلى...", art: "formal", category: "Inviting" },
  { de: "You are cordially invited to...", en: "You are cordially invited to...", ar: "أنت مدعو بحرارة إلى...", art: "formal", category: "Inviting" },
  { de: "We would be delighted if you could join us for...", en: "We would be delighted if you could join us for...", ar: "سيسعدنا إذا تمكنت من الانضمام إلينا في...", art: "formal", category: "Inviting" },
  { de: "Are you free on [day]? I am having a...", en: "Are you free on [day]? I am having a...", ar: "هل أنت متفرغ في [اليوم]؟ سأقيم...", art: "informal", category: "Inviting" },
  { de: "Do you want to come to...?", en: "Do you want to come to...?", ar: "هل تريد الحضور إلى...؟", art: "informal", category: "Inviting" },
  { de: "It would be great to see you at...", en: "It would be great to see you at...", ar: "سيكون رائعاً رؤيتك في...", art: "informal", category: "Inviting" },
  { de: "Let me know if you can make it!", en: "Let me know if you can make it!", ar: "أخبرني إذا كان يمكنك الحضور!", art: "informal", category: "Inviting" },

  // ── Thanking ──
  { de: "Thank you very much for your assistance.", en: "Thank you very much for your assistance.", ar: "شكراً جزيلاً على مساعدتك.", art: "formal", category: "Thanking" },
  { de: "I am very grateful for your support.", en: "I am very grateful for your support.", ar: "أنا ممتن جداً لدعمك.", art: "formal", category: "Thanking" },
  { de: "I would like to express my sincere gratitude for...", en: "I would like to express my sincere gratitude for...", ar: "أود التعبير عن امتناني الصادق لـ...", art: "formal", category: "Thanking" },
  { de: "Many thanks for your kind help.", en: "Many thanks for your kind help.", ar: "شكراً جزيلاً على مساعدتك الكريمة.", art: "both", category: "Thanking" },
  { de: "Thanks a million!", en: "Thanks a million!", ar: "شكراً مليون!", art: "informal", category: "Thanking" },
  { de: "I really appreciate it.", en: "I really appreciate it.", ar: "أنا أقدر ذلك حقاً.", art: "informal", category: "Thanking" },
  { de: "You have been a great help!", en: "You have been a great help!", ar: "لقد كنت عوناً كبيراً!", art: "informal", category: "Thanking" },
  { de: "I can not thank you enough.", en: "I can not thank you enough.", ar: "لا أستطيع شكرك بما فيه الكفاية.", art: "informal", category: "Thanking" },
];

export const LETTER_TIPS: LetterTip[] = [
  {
    id: "formal-vs-informal",
    topic: "Formal vs Informal — Know Your Audience",
    topicAr: "الرسمي مقابل غير الرسمي — اعرف جمهورك",
    tip: "Formal letters use 'Yours faithfully' (when you don't know the name) or 'Yours sincerely' (when you do). Informal letters use 'Best wishes', 'Lots of love', or 'Cheers'. Mixing them is a common exam mistake.",
    tipAr: "الرسائل الرسمية تستخدم 'Yours faithfully' (عند عدم معرفة الاسم) أو 'Yours sincerely' (عند المعرفة). الرسائل غير الرسمية تستخدم 'Best wishes' أو 'Lots of love' أو 'Cheers'. خلطهم خطأ شائع في الامتحان.",
    suggest: "Write 3 formal and 2 informal salutations and closings without looking at notes.",
    suggestAr: "اكتب 3 تحيات وخواتيم رسمية و2 غير رسمية دون النظر إلى الملاحظات.",
    icon: "🎩",
  },
  {
    id: "email-structure",
    topic: "The Five-Part Email Structure",
    topicAr: "هيكل البريد الإلكتروني الخماسي",
    tip: "Every formal email follows: 1) Subject line 2) Salutation 3) Opening paragraph 4) Main body 5) Closing paragraph + sign-off. Stick to this order for clarity.",
    tipAr: "كل بريد إلكتروني رسمي يتبع: 1) سطر الموضوع 2) التحية 3) فقرة الافتتاح 4) الجزء الرئيسي 5) فقرة الختام + التوقيع. التزم بهذا الترتيب للوضوح.",
    suggest: "For your next email, write each section label on a separate line before filling in the content.",
    suggestAr: "لرسالتك الإلكترونية القادمة، اكتب عنوان كل قسم في سطر منفصل قبل ملء المحتوى.",
    icon: "📋",
  },
  {
    id: "subject-line",
    topic: "Subject Line Rules",
    topicAr: "قواعد سطر الموضوع",
    tip: "The subject line should be short and clear. Examples: 'Application for Marketing Internship', 'Complaint about Order #48291', 'Meeting Request — Thursday 15th'. Always include it in formal emails.",
    tipAr: "سطر الموضوع يجب أن يكون قصيراً وواضحاً. أمثلة: 'تقديم لتدريب في التسويق'، 'شكوى حول الطلب رقم 48291'، 'طلب اجتماع — الخميس 15'. أدرجه دائماً في الرسائل الرسمية.",
    suggest: "Read 5 email prompts and practice writing only the subject line for each in under 10 seconds.",
    suggestAr: "اقرأ 5 نماذج لرسائل إلكترونية وتدرب على كتابة الموضوع فقط لكل منها في أقل من 10 ثوان.",
    icon: "📌",
  },
  {
    id: "salutation-matching",
    topic: "Salutation and Closing Matching",
    topicAr: "مطابقة التحية والخاتمة",
    tip: "The closing must match the salutation: 'Dear Sir or Madam' → 'Yours faithfully'. 'Dear Mr. Smith' → 'Yours sincerely'. 'Hi Sarah' → 'Best wishes' or 'Lots of love'. Never use 'Yours faithfully' in an informal email.",
    tipAr: "يجب أن تتطابق الخاتمة مع التحية: 'Dear Sir or Madam' ← 'Yours faithfully'. 'Dear Mr. Smith' ← 'Yours sincerely'. 'Hi Sarah' ← 'Best wishes' أو 'Lots of love'. لا تستخدم أبداً 'Yours faithfully' في بريد غير رسمي.",
    suggest: "Create a table pairing 5 salutations with their correct sign-offs and practice matching them.",
    suggestAr: "أنشئ جدولاً يزاوج 5 تحيات مع صيغها الختامية الصحيحة وتدرب على مطابقتها.",
    icon: "✍️",
  },
  {
    id: "complaint-phrases",
    topic: "Useful Phrases for Complaints",
    topicAr: "عبارات مفيدة للشكاوى",
    tip: "Key complaint phrases: 'I am writing to express my dissatisfaction with...', 'I wish to complain about...', 'I expect a full refund', 'I demand that you take immediate action'. Always state the problem, your request, and a deadline.",
    tipAr: "عبارات الشكوى الرئيسية: 'I am writing to express my dissatisfaction with...'، 'I wish to complain about...'، 'I expect a full refund'، 'I demand that you take immediate action'. اذكر دائماً المشكلة وطلبك والموعد النهائي.",
    suggest: "Write 3 complaint sentences using different structures: one with 'dissatisfaction', one with 'complain', one with 'demand'.",
    suggestAr: "اكتب 3 جمل شكوى باستخدام تراكيب مختلفة: واحدة مع 'dissatisfaction'، وواحدة مع 'complain'، وواحدة مع 'demand'.",
    icon: "⚠️",
  },
  {
    id: "application-phrases",
    topic: "Useful Phrases for Applications",
    topicAr: "عبارات مفيدة للتقديم",
    tip: "Key application phrases: 'I am writing to apply for...', 'I have attached my CV', 'I believe my skills and experience make me a strong candidate', 'I would welcome the opportunity to join your team'. Mention motivation, qualifications, and availability.",
    tipAr: "عبارات التقديم الرئيسية: 'I am writing to apply for...'، 'I have attached my CV'، 'I believe my skills and experience make me a strong candidate'، 'I would welcome the opportunity to join your team'. اذكر الدافع والمؤهلات والتوفر.",
    suggest: "Draft a 3-sentence 'Motivation' paragraph template that you can adapt for different applications.",
    suggestAr: "اكتب نموذج فقرة 'تحفيز' من 3 جمل يمكنك تكييفه لطلبات مختلفة.",
    icon: "💼",
  },
  {
    id: "tone-politeness",
    topic: "Tone and Politeness Levels",
    topicAr: "مستوى النبرة والتأدب",
    tip: "In formal letters, use indirect questions: 'I was wondering if you could...' instead of 'Can you...'. Use 'would' and 'could' instead of 'will' and 'can'. In informal letters, contractions (I'm, you'll, don't) are perfectly fine.",
    tipAr: "في الرسائل الرسمية، استخدم الأسئلة غير المباشرة: 'I was wondering if you could...' بدلاً من 'Can you...'. استخدم 'would' و 'could' بدلاً من 'will' و 'can'. في الرسائل غير الرسمية، الاختصارات (I'm, you'll, don't) مقبولة تماماً.",
    suggest: "Rewrite 3 informal requests as formal requests. Compare the tone difference.",
    suggestAr: "أعد كتابة 3 طلبات غير رسمية كطلبات رسمية. قارن فرق النبرة.",
    icon: "🎭",
  },
];

export const LETTER_EXAMPLES: LetterExample[] = [
  {
    id: "le1",
    type: "formal",
    subject: "Complaint About Late Delivery",
    content: `Dear Sir or Madam,

I am writing to complain about the late delivery of my order #48291, placed on 3 March. The order arrived two weeks late, on 17 March, and the book was damaged — several pages are torn.

I am very dissatisfied with this service. I expect either a replacement in perfect condition or a full refund of $24.99.

Please respond by 31 March.

Yours faithfully,
[Your Name]`,
    englishTranslation: `Dear Sir or Madam,

I am writing to complain about the late delivery of my order #48291, placed on 3 March. The order arrived two weeks late, on 17 March, and the book was damaged — several pages are torn.

I am very dissatisfied with this service. I expect either a replacement in perfect condition or a full refund of $24.99.

Please respond by 31 March.

Yours faithfully,
[Your Name]`,
    arabicTranslation: `سيداتي سادتي الأعزاء،

أكتب لأشتكي من التأخير في توصيل طلبي رقم 48291، الذي تم وضعه في 3 مارس. وصل الطلب متأخراً أسبوعين، في 17 مارس، وكان الكتاب تالفاً — عدة صفحات ممزقة.

أنا غير راضٍ جداً عن هذه الخدمة. أتوقع إما بديلاً بحالة ممتازة أو استرداد كامل المبلغ البالغ 24.99 دولاراً.

الرجاء الرد بحلول 31 مارس.

مع خالص التحيات،
[اسمك]`
  },
  {
    id: "le2",
    type: "formal",
    subject: "Application for a Summer Job",
    content: `Dear Hiring Manager,

I am writing to apply for the summer position of receptionist at the Grand Imperial Hotel.

I am a Business student at London Metropolitan University with strong communication skills and fluency in Spanish and Arabic. Last summer, I worked as a front desk assistant, where I developed excellent customer service skills.

I am available from 1 June to 15 September. I have attached my CV for your consideration.

Thank you for your time. I look forward to hearing from you.

Yours sincerely,
Alex Johnson`,
    englishTranslation: `Dear Hiring Manager,

I am writing to apply for the summer position of receptionist at the Grand Imperial Hotel.

I am a Business student at London Metropolitan University with strong communication skills and fluency in Spanish and Arabic. Last summer, I worked as a front desk assistant, where I developed excellent customer service skills.

I am available from 1 June to 15 September. I have attached my CV for your consideration.

Thank you for your time. I look forward to hearing from you.

Yours sincerely,
Alex Johnson`,
    arabicTranslation: `سيد مدير التوظيف المحترم،

أكتب للتقدم لوظيفة الصيف كموظف استقبال في فندق غراند إمبريال.

أنا طالب إدارة أعمال في جامعة لندن متروبوليتان بمهارات تواصل قوية وطلاقة في الإسبانية والعربية. في الصيف الماضي، عملت كمساعد في مكتب الاستقبال، حيث طورت مهارات ممتازة في خدمة العملاء.

أنا متاح من 1 يونيو إلى 15 سبتمبر. لقد أرفقت سيرتي الذاتية للنظر فيها.

شكراً لوقتك. أتطلع لسماع ردكم.

مع خالص التحيات،
أليكس جونسون`
  },
  {
    id: "le3",
    type: "formal",
    subject: "Inquiry About a Course",
    content: `Dear Sir or Madam,

I am writing to inquire about your 4-week intensive English course starting in July.

I would like to know the course fees, class schedule, and whether accommodation is available. I am also interested in whether there is a placement test before the course begins.

Please send me the information to the email address above. Thank you in advance for your help.

Yours faithfully,
Maria Garcia`,
    englishTranslation: `Dear Sir or Madam,

I am writing to inquire about your 4-week intensive English course starting in July.

I would like to know the course fees, class schedule, and whether accommodation is available. I am also interested in whether there is a placement test before the course begins.

Please send me the information to the email address above. Thank you in advance for your help.

Yours faithfully,
Maria Garcia`,
    arabicTranslation: `سيداتي سادتي الأعزاء،

أكتب للاستفسار عن دورة اللغة الإنجليزية المكثفة لمدة 4 أسابيع التي تبدأ في يوليو.

أود معرفة رسوم الدورة وجدول الفصول الدراسية وما إذا كان السكن متاحاً. أنا مهتمة أيضاً بمعرفة ما إذا كان هناك اختبار تحديد مستوى قبل بدء الدورة.

الرجاء إرسال المعلومات إلى عنوان البريد الإلكتروني أعلاه. شكراً جزيلاً مسبقاً على مساعدتكم.

مع خالص التحيات،
ماريا غارسيا`
  },
  {
    id: "le4",
    type: "informal",
    subject: "Invitation to a Birthday Party",
    content: `Hey Emma,

How are you? Hope everything is going well!

I am turning 22 on 15 June and I am having a party at the Riverside Café from 7 pm. There will be food, music, and lots of fun!

I would love for you to come. Let me know if you can make it by 1 June so I can organise the catering.

Can not wait to see you there!

Lots of love,
Maya`,
    englishTranslation: `Hey Emma,

How are you? Hope everything is going well!

I am turning 22 on 15 June and I am having a party at the Riverside Café from 7 pm. There will be food, music, and lots of fun!

I would love for you to come. Let me know if you can make it by 1 June so I can organise the catering.

Can not wait to see you there!

Lots of love,
Maya`,
    arabicTranslation: `أهلاً إيما،

كيف حالك؟ أتمنى أن كل شيء على ما يرام!

سأكمل 22 عاماً في 15 يونيو وسأقيم حفلة في مقهى ريفرسايد من الساعة 7 مساءً. سيكون هناك طعام وموسيقى وكثير من المرح!

أتمنى أن تأتي. أخبريني إذا كان يمكنك الحضور بحلول 1 يونيو حتى أتمكن من تنظيم تقديم الطعام.

لا أطيق الانتظار لرؤيتك هناك!

مع كل الحب،
مايا`
  },
  {
    id: "le5",
    type: "informal",
    subject: "Thank You for a Gift",
    content: `Dear Grandma,

Thank you so much for the birthday present! The book you sent is exactly what I wanted — I have already started reading it and I love it.

You always know exactly what to choose! I really appreciate your thoughtful gift.

I hope to visit you soon. Let me know when you are free!

Lots of love,
Sarah`,
    englishTranslation: `Dear Grandma,

Thank you so much for the birthday present! The book you sent is exactly what I wanted — I have already started reading it and I love it.

You always know exactly what to choose! I really appreciate your thoughtful gift.

I hope to visit you soon. Let me know when you are free!

Lots of love,
Sarah`,
    arabicTranslation: `عزيزتي الجدة،

شكراً جزيلاً على هدية عيد الميلاد! الكتاب الذي أرسلته هو بالضبط ما أردته — لقد بدأت بقراءته بالفعل وأنا أحبه.

أنت دائماً تعرفين بالضبط ماذا تختارين! أنا أقدر حقاً هديتك المدروسة.

آمل زيارتك قريباً. أخبريني عندما تكونين متفرغة!

مع كل الحب،
سارة`
  },
  {
    id: "le6",
    type: "formal",
    subject: "Apology for Missing a Meeting",
    content: `Dear Mr. Thompson,

I am writing to sincerely apologise for missing the team meeting yesterday afternoon.

I had an urgent family matter that required my immediate attention and I was unable to notify you beforehand. I understand this caused inconvenience, and I am truly sorry.

I have spoken with Lisa to catch up on what I missed. Please let me know if there is anything else I need to do.

Thank you for your understanding.

Best regards,
James Wilson`,
    englishTranslation: `Dear Mr. Thompson,

I am writing to sincerely apologise for missing the team meeting yesterday afternoon.

I had an urgent family matter that required my immediate attention and I was unable to notify you beforehand. I understand this caused inconvenience, and I am truly sorry.

I have spoken with Lisa to catch up on what I missed. Please let me know if there is anything else I need to do.

Thank you for your understanding.

Best regards,
James Wilson`,
    arabicTranslation: `عزيزي السيد تومسون،

أكتب لأعتذر بصدق عن تغيبي عن اجتماع الفريق بعد ظهر أمس.

كان لدي أمر عائلي عاجل تطلب انتباهي الفوري ولم أتمكن من إخطاركم مسبقاً. أفهم أن هذا سبب إزعاجاً، وأنا آسف حقاً.

لقد تحدثت مع ليزا لمعرفة ما فاتني. من فضلك أخبرني إذا كان هناك أي شيء آخر يجب علي فعله.

شكراً لتفهمكم.

مع أطيب التحيات،
جيمس ويلسون`
  },
  {
    id: "le7",
    type: "informal",
    subject: "Apology to a Friend",
    content: `Hi Tom,

I am so sorry about last night. I completely forgot we had plans, and I feel terrible about it.

There is no excuse — I should have put it in my calendar. I know you were looking forward to seeing that film, and I ruined the evening.

Let me make it up to you. How about dinner this Friday? My treat!

Let me know.

Sorry again,
Mark`,
    englishTranslation: `Hi Tom,

I am so sorry about last night. I completely forgot we had plans, and I feel terrible about it.

There is no excuse — I should have put it in my calendar. I know you were looking forward to seeing that film, and I ruined the evening.

Let me make it up to you. How about dinner this Friday? My treat!

Let me know.

Sorry again,
Mark`,
    arabicTranslation: `مرحباً توم،

أنا آسف جداً بشأن الليلة الماضية. لقد نسيت تماماً أن لدينا خططاً، وأشعر بشعور فظيع حيال ذلك.

ليس هناك عذر — كان يجب أن أدخله في تقويمي. أعلم أنك كنت تتطلع لرؤية ذلك الفيلم، وقد أفسدت المساء.

دعني أعوضك عن ذلك. ماذا عن العشاء يوم الجمعة؟ أنا معي!

أخبرني.

آسف مرة أخرى،
مارك`
  },
];

// Keep old export names for backward compatibility
export const BRIEF_PHRASES = LETTER_PHRASES;
export const BRIEFE = LETTER_EXAMPLES;
export const ASTUCES_BRIEFE = LETTER_TIPS;
