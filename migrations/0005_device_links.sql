CREATE TABLE cloud_device_links (
  token_hash TEXT PRIMARY KEY,
  learner_id TEXT NOT NULL UNIQUE REFERENCES cloud_learners(id) ON DELETE CASCADE,
  expires_at INTEGER NOT NULL,
  used_at INTEGER
);
CREATE INDEX cloud_device_links_expiry ON cloud_device_links(expires_at);
