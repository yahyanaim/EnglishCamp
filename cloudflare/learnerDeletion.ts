import type {LearnerDatabase} from './learners';
/** The no-renewal predicate is checked inside the same atomic D1 batch as deletion. */
export async function eraseLearner(db:LearnerDatabase,id:string){
 const safe="EXISTS(SELECT 1 FROM cloud_learners l WHERE l.id=? AND NOT EXISTS(SELECT 1 FROM cloud_subscriptions s WHERE s.learner_id=l.id AND s.status NOT IN ('CANCELLED','EXPIRED')) AND NOT EXISTS(SELECT 1 FROM cloud_checkout_locks c WHERE c.learner_id=l.id))";
 const results=await db.batch([
  db.prepare('DELETE FROM cloud_invitation_requests WHERE invitation_id IN (SELECT id FROM cloud_invitations WHERE redeemed_by=?) AND '+safe).bind(id,id),
  db.prepare('UPDATE cloud_invitations SET recipient_name=NULL,recipient_email=NULL WHERE redeemed_by=? AND '+safe).bind(id,id),
  db.prepare('DELETE FROM cloud_learners WHERE id=? AND '+safe).bind(id,id),
 ]);
 return results.at(-1)?.meta.changes===1;
}
