import React, { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface UploadedDoc {
  id: number;
  document_type: string;
  file_path: string;
  uploaded_at: string;
}

const Header: React.FC<{ onMenuClick?: () => void }> = ({ onMenuClick }) => {
  const { user } = useAuth();
  const employeeName = localStorage.getItem('employee_name') || 'Employee';
  const empId = user?.employeeId;

  const [passportPhoto, setPassportPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (!empId) return;

    const fetchDocs = async () => {
      try {
        const res = await fetch(`https://leadinfo.site/employee/get_documents.php?empId=${empId}`);
        const data = await res.json();
        if (data.success) {
          const passport = data.data.find((doc: UploadedDoc) => doc.document_type === 'passport');
          if (passport) {
            setPassportPhoto(`https://leadinfo.site/employee/uploads/${passport.file_path}`);
          }
        }
      } catch (err) {
        console.error('Failed to load passport photo', err);
      }
    };

    fetchDocs();
  }, [empId]);

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
        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex flex-col items-end">
            <p className="text-sm font-semibold text-gray-900">
              Welcome <span className="text-primary-600 ml-1 text-sm">{employeeName}</span>
            </p>
            <span className="text-xs text-gray-500">{user?.department}</span>
          </div>

          {passportPhoto ? (
            <img
              src={passportPhoto}
              alt="Passport"
              className="h-9 w-9 rounded-full object-cover border border-gray-300 shadow"
            />
          ) : (
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary-500 via-accent-orange to-accent-blue flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
