'use client';

import React from 'react';
import { ShieldCheck, Award } from 'lucide-react';

export default function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-6 pb-2">
      {/* Badge 1: Award-Winning Safety (2017) */}
      <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full border border-white/20 shadow-md transition-transform hover:scale-[1.02]">
        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-xs font-bold text-brand-charcoal leading-tight">
            Award-Winning Safety
          </span>
          <span className="text-[10px] text-slate-500 font-medium">
            National Transport Excellence 2017
          </span>
        </div>
      </div>

      {/* Badge 2: Excellence in Indian Bus Travel (2018) */}
      <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full border border-white/20 shadow-md transition-transform hover:scale-[1.02]">
        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
          <Award className="w-3.5 h-3.5 text-blue-700" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-xs font-bold text-brand-charcoal leading-tight">
            Excellence in Indian Bus Travel
          </span>
          <span className="text-[10px] text-slate-500 font-medium">
            Punctuality & Service Honors 2018
          </span>
        </div>
      </div>
    </div>
  );
}
