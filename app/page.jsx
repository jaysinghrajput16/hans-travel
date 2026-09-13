'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import BusBookingWidget from '../components/BusBookingWidget';
import StatsSection from '../components/StatsSection';
import TheHansStandard from '../components/TheHansStandard';
import PopularRoutes from '../components/PopularRoutes';
import FleetShowcase from '../components/FleetShowcase';
import TrackBusSection from '../components/TrackBusSection';
import PassengerStories from '../components/PassengerStories';
import BookingSupportCTA from '../components/BookingSupportCTA';
import AppDownloadStrip from '../components/AppDownloadStrip';
import Footer from '../components/Footer';

import SearchResultsView from '../components/SearchResultsView';
import SearchResultsModal from '../components/SearchResultsModal';
import ManageBookingModal from '../components/ManageBookingModal';
import TrackBusModal from '../components/TrackBusModal';
import AuthModal from '../components/AuthModal';

export default function HomePage() {
  const [searchResultsOpen, setSearchResultsOpen] = useState(false);
  const [searchParams, setSearchParams] = useState({
    from: 'Indore',
    to: 'Jabalpur',
    date: '2026-09-12',
    passengers: 1,
  });

  const [manageBookingOpen, setManageBookingOpen] = useState(false);
  const [trackBusOpen, setTrackBusOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Search submit handler
  const handleBusSearch = (params) => {
    setSearchParams(params);
    setSearchResultsOpen(true);
  };

  // Route selection trigger from Popular Routes
  const handleSelectRoute = (route) => {
    setSearchParams({
      from: route.from,
      to: route.to,
      date: new Date().toISOString().split('T')[0],
      passengers: 1,
    });
    setSearchResultsOpen(true);
  };

  // When search is active, render the dedicated redBus-style search results page
  if (searchResultsOpen) {
    return (
      <SearchResultsView
        searchParams={searchParams}
        onBackHome={() => setSearchResultsOpen(false)}
        onModifySearch={(newParams) => setSearchParams(newParams)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 1. Sticky Navbar (Glassmorphism on scroll, clean 5 links) */}
      <Header
        onOpenManageBooking={() => setManageBookingOpen(true)}
        onOpenTrackBus={() => setTrackBusOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* 2. Full-Screen Hero Section with Background Video + Hero Copy + CTA Buttons + Booking Box */}
      <section id="hero" className="relative w-full min-h-screen flex flex-col justify-between pt-20 sm:pt-28 pb-10 sm:pb-16 bg-gray-950 scroll-mt-16 overflow-visible">
        {/* Full-Screen Background Video with 70% Opacity & GPU Hardware Layering */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black transform-gpu [transform:translateZ(0)] [will-change:transform] [backface-visibility:hidden]">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover scale-105 opacity-70 filter saturate-[0.95] brightness-95 contrast-[0.98] transition-opacity duration-700 transform-gpu [transform:translateZ(0)]"
          >
            <source src="/assets/hero-video.mp4" type="video/mp4" />
            <source src="/mark/videomp4.mp4" type="video/mp4" />
          </video>
          {/* Calibrated 30% Dark Overlay + Top/Bottom Vignette for Clean White Typography */}
          <div className="absolute inset-0 bg-black/30 z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-transparent to-black/75 z-10" />
        </div>

        {/* Hero Copy & CTA Buttons (High z-index: z-30) */}
        <div className="relative z-30 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3.5 sm:space-y-5 animate-slide-up my-auto pt-2 sm:pt-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs font-semibold uppercase tracking-wider shadow-lg">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Central India&apos;s Premier Luxury Transit
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] drop-shadow-xl">
            Travel Better. Arrive On Time.
          </h1>

          <p className="text-sm sm:text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto font-normal leading-relaxed drop-shadow-md">
            Premium sleeper buses connecting major cities across Central India.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5 pt-1 sm:pt-2 w-full max-w-xs sm:max-w-none mx-auto">
            <a
              href="#booking-section"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm sm:text-base transition-all duration-200 shadow-xl hover:shadow-red-600/30 hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Book Tickets Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#fleet"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm sm:text-base backdrop-blur-md border border-white/30 transition-all duration-200 shadow-lg hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Explore Our Fleet</span>
            </a>
          </div>
        </div>

        {/* The Booking Box: Directly integrated in Hero overlay with high z-index */}
        <div
          id="booking-section"
          className="relative z-30 max-w-6xl xl:max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 mt-6 sm:mt-10 mb-4 sm:mb-8 scroll-mt-28 animate-fade-in"
        >
          <BusBookingWidget onSearch={handleBusSearch} />
        </div>
      </section>

      {/* 3. Trust Statistics (Compact: 90+ Routes, 5K+ Daily Bookings, 150+ Coaches, 4.8★ Rating) */}
      <StatsSection />

      {/* 4. The Hans Standard (4 Clean Cards: Water, AC, USB, Sleeper) */}
      <TheHansStandard />

      {/* 5. Popular Routes (6 clean compact route cards) */}
      <PopularRoutes onSelectRoute={handleSelectRoute} />

      {/* 6. Our Fleet (Visual focus: Large bus image + 01/03 carousel + spec tags) */}
      <FleetShowcase />

      {/* 7. Track Your Bus (Simple on-page input + Track button) */}
      <TrackBusSection onOpenTrackBusModal={() => setTrackBusOpen(true)} />

      {/* 8. Passenger Stories (Clean horizontal review carousel) */}
      <PassengerStories />

      {/* 9. Booking Support CTA (Need help with your booking? + Manage Booking & Support buttons) */}
      <BookingSupportCTA onOpenManageBooking={() => setManageBookingOpen(true)} />

      {/* App Download Strip: Floating premium card just above footer */}
      <AppDownloadStrip />

      {/* 10. Clean Compact Footer (Quick links, Support, Policies, Careers, Copyright) */}
      <Footer onOpenManageBooking={() => setManageBookingOpen(true)} />

      {/* Interactive Modals */}
      <SearchResultsModal
        isOpen={searchResultsOpen}
        onClose={() => setSearchResultsOpen(false)}
        searchParams={searchParams}
      />

      <ManageBookingModal
        isOpen={manageBookingOpen}
        onClose={() => setManageBookingOpen(false)}
      />

      <TrackBusModal
        isOpen={trackBusOpen}
        onClose={() => setTrackBusOpen(false)}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
}
