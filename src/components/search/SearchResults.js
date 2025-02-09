import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SearchResultCard } from './SearchResultCard';
import { SearchBar } from './SearchBar';
export function SearchResults({ results, onSearch }) {
    return (_jsxs("div", { className: "space-y-8", children: [_jsx("div", { className: "max-w-2xl mx-auto", children: _jsx(SearchBar, { onSearch: onSearch }) }), results.length > 0 ? (_jsx("div", { className: "grid gap-6 md:grid-cols-2", children: results.map((result) => (_jsx(SearchResultCard, { result: result }, result.id))) })) : (_jsxs("div", { className: "text-center py-12", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: "No results found" }), _jsx("p", { className: "text-gray-600", children: "Try searching for \"song\", \"photo\", \"video\", or \"website\"" })] }))] }));
}
