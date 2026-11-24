import type { CheatItem } from './grammar-cheat-sheet';
import type { PlacementLevel } from './placement/questions';

/** Extra Grammar Reference lessons. Original EnglishCamp explanations and examples, grouped by CEFR level. */
export type GrammarLesson = { id: string; title: string; level: PlacementLevel; intro: string; content: CheatItem[]; practice?: { label: string; href: string } };
const part = (title: string, formation: string, examples: string[], notes?: string[]): CheatItem => ({ title, formation, examples: examples.map(en => ({ en })), ...(notes ? { notes } : {}) });

export const GRAMMAR_MORE: GrammarLesson[] = [
  // ---------- A1 ----------
  { id: 'verb-be', title: 'The verb be: am, is, are', level: 'A1', intro: 'Be connects a subject with a description, a place, a job or an age. It has three present forms, and the subject decides which one you use.', practice: { label: 'Conjugation trainer', href: '/verb-conjugation' }, content: [
    part('Affirmative', 'I am · you / we / they are · he / she / it is. In speech we usually contract: I’m, you’re, she’s.', ['I am a nurse. She’s from Agadir.', 'We are in the library. They’re tired after the match.']),
    part('Negative', 'Add not after be: am not, is not (isn’t), are not (aren’t).', ['He isn’t at home today.', 'We aren’t late; the class starts at nine.'], ['There is no contraction amn’t. Say I’m not.']),
    part('Questions and short answers', 'Put be before the subject. Answer with yes / no + subject + be.', ['Are you ready? — Yes, I am.', 'Is the shop open? — No, it isn’t.'], ['Do not contract in a short yes answer: Yes, I am (not Yes, I’m).']),
  ] },
  { id: 'there-is-are', title: 'There is / there are', level: 'A1', intro: 'Use there is and there are to say that something exists or is in a place, usually when you mention it for the first time.', content: [
    part('Singular and uncountable', 'There is (there’s) + a / an + singular noun, or + an uncountable noun.', ['There’s a bank near the station.', 'There is some milk in the fridge.']),
    part('Plural', 'There are + plural noun, often with some, two, many.', ['There are two cafés on my street.', 'There are some books on the table.']),
    part('Negatives and questions', 'There isn’t / there aren’t … any. Is there …? Are there …?', ['There aren’t any chairs in the room.', 'Is there a pharmacy near here? — Yes, there is.'], ['Use any in most negatives and questions: Are there any questions?']),
  ] },
  { id: 'this-that-these-those', title: 'This, that, these and those', level: 'A1', intro: 'These words point to things. Choose by distance (near or far) and by number (one or more than one).', content: [
    part('Near: this and these', 'This + singular noun; these + plural noun, for things close to you.', ['This bag is heavy.', 'These shoes are new.']),
    part('Far: that and those', 'That + singular noun; those + plural noun, for things further away.', ['Look at that bird on the roof.', 'Those houses are very old.']),
    part('Without a noun', 'They can stand alone as pronouns.', ['This is my brother, Karim.', 'Is that your phone?'], ['On the phone we say: Hello, this is Sara.']),
  ] },
  { id: 'possessives', title: 'My, your, his, her and ’s', level: 'A1', intro: 'Possessive words show who something belongs to. Possessive adjectives go before a noun; ’s is added to a person’s name.', content: [
    part('Possessive adjectives', 'my, your, his, her, its, our, their + noun.', ['Her name is Lina.', 'Our teacher is very patient.'], ['His is for a man, her is for a woman: Ali and his sister.']),
    part('’s for people', 'Name / person + ’s + noun.', ['Nadia’s car is blue.', 'My father’s office is in the city centre.']),
    part('Plural owners', 'Add only an apostrophe after a regular plural ending in -s.', ['The students’ books are on the desk.', 'My parents’ house has a garden.']),
  ] },
  { id: 'can-ability', title: 'Can and can’t for ability', level: 'A1', intro: 'Can describes what someone is able to do. It is the same for every subject and is followed by the base form of the verb.', content: [
    part('Affirmative and negative', 'Subject + can / can’t + base verb. No -s and no to.', ['She can speak three languages.', 'I can’t swim very well.']),
    part('Questions', 'Can + subject + base verb?', ['Can you play the guitar? — Yes, I can.', 'Can your brother drive? — No, he can’t.']),
    part('Requests and permission', 'Can I …? / Can you …? are polite in everyday situations.', ['Can I open the window?', 'Can you help me with this form?'], ['Could is a little more polite: Could you repeat that, please?']),
  ] },
  // ---------- A2 ----------
  { id: 'some-any-much-many', title: 'Some, any, much and many', level: 'A2', intro: 'These words talk about quantity. Your choice depends on whether the noun is countable and whether the sentence is positive, negative or a question.', content: [
    part('Some and any', 'Some in positive sentences and offers; any in negatives and most questions.', ['I bought some apples.', 'We don’t have any bread. Do you need any help?'], ['Use some in offers and requests: Would you like some tea?']),
    part('Many and much', 'Many + plural countable nouns; much + uncountable nouns, mostly in negatives and questions.', ['How many people came?', 'I don’t have much time today.']),
    part('A lot of', 'A lot of works with both kinds of noun and is natural in positive sentences.', ['She has a lot of friends.', 'We drink a lot of water in summer.']),
  ] },
  { id: 'past-simple-forms', title: 'Past simple: regular and irregular verbs', level: 'A2', intro: 'The past simple describes finished actions at a finished time. Regular verbs add -ed; irregular verbs have their own past form that you learn by heart.', practice: { label: 'Past tense practice', href: '/past-tense-practice' }, content: [
    part('Regular verbs', 'Base verb + -ed (watch → watched, live → lived, study → studied).', ['We watched a film last night.', 'She studied in Rabat for two years.']),
    part('Irregular verbs', 'Learn the past form: go → went, buy → bought, see → saw, have → had.', ['I went to the market yesterday.', 'They bought a new car last month.']),
    part('Negatives and questions', 'Did not (didn’t) + base verb; Did + subject + base verb?', ['He didn’t call me.', 'Did you see the match? — Yes, I did.'], ['After did, always use the base form: Did you go? (not Did you went?)']),
  ] },
  { id: 'object-pronouns', title: 'Subject and object pronouns', level: 'A2', intro: 'A subject pronoun does the action; an object pronoun receives it or follows a preposition.', content: [
    part('Two sets', 'I / me, you / you, he / him, she / her, it / it, we / us, they / them.', ['She called me yesterday.', 'We visited them in the summer.']),
    part('After prepositions', 'Use the object form after with, for, to, about, between …', ['This message is for you.', 'Can you come with us?']),
    part('Short answers', 'In informal answers English uses the object form.', ['Who wants coffee? — Me!', 'Who broke the glass? — Not me.']),
  ] },
  { id: 'should-must', title: 'Should, must and have to', level: 'A2', intro: 'These modal forms express advice and obligation. They differ in strength and in who creates the obligation.', content: [
    part('Advice with should', 'Should / shouldn’t + base verb.', ['You should drink more water.', 'He shouldn’t work so late.']),
    part('Strong obligation', 'Must comes from the speaker; have to often describes a rule or situation.', ['I must call my mother tonight.', 'Students have to wear a uniform.']),
    part('Mustn’t vs don’t have to', 'Mustn’t = it is not allowed. Don’t have to = it is not necessary.', ['You mustn’t smoke here.', 'You don’t have to bring food; lunch is included.'], ['These two negatives mean very different things.']),
  ] },
  { id: 'adverbs-of-manner', title: 'Adverbs of manner', level: 'A2', intro: 'Adverbs of manner describe how someone does something. Most are made from adjectives.', content: [
    part('Forming adverbs', 'Adjective + -ly: quick → quickly, careful → carefully; -y → -ily: easy → easily.', ['She speaks quietly.', 'Please drive carefully.']),
    part('Irregular adverbs', 'good → well; fast, hard, late and early do not change.', ['He plays the piano well.', 'They work hard every day.'], ['Hardly means almost not: I hardly slept.']),
    part('Position', 'The adverb usually goes after the verb or after the object.', ['She answered the question correctly.', 'He closed the door slowly.']),
  ] },
  // ---------- B1 ----------
  { id: 'relative-clauses-basic', title: 'Relative clauses: who, which, that, where', level: 'B1', intro: 'A relative clause adds information about a noun, so you can join two sentences into one.', practice: { label: 'Relative clauses practice', href: '/relative-clauses' }, content: [
    part('People and things', 'Who for people, which for things, that for both in defining clauses.', ['The woman who lives next door is a doctor.', 'The book that I borrowed is excellent.']),
    part('Places and possession', 'Where for places; whose for possession.', ['This is the café where we first met.', 'I have a friend whose brother is a pilot.']),
    part('Leaving out the pronoun', 'You can omit who / which / that when it is the object of the clause.', ['The film (that) we watched was long.', 'The man (who) I spoke to was helpful.'], ['You cannot omit it when it is the subject: The man who called me (not The man called me).']),
  ] },
  { id: 'for-since', title: 'Present perfect with for and since', level: 'B1', intro: 'With the present perfect, for and since show how long a situation has continued up to now.', content: [
    part('For + a period', 'For + a length of time: for three years, for a week, for ages.', ['I have lived here for five years.', 'She has worked at the bank for a long time.']),
    part('Since + a starting point', 'Since + a point in time: since 2019, since Monday, since I was a child.', ['We have known each other since school.', 'He has been ill since Friday.']),
    part('How long …?', 'Ask with How long + have / has + subject + past participle?', ['How long have you studied English?', 'How long has she been a teacher?'], ['Not: I am living here since 2019. Use the present perfect.']),
  ] },
  { id: 'prepositions-gerunds', title: 'Verb -ing after prepositions', level: 'B1', intro: 'After a preposition, English uses the -ing form of a verb, not to + verb.', content: [
    part('Adjective + preposition', 'interested in, good at, afraid of, tired of + verb-ing.', ['She is good at drawing.', 'I am interested in learning Spanish.']),
    part('Verb + preposition', 'think about, look forward to, succeed in, insist on + verb-ing.', ['I am looking forward to meeting you.', 'They succeeded in finishing early.'], ['In look forward to, to is a preposition, so -ing follows.']),
    part('Before / after / without', 'Before / after / without + verb-ing.', ['Wash your hands before eating.', 'He left without saying goodbye.']),
  ] },
  { id: 'contrast-linkers', title: 'Contrast: although, however, despite', level: 'B1', intro: 'These linkers show a contrast between two ideas, but each one fits a different sentence structure.', practice: { label: 'Connectors challenge', href: '/conjunction-challenge' }, content: [
    part('Although + clause', 'Although / even though + subject + verb.', ['Although it was raining, we went out.', 'She passed even though she was ill.']),
    part('However between sentences', 'However starts a new sentence and is followed by a comma.', ['The hotel was expensive. However, the service was excellent.', 'I like my job. However, the hours are long.']),
    part('Despite + noun or -ing', 'Despite / in spite of + noun or verb-ing.', ['Despite the rain, we enjoyed the trip.', 'In spite of feeling tired, he finished the report.'], ['Not: Despite it was raining. Use although, or despite the rain.']),
  ] },
  // ---------- B2 ----------
  { id: 'third-mixed-conditionals', title: 'Third and mixed conditionals', level: 'B2', intro: 'These conditionals imagine a different past and its result in the past or in the present.', practice: { label: 'Conditionals practice', href: '/conditionals-and-wishes' }, content: [
    part('Third conditional', 'If + had + past participle, would have + past participle (an unreal past).', ['If I had left earlier, I would have caught the train.', 'She wouldn’t have failed if she had studied.']),
    part('Past condition, present result', 'If + had + past participle, would + base verb.', ['If I had taken that job, I would live in Dubai now.', 'If he hadn’t broken his leg, he would be in the team.']),
    part('Present condition, past result', 'If + past simple, would have + past participle.', ['If I were braver, I would have spoken to her.', 'If she didn’t trust you, she wouldn’t have lent you the money.']),
  ] },
  { id: 'wish-if-only', title: 'Wish and if only', level: 'B2', intro: 'Wish and if only express regret or a desire for a different situation. The tense moves one step back.', content: [
    part('Present situations', 'Wish + past simple / could.', ['I wish I had more free time.', 'If only I could speak French.']),
    part('Past regrets', 'Wish + past perfect.', ['I wish I had listened to your advice.', 'If only we hadn’t missed the plane.']),
    part('Annoying behaviour', 'Wish + would, about other people’s habits.', ['I wish you would stop interrupting me.', 'I wish it would stop raining.'], ['Do not use wish + would about yourself: I wish I could (not I wish I would).']),
  ] },
  { id: 'passive-reporting', title: 'It is said that … (passive reporting)', level: 'B2', intro: 'Formal writing often reports opinions without saying who holds them, using reporting verbs in the passive.', practice: { label: 'Passive voice practice', href: '/passive-voice' }, content: [
    part('It + passive + that-clause', 'It is said / believed / thought / reported that + clause.', ['It is said that the castle is haunted.', 'It is believed that the economy will grow.']),
    part('Subject + passive + to-infinitive', 'Subject + is said / thought + to + base verb.', ['The castle is said to be haunted.', 'He is thought to live abroad.']),
    part('Talking about the past', 'Subject + passive + to have + past participle.', ['The painting is believed to have been stolen.', 'She is reported to have left the country.']),
  ] },
  { id: 'past-deduction', title: 'Modals of deduction in the past', level: 'B2', intro: 'Use modal + have + past participle to make logical guesses about what happened.', content: [
    part('Certain it happened', 'Must have + past participle.', ['The ground is wet. It must have rained.', 'She must have forgotten our meeting.']),
    part('Certain it did not happen', 'Can’t / couldn’t have + past participle.', ['He can’t have finished already; he only started at ten.', 'They couldn’t have seen us; it was too dark.']),
    part('Possible', 'Might / may / could have + past participle.', ['She might have missed the bus.', 'The letter could have got lost.'], ['Must not have is not used for deduction in British English; use can’t have.']),
  ] },
  { id: 'negative-inversion', title: 'Inversion after negative adverbials', level: 'B2', intro: 'In formal or emphatic English, some negative or limiting expressions at the start of a sentence are followed by question word order.', content: [
    part('Never, rarely, seldom', 'Negative adverb + auxiliary + subject + verb.', ['Never have I seen such a beautiful view.', 'Rarely does she arrive late.']),
    part('Not only … but also', 'Not only + auxiliary + subject …, but … also …', ['Not only did he win, but he also broke the record.', 'Not only is it cheap, but it is also fast.']),
    part('Time expressions', 'Hardly / No sooner … than / Only then + inversion.', ['No sooner had we arrived than it started to rain.', 'Only then did I understand the problem.'], ['Use inversion sparingly; it sounds formal or dramatic.']),
  ] },
];
