import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { MessageSquare, Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export function ChatHistory({ isExpanded, searchQuery, chats, onSelectChat, onDeleteChat, onRenameChat }) {
    const navigate = useNavigate();
    const [editingChatId, setEditingChatId] = React.useState(null);
    const [newTitle, setNewTitle] = React.useState('');
    const filteredChats = chats.filter(chat => chat.title.toLowerCase().includes(searchQuery.toLowerCase()));
    const handleStartRename = (chat) => {
        setEditingChatId(chat.id);
        setNewTitle(chat.title);
    };
    const handleFinishRename = (chatId) => {
        if (newTitle.trim()) {
            onRenameChat(chatId, newTitle.trim());
        }
        setEditingChatId(null);
        setNewTitle('');
    };
    if (!isExpanded) {
        return (_jsx("div", { className: "px-2", children: filteredChats.map(chat => (_jsx("button", { onClick: () => onSelectChat(chat), className: "w-full p-2 rounded-lg hover:bg-gray-800/50 transition-colors", children: _jsx(MessageSquare, { size: 20, className: "text-gray-400" }) }, chat.id))) }));
    }
    return (_jsxs("div", { className: "px-4 space-y-2", children: [filteredChats.map(chat => (_jsxs("div", { className: "group relative w-full p-4 rounded-lg hover:bg-gray-800/50 transition-colors", children: [editingChatId === chat.id ? (_jsx("div", { className: "flex items-center gap-2", children: _jsx("input", { type: "text", value: newTitle, onChange: (e) => setNewTitle(e.target.value), onBlur: () => handleFinishRename(chat.id), onKeyPress: (e) => e.key === 'Enter' && handleFinishRename(chat.id), className: "flex-1 bg-gray-700 rounded px-2 py-1 text-white", autoFocus: true }) })) : (_jsx("button", { onClick: () => onSelectChat(chat), className: "w-full text-left", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(MessageSquare, { size: 20, className: "text-gray-400" }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("div", { className: "font-medium truncate", children: chat.title }), _jsx("div", { className: "text-sm text-gray-400 truncate", children: chat.preview })] }), _jsx("div", { className: "text-xs text-gray-400", children: chat.date })] }) })), _jsxs("div", { className: "absolute right-2 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-1", children: [_jsx("button", { onClick: () => handleStartRename(chat), className: "p-1 rounded hover:bg-gray-700 text-gray-400 hover:text-gray-300", title: "Rename chat", children: _jsx(Edit2, { size: 14 }) }), _jsx("button", { onClick: () => onDeleteChat(chat.id), className: "p-1 rounded hover:bg-gray-700 text-gray-400 hover:text-red-400", title: "Delete chat", children: _jsx(Trash2, { size: 14 }) })] })] }, chat.id))), filteredChats.length === 0 && (_jsx("div", { className: "text-center py-4 text-gray-500", children: "No chats found" }))] }));
}
