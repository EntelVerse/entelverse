/*
  # Email Queue System

  1. New Tables
    - `email_queue`
      - `id` (uuid, primary key)
      - `recipient` (text)
      - `subject` (text) 
      - `body` (text)
      - `status` (text)
      - `priority` (text)
      - `attempts` (integer)
      - `error` (text)
      - `processing_started_at` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `email_queue` table
    - Add policies for authenticated users to insert emails
    - Add policies for service role to process emails
*/

-- Create email queue table
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

-- Allow authenticated users to insert emails
CREATE POLICY "Users can insert emails"
  ON email_queue
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to view their own emails
CREATE POLICY "Users can view own emails"
  ON email_queue
  FOR SELECT
  TO authenticated
  USING (recipient = auth.jwt() ->> 'email');

-- Allow service role full access for processing
CREATE POLICY "Service role has full access"
  ON email_queue
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_email_queue_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_email_queue_updated_at
  BEFORE UPDATE ON email_queue
  FOR EACH ROW
  EXECUTE FUNCTION update_email_queue_updated_at();

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_email_queue_status ON email_queue(status);
CREATE INDEX IF NOT EXISTS idx_email_queue_priority ON email_queue(priority);
CREATE INDEX IF NOT EXISTS idx_email_queue_recipient ON email_queue(recipient);