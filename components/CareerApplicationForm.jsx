'use client';

import React, { useState } from 'react';
import { CheckCircle2, UploadCloud, Send, Briefcase, User, Phone, Mail, FileText } from 'lucide-react';

const POSITIONS = [
  'Booking Executive',
  'Feedback Executive',
  'Team Leader for Feedback',
  'Tele Caller',
];

export default function CareerApplicationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: 'Booking Executive',
    experience: '1-3 Years',
    comments: '',
    resumeName: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, resumeName: file.name }));
    }
  };

  const submitApplication = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulated API submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-card p-4 sm:p-8 md:p-10 relative">
      <div className="border-b border-slate-100 pb-6 mb-8">
        <span className="text-xs uppercase tracking-widest font-black text-blue-700 bg-brand-light-blue px-3 py-1 rounded-full border border-blue-100">
          Career Application Portal
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-brand-charcoal mt-3 tracking-tight">
          Join the Hans Travels Team
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Select your position and submit your details below. Our Talent Operations team reviews applications within 48 hours.
        </p>
      </div>

      {submitted ? (
        <div className="py-12 text-center space-y-4">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto border border-blue-100">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black text-brand-charcoal">
            Application Successfully Submitted!
          </h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. We have received your application for <strong className="text-slate-900">{formData.position}</strong>. Application Reference: <span className="font-mono font-bold text-blue-700">#HANS-HR-{Math.floor(10000 + Math.random() * 90000)}</span>.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-4 px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
          >
            Submit Another Application
          </button>
        </div>
      ) : (
        <form onSubmit={submitApplication} className="space-y-6">
          
          {/* Base Fields: Full Name & Mobile Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya Singh"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-400 text-sm font-semibold"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Mobile Phone Number *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9826012345"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-400 text-sm font-semibold"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Email Address *
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="e.g. vikram.singh@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-400 text-sm font-semibold"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Position Applied For Selector (Strictly: Booking Executive, Feedback Executive, Team Leader for Feedback, Tele Caller) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Position Applied For *
              </label>
              <div className="relative">
                <select
                  required
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-400 text-sm font-bold bg-white text-slate-900 cursor-pointer appearance-none"
                >
                  {POSITIONS.map((pos) => (
                    <option key={pos} value={pos}>
                      {pos}
                    </option>
                  ))}
                </select>
                <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Relevant Experience *
              </label>
              <select
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-400 text-sm font-semibold bg-white text-slate-900 cursor-pointer"
              >
                <option value="Fresher / 0-1 Year">Fresher / 0 - 1 Year</option>
                <option value="1-3 Years">1 - 3 Years</option>
                <option value="3-5 Years">3 - 5 Years</option>
                <option value="5+ Years">5+ Years (Experienced / Lead)</option>
              </select>
            </div>
          </div>

          {/* Optional Note / Message */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Brief Introduction or Note (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Tell us about your previous customer support, ticketing, or telecalling experience..."
              value={formData.comments}
              onChange={(e) => handleInputChange('comments', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-400 text-sm font-medium resize-none"
            />
          </div>

          {/* Resume Upload Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Resume / Bio-Data Document *
            </label>
            <div className="border-2 border-dashed border-slate-200 hover:border-blue-300 rounded-2xl p-6 text-center transition-colors bg-slate-50/50">
              <input
                type="file"
                id="resume-upload"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="resume-upload" className="cursor-pointer space-y-2 block">
                <UploadCloud className="w-8 h-8 text-blue-600 mx-auto" />
                <span className="text-sm font-bold text-slate-800 block">
                  {formData.resumeName ? `Attached: ${formData.resumeName}` : 'Click to upload or drag and drop your CV'}
                </span>
                <span className="text-xs text-slate-400 block">
                  PDF, DOCX up to 10MB
                </span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-400 text-center sm:text-left">
              Hans Travels is an Equal Opportunity Employer.
            </span>

            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto px-10 py-4 bg-brand-red hover:bg-brand-red-hover active:bg-brand-red-active text-white text-base font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Transmitting...' : 'Submit Application'}</span>
            </button>
          </div>

        </form>
      )}
    </div>
  );
}
