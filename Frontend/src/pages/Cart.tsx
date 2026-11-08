import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

export const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-4">
        <ShoppingBag className="w-16 h-16 mx-auto stroke-1 text-neutral-300" />
        <h1 className="text-2xl font-black uppercase tracking-tight text-black">
          YOUR BAG IS EMPTY
        </h1>
        <p className="text-xs text-neutral-500 max-w-sm mx-auto">
          Explore our thrift archive and add premium streetwear items to your cart.
        </p>
        <div className="pt-2">
          <Link
            to="/shop"
            className="inline-block bg-black text-white text-xs font-bold tracking-widest uppercase px-8 py-3.5 hover:bg-neutral-800 transition"
          >
            DISCOVER PIECES
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 text-left">
      <h1 className="text-2xl sm:text-3xl font-black tracking-tight uppercase text-black mb-8">
        SHOPPING BAG ({cart.reduce((s, i) => s + i.quantity, 0)})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Cart Items Table */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(({ product, size, quantity }) => (
            <div
              key={`${product.id}-${size}`}
              className="flex gap-4 p-4 border border-neutral-200 bg-white"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-24 object-cover bg-neutral-100"
              />

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-bold text-black uppercase">{product.name}</h3>
                    <button
                      onClick={() => removeFromCart(product.id, size)}
                      className="text-neutral-400 hover:text-black transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">Size: {size}</p>
                  <p className="text-xs font-black text-black mt-1">
                    ₹{product.price.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-neutral-300 bg-white">
                    <button
                      onClick={() => updateQuantity(product.id, size, quantity - 1)}
                      className="px-2 py-1 text-neutral-600 hover:text-black"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 text-xs font-bold">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, size, quantity + 1)}
                      className="px-2 py-1 text-neutral-600 hover:text-black"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="text-sm font-black text-black">
                    ₹{(product.price * quantity).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={clearCart}
              className="text-xs font-semibold text-neutral-500 hover:text-rose-600 underline"
            >
              Clear Cart
            </button>
            <Link to="/shop" className="text-xs font-bold text-black uppercase underline">
              Continue Shopping →
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-neutral-50 border border-neutral-200 p-6 space-y-5">
          <h2 className="text-sm font-black tracking-widest uppercase text-black pb-3 border-b border-neutral-200">
            ORDER SUMMARY
          </h2>

          <div className="space-y-2 text-xs text-neutral-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-black">₹{cartTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span className="font-bold text-black">
                {cartTotal >= 1499 ? 'FREE' : '₹99'}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-neutral-200 flex justify-between items-center text-sm font-black text-black">
            <span>TOTAL</span>
            <span className="text-lg">
              ₹{(cartTotal + (cartTotal >= 1499 ? 0 : 99)).toLocaleString()}
            </span>
          </div>

          <button
            onClick={() => alert('Order Placed Successfully! Thank you for ordering from NEON.')}
            className="w-full py-3.5 bg-black hover:bg-neutral-800 text-white text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition"
          >
            PROCEED TO CHECKOUT <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

