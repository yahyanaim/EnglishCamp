ALTER TABLE cloud_progress ADD COLUMN awarded_xp REAL NOT NULL DEFAULT 0;
UPDATE cloud_progress SET awarded_xp = COALESCE((SELECT SUM(xp) FROM cloud_events WHERE cloud_events.learner_id=cloud_progress.learner_id),0);
CREATE TRIGGER IF NOT EXISTS cloud_event_reward AFTER INSERT ON cloud_events
BEGIN
  UPDATE cloud_progress SET awarded_xp=awarded_xp+NEW.xp WHERE learner_id=NEW.learner_id;
END;
