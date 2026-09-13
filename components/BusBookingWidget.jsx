'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Bus,
  Calendar,
  ArrowRightLeft,
  Search,
  X,
  Check,
  Clock,
  Navigation,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import {
  TRANSIT_HUBS,
  POPULAR_CITIES,
  RECENT_SEARCHES,
  POPULAR_BOARDING_POINTS,
  POPULAR_DROPPING_POINTS,
} from '../lib/mockData';
import DateRangePicker from './DateRangePicker';

// Text highlighter for autocomplete search matches
function HighlightMatch({ text = '', query = '' }) {
  if (!query || !text) return <>{text}</>;
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase().trim();
  const index = lowerText.indexOf(lowerQuery);
  if (index === -1) return <>{text}</>;

  const before = text.slice(0, index);
  const match = text.slice(index, index + lowerQuery.length);
  const after = text.slice(index + lowerQuery.length);

  return (
    <>
      {before}
      <span className="font-extrabold text-red-600 bg-red-50 px-0.5 rounded">{match}</span>
      {after}
    </>
  );
}

// Helper to get local date key in YYYY-MM-DD
const getLocalDateKey = (offsetDays = 0) => {
  const d = new Date();
  if (offsetDays !== 0) {
    d.setDate(d.getDate() + offsetDays);
  }
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

// Formats date to match redBus style: "12 Sep, 2026 (Today)"
const formatDateDisplay = (dateStr) => {
  if (!dateStr) return { main: '', suffix: '' };
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const parts = dateStr.split('-').map(Number);
  if (parts.length !== 3 || !parts[0] || !parts[1] || !parts[2]) {
    return { main: dateStr, suffix: '' };
  }
  const d = new Date(parts[0], parts[1] - 1, parts[2]);
  const todayKey = getLocalDateKey(0);
  const tomorrowKey = getLocalDateKey(1);

  let suffix = `(${days[d.getDay()]})`;
  if (dateStr === todayKey) suffix = '(Today)';
  else if (dateStr === tomorrowKey) suffix = '(Tomorrow)';

  return {
    main: `${parts[2]} ${months[parts[1] - 1]}, ${parts[0]}`,
    suffix,
  };
};

export default function BusBookingWidget({ onSearch }) {
  const [fromCity, setFromCity] = useState('Indore');
  const [toCity, setToCity] = useState('Jabalpur');
  const [isFromOpen, setIsFromOpen] = useState(false);
  const [isToOpen, setIsToOpen] = useState(false);
  const [swapRotation, setSwapRotation] = useState(0);

  // Departure Date
  const [departureDate, setDepartureDate] = useState(() => getLocalDateKey(0));
  const [activePicker, setActivePicker] = useState(null);

  // Refs for click-outside detection and input focus
  const dateContainerRef = useRef(null);
  const fromContainerRef = useRef(null);
  const toContainerRef = useRef(null);
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);

  // Queries for filtering
  const fromQuery = fromCity.trim().toLowerCase();
  const toQuery = toCity.trim().toLowerCase();

  // Dynamic Autocomplete Filtering for Origin
  const filteredFromHubs = useMemo(() => {
    if (!fromQuery) return [];
    return TRANSIT_HUBS.filter(
      (item) =>
        item.city.toLowerCase().includes(fromQuery) ||
        item.terminal.toLowerCase().includes(fromQuery) ||
        item.state.toLowerCase().includes(fromQuery)
    );
  }, [fromQuery]);

  // Dynamic Autocomplete Filtering for Destination
  const filteredToHubs = useMemo(() => {
    if (!toQuery) return [];
    return TRANSIT_HUBS.filter(
      (item) =>
        item.city.toLowerCase().includes(toQuery) ||
        item.terminal.toLowerCase().includes(toQuery) ||
        item.state.toLowerCase().includes(toQuery)
    );
  }, [toQuery]);

  // Click-outside listener to close dropdowns cleanly
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fromContainerRef.current && !fromContainerRef.current.contains(event.target)) {
        setIsFromOpen(false);
      }
      if (toContainerRef.current && !toContainerRef.current.contains(event.target)) {
        setIsToOpen(false);
      }
      if (dateContainerRef.current && !dateContainerRef.current.contains(event.target)) {
        setActivePicker(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Smooth route swap handler with animated rotation
  const handleSwap = () => {
    setSwapRotation((prev) => prev + 180);
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({
        from: fromCity.trim() || 'Indore',
        to: toCity.trim() || 'Jabalpur',
        date: departureDate,
        returnDate: null,
        passengers: 1,
      });
    }
  };

  const dateDisplay = formatDateDisplay(departureDate);

  return (
    /* Outer white container wrapper: relative positioning with pb-12 md:pb-14 for half-inside half-outside button */
    <div className="w-full max-w-6xl xl:max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl px-3 py-3 sm:px-4 sm:py-3.5 md:px-5 md:py-3.5 relative pb-12 sm:pb-14 z-30">
      <form
        onSubmit={handleSearchSubmit}
        onKeyDown={(e) => {
          // Prevent Enter key in text inputs from submitting form and opening search buses page
          if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
            e.preventDefault();
          }
        }}
      >
        {/* Precise 3-column horizontal grid with streamlined slim height */}
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center divide-y lg:divide-y-0 lg:divide-x divide-gray-100 bg-white rounded-2xl border border-gray-200/80 px-2.5 py-1 sm:px-4 sm:py-2 relative">
          
          {/* Column 1: Combine Origin and Destination inputs into a unified sub-flex container inside first 2 grid spans */}
          <div className="lg:col-span-2 flex flex-col sm:flex-row items-center justify-between relative px-0.5 sm:px-2">
            
            {/* FROM Field */}
            <div
              className="flex-1 w-full relative py-1 px-2.5 sm:py-1.5 sm:pl-3 sm:pr-12 pb-2 sm:pb-1.5 hover:bg-slate-50/70 transition-colors rounded-xl cursor-text"
              ref={fromContainerRef}
              onClick={() => {
                setIsFromOpen(true);
                fromInputRef.current?.focus();
              }}
            >
              <div className="flex items-center gap-2.5">
                <Bus className={`w-5 h-5 flex-shrink-0 transition-colors ${isFromOpen ? 'text-red-600' : 'text-gray-700'}`} />
                <div className="flex-1 min-w-0">
                  <span className="block text-[11px] text-gray-500 font-medium leading-none mb-0.5">
                    From
                  </span>
                  <input
                    ref={fromInputRef}
                    id="from-city-input"
                    name="fromCity"
                    aria-label="Departure City"
                    type="text"
                    value={fromCity}
                    onChange={(e) => {
                      setFromCity(e.target.value);
                      setIsFromOpen(true);
                    }}
                    onFocus={() => {
                      setIsFromOpen(true);
                      setIsToOpen(false);
                      setActivePicker(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (filteredFromHubs.length > 0 && isFromOpen && fromQuery) {
                          setFromCity(filteredFromHubs[0].city);
                        }
                        setIsFromOpen(false);
                        fromInputRef.current?.blur();
                      }
                    }}
                    placeholder="Indore"
                    className="w-full bg-transparent text-base sm:text-lg font-bold text-gray-900 placeholder:text-gray-400 focus:outline-none truncate"
                    autoComplete="off"
                    spellCheck="false"
                  />
                </div>

                {/* Clear button (✕) */}
                {fromCity && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFromCity('');
                      setIsFromOpen(true);
                      fromInputRef.current?.focus();
                    }}
                    className="w-5 h-5 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors flex-shrink-0 cursor-pointer"
                    title="Clear"
                    aria-label="Clear"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Autocomplete Dropdown Popover */}
              {isFromOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 mt-2 w-[calc(100vw-2.5rem)] max-w-sm sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 p-3 sm:p-4 max-h-72 sm:max-h-80 overflow-y-auto overscroll-contain animate-in fade-in slide-in-from-top-1 duration-150 text-left"
                  role="listbox"
                >
                  {!fromQuery ? (
                    /* State A: When Input is Empty */
                    <div className="space-y-4">
                      {/* Recent searches */}
                      <div>
                        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>Recent searches</span>
                        </div>
                        <div className="space-y-1">
                          {RECENT_SEARCHES.map((item, idx) => (
                            <div
                              key={`from-recent-${idx}`}
                              onClick={() => {
                                setFromCity(item.from);
                                setToCity(item.to);
                                setIsFromOpen(false);
                              }}
                              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-red-50/70 transition-colors cursor-pointer group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 group-hover:text-red-600 transition-colors">
                                <Clock className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-bold text-slate-800 group-hover:text-red-600 transition-colors truncate">
                                  {item.label}
                                </div>
                                <div className="text-xs text-slate-400 truncate">
                                  {item.subtitle}
                                </div>
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-red-600 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Popular Boarding Points near you */}
                      <div className="pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
                          <Navigation className="w-3.5 h-3.5 text-slate-400" />
                          <span>Popular Boarding Points near you</span>
                        </div>
                        <div className="space-y-1">
                          {POPULAR_BOARDING_POINTS.map((item, idx) => (
                            <div
                              key={`from-boarding-${idx}`}
                              onClick={() => {
                                setFromCity(item.city);
                                setIsFromOpen(false);
                              }}
                              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-red-50/70 transition-colors cursor-pointer group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                                <Bus className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-bold text-slate-800 group-hover:text-red-600 transition-colors truncate">
                                  {item.name}
                                </div>
                                <div className="text-xs text-slate-400 truncate">
                                  {item.subtitle}
                                </div>
                              </div>
                              <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 group-hover:bg-red-100 group-hover:text-red-600 px-2 py-0.5 rounded transition-colors">
                                {item.city}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Popular Cities */}
                      <div className="pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>Popular Cities</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                          {POPULAR_CITIES.slice(0, 6).map((cityName) => (
                            <button
                              key={`from-pop-city-${cityName}`}
                              type="button"
                              onClick={() => {
                                setFromCity(cityName);
                                setIsFromOpen(false);
                              }}
                              className="p-2 rounded-xl border border-slate-200 hover:border-red-300 hover:bg-red-50/70 text-left transition-all flex items-center gap-2 group cursor-pointer"
                            >
                              <MapPin className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-600 transition-colors flex-shrink-0" />
                              <span className="text-xs font-bold text-slate-700 group-hover:text-red-600 truncate transition-colors">
                                {cityName}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* State B: When User Types */
                    <div>
                      <div className="flex items-center justify-between px-1 pb-2 mb-2 border-b border-slate-100">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Matching Cities & Terminals
                        </span>
                        <span className="text-[10px] font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                          {filteredFromHubs.length} Found
                        </span>
                      </div>

                      <div className="space-y-1">
                        {filteredFromHubs.length > 0 ? (
                          filteredFromHubs.map((item) => {
                            const isSelected = fromCity.trim().toLowerCase() === item.city.toLowerCase();
                            return (
                              <div
                                key={item.id}
                                onClick={() => {
                                  setFromCity(item.city);
                                  setIsFromOpen(false);
                                }}
                                className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer hover:bg-red-50/80 transition-colors group"
                                role="option"
                                aria-selected={isSelected}
                              >
                                <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                                  <Bus className="w-4 h-4" />
                                </div>

                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors truncate">
                                    <HighlightMatch text={item.terminal} query={fromQuery} />
                                  </div>
                                  <div className="text-xs text-slate-500 truncate mt-0.5">
                                    <HighlightMatch text={item.city} query={fromQuery} /> • {item.state}
                                  </div>
                                </div>

                                {isSelected && (
                                  <Check className="w-4 h-4 text-red-600 flex-shrink-0 ml-1" />
                                )}
                              </div>
                            );
                          })
                        ) : (
                          /* Clean Fallback State */
                          <div className="py-6 px-4 text-center">
                            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2.5">
                              <Search className="w-5 h-5" />
                            </div>
                            <p className="text-sm font-bold text-slate-700">No matching terminals found</p>
                            <p className="text-xs text-slate-400 mt-1">Please check spelling or try another city</p>
                            <button
                              type="button"
                              onClick={() => {
                                setIsFromOpen(false);
                              }}
                              className="mt-3.5 px-3.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                            >
                              <MapPin className="w-3.5 h-3.5" />
                              <span>Continue with &quot;{fromCity}&quot;</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Circular swap button (⇄) */}
            <div className="relative my-[-10px] sm:my-0 sm:absolute sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-20 flex justify-center">
              <button
                type="button"
                onClick={handleSwap}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-[#3e3e3e] hover:bg-black text-white rounded-full shadow-md flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer border-2 border-white"
                title="Swap Departure and Destination"
                aria-label="Swap Departure and Destination"
              >
                <div
                  style={{ transform: `rotate(${swapRotation}deg)` }}
                  className="transition-transform duration-500 ease-in-out"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white rotate-90 sm:rotate-0" />
                </div>
              </button>
            </div>

            {/* TO Field */}
            <div
              className="flex-1 w-full relative py-1 px-2.5 sm:py-1.5 sm:pl-12 sm:pr-3 pt-2 sm:pt-1.5 hover:bg-slate-50/70 transition-colors rounded-xl cursor-text"
              ref={toContainerRef}
              onClick={() => {
                setIsToOpen(true);
                toInputRef.current?.focus();
              }}
            >
              <div className="flex items-center gap-2.5">
                <Bus className={`w-5 h-5 flex-shrink-0 transition-colors ${isToOpen ? 'text-red-600' : 'text-gray-700'}`} />
                <div className="flex-1 min-w-0">
                  <span className="block text-[11px] text-gray-500 font-medium leading-none mb-0.5">
                    To
                  </span>
                  <input
                    ref={toInputRef}
                    id="to-city-input"
                    name="toCity"
                    aria-label="Destination City"
                    type="text"
                    value={toCity}
                    onChange={(e) => {
                      setToCity(e.target.value);
                      setIsToOpen(true);
                    }}
                    onFocus={() => {
                      setIsToOpen(true);
                      setIsFromOpen(false);
                      setActivePicker(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (filteredToHubs.length > 0 && isToOpen && toQuery) {
                          setToCity(filteredToHubs[0].city);
                        }
                        setIsToOpen(false);
                        toInputRef.current?.blur();
                      }
                    }}
                    placeholder="Jabalpur"
                    className="w-full bg-transparent text-base sm:text-lg font-bold text-gray-900 placeholder:text-gray-400 focus:outline-none truncate"
                    autoComplete="off"
                    spellCheck="false"
                  />
                </div>

                {/* Clear button (✕) */}
                {toCity && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setToCity('');
                      setIsToOpen(true);
                      toInputRef.current?.focus();
                    }}
                    className="w-5 h-5 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors flex-shrink-0 cursor-pointer"
                    title="Clear"
                    aria-label="Clear"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Autocomplete Dropdown Popover */}
              {isToOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 mt-2 w-[calc(100vw-2.5rem)] max-w-sm sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 p-3 sm:p-4 max-h-72 sm:max-h-80 overflow-y-auto overscroll-contain animate-in fade-in slide-in-from-top-1 duration-150 text-left"
                  role="listbox"
                >
                  {!toQuery ? (
                    /* State A: When Input is Empty */
                    <div className="space-y-4">
                      {/* Recent searches */}
                      <div>
                        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>Recent searches</span>
                        </div>
                        <div className="space-y-1">
                          {RECENT_SEARCHES.map((item, idx) => (
                            <div
                              key={`to-recent-${idx}`}
                              onClick={() => {
                                setFromCity(item.from);
                                setToCity(item.to);
                                setIsToOpen(false);
                              }}
                              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-red-50/70 transition-colors cursor-pointer group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 group-hover:text-red-600 transition-colors">
                                <Clock className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-bold text-slate-800 group-hover:text-red-600 transition-colors truncate">
                                  {item.label}
                                </div>
                                <div className="text-xs text-slate-400 truncate">
                                  {item.subtitle}
                                </div>
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-red-600 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Popular Dropping Points */}
                      <div className="pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
                          <Navigation className="w-3.5 h-3.5 text-slate-400" />
                          <span>Popular Dropping Points</span>
                        </div>
                        <div className="space-y-1">
                          {POPULAR_DROPPING_POINTS.map((item, idx) => (
                            <div
                              key={`to-dropping-${idx}`}
                              onClick={() => {
                                setToCity(item.city);
                                setIsToOpen(false);
                              }}
                              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-red-50/70 transition-colors cursor-pointer group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                                <Bus className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-bold text-slate-800 group-hover:text-red-600 transition-colors truncate">
                                  {item.name}
                                </div>
                                <div className="text-xs text-slate-400 truncate">
                                  {item.subtitle}
                                </div>
                              </div>
                              <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 group-hover:bg-red-100 group-hover:text-red-600 px-2 py-0.5 rounded transition-colors">
                                {item.city}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Popular Cities */}
                      <div className="pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>Popular Cities</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                          {['Jabalpur', 'Mumbai', 'Pune', 'Bhopal', 'Ahmedabad', 'Indore'].map((cityName) => (
                            <button
                              key={`to-pop-city-${cityName}`}
                              type="button"
                              onClick={() => {
                                setToCity(cityName);
                                setIsToOpen(false);
                              }}
                              className="p-2 rounded-xl border border-slate-200 hover:border-red-300 hover:bg-red-50/70 text-left transition-all flex items-center gap-2 group cursor-pointer"
                            >
                              <MapPin className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-600 transition-colors flex-shrink-0" />
                              <span className="text-xs font-bold text-slate-700 group-hover:text-red-600 truncate transition-colors">
                                {cityName}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* State B: When User Types */
                    <div>
                      <div className="flex items-center justify-between px-1 pb-2 mb-2 border-b border-slate-100">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Matching Cities & Terminals
                        </span>
                        <span className="text-[10px] font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                          {filteredToHubs.length} Found
                        </span>
                      </div>

                      <div className="space-y-1">
                        {filteredToHubs.length > 0 ? (
                          filteredToHubs.map((item) => {
                            const isSelected = toCity.trim().toLowerCase() === item.city.toLowerCase();
                            return (
                              <div
                                key={item.id}
                                onClick={() => {
                                  setToCity(item.city);
                                  setIsToOpen(false);
                                }}
                                className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer hover:bg-red-50/80 transition-colors group"
                                role="option"
                                aria-selected={isSelected}
                              >
                                <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                                  <Bus className="w-4 h-4" />
                                </div>

                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors truncate">
                                    <HighlightMatch text={item.terminal} query={toQuery} />
                                  </div>
                                  <div className="text-xs text-slate-500 truncate mt-0.5">
                                    <HighlightMatch text={item.city} query={toQuery} /> • {item.state}
                                  </div>
                                </div>

                                {isSelected && (
                                  <Check className="w-4 h-4 text-red-600 flex-shrink-0 ml-1" />
                                )}
                              </div>
                            );
                          })
                        ) : (
                          /* Clean Fallback State */
                          <div className="py-6 px-4 text-center">
                            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2.5">
                              <Search className="w-5 h-5" />
                            </div>
                            <p className="text-sm font-bold text-slate-700">No matching terminals found</p>
                            <p className="text-xs text-slate-400 mt-1">Please check spelling or try another city</p>
                            <button
                              type="button"
                              onClick={() => {
                                setIsToOpen(false);
                              }}
                              className="mt-3.5 px-3.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                            >
                              <MapPin className="w-3.5 h-3.5" />
                              <span>Continue with &quot;{toCity}&quot;</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>

          {/* Column 2: Date of Journey assigned strictly to the third grid column */}
          <div
            className="lg:col-span-1 px-3 py-1.5 sm:px-4 sm:py-2 flex items-center justify-between relative cursor-pointer select-none hover:bg-slate-50/70 transition-colors rounded-xl"
            ref={dateContainerRef}
            onClick={() => setActivePicker(activePicker === 'departure' ? null : 'departure')}
          >
            <div className="flex items-center gap-2.5">
              <Calendar className={`w-5 h-5 flex-shrink-0 transition-colors ${activePicker === 'departure' ? 'text-red-600' : 'text-gray-700'}`} />
              <div className="flex items-baseline gap-2 min-w-0">
                <span className="text-xs text-gray-500 font-medium">
                  Date:
                </span>
                <span className="text-base sm:text-lg font-bold text-gray-900 truncate">
                  {dateDisplay.main}
                </span>
              </div>
            </div>

            {/* Floating Horizontal DatePicker */}
            {activePicker === 'departure' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 mt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150 w-[calc(100vw-2.5rem)] max-w-[320px]">
                <DateRangePicker
                  departureDate={departureDate}
                  onSelectDeparture={(date) => {
                    setDepartureDate(date);
                    setActivePicker(null);
                  }}
                  onClose={() => setActivePicker(null)}
                />
              </div>
            )}
          </div>

        </div>

        {/* Center-Overlapping "Search Buses" Button: anchored half-inside and half-outside the bottom edge */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 z-20 w-full px-4 sm:w-auto sm:px-0 flex justify-center">
          <button
            type="submit"
            aria-label="Search buses"
            className="w-full sm:w-auto max-w-[280px] sm:max-w-none bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-sm sm:text-base md:text-lg px-6 sm:px-12 py-3 sm:py-3.5 rounded-full shadow-xl flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Search buses</span>
          </button>
        </div>

      </form>
    </div>
  );
}
