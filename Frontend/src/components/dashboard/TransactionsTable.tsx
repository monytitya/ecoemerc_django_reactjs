import React, { useState } from 'react';
import { Search, SlidersHorizontal, Download } from 'lucide-react';
import type { OrderTransaction } from '../../types/dashboard';

interface TransactionsTableProps {
  transactions?: OrderTransaction[];
  isLoading: boolean;
  onSearch: (q: string) => void;
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions = [],
  isLoading,
  onSearch,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(['CTG0291']);
  const [searchInput, setSearchInput] = useState('');

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchInput(val);
    onSearch(val);
  };

  const exportCSV = () => {
    const headers = 'Order ID,Item,Date,Price,Platform,Status\n';
    const rows = transactions
      .map((t) => `${t.id},"${t.item}",${t.date},${t.price},${t.platform},${t.status}`)
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Shopee':
        return <span className="w-2 h-2 rounded-full bg-[#EE4D2D]" />;
      case 'Tokopedia':
        return <span className="w-2 h-2 rounded-full bg-[#03AC0E]" />;
      case 'TikTok':
        return <span className="w-2 h-2 rounded-full bg-[#000000]" />;
      default:
        return <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#ECEDF0]/70 shadow-2xs text-left flex flex-col justify-between">
      <div>
        {/* Top Header & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5">
          <h3 className="text-base font-bold text-[#0F1020]">Last transaction</h3>

          <div className="flex items-center gap-2">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#8A8F9C] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search"
                value={searchInput}
                onChange={handleSearchChange}
                className="pl-8 pr-3 py-1.5 text-xs bg-neutral-50 border border-[#ECEDF0] rounded-xl text-[#0F1020] placeholder-[#8A8F9C] focus:outline-none focus:border-[#0F1020]"
              />
            </div>

            {/* Filter icon button */}
            <button
              onClick={exportCSV}
              title="Export CSV"
              className="p-2 border border-[#ECEDF0] rounded-xl text-[#8A8F9C] hover:text-[#0F1020] hover:bg-neutral-50 transition"
              aria-label="Export CSV"
            >
              <Download className="w-3.5 h-3.5" />
            </button>

            <button
              className="p-2 border border-[#ECEDF0] rounded-xl text-[#8A8F9C] hover:text-[#0F1020] hover:bg-neutral-50 transition"
              aria-label="Filter"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#ECEDF0] text-[#8A8F9C] font-semibold">
                <th className="pb-3 pl-1 w-8">
                  <input
                    type="checkbox"
                    className="rounded border-neutral-300 text-[#0F1020] focus:ring-0 cursor-pointer"
                    onChange={(e) => {
                      if (e.target.checked) setSelectedIds(transactions.map((t) => t.id));
                      else setSelectedIds([]);
                    }}
                  />
                </th>
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Item</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Platform</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECEDF0]/50">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#8A8F9C]">
                    Loading transactions...
                  </td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#8A8F9C]">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                transactions.slice(0, 5).map((t) => {
                  const isSelected = selectedIds.includes(t.id);
                  return (
                    <tr
                      key={t.id}
                      onClick={() => handleToggleSelect(t.id)}
                      className={`hover:bg-[#F7F8FA] transition cursor-pointer ${
                        isSelected ? 'bg-[#F4F5F7]/80' : ''
                      }`}
                    >
                      <td className="py-3.5 pl-1" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelect(t.id)}
                          className="rounded border-neutral-300 text-[#0F1020] focus:ring-0 cursor-pointer"
                        />
                      </td>
                      <td className="py-3.5 font-bold text-[#0F1020]">{t.id}</td>
                      <td className="py-3.5 font-medium text-[#0F1020] max-w-[140px] truncate">
                        {t.item}
                      </td>
                      <td className="py-3.5 text-[#8A8F9C]">{t.date}</td>
                      <td className="py-3.5 font-extrabold text-[#0F1020]">${t.price}</td>
                      <td className="py-3.5">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-50 border border-[#ECEDF0] text-[11px] font-semibold text-[#0F1020]">
                          {getPlatformIcon(t.platform)}
                          {t.platform}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

