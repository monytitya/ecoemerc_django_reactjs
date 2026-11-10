import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutGrid,
  ShoppingBag,
  Package,
  Users,
  BarChart3,
  Megaphone,
  Percent,
  Store,
  CreditCard,
  Plus,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useChannels } from '../../hooks/useDashboard';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const { data: channels } = useChannels();

  const mainMenuItems = [
    { name: 'Overview', icon: <LayoutGrid className="w-4 h-4" />, path: '/dashboard', badge: null },
    { name: 'Orders', icon: <ShoppingBag className="w-4 h-4" />, path: '/dashboard/orders', badge: '10' },
    { name: 'Products', icon: <Package className="w-4 h-4" />, path: '/shop', badge: null },
    { name: 'Customer', icon: <Users className="w-4 h-4" />, path: '#', badge: null },
    { name: 'Analytics', icon: <BarChart3 className="w-4 h-4" />, path: '#', badge: null },
    { name: 'Marketing', icon: <Megaphone className="w-4 h-4" />, path: '#', badge: null },
    { name: 'Discount', icon: <Percent className="w-4 h-4" />, path: '#', badge: null },
  ];

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-40 bg-white border-r border-[#ECEDF0] flex flex-col justify-between transition-all duration-300 ${
        collapsed ? 'w-[72px]' : 'w-[215px]'
      }`}
    >
      {/* Top Store Header */}
      <div>
        <div className="h-18 px-5 flex items-center justify-between border-b border-[#ECEDF0]/50 relative">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-xl bg-[#0F1020] text-white flex items-center justify-center font-black text-sm shrink-0">
              S
            </div>
            {!collapsed && (
              <span className="font-extrabold text-[15px] tracking-tight text-[#0F1020] truncate">
                Saledash
              </span>
            )}
          </div>

          {/* Edge Collapse Button */}
          <button
            onClick={onToggle}
            className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-[#ECEDF0] rounded-full shadow-sm flex items-center justify-center text-[#8A8F9C] hover:text-[#0F1020] hover:bg-neutral-50 transition"
            aria-label="Collapse Sidebar"
          >
            {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Scrollable Navigation */}
        <div className="p-3 space-y-6 overflow-y-auto max-h-[calc(100vh-80px)] scrollbar-none">
          {/* Section: Main Menu */}
          <div>
            {!collapsed && (
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#8A8F9C] mb-2">
                Main Menu
              </p>
            )}
            <ul className="space-y-1">
              {mainMenuItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                        isActive && item.path === '/dashboard'
                          ? 'bg-[#F4F5F7] text-[#0F1020]'
                          : 'text-[#8A8F9C] hover:text-[#0F1020] hover:bg-neutral-50'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      {!collapsed && <span>{item.name}</span>}
                    </div>
                    {!collapsed && item.badge && (
                      <span className="w-4 h-4 rounded-full bg-[#F0605D] text-white text-[9px] font-bold flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Sales Channel */}
          <div>
            {!collapsed && (
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#8A8F9C] mb-2">
                Sales Channel
              </p>
            )}
            <ul className="space-y-1">
              <li>
                <NavLink
                  to="/"
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-[#8A8F9C] hover:text-[#0F1020] hover:bg-neutral-50"
                >
                  <Store className="w-4 h-4" />
                  {!collapsed && <span>Online store</span>}
                </NavLink>
              </li>
              <li>
                <button
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-[#8A8F9C] hover:text-[#0F1020] hover:bg-neutral-50 text-left"
                >
                  <CreditCard className="w-4 h-4" />
                  {!collapsed && <span>Point of sale</span>}
                </button>
              </li>
            </ul>
          </div>

          {/* Section: Apps */}
          <div>
            {!collapsed && (
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#8A8F9C] mb-2">
                Apps
              </p>
            )}
            <ul className="space-y-1">
              {channels?.map((app) => (
                <li key={app.id}>
                  <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-[#0F1020] hover:bg-neutral-50 cursor-pointer">
                    <img src={app.logo} alt={app.name} className="w-4 h-4 rounded object-contain" />
                    {!collapsed && <span className="truncate">{app.name}</span>}
                  </div>
                </li>
              ))}
              {!collapsed && (
                <li>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#3B82F6] hover:underline mt-1">
                    <Plus className="w-3.5 h-3.5" /> Add apps
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Auth Section */}
      <div className="p-3 border-t border-[#ECEDF0]">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-[#8A8F9C] hover:text-[#0F1020] hover:bg-neutral-50 transition"
        >
          <Store className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Store Website</span>}
        </NavLink>
      </div>
    </aside>
  );
};

