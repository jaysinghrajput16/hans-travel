'use client';

import React, { useState } from 'react';
import { X, Search, FileText, CheckCircle, AlertCircle, ArrowRight, Printer } from 'lucide-react';
import QuickCancel from './QuickCancel';

export default function ManageBookingModal({ isOpen, onClose, initialTab = 'manage' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [pnr, setPnr] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [ticketDetails, setTicketDetails] = useState(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleManageBooking = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Mock API lookup
    setTimeout(() => {
      setLoading(false);
      if (pnr.trim().length > 3) {
        setTicketDetails({
          pnr: pnr.toUpperCase().startsWith('HANS') ? pnr.toUpperCase() : `HANS-${pnr.toUpperCase()}`,
          passenger: 'Mark Sharma',
          route: 'Indore to Mumbai (Navi Mumbai / Borivali)',
          date: 'Tomorrow, 21:00 PM',
          boardingPoint: 'Hans Travels Navlakha Square, Indore',
          coach: 'Volvo 9600 Multi-Axle AC Sleeper',
          seats: ['L4 (Lower Sleeper)'],
          amount: '₹1,450',
          status: 'Confirmed',
        });
      } else {
        setError('Please enter a valid PNR number (e.g. HANS-49201)');
      }
    }, 400);
  };

  const handleReset = () => {
    setTicketDetails(null);
    setPnr('');
    setPhone('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overscroll-contain">
      <div className="bg-white rounded-3xl shadow-modal w-full max-w-lg overflow-hidden border border-slate-200 transform-gpu [transform:translateZ(0)] [will-change:transform]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 bg-brand-light-blue/40">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-brand-charcoal">
                Ticket Assistance
              </h3>
              <p className="text-xs text-slate-500">
                Retrieve ticket, view live status, or cancel with instant refund
              </p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Bar: Manage Ticket vs Quick Cancel */}
          <div className="flex rounded-xl bg-slate-100 p-1 mt-3 gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('manage')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'manage'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Manage & Print Ticket
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('cancel')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'cancel'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-gray-500 hover:text-red-600'
              }`}
            >
              Quick Cancellation
            </button>
          </div>
        </div>

        {/* Tab 1: Quick Cancellation Component */}
        {activeTab === 'cancel' && (
          <div className="p-4 sm:p-6 bg-slate-50">
            <QuickCancel onClose={handleReset} />
          </div>
        )}

        {/* Tab 2: Manage & Print Ticket Flow */}
        {activeTab === 'manage' && (
          <div className="p-6 space-y-6">
            {!ticketDetails ? (
              <form onSubmit={handleManageBooking} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    PNR Number / Ticket ID *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. HANS-84920 or 84920"
                    value={pnr}
                    onChange={(e) => setPnr(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-400 text-sm font-semibold uppercase"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Passenger Mobile Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 9826012345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-400 text-sm font-semibold"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* High priority search CTA */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>{loading ? 'Searching...' : 'Search Ticket'}</span>
                </button>
              </form>
            ) : (
              <div className="space-y-5">
                <div className="p-5 bg-brand-light-blue rounded-2xl border border-blue-100 space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-blue-200/50">
                    <div>
                      <span className="text-xs text-slate-500 block">PNR Number</span>
                      <span className="text-base font-black text-brand-charcoal">{ticketDetails.pnr}</span>
                    </div>
                    <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-full">
                      {ticketDetails.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block">Passenger</span>
                      <strong className="text-slate-800 font-bold">{ticketDetails.passenger}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Berth</span>
                      <strong className="text-slate-800 font-bold">{ticketDetails.seats.join(', ')}</strong>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-400 block">Route & Coach</span>
                      <strong className="text-slate-800 font-bold block">{ticketDetails.route}</strong>
                      <span className="text-slate-600 text-[11px]">{ticketDetails.coach}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-400 block">Boarding Point & Time</span>
                      <strong className="text-slate-800 font-bold block">{ticketDetails.boardingPoint}</strong>
                      <span className="text-blue-700 font-semibold">{ticketDetails.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => alert('Downloading official Hans Travels PDF ticket...')}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Download E-Ticket</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('cancel')}
                    className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel Ticket
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
