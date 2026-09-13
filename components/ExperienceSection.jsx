'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Droplets,
  Sparkles,
  Navigation,
  Wind,
  Zap,
  Armchair,
  ChevronLeft,
  ChevronRight,
  Shield,
} from 'lucide-react';

const AMENITIES = [
  {
    icon: Droplets,
    title: 'Packaged Mineral Water',
    desc: 'Complimentary sealed bottle at your berth',
  },
  {
    icon: Sparkles,
    title: 'Sanitized Blankets & Pillow',
    desc: 'Freshly laundered, hotel-grade sealed duvets',
  },
  {
    icon: Navigation,
    title: 'Real-Time GPS Tracking',
    desc: 'Live trip link sent via WhatsApp to family',
  },
  {
    icon: Wind,
    title: 'Individual AC Louvers',
    desc: 'Personal temperature control with fresh air intake',
  },
  {
    icon: Zap,
    title: 'Fast USB & Type-C Ports',
    desc: 'Individual high-speed charging for every passenger',
  },
  {
    icon: Armchair,
    title: 'Ergonomic Sleeper Berths',
    desc: 'Memory foam mattresses with privacy blackout curtains',
  },
];

const CAROUSEL_SLIDES = [
  {
    id: 1,
    image: '/assets/bus-hero.jpg',
    title: 'Volvo 9600 Multi-Axle Flagship',
    tag: 'Highway Fleet',
    desc: '15-meter low-NVH chassis with dual electronic retarders for bump-free overnight transit.',
  },
  {
    id: 2,
    image: '/assets/bus-interior.jpg',
    title: 'Executive Sleeper Suite',
    tag: 'Cabin Luxury',
    desc: 'Full-length memory foam berths with sanitized duvets and individual climate vents.',
  },
  {
    id: 3,
    image: '/assets/bus-blue.jpg',
    title: 'Scania Touring Long-Haul',
    tag: 'Inter-City Express',
    desc: 'Electronic Stability Program (ESP) and anti-roll bars engineered for Ghat safety.',
  },
  {
    id: 4,
    image: '/assets/bus-mint.jpg',
    title: 'Mercedes-Benz 2436 Sleeper',
    tag: 'German Engineering',
    desc: 'Acoustically insulated cabin with fire detection & suppression system (FDSS).',
  },
];

export default function ExperienceSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-advance carousel every 4.5 seconds, pause on hover
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isHovered]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? CAROUSEL_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  return (
    <section className="w-full bg-[#F4F9FF] py-16 sm:py-24 border-t border-b border-blue-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200/60 text-blue-700 text-xs font-bold tracking-wide uppercase mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>Uncompromising Quality</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
            The Hans Standard
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
            Every coach undergoes a rigorous 48-point safety and sanitization inspection before every departure.
          </p>
        </div>

        {/* Split Section: Amenities (Left) + Auto-Playing Carousel (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Clean Grid of Light Blue SVG Amenity Icons */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {AMENITIES.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-5 border border-blue-50 shadow-xs hover:shadow-md transition-all duration-200 flex items-start gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#F0F7FF] border border-blue-100/80 flex items-center justify-center flex-shrink-0 text-blue-600 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <h3 className="text-sm font-bold text-gray-900 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Auto-Playing Subtle Carousel */}
          <div
            className="lg:col-span-6 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative h-[360px] sm:h-[420px] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              {CAROUSEL_SLIDES.map((slide, index) => {
                const isActive = index === currentSlide;
                return (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index === 0}
                    />
                    
                    {/* Subtle gradient overlay for caption contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/85 via-gray-950/30 to-transparent" />

                    {/* Slide Caption Card */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white z-20">
                      <div className="inline-block px-2.5 py-0.5 rounded-md bg-red-600 text-[11px] font-extrabold uppercase tracking-wider mb-2">
                        {slide.tag}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        {slide.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-200 mt-1 max-w-md line-clamp-2">
                        {slide.desc}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* Navigation Arrows */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous bus slide"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-900 flex items-center justify-center backdrop-blur-sm shadow-md transition-transform hover:scale-105"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next bus slide"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-900 flex items-center justify-center backdrop-blur-sm shadow-md transition-transform hover:scale-105"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Carousel Dot Indicators */}
              <div className="absolute bottom-3 right-6 z-20 flex items-center gap-1.5">
                {CAROUSEL_SLIDES.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => setCurrentSlide(dotIdx)}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      dotIdx === currentSlide
                        ? 'w-6 bg-red-600'
                        : 'w-2 bg-white/60 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
