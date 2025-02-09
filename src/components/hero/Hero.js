import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TypewriterText } from './TypewriterText';
import { SearchBar } from '../search/SearchBar';
import { useLanguage } from '../../contexts/LanguageContext';
export function Hero({ onSearch }) {
    const { t } = useLanguage();
    return (_jsxs("div", { className: "relative backdrop-blur-sm bg-white/5 dark:bg-black/5 rounded-2xl p-8 border border-white/10 dark:border-white/5", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-radial from-blue-500/5 via-transparent to-transparent opacity-30 dark:opacity-50" }), _jsxs("div", { className: "relative text-center space-y-8", children: [_jsxs("h1", { className: "text-4xl md:text-6xl font-bold", children: [_jsx("span", { className: "bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-blue-100 dark:to-white drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)] dark:drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]", children: t('hero.title') }), _jsx("br", {}), _jsx(TypewriterText, {})] }), _jsx("p", { className: "text-xl font-medium", children: _jsx("span", { className: "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 dark:from-blue-100 dark:via-white dark:to-blue-100 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]", children: t('hero.subtitle') }) }), _jsx("div", { children: _jsx(SearchBar, { onSearch: onSearch }) })] })] }));
}
