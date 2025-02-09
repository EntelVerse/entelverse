import React, { useState } from 'react';
import { Search } from 'lucide-react';
export function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };
    return (<form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative">
        <input type="text" className="w-full px-6 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none pr-12 bg-white/80 backdrop-blur-sm" placeholder="Type your goal (e.g., Create a song, Generate AI visuals)" value={query} onChange={(e) => setQuery(e.target.value)}/>
        <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500 transition-colors">
          <Search size={24}/>
        </button>
      </div>
    </form>);
}
