import { supabase } from "./supabase";
// ✅ Debug Supabase Sign-In Process
export async function debugSupabaseSignIn(email, password) {
    console.log("🟢 Debugging Supabase Sign-In...");
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            console.error("🚨 Supabase Sign-In Error:", error.message);
            return { success: false, message: error.message, data: null };
        }
        console.log("✅ Supabase Sign-In Successful:", data);
        return { success: true, message: "Sign-in successful", data };
    }
    catch (err) {
        console.error("❌ Unexpected Error in Sign-In:", err);
        return { success: false, message: "Unexpected error occurred", data: null };
    }
}
// ✅ Check Current Session
export async function checkCurrentSession() {
    console.log("🔍 Checking Current Session...");
    const { data, error } = await supabase.auth.getSession();
    if (error) {
        console.error("❌ Session Error:", error.message);
        return null;
    }
    console.log("✅ Current Session Data:", data);
    return data;
}
