import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Music, Image, Video, Globe } from 'lucide-react';
import { ActionCard } from './ActionCard';
import { ChatModal } from '../chat/ChatModal';
import { useLanguage } from '../../contexts/LanguageContext';
const hubs = [
    {
        id: 'harmony',
        nameKey: 'features.harmony.name',
        descriptionKey: 'features.harmony.description',
        icon: _jsx(Music, { size: 32, className: "text-blue-400" }),
    },
    {
        id: 'chroma',
        nameKey: 'features.chroma.name',
        descriptionKey: 'features.chroma.description',
        icon: _jsx(Image, { size: 32, className: "text-blue-400" }),
    },
    {
        id: 'story',
        nameKey: 'features.story.name',
        descriptionKey: 'features.story.description',
        icon: _jsx(Video, { size: 32, className: "text-blue-400" }),
    },
    {
        id: 'web',
        nameKey: 'features.web.name',
        descriptionKey: 'features.web.description',
        icon: _jsx(Globe, { size: 32, className: "text-blue-400" }),
    },
];
export function FeatureSection() {
    const [activeHub, setActiveHub] = useState(null);
    const { t } = useLanguage();
    return (_jsxs("section", { className: "py-16 relative overflow-hidden", children: [_jsxs("div", { className: "absolute inset-0 backdrop-blur-[2px]", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-white/[0.02] to-black/[0.02] dark:from-black/[0.02] dark:to-white/[0.02]" }), _jsxs("div", { className: "absolute inset-0", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-radial from-blue-500/5 via-transparent to-transparent animate-pulse", style: { animationDuration: '3s' } }), _jsx("div", { className: "absolute inset-0 bg-gradient-radial from-purple-500/5 via-transparent to-transparent animate-pulse", style: { animationDuration: '4s' } })] })] }), _jsx("div", { className: "relative", children: _jsx("div", { className: "container mx-auto px-6", children: _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6", children: hubs.map((hub) => (_jsx("div", { onClick: () => setActiveHub(hub), children: _jsx(ActionCard, { title: t(hub.nameKey), description: t(hub.descriptionKey), icon: hub.icon, href: "#" }) }, hub.id))) }) }) }), _jsx(ChatModal, { isOpen: activeHub !== null, onClose: () => setActiveHub(null), hub: {
                    name: activeHub ? t(activeHub.nameKey) : '',
                    description: activeHub ? t(activeHub.descriptionKey) : '',
                    icon: activeHub?.icon
                } })] }));
}
