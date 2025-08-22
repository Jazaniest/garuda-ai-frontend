import React from 'react';
import { Menu } from 'lucide-react';

const Header = ({ onMenuClick, title }) => {
  return (
    <header className="z-10 flex items-center justify-between p-4 bg-white shadow-md dark:bg-gray-800 md:justify-center">
      <button
        onClick={onMenuClick}
        className="p-2 text-gray-600 rounded-full dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 md:hidden"
      >
        <Menu size={24} />
      </button>

      {/* Title props */}
      <h1 className="px-4 text-lg font-semibold text-center text-gray-800 truncate dark:text-gray-200">
        {title}
      </h1>
      
      <div className="w-8 md:hidden"></div>
    </header>
  );
};

export default Header;