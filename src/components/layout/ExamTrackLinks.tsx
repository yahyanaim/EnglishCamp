"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { LearningArt } from "@/components/brand/LearningArt";
const tracks=[
  {id:"ielts-academic",name:"IELTS Academic",detail:"Academic mock exam",icon:"document"},
  {id:"ielts-general",name:"IELTS General",detail:"General Training mock exam",icon:"note"},
  {id:"toefl-ibt",name:"TOEFL iBT",detail:"2026 mock exam",icon:"flag"},
  {id:"b2-first",name:"B2 First",detail:"Cambridge mock exam",icon:"cap"},
];
export function ExamTrackLinks({onNavigate}:{onNavigate?:()=>void}) {
  const pathname=usePathname(),params=useSearchParams();
  return <nav className="camp-exam-links" aria-label="Examination tracks">{tracks.map(track=>{
    const active=pathname==="/mock-exam"&&params.get("exam")===track.id;
    return <Link prefetch={false} key={track.id} href={`/mock-exam?exam=${track.id}`} className="camp-exam-link" aria-current={active?"page":undefined} onClick={onNavigate}><LearningArt name={track.icon} size={23}/><span><strong>{track.name}</strong><small>{track.detail}</small></span></Link>;
  })}</nav>;
}
