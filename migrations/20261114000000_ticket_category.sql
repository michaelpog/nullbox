-- What kind of job a ticket is and when the customer wants the visit.
-- Nullable: tickets created before this migration have neither.
ALTER TABLE tickets ADD COLUMN category TEXT;
ALTER TABLE tickets ADD COLUMN preferred_time TEXT;
