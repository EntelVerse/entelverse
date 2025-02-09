import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import { getProfile } from '../lib/profile';
import { UserMenu } from './UserMenu';
import { ProfileModal } from './profile/ProfileModal';
import { Brain } from 'lucide-react';
import { signOut } from '../lib/auth';
export function Navigation() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    useEffect(() => {
        // Get initial auth state
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
            if (user) {
                getProfile(user).then(profile => setProfile(profile));
            }
        });
        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            if (currentUser) {
                const profile = await getProfile(currentUser);
                setProfile(profile);
            }
            else {
                setProfile(null);
            }
        });
        return () => subscription.unsubscribe();
    }, []);
    const handleSignOut = async () => {
        try {
            await signOut();
            setUser(null);
            setProfile(null);
            navigate('/signin');
        }
        catch (error) {
            console.error('Error signing out:', error);
        }
    };
    const navLinks = [
        { name: t('common.nav.home'), href: '/home' },
        { name: t('common.nav.chat'), href: '/chat' },
        { name: t('common.nav.price'), href: '/price' },
        { name: t('common.nav.about'), href: '/about' },
        { name: t('common.nav.contact'), href: '/contact' },
    ];
    return (_jsxs(_Fragment, { children: [_jsx("nav", { className: "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 border-b border-gray-100 dark:border-gray-800", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex justify-between h-16", children: [_jsx("div", { className: "flex items-center", children: _jsxs(Link, { to: "/", className: "flex items-center space-x-2 text-xl font-bold text-blue-600", children: [_jsx("div", { className: "flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg", children: _jsx(Brain, { size: 20, className: "text-white" }) }), _jsx("span", { children: "EntelVerse" })] }) }), _jsx("div", { className: "hidden md:flex items-center space-x-8", children: navLinks.map((link) => (_jsx(Link, { to: link.href, className: "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors", children: link.name }, link.name))) }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(ThemeToggle, {}), _jsx(LanguageSelector, {}), user ? (_jsxs(_Fragment, { children: [_jsx("button", { onClick: () => setIsProfileModalOpen(true), className: "p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" }), _jsx(UserMenu, { user: user, profile: profile, onSignOut: handleSignOut })] })) : (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/signin", className: "px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors", children: t('common.nav.signin') }), _jsx(Link, { to: "/signup", className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors", children: t('common.nav.signup') })] }))] })] }) }) }), isProfileModalOpen && (_jsx(ProfileModal, { isOpen: isProfileModalOpen, onClose: () => setIsProfileModalOpen(false) }))] }));
}
