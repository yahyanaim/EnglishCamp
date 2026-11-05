"use client";
import { emptyCefrRecord } from '@/lib/cefrPlacement';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { Dialog,DialogContent,DialogHeader,DialogTitle,DialogDescription } from '@/components/ui/shadcn/dialog';
import { Button } from '@/components/ui/shadcn/button';
import { LearningArt } from '@/components/brand/LearningArt';
import { useSessionProfile } from '@/components/session/SessionProvider';
import { usePlacementRecord } from './usePlacementRecord';
export function PlacementOffer(){
 const {placementOffer,closePlacementOffer}=useSessionProfile();const {profile,record,update,error}=usePlacementRecord();const router=useRouter();
 function skip(){update(r=>({...r,status:'skipped'}));closePlacementOffer();router.push('/dashboard');}
 function start(){if(update(r=>({...r,status:'in-progress',startedAt:r.startedAt||new Date().toISOString(),cefr:r.cefr?.status==='in-progress'?r.cefr:{...emptyCefrRecord(),status:'in-progress',attemptId:crypto.randomUUID(),results:r.cefr?.results||[]}}))){closePlacementOffer();router.push('/placement-test');}}
 return <Dialog open={placementOffer&&!!profile&&record.status==='new'} onOpenChange={open=>{if(!open)skip();}}><DialogContent className="camp-placement-offer"><Button variant="ghost" size="icon" className="camp-dialog-close" aria-label="Skip placement test" onClick={skip}><X size={18}/></Button><LearningArt name="Target" size={36}/><DialogHeader><DialogTitle>Find your starting point, {profile?.name}</DialogTitle><DialogDescription>Take an optional CEFR-aligned four-skill check, then get a named completion certificate and a study timetable.</DialogDescription></DialogHeader><p>About 60–90 minutes · Language use, reading, listening, writing and speaking. You can leave and resume in this tab.</p><p className="camp-placement-fine">Writing and speaking assessment send a response to OpenAI only after separate approval. You can skip them. The result is an independent diagnostic estimate, not a validated CEFR qualification.</p>{error&&<p role="alert">{error}</p>}<div className="camp-placement-actions"><Button onClick={start}>Take the optional test</Button><Button variant="outline" onClick={skip}>Skip · go to the platform</Button></div></DialogContent></Dialog>;
}
