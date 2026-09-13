'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ManageBookingModal from '../../components/ManageBookingModal';
import TrackBusModal from '../../components/TrackBusModal';
import AuthModal from '../../components/AuthModal';
import {
  Bus,
  ShieldCheck,
  Award,
  Clock,
  MapPin,
  CheckCircle2,
  Calendar,
  PhoneCall,
  ArrowRight,
  Sparkles,
  Users,
  Compass,
  Trophy,
  Building
} from 'lucide-react';

const DIFFERENTIATORS = [
  {
    title: 'Booking & Schedule Convenience',
    desc: 'Convenience in bus timings, booking, modification and cancellation, etc.',
  },
  {
    title: 'End-to-End Connectivity',
    desc: 'End-to-end connectivity with affordable fares across 70+ major cities.',
  },
  {
    title: 'Ultimate Comfort & Coziness',
    desc: 'Sophisticated, latest, comfortable buses for ultimate comfort and coziness.',
  },
  {
    title: 'Seat & Bus Flexibility',
    desc: 'Greater flexibility in choosing, adjusting seats and buses.',
  },
  {
    title: 'Guaranteed Punctuality',
    desc: 'On-time departure and adherence to arrival time schedules.',
  },
  {
    title: 'Passenger Safety First',
    desc: 'High class passenger safety and convenience with telematics monitoring.',
  },
  {
    title: 'Widespread Agent Network',
    desc: 'Wide spread network of offices/agents for booking (to/return) and query management.',
  },
];

const CITIES = [
  'Mumbai',
  'Pune',
  'Bangalore',
  'Hyderabad',
  'Nagpur',
  'Lucknow',
  'Delhi',
  'Jaipur',
  'Ahmedabad',
  'Surat',
  'Indore (HQ)',
];

