import { supabase } from '../supabase';
import type { Database } from '../../types/supabase';

type Subscription = Database['public']['Tables']['subscriptions']['Row'];

export async function getSubscriptions() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id);

  if (error) throw error;
  return data;
}

export async function subscribe(category: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('subscriptions')
    .insert({
      user_id: user.id,
      category
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function unsubscribe(category: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { error } = await supabase
    .from('subscriptions')
    .delete()
    .eq('user_id', user.id)
    .eq('category', category);

  if (error) throw error;
}