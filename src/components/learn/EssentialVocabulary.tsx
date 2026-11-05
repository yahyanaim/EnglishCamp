import { ESSENTIAL_VOCABULARY, type EssentialTopic } from '@/data/essential-vocabulary';
import { EssentialWordArt } from './EssentialWordArt';
export function EssentialVocabularyTopic({topic}:{topic:EssentialTopic}){
 return <section className="camp-essential-topic" aria-label={topic.title}><p>{topic.intro}</p><div className="camp-essential-grid">{topic.words.map(word=><figure className="camp-essential-word" key={word.en}><EssentialWordArt topic={topic.id} word={word}/><figcaption><h4>{word.en}</h4><p className="camp-essential-meaning" dir="rtl" lang="ar">{word.ar}</p><p className="camp-essential-example">{word.example}</p></figcaption></figure>)}</div></section>;
}
export const essentialVocabularyCount=ESSENTIAL_VOCABULARY.reduce((total,topic)=>total+topic.words.length,0);
