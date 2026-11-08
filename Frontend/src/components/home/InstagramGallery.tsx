import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const InstagramGallery: React.FC = () => {
  const instaImages = [
    'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1544441893-675973e31985?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=400&auto=format&fit=crop&q=80',
  ];

  return (
    <section className="bg-black text-white py-12 border-t border-neutral-900 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-2 text-left">
          <div>
            <h3 className="text-xs font-black tracking-[0.2em] uppercase text-white">
              FOLLOW US ON INSTAGRAM
            </h3>
            <p className="text-[11px] text-neutral-400 font-medium">@neon.thrift</p>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white transition font-bold tracking-wider"
          >
            VIEW FEED <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Gallery Strip matching screenshot */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {instaImages.map((src, index) => (
            <motion.a
              key={index}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.03 }}
              className="group relative aspect-square overflow-hidden bg-neutral-900 rounded-xs block"
            >
              <img
                src={src}
                alt="NEON Streetwear Community"
                className="w-full h-full object-cover object-center grayscale contrast-110 brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs font-bold tracking-widest uppercase">
                  @NEON
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

