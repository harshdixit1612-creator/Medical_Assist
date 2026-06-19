import { getProviderBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

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
    <main className="min-h-screen bg-white">
      {/* 
        USER: Drop your Figma/Stitch Provider Profile UI here!
        This is the SEO critical page.
      */}
      
      <div className="max-w-3xl mx-auto p-4 space-y-6">
        <header className="border-b pb-6">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-900">{provider.name}</h1>
            {provider.is_verified && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                Verified by Team
              </span>
            )}
          </div>
          <p className="text-gray-500 mt-2 capitalize">{provider.type} • {provider.city}</p>
        </header>

        <section className="bg-blue-50 p-6 rounded-xl">
          <h2 className="font-semibold text-blue-900 mb-2">24/7 Helpline & Concierge</h2>
          <p className="text-sm text-blue-800 mb-4">Need help talking to this clinic? We are standing by.</p>
          <div className="flex space-x-4">
            <a href="tel:+91XXXXXXXXXX" className="flex-1 bg-white text-center py-3 rounded-lg font-bold text-gray-900 shadow-sm">
              Call Now
            </a>
            <a href="https://wa.me/91XXXXXXXXXX" className="flex-1 bg-[#25D366] text-center py-3 rounded-lg font-bold text-white shadow-sm">
              WhatsApp
            </a>
          </div>
        </section>

        {/* You can add Map, Reviews, Pricing benchmarks down here based on your UI */}
        
      </div>
    </main>
  );
}
