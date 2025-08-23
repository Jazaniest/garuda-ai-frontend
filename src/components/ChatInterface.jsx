import React, { useState } from 'react';
import Header from './Header';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { ClipLoader, BeatLoader, RingLoader } from 'react-spinners';
import { analyzeLunos } from '../api/analysisApi';

// Komponen loading message dengan animasi thinking
const ThinkingMessage = () => (
  <div className="flex items-start gap-2 p-3 sm:gap-3 sm:p-4">
    <div className="flex items-center justify-center flex-shrink-0 bg-indigo-100 rounded-full w-7 h-7 sm:w-8 sm:h-8 dark:bg-indigo-900/40">
      <div className="w-3 h-3 bg-indigo-600 rounded-full sm:w-4 sm:h-4 dark:bg-indigo-400 animate-pulse"></div>
    </div>
    <div className="flex-1 px-3 py-2 sm:px-4 sm:py-3">
      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
        <span className="text-xs font-medium sm:text-sm">Berfikir</span>
        <BeatLoader color="#3B82F6" size={8} className="sm:size-10" />
      </div>
    </div>
  </div>
);

const ChatInterface = ({ activeChat, setChatSessions }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSendMessage = async (text) => {
    // Tambahkan pesan user
    const userMessage = { sender: 'user', text };
    const updatedChatWithUserMessage = {
      ...activeChat,
      messages: [...activeChat.messages, userMessage],
    };
    setChatSessions(prev => prev.map(c => c.id === activeChat.id ? updatedChatWithUserMessage : c));

    // Set loading state
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
      // Remove loading state
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col h-full bg-slate-100 dark:bg-slate-900">
      <Header title="Tanya Jawab TANI AI" />
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