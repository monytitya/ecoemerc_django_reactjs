import React from 'react';

export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse bg-neutral-200/80 dark:bg-neutral-800 rounded-lg ${className}`} />
);

export const Badge: React.FC<{
  children: React.ReactNode;
  variant?: 'positive' | 'negative' | 'neutral' | 'brand';
  className?: string;
}> = ({ children, variant = 'neutral', className = '' }) => {
  const styles = {
    positive: 'bg-[#EBF9F3] text-[#3DBE8B] font-bold',
    negative: 'bg-[#FDF0EF] text-[#F0605D] font-bold',
    neutral: 'bg-neutral-100 text-neutral-600',
    brand: 'bg-[#0F1020] text-white',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] leading-tight ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

