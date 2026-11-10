import type { Product, CategoryItem } from '../types';

const API_BASE = 'http://localhost:8000/api';

export interface DjangoCategory {
  id: number;
  category_name: string;
  slug: string;
  description: string;
  cat_image: string;
}

export interface DjangoProduct {
  id: number;
  product_name: string;
  slug: string;
  description: string;
  price: number;
  images: string;
  stock: number;
  is_available: boolean;
  category: DjangoCategory;
  average_review: number;
  review_count: number;
  created_date: string;
}

// Convert Django Category to Frontend CategoryItem
export function mapDjangoCategoryToCategoryItem(cat: DjangoCategory): CategoryItem {
  return {
    id: String(cat.id),
    name: cat.category_name.toUpperCase(),
    slug: cat.slug,
    image: cat.cat_image || 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80',
    itemCount: 12,
  };
}

// Convert Django Product to Frontend Product
export function mapDjangoProductToProduct(p: DjangoProduct): Product {
  const catSlug = p.category?.slug?.toLowerCase() || '';
  let category: Product['category'] = 't-shirts';
  if (catSlug.includes('hoodie')) category = 'hoodies';
  else if (catSlug.includes('jean') || catSlug.includes('pant')) category = 'pants';
  else if (catSlug.includes('jacket')) category = 'jackets';
  else if (catSlug.includes('shoe') || catSlug.includes('access')) category = 'accessories';
  else if (catSlug.includes('shirt')) category = 't-shirts';

  return {
    id: String(p.id),
    name: p.product_name,
    slug: p.slug,
    price: p.price,
    originalPrice: Math.round(p.price * 1.35),
    category: category,
    categoryName: p.category?.category_name || 'Streetwear',
    image: p.images || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
    description: p.description || 'Premium streetwear crafted for the bold. High quality textile.',
    sizes: ['S', 'M', 'L', 'XL'],
    tag: p.stock > 0 ? (p.price > 500 ? 'Trending' : 'Best Seller') : 'Sold Out',
    rating: p.average_review || 4.8,
    reviewsCount: p.review_count || 34,
    isTrending: true,
  };
}

export const api = {
  async getCategories(): Promise<CategoryItem[]> {
    try {
      const res = await fetch(`${API_BASE}/categories/`);
      if (!res.ok) throw new Error('Failed to fetch categories');
      const data = await res.json();
      const list: DjangoCategory[] = data.results || data;
      if (list && list.length > 0) {
        return list.map(mapDjangoCategoryToCategoryItem);
      }
    } catch (err) {
      console.warn('API error (getCategories), falling back to local dataset:', err);
    }
    const { categories } = await import('../data/categories');
    return categories;
  },

  async getProducts(categorySlug?: string, search?: string): Promise<Product[]> {
    try {
      let url = `${API_BASE}/products/`;
      const params = new URLSearchParams();
      if (categorySlug && categorySlug !== 'all') params.append('category', categorySlug);
      if (search) params.append('search', search);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      const list: DjangoProduct[] = data.results || data;
      if (list && list.length > 0) {
        return list.map(mapDjangoProductToProduct);
      }
    } catch (err) {
      console.warn('API error (getProducts), falling back to local dataset:', err);
    }
    const { products } = await import('../data/products');
    return products;
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    try {
      const products = await this.getProducts();
      return products.find((p) => p.slug === slug) || null;
    } catch {
      return null;
    }
  }
};
