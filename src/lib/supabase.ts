import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Accommodation {
  id: string;
  name: string;
  description: string;
  type: string;
  location: string;
  city: string;
  country: string;
  price_per_night: number;
  currency: string;
  max_guests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  images: string[];
  rating: number;
  total_reviews: number;
  featured: boolean;
  available: boolean;
  latitude?: number;
  longitude?: number;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  accommodation_id: string;
  guest_name: string;
  guest_email: string;
  guest_phone?: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  special_requests?: string;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  accommodation_id: string;
  booking_id?: string;
  guest_name: string;
  rating: number;
  comment?: string;
  cleanliness_rating?: number;
  location_rating?: number;
  value_rating?: number;
  communication_rating?: number;
  created_at: string;
}
