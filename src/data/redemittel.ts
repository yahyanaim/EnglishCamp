export type RedemittelCategory =
  | "agreeing" | "disagreeing" | "opinion" | "interrupting"
  | "clarifying" | "summarizing" | "examples" | "comparing"
  | "contrasting" | "sequencing" | "adding";

export type RedemittelEntry = {
  phrase: string;
  usage: string;
  example: string;
  arabic: string;
  category: RedemittelCategory;
};

export const REDEMITTEL_CATEGORIES: Record<RedemittelCategory, { label: string; labelAr?: string; icon: string; color: string; desc: string; descAr?: string }> = {
  agreeing:    { label: "Agreeing", labelAr: "الموافقة", icon: "✅", color: "text-emerald-600", desc: "Agreeing with someone", descAr: "الموافقة مع شخص" },
  disagreeing: { label: "Disagreeing", labelAr: "الاعتراض", icon: "❌", color: "text-red-600", desc: "Disagreeing politely", descAr: "الاعتراض بأدب" },
  opinion:     { label: "Opinions", labelAr: "الآراء", icon: "💭", color: "text-blue-600", desc: "Expressing your opinion", descAr: "التعبير عن رأيك" },
  interrupting:{ label: "Interrupting", labelAr: "المقاطعة", icon: "✋", color: "text-amber-600", desc: "Interrupting politely", descAr: "المقاطعة بأدب" },
  clarifying:  { label: "Clarifying", labelAr: "التوضيح", icon: "🔍", color: "text-purple-600", desc: "Clarifying what you or others said", descAr: "توضيح ما قلته أو ما قاله الآخرون" },
  summarizing: { label: "Summarizing", labelAr: "التلخيص", icon: "📋", color: "text-sky-600", desc: "Summarizing main points", descAr: "تلخيص النقاط الرئيسية" },
  examples:    { label: "Examples", labelAr: "الأمثلة", icon: "📌", color: "text-teal-600", desc: "Giving examples", descAr: "إعطاء أمثلة" },
  comparing:   { label: "Comparing", labelAr: "المقارنة", icon: "⚖️", color: "text-indigo-600", desc: "Making comparisons", descAr: "إجراء المقارنات" },
  contrasting: { label: "Contrasting", labelAr: "التباين", icon: "🔄", color: "text-orange-600", desc: "Showing contrast", descAr: "إظهار التباين" },
  sequencing:  { label: "Sequencing", labelAr: "التسلسل", icon: "🔢", color: "text-cyan-600", desc: "Ordering your points", descAr: "ترتيب نقاطك" },
  adding:      { label: "Adding Info", labelAr: "إضافة معلومات", icon: "➕", color: "text-rose-600", desc: "Adding more information", descAr: "إضافة المزيد من المعلومات" },
};

