"use client";
import {emptyCefrRecord} from '@/lib/cefrPlacement';
import {usePathname, useRouter} from 'next/navigation';
import {Button} from '@/components/ui/shadcn/button';
import {LearningArt} from '@/components/brand/LearningArt';
import {BrandMark} from '@/components/brand/BrandMark';
import {AdminIcon} from '@/components/admin/AdminIcon';
import {useSessionProfile} from '@/components/session/SessionProvider';
import {usePlacementRecord} from './usePlacementRecord';
export function PlacementOffer(){
 const{placementOffer,closePlacementOffer}=useSessionProfile(),{profile,record,ready,update,error}=usePlacementRecord(),router=useRouter(),pathname=usePathname();
 function skip(){update(r=>({...r,status:'skipped'}));closePlacementOffer();}
 function start(){if(update(r=>({...r,status:'in-progress',startedAt:r.startedAt||new Date().toISOString(),cefr:r.cefr?.status==='in-progress'?r.cefr:{...emptyCefrRecord(),status:'in-progress',attemptId:crypto.randomUUID(),results:r.cefr?.results||[]}}))){closePlacementOffer();router.push('/placement-test');}}
 // Offered on the Dashboard only, so it never pushes down a page the learner asked to open.
 if(!placementOffer||!profile||!ready||record.status!=='new'||pathname!=='/dashboard')return null;
 return <section className="camp-placement-welcome" aria-labelledby="placement-welcome-title"><button className="camp-placement-dismiss" aria-label="Dismiss optional level test" onClick={skip}><AdminIcon name="close" size={14}/></button><div className="camp-placement-welcome-copy"><p className="camp-placement-eyebrow">YOUR FIRST STEP · OPTIONAL</p><h2 id="placement-welcome-title">Find your starting point.</h2><p>A CEFR English test, a personal level estimate and a study plan that fits what you need to practise.</p><ul className="camp-placement-welcome-meta"><li><LearningArt name="book" size={16}/>Four skills</li><li><LearningArt name="clock" size={16}/>60–90 minutes</li><li><LearningArt name="document" size={16}/>Save and resume</li></ul><div className="camp-placement-welcome-actions"><Button onClick={start}>Take the CEFR test<AdminIcon name="arrow" size={14}/></Button><button onClick={skip}>Explore first<AdminIcon name="chevron-right" size={11}/></button></div></div><div className="camp-placement-welcome-art" aria-hidden="true"><BrandMark size={112}/><span>One step at a time.</span></div><details className="camp-placement-welcome-details"><summary>About this optional test</summary><p>You can leave and resume in this tab. Writing and speaking responses go to OpenAI only after your separate approval. You may skip them. Your result is an independent diagnostic estimate, not a validated CEFR qualification.</p></details>{error&&<p role="alert">{error}</p>}</section>;
}
