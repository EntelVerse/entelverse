import { supabase } from './lib/supabase';

async function testConnection() {
  try {
    console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
    console.log('Testing connection...');
    
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Connection error:', error.message);
      return;
    }
    
    console.log('Connection successful!');
    console.log('Session:', data);
    
    // Try a simple query
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);
      
    if (profileError) {
      console.error('Query error:', profileError.message);
      return;
    }
    
    console.log('Query successful:', profiles);
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

testConnection();