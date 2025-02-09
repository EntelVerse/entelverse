import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('❌ Missing Supabase environment variables. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Function to get user access token dynamically
const getAuthHeaders = async () => {
  const { data: { session } } = await supabase.auth.getSession();

  return {
    'apikey': supabaseAnonKey,
    'Authorization': session ? `Bearer ${session.access_token}` : '',
  };
};

// ✅ Log auth state changes for debugging
supabase.auth.onAuthStateChange((event, session) => {
  console.log(`🔄 Auth state changed: ${event}`, session);
});

export { getAuthHeaders };
console.log('✅ Supabase client initialized successfully');
