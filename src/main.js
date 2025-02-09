import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import App from './App';
import './styles/theme.css';
import './index.css';
const rootElement = document.getElementById('root');
if (!rootElement)
    throw new Error('Failed to find the root element');
createRoot(rootElement).render(_jsx(StrictMode, { children: _jsx(BrowserRouter, { future: {
            v7_startTransition: true,
            v7_relativeSplatPath: true,
        }, children: _jsx(ThemeProvider, { children: _jsx(LanguageProvider, { children: _jsx(App, {}) }) }) }) }));
