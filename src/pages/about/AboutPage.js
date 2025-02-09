import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Music, Image, Video, Globe, Sparkles, Target, Users, Rocket } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
const features = [
    {
        name: 'HarmonyGPT',
        description: 'Create music with AI-powered collaboration',
        icon: Music,
        color: 'blue'
    },
    {
        name: 'ChromaGPT',
        description: 'Transform ideas into stunning visuals',
        icon: Image,
        color: 'purple'
    },
    {
        name: 'StoryForge',
        description: 'Craft compelling videos with AI',
        icon: Video,
        color: 'pink'
    },
    {
        name: 'WebCrafter',
        description: 'Design beautiful websites effortlessly',
        icon: Globe,
        color: 'green'
    }
];
const team = [
    {
        name: 'Sarah Chen',
        role: 'CEO & Co-founder',
        bio: 'AI researcher turned entrepreneur with a passion for creative technology',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80'
    },
    {
        name: 'Alex Rodriguez',
        role: 'CTO & Co-founder',
        bio: 'Full-stack developer with expertise in AI and machine learning',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80'
    },
    {
        name: 'Emily Taylor',
        role: 'Head of Product',
        bio: 'Product visionary focused on creating intuitive AI experiences',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80'
    },
    {
        name: 'Marcus Johnson',
        role: 'Lead AI Engineer',
        bio: 'AI specialist with a background in computational creativity',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80'
    }
];
const testimonials = [
    {
        quote: "EntelVerse has revolutionized how I create content. The AI tools are incredibly intuitive and powerful.",
        author: "David Kim",
        role: "Digital Artist"
    },
    {
        quote: "As a musician, HarmonyGPT has become an invaluable part of my creative process. It's like having a collaborative partner available 24/7.",
        author: "Maria Garcia",
        role: "Music Producer"
    }
];
export function AboutPage() {
    const { t } = useLanguage();
    return (_jsxs("div", { className: "min-h-screen pt-24 pb-16", children: [_jsxs("div", { className: "relative overflow-hidden", children: [_jsxs("div", { className: "absolute inset-0", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-radial from-blue-500/20 via-transparent to-transparent opacity-30" }), _jsx("div", { className: "absolute inset-0 bg-gradient-radial from-purple-500/20 via-transparent to-transparent opacity-30 translate-x-full" })] }), _jsxs("div", { className: "relative max-w-7xl mx-auto px-4 py-16 text-center", children: [_jsx("h1", { className: "text-4xl md:text-6xl font-bold mb-6", children: "About EntelVerse" }), _jsx("p", { className: "text-xl md:text-2xl text-content-secondary max-w-3xl mx-auto", children: "Empowering creativity through AI innovation" })] })] }), _jsx("section", { className: "py-16 bg-base-secondary/50", children: _jsx("div", { className: "max-w-7xl mx-auto px-4", children: _jsxs("div", { className: "grid md:grid-cols-2 gap-12", children: [_jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "inline-flex items-center justify-center p-3 bg-interactive/10 rounded-xl", children: _jsx(Target, { className: "w-8 h-8 text-interactive" }) }), _jsx("h2", { className: "text-3xl font-bold", children: "Our Mission" }), _jsx("p", { className: "text-lg text-content-secondary", children: "To democratize AI technology and make it accessible to creators worldwide. We believe in empowering individuals to push the boundaries of their creativity through innovative AI tools." })] }), _jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "inline-flex items-center justify-center p-3 bg-interactive/10 rounded-xl", children: _jsx(Sparkles, { className: "w-8 h-8 text-interactive" }) }), _jsx("h2", { className: "text-3xl font-bold", children: "Our Vision" }), _jsx("p", { className: "text-lg text-content-secondary", children: "A world where AI enhances human creativity rather than replacing it. We're building a future where anyone can bring their creative ideas to life with the help of intuitive AI tools." })] })] }) }) }), _jsx("section", { className: "py-16", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "text-3xl font-bold mb-4", children: "Our Platform" }), _jsx("p", { className: "text-lg text-content-secondary max-w-2xl mx-auto", children: "Discover our suite of AI-powered tools designed to enhance your creative process" })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-8", children: features.map((feature) => (_jsxs("div", { className: "backdrop-blur-sm bg-base-secondary/50 rounded-2xl p-6 border border-border dark:border-border-secondary hover:scale-105 transition-transform duration-300", children: [_jsx("div", { className: `inline-flex items-center justify-center p-3 bg-${feature.color}-500/10 rounded-xl mb-4`, children: _jsx(feature.icon, { className: `w-6 h-6 text-${feature.color}-500` }) }), _jsx("h3", { className: "text-xl font-semibold mb-2", children: feature.name }), _jsx("p", { className: "text-content-secondary", children: feature.description })] }, feature.name))) })] }) }), _jsx("section", { className: "py-16 bg-base-secondary/50", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("div", { className: "inline-flex items-center justify-center p-3 bg-interactive/10 rounded-xl mb-4", children: _jsx(Users, { className: "w-8 h-8 text-interactive" }) }), _jsx("h2", { className: "text-3xl font-bold mb-4", children: "Meet Our Team" }), _jsx("p", { className: "text-lg text-content-secondary max-w-2xl mx-auto", children: "The passionate individuals behind EntelVerse's innovation" })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-8", children: team.map((member) => (_jsxs("div", { className: "backdrop-blur-sm bg-base/50 rounded-2xl overflow-hidden border border-border dark:border-border-secondary hover:scale-105 transition-transform duration-300", children: [_jsxs("div", { className: "aspect-square relative", children: [_jsx("img", { src: member.image, alt: member.name, className: "object-cover w-full h-full" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" })] }), _jsxs("div", { className: "p-6", children: [_jsx("h3", { className: "text-xl font-semibold mb-1", children: member.name }), _jsx("p", { className: "text-interactive mb-2", children: member.role }), _jsx("p", { className: "text-content-secondary text-sm", children: member.bio })] })] }, member.name))) })] }) }), _jsx("section", { className: "py-16", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("div", { className: "inline-flex items-center justify-center p-3 bg-interactive/10 rounded-xl mb-4", children: _jsx(Sparkles, { className: "w-8 h-8 text-interactive" }) }), _jsx("h2", { className: "text-3xl font-bold mb-4", children: "What People Say" }), _jsx("p", { className: "text-lg text-content-secondary max-w-2xl mx-auto", children: "Hear from our community of creators" })] }), _jsx("div", { className: "grid md:grid-cols-2 gap-8", children: testimonials.map((testimonial, index) => (_jsxs("div", { className: "backdrop-blur-sm bg-base-secondary/50 rounded-2xl p-8 border border-border dark:border-border-secondary", children: [_jsxs("p", { className: "text-lg mb-6 italic", children: ["\"", testimonial.quote, "\""] }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold", children: testimonial.author }), _jsx("p", { className: "text-content-secondary", children: testimonial.role })] })] }, index))) })] }) }), _jsx("section", { className: "py-16 bg-base-secondary/50", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 text-center", children: [_jsx("div", { className: "inline-flex items-center justify-center p-3 bg-interactive/10 rounded-xl mb-4", children: _jsx(Rocket, { className: "w-8 h-8 text-interactive" }) }), _jsx("h2", { className: "text-3xl font-bold mb-4", children: "Ready to Start Creating?" }), _jsx("p", { className: "text-lg text-content-secondary max-w-2xl mx-auto mb-8", children: "Join our community of creators and experience the power of AI-enhanced creativity" }), _jsx("a", { href: "/signup", className: "inline-flex items-center justify-center px-8 py-4 bg-interactive hover:bg-interactive-hover text-base rounded-xl transition-colors", children: "Get Started Today" })] }) })] }));
}
