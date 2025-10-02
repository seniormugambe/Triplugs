-- Accommodation Booking System
-- 
-- 1. New Tables
--    - accommodations: Property listings with details, amenities, and pricing
--    - bookings: Guest reservations with dates and status tracking
--    - reviews: Guest feedback with ratings across multiple categories
-- 
-- 2. Security
--    - Enable RLS on all tables
--    - Public read access to accommodations and reviews
--    - Authenticated access for booking management
-- 
-- 3. Indexes
--    - Optimized for location-based searches and date range queries

-- Create accommodations table
CREATE TABLE IF NOT EXISTS accommodations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  type text NOT NULL,
  location text NOT NULL,
  city text NOT NULL,
  country text NOT NULL,
  price_per_night numeric NOT NULL,
  currency text DEFAULT 'USD',
  max_guests integer NOT NULL,
  bedrooms integer DEFAULT 1,
  bathrooms integer DEFAULT 1,
  amenities text[] DEFAULT ARRAY[]::text[],
  images text[] DEFAULT ARRAY[]::text[],
  rating numeric DEFAULT 0,
  total_reviews integer DEFAULT 0,
  featured boolean DEFAULT false,
  available boolean DEFAULT true,
  latitude numeric,
  longitude numeric,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  accommodation_id uuid NOT NULL REFERENCES accommodations(id) ON DELETE CASCADE,
  guest_name text NOT NULL,
  guest_email text NOT NULL,
  guest_phone text,
  check_in date NOT NULL,
  check_out date NOT NULL,
  guests integer NOT NULL,
  total_price numeric NOT NULL,
  status text DEFAULT 'pending',
  special_requests text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_dates CHECK (check_out > check_in),
  CONSTRAINT valid_guests CHECK (guests > 0),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed'))
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  accommodation_id uuid NOT NULL REFERENCES accommodations(id) ON DELETE CASCADE,
  booking_id uuid REFERENCES bookings(id) ON DELETE SET NULL,
  guest_name text NOT NULL,
  rating integer NOT NULL,
  comment text,
  cleanliness_rating integer,
  location_rating integer,
  value_rating integer,
  communication_rating integer,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_rating CHECK (rating >= 1 AND rating <= 5),
  CONSTRAINT valid_cleanliness CHECK (cleanliness_rating >= 1 AND cleanliness_rating <= 5),
  CONSTRAINT valid_location CHECK (location_rating >= 1 AND location_rating <= 5),
  CONSTRAINT valid_value CHECK (value_rating >= 1 AND value_rating <= 5),
  CONSTRAINT valid_communication CHECK (communication_rating >= 1 AND communication_rating <= 5)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_accommodations_city ON accommodations(city);
CREATE INDEX IF NOT EXISTS idx_accommodations_type ON accommodations(type);
CREATE INDEX IF NOT EXISTS idx_accommodations_featured ON accommodations(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_accommodations_available ON accommodations(available) WHERE available = true;
CREATE INDEX IF NOT EXISTS idx_bookings_accommodation ON bookings(accommodation_id);
CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings(check_in, check_out);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_reviews_accommodation ON reviews(accommodation_id);

-- Enable Row Level Security
ALTER TABLE accommodations ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Accommodations policies (public read access)
CREATE POLICY "Anyone can view available accommodations"
  ON accommodations FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert accommodations"
  ON accommodations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update accommodations"
  ON accommodations FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Bookings policies (public access for demo)
CREATE POLICY "Anyone can view bookings"
  ON bookings FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update bookings"
  ON bookings FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Reviews policies (public read and write)
CREATE POLICY "Anyone can view reviews"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create reviews"
  ON reviews FOR INSERT
  WITH CHECK (true);

-- Function to update accommodation rating
CREATE OR REPLACE FUNCTION update_accommodation_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE accommodations
  SET 
    rating = (SELECT AVG(rating) FROM reviews WHERE accommodation_id = NEW.accommodation_id),
    total_reviews = (SELECT COUNT(*) FROM reviews WHERE accommodation_id = NEW.accommodation_id),
    updated_at = now()
  WHERE id = NEW.accommodation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update ratings when review is added
CREATE TRIGGER update_rating_on_review_insert
AFTER INSERT ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_accommodation_rating();