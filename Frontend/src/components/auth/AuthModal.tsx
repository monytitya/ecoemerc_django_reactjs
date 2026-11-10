import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, User, Phone, CheckCircle, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    setAuthModalMode,
    login,
    register,
  } = useAuth();
  const { triggerToast } = useCart();
  const navigate = useNavigate();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UI state
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const user = await login({ email: loginEmail, password: loginPassword });
      triggerToast(`WELCOME BACK, ${user.first_name.toUpperCase()}!`);
      if (user.is_admin || user.is_staff) {
        navigate('/dashboard');
      }
    } catch (err: any) {
      const detail =
        err.response?.data?.error ||
        err.response?.data?.detail ||
        (err.response?.data?.non_field_errors && err.response.data.non_field_errors[0]) ||
        'Unable to log in. Please check your credentials.';
      setErrorMsg(detail);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (regPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (regPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);
    try {
      const user = await register({
        first_name: firstName,
        last_name: lastName,
        email: regEmail,
        phone_number: phone,
        password: regPassword,
        confirm_password: confirmPassword,
      });
      triggerToast(`ACCOUNT CREATED! WELCOME, ${user.first_name.toUpperCase()}!`);
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

  const handleFillDemoAdmin = () => {
    setLoginEmail('admin@neon.com');
    setLoginPassword('adminpassword123');
    setErrorMsg(null);
  };

  const handleFillDemoCustomer = () => {
    setLoginEmail('testcustomer@neon.com');
    setLoginPassword('password123');
    setErrorMsg(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md bg-white border border-neutral-200 shadow-2xl rounded-sm overflow-hidden text-neutral-900"
        >
          {/* Close Button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-black transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header & Tabs */}
          <div className="pt-8 px-8 pb-4 text-center border-b border-neutral-100">
            <h2 className="text-xl font-black tracking-[0.2em] uppercase text-black">
              NEVERMORE
            </h2>
            <p className="text-[11px] font-semibold tracking-wider text-neutral-400 uppercase mt-1">
              Member Access & Authentication
            </p>

            <div className="grid grid-cols-2 mt-6 border-b border-neutral-200">
              <button
                type="button"
                onClick={() => {
                  setAuthModalMode('login');
                  setErrorMsg(null);
                }}
                className={`pb-3 text-xs font-bold tracking-widest uppercase transition-colors relative ${
                  authModalMode === 'login'
                    ? 'text-black'
                    : 'text-neutral-400 hover:text-black'
                }`}
              >
                Sign In
                {authModalMode === 'login' && (
                  <motion.div
                    layoutId="activeAuthTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                  />
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setAuthModalMode('register');
                  setErrorMsg(null);
                }}
                className={`pb-3 text-xs font-bold tracking-widest uppercase transition-colors relative ${
                  authModalMode === 'register'
                    ? 'text-black'
                    : 'text-neutral-400 hover:text-black'
                }`}
              >
                Register
                {authModalMode === 'register' && (
                  <motion.div
                    layoutId="activeAuthTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                  />
                )}
              </button>
            </div>
          </div>

          {/* Form Body */}
          <div className="p-8 pt-6 max-h-[75vh] overflow-y-auto">
            {errorMsg && (
              <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-600 text-xs rounded-sm flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {authModalMode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-neutral-500 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="admin@neon.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 bg-neutral-50 border border-neutral-300 text-xs text-black placeholder:text-neutral-400 focus:outline-none focus:border-black focus:bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-[10px] font-bold tracking-widest uppercase text-neutral-500">
                      Password
                    </label>
                    <span className="text-[10px] text-neutral-400 cursor-pointer hover:underline">
                      Forgot?
                    </span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 bg-neutral-50 border border-neutral-300 text-xs text-black placeholder:text-neutral-400 focus:outline-none focus:border-black focus:bg-white transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3 bg-black text-white text-xs font-bold tracking-widest uppercase hover:bg-neutral-800 disabled:opacity-50 transition flex items-center justify-center gap-2"
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

                {/* Quick Auto-Fill Demo Accounts */}
                <div className="mt-6 pt-4 border-t border-neutral-200">
                  <p className="text-[10px] font-bold tracking-wider uppercase text-neutral-400 mb-2">
                    Quick Demo Credentials
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleFillDemoAdmin}
                      className="px-2.5 py-2 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded text-[11px] font-semibold text-neutral-800 transition flex items-center justify-center gap-1.5"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                      Admin Login
                    </button>
                    <button
                      type="button"
                      onClick={handleFillDemoCustomer}
                      className="px-2.5 py-2 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded text-[11px] font-semibold text-neutral-800 transition flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      Customer
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[10px] font-bold tracking-widest uppercase text-neutral-500 mb-1">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full pl-8 pr-2.5 py-2 bg-neutral-50 border border-neutral-300 text-xs text-black focus:outline-none focus:border-black focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold tracking-widest uppercase text-neutral-500 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 text-xs text-black focus:outline-none focus:border-black focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-neutral-500 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full pl-8 pr-2.5 py-2 bg-neutral-50 border border-neutral-300 text-xs text-black focus:outline-none focus:border-black focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-neutral-500 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="+1234567890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-8 pr-2.5 py-2 bg-neutral-50 border border-neutral-300 text-xs text-black focus:outline-none focus:border-black focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[10px] font-bold tracking-widest uppercase text-neutral-500 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      placeholder="••••••"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 text-xs text-black focus:outline-none focus:border-black focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold tracking-widest uppercase text-neutral-500 mb-1">
                      Confirm
                    </label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      placeholder="••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 text-xs text-black focus:outline-none focus:border-black focus:bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-3 py-3 bg-black text-white text-xs font-bold tracking-widest uppercase hover:bg-neutral-800 disabled:opacity-50 transition flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      CREATE ACCOUNT
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
