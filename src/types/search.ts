export interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'song' | 'photo' | 'video' | 'website';
  icon: string;
  href: string;
}