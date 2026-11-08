import React, { useState } from 'react';
import { Mail, MapPin, Phone, Check } from 'lucide-react';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-left space-y-10">
      <div>
        <span className="text-[10px] font-bold tracking-[0.25em] text-neutral-400 uppercase">
          REACH OUT
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase text-black mt-1">
          CONTACT US
        </h1>
        <p className="text-xs text-neutral-500 mt-2">
          Questions about an order, drop schedules, or sizing? Our support team responds within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1">
              NAME
            </label>
            <input
              type="text"
              required
              placeholder="Your full name"
              className="w-full bg-neutral-50 border border-neutral-300 px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-black transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1">
              EMAIL
            </label>
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="w-full bg-neutral-50 border border-neutral-300 px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-black transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1">
              MESSAGE
            </label>
            <textarea
              rows={4}
              required
              placeholder="How can we help?"
              className="w-full bg-neutral-50 border border-neutral-300 px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-black transition resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black hover:bg-neutral-800 text-white text-xs font-bold tracking-widest uppercase py-3.5 transition"
          >
            SEND MESSAGE
          </button>

          {submitted && (
            <p className="text-xs text-emerald-600 font-bold flex items-center gap-1.5 pt-2">
              <Check className="w-4 h-4" /> Message sent successfully! We will get back to you soon.
            </p>
          )}
        </form>

        <div className="bg-neutral-50 border border-neutral-200 p-6 space-y-6 text-xs text-neutral-700">
          <div className="space-y-2">
            <h4 className="font-black uppercase tracking-wider text-black">SUPPORT HOURS</h4>
            <p className="text-neutral-500">Monday – Saturday: 10:00 AM – 7:00 PM IST</p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-black" />
              <span>support@neonthrift.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-black" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-black" />
              <span>Bandra West, Mumbai, MH, India</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

