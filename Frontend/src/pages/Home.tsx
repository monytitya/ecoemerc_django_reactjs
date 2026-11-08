import React from 'react';
import { Hero } from '../components/home/Hero';
import { Benefits } from '../components/home/Benefits';
import { Categories } from '../components/home/Categories';
import { TrendingProducts } from '../components/home/TrendingProducts';
import { PromotionalBanners } from '../components/home/PromotionalBanners';
import { InstagramGallery } from '../components/home/InstagramGallery';

export const Home: React.FC = () => {
  return (
    <div className="space-y-0">
      <Hero />
      <Benefits />
      <Categories />
      <TrendingProducts />
      <PromotionalBanners />
      <InstagramGallery />
    </div>
  );
};

