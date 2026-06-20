import { getProviderBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ShieldCheck, MapPin, Languages, Stethoscope, Clock, Banknote, Phone, MessageSquare, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata(props: { 
  params: Promise<{ slug: string; city: string }> 
}): Promise<Metadata> {
  const params = await props.params;
  const provider = await getProviderBySlug(params.slug);
  
  if (!provider) return { title: 'Provider Not Found' };
  
  return {
    title: `${provider.name} | English Speaking ${provider.type} in ${params.city}`,
    description: provider.description || `Find trusted medical assistance at ${provider.name} in ${params.city}.`,
  };
}

export default async function ProviderProfilePage(props: {
  params: Promise<{ slug: string; city: string }>;
}) {
  const params = await props.params;
  const provider = await getProviderBySlug(params.slug);

  if (!provider) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F8F9FB] pb-20">
      
      {/* Hero Header */}
      <div className="bg-brand-navy text-white pt-12 pb-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-[0.03] rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <Link href={`/providers?city=${encodeURIComponent(provider.city)}`} className="text-blue-300 hover:text-white text-sm font-medium mb-6 inline-flex items-center">
            &larr; Back to {provider.city} Providers
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="uppercase tracking-wider text-xs font-bold text-blue-200 bg-blue-900/50 px-3 py-1 rounded-full">
                  {provider.type}
                </span>
                {provider.is_verified && (
                  <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs font-bold flex items-center border border-green-500/30">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                    Verified Partner
                  </span>
                )}
                {provider.fee_range_min === 0 && (
                  <span className="bg-green-600/90 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-sm">
                    ⚕️ Govt Facility (Affordable Care)
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-2">{provider.name}</h1>
              <p className="text-blue-100 flex items-center text-lg">
                <MapPin className="w-5 h-5 mr-2" />
                {provider.city}, India
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center min-w-[200px]">
              <p className="text-xs text-blue-200 uppercase font-bold tracking-wider mb-1">Consultation Fee</p>
              <div className="text-2xl font-bold flex items-center justify-center">
                <Banknote className="w-6 h-6 mr-2 text-green-400" />
                ₹{provider.fee_range_min} - ₹{provider.fee_range_max}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Left Column: Details */}
          <div className="md:col-span-2 space-y-6">
            
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-brand-navy mb-6 border-b pb-4">Facility Details</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
                    <Languages className="w-4 h-4 mr-2" /> Languages
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {provider.languages_spoken.map((lang) => (
                      <span key={lang} className="bg-blue-50 text-brand-navy font-semibold px-3 py-1.5 rounded-lg text-sm">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
                    <Stethoscope className="w-4 h-4 mr-2" /> Specialties
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {provider.specialties.map((spec) => (
                      <span key={spec} className="bg-gray-100 text-gray-700 font-medium px-3 py-1.5 rounded-lg text-sm">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="sm:col-span-2">
                   <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
                    <Clock className="w-4 h-4 mr-2" /> Operating Hours
                  </h3>
                  <div className="flex items-center">
                    {provider.open_24_7 ? (
                      <span className="bg-green-100 text-brand-green font-bold px-4 py-2 rounded-xl flex items-center">
                        <span className="w-2.5 h-2.5 bg-brand-green rounded-full mr-2 animate-pulse"></span>
                        Open 24/7 (Emergency Ready)
                      </span>
                    ) : (
                      <span className="bg-orange-50 text-orange-700 font-bold px-4 py-2 rounded-xl">
                        Standard Hours (Call to confirm)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section Placeholder */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
               <h2 className="text-xl font-bold text-brand-navy mb-6">Patient Reviews</h2>
               <div className="text-center py-8 text-gray-500">
                 <p>Reviews coming soon.</p>
               </div>
            </div>

          </div>

          {/* Right Column: Action Cards */}
          <div className="space-y-6">
            
            <div className="bg-brand-navy rounded-2xl p-6 text-white shadow-lg sticky top-6">
              <h3 className="font-bold text-xl mb-2">Need Help Booking?</h3>
              <p className="text-sm text-blue-200 mb-6">Our English-speaking concierge will coordinate your visit to ensure fair pricing and skip the queue.</p>
              
              <div className="space-y-3">
                <a 
                  href={`https://wa.me/91XXXXXXXXXX?text=Hi, I need to book a visit at ${provider.name} in ${provider.city}.`}
                  target="_blank" rel="noreferrer"
                  className="w-full bg-[#25D366] hover:bg-green-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-center transition-colors"
                >
                  <MessageSquare className="w-5 h-5 mr-2" /> WhatsApp Concierge
                </a>
                
                <a 
                  href={`tel:${provider.phone}`}
                  className="w-full bg-white text-brand-navy hover:bg-gray-100 font-bold py-3.5 rounded-xl flex items-center justify-center transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2" /> Call Hospital Directly
                </a>
              </div>
              
              <hr className="border-blue-800 my-6" />
              
              <Link 
                href="/sos"
                className="w-full bg-brand-red hover:bg-red-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center transition-colors shadow-sm"
              >
                <AlertCircle className="w-5 h-5 mr-2" /> Request SOS Transfer
              </Link>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}