export const REDEMITTEL: RedemittelEntry[] = [
  // ── Agreeing ──
  { phrase: "I completely agree with you.", usage: "Strong agreement in discussions and debates.", example: "I completely agree with you that we need to invest more in renewable energy.", arabic: "أوافقك الرأي تماماً.", category: "agreeing" },
  { phrase: "That's exactly what I think.", usage: "Shows full alignment with someone's point of view.", example: "That's exactly what I think about the new policy.", arabic: "هذا بالضبط ما أعتقده.", category: "agreeing" },
  { phrase: "You're absolutely right.", usage: "Emphatic agreement, often used in conversations.", example: "You're absolutely right about the importance of saving money.", arabic: "أنت على حق تماماً.", category: "agreeing" },
  { phrase: "I couldn't agree more.", usage: "Very strong agreement, often used in formal discussions.", example: "When she said we need better communication, I couldn't agree more.", arabic: "لا يمكنني أن أوافق أكثر من ذلك.", category: "agreeing" },
  { phrase: "That's a good point.", usage: "Acknowledging someone's valid argument before adding your own.", example: "That's a good point. I hadn't considered that aspect.", arabic: "هذه نقطة جيدة.", category: "agreeing" },
  { phrase: "I see what you mean.", usage: "Shows understanding of someone's perspective without necessarily full agreement.", example: "I see what you mean about the schedule being too tight.", arabic: "أفهم ما تقصده.", category: "agreeing" },
  { phrase: "You have a point there.", usage: "Acknowledging the validity of someone's argument.", example: "You have a point there — working from home does save time on commuting.", arabic: "لديك نقطة صحيحة هناك.", category: "agreeing" },
  { phrase: "I'm with you on that.", usage: "Informal agreement, showing support for an idea.", example: "I'm with you on that. Let's go with your proposal.", arabic: "أنا معك في ذلك.", category: "agreeing" },

  // ── Disagreeing ──
  { phrase: "I see it differently.", usage: "Polite way to express a different opinion.", example: "I see it differently. I think the risks outweigh the benefits.", arabic: "أرى الأمر بشكل مختلف.", category: "disagreeing" },
  { phrase: "I'm not so sure about that.", usage: "Hesitant or polite disagreement.", example: "I'm not so sure about that. We should check the data first.", arabic: "لست متأكداً من ذلك.", category: "disagreeing" },
  { phrase: "I beg to differ.", usage: "Polite but firm disagreement, common in formal contexts.", example: "I beg to differ. The evidence suggests otherwise.", arabic: "أسمح لنفسي أن أختلف.", category: "disagreeing" },
  { phrase: "That's one way of looking at it, but...", usage: "Acknowledges the other view before presenting your counter-argument.", example: "That's one way of looking at it, but I think there's more to consider.", arabic: "هذه طريقة للنظر إلى الأمر، لكن...", category: "disagreeing" },
  { phrase: "I respect your opinion, but I disagree.", usage: "Polite disagreement that shows respect for the other person.", example: "I respect your opinion, but I disagree with your conclusion.", arabic: "أحترم رأيك، لكنني أختلف.", category: "disagreeing" },
  { phrase: "That's not entirely true because...", usage: "Disagreement backed by a reason.", example: "That's not entirely true because the study had a very small sample size.", arabic: "هذا ليس صحيحاً تماماً لأن...", category: "disagreeing" },
  { phrase: "I can't go along with that.", usage: "Expressing clear disagreement in a firm but polite way.", example: "I can't go along with that plan. It's too risky.", arabic: "لا أستطيع الموافقة على ذلك.", category: "disagreeing" },
  { phrase: "On the contrary...", usage: "Strong disagreement, often used to contradict a statement directly.", example: "It wasn't a failure. On the contrary, we learned a lot.", arabic: "على العكس من ذلك...", category: "disagreeing" },

  // ── Expressing Opinions ──
  { phrase: "In my opinion...", usage: "Standard way to introduce your opinion in any context.", example: "In my opinion, the government should invest more in public transport.", arabic: "في رأيي...", category: "opinion" },
  { phrase: "From my point of view...", usage: "Shows that you are sharing a personal perspective.", example: "From my point of view, the main issue is a lack of funding.", arabic: "من وجهة نظري...", category: "opinion" },
  { phrase: "As far as I'm concerned...", usage: "Emphasizes that this is your personal view.", example: "As far as I'm concerned, we should accept the offer.", arabic: "بقدر ما يهمني الأمر... / بالنسبة لي...", category: "opinion" },
  { phrase: "It seems to me that...", usage: "Softer way to express an opinion, less direct.", example: "It seems to me that we're overlooking an important detail.", arabic: "يبدو لي أن...", category: "opinion" },
  { phrase: "I strongly believe that...", usage: "Strong conviction about something.", example: "I strongly believe that education is the key to solving many social problems.", arabic: "أعتقد اعتقاداً راسخاً أن...", category: "opinion" },
  { phrase: "Personally speaking...", usage: "Makes clear that this is a personal opinion, not a fact.", example: "Personally speaking, I prefer working in a team rather than alone.", arabic: "شخصياً...", category: "opinion" },
  { phrase: "If you ask me...", usage: "Informal way to give an opinion.", example: "If you ask me, they should have cancelled the event earlier.", arabic: "إذا سألتني... / برأيي...", category: "opinion" },
  { phrase: "My view is that...", usage: "Clear, formal way to present your opinion.", example: "My view is that we need to focus on quality over quantity.", arabic: "رأيي هو أن...", category: "opinion" },

  // ── Interrupting ──
  { phrase: "Sorry to interrupt, but...", usage: "Polite way to break into a conversation.", example: "Sorry to interrupt, but I have some urgent information to share.", arabic: "عذراً على المقاطعة، لكن...", category: "interrupting" },
  { phrase: "May I add something here?", usage: "Very polite interruption, common in meetings.", example: "May I add something here? I think we're missing a key point.", arabic: "هل يمكنني إضافة شيء هنا؟", category: "interrupting" },
  { phrase: "Could I just jump in for a moment?", usage: "Polite, slightly informal interruption.", example: "Could I just jump in for a moment? I have a quick question.", arabic: "هل يمكنني التدخل للحظة؟", category: "interrupting" },
  { phrase: "If I could just come in here...", usage: "Formal interruption in discussions.", example: "If I could just come in here, I'd like to clarify something.", arabic: "إذا كان بإمكاني التدخل هنا...", category: "interrupting" },
  { phrase: "Before you continue, let me just say...", usage: "Direct but polite way to interrupt.", example: "Before you continue, let me just say that I agree with the proposal.", arabic: "قبل أن تكمل، دعوني أقول فقط...", category: "interrupting" },
  { phrase: "Sorry for cutting in, but...", usage: "Informal, friendly interruption.", example: "Sorry for cutting in, but did you see the email about the deadline?", arabic: "آسف للمقاطعة، لكن...", category: "interrupting" },
  { phrase: "I'd like to add something to that.", usage: "Polite way to add a point during a discussion.", example: "I'd like to add something to that — there's also the environmental impact.", arabic: "أود إضافة شيء إلى ذلك.", category: "interrupting" },
  { phrase: "May I say something about that?", usage: "Very polite request to speak.", example: "May I say something about that? I have some relevant experience.", arabic: "هل يمكنني قول شيء حول ذلك؟", category: "interrupting" },

  // ── Clarifying ──
  { phrase: "What I mean is...", usage: "Rephrasing your own statement to make it clearer.", example: "What I mean is that we need to act now, not wait any longer.", arabic: "ما أعنيه هو...", category: "clarifying" },
  { phrase: "In other words...", usage: "Explaining something in a simpler or different way.", example: "The project is behind schedule. In other words, we won't meet the deadline.", arabic: "بعبارة أخرى...", category: "clarifying" },
  { phrase: "Let me put it another way.", usage: "Preparing to rephrase your point more clearly.", example: "Let me put it another way — if we don't invest now, we'll lose market share.", arabic: "دعني أصوغ الأمر بطريقة أخرى.", category: "clarifying" },
  { phrase: "To be more precise...", usage: "Adding detail to make a point more exact.", example: "We sold about a thousand units. To be more precise, 1,047 units.", arabic: "لنكون أكثر دقة...", category: "clarifying" },
  { phrase: "I'm not sure I understand. Could you explain?", usage: "Asking for clarification politely.", example: "I'm not sure I understand your point. Could you explain it differently?", arabic: "لست متأكداً أنني أفهم. هل يمكنك التوضيح؟", category: "clarifying" },
  { phrase: "What exactly do you mean by that?", usage: "Asking for more specific clarification.", example: "What exactly do you mean by 'restructuring'? Could you give details?", arabic: "ماذا تقصد بالضبط بذلك؟", category: "clarifying" },
  { phrase: "Let me clarify what I said earlier.", usage: "Clearing up a misunderstanding about your own words.", example: "Let me clarify what I said earlier — I didn't mean to criticize your work.", arabic: "دعني أوضح ما قلته سابقاً.", category: "clarifying" },
  { phrase: "Does that make sense?", usage: "Checking if the listener understood you.", example: "The system works by prioritizing urgent tasks. Does that make sense?", arabic: "هل هذا مفهوم؟", category: "clarifying" },

  // ── Summarizing ──
  { phrase: "To sum up...", usage: "Briefly restating the main points.", example: "To sum up, we discussed three key areas: cost, timeline, and quality.", arabic: "باختصار / لتلخيص...", category: "summarizing" },
  { phrase: "In conclusion...", usage: "Formal summary ending, used in presentations and essays.", example: "In conclusion, the benefits of the proposal clearly outweigh the drawbacks.", arabic: "في الختام...", category: "summarizing" },
  { phrase: "Overall, it can be said that...", usage: "A balanced way to conclude a discussion.", example: "Overall, it can be said that the event was a success despite the challenges.", arabic: "بشكل عام، يمكن القول إن...", category: "summarizing" },
  { phrase: "The main point is...", usage: "Focusing on the most important idea.", example: "The main point is that we need to improve our customer service.", arabic: "النقطة الرئيسية هي...", category: "summarizing" },
  { phrase: "Let me summarize what we've discussed.", usage: "Useful at the end of a meeting or discussion.", example: "Let me summarize what we've discussed so we're all on the same page.", arabic: "دعوني ألخص ما ناقشناه.", category: "summarizing" },
  { phrase: "In short...", usage: "Very brief summary of a point.", example: "In short, the company is doing well and growing steadily.", arabic: "باختصار...", category: "summarizing" },
  { phrase: "To put it simply...", usage: "Simplifying a complex idea into a short summary.", example: "To put it simply, we need more money and more time.", arabic: "ببساطة...", category: "summarizing" },
  { phrase: "The bottom line is...", usage: "Focusing on the final or most important outcome.", example: "The bottom line is that we cannot afford to delay any further.", arabic: "الخلاصة هي... / المحصلة النهائية...", category: "summarizing" },

  // ── Giving Examples ──
  { phrase: "For example...", usage: "Introducing a specific instance to illustrate a point.", example: "Many countries have adopted this policy. For example, Sweden and Norway.", arabic: "على سبيل المثال...", category: "examples" },
  { phrase: "For instance...", usage: "Similar to 'for example', slightly more formal.", example: "There are many ways to reduce waste. For instance, using reusable bags.", arabic: "على سبيل المثال...", category: "examples" },
  { phrase: "Such as...", usage: "Listing examples within a sentence.", example: "I enjoy outdoor activities, such as hiking, cycling, and swimming.", arabic: "مثل... / كـ...", category: "examples" },
  { phrase: "Let me give you an example.", usage: "Preparing the listener for a specific illustration.", example: "This can lead to problems. Let me give you an example from last month.", arabic: "دعني أعطيك مثالاً.", category: "examples" },
  { phrase: "To illustrate this point...", usage: "Formal way to introduce an example, common in presentations.", example: "To illustrate this point, consider the case of a small business owner.", arabic: "لتوضيح هذه النقطة...", category: "examples" },
  { phrase: "A good example of this is...", usage: "Introducing a particularly clear example.", example: "A good example of this is the way social media has changed communication.", arabic: "مثال جيد على ذلك هو...", category: "examples" },
  { phrase: "Namely...", usage: "Specifying something more precisely.", example: "Three team members were recognized, namely Sarah, John, and Maria.", arabic: "ألا وهو / تحديداً...", category: "examples" },
  { phrase: "Take... for example.", usage: "Using a specific case to demonstrate a broader point.", example: "Take smartphones for example — they've completely changed how we communicate.", arabic: "خذ كمثال...", category: "examples" },

  // ── Comparing ──
  { phrase: "Similarly...", usage: "Introducing a point that shows similarity to a previous point.", example: "The first product was successful. Similarly, the second one exceeded expectations.", arabic: "وبالمثل...", category: "comparing" },
  { phrase: "In the same way...", usage: "Showing that two things are comparable in a specific aspect.", example: "In the same way that a plant needs water, a business needs investment.", arabic: "بنفس الطريقة...", category: "comparing" },
  { phrase: "Compared to...", usage: "Drawing a comparison between two things.", example: "Compared to last year, our profits have increased by 15 percent.", arabic: "مقارنة بـ...", category: "comparing" },
  { phrase: "Both... and... are similar because...", usage: "Highlighting similarities between two items.", example: "Both coffee and tea are popular because they contain caffeine.", arabic: "كل من... و... متشابهان لأن...", category: "comparing" },
  { phrase: "Likewise...", usage: "Formal way to introduce a similar point.", example: "The marketing team performed well. Likewise, the sales team exceeded targets.", arabic: "كذلك / بالمثل...", category: "comparing" },
  { phrase: "Just as... so too...", usage: "Emphatic comparison showing parallel situations.", example: "Just as the industrial age transformed society, so too is the digital age changing everything.", arabic: "كما أن... كذلك أيضاً...", category: "comparing" },
  { phrase: "In comparison...", usage: "Introducing a comparative perspective.", example: "In comparison, online learning offers more flexibility than traditional classrooms.", arabic: "بالمقارنة...", category: "comparing" },
  { phrase: "Along the same lines...", usage: "Introducing a related similar point.", example: "Along the same lines, we should also consider the environmental benefits.", arabic: "على نفس المنوال...", category: "comparing" },

  // ── Contrasting ──
  { phrase: "On the other hand...", usage: "Introducing the opposite side of an argument.", example: "The job offers a high salary. On the other hand, the working hours are very long.", arabic: "من ناحية أخرى...", category: "contrasting" },
  { phrase: "However...", usage: "Common contrasting connector.", example: "The plan seemed perfect. However, there were hidden costs.", arabic: "مع ذلك / لكن...", category: "contrasting" },
  { phrase: "In contrast...", usage: "Highlighting differences between two things.", example: "In contrast to last year, this year has been very profitable.", arabic: "في المقابل / على النقيض...", category: "contrasting" },
  { phrase: "Although / Even though...", usage: "Introducing a contrasting clause in the same sentence.", example: "Although it was raining, we decided to go ahead with the outdoor event.", arabic: "على الرغم من أن...", category: "contrasting" },
  { phrase: "While / Whereas...", usage: "Comparing two contrasting facts.", example: "While the north is industrial, the south is mostly agricultural.", arabic: "بينما / في حين...", category: "contrasting" },
  { phrase: "Nevertheless / Nonetheless...", usage: "Formal contrasting; showing something is true despite the previous point.", example: "The evidence was weak. Nevertheless, the court accepted the argument.", arabic: "مع ذلك / ورغم ذلك...", category: "contrasting" },
  { phrase: "Despite / In spite of...", usage: "Introducing a contrasting fact that did not change the outcome.", example: "Despite the budget cuts, the project was completed successfully.", arabic: "على الرغم من...", category: "contrasting" },
  { phrase: "On the contrary...", usage: "Directly contradicting a previous statement.", example: "He's not lazy. On the contrary, he's one of the hardest workers I know.", arabic: "على العكس من ذلك...", category: "contrasting" },

  // ── Sequencing ──
  { phrase: "First of all / Firstly...", usage: "Introducing the first point in a sequence.", example: "First of all, let me thank everyone for coming to this meeting.", arabic: "أولاً / قبل كل شيء...", category: "sequencing" },
  { phrase: "Secondly / Thirdly...", usage: "Introducing subsequent points in an ordered list.", example: "Secondly, we need to analyze the data. Thirdly, we should present our findings.", arabic: "ثانياً / ثالثاً...", category: "sequencing" },
  { phrase: "Then / Next...", usage: "Moving to the next step or point.", example: "We'll start with a briefing. Then we'll split into groups for discussion.", arabic: "ثم / بعد ذلك...", category: "sequencing" },
  { phrase: "After that...", usage: "Indicating the next step in a process.", example: "We'll review the applications. After that, we'll shortlist candidates for interviews.", arabic: "بعد ذلك...", category: "sequencing" },
  { phrase: "Finally / Lastly...", usage: "Introducing the last point in a sequence.", example: "Finally, I'd like to summarize the key decisions we've made today.", arabic: "أخيراً...", category: "sequencing" },
  { phrase: "In the first place...", usage: "Emphasizing the initial and most important point.", example: "In the first place, we shouldn't have agreed to such a tight deadline.", arabic: "في المقام الأول...", category: "sequencing" },
  { phrase: "Meanwhile...", usage: "Indicating something happening at the same time.", example: "The CEO was in a meeting. Meanwhile, the team was preparing the presentation.", arabic: "في هذه الأثناء...", category: "sequencing" },
  { phrase: "Subsequently...", usage: "Formal way to indicate what happened next.", example: "The contract was signed. Subsequently, work began on the project.", arabic: "بعد ذلك / لاحقاً...", category: "sequencing" },

  // ── Adding Information ──
  { phrase: "Furthermore...", usage: "Adding an important point, often stronger than the previous one.", example: "The product is affordable. Furthermore, it comes with a two-year warranty.", arabic: "علاوة على ذلك...", category: "adding" },
  { phrase: "Moreover...", usage: "Adding a point that reinforces the argument.", example: "The candidate has excellent qualifications. Moreover, he has relevant work experience.", arabic: "إضافة إلى ذلك...", category: "adding" },
  { phrase: "In addition (to this)...", usage: "Introducing extra information or an additional point.", example: "In addition to offering competitive salaries, the company provides great benefits.", arabic: "بالإضافة إلى ذلك...", category: "adding" },
  { phrase: "Besides...", usage: "Adding an additional reason, often a stronger one.", example: "I don't want to go out. Besides, I have a lot of work to finish.", arabic: "علاوة على ذلك / بالإضافة إلى...", category: "adding" },
  { phrase: "Not only... but also...", usage: "Emphasizing two related points together.", example: "The new system is not only faster but also more reliable.", arabic: "ليس فقط... بل أيضاً...", category: "adding" },
  { phrase: "What's more...", usage: "Informal way to add a stronger point.", example: "He's a great team player. What's more, he always meets his deadlines.", arabic: "ما يزيد الأمر... / والأكثر من ذلك...", category: "adding" },
  { phrase: "As well as...", usage: "Adding information within a sentence.", example: "The course covers grammar as well as vocabulary.", arabic: "بالإضافة إلى...", category: "adding" },
  { phrase: "Another point is that...", usage: "Introducing an additional argument.", example: "Another point is that remote work can actually increase productivity.", arabic: "نقطة أخرى هي أن...", category: "adding" },
];
