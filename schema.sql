-- Mauli Laundry - Supabase Schema
-- Run this in the Supabase SQL Editor to create all tables.

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  address TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_customers_mobile ON customers(mobile);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  order_id TEXT UNIQUE NOT NULL,
  customer_id TEXT DEFAULT '',
  customer_name TEXT NOT NULL,
  customer_mobile TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]',
  total_amount REAL NOT NULL DEFAULT 0,
  pickup_date TEXT NOT NULL,
  pickup_time TEXT NOT NULL,
  service_type TEXT DEFAULT 'press',
  status TEXT DEFAULT 'Order Received',
  payment_id TEXT DEFAULT '',
  razorpay_order_id TEXT DEFAULT '',
  amount_paid REAL DEFAULT 0,
  payment_status TEXT DEFAULT 'Pending',
  payment_method TEXT DEFAULT '',
  payment_date TIMESTAMPTZ,
  payment_mode TEXT DEFAULT 'online',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_order_id ON orders(order_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id BIGSERIAL PRIMARY KEY,
  customer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  order_id TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  features JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pricing table
CREATE TABLE IF NOT EXISTS pricing (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  press_price REAL NOT NULL DEFAULT 0,
  wash_press_price REAL NOT NULL DEFAULT 0,
  icon TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT DEFAULT '',
  mobile TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);

-- Row Level Security (optional - disable if using service role)
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow public read/write for anon key (adjust for production)
CREATE POLICY "Allow all on customers" ON customers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on orders" ON orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on reviews" ON reviews FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on services" ON services FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on pricing" ON pricing FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on contacts" ON contacts FOR ALL USING (true) WITH CHECK (true);

-- Payment migration (run for existing deployments)
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_id TEXT DEFAULT '';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS razorpay_order_id TEXT DEFAULT '';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS amount_paid REAL DEFAULT 0;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'Pending';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT '';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_date TIMESTAMPTZ;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_mode TEXT DEFAULT 'online';
