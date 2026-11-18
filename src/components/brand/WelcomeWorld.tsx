"use client";

import Image from 'next/image';
import { Pause, Play } from 'lucide-react';
import { useState, type ReactNode } from 'react';

function Learner({ name, pose, placement, children }: {
  name: string;
  pose: string;
  placement: string;
  children: ReactNode;
}) {
  return (
    <g transform={placement}>
      <g className={`camp-world-motion camp-world-${pose}`}>
        <title>{name}</title>
        {children}
      </g>
    </g>
  );
}

function FlyingLearners() {
  return (
    <svg className="camp-welcome-world" viewBox="0 0 560 468" fill="none" aria-hidden="true">
      <path d="M61 225C110 157 215 129 285 152c85 28 162 101 210 83M131 365c44 23 132 27 194-7"
        stroke="var(--camp-art-main)" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 10" opacity=".18"/>

      <Learner name="Learner from Morocco" pose="wave" placement="translate(115 129) rotate(-22)">
        <path d="M-17 46q-15 16-35 16m69-15q14 15 9 35" stroke="#343d76" strokeWidth="18" strokeLinecap="round"/>
        <path d="m-58 54-10 6c-7 4-6 14 2 15l22-4c4-1 6-5 4-9l-3-6zM20 78l-4 11c-1 7 4 11 10 8l13-11c5-5 3-10-2-13z" fill="#5a49a4"/>
        <path d="M-20 6q-14 9-22-1l-10-18m73 26q17-1 33-24" stroke="#9b6ce5" strokeWidth="16" strokeLinecap="round"/>
        <path d="M-51-13q-10-10-8-17c1-4 5-3 7 1l3 5 2-8c1-4 6-3 6 1l-2 12c0 6-4 8-8 6zm106 1c-3-3-2-9 1-12l6-5c4-3 8 1 5 4l-5 4 7-1c4 0 5 6 0 7l-8 4c-3 2-6 2-6-1z" fill="#aa644e"/>
        <path d="M-24 2q9-11 27-9c15 1 25 11 25 25l-1 24C15 57-15 56-27 41l-1-22c0-7 1-12 4-17z" fill="#a672ed"/>
        <path d="M-27 35q22 11 54 2l-1 10q-24 13-53-3z" fill="#8b50d4"/>
        <path d="M-6-14H9V3C6 11-4 11-6 4z" fill="#aa644e"/>
        <path d="M-31-24c-8-6-9-16-4-20-2-9 5-18 14-19 4-8 13-10 20-7 9-5 20-1 24 5 9 1 16 8 15 18 6 8 1 19-7 23z" fill="#403047"/>
        <path d="M-27-45c4-13 16-20 31-18 16 2 26 13 26 27 0 21-13 35-29 35S-28-14-28-31z" fill="#bc785e"/>
        <path d="M-30-31c-3-18 5-32 18-34 11-7 35-1 41 11l3 12c-7-8-10-11-16-13-9 11-22 17-44 17z" fill="#403047"/>
        <path d="M-14-30q4-5 9 0m13-2q5-5 9 0" stroke="#3b2638" strokeWidth="2.8" strokeLinecap="round"/>
        <path d="M-5-19q9 3 17-2c-1 15-16 17-17 2z" fill="#783a52"/>
        <path d="M-4-18q7 1 14-2l-2 5q-7 2-11-1z" fill="#fff7f1"/>
        <path d="M-25-2q14 8 29 5l9-4M-20 9l5 11m30-13-4 12" stroke="#e4c8ff" strokeWidth="2" strokeLinecap="round"/>
        <path d="M-11 30q11 7 23 1l-2 7q-10 4-19 0z" fill="#c69af4"/>
        <path d="m-62 69 14-4m67 25 13-10" stroke="#d9c9fb" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M-22-48q5-10 15-12m4 1q6-3 12-2" stroke="#715365" strokeWidth="2.5" strokeLinecap="round"/>
        <ellipse cx="-18" cy="-22" rx="4" ry="2.5" fill="#e79885"/>
      </Learner>

      <Learner name="Learner from Japan" pose="glide" placement="translate(408 94) rotate(29) scale(.92)">
        <path d="M-13 39-31 59l-22-8m66-9 14 18-2 22" stroke="#3d5c90" strokeWidth="17" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="m-53 40-13 2c-7 1-9 9-4 13l19 7c4 1 9-3 8-7l-2-9zm69 39c-4 3-7 8-4 12 3 6 15 5 24 4 6 0 9-7 3-11l-10-7z" fill="#f0ae71"/>
        <path d="M-24 7q-15 1-28-13m75 14q13-3 25-21" stroke="#46bfc3" strokeWidth="17" strokeLinecap="round"/>
        <path d="M-54-10c-3-5-2-8-6-11-4-3-6 0-5 4 1 7 5 13 11 15 5 2 8-3 4-7zm101-5c3-4 4-10 8-10 4 0 5 5 3 9-2 5-6 9-11 8-4-1-3-4 0-7z" fill="#efb594"/>
        <path d="M-24 7Q-10-7 9-5c12 0 20 8 20 21l-3 28q-22 11-52 0l-3-25q-1-7 5-12z" fill="#5dd0cc"/>
        <path d="m-26 35 52 1-1 9q-25 12-50-1z" fill="#3db8b7"/>
        <path d="M-8-14H7V4q-8 9-15 0z" fill="#eba786"/>
        <path d="M-34-17v-24c1-22 13-34 33-34 18 0 32 13 33 32v24q-6 13-18 13h-28q-13-1-20-11z" fill="#242c49"/>
        <path d="M-26-43c2-13 11-20 26-20 17 0 27 9 27 26 0 20-12 33-26 33s-26-12-27-29z" fill="#f3bf9f"/>
        <path d="M-29-37c-4-21 9-35 27-35 16 0 29 9 32 23l-1 11c-10-2-17-8-22-15-6 6-15 9-35 9z" fill="#242c49"/>
        <path d="m10-58 11-6" stroke="#ffc563" strokeWidth="3.6" strokeLinecap="round"/>
        <ellipse cx="-10" cy="-34" rx="2.3" ry="3.1" fill="#30304a"/>
        <ellipse cx="12" cy="-34" rx="2.3" ry="3.1" fill="#30304a"/>
        <path d="M-5-22q7 6 13-1" stroke="#9b5163" strokeWidth="2.7" strokeLinecap="round"/>
        <circle cx="-16" cy="-24" r="3.2" fill="#ef957f" opacity=".75"/>
        <circle cx="18" cy="-24" r="3.2" fill="#ef957f" opacity=".75"/>
        <path d="M-18 8q17 7 34 1m-28 24h21" stroke="#a1ede8" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="m7 14 11-2 1 9-10 3z" fill="#f6d68e"/>
        <path d="m-65 48 11 5m71 34 14 1" stroke="#fff0d2" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M-22-53q5-9 14-13m4 0q10-4 18 0" stroke="#49557b" strokeWidth="2.2" strokeLinecap="round"/>
        <circle cx="-9.5" cy="-35" r=".8" fill="#fff"/>
        <circle cx="12.5" cy="-35" r=".8" fill="#fff"/>
      </Learner>

      <Learner name="Learner from Brazil" pose="kick" placement="translate(121 316) rotate(-34) scale(1.03)">
        <path d="m-9 44-9 16 17 15m18-30 18 14 17-3" stroke="#4a4390" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M-4 72c-4 1-8 4-6 9l5 10c2 5 9 6 13 2l8-10c3-6-1-9-7-9l-7 3zm55-22c2-6 8-8 11-2l6 13c2 6-3 11-8 9l-14-4c-7-2-6-10 0-13z" fill="#55b6b9"/>
        <path d="M-20 11q-20-5-26-22m65 24q15 1 24 12" stroke="#efa95b" strokeWidth="17" strokeLinecap="round"/>
        <path d="M-46-9c-7-4-11-11-9-15 2-4 5 0 6 2l1-5c1-4 6-3 7 0l2 12c0 5-3 7-7 6zm88 30q9-3 12 4c3 7-4 12-10 9l-6-6q-3-4 4-7z" fill="#dc9578"/>
        <path d="M-23 9q7-13 22-15c17-1 29 11 29 23l-2 27q-23 11-51-1l-3-22q0-7 5-12z" fill="#f1aa63"/>
        <path d="m-9 17 11-6 11 6-3 12-8 3-9-3z" fill="#fff2db" opacity=".82"/>
        <path d="M-7-13H8V3Q1 12-7 4z" fill="#c87c68"/>
        <path d="M-30-37c-6-11 1-23 9-26 4-11 15-17 27-13 13-1 24 7 26 21 9 8 9 23 4 33l-9 11-55-7z" fill="#64363e"/>
        <path d="M-26-39c2-16 14-24 28-23 15 0 27 10 27 25C29-15 16-4 1-4c-15 0-27-11-27-35z" fill="#df9b81"/>
        <path d="M-27-33c-4-8-3-20 2-27 7-12 24-16 36-9 11 0 24 11 20 26-12 1-26-3-31-12-6 9-17 14-28 15z" fill="#64363e"/>
        <path d="M-16-32h11m11 0h11m-22 0q5-4 11 0" stroke="#582e4c" strokeWidth="2.6" strokeLinecap="round"/>
        <circle cx="-11" cy="-29" r="7" stroke="#582e4c" strokeWidth="2"/>
        <circle cx="12" cy="-29" r="7" stroke="#582e4c" strokeWidth="2"/>
        <path d="M-5-18q6 4 13-1" stroke="#8b4059" strokeWidth="2.9" strokeLinecap="round"/>
        <path d="M-20 12q12 6 19 22m18-22q-7 10-9 23" stroke="#ffddaa" strokeWidth="2.4" strokeLinecap="round" opacity=".9"/>
        <path d="m-36-4 7 7m61 16-5 6" stroke="#cb7e65" strokeWidth="2" strokeLinecap="round" opacity=".8"/>
        <path d="m-14-34 5-2m19 2 5-2" stroke="#fff3da" strokeWidth="1.7" strokeLinecap="round"/>
        <path d="m-2 82 9 5m52-31-1 7" stroke="#d4f7eb" strokeWidth="2.6" strokeLinecap="round"/>
      </Learner>

      <Learner name="Learner from Nigeria" pose="reach" placement="translate(436 314) rotate(18)">
        <path d="m-13 43-10 20-19 5m56-24 19 17 9 19" stroke="#42688b" strokeWidth="17" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="m-42 59-11 7c-6 4-3 12 3 12l21-3c5-1 6-8 2-11zm77 19q-5 7 0 11c6 4 13 4 24 1 5-2 5-9-1-11l-11-5z" fill="#b28feb"/>
        <path d="M-23 12q-12 1-27 14m73-17q16-10 23-26" stroke="#706bc3" strokeWidth="17" strokeLinecap="round"/>
        <path d="M-53 22q-9 4-10 9c-2 5 2 9 6 8l10-6c7-4 1-13-6-11zm99-38c-3-3-2-7 0-13l4-9c2-4 6-3 6 0l-2 9 5-6c3-4 7 0 4 5l-7 13c-3 4-7 4-10 1z" fill="#8a554b"/>
        <path d="M-24 9C-12-2 9-5 21 4c7 5 9 13 10 21l-3 19C15 56-17 56-27 44l-2-18c-2-8 0-13 5-17z" fill="#827cd5"/>
        <path d="m-20 13 20 13 19-16-5 5-7 15H-7z" fill="#aaa1ee"/>
        <path d="M-6-12H8V4Q1 12-6 5z" fill="#825045"/>
        <path d="M-30-38c0-17 10-30 29-30 17-1 30 11 30 30v19l-9 7-45-2z" fill="#302642"/>
        <path d="M-27-38C-27-54-14-61 1-61c17 0 28 11 27 26C26-14 16-4 1-4s-26-11-28-34z" fill="#996254"/>
        <path d="M-33-38c-3-14 3-28 16-33 16-7 35-1 44 10 6 8 8 16 4 24-8-6-15-10-22-11-17 5-30 3-42 10z" fill="#4f9b8c"/>
        <path d="M-23-63q19 0 31 14m17-12q-10 4-16 12" stroke="#327e74" strokeWidth="4" strokeLinecap="round"/>
        <ellipse cx="-10" cy="-32" rx="2.3" ry="3" fill="#2e233a"/>
        <ellipse cx="13" cy="-32" rx="2.3" ry="3" fill="#2e233a"/>
        <path d="M-5-20q7 4 15-3c0 12-11 15-15 3z" fill="#693747"/>
        <path d="M-4-19q7 2 13-3l-2 5-8 2z" fill="#fff2df"/>
        <circle cx="-25" cy="-15" r="4" stroke="#f2bf72" strokeWidth="2.5"/>
        <path d="m-13 23 13 8 15-11m-29 14 14 8 8-5" stroke="#beb9fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M-22-65q8 2 15 7m23-7 6 6" stroke="#83c8b6" strokeWidth="2.3" strokeLinecap="round"/>
        <path d="m-48 72 15-3m74 14 12 2" stroke="#ece2ff" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="-9.5" cy="-33" r=".85" fill="#fff3df"/>
        <circle cx="13.5" cy="-33" r=".85" fill="#fff3df"/>
      </Learner>

      <g transform="translate(271 388) rotate(12)">
        <g className="camp-world-motion camp-world-book">
          <path d="M-52-17q24-6 52 8 26-12 51-4l4 35Q29 14 0 27q-29-14-55-7z" fill="var(--camp-art-deep)"/>
          <path d="M-51-22q26-7 51 8 24-14 50-6l3 36Q27 8 0 22q-28-13-53-7z" fill="var(--camp-art-light)"/>
          <path d="M-44-28q20-5 44 12 23-17 44-12l4 36Q23 5 0 18q-21-13-48-10z" fill="#fff7e8"/>
          <path d="m32-27 9 0 2 19-4-3-5 4z" fill="#db8a63"/>
          <path d="M-42 11q23 0 42 9 24-10 46-9" stroke="var(--camp-art-mid)" strokeOpacity=".5" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M0-16v34m-34-36 20 4m-21 6 18 4m31-9 19-6m-16 14 18-5" stroke="var(--camp-art-mid)" strokeWidth="2" strokeLinecap="round" opacity=".55"/>
        </g>
      </g>

      <g className="camp-world-motion camp-world-sparks">
        <path d="M192 45q0-9 9-9h20a9 9 0 0 1 9 9v8a9 9 0 0 1-9 9h-10l-9 7v-7h-1a9 9 0 0 1-9-9z" fill="var(--camp-purple-soft)" stroke="var(--camp-art-mid)" strokeOpacity=".65" strokeWidth="1.5"/>
        <path d="M203 46h16m-16 6h10" stroke="var(--camp-art-main)" strokeWidth="2" strokeLinecap="round"/>
        <path d="M340 356q0-8 8-8h20a8 8 0 0 1 8 8v6a8 8 0 0 1-8 8h-1v6l-8-6h-11a8 8 0 0 1-8-8z" fill="var(--camp-purple-soft)" stroke="var(--camp-art-mid)" strokeOpacity=".65" strokeWidth="1.5"/>
        <path d="M349 357h18m-18 6h10" stroke="var(--camp-art-main)" strokeWidth="2" strokeLinecap="round"/>
        <path d="M259 54q7 20 22 23c-16 2-21 7-25 21-2-16-7-20-21-24 14-1 19-6 24-20z" fill="var(--camp-art-mid)"/>
        <path d="M332 417q5 12 14 14c-10 2-13 6-15 14-2-8-6-12-14-14 8-2 12-6 15-14z" fill="var(--camp-art-mid)"/>
        <path d="m44 277 7 3m440-85 8-4m-295-97 4-10" stroke="var(--camp-art-mid)" strokeWidth="4" strokeLinecap="round" opacity=".7"/>
        <circle cx="366" cy="49" r="4" fill="#60afa8"/>
        <circle cx="186" cy="410" r="4" fill="#e2a265"/>
        <circle cx="504" cy="247" r="4" fill="var(--camp-art-mid)"/>
      </g>
    </svg>
  );
}

export function WelcomeWorld() {
  const [paused, setPaused] = useState(false);
  return (
    <div className="camp-welcome-scene" data-paused={paused}>
      <FlyingLearners />
      <div className="camp-welcome-fox" aria-hidden="true">
        <div className="camp-world-motion camp-world-fox">
          <Image src="/media/brand/englishcamp-mascot-256.png" alt="" width={256} height={256} priority unoptimized />
        </div>
      </div>
      <button
        type="button"
        className="camp-welcome-motion-control"
        aria-label={paused ? 'Play welcome animation' : 'Pause welcome animation'}
        onClick={() => setPaused(value => !value)}
      >
        {paused ? <Play aria-hidden="true" size={17}/> : <Pause aria-hidden="true" size={17}/>}
      </button>
    </div>
  );
}
