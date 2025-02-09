import React, { useState } from 'react';
import { X, Loader2, QrCode, Copy, Check } from 'lucide-react';
import { User } from '@supabase/supabase-js';
import { enable2FA, verify2FA } from '../lib/profile';

interface TwoFactorModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onSuccess: () => void;
}

export function TwoFactorModal({ isOpen, onClose, user, onSuccess }: TwoFactorModalProps) {
  const [step, setStep] = useState<'intro' | 'setup' | 'verify'>('intro');
  const [secret, setSecret] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSetup = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await enable2FA(user);
      if (!result) throw new Error('Failed to generate 2FA secret');

      setSecret(result.secret);
      setQrCode(result.qrCode);
      setStep('setup');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to set up 2FA');
    } finally {
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
      if (!isValid) throw new Error('Invalid verification code');

      onSuccess();
      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to verify code');
    } finally {
      setIsLoading(false);
    }
  };

  const copySecret = async () => {
    try {
      await navigator.clipboard.writeText(secret);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      setError('Failed to copy secret');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Two-Factor Authentication</h2>

            {error && (
              <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 flex items-center gap-2">
                <span>{error}</span>
              </div>
            )}

            {step === 'intro' && (
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  Two-factor authentication adds an extra layer of security to your account by requiring a verification code in addition to your password.
                </p>
                <button
                  onClick={handleSetup}
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Setting up...</span>
                    </>
                  ) : (
                    'Set up 2FA'
                  )}
                </button>
              </div>
            )}

            {step === 'setup' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    1. Scan this QR code with your authenticator app
                  </p>
                  <div className="bg-white p-4 rounded-lg flex items-center justify-center">
                    <img src={qrCode} alt="QR Code" className="w-48 h-48" />
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    2. Or manually enter this secret key
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 p-2 bg-gray-100 dark:bg-gray-700 rounded font-mono text-sm">
                      {secret}
                    </code>
                    <button
                      onClick={copySecret}
                      className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      title="Copy secret"
                    >
                      {copied ? <Check size={20} /> : <Copy size={20} />}
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setStep('verify')}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Continue
                </button>
              </div>
            )}

            {step === 'verify' && (
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  Enter the 6-digit code from your authenticator app to verify setup
                </p>
                <input
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="000000"
                  maxLength={6}
                />
                <button
                  onClick={handleVerify}
                  disabled={isLoading || token.length !== 6}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    'Verify'
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}