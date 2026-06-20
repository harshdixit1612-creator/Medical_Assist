import { getProviders } from '@/lib/api';
import { ShieldCheck, MapPin, LayoutGrid, Map as MapIcon } from 'lucide-react';
import Link from 'next/link';
import MapComponent from '@/components/DynamicMap';

export default async function ProvidersListPage(props: {
  searchParams: Promise<{ city?: string; specialty?: string; affordable?: string; view?: string }>;
}) {
  const searchParams = await props.searchParams;
  const city = searchParams.city || 'all locations';
  
  // Filter providers based on URL params
  let providers = await getProviders(searchParams);
  if (searchParams.affordable === 'true') {
    providers = providers.filter(p => p.fee_range_min === 0);
  }

  // Helper to construct filter URLs
  const createFilterUrl = (key: string, value: string) => {
    const params = new URLSearchParams();
    if (searchParams.city) params.set('city', searchParams.city);
    if (searchParams.specialty) params.set('specialty', searchParams.specialty);
    if (searchParams.affordable && key !== 'affordable') params.set('affordable', searchParams.affordable);
    
    // Toggle logic
    if (searchParams[key as keyof typeof searchParams] !== value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    return `/providers?${params.toString()}`;
  };

  const isAffordable = searchParams.affordable === 'true';
  const isMapView = searchParams.view === 'map';

  // Helper to construct view URLs
  const createViewUrl = (viewParam: string) => {
    const params = new URLSearchParams();
    if (searchParams.city) params.set('city', searchParams.city);
    if (searchParams.specialty) params.set('specialty', searchParams.specialty);
    if (searchParams.affordable) params.set('affordable', searchParams.affordable);
    if (viewParam === 'map') params.set('view', 'map');
    return `/providers?${params.toString()}`;
  };

  return (
    <main className="min-h-screen bg-[#F8F9FB] p-4 md:p-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Left Sidebar: Filters */}
        <div className="w-full md:w-64 shrink-0 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="font-bold text-brand-navy text-xl mb-6">Filters</h2>
            
            <div className="space-y-4">
              <Link href={createFilterUrl('affordable', 'true')} className={`flex items-center space-x-3 cursor-pointer p-2 -ml-2 rounded-lg transition-colors ${isAffordable ? 'bg-green-50' : 'hover:bg-gray-50'}`}>
                <div className={`w-5 h-5 rounded border flex items-center justify-center ${isAffordable ? 'bg-green-600 border-green-600' : 'border-gray-300'}`}>
                  {isAffordable && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                </div>
                <span className={`font-bold ${isAffordable ? 'text-green-800' : 'text-gray-700'}`}>Govt & Affordable Care</span>
              </Link>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-brand-navy focus:ring-brand-navy" />
                <span className="text-gray-700 font-medium">Open Now</span>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-brand-navy focus:ring-brand-navy" />
                <span className="text-gray-900 font-bold">NABH Verified</span>
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
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                {searchParams.specialty ? `${searchParams.specialty} Providers` : 'Providers'} in {city}
              </h1>
              <p className="text-gray-500 mt-1">Showing verified medical facilities nearby</p>
            </div>
            
            <div className="flex bg-gray-200/50 p-1 rounded-xl mt-4 sm:mt-0">
              <Link 
                href={createViewUrl('list')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${!isMapView ? 'bg-brand-navy text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span>List</span>
              </Link>
              <Link 
                href={createViewUrl('map')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isMapView ? 'bg-brand-navy text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <MapIcon className="w-4 h-4" />
                <span>Map View</span>
              </Link>
            </div>
          </div>

          {/* Main Content: Map or Grid */}
          {isMapView ? (
            <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 h-[600px] w-full">
              {providers.length > 0 ? (
                <MapComponent providers={providers} />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-gray-500 text-lg">No providers found for this map.</p>
                </div>
              )}
            </div>
          ) : (
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
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {provider.is_verified && (
                          <div className="bg-brand-navy text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center shadow-md">
                            <ShieldCheck className="w-3.5 h-3.5 mr-1 text-blue-300" />
                            NABH Verified
                          </div>
                        )}
                        {provider.fee_range_min === 0 && (
                          <div className="bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center shadow-md">
                            ⚕️ Govt Facility (Affordable)
                          </div>
                        )}
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
                      
                      <div className="mt-auto">
                        <Link href={`/providers/${encodeURIComponent(provider.city)}/${provider.slug}`} className="block w-full text-center bg-brand-navy text-white font-bold py-3 rounded-xl hover:bg-blue-900 transition-colors">
                          Book Visit
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
