import type { EssentialTopicId, EssentialWord } from '@/data/essential-vocabulary';
const ink='var(--camp-art-dark,#581c87)',accent='var(--camp-purple)',light='var(--camp-art-light,#d8b4fe)',paper='#faf8fc';
/** Each scene depicts the word rather than reusing a decorative logo. */
export function EverydayWordScene({topic,word}:{topic:EssentialTopicId;word:EssentialWord}){
 const a=word.art;
 const path=(d:string,fill=light)=><path d={d} fill={fill} stroke={ink} strokeWidth="2" strokeLinejoin="round"/>;
 const line=(d:string)=><path d={d} fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>;
 const sun=<><circle cx="104" cy="53" r="23" fill={light} stroke={ink} strokeWidth="2"/>{line('M104 13V23M104 83V93M64 53H74M134 53H144M75 24L82 31M126 75L133 82M75 82L82 75M126 31L133 24')}</>;
 const cloud=path('M66 66Q47 66 49 50Q51 35 69 38Q77 12 104 23Q123 14 137 34Q159 32 160 51Q161 67 141 67Z',paper);
 const book=<>{path('M61 36L104 45L147 36V89L104 99L61 89Z',paper)}{line('M104 45V99M71 50L94 55M114 55L137 50M71 63L94 68M114 68L137 63')}</>;
 const face=(kind:string)=><><circle cx="104" cy="53" r="31" fill={light} stroke={ink} strokeWidth="2"/>{kind==='tired'||kind==='calm'?line('M86 48H96M113 48H123'): <><circle cx="91" cy="48" r="3" fill={ink}/><circle cx="117" cy="48" r="3" fill={ink}/></>}{kind==='happy'||kind==='excited'?line('M88 62Q104 80 120 62'):kind==='sad'||kind==='worried'||kind==='scared'?line('M91 71Q104 55 117 71'):kind==='angry'?line('M88 61H120M83 34L97 41M111 41L125 34'):line('M94 67H114')}{kind==='hungry'&&path('M147 72h20v24h-20Z',paper)}{kind==='thirsty'&&path('M151 62l-7 14q-2 10 7 10q9 0 7-10Z',accent)}{kind==='tired'&&<text x="144" y="28" fill={ink} fontSize="18">z</text>}</>;
 if(topic==='numbers')return <>{path('M66 16H142V101H66Z',paper)}<text x="104" y="76" textAnchor="middle" fontSize={word.value==='100'?32:43} fontWeight="700" fill={ink}>{word.value}</text></>;
 if(topic==='weekdays')return <>{path('M58 24H150V100H58Z',paper)}{path('M58 24H150V43H58Z',light)}{line('M77 16V33M131 16V33')}<text x="104" y="76" textAnchor="middle" fontSize="23" fontWeight="700" fill={ink}>{word.value}</text></>;
 if(topic==='feelings')return face(a);
 if(topic==='weather'){
  if(['sunny','summer','hot','warm'].includes(a))return <>{sun}{['hot','warm'].includes(a)&&<>{path('M154 29q0-8 9-8q9 0 9 8v44a15 15 0 1 1-18 0Z',paper)}{line('M163 39V85M159 85h8')}</>}</>;
  if(a==='windy')return <>{line('M44 39H127Q149 39 149 25Q149 11 137 15M58 57H151Q169 57 166 73Q162 90 146 80M48 76H109Q124 76 123 90Q122 102 112 99')}</>;
  if(a==='cold'||a==='winter'||a==='snowy')return <>{a==='snowy'?cloud:null}{line(a==='snowy'?'M82 79V103M71 85L93 97M71 97L93 85M137 79V103M126 85L148 97M126 97L148 85':'M104 15V99M68 36L140 78M68 78L140 36M93 22L104 33L115 22M93 92L104 81L115 92M65 49L80 43L79 28M129 86L128 71L144 65M65 65L80 71L79 86M129 28L128 43L144 49')}</>;
  if(a==='spring')return <>{line('M104 99V62M104 84L83 70M104 90L127 75')}<circle cx="104" cy="45" r="20" fill={light} stroke={ink} strokeWidth="2"/><circle cx="84" cy="45" r="12" fill={paper} stroke={ink}/><circle cx="124" cy="45" r="12" fill={paper} stroke={ink}/><circle cx="104" cy="25" r="12" fill={paper} stroke={ink}/><circle cx="104" cy="65" r="12" fill={paper} stroke={ink}/><circle cx="104" cy="45" r="9" fill={accent}/></>;
  if(a==='autumn')return <>{path('M104 94Q61 62 76 27Q111 28 136 14Q151 60 104 94Z')}{line('M101 101L123 34M111 67L91 48M115 55L133 47')}</>;
  return <>{cloud}{a==='rainy'&&line('M72 78L65 94M99 78L92 94M126 78L119 94M150 78L143 94')}</>;
 }
 if(topic==='food'){
  if(a==='banana')return <>{path('M58 28Q84 89 148 39Q133 99 86 92Q53 84 58 28Z')}{line('M61 30L54 20M147 38L153 31M70 60Q95 88 134 60')}</>;
  if(a==='carrot')return <>{path('M88 35L131 47L87 100Z')}{line('M107 41L102 14M107 38L122 17M107 38L87 19M97 54L111 58M92 72L101 75')}</>;
  if(a==='bread')return <>{path('M52 59Q42 35 68 32Q76 16 101 28Q126 14 140 33Q166 37 156 60V93H52Z',paper)}{line('M65 57H144M76 36L70 48M104 32L96 48M131 35L122 48')}</>;
  if(a==='rice')return <>{path('M52 56H157Q153 99 104 99Q58 99 52 56Z')}{[65,83,102,120,138].map((x,i)=><g key={x}>{path(`M${x} 46q7-14 11 0q-5 6-11 0Z`,paper)}{path(`M${x+3} ${35-i%2*8}q7-14 11 0q-5 6-11 0Z`,paper)}</g>)}</>;
  if(a==='egg')return <>{path('M104 17Q63 48 78 83Q88 107 116 94Q145 80 129 49Q117 26 104 17Z',paper)}</>;
  if(a==='cheese')return <>{path('M56 63L133 25L155 64V95H56Z')}{line('M56 63H155')}<circle cx="80" cy="79" r="5" fill={paper}/><circle cx="127" cy="80" r="8" fill={paper}/><circle cx="121" cy="50" r="4" fill={paper}/></>;
  if(a==='fish')return <>{path('M65 58Q103 19 146 57Q104 96 65 58L45 37V79Z')}<circle cx="130" cy="53" r="3" fill={ink}/>{line('M111 35Q96 57 111 79')}</>;
  if(a==='bottle')return <>{path('M91 16H117V39L128 52V99H80V52L91 39Z',paper)}{path('M80 64H128V89H80Z')}{line('M91 23H117M85 58H123')}</>;
  if(a==='potato')return <>{path('M69 30Q93 10 130 27Q161 50 139 81Q118 108 77 91Q46 71 69 30Z')}{line('M79 43h2M111 35h2M130 57h2M96 76h2M75 66h2')}</>;
  return <><circle cx="104" cy="61" r="35" fill={light} stroke={ink} strokeWidth="2"/>{a==='apple'?line('M104 26V15M104 22Q118 8 130 16'):a==='tomato'?path('M104 29L91 17L102 20L111 12L115 24L130 26L116 32Z',accent):line('M104 26Q112 12 125 17')}{a==='orange'&&line('M79 52h1M94 75h1M123 58h1')}</>;
 }
 if(topic==='transport'){
  if(a==='bicycle'||a==='motorbike')return <><circle cx="65" cy="78" r="22" fill={paper} stroke={ink} strokeWidth="2"/><circle cx="146" cy="78" r="22" fill={paper} stroke={ink} strokeWidth="2"/>{line('M65 78L91 39L116 78H65L84 51H133L146 78M126 31H140M133 31V52M82 39H102')}{a==='motorbike'&&path('M88 43H126V60H88Z')}</>;
  if(a==='boat')return <>{path('M48 73H159L139 97H68Z')}{path('M103 17V69H62Z',paper)}{path('M110 29L146 68H110Z')}{line('M47 103Q59 94 72 103Q85 94 98 103Q111 94 124 103Q137 94 153 103')}</>;
  if(a==='ticket')return <>{path('M51 29H156V49Q139 57 156 65V88H51V65Q68 57 51 49Z',paper)}{line('M126 33V45M126 51V64M126 70V83M70 44H107M70 58H107M70 72H97')}</>;
  if(a==='traffic lights')return <>{path('M86 12H123V88H86Z',paper)}{[28,50,72].map((y,i)=><circle key={y} cx="104" cy={y} r="8" fill={i===0?accent:light} stroke={ink}/>)}{line('M104 88V106M89 106H119')}</>;
  if(a==='station')return <>{path('M49 40L104 16L159 40V98H49Z',paper)}{path('M76 54H133V98H76Z')}<circle cx="104" cy="37" r="10" fill={paper} stroke={ink}/>{line('M104 30V37L110 41M88 69H122M89 80H121')}</>;
  return <>{path(a==='car'||a==='taxi'?'M45 59L64 36H136L157 59V88H45Z':'M59 21H148V88H59Z',paper)}{path(a==='car'||a==='taxi'?'M67 43H133L146 59H56Z':'M68 30H138V57H68Z')}<circle cx="73" cy="91" r="10" fill={ink}/><circle cx="134" cy="91" r="10" fill={ink}/>{line('M65 75H81M126 75H142')}{a==='taxi'&&<text x="104" y="29" textAnchor="middle" fontSize="12" fill={ink}>TAXI</text>}{a==='train'&&line('M51 105H157M77 102L67 111M132 102L142 111')}</>;
 }
 if(topic==='places')return <>{a==='park'?<>{line('M74 93V58M137 93V53M44 101H164')}{path('M74 17L45 62H104Z')}{path('M137 12L108 57H166Z')}{line('M96 86H125M98 94H123')}</>:<>{path('M53 41L104 15L156 41V101H53Z',paper)}{path('M89 70H120V101H89Z')}{a==='hospital'||a==='pharmacy'?<>{path('M99 29H109V38H118V48H109V57H99V48H90V38H99Z',accent)}</>:a==='library'||a==='school'?<g transform="translate(38 -9) scale(.63)">{book}</g>:a==='bank'?<text x="104" y="59" textAnchor="middle" fill={ink} fontSize="27">£</text>:a==='post office'?<>{path('M76 42H133V67H76Z')}{line('M76 42L104 58L133 42')}</>:a==='cinema'?<>{path('M75 38H133V65H75Z')}{path('M98 43L98 60L114 51Z',paper)}</>:a==='bakery'?<>{path('M73 43Q69 29 84 32Q104 20 122 32Q140 30 136 46V62H73Z')}{line('M84 36L81 45M105 32L100 45M125 36L120 45')}</>:<>{path('M64 40H145V57H64Z')}{line('M64 48H145M75 40V57M93 40V57M112 40V57M132 40V57')}</>}</>}</>;
 if(topic==='jobs')return <><circle cx="104" cy="34" r="18" fill={paper} stroke={ink} strokeWidth="2"/>{path('M69 101V75Q72 54 104 54Q136 54 139 75V101Z')}{line('M104 55V96')}{['doctor','nurse'].includes(a)?<>{line('M87 57V74Q104 89 121 74V57')}<circle cx="104" cy="83" r="4" fill={paper} stroke={ink}/></>:a==='chef'?path('M86 22Q73 8 89 6Q102-6 115 6Q135 5 123 23Z',paper):a==='driver'?<><circle cx="104" cy="83" r="18" fill={paper} stroke={ink}/>{line('M89 76H119M104 83V99')}</>:a==='artist'?<>{path('M143 47L153 22L159 26L149 52Z')}{path('M142 50L148 54L142 61Z',accent)}</>:a==='farmer'?<>{path('M85 18H123L133 28H75Z',paper)}{line('M151 46V99M139 45V61H162V45')}</>:a==='police officer'?<>{path('M84 20L104 10L124 20V25H84Z',paper)}{path('M117 65L123 61L130 65L128 74L123 78L118 74Z',paper)}</>:a==='engineer'?<>{path('M84 25Q84 8 104 8Q124 8 124 25Z',paper)}{line('M79 27H130M104 10V24M148 65L157 58M148 65L143 78L150 84L163 79')}</>:<g transform="translate(39 17) scale(.62)">{book}</g>}</>;
 if(topic==='routines'){
  if(a==='read'||a==='study')return book;
  if(a==='write'||a==='work')return <>{path('M63 24H138V99H63Z',paper)}{line('M75 42H123M75 57H115M75 73H105')}{path('M109 76L153 26L162 35L118 85L104 90Z')}</>;
  if(a==='sleep'||a==='wake up')return <>{path('M51 57H159V91H51Z')}{path('M54 47H78V64H54Z',paper)}{line('M48 36V101M161 57V101')}{a==='sleep'?<text x="110" y="35" fill={ink} fontSize="20">z z</text>:<><circle cx="127" cy="29" r="18" fill={paper} stroke={ink}/>{line('M127 17V29L138 36')}</>}</>;
  if(a==='cook')return <>{path('M69 46H142V85Q104 105 69 85Z')}{line('M58 47H152M64 40H147M86 28Q78 20 86 12M105 28Q97 20 105 12M124 28Q116 20 124 12')}</>;
  if(a==='wash')return <>{path('M47 74H158Q154 103 104 103Q53 103 47 74Z',paper)}{line('M74 74V35H126V44H113M92 35V23H113M119 52V58M129 55V62')}{path('M81 81L97 67L129 81Z')}</>;
  if(a==='drink')return <>{path('M77 35H130V88Q104 103 77 88Z',paper)}{line('M130 43H141Q156 59 141 75H130M89 48H119')}</>;
  return <><circle cx="104" cy="63" r="30" fill={paper} stroke={ink}/><circle cx="104" cy="63" r="21" fill={light} stroke={ink}/>{line('M57 27V97M49 27V46H65V27M151 27V97M151 27Q167 41 151 55')}</>;
 }
 if(topic==='animals'){
  if(a==='fish')return <>{path('M65 58Q103 19 146 57Q104 96 65 58L45 37V79Z')}<circle cx="130" cy="53" r="3" fill={ink}/></>;
  if(a==='butterfly')return <>{path('M100 53Q62 9 57 44Q53 66 91 68Q57 67 67 90Q84 113 102 70Z')}{path('M109 53Q147 9 152 44Q156 66 118 68Q152 67 142 90Q125 113 107 70Z',paper)}{line('M104 43V90M104 43L94 30M104 43L114 30')}</>;
  if(a==='bird'||a==='duck')return <>{path('M67 59Q59 32 82 37Q104 16 120 42Q134 62 151 62Q140 100 94 91Q64 88 67 59Z')}{path('M74 43L52 50L73 55Z',paper)}<circle cx="84" cy="44" r="3" fill={ink}/>{line('M100 91V103M120 88V103M102 54Q90 77 128 79')}</>;
  if(['horse','cow','sheep'].includes(a))return <>{path('M63 48H128L142 33L155 41V64H139V93H128V68H84V93H72V66H63Z')}{line('M63 48L50 38M146 36L144 23M144 24L153 28')}{a==='sheep'&&<>{[76,94,111].map(x=><circle key={x} cx={x} cy="47" r="14" fill={paper} stroke={ink}/>)}</>}{a==='cow'&&path('M88 49L102 56L91 66L82 56Z',accent)}<circle cx="148" cy="44" r="2" fill={ink}/></>;
  return <>{path('M70 48L72 24L89 37Q104 31 120 37L138 24L137 49Q152 92 104 99Q56 93 70 48Z',a==='rabbit'?paper:light)}{a==='rabbit'&&<>{path('M80 39Q60-4 77 5Q95 13 94 36Z',paper)}{path('M113 36Q116-4 132 5Q146 21 126 41Z',paper)}</>}<circle cx="88" cy="59" r="3" fill={ink}/><circle cx="120" cy="59" r="3" fill={ink}/>{path('M98 73H110L104 79Z',accent)}{line('M104 79V87M78 74L56 70M79 82L57 85M129 74L151 70M128 82L150 85')}</>;
 }
 return null;
}
