ALTER TABLE cloud_invitations ADD COLUMN recipient_email TEXT;
ALTER TABLE cloud_invitations ADD COLUMN recipient_name TEXT;
ALTER TABLE cloud_invitations ADD COLUMN delivery_state TEXT NOT NULL DEFAULT 'manual' CHECK(delivery_state IN ('manual','sending','accepted','failed'));
CREATE TABLE cloud_invitation_requests (
 id TEXT PRIMARY KEY,
 name TEXT NOT NULL,
 email TEXT NOT NULL UNIQUE,
 status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','processing','accepted','declined')),
 created_at INTEGER NOT NULL,
 updated_at INTEGER NOT NULL,
 invitation_id TEXT REFERENCES cloud_invitations(id)
);
CREATE INDEX cloud_invitation_requests_status ON cloud_invitation_requests(status,created_at);
CREATE TABLE cloud_invitation_mail_limits (
 bucket TEXT PRIMARY KEY,
 used INTEGER NOT NULL DEFAULT 0,
 expires_at INTEGER NOT NULL
);
