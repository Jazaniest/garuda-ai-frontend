import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Sidebar from './Sidebar';
import ModeSelectionModal from './ModeSelectionModal';
import PredictionForm from './PredictionForm';
import DiseaseAnalysisForm from './DiseaseAnalysisForm';
import ChatInterface from './ChatInterface';

const chatModes = [
  { id: 'commodity', label: 'Prediksi Komoditas' },
  { id: 'disease', label: 'Analisis Penyakit Tanaman' },
  { id: 'qna', label: 'Pertanyaan Seputar Pertanian', firstQuestion: "Tanyakan seputar pertanian yang ingin Anda ketahui." },
];

const ChatDashboard = () => {
  const { currentUser } = useAuth();
  const [chatSessions, setChatSessions] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCreateNewChat = (modeId) => {
    if (!currentUser) return;

    const selectedMode = chatModes.find(m => m.id === modeId);
    let initialMessages = [];
    if (selectedMode.firstQuestion) {
        initialMessages.push({ sender: 'ai', text: selectedMode.firstQuestion });
    }
    
    const newChat = {
      id: `session_${Date.now()}`,
      userId: currentUser.id,
      title: `Sesi Baru - ${selectedMode.label}`,
      mode: modeId,
      messages: initialMessages,
    };
    
    setChatSessions(prev => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    setIsModalOpen(false);
  };

  const activeChat = chatSessions.find(chat => chat.id === activeChatId);

  const renderActiveFeature = () => {
    if (!activeChat) {
      return (
        <div className="flex flex-col items-center justify-center flex-1 h-full">
          <p className="text-lg text-gray-500">Pilih sesi atau mulai yang baru.</p>
        </div>
      );
    }

    switch (activeChat.mode) {
      case 'commodity':
        return <PredictionForm />;
      case 'disease':
        return <DiseaseAnalysisForm />;
      case 'qna':
        return <ChatInterface activeChat={activeChat} setChatSessions={setChatSessions} />;
      default:
        return <div>Mode tidak dikenal</div>;
    }
  };

  return (
    <>
      <ModeSelectionModal 
        isOpen={isModalOpen}
        onSelect={handleCreateNewChat}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
        <Sidebar 
          onNewChat={() => setIsModalOpen(true)}
          chatSessions={chatSessions}
          activeChatId={activeChatId}
          onSelectChat={setActiveChatId}
        />
        <div className="flex flex-col flex-1 w-full">
          {renderActiveFeature()}
        </div>
      </div>
    </>
  );
};

export default ChatDashboard;