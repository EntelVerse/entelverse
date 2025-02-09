import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  hub: {
    name: string;
    description: string;
    icon: React.ReactNode;
  };
}

export function ChatInterface({ hub }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { role: 'user', content: input };
    setMessages([...messages, newMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `I'd love to help you with ${hub.name}! What would you like to create?`
      }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-interactive/20 dark:bg-interactive/10 rounded-xl">
          {hub.icon}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-content dark:text-content">
            {hub.name}
          </h2>
          <p className="text-content-secondary dark:text-content-secondary">{hub.description}</p>
        </div>
      </div>

      {/* Chat messages */}
      <div className="bg-base-secondary/50 dark:bg-base-secondary/20 rounded-xl p-4 min-h-[50vh] max-h-[60vh] mb-4 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-4 ${
              msg.role === 'user' ? 'ml-auto text-right' : 'mr-auto'
            }`}
          >
            <div
              className={`inline-block max-w-[80%] px-4 py-2 rounded-xl ${
                msg.role === 'user'
                  ? 'bg-interactive text-base dark:text-base'
                  : 'bg-base-tertiary dark:bg-base-tertiary text-content dark:text-content'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="text-content-secondary dark:text-content-secondary">
            {hub.name} is thinking...
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="flex gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder={`Tell ${hub.name} what you'd like to create...`}
          className="flex-1 bg-base-secondary/50 dark:bg-base-secondary/20 rounded-xl px-4 py-3 text-content dark:text-content placeholder-content-tertiary dark:placeholder-content-tertiary focus:outline-none focus:ring-2 focus:ring-interactive"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-3 bg-interactive hover:bg-interactive-hover text-base dark:text-base rounded-xl transition-colors duration-300"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}