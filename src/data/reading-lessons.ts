import { ALL_ARTICLES } from "./articles/index";
import { CEFR_LEVELS, type CefrLevel } from "./placement/cefr";
import { placeCorrect, type ComprehensionQuestion, type ComprehensionSkill } from "@/lib/comprehension";

export { CEFR_LEVELS, type CefrLevel };
export { CEFR_LABELS } from "./cefr-labels";

export type ReadingGlossaryEntry = { word: string; ar: string; def: string };
export type ReadingLesson = {
  id: string;
  title: string;
  level: CefrLevel;
  category: string;
  paragraphs: string[];
  glossary: ReadingGlossaryEntry[];
  questions: ComprehensionQuestion[];
  /** New passages stay hidden until an administrator reviews and publishes them. */
  status: "published" | "review";
  source: "englishcamp" | "admin";
  /** Original Band article this lesson was migrated from, when any. */
  articleId?: string;
};

const WORDS_PER_MINUTE: Record<CefrLevel, number> = { A1: 70, A2: 90, B1: 120, B2: 150, C1: 170, C2: 190 };
export const lessonWordCount = (lesson: Pick<ReadingLesson, "paragraphs">) => lesson.paragraphs.join(" ").split(/\s+/).filter(Boolean).length;
export const readingMinutes = (lesson: Pick<ReadingLesson, "paragraphs" | "level">) => Math.max(1, Math.round(lessonWordCount(lesson) / WORDS_PER_MINUTE[lesson.level]));

type DraftBase = { skill: ComprehensionSkill; prompt: string; evidence: string; feedback: string };
type Draft = (DraftBase & { kind: "mc"; correctFirst: string[] }) | (DraftBase & { kind: "tf"; correct: boolean }) | (DraftBase & { kind: "sa"; answers: string[] });
const mc = (skill: ComprehensionSkill, prompt: string, correctFirst: string[], evidence: string, feedback: string): Draft => ({ kind: "mc", skill, prompt, correctFirst, evidence, feedback });
const tf = (skill: ComprehensionSkill, prompt: string, correct: boolean, evidence: string, feedback: string): Draft => ({ kind: "tf", skill, prompt, correct, evidence, feedback });
const sa = (skill: ComprehensionSkill, prompt: string, answers: string[], evidence: string, feedback: string): Draft => ({ kind: "sa", skill, prompt, answers, evidence, feedback });

/** The correct choice is written first in source and placed at a stable, varied position. */
function build(lessonId: string, drafts: Draft[]): ComprehensionQuestion[] {
  return drafts.map((draft, index): ComprehensionQuestion => {
    const id = `${lessonId}-q${index + 1}`, { skill, prompt, evidence, feedback } = draft;
    if (draft.kind === "mc") return { id, type: "multiple-choice", skill, prompt, evidence, feedback, ...placeCorrect(id, draft.correctFirst) };
    if (draft.kind === "tf") return { id, type: "true-false", skill, prompt, evidence, feedback, correct: draft.correct };
    return { id, type: "short-answer", skill, prompt, evidence, feedback, answers: draft.answers };
  });
}

/**
 * CEFR targets are EnglishCamp teaching estimates from text length, grammar and abstraction.
 * Band labels stay on the original article records so existing progress is unchanged.
 */
const MIGRATED: Record<string, { level: CefrLevel; questions: Draft[] }> = {
  "tech-computers": { level: "A2", questions: [
    mc("main-idea", "What is the text mainly about?", ["How computers help us at school, at work and at home", "How to build a computer", "Why computers are expensive", "The history of the internet"], "They help us do many things faster and better.", "Each paragraph shows a different place where computers help us."),
    tf("detail", "Teachers use computers to give homework online.", true, "Teachers use them to prepare lessons and give homework online.", "The second paragraph says teachers give homework online."),
    mc("detail", "What do people do with computers at work?", ["They make video calls.", "They cook food.", "They play sports.", "They grow plants."], "They send emails, make video calls, and create reports.", "At work, people send emails, make video calls and create reports."),
    sa("detail", "Where can we buy things without going to the shop? Write one word.", ["online"], "We can also buy things online without going to the shop.", "We can buy things online."),
  ] },
  "env-recycle": { level: "A2", questions: [
    mc("main-idea", "What is the main message of the text?", ["Recycling helps the planet, and anyone can do it.", "Landfills are good for the environment.", "Only factories can recycle.", "Plastic cannot be recycled."], "Anyone can recycle at home.", "The text explains why recycling helps and ends by saying anyone can do it."),
    sa("detail", "Where does rubbish go? Write the word from the text.", ["landfills", "landfill", "to landfills"], "This rubbish goes to big places called landfills.", "Rubbish goes to big places called landfills."),
    tf("detail", "Making new things from old materials uses more energy.", false, "Making new things from old materials uses less energy than making things from new materials.", "It uses less energy, not more."),
    mc("detail", "What can we make from old cans?", ["New cans or other metal items", "New paper", "Plastic bottles", "Food"], "We can also melt old cans and make new cans or other metal items.", "Old cans are melted to make new cans or other metal items."),
  ] },
  "health-stay-healthy": { level: "A2", questions: [
    mc("main-idea", "Which three daily habits does the text recommend?", ["Exercise, eat well and sleep enough", "Work, study and travel", "Run, swim and cook", "Read, write and listen"], "exercise, eat well, and sleep enough", "The first paragraph names these three simple habits."),
    tf("detail", "You must go to the gym to exercise.", false, "You do not need to go to the gym.", "Walking, running or playing sports is enough."),
    sa("detail", "How many hours of sleep do adults need? Write the numbers.", ["seven to eight", "7 to 8", "7-8", "seven or eight", "about seven to eight"], "Adults need about seven to eight hours of sleep every night.", "Adults need about seven to eight hours."),
    mc("detail", "Who needs more sleep than adults?", ["Children", "Teachers", "Doctors", "Athletes"], "Children need more sleep than adults.", "The text says children need more sleep than adults."),
  ] },
  "edu-learning-english": { level: "A2", questions: [
    mc("main-idea", "What is the text about?", ["The writer’s experience of learning English", "How to become an English teacher", "A holiday in another country", "Why English is easy"], "I started learning English two years ago.", "The writer describes two years of learning English."),
    sa("detail", "What is the hardest part for the writer? Write one word.", ["speaking"], "Speaking is the hardest part for me.", "Speaking is the hardest part."),
    tf("detail", "The writer’s teacher says it is okay to make mistakes.", true, "My teacher says it is okay to make mistakes.", "The teacher says mistakes are okay."),
    mc("detail", "How does the writer remember new vocabulary?", ["By writing in a small notebook every day", "By watching sport", "By sleeping more", "By speaking only to the teacher"], "I write in a small notebook every day.", "Writing about the day with new words helps the writer remember vocabulary."),
  ] },
  "community-garden": { level: "B1", questions: [
    mc("main-idea", "What is the main point of the story?", ["Building the garden brought neighbours closer together.", "The garden fed every family on the street.", "Lina became a professional gardener.", "The neighbours argued until the garden closed."], "people who had only said hello were now sharing tools and stories", "The last paragraph says the garden’s value was the new connection between neighbours."),
    mc("detail", "What did the first neighbour plant?", ["Tomatoes", "Beans", "Herbs", "Flowers"], "planted some tomatoes", "The first neighbour planted some tomatoes in a wooden box."),
    tf("detail", "The garden produced enough food for the whole street.", false, "The garden did not produce enough food for the whole street.", "It did not produce enough food; its value was different."),
    sa("detail", "How many boxes had the neighbours built by summer? Write a number.", ["6", "six"], "By summer, the neighbours had built six boxes.", "They had built six boxes by summer."),
  ] },
  "library-of-things": { level: "B1", questions: [
    mc("main-idea", "What did Sami learn from his visit?", ["A library can lend useful objects as well as books.", "Libraries sell tools at low prices.", "His family should buy a new drill.", "The library is closing its book section."], "It could be a place to find useful objects as well as information.", "The visit changed Sami’s idea of what a library can offer."),
    mc("detail", "Why did the family decide not to buy a drill?", ["They needed it only for a short job.", "The shop was closed.", "Drills are not sold in their town.", "The librarian told them not to."], "Buying a new drill for a short job seemed wasteful.", "Buying a drill for one short job seemed wasteful."),
    tf("detail", "At first, Sami thought the tools were part of a display.", true, "At first, he thought they were part of a display.", "He first thought the objects were a display."),
    mc("inference", "Why must borrowers return everything in good condition?", ["The next visitor might need the same tool.", "The library charges a large fee.", "The tools are very new.", "Sami’s father asked them to."], "The next visitor might need exactly the same tool.", "Sharing works only if the next borrower receives the tool in good condition."),
  ] },
  "repair-cafe": { level: "B1", questions: [
    mc("main-idea", "What did Nadia value most about the afternoon?", ["Meeting people and learning something practical", "The free coffee", "Getting a new lamp", "Selling her old radio"], "An object she had considered useless had become a reason to meet someone and learn something practical.", "Even without a repair, the afternoon helped her meet someone and learn."),
    tf("detail", "The lamp was repaired that afternoon.", false, "The lamp could not be repaired that afternoon because they did not have the replacement.", "They did not have the replacement part."),
    mc("detail", "What did the volunteer ask Nadia to do first?", ["Describe the problem", "Pay for the repair", "Buy a replacement part", "Come back next week"], "A volunteer asked Nadia to describe the problem before looking at the lamp.", "He asked her to describe the problem before looking at the lamp."),
    mc("inference", "What does the text suggest about the visitors?", ["They take part and learn while objects are examined.", "They expect experts to do all the work.", "They only come for food and drink.", "They always leave with fixed objects."], "Visitors were not simply handing objects to experts and waiting.", "Visitors compared ideas and asked questions instead of waiting."),
  ] },
  "science-climate": { level: "B1", questions: [
    mc("main-idea", "What does the text mainly explain?", ["The causes, effects and possible solutions of climate change", "How to build a solar panel", "Why coral reefs are beautiful", "The history of weather forecasts"], "Climate change is one of the biggest challenges facing our planet today.", "The text moves from causes to effects to solutions."),
    mc("detail", "What is the main cause of climate change, according to the text?", ["The burning of fossil fuels", "Volcanoes", "Recycling", "Planting trees"], "The main cause of climate change is the burning of fossil fuels", "Burning coal, oil and natural gas is named as the main cause."),
    tf("detail", "Deforestation plays a role because trees absorb CO2.", true, "Deforestation also plays a major role because trees absorb CO2.", "Trees absorb CO2, so cutting them down matters."),
    mc("detail", "Why are coral reefs dying?", ["The ocean is getting warmer and more acidic.", "People are taking them home.", "There are too many fish.", "The water is too cold."], "the ocean is getting warmer and more acidic", "Warmer, more acidic oceans are harming coral reefs."),
  ] },
  "society-big-cities": { level: "B1", questions: [
    mc("main-idea", "What is the main idea of the text?", ["City life has both advantages and disadvantages.", "Everyone should move to the countryside.", "Cities have no pollution.", "Public transport is always free."], "On the other hand, city life has its disadvantages.", "The text compares the benefits and problems of city life."),
    sa("vocabulary", "What is the name of the process of people moving to big cities? Write one word.", ["urbanization", "urbanisation"], "This process, known as urbanization", "This process is called urbanization."),
    tf("detail", "Less than half of the world’s population lives in urban areas today.", false, "Today, more than half of the global population lives in urban areas", "More than half lives in urban areas."),
    mc("detail", "Which cost is especially high in cities?", ["Housing", "Food", "Healthcare", "Education"], "The cost of living is usually much higher, especially for housing.", "Housing is named as especially expensive."),
  ] },
  "work-job-interview": { level: "B1", questions: [
    mc("main-idea", "What is the purpose of the text?", ["To give advice on preparing for a job interview", "To describe a famous company", "To explain how to write a novel", "To compare different jobs"], "Good preparation can help you feel more confident and increase your chances of success.", "Each paragraph gives practical interview advice."),
    mc("detail", "What should you do before the interview?", ["Research the company", "Ask for a higher salary", "Send a thank-you email", "Bring a friend"], "you should research the company thoroughly", "Researching the company helps you answer questions effectively."),
    tf("detail", "You should memorize your answers so they sound exactly the same every time.", false, "try to sound natural rather than memorized", "Prepare answers, but sound natural rather than memorized."),
    mc("inference", "Why does the writer recommend a thank-you email?", ["It shows appreciation and reminds the interviewer of your interest.", "It is required by law.", "It replaces the interview.", "It helps you ask for a lower salary."], "This shows your appreciation and reminds them of your interest in the job.", "The email shows appreciation and keeps your interest visible."),
  ] },
  "quieter-commute": { level: "B2", questions: [
    mc("main-idea", "What change does Karim make after the morning without his phone?", ["He chooses what to do on his journey instead of following a habit.", "He stops using his phone on every journey.", "He starts driving to work.", "He reads a novel every morning."], "he began to distinguish between choosing an activity and following a habit automatically", "He still uses his phone sometimes, but now he chooses deliberately."),
    mc("detail", "Why did Karim have no phone that morning?", ["Its battery ran out.", "He left it at home.", "A colleague borrowed it.", "It was stolen at the station."], "his phone battery ran out before he reached the station", "The battery ran out before he reached the station."),
    tf("detail", "Something extraordinary happened on Karim’s journey.", false, "Nothing extraordinary happened.", "The journey felt different only because his attention was free."),
    mc("vocabulary", "In the last paragraph, “modest” is closest in meaning to…", ["small", "expensive", "sudden", "proud"], "The change was modest", "A modest change is a small one."),
  ] },
  "team-changes-plan": { level: "B2", questions: [
    mc("main-idea", "Why did the team redesign the application?", ["Conversations with users showed different priorities.", "Their manager rejected it.", "They ran out of money.", "A competitor released a better app."], "The first conversations with potential users challenged their confidence.", "User conversations revealed questions the design did not answer well."),
    tf("detail", "The observations proved that every planned feature was unnecessary.", false, "These observations did not prove that every planned feature was unnecessary.", "They showed a mismatch of priorities, not that every feature was useless."),
    mc("detail", "What did one person want to know before opening a description?", ["The price", "The weather", "The opening time", "The organiser’s name"], "another wanted to know the price before opening a description", "One person wanted the price first."),
    mc("inference", "How do the designers view changing the plan?", ["As a response to new evidence", "As proof that planning is useless", "As a mistake they regret", "As a way to add more features"], "It was a response to evidence they had not possessed at the beginning.", "Changing the plan was a sensible response to new evidence."),
  ] },
  "tech-artificial-intelligence": { level: "B2", questions: [
    mc("main-idea", "What does the text do?", ["It explains what AI is, how it is used, and its benefits and risks.", "It argues that AI should be banned.", "It teaches how to program a robot.", "It reviews one smartphone."], "Artificial intelligence, or AI, is a branch of computer science", "The text defines AI, gives examples, and weighs benefits against risks."),
    mc("detail", "According to the text, how does an AI system improve?", ["By receiving more data", "By working fewer hours", "By being switched off at night", "By copying other machines"], "The more data an AI system receives, the better it becomes at its job.", "More data helps an AI system improve."),
    tf("detail", "Some people worry that AI will lead to unemployment.", true, "Some people worry that AI will replace human jobs and lead to unemployment.", "Job loss is one of the risks mentioned."),
    mc("inference", "Why does the writer say rules for AI are important?", ["To make sure AI is used safely and fairly", "To make AI faster", "To reduce the price of smartphones", "To stop doctors from using AI"], "create rules to ensure it is used safely and fairly for everyone", "Rules help ensure safe and fair use."),
  ] },
  "renewable-energy": { level: "B2", questions: [
    mc("main-idea", "What is the overall view of the text?", ["Renewable energy faces challenges but has a promising future.", "Renewable energy has completely failed.", "Fossil fuels are the key to the future.", "Only hydroelectric power matters."], "Looking ahead, the future of renewable energy appears promising.", "The text admits challenges but ends on a promising outlook."),
    mc("detail", "What is the largest source of renewable electricity worldwide?", ["Hydroelectric power", "Solar power", "Wind power", "Green hydrogen"], "Hydroelectric power remains the largest source of renewable electricity worldwide.", "Hydroelectric power is the largest source."),
    tf("detail", "Wind power works equally well in all weather conditions.", false, "it depends heavily on weather conditions", "Wind power depends heavily on the weather."),
    mc("detail", "What is described as one of the biggest challenges?", ["Energy storage", "Finding enough sunlight", "Training engineers", "Building roads"], "One of the biggest challenges facing renewable energy is the issue of energy storage.", "Storing excess energy is a major challenge."),
  ] },
  "mental-health": { level: "B2", questions: [
    mc("main-idea", "What is the main argument of the text?", ["Mental health deserves the same attention as physical health.", "Physical health matters more than mental health.", "Therapy never works.", "Workplaces should not discuss mental health."], "deserves the same attention as physical health", "The conclusion restates this central argument."),
    mc("detail", "What does the text describe as a major barrier to seeking help?", ["Stigma", "The cost of exercise", "Too many doctors", "Bad weather"], "stigma remains a major barrier to seeking help", "Fear of being judged stops many people from seeking help."),
    tf("detail", "Mental health support is already standard practice in every organisation.", false, "there is still a long way to go before mental health support becomes standard practice in every organisation", "The text says there is still a long way to go."),
    mc("detail", "Which lifestyle changes can improve mental well-being?", ["Regular exercise, a balanced diet and adequate sleep", "Working longer hours", "Avoiding friends", "Watching more television"], "regular exercise, a balanced diet, and adequate sleep", "These three changes are named in the third paragraph."),
  ] },
  "online-learning-pros-cons": { level: "B2", questions: [
    mc("main-idea", "Which conclusion does the text reach?", ["Blended learning is likely to become the norm.", "Online learning will completely replace schools.", "Online learning has no advantages.", "Teachers are no longer needed."], "blended learning models that combine online and in-person instruction are likely to become the norm", "The writer expects online and in-person teaching to be combined."),
    mc("detail", "Which event accelerated the shift to online learning?", ["The COVID-19 pandemic", "A new university law", "The invention of television", "A teachers’ strike"], "This shift has been accelerated by the COVID-19 pandemic", "The pandemic forced remote teaching almost overnight."),
    tf("detail", "Face-to-face social contact is easy to replicate online.", false, "The social aspect of traditional schooling is difficult to replicate in a virtual environment.", "The text says it is difficult to replicate."),
    mc("detail", "How can data analytics help teachers?", ["By tracking progress and identifying students who need support", "By replacing lectures", "By reducing screen time", "By lowering course fees"], "track student progress and identify those who may need additional support", "Analytics help teachers notice who needs extra support."),
  ] },
  "impact-of-globalization": { level: "C1", questions: [
    mc("main-idea", "What is the writer’s overall position on globalisation?", ["It has brought major benefits, but they are unequally shared and need reshaping.", "It has only harmed developing countries.", "It will soon end completely.", "It has no effect on culture."], "the benefits of globalisation have not been distributed equally across all regions and populations", "The text recognises growth while stressing uneven distribution."),
    tf("detail", "According to the text, complete deglobalisation seems likely.", false, "complete deglobalisation seems unlikely", "Deep economic ties make it unlikely."),
    mc("detail", "What has happened to many low-skilled workers in developed countries?", ["Their wages have stagnated.", "Their incomes have risen sharply.", "They have all moved abroad.", "They are unaffected by trade."], "low-skilled workers in developed countries have often experienced wage stagnation", "Many have experienced wage stagnation."),
    mc("inference", "Why can a crisis in one region spread quickly to others?", ["Supply chains have made economies interdependent.", "Cultural exchange has increased.", "Of the Brexit referendum.", "E-commerce has grown."], "The global supply chain has also made economies more interdependent", "Interdependent economies pass shocks to one another."),
  ] },
  "what-maps-leave-out": { level: "C1", questions: [
    mc("main-idea", "What is the central idea of the text?", ["Every map selects what to show, which shapes how readers understand a place.", "Maps for drivers are more accurate than maps for walkers.", "Exhibitions should include every observation.", "Landmarks are the most important details on a map."], "Through selection, scale and symbols, it makes some relationships prominent while allowing others to recede.", "Maps make choices, and those choices shape understanding."),
    tf("detail", "The residents included every observation in their final map.", false, "The group could not include every observation without making the result unreadable.", "Including everything would have made the map unreadable."),
    mc("detail", "How did the group deal with what their map left out?", ["They explained the choices behind it.", "They hid the choices.", "They made a second, complete map.", "They removed the landmarks."], "Instead, they explained the choices behind it.", "Explaining their choices let readers think about what was missing."),
    mc("inference", "What does the final question suggest?", ["Clear representations may owe some of their clarity to omissions.", "Maps should never leave anything out.", "Clarity always means accuracy.", "Readers prefer complicated maps."], "how much of that clarity comes from leaving things out?", "The question invites readers to ask what was omitted to make something look clear."),
  ] },
  "genetic-engineering": { level: "C1", questions: [
    mc("main-idea", "How would you describe the text’s overall approach?", ["It weighs the promise of gene editing against its ethical and ecological risks.", "It argues that gene editing should be banned everywhere.", "It celebrates gene editing without reservation.", "It focuses only on agriculture."], "striking a delicate balance between innovation and precaution", "The conclusion calls for balance between innovation and caution."),
    mc("detail", "What happened in 2018?", ["The first gene-edited twins were born.", "CRISPR-Cas9 was banned in Europe.", "Genetically modified crops were invented.", "Cystic fibrosis was cured."], "the controversial birth of the first gene-edited twins in 2018", "The birth of gene-edited twins prompted international condemnation."),
    tf("detail", "European nations prohibit most forms of human germline modification.", true, "prohibiting most forms of human germline modification", "European restrictions are described as stringent."),
    mc("detail", "What concern do critics raise about genetically modified crops?", ["Unforeseen ecological effects, such as reduced biodiversity", "They are too cheap", "They grow too slowly", "They need too much water"], "critics caution against unforeseen ecological repercussions", "Critics worry about reduced biodiversity and superweeds."),
  ] },
  "cybersecurity-digital-age": { level: "C1", questions: [
    mc("main-idea", "What is the central claim of the text?", ["Growing digital reliance makes cybersecurity a pressing, ongoing challenge.", "Cyber attacks have been fully solved.", "Privacy is unrelated to cybersecurity.", "Only IT departments need to care about security."], "has emerged as a pressing geopolitical and economic imperative", "Cybersecurity has moved from a niche concern to a central priority."),
    mc("detail", "What effect has ransomware-as-a-service had?", ["It has lowered the barrier to entry for criminals.", "It has made attacks impossible.", "It has reduced ransom demands.", "It has ended phishing."], "which has lowered the barrier to entry for would-be criminals", "People with little expertise can now buy malware."),
    tf("detail", "Zero-trust architecture assumes that no entity should be trusted by default.", true, "which assumes no entity should be trusted by default", "That is how the text defines zero-trust architecture."),
    mc("inference", "Why is international cooperation difficult?", ["Attacks are hard to attribute and no binding global framework exists.", "All countries already agree on the rules.", "States never attack one another online.", "Security experts are no longer needed."], "The attribution of cyber attacks is notoriously difficult", "Attribution problems and the lack of a binding framework complicate accountability."),
  ] },
  "cultural-diversity": { level: "C2", questions: [
    mc("main-idea", "What does the final paragraph propose as the basis of successful multicultural societies?", ["Belonging rooted in shared values and democratic institutions", "A single shared religion", "Ending migration", "Separating communities completely"], "rooted not in ethnic or religious identity but in shared values and democratic institutions", "Civic nationalism is defined by shared values and institutions."),
    tf("detail", "Critics argue that unchecked multiculturalism can lead to social fragmentation.", true, "Critics contend that unchecked multiculturalism can lead to social fragmentation", "This is the critics’ position in the third paragraph."),
    mc("detail", "According to the estimate cited, how often does a language die?", ["Every two weeks", "Every year", "Every day", "Every decade"], "one language dies every two weeks", "The text cites one language every two weeks."),
    mc("inference", "What does the writer imply about education policy?", ["Its politicisation can block meaningful progress.", "It has no role in social harmony.", "It should avoid teaching languages.", "It is free from political debate."], "often impedes meaningful progress", "Politicisation around identity and memory often impedes progress."),
  ] },
  "evolution-human-rights": { level: "C2", questions: [
    mc("main-idea", "What is the main purpose of the text?", ["To trace how human rights developed and the challenges they face today", "To argue that human rights are a luxury", "To describe the life of John Locke", "To explain refugee law in one country"], "is the product of centuries of philosophical inquiry, political struggle, and legal codification", "The text moves from origins to current and future challenges."),
    sa("detail", "In which year did the UN General Assembly adopt the Universal Declaration of Human Rights?", ["1948"], "In 1948, the United Nations General Assembly adopted the Universal Declaration of Human Rights", "It was adopted in 1948."),
    tf("detail", "The principle of non-refoulement allows states to return asylum seekers to places where they face serious threats.", false, "which prohibits returning asylum seekers to places where they face serious threats", "The principle prohibits such returns."),
    mc("inference", "What does the remark attributed to Kofi Annan suggest?", ["Human rights matter most when protecting them is inconvenient for the powerful.", "Human rights are only for peaceful times.", "Governments should decide when rights apply.", "Human rights are no longer needed."], "most needed precisely when it is most inconvenient for those in power", "Rights are a safeguard, not a luxury."),
  ] },
};

