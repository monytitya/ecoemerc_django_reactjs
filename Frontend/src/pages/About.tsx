import React from 'react';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-left space-y-8">
      <span className="text-[10px] font-bold tracking-[0.25em] text-neutral-400 uppercase">
        OUR STORY
      </span>
      <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase text-black">
        NEON THRIFTED CULTURE
      </h1>
      <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
        Founded in 2024, NEON was born out of a desire to counter fast fashion with intentional, hand-curated archival streetwear. Every single piece is handpicked across international vintage markets, authenticated, washed, and prepped to ensure premium longevity.
      </p>

      <div className="aspect-[16/9] overflow-hidden bg-neutral-900 rounded-sm">
        <img
          src="https://images.unsplash.com/photo-1544441893-675973e31985?w=1000&auto=format&fit=crop&q=80"
          alt="NEON Warehouse"
          className="w-full h-full object-cover contrast-105 brightness-90"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-neutral-100">
        <div>
          <h3 className="text-xs font-black uppercase tracking-widest text-black">1. ETHICAL THRIFTING</h3>
          <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
            Giving life back to pre-loved vintage garments to keep fashion circular.
          </p>
        </div>
        <div>
          <h3 className="text-xs font-black uppercase tracking-widest text-black">2. STRICT QUALITY CHECK</h3>
          <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
            Every seam, zipper, and print is inspected prior to release.
          </p>
        </div>
        <div>
          <h3 className="text-xs font-black uppercase tracking-widest text-black">3. DROPS WEEKLY</h3>
          <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
            Fresh one-of-a-kind streetwear drops every Friday at 8:00 PM.
          </p>
        </div>
      </div>

      <div className="pt-6">
        <Link
          to="/shop"
          className="inline-block bg-black text-white text-xs font-bold tracking-widest uppercase px-8 py-3.5 hover:bg-neutral-800 transition"
        >
          EXPLORE THE ARCHIVE
        </Link>
      </div>
    </div>
  );
};

