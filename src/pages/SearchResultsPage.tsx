import React, { useState } from 'react';
import { SearchResults } from '../components/search/SearchResults';
import { getSearchResults } from '../lib/search';

export function SearchResultsPage() {
  const [results, setResults] = useState(getSearchResults(''));

  const handleSearch = (query: string) => {
    setResults(getSearchResults(query));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Here's what we found for you
          </h1>
          <p className="text-xl text-gray-600">
            Select an option below or refine your search
          </p>
        </div>

        <SearchResults results={results} onSearch={handleSearch} />

        <div className="mt-12 text-center">
          <a 
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}