import React, { useRef, useEffect } from 'react';
import { Bot } from 'lucide-react';

const MessageList = ({ messages }) => {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 p-4 space-y-6 overflow-y-auto md:p-6">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex items-start gap-3 ${
            msg.sender === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          {msg.sender === 'ai' && (
            <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-white bg-gray-700 rounded-full">
              <Bot size={20} />
            </div>
          )}

          <div
            className={`max-w-xs md:max-w-md lg:max-w-2xl p-4 rounded-2xl shadow-sm ${
              msg.sender === 'user'
                ? 'bg-blue-500 text-white rounded-br-none'
                : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
            }`}
          >
            <p className="whitespace-pre-wrap">{msg.text}</p>
          </div>
        </div>
      ))}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default MessageList;