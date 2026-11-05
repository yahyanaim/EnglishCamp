import { GRAMMAR_EXTENSIONS } from '@/data/grammar-extensions';
import { GRAMMAR_FOUNDATIONS } from '@/data/grammar-foundations';
import { ESSENTIAL_VOCABULARY } from '@/data/essential-vocabulary';
export type ReferenceKind='grammar'|'words';
export const referenceStudyId=(kind:ReferenceKind,id:string)=>`reference-${kind}-${id}`;
export const REFERENCE_STUDIES=[
 ...GRAMMAR_EXTENSIONS.map(lesson=>({id:referenceStudyId('grammar',lesson.id),topic:lesson.id,title:lesson.title,kind:'grammar' as const,href:`/grammar#${lesson.id}`})),
 ...GRAMMAR_FOUNDATIONS.map(lesson=>({id:referenceStudyId('grammar',lesson.id),topic:lesson.id,title:lesson.title,kind:'grammar' as const,href:`/grammar/cheat-sheet#${lesson.id}`})),
 ...ESSENTIAL_VOCABULARY.map(topic=>({id:referenceStudyId('words',topic.id),topic:topic.id,title:topic.title,kind:'words' as const,href:`/grammar/cheat-sheet#vocabulary-${topic.id}`}))
];
export function referenceSnapshot(done:Record<string,boolean>){
 const grammar=REFERENCE_STUDIES.filter(s=>s.kind==='grammar'),words=REFERENCE_STUDIES.filter(s=>s.kind==='words'),count=(items:readonly {id:string}[])=>items.filter(s=>done[s.id]).length;
 return {grammar:{done:count(grammar),total:grammar.length},words:{done:count(words),total:words.length},nextGrammar:grammar.find(s=>!done[s.id]),nextWords:words.find(s=>!done[s.id])};
}
export function referenceForHref(href:string){return REFERENCE_STUDIES.find(s=>s.href===href);}
