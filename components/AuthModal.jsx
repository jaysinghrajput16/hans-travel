'use client';

import React, { useState } from 'react';
import { X, Phone, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export default function AuthModal({ isOpen, onClose }) {
  const [mobile, setMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (mobile.length >= 10) {
      setOtpSent(true);
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setLoggedIn(true);
    setTimeout(() => {
      setLoggedIn(false);
      setOtpSent(false);
      setMobile('');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overscroll-contain">
      <div className="bg-white rounded-3xl shadow-modal w-full max-w-md overflow-hidden border border-slate-200 transform-gpu [transform:translateZ(0)] [will-change:transform]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-brand-light-blue/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-white shadow-sm p-0.5">
              <Image
                src="/assets/hans-logo.png"
                alt="Hans Travels"
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-black text-brand-charcoal leading-tight">
                Hans Club Access
              </h3>
              <p className="text-[11px] text-slate-500">Sign in to view tickets & earn rewards</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {loggedIn ? (
            <div className="text-center py-6 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-lg font-bold text-brand-charcoal">Successfully Authenticated!</h4>
              <p className="text-xs text-slate-500">Welcome back to Hans Travels.</p>
            </div>
          ) : !otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  10-Digit Mobile Number
                </label>
                <div className="flex rounded-xl border border-slate-200 overflow-hidden focus-within:border-blue-400">
                  <span className="bg-slate-100 text-slate-600 px-3 py-3 text-sm font-bold flex items-center border-r border-slate-200">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="9826012345"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="w-full px-4 py-3 text-sm font-semibold focus:outline-none"
                  />
                </div>
              </div>

              {/* Ghost button with light blue border as per design constraints */}
              <button
                type="submit"
                disabled={mobile.length < 10}
                className="w-full py-3.5 bg-white border border-brand-blue-border hover:bg-brand-light-blue hover:border-blue-300 text-brand-charcoal text-sm font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                <span>Request Verification OTP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Enter 4-Digit OTP
                  </label>
                  <span className="text-xs text-blue-600 font-semibold cursor-pointer" onClick={() => setOtpSent(false)}>
                    Change (+91 {mobile})
                  </span>
                </div>
                <input
                  type="text"
                  required
                  placeholder="&bull; &bull; &bull; &bull;"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.slice(0, 4))}
                  className="w-full px-4 py-3 text-center tracking-widest text-xl font-black rounded-xl border border-slate-200 focus:outline-none focus:border-blue-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-brand-charcoal hover:bg-black text-white text-sm font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Verify & Continue</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
