'use client';

import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

/**
 * Calendar Date Picker
 * Features:
 * - Month navigation (< September 2026 >)
 * - Clean grid of dates for fast 1-click selection
 */
export default function DateRangePicker({
  departureDate, // 'YYYY-MM-DD'
  onSelectDeparture,
  onClose,
}) {
  // Helper to format Date into YYYY-MM-DD key
  const formatDateKey = (y, m, d) => {
    const mm = String(m + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${y}-${mm}-${dd}`;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDay = today.getDate();
  const todayKey = formatDateKey(todayYear, todayMonth, todayDay);

  const selectedDateKey = departureDate || todayKey;

  // Active viewing month
  const [viewDate, setViewDate] = useState(() => {
    if (selectedDateKey) {
      const parts = selectedDateKey.split('-').map(Number);
      if (parts[0] && parts[1]) {
        return new Date(parts[0], parts[1] - 1, 1);
      }
    }
    return new Date(todayYear, todayMonth, 1);
  });

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  // Navigation handlers
  const isPrevDisabled =
    viewYear < todayYear || (viewYear === todayYear && viewMonth <= todayMonth);

  const handlePrevMonth = (e) => {
    e.stopPropagation();
    if (isPrevDisabled) return;
    setViewDate(new Date(viewYear, viewMonth - 1, 1));
  };

  const handleNextMonth = (e) => {
    e.stopPropagation();
    setViewDate(new Date(viewYear, viewMonth + 1, 1));
  };

  // Calendar cells calculation
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay(); // 0 is Sunday

  const calendarDays = useMemo(() => {
    const days = [];
    // Padding
    for (let p = 0; p < firstDayIndex; p++) {
      days.push({ id: `pad-${p}`, isPad: true });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = formatDateKey(viewYear, viewMonth, day);
      const cellDate = new Date(viewYear, viewMonth, day);
      cellDate.setHours(0, 0, 0, 0);

      const isPast = cellDate.getTime() < today.getTime();
      const isSelected = dateKey === selectedDateKey;
      const isToday = dateKey === todayKey;

      days.push({
        id: dateKey,
        day,
        dateKey,
        isPad: false,
        isPast,
        isSelected,
        isToday,
      });
    }
    return days;
  }, [viewYear, viewMonth, daysInMonth, firstDayIndex, selectedDateKey, todayKey, today]);

  const handleSelect = (dateKey, isPast) => {
    if (isPast) return;
    if (onSelectDeparture) {
      onSelectDeparture(dateKey);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-full max-w-[320px] bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden select-none animate-in fade-in zoom-in-95 duration-150 p-4 space-y-3.5 ring-1 ring-black/5"
    >

      {/* 2. Horizontal Month Navigation Bar */}
      <div className="flex items-center justify-between px-1">
        <button
          type="button"
          onClick={handlePrevMonth}
          disabled={isPrevDisabled}
          className={`p-1.5 rounded-xl border border-slate-200 transition-colors ${
            isPrevDisabled
              ? 'text-slate-300 border-slate-100 cursor-not-allowed pointer-events-none'
              : 'text-slate-700 hover:text-red-600 hover:bg-red-50 hover:border-red-200 cursor-pointer'
          }`}
          aria-label="Previous month"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <h4 className="text-sm font-black text-slate-900 tracking-tight">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </h4>

        <button
          type="button"
          onClick={handleNextMonth}
          className="p-1.5 rounded-xl border border-slate-200 text-slate-700 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer"
          aria-label="Next month"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 3. Horizontal Days of Week Header */}
      <div className="grid grid-cols-7 text-center">
        {DAYS_OF_WEEK.map((day, idx) => (
          <span
            key={idx}
            className={`text-[10px] font-bold uppercase ${
              idx === 0 ? 'text-red-500 font-black' : 'text-slate-400'
            }`}
          >
            {day}
          </span>
        ))}
      </div>

      {/* 4. Horizontal Date Grid */}
      <div className="grid grid-cols-7 gap-y-1 text-center">
        {calendarDays.map((item) => {
          if (item.isPad) {
            return <div key={item.id} className="h-8 w-8" />;
          }

          return (
            <div key={item.id} className="flex items-center justify-center">
              <button
                type="button"
                disabled={item.isPast}
                onClick={() => handleSelect(item.dateKey, item.isPast)}
                className={`h-8 w-8 text-xs font-bold rounded-full flex items-center justify-center transition-all ${
                  item.isSelected
                    ? 'bg-red-600 text-white font-black shadow-md scale-105 ring-2 ring-red-200'
                    : item.isPast
                    ? 'text-slate-300 cursor-not-allowed pointer-events-none'
                    : item.isToday
                    ? 'text-red-600 font-black hover:bg-red-50 cursor-pointer border border-red-200'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 cursor-pointer'
                }`}
              >
                {item.day}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
