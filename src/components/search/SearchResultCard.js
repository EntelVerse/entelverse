import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Music, Image, Video, Globe } from 'lucide-react';
const iconMap = {
    music: Music,
    image: Image,
    video: Video,
    globe: Globe
};
export function SearchResultCard({ result }) {
    const Icon = iconMap[result.icon];
    return (_jsx("a", { href: result.href, className: "block p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-100", children: _jsxs("div", { className: "flex items-start space-x-4", children: [_jsx("div", { className: "p-3 bg-blue-50 rounded-xl", children: _jsx(Icon, { size: 24, className: "text-blue-600" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: result.title }), _jsx("p", { className: "text-gray-600", children: result.description })] })] }) }));
}
