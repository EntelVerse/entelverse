import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Monitor, ChevronDown } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const getIcon = () => {
        switch (theme) {
            case 'light':
                return <Sun size={20}/>;
            case 'dark':
                return <Moon size={20}/>;
            case 'system':
                return <Monitor size={20}/>;
        }
    };
    const getLabel = () => {
        switch (theme) {
            case 'light':
                return t('common.theme.light');
            case 'dark':
                return t('common.theme.dark');
            case 'system':
                return t('common.theme.system');
        }
    };
    return (<div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Theme settings">
        {getIcon()}
        <span className="hidden sm:inline">{getLabel()}</span>
        <ChevronDown size={16} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}/>
      </button>

      {isOpen && (<div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700">
          <button onClick={() => {
                setTheme('light');
                setIsOpen(false);
            }} className={`w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${theme === 'light' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>
            <Sun size={18}/>
            {t('common.theme.light')}
          </button>
          <button onClick={() => {
                setTheme('dark');
                setIsOpen(false);
            }} className={`w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${theme === 'dark' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>
            <Moon size={18}/>
            {t('common.theme.dark')}
          </button>
          <button onClick={() => {
                setTheme('system');
                setIsOpen(false);
            }} className={`w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${theme === 'system' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>
            <Monitor size={18}/>
            {t('common.theme.system')}
          </button>
        </div>)}
    </div>);
}
