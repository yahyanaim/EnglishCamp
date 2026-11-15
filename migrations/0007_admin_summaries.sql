CREATE TABLE cloud_admin_summaries (
 learner_id TEXT PRIMARY KEY REFERENCES cloud_learners(id) ON DELETE CASCADE,
 revision INTEGER NOT NULL,
 summary_json TEXT NOT NULL CHECK(json_valid(summary_json)),
 refreshed_at TEXT NOT NULL
);
CREATE INDEX cloud_learners_created ON cloud_learners(created_at);
CREATE INDEX cloud_events_at ON cloud_events(at);
