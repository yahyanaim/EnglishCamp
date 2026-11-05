import type { CSSProperties } from 'react';
import { BrandMark } from '@/components/brand/BrandMark';
import { Button } from '@/components/ui/shadcn/button';
import { LearningArt } from '@/components/brand/LearningArt';
import { certificateReport,certificateQRPath,cefrLevelName,CEFR_LEVELS,type CertificateResult } from '@/lib/certificateReport';

/** The same portrait composition is used in the downloadable certificate. */
export function CertificatePreview({name,result,working,onDownload}:{name:string;result:CertificateResult;working:boolean;onDownload:()=>void}){
 const report=certificateReport(result),qr=certificateQRPath(name,result);
 return <section className="camp-certificate-modern" aria-label="Placement completion certificate"><article className="camp-certificate-document">
  <div className="camp-cert-award">
   <header><BrandMark size={28}/><strong>EnglishCamp</strong><span>{report.aligned?'CEFR English test':'Personal learning record'}</span></header>
   <div className="camp-cert-intro"><h2 dir="auto" lang={/[\u0600-\u06ff]/.test(name)?'ar':'en'}>{name}</h2><p>has completed the {report.aligned?'EnglishCamp CEFR English test':'EnglishCamp study check'}<br/>and received the following study result.</p></div>
   <div className="camp-cert-emblem"><svg className="camp-cert-rosette" viewBox="0 0 400 400" aria-hidden="true"><defs><radialGradient id="camp-cert-emblem-fill"><stop stopColor="var(--camp-purple)"/><stop offset="1" stopColor="var(--camp-purple)" stopOpacity=".1"/></radialGradient></defs><g fill="url(#camp-cert-emblem-fill)" stroke="var(--camp-purple)" strokeOpacity=".16">{[0,22.5,45,67.5].map(angle=><g key={angle} transform={`rotate(${angle} 200 200)`}><rect x="67" y="67" width="266" height="266"/>{Array.from({length:15},(_,i)=><rect key={i} x={67+i*4} y={67+i*4} width={266-i*8} height={266-i*8} fill="none"/>)}</g>)}</g></svg>
    <img className="camp-cert-fox camp-cert-fox-left" src="/media/brand/englishcamp-mascot-256.png" alt="" width="90" height="90"/>
    <div className="camp-cert-score"><small>{report.scoreLabel}</small><strong>{report.score}</strong><span>{report.level} · {cefrLevelName[report.level]}</span><small>{report.headline}</small></div>
    <img className="camp-cert-fox camp-cert-fox-right" src="/media/brand/englishcamp-mascot-256.png" alt="" width="90" height="90"/>
   </div>
   <div className="camp-cert-assessed">{report.skills.map(skill=><span key={skill.key}><i aria-hidden="true">{skill.level?'✓':'·'}</i>{skill.label}<small>{skill.level?'Assessed':'Unassessed'}</small></span>)}</div>
   <p className="camp-cert-date">Completed on {new Date(result.completedAt).toLocaleDateString(undefined,{day:'numeric',month:'long',year:'numeric'})}</p>
  </div>
  <section className="camp-cert-results"><h3>Understanding your results</h3>
   {report.aligned&&<><div className="camp-cert-levels" aria-label="CEFR reference levels">{CEFR_LEVELS.map(level=><div key={level} className={report.level===level?'is-selected':''}><strong>{level}</strong><small>{cefrLevelName[level]}</small></div>)}</div>{report.level==='Pre-A1'&&<p>Your next study step: A1 foundations.</p>}</>}
   <p className="camp-cert-scope">{report.scope} {report.complete?'The EnglishCamp score averages the four assessed skill results.':'Only assessed work contributes to this partial result.'}</p>
   <div className="camp-cert-skill-grid">{report.skills.map(skill=><div key={skill.key}><div className="camp-cert-skill-ring" style={{'--skill-progress':`${skill.percent??0}%`} as CSSProperties}><b>{skill.percent===null?'n/a':Math.round(skill.percent)}</b></div><span>{skill.label} score</span><strong>{skill.level||'Unassessed'}</strong><small>{skill.detail}</small></div>)}</div>
   <p className="camp-cert-language">{report.language}</p>
   <footer><svg viewBox={`0 0 ${qr.size} ${qr.size}`} role="img" aria-label="QR code containing this printed result summary" shapeRendering="crispEdges"><rect width={qr.size} height={qr.size} fill="#fff"/><path d={qr.path} fill="#21182f"/></svg><div><strong>Scan your result summary</strong><p>Contains the printed name, date and skill results.</p><p>Record ID <span>{result.id}</span></p><small>{result.version}</small></div></footer>
  </section>
 </article><div className="camp-certificate-download"><Button onClick={onDownload} disabled={working}><LearningArt name="document" size={17}/>{working?'Preparing certificate…':'Download my named certificate (PDF)'}</Button><p>Generated on this device with your chosen palette.</p></div></section>;
}
