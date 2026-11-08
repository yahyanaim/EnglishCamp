PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS cloud_learners (
  number INTEGER PRIMARY KEY AUTOINCREMENT,
  id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  fruit TEXT NOT NULL,
  recovery_hash TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS cloud_sessions (
  token_hash TEXT PRIMARY KEY,
  learner_id TEXT NOT NULL REFERENCES cloud_learners(id) ON DELETE CASCADE,
  expires_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS cloud_sessions_expiry ON cloud_sessions(expires_at);
CREATE TABLE IF NOT EXISTS cloud_progress (
  learner_id TEXT PRIMARY KEY REFERENCES cloud_learners(id) ON DELETE CASCADE,
  revision INTEGER NOT NULL DEFAULT 0,
  progress_json TEXT NOT NULL,
  badges_json TEXT NOT NULL,
  imported_keys TEXT NOT NULL,
  baseline_xp REAL NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS cloud_events (
  learner_id TEXT NOT NULL REFERENCES cloud_learners(id) ON DELETE CASCADE,
  event_key TEXT NOT NULL,
  kind TEXT NOT NULL,
  source TEXT NOT NULL,
  xp REAL NOT NULL,
  at TEXT NOT NULL,
  PRIMARY KEY (learner_id, event_key)
);
CREATE TABLE IF NOT EXISTS cloud_auth_limits (
  bucket TEXT PRIMARY KEY,
  attempts INTEGER NOT NULL DEFAULT 1,
  expires_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS cloud_auth_limits_expiry ON cloud_auth_limits(expires_at);
