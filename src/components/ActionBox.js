import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function ActionBox({ title, description, icon: Icon, href }) {
    return (_jsxs("a", { href: href, className: "group p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center space-y-4 border border-gray-100 hover:border-blue-100", children: [_jsx("div", { className: "p-4 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors", children: _jsx(Icon, { size: 32, className: "text-blue-600" }) }), _jsx("h3", { className: "text-xl font-semibold text-gray-900", children: title }), _jsx("p", { className: "text-gray-600", children: description })] }));
}
