'use client';

import React from 'react';
import Link from 'next/link';
import { Droplets, Wind, Zap, BedDouble, Trophy, ArrowRight } from 'lucide-react';

const STANDARD_FEATURES = [
  {
    icon: Droplets,
    title: 'Complimentary Water',
    desc: 'Sealed 500ml packaged mineral water placed at your berth.',
  },
  {
    icon: Wind,
    title: 'Personal AC',
    desc: 'Individual adjustable louvers with fresh chilled air intake.',
  },
  {
    icon: Zap,
    title: 'USB + Type-C Charging',
    desc: 'Dedicated high-speed personal power outlets at every seat.',
  },
  {
    icon: BedDouble,
    title: 'Sleeper Comfort',
    desc: 'Wide memory-foam berths with hotel-grade sanitized duvets.',
  },
];

export default function TheHansStandard() {
  return (
    <section id="standard" className="w-full bg-[#F4F9FF] py-14 sm:py-18 border-b border-blue-100/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            The Hans Standard
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2 font-medium">
            Safe. Clean. Comfortable.
          </p>
        </div>

        {/* 4 Clean Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STANDARD_FEATURES.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-blue-50 shadow-xs hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-start group"
              >
                {/* Simple Line Icon with soft hover animation */}
                <div className="w-12 h-12 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200 mb-4">
                  <IconComp className="w-6 h-6 stroke-[1.8]" />
                </div>

                {/* Short Title */}
                <h3 className="text-base font-bold text-gray-900 tracking-tight mb-1.5">
                  {item.title}
                </h3>

                {/* One Short Description */}
                <p className="text-xs text-gray-500 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Industry Awards Recognition Callout */}
        <div className="mt-10 p-4 sm:p-5 rounded-2xl bg-white border border-blue-100 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0 text-amber-600">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-gray-900">
                Recognized for Excellence in Transit Safety &amp; Industry Leadership
              </p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                India Bus Safety Awards (Abhibus 2017) &bull; India Bus Awards Finalist (Ashok Leyland 2018)
              </p>
            </div>
          </div>
          <Link
            href="/about-us"
            className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors flex items-center gap-1 flex-shrink-0"
          >
            <span>Read Our Story &amp; Awards</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