export default function AboutUsPage() {
  const [manageBookingOpen, setManageBookingOpen] = useState(false);
  const [trackBusOpen, setTrackBusOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col selection:bg-red-500 selection:text-white">
      {/* Header */}
      <Header
        onOpenManageBooking={() => setManageBookingOpen(true)}
        onOpenTrackBus={() => setTrackBusOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold uppercase tracking-wider text-red-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Operating Since 1980s &bull; Indore HQ</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white max-w-4xl leading-tight">
            About Hans Travels I Pvt Ltd.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl font-normal leading-relaxed">
            Central India&apos;s leading commercial business transportation network. Connecting millions with comfort, punctuality, and trust for more than four decades.
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 max-w-4xl">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">Legacy</span>
              <p className="text-2xl sm:text-3xl font-black text-white mt-1">1980s</p>
              <span className="text-[11px] text-slate-300">40+ Years of Excellence</span>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">Active Fleet</span>
              <p className="text-2xl sm:text-3xl font-black text-white mt-1">150+</p>
              <span className="text-[11px] text-slate-300">Commercial Coaches</span>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">Network</span>
              <p className="text-2xl sm:text-3xl font-black text-white mt-1">50+</p>
              <span className="text-[11px] text-slate-300">Daily Highway Routes</span>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">Coverage</span>
              <p className="text-2xl sm:text-3xl font-black text-white mt-1">70+</p>
              <span className="text-[11px] text-slate-300">Cities Across 8 States</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Narrative Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-12">

        {/* Company Background Card */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-soft border border-slate-200 space-y-6">
          <div className="border-b border-slate-100 pb-5">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-1">
              Corporate Profile & History
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Our Journey & Operational Scale
            </h2>
          </div>

          <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-5">
            <p>
              <strong>Hans Travels I Pvt Ltd.</strong> has been a leading Commercial Business Transportation Company (now Private Limited) operating since 1980s. We have been operating on <strong>50+ routes covering more than 70 cities</strong> (including Mumbai, Pune, Bangalore, Hyderabad, Nagpur, Lucknow, Delhi, Jaipur, Ahmedabad and Surat) across <strong>8 states</strong> in and around Madhya Pradesh, Indore being our headquarter.
            </p>

            <p>
              With an aim to expand and customize our facilities with changing customer needs and ease, we have been operating <strong>150+ Commercial Buses</strong> (20+ Premium Buses, 20+ Bharat Benz, Ashok Leyland, Tata) as Heavy, Medium and light Commercial Passenger Vehicles.
            </p>

            <div className="p-5 rounded-2xl bg-gradient-to-r from-red-50 to-rose-50 border border-red-100 text-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-red-900 text-sm sm:text-base">
                <Trophy className="w-5 h-5 text-red-600 flex-shrink-0" />
                <span>Distinguished National Service Partner</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                We have been the sole service partners in Indore for national and international level events like <strong>International Cricket Tournaments</strong>, Government and non-government events, and <strong>celebrities&apos; transit</strong>, having been appreciated with leading awards in the domain for our distinguished performance in the services.
              </p>
            </div>
          </div>

          {/* Key Cities Pills */}
          <div className="pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              <span>Key Connected Cities:</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {CITIES.map((city) => (
                <span
                  key={city}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Awards & National Recognitions */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-soft border border-slate-200 space-y-8">
          <div className="border-b border-slate-100 pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-1">
                Industry Accolades &amp; Safety Honors
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                National Bus Awards &amp; Recognitions
              </h2>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200 flex-shrink-0">
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span>Proven Industry Excellence</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Authentic Awards Trophy & Plaque Photography */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative rounded-2xl overflow-hidden shadow-card border border-slate-200 bg-slate-50 max-w-sm w-full group">
                <Image
                  src="/assets/awards-trophies.png"
                  alt="Hans Travels India Bus Safety Awards and Ashok Leyland Excellence Trophy"
                  width={600}
                  height={680}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 text-white">
                  <p className="text-xs font-bold tracking-wide uppercase text-amber-400">
                    Official Honors Showcase
                  </p>
                  <p className="text-[11px] text-gray-200 mt-0.5">
                    India Bus Safety Award (Abhibus) &amp; India Bus Awards Plaque (Ashok Leyland)
                  </p>
                </div>
              </div>
            </div>

            {/* Right: The Two Specific Awards */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Award 1: ABHIBUS */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-red-200 transition-all space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-black uppercase tracking-widest text-red-600 bg-red-100/70 px-3 py-1 rounded-full border border-red-200">
                    ABHIBUS
                  </span>
                  <span className="text-xs font-bold text-slate-500 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                    Year &bull; 2017
                  </span>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                    INDIA BUS SAFETY AWARDS
                  </h3>
                  <p className="text-sm font-bold text-red-700 mt-1">
                    Excellence in Public Transport Safety Private Operator West-2017
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Presented by Abhibus in recognition of distinguished passenger safety standards, highway emergency readiness, and disciplined fleet transit operations across Western India routes.
                </p>
              </div>

              {/* Award 2: ASHOK LEYLAND */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-red-200 transition-all space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-black uppercase tracking-widest text-blue-700 bg-blue-100/70 px-3 py-1 rounded-full border border-blue-200">
                    ASHOK LEYLAND
                  </span>
                  <span className="text-xs font-bold text-slate-500 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                    Year &bull; 2018
                  </span>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                    India Bus Awards
                  </h3>
                  <p className="text-sm font-bold text-blue-800 mt-1">
                    Honorable Excellence in the Indian Bus Travel Industry Year - 2018
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Presented by MOTORINDIA &amp; BUSA, supported by Apollo Tyres in the category of Private Bus Operator (Large Fleet), honoring operational reliability, engineering maintenance, and passenger comfort.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Key Features & Differentiators */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest">
              Why Travel With Hans
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Key Features & Differentiators Provided to Customers
            </h2>
            <p className="text-sm text-slate-600">
              We continually raise the bar in safety, comfort, flexibility, and punctuality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DIFFERENTIATORS.map((diff, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-soft border border-slate-200 hover:border-red-200 hover:shadow-card transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-black text-sm">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {diff.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {diff.desc}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-red-600 pt-2 border-t border-slate-100">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>The Hans Standard</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tagline Callout CTA */}
        <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-card border border-slate-800 text-center space-y-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-xs font-bold uppercase tracking-widest text-red-400 border border-white/10">
            <Compass className="w-3.5 h-3.5" />
            <span>Guaranteed & Affordable Transit</span>
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight max-w-3xl mx-auto leading-tight">
            So, call and find out the difference by Guaranteed, affordable options for all your travel and tour needs...
          </h2>

          <div className="pt-2">
            <p className="text-xl sm:text-2xl font-serif italic text-red-400 tracking-wide">
              &ldquo;Bon voyage. Home on wheels.&rdquo;
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+917314004000"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-all shadow-md hover:shadow-red-600/30 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Helpline: 0731-4004000</span>
            </a>
            <Link
              href="/#booking-section"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 backdrop-blur-sm transition-all cursor-pointer"
            >
              <span>Book Bus Tickets</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer
        onOpenManageBooking={() => setManageBookingOpen(true)}
        onOpenTrackBus={() => setTrackBusOpen(true)}
      />

      {/* Modals */}
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
