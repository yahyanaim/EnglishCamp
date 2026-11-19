-- Read & Listening content management. Additive only: no existing learner data is changed.
CREATE TABLE IF NOT EXISTS learning_content_state (
  content_id TEXT PRIMARY KEY,
  kind TEXT NOT NULL CHECK (kind IN ('reading','listening')),
  status TEXT NOT NULL CHECK (status IN ('published','hidden')),
  level TEXT CHECK (level IS NULL OR level IN ('A1','A2','B1','B2','C1','C2')),
  updated_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS learning_content_items (
  id TEXT PRIMARY KEY,
  kind TEXT NOT NULL CHECK (kind IN ('reading','listening')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  source_key TEXT UNIQUE,
  payload_json TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS learning_content_items_status ON learning_content_items(kind, status);
CREATE INDEX IF NOT EXISTS cloud_events_kind_source ON cloud_events(kind, source);
