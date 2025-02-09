import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Hero } from './components/hero/Hero';
import { FeatureSection } from './components/features/FeatureSection';
// Lazy load pages for better performance
const SignInPage = lazy(() => import('./pages/auth/SignInPage').then(m => ({ default: m.SignInPage })));
const SignUpPage = lazy(() => import('./pages/auth/SignUpPage').then(m => ({ default: m.SignUpPage })));
const AccountVerificationPage = lazy(() => import('./pages/auth/AccountVerificationPage').then(m => ({ default: m.AccountVerificationPage })));
const VerifyEmailConfirmPage = lazy(() => import('./pages/auth/VerifyEmailConfirmPage').then(m => ({ default: m.VerifyEmailConfirmPage })));
const TodosPage = lazy(() => import('./pages/TodosPage').then(m => ({ default: m.TodosPage })));
const ContactPage = lazy(() => import('./pages/contact/ContactPage').then(m => ({ default: m.ContactPage })));
const AboutPage = lazy(() => import('./pages/about/AboutPage').then(m => ({ default: m.AboutPage })));
const ProfilePage = lazy(() => import('./pages/profile/ProfilePage').then(m => ({ default: m.ProfilePage })));
const NewChatPage = lazy(() => import('./pages/chat/NewChatPage').then(m => ({ default: m.NewChatPage })));
const SettingsPage = lazy(() => import('./pages/settings/SettingsPage').then(m => ({ default: m.SettingsPage })));
const HelpPage = lazy(() => import('./pages/help/HelpPage').then(m => ({ default: m.HelpPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));
const SubscriptionPage = lazy(() => import('./pages/subscription/SubscriptionPage').then(m => ({ default: m.SubscriptionPage })));
function App() {
    const handleSearch = (query) => {
        const q = query.toLowerCase();
        if (q.includes('song'))
            window.location.href = '/harmony-gpt';
        else if (q.includes('photo') || q.includes('visual'))
            window.location.href = '/vision-ai';
        else if (q.includes('video'))
            window.location.href = '/story-forge';
        else if (q.includes('website'))
            window.location.href = '/web-crafter';
    };
    return (_jsx(Suspense, { fallback: _jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsx("div", { className: "w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" }) }), children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Layout, { showDock: true, children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 space-y-16 py-12", children: [_jsx(Hero, { onSearch: handleSearch }), _jsx(FeatureSection, {})] }) }) }), _jsx(Route, { path: "/home", element: _jsx(Navigate, { to: "/", replace: true }) }), _jsx(Route, { path: "/signin", element: _jsx(Layout, { children: _jsx(SignInPage, {}) }) }), _jsx(Route, { path: "/signup", element: _jsx(Layout, { children: _jsx(SignUpPage, {}) }) }), _jsx(Route, { path: "/verify-email", element: _jsx(Layout, { children: _jsx(AccountVerificationPage, {}) }) }), _jsx(Route, { path: "/verify-email/confirm", element: _jsx(Layout, { children: _jsx(VerifyEmailConfirmPage, {}) }) }), _jsx(Route, { path: "/todos", element: _jsx(Layout, { showDock: true, children: _jsx(TodosPage, {}) }) }), _jsx(Route, { path: "/profile", element: _jsx(Layout, { showDock: true, children: _jsx(ProfilePage, {}) }) }), _jsx(Route, { path: "/settings", element: _jsx(Layout, { showDock: true, children: _jsx(SettingsPage, {}) }) }), _jsx(Route, { path: "/contact", element: _jsx(Layout, { showDock: true, children: _jsx(ContactPage, {}) }) }), _jsx(Route, { path: "/about", element: _jsx(Layout, { children: _jsx(AboutPage, {}) }) }), _jsx(Route, { path: "/chat", element: _jsx(Layout, { showDock: true, children: _jsx(NewChatPage, {}) }) }), _jsx(Route, { path: "/help", element: _jsx(Layout, { showDock: true, children: _jsx(HelpPage, {}) }) }), _jsx(Route, { path: "/subscription", element: _jsx(Layout, { showDock: true, children: _jsx(SubscriptionPage, {}) }) }), _jsx(Route, { path: "/price", element: _jsx(Navigate, { to: "/subscription", replace: true }) }), _jsx(Route, { path: "*", element: _jsx(Layout, { children: _jsx(NotFoundPage, {}) }) })] }) }));
}
export default App;
