'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ManageBookingModal from '../../components/ManageBookingModal';
import TrackBusModal from '../../components/TrackBusModal';
import AuthModal from '../../components/AuthModal';
import {
  Shield,
  Lock,
  Eye,
  FileText,
  Server,
  UserCheck,
  Scale,
  Mail,
  ExternalLink,
  Printer,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function PrivacyPolicyPage() {
  const [manageBookingOpen, setManageBookingOpen] = useState(false);
  const [trackBusOpen, setTrackBusOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  const navItems = [
    { id: 'overview', label: '1. Policy Scope & Legal Framework' },
    { id: 'collection', label: '2. Collection of Information' },
    { id: 'usage', label: '3. Use of Personal Information' },
    { id: 'disclosure', label: '4. Disclosure & Third Parties' },
    { id: 'security', label: '5. Security & Data Retention' },
    { id: 'rights', label: '6. Your Rights & Consent' },
    { id: 'governing-law', label: '7. Policy Changes & Governing Law' },
    { id: 'platform-provider', label: '8. Technology Platform Policy' },
  ];

  const scrollTo = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col selection:bg-red-500 selection:text-white">
      {/* Global Header */}
      <Header
        onOpenManageBooking={() => setManageBookingOpen(true)}
        onOpenTrackBus={() => setTrackBusOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold uppercase tracking-wider text-red-400">
                <Shield className="w-3.5 h-3.5" />
                <span>Data Protection & Privacy</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                Privacy Policy
              </h1>
              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                Hans Travels Pvt. Ltd. is dedicated to safeguarding your personal data and ensuring compliance with the Information Technology Act, 2000 and the Indian Contract Act, 1872.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-red-400" />
                  Official Corporate Privacy Undertaking
                </span>
                <span>•</span>
                <span>Hans Travels Pvt. Ltd.</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 backdrop-blur-sm transition-all cursor-pointer hover:shadow-md"
              >
                <Printer className="w-4 h-4" />
                <span>Print Policy</span>
              </button>
              <Link
                href="/terms-and-conditions"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-md hover:shadow-red-600/30 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Terms & Conditions</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sticky Navigation Menu */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white rounded-2xl p-4 shadow-soft border border-slate-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 pb-2 border-b border-slate-100">
                  Contents
                </h3>
                <nav className="mt-2 space-y-1">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollTo(item.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                        activeSection === item.id
                          ? 'bg-red-50 text-red-700 font-bold border border-red-100 shadow-xs'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span className="truncate">{item.label}</span>
                      <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 ${activeSection === item.id ? 'text-red-600' : 'text-slate-400'}`} />
                    </button>
                  ))}
                </nav>
              </div>

              {/* Contact Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-5 border border-slate-800 shadow-soft space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-red-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Privacy Inquiries
                  </h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  For data requests, corrections, or withdrawal of consent, reach out to our privacy office:
                </p>
                <a
                  href="mailto:info@hanstravel.in"
                  className="inline-flex items-center gap-2 text-xs font-bold text-red-400 hover:text-red-300 transition-colors pt-1"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>info@hanstravel.in</span>
                </a>
              </div>
            </div>
          </aside>

          {/* Right Main Content */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-8">

            {/* SECTION 1: OVERVIEW & SCOPE */}
            <section
              id="overview"
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-soft border border-slate-200 space-y-4"
            >
              <div className="border-b border-slate-100 pb-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                  <Scale className="w-3.5 h-3.5" />
                  <span>Section 1</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Policy Scope & Legal Framework
                </h2>
              </div>

              <div className="text-sm text-slate-700 leading-relaxed space-y-3">
                <p className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-800">
                  This privacy policy (&quot;Policy&quot;) applies to the collection, use, and disclosure of personal information by <strong>Hans Travels Pvt. Ltd.</strong> (&quot;Company&quot;), a company organized under the laws of India, pursuant to the <strong>Information Technology Act, 2000</strong> and the <strong>Indian Contract Act, 1872</strong>.
                </p>
              </div>
            </section>

            {/* SECTION 2: COLLECTION OF PERSONAL INFORMATION */}
            <section
              id="collection"
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-soft border border-slate-200 space-y-5"
            >
              <div className="border-b border-slate-100 pb-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Section 2</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Collection of Personal Information
                </h2>
              </div>

              <div className="text-sm text-slate-700 leading-relaxed space-y-4">
                <p>
                  The Company may collect personal information from you, including but not limited to your name, address, email address, telephone number, and any other information that may be required to provide the services you have requested.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-xs uppercase tracking-wider">
                      <UserCheck className="w-4 h-4 text-red-600" />
                      <span>Personal Information</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Name, residential or billing address, email address, telephone/mobile number, and identity verification credentials required for passenger ticketing.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-xs uppercase tracking-wider">
                      <Server className="w-4 h-4 text-blue-600" />
                      <span>Non-Personal Information</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      IP address, browser type, device identifiers, and operating system collected for diagnostics and continuous service improvements.
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-600">
                  The Company may also collect non-personal information, such as your IP address, browser type, and operating system, for the purpose of improving the services provided to you.
                </p>
              </div>
            </section>

            {/* SECTION 3: USE OF PERSONAL INFORMATION */}
            <section
              id="usage"
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-soft border border-slate-200 space-y-5"
            >
              <div className="border-b border-slate-100 pb-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Section 3</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Use of Personal Information
                </h2>
              </div>

              <div className="text-sm text-slate-700 leading-relaxed space-y-3">
                <p>The Company may use your personal information for the following purposes:</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block text-xs uppercase tracking-wider">Service Delivery</strong>
                      <span className="text-xs text-slate-600">To provide you with the services you have requested, including seat reservation, ticket issuance, and transit management.</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block text-xs uppercase tracking-wider">Communication</strong>
                      <span className="text-xs text-slate-600">To communicate with you regarding your account, trip updates, boarding reminders, and the services provided by the Company.</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block text-xs uppercase tracking-wider">Service Enhancement</strong>
                      <span className="text-xs text-slate-600">To analyze booking patterns, customer feedback, and technical metrics to improve the services provided by the Company.</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block text-xs uppercase tracking-wider">Legal Compliance</strong>
                      <span className="text-xs text-slate-600">To comply with legal, regulatory, and taxation obligations mandated by statutory Indian authorities.</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: DISCLOSURE OF PERSONAL INFORMATION */}
            <section
              id="disclosure"
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-soft border border-slate-200 space-y-5"
            >
              <div className="border-b border-slate-100 pb-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Section 4</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Disclosure of Personal Information
                </h2>
              </div>

              <div className="text-sm text-slate-700 leading-relaxed space-y-4">
                <p>
                  The Company may disclose your personal information to third-party service providers who perform services on behalf of the Company, such as payment processing, data analysis, and customer support. The Company will only disclose your personal information to third parties who have agreed to protect the confidentiality and security of your personal information.
                </p>

                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-700" />
                    <span>Legal & Protection Disclosures:</span>
                  </div>
                  <p className="leading-relaxed">
                    The Company may also disclose your personal information if required by law or if the Company believes in good faith that such disclosure is necessary to protect its rights or property, or the safety of others.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 5: SECURITY & RETENTION */}
            <section
              id="security"
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-soft border border-slate-200 space-y-5"
            >
              <div className="border-b border-slate-100 pb-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Section 5</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Security & Retention of Personal Information
                </h2>
              </div>

              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1.5">Security Safeguards:</h3>
                  <p>
                    The Company takes reasonable steps to protect your personal information from unauthorized access, use, or disclosure. The Company uses industry-standard security measures, such as firewalls and encryption, to protect your personal information.
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm mb-1.5">Data Retention:</h3>
                  <p>
                    The Company will retain your personal information for as long as necessary to provide the services you have requested or as required by law.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 6: YOUR RIGHTS */}
            <section
              id="rights"
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-soft border border-slate-200 space-y-5"
            >
              <div className="border-b border-slate-100 pb-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Section 6</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Your Rights
                </h2>
              </div>

              <div className="text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  You have the right to access, correct, or delete your personal information held by the Company. You also have the right to withdraw your consent to the collection and use of your personal information at any time.
                </p>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Exercise Your Privacy Rights:</span>
                    <span className="text-xs text-slate-600">To exercise these rights, please contact the Company directly.</span>
                  </div>
                  <a
                    href="mailto:info@hanstravel.in"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all flex-shrink-0"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>info@hanstravel.in</span>
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 7: CHANGES & GOVERNING LAW */}
            <section
              id="governing-law"
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-soft border border-slate-200 space-y-5"
            >
              <div className="border-b border-slate-100 pb-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                  <Scale className="w-3.5 h-3.5" />
                  <span>Section 7</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Changes to this Policy & Governing Law
                </h2>
              </div>

              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1.5">Changes to this Privacy Policy:</h3>
                  <p>
                    The Company may update this Privacy Policy from time to time to reflect changes in its information practices. If the Company makes any material changes to this Privacy Policy, it will notify you by email or by posting a notice on the Company&apos;s website i.e.{' '}
                    <a
                      href="https://www.hanstravel.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 hover:text-red-700 font-semibold underline"
                    >
                      https://www.hanstravel.in/
                    </a>.
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm mb-1.5">Governing Law:</h3>
                  <p>
                    This Privacy Policy is governed by and construed in accordance with the laws of India. Any disputes arising under or in connection with this Privacy Policy shall be resolved in accordance with the dispute resolution mechanisms set out in the <strong>Indian Contract Act, 1872</strong>.
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm mb-1.5">Contact Information:</h3>
                  <p>
                    If you have any questions or concerns about this Privacy Policy, please contact the Company at{' '}
                    <a
                      href="mailto:info@hanstravel.in"
                      className="text-red-600 hover:text-red-700 font-semibold underline"
                    >
                      info@hanstravel.in
                    </a>.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 8: TECHNOLOGY PLATFORM PROVIDER POLICY */}
            <section
              id="platform-provider"
              className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-800 space-y-4"
            >
              <div className="border-b border-slate-800 pb-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 uppercase tracking-wider mb-1">
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Technology Partner</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Technology Platform Provider Policy
                </h2>
              </div>

              <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                <p>
                  To access the privacy policy of our technology platform provider <strong>Maventech labs Private Limited</strong>, please visit the following link:
                </p>

                <div className="pt-1">
                  <a
                    href="http://buscrs.com/privacy_policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <span>Maventech Labs Privacy Policy (buscrs.com)</span>
                    <ExternalLink className="w-4 h-4 text-red-400" />
                  </a>
                </div>
              </div>
            </section>

          </main>

        </div>
      </div>

      {/* Global Footer */}
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
