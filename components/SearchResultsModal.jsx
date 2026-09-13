'use client';

import React, { useState } from 'react';
import { X, Clock, MapPin, Shield, Star, Check, Wifi, Droplets, Zap, Sparkles, ArrowLeft, Bus } from 'lucide-react';
import { MOCK_BUSES } from '../lib/mockData';

export default function SearchResultsModal({ isOpen, onClose, searchParams }) {
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState(['L4']);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  if (!isOpen) return null;

  const toggleSeat = (seatId) => {
    if (['L2', 'U3', 'U7', 'L9'].includes(seatId)) return; // Already booked
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleBookingSubmit = () => {
    setBookingConfirmed(true);
  };

  const resetAndClose = () => {
    setBookingConfirmed(false);
    setSelectedBus(null);
    onClose();
  };

  const handleSelectBus = (bus) => {
    setSelectedBus(bus);
    if (!selectedSeats || selectedSeats.length === 0) {
      setSelectedSeats(['L4']);
    }
  };

  const handleBackToAllBuses = () => {
    setSelectedBus(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overscroll-contain [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="bg-white rounded-3xl shadow-modal w-full max-w-5xl flex flex-col overflow-hidden border border-slate-200 transform-gpu [transform:translateZ(0)] [will-change:transform] max-h-[90vh]">
        
        {/* Modal Top Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-brand-light-blue/50 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-brand-charcoal">
                {searchParams?.from || 'Indore'}
              </span>
              <span className="text-slate-400 font-bold">&rarr;</span>
              <span className="text-xl font-black text-brand-charcoal">
                {searchParams?.to || 'Pune'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Journey Date: <span className="font-semibold text-slate-700">{searchParams?.date || 'Tomorrow'}</span>
              {searchParams?.returnDate && (
                <> &bull; Return: <span className="font-semibold text-red-600">{searchParams.returnDate}</span> (Round-Trip)</>
              )} &bull; {selectedBus ? '1 Bus Selected' : `Found ${MOCK_BUSES.length} Premium Hans Coaches`}
            </p>
          </div>
          
          <button
            type="button"
            onClick={resetAndClose}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] space-y-6 flex-1">
          {bookingConfirmed ? (
            <div className="py-12 text-center max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto border border-blue-100">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-brand-charcoal">
                Booking Reservation Confirmed!
              </h3>
              <p className="text-sm text-slate-600">
                Your PNR is <strong className="text-brand-charcoal font-bold">HANS-{Math.floor(100000 + Math.random() * 900000)}</strong>.
                E-ticket details and live tracking link have been dispatched via SMS & WhatsApp.
              </p>
              <div className="p-4 bg-brand-light-blue rounded-xl border border-blue-100 text-xs text-slate-700 text-left space-y-1">
                <p><strong>Coach:</strong> {selectedBus?.name || 'Volvo 9600 AC Sleeper'}</p>
                <p><strong>Berths:</strong> {selectedSeats.join(', ')}</p>
                <p><strong>Reporting Time:</strong> 15 minutes before scheduled departure</p>
              </div>
              <button
                type="button"
                onClick={resetAndClose}
                className="w-full py-3 bg-brand-charcoal text-white rounded-xl font-bold text-sm hover:bg-black transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : selectedBus ? (
            /* ========================================================================= */
            /* SINGLE SELECTED BUS VIEW (Only show this bus's related info, not others) */
            /* ========================================================================= */
            <div className="space-y-6 animate-fadeIn">
              {/* Back to all buses banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 border border-slate-200/90 px-4 py-3 rounded-2xl shadow-sm">
                <button
                  type="button"
                  onClick={handleBackToAllBuses}
                  className="inline-flex items-center gap-2.5 text-xs font-bold text-slate-700 hover:text-brand-red transition-colors cursor-pointer group"
                >
                  <span className="p-1.5 rounded-lg bg-white border border-slate-200 group-hover:border-brand-red group-hover:bg-red-50 text-slate-700 group-hover:text-brand-red transition-colors shadow-xs">
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </span>
                  <span>&larr; Back to all available buses ({MOCK_BUSES.length})</span>
                </button>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>Selected coach:</span>
                  <span className="font-bold text-brand-charcoal px-2 py-0.5 bg-white rounded-lg border border-slate-200 shadow-xs">
                    {selectedBus.name}
                  </span>
                  <button
                    type="button"
                    onClick={handleBackToAllBuses}
                    className="text-xs text-blue-600 hover:text-blue-800 font-semibold underline cursor-pointer ml-1"
                  >
                    Change
                  </button>
                </div>
              </div>

              {/* Selected Bus Card Info */}
              <div className="border border-blue-200 ring-2 ring-blue-100/70 bg-white rounded-2xl shadow-md overflow-hidden">
                {/* Bus Summary Row */}
                <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 bg-gradient-to-r from-blue-50/40 via-white to-transparent">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-lg font-black text-brand-charcoal">
                        {selectedBus.name}
                      </h4>
                      <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold border border-blue-100">
                        Live GPS
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      {selectedBus.busType}
                    </p>
                    <div className="flex flex-wrap gap-3 pt-1 text-xs text-slate-600">
                      <span className="flex items-center gap-1 font-semibold text-slate-800">
                        ★ {selectedBus.rating} ({selectedBus.reviewsCount})
                      </span>
                      <span>&bull;</span>
                      <span className="text-blue-700 font-semibold">{selectedBus.seatsAvailable} Berths Left</span>
                    </div>
                  </div>

                  {/* Timings */}
                  <div className="flex items-center gap-6 text-center">
                    <div>
                      <span className="text-xl font-black text-brand-charcoal block">{selectedBus.departureTime}</span>
                      <span className="text-[11px] text-slate-500 font-medium">{searchParams?.from || 'Indore'}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] text-slate-400 font-medium">{selectedBus.duration}</span>
                      <div className="w-20 h-0.5 bg-slate-200 my-1 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-600" />
                      </div>
                      <span className="text-[10px] text-blue-600 font-semibold">Direct Route</span>
                    </div>
                    <div>
                      <span className="text-xl font-black text-brand-charcoal block">{selectedBus.arrivalTime}</span>
                      <span className="text-[11px] text-slate-500 font-medium">{searchParams?.to || 'Pune'}</span>
                    </div>
                  </div>

                  {/* Price & Change */}
                  <div className="flex items-center justify-between md:flex-col md:items-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 block">Per Berth</span>
                      <span className="text-2xl font-black text-brand-charcoal">₹{selectedBus.price}</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleBackToAllBuses}
                      className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
                    >
                      Change Bus
                    </button>
                  </div>
                </div>

                {/* Amenities & Features */}
                {selectedBus.amenities && selectedBus.amenities.length > 0 && (
                  <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1">
                      Included Amenities:
                    </span>
                    {selectedBus.amenities.map((amenity, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white text-slate-700 text-xs font-medium rounded-lg border border-slate-200 shadow-xs"
                      >
                        <Sparkles className="w-3 h-3 text-brand-red" />
                        {amenity}
                      </span>
                    ))}
                  </div>
                )}

                {/* Boarding & Dropping Locations */}
                {(selectedBus.boardingPoints || selectedBus.droppingPoints) && (
                  <div className="px-5 py-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white text-xs">
                    {selectedBus.boardingPoints && (
                      <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-100">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5 mb-2">
                          <MapPin className="w-3.5 h-3.5 text-blue-600" />
                          Boarding Points ({searchParams?.from || 'Indore'})
                        </span>
                        <div className="space-y-1.5 text-slate-600">
                          {selectedBus.boardingPoints.map((bp, idx) => (
                            <div key={idx} className="flex items-start justify-between gap-2">
                              <span className="truncate">{bp.location}</span>
                              <span className="font-bold text-slate-800 shrink-0">{bp.time}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedBus.droppingPoints && (
                      <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-100">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5 mb-2">
                          <MapPin className="w-3.5 h-3.5 text-red-600" />
                          Dropping Points ({searchParams?.to || 'Pune'})
                        </span>
                        <div className="space-y-1.5 text-slate-600">
                          {selectedBus.droppingPoints.map((dp, idx) => (
                            <div key={idx} className="flex items-start justify-between gap-2">
                              <span className="truncate">{dp.location}</span>
                              <span className="font-bold text-slate-800 shrink-0">{dp.time}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Interactive Berth Selector */}
                <div className="p-6 bg-slate-50/80 border-t border-slate-100 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                    <span className="font-bold text-slate-700">
                      Select Preferred Berths (Upper / Lower Deck)
                    </span>
                    <div className="flex items-center gap-4 text-slate-500 font-medium">
                      <span className="flex items-center gap-1.5">
                        <span className="w-3.5 h-3.5 bg-white border border-slate-300 rounded" /> Available
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-3.5 h-3.5 bg-blue-600 rounded" /> Selected
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-3.5 h-3.5 bg-slate-200 rounded" /> Booked
                      </span>
                    </div>
                  </div>

                  {/* Sleeper Deck Grids */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-5 rounded-2xl border border-slate-200">
                    {/* Lower Deck */}
                    <div className="space-y-3">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                        Lower Deck (Sleepers)
                      </span>
                      <div className="grid grid-cols-3 gap-2.5">
                        {['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9'].map((id) => {
                          const isBooked = ['L2', 'L9'].includes(id);
                          const isSelected = selectedSeats.includes(id);
                          return (
                            <button
                              key={id}
                              type="button"
                              disabled={isBooked}
                              onClick={() => toggleSeat(id)}
                              className={`p-3 rounded-lg text-xs font-bold flex flex-col items-center justify-center transition-all ${
                                isBooked
                                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                  : isSelected
                                  ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-300'
                                  : 'bg-white border border-slate-200 text-slate-700 hover:border-blue-400 cursor-pointer'
                              }`}
                            >
                              <span>{id}</span>
                              <span className="text-[9px] opacity-80">₹{selectedBus.price}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Upper Deck */}
                    <div className="space-y-3">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                        Upper Deck (Sleepers)
                      </span>
                      <div className="grid grid-cols-3 gap-2.5">
                        {['U1', 'U2', 'U3', 'U4', 'U5', 'U6', 'U7', 'U8', 'U9'].map((id) => {
                          const isBooked = ['U3', 'U7'].includes(id);
                          const isSelected = selectedSeats.includes(id);
                          return (
                            <button
                              key={id}
                              type="button"
                              disabled={isBooked}
                              onClick={() => toggleSeat(id)}
                              className={`p-3 rounded-lg text-xs font-bold flex flex-col items-center justify-center transition-all ${
                                isBooked
                                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                  : isSelected
                                  ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-300'
                                  : 'bg-white border border-slate-200 text-slate-700 hover:border-blue-400 cursor-pointer'
                              }`}
                            >
                              <span>{id}</span>
                              <span className="text-[9px] opacity-80">₹{selectedBus.price}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Booking Summary & High-Priority RED Action Button */}
                  <div className="p-4 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1 text-xs text-slate-600">
                      <div>
                        <strong>Selected Berths:</strong> {selectedSeats.length ? selectedSeats.join(', ') : 'None selected'}
                      </div>
                      <div>
                        <strong>Total Fare:</strong>{' '}
                        <span className="text-base font-black text-brand-charcoal">
                          ₹{selectedSeats.length * selectedBus.price}
                        </span>{' '}
                        (Inclusive of GST)
                      </div>
                    </div>

                    {/* Solid Red CTA for high priority action */}
                    <button
                      type="button"
                      disabled={selectedSeats.length === 0}
                      onClick={handleBookingSubmit}
                      className="w-full sm:w-auto px-8 py-3 bg-brand-red hover:bg-brand-red-hover active:bg-brand-red-active text-white text-sm font-bold rounded-xl shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      Proceed to Book (₹{selectedSeats.length * selectedBus.price})
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ========================================================================= */
            /* ALL BUSES LIST (When no bus is selected yet) */
            /* ========================================================================= */
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <span>Showing all available coaches for your route</span>
                <span>Sorted by departure</span>
              </div>
              {MOCK_BUSES.map((bus) => {
                return (
                  <div
                    key={bus.id}
                    className="border border-slate-200 hover:border-slate-300 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                  >
                    {/* Bus Card Summary */}
                    <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-5">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-brand-charcoal">
                            {bus.name}
                          </h4>
                          <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold border border-blue-100">
                            Live GPS
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">
                          {bus.busType}
                        </p>
                        <div className="flex flex-wrap gap-3 pt-1 text-xs text-slate-600">
                          <span className="flex items-center gap-1 font-semibold text-slate-800">
                            ★ {bus.rating} ({bus.reviewsCount})
                          </span>
                          <span>&bull;</span>
                          <span className="text-blue-700 font-semibold">{bus.seatsAvailable} Berths Left</span>
                        </div>
                      </div>

                      {/* Timings */}
                      <div className="flex items-center gap-6 text-center">
                        <div>
                          <span className="text-lg font-black text-brand-charcoal block">{bus.departureTime}</span>
                          <span className="text-[11px] text-slate-400 font-medium">{searchParams?.from || 'Indore'}</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-[10px] text-slate-400">{bus.duration}</span>
                          <div className="w-16 h-0.5 bg-slate-200 my-1 relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-slate-400" />
                          </div>
                          <span className="text-[10px] text-blue-600 font-semibold">Direct</span>
                        </div>
                        <div>
                          <span className="text-lg font-black text-brand-charcoal block">{bus.arrivalTime}</span>
                          <span className="text-[11px] text-slate-400 font-medium">{searchParams?.to || 'Pune'}</span>
                        </div>
                      </div>

                      {/* Price & Action */}
                      <div className="flex items-center justify-between md:flex-col md:items-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                        <div className="text-right">
                          <span className="text-[11px] text-slate-400 block">Per Berth</span>
                          <span className="text-2xl font-black text-brand-charcoal">₹{bus.price}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSelectBus(bus)}
                          className="px-5 py-2.5 text-xs font-bold rounded-xl border border-red-200 bg-red-50 hover:bg-brand-red hover:text-white text-brand-red transition-all cursor-pointer shadow-xs hover:shadow-md"
                        >
                          Select Seats
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
