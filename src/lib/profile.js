import { supabase } from './supabase';
/**
 * Retrieves a user's profile. If not found, creates a default profile.
 */
export async function getProfile(user) {
    if (!user?.id)
        return null;
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .maybeSingle(); // ✅ Prevents errors if profile is missing
        if (error) {
            console.error('Error fetching profile:', error.message);
            return null;
        }
        if (!data)
            return await createDefaultProfile(user);
        return data;
    }
    catch (error) {
        console.error('Unexpected error in getProfile:', error);
        return null;
    }
}
/**
 * Creates a default profile for a new user.
 */
export async function createDefaultProfile(user) {
    if (!user?.id)
        return null;
    try {
        const baseUsername = user.email?.split('@')[0] || `user_${Date.now()}`;
        let username = baseUsername;
        let counter = 1;
        const { data: existingUsers } = await supabase
            .from('profiles')
            .select('username')
            .ilike('username', `${baseUsername}%`);
        const existingUsernames = new Set(existingUsers.map((u) => u.username));
        while (existingUsernames.has(username) && counter < 1000) {
            username = `${baseUsername}${counter}`;
            counter++;
        }
        const defaultProfile = {
            id: user.id,
            full_name: user.user_metadata?.full_name || '',
            username,
            avatar_url: null,
            updated_at: new Date().toISOString(),
        };
        const { data, error } = await supabase.from('profiles').insert([defaultProfile]).select().single();
        if (error) {
            console.error('Error creating default profile:', error.message);
            return null;
        }
        return data;
    }
    catch (error) {
        console.error('Unexpected error in createDefaultProfile:', error);
        return null;
    }
}
/**
 * Updates a user's profile.
 */
export async function updateProfile(user, updates) {
    if (!user?.id)
        return null;
    try {
        const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', user.id)
            .select()
            .single();
        if (error) {
            console.error('Error updating profile:', error.message);
            return null;
        }
        return data;
    }
    catch (error) {
        console.error('Unexpected error in updateProfile:', error);
        return null;
    }
}
/**
 * Uploads an avatar for the user.
 */
export async function uploadAvatar(user, file) {
    if (!user?.id)
        return null;
    try {
        if (!file.type.startsWith('image/'))
            throw new Error('Only images allowed.');
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        const filePath = `avatars/${fileName}`; // ✅ Only store relative path
        const { error: uploadError } = await supabase
            .storage
            .from('profiles')
            .upload(filePath, file, { upsert: true });
        if (uploadError)
            throw new Error(`Upload failed: ${uploadError.message}`);
        // ✅ Store only the relative file path, not the full URL
        const { error: dbError } = await supabase
            .from('profiles')
            .update({ avatar_url: filePath }) // ✅ Store relative path
            .eq('id', user.id);
        if (dbError)
            throw new Error(`Failed to update avatar in database: ${dbError.message}`);
        return filePath;
    }
    catch (error) {
        console.error('Error in uploadAvatar:', error);
        return null;
    }
}
/**
 * Deletes a user's avatar from storage and updates the profile.
 */
export async function deleteAvatar(user) {
    if (!user?.id) {
        console.error('No user ID provided to deleteAvatar');
        return false;
    }
    try {
        const profile = await getProfile(user);
        if (!profile?.avatar_url)
            return true;
        const fileName = profile.avatar_url.split('/').pop();
        if (!fileName)
            return false;
        const { error: deleteError } = await supabase.storage.from('profiles').remove([fileName]);
        if (deleteError) {
            throw new Error(`Failed to delete avatar file: ${deleteError.message}`);
        }
        const { error: updateError } = await supabase
            .from('profiles')
            .update({ avatar_url: null })
            .eq('id', user.id);
        if (updateError) {
            throw new Error(`Failed to update profile after avatar deletion: ${updateError.message}`);
        }
        return true;
    }
    catch (error) {
        console.error('Unexpected error in deleteAvatar:', error instanceof Error ? error.message : error);
        return false;
    }
}
/**
 * Fetch a signed URL for a user's profile image.
 */
export async function getSignedImageUrl(path) {
    if (!path) {
        console.error("getSignedImageUrl: No path provided.");
        return null;
    }
    try {
        // ✅ Ensure no `https://` in the path
        const cleanedPath = path.replace(/^https?:\/\/[^/]+\//, '').replace(/^profiles\//, '');
        const { data, error } = await supabase
            .storage
            .from('profiles') // ✅ Ensure bucket name is correct
            .createSignedUrl(cleanedPath, 60 * 60); // 1-hour expiry
        if (error) {
            console.error("Error fetching signed URL:", error);
            return null;
        }
        return data.signedUrl;
    }
    catch (error) {
        console.error("Unexpected error in getSignedImageUrl:", error);
        return null;
    }
}
/**
 * Enables 2FA for the user.
 */
export async function enable2FA(user) {
    if (!user?.id) {
        console.error('No user ID provided to enable2FA');
        return null;
    }
    try {
        const { data, error } = await supabase.functions.invoke('generate-2fa-secret', {
            body: { userId: user.id },
        });
        if (error)
            throw error;
        return data;
    }
    catch (error) {
        console.error('Unexpected error enabling 2FA:', error);
        return null;
    }
}
/**
 * Verifies a user's 2FA token.
 */
export async function verify2FA(user, token) {
    if (!user?.id) {
        console.error('No user ID provided to verify2FA');
        return false;
    }
    try {
        const { data, error } = await supabase.functions.invoke('verify-2fa-token', {
            body: { userId: user.id, token },
        });
        if (error)
            throw error;
        return data.valid;
    }
    catch (error) {
        console.error('Unexpected error verifying 2FA token:', error);
        return false;
    }
}
