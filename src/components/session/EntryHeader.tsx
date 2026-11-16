"use client";
import {useEffect} from 'react';
import Link from 'next/link';
import {useTheme} from 'next-themes';
import {BrandMark} from '@/components/brand/BrandMark';
import {AdminIcon} from '@/components/admin/AdminIcon';
import {useSettings} from '@/store/useSettings';
import {accentPalette} from '@/lib/accentPalette';
export function EntryHeader({admin=false}:{admin?:boolean}){
 const{resolvedTheme,setTheme}=useTheme(),accent=useSettings(s=>s.accentColor);
 useEffect(()=>{for(const[key,value]of Object.entries(accentPalette(accent,resolvedTheme==='dark')))document.documentElement.style.setProperty(key,value);},[accent,resolvedTheme]);
 return <header className="camp-entry-header"><Link href="/" className="camp-entry-wordmark"><BrandMark size={44}/><strong>EnglishCamp</strong>{admin&&<span>Admin</span>}</Link><div className="camp-entry-theme" role="group" aria-label="Appearance"><button aria-label="Light mode" aria-pressed={resolvedTheme!=='dark'} onClick={()=>setTheme('light')}><AdminIcon name="sun" size={16}/></button><button aria-label="Dark mode" aria-pressed={resolvedTheme==='dark'} onClick={()=>setTheme('dark')}><AdminIcon name="moon" size={16}/></button></div></header>;
}
