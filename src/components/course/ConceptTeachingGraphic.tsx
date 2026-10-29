import type { ConceptVisual, DiagramNode } from "@/data/teaching-diagrams/types";

const ink="var(--color-text-primary)", muted="var(--color-text-secondary)", accent="var(--color-text-link)", tint="var(--color-primary-subtle)", border="var(--color-border-strong)";
type Of<K extends ConceptVisual["layout"]> = Extract<ConceptVisual,{layout:K}>;

export function wrapDiagramText(text: string, max: number): string[] {
  const lines: string[]=[];
  for(const paragraph of text.split("\n")) {
    let line="";
    for(const word of paragraph.split(/\s+/)) {
      if(line && line.length+word.length+1>max){lines.push(line);line=word;}
      else line=line?`${line} ${word}`:word;
    }
    if(line)lines.push(line);
  }
  return lines;
}

function Words({text,x,y,max=26,size=18,fill=ink,bold=false,anchor="middle"}:{text:string;x:number;y:number;max?:number;size?:number;fill?:string;bold?:boolean;anchor?:"middle"|"start"|"end"}){
  return <text x={x} y={y} textAnchor={anchor} fill={fill} fontSize={size} fontWeight={bold?800:400} style={bold?{fontFamily:"var(--font-display), sans-serif"}:undefined}>
    {wrapDiagramText(text,max).map((part,i)=><tspan key={i} x={x} dy={i?size+9:0}>{part}</tspan>)}
  </text>;
}
function Node({node,x,y,compact,max=24}:{node:DiagramNode;x:number;y:number;compact:boolean;max?:number}){
  const size=compact?18:20;
  return <g>
    <Words text={node.label} x={x} y={y} max={max} size={size} fill={accent} bold />
    <Words text={node.detail} x={x} y={y+wrapDiagramText(node.label,max).length*(size+9)+14} max={max} size={compact?17:18} />
  </g>;
}
function Edge({d,id,dashed=false}:{d:string;id:string;dashed?:boolean}){
  return <path d={d} fill="none" stroke={accent} strokeWidth="2" strokeDasharray={dashed?"5 5":undefined} markerEnd={dashed?undefined:`url(#${id})`} />;
}

