-- Add access control without changing any learner, progress, badge or note record.
CREATE TABLE cloud_access (
  learner_id TEXT PRIMARY KEY REFERENCES cloud_learners(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK(status IN ('approved','suspended')),
  source TEXT NOT NULL CHECK(source IN ('existing','invitation')),
  granted_at INTEGER NOT NULL
);
INSERT INTO cloud_access(learner_id,status,source,granted_at)
  SELECT id,'approved','existing',unixepoch() FROM cloud_learners;

CREATE TABLE cloud_invitations (
  id TEXT PRIMARY KEY,
  code_hash TEXT NOT NULL UNIQUE,
  display_code TEXT NOT NULL,
  label TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL,
  revoked_at INTEGER,
  redeemed_at INTEGER,
  redeemed_by TEXT REFERENCES cloud_learners(id) ON DELETE SET NULL
);
CREATE TABLE cloud_invitation_settings (
  id INTEGER PRIMARY KEY CHECK(id=1),
  accepting INTEGER NOT NULL DEFAULT 1 CHECK(accepting IN (0,1))
);
INSERT INTO cloud_invitation_settings(id,accepting) VALUES(1,1);

CREATE TABLE cloud_admin_sessions (
  token_hash TEXT PRIMARY KEY,
  credential_version TEXT NOT NULL,
  expires_at INTEGER NOT NULL
);
CREATE INDEX cloud_admin_sessions_expiry ON cloud_admin_sessions(expires_at);
