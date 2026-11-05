import { ESSENTIAL_VOCABULARY } from '@/data/essential-vocabulary';
import { EssentialVocabularyTopic } from './EssentialVocabulary';
/** One reference category, with the same small labelled diagrams as Position and movement. */
export function WordsLesson(){return <section className="camp-words-lesson"><p>See the word, learn its Arabic meaning and read a simple example. These everyday words are a starting point for A1–A2 practice.</p>{ESSENTIAL_VOCABULARY.map(topic=><section className="camp-position-group" id={`vocabulary-${topic.id}`} key={topic.id}><h3>{topic.title}</h3><EssentialVocabularyTopic topic={topic}/></section>)}</section>;}
