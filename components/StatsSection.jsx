'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useCountUp } from '../hooks/useCountUp';

/**
 * Compact Stat Item
 * Clean, minimal typography without long explanatory sentences.
 */
function StatItem({ targetValue, duration = 1800, decimals = 0, suffix, label, shouldAnimate }) {
  const { formattedValue } = useCountUp({
    targetValue,
    duration,
    decimals,
    start: shouldAnimate,
  });

  return (
    <div className="flex flex-col text-center sm:text-left space-y-0.5 group">
      <div className="flex items-baseline justify-center sm:justify-start">
        <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gray-900 font-sans tabular-nums">
          {formattedValue}
        </span>
        {suffix && (
          <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-red-600 ml-0.5 select-none">
            {suffix}
          </span>
        )}
      </div>
      <span className="text-xs sm:text-sm font-bold text-gray-700 tracking-wide uppercase">
        {label}
      </span>
    </div>
  );
}

export default function StatsSection() {
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
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
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
      duration: 1600,
      label: 'Routes',
    },
    {
      targetValue: 5,
      suffix: 'K+',
      decimals: 0,
      duration: 1800,
      label: 'Daily Bookings',
    },
    {
      targetValue: 150,
      suffix: '+',
      decimals: 0,
      duration: 1800,
      label: 'Premium Coaches',
    },
    {
      targetValue: 4.8,
      suffix: '★',
      decimals: 1,
      duration: 1600,
      label: 'Passenger Rating',
    },
  ];

  return (
    <section id="stats" className="w-full bg-white py-10 sm:py-14 border-b border-gray-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={statsContainerRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
        >
          {stats.map((item, idx) => (
            <StatItem
              key={idx}
              targetValue={item.targetValue}
              duration={item.duration}
              decimals={item.decimals}
              suffix={item.suffix}
              label={item.label}
              shouldAnimate={shouldAnimate}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
