import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Mic, Upload, Send, Settings, Brain,
  Music, Image as ImageIcon, Video, Globe,
  ChevronDown, X
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'code' | 'audio';
  metadata?: {
    imageUrl?: string;
    codeLanguage?: string;
    audioUrl?: string;
  };
}

interface AIModel {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const aiModels: AIModel[] = [
  {
    id: 'entel',
    name: 'EntelAI',
    description: 'General-purpose AI assistant',
    icon: <Brain className="text-blue-500" />,
    color: 'blue'
  },
  {
    id: 'harmony',
    name: 'HarmonyGPT',
    description: 'Music creation assistant',
    icon: <Music className="text-indigo-500" />,
    color: 'indigo'
  },
  {
    id: 'chroma',
    name: 'ChromaGPT',
    description: 'Visual creation assistant',
    icon: <ImageIcon className="text-purple-500" />,
    color: 'purple'
  },
  {
    id: 'story',
    name: 'StoryForge',
    description: 'Video creation assistant',
    icon: <Video className="text-pink-500" />,
    color: 'pink'
  },
  {
    id: 'web',
    name: 'WebCrafter',
    description: 'Website creation assistant',
    icon: <Globe className="text-green-500" />,
    color: 'green'
  }
];

export function ChatPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState<AIModel>(aiModels[0]);
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const modelId = searchParams.get('model');
    if (modelId) {
      const model = aiModels.find(m => m.id === modelId);
      if (model) setSelectedModel(model);
    }
  }, [searchParams]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: Message = {
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
      const aiResponse: Message = {
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

  const handleModelChange = (model: AIModel) => {
    setSelectedModel(model);
    setIsModelMenuOpen(false);
    navigate(`/chat?model=${model.id}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="fixed top-16 left-20 right-0 h-16 bg-white border-b border-gray-100 z-40">
        <div className="h-full px-6 flex items-center justify-between">
          <div className="relative">
            <button
              onClick={() => setIsModelMenuOpen(!isModelMenuOpen)}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className={`p-2 bg-${selectedModel.color}-50 rounded-lg`}>
                {selectedModel.icon}
              </div>
              <div className="text-left">
                <h3 className="font-medium">{selectedModel.name}</h3>
                <p className="text-sm text-gray-500">{selectedModel.description}</p>
              </div>
              <ChevronDown
                size={20}
                className={`ml-2 text-gray-400 transition-transform ${
                  isModelMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isModelMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                {aiModels.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => handleModelChange(model)}
                    className={`w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                      selectedModel.id === model.id ? 'bg-gray-50' : ''
                    }`}
                  >
                    <div className={`p-2 bg-${model.color}-50 rounded-lg`}>
                      {model.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium">{model.name}</h3>
                      <p className="text-sm text-gray-500">{model.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => navigate('/settings')}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-6 py-4 ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p>{msg.content}</p>
                <span className="text-xs opacity-70 mt-2 block">
                  {msg.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl px-6 py-4">
                <div className="flex gap-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-20 right-0 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleRecording}
              className={`p-3 rounded-full transition-colors ${
                isRecording
                  ? 'bg-red-50 text-red-500'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Mic size={20} />
            </button>
            
            <button
              onClick={handleFileUpload}
              className="p-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Upload size={20} />
            </button>
            
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*,audio/*"
            />
            
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={`Message ${selectedModel.name}...`}
              className="flex-1 px-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}