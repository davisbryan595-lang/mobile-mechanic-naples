-- Create form_submissions table
CREATE TABLE IF NOT EXISTS public.form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  message TEXT NOT NULL,
  vehicle_type TEXT,
  preferred_date TEXT,
  how_heard_about_us TEXT,
  other_source TEXT,
  selected_services JSONB,
  estimated_total DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on form_submissions
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert form submissions
CREATE POLICY "Anyone can submit forms"
ON public.form_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Create policy to allow authenticated users to view submissions
CREATE POLICY "Authenticated users can view form submissions"
ON public.form_submissions
FOR SELECT
TO authenticated
USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_form_submissions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for automatic timestamp updates
DROP TRIGGER IF EXISTS update_form_submissions_updated_at ON public.form_submissions;
CREATE TRIGGER update_form_submissions_updated_at
BEFORE UPDATE ON public.form_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_form_submissions_updated_at();

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON public.form_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_form_submissions_email ON public.form_submissions(email);
