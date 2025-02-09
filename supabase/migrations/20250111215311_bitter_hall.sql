/*
  # Create verification codes table

  1. New Tables
    - `verification_codes`
      - `id` (uuid, primary key)
      - `email` (text)
      - `code` (text)
      - `expires_at` (timestamptz)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS
    - Add policies for read, delete, and insert operations
  
  3. Performance
    - Add indexes for email and code columns
  
  4. Maintenance
    - Add automatic cleanup of expired codes
*/

-- Drop existing policies if they exist
DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can read own verification codes" ON verification_codes;
  DROP POLICY IF EXISTS "Users can delete own verification codes" ON verification_codes;
  DROP POLICY IF EXISTS "Allow inserting verification codes" ON verification_codes;
EXCEPTION
  WHEN undefined_table THEN
    NULL;
END $$;

-- Create verification codes table if it doesn't exist
CREATE TABLE IF NOT EXISTS verification_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  code text NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE verification_codes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own verification codes"
  ON verification_codes
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = email);

CREATE POLICY "Users can delete own verification codes"
  ON verification_codes
  FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'email' = email);

CREATE POLICY "Allow inserting verification codes"
  ON verification_codes
  FOR INSERT
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS verification_codes_email_idx ON verification_codes(email);
CREATE INDEX IF NOT EXISTS verification_codes_code_idx ON verification_codes(code);

-- Function to clean up expired codes
CREATE OR REPLACE FUNCTION cleanup_expired_verification_codes()
RETURNS trigger AS $$
BEGIN
  DELETE FROM verification_codes
  WHERE expires_at < NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS cleanup_expired_codes ON verification_codes;

-- Create trigger for automatic cleanup
CREATE TRIGGER cleanup_expired_codes
  AFTER INSERT ON verification_codes
  EXECUTE FUNCTION cleanup_expired_verification_codes();