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

