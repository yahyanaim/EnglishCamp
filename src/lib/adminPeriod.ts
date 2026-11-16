/** UTC report boundaries; the upper bound is exclusive. */
export function adminPeriod(url:URL,now=new Date()){
 const from=url.searchParams.get('from'),to=url.searchParams.get('to');
 const day=(s:string)=>/^\d{4}-\d{2}-\d{2}$/.test(s)&&Number.isFinite(Date.parse(s))&&new Date(s).toISOString().slice(0,10)===s;
 if(from!==null||to!==null){if(!from||!to||!day(from)||!day(to))throw new TypeError('Invalid report dates');const start=Date.parse(from),end=Date.parse(to);if(end<start||end-start>365*86400000)throw new TypeError('Choose up to 366 report days');return{since:from,until:new Date(end+86400000).toISOString().slice(0,10)};}
 const days=Number(url.searchParams.get('days')||30);if(![1,7,30,90,365].includes(days))throw new TypeError('Invalid report period');
 return{since:days===1?now.toISOString().slice(0,10):new Date(now.getTime()-days*86400000).toISOString(),until:now.toISOString()};
}
