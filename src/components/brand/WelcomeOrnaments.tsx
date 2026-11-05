import { LearningArt } from './LearningArt';
/** Small decorative marks follow the same CSS palette as all learning artwork. */
export function WelcomeOrnaments(){return <div className="camp-welcome-ornaments" aria-hidden="true">{['book','chat','note','headphones','spark','cap'].map((name,index)=><span className={`camp-welcome-orbit camp-welcome-orbit-${index+1}`} key={name}><LearningArt name={name} size={index===4?16:24}/></span>)}</div>;}
