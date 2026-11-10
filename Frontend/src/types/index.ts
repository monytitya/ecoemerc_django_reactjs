export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: 'hoodies' | 't-shirts' | 'pants' | 'jackets' | 'accessories';
  categoryName: string;
  image: string;
  secondaryImage?: string;
  description: string;
  sizes: ('S' | 'M' | 'L' | 'XL')[];
  tag?: string;
  rating?: number;
  reviewsCount?: number;
  isTrending?: boolean;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface UserProfileData {
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  state?: string;
  country?: string;
  profile_picture?: string;
}

export interface AuthUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone_number?: string;
  date_joined?: string;
  is_staff?: boolean;
  is_admin?: boolean;
  profile?: UserProfileData;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface AuthResponse {
  message: string;
  tokens: AuthTokens;
  user: AuthUser;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  confirm_password: string;
}


