import React, { useRef, useEffect } from 'react';
import { Bot, User } from 'lucide-react';

const MessageList = ({ messages }) => {
  const endOfMessagesRef = useRef(null);
  useEffect(() => { endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  return (
    <div className="flex-1 p-4 space-y-6 overflow-y-auto sm:p-6">
      {messages.map((msg, index) => (
        <div key={index} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          {msg.sender === 'ai' && (
            <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500">
              <Bot size={20} />
            </div>
          )}
          <div className={`max-w-xs md:max-w-md lg:max-w-2xl px-4 py-3 rounded-2xl ${
            msg.sender === 'user'
              ? 'bg-indigo-600 text-white rounded-br-none shadow-md'
              : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none shadow-md border border-slate-200 dark:border-slate-700'
          }`}>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
          </div>
          {msg.sender === 'user' && (
            <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500">
              <User size={18} />
            </div>
          )}
        </div>
      ))}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default MessageList;