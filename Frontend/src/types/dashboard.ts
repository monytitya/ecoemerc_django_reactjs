export interface UserProfile {
  name: string;
  avatar: string;
  verified: boolean;
  email?: string;
  role?: string;
}

export interface MetricCard {
  value: number;
  change: number;
  isPositive: boolean;
}

export interface DashboardSummary {
  totalProducts: MetricCard;
  completedOrders: MetricCard;
  canceledOrders: MetricCard;
  topProducts: MetricCard;
}

export interface SalesSeriesPoint {
  date: string;
  transactions: number;
  products: number;
  sales: number;
}

export interface SalesReport {
  total: number;
  change: number;
  difference: number;
  isPositive: boolean;
  series: SalesSeriesPoint[];
}

export type SalesRange = '1d' | '7d' | '30d' | '16m' | 'max';
export type SalesMetric = 'total' | 'transactions' | 'products';

export interface OrderTransaction {
  id: string;
  item: string;
  date: string;
  price: number;
  platform: 'Shopee' | 'TikTok' | 'Tokopedia' | 'Online Store';
  status: 'Completed' | 'Pending' | 'Canceled';
}

export interface TopProduct {
  id: string;
  name: string;
  image: string;
  sold: number;
  price: number;
}

export interface SalesChannelApp {
  id: string;
  name: string;
  logo: string;
  count?: number;
}

