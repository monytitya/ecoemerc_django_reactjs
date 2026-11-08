import React from 'react';
import { Truck, Award, RotateCcw, Headphones } from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: <Truck className="w-5 h-5 text-neutral-800" />,
      title: 'FREE SHIPPING',
      desc: 'On all orders above ₹1499',
    },
    {
      icon: <Award className="w-5 h-5 text-neutral-800" />,
      title: 'PREMIUM QUALITY',
      desc: 'Handpicked & quality checked',
    },
    {
      icon: <RotateCcw className="w-5 h-5 text-neutral-800" />,
      title: 'EASY RETURNS',
      desc: 'Hassle free returns',
    },
    {
      icon: <Headphones className="w-5 h-5 text-neutral-800" />,
      title: '24/7 SUPPORT',
      desc: "We're here to help",
    },
  ];

  return (
    <section className="border-b border-neutral-100 bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-neutral-100 text-center">
          {benefits.map((item, index) => (
            <div key={index} className="flex flex-col items-center justify-center p-3 space-y-1.5">
              <div className="mb-1">{item.icon}</div>
              <h3 className="text-xs font-black tracking-wider uppercase text-black">
                {item.title}
              </h3>
              <p className="text-[11px] text-neutral-500 font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

