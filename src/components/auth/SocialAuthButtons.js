import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function SocialAuthButtons({ onError }) {
    // Show an error message when trying to use social login
    const handleProviderSignIn = () => {
        onError('OAuth sign-in is not enabled.');
    };
    return (_jsxs("div", { className: "text-center p-4 bg-gray-800 text-white rounded-lg", children: [_jsx("p", { className: "text-sm", children: "Social login is not available. Only Supabase email/password authentication is enabled." }), _jsx("button", { onClick: handleProviderSignIn, className: "mt-2 px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition-all", children: "Learn More" })] }));
}
