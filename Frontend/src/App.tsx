import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { AuthModal } from './components/auth/AuthModal';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { Cart } from './pages/Cart';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Overview } from './pages/Overview';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-xl bg-white p-6 shadow-2xl relative text-left rounded-sm">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-black"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xs font-black tracking-widest uppercase text-neutral-400 mb-3">
          SEARCH NEON ARCHIVE
        </h3>

        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              placeholder="Search hoodies, tees, cargo pants..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-neutral-50 border border-neutral-300 text-xs text-black focus:outline-none focus:border-black"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-black text-white text-xs font-bold tracking-widest uppercase hover:bg-neutral-800"
          >
            SEARCH
          </button>
        </form>
      </div>
    </div>
  );
}

function Toast() {
  const { toastMessage } = useCart();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="fixed bottom-6 right-6 z-50 bg-black text-white px-5 py-3 shadow-2xl text-xs font-bold tracking-wider uppercase border border-neutral-800"
        >
          {toastMessage}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MainLayout() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans antialiased">
      <AnnouncementBar />
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/collections" element={<Shop />} />
          <Route path="/product/:slug" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      <Footer />
      <CartDrawer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <Toast />
    </div>
  );
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <Router>
            <AuthModal />
            <Routes>
              {/* Dashboard Standalone View matching Saledash spec */}
              <Route path="/dashboard" element={<Overview />} />
              <Route path="/dashboard/orders" element={<Overview />} />
              <Route path="/dashboard/login" element={<Login />} />
              {/* Storefront Layout */}
              <Route path="/*" element={<MainLayout />} />
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
