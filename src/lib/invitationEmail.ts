export function invitationEmail(value:unknown){
 if(typeof value!=='string')return '';
 const email=value.trim().toLowerCase();
 return email.length<=254&&/^[a-z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i.test(email)?email:'';
}
export function invitationName(value:unknown){return typeof value==='string'?value.normalize('NFKC').replace(new RegExp('[\\p{Cc}\\p{Cf}]','gu'),'').trim().replace(/\s+/g,' '):'';}
