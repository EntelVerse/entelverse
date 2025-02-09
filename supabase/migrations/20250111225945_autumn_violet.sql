/*
  # Storage setup for profile images
  
  1. Changes
    - Creates profiles storage bucket
    - Sets up storage policies for profile images
  
  2. Security
    - Public read access for profile images
    - Authenticated users can upload their own images
    - Users can only update/delete their own images
    
  Note: Uses IF NOT EXISTS and DROP IF EXISTS to handle idempotency
*/

-- Create profiles bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('profiles', 'profiles', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Profile images are publicly accessible" ON storage.objects;
    DROP POLICY IF EXISTS "Users can upload their own profile image" ON storage.objects;
    DROP POLICY IF EXISTS "Users can update their own profile image" ON storage.objects;
    DROP POLICY IF EXISTS "Users can delete their own profile image" ON storage.objects;
EXCEPTION
    WHEN undefined_object THEN null;
END $$;

-- Set up storage policy for profile images
CREATE POLICY "Profile images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'profiles');

CREATE POLICY "Users can upload their own profile image"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'profiles' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Users can update their own profile image"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'profiles' AND
    auth.uid() = owner
  );

CREATE POLICY "Users can delete their own profile image"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'profiles' AND
    auth.uid() = owner
  );