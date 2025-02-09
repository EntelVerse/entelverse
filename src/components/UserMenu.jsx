import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User as UserIcon, ChevronDown } from 'lucide-react';
import { signOut } from '../lib/auth';
export function UserMenu({ user, profile, onSignOut }) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const handleSignOut = async () => {
        try {
            await signOut();
            onSignOut();
        }
        catch (error) {
            console.error('Error signing out:', error);
        }
    };
    return (<div className="relative" ref={menuRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-blue-500/30">
          {profile?.avatar_url ? (<img src={profile.avatar_url} alt={profile.full_name || 'User avatar'} className="w-full h-full object-cover" onError={(e) => {
                // Fallback to user icon if image fails to load
                const target = e.target;
                target.style.display = 'none';
                target.parentElement?.classList.add('bg-blue-500/20');
                target.parentElement?.appendChild((() => {
                    const div = document.createElement('div');
                    div.className = 'w-full h-full flex items-center justify-center';
                    div.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-400"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
                    return div;
                })());
            }}/>) : (<div className="w-full h-full bg-blue-500/20 flex items-center justify-center">
              <UserIcon size={20} className="text-blue-400"/>
            </div>)}
        </div>
        <ChevronDown size={16} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}/>
      </button>

      {isOpen && (<div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700">
          <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
            <p className="text-sm font-medium truncate">
              {profile?.full_name || 'User'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user.email}
            </p>
          </div>
          
          <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" onClick={() => setIsOpen(false)}>
            Profile
          </Link>
          
          <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" onClick={() => setIsOpen(false)}>
            Settings
          </Link>
          
          <button onClick={handleSignOut} className="w-full px-4 py-2 text-sm text-left text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            Sign Out
          </button>
        </div>)}
    </div>);
}
