import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Send, Music } from 'lucide-react';
export function HarmonyGPTPage() {
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
        // Simulate AI response (replace with actual API call)
        setTimeout(() => {
            setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: 'I\'d love to help you create music! What style or artist inspires you?'
                }]);
            setIsTyping(false);
        }, 1000);
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-gray-900 to-black text-white", children: _jsxs("div", { className: "max-w-4xl mx-auto px-4 py-8", children: [_jsxs("div", { className: "flex items-center gap-4 mb-8", children: [_jsx("div", { className: "p-3 bg-blue-500/20 rounded-xl", children: _jsx(Music, { size: 32, className: "text-blue-400" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent", children: "HarmonyGPT" }), _jsx("p", { className: "text-gray-400", children: "Your AI music collaboration partner" })] })] }), _jsxs("div", { className: "bg-gray-800/50 rounded-xl p-4 min-h-[60vh] mb-4 overflow-y-auto", children: [messages.map((msg, idx) => (_jsx("div", { className: `mb-4 ${msg.role === 'user' ? 'ml-auto text-right' : 'mr-auto'}`, children: _jsx("div", { className: `inline-block max-w-[80%] px-4 py-2 rounded-xl ${msg.role === 'user'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-700 text-gray-100'}`, children: msg.content }) }, idx))), isTyping && (_jsx("div", { className: "text-gray-400", children: "HarmonyGPT is composing a response..." }))] }), _jsxs("div", { className: "flex gap-4", children: [_jsx("input", { type: "text", value: input, onChange: (e) => setInput(e.target.value), onKeyPress: (e) => e.key === 'Enter' && sendMessage(), placeholder: "Describe your musical vision...", className: "flex-1 bg-gray-800/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" }), _jsx("button", { onClick: sendMessage, className: "px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors duration-300", children: _jsx(Send, { size: 20 }) })] })] }) }));
}
