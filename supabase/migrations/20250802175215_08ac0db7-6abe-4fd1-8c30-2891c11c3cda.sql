
-- Create policy to allow authenticated users to view contact submissions
CREATE POLICY "Authenticated users can view contact submissions"
  ON public.contact_submissions
  FOR SELECT
  USING (auth.role() = 'authenticated');
