import React, { createContext, useContext, useState, useEffect } from 'react';
import { LoginCredentials, User } from '../types';

// Define the context type
interface AuthContextType {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  user: User | null;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (credentials: LoginCredentials) => {
  const response = await fetch('https://leadinfo.site/employee/login.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const json = await response.json();

  console.log("🔐 Login response JSON:", json); // <-- Log the response

  if (!response.ok || !json.success) {
    throw new Error(json.message || 'Login failed');
  }
  console.log("🔐 Login Response:");
console.log("Success:", json.success);
console.log("Message:", json.message);
console.log("Employee ID:", json.data.employeeId);
console.log("Employee Name:", json.data.employee_name);
console.log("Role:", json.data.role);
console.log("Token:", json.token);
  // Save user to localStorage
  localStorage.setItem('user', JSON.stringify(json.data));
  localStorage.setItem('employee_name', json.data.employee_name);
  localStorage.setItem('employeeId', json.data.employeeId);
  const employeeName = localStorage.getItem('employee_name');
  console.log(employeeName);
  // localStorage.setItem('token', json.token);

  setUser(json.data); // Update context
};


  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/CRM'; // Optional: Redirect after logout
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
