import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Settings, HelpCircle, CreditCard, LogOut, Plus, Brain, Github, Linkedin, Instagram, Twitter, Mail } from 'lucide-react';
import { ChatHistory } from './ChatHistory';
import { useTheme } from '../../contexts/ThemeContext';
import { supabase } from '../../lib/supabase';
import { signOut } from '../../lib/auth';
const STORAGE_KEY = 'entelverse_chats';
const socialLinks = [
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/entelverse/',
        icon: _jsx(Linkedin, { size: 20, className: "text-[#0077B5]" })
    },
    {
        name: 'Instagram',
        href: 'https://www.instagram.com/entelverse/',
        icon: _jsx(Instagram, { size: 20, className: "text-[#E4405F]" })
    },
    {
        name: 'Twitter',
        href: 'https://x.com/EntelVerse',
        icon: _jsx(Twitter, { size: 20, className: "text-gray-700 dark:text-gray-300" })
    },
    {
        name: 'GitHub',
        href: 'https://github.com/EntelVerse',
        icon: _jsx(Github, { size: 20, className: "text-gray-900 dark:text-gray-100" })
    },
    {
        name: 'Email',
        href: 'mailto:contact@entelverse.com',
        icon: _jsx(Mail, { size: 20, className: "text-gray-700 dark:text-gray-300" })
    }
];
export function Dock() {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const [isExpanded, setIsExpanded] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isPinned, setIsPinned] = useState(() => {
        const stored = localStorage.getItem('dockPinned');
        return stored ? JSON.parse(stored) : false;
    });
    const [chats, setChats] = useState([]);
    const [user, setUser] = useState(null);
    const dockRef = useRef(null);
    const searchInputRef = useRef(null);
    const expandTimeoutRef = useRef();
    const collapseTimeoutRef = useRef();
    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user || null);
        });
        return () => subscription.unsubscribe();
    }, []);
    useEffect(() => {
        const savedChats = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        setChats(savedChats);
    }, []);
    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/signin');
        }
        catch (error) {
            console.error('Error signing out:', error);
        }
    };
    const handleNewChat = () => {
        navigate('/chat');
    };
    return (_jsxs("div", { ref: dockRef, className: `fixed left-0 top-16 h-[calc(100vh-4rem)] transition-all duration-300 flex flex-col ${isExpanded ? 'w-72' : 'w-20'} ${theme === 'dark'
            ? 'bg-gradient-to-b from-gray-900 to-black border-r border-white/10'
            : 'bg-white border-r border-gray-200 shadow-lg'}`, children: [_jsx("div", { className: "p-4 border-b border-gray-200 dark:border-white/10", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center", children: _jsx(Brain, { size: 20, className: "text-blue-400" }) }), isExpanded && (_jsxs("div", { className: "overflow-hidden", children: [_jsx("div", { className: "text-sm font-medium text-gray-900 dark:text-gray-300 truncate", children: "EntelVerse" }), _jsx("div", { className: "text-xs text-gray-500", children: "Free Plan" })] }))] }) }), _jsxs("button", { onClick: handleNewChat, className: "mx-4 mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2 text-white", children: [_jsx(Plus, { size: 20 }), isExpanded && _jsx("span", { children: "New Chat" })] }), _jsx("div", { className: "flex-1 overflow-y-auto mt-4", children: _jsx(ChatHistory, { isExpanded: isExpanded, searchQuery: searchQuery, chats: chats, onSelectChat: (chat) => navigate(`/chat?id=${chat.id}`), onDeleteChat: () => { }, onRenameChat: () => { } }) }), _jsxs("div", { className: "border-t border-gray-200 dark:border-white/10 p-4 space-y-2", children: [_jsxs(Link, { to: "/settings", className: "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-gray-700 dark:text-gray-300", children: [_jsx(Settings, { size: 20 }), isExpanded && _jsx("span", { children: "Settings" })] }), _jsxs(Link, { to: "/help", className: "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-gray-700 dark:text-gray-300", children: [_jsx(HelpCircle, { size: 20 }), isExpanded && _jsx("span", { children: "Help" })] }), _jsxs(Link, { to: "/subscription", className: "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-gray-700 dark:text-gray-300", children: [_jsx(CreditCard, { size: 20 }), isExpanded && _jsx("span", { children: "Subscription" })] }), user ? (_jsxs("button", { onClick: handleSignOut, className: "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-red-600 dark:text-red-400 w-full", children: [_jsx(LogOut, { size: 20 }), isExpanded && _jsx("span", { children: "Sign Out" })] })) : (_jsxs(Link, { to: "/signin", className: "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors text-blue-600 dark:text-blue-400", children: [_jsx(LogOut, { size: 20 }), isExpanded && _jsx("span", { children: "Sign In" })] }))] }), _jsx("div", { className: "border-t border-gray-200 dark:border-white/10 p-4", children: _jsx("div", { className: `flex ${isExpanded ? 'justify-between' : 'flex-col'} gap-3`, children: socialLinks.map((link) => (_jsx("a", { href: link.href, target: "_blank", rel: "noopener noreferrer", className: "p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors", title: link.name, children: link.icon }, link.name))) }) })] }));
}
