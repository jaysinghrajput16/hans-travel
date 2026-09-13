'use client';

import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';

const POPULAR_ROUTES_DATA = [
  {
    id: 'route-1',
    from: 'Indore',
    to: 'Mumbai',
    price: '₹ 1,450',
    duration: '10h 30m',
  },
  {
    id: 'route-2',
    from: 'Indore',
    to: 'Pune',
    price: '₹ 1,500',
    duration: '11h 15m',
  },
  {
    id: 'route-3',
    from: 'Bhopal',
    to: 'Ahmedabad',
    price: '₹ 1,350',
    duration: '10h 45m',
  },
  {
    id: 'route-4',
    from: 'Indore',
    to: 'Delhi',
    price: '₹ 1,650',
    duration: '13h 00m',
  },
  {
    id: 'route-5',
    from: 'Bhopal',
    to: 'Mumbai',
    price: '₹ 1,550',
    duration: '11h 30m',
  },
  {
    id: 'route-6',
    from: 'Jabalpur',
    to: 'Indore',
    price: '₹ 850',
    duration: '7h 00m',
  },
];

export default function PopularRoutes({ onSelectRoute }) {
  const handleSelect = (route) => {
    if (onSelectRoute) {
      onSelectRoute({
        from: route.from,
        to: route.to,
        date: new Date().toISOString().split('T')[0],
        passengers: 1,
      });
    } else {
      const el = document.getElementById('booking-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="routes" className="w-full bg-white py-14 sm:py-18 border-b border-gray-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Popular Routes
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2 font-medium">
            Daily departures with guaranteed on-time performance.
          </p>
        </div>

        {/* Compact 6-Route Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {POPULAR_ROUTES_DATA.map((route) => (
            <div
              key={route.id}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Cities Heading */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg font-bold text-gray-900">
                      {route.from}
                    </span>
                    <ArrowRight className="w-4 h-4 text-red-600 group-hover:translate-x-0.5 transition-transform" />
                    <span className="text-base sm:text-lg font-bold text-gray-900">
                      {route.to}
                    </span>
                  </div>
                </div>

                {/* Approximate Journey Time & Starting Price */}
                <div className="py-3 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>Approx. {route.duration}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 mr-1">From</span>
                    <span className="text-base font-extrabold text-gray-900">
                      {route.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* View Buses CTA */}
              <button
                type="button"
                onClick={() => handleSelect(route)}
                className="w-full mt-2 py-2.5 px-4 rounded-xl bg-gray-50 hover:bg-red-600 text-gray-800 hover:text-white font-bold text-xs transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer group-hover:bg-red-600 group-hover:text-white"
              >
                <span>View Buses</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
