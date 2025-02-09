import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';
export function NotFoundPage() {
    return (_jsx("div", { className: "min-h-[calc(100vh-4rem)] flex items-center justify-center px-4", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "inline-flex items-center justify-center p-4 bg-red-500/10 rounded-full mb-6", children: _jsx(AlertCircle, { size: 48, className: "text-red-500" }) }), _jsx("h1", { className: "text-4xl font-bold mb-4", children: "404 - Page Not Found" }), _jsx("p", { className: "text-xl text-content-secondary mb-8 max-w-md mx-auto", children: "Oops! The page you're looking for doesn't exist or has been moved." }), _jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 px-6 py-3 bg-interactive hover:bg-interactive-hover text-base rounded-lg transition-colors", children: [_jsx(Home, { size: 20 }), "Return to Home"] })] }) }));
}
