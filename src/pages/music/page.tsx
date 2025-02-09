import React from 'react';
import { ArtistCard } from '../../components/music/ArtistCard';
import { GeneralAssistant } from '../../components/music/GeneralAssistant';
import { artists } from '../../data/artists';

export function MusicPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Collaborate with Legends
          </h1>
          <p className="text-xl text-gray-600">
            Choose a music icon and bring your song to life
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {artists.map((artist) => (
            <ArtistCard key={artist.id} {...artist} />
          ))}
        </div>

        <GeneralAssistant />

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Once your lyrics are ready, visit{' '}
            <a 
              href="https://suno.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700"
            >
              Suno.ai
            </a>
            {' '}to turn them into music!
          </p>
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