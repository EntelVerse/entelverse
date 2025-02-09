import React from 'react';
export function SocialAuthButtons({ onError }) {
    // Show an error message when trying to use social login
    const handleProviderSignIn = () => {
        onError('OAuth sign-in is not enabled.');
    };
    return (<div className="text-center p-4 bg-gray-800 text-white rounded-lg">
      <p className="text-sm">
        Social login is not available. Only Supabase email/password authentication is enabled.
      </p>
      <button onClick={handleProviderSignIn} className="mt-2 px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition-all">
        Learn More
      </button>
    </div>);
}
