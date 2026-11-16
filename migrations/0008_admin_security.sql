-- Operational metadata only; no learner progress or authentication secret changes.
CREATE TABLE cloud_admin_profile (
  id INTEGER PRIMARY KEY CHECK(id=1),
  display_name TEXT NOT NULL DEFAULT 'Administrator',
  role_title TEXT NOT NULL DEFAULT 'Platform owner'
);
INSERT INTO cloud_admin_profile(id) VALUES(1);
CREATE TABLE cloud_security_daily (
  day TEXT NOT NULL,
  kind TEXT NOT NULL CHECK(kind IN ('auth','denied','limited','unavailable')),
  total INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY(day,kind)
);
