'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { PhoneCall, User, X } from 'lucide-react';

export default function Header({ onOpenManageBooking, onOpenTrackBus, onOpenAuth }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // State: mobile overlay open/close
  const [isOpen, setIsOpen] = useState(false);
  // State: dynamic scroll detection for responsive glassmorphism
  const [isScrolled, setIsScrolled] = useState(false);

  // Strict gating: glassmorphism only on homepage when not scrolled
  const isTransparent = isHomePage && !isScrolled;

  // Optimized RAF Scroll listener to prevent excessive layout recalculations during rapid scroll
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 50;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    // Run on initial mount
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent background scrolling while mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Smooth scroll helper with navbar offset
  const scrollToSection = (sectionId) => {
    setIsOpen(false);
    if (sectionId === 'hero') {
      if (isHomePage) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.location.href = '/';
      }
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <>
      {/* Dynamic Scroll-Reactive Glassmorphism Navbar with GPU Layering */}
      <nav
        className={`fixed w-full top-0 z-50 transform-gpu [transform:translateZ(0)] [backface-visibility:hidden] [will-change:transform,background-color] transition-all duration-300 ease-in-out ${
          isTransparent && !isOpen
            ? 'h-16 sm:h-20 bg-black/10 backdrop-blur-xl border-b border-white/5'
            : 'h-16 bg-white shadow-md border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Hans Travels Logo */}
          <Link
            href="/"
            onClick={() => {
              if (isHomePage) {
                scrollToSection('hero');
              }
            }}
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none"
            aria-label="Hans Travels Home"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden shadow-xs flex-shrink-0 transition-transform group-hover:scale-105 duration-200">
              <Image
                src="/assets/hans-logo.png"
                alt="Hans Travels Swan Logo"
                width={40}
                height={40}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span
                  className={`text-xl sm:text-2xl font-black tracking-tight uppercase font-sans transition-colors duration-300 ${
                    isTransparent && !isOpen ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  HANS
                </span>
                <span
                  className={`text-lg sm:text-xl font-bold tracking-tight uppercase font-sans transition-colors duration-300 ${
                    isTransparent && !isOpen ? 'text-white/90' : 'text-slate-700'
                  }`}
                >
                  TRAVELS
                </span>
              </div>
              <span
                className={`text-[10px] sm:text-[11px] uppercase tracking-widest font-semibold -mt-1 hidden sm:block transition-colors duration-300 ${
                  isTransparent && !isOpen ? 'text-white/70' : 'text-slate-500'
                }`}
              >
                Premium Inter-City Transit
              </span>
            </div>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-7">
            <button
              type="button"
              onClick={() => scrollToSection('hero')}
              className={`text-sm font-semibold transition-colors duration-300 py-1 cursor-pointer ${
                isTransparent
                  ? 'text-white hover:text-red-400 drop-shadow-xs'
                  : 'text-gray-900 hover:text-red-600'
              }`}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('routes')}
              className={`text-sm font-semibold transition-colors duration-300 py-1 cursor-pointer ${
                isTransparent
                  ? 'text-white hover:text-red-400 drop-shadow-xs'
                  : 'text-gray-900 hover:text-red-600'
              }`}
            >
              Popular Routes
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('fleet')}
              className={`text-sm font-semibold transition-colors duration-300 py-1 cursor-pointer ${
                isTransparent
                  ? 'text-white hover:text-red-400 drop-shadow-xs'
                  : 'text-gray-900 hover:text-red-600'
              }`}
            >
              Fleet
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('track-bus')}
              className={`text-sm font-semibold transition-colors duration-300 py-1 cursor-pointer ${
                isTransparent
                  ? 'text-white hover:text-red-400 drop-shadow-xs'
                  : 'text-gray-900 hover:text-red-600'
              }`}
            >
              Track Bus
            </button>
            <button
              type="button"
              onClick={() => onOpenManageBooking?.()}
              className={`text-sm font-semibold transition-colors duration-300 py-1 cursor-pointer ${
                isTransparent
                  ? 'text-white hover:text-red-400 drop-shadow-xs'
                  : 'text-gray-900 hover:text-red-600'
              }`}
            >
              Manage Booking
            </button>
          </div>

          {/* Right Side: Call Us & Login Buttons */}
          <div className="hidden lg:flex items-center gap-3.5">
            <a
              href="tel:+917314004000"
              className={`inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl transition-all duration-300 ${
                isTransparent
                  ? 'border border-white/30 text-white bg-transparent hover:bg-white/10 backdrop-blur-sm'
                  : 'border border-slate-200 text-slate-800 bg-slate-50 hover:bg-slate-100 hover:text-red-600'
              }`}
              title="Direct Call Helpline"
            >
              <PhoneCall className={`w-3.5 h-3.5 ${isTransparent ? 'text-white' : 'text-red-600'}`} />
              <span>Call Us</span>
            </a>

            <button
              onClick={onOpenAuth}
              type="button"
              className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 cursor-pointer shadow-xs ${
                isTransparent
                  ? 'border border-white/40 text-white bg-transparent hover:bg-white/10 backdrop-blur-sm'
                  : 'bg-red-600 hover:bg-red-700 text-white border border-red-600 shadow-red-600/20'
              }`}
            >
              <User className="w-4 h-4 text-white" />
              <span>Login</span>
            </button>
          </div>

          {/* Mobile Apple-style Two-Line Animated Toggle Button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="w-10 h-10 flex flex-col items-center justify-center space-y-1.5 focus:outline-none rounded-lg"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              <span
                className={`block w-6 h-[2px] transition-all duration-300 ease-in-out ${
                  isTransparent && !isOpen ? 'bg-white' : 'bg-gray-900'
                } ${isOpen ? 'translate-y-[4px] rotate-45' : ''}`}
              />
              <span
                className={`block w-6 h-[2px] transition-all duration-300 ease-in-out ${
                  isTransparent && !isOpen ? 'bg-white' : 'bg-gray-900'
                } ${isOpen ? '-translate-y-[4px] -rotate-45' : ''}`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Appearing on Full Screen */}
        <div
          className={`fixed left-0 right-0 top-16 bottom-0 h-[calc(100dvh-4rem)] bg-white text-gray-900 shadow-2xl z-40 md:hidden flex flex-col justify-between px-6 py-6 overflow-y-auto border-t border-gray-100 transition-all duration-300 ease-in-out ${
            isOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto visible'
              : 'opacity-0 -translate-y-4 pointer-events-none invisible'
          }`}
        >
          {/* Navigation Links */}
          <nav className="flex flex-col space-y-4 pt-2 text-left">
            <button
              type="button"
              onClick={() => scrollToSection('hero')}
              className="text-xl font-bold transition-colors text-left text-gray-900 hover:text-red-600 cursor-pointer py-1.5"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('routes')}
              className="text-xl font-bold transition-colors text-left text-gray-900 hover:text-red-600 cursor-pointer py-1.5"
            >
              Popular Routes
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('fleet')}
              className="text-xl font-bold transition-colors text-left text-gray-900 hover:text-red-600 cursor-pointer py-1.5"
            >
              Fleet
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('track-bus')}
              className="text-xl font-bold transition-colors text-left text-gray-900 hover:text-red-600 cursor-pointer py-1.5"
            >
              Track Bus
            </button>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onOpenManageBooking?.();
              }}
              className="text-xl font-bold transition-colors text-left text-gray-900 hover:text-red-600 cursor-pointer py-1.5"
            >
              Manage Booking
            </button>
          </nav>

          {/* Bottom Actions for Mobile */}
          <div className="pt-4 pb-4 flex flex-col gap-3 w-full border-t border-gray-100 mt-auto flex-shrink-0">
            <a
              href="tel:+917314004000"
              className="w-full py-3 px-4 text-center rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-gray-900 border border-slate-200 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-red-600" />
              <span>Call Us: 0731-4004000</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onOpenAuth?.();
              }}
              className="w-full py-3.5 px-4 text-center rounded-xl bg-red-600 text-white font-bold text-sm shadow-sm hover:bg-red-700 transition-colors cursor-pointer"
            >
              Login / Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Backdrop overlay covering the rest of the screen below half-height dropdown */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 top-16 bg-black/40 backdrop-blur-xs z-30 md:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}
    </>
  );
}
