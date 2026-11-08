import React, { useState } from 'react';
import { ProductCard } from '../product/ProductCard';
import { products } from '../../data/products';
import { motion } from 'framer-motion';

export const TrendingProducts: React.FC = () => {
  const [activePage, setActivePage] = useState(0);
  const trendingList = products.slice(0, 6);

  return (
    <section className="py-14 sm:py-20 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-sm sm:text-base font-black tracking-[0.2em] uppercase text-black">
            TRENDING NOW
          </h2>
          <div className="w-10 h-0.5 bg-black mx-auto mt-2.5" />
        </div>

        {/* 6 Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5"
        >
          {trendingList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>

        {/* Carousel Indicators matching screenshot */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              onClick={() => setActivePage(idx)}
              className={`h-1.5 rounded-full transition-all ${
                activePage === idx ? 'w-5 bg-black' : 'w-1.5 bg-neutral-300'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

