import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import type { Product } from '../../types';

export const Hero: React.FC = () => {
  const { addToCart } = useCart();

  const shelfProducts: Product[] = [
    {
      id: 'nv-1',
      name: 'TECH JACKET',
      slug: 'tech-jacket',
      price: 189,
      category: 'jackets',
      categoryName: 'Jackets',
      image: '/item-tech-jacket.jpg',
      description: 'Tactical weather-resistant tech shell jacket with concealed utility zippers, storm collar, and modular hardware.',
      sizes: ['S', 'M', 'L', 'XL'],
      isTrending: true,
    },
    {
      id: 'nv-2',
      name: 'CARGO PANTS',
      slug: 'cargo-pants',
      price: 129,
      category: 'pants',
      categoryName: 'Pants',
      image: '/item-cargo-pants.jpg',
      description: 'Heavyweight black tactical cargo trousers engineered with deep bellows utility pockets and reinforced knee paneling.',
      sizes: ['S', 'M', 'L', 'XL'],
      isTrending: true,
    },
    {
      id: 'nv-3',
      name: 'LOGO HOODIE',
      slug: 'logo-hoodie',
      price: 99,
      category: 'hoodies',
      categoryName: 'Hoodies',
      image: '/item-logo-hoodie.jpg',
      description: '500 GSM luxury French terry drop-shoulder black hoodie featuring subtle tonal micro-print branding.',
      sizes: ['S', 'M', 'L', 'XL'],
      isTrending: true,
    },
    {
      id: 'nv-4',
      name: 'LOGO CAP',
      slug: 'logo-cap',
      price: 49,
      category: 'accessories',
      categoryName: 'Accessories',
      image: '/item-logo-cap.jpg',
      description: 'Structured 6-panel technical cotton strapback cap with matte black tonal embroidered emblem.',
      sizes: ['M'],
      isTrending: true,
    },
  ];

  return (
    <section className="relative w-full bg-black text-white overflow-hidden select-none">
      {/* ─── Hero Main Banner ─── */}
      <div className="relative min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center">
        {/* Full-width Background Image directly from reference */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-banner.jpg"
            alt="Nevermore Hero Model"
            className="w-full h-full object-cover object-[72%_center] sm:object-right filter contrast-[1.04]"
          />
          {/* Subtle deep gradient overlays ensuring crisp typography contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent sm:via-black/40" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        {/* Hero Left Content Overlay */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-xl text-left space-y-6"
          >
            {/* Bold Hero Header: THE STREETS ARE YOURS. */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-[-0.03em] leading-[0.92] uppercase font-sans text-white">
              THE STREETS
              <br />
              ARE YOURS.
            </h1>

            {/* Collection Subtitle & Copy */}
            <div className="space-y-2 pt-1">
              <p className="text-xs sm:text-[13px] font-bold tracking-[0.16em] text-neutral-200 uppercase">
                NEVERMORE A/W COLLECTION
              </p>
              <p className="text-xs sm:text-[13px] text-neutral-400 font-normal leading-relaxed max-w-sm">
                Premium streetwear crafted for the bold.
                <br />
                Designed to stand out. Built to last.
              </p>
            </div>

            {/* Outlined White SHOP NOW Button */}
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-block border border-white text-white hover:bg-white hover:text-black font-bold text-xs tracking-[0.2em] uppercase px-8 py-3 transition-colors duration-200"
              >
                SHOP NOW
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── Bottom Shelf: 4 Product Cards Grid ─── */}
      <div className="relative z-20 bg-black border-t border-neutral-900">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-8 sm:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {shelfProducts.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
                className="border border-neutral-900 bg-neutral-950 p-3 sm:p-4 text-left flex flex-col justify-between hover:border-neutral-700 transition-colors duration-200 group"
              >
                {/* Product Image Stage */}
                <Link
                  to={`/product/${item.slug}`}
                  className="relative aspect-square w-full bg-black overflow-hidden flex items-center justify-center mb-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain filter contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                {/* Name & Price */}
                <div className="space-y-1">
                  <Link
                    to={`/product/${item.slug}`}
                    className="block text-[11px] sm:text-xs font-bold tracking-wider uppercase text-neutral-200 group-hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                  <p className="text-[11px] sm:text-xs font-semibold text-neutral-400">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                {/* ADD TO BAG Outlined Button */}
                <button
                  onClick={() => addToCart(item, 'M', 1)}
                  className="mt-3.5 w-full border border-neutral-800 hover:border-white hover:bg-white hover:text-black text-neutral-300 text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase py-2 transition-colors duration-200"
                >
                  ADD TO BAG
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
