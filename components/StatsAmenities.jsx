'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Droplets,
  Navigation,
  Wind,
  Zap,
  Armchair,
  Sparkles,
} from 'lucide-react';
import { useCountUp } from '../hooks/useCountUp';

/**
 * Individual Stat Counter Card
 * Renders the count-up animated number with comma formatting,
 * placing '+' and '★' outside the animated value.
 */
function StatItem({ targetValue, duration = 2000, decimals = 0, suffix, label, sub, shouldAnimate }) {
  const { formattedValue } = useCountUp({
    targetValue,
    duration,
    decimals,
    start: shouldAnimate,
  });

  return (
    <div className="flex flex-col text-left space-y-1 group">
      {/* Animated Number with external suffix (+ / ★) to prevent glitching */}
      <div className="flex items-baseline">
        <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-brand-charcoal font-sans tabular-nums">
          {formattedValue}
        </span>
        {suffix && (
          <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-red-600 ml-0.5 select-none">
            {suffix}
          </span>
        )}
      </div>
      <span className="text-sm font-bold text-slate-800">
        {label}
      </span>
      <span className="text-xs text-slate-500 leading-relaxed">
        {sub}
      </span>
    </div>
  );
}

export default function StatsAmenities() {
  const statsContainerRef = useRef(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Scroll Trigger: IntersectionObserver triggers animation ONLY when in viewport, exactly once
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const node = statsContainerRef.current;
    if (!node || shouldAnimate) return;

    if (!('IntersectionObserver' in window)) {
      setShouldAnimate(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldAnimate(true);
          observer.disconnect(); // Runs only once per page load
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the stats section enters viewport
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [shouldAnimate]);

  const stats = [
    {
      targetValue: 90,
      suffix: '+',
      decimals: 0,
      duration: 1800,
      label: 'Daily Inter-City Services',
      sub: 'Across MP, Maharashtra, Gujarat & Delhi NCR',
    },
    {
      targetValue: 5000,
      suffix: '+',
      decimals: 0,
      duration: 2200,
      label: 'Daily Seat Bookings',
      sub: 'Trusted by over 1.8M travellers annually',
    },
    {
      targetValue: 150,
      suffix: '+',
      decimals: 0,
      duration: 2000,
      label: 'Premium Coaches',
      sub: 'Volvo 9600, Mercedes & BharatBenz',
    },
    {
      targetValue: 4.8,
      suffix: ' ★',
      decimals: 1,
      duration: 1900,
      label: 'Verified Passenger Rating',
      sub: 'Highest punctuality score in central India',
    },
  ];

  const amenities = [
    {
      icon: Droplets,
      title: 'Packaged Mineral Water',
      desc: 'Complimentary sealed 500ml bottle for every passenger',
    },
    {
      icon: Navigation,
      title: 'Real-Time GPS Tracking',
      desc: 'Live trip link sent via WhatsApp to family & friends',
    },
    {
      icon: Wind,
      title: 'Individual AC Louvers',
      desc: 'High-efficiency chilled air conditioning with fresh air intake',
    },
    {
      icon: Sparkles,
      title: 'Sanitized Blankets & Pillow',
      desc: 'Sealed hotel-standard freshly laundered duvets & linen',
    },
    {
      icon: Zap,
      title: 'Fast USB & Type-C Ports',
      desc: 'Dedicated individual power points at every berth & seat',
    },
    {
      icon: Armchair,
      title: 'Ergonomic Sleeper Berths',
      desc: 'Extra-wide memory foam with privacy curtains & reading lamp',
    },
  ];

  return (
    <section className="w-full bg-white py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Core Stats Bar: Scroll-Triggered with IntersectionObserver */}
        <div
          ref={statsContainerRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pb-12 border-b border-slate-100"
        >
          {stats.map((item, idx) => (
            <StatItem
              key={idx}
              targetValue={item.targetValue}
              duration={item.duration}
              decimals={item.decimals}
              suffix={item.suffix}
              label={item.label}
              sub={item.sub}
              shouldAnimate={shouldAnimate}
            />
          ))}
        </div>

        {/* Amenities Section with subtle Light Blue (#F4F9FF) separation background strip */}
        <div className="bg-brand-light-blue rounded-3xl p-6 sm:p-10 border border-blue-100/80 shadow-soft">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <span className="text-xs uppercase tracking-widest font-extrabold text-blue-700 bg-blue-100/60 px-3 py-1 rounded-full">
              Standard On Every Hans Coach
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-charcoal mt-3 tracking-tight">
              Crafted for Restful Night-Journeys
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Every detail is meticulously sanitized, maintained, and inspected before each departure.
            </p>
          </div>

          {/* Minimalist Light Blue SVG Icons in horizontal grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenities.map((amenity, idx) => {
              const IconComp = amenity.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-5 border border-blue-50 shadow-sm flex items-start gap-4 transition-transform hover:-translate-y-1 duration-200"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-light-blue border border-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-brand-charcoal">
                      {amenity.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {amenity.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
