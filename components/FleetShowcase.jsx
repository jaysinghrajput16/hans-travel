'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FLEET_BUSES = [
  {
    id: 1,
    name: 'Volvo 9600',
    type: 'Multi-Axle Sleeper',
    image: '/assets/bus-hero.webp',
    tags: ['Sleeper', 'AC', 'USB', 'GPS'],
  },
  {
    id: 2,
    name: 'Mercedes-Benz 2436',
    type: 'Luxury AC Sleeper',
    image: '/assets/fleet-bus-2.jpg',
    tags: ['Sleeper', 'AC', 'USB', 'GPS'],
  },
  {
    id: 3,
    name: 'Scania Touring',
    type: 'Inter-City Express',
    image: '/assets/fleet-bus-3.jpg',
    tags: ['Sleeper', 'AC', 'USB', 'GPS'],
  },
];

export default function FleetShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? FLEET_BUSES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % FLEET_BUSES.length);
  };

  const currentBus = FLEET_BUSES[currentIndex];

  return (
    <section id="fleet" className="w-full bg-[#F4F9FF] py-14 sm:py-20 border-b border-blue-100/60 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Our Fleet
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2 font-medium">
            Premium coaches built for comfortable overnight travel.
          </p>
        </div>

        {/* The Bus Image Showcase (Visual Focus) */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border-2 border-white bg-gray-900 aspect-[16/10] sm:aspect-[21/9]">
          <Image
            key={currentBus.id}
            src={currentBus.image}
            alt={`${currentBus.name} ${currentBus.type}`}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover object-center transition-all duration-500 ease-out"
            loading="lazy"
          />
          {/* Subtle gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Information & Simple Carousel Controls Below Image */}
        <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-5 sm:p-6 border border-blue-50 shadow-xs">
          
          {/* Coach Title & Specification Tags */}
          <div className="space-y-2">
            <div className="flex items-baseline gap-2.5 flex-wrap">
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                {currentBus.name}
              </h3>
              <span className="text-sm font-semibold text-slate-500">
                {currentBus.type}
              </span>
            </div>

            {/* Small Specification Tags: Sleeper, AC, USB, GPS */}
            <div className="flex items-center gap-2 flex-wrap pt-0.5">
              {currentBus.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-bold text-[11px] uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Simple Carousel Controls: 01 / 03 with small navigation arrows */}
          <div className="flex items-center gap-3 self-end sm:self-center">
            <span className="text-sm font-black text-gray-800 tracking-wider">
              {`${String(currentIndex + 1).padStart(2, '0')} / ${String(FLEET_BUSES.length).padStart(2, '0')}`}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous coach"
                className="w-9 h-9 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 flex items-center justify-center transition-colors shadow-xs cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next coach"
                className="w-9 h-9 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 flex items-center justify-center transition-colors shadow-xs cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
