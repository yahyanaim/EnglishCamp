import {eraseLearner} from './learnerDeletion';
import {hasRenewal} from './membership';
import type {LearnerEnv} from './learners';
import {accessHash} from './access';
import {deliverInvitation,emailConfigured,InvitationDeliveryError} from './invitationDelivery';
import {reserveEmailAttempt,InvitationMailError} from './invitationEmail';
import {brandedMail,escapeMail} from './emailBrand';
export async function emailLearner(request:Request,env:LearnerEnv,body:Record<string,unknown>){
 const db=env.LEARNERS_DB!,id=typeof body.id==='string'?body.id:'',messageId=typeof body.messageId==='string'?body.messageId:'',subject=typeof body.subject==='string'?body.subject.trim():'',message=typeof body.message==='string'?body.message.trim():'';
 if(id.length>64||!id||!/^[a-f0-9-]{36}$/.test(messageId)||!subject||subject.length>120||/[\r\n\u0000-\u001f]/.test(subject)||!message||message.length>4000)throw new InvitationMailError('Enter a subject up to 120 characters and a message up to 4,000 characters.');
 const person=await db.prepare('SELECT l.name,(SELECT recipient_email FROM cloud_invitations WHERE redeemed_by=l.id AND recipient_email IS NOT NULL LIMIT 1) email FROM cloud_learners l WHERE l.id=?').bind(id).first<{name:string;email:string|null}>();
 if(!person)throw new InvitationMailError('Learner not found.',404);
 if(!person.email)throw new InvitationMailError('This profile has no invitation email. A message cannot be sent to an unverified address.',409);
 if(!emailConfigured(env))throw new InvitationMailError('Email sending is not configured.',503);
 const fingerprint=await accessHash(JSON.stringify({id,subject,message,email:person.email}));
 const inserted=await db.prepare("INSERT OR IGNORE INTO cloud_admin_mail(id,learner_id,content_hash,status,created_at) VALUES(?,?,?,'sending',unixepoch())").bind(messageId,id,fingerprint).run();
 if(!inserted.meta.changes){const previous=await db.prepare('SELECT learner_id,content_hash,status FROM cloud_admin_mail WHERE id=?').bind(messageId).first<any>();if(previous?.learner_id!==id||previous?.content_hash!==fingerprint)throw new InvitationMailError('This message identifier was already used.',409);if(previous.status==='accepted')return{ok:true,alreadySent:true};throw new InvitationMailError('This message was already attempted. Check delivery before sending another copy.',409);}
 try{
  await reserveEmailAttempt(db);
  await deliverInvitation(env,{id:messageId,to:{name:person.name,email:person.email},subject,text:`Hello ${person.name},\n\n${message}\n\nEnglishCamp`,html:brandedMail(new URL(request.url).origin,subject,`<p>Hello ${escapeMail(person.name)},</p><div style="font-size:15px;line-height:1.8;overflow-wrap:anywhere">${escapeMail(message).replace(/\n/g,'<br>')}</div><p style="font-size:12px;color:#746a80;margin-top:28px">An account or learning message from the EnglishCamp owner.</p>`)});
  await db.prepare("UPDATE cloud_admin_mail SET status='accepted' WHERE id=?").bind(messageId).run();return{ok:true,accepted:true};
 }catch(e){await db.prepare("UPDATE cloud_admin_mail SET status='failed' WHERE id=?").bind(messageId).run();throw e instanceof InvitationMailError?e:e instanceof InvitationDeliveryError?new InvitationMailError('The email provider did not confirm acceptance. Check its delivery status before sending another copy.',e.status):new InvitationMailError('Delivery could not be confirmed. Check the delivery status before sending again.',503);}
}
export async function deleteLearner(env:LearnerEnv,body:Record<string,unknown>){
 const db=env.LEARNERS_DB!,id=typeof body.id==='string'?body.id:'';
 if(!id||id.length>64)throw new InvitationMailError('Choose a learner.');
 const learner=await db.prepare('SELECT number FROM cloud_learners WHERE id=?').bind(id).first<{number:number}>();
 if(!learner)throw new InvitationMailError('Learner not found.',404);
 if(body.confirm!=='EC-'+String(learner.number).padStart(4,'0'))throw new InvitationMailError('Type the displayed profile ID to confirm permanent deletion.');
 if(await hasRenewal(db,id))throw new InvitationMailError('Resolve this learner’s pending PayPal approval or cancel their active renewal before deleting their profile.',409);
 if(!await eraseLearner(db,id))throw new InvitationMailError('A checkout started before deletion completed. Cancel it before trying again.',409);
 return{ok:true};
}
