import {accessHash,accessJson,approvedLearner} from './access';
import {billingConfigured,billingEnabled,membership} from './membership';
import {BillingError,paidThrough,paypal,paypalApproval,validMonthlyPlan} from './paypal';
import type {LearnerEnv} from './learners';
const now=()=>Math.floor(Date.now()/1000),idOk=(id:unknown)=>typeof id==='string'&&/^I-[A-Z0-9]+$/.test(id);
async function input(request:Request,max=4096){
 const reader=request.body?.getReader();let text='',size=0;const decoder=new TextDecoder();if(reader){while(true){const c=await reader.read();if(c.done)break;size+=c.value.length;if(size>max){await reader.cancel();throw new BillingError('Request is too large.',413);}text+=decoder.decode(c.value,{stream:true});}text+=decoder.decode();}
 try{const value=JSON.parse(text||'{}');if(!value||typeof value!=='object'||Array.isArray(value))throw 0;return value;}catch{throw new BillingError('Use a valid request.',400);}
}
async function rate(env:LearnerEnv,id:string,period=60,max=5){const end=(Math.floor(now()/period)+1)*period;const r=await env.LEARNERS_DB!.prepare('INSERT INTO cloud_auth_limits(bucket,attempts,expires_at) VALUES(?,1,?) ON CONFLICT(bucket) DO UPDATE SET attempts=attempts+1 WHERE attempts<? RETURNING attempts').bind(await accessHash('billing:'+id+':'+end),end,max).first();if(!r)throw new BillingError('Please wait before checking PayPal again.',429);}
/** Reconcile against the merchant API, not a browser callback or event status. */
async function reconcile(env:LearnerEnv,subscriptionId:string,api:Awaited<ReturnType<typeof paypal>>,allowPendingMissing=false){
 const db=env.LEARNERS_DB!,stored=await db.prepare('SELECT learner_id,plan_id,created_at,status FROM cloud_subscriptions WHERE id=?').bind(subscriptionId).first<any>();if(!stored)return false;
 let sub;try{sub=await api('/v1/billing/subscriptions/'+subscriptionId);}catch(e){if(allowPendingMissing&&stored.status==='APPROVAL_PENDING'&&e instanceof BillingError&&e.providerStatus===404)return true;throw e;}
 if(sub.id!==subscriptionId||sub.plan_id!==stored.plan_id||sub.plan_id!==env.PAYPAL_PLAN_ID||(stored.learner_id!==null&&sub.custom_id!==stored.learner_id)||sub.plan_overridden===true||Number(sub.quantity||1)!==1)throw new BillingError('PayPal subscription ownership or plan could not be verified.');
 if(!['APPROVAL_PENDING','APPROVED','ACTIVE','SUSPENDED','CANCELLED','EXPIRED'].includes(sub.status))throw new BillingError('PayPal subscription status was not recognized.');
 const start=new Date(Math.max(stored.created_at*1000-86400000,Date.now()-89*86400000)).toISOString(),end=new Date().toISOString();
 const transactions=await api('/v1/billing/subscriptions/'+subscriptionId+'/transactions?'+new URLSearchParams({start_time:start,end_time:end}));
 if(!Array.isArray(transactions.transactions)||transactions.transactions.length>100)throw new BillingError('PayPal payment history could not be verified.');
 const writes=[];
 for(const tx of transactions.transactions){
  const amount=tx.amount_with_breakdown?.gross_amount;
  if(typeof tx.id!=='string'||tx.id.length>64||amount?.currency_code!=='USD'||Number(amount.value)!==2||!['COMPLETED','REFUNDED','PARTIALLY_REFUNDED','REVERSED','FAILED','DECLINED'].includes(tx.status))continue;
  const time=Date.parse(tx.time);if(!Number.isFinite(time)||time>Date.now()+300000)throw new BillingError('PayPal payment date could not be verified.');
  const reversal=await db.prepare('SELECT state FROM cloud_billing_reversals WHERE sale_id=?').bind(tx.id).first<{state:string}>(),state=reversal?.state||(tx.status==='COMPLETED'?'paid':['REVERSED','FAILED','DECLINED'].includes(tx.status)?'reversed':'refunded');
  writes.push(db.prepare(`INSERT INTO cloud_subscription_payments(id,subscription_id,state,paid_at,paid_until) VALUES(?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET state=CASE WHEN cloud_subscription_payments.state IN ('refunded','reversed') THEN cloud_subscription_payments.state ELSE excluded.state END WHERE cloud_subscription_payments.subscription_id=excluded.subscription_id`).bind(tx.id,subscriptionId,state,Math.floor(time/1000),paidThrough(tx.time)));
 }
 writes.push(db.prepare("UPDATE cloud_subscriptions SET status=CASE WHEN status IN ('CANCELLED','EXPIRED') THEN status ELSE ? END,verified_at=MAX(verified_at,?) WHERE id=?").bind(sub.status,now(),subscriptionId));
 writes.push(db.prepare("UPDATE cloud_subscriptions SET paid_until=COALESCE((SELECT MAX(paid_until) FROM cloud_subscription_payments WHERE subscription_id=? AND state='paid'),0) WHERE id=?").bind(subscriptionId,subscriptionId));
 writes.push(db.prepare("DELETE FROM cloud_checkout_locks WHERE subscription_id=? AND EXISTS(SELECT 1 FROM cloud_subscriptions WHERE id=? AND status IN ('CANCELLED','EXPIRED'))").bind(subscriptionId,subscriptionId));
 await db.batch(writes);return true;
}
async function webhook(request:Request,env:LearnerEnv){
 if(!billingConfigured(env))return accessJson({error:'Billing is not configured.'},503);
 for(const header of ['paypal-auth-algo','paypal-cert-url','paypal-transmission-id','paypal-transmission-sig','paypal-transmission-time'])if(!request.headers.get(header)||request.headers.get(header)!.length>4096)return accessJson({error:'Missing PayPal signature.'},400);
 // Only the fixed PayPal API receives signature fields; certificate URLs are never fetched by us.
 const event=await input(request,65536);if(typeof event.id!=='string'||event.id.length>128||typeof event.event_type!=='string')return accessJson({error:'Invalid event.'},400);
 await rate(env,'webhook',60,60);const api=await paypal(env),verified=await api('/v1/notifications/verify-webhook-signature','POST',{auth_algo:request.headers.get('paypal-auth-algo'),cert_url:request.headers.get('paypal-cert-url'),transmission_id:request.headers.get('paypal-transmission-id'),transmission_sig:request.headers.get('paypal-transmission-sig'),transmission_time:request.headers.get('paypal-transmission-time'),webhook_id:env.PAYPAL_WEBHOOK_ID,webhook_event:event});
 if(verified.verification_status!=='SUCCESS')return accessJson({error:'Invalid PayPal signature.'},403);
 const db=env.LEARNERS_DB!;if(await db.prepare('SELECT id FROM cloud_billing_webhooks WHERE id=?').bind(event.id).first())return accessJson({ok:true});
 const resource=event.resource||{};
 let subscriptionId=event.event_type.startsWith('BILLING.SUBSCRIPTION.')?resource.id:resource.billing_agreement_id;
 if(['PAYMENT.SALE.REFUNDED','PAYMENT.SALE.REVERSED'].includes(event.event_type)){
  // Refunds may have their own ID. Parent sale IDs and PayPal sale links are treated as identifiers only.
  const sale=resource.sale_id||(event.event_type.endsWith('REVERSED')?resource.id:undefined),linked=(Array.isArray(resource.links)?resource.links:[]).find((l:any)=>typeof l.href==='string'&&/\/v1\/payments\/sale\/[A-Z0-9]+$/.test(l.href));let saleId=sale;
  if(linked?.href){try{const u=new URL(linked.href);if(['https://api.paypal.com','https://api-m.paypal.com','https://api.sandbox.paypal.com','https://api-m.sandbox.paypal.com'].includes(u.origin)&&/^\/v1\/payments\/sale\/[A-Z0-9]+$/.test(u.pathname))saleId=u.pathname.split('/').at(-1);}catch{}}
  const payment=typeof saleId==='string'?await db.prepare('SELECT subscription_id FROM cloud_subscription_payments WHERE id=?').bind(saleId).first<{subscription_id:string}>():null;
  subscriptionId=subscriptionId||payment?.subscription_id;
  if(typeof saleId!=='string'||!/^([A-Z0-9-]{5,64})$/.test(saleId))throw new BillingError('PayPal reversal could not be linked to a payment.');
  await db.prepare('INSERT INTO cloud_billing_reversals(sale_id,state) VALUES(?,?) ON CONFLICT(sale_id) DO UPDATE SET state=excluded.state').bind(saleId,event.event_type.endsWith('REVERSED')?'reversed':'refunded').run();
 }
 if(idOk(subscriptionId)&&!await reconcile(env,subscriptionId,api))throw new BillingError('Subscription creation is still being confirmed. Retry this event.');
 if(event.event_type==='PAYMENT.SALE.COMPLETED'&&(!idOk(subscriptionId)||typeof resource.id!=='string'||!await db.prepare('SELECT id FROM cloud_subscription_payments WHERE id=? AND subscription_id=?').bind(resource.id,subscriptionId).first()))throw new BillingError('PayPal payment history is still being confirmed. Retry this event.');
 // Reconciliation is idempotent. Marking occurs afterwards so a crash is retried, never dropped.
 await db.prepare('INSERT OR IGNORE INTO cloud_billing_webhooks VALUES(?,?,?)').bind(event.id,event.event_type,now()).run();return accessJson({ok:true});
}
export async function billingResponse(request:Request,env:LearnerEnv){
 const url=new URL(request.url),action=url.pathname.slice('/api/billing/'.length),db=env.LEARNERS_DB;
 if(!db)return accessJson({error:'Account storage is temporarily unavailable.'},503);
 try{
  if(action==='webhook')return request.method==='POST'?await webhook(request,env):accessJson({error:'Method not allowed.'},405);
  if(!['GET','POST'].includes(request.method))return accessJson({error:'Method not allowed.'},405);
  if(request.method==='POST'&&(request.headers.get('origin')!==url.origin||!request.headers.get('content-type')?.startsWith('application/json')))return accessJson({error:'Use EnglishCamp to manage your membership.'},403);
  const id=await approvedLearner(request,db);if(!id)return accessJson({error:'Restore your profile to manage membership.',code:'invitation_required'},401);
  if(action==='status'&&request.method==='GET')return accessJson(await membership(db,id,env));
  if(!billingEnabled(env))return accessJson({error:'Subscriptions are not open yet. No payment is required.'},503);
  if(request.method!=='POST')return accessJson({error:'Method not allowed.'},405);
  if(!['start','refresh','cancel'].includes(action))return accessJson({error:'Not found.'},404);
  const body=await input(request);await rate(env,id);
  const member=await membership(db,id,env);
  if(action==='start'){
   if(body.acceptTerms!==true)throw new BillingError('Confirm the monthly price and renewal terms.',400);
   if(member.mode==='legacy')throw new BillingError('Your existing access does not require a subscription.',409);
   if(member.trialUntil>now()||member.paidUntil>now())throw new BillingError('You already have access. Subscribe after your current period ends.',409);
   const pending=await db.prepare("SELECT id,status FROM cloud_subscriptions WHERE learner_id=? AND status NOT IN ('CANCELLED','EXPIRED') LIMIT 1").bind(id).first<any>();
   if(pending){const lock=await db.prepare('SELECT approval_url FROM cloud_checkout_locks WHERE learner_id=? AND subscription_id=?').bind(id,pending.id).first<any>();if(pending.status==='APPROVAL_PENDING'&&lock?.approval_url)return accessJson({approvalUrl:paypalApproval(lock.approval_url,env.PAYPAL_ENV==='sandbox')});throw new BillingError('A subscription already exists. Refresh its status before starting another.',409);}
   const lock=await db.prepare('SELECT request_id,created_at FROM cloud_checkout_locks WHERE learner_id=?').bind(id).first<any>(),requestId=lock?.request_id||crypto.randomUUID();
   // Keep uncertain requests locked. A retry reuses the same PayPal idempotency key;
   // after 24h the owner must reconcile it instead of risking a second recurring agreement.
   if(lock&&lock.created_at<now()-86400)throw new BillingError('An earlier checkout needs review by the owner before another can be created.',409);
   await db.prepare('INSERT OR IGNORE INTO cloud_checkout_locks(learner_id,request_id,created_at) VALUES(?,?,?)').bind(id,requestId,now()).run();
   const current=await db.prepare('SELECT request_id FROM cloud_checkout_locks WHERE learner_id=?').bind(id).first<any>(),api=await paypal(env),plan=await api('/v1/billing/plans/'+env.PAYPAL_PLAN_ID);
   if(!validMonthlyPlan(plan,env.PAYPAL_PLAN_ID!))throw new BillingError('The monthly plan could not be confirmed. No checkout was opened.');
   const sub=await api('/v1/billing/subscriptions','POST',{plan_id:env.PAYPAL_PLAN_ID,custom_id:id,quantity:'1',application_context:{brand_name:'EnglishCamp',user_action:'SUBSCRIBE_NOW',shipping_preference:'NO_SHIPPING',return_url:url.origin+'/membership?paypal=return',cancel_url:url.origin+'/membership?paypal=cancel'}},current.request_id);
   if(!idOk(sub.id)||sub.status!=='APPROVAL_PENDING')throw new BillingError('PayPal did not confirm the checkout.');
   const approval=paypalApproval(sub.links?.find((l:any)=>l.rel==='approve')?.href,env.PAYPAL_ENV==='sandbox');
   await db.batch([db.prepare("INSERT OR IGNORE INTO cloud_subscriptions(id,learner_id,plan_id,status,created_at) VALUES(?,?,?,'APPROVAL_PENDING',?)").bind(sub.id,id,env.PAYPAL_PLAN_ID,now()),db.prepare('UPDATE cloud_checkout_locks SET subscription_id=?,approval_url=? WHERE learner_id=? AND request_id=?').bind(sub.id,approval,id,current.request_id)]);
   return accessJson({approvalUrl:approval});
  }
  const sub=member.subscription;if(!sub)throw new BillingError('No subscription is linked to this profile.',404);const api=await paypal(env);
  if(action==='cancel'){
   await reconcile(env,sub.id,api,true);const current=await db.prepare('SELECT status FROM cloud_subscriptions WHERE id=?').bind(sub.id).first<any>();
   if(current.status==='APPROVAL_PENDING')throw new BillingError('PayPal approval is still pending. Resume the same checkout; PayPal has not confirmed a cancellable subscription yet. Contact the owner before deleting this profile.',409);
   if(!['CANCELLED','EXPIRED'].includes(current.status))await api('/v1/billing/subscriptions/'+sub.id+'/cancel','POST',{reason:'Learner requested cancellation from EnglishCamp'});
   await reconcile(env,sub.id,api,true);await db.prepare("DELETE FROM cloud_checkout_locks WHERE learner_id=? AND EXISTS(SELECT 1 FROM cloud_subscriptions WHERE id=? AND status IN ('CANCELLED','EXPIRED'))").bind(id,sub.id).run();
  }else{if(sub.verified_at>now()-15)return accessJson(await membership(db,id,env));await reconcile(env,sub.id,api,true);}
  return accessJson(await membership(db,id,env));
 }catch(e){return e instanceof BillingError?accessJson({error:e.message},e.status):accessJson({error:'Membership could not be checked. Your saved progress is kept.'},503);}
}
