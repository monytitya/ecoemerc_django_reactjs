import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../../services/api';
import type { CategoryItem } from '../../types';

export const Categories: React.FC = () => {
  const [categoryList, setCategoryList] = useState<CategoryItem[]>([]);

  useEffect(() => {
    let isMounted = true;
    api.getCategories().then((data) => {
      if (isMounted) setCategoryList(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 className="text-sm sm:text-base font-black tracking-[0.2em] uppercase text-black">
            SHOP BY CATEGORY
          </h2>
          <div className="w-10 h-0.5 bg-black mx-auto mt-2.5" />
        </div>

        {/* 5 Column Grid matching Screenshot */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {categoryList.slice(0, 5).map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={`/shop?category=${cat.slug}`}
                className="group relative block aspect-[3/4] overflow-hidden bg-neutral-900 rounded-sm"
              >
                {/* Background Image with Zoom */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center grayscale contrast-110 brightness-75 group-hover:scale-110 group-hover:brightness-90 transition-all duration-700"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                {/* Centered Text Overlay matching screenshot */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <h3 className="text-sm sm:text-base font-black tracking-widest text-white uppercase drop-shadow-md">
                    {cat.name}
                  </h3>
                  <span className="mt-2 text-[10px] font-bold tracking-widest text-neutral-300 uppercase underline underline-offset-4 group-hover:text-white transition">
                    SHOP NOW
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
