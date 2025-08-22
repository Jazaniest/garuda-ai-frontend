import React from 'react';
import Header from './Header';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { analyzeLunos } from '../api/analysisApi';

const ChatInterface = ({ activeChat, setChatSessions }) => {
  
  const handleSendMessage = async (text) => {
    const userMessage = { sender: 'user', text };
    const updatedChatWithUserMessage = {
      ...activeChat,
      messages: [...activeChat.messages, userMessage],
    };
    setChatSessions(prev => prev.map(c => c.id === activeChat.id ? updatedChatWithUserMessage : c));

    try {
      const aiResult = await analyzeLunos(text);
      const aiResponseText = aiResult.answer || JSON.stringify(aiResult, null, 2);
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
    }
  };
  
  return (
    <div className="flex flex-col h-full bg-slate-100 dark:bg-slate-900">
      <Header title="Tanya Jawab AI" />
      <MessageList messages={activeChat.messages} />
      <ChatInput onSend={handleSendMessage} placeholder="Ketik pertanyaan Anda..." />
    </div>
  );
};

export default ChatInterface;