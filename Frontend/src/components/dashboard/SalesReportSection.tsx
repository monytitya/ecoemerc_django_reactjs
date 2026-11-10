import React from 'react';
import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { Badge, Skeleton } from '../ui/Feedback';
import type { SalesReport, SalesRange, SalesMetric } from '../../types/dashboard';

interface SalesReportSectionProps {
  data?: SalesReport;
  isLoading: boolean;
  range: SalesRange;
  setRange: (r: SalesRange) => void;
  metric: SalesMetric;
  setMetric: (m: SalesMetric) => void;
}

// Custom Tooltip Matching Screenshot (#0F1020 pill with transactions & product)
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const p = payload[0].payload;
    return (
      <div className="bg-[#0F1020] text-white p-3.5 rounded-2xl shadow-xl text-left border border-neutral-800 text-xs min-w-[150px]">
        <p className="font-bold text-[11px] text-neutral-300 pb-1.5 border-b border-neutral-800">
          14 {label} 2026
        </p>
        <div className="space-y-1 mt-2">
          <div className="flex items-center justify-between text-neutral-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#6BA3D6]" />
              Transactions
            </span>
            <span className="font-bold text-white">{p.transactions}</span>
          </div>
          <div className="flex items-center justify-between text-neutral-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F2A65A]" />
              Product
            </span>
            <span className="font-bold text-white">{p.products}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const SalesReportSection: React.FC<SalesReportSectionProps> = ({
  data,
  isLoading,
  range,
  setRange,
  metric,
  setMetric,
}) => {
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const ranges: SalesRange[] = ['1d', '7d', '30d', '16m', 'max'];

  if (isLoading || !data) {
    return <Skeleton className="h-96 rounded-2xl" />;
  }

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#ECEDF0]/70 shadow-2xs text-left">
      {/* Top Header: Title + Metric Selector Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6">
        <div>
          <h2 className="text-base font-bold text-[#0F1020]">Your sales report</h2>
          <p className="text-xs text-[#8A8F9C] mt-0.5">Look at your sale</p>
        </div>

        <div className="relative inline-block text-left">
          <select
            value={metric}
            onChange={(e) => setMetric(e.target.value as SalesMetric)}
            className="appearance-none bg-neutral-50 border border-[#ECEDF0] px-4 py-2 pr-9 rounded-xl text-xs font-semibold text-[#0F1020] cursor-pointer hover:bg-neutral-100 focus:outline-none"
          >
            <option value="total">Total Sales</option>
            <option value="transactions">Transactions</option>
            <option value="products">Products</option>
          </select>
          <ChevronDown className="w-4 h-4 text-[#8A8F9C] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Main Content: Big Amount + Range Toggle + Two-Line Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Stats Column */}
        <div className="lg:col-span-1 space-y-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#0F1020] tracking-tight">
                {currencyFormatter.format(data.total)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <Badge variant={data.isPositive ? 'positive' : 'negative'}>
                <ArrowUpRight className="w-3 h-3 mr-0.5 inline" />
                {currencyFormatter.format(data.difference)} ({data.change > 0 ? `+${data.change}%` : `${data.change}%`})
              </Badge>
            </div>
          </div>

          {/* Time Range Toggle */}
          <div className="pt-2">
            <div className="flex bg-[#F4F5F7] p-1 rounded-xl w-fit">
              {ranges.map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition uppercase ${
                    range === r ? 'bg-[#0F1020] text-white shadow-xs' : 'text-[#8A8F9C] hover:text-[#0F1020]'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Line & Area Chart */}
        <div className="lg:col-span-3 h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.series} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6BA3D6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#6BA3D6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={false} stroke="#F0F1F3" />
              <XAxis
                dataKey="date"
                stroke="#8A8F9C"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                stroke="#8A8F9C"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : v)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="transactions"
                stroke="#6BA3D6"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#blueGradient)"
              />
              <Line
                type="monotone"
                dataKey="products"
                stroke="#F2A65A"
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

