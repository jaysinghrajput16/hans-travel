'use client';

import React from 'react';

export default function AppDownloadStrip() {
  return (
    <div className="w-full bg-white px-4 sm:px-6 lg:px-8">
      {/* Floating Premium Card Container */}
      <div className="max-w-6xl mx-auto my-10 sm:my-12 bg-gray-900 rounded-2xl shadow-2xl shadow-black/10 overflow-hidden relative border-l-4 border-red-600">
        
        {/* Background Polish: Faint abstract gradient shape */}
        <div className="absolute right-0 top-0 w-64 md:w-96 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Content Layout */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-6 md:px-10 gap-6">
          
          {/* Left Side (Typography & Value) */}
          <div className="flex flex-col text-left space-y-1">
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Take Hans Travels in your pocket.
            </h3>
            <p className="text-sm md:text-base text-gray-400 mt-1 max-w-xl font-normal leading-relaxed">
              Download our app for live bus tracking, mobile-only discounts, and instant cancellations.
            </p>
          </div>

          {/* Right Side (The Store Buttons) */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 shrink-0">
            {/* Apple App Store Link */}
            <a
              href="https://apps.apple.com/in/app/hans-travels/id1479011244"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3.5 bg-black hover:bg-black/90 text-white px-5 py-3 rounded-2xl border border-white/25 hover:border-white/50 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 min-w-[175px]"
              aria-label="Download Hans Travels on Apple App Store"
            >
              {/* High-Definition Apple SVG Icon */}
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8 fill-white flex-shrink-0 drop-shadow-xs transition-transform duration-200 group-hover:scale-105"
                viewBox="0 0 384 512"
                aria-hidden="true"
              >
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-gray-300 font-medium">
                  Download on the
                </span>
                <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                  App Store
                </span>
              </div>
            </a>

            {/* Google Play Link */}
            <a
              href="https://play.google.com/store/apps/details?id=com.hans.travel&hl=en_IN"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3.5 bg-black hover:bg-black/90 text-white px-5 py-3 rounded-2xl border border-white/25 hover:border-white/50 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 min-w-[175px]"
              aria-label="Get Hans Travels on Google Play"
            >
              {/* High-Definition Vibrant Google Play SVG Icon */}
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 drop-shadow-xs transition-transform duration-200 group-hover:scale-105"
                viewBox="0 0 512 512"
                aria-hidden="true"
              >
                <path
                  fill="#00D3FF"
                  d="M48.8 44.4C44 49.8 41.2 57.5 41.2 67v378c0 9.5 2.8 17.2 7.6 22.6l1.2 1.2 222.9-222.9v-5.2L50 43.2l-1.2 1.2z"
                />
                <path
                  fill="#FF3A44"
                  d="M344.2 316.5l-71.3-71.3L48.8 468.8c7.8 8.3 20.7 9.3 35.1 1.5l260.3-153.8z"
                />
                <path
                  fill="#00E676"
                  d="M344.2 195.5L83.9 41.7C69.5 33.9 56.6 34.9 48.8 43.2l224.1 223.6 71.3-71.3z"
                />
                <path
                  fill="#FFC400"
                  d="M344.2 195.5l75.3 44.5c21.8 12.9 21.8 34.1 0 47l-75.3 44.5-59.5-59.5v-17l59.5-59.5z"
                />
              </svg>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-gray-300 font-medium">
                  GET IT ON
                </span>
                <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                  Google Play
                </span>
              </div>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
