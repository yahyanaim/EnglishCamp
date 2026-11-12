CREATE TABLE cloud_notes (
 learner_id TEXT NOT NULL REFERENCES cloud_learners(id) ON DELETE CASCADE,
 lesson_id TEXT NOT NULL,
 body TEXT NOT NULL CHECK(length(body)<=12000),
 revision INTEGER NOT NULL,
 last_operation TEXT NOT NULL,
 updated_at TEXT NOT NULL,
 PRIMARY KEY(learner_id,lesson_id)
);
CREATE TABLE cloud_note_operations (
 learner_id TEXT NOT NULL REFERENCES cloud_learners(id) ON DELETE CASCADE,
 operation_id TEXT NOT NULL,
 PRIMARY KEY(learner_id,operation_id)
);
