import { useId, type ReactNode } from 'react';
import type { EssentialTopicId, EssentialWord } from '@/data/essential-vocabulary';
import { EverydayWordScene } from './EverydayWordScene';
const ink='var(--camp-art-dark,#581c87)',accent='var(--camp-purple,#7e22ce)',light='var(--camp-art-light,#d8b4fe)',paper='#faf8fc',neutral='#e7e1ec';
/** Small, semantic vector drawings. Real colour swatches are lesson content, not theme accents. */
export function EssentialWordArt({topic,word}:{topic:EssentialTopicId;word:EssentialWord}){
 const uid=useId();const art=word.art;let scene:ReactNode;
 const shape=(d:string,fill=light)=><path d={d} fill={fill} stroke={ink} strokeWidth="2" strokeLinejoin="round"/>;
 const line=(d:string)=><path d={d} fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>;
 const cup=(tea=false)=><>{shape('M66 46H126V79Q126 93 111 93H81Q66 93 66 79Z',paper)}{line('M126 52H135Q151 63 135 76H126M58 97H137M79 31Q74 23 80 17M97 31Q92 23 98 17M114 31Q109 23 115 17')}{tea&&<>{line('M117 43V71H127')}{shape('M122 67H137V84H122Z')}</>}</>;
 const person=(x:number,y:number,label:string,selected=false)=><g><circle cx={x} cy={y} r="8" fill={selected?accent:paper} stroke={ink} strokeWidth="1.5"/>{shape(`M${x-13} ${y+28}V${y+16}Q${x} ${y+3} ${x+13} ${y+16}V${y+28}Z`,selected?light:neutral)}{label&&<text x={x} y={y+41} textAnchor="middle" fill={ink} fontSize="9">{label}</text>}</g>;
 if(['food','weather','transport','places','jobs','feelings','routines','numbers','weekdays','animals'].includes(topic))scene=<EverydayWordScene topic={topic} word={word}/>;
 else if(topic==='body'){
  const points:Record<string,[number,number]>={head:[104,25],hair:[102,13],eye:[99,23],ear:[119,24],nose:[105,28],mouth:[105,34],arm:[74,58],hand:[68,74],leg:[94,83],foot:[91,103]};
  const [x,y]=points[art];scene=<>{shape('M92 43Q80 45 76 53L65 74L73 79L86 59V76L87 99H98L103 78H106L112 99H123L123 76V59L137 79L145 74L131 50Q124 43 116 43Z',neutral)}<circle cx="104" cy="25" r="17" fill={paper} stroke={ink} strokeWidth="2"/>{line('M89 17Q103 1 118 17M99 24h1m10 0h1M104 27v4m-5 5q5 3 10 0')}<circle cx={x} cy={y} r={art==='eye'||art==='nose'||art==='mouth'?6:9} fill={accent} opacity=".85"/><path d={`M${x<104?43:165} ${y<28?20:y>90?96:y}H${x<104?x-12:x+12}`} stroke={accent} strokeWidth="2" fill="none"/></>;
 }else if(topic==='colors')scene=<><path d="M72 30l34-12 36 23-8 41-40 13-31-28Z" fill={word.value} stroke="#8c8295" strokeWidth="1.5"/><path d="M72 30l34-12-12 77-31-28Z" fill="#fff" opacity=".18"/><path d="M106 18l36 23-48 54Z" fill="#000" opacity=".08"/></>;
 else if(topic==='family'){
  const selected=(name:string)=>art===name||(art==='parents'&&['mother','father'].includes(name))||(art==='children'&&['son','daughter'].includes(name));
  const you=(x:number,y:number)=><g><rect x={x-17} y={y-9} width="34" height="20" rx="4" fill={paper} stroke={ink}/><text x={x} y={y+4} textAnchor="middle" fontSize="10" fill={ink}>You</text></g>;
  if(['son','daughter','children'].includes(art))scene=<>{you(104,20)}{line('M104 31V48M69 48H139M69 48V65M139 48V65')}{person(69,73,'Daughter',selected('daughter'))}{person(139,73,'Son',selected('son'))}</>;
  else if(['sister','brother'].includes(art))scene=<>{line('M50 31H157M50 31V53M104 31V65M157 31V53')}{person(50,61,'Sister',selected('sister'))}{you(104,76)}{person(157,61,'Brother',selected('brother'))}</>;
  else if(['grandmother','grandfather'].includes(art))scene=<>{person(65,13,'',selected('grandmother'))}{person(142,13,'',selected('grandfather'))}{line('M65 46H142M104 46V54M104 71V83')}<rect x="78" y="54" width="52" height="17" rx="3" fill={neutral}/><text x="104" y="66" textAnchor="middle" fontSize="9" fill={ink}>Parent</text>{you(104,94)}</>;
  else scene=<>{person(65,18,'Mother',selected('mother'))}{person(142,18,'Father',selected('father'))}{line('M65 66H142M104 66V83')}{you(104,94)}</>;
 }else if(topic==='months')scene=<>{shape('M64 26H144V100H64Z',paper)}{shape('M64 26H144V46H64Z',accent)}{line('M81 18V33M128 18V33')}<text x="104" y="82" textAnchor="middle" fontSize="28" fontWeight="700" fill={ink}>{word.value}</text></>;
 else if(topic==='time'){
  if(art==='clock'){const [h,m]=word.value!.split(':').map(Number),angleM=m*6*Math.PI/180,angleH=((h%12)*30+m*.5)*Math.PI/180;scene=<><circle cx="104" cy="57" r="40" fill={paper} stroke={ink} strokeWidth="2"/>{[0,1,2,3,4,5,6,7,8,9,10,11].map(n=><path key={n} d={`M${104+Math.sin(n*Math.PI/6)*34} ${57-Math.cos(n*Math.PI/6)*34}l${-Math.sin(n*Math.PI/6)*4} ${Math.cos(n*Math.PI/6)*4}`} stroke={ink} strokeWidth="2"/>)}<path d={`M${104+Math.sin(angleH)*21} ${57-Math.cos(angleH)*21}L104 57L${104+Math.sin(angleM)*30} ${57-Math.cos(angleM)*30}`} stroke={accent} strokeWidth="3" fill="none" strokeLinecap="round"/><circle cx="104" cy="57" r="3" fill={accent}/></>;
  }else if(art==='night'||art==='evening')scene=<>{shape('M116 18A36 36 0 1 0 145 78A33 33 0 0 1 116 18Z')}{shape('M146 27l3 7 8 1-6 5 2 8-7-4-7 4 1-8-5-5 8-1Z',accent)}{art==='evening'&&line('M49 91H160')}</>;
  else scene=<><circle cx="104" cy={art==='morning'?72:51} r="23" fill={light} stroke={ink} strokeWidth="2"/>{line('M104 10V20M63 27l7 7M145 27l-7 7M48 53H60M148 53H160M45 84H163')}{shape('M45 85H163V101H45Z',paper)}</>;
 }else{
  switch(art){
   case 'door':scene=<>{shape('M78 17H136V99H78Z',paper)}{shape('M78 17L118 28V99H78Z')}<circle cx="107" cy="64" r="3" fill={ink}/></>;break;
   case 'window':scene=<>{shape('M63 22H145V96H63Z',paper)}{shape('M70 29H138V89H70Z',light)}{line('M104 29V89M70 59H138M79 35l15 16M111 68l19 15')}</>;break;
   case 'table':case 'desk':scene=<>{shape('M47 44H160L172 59H39Z')}{line('M53 60V98M157 60V98')}{art==='desk'&&<>{shape('M65 24H113V45H65Z',paper)}{line('M89 45V51M80 51H98')}</>}</>;break;
   case 'chair':case 'seat':scene=<>{shape('M77 17H123V59H77Z')}{shape('M72 59H131V71H72Z',paper)}{line('M77 72V99M125 72V99')}</>;break;
   case 'bed':scene=<>{shape('M48 49H155V91H48Z')}{shape('M48 61H155V88H48Z',paper)}{shape('M56 52H81V65H56Z',paper)}{line('M45 36V99M158 61V99M84 63H150')}</>;break;
   case 'sofa':scene=<>{shape('M55 35Q55 27 66 27H140Q151 27 151 35V75H55Z')}{shape('M43 55H63V88H43Z',paper)}{shape('M144 55H164V88H144Z',paper)}{shape('M63 65H144V87H63Z')}{line('M54 88V99M153 88V99M104 65V87')}</>;break;
   case 'lamp':scene=<>{shape('M81 19H126L143 62H64Z')}{line('M104 63V97M83 98H126')}{shape('M83 94H126V99H83Z',paper)}</>;break;
   case 'fridge':scene=<>{shape('M72 16H137V100H72Z',paper)}{line('M73 48H136M83 29V39M83 61V77')}{shape('M74 18H135V24H74Z')}</>;break;
   case 'mirror':scene=<><ellipse cx="104" cy="57" rx="30" ry="43" fill={light} stroke={ink} strokeWidth="3"/>{line('M88 42l20-16M91 60l29-23')}</>;break;
   case 'key':scene=<><circle cx="77" cy="51" r="23" fill={light} stroke={ink} strokeWidth="2"/><circle cx="77" cy="51" r="9" fill={paper}/>{shape('M98 46H157V58H146V68H135V58H98Z')}</>;break;
   case 'coffee':case 'cup':case 'tea':scene=cup(art==='tea');break;
   case 'water':case 'milk':scene=<>{shape('M82 18H123L133 95H73Z',paper)}{shape('M78 60H127L130 92H76Z',art==='milk'?neutral:light)}{line('M85 24H119')}</>;break;
   case 'sugar':scene=<>{shape('M69 43l24-14 25 14-25 15Z',paper)}{shape('M69 43l24 15V85L69 71Z',neutral)}{shape('M93 58l25-15V71L93 85Z',paper)}{shape('M119 62l17-10 18 10-18 11Z',paper)}{shape('M119 62l17 11V92L119 82Z',neutral)}{shape('M136 73l18-11V82L136 92Z',paper)}</>;break;
   case 'sandwich':scene=<>{shape('M52 70L105 25L158 70Z',paper)}{shape('M52 70H158V80H52Z')}{shape('M52 80H158V90H52Z',paper)}{line('M76 74H90M107 74H124')}</>;break;
   case 'cake':scene=<>{shape('M63 58L109 28L145 58Z',paper)}{shape('M63 58H145V91H63Z')}{line('M63 75H145')}<circle cx="109" cy="31" r="6" fill={accent}/></>;break;
   case 'menu':case 'notebook':case 'passport':scene=<>{shape('M68 19H139V99H68Z',art==='passport'?accent:paper)}{shape('M68 19H76V99H68Z',light)}{art==='passport'?<g stroke={paper} fill="none"><circle cx="108" cy="53" r="16"/><ellipse cx="108" cy="53" rx="7" ry="16"/><path d="M92 53H124M92 78H124"/></g>:line('M88 37H123M88 50H123M88 64H123M88 79H114')}</>;break;
   case 'bill':case 'boarding pass':scene=<>{shape('M69 18H140V99L131 93L122 99L113 93L104 99L95 93L86 99L77 93L69 99Z',paper)}{line('M81 35H129M81 46H129M81 63H112M81 75H129M82 85V91M87 85V91M93 85V91M101 85V91M106 85V91M115 85V91')}</>;break;
   case 'computer':case 'screen':scene=<>{shape('M52 21H156V80H52Z',neutral)}{shape('M58 27H150V72H58Z',light)}{line('M104 81V96M82 97H126')}</>;break;
   case 'keyboard':scene=<>{shape('M43 40H165L175 85H33Z',paper)}{[0,1,2].map(y=><g key={y}>{[0,1,2,3,4,5,6,7,8].map(x=><rect key={x} x={48+x*12-y*3} y={49+y*10} width="8" height="6" fill={light}/>)}</g>)}{line('M80 80H127')}</>;break;
   case 'mouse':scene=<>{shape('M83 48Q83 29 104 29Q125 29 125 48V77Q125 97 104 97Q83 97 83 77Z',paper)}{line('M104 30V60M84 60H124M104 28V19Q104 10 125 10')}{shape('M101 40H107V51H101Z')}</>;break;
   case 'printer':scene=<>{shape('M65 38H142V86H65Z')}{shape('M79 17H128V48H79Z',paper)}{shape('M79 70H128V101H79Z',paper)}{line('M87 81H120M87 90H120')}<circle cx="133" cy="55" r="3" fill={ink}/></>;break;
   case 'pen':scene=<>{shape('M72 80L122 22L134 33L84 91L67 97Z')}{shape('M67 97L72 80L84 91Z',paper)}{line('M119 27L129 36M80 79L120 33')}</>;break;
   case 'phone':scene=<>{shape('M80 13H128V102H80Z',neutral)}{shape('M85 24H123V89H85Z',paper)}<circle cx="104" cy="96" r="2.5" fill={ink}/>{line('M98 18H110')}</>;break;
   case 'folder':scene=<>{shape('M52 31H90L103 43H157V91H52Z',paper)}{shape('M52 48H166L154 96H40Z')}</>;break;
   case 'plane':case 'departure':case 'arrival':scene=<g transform={art==='arrival'?'rotate(22 104 56)':art==='departure'?'rotate(-22 104 56)':undefined}>{shape('M102 17H110L119 48L163 67V76L116 67L113 88L126 97V103L106 97L86 103V97L99 88L96 67L49 76V67L93 48Z')}{line('M105 23V85')}</g>;break;
   case 'suitcase':scene=<>{shape('M70 34H139V94H70Z')}{shape('M88 21H121V34H88Z',paper)}{line('M83 39V88M126 39V88M82 96V102M128 96V102')}</>;break;
   case 'gate':scene=<>{shape('M71 19H138V42H71Z',accent)}<text x="104" y="35" textAnchor="middle" fill="white" fontSize="12">6</text>{line('M71 44V100M138 44V100M84 60H124M104 61V96')}{shape('M95 67l17 10-17 10Z')}</>;break;
   case 'check-in':scene=<>{shape('M48 61H161V96H48Z')}{person(88,29,'')}{shape('M128 43H154V61H128Z',paper)}{line('M141 45V57')}</>;break;
   case 'security':scene=<>{shape('M62 15H145V99H130V30H77V99H62Z',neutral)}{person(104,43,'')}{line('M51 100H158')}</>;break;
   case 'shirt':case 'T-shirt':case 'coat':scene=<>{shape(art==='coat'?'M83 21L104 30L125 21L153 61L140 73L126 56V101H82V56L68 73L55 61Z':'M83 22L104 31L125 22L152 49L133 64L124 54V96H84V54L75 64L56 49Z')}{line('M104 32V96')}{art!=='T-shirt'&&line('M83 22L95 44L104 31L114 44L125 22')}</>;break;
   case 'trousers':scene=<>{shape('M78 18H132L139 100H112L104 56L96 100H69Z')}{line('M78 32H132M104 20V53M82 36L78 49M126 36L130 49')}</>;break;
   case 'dress':case 'skirt':scene=<>{art==='dress'?shape('M84 17H94L104 27L114 17H124L117 52L145 99H63L91 52Z'):shape('M85 31H123L145 98H63Z')}{line(art==='dress'?'M91 52H117M84 80L79 93M124 80L129 93':'M85 40H123M91 49L82 91M117 49L126 91')}</>;break;
   case 'shoes':scene=<>{shape('M54 48H90L99 67L122 77V91H47V79Z')}{shape('M110 35H143L152 54L172 64V78H101V66Z',paper)}{line('M62 59H83M64 66H88M117 46H137M120 53H142M47 85H121M102 72H171')}</>;break;
   case 'socks':scene=<>{shape('M62 21H91V65L108 78Q113 89 102 95L59 77Z')}{shape('M115 21H144V65L161 78Q166 89 155 95L112 77Z',paper)}{line('M62 32H91M115 32H144')}</>;break;
   case 'hat':scene=<>{shape('M72 67Q69 22 104 22Q139 22 136 67Z')}{shape('M45 67Q104 85 163 67V79Q104 101 45 79Z',paper)}{line('M74 57H135')}</>;break;
   case 'scarf':scene=<>{shape('M75 25Q104 38 133 25V48Q104 61 75 48Z')}{shape('M88 48H107L98 101H74Z',paper)}{shape('M111 50H130L145 93H122Z')}{line('M75 91H98M122 83H141')}</>;break;
  }
 }
 return <svg className="camp-essential-art" viewBox="0 0 208 116" role="img" aria-labelledby={`${uid}-title`}><rect width="208" height="116" rx="10" fill="#faf8fc"/><title id={`${uid}-title`}>{topic==='family'?`${word.en}: highlighted relative in a family tree`:topic==='time'&&word.value?`${word.en}: clock shows ${word.value}`:topic==='months'?`${word.en}: month ${word.value}`:word.en}</title>{scene}</svg>;
}
