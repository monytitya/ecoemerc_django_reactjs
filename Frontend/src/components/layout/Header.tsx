import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Bell, ChevronDown, CheckCircle, LogOut, User as UserIcon, Shield, Store } from 'lucide-react';
import { useCurrentUser, useNotificationsCount } from '../../hooks/useDashboard';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const { data: dashboardUser } = useCurrentUser();
  const { user, isAuthenticated, isAdmin, logout, openAuthModal } = useAuth();
  const { data: unreadCount = 7 } = useNotificationsCount();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Greeting by time of day
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  // Display user name: preferred from live auth context, fallback to query / default
  const displayName = user
    ? [user.first_name, user.last_name].filter(Boolean).join(' ') || user.username
    : (dashboardUser?.name || 'Jonathan');

  // Formatted date string matching screenshot (e.g. "14 Aug 2023")
  const todayFormatted = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date());

  return (
    <header className="h-20 bg-[#F4F5F7] px-6 sm:px-10 flex items-center justify-between relative">
      {/* Left: Salutation & Subtitle */}
      <div className="text-left">
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F1020] tracking-tight">
          {greeting}, {displayName}!
        </h1>
        <p className="text-xs text-[#8A8F9C] mt-0.5">
          Here's what's happening with your store today
        </p>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Date Pill */}
        <div className="hidden sm:flex items-center gap-2 bg-white px-3.5 py-2 rounded-full border border-[#ECEDF0] text-xs font-semibold text-[#0F1020] shadow-2xs">
          <Calendar className="w-3.5 h-3.5 text-[#8A8F9C]" />
          <span>{todayFormatted}</span>
        </div>

        {/* Notification Bell */}
        <button
          className="relative w-10 h-10 rounded-full bg-white border border-[#ECEDF0] flex items-center justify-center text-[#0F1020] hover:bg-neutral-50 transition shadow-2xs"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4 text-[#0F1020]" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-4 h-4 bg-[#F0605D] text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
              {unreadCount}
            </span>
          )}
        </button>

        {/* User Avatar with Badge & Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => {
              if (isAuthenticated) {
                setMenuOpen(!menuOpen);
              } else {
                openAuthModal('login');
              }
            }}
            className="flex items-center gap-2 pl-1 cursor-pointer focus:outline-none"
            aria-label="User Account Options"
          >
            <div className="relative">
              <img
                src={dashboardUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={displayName}
                className="w-10 h-10 rounded-full object-cover border border-[#ECEDF0]"
              />
              {(user?.is_admin || dashboardUser?.verified) && (
                <CheckCircle className="w-3.5 h-3.5 text-[#3DBE8B] fill-white absolute bottom-0 right-0" />
              )}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#8A8F9C] hidden sm:block" />
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {menuOpen && isAuthenticated && user && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-64 bg-white border border-[#ECEDF0] rounded-2xl shadow-xl py-3 z-50 text-left"
              >
                <div className="px-4 pb-3 border-b border-[#ECEDF0]">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-[#0F1020] truncate">
                      {displayName}
                    </p>
                    {isAdmin && (
                      <span className="text-[9px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Shield className="w-2.5 h-2.5" /> Admin
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#8A8F9C] truncate mt-0.5">
                    {user.email}
                  </p>
                </div>

                <div className="py-1.5">
                  <Link
                    to="/"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#0F1020] hover:bg-[#F4F5F7] transition"
                  >
                    <Store className="w-4 h-4 text-[#8A8F9C]" />
                    <span>View Storefront</span>
                  </Link>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      openAuthModal('register');
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#0F1020] hover:bg-[#F4F5F7] transition text-left"
                  >
                    <UserIcon className="w-4 h-4 text-[#8A8F9C]" />
                    <span>Register New Account</span>
                  </button>
                </div>

                <div className="border-t border-[#ECEDF0] pt-1.5 mt-1">
                  <button
                    onClick={async () => {
                      setMenuOpen(false);
                      await logout();
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#F0605D] hover:bg-red-50 transition text-left"
                  >
                    <LogOut className="w-3.5 h-3.5 text-[#F0605D]" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
