import { supabase } from '../supabase';
export async function getPosts(options) {
    let query = supabase
        .from('blog_posts')
        .select(`
      *,
      profiles (
        username,
        avatar_url
      ),
      comments (count),
      votes (count)
    `);
    if (options?.featured) {
        query = query.eq('featured', true);
    }
    if (options?.userId) {
        query = query.eq('user_id', options.userId);
    }
    if (options?.status) {
        query = query.eq('status', options.status);
    }
    else {
        query = query.eq('status', 'published');
    }
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error)
        throw error;
    return data;
}
export async function getPost(id) {
    const { data, error } = await supabase
        .from('blog_posts')
        .select(`
      *,
      profiles (
        username,
        avatar_url
      ),
      comments (
        *,
        profiles (
          username,
          avatar_url
        )
      ),
      votes (*)
    `)
        .eq('id', id)
        .single();
    if (error)
        throw error;
    return data;
}
export async function createPost(post) {
    const { data, error } = await supabase
        .from('blog_posts')
        .insert(post)
        .select()
        .single();
    if (error)
        throw error;
    return data;
}
export async function updatePost(id, updates) {
    const { data, error } = await supabase
        .from('blog_posts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
    if (error)
        throw error;
    return data;
}
export async function deletePost(id) {
    const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
    if (error)
        throw error;
}
export async function incrementViews(id) {
    const { error } = await supabase.rpc('increment_post_views', { post_id: id });
    if (error)
        throw error;
}
export async function votePost(postId, voteType) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user)
        throw new Error('User not authenticated');
    // Check for existing vote
    const { data: existingVote } = await supabase
        .from('votes')
        .select()
        .eq('post_id', postId)
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
            post_id: postId,
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
