import { useState, useEffect } from 'react';
const suggestions = [
    'Type your goal (e.g., Create a song)',
    'Generate AI visuals',
    'Create a stunning video',
    'Build your dream website'
];
export function useSearchSuggestions() {
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((current) => (current + 1) % suggestions.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);
    return suggestions[currentIndex];
}
