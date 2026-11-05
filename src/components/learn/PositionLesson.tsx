import { POSITION_WORDS } from '@/data/position-lesson';
import { PositionDiagram } from './PositionDiagram';
export function PositionLesson(){
 return <section className="camp-position-lesson" id="position-words" aria-labelledby="position-words-title">
  <h3 id="position-words-title">Position and movement</h3>
  <p>Use a position word to say where something is. Use a movement word to show where it goes. The violet ball is the object to follow in each diagram.</p>
  {(['position','movement'] as const).map(group=><section key={group} className="camp-position-group"><h4>{group==='position'?'Where is it?':'Where does it go?'}</h4><div className="camp-position-grid">{POSITION_WORDS.filter(word=>word.group===group).map(word=><figure key={word.id} className="camp-position-card"><PositionDiagram word={word}/><figcaption><h5>{word.label}</h5><p>{word.rule}</p><p className="camp-position-example">{word.example}</p></figcaption></figure>)}</div></section>)}
  <aside className="camp-position-contrast"><strong>Notice the difference</strong><p>“On” means contact with a surface; “above” only means higher. “Under” often means directly beneath something; “below” compares levels. “The ball is in the box” describes its position; “move it into the box” describes movement.</p></aside>
 </section>;
}
