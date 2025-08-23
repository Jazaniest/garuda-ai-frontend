import React from 'react';
import { MessageSquare, Plus, Settings, LogOut, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Sidebar = ({ onNewChat, chatSessions, activeChatId, onSelectChat, onClose }) => {
  const { currentUser, logout } = useAuth();

  return (
    <aside className="relative flex flex-col flex-shrink-0 w-full h-full p-3 bg-gray-100 sm:p-4 dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800 sm:text-xl dark:text-gray-200">
          Percakapan
        </h2>
        <div className="flex items-center gap-2">
          <button 
            onClick={onNewChat} 
            title="Mulai Chat Baru" 
            className="p-2 transition-colors rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            <Plus size={18} className="text-gray-600 sm:w-5 sm:h-5 dark:text-gray-400" />
          </button>
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="p-2 transition-colors rounded-lg lg:hidden hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            <X size={18} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* Chat Sessions */}
      <nav className="flex-1 space-y-1 overflow-y-auto sm:space-y-2">
        {chatSessions.length === 0 ? (
          <div className="p-4 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Belum ada percakapan
            </p>
          </div>
        ) : (
          chatSessions.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`flex items-center w-full p-2 sm:p-3 text-sm rounded-lg transition-all ${
                chat.id === activeChatId 
                ? 'bg-blue-500 text-white shadow-md' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            >
              <MessageSquare size={14} className="flex-shrink-0 mr-2 sm:w-4 sm:h-4 sm:mr-3" />
              <span className="flex-1 text-left truncate">
                {chat.title}
              </span>
            </button>
          ))
        )}
      </nav>

      {/* User Info & Logout */}
      <div className="pt-3 mt-4 border-t border-gray-200 sm:pt-4 dark:border-gray-700">
        <div className="p-2 mb-2 text-xs text-gray-700 sm:text-sm dark:text-gray-300">
          Login sebagai: 
          <span className="block font-semibold truncate sm:inline sm:ml-1">
            {currentUser?.name}
          </span>
        </div>
        <button 
          onClick={logout} 
          className="flex items-center w-full p-2 text-sm text-red-500 transition-colors rounded-lg sm:p-3 hover:bg-red-100 dark:hover:bg-red-900/50"
        >
          <LogOut size={16} className="flex-shrink-0 mr-2 sm:w-5 sm:h-5 sm:mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;