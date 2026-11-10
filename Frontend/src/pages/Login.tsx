import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ShieldCheck, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const { triggerToast } = useCart();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const user = await login({ email, password });
      triggerToast(`WELCOME BACK, ${user.first_name.toUpperCase()}!`);
      if (redirectUrl) {
        navigate(redirectUrl);
      } else if (user.is_admin || user.is_staff) {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      const detail =
        err.response?.data?.error ||
        err.response?.data?.detail ||
        (err.response?.data?.non_field_errors && err.response.data.non_field_errors[0]) ||
        'Invalid email or password.';
      setErrorMsg(detail);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillDemoAdmin = () => {
    setEmail('admin@neon.com');
    setPassword('adminpassword123');
    setErrorMsg(null);
  };

  const handleFillDemoCustomer = () => {
    setEmail('testcustomer@neon.com');
    setPassword('password123');
    setErrorMsg(null);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-16 px-4 bg-neutral-50">
      <div className="w-full max-w-md bg-white border border-neutral-200 p-8 sm:p-10 shadow-sm rounded-sm">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <span className="text-2xl font-black tracking-[0.25em] uppercase text-black">
              NEVERMORE
            </span>
          </Link>
          <h1 className="text-sm font-bold tracking-widest uppercase text-neutral-400 mt-2">
            ACCOUNT SIGN IN
          </h1>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-600 text-xs rounded-sm flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold tracking-widest uppercase text-neutral-500 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 bg-neutral-50 border border-neutral-300 text-xs text-black placeholder:text-neutral-400 focus:outline-none focus:border-black focus:bg-white transition"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-[11px] font-bold tracking-widest uppercase text-neutral-500">
                Password
              </label>
              <a href="#forgot" className="text-[10px] text-neutral-400 hover:underline">
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 bg-neutral-50 border border-neutral-300 text-xs text-black placeholder:text-neutral-400 focus:outline-none focus:border-black focus:bg-white transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-black text-white text-xs font-bold tracking-widest uppercase hover:bg-neutral-800 disabled:opacity-50 transition flex items-center justify-center gap-2 mt-2"
          >
            {isSubmitting ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                SIGN IN
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Demo Fast Login */}
        <div className="mt-8 pt-6 border-t border-neutral-200">
          <p className="text-[10px] font-bold tracking-wider uppercase text-neutral-400 text-center mb-3">
            Quick Demo Credentials
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={handleFillDemoAdmin}
              className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded text-xs font-semibold text-neutral-800 transition flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              Admin Login
            </button>
            <button
              type="button"
              onClick={handleFillDemoCustomer}
              className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded text-xs font-semibold text-neutral-800 transition flex items-center justify-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Customer
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-neutral-500">
            Don't have an account?{' '}
            <Link
              to={`/register${redirectUrl ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`}
              className="font-bold text-black hover:underline ml-1"
            >
              CREATE AN ACCOUNT
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
