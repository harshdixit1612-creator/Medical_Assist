import { getProviders } from '@/lib/api';
import { ShieldCheck, MapPin, LayoutGrid, Map as MapIcon } from 'lucide-react';

export default async function ProvidersListPage(props: {
  searchParams: Promise<{ city?: string; specialty?: string }>;
}) {
  const searchParams = await props.searchParams;
  const providers = await getProviders(searchParams);
  const city = searchParams.city || 'all locations';

  return (
    <main className="min-h-screen bg-[#F8F9FB] p-4 md:p-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Left Sidebar: Filters */}
        <div className="w-full md:w-64 shrink-0 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="font-bold text-brand-navy text-xl mb-6">Filters</h2>
            
            <div className="space-y-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-brand-navy focus:ring-brand-navy" />
                <span className="text-gray-700 font-medium">Open Now</span>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer bg-blue-50/50 p-2 -ml-2 rounded-lg">
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-brand-navy focus:ring-brand-navy" />
                <span className="text-gray-900 font-bold">NABH Verified</span>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-brand-navy focus:ring-brand-navy" />
                <span className="text-gray-700 font-medium">English Speaking</span>
              </label>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Provider Type</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 bg-brand-navy text-white rounded-xl font-medium flex justify-between items-center">
                  Hospitals
                  <ShieldCheck className="w-4 h-4 text-blue-300" />
                </button>
                <button className="w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors">
                  Clinics
                </button>
              </div>
            </div>
          </div>

          <div className="bg-brand-navy p-6 rounded-2xl shadow-lg text-white">
            <ShieldCheck className="w-8 h-8 mb-4 text-blue-300" />
            <h3 className="font-bold text-lg mb-2">Verified Quality</h3>
            <p className="text-sm text-blue-100">All NABH hospitals follow strict international standards for clinical safety.</p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Providers in {city}</h1>
              <p className="text-gray-500 mt-1">Showing verified medical facilities nearby</p>
            </div>
            
            <div className="flex bg-gray-200/50 p-1 rounded-xl mt-4 sm:mt-0">
              <button className="flex items-center space-x-2 bg-brand-navy text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm">
                <LayoutGrid className="w-4 h-4" />
                <span>List</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <MapIcon className="w-4 h-4" />
                <span>Map View</span>
              </button>
            </div>
          </div>

          {/* Grid of Providers */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {providers.length === 0 ? (
              <div className="col-span-full p-8 text-center bg-white rounded-2xl border border-gray-100">
                <p className="text-gray-500 text-lg">No providers found. Ensure you have added mock data to your Supabase `providers` table.</p>
              </div>
            ) : (
              providers.map((provider) => (
                <div key={provider.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                  {/* Image Placeholder */}
                  <div className="h-48 bg-gray-200 relative">
                    <div className="absolute top-4 left-4 bg-brand-navy text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center shadow-md">
                      <ShieldCheck className="w-3.5 h-3.5 mr-1 text-blue-300" />
                      NABH Verified
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xl font-bold text-gray-900">{provider.name}</h2>
                      <div className="flex items-center text-gray-500 text-sm font-medium">
                        <MapPin className="w-3.5 h-3.5 mr-1" />
                        1.2 km
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mb-6">
                      {(provider.languages_spoken?.length ? provider.languages_spoken : ['English', 'Hindi']).map(lang => (
                        <span key={lang} className="bg-blue-50 text-brand-navy text-xs font-medium px-2.5 py-1 rounded-md">
                          {lang}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-600 font-medium">
                        Consultation: <span className="font-bold text-gray-900">₹{provider.fee_range_min || 500} - ₹{provider.fee_range_max || 1000}</span>
                      </p>
                      <a href={`/providers/${provider.city}/${provider.slug}`} className="bg-brand-navy hover:bg-blue-900 text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors">
                        Book Visit
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
