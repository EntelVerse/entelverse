import React, { useState } from 'react';
import { Music, Image, Video, Globe } from 'lucide-react';
import { ActionCard } from './ActionCard';
import { ChatModal } from '../chat/ChatModal';
import { useLanguage } from '../../contexts/LanguageContext';
const hubs = [
    {
        id: 'harmony',
        nameKey: 'features.harmony.name',
        descriptionKey: 'features.harmony.description',
        icon: <Music size={32} className="text-blue-400"/>,
    },
    {
        id: 'chroma',
        nameKey: 'features.chroma.name',
        descriptionKey: 'features.chroma.description',
        icon: <Image size={32} className="text-blue-400"/>,
    },
    {
        id: 'story',
        nameKey: 'features.story.name',
        descriptionKey: 'features.story.description',
        icon: <Video size={32} className="text-blue-400"/>,
    },
    {
        id: 'web',
        nameKey: 'features.web.name',
        descriptionKey: 'features.web.description',
        icon: <Globe size={32} className="text-blue-400"/>,
    },
];
export function FeatureSection() {
    const [activeHub, setActiveHub] = useState(null);
    const { t } = useLanguage();
    return (<section className="py-16 relative overflow-hidden">
      {/* Glass effect container */}
      <div className="absolute inset-0 backdrop-blur-[2px]">
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-black/[0.02] dark:from-black/[0.02] dark:to-white/[0.02]"/>
        
        {/* Subtle animated glow */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-radial from-blue-500/5 via-transparent to-transparent animate-pulse" style={{ animationDuration: '3s' }}/>
          <div className="absolute inset-0 bg-gradient-radial from-purple-500/5 via-transparent to-transparent animate-pulse" style={{ animationDuration: '4s' }}/>
        </div>
      </div>
      
      {/* Content container with its own glass effect */}
      <div className="relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hubs.map((hub) => (<div key={hub.id} onClick={() => setActiveHub(hub)}>
                <ActionCard title={t(hub.nameKey)} description={t(hub.descriptionKey)} icon={hub.icon} href="#"/>
              </div>))}
          </div>
        </div>
      </div>

      <ChatModal isOpen={activeHub !== null} onClose={() => setActiveHub(null)} hub={{
            name: activeHub ? t(activeHub.nameKey) : '',
            description: activeHub ? t(activeHub.descriptionKey) : '',
            icon: activeHub?.icon
        }}/>
    </section>);
}
