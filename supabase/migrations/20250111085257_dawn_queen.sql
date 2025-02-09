/*
  # Fix Verification Flow

  1. Changes
    - Drop and recreate verification_tokens table with correct structure
    - Update RLS policies for proper access control
    - Add necessary indexes for performance
    - Create cleanup trigger for expired tokens

  2. Security
    - Enable RLS
    - Add policies for token management
    - Ensure proper access control

  3. Performance
    - Add indexes on frequently queried columns
    - Implement automatic cleanup of expired tokens
*/

-- Drop and recreate verification_tokens table
DROP TABLE IF EXISTS verification_tokens;

CREATE TABLE verification_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  token text NOT NULL,
  type text NOT NULL CHECK (type IN ('email', 'reset')),
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '1 hour'),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE verification_tokens ENABLE ROW LEVEL SECURITY;

-- Update policies for better security
CREATE POLICY "Anyone can insert tokens"
  ON verification_tokens
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can read their own tokens"
  ON verification_tokens
  FOR SELECT
  TO public
  USING (email = current_setting('request.jwt.claims')::json->>'email');

CREATE POLICY "Users can delete their own tokens"
  ON verification_tokens
  FOR DELETE
  TO public
  USING (email = current_setting('request.jwt.claims')::json->>'email');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_verification_tokens_email_type ON verification_tokens(email, type);
CREATE INDEX IF NOT EXISTS idx_verification_tokens_token ON verification_tokens(token);
CREATE INDEX IF NOT EXISTS idx_verification_tokens_expires_at ON verification_tokens(expires_at);

-- Function to clean up expired tokens
CREATE OR REPLACE FUNCTION cleanup_expired_tokens()
RETURNS trigger AS $$
BEGIN
  DELETE FROM verification_tokens
  WHERE expires_at < NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic cleanup
DROP TRIGGER IF EXISTS trigger_cleanup_expired_tokens ON verification_tokens;
CREATE TRIGGER trigger_cleanup_expired_tokens
  AFTER INSERT ON verification_tokens
  EXECUTE FUNCTION cleanup_expired_tokens();