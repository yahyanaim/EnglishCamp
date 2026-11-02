export type Encouragement = { id: string; text: string; action: string };
const foundations: Encouragement[] = [
  {id:"first-step",text:"Every word you understand makes the next sentence a little more familiar.",action:"Choose one useful word and put it in your own sentence."},
  {id:"return",text:"You do not need a perfect study day to make a useful step forward.",action:"A short reading or listening activity is a good place to begin."},
  {id:"notice",text:"Noticing a word for the second time is part of learning it.",action:"Look for a familiar word in your next article."},
  {id:"voice",text:"Your English grows each time you give it a chance to be used.",action:"Listen to one sentence and say it aloud at your own pace."},
  {id:"small",text:"Small, repeated efforts give new language a place to stay.",action:"Review a few words you have already met."},
];
const developing: Encouragement[] = [
  {id:"connect",text:"You are building connections between words, ideas and situations.",action:"Read a short passage, then explain its main idea in your own words."},
  {id:"mistake",text:"A mistake you understand can become a useful part of your progress.",action:"Choose one explanation from your last practice and try it again."},
  {id:"meaning",text:"Understanding the message matters more than knowing every single word.",action:"Listen once for the main idea, then replay a detail."},
  {id:"range",text:"Each new topic gives you another way to take part in a conversation.",action:"Explore a topic you have not practised before."},
  {id:"steady",text:"Steady practice gives you more chances to notice what is becoming easier.",action:"Compare a new task with something you found difficult earlier."},
];
const extending: Encouragement[] = [
  {id:"precision",text:"Greater confidence can grow alongside greater care for detail.",action:"Review how one word choice changes the meaning of a sentence."},
  {id:"perspective",text:"A challenging text can offer both new language and a new perspective.",action:"Read an unfamiliar topic and summarise the writer’s reasoning."},
  {id:"flexibility",text:"Being able to express the same idea in different ways is a useful strength.",action:"Rephrase a sentence without changing its meaning."},
  {id:"purpose",text:"Your growing language skills give you more choices about how to communicate.",action:"Try explaining an idea for a different audience or purpose."},
  {id:"curiosity",text:"Curiosity gives your practice a reason to continue.",action:"Follow one question from today’s lesson into another reading or conversation."},
];
export function encouragementPool(level: number): readonly Encouragement[] { return level <= 3 ? foundations : level <= 6 ? developing : extending; }
export function chooseEncouragement(level: number, previous?: string): Encouragement {
  const available = encouragementPool(level).filter(item => item.id !== previous);
  return available[Math.floor(Math.random() * available.length)];
}
