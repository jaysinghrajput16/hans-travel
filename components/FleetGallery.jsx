'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FLEET_DETAILS } from '../lib/mockData';
import { Shield, Sparkles, Check, ChevronRight } from 'lucide-react';

export default function FleetGallery() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Flagship Sleeper', 'Interior Comfort', 'Inter-City Express', 'Long-Haul Transit'];

  const filteredFleet = activeCategory === 'All'
    ? FLEET_DETAILS
    : FLEET_DETAILS.filter(item => item.category === activeCategory);

  return (
    <section id="fleet" className="w-full bg-white py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">
              The Hans Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-charcoal tracking-tight mt-1">
              India's Most Sophisticated Fleet
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-xl">
              Equipped with German chassis stability, dual electronic retarders, and acoustic soundproofing for unmatched on-road serenity.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-brand-charcoal text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredFleet.map((coach) => (
            <div
              key={coach.id}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col"
            >
              {/* Photo Viewport */}
              <div className="relative w-full h-72 sm:h-80 overflow-hidden bg-slate-100">
                <Image
                  src={coach.image}
                  alt={coach.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-4 left-4 bg-brand-charcoal/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {coach.category}
                </div>
              </div>

              {/* Card Meta & Highlights */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-brand-charcoal group-hover:text-slate-700 transition-colors">
                    {coach.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mt-1">
                    {coach.specs}
                  </p>
                </div>

                {/* Features Tags */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-100">
                  {coach.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <div className="w-4 h-4 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className="truncate">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
