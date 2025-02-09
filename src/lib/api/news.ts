import { supabase } from '../supabase';

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const NEWS_API_URL = 'https://newsapi.org/v2/everything';

export async function fetchAINews() {
  const response = await fetch(
    `${NEWS_API_URL}?q=artificial+intelligence&sortBy=publishedAt&language=en&pageSize=10`,
    {
      headers: {
        'X-Api-Key': NEWS_API_KEY
      }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }

  const data = await response.json();
  return data.articles;
}

export async function getNewsCache() {
  const { data, error } = await supabase
    .from('news_cache')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(10);

  if (error) throw error;
  return data;
}

export async function updateNewsCache(articles: any[]) {
  const { error } = await supabase
    .from('news_cache')
    .upsert(
      articles.map(article => ({
        title: article.title,
        description: article.description,
        url: article.url,
        image_url: article.urlToImage,
        source_name: article.source.name,
        published_at: article.publishedAt
      }))
    );

  if (error) throw error;
}