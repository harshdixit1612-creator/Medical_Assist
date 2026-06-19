const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envContent = fs.readFileSync('.env.local', 'utf-8');
const urlMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/);
const keyMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/);

const supabaseUrl = urlMatch ? urlMatch[1].trim() : '';
const supabaseAnonKey = keyMatch ? keyMatch[1].trim() : '';

console.log("URL:", supabaseUrl);
// don't log the whole key, just the start
console.log("KEY prefix:", supabaseAnonKey.substring(0, 15));

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const { data, error } = await supabase.from('providers').select('*');
  if (error) {
    console.error("SUPABASE ERROR:", error);
  } else {
    console.log("SUCCESS! Found", data.length, "providers.");
  }
}

test();
