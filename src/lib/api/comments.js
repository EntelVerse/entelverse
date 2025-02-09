import { supabase } from '../supabase';
export async function getComments(options) {
    let query = supabase
        .from('comments')
        .select(`
      *,
      profiles (
        username,
        avatar_url
      ),
      votes (*)
    `);
    if (options.postId) {
        query = query.eq('post_id', options.postId);
    }
    if (options.toolId) {
        query = query.eq('tool_id', options.toolId);
    }
    if (options.parentId === null) {
        query = query.is('parent_id', null);
    }
    else if (options.parentId) {
        query = query.eq('parent_id', options.parentId);
    }
    const { data, error } = await query.order('created_at', { ascending: true });
    if (error)
        throw error;
    return data;
}
export async function createComment(comment) {
    const { data, error } = await supabase
        .from('comments')
        .insert(comment)
        .select()
        .single();
    if (error)
        throw error;
    return data;
}
export async function updateComment(id, updates) {
    const { data, error } = await supabase
        .from('comments')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
    if (error)
        throw error;
    return data;
}
export async function deleteComment(id) {
    const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', id);
    if (error)
        throw error;
}
export async function voteComment(commentId, voteType) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user)
        throw new Error('User not authenticated');
    // Check for existing vote
    const { data: existingVote } = await supabase
        .from('votes')
        .select()
        .eq('comment_id', commentId)
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
            comment_id: commentId,
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
