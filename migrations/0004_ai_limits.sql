CREATE TABLE cloud_ai_limits (
 bucket TEXT PRIMARY KEY,
 used INTEGER NOT NULL DEFAULT 1,
 expires_at INTEGER NOT NULL
);
CREATE INDEX cloud_ai_limits_expiry ON cloud_ai_limits(expires_at);
