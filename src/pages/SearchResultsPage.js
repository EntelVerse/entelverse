import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { SearchResults } from '../components/search/SearchResults';
import { getSearchResults } from '../lib/search';
export function SearchResultsPage() {
    const [results, setResults] = useState(getSearchResults(''));
    const handleSearch = (query) => {
        setResults(getSearchResults(query));
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 py-12", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h1", { className: "text-4xl font-bold text-gray-900 mb-4", children: "Here's what we found for you" }), _jsx("p", { className: "text-xl text-gray-600", children: "Select an option below or refine your search" })] }), _jsx(SearchResults, { results: results, onSearch: handleSearch }), _jsx("div", { className: "mt-12 text-center", children: _jsx("a", { href: "/", className: "text-blue-600 hover:text-blue-700 font-medium", children: "\u2190 Back to Homepage" }) })] }) }));
}
