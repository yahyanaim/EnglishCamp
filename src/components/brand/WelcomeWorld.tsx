const learners = [
  { country: 'Morocco', x: 25, y: 64, skin: '#b66f50', hair: '#332329', top: '#7b3ca7', backdrop: '#f3e6ff', style: 'curls' },
  { country: 'Japan', x: 385, y: 19, skin: '#efba98', hair: '#302534', top: '#6479b2', backdrop: '#e9edff', style: 'bob' },
  { country: 'Nigeria', x: 427, y: 305, skin: '#754739', hair: '#221e2c', top: '#367b66', backdrop: '#e4f6ec', style: 'wrap' },
  { country: 'Brazil', x: 66, y: 334, skin: '#de9976', hair: '#543026', top: '#aa624b', backdrop: '#fff0e4', style: 'waves' },
];

export function WelcomeWorld() {
  return <svg className="camp-welcome-world" viewBox="0 0 560 468" fill="none" aria-hidden="true">
    <ellipse cx="280" cy="238" rx="211" ry="155" transform="rotate(-14 280 238)" stroke="var(--camp-art-main)" strokeOpacity=".18" strokeDasharray="4 9" strokeWidth="2"/>
    <circle cx="280" cy="234" r="129" fill="var(--camp-purple-soft)" stroke="var(--camp-art-light)" strokeOpacity=".48" strokeWidth="2"/>
    <path d="M280 112v244M160 234h240M175 179h210M175 289h210M280 112c-112 59-112 185 0 244M280 112c112 59 112 185 0 244" stroke="var(--camp-art-main)" strokeWidth="1.5" opacity=".13"/>
    <g fill="var(--camp-art-mid)">
      <path d="M225 65l4 12 12 4-12 4-4 12-4-12-12-4 12-4z"/>
      <path d="M388 414l4 11 11 4-11 4-4 11-4-11-11-4 11-4z"/>
      <path d="M506 199l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" opacity=".7"/>
      <circle cx="57" cy="270" r="5" opacity=".6"/>
      <circle cx="322" cy="55" r="4" opacity=".7"/>
    </g>
    {learners.map(({country,x,y,skin,hair,top,backdrop,style},index) => (
      <g key={country} transform={'translate('+x+' '+y+')'}>
        <g className={'camp-welcome-person camp-welcome-person-'+index}>
          <rect x="5" y="7" width="106" height="114" rx="20" fill="var(--camp-art-deep)" opacity=".10"/>
          <rect width="106" height="114" rx="19" fill={backdrop}/>
          {style==='bob'&&<path d="M30 63V43a23 23 0 0 1 46 0v24H30z" fill={hair}/>}
          {style==='waves'&&<path d="M27 49c-1-20 13-32 29-29 15 3 23 14 22 28l5 19c-7 7-18 8-31 5L25 65z" fill={hair}/>}
          {style==='curls'&&<path d="M31 46c-9-8-4-19 4-21-2-12 11-16 19-11 8-5 20 0 19 10 12 2 14 19 4 24z" fill={hair}/>}
          <path d="M20 84c4-14 15-21 29-21h8c14 0 25 7 29 21z" fill={top}/>
          <path d="M47 57h12v12c-2 6-10 6-12 0z" fill={skin}/>
          <ellipse cx="53" cy="47" rx="19" ry="21" fill={skin}/>
          {style==='wrap'?<path d="M31 42c0-15 8-24 20-25 16-2 26 9 24 24-7-7-14-9-23-9-9 0-14 4-21 10z" fill="#8454b0"/>:<path d="M34 42c-3-10 4-20 16-22 12-3 25 5 24 19-7 0-15-3-20-9-6 6-14 9-20 12z" fill={hair}/>}
          <circle cx="46" cy="47" r="1.7" fill="#2b2030"/>
          <circle cx="60" cy="47" r="1.7" fill="#2b2030"/>
          <path d="M49 55q4 4 8 0" stroke="#492b38" strokeWidth="1.5" strokeLinecap="round"/>
          <text x="53" y="101" textAnchor="middle" fill="#443653" fontSize="11" fontWeight="700">{country}</text>
        </g>
      </g>
    ))}
  </svg>;
}
