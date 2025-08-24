import React, { useState } from 'react';
import Header from './Header';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { BeatLoader } from 'react-spinners';
import { analyzeLunos } from '../api/analysisApi';

const ThinkingMessage = () => (
  <div className="flex items-center gap-2 p-3 sm:gap-3 sm:p-4">
    <div className="grid flex-shrink-0 bg-indigo-100 rounded-full place-items-center w-7 h-7 sm:w-8 sm:h-8 dark:bg-indigo-900/40">
      <div className="w-3 h-3 bg-indigo-600 rounded-full sm:w-4 sm:h-4 dark:bg-indigo-400 animate-pulse"></div>
    </div>

    <div className="flex-1 px-3 sm:px-4">
      <div className="flex items-center gap-2 h-7 sm:h-8 text-slate-600 dark:text-slate-400">
        <span className="text-xs font-medium leading-none sm:text-sm">Berfikir</span>
        <BeatLoader color="#3B82F6" size={8} />
      </div>
    </div>
  </div>
);

const ChatInterface = ({ activeChat, setChatSessions }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSendMessage = async (text) => {
    const userMessage = { sender: 'user', text };
    const updatedChatWithUserMessage = {
      ...activeChat,
      messages: [...activeChat.messages, userMessage],
    };
    setChatSessions(prev => prev.map(c => c.id === activeChat.id ? updatedChatWithUserMessage : c));
    setIsLoading(true);

    try {
      const aiResult = await analyzeLunos(text);
      const aiResponseText = aiResult.result || JSON.stringify(aiResult, null, 2);
      const aiMessage = { sender: 'ai', text: aiResponseText };
      const finalUpdatedChat = {
        ...updatedChatWithUserMessage,
        messages: [...updatedChatWithUserMessage.messages, aiMessage],
      };
      setChatSessions(prev => prev.map(c => c.id === activeChat.id ? finalUpdatedChat : c));
      //eslint-disable-next-line
    } catch (error) {
      const errorMessage = { sender: 'ai', text: 'Maaf, terjadi kesalahan saat menghubungi server.' };
      const chatWithError = {
          ...updatedChatWithUserMessage,
          messages: [...updatedChatWithUserMessage.messages, errorMessage]
      };
      setChatSessions(prev => prev.map(c => c.id === activeChat.id ? chatWithError : c));
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col h-full bg-slate-100 dark:bg-slate-900">
      <div className="flex-1 overflow-y-auto">
        <MessageList messages={activeChat.messages} />
        {isLoading && <ThinkingMessage />}
      </div>
      <ChatInput 
        onSend={handleSendMessage} 
        placeholder="Ketik pertanyaan Anda..." 
        disabled={isLoading}
      />
    </div>
  );
};

export default ChatInterface;