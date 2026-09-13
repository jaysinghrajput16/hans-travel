'use client';

import React, { useState } from 'react';
import { X, Navigation, Radio, MapPin, Clock, Shield, Search } from 'lucide-react';

export default function TrackBusModal({ isOpen, onClose }) {
  const [busNumber, setBusNumber] = useState('MP-09-FA-8822');
  const [tracked, setTracked] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleTrackBus = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setTracked(true);
    }, 400);
  };

  const handleClose = () => {
    setTracked(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overscroll-contain">
      <div className="bg-white rounded-3xl shadow-modal w-full max-w-lg overflow-hidden border border-slate-200 transform-gpu [transform:translateZ(0)] [will-change:transform]">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-brand-light-blue/60">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <h3 className="text-xl font-black text-brand-charcoal">
              Live GPS Coach Tracking
            </h3>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <form onSubmit={handleTrackBus} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Bus Vehicle Number or PNR *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={busNumber}
                  onChange={(e) => setBusNumber(e.target.value)}
                  placeholder="e.g. MP-09-FA-8822 or HANS-102"
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-400 text-sm font-semibold uppercase"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-brand-red hover:bg-brand-red-hover active:bg-brand-red-active text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>{loading ? 'Locating...' : 'Search'}</span>
                </button>
              </div>
            </div>
          </form>

          {tracked && (
            <div className="space-y-4 pt-2">
              <div className="p-5 bg-brand-light-blue rounded-2xl border border-blue-100 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 block">Coach & Route</span>
                    <strong className="text-sm font-black text-brand-charcoal">
                      Volvo 9600 Multi-Axle Sleeper
                    </strong>
                    <span className="text-xs text-slate-600 block">Indore &rarr; Mumbai Central</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-emerald-600 font-bold flex items-center justify-end gap-1">
                      <Radio className="w-3.5 h-3.5" /> LIVE ON ROAD
                    </span>
                    <span className="text-sm font-black text-slate-800">78 km/h</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Passed: Nashik Bypass</span>
                    <span className="font-bold text-slate-800">ETA Mumbai: 06:15 AM</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full w-[72%]" />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Departed 20:00</span>
                    <span>72% of journey completed</span>
                    <span>Arrival 06:30</span>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-blue-100 text-xs text-slate-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <strong>Current GPS:</strong> Kasara Ghat Expressway
                  </span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    On Time (+0 min)
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
