import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// /src/pages/auth/AccountVerificationPage.tsx
import { useState, useEffect } from 'react';
import { Mail, ArrowLeft, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { verifyEmailToken } from '../../lib/auth';
import { queueAndProcessEmail } from '../../lib/email';
export function AccountVerificationPage() {
    const [verificationCode, setVerificationCode] = useState('');
    const [cooldown, setCooldown] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;
    useEffect(() => {
        const savedCooldown = localStorage.getItem('resendCooldown');
        if (savedCooldown) {
            const remainingTime = Math.max(0, parseInt(savedCooldown) - Math.floor(Date.now() / 1000));
            setCooldown(remainingTime);
        }
    }, []);
    useEffect(() => {
        let timer;
        if (cooldown > 0) {
            timer = window.setInterval(() => {
                setCooldown(prev => {
                    const next = prev - 1;
                    if (next <= 0) {
                        localStorage.removeItem('resendCooldown');
                        return 0;
                    }
                    return next;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [cooldown]);
    const handleVerifyCode = async (e) => {
        e.preventDefault();
        if (!email || !verificationCode)
            return;
        setIsLoading(true);
        setStatus(null);
        try {
            await verifyEmailToken(email, verificationCode);
            setStatus({
                type: 'success',
                message: 'Email verified successfully! Redirecting...'
            });
            setTimeout(() => navigate('/todos'), 2000);
        }
        catch (error) {
            setStatus({
                type: 'error',
                message: error instanceof Error ? error.message : 'Failed to verify code'
            });
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleResendVerification = async () => {
        if (!email) {
            setStatus({
                type: 'error',
                message: 'Email address not found. Please try signing up again.'
            });
            return;
        }
        setIsLoading(true);
        setStatus(null);
        try {
            // Immediately queue and process a new verification email
            const result = await queueAndProcessEmail({
                recipient: email,
                subject: 'Verify Your Email - Enterverse',
                body: 'Please check your email for a new verification code to verify your account.',
                priority: 'high'
            });
            if (result.queued) {
                setStatus({
                    type: 'success',
                    message: 'A new verification code has been sent to your email address.'
                });
            }
            else {
                throw new Error(result.error);
            }
            setCooldown(60);
            localStorage.setItem('resendCooldown', (Math.floor(Date.now() / 1000) + 60).toString());
        }
        catch (error) {
            setStatus({
                type: 'error',
                message: error instanceof Error ? error.message : 'Failed to send verification email'
            });
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-4", children: _jsx("div", { className: "w-full max-w-md", children: _jsxs("div", { className: "bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20 text-center", children: [_jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-6", children: _jsx(Mail, { className: "w-8 h-8 text-blue-400" }) }), _jsx("h1", { className: "text-3xl font-bold bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent mb-4", children: "Verify Your Email" }), _jsxs("p", { className: "text-gray-300 mb-8", children: ["We've sent a verification code to ", email ? _jsx("span", { className: "font-medium", children: email }) : 'your email address', ". Enter the code below or click the verification link in the email."] }), status && (_jsxs("div", { className: `mb-6 p-4 rounded-lg flex items-center gap-2 ${status.type === 'success'
                            ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                            : 'bg-red-500/10 border border-red-500/20 text-red-400'}`, children: [status.type === 'success' ? (_jsx(CheckCircle, { size: 20 })) : (_jsx(AlertCircle, { size: 20 })), _jsx("span", { children: status.message })] })), _jsxs("form", { onSubmit: handleVerifyCode, className: "space-y-6 mb-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "code", className: "sr-only", children: "Verification Code" }), _jsx("input", { id: "code", type: "text", value: verificationCode, onChange: (e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6)), placeholder: "Enter 6-digit code", className: "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white text-center text-2xl tracking-widest", maxLength: 6, pattern: "\\d{6}", required: true })] }), _jsx("button", { type: "submit", disabled: isLoading || verificationCode.length !== 6, className: "w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg transition-colors flex items-center justify-center gap-2", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { size: 20, className: "animate-spin" }), _jsx("span", { children: "Verifying..." })] })) : ('Verify Code') })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "text-sm text-gray-400", children: "Didn't receive the code? Check your spam folder or request a new verification code." }), _jsx("button", { className: "w-full py-3 px-4 bg-white/5 hover:bg-white/10 disabled:bg-white/5 text-white rounded-lg transition-colors flex items-center justify-center gap-2", onClick: handleResendVerification, disabled: cooldown > 0 || isLoading, children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { size: 20, className: "animate-spin" }), _jsx("span", { children: "Sending..." })] })) : cooldown > 0 ? (`Try again in ${cooldown} seconds`) : ('Resend Verification Email') }), _jsxs(Link, { to: "/signin", className: "inline-flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors", children: [_jsx(ArrowLeft, { size: 20 }), "Back to Sign In"] })] })] }) }) }));
}
