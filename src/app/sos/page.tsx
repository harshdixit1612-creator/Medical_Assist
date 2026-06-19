"use client";

export default function SOSPage() {
  return (
    <main className="min-h-screen bg-red-50 flex flex-col items-center justify-center p-4">
      {/* 
        USER: Drop your Figma/Stitch SOS UI here!
        This page should be entirely focused on immediate contact.
      */}
      
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl text-center space-y-6 border border-red-100">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
        </div>
        
        <h1 className="text-3xl font-black text-gray-900">Need Medical Help?</h1>
        <p className="text-gray-600">You are not alone. Our English-speaking concierge will connect you with a verified doctor right now.</p>
        
        <div className="pt-4 space-y-4">
          <a 
            href="https://wa.me/91XXXXXXXXXX?text=SOS%20Medical%20Assist:%20I%20need%20urgent%20help."
            className="block w-full bg-[#25D366] hover:bg-[#20b858] text-white font-bold py-4 px-4 rounded-xl shadow-lg transition-transform active:scale-95"
          >
            WhatsApp Now
          </a>
          
          <a 
            href="tel:+91XXXXXXXXXX"
            className="block w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-4 rounded-xl shadow-lg transition-transform active:scale-95"
          >
            Call Us
          </a>
        </div>
        
        <p className="text-xs text-gray-400 mt-6">
          For absolute life-threatening emergencies, please dial the local emergency number (112 in India).
        </p>
      </div>
    </main>
  );
}
