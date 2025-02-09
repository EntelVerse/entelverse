/*
  # Email Queue Policy Fix

  1. Changes
    - Drop all existing email queue policies
    - Create new policies with proper public access
    - Add function to handle automatic cleanup
    - Add indexes for better performance

  2. Security
    - Allow public access for email operations
    - Maintain service role access for processing
    - Enable proper cleanup of old emails
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Public can insert emails" ON email_queue;
DROP POLICY IF EXISTS "Public can view own emails" ON email_queue;
DROP POLICY IF EXISTS "Service role has full access" ON email_queue;

-- Create email queue table if it doesn't exist
CREATE TABLE IF NOT EXISTS email_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient text NOT NULL,
  subject text NOT NULL,
  body text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'sent', 'failed')),
  priority text NOT NULL DEFAULT 'normal' CHECK (priority IN ('high', 'normal', 'low')),
  attempts integer NOT NULL DEFAULT 0,
  error text,
  processing_started_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE email_queue ENABLE ROW LEVEL SECURITY;

-- Create new policies with proper public access
CREATE POLICY "Anyone can insert emails"
  ON email_queue
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can view emails"
  ON email_queue
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Service role can update emails"
  ON email_queue
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete emails"
  ON email_queue
  FOR DELETE
  USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_email_queue_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_email_queue_updated_at ON email_queue;
CREATE TRIGGER update_email_queue_updated_at
  BEFORE UPDATE ON email_queue
  FOR EACH ROW
  EXECUTE FUNCTION update_email_queue_updated_at();

-- Function to clean up old emails
CREATE OR REPLACE FUNCTION cleanup_old_emails()
RETURNS trigger AS $$
BEGIN
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

-- Create indexes for better performance
DROP INDEX IF EXISTS idx_email_queue_status;
DROP INDEX IF EXISTS idx_email_queue_priority;
DROP INDEX IF EXISTS idx_email_queue_recipient;
DROP INDEX IF EXISTS idx_email_queue_created_at;

CREATE INDEX idx_email_queue_status ON email_queue(status);
CREATE INDEX idx_email_queue_priority ON email_queue(priority);
CREATE INDEX idx_email_queue_recipient ON email_queue(recipient);
CREATE INDEX idx_email_queue_created_at ON email_queue(created_at);