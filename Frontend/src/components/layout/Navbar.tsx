import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const { cartCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'NEW ARRIVALS', path: '/shop?filter=new' },
    { name: 'COLLECTIONS', path: '/collections' },
    { name: 'MENS', path: '/shop?category=hoodies' },
    { name: 'WOMENS', path: '/shop?category=t-shirts' },
    { name: 'ACCESSORIES', path: '/shop?category=accessories' },
    { name: 'ABOUT', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black text-white border-b border-neutral-900 select-none">
      <div className="w-full px-6 sm:px-10 lg:px-14 h-16 flex items-center justify-between relative">
        {/* Left Side: Desktop Nav Links (tight, minimal uppercase) */}
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

        {/* Center: NEVERMORE Brand Logo (Tall Condensed Bold Serif/Sans Style) */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
          <Link to="/" className="block group">
            <span className="text-xl sm:text-2xl font-black tracking-[0.28em] text-white uppercase group-hover:text-neutral-300 transition-colors font-sans">
              NEVERMORE
            </span>
          </Link>
        </div>

        {/* Right Side: Search Icon & Shopping Bag Icon */}
        <div className="flex items-center gap-5 sm:gap-6">
          <button
            onClick={onOpenSearch}
            className="text-neutral-300 hover:text-white transition duration-200 p-1"
            aria-label="Search"
          >
            <Search className="w-4 h-4 stroke-[2]" />
          </button>

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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
