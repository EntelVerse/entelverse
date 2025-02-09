import React from 'react';
import { Navigation } from '../Navigation';
import { Footer } from '../footer/Footer';
import { Dock } from '../dock/Dock';
export function Layout({ children, showDock = false }) {
    return (<div className="min-h-screen bg-base dark:bg-base text-content dark:text-content">
      {showDock && <Dock />}
      <div className={`${showDock ? 'ml-20 lg:ml-72' : ''}`}>
        <Navigation />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </div>
    </div>);
}
