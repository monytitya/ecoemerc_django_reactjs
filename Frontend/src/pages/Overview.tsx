import React, { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { KpiSection } from '../components/dashboard/KpiSection';
import { SalesReportSection } from '../components/dashboard/SalesReportSection';
import { TransactionsTable } from '../components/dashboard/TransactionsTable';
import { CongratulationsCard } from '../components/dashboard/CongratulationsCard';
import {
  useDashboardSummary,
  useSalesReport,
  useTransactions,
  useTopProducts,
} from '../hooks/useDashboard';
import type { SalesRange, SalesMetric } from '../types/dashboard';

export const Overview: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [salesRange, setSalesRange] = useState<SalesRange>('7d');
  const [salesMetric, setSalesMetric] = useState<SalesMetric>('total');
  const [searchQuery, setSearchQuery] = useState('');

  // Real React Query hooks connected to Django REST API with automatic caching & background re-fetch
  const { data: summary, isLoading: isSummaryLoading } = useDashboardSummary();
  const { data: sales, isLoading: isSalesLoading } = useSalesReport(salesRange, salesMetric);
  const { data: transactions, isLoading: isTransLoading } = useTransactions(searchQuery);
  const { data: topProducts, isLoading: isTopProdLoading } = useTopProducts();

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#0F1020] font-sans antialiased">
      {/* Fixed Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      {/* Main Page Container */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? 'pl-[72px]' : 'pl-0 lg:pl-[215px]'
        }`}
      >
        <Header />

        {/* Dashboard Grid Content */}
        <main className="p-6 sm:p-8 space-y-6 max-w-7xl w-full mx-auto pb-16">
          {/* Row 1: 4 KPI Cards */}
          <KpiSection summary={summary} isLoading={isSummaryLoading} />

          {/* Row 2: Sales Report Chart */}
          <SalesReportSection
            data={sales}
            isLoading={isSalesLoading}
            range={salesRange}
            setRange={setSalesRange}
            metric={salesMetric}
            setMetric={setSalesMetric}
          />

          {/* Row 3: Two Columns (Last Transactions & Congratulations Carousel) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <TransactionsTable
                transactions={transactions}
                isLoading={isTransLoading}
                onSearch={(q) => setSearchQuery(q)}
              />
            </div>
            <div className="lg:col-span-1">
              <CongratulationsCard products={topProducts} isLoading={isTopProdLoading} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

