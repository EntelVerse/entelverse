import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Mic, Upload, Send, Settings, Brain, Music, Image as ImageIcon, Video, Globe, ChevronDown } from 'lucide-react';
const aiModels = [
    {
        id: 'entel',
        name: 'EntelAI',
        description: 'General-purpose AI assistant',
        icon: _jsx(Brain, { className: "text-blue-500" }),
        color: 'blue'
    },
    {
        id: 'harmony',
        name: 'HarmonyGPT',
        description: 'Music creation assistant',
        icon: _jsx(Music, { className: "text-indigo-500" }),
        color: 'indigo'
    },
    {
        id: 'chroma',
        name: 'ChromaGPT',
        description: 'Visual creation assistant',
        icon: _jsx(ImageIcon, { className: "text-purple-500" }),
        color: 'purple'
    },
    {
        id: 'story',
        name: 'StoryForge',
        description: 'Video creation assistant',
        icon: _jsx(Video, { className: "text-pink-500" }),
        color: 'pink'
    },
    {
        id: 'web',
        name: 'WebCrafter',
        description: 'Website creation assistant',
        icon: _jsx(Globe, { className: "text-green-500" }),
        color: 'green'
    }
];
export function ChatPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [selectedModel, setSelectedModel] = useState(aiModels[0]);
    const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);
    useEffect(() => {
        const modelId = searchParams.get('model');
        if (modelId) {
            const model = aiModels.find(m => m.id === modelId);
            if (model)
                setSelectedModel(model);
        }
    }, [searchParams]);
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const handleSend = async () => {
        if (!input.trim())
            return;
        const newMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date(),
            type: 'text'
        };
        setMessages(prev => [...prev, newMessage]);
        setInput('');
        setIsTyping(true);
        // Simulate AI response
        setTimeout(() => {
            const aiResponse = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: `I'm ${selectedModel.name}, and I'll help you with that!`,
                timestamp: new Date(),
                type: 'text'
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1000);
    };
    const handleFileUpload = () => {
        fileInputRef.current?.click();
    };
    const toggleRecording = () => {
        setIsRecording(!isRecording);
        // Implement voice recording logic here
    };
    const handleModelChange = (model) => {
        setSelectedModel(model);
        setIsModelMenuOpen(false);
        navigate(`/chat?model=${model.id}`);
    };
    return (_jsxs("div", { className: "min-h-screen bg-white", children: [_jsx("div", { className: "fixed top-16 left-20 right-0 h-16 bg-white border-b border-gray-100 z-40", children: _jsxs("div", { className: "h-full px-6 flex items-center justify-between", children: [_jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => setIsModelMenuOpen(!isModelMenuOpen), className: "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors", children: [_jsx("div", { className: `p-2 bg-${selectedModel.color}-50 rounded-lg`, children: selectedModel.icon }), _jsxs("div", { className: "text-left", children: [_jsx("h3", { className: "font-medium", children: selectedModel.name }), _jsx("p", { className: "text-sm text-gray-500", children: selectedModel.description })] }), _jsx(ChevronDown, { size: 20, className: `ml-2 text-gray-400 transition-transform ${isModelMenuOpen ? 'rotate-180' : ''}` })] }), isModelMenuOpen && (_jsx("div", { className: "absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2", children: aiModels.map((model) => (_jsxs("button", { onClick: () => handleModelChange(model), className: `w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-50 transition-colors ${selectedModel.id === model.id ? 'bg-gray-50' : ''}`, children: [_jsx("div", { className: `p-2 bg-${model.color}-50 rounded-lg`, children: model.icon }), _jsxs("div", { className: "text-left", children: [_jsx("h3", { className: "font-medium", children: model.name }), _jsx("p", { className: "text-sm text-gray-500", children: model.description })] })] }, model.id))) }))] }), _jsx("button", { onClick: () => navigate('/settings'), className: "p-2 text-gray-400 hover:text-gray-600 transition-colors", children: _jsx(Settings, { size: 20 }) })] }) }), _jsx("div", { className: "pt-32 pb-24 px-6", children: _jsxs("div", { className: "max-w-4xl mx-auto space-y-6", children: [messages.map((msg) => (_jsx("div", { className: `flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`, children: _jsxs("div", { className: `max-w-[80%] rounded-2xl px-6 py-4 ${msg.role === 'user'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-900'}`, children: [_jsx("p", { children: msg.content }), _jsx("span", { className: "text-xs opacity-70 mt-2 block", children: msg.timestamp.toLocaleTimeString() })] }) }, msg.id))), isTyping && (_jsx("div", { className: "flex justify-start", children: _jsx("div", { className: "bg-gray-100 rounded-2xl px-6 py-4", children: _jsxs("div", { className: "flex gap-2", children: [_jsx("span", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce" }), _jsx("span", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" }), _jsx("span", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" })] }) }) })), _jsx("div", { ref: messagesEndRef })] }) }), _jsx("div", { className: "fixed bottom-0 left-20 right-0 bg-white border-t border-gray-100", children: _jsx("div", { className: "max-w-4xl mx-auto px-6 py-4", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("button", { onClick: toggleRecording, className: `p-3 rounded-full transition-colors ${isRecording
                                    ? 'bg-red-50 text-red-500'
                                    : 'text-gray-400 hover:text-gray-600'}`, children: _jsx(Mic, { size: 20 }) }), _jsx("button", { onClick: handleFileUpload, className: "p-3 text-gray-400 hover:text-gray-600 transition-colors", children: _jsx(Upload, { size: 20 }) }), _jsx("input", { type: "file", ref: fileInputRef, className: "hidden", accept: "image/*,audio/*" }), _jsx("input", { type: "text", value: input, onChange: (e) => setInput(e.target.value), onKeyPress: (e) => e.key === 'Enter' && handleSend(), placeholder: `Message ${selectedModel.name}...`, className: "flex-1 px-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" }), _jsx("button", { onClick: handleSend, disabled: !input.trim(), className: "p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed", children: _jsx(Send, { size: 20 }) })] }) }) })] }));
}
