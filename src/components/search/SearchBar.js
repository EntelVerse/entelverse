import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Search } from 'lucide-react';
import { useSearchSuggestions } from '../../hooks/useSearchSuggestions';
export function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');
    const suggestion = useSearchSuggestions();
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };
    return (_jsx("form", { onSubmit: handleSubmit, className: "w-full max-w-2xl mx-auto", children: _jsxs("div", { className: "relative", children: [_jsx("input", { type: "text", id: "search-query", name: "search-query", className: "w-full px-6 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none pr-12 bg-white/80 backdrop-blur-sm", placeholder: suggestion, value: query, onChange: (e) => setQuery(e.target.value), "aria-label": "Search query" }), _jsx("button", { type: "submit", className: "absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500 transition-colors", "aria-label": "Submit search", children: _jsx(Search, { size: 24 }) })] }) }));
}
