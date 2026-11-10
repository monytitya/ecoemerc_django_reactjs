import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, User as UserIcon, LogOut, LayoutDashboard, Shield } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const { cartCount, setIsCartOpen } = useCart();
  const { user, isAuthenticated, isAdmin, logout, openAuthModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const navLinks = [
    { name: 'NEW ARRIVALS', path: '/shop?filter=new' },
    { name: 'COLLECTIONS', path: '/collections' },
    { name: 'MENS', path: '/shop?category=hoodies' },
    { name: 'WOMENS', path: '/shop?category=t-shirts' },
    { name: 'ACCESSORIES', path: '/shop?category=accessories' },
    { name: 'ABOUT', path: '/about' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-black text-white border-b border-neutral-900 select-none">
      <div className="w-full px-6 sm:px-10 lg:px-14 h-16 flex items-center justify-between relative">
        {/* Left Side: Desktop Nav Links */}
        <div className="flex items-center">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-neutral-400 transition mr-3"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-[11px] font-bold tracking-[0.14em] uppercase transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Center: Brand Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
          <Link to="/" className="block group">
            <span className="text-xl sm:text-2xl font-black tracking-[0.28em] text-white uppercase group-hover:text-neutral-300 transition-colors font-sans">
              NEVERMORE
            </span>
          </Link>
        </div>

        {/* Right Side: Search, Account & Shopping Bag */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={onOpenSearch}
            className="text-neutral-300 hover:text-white transition duration-200 p-1"
            aria-label="Search"
          >
            <Search className="w-4 h-4 stroke-[2]" />
          </button>

          {/* User Account Button & Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => {
                if (isAuthenticated) {
                  setUserDropdownOpen(!userDropdownOpen);
                } else {
                  openAuthModal('login');
                }
              }}
              className="text-neutral-300 hover:text-white transition duration-200 p-1 flex items-center gap-1.5 focus:outline-none"
              aria-label="User Account"
            >
              <div className="relative">
                <UserIcon className="w-4 h-4 stroke-[2]" />
                {isAuthenticated && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-black" />
                )}
              </div>
            </button>

            {/* User Dropdown Menu */}
            <AnimatePresence>
              {userDropdownOpen && isAuthenticated && user && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-3 w-60 bg-white text-neutral-900 border border-neutral-200 shadow-2xl rounded-sm py-2 z-50 text-left"
                >
                  {/* User Profile Header */}
                  <div className="px-4 py-3 border-b border-neutral-100">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-black truncate">
                        {user.first_name} {user.last_name}
                      </p>
                      {isAdmin && (
                        <span className="text-[9px] font-black uppercase tracking-wider bg-black text-white px-1.5 py-0.5 rounded flex items-center gap-1">
                          <Shield className="w-2.5 h-2.5" /> Admin
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                      {user.email}
                    </p>
                  </div>

                  {/* Links */}
                  <div className="py-1">
                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 transition"
                    >
                      <LayoutDashboard className="w-4 h-4 text-neutral-500" />
                      <span>Admin Dashboard</span>
                    </Link>

                    <Link
                      to="/shop"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 transition"
                    >
                      <ShoppingBag className="w-4 h-4 text-neutral-500" />
                      <span>Browse Store</span>
                    </Link>
                  </div>

                  {/* Sign Out */}
                  <div className="border-t border-neutral-100 pt-1 mt-1">
                    <button
                      onClick={async () => {
                        setUserDropdownOpen(false);
                        await logout();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition text-left"
                    >
                      <LogOut className="w-3.5 h-3.5 text-red-500" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative text-neutral-300 hover:text-white transition duration-200 p-1 flex items-center"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4 stroke-[2]" />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={cartCount}
                className="absolute -top-1.5 -right-1.5 bg-white text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center"
              >
                {cartCount}
              </motion.span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-neutral-900 bg-black px-6 py-4 space-y-2 text-left"
          >
            {/* User Greeting / Action in Mobile Menu */}
            {isAuthenticated && user ? (
              <div className="pb-3 mb-2 border-b border-neutral-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-[10px] text-neutral-400">{user.email}</p>
                </div>
                <button
                  onClick={async () => {
                    setMobileMenuOpen(false);
                    await logout();
                  }}
                  className="text-xs text-red-400 font-bold hover:underline"
                >
                  SIGN OUT
                </button>
              </div>
            ) : (
              <div className="pb-3 mb-2 border-b border-neutral-800">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('login');
                  }}
                  className="w-full py-2 bg-white text-black text-xs font-bold tracking-widest uppercase hover:bg-neutral-200 transition"
                >
                  SIGN IN / REGISTER
                </button>
              </div>
            )}

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs font-bold tracking-widest text-neutral-300 hover:text-white py-2.5 border-b border-neutral-900"
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-bold tracking-widest text-emerald-400 hover:text-emerald-300 py-2.5"
            >
              ADMIN DASHBOARD →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
