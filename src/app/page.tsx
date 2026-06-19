import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      {/* 
        USER: Drop your Figma/Stitch Homepage UI here!
        This is where the massive SOS button and city search will go.
      */}
      
      <div className="max-w-md w-full text-center space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Medical Assist</h1>
        <p className="text-gray-600">Find verified, English-speaking clinics instantly.</p>
        
        {/* Placeholder SOS Button */}
        <Link 
          href="/sos" 
          className="block w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 px-4 rounded-xl shadow-lg text-xl"
        >
          SOS: I NEED HELP NOW
        </Link>
        
        {/* Placeholder City Navigation */}
        <Link 
          href="/providers" 
          className="block w-full bg-blue-50 text-blue-700 font-semibold py-4 px-4 rounded-xl border border-blue-200"
        >
          Browse Clinics by City
        </Link>
      </div>
    </main>
  );
}
