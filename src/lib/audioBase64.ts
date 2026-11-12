export function audioBase64(bytes:Uint8Array){let binary='';for(let at=0;at<bytes.length;at+=16384)binary+=String.fromCharCode(...Array.from(bytes.subarray(at,at+16384)));return btoa(binary);}
