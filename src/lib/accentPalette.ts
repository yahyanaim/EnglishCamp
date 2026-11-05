export const ACCENT_PRESETS = [
  { name: "Violet", color: "#7E22CE" },
  { name: "Green", color: "#16804A" },
  { name: "Yellow", color: "#EAB308" },
  { name: "Blue", color: "#2563EB" },
] as const;
type RGB = [number, number, number];
const rgb = (hex: string): RGB => [1,3,5].map(i => parseInt(hex.slice(i,i+2),16)) as RGB;
const hex = (value: RGB) => "#" + value.map(n => Math.round(n).toString(16).padStart(2,"0")).join("");
const mix = (a: RGB,b: RGB,amount: number): RGB => a.map((n,i)=>n+(b[i]-n)*amount) as RGB;
export const validAccent = (color: string) => /^#[a-f0-9]{6}$/i.test(color);
export function contrast(a: string,b: string) {
  const light = (color: string) => rgb(color).map(n=>n/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4).reduce((sum,n,i)=>sum+n*[.2126,.7152,.0722][i],0);
  const x=light(a),y=light(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);
}
/** Keep white button labels readable, including when a bright custom colour is chosen. */
export function accentPalette(value: string,dark=false): Record<string,string> {
  const base=rgb(validAccent(value)?value:"#7E22CE");
  let primary=hex(base),ink=primary;
  for(let i=0;contrast(primary,"#FFFFFF")<4.6&&i<100;i++) primary=hex(mix(rgb(primary),[0,0,0],.04));
  const surface=dark?"#1C1C1E":"#FFFFFF";
  const soft=hex(mix(base,dark?[28,28,30]:[255,255,255],dark?.82:.92));
  for(let i=0;(contrast(ink,surface)<5||contrast(ink,soft)<4.6)&&i<100;i++) ink=hex(mix(rgb(ink),dark?[255,255,255]:[0,0,0],.05));
  const hover=hex(mix(rgb(primary),[0,0,0],.14));
  return {
    "--camp-purple":primary,"--camp-purple-hover":hover,"--camp-purple-soft":soft,"--camp-control-ink":ink,"--camp-focus":ink,
    "--color-primary":primary,"--color-primary-hover":hover,"--color-primary-dark":hover,"--color-primary-light":soft,"--color-primary-subtle":soft,
    "--color-on-brand":"#FFFFFF","--color-text-link":ink,"--color-border-focus":ink,"--color-info":primary,"--color-info-dark":ink,"--color-info-bg":soft,"--color-text-info":ink,
    "--primary":primary,"--primary-foreground":"#FFFFFF","--accent":soft,"--accent-foreground":ink,"--ring":ink,
    "--color-course-band4-5":primary,"--color-course-band5-6":hover,"--color-course-band6-7":primary,"--color-course-band7-8":hover,
    "--camp-art-dark":hex(mix(base,[0,0,0],.45)),"--camp-art-deep":hover,"--camp-art-main":primary,"--camp-art-mid":hex(mix(base,[255,255,255],.18)),"--camp-art-light":hex(mix(base,[255,255,255],.65)),"--camp-art-pale":hex(mix(base,[255,255,255],.9)),
  };
}
