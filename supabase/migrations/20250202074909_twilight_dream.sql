/*
  # Email Queue Public Access Fix

  1. Changes
    - Drop existing RLS policies
    - Add new policies allowing public access for email operations
    - Keep service role access for processing

  2. Security
    - Allow public to insert emails (needed for signup)
    - Allow viewing own emails by email address
    - Maintain service role access for processing
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can insert emails" ON email_queue;
DROP POLICY IF EXISTS "Users can view own emails" ON email_queue;
DROP POLICY IF EXISTS "Service role has full access" ON email_queue;

-- Allow public to insert emails (needed for signup flow)
CREATE POLICY "Public can insert emails"
  ON email_queue
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow viewing own emails by email address
CREATE POLICY "Public can view own emails"
  ON email_queue
  FOR SELECT
  TO public
  USING (recipient = coalesce(auth.jwt() ->> 'email', current_setting('request.jwt.claims', true)::json ->> 'email'));

-- Allow service role full access for processing
CREATE POLICY "Service role has full access"
  ON email_queue
  FOR ALL
  USING (
    current_setting('request.jwt.claims', true)::json ->> 'role' = 'service_role'
  );

-- Create function to handle email queue cleanup
CREATE OR REPLACE FUNCTION cleanup_old_emails()
RETURNS trigger AS $$
BEGIN
  -- Delete emails older than 7 days that have been sent or failed
  DELETE FROM email_queue
  WHERE status IN ('sent', 'failed')
    AND created_at < NOW() - INTERVAL '7 days';
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for cleanup
DROP TRIGGER IF EXISTS trigger_cleanup_old_emails ON email_queue;
CREATE TRIGGER trigger_cleanup_old_emails
  AFTER INSERT ON email_queue
  EXECUTE FUNCTION cleanup_old_emails();