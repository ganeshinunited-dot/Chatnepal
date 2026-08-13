-- Store only a salted, memory-hard password hash for email/password accounts.
-- Existing passwordless and Google accounts remain valid because these fields are nullable/defaulted.
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "passwordHash" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "passwordFailedAttempts" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "passwordLockedUntil" TIMESTAMP(3);
