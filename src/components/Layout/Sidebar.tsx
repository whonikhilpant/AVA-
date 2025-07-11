import React from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  FileText,
  FolderOpen,
  LogOut,
  Users,
  User
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png';

// ✅ Define props for Sidebar
type SidebarProps = {
  onClose?: () => void;
};

// ✅ Navigation items
const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Attendance', href: '/attendance', icon: Calendar },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Documents', href: '/documents', icon: FolderOpen },
  { name: 'Leads', href: '/leads', icon: Users },
  { name: 'Profile', href: '/profile', icon: User }
];

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const { logout, user } = useAuth();
  const location = useLocation();

  const handleLogout = () => logout();

  return (
    <div className="flex flex-col w-64 h-full bg-white border-r border-gray-200">
      {/* 🔹 Mobile Close Button */}
      <div className="md:hidden flex justify-end p-3">
        <button onClick={onClose} className="text-gray-600 text-xl hover:text-red-500">
          ✕
        </button>
      </div>

      {/* 🔰 Logo Section */}
      <div className="flex items-center justify-center h-24">
        <Link to="/" onClick={onClose}>
          <img
            src={logo}
            alt="Company Logo"
            className="h-16 w-16 object-contain transition-transform duration-300 hover:scale-105"
          />
        </Link>
      </div>

      {/* 🧭 Navigation */}
      <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={onClose}
              className={`
                group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                ${isActive
                  ? 'bg-gradient-to-r from-primary-500 via-accent-orange to-accent-blue text-white font-bold shadow'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'}
              `}
            >
              <item.icon
                className={`mr-3 h-5 w-5 flex-shrink-0 
                  ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-primary-500'}
                `}
              />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* 👤 User Profile & Logout */}
      <div className="border-t border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-gray-700">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="p-1 rounded-md text-gray-400 hover:text-red-500"
          title="Logout"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
