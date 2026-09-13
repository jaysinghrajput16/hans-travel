'use client';

import React, { useRef } from 'react';

/**
 * Mock Data: High-Trust Passenger Reviews
 * Highly specific transport experiences reflecting actual Hans Travels routes, coaches, and amenities.
 */
const PASSENGER_REVIEWS = [
  {
    name: 'Vikramaditya Sharma',
    initials: 'VS',
    route: '🚌 Indore → Pune',
    reviewText:
      'The Volvo 9600 was spotless. We left exact on time and the driver drove very safely through the ghats. Best sleep I\'ve had on a bus.',
    date: '3 days ago',
    rating: 5,
  },
  {
    name: 'Pooja Deshmukh',
    initials: 'PD',
    route: '🚌 Indore → Mumbai',
    reviewText:
      'Traveled with my elderly mother on the lower sleeper berths. The air suspension made the highway ride bump-free, and the staff helped us with heavy luggage at Borivali at 5 AM. Outstanding care.',
    date: '1 week ago',
    rating: 5,
  },
  {
    name: 'Ananya Singhania',
    initials: 'AS',
    route: '🚌 Bhopal → Ahmedabad',
    reviewText:
      'Real-time WhatsApp GPS link kept my family completely at ease. Fresh sanitized duvet, high-speed Type-C charging port, and we pulled into the terminal 10 minutes ahead of schedule.',
    date: '2 weeks ago',
    rating: 5,
  },
];

export default function PassengerReviews() {
  const scrollContainerRef = useRef(null);

  return (
    <section className="w-full bg-white py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold tracking-wide uppercase mb-3">
            <span>Real Rider Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
            Verified Passenger Reviews
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-3">
            Over 1.8M verified passenger trips with 4.8★ punctuality across central India
          </p>
        </div>

        {/* Reviews Container:
            - Mobile: Smooth horizontal scrolling snap container (overflow-x-auto snap-x snap-mandatory)
            - Desktop: Responsive CSS grid (md:grid md:grid-cols-3 md:gap-6)
        */}
        <div
          ref={scrollContainerRef}
          className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory pb-4 md:pb-0 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0"
        >
          {PASSENGER_REVIEWS.map((review, idx) => (
            <div
              key={idx}
              className="min-w-[85vw] sm:min-w-[320px] md:min-w-0 snap-center flex-shrink-0 md:flex-shrink bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 border border-slate-100 flex flex-col justify-between"
            >
              <div>
                {/* Card Header (User Info) */}
                <div className="flex items-center gap-3.5">
                  {/* Avatar: Perfect circle, soft red bg, brand Red text, user initials */}
                  <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 border border-red-100/60 shadow-inner">
                    <span className="text-red-600 font-bold text-lg leading-none select-none">
                      {review.initials}
                    </span>
                  </div>

                  {/* Name, Verified Badge & Route */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-gray-900 font-semibold text-base truncate">
                        {review.name}
                      </span>
                      {/* Tiny SVG checkmark icon colored Light Blue to signify "Verified Booking" */}
                      <svg
                        className="w-4 h-4 text-blue-500 flex-shrink-0"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-label="Verified Booking"
                        title="Verified Booking"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    {/* Route */}
                    <p className="text-xs text-gray-500 font-medium mt-0.5 truncate">
                      {review.route}
                    </p>
                  </div>
                </div>

                {/* Stars: Solid Red SVG star icons */}
                <div className="flex items-center gap-1 mt-4">
                  {[...Array(review.rating)].map((_, starIdx) => (
                    <svg
                      key={starIdx}
                      className="w-4 h-4 text-red-600 fill-red-600"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-600 text-sm leading-relaxed mt-3">
                  "{review.reviewText}"
                </p>
              </div>

              {/* Date: Bottom right of the card */}
              <p className="text-xs text-gray-400 mt-5 text-right font-medium">
                {review.date}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Cue */}
        <div className="flex md:hidden items-center justify-center gap-1.5 mt-4 text-xs text-gray-400 font-medium">
          <span>Swipe to explore more reviews</span>
          <span>→</span>
        </div>
      </div>
    </section>
  );
}
