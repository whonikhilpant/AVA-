import React from 'react';
import { Bell, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC<{ onMenuClick?: () => void }> = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-[999]">
      <div className="flex items-center justify-between h-16 px-4 sm:px-8 lg:px-12">
        {/* 🔸 Mobile Sidebar Toggle Button */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            onClick={onMenuClick}
            className="text-gray-500 hover:text-gray-600 focus:outline-none"
            aria-label="Open sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Center */}
        <div className="flex-1 px-4 flex justify-center lg:justify-end" />

        {/* 🔹 Right (Notifications & User Info) */}
        <div className="flex items-center space-x-4">
          <button className="p-1 rounded-full text-gray-400 hover:text-primary-500">
            <Bell className="h-6 w-6" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="flex flex-col items-end">
              <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.department}</p>
            </div>
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary-500 via-accent-orange to-accent-blue flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
