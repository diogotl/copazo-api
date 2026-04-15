-- Insert dummy test user for development/testing
-- This allows creating pools without authentication during development

INSERT INTO "users" ("id", "name", "email", "created_at")
VALUES (
  'placeholder-user-id',
  'Test User',
  'test@example.com',
  NOW()
) ON CONFLICT ("id") DO NOTHING;

-- Verify the user was created
SELECT id, name, email, created_at FROM "users" WHERE id = 'placeholder-user-id';
