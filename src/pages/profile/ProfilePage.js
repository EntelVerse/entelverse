import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Edit2, LogOut, Trash2, CheckCircle, AlertCircle, Loader2, X, Mail } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { getProfile, updateProfile, uploadAvatar, deleteAvatar, getSignedImageUrl } from '../../lib/profile';
import { signOut } from '../../lib/auth';
export function ProfilePage() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const isMounted = useRef(true);
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [profileImage, setProfileImage] = useState(null); // ✅ Fixed missing state
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [username, setUsername] = useState('');
    const [form, setForm] = useState({
        username: '',
        firstName: '',
        lastName: '',
        currentPassword: '', // ✅ Added missing password fields
        newPassword: '',
        confirmPassword: '',
    });
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    /** ✅ Fetch User Once */
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data, error } = await supabase.auth.getUser();
                if (error)
                    throw error;
                if (!data?.user)
                    return navigate('/signin');
                setUser(data.user);
            }
            catch (err) {
                console.error('Error fetching user:', err);
                setError('Failed to load user');
            }
        };
        fetchUser();
        return () => { isMounted.current = false; };
    }, [navigate]);
    /** ✅ Fetch Profile After User is Set */
    useEffect(() => {
        if (!user)
            return;
        const loadProfile = async () => {
            setIsLoading(true);
            try {
                const profileData = await getProfile(user);
                if (!profileData)
                    throw new Error('Profile not found');
                setProfile(profileData);
                setUsername(profileData.username || '');
                if (profileData.avatar_url) {
                    const signedUrl = await getSignedImageUrl(profileData.avatar_url);
                    if (signedUrl) {
                        setProfile((prev) => prev ? { ...prev, avatar_url: signedUrl } : null);
                    }
                    else {
                        console.error("Failed to retrieve signed URL for avatar.");
                    }
                }
            }
            catch (err) {
                console.error('Error loading profile:', err);
                setError('Failed to load profile');
            }
            finally {
                setIsLoading(false);
            }
        };
        loadProfile();
    }, [user]);
    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };
    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file || !user)
            return;
        setIsUploading(true);
        setError(null);
        setSuccess(null);
        try {
            const avatarUrl = await uploadAvatar(user, file);
            if (avatarUrl) {
                const signedUrl = await getSignedImageUrl(avatarUrl); // Fetch the signed URL
                setProfileImage(signedUrl);
                setSuccess('Profile photo updated successfully!');
            }
            else {
                throw new Error('Failed to upload profile photo');
            }
        }
        catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to upload profile photo');
        }
        finally {
            setIsUploading(false);
        }
    };
    const handleDeleteAvatar = async () => {
        if (!user)
            return;
        setIsUploading(true);
        setError(null);
        setSuccess(null);
        try {
            const success = await deleteAvatar(user);
            if (success) {
                setProfile(prev => prev ? { ...prev, avatar_url: null } : null);
                setProfileImage(null);
                setSuccess('Profile photo removed successfully!');
            }
            else {
                throw new Error('Failed to remove profile photo');
            }
        }
        catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to remove profile photo');
        }
        finally {
            setIsUploading(false);
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };
    const handleSaveProfile = async () => {
        if (!user)
            return;
        setIsSaving(true);
        setError(null);
        setSuccess(null);
        try {
            const fullName = `${form.firstName} ${form.lastName}`.trim();
            const updatedProfile = await updateProfile(user, { full_name: fullName, username: form.username });
            if (!updatedProfile)
                throw new Error('Failed to update profile');
            setProfile(updatedProfile);
            setSuccess('Profile updated successfully!');
            setIsEditing(false);
        }
        catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to update profile');
        }
        finally {
            setIsSaving(false);
        }
    };
    const handlePasswordChange = async () => {
        if (!user)
            return;
        if (form.newPassword !== form.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setIsSaving(true);
        setError(null);
        setSuccess(null);
        try {
            const { error } = await supabase.auth.updateUser({
                password: form.newPassword
            });
            if (error)
                throw error;
            setSuccess('Password updated successfully!');
            setForm(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
            setIsChangingPassword(false);
        }
        catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to update password');
        }
        finally {
            setIsSaving(false);
        }
    };
    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/signin');
        }
        catch (error) {
            setError('Failed to sign out');
        }
    };
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsx(Loader2, { size: 40, className: "animate-spin text-blue-500" }) }));
    }
    if (error) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center text-red-500", children: error }));
    }
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-gray-900 to-black py-12 px-4", children: _jsxs("div", { className: "max-w-3xl mx-auto space-y-8", children: [_jsxs("div", { className: "relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20", children: [_jsx("button", { onClick: () => setIsEditing(!isEditing), className: "absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors", children: isEditing ? _jsx(X, { size: 24 }) : _jsx(Edit2, { size: 24 }) }), _jsxs("div", { className: "flex flex-col items-center mb-8", children: [_jsxs("div", { className: "relative", children: [_jsxs("div", { className: `w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500/30 ${!isUploading && 'group-hover:border-blue-500'} transition-colors`, children: [profile?.avatar_url ? (_jsx("img", { src: profile.avatar_url, alt: "Profile", className: "w-full h-full object-cover" })) : (_jsx("div", { className: "w-full h-full bg-blue-500/20 flex items-center justify-center", children: _jsx(Camera, { size: 40, className: "text-blue-400" }) })), isUploading && (_jsx("div", { className: "absolute inset-0 bg-black/50 flex items-center justify-center", children: _jsx(Loader2, { size: 32, className: "animate-spin text-blue-400" }) }))] }), _jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", onChange: handleFileChange, className: "hidden" }), !isUploading && (_jsxs("div", { className: "absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2", children: [_jsx("button", { onClick: handleAvatarClick, className: "p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white transition-colors", children: _jsx(Camera, { size: 16 }) }), profile?.avatar_url && (_jsx("button", { onClick: handleDeleteAvatar, className: "p-2 bg-red-600 hover:bg-red-700 rounded-full text-white transition-colors", children: _jsx(Trash2, { size: 16 }) }))] }))] }), (error || success) && (_jsxs("div", { className: `mt-4 p-4 rounded-lg flex items-center gap-2 ${error
                                        ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                                        : 'bg-green-500/10 border border-green-500/20 text-green-400'}`, children: [error ? _jsx(AlertCircle, { size: 20 }) : _jsx(CheckCircle, { size: 20 }), _jsx("span", { children: error || success })] }))] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold text-white mb-4 flex items-center gap-2", children: "Personal Information" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-400 mb-2", children: "First Name" }), isEditing ? (_jsx("input", { type: "text", name: "firstName", value: form.firstName, onChange: handleInputChange, className: "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white" })) : (_jsx("p", { className: "text-xl text-white", children: form.firstName }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-400 mb-2", children: "Last Name" }), isEditing ? (_jsx("input", { type: "text", name: "lastName", value: form.lastName, onChange: (e) => setForm({ ...form, lastName: e.target.value }), className: "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white" })) : (_jsx("p", { className: "text-xl text-white", children: form.lastName }))] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-400 mb-2", children: "Username" }), isEditing ? (_jsx("input", { type: "text", name: "username", value: form.username, onChange: handleInputChange, className: "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white" })) : (_jsxs("p", { className: "text-xl text-white", children: ["@", form.username || 'Set a username'] }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-400 mb-2", children: "Email Address" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Mail, { size: 20, className: "text-gray-400" }), _jsx("p", { className: "text-xl text-white", children: user?.email }), user?.email_confirmed_at && (_jsx(CheckCircle, { size: 20, className: "text-green-400" }))] })] }), isEditing && (_jsx("button", { onClick: handleSaveProfile, disabled: isSaving, className: "w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed", children: isSaving ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { size: 20, className: "animate-spin" }), _jsx("span", { children: "Saving Changes..." })] })) : ('Save Changes') }))] })] }), _jsxs("div", { className: "bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20", children: [_jsx("h2", { className: "text-xl font-semibold text-white mb-6 flex items-center gap-2", children: "Security" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium text-white", children: "Password" }), _jsx("p", { className: "text-sm text-gray-400", children: "Update your password" })] }), _jsx("button", { onClick: () => setIsChangingPassword(!isChangingPassword), className: "px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors", children: "Change Password" })] }), isChangingPassword && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-400 mb-2", children: "Current Password" }), _jsx("input", { type: "password", name: "currentPassword", value: form.currentPassword, onChange: handleInputChange, className: "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-400 mb-2", children: "New Password" }), _jsx("input", { type: "password", name: "newPassword", value: form.newPassword, onChange: handleInputChange, className: "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-400 mb-2", children: "Confirm New Password" }), _jsx("input", { type: "password", name: "confirmPassword", value: form.confirmPassword, onChange: handleInputChange, className: "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white" })] }), _jsx("button", { onClick: handlePasswordChange, disabled: isSaving, className: "w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed", children: isSaving ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { size: 20, className: "animate-spin" }), _jsx("span", { children: "Updating Password..." })] })) : ('Update Password') })] })), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium text-white", children: "Two-Factor Authentication" }), _jsx("p", { className: "text-sm text-gray-400", children: "Add an extra layer of security" })] }), _jsx("button", { className: "px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors", children: "Enable 2FA" })] })] })] }), _jsxs("button", { onClick: handleSignOut, className: "w-full py-3 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors flex items-center justify-center gap-2", children: [_jsx(LogOut, { size: 20 }), _jsx("span", { children: "Sign Out" })] })] }) }));
}
