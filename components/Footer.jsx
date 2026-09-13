'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MessageSquare } from 'lucide-react';

export default function Footer({ onOpenManageBooking }) {
  const scrollTo = (id) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-gray-950 text-white pt-6 sm:pt-12 pb-5 sm:pb-8 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 sm:gap-8 pb-5 sm:pb-8 border-b border-gray-900">
          
          {/* Brand & Short Description */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1 space-y-2 sm:space-y-3">
            <Link
              href="/"
              onClick={() => scrollTo('hero')}
              className="inline-block focus:outline-none"
              aria-label="Hans Travels Home"
            >
              <Image
                src="/assets/hans-logo-footer.png"
                alt="Hans Travels"
                width={782}
                height={296}
                className="w-28 sm:w-36 md:w-44 h-auto object-contain"
                priority
              />
            </Link>
            <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed max-w-sm">
              Hans Travels I Pvt Ltd. — Leading commercial passenger transit since 1980s. Operating 150+ buses across 50+ routes &amp; 70+ cities. Home on wheels.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-1.5 sm:space-y-2.5">
            <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-200">
              Quick Links
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs text-gray-400">
              <li>
                <Link
                  href="/about-us"
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('hero')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('routes')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Popular Routes
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('fleet')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Fleet
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('track-bus')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Track Bus
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenManageBooking}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Manage Booking
                </button>
              </li>
            </ul>
          </div>

          {/* Policies & Info */}
          <div className="space-y-1.5 sm:space-y-2.5">
            <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-200">
              Policies & Info
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs text-gray-400">
              <li>
                <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/quick-cancel" className="hover:text-white transition-colors">
                  Cancellation & Refund
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-white transition-colors font-semibold">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1 space-y-2 sm:space-y-2.5 pt-1 sm:pt-0">
            <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-200">
              Support
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500 shrink-0" />
                <a href="tel:+917314004000" className="hover:text-white transition-colors font-medium">
                  0731-4004000
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500 shrink-0" />
                <a href="mailto:support@hanstravels.com" className="hover:text-white transition-colors font-medium truncate">
                  support@hanstravels.com
                </a>
              </li>
              <li>
                <button
                  type="button"
                  id="Contact Support"
                  className="Contact Support contact-support text-red-400 hover:text-red-300 font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  <span>Contact Support (Live Chat)</span>
                </button>
              </li>
              <li className="text-[10px] sm:text-[11px] text-gray-500">
                24x7 Central Helpdesk & Telematics Hub
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-3 text-[10px] sm:text-xs text-gray-500 text-center sm:text-left">
          <p>
            &copy; {new Date().getFullYear()} Hans Travels. All rights reserved.
          </p>
          <p className="text-[10px] sm:text-[11px] text-gray-600">
            Premium Inter-City Bus Transit
          </p>
        </div>
      </div>
    </footer>
  );
}
