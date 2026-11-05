import type { ShadowCue } from '@/lib/shadowTimeline';
/** Checked against original VOA video frames at 250 ms intervals. No learner audio is used. */
const cues=(ranges:[number,number][]):ShadowCue[]=>ranges.map(([start,end],line)=>({line,start,end}));
export const LEGACY_SHADOW_CUES:Record<string,ShadowCue[]>={
 'introduce-yourself':cues([[8.25,10],[11.5,14]]),
 'connected-youre':[{line:0,start:8,end:9.5},{line:1,start:11.25,end:14},{line:0,start:16.5,end:18.5},{line:1,start:19.25,end:21.5},{line:0,start:23.25,end:25},{line:1,start:25,end:28}],
 'break-the-ice':cues([[3,5.5],[5.5,8],[8,11.75],[12,13.75],[13.75,16.25],[16.25,21.5],[21.5,28.25],[28.25,31],[31,37.25],[37.25,43.75],[43.75,47.75],[47.75,52.75],[52.75,56.75],[56.75,59]]),
 'give-and-take':cues([[14.25,18],[30,32.25],[34,36.25]]),
 'wait-a-moment':cues([[21.25,25.25],[25.25,28.25],[30,31.25],[31.25,32.5],[32.5,38.75],[38.75,40]]),
 'productive-day':cues([[16.25,18.5],[18.5,20.75],[20.75,23.75],[23.75,28.5],[28.5,31.75],[34.5,40]]),
 'obvious-choice':cues([[16,20],[20,23],[23,28],[28,33.5],[33.5,37],[37,40]]),
 'plans-and-dreams':cues([[22.75,28],[28,31],[31,34],[34,38.75],[38.75,40.25]]),
 'making-party-plans':cues([[17.75,20.5],[20.5,23.5],[23.5,27.25],[27.25,30],[30,33.75],[33.75,40]]),
 'sharing-difficult-news':cues([[15.75,21.75],[21.75,27.75],[27.75,32.5],[34.5,38.5],[38.5,42.75]]),
 'fresh-start':cues([[19.5,22],[22,24.25],[26,32.75],[32.75,37],[37,42]]),
 // This short displays the phrase throughout. It is a phrase focus, not a sentence transcript.
 'say-thank-you':[{line:1,start:0,end:20}],
};
export const LEGACY_SHADOW_SOURCES:Record<string,string>={
 'introduce-yourself':'https://learningenglish.voanews.com/a/lets-learn-english-lesson-one/3111026.html',
 'connected-youre':'https://learningenglish.voanews.com/a/lets-learn-english-lesson-2-hello/3113733.html',
 'break-the-ice':'https://learningenglish.voanews.com/a/3406302.html',
 'give-and-take':'https://learningenglish.voanews.com/a/8009981.html',
 'wait-a-moment':'https://learningenglish.voanews.com/a/7983330.html',
 'productive-day':'https://learningenglish.voanews.com/a/7990719.html',
 'obvious-choice':'https://learningenglish.voanews.com/a/7967134.html',
 'plans-and-dreams':'https://learningenglish.voanews.com/a/8002401.html',
 'making-party-plans':'https://learningenglish.voanews.com/a/7878722.html',
 'sharing-difficult-news':'https://learningenglish.voanews.com/a/7949136.html',
 'fresh-start':'https://learningenglish.voanews.com/a/7907558.html',
 'say-thank-you':'https://www.youtube.com/watch?v=VDDB2tWE0jU',
};
