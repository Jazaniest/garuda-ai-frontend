import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Sidebar from './Sidebar';
import ModeSelectionModal from './ModeSelectionModal';
import PredictionForm from './PredictionForm';
import DiseaseAnalysisForm from './DiseaseAnalysisForm';
import ChatInterface from './ChatInterface';
import Header from './Header';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const handleSelectChat = (chatId) => {
    setActiveChatId(chatId);
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const activeChat = chatSessions.find(chat => chat.id === activeChatId);

  const getHeaderTitle = () => {
    if (!activeChat) return "TANI AI";
    switch (activeChat.mode) {
      case 'commodity': return "Prediksi Komoditas";
      case 'disease': return "Analisis Penyakit Tanaman";
      case 'qna': return "Tanya Jawab TANI AI";
      default: return "TANI AI";
    }
  };

  const renderActiveFeature = () => {
    if (!activeChat) {
      return (
        <div className="flex flex-col items-center justify-center flex-1 h-full px-4">
          <div className="text-center">
            <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300 sm:text-xl">
              Selamat datang di TANI AI
            </h3>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 sm:text-base">
              Pilih sesi atau mulai yang baru untuk memulai
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Mulai Chat Baru
            </button>
          </div>
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
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <div className={`
          fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-80
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <Sidebar 
            onNewChat={() => setIsModalOpen(true)}
            chatSessions={chatSessions}
            activeChatId={activeChatId}
            onSelectChat={handleSelectChat}
          />
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-1 w-full min-w-0">
          {/* Header - visible on mobile, hidden on desktop for some modes */}
          <div className={`
            ${activeChat?.mode === 'qna' ? 'lg:hidden' : 'block'}
          `}>
            <Header 
              title={getHeaderTitle()}
              onMenuClick={() => setIsSidebarOpen(true)}
            />
          </div>
          
          {/* Content Area */}
          <div className="flex-1 overflow-hidden">
            {renderActiveFeature()}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatDashboard;