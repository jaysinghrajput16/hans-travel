'use client';

import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CareerApplicationForm from '../../components/CareerApplicationForm';
import ManageBookingModal from '../../components/ManageBookingModal';
import TrackBusModal from '../../components/TrackBusModal';
import AuthModal from '../../components/AuthModal';

export default function CareersPage() {
  const [manageBookingOpen, setManageBookingOpen] = useState(false);
  const [trackBusOpen, setTrackBusOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between">
      {/* Sticky Header */}
      <Header
        onOpenManageBooking={() => setManageBookingOpen(true)}
        onOpenTrackBus={() => setTrackBusOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Main Container: Exclusively Form Submission */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="w-full max-w-3xl">
          <CareerApplicationForm />
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
