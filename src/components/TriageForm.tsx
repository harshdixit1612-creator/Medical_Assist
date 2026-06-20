'use client';

import { useState } from 'react';
import { submitTriageCase } from '@/lib/api';
import { MapPin, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export default function TriageForm() {
  const [symptoms, setSymptoms] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locating, setLocating] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleGetLocation = () => {
    setLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setLocating(false);
        },
        (err) => {
          setError('Could not access location. Please describe it in the text box.');
          setLocating(false);
        }
      );
    } else {
      setLocating(false);
      setError('Geolocation is not supported by your browser.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) {
      setError('Please describe your emergency or symptoms.');
      return;
    }
    
    setSubmitting(true);
    setError('');
    
    // Quick format: appending phone to symptoms for MVP since phone isn't in triage_cases schema yet
    // Alternatively, we just use symptoms_text to store all text data
    const payload = `PHONE: ${phone}\nSYMPTOMS: ${symptoms}`;
    
    const result = await submitTriageCase(payload, location?.lat, location?.lng);
    
    if (result) {
      setSuccess(true);
    } else {
      setError('Failed to submit. Please use the WhatsApp or Call button directly.');
    }
    setSubmitting(false);
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center shadow-sm">
        <CheckCircle2 className="w-12 h-12 text-brand-green mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Help Request Received</h3>
        <p className="text-gray-600">
          Our concierge team has received your details and will contact you immediately at the provided number.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="flex items-center mb-6">
        <AlertCircle className="w-5 h-5 text-brand-red mr-2" />
        <h2 className="text-xl font-bold text-gray-900">Request Immediate Assistance</h2>
      </div>

      {error && (
        <div className="bg-red-50 text-brand-red text-sm p-3 rounded-lg mb-4 font-medium border border-red-100">
          {error}
        </div>
      )}

      <div className="space-y-4 flex-1">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Your Symptoms / Situation</label>
          <textarea 
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="E.g. Severe stomach pain, feeling dizzy..."
            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-navy outline-none min-h-[100px] resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp / Contact Number</label>
          <input 
            type="tel" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91..."
            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-navy outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Your Location</label>
          <button 
            type="button"
            onClick={handleGetLocation}
            className={`w-full p-3 border rounded-xl flex items-center justify-center font-medium transition-colors ${
              location 
                ? 'bg-green-50 border-green-200 text-brand-green' 
                : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
            }`}
          >
            {locating ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Locating...</>
            ) : location ? (
              <><CheckCircle2 className="w-4 h-4 mr-2" /> Location Captured</>
            ) : (
              <><MapPin className="w-4 h-4 mr-2" /> Use Current Location</>
            )}
          </button>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={submitting}
        className="w-full bg-brand-red hover:bg-red-700 text-white font-bold py-4 rounded-xl mt-6 transition-colors flex items-center justify-center disabled:opacity-70"
      >
        {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send Request to Concierge'}
      </button>
    </form>
  );
}
