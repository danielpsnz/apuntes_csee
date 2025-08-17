-- Create orders table for tracking purchases
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  items JSONB NOT NULL,
  total_amount INTEGER NOT NULL, -- Amount in cents
  currency TEXT DEFAULT 'eur',
  stripe_session_id TEXT UNIQUE,
  status TEXT DEFAULT 'pending', -- pending, paid, failed
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policy to allow reading orders by email (for guest checkouts)
CREATE POLICY "allow_read_own_orders" ON public.orders
  FOR SELECT
  USING (true); -- Allow reading for now since we're dealing with guest checkouts

-- Create policy for edge functions to insert orders
CREATE POLICY "allow_insert_orders" ON public.orders
  FOR INSERT
  WITH CHECK (true);

-- Create policy for edge functions to update orders
CREATE POLICY "allow_update_orders" ON public.orders
  FOR UPDATE
  USING (true);

-- Create function to update updated_at column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();