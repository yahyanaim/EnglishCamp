import type { Fruit } from "@/lib/sessionProfile";

/** Original local vector avatars: no image service or personal data leaves the browser. */
export function FruitAvatar({ fruit, size = 40 }: { fruit: Fruit; size?: number }) {
  const shapes = {
    apple: <><path d="M31 25c-14-9-24 3-18 19 4 13 12 14 19 11 8 3 16 1 19-12 5-17-6-25-20-18Z" fill="#F97083"/><path d="M32 24c-2-8 0-12 3-15" stroke="#6B3E28" strokeWidth="3"/><path d="M34 17c9 2 13-2 13-7-7-2-12 0-13 7Z" fill="#74B879"/></>,
    pear: <><path d="M32 17c-11 0-9 12-15 21-9 15 0 22 15 22s24-7 15-22c-6-9-4-21-15-21Z" fill="#BFD877"/><path d="M32 18c-1-5 1-9 4-11" stroke="#6B3E28" strokeWidth="3"/><path d="M35 13c7 2 12-1 13-5-7-3-12-1-13 5Z" fill="#609B68"/></>,
    orange: <><circle cx="32" cy="37" r="22" fill="#FFB269"/><path d="M31 16c0-4 2-7 4-9" stroke="#6B3E28" strokeWidth="3"/><path d="M33 14c9 3 14 0 16-5-8-4-14-1-16 5Z" fill="#73B384"/><path d="M17 29c-2 3-3 6-3 9" stroke="#FFE3BF" strokeWidth="3" strokeLinecap="round"/></>,
    lemon: <><path d="M10 35c1-16 18-25 31-18 9 3 12 15 15 18-5 2-6 15-17 19-15 6-29-3-29-19Z" fill="#F4D668"/><path d="M39 17c7 0 12-3 13-8-8-2-12 0-13 8Z" fill="#73B384"/><path d="M17 29c-3 4-4 8-3 11" stroke="#FFF4C4" strokeWidth="3" strokeLinecap="round"/></>,
    cherry: <><path d="M21 36c-1-12 9-18 14-26 0 9 4 12 9 26" fill="none" stroke="#689B73" strokeWidth="3"/><path d="M35 12c8 0 13-3 14-7-8-2-12 1-14 7Z" fill="#83B58C"/><circle cx="20" cy="43" r="13" fill="#EC6A88"/><circle cx="44" cy="43" r="13" fill="#D9577A"/><circle cx="15" cy="39" r="3" fill="#FFC5D5"/></>,
    strawberry: <><path d="M11 29c1-15 41-15 42 0 1 12-13 30-21 30S10 41 11 29Z" fill="#F58396"/><path d="m17 20 5-9 10 6 9-6 6 9-15 7Z" fill="#7CB78B"/><g fill="#FFDFBA"><ellipse cx="21" cy="33" rx="1.2" ry="2"/><ellipse cx="42" cy="33" rx="1.2" ry="2"/><ellipse cx="22" cy="43" rx="1.2" ry="2"/><ellipse cx="41" cy="43" rx="1.2" ry="2"/><ellipse cx="31" cy="50" rx="1.2" ry="2"/></g></>,
    grapes: <><path d="M32 20V9" stroke="#6B3E28" strokeWidth="3"/><path d="M33 14c8 3 14 0 16-5-8-4-15-1-16 5Z" fill="#7CB78B"/><g fill="#BB8DDC" stroke="#A975CF" strokeWidth="1"><circle cx="23" cy="26" r="9"/><circle cx="41" cy="26" r="9"/><circle cx="16" cy="39" r="9"/><circle cx="32" cy="39" r="10"/><circle cx="48" cy="39" r="9"/><circle cx="24" cy="51" r="8"/><circle cx="40" cy="51" r="8"/><circle cx="32" cy="58" r="7"/></g></>,
    peach: <><path d="M32 22C15 12 4 32 14 48c10 15 28 15 37-1 10-18-3-34-19-25Z" fill="#FFC09D"/><path d="M33 24c-6 7-8 15-4 26" fill="none" stroke="#F4A081" strokeWidth="2"/><path d="M33 20c2-8 9-12 18-10-1 9-8 14-18 10Z" fill="#83B58C"/></>,
  };
  const faceY = fruit === "grapes" ? 37 : fruit === "cherry" ? 43 : 37;
  return <svg role="img" aria-label={`${fruit} avatar`} className="camp-fruit-avatar" width={size} height={size} viewBox="0 0 64 72" fill="none">
    {shapes[fruit]}
    <g fill="#4D2E56"><ellipse cx="27" cy={faceY} rx="1.7" ry="2.3"/><ellipse cx="37" cy={faceY} rx="1.7" ry="2.3"/></g>
    <path d={`M28 ${faceY + 7}q4 4 8 0`} stroke="#4D2E56" strokeWidth="1.8" strokeLinecap="round"/>
    <g fill="#F2A0B2" opacity=".75"><ellipse cx="21" cy={faceY + 5} rx="3" ry="1.8"/><ellipse cx="43" cy={faceY + 5} rx="3" ry="1.8"/></g>
  </svg>;
}
