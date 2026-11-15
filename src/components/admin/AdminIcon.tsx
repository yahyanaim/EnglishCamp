import type {ReactNode} from 'react';
// Small faceted utility artwork using the same palette as EnglishCamp's learning art.
const p={main:'var(--camp-art-main,#7E22CE)',deep:'var(--camp-art-deep,#6B21A8)',light:'var(--camp-art-light,#D8B4FE)',pale:'var(--camp-art-pale,#F3E8FF)'};
export function AdminIcon({name,size=18,className}:{name:string;size?:number;className?:string}){
 let drawing:ReactNode;
 switch(name){
 case 'menu':drawing=<>{[14,29,44].map((y,i)=><g key={y}><path d={`M8 ${y}h48v7H8Z`} fill={p.main}/><path d={`m8 ${y} 18 7H8Z`} fill={i%2?p.deep:p.light}/></g>)}</>;break;
 case 'close':drawing=<><path d="m14 8 42 42-7 7L7 15Z" fill={p.main}/><path d="m49 8 7 7-42 42-7-7Z" fill={p.light}/><path d="m26 26 12 12-7 7-12-12Z" fill={p.deep}/></>;break;
 case 'search':drawing=<><circle cx="27" cy="26" r="20" fill={p.main}/><path d="M27 6A20 20 0 0 0 7 26l20 20Z" fill={p.light}/><circle cx="27" cy="26" r="13" fill={p.pale}/><path d="m39 39 7-6 17 20-8 8Z" fill={p.deep}/><path d="m46 33 17 20-8-4-16-10Z" fill={p.main}/></>;break;
 case 'sun':drawing=<><path d="M28 2h8v11h-8Zm0 49h8v11h-8ZM2 28h11v8H2Zm49 0h11v8H51ZM8 13l6-6 8 8-6 6Zm35 35 6-6 8 8-6 6ZM7 50l8-8 6 6-8 8Zm36-35 8-8 6 6-8 8Z" fill={p.light}/><circle cx="32" cy="32" r="17" fill={p.main}/><path d="m32 15 17 17-17 17Z" fill={p.deep}/></>;break;
 case 'moon':drawing=<><path d="M45 5A28 28 0 1 0 60 43 24 24 0 0 1 45 5Z" fill={p.main}/><path d="M45 5C22 9 7 30 25 56A28 28 0 0 1 45 5Z" fill={p.light}/><path d="m25 56 35-13a28 28 0 0 1-35 13Z" fill={p.deep}/></>;break;
 case 'logout':drawing=<><path d="M7 5h29v54H7Z" fill={p.deep}/><path d="m7 5 20 8v38L7 59Z" fill={p.light}/><path d="M26 26h20V15l17 17-17 17V38H26Z" fill={p.main}/><path d="m46 15 17 17H26v-6h20Z" fill={p.light}/></>;break;
 case 'refresh':drawing=<><path d="M50 16A24 24 0 1 0 55 44" fill="none" stroke={p.main} strokeWidth="8"/><path d="M34 17 59 3v28Z" fill={p.light}/><path d="m34 17 25 14-9-15Z" fill={p.deep}/></>;break;
 case 'info':drawing=<><circle cx="32" cy="32" r="28" fill={p.main}/><path d="M32 4 4 32l28 28Z" fill={p.light}/><path d="M28 28h8v22h-8Z" fill={p.pale}/><circle cx="32" cy="18" r="4" fill={p.pale}/></>;break;
 default:drawing=<><path d="M6 27h33V12l22 20-22 20V37H6Z" fill={p.main}/><path d="m39 12 22 20H6v-5h33Z" fill={p.light}/><path d="m39 32 22 0-22 20Z" fill={p.deep}/></>;
 }
 return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>{drawing}</svg>;
}
