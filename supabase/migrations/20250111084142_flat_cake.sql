/*
  # Email Verification System

  1. New Tables
    - `verification_codes`
      - `id` (uuid, primary key)
      - `email` (text, not null)
      - `code` (text, not null)
      - `expires_at` (timestamptz, not null)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `verification_codes` table
    - Add policy for authenticated users to read their own codes
*/

CREATE TABLE IF NOT EXISTS verification_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  code text NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE verification_codes ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own verification codes
CREATE POLICY "Users can read own verification codes"
  ON verification_codes
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = email);

-- Policy: Users can delete their own verification codes
CREATE POLICY "Users can delete own verification codes"
  ON verification_codes
  FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'email' = email);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS verification_codes_email_idx ON verification_codes(email);
CREATE INDEX IF NOT EXISTS verification_codes_code_idx ON verification_codes(code);