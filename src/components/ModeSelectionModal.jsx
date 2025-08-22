import React from 'react';
import { Bot, LineChart, Stethoscope } from 'lucide-react';

const modes = [
  { id: 'commodity', label: 'Prediksi Komoditas', icon: <LineChart size={24} /> },
  { id: 'disease', label: 'Analisis Penyakit', icon: <Stethoscope size={24} /> },
  { id: 'qna', label: 'Tanya Jawab Umum', icon: <Bot size={24} /> },
];

const ModeSelectionModal = ({ isOpen, onSelect, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md p-6 m-4 bg-white rounded-lg shadow-xl dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-6 text-xl font-bold text-center text-gray-800 dark:text-gray-200">
          Apa yang ingin Anda lakukan?
        </h2>
        <div className="space-y-4">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => onSelect(mode.id)}
              className="flex items-center w-full p-4 text-left transition-colors bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-700"
            >
              <div className="mr-4 text-blue-500">{mode.icon}</div>
              <span className="font-semibold text-gray-700 dark:text-gray-300">{mode.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModeSelectionModal;