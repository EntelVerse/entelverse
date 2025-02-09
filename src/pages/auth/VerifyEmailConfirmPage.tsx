// /src/pages/auth/VerifyEmailConfirmPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function VerifyEmailConfirmPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Handle the email verification confirmation
        const { error } = await supabase.auth.verifyOtp({
          token_hash: searchParams.get('token_hash') || '',
          type: 'email',
        });

        if (error) throw error;
        
        setStatus('success');
        setTimeout(() => navigate('/todos'), 2000);
      } catch (error) {
        console.error('Email verification error:', error);
        setStatus('error');
        setError(error instanceof Error ? error.message : 'Failed to verify email');
      }
    };

    verifyEmail();
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20 text-center">
          {status === 'loading' && (
            <>
              <Loader2 size={48} className="animate-spin text-blue-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">Verifying Your Email</h1>
              <p className="text-gray-300">Please wait while we confirm your email address...</p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">Email Verified!</h1>
              <p className="text-gray-300">Your email has been verified successfully. Redirecting...</p>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle size={48} className="text-red-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">Verification Failed</h1>
              <p className="text-gray-300 mb-4">{error}</p>
              <button
                onClick={() => navigate('/verify-email')}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Try Again
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
