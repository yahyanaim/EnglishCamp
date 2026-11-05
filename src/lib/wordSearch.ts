import { WORD_SEARCH_SETS } from '@/data/word-search';
export type WordSearchPuzzle={words:string[];grid:string[][];size:number;translations:Record<string,string>;rewardIds:Record<string,string>};
export function appendWordSearchCell(selected:[number,number][],cell:[number,number],done=false):[number,number][]{return done||selected.some(([r,c])=>r===cell[0]&&c===cell[1])?selected:[...selected,cell];}
export function createWordSearchPuzzle(random:()=>number=Math.random):WordSearchPuzzle{
 const bank=WORD_SEARCH_SETS[Math.min(WORD_SEARCH_SETS.length-1,Math.floor(random()*WORD_SEARCH_SETS.length))],size=10,grid:string[][]=Array.from({length:size},()=>Array(size).fill('')),words:string[]=[];
 for(const word of bank.words){const positions:[number,number,boolean][]=[];for(let r=0;r<size;r++)for(let c=0;c<size;c++){if(c+word.length<=size)positions.push([r,c,true]);if(r+word.length<=size)positions.push([r,c,false]);}for(let i=positions.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[positions[i],positions[j]]=[positions[j],positions[i]];}
 const position=positions.find(([r,c,h])=>Array.from(word).every((letter,i)=>!grid[r+(h?0:i)][c+(h?i:0)]||grid[r+(h?0:i)][c+(h?i:0)]===letter));if(!position)continue;const[r,c,h]=position;Array.from(word).forEach((letter,i)=>{grid[r+(h?0:i)][c+(h?i:0)]=letter;});words.push(word);}
 for(let r=0;r<size;r++)for(let c=0;c<size;c++)if(!grid[r][c])grid[r][c]='ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(random()*26)];
 return {words,grid,size,translations:bank.translations,rewardIds:bank.rewardIds};
}