const migrated: ReadingLesson[] = ALL_ARTICLES.map(article => {
  const plan = MIGRATED[article.id];
  if (!plan) throw new Error(`Reading lesson plan missing for ${article.id}`);
  return {
    id: article.id, title: article.title, level: plan.level, category: article.category,
    paragraphs: article.paragraphs.map(p => p.en),
    glossary: article.vocabulary.map(v => ({ word: v.word, ar: v.ar, def: v.def })),
    questions: build(article.id, plan.questions), status: "published", source: "englishcamp", articleId: article.id,
  };
});

/** Original EnglishCamp beginner passages. They are published only after administrator review. */
const beginner: ReadingLesson[] = [
  {
    id: "a1-omar-morning", title: "Omar’s Morning", level: "A1", category: "Daily life", status: "review", source: "englishcamp",
    paragraphs: [
      "My name is Omar. I live in a small flat with my sister, Salma. I work in a bakery near our home.",
      "I get up at five o'clock every day. I drink a glass of water and I eat some bread with cheese. Then I walk to work. It takes ten minutes.",
      "At the bakery, I make bread and cakes. People come early to buy fresh bread. I finish work at one o'clock. In the afternoon, I go home and sleep for an hour.",
    ],
    glossary: [
      { word: "flat", ar: "شقة", def: "A home on one floor of a building." },
      { word: "bakery", ar: "مخبزة", def: "A shop or place where people make and sell bread and cakes." },
      { word: "fresh", ar: "طازج", def: "Made a short time ago; new and good to eat." },
      { word: "finish", ar: "يُنهي", def: "To stop doing something because it is done." },
    ],
    questions: build("a1-omar-morning", [
      mc("main-idea", "What is the text about?", ["Omar’s morning and his job", "A trip to the sea", "Salma’s school", "A cake recipe"], "I work in a bakery near our home.", "Omar describes his morning and his work at the bakery."),
      sa("detail", "What time does Omar get up? Write the time.", ["five o'clock", "5 o'clock", "five", "5", "5:00", "at five o'clock"], "I get up at five o'clock every day.", "He gets up at five o'clock."),
      tf("detail", "Omar takes the bus to work.", false, "Then I walk to work.", "He walks to work. It takes ten minutes."),
      mc("detail", "Where does Omar work?", ["In a bakery", "In a school", "In a hospital", "In a clothes shop"], "I work in a bakery near our home.", "He works in a bakery near his home."),
    ]),
  },
  {
    id: "a1-new-classmate", title: "A New Classmate", level: "A1", category: "Education", status: "review", source: "englishcamp",
    paragraphs: [
      "Today there is a new student in our English class. Her name is Hana. She is from Japan. She speaks Japanese and a little English.",
      "Hana sits next to me. She has a blue bag and a big green notebook. She likes music and drawing. I like music too!",
      "After class, we eat lunch together in the garden. Hana has rice and fish. I have a sandwich and an apple. We talk about our families. Hana has two brothers.",
    ],
    glossary: [
      { word: "student", ar: "طالب / طالبة", def: "A person who is learning at a school or in a class." },
      { word: "next to", ar: "بجانب", def: "Very close to someone or something, at the side." },
      { word: "notebook", ar: "دفتر", def: "A small book with empty pages for writing." },
      { word: "together", ar: "معًا", def: "With another person or other people." },
    ],
    questions: build("a1-new-classmate", [
      mc("main-idea", "What is the text mainly about?", ["Meeting a new classmate called Hana", "A music concert", "A trip to Japan", "Cooking rice"], "Today there is a new student in our English class.", "The writer meets Hana, a new student in the class."),
      sa("detail", "Where is Hana from? Write one word.", ["Japan"], "She is from Japan.", "Hana is from Japan."),
      tf("detail", "Hana has two sisters.", false, "Hana has two brothers.", "She has two brothers."),
      mc("detail", "What colour is Hana’s notebook?", ["Green", "Blue", "Red", "Black"], "a big green notebook", "Her bag is blue, but her notebook is green."),
    ]),
  },
  {
    id: "a1-saturday-market", title: "Saturday at the Market", level: "A1", category: "Food", status: "review", source: "englishcamp",
    paragraphs: [
      "On Saturday morning, I go to the market with my mother. The market is big and busy. There are many people.",
      "We buy tomatoes, onions and oranges. The oranges are sweet and cheap. My mother also buys fresh fish for dinner.",
      "I carry the bags because they are heavy. We are tired, but we are happy. At home, we make a big salad and cook the fish.",
    ],
    glossary: [
      { word: "market", ar: "سوق", def: "A place where people buy and sell food and other things." },
      { word: "busy", ar: "مزدحم", def: "Full of people or activity." },
      { word: "cheap", ar: "رخيص", def: "Not expensive; low in price." },
      { word: "heavy", ar: "ثقيل", def: "Difficult to carry because it weighs a lot." },
    ],
    questions: build("a1-saturday-market", [
      mc("main-idea", "What is the text about?", ["A family trip to the market", "A football match", "A day at school", "A visit to a doctor"], "I go to the market with my mother.", "The writer and their mother shop at the market."),
      tf("detail", "The oranges are expensive.", false, "The oranges are sweet and cheap.", "The oranges are cheap."),
      sa("detail", "What does the mother buy for dinner? Write one or two words.", ["fish", "fresh fish"], "My mother also buys fresh fish for dinner.", "She buys fresh fish for dinner."),
      mc("detail", "Why does the writer carry the bags?", ["They are heavy.", "They are empty.", "The mother is at work.", "It is raining."], "I carry the bags because they are heavy.", "The bags are heavy."),
    ]),
  },
  {
    id: "a1-leila-family", title: "Leila’s Family", level: "A1", category: "Family", status: "review", source: "englishcamp",
    paragraphs: [
      "This is my family. My name is Leila. I live in a house with my parents and my two brothers. We also have a small cat. Her name is Mimi.",
      "My father is a teacher. He teaches maths at a big school. My mother is a nurse. She works at the hospital at night. My brothers are students.",
      "On Fridays, my grandmother visits us. She cooks couscous for lunch, and we all eat together. After lunch, we drink tea and talk. I love Fridays!",
    ],
    glossary: [
      { word: "parents", ar: "الوالدان", def: "Your mother and father." },
      { word: "nurse", ar: "ممرّضة / ممرّض", def: "A person who cares for sick people in a hospital." },
      { word: "grandmother", ar: "جدّة", def: "The mother of your mother or father." },
      { word: "visit", ar: "يزور", def: "To go and see a person or a place." },
    ],
    questions: build("a1-leila-family", [
      mc("main-idea", "What is the text about?", ["Leila’s family", "A trip to the hospital", "A school for cats", "A cooking class"], "This is my family.", "Leila describes the people in her family and their Fridays together."),
      sa("detail", "What is the cat’s name? Write one word.", ["Mimi"], "Her name is Mimi.", "The cat is called Mimi."),
      tf("detail", "Leila’s mother works at a school.", false, "My mother is a nurse.", "Her mother is a nurse at the hospital. Her father is the teacher."),
      mc("detail", "Who cooks lunch on Fridays?", ["Her grandmother", "Her father", "Leila", "Her brothers"], "She cooks couscous for lunch", "Her grandmother visits and cooks couscous."),
    ]),
  },
  {
    id: "a1-rainy-day", title: "A Rainy Day", level: "A1", category: "Weather", status: "review", source: "englishcamp",
    paragraphs: [
      "Today is Monday. It is cold and it is raining. I look out of the window. The street is wet and the sky is grey.",
      "I put on my coat and my boots. I take a big red umbrella. Then I walk to the bus stop. The bus is late today, so I wait for fifteen minutes.",
      "At work, my friend Sami gives me a cup of hot tea. 'Thank you!' I say. In the evening, the rain stops. The sun comes out, and I walk home.",
    ],
    glossary: [
      { word: "umbrella", ar: "مظلّة", def: "A thing you hold over your head when it rains." },
      { word: "wet", ar: "مبلّل", def: "Covered with water." },
      { word: "late", ar: "متأخّر", def: "After the usual or planned time." },
      { word: "wait", ar: "ينتظر", def: "To stay in a place until something happens." },
    ],
    questions: build("a1-rainy-day", [
      mc("main-idea", "What is the text mainly about?", ["A cold, rainy day", "A holiday at the beach", "A new job", "A birthday party"], "It is cold and it is raining.", "The writer describes a rainy Monday from morning to evening."),
      tf("detail", "The writer’s umbrella is red.", true, "I take a big red umbrella.", "It is a big red umbrella."),
      sa("detail", "How many minutes does the writer wait for the bus? Write a number.", ["15", "fifteen"], "so I wait for fifteen minutes", "The bus is late, so the writer waits fifteen minutes."),
      mc("detail", "What does Sami give the writer?", ["A cup of hot tea", "An umbrella", "A coat", "A bus ticket"], "my friend Sami gives me a cup of hot tea", "Sami gives the writer hot tea at work."),
    ]),
  },
  {
    id: "a1-new-shoes", title: "New Shoes", level: "A1", category: "Shopping", status: "review", source: "englishcamp",
    paragraphs: [
      "I need new shoes for school. On Saturday, I go to a shoe shop with my father. The shop is next to the bank.",
      "I see black shoes and white shoes. The black shoes are nice, but they are too small. The white shoes are big and comfortable. They cost two hundred dirhams.",
      "My father pays at the till. The shop assistant puts the shoes in a box. I am very happy. I wear my new shoes on Monday.",
    ],
    glossary: [
      { word: "comfortable", ar: "مريح", def: "Nice to wear or to sit in; it does not hurt." },
      { word: "cost", ar: "يكلّف", def: "To have a price." },
      { word: "pay", ar: "يدفع", def: "To give money for something you buy." },
      { word: "shop assistant", ar: "بائع / بائعة في متجر", def: "A person who helps customers in a shop." },
    ],
    questions: build("a1-new-shoes", [
      mc("main-idea", "What is the text about?", ["Buying new shoes", "Opening a bank account", "A football game", "Cleaning the house"], "I need new shoes for school.", "The writer goes shopping for school shoes."),
      tf("detail", "The black shoes are too small.", true, "they are too small", "The black shoes are nice, but too small."),
      mc("inference", "Which shoes does the writer buy?", ["The white shoes", "The black shoes", "Red boots", "Blue shoes"], "The white shoes are big and comfortable.", "The black shoes are too small, so they buy the comfortable white shoes."),
      sa("detail", "How much do the white shoes cost? Write the number.", ["200", "two hundred", "200 dirhams", "two hundred dirhams"], "They cost two hundred dirhams.", "They cost two hundred dirhams."),
    ]),
  },
  {
    id: "a1-karim-free-time", title: "Karim’s Free Time", level: "A1", category: "Free time", status: "review", source: "englishcamp",
    paragraphs: [
      "My name is Karim. I am twenty-five years old. In my free time, I play football. I play with my friends in the park every Sunday morning.",
      "I also like music. I listen to music on the bus to work. My favourite singer is from Egypt. I do not play an instrument, but I want to learn the guitar.",
      "In the evening, I am often tired. I read a book or watch a film at home. I go to bed at eleven o'clock.",
    ],
    glossary: [
      { word: "free time", ar: "وقت الفراغ", def: "Time when you are not working or studying." },
      { word: "favourite", ar: "مفضّل", def: "The one you like best." },
      { word: "instrument", ar: "آلة موسيقية", def: "A thing you play to make music, like a guitar." },
      { word: "tired", ar: "متعب", def: "Needing rest or sleep." },
    ],
    questions: build("a1-karim-free-time", [
      mc("main-idea", "What is the text about?", ["Karim’s free time", "Karim’s family", "A trip to Egypt", "A football club"], "In my free time, I play football.", "Karim describes what he does when he is not working."),
      sa("detail", "How old is Karim? Write a number.", ["25", "twenty-five", "twenty five"], "I am twenty-five years old.", "Karim is twenty-five."),
      tf("detail", "Karim plays the guitar.", false, "I do not play an instrument", "He does not play an instrument yet, but he wants to learn the guitar."),
      mc("detail", "When does Karim play football?", ["On Sunday mornings", "On Friday evenings", "Every day after work", "On Saturday nights"], "every Sunday morning", "He plays with friends in the park every Sunday morning."),
    ]),
  },
  {
    id: "b1-night-market", title: "The Night Market", level: "B1", category: "Society", status: "review", source: "englishcamp",
    paragraphs: [
      "Every summer, our town opens a night market in the old square. From seven in the evening until midnight, the square fills with stalls selling grilled corn, fresh juice, handmade bags and second-hand books. Families come after dinner, and teenagers meet their friends there because it is cooler than the afternoon.",
      "This year, my cousin Yasmine decided to rent a stall. She bakes small almond cakes at home, and her neighbours had always told her they were delicious. The first night was difficult. She had prepared too few cakes, and they were sold out in less than an hour. On the second night, she made twice as many, but it rained and very few people came.",
      "By the end of the month, Yasmine had learned to check the weather forecast and to bring a notebook to write down what people asked for. Several customers wanted cakes without sugar, so she started making a second recipe. She did not earn a lot of money, but she now plans to sell her cakes at a weekend market all year.",
    ],
    glossary: [
      { word: "stall", ar: "كشك / بسطة في السوق", def: "A table or small shop where things are sold at a market." },
      { word: "second-hand", ar: "مستعمل", def: "Owned by someone else before." },
      { word: "forecast", ar: "توقّعات (الطقس)", def: "A statement about what the weather will be like." },
      { word: "customer", ar: "زبون", def: "A person who buys something." },
      { word: "recipe", ar: "وصفة طبخ", def: "Instructions for making a dish." },
    ],
    questions: build("b1-night-market", [
      mc("main-idea", "What is the story mainly about?", ["Yasmine learning to run a small market stall", "The history of the old square", "How to bake almond cakes", "Why teenagers like summer"], "This year, my cousin Yasmine decided to rent a stall.", "The story follows Yasmine’s first month selling cakes at the market."),
      mc("detail", "What happened on the first night?", ["Her cakes sold out in less than an hour.", "It rained and few people came.", "She forgot her notebook.", "Nobody liked her cakes."], "they were sold out in less than an hour", "She had prepared too few cakes, so they sold out quickly."),
      tf("detail", "On the second night, many people came to the market.", false, "it rained and very few people came", "It rained on the second night, and very few people came."),
      mc("inference", "Why did Yasmine start making a second recipe?", ["Several customers asked for cakes without sugar.", "Almond cakes were too expensive.", "Her neighbours did not like them.", "The market only sold healthy food."], "Several customers wanted cakes without sugar", "She listened to what customers asked for."),
    ]),
  },
  {
    id: "b1-learning-to-drive", title: "Learning to Drive at Forty-One", level: "B1", category: "Daily life", status: "review", source: "englishcamp",
    paragraphs: [
      "Samira never needed a car when she lived in the city centre. Buses and trams took her everywhere, and she enjoyed reading during her journeys. However, when her company moved to an office outside the city, her trip to work suddenly took almost two hours. At forty-one, she decided it was time to learn to drive.",
      "Her first lessons were stressful. She was nervous on busy roads, and she often forgot to check her mirrors. Her instructor, a calm man called Hassan, suggested practising early on Sunday mornings, when the streets were quiet. He also told her to describe aloud everything she saw, so that she would notice more.",
      "Samira failed her first driving test because she stopped too late at a crossing. She was disappointed, but she booked another test for the following month. This time she passed. Now her journey takes forty minutes, and although she misses reading on the bus, she says the experience taught her that it is never too late to learn something new.",
    ],
    glossary: [
      { word: "instructor", ar: "مدرّب", def: "A person who teaches a practical skill." },
      { word: "nervous", ar: "متوتّر / قلق", def: "Worried and a little afraid." },
      { word: "mirror", ar: "مرآة", def: "Glass in which you can see what is behind you in a car." },
      { word: "disappointed", ar: "خائب الأمل", def: "Sad because something did not happen as you hoped." },
    ],
    questions: build("b1-learning-to-drive", [
      mc("main-idea", "What is the main message of the story?", ["It is never too late to learn a new skill.", "Public transport is better than driving.", "Driving instructors are always calm.", "Samira’s company made a bad decision."], "it is never too late to learn something new", "Samira learns to drive at forty-one and passes on her second try."),
      sa("detail", "How old was Samira when she decided to learn to drive? Write a number.", ["41", "forty-one", "forty one"], "At forty-one, she decided it was time to learn to drive.", "She was forty-one."),
      tf("detail", "Samira passed her first driving test.", false, "Samira failed her first driving test", "She failed the first test and passed the second."),
      mc("detail", "Why did Hassan suggest practising on Sunday mornings?", ["The streets were quiet.", "Tests were cheaper on Sundays.", "Samira worked on other days.", "It was easier to see the mirrors."], "when the streets were quiet", "Quiet streets helped Samira feel less nervous."),
    ]),
  },
  {
    id: "b1-beach-clean-up", title: "Cleaning the Beach", level: "B1", category: "Environment", status: "review", source: "englishcamp",
    paragraphs: [
      "Last spring, a group of students from a language school in Agadir organised a beach clean-up. They had noticed that, after busy weekends, the sand near the harbour was covered with plastic bottles, bags and food wrappers. Instead of only complaining, they posted a message online and invited anyone who wanted to help.",
      "On the first Saturday, about thirty people arrived with gloves and large bags. In three hours they collected more than two hundred kilograms of rubbish. A local café offered free tea, and a fisherman explained how plastic can harm fish and birds. Some volunteers were surprised to learn that tiny pieces of plastic are much harder to remove than large ones.",
      "The clean-up is now a monthly event. The organisers also asked the town council to put more bins near the harbour, and three new bins were installed in the summer. The beach is not perfect, but the students believe that small, regular actions can change people's habits more effectively than one big campaign.",
    ],
    glossary: [
      { word: "harbour", ar: "ميناء", def: "A place on the coast where boats stay." },
      { word: "volunteer", ar: "متطوّع", def: "A person who works without being paid." },
      { word: "harm", ar: "يضرّ / يؤذي", def: "To hurt or damage." },
      { word: "council", ar: "مجلس (بلدي)", def: "A group of people elected to run a town." },
      { word: "habit", ar: "عادة", def: "Something you do often, usually without thinking." },
    ],
    questions: build("b1-beach-clean-up", [
      mc("main-idea", "What is the text mainly about?", ["Students who organised regular beach clean-ups", "The history of Agadir harbour", "How fishermen catch fish", "A language school’s summer courses"], "a group of students from a language school in Agadir organised a beach clean-up", "The text follows the clean-up from the first day to a monthly event."),
      mc("detail", "How much rubbish did volunteers collect on the first Saturday?", ["More than two hundred kilograms", "About thirty kilograms", "Three bags", "Exactly one hundred kilograms"], "more than two hundred kilograms of rubbish", "Thirty people collected more than two hundred kilograms in three hours."),
      tf("detail", "Small pieces of plastic are easier to remove than large ones.", false, "tiny pieces of plastic are much harder to remove than large ones", "Tiny pieces are much harder to remove."),
      mc("inference", "What do the students believe?", ["Small, regular actions can change habits.", "Only big campaigns work.", "The beach is now perfect.", "Bins are not useful."], "small, regular actions can change people's habits", "They prefer regular small actions to one big campaign."),
    ]),
  },
  {
    id: "b1-language-exchange", title: "A Friend from Another Country", level: "B1", category: "Communication", status: "review", source: "englishcamp",
    paragraphs: [
      "When Omar joined an online language exchange, he expected to practise English for a few weeks and then stop. His partner was Lucy, a nurse from Manchester who was learning Arabic. They agreed to talk twice a week: thirty minutes in English and thirty minutes in Arabic.",
      "At first, their conversations were short and a little uncomfortable. They talked about the weather and their jobs, and both of them checked a dictionary often. Gradually, they began to share more personal stories. Lucy described long night shifts at the hospital, and Omar explained the busy month before his sister's wedding. Each of them corrected the other's mistakes, but only when the other person asked.",
      "After a year, Omar's English had improved more than he expected, especially his listening. More importantly, he had a real friend. Last summer, Lucy visited Morocco and attended a family dinner. Omar says the exchange worked because they were patient and treated each other as equals, not as teacher and student.",
    ],
    glossary: [
      { word: "exchange", ar: "تبادل", def: "Giving something and receiving something in return." },
      { word: "partner", ar: "شريك", def: "A person you do an activity with." },
      { word: "gradually", ar: "تدريجيًا", def: "Slowly, over a period of time." },
      { word: "shift", ar: "نوبة عمل", def: "A fixed period of work, for example at night." },
      { word: "patient", ar: "صبور", def: "Able to wait calmly without getting angry." },
    ],
    questions: build("b1-language-exchange", [
      mc("main-idea", "Why does Omar think the language exchange worked?", ["They were patient and treated each other as equals.", "Lucy was a professional teacher.", "They talked every day for hours.", "They only spoke English."], "they were patient and treated each other as equals", "Omar gives this reason in the last sentence."),
      sa("detail", "How many times a week did Omar and Lucy agree to talk? Write a number.", ["2", "two", "twice", "twice a week", "two times"], "They agreed to talk twice a week", "They talked twice a week."),
      tf("detail", "Omar and Lucy corrected every mistake, even when nobody asked.", false, "but only when the other person asked", "They corrected mistakes only when asked."),
      mc("detail", "What is Lucy’s job?", ["She is a nurse.", "She is a teacher.", "She is a translator.", "She is a doctor."], "a nurse from Manchester", "Lucy is a nurse from Manchester."),
    ]),
  },
  {
    id: "a1-my-cat-mimi", title: "My Cat Mimi", level: "A1", category: "Animals", status: "review", source: "englishcamp",
    paragraphs: [
      "I have a cat. Her name is Mimi. She is three years old. She is white with a black tail.",
      "Mimi sleeps a lot. In the morning, she sleeps on my bed. In the afternoon, she sleeps in the sun near the window.",
      "Mimi eats fish and drinks milk. She does not like dogs. When my neighbour's dog comes, Mimi runs under the table.",
    ],
    glossary: [
      { word: "tail", ar: "ذيل", def: "The long part at the back of an animal's body." },
      { word: "sleep", ar: "ينام", def: "To rest with your eyes closed." },
      { word: "window", ar: "نافذة", def: "An opening in a wall with glass in it." },
      { word: "neighbour", ar: "جار", def: "A person who lives near you." },
    ],
    questions: build("a1-my-cat-mimi", [
      mc("main-idea", "What is the text about?", ["A pet cat", "A big dog", "A fish shop", "A new bed"], "I have a cat. Her name is Mimi.", "The text describes Mimi, the writer's cat."),
      sa("detail", "How old is Mimi? Write a number.", ["3", "three", "three years old", "3 years old"], "She is three years old.", "Mimi is three years old."),
      tf("detail", "Mimi likes dogs.", false, "She does not like dogs.", "She does not like dogs. She runs under the table."),
      mc("detail", "Where does Mimi sleep in the afternoon?", ["In the sun near the window", "On the bed", "Under the table", "In the garden"], "In the afternoon, she sleeps in the sun near the window.", "In the morning she sleeps on the bed; in the afternoon, near the window."),
    ]),
  },
  {
    id: "a1-at-the-cafe", title: "At the Café", level: "A1", category: "Food", status: "review", source: "englishcamp",
    paragraphs: [
      "It is Sunday. Nadia and her friend Yasmine go to a café in the city centre. The café is small but nice.",
      "Nadia orders a mint tea and a piece of chocolate cake. Yasmine orders an orange juice and a croissant. The waiter is very friendly.",
      "They sit outside and talk for an hour. The bill is sixty dirhams. Nadia pays today, and Yasmine pays next week.",
    ],
    glossary: [
      { word: "order", ar: "يطلب", def: "To ask for food or drink in a café or restaurant." },
      { word: "waiter", ar: "نادل", def: "A person who brings food and drinks to tables." },
      { word: "outside", ar: "في الخارج", def: "Not in a building." },
      { word: "bill", ar: "الفاتورة", def: "A paper that shows how much you must pay." },
    ],
    questions: build("a1-at-the-cafe", [
      mc("main-idea", "What is the text about?", ["Two friends at a café", "A new job at a café", "How to make cake", "A trip to another city"], "Nadia and her friend Yasmine go to a café in the city centre.", "Nadia and Yasmine spend time at a café."),
      mc("detail", "What does Nadia drink?", ["Mint tea", "Orange juice", "Coffee", "Water"], "Nadia orders a mint tea", "Nadia has mint tea. Yasmine has orange juice."),
      sa("detail", "How much is the bill? Write the number.", ["60", "sixty", "sixty dirhams", "60 dirhams"], "The bill is sixty dirhams.", "The bill is sixty dirhams."),
      tf("detail", "Yasmine pays today.", false, "Nadia pays today, and Yasmine pays next week.", "Nadia pays today. Yasmine pays next week."),
    ]),
  },
  {
    id: "a1-my-bedroom", title: "My Bedroom", level: "A1", category: "Home", status: "review", source: "englishcamp",
    paragraphs: [
      "My bedroom is small, but I love it. The walls are yellow. There is one big window.",
      "There is a bed, a desk and a chair in my room. My books are on a shelf above the desk. My clothes are in a brown cupboard.",
      "I do my homework at the desk every evening. At night, I read a book in bed before I sleep.",
    ],
    glossary: [
      { word: "wall", ar: "حائط / جدار", def: "One of the sides of a room." },
      { word: "desk", ar: "مكتب", def: "A table where you write or study." },
      { word: "shelf", ar: "رفّ", def: "A flat board on a wall for keeping things on." },
      { word: "cupboard", ar: "خزانة", def: "A piece of furniture with doors where you keep things." },
    ],
    questions: build("a1-my-bedroom", [
      mc("main-idea", "What is the text about?", ["The writer's bedroom", "A school library", "A furniture shop", "A big house"], "My bedroom is small, but I love it.", "The writer describes their bedroom."),
      mc("detail", "What colour are the walls?", ["Yellow", "Brown", "White", "Blue"], "The walls are yellow.", "The walls are yellow. The cupboard is brown."),
      tf("detail", "The books are on a shelf above the desk.", true, "My books are on a shelf above the desk.", "Yes, the books are on a shelf above the desk."),
      sa("detail", "Where are the clothes? Write one word.", ["cupboard", "in a cupboard", "in the cupboard", "in a brown cupboard", "wardrobe"], "My clothes are in a brown cupboard.", "The clothes are in a brown cupboard."),
    ]),
  },
  {
    id: "a1-a-visit-to-grandma", title: "A Visit to Grandma", level: "A1", category: "Family", status: "review", source: "englishcamp",
    paragraphs: [
      "Every Friday, I visit my grandmother. She lives in a village near the mountains. I go there by bus with my mother.",
      "My grandmother has a garden with tomatoes, mint and lemon trees. She also has six chickens. I help her give food to the chickens.",
      "We eat lunch together. Grandma makes couscous for us. After lunch, she tells us stories about her life when she was young.",
    ],
    glossary: [
      { word: "village", ar: "قرية", def: "A very small town in the countryside." },
      { word: "garden", ar: "حديقة / بستان", def: "Land near a house where people grow plants." },
      { word: "chicken", ar: "دجاجة", def: "A bird that people keep for eggs and meat." },
      { word: "story", ar: "قصة / حكاية", def: "A description of things that happened, told to other people." },
    ],
    questions: build("a1-a-visit-to-grandma", [
      mc("main-idea", "What is the text about?", ["Visiting a grandmother in her village", "Buying chickens at a market", "A school trip to the mountains", "Cooking lessons in the city"], "Every Friday, I visit my grandmother.", "The writer visits Grandma every Friday."),
      mc("detail", "How does the writer go to the village?", ["By bus", "By car", "On foot", "By train"], "I go there by bus with my mother.", "They go by bus."),
      sa("detail", "How many chickens does Grandma have? Write a number.", ["6", "six", "six chickens"], "She also has six chickens.", "She has six chickens."),
      tf("detail", "Grandma makes couscous for lunch.", true, "Grandma makes couscous for us.", "Yes, she makes couscous."),
    ]),
  },
  {
    id: "a1-my-school-day", title: "My School Day", level: "A1", category: "Education", status: "review", source: "englishcamp",
    paragraphs: [
      "My name is Adam. I am a student at a high school in Fes. School starts at eight o'clock.",
      "I have six lessons every day. My favourite lesson is science. I don't like history very much. At ten o'clock we have a short break, and I play football with my friends.",
      "School finishes at four o'clock. Then I go home, I have a snack and I do my homework.",
    ],
    glossary: [
      { word: "lesson", ar: "حصة / درس", def: "A time when you learn something in class." },
      { word: "favourite", ar: "المفضّل", def: "The one you like more than all the others." },
      { word: "break", ar: "استراحة", def: "A short time when you stop working or studying." },
      { word: "snack", ar: "وجبة خفيفة", def: "A small amount of food eaten between meals." },
    ],
    questions: build("a1-my-school-day", [
      mc("main-idea", "What is the text about?", ["Adam's day at school", "A football match", "Adam's family in Fes", "A science test"], "I am a student at a high school in Fes.", "Adam describes a normal school day."),
      sa("detail", "How many lessons does Adam have every day? Write a number.", ["6", "six", "six lessons"], "I have six lessons every day.", "He has six lessons."),
      mc("detail", "What is Adam's favourite lesson?", ["Science", "History", "English", "Sport"], "My favourite lesson is science.", "He likes science. He doesn't like history very much."),
      tf("detail", "School finishes at four o'clock.", true, "School finishes at four o'clock.", "Yes. School starts at eight and finishes at four."),
    ]),
  },
  {
    id: "a1-the-weekend", title: "The Weekend", level: "A1", category: "Free time", status: "review", source: "englishcamp",
    paragraphs: [
      "I work from Monday to Friday, so I love the weekend. On Saturday morning, I clean my flat and wash my clothes.",
      "On Saturday afternoon, I go to the gym with my brother. In the evening, we watch a film or play cards with our friends.",
      "On Sunday, I get up late, at ten o'clock. I call my parents and then I go for a walk by the river.",
    ],
    glossary: [
      { word: "weekend", ar: "عطلة نهاية الأسبوع", def: "Saturday and Sunday." },
      { word: "clean", ar: "ينظّف", def: "To make something not dirty." },
      { word: "gym", ar: "قاعة رياضة", def: "A place where people exercise." },
      { word: "river", ar: "نهر", def: "A long line of water that moves across land." },
    ],
    questions: build("a1-the-weekend", [
      mc("main-idea", "What is the text about?", ["What the writer does at the weekend", "The writer's job", "A film at the cinema", "Life by the river"], "I work from Monday to Friday, so I love the weekend.", "The text describes Saturday and Sunday."),
      mc("detail", "Who does the writer go to the gym with?", ["Their brother", "Their parents", "A friend from work", "Nobody"], "I go to the gym with my brother.", "They go to the gym with their brother."),
      tf("detail", "On Sunday, the writer gets up early.", false, "On Sunday, I get up late, at ten o'clock.", "They get up late, at ten o'clock."),
      sa("detail", "Where does the writer go for a walk on Sunday?", ["by the river", "the river", "river", "near the river"], "I go for a walk by the river.", "They walk by the river."),
    ]),
  },
  {
    id: "a2-lost-phone", title: "The Lost Phone", level: "A2", category: "Daily life", status: "review", source: "englishcamp",
    paragraphs: [
      "Last Tuesday, Youssef left his phone on the train. He only noticed when he arrived at his office and wanted to call a client. He felt terrible, because all his photos and contacts were on it.",
      "His colleague Amal had an idea. She called Youssef's number from her phone. After a few rings, a woman answered. She said she had found the phone on a seat and was going to take it to the station office.",
      "That evening, Youssef went to the station and got his phone back. To say thank you, he left a box of chocolates for the woman. Now he always checks his pockets before he gets off the train.",
    ],
    glossary: [
      { word: "notice", ar: "يلاحظ", def: "To see or become aware of something." },
      { word: "client", ar: "زبون / عميل", def: "A person who pays for a service from a company." },
      { word: "colleague", ar: "زميل عمل", def: "A person you work with." },
      { word: "pocket", ar: "جيب", def: "A small bag sewn into clothes." },
    ],
    questions: build("a2-lost-phone", [
      mc("main-idea", "What is the story mainly about?", ["How Youssef got his lost phone back", "Youssef's new job", "A woman who stole a phone", "Buying a new phone"], "That evening, Youssef went to the station and got his phone back.", "Youssef loses his phone and gets it back the same day."),
      mc("detail", "Where did Youssef leave his phone?", ["On the train", "At the office", "In a café", "At home"], "Youssef left his phone on the train.", "He left it on the train."),
      tf("detail", "Amal found the phone on a seat.", false, "She said she had found the phone on a seat", "A woman on the train found it. Amal called the number."),
      mc("inference", "What does Youssef do differently now?", ["He checks his pockets before he gets off the train.", "He drives to work.", "He never takes his phone to work.", "He keeps chocolates in his bag."], "Now he always checks his pockets before he gets off the train.", "He learned to check his pockets."),
    ]),
  },
  {
    id: "a2-cooking-class", title: "My First Cooking Class", level: "A2", category: "Food", status: "review", source: "englishcamp",
    paragraphs: [
      "I can't cook very well, so last month I joined a cooking class. The class is on Wednesday evenings in a small restaurant kitchen. There are eight students and one teacher, Chef Rachid.",
      "In the first lesson, we made a vegetable tagine. Chef Rachid showed us how to cut onions quickly without crying. I cut my finger a little, but it wasn't serious.",
      "My tagine wasn't perfect. It had too much salt. But my family ate it all and said it was delicious. Next week we are going to learn how to make bread.",
    ],
    glossary: [
      { word: "join", ar: "ينضمّ إلى", def: "To become a member of a group or class." },
      { word: "kitchen", ar: "مطبخ", def: "A room where food is cooked." },
      { word: "serious", ar: "خطير", def: "Bad or dangerous." },
      { word: "delicious", ar: "لذيذ", def: "Very good to eat." },
    ],
    questions: build("a2-cooking-class", [
      mc("main-idea", "What is the text about?", ["The writer's first cooking class", "How to open a restaurant", "A famous chef's life", "A family dinner party"], "last month I joined a cooking class", "The writer describes the first lesson of a cooking class."),
      sa("detail", "How many students are in the class? Write a number.", ["8", "eight", "eight students"], "There are eight students and one teacher", "There are eight students."),
      tf("detail", "The writer's tagine had too much salt.", true, "It had too much salt.", "Yes, it had too much salt."),
      mc("detail", "What will the class learn next week?", ["How to make bread", "How to make a tagine", "How to cut onions", "How to make cakes"], "Next week we are going to learn how to make bread.", "Next week they will make bread."),
    ]),
  },
  {
    id: "a2-new-neighbours", title: "New Neighbours", level: "A2", category: "Community", status: "review", source: "englishcamp",
    paragraphs: [
      "A month ago, a young family moved into the flat next to ours. At first, we only said hello on the stairs. They had two small children, and we could hear them playing in the evening.",
      "One day, the mother, Sara, knocked on our door. She needed some sugar because the shops were closed. My mother gave her the sugar and invited her in for tea. They talked for two hours.",
      "Now our families are good friends. The children call my mother 'auntie', and Sara sometimes brings us cakes. My mother says that a good neighbour is better than a far relative.",
    ],
    glossary: [
      { word: "move into", ar: "ينتقل للسكن في", def: "To start living in a new home." },
      { word: "stairs", ar: "درج / سلالم", def: "Steps that go from one floor to another." },
      { word: "knock", ar: "يطرق (الباب)", def: "To hit a door to show you are there." },
      { word: "relative", ar: "قريب (من العائلة)", def: "A person in your family." },
    ],
    questions: build("a2-new-neighbours", [
      mc("main-idea", "What is the story mainly about?", ["How two neighbouring families became friends", "A family that moved to another city", "Problems with noisy children", "How to make cakes"], "Now our families are good friends.", "The families start as strangers and become friends."),
      mc("detail", "Why did Sara knock on the door?", ["She needed some sugar.", "The children were too noisy.", "She wanted to sell cakes.", "She was lost."], "She needed some sugar because the shops were closed.", "She needed sugar because the shops were closed."),
      sa("detail", "How long did the two mothers talk? Write the time.", ["two hours", "2 hours", "for two hours", "2"], "They talked for two hours.", "They talked for two hours."),
      tf("detail", "The family moved in a year ago.", false, "A month ago, a young family moved into the flat next to ours.", "They moved in a month ago."),
    ]),
  },
  {
    id: "a2-train-to-marrakech", title: "The Train to Marrakech", level: "A2", category: "Travel", status: "review", source: "englishcamp",
    paragraphs: [
      "Last summer, my cousin and I travelled from Rabat to Marrakech by train. We bought our tickets online a week before the trip, so they were cheaper.",
      "The journey took about four hours. The train was comfortable and had air conditioning, which was important because it was very hot outside. We read, listened to music and looked at the countryside from the window.",
      "In Marrakech, we stayed for three days. We visited the old medina and the gardens. On the last evening, we ate dinner in Jemaa el-Fna square. It was noisy, but the food was excellent.",
    ],
    glossary: [
      { word: "journey", ar: "رحلة", def: "Travelling from one place to another." },
      { word: "comfortable", ar: "مريح", def: "Pleasant to sit in or use." },
      { word: "countryside", ar: "الريف", def: "Land outside towns and cities, with fields and farms." },
      { word: "noisy", ar: "صاخب", def: "Full of loud sounds." },
    ],
    questions: build("a2-train-to-marrakech", [
      mc("main-idea", "What is the text about?", ["A train trip to Marrakech", "Life in Rabat", "How to buy a train", "A restaurant in Marrakech"], "my cousin and I travelled from Rabat to Marrakech by train", "The writer describes a trip by train and the stay in Marrakech."),
      mc("detail", "Why were the tickets cheaper?", ["They bought them a week before the trip.", "They travelled at night.", "They were students.", "The train was old."], "We bought our tickets online a week before the trip, so they were cheaper.", "Buying early made them cheaper."),
      sa("detail", "How many days did they stay in Marrakech? Write a number.", ["3", "three", "three days", "3 days"], "In Marrakech, we stayed for three days.", "They stayed three days."),
      tf("detail", "The train had no air conditioning.", false, "The train was comfortable and had air conditioning", "It had air conditioning."),
    ]),
  },
  {
    id: "b1-working-from-home", title: "Working from Home", level: "B1", category: "Work", status: "review", source: "englishcamp",
    paragraphs: [
      "Two years ago, Ines's company allowed employees to work from home three days a week. At first, she thought it would be perfect. She would save an hour of travel every day and could start work in comfortable clothes.",
      "After a few weeks, however, she noticed some problems. She found it hard to stop working in the evening because her laptop was always on the kitchen table. She also missed chatting with colleagues during lunch, and she sometimes felt lonely.",
      "Now she follows a few simple rules. She works in a small corner of the living room, not in the kitchen, and she switches off her laptop at six o'clock. On home days, she also tries to meet a friend or go for a walk. She says that working from home is great, but only if you set clear limits.",
    ],
    glossary: [
      { word: "employee", ar: "موظّف", def: "A person who is paid to work for a company." },
      { word: "lonely", ar: "وحيد / يشعر بالوحدة", def: "Sad because you are alone." },
      { word: "switch off", ar: "يُطفئ", def: "To stop a machine by pressing a button." },
      { word: "limit", ar: "حدّ", def: "A point that you decide not to go past." },
    ],
    questions: build("b1-working-from-home", [
      mc("main-idea", "What is Ines's main message?", ["Working from home is good if you set clear limits.", "Working from home is always lonely.", "Offices are better than homes.", "Laptops should be kept in kitchens."], "working from home is great, but only if you set clear limits", "Her conclusion is in the last sentence."),
      sa("detail", "How many days a week can employees work from home? Write a number.", ["3", "three", "three days"], "work from home three days a week", "Three days a week."),
      tf("detail", "Ines found it easy to stop working in the evening.", false, "She found it hard to stop working in the evening", "It was hard because her laptop was always on the kitchen table."),
      mc("detail", "What time does Ines switch off her laptop now?", ["At six o'clock", "At five o'clock", "At lunchtime", "At midnight"], "she switches off her laptop at six o'clock", "She stops at six o'clock."),
    ]),
  },
  {
    id: "b1-the-marathon", title: "Running My First Marathon", level: "B1", category: "Sport", status: "review", source: "englishcamp",
    paragraphs: [
      "Hamid had never run more than five kilometres when his friend challenged him to take part in the Casablanca marathon. He had eight months to prepare. He downloaded a training plan and started running three times a week before work.",
      "The first weeks were painful. His legs hurt and he often wanted to give up. Slowly, though, the distances became easier. He also changed his diet: he ate more vegetables and stopped drinking fizzy drinks.",
      "On the day of the race, Hamid was nervous. After thirty kilometres he felt exhausted, but the crowd's cheers kept him going. He finished in four hours and forty minutes. He wasn't fast, but he was proud, and he has already signed up for next year's race.",
    ],
    glossary: [
      { word: "challenge", ar: "يتحدّى", def: "To ask someone to try something difficult." },
      { word: "give up", ar: "يستسلم", def: "To stop trying." },
      { word: "exhausted", ar: "منهك جدًا", def: "Extremely tired." },
      { word: "sign up", ar: "يسجّل اسمه", def: "To put your name on a list to take part in something." },
    ],
    questions: build("b1-the-marathon", [
      mc("main-idea", "What is the story mainly about?", ["How Hamid prepared for and finished a marathon", "Why marathons are dangerous", "Hamid's friend who won a race", "A new diet for runners"], "He had eight months to prepare.", "The story follows his training and race."),
      sa("detail", "How many months did Hamid have to prepare? Write a number.", ["8", "eight", "eight months"], "He had eight months to prepare.", "He had eight months."),
      tf("detail", "Hamid stopped drinking fizzy drinks.", true, "stopped drinking fizzy drinks", "Yes, he changed his diet."),
      mc("inference", "What helped Hamid continue after thirty kilometres?", ["The crowd's cheers", "A long rest", "His training plan app", "A fizzy drink"], "the crowd's cheers kept him going", "The crowd kept him going."),
    ]),
  },
  {
    id: "b1-saving-money", title: "Learning to Save", level: "B1", category: "Money", status: "review", source: "englishcamp",
    paragraphs: [
      "When Zineb got her first job, she spent most of her salary within two weeks. She bought clothes, ate in restaurants and ordered things online. By the end of each month, she had to borrow money from her brother.",
      "One day, her brother suggested a simple method. As soon as she received her salary, she would move twenty percent into a separate savings account. Then she would plan her spending with the money that was left.",
      "It wasn't easy at the beginning. Zineb had to cook at home more often and think twice before buying things. But after one year, she had enough money for a holiday in Spain, and she no longer needed to borrow from anyone.",
    ],
    glossary: [
      { word: "salary", ar: "راتب", def: "Money you receive every month for your job." },
      { word: "borrow", ar: "يقترض / يستعير", def: "To take something and promise to give it back." },
      { word: "account", ar: "حساب (بنكي)", def: "An arrangement with a bank to keep your money." },
      { word: "spending", ar: "إنفاق", def: "The money that you use to buy things." },
    ],
    questions: build("b1-saving-money", [
      mc("main-idea", "What is the text mainly about?", ["How Zineb learned to save money", "How to open a business", "Zineb's holiday in Spain", "Why online shopping is dangerous"], "her brother suggested a simple method", "Zineb changes her habits and starts saving."),
      sa("detail", "What percentage of her salary did Zineb save? Write a number.", ["20", "twenty", "20%", "twenty percent", "20 percent"], "she would move twenty percent into a separate savings account", "She saved twenty percent."),
      tf("detail", "At first, Zineb had to borrow money at the end of each month.", true, "she had to borrow money from her brother", "Yes, she borrowed from her brother."),
      mc("detail", "What could Zineb pay for after one year?", ["A holiday in Spain", "A new car", "A flat", "University fees"], "she had enough money for a holiday in Spain", "She saved enough for a holiday in Spain."),
    ]),
  },
  {
    id: "b1-volunteering-at-the-library", title: "Volunteering at the Library", level: "B1", category: "Community", status: "review", source: "englishcamp",
    paragraphs: [
      "Every Saturday morning, Mehdi volunteers at the public library in his town. He started last year because he wanted to do something useful in his free time and because he has always loved books.",
      "His main job is to read stories to young children. At first, he was shy and read too quietly. The librarian advised him to change his voice for each character and to show the pictures to the children. Now the children laugh, ask questions and sometimes act out the stories.",
      "Mehdi also helps older people use the library computers. Some of them want to send emails to their grandchildren abroad. He says volunteering has made him more confident, and he is now thinking about becoming a teacher.",
    ],
    glossary: [
      { word: "volunteer", ar: "يتطوّع", def: "To work without being paid." },
      { word: "shy", ar: "خجول", def: "Nervous about talking to other people." },
      { word: "character", ar: "شخصية (في قصة)", def: "A person in a story." },
      { word: "confident", ar: "واثق من نفسه", def: "Sure about your own abilities." },
    ],
    questions: build("b1-volunteering-at-the-library", [
      mc("main-idea", "What is the text mainly about?", ["Mehdi's volunteer work at a library", "How to build a library", "A teacher's first job", "Children who don't like books"], "Mehdi volunteers at the public library in his town", "The text describes his volunteer work."),
      mc("detail", "What advice did the librarian give Mehdi?", ["Change his voice for each character", "Read more quietly", "Choose shorter books", "Stop showing pictures"], "The librarian advised him to change his voice for each character", "She told him to change his voice and show the pictures."),
      tf("detail", "Mehdi helps older people use the library computers.", true, "Mehdi also helps older people use the library computers.", "Yes, some want to email their grandchildren."),
      mc("inference", "How has volunteering changed Mehdi?", ["He is more confident.", "He is more tired.", "He reads less.", "He wants to leave his town."], "volunteering has made him more confident", "He is more confident and thinking of teaching."),
    ]),
  },
  {
    id: "b1-a-wedding-in-the-family", title: "A Family Wedding", level: "B1", category: "Culture", status: "review", source: "englishcamp",
    paragraphs: [
      "My cousin Asmae got married last August, and the preparations started almost six months earlier. Her mother booked a hall, ordered the cakes and chose a band. Asmae spent weeks choosing her dresses, because in our region a bride usually wears several different outfits during the night.",
      "The day before the wedding, the women of the family met for the henna party. An older neighbour painted beautiful patterns on Asmae's hands while everybody sang and ate sweets.",
      "The wedding itself lasted until five in the morning. There were more than three hundred guests, and I was exhausted at the end. Still, it was a wonderful night, and the photos showed how happy Asmae was.",
    ],
    glossary: [
      { word: "preparations", ar: "تحضيرات", def: "Things you do to get ready for an event." },
      { word: "book", ar: "يحجز", def: "To arrange to use something at a future time." },
      { word: "bride", ar: "عروس", def: "A woman on her wedding day." },
      { word: "outfit", ar: "طقم / زيّ", def: "A set of clothes worn together." },
    ],
    questions: build("b1-a-wedding-in-the-family", [
      mc("main-idea", "What is the text mainly about?", ["A cousin's wedding and its preparations", "How to become a wedding singer", "A trip abroad in August", "Cooking sweets for a party"], "My cousin Asmae got married last August", "The writer describes the preparations, henna party and wedding."),
      mc("detail", "When did the preparations start?", ["Almost six months earlier", "One week earlier", "The day before", "A year earlier"], "the preparations started almost six months earlier", "They started almost six months before."),
      tf("detail", "The henna party took place after the wedding.", false, "The day before the wedding, the women of the family met for the henna party.", "It was the day before the wedding."),
      sa("detail", "Until what time did the wedding last?", ["five in the morning", "5 in the morning", "5 a.m.", "5am", "five", "5"], "The wedding itself lasted until five in the morning.", "It lasted until five in the morning."),
    ]),
  },
  {
    id: "b2-fast-fashion", title: "The Cost of Cheap Clothes", level: "B2", category: "Environment", status: "review", source: "englishcamp",
    paragraphs: [
      "Over the past twenty years, clothes have become remarkably cheap. Large chains now release new collections every few weeks, encouraging customers to buy more often and to throw away items they have worn only a handful of times. This business model is often called fast fashion.",
      "The low prices, however, hide significant costs. Producing clothes requires huge amounts of water and energy, and many cheap garments are made from synthetic fibres that release tiny plastic particles when they are washed. In addition, workers in some factories are paid very little and work long hours in unsafe conditions.",
      "Some consumers are responding by buying second-hand, repairing what they own or choosing fewer, better-quality items. Critics argue that individual choices alone cannot solve the problem and that governments should require brands to take responsibility for the full life of their products. Either way, the true price of a cheap T-shirt is clearly higher than the label suggests.",
    ],
    glossary: [
      { word: "remarkably", ar: "بشكل لافت", def: "In a way that is surprising or worth noticing." },
      { word: "garment", ar: "قطعة ملابس", def: "A piece of clothing." },
      { word: "synthetic", ar: "صناعي (غير طبيعي)", def: "Made by chemical processes, not natural." },
      { word: "second-hand", ar: "مستعمل", def: "Already owned and used by someone else." },
    ],
    questions: build("b2-fast-fashion", [
      mc("main-idea", "What is the writer's main point?", ["Cheap clothes have hidden environmental and human costs.", "Fast fashion helps poor families.", "Synthetic fibres are better than natural ones.", "Governments should ban clothing chains."], "the true price of a cheap T-shirt is clearly higher than the label suggests", "The text explains costs that low prices hide."),
      mc("detail", "What problem do synthetic fibres cause?", ["They release tiny plastic particles when washed.", "They are very expensive.", "They need no water.", "They last too long."], "release tiny plastic particles when they are washed", "Washing them releases plastic particles."),
      tf("detail", "Critics believe individual choices alone can solve the problem.", false, "Critics argue that individual choices alone cannot solve the problem", "They want governments to make brands responsible."),
      mc("vocabulary", "In the text, 'a handful of times' means…", ["only a few times", "with one hand", "many times", "every day"], "items they have worn only a handful of times", "A handful means a small number."),
    ]),
  },
  {
    id: "b2-sleep-and-screens", title: "Screens Before Sleep", level: "B2", category: "Health", status: "review", source: "englishcamp",
    paragraphs: [
      "Many people check their phones in bed, scrolling through messages and videos until they feel tired. Sleep researchers, however, warn that this habit may be making it harder for us to fall asleep and to rest properly.",
      "One reason is light. Screens give off bright light that can signal to the brain that it is still daytime, delaying the release of the hormone that prepares the body for sleep. Another reason is the content itself: an exciting video or a stressful work email keeps the mind active precisely when it should be slowing down.",
      "Experts suggest a simple routine. Put devices away at least thirty minutes before bedtime, keep the phone outside the bedroom if possible, and replace scrolling with a calmer activity such as reading a paper book. Those who try it often report that they fall asleep faster and wake up feeling more refreshed.",
    ],
    glossary: [
      { word: "scroll", ar: "يتصفّح بالتمرير", def: "To move text or images up or down on a screen." },
      { word: "delay", ar: "يؤخّر", def: "To make something happen later than usual." },
      { word: "hormone", ar: "هرمون", def: "A chemical in the body that controls how it works." },
      { word: "refreshed", ar: "منتعش", def: "Feeling rested and full of energy again." },
    ],
    questions: build("b2-sleep-and-screens", [
      mc("main-idea", "What is the text mainly about?", ["Why using screens in bed can harm sleep and what to do", "How phones are made", "Why people dream", "The best videos to watch at night"], "this habit may be making it harder for us to fall asleep", "It explains the problem and suggests a routine."),
      mc("detail", "How can screen light affect the brain?", ["It can signal that it is still daytime.", "It makes people hungry.", "It improves memory.", "It helps the body relax."], "signal to the brain that it is still daytime", "Bright light delays the sleep hormone."),
      sa("detail", "How many minutes before bedtime should devices be put away? Write a number.", ["30", "thirty", "thirty minutes", "30 minutes"], "at least thirty minutes before bedtime", "At least thirty minutes."),
      tf("inference", "According to the text, the content people watch can also keep the mind active.", true, "keeps the mind active precisely when it should be slowing down", "Exciting or stressful content keeps the mind active."),
    ]),
  },
  {
    id: "c1-four-day-week", title: "The Four-Day Week", level: "C1", category: "Work", status: "review", source: "englishcamp",
    paragraphs: [
      "The idea of a four-day working week, once dismissed as utopian, has moved steadily into the mainstream. In a number of trials, companies have reduced working hours without cutting salaries, on the condition that productivity remains at least as high as before.",
      "Advocates point to encouraging outcomes: lower stress, fewer sick days and staff who are less likely to leave. They argue that much of the traditional working week is lost to unnecessary meetings and distractions, and that a shorter week forces organisations to prioritise what genuinely matters.",
      "Sceptics, however, caution against drawing sweeping conclusions. Many trials have involved office-based firms that volunteered to take part, and which may therefore have been unusually well suited to the change. In sectors such as healthcare or retail, where someone must be present at all times, a shorter week may simply require hiring more staff. The debate, in other words, is less about whether the model can work than about where and for whom.",
    ],
    glossary: [
      { word: "utopian", ar: "مثالي / طوباوي", def: "Based on an ideal that seems impossible to achieve." },
      { word: "advocate", ar: "مؤيّد / مناصر", def: "A person who publicly supports an idea." },
      { word: "sceptic", ar: "متشكّك", def: "A person who doubts that claims are true." },
      { word: "sweeping", ar: "شامل ومُعمَّم", def: "Too general; applied widely without enough care." },
    ],
    questions: build("c1-four-day-week", [
      mc("main-idea", "What is the writer's overall conclusion?", ["The question is where and for whom a four-day week works.", "The four-day week has failed everywhere.", "All companies should adopt a four-day week now.", "Shorter weeks always reduce productivity."], "less about whether the model can work than about where and for whom", "The last sentence reframes the debate."),
      mc("detail", "What condition did companies in the trials set?", ["Productivity had to stay at least as high.", "Salaries had to be reduced.", "Staff had to work longer days.", "Meetings had to be doubled."], "on the condition that productivity remains at least as high as before", "Hours fell without salary cuts, as long as productivity held."),
      tf("inference", "Sceptics suggest the trial results may not apply to every kind of company.", true, "may therefore have been unusually well suited to the change", "Volunteer office firms may not represent all sectors."),
      mc("vocabulary", "In the text, 'dismissed' is closest in meaning to…", ["rejected as not worth considering", "fired from a job", "carefully tested", "warmly welcomed"], "once dismissed as utopian", "The idea was once rejected as unrealistic."),
    ]),
  },
  {
    id: "c2-the-attention-economy", title: "The Attention Economy", level: "C2", category: "Technology", status: "review", source: "englishcamp",
    paragraphs: [
      "In an age of abundant information, the scarce resource is no longer knowledge but attention. This insight, articulated decades before the smartphone, now underpins the business models of many of the world's most valuable companies, whose revenue depends less on what users pay than on how long they can be persuaded to stay.",
      "The consequences are subtle but pervasive. Interfaces are refined through relentless experimentation to maximise engagement: notifications are timed, feeds are made endless, and recommendations are tuned to what holds the eye rather than what serves the mind. None of this requires malicious intent; it is simply what optimisation for a single metric tends to produce.",
      "Defenders of the industry contend that users are free to look away and that these services provide genuine value at no monetary cost. Critics counter that freedom is a thin notion when one side of the exchange employs teams of engineers devoted to anticipating and exploiting human impulses. Whatever one's view, it seems prudent to treat one's attention as something to be spent deliberately, rather than surrendered by default.",
    ],
    glossary: [
      { word: "scarce", ar: "نادر / شحيح", def: "Not available in large enough amounts." },
      { word: "pervasive", ar: "متغلغل / منتشر", def: "Present everywhere, often in an unwelcome way." },
      { word: "relentless", ar: "لا يهدأ / متواصل", def: "Continuing without stopping or becoming weaker." },
      { word: "prudent", ar: "حكيم / حصيف", def: "Sensible and careful about the future." },
    ],
    questions: build("c2-the-attention-economy", [
      mc("main-idea", "What is the central claim of the text?", ["Attention has become a scarce resource that many companies compete to capture.", "Smartphones have made people more knowledgeable.", "Technology companies act with malicious intent.", "Free services provide no value."], "the scarce resource is no longer knowledge but attention", "The text builds from this claim."),
      tf("inference", "The writer believes engineers deliberately intend to harm users.", false, "None of this requires malicious intent", "The writer says the effects come from optimising one metric, not malice."),
      mc("detail", "How do critics respond to the argument that users are free to look away?", ["They say that freedom is limited when the other side exploits human impulses.", "They agree completely.", "They say the services should cost money.", "They blame users for being lazy."], "freedom is a thin notion when one side of the exchange employs teams of engineers", "Critics see an imbalance of power."),
      mc("vocabulary", "In the text, 'surrendered by default' suggests attention is…", ["given away without a conscious choice", "protected by law", "sold for a high price", "lost because of illness"], "rather than surrendered by default", "It contrasts with spending attention deliberately."),
    ]),
  },
  {
    id: "a1-my-best-friend", title: "My Best Friend", level: "A1", category: "Friends", status: "review", source: "englishcamp",
    paragraphs: [
      "My best friend is Sara. She is eleven years old, like me. She has long black hair and brown eyes.",
      "Sara lives in the next street. We walk to school together every morning. In class, we sit at the same table.",
      "After school, we play in the park or we do our homework at my house. On Fridays, we watch cartoons and eat popcorn.",
    ],
    glossary: [
      { word: "best friend", ar: "أعز صديق", def: "The friend you like most." },
      { word: "hair", ar: "شعر", def: "What grows on your head." },
      { word: "together", ar: "معًا", def: "With another person." },
      { word: "homework", ar: "واجب منزلي", def: "School work you do at home." },
    ],
    questions: build("a1-my-best-friend", [
      mc("main-idea", "What is the text about?", ["The writer's best friend", "A new school", "A trip to the park", "A cartoon film"], "My best friend is Sara.", "The writer describes Sara, their best friend."),
      sa("detail", "How old is Sara? Write a number.", ["11", "eleven", "eleven years old", "11 years old"], "She is eleven years old", "She is eleven."),
      tf("detail", "Sara lives far from the writer.", false, "Sara lives in the next street.", "She lives in the next street."),
      mc("detail", "What do they do on Fridays?", ["They watch cartoons and eat popcorn.", "They play football.", "They visit their grandparents.", "They go shopping."], "On Fridays, we watch cartoons and eat popcorn.", "They watch cartoons and eat popcorn."),
    ]),
  },
  {
    id: "a1-at-the-doctor", title: "At the Doctor", level: "A1", category: "Health", status: "review", source: "englishcamp",
    paragraphs: [
      "Today Ali is not well. He has a headache and a sore throat. His mother takes him to the doctor.",
      "The doctor is a kind woman. She looks at Ali's throat and listens to his chest. Then she says, \"You have a cold.\"",
      "Ali must drink warm water and rest at home for two days. He can go back to school on Thursday.",
    ],
    glossary: [
      { word: "headache", ar: "صداع", def: "A pain in your head." },
      { word: "sore throat", ar: "التهاب الحلق", def: "Pain in your throat when you swallow." },
      { word: "rest", ar: "يرتاح", def: "To stop and relax." },
      { word: "cold", ar: "زكام", def: "A common illness with a runny nose." },
    ],
    questions: build("a1-at-the-doctor", [
      mc("main-idea", "What is the text about?", ["Ali visits the doctor", "Ali's first day at school", "A doctor's family", "A trip to Thursday market"], "His mother takes him to the doctor.", "Ali is ill and visits the doctor."),
      mc("detail", "What does the doctor say?", ["You have a cold.", "You must go to hospital.", "You are fine.", "You need glasses."], "\"You have a cold.\"", "She says he has a cold."),
      sa("detail", "How many days must Ali rest at home? Write a number.", ["2", "two", "two days", "2 days"], "rest at home for two days", "Two days."),
      tf("detail", "Ali's father takes him to the doctor.", false, "His mother takes him to the doctor.", "His mother takes him."),
    ]),
  },
  {
    id: "a1-my-town", title: "My Town", level: "A1", category: "Places", status: "review", source: "englishcamp",
    paragraphs: [
      "I live in a small town near the sea. It is quiet and clean. There are about ten thousand people in my town.",
      "In the centre, there is a market, a mosque, a post office and two cafés. There is also a big park with old trees.",
      "In summer, many tourists come to the beach. In winter, the town is very quiet. I like my town because it is near the sea.",
    ],
    glossary: [
      { word: "town", ar: "بلدة", def: "A place bigger than a village and smaller than a city." },
      { word: "quiet", ar: "هادئ", def: "With little noise." },
      { word: "centre", ar: "وسط المدينة", def: "The middle part of a town." },
      { word: "tourist", ar: "سائح", def: "A person who visits a place on holiday." },
    ],
    questions: build("a1-my-town", [
      mc("main-idea", "What is the text about?", ["The writer's town", "A big city", "A holiday abroad", "A park in winter"], "I live in a small town near the sea.", "The writer describes their town."),
      tf("detail", "The town is near the sea.", true, "I live in a small town near the sea.", "Yes, it is near the sea."),
      mc("detail", "How many cafés are in the centre?", ["Two", "One", "Three", "Ten"], "two cafés", "There are two cafés."),
      mc("detail", "When do many tourists come?", ["In summer", "In winter", "In spring", "Every weekend"], "In summer, many tourists come to the beach.", "They come in summer."),
    ]),
  },
  {
    id: "a1-shopping-list", title: "The Shopping List", level: "A1", category: "Food", status: "review", source: "englishcamp",
    paragraphs: [
      "It is Saturday morning. Mum gives me a shopping list and some money. I go to the small shop on our street.",
      "On the list, there are six eggs, one kilo of tomatoes, a bottle of oil and two bags of bread. The shop has everything.",
      "The total is eighty-five dirhams. I give the shopkeeper one hundred dirhams, and he gives me fifteen dirhams back.",
    ],
    glossary: [
      { word: "shopping list", ar: "قائمة المشتريات", def: "A paper with things to buy." },
      { word: "bottle", ar: "قارورة", def: "A container for drinks or oil." },
      { word: "shopkeeper", ar: "صاحب المتجر", def: "A person who owns or works in a shop." },
      { word: "total", ar: "المجموع", def: "The full amount." },
    ],
    questions: build("a1-shopping-list", [
      mc("main-idea", "What is the text about?", ["Buying food from a list", "Cooking dinner", "A big supermarket", "Losing money"], "Mum gives me a shopping list and some money.", "The writer buys things from a shopping list."),
      sa("detail", "How many eggs are on the list? Write a number.", ["6", "six", "six eggs", "6 eggs"], "six eggs", "Six eggs."),
      tf("detail", "The shop does not have everything.", false, "The shop has everything.", "The shop has everything."),
      sa("detail", "How much money does the shopkeeper give back? Write the number.", ["15", "fifteen", "fifteen dirhams", "15 dirhams"], "he gives me fifteen dirhams back", "Fifteen dirhams."),
    ]),
  },
  {
    id: "a1-my-daily-routine", title: "Nadia's Day", level: "A1", category: "Daily life", status: "review", source: "englishcamp",
    paragraphs: [
      "Nadia is a nurse. She works in a hospital in Rabat. She starts work at seven o'clock in the morning.",
      "She gets up at six, has a quick breakfast and takes the tram. At the hospital, she helps sick people and talks to their families.",
      "Nadia finishes work at three o'clock. In the evening, she cooks dinner, reads a book and goes to bed at ten.",
    ],
    glossary: [
      { word: "nurse", ar: "ممرضة", def: "A person who cares for sick people." },
      { word: "hospital", ar: "مستشفى", def: "A place where sick people get help." },
      { word: "tram", ar: "ترامواي", def: "A train that runs on the street." },
      { word: "sick", ar: "مريض", def: "Not well; ill." },
    ],
    questions: build("a1-my-daily-routine", [
      mc("main-idea", "What is the text about?", ["A nurse's day", "A trip to Rabat", "A cooking class", "A sick family"], "Nadia is a nurse.", "The text describes Nadia's day."),
      mc("detail", "How does Nadia go to work?", ["By tram", "By bus", "On foot", "By car"], "takes the tram", "She takes the tram."),
      sa("detail", "What time does Nadia finish work?", ["three o'clock", "3 o'clock", "three", "3", "3:00", "at three o'clock"], "Nadia finishes work at three o'clock.", "She finishes at three o'clock."),
      tf("detail", "Nadia goes to bed at ten.", true, "goes to bed at ten", "Yes, at ten."),
    ]),
  },
  {
    id: "a1-the-new-bike", title: "The New Bike", level: "A1", category: "Free time", status: "review", source: "englishcamp",
    paragraphs: [
      "It is Youssef's birthday. His parents give him a red bike. Youssef is very happy.",
      "He cannot ride well, so his big sister helps him. She holds the bike and runs next to him in the park.",
      "After one week, Youssef can ride alone. Now he rides his bike to the shop and to his friend's house.",
    ],
    glossary: [
      { word: "birthday", ar: "عيد الميلاد", def: "The day you were born, every year." },
      { word: "ride", ar: "يركب", def: "To sit on and move a bike or horse." },
      { word: "hold", ar: "يمسك", def: "To have something in your hands." },
      { word: "alone", ar: "وحده", def: "Without other people." },
    ],
    questions: build("a1-the-new-bike", [
      mc("main-idea", "What is the text about?", ["Youssef learns to ride his new bike", "A bike shop", "A birthday party", "Youssef's sister's bike"], "His parents give him a red bike.", "Youssef gets a bike and learns to ride it."),
      mc("detail", "What colour is the bike?", ["Red", "Blue", "Green", "Black"], "a red bike", "It is red."),
      mc("detail", "Who helps Youssef?", ["His big sister", "His father", "His friend", "A teacher"], "his big sister helps him", "His big sister helps him."),
      sa("detail", "After how long can Youssef ride alone?", ["one week", "1 week", "a week", "after one week"], "After one week, Youssef can ride alone.", "After one week."),
    ]),
  },
  {
    id: "a2-a-trip-to-chefchaouen", title: "A Weekend in Chefchaouen", level: "A2", category: "Travel", status: "review", source: "englishcamp",
    paragraphs: [
      "Last month, Salma and her two friends spent a weekend in Chefchaouen, the famous blue town in the north of Morocco. They took a bus from Tangier, and the journey took about three hours.",
      "On Saturday, they walked around the old town and took hundreds of photos of the blue walls. In the afternoon, they climbed a hill to see the whole town from above. It was tiring, but the view was amazing.",
      "On Sunday, it rained all morning, so they stayed in a small café and played cards. Salma says she wants to go back in spring, when the weather is warmer.",
    ],
    glossary: [
      { word: "famous", ar: "مشهور", def: "Known by many people." },
      { word: "journey", ar: "رحلة", def: "Travel from one place to another." },
      { word: "climb", ar: "يتسلق", def: "To go up something, like a hill." },
      { word: "view", ar: "منظر", def: "What you can see from a place." },
    ],
    questions: build("a2-a-trip-to-chefchaouen", [
      mc("main-idea", "What is the text about?", ["A weekend trip to Chefchaouen", "Life in Tangier", "How to take good photos", "A café in the rain"], "spent a weekend in Chefchaouen", "Salma and her friends visit Chefchaouen."),
      sa("detail", "How long did the bus journey take? Write the number of hours.", ["3", "three", "three hours", "about three hours"], "the journey took about three hours", "About three hours."),
      tf("detail", "On Sunday the weather was sunny.", false, "On Sunday, it rained all morning", "It rained all morning."),
      mc("inference", "Why does Salma want to go back in spring?", ["The weather will be warmer.", "The bus will be cheaper.", "Her friends live there.", "The café will be open."], "when the weather is warmer", "She wants warmer weather."),
    ]),
  },
  {
    id: "a2-the-football-match", title: "The Big Match", level: "A2", category: "Sport", status: "review", source: "englishcamp",
    paragraphs: [
      "Every Sunday, Karim plays football with a team from his neighbourhood. Last Sunday was special because they played against the team from the next town in the final of a small local cup.",
      "The first half was difficult. The other team scored early, and Karim's team looked tired. At half-time, their coach told them to pass the ball more and to stop arguing with each other.",
      "In the second half, they played much better. Karim scored the first goal with his head, and his friend Amine scored the winning goal two minutes before the end. The whole team celebrated with mint tea and cakes.",
    ],
    glossary: [
      { word: "neighbourhood", ar: "حي", def: "The area around your home." },
      { word: "score", ar: "يسجّل (هدفًا)", def: "To get a goal or point." },
      { word: "coach", ar: "مدرب", def: "A person who trains a team." },
      { word: "celebrate", ar: "يحتفل", def: "To do something nice for a happy event." },
    ],
    questions: build("a2-the-football-match", [
      mc("main-idea", "What is the text mainly about?", ["How Karim's team won a final", "Karim's new coach", "A football school", "An argument between friends"], "in the final of a small local cup", "The team plays and wins a cup final."),
      mc("detail", "What did the coach tell the players at half-time?", ["Pass the ball more and stop arguing", "Run faster", "Change their shirts", "Go home early"], "to pass the ball more and to stop arguing with each other", "He told them to pass more and stop arguing."),
      tf("detail", "Karim scored the winning goal.", false, "his friend Amine scored the winning goal", "Amine scored the winning goal; Karim scored the first."),
      mc("detail", "How did the team celebrate?", ["With mint tea and cakes", "With a party at school", "With a trip to the sea", "With new football boots"], "celebrated with mint tea and cakes", "With mint tea and cakes."),
    ]),
  },
  {
    id: "a2-learning-to-swim", title: "Learning to Swim at Thirty", level: "A2", category: "Sport", status: "review", source: "englishcamp",
    paragraphs: [
      "Hind is thirty years old, but until last year she could not swim. As a child, she lived far from the sea, and there was no swimming pool in her village.",
      "Last summer, she decided to take lessons at a public pool. The first lessons were frightening because she did not like putting her face in the water. Her teacher was very patient and started with simple breathing exercises.",
      "After two months, Hind could swim twenty-five metres without stopping. Now she goes to the pool twice a week, and she is planning a holiday by the sea with her family.",
    ],
    glossary: [
      { word: "swimming pool", ar: "مسبح", def: "A place with water where people swim." },
      { word: "frightening", ar: "مخيف", def: "Making you feel afraid." },
      { word: "patient", ar: "صبور", def: "Calm and not in a hurry." },
      { word: "breathing", ar: "التنفس", def: "Taking air in and out." },
    ],
    questions: build("a2-learning-to-swim", [
      mc("main-idea", "What is the text about?", ["Hind learns to swim as an adult", "A swimming competition", "A village without water", "A holiday by the sea"], "Last summer, she decided to take lessons at a public pool.", "Hind learns to swim at thirty."),
      mc("detail", "Why could Hind not swim as a child?", ["There was no pool and the sea was far.", "She was ill.", "Her parents did not allow it.", "She did not like water."], "she lived far from the sea, and there was no swimming pool in her village", "She lived far from the sea and had no pool."),
      sa("detail", "How many metres could Hind swim after two months? Write a number.", ["25", "twenty-five", "twenty five", "25 metres"], "swim twenty-five metres without stopping", "Twenty-five metres."),
      tf("detail", "Hind goes to the pool twice a week now.", true, "she goes to the pool twice a week", "Yes, twice a week."),
    ]),
  },
  {
    id: "a2-a-surprise-party", title: "The Surprise Party", level: "A2", category: "Family", status: "review", source: "englishcamp",
    paragraphs: [
      "Mehdi's grandmother was turning seventy, and the family wanted to give her a surprise party. For two weeks, everyone kept the secret. They talked about the plans only on the phone, never at her house.",
      "On the day, Mehdi's uncle took Grandma to the market. While she was out, the others decorated the living room with flowers and balloons, and Mehdi's mother made a big chocolate cake.",
      "When Grandma came back, everyone shouted \"Surprise!\" At first, she was shocked, and then she started laughing and crying at the same time. She said it was the best birthday of her life.",
    ],
    glossary: [
      { word: "secret", ar: "سرّ", def: "Something you do not tell others." },
      { word: "decorate", ar: "يزيّن", def: "To make a place look nice." },
      { word: "balloon", ar: "بالون", def: "A small rubber bag filled with air." },
      { word: "shocked", ar: "مصدوم / مندهش جدًا", def: "Very surprised." },
    ],
    questions: build("a2-a-surprise-party", [
      mc("main-idea", "What is the story about?", ["A surprise party for Grandma's seventieth birthday", "A trip to the market", "Making a chocolate cake", "A family argument"], "give her a surprise party", "The family organises a surprise party."),
      mc("detail", "Where did the uncle take Grandma?", ["To the market", "To the doctor", "To the sea", "To a restaurant"], "Mehdi's uncle took Grandma to the market", "He took her to the market."),
      tf("detail", "The family talked about the plans at Grandma's house.", false, "never at her house", "They talked only on the phone, never at her house."),
      mc("inference", "How did Grandma feel at the end?", ["Very happy", "Angry", "Bored", "Tired"], "She said it was the best birthday of her life.", "She was very happy."),
    ]),
  },
  {
    id: "a2-a-rainy-day-in-casablanca", title: "Stuck in the Rain", level: "A2", category: "Weather", status: "review", source: "englishcamp",
    paragraphs: [
      "Ayoub had an important job interview in Casablanca at ten o'clock. He left home early, but as soon as he got off the tram, heavy rain started. He did not have an umbrella.",
      "He ran into a small shop to wait. The shopkeeper saw that he was worried and asked what was wrong. When Ayoub explained, the man lent him an old umbrella and told him to bring it back later.",
      "Ayoub arrived at the interview on time and only a little wet. The interview went well. In the afternoon, he returned the umbrella with a box of sweets to say thank you.",
    ],
    glossary: [
      { word: "interview", ar: "مقابلة عمل", def: "A meeting where someone asks you questions for a job." },
      { word: "umbrella", ar: "مظلة", def: "You hold it to stay dry in the rain." },
      { word: "lend", ar: "يُعير", def: "To give something for a short time." },
      { word: "worried", ar: "قلق", def: "Thinking that something bad may happen." },
    ],
    questions: build("a2-a-rainy-day-in-casablanca", [
      mc("main-idea", "What is the story mainly about?", ["A shopkeeper helps Ayoub in the rain", "Ayoub buys an umbrella", "Ayoub misses his interview", "The weather in Casablanca"], "the man lent him an old umbrella", "A kind shopkeeper helps Ayoub."),
      sa("detail", "What time was the interview?", ["ten o'clock", "10 o'clock", "ten", "10", "10:00", "at ten o'clock"], "interview in Casablanca at ten o'clock", "At ten o'clock."),
      tf("detail", "Ayoub arrived late for the interview.", false, "Ayoub arrived at the interview on time", "He arrived on time."),
      mc("detail", "What did Ayoub bring back with the umbrella?", ["A box of sweets", "Some money", "A new umbrella", "Flowers"], "he returned the umbrella with a box of sweets", "He brought a box of sweets."),
    ]),
  },
  {
    id: "a2-my-grandfathers-garden", title: "Grandfather's Garden", level: "A2", category: "Nature", status: "review", source: "englishcamp",
    paragraphs: [
      "My grandfather has a small garden behind his house in the village. He grows tomatoes, peppers, onions and mint. He also has two orange trees that are older than my father.",
      "Every morning, he gets up before sunrise to water the plants, because the sun is very strong later in the day. He never uses chemicals. Instead, he puts old vegetables and leaves on the soil.",
      "When I visit him in summer, he teaches me how to plant seeds and remove weeds. I am not very good at it yet, but I love eating the vegetables we grow ourselves.",
    ],
    glossary: [
      { word: "grow", ar: "يزرع", def: "To plant and take care of plants." },
      { word: "sunrise", ar: "شروق الشمس", def: "The time when the sun comes up." },
      { word: "soil", ar: "تربة", def: "The earth that plants grow in." },
      { word: "weed", ar: "عشب ضار", def: "A plant that grows where you do not want it." },
    ],
    questions: build("a2-my-grandfathers-garden", [
      mc("main-idea", "What is the text about?", ["The grandfather's garden", "A farm in the city", "Buying vegetables", "Orange juice"], "My grandfather has a small garden", "The writer describes the grandfather's garden."),
      mc("detail", "Why does the grandfather water the plants early?", ["The sun is very strong later.", "He works in the afternoon.", "Water is cheaper in the morning.", "The neighbours ask him to."], "because the sun is very strong later in the day", "The sun is too strong later."),
      tf("detail", "The grandfather uses chemicals in the garden.", false, "He never uses chemicals.", "He never uses chemicals."),
      sa("detail", "How many orange trees does he have? Write a number.", ["2", "two", "two orange trees"], "two orange trees", "Two."),
    ]),
  },
  {
    id: "a2-the-lost-cat", title: "Where Is Simba?", level: "A2", category: "Animals", status: "review", source: "englishcamp",
    paragraphs: [
      "One evening, Rania noticed that her cat, Simba, was not at home. She looked under the beds, in the cupboards and on the balcony, but he was not there. She was very worried.",
      "She made posters with Simba's photo and her phone number and put them on the walls of her street. She also asked the neighbours and posted a message in the building's online group.",
      "Two days later, an old man called her. Simba was sleeping in his garage on the other side of the street. Rania was so happy that she cried. Now she always closes the balcony door at night.",
    ],
    glossary: [
      { word: "notice", ar: "يلاحظ", def: "To see or become aware of something." },
      { word: "poster", ar: "ملصق", def: "A big paper on a wall with information." },
      { word: "neighbour", ar: "جار", def: "A person who lives near you." },
      { word: "garage", ar: "مرآب", def: "A building where you keep a car." },
    ],
    questions: build("a2-the-lost-cat", [
      mc("main-idea", "What is the story about?", ["Rania loses and finds her cat", "Rania buys a new cat", "A neighbour's garage", "A building's online group"], "Simba, was not at home", "Rania's cat goes missing and is found."),
      mc("detail", "Where was Simba?", ["In an old man's garage", "On the balcony", "Under the bed", "At the vet"], "Simba was sleeping in his garage", "He was in a neighbour's garage."),
      sa("detail", "After how many days did someone call Rania? Write a number.", ["2", "two", "two days"], "Two days later, an old man called her.", "Two days later."),
      mc("inference", "What does Rania do now to keep Simba safe?", ["She closes the balcony door at night.", "She keeps him in a cage.", "She puts a bell on him.", "She leaves him with a neighbour."], "Now she always closes the balcony door at night.", "She closes the balcony door at night."),
    ]),
  },
  {
    id: "a2-a-new-job", title: "My First Week at Work", level: "A2", category: "Work", status: "review", source: "englishcamp",
    paragraphs: [
      "Last Monday, Imane started her first job as a receptionist in a hotel in Agadir. She was nervous because she had never worked before, and her English was not perfect.",
      "Her manager gave her a list of tasks: answer the phone, check guests in and out, and help them with information about the city. A colleague named Hamza showed her how to use the computer system.",
      "By Friday, Imane felt much more confident. She helped a family from Germany find a good restaurant, and they thanked her in English. She says that the job is helping her speak English better every day.",
    ],
    glossary: [
      { word: "receptionist", ar: "موظفة استقبال", def: "A person who welcomes visitors at a front desk." },
      { word: "nervous", ar: "متوتر", def: "A little afraid or worried." },
      { word: "task", ar: "مهمة", def: "A piece of work you must do." },
      { word: "confident", ar: "واثق", def: "Sure of yourself." },
    ],
    questions: build("a2-a-new-job", [
      mc("main-idea", "What is the text about?", ["Imane's first week as a receptionist", "A holiday in Agadir", "A German family's trip", "How to use a computer"], "started her first job as a receptionist", "It describes her first week at work."),
      tf("detail", "Imane had worked in a hotel before.", false, "she had never worked before", "It was her first job."),
      mc("detail", "Who showed Imane how to use the computer system?", ["Hamza", "Her manager", "A guest", "Her mother"], "A colleague named Hamza showed her how to use the computer system.", "Hamza showed her."),
      mc("inference", "How did Imane feel by Friday?", ["More confident", "More nervous", "Bored", "Ill"], "By Friday, Imane felt much more confident.", "She felt more confident."),
    ]),
  },
  {
    id: "a2-cooking-harira", title: "Cooking Harira with Mum", level: "A2", category: "Food", status: "review", source: "englishcamp",
    paragraphs: [
      "During Ramadan, Lina's family eats harira almost every evening. This year, Lina asked her mother to teach her how to make it.",
      "First, they washed the lentils and chickpeas. Then they cut onions, tomatoes, celery and coriander into small pieces. Lina's mother cooked the meat with spices before adding the vegetables and water.",
      "The soup needed about an hour to cook. At the end, they added a mixture of flour and water to make it thick. Lina made a small mistake and put in too much salt, but her father said it was still the best harira of the week.",
    ],
    glossary: [
      { word: "lentils", ar: "عدس", def: "Small round seeds you cook in soup." },
      { word: "chickpeas", ar: "حمص", def: "Round yellow seeds used in food." },
      { word: "spices", ar: "توابل", def: "Things like pepper and cumin that give taste." },
      { word: "thick", ar: "كثيف / ثخين", def: "Not watery." },
    ],
    questions: build("a2-cooking-harira", [
      mc("main-idea", "What is the text about?", ["Lina learns to cook harira", "A Ramadan market", "A family argument", "A restaurant menu"], "Lina asked her mother to teach her how to make it.", "Lina learns to make harira."),
      sa("detail", "How long did the soup need to cook?", ["about an hour", "an hour", "one hour", "1 hour", "about one hour"], "The soup needed about an hour to cook.", "About an hour."),
      mc("detail", "Why did they add flour and water at the end?", ["To make the soup thick", "To make it sweet", "To cool it down", "To add colour"], "to make it thick", "To make it thick."),
      tf("detail", "Lina put too much salt in the soup.", true, "put in too much salt", "Yes, she added too much salt."),
    ]),
  },
  {
    id: "a2-the-school-trip", title: "The School Trip", level: "A2", category: "Education", status: "review", source: "englishcamp",
    paragraphs: [
      "At the end of the school year, Mr Bennani took his class to the Oukaimeden mountains near Marrakech. The students left at seven in the morning by bus, and many of them slept during the journey.",
      "In the mountains, a guide showed them old rock drawings of animals. He explained that people made them thousands of years ago. The students also learned the names of some local plants and birds.",
      "At lunchtime, they had a picnic by a small river. Some boys tried to catch fish with their hands, but they did not catch anything. Everyone came home tired but happy, with lots of photos and stories.",
    ],
    glossary: [
      { word: "guide", ar: "مرشد", def: "A person who shows visitors a place." },
      { word: "rock drawing", ar: "نقش صخري", def: "A picture made on a rock long ago." },
      { word: "picnic", ar: "نزهة مع طعام", def: "A meal you eat outside." },
      { word: "catch", ar: "يصطاد / يمسك", def: "To take something that is moving." },
    ],
    questions: build("a2-the-school-trip", [
      mc("main-idea", "What is the text about?", ["A class trip to the mountains", "A fishing competition", "A history exam", "Life in Marrakech"], "took his class to the Oukaimeden mountains", "It describes a school trip."),
      mc("detail", "What did the guide show the students?", ["Old rock drawings of animals", "A museum", "A farm", "A ski station"], "a guide showed them old rock drawings of animals", "Old rock drawings."),
      tf("detail", "The boys caught some fish.", false, "they did not catch anything", "They did not catch anything."),
      sa("detail", "At what time did the students leave?", ["seven", "7", "seven in the morning", "7 am", "at seven", "7:00"], "The students left at seven in the morning", "At seven in the morning."),
    ]),
  },
  {
    id: "a2-moving-to-a-new-flat", title: "Moving House", level: "A2", category: "Home", status: "review", source: "englishcamp",
    paragraphs: [
      "Last week, Adil and his wife moved from a small flat in the old city to a bigger one in a new building. They needed more space because they are going to have a baby in the autumn.",
      "Moving was harder than they expected. They packed everything in boxes, and Adil's brothers helped them carry the furniture down three floors, because the old building had no lift.",
      "The new flat has two bedrooms, a sunny balcony and a lift. There is also a school and a pharmacy nearby. They are still opening boxes, but they already feel at home.",
    ],
    glossary: [
      { word: "move", ar: "ينتقل (للسكن)", def: "To go to live in a new place." },
      { word: "pack", ar: "يحزم", def: "To put things into boxes or bags." },
      { word: "furniture", ar: "أثاث", def: "Tables, chairs, beds and so on." },
      { word: "lift", ar: "مصعد", def: "A machine that carries people between floors." },
    ],
    questions: build("a2-moving-to-a-new-flat", [
      mc("main-idea", "What is the text about?", ["Adil and his wife move to a bigger flat", "A new school in the city", "Buying furniture", "A baby's first birthday"], "moved from a small flat in the old city to a bigger one", "They move to a bigger flat."),
      mc("detail", "Why did they need more space?", ["They are going to have a baby.", "Adil's brothers live with them.", "They work from home.", "They bought a piano."], "they are going to have a baby in the autumn", "A baby is coming."),
      tf("detail", "The old building had a lift.", false, "the old building had no lift", "It had no lift."),
      sa("detail", "How many bedrooms does the new flat have? Write a number.", ["2", "two", "two bedrooms"], "two bedrooms", "Two."),
    ]),
  },
  {
    id: "a2-a-phone-free-week", title: "A Week Without a Phone", level: "A2", category: "Technology", status: "review", source: "englishcamp",
    paragraphs: [
      "Reda used his phone for more than six hours every day. His teacher suggested an experiment: one week without a smartphone. Reda agreed, but he was not sure he could do it.",
      "The first two days were difficult. He kept reaching for his pocket, and he felt bored on the bus. On the third day, he borrowed a novel from the library and started reading on his way to school.",
      "By the end of the week, Reda had finished the novel, slept better and spent more time with his family. He now uses his phone again, but he switches it off at nine o'clock every evening.",
    ],
    glossary: [
      { word: "experiment", ar: "تجربة", def: "A test to see what happens." },
      { word: "bored", ar: "يشعر بالملل", def: "Not interested; with nothing to do." },
      { word: "borrow", ar: "يستعير", def: "To take something and give it back later." },
      { word: "switch off", ar: "يُطفئ", def: "To stop a machine." },
    ],
    questions: build("a2-a-phone-free-week", [
      mc("main-idea", "What is the text about?", ["Reda spends a week without his phone", "Reda buys a new phone", "A library competition", "A teacher's holiday"], "one week without a smartphone", "He tries a week without a phone."),
      mc("detail", "What did Reda do on the third day?", ["He borrowed a novel from the library.", "He bought a new phone.", "He stayed at home.", "He called his teacher."], "he borrowed a novel from the library", "He borrowed a novel."),
      tf("detail", "Reda slept better by the end of the week.", true, "slept better", "Yes, he slept better."),
      sa("detail", "At what time does Reda switch off his phone now?", ["nine", "9", "nine o'clock", "9 o'clock", "9 pm", "at nine o'clock"], "he switches it off at nine o'clock every evening", "At nine o'clock."),
    ]),
  },
  {
    id: "a2-the-street-musician", title: "The Street Musician", level: "A2", category: "Culture", status: "review", source: "englishcamp",
    paragraphs: [
      "Every afternoon, an old man plays the oud near the entrance of the medina in Fes. He sits on a small chair, and people stop to listen while they wait for friends or buses.",
      "His name is Si Driss. He learned to play from his father when he was ten years old. For forty years, he played at weddings, but now he prefers to play in the street because he can choose his own songs.",
      "Tourists often take photos and put coins in his box. Local children sometimes sit next to him, and he shows them where to put their fingers on the strings.",
    ],
    glossary: [
      { word: "entrance", ar: "مدخل", def: "The place where you go in." },
      { word: "medina", ar: "المدينة القديمة", def: "The old part of a Moroccan city." },
      { word: "wedding", ar: "عرس", def: "A party when two people marry." },
      { word: "string", ar: "وتر", def: "A thin line on a guitar or oud that makes sound." },
    ],
    questions: build("a2-the-street-musician", [
      mc("main-idea", "What is the text about?", ["An old oud player in Fes", "A music school", "A wedding in Fes", "Tourists in the medina"], "an old man plays the oud near the entrance of the medina in Fes", "It describes a street musician."),
      mc("detail", "Who taught Si Driss to play?", ["His father", "A teacher", "A tourist", "His friend"], "He learned to play from his father", "His father."),
      sa("detail", "For how many years did he play at weddings? Write a number.", ["40", "forty", "forty years"], "For forty years, he played at weddings", "Forty years."),
      mc("inference", "Why does he prefer playing in the street?", ["He can choose his own songs.", "It pays more.", "It is quieter.", "His father asked him to."], "he can choose his own songs", "He can choose his songs."),
    ]),
  },
  {
    id: "a2-the-bakery-queue", title: "The Morning Queue", level: "A2", category: "Daily life", status: "review", source: "englishcamp",
    paragraphs: [
      "Every morning at seven, there is a long queue outside Hajja Fatima's bakery. People come from other neighbourhoods because her msemen and harcha are famous.",
      "Hajja Fatima starts work at four o'clock. She makes the dough by hand and cooks everything on a big hot plate. Her son helps her and takes the money from the customers.",
      "She sells about three hundred msemen every day. When people ask for her secret, she just smiles and says, \"Good flour, good butter and patience.\"",
    ],
    glossary: [
      { word: "queue", ar: "طابور", def: "A line of people waiting." },
      { word: "dough", ar: "عجين", def: "Flour and water mixed before cooking." },
      { word: "customer", ar: "زبون", def: "A person who buys something." },
      { word: "patience", ar: "صبر", def: "Being calm when something takes time." },
    ],
    questions: build("a2-the-bakery-queue", [
      mc("main-idea", "What is the text about?", ["A popular bakery and its owner", "A cooking competition", "A new supermarket", "A son's job"], "there is a long queue outside Hajja Fatima's bakery", "It describes a popular bakery."),
      sa("detail", "What time does Hajja Fatima start work?", ["four", "4", "four o'clock", "4 o'clock", "4 am", "at four o'clock"], "Hajja Fatima starts work at four o'clock.", "At four o'clock."),
      mc("detail", "What does her son do?", ["He helps her and takes the money.", "He makes the dough.", "He delivers bread by bike.", "He opens a second shop."], "Her son helps her and takes the money from the customers.", "He helps and takes the money."),
      tf("detail", "She sells about three hundred msemen every day.", true, "She sells about three hundred msemen every day.", "Yes, about three hundred."),
    ]),
  },
  {
    id: "a2-a-letter-to-a-penfriend", title: "A Letter to Emma", level: "A2", category: "Communication", status: "review", source: "englishcamp",
    paragraphs: [
      "Dear Emma, thank you for your last letter and the photos of your town. It looks very green! Here in Ouarzazate it is very dry and hot, especially in July.",
      "I have some news. I passed my exams, and next year I am going to study tourism at university. I want to work in a hotel or as a guide, because I love meeting people from other countries.",
      "Are you still coming to Morocco in December? If you come, you can stay with my family. My mother wants to cook couscous for you. Write soon! Your friend, Samira.",
    ],
    glossary: [
      { word: "penfriend", ar: "صديق مراسلة", def: "A friend you write letters to." },
      { word: "dry", ar: "جاف", def: "With little or no rain." },
      { word: "tourism", ar: "سياحة", def: "The business of holidays and travel." },
      { word: "pass an exam", ar: "ينجح في امتحان", def: "To get a good enough result." },
    ],
    questions: build("a2-a-letter-to-a-penfriend", [
      mc("main-idea", "Why is Samira writing?", ["To give news and invite Emma", "To ask for money", "To complain about the weather", "To cancel a visit"], "If you come, you can stay with my family.", "She shares news and invites Emma."),
      mc("detail", "What is Samira going to study?", ["Tourism", "Medicine", "English", "Cooking"], "I am going to study tourism at university", "Tourism."),
      tf("detail", "Ouarzazate is green and rainy.", false, "Here in Ouarzazate it is very dry and hot", "It is dry and hot."),
      mc("detail", "When might Emma come to Morocco?", ["In December", "In July", "Next year", "In spring"], "Are you still coming to Morocco in December?", "In December."),
    ]),
  },
  {
    id: "a2-the-recycling-project", title: "The Class Recycling Project", level: "A2", category: "Environment", status: "review", source: "englishcamp",
    paragraphs: [
      "Ms Alaoui's class wanted to make their school cleaner. They noticed that most of the rubbish in the playground was plastic bottles and paper.",
      "The students put three boxes in every classroom: one for plastic, one for paper and one for food waste. Every Friday, two students took the plastic and paper to a recycling centre near the school.",
      "After three months, the playground was much cleaner, and the class had collected more than four hundred kilos of paper. The headteacher was so impressed that other classes started the project too.",
    ],
    glossary: [
      { word: "rubbish", ar: "قمامة", def: "Things you throw away." },
      { word: "recycling", ar: "إعادة التدوير", def: "Using old materials to make new things." },
      { word: "waste", ar: "نفايات", def: "Things that are thrown away." },
      { word: "impressed", ar: "معجب", def: "Thinking something is very good." },
    ],
    questions: build("a2-the-recycling-project", [
      mc("main-idea", "What is the text about?", ["A class recycling project", "A new playground", "A food festival", "A school exam"], "Ms Alaoui's class wanted to make their school cleaner.", "The class starts recycling."),
      sa("detail", "How many boxes did they put in every classroom? Write a number.", ["3", "three", "three boxes"], "three boxes in every classroom", "Three."),
      mc("detail", "How much paper did they collect in three months?", ["More than four hundred kilos", "About forty kilos", "Four kilos", "One thousand kilos"], "more than four hundred kilos of paper", "More than four hundred kilos."),
      tf("detail", "Other classes started the project too.", true, "other classes started the project too", "Yes, other classes joined."),
    ]),
  },
  {
    id: "a2-a-visit-to-the-dentist", title: "Afraid of the Dentist", level: "A2", category: "Health", status: "review", source: "englishcamp",
    paragraphs: [
      "Omar is twelve, and he is very afraid of the dentist. For weeks, he did not tell his parents that one of his teeth hurt when he ate sweets or drank cold water.",
      "In the end, the pain was too strong, and his mother made an appointment. In the waiting room, Omar's hands were shaking. But the dentist was friendly and explained everything before she started.",
      "She found a small hole in his tooth and filled it in twenty minutes. It did not hurt at all. Now Omar brushes his teeth twice a day and eats fewer sweets.",
    ],
    glossary: [
      { word: "dentist", ar: "طبيب أسنان", def: "A doctor for teeth." },
      { word: "appointment", ar: "موعد", def: "A time you agree to see someone." },
      { word: "shake", ar: "يرتجف", def: "To move quickly because you are afraid or cold." },
      { word: "brush", ar: "ينظّف بالفرشاة", def: "To clean with a brush." },
    ],
    questions: build("a2-a-visit-to-the-dentist", [
      mc("main-idea", "What is the text about?", ["Omar's visit to the dentist", "A sweet shop", "Omar's school day", "A doctor's family"], "he is very afraid of the dentist", "Omar finally visits the dentist."),
      mc("detail", "When did Omar's tooth hurt?", ["When he ate sweets or drank cold water", "Every night", "When he played football", "Only in the morning"], "when he ate sweets or drank cold water", "With sweets or cold water."),
      sa("detail", "How long did the dentist need to fill the tooth?", ["twenty minutes", "20 minutes", "20", "twenty"], "filled it in twenty minutes", "Twenty minutes."),
      tf("detail", "The treatment was very painful.", false, "It did not hurt at all.", "It did not hurt at all."),
    ]),
  },
  {
    id: "a2-the-night-train", title: "The Night Train", level: "A2", category: "Travel", status: "review", source: "englishcamp",
    paragraphs: [
      "Zineb wanted to visit her sister in Oujda, but flights were expensive. So she decided to take the night train from Casablanca. It left at nine in the evening and arrived early the next morning.",
      "She shared a small cabin with three other women. One was a teacher, one was a student, and one was a grandmother who gave everyone dates and almonds. They talked and laughed until midnight.",
      "Zineb did not sleep very well because the train was noisy, but she enjoyed the journey. She says it was cheaper than flying, and she made new friends.",
    ],
    glossary: [
      { word: "flight", ar: "رحلة جوية", def: "A journey by plane." },
      { word: "cabin", ar: "مقصورة", def: "A small room on a train or ship." },
      { word: "share", ar: "يتقاسم", def: "To use something with other people." },
      { word: "noisy", ar: "صاخب", def: "Making a lot of noise." },
    ],
    questions: build("a2-the-night-train", [
      mc("main-idea", "What is the text about?", ["Zineb's journey on the night train", "A flight to Oujda", "A teacher's holiday", "A train accident"], "she decided to take the night train from Casablanca", "She takes the night train."),
      mc("detail", "Why did Zineb take the train?", ["Flights were expensive.", "She is afraid of planes.", "Her sister asked her.", "The train was faster."], "flights were expensive", "Flights were expensive."),
      tf("detail", "Zineb slept very well on the train.", false, "Zineb did not sleep very well because the train was noisy", "She did not sleep well."),
      mc("detail", "What did the grandmother give everyone?", ["Dates and almonds", "Tea", "Bread", "Books"], "gave everyone dates and almonds", "Dates and almonds."),
    ]),
  },
  {
    id: "b1-the-cooperative", title: "The Argan Cooperative", level: "B1", category: "Work", status: "review", source: "englishcamp",
    paragraphs: [
      "In a village near Essaouira, forty women work together in a cooperative that produces argan oil. Before the cooperative was created in 2008, most of them sold argan nuts to traders for very low prices and had no regular income.",
      "Today the process is shared. Some women crack the nuts by hand, a slow job that requires skill and patience. Others press the kernels, bottle the oil or prepare cosmetic products such as soap and cream. Every member receives a monthly salary and a share of the profits at the end of the year.",
      "The cooperative has also changed life outside work. Several members followed reading and writing classes organised in the evenings, and some now manage the accounts. Fatima, the president, says the biggest change is confidence: women who once stayed at home now negotiate with buyers from Europe. However, she worries that rising demand could damage the argan forest, so the cooperative now plants young trees every winter.",
    ],
    glossary: [
      { word: "cooperative", ar: "تعاونية", def: "A business owned and run by its members." },
      { word: "income", ar: "دخل", def: "Money you receive regularly." },
      { word: "profit", ar: "ربح", def: "Money left after costs are paid." },
      { word: "negotiate", ar: "يتفاوض", def: "To discuss to reach an agreement." },
    ],
    questions: build("b1-the-cooperative", [
      mc("main-idea", "What is the text mainly about?", ["How an argan cooperative changed women's lives", "The history of Essaouira", "How to make soap", "Problems with European buyers"], "forty women work together in a cooperative that produces argan oil", "It describes the cooperative and its effects."),
      sa("detail", "In which year was the cooperative created? Write the year.", ["2008"], "Before the cooperative was created in 2008", "In 2008."),
      tf("detail", "Members receive only a share of the profits, with no monthly salary.", false, "Every member receives a monthly salary and a share of the profits", "They receive both a salary and a share."),
      mc("inference", "Why does the cooperative plant young trees?", ["Rising demand could damage the argan forest.", "Trees make the village look nicer.", "The government pays them to.", "Old trees produce no nuts."], "rising demand could damage the argan forest", "To protect the forest from rising demand."),
    ]),
  },
  {
    id: "b1-online-shopping-mistake", title: "An Online Shopping Mistake", level: "B1", category: "Money", status: "review", source: "englishcamp",
    paragraphs: [
      "When Yassine saw an advertisement for a famous brand of headphones at half price, he did not think twice. The website looked professional, the photos were clear, and a timer showed that the offer would end in ten minutes. He paid with his bank card immediately.",
      "Three weeks later, nothing had arrived. The tracking number did not work, and the email address of the shop returned his messages. When he searched the shop's name online, he found dozens of complaints from people in the same situation.",
      "Luckily, Yassine contacted his bank quickly, and they were able to block the payment. Since then, he has followed a few rules before buying from a website he does not know: he checks reviews on other sites, looks for a real address and phone number, and never trusts countdown timers. \"If something looks too good to be true,\" he says, \"it usually is.\"",
    ],
    glossary: [
      { word: "advertisement", ar: "إعلان", def: "A message that tries to sell something." },
      { word: "tracking number", ar: "رقم التتبع", def: "A code to follow a parcel." },
      { word: "complaint", ar: "شكوى", def: "A statement that something is wrong." },
      { word: "review", ar: "تقييم / مراجعة", def: "An opinion written by a customer." },
    ],
    questions: build("b1-online-shopping-mistake", [
      mc("main-idea", "What is the main message of the story?", ["Be careful with offers that seem too good to be true", "Headphones are expensive", "Banks never help customers", "Online shops are always dishonest"], "\"If something looks too good to be true,\" he says, \"it usually is.\"", "He learned to be careful."),
      mc("detail", "What made Yassine pay immediately?", ["A timer showed the offer would end soon.", "A friend recommended the shop.", "The shop was near his home.", "He had a discount code."], "a timer showed that the offer would end in ten minutes", "The countdown timer pushed him."),
      tf("detail", "Yassine lost all his money.", false, "they were able to block the payment", "The bank blocked the payment."),
      mc("detail", "Which of these is one of Yassine's new rules?", ["He checks reviews on other sites.", "He only pays in cash.", "He buys only from big brands.", "He asks his bank before every purchase."], "he checks reviews on other sites", "He checks reviews on other sites."),
    ]),
  },
  {
    id: "b1-the-community-garden", title: "A Garden on the Roof", level: "B1", category: "Environment", status: "review", source: "englishcamp",
    paragraphs: [
      "The residents of a large apartment building in Rabat had a problem: there was nowhere for children to play and no green space nearby. One retired engineer, Mr Tazi, suggested using the flat roof, which was empty except for satellite dishes and water tanks.",
      "At first, many neighbours were doubtful. They worried about the weight of the soil, the cost and who would do the work. Mr Tazi asked a structural engineer to check the roof and found that light containers would be safe. Each family paid a small amount, and the teenagers of the building built wooden boxes during the summer holidays.",
      "Two years later, the roof is full of herbs, tomatoes, strawberries and flowers. Families take turns watering, and a schedule is posted near the lift. Neighbours who had never spoken now share recipes and meals. The building's manager says there are also fewer complaints, because people know each other and solve small problems in a friendlier way.",
    ],
    glossary: [
      { word: "resident", ar: "ساكن", def: "A person who lives in a place." },
      { word: "doubtful", ar: "متشكك", def: "Not sure that something is a good idea." },
      { word: "container", ar: "حاوية", def: "A box or pot that holds something." },
      { word: "take turns", ar: "يتناوبون", def: "To do something one after another." },
    ],
    questions: build("b1-the-community-garden", [
      mc("main-idea", "What is the text mainly about?", ["Neighbours create a garden on their roof", "How to repair a roof", "A new park in Rabat", "An engineer's career"], "suggested using the flat roof", "It describes the rooftop garden."),
      mc("detail", "Why were some neighbours doubtful at first?", ["They worried about weight, cost and work.", "They did not like vegetables.", "They wanted a swimming pool.", "The manager refused."], "They worried about the weight of the soil, the cost and who would do the work.", "Weight, cost and work."),
      tf("detail", "The teenagers built wooden boxes during the summer holidays.", true, "the teenagers of the building built wooden boxes during the summer holidays", "Yes."),
      mc("inference", "According to the manager, why are there fewer complaints?", ["People know each other and solve problems more kindly.", "The rules are stricter.", "The rent is lower.", "Fewer people live there."], "because people know each other and solve small problems in a friendlier way", "People know each other now."),
    ]),
  },
  {
    id: "b1-learning-from-failure", title: "Failing My Driving Test", level: "B1", category: "Personal growth", status: "review", source: "englishcamp",
    paragraphs: [
      "I failed my driving test twice. The first time, I was so nervous that I forgot to look in the mirror before changing lanes. The second time, I drove too slowly on a main road, and the examiner said I was a danger to other drivers.",
      "After the second failure, I felt embarrassed and wanted to give up. My friends had all passed on their first try, and I started to believe that I was simply bad at driving. My instructor, however, told me that failing is common and that the problem was not my skill but my stress.",
      "We changed our approach. Instead of practising only the test route, we drove at different times of day, in traffic and in the rain. I also learned some breathing techniques to calm down. On my third attempt, I passed easily. Looking back, I am almost grateful for those failures: they taught me that preparing for difficult conditions is better than hoping for perfect ones.",
    ],
    glossary: [
      { word: "examiner", ar: "ممتحن", def: "A person who tests you." },
      { word: "embarrassed", ar: "محرج", def: "Feeling silly in front of others." },
      { word: "approach", ar: "طريقة / مقاربة", def: "A way of doing something." },
      { word: "grateful", ar: "ممتن", def: "Thankful." },
    ],
    questions: build("b1-learning-from-failure", [
      mc("main-idea", "What is the writer's main lesson?", ["Preparing for difficult conditions helps more than hoping for easy ones", "Driving tests are unfair", "Friends always pass first", "Instructors are too strict"], "preparing for difficult conditions is better than hoping for perfect ones", "That is the lesson in the last sentence."),
      mc("detail", "Why did the writer fail the second test?", ["They drove too slowly on a main road.", "They forgot to look in the mirror.", "They had an accident.", "They arrived late."], "I drove too slowly on a main road", "They drove too slowly."),
      mc("inference", "What did the instructor think was the real problem?", ["Stress, not skill", "Bad eyesight", "The car", "The test route"], "the problem was not my skill but my stress", "Stress."),
      sa("detail", "On which attempt did the writer pass? Write a number or word.", ["3", "third", "3rd", "the third", "third attempt"], "On my third attempt, I passed easily.", "On the third attempt."),
    ]),
  },
  {
    id: "b1-a-day-without-cars", title: "The Car-Free Sunday", level: "B1", category: "City life", status: "review", source: "englishcamp",
    paragraphs: [
      "Last spring, the city council of Tangier tried an experiment: on the first Sunday of every month, the main avenue along the sea was closed to cars from eight in the morning until two in the afternoon.",
      "Some shop owners were against the idea. They feared that customers would not come if they could not park nearby. Taxi drivers also complained that they would lose money. The council promised to review the project after six months.",
      "The results surprised many people. Families came to walk, cycle and skate on the empty road. Street artists and food stalls appeared, and several cafés reported more customers than on normal Sundays. Air pollution on the avenue fell noticeably during those hours. Not everyone is convinced—some residents say it is difficult to visit relatives on those mornings—but the council has decided to continue the car-free Sundays and is now considering adding a second avenue.",
    ],
    glossary: [
      { word: "council", ar: "مجلس (بلدي)", def: "A group that runs a city." },
      { word: "experiment", ar: "تجربة", def: "A test of a new idea." },
      { word: "stall", ar: "كشك", def: "A small table or shop in the street." },
      { word: "convinced", ar: "مقتنع", def: "Sure that something is right." },
    ],
    questions: build("b1-a-day-without-cars", [
      mc("main-idea", "What is the text about?", ["A city experiment closing an avenue to cars", "Taxi drivers in Tangier", "A new cycling club", "Pollution in factories"], "the main avenue along the sea was closed to cars", "It describes the car-free Sunday experiment."),
      mc("detail", "Why were some shop owners against the idea?", ["They feared customers could not park nearby.", "They wanted to close on Sundays.", "They disliked street artists.", "They thought it was too expensive."], "They feared that customers would not come if they could not park nearby.", "Worry about parking and customers."),
      tf("detail", "Air pollution on the avenue fell during the car-free hours.", true, "Air pollution on the avenue fell noticeably during those hours.", "Yes, it fell."),
      mc("detail", "What is the council considering now?", ["Adding a second avenue", "Ending the project", "Closing the avenue every day", "Building a car park"], "is now considering adding a second avenue", "Adding a second avenue."),
    ]),
  },
  {
    id: "b1-the-language-app", title: "Can an App Teach You a Language?", level: "B1", category: "Education", status: "review", source: "englishcamp",
    paragraphs: [
      "Millions of people use language apps every day. The apps are cheap or free, they fit into short breaks, and they reward users with points and streaks. For many learners, they are the easiest way to start a new language.",
      "However, teachers often point out their limits. Most apps focus on single words and short sentences, so learners may know hundreds of words but still struggle to follow a real conversation. Speaking practice is also limited, because talking to a phone is very different from talking to a person who interrupts, uses slang or speaks quickly.",
      "Researchers suggest combining tools. An app can be excellent for vocabulary and daily habit, while conversation classes, films and reading longer texts build the skills that apps cannot. As one teacher puts it, an app is like a gym machine: useful for training one muscle, but it will not make you a footballer on its own.",
    ],
    glossary: [
      { word: "reward", ar: "يكافئ", def: "To give something good for an action." },
      { word: "streak", ar: "سلسلة أيام متتالية", def: "Days in a row that you did something." },
      { word: "struggle", ar: "يجد صعوبة", def: "To have difficulty." },
      { word: "slang", ar: "عامية", def: "Very informal words." },
    ],
    questions: build("b1-the-language-app", [
      mc("main-idea", "What is the writer's main point?", ["Apps are useful but should be combined with other practice.", "Apps are useless.", "Apps are better than teachers.", "Only films teach languages."], "Researchers suggest combining tools.", "Combine apps with other methods."),
      mc("detail", "According to teachers, what is one limit of most apps?", ["They focus on single words and short sentences.", "They are too expensive.", "They have no vocabulary.", "They need a computer."], "Most apps focus on single words and short sentences", "They focus on words and short sentences."),
      tf("inference", "The text says talking to a phone is the same as talking to a person.", false, "talking to a phone is very different from talking to a person", "It is very different."),
      mc("vocabulary", "In the gym comparison, what does the 'one muscle' represent?", ["One language skill", "A football match", "A teacher", "A phone"], "useful for training one muscle", "It represents one skill, like vocabulary."),
    ]),
  },
  {
    id: "b1-a-volunteer-in-the-mountains", title: "Teaching in the Mountains", level: "B1", category: "Community", status: "review", source: "englishcamp",
    paragraphs: [
      "After finishing her degree in English, Asmae spent a year as a volunteer teacher in a village in the High Atlas. The school had only two classrooms, and in winter the road was often closed by snow.",
      "At first, she found it hard. Many children spoke Tamazight at home and knew little Arabic or French, and Asmae did not speak Tamazight. She asked an older student to help translate, and in return she gave him extra English lessons in the evenings. Slowly, she learned enough Tamazight to make simple jokes, which helped the children trust her.",
      "Asmae says she learned more than she taught. She discovered how much the families valued education, even when they had very little money, and how creative teachers must be without computers or books. Today she works in a school in Marrakech, but she returns to the village every spring with boxes of donated books.",
    ],
    glossary: [
      { word: "degree", ar: "شهادة جامعية", def: "A university qualification." },
      { word: "volunteer", ar: "متطوع", def: "A person who works without pay." },
      { word: "in return", ar: "في المقابل", def: "As an exchange." },
      { word: "donated", ar: "متبرع به", def: "Given free to help others." },
    ],
    questions: build("b1-a-volunteer-in-the-mountains", [
      mc("main-idea", "What is the text mainly about?", ["Asmae's year as a volunteer teacher in a mountain village", "Snow in the High Atlas", "How to learn Tamazight", "A school in Marrakech"], "spent a year as a volunteer teacher in a village in the High Atlas", "It describes her volunteer year."),
      mc("detail", "How did Asmae communicate at first?", ["An older student helped translate.", "She used a translation app.", "The children spoke French.", "She did not speak to them."], "She asked an older student to help translate", "An older student translated."),
      tf("detail", "Asmae now lives in the village all year.", false, "Today she works in a school in Marrakech", "She works in Marrakech now."),
      mc("inference", "What did Asmae discover about the families?", ["They valued education highly.", "They did not want schools.", "They were all rich.", "They spoke English."], "how much the families valued education", "They valued education."),
    ]),
  },
  {
    id: "b1-the-noisy-neighbour", title: "The Noisy Neighbour", level: "B1", category: "Relationships", status: "review", source: "englishcamp",
    paragraphs: [
      "When Hamza moved into his new flat, everything seemed perfect until the first night. At midnight, loud music started in the flat above him and continued until almost three in the morning. The same thing happened the next weekend, and the one after that.",
      "Hamza's friends told him to complain to the building manager or even call the police. Instead, he decided to talk to his neighbour first. He knocked on the door one afternoon with a plate of cakes. The neighbour, a young DJ named Anas, was surprised and apologised. He explained that he practised at night because he worked in clubs and had no other time.",
      "Together, they found a solution. Anas bought headphones for late practice and put a thick carpet on his floor. Hamza promised to tell him directly if there was a problem again. Months later, they are friends, and Anas even invited Hamza to his first big concert.",
    ],
    glossary: [
      { word: "complain", ar: "يشتكي", def: "To say that something is wrong." },
      { word: "apologise", ar: "يعتذر", def: "To say sorry." },
      { word: "solution", ar: "حل", def: "A way to solve a problem." },
      { word: "directly", ar: "مباشرة", def: "Without someone in the middle." },
    ],
    questions: build("b1-the-noisy-neighbour", [
      mc("main-idea", "What is the main message of the story?", ["Talking directly can solve conflicts better than complaining.", "DJs should not live in flats.", "The police should handle noise.", "Carpets are expensive."], "he decided to talk to his neighbour first", "Talking directly solved the problem."),
      mc("detail", "Why did Anas practise at night?", ["He worked in clubs and had no other time.", "He liked loud music at night.", "His family slept during the day.", "He wanted to annoy Hamza."], "he practised at night because he worked in clubs and had no other time", "He had no other time."),
      tf("detail", "Hamza called the police.", false, "Instead, he decided to talk to his neighbour first.", "He talked to the neighbour instead."),
      mc("detail", "What did Anas do to solve the problem?", ["Bought headphones and put a thick carpet down", "Moved to another flat", "Stopped playing music", "Played only in the morning"], "Anas bought headphones for late practice and put a thick carpet on his floor", "Headphones and a carpet."),
    ]),
  },
  {
    id: "b1-street-food-business", title: "From Street Stall to Restaurant", level: "B1", category: "Business", status: "review", source: "englishcamp",
    paragraphs: [
      "Ten years ago, Brahim sold grilled sardine sandwiches from a small cart near the port of Safi. He had no business training, but he had a simple idea: use fresh fish from the morning boats and sell it at a fair price.",
      "His sandwiches became popular with fishermen and students. Brahim saved most of what he earned and, after five years, rented a tiny shop with four tables. He kept the menu short, because he believed it was better to cook a few dishes very well than many dishes badly.",
      "Today his restaurant has thirty tables and employs twelve people, including two of his former customers. Food bloggers have written about it, and tourists sometimes wait an hour for a seat. When asked about his success, Brahim mentions three things: quality ingredients, honest prices and treating every customer the same, whether they arrive by bus or by car.",
    ],
    glossary: [
      { word: "cart", ar: "عربة", def: "A small vehicle you push." },
      { word: "fair price", ar: "سعر عادل", def: "A price that is reasonable." },
      { word: "rent", ar: "يستأجر", def: "To pay to use a place." },
      { word: "employ", ar: "يوظف", def: "To give someone a job." },
    ],
    questions: build("b1-street-food-business", [
      mc("main-idea", "What is the text about?", ["How Brahim built a successful restaurant", "Fishing in Safi", "Food bloggers", "How to cook sardines"], "Today his restaurant has thirty tables", "It tells Brahim's business story."),
      mc("detail", "Why did Brahim keep the menu short?", ["To cook a few dishes very well", "Because fish was expensive", "Because the kitchen was broken", "His staff asked him to"], "it was better to cook a few dishes very well than many dishes badly", "To do a few dishes well."),
      sa("detail", "How many people does the restaurant employ? Write a number.", ["12", "twelve", "twelve people"], "employs twelve people", "Twelve."),
      tf("detail", "Brahim studied business before starting.", false, "He had no business training", "He had no training."),
    ]),
  },
  {
    id: "b1-sleep-and-exams", title: "Sleep Before Exams", level: "B1", category: "Health", status: "review", source: "englishcamp",
    paragraphs: [
      "During exam periods, many students study late into the night, believing that every extra hour of revision will improve their marks. Some drink several cups of coffee to stay awake until two or three in the morning.",
      "Sleep scientists say this strategy often backfires. While we sleep, the brain organises and stores what we learned during the day. Students who sleep less than six hours tend to remember less, concentrate poorly and make more careless mistakes in exams.",
      "Experts recommend planning revision over several weeks instead of a few nights, taking short breaks every hour, and stopping screens at least thirty minutes before bed. A short nap of twenty minutes in the afternoon can also help. As one researcher put it, \"Sleep is not time taken away from studying. It is part of studying.\"",
    ],
    glossary: [
      { word: "revision", ar: "مراجعة", def: "Studying again before an exam." },
      { word: "backfire", ar: "ينقلب ضد صاحبه", def: "To have the opposite result." },
      { word: "concentrate", ar: "يركز", def: "To give all your attention." },
      { word: "nap", ar: "قيلولة", def: "A short sleep in the day." },
    ],
    questions: build("b1-sleep-and-exams", [
      mc("main-idea", "What is the main idea of the text?", ["Sleep is an important part of studying.", "Coffee helps students learn.", "Exams should be shorter.", "Students should study only at night."], "Sleep is not time taken away from studying. It is part of studying.", "Sleep is part of studying."),
      mc("detail", "What does the brain do while we sleep?", ["It organises and stores what we learned.", "It forgets new words.", "It stops working.", "It plans the next day."], "the brain organises and stores what we learned during the day", "It stores what we learned."),
      sa("detail", "How long should an afternoon nap be? Write the number of minutes.", ["20", "twenty", "twenty minutes", "20 minutes"], "A short nap of twenty minutes", "Twenty minutes."),
      mc("vocabulary", "In the text, 'backfires' means…", ["has the opposite result", "makes a fire", "works perfectly", "is very expensive"], "this strategy often backfires", "It has the opposite effect."),
    ]),
  },
  {
    id: "b1-the-family-business-decision", title: "Should I Join the Family Shop?", level: "B1", category: "Work", status: "review", source: "englishcamp",
    paragraphs: [
      "Ilyas's family has owned a fabric shop in the Fes medina for three generations. His father hoped that Ilyas, his only son, would take over one day. But Ilyas had studied computer science and dreamed of working for a tech company in Casablanca.",
      "For a long time, they avoided the subject. Then, one evening, his father admitted that the shop was losing customers to online stores and that he did not know how to change. Ilyas realised that his skills could be useful to the family business.",
      "They agreed on a compromise. Ilyas took a job in Casablanca but built a website and social media pages for the shop in his free time. Within a year, a third of the shop's sales came from online orders, including customers in France and Canada. Ilyas still lives in Casablanca, but he visits every month, and his father says the shop has never been busier.",
    ],
    glossary: [
      { word: "fabric", ar: "قماش", def: "Material used to make clothes." },
      { word: "generation", ar: "جيل", def: "People born at about the same time in a family." },
      { word: "take over", ar: "يتولى", def: "To become responsible for something." },
      { word: "compromise", ar: "حل وسط", def: "An agreement where both sides give something." },
    ],
    questions: build("b1-the-family-business-decision", [
      mc("main-idea", "What is the story mainly about?", ["A father and son find a compromise about the family shop", "A tech company in Casablanca", "The history of fabric in Fes", "Shopping in Canada"], "They agreed on a compromise.", "They found a compromise."),
      mc("detail", "What problem did the father admit?", ["The shop was losing customers to online stores.", "He was ill.", "He wanted to move to France.", "The shop was too small."], "the shop was losing customers to online stores", "Losing customers to online stores."),
      tf("detail", "Ilyas moved back to Fes to run the shop.", false, "Ilyas still lives in Casablanca", "He still lives in Casablanca."),
      mc("detail", "What share of sales came from online orders within a year?", ["A third", "Half", "All of them", "A tenth"], "a third of the shop's sales came from online orders", "A third."),
    ]),
  },
  {
    id: "b1-the-blood-donation", title: "My First Blood Donation", level: "B1", category: "Health", status: "review", source: "englishcamp",
    paragraphs: [
      "I had always wanted to give blood, but I kept finding excuses: I was too busy, I did not like needles, or I was not sure where to go. Then my cousin needed an operation, and the hospital asked the family to find donors.",
      "At the blood centre, a nurse asked me questions about my health and checked my weight and blood pressure. The donation itself took less than ten minutes. I felt a small pinch at the beginning, and after that I did not feel anything. Afterwards, I had to rest for a quarter of an hour and drink juice.",
      "My cousin's operation went well, and I felt proud that I had helped. The nurse told me that one donation can help up to three patients, because the blood is separated into different parts. I now donate every four months, and I have convinced two friends to come with me.",
    ],
    glossary: [
      { word: "donor", ar: "متبرع", def: "A person who gives something, like blood." },
      { word: "needle", ar: "إبرة", def: "A thin sharp metal tool." },
      { word: "pinch", ar: "قرصة", def: "A small short pain." },
      { word: "convince", ar: "يقنع", def: "To make someone agree." },
    ],
    questions: build("b1-the-blood-donation", [
      mc("main-idea", "What is the text about?", ["The writer's first time giving blood", "How hospitals work", "A dangerous operation", "Fear of nurses"], "I had always wanted to give blood", "It describes the first donation."),
      mc("detail", "What finally made the writer donate?", ["Their cousin needed an operation.", "A friend asked them.", "They saw an advertisement.", "Their doctor told them to."], "Then my cousin needed an operation", "The cousin's operation."),
      sa("detail", "How many patients can one donation help? Write a number.", ["3", "three", "up to three", "up to 3"], "one donation can help up to three patients", "Up to three."),
      tf("detail", "The donation took more than an hour.", false, "The donation itself took less than ten minutes.", "Less than ten minutes."),
    ]),
  },
  {
    id: "b1-the-hiking-trip", title: "Lost on Toubkal", level: "B1", category: "Travel", status: "review", source: "englishcamp",
    paragraphs: [
      "Three friends planned to climb Mount Toubkal, the highest mountain in North Africa, in two days. They were fit and excited, but they decided not to hire a local guide because they wanted to save money and believed the path was easy to follow.",
      "On the second morning, they left the refuge before sunrise. Clouds came down quickly, and soon they could see only a few metres in front of them. Their phones had no signal, and they realised they had left the marked path. For two hours, they walked carefully, trying to find any sign of the trail.",
      "Finally, they heard voices: a guide with a group of hikers. He led them back to the path and refused to accept money. The friends reached the summit later that day, but they agreed that the experience had taught them an important lesson. On their next trip, they will hire a guide and carry a paper map and compass.",
    ],
    glossary: [
      { word: "hire", ar: "يستأجر / يوظف", def: "To pay someone to do a job." },
      { word: "refuge", ar: "ملجأ جبلي", def: "A mountain hut where climbers sleep." },
      { word: "trail", ar: "مسار", def: "A path in the countryside." },
      { word: "summit", ar: "قمة", def: "The top of a mountain." },
    ],
    questions: build("b1-the-hiking-trip", [
      mc("main-idea", "What is the story mainly about?", ["Friends get lost in the clouds on Toubkal and learn a lesson", "How to become a mountain guide", "The history of Toubkal", "A refuge in the mountains"], "they realised they had left the marked path", "They get lost and learn a lesson."),
      mc("detail", "Why did the friends not hire a guide?", ["To save money and because they thought the path was easy", "Because no guide was available", "Because guides are dangerous", "Because they had a GPS"], "they wanted to save money and believed the path was easy to follow", "To save money; they thought it was easy."),
      tf("detail", "The guide asked them for money.", false, "refused to accept money", "He refused money."),
      mc("inference", "What will they do differently next time?", ["Hire a guide and carry a map and compass", "Climb at night", "Go alone", "Use only their phones"], "they will hire a guide and carry a paper map and compass", "Hire a guide and carry a map and compass."),
    ]),
  },
  {
    id: "b1-the-podcast", title: "Starting a Podcast", level: "B1", category: "Technology", status: "review", source: "englishcamp",
    paragraphs: [
      "Kawtar and her friend Ines love talking about books. Last year, they decided to record their conversations and publish them as a podcast. They started with just a phone and a quiet bedroom.",
      "The first episodes had many problems: the sound was echoey, they interrupted each other, and some episodes lasted almost two hours. Only their families listened. Instead of giving up, they asked listeners for honest feedback and watched free online tutorials about recording and editing.",
      "They bought two cheap microphones, put blankets on the walls to reduce echo and limited each episode to thirty minutes. They also started inviting young Moroccan writers as guests. After a year, the podcast has more than three thousand regular listeners, and a local radio station has offered them a weekly slot.",
    ],
    glossary: [
      { word: "episode", ar: "حلقة", def: "One part of a series." },
      { word: "echoey", ar: "فيه صدى", def: "With sound bouncing back." },
      { word: "feedback", ar: "ملاحظات / تقييم", def: "Comments about how well you did." },
      { word: "slot", ar: "فترة زمنية مخصصة", def: "A fixed time in a schedule." },
    ],
    questions: build("b1-the-podcast", [
      mc("main-idea", "What is the text mainly about?", ["How two friends improved their book podcast", "How to write a novel", "A radio station's history", "Buying microphones"], "decided to record their conversations and publish them as a podcast", "It describes their podcast journey."),
      mc("detail", "What did they do to reduce echo?", ["Put blankets on the walls", "Recorded outside", "Spoke more quietly", "Used a bigger room"], "put blankets on the walls to reduce echo", "Blankets on the walls."),
      sa("detail", "How long is each episode now? Write the number of minutes.", ["30", "thirty", "thirty minutes", "30 minutes"], "limited each episode to thirty minutes", "Thirty minutes."),
      tf("detail", "A local radio station offered them a weekly slot.", true, "a local radio station has offered them a weekly slot", "Yes."),
    ]),
  },
  {
    id: "b1-water-saving", title: "Every Drop Counts", level: "B1", category: "Environment", status: "review", source: "englishcamp",
    paragraphs: [
      "Morocco has faced several years of drought, and many cities have introduced rules to save water. In some places, car washes and hammams close on certain days, and watering gardens with drinking water is restricted.",
      "Experts say that households can also make a real difference. A dripping tap can waste more than ten litres a day, and a shower of ten minutes uses about four times more water than a quick one of two or three minutes. Simple devices that reduce the flow of taps and showers are cheap and easy to install.",
      "Some families have gone further. The Chraibi family in Meknes collects water from washing vegetables to water their plants, and they repaired all the leaks in their house. Their water bill fell by almost a third. \"It is not about suffering,\" says Mrs Chraibi. \"It is about paying attention.\"",
    ],
    glossary: [
      { word: "drought", ar: "جفاف", def: "A long time without rain." },
      { word: "restricted", ar: "مقيد", def: "Limited by rules." },
      { word: "leak", ar: "تسرب", def: "Water escaping through a hole." },
      { word: "household", ar: "أسرة / بيت", def: "The people who live in one home." },
    ],
    questions: build("b1-water-saving", [
      mc("main-idea", "What is the text about?", ["Saving water during drought", "How hammams work", "Vegetable gardens in Meknes", "The price of showers"], "many cities have introduced rules to save water", "It is about saving water."),
      mc("detail", "How much water can a dripping tap waste in a day?", ["More than ten litres", "About one litre", "A hundred litres", "Nothing"], "A dripping tap can waste more than ten litres a day", "More than ten litres."),
      tf("detail", "The Chraibi family's water bill fell by almost a third.", true, "Their water bill fell by almost a third.", "Yes."),
      mc("inference", "What does Mrs Chraibi mean by 'paying attention'?", ["Small careful habits save water.", "Families must suffer.", "Water should be free.", "Only the government can help."], "\"It is about paying attention.\"", "Being careful in daily habits."),
    ]),
  },
  {
    id: "b1-the-mentor", title: "The Mentor", level: "B1", category: "Work", status: "review", source: "englishcamp",
    paragraphs: [
      "When Soukaina joined a big accounting company in Casablanca, she was assigned a mentor, a senior colleague named Mr Lahlou. She expected him to check her work and correct her mistakes, but their relationship turned out to be very different.",
      "Instead of giving her answers, Mr Lahlou asked questions. When she made an error, he asked her how she had found it and how she could avoid it next time. He also encouraged her to present her ideas in meetings, even when she felt unsure. At first this frustrated her, because she wanted quick solutions.",
      "After a year, Soukaina noticed that she solved problems more independently than other new employees. She was promoted earlier than expected. Now she mentors two young colleagues herself, and she uses the same method. \"Answers help you once,\" she says. \"Good questions help you for years.\"",
    ],
    glossary: [
      { word: "mentor", ar: "مرشد / موجّه", def: "An experienced person who guides a beginner." },
      { word: "assign", ar: "يكلّف / يعيّن", def: "To give someone a job or role." },
      { word: "frustrate", ar: "يحبط", def: "To make someone annoyed or disappointed." },
      { word: "promote", ar: "يرقّي", def: "To give someone a higher job." },
    ],
    questions: build("b1-the-mentor", [
      mc("main-idea", "What is the main idea of the text?", ["Asking good questions helps people learn to solve problems.", "Mentors should give quick answers.", "Accounting is difficult.", "Meetings are a waste of time."], "Good questions help you for years.", "Good questions build independence."),
      mc("detail", "What did Mr Lahlou do when Soukaina made an error?", ["He asked how she found it and how to avoid it.", "He corrected it himself.", "He told the manager.", "He ignored it."], "he asked her how she had found it and how she could avoid it next time", "He asked questions."),
      tf("detail", "Soukaina liked the method from the very beginning.", false, "At first this frustrated her", "At first it frustrated her."),
      mc("detail", "What does Soukaina do now?", ["She mentors two young colleagues.", "She left the company.", "She teaches at university.", "She works alone."], "Now she mentors two young colleagues herself", "She mentors two colleagues."),
    ]),
  },
  {
    id: "b1-the-wedding-photographer", title: "Behind the Camera", level: "B1", category: "Culture", status: "review", source: "englishcamp",
    paragraphs: [
      "Youssra is a wedding photographer in Marrakech. In summer, she works almost every weekend, and some weddings last from late afternoon until five in the morning. People often think her job is glamorous, but it is physically exhausting.",
      "Her work starts weeks before the wedding. She meets the couple, visits the venue and makes a list of important moments and family members. On the day, she carries two cameras and several kilos of equipment, and she must be ready for unexpected situations, like a power cut or rain during outdoor photos.",
      "After the wedding, she spends up to two weeks selecting and editing the photos. Out of several thousand pictures, she delivers about four hundred. Youssra says the hardest part is not the long nights but the responsibility: \"You cannot repeat a wedding. If I miss the moment, it is gone forever.\"",
    ],
    glossary: [
      { word: "glamorous", ar: "براق / فاخر", def: "Exciting and attractive." },
      { word: "venue", ar: "مكان الحفل", def: "The place where an event happens." },
      { word: "equipment", ar: "معدات", def: "The tools you need for a job." },
      { word: "responsibility", ar: "مسؤولية", def: "A duty to do something well." },
    ],
    questions: build("b1-the-wedding-photographer", [
      mc("main-idea", "What is the text mainly about?", ["The real work of a wedding photographer", "How to plan a wedding", "Weddings in summer", "Buying a camera"], "Youssra is a wedding photographer in Marrakech.", "It shows the reality of her job."),
      sa("detail", "About how many photos does Youssra deliver? Write a number.", ["400", "four hundred", "about 400", "about four hundred"], "she delivers about four hundred", "About four hundred."),
      mc("inference", "According to Youssra, what is the hardest part?", ["The responsibility of not missing moments", "The long nights", "Carrying equipment", "Meeting couples"], "the hardest part is not the long nights but the responsibility", "The responsibility."),
      tf("detail", "Youssra's job starts on the wedding day.", false, "Her work starts weeks before the wedding.", "It starts weeks before."),
    ]),
  },
  {
    id: "b1-electric-scooters", title: "Scooters in the City", level: "B1", category: "City life", status: "review", source: "englishcamp",
    paragraphs: [
      "Shared electric scooters arrived in several Moroccan cities recently. Users unlock them with a phone app, ride to their destination and leave them on the pavement. For short trips, they are faster than buses and cheaper than taxis.",
      "Not everyone is happy, though. Pedestrians complain that scooters are left in the middle of pavements, blocking people with prams and wheelchairs. Doctors have also reported more injuries, mostly among young riders who do not wear helmets or who ride two people on one scooter.",
      "Some cities have reacted by creating special parking zones and setting a speed limit of twenty kilometres per hour. Supporters say scooters reduce traffic and pollution if they replace car trips. Critics answer that many users would otherwise have walked. The debate is likely to continue as cities decide how to share their streets.",
    ],
    glossary: [
      { word: "pavement", ar: "رصيف", def: "The path for people next to a road." },
      { word: "pedestrian", ar: "راجل / ماشٍ", def: "A person who is walking." },
      { word: "helmet", ar: "خوذة", def: "A hard hat that protects your head." },
      { word: "debate", ar: "نقاش", def: "A discussion with different opinions." },
    ],
    questions: build("b1-electric-scooters", [
      mc("main-idea", "What is the text mainly about?", ["The advantages and problems of shared electric scooters", "How to repair a scooter", "Taxi prices", "Children's wheelchairs"], "Shared electric scooters arrived in several Moroccan cities recently.", "It discusses scooters' pros and cons."),
      mc("detail", "Why do pedestrians complain?", ["Scooters block the pavements.", "Scooters are too slow.", "Scooters are expensive.", "Scooters are noisy."], "scooters are left in the middle of pavements", "They block pavements."),
      sa("detail", "What speed limit have some cities set? Write the number.", ["20", "twenty", "20 km/h", "twenty kilometres per hour", "20 kilometres per hour"], "a speed limit of twenty kilometres per hour", "Twenty kilometres per hour."),
      mc("inference", "What do critics argue?", ["Many users would otherwise have walked.", "Scooters cause more traffic jams than cars.", "Scooters should be free.", "Helmets are unnecessary."], "many users would otherwise have walked", "Users would have walked anyway."),
    ]),
  },
  {
    id: "b2-remote-villages-internet", title: "Connecting Remote Villages", level: "B2", category: "Technology", status: "review", source: "englishcamp",
    paragraphs: [
      "For years, many villages in Morocco's mountains had little or no internet connection. Students walked several kilometres to find a signal on a hilltop, and small businesses could not sell beyond the nearest market. Recent programmes to extend mobile networks and install community Wi-Fi points have begun to change this picture.",
      "The benefits are visible. Pupils can access online lessons and revision videos, farmers check weather forecasts and market prices before deciding when to sell, and women's cooperatives now receive orders from customers in big cities and abroad. Some young people who had planned to move to the city have chosen to stay and start small online businesses instead.",
      "Yet connection alone does not guarantee opportunity. Older residents often lack digital skills, data plans remain expensive for many families, and misinformation spreads quickly in new online communities. Local associations argue that infrastructure must be accompanied by training, affordable prices and media literacy. Otherwise, they warn, the digital divide may simply move from the question of access to the question of use.",
    ],
    glossary: [
      { word: "extend", ar: "يوسّع / يمدّ", def: "To make something reach further." },
      { word: "guarantee", ar: "يضمن", def: "To make certain that something happens." },
      { word: "misinformation", ar: "معلومات مضللة", def: "False information." },
      { word: "digital divide", ar: "الفجوة الرقمية", def: "The gap between people with and without digital access or skills." },
    ],
    questions: build("b2-remote-villages-internet", [
      mc("main-idea", "What is the writer's main point?", ["Internet access helps villages, but training and affordability are also needed.", "Villages do not need the internet.", "Only farmers benefit from the internet.", "Cities should pay for village internet."], "connection alone does not guarantee opportunity", "Access helps, but it is not enough alone."),
      mc("detail", "How do farmers use the internet?", ["To check weather forecasts and market prices", "To sell land", "To watch films", "To find workers abroad"], "farmers check weather forecasts and market prices", "Weather and prices."),
      tf("inference", "According to the text, some young people stayed in their village because of the internet.", true, "have chosen to stay and start small online businesses instead", "Yes, some chose to stay."),
      mc("vocabulary", "In the last sentence, the divide 'moving from access to use' means…", ["the problem becomes skills and use, not just having a connection", "people will move to cities", "the internet will become slower", "villages will lose access"], "the digital divide may simply move from the question of access to the question of use", "The gap shifts to skills and use."),
    ]),
  },
  {
    id: "b2-the-four-minute-rule", title: "Why Small Tasks Pile Up", level: "B2", category: "Psychology", status: "review", source: "englishcamp",
    paragraphs: [
      "Most people know the feeling: a reply to an email, a form to fill in, a call to book an appointment. None of these tasks is difficult, yet they accumulate until the list becomes stressful. Psychologists suggest that the problem is rarely the size of the task but the effort of starting it.",
      "One popular strategy is a simple rule: if something takes less than about four minutes, do it immediately rather than writing it down. The logic is that recording, remembering and returning to a tiny task often costs more mental energy than the task itself. Supporters say the rule reduces the background anxiety created by unfinished business.",
      "Critics, however, point out a risk. Someone who constantly handles small tasks may spend the whole day reacting to interruptions and never reach the deep, focused work that matters most. The solution, many productivity coaches argue, is to protect blocks of uninterrupted time for important projects, and to apply the quick-task rule only during set periods, such as the first half hour of the morning or after lunch.",
    ],
    glossary: [
      { word: "accumulate", ar: "يتراكم", def: "To gradually increase in number." },
      { word: "logic", ar: "منطق", def: "The reasoning behind an idea." },
      { word: "anxiety", ar: "قلق", def: "A feeling of worry." },
      { word: "uninterrupted", ar: "متواصل دون انقطاع", def: "Without stops or disturbances." },
    ],
    questions: build("b2-the-four-minute-rule", [
      mc("main-idea", "What does the text mainly discuss?", ["A rule for small tasks and its limits", "How to write emails", "Why appointments are stressful", "The history of psychology"], "One popular strategy is a simple rule", "It explains the rule and a criticism."),
      mc("detail", "According to supporters, why do the quick task immediately?", ["Recording and returning to it costs more energy than doing it.", "It is more fun.", "Managers prefer it.", "It saves paper."], "recording, remembering and returning to a tiny task often costs more mental energy than the task itself", "It saves mental energy."),
      tf("detail", "Critics say the rule may prevent deep, focused work.", true, "never reach the deep, focused work that matters most", "Yes."),
      mc("inference", "What do productivity coaches recommend?", ["Use the rule only in set periods and protect focus time", "Never use the rule", "Do all tasks in the evening", "Write every task down"], "apply the quick-task rule only during set periods", "Use it at set times and protect focus time."),
    ]),
  },
  {
    id: "b2-traditional-crafts", title: "Can Traditional Crafts Survive?", level: "B2", category: "Culture", status: "review", source: "englishcamp",
    paragraphs: [
      "In the workshops of Fes and Safi, potters and leatherworkers still use techniques passed down for centuries. Their products attract tourists from around the world, yet many masters worry that the crafts may disappear within a generation, because few young people want to spend years as apprentices for modest pay.",
      "Cheap factory-made imitations add to the pressure. In some markets, plates and bags labelled as handmade are in fact produced in large quantities elsewhere, and visitors find it hard to tell the difference. Genuine artisans cannot compete on price, since a single carpet may take several months to weave.",
      "Several initiatives are trying to reverse the trend. Labels that certify authentic handmade products help buyers make informed choices, while training centres pay apprentices a basic wage during their studies. Some designers collaborate with artisans to create modern objects using traditional methods, opening new markets. Whether these efforts succeed may depend less on nostalgia than on whether young people can earn a decent living from the work.",
    ],
    glossary: [
      { word: "apprentice", ar: "متدرّب", def: "A person learning a trade from a skilled worker." },
      { word: "imitation", ar: "تقليد", def: "A copy made to look like the real thing." },
      { word: "genuine", ar: "أصيل / حقيقي", def: "Real; not fake." },
      { word: "nostalgia", ar: "حنين إلى الماضي", def: "A warm feeling about the past." },
    ],
    questions: build("b2-traditional-crafts", [
      mc("main-idea", "What is the central question of the text?", ["Whether traditional crafts can survive economic pressure", "How to weave a carpet", "Why tourists visit Fes", "How factories are built"], "many masters worry that the crafts may disappear within a generation", "It asks if crafts can survive."),
      mc("detail", "Why can genuine artisans not compete on price?", ["Handmade items take a long time to make.", "They use expensive machines.", "Tourists refuse to pay.", "Taxes are too high."], "since a single carpet may take several months to weave", "Handmade work takes long."),
      tf("detail", "Some training centres pay apprentices a basic wage.", true, "training centres pay apprentices a basic wage", "Yes."),
      mc("inference", "According to the writer, success may depend mainly on…", ["whether young people can earn a decent living", "more nostalgia", "cheaper imitations", "fewer tourists"], "depend less on nostalgia than on whether young people can earn a decent living", "Earning a decent living."),
    ]),
  },
  {
    id: "b2-the-gig-economy", title: "Delivering for an App", level: "B2", category: "Work", status: "review", source: "englishcamp",
    paragraphs: [
      "On any evening in Casablanca, hundreds of riders on motorbikes deliver food ordered through apps. For many of them, the work offers something rare: flexible hours and immediate income without a diploma or a long hiring process. Students fit shifts around classes, and some workers combine deliveries with a second job.",
      "Behind the flexibility, however, lie real risks. Riders are usually classed as independent contractors rather than employees, which means they often lack health insurance, paid leave or protection if the app changes its rates. Pay depends on the number of deliveries, so riders may feel pushed to drive fast in heavy traffic, increasing the danger of accidents.",
      "Governments around the world are debating how to regulate this kind of work. Some propose a minimum payment per hour of activity; others want platforms to contribute to social security. The companies argue that strict rules would reduce flexibility and the number of available jobs. Finding a balance between freedom and protection remains one of the central labour questions of our time.",
    ],
    glossary: [
      { word: "flexible", ar: "مرن", def: "Able to change easily." },
      { word: "contractor", ar: "متعاقد مستقل", def: "A person who works independently, not as an employee." },
      { word: "regulate", ar: "ينظّم (بقوانين)", def: "To control with rules." },
      { word: "platform", ar: "منصة", def: "An online service that connects people." },
    ],
    questions: build("b2-the-gig-economy", [
      mc("main-idea", "What is the text mainly about?", ["The benefits and risks of app-based delivery work", "How to order food online", "Traffic in Casablanca", "Motorbike prices"], "Behind the flexibility, however, lie real risks.", "It weighs flexibility against risks."),
      mc("detail", "What does being an 'independent contractor' often mean for riders?", ["They lack insurance and paid leave.", "They earn a fixed salary.", "They work fewer hours.", "They choose the app's prices."], "they often lack health insurance, paid leave", "No insurance or paid leave."),
      tf("detail", "The companies support strict new rules.", false, "The companies argue that strict rules would reduce flexibility", "They argue against strict rules."),
      mc("inference", "Why might riders drive too fast?", ["Pay depends on the number of deliveries.", "The apps require it.", "Their bikes are fast.", "Customers complain."], "Pay depends on the number of deliveries", "Pay per delivery pushes speed."),
    ]),
  },
  {
    id: "b2-saving-the-oasis", title: "The Shrinking Oasis", level: "B2", category: "Environment", status: "review", source: "englishcamp",
    paragraphs: [
      "The palm groves of southern Morocco have supported communities for centuries. Traditional irrigation channels called khettaras carried water from underground sources across long distances, and the shade of date palms protected smaller crops of barley, henna and vegetables beneath them.",
      "Over recent decades, many oases have shrunk. Repeated droughts, the spread of a fungal disease affecting palms and the drilling of deep wells have lowered water tables, while young people have left for cities in search of work. Abandoned plots dry out quickly and become vulnerable to desert sand.",
      "Restoration projects now combine old and new knowledge. Communities are repairing khettaras, planting disease-resistant palm varieties and using drip irrigation that delivers water directly to roots. Eco-tourism provides additional income, though residents insist it must remain small enough not to strain water supplies. The future of the oases, experts say, depends as much on keeping people there as on keeping water there.",
    ],
    glossary: [
      { word: "irrigation", ar: "ري", def: "Supplying water to land for crops." },
      { word: "water table", ar: "منسوب المياه الجوفية", def: "The level of water under the ground." },
      { word: "abandoned", ar: "مهجور", def: "Left empty, no longer used." },
      { word: "restoration", ar: "ترميم / استصلاح", def: "Returning something to a good state." },
    ],
    questions: build("b2-saving-the-oasis", [
      mc("main-idea", "What is the text mainly about?", ["Why oases are shrinking and how communities are restoring them", "The history of dates", "Tourism in the desert", "Building deep wells"], "many oases have shrunk", "It explains decline and restoration."),
      mc("detail", "What were khettaras used for?", ["Carrying water from underground sources", "Storing dates", "Protecting houses from sand", "Selling crops"], "carried water from underground sources across long distances", "Carrying underground water."),
      tf("detail", "Residents want eco-tourism to grow as large as possible.", false, "it must remain small enough not to strain water supplies", "They want it to stay small."),
      mc("inference", "According to experts, the oases' future depends on…", ["keeping both people and water there", "more deep wells", "only planting new palms", "closing the oases to visitors"], "depends as much on keeping people there as on keeping water there", "People and water."),
    ]),
  },
  {
    id: "c1-attention-and-reading", title: "Reading in an Age of Distraction", level: "C1", category: "Society", status: "review", source: "englishcamp",
    paragraphs: [
      "Surveys in many countries suggest that people read as many words as ever, perhaps more, yet fewer of them report reading long texts from beginning to end. Messages, headlines and social media posts compete for attention in brief, fragmented bursts, and some researchers argue that this pattern is reshaping not only what we read but how we read.",
      "Studies comparing reading on paper and on screens have found, on average, slightly better comprehension of longer, complex texts on paper, particularly when readers are under time pressure. One explanation is that screens encourage a skimming mode suited to scanning for information, which readers then apply even when a text demands slower, sustained concentration. The difference is not inevitable, however: readers who deliberately slow down can perform equally well on screen.",
      "This has prompted calls for what some educators term 'bi-literacy': the ability to switch consciously between rapid scanning and deep reading according to purpose. Rather than nostalgically rejecting digital media, the argument goes, schools should explicitly teach students to recognise which mode a task requires and to protect time for uninterrupted reading. Whether such habits can compete with platforms designed to capture attention remains an open question.",
    ],
    glossary: [
      { word: "fragmented", ar: "مجزأ", def: "Broken into small separate parts." },
      { word: "skim", ar: "يتصفح بسرعة", def: "To read quickly for the main points." },
      { word: "inevitable", ar: "حتمي", def: "Certain to happen." },
      { word: "explicitly", ar: "بشكل صريح", def: "Clearly and directly." },
    ],
    questions: build("c1-attention-and-reading", [
      mc("main-idea", "What does the writer suggest about reading on screens?", ["Readers can read deeply on screens if they consciously change their reading mode.", "Screens make deep reading impossible.", "Paper books should replace all screens.", "People read fewer words today."], "readers who deliberately slow down can perform equally well on screen", "The mode, not the medium, matters most."),
      mc("detail", "According to the studies, when is the paper advantage clearest?", ["With long, complex texts under time pressure", "With short messages", "With children's books", "With headlines"], "particularly when readers are under time pressure", "Long complex texts under time pressure."),
      tf("inference", "The writer argues that schools should reject digital media.", false, "Rather than nostalgically rejecting digital media", "They should teach switching between modes."),
      mc("vocabulary", "In the text, 'bi-literacy' refers to…", ["switching between scanning and deep reading", "reading in two languages", "reading on two devices", "writing and reading at once"], "the ability to switch consciously between rapid scanning and deep reading", "Switching between two reading modes."),
    ]),
  },
  {
    id: "c1-urban-heat", title: "Cooling Cities", level: "C1", category: "Environment", status: "review", source: "englishcamp",
    paragraphs: [
      "Cities are often several degrees warmer than the surrounding countryside, a phenomenon known as the urban heat island effect. Asphalt, concrete and dark roofs absorb sunlight during the day and release it at night, while vehicles and air conditioners add waste heat. As heatwaves become more frequent, the consequences for health, energy demand and productivity are increasingly hard to ignore.",
      "Planners have a range of responses at their disposal. Planting street trees provides shade and cools the air through evaporation; reflective 'cool roofs' can lower indoor temperatures significantly; and narrow streets oriented to channel breezes, a feature of many traditional medinas, reduce the need for mechanical cooling. Each measure, though, carries trade-offs: trees require water, which is scarce in arid regions, and reflective surfaces can create glare at street level.",
      "The most effective strategies tend to combine several approaches and to prioritise the neighbourhoods most at risk, which are frequently those with the fewest green spaces and the oldest housing. Critics warn that greening projects can drive up property values and push out the very residents they were meant to protect, a process sometimes called 'green gentrification'. Cooling cities fairly, in other words, is as much a social challenge as a technical one.",
    ],
    glossary: [
      { word: "phenomenon", ar: "ظاهرة", def: "Something that happens and can be observed." },
      { word: "evaporation", ar: "تبخّر", def: "Water turning into vapour." },
      { word: "trade-off", ar: "مقايضة / ثمن مقابل", def: "A disadvantage you accept to gain an advantage." },
      { word: "gentrification", ar: "التحسين العمراني المُقصي", def: "When richer people move into an area and poorer residents are pushed out." },
    ],
    questions: build("c1-urban-heat", [
      mc("main-idea", "What is the writer's overall conclusion?", ["Cooling cities fairly is both a social and a technical challenge.", "Trees solve every heat problem.", "Medinas are too hot to live in.", "Cool roofs should be banned."], "Cooling cities fairly, in other words, is as much a social challenge as a technical one.", "It is social as well as technical."),
      mc("detail", "Which trade-off of planting trees does the text mention?", ["Trees need water, which is scarce in dry regions.", "Trees block traffic.", "Trees create glare.", "Trees increase waste heat."], "trees require water, which is scarce in arid regions", "They need scarce water."),
      tf("detail", "Traditional medinas used narrow streets to channel breezes.", true, "narrow streets oriented to channel breezes, a feature of many traditional medinas", "Yes."),
      mc("vocabulary", "What is 'green gentrification'?", ["Greening that raises prices and pushes out poorer residents", "Painting roofs green", "Planting trees in rich areas only", "A type of air conditioner"], "push out the very residents they were meant to protect", "Greening that displaces residents."),
    ]),
  },
  {
    id: "c2-the-ethics-of-translation", title: "What Is Lost in Translation?", level: "C2", category: "Language", status: "review", source: "englishcamp",
    paragraphs: [
      "Every translator confronts an irreducible dilemma: fidelity to the letter of a text or to its spirit. A word-for-word rendering may preserve surface meaning while flattening the humour, rhythm and cultural resonance that made the original compelling; a freer version may capture its effect while quietly substituting the translator's sensibility for the author's. Neither choice is neutral, and readers are rarely in a position to know which compromises have been made on their behalf.",
      "The stakes rise when languages carry unequal prestige. Literature written in Arabic, Amazigh or Darija often reaches international audiences only through English or French, and translators working into dominant languages may be tempted, or pressured by publishers, to smooth away unfamiliar references so that the text reads 'naturally'. Critics describe this as domestication, arguing that it reinforces the expectation that the world should be legible on the dominant culture's terms. Advocates of foreignising translation, by contrast, deliberately retain strangeness—untranslated terms, unusual syntax—to remind readers that they are crossing into another worldview.",
      "Machine translation complicates the debate further. Its output is fluent and instantaneous, yet it tends to reproduce the most statistically common phrasing, which may erase precisely the idiosyncrasies that distinguish a writer's voice. Paradoxically, this may increase rather than diminish the value of human translators, whose judgement about what to preserve and what to sacrifice cannot be reduced to probability. Translation, on this view, is less a technical conversion than an ethical act of mediation.",
    ],
    glossary: [
      { word: "fidelity", ar: "أمانة / وفاء للنص", def: "Faithfulness to the original." },
      { word: "resonance", ar: "صدى / وقع", def: "The deeper feelings or associations something creates." },
      { word: "domestication", ar: "التوطين (في الترجمة)", def: "Adapting a text so it feels familiar to the target culture." },
      { word: "idiosyncrasy", ar: "خصوصية / سمة فريدة", def: "A feature particular to one person." },
    ],
    questions: build("c2-the-ethics-of-translation", [
      mc("main-idea", "What is the writer's central claim?", ["Translation involves ethical choices that machines cannot simply replace.", "Word-for-word translation is always best.", "Machine translation will replace all translators.", "Only English should be used for literature."], "Translation, on this view, is less a technical conversion than an ethical act of mediation.", "Translation is an ethical act requiring judgement."),
      mc("detail", "What do supporters of 'foreignising' translation do?", ["Keep some strangeness to show another worldview", "Remove all foreign references", "Translate word for word only", "Use machine translation"], "deliberately retain strangeness", "They keep strangeness on purpose."),
      tf("inference", "The writer believes machine translation lowers the value of human translators.", false, "this may increase rather than diminish the value of human translators", "It may increase their value."),
      mc("vocabulary", "In the text, 'legible on the dominant culture's terms' suggests texts are…", ["made easy to understand from the dominant culture's point of view", "printed in larger letters", "translated into many languages", "written by dominant authors"], "the expectation that the world should be legible on the dominant culture's terms", "Understandable on the dominant culture's terms."),
    ]),
  },
];

export const READING_LESSONS: readonly ReadingLesson[] = [...beginner, ...migrated].sort((a, b) => CEFR_LEVELS.indexOf(a.level) - CEFR_LEVELS.indexOf(b.level));
export const READING_CATEGORIES = Array.from(new Set(READING_LESSONS.map(lesson => lesson.category))).sort();
export const readingLessonById = (id: string) => READING_LESSONS.find(lesson => lesson.id === id);
