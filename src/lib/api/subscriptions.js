import { supabase } from '../supabase';
export async function getSubscriptions() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user)
        throw new Error('User not authenticated');
    const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id);
    if (error)
        throw error;
    return data;
}
export async function subscribe(category) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user)
        throw new Error('User not authenticated');
    const { data, error } = await supabase
        .from('subscriptions')
        .insert({
        user_id: user.id,
        category
    })
        .select()
        .single();
    if (error)
        throw error;
    return data;
}
export async function unsubscribe(category) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user)
        throw new Error('User not authenticated');
    const { error } = await supabase
        .from('subscriptions')
        .delete()
        .eq('user_id', user.id)
        .eq('category', category);
    if (error)
        throw error;
}
