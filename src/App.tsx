import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
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
  const handleSearch = (query: string) => {
    const q = query.toLowerCase();
    if (q.includes('song')) window.location.href = '/harmony-gpt';
    else if (q.includes('photo') || q.includes('visual')) window.location.href = '/vision-ai';
    else if (q.includes('video')) window.location.href = '/story-forge';
    else if (q.includes('website')) window.location.href = '/web-crafter';
  };

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <Routes>
        {/* Home route */}
        <Route
          path="/"
          element={
            <Layout showDock>
              <div className="max-w-7xl mx-auto px-4 space-y-16 py-12">
                <Hero onSearch={handleSearch} />
                <FeatureSection />
              </div>
            </Layout>
          }
        />

        {/* Redirect /home to / */}
        <Route path="/home" element={<Navigate to="/" replace />} />

        {/* Auth routes */}
        <Route path="/signin" element={<Layout><SignInPage /></Layout>} />
        <Route path="/signup" element={<Layout><SignUpPage /></Layout>} />
        <Route path="/verify-email" element={<Layout><AccountVerificationPage /></Layout>} />
        <Route path="/verify-email/confirm" element={<Layout><VerifyEmailConfirmPage /></Layout>} />

        {/* Protected routes */}
        <Route path="/todos" element={<Layout showDock><TodosPage /></Layout>} />
        <Route path="/profile" element={<Layout showDock><ProfilePage /></Layout>} />
        <Route path="/settings" element={<Layout showDock><SettingsPage /></Layout>} />

        {/* Public routes */}
        <Route path="/contact" element={<Layout showDock><ContactPage /></Layout>} />
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />
        <Route path="/chat" element={<Layout showDock><NewChatPage /></Layout>} />
        <Route path="/help" element={<Layout showDock><HelpPage /></Layout>} />
        <Route path="/subscription" element={<Layout showDock><SubscriptionPage /></Layout>} />
        <Route path="/price" element={<Navigate to="/subscription" replace />} />

        {/* 404 route */}
        <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
      </Routes>
    </Suspense>
  );
}

export default App;