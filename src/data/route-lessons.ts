import type { PlacementLevel } from './placement/questions';

/**
 * Route lessons fill the gap below the existing courses: EnglishCamp's four courses start at B2,
 * so learners on the A2 Key and B1 Preliminary routes get these lessons. Original EnglishCamp text;
 * exam descriptions summarise the public Cambridge exam formats.
 */
export type RouteLessonComponent = 'language' | 'reading' | 'listening' | 'speaking' | 'writing';
export type RouteLessonItem = { prompt: string; options: string[]; answer: number; why: string };
export type RouteLesson = {
  id: string; target: 'A2' | 'B1'; level: PlacementLevel; phase: 1 | 2 | 3 | 4 | 5 | 6; component: RouteLessonComponent;
  title: string; minutes: number; canDo: string; learn: string[]; examples: { text: string; note?: string }[];
  practice: RouteLessonItem[]; task: { prompt: string; checklist: string[] }; exam?: string;
};

export const ROUTE_LESSONS: RouteLesson[] = [
  // ---------------- A2 Key route (from A1) ----------------
  {
    id: 'a2-about-you', target: 'A2', level: 'A1', phase: 1, component: 'language', minutes: 35,
    title: 'Talking about yourself: be, have got and questions',
    canDo: 'I can give basic information about myself and ask the same questions to someone else.',
    learn: [
      'Use be for name, age, job, nationality and feelings: I am (I’m) Sara. She is (she’s) a nurse. We are (we’re) from Morocco.',
      'Use have got (or have) for family and things you own: I’ve got two brothers. Have you got a car? No, I haven’t.',
      'For questions with be, put the verb first: Are you a student? Is he your teacher? With other verbs, use do or does: Do you work? Where does she live?',
    ],
    examples: [
      { text: 'I’m twenty-four and I’m a student.' }, { text: 'My sister is a teacher. She’s very kind.' },
      { text: 'I’ve got a cat but I haven’t got a dog.' }, { text: 'Where are you from?', note: 'be + subject' },
      { text: 'What do you do?', note: 'asks about your job' }, { text: 'Have you got any brothers or sisters?' },
    ],
    practice: [
      { prompt: 'My parents ___ from Fès.', options: ['is', 'are', 'am'], answer: 1, why: 'Plural subject (my parents) takes are.' },
      { prompt: '___ you got a bike?', options: ['Do', 'Are', 'Have'], answer: 2, why: 'Questions with have got start with Have/Has.' },
      { prompt: 'Where ___ your brother work?', options: ['do', 'does', 'is'], answer: 1, why: 'He/she/it + present simple question uses does.' },
      { prompt: 'Choose the correct sentence.', options: ['She have got two children.', 'She has got two children.', 'She is got two children.'], answer: 1, why: 'He/she/it uses has got.' },
      { prompt: '“What do you do?” means…', options: ['What are you doing now?', 'What is your job?', 'What do you like?'], answer: 1, why: 'It is the usual question about someone’s job.' },
    ],
    task: { prompt: 'Record or write six sentences about you: name, age, home, job or studies, family and one thing you have got. Then write three questions to ask a partner.', checklist: ['I used am / is / are correctly', 'I used have got or has got', 'My questions start with a verb (Are…? Do…? Have…?)'] },
  },
  {
    id: 'a2-everyday-messages', target: 'A2', level: 'A1', phase: 1, component: 'reading', minutes: 30,
    title: 'Everyday messages: read a notice, write a short note',
    canDo: 'I can understand short notices and notes, and write a simple note to a friend.',
    learn: [
      'Short texts like notices, signs and notes give one main message. Read them asking three questions: Who is it for? What must I do? When or where?',
      'Notes to friends are informal. They often start with Hi / Hello and a name, and finish with See you, Love or Thanks and your name.',
      'Keep notes short and clear: say what, when and where in one or two sentences.',
    ],
    examples: [
      { text: 'Library closed on Friday afternoon. Open again Saturday 9 a.m.', note: 'notice: when' },
      { text: 'Please leave your bags at reception.', note: 'notice: what to do' },
      { text: 'Hi Omar, I’m at the shop. Back at 6. Sam', note: 'note: where, when' },
      { text: 'Students: the English class is now in Room 12.', note: 'who + where' },
    ],
    practice: [
      { prompt: '“Library closed on Friday afternoon.” When can you NOT go to the library?', options: ['Friday morning', 'Friday afternoon', 'Saturday morning'], answer: 1, why: 'The notice says closed on Friday afternoon.' },
      { prompt: '“Please leave your bags at reception.” What should you do?', options: ['Take your bag inside with you', 'Leave your bag at the reception desk', 'Buy a new bag'], answer: 1, why: 'Leave your bags at reception = do not take them inside.' },
      { prompt: '“Hi Omar, I’m at the shop. Back at 6. Sam” Where is Sam?', options: ['At home', 'At the shop', 'At work'], answer: 1, why: 'I’m at the shop.' },
      { prompt: 'Which is the best ending for a note to a friend?', options: ['Yours faithfully', 'See you soon, Lina', 'Dear Sir'], answer: 1, why: 'Friendly notes use informal endings.' },
      { prompt: '“The English class is now in Room 12.” What has changed?', options: ['The time', 'The room', 'The teacher'], answer: 1, why: 'The notice gives a new room.' },
    ],
    task: { prompt: 'Write a note (20–25 words) to a friend: you are going to the café, say when you will be back and ask them to buy bread.', checklist: ['I started with Hi + name', 'I said where, when and what to do', 'I finished with my name'] },
  },
  {
    id: 'a2-past-simple', target: 'A2', level: 'A2', phase: 2, component: 'language', minutes: 40,
    title: 'Past simple: what happened',
    canDo: 'I can talk and write about finished events in the past.',
    learn: [
      'Use the past simple for finished actions at a finished time: yesterday, last week, in 2020, two days ago.',
      'Regular verbs add -ed: work → worked, visit → visited, stop → stopped. Many common verbs are irregular: go → went, have → had, see → saw, make → made, buy → bought.',
      'Questions and negatives use did + the base verb: Did you go out? I didn’t (did not) see him. Be is different: I was, you were; Were you tired?',
    ],
    examples: [
      { text: 'Last weekend I visited my grandparents.' }, { text: 'We went to the beach and had lunch there.' },
      { text: 'I didn’t watch TV yesterday.', note: 'didn’t + base verb' }, { text: 'Did you see the match?' },
      { text: 'The film was long but it wasn’t boring.' }, { text: 'She bought a new phone two days ago.' },
    ],
    practice: [
      { prompt: 'Yesterday I ___ to the market.', options: ['go', 'went', 'goed'], answer: 1, why: 'Go is irregular: went.' },
      { prompt: 'We ___ a great time last night.', options: ['had', 'have', 'did have not'], answer: 0, why: 'Have → had.' },
      { prompt: 'I didn’t ___ the bus this morning.', options: ['took', 'take', 'taken'], answer: 1, why: 'After didn’t use the base verb.' },
      { prompt: '___ you at home on Sunday?', options: ['Did', 'Was', 'Were'], answer: 2, why: 'Be in the past: you were → Were you…?' },
      { prompt: 'Which time phrase goes with the past simple?', options: ['tomorrow', 'last month', 'every day'], answer: 1, why: 'Last month is a finished time.' },
    ],
    task: { prompt: 'Tell or write what you did last weekend in 6–8 sentences. Use at least four different verbs, one negative and one question to a friend.', checklist: ['I used past forms for finished events', 'I used didn’t + base verb in the negative', 'I used a time phrase (yesterday, last…, ago)'] },
  },
  {
    id: 'a2-plans', target: 'A2', level: 'A2', phase: 2, component: 'language', minutes: 35,
    title: 'Plans and arrangements: going to and the present continuous',
    canDo: 'I can talk about my plans and arrangements for the near future.',
    learn: [
      'Use be going to + verb for plans and intentions: I’m going to study more this year. Are you going to visit Rabat?',
      'Use the present continuous for fixed arrangements with a time or place: I’m meeting Ali at 7. We’re flying to Paris on Monday.',
      'To make suggestions, use Let’s… or Shall we…? and answer with That’s a good idea or Sorry, I can’t.',
    ],
    examples: [
      { text: 'I’m going to start a cooking course.' }, { text: 'What are you doing on Saturday?' },
      { text: 'We’re having dinner with my cousins tonight.', note: 'arrangement' }, { text: 'Shall we go to the cinema?' },
      { text: 'Let’s meet outside the station at six.' }, { text: 'She isn’t going to buy a car this year.' },
    ],
    practice: [
      { prompt: 'Next year I ___ learn to drive.', options: ['am going to', 'going to', 'go to'], answer: 0, why: 'be + going to + verb.' },
      { prompt: 'I can’t come — I ___ my dentist at 4 p.m.', options: ['see', 'am seeing', 'saw'], answer: 1, why: 'A fixed arrangement with a time: present continuous.' },
      { prompt: '___ go for a walk? — That’s a good idea.', options: ['Shall we', 'Do we', 'Are we going'], answer: 0, why: 'Shall we…? makes a suggestion.' },
      { prompt: 'What ___ this weekend?', options: ['you do', 'are you doing', 'do you doing'], answer: 1, why: 'Present continuous question: are you + -ing.' },
      { prompt: 'Choose the best reply to “Let’s have lunch together.”', options: ['Sorry, I can’t. I’m working.', 'Yes, I had lunch.', 'I go lunch.'], answer: 0, why: 'A polite refusal with a reason.' },
    ],
    task: { prompt: 'Write a message (30–40 words) inviting a friend to do something this weekend. Say what, where and when, and suggest a meeting place.', checklist: ['I used going to or the present continuous', 'I made a suggestion (Let’s / Shall we)', 'I gave a time and a place'] },
  },
  {
    id: 'a2-key-reading', target: 'A2', level: 'A2', phase: 3, component: 'reading', minutes: 40,
    title: 'A2 Key Reading: signs, notices and short messages',
    canDo: 'I can find the main point and important details in short everyday texts.',
    exam: 'A2 Key Reading and Writing has seven parts. The first parts use short texts such as signs, notices, emails and messages, then longer texts with questions about detail and meaning.',
    learn: [
      'Read the question before the text, so you know what to look for: a time, a place, a rule or a person.',
      'Wrong options often use words from the text but change the meaning. Check the whole sentence, not one word.',
      'Watch for small words that change meaning: not, only, before, after, until, must, don’t have to.',
    ],
    examples: [
      { text: 'Tickets must be bought before you get on the bus.', note: 'rule: before' },
      { text: 'Swimming pool: children under 8 only with an adult.', note: 'condition' },
      { text: 'Free coffee with every sandwich until 11 a.m.', note: 'time limit' },
      { text: 'Hi Mia, the party starts at 8, not 7. Can you bring some music? Jo', note: 'change + request' },
    ],
    practice: [
      { prompt: '“Tickets must be bought before you get on the bus.” This means…', options: ['You can buy a ticket from the driver.', 'You need a ticket before the bus.', 'The bus is free.'], answer: 1, why: 'Before you get on = in advance.' },
      { prompt: '“Children under 8 only with an adult.” A 6-year-old…', options: ['can swim alone', 'cannot swim', 'can swim with an adult'], answer: 2, why: 'Under 8 → needs an adult.' },
      { prompt: '“Free coffee with every sandwich until 11 a.m.” At 12 p.m.…', options: ['coffee is still free', 'you pay for coffee', 'sandwiches are free'], answer: 1, why: 'Until 11 a.m. — after that, the offer ends.' },
      { prompt: 'What does Jo want Mia to do?', options: ['come at 7', 'bring music', 'buy food'], answer: 1, why: 'Can you bring some music?' },
      { prompt: '“You don’t have to book.” This means…', options: ['Booking is not allowed.', 'Booking is not necessary.', 'You must book.'], answer: 1, why: 'Don’t have to = not necessary.' },
    ],
    task: { prompt: 'Find three real signs or notices in English (online or around you). For each, write one sentence: who it is for and what it tells them to do.', checklist: ['I read the question first', 'I checked small words like not, only, until', 'I wrote the meaning in my own words'] },
  },
  {
    id: 'a2-key-listening', target: 'A2', level: 'A2', phase: 3, component: 'listening', minutes: 35,
    title: 'A2 Key Listening: numbers, times, places and choices',
    canDo: 'I can catch key details such as times, prices, places and names in slow, clear speech.',
    exam: 'A2 Key Listening has five parts and you hear each recording twice. Tasks include short conversations with picture choices, completing notes and matching.',
    learn: [
      'Before you listen, read the question and guess the kind of answer: a number, a day, a place or an object.',
      'Speakers often change their mind: “Let’s meet at 6… no, 6.30 is better.” The last decision is the answer.',
      'Listen for spelling and numbers: 13 (thir-TEEN) and 30 (THIR-ty) sound different in stress. Names may be spelled letter by letter.',
    ],
    examples: [
      { text: 'The museum opens at half past nine on Sundays.', note: '9.30' },
      { text: 'It was fifteen pounds, but I got it for twelve.', note: 'final price 12' },
      { text: 'Turn left at the bank and it’s opposite the park.', note: 'place' },
      { text: 'My surname is Haddad, H-A-double D-A-D.', note: 'spelling' },
    ],
    practice: [
      { prompt: '“Let’s meet at six… actually, half past six is better.” When will they meet?', options: ['6.00', '6.30', '7.30'], answer: 1, why: 'The final decision is half past six.' },
      { prompt: 'Which number has the stress on the second part?', options: ['thirteen', 'thirty', 'thirty-three'], answer: 0, why: 'thir-TEEN; THIR-ty.' },
      { prompt: '“It was fifteen pounds, but I got it for twelve.” What did they pay?', options: ['£15', '£12', '£3'], answer: 1, why: 'They paid twelve.' },
      { prompt: 'What should you read before the recording starts?', options: ['Nothing', 'The questions', 'Only the first word'], answer: 1, why: 'Questions tell you what to listen for.' },
      { prompt: '“It’s opposite the park.” The place is…', options: ['next to the park', 'across from the park', 'inside the park'], answer: 1, why: 'Opposite = across from.' },
    ],
    task: { prompt: 'Do two A2 listening lessons in EnglishCamp. Before each, write what kind of answer you expect; after, compare with the transcript.', checklist: ['I predicted the type of answer', 'I listened for the final decision', 'I checked numbers and spelling in the transcript'] },
  },
  {
    id: 'a2-key-writing-email', target: 'A2', level: 'A2', phase: 4, component: 'writing', minutes: 35,
    title: 'A2 Key Writing: a short email or message (25 words or more)',
    canDo: 'I can write a short message that answers all the points I am asked about.',
    exam: 'In A2 Key Reading and Writing, one task asks for a short email or note of at least 25 words. You must cover the three points in the question.',
    learn: [
      'Read the three points and tick each one when you write it. A short message that answers every point is better than a long one that misses one.',
      'Use simple linking words: and, but, because, so. Start and finish like a real message (Hi Tom, … See you soon, Ana).',
      'Check verbs and capital letters at the end. Count your words: 25 or more.',
    ],
    examples: [
      { text: 'Hi Leila, Thanks for the invitation! I’d love to come to your party on Saturday. I can bring a cake because I like baking. What time does it start? See you, Nadia', note: '3 points answered' },
      { text: 'I can’t come on Friday because I’m working late.', note: 'reason with because' },
      { text: 'Shall we meet at the bus stop at ten?', note: 'suggestion' },
    ],
    practice: [
      { prompt: 'The question asks: say thank you, say what you will bring, ask about the time. Which point is missing? “Hi Sam, Thanks for inviting me! I will bring some juice. See you, Rami”', options: ['saying thank you', 'what to bring', 'asking about the time'], answer: 2, why: 'There is no question about the time.' },
      { prompt: 'Which is the best way to start an email to a friend?', options: ['Dear Sir or Madam,', 'Hi Tom,', 'To whom it may concern,'], answer: 1, why: 'Informal greeting for a friend.' },
      { prompt: 'Which sentence uses because correctly?', options: ['I’m late because the bus was slow.', 'I’m late because of slow.', 'Because I’m late the bus.'], answer: 0, why: 'because + a full reason.' },
      { prompt: 'How many words do you need for this task?', options: ['10 or more', '25 or more', '100 or more'], answer: 1, why: 'The short message needs at least 25 words.' },
      { prompt: 'What should you do last?', options: ['Add more topics', 'Check verbs, capitals and the three points', 'Translate it'], answer: 1, why: 'A final check catches simple mistakes.' },
    ],
    task: { prompt: 'Your English friend asks you to go shopping on Saturday. Write an email (25–35 words): say yes, suggest a time and say what you want to buy.', checklist: ['I answered all three points', 'I used a greeting and an ending', 'I wrote 25 words or more and checked my verbs'] },
  },
  {
    id: 'a2-key-speaking', target: 'A2', level: 'A2', phase: 4, component: 'speaking', minutes: 30,
    title: 'A2 Key Speaking: answering and asking about you',
    canDo: 'I can answer simple personal questions with a short extra detail and keep a conversation going.',
    exam: 'A2 Key Speaking is taken in pairs with two examiners. First the examiner asks you personal questions; then you talk with your partner about pictures and say what you like and why.',
    learn: [
      'Do not answer with one word. Add one detail: “Do you like sport?” — “Yes, I do. I play football with my friends on Sundays.”',
      'When you talk with your partner, ask them too: What about you? Do you agree? Which one do you like?',
      'If you do not understand, ask: Sorry, can you say that again, please?',
    ],
    examples: [
      { text: 'Yes, I do. I usually go swimming at the weekend.' },
      { text: 'I like the beach holiday best because I love the sea. What about you?' },
      { text: 'Sorry, can you repeat the question, please?' },
      { text: 'I don’t like cooking very much, but I like eating!' },
    ],
    practice: [
      { prompt: '“Where do you live?” Which answer is best in the exam?', options: ['Casablanca.', 'I live in Casablanca, near the sea, with my family.', 'Yes.'], answer: 1, why: 'A full answer with a detail.' },
      { prompt: 'How can you invite your partner to speak?', options: ['What about you?', 'Stop talking.', 'I finished.'], answer: 0, why: 'It passes the turn politely.' },
      { prompt: 'You did not hear the question. You say…', options: ['What?', 'Sorry, can you say that again, please?', 'Nothing.'], answer: 1, why: 'A polite request to repeat.' },
      { prompt: 'Which sentence gives a reason?', options: ['I like the mountains because it’s quiet there.', 'I like the mountains.', 'Mountains.'], answer: 0, why: 'because + reason.' },
      { prompt: 'Which word joins two contrasting ideas?', options: ['and', 'but', 'so'], answer: 1, why: 'but shows contrast.' },
    ],
    task: { prompt: 'Record answers to these questions, each with one extra detail: What’s your name? Where do you live? What do you do in your free time? What did you do last weekend? Then ask one question back.', checklist: ['Every answer had a detail', 'I gave at least one reason with because', 'I asked a question back'] },
  },
  {
    id: 'a2-key-story', target: 'A2', level: 'A2', phase: 5, component: 'writing', minutes: 40,
    title: 'A2 Key Writing: a short story from three pictures (35 words or more)',
    canDo: 'I can write a short story about what happened in a set of pictures.',
    exam: 'One A2 Key writing task asks you to look at three pictures and write the story they show, in at least 35 words.',
    learn: [
      'Write about every picture — one or two sentences each. Use the past simple, because a story tells what happened.',
      'Use sequence words: First, Then, After that, Finally. They make the story easy to follow.',
      'Give the person a name and add a feeling at the end: She was very happy. They were tired but pleased.',
    ],
    examples: [
      { text: 'First, Karim went to the park with his dog.', note: 'picture 1' },
      { text: 'Then the dog ran away after a ball, so Karim looked everywhere.', note: 'picture 2' },
      { text: 'Finally, a girl found the dog and brought it back. Karim was very happy.', note: 'picture 3 + feeling' },
    ],
    practice: [
      { prompt: 'Which tense should most of the story use?', options: ['present continuous', 'past simple', 'future'], answer: 1, why: 'Stories tell finished events.' },
      { prompt: 'Choose the best word for the last picture.', options: ['First', 'Then', 'Finally'], answer: 2, why: 'Finally introduces the end.' },
      { prompt: 'How many pictures must your story cover?', options: ['one', 'two', 'all three'], answer: 2, why: 'Missing a picture loses marks.' },
      { prompt: '“The dog ___ away after a ball.”', options: ['run', 'ran', 'runned'], answer: 1, why: 'Run is irregular: ran.' },
      { prompt: 'What is the minimum length?', options: ['35 words', '15 words', '150 words'], answer: 0, why: 'At least 35 words.' },
    ],
    task: { prompt: 'Imagine three pictures: (1) a girl waits at a bus stop in the rain, (2) a friend stops in a car, (3) they arrive at school together. Write the story in 35–50 words.', checklist: ['I wrote about all three pictures', 'I used First / Then / Finally', 'I used past forms and checked irregular verbs'] },
  },
  {
    id: 'a2-comparing', target: 'A2', level: 'A2', phase: 5, component: 'language', minutes: 35,
    title: 'Comparing and choosing: comparatives and superlatives',
    canDo: 'I can compare people, places and things and say which one I prefer.',
    learn: [
      'Short adjectives add -er / -est: cheap → cheaper → the cheapest; big → bigger → the biggest; easy → easier → the easiest.',
      'Long adjectives use more / the most: expensive → more expensive → the most expensive. Irregular: good → better → the best; bad → worse → the worst.',
      'Use than after a comparative: The train is faster than the bus. To choose, say: I’d prefer… / I think… is better because…',
    ],
    examples: [
      { text: 'Marrakech is hotter than Tangier in summer.' }, { text: 'This is the most interesting book I have.' },
      { text: 'The blue jacket is cheaper, but the black one is better.' }, { text: 'I’d prefer the train because it’s more comfortable.' },
    ],
    practice: [
      { prompt: 'My room is ___ than my sister’s.', options: ['big', 'bigger', 'biggest'], answer: 1, why: 'Comparative + than; double the g.' },
      { prompt: 'This is ___ restaurant in town.', options: ['the best', 'the better', 'the goodest'], answer: 0, why: 'good → the best.' },
      { prompt: 'Flying is ___ than going by bus.', options: ['expensiver', 'more expensive', 'most expensive'], answer: 1, why: 'Long adjective: more + adjective + than.' },
      { prompt: 'Today is ___ day of the year!', options: ['the hottest', 'hotter', 'the most hot'], answer: 0, why: 'Superlative: the + -est.' },
      { prompt: 'Which sentence explains a choice?', options: ['I’d prefer the park because it’s quieter.', 'The park.', 'Park is.'], answer: 0, why: 'Choice + reason.' },
    ],
    task: { prompt: 'Compare two places you know (cities, cafés or schools) in 5–6 sentences and say which you prefer and why.', checklist: ['I used than after comparatives', 'I used at least one superlative', 'I said what I prefer with because'] },
  },
  {
    id: 'a2-key-exam-rw', target: 'A2', level: 'A2', phase: 6, component: 'reading', minutes: 45,
    title: 'A2 Key Reading and Writing: timing and checking',
    canDo: 'I can plan my time in the Reading and Writing paper and check my answers.',
    exam: 'The A2 Key Reading and Writing paper lasts about an hour and covers seven parts, including two writing tasks at the end.',
    learn: [
      'Plan your time: leave about 15–20 minutes for the two writing tasks at the end.',
      'Answer every question — a guess may be right; an empty space is always wrong.',
      'In the last five minutes, check spelling of words copied from the text, and the three points in your email.',
    ],
    examples: [
      { text: 'Reading parts: about 35–40 minutes.', note: 'plan' }, { text: 'Two writing tasks: about 15–20 minutes.', note: 'plan' },
      { text: 'Last 5 minutes: check spelling and missing answers.', note: 'check' },
    ],
    practice: [
      { prompt: 'You do not know an answer. What should you do?', options: ['Leave it empty', 'Choose the most likely answer', 'Write two answers'], answer: 1, why: 'Empty answers get no marks.' },
      { prompt: 'Where are the writing tasks in this paper?', options: ['At the start', 'At the end', 'In a separate exam'], answer: 1, why: 'The two writing parts come at the end.' },
      { prompt: 'Why save time for writing?', options: ['It is optional', 'It needs planning and checking', 'It is easy'], answer: 1, why: 'Writing needs a plan and a final check.' },
      { prompt: 'In your email, you must…', options: ['write as much as possible', 'answer all three points', 'use difficult words'], answer: 1, why: 'Covering the points matters most.' },
      { prompt: 'What should you check in the last minutes?', options: ['Spelling and empty answers', 'Your phone', 'Nothing'], answer: 0, why: 'Quick checks save marks.' },
    ],
    task: { prompt: 'Do an official A2 Key sample Reading and Writing paper with a timer. Write down how long each part took.', checklist: ['I kept 15–20 minutes for writing', 'I answered every question', 'I checked spelling at the end'] },
  },
  {
    id: 'a2-key-exam-ls', target: 'A2', level: 'A2', phase: 6, component: 'speaking', minutes: 40,
    title: 'A2 Key Listening and Speaking: final practice',
    canDo: 'I can stay calm in the listening and speaking tests and use the strategies I learned.',
    exam: 'In A2 Key Listening you hear every recording twice. The Speaking test is in pairs: personal questions first, then a discussion with your partner.',
    learn: [
      'Listening: use the first time to find the answer and the second time to check it.',
      'Speaking: speak to your partner, not only to the examiner. Look at them, ask questions and react: Really? Me too!',
      'Sleep well, arrive early and bring what the exam centre asks for.',
    ],
    examples: [
      { text: 'First listening: answer. Second listening: check.' }, { text: 'Me too! I like that one because it looks fun. And you?' },
      { text: 'I’m not sure. Maybe the bike, because it’s cheap.' },
    ],
    practice: [
      { prompt: 'How many times do you hear each A2 Key recording?', options: ['once', 'twice', 'three times'], answer: 1, why: 'Each recording is played twice.' },
      { prompt: 'In the paired speaking task you should…', options: ['speak only to the examiner', 'talk with your partner and ask questions', 'stay silent'], answer: 1, why: 'Interaction is assessed.' },
      { prompt: 'Which reaction keeps a conversation going?', options: ['Really? Why?', 'OK.', 'Next.'], answer: 0, why: 'It invites more speaking.' },
      { prompt: 'What is the second listening for?', options: ['Checking your answers', 'Resting', 'Writing a story'], answer: 0, why: 'Use it to confirm.' },
      { prompt: 'You are not sure. You can say…', options: ['I’m not sure, maybe…', 'I don’t know. (silence)', 'Pass.'], answer: 0, why: 'Hedging keeps you talking.' },
    ],
    task: { prompt: 'Do one official A2 Key sample listening test, then record a 2-minute practice conversation with a friend or the English coach.', checklist: ['I used the second listening to check', 'I asked my partner questions', 'I gave reasons for my choices'] },
  },

  // ---------------- B1 Preliminary route (from A2) ----------------
  {
    id: 'b1-past-stories', target: 'B1', level: 'A2', phase: 1, component: 'language', minutes: 40,
    title: 'Past simple and past continuous: telling what happened',
    canDo: 'I can tell a short story with background and main events in the right order.',
    learn: [
      'Use the past continuous (was/were + -ing) for the background — what was happening: It was raining and people were waiting for the bus.',
      'Use the past simple for the main events: Suddenly the lights went out.',
      'Use when and while to join them: I was cooking when the phone rang. While we were walking home, we saw an accident.',
    ],
    examples: [
      { text: 'I was reading when my brother came in.' }, { text: 'While they were playing football, it started to rain.' },
      { text: 'The sun was shining and birds were singing.', note: 'background' }, { text: 'She was driving to work when she saw the fire.' },
    ],
    practice: [
      { prompt: 'I ___ dinner when you called.', options: ['cooked', 'was cooking', 'am cooking'], answer: 1, why: 'Background action: past continuous.' },
      { prompt: 'While we were walking, we ___ an old friend.', options: ['were meeting', 'met', 'meet'], answer: 1, why: 'Short main event: past simple.' },
      { prompt: 'Which sentence is correct?', options: ['When I arrived, they were eating.', 'When I was arriving, they ate.', 'When I arrive, they were eating.'], answer: 0, why: 'Arrived (event) + were eating (background).' },
      { prompt: 'They ___ TV when the power went off.', options: ['watched', 'were watching', 'was watching'], answer: 1, why: 'They + were + -ing.' },
      { prompt: 'Which word introduces a background action?', options: ['while', 'suddenly', 'finally'], answer: 0, why: 'While + past continuous.' },
    ],
    task: { prompt: 'Write a story (60–80 words) that begins: “It was a cold evening and I was waiting for the bus…”. Use both tenses and when/while.', checklist: ['I used the past continuous for the background', 'I used the past simple for events', 'I joined ideas with when or while'] },
  },
  {
    id: 'b1-practical-messages', target: 'B1', level: 'A2', phase: 1, component: 'writing', minutes: 35,
    title: 'Practical messages: invite, accept, refuse and suggest',
    canDo: 'I can write clear messages to invite, accept or politely refuse, with reasons.',
    learn: [
      'Invite: Would you like to…? / Do you fancy…? Accept: I’d love to! / That sounds great. Refuse politely: I’m afraid I can’t because…',
      'Always add a reason and, when you refuse, suggest another time: How about next Friday instead?',
      'Organise the message: greeting → main reply → details or questions → friendly ending.',
    ],
    examples: [
      { text: 'Would you like to come to the concert on Saturday?' }, { text: 'I’d love to, thanks! What time does it start?' },
      { text: 'I’m afraid I can’t come because I have an exam on Monday. How about next weekend?' },
    ],
    practice: [
      { prompt: 'Which phrase is a polite refusal?', options: ['No.', 'I’m afraid I can’t, because…', 'I don’t want.'], answer: 1, why: 'Polite + reason.' },
      { prompt: 'Which phrase invites someone?', options: ['Would you like to come?', 'You come.', 'Come must.'], answer: 0, why: 'Would you like to…? is a polite invitation.' },
      { prompt: 'After refusing, a good next sentence is…', options: ['How about next Friday instead?', 'Bye.', 'Never mind.'], answer: 0, why: 'Suggesting another time keeps it friendly.' },
      { prompt: '“Do you fancy going out?” means…', options: ['Do you want to go out?', 'Are you fancy?', 'Did you go out?'], answer: 0, why: 'Fancy = would like (informal).' },
      { prompt: 'Which order is best?', options: ['ending → greeting → reply', 'greeting → reply → details → ending', 'details → greeting'], answer: 1, why: 'A clear message structure.' },
    ],
    task: { prompt: 'A friend invites you to a birthday dinner but you can’t go. Write a message (50–70 words): thank them, refuse politely with a reason and suggest another plan.', checklist: ['I thanked my friend', 'I refused politely with a reason', 'I suggested another plan'] },
  },
  {
    id: 'b1-present-perfect', target: 'B1', level: 'B1', phase: 2, component: 'language', minutes: 40,
    title: 'Present perfect: experiences, changes and recent news',
    canDo: 'I can talk about my experiences and changes in my life, and choose between present perfect and past simple.',
    learn: [
      'Use the present perfect (have/has + past participle) for life experience with no exact time: I’ve visited Spain twice. Have you ever tried sushi?',
      'Use it for changes and recent news that matter now: I’ve lost my keys. Prices have gone up.',
      'If you say when it happened, use the past simple: I visited Spain in 2023. With for and since, the present perfect shows a period up to now: I’ve lived here for three years / since 2022.',
    ],
    examples: [
      { text: 'I’ve never been to London.' }, { text: 'She has just finished her exams.', note: 'recent' },
      { text: 'We’ve known each other since school.' }, { text: 'Have you ever met anyone famous? — Yes, I met a footballer last year.', note: 'question in PP, detail in PS' },
    ],
    practice: [
      { prompt: 'I ___ to Agadir three times.', options: ['went', 'have been', 'am going'], answer: 1, why: 'Experience, no time: present perfect.' },
      { prompt: 'We ___ the film last night.', options: ['have watched', 'watched', 'watch'], answer: 1, why: 'Finished time (last night): past simple.' },
      { prompt: 'She has worked here ___ 2021.', options: ['for', 'since', 'ago'], answer: 1, why: 'Since + a starting point.' },
      { prompt: '___ you ever ridden a camel?', options: ['Did', 'Have', 'Were'], answer: 1, why: 'Have you ever + participle.' },
      { prompt: 'I’ve lived in this flat ___ five years.', options: ['since', 'for', 'during'], answer: 1, why: 'For + a period.' },
    ],
    task: { prompt: 'Write 6 sentences about your experiences (things you have or haven’t done), then add details with the past simple for two of them.', checklist: ['I used have/has + participle for experiences', 'I used the past simple when I gave a time', 'I used for or since correctly'] },
  },
  {
    id: 'b1-opinions', target: 'B1', level: 'B1', phase: 2, component: 'language', minutes: 35,
    title: 'Giving opinions with reasons: because, so, although, however',
    canDo: 'I can give my opinion on a familiar topic, support it with reasons and mention another view.',
    learn: [
      'Give an opinion: I think… / In my opinion… / I believe… Then give a reason with because or since, and a result with so.',
      'Show the other side with although (inside one sentence) or however (to start a new sentence): Although cars are useful, they cause pollution. Cars are useful. However, they cause pollution.',
      'Finish with a clear conclusion: That’s why I think…',
    ],
    examples: [
      { text: 'In my opinion, students should wear uniforms because it saves time in the morning.' },
      { text: 'Although online shopping is fast, I prefer shops because I can try things on.' },
      { text: 'Living in a city is exciting. However, it can be very expensive.' },
    ],
    practice: [
      { prompt: '___ it was raining, we went for a walk.', options: ['Although', 'However', 'Because'], answer: 0, why: 'Although joins contrasting ideas in one sentence.' },
      { prompt: 'Phones are useful. ___, they can be distracting.', options: ['Although', 'However', 'So'], answer: 1, why: 'However starts a new contrasting sentence.' },
      { prompt: 'I was tired, ___ I went to bed early.', options: ['so', 'because', 'although'], answer: 0, why: 'So shows a result.' },
      { prompt: 'Which sentence gives an opinion with a reason?', options: ['I think cycling is great because it keeps you fit.', 'Cycling.', 'Is cycling great?'], answer: 0, why: 'Opinion + because.' },
      { prompt: 'Which phrase introduces a conclusion?', options: ['That’s why I think…', 'For example…', 'Firstly…'], answer: 0, why: 'It sums up your view.' },
    ],
    task: { prompt: 'Is it better to live in a city or in the countryside? Write 80–100 words: your opinion, two reasons, one point for the other side and a conclusion.', checklist: ['I gave a clear opinion', 'I used because / so / although / however', 'I finished with a conclusion'] },
  },
  {
    id: 'b1-prelim-reading', target: 'B1', level: 'B1', phase: 3, component: 'reading', minutes: 45,
    title: 'B1 Preliminary Reading: main idea and detail',
    canDo: 'I can understand the main points and important details in everyday texts and short articles.',
    exam: 'B1 Preliminary Reading has six parts and 32 questions in 45 minutes: short real-world texts, matching people to texts, longer texts with multiple choice and gapped texts.',
    learn: [
      'For main-idea questions, read the first and last sentences of each paragraph — they often carry the writer’s point.',
      'For detail questions, find the part of the text the question refers to, then read it carefully. Paraphrase is common: the text says “not expensive”, the option says “cheap”.',
      'In gapped texts, look at the words before and after the gap: pronouns (this, they, it) point to the missing sentence.',
    ],
    examples: [
      { text: 'Text: “The course is free for students.” Option: “Students don’t have to pay.”', note: 'paraphrase' },
      { text: '“…they all agreed. This decision changed everything.”', note: 'this = the decision just mentioned' },
      { text: 'Text: “I wish I had started earlier.” Option: “The writer regrets starting late.”', note: 'meaning, not the same words' },
    ],
    practice: [
      { prompt: 'The text says “tickets are not expensive”. Which option means the same?', options: ['Tickets are cheap.', 'Tickets are sold out.', 'There are no tickets.'], answer: 0, why: 'Not expensive = cheap.' },
      { prompt: 'Where is the main idea of a paragraph often found?', options: ['In the first or last sentence', 'In the longest word', 'In the title only'], answer: 0, why: 'Topic and concluding sentences.' },
      { prompt: 'A sentence starting with “This meant…” must follow…', options: ['an event or decision', 'a list of names', 'a question'], answer: 0, why: 'This refers back to something already mentioned.' },
      { prompt: 'Five people each want something. What do you match?', options: ['Each person to the best text', 'Each text to a picture', 'Words to meanings'], answer: 0, why: 'Matching task: people to texts.' },
      { prompt: 'An option repeats words from the text exactly. It is…', options: ['always right', 'not necessarily right — check the meaning', 'always wrong'], answer: 1, why: 'Same words, different meaning is a common trap.' },
    ],
    task: { prompt: 'Read two B1 passages in EnglishCamp. For each paragraph, write one sentence for the main idea before answering the questions.', checklist: ['I wrote the main idea of each paragraph', 'I found the evidence for each answer', 'I noticed at least two paraphrases'] },
  },
  {
    id: 'b1-prelim-listening', target: 'B1', level: 'B1', phase: 3, component: 'listening', minutes: 40,
    title: 'B1 Preliminary Listening: notes, opinions and decisions',
    canDo: 'I can follow the main points of clear speech and catch opinions and decisions.',
    exam: 'B1 Preliminary Listening has four parts and 25 questions; you hear each recording twice. Tasks include short dialogues, note completion and choosing what speakers think.',
    learn: [
      'For note completion, the words you write are usually the same words you hear — spell them carefully.',
      'For opinions, listen for agreement and disagreement: Exactly! / I’m not so sure. / That’s true, but…',
      'Decisions often come at the end: So, shall we…? / Let’s go with…',
    ],
    examples: [
      { text: '“I’m not so sure that’s a good idea.”', note: 'disagreement' }, { text: '“That’s true, but it’s quite expensive.”', note: 'partly agrees' },
      { text: '“OK, let’s go with the earlier train, then.”', note: 'decision' },
    ],
    practice: [
      { prompt: '“That’s true, but it’s quite expensive.” The speaker…', options: ['agrees completely', 'partly agrees', 'has no opinion'], answer: 1, why: 'That’s true, but… = partial agreement.' },
      { prompt: '“I’m not so sure.” shows…', options: ['agreement', 'doubt or disagreement', 'happiness'], answer: 1, why: 'It politely disagrees.' },
      { prompt: 'Where do decisions often come in a conversation?', options: ['At the start', 'At the end', 'Never'], answer: 1, why: 'Speakers decide after discussing.' },
      { prompt: 'In note completion you should…', options: ['change the words', 'write the words you hear and spell them correctly', 'write full sentences'], answer: 1, why: 'Exact words, correct spelling.' },
      { prompt: 'How many times do you hear each recording?', options: ['once', 'twice', 'three times'], answer: 1, why: 'Twice in B1 Preliminary.' },
    ],
    task: { prompt: 'Listen to two B1 recordings in EnglishCamp. Write each speaker’s opinion in one sentence and the final decision if there is one.', checklist: ['I noted agreement and disagreement phrases', 'I found the final decision', 'I checked my spelling with the transcript'] },
  },
  {
    id: 'b1-prelim-email', target: 'B1', level: 'B1', phase: 4, component: 'writing', minutes: 45,
    title: 'B1 Preliminary Writing: the email (about 100 words)',
    canDo: 'I can write an email that answers all the notes in a message, in a friendly and organised way.',
    exam: 'B1 Preliminary Writing has two parts in 45 minutes. Part 1 is always an email of about 100 words that replies to a message and four notes.',
    learn: [
      'The email has four notes around it — answer every one. Plan one short paragraph per note.',
      'Use a range of language: a question, a reason, a suggestion, and linking words (also, however, so, because).',
      'Write about 100 words. Check tenses, spelling and that the tone matches the reader (a friend → informal).',
    ],
    examples: [
      { text: 'Hi Jamie, Great to hear from you! The trip sounds amazing.', note: 'friendly opening' },
      { text: 'I think the museum is the best option because it’s interesting and not too expensive.', note: 'opinion + reason' },
      { text: 'Why don’t we meet at the station at 9?', note: 'suggestion' },
    ],
    practice: [
      { prompt: 'How many notes must the email answer?', options: ['two', 'all of them (four)', 'only the first'], answer: 1, why: 'Every note carries marks.' },
      { prompt: 'About how many words is the Part 1 email?', options: ['35', '100', '250'], answer: 1, why: 'About 100 words.' },
      { prompt: 'Which sentence is a suggestion?', options: ['Why don’t we meet at the café?', 'I met him at the café.', 'The café is big.'], answer: 0, why: 'Why don’t we…? suggests.' },
      { prompt: 'The reader is a friend. Which closing fits?', options: ['Yours faithfully', 'Speak soon, Hana', 'Regards, Director'], answer: 1, why: 'Informal for a friend.' },
      { prompt: 'A good plan is…', options: ['one short paragraph per note', 'one long sentence', 'a list of words'], answer: 0, why: 'Clear organisation.' },
    ],
    task: { prompt: 'Your friend Alex writes: “We’re planning a class trip! Which place should we visit? How should we travel? What should we take?” Reply in about 100 words.', checklist: ['I answered every question', 'I gave reasons and a suggestion', 'I wrote about 100 words and checked my tenses'] },
  },
  {
    id: 'b1-prelim-photo', target: 'B1', level: 'B1', phase: 4, component: 'speaking', minutes: 35,
    title: 'B1 Preliminary Speaking: describing a photo',
    canDo: 'I can describe a photo for about a minute, even when I don’t know every word.',
    exam: 'B1 Preliminary Speaking has four parts and is taken in pairs. In Part 2 each candidate talks alone for about a minute about a photo.',
    learn: [
      'Start with the big picture: In this photo I can see… / The photo shows… Then describe people, place, actions and feelings.',
      'Use the present continuous for actions in the photo: Two people are cooking. A man is laughing.',
      'If you don’t know a word, describe it: It’s a kind of… / It’s something you use to… Keep talking for the whole minute.',
    ],
    examples: [
      { text: 'The photo shows a family in a park on a sunny day.' }, { text: 'On the left, a boy is playing with a dog.' },
      { text: 'I think they’re happy because they’re smiling.', note: 'guess + reason' }, { text: 'It’s a kind of big umbrella for the beach.', note: 'unknown word' },
    ],
    practice: [
      { prompt: 'Which tense describes actions in a photo?', options: ['past simple', 'present continuous', 'present perfect'], answer: 1, why: 'Actions happening in the picture.' },
      { prompt: 'You don’t know the word “ladder”. You say…', options: ['Nothing.', 'It’s something you use to climb up.', 'Ladder no.'], answer: 1, why: 'Describe the object.' },
      { prompt: 'A good way to begin is…', options: ['The photo shows…', 'I don’t know.', 'Finished.'], answer: 0, why: 'Start with the overall scene.' },
      { prompt: 'How long do you talk about the photo?', options: ['about 10 seconds', 'about a minute', 'about 5 minutes'], answer: 1, why: 'About one minute.' },
      { prompt: 'Which sentence gives a guess with a reason?', options: ['Maybe it’s winter because they’re wearing coats.', 'It’s winter.', 'Coats.'], answer: 0, why: 'Maybe… because…' },
    ],
    task: { prompt: 'Find a photo of people doing an activity. Record yourself describing it for one minute: the place, the people, what they are doing and how they feel.', checklist: ['I spoke for about a minute', 'I used the present continuous', 'I described or guessed with because'] },
  },
  {
    id: 'b1-prelim-article-story', target: 'B1', level: 'B1', phase: 5, component: 'writing', minutes: 45,
    title: 'B1 Preliminary Writing: an article or a story (about 100 words)',
    canDo: 'I can write a short article that interests the reader, or a story with a clear beginning, middle and end.',
    exam: 'In B1 Preliminary Writing Part 2 you choose an article or a story, about 100 words.',
    learn: [
      'Article: give it a title, talk to the reader (Have you ever…?), give your view with examples, and end with a final thought.',
      'Story: use the first sentence you are given, keep the same person and tense, and include a problem and an ending.',
      'In both, vary your language: adjectives (amazing, terrible), linking words (first, then, in the end) and a range of tenses.',
    ],
    examples: [
      { text: 'Have you ever thought about how much time you spend online?', note: 'article opener' },
      { text: 'In the end, we laughed about it, but I never forgot that day.', note: 'story ending' },
      { text: 'Suddenly, the lights went out and everyone stopped talking.', note: 'story: the problem' },
    ],
    practice: [
      { prompt: 'An article should…', options: ['speak to the reader and give a view', 'list facts only', 'be a letter to a company'], answer: 0, why: 'Engage the reader with a view.' },
      { prompt: 'In a story task you must…', options: ['change the given first sentence', 'use the given first sentence', 'write a poem'], answer: 1, why: 'The story starts with the sentence given.' },
      { prompt: 'Which is a good article title?', options: ['My Favourite Way to Relax', 'Dear Sir', 'Answer'], answer: 0, why: 'A clear title.' },
      { prompt: 'What does a good story need?', options: ['A problem and an ending', 'Only a description', 'A list of names'], answer: 0, why: 'Events with a resolution.' },
      { prompt: 'About how long is Part 2?', options: ['100 words', '35 words', '300 words'], answer: 0, why: 'About 100 words.' },
    ],
    task: { prompt: 'Choose one: an article “The best place to relax in my town” or a story beginning “When I opened the door, I couldn’t believe my eyes.” Write about 100 words.', checklist: ['I followed the type (article or story)', 'I used linking words and varied adjectives', 'I wrote about 100 words with a clear ending'] },
  },
  {
    id: 'b1-conditionals', target: 'B1', level: 'B1', phase: 5, component: 'language', minutes: 40,
    title: 'First and second conditionals: advice and imagined situations',
    canDo: 'I can talk about real possibilities and imagined situations, and give advice.',
    learn: [
      'First conditional — real future possibility: If it rains, we’ll stay at home. (if + present, will + verb)',
      'Second conditional — imagined or unlikely situations: If I had more time, I would learn the guitar. (if + past, would + verb)',
      'Give advice with If I were you, I’d… / You should… / Why don’t you…?',
    ],
    examples: [
      { text: 'If you study every day, you’ll pass the exam.' }, { text: 'If I won the lottery, I’d travel around the world.' },
      { text: 'If I were you, I’d talk to the teacher.', note: 'advice' }, { text: 'What would you do if you lost your phone?' },
    ],
    practice: [
      { prompt: 'If it ___ sunny tomorrow, we’ll go to the beach.', options: ['is', 'will be', 'was'], answer: 0, why: 'First conditional: if + present.' },
      { prompt: 'If I ___ rich, I would buy a house.', options: ['am', 'was/were', 'will be'], answer: 1, why: 'Second conditional: if + past.' },
      { prompt: 'If I were you, I ___ see a doctor.', options: ['will', 'would', 'am'], answer: 1, why: 'Advice: I’d (would).' },
      { prompt: 'Which sentence is about an imagined situation?', options: ['If I had wings, I would fly.', 'If it rains, I’ll take an umbrella.', 'I take an umbrella when it rains.'], answer: 0, why: 'Impossible situation: second conditional.' },
      { prompt: 'You’ll miss the bus if you ___ now.', options: ['don’t leave', 'won’t leave', 'didn’t leave'], answer: 0, why: 'if + present simple.' },
    ],
    task: { prompt: 'Answer in 5–6 sentences: What would you do if you had a free month? Then give a friend two pieces of advice about learning English.', checklist: ['I used the second conditional correctly', 'I used the first conditional or advice phrases', 'I checked would + base verb'] },
  },
  {
    id: 'b1-prelim-discussion', target: 'B1', level: 'B1', phase: 6, component: 'speaking', minutes: 40,
    title: 'B1 Preliminary Speaking: discussing and deciding together',
    canDo: 'I can discuss options with a partner, give opinions and reach a decision.',
    exam: 'In B1 Preliminary Speaking Part 3 you and your partner discuss a situation with picture prompts and try to agree; Part 4 is a wider discussion on the same topic.',
    learn: [
      'Talk about each option before you decide: What do you think about…? I think this one is useful because…',
      'Agree and disagree politely: I agree with you. / That’s a good point, but… / I see what you mean, however…',
      'Move to a decision near the end: So, which one shall we choose? / I think we both agree that…',
    ],
    examples: [
      { text: 'What do you think about the camping trip?' }, { text: 'That’s a good point, but it might be too expensive for students.' },
      { text: 'So, shall we choose the museum? — Yes, I think that’s the best option.' },
    ],
    practice: [
      { prompt: 'Which phrase politely disagrees?', options: ['That’s a good point, but…', 'You’re wrong.', 'No way.'], answer: 0, why: 'Polite partial disagreement.' },
      { prompt: 'Which phrase moves to a decision?', options: ['So, which one shall we choose?', 'Next picture.', 'I don’t care.'], answer: 0, why: 'It invites agreement.' },
      { prompt: 'In Part 3 you should…', options: ['talk alone for two minutes', 'discuss the options with your partner', 'describe one photo'], answer: 1, why: 'It is a collaborative task.' },
      { prompt: 'What should you do before deciding?', options: ['Discuss several options', 'Choose immediately', 'Stay silent'], answer: 0, why: 'The discussion is assessed.' },
      { prompt: 'Which phrase invites your partner’s opinion?', options: ['What do you think?', 'I finished.', 'Listen to me.'], answer: 0, why: 'It shares the conversation.' },
    ],
    task: { prompt: 'With a friend or the English coach, discuss: “Your class wants to raise money for charity. Which activity is best — a cake sale, a concert or a sponsored walk?” Talk for 2–3 minutes and decide.', checklist: ['We discussed every option', 'I agreed and disagreed politely', 'We reached a decision'] },
  },
  {
    id: 'b1-prelim-exam-day', target: 'B1', level: 'B1', phase: 6, component: 'reading', minutes: 45,
    title: 'B1 Preliminary: timing, checking and exam day',
    canDo: 'I can manage my time in each paper and check my work before the end.',
    exam: 'B1 Preliminary has four papers: Reading (45 minutes), Writing (45 minutes), Listening (about 30 minutes) and Speaking (12–17 minutes for a pair). Each paper is 25% of the total.',
    learn: [
      'Reading: about 7 minutes per part, and answer every question.',
      'Writing: about 20 minutes per task, plus 5 minutes to check word count, notes and tenses.',
      'Listening: read the questions in the pause before each part; use the second listening to check. Speaking: listen to your partner and react.',
    ],
    examples: [
      { text: 'Reading: six parts in 45 minutes.', note: 'pace' }, { text: 'Writing: Part 1 email, Part 2 article or story.', note: 'plan' },
      { text: 'Each of the four papers counts for 25%.', note: 'balance' },
    ],
    practice: [
      { prompt: 'How long is the Reading paper?', options: ['45 minutes', '2 hours', '15 minutes'], answer: 0, why: 'Reading: 45 minutes.' },
      { prompt: 'How much is each paper worth?', options: ['25%', '50%', '10%'], answer: 0, why: 'Four papers, 25% each.' },
      { prompt: 'Which writing task is always the same type?', options: ['Part 1: the email', 'Part 2', 'Neither'], answer: 0, why: 'Part 1 is always an email.' },
      { prompt: 'What should you do in the pause before a listening part?', options: ['Read the questions', 'Close your eyes', 'Start writing your email'], answer: 0, why: 'Prepare for what you will hear.' },
      { prompt: 'In the last minutes of Writing, check…', options: ['the notes, word count and tenses', 'nothing', 'only your name'], answer: 0, why: 'Quick checks save marks.' },
    ],
    task: { prompt: 'Do an official B1 Preliminary sample Reading and Writing test with exam timing. Note your time per part and one thing to improve.', checklist: ['I followed the time plan', 'I answered every question', 'I checked my writing at the end'] },
  },
];

export const routeLesson = (id: string) => ROUTE_LESSONS.find(l => l.id === id);
export const routeLessonExerciseId = (id: string) => `route-lesson:${id}`;
