import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col text-left"
            >
              {/* Header */}
              <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-black" />
                  <h2 className="text-sm font-black tracking-widest uppercase text-black">
                    YOUR BAG ({cartCount})
                  </h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 text-neutral-400 hover:text-black transition"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress bar */}
              <div className="bg-neutral-50 px-5 py-3 border-b border-neutral-100 text-xs">
                {cartTotal >= 1499 ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                    ✓ You've unlocked FREE SHIPPING!
                  </span>
                ) : (
                  <div className="space-y-1.5">
                    <p className="text-neutral-600 font-medium">
                      Add <span className="font-bold text-black">₹{1499 - cartTotal}</span> more to get <span className="font-bold">FREE SHIPPING</span>
                    </p>
                    <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-black h-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (cartTotal / 1499) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-20 text-neutral-400 space-y-3">
                    <ShoppingBag className="w-12 h-12 mx-auto stroke-1 text-neutral-300" />
                    <p className="text-xs font-bold uppercase tracking-widest text-neutral-600">
                      Your bag is empty
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="text-xs font-extrabold text-black underline underline-offset-4 uppercase"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cart.map(({ product, size, quantity }) => (
                    <motion.div
                      layout
                      key={`${product.id}-${size}`}
                      className="flex gap-4 p-3 bg-neutral-50 rounded-sm border border-neutral-100"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-20 object-cover rounded-xs bg-neutral-200"
                      />

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-xs font-bold text-black line-clamp-1">
                              {product.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(product.id, size)}
                              className="text-neutral-400 hover:text-black transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-[10px] text-neutral-500 font-medium mt-0.5">
                            Size: <span className="text-black font-semibold">{size}</span>
                          </p>
                          <p className="text-xs font-black text-black mt-1">
                            ₹{product.price.toLocaleString()}
                          </p>
                        </div>

                        {/* Quantity Adjuster */}
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center border border-neutral-300 bg-white">
                            <button
                              onClick={() => updateQuantity(product.id, size, quantity - 1)}
                              className="px-2 py-1 text-neutral-600 hover:text-black transition"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold text-black">{quantity}</span>
                            <button
                              onClick={() => updateQuantity(product.id, size, quantity + 1)}
                              className="px-2 py-1 text-neutral-600 hover:text-black transition"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-xs font-extrabold text-black ml-auto">
                            ₹{(product.price * quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Subtotal & Checkout */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-neutral-100 bg-white space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-black">
                    <span>SUBTOTAL</span>
                    <span className="text-base font-black">₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-tight">
                    Taxes and shipping calculated at checkout.
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/cart"
                      onClick={() => setIsCartOpen(false)}
                      className="w-full py-3 bg-neutral-100 hover:bg-neutral-200 text-black text-[11px] font-bold tracking-widest uppercase text-center transition"
                    >
                      VIEW BAG
                    </Link>
                    <button
                      onClick={() => alert(`Order placed for ₹${cartTotal.toLocaleString()}!`)}
                      className="w-full py-3 bg-black hover:bg-neutral-800 text-white text-[11px] font-bold tracking-widest uppercase flex items-center justify-center gap-1.5 transition"
                    >
                      CHECKOUT <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

