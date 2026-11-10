import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, User, Phone, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const Register: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const { triggerToast } = useCart();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);
    try {
      const user = await register({
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: phone,
        password,
        confirm_password: confirmPassword,
      });
      triggerToast(`WELCOME TO NEVERMORE, ${user.first_name.toUpperCase()}!`);
      if (redirectUrl) {
        navigate(redirectUrl);
      } else {
        navigate('/');
      }
    } catch (err: any) {
      let detail = 'Registration failed. Please check the fields and try again.';
      if (err.response?.data) {
        const d = err.response.data;
        if (typeof d === 'string') detail = d;
        else if (d.email) detail = Array.isArray(d.email) ? d.email[0] : d.email;
        else if (d.error) detail = d.error;
        else if (d.detail) detail = d.detail;
      }
      setErrorMsg(detail);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-16 px-4 bg-neutral-50">
      <div className="w-full max-w-lg bg-white border border-neutral-200 p-8 sm:p-10 shadow-sm rounded-sm">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <span className="text-2xl font-black tracking-[0.25em] uppercase text-black">
              NEVERMORE
            </span>
          </Link>
          <h1 className="text-sm font-bold tracking-widest uppercase text-neutral-400 mt-2">
            CREATE NEW ACCOUNT
          </h1>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-600 text-xs rounded-sm flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[11px] font-bold tracking-widest uppercase text-neutral-500 mb-1.5">
                First Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-neutral-50 border border-neutral-300 text-xs text-black focus:outline-none focus:border-black focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold tracking-widest uppercase text-neutral-500 mb-1.5">
                Last Name
              </label>
              <input
                type="text"
                required
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 text-xs text-black focus:outline-none focus:border-black focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold tracking-widest uppercase text-neutral-500 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 bg-neutral-50 border border-neutral-300 text-xs text-black focus:outline-none focus:border-black focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold tracking-widest uppercase text-neutral-500 mb-1.5">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                placeholder="+1234567890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 bg-neutral-50 border border-neutral-300 text-xs text-black focus:outline-none focus:border-black focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[11px] font-bold tracking-widest uppercase text-neutral-500 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-neutral-50 border border-neutral-300 text-xs text-black focus:outline-none focus:border-black focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold tracking-widest uppercase text-neutral-500 mb-1.5">
                Confirm Password
              </label>
              <input
                type="password"
                required
                minLength={6}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 text-xs text-black focus:outline-none focus:border-black focus:bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-black text-white text-xs font-bold tracking-widest uppercase hover:bg-neutral-800 disabled:opacity-50 transition flex items-center justify-center gap-2 mt-3"
          >
            {isSubmitting ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                REGISTER ACCOUNT
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-neutral-200">
          <p className="text-xs text-neutral-500">
            Already have an account?{' '}
            <Link
              to={`/login${redirectUrl ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`}
              className="font-bold text-black hover:underline ml-1"
            >
              SIGN IN
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
