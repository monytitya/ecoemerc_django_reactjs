import type {
  UserProfile,
  DashboardSummary,
  SalesReport,
  OrderTransaction,
  TopProduct,
  SalesChannelApp,
  SalesRange,
  SalesMetric
} from '../types/dashboard';

// Sample Mock/Fallback dataset matching Saledash UI precisely
export const mockUser: UserProfile = {
  name: 'Jonathan',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  verified: true,
  email: 'jonathan@neonarchive.com',
  role: 'Store Admin',
};

export const mockChannels: SalesChannelApp[] = [
  { id: '1', name: 'Shopee', logo: 'https://cdn-icons-png.flaticon.com/512/888/888879.png', count: 142 },
  { id: '2', name: 'TikTok', logo: 'https://cdn-icons-png.flaticon.com/512/3046/3046121.png', count: 89 },
  { id: '3', name: 'Tokopedia', logo: 'https://cdn-icons-png.flaticon.com/512/888/888870.png', count: 104 },
];

export const mockSummary: DashboardSummary = {
  totalProducts: { value: 250, change: 2.5, isPositive: true },
  completedOrders: { value: 124, change: 2.5, isPositive: true },
  canceledOrders: { value: 14, change: 1.5, isPositive: false },
  topProducts: { value: 119, change: 2.5, isPositive: true },
};

export const mockTopProducts: TopProduct[] = [
  {
    id: 'tp1',
    name: 'T-shirt Rainbow White',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=80',
    sold: 271,
    price: 49,
  },
  {
    id: 'tp2',
    name: 'Tech Tactical Jacket',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=400&auto=format&fit=crop&q=80',
    sold: 215,
    price: 189,
  },
  {
    id: 'tp3',
    name: 'Cargo Street Trousers',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&auto=format&fit=crop&q=80',
    sold: 198,
    price: 129,
  },
  {
    id: 'tp4',
    name: 'Signature Boxy Hoodie',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&auto=format&fit=crop&q=80',
    sold: 174,
    price: 99,
  },
];

export function generateSalesData(_range: SalesRange, _metric: SalesMetric): SalesReport {
  const basePoints = [
    { date: 'Jan', transactions: 140, products: 35, sales: 2400 },
    { date: 'Feb', transactions: 110, products: 28, sales: 1800 },
    { date: 'Mar', transactions: 175, products: 42, sales: 3100 },
    { date: 'Apr', transactions: 160, products: 38, sales: 2900 },
    { date: 'May', transactions: 195, products: 48, sales: 3600 },
    { date: 'Jun', transactions: 180, products: 44, sales: 3400 },
    { date: 'Jul', transactions: 210, products: 50, sales: 4100 },
    { date: 'Aug', transactions: 222, products: 44, sales: 4435.70 },
    { date: 'Sep', transactions: 190, products: 40, sales: 3850 },
    { date: 'Oct', transactions: 205, products: 46, sales: 4200 },
    { date: 'Nov', transactions: 218, products: 47, sales: 4320 },
    { date: 'Dec', transactions: 240, products: 55, sales: 4800 },
  ];

  return {
    total: 4435.70,
    change: 2.5,
    difference: 2330.00,
    isPositive: true,
    series: basePoints,
  };
}

export const mockTransactions: OrderTransaction[] = [
  { id: 'CTG0291', item: 'Crop top pants', date: '2026-02-12', price: 599, platform: 'Shopee', status: 'Completed' },
  { id: 'CTG0292', item: 'T-shirt rainbow...', date: '2026-02-12', price: 49, platform: 'Tokopedia', status: 'Completed' },
  { id: 'CTG0293', item: 'Huzzle black cap', date: '2026-02-12', price: 109, platform: 'Tokopedia', status: 'Completed' },
  { id: 'CTG0294', item: 'Crop top pants', date: '2026-02-12', price: 666, platform: 'Shopee', status: 'Completed' },
  { id: 'CTG0295', item: 'Crop top pants', date: '2026-02-12', price: 239, platform: 'TikTok', status: 'Completed' },
  { id: 'CTG0296', item: 'Oversized fleece hoodie', date: '2026-02-11', price: 159, platform: 'Shopee', status: 'Completed' },
  { id: 'CTG0297', item: 'Tech cargo shorts', date: '2026-02-10', price: 89, platform: 'Online Store', status: 'Completed' },
];
