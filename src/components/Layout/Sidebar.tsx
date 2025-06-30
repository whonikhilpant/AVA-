import React from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  FolderOpen, 
  LogOut,
  Users,
  Mail
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Attendance', href: '/attendance', icon: Calendar },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Documents', href: '/documents', icon: FolderOpen },
  { name: 'Leads', href: '/leads', icon: Users },
  { name: 'Email Log', href: '/email-log', icon: Mail },
];

const Sidebar: React.FC = () => {
  const { logout, user } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-white border-r border-gray-200 card p-0">
          {/* Logo */}
          <div className="flex items-center h-32 flex-shrink-0 justify-center relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-100 via-accent-orange/30 to-accent-blue/20 blur-sm opacity-80"></div>
            </div>
            <Link to="/">
              <img
                src={logo}
                alt="Company Logo"
                className="relative z-10 h-16 w-16 object-contain shadow-xl transition-transform duration-300 hover:scale-105"
                style={{ background: 'transparent' }}
              />
            </Link>
          </div>
          
          {/* Navigation */}
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={`
                      group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors
                      ${isActive
                        ? 'bg-gradient-to-r from-primary-500 via-accent-orange to-accent-blue text-white font-bold shadow'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-primary-600'
                      }
                    `}
                  >
                    <item.icon
                      className={`
                        mr-3 flex-shrink-0 h-5 w-5 transition-colors
                        ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-primary-500'}
                      `}
                    />
                    {item.name}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* User Profile */}
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="ml-3 flex-shrink-0 p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 