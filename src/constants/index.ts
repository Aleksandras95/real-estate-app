// UI Constants
export const ITEMS_PER_PAGE = 6;

// Color scheme
export const COLORS = {
  primary: '#3E54EB',
  dark: '#0F1015',
  gray: '#A4A6AC',
  white: '#FFFFFF',
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  PROPERTIES: '/properties',
  LOGIN: '/login',
  REGISTER: '/registration',
  ADD_PROPERTY: '/add-property',
  MY_PROPERTIES: '/my-properties',
  FAVORITES: '/favorites',
  PROPERTY_DETAILS: '/property/:id',
  ABOUT_US: '/about-us',
} as const;

// Auth routes (routes that should hide header/footer)
export const AUTH_ROUTES = [ROUTES.LOGIN, ROUTES.REGISTER];

// Sort options
export const SORT_OPTIONS = {
  PRICE_ASC: 'price_asc',
  PRICE_DESC: 'price_desc',
  DATE_DESC: 'date_desc',
} as const;

// Property types
export const PROPERTY_TYPES = {
  HOUSE: 'house',
  APARTMENT: 'apartment',
  CONDO: 'condo',
  TOWNHOUSE: 'townhouse',
} as const;

// Deal types
export const DEAL_TYPES = {
  RENT: 'rent',
  SALE: 'sale',
} as const;

// API Messages
export const API_MESSAGES = {
  LOADING_ERROR: 'Failed to load data. Please try again.',
  NO_RESULTS: 'No results found matching your criteria.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
} as const;

// Form validation
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MIN_PASSWORD_LENGTH: 6,
} as const;