import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Sparkles } from 'lucide-react';
export function GeneralAssistant() {
    return (_jsxs("div", { className: "bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 text-center", children: [_jsx("div", { className: "inline-flex p-3 bg-blue-100 rounded-full mb-4", children: _jsx(Sparkles, { size: 24, className: "text-blue-600" }) }), _jsx("h3", { className: "text-2xl font-semibold text-gray-900 mb-3", children: "Not sure where to start?" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Use our general music assistant to explore different styles and get personalized guidance." }), _jsx("a", { href: "/chat/music", className: "inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors", children: "Start with Music Assistant" })] }));
}
