'use client';

import React from 'react';
import { Ticket, PhoneCall } from 'lucide-react';

export default function BookingSupportCTA({ onOpenManageBooking }) {
  return (
    <section id="support" className="w-full bg-gray-900 text-white py-10 sm:py-12 border-t border-gray-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          {/* Header Copy */}
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Need help with your booking?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 font-normal">
              Manage your ticket, check your journey status or contact our support team.
            </p>
          </div>

          {/* Action Buttons: Manage Booking (Outline White) & Contact Support (Solid Red) */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 flex-shrink-0">
            <button
              type="button"
              onClick={onOpenManageBooking}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold text-sm transition-all duration-200 cursor-pointer shadow-xs"
            >
              <Ticket className="w-4 h-4" />
              <span>Manage Booking</span>
            </button>

            <button
              type="button"
              id="Contact Support"
              className="Contact Support contact-support inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contact Support</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
