import React, { useState, useEffect, useRef } from 'react';
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
        icon: <Linkedin size={20} className="text-[#0077B5]"/>
    },
    {
        name: 'Instagram',
        href: 'https://www.instagram.com/entelverse/',
        icon: <Instagram size={20} className="text-[#E4405F]"/>
    },
    {
        name: 'Twitter',
        href: 'https://x.com/EntelVerse',
        icon: <Twitter size={20} className="text-gray-700 dark:text-gray-300"/>
    },
    {
        name: 'GitHub',
        href: 'https://github.com/EntelVerse',
        icon: <Github size={20} className="text-gray-900 dark:text-gray-100"/>
    },
    {
        name: 'Email',
        href: 'mailto:contact@entelverse.com',
        icon: <Mail size={20} className="text-gray-700 dark:text-gray-300"/>
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
    return (<div ref={dockRef} className={`fixed left-0 top-16 h-[calc(100vh-4rem)] transition-all duration-300 flex flex-col ${isExpanded ? 'w-72' : 'w-20'} ${theme === 'dark'
            ? 'bg-gradient-to-b from-gray-900 to-black border-r border-white/10'
            : 'bg-white border-r border-gray-200 shadow-lg'}`}>
      {/* Profile section */}
      <div className="p-4 border-b border-gray-200 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
            <Brain size={20} className="text-blue-400"/>
          </div>
          {isExpanded && (<div className="overflow-hidden">
              <div className="text-sm font-medium text-gray-900 dark:text-gray-300 truncate">
                EntelVerse
              </div>
              <div className="text-xs text-gray-500">Free Plan</div>
            </div>)}
        </div>
      </div>

      {/* New Chat button */}
      <button onClick={handleNewChat} className="mx-4 mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2 text-white">
        <Plus size={20}/>
        {isExpanded && <span>New Chat</span>}
      </button>

      {/* Chat history */}
      <div className="flex-1 overflow-y-auto mt-4">
        <ChatHistory isExpanded={isExpanded} searchQuery={searchQuery} chats={chats} onSelectChat={(chat) => navigate(`/chat?id=${chat.id}`)} onDeleteChat={() => { }} onRenameChat={() => { }}/>
      </div>

      {/* Navigation links */}
      <div className="border-t border-gray-200 dark:border-white/10 p-4 space-y-2">
        <Link to="/settings" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-gray-700 dark:text-gray-300">
          <Settings size={20}/>
          {isExpanded && <span>Settings</span>}
        </Link>
        
        <Link to="/help" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-gray-700 dark:text-gray-300">
          <HelpCircle size={20}/>
          {isExpanded && <span>Help</span>}
        </Link>
        
        <Link to="/subscription" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-gray-700 dark:text-gray-300">
          <CreditCard size={20}/>
          {isExpanded && <span>Subscription</span>}
        </Link>

        {user ? (<button onClick={handleSignOut} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-red-600 dark:text-red-400 w-full">
            <LogOut size={20}/>
            {isExpanded && <span>Sign Out</span>}
          </button>) : (<Link to="/signin" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors text-blue-600 dark:text-blue-400">
            <LogOut size={20}/>
            {isExpanded && <span>Sign In</span>}
          </Link>)}
      </div>

      {/* Social links */}
      <div className="border-t border-gray-200 dark:border-white/10 p-4">
        <div className={`flex ${isExpanded ? 'justify-between' : 'flex-col'} gap-3`}>
          {socialLinks.map((link) => (<a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors" title={link.name}>
              {link.icon}
            </a>))}
        </div>
      </div>
    </div>);
}
