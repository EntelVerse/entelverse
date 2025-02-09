import React from 'react';
import { X } from 'lucide-react';
import { ChatInterface } from './ChatInterface';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  hub: {
    name: string;
    description: string;
    icon: React.ReactNode;
  };
}

export function ChatModal({ isOpen, onClose, hub }: ChatModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-base/70 dark:bg-base/70 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-gradient-to-br from-base-secondary/90 to-base/90 dark:from-base-secondary/90 dark:to-base/90 rounded-2xl shadow-2xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-content-tertiary hover:text-content transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          <ChatInterface hub={hub} />
        </div>
      </div>
    </div>
  );
}