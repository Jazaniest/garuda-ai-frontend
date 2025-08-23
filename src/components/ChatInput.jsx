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
  
  const handleKeyDown = (e) => { 
    if (e.key === 'Enter' && !e.shiftKey) { 
      e.preventDefault(); 
      handleSend(); 
    }
  };

  return (
    <div className="p-3 bg-white border-t sm:p-4 border-slate-200 dark:bg-slate-800 dark:border-slate-700">
      <div className="flex items-center max-w-4xl mx-auto space-x-2 sm:space-x-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder || "Ketik pesan Anda..."}
            className="w-full px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base border border-transparent rounded-full bg-slate-100 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
          />
        </div>
        <button
          onClick={handleSend}
          className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white transition-all transform bg-indigo-600 rounded-full sm:w-12 sm:h-12 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed hover:scale-110 active:scale-95"
          disabled={!value.trim()}
        >
          <Send size={18} className="sm:w-[22px] sm:h-[22px] -ml-0.5" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;