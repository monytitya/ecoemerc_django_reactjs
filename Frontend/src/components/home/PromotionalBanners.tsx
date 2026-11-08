import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const PromotionalBanners: React.FC = () => {
  const promos = [
    {
      title: 'NEW DROPS',
      subtitle: 'Every Week',
      buttonText: 'EXPLORE',
      link: '/shop?filter=new',
      image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=600&auto=format&fit=crop&q=80',
    },
    {
      title: 'PREMIUM THRIFT',
      subtitle: 'Handpicked Pieces',
      buttonText: 'EXPLORE',
      link: '/shop?filter=thrift',
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop&q=80',
    },
    {
      title: 'UP TO 50% OFF',
      subtitle: 'Limited Time Only',
      buttonText: 'SHOP SALE',
      link: '/shop?filter=sale',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {promos.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-black text-white rounded-sm group select-none"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover brightness-50 contrast-110 group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between items-start text-left">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight uppercase text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-300 tracking-wider uppercase mt-1">
                    {item.subtitle}
                  </p>
                </div>

                <Link
                  to={item.link}
                  className="inline-block bg-white text-black text-[11px] font-extrabold tracking-widest uppercase px-5 py-2.5 hover:bg-neutral-200 transition shadow-sm"
                >
                  {item.buttonText}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

