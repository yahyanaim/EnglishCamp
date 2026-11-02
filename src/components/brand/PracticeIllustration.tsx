import { DashboardArt } from "./DashboardArt";

export type PracticeScene = "quiz" | "culture" | "phrases" | "translation" | "matching" | "writing" | "listening" | "reading" | "timed";
const c = { ink: "#581C87", purple: "#7E22CE", mid: "#A855F7", light: "#D8B4FE", pale: "#F3E8FF", paper: "#FFF9F2" };

export function practiceScene(topic: string, layout: string): PracticeScene {
  if (/culture|landeskunde/.test(topic)) return "culture";
  if (/phrases|redemittel|dialog|conversation|speaking/.test(topic)) return "phrases";
  if (/sprint|timed|race/.test(topic)) return "timed";
  if (/listening|dictation|pronunciation|phonics/.test(topic)) return "listening";
  if (layout === "matching") return "matching";
  if (layout === "writing" || /writing|briefe|proofreading/.test(topic)) return "writing";
  if (/reading|cloze/.test(topic)) return "reading";
  if (/ubersetzer|translation|sentence-pattern-practice|-practice/.test(topic)) return "translation";
  return "quiz";
}

export const PRACTICE_GUIDANCE: Record<PracticeScene, { title: string; text: string }> = {
  quiz: { title: "One question at a time", text: "Compare the choices, then review the feedback." },
  culture: { title: "Explore the context", text: "Read the question and compare each answer." },
  phrases: { title: "Phrases in context", text: "Match the phrase to its purpose and situation." },
  translation: { title: "Connect the meaning", text: "Read the whole sentence before choosing." },
  matching: { title: "Find the connection", text: "Compare both sides and match the pairs." },
  writing: { title: "Build your response", text: "Read the task, plan your ideas and review." },
  listening: { title: "Listen for meaning", text: "Follow the task and focus on the key details." },
  reading: { title: "Read for meaning", text: "Use the sentence and its context as evidence." },
  timed: { title: "Keep your focus", text: "Choose carefully while the timer runs." },
};

/** Original faceted scenes in the established violet artwork family. Decorative only. */
export function PracticeIllustration({ scene }: { scene: PracticeScene }) {
  return <svg className="camp-practice-illustration-art" viewBox="0 0 224 184" width="160" height="132" aria-hidden="true" focusable="false">
    <ellipse cx="111" cy="162" rx="85" ry="10" fill={c.light} opacity=".4" />
    <path d="M20 68 76 15l98 12 34 73-49 61-101-7Z" fill={c.pale} />
    <path d="m76 15 35 79 63-67Z" fill={c.light} opacity=".45" />
    <path d="m208 100-97-6 48 67Z" fill={c.light} opacity=".35" />
    {scene === "culture" ? <>
      <g transform="translate(69 20)"><DashboardArt name="globe" size={112} /></g>
      <path d="M25 73h54v79H25Z" fill={c.ink} /><path d="m25 73 54 15v64H25Z" fill={c.purple} />
      <path d="M33 85h37v3H33Zm0 8h23v3H33Z" fill={c.light} />
      <circle cx="51" cy="118" r="12" fill="none" stroke={c.paper} strokeWidth="2" /><path d="M39 118h24m-12-12c-7 8-7 16 0 24m0-24c7 8 7 16 0 24" fill="none" stroke={c.paper} strokeWidth="1.5" />
      <path d="m155 119 14-8 12 20-14 8Z" fill={c.mid} /><circle cx="167" cy="123" r="3" fill={c.paper} />
    </> : scene === "phrases" || scene === "translation" ? <>
      <path d="M25 33h116v71H80l-24 20v-20H25Z" fill={c.ink} /><path d="m25 33 116 24v47H25Z" fill={c.purple} />
      <path d="M42 58h75v4H42Zm0 13h58v4H42Z" fill={c.paper} /><path d="M42 84h39v3H42Z" fill={c.light} />
      <path d="M92 91h106v56h-20v18l-24-18H92Z" fill={c.paper} /><path d="m92 91 29 56H92Z" fill={c.light} />
      <text x="115" y="124" fill={c.ink} fontSize="18" fontWeight="700" fontFamily="sans-serif">{scene === "translation" ? "EN / AR" : "..."}</text>
      <path d="m159 35 11 10 19-21" fill="none" stroke={c.mid} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </> : scene === "matching" ? <>
      <path d="m75 51 75 79M75 91h75M75 132l75-81" fill="none" stroke={c.mid} strokeWidth="3" />
      {[34,74,114].map((y,i)=><g key={y}><rect x="22" y={y} width="58" height="34" rx="5" fill={c.purple} /><path d={`m22 ${y} 58 16v18H22Z`} fill={c.ink} opacity=".35" /><text x="51" y={y+22} textAnchor="middle" fontSize="15" fontFamily="sans-serif" fontWeight="700" fill={c.paper}>{["A","B","C"][i]}</text><rect x="145" y={y} width="58" height="34" rx="5" fill={c.paper} /><circle cx="174" cy={y+17} r={i===1?8:6} fill={c.mid} /></g>)}
    </> : scene === "listening" ? <>
      <g transform="translate(40 12)"><DashboardArt name="headphones" size={136} /></g>
      <path d="M43 145h139v19H43Z" fill={c.paper} />
      {[11,5,15,8,17,6,12,4,14,8].map((h,i)=><path key={i} d={`M${57+i*11} ${154-h/2}v${h}`} stroke={c.purple} strokeWidth="4" strokeLinecap="round" />)}
    </> : scene === "writing" ? <>
      <g transform="translate(38 12)"><DashboardArt name="note" size={139} /></g>
      <path d="m151 125 12-13 31 30-12 14Z" fill={c.mid} /><path d="m151 125 31 31-19 5Z" fill={c.ink} /><path d="m163 161-12-36-3 37Z" fill={c.paper} />
    </> : scene === "reading" ? <>
      <g transform="translate(35 20)"><DashboardArt name="book" size={149} /></g>
      <path d="M157 28h19v55l-9-8-10 8Z" fill={c.mid} /><path d="m157 28 19 55V28Z" fill={c.purple} />
    </> : <>
      <g transform="translate(30 12)"><DashboardArt name={scene === "timed" ? "clock" : "book"} size={124} /></g>
      <path d="M122 83h78v77h-78Z" fill={c.paper} /><path d="m122 83 22 77h-22Z" fill={c.light} />
      {[103,124,145].map((y,i)=><g key={y}><circle cx="141" cy={y} r="6" fill={i===1?c.purple:c.light} /><path d={`M155 ${y}h31`} stroke={c.mid} strokeWidth="3" />{i===1&&<path d="m138 124 2 2 4-5" stroke={c.paper} strokeWidth="1.5" fill="none" />}</g>)}
    </>}
    <path d="m191 13 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z" fill={c.mid} /><circle cx="26" cy="123" r="4" fill={c.light} />
  </svg>;
}
