'use client';

import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import QuickCancel from '../../components/QuickCancel';
import ManageBookingModal from '../../components/ManageBookingModal';
import TrackBusModal from '../../components/TrackBusModal';
import AuthModal from '../../components/AuthModal';

export default function QuickCancelPage() {
  const [manageBookingOpen, setManageBookingOpen] = useState(false);
  const [trackBusOpen, setTrackBusOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F4F9FF] flex flex-col justify-between">
      {/* Sticky Header */}
      <Header
        onOpenManageBooking={() => setManageBookingOpen(true)}
        onOpenTrackBus={() => setTrackBusOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Main Container: Centered 2-Step Quick Cancel Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-28 sm:py-36">
        <div className="w-full max-w-md">
          <QuickCancel />
        </div>
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