function Comparison({v,c}:{v:Of<"contrast">;c:boolean}){
  return <>
    <path d={c?"M30 20H10V190H30M270 285H290V455H270":"M45 50H25V250H45M755 50H775V250H755"} fill="none" stroke={border} strokeWidth="2" />
    <Node node={v.left} x={c?150:200} y={c?60:100} compact={c} max={c?26:27} />
    <Node node={v.right} x={c?150:600} y={c?325:100} compact={c} max={c?26:27} />
    <text x={c?150:400} y={c?255:160} textAnchor="middle" fill={accent} fontSize="38" fontWeight="700">{v.symbol??"↔"}</text>
    <Words text={v.relationship} x={c?150:400} y={c?510:310} max={c?28:55} size={c?17:18} fill={muted} />
  </>;
}
function Flow({v,c,id}:{v:Of<"flow">;c:boolean;id:string}){
  const count=v.nodes.length;
  return <>
    {v.nodes.map((node,i)=>{
      const x=c?170:(i+.5)*800/count,y=c?50+i*210:140;
      return <g key={i}>
        <circle cx={c?20:x} cy={c?y:95} r="7" fill={accent} />
        {c&&<line x1="27" y1={y} x2="45" y2={y} stroke={border} strokeWidth="2" />}
        <Node node={node} x={x} y={y} compact={c} max={c?24:count===4?18:24} />
        {i<count-1&&<>
          <Edge d={c?`M20 ${y+18}V${y+180}`:`M${x+15} 95H${(i+1.5)*800/count-15}`} id={id} />
          <Words text={v.links[i]} x={c?170:(i+1)*800/count} y={c?y+157:25} max={c?27:count===4?16:22} size={16} fill={muted} />
        </>}
      </g>;
    })}
  </>;
}
function Argument({v,c,id}:{v:Of<"argument">;c:boolean;id:string}){
  if(c)return <>
    <Edge d="M25 115V210H50" id={id}/><Edge d="M25 310V405H50" id={id}/>
    <Edge d="M260 80H282V625H265" id={id}/>
    <Node node={v.claim} x={155} y={45} compact max={24}/>
    <Node node={v.reason} x={155} y={240} compact max={24}/>
    <Node node={v.example} x={155} y={435} compact max={24}/>
    <Node node={v.limit} x={155} y={630} compact max={24}/>
    <Words text="because" x={155} y={190} size={16} fill={muted}/>
    <Words text="illustrated by" x={155} y={385} size={16} fill={muted}/>
    <Words text="qualified by" x={170} y={580} size={16} fill={muted}/>
  </>;
  return <>
    <Edge d="M325 145Q230 160 200 210" id={id}/>
    <Edge d="M300 360H500" id={id}/>
    <Edge d="M650 75H770V465H660" id={id}/>
    <Node node={v.claim} x={400} y={40} compact={false} max={35}/>
    <Node node={v.reason} x={190} y={250} compact={false} max={26}/>
    <Node node={v.example} x={610} y={250} compact={false} max={26}/>
    <Node node={v.limit} x={400} y={500} compact={false} max={40}/>
    <Words text="because" x={150} y={185} size={16} fill={muted}/>
    <Words text="illustrated by" x={400} y={395} size={16} fill={muted}/>
    <Words text="qualified by" x={680} y={430} size={16} fill={muted}/>
  </>;
}
function Sentence({v,c,id}:{v:Of<"sentence">;c:boolean;id:string}){
  const count=v.parts.length;
  return <>
    {v.parts.map((part,i)=>{
      const x=c?140:(i+.5)*800/count,y=c?50+i*170:135;
      return <g key={i}>
        <Words text={part.detail} x={x} y={y} max={c?22:count===4?18:24} size={c?20:22} fill={i===v.from||i===v.to?accent:ink} bold={i===v.from||i===v.to}/>
        <Words text={part.label} x={x} y={y+wrapDiagramText(part.detail,c?22:count===4?18:24).length*(c?29:31)+25} max={c?23:count===4?20:26} size={c?17:18} fill={muted}/>
      </g>;
    })}
    <Edge d={c?`M255 ${50+v.from*170}H280V${50+v.to*170}H255`:`M${(v.from+.5)*800/count} 85Q${(v.from+v.to+1)*400/count} -20 ${(v.to+.5)*800/count} 85`} id={id}/>
    <Words text={v.relationship} x={c?150:400} y={c?count*170+30:320} max={c?28:60} size={c?17:18} fill={muted}/>
  </>;
}
function Evidence({v,c,id}:{v:Of<"evidence">;c:boolean;id:string}){
  return <>
    <Node node={v.source} x={c?150:400} y={35} compact={c} max={c?28:56}/>
    <path d={c?"M150 165H20V620":"M400 145V180H133M400 180H667"} fill="none" stroke={border} strokeWidth="2" />
    {v.outcomes.map((node,i)=><g key={i}>
      <Edge d={c?`M20 ${235+i*180}H45`:`M${(i+.5)*800/3} 180V220`} id={id}/>
      <Node node={node} x={c?170:(i+.5)*800/3} y={c?240+i*180:265} compact={c} max={c?24:24}/>
    </g>)}
  </>;
}
function Chart({v,c}:{v:Of<"chart">;c:boolean}){
  const limit=v.unit.includes("%")?100:Math.max(...v.bars.map(b=>b.value));
  const left=c?95:230,width=c?150:490,step=c?85:90;
  return <>
    <Words text={v.unit} x={c?150:400} y={30} max={c?30:60} size={c?17:18} fill={muted}/>
    {v.bars.map((bar,i)=>{const y=100+i*step,w=bar.value/limit*width;return <g key={bar.label}>
      <Words text={bar.label} x={left-15} y={y+4} max={c?10:22} size={c?16:18} anchor="end"/>
      <rect x={left} y={y-18} width={w} height="27" rx="4" fill={tint} stroke={accent} strokeWidth="1.5"/>
      <text x={left+w+10} y={y+3} fill={accent} fontSize={c?17:20} fontWeight="800">{bar.value}{v.unit.includes("%")?"%":""}</text>
    </g>;})}
    <path d={`M${left} 65V${105+(v.bars.length-1)*step+25}H${left+width}`} fill="none" stroke={border} strokeWidth="1.5"/>
    <text x={left} y={165+(v.bars.length-1)*step} fill={muted} fontSize="16" textAnchor="middle">0</text>
    <text x={left+width} y={165+(v.bars.length-1)*step} fill={muted} fontSize="16" textAnchor="middle">{limit}</text>
    <Words text={v.annotation} x={c?150:400} y={220+(v.bars.length-1)*step} max={c?29:65} size={c?17:20} bold/>
  </>;
}
function Cycle({v,c,id}:{v:Of<"cycle">;c:boolean;id:string}){
  const positions=c?[[75,40],[225,40],[225,450],[75,450]]:[[190,80],[610,80],[610,450],[190,450]];
  const paths=c?["M112 210H188","M285 220V410","M188 690H112","M15 410V220"]:["M330 220H470","M750 210Q780 320 660 410","M470 650H330","M80 410Q20 320 80 210"];
  return <>
    {paths.map(d=><Edge key={d} d={d} id={id}/>)}
    <circle cx={c?150:400} cy={c?320:320} r={c?53:68} fill={tint} stroke={accent} strokeWidth="2"/>
    <Words text={v.centre} x={c?150:400} y={c?312:315} max={c?13:16} size={c?18:22} bold/>
    {v.nodes.map((node,i)=><Node key={i} node={node} x={positions[i][0]} y={positions[i][1]} compact={c} max={c?13:27}/>)}
  </>;
}
function Decision({v,c,id}:{v:Of<"decision">;c:boolean;id:string}){
  return <>
    <rect x={c?10:220} y="15" width={c?280:360} height="115" rx="16" fill={tint} stroke={accent} strokeWidth="2"/>
    <Words text={v.question} x={c?150:400} y={55} max={c?24:32} size={c?19:22} bold/>
    <rect x={c?10:380} y={c?385:235} width={c?280:390} height="115" rx="16" fill={tint} stroke={accent} strokeWidth="2"/>
    <Words text={v.nextQuestion} x={c?150:575} y={c?425:278} max={c?24:34} size={c?19:22} bold/>
    <Edge d={c?"M70 130V170":"M280 130H130V200"} id={id}/>
    <Edge d={c?"M230 130V365H150V385":"M520 130H575V235"} id={id}/>
    <Edge d={c?"M80 500V550":"M480 350H420V430"} id={id}/>
    <Edge d={c?"M220 500V550":"M680 350V430"} id={id}/>
    <Words text="Yes" x={c?42:100} y={c?160:180} size={16} fill={accent}/>
    <Words text="No" x={c?255:607} y={c?260:190} size={16} fill={accent}/>
    <Words text="Yes" x={c?52:385} y={c?535:402} size={16} fill={accent}/>
    <Words text="No" x={c?250:715} y={c?535:402} size={16} fill={accent}/>
    <Node node={v.results[0]} x={c?92:130} y={c?215:245} compact={c} max={c?18:24}/>
    <Node node={v.results[1]} x={c?80:420} y={c?595:475} compact={c} max={c?14:24}/>
    <Node node={v.results[2]} x={c?220:680} y={c?595:475} compact={c} max={c?14:22}/>
  </>;
}
function Orientation({v,c,id}:{v:Of<"map">;c:boolean;id:string}){
  const cx=c?150:400;
  return <>
    <rect x={c?30:200} y="70" width={c?240:400} height="290" rx="10" fill={tint} stroke={border}/>
    <path d={c?"M30 170H270M30 270H270M110 70V360M190 70V360":"M200 165H600M200 260H600M335 70V360M465 70V360"} stroke={border} strokeDasharray="3 6" fill="none"/>
    <text x={cx} y="40" textAnchor="middle" fill={ink} fontSize="22" fontWeight="800">N</text>
    <text x={cx} y="395" textAnchor="middle" fill={ink} fontSize="22" fontWeight="800">S</text>
    <text x={c?287:640} y="225" textAnchor="middle" fill={ink} fontSize="22" fontWeight="800">E</text>
    <text x={c?13:160} y="225" textAnchor="middle" fill={ink} fontSize="22" fontWeight="800">W</text>
    <circle cx={cx} cy="140" r="9" fill={accent}/>
    <Words text={`Facing ${v.facing}`} x={cx} y={105} max={24} size={c?17:20} bold/>
    <Edge d={c?"M150 155V240Q150 285 195 285H245":"M400 155V245Q400 300 455 300H565"} id={id}/>
    <Words text={`${v.turn} → ${v.destination}`} x={c?185:520} y={340} max={20} size={c?18:22} fill={accent} bold/>
    <Words text="Fixed compass; changing viewpoint" x={c?150:400} y={445} max={c?28:50} size={c?17:18} fill={muted}/>
  </>;
}
function Sound({v,c}:{v:Of<"sound">;c:boolean}){
  let x=25,row=0;
  const width=c?250:740;
  const positions=v.tokens.map((token,i)=>{const focus=v.prominent.includes(i),w=token.length*(focus?(c?19:23):(c?13:16))+24;if(x+w>width+25){row++;x=25;}const item={x,y:100+row*100,w,token,focus};x+=w;return item;});
  return <>
    <Words text="Prominence marks the contrast" x={c?150:400} y={30} max={c?28:50} size={17} fill={muted}/>
    {positions.map((p,i)=><g key={i}>
      {p.focus&&<rect x={p.x-6} y={p.y-34} width={p.w-7} height="49" rx="8" fill={tint}/>}
      <text x={p.x} y={p.y} fill={p.focus?accent:ink} fontSize={p.focus?(c?24:30):(c?20:24)} fontWeight={p.focus?800:400}>{p.token}</text>
      {p.focus&&<line x1={p.x} y1={p.y+19} x2={p.x+p.w-18} y2={p.y+19} stroke={accent} strokeWidth="3"/>}
    </g>)}
    <Words text={v.meaning} x={c?150:400} y={200+row*100} max={c?28:65} size={c?17:20}/>
    <Words text="Focus marks are illustrative, not a measured audio trace." x={c?150:400} y={330+row*100} max={c?28:65} size={c?16:17} fill={muted}/>
  </>;
}
function Causal({v,c,id}:{v:Of<"causal">;c:boolean;id:string}){
  return <>
    <Node node={v.factor} x={c?150:400} y={35} compact={c} max={c?27:35}/>
    <Edge d={c?"M120 165Q75 185 75 225":"M330 160Q220 180 200 245"} id={id}/>
    <Edge d={c?"M180 165Q225 185 225 225":"M470 160Q580 180 600 245"} id={id}/>
    <Words text="may affect" x={c?70:150} y={205} max={12} size={16} fill={muted}/>
    <Words text="may affect" x={c?230:650} y={205} max={12} size={16} fill={muted}/>
    <Node node={v.first} x={c?75:200} y={c?270:300} compact={c} max={c?14:27}/>
    <Node node={v.second} x={c?225:600} y={c?270:300} compact={c} max={c?14:27}/>
    <path d={c?"M75 430H225":"M325 345H475"} stroke={accent} strokeWidth="2" strokeDasharray="5 5"/>
    <Words text="association ≠ proof of cause" x={c?150:400} y={c?485:505} max={c?28:60} size={c?17:20} bold/>
    <Words text="A possible alternative path, not an established finding." x={c?150:400} y={c?565:560} max={c?28:65} size={c?16:17} fill={muted}/>
  </>;
}

