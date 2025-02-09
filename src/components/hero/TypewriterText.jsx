import React, { useEffect, useState } from 'react';
const phrases = [
    'Make a song',
    'Generate AI visuals',
    'Create a video',
    'Build a website'
];
export function TypewriterText() {
    const [currentPhrase, setCurrentPhrase] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    useEffect(() => {
        const phrase = phrases[currentIndex];
        const timer = setTimeout(() => {
            if (!isDeleting) {
                if (currentPhrase.length < phrase.length) {
                    setCurrentPhrase(phrase.slice(0, currentPhrase.length + 1));
                }
                else {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            }
            else {
                if (currentPhrase.length === 0) {
                    setIsDeleting(false);
                    setCurrentIndex((current) => (current + 1) % phrases.length);
                }
                else {
                    setCurrentPhrase(phrase.slice(0, currentPhrase.length - 1));
                }
            }
        }, isDeleting ? 50 : 150);
        return () => clearTimeout(timer);
    }, [currentPhrase, currentIndex, isDeleting]);
    return (<span className="text-blue-600">
      {currentPhrase}
      <span className="animate-pulse">|</span>
    </span>);
}
