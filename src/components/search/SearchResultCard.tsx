import React from 'react';
import { Music, Image, Video, Globe, LucideIcon } from 'lucide-react';
import { SearchResult } from '../../types/search';

const iconMap: Record<string, LucideIcon> = {
  music: Music,
  image: Image,
  video: Video,
  globe: Globe
};

interface SearchResultCardProps {
  result: SearchResult;
}

export function SearchResultCard({ result }: SearchResultCardProps) {
  const Icon = iconMap[result.icon];

  return (
    <a 
      href={result.href}
      className="block p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-100"
    >
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-blue-50 rounded-xl">
          <Icon size={24} className="text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{result.title}</h3>
          <p className="text-gray-600">{result.description}</p>
        </div>
      </div>
    </a>
  );
}