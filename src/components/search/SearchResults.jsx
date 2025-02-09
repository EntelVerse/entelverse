import React from 'react';
import { SearchResultCard } from './SearchResultCard';
import { SearchBar } from './SearchBar';
export function SearchResults({ results, onSearch }) {
    return (<div className="space-y-8">
      <div className="max-w-2xl mx-auto">
        <SearchBar onSearch={onSearch}/>
      </div>
      
      {results.length > 0 ? (<div className="grid gap-6 md:grid-cols-2">
          {results.map((result) => (<SearchResultCard key={result.id} result={result}/>))}
        </div>) : (<div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No results found
          </h3>
          <p className="text-gray-600">
            Try searching for "song", "photo", "video", or "website"
          </p>
        </div>)}
    </div>);
}
