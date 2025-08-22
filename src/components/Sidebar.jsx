import React from 'react';
import { MessageSquare, Plus, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Sidebar = ({ onNewChat, chatSessions, activeChatId, onSelectChat }) => {
  const { currentUser, logout } = useAuth();

  return (
    <aside className="relative flex flex-col flex-shrink-0 p-4 bg-gray-100 w-80 dark:bg-gray-900">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Percakapan</h2>
        <button onClick={onNewChat} title="Mulai Chat Baru" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
          <Plus size={20} className="text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto">
        {chatSessions.map((chat) => (
          <a
            key={chat.id}
            href="#"
            onClick={(e) => { e.preventDefault(); onSelectChat(chat.id); }}
            className={`flex items-center p-2 text-sm rounded-lg truncate ${
              chat.id === activeChatId 
              ? 'bg-blue-500 text-white' 
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
          >
            <MessageSquare size={16} className="flex-shrink-0 mr-3" />
            <span className="truncate">{chat.title}</span>
          </a>
        ))}
      </nav>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="p-2 mb-2 text-sm text-gray-700 dark:text-gray-300">
            Login sebagai: <span className="font-semibold">{currentUser?.name}</span>
        </div>
        <button onClick={logout} className="flex items-center w-full p-2 mt-2 text-red-500 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50">
            <LogOut size={20} className="mr-3" />
            <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;