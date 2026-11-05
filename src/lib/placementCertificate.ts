import { certificateReport,certificateQR,cefrLevelName,CEFR_LEVELS,type CertificateResult } from './certificateReport';
import { accentPalette,validAccent } from './accentPalette';
/** A single-page PDF containing a locally rendered image. Browser canvas preserves Arabic shaping. */
export function certificatePDF(jpeg:Uint8Array,width=1684,height=1190,pageWidth=842,pageHeight=595):Uint8Array{
 const enc=new TextEncoder(),chunks:Uint8Array[]=[],offsets=[0];let length=0;
 const push=(part:string|Uint8Array)=>{const bytes=typeof part==='string'?enc.encode(part):part;chunks.push(bytes);length+=bytes.length;};
 push('%PDF-1.4\n');const object=(n:number,body:string|(()=>void))=>{offsets[n]=length;push(`${n} 0 obj\n`);typeof body==='string'?push(body):body();push('\nendobj\n');};
 object(1,'<< /Type /Catalog /Pages 2 0 R >>');object(2,'<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
 object(3,`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>`);
 object(4,()=>{push(`<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`);push(jpeg);push('\nendstream');});
 const commands=`q\n${pageWidth} 0 0 ${pageHeight} 0 0 cm\n/Im0 Do\nQ\n`;object(5,`<< /Length ${enc.encode(commands).length} >>\nstream\n${commands}endstream`);
 const xref=length;push('xref\n0 6\n0000000000 65535 f \n');for(let i=1;i<=5;i++)push(`${String(offsets[i]).padStart(10,'0')} 00000 n \n`);push(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`);
 const result=new Uint8Array(length);let cursor=0;for(const chunk of chunks){result.set(chunk,cursor);cursor+=chunk.length;}return result;
}
export async function createPlacementCertificate(name:string,result:CertificateResult):Promise<Blob>{
 if(!name.trim()||name.length>40||!Number.isFinite(Date.parse(result.completedAt)))throw new Error('A completed result and learner name are required.');
 const report=certificateReport(result),qr=certificateQR(name,result);await document.fonts.ready;
 const canvas=document.createElement('canvas');canvas.width=1684;canvas.height=2382;const ctx=canvas.getContext('2d');if(!ctx)throw new Error('Your browser could not prepare the certificate.');
 const styles=getComputedStyle(document.documentElement),display=styles.getPropertyValue('--font-display').trim()||'sans-serif',body=styles.getPropertyValue('--font-body').trim()||'sans-serif',arabic=styles.getPropertyValue('--font-arabic').trim()||'serif',selected=styles.getPropertyValue('--camp-purple').trim(),palette=accentPalette(validAccent(selected)?selected:'#7E22CE'),accent=palette['--camp-purple'],pale=palette['--camp-purple-soft'],ink='#292333',muted='#61596B';
 const isArabic=/[\u0600-\u06ff]/.test(name);await document.fonts.load(`700 76px ${isArabic?arabic:display}`,name);
 const logo=new Image();logo.src='/media/brand/englishcamp-mascot-256.png';try{await logo.decode();}catch{throw new Error('The EnglishCamp mascot could not load. Please retry the certificate download.');}
 ctx.fillStyle='#fff';ctx.fillRect(0,0,1684,2382);
 const text=(value:string,x:number,y:number,size:number,color=ink,weight=400,font=body,align:CanvasTextAlign='center')=>{ctx.direction='ltr';ctx.textAlign=align;ctx.font=`${weight} ${size}px ${font},sans-serif`;ctx.fillStyle=color;ctx.fillText(value,x,y);};
 const paragraph=(value:string,x:number,y:number,width:number,size=24,color=muted,lineHeight=35)=>{ctx.font=`400 ${size}px ${body},sans-serif`;let line='',at=y;for(const word of value.split(/\s+/)){const next=line?line+' '+word:word;if(ctx.measureText(next).width>width&&line){text(line,x,at,size,color,400,body,'left');line=word;at+=lineHeight;}else line=next;}if(line)text(line,x,at,size,color,400,body,'left');return at+lineHeight;};
 const round=(x:number,y:number,w:number,h:number,r:number,fill:string)=>{ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fillStyle=fill;ctx.fill();};
 ctx.drawImage(logo,682,54,60,60);text('EnglishCamp',762,97,38,ink,800,display,'left');
 text(report.aligned?'CEFR English test':'Personal learning record',842,155,27,ink,700);
 let nameSize=76;ctx.direction=isArabic?'rtl':'ltr';ctx.textAlign='center';do{ctx.font=`700 ${nameSize}px ${isArabic?arabic:display},sans-serif`;if(ctx.measureText(name).width<1420)break;nameSize-=2;}while(nameSize>28);ctx.fillStyle=ink;ctx.fillText(name,842,272);
 text(report.aligned?'has completed the EnglishCamp CEFR English test':'has completed the EnglishCamp study check',842,343,25,muted);text('and received the following study result.',842,381,25,muted);
 // Fine rotated-square line work echoes the supplied certificate's rosette.
 const cx=842,cy=727;
 ctx.save();ctx.translate(cx,cy);for(const angle of [0,Math.PI/8,Math.PI/4,Math.PI*3/8]){
  ctx.save();ctx.rotate(angle);const gradient=ctx.createRadialGradient(0,0,30,0,0,360);gradient.addColorStop(0,accent);gradient.addColorStop(1,pale);ctx.globalAlpha=.2;ctx.fillStyle=gradient;ctx.fillRect(-220,-220,440,440);ctx.globalAlpha=.28;ctx.strokeStyle=accent;ctx.lineWidth=1.1;for(let i=0;i<18;i++){const edge=220-i*7;ctx.strokeRect(-edge,-edge,edge*2,edge*2);}ctx.restore();
 }ctx.restore();
 ctx.fillStyle=accent;ctx.beginPath();ctx.arc(cx,cy,183,0,Math.PI*2);ctx.fill();
 text(report.scoreLabel,cx,cy-77,23,'#fff',500);text(report.score,cx,cy+7,report.score.length>6?77:92,'#fff',800,display);text(`${report.level} · ${cefrLevelName[report.level]}`,cx,cy+63,report.level==='Pre-A1'?24:28,'#fff',700);text(report.headline,cx,cy+108,21,'#fff',500);
 ctx.drawImage(logo,cx-355,cy+50,170,170);ctx.save();ctx.translate(cx+355,cy+50);ctx.scale(-1,1);ctx.drawImage(logo,0,0,170,170);ctx.restore();
 report.skills.forEach((skill,i)=>{const x=326+i*345;ctx.fillStyle=accent;ctx.beginPath();ctx.arc(x-67,1082,15,0,Math.PI*2);ctx.fill();text(skill.level?'✓':'·',x-67,1088,21,'#fff',600);text(skill.label,x-38,1089,25,ink,600,body,'left');text(skill.level?'Assessed':'Unassessed',x,1124,18,muted);});
 text('Completed on '+new Date(result.completedAt).toLocaleDateString(undefined,{day:'numeric',month:'long',year:'numeric'}),842,1211,24,ink,600);
 // The white award section curves into the tinted results section, as in the reference.
 ctx.beginPath();ctx.moveTo(0,1170);ctx.lineTo(495,1170);ctx.bezierCurveTo(540,1260,1144,1260,1189,1170);ctx.lineTo(1684,1170);ctx.lineTo(1684,2382);ctx.lineTo(0,2382);ctx.closePath();ctx.fillStyle=pale;ctx.fill();
 // Redraw the date above the curved boundary.
 text('Completed on '+new Date(result.completedAt).toLocaleDateString(undefined,{day:'numeric',month:'long',year:'numeric'}),842,1211,24,ink,600);
 text('Understanding your results',842,1350,39,ink,800,display);
 if(report.aligned){CEFR_LEVELS.forEach((level,i)=>{const x=102+i*248,active=report.level===level;round(x,1410,235,118,0,active?accent:'#fff');text(level,x+117.5,1457,34,active?'#fff':ink,800,display);text(cefrLevelName[level],x+117.5,1498,21,active?'#fff':muted);});}
 const scope=report.scope+' '+(report.complete?'The EnglishCamp score averages the four assessed skill results.':'Only assessed work contributes to this partial result.');
 paragraph(scope,146,1590,1392,23,ink,33);
 round(83,1694,1518,319,18,'#fff');
 report.skills.forEach((skill,i)=>{const x=275+i*378;ctx.strokeStyle='#e1dbe7';ctx.lineWidth=7;ctx.beginPath();ctx.arc(x,1785,49,0,Math.PI*2);ctx.stroke();if(skill.percent!==null&&skill.percent>0){ctx.strokeStyle=accent;ctx.beginPath();ctx.arc(x,1785,49,-Math.PI/2,-Math.PI/2+Math.PI*2*Math.min(100,skill.percent)/100);ctx.stroke();}text(skill.percent===null?'n/a':String(Math.round(skill.percent)),x,1797,33,accent,500);text(skill.label+' score',x,1880,25,ink,700);text(skill.level||'Unassessed',x,1922,skill.level?28:24,accent,700);text(skill.detail,x,1968,21,muted);});
 text(report.language,842,2060,23,ink);
 const moduleSize=Math.max(1,Math.floor(257/(qr.modules.size+8))),span=(qr.modules.size+8)*moduleSize,qx=175,qy=2110;ctx.fillStyle='#fff';ctx.fillRect(qx,qy,span,span);ctx.fillStyle='#21182f';for(let y=0;y<qr.modules.size;y++)for(let x=0;x<qr.modules.size;x++)if(qr.modules.data[y*qr.modules.size+x])ctx.fillRect(qx+(x+4)*moduleSize,qy+(y+4)*moduleSize,moduleSize,moduleSize);
 text('Scan your result summary',485,2163,29,ink,700,display,'left');paragraph('Contains the printed name, date and skill results.',485,2207,1030,23,ink,33);text(`Record ID: ${result.id}`,485,2274,20,muted,400,body,'left');text(result.version,485,2313,20,muted,400,body,'left');
 const jpeg=await new Promise<Blob>((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error('Certificate rendering failed.')),'image/jpeg',.98));return new Blob([certificatePDF(new Uint8Array(await jpeg.arrayBuffer()),1684,2382,595,842) as Uint8Array<ArrayBuffer>],{type:'application/pdf'});
}
