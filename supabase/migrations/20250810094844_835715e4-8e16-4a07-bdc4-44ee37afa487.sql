
-- Add missing columns to contact_submissions table
ALTER TABLE public.contact_submissions 
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS company text,
ADD COLUMN IF NOT EXISTS project_type text,
ADD COLUMN IF NOT EXISTS timeline text,
ADD COLUMN IF NOT EXISTS referral text;

-- Update the table to ensure all fields are properly configured
ALTER TABLE public.contact_submissions 
ALTER COLUMN budget DROP NOT NULL;
