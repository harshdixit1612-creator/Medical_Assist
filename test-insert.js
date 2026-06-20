const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const envFile = fs.readFileSync('.env.local', 'utf8');
const supabaseUrl = envFile.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim();
const supabaseAnonKey = envFile.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/)[1].trim();

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testInsert() {
  const { data, error } = await supabase
    .from('triage_cases')
    .insert([{ symptoms_text: 'Test symptoms', status: 'open' }])
    .select();
    
  if (error) {
    console.error('Insert Error:', error.message);
  } else {
    console.log('Insert Success:', data);
  }
}

testInsert();
