import React from 'react';
import { Sparkles } from 'lucide-react';

export function GeneralAssistant() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 text-center">
      <div className="inline-flex p-3 bg-blue-100 rounded-full mb-4">
        <Sparkles size={24} className="text-blue-600" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-3">
        Not sure where to start?
      </h3>
      <p className="text-gray-600 mb-6">
        Use our general music assistant to explore different styles and get personalized guidance.
      </p>
      <a
        href="/chat/music"
        className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Start with Music Assistant
      </a>
    </div>
  );
}