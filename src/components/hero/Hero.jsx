import React from 'react';
import { TypewriterText } from './TypewriterText';
import { SearchBar } from '../search/SearchBar';
import { useLanguage } from '../../contexts/LanguageContext';
export function Hero({ onSearch }) {
    const { t } = useLanguage();
    return (<div className="relative backdrop-blur-sm bg-white/5 dark:bg-black/5 rounded-2xl p-8 border border-white/10 dark:border-white/5">
      {/* Gradient background with reduced opacity in light mode */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-500/5 via-transparent to-transparent opacity-30 dark:opacity-50"/>
      
      <div className="relative text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-blue-100 dark:to-white drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)] dark:drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
            {t('hero.title')}
          </span>
          <br />
          <TypewriterText />
        </h1>
        
        {/* Improved subtitle contrast for light mode */}
        <p className="text-xl font-medium">
          <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 dark:from-blue-100 dark:via-white dark:to-blue-100 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
            {t('hero.subtitle')}
          </span>
        </p>
        
        <div>
          <SearchBar onSearch={onSearch}/>
        </div>
      </div>
    </div>);
}
