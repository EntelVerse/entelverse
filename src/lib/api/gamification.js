import { supabase } from '../supabase';
import { checkAndAwardBadges } from './badges';
const POINTS = {
    POST_CREATED: 10,
    POST_UPVOTED: 2,
    COMMENT_CREATED: 5,
    TOOL_SUBMITTED: 15,
    TOOL_APPROVED: 20,
    REVIEW_CREATED: 8
};
export async function awardPoints(userId, action) {
    const points = POINTS[action];
    const { error } = await supabase.rpc('increment_user_points', {
        user_id: userId,
        points_to_add: points
    });
    if (error)
        throw error;
    // Check for new badges
    await checkAndAwardBadges(userId);
}
export async function getLeaderboard() {
    const { data, error } = await supabase
        .from('profiles')
        .select(`
      id,
      username,
      avatar_url,
      points,
      user_badges (
        badges (
          name,
          icon_url
        )
      )
    `)
        .order('points', { ascending: false })
        .limit(10);
    if (error)
        throw error;
    return data;
}
