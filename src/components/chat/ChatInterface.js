import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Send } from 'lucide-react';
export function ChatInterface({ hub }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const sendMessage = async () => {
        if (!input.trim())
            return;
        const newMessage = { role: 'user', content: input };
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
    return (_jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex items-center gap-4 mb-8", children: [_jsx("div", { className: "p-3 bg-interactive/20 dark:bg-interactive/10 rounded-xl", children: hub.icon }), _jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-content dark:text-content", children: hub.name }), _jsx("p", { className: "text-content-secondary dark:text-content-secondary", children: hub.description })] })] }), _jsxs("div", { className: "bg-base-secondary/50 dark:bg-base-secondary/20 rounded-xl p-4 min-h-[50vh] max-h-[60vh] mb-4 overflow-y-auto", children: [messages.map((msg, idx) => (_jsx("div", { className: `mb-4 ${msg.role === 'user' ? 'ml-auto text-right' : 'mr-auto'}`, children: _jsx("div", { className: `inline-block max-w-[80%] px-4 py-2 rounded-xl ${msg.role === 'user'
                                ? 'bg-interactive text-base dark:text-base'
                                : 'bg-base-tertiary dark:bg-base-tertiary text-content dark:text-content'}`, children: msg.content }) }, idx))), isTyping && (_jsxs("div", { className: "text-content-secondary dark:text-content-secondary", children: [hub.name, " is thinking..."] }))] }), _jsxs("div", { className: "flex gap-4", children: [_jsx("input", { type: "text", value: input, onChange: (e) => setInput(e.target.value), onKeyPress: (e) => e.key === 'Enter' && sendMessage(), placeholder: `Tell ${hub.name} what you'd like to create...`, className: "flex-1 bg-base-secondary/50 dark:bg-base-secondary/20 rounded-xl px-4 py-3 text-content dark:text-content placeholder-content-tertiary dark:placeholder-content-tertiary focus:outline-none focus:ring-2 focus:ring-interactive" }), _jsx("button", { onClick: sendMessage, className: "px-4 py-3 bg-interactive hover:bg-interactive-hover text-base dark:text-base rounded-xl transition-colors duration-300", children: _jsx(Send, { size: 20 }) })] })] }));
}
