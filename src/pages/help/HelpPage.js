import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HelpCircle, Book, MessageCircle, Video, FileText, Mail } from 'lucide-react';
const guides = [
    {
        title: 'Getting Started',
        description: 'Learn the basics of EntelVerse and how to use our AI tools',
        icon: _jsx(Book, { className: "w-6 h-6 text-blue-500" }),
        link: '#'
    },
    {
        title: 'Chat Features',
        description: 'Discover how to make the most of our chat interface',
        icon: _jsx(MessageCircle, { className: "w-6 h-6 text-green-500" }),
        link: '#'
    },
    {
        title: 'Video Tutorials',
        description: 'Watch step-by-step guides for all features',
        icon: _jsx(Video, { className: "w-6 h-6 text-purple-500" }),
        link: '#'
    },
    {
        title: 'Documentation',
        description: 'Detailed technical documentation and API references',
        icon: _jsx(FileText, { className: "w-6 h-6 text-orange-500" }),
        link: '#'
    }
];
const faqs = [
    {
        question: 'What is EntelVerse?',
        answer: 'EntelVerse is an AI-powered creative platform that helps you create music, visuals, videos, and websites using advanced artificial intelligence.'
    },
    {
        question: 'How do I get started?',
        answer: 'Simply sign up for an account, choose your preferred AI tool, and start creating! Our intuitive interface guides you through the process.'
    },
    {
        question: 'What AI models are available?',
        answer: 'We offer several specialized AI models including HarmonyGPT for music, ChromaGPT for visuals, StoryForge for videos, and WebCrafter for websites.'
    },
    {
        question: 'Is my data secure?',
        answer: 'Yes, we take data security seriously. All your data is encrypted and stored securely. You can review our privacy policy for more details.'
    }
];
export function HelpPage() {
    return (_jsx("div", { className: "min-h-screen pt-24 pb-16", children: _jsxs("div", { className: "max-w-4xl mx-auto px-4", children: [_jsxs("div", { className: "flex items-center gap-4 mb-12", children: [_jsx("div", { className: "p-3 bg-blue-500/20 rounded-xl", children: _jsx(HelpCircle, { className: "w-8 h-8 text-blue-500" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold", children: "Help Center" }), _jsx("p", { className: "text-gray-600 dark:text-gray-400", children: "Find answers and learn how to make the most of EntelVerse" })] })] }), _jsx("div", { className: "mb-12", children: _jsxs("div", { className: "relative", children: [_jsx("input", { type: "text", placeholder: "Search for help...", className: "w-full px-6 py-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" }), _jsx("button", { className: "absolute right-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors", children: "Search" })] }) }), _jsxs("section", { className: "mb-12", children: [_jsx("h2", { className: "text-2xl font-semibold mb-6", children: "Quick Start Guides" }), _jsx("div", { className: "grid md:grid-cols-2 gap-6", children: guides.map((guide) => (_jsx("a", { href: guide.link, className: "block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "p-3 bg-gray-100 dark:bg-gray-700 rounded-xl", children: guide.icon }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: guide.title }), _jsx("p", { className: "text-gray-600 dark:text-gray-400", children: guide.description })] })] }) }, guide.title))) })] }), _jsxs("section", { className: "mb-12", children: [_jsx("h2", { className: "text-2xl font-semibold mb-6", children: "Frequently Asked Questions" }), _jsx("div", { className: "space-y-4", children: faqs.map((faq, index) => (_jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm", children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: faq.question }), _jsx("p", { className: "text-gray-600 dark:text-gray-400", children: faq.answer })] }, index))) })] }), _jsx("section", { children: _jsxs("div", { className: "bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 text-center", children: [_jsx(Mail, { className: "w-12 h-12 text-blue-500 mx-auto mb-4" }), _jsx("h2", { className: "text-2xl font-semibold mb-2", children: "Still need help?" }), _jsx("p", { className: "text-gray-600 dark:text-gray-400 mb-6", children: "Our support team is here to help you with any questions" }), _jsx("a", { href: "mailto:support@entelverse.com", className: "inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors", children: "Contact Support" })] }) })] }) }));
}
