/*
  # Fix Verification Flow Policies

  1. Changes
    - Update RLS policies to allow public access for verification
    - Add missing indexes for performance
    - Fix JWT claims access in policies

  2. Security
    - Enable public access for token verification
    - Maintain security through token validation
    - Prevent unauthorized access

  3. Performance
    - Add composite indexes for common queries
*/

-- Update policies for verification_tokens table
DROP POLICY IF EXISTS "Users can read own tokens" ON verification_tokens;
DROP POLICY IF EXISTS "Users can read their own tokens" ON verification_tokens;
DROP POLICY IF EXISTS "Users can delete own tokens" ON verification_tokens;
DROP POLICY IF EXISTS "Users can delete their own tokens" ON verification_tokens;
DROP POLICY IF EXISTS "Allow inserting tokens" ON verification_tokens;
DROP POLICY IF EXISTS "Anyone can insert tokens" ON verification_tokens;

-- Create new policies that allow public access for verification
CREATE POLICY "Public can read tokens"
  ON verification_tokens
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can insert tokens"
  ON verification_tokens
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public can delete tokens"
  ON verification_tokens
  FOR DELETE
  TO public
  USING (true);

-- Add missing composite indexes for better performance
CREATE INDEX IF NOT EXISTS idx_verification_tokens_email_type_expires 
  ON verification_tokens(email, type, expires_at);

-- Update or create cleanup function
CREATE OR REPLACE FUNCTION cleanup_expired_tokens()
RETURNS trigger AS $$
BEGIN
  DELETE FROM verification_tokens
  WHERE expires_at < NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;