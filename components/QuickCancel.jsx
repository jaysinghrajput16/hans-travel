'use client';

import React, { useState } from 'react';
import { Ticket, Phone, CheckCircle2, ArrowLeft, ShieldCheck } from 'lucide-react';

/**
 * Ultra-simple, 2-step "Quick Cancel" component.
 * Priority: Absolute simplicity and zero cognitive load.
 *
 * @param {Object} props
 * @param {Function} [props.onClose] - Optional close/exit callback if rendered inside a modal
 * @param {Function} [props.onSuccess] - Optional callback after cancellation confirmed
 */
export default function QuickCancel({ onClose, onSuccess }) {
  // Step 1: Lookup screen, Step 2: One-click confirmation, Step 3: Success feedback
  const [step, setStep] = useState(1);
  const [pnr, setPnr] = useState('');
  const [mobile, setMobile] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketData, setTicketData] = useState({
    route: 'Indore to Mumbai',
    date: '17 Sep 2026',
    refundAmount: 720,
    pnr: 'HT-892401',
  });

  const handleLookup = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Fast simulated lookup (200ms) for snappy, native feel
    setTimeout(() => {
      setIsSubmitting(false);
      setTicketData((prev) => ({
        ...prev,
        pnr: pnr.trim() ? pnr.trim().toUpperCase() : 'HT-892401',
      }));
      setStep(2);
    }, 250);
  };

  const handleKeepTicket = () => {
    if (onClose) {
      onClose();
    } else {
      setStep(1);
    }
  };

  const handleConfirmCancel = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3); // Success confirmation view
      if (onSuccess) onSuccess();
    }, 300);
  };

  const handleReset = () => {
    setStep(1);
    setPnr('');
    setMobile('');
  };

  return (
    <div className="w-full">
      {/* Container: Minimalist white card */}
      <div className="bg-white rounded-2xl shadow-lg max-w-md mx-auto p-8 border border-gray-100 transition-all duration-300">
        
        {/* ================= STEP 1: THE LOOKUP SCREEN ================= */}
        {step === 1 && (
          <div className="animate-fade-in space-y-6">
            {/* Header */}
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold tracking-wide uppercase mb-2">
                <span>Instant Refund Guarantee</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                Quick Cancellation
              </h2>
              <p className="text-sm text-gray-500">
                No login required. Just enter your details.
              </p>
            </div>

            {/* Simple Form */}
            <form onSubmit={handleLookup} className="space-y-4">
              {/* Field 1: Ticket / PNR Number */}
              <div className="space-y-1.5 text-left">
                <label
                  htmlFor="quick-cancel-pnr"
                  className="block text-xs font-bold uppercase tracking-wider text-gray-700"
                >
                  Ticket / PNR Number
                </label>
                <div className="relative">
                  <input
                    id="quick-cancel-pnr"
                    type="text"
                    required
                    value={pnr}
                    onChange={(e) => setPnr(e.target.value)}
                    placeholder="e.g. HT-892401"
                    className="w-full px-4 py-3.5 text-base font-semibold text-gray-900 bg-gray-50/70 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all uppercase placeholder:normal-case placeholder:font-normal placeholder:text-gray-400"
                  />
                  <Ticket className="w-5 h-5 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Field 2: Mobile Number (with automatic +91 prefix) */}
              <div className="space-y-1.5 text-left">
                <label
                  htmlFor="quick-cancel-mobile"
                  className="block text-xs font-bold uppercase tracking-wider text-gray-700"
                >
                  Mobile Number
                </label>
                <div className="flex rounded-xl border border-gray-200 bg-gray-50/70 overflow-hidden focus-within:bg-white focus-within:border-gray-900 focus-within:ring-2 focus-within:ring-gray-900 transition-all">
                  <span className="bg-gray-100/90 text-gray-700 px-3.5 py-3.5 text-sm font-bold border-r border-gray-200 flex items-center select-none">
                    +91
                  </span>
                  <input
                    id="quick-cancel-mobile"
                    type="tel"
                    required
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                    placeholder="98765 43210"
                    className="w-full px-4 py-3.5 text-base font-medium text-gray-900 bg-transparent focus:outline-none placeholder:text-gray-400 tracking-wider"
                  />
                  <div className="pr-3.5 flex items-center pointer-events-none">
                    <Phone className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Submit Button: Solid black/charcoal */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gray-900 hover:bg-black text-white w-full rounded-xl py-4 font-bold text-base transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-75 cursor-pointer mt-2"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Finding Ticket...</span>
                  </span>
                ) : (
                  'Find My Ticket'
                )}
              </button>
            </form>

            <div className="pt-1 text-center">
              <p className="text-[11px] text-gray-400 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
                <span>Instant automated refund processing directly to source</span>
              </p>
            </div>
          </div>
        )}

        {/* ================= STEP 2: THE "ONE-CLICK" CONFIRMATION SCREEN ================= */}
        {step === 2 && (
          <div className="animate-fade-in space-y-5">
            {/* Header */}
            <div className="text-center space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full">
                Ticket Found ({ticketData.pnr})
              </span>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight pt-1">
                Quick Cancellation
              </h2>
            </div>

            {/* Trip Summary: Very brief */}
            <div className="text-center py-1">
              <p className="text-sm font-semibold text-gray-800">
                {ticketData.route} • {ticketData.date}
              </p>
            </div>

            {/* The Money Box (CRITICAL UI) */}
            <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center mt-4">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                Your Refund Amount
              </p>
              <p className="text-green-700 text-3xl sm:text-4xl font-black my-1 tracking-tight">
                ₹ {ticketData.refundAmount}
              </p>
              <p className="text-[11px] text-gray-500 font-normal leading-relaxed mt-1">
                Processed instantly to your original payment method.
              </p>
            </div>

            {/* The Final Buttons: Side-by-side */}
            <div className="flex items-center justify-between gap-3 pt-3">
              {/* Left Button: Nevermind, Keep It */}
              <button
                type="button"
                onClick={handleKeepTicket}
                className="text-gray-500 hover:text-black font-medium text-sm px-3 py-3 transition-colors cursor-pointer text-left"
              >
                Nevermind, Keep It
              </button>

              {/* Right Button: Confirm Cancellation */}
              <button
                type="button"
                onClick={handleConfirmCancel}
                disabled={isSubmitting}
                className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-200 border border-red-200 px-6 py-3 rounded-xl font-bold text-sm cursor-pointer shadow-xs disabled:opacity-75 flex-shrink-0"
              >
                {isSubmitting ? 'Cancelling...' : 'Confirm Cancellation'}
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: SUCCESS FEEDBACK ================= */}
        {step === 3 && (
          <div className="animate-fade-in text-center space-y-4 py-2">
            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-gray-900">
                Cancellation Confirmed
              </h3>
              <p className="text-xs text-gray-500">
                Ticket <span className="font-semibold text-gray-700">{ticketData.pnr}</span> cancelled successfully.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-100 text-xs text-gray-600 space-y-1">
              <div className="flex justify-between">
                <span>Refund Amount:</span>
                <span className="font-bold text-green-700">₹ {ticketData.refundAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Mode of Refund:</span>
                <span className="font-medium text-gray-900">Original Payment Source</span>
              </div>
              <div className="flex justify-between">
                <span>ETA:</span>
                <span className="font-medium text-gray-900">Instant (Within 2 Hours)</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose || handleReset}
              className="w-full py-3 bg-gray-900 hover:bg-black text-white font-bold text-sm rounded-xl transition-all cursor-pointer mt-2"
            >
              {onClose ? 'Close' : 'Done'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
