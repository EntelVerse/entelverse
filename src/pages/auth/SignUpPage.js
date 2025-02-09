import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
export function SignUpPage() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const validatePassword = (password) => {
        if (!PASSWORD_REGEX.test(password)) {
            return 'Password must be at least 8 characters long and include at least one letter, one number, and one special character';
        }
        return null;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(passwordError);
            return;
        }
        setIsLoading(true);
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { full_name: name },
                    emailRedirectTo: `${window.location.origin}/verify-email`,
                },
            });
            if (error) {
                throw new Error(error.message);
            }
            console.log('✅ User successfully signed up:', data);
            // Navigate to verification page
            navigate('/verify-email', { state: { email } });
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create account');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-4", children: _jsx("div", { className: "w-full max-w-md", children: _jsxs("div", { className: "bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-3xl font-bold bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent", children: "Join Enterverse" }), _jsx("p", { className: "text-gray-400 mt-2", children: "Shape the future of AI creativity" })] }), error && (_jsxs("div", { className: "mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400", children: [_jsx(AlertCircle, { size: 20 }), _jsx("span", { children: error })] })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-300 mb-2", children: "Full Name" }), _jsxs("div", { className: "relative", children: [_jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", size: 20 }), _jsx("input", { type: "text", value: name, onChange: (e) => setName(e.target.value), className: "w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white", placeholder: "John Doe", required: true })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-300 mb-2", children: "Email Address" }), _jsxs("div", { className: "relative", children: [_jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", size: 20 }), _jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white", placeholder: "you@example.com", required: true })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-300 mb-2", children: "Password" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", size: 20 }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", required: true })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-300 mb-2", children: "Confirm Password" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", size: 20 }), _jsx("input", { type: "password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), className: "w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", required: true })] })] }), _jsx("button", { type: "submit", disabled: isLoading, className: "w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed", children: isLoading ? (_jsx("div", { className: "w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" })) : ('Create Account') })] }), _jsxs("p", { className: "mt-8 text-center text-sm text-gray-400", children: ["Already have an account?", ' ', _jsx(Link, { to: "/signin", className: "text-blue-400 hover:text-blue-300 transition-colors", children: "Sign in" })] })] }) }) }));
}
