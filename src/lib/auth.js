import { supabase } from './supabase';
// Cache user data to reduce redundant API calls
let cachedUser = null;
/**
 *  Sign Up Function
 */
export async function signUp(email, password, fullName) {
    try {
        console.log('🟢 Attempting sign-up:', email);
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: { full_name: fullName }, // Store additional user metadata
                emailRedirectTo: `${window.location.origin}/verify-email`, // Redirect URL after verification
            },
        });
        if (error) {
            console.error('❌ Sign-up Error:', error.message);
            throw new Error(error.message);
        }
        console.log('✅ User successfully signed up:', data);
        return data;
    }
    catch (error) {
        console.error('🚨 Unexpected Sign-up Error:', error);
        throw new Error(error.message || 'An unexpected error occurred during sign up.');
    }
}
/**
 *  Sign In Function (Password-based)
 */
export async function signIn(email, password) {
    try {
        console.log('🔵 Signing in:', email);
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            throw new Error(error.message.includes("Invalid login credentials")
                ? "Invalid email or password. Please try again."
                : error.message);
        }
        if (!data.user.email_confirmed_at) {
            throw new Error("Please verify your email before logging in.");
        }
        return { user: data.user };
    }
    catch (error) {
        console.error("🚨 Authentication Error:", error);
        throw new Error(error.message || "An unexpected error occurred during sign-in.");
    }
}
/**
 *  Sign Out Function
 */
export async function signOut() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error)
            throw new Error(error.message);
        cachedUser = null; // Clear cached user on logout
    }
    catch (error) {
        console.error('❌ Sign-out Error:', error);
        throw new Error('An unexpected error occurred during sign out.');
    }
}
/**
 *  Get Cached User
 * Checks the local cache first before making an API call.
 */
export async function getCachedUser() {
    if (cachedUser)
        return cachedUser;
    const { data, error } = await supabase.auth.getUser();
    if (!error && data?.user) {
        cachedUser = data.user;
        return data.user;
    }
    return null;
}
/**
 *  Verify Email Using 6-Digit Code
 */
export async function verifyEmailCode(email, code) {
    try {
        const { data, error } = await supabase
            .from('verification_codes')
            .select('*')
            .eq('email', email)
            .eq('code', code)
            .gt('expires_at', new Date().toISOString())
            .single();
        if (error || !data)
            throw new Error('Invalid or expired verification code');
        // Update the user's record to mark the email as verified.
        await supabase.auth.updateUser({ data: { email_verified: true } });
        // Delete the used verification code.
        await supabase.from('verification_codes').delete().eq('email', email).eq('code', code);
        return true;
    }
    catch (error) {
        console.error('❌ Verification Error:', error);
        throw new Error('Failed to verify email.');
    }
}
/**
 *  Verify Email Using Token Link
 */
export async function verifyEmailToken(email, token) {
    try {
        // Use Supabase's verifyOtp method to validate the token
        const { error } = await supabase.auth.verifyOtp({
            email, // Include the email
            token,
            type: 'email', // Specify the type as 'email'
        });
        if (error)
            throw new Error('Invalid or expired verification token');
        // Update the user's record to mark the email as verified.
        await supabase.auth.updateUser({ data: { email_verified: true } });
        return true;
    }
    catch (error) {
        console.error('❌ Token Verification Error:', error);
        throw new Error('Failed to verify email.');
    }
}
/**
 *  Resend Verification Email
 */
export async function resendVerificationEmail(email) {
    try {
        // Send the verification email using Supabase's built-in method
        const { error } = await supabase.auth.resend({
            type: 'signup',
            email,
            options: {
                emailRedirectTo: `${window.location.origin}/verify-email`, // Redirect URL after verification
            },
        });
        if (error)
            throw new Error(error.message);
    }
    catch (error) {
        console.error('❌ Resend Verification Error:', error);
        throw new Error('Failed to resend verification email.');
    }
}
