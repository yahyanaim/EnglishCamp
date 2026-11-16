CREATE TABLE cloud_memberships (
 learner_id TEXT PRIMARY KEY REFERENCES cloud_learners(id) ON DELETE CASCADE,
 mode TEXT NOT NULL CHECK(mode IN ('legacy','trial')),
 trial_until INTEGER,
 created_at INTEGER NOT NULL
);
INSERT INTO cloud_memberships(learner_id,mode,created_at) SELECT id,'legacy',unixepoch() FROM cloud_learners;
CREATE TABLE cloud_subscriptions (
 id TEXT PRIMARY KEY,
 learner_id TEXT REFERENCES cloud_learners(id) ON DELETE SET NULL,
 plan_id TEXT NOT NULL,
 status TEXT NOT NULL,
 paid_until INTEGER NOT NULL DEFAULT 0,
 last_payment_id TEXT,
 verified_at INTEGER NOT NULL DEFAULT 0,
 created_at INTEGER NOT NULL
);
CREATE INDEX cloud_subscriptions_learner ON cloud_subscriptions(learner_id);
CREATE TABLE cloud_subscription_payments (
 id TEXT PRIMARY KEY,
 subscription_id TEXT NOT NULL REFERENCES cloud_subscriptions(id),
 state TEXT NOT NULL CHECK(state IN ('paid','refunded','reversed')),
 paid_at INTEGER NOT NULL DEFAULT 0,
 paid_until INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE cloud_billing_reversals (
 sale_id TEXT PRIMARY KEY,
 state TEXT NOT NULL CHECK(state IN ('refunded','reversed'))
);
CREATE TABLE cloud_billing_webhooks (
 id TEXT PRIMARY KEY,
 kind TEXT NOT NULL,
 processed_at INTEGER NOT NULL
);
CREATE TABLE cloud_checkout_locks (
 learner_id TEXT PRIMARY KEY REFERENCES cloud_learners(id) ON DELETE CASCADE,
 request_id TEXT NOT NULL,
 created_at INTEGER NOT NULL,
 subscription_id TEXT,
 approval_url TEXT
);
CREATE TABLE cloud_admin_mail (
 id TEXT PRIMARY KEY,
 learner_id TEXT NOT NULL REFERENCES cloud_learners(id) ON DELETE CASCADE,
 content_hash TEXT NOT NULL,
 status TEXT NOT NULL CHECK(status IN ('sending','accepted','failed')),
 created_at INTEGER NOT NULL
);
