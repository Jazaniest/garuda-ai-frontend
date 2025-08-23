import React from 'react';
import { Bot, LineChart, Stethoscope, X } from 'lucide-react';

const modes = [
  { id: 'commodity', label: 'Prediksi Komoditas', icon: <LineChart size={20} className="sm:w-6 sm:h-6" />, description: 'Analisis harga dan saran tanam' },
  { id: 'disease', label: 'Analisis Penyakit', icon: <Stethoscope size={20} className="sm:w-6 sm:h-6" />, description: 'Deteksi penyakit dari foto tanaman' },
  { id: 'qna', label: 'Tanya Jawab Umum', icon: <Bot size={20} className="sm:w-6 sm:h-6" />, description: 'Konsultasi pertanian umum' },
];

const ModeSelectionModal = ({ isOpen, onSelect, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-sm sm:max-w-md bg-white rounded-xl sm:rounded-2xl shadow-xl dark:bg-gray-800 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 sm:p-6 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-800 sm:text-xl dark:text-gray-200">
            Pilih Mode
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <p className="mb-4 text-sm text-gray-600 sm:mb-6 sm:text-base dark:text-gray-400">
            Apa yang ingin Anda lakukan hari ini?
          </p>
          <div className="space-y-3 sm:space-y-4">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => onSelect(mode.id)}
                className="flex items-start w-full p-3 text-left transition-all rounded-lg sm:p-4 bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-700 hover:shadow-md group"
              >
                <div className="mr-3 sm:mr-4 text-blue-500 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-0.5">
                  {mode.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-sm font-semibold text-gray-700 sm:text-base dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                    {mode.label}
                  </span>
                  <span className="block mt-1 text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                    {mode.description}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeSelectionModal;