import React from 'react';
import { MessageSquare, Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface Chat {
  id: string;
  title: string;
  preview: string;
  date: string;
  messages: Array<{
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    type: string;
    metadata?: Record<string, any>;
  }>;
}

interface ChatHistoryProps {
  isExpanded: boolean;
  searchQuery: string;
  chats: Chat[];
  onSelectChat: (chat: Chat) => void;
  onDeleteChat: (chatId: string) => void;
  onRenameChat: (chatId: string, newTitle: string) => void;
}

export function ChatHistory({ 
  isExpanded, 
  searchQuery, 
  chats,
  onSelectChat,
  onDeleteChat,
  onRenameChat
}: ChatHistoryProps) {
  const navigate = useNavigate();
  const [editingChatId, setEditingChatId] = React.useState<string | null>(null);
  const [newTitle, setNewTitle] = React.useState('');

  const filteredChats = chats.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartRename = (chat: Chat) => {
    setEditingChatId(chat.id);
    setNewTitle(chat.title);
  };

  const handleFinishRename = (chatId: string) => {
    if (newTitle.trim()) {
      onRenameChat(chatId, newTitle.trim());
    }
    setEditingChatId(null);
    setNewTitle('');
  };

  if (!isExpanded) {
    return (
      <div className="px-2">
        {filteredChats.map(chat => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className="w-full p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
          >
            <MessageSquare size={20} className="text-gray-400" />
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="px-4 space-y-2">
      {filteredChats.map(chat => (
        <div
          key={chat.id}
          className="group relative w-full p-4 rounded-lg hover:bg-gray-800/50 transition-colors"
        >
          {editingChatId === chat.id ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onBlur={() => handleFinishRename(chat.id)}
                onKeyPress={(e) => e.key === 'Enter' && handleFinishRename(chat.id)}
                className="flex-1 bg-gray-700 rounded px-2 py-1 text-white"
                autoFocus
              />
            </div>
          ) : (
            <button
              onClick={() => onSelectChat(chat)}
              className="w-full text-left"
            >
              <div className="flex items-center gap-3">
                <MessageSquare size={20} className="text-gray-400" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{chat.title}</div>
                  <div className="text-sm text-gray-400 truncate">{chat.preview}</div>
                </div>
                <div className="text-xs text-gray-400">{chat.date}</div>
              </div>
            </button>
          )}

          {/* Action buttons */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-1">
            <button
              onClick={() => handleStartRename(chat)}
              className="p-1 rounded hover:bg-gray-700 text-gray-400 hover:text-gray-300"
              title="Rename chat"
            >
              <Edit2 size={14} />
            </button>
            <button
              onClick={() => onDeleteChat(chat.id)}
              className="p-1 rounded hover:bg-gray-700 text-gray-400 hover:text-red-400"
              title="Delete chat"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}

      {filteredChats.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No chats found
        </div>
      )}
    </div>
  );
}