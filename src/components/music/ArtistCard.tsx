import React from 'react';
import { Music } from 'lucide-react';

interface ArtistCardProps {
  name: string;
  description: string;
  imageUrl: string;
  href: string;
}

export function ArtistCard({ name, description, imageUrl, href }: ArtistCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-100 overflow-hidden">
      <div className="aspect-square relative">
        <img 
          src={imageUrl} 
          alt={name}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Music size={20} className="text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        <a
          href={href}
          className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Chat
        </a>
      </div>
    </div>
  );
}