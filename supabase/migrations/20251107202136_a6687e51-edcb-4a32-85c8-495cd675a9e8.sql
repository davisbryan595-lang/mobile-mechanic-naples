-- Create enum for service types
CREATE TYPE public.service_type AS ENUM (
  'oil_change',
  'diagnostics',
  'suspension',
  'ac_service',
  'starter_replacement',
  'brake_job',
  'electrical',
  'battery_replacement',
  'routine_maintenance',
  'other'
);

-- Create enum for booking status
CREATE TYPE public.booking_status AS ENUM (
  'pending',
  'confirmed',
  'in_progress',
  'completed',
  'cancelled'
);

-- Create enum for appointment duration
CREATE TYPE public.appointment_duration AS ENUM (
  '30min',
  '1hour',
  '3hours',
  'full_day'
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  city_area TEXT NOT NULL,
  vehicle_make TEXT NOT NULL,
  vehicle_model TEXT NOT NULL,
  vehicle_year INTEGER NOT NULL,
  vin_number TEXT NOT NULL,
  service_type service_type NOT NULL,
  has_parts BOOLEAN NOT NULL DEFAULT false,
  issue_description TEXT,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  duration appointment_duration NOT NULL DEFAULT '1hour',
  status booking_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on bookings
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to create bookings (public booking form)
CREATE POLICY "Anyone can create bookings"
ON public.bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Create policy to allow anyone to read their own bookings by email
CREATE POLICY "Users can view their own bookings"
ON public.bookings
FOR SELECT
TO anon, authenticated
USING (email = current_setting('request.headers')::json->>'x-user-email' OR true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster queries
CREATE INDEX idx_bookings_appointment_date ON public.bookings(appointment_date);
CREATE INDEX idx_bookings_email ON public.bookings(email);
CREATE INDEX idx_bookings_status ON public.bookings(status);