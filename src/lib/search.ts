import { SearchResult } from '../types/search';

export function getSearchResults(query: string): SearchResult[] {
  const q = query.toLowerCase();
  
  const results: SearchResult[] = [];
  
  if (q.includes('song') || q.includes('music')) {
    results.push(
      {
        id: 'drake-gpt',
        title: 'Drake GPT',
        description: 'Create lyrics inspired by Drake\'s style',
        type: 'song',
        icon: 'music',
        href: '/chat/drake'
      },
      {
        id: 'general-music',
        title: 'Music Assistant',
        description: 'Get help with any music creation',
        type: 'song',
        icon: 'music',
        href: '/chat/music'
      }
    );
  }
  
  if (q.includes('photo') || q.includes('image') || q.includes('visual')) {
    results.push(
      {
        id: 'photo-generator',
        title: 'Photo Generator',
        description: 'Create stunning AI visuals',
        type: 'photo',
        icon: 'image',
        href: '/photo'
      }
    );
  }
  
  if (q.includes('video')) {
    results.push(
      {
        id: 'video-creator',
        title: 'Video Creator',
        description: 'Generate video scripts and storyboards',
        type: 'video',
        icon: 'video',
        href: '/video'
      }
    );
  }
  
  if (q.includes('website')) {
    results.push(
      {
        id: 'website-builder',
        title: 'Website Builder',
        description: 'Design your dream website with AI',
        type: 'website',
        icon: 'globe',
        href: '/website'
      }
    );
  }
  
  return results;
}