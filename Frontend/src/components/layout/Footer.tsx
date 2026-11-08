import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-black text-neutral-300 pt-16 pb-12 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-neutral-800">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4 pr-6">
            <Link to="/" className="inline-block text-3xl font-black tracking-tighter text-white uppercase">
              NEON
            </Link>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Thrifted culture. Curated style. Pieces with a past, made for the present. High-grade streetwear and reworked garments from around the globe.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs text-neutral-400 font-medium tracking-wider">
                IG: @neon.thrift
              </span>
            </div>
          </div>

          {/* Col 2: Shop */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white tracking-widest uppercase">SHOP</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><Link to="/shop" className="hover:text-white transition">All Products</Link></li>
              <li><Link to="/shop?category=hoodies" className="hover:text-white transition">Hoodies</Link></li>
              <li><Link to="/shop?category=t-shirts" className="hover:text-white transition">T-Shirts</Link></li>
              <li><Link to="/shop?category=pants" className="hover:text-white transition">Pants</Link></li>
              <li><Link to="/shop?category=accessories" className="hover:text-white transition">Accessories</Link></li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white tracking-widest uppercase">COMPANY</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
              <li><span className="cursor-pointer hover:text-white transition">Shipping & Delivery</span></li>
              <li><span className="cursor-pointer hover:text-white transition">Returns & Refunds</span></li>
              <li><span className="cursor-pointer hover:text-white transition">Privacy Policy</span></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white tracking-widest uppercase">NEWSLETTER</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Get exclusive updates on new drops and special offers.
            </p>
            <form onSubmit={handleSubscribe} className="pt-1">
              <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden focus-within:border-white transition">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-black hover:bg-neutral-800 text-white px-3.5 py-2.5 transition flex items-center justify-center border-l border-neutral-800"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 mt-2 font-medium">
                  ✓ Thanks for subscribing! You're on the list.
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-4">
          <p>© 2024 Neon. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-neutral-400 cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-neutral-400 cursor-pointer">Privacy</span>
            <span className="hover:text-neutral-400 cursor-pointer">Size Guide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
