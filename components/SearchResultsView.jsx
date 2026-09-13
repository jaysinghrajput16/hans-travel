'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  ArrowLeftRight,
  Search,
  Sparkles,
  Mic,
  Clock,
  MapPin,
  Shield,
  Star,
  Check,
  X,
  Wifi,
  Droplets,
  Zap,
  Sunrise,
  Sun,
  Sunset,
  Moon,
  Calendar,
  SlidersHorizontal,
  RotateCcw,
  Bus,
  CheckCircle2,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { MOCK_BUSES, POPULAR_CITIES } from '../lib/mockData';

export default function SearchResultsView({
  searchParams,
  onBackHome,
  onModifySearch
}) {
  // Local route state for the compact sticky modifier
  const [fromCity, setFromCity] = useState(searchParams?.from || 'Indore');
  const [toCity, setToCity] = useState(searchParams?.to || 'Jabalpur');
  const [journeyDate, setJourneyDate] = useState(searchParams?.date || '2026-09-12');
  const [isModifying, setIsModifying] = useState(false);

  // Filter States
  const [aiQuery, setAiQuery] = useState('');
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]); // 'morning', 'afternoon', 'night'
  const [busTypeFilters, setBusTypeFilters] = useState({
    ac: false,
    nonAc: false,
    sleeper: false,
    seater: false,
    singleSeats: false,
    primo: false
  });
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [maxPrice, setMaxPrice] = useState(2000);

  // Sorting State
  const [sortBy, setSortBy] = useState('ratings'); // 'ratings', 'departure', 'price', 'duration'

  // Single Bus Selection State
  // CRITICAL: When a bus is selected, only show that bus and its related info; hide all other buses!
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState(['L4']);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Active filter counter for mobile filter badge
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (aiQuery.trim()) count++;
    count += selectedTimeSlots.length;
    count += Object.values(busTypeFilters).filter(Boolean).length;
    count += selectedAmenities.length;
    if (maxPrice < 2000) count++;
    return count;
  }, [aiQuery, selectedTimeSlots, busTypeFilters, selectedAmenities, maxPrice]);

  // Swap From & To cities
  const handleSwapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleApplyModify = (e) => {
    e.preventDefault();
    if (onModifySearch) {
      onModifySearch({
        from: fromCity,
        to: toCity,
        date: journeyDate,
        passengers: 1
      });
    }
    setIsModifying(false);
    setSelectedBus(null);
  };

  // Toggle Time Slot Filter
  const toggleTimeSlot = (slot) => {
    setSelectedTimeSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  // Toggle Bus Type Filter
  const toggleBusType = (typeKey) => {
    setBusTypeFilters((prev) => ({
      ...prev,
      [typeKey]: !prev[typeKey]
    }));
  };

  // Toggle Amenity Filter
  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  // Clear all filters
  const handleClearAllFilters = () => {
    setAiQuery('');
    setSelectedTimeSlots([]);
    setBusTypeFilters({
      ac: false,
      nonAc: false,
      sleeper: false,
      seater: false,
      singleSeats: false,
      primo: false
    });
    setSelectedAmenities([]);
    setMaxPrice(2000);
    setSortBy('ratings');
  };

  // Seat toggle handler
  const toggleSeat = (seatId) => {
    if (['L2', 'U3', 'U7', 'L9'].includes(seatId)) return; // Already booked
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleSelectBus = (bus) => {
    setSelectedBus(bus);
    if (!selectedSeats || selectedSeats.length === 0) {
      setSelectedSeats(['L4']);
    }
    // Smooth scroll to top of details
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToAllBuses = () => {
    setSelectedBus(null);
  };

  // Filter & Sort Logic
  const filteredBuses = useMemo(() => {
    return MOCK_BUSES.filter((bus) => {
      // 1. AI Smart Query Search (natural language parsing)
      if (aiQuery.trim()) {
        const q = aiQuery.toLowerCase();

        // Check if query is natural language rule
        if (q.includes('morning') && bus.timeSlot !== 'morning') return false;
        if (q.includes('afternoon') && bus.timeSlot !== 'afternoon') return false;
        if (q.includes('night') && bus.timeSlot !== 'night') return false;

        // Check price bounds in query e.g. "under 1500" or "under ₹1500"
        const priceMatch = q.match(/under\s*₹?\s*(\d+)/);
        if (priceMatch) {
          const maxP = parseInt(priceMatch[1], 10);
          if (bus.price > maxP) return false;
        }

        if (q.includes('primo') && !bus.isPrimo) return false;
        if (q.includes('ac') && !q.includes('non') && !bus.hasAC) return false;
        if (q.includes('non-ac') && bus.hasAC) return false;
        if (q.includes('sleeper') && !bus.isSleeper) return false;
        if (q.includes('seater') && !bus.isSeater) return false;

        // General fallback text search if not purely rule matched
        const matchedText =
          bus.name.toLowerCase().includes(q) ||
          bus.busType.toLowerCase().includes(q) ||
          bus.operator?.toLowerCase().includes(q);

        if (!priceMatch && !q.includes('morning') && !q.includes('night') && !q.includes('ac') && !matchedText) {
          return false;
        }
      }

      // 2. Departure Time Slot Filter
      if (selectedTimeSlots.length > 0) {
        if (!selectedTimeSlots.includes(bus.timeSlot)) {
          return false;
        }
      }

      // 3. Bus Types Filter
      if (busTypeFilters.ac && !bus.hasAC) return false;
      if (busTypeFilters.nonAc && bus.hasAC) return false;
      if (busTypeFilters.sleeper && !bus.isSleeper) return false;
      if (busTypeFilters.seater && !bus.isSeater) return false;
      if (busTypeFilters.singleSeats && !bus.hasSingleSeats) return false;
      if (busTypeFilters.primo && !bus.isPrimo) return false;

      // 4. Amenities Filter
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every((amenity) =>
          bus.amenities?.some((a) => a.toLowerCase().includes(amenity.toLowerCase()))
        );
        if (!hasAllAmenities) return false;
      }

      // 5. Price range
      if (bus.price > maxPrice) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'ratings') return parseFloat(b.rating) - parseFloat(a.rating);
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'departure') return a.departureTime.localeCompare(b.departureTime);
      if (sortBy === 'duration') return a.duration.localeCompare(b.duration);
      return 0;
    });
  }, [aiQuery, selectedTimeSlots, busTypeFilters, selectedAmenities, maxPrice, sortBy]);

  // Live item counts for filters
  const filterCounts = useMemo(() => {
    return {
      morning: MOCK_BUSES.filter((b) => b.timeSlot === 'morning').length,
      afternoon: MOCK_BUSES.filter((b) => b.timeSlot === 'afternoon').length,
      night: MOCK_BUSES.filter((b) => b.timeSlot === 'night').length,
      ac: MOCK_BUSES.filter((b) => b.hasAC).length,
      nonAc: MOCK_BUSES.filter((b) => !b.hasAC).length,
      sleeper: MOCK_BUSES.filter((b) => b.isSleeper).length,
      seater: MOCK_BUSES.filter((b) => b.isSeater).length,
      singleSeats: MOCK_BUSES.filter((b) => b.hasSingleSeats).length,
      primo: MOCK_BUSES.filter((b) => b.isPrimo).length
    };
  }, []);

  // Shared Filter Controls for both Desktop Sidebar and Mobile Drawer
  const renderFilterContent = () => (
    <div className="space-y-6">
      {/* AI Smart Filter / Voice Search Box */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-black text-slate-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-red animate-pulse" />
            AI Smart Search
          </label>
          <span className="text-[10px] font-semibold text-brand-red bg-red-50 px-1.5 py-0.5 rounded">
            AI Filter
          </span>
        </div>
        <div className="relative">
          <input
            type="text"
            value={aiQuery}
            onChange={(e) => setAiQuery(e.target.value)}
            placeholder='Try "Morning bus under ₹1500"'
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-8 py-2.5 text-xs text-brand-charcoal placeholder-slate-400 focus:outline-none focus:border-brand-red focus:bg-white transition-all shadow-inner"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          {aiQuery ? (
            <button
              type="button"
              onClick={() => setAiQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <Mic className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
          )}
        </div>
        {/* Sample AI query chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {['Morning bus under ₹1500', 'Primo AC Sleeper', 'Mercedes'].map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setAiQuery(chip)}
              className="text-[10px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Departure Time Slots */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
          Departure Time
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: 'morning', label: 'Morning', sub: '6 AM - 12 PM', icon: Sun, count: filterCounts.morning },
            { id: 'afternoon', label: 'Afternoon', sub: '12 PM - 6 PM', icon: Sunset, count: filterCounts.afternoon },
            { id: 'night', label: 'Night', sub: 'After 6 PM', icon: Moon, count: filterCounts.night }
          ].map(({ id, label, sub, icon: Icon, count }) => {
            const isSelected = selectedTimeSlots.includes(id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => toggleTimeSlot(id)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-brand-red bg-red-50/70 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-brand-red' : 'text-slate-500'}`} />
                  <span className="text-[10px] font-bold text-slate-400">({count})</span>
                </div>
                <div className="mt-1">
                  <span className={`text-xs font-bold block ${isSelected ? 'text-brand-red' : 'text-slate-800'}`}>
                    {label}
                  </span>
                  <span className="text-[9px] text-slate-400 block">{sub}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bus Types / Amenities Filters with Live Counts */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
          Bus Types
        </h4>
        <div className="space-y-2 text-xs">
          {[
            { key: 'ac', label: 'AC Coaches', count: filterCounts.ac },
            { key: 'sleeper', label: 'Sleeper (2+1)', count: filterCounts.sleeper },
            { key: 'singleSeats', label: 'Single Berths Available', count: filterCounts.singleSeats },
            { key: 'seater', label: 'Executive Seater', count: filterCounts.seater },
            { key: 'primo', label: 'Primo Coaches (Top Rated)', count: filterCounts.primo }
          ].map(({ key, label, count }) => {
            const active = busTypeFilters[key];
            return (
              <label
                key={key}
                onClick={() => toggleBusType(key)}
                className="flex items-center justify-between py-1 px-1.5 rounded-lg hover:bg-slate-50 cursor-pointer select-none transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                      active
                        ? 'bg-brand-red border-brand-red text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {active && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className={`text-xs font-medium ${active ? 'text-brand-charcoal font-bold' : 'text-slate-700'}`}>
                    {label}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-slate-400">({count})</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Amenities Checkboxes */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
          Amenities
        </h4>
        <div className="space-y-1.5 text-xs">
          {['Live GPS Tracking', 'Water Bottle', 'Blanket & Pillow', 'Fast USB Charging'].map((amenity) => {
            const isChecked = selectedAmenities.includes(amenity);
            return (
              <label
                key={amenity}
                onClick={() => toggleAmenity(amenity)}
                className="flex items-center gap-2.5 py-1 px-1.5 rounded-lg hover:bg-slate-50 cursor-pointer select-none"
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    isChecked
                      ? 'bg-brand-red border-brand-red text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className="text-xs text-slate-700">{amenity}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs">
          <span className="font-black text-slate-800 uppercase tracking-wider">Max Price</span>
          <span className="font-black text-brand-red text-sm">₹{maxPrice}</span>
        </div>
        <input
          type="range"
          min="700"
          max="2000"
          step="50"
          value={maxPrice}
          onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
          className="w-full accent-brand-red cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-bold">
          <span>₹700</span>
          <span>₹1,350</span>
          <span>₹2,000</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col font-sans text-slate-800">
      {/* ========================================================================= */}
      {/* 1. STICKY TOP RESULTS HEADER & COMPACT SEARCH BAR                         */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="py-2.5 sm:py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
            {/* Left: Brand & Back to Home */}
            <div className="flex items-center justify-between sm:justify-start gap-2.5 sm:gap-3">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <button
                  type="button"
                  onClick={onBackHome}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors cursor-pointer shadow-xs flex-shrink-0"
                  title="Back to Home"
                >
                  <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-red" />
                  <span className="hidden xs:inline sm:inline">Home</span>
                </button>

                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brand-red flex items-center justify-center text-white shadow-xs flex-shrink-0">
                    <Bus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 truncate">
                      <h1 className="text-sm sm:text-base md:text-lg font-black text-brand-charcoal leading-none truncate">
                        {fromCity}
                      </h1>
                      <span className="text-brand-red font-bold text-xs sm:text-sm flex-shrink-0">&rarr;</span>
                      <h1 className="text-sm sm:text-base md:text-lg font-black text-brand-charcoal leading-none truncate">
                        {toCity}
                      </h1>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5 truncate">
                      {journeyDate} &bull;{' '}
                      <span className="text-emerald-700 font-bold">
                        {selectedBus ? '1 Coach Selected' : `${filteredBuses.length} Buses`}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* On mobile, show modify button inline if not modifying */}
              {!isModifying && (
                <button
                  type="button"
                  onClick={() => setIsModifying(true)}
                  className="sm:hidden px-2.5 py-1 bg-brand-red hover:bg-brand-red-hover text-white text-[11px] font-bold rounded-lg transition-all shadow-xs cursor-pointer flex-shrink-0"
                >
                  Modify
                </button>
              )}
            </div>

            {/* Right: Compact Search Bar & Modify Toggle */}
            <div className="w-full sm:w-auto">
              {!isModifying ? (
                <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700">
                  <span className="font-semibold text-slate-900">{fromCity}</span>
                  <span className="text-slate-400">&rarr;</span>
                  <span className="font-semibold text-slate-900">{toCity}</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-600">{journeyDate}</span>
                  <button
                    type="button"
                    onClick={() => setIsModifying(true)}
                    className="ml-2 px-3 py-1 bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold rounded-lg transition-all shadow-xs cursor-pointer"
                  >
                    Modify
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleApplyModify}
                  className="flex flex-wrap items-center gap-1.5 sm:gap-2 bg-slate-50 border border-slate-300 rounded-2xl p-2 animate-fadeIn w-full sm:w-auto"
                >
                  <div className="flex-1 min-w-[90px] flex items-center bg-white rounded-xl border border-slate-200 px-2 py-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase mr-1">From:</span>
                    <input
                      type="text"
                      value={fromCity}
                      onChange={(e) => setFromCity(e.target.value)}
                      className="text-xs font-bold text-brand-charcoal w-full bg-transparent focus:outline-none"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleSwapCities}
                    className="p-1 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-brand-red transition-colors cursor-pointer flex-shrink-0"
                    title="Swap Cities"
                  >
                    <ArrowLeftRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </button>

                  <div className="flex-1 min-w-[90px] flex items-center bg-white rounded-xl border border-slate-200 px-2 py-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase mr-1">To:</span>
                    <input
                      type="text"
                      value={toCity}
                      onChange={(e) => setToCity(e.target.value)}
                      className="text-xs font-bold text-brand-charcoal w-full bg-transparent focus:outline-none"
                    />
                  </div>

                  <div className="w-full sm:w-auto flex items-center bg-white rounded-xl border border-slate-200 px-2 py-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase mr-1">Date:</span>
                    <input
                      type="date"
                      value={journeyDate}
                      onChange={(e) => setJourneyDate(e.target.value)}
                      className="text-xs font-bold text-brand-charcoal bg-transparent focus:outline-none w-full sm:w-auto"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
                    <button
                      type="submit"
                      className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer text-center"
                    >
                      Update
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsModifying(false)}
                      className="p-1.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Booking Confirmation Dialog Overlay */}
      {bookingConfirmed && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border border-slate-100 animate-scaleUp">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-2xl font-black text-brand-charcoal mb-2">
              Ticket Confirmed!
            </h3>
            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              Your Hans Travels PNR is{' '}
              <strong className="text-brand-charcoal font-black">
                HANS-{Math.floor(100000 + Math.random() * 900000)}
              </strong>
              . E-ticket and live GPS bus tracking link have been dispatched to your mobile.
            </p>
            <div className="p-4 bg-slate-50 rounded-2xl text-left text-xs space-y-1.5 border border-slate-200 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-500">Coach:</span>
                <span className="font-bold text-slate-800">{selectedBus?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Route:</span>
                <span className="font-bold text-slate-800">{fromCity} &rarr; {toCity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Berths:</span>
                <span className="font-bold text-brand-red">{selectedSeats.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Paid:</span>
                <span className="font-bold text-emerald-700">₹{selectedSeats.length * (selectedBus?.price || 0)}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setBookingConfirmed(false);
                setSelectedBus(null);
                onBackHome();
              }}
              className="w-full py-3 bg-brand-charcoal hover:bg-black text-white rounded-xl font-bold text-xs transition-colors cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}

      {/* Main Results Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ========================================================================= */}
          {/* 2. ADVANCED SIDEBAR FILTERS PANEL (DESKTOP)                               */}
          {/* ========================================================================= */}
          <aside className="hidden lg:block lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 shadow-sm p-5 space-y-6 sticky top-24">
            {/* Sidebar Title & Clear All */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-brand-red" />
                <h3 className="text-sm font-black text-brand-charcoal uppercase tracking-wider">
                  Filters
                </h3>
              </div>
              <button
                type="button"
                onClick={handleClearAllFilters}
                className="text-[11px] font-bold text-brand-red hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                RESET ALL
              </button>
            </div>

            {renderFilterContent()}
          </aside>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: PROMO CAROUSEL, SORT TOOLBAR & BUS CARD FEED                */}
          {/* ========================================================================= */}
          <main className="lg:col-span-9 space-y-6">

            {/* Mobile Filter & Coaches Count Header Bar (< lg screens only) */}
            {!selectedBus && (
              <div className="lg:hidden flex items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="text-xs text-slate-700 min-w-0">
                  <div className="font-black text-brand-charcoal text-sm">
                    {filteredBuses.length} Coaches Available
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium truncate">
                    {fromCity} &rarr; {toCity}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {activeFilterCount > 0 && (
                    <button
                      type="button"
                      onClick={handleClearAllFilters}
                      className="text-xs font-bold text-brand-red px-2.5 py-1.5 hover:bg-red-50 rounded-lg cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-brand-red hover:bg-brand-red-hover active:bg-brand-red-active text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Filters</span>
                    {activeFilterCount > 0 && (
                      <span className="w-4 h-4 rounded-full bg-white text-brand-red text-[10px] font-black flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            )}
            
            {/* ========================================================================= */}
            {/* 3. PROMOTIONAL TOP BANNER CAROUSEL (HORIZONTAL CARDS)                     */}
            {/* ========================================================================= */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                  Featured Hans Services & Offers
                </span>
                <span className="text-[10px] text-slate-400">Swipe &rarr;</span>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
                {/* Promo Card 1: Maa Sharda Bus Service */}
                <div
                  onClick={() => setAiQuery('Maa Sharda')}
                  className="snap-start shrink-0 w-72 sm:w-80 bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 text-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden group"
                >
                  <div className="absolute top-2 right-2 opacity-15">
                    <Star className="w-24 h-24" />
                  </div>
                  <div className="relative z-10">
                    <span className="inline-block bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider mb-1.5">
                      Pilgrimage Corridor
                    </span>
                    <h4 className="text-sm font-black leading-tight">
                      Maa Sharda Bus Service
                    </h4>
                    <p className="text-[11px] text-white/90 mt-1 line-clamp-2">
                      Exclusive pilgrimage sleeper coaches with sacred onboard ambience & divine punctuality.
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs font-bold bg-white text-orange-700 px-2 py-0.5 rounded-md shadow-xs">
                        From ₹1,150
                      </span>
                      <span className="text-[11px] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Filter Bus &rarr;
                      </span>
                    </div>
                  </div>
                </div>

                {/* Promo Card 2: Primo Luxury Coaches */}
                <div
                  onClick={() => toggleBusType('primo')}
                  className="snap-start shrink-0 w-72 sm:w-80 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden group"
                >
                  <div className="absolute top-2 right-2 opacity-15">
                    <Shield className="w-24 h-24" />
                  </div>
                  <div className="relative z-10">
                    <span className="inline-block bg-emerald-500/90 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider mb-1.5">
                      Primo Certified
                    </span>
                    <h4 className="text-sm font-black leading-tight">
                      Primo Luxury Coaches
                    </h4>
                    <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                      Guaranteed on-time departure or 25% refund. 4.8★ rated drivers & sanitized linen.
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs font-bold bg-white text-slate-900 px-2 py-0.5 rounded-md shadow-xs">
                        Top Rated Fleet
                      </span>
                      <span className="text-[11px] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        View Primo &rarr;
                      </span>
                    </div>
                  </div>
                </div>

                {/* Promo Card 3: Free Cancellation */}
                <div className="snap-start shrink-0 w-72 sm:w-80 bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-all relative overflow-hidden">
                  <div className="relative z-10">
                    <span className="inline-block bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider mb-1.5">
                      Zero Cancellation Risk
                    </span>
                    <h4 className="text-sm font-black leading-tight">
                      100% Instant Refund
                    </h4>
                    <p className="text-[11px] text-emerald-100 mt-1 line-clamp-2">
                      Cancel up to 6 hours before departure with zero penalties on select Hans coaches.
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs font-bold bg-white text-emerald-800 px-2 py-0.5 rounded-md shadow-xs">
                        Instant UPI Refund
                      </span>
                      <span className="text-[11px] font-medium text-emerald-100">
                        Auto-Applied
                      </span>
                    </div>
                  </div>
                </div>

                {/* Promo Card 4: Free Bus Change */}
                <div className="snap-start shrink-0 w-72 sm:w-80 bg-gradient-to-br from-red-600 via-rose-600 to-brand-charcoal text-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-all relative overflow-hidden">
                  <div className="relative z-10">
                    <span className="inline-block bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider mb-1.5">
                      FlexiPass
                    </span>
                    <h4 className="text-sm font-black leading-tight">
                      Free Bus & Date Change
                    </h4>
                    <p className="text-[11px] text-rose-100 mt-1 line-clamp-2">
                      Plans changed? Reschedule your ticket up to 2 hours prior with ₹0 modification fees.
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs font-bold bg-white text-red-600 px-2 py-0.5 rounded-md shadow-xs">
                        Flexible Bookings
                      </span>
                      <span className="text-[11px] font-medium text-rose-100">
                        24/7 Helpline
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* 4. RESULTS SORTING TOOLBAR                                                */}
            {/* ========================================================================= */}
            {!selectedBus && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <div className="text-xs text-slate-600">
                  Showing <strong className="text-brand-charcoal font-black">{filteredBuses.length}</strong> available coaches for{' '}
                  <strong className="text-brand-charcoal">{fromCity} &rarr; {toCity}</strong>
                </div>

                <div className="flex items-center gap-1.5 text-xs overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto scrollbar-none">
                  <span className="text-slate-400 font-bold uppercase text-[10px] mr-1 shrink-0">Sort by:</span>
                  {[
                    { id: 'ratings', label: 'Ratings' },
                    { id: 'departure', label: 'Departure' },
                    { id: 'price', label: 'Price' },
                    { id: 'duration', label: 'Duration' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setSortBy(tab.id)}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer text-xs shrink-0 ${
                        sortBy === tab.id
                          ? 'bg-brand-red text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 5. BUS CARD FEED / SINGLE BUS ISOLATION VIEW                              */}
            {/* ========================================================================= */}
            {selectedBus ? (
              /* CRITICAL RULE: ONLY SHOW CLICKED BUS AND ITS RELATED INFO, NOT OTHERS */
              <div className="space-y-6 animate-fadeIn">
                {/* Back to all coaches navigation header */}
                <div className="bg-white border border-slate-200/80 p-4 rounded-2xl shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleBackToAllBuses}
                    className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-brand-red transition-colors cursor-pointer group"
                  >
                    <span className="p-1.5 rounded-lg bg-slate-100 border border-slate-200 group-hover:bg-red-50 group-hover:border-brand-red text-slate-700 group-hover:text-brand-red transition-colors shadow-xs">
                      <ArrowLeft className="w-4 h-4" />
                    </span>
                    <span>&larr; Back to all available coaches ({filteredBuses.length})</span>
                  </button>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <span>Active Selection:</span>
                    <span className="font-bold text-brand-charcoal bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                      {selectedBus.name}
                    </span>
                    <button
                      type="button"
                      onClick={handleBackToAllBuses}
                      className="text-xs font-bold text-blue-600 hover:underline cursor-pointer ml-1"
                    >
                      Change Bus
                    </button>
                  </div>
                </div>

                {/* Selected Bus Detailed Container */}
                <div className="bg-white border border-blue-200 ring-2 ring-blue-100/70 rounded-3xl shadow-md overflow-hidden">
                  {/* Bus Summary Row */}
                  <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-blue-50/40 via-white to-transparent">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-xl font-black text-brand-charcoal">
                          {selectedBus.name}
                        </h3>
                        {selectedBus.isPrimo && (
                          <span className="text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded font-black">
                            PRIMO
                          </span>
                        )}
                        <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold border border-blue-100">
                          Live GPS Tracking
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">
                        {selectedBus.busType}
                      </p>
                      <div className="flex flex-wrap gap-3 pt-1 text-xs text-slate-600">
                        <span className="flex items-center gap-1 font-black text-slate-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          ★ {selectedBus.rating} ({selectedBus.reviewsCount} reviews)
                        </span>
                        <span>&bull;</span>
                        <span className="text-emerald-700 font-bold">{selectedBus.seatsAvailable} Berths Available</span>
                      </div>
                    </div>

                    {/* Timings */}
                    <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-6 text-center w-full sm:w-auto py-2 sm:py-0 border-y sm:border-y-0 border-slate-100">
                      <div>
                        <span className="text-xl sm:text-2xl font-black text-brand-charcoal block">{selectedBus.departureTime}</span>
                        <span className="text-xs text-slate-500 font-semibold">{fromCity}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] text-slate-400 font-bold">{selectedBus.duration}</span>
                        <div className="w-16 sm:w-24 h-0.5 bg-slate-200 my-1.5 relative">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-600" />
                        </div>
                        <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Direct</span>
                      </div>
                      <div>
                        <span className="text-xl sm:text-2xl font-black text-brand-charcoal block">{selectedBus.arrivalTime}</span>
                        <span className="text-xs text-slate-500 font-semibold">{toCity}</span>
                      </div>
                    </div>

                    {/* Price Tag & Reset Action */}
                    <div className="flex items-center justify-between md:flex-col md:items-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                      <div className="text-right">
                        <span className="text-[11px] text-slate-400 font-medium block">Starting from</span>
                        <span className="text-3xl font-black text-brand-charcoal">₹{selectedBus.price}</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleBackToAllBuses}
                        className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
                      >
                        Change Bus
                      </button>
                    </div>
                  </div>

                  {/* Included Amenities Badges */}
                  {selectedBus.amenities && (
                    <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50/50 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider mr-1">
                        Coach Amenities:
                      </span>
                      {selectedBus.amenities.map((amenity, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-xs"
                        >
                          <Sparkles className="w-3 h-3 text-brand-red" />
                          {amenity}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Boarding & Dropping Points Preview */}
                  {(selectedBus.boardingPoints || selectedBus.droppingPoints) && (
                    <div className="px-6 py-5 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white text-xs">
                      {selectedBus.boardingPoints && (
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                          <span className="font-black text-slate-800 flex items-center gap-2 mb-2.5 text-xs">
                            <MapPin className="w-4 h-4 text-blue-600" />
                            Boarding Points in {fromCity}
                          </span>
                          <div className="space-y-2 text-slate-600">
                            {selectedBus.boardingPoints.map((bp, idx) => (
                              <div key={idx} className="flex items-start justify-between gap-3">
                                <span className="font-medium text-slate-700">{bp.location}</span>
                                <span className="font-black text-brand-charcoal shrink-0">{bp.time}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {selectedBus.droppingPoints && (
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                          <span className="font-black text-slate-800 flex items-center gap-2 mb-2.5 text-xs">
                            <MapPin className="w-4 h-4 text-brand-red" />
                            Dropping Points in {toCity}
                          </span>
                          <div className="space-y-2 text-slate-600">
                            {selectedBus.droppingPoints.map((dp, idx) => (
                              <div key={idx} className="flex items-start justify-between gap-3">
                                <span className="font-medium text-slate-700">{dp.location}</span>
                                <span className="font-black text-brand-charcoal shrink-0">{dp.time}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Interactive Berth Selector Drawer */}
                  <div className="p-6 bg-slate-50/80 border-t border-slate-100 space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                      <span className="font-black text-slate-800 text-sm">
                        Select Preferred Berths (Upper / Lower Deck)
                      </span>
                      <div className="flex items-center gap-4 text-slate-600 font-semibold">
                        <span className="flex items-center gap-1.5">
                          <span className="w-3.5 h-3.5 bg-white border border-slate-300 rounded shadow-xs" /> Available
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-3.5 h-3.5 bg-blue-600 rounded shadow-xs" /> Selected
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-3.5 h-3.5 bg-slate-200 rounded" /> Booked
                        </span>
                      </div>
                    </div>

                    {/* Sleeper Deck Grids */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                      {/* Lower Deck */}
                      <div className="space-y-3">
                        <span className="text-xs font-black text-slate-600 uppercase tracking-wider block">
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
                                className={`p-3.5 rounded-xl text-xs font-bold flex flex-col items-center justify-center transition-all ${
                                  isBooked
                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                                    : isSelected
                                    ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-300 cursor-pointer'
                                    : 'bg-white border border-slate-200 text-slate-700 hover:border-blue-400 hover:shadow-xs cursor-pointer'
                                }`}
                              >
                                <span>{id}</span>
                                <span className="text-[10px] opacity-80 mt-0.5">₹{selectedBus.price}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Upper Deck */}
                      <div className="space-y-3">
                        <span className="text-xs font-black text-slate-600 uppercase tracking-wider block">
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
                                className={`p-3.5 rounded-xl text-xs font-bold flex flex-col items-center justify-center transition-all ${
                                  isBooked
                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                                    : isSelected
                                    ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-300 cursor-pointer'
                                    : 'bg-white border border-slate-200 text-slate-700 hover:border-blue-400 hover:shadow-xs cursor-pointer'
                                }`}
                              >
                                <span>{id}</span>
                                <span className="text-[10px] opacity-80 mt-0.5">₹{selectedBus.price}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Booking Summary & High-Priority RED Action Button */}
                    <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="space-y-1 text-xs text-slate-600">
                        <div>
                          <strong>Selected Berths:</strong>{' '}
                          <span className="font-black text-brand-charcoal text-sm">
                            {selectedSeats.length ? selectedSeats.join(', ') : 'None selected'}
                          </span>
                        </div>
                        <div>
                          <strong>Total Payable Fare:</strong>{' '}
                          <span className="text-lg font-black text-brand-charcoal">
                            ₹{selectedSeats.length * selectedBus.price}
                          </span>{' '}
                          (Inclusive of GST & insurance)
                        </div>
                      </div>

                      {/* Solid Red CTA */}
                      <button
                        type="button"
                        disabled={selectedSeats.length === 0}
                        onClick={() => setBookingConfirmed(true)}
                        className="w-full sm:w-auto px-10 py-3.5 bg-brand-red hover:bg-brand-red-hover active:bg-brand-red-active text-white text-sm font-black rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        Proceed to Book (₹{selectedSeats.length * selectedBus.price})
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* ALL BUSES LIST (When no bus is currently selected) */
              <div className="space-y-4">
                {filteredBuses.length === 0 ? (
                  <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-red-50 text-brand-red rounded-full flex items-center justify-center mx-auto">
                      <Bus className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-black text-brand-charcoal">
                      No coaches match your filters
                    </h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Try resetting your AI search query, adjusting your departure time, or broadening your budget.
                    </p>
                    <button
                      type="button"
                      onClick={handleClearAllFilters}
                      className="px-6 py-2.5 bg-brand-red text-white text-xs font-bold rounded-xl shadow-sm hover:bg-brand-red-hover transition-colors cursor-pointer"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  filteredBuses.map((bus) => (
                    <div
                      key={bus.id}
                      className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 overflow-hidden group"
                    >
                      {/* Bus Card Content */}
                      <div className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                        {/* Bus Name & Operators */}
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-base sm:text-lg font-black text-brand-charcoal group-hover:text-brand-red transition-colors">
                              {bus.name}
                            </h4>
                            {bus.isPrimo && (
                              <span className="text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded font-black tracking-wider">
                                PRIMO
                              </span>
                            )}
                            <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold border border-blue-100">
                              Live GPS
                            </span>
                            {bus.freeCancellation && (
                              <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold border border-emerald-100">
                                Free Cancel
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-slate-500 font-medium">
                            {bus.busType}
                          </p>

                          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-600">
                            <span className="flex items-center gap-1 font-bold text-slate-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                              ★ {bus.rating} ({bus.reviewsCount})
                            </span>
                            <span>&bull;</span>
                            <span className="text-emerald-700 font-bold">
                              {bus.seatsAvailable} Berths Left
                            </span>
                            {bus.hasSingleSeats && (
                              <>
                                <span>&bull;</span>
                                <span className="text-blue-600 font-medium">Single Seats</span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Route Timings */}
                        <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-8 text-center w-full sm:w-auto py-2 sm:py-0 border-y sm:border-y-0 border-slate-100">
                          <div>
                            <span className="text-xl sm:text-2xl font-black text-brand-charcoal block">
                              {bus.departureTime}
                            </span>
                            <span className="text-[11px] text-slate-500 font-semibold">{fromCity}</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="text-[10px] text-slate-400 font-bold">{bus.duration}</span>
                            <div className="w-16 sm:w-24 h-0.5 bg-slate-200 my-1.5 relative">
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-slate-400" />
                            </div>
                            <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">
                              Direct
                            </span>
                          </div>
                          <div>
                            <span className="text-xl sm:text-2xl font-black text-brand-charcoal block">
                              {bus.arrivalTime}
                            </span>
                            <span className="text-[11px] text-slate-500 font-semibold">{toCity}</span>
                          </div>
                        </div>

                        {/* Price & Select Seats Button */}
                        <div className="flex items-center justify-between lg:flex-col lg:items-end gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 shrink-0">
                          <div className="text-right">
                            <span className="text-[11px] text-slate-400 block font-medium">Per Berth</span>
                            <span className="text-2xl font-black text-brand-charcoal">
                              ₹{bus.price}
                            </span>
                          </div>

                          {/* When clicked, ONLY this bus will be shown! */}
                          <button
                            type="button"
                            onClick={() => handleSelectBus(bus)}
                            className="px-6 py-2.5 text-xs font-black rounded-xl bg-brand-red hover:bg-brand-red-hover active:bg-brand-red-active text-white transition-all cursor-pointer shadow-md hover:shadow-lg"
                          >
                            Select Seats
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Bottom Sheet Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end lg:hidden animate-fadeIn">
          <div
            className="fixed inset-0 -z-10"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="bg-white rounded-t-3xl max-h-[85vh] flex flex-col shadow-2xl border-t border-slate-200 animate-slideUp">
            {/* Drawer Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-brand-red" />
                <h3 className="text-sm font-black text-brand-charcoal uppercase tracking-wider">
                  Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={handleClearAllFilters}
                    className="text-xs font-bold text-brand-red hover:underline cursor-pointer"
                  >
                    Reset All
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="p-5 overflow-y-auto space-y-6 flex-1">
              {renderFilterContent()}
            </div>

            {/* Drawer Fixed CTA Footer */}
            <div className="p-4 border-t border-slate-100 bg-white flex-shrink-0">
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3.5 bg-brand-red hover:bg-brand-red-hover active:bg-brand-red-active text-white text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer text-center"
              >
                Show {filteredBuses.length} Coaches
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
