import { supabase } from '../supabase';
import type { Database } from '../../types/supabase';

type Badge = Database['public']['Tables']['badges']['Row'];
type UserBadge = Database['public']['Tables']['user_badges']['Row'];

export async function getBadges() {
  const { data, error } = await supabase
    .from('badges')
    .select('*')
    .order('points_required', { ascending: true });

  if (error) throw error;
  return data;
}

export async function getUserBadges(userId: string) {
  const { data, error } = await supabase
    .from('user_badges')
    .select(`
      *,
      badges (*)
    `)
    .eq('user_id', userId);

  if (error) throw error;
  return data;
}

export async function checkAndAwardBadges(userId: string) {
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('points')
    .eq('id', userId)
    .single();

  if (profileError) throw profileError;

  const { data: badges, error: badgesError } = await supabase
    .from('badges')
    .select('*')
    .lte('points_required', profile.points)
    .order('points_required', { ascending: true });

  if (badgesError) throw badgesError;

  // Get existing badges
  const { data: existingBadges } = await supabase
    .from('user_badges')
    .select('badge_id')
    .eq('user_id', userId);

  const existingBadgeIds = new Set(existingBadges?.map(b => b.badge_id));

  // Award new badges
  const newBadges = badges.filter(badge => !existingBadgeIds.has(badge.id));

  if (newBadges.length > 0) {
    const <boltAction type="file" filePath="src/lib/api/badges.ts">    badgeInserts = newBadges.map(badge => ({
      user_id: userId,
      badge_id: badge.id
    }));

    const { error: insertError } = await supabase
      .from('user_badges')
      .insert(badgeInserts);

    if (insertError) throw insertError;
  }

  return newBadges;
}