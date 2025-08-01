
-- Add original_image field to case_studies table
ALTER TABLE public.case_studies 
ADD COLUMN original_image TEXT;
