export const ADJECTIVE_QUESTIONS = [
 {id:'story',sentence:'The story kept everyone excited. It was an ___ story.',answer:'exciting',options:['exciting','excited','excite','excitement'],explain:'The story causes the feeling, so use exciting. Excited describes the person who feels it.'},
 {id:'film',sentence:'The film made me feel bored. It was a ___ film.',answer:'boring',options:['boring','bored','bore','boredom'],explain:'Boring describes the thing that causes boredom; bored describes a person’s feeling.'},
 {id:'museum',sentence:'I enjoy history and want to learn more. I am ___ in visiting the museum.',answer:'interested',options:['interested','interesting','interest','interests'],explain:'A person who feels curiosity is interested in something.'},
 {id:'trick',sentence:'The children felt amazement after the trick. They were ___.',answer:'amazed',options:['amazed','amazing','amaze','amazement'],explain:'Amazed describes how the children felt. Amazing describes the trick.'},
 {id:'work',sentence:'After working all night, Omar felt ___.',answer:'tired',options:['tired','tiring','tire','tiredness'],explain:'Tired describes Omar’s state. Tiring describes work that causes tiredness.'},
 {id:'glass',sentence:'Handle the fragile glass with care. Be ___.',answer:'careful',options:['careful','carefully','care','carefulness'],explain:'After be, use the adjective careful. Carefully is an adverb.'},
 {id:'dark',sentence:'There was no light in the room. It was completely ___.',answer:'dark',options:['dark','darkness','darkly','darken'],explain:'Dark is the adjective. English adjectives do not take noun agreement endings.'},
 {id:'easier',sentence:'The second task takes less effort. It is ___ than the first.',answer:'easier',options:['easier','easy','easiest','easily'],explain:'Use the comparative easier with than. Change consonant + y to -ier.'},
 {id:'highest',sentence:'Everest is the ___ mountain in the world.',answer:'highest',options:['highest','higher','high','highly'],explain:'Use the superlative highest when comparing one mountain with all the others.'},
 {id:'better',sentence:'My first score was 60; my next was 80. The second result was ___.',answer:'better',options:['better','good','best','well'],explain:'The irregular comparative of good is better.'},
 {id:'useful',sentence:'The guide helped us find every street. It was ___.',answer:'useful',options:['useful','usefully','use','usefulness'],explain:'Useful is an adjective meaning helpful. The suffix -ful has one final l.'},
 {id:'careless',sentence:'He ignored the instructions and made avoidable mistakes. His work was ___.',answer:'careless',options:['careless','carelessly','carelessness','care'],explain:'Careless is an adjective meaning without enough care.'},
 {id:'beautiful',sentence:'Everyone admired the view. The scenery was ___.',answer:'beautiful',options:['beautiful','beautifully','beauty','beautify'],explain:'Beautiful describes scenery. Beautifully is an adverb; beauty is a noun.'},
 {id:'surprised',sentence:'The unexpected gift made Leila feel ___.',answer:'surprised',options:['surprised','surprising','surprise','surprisingly'],explain:'Surprised describes Leila’s feeling. Surprising describes the gift or event.'},
 {id:'friendly',sentence:'The new neighbour was kind and welcoming. She seemed ___.',answer:'friendly',options:['friendly','friend','friendship','befriend'],explain:'Friendly is an adjective, even though it ends in -ly.'},
];
export function adjectiveRound(random:()=>number=Math.random){
 const copy=ADJECTIVE_QUESTIONS.map(item=>({...item,options:[...item.options]}));
 const shuffle=<T,>(items:T[])=>{for(let i=items.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[items[i],items[j]]=[items[j],items[i]];}return items;};
 return shuffle(copy).slice(0,10).map(item=>({...item,options:shuffle(item.options)}));
}
