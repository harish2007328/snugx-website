
-- Add a new column for full page screenshot URL
ALTER TABLE public.case_studies 
ADD COLUMN full_page_image text;

-- Update the updated_at trigger to work with the new column
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;
