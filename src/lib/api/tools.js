import { supabase } from '../supabase';
export async function getTools(category) {
    const query = supabase
        .from('ai_tools')
        .select(`
      *,
      tool_reviews (
        rating
      )
    `)
        .eq('status', 'approved')
        .order('created_at', { ascending: false });
    if (category) {
        query.eq('category', category);
    }
    const { data, error } = await query;
    if (error)
        throw error;
    return data.map(tool => ({
        ...tool,
        averageRating: tool.tool_reviews.length
            ? tool.tool_reviews.reduce((acc, review) => acc + review.rating, 0) / tool.tool_reviews.length
            : 0
    }));
}
export async function getTool(id) {
    const { data, error } = await supabase
        .from('ai_tools')
        .select(`
      *,
      tool_reviews (
        *,
        profiles (
          username,
          avatar_url
        )
      ),
      comments (
        *,
        profiles (
          username,
          avatar_url
        )
      )
    `)
        .eq('id', id)
        .single();
    if (error)
        throw error;
    return data;
}
export async function createTool(tool) {
    const { data, error } = await supabase
        .from('ai_tools')
        .insert(tool)
        .select()
        .single();
    if (error)
        throw error;
    return data;
}
export async function updateTool(id, updates) {
    const { data, error } = await supabase
        .from('ai_tools')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
    if (error)
        throw error;
    return data;
}
export async function deleteTool(id) {
    const { error } = await supabase
        .from('ai_tools')
        .delete()
        .eq('id', id);
    if (error)
        throw error;
}
export async function reviewTool(toolId, rating, reviewText) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user)
        throw new Error('User not authenticated');
    const { data, error } = await supabase
        .from('tool_reviews')
        .insert({
        tool_id: toolId,
        user_id: user.id,
        rating,
        review_text: reviewText
    })
        .select()
        .single();
    if (error)
        throw error;
    return data;
}
export async function voteTool(toolId, voteType) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user)
        throw new Error('User not authenticated');
    // Check for existing vote
    const { data: existingVote } = await supabase
        .from('votes')
        .select()
        .eq('tool_id', toolId)
        .eq('user_id', user.id)
        .single();
    if (existingVote) {
        if (existingVote.vote_type === voteType) {
            // Remove vote if clicking same type
            const { error } = await supabase
                .from('votes')
                .delete()
                .eq('id', existingVote.id);
            if (error)
                throw error;
            return null;
        }
        else {
            // Update vote type if different
            const { data, error } = await supabase
                .from('votes')
                .update({ vote_type: voteType })
                .eq('id', existingVote.id)
                .select()
                .single();
            if (error)
                throw error;
            return data;
        }
    }
    else {
        // Create new vote
        const { data, error } = await supabase
            .from('votes')
            .insert({
            tool_id: toolId,
            user_id: user.id,
            vote_type: voteType
        })
            .select()
            .single();
        if (error)
            throw error;
        return data;
    }
}
