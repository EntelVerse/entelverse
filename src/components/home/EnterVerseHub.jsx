import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Star, MessageSquare, ThumbsUp, Calendar, User, ExternalLink } from 'lucide-react';
import { getTools } from '../../lib/api/tools';
import { getPosts } from '../../lib/api/blog';
import { getNewsCache } from '../../lib/api/news';
export function EnterVerseHub() {
    const [tools, setTools] = useState([]);
    const [posts, setPosts] = useState([]);
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
            try {
                const [toolsData, postsData, newsData] = await Promise.all([
                    getTools(),
                    getPosts({ featured: true }),
                    getNewsCache()
                ]);
                setTools(toolsData.slice(0, 3));
                setPosts(postsData.slice(0, 3));
                setNews(newsData.slice(0, 3));
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);
    return (<section className="py-16 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/5 via-transparent to-transparent opacity-30"/>
        <div className="absolute inset-0 bg-gradient-radial from-purple-500/5 via-transparent to-transparent opacity-30 translate-x-full"/>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-xl mb-4">
            <Sparkles className="w-8 h-8 text-blue-500"/>
          </div>
          <h2 className="text-3xl font-bold mb-4">Discover the AI Universe</h2>
          <p className="text-xl text-content-secondary max-w-2xl mx-auto">
            Explore trending AI tools, latest news, and community insights
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* AI Tools */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Trending AI Tools</h3>
              <Link to="/tools" className="text-blue-500 hover:text-blue-600 flex items-center gap-1">
                View all <ArrowRight size={16}/>
              </Link>
            </div>
            <div className="space-y-4">
              {tools.map((tool) => (<Link key={tool.id} to={`/tools/${tool.id}`} className="block p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700">
                  <div className="flex items-start gap-3">
                    {tool.logo_url ? (<img src={tool.logo_url} alt={tool.name} className="w-12 h-12 rounded-lg"/>) : (<div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-blue-500"/>
                      </div>)}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{tool.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {tool.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Star size={14} className="text-yellow-500"/>
                          {tool.averageRating.toFixed(1)}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare size={14}/>
                          {tool.tool_reviews.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>))}
            </div>
          </div>

          {/* Latest News */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Latest AI News</h3>
              <Link to="/news" className="text-blue-500 hover:text-blue-600 flex items-center gap-1">
                View all <ArrowRight size={16}/>
              </Link>
            </div>
            <div className="space-y-4">
              {news.map((article) => (<a key={article.url} href={article.url} target="_blank" rel="noopener noreferrer" className="block p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700">
                  {article.image_url && (<img src={article.image_url} alt={article.title} className="w-full h-32 object-cover rounded-lg mb-3"/>)}
                  <h4 className="font-medium line-clamp-2 mb-2">{article.title}</h4>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={14}/>
                      {new Date(article.published_at).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <ExternalLink size={14}/>
                      {article.source_name}
                    </span>
                  </div>
                </a>))}
            </div>
          </div>

          {/* Featured Posts */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Community Insights</h3>
              <Link to="/blog" className="text-blue-500 hover:text-blue-600 flex items-center gap-1">
                View all <ArrowRight size={16}/>
              </Link>
            </div>
            <div className="space-y-4">
              {posts.map((post) => (<Link key={post.id} to={`/blog/${post.id}`} className="block p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700">
                  <h4 className="font-medium line-clamp-2 mb-2">{post.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                    {post.content}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      {post.profiles.avatar_url ? (<img src={post.profiles.avatar_url} alt={post.profiles.username} className="w-6 h-6 rounded-full"/>) : (<User size={14}/>)}
                      <span>{post.profiles.username}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <ThumbsUp size={14}/>
                        {post.votes.length}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare size={14}/>
                        {post.comments.length}
                      </span>
                    </div>
                  </div>
                </Link>))}
            </div>
          </div>
        </div>
      </div>
    </section>);
}
