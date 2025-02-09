import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// /src/pages/auth/SignInPage.tsx
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { SocialAuthButtons } from '../../components/auth/SocialAuthButtons';
import { signIn } from '../../lib/auth';
import { supabase } from '../../lib/supabase';
export function SignInPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    useEffect(() => {
        // Check for remembered email
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        if (rememberedEmail) {
            setEmail(rememberedEmail);
            setRememberMe(true);
        }
        // Set up auth state listener
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session) {
                navigate('/profile');
            }
        });
        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [navigate]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const { user } = await signIn(email, password);
            if (!user?.email_confirmed_at) {
                navigate('/verify-email', { state: { email } });
                return;
            }
            // Store email for remember me functionality
            if (rememberMe) {
                localStorage.setItem('rememberedEmail', email);
            }
            else {
                localStorage.removeItem('rememberedEmail');
            }
            navigate('/profile');
        }
        catch (err) {
            console.error('Sign in error:', err);
            setError(err instanceof Error ? err.message : 'Failed to sign in');
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleSocialAuthError = (error) => {
        setError(error);
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-4", children: _jsx("div", { className: "w-full max-w-md", children: _jsxs("div", { className: "bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-3xl font-bold bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent", children: "Welcome Back" }), _jsx("p", { className: "text-gray-400 mt-2", children: "Sign in to access your creative hub" })] }), error && (_jsxs("div", { className: "mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400", children: [_jsx(AlertCircle, { size: 20 }), _jsx("span", { children: error })] })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-300 mb-2", children: "Email Address" }), _jsxs("div", { className: "relative", children: [_jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", size: 20 }), _jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white", placeholder: "you@example.com", required: true })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-300 mb-2", children: "Password" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", size: 20 }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", required: true })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("input", { type: "checkbox", checked: rememberMe, onChange: (e) => setRememberMe(e.target.checked), className: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" }), _jsx("label", { className: "ml-2 block text-sm text-gray-400", children: "Remember me" })] }), _jsx(Link, { to: "/forgot-password", className: "text-sm text-blue-400 hover:text-blue-300 transition-colors", children: "Forgot password?" })] }), _jsx("button", { type: "submit", disabled: isLoading, className: "w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { size: 20, className: "animate-spin" }), _jsx("span", { children: "Signing in..." })] })) : ('Sign In') }), _jsxs("div", { className: "relative my-6", children: [_jsx("div", { className: "absolute inset-0 flex items-center", children: _jsx("div", { className: "w-full border-t border-white/10" }) }), _jsx("div", { className: "relative flex justify-center text-sm", children: _jsx("span", { className: "px-2 bg-gray-900 text-gray-400", children: "Or continue with" }) })] }), _jsx(SocialAuthButtons, { isLoading: isLoading, onError: handleSocialAuthError })] }), _jsxs("p", { className: "mt-8 text-center text-sm text-gray-400", children: ["Don't have an account?", ' ', _jsx(Link, { to: "/signup", className: "text-blue-400 hover:text-blue-300 transition-colors", children: "Sign up" })] })] }) }) }));
}
