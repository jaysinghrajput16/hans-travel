'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Ticket, Briefcase } from 'lucide-react';

export default function SecondaryActionBanner({ onOpenManageBooking }) {
  return (
    <section className="w-full bg-gray-900 text-white py-8 sm:py-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          {/* Headline Text */}
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Plans changed? Manage your ticket instantly or join our growing team.
            </h3>
            <p className="text-xs sm:text-sm text-gray-400">
              Instant cancellation & refund assistance • Explore driver & operations openings across 4 states
            </p>
          </div>

          {/* Action Buttons: Manage Booking (Outline White) & View Careers (Solid Red) */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 flex-shrink-0">
            {/* Outline White: Manage Booking */}
            <button
              type="button"
              onClick={onOpenManageBooking}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer shadow-sm"
            >
              <Ticket className="w-4 h-4" />
              <span>Manage Booking</span>
            </button>

            {/* Solid Red: View Careers */}
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 cursor-pointer"
            >
              <Briefcase className="w-4 h-4" />
              <span>View Careers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
