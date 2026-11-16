import type {BillingEnv} from './membership';
export class BillingError extends Error{constructor(message:string,readonly status=503,readonly providerStatus?:number){super(message);}}
export const paypalHost=(env:BillingEnv)=>env.PAYPAL_ENV==='sandbox'?'https://api-m.sandbox.paypal.com':'https://api-m.paypal.com';
export async function paypal(env:BillingEnv){
 const base=paypalHost(env);
 const r=await fetch(base+'/v1/oauth2/token',{method:'POST',headers:{Authorization:'Basic '+btoa(env.PAYPAL_CLIENT_ID+':'+env.PAYPAL_CLIENT_SECRET),'Content-Type':'application/x-www-form-urlencoded'},body:'grant_type=client_credentials',signal:AbortSignal.timeout(10000)});
 if(!r.ok){await r.body?.cancel();throw new BillingError('PayPal is temporarily unavailable. Your learning records are safe.');}
 const token=await r.json() as {access_token:string};if(typeof token.access_token!=='string')throw new BillingError('PayPal could not authenticate this request.');
 return async(path:string,method='GET',body?:object,requestId?:string)=>{
  const response=await fetch(base+path,{method,headers:{Authorization:'Bearer '+token.access_token,Accept:'application/json',...(body?{'Content-Type':'application/json'}:{}),...(requestId?{'PayPal-Request-Id':requestId}:{})},...(body?{body:JSON.stringify(body)}:{}),signal:AbortSignal.timeout(12000)});
  if(!response.ok){await response.body?.cancel();throw new BillingError('PayPal could not confirm the request. Check your subscription before trying again.',503,response.status);}
  if(response.status===204)return{};
  const text=await response.text();if(text.length>250000)throw new BillingError('PayPal returned an unexpected response.');
  return JSON.parse(text);
 };
}
export function validMonthlyPlan(plan:any,id:string){
 const c=plan.billing_cycles;
 return plan.id===id&&plan.status==='ACTIVE'&&Array.isArray(c)&&c.length===1&&c[0].tenure_type==='REGULAR'&&c[0].frequency?.interval_unit==='MONTH'&&c[0].frequency.interval_count===1&&c[0].total_cycles===0&&c[0].pricing_scheme?.fixed_price?.currency_code==='USD'&&Number(c[0].pricing_scheme.fixed_price.value)===2&&Number(plan.payment_preferences?.setup_fee?.value||0)===0&&Number(plan.taxes?.percentage||0)===0;
}
export function paypalApproval(url:unknown,sandbox:boolean){
 if(typeof url!=='string')throw new BillingError('PayPal did not provide an approval link.');
 const u=new URL(url);if(u.origin!==(sandbox?'https://www.sandbox.paypal.com':'https://www.paypal.com')||u.pathname!=='/webapps/billing/subscriptions')throw new BillingError('PayPal returned an unexpected approval link.');
 return u.toString();
}
export function paidThrough(date:string){
 const d=new Date(date);if(!Number.isFinite(d.getTime()))throw new BillingError('PayPal payment date was not confirmed.');
 // Calendar month, clamped for January 31 and leap years; renewal grants one paid period only.
 const day=d.getUTCDate();d.setUTCDate(1);d.setUTCMonth(d.getUTCMonth()+1);const last=new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth()+1,0)).getUTCDate();d.setUTCDate(Math.min(day,last));return Math.floor(d.getTime()/1000);
}
