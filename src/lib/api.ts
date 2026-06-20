import { supabase } from './supabase';

export type Provider = {
  id: string;
  name: string;
  slug: string;
  type: 'hospital' | 'clinic' | 'pharmacy';
  city: string;
  lat: number;
  lng: number;
  languages_spoken: string[];
  specialties: string[];
  is_verified: boolean;
  phone: string;
  fee_range_min: number;
  fee_range_max: number;
  open_24_7: boolean;
  photo_url: string | null;
  description: string | null;
};

// 1. Fetch a list of providers (for the map/list page)
export async function getProviders(filters?: {
  city?: string;
  specialty?: string;
  language?: string;
  openNow?: boolean;
}) {
  let query = supabase.from('providers').select('*');

  if (filters?.city) {
    query = query.ilike('city', `%${filters.city}%`);
  }
  
  if (filters?.language) {
    query = query.contains('languages_spoken', [filters.language]);
  }

  if (filters?.openNow) {
    query = query.eq('open_24_7', true);
  }

  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching providers:', error);
    return [];
  }
  
  let results = data as Provider[];

  // Perform flexible local filtering for specialty (e.g., "Cardiologist" matches "Cardiology")
  if (filters?.specialty) {
    const searchLower = filters.specialty.toLowerCase();
    // basic stemming: remove "ist" or "ology" for wider match if needed, but just checking substring is usually enough
    // e.g., "cardio" in "cardiologist"
    const searchBase = searchLower.replace(/(ist|ology|y)$/i, '');
    
    results = results.filter(provider => 
      provider.specialties.some(spec => spec.toLowerCase().includes(searchBase))
    );
  }

  return results;
}

// 2. Fetch a single provider for the SEO page (/providers/[city]/[slug])
export async function getProviderBySlug(slug: string) {
  const { data, error } = await supabase
    .from('providers')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching provider details:', error);
    return null;
  }

  return data as Provider;
}

// 3. Submit a new triage/SOS case
export async function submitTriageCase(
  symptoms: string, 
  lat?: number, 
  lng?: number
) {
  const { error } = await supabase
    .from('triage_cases')
    .insert([
      { 
        symptoms_text: symptoms, 
        location_lat: lat, 
        location_lng: lng,
        status: 'open'
      }
    ]);

  if (error) {
    console.error('Error submitting triage case:', error);
    return null;
  }

  return true;
}

// 4. Fetch Price Benchmarks for a city
export async function getPriceBenchmarks(city: string) {
  const { data, error } = await supabase
    .from('price_benchmarks')
    .select('*')
    .ilike('city', `%${city}%`);

  if (error) {
    console.error('Error fetching benchmarks:', error);
    return [];
  }

  return data;
}