function dimensions(v:ConceptVisual,c:boolean):[number,number]{
  const heights:Record<ConceptVisual["layout"],number>={contrast:c?600:400,flow:c?((v.layout==="flow"?v.nodes.length:3)*210+15):340,argument:c?835:660,sentence:c?((v.layout==="sentence"?v.parts.length:3)*170+150):420,evidence:c?810:460,chart:c?((v.layout==="chart"?v.bars.length:2)-1)*85+370:((v.layout==="chart"?v.bars.length:2)-1)*90+330,cycle:c?730:680,decision:c?850:680,map:490,sound:c?850:600,causal:c?660:650};
  return [c?300:800,heights[v.layout]];
}
function describe(v:ConceptVisual):string{
  const node=(n:DiagramNode)=>`${n.label}: ${n.detail}.`;
  switch(v.layout){
    case "contrast":return `${node(v.left)} ${v.relationship}. ${node(v.right)}`;
    case "flow":return v.nodes.map((n,i)=>`${node(n)} ${v.links[i]??""}`).join(" ");
    case "argument":return [v.claim,v.reason,v.example,v.limit].map(node).join(" ");
    case "sentence":return `${v.parts.map(node).join(" ")} ${v.relationship}.`;
    case "evidence":return `${node(v.source)} ${v.outcomes.map(node).join(" ")}`;
    case "chart":return `${v.unit}. ${v.bars.map(b=>`${b.label}: ${b.value}`).join("; ")}. ${v.annotation}`;
    case "cycle":return `${v.centre}: ${v.nodes.map(node).join(" ")} Fresh evidence updates the cycle.`;
    case "decision":return `${v.question} Yes: ${node(v.results[0])} No: ${v.nextQuestion} Yes: ${node(v.results[1])} No: ${node(v.results[2])}`;
    case "map":return `North stays at the top. A traveller facing ${v.facing} turns ${v.turn} towards ${v.destination}.`;
    case "sound":return `${v.tokens.join(" ")} Prominent: ${v.prominent.map(i=>v.tokens[i]).join(", ")}. ${v.meaning}`;
    case "causal":return `${node(v.factor)} This may affect both ${node(v.first)} and ${node(v.second)} The association alone does not establish cause; the alternative path is hypothetical.`;
  }
}
export function ConceptTeachingGraphic({visual:v,compact:c}:{visual:ConceptVisual;compact:boolean}){
  const [w,h]=dimensions(v,c),id=`concept-${v.layout}-${c?"narrow":"wide"}`,arrow=`${id}-arrow`;
  return <svg className={c?"md:hidden w-full max-w-sm mx-auto":"hidden md:block w-full max-w-4xl mx-auto"} viewBox={`0 0 ${w} ${h}`} role="img" aria-labelledby={`${id}-title ${id}-desc`} style={{fontFamily:"var(--font-body), sans-serif"}}>
    <title id={`${id}-title`}>{v.layout === "chart"?"Numerical comparison":v.layout === "sentence"?"Sentence relationships":`${v.layout[0].toUpperCase()}${v.layout.slice(1)} illustration`}</title>
    <desc id={`${id}-desc`}>{describe(v)}</desc>
    <defs><marker id={arrow} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill={accent}/></marker></defs>
    {v.layout==="contrast"?<Comparison v={v} c={c}/>:v.layout==="flow"?<Flow v={v} c={c} id={arrow}/>:v.layout==="argument"?<Argument v={v} c={c} id={arrow}/>:v.layout==="sentence"?<Sentence v={v} c={c} id={arrow}/>:v.layout==="evidence"?<Evidence v={v} c={c} id={arrow}/>:v.layout==="chart"?<Chart v={v} c={c}/>:v.layout==="cycle"?<Cycle v={v} c={c} id={arrow}/>:v.layout==="decision"?<Decision v={v} c={c} id={arrow}/>:v.layout==="map"?<Orientation v={v} c={c} id={arrow}/>:v.layout==="sound"?<Sound v={v} c={c}/>:<Causal v={v} c={c} id={arrow}/>}
  </svg>;
}
