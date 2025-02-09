import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navigation } from '../Navigation';
import { Footer } from '../footer/Footer';
import { Dock } from '../dock/Dock';
export function Layout({ children, showDock = false }) {
    return (_jsxs("div", { className: "min-h-screen bg-base dark:bg-base text-content dark:text-content", children: [showDock && _jsx(Dock, {}), _jsxs("div", { className: `${showDock ? 'ml-20 lg:ml-72' : ''}`, children: [_jsx(Navigation, {}), _jsx("main", { className: "pt-16", children: children }), _jsx(Footer, {})] })] }));
}
