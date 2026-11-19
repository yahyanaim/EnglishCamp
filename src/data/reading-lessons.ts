import { ALL_ARTICLES } from "./articles/index";
import { CEFR_LEVELS, type CefrLevel } from "./placement/cefr";
import { placeCorrect, type ComprehensionQuestion, type ComprehensionSkill } from "@/lib/comprehension";

export { CEFR_LEVELS, type CefrLevel };
export const CEFR_LABELS: Record<CefrLevel, string> = {
  A1: "A1 · Beginner", A2: "A2 · Elementary", B1: "B1 · Intermediate",
  B2: "B2 · Upper Intermediate", C1: "C1 · Advanced", C2: "C2 · Proficiency",
};

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
];

export const READING_LESSONS: readonly ReadingLesson[] = [...beginner, ...migrated].sort((a, b) => CEFR_LEVELS.indexOf(a.level) - CEFR_LEVELS.indexOf(b.level));
export const READING_CATEGORIES = Array.from(new Set(READING_LESSONS.map(lesson => lesson.category))).sort();
export const readingLessonById = (id: string) => READING_LESSONS.find(lesson => lesson.id === id);
