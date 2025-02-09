import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { X, Loader2, Copy, Check } from 'lucide-react';
import { enable2FA, verify2FA } from '../lib/profile';
export function TwoFactorModal({ isOpen, onClose, user, onSuccess }) {
    const [step, setStep] = useState('intro');
    const [secret, setSecret] = useState('');
    const [qrCode, setQrCode] = useState('');
    const [token, setToken] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);
    if (!isOpen)
        return null;
    const handleSetup = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await enable2FA(user);
            if (!result)
                throw new Error('Failed to generate 2FA secret');
            setSecret(result.secret);
            setQrCode(result.qrCode);
            setStep('setup');
        }
        catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to set up 2FA');
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleVerify = async () => {
        if (!token.trim()) {
            setError('Please enter the verification code');
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const isValid = await verify2FA(user, token);
            if (!isValid)
                throw new Error('Invalid verification code');
            onSuccess();
            onClose();
        }
        catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to verify code');
        }
        finally {
            setIsLoading(false);
        }
    };
    const copySecret = async () => {
        try {
            await navigator.clipboard.writeText(secret);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
        catch (error) {
            setError('Failed to copy secret');
        }
    };
    return (_jsxs("div", { className: "fixed inset-0 z-50 overflow-y-auto", children: [_jsx("div", { className: "fixed inset-0 bg-black/50 backdrop-blur-sm", onClick: onClose }), _jsx("div", { className: "relative min-h-screen flex items-center justify-center p-4", children: _jsxs("div", { className: "relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl", children: [_jsx("button", { onClick: onClose, className: "absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors", children: _jsx(X, { size: 20 }) }), _jsxs("div", { className: "p-6", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Two-Factor Authentication" }), error && (_jsx("div", { className: "mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 flex items-center gap-2", children: _jsx("span", { children: error }) })), step === 'intro' && (_jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "text-gray-600 dark:text-gray-300", children: "Two-factor authentication adds an extra layer of security to your account by requiring a verification code in addition to your password." }), _jsx("button", { onClick: handleSetup, disabled: isLoading, className: "w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { size: 20, className: "animate-spin" }), _jsx("span", { children: "Setting up..." })] })) : ('Set up 2FA') })] })), step === 'setup' && (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: "1. Scan this QR code with your authenticator app" }), _jsx("div", { className: "bg-white p-4 rounded-lg flex items-center justify-center", children: _jsx("img", { src: qrCode, alt: "QR Code", className: "w-48 h-48" }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: "2. Or manually enter this secret key" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("code", { className: "flex-1 p-2 bg-gray-100 dark:bg-gray-700 rounded font-mono text-sm", children: secret }), _jsx("button", { onClick: copySecret, className: "p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300", title: "Copy secret", children: copied ? _jsx(Check, { size: 20 }) : _jsx(Copy, { size: 20 }) })] })] }), _jsx("button", { onClick: () => setStep('verify'), className: "w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors", children: "Continue" })] })), step === 'verify' && (_jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "text-gray-600 dark:text-gray-300", children: "Enter the 6-digit code from your authenticator app to verify setup" }), _jsx("input", { type: "text", value: token, onChange: (e) => setToken(e.target.value.replace(/\D/g, '').slice(0, 6)), className: "w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all", placeholder: "000000", maxLength: 6 }), _jsx("button", { onClick: handleVerify, disabled: isLoading || token.length !== 6, className: "w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { size: 20, className: "animate-spin" }), _jsx("span", { children: "Verifying..." })] })) : ('Verify') })] }))] })] }) })] }));
}
