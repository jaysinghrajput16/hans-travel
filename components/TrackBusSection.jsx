'use client';

import React, { useState } from 'react';
import { Navigation, Search, CheckCircle, MapPin } from 'lucide-react';

export default function TrackBusSection({ onOpenTrackBusModal }) {
  const [identifier, setIdentifier] = useState('');
  const [trackedInfo, setTrackedInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!identifier.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setTrackedInfo({
        busNumber: 'MP-09-FA-8822',
        route: 'Indore → Mumbai',
        status: 'On Schedule',
        location: 'Approaching Ashta Bypass (NH 46)',
        updated: '2 mins ago',
      });
    }, 350);
  };

  return (
    <section id="track-bus" className="w-full bg-white py-14 sm:py-18 border-b border-gray-100 scroll-mt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Section Header */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
            <Navigation className="w-5 h-5 stroke-[2]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Track Your Bus
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2 font-medium">
            Know where your journey is, in real time.
          </p>
        </div>

        {/* Extremely Simple Input & Button */}
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-2.5 p-2 bg-slate-50 border border-slate-200/90 rounded-2xl shadow-xs focus-within:ring-2 focus-within:ring-gray-900 focus-within:border-transparent transition-all">
            <div className="flex-1 flex items-center px-3 gap-2.5">
              <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                id="track-bus-input"
                name="busIdentifier"
                aria-label="Booking ID or Mobile Number"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter Booking ID / Mobile Number"
                className="w-full py-2.5 text-sm sm:text-base font-medium text-gray-900 bg-transparent focus:outline-none placeholder:text-gray-400 placeholder:font-normal"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm tracking-wide shadow-sm hover:shadow transition-all duration-200 cursor-pointer disabled:opacity-75 flex-shrink-0"
            >
              {isLoading ? 'Locating...' : 'Track Bus'}
            </button>
          </div>
        </form>

        {/* Concise Real-Time Result Card */}
        {trackedInfo && (
          <div className="mt-6 max-w-xl mx-auto bg-green-50/70 border border-green-200/80 rounded-2xl p-4 text-left animate-fade-in flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                  {trackedInfo.status}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs font-semibold text-gray-700">
                  {trackedInfo.route}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-600">
                <MapPin className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                <span className="font-medium">{trackedInfo.location}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenTrackBusModal?.()}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline self-start sm:self-center"
            >
              View Full GPS Map →
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
