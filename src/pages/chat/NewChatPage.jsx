import React, { useState, useRef, useEffect } from 'react';
import { Mic, Upload, Send, Image as ImageIcon, Brain, MessageSquare, Settings, HelpCircle, Music, Video, Globe, Loader2 } from 'lucide-react';
const aiAgents = [
    {
        id: 'entel',
        name: 'EntelAI',
        description: 'Advanced AI assistant',
        icon: <Brain className="text-blue-500"/>,
        capabilities: ['Text', 'Code', 'Analysis'],
        color: 'blue'
    },
    {
        id: 'harmony',
        name: 'HarmonyGPT',
        description: 'Music creation assistant',
        icon: <Music className="text-indigo-500"/>,
        capabilities: ['Music', 'Audio', 'Lyrics'],
        color: 'indigo'
    },
    {
        id: 'chroma',
        name: 'ChromaGPT',
        description: 'Visual creation assistant',
        icon: <ImageIcon className="text-purple-500"/>,
        capabilities: ['Images', 'Design', 'Art'],
        color: 'purple'
    },
    {
        id: 'story',
        name: 'StoryForge',
        description: 'Video creation assistant',
        icon: <Video className="text-pink-500"/>,
        capabilities: ['Video', 'Animation', 'Editing'],
        color: 'pink'
    },
    {
        id: 'web',
        name: 'WebCrafter',
        description: 'Website creation assistant',
        icon: <Globe className="text-green-500"/>,
        capabilities: ['Web', 'UI/UX', 'Code'],
        color: 'green'
    }
];
const STORAGE_KEY = 'entelverse_chats';
export function NewChatPage() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState(aiAgents[0]);
    const [isRecording, setIsRecording] = useState(false);
    const [currentChatId, setCurrentChatId] = useState(null);
    const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
    const [mediaStream, setMediaStream] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const chatId = urlParams.get('id');
        const modelId = urlParams.get('model');
        if (modelId) {
            const agent = aiAgents.find(a => a.id === modelId);
            if (agent)
                setSelectedAgent(agent);
        }
        if (chatId) {
            loadChat(chatId);
        }
        else {
            const newChatId = Date.now().toString();
            setCurrentChatId(newChatId);
            saveChat({
                id: newChatId,
                title: `Chat with ${selectedAgent.name}`,
                preview: '',
                date: new Date().toLocaleString(),
                messages: []
            });
        }
    }, [selectedAgent.name]);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const loadChat = (chatId) => {
        const savedChats = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const chat = savedChats.find(c => c.id === chatId);
        if (chat) {
            setMessages(chat.messages);
            setCurrentChatId(chatId);
        }
    };
    const saveChat = (chat) => {
        const savedChats = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const existingIndex = savedChats.findIndex(c => c.id === chat.id);
        if (existingIndex >= 0) {
            savedChats[existingIndex] = chat;
        }
        else {
            savedChats.unshift(chat);
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedChats));
    };
    const updateCurrentChat = (newMessages) => {
        if (!currentChatId)
            return;
        const preview = newMessages[newMessages.length - 1]?.content.slice(0, 50) + '...' || '';
        saveChat({
            id: currentChatId,
            title: `Chat with ${selectedAgent.name}`,
            preview,
            date: new Date().toLocaleString(),
            messages: newMessages
        });
    };
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setMediaStream(stream);
            const mediaRecorder = new MediaRecorder(stream);
            const audioChunks = [];
            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };
            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                setAudioBlob(audioBlob);
                handleAudioMessage(audioBlob);
            };
            mediaRecorderRef.current = mediaRecorder;
            mediaRecorder.start();
            setIsRecording(true);
        }
        catch (error) {
            console.error('Error accessing microphone:', error);
            // Handle microphone access error
        }
    };
    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            mediaStream?.getTracks().forEach(track => track.stop());
            setMediaStream(null);
            setIsRecording(false);
        }
    };
    const handleAudioMessage = async (blob) => {
        const audioUrl = URL.createObjectURL(blob);
        const newMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: 'Audio message',
            timestamp: new Date(),
            type: 'audio',
            metadata: {
                audioUrl
            }
        };
        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        updateCurrentChat(updatedMessages);
        // Fix for the simulateResponse function
        simulateResponse('I received your audio message and I am processing it.');
    };
    const handleFileUpload = async (event) => {
        const file = event.target.files?.[0];
        if (!file)
            return;
        setIsUploading(true);
        try {
            // Here you would typically upload the file to your storage
            const fileUrl = URL.createObjectURL(file);
            const newMessage = {
                id: Date.now().toString(),
                role: 'user',
                content: `Uploaded file: ${file.name}`,
                timestamp: new Date(),
                type: 'file',
                metadata: {
                    fileName: file.name,
                    fileType: file.type,
                    fileUrl
                }
            };
            const updatedMessages = [...messages, newMessage];
            setMessages(updatedMessages);
            updateCurrentChat(updatedMessages);
            simulateResponse(`I received your file "${file.name}" and I'm analyzing it.`);
        }
        catch (error) {
            console.error('Error uploading file:', error);
            // Handle upload error
        }
        finally {
            setIsUploading(false);
        }
    };
    const simulateResponse = (content) => {
        setIsTyping(true);
        setTimeout(() => {
            const aiResponse = {
                id: Date.now().toString(),
                role: 'assistant',
                content,
                timestamp: new Date(),
                type: 'text'
            };
            const updatedMessages = [...messages, aiResponse];
            setMessages(updatedMessages);
            updateCurrentChat(updatedMessages);
            setIsTyping(false);
        }, 1500);
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
        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        updateCurrentChat(updatedMessages);
        setInput('');
        simulateResponse(`I'm ${selectedAgent.name}, and I'll help you with that!`);
    };
    const toggleRecording = () => {
        if (isRecording) {
            stopRecording();
        }
        else {
            startRecording();
        }
    };
    const renderMessage = (msg) => {
        const isUser = msg.role === 'user';
        return (<div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
        <div className={`max-w-[70%] rounded-2xl px-6 py-4 ${isUser
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-900'}`}>
          {msg.type === 'audio' && msg.metadata?.audioUrl && (<audio controls className="mb-2">
              <source src={msg.metadata.audioUrl} type="audio/wav"/>
            </audio>)}
          {msg.type === 'file' && msg.metadata?.fileUrl && (<div className="mb-2">
              {msg.metadata.fileType?.startsWith('image/') ? (<img src={msg.metadata.fileUrl} alt={msg.metadata.fileName} className="max-w-full rounded-lg"/>) : (<a href={msg.metadata.fileUrl} download={msg.metadata.fileName} className="flex items-center gap-2 text-current hover:underline">
                  <Upload size={20}/>
                  {msg.metadata.fileName}
                </a>)}
            </div>)}
          <p>{msg.content}</p>
          <span className="text-xs opacity-70 mt-2 block">
            {new Date(msg.timestamp).toLocaleTimeString()}
          </span>
        </div>
      </div>);
    };
    return (<div className="flex flex-col h-[calc(100vh-4rem)] bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="relative">
          <button onClick={() => setIsModelMenuOpen(!isModelMenuOpen)} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className={`p-2 bg-${selectedAgent.color}-50 rounded-lg`}>
              {selectedAgent.icon}
            </div>
            <div className="text-left">
              <h1 className="text-xl font-semibold text-gray-900">
                {selectedAgent.name}
              </h1>
              <p className="text-sm text-gray-500">
                {selectedAgent.description}
              </p>
            </div>
          </button>

          {isModelMenuOpen && (<div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
              {aiAgents.map((agent) => (<button key={agent.id} onClick={() => {
                    setSelectedAgent(agent);
                    setIsModelMenuOpen(false);
                }} className={`w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-50 transition-colors ${selectedAgent.id === agent.id ? 'bg-gray-50' : ''}`}>
                  <div className={`p-2 bg-${agent.color}-50 rounded-lg`}>
                    {agent.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">{agent.name}</h3>
                    <p className="text-sm text-gray-500">{agent.description}</p>
                  </div>
                </button>))}
            </div>)}
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
            <MessageSquare size={20}/>
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
            <Settings size={20}/>
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
            <HelpCircle size={20}/>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
        {messages.map(renderMessage)}
        {isTyping && (<div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl px-6 py-4">
              <div className="flex gap-2">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"/>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"/>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"/>
              </div>
            </div>
          </div>)}
        <div ref={messagesEndRef}/>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-100 px-6 py-4">
        <div className="flex items-center gap-4">
          <button onClick={toggleRecording} className={`p-3 rounded-full transition-colors ${isRecording
            ? 'bg-red-50 text-red-500 animate-pulse'
            : 'text-gray-500 hover:text-gray-700'}`} title={isRecording ? 'Stop recording' : 'Start recording'}>
            <Mic size={20}/>
          </button>
          
          <button onClick={() => fileInputRef.current?.click()} className="p-3 text-gray-500 hover:text-gray-700 transition-colors" disabled={isUploading}>
            {isUploading ? (<Loader2 size={20} className="animate-spin"/>) : (<Upload size={20}/>)}
          </button>
          
          <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} accept="image/*,audio/*,video/*,application/pdf"/>
          
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder={`Message ${selectedAgent.name}...`} className="flex-1 px-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          
          <button onClick={handleSend} disabled={!input.trim()} className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <Send size={20}/>
          </button>
        </div>
      </div>
    </div>);
}
