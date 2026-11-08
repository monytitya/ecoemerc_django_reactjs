import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { Truck, ShieldCheck, Share2, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProductDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();

  const product = products.find((p) => p.slug === slug) || products[0];
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 text-left">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-neutral-500 mb-8">
        <Link to="/" className="hover:text-black">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-black">Shop</Link>
        <span>/</span>
        <span className="text-black font-semibold truncate max-w-xs">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left: Image Showcase */}
        <div className="space-y-4">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-[4/5] bg-neutral-100 overflow-hidden rounded-sm border border-neutral-200"
          >
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>

          {/* Thumbnails */}
          {product.secondaryImage && (
            <div className="flex gap-3">
              {[product.image, product.secondaryImage].map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 aspect-square border overflow-hidden rounded-xs ${
                    activeImage === img ? 'border-black ring-1 ring-black' : 'border-neutral-200 opacity-70'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Buy Details */}
        <div className="space-y-6">
          <div>
            <span className="text-[10px] font-bold tracking-[0.25em] text-neutral-400 uppercase">
              {product.categoryName} • THRIFT ARCHIVE
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight uppercase text-black mt-1">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mt-3">
              <span className="text-2xl font-black text-black">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-neutral-400 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5">
                SAVE ₹{((product.originalPrice || product.price) - product.price).toLocaleString()}
              </span>
            </div>
          </div>

          <p className="text-xs text-neutral-600 leading-relaxed pt-2 border-t border-neutral-100">
            {product.description}
          </p>

          {/* Size Selector */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold uppercase tracking-wider text-black">SELECT SIZE</span>
              <span className="text-neutral-400 cursor-pointer underline text-[11px]">Size Guide</span>
            </div>
            <div className="flex gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`w-12 h-12 flex items-center justify-center text-xs font-bold transition border ${
                    selectedSize === s
                      ? 'border-black bg-black text-white'
                      : 'border-neutral-300 bg-white text-neutral-800 hover:border-black'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              <div className="flex items-center border border-neutral-300 bg-white px-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 py-2 text-neutral-600 hover:text-black font-bold"
                >
                  -
                </button>
                <span className="px-3 text-xs font-bold text-black">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 py-2 text-neutral-600 hover:text-black font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => addToCart(product, selectedSize, quantity)}
                className="flex-1 bg-black hover:bg-neutral-800 text-white text-xs font-bold tracking-widest uppercase py-3.5 transition shadow-sm"
              >
                ADD TO CART
              </button>
            </div>

            <div className="flex items-center gap-4 pt-2 text-xs text-neutral-500">
              <button onClick={handleShare} className="flex items-center gap-1.5 hover:text-black transition">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Link Copied!' : 'Share Product'}</span>
              </button>
            </div>
          </div>

          {/* Guarantees Box */}
          <div className="border border-neutral-200 bg-neutral-50/70 p-4 space-y-2 text-xs text-neutral-700">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-neutral-900" />
              <span>Free standard shipping across India on orders over ₹1,499.</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-neutral-900" />
              <span>100% Authentic quality checked vintage & reworked item.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
