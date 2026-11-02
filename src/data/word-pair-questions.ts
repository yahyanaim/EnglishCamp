/** Authored gaps: reference examples remain intact in the Word Pairs library. */
export const WORD_PAIR_GAPS: Record<string, [string, string, string?]> = {
  "affect/effect":["Lack of sleep can ___ your concentration.","The medicine had an immediate ___."],
  "their/there":["The neighbours parked ___ car outside.","Put the boxes over ___, beside the door."],
  "there/they're":["___ is a spare chair in the kitchen.","___ waiting for us at the station."],
  "your/you're":["Have you finished ___ homework?","I think ___ ready for the next lesson."],
  "its/it's":["The bird spread ___ wings.","Take a coat: ___ cold outside."],
  "accept/except":["I am happy to ___ your invitation.","Everyone ___ the driver left the bus."],
  "principal/principle":["The school ___ welcomed the new pupils.","Fairness is a basic ___ of our work."],
  "stationary/stationery":["The vehicle remained ___ at the traffic lights.","The office ordered paper and other ___."],
  "complement/compliment":["The sauce is a perfect ___ to the meal.","She paid the chef a ___ on the meal."],
  "discreet/discrete":["Please be ___: the plans are confidential.","The process has three ___ stages, each separate from the others."],
  "eminent/imminent":["An ___ scientist gave the lecture.","The evacuation alarm sounded: danger was ___."],
  "elicit/illicit":["The interviewer tried to ___ a detailed response.","The police investigated the ___ sale of stolen goods."],
  "ensure/insure":["Please ___ that every window is closed.","We need to ___ the house against fire.","Use British English: ensure means make certain; insure refers to insurance."],
  "farther/further":["We need ___ information before deciding.","The committee needs ___ evidence.","Choose the word meaning additional. Both farther and further can describe physical distance, so distance alone is not tested here."],
  "loose/lose":["This screw is ___; tighten it before use.","Keep the ticket safe so you do not ___ it."],
  "than/then":["This journey is shorter ___ the last one.","First save the file; ___ close the program."],
  "weather/whether":["The ___ forecast predicts rain.","I cannot decide ___ to walk or take the bus."],
  "who's/whose":["___ going to lead the meeting?","___ notebook is on this desk?"],
  "advice/advise":["The tutor gave me useful ___ about revision.","I would ___ you to check the instructions."],
  "practice/practise":["Regular ___ improves fluency.","I ___ speaking every morning.","Use British English: practice is the noun; practise is the verb. American English uses practice for both."],
  "conscience/conscious":["His ___ troubled him after he lied.","The patient was awake and ___ throughout."],
  "historic/historical":["The treaty was a ___ achievement: it changed the course of history.","This ___ novel is set in the nineteenth century.","Choose historic for historically important; choose historical for a genre concerned with past events."],
  "definite/definitive":["We need a ___ date: Tuesday or Wednesday, not maybe next week.","The publisher describes this as the ___ edition, the final authoritative version.","Choose definite for a fixed, certain detail; definitive for an authoritative final version."],
};

export function wordPairQuestions(pair: {word1:string;word2:string}) {
  const pairKey = `${pair.word1}/${pair.word2}`, gaps = WORD_PAIR_GAPS[pairKey];
  if (!gaps) return [];
  return ([gaps[0],gaps[1]].slice(0,pairKey === "farther/further" ? 1 : 2)).map((example,index) => ({example, wordA:pair.word1, wordB:pair.word2, correct:(pairKey === "farther/further" || index === 1 ? "B" : "A") as "A"|"B", pairKey, focus:gaps[2]}));
}
