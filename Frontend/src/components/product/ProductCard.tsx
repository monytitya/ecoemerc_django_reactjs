import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import type { Product } from '../../types';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group flex flex-col justify-between bg-white text-left select-none">
      {/* Product Image Area */}
      <Link
        to={`/product/${product.slug}`}
        className="relative block aspect-[4/5] bg-[#f5f5f5] overflow-hidden rounded-sm"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {product.tag && (
          <span className="absolute top-2 left-2 bg-black text-white text-[9px] font-bold tracking-widest uppercase px-2 py-0.5">
            {product.tag}
          </span>
        )}
      </Link>

      {/* Info & Add to Cart button */}
      <div className="pt-3 pb-1 space-y-1.5 flex-1 flex flex-col justify-between">
        <div>
          <Link
            to={`/product/${product.slug}`}
            className="block text-xs font-semibold text-neutral-800 hover:text-black line-clamp-1 transition"
          >
            {product.name}
          </Link>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs font-bold text-black">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] text-neutral-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Sharp Black ADD TO CART Button matching screenshot */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => addToCart(product, 'M', 1)}
          className="w-full mt-2 bg-black hover:bg-neutral-800 text-white text-[11px] font-bold tracking-widest uppercase py-2.5 transition rounded-none shadow-sm"
        >
          ADD TO CART
        </motion.button>
      </div>
    </div>
  );
};

