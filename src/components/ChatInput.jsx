import React, { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';

const ChatInput = ({ onSend, placeholder }) => {
  const [value, setValue] = useState('');

  const handleSend = () => {
    if (value.trim()) {
      onSend(value.trim());
      setValue('');
    }
  };
  const handleKeyDown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }};

  return (
    <div className="p-4 bg-white border-t border-slate-200 dark:bg-slate-800 dark:border-slate-700">
      <div className="flex items-center max-w-4xl mx-auto space-x-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder || "Ketik pesan Anda..."}
            className="w-full px-5 py-3 border border-transparent rounded-full bg-slate-100 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
          />
        </div>
        <button
          onClick={handleSend}
          className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-white transition-colors transform bg-indigo-600 rounded-full hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed hover:scale-110"
          disabled={!value.trim()}
        >
          <Send size={22} className="-ml-0.5" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;