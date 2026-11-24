/**
 * EnglishCamp grammar curriculum: what a learner should master at each CEFR level,
 * in teaching order, and the Grammar Reference lessons that teach each point.
 * Order and scope follow the British Council / EAQUALS Core Inventory for General English
 * (A1–B2 grammar). Every point links to at least one lesson.
 */
export type GrammarLevel = 'A1' | 'A2' | 'B1' | 'B2';
export type CurriculumPoint = { title: string; canDo: string; lessons: string[] };
export type CurriculumLevel = { level: GrammarLevel; name: string; goal: string; points: CurriculumPoint[] };

export const GRAMMAR_LEVEL_NAMES: Record<GrammarLevel, string> = { A1: 'Beginner', A2: 'Elementary', B1: 'Intermediate', B2: 'Upper intermediate' };

export const GRAMMAR_CURRICULUM: CurriculumLevel[] = [
  { level: 'A1', name: 'Beginner', goal: 'Introduce yourself, describe people and places, and talk about daily routines in simple sentences.', points: [
    { title: 'The verb be', canDo: 'Say who you are, where you are from and how you feel.', lessons: ['verb-be'] },
    { title: 'Simple sentence word order', canDo: 'Build subject + verb + object sentences with place and time.', lessons: ['word-order'] },
    { title: 'Singular and plural nouns', canDo: 'Talk about one thing or many things correctly.', lessons: ['singular-and-plural'] },
    { title: 'Articles: a, an, the', canDo: 'Choose a, an, the or no article for everyday nouns.', lessons: ['articles'] },
    { title: 'This, that, these, those', canDo: 'Point to things near and far.', lessons: ['this-that-these-those'] },
    { title: 'Possessives: my, your, ’s', canDo: 'Say who things belong to.', lessons: ['possessives'] },
    { title: 'There is / there are', canDo: 'Describe what is in a room, a street or a town.', lessons: ['there-is-are'] },
    { title: 'Countable and uncountable nouns', canDo: 'Talk about food, money and things you cannot count.', lessons: ['countable-and-uncountable'] },
    { title: 'Present simple and present continuous', canDo: 'Describe routines and what is happening now.', lessons: ['present-tenses'] },
    { title: 'Subject–verb agreement', canDo: 'Add -s after he, she and it and match the verb to its subject.', lessons: ['subject-verb-agreement'] },
    { title: 'Adverbs of frequency', canDo: 'Say how often you do things.', lessons: ['frequency-adverbs'] },
    { title: 'Can and can’t', canDo: 'Talk about abilities and ask for permission.', lessons: ['can-ability'] },
    { title: 'Prepositions of time and place', canDo: 'Use at, on and in for times, days and places.', lessons: ['time-prepositions', 'prepositions'] },
    { title: 'Questions and short answers', canDo: 'Ask wh- and yes/no questions and answer briefly.', lessons: ['asking-questions'] },
  ] },
  { level: 'A2', name: 'Elementary', goal: 'Talk about past events, future plans and comparisons; give simple advice.', points: [
    { title: 'Past simple: regular and irregular', canDo: 'Tell what happened yesterday, last week or last year.', lessons: ['simple-past-guide', 'past-tenses'] },
    { title: 'Past continuous', canDo: 'Describe what was happening when something else happened.', lessons: ['past-tenses'] },
    { title: 'Future: will, going to, present continuous', canDo: 'Talk about plans, predictions and arrangements.', lessons: ['future-tenses'] },
    { title: 'Comparatives and superlatives', canDo: 'Compare two things and choose the best or worst.', lessons: ['comparatives'] },
    { title: 'Quantities: some, any, much, many', canDo: 'Say how much or how many you have.', lessons: ['quantities-and-determiners'] },
    { title: 'Subject and object pronouns', canDo: 'Replace nouns with he/him, they/them correctly.', lessons: ['object-pronouns'] },
    { title: 'Advice and obligation: should, must, have to', canDo: 'Give advice and explain rules.', lessons: ['should-must', 'modal-verbs'] },
    { title: 'Verb + -ing or to + verb', canDo: 'Use like doing, want to do and similar patterns.', lessons: ['verb-patterns'] },
    { title: 'Adverbs of manner', canDo: 'Describe how people do things.', lessons: ['adverbs-of-manner'] },
    { title: 'Irregular plurals', canDo: 'Use men, children, feet and other irregular forms.', lessons: ['irregular-plurals-guide'] },
    { title: 'Tense review', canDo: 'Choose between the main present, past and future forms.', lessons: ['tense-overview'] },
  ] },
  { level: 'B1', name: 'Intermediate', goal: 'Connect past and present, tell stories, give reasons and build longer sentences.', points: [
    { title: 'Present perfect simple and continuous', canDo: 'Talk about experiences, results and activities up to now.', lessons: ['perfect-simple-continuous'] },
    { title: 'Present perfect with for and since', canDo: 'Say how long a situation has continued.', lessons: ['for-since'] },
    { title: 'Past perfect', canDo: 'Show which past event happened first in a story.', lessons: ['past-perfect-guide'] },
    { title: 'Past habits: used to and would', canDo: 'Describe how life used to be.', lessons: ['past-habits'] },
    { title: 'Zero, first and second conditionals', canDo: 'Talk about real and imagined situations and their results.', lessons: ['conditionals'] },
    { title: 'Passive voice', canDo: 'Describe processes and focus on what happened, not who did it.', lessons: ['passive'] },
    { title: 'Relative clauses', canDo: 'Add information with who, which, that, where and whose.', lessons: ['relative-clauses-guide'] },
    { title: 'Main and subordinate clauses', canDo: 'Give reasons, times, conditions and purposes in one sentence.', lessons: ['clauses-guide'] },
    { title: 'Linking words and contrast', canDo: 'Connect ideas with because, although, however and despite.', lessons: ['linking-words-guide', 'contrast-linkers'] },
    { title: '-ing and -ed adjectives', canDo: 'Say the film was boring and you were bored.', lessons: ['participle-adjectives-guide'] },
    { title: 'Verb -ing after prepositions', canDo: 'Use interested in learning, before leaving and similar forms.', lessons: ['prepositions-gerunds'] },
    { title: 'Enough and too', canDo: 'Say something is too expensive or not big enough.', lessons: ['enough-and-too'] },
  ] },
  { level: 'B2', name: 'Upper intermediate', goal: 'Speculate, report, regret and write formally with precise, varied structures.', points: [
    { title: 'Third and mixed conditionals', canDo: 'Imagine a different past and its results.', lessons: ['third-mixed-conditionals'] },
    { title: 'Wish and if only', canDo: 'Express regrets and wishes about the present and past.', lessons: ['wish-if-only'] },
    { title: 'Reported speech', canDo: 'Report statements, questions and commands.', lessons: ['reported-speech'] },
    { title: 'Passive reporting verbs', canDo: 'Write It is said that… and He is thought to…', lessons: ['passive-reporting'] },
    { title: 'Modals of deduction in the past', canDo: 'Say what must, might or can’t have happened.', lessons: ['past-deduction'] },
    { title: 'Future continuous and future perfect', canDo: 'Describe what will be happening or finished at a future time.', lessons: ['future-continuous-perfect'] },
    { title: 'Causative: have something done', canDo: 'Talk about services and things done for you.', lessons: ['causative-have'] },
    { title: 'Participle clauses', canDo: 'Shorten sentences in writing with -ing and -ed clauses.', lessons: ['participle-clauses'] },
    { title: 'Inversion for emphasis', canDo: 'Use Never have I…, Not only did…, No sooner had…', lessons: ['negative-inversion'] },
    { title: 'Paired conjunctions', canDo: 'Balance ideas with both…and, either…or, not only…but also.', lessons: ['paired-conjunctions-guide'] },
    { title: 'Discourse markers', canDo: 'Organise speech and essays with markers of contrast, opinion and summary.', lessons: ['discourse-markers-guide'] },
  ] },
];

/** CEFR level of every Grammar Reference lesson, derived from the curriculum (first level that teaches it). */
export const GRAMMAR_LESSON_LEVELS: Record<string, GrammarLevel> = Object.fromEntries(
  [...GRAMMAR_CURRICULUM].reverse().flatMap(level => level.points.flatMap(point => point.lessons.map(id => [id, level.level] as const))),
);

/** Progress key for a learned Grammar Reference lesson (shared with the study planner and Progress). */
export const grammarLessonKey = (id: string) => `reference-grammar-${id}`;
export const GRAMMAR_XP = 15;

export function grammarLevelProgress(done: Record<string, boolean>) {
  return GRAMMAR_CURRICULUM.map(level => {
    const ids = Array.from(new Set(level.points.flatMap(point => point.lessons).filter(id => GRAMMAR_LESSON_LEVELS[id] === level.level)));
    const learned = ids.filter(id => done[grammarLessonKey(id)]).length;
    return { level: level.level, name: level.name, learned, total: ids.length, complete: ids.length > 0 && learned === ids.length };
  });
}
export const grammarLearnedCount = (done: Record<string, boolean>) => Object.keys(done).filter(key => key.startsWith('reference-grammar-') && done[key]).length;
