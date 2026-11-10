import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { TopProduct } from '../../types/dashboard';

interface CongratulationsCardProps {
  products?: TopProduct[];
  isLoading: boolean;
}

export const CongratulationsCard: React.FC<CongratulationsCardProps> = ({
  products = [],
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((c) => (c === 0 ? products.length - 1 : c - 1));
  };

  const next = () => {
    setCurrentIndex((c) => (c === products.length - 1 ? 0 : c + 1));
  };

  const currentItem = products[currentIndex] || {
    name: 'T-shirt Rainbow White',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=80',
    sold: 271,
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#ECEDF0]/70 shadow-2xs text-left flex flex-col justify-between">
      <div>
        <h3 className="text-base font-bold text-[#0F1020] flex items-center gap-1.5">
          Congratulations! <span className="text-lg">🎉</span>
        </h3>
        <p className="text-xs text-[#8A8F9C] mt-1 leading-relaxed">
          Some of your products already have the highest buyers
        </p>
      </div>

      {/* 3D Carousel Stage matching screenshot */}
      <div className="my-6 relative flex items-center justify-center">
        {/* Left Arrow Button */}
        <button
          onClick={prev}
          className="absolute left-2 z-10 w-7 h-7 rounded-full bg-white border border-[#ECEDF0] shadow-sm flex items-center justify-center text-[#8A8F9C] hover:text-[#0F1020] transition"
          aria-label="Previous product"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Product Card Showcase */}
        <div className="relative flex items-center justify-center w-full max-w-[260px] h-[170px]">
          {/* Background Left Ghost Item */}
          <div className="absolute left-0 w-24 h-28 bg-[#1B1C2E] rounded-xl opacity-80 scale-90 -rotate-6 shadow-sm overflow-hidden flex items-center justify-center">
            <span className="text-[10px] text-white/40 uppercase font-black">Archive</span>
          </div>

          {/* Background Right Ghost Item */}
          <div className="absolute right-0 w-24 h-28 bg-[#F59E0B] rounded-xl opacity-90 scale-90 rotate-6 shadow-sm overflow-hidden flex items-center justify-center">
            <span className="text-[10px] text-white/50 uppercase font-black">Trending</span>
          </div>

          {/* Main Foreground Center Card */}
          <div className="relative z-10 w-36 h-40 bg-white rounded-2xl shadow-xl border border-neutral-100 p-2 flex flex-col items-center justify-center transition-all duration-300">
            <img
              src={currentItem.image}
              alt={currentItem.name}
              className="w-full h-full object-contain rounded-xl"
            />
          </div>
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={next}
          className="absolute right-2 z-10 w-7 h-7 rounded-full bg-white border border-[#ECEDF0] shadow-sm flex items-center justify-center text-[#8A8F9C] hover:text-[#0F1020] transition"
          aria-label="Next product"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Product Name & Sold Count */}
      <div className="text-center pt-2">
        <h4 className="text-xs font-bold text-[#0F1020]">{currentItem.name}</h4>
        <p className="text-[11px] font-semibold text-[#8A8F9C] mt-0.5">{currentItem.sold} sold</p>
      </div>
    </div>
  );
};

