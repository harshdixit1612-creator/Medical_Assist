import { getProviders } from '@/lib/api';

export default async function ProvidersListPage({
  searchParams,
}: {
  searchParams: { city?: string; specialty?: string };
}) {
  // This automatically fetches data from your database!
  const providers = await getProviders(searchParams);

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      {/* USER: Drop your Figma/Stitch List/Map UI here! */}
      
      <div className="max-w-2xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">
          {searchParams.city ? `Clinics in ${searchParams.city}` : 'All Clinics'}
        </h1>
        
        {providers.length === 0 ? (
          <p className="text-gray-500">No providers found matching your criteria.</p>
        ) : (
          <div className="grid gap-4">
            {providers.map((provider) => (
              <a 
                key={provider.id} 
                href={`/providers/${provider.city}/${provider.slug}`}
                className="block bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">{provider.name}</h2>
                    <p className="text-sm text-gray-500 capitalize">{provider.type}</p>
                  </div>
                  {provider.is_verified && (
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      Verified
                    </span>
                  )}
                </div>
                {/* Add more provider details here based on your UI design */}
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
