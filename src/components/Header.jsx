import React from 'react';
import { Menu } from 'lucide-react';

const Header = ({ onMenuClick, title }) => {
  return (
    <header className="z-10 flex items-center justify-between p-3 bg-white shadow-md sm:p-4 dark:bg-gray-800 lg:justify-center">
      <button
        onClick={onMenuClick}
        className="p-2 text-gray-600 transition-colors rounded-lg dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 lg:hidden"
      >
        <Menu size={20} className="sm:w-6 sm:h-6" />
      </button>

      {/* Title */}
      <h1 className="flex-1 px-2 text-base font-semibold text-center text-gray-800 truncate sm:px-4 sm:text-lg dark:text-gray-200 lg:flex-none">
        {title}
      </h1>
      
      <div className="w-8 sm:w-10 lg:hidden"></div>
    </header>
  );
};

export default Header;