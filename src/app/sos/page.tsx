'use client';

import { MessageSquare, Phone, Plus } from 'lucide-react';
import Link from 'next/link';
import TriageForm from '@/components/TriageForm';

export default function SOSPage() {
  return (
    <main className="min-h-screen bg-[#F4F5F7] flex flex-col items-center justify-center p-4 relative pb-20">
      
      {/* Central Icon */}
      <div className="w-24 h-24 bg-brand-navy rounded-full flex items-center justify-center mb-8 shadow-lg">
        <Plus className="w-12 h-12 text-blue-300 stroke-[3]" />
      </div>

      <div className="text-center max-w-lg mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy tracking-tight mb-4">
          You are not alone.
        </h1>
        <p className="text-gray-500 text-lg">
          Our English and Hindi speaking concierge is standing by to assist you with any medical situation.
        </p>
      </div>

      {/* Action Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        
        {/* WhatsApp Card */}
        <a 
          href="https://wa.me/91XXXXXXXXXX?text=SOS%20Medical%20Assist:%20I%20need%20help."
          target="_blank" 
          rel="noreferrer"
          className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col justify-between min-h-[220px] active:scale-[0.98]"
        >
          <div className="w-14 h-14 bg-brand-green rounded-xl flex items-center justify-center mb-10">
            <MessageSquare className="w-7 h-7 text-white fill-white" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Message Now</p>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">WhatsApp Concierge</h2>
            <p className="text-gray-500 text-sm">Instant chat support for non-emergency coordination and guidance.</p>
          </div>
        </a>

        {/* Voice Call Card */}
        <a 
          href="tel:+91XXXXXXXXXX"
          className="bg-brand-navy rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-between min-h-[220px] active:scale-[0.98] overflow-hidden relative"
        >
          {/* Subtle background circle decoration from design */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-[0.03] rounded-full -translate-y-1/4 translate-x-1/4"></div>

          <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-10 relative z-10">
            <Phone className="w-7 h-7 text-brand-navy fill-brand-navy" />
          </div>
          <div className="relative z-10">
            <p className="text-xs font-bold text-blue-200 uppercase tracking-wider mb-2">Voice Call</p>
            <h2 className="text-2xl font-bold text-white mb-2">Call Emergency Helpline</h2>
            <p className="text-blue-100 text-sm">Immediate verbal triage with a qualified medical coordinator.</p>
          </div>
        </a>

      </div>

      {/* Triage Form Section */}
      <div className="w-full max-w-4xl mt-6 z-10">
        <TriageForm />
      </div>

      {/* Warning Footer */}
      <div className="absolute bottom-0 left-0 w-full bg-gray-100/80 border-t border-gray-200 p-4 text-center">
        <p className="text-sm text-gray-600 font-medium flex items-center justify-center">
          <span className="text-brand-red mr-2 text-lg">⚠️</span> 
          For life-threatening emergencies, dial <span className="text-brand-red font-bold mx-1">112</span> immediately.
        </p>
      </div>

    </main>
  );
}
