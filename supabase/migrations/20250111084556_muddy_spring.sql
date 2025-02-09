/*
  # Create verification system

  1. New Tables
    - `verification_tokens`
      - `id` (uuid, primary key)
      - `email` (text)
      - `token` (text)
      - `type` (text) - 'email' or 'reset'
      - `expires_at` (timestamptz)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on `verification_tokens` table
    - Add policies for secure token management
    - Add cleanup mechanism for expired tokens
*/

-- Create verification tokens table
CREATE TABLE IF NOT EXISTS verification_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  token text NOT NULL,
  type text NOT NULL CHECK (type IN ('email', 'reset')),
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE verification_tokens ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own tokens
CREATE POLICY "Users can read own tokens"
  ON verification_tokens
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = email);

-- Policy: Users can delete their own tokens
CREATE POLICY "Users can delete own tokens"
  ON verification_tokens
  FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'email' = email);

-- Policy: Allow inserting tokens (needed for verification process)
CREATE POLICY "Allow inserting tokens"
  ON verification_tokens
  FOR INSERT
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_verification_tokens_email ON verification_tokens(email);
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

-- Trigger to automatically clean up expired tokens
CREATE TRIGGER trigger_cleanup_expired_tokens
  AFTER INSERT ON verification_tokens
  EXECUTE FUNCTION cleanup_expired_tokens();