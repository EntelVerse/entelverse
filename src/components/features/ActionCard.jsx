import React from 'react';
export function ActionCard({ title, description, icon }) {
    return (<div className="group relative overflow-hidden backdrop-blur-sm rounded-2xl p-6 transition-all duration-300 hover:scale-105 border border-white/10 dark:border-white/5 cursor-pointer">
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-white/[0.02] dark:bg-black/[0.02] backdrop-blur-md"/>
      
      {/* Gradient hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
      
      {/* Content */}
      <div className="relative flex flex-col items-center text-center space-y-4">
        {/* Icon container */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-colors duration-300">
          {icon}
        </div>
        
        {/* Title with enhanced readability */}
        <h3 className="text-xl font-semibold">
          <span className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-white dark:to-blue-100 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)] dark:drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
            {title}
          </span>
        </h3>
        
        {/* Description with improved contrast */}
        <p className="text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
          <span className="drop-shadow-[0_0.5px_0.5px_rgba(255,255,255,0.5)] dark:drop-shadow-[0_0.5px_0.5px_rgba(0,0,0,0.5)]">
            {description}
          </span>
        </p>
        
        {/* Bottom highlight */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500/50 to-purple-500/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"/>
      </div>
    </div>);
}
