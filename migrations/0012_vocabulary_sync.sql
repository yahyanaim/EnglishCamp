-- Word bank sync across devices. Additive only: no existing learner data is changed.
CREATE TABLE IF NOT EXISTS cloud_vocabulary (
 learner_id TEXT PRIMARY KEY REFERENCES cloud_learners(id) ON DELETE CASCADE,
 vocabulary_json TEXT NOT NULL,
 revision INTEGER NOT NULL DEFAULT 0,
 updated_at TEXT NOT NULL
);
