'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Vikramaditya Sharma',
    route: 'Indore → Pune',
    rating: 5,
    text: 'The Volvo 9600 was spotless. Left on time and the driver was very careful through the ghats. Best sleep on a bus.',
  },
  {
    id: 2,
    name: 'Pooja Deshmukh',
    route: 'Indore → Mumbai',
    rating: 5,
    text: 'Traveled on lower sleeper berths with my mother. Smooth air suspension and luggage assistance at Borivali at 5 AM.',
  },
  {
    id: 3,
    name: 'Ananya Singhania',
    route: 'Bhopal → Ahmedabad',
    rating: 5,
    text: 'Real-time WhatsApp tracking kept my family assured. Clean sanitized blanket, fast USB port, and arrived 10 mins early.',
  },
  {
    id: 4,
    name: 'Rajesh K. Patel',
    route: 'Indore → Delhi NCR',
    rating: 5,
    text: 'Strict quiet hours after 11 PM allowed me to work and sleep peacefully before my morning client meeting.',
  },
];

export default function PassengerStories() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  return (
    <section id="reviews" className="w-full bg-[#F4F9FF] py-14 sm:py-20 border-b border-blue-100/60 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Passenger Stories
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2 font-medium">
              Real experiences from Hans Travels passengers.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous story"
              className="w-9 h-9 rounded-xl border border-blue-100 bg-white hover:bg-blue-50 text-gray-700 flex items-center justify-center transition-colors shadow-xs cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next story"
              className="w-9 h-9 rounded-xl border border-blue-100 bg-white hover:bg-blue-50 text-gray-700 flex items-center justify-center transition-colors shadow-xs cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Viewport: Smooth Touch-Scrolling Snap on Mobile, 3-Card Grid on Desktop */}
        <div className="flex md:grid md:grid-cols-3 gap-5 overflow-x-auto md:overflow-x-visible scroll-smooth snap-x snap-mandatory overscroll-x-contain pb-4 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-4 px-4 sm:mx-0 sm:px-0">
          {[0, 1, 2].map((offset) => {
            const review = REVIEWS[(currentIndex + offset) % REVIEWS.length];
            return (
              <div
                key={review.id}
                className="bg-white rounded-2xl p-6 border border-blue-50 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between shrink-0 w-[85%] sm:w-[70%] md:w-auto snap-center"
              >
                <div>
                  {/* Rating Stars (5 solid red stars) */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-red-600 text-red-600" />
                    ))}
                  </div>

                  {/* Short Review */}
                  <p className="text-sm text-gray-700 leading-relaxed font-normal">
                    "{review.text}"
                  </p>
                </div>

                {/* Author & Route */}
                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-900">
                    {review.name}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-50 px-2 py-0.5 rounded">
                    {review.route}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
