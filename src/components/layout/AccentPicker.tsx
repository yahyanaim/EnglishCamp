"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Palette, Check } from "lucide-react";
import { useSettings } from "@/store/useSettings";
import { ACCENT_PRESETS, accentPalette } from "@/lib/accentPalette";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/shadcn/button";

export function AccentPicker() {
  const [open,setOpen]=useState(false);
  const {resolvedTheme}=useTheme();
  const color=useSettings(s=>s.accentColor),setColor=useSettings(s=>s.setAccentColor);
  useEffect(()=>{const values=accentPalette(color,resolvedTheme==="dark");for(const [key,value] of Object.entries(values))document.documentElement.style.setProperty(key,value);},[color,resolvedTheme]);
  return <><Button variant="ghost" size="icon" className="camp-accent-toggle" aria-label="Choose accent colour" title="Choose accent colour" onClick={()=>setOpen(true)}><Palette size={18}/></Button><Modal open={open} onClose={()=>setOpen(false)} title="Your accent colour"><p className="camp-palette-description">Choose a colour for buttons, icons and selected items. Your reading content stays the same.</p><div className="camp-palette-options">{ACCENT_PRESETS.map(item=><button key={item.name} type="button" aria-pressed={color.toLowerCase()===item.color.toLowerCase()} onClick={()=>setColor(item.color)}><span style={{background:item.color}}>{color.toLowerCase()===item.color.toLowerCase()&&<Check size={16} color={item.name==='Yellow'?'#382600':'white'}/>}</span>{item.name}</button>)}</div><label className="camp-custom-accent"><span>Custom colour</span><input aria-label="Custom accent colour" type="color" value={color} onChange={e=>setColor(e.target.value)}/></label><p className="camp-palette-description">Bright colours use a darker button shade so white labels remain readable. Saved on this device.</p><Button onClick={()=>setOpen(false)}>Done</Button></Modal></>;
}
