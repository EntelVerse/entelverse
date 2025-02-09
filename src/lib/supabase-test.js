import { supabase } from './supabase';
async function testConnection() {
    try {
        const { data, error } = await supabase.from('profiles').select('*').limit(1);
        if (error) {
            console.error('Supabase error:', error.message);
            return false;
        }
        console.log('Supabase connection successful!');
        console.log('Test query result:', data);
        return true;
    }
    catch (error) {
        console.error('Connection test failed:', error);
        return false;
    }
}
testConnection();
