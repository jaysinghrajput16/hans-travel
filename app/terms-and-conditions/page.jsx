'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ManageBookingModal from '../../components/ManageBookingModal';
import TrackBusModal from '../../components/TrackBusModal';
import AuthModal from '../../components/AuthModal';
import {
  FileText,
  Clock,
  AlertTriangle,
  Ban,
  Luggage,
  ShieldCheck,
  CreditCard,
  RefreshCw,
  PhoneCall,
  Mail,
  Printer,
  ChevronRight,
  CheckCircle,
  HelpCircle,
  MessageSquare,
  Users,
  Tv,
  Wind,
  BadgeAlert,
  Info
} from 'lucide-react';

export default function TermsAndConditionsPage() {
  const [manageBookingOpen, setManageBookingOpen] = useState(false);
  const [trackBusOpen, setTrackBusOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('general');

  const navItems = [
    { id: 'general', label: '1. General Terms & Conditions' },
    { id: 'cancellation', label: '2. Cancellation & Refunds' },
    { id: 'modification', label: '3. Modification & Boarding' },
    { id: 'facilities', label: '4. Coach Facilities & AC' },
    { id: 'baggage', label: '5. Baggage & Luggage Policy' },
    { id: 'conduct', label: '6. Rules, Safety & Conduct' },
    { id: 'communication', label: '7. Communication & Privacy' },
  ];

  const scrollTo = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col selection:bg-red-500 selection:text-white">
      {/* Global Header */}
      <Header
        onOpenManageBooking={() => setManageBookingOpen(true)}
        onOpenTrackBus={() => setTrackBusOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold uppercase tracking-wider text-red-400">
                <FileText className="w-3.5 h-3.5" />
                <span>Official Passenger Policy</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                Terms and Conditions
              </h1>
              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                Please review these policies carefully prior to booking and boarding your journey. By booking a ticket with us, you agree to comply with all operational, safety, and transit terms outlined below.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-red-400" />
                  Last Updated: Current Operating Season
                </span>
                <span>•</span>
                <span>Applicable across all routes & schedules</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 backdrop-blur-sm transition-all cursor-pointer hover:shadow-md"
              >
                <Printer className="w-4 h-4" />
                <span>Print Policy</span>
              </button>
              <Link
                href="/quick-cancel"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-md hover:shadow-red-600/30 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Quick Cancel</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sticky Navigation Menu */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white rounded-2xl p-4 shadow-soft border border-slate-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 pb-2 border-b border-slate-100">
                  Contents
                </h3>
                <nav className="mt-2 space-y-1">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollTo(item.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                        activeSection === item.id
                          ? 'bg-red-50 text-red-700 font-bold border border-red-100 shadow-xs'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span className="truncate">{item.label}</span>
                      <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 ${activeSection === item.id ? 'text-red-600' : 'text-slate-400'}`} />
                    </button>
                  ))}
                </nav>
              </div>

              {/* Help & Support Quick Box */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-5 border border-slate-800 shadow-soft space-y-3">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-red-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Need Clarification?
                  </h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Our 24x7 helpdesk is ready to assist you with inquiries, ticket modifications, and refunds.
                </p>
                <div className="pt-1 space-y-2">
                  <a
                    href="tel:+917314004000"
                    className="flex items-center gap-2 text-xs font-semibold text-slate-200 hover:text-white transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-red-500" />
                    <span>0731-4004000</span>
                  </a>
                  <a
                    href="mailto:support@hanstravels.com"
                    className="flex items-center gap-2 text-xs font-semibold text-slate-200 hover:text-white transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-red-500" />
                    <span>support@hanstravels.com</span>
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Main Body Content */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-8">

            {/* MANDATORY BOARDING DOCUMENTS CALLOUT */}
            <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-2xl p-6 shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 mt-0.5">
                  <BadgeAlert className="w-6 h-6 text-white" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-lg font-bold tracking-tight">
                    Compulsory Documents Required Before Boarding
                  </h2>
                  <p className="text-xs text-white/90 leading-relaxed">
                    Please carry the following documents compulsorily before boarding your coach:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                      <div className="font-bold text-xs flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-white" />
                        <span>Travel Ticket (2 Copies)</span>
                      </div>
                      <p className="text-[11px] text-white/80 mt-1">
                        One physical copy is retained by our crew/operator at boarding.
                      </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                      <div className="font-bold text-xs flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-white" />
                        <span>Photo Identity Card (1 Copy)</span>
                      </div>
                      <p className="text-[11px] text-white/80 mt-1">
                        One copy of a Govt.-Approved Photo ID (Aadhaar, Voter ID, Passport, or Driving License).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 1: GENERAL TERMS & CONDITIONS */}
            <section
              id="general"
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-soft border border-slate-200 space-y-6"
            >
              <div className="border-b border-slate-100 pb-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                  <Info className="w-3.5 h-3.5" />
                  <span>Section 1</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  General terms & conditions
                </h2>
              </div>

              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <Clock className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 font-bold block">Reporting Time:</strong>
                    <span>Reporting time is <strong>30 minutes before scheduled departure</strong> at the designated boarding location.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 font-bold block">Departure & Timings Notice:</strong>
                    <span>The arrival & departure time mentioned on the ticket are tentative timings and may change due to unforeseen events. The coach will not leave the source before the time that is mentioned on the ticket.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <CreditCard className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 font-bold block">Seat Confirmation & Payment:</strong>
                    <span>Seats Will Be Confirmed Only After Successful Payment (Depending Upon Seat Availability).</span>
                  </div>
                </div>

                <ul className="space-y-3 pt-2">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-1" />
                    <span><strong>Seat Allocation:</strong> Management reserves the right to change the seat numbers whenever required for operational reconfigurations.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-1" />
                    <span><strong>Transferability:</strong> Ticket is neither transferable, nor refundable under standard terms.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />
                    <span><strong>Lady Passenger Protection:</strong> Co-Seats of lady passenger to be confirmed to a lady passenger only, preserving passenger safety and comfort.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 2: TICKET CANCELLATION & REFUND */}
            <section
              id="cancellation"
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-soft border border-slate-200 space-y-6"
            >
              <div className="border-b border-slate-100 pb-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Section 2</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Ticket cancellation / modification / Refund
                </h2>
              </div>

              <div className="space-y-6">
                {/* Cancellation Charges Cards / Table */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span>Cancellation Policy & Deduction Slabs</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="p-4 rounded-xl border border-red-200 bg-red-50/60 text-center space-y-1">
                      <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Within 8 Hours</span>
                      <p className="text-2xl font-black text-red-600">100%</p>
                      <span className="text-[11px] text-red-700 font-semibold block">Deduction (No Refund)</span>
                    </div>

                    <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/60 text-center space-y-1">
                      <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Within 1 Day (24 hrs)</span>
                      <p className="text-2xl font-black text-amber-700">50%</p>
                      <span className="text-[11px] text-amber-800 font-semibold block">Deduction Charge</span>
                    </div>

                    <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/60 text-center space-y-1">
                      <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Within 3 Days</span>
                      <p className="text-2xl font-black text-blue-700">10%</p>
                      <span className="text-[11px] text-blue-800 font-semibold block">Deduction Charge</span>
                    </div>

                    <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/60 text-center space-y-1">
                      <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Before 30 Days</span>
                      <p className="text-2xl font-black text-emerald-700">5%</p>
                      <span className="text-[11px] text-emerald-800 font-semibold block">Nominal Charge</span>
                    </div>
                  </div>
                </div>

                {/* Important Cancellation Bulletins */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Important Cancellation Regulations:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 pl-1 text-slate-600 leading-relaxed">
                    <li><strong>No Phone Cancellations:</strong> Cancellations are not entertained over phone. Please cancel via our website, app, or designated booking counter.</li>
                    <li><strong>No Partial Cancellation:</strong> Partial cancellation is not allowed.</li>
                    <li><strong>Taxes:</strong> 5% GST on cancellation charges, and 15% service tax extra on cancellation charge amount.</li>
                  </ul>
                </div>

                {/* Refund Transfer & Processing */}
                <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                  <h4 className="font-bold text-slate-900 text-sm">Refund Processing & Bank Timeline:</h4>
                  <p>
                    Refund will be processed <strong>within 24 hours</strong> of ticket cancellation.
                  </p>
                  <p>
                    Cancelled ticket amount is transferred back to the source, which means your credit / debit / net banking / cash card or mobile payment account. The cancelled ticket amount is refunded by the respective bank subject to terms and conditions of the bank. However, if you need any assistance for repayments you can contact our Head office.
                  </p>
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-900 font-medium">
                    ⏱ <strong>Bank Credit TAT:</strong> Your refund will be credited into your account within <strong>6-7 Days</strong> following standard banking clearing cycles.
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: MODIFICATION & REFUND RESTRICTIONS */}
            <section
              id="modification"
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-soft border border-slate-200 space-y-6"
            >
              <div className="border-b border-slate-100 pb-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Section 3</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Modification & Boarding Point Rules
                </h2>
              </div>

              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Ticket Modification:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                      <span>For any modification: <strong>Rs 10 per ticket</strong>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                      <span>Modification/changes to the origin and/or destination of travel and/or customer name, etc. are <strong>not permitted on ticket</strong>.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-2">Non-Refundable Circumstances:</h3>
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-red-50/70 border border-red-100 text-xs text-red-900 font-medium space-y-1">
                      <p>• <strong>No-Refund less than 24 hrs before departure time.</strong></p>
                      <p>• <strong>No-Refund after departure.</strong></p>
                    </div>
                    <p className="text-xs text-slate-600 pt-1">
                      No-Refunds or Complaints will be entertained for passenger waiting for the Bus at an incorrect boarding point. The passenger is requested to confirm the exact boarding point and time with Classic Travels / Hans Travels well in advance.
                    </p>
                    <p className="text-xs text-slate-600">
                      In case of valid reasons, refund will be done by producing proper PNR and identity proof by passenger to the satisfaction of operator.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: OTHER FACILITIES */}
            <section
              id="facilities"
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-soft border border-slate-200 space-y-6"
            >
              <div className="border-b border-slate-100 pb-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                  <Tv className="w-3.5 h-3.5" />
                  <span>Section 4</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Other facilities
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 text-slate-700">
                    <Tv className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Video / Entertainment</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Video is an additional complimentary facility and not a mandatory condition of carriage.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 text-slate-700">
                    <Wind className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">AC Unit Contingency</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      In case the coach AC unit fails during transit, a proportionate refund will be paid back from the Head Office.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: BAGGAGE & LUGGAGE */}
            <section
              id="baggage"
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-soft border border-slate-200 space-y-6"
            >
              <div className="border-b border-slate-100 pb-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                  <Luggage className="w-3.5 h-3.5" />
                  <span>Section 5</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Baggage & luggage:
                </h2>
              </div>

              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-1">
                    <Luggage className="w-4 h-4 text-red-600" />
                    <span>Weight Limit & Charges</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Maximum <strong>20kg of Baggage & Luggage</strong> is allowed per passenger. Weight above 20kgs is chargeable as per company policies.
                  </p>
                </div>

                <div className="space-y-2.5 text-xs text-slate-700">
                  <p className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Loss & Damage Disclaimer:</strong> Management is not responsible for any loss, theft, or damages to the goods or property of the passenger.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Passenger Risk:</strong> Luggage & Baggage is carried strictly at your own risk.</span>
                  </p>
                  <p className="flex items-start gap-2 text-red-700 font-semibold">
                    <Ban className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Contraband Prohibition:</strong> No Contraband articles, hazardous chemicals, or explosive materials are permitted to be carried by any passenger under any circumstance.</span>
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 6: OTHER TERMS & PASSENGER CONDUCT */}
            <section
              id="conduct"
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-soft border border-slate-200 space-y-6"
            >
              <div className="border-b border-slate-100 pb-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>Section 6</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Other terms & conditions:
                </h2>
              </div>

              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                <div className="space-y-3">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                    <strong className="text-slate-900 font-bold block mb-1">Delays & Unforeseen Circumstances:</strong>
                    Management is not responsible for delay and cancellation of trips on account of Breakdown, Accident, Riots etc., and due to any unforeseen circumstances.
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                    <strong className="text-slate-900 font-bold block mb-1">Coach Cancellation Refund:</strong>
                    In case of cancellation of a coach, proportionate refund will be paid back.
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                    <strong className="text-slate-900 font-bold block mb-1">Breakdown & Alternate Arrangements:</strong>
                    In case of coach break-down, management is not responsible for any alternate transport arrangement, though management will try its best to provide another available coach.
                  </div>
                </div>

                {/* Strict Deboarding & Behavioral Red Flags */}
                <div className="border border-red-200 bg-red-50/50 rounded-xl p-4 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-red-800 flex items-center gap-1.5">
                    <Ban className="w-4 h-4 text-red-600" />
                    <span>Strict Prohibitions & Deboarding Policy</span>
                  </h3>

                  <ul className="space-y-2 text-xs text-red-950">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span><strong>Pets are not allowed:</strong> Pets, Animals, and Birds are not permitted in the coach, and if found, the passenger is bound to be alighted (get out) from the coach.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span><strong>No Liquor & Intoxication:</strong> Carrying or consuming liquor inside the bus is strictly prohibited. Bus operator reserves the right to deboard drunk passengers.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span><strong>No Smoking or Drinking:</strong> Smoking and Drinking are not permitted inside the coach. Any legal or transit implication to that effect will be borne by the passenger only.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span><strong>Passenger Decorum:</strong> Any passenger found disturbing co-passengers in a logical or reasonable way is liable to be alighted from the coach. However, for further assistance or complaints, please feel free to contact us.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-3 bg-slate-100 rounded-xl text-xs text-slate-800 font-semibold flex items-center justify-between">
                  <span>Transaction Currency:</span>
                  <span className="text-slate-950 font-bold">All transaction amounts are in INR (Indian National Rupee - ₹)</span>
                </div>
              </div>
            </section>

            {/* SECTION 7: COMMUNICATION POLICY */}
            <section
              id="communication"
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-soft border border-slate-200 space-y-6"
            >
              <div className="border-b border-slate-100 pb-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Section 7</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Our Communication Policy
                </h2>
              </div>

              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                <p>
                  At our company, we are committed to keeping you informed about our services, offers, and upcoming promotions that may be of interest to you. As part of our Communication Policy, we may process your information to contact you via email, telephone, SMS, or other methods of communication.
                </p>

                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-950 space-y-2">
                  <div className="font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-700" />
                    <span>NDNC Registry Override Consent:</span>
                  </div>
                  <p>
                    By booking a ticket on our website or app, you agree to <strong>override your NDNC (National Do Not Call) registration</strong> and authorize us and our representatives to contact you through call, RCS, WhatsApp, SMS, or email.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
                  <strong className="text-slate-900 font-bold block">Privacy & Data Confidentiality:</strong>
                  <p>
                    We value your privacy and understand the importance of keeping your personal information confidential. Therefore, we assure you that any information shared with us will be kept on a confidential basis and will only be shared with third parties for evaluating and processing the ticket related information to provide you relevant information on services, offers, and any upcoming promotions that may be of interest to you.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
                  <strong className="text-slate-900 font-bold block">Policy Amendments:</strong>
                  <p>
                    If you have any questions or concerns about our Communication Policy, please feel free to contact us. We reserve the right to change some or all of the above contents of our communication policy from time to time and it is the sole responsibility of customers to keep themselves updated on our terms and conditions before and after every booking.
                  </p>
                </div>
              </div>
            </section>

          </main>

        </div>
      </div>

      {/* Global Footer */}
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
