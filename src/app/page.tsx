'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getProviders, Provider } from '@/lib/api';
import { Star, ShieldCheck, Banknote, MapPin, Search, ChevronRight, Activity, CircleAlert } from 'lucide-react';
import MapComponent from '@/components/DynamicMap';

export default function HomePage() {
  const router = useRouter();
  const [city, setCity] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    getProviders().then(setProviders);
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    let url = `/providers?`;
    if (city) url += `city=${encodeURIComponent(city)}&`;
    if (specialty) url += `specialty=${encodeURIComponent(specialty)}&`;
    router.push(url.replace(/&$/, '') || '/providers');
  };

  return (
    <main className="min-h-screen bg-[#F8F9FB] pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20">
        
        {/* Top Section: Hero + Search */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          
          {/* Left: Hero & SOS */}
          <div className="space-y-8">
            <div>
              <span className="bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center w-fit mb-6">
                <ShieldCheck className="w-3 h-3 mr-1" />
                Trusted Local Medical Support
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
                Immediate Medical Help in India
              </h1>
              <p className="text-lg text-gray-600 max-w-lg">
                Connect with emergency services or verified local doctors instantly. Empathetic care designed for clarity and speed.
              </p>
            </div>

            <Link href="/sos" className="inline-block group relative">
              <div className="w-48 h-48 bg-brand-navy rounded-full flex flex-col items-center justify-center text-white shadow-xl group-hover:scale-105 transition-transform duration-300">
                <Activity className="w-16 h-16 text-blue-300 mb-2" />
                <span className="text-3xl font-black tracking-widest">SOS</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-200 mt-2">Tap For Emergency</span>
              </div>
              <div className="absolute inset-0 bg-brand-navy rounded-full opacity-20 group-hover:animate-ping -z-10"></div>
            </Link>
          </div>

          {/* Right: Search Card */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-brand-navy font-bold text-lg mb-6">Find Verified Doctors</h2>
            
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input 
                  type="text" 
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  placeholder="Specialty (e.g. Cardiologist, GP)"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-navy focus:border-brand-navy outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-navy">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <select 
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-navy outline-none appearance-none bg-white text-sm"
                    >
                      <option value="">Select City</option>
                      <option value="Ranchi">Ranchi</option>
                      <option value="New Delhi">New Delhi</option>
                      <option value="Goa">Goa</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Bangalore">Bangalore</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-navy">Language</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-xs font-bold text-gray-400">文A</span>
                    <select className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-navy outline-none appearance-none bg-white text-sm">
                      <option>English Speaking Only</option>
                    </select>
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-brand-navy hover:bg-blue-900 text-white font-bold py-4 rounded-xl flex items-center justify-center transition-colors mt-2"
              >
                Search Verified Specialists <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            </form>

            <div className="mt-6">
              <p className="text-xs font-bold text-gray-500 mb-3">Popular Specialists Near You</p>
              <div className="flex flex-wrap gap-2">
                {['Pediatrician', 'Dentist', 'Dermatologist', 'Orthopedic'].map(tag => (
                  <span key={tag} className="bg-blue-50 text-brand-blue text-xs font-bold px-3 py-1.5 rounded-full cursor-pointer hover:bg-blue-100 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-start space-x-4 shadow-sm">
            <div className="bg-blue-50 p-3 rounded-full"><ShieldCheck className="w-6 h-6 text-brand-blue" /></div>
            <div>
              <h3 className="font-bold text-gray-900">100% NABH Verified</h3>
              <p className="text-sm text-gray-500">Accredited clinics and hospitals only.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-start space-x-4 shadow-sm">
            <div className="bg-blue-50 p-3 rounded-full"><Banknote className="w-6 h-6 text-brand-blue" /></div>
            <div>
              <h3 className="font-bold text-gray-900">Transparent Pricing (₹)</h3>
              <p className="text-sm text-gray-500">No hidden fees. Upfront local rates.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-start space-x-4 shadow-sm">
            <div className="bg-blue-50 p-3 rounded-full"><CircleAlert className="w-6 h-6 text-brand-blue" /></div>
            <div>
              <h3 className="font-bold text-gray-900">24/7 Multilingual Helpline</h3>
              <p className="text-sm text-gray-500">Call anytime for medical navigation.</p>
            </div>
          </div>
        </div>

        {/* Bottom Section: Map & Hubs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Interactive Map */}
          <div className="lg:col-span-2 bg-[#4fb4cb] rounded-3xl h-[400px] relative overflow-hidden shadow-sm z-0">
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-brand-navy shadow-sm flex items-center z-10">
              <span className="w-2 h-2 bg-brand-green rounded-full mr-2"></span>
              {providers.length} Specialists near you
            </div>
            <MapComponent providers={providers} />
          </div>

          {/* Hubs List */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
            <h2 className="text-xl font-bold text-brand-navy mb-4">Emergency Hubs</h2>
            <div className="space-y-3 flex-1">
              {[
                { name: 'Apollo Hospital', dist: '1.2 km away', type: '24/7 ER' },
                { name: 'Max Healthcare', dist: '2.5 km away', type: 'Pediatric Care' },
                { name: 'Fortis Memorial', dist: '3.8 km away', type: 'Specialists' }
              ].map((hub, i) => (
                <div key={i} className="p-4 border border-gray-100 rounded-xl hover:border-brand-navy/30 cursor-pointer transition-colors flex justify-between items-center group">
                  <div>
                    <h3 className="font-bold text-gray-900">{hub.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{hub.dist} • {hub.type}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-brand-navy transition-colors" />
                </div>
              ))}
            </div>
            <button className="w-full mt-4 border border-brand-navy text-brand-navy font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors">
              View All Facilities
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}
