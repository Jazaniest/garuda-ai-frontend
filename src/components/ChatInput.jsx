import React, { useState, useRef } from 'react';
import { Send, Paperclip } from 'lucide-react';

const ChatInput = ({ onSend, placeholder, activeChat }) => {
  const [value, setValue] = useState('');
  const fileInputRef = useRef(null);

  const isFileUploadMode = activeChat?.mode === 'disease' && activeChat?.conversationStep === 0;

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onSend(file);
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="p-4 bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center space-x-3">
        <div className="relative flex-1">
          {isFileUploadMode ? (
            <>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden text-white" 
                accept="image/*"
              />
              <button 
                onClick={handleFileButtonClick} 
                className="w-full px-5 py-3 text-left bg-gray-100 rounded-full dark:bg-gray-900 focus:ring-2 focus:ring-blue-500"
              >
                <div className="flex items-center text-gray-500">
                  <Paperclip size={20} className="mr-2"/>
                  <span>Kirim foto untuk dianalisis...</span>
                </div>
              </button>
            </>
          ) : (
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder || "Ketik pesan Anda..."}
              className="w-full px-5 py-3 text-white bg-gray-100 rounded-full dark:bg-gray-900 focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>
        
        {!isFileUploadMode && (
          <button
            onClick={handleSend}
            className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white bg-blue-500 rounded-full hover:bg-blue-600 disabled:bg-gray-400"
            disabled={!value.trim()}
            title="Kirim Pesan"
          >
            <Send size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatInput;