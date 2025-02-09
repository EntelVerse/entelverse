import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
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
    return (_jsxs("section", { className: "py-16 relative overflow-hidden", children: [_jsxs("div", { className: "absolute inset-0", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-radial from-blue-500/5 via-transparent to-transparent opacity-30" }), _jsx("div", { className: "absolute inset-0 bg-gradient-radial from-purple-500/5 via-transparent to-transparent opacity-30 translate-x-full" })] }), _jsxs("div", { className: "relative max-w-7xl mx-auto px-4", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("div", { className: "inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-xl mb-4", children: _jsx(Sparkles, { className: "w-8 h-8 text-blue-500" }) }), _jsx("h2", { className: "text-3xl font-bold mb-4", children: "Discover the AI Universe" }), _jsx("p", { className: "text-xl text-content-secondary max-w-2xl mx-auto", children: "Explore trending AI tools, latest news, and community insights" })] }), _jsxs("div", { className: "grid md:grid-cols-3 gap-8", children: [_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "text-xl font-semibold", children: "Trending AI Tools" }), _jsxs(Link, { to: "/tools", className: "text-blue-500 hover:text-blue-600 flex items-center gap-1", children: ["View all ", _jsx(ArrowRight, { size: 16 })] })] }), _jsx("div", { className: "space-y-4", children: tools.map((tool) => (_jsx(Link, { to: `/tools/${tool.id}`, className: "block p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700", children: _jsxs("div", { className: "flex items-start gap-3", children: [tool.logo_url ? (_jsx("img", { src: tool.logo_url, alt: tool.name, className: "w-12 h-12 rounded-lg" })) : (_jsx("div", { className: "w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center", children: _jsx(Sparkles, { className: "w-6 h-6 text-blue-500" }) })), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h4", { className: "font-medium truncate", children: tool.name }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 line-clamp-2", children: tool.description }), _jsxs("div", { className: "flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Star, { size: 14, className: "text-yellow-500" }), tool.averageRating.toFixed(1)] }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(MessageSquare, { size: 14 }), tool.tool_reviews.length] })] })] })] }) }, tool.id))) })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "text-xl font-semibold", children: "Latest AI News" }), _jsxs(Link, { to: "/news", className: "text-blue-500 hover:text-blue-600 flex items-center gap-1", children: ["View all ", _jsx(ArrowRight, { size: 16 })] })] }), _jsx("div", { className: "space-y-4", children: news.map((article) => (_jsxs("a", { href: article.url, target: "_blank", rel: "noopener noreferrer", className: "block p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700", children: [article.image_url && (_jsx("img", { src: article.image_url, alt: article.title, className: "w-full h-32 object-cover rounded-lg mb-3" })), _jsx("h4", { className: "font-medium line-clamp-2 mb-2", children: article.title }), _jsxs("div", { className: "flex items-center justify-between text-sm text-gray-500 dark:text-gray-400", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Calendar, { size: 14 }), new Date(article.published_at).toLocaleDateString()] }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(ExternalLink, { size: 14 }), article.source_name] })] })] }, article.url))) })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "text-xl font-semibold", children: "Community Insights" }), _jsxs(Link, { to: "/blog", className: "text-blue-500 hover:text-blue-600 flex items-center gap-1", children: ["View all ", _jsx(ArrowRight, { size: 16 })] })] }), _jsx("div", { className: "space-y-4", children: posts.map((post) => (_jsxs(Link, { to: `/blog/${post.id}`, className: "block p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700", children: [_jsx("h4", { className: "font-medium line-clamp-2 mb-2", children: post.title }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3", children: post.content }), _jsxs("div", { className: "flex items-center justify-between text-sm text-gray-500 dark:text-gray-400", children: [_jsxs("div", { className: "flex items-center gap-2", children: [post.profiles.avatar_url ? (_jsx("img", { src: post.profiles.avatar_url, alt: post.profiles.username, className: "w-6 h-6 rounded-full" })) : (_jsx(User, { size: 14 })), _jsx("span", { children: post.profiles.username })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(ThumbsUp, { size: 14 }), post.votes.length] }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(MessageSquare, { size: 14 }), post.comments.length] })] })] })] }, post.id))) })] })] })] })] }));
}
