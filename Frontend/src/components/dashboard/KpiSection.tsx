import React from 'react';
import { Package, CheckSquare, XSquare, Star } from 'lucide-react';
import { Badge, Skeleton } from '../ui/Feedback';
import type { MetricCard as MetricCardType } from '../../types/dashboard';

interface KpiSectionProps {
  summary?: {
    totalProducts: MetricCardType;
    completedOrders: MetricCardType;
    canceledOrders: MetricCardType;
    topProducts: MetricCardType;
  };
  isLoading: boolean;
}

export const KpiSection: React.FC<KpiSectionProps> = ({ summary, isLoading }) => {
  if (isLoading || !summary) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-2xl" />
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: 'Total products',
      value: summary.totalProducts.value,
      change: summary.totalProducts.change,
      isPositive: summary.totalProducts.isPositive,
      icon: <Package className="w-4 h-4 text-[#0F1020]" />,
    },
    {
      title: 'Completed order',
      value: summary.completedOrders.value,
      change: summary.completedOrders.change,
      isPositive: summary.completedOrders.isPositive,
      icon: <CheckSquare className="w-4 h-4 text-[#0F1020]" />,
    },
    {
      title: 'Canceled order',
      value: summary.canceledOrders.value,
      change: summary.canceledOrders.change,
      isPositive: summary.canceledOrders.isPositive,
      icon: <XSquare className="w-4 h-4 text-[#0F1020]" />,
    },
    {
      title: 'Top products',
      value: summary.topProducts.value,
      change: summary.topProducts.change,
      isPositive: summary.topProducts.isPositive,
      icon: <Star className="w-4 h-4 text-[#0F1020]" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-2xl p-5 border border-[#ECEDF0]/70 shadow-2xs hover:shadow-xs transition text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F4F5F7] flex items-center justify-center shrink-0">
              {card.icon}
            </div>
            <span className="text-xs font-semibold text-[#8A8F9C]">{card.title}</span>
          </div>

          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#0F1020] tracking-tight">
              {card.value.toLocaleString()}
            </span>
            <Badge variant={card.isPositive ? 'positive' : 'negative'}>
              {card.isPositive ? `+${card.change}%` : `-${card.change}%`}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
};

