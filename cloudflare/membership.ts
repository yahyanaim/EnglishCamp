import type {LearnerDatabase,LearnerEnv} from './learners';
export type BillingEnv={PAYPAL_ENV?:string;PAYPAL_CLIENT_ID?:string;PAYPAL_CLIENT_SECRET?:string;PAYPAL_PLAN_ID?:string;PAYPAL_WEBHOOK_ID?:string;BILLING_ENABLED?:string};
export const billingConfigured=(env:BillingEnv)=>['live','sandbox'].includes(env.PAYPAL_ENV||'')&&!!env.PAYPAL_CLIENT_ID&&!!env.PAYPAL_CLIENT_SECRET&&/^P-[A-Z0-9]+$/.test(env.PAYPAL_PLAN_ID||'')&&!!env.PAYPAL_WEBHOOK_ID;
export const billingEnabled=(env:BillingEnv)=>env.BILLING_ENABLED==='true'&&billingConfigured(env);
export async function membership(db:LearnerDatabase,id:string,env:BillingEnv){
 const account=await db.prepare('SELECT mode,trial_until FROM cloud_memberships WHERE learner_id=?').bind(id).first<{mode:string;trial_until:number|null}>();
 const paid=await db.prepare("SELECT COALESCE(MAX(p.paid_until),0) until FROM cloud_subscription_payments p JOIN cloud_subscriptions s ON s.id=p.subscription_id WHERE s.learner_id=? AND p.state='paid' AND NOT EXISTS(SELECT 1 FROM cloud_billing_reversals r WHERE r.sale_id=p.id)").bind(id).first<{until:number}>();
 const subscription=await db.prepare("SELECT id,status,verified_at FROM cloud_subscriptions WHERE learner_id=? ORDER BY created_at DESC LIMIT 1").bind(id).first<{id:string;status:string;verified_at:number}>();
 const now=Math.floor(Date.now()/1000),legacy=!account||account.mode==='legacy',trialUntil=account?.trial_until||0,paidUntil=paid?.until||0;
 return{mode:legacy?'legacy':'trial',trialUntil,paidUntil,allowed:legacy||!billingEnabled(env)||trialUntil>now||paidUntil>now,subscription,enabled:billingEnabled(env),sandbox:env.PAYPAL_ENV==='sandbox',price:'2.00',currency:'USD',trialDays:7};
}
/** Access check for every gated request: one indexed query, or none while billing is off. Same rules as membership().allowed. */
export async function membershipAllowed(db:LearnerDatabase,id:string,env:BillingEnv){
 if(!billingEnabled(env))return true;
 const row=await db.prepare("SELECT m.mode,m.trial_until,(SELECT COALESCE(MAX(p.paid_until),0) FROM cloud_subscription_payments p JOIN cloud_subscriptions s ON s.id=p.subscription_id WHERE s.learner_id=x.id AND p.state='paid' AND NOT EXISTS(SELECT 1 FROM cloud_billing_reversals r WHERE r.sale_id=p.id)) paid_until FROM (SELECT ? id) x LEFT JOIN cloud_memberships m ON m.learner_id=x.id").bind(id).first<{mode:string|null;trial_until:number|null;paid_until:number|null}>();
 const now=Math.floor(Date.now()/1000);
 return !row?.mode||row.mode==='legacy'||(row.trial_until||0)>now||(row.paid_until||0)>now;
}
/** A profile must not be erased while an approval or renewal could still charge its owner. */
export async function hasRenewal(db:LearnerDatabase,id:string){
 return !!(await db.prepare("SELECT id FROM cloud_subscriptions WHERE learner_id=? AND status NOT IN ('CANCELLED','EXPIRED') LIMIT 1").bind(id).first()||await db.prepare('SELECT learner_id FROM cloud_checkout_locks WHERE learner_id=? LIMIT 1').bind(id).first());
}
