import { supabase } from './supabase';

export { supabase };

export interface Category {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  slug: string;
  parent_id?: string;
  display_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  short_description?: string;
  category_id?: string;
  price: number;
  compare_at_price?: number;
  cost?: number;
  sku?: string;
  barcode?: string;
  stock_quantity: number;
  low_stock_threshold: number;
  images: string[];
  thumbnail_url?: string;
  weight?: number;
  dimensions?: any;
  tags: string[];
  featured: boolean;
  active: boolean;
  rating: number;
  total_reviews: number;
  total_sales: number;
  metadata?: any;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string;
  session_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  product?: Product;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  shipping_address: ShippingAddress;
  billing_address?: ShippingAddress;
  subtotal: number;
  tax: number;
  shipping_cost: number;
  discount: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_method?: string;
  notes?: string;
  tracking_number?: string;
  shipped_at?: string;
  delivered_at?: string;
  cancelled_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ShippingAddress {
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state?: string;
  postal_code?: string;
  country: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  product_sku?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
}

export interface ProductReview {
  id: string;
  product_id: string;
  order_id?: string;
  customer_name: string;
  rating: number;
  title?: string;
  comment?: string;
  verified_purchase: boolean;
  helpful_count: number;
  created_at: string;
}

export const getSessionId = (): string => {
  let sessionId = localStorage.getItem('shopping_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('shopping_session_id', sessionId);
  }
  return sessionId;
};

export const clearSessionId = (): void => {
  localStorage.removeItem('shopping_session_id');
};
