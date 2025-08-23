import React, { useRef, useEffect } from 'react';
import { Bot, User } from 'lucide-react';

const MessageList = ({ messages }) => {
  const endOfMessagesRef = useRef(null);
  useEffect(() => { 
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' }); 
  }, [messages]);

  return (
    <div className="flex-1 p-3 space-y-4 overflow-y-auto sm:p-4 lg:p-6 sm:space-y-6">
      {messages.map((msg, index) => (
        <div key={index} className={`flex items-end gap-2 sm:gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          {msg.sender === 'ai' && (
            <div className="flex items-center justify-center flex-shrink-0 rounded-full w-7 h-7 sm:w-8 sm:h-8 bg-slate-200 dark:bg-slate-700 text-slate-500">
              <Bot size={16} className="sm:w-5 sm:h-5" />
            </div>
          )}
          <div className={`max-w-[85%] sm:max-w-xs md:max-w-md lg:max-w-2xl px-3 sm:px-4 py-2 sm:py-3 rounded-2xl ${
            msg.sender === 'user'
              ? 'bg-indigo-600 text-white rounded-br-none shadow-md'
              : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none shadow-md border border-slate-200 dark:border-slate-700'
          }`}>
            <p className="text-xs leading-relaxed break-words whitespace-pre-wrap sm:text-sm">
              {msg.text}
            </p>
          </div>
          {msg.sender === 'user' && (
            <div className="flex items-center justify-center flex-shrink-0 rounded-full w-7 h-7 sm:w-8 sm:h-8 bg-slate-200 dark:bg-slate-700 text-slate-500">
              <User size={14} className="sm:w-[18px] sm:h-[18px]" />
            </div>
          )}
        </div>
      ))}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default MessageList;