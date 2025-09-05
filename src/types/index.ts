// Database Types
export interface Property {
  id: string;
  title: string;
  cover_image: string;
  description: string;
  location: string;
  price: number;
  type: string;
  deal_type: string;
  bedrooms?: number;
  bathrooms?: number;
  created_at: string;
  user_id?: string;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

// Authentication Types
export interface AuthUser {
  id: string;
  email?: string;
  user_metadata?: {
    first_name?: string;
    last_name?: string;
  };
  created_at?: string;
  updated_at?: string;
}

// Filter Types
export interface FilterState {
  location: string;
  priceRange: [number, number];
  price: string;
  type: string;
  bedrooms: number | null;
  deal_type: string;
  bathrooms: number | null;
}

export interface FilterActions {
  setLocation: (value: string) => void;
  setPrice: (value: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setDealType: (value: string) => void;
  setType: (value: string) => void;
  setBedrooms: (value: number | null) => void;
  setBathrooms: (value: number | null) => void;
  resetFilters: () => void;
}

// Component Props Types
export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface PropertyItemProps {
  item: Property;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

// Sort Options
export type SortOption = 'price_asc' | 'price_desc' | 'date_desc';

// Deal Types
export type DealType = 'rent' | 'sale';

// Property Types
export type PropertyType = 'house' | 'apartment' | 'condo' | 'townhouse';