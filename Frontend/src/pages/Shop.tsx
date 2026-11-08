import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/product/ProductCard';
import { products } from '../data/products';
import { Filter, SlidersHorizontal } from 'lucide-react';

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const filterParam = searchParams.get('filter') || 'all';

  const [sortBy, setSortBy] = useState<'featured' | 'low-high' | 'high-low'>('featured');
  const [selectedSize, setSelectedSize] = useState<string>('all');

  const categories = [
    { label: 'All Categories', slug: 'all' },
    { label: 'Hoodies', slug: 'hoodies' },
    { label: 'T-Shirts', slug: 't-shirts' },
    { label: 'Pants', slug: 'pants' },
    { label: 'Jackets', slug: 'jackets' },
    { label: 'Accessories', slug: 'accessories' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (categoryParam !== 'all' && p.category !== categoryParam) return false;
        if (filterParam === 'new' && !p.tag?.includes('Trending')) return false;
        if (filterParam === 'sale' && !p.originalPrice) return false;
        if (selectedSize !== 'all' && !p.sizes.includes(selectedSize as any)) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'low-high') return a.price - b.price;
        if (sortBy === 'high-low') return b.price - a.price;
        return 0;
      });
  }, [categoryParam, filterParam, selectedSize, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 text-left">
      {/* Title & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-neutral-100 gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.25em] text-neutral-400 uppercase">
            NEON ARCHIVE
          </span>
          <h1 className="text-3xl font-black tracking-tight uppercase text-black mt-1">
            {categoryParam === 'all' ? 'ALL PRODUCTS' : categoryParam.toUpperCase()}
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Showing {filteredProducts.length} premium handpicked thrift garments
          </p>
        </div>

        {/* Sort & Quick Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 px-3 py-1.5 text-xs font-semibold">
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 px-3 py-1.5 text-xs font-semibold">
            <Filter className="w-3.5 h-3.5 text-neutral-500" />
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="all">All Sizes</option>
              <option value="S">Size S</option>
              <option value="M">Size M</option>
              <option value="L">Size L</option>
              <option value="XL">Size XL</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto py-6 border-b border-neutral-100 scrollbar-none">
        {categories.map((c) => (
          <button
            key={c.slug}
            onClick={() => setSearchParams({ category: c.slug })}
            className={`px-4 py-2 text-xs font-bold tracking-widest uppercase transition whitespace-nowrap ${
              categoryParam === c.slug
                ? 'bg-black text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="pt-10">
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center text-neutral-400 space-y-2">
            <p className="text-sm font-bold uppercase tracking-wider">No products found</p>
            <p className="text-xs">Try selecting a different category or resetting filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

