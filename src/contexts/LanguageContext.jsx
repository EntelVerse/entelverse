import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../lib/i18n/translations/en.json';
import es from '../lib/i18n/translations/es.json';
import fr from '../lib/i18n/translations/fr.json';
import tr from '../lib/i18n/translations/tr.json';
const LanguageContext = createContext(undefined);
const translations = {
    en,
    es,
    fr,
    tr
};
export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        const stored = localStorage.getItem('language');
        if (stored && ['en', 'es', 'fr', 'tr'].includes(stored)) {
            return stored;
        }
        return navigator.language.startsWith('es') ? 'es' :
            navigator.language.startsWith('fr') ? 'fr' :
                navigator.language.startsWith('tr') ? 'tr' : 'en';
    });
    useEffect(() => {
        localStorage.setItem('language', language);
        document.documentElement.lang = language;
    }, [language]);
    const t = (key) => {
        const keys = key.split('.');
        let value = translations[language];
        for (const k of keys) {
            value = value?.[k];
        }
        return value || key;
    };
    return (<LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>);
}
export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
